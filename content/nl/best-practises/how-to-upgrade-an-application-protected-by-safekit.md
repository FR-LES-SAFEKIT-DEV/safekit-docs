---
title: "Een applicatie die wordt beschermd door SafeKit upgraden in een HA-cluster."
canonical: "https://safekit.eviden.com/nl/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Leer hoe u applicaties die beschermd worden door SafeKit veilig kunt upgraden. Vergelijk kleine en grote upgrades, rolling upgrades, terugdraaistrategieën en op VM's gebaseerde hoge beschikbaarheid."
category: "best-practises"
lang: "nl"
topics: "Upgraden van een applicatie met hoge beschikbaarheid die wordt beschermd door SafeKit , hoge beschikbaarheid op VM-niveau, hoge beschikbaarheid op applicatieniveau, de juiste upgradestrategie kiezen, conclusie, 🔍 SafeKit navigatiehub voor hoge beschikbaarheid"
---

# Een applicatie upgraden die wordt beschermd door SafeKit in een HA-cluster {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Een applicatie met hoge beschikbaarheid upgraden die beveiligd is door SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Het up-to-date houden van bedrijfskritieke applicaties is essentieel voor de beveiliging, prestaties en toegang tot nieuwe functies. Wanneer een applicatie wordt beschermd door SafeKit , is de upgradeprocedure afhankelijk van de gebruikte architectuur voor hoge beschikbaarheid.

Er zijn twee gangbare implementatiemodellen:

  * **Virtuele machine Hoge Beschikbaarheid** , waarbij de applicatie draait binnen een beveiligde virtuele machine die wordt beheerd door SafeKit .
  * **Hoge beschikbaarheid op applicatieniveau** , waarbij de applicatie op twee servers is geïnstalleerd.


Elk model biedt verschillende upgrade-mechanismen en terugdraai-strategieën.

## VM-niveau hoge beschikbaarheid {#vm-level-ha}

Met SafeKit VM-failoveroplossingen zoals **hyperv.safe** en **kvm.safe** wordt de applicatie slechts één keer in een virtuele machine geïnstalleerd.

SafeKit beschermt de gehele virtuele machine in plaats van alleen de applicatie, wat onderhoudswerkzaamheden aanzienlijk vereenvoudigt.

### Vereenvoudigd upgradeproces {#simplified-upgrade-process}

Omdat u met één enkele VM-instantie van de applicatie werkt, wordt het onderhoud op virtualisatieniveau afgehandeld in plaats van via failover op applicatieniveau.

De upgradeprocedure is eenvoudig:

  1. Maak een checkpoint of snapshot van de virtuele machine met behulp van de Hyper-V- of KVM-beheerconsole.
  2. Voer de applicatie-upgrade uit in de virtuele machine.
  3. Valideer de bijgewerkte applicatie.
  4. Als de upgrade is geslaagd, verwijdert u de momentopname en kunt u de normale werkzaamheden hervatten.
  5. Als er een probleem optreedt, herstel dan de virtuele machine vanuit de momentopname en keer onmiddellijk terug naar de vorige, naar behoren werkende staat.


De serviceonderbreking is beperkt tot de duur die normaal gesproken nodig is voor de upgradeprocedure van de applicatie zelf.

### Voordelen van VM-niveaubeveiliging {#benefits-of-vm-level-protection}

  * Slechts één applicatie-instantie hoeft te worden onderhouden.
  * Er bestaat geen clusterbewuste upgradeprocedure.
  * Snel terugdraaien via VM-snapshots.
  * Verminderde operationele complexiteit.
  * Een consistent upgradeproces, ongeacht de beveiligde applicatie.


Deze aanpak is met name aantrekkelijk voor standaardapplicaties en commerciële softwarepakketten waarbij applicatieclustering niet beschikbaar is of moeilijk te implementeren is.

## Hoge beschikbaarheid op applicatieniveau {#app-level-ha}

In een traditioneel SafeKit cluster is de applicatie geïnstalleerd op twee knooppunten: knooppunt 1 en knooppunt 2. SafeKit synchroniseert applicatiegegevens tussen deze knooppunten en zorgt automatisch voor failover indien nodig.

### Kleine applicatie-upgrade {#app-level-ha-minor}

Een kleine upgrade wijzigt alleen de binaire bestanden van de applicatie, terwijl de gerepliceerde gegevens volledig compatibel blijven tussen versies. Omdat het formaat van de gerepliceerde gegevens niet verandert, ondersteunt SafeKit een rolling upgrade met minimale downtime. 

  1. Het cluster draait aanvankelijk in een **✅ PRIM (node 1) / ✅ SECOND (node 2)** -configuratie. De applicatie draait op de PRIM-node en gerepliceerde data wordt continu gesynchroniseerd met de SECOND-node. 
  2. Stop de SafeKit module op het TWEEDE knooppunt ( **❌ STOP (knooppunt 2)** ), voer een upgrade uit van de applicatie en herstart de module. Tijdens deze bewerking blijft de applicatie gewoon draaien op de **✅ ALONE (knooppunt 1)** en treedt er geen serviceonderbreking op. 
  3. Na de herstart voegt het geüpgrade knooppunt zich weer bij het cluster als **✅ SECOND (knooppunt 2)** en synchroniseert het de gerepliceerde gegevens opnieuw. 
  4. Stop het PRIM-knooppunt ( **❌ STOP (knooppunt 1)** ). SafeKit voert automatisch een failover uit en het geüpgrade knooppunt wordt **✅ ALONE (knooppunt 2)** . De applicatie wordt op dit knooppunt opnieuw opgestart. De downtime is beperkt tot de failover en de tijd die nodig is voor het opnieuw opstarten van de applicatie. 
  5. Als de bijgewerkte applicatie correct werkt in de ALONE-status, moet u het resterende knooppunt (knooppunt 1) upgraden en de SafeKit -module opnieuw starten. 
  6. Na de resynchronisatie keert het cluster terug naar een normale **✅ SECOND (node 1) / ✅ PRIM (node 2)** -configuratie. De oorspronkelijke rollen kunnen handmatig worden hersteld via de SafeKit -beheerconsole of automatisch via de SafeKit -configuratie. 


**Terugdraaiprocedure**

  * Stop bij stap 5 de **✅ ALONE (node 2)** node.
  * Dwing het oorspronkelijke knooppunt (knooppunt 1) om te starten als primaire **ALONE (knooppunt 1)** met de vorige applicatieversie.
  * Installeer de vorige versie opnieuw op het geüpgrade knooppunt (knooppunt 2).
  * Keer terug naar een normale **✅ PRIM (knooppunt 1) / ✅ SECOND (knooppunt 2)** -configuratie.


De volledige upgrade wordt uitgevoerd met een downtime die beperkt is tot de overgang van **✅ PRIM / ✅ SECOND** naar **❌ STOP / ✅ ALONE** . 

### Belangrijke applicatie-upgrade {#app-level-ha-major}

Een grote upgrade wijzigt de opmaak of structuur van gerepliceerde gegevens. Omdat de door de nieuwe versie gegenereerde gegevens niet langer compatibel zijn met de oude, kan een gefaseerde upgrade niet worden uitgevoerd. 

  1. Het cluster draait aanvankelijk in een **✅ PRIM (node 1) / ✅ SECOND (node 2)** -configuratie. 
  2. Stop eerst het TWEEDE knooppunt en daarna het PRIM-knooppunt. Het cluster gaat over naar **❌ STOP (knooppunt 1) / ❌ STOP (knooppunt 2)** . 
  3. Upgrade het voormalige PRIM-knooppunt en herstart het. Het knooppunt start zelfstandig op als **✅ ALONE (knooppunt 1)** met de nieuwe applicatieversie. 
  4. Valideer de bijgewerkte applicatie en controleer of deze correct werkt. 
  5. Als de validatie succesvol is, moet u het resterende knooppunt upgraden en de SafeKit -module opnieuw opstarten. 
  6. Het geüpgrade knooppunt wordt **✅ SECOND (knooppunt 2)** , synchroniseert de applicatiegegevens opnieuw en het cluster keert terug naar een normale **✅ PRIM (knooppunt 1) / ✅ SECOND (knooppunt 2)** -configuratie. 


**Terugdraaiprocedure**

  * Stop bij stap 5 de geüpgrade **✅ ALONE (node 1)** node.
  * Dwing het niet-geüpgrade knooppunt om als primair te starten **✅ ALONE (knooppunt 2)** .
  * Installeer de vorige applicatieversie opnieuw op het geüpgrade knooppunt.
  * Herstel de oorspronkelijke **✅ SECOND (node 1) / ✅ PRIM (node 2)** -configuratie.


Omdat gerepliceerde gegevens tijdens de migratie worden gewijzigd, komt de downtime overeen met de periode tussen de status **❌ STOP / ❌ STOP** en de herstart van het eerste geüpgrade knooppunt als **✅ ALONE** . 

### Waarom SafeKit applicatie-upgrades vereenvoudigt {#why-safekit-simplifies-application-upgrades}

SafeKit minimaliseert operationele risico's door beheerders in staat te stellen:

  * Voer de upgrade één knooppunt tegelijk uit.
  * Zorg ervoor dat de dienstverlening zoveel mogelijk beschikbaar blijft.
  * Valideer nieuwe versies voordat u overschakelt naar productieverkeer.
  * Ga snel terug naar het vorige knooppunt als er onverwachte problemen worden gedetecteerd.


## De juiste upgrade-strategie kiezen {#choosing-the-right-upgrade-strategy}

Implementatiemodel | Applicatie-instanties | Impact op gerepliceerde gegevens | Upgradebenadering  
---|---|---|---  
HA op applicatieniveau | Twee knooppunten | Afhankelijk van het upgradetype | Rolling upgrade met failover  
HA op VM-niveau ( hyperv.safe / kvm.safe ) | Eén VM | Beheerd binnen de VM | Snapshot, upgrade, validatie, rollback indien nodig  
  
## Conclusie {#conclusion}

SafeKit biedt flexibele architecturen met hoge beschikbaarheid die zich aanpassen aan de operationele eisen van verschillende applicaties. Of u nu een geclusterde applicatie over twee knooppunten beschermt of een enkele applicatie-instantie die in een virtuele machine draait, SafeKit maakt gecontroleerde upgrades mogelijk, minimaliseert downtime en biedt betrouwbare herstelopties wanneer onderhoudswerkzaamheden nodig zijn.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}