---
title: "Een door SafeKit beveiligde toepassing upgraden in een HA-cluster"
canonical: "https://safekit.eviden.com/nl/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Een door SafeKit beschermde applicatie upgraden: kleine en grote upgrades, rolling upgrades, rollbackopties en de VM-HA-aanpak."
category: "best-practises"
lang: "nl"
topics: "Een High Availability-applicatie beveiligen met SafeKit, Hoge beschikbaarheid op VM-niveau, Hoge beschikbaarheid op applicatieniveau, De juiste upgrade-strategie kiezen, Conclusie, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-20.1 | glossaire 2026-11-20.3 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
schemaType: "TechArticle"
---

# Een door SafeKit beveiligde toepassing upgraden in een HA-cluster {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Een High Availability-applicatie beveiligen met SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Het up-to-date houden van bedrijfskritische applicaties is essentieel voor de beveiliging, prestaties en toegang tot nieuwe functies. Wanneer een applicatie wordt beschermd door SafeKit, hangt de upgradeprocedure af van de gebruikte high-availability-architectuur.

Er zijn twee veelvoorkomende implementatiemodellen:

  * **Hoge beschikbaarheid van virtuele machines**, waarbij de toepassing binnen een beveiligde virtuele machine draait die wordt beheerd door SafeKit.
  * **Hoge beschikbaarheid op applicatieniveau**, waarbij de applicatie op twee servers is geïnstalleerd.


Elk model biedt verschillende upgrademechanismen en rollbackstrategieën.

## Hoge beschikbaarheid op VM-niveau {#vm-level-ha}

Met SafeKit VM failover-oplossingen zoals **hyperv.safe** en **kvm.safe** wordt de applicatie slechts één keer geïnstalleerd in een virtuele machine.

SafeKit beschermt de volledige VM, niet de toepassing zelf. Dit vereenvoudigt de onderhoudswerkzaamheden aanzienlijk.

### Vereenvoudigd upgradeproces {#simplified-upgrade-process}

Omdat u met één VM-instantie van de toepassing werkt, wordt het onderhoud afgehandeld op de virtualisatielaag in plaats van via failover op applicatieniveau.

De upgradeprocedure is eenvoudig:

  1. Maak een controlepunt of momentopname van de virtuele machine met behulp van de Hyper-V of KVM beheerconsole.
  2. Voer de applicatie-upgrade uit in de virtuele machine.
  3. Valideer de geüpgradede applicatie.
  4. Als de upgrade succesvol is, verwijdert u de momentopname en gaat u verder met de normale werking.
  5. Als er een probleem optreedt, herstelt u de virtuele machine vanuit de momentopname en keert u onmiddellijk terug naar de vorige bekende werkende status.


De onderbreking van de dienstverlening is beperkt tot de duur die normaal gesproken vereist is voor de eigen upgradeprocedure van de toepassing.

### Voordelen van bescherming op VM-niveau {#benefits-of-vm-level-protection}

  * Slechts één applicatie-instantie om te onderhouden.
  * Geen clusterspecifieke upgradeprocedure.
  * Snel terugdraaien via VM-snapshots.
  * Verminderde operationele complexiteit.
  * Consistent upgradeproces, ongeacht de beveiligde toepassing.


Deze aanpak is met name aantrekkelijk voor standaardtoepassingen en commerciële standaardsoftware waarbij applicatieclustering niet beschikbaar is of moeilijk te implementeren is.

## Hoge beschikbaarheid op applicatieniveau {#app-level-ha}

In een traditioneel SafeKit-cluster wordt de applicatie op twee nodes geïnstalleerd: node 1 en node 2. SafeKit synchroniseert applicatiegegevens tussen deze nodes en handelt automatisch failover af indien nodig.

### Minorversie-upgrade van de applicatie {#app-level-ha-minor}

Een kleine upgrade wijzigt alleen de binaire bestanden van de toepassing, terwijl de gerepliceerde gegevens volledig compatibel blijven tussen de versies. Omdat het gerepliceerde gegevensformaat niet verandert, ondersteunt SafeKit een doorlopende upgrade met minimale downtime. 

  1. Het cluster draait in eerste instantie in een **✅ PRIM (node 1) / ✅ SECOND (node 2)** configuratie. De applicatie draait op de PRIM node. De gerepliceerde gegevens worden continu gesynchroniseerd met de SECOND node.
  2. Stop de SafeKit-module op de SECOND node. De status wordt **❌ STOP (node 2)**. Upgrade de applicatie en herstart de module. Tijdens deze bewerking blijft de applicatie draaien op node 1, in de status **✅ ALONE (node 1)**. Er vindt geen serviceonderbreking plaats.
  3. Na het opnieuw opstarten wordt de geüpgradede node opnieuw lid van het cluster als **✅ SECOND (node 2)**. De gerepliceerde gegevens worden opnieuw gesynchroniseerd.
  4. Stop de PRIM node. De status wordt **❌ STOP (node 1)**. SafeKit voert automatisch een failover uit. De geüpgradede node wordt **✅ ALONE (node 2)**. De toepassing wordt opnieuw gestart op deze node. De downtime is beperkt tot de failover- en de herstarttijd van de toepassing.
  5. Als de geüpgradede applicatie correct werkt op node 2, upgrade dan de resterende node (node 1) en herstart de SafeKit-module.
  6. Na resynchronisatie keert het cluster terug naar een normale **✅ SECOND (node 1) / ✅ PRIM (node 2)** configuratie. De oorspronkelijke rollen kunnen handmatig worden hersteld met behulp van de SafeKit Administration Console of automatisch via de SafeKit configuratie.


**Rollbackprocedure**

  * Stop bij stap 5 node 2, in de status **✅ ALONE (node 2)**.
  * Start de oorspronkelijke node (node 1) opnieuw op als primair, met de vorige applicatieversie. De status is **✅ ALONE (node 1)**.
  * Installeer de vorige versie opnieuw op de geüpgradede node (node 2).
  * Herstel de normale **✅ PRIM (node 1) / ✅ SECOND (node 2)** configuratie.


De downtime voor de volledige upgrade is beperkt tot de overgang van **✅ PRIM/✅ SECOND** naar **❌ STOP/✅ ALONE**.

### Majorversie-upgrade van de applicatie {#app-level-ha-major}

Een majorversie-upgrade wijzigt het formaat of de structuur van gerepliceerde gegevens. Omdat gegevens die door de nieuwe versie worden gegenereerd niet langer compatibel zijn met de oude, kan er geen doorlopende upgrade worden uitgevoerd.

  1. Het cluster draait in eerste instantie in een **✅ PRIM (node 1) / ✅ SECOND (node 2)** configuratie.
  2. Stop de SECOND node en vervolgens de PRIM node. Het cluster gaat over naar **❌ STOP (node 1) / ❌ STOP (node 2)**.
  3. Upgrade de voormalige PRIM node en start deze opnieuw. De node start alleen, met de nieuwe applicatieversie. De status is **✅ ALONE (node 1)**.
  4. Valideer de geüpgradede toepassing en controleer of deze correct werkt.
  5. Als de validatie succesvol is, upgrade dan de resterende node en start de SafeKit-module opnieuw op.
  6. De geüpgradede node wordt **✅ SECOND (node 2)**. Deze synchroniseert de applicatiegegevens opnieuw. Het cluster keert terug naar een normale **✅ PRIM (node 1) / ✅ SECOND (node 2)** configuratie.


**Rollbackprocedure**

  * Stop in stap 5 de geüpgradede node 1, in de status **✅ ALONE (node 1)**.
  * Start de niet-geüpgradede node (node 2) opnieuw op als primair. De status is **✅ ALONE (node 2)**.
  * Installeer de vorige versie van de toepassing opnieuw op de geüpgradede node.
  * Herstel de oorspronkelijke **✅ SECOND (node 1) / ✅ PRIM (node 2)** configuratie.


Omdat gerepliceerde gegevens tijdens de migratie worden gewijzigd, komt de downtime overeen met de periode tussen de status **❌ STOP/❌ STOP** en de herstart van de eerste geüpgradede node als **✅ ALONE**.

### Voordelen van SafeKit voor applicatie-upgrades {#why-safekit-simplifies-application-upgrades}

SafeKit minimaliseert operationele risico's:

  * Beheerders upgraden één node tegelijk.
  * SafeKit handhaaft de beschikbaarheid van de dienst waar mogelijk.
  * Nieuwe versies worden gevalideerd voordat het productieverkeer wordt overgeschakeld.
  * Beheerders kunnen snel terugkeren naar de vorige node als er onverwachte problemen worden gedetecteerd.


## De juiste upgrade-strategie kiezen {#choosing-the-right-upgrade-strategy}

Implementatiemodel | Applicatie-instanties | Impact van gerepliceerde gegevens | Upgradebenadering  
---|---|---|---  
HA op applicatieniveau | Twee nodes | Afhankelijk van het upgradetype | Rolling upgrade met failover  
HA op VM-niveau met hyperv.safe of kvm.safe | Eén VM | Beheerd binnen de VM | Momentopname maken, upgraden, valideren, indien nodig terugdraaien  
  
## Conclusie {#conclusion}

SafeKit biedt flexibele architecturen voor hoge beschikbaarheid die zich aanpassen aan de operationele vereisten van verschillende toepassingen. Of u nu een geclusterde toepassing op twee nodes of een enkele toepassingsinstantie die in een virtuele machine draait, beschermt, SafeKit maakt gecontroleerde upgrades mogelijk, minimaliseert downtime en biedt betrouwbare herstelopties wanneer onderhoudswerkzaamheden vereist zijn.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}