---
title: "Hoe een virtueel IP-adres (VIP) werkt bij clustering met hoge beschikbaarheid?"
canonical: "https://safekit.eviden.com/nl/best-practises/how-a-virtual-ip-address-works/"
description: "Ontdek hoe SafeKit softwaregedefinieerde virtuele IP-adressen (VIP) gebruikt om 24/7 uptime te garanderen. Lees meer over geautomatiseerde failover via Gratuitous ARP en waarom dit beter presteert dan DNS-omleiding voor bedrijfscontinuïteit op Windows en Linux."
category: "best-practises"
lang: "nl"
topics: "Wat is een virtueel IP-adres in een cluster met hoge beschikbaarheid?, Virtuele IP-implementatie in SafeKit, Inhoudsopgave, Hoe een virtueel IP-adres (VIP) werkt in een failover van hetzelfde subnet (spiegelcluster), Hoe een virtueel IP-adres (VIP) werkt in verschillende subnetten (spiegelcluster), Hoe een taakgebalanceerd virtueel IP-adres werkt in een boerderij met hetzelfde subnet (boerderijcluster), Hoe een taakgebalanceerd virtueel IP-adres werkt in verschillende subnetten (boerderijcluster), Virtueel IP versus DNS Omleiding: waarom DNS-failover vaak mislukt, vergelijking: virtuele IP-implementatie, latentie en transparantie van applicaties, een virtueel IP-adres configureren voor netwerktaakverdeling en hoge beschikbaarheid, veelgestelde vragen over virtueel IP (VIP), 🔍 SafeKit High Availability Navigation Hub"
---

# Hoe een virtueel IP-adres (VIP) werkt bij clustering met hoge beschikbaarheid? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Wat is een virtueel IP-adres in een cluster met hoge beschikbaarheid? {#virtual-ip-definition}

  * **Definitie:** Een **Virtueel IP-adres (VIP)** is een zwevend netwerkadres dat wordt gebruikt in [clustering met hoge beschikbaarheid](</nl/>) om continue toegang tot applicaties te garanderen. In tegenstelling tot standaard IP's is een VIP niet gebonden aan een specifieke fysieke hardware-interface, maar schakelt hij tussen clusterknooppunten om één enkel, persistent toegangspunt voor clients te behouden.
  * **Geen hardware vereist:** SafeKit beheert de VIP op softwareniveau met behulp van **Gratuitous ARP (GARP)** , waardoor er geen externe load balancers nodig zijn in omgevingen met hetzelfde subnet.
  * **Applicatietransparantie:** Door te binden aan een lokaal VIP merken applicaties geen failovergebeurtenissen op, waardoor clientbron-IP's en bestaande beveiligingsconfiguraties behouden blijven.
  * **Disaster Recovery:** Door gebruik te maken van een **Extended LAN** kan dezelfde VIP worden gebruikt in externe datacenters, waardoor site-to-site failover wordt vereenvoudigd in vergelijking met complexe DNS-omleiding en TTL-cachingvertragingen.


## Virtuele IP-implementatie in SafeKit {#safekit-vip-implementation}

  * **Mirror Clusters:** Beschikt over een zwevend IP-adres dat alleen actief is op de primaire server om real-time replicatie en failover te vergemakkelijken.
  * **Farm Clusters:** Maakt netwerktaakverdeling mogelijk door de VIP tegelijkertijd op alle knooppunten te handhaven.


**Belangrijkste voordeel:** Door gebruik te maken van **Gratuitous ARP (Address Resolution Protocol)** of **MAC Address Takeover**, maakt de VIP een naadloze failover van applicaties mogelijk zonder handmatige clientherconfiguratie, waardoor 24/7 bedrijfscontinuïteit wordt gegarandeerd.

  * **Cloud en multi-subnet:** Beheerd via externe load balancer-statuscontroles (AWS, Azure, GCP) om verkeer om te leiden naar verschillende subnetten.


![Vergelijkingsdiagram van virtueel IP-gedrag (VIP) in Evidian SafeKit: spiegelclusters die een zwevend IP-adres op het actieve knooppunt tonen versus boerderijclusters die de verdeling van de netwerkbelasting over alle knooppunten tonen.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Virtuele IP-implementatiestrategieën voor Mirror- en Farm-clusters in SafeKit.**


{{%  insert-safekit-4-buttons-nl  %}}
 

## Inhoudsopgave {#table-of-contents}

  * [Hoe een virtueel IP-adres (VIP) werkt in een failover van hetzelfde subnet (spiegelcluster)](#virtual-ip-same-subnet-failover)
  * [Hoe een virtueel IP-adres (VIP) werkt in verschillende subnetten (spiegelcluster)](#virtual-ip-different-subnets-failover)
  * [Hoe een load-balanced virtueel IP-adres werkt in een boerderij met hetzelfde subnet (boerderijcluster)](#vip-load-balancing-same-subnet)
  * [Hoe een load-balanced virtueel IP-adres werkt in verschillende subnetten (boerderijcluster)](#vip-load-balancing-different-subnets)
  * [Virtuele IP versus DNS-omleiding: waarom DNS-failover vaak mislukt](#virtual-ip-vs-dns-redirection-failover)
  * [Vergelijking: virtuele IP-implementatie, latentie en applicatietransparantie](#vip-vs-dns-comparison)
  * [Een virtueel IP-adres configureren voor netwerktaakverdeling en hoge beschikbaarheid](#virtual-ip-configuration-load-balancing-ha)
  * [Veelgestelde vragen over virtueel IP (VIP)](#virtual-ip-faq)
  * [🔍 SafeKit Navigatiehub met hoge beschikbaarheid](#hub)


## Hoe een virtueel IP-adres (VIP) werkt in een failover van hetzelfde subnet (spiegelcluster) {#virtual-ip-same-subnet-failover}

### Geautomatiseerde failover en netwerkomleiding in een lokaal subnet {#automated-failover--network-rerouting-in-a-local-subnet}

Voor organisaties die een naadloze bedrijfscontinuïteit binnen een lokale infrastructuur nodig hebben, biedt **SafeKit Software-Defined High Availability for Local Network Clusters** een robuuste, geautomatiseerde oplossing voor het beheer van virtuele IP-adressen en realtime failover van applicaties. 

### Lokaal mirrorcluster: naadloze Windows- of Linux-failover met 2 knooppunten {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit Virtual IP (VIP) failover-mechanisme tussen twee servers in hetzelfde subnet](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit VIP-aliasing en MAC-adrestoewijzing In een standaard **SafeKit spiegelcluster** waarbij beide knooppunten zich in hetzelfde lokale subnet bevinden, wordt hoge beschikbaarheid bereikt via een **softwaregedefinieerd virtueel IP (VIP)**. In tegenstelling tot op hardware gebaseerde oplossingen beheert SafeKit deze VIP rechtstreeks binnen de netwerkstack van het besturingssysteem. Deze VIP fungeert als een blijvend logisch toegangspunt voor clients, gelaagd bovenop de unieke fysieke IP-adressen van Server 1 en Server 2 via **IP-aliasing**. 

#### SafeKit's geavanceerde IP-aliasing en meerdere VIP-ondersteuning {#safekits-advanced-ip-aliasing--multiple-vip-support}

Een belangrijk voordeel van de **SafeKit-oplossing** is de flexibiliteit bij het beheren van netwerkidentiteiten. De VIP is een derde IP-adres dat tussen de knooppunten "zweeft". Met name is de SafeKit in staat om **meerdere virtuele IP-adressen** binnen één cluster te beheren. Deze kunnen worden toegewezen aan dezelfde primaire Ethernet-kaart of worden gedistribueerd over verschillende fysieke kaarten, waardoor complexe configuraties mogelijk zijn waarbij verschillende services aan specifieke virtuele identiteiten zijn gebonden. 

#### Het failovermechanisme: onnodige ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit zorgt ervoor dat er geen handmatige tussenkomst nodig is tijdens een hardwarestoring. Bij normale werking wordt de VIP toegewezen aan **het MAC-adres van server 1 (mac1)**. Als SafeKit een hartslagfout op Server 1 detecteert, voert het een herstelproces in twee stappen uit: 

  * **Applicatieherstel:** SafeKit start automatisch de kritieke applicatieservices op Server 2 opnieuw op.
  * **Netwerkherroutering:** SafeKit zendt onmiddellijk een **Gratuitous ARP (GARP)**-bericht uit. Hierdoor worden de ARP-caches van alle netwerkswitches en verbonden clients geforceerd bijgewerkt, waarbij de VIP opnieuw wordt toegewezen aan **Server 2's MAC-adres (mac2)**.


#### Externe datacenters en uitgebreide VLAN's {#remote-data-centers--extended-vlans}

Hoewel het doorgaans wordt gebruikt voor lokale clusters, heeft **SafeKit's same-subnet-algoritme** de voorkeur voor **Disaster Recovery (DR)** op externe locaties die zijn verbonden via een **uitgebreid LAN of uitgerekt VLAN**. Met deze 'uitgerekte' architectuur kunt u één enkel subnet over geografische afstanden onderhouden, waardoor uw netwerktopologie aanzienlijk wordt vereenvoudigd en de overhead van complexe routeringsprotocollen wordt vermeden. 

> **⚠️ Opmerking:** Laag 2-omleiding via gratis ARP is de **meest transparante oplossing** voor toepassingen. In tegenstelling tot Layer 3-omleiding met een Load Balancer wordt dit vermeden **Bron/bestemming IP-vertaling (SNAT/DNAT)**. De applicatie ontvangt verkeer rechtstreeks met het oorspronkelijke client-IP en het virtuele IP-adres wordt lokaal geconfigureerd. **Veel toepassingen geven de voorkeur** het virtuele IP-adres lokaal zien en het oorspronkelijke client-IP rechtstreeks ontvangen. Zonder deze transparantie zouden ze **werkt mogelijk niet zoals verwacht** vanwege complexe netwerkvertalingen.

## Hoe een virtueel IP-adres (VIP) werkt in verschillende subnetten (spiegelcluster) {#virtual-ip-different-subnets-failover}

### Cloud-ready verkeersorkestratie via Load Balancer-integratie {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Door gebruik te maken van de externe netwerkinfrastructuur kan **SafeKit softwaregedefinieerde hoge beschikbaarheid voor multi-AZ- en cloudclusters** naadloos worden geïntegreerd met een **Network Load Balancer** om verkeersfailover over afzonderlijke subnetten en beschikbaarheidszones te orkestreren. 

### Cross-subnet mirrorclusters: Windows- en Linux-implementatie {#cross-subnet-mirror-clusters-windows--linux-implementation}


![Diagram van een virtuele IP-failover met behulp van een Load Balancer over twee verschillende subnetten](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Multi-subnet verkeersroutering via Load Balancer Health Checks Wanneer clusterknooppunten zich in **verschillende subnetten** bevinden, is standaard ARP-gebaseerde failover niet mogelijk. In dit scenario wordt het **Virtuele IP-adres (VIP)** gehost op een **Load Balancer (LB)** in plaats van op de Ethernet-kaart van de server. De Load Balancer fungeert als gateway en stuurt verkeer naar de fysieke IP-adressen van de primaire en secundaire knooppunten op basis van realtime beschikbaarheid. 

#### Dynamische routering via SafeKit-gezondheidscontroles {#dynamic-routing-via-safekit-health-checks}

SafeKit beheert de verkeerssturing door op elk knooppunt een speciale **Health Check URL** aan te bieden. De Load Balancer vraagt deze URL's op om de clusterstatus te bepalen: 

  * **Primair knooppunt (PRIM):** De statuscontrole retourneert `HTTP 200 OK`. De Load Balancer stuurt al het verkeer hierheen.
  * **Secundair knooppunt (SECOND):** De statuscontrole retourneert `HTTP 404 NOT FOUND`. De Load Balancer stuurt geen verkeer naar dit knooppunt.

Tijdens een **failover-gebeurtenis** schakelt SafeKit onmiddellijk de reacties op de statuscontrole om, waardoor de Load Balancer wordt geactiveerd om clientverkeer om te leiden naar de nieuwe primaire server. 

> **⚠️ Opmerking:** SafeKit biedt de logica voor de statuscontrole; de fysieke of virtuele Load Balancer moet door uw netwerkinfrastructuur worden geleverd.

#### Cloudintegratie: AWS, Azure en GCP {#cloud-integration-aws-azure-and-gcp}

Dit 'Load Balancer + Health Check'-model is de industriestandaard voor **Cloud High Availability**. Het is essentieel voor de implementatie van SafeKit in omgevingen zoals: 

  * 💡 [**Amazon AWS**](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>) (AWS netwerkload balancer)
  * 💡 [**Microsoft Azure**](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>) (Azure Load Balancer)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud-loadbalancing)


#### Netwerkoverwegingen: Load Balancer versus uitgebreid LAN {#network-considerations-load-balancer-vs-extended-lan}

Als een load balancer niet gewenst is, raadpleeg dan uw netwerkteam over de implementatie van een **Extended LAN (VLAN stretching)** tussen subnetten. Hierdoor kunt u terugkeren naar het eenvoudigere VIP-model "Same Subnet". 

> **⚠️ Opmerking:** Wanneer u voor een Load Balancer kiest, controleer dan of uw applicatie compatibel is met **Source/Destination IP Translation (SNAT/DNAT)**. Met een Load Balancer kan de applicatie de identiteit van de oorspronkelijke gebruiker uit het oog verliezen of niet starten omdat de applicatie niet langer het virtuele IP-adres rechtstreeks op de eigen netwerkinterface geconfigureerd ziet.

## Hoe een load-balanced virtueel IP-adres werkt in een boerderij met hetzelfde subnet (boerderijcluster) {#vip-load-balancing-same-subnet}

### Schaalbare prestaties: taakverdeling en redundantie op kernelniveau {#scalable-performance-kernel-level-load-balancing--redundancy}

Voor omgevingen met veel verkeer legt de **Architectuurgids: Schaalbare hoge beschikbaarheid met multi-node farmclusters** uit hoe SafeKit de werklast over meerdere actieve servers verdeelt, terwijl de totale redundantie behouden blijft. 

### Farm Cluster-architectuur: taakverdeling over Windows- of Linux-knooppunten {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagram van een load-balanced virtueel IP-adres (VIP) binnen een boerderijcluster met hetzelfde subnet](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Gedistribueerde verkeersverwerking via kernelfiltering In een **load-balancing farm cluster** wordt een virtueel IP-adres (VIP) gebruikt om clientverzoeken tegelijkertijd over meerdere servers te verdelen. Hoewel dit voorbeeld twee knooppunten bevat, kan de architectuur worden geschaald om grotere serverfarms te ondersteunen. In een configuratie met hetzelfde subnet wordt de VIP via IP-aliasing geconfigureerd op de Ethernet-kaart van **elke server** in het cluster. 

#### Verkeersdistributie: het filter op kernelniveau {#traffic-distribution-the-kernel-level-filter}

In tegenstelling tot een eenvoudig failovercluster beheert een farmcluster het verkeer via een gespecialiseerd **filter op kernelniveau**. Het proces werkt als volgt: 

  * **ARP-toewijzing:** In de ARP-caches van de clients wordt de VIP in eerste instantie geassocieerd met een enkel hardwareadres (bijvoorbeeld `mac1` van server 1).
  * **Pakketsplitsing:** Wanneer Server 1 het verkeer ontvangt, analyseert het SafeKit-kernelfilter de identiteit van de inkomende pakketten (gebaseerd op **Client IP** of **TCP-poort**).
  * **Belastingverdeling:** Het filter bepaalt welke pakketten lokaal moeten worden verwerkt en welke moeten worden omgeleid naar andere knooppunten (bijvoorbeeld Server 2) voor verwerking, waardoor een evenwichtige werklast wordt gegarandeerd.


#### Failover en omleiding met onnodige ARP {#failover-and-rerouting-with-gratuitous-arp}

Als het primaire knooppunt (Server 1) uitvalt, blijft het cluster beschikbaar via **Gratuitous ARP (GARP)**. SafeKit zendt een GARP-bericht uit om de ARP-caches van clients bij te werken met `mac2` van Server 2. Dit zorgt ervoor dat zelfs als het primaire "ingangspunt" uitvalt, clients onmiddellijk worden omgeleid naar de overgebleven knooppunten in de farm. 

#### Implementatie op externe locaties {#deployment-in-remote-sites}

Voor organisaties die in **externe datacenters** opereren, blijft dit taakverdelingsalgoritme functioneel, op voorwaarde dat de sites zijn gekoppeld via een **uitgebreid LAN of VLAN**. Hierdoor ontstaat een virtuele "same-subnet"-omgeving, wat de meest efficiënte configuratie is voor geografisch verspreide boerderijclusters. 

## Hoe een load-balanced virtueel IP-adres werkt in verschillende subnetten (boerderijcluster) {#vip-load-balancing-different-subnets}

### Schalen in meerdere zones: verkeer over cloud-subnetten orkestreren {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

De **Architectuurgids: Schaalboerderijclusters in multi-zone- en cloudomgevingen** biedt de blauwdruk voor het distribueren van applicatieworkloads over afzonderlijke beschikbaarheidszones en subnetten. 

### Cross-subnet-boerderijclusters: Windows- en Linux-schaalbaarheid met meerdere knooppunten {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagram van een farmcluster met taakverdeling dat in twee verschillende subnetten werkt](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Mondiale verkeersverdeling via externe taakverdeling Wanneer farmknooppunten worden verdeeld over **verschillende subnetten** (gebruikelijk bij Multi-AZ-cloudimplementaties), wordt het **Virtuele IP (VIP)** beheerd door een externe **Load Balancer (LB)**. De LB houdt de VIP vast en leidt binnenkomend verkeer naar de fysieke IP-adressen van de servers in hun respectievelijke subnetten. 

#### Regels voor intelligente verkeersroutering en taakverdeling {#intelligent-traffic-routing--load-balancing-rules}

De Load Balancer verdeelt klantverzoeken op basis van twee primaire factoren: 

  * **Distributieregels:** Verkeer wordt gesplitst op basis van sessieaffiniteit of taakverdelingsalgoritmen (bijvoorbeeld het analyseren van **Client IP-adres** of **Client TCP-poort**).
  * **Beschikbaarheid van knooppunten:** Verkeer wordt alleen doorgestuurd naar gezonde knooppunten, zoals bepaald door de SafeKit-statuscheck.


> **⚠️ Opmerking:** SafeKit biedt de logica voor de statuscontrole; de fysieke of virtuele Load Balancer moet door uw netwerkinfrastructuur worden geleverd.

#### SafeKit Gezondheidscontrolemechanisme {#safekit-health-check-mechanism}

SafeKit biedt een real-time **Health Check URL** op elke server in de farm om de operationele status ervan door te geven aan de Load Balancer: 

  * **Node UP:** De statuscheck retourneert `HTTP 200 OK`. De Load Balancer neemt deze server op in de actieve rotatie.
  * **Node DOWN/Failover:** Als een server of applicatie uitvalt, retourneert SafeKit `HTTP 404 NOT FOUND` (of wordt de service onbereikbaar). De Load Balancer stopt onmiddellijk met het verzenden van verkeer naar het defecte knooppunt.


#### Standaarden voor cloudimplementatie: AWS, Azure en GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Deze architectuur is het fundamentele model voor **Cloud Farm clusters** en zorgt ervoor dat als een heel subnet of hele zone offline gaat, de resterende knooppunten de belasting blijven afhandelen. Dit wordt standaard ondersteund door: 

  * 💡 [**Amazon AWS**](</solutions/aws-load-balancing-cluster-failover/>) (AWS netwerkload balancer)
  * 💡 [**Microsoft Azure**](</solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud-loadbalancing)


## Virtueel IP versus DNS-omleiding: waarom DNS-failover vaak mislukt {#virtual-ip-vs-dns-redirection-failover}

### De DNS-propagatieval: waarom VIP's beter presteren dan DNS-omleiding {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Het vertrouwen op DNS voor failover creëert vaak een **vals gevoel van veiligheid** in architecturen met hoge beschikbaarheid. Hoewel het wijzigen van een DNS-record zodat het naar een back-upserver verwijst een eenvoudig herstelpad lijkt, introduceert het een cruciale variabele: **onvoorspelbare latentie**. Omdat op DNS gebaseerde omleiding afhankelijk is van een ongecontroleerd ecosysteem van tussenliggende recursieve solvers om de verandering te erkennen en te propageren, is het fundamenteel onverenigbaar met de "zero-downtime"-vereisten van moderne bedrijfsdiensten. 

### Het technische scenario: DNS-resolutie en de "vastzittende" client {#the-technical-scenario-dns-resolution-and-the-stuck-client}

In een standaard netwerkconfiguratie fungeert een **Virtuele naam** (de DNS-naam) als voor mensen leesbaar toegangspunt voor gebruikers. Om gegevens over het netwerk te laten reizen, moet die naam echter worden omgezet in een specifiek **Fysiek IP**-adres. 

![Diagram met de DNS-naamomzetting naar fysiek IP 1 in een cluster met hoge beschikbaarheid](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS-resolutie en "vastzittende" clients op fysiek IP 1 in een cluster met hoge beschikbaarheid

#### Huidige status: Resolutie naar fysiek IP-adres 1 {#current-state-resolution-to-physical-ip-1}

Aanvankelijk vragen **Client 1** en **Client 2** het DNS-systeem naar de virtuele naam. Het systeem retourneert **Fysiek IP 1**. De clients brengen vervolgens een directe netwerkverbinding (socket) tot stand met dat specifieke hardwareadres. 

#### De failover-uitdaging: omleiden naar fysiek IP-adres 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Als de server op fysiek IP 1 uitvalt, werkt een beheerder de DNS-record bij zodat deze naar **Fysiek IP 2** verwijst. Om de clients met succes om te leiden, moet er een "perfecte" reeks plaatsvinden: 

  * De **Time to Live (TTL)** moet verlopen op alle tussenliggende ISP's en bedrijfsresolvers.
  * De lokale DNS-cache op zowel Client 1 als Client 2 moet worden leeggemaakt.
  * De toepassing moet de bestaande socket sluiten en een _nieuwe_ DNS-zoekopdracht starten.

Als een van deze stappen wordt gemist, blijven **Client 1 en Client 2 "vastzitten"** bij hun pogingen om te communiceren met het dode fysieke IP-adres 1, wat resulteert in service-downtime ondanks de update in de DNS-records. 

### De twee "zwarte dozen" van DNS-omleiding {#the-two-black-boxes-of-dns-redirection}

  * **Recursieve caching:** Veel internetproviders (ISP's) en zakelijke DNS-resolvers negeren lage TTL-instellingen om het verkeer te verminderen, waarbij ze vaak het "oude" fysieke IP-adres 1 minuten of zelfs uren na de gevraagde vervaldatum in de cache opslaan.
  * **Applicatiepersistentie:** Moderne applicaties (zoals op Java gebaseerde microservices of webbrowsers) voeren bij het opstarten vaak slechts één keer een DNS-lookup uit. Zelfs als het DNS-record wordt bijgewerkt naar Fysiek IP 2, blijft de applicatie het oorspronkelijke IP-adres gebruiken dat in het interne geheugen is opgeslagen.


### Conclusie {#conclusion}

DNS-omleiding is een inconsistente oplossing voor een oplossing met hoge beschikbaarheid. Voor onmiddellijke failover binnen een lokale of regionale omgeving is een softwaregedefinieerd **Virtueel IP (VIP)** de enige manier om gegarandeerde persistentie van nul downtime te garanderen. 

## Vergelijking: virtuele IP-implementatie, latentie en applicatietransparantie {#vip-vs-dns-comparison}

**Technische vergelijking van Virtual IP (VIP)-omleidingsmethoden versus DNS-omleiding voor hoge beschikbaarheid en noodherstel.**

Omgeving en gebruikscasus | Type hoge beschikbaarheid | Omleidingsmechanisme | Netwerklatentie | Transparantie van applicaties en IP-lokaliteit  
---|---|---|---|---  
Primair/back-up (hoge beschikbaarheid) | Spiegelcluster | Gratuitige ARP / MAC-overname | Zeer laag: tijd om uitgezonden GARP te detecteren en te verzenden | Volledige transparantie: Virtueel IP-adres is lokaal op het actieve knooppunt. Client-IP blijft behouden.  
Taakverdeling (actief/actief) | Boerderijcluster | Netwerkfilter op kernelniveau / GARP | Zeer laag: tijd om netwerkfilters te detecteren en opnieuw te configureren | Volledige transparantie: Virtueel IP-adres is lokaal op alle knooppunten. Client-IP blijft behouden.  
Hetzelfde subnet/uitgebreid LAN (VLAN Stretching) | Noodherstel (externe datacenters) | Standaard IP-aliasing / GARP | Laag: afhankelijk van uitgerekte VLAN RTT (Round Trip Time) | Volledige transparantie: Virtueel IP-adres is lokaal op de knooppunten. Client-IP blijft behouden.  
Verschillende subnetten | Disaster Recovery (externe datacenters / Cloud) | Externe loadbalancer | Matig: hogere failover-latentie vanwege intervallen voor de statuscontrole van Load Balancer | ⚠️ Gedeeltelijke transparantie: maakt gebruik van SNAT/DNAT. Virtueel IP-adres is **NIET** lokaal op de knooppunten. Client-IP wordt **NIET** bewaard. Applicatie moet dit ondersteunen.  
DNS-omleiding: geen VIP | Noodherstel (externe datacenters) | DNS-recordupdate (naam / fysiek IP) | Hoog/Onvoorspelbaar: Afhankelijk van DNS TTL (Time To Live) en Client DNS Caching. | ⚠️ Onbetrouwbaar: Klant moet DNS opnieuw oplossen. Meestal blijven clients het verouderde IP-adres gebruiken dat bij het opstarten is opgelost en worden ze na een failover niet omgeleid.  
  
## Een virtueel IP-adres configureren voor netwerktaakverdeling en hoge beschikbaarheid {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-en  %}}
 

## Veelgestelde vragen over virtueel IP (VIP) {#virtual-ip-faq}

### Virtueel IP (VIP) en netwerken {#virtual-ip-vip--networking}

Wat is een virtueel IP-adres (VIP) en hoe verschilt dit van een fysiek IP-adres?

Terwijl een **fysiek IP-adres** gebonden is aan een specifieke netwerkinterface, is een **Virtueel IP (VIP)** een "zwevend" adres, onafhankelijk van de hardware. In een SafeKit-cluster fungeert de VIP als een permanent toegangspunt; als de primaire server uitvalt, migreert de VIP automatisch naar een gezond secundair knooppunt, waardoor herconfiguratie van nul clients wordt gegarandeerd.

Heb ik een hardware-load balancer nodig om een ​​virtueel IP-adres te gebruiken?

Nee. **SafeKit High Availability-software** beheert het virtuele IP-adres op softwareniveau. In architecturen met hetzelfde subnet wordt gebruik gemaakt van **IP-aliasing** en **Gratuitous ARP (GARP)** om verkeer om te leiden. Dit elimineert de kosten en complexiteit van externe hardware-load balancers of speciale proxyservers.

Wat is Gratuitous ARP (GARP) en waarom wordt het gebruikt?

**Gratuitous ARP (GARP)** is een netwerkuitzending die de ARP-tabellen van netwerkswitches en routers bijwerkt. Tijdens een failover verzendt de nieuwe primaire server een GARP-pakket om aan te kondigen dat het **Virtuele IP** nu is toegewezen aan het MAC-adres, waardoor het verkeer onmiddellijk via het netwerk wordt omgeleid.

Kan ik een DNS-naam koppelen aan een virtueel IP-adres?

**Ja.** U kunt een DNS-naam aan een VIP koppelen door een standaard A-record aan te maken. Het belangrijkste voordeel is dat de omleiding wordt beheerd op **VIP-niveau** (via ARP of netwerkomleiding) en **niet op DNS-niveau**. Dit zorgt voor **applicatietransparantie** door vertragingen te voorkomen die verband houden met DNS-propagatie en TTL-vervaldatum.

### Cloud- en geavanceerde architecturen {#cloud--advanced-architectures}

Hoe werkt een virtueel IP-adres in de cloud (AWS, Azure, GCP)?

In cloudomgevingen waar Layer 2 (ARP) beperkt is, kan SafeKit worden geïntegreerd met **Cloud Load Balancers** (AWS ELB, Azure LB of Google GCLB). SafeKit biedt een **Health Check-URL** die door het platform wordt gecontroleerd om verkeer naar het actieve knooppunt te routeren met behulp van SNAT/DNAT.

Is een Extended LAN beter dan een Load Balancer voor noodherstel?

**Ja**. Voor externe datacenters is een **Uitgebreid LAN (uitgerekt VLAN)** is vaak superieur omdat het handhaaft **transparantie van toepassingen** op verschillende locaties. Door het behouden van de **hetzelfde virtuele IP** blijven de applicatie en zijn klanten communiceren met dezelfde identiteit, waardoor de overgang tussen datacenters volledig naadloos verloopt.

Wat zijn de beperkingen van DNS-omleiding versus virtueel IP?

**DNS-omleiding** wordt beperkt door **TTL (Time to Live)** en caching aan de clientzijde, waardoor het herstel urenlang kan worden vertraagd. Een groot nadeel is dat **clients die hun DNS-naam niet opnieuw omzetten, vast blijven zitten** terwijl ze proberen verbinding te maken met de mislukte server. Een **Virtueel IP** biedt daarentegen onmiddellijke Layer 2-failover die al het verkeer onmiddellijk omleidt, waardoor connectiviteit wordt gegarandeerd, ongeacht de DNS-cachestatus aan de clientzijde.

### Transparantie en veiligheid {#transparency--security}

Waarom is een lokaal virtueel IP-adres belangrijk voor de transparantie van applicaties?

Een lokaal **Virtueel IP (VIP)** zorgt voor **applicatietransparantie** doordat de software zich kan binden aan een permanente VIP. SafeKit verwerkt de omleiding op **kernelniveau** , waardoor de applicatie zich niet bewust is van clusterfailovers, in tegenstelling tot DNAT-oplossingen waarbij het gebonden IP-adres verandert.

Blijft bij het gebruik van een virtueel IP-adres het oorspronkelijke IP-adres van de client behouden?

Ja. SafeKit vermijdt Source Network Address Translation (SNAT). Omdat de VIP zich lokaal op de actieve server bevindt, ontvangt de toepassing het **oorspronkelijke client-IP** , wat van cruciaal belang is voor beveiligingscontroles, sessiepersistentie en registratie van regelgeving.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}