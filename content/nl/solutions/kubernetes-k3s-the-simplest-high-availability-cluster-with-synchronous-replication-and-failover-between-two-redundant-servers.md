---
title: "Kubernetes K3s hoge beschikbaarheid: synchrone replicatie en failover met 2 knooppunten"
canonical: "https://safekit.eviden.com/nl/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Bereik hoge beschikbaarheid van K3s op 2 nodes zonder externe opslag of etcd-quorum. Leer hoe SafeKit replicatie zonder gegevensverlies en automatische failover biedt."
category: "solutions"
lang: "nl"
topics: "K3s HA vereenvoudigen: Waarom SafeKit kiezen boven MetalLB en Longhorn?, Inhoudsopgave, Hoe implementeert de SafeKit-software eenvoudig een Kubernetes K3s-cluster met hoge beschikbaarheid?, Hoe werkt het SafeKit mirror-cluster met Kubernetes K3S?, Beperkingen SafeKit High Availability, Vergelijking: SafeKit versus standaard K3s-stack (MetalLB & Longhorn), Videogids: Een SafeKit HA- mirror-cluster configureren, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.8 | Translation LLM | 32 expressions"
---

# Kubernetes K3s hoge beschikbaarheid: synchrone replicatie en failover met 2 knooppunten {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## K3s HA vereenvoudigen: Waarom SafeKit kiezen boven MetalLB en Longhorn? {#safekit-k3s-ha-introduction}

Hoewel de standaard open-source stack (MetalLB + Longhorn) voor K3s krachtig is voor grote datacenters, introduceert deze overmatige complexiteit voor on-premises sites met 2 knooppunten. **SafeKit** vereenvoudigt de K3s-omgeving door op zichzelf staande netwerk- en opslagtools te vervangen door één enkele, geconsolideerde HA-engine. 

### Waarom SafeKit voor hoge beschikbaarheid (HA) met 2-node K3s? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **Echte hoge beschikbaarheid met 2 knooppunten:** SafeKit biedt volledige redundantie met slechts **2 knooppunten**, waardoor de vereiste van 3 knooppunten voor *etcd-* quorum wordt geëlimineerd.
  * **Geen gegevensverlies (RPO = 0):** vervangt opslag met hoge overhead door **synchrone replicatie op byte-niveau** voor lokale SSD-prestaties.
  * **Flexibele bescherming op bestandsniveau:** SafeKit voert hostgebaseerde replicatie uit op bestandsniveau, wat volledig transparant is voor de toepassing. Het beschermt niet alleen databases, maar ook alle bijbehorende mappen en gegevens. U kunt bestaande mappen precies daar repliceren waar ze zijn geïnstalleerd, zelfs op de **systeemdisk**.
  * **Geïntegreerde virtuele IP (VIP):** beheert de cluster-IP standaard op kernelniveau, waardoor afzonderlijke **MetalLB-** configuraties overbodig worden.
  * **Automatische failover en failback:** Activeert een onmiddellijke overgang naar de secundaire node bij een storing; zodra de primaire node weer operationeel is, voert SafeKit **een automatische gegevensresynchronisatie** uit zonder handmatige tussenkomst.
  * **Extreem lage overhead:** SafeKit werkt zonder de zware beheersoverhead van opslagpods (CSI/Longhorn) en netwerkpods (CNI/MetalLB) die vereist zijn voor standaardstacks, waardoor kritiek RAM- en CPU-geheugen vrijkomt voor uw applicaties.
  * **IT-generalistvriendelijk:** vervangt complexe **infrastructuur-YAML** voor netwerken en opslag door een **eenvoudige web-GUI** en geautomatiseerde implementatiescripts, zodat u zich alleen op uw applicaties hoeft te richten.


![SafeKit architectuurdiagram voor K3s-high availability met 2 knooppunten, met geïntegreerd virtueel IP-adres, realtime replicatie en automatische failover.](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **Shared-nothing high availability (HA) voor K3s-clusters met 2 nodes**  


<a class="btn-quick-install" href="/nl/quick-install/safekit-quick-installation-guide-with-kubernetes/">⚡ Snelle installatiegids Kubernetes HA-cluster ></a>
## Inhoudsopgave {#toc}

  * [Hoe implementeert de SafeKit-software eenvoudig een Kubernetes K3s-cluster met hoge beschikbaarheid?](#safekit-mirror-k3s-cluster)
  * [Hoe werkt het SafeKit mirror-cluster met Kubernetes K3S?](#safekit-mirror-cluster)
  * [Beperkingen SafeKit High Availability](#safekit-ha-limitations)
  * [Vergelijking: SafeKit versus standaard K3s-stack (MetalLB & Longhorn)](#safekit-k3s-ha-comparison)
  * [Videogids: Een SafeKit mirror HA-cluster configureren](#videoguide-safekit-mirror-cluster)
  * [🔍 Ontdek SafeKit](#hub)


## Hoe implementeert de SafeKit-software eenvoudig een Kubernetes K3s-cluster met hoge beschikbaarheid? {#safekit-mirror-k3s-cluster}

### Hoe implementeer ik hoge beschikbaarheid voor een Kubernetes K3s-cluster met 2 knooppunten? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

U kunt hoge beschikbaarheid (HA) implementeren voor een Kubernetes K3s-cluster met 2 knooppunten met behulp van de **SafeKit k3s.safe mirror-module**. Met deze oplossing kunt u een redundante omgeving implementeren zonder dat u externe NFS-opslag, een speciale externe configuratiedatabase of gespecialiseerde Kubernetes expertise nodig hebt.

### Waarom K3s gebruiken voor edge- en IoT-computing? {#why-use-k3s-for-edge-and-iot-computing}

[K3s](<https://k3s.io/>) is de voorkeurs Kubernetes engine voor **IoT en edgecomputing**, omdat het een lichtgewicht, gecertificeerde distributie is die is ontworpen voor omgevingen met beperkte middelen. Het vereenvoudigt de operationele overhead van standaard Kubernetes met behoud van volledige compatibiliteit.

### Wat zijn de belangrijkste kenmerken van de k3s.safe mirror-module? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

De k3s.safe module biedt een uitgebreide HA-stack voor K3s door het volgende te implementeren:

  * **Dubbele actieve knooppunten:** Voert 2 actieve K3s-masters/agents tegelijkertijd uit om pods te hosten.
  * **Database-replicatie:** real-time replicatie van de MariaDB-configuratiedatabase tussen knooppunten.
  * **Permanente opslag:** Replicatie van permanente volumes via een geïntegreerde NFS-client dynamische provisioner (nfs-client).
  * **Netwerkcontinuïteit:** Inclusief een virtueel IP-adres voor naadloze clienttoegang.
  * **Geautomatiseerd herstel:** Volledige ondersteuning voor automatische failover en failback.


### Welke applicaties en omgevingen kan SafeKit beschermen, naast K3s? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit is een veelzijdige high-availability-oplossing **voor zowel Windows als Linux** die veel verder gaat dan een K3s- mirror-cluster. Het maakt **synchrone real-time replicatie** en automatische failover mogelijk voor een breed scala aan bedrijfskritische workloads, waaronder:

  * **Virtuele en fysieke omgevingen:** complete Hyper-V of KVM virtuele machines.
  * **Containerorkestratie:** Docker, Podman omgevingen.
  * **Gegevens en diensten:** Individuele bestandsmappen, diensten en diverse databases.
  * **Cloudinfrastructuur:** hoge beschikbaarheid voor cloudtoepassingen.


SafeKit biedt **<span class="notranslate farm-term" translate="no">farm</span>-clusters** ook native **netwerktaakverdeling en failover** voor stateless applicaties zoals **webservers**.

💡 [Bekijk hier de volledige lijst met ondersteunde HA-oplossingen.](</nl/solutions/>)

### Hoe bereikt SafeKit de hoge beschikbaarheid van K3s? {#safekit-k3s-architecture-table}

**Architectuur en redundantielogica voor een K3s-cluster met 2 knooppunten met behulp van SafeKit**

K3s-cluster met 2 knooppunten | SafeKit PRIM (primaire node) | SafeKit SECOND (secundair knooppunt)  
---|---|---  
Uitvoering van werkbelasting | De master- en agent-services van K3s zijn actief, beheren de clusterorkestratie en voeren pods uit. | De master- en agentdiensten van K3s blijven actief, wat zorgt voor parallelle verwerking en hoge beschikbaarheid.  
NFS-opslag en PV's |  • Hostt virtueel IP-adres en NFS-poort <br> • Beheert actieve geëxporteerde NFS-shares <br> • Slaat K3s Persistent Volumes (PV's) op  | Synchrone spiegeling: SafeKit repliceert alle persistente volumes in realtime om nul gegevensverlies te garanderen.  
Configuratiedatabase |  • Host virtueel IP-adres en MariaDB-poort <br> • Beheert de actieve K3s-configuratiedatabase  | Database-replicatie: De MariaDB database wordt synchroon gespiegeld, waardoor de clusterstatus voor failover behouden blijft.  
  
**Automatisch failovermechanisme:** In het geval van een storing van de primaire node migreert SafeKit automatisch de virtuele IP's en opslagservices naar de secundaire node, waardoor een ononderbroken service voor het K3s-cluster wordt gegarandeerd.

## Hoe werkt het SafeKit mirror-cluster met Kubernetes K3S? {#safekit-mirror-cluster}

### Stap 1: Bestandsreplicatie op byte-niveau in een mirror-cluster {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Deze fase illustreert de high-availability-architectuur tussen **server 1 (PRIM)** en **server 2 (SECOND)**. Beide servers draaien K3s master- en agentcomponenten zoals gedefinieerd in de [architectuurtabel](#safekit-k3s-architecture-table).


![Bestandsreplicatie op byteniveau in een Kubernetes K3s mirror-cluster](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Momenteel zijn de **Virtual IP (VIP)**, **de persistente NFS-opslag** en **MariaDB** alleen actief op server 1 (PRIM). De K3s-mastercomponenten op beide knooppunten synchroniseren met elkaar door de clusterstatus te benaderen via de Virtual IP en de MariaDB poort. SafeKit implementeert [synchrone replicatie](</nl/best-practises/synchronous-replication-vs-asynchronous-replication/>) van MariaDB en persistente NFS-bestanden, wat garant staat voor **nul gegevensverlies (RPO = 0)** in geval van een storing.

De K3s-masters verdelen de werklast over beide (of meer) nodes door rechtstreeks te communiceren met de K3s-agents. Externe clients maken verbinding met de  
[Het virtuele IP-adres van het cluster](</nl/best-practises/how-a-virtual-ip-address-works/>) op de PRIM node. Met behulp van standaard Kubernetes mechanismen stuurt de K3s-master het verkeer door naar pods die over de nodes zijn verdeeld. Op vergelijkbare wijze hebben pods toegang tot hun **persistente volumes (PV's)** op de PRIM server via het virtuele IP-adres en de NFS-poort.

### Stap 2: Automatische failover en servicecontinuïteit {#step-2-automatic-failover-and-service-continuity}

Wanneer **server 1 (PRIM)** uitvalt, neemt **server 2 (SECOND)** automatisch de clusteractiviteiten over om de continuïteit te waarborgen.


![Failover in een Kubernetes K3S mirror-cluster](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit detecteert de storing en migreert het **virtuele IP-adres** van het cluster onmiddellijk naar Server 2. Vervolgens worden de lokale **MariaDB** en **NFS-services** naar een actieve status gepromoveerd. Vanwege de synchrone replicatie die in stap 1 is uitgevoerd, zijn alle MariaDB databases en NFS Persistent Volume (PV)-bestanden al bijgewerkt op Server 2, waardoor gegevensverlies wordt voorkomen.

Met behoud van de clusterstatus blijft de **K3s Master** op Server 2 de uitvoering voortzetten. Deze detecteert het verlies van de agent op Server 1 en plant de getroffen pods automatisch opnieuw in op de resterende actieve K3s-agents. De totale failovertijd (RTO) is de som van het foutdetectie-interval (standaard: 30 seconden) en de tijd die nodig is voor de initialisatie van K3s-componenten op de secundaire node.

Terwijl server 1 offline is, blijven MariaDB en NFS-services op server 2 draaien en worden wijzigingen alleen lokaal opgeslagen.  


### Stap 3: Failback en automatische reintegratie {#step-3-failback-and-automatic-reintegration}

**Failback** vindt plaats wanneer Server 1 opnieuw wordt opgestart nadat het oorspronkelijke probleem is opgelost. SafeKit synchroniseert de MariaDB en NFS-bestanden automatisch opnieuw, waarbij alleen de gegevens worden bijgewerkt die op Server 2 zijn gewijzigd tijdens de downtime. Dit herintegratieproces is **niet-disruptief**; de K3s master- en agentcomponenten blijven zonder onderbreking op Server 2 draaien. 


![Automatische resynchronisatie en failback in een K3s mirror-cluster](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit optimaliseert de hersteltijd op basis van de manier waarop de server is gestopt: 

  * **Schone afsluiting:** Als SafeKit opzettelijk is gestopt op Server 1, worden alleen de specifieke gewijzigde zones binnen de bestanden opnieuw gesynchroniseerd met behulp van **modificatietrackingsbitmaps**. Dit zorgt voor een ultrasnelle reintegratie. 
  * **Systeemcrash (bijv. stroomstoring):** Als Server 1 een onverwachte afsluiting heeft ondergaan, worden de modificatiebitmaps om veiligheidsredenen omzeild. SafeKit synchroniseert in plaats daarvan alle bestanden met een wijzigingstijdstempel die recenter is dan het laatst vastgestelde synchronisatiepunt, waardoor **de totale gegevensintegriteit** wordt gewaarborgd. 


### Stap 4: Hoge beschikbaarheid en taakverdeling herstellen {#step-4-restoring-high-availability-and-load-distribution}

Na de reintegratie keert de cluster terug naar **de volledige mirror**, die de status van stap 1 weerspiegelt. Het systeem is opnieuw in een zeer beschikbare toestand: **MariaDB** en **NFS-services** blijven actief op server 2, terwijl SafeKit alle bestandsupdates in realtime repliceert naar server 1. 


![Terugkeer naar normale werking in een Kubernetes K3s- mirror-cluster](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

De **K3s Master** en **K3s Agent** worden automatisch opnieuw opgestart op Server 1. De Kubernetes-scheduler herkent Server 1 nu als een gezond knooppunt en kan beginnen met het opnieuw plannen van pods om de werklast over beide servers te verdelen. 

Als de beheerder de voorkeur geeft aan het uitvoeren van de MariaDB en NFS-services op Server 1 (waarbij de oorspronkelijke PRIM rol wordt hersteld), kan een **overschakeling** handmatig worden geactiveerd via de webconsole op een geschikt moment of geautomatiseerd via de configuratie-instellingen. 

### Hoe configureer ik een SafeKit mirror-cluster? {#safekit-mirror-cluster-configure}


![SafeKit Web Console: dashboard voor hoge beschikbaarheid met heartbeat-netwerken, virtuele IP-instellingen en realtime directoryreplicatie voor een mirror-cluster.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


De **SafeKit webconsole** biedt een intuïtieve interface om hoge beschikbaarheid voor uw bedrijfskritische applicaties te orkestreren. In slechts een paar stappen kunt u een **SafeKit mirror-cluster** configureren om bedrijfscontinuïteit te garanderen:

  * **Failover van applicaties (tabblad Macro's):** Definieer de specifieke applicatiediensten die automatisch opnieuw moeten worden gestart in geval van een storing.
  * **Heartbeatnetwerk(en):** Toegewezen communicatiepad(en) die door clusterknooppunten worden gebruikt om de status en beschikbaarheid van elkaar continu te controleren en failoverbeslissingen te synchroniseren.
  * **Virtueel IP-beheer:** Stel het virtuele IP-adres (VIP) in voor een transparante herverbinding van de client na een failover.
  * **Realtime replicatie:** Selecteer de kritieke mappen voor hostgebaseerde, synchrone replicatie op byteniveau.
  * **Checkers:** controleer de status van de toepassing en activeer automatisch herstel als er een procesfout wordt gedetecteerd.


Het SafeKit cluster bevat een speciale split-brain-checker om netwerkisolatieproblemen op te lossen zonder dat er een derde 'witness'-machine of een extra 'heartbeat'-netwerk nodig is. Lees meer over ['heartbeat', 'failover' en 'quorum' in een cluster](</nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Hoe kan ik een SafeKit mirror-cluster monitoren? {#safekit-mirror-cluster-monitoring}


![SafeKit Web Console: realtimemonitoring van een mirror-cluster met 2 knooppunten, met weergave PRIM en SECOND status en actieve datareplicatie.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


De **SafeKit beheerconsole** biedt een uniform overzicht van uw hoge beschikbaarheidsinfrastructuur. Hiermee kunnen beheerders de **operationele status** van het cluster controleren en de gegevenssynchronisatie in realtime volgen.

Voor een mirror-cluster met 2 knooppunten geeft de console duidelijk de rollen van elke server weer:

  * **PRIM (primair):** de actieve node die momenteel de toepassing uitvoert en het virtuele IP-adres beheert. Deze voert schrijfbewerkingen uit naar de lokale opslag en realtime-replicatie naar de secundaire node.
  * **SECOND:** Het stand-byknooppunt ontvangt synchrone updates op byteniveau. Het is direct klaar om het over te nemen als het primaire knooppunt uitvalt.
  * **ALONE status:** Geeft een visuele waarschuwing wanneer het cluster op één knooppunt draait (bijv. tijdens onderhoud of na een storing), wat aangeeft dat de redundantie tijdelijk verloren is gegaan.
  * **Voortgang van de resynchronisatie:** Wanneer een defecte node herstelt, wordt de status oranje tijdens de achtergrondgegevensreïntegratie, zodat er geen downtime is tijdens de fase 'terug naar normaal'.


Naast eenvoudige statuspictogrammen biedt de interface **failover-orkestratie met één klik**, zodat u de primaire rol handmatig kunt toewijzen voor gepland onderhoud, terwijl u de continue beschikbaarheid voor gebruikersactiviteiten waarborgt.


{{%  insert-safekit-usage-nl  %}}
 

## Vergelijking: SafeKit versus standaard K3s-stack (MetalLB & Longhorn) {#safekit-k3s-ha-comparison}

**Vergelijking: SafeKit versus standaard open-source (MetalLB + Longhorn)**

Capaciteit | SafeKit (K3s.safe) | MetalLB + Longhorn (standaard K8s)  
---|---|---  
Architectuur | Alles-in-één: Geïntegreerde netwerken, replicatie en failover in één pakket. | DIY (Do It Yourself) Stack: Meerdere onafhankelijke pakketten vereist (CNI, CSI, LoadBalancer).  
Hardware-efficiëntie | Pure 2-node HA: volledige redundantie zonder een 3e "witness"- of arbiterknooppunt. | Minimaal 3 knooppunten: doorgaans zijn oneven aantallen vereist voor het Etcd-quorum en de opslagveiligheid.  
Netwerken (VIP) | Native: virtueel IP-adres beheerd op OS-niveau; transparant voor K3s. | Complex: Vereist de installatie van MetalLB met L2- of BGP-configuratie met behulp van speciale speakerpods die CPU/RAM verbruiken op elk knooppunt.  
Opslagvereisten | Byte-Level Synchronous: real-time bestandsreplicatie van bestaande mappen; werkt op standaard systeemdisks; bestandsreplicatie op byte-niveau met minimale CPU/netwerk overhead. | Blokniveau: Gedistribueerde blokopslag (Longhorn) met behulp van speciale opslagpods; hoger resourceverbruik.  
Failover-intelligentie | Onafhankelijke stabiliteit: SafeKit werkt buiten de container-runtime. Het bewaakt het besturingssysteem en de hardware rechtstreeks, waardoor failover wordt gegarandeerd, zelfs als het Kubernetes-besturingsvlak of de containermotor vastloopt. | Circulaire afhankelijkheid: De failoverlogica wordt gehost *in* de pods die het moet beschermen. Als het host-OS of de K3s-engine vastloopt, bevriezen ook de beheerpods (MetalLB/Longhorn), waardoor vaak handmatige triage nodig is om de "vergrendeling" te doorbreken  
Administratie | Vereenvoudigd: Beheerbaar via één webconsole; geen Kubernetes expert vereist. | Gespecialiseerd: Vereist diepgaande kennis van YAML, Helm en interne K8s-controllers.  
  
**Samenvattend** biedt een standaard doe-het-zelf-stack (MetalLB + Longhorn) modulariteit voor Kubernetes experts, maar creëert het een **circulaire afhankelijkheid** waarbij de opslag- en netwerkinstrumenten kwetsbaar zijn voor dezelfde knooppuntstoringen die ze moeten beheren. **SafeKit** doorbreekt deze lus door te opereren als een onafhankelijke infrastructuurlaag; het biedt een robuustere, hardware-agnostische 2-knoops HA-oplossing die operationeel blijft, zelfs als de Kubernetes-engine of het host-besturingssysteem vastloopt. Dit zorgt voor geautomatiseerd herstel en gegevensintegriteit zonder de zware resourceoverhead, het verplichte drieknoopsquorum of de configuratiecomplexiteit die vereist is door traditionele gedistribueerde blokopslag en netwerkoverlays.

## Videogids: Een SafeKit HA- mirror-cluster configureren {#videoguide-safekit-mirror-cluster}

### SafeKit video: Clustering op applicatieniveau (8:47) {#demo-mirror-ha-cluster}

Hoewel deze video de hoge beschikbaarheid van SafeKit voor Microsoft SQL Server demonstreert, geeft het een uitstekend overzicht van hoe de oplossing K3s-omgevingen beveiligt. SafeKit functioneert identiek voor elke andere database of bedrijfskritische toepassing.

### Videohoogtepunten {#video-highlights}

  1. 🎬 [2 knooppunten met SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Configureer het cluster en de mirror.safe-module](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [SQL-replicatie, -migratie en -failover bij een crash starten en testen](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}