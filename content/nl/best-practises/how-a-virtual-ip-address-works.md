---
title: "Hoe werkt een virtueel IP-adres in een clusteromgeving met hoge beschikbaarheid?"
canonical: "https://safekit.eviden.com/nl/best-practises/how-a-virtual-ip-address-works/"
description: "Hoe SafeKit een virtueel IP-adres verplaatst bij failover: gratuitous ARP binnen hetzelfde subnet, load balancer, cloud CLI of BGP over subnets heen. Waarom een lokaal virtueel IP-adres belangrijk is."
category: "best-practises"
lang: "nl"
topics: "Wat is een virtueel IP-adres in een high availability-cluster?, Implementatie van virtuele IP in SafeKit, Hoe werkt een virtueel IP-adres in hetzelfde subnet (mirror), Hoe werkt een virtueel IP-adres over verschillende subnets met een load balancer (mirror), Hoe werkt een virtueel IP-adres over verschillende subnets met CLI's van cloudproviders (mirror), Hoe werkt een virtueel IP-adres over verschillende subnets met BGP (mirror), Hoe werkt DNS-omleiding over verschillende subnets (mirror), Hoe werkt load balancing van virtuele IP in een farm op hetzelfde subnet, Hoe werkt een load balanced virtueel IP-adres over verschillende subnets (farm), Vergelijking: implementatie van virtuele IP, latentie en applicatietransparantie, Veelgestelde vragen over virtuele IP, 🔍 Ontdek SafeKit"
---

# Hoe werkt een virtueel IP-adres in een clusteromgeving met hoge beschikbaarheid? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Wat is een virtueel IP-adres in een high availability-cluster? {#virtual-ip-definition}

Een **virtueel IP-adres** is het enige adres dat clients gebruiken om verbinding te maken met een applicatie in een [high availability-cluster](</nl/>). Het virtuele IP-adres is niet gekoppeld aan één server. Bij failover wordt het toegewezen aan de server waarop de applicatie draait. Clients hoeven hun configuratie niet aan te passen.

**Kernprincipe van SafeKit:** het virtuele IP-adres wordt **lokaal geconfigureerd op de server** waarop de applicatie draait. De applicatie start op het virtuele IP-adres en ontvangt vervolgens het oorspronkelijke client-IP-adres. Dit is de reden waarom veel applicaties zonder problemen met SafeKit werken. SafeKit biedt twee typen virtuele IP-adressen:

  * **Primair/back-up virtueel IP-adres met een mirror :** het virtuele IP-adres is alleen actief op de primaire server. Bij failover wordt het verplaatst naar de back-upserver.
  * **Netwerkbelastingverdeling met een virtueel IP-adres in een <span class="notranslate farm-term" translate="no">farm</span> :** het virtuele IP-adres is tegelijkertijd actief op alle servers. Het verkeer wordt over de servers verdeeld.

## Implementatie van virtuele IP in SafeKit {#safekit-virtual-ip-implementation}

Dit artikel legt uit hoe SafeKit het virtuele IP-adres verplaatst in elke netwerkarchitectuur:

  * **Hetzelfde subnet of uitgebreid LAN ([mirror](#virtual-ip-same-subnet-failover) en [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)):** SafeKit configureert het virtuele IP-adres op de server en verstuurt een **gratuitous ARP (GARP)**. Er is geen externe hardware nodig. Dit is de meest transparante oplossing (alles wordt geïmplementeerd door het SafeKit-product).
  * **Verschillende subnetten met een load balancer ([mirror](#virtual-ip-different-subnets-failover) en [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)):** de load balancer gebruikt de SafeKit- **healthcheck** om verkeer naar de juiste server te sturen (de load balancer wordt geconfigureerd door de integrator).
  * **[Verschillende subnetten met CLI's van cloudproviders](#virtual-ip-cloud-cli-failover) (mirror):** het SafeKit `start_prim` script roept de cloud-CLI aan om het virtuele IP-adres te verplaatsen (script geschreven door de integrator).
  * **[Verschillende subnetten met BGP](#virtual-ip-bgp-failover) (mirror):** de primaire server kondigt het virtuele IP-adres aan de routers aan (script geschreven door de integrator).
  * **[Verschillende subnetten met DNS-omleiding](#virtual-ip-vs-dns-redirection-failover) (mirror):** het SafeKit `start_prim` script wijzigt het DNS-record van de virtuele naam naar het fysieke IP-adres van de nieuwe primaire server (script geschreven door de integrator). Er is geen eenduidig virtueel IP-adres en deze methode is niet betrouwbaar voor alle clients.

Ook in dit artikel:

  * [Vergelijking: implementatie van virtueel IP, latentie en applicatietransparantie](#virtual-ip-methods-comparison)
  * [Veelgestelde vragen over virtueel IP-adres](#virtual-ip-faq)
  * [🔍 Ontdek SafeKit](#hub)

![Vergelijkend diagram van het gedrag van virtuele IP-adressen in Eviden SafeKit: Mirror -clusters met een floating IP op het actieve knooppunt versus farm clusters met netwerkbelastingverdeling over alle knooppunten.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementatie van virtuele IP-adressen voor mirror en <span class="notranslate farm-term" translate="no">farm</span> in SafeKit.**

## Hoe werkt een virtueel IP-adres binnen hetzelfde subnet (mirror)? {#virtual-ip-same-subnet-failover}

- [Het testen van het primaire/back-up virtuele IP-adres in een SafeKit- mirror .](/nl/best-practises/test-primary-backup-vip-mirror/)

### Automatische failover en netwerkomleiding binnen een lokaal subnet. {#automated-failover--network-rerouting-in-a-local-subnet}

In een lokaal netwerk beheert **SafeKit** automatisch het virtuele IP-adres en de failover van applicaties.

### Lokaal mirror : failover met 2 knooppunten op Windows of Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit virtueel IP-failovermechanisme tussen twee servers in hetzelfde subnet.](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In een **SafeKit- mirror** bevinden de twee knooppunten zich in hetzelfde subnet. Hoge beschikbaarheid wordt bereikt door een **virtueel IP-adres**. SafeKit beheert het virtuele IP-adres in de netwerkstack van het besturingssysteem. Er is geen speciale hardware nodig. Het virtuele IP-adres wordt via **IP-aliasing** toegevoegd aan de fysieke IP-adressen van Server 1 en Server 2. Clients maken altijd verbinding met het virtuele IP-adres.

#### IP-aliasing en meerdere virtuele IP-adressen (VIP's) in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

Het virtuele IP-adres is een derde IP-adres dat tussen de knooppunten wisselt. SafeKit kan **meerdere virtuele IP-adressen** in één cluster beheren. U kunt ze op dezelfde netwerkkaart plaatsen of op verschillende netwerkkaarten. Op deze manier kan elke service zijn eigen virtuele IP-adres gebruiken.

#### Het failovermechanisme: gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Failover vereist geen handmatige actie. In normale werking is het virtuele IP-adres gekoppeld aan het **MAC-adres van Server 1 (mac1)**. Als Server 1 uitvalt, doet SafeKit drie dingen:

  * **Virtuele IP-aliasing:** SafeKit configureert het virtuele IP-adres als een alias op de netwerkkaart van Server 2, de nieuwe primaire server. Het besturingssysteem verzendt vervolgens berichten over het netwerk om het virtuele IP-adres aan te kondigen.
  * **GARP:** SafeKit verzendt ook **gratuitous ARP (GARP)** -berichten. Netwerkswitches en clients werken hun ARP-cache bij. Het virtuele IP-adres is nu gekoppeld aan het **MAC-adres van Server 2 (mac2)**.
  * **Applicatieherstel:** SafeKit herstart de applicatieservices op Server 2.


#### Externe datacenters en uitgebreide VLAN's {#remote-data-centers--extended-vlans}

De **hierboven beschreven oplossing met hetzelfde subnet** werkt ook voor **noodherstel (DR)** tussen externe locaties en is vaak de beste keuze wanneer de locaties verbonden zijn via een **uitgebreid LAN of een uitgestrekt VLAN**. Beide locaties bevinden zich in één subnet. Het netwerk is eenvoudiger en u hebt geen complexe routeringsprotocollen nodig.

> **⚠️ Opmerking:** Omleiding op laag 2 met gratuitous ARP is de **meest transparante oplossing** voor applicaties. De applicatie ontvangt het oorspronkelijke client-IP-adres en het virtuele IP-adres wordt lokaal geconfigureerd. **Veel applicaties hebben een lokaal virtueel IP-adres nodig**. Zonder dit **werken deze applicaties mogelijk niet correct**. In deze configuratie binnen hetzelfde subnet implementeert SafeKit het volledige mechanisme, waardoor er geen speciale integratie nodig is.

## Hoe werkt een virtueel IP-adres over verschillende subnetten met een load balancer (mirror)? {#virtual-ip-different-subnets-failover}

### Load balancer met SafeKit health checks {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagram van een virtuele IP-failover met behulp van een load balancer over twee verschillende subnetten.](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Wanneer de knooppunten zich in **verschillende subnetten** bevinden, kan gratuitous ARP het virtuele IP-adres niet verplaatsen. In dit geval bevindt het virtuele IP-adres zich op een **load balancer**. De load balancer stuurt het verkeer door naar de primaire server.

SafeKit biedt op elk knooppunt een **URL voor een gezondheidscontrole** :

  * **Primair (PRIM):** retourneert `HTTP 200 OK`.. De load balancer stuurt verkeer naar dit knooppunt.
  * **Secundair (SECOND):** retourneert `HTTP 404 NOT FOUND`.. De load balancer stuurt geen verkeer naar dit knooppunt.

Bij failover wijzigt SafeKit de responsen en stuurt de load balancer het verkeer door naar de nieuwe primaire server. Dit is de standaardoplossing tussen **beschikbaarheidszones** op [**AWS**](</nl/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</nl/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) en [**Google Cloud**](</nl/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Let op:** SafeKit verzorgt de gezondheidscontrole. Uw netwerk of cloudprovider zorgt voor de load balancer.

### Het probleem: de load balancer beheert het virtuele IP-adres. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Met alleen een load balancer maken clients verbinding met het virtuele IP-adres. De load balancer vertaalt het virtuele IP-adres (NAT) naar het **fysieke IP-adres** van de primaire server. De client gebruikt het virtuele IP-adres, maar de server gebruikt zijn fysieke IP-adres. De server ziet het virtuele IP-adres niet.

### Zorg ervoor dat het virtuele IP-adres lokaal geconfigureerd is op de primaire server. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Sommige applicaties gebruiken het virtuele IP-adres als hun serveradres. Ze werken alleen correct als het virtuele IP-adres ook **lokaal op de primaire server is geconfigureerd**. Dan geldt het volgende:

  * De services kunnen op het virtuele IP-adres worden gestart;
  * De server kan via het virtuele IP-adres zijn eigen services bereiken;
  * Authenticatie werkt met het virtuele IP-adres.

**Aanbevolen werkwijze:** Gebruik een load balancer-modus die het virtuele IP-adres als bestemmingsadres behoudt (bijvoorbeeld Floating IP of Direct Server Return). Configureer vervolgens het virtuele IP-adres lokaal op de primaire server. De methode is afhankelijk van het subnet van het virtuele IP-adres.

  * **Het virtuele IP-adres bevindt zich in hetzelfde subnet als de fysieke IP-adressen van de servers:** behoud het gedeelte `<vip>` in de SafeKit-module. SafeKit configureert het virtuele IP-adres automatisch als een alias op de netwerkkaart van het fysieke IP-adres.
  * **Het virtuele IP-adres bevindt zich in een ander subnet:** configureer `<vip>` niet in SafeKit. Gebruik het `start_prim` script om het virtuele IP-adres te configureren op een dedicated interface, zoals loopback, voordat de applicatie start. Gebruik het `stop_prim` script om het virtuele IP-adres te verwijderen nadat de applicatie is gestopt. Deze commando's worden door de integrator geschreven en zijn niet standaard beschikbaar in SafeKit.


## Hoe een virtueel IP-adres werkt over verschillende subnetten met CLI's van cloudproviders (mirror) {#virtual-ip-cloud-cli-failover}

### Waarom gratuitous ARP niet werkt in de cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Cloudnetwerken (AWS, Azure, Google Cloud) **negeren gratuitous ARP**. Ze sturen verkeer alleen door naar IP-adressen die zijn toegewezen in het cloudplatform. SafeKit configureert het virtuele IP-adres op de primaire server, maar het cloudnetwerk stuurt het verkeer van het virtuele IP-adres niet door naar deze server.

### Het virtuele IP-adres verplaatsen met de cloud-CLI {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Zonder load balancer kan de CLI van de cloudprovider worden geïntegreerd in het SafeKit **`start_prim` script** om de cloudnetwerkconfiguratie bij te werken voordat de applicatie start. De CLI kan het virtuele IP-adres toewijzen aan het knooppunt dat primair wordt, of de cloudroute bijwerken om virtueel IP-verkeer naar dat knooppunt te leiden.

Het **virtuele IP-adres blijft lokaal** op de primaire server. Er vindt **geen NAT** plaats en het oorspronkelijke IP-adres van de client verandert niet.

### Verantwoordelijkheid van de integrator {#integrator-responsibility}

De **integrator** moet de cloud-CLI-opdrachten toevoegen aan het `start_prim` script. Deze opdrachten worden **niet door het SafeKit-product geleverd**. Ze zijn afhankelijk van de cloudprovider, het netwerkontwerp en de beveiligingsregels van de klant.

### Beperkingen {#constraints-of-the-cli-approach}

  * De cloud-CLI moet op beide knooppunten geïnstalleerd zijn. Elk knooppunt heeft een cloud-identiteit met netwerkrechten nodig.
  * Het script moet fouten en herhaalpogingen afhandelen.
  * Failover is waarschijnlijk trager dan met een load balancer.

## Hoe een virtueel IP-adres werkt over verschillende subnetten met BGP (mirror) {#virtual-ip-bgp-failover}

### Virtuele IP-routering met BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Bij BGP (Border Gateway Protocol) wordt het virtuele IP-adres doorgaans geconfigureerd op een loopback-interface van de primaire server door het `start_prim` script voordat de applicatie start. De primaire server kondigt het VIP-adres aan de routers aan als een /32-route.

Bij failover stopt het `stop_prim` script op de oude primaire server de applicatie, verwijdert het VIP van de loopback-interface en trekt de /32-route in van de routers. Als de oude primaire server crasht, wordt `stop_prim` niet uitgevoerd, maar verliezen de routers de BGP-sessie en verwijderen ze de route automatisch.

### Voordelen en voorwaarden {#benefits-and-prerequisites}

  * **Het virtuele IP-adres blijft lokaal, er is geen NAT en het IP-adres van de client verandert niet.**
  * Het werkt over subnetten en locaties heen. Je hebt geen uitgestrekt VLAN nodig.
  * Je hebt BGP-routers en hulp van je netwerkteam nodig. In de cloud heb je een routeserver-service van de cloudprovider nodig.

> **⚠️ Let op:** BGP-integratie maakt gebruik van SafeKit-scripts en uw routeringsinfrastructuur. De **integrator** moet de commando's in `start_prim` en `stop_prim` -scripts schrijven. Deze scripts worden **niet door SafeKit meegeleverd**. Valideer de oplossing met uw netwerkteam voordat u deze in productie neemt.

## Hoe werkt DNS-omleiding over verschillende subnetten (mirror)? {#virtual-ip-vs-dns-redirection-failover}

### DNS-omleiding met het `start_prim` -script {#dns-rerouting-with-the-start-prim-script}

Bij DNS-omleiding is er **geen sprake van één enkel virtueel IP-adres**. Clients maken verbinding met een **virtuele naam** (de DNS-naam). Bij failover start het `start_prim` script op de nieuwe primaire server de applicatie en wijzigt vervolgens het DNS-record van de virtuele naam naar het **fysieke IP-adres** van de nieuwe primaire server.

Het `stop_prim` script heeft niets te doen. Als de oude primaire server crasht, overschrijft de nieuwe primaire server het DNS-record.

### Voorbeeld: DNS-resolutie en geblokkeerde clients {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagram dat de DNS-naamresolutie naar fysiek IP-adres 1 in een high availability-cluster weergeeft.](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS-resolutie en clients geblokkeerd op fysiek IP-adres 1 in een high availability-cluster

#### Vóór failover: de naam verwijst naar fysiek IP-adres 1 {#current-state-resolution-to-physical-ip-1}

**Client 1** en **Client 2** vragen het DNS-systeem om het IP-adres van de virtuele naam. Het DNS-systeem retourneert **fysiek IP-adres 1.** De clients openen vervolgens een netwerkverbinding met dit adres.

#### Na failover: de naam verwijst naar fysiek IP-adres 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Server 1 valt uit. Het `start_prim` script op server 2 wijzigt het DNS-record naar **fysiek IP-adres 2.** De clients maken alleen verbinding met fysiek IP-adres 2 als aan al deze voorwaarden is voldaan:

  * De **TTL (Time to Live)** is verlopen op alle DNS-servers tussen de client en het DNS-record.
  * De lokale DNS-cache van Client 1 en Client 2 is leeg.
  * De applicatie verbreekt de verbinding en voert een *nieuwe* DNS-zoekopdracht uit.

Als aan één van de voorwaarden niet wordt voldaan, **blijven Client 1 en Client 2 geblokkeerd** op fysiek IP-adres 1. De service is dan niet beschikbaar, zelfs als het DNS-record correct is.

### Beperkingen en voorwaarden {#the-two-black-boxes-of-dns-redirection}

  * **DNS-cache:** Veel internetproviders en DNS-servers van bedrijven negeren korte TTL-waarden. Ze kunnen het oude fysieke IP-adres 1 minuten of zelfs urenlang vasthouden.
  * **Applicatiegedrag:** Veel applicaties (bijvoorbeeld Java-services of webbrowsers) voeren slechts één keer een DNS-lookup uit, bij het opstarten. Ze blijven het eerste IP-adres gebruiken.
  * **Het IP-adres verandert bij elke failover:** de applicatie heeft geen lokaal virtueel IP-adres dat hetzelfde blijft. Applicaties die hun eigen IP-adres registreren, werken mogelijk niet.
  * **Voorwaarden:** een korte TTL op het DNS-record (bijvoorbeeld 30 tot 60 seconden) en rechten om de DNS-zone vanaf beide servers bij te werken.

> **⚠️ Let op:** De **integrator** moet de DNS-updateopdrachten in het `start_prim` -script schrijven. Deze opdrachten worden **niet door het SafeKit-product geleverd**. Ze zijn afhankelijk van de DNS-server (Windows DNS, BIND of cloud-DNS).

### Conclusie {#conclusion}

DNS-omleiding is geen betrouwbare oplossing voor hoge beschikbaarheid. Gebruik het alleen als alle clients een nieuwe DNS-lookup uitvoeren wanneer ze opnieuw verbinding maken. Voor een onmiddellijke en transparante failover kunt u een **virtueel IP-adres** gebruiken: op een uitgebreid LAN, met een load balancer, met CLI's van cloudproviders of met BGP.

## Hoe werkt load balancing met virtuele IP-adressen in een <span class="notranslate farm-term" translate="no">farm</span> op hetzelfde subnet? {#virtual-ip-load-balancing-same-subnet}

- [Het testen van het virtuele IP-adres voor load balancing in een SafeKit farm .](/nl/best-practises/test-load-balancing-vip-farm/)

### Taakverdeling in de kernel, met redundantie. {#scalable-performance-kernel-level-load-balancing--redundancy}

Bij veel verkeer kan SafeKit de taken verdelen over meerdere actieve servers. Als één server uitvalt, blijven de andere servers gewoon doorwerken.

### <span class="notranslate farm-term" translate="no">Farm</span> : taakverdeling tussen Windows- of Linux-nodes {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagram van een load-balanced virtueel IP-adres binnen hetzelfde subnet.](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In een **load balancing <span class="notranslate farm-term" translate="no">farm</span> cluster** maken clients verbinding met een virtueel IP-adres en worden de aanvragen tegelijkertijd over meerdere servers verdeeld. Dit voorbeeld toont twee knooppunten. U kunt meer knooppunten aan het cluster toevoegen. Binnen hetzelfde subnet is het virtuele IP-adres geconfigureerd met IP-aliasing op de netwerkkaart van **elke server** in het cluster.

#### Verkeersdeling: het kernelfilter {#traffic-distribution-the-kernel-level-filter}

In een <span class="notranslate farm-term" translate="no">farm</span> verdeelt een SafeKit- **filter in de kernel** het verkeer. Het werkt als volgt:

  * **ARP-mapping:** In de ARP-cache van de clients wordt het virtuele IP-adres gekoppeld aan één MAC-adres (bijvoorbeeld `mac1` van Server 1).
  * **Pakketanalyse:** Server 1 ontvangt de pakketten. Het SafeKit-kernelfilter leest het **client-IP-adres** of de **TCP-poort** van elk pakket.
  * **Taakverdeling:** Het filter bepaalt welke pakketten Server 1 verwerkt en welke naar de andere knooppunten (bijvoorbeeld Server 2) gaan. Om een pakket naar een ander knooppunt te sturen, herschrijft het filter het **MAC-adres van de bestemming** in het pakket met het MAC-adres van dat knooppunt. Het IP-adres van de bestemming blijft het virtuele IP-adres. De werklast wordt verdeeld over de servers.


#### Failover en omleiding met gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Als server 1 uitvalt, stuurt SafeKit een **gratuitous ARP (GARP)** -bericht. De clients werken hun ARP-cache bij met `mac2` van server 2. De clients worden vervolgens direct doorgestuurd naar de andere knooppunten van de farm.

#### Implementatie op afgelegen locaties {#deployment-in-remote-sites}

Deze load balancing-oplossing werkt ook tussen **externe datacenters**, mits de locaties via een **uitgebreid LAN of VLAN** met elkaar verbonden zijn. Alle locaties bevinden zich dan in hetzelfde subnet. Dit is de meest efficiënte configuratie voor <span class="notranslate farm-term" translate="no">farm</span> op meerdere locaties.

{{%  insert-safekit-farm-video-nl  %}}

## Hoe werkt een load-balanced virtueel IP-adres over verschillende subnetten (<span class="notranslate farm-term" translate="no">farm</span>)? {#virtual-ip-load-balancing-different-subnets}

### Verkeer tussen cloud-subnetten {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Een <span class="notranslate farm-term" translate="no">farm</span> kan de applicatietaken verdelen over meerdere beschikbaarheidszones en subnetten.

### Cross-subnet <span class="notranslate farm-term" translate="no">farm</span> : meerdere Windows- of Linux-nodes {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagram van een load-balanced farm dat opereert over twee verschillende subnetten.](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Wanneer de <span class="notranslate farm-term" translate="no">farm</span> zich in **verschillende subnetten** bevinden (bijvoorbeeld in meerdere cloudbeschikbaarheidszones), bevindt het **virtuele IP-adres** zich op een externe **load balancer (LB)**. De load balancer stuurt het verkeer door naar de fysieke IP-adressen van de servers in elk subnet.

#### Regels voor verkeersroutering en taakverdeling {#intelligent-traffic-routing--load-balancing-rules}

De load balancer verdeelt de clientverzoeken op basis van twee criteria:

  * **Regels voor taakverdeling:** bijvoorbeeld het **IP-adres van de client** of de **TCP-poort van de client**.
  * **Beschikbaarheid van knooppunten:** de load balancer stuurt verkeer alleen naar de knooppunten die gezond zijn, op basis van de SafeKit-statuscontrole.


> **⚠️ Let op:** SafeKit verzorgt de gezondheidscontrole. Uw netwerk of cloudprovider zorgt voor de load balancer.

#### SafeKit-gezondheidscontrole {#safekit-health-check-mechanism}

SafeKit biedt op elke server in de <span class="notranslate farm-term" translate="no">farm</span> een **URL voor een statuscontrole**. De load balancer leest deze URL om de status van elke server te controleren.

  * **Node UP:** de gezondheidscontrole retourneert `HTTP 200 OK`.. De load balancer stuurt verkeer naar deze server.
  * **Knooppunt UITGEVALLEN:** als een server of applicatie uitvalt, retourneert SafeKit `HTTP 404 NOT FOUND` (of de server reageert niet). De load balancer stopt onmiddellijk met het doorsturen van verkeer naar dit knooppunt.


#### Cloudimplementatie: AWS, Azure en GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Dit is de standaardarchitectuur voor **<span class="notranslate farm-term" translate="no">farm</span> in de cloud**. Als een subnet of een zone uitvalt, blijven de andere knooppunten het verkeer verwerken. Deze architectuur wordt ondersteund door [**Amazon AWS**](</nl/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</nl/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) en [**Google Cloud (GCP)**](</nl/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Vergelijking: implementatie van virtueel IP, latentie en applicatietransparantie {#virtual-ip-methods-comparison}

**Vergelijking van virtuele IP-omleidingsmethoden en DNS-omleiding voor hoge beschikbaarheid en noodherstel.**

Omgeving en gebruiksscenario | Type met hoge beschikbaarheid | Omleidingsmethode | Uitgevoerd door | Netwerklatentie | Applicatietransparantie en lokaal IP-adres  
---|---|---|---|---|---  
Primair/back-up (hoge beschikbaarheid) | Mirror | Onnodige overname van ARP/MAC | ✅ SafeKit-product | Zeer laag: tijd om de storing te detecteren en de GARP te verzenden. | Volledige transparantie: het virtuele IP-adres is lokaal op het actieve knooppunt. Het IP-adres van de client verandert niet.  
Taakverdeling (actief/actief) | <span class="notranslate farm-term" translate="no">Farm</span> | Kernelnetwerkfilter / GARP | ✅ SafeKit-product | Zeer kort: tijd om de storing te detecteren en de netwerkfilters te vervangen. | Volledige transparantie: het virtuele IP-adres is lokaal op alle knooppunten. Het IP-adres van de client verandert niet.  
Hetzelfde subnet / uitgebreid LAN (stretched VLAN) | Rampenherstel (externe datacenters) | IP-aliasing / GARP | ✅ SafeKit-product (de uitgebreide VLAN wordt geleverd door het netwerkteam) | Laag: afhankelijk van de round trip time (RTT) van het uitgerekte VLAN. | Volledige transparantie: het virtuele IP-adres is lokaal op de knooppunten. Het IP-adres van de client verandert niet.  
Verschillende subnetten: alleen load balancer | Rampenherstel (externe datacenters / cloud) | Externe lastverdeler | 🛠️ Integrator: configuratie van de load balancer (SafeKit verzorgt de health check) | Gemiddeld: afhankelijk van het interval voor de gezondheidscontrole van de load balancer. | ⚠️ Gedeeltelijke transparantie indien SNAT/DNAT wordt gebruikt. Het virtuele IP-adres is **NIET** lokaal op de nodes. Het IP-adres van de client mag **NIET** worden bewaard. De applicatie moet dit ondersteunen.  
Verschillende subnetten: load balancer + lokaal virtueel SafeKit-IP-adres | Rampenherstel (externe datacenters / cloud) | Externe load balancer met Floating IP / Direct Server Return | 🛠️ Integrator: configuratie van de load balancer (SafeKit verzorgt de health check) | Gemiddeld: afhankelijk van het interval voor de gezondheidscontrole van de load balancer. | Goede transparantie: het virtuele IP-adres bevindt zich lokaal op het primaire knooppunt en is het bestemmingsadres.
Verschillende subnetten: cloud CLI | Rampenherstel (cloud) | Cloud API: het privé-IP-adres of een cloudroute wordt verplaatst naar het nieuwe primaire adres. | 🛠️ Integrator: cloud CLI-opdrachten in het `start_prim` script | Gemiddeld tot hoog: afhankelijk van de reactietijd van de cloud-API | Volledige transparantie: het virtuele IP-adres bevindt zich lokaal op het primaire knooppunt. Het IP-adres van de client verandert niet.
Verschillende subnetten: BGP | Rampenherstel (externe datacenters / cloud) | /32-route aangekondigd met BGP | 🛠️ Integrator: BGP-opdrachten in de `start_prim` en `stop_prim` -scripts | Laag tot gemiddeld: afhankelijk van de BGP-convergentietijd. | Volledige transparantie: het virtuele IP-adres is lokaal op het primaire knooppunt. Het IP-adres van de client verandert niet. Vereist BGP-routers.  
DNS-omleiding: geen virtueel IP-adres | Rampenherstel (externe datacenters) | Wijziging van DNS-record (naam / fysiek IP-adres) | 🛠️ Integrator: DNS-updateopdrachten in het `start_prim` -script | Hoog en onvoorspelbaar: afhankelijk van de DNS TTL (Time To Live) en de DNS-cache van de client. | ⚠️ Niet betrouwbaar: de client moet een nieuwe DNS-lookup uitvoeren. Vaak behouden clients het oude IP-adres dat ze bij het opstarten hebben gekregen en worden ze na een failover niet omgeleid.  
  
## Veelgestelde vragen over virtueel IP-adres {#virtual-ip-faq}

### Virtueel IP-adres en netwerken {#virtual-ip--networking}

Wat is een virtueel IP-adres en waarin verschilt het van een fysiek IP-adres?

Een **fysiek IP-adres** is gekoppeld aan één netwerkkaart. Een **virtueel IP-adres** is niet gekoppeld aan hardware. In een SafeKit-cluster gebruiken clients altijd het virtuele IP-adres. Als de primaire server uitvalt, wordt het virtuele IP-adres automatisch overgezet naar een functionerende node. U hoeft de clientconfiguratie niet te wijzigen.

Heb ik een hardwarematige load balancer nodig om een virtueel IP-adres te gebruiken?

Nee. **SafeKit** beheert het virtuele IP-adres met software. Binnen hetzelfde subnet gebruikt het **IP-aliasing** en **gratuitous ARP (GARP)** om het verkeer om te leiden. U hebt geen externe load balancer of proxyserver nodig.

Wat is gratuitous ARP (GARP) en waarom wordt het gebruikt?

**Gratuitous ARP (GARP)** is een netwerkbericht dat naar alle apparaten wordt verzonden. Het werkt de ARP-tabellen van switches en routers bij. Bij failover stuurt de nieuwe primaire server een GARP-bericht. Dit bericht meldt dat het **virtuele IP-adres** nu is gekoppeld aan het MAC-adres van de nieuwe primaire server. Het verkeer wordt vervolgens direct omgeleid.

Kan ik een DNS-naam koppelen aan een virtueel IP-adres?

**Ja.** Maak een standaard A-record aan voor het virtuele IP-adres. Omleiding vindt plaats op het **niveau van het virtuele IP-adres** (met ARP of netwerkomleiding), **niet op DNS-niveau**. U ondervindt geen DNS-vertragingen of TTL-problemen en de failover blijft **transparant voor de applicatie**.

### Cloud en geavanceerde architecturen {#cloud--advanced-architectures}

Hoe werkt een virtueel IP-adres in de cloud (AWS, Azure, GCP)?

In de cloud zijn Layer 2 GARP-berichten niet beschikbaar voor het omleiden van een virtueel IP-adres. SafeKit werkt met **cloud load balancers** (AWS ELB, Azure LB of Google GCLB). SafeKit biedt een **health check-URL**. De load balancer leest deze en stuurt het verkeer door naar het actieve knooppunt.

Is een uitgebreid LAN beter dan een load balancer voor noodherstel?

**Ja**. Tussen externe datacenters is een **uitgebreid LAN (stretched VLAN)** vaak beter, omdat de failover **transparant blijft voor de applicatie**. Het **virtuele IP-adres verandert niet**, waardoor de applicatie en de clients hetzelfde adres blijven gebruiken na een failover tussen datacenters.

Wat zijn de beperkingen van DNS-omleiding in vergelijking met een virtueel IP-adres?

**DNS-omleiding** is afhankelijk van de **TTL (Time to Live)** en de DNS-cache van de client. Herstel kan uren duren. **Clients die geen nieuwe DNS-lookup uitvoeren, blijven bovendien geblokkeerd** op de server die niet werkt. Een **virtueel IP-adres** wordt direct omgeleid met GARP-berichten op laag 2. De DNS-cache van de client heeft geen effect.

### Transparantie en veiligheid {#transparency--security}

Waarom is een lokaal virtueel IP-adres belangrijk voor applicatietransparantie?

Met een lokaal **virtueel IP-adres** gebruikt de applicatie een adres dat niet verandert. SafeKit voert de omleiding uit in de **kernel**. De applicatie merkt de failover niet. Met DNAT verandert het adres dat de applicatie gebruikt.

Behoudt een virtueel IP-adres het oorspronkelijke IP-adres van de client?

Ja. SafeKit gebruikt geen source NAT (SNAT). Het virtuele IP-adres is lokaal op de actieve server, waardoor de applicatie het **oorspronkelijke client-IP-adres** ontvangt. Dit is belangrijk voor beveiligingsaudits, sessiepersistentie en wettelijke logboeken.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
