---
title: "Kubernetes K3s Hoge beschikbaarheid: synchrone replicatie en failover met 2 knooppunten"
canonical: "https://safekit.eviden.com/nl/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Bereik hoge beschikbaarheid van K3s op 2 knooppunten zonder externe opslag of etcd-quorum. Ontdek hoe SafeKit zorgt voor replicatie zonder gegevensverlies en automatische failover."
category: "solutions"
lang: "nl"
topics: "K3s HA vereenvoudigen: Waarom kiezen voor SafeKit in plaats van MetalLB en Longhorn?, Inhoudsopgave, Hoe implementeert de SafeKit -software eenvoudig een Kubernetes K3s high availability-cluster?, Hoe werkt het SafeKit mirror cluster met Kubernetes K3S?, Beperkingen SafeKit high availability, Vergelijking: SafeKit versus standaard K3s-stack (MetalLB & Longhorn), Videohandleiding: Een SafeKit HA mirror -cluster configureren, 🔍 SafeKit High Availability-navigatiehub"
---

# Kubernetes K3s Hoge Beschikbaarheid: Synchrone Replicatie en Failover met 2 Knooppunten {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## K3s HA vereenvoudigen: Waarom kiezen voor SafeKit in plaats van MetalLB en Longhorn? {#safekit-k3s-ha-introduction}

Hoewel de standaard open-source stack (MetalLB + Longhorn) voor K3s krachtig is voor grote datacenters, introduceert deze een te grote complexiteit voor on-premises locaties met twee nodes. **SafeKit** vereenvoudigt de K3s-omgeving door losstaande netwerk- en opslagtools te vervangen door één geconsolideerde HA-engine. 

### Waarom SafeKit gebruiken voor 2-knoops K3s High Availability (HA)? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **Echte hoge beschikbaarheid met 2 knooppunten:** SafeKit biedt volledige redundantie met slechts **knooppunten,** de vereiste van 3 knooppunten voor het _etcd_-quorum vervalt.
  * **Nul gegevensverlies (RPO=0):** Vervangt blokopslag met hoge overhead door **Synchrone replicatie op byte-niveau** voor lokale SSD-prestaties.
  * **Flexibele bescherming op bestandsniveau:** SafeKit voert replicatie op hostniveau uit op bestandsniveau, wat volledig transparant is voor de applicatie. Het beschermt niet alleen databases, maar ook alle bijbehorende mappen en gegevens. U kunt bestaande mappen repliceren op exact dezelfde locatie als waar ze zijn geïnstalleerd, zelfs op de **systeemdisk** .
  * **Geïntegreerd virtueel IP (VIP):** beheert het cluster-IP-adres op kernelniveau, waardoor aparte **MetalLB** -configuraties overbodig zijn.
  * **Automatische failover en failback:** activeert een onmiddellijke overgang naar het secundaire knooppunt bij een storing; zodra het primaire knooppunt weer functioneert, voert SafeKit **automatische gegevensresynchronisatie** uit zonder handmatige tussenkomst.
  * **Ultralage overhead:** SafeKit werkt zonder de zware beheerkosten van opslagpods (CSI/Longhorn) en netwerkpods (CNI/MetalLB) die standaard stacks vereisen, waardoor cruciaal RAM-geheugen en CPU-capaciteit vrijkomen voor uw applicaties.
  * **IT Generalist Friendly:** Vervangt complexe **infrastructuur YAML** voor netwerken en opslag door een **eenvoudige web-GUI** en geautomatiseerde implementatiescripts, zodat u zich volledig kunt concentreren op uw applicaties.


Architectuurdiagram ![ SafeKit voor een K3s-architectuur met 2 knooppunten en hoge beschikbaarheid, inclusief geïntegreerd virtueel IP, realtime replicatie en automatische failover. ](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **Shared-nothing high availability (HA) voor 2-knoops K3s-clusters**  


<a class="btn-quick-install" href="/nl/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Snelle installatiehandleiding voor een HA-cluster Kubernetes > </a>
## Inhoudsopgave {#toc}

  * [ Hoe implementeert de SafeKit -software eenvoudig een Kubernetes K3s-cluster met hoge beschikbaarheid? ](#safekit-mirror-k3s-cluster)
  * [ Hoe werkt het SafeKit mirror cluster samen met Kubernetes K3S? ](#safekit-mirror-cluster)
  * [ SafeKit Beperkingen voor hoge beschikbaarheid ](#safekit-ha-limitations)
  * [ Vergelijking: SafeKit versus standaard K3s-stack (MetalLB & Longhorn) ](#safekit-k3s-ha-comparison)
  * Videohandleiding [ : Een HA-cluster configureren SafeKit Mirror ](#videoguide-safekit-mirror-cluster)
  * [ 🔍 SafeKit Navigatiehub met hoge beschikbaarheid ](#hub)


## Hoe implementeert de SafeKit -software eenvoudig een Kubernetes K3s high availability-cluster? {#safekit-mirror-k3s-cluster}

### Hoe implementeer ik hoge beschikbaarheid voor een K3S-cluster met 2 knooppunten Kubernetes )? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

U kunt hoge beschikbaarheid (HA) implementeren voor een 2-knoops Kubernetes K3s-cluster met behulp van de **SafeKit k3s.safe mirror module** . Deze oplossing stelt u in staat een redundante omgeving te implementeren zonder dat u externe NFS-opslag, een speciale externe configuratiedatabase of specialistische Kubernetes -expertise nodig hebt.

### Waarom K3s gebruiken voor Edge- en IoT-computing? {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>) is de Kubernetes voor **IoT- en Edge-computing** omdat het een lichtgewicht, gecertificeerde distributie is die is ontworpen voor omgevingen met beperkte resources. Het vereenvoudigt de operationele overhead van de standaard Kubernetes met behoud van volledige compatibiliteit.

### Wat zijn de belangrijkste kenmerken van de k3s.safe mirror -module? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

De k3s.safe -module biedt een complete HA-stack voor K3's door de volgende implementatie:

  * **Dubbele actieve knooppunten:** Draait gelijktijdig 2 actieve K3s masters/agents om pods te hosten.
  * **Database Replicatie:** Realtime replicatie van de MariaDB configuratiedatabase tussen knooppunten.
  * **Permanente opslag:** Replicatie van permanente volumes via een geïntegreerde NFS-client dynamische provisioner (nfs-client).
  * **Netwerkcontinuïteit:** Bevat een virtueel IP-adres voor naadloze clienttoegang.
  * **Geautomatiseerd herstel:** Volledige ondersteuning voor automatische failover en failback.


### Naast K3's, welke applicaties en omgevingen kan SafeKit beschermen? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit is een veelzijdige oplossing voor hoge beschikbaarheid **voor zowel Windows als Linux ,** die veel verder reikt dan het mirror -cluster van K3s. Het maakt **synchrone realtime replicatie** en automatische failover mogelijk voor een breed scala aan kritieke workloads, waaronder:

  * **Virtuele en fysieke omgevingen:** Complete Hyper-V- of KVM-virtuele machines.
  * **Container Orchestratie:** , Docker , Podman omgevingen.
  * **Gegevens en services:** Individuele bestandsmappen, services en diverse databases.
  * **Cloudinfrastructuur:** Hoge beschikbaarheid voor cloudapplicaties.


SafeKit biedt ook **<span class="notranslate farm-term" translate="no">Farm</span> Clusters** met native **Netwerktaakverdeling en Failover** voor stateless applicaties zoals **Webservers** .

💡 [ Bekijk hier de volledige lijst met ondersteunde HA-oplossingen. ](</nl/solutions/>)

### Hoe realiseert SafeKit de hoge beschikbaarheid van K3s? {#safekit-k3s-architecture-table}

Architectuur en redundantielogica **voor een K3s-cluster met 2 knooppunten, gebruikmakend van SafeKit**

2-knoops K3s-cluster | SafeKit PRIM (Primaire knoop) | SafeKit SECOND (Secundaire knoop)  
---|---|---  
Werkbelastinguitvoering | De K3s master- en agentservices zijn actief en beheren de clusterorkestratie en de draaiende pods. | De K3s master- en agentservices blijven actief en zorgen voor parallelle verwerking en hoge beschikbaarheid.  
NFS-opslag en PV's | • Host virtueel IP-adres en NFS-poort <br> • Beheert actieve geëxporteerde NFS-shares <br> • Slaat K3s Persistent Volumes (PV's) | Synchrone mirroring: SafeKit repliceert alle persistente volumes in realtime om dataverlies te voorkomen.  
Configuratiedatabase | • Host virtueel IP-adres en poort MariaDB <br> • Beheert de actieve K3s-configuratiedatabase | Databasereplicatie: De MariaDB database wordt synchroon gespiegeld, waardoor de clusterstatus behouden blijft bij failover.  
  
Automatisch failovermechanisme **:** In geval van een storing van het primaire knooppunt migreert SafeKit automatisch de virtuele IP-adressen en opslagservices naar het secundaire knooppunt, waardoor een ononderbroken werking van het K3s-cluster wordt gewaarborgd.

## Hoe werkt het SafeKit mirror cluster samen met Kubernetes K3S? {#safekit-mirror-cluster}

### Stap 1: Bestandsreplicatie op byte-niveau in een Mirror cluster {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Deze fase illustreert de architectuur voor hoge beschikbaarheid tussen **Server 1 (PRIM)** en **Server 2 (SECOND)** . Beide servers draaien K3s master- en agentcomponenten zoals gedefinieerd in de architectuurtabel [ ](#safekit-k3s-architecture-table) .


![ Bestandsreplicatie op byte-niveau in een Kubernetes K3s mirror cluster ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Momenteel zijn de virtuele IP-adressen (VIP) **,** , **,** en **MariaDB** alleen actief op Server 1 (PRIM). De K3s-mastercomponenten op beide knooppunten synchroniseren met elkaar door de clusterstatus te benaderen via het virtuele IP-adres en de poort MariaDB . SafeKit implementeert [ synchrone replicatie ](</nl/best-practises/synchronous-replication-vs-asynchronous-replication/>) van MariaDB en persistente NFS-bestanden, waardoor **nul gegevensverlies (RPO = 0)** wordt gegarandeerd in geval van een storing.

De K3s-masters verdelen de werklast over beide (of meer) knooppunten door rechtstreeks met de K3s-agents te communiceren. Externe clients maken verbinding met de masters.  
**virtuele IP-adres van [ -cluster ](</nl/best-practises/how-a-virtual-ip-address-works/>) op het PRIM-knooppunt. Met behulp van Kubernetes stuurt de K3s-master verkeer door naar pods die over de knooppunten zijn verdeeld. Op dezelfde manier hebben pods toegang tot hun persistente volumes (PV's)** op de PRIM-server via het virtuele IP-adres en de NFS-poort.

### Stap 2: Automatische failover en servicecontinuïteit {#step-2-automatic-failover-and-service-continuity}

Als **Server 1 (PRIM)** uitvalt, neemt **Server 2 (SECOND)** automatisch de clusteractiviteiten over om de continuïteit te waarborgen.


![ Failover in een Kubernetes K3S mirror cluster ](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit detecteert de storing en migreert onmiddellijk het **virtuele IP-adres** van het cluster naar Server 2. Vervolgens worden de lokale **MariaDB** en **NFS-services** geactiveerd. Dankzij de synchrone replicatie die in stap 1 is uitgevoerd, zijn alle MariaDB -databases en NFS Persistent Volume (PV)-bestanden op Server 2 al up-to-date, waardoor er geen gegevensverlies optreedt.

Met behoud van de clusterstatus zet de **K3s Master** op Server 2 de uitvoering voort. Deze detecteert het verlies van de agent op Server 1 en plant de betreffende pods automatisch opnieuw in op de resterende actieve K3s-agents. De totale failovertijd (RTO) is de som van het foutdetectie-interval (standaard: 30 seconden) en de tijd die nodig is voor de initialisatie van de K3s-componenten op het secundaire knooppunt.

Terwijl server 1 offline is, blijven de services MariaDB en NFS op server 2 actief en schrijven ze wijzigingen alleen lokaal weg.  


### Stap 3: Failback en automatische herintegratie {#step-3-failback-and-automatic-reintegration}

**Failback** treedt op wanneer Server 1 opnieuw wordt opgestart nadat het initiële probleem is opgelost. SafeKit synchroniseert automatisch de MariaDB en NFS-bestanden opnieuw, waarbij alleen de gegevens worden bijgewerkt die tijdens de downtime op Server 2 zijn gewijzigd. Dit herintegratieproces is **niet-verstorend** ; de K3s master- en agentcomponenten blijven zonder onderbreking op Server 2 draaien. 


![ Automatische resynchronisatie en failback in een K3s mirror cluster ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit optimaliseert de hersteltijd op basis van de manier waarop de server is gestopt: 

  * **Schone afsluiting:** Als SafeKit opzettelijk is gestopt op Server 1, worden alleen de specifieke gewijzigde zones binnen de bestanden opnieuw gesynchroniseerd met behulp van **bitmaps voor het bijhouden van wijzigingen** . Dit zorgt voor een ultrasnelle herintegratie. 
  * **Systeemcrash (bijv. stroomuitval):** Als server 1 een onjuiste afsluiting heeft ondergaan, worden de wijzigingsbitmaps om veiligheidsredenen overgeslagen. SafeKit synchroniseert in plaats daarvan alle bestanden met een wijzigingstijdstempel die recenter is dan het laatst vastgestelde synchronisatiepunt, waardoor **de volledige gegevensintegriteit wordt gewaarborgd.** . 


### Stap 4: Herstellen van hoge beschikbaarheid en taakverdeling {#step-4-restoring-high-availability-and-load-distribution}

Na de herintegratie keert het cluster terug naar **de volledige mirror -modus** , waarmee de status zoals beschreven in stap 1 wordt nagebootst. Het systeem bevindt zich opnieuw in een zeer beschikbare staat: **MariaDB** en **NFS-services** blijven actief op server 2, terwijl SafeKit realtime replicatie van alle bestandsupdates naar server 1 uitvoert. 


![ Terugkeer naar normale werking in een Kubernetes K3s mirror cluster ](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

De K3s Master **K3s Agent** en K3s Agent **, K3s Agent** worden automatisch opnieuw opgestart op Server 1. De scheduler Kubernetes herkent Server 1 nu als een gezond knooppunt en kan beginnen met het herplannen van pods om de werklast over beide servers te verdelen. 

Als de beheerder er de voorkeur aan geeft dat de MariaDB en NFS-services op Server 1 draaien (waardoor de oorspronkelijke PRIM-rol wordt hersteld), kan een **omschakeling** handmatig via de webconsole op een geschikt moment worden geactiveerd of geautomatiseerd via de configuratie-instellingen. 

### Hoe configureer ik een SafeKit Mirror -cluster? {#safekit-mirror-cluster-configure}


![ SafeKit Webconsole: Dashboard voor configuratie van hoge beschikbaarheid met weergave van heartbeat-netwerken, virtuele IP-configuratie en realtime directoryreplicatie voor een mirror -cluster. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


De webconsole **SafeKit** biedt een intuïtieve interface voor het orkestreren van hoge beschikbaarheid voor uw kritieke applicaties. In slechts enkele stappen kunt u een cluster **SafeKit mirror** configureren om bedrijfscontinuïteit te garanderen.

  * **Toepassingsfailover (tabblad Macro's):** Definieer de specifieke toepassingsservices die automatisch opnieuw moeten worden opgestart in geval van een storing.
  * **Heartbeat-netwerk(en):** Speciaal communicatiepad(en) gebruikt door clusterknooppunten om elkaars status en beschikbaarheid continu te bewaken en failover-beslissingen te synchroniseren.
  * **Virtueel IP-beheer:** Stel het virtuele IP-adres (VIP) in voor een transparante herverbinding van de client na een failover.
  * **Realtime replicatie:** Selecteer de kritieke mappen voor hostgebaseerde, synchrone replicatie op byte-niveau.
  * **Checkers:** Bewaak de status van de applicatie en activeer automatisch herstel als een procesfout wordt gedetecteerd.


Het SafeKit cluster bevat een speciale split-brain-checker om problemen met netwerkisolatie op te lossen zonder dat een derde witness-machine of een extra heartbeat-netwerk nodig is. Lees meer over de heartbeat, failover en quorum [ in een ](</nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) -cluster.

### Hoe kan ik een SafeKit mirror -cluster monitoren? {#safekit-mirror-cluster-monitoring}


![ SafeKit Webconsole: Realtime monitoring van een 2-knoops mirror -cluster met weergave van de PRIM- en SECOND-status met actieve gegevensreplicatie. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


De **SafeKit** beheerconsole biedt een uniform overzicht van uw infrastructuur voor hoge beschikbaarheid. Hiermee kunnen beheerders de **operationele status** van het cluster bewaken en de gegevenssynchronisatie in realtime volgen.

Voor een mirror cluster met twee knooppunten worden de rollen van elke server duidelijk weergegeven in de console:

  * **PRIM (Primair):** Het actieve knooppunt waarop momenteel de applicatie draait en dat het virtuele IP-adres beheert. Het voert schrijfbewerkingen uit naar de lokale opslag en realtime replicatie naar het secundaire knooppunt.
  * **SECOND (Secundair):** Het standby-knooppunt ontvangt synchrone updates op byte-niveau. Het is direct klaar om de taken over te nemen als het primaire knooppunt uitvalt.
  * **ALONE Status:** Geeft een visuele melding wanneer het cluster op één knooppunt draait (bijvoorbeeld tijdens onderhoud of na een storing), wat aangeeft dat de redundantie tijdelijk verloren is gegaan.
  * **Resynchronisatievoortgang:** Wanneer een defect knooppunt herstelt, kleurt de status oranje tijdens de herintegratie van de achtergrondgegevens, waardoor er geen downtime is tijdens de "terugkeer naar normaal"-fase.


Naast eenvoudige statuspictogrammen biedt de interface **one-click failover orchestration** , waarmee u handmatig de primaire rol opnieuw kunt toewijzen voor gepland onderhoud, terwijl de continue beschikbaarheid voor gebruikersactiviteiten gewaarborgd blijft.


{{%  insert-safekit-usage-nl  %}}
 

## Vergelijking: SafeKit versus standaard K3s-stack (MetalLB & Longhorn) {#safekit-k3s-ha-comparison}

Vergelijking **: SafeKit versus standaard open-source (MetalLB + Longhorn)**

Mogelijkheid | SafeKit ( K3s.safe ) | MetalLB + Longhorn (Standaard K8s)  
---|---|---  
Architectuur | All-in-One: Geïntegreerde netwerkfunctionaliteit, replicatie en failover in één pakket. | DIY (Do It Yourself) Stack: Meerdere onafhankelijke pakketten vereist (CNI, CSI, LoadBalancer).  
Hardware-efficiëntie | Pure 2-knoops HA: Volledige redundantie zonder een derde "witness"- of arbiter-knoop. | Minimaal 3 knopen: Vereist doorgaans een oneven aantal voor Etcd-quorum en opslagveiligheid.  
Netwerken (VIP) | Native: Virtueel IP-adres beheerd op OS-niveau; transparant voor K3s. | Complex: Vereist MetalLB-installatie met L2- of BGP-configuratie met behulp van dedicated speaker pods die CPU/RAM verbruiken op elke node.  
Opslagvereisten | Synchronisch op byteniveau: Realtime bestandsreplicatie van bestaande mappen; werkt op standaard systeemschijven; bestandsreplicatie op byteniveau met minimale CPU-/netwerkbelasting. | Op blokniveau: Gedistribueerde blokopslag (Longhorn) met behulp van dedicated storage pods; hoger resourceverbruik.  
Failover-intelligentie | Onafhankelijke stabiliteit: SafeKit werkt buiten de container-runtime. Het bewaakt het besturingssysteem en de hardware rechtstreeks en zorgt voor failover, zelfs als het Kubernetes -controlepaneel of de container-engine vastloopt. | Circulaire afhankelijkheid: De failover-logica bevindt zich _binnen_ de pods die het moet beschermen. Als het host-besturingssysteem of de K3s-engine vastloopt, bevriezen ook de management-pods (MetalLB/Longhorn), waardoor vaak handmatige interventie nodig is om de "blokkering" op te heffen.  
Beheer | Vereenvoudigd: Beheerbaar via één webconsole; geen Kubernetes -expert vereist. | Gespecialiseerd: Vereist diepgaande kennis van YAML, Helm en interne K8s-controllers.  
  
Samenvattend **hoewel een standaard doe-het-zelf-stack** MetalLB + Longhorn) modulariteit biedt voor Kubernetes , creëert het een **afhankelijkheid waarbij de opslag- en netwerktools kwetsbaar zijn voor dezelfde knooppuntfouten die ze juist zouden moeten beheren.** afhankelijkheid doorbreekt **lus door te functioneren als een onafhankelijke infrastructuurlaag; het biedt een robuustere, hardware SafeKit agnostische HA** oplossing met twee knooppunten die operationeel blijft, zelfs als de engine of het Kubernetes vastloopt. Dit garandeert geautomatiseerd herstel en data-integriteit zonder de hoge resourcekosten, het verplichte quorum van drie knooppunten of de configuratiecomplexiteit die vereist is bij traditionele gedistribueerde blokopslag en netwerkoverlays.

## Videohandleiding: Een SafeKit HA mirror -cluster configureren {#videoguide-safekit-mirror-cluster}

### SafeKit Video: Clustering op applicatieniveau (8:47) {#demo-mirror-ha-cluster}

Hoewel deze video de hoge beschikbaarheid van SafeKit voor Microsoft SQL Server demonstreert, geeft hij een uitstekend overzicht van hoe de oplossing K3s-omgevingen beveiligt. SafeKit werkt identiek voor elke andere database of bedrijfskritische applicatie.

### Videohoogtepunten {#video-highlights}

  1. 🎬 [ 2 knooppunten met SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Configureer het cluster en de mirror.safe module ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Start en test SQL-replicatie, migratie, failover bij crash ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&lt;br /> 


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}