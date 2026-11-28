---
title: "SafeKit Smart Console: beheer uw cluster met uw telefoon"
canonical: "https://safekit.eviden.com/nl/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "SafeKit Smart Console: configureer en bewaak uw clusters voor hoge beschikbaarheid vanuit een browser of smartphone, zonder code en met realtime meldingen."
category: "architectures"
lang: "nl"
topics: "Smart Console: intuïtieve en foutloze hoge beschikbaarheid op desktop en mobiel, Inhoudsopgave, Hoe werkt een SafeKit mirror-cluster met de webconsole?, Hoe werkt een SafeKit farm-cluster met de webconsole?, Hoe kan ik meerdere modules en clusters via de webconsole monitoren?, Hoe kunt u waarschuwingen in de console controleren en e-mailmeldingen beheren?"
hashpart: "smart-console-intuitive-mobile-and-error-free-high-availability, table-of-contents, safekit-mirror-cluster, safekit-farm-cluster, multipe-modules-clusters, safekit-notifications-cluster"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png"
schemaType: "TechArticle"
---

# SafeKit Smart Console: beheer uw cluster met uw telefoon {#safekit-smart-console-manage-your-cluster-from-your-phone}

## Smart Console: intuïtieve en foutloze hoge beschikbaarheid op desktop en mobiel {#smart-console-intuitive-mobile-and-error-free-high-availability}

Herdefinieer hoe u hoge beschikbaarheid beheert met een oplossing die is gebouwd voor **snelheid en eenvoud**. De SafeKit Web Console biedt een ervaring **zonder leercurve**, waardoor u uw infrastructuur kunt configureren en controleren **zonder code te schrijven**.

Of u nu achter uw bureau zit of onderweg bent, het smartphone-compatibele dashboard geeft u volledige controle over het cluster. Door het beheer van mirror en <span class="notranslate farm-term" translate="no">farm</span>-modules te stroomlijnen, elimineert de Smart Console **menselijke fouten** en zorgt het voor een naadloos failoverproces voor uw meest vitale systemen.

## Inhoudsopgave {#table-of-contents}

  * [Hoe werkt een SafeKit mirror-cluster met de webconsole?](#safekit-mirror-cluster)
  * [Hoe werkt een SafeKit <span class="notranslate farm-term" translate="no">farm</span>-cluster met de webconsole?](#safekit-farm-cluster)
  * [Hoe kan ik meerdere modules en clusters via de webconsole monitoren?](#multipe-modules-clusters)
  * [Hoe kunt u waarschuwingen in de console controleren en e-mailmeldingen beheren?](#safekit-notifications-cluster)


## Hoe werkt een SafeKit mirror-cluster met de webconsole? {#safekit-mirror-cluster}

### Hoe configureer je een SafeKit mirror-cluster? {#safekit-mirror-cluster-configure}


![SafeKit Web Console: dashboard voor hoge beschikbaarheid met heartbeat netwerken, virtuele IP-instellingen en realtime directoryreplicatie voor een mirror-cluster.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


De **SafeKit webconsole** biedt een intuïtieve interface om hoge beschikbaarheid voor uw bedrijfskritische applicaties te orkestreren. In slechts een paar stappen kunt u een **SafeKit mirror-cluster** configureren om bedrijfscontinuïteit te garanderen:

  * **Failover van applicaties (tabblad Macro's):** Definieer de specifieke applicatiediensten die automatisch opnieuw moeten worden gestart in geval van een storing.
  * **Heartbeat netwerk(en):** Toegewezen communicatiepad(en) die door clusterknooppunten worden gebruikt om de status en beschikbaarheid van elkaar continu te controleren en failover-beslissingen te synchroniseren.
  * **Virtueel IP-beheer:** Stel het virtuele IP-adres (VIP) in voor een transparante herverbinding van de client na een failover.
  * **Realtime replicatie:** Selecteer de kritieke mappen voor hostgebaseerde, synchrone replicatie op byteniveau.
  * **Checkers:** controleer de status van de toepassing en activeer een automatisch herstel als er een processtoring wordt gedetecteerd.


Het SafeKit-cluster bevat een speciale split-brain-checker om netwerkisolatieproblemen op te lossen zonder dat er een derde witness-machine of een extra heartbeat netwerk nodig is. Lees meer over [heartbeat, failover en quorum in een cluster](</nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Hoe kan ik een SafeKit mirror-cluster monitoren? {#safekit-mirror-cluster-monitoring}


![SafeKit Web Console: real-time monitoring van een mirror-cluster met 2 nodes, met weergave PRIM en SECOND statussen en actieve datareplicatie.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


De **SafeKit beheerconsole** biedt een uniform overzicht van uw hoge beschikbaarheidsinfrastructuur. Hiermee kunnen beheerders de **operationele status** van het cluster controleren en de gegevenssynchronisatie in realtime volgen.

Voor een mirror-cluster met 2 nodes geeft de console duidelijk de rollen van elke server weer:

  * **PRIM (primair):** de actieve node die momenteel de toepassing uitvoert en het virtuele IP-adres beheert. Deze voert schrijfbewerkingen uit naar de lokale opslag en realtime-replicatie naar de secundaire node.
  * **SECOND:** Het stand-byknooppunt ontvangt synchrone updates op byteniveau. Het is direct klaar om het over te nemen als de primaire node uitvalt.
  * **ALONE-status:** Geeft een visuele waarschuwing wanneer het cluster op één node draait (bijv. tijdens onderhoud of na een storing), wat aangeeft dat de redundantie tijdelijk verloren is gegaan.
  * **Voortgang van de resynchronisatie:** Wanneer een defecte node herstelt, wordt de status oranje tijdens de achtergrondgegevensreïntegratie, zodat er geen downtime is tijdens de fase 'terug naar normaal'.


Naast eenvoudige statuspictogrammen biedt de interface **failover-orkestratie met één klik** via het **`...` menu**, zodat u de primaire rol handmatig opnieuw kunt toewijzen voor gepland onderhoud, terwijl u continue beschikbaarheid voor gebruikersactiviteiten garandeert.

## Hoe werkt een SafeKit <span class="notranslate farm-term" translate="no">farm</span>-cluster met de webconsole? {#safekit-farm-cluster}

### Hoe configureer ik een SafeKit <span class="notranslate farm-term" translate="no">farm</span>-cluster? {#safekit-farm-cluster-configuration}


![SafeKit Web Console: configuratie farm-cluster voor netwerktaakverdeling en virtueel IP-beheer.](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


Het **SafeKit <span class="notranslate farm-term" translate="no">farm</span>-cluster** is ontworpen voor hoge beschikbaarheid en schaalbaarheid van services. De configuratie richt zich op het gelijktijdig verdelen van inkomend verkeer over beide nodes:

  * **Load Balanced Services (tabblad Macro's):** Definieer de specifieke applicatieservices (bijv. Apache, IIS, Nginx) die op alle nodes actief moeten blijven.
  * **Heartbeat netwerk(en):** Communicatiepad(en) die worden gebruikt om te detecteren of een node de <span class="notranslate farm-term" translate="no">farm</span> heeft verlaten, waardoor een onmiddellijke herverdeling van de belasting wordt geactiveerd.
  * **Virtueel IP (<span class="notranslate farm-term" translate="no">farm</span> VIP):** In tegenstelling tot een mirror-cluster wordt het virtuele IP-adres van een <span class="notranslate farm-term" translate="no">farm</span>-cluster gedeeld door alle nodes en verdeelt een kernel-filteralgoritme het netwerkverkeer.
  * **Regels voor taakverdeling:** definieer het beleid voor verkeersverdeling op basis van het bron-IP-adres of de poort.
  * **Checkers:** controleer de status van de toepassing en start deze automatisch opnieuw op als er een procesfout wordt gedetecteerd.


### Hoe kan ik een SafeKit <span class="notranslate farm-term" translate="no">farm</span>-cluster monitoren? {#safekit-farm-cluster-monitoring}


![SafeKit Console: Monitoring van een farm-cluster met 2 nodes, waarbij beide nodes in UP status staan met actieve taakverdeling.](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


Het monitoren van een <span class="notranslate farm-term" translate="no">farm</span>-cluster biedt inzicht in de **actieve-actieve** aard van de infrastructuur, waarbij alle nodes bijdragen aan de prestaties van de toepassing (in dit voorbeeld worden 2 nodes weergegeven; schaalbaar naar extra nodes):

  * **UP status (50% op 2 nodes):** In een gezonde <span class="notranslate farm-term" translate="no">farm</span> bevinden beide nodes zich in de " UP "-status (50%), wat betekent dat ze beide actief clientverzoeken ontvangen en verwerken via het gedeelde virtuele IP-adres.
  * **Automatische herbalancering:** Als één node uitvalt, toont de console visueel dat de resterende node 100% van het verkeer verwerkt. Er is geen "failover"-vertraging, aangezien de overblijvende node al actief is (afgezien van een detectietijd van enkele seconden).
  * **Knooppuntinvoeging:** Wanneer een hersteld node opnieuw wordt gestart, gaat het van " STOP " naar " UP " en begint het automatisch met het ontvangen van zijn deel van de belasting zonder tussenkomst van de beheerder.
  * **Geen gegevenssynchronisatie:** Merk op dat er in een <span class="notranslate farm-term" translate="no">farm</span>-cluster geen oranje resynchronisatiestatus is, aangezien nodes naar verwachting stateless zijn of een backend-database delen (die afzonderlijk kan worden beschermd in een mirror-cluster).


Naast eenvoudige statuspictogrammen biedt de interface beheer van nodes met één klik via het **`...` menu**, waarmee u handmatig een node kunt stoppen of starten voor gepland onderhoud, terwijl het gedeelde virtuele IP-adres automatisch het verkeer opnieuw distribueert zonder de gebruikersactiviteit te onderbreken.

## Hoe kan ik meerdere modules en clusters via de webconsole monitoren? {#multipe-modules-clusters}

### Multimodulevisualisatie binnen één cluster {#safekit-multi-module}


![SafeKit Web Console: 4 Hyper-V modules geïmplementeerd op hetzelfde 2-node-cluster.](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Bij het implementeren van **meerdere modules** op een cluster met twee nodes, biedt de SafeKit Web Console **individuele monitoringwidgets** voor elke module. Dit is met name waardevol voor **SafeKit Hyper-V** oplossingen. 

**Voorbeeld:** In de afbeelding met een configuratie met 4 beveiligde VM's:

  * De console is verbonden met node1, dat als proxy fungeert om met node2 te communiceren.
  * De console geeft **4 widgets** weer (één voor elke VM).
  * Elke VM draait op zijn PRIM node en wordt gerepliceerd naar zijn SECOND node.
  * Beheerders kunnen in realtime zien welke VM's actief zijn op elke node: VM1 en VM2 op node1, VM3 en VM4 op node2.
  * Beheerders kunnen een VM eenvoudig van het ene naar de andere node migreren via het **menu `...`**.


Deze gedetailleerde zichtbaarheid zorgt ervoor dat u zelfs in omgevingen met een hoge dichtheid de volledige controle en direct inzicht behoudt in elke gerepliceerde werklast. 

### Visualisatie van meerdere clusters {#safekit-multi-cluster}


![SafeKit Web Console: 4 clusters geïmplementeerd op 8 servers.](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Wanneer u **meerdere clusters** op verschillende servers implementeert, kunt u ofwel meerdere browsertabbladen gebruiken om verbinding te maken met elk cluster, ofwel de PWA-functie (Progressive Web App) van de console gebruiken. Door de PWA te gebruiken, verwijdert u de navigatiemenu's van de browser, waardoor u schermruimte bespaart om de clusterbewaking op uw bureaublad beter te organiseren. 

**Voorbeeld:** De afbeelding toont vier PWA-consoles die vier videobewakingsclusters monitoren die zich in het noorden, zuiden, westen en oosten bevinden.

**Opmerking:** Als u te veel clusters hebt om op één desktop weer te geven, biedt SafeKit meldingen om fouten in tal van clusters te helpen detecteren. 

## Hoe kunt u waarschuwingen in de console controleren en e-mailmeldingen beheren? {#safekit-notifications-cluster}

### Hoe kan ik direct meldingen ontvangen over statuswijzigingen van modules en kritieke gebeurtenissen? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

De SafeKit-webconsole maakt gebruik van de mogelijkheden van de browser om **direct meldingen** te versturen wanneer de status van een module verandert. Dit zorgt ervoor dat kritieke gebeurtenissen onmiddellijk onder uw aandacht worden gebracht, zelfs wanneer de console zich in een achtergrondtabblad bevindt.

  * **Beveiliging:** Meldingen vereisen toegang via **HTTPS** of localhost.
  * **PWA-integratie:** Installeer de console als een Progressive Web App (PWA) op een desktop of mobiel apparaat voor een ervaring die lijkt op een native app.
  * **Mobiele waarschuwingen:** Op mobiele apparaten zijn meldingen uitsluitend beschikbaar via de PWA, waarbij HTTPS verplicht is.


Dit mechanisme waarschuwt gebruikers onmiddellijk voor kritieke gebeurtenissen, waardoor ze sneller op de hoogte zijn van de clusterstatus en de reactietijden worden verkort.

### SafeKit-video: Console op smartphone (0:54) {#demo-console}


### Hoe kan ik geautomatiseerde e-mailwaarschuwingen instellen in SafeKit? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit logt automatisch alle **belangrijke clustergebeurtenissen in de systeemlogboeken**, waardoor een naadloze integratie met elke monitoringtool op de markt mogelijk is. Bovendien bevat het een speciale **e-mailnotificatieagent** die is ontworpen om deze logboeken te monitoren en kritieke waarschuwingen rechtstreeks naar uw inbox te sturen. Dit zorgt ervoor dat belanghebbenden op de hoogte blijven, zelfs wanneer de webconsole niet actief wordt gemonitord. 

  * **Slim groeperen:** Om ruis te verminderen, groepeert de agent gebeurtenissen die binnen een korte periode plaatsvinden in één samenvattende e-mail.
  * **Volledige dekking:** De agent wordt op alle nodes geïnstalleerd en moet expliciet worden geconfigureerd met SMTP-gegevens om te worden ingeschakeld.
  * **Aanpasbare ontvangers:** Stuur waarschuwingen rechtstreeks naar specifieke IT-teams of managementaliassen om een snelle reactie te garanderen.


Door realtime PWA-waarschuwingen te combineren met intelligente e-mailgroepering, biedt SafeKit een gelaagde meldingsstrategie voor bedrijfskritieke processen.

### SafeKit-video: E-mailmeldingen bij failover (1:04) {#demo-notifications}



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}