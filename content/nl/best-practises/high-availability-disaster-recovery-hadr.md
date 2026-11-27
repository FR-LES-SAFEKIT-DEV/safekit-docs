---
title: "SafeKit High Availability combineren met back-ups voor noodherstel"
canonical: "https://safekit.eviden.com/nl/best-practises/high-availability-disaster-recovery-hadr/"
description: "Combineer hoge beschikbaarheid van SafeKit (synchrone replicatie, RPO 0) met asynchrone back-ups voor disaster recovery op een externe locatie, op Windows en Linux."
category: "best-practises"
lang: "nl"
topics: "Synchrone SafeKit replicatie voor HA versus asynchrone back-upreplicatie voor DR, Inhoudsopgave, Synchrone HADR: nul gegevensverlies via snelle netwerken (LAN/VLAN), Asynchrone HADR: herstel na noodgevallen via trage netwerken (WAN), HADR en back-up combineren voor totale systeemveerkracht, Vergelijking van HADR-architecturen: snelle versus trage netwerken, Videogids: HADR implementeren met SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# SafeKit High Availability combineren met back-ups voor noodherstel {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Synchrone SafeKit replicatie voor HA versus asynchrone back-upreplicatie voor DR {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit biedt een flexibele, softwaregebaseerde **architectuur voor hoge beschikbaarheid en noodherstel (HADR)** die de noodzaak van dure gedeelde opslag elimineert. Door **synchrone replicatie** te implementeren via een stretched VLAN tussen server 1 en server 2, zorgt SafeKit ervoor dat uw bedrijfskritische applicaties "live" en consistent blijven tussen twee redundante locaties.

Om de beperkingen van WAN's met een lagere bandbreedte aan te pakken, is SafeKit ontworpen om te worden gekoppeld aan **back-up- en hersteloplossingen**. Hierdoor kunnen organisaties 24/7 uptime behouden door middel van automatische failover, terwijl historische gegevens worden beveiligd voor herstel na noodgevallen op een externe locatie.

Daardoor wordt de omgeving via SafeKit beschermd tegen hardware- of softwarefouten en beveiligd tegen logische fouten en cyberdreigingen zoals ransomware via de back-upoplossing.


![Een technisch diagram dat laat zien waarom hoge beschikbaarheid (SafeKit) en back-ups elkaar aanvullen: SafeKit beheert hardware-/software-failover via synchrone replicatie, terwijl asynchrone back-up beschermt tegen ransomware en logische fouten.](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**Hoge beschikbaarheid met SafeKit en herstel na noodgevallen met back-ups**

## Inhoudsopgave {#table-of-contents}

  * [Synchrone HADR: nul gegevensverlies via snelle netwerken (LAN/VLAN)](#synchronous-hadr-fast-network)
  * [Asynchrone HADR: herstel na noodgevallen via trage netwerken (WAN)](#asynchronous-hadr-slow-network)
  * [HADR en back-up combineren voor totale systeemveerkracht](#hadr-resilience-strategy)
  * [Vergelijking van HADR-architecturen: snelle versus trage netwerken](#hadr-architectures-comparison)
  * [Videogids: HADR implementeren met SafeKit](#videoguide-hadr-safekit)
  * [🔍 Ontdek SafeKit](#hub)



{{%  insert-safekit-4-buttons-nl  %}}
 

## Synchrone HADR: nul gegevensverlies via snelle netwerken (LAN/VLAN) {#synchronous-hadr-fast-network}

### Hoe HADR implementeren via een snel netwerk? {#hadr-fast-network-architecture}


![Architectuur die hoge beschikbaarheid en noodherstel (HADR) combineert zonder gedeelde schijven](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Om HADR over een snel netwerk te implementeren, implementeert u twee knooppunten op externe locaties om tegelijkertijd hoge beschikbaarheid en noodherstel te bieden. Deze configuratie zorgt ervoor dat uw toepassing beschikbaar blijft, zelfs als een hele locatie uitvalt, zonder de complexiteit van een gedeelde opslaginfrastructuur.

### Waarom een SANless HADR-oplossing gebruiken voor snelle netwerken? {#sanless-hadr-solution}

Een SANless-oplossing zoals SafeKit is essentieel omdat het gegevens synchroon en in realtime repliceert tussen twee knooppunten zonder gedeelde schijven. Omdat synchrone replicatie geen gegevensverlies garandeert (RPO = 0), kan de software onmiddellijk een automatische failover van de toepassing activeren als er een hardware- of softwarestoring optreedt.

### Wat zijn de netwerkvereisten voor synchrone HADR? {#extended-lan-vlan-requirements}

Synchrone HADR vereist een uitgebreid LAN of een stretched VLAN om drie cruciale redenen:

  * **Virtuele IP-failover:** Er is één subnet vereist. Het [virtuele IP-adres](</nl/best-practises/how-a-virtual-ip-address-works/>) kan dan automatisch tussen knooppunten worden verplaatst.
  * **Lage latentie:** [Synchrone replicatie](</nl/best-practises/synchronous-replication-vs-asynchronous-replication/>) zonder gegevensverlies vereist doorgaans een netwerkroundtriptijd van minder dan 5 ms.
  * **Hoge bandbreedte:** Een verbinding van 1 Gb/s of meer is vereist om een snelle gegevensresynchronisatie tijdens een failback te garanderen.


## Asynchrone HADR: herstel na noodgevallen via trage netwerken (WAN) {#asynchronous-hadr-slow-network}

### Hoe HADR implementeren over een traag netwerk? {#hadr-slow-network-architecture}


![HADR-architectuur die hoge beschikbaarheid scheidt van herstel na noodgevallen](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Om HADR over een traag netwerk (WAN) te implementeren, scheidt de architectuur doorgaans **hoge beschikbaarheid** van **herstel na noodgevallen**. In dit scenario worden twee knooppunten op de primaire locatie geïmplementeerd voor lokale redundantie, terwijl een afzonderlijke back-up- of asynchrone replicatiestrategie wordt gebruikt om gegevens op een externe locatie te beschermen.

### Wat is de beste HADR-oplossing voor verbindingen met een lage bandbreedte? {#sanless-ha-with-remote-dr}

De optimale oplossing omvat het implementeren van **SafeKit** op de primaire locatie voor lokale hoge beschikbaarheid met behulp van synchrone realtime replicatie en automatische failover. Voor de noodherstelsite worden gegevens beschermd via asynchrone replicatie of geplande back-ups via het trage netwerk, zodat de lokale uptime wordt gehandhaafd zonder te worden beperkt door WAN-latentie. Om deze architectuur te realiseren, is een speciale **back-upoplossing** (anders dan SafeKit) vereist om de gegevensoverdracht en -herstel op de externe locatie te beheren. 

### Hoe werkt failover met een externe noodherstel-site? {#dr-site-failover-process}

Omdat asynchrone replicatie via een traag netwerk mogelijk gegevensverlies met zich meebrengt (RPO > 0), is het failoverproces naar een noodherstellocatie doorgaans handmatig en wordt het beheerd door een beheerder:

  * **Gegevensherstel:** Back-ups worden hersteld op secundaire servers op de DR-locatie. Moderne oplossingen herstellen virtuele machines (VM's) snel om de hersteltijd te verkorten. Een voorbeeld hiervan is **Veeam**.
  * **DNS-omleiding:** Verkeer wordt omgeleid naar de DR-site op DNS-niveau. De hersteltijd is afhankelijk van de time-outs van de DNS-cache (TTL) en sommige clienttoepassingen moeten mogelijk opnieuw worden opgestart om het nieuwe IP-adres te herkennen.
  * **Handmatige beslissing:** een beheerder moet de gegevensintegriteit op de externe locatie verifiëren voordat de overstap naar het secundaire datacenter wordt geautoriseerd.


## HADR en back-up combineren voor totale systeemveerkracht {#hadr-resilience-strategy}

### Vergelijking van hoge beschikbaarheid en gegevensback-up {#ha-vs-backup-comparison}


![Logo van SafeKit-software voor hoge beschikbaarheid](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![Icoon voor back-upstrategie](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Hoewel beide cruciaal zijn voor gegevensbescherming, **richten hoge beschikbaarheid (HA)** en **back-upoplossingen** zich op verschillende risico's. **Hoge beschikbaarheid**, mogelijk gemaakt door SafeKit, biedt een 'live' failovermechanisme om applicaties toegankelijk te houden tijdens serverstoringen of hardwarefouten. Een **back-upoplossing** daarentegen fungeert als een 'historisch' archief. Terwijl HA 99,99% systeemtoegankelijkheid garandeert door gegevens in realtime te repliceren, richt back-up zich op gegevensintegriteit en biedt het de nodige herstelpunten om te herstellen van logische fouten, onbedoelde verwijderingen of ransomware-aanvallen.

### Is hoge beschikbaarheid een vervanging voor een back-upstrategie? {#ha-vs-backup-ransomware}

Nee, hoge beschikbaarheid en back-ups zijn complementair, niet uitwisselbaar. Hoewel **SafeKit** **de bedrijfscontinuïteit** waarborgt door applicaties operationeel te houden tijdens een hardwarecrash, beschermt het niet tegen logische fouten, onbedoelde verwijderingen of ransomware-aanvallen. Omdat realtime replicatie elke wijziging onmiddellijk spiegelt, wordt een ransomware-aanval op de primaire node bijvoorbeeld direct gedupliceerd op de secundaire node. Om te herstellen van dergelijke cyberdreigingen of onbedoelde verwijderingen, heeft u een speciale **back-upoplossing** nodig met een robuust retentiebeleid. Hierdoor kunt u uw omgeving "terugspoelen" naar een gezonde staat van vóór de corruptie.

### RTO en RPO optimaliseren: de synergie tussen HA en back-up {#ha-backup-rpo-rto}

Om een echt veerkrachtige infrastructuur op te bouwen, moet u zowel hoge beschikbaarheid als back-up integreren in een uniforme strategie. Deze twee technologieën hebben betrekking op verschillende dimensies van de hersteltijd (RTO) en het herstelpunt (RPO). Zie [RTO en RPO met voorbeelden](</nl/best-practises/what-is-rpo-and-rto-with-examples/>) voor meer informatie.

  * **Hoge beschikbaarheid (via SafeKit):** Het doel is **onmiddellijk herstel**. SafeKit onderhoudt een live, synchrone kopie van uw omgeving. De RTO is bijna nul. De RPO is nul. Als een server uitvalt, wordt de toepassing onmiddellijk hervat op de secundaire node, waardoor er geen serviceonderbreking of gegevensverlies optreedt tijdens de overgang.
  * **Back-upoplossingen:** hun doel is **gegevensveerkracht**. Waar HA de service 'live' houdt, creëert een back-up een 'onveranderlijke' geschiedenis. Een back-up is uw vangnet wanneer de livegegevens zelf in gevaar komen. Hiermee kunt u een schone versie van uw database herstellen vanaf een specifiek tijdstip, voordat een virus of een onbedoelde verwijdering plaatsvond.


## Vergelijking van HADR-architecturen: snelle versus trage netwerken {#hadr-architectures-comparison}

Criteria | Snel netwerk (LAN/VLAN) | Traag netwerk (WAN)  
---|---|---  
Primaire reikwijdte | Lokale redundantie en hoge beschikbaarheid | Site-to-site noodherstel  
Gebruiksscenario | Hetzelfde datacenter of dezelfde campus | Externe datacenters of cloudregio's  
Replicatietype | Synchroon (realtime) | Asynchroon / Back-up  
RPO (gegevensverlies) | Nul (RPO = 0) | Potentieel gegevensverlies (RPO > 0)  
Failoverproces | Automatisch | Handmatig (beslissing Admin)  
Verkeer omleiden | Virtueel IP-adres (VIP) | DNS-niveau (afhankelijk van TTL)  
Latentievereiste | Laag (doorgaans < 5 ms) | Ondersteunt hoge latentie  
Primair hersteldoel | Onmiddellijke bedrijfscontinuïteit | Gegevensbeveiliging en -bewaring  
  
## Videogids: HADR implementeren met SafeKit {#videoguide-hadr-safekit}

###  HADR implementeren met SafeKit: synchrone replicatie en failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Leer hoe u **hoge beschikbaarheid (HA)** en **noodherstel (DR)** kunt combineren in één HADR-strategie met SafeKit. Deze videogids onderzoekt de architectuur die nodig is voor 100% applicatiebeschikbaarheid zonder de noodzaak van gedeelde schijven.

### Videohoogtepunten {#video-highlights}

  1. 🎬 [Introductie tot SafeKit HADR via stretched VLAN's](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [Hoe synchrone spiegeling en dubbele bevestiging werken](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [Failovermechanismen: gratuitous ARP (GARP) & virtueel IP](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [Ontwerpen voor een trage WAN: HA versus back-upstrategieën](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit-video: Hoge beschikbaarheid en noodherstel (HADR) implementeren met SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}