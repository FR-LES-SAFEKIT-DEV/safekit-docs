---
title: "Het combineren van SafeKit hoge beschikbaarheid met back-ups voor noodherstel."
canonical: "https://safekit.eviden.com/nl/best-practises/high-availability-disaster-recovery-hadr/"
description: "Ontwikkel een robuuste HA/DR-strategie door SafeKit te combineren voor synchrone replicatie (RPO=0) met asynchrone back-up voor herstel na een ramp op een externe locatie. Garandeer 24/7 applicatiebeschikbaarheid en data-integriteit op Windows en Linux met deze tweelaagse aanpak."
category: "best-practises"
lang: "nl"
topics: "Synchrone SafeKit -replicatie voor HA versus asynchrone back-upreplicatie voor DR, Inhoudsopgave, Synchrone HADR: geen gegevensverlies over snelle netwerken (LAN/VLAN), Asynchrone HADR: rampenherstel over trage netwerken (WAN), Hoe HADR en back-up te combineren voor totale systeemveerkracht, Vergelijking van HADR-architecturen: snelle versus trage netwerken, Videogids: Hoe HADR te implementeren met SafeKit , 🔍 SafeKit High Availability Navigation Hub"
---

# Combinatie van SafeKit hoge beschikbaarheid met noodherstelback-ups {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Synchrone SafeKit -replicatie voor HA versus asynchrone back-upreplicatie voor DR {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit biedt een flexibele, softwarematige **architectuur voor hoge beschikbaarheid en noodherstel (HADR)** die de noodzaak voor dure gedeelde opslag overbodig maakt. Door **synchrone replicatie** over een uitgestrekt VLAN tussen Server 1 en Server 2 te implementeren, zorgt SafeKit ervoor dat uw kritieke applicaties "live" en consistent blijven tussen twee redundante locaties.

Om de beperkingen van WAN's met een lagere bandbreedte aan te pakken, is SafeKit ontworpen om te worden gecombineerd met **back-up- en hersteloplossingen** . Hierdoor kunnen organisaties 24/7 beschikbaarheid garanderen door middel van automatische failover, terwijl historische gegevens worden beveiligd voor herstel na een calamiteit op een externe locatie.

Hierdoor is de omgeving beschermd tegen hardware- of softwarefouten via SafeKit en beveiligd tegen logische fouten en cyberdreigingen zoals ransomware door de back-upoplossing.


![ Een technisch diagram dat laat zien waarom hoge beschikbaarheid ( SafeKit ) en back-ups complementair zijn: SafeKit verzorgt hardware-/softwarefailover via synchrone replicatie, terwijl asynchrone back-ups beschermen tegen ransomware en logische fouten. ](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**HA versus back-up: het combineren van SafeKit synchrone replicatie met asynchrone DR**

## Inhoudsopgave {#table-of-contents}

  * [ Synchrone HADR: Geen gegevensverlies over snelle netwerken (LAN/VLAN) ](#synchronous-hadr-fast-network)
  * [ Asynchrone HADR: Rampenherstel via trage netwerken (WAN) ](#asynchronous-hadr-slow-network)
  * [ Hoe HADR en back-up te combineren voor totale systeemveerkracht ](#hadr-resilience-strategy)
  * [ Vergelijking van HADR-architecturen: snelle versus trage netwerken ](#hadr-architectures-comparison)
  * Videohandleiding [ : Hoe HADR te implementeren met SafeKit ](#videoguide-hadr-safekit)
  * [ 🔍 SafeKit Navigatiehub met hoge beschikbaarheid ](#hub)



{{%  insert-safekit-4-buttons-nl  %}}
 

## Synchrone HADR: geen gegevensverlies over snelle netwerken (LAN/VLAN) {#synchronous-hadr-fast-network}

### Hoe implementeer ik HADR over een snel netwerk? {#hadr-fast-network-architecture}


![ -architectuur die hoge beschikbaarheid en noodherstel (HADR) combineert zonder gedeelde schijven ](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Om HADR (High Availability and Disaster Recovery) over een snel netwerk te implementeren, plaatst u twee nodes op verschillende externe locaties om tegelijkertijd hoge beschikbaarheid en disaster recovery te bieden. Deze configuratie zorgt ervoor dat uw applicatie beschikbaar blijft, zelfs als een volledige locatie uitvalt, zonder de complexiteit van een gedeelde opslaginfrastructuur.

### Waarom een SANless HADR-oplossing gebruiken voor snelle netwerken? {#sanless-hadr-solution}

Een SAN-loze oplossing zoals SafeKit is essentieel omdat deze gegevens synchroon en in realtime repliceert tussen twee knooppunten zonder gedeelde schijven. Omdat synchrone replicatie zorgt voor nul gegevensverlies (RPO=0), kan de software direct een automatische failover van de applicatie in gang zetten als er een hardware- of softwarefout optreedt.

### Wat zijn de netwerkvereisten voor synchrone HADR? {#extended-lan-vlan-requirements}

Synchrone HADR vereist een uitgebreid LAN of een uitgestrekt VLAN om drie cruciale redenen:

  * **Virtuele IP-failover:** Er is één subnet nodig om het virtuele IP-adres [ ](</nl/best-practises/how-a-virtual-ip-address-works/>) automatisch tussen knooppunten te laten overschakelen.
  * **Lage latentie:** [ Synchrone replicatie ](</nl/best-practises/synchronous-replication-vs-asynchronous-replication/>) zonder gegevensverlies vereist doorgaans een netwerk-roundtrip-tijd van minder dan 5 ms.
  * **Hoge bandbreedte:** Een verbinding van 1 Gb/s of meer is vereist om snelle gegevensresynchronisatie tijdens een failback te garanderen.


## Asynchrone HADR: Rampenherstel via trage netwerken (WAN) {#asynchronous-hadr-slow-network}

### Hoe implementeer ik HADR over een traag netwerk? {#hadr-slow-network-architecture}


![ HADR-architectuur die hoge beschikbaarheid scheidt van noodherstel ](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Om HADR over een traag netwerk (WAN) te implementeren, scheidt de architectuur doorgaans **High Availability** van **Disaster Recovery** . In dit scenario worden twee knooppunten op de primaire locatie ingezet voor lokale redundantie, terwijl een aparte back-up- of asynchrone replicatiestrategie wordt gebruikt om gegevens op een externe locatie te beschermen.

### Wat is de beste HADR-oplossing voor verbindingen met een lage bandbreedte? {#sanless-ha-with-remote-dr}

De optimale oplossing omvat het inzetten van **SafeKit** op de primaire locatie voor lokale hoge beschikbaarheid met behulp van synchrone realtime replicatie en automatische failover. Voor de disaster recovery-locatie worden gegevens beschermd via asynchrone replicatie of geplande back-ups via het trage netwerk, waardoor de lokale uptime behouden blijft zonder knelpunten door WAN-latentie. Om deze architectuur te realiseren is een dedicated **back-upoplossing** (anders dan SafeKit ) nodig om de gegevensoverdracht en het herstel op de externe locatie te beheren. 

### Hoe werkt failover met een externe locatie voor noodherstel? {#dr-site-failover-process}

Omdat asynchrone replicatie via een traag netwerk potentieel gegevensverlies met zich meebrengt (RPO > 0), is het failoverproces naar een noodherstellocatie doorgaans handmatig en wordt het beheerd door een beheerder:

  * **Gegevensherstel:** Back-ups worden hersteld op secundaire servers op de DR-locatie. Moderne oplossingen zoals **Veeam** worden vaak gebruikt om virtuele machines (VM's) snel te herstellen en zo de hersteltijd te verkorten.
  * **DNS-omleiding:** Het verkeer wordt op DNS-niveau omgeleid naar de DR-site. De hersteltijd is afhankelijk van de time-outs van de DNS-cache (TTL) en sommige clienttoepassingen moeten mogelijk opnieuw worden opgestart om het nieuwe IP-adres te verkrijgen.
  * **Handmatige beslissing:** Een beheerder moet de gegevensintegriteit op de externe locatie controleren voordat de overschakeling naar het secundaire datacenter wordt geautoriseerd.


## Hoe HADR en back-up te combineren voor totale systeemveerkracht {#hadr-resilience-strategy}

### Vergelijking van hoge beschikbaarheid en gegevensback-up {#ha-vs-backup-comparison}


![ SafeKit logo voor software met hoge beschikbaarheid ](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![ Pictogram voor back-upstrategie ](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Hoewel beide cruciaal zijn voor gegevensbescherming, richten **High Availability (HA)** en **Backup Solutions** zich op verschillende risico's. **High Availability** , aangedreven door SafeKit , biedt een "live" failover-mechanisme om applicaties toegankelijk te houden tijdens serveruitval of hardwarestoringen. Een **Backup Solution** fungeert daarentegen als een "historisch" archief. Terwijl HA een systeem beschikbaarheid van 99,99% garandeert door gegevens in realtime te repliceren, richt back-up zich op gegevensintegriteit en biedt het de nodige herstelpunten om te herstellen van logische fouten, onbedoelde verwijderingen of ransomware-aanvallen.

### Is hoge beschikbaarheid een vervanging voor een back-upstrategie? {#ha-vs-backup-ransomware}

Nee, hoge beschikbaarheid en back-ups zijn complementair, niet uitwisselbaar. Hoewel **SafeKit** **de bedrijfscontinuïteit** waarborgt door applicaties draaiende te houden tijdens een hardwarestoring, biedt het geen bescherming tegen logische fouten, onbedoelde verwijderingen of ransomware-aanvallen. Omdat realtime replicatie bijvoorbeeld elke wijziging direct kopieert, wordt een ransomware-aanval op het primaire knooppunt onmiddellijk gedupliceerd op het secundaire knooppunt. Om te herstellen van dergelijke cyberdreigingen of onbedoelde verwijderingen, hebt u een speciale **back-upoplossing** nodig met een robuust bewaarbeleid. Hiermee kunt u uw omgeving terugzetten naar een gezonde staat van vóór de corruptie plaatsvond.

### RTO en RPO optimaliseren: de synergie tussen HA en back-up {#ha-backup-rpo-rto}

Om een echt veerkrachtige infrastructuur te bouwen, moet u zowel hoge beschikbaarheid als back-up integreren in een uniforme strategie. Deze twee technologieën behandelen verschillende dimensies van de [ (Recovery Time Objective) en RPO (Recovery Point Objective) vergelijking ](</nl/best-practises/what-is-rpo-and-rto-with-examples/>) 

  * **Hoge beschikbaarheid (via SafeKit ):** Doelwitten **Direct herstel** . Door een live, synchrone mirror van uw omgeving te handhaven, bereikt SafeKit een RTO van bijna nul en een RPO van nul. Als een server uitvalt, wordt de applicatie onmiddellijk hervat op het secundaire knooppunt, waardoor er geen serviceonderbreking of gegevensverlies optreedt tijdens de overgang.
  * **Back-upoplossingen:** Doel **Gegevensbestendigheid** . Terwijl HA de service "live" houdt, creëert een back-up een "onveranderlijke" geschiedenis. Het is uw terugvaloptie voor het geval de live data zelf gecompromitteerd raakt, waardoor u een schone versie van uw database kunt herstellen vanaf een specifiek moment voordat een virus of onbedoelde verwijdering plaatsvond.


## Vergelijking van HADR-architecturen: snelle versus trage netwerken {#hadr-architectures-comparison}

Criteria | Snel netwerk (LAN/VLAN) | Langzaam netwerk (WAN)  
---|---|---  
Primaire reikwijdte | Lokale redundantie en hoge beschikbaarheid | Herstel na rampen tussen locaties  
Gebruiksscenario | Zelfde datacenter of campus | Externe datacenters of cloudregio's  
Replicatietype | Synchroon (Realtime) | Asynchroon / Back-up  
RPO (Gegevensverlies) | Nul (RPO = 0) | Potentieel gegevensverlies (RPO > 0)  
Failoverproces | Automatisch | Handmatig (beslissing van de beheerder)  
Verkeersomleiding | Virtueel IP-adres (VIP) | DNS-niveau (TTL-afhankelijk)  
Latentievereiste | Laag (doorgaans < 5 ms) | Ondersteunt hoge latentie  
Primair hersteldoel | Onmiddellijke bedrijfscontinuïteit | Gegevensveiligheid en -bewaring  
  
## Videohandleiding: HADR implementeren met SafeKit {#videoguide-hadr-safekit}

###  Hoe HADR te implementeren met SafeKit : Synchrone replicatie en failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Leer hoe u **High Availability (HA)** en **Disaster Recovery (DR)** kunt combineren tot één HADR-strategie met behulp van SafeKit . Deze videogids onderzoekt de architectuur die nodig is voor 100% applicatiebeschikbaarheid zonder gedeelde schijven.

### Videohoogtepunten {#video-highlights}

  1. 🎬 [ Introductie tot SafeKit HADR over Stretched VLANs ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [ Hoe synchroon spiegelen en dubbele bevestiging werken (1:41) ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. 🎬 [ Failover-mechanismen: Gratuitous ARP (GARP) & Virtueel IP ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [ Ontwerpen voor trage WAN: HA- versus back-upstrategieën ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit Video: Hoe implementeer je High Availability and Disaster Recovery (HADR) met SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}

&lt;br /> 


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}