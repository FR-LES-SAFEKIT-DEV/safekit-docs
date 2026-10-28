---
title: "SafeKit Smart Console: Uw high availability-cluster in uw zak"
canonical: "https://safekit.eviden.com/nl/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Beheer SafeKit -clusters eenvoudig met onze Smart Console. Profiteer van configuratie zonder code, compatibiliteit met smartphones en realtime PWA-meldingen. Elimineer menselijke fouten en garandeer hoge beschikbaarheid binnen handbereik. Lees meer."
category: "architectures"
lang: "nl"
topics: "Smart Console: Intuïtieve, mobiele en foutloze hoge beschikbaarheid, Inhoudsopgave, Hoe werkt een SafeKit mirror -cluster met de webconsole?, Hoe werkt een SafeKit `farm` -cluster met de webconsole?, Hoe kan ik meerdere modules en meerdere clusters bewaken via de webconsole?, Hoe kan ik waarschuwingen in de console bewaken en e-mailmeldingen beheren?, 🔍 SafeKit High Availability Navigation Hub"
---

# SafeKit Smart Console: Uw High Availability Cluster in uw zak {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: Intuïtief, mobiel en foutloos, hoge beschikbaarheid {#smart-console-intuitive-mobile-and-error-free-high-availability}

Herdefinieer hoe u hoge beschikbaarheid beheert met een oplossing ** is ontworpen voor snelheid en eenvoud ** De SafeKit biedt een ** ervaring, waardoor u uw infrastructuur kunt configureren en beheren zonder code ** ** ** .

Of u nu achter uw bureau zit of onderweg bent, het smartphone-compatibele dashboard geeft u volledige controle over uw cluster. Door het beheer van de modules mirror en `farm` te stroomlijnen, elimineert de Smart Console ** menselijke fouten ** en zorgt deze voor een naadloos failoverproces voor uw meest vitale systemen.

## Inhoudsopgave {#table-of-contents}

  * mirror [ SafeKit de webconsole? ](#safekit-mirror-cluster)
  * `farm` [ SafeKit de webconsole? ](#safekit-farm-cluster)
  * [ Hoe kan ik meerdere modules en meerdere clusters bewaken via de webconsole? ](#multipe-modules-clusters)
  * [ Hoe kan ik waarschuwingen in de console controleren en e-mailmeldingen beheren? ](#safekit-notifications-cluster)


## Hoe werkt een SafeKit mirror -cluster met de webconsole? {#safekit-mirror-cluster}

### Hoe configureer ik een SafeKit Mirror -cluster? {#safekit-mirror-cluster-configure}


![ SafeKit Webconsole: Dashboard voor configuratie van hoge beschikbaarheid met weergave van heartbeat-netwerken, virtuele IP-configuratie en realtime directoryreplicatie voor een mirror -cluster. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


De webconsole ** SafeKit ** biedt een intuïtieve interface voor het orkestreren van hoge beschikbaarheid voor uw kritieke applicaties. In slechts enkele stappen kunt u een cluster ** SafeKit mirror ** configureren om bedrijfscontinuïteit te garanderen.

  * ** Toepassingsfailover (tabblad Macro's): ** Definieer de specifieke toepassingsservices die automatisch opnieuw moeten worden opgestart in geval van een storing.
  * ** Heartbeat-netwerk(en): ** Speciaal communicatiepad(en) gebruikt door clusterknooppunten om elkaars status en beschikbaarheid continu te bewaken en failover-beslissingen te synchroniseren.
  * ** Virtueel IP-beheer: ** Stel het virtuele IP-adres (VIP) in voor een transparante herverbinding van de client na een failover.
  * ** Realtime replicatie: ** Selecteer de kritieke mappen voor hostgebaseerde, synchrone replicatie op byte-niveau.
  * ** Checkers: ** Bewaak de status van de applicatie en activeer automatisch herstel als een procesfout wordt gedetecteerd.


Het SafeKit cluster bevat een speciale split-brain-checker om problemen met netwerkisolatie op te lossen zonder dat een derde witness-machine of een extra heartbeat-netwerk nodig is. Lees meer over de heartbeat, failover en quorum [ in een ](</nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) -cluster.

### Hoe kan ik een SafeKit mirror -cluster monitoren? {#safekit-mirror-cluster-monitoring}


![ SafeKit Webconsole: Realtime monitoring van een 2-knoops mirror -cluster met weergave van de PRIM- en SECOND-status met actieve gegevensreplicatie. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


De ** SafeKit ** beheerconsole biedt een uniform overzicht van uw infrastructuur voor hoge beschikbaarheid. Hiermee kunnen beheerders de ** operationele status ** van het cluster bewaken en de gegevenssynchronisatie in realtime volgen.

Voor een mirror cluster met twee knooppunten worden de rollen van elke server duidelijk weergegeven in de console:

  * ** PRIM (Primair): ** Het actieve knooppunt waarop momenteel de applicatie draait en dat het virtuele IP-adres beheert. Het voert schrijfbewerkingen uit naar de lokale opslag en realtime replicatie naar het secundaire knooppunt.
  * ** SECOND (Secundair): ** Het standby-knooppunt ontvangt synchrone updates op byte-niveau. Het is direct klaar om de taken over te nemen als het primaire knooppunt uitvalt.
  * ** ALONE Status: ** Geeft een visuele melding wanneer het cluster op één knooppunt draait (bijvoorbeeld tijdens onderhoud of na een storing), wat aangeeft dat de redundantie tijdelijk verloren is gegaan.
  * ** Resynchronisatievoortgang: ** Wanneer een defect knooppunt herstelt, kleurt de status oranje tijdens de herintegratie van de achtergrondgegevens, waardoor er geen downtime is tijdens de "terugkeer naar normaal"-fase.


Naast eenvoudige statuspictogrammen biedt de interface ** one-click failover orchestration ** ( ** `...` menu ** ), waarmee u handmatig de primaire rol opnieuw kunt toewijzen voor gepland onderhoud, terwijl de continue beschikbaarheid voor gebruikersactiviteiten gewaarborgd blijft.

## Hoe werkt een SafeKit `farm` -cluster met de webconsole? {#safekit-farm-cluster}

### Hoe configureer ik een SafeKit `farm` -cluster? {#safekit-farm-cluster-configuration}


![ SafeKit Webconsole: Farm clusterconfiguratie voor netwerktaakverdeling en virtueel IP-beheer. ](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


Het cluster ** SafeKit `farm` ** is ontworpen voor hoge beschikbaarheid en schaalbaarheid van services. De configuratie is gericht op het gelijktijdig verdelen van inkomend verkeer over beide knooppunten:

  * ** Load Balanced Services (tabblad Macro's): ** Definieer de specifieke applicatieservices (bijv. Apache, IIS , Nginx ) die op alle knooppunten actief moeten blijven.
  * ** Heartbeat-netwerk(en): ** Communicatiepad(en) gebruikt om te detecteren of een knooppunt het `farm` netwerk heeft verlaten, waardoor een onmiddellijke herverdeling van de belasting wordt geactiveerd.
  * Virtueel IP-adres ** (VIP `Farm` ): ** In tegenstelling tot een mirror -cluster wordt het VIP `Farm` gedeeld tussen knooppunten met behulp van een kernelfilteralgoritme om het netwerkverkeer te verdelen.
  * ** Load Balancing Rules: ** Definieer het verkeersdistributiebeleid op basis van het bron-IP-adres of de poort.
  * ** Checkers: ** Bewaak de status van de applicatie en activeer een automatische herstart als een procesfout wordt gedetecteerd.


### Hoe kan ik een SafeKit `farm` -cluster monitoren? {#safekit-farm-cluster-monitoring}


![ SafeKit Console: Monitoring van een 2-knoops Farm -cluster, waarbij beide knooppunten in de UP-status worden weergegeven met actieve load balancing. ](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


Het monitoren van een `farm` -cluster biedt inzicht in de ** - ** aard van de infrastructuur, waarbij alle knooppunten bijdragen aan de prestaties van de applicatie (in dit voorbeeld worden 2 knooppunten getoond; schaalbaar naar extra knooppunten):

  * ** UP-status (50% op 2 knooppunten): ** In een gezonde `farm` bevinden beide knooppunten zich in de "UP"-status (50%), wat betekent dat ze beide actief clientverzoeken ontvangen en verwerken via het gedeelde virtuele IP-adres.
  * Automatische herverdeling: ** Als één knooppunt uitvalt, toont de console visueel dat het resterende knooppunt 100% van het verkeer overneemt. Er is geen failover-vertraging, omdat het overgebleven knooppunt al actief is (afgezien van een detectietijd van enkele seconden ** .
  * ** Knooppuntinvoeging: ** Wanneer een gerepareerd knooppunt opnieuw wordt opgestart, gaat het over van "STOP" naar "UP" en begint het automatisch zijn deel van de belasting te ontvangen zonder tussenkomst van de beheerder.
  * ** Geen gegevenssynchronisatie: ** Merk op dat er in een `farm` -cluster geen "Oranje" resynchronisatiestatus is, omdat van de knooppunten wordt verwacht dat ze stateless zijn of een gedeelde backend-database hebben (die afzonderlijk kan worden beveiligd in een mirror -cluster).


Naast eenvoudige statuspictogrammen biedt de interface beheer van knooppunten met één klik ( ** `...` menu ** ), waarmee u een knooppunt handmatig kunt stoppen of starten voor gepland onderhoud, terwijl het gedeelde virtuele IP-adres het verkeer automatisch herverdeelt zonder de gebruikersactiviteit te onderbreken.

## Hoe kan ik meerdere modules en meerdere clusters via de webconsole bewaken? {#multipe-modules-clusters}

### Visualisatie van meerdere modules binnen één cluster {#safekit-multi-module}


![ SafeKit Webconsole: 4 Hyper-V-modules geïmplementeerd op hetzelfde cluster met 2 knooppunten. ](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Bij het implementeren van meerdere modules op een cluster met twee knooppunten ** ** ) biedt de webconsole SafeKit afzonderlijke monitoringwidgets ( ** ** voor elke module. Dit is met name waardevol voor Hyper-V-oplossingen ** SafeKit ** ). 

** Voorbeeld: ** In de afbeelding met een configuratie met 4 beveiligde VM's:

  * De console is verbonden met node1, die fungeert als proxy voor de communicatie met node2.
  * De console toont ** 4 widgets ** (één voor elke VM).
  * Elke VM draait op zijn primaire knooppunt en wordt gerepliceerd naar zijn secundaire knooppunt.
  * Beheerders kunnen in realtime zien dat VM1 en VM2 actief zijn op node1, terwijl VM2 en VM3 actief zijn op node 2.
  * Beheerders kunnen een VM eenvoudig van het ene knooppunt naar het andere migreren met behulp van het menu ** `...` ** .


Deze gedetailleerde zichtbaarheid zorgt ervoor dat u zelfs in omgevingen met een hoge dichtheid volledige controle en direct inzicht behoudt in elke gerepliceerde workload. 

### Visualisatie van meerdere clusters {#safekit-multi-cluster}


![ SafeKit Webconsole: 4 clusters geïmplementeerd op 8 servers. ](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Bij het implementeren van meerdere clusters ** ** ) over verschillende servers, kunt u meerdere browsertabbladen gebruiken om verbinding te maken met elk cluster, of de PWA-functie (Progressive Web App) van de console gebruiken. Door de PWA te gebruiken, worden de navigatiemenu's van de browser verwijderd, waardoor u schermruimte bespaart en de clusterbewaking op uw bureaublad beter kunt organiseren. 

** Voorbeeld: ** De afbeelding toont vier PWA-consoles die vier videobewakingsclusters bewaken: één in het noorden, zuiden, westen en oosten.

** Opmerking: ** Wanneer u te veel clusters hebt om op één bureaublad weer te geven, biedt SafeKit meldingen om fouten in meerdere clusters te detecteren. 

## Hoe kan ik waarschuwingen in de console controleren en e-mailnotificaties beheren? {#safekit-notifications-cluster}

### Hoe kan ik direct meldingen ontvangen over wijzigingen in de modulestatus en kritieke gebeurtenissen? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

De SafeKit webconsole maakt gebruik van native browserfunctionaliteiten om ** -directe meldingen ** te verzenden wanneer de status van een module verandert. Dit zorgt ervoor dat belangrijke gebeurtenissen onmiddellijk onder uw aandacht worden gebracht, zelfs wanneer de console zich in een achtergrondtabblad bevindt.

  * ** Beveiliging: ** Meldingen vereisen toegang via ** HTTPS ** of localhost.
  * ** PWA-integratie: ** Installeer de console als een Progressive Web App (PWA) op desktop of mobiel voor een native app-achtige ervaring.
  * ** Mobiele meldingen: ** Op mobiele apparaten zijn meldingen uitsluitend beschikbaar via de PWA, waarbij HTTPS verplicht is.


Dit mechanisme waarschuwt gebruikers direct bij kritieke gebeurtenissen, waardoor ze sneller op de hoogte zijn van de clusterstatus en de reactietijden worden verkort.

### SafeKit Video: Console op smartphone (0:54) {#demo-console}

&lt;br /> 

### Hoe kan ik geautomatiseerde e-mailmeldingen instellen in SafeKit ? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit registreert automatisch alle belangrijke clustergebeurtenissen ** in de systeemlogboeken ** , waardoor naadloze integratie met elke monitoringtool op de markt mogelijk is. Daarnaast bevat het een speciale e-mailnotificatieagent ** ** die is ontworpen om deze logboeken te bewaken en kritieke waarschuwingen rechtstreeks naar uw inbox te sturen. Dit zorgt ervoor dat belanghebbenden op de hoogte blijven, zelfs wanneer de webconsole niet actief wordt bewaakt. 

  * ** Slimme groepering: ** Om ruis te verminderen, groepeert de agent gebeurtenissen die binnen een korte periode plaatsvinden in één samenvattende e-mail.
  * ** Volledige dekking: ** De agent is op alle knooppunten geïnstalleerd en moet expliciet worden geconfigureerd met SMTP-gegevens om te worden ingeschakeld.
  * ** Aanpasbare ontvangers: ** Stuur meldingen rechtstreeks naar specifieke IT-teams of beheerdersaliassen om een snelle reactie te garanderen.


Door realtime PWA-waarschuwingen te combineren met intelligente e-mailgroepering, biedt SafeKit een gelaagde notificatiestrategie voor bedrijfskritische operaties.

### SafeKit Video: E-mailmeldingen bij failover (1:04) {#demo-notifications}

&lt;br /> 


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}