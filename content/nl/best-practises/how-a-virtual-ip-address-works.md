---
title: "Hoe werkt een virtueel IP-adres in een high-availability-cluster?"
canonical: "https://safekit.eviden.com/nl/best-practises/how-a-virtual-ip-address-works/"
description: "Hoe SafeKit een virtueel IP-adres verplaatst bij failover: gratuitous ARP in hetzelfde subnet, load balancer, cloud CLI of BGP over subnetten. Waarom een lokaal virtueel IP-adres belangrijk is."
category: "best-practises"
lang: "nl"
topics: "Wat is een virtueel IP-adres in een high-availabilitycluster?, Implementatie van virtuele IP in SafeKit, Hoe een virtueel IP werkt in hetzelfde subnet (mirror-cluster), Hoe een virtueel IP werkt in verschillende subnets met een load balancer (mirror-cluster), Hoe een virtueel IP werkt in verschillende subnets met cloudprovider-CLI's (mirror-cluster), Hoe een virtueel IP werkt in verschillende subnets met BGP (mirror-cluster), Hoe DNS-omleiding werkt in verschillende subnets (mirror-cluster), Hoe virtuele IP-loadbalancing werkt in een farm-cluster op hetzelfde subnet, Hoe een loadbalanced virtueel IP werkt in verschillende subnets (farm-cluster), Vergelijking: implementatie van virtuele IP, latentie en applicatietransparantie, Veelgestelde vragen over virtuele IP, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-05.9 | glossaire 2026-11-05.13 | Translation LLM | 14 expressions"
---

# Hoe werkt een virtueel IP-adres in een high-availability-cluster? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Wat is een virtueel IP-adres in een high-availabilitycluster? {#virtual-ip-definition}

Een **virtueel IP-adres** is het enige adres dat clients gebruiken om verbinding te maken met een toepassing in een [high-availability-cluster](</nl/>). Het virtuele IP-adres is niet gekoppeld aan één server. Bij een failover wordt het verplaatst naar de server die de toepassing uitvoert. Clients hoeven hun configuratie niet te wijzigen.

**Belangrijk principe in SafeKit:** het virtuele IP-adres wordt **lokaal geconfigureerd op de server** waarop de toepassing draait. De toepassing start op het virtuele IP-adres en ontvangt het oorspronkelijke IP-adres van de client. Daarom werken veel toepassingen correct met SafeKit zonder enige aanpassing. SafeKit biedt twee soorten virtuele IP-adressen:

  * **Primair/secundair virtueel IP met een mirror-cluster:** het virtuele IP is alleen actief op de primaire server. Bij een failover wordt het verplaatst naar de secundaire server.
  * **Netwerkloadbalancing virtueel IP met een <span class="notranslate farm-term" translate="no">farm</span>-cluster:** het virtuele IP is tegelijkertijd actief op alle servers. Het verkeer wordt tussen hen gedeeld.

## Implementatie van virtueel IP in SafeKit {#safekit-virtual-ip-implementation}

Dit artikel legt uit hoe SafeKit het virtuele IP-adres verplaatst in elke netwerkarchitectuur:

  * **Hetzelfde subnet of stretched VLAN ([mirror](#virtual-ip-same-subnet-failover) en [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet) clusters):** SafeKit configureert het virtuele IP op de server en verzendt een **gratuitous ARP (GARP)**. Er is geen externe hardware nodig. Dit is de meest transparante oplossing (alles wordt geïmplementeerd door het SafeKit-product).
  * **Verschillende subnets met een load balancer ([mirror](#virtual-ip-different-subnets-failover) en [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets) clusters):** de load balancer gebruikt de SafeKit- **healthcheck** om verkeer naar de juiste server te sturen (de load balancer wordt geconfigureerd door de integrator).
  * **[Verschillende subnets met cloudprovider-CLI's](#virtual-ip-cloud-cli-failover) (mirror-cluster):** het SafeKit `start_prim` script roept de cloud-CLI aan om de virtuele IP te verplaatsen (script geschreven door de integrator).
  * **[Verschillende subnets met BGP](#virtual-ip-bgp-failover) (mirror-cluster):** de primaire server kondigt het virtuele IP-adres aan de routers aan (script geschreven door de integrator).
  * **[Verschillende subnets met DNS-omleiding](#virtual-ip-vs-dns-redirection-failover) (mirror-cluster):** het SafeKit `start_prim` -script wijzigt het DNS-record van de virtuele naam naar het fysieke IP-adres van de nieuwe primaire server (script geschreven door de integrator). Er is geen enkel virtueel IP-adres en deze methode is niet betrouwbaar voor alle clients.

Ook in dit artikel:

  * [Vergelijking: implementatie van virtueel IP, latentie en applicatietransparantie](#virtual-ip-methods-comparison)
  * [Veelgestelde vragen over virtuele IP](#virtual-ip-faq)
  * [🔍 Ontdek SafeKit](#hub)

![Vergelijkingsdiagram van het gedrag van virtuele IP's in Eviden SafeKit: mirror-clusters met een zwevend IP-adres op de actieve node versus farm-clusters met netwerktaakverdeling over alle nodes.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementatie van virtueel IP voor mirror- en <span class="notranslate farm-term" translate="no">farm</span>-clusters in SafeKit.**

## Hoe een virtueel IP-adres werkt in hetzelfde subnet (mirror-cluster) {#virtual-ip-same-subnet-failover}

- [Het primaire/secundaire virtuele IP-adres testen in een SafeKit mirror-cluster](/nl/best-practises/test-primary-backup-vip-mirror/)

### Automatische failover en netwerkomleiding in een lokaal subnet {#automated-failover--network-rerouting-in-a-local-subnet}

In een lokaal netwerk beheert **SafeKit** automatisch de virtuele IP en de failover van de applicatie.

### Lokaal mirror-cluster: failover met 2 knooppunten op Windows of Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit virtueel IP-failovermechanisme tussen twee servers in hetzelfde subnet](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In een **SafeKit mirror-cluster** bevinden de twee knooppunten zich in hetzelfde subnet. Hoge beschikbaarheid maakt gebruik van een **virtueel IP-adres**. SafeKit beheert het virtuele IP-adres in de netwerkstack van het besturingssysteem. Er is geen speciale hardware vereist. Het virtuele IP-adres wordt toegevoegd aan de fysieke IP-adressen van Server 1 en Server 2 met **IP-aliasing**. Clients maken altijd verbinding met het virtuele IP-adres.

#### IP-aliasing en meerdere virtuele IP's in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

Het virtuele IP-adres is een derde IP-adres dat tussen de knooppunten beweegt. SafeKit kan **meerdere virtuele IP-adressen** in één cluster beheren. U kunt ze op dezelfde netwerkkaart of op verschillende netwerkkaarten plaatsen. Op deze manier kan elke service zijn eigen virtuele IP-adres gebruiken.

#### Het failovermechanisme: gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Failover vereist geen handmatige actie. Bij normaal gebruik is het virtuele IP-adres gekoppeld aan het **MAC-adres van Server 1 (mac1)**. Als Server 1 uitvalt, doet SafeKit drie dingen:

  * **Virtueel IP-aliassen:** SafeKit configureert het virtuele IP als een alias op de netwerkkaart van Server 2, de nieuwe primaire server. Het besturingssysteem stuurt vervolgens berichten op het netwerk om het virtuele IP aan te kondigen.
  * **GARP:** SafeKit verzendt ook **gratuitous ARP berichten (GARP)**. Netwerkswitches en clients werken hun ARP-cache bij. Het virtuele IP-adres is nu gekoppeld aan het **MAC-adres van Server 2 (mac2)**.
  * **Applicatieherstel:** SafeKit start de applicatiediensten opnieuw op Server 2.


#### Externe datacenters en stretched VLAN's {#remote-data-centers--extended-vlans}

De **hierboven beschreven oplossing met hetzelfde subnet** werkt ook voor **noodherstel** tussen externe locaties. Het is vaak de beste keuze wanneer de locaties zijn verbonden via een **stretched VLAN** (uitgebreid LAN). Beide locaties bevinden zich in één subnet. Het netwerk is eenvoudiger en u hebt geen complexe routeringsprotocollen nodig.

> **⚠️ Opmerking:** Omleiden op laag 2 met gratuitous ARP is de **meest transparante oplossing** voor applicaties. De applicatie ontvangt het oorspronkelijke client-IP en het virtuele IP wordt lokaal geconfigureerd. Veel applicaties **hebben een lokaal virtueel IP nodig**. Zonder dit IP **werken deze applicaties mogelijk niet correct**. In deze configuratie met hetzelfde subnet implementeert SafeKit het volledige mechanisme, dus er is geen speciale integratiewerkzaamheid vereist.

## Hoe een virtueel IP-adres werkt over verschillende subnets met een load balancer (mirror-cluster) {#virtual-ip-different-subnets-failover}

### Load balancer met SafeKit-healthchecks {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagram van een virtuele IP-failover met een load balancer over twee verschillende subnets](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Wanneer de knooppunten zich in **verschillende subnets** bevinden, kan gratuitous ARP het virtuele IP niet verplaatsen. In dit geval bevindt het virtuele IP zich op een **load balancer**. De load balancer stuurt verkeer naar de primaire server.

SafeKit biedt een **URL voor een gezondheidscontrole** op elke node:

  * **Primair (PRIM):** retourneert `HTTP 200 OK`. De load balancer stuurt verkeer naar dit knooppunt.
  * **Secundair (SECOND):** retourneert `HTTP 404 NOT FOUND`. De load balancer stuurt geen verkeer naar dit knooppunt.

Bij een failover wijzigt SafeKit de responsen en stuurt de load balancer het verkeer naar de nieuwe primaire server. Dit is de standaardoplossing tussen **beschikbaarheidszones** op [**AWS**](</nl/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</nl/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) en [**Google Cloud**](</nl/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Opmerking:** SafeKit verzorgt de gezondheidscontrole. Uw netwerk of uw cloudprovider levert de load balancer.

### Het probleem: de load balancer is eigenaar van het virtuele IP-adres. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Met alleen een load balancer maken clients verbinding met het virtuele IP-adres. De load balancer vertaalt het virtuele IP-adres (NAT) naar het **fysieke IP-adres** van de primaire server. De client gebruikt het virtuele IP-adres, maar de server gebruikt zijn fysieke IP-adres. De server ziet het virtuele IP-adres niet.

### Houd het virtuele IP-adres lokaal geconfigureerd op de primaire server. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Sommige toepassingen gebruiken het virtuele IP-adres als serveradres. Ze werken alleen correct als het virtuele IP-adres ook **lokaal op de primaire server is geconfigureerd**. Dan:

  * de services kunnen starten op het virtuele IP-adres;
  * de server kan zijn eigen services bereiken met het virtuele IP-adres;
  * Authenticatie werkt met het virtuele IP-adres.

**Best practice:** Gebruik een load balancer modus die het virtuele IP-adres als bestemmingsadres behoudt (bijvoorbeeld Floating IP of Direct Server Return). Configureer vervolgens het virtuele IP-adres lokaal op de primaire server. De methode is afhankelijk van het subnet van het virtuele IP-adres:

  * **Het virtuele IP-adres bevindt zich in hetzelfde subnet als de fysieke IP-adressen van de servers:** houd de sectie `<vip>` in de SafeKit-module. SafeKit configureert het virtuele IP-adres automatisch als een alias op de netwerkkaart van het fysieke IP-adres.
  * **Het virtuele IP-adres bevindt zich in een ander subnet:** configureer het virtuele IP-adres als een **eenzijdige alias** in de sectie `<vip>` van de SafeKit-module (`where="one_side_alias"`). SafeKit voegt het virtuele IP-adres alleen als een lokale alias toe op de primaire server. Het onderstaande voorbeeld toont deze configuratie op Azure.
  * **Andere optie voor een ander subnet:** gebruik het `start_prim` script om de virtuele IP-configuratie op een speciale interface, zoals loopback, te configureren voordat de applicatie start. Gebruik het `stop_prim` script om de virtuele IP-configuratie te verwijderen nadat de applicatie is gestopt. De integrator schrijft deze commando's. Ze worden niet geleverd door het SafeKit-product.

### Voorbeeld: Azure load balancer met een lokaal virtueel IP-adres (Milestone XProtect) {#azure-load-balancer-local-virtual-ip-example}

Deze architectuur wordt in productie gebruikt op Azure voor de **Milestone XProtect-beheerserver**, met de SafeKit `videoos` module. De twee knooppunten bevinden zich in één subnet. Het virtuele IP-adres is het frontend-IP-adres van de load balancer. Dit frontend-IP-adres bevindt zich in een speciaal subnet.

**Aan de Azure-kant** (geconfigureerd door het infrastructuurteam):

  1. Maak een **laag 4- load balancer** met een frontend-IP in een speciaal subnet.
  2. Voeg de twee SafeKit-knooppunten toe aan de **backend-pool** van de load balancer.
  3. Voeg een **health probe** toe op de SafeKit health check URL van de module: pad `/var/modules/videoos/ready.txt`, poort `9010` (HTTP) of poort `9453` (HTTPS met geldige certificaten). Vervang voor een andere module `videoos` door de naam van de module.
  4. Voeg **regels voor taakverdeling** toe voor alle poorten die clients gebruiken op het virtuele IP-adres: de poorten van de beheerserver en de poorten van de andere services.

**Aan de SafeKit-zijde:** vervang in het bestand `userconfig.xml` van de module (`videoos/conf/userconfig.xml`) de standaard `<vip>` -sectie door deze sectie:

```xml
<vip>
  <interface_list>
    <interface check="on" arpreroute="on" name="VM_INTERFACE_NAME">
      <real_interface>
        <virtual_addr addr="LB_FRONTEND_IP" netmask="LB_FRONTEND_NETMASK" where="one_side_alias" />
      </real_interface>
    </interface>
  </interface_list>
</vip>
```

Vervang `VM_INTERFACE_NAME` door de naam van de netwerkinterface van de VM, `LB_FRONTEND_IP` door het frontend-IP van de load balancer en `LB_FRONTEND_NETMASK` door de netmasker van het frontend-subnet. De netwerkinterface moet op beide knooppunten dezelfde naam hebben.

**Aan de applicatiezijde:** configureer alle Milestone-services om het virtuele IP-adres te gebruiken, niet het privé-IP-adres van de server.

> **⚠️ Opmerking:** Gebruik een frontend-subnet dat **niet overlapt** met het subnet van de VM's. Bijvoorbeeld VM's in `10.0.1.0/24` en frontend-IP load balancer in `10.0.2.0/24`. SafeKit voegt het frontend-IP met zijn netmasker toe aan de netwerkinterface van de VM. Als de twee subnets overlappen, verandert dit alias de routering van de VM en kan het netwerkverkeer van de VM's mislukken.


## Hoe een virtueel IP-adres werkt in verschillende subnets met cloudprovider-CLI's (mirror-cluster) {#virtual-ip-cloud-cli-failover}

### Waarom gratuitous ARP niet werkt in de cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Cloudnetwerken (AWS, Azure, Google Cloud) **negeren gratuitous ARP**. Ze sturen verkeer alleen naar IP-adressen die zijn toegewezen in het cloudplatform. SafeKit configureert het virtuele IP op de primaire server, maar het cloudnetwerk stuurt het virtuele IP-verkeer niet naar deze server.

### Het virtuele IP-adres verplaatsen met de cloud-CLI {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Zonder een load balancer kan de CLI van de cloudprovider worden geïntegreerd in het SafeKit **`start_prim` script** om de cloudnetwerkconfiguratie bij te werken voordat de toepassing wordt gestart. De CLI kan het virtuele IP-adres toewijzen aan de node die primair wordt of de cloudroute bijwerken om virtueel IP-verkeer naar die node te leiden.

Het **virtuele IP-adres blijft lokaal** op de primaire server. Er is **geen NAT** en het oorspronkelijke IP-adres van de client verandert niet.

### Verantwoordelijkheid van de integrator {#integrator-responsibility}

De **integrator** moet de cloud-CLI-opdrachten toevoegen aan het `start_prim` script. Deze opdrachten worden **niet geleverd door het SafeKit-product**. Ze zijn afhankelijk van de cloudprovider, het netwerkontwerp en de beveiligingsregels van de klant.

### Beperkingen {#constraints-of-the-cli-approach}

  * De cloud-CLI moet op beide knooppunten zijn geïnstalleerd. Elk knooppunt heeft een cloudidentiteit met netwerkrechten nodig.
  * Het script moet fouten en herpogingen beheren.
  * Failover is **veel trager** dan met een load balancer en een health probe, omdat elke failover wacht op de respons van de cloud-API.
  * Er is geen referentie-implementatie van deze architectuur in productie. Valideer deze in een testomgeving vóór productie. Geef de voorkeur aan de hierboven beschreven load balancer -architectuur wanneer een load balancer beschikbaar is.

## Hoe een virtueel IP-adres werkt over verschillende subnets met BGP (mirror-cluster) {#virtual-ip-bgp-failover}

### Virtuele IP-omleiding met BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Met BGP (Border Gateway Protocol) wordt de virtuele IP doorgaans geconfigureerd op een loopback interface van de primaire server door het `start_prim` script voordat de toepassing wordt gestart. De primaire server kondigt de virtuele IP aan de routers aan als een /32-route.

Bij een failover stopt het `stop_prim` script op de oude primaire server de toepassing, verwijdert het virtuele IP-adres van de loopback interface en trekt de /32-route in bij de routers. Als de oude primaire server crasht, wordt `stop_prim` niet uitgevoerd, maar verliezen de routers de BGP-sessie en verwijderen ze de route automatisch.

### Voordelen en vereisten {#benefits-and-prerequisites}

  * **Het virtuele IP-adres blijft lokaal, er is geen NAT en het IP-adres van de client verandert niet.**
  * Het werkt over subnets en sites heen. U hebt geen ' stretched VLAN nodig.
  * U hebt BGP-routers en hulp van uw netwerkteam nodig. In de cloud hebt u een route-serverdienst van de cloudprovider nodig.

> **⚠️ Opmerking:** BGP-integratie maakt gebruik van SafeKit-scripts en uw routeringsinfrastructuur. De **integrator** moet de commando's schrijven in `start_prim` en `stop_prim` -scripts. Deze scripts worden **niet geleverd bij het SafeKit-product**. Valideer de oplossing met uw netwerkteam vóór de productie.

## Hoe DNS-omleiding werkt tussen verschillende subnets (mirror-cluster) {#virtual-ip-vs-dns-redirection-failover}

### DNS-omleiding met het `start_prim` -script {#dns-rerouting-with-the-start-prim-script}

Bij DNS-omleiding is er **geen enkel virtueel IP-adres**. Clients maken verbinding met een **virtuele naam** (de DNS-naam). Bij failover start het `start_prim` script op de nieuwe primaire server de toepassing en wijzigt vervolgens het DNS-record van de virtuele naam naar het **fysieke IP-adres** van de nieuwe primaire server.

Het `stop_prim` script hoeft niets te doen. Als de oude primaire server crasht, overschrijft de nieuwe primaire server het DNS-record.

### Voorbeeld: DNS-resolutie en clients die het oude IP-adres behouden {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagram dat de DNS-naamresolutie naar fysiek IP 1 in een high-availabilitycluster weergeeft](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS-resolutie: clients blijven verbonden met fysiek IP 1 in een high-availability-cluster

#### Voor failover: de naam verwijst naar fysiek IP 1 {#current-state-resolution-to-physical-ip-1}

**Klant 1** en **klant 2** vragen het DNS-systeem om het IP-adres van de virtuele naam. Het DNS-systeem retourneert **fysiek IP 1.** De clients openen vervolgens een netwerkverbinding naar dit adres.

#### Na failover: de naam verwijst naar fysiek IP 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Server 1 faalt. Het `start_prim` script op server 2 wijzigt het DNS-record naar **fysiek IP 2.** De clients maken alleen verbinding met fysiek IP 2 als aan al deze voorwaarden is voldaan:

  * De **TTL (Time to Live)** is verlopen op alle DNS-servers tussen de client en het DNS-record.
  * De lokale DNS-cache van Client 1 en Client 2 is leeg.
  * De toepassing sluit de verbinding en voert een *nieuwe* DNS-opzoeking uit.

Als één voorwaarde onwaar is, blijven **Client 1 en Client 2** fysiek IP 1 gebruiken. De service is uitgeschakeld, zelfs als het DNS-record correct is.

### Beperkingen en vereisten {#the-two-black-boxes-of-dns-redirection}

  * **DNS-cache:** Veel internetproviders en DNS-servers van bedrijven negeren korte TTL-waarden. Ze kunnen het oude fysieke IP 1 minuten of uren lang aanhouden.
  * **Applicatiegedrag:** Veel applicaties (bijvoorbeeld Java-services of webbrowsers) voeren slechts één keer een DNS-opzoeking uit, wanneer ze starten. Ze blijven het eerste IP-adres gebruiken.
  * **Het IP-adres verandert bij elke failover:** de toepassing heeft geen lokaal virtueel IP-adres dat hetzelfde blijft. Toepassingen die hun eigen IP-adres registreren, werken mogelijk niet.
  * **Vereisten:** een korte TTL op het DNS-record (bijvoorbeeld 30 tot 60 seconden) en rechten om de DNS-zone vanaf beide servers bij te werken.

> **⚠️ Opmerking:** De **integrator** moet de DNS-updatecommando's schrijven in het `start_prim` -script. Deze commando's worden **niet geleverd door het SafeKit-product**. Ze zijn afhankelijk van de DNS-server (Windows DNS, BIND of cloud-DNS).

### Conclusie {#conclusion}

DNS-omleiding is geen betrouwbare oplossing voor hoge beschikbaarheid. Gebruik het alleen als alle clients een nieuwe DNS-opzoeking doen wanneer ze opnieuw verbinding maken. Voor onmiddellijke en transparante failover gebruikt u een **virtueel IP**: met een stretched VLAN, met een load balancer, met cloudprovider-CLI's of met BGP.

## Hoe virtuele IP-loadbalancing werkt in een <span class="notranslate farm-term" translate="no">farm</span>-cluster op hetzelfde subnet {#virtual-ip-load-balancing-same-subnet}

- [Het virtuele IP-adres voor taakverdeling testen in een SafeKit farm-cluster](/nl/best-practises/test-load-balancing-vip-farm/)

### Loadbalancing en redundantie op kernniveau {#scalable-performance-kernel-level-load-balancing--redundancy}

Wanneer er veel verkeer is, kan SafeKit de werklast verdelen over meerdere actieve servers. Als één server uitvalt, blijven de andere servers werken.

### <span class="notranslate farm-term" translate="no">Farm</span>-clusterarchitectuur: taakverdeling tussen Windows- of Linux-knooppunten {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagram van een virtueel IP-adres met taakverdeling binnen hetzelfde subnet](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In een **load balancing <span class="notranslate farm-term" translate="no">farm</span>-cluster** maken clients verbinding met een virtueel IP-adres en worden de aanvragen tegelijkertijd gedeeld tussen verschillende servers. Dit voorbeeld toont twee knooppunten. U kunt meer knooppunten aan het cluster toevoegen. In hetzelfde subnet wordt het virtuele IP-adres geconfigureerd met IP-aliasing op de netwerkkaart van **elke server** in het cluster.

#### Verkeersdeling: het kernelfilter {#traffic-distribution-the-kernel-level-filter}

In een <span class="notranslate farm-term" translate="no">farm</span>-cluster deelt een SafeKit- **filter in de kernel** het verkeer. Het werkt als volgt:

  * **ARP-mapping:** In de ARP-cache van de clients is het virtuele IP gekoppeld aan één MAC-adres (bijvoorbeeld `mac1` van Server 1).
  * **Pakketanalyse:** Server 1 ontvangt de pakketten. Het SafeKit-kernelfilter leest het **IP-adres van de client** of de **TCP-poort** van elk pakket.
  * **Taakverdeling:** Het filter bepaalt welke pakketten Server 1 verwerkt en welke pakketten naar de andere knooppunten gaan (bijvoorbeeld Server 2). Om een pakket naar een ander knooppunt te verzenden, herschrijft het filter het **MAC-adres van de bestemming** van het pakket met het MAC-adres van dit knooppunt. Het IP-adres van de bestemming blijft het virtuele IP-adres. De werkzaamheden worden gedeeld tussen de servers.


#### Failover en omleiding met gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Als Server 1 uitvalt, stuurt SafeKit een **gratuitous ARP bericht (GARP)**. De clients werken hun ARP-cache bij met `mac2` van Server 2. De clients worden dan onmiddellijk naar de andere nodes van de farm gestuurd.

#### Implementatie op afgelegen locaties {#deployment-in-remote-sites}

Deze load balancing-oplossing werkt ook tussen **externe datacenters**, als de sites zijn verbonden via een **stretched VLAN**. Alle sites bevinden zich dan in hetzelfde subnet. Dit is de meest efficiënte configuratie voor <span class="notranslate farm-term" translate="no">farm</span>-clusters op meerdere sites.

{{%  insert-safekit-farm-video-nl  %}}

## Hoe een virtueel IP-adres met taakverdeling werkt over verschillende subnets (<span class="notranslate farm-term" translate="no">farm</span>-cluster) {#virtual-ip-load-balancing-different-subnets}

### Verkeer via cloud-subnets {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Een <span class="notranslate farm-term" translate="no">farm</span>-cluster kan de applicatieworkload verdelen over meerdere beschikbaarheidszones en subnetten.

### <span class="notranslate farm-term" translate="no">Farm</span>-clusters met meerdere subnetten: verschillende Windows- of Linux-knooppunten {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagram van een load-balanced farm-cluster dat over twee verschillende subnets werkt](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Wanneer de <span class="notranslate farm-term" translate="no">farm</span> knooppunten zich in **verschillende subnets** bevinden (bijvoorbeeld in verschillende cloud-beschikbaarheidszones), bevindt de **virtuele IP** zich op een externe **load balancer**. De load balancer stuurt het verkeer naar de fysieke IP-adressen van de servers in elk subnet.

#### Regels voor verkeersroutering en taakverdeling {#intelligent-traffic-routing--load-balancing-rules}

De load balancer verdeelt de clientverzoeken op basis van twee criteria:

  * **Regels voor taakverdeling:** bijvoorbeeld het **IP-adres van de client** of de **TCP-poort van de client**.
  * **Beschikbaarheid van knooppunten:** de load balancer stuurt verkeer alleen naar de knooppunten die in orde zijn, op basis van de SafeKit-gezondheidscontrole.


> **⚠️ Opmerking:** SafeKit verzorgt de gezondheidscontrole. Uw netwerk of uw cloudprovider levert de load balancer.

#### SafeKit-gezondheidscontrole {#safekit-health-check-mechanism}

SafeKit biedt een **URL voor een gezondheidscontrole** op elke server van de <span class="notranslate farm-term" translate="no">farm</span>. De load balancer leest deze om de status van elke server te kennen:

  * **Node UP:** de gezondheidscontrole retourneert `HTTP 200 OK`. De load balancer stuurt verkeer naar deze server.
  * **Knooppunt DOWN:** als een server of een toepassing uitvalt, geeft SafeKit `HTTP 404 NOT FOUND` terug (of de server reageert niet). De load balancer stopt onmiddellijk met het verzenden van verkeer naar dit knooppunt.


#### Cloudimplementatie: AWS, Azure en GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Dit is de standaardarchitectuur voor **<span class="notranslate farm-term" translate="no">farm</span>-clusters in de cloud**. Als een subnet of een zone stopt, blijven de andere knooppunten het verkeer verwerken. Het wordt ondersteund op [**Amazon AWS**](</nl/solutions/aws-load-balancing-cluster-failover/>) (AWS Network load balancer), [**Microsoft Azure**](</nl/solutions/azure-load-balancing-cluster-failover/>) (Azure load balancer) en [**Google Cloud (GCP)**](</nl/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Vergelijking: implementatie van virtueel IP, latentie en applicatietransparantie {#virtual-ip-methods-comparison}

**Vergelijking van methoden voor virtuele IP-omleiding en DNS-omleiding voor hoge beschikbaarheid en herstel na noodgevallen.**

Omgeving en gebruiksscenario | Type met hoge beschikbaarheid | Omleidingsmethode | Uitgevoerd door | Netwerklatentie | Applicatietransparantie en lokaal IP-adres  
---|---|---|---|---|---  
Primair/secundair (hoge beschikbaarheid) | Mirror-cluster | Gratuitous ARP (MAC-adresovername) | ✅ SafeKit-product | Zeer laag: tijd om de storing te detecteren en de GARP te verzenden | Volledige transparantie: het virtuele IP-adres bevindt zich lokaal op de actieve node. Het IP-adres van de client verandert niet.  
Load balancing (actief/actief) | <span class="notranslate farm-term" translate="no">Farm</span>-cluster | Netwerkfilter van de kernel / GARP | ✅ SafeKit-product | Zeer laag: tijd om de storing te detecteren en de netwerkfilters te vervangen | Volledige transparantie: het virtuele IP-adres is lokaal op alle knooppunten. Het IP-adres van de client verandert niet.  
Hetzelfde subnet / stretched VLAN | Herstel na noodgevallen (externe datacenters) | IP-aliasing / GARP | ✅ SafeKit-product (het stretched VLAN wordt geleverd door het netwerkteam) | Laag: afhankelijk van de round-trip time (RTT) van het stretched VLAN | Volledige transparantie: het virtuele IP-adres bevindt zich lokaal op de nodes. Het IP-adres van de client verandert niet.  
Verschillende subnets: alleen load balancer | Herstel na noodgevallen (externe datacenters / cloud) | Externe load balancer | 🛠️ Integrator: configuratie load balancer (SafeKit verzorgt de health check) | Medium: afhankelijk van het interval van de gezondheidscontrole van de load balancer | ⚠️ Gedeeltelijke transparantie als SNAT/DNAT wordt gebruikt. Het virtuele IP-adres is **NIET** lokaal op de knooppunten. Het IP-adres van de client kan **NIET** worden behouden. De toepassing moet dit ondersteunen.  
Verschillende subnets: load balancer + lokaal SafeKit virtueel IP | Herstel na noodgevallen (externe datacenters / cloud) | Externe load balancer met Floating IP / Direct Server Return, of frontend-IP als een lokaal SafeKit-alias | 🛠️ Integrator: configuratie load balancer (SafeKit verzorgt de health check) | Medium: afhankelijk van het interval van de gezondheidscontrole van de load balancer | Goede transparantie: het virtuele IP-adres bevindt zich lokaal op de primaire node en is het bestemmingsadres.
Verschillende subnetten: cloud-CLI | Herstel na noodgevallen (cloud) | Cloud-API: het privé-IP-adres of een cloudroute wordt verplaatst naar het nieuwe primaire knooppunt | 🛠️ Integrator: cloud-CLI-commando's in het `start_prim` script | Gemiddeld tot hoog: afhankelijk van de responstijd van de cloud-API | Volledige transparantie: het virtuele IP-adres bevindt zich lokaal op de primaire node. Het IP-adres van de client verandert niet.
Verschillende subnets: BGP | Herstel na noodgevallen (externe datacenters / cloud) | /32-route aangekondigd met BGP | 🛠️ Integrator: BGP-commando's in de `start_prim` en `stop_prim` -scripts | Laag tot gemiddeld: afhankelijk van de BGP-convergentietijd | Volledige transparantie: het virtuele IP-adres bevindt zich lokaal op de primaire node. Het IP-adres van de client verandert niet. Vereist BGP-routers.  
DNS-omleiding: geen virtueel IP-adres | Herstel na noodgevallen (externe datacenters) | DNS-record wijzigen (naam / fysiek IP-adres) | 🛠️ Integrator: DNS-updatecommando's in het `start_prim` script | Hoog en niet voorspelbaar: afhankelijk van de DNS TTL (Time To Live) en de DNS-cache van de client. | ⚠️ Niet betrouwbaar: de client moet een nieuwe DNS-opzoeking uitvoeren. Vaak behouden clients het oude IP-adres dat ze bij het opstarten hebben ontvangen en worden ze na een failover niet omgeleid.  
  
## Veelgestelde vragen over virtuele IP {#virtual-ip-faq}

### Virtueel IP en netwerken {#virtual-ip--networking}

Wat is een virtueel IP-adres en waarin verschilt het van een fysiek IP-adres?

Een **fysiek IP-adres** is gekoppeld aan één netwerkkaart. Een **virtueel IP-adres** is niet gekoppeld aan hardware. In een SafeKit-cluster gebruiken clients altijd het virtuele IP-adres. Als de primaire server uitvalt, verplaatst het virtuele IP-adres zich automatisch naar een gezonde node. U hoeft de clientconfiguratie niet te wijzigen.

Heb ik een hardware load balancer nodig om een virtueel IP-adres te gebruiken?

Nee. **SafeKit** beheert het virtuele IP-adres met software. In hetzelfde subnet gebruikt het **IP-aliasing** en **gratuitous ARP (GARP)** om het verkeer om te leiden. U hebt geen externe load balancer of proxyserver nodig.

Wat is gratuitous ARP (GARP) en waarom wordt het gebruikt?

**Gratuitous ARP (GARP)** is een netwerkbericht dat naar alle apparaten wordt verzonden. Het werkt de ARP-tabellen van switches en routers bij. Bij een failover verzendt de nieuwe primaire server een GARP bericht. Het bericht geeft aan dat het **virtuele IP-adres** nu is gekoppeld aan het MAC-adres van de nieuwe primaire server. Het verkeer wordt dan onmiddellijk omgeleid.

Kan ik een DNS-naam koppelen aan een virtueel IP-adres?

**Ja.** Maak een standaard A-record aan voor het virtuele IP-adres. Omleiding gebeurt op het **niveau van het virtuele IP-adres** (met ARP of netwerkomleiding), **niet op het DNS-niveau**. U hebt geen DNS-vertragingen of TTL-problemen, en de failover blijft **transparant voor de toepassing**.

### Cloud en geavanceerde architecturen {#cloud--advanced-architectures}

Hoe werkt een virtueel IP-adres in de cloud (AWS, Azure, GCP)?

In de cloud zijn Layer 2 GARP -berichten niet beschikbaar voor het omleiden van een virtueel IP-adres. SafeKit werkt met **cloud load balancers** (AWS Elastic Load Balancing, Azure load balancer of Google Cloud Load Balancing). SafeKit biedt een **health check-URL**. De load balancer leest deze en stuurt het verkeer naar de actieve node.

Is een stretched VLAN beter dan een load balancer voor disaster recovery?

**Ja**. Tussen externe datacenters is een **stretched VLAN** vaak beter, omdat de failover **transparant blijft voor de toepassing**. Het **virtuele IP-adres verandert niet**, dus de toepassing en haar clients blijven hetzelfde adres gebruiken na een failover tussen datacenters.

Wat zijn de beperkingen van DNS-omleiding in vergelijking met een virtueel IP-adres?

**DNS-omleiding** is afhankelijk van de **TTL (Time to Live)** en van de DNS-cache van de client. Herstel kan uren duren. Bovendien blijven **clients die geen nieuwe DNS-opzoeking doen** de mislukte server gebruiken. Een **virtueel IP** wordt onmiddellijk omgeleid met GARP berichten op laag 2. De DNS-cache van de client heeft geen effect.

### Transparantie en veiligheid {#transparency--security}

Waarom is een lokaal virtueel IP-adres belangrijk voor applicatietransparantie?

Met een lokaal **virtueel IP-adres** gebruikt de toepassing een adres dat niet verandert. SafeKit doet de omleiding in de **kernel**. De toepassing ziet de failover niet. Met DNAT verandert het adres dat door de toepassing wordt gebruikt.

Behoudt een virtueel IP-adres het oorspronkelijke IP-adres van de client?

Ja. SafeKit maakt geen gebruik van source NAT (SNAT). Het virtuele IP-adres is lokaal op de actieve server, dus de applicatie ontvangt het **oorspronkelijke IP-adres van de client**. Dit is belangrijk voor beveiligingsaudits, sessiepersistentie en wettelijke logboeken.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
