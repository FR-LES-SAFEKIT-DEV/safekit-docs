---
title: "Hoe werkt een virtueel IP-adres in een cluster met hoge beschikbaarheid?"
canonical: "https://safekit.eviden.com/nl/best-practises/how-a-virtual-ip-address-works/"
description: "Ontdek hoe SafeKit een virtueel IP-adres verplaatst bij failover, met GARP, load balancers, cloud-CLI's of BGP."
category: "best-practises"
lang: "nl"
topics: "Wat is een virtueel IP-adres in een cluster met hoge beschikbaarheid?, Implementatie van het virtuele IP-adres in SafeKit, Hoe een virtueel IP-adres werkt in hetzelfde subnet (Mirror-cluster), Hoe een virtueel IP-adres werkt tussen verschillende subnetten met een load balancer (Mirror-cluster), Hoe een virtueel IP-adres werkt tussen verschillende subnetten met cloudprovider-CLI's (Mirror-cluster), Hoe een virtueel IP-adres werkt tussen verschillende subnetten met BGP (Mirror-cluster), Hoe DNS-omleiding werkt tussen verschillende subnetten (Mirror-cluster), Hoe virtuele IP-load balancing werkt in een Farm-cluster binnen hetzelfde subnet, Load balancing van een virtueel IP-adres tussen verschillende subnetten (Farm-cluster), Vergelijking van implementatie, latentie en applicatietransparantie, Veelgestelde vragen over virtuele IP-adressen, 🔍 SafeKit ontdekken"
---

# Hoe werkt een virtueel IP-adres in een cluster met hoge beschikbaarheid? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Wat is een virtueel IP-adres in een cluster met hoge beschikbaarheid? {#virtual-ip-definition}

Een **virtueel IP-adres** is het enige adres waarmee clients verbinding maken met een applicatie in een [cluster met hoge beschikbaarheid](</nl/>). Het is niet aan één specifieke server gekoppeld. Bij een failover wordt het verplaatst naar de server waarop de applicatie draait. Clients hoeven hun configuratie niet aan te passen.

**Belangrijk principe van SafeKit:** het virtuele IP-adres wordt **lokaal geconfigureerd op de server** waarop de applicatie draait. De applicatie wordt op dit adres gestart en ontvangt het oorspronkelijke IP-adres van de client. Daarom werken veel applicaties zonder aanpassingen met SafeKit. SafeKit ondersteunt twee soorten virtuele IP-adressen:

  * **Primair/secundair virtueel IP-adres in een Mirror-cluster:** het virtuele IP-adres is alleen actief op de primaire server. Bij een failover wordt het naar de secundaire server verplaatst.
  * **Virtueel IP-adres met Network Load Balancing in een <span class="notranslate farm-term" translate="no">farm</span>-cluster:** het virtuele IP-adres is tegelijkertijd actief op alle servers. Het verkeer wordt over deze servers verdeeld.

## Implementatie van het virtuele IP-adres in SafeKit {#safekit-virtual-ip-implementation}

In dit artikel wordt uitgelegd hoe SafeKit het virtuele IP-adres verplaatst in de verschillende netwerkarchitecturen:

  * **Hetzelfde subnet of een uitgebreid LAN ([Mirror](#virtual-ip-same-subnet-failover) en [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet)-clusters):** SafeKit configureert het virtuele IP-adres op de server en verzendt een **gratuitous ARP (GARP)**. Externe hardware is niet nodig. Dit is de meest transparante oplossing; SafeKit implementeert het volledige mechanisme.
  * **Verschillende subnetten met een load balancer ( [Mirror](#virtual-ip-different-subnets-failover)- en [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets)-clusters):** de load balancer gebruikt de **SafeKit-healthcheck** om verkeer naar de juiste server te sturen. De integrator configureert de load balancer.
  * **[Verschillende subnetten met cloudprovider-CLI's](#virtual-ip-cloud-cli-failover) (Mirror-cluster):** het SafeKit-script `start_prim` roept de cloud-CLI aan om het virtuele IP-adres te verplaatsen. De integrator schrijft het script.
  * **[Verschillende subnetten met BGP](#virtual-ip-bgp-failover) (Mirror-cluster):** de primaire server kondigt het virtuele IP-adres aan bij de routers. De integrator schrijft het script.
  * **[Verschillende subnetten met DNS-omleiding](#virtual-ip-vs-dns-redirection-failover) (Mirror-cluster):** het SafeKit-script `start_prim` wijzigt de DNS-record van de virtuele naam zodat deze verwijst naar het fysieke IP-adres van de nieuwe primaire server. De integrator schrijft het script. Er is geen enkel virtueel IP-adres en deze methode is niet betrouwbaar voor alle clients.

In dit artikel:

  * [Vergelijking van implementatie, latentie en applicatietransparantie](#virtual-ip-methods-comparison)
  * [Veelgestelde vragen over virtuele IP-adressen](#virtual-ip-faq)
  * [🔍 SafeKit ontdekken](#hub)

![Vergelijking van virtuele IP-adressen in Evidian SafeKit: Mirror-clusters met een zwevend IP-adres op de actieve node en Farm-clusters met Network Load Balancing op alle nodes.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementatie van virtuele IP-adressen in Mirror- en <span class="notranslate farm-term" translate="no">Farm</span>-clusters met SafeKit.**

## Hoe een virtueel IP-adres werkt in hetzelfde subnet (Mirror-cluster) {#virtual-ip-same-subnet-failover}

- [Het primaire/secundaire virtuele IP-adres in een SafeKit-Mirror-cluster testen](/nl/best-practises/test-primary-backup-vip-mirror/)

### Automatische failover en netwerkroutering in een lokaal subnet {#automated-failover--network-rerouting-in-a-local-subnet}

In een lokaal netwerk beheert **SafeKit** automatisch het virtuele IP-adres en de failover van de applicatie.

### Lokaal Mirror-cluster: failover met twee nodes op Windows of Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Failovermechanisme van het SafeKit-virtuele IP-adres tussen twee servers in hetzelfde subnet](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In een **SafeKit-Mirror-cluster** bevinden de twee nodes zich in hetzelfde subnet. Hoge beschikbaarheid is gebaseerd op een **virtueel IP-adres**. SafeKit beheert dit adres in de netwerkstack van het besturingssysteem. Speciale hardware is niet nodig. Het virtuele IP-adres wordt met **IP-aliasing** toegevoegd aan de fysieke IP-adressen van server 1 en server 2. Clients maken altijd verbinding met het virtuele IP-adres.

#### IP-aliasing en ondersteuning voor meerdere virtuele IP-adressen (VIP's) in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

Het virtuele IP-adres is een derde IP-adres dat tussen de nodes wordt verplaatst. SafeKit kan **meerdere virtuele IP-adressen** in één cluster beheren. Deze kunnen op dezelfde of op verschillende netwerkkaarten worden geconfigureerd. Zo kan elke service een eigen virtueel IP-adres hebben.

#### Het failovermechanisme: gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Voor failover is geen handmatige actie nodig. Tijdens normaal bedrijf is het virtuele IP-adres gekoppeld aan het **MAC-adres van server 1 (mac1)**. Als server 1 uitvalt, voert SafeKit drie acties uit:

  * **Aliasing van het virtuele IP-adres:** SafeKit configureert het virtuele IP-adres als alias op de netwerkkaart van server 2, de nieuwe primaire server. Het besturingssysteem verzendt vervolgens berichten op het netwerk om het virtuele IP-adres aan te kondigen.
  * **GARP:** SafeKit verzendt ook **gratuitous ARP-berichten (GARP)**. Netwerkswitches en clients werken hun ARP-cache bij. Het virtuele IP-adres is nu gekoppeld aan het **MAC-adres van server 2 (mac2)**.
  * **Applicatieherstel:** SafeKit start de applicatieservices opnieuw op server 2.

#### Externe datacenters en uitgebreide VLAN's {#remote-data-centers--extended-vlans}

De hierboven beschreven **oplossing binnen hetzelfde subnet** is ook geschikt voor **disaster recovery (DR)** tussen externe locaties. Dit is vaak de beste keuze wanneer de locaties via een **uitgebreid LAN of stretched VLAN** met elkaar zijn verbonden. Beide locaties bevinden zich dan in één subnet. Dit vereenvoudigt het netwerk en voorkomt complexe routeringsprotocollen.

> **⚠️ Opmerking:** routering op laag 2 met gratuitous ARP is de **meest transparante oplossing** voor applicaties. De applicatie ontvangt het oorspronkelijke IP-adres van de client en het virtuele IP-adres is lokaal geconfigureerd. **Veel applicaties hebben** een lokaal virtueel IP-adres nodig. Zonder dit adres **werken ze mogelijk niet goed**. In deze configuratie binnen hetzelfde subnet implementeert SafeKit het volledige mechanisme; speciale integratie is niet nodig.

## Hoe een virtueel IP-adres werkt tussen verschillende subnetten met een load balancer (Mirror-cluster) {#virtual-ip-different-subnets-failover}

### Load balancer met SafeKit-healthchecks {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagram van failover van een virtueel IP-adres met een load balancer tussen twee verschillende subnetten](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Wanneer de nodes zich in **verschillende subnetten** bevinden, kan gratuitous ARP het virtuele IP-adres niet verplaatsen. In dat geval staat het virtuele IP-adres op een **load balancer**, die verkeer naar de primaire server stuurt.

SafeKit biedt op elke node een **healthcheck-URL**:

  * **Primair (PRIM):** retourneert `HTTP 200 OK`. De load balancer stuurt verkeer naar deze node.
  * **Secundair (SECOND):** retourneert `HTTP 404 NOT FOUND`. De load balancer stuurt geen verkeer naar deze node.

Bij een failover wijzigt SafeKit de antwoorden en stuurt de load balancer verkeer naar de nieuwe primaire server. Dit is de standaardoplossing tussen **availability zones** op [**AWS**](</nl/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</nl/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) en [**Google Cloud**](</nl/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Opmerking:** SafeKit levert de healthcheck. Uw netwerk of cloudprovider levert de load balancer.

### Het probleem: de load balancer bezit het virtuele IP-adres {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Wanneer alleen een load balancer wordt gebruikt, maken clients verbinding met het virtuele IP-adres. De load balancer vertaalt dit via NAT naar het **fysieke IP-adres** van de primaire server. De client gebruikt het virtuele adres, maar de server gebruikt zijn fysieke adres en ziet het virtuele IP-adres dus niet.

### Het virtuele IP-adres lokaal configureren op de primaire server {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Sommige applicaties gebruiken het virtuele IP-adres als serveradres. Ze werken alleen correct als dit adres ook **lokaal op de primaire server is geconfigureerd**. Dan geldt:

  * services kunnen op het virtuele IP-adres starten;
  * de server kan zijn eigen services via dit adres bereiken;
  * verificatie werkt met dit adres.

**Aanbevolen werkwijze:** gebruik een load-balancermodus die het virtuele IP-adres als doeladres behoudt, bijvoorbeeld Floating IP of Direct Server Return. Configureer het virtuele IP-adres vervolgens lokaal op de primaire server. De methode hangt af van het subnet van het virtuele IP-adres:

  * **Het virtuele IP-adres bevindt zich in hetzelfde subnet als de fysieke IP-adressen van de servers:** behoud de sectie `<vip>` in de SafeKit-module. SafeKit configureert het virtuele IP-adres automatisch als alias op de netwerkkaart van het fysieke IP-adres.
  * **Het virtuele IP-adres bevindt zich in een ander subnet:** configureer `<vip>` niet in SafeKit. Gebruik het script `start_prim` om het virtuele IP-adres vóór de start van de applicatie op een speciale interface, zoals loopback, te configureren. Gebruik `stop_prim` om het adres na het stoppen van de applicatie te verwijderen. De integrator schrijft deze opdrachten; ze maken geen deel uit van het SafeKit-product.

## Hoe een virtueel IP-adres werkt tussen verschillende subnetten met cloudprovider-CLI's (Mirror-cluster) {#virtual-ip-cloud-cli-failover}

### Waarom gratuitous ARP niet werkt in de cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Cloudnetwerken (AWS, Azure en Google Cloud) **negeren gratuitous ARP**. Ze routeren verkeer alleen naar IP-adressen die aan het cloudplatform zijn toegewezen. SafeKit configureert het virtuele IP-adres op de primaire server, maar het cloudnetwerk stuurt het verkeer voor dit adres niet naar die server.

### Het virtuele IP-adres verplaatsen met de cloud-CLI {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Zonder load balancer kan de CLI van de cloudprovider worden geïntegreerd in het SafeKit-script **`start_prim`** om de cloudnetwerkconfiguratie bij te werken voordat de applicatie start. De CLI kan het virtuele IP-adres toewijzen aan de node die primair wordt of de cloudroute bijwerken zodat het verkeer voor dit adres naar die node gaat.

Het **virtuele IP-adres blijft lokaal** op de primaire server. Er is **geen NAT** en het oorspronkelijke IP-adres van de client verandert niet.

### Verantwoordelijkheid van de integrator {#integrator-responsibility}

De **integrator** moet de cloud-CLI-opdrachten toevoegen aan het script `start_prim`. Deze opdrachten worden **niet door het SafeKit-product geleverd**. Ze zijn afhankelijk van de cloudprovider, het netwerkontwerp en de beveiligingsregels van de klant.

### Beperkingen {#constraints-of-the-cli-approach}

  * De cloud-CLI moet op beide nodes zijn geïnstalleerd. Elke node heeft een cloudidentiteit met de benodigde netwerkrechten nodig.
  * Het script moet fouten en nieuwe pogingen afhandelen.
  * Failover verloopt waarschijnlijk langzamer dan met een load balancer.

## Hoe een virtueel IP-adres werkt tussen verschillende subnetten met BGP (Mirror-cluster) {#virtual-ip-bgp-failover}

### Het virtuele IP-adres omleiden met BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Bij **BGP (Border Gateway Protocol)** configureert het script `start_prim` het virtuele IP-adres meestal vóór de start van de applicatie op een loopbackinterface van de primaire server. De primaire server kondigt de VIP vervolgens als een /32-route aan bij de routers.

Bij een failover stopt het script `stop_prim` op de oude primaire server de applicatie, verwijdert de VIP van de loopbackinterface en trekt de /32-route bij de routers in. Als de oude primaire server vastloopt, wordt `stop_prim` niet uitgevoerd. De routers verliezen echter de BGP-sessie en verwijderen de route automatisch.

### Voordelen en vereisten {#benefits-and-prerequisites}

  * **Het virtuele IP-adres blijft lokaal, er is geen NAT en het IP-adres van de client verandert niet.**
  * De oplossing werkt tussen subnetten en locaties. Een stretched VLAN is niet nodig.
  * BGP-routers en ondersteuning van uw netwerkteam zijn vereist. In de cloud is een route-serverdienst van de cloudprovider nodig.

> **⚠️ Opmerking:** BGP-integratie gebruikt SafeKit-scripts en uw routeringsinfrastructuur. De **integrator** moet de opdrachten schrijven in de scripts `start_prim` en `stop_prim`. Deze scripts worden **niet door het SafeKit-product geleverd**. Valideer de oplossing vóór ingebruikname met uw netwerkteam.

## Hoe DNS-omleiding werkt tussen verschillende subnetten (Mirror-cluster) {#virtual-ip-vs-dns-redirection-failover}

### DNS-routering met het script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Bij DNS-omleiding is er **geen enkel virtueel IP-adres**. Clients maken verbinding met een **virtuele naam** (de DNS-naam). Bij een failover start het script `start_prim` op de nieuwe primaire server de applicatie en wijzigt daarna de DNS-record van de virtuele naam zodat deze verwijst naar het **fysieke IP-adres** van de nieuwe primaire server.

Het script `stop_prim` hoeft niets te doen. Als de oude primaire server uitvalt, overschrijft de nieuwe primaire server de DNS-record.

### Voorbeeld: DNS-resolutie en geblokkeerde clients {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagram van DNS-naamomzetting naar fysiek IP-adres 1 in een cluster met hoge beschikbaarheid](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

DNS-resolutie: clients blijven in een cluster met hoge beschikbaarheid geblokkeerd op fysiek IP-adres 1.

#### Vóór failover: de naam verwijst naar fysiek IP-adres 1 {#current-state-resolution-to-physical-ip-1}

**Client 1** en **client 2** vragen het DNS-systeem om het IP-adres van de virtuele naam. Het DNS-systeem retourneert **fysiek IP-adres 1**. De clients openen vervolgens een netwerkverbinding naar dit adres.

#### Na failover: de naam verwijst naar fysiek IP-adres 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Server 1 valt uit. Het script `start_prim` op server 2 wijzigt de DNS-record naar **fysiek IP-adres 2**. De clients kunnen alleen verbinding maken met dit adres als aan alle volgende voorwaarden is voldaan:

  * De **TTL (Time to Live)** is verlopen op alle DNS-servers tussen de client en de DNS-record.
  * De lokale DNS-cache van client 1 en client 2 is leeg.
  * De applicatie sluit de verbinding en voert een **nieuwe** DNS-lookup uit.

Als niet aan één voorwaarde wordt voldaan, blijven **client 1 en client 2 geblokkeerd** op fysiek IP-adres 1. De service is niet beschikbaar, ook al is de DNS-record correct.

### Beperkingen en vereisten {#the-two-black-boxes-of-dns-redirection}

  * **DNS-cache:** veel internetproviders en bedrijfs-DNS-servers negeren korte TTL-waarden. Ze kunnen het oude fysieke IP-adres 1 minuten of uren bewaren.
  * **Applicatiegedrag:** veel applicaties, bijvoorbeeld Java-services of webbrowsers, voeren alleen bij het starten een DNS-lookup uit. Daarna blijven ze het eerste IP-adres gebruiken.
  * **Het IP-adres verandert bij elke failover:** de applicatie heeft geen lokaal virtueel IP-adres dat gelijk blijft. Applicaties die hun eigen IP-adres registreren werken mogelijk niet.
  * **Vereisten:** een korte TTL voor de DNS-record (bijvoorbeeld 30 tot 60 seconden) en rechten om de DNS-zone vanaf beide servers bij te werken.

> **⚠️ Opmerking:** de **integrator** moet de DNS-updateopdrachten schrijven in het script `start_prim`. Deze opdrachten worden **niet door het SafeKit-product geleverd** en zijn afhankelijk van de DNS-server (Windows DNS, BIND of clouddns).

### Conclusie {#conclusion}

DNS-omleiding is geen betrouwbare oplossing voor hoge beschikbaarheid. Gebruik deze methode alleen als alle clients bij het opnieuw verbinden een nieuwe DNS-lookup uitvoeren. Gebruik voor onmiddellijke en transparante failover een **virtueel IP-adres**: via een uitgebreid LAN, een load balancer, cloudprovider-CLI's of BGP.

## Hoe load balancing van een virtueel IP-adres werkt in hetzelfde subnet (Farm-cluster) {#virtual-ip-load-balancing-same-subnet}

- [Load balancing van een virtueel IP-adres in een SafeKit-Farm-cluster testen](/nl/best-practises/test-load-balancing-vip-farm/)

### Load balancing in de kernel met redundantie {#scalable-performance-kernel-level-load-balancing--redundancy}

Bij veel verkeer kan SafeKit het werk verdelen over meerdere actieve servers. Als één server uitvalt, blijven de andere servers werken.

### Farm-clusterarchitectuur: load balancing tussen Windows- of Linux-nodes {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagram van een virtueel IP-adres met load balancing binnen hetzelfde subnet](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In een **Farm-cluster met load balancing** maken clients verbinding met een virtueel IP-adres en worden verzoeken tegelijkertijd over meerdere servers verdeeld. Dit voorbeeld toont twee nodes. U kunt meer nodes aan het cluster toevoegen. In hetzelfde subnet wordt het virtuele IP-adres via IP-aliasing geconfigureerd op de netwerkkaart van **elke server** in het cluster.

#### Verkeersverdeling: het kernel-filter {#traffic-distribution-the-kernel-level-filter}

In een <span class="notranslate farm-term" translate="no">Farm</span>-cluster verdeelt een SafeKit-**kernel-filter** het verkeer. Dit gebeurt als volgt:

  * **ARP-toewijzing:** in de ARP-cache van de clients is het virtuele IP-adres gekoppeld aan één MAC-adres, bijvoorbeeld `mac1` van server 1.
  * **Pakketcontrole:** server 1 ontvangt de pakketten. Het SafeKit-kernel-filter leest het **IP-adres van de client** of de **TCP-poort** van elk pakket.
  * **Load balancing:** het filter bepaalt welke pakketten server 1 verwerkt en welke naar andere nodes, bijvoorbeeld server 2, gaan. Om een pakket naar een andere node te sturen, vervangt het filter het **MAC-adres van bestemming** door het MAC-adres van die node. Het IP-adres van bestemming blijft het virtuele IP-adres. Zo wordt het werk over de servers verdeeld.

#### Failover en routering met gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Als server 1 uitvalt, verzendt SafeKit een **gratuitous ARP-bericht (GARP)**. Clients werken hun ARP-cache bij met `mac2`, het MAC-adres van server 2. Het verkeer wordt vervolgens onmiddellijk naar de andere Farm-nodes gestuurd.

#### Implementatie op externe locaties {#deployment-in-remote-sites}

Deze load-balancingoplossing werkt ook tussen **externe datacenters**, als de locaties met elkaar verbonden zijn via een **uitgebreid LAN of VLAN**. Alle locaties bevinden zich dan in hetzelfde subnet. Dit is de efficiëntste configuratie voor <span class="notranslate farm-term" translate="no">Farm</span>-clusters op meerdere locaties.

{{%  insert-safekit-farm-video-nl  %}}

## Load balancing van een virtueel IP-adres tussen verschillende subnetten (Farm-cluster) {#virtual-ip-load-balancing-different-subnets}

### Verkeer tussen cloudsubnetten {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Een <span class="notranslate farm-term" translate="no">Farm</span>-cluster kan de applicatielast verdelen over meerdere beschikbaarheidszones en subnetten.

### Farm-clusters over subnetten: meerdere Windows- of Linux-nodes {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagram van een Farm-cluster met load balancing over twee verschillende subnetten](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Wanneer de <span class="notranslate farm-term" translate="no">Farm</span>-nodes zich in **verschillende subnetten** bevinden, bijvoorbeeld in meerdere cloudbeschikbaarheidszones, staat het **virtuele IP-adres** op een externe **load balancer (LB)**. De load balancer stuurt verkeer naar de fysieke IP-adressen van servers in elk subnet.

#### Regels voor verkeersroutering en load balancing {#intelligent-traffic-routing--load-balancing-rules}

De load balancer verdeelt clientverzoeken op basis van twee criteria:

  * **Load-balancingregels:** bijvoorbeeld het **IP-adres van de client** of de **TCP-poort van de client**.
  * **Beschikbaarheid van nodes:** op basis van de SafeKit-healthcheck stuurt de load balancer alleen verkeer naar gezonde nodes.

> **⚠️ Opmerking:** SafeKit levert de healthcheck. Uw netwerk of cloudprovider levert de load balancer.

#### SafeKit-healthcheck {#safekit-health-check-mechanism}

SafeKit biedt een **healthcheck-URL** op elke Farm-server. De load balancer vraagt deze op om de status van elke server te bepalen:

  * **Node UP:** de healthcheck retourneert `HTTP 200 OK`. De load balancer stuurt verkeer naar deze server.
  * **Node DOWN:** als een server of applicatie uitvalt, retourneert SafeKit `HTTP 404 NOT FOUND` (of antwoordt de server niet). De load balancer stopt onmiddellijk met het sturen van verkeer naar deze node.

#### Cloudimplementatie: AWS, Azure en GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Dit is de standaardarchitectuur voor **<span class="notranslate farm-term" translate="no">Farm</span>-clusters in de cloud**. Als een subnet of zone uitvalt, blijven de andere nodes het verkeer verwerken. De oplossing wordt ondersteund door [**Amazon AWS**](</nl/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</nl/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) en [**Google Cloud (GCP)**](</nl/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).

## Vergelijking: implementatie van virtuele IP-adressen, latentie en applicatietransparantie {#virtual-ip-methods-comparison}

**Vergelijking van omleidingsmethoden met virtuele IP-adressen en DNS voor hoge beschikbaarheid en disaster recovery.**

Omgeving en gebruikssituatie | Type hoge beschikbaarheid | Omleidingsmethode | Geïmplementeerd door | Netwerklatentie | Applicatietransparantie en lokaal IP-adres  
---|---|---|---|---|---  
Primair/secundair (hoge beschikbaarheid) | Mirror-cluster | Gratuitous ARP / MAC-overname | ✅ SafeKit-product | Zeer laag: tijd om de storing te detecteren en GARP te verzenden | Volledige transparantie: het virtuele IP-adres is lokaal op de actieve node. Het IP-adres van de client verandert niet.  
Load balancing (actief/actief) | <span class="notranslate farm-term" translate="no">Farm</span>-cluster | Kernel-netwerkfilter / GARP | ✅ SafeKit-product | Zeer laag: tijd om de storing te detecteren en netwerkfilters te wijzigen | Volledige transparantie: het virtuele IP-adres is lokaal op alle nodes. Het IP-adres van de client verandert niet.  
Hetzelfde subnet / uitgebreid LAN (stretched VLAN) | Disaster recovery (externe datacenters) | IP-aliasing / GARP | ✅ SafeKit-product (het stretched VLAN wordt geleverd door het netwerkteam) | Laag: afhankelijk van de round-trip-tijd (RTT) van het stretched VLAN | Volledige transparantie: het virtuele IP-adres is lokaal op de nodes. Het IP-adres van de client verandert niet.  
Verschillende subnetten: alleen load balancer | Disaster recovery (externe datacenters / cloud) | Externe load balancer | 🛠️ Integrator: configuratie van de load balancer (SafeKit levert de healthcheck) | Gemiddeld: afhankelijk van het healthcheckinterval van de load balancer | ⚠️ Gedeeltelijke transparantie als SNAT/DNAT wordt gebruikt. Het virtuele IP-adres is **NIET** lokaal op de nodes. Het IP-adres van de client blijft mogelijk **NIET** behouden. De applicatie moet dit ondersteunen.  
Verschillende subnetten: load balancer + lokaal SafeKit-virtueel IP | Disaster recovery (externe datacenters / cloud) | Externe load balancer met Floating IP / Direct Server Return | 🛠️ Integrator: configuratie van de load balancer (SafeKit levert de healthcheck) | Gemiddeld: afhankelijk van het healthcheckinterval van de load balancer | Goede transparantie: het virtuele IP-adres is lokaal op de primaire node en dient als doeladres.  
Verschillende subnetten: cloud-CLI | Disaster recovery (cloud) | Cloud-API: het privé-IP-adres of een cloudroute wordt naar de nieuwe primaire server verplaatst | 🛠️ Integrator: cloud-CLI-opdrachten in het script `start_prim` | Gemiddeld tot hoog: afhankelijk van de responstijd van de cloud-API | Volledige transparantie: het virtuele IP-adres is lokaal op de primaire node. Het IP-adres van de client verandert niet.  
Verschillende subnetten: BGP | Disaster recovery (externe datacenters / cloud) | Via BGP aangekondigde /32-route | 🛠️ Integrator: BGP-opdrachten in de scripts `start_prim` en `stop_prim` | Laag tot gemiddeld: afhankelijk van de BGP-convergentietijd | Volledige transparantie: het virtuele IP-adres is lokaal op de primaire node. Het IP-adres van de client verandert niet. BGP-routers vereist.  
DNS-omleiding: geen virtueel IP-adres | Disaster recovery (externe datacenters) | DNS-record wijzigen (naam / fysiek IP-adres) | 🛠️ Integrator: DNS-updateopdrachten in het script `start_prim` | Hoog en onvoorspelbaar: afhankelijk van DNS-TTL (Time to Live) en de DNS-cache van de client | ⚠️ Onbetrouwbaar: de client moet een nieuwe DNS-lookup uitvoeren. Clients blijven vaak het oude IP-adres gebruiken dat ze bij het opstarten hebben ontvangen en worden na een failover niet omgeleid.  

## Veelgestelde vragen over virtuele IP-adressen {#virtual-ip-faq}

### Virtueel IP-adres en netwerken {#virtual-ip--networking}

Wat is een virtueel IP-adres en hoe verschilt het van een fysiek IP-adres?

Een **fysiek IP-adres** is gekoppeld aan een netwerkkaart. Een **virtueel IP-adres** is niet aan hardware gekoppeld. In een SafeKit-cluster gebruiken clients altijd het virtuele IP-adres. Als de primaire server uitvalt, wordt het virtuele IP-adres automatisch naar een gezonde node verplaatst. De configuratie van de clients hoeft niet te worden gewijzigd.

Heb ik een hardware-load balancer nodig om een virtueel IP-adres te gebruiken?

Nee. **SafeKit** beheert het virtuele IP-adres met software. In hetzelfde subnet gebruikt SafeKit **IP-aliasing** en **gratuitous ARP (GARP)** om het verkeer om te leiden. Een externe load balancer of proxyserver is niet nodig.

Wat is gratuitous ARP (GARP) en waarom wordt het gebruikt?

**Gratuitous ARP (GARP)** is een netwerkbericht dat naar alle apparaten wordt verzonden. Het werkt de ARP-tabellen van switches en routers bij. Bij een failover verzendt de nieuwe primaire server een GARP-bericht om aan te geven dat het **virtuele IP-adres** nu aan het MAC-adres van deze server is gekoppeld. Het verkeer wordt vervolgens onmiddellijk omgeleid.

Kan ik een DNS-naam aan een virtueel IP-adres koppelen?

**Ja.** Maak een standaard A-record aan voor het virtuele IP-adres. De omleiding gebeurt op het **niveau van het virtuele IP-adres** (via ARP of netwerkomleiding), **niet op DNS-niveau**. Er zijn geen DNS-vertragingen of TTL-problemen en de failover blijft **transparant voor de applicatie**.

### Cloud en geavanceerde architecturen {#cloud--advanced-architectures}

Hoe werkt een virtueel IP-adres in de cloud (AWS, Azure, GCP)?

In de cloud zijn Layer-2-GARP-berichten niet beschikbaar om een virtueel IP-adres om te leiden. SafeKit werkt met **cloud-load-balancers** (AWS ELB, Azure LB of Google GCLB). SafeKit biedt een **healthcheck-URL**. De load balancer vraagt deze op en stuurt verkeer naar de actieve node.

Is een uitgebreid LAN beter dan een load balancer voor disaster recovery?

**Ja.** Tussen externe datacenters is een **uitgebreid LAN (stretched VLAN)** vaak beter, omdat de failover **transparant blijft voor de applicatie**. Het **virtuele IP-adres verandert niet**, zodat de applicatie en clients na een failover tussen datacenters hetzelfde adres blijven gebruiken.

Wat zijn de beperkingen van DNS-omleiding ten opzichte van een virtueel IP-adres?

DNS-omleiding is afhankelijk van de **TTL (Time to Live)** en de DNS-cache van de client. Herstel kan uren duren. Bovendien blijven **clients die geen nieuwe DNS-lookup uitvoeren geblokkeerd** op de uitgevallen server. Een **virtueel IP-adres** wordt onmiddellijk omgeleid met GARP-berichten op laag 2. De DNS-cache van de client heeft geen invloed.

### Transparantie en beveiliging {#transparency--security}

Waarom is een lokaal virtueel IP-adres belangrijk voor applicatietransparantie?

Met een lokaal **virtueel IP-adres** gebruikt de applicatie een adres dat niet verandert. SafeKit voert de omleiding uit in de **kernel**, zodat de applicatie de failover niet merkt. Met DNAT verandert het adres dat door de applicatie wordt gebruikt.

Behoudt een virtueel IP-adres het oorspronkelijke IP-adres van de client?

Ja. SafeKit gebruikt geen source NAT (SNAT). Omdat het virtuele IP-adres lokaal op de actieve server is geconfigureerd, ontvangt de applicatie het **oorspronkelijke IP-adres van de client**. Dit is belangrijk voor beveiligingsaudits, sessiepersistentie en wettelijk verplichte logboeken.

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
