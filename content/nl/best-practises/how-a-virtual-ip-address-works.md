---
title: "Hoe werkt een virtueel IP-adres (VIP) in een cluster met hoge beschikbaarheid?"
canonical: "https://safekit.eviden.com/nl/best-practises/how-a-virtual-ip-address-works/"
description: "Ontdek hoe SafeKit gebruikmaakt van softwaregedefinieerde virtuele IP-adressen (VIP's) om 24/7 beschikbaarheid te garanderen. Leer meer over geautomatiseerde failover via Gratuitous ARP en waarom dit betere resultaten oplevert dan DNS-omleiding voor bedrijfscontinuïteit op Windows en Linux ."
category: "best-practises"
lang: "nl"
topics: "Wat is een virtueel IP-adres in een high availability-cluster?, Implementatie van een virtueel IP-adres in SafeKit , Inhoudsopgave, Hoe een virtueel IP-adres (VIP) werkt bij failover binnen hetzelfde subnet ( Mirror -cluster), Hoe een virtueel IP-adres (VIP) werkt over verschillende subnetten ( Mirror -cluster), Hoe een load-balanced virtueel IP-adres werkt in een `Farm` cluster binnen hetzelfde subnet ( `Farm` cluster), Hoe een load-balanced virtueel IP-adres werkt over verschillende subnetten ( `Farm` -cluster), Virtueel IP versus DNS-omleiding: Waarom DNS-failover vaak mislukt, Vergelijking: Implementatie van een virtueel IP-adres, latentie en applicatietransparantie, Een virtueel IP-adres configureren voor netwerkloadbalancing en high availability, Veelgestelde vragen over virtueel IP (VIP), 🔍 SafeKit High Availability Navigation Hub"
---

# Hoe werkt een virtueel IP-adres (VIP) in een cluster met hoge beschikbaarheid? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Wat is een virtueel IP-adres in een high availability-cluster? {#virtual-ip-definition}

  * **Definitie:** Een **virtueel IP-adres (VIP)** is een zwevend netwerkadres dat wordt gebruikt in [ high availability clustering en ](</>) om continue toegang tot applicaties te garanderen. In tegenstelling tot standaard IP-adressen is een VIP niet gebonden aan een specifieke fysieke hardware-interface, maar verschuift het tussen clusterknooppunten om een enkel, permanent toegangspunt voor clients te behouden.
  * **Geen hardware vereist:** SafeKit beheert het VIP op softwareniveau met behulp van **Gratuitous ARP (GARP)** , waardoor externe loadbalancers in omgevingen met hetzelfde subnet overbodig zijn.
  * **Applicatietransparantie:** Door te binden aan een lokaal VIP blijven applicaties zich onbewust van failover-gebeurtenissen, waardoor clientbron-IP's en bestaande beveiligingsconfiguraties behouden blijven.
  * **Rampenherstel:** Gebruik van een **Uitgebreid LAN** maakt het mogelijk om hetzelfde VIP te gebruiken in externe datacenters, waardoor failover tussen locaties wordt vereenvoudigd in vergelijking met complexe DNS-omleidingen en vertragingen door TTL-caching.


## Implementatie van virtueel IP in SafeKit {#safekit-vip-implementation}

  * **Mirror Clusters:** Beschikt over een zwevend IP-adres dat alleen actief is op de primaire server om realtime replicatie en failover mogelijk te maken.
  * **`Farm` Clusters:** Maakt netwerkbelastingverdeling mogelijk door het VIP-adres gelijktijdig op alle knooppunten te handhaven.


**Belangrijkste voordeel:** Door gebruik te maken van **Gratuitous ARP (Address Resolution Protocol)** of **MAC Address Takeover** , maakt de VIP een naadloze failover van applicaties mogelijk zonder handmatige herconfiguratie van de client, waardoor 24/7 bedrijfscontinuïteit wordt gewaarborgd.

  * **Cloud & Multi-Subnet:** Beheerd via externe load balancer health checks ( AWS , Azure , GCP ) om verkeer over verschillende subnetten om te leiden.


![ Vergelijkingsdiagram van het gedrag van virtuele IP-adressen (VIP's) in Evidian. SafeKit : Mirror Clusters met een zwevend IP-adres op het actieve knooppunt versus Farm Clusters met netwerkbelastingverdeling over alle knooppunten. ](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

Implementatiestrategieën voor virtuele IP-adressen **voor de clusters Mirror en `Farm` in SafeKit .**


{{%  insert-safekit-4-buttons-nl  %}}
 

## Inhoudsopgave {#table-of-contents}

  * [ Hoe een virtueel IP-adres (VIP) werkt bij failover binnen hetzelfde subnet ( Mirror -cluster) ](#virtual-ip-same-subnet-failover)
  * [ Hoe een virtueel IP-adres (VIP) werkt over verschillende subnetten ( Mirror -cluster) ](#virtual-ip-different-subnets-failover)
  * [ Hoe een load-balanced virtueel IP-adres werkt in hetzelfde subnet `Farm` ( `Farm` -cluster) ](#vip-load-balancing-same-subnet)
  * [ Hoe een load-balanced virtueel IP-adres werkt over verschillende subnetten ( `Farm` -cluster) ](#vip-load-balancing-different-subnets)
  * [ Virtueel IP-adres versus DNS-omleiding: Waarom DNS-failover vaak mislukt ](#virtual-ip-vs-dns-redirection-failover)
  * [ Vergelijking: Implementatie van virtueel IP, latentie en applicatietransparantie ](#vip-vs-dns-comparison)
  * [ Een virtueel IP-adres configureren voor netwerkbelastingverdeling en hoge beschikbaarheid ](#virtual-ip-configuration-load-balancing-ha)
  * [ Veelgestelde vragen over virtueel IP (VIP) ](#virtual-ip-faq)
  * [ 🔍 SafeKit Navigatiehub met hoge beschikbaarheid ](#hub)


## Hoe een virtueel IP-adres (VIP) werkt bij failover binnen hetzelfde subnet ( Mirror -cluster) {#virtual-ip-same-subnet-failover}

### Geautomatiseerde failover en netwerkomleiding in een lokaal subnet {#automated-failover--network-rerouting-in-a-local-subnet}

Voor organisaties die naadloze bedrijfscontinuïteit binnen een lokale infrastructuur vereisen, biedt **SafeKit Software-Defined High Availability voor lokale netwerkclusters** een robuuste, geautomatiseerde oplossing voor het beheren van virtuele IP-adressen en realtime failover van applicaties. 

### Lokaal Mirror cluster: Naadloze failover van 2 knooppunten Windows of Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![ SafeKit Virtueel IP-failovermechanisme (VIP) tussen twee servers in hetzelfde subnet ](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit VIP-aliasing en MAC-adresmapping In een standaard **SafeKit mirror cluster** , waar beide knooppunten zich in hetzelfde lokale subnet bevinden, wordt hoge beschikbaarheid bereikt door middel van een **softwarematig gedefinieerd virtueel IP-adres (VIP)** . In tegenstelling tot hardwarematige oplossingen beheert SafeKit dit VIP rechtstreeks binnen de netwerkstack van het besturingssysteem. Dit VIP fungeert als een persistent logisch toegangspunt voor clients, bovenop de unieke fysieke IP-adressen van Server 1 en Server 2 via **IP-aliasing** . 

#### Geavanceerde IP-aliasing en ondersteuning voor meerdere VIP's van SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Een belangrijk voordeel van de **SafeKit** -oplossing is de flexibiliteit in het beheren van netwerkidentiteiten. Het VIP is een derde IP-adres dat "zweeft" tussen de knooppunten. Met name SafeKit is in staat om **meerdere virtuele IP-adressen** binnen één cluster te beheren. Deze kunnen worden toegewezen aan dezelfde primaire Ethernet-kaart of worden verdeeld over verschillende fysieke kaarten, waardoor complexe configuraties mogelijk zijn waarbij verschillende services aan specifieke virtuele identiteiten zijn gekoppeld. 

#### Het failovermechanisme: Gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit zorgt ervoor dat er geen handmatige tussenkomst nodig is bij een hardwarestoring. Onder normale omstandigheden wordt het VIP toegewezen aan het MAC-adres (mac1) van Server 1 ( **)** ). Als SafeKit een heartbeat-storing op Server 1 detecteert, voert het een herstelprocedure in twee stappen uit: 

  * **Applicatieherstel:** SafeKit herstart automatisch de kritieke applicatieservices op Server 2.
  * **Netwerkomleiding:** SafeKit verzendt direct een **Gratuitous ARP (GARP)** -bericht. Dit forceert een update van de ARP-caches van alle netwerkswitches en verbonden clients, waarbij het VIP-adres opnieuw wordt toegewezen aan **het MAC-adres van Server 2 (mac2)** .


#### Externe datacenters en uitgebreide VLAN's {#remote-data-centers--extended-vlans}

Hoewel **SafeKit -algoritme voor hetzelfde subnet doorgaans wordt gebruikt voor lokale clusters, is** algoritme de voorkeurkeuze voor **Disaster Recovery (DR)** over externe locaties die zijn verbonden via een **uitgebreid LAN of een uitgerekt VLAN** . Deze "uitgerekte" architectuur maakt het mogelijk om één enkel subnet te behouden over geografische afstanden, waardoor uw netwerktopologie aanzienlijk wordt vereenvoudigd en de overhead van complexe routeringsprotocollen wordt vermeden. 

> **⚠️ Opmerking:** Layer 2-omleiding via Gratuitous ARP is de **meest transparante oplossing** voor applicaties. In tegenstelling tot Layer 3-omleiding met een load balancer, vermijdt het **Source/Destination IP Translation (SNAT/DNAT)** . De applicatie ontvangt verkeer direct met het originele client-IP-adres en het virtuele IP-adres wordt lokaal geconfigureerd. **Veel applicaties geven er de voorkeur aan** het virtuele IP-adres lokaal te zien en het originele client-IP-adres direct te ontvangen. Zonder deze transparantie **werken ze mogelijk niet zoals verwacht** vanwege complexe netwerkvertalingen.

## Hoe een virtueel IP-adres (VIP) werkt over verschillende subnetten ( Mirror -cluster) {#virtual-ip-different-subnets-failover}

### Cloudklare verkeersorkestratie via load balancer-integratie {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Door gebruik te maken van externe netwerkinfrastructuur, integreert **SafeKit Software-Defined High Availability voor Multi-AZ en Cloud Clusters** naadloos met een **Network Load Balancer** om failover van verkeer over afzonderlijke subnetten en beschikbaarheidszones te orkestreren. 

### Cross-Subnet Mirror -clusters: Windows & Linux -implementatie {#cross-subnet-mirror-clusters-windows--linux-implementation}


![ Diagram van een virtuele IP-failover met behulp van een load balancer over twee verschillende subnetten ](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Verkeersroutering over meerdere subnetten via statuscontroles van de load balancer. Wanneer clusterknooppunten zich in **verschillende subnetten** bevinden, is standaard failover op basis van ARP niet mogelijk. In dit scenario wordt het **virtuele IP-adres (VIP)** gehost op een **load balancer (LB)** in plaats van op de Ethernet-kaart van de server. De load balancer fungeert als gateway en stuurt het verkeer door naar de fysieke IP-adressen van de primaire en secundaire knooppunten op basis van realtime beschikbaarheid. 

#### Dynamische routering via SafeKit gezondheidscontroles {#dynamic-routing-via-safekit-health-checks}

SafeKit beheert de verkeersafhandeling door op elk knooppunt een speciale **URL voor gezondheidscontroles** te verstrekken. De load balancer raadpleegt deze URL's om de clusterstatus te bepalen. 

  * **Primaire knooppunt (PRIM):** De gezondheidscontrole geeft `HTTP 200 OK` terug. De load balancer stuurt al het verkeer hierheen.
  * **Secundaire knooppunt (SECOND):** De gezondheidscontrole retourneert `HTTP 404 NOT FOUND` . De load balancer stuurt geen verkeer naar dit knooppunt.

Tijdens een failover-gebeurtenis **schakelt** , SafeKit onmiddellijk de health check-reacties om, waardoor de load balancer het clientverkeer omleidt naar de nieuwe primaire server. 

> **⚠️ Opmerking:** SafeKit verzorgt de logica voor de gezondheidscontrole; de fysieke of virtuele load balancer moet door uw netwerkinfrastructuur worden geleverd.

#### Cloudintegratie: AWS , Azure , en GCP {#cloud-integration-aws-azure-and-gcp}

Dit "Load Balancer + Health Check"-model is de industriestandaard voor **Cloud High Availability** . Het is essentieel voor de implementatie van SafeKit in omgevingen zoals: 

  * 💡 [ **Amazon AWS** ](</nl/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWS Netwerk Load Balancer)
  * 💡 [ **Microsoft Azure** ](</nl/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) ( Azure Load Balancer)
  * 💡 [ **Google Cloud ( GCP )** ](</nl/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud Load Balancing)


#### Netwerkoverwegingen: Load balancer versus uitgebreid LAN {#network-considerations-load-balancer-vs-extended-lan}

Als een load balancer niet gewenst is, overleg dan met uw netwerkteam over het implementeren van een **Extended LAN (VLAN-stretching)** tussen subnetten. Hiermee kunt u terugkeren naar het eenvoudigere "Same Subnet" VIP-model. 

> **⚠️ Opmerking:** Wanneer u kiest voor een load balancer, controleer dan of uw applicatie compatibel is met **Source/Destination IP Translation (SNAT/DNAT)** . Met een load balancer kan de applicatie de identiteit van de oorspronkelijke gebruiker kwijtraken of niet opstarten omdat deze het virtuele IP-adres dat direct op de eigen netwerkinterface is geconfigureerd niet meer ziet.

## Hoe een load-balanced virtueel IP-adres werkt in hetzelfde subnet `Farm` ( `Farm` -cluster) {#vip-load-balancing-same-subnet}

### Schaalbare prestaties: Taakverdeling en redundantie op kernelniveau {#scalable-performance-kernel-level-load-balancing--redundancy}

Voor omgevingen met veel verkeer legt de **Architecture Guide: Scalable High Availability with Multi-Node `Farm` Clusters** uit hoe SafeKit workloads verdeelt over meerdere actieve servers met behoud van volledige redundantie. 

### `Farm` Clusterarchitectuur: Taakverdeling over Windows of Linux knooppunten {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


Diagram van een load-balanced virtueel IP-adres (VIP) binnen een cluster ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256") hetzelfde subnet farm ![

 Gedistribueerde verkeersverwerking via kernelfiltering In een **load-balancing `farm` -cluster** wordt een virtueel IP-adres (VIP) gebruikt om clientverzoeken gelijktijdig over meerdere servers te verdelen. Hoewel dit voorbeeld twee knooppunten bevat, is de architectuur schaalbaar voor grotere serverparken. In een configuratie binnen hetzelfde subnet wordt het VIP geconfigureerd op de Ethernet-kaart van **elke server** in het cluster via IP-aliasing. 

#### Verkeersdistributie: Het kernelniveaufilter {#traffic-distribution-the-kernel-level-filter}

In tegenstelling tot een eenvoudig failover-cluster beheert een `farm` cluster het verkeer via een gespecialiseerd **-filter op kernelniveau** . Het proces werkt als volgt: 

  * **ARP-mapping:** In de ARP-caches van de clients is het VIP in eerste instantie gekoppeld aan één hardwareadres (bijvoorbeeld `mac1` van Server 1).
  * Pakketsplitsing **:** Wanneer server 1 het verkeer ontvangt, analyseert het kernelfilter SafeKit de identiteit van de binnenkomende pakketten (op basis van **client-IP** of **TCP-poort** ).
  * **Taakverdeling:** Het filter bepaalt welke pakketten lokaal verwerkt moeten worden en welke doorgestuurd moeten worden naar andere knooppunten (bijv. Server 2) voor verwerking, waardoor een evenwichtige werkbelasting wordt gegarandeerd.


#### Failover en omleiding met Gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Als het primaire knooppunt (Server 1) uitvalt, blijft het cluster beschikbaar via **Gratuitous ARP (GARP)** . SafeKit verzendt een GARP-bericht om de ARP-caches van clients bij te werken met `mac2` van Server 2. Dit zorgt ervoor dat, zelfs als het primaire "toegangspunt" uitvalt, clients onmiddellijk worden omgeleid naar de overgebleven knooppunten in de farm . 

#### Implementatie op externe locaties {#deployment-in-remote-sites}

Voor organisaties die opereren vanuit **meerdere datacenters op afstand** , blijft dit load-balancing-algoritme functioneel zolang de locaties via een **uitgebreid LAN of VLAN** met elkaar verbonden zijn. Dit creëert een virtuele "zelfde-subnet"-omgeving, wat de meest efficiënte configuratie is voor geografisch verspreide `farm` -clusters. 

## Hoe een load-balanced virtueel IP-adres werkt over verschillende subnetten ( `Farm` -cluster) {#vip-load-balancing-different-subnets}

### Schaalvergroting over meerdere zones: Verkeer orkestreren over cloudsubnetten {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

De **-architectuurhandleiding: `Farm` -clusters schalen in omgevingen met meerdere zones en de cloud.** biedt het blauwdruk voor het verdelen van applicatieworkloads over afzonderlijke beschikbaarheidszones en subnetten. 

### Cross-Subnet `Farm` Clusters: Multi-Node Windows & Linux Schaalbaarheid {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


Diagram van een load-balanced ![ farm cluster dat werkt over twee verschillende subnetten ](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Wereldwijde verkeersdistributie via externe load balancing. Wanneer `farm` -nodes over **verschillende subnetten** zijn verdeeld (wat vaak voorkomt in cloudimplementaties met meerdere beschikbaarheidszones), wordt het **virtuele IP-adres (VIP)** beheerd door een externe **load balancer (LB)** . De LB bewaart het VIP en stuurt inkomend verkeer door naar de fysieke IP-adressen van de servers in de respectievelijke subnetten. 

#### Intelligente verkeersrouterings- en taakverdelingsregels {#intelligent-traffic-routing--load-balancing-rules}

De load balancer verdeelt clientverzoeken op basis van twee primaire factoren: 

  * **Distributieregels:** Verkeer wordt verdeeld op basis van sessie-affiniteit of load-balancing-algoritmen (bijv. analyse van **Client IP-adres** of **Client TCP-poort** ).
  * Beschikbaarheid van knooppunt **: Verkeer** wordt alleen doorgestuurd naar gezonde knooppunten, zoals vastgesteld door de gezondheidscontrole SafeKit .


> **⚠️ Opmerking:** SafeKit verzorgt de logica voor de gezondheidscontrole; de fysieke of virtuele load balancer moet door uw netwerkinfrastructuur worden geleverd.

#### SafeKit Gezondheidscontrolemechanisme {#safekit-health-check-mechanism}

SafeKit biedt een realtime **Health Check URL** op elke server in `farm` om de operationele status ervan aan de load balancer te communiceren: 

  * **Node UP:** De health check geeft `HTTP 200 OK` terug. De load balancer neemt deze server op in de actieve rotatie.
  * **Knooppunt UITGEVALLEN/Failover:** Als een server of applicatie uitvalt, retourneert SafeKit `HTTP 404 NOT FOUND` (of de service wordt onbereikbaar). De load balancer stopt onmiddellijk met het verzenden van verkeer naar het uitgevallen knooppunt.


#### Cloudimplementatiestandaarden: AWS , Azure , GCP en {#cloud-deployment-standards-aws-azure-and-gcp}

Deze architectuur vormt het basismodel voor **Cloud-, `Farm`** -clusters, waardoor wordt gegarandeerd dat als een volledig subnet of zone offline gaat, de resterende knooppunten de belasting blijven afhandelen. Dit wordt standaard ondersteund door: 

  * 💡 [ **Amazon AWS** ](</nl/solutions/aws-load-balancing-cluster-failover/>) ( AWS Netwerk Load Balancer)
  * 💡 [ **Microsoft Azure** ](</nl/solutions/azure-load-balancing-cluster-failover/>) ( Azure Load Balancer)
  * 💡 [ **Google Cloud ( GCP )** ](</nl/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## Virtueel IP-adres versus DNS-omleiding: Waarom DNS-failover vaak mislukt {#virtual-ip-vs-dns-redirection-failover}

### De DNS-propagatieval: Waarom VIP's beter presteren dan DNS-omleiding {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Het vertrouwen op DNS voor failover creëert vaak een **gevoel van veiligheid in architecturen** hoge beschikbaarheid. Hoewel het aanpassen van een DNS-record om naar een back-upserver te verwijzen een eenvoudige herstelprocedure lijkt, introduceert het een cruciale variabele: **latentie** Omdat DNS-gebaseerde omleiding afhankelijk is van een ongecontroleerd ecosysteem van tussenliggende recursieve resolvers om de wijziging te bevestigen en door te geven, is het fundamenteel onverenigbaar met de "zero-downtime"-vereisten van moderne bedrijfsdiensten. 

### Het technische scenario: DNS-resolutie en de vastgelopen client {#the-technical-scenario-dns-resolution-and-the-stuck-client}

In een standaard netwerkconfiguratie fungeert een **virtuele naam** (de DNS-naam) als het leesbare toegangspunt voor gebruikers. Om gegevens over het netwerk te kunnen verzenden, moet die naam echter worden omgezet naar een specifiek **fysiek IP-** adres. 

Diagram ![ dat de DNS-naamresolutie naar fysiek IP-adres 1 in een high availability-cluster ](/wp-content/uploads/2025/12/dns-rerouting.png "w:256") weergeeft.

 DNS-resolutie en vastgelopen clients op fysiek IP-adres 1 in een high availability-cluster

#### Huidige status: Resolutie naar fysiek IP-adres 1 {#current-state-resolution-to-physical-ip-1}

In eerste instantie vragen **Client 1** en **Client 2** het DNS-systeem om de virtuele naam. Het systeem retourneert **Fysiek IP-adres 1** . De clients leggen vervolgens een directe netwerkverbinding (socket) tot stand met dat specifieke hardwareadres. 

#### De failover-uitdaging: omleiden naar fysiek IP-adres 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Als de server op fysiek IP-adres 1 uitvalt, werkt een beheerder het DNS-record bij zodat het verwijst naar **fysiek IP-adres 2** . Om de clients succesvol om te leiden, moet een "perfecte" reeks gebeurtenissen plaatsvinden: 

  * De **Time to Live (TTL)** moet verlopen op alle tussenliggende ISP- en bedrijfsresolvers.
  * De lokale DNS-cache op zowel client 1 als client 2 moet worden geleegd.
  * De applicatie moet de bestaande socket sluiten en een _nieuwe_ DNS-lookup starten.

Als een van deze stappen wordt overgeslagen, blijven **Client 1 en Client 2 "vastlopen" in hun poging om te communiceren met het niet-bestaande fysieke IP-adres 1** ), wat ondanks de update van de DNS-records tot serviceuitval leidt. 

### De twee "zwarte dozen" van DNS-omleiding {#the-two-black-boxes-of-dns-redirection}

  * **Recursieve caching:** Veel internetproviders (ISP's) en DNS-resolvers van bedrijven negeren lage TTL-instellingen om het verkeer te verminderen en cachen vaak het "oude" fysieke IP-adres 1 minuten of zelfs uren na de gevraagde vervaldatum.
  * **Applicatiepersistentie:** Moderne applicaties (zoals Java-gebaseerde microservices of webbrowsers) voeren vaak slechts één keer een DNS-lookup uit bij het opstarten. Zelfs als het DNS-record wordt bijgewerkt naar fysiek IP-adres 2, blijft de applicatie het oorspronkelijke IP-adres gebruiken dat in het interne geheugen is opgeslagen.


### Conclusie {#conclusion}

DNS-omleiding is een inconsistente oplossing voor een hoge beschikbaarheidsomgeving. Voor directe failover binnen een lokale of regionale omgeving is een softwarematig gedefinieerd **virtueel IP-adres (VIP)** de enige manier om gegarandeerde, ononderbroken beschikbaarheid te waarborgen. 

## Vergelijking: Implementatie van virtueel IP, latentie en applicatietransparantie {#vip-vs-dns-comparison}

**Technische vergelijking van methoden voor virtuele IP-omleiding (VIP) versus DNS-omleiding voor hoge beschikbaarheid en noodherstel.**

Omgeving en gebruiksscenario | Type hoge beschikbaarheid | Omleidingsmechanisme | Netwerklatentie | Applicatietransparantie en IP-lokaliteit  
---|---|---|---|---  
Primair/Back-up (Hoge Beschikbaarheid) | Mirror Cluster | Gratuitous ARP / MAC Takeover | Zeer laag: Tijd om broadcast GARP te detecteren en te verzenden | Volledige Transparantie: Virtueel IP-adres is lokaal op het actieve knooppunt. Client-IP-adres blijft behouden.  
Loadbalancing (Actief/Actief) | `Farm` Cluster | Netwerkfilter op kernelniveau / GARP | Zeer laag: Tijd nodig om netwerkfilters te detecteren en opnieuw te configureren | Volledige transparantie: Virtueel IP-adres is lokaal op alle knooppunten. Client-IP-adres blijft behouden.  
Zelfde subnet / Uitgebreid LAN (VLAN-stretching) | Rampenherstel (externe datacenters) | Standaard IP-aliasing / GARP | Laag: Afhankelijk van de RTT (Round Trip Time) van het stretched VLAN | Volledige transparantie: Virtueel IP-adres is lokaal op de knooppunten. Client-IP-adres blijft behouden.  
Verschillende subnetten | Rampenherstel (externe datacenters / cloud) | Externe load balancer | Gemiddeld: Hogere failover-latentie vanwege de interval van de load balancer-statuscontrole | ⚠️ Gedeeltelijke transparantie: Gebruikt SNAT/DNAT. Virtueel IP-adres is **NIET** lokaal op de knooppunten. Client-IP-adres is **NIET** behouden. De applicatie moet dit ondersteunen.  
DNS-omleiding: Geen VIP | Rampenherstel (externe datacenters) | DNS-recordupdate (naam / fysiek IP-adres) | Hoog/onvoorspelbaar: Afhankelijk van DNS TTL (Time To Live) en DNS-caching aan de clientzijde. | ⚠️ Onbetrouwbaar: Client moet DNS opnieuw oplossen. Meestal blijven clients het verouderde IP-adres gebruiken dat bij het opstarten is opgelost en worden ze na een failover niet omgeleid.  
  
## Een virtueel IP-adres configureren voor netwerkbelastingverdeling en hoge beschikbaarheid {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-nl  %}}
 

## Veelgestelde vragen over virtueel IP-adres (VIP) {#virtual-ip-faq}

### Virtueel IP-adres (VIP) & Netwerken {#virtual-ip-vip--networking}

Wat is een virtueel IP-adres (VIP) en waarin verschilt het van een fysiek IP-adres?

Terwijl een **fysiek IP-adres** is gekoppeld aan een specifieke netwerkinterface, is een **virtueel IP-adres (VIP)** een "zwevend" adres dat onafhankelijk is van de hardware. In een SafeKit -cluster fungeert het VIP als een permanent toegangspunt; als de primaire server uitvalt, migreert het VIP automatisch naar een functionerend secundair knooppunt, waardoor herconfiguratie van de client niet nodig is.

Heb ik een hardwarematige load balancer nodig om een virtueel IP-adres te gebruiken?

Nee. **SafeKit High Availability-software** beheert het virtuele IP-adres op softwareniveau. In architecturen binnen hetzelfde subnet maakt deze gebruik van **IP-aliasing** en **Gratuitous ARP (GARP)** om verkeer om te leiden. Dit elimineert de kosten en complexiteit van externe hardwarematige loadbalancers of dedicated proxyservers.

Wat is Gratuitous ARP (GARP) en waarom wordt het gebruikt?

**Gratuitous ARP (GARP)** is een netwerkbroadcast die de ARP-tabellen van netwerkswitches en routers bijwerkt. Tijdens een failover stuurt de nieuwe primaire server een GARP-pakket om aan te kondigen dat het **virtuele IP-adres** nu is gekoppeld aan zijn MAC-adres, waardoor het verkeer onmiddellijk over het netwerk wordt omgeleid.

Kan ik een DNS-naam koppelen aan een virtueel IP-adres?

**Ja.** Je kunt een DNS-naam aan een VIP koppelen door een standaard A-record aan te maken. Het belangrijkste voordeel is dat omleidingen op **VIP-niveau** worden beheerd (via ARP of netwerkomleiding) en **niet op DNS-niveau** . Dit zorgt voor **applicatietransparantie** doordat vertragingen als gevolg van DNS-propagatie en TTL-verloop worden vermeden.

### Cloud & Geavanceerde Architecturen {#cloud--advanced-architectures}

Hoe werkt een virtueel IP-adres in de cloud ( AWS , Azure , GCP )?

In cloudomgevingen waar Layer 2 (ARP) beperkt is, integreert SafeKit met **Cloud Load Balancers** ( AWS ELB, Azure LB of Google GCLB). SafeKit biedt een **Health Check URL** die het platform bewaakt om verkeer naar het actieve knooppunt te routeren met behulp van SNAT/DNAT.

Is een uitgebreid LAN beter dan een load balancer voor noodherstel?

**Ja** . Voor datacenters op afstand is een **Extended LAN (stretched VLAN)** vaak superieur omdat het **de applicatietransparantie** over de verschillende locaties behoudt. Door **hetzelfde virtuele IP-adres** te behouden, blijven de applicatie en de clients communiceren met dezelfde identiteit, waardoor de overgang tussen datacenters volledig naadloos verloopt.

Wat zijn de beperkingen van DNS-rerouting ten opzichte van virtuele IP-adressen?

**DNS-omleiding** wordt beperkt door **TTL (Time to Live)** en caching aan de clientzijde, wat het herstel uren kan vertragen. Een groot nadeel is dat **clients die hun DNS-naam niet opnieuw oplossen, vast blijven zitten** in hun pogingen om verbinding te maken met de defecte server. Een **virtueel IP-adres** daarentegen biedt onmiddellijke Layer 2-failover die al het verkeer direct omleidt, waardoor connectiviteit gegarandeerd is, ongeacht de status van de DNS-cache aan de clientzijde.

### Transparantie & Beveiliging {#transparency--security}

Waarom is een lokaal virtueel IP-adres belangrijk voor applicatietransparantie?

Een lokaal **virtueel IP-adres (VIP)** zorgt voor **applicatietransparantie** doordat de software zich kan binden aan een persistent VIP-adres. SafeKit handelt omleidingen af op **kernelniveau** , waardoor de applicatie geen weet heeft van clusterfailovers, in tegenstelling tot DNAT-oplossingen waarbij het gebonden IP-adres verandert.

Zorgt het gebruik van een virtueel IP-adres ervoor dat het oorspronkelijke IP-adres van de client behouden blijft?

Ja. SafeKit voorkomt Source Network Address Translation (SNAT). Omdat het VIP-adres lokaal is voor de actieve server, ontvangt de applicatie het **oorspronkelijke client-IP-adres** . Dit is cruciaal voor beveiligingsaudits, sessiepersistentie en wettelijke registratie.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}