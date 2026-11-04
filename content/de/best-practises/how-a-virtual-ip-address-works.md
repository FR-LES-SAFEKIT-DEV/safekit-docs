---
title: "Wie funktioniert eine virtuelle IP-Adresse (VIP) in einem Hochverfügbarkeitscluster?"
canonical: "https://safekit.eviden.com/de/best-practises/how-a-virtual-ip-address-works/"
description: "Erfahren Sie, wie SafeKit bei einem Failover eine virtuelle IP-Adresse (VIP) verschiebt: per Gratuitous ARP im selben Subnetz oder per Load Balancer, Cloud-CLI oder BGP zwischen Subnetzen. Warum eine lokale VIP wichtig ist."
category: "best-practises"
lang: "de"
topics: "Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?, Implementierung virtueller IP-Adressen in SafeKit, Inhaltsverzeichnis, Funktionsweise einer virtuellen IP-Adresse (VIP) beim Failover im selben Subnetz (Mirror-Cluster), Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit einem Load Balancer (Mirror-Cluster), Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit Cloud-Provider-CLIs (Mirror-Cluster), Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit BGP (Mirror-Cluster), Funktionsweise einer lastverteilten virtuellen IP-Adresse in einer Farm im selben Subnetz (Farm-Cluster), Funktionsweise einer lastverteilten virtuellen IP-Adresse über verschiedene Subnetze hinweg (Farm-Cluster), Virtuelle IP-Adresse vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt, Vergleich von Implementierung, Latenz und Anwendungstransparenz virtueller IP-Adressen, Konfiguration einer virtuellen IP-Adresse für Netzwerklastverteilung und Hochverfügbarkeit, Häufig gestellte Fragen zu virtuellen IP-Adressen (VIP), 🔍 SafeKit-Navigationshub für Hochverfügbarkeit"
---

# Wie funktioniert eine virtuelle IP-Adresse (VIP) in einem Hochverfügbarkeitscluster? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#virtual-ip-definition}

Eine **virtuelle IP-Adresse (VIP)** ist die einzige Adresse, über die Clients eine Anwendung in einem [Hochverfügbarkeitscluster](</de/>) erreichen. Die VIP ist keinem einzelnen Server fest zugeordnet. Bei einem Failover wechselt sie zu dem Server, auf dem die Anwendung läuft. Die Clients müssen ihre Konfiguration nicht ändern.

**Wichtiges SafeKit-Prinzip:** Die VIP ist **lokal auf dem Server konfiguriert**, auf dem die Anwendung läuft. Die Anwendung startet mit der VIP und empfängt die ursprüngliche Client-IP-Adresse. Deshalb funktionieren viele Anwendungen mit SafeKit ohne Änderungen.


## Implementierung virtueller IP-Adressen in SafeKit {#safekit-vip-implementation}

Dieser Artikel erläutert, wie SafeKit die VIP in verschiedenen Netzwerkarchitekturen verschiebt:

  * **Gleiches Subnetz oder erweitertes LAN (Mirror- und <span class="notranslate farm-term" translate="no">Farm</span>-Cluster):** SafeKit konfiguriert die VIP auf dem Server und sendet ein **Gratuitous ARP (GARP)**. Externe Hardware ist nicht erforderlich. Dies ist die transparenteste Lösung.
  * **Verschiedene Subnetze mit Load Balancer:** Der Load Balancer nutzt die SafeKit-**Zustandsprüfung**, um den Datenverkehr an den richtigen Server zu senden. Lassen Sie die VIP zusätzlich lokal auf dem primären Server konfiguriert.
  * **Verschiedene Subnetze mit Cloud-Provider-CLIs:** Das SafeKit-Skript `start_prim` ruft die Cloud-CLI auf, um die VIP zu verschieben (das Skript wird vom Integrator erstellt).
  * **Verschiedene Subnetze mit BGP:** Der primäre Server kündigt die VIP bei den Routern an (Skript vom Integrator erstellt).

Der Artikel erklärt außerdem, warum **DNS-Umleitung** keine zuverlässige Alternative zu einer VIP ist.

![Vergleich des Verhaltens virtueller IP-Adressen (VIP) in Evidian SafeKit: Mirror-Cluster mit einer Floating IP auf dem aktiven Knoten und Farm-Cluster mit Netzwerklastausgleich über alle Knoten.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementierung virtueller IP-Adressen in Mirror- und <span class="notranslate farm-term" translate="no">Farm</span>-Clustern mit SafeKit.**


{{%  insert-safekit-4-buttons-de  %}}
 

## Inhaltsverzeichnis {#table-of-contents}

  * [Funktionsweise einer virtuellen IP-Adresse (VIP) beim Failover im selben Subnetz (Mirror-Cluster)](#virtual-ip-same-subnet-failover)
  * [Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit einem Load Balancer (Mirror-Cluster)](#virtual-ip-different-subnets-failover)
  * [Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit Cloud-Provider-CLIs (Mirror-Cluster)](#virtual-ip-cloud-cli-failover)
  * [Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit BGP (Mirror-Cluster)](#virtual-ip-bgp-failover)
  * [Funktionsweise einer lastverteilten virtuellen IP-Adresse in einer Farm im selben Subnetz (Farm-Cluster)](#vip-load-balancing-same-subnet)
  * [Funktionsweise einer lastverteilten virtuellen IP-Adresse über verschiedene Subnetze (Farm-Cluster)](#vip-load-balancing-different-subnets)
  * [Virtuelle IP-Adresse vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt](#virtual-ip-vs-dns-redirection-failover)
  * [Vergleich: Implementierung virtueller IP-Adressen, Latenz und Anwendungstransparenz](#vip-vs-dns-comparison)
  * [Konfiguration einer virtuellen IP-Adresse für Netzwerklastverteilung und Hochverfügbarkeit](#virtual-ip-configuration-load-balancing-ha)
  * [Häufig gestellte Fragen zu virtuellen IP-Adressen (VIP)](#virtual-ip-faq)
  * [🔍 SafeKit-Navigationshub für Hochverfügbarkeit](#hub)


## Funktionsweise einer virtuellen IP-Adresse (VIP) beim Failover im selben Subnetz (Mirror-Cluster) {#virtual-ip-same-subnet-failover}

- [Testen der primären/Backup-virtuellen IP-Adresse in einem SafeKit-Mirror-Cluster](/de/best-practises/test-primary-backup-vip-mirror/)

### Automatisches Failover und Netzwerkumleitung im lokalen Subnetz {#automated-failover--network-rerouting-in-a-local-subnet}

In einem lokalen Netzwerk verwaltet **SafeKit für lokale Netzwerkcluster** die virtuelle IP-Adresse und das Anwendungs-Failover automatisch.

### Lokaler Mirror-Cluster: Failover mit zwei Knoten unter Windows oder Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![SafeKit-VIP-Failover zwischen zwei Servern im selben Subnetz](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In einem **SafeKit-Mirror-Cluster** befinden sich die beiden Knoten im selben Subnetz. Die Hochverfügbarkeit nutzt eine **virtuelle IP-Adresse (VIP)**. SafeKit verwaltet die VIP im Netzwerk-Stack des Betriebssystems; spezielle Hardware ist nicht erforderlich. Die VIP wird mithilfe von **IP-Aliasing** zu den physischen IP-Adressen von Server 1 und Server 2 hinzugefügt. Clients verbinden sich immer mit der VIP.

#### IP-Aliasing und mehrere VIPs in SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Die VIP ist eine dritte IP-Adresse, die zwischen den Knoten wechselt. SafeKit kann **mehrere virtuelle IP-Adressen** in einem Cluster verwalten. Sie können auf derselben oder auf verschiedenen Netzwerkkarten eingerichtet werden, sodass jeder Dienst seine eigene VIP verwenden kann.

#### Failover-Mechanismus: Gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Für ein Failover ist kein manueller Eingriff erforderlich. Im Normalbetrieb ist die VIP der **MAC-Adresse von Server 1 (mac1)** zugeordnet. Fällt Server 1 aus, führt SafeKit drei Schritte aus:

  * **Anwendungswiederherstellung:** SafeKit startet die Anwendungsdienste auf Server 2 neu.
  * **VIP-Aliasing:** SafeKit konfiguriert die VIP als Alias auf der Netzwerkkarte von Server 2, dem neuen primären Server. Das Betriebssystem sendet anschließend Nachrichten im Netzwerk, um die VIP anzukündigen.
  * **GARP:** SafeKit sendet außerdem eine **Gratuitous-ARP-Nachricht (GARP)**. Netzwerk-Switches und Clients aktualisieren ihren ARP-Cache. Die VIP ist nun der **MAC-Adresse von Server 2 (mac2)** zugeordnet.

#### Entfernte Rechenzentren und erweiterte VLANs {#remote-data-centers--extended-vlans}

Die **Lösung im selben Subnetz** eignet sich auch für **Disaster Recovery (DR)** zwischen entfernten Standorten, wenn diese über ein **erweitertes LAN oder ein gestrecktes VLAN** verbunden sind. Beide Standorte befinden sich dann in einem Subnetz. Das vereinfacht das Netzwerk und macht komplexe Routing-Protokolle überflüssig.

> **⚠️ Hinweis:** Layer-2-Rerouting mit Gratuitous ARP ist die transparenteste Lösung für Anwendungen. Ein Load Balancer routet auf Layer 3 um und übersetzt IP-Adressen (**SNAT/DNAT**); Gratuitous ARP übersetzt keine Adressen. Die Anwendung empfängt die ursprüngliche Client-IP-Adresse, und die virtuelle IP ist lokal konfiguriert. **Viele Anwendungen benötigen** eine lokale VIP und die ursprüngliche Client-IP-Adresse, um korrekt zu funktionieren.

## Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit einem Load Balancer (Mirror-Cluster) {#virtual-ip-different-subnets-failover}

### Load Balancer mit SafeKit-Zustandsprüfungen {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagramm eines VIP-Failovers mit einem Load Balancer über zwei verschiedene Subnetze](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Wenn sich die Knoten in **verschiedenen Subnetzen** befinden, kann Gratuitous ARP die VIP nicht verschieben. In diesem Fall liegt die VIP auf einem **Load Balancer**, der den Datenverkehr an den primären Server sendet.

SafeKit stellt auf jedem Knoten eine **URL für die Zustandsprüfung** bereit:

  * **Primär (PRIM):** liefert `HTTP 200 OK`. Der Load Balancer sendet den Datenverkehr an diesen Knoten.
  * **Sekundär (SECOND):** liefert `HTTP 404 NOT FOUND`. Der Load Balancer sendet keinen Datenverkehr an diesen Knoten.

Bei einem Failover ändert SafeKit die Antworten, und der Load Balancer sendet den Datenverkehr an den neuen primären Server. Dies ist die Standardlösung bei [**AWS**](</de/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</de/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) und [**Google Cloud**](</de/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Hinweis:** SafeKit stellt die Zustandsprüfung bereit. Ihr Netzwerk oder Cloud-Anbieter stellt den Load Balancer bereit.

### Das Problem: Der Load Balancer besitzt die VIP {#the-load-balancer-pitfall-vip-on-the-frontend-nat-to-the-physical-ip}

Bei einem Load Balancer allein verbinden sich Clients mit der VIP. Der Load Balancer übersetzt die VIP per NAT in die **physische IP-Adresse** des primären Servers. Der Client verwendet die VIP, der Server jedoch seine physische IP-Adresse. Der Server sieht die VIP nicht.

### Die VIP lokal auf dem primären Server konfigurieren {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Anwendungen wie **Milestone XProtect** oder **Nedap AEOS** verwenden die VIP als Serveradresse. Sie funktionieren nur dann korrekt, wenn die VIP auch **lokal auf dem primären Server konfiguriert** ist. Dann gilt:

  * Die Dienste können mit der VIP gestartet werden.
  * Der Server kann seine eigenen Dienste über die VIP erreichen.
  * Die Authentifizierung funktioniert mit der VIP.

**Bewährte Vorgehensweise:** Lassen Sie den Abschnitt `<vip>` im SafeKit-Modul auch dann aktiviert, wenn Sie einen Load Balancer verwenden. Wählen Sie einen Modus, bei dem die VIP die Zieladresse bleibt, zum Beispiel Floating IP oder Direct Server Return.

### Alternativen zu einem Load Balancer {#network-considerations-load-balancer-vs-extended-lan}

  * Ein **erweitertes LAN (gestrecktes VLAN)** zwischen den Subnetzen ermöglicht die einfachere Lösung im selben Subnetz.
  * [Cloud-Provider-CLIs in Failover-Skripten](#virtual-ip-cloud-cli-failover).
  * [Ankündigung von BGP-Routen](#virtual-ip-bgp-failover).

## Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit Cloud-Provider-CLIs (Mirror-Cluster) {#virtual-ip-cloud-cli-failover}

### Warum Gratuitous ARP in der Cloud nicht funktioniert {#why-gratuitous-arp-does-not-work-in-public-clouds}

Cloud-Netzwerke (AWS, Azure, Google Cloud) **ignorieren Gratuitous ARP**. Sie senden Datenverkehr nur an IP-Adressen, die der Cloud-Plattform zugewiesen sind. SafeKit konfiguriert die VIP auf dem primären Server, aber das Cloud-Netzwerk leitet den VIP-Datenverkehr nicht an diesen Server weiter.

### Die VIP mit der Cloud-CLI verschieben {#moving-the-vip-through-the-cloud-api-in-safekit-failover-scripts}

Ohne Load Balancer kann das SafeKit-Skript **`start_prim`** die Cloud-Provider-CLI verwenden, um die VIP auf den neuen primären Server zu verschieben. Das Skript kann dem neuen primären Server die private IP zuweisen oder eine Cloud-Route zur VIP ändern.

Die **VIP bleibt lokal** auf dem primären Server. Es gibt **kein NAT**, und die ursprüngliche Client-IP-Adresse ändert sich nicht.

### Verantwortung des Integrators {#integrator-responsibility}

Der **Integrator** muss die Cloud-CLI-Befehle zum Skript `start_prim` hinzufügen. Diese Befehle werden **nicht mit dem SafeKit-Produkt bereitgestellt**. Sie hängen vom Cloud-Anbieter, dem Netzwerkdesign und den Sicherheitsregeln des Kunden ab.

### Einschränkungen {#constraints-of-the-cli-approach}

  * Die Cloud-CLI muss auf beiden Knoten installiert sein. Jeder Knoten benötigt eine Cloud-Identität mit Netzwerkberechtigungen.
  * Das Skript muss Fehler und Wiederholungsversuche behandeln.
  * Das Failover ist wahrscheinlich langsamer als mit einem Load Balancer.
  * **Diese Konfiguration ist nicht validiert.** Testen Sie sie vor dem Einsatz in der Produktion.

## Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze mit BGP (Mirror-Cluster) {#virtual-ip-bgp-failover}

### VIP-Rerouting mit BGP {#layer-3-vip-rerouting-with-bgp-route-advertisement}

Bei **BGP (Border Gateway Protocol)** ist die VIP lokal auf dem primären Server konfiguriert. Dieser **kündigt die VIP den Routern** als /32-Route an.

  * **Normalbetrieb:** Nur der primäre Server kündigt die VIP an.
  * **Failover:** Das Skript `start_prim` startet die Ankündigung auf dem neuen primären Server. `stop_prim` beendet sie auf dem alten primären Server. Stürzt der primäre Server ab, wird seine Route automatisch entfernt.

### Vorteile und Voraussetzungen {#benefits-and-prerequisites}

  * **Die VIP bleibt lokal, es gibt kein NAT und die Client-IP-Adresse ändert sich nicht.** Anwendungen wie Milestone XProtect oder Nedap AEOS funktionieren wie in einem Cluster im selben Subnetz.
  * Die Lösung funktioniert über Subnetze und Standorte hinweg. Ein gestrecktes VLAN ist nicht erforderlich.
  * Sie benötigen BGP-Router und Unterstützung durch Ihr Netzwerkteam. In der Cloud ist ein Route-Server-Dienst des Cloud-Anbieters erforderlich.

> **⚠️ Hinweis:** Die BGP-Integration verwendet SafeKit-Skripte und Ihre Routing-Infrastruktur. Der **Integrator** muss die BGP-Befehle zum Ankündigen und Entfernen der Route in den Skripten `start_prim` und `stop_prim` schreiben. Diese Skripte werden **nicht mit dem SafeKit-Produkt bereitgestellt**. Validieren Sie die Lösung vor dem Produktionseinsatz gemeinsam mit Ihrem Netzwerkteam.

### Vergleich der Methoden über verschiedene Subnetze {#comparison-cross-subnet-vip-methods}

| Methode | VIP lokal auf primärem Server | NAT | Wichtigste Voraussetzung |
|---|---|---|---|
| **Nur Load Balancer** | Nein | Ja | Load Balancer |
| **Load Balancer + SafeKit-VIP** | Ja | Nein (Floating IP / DSR) | Load Balancer |
| **Cloud-CLI** | Ja | Nein | Cloud-CLI und Berechtigungen |
| **BGP** | Ja | Nein | BGP-Router |
| **Erweitertes LAN + GARP** | Ja | Nein | Gestrecktes VLAN |

## Funktionsweise einer lastverteilten virtuellen IP-Adresse in einer Farm im selben Subnetz (Farm-Cluster) {#vip-load-balancing-same-subnet}

- [Lastverteilung mit einer virtuellen IP-Adresse in einem SafeKit-Farm-Cluster testen](/de/best-practises/test-load-balancing-vip-farm/)

### Skalierbare Leistung: Lastverteilung im Kernel mit Redundanz {#scalable-performance-kernel-level-load-balancing--redundancy}

Bei hohem Datenverkehr kann SafeKit die Arbeit auf mehrere aktive Server verteilen. Fällt ein Server aus, arbeiten die anderen weiter.

### Farm-Clusterarchitektur: Lastverteilung zwischen Windows- oder Linux-Knoten {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagramm einer lastverteilten virtuellen IP-Adresse (VIP) in einem Farm-Cluster im selben Subnetz](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In einem **Farm-Cluster mit Lastverteilung** verbinden sich Clients mit einer virtuellen IP-Adresse (VIP), und die Anfragen werden gleichzeitig auf mehrere Server verteilt. Das Beispiel zeigt zwei Knoten; weitere Server können hinzugefügt werden. Im selben Subnetz wird die VIP per IP-Aliasing auf der Netzwerkkarte **jedes Servers** im Cluster konfiguriert.

#### Verkehrsverteilung: der Kernel-Filter {#traffic-distribution-the-kernel-level-filter}

In einem <span class="notranslate farm-term" translate="no">Farm</span>-Cluster verteilt ein SafeKit-**Filter im Kernel** den Datenverkehr:

  * **ARP-Zuordnung:** Im ARP-Cache der Clients ist die VIP einer MAC-Adresse zugeordnet, zum Beispiel `mac1` von Server 1.
  * **Paketprüfung:** Server 1 empfängt die Pakete. Der SafeKit-Kernel-Filter liest die **Client-IP-Adresse** oder den **TCP-Port** jedes Pakets.
  * **Lastverteilung:** Der Filter entscheidet, welche Pakete Server 1 verarbeitet und welche an andere Knoten, etwa Server 2, weitergeleitet werden.

#### Failover und Umleitung mit Gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Fällt Server 1 aus, sendet SafeKit eine **Gratuitous-ARP-Nachricht (GARP)**. Die Clients aktualisieren ihren ARP-Cache mit `mac2` von Server 2. Anschließend wird der Datenverkehr sofort an die übrigen Farm-Knoten geleitet.

#### Einsatz an entfernten Standorten {#deployment-in-remote-sites}

Die Lastverteilung funktioniert auch zwischen **entfernten Rechenzentren**, wenn die Standorte über ein **erweitertes LAN oder VLAN** verbunden sind. Dann liegen alle Standorte im selben Subnetz. Dies ist eine effiziente Konfiguration für Farm-Cluster über mehrere Standorte.

## Funktionsweise einer lastverteilten virtuellen IP-Adresse über verschiedene Subnetze (Farm-Cluster) {#vip-load-balancing-different-subnets}

### Skalierung über mehrere Zonen: Datenverkehr zwischen Cloud-Subnetzen {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Ein <span class="notranslate farm-term" translate="no">Farm</span>-Cluster kann die Anwendungsarbeit über mehrere Verfügbarkeitszonen und Subnetze verteilen.

### Subnetzübergreifende Farm-Cluster: mehrere Windows- oder Linux-Knoten {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagramm eines lastverteilten Farm-Clusters über zwei verschiedene Subnetze](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Wenn sich die Farm-Knoten in **verschiedenen Subnetzen** befinden, zum Beispiel in mehreren Cloud-Verfügbarkeitszonen, liegt die **virtuelle IP-Adresse (VIP)** auf einem externen **Load Balancer (LB)**. Dieser leitet den Datenverkehr an die physischen IP-Adressen der Server in den jeweiligen Subnetzen weiter.

#### Regeln für Datenverkehr und Lastverteilung {#intelligent-traffic-routing--load-balancing-rules}

Der Load Balancer verteilt Client-Anfragen nach zwei Kriterien:

  * **Lastverteilungsregeln:** zum Beispiel die Client-IP-Adresse oder der TCP-Port des Clients.
  * **Verfügbarkeit der Knoten:** Der Load Balancer sendet Datenverkehr nur an gesunde Knoten, ermittelt anhand der SafeKit-Zustandsprüfung.

> **⚠️ Hinweis:** SafeKit stellt die Zustandsprüfung bereit. Ihr Netzwerk oder Cloud-Anbieter stellt den Load Balancer bereit.

#### SafeKit-Zustandsprüfung {#safekit-health-check-mechanism}

SafeKit stellt auf jedem Farm-Server eine **URL für die Zustandsprüfung** bereit. Der Load Balancer verwendet sie, um den Status der Server zu ermitteln:

  * **Knoten verfügbar:** Die Zustandsprüfung liefert `HTTP 200 OK`. Der Load Balancer sendet Datenverkehr an diesen Server.
  * **Knoten nicht verfügbar:** Fällt ein Server oder eine Anwendung aus, liefert SafeKit `HTTP 404 NOT FOUND` (oder der Server antwortet nicht). Der Load Balancer sendet dann keinen Datenverkehr mehr an diesen Knoten.

#### Cloud-Bereitstellung: AWS, Azure und GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Dies ist die Standardarchitektur für **Farm-Cluster in der Cloud**. Fällt ein Subnetz oder eine Zone aus, verarbeiten die übrigen Knoten den Datenverkehr weiter. Unterstützt wird die Lösung von:

  * 💡 [**Amazon AWS**](</de/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer)
  * 💡 [**Microsoft Azure**](</de/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer)
  * 💡 [**Google Cloud (GCP)**](</de/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## Virtuelle IP-Adresse vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt {#virtual-ip-vs-dns-redirection-failover}

### Das DNS-Verzögerungsproblem: Warum eine VIP besser ist als DNS-Umleitung {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

DNS-Failover kann zuverlässig wirken, ist es aber nicht. Ein DNS-Eintrag wird geändert, damit er auf einen Backup-Server verweist. Es lässt sich jedoch nicht kontrollieren, **wann** die Clients die Änderung sehen. Die Änderung durchläuft viele DNS-Server, die nicht unter Ihrer Kontrolle stehen. DNS-Umleitung kann deshalb keine unterbrechungsfreie Verfügbarkeit gewährleisten.

### Beispiel: DNS-Auflösung und blockierte Clients {#the-technical-scenario-dns-resolution-and-the-stuck-client}

Benutzer verbinden sich mit einem **virtuellen Namen** (dem DNS-Namen). Das DNS-System übersetzt diesen Namen in eine **physische IP-Adresse**.

![Diagramm zur Auflösung eines DNS-Namens in die physische IP-Adresse 1 in einem Hochverfügbarkeitscluster](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

DNS-Auflösung: Clients bleiben in einem Hochverfügbarkeitscluster auf der physischen IP-Adresse 1 hängen.

#### Vor dem Failover: Der Name verweist auf die physische IP-Adresse 1 {#current-state-resolution-to-physical-ip-1}

**Client 1** und **Client 2** fragen beim DNS-System die IP-Adresse des virtuellen Namens ab. Das DNS-System gibt **die physische IP-Adresse 1** zurück. Anschließend öffnen die Clients eine Netzwerkverbindung (Socket) zu dieser Adresse.

#### Nach dem Failover: Der Name muss auf die physische IP-Adresse 2 verweisen {#the-failover-challenge-rerouting-to-physical-ip-2}

Fällt der Server mit der physischen IP-Adresse 1 aus, ändert ein Administrator den DNS-Eintrag in **physische IP-Adresse 2**. Die Clients verbinden sich nur dann mit der neuen Adresse, wenn alle folgenden Bedingungen erfüllt sind:

  * Die **TTL (Time to Live)** ist auf allen DNS-Servern zwischen Client und DNS-Eintrag abgelaufen.
  * Der lokale DNS-Cache von Client 1 und Client 2 ist leer.
  * Die Anwendung beendet ihre Verbindung und führt eine **neue** DNS-Abfrage durch.

Ist eine Bedingung nicht erfüllt, bleiben **Client 1 und Client 2 auf der nicht erreichbaren physischen IP-Adresse 1 hängen**. Der Dienst fällt aus, obwohl der DNS-Eintrag korrekt ist.

### Zwei nicht kontrollierbare Probleme bei der DNS-Umleitung {#the-two-black-boxes-of-dns-redirection}

  * **DNS-Cache:** Viele Internetanbieter und Unternehmens-DNS-Server ignorieren kurze TTL-Werte und speichern die alte physische IP-Adresse minuten- oder stundenlang.
  * **Verhalten der Anwendung:** Viele Anwendungen, etwa Java-Dienste oder Webbrowser, fragen den DNS-Namen nur einmal beim Start ab. Sie verwenden weiterhin die erste IP-Adresse, selbst wenn der DNS-Eintrag geändert wurde.

### Fazit {#conclusion}

DNS-Umleitung ist keine zuverlässige Hochverfügbarkeitslösung. Verwenden Sie für ein sofortiges Failover in einem lokalen oder regionalen Netzwerk eine **virtuelle IP-Adresse (VIP)**.

## Vergleich: Implementierung virtueller IP-Adressen, Latenz und Anwendungstransparenz {#vip-vs-dns-comparison}

**Vergleich von VIP- und DNS-Umleitungsmethoden für Hochverfügbarkeit und Disaster Recovery.**

Umgebung und Anwendungsfall | Hochverfügbarkeitstyp | Umleitungsmethode | Netzwerklatenz | Anwendungstransparenz und lokale IP-Adresse  
---|---|---|---|---  
Primär/Backup (Hochverfügbarkeit) | Mirror-Cluster | Gratuitous ARP / MAC-Übernahme | Sehr niedrig: Zeit zur Erkennung des Fehlers und zum Senden des GARP | Vollständig transparent: Die VIP ist lokal auf dem aktiven Knoten. Die Client-IP-Adresse ändert sich nicht.  
Lastverteilung (aktiv/aktiv) | <span class="notranslate farm-term" translate="no">Farm</span>-Cluster | Kernel-Netzwerkfilter / GARP | Sehr niedrig: Zeit zur Fehlererkennung und Änderung der Netzwerkfilter | Vollständig transparent: Die VIP ist auf allen Knoten lokal. Die Client-IP-Adresse ändert sich nicht.  
Gleiches Subnetz / erweitertes LAN (gestrecktes VLAN) | Disaster Recovery (entfernte Rechenzentren) | IP-Aliasing / GARP | Niedrig: abhängig von der Round-Trip-Zeit (RTT) des gestreckten VLANs | Vollständig transparent: Die VIP ist lokal auf den Knoten. Die Client-IP-Adresse ändert sich nicht.  
Verschiedene Subnetze: nur Load Balancer | Disaster Recovery (entfernte Rechenzentren / Cloud) | Externer Load Balancer | Mittel: abhängig vom Intervall der Zustandsprüfung des Load Balancers | ⚠️ Teilweise transparent: SNAT/DNAT wird verwendet. Die VIP ist **NICHT** lokal auf den Knoten; die Client-IP-Adresse bleibt möglicherweise **NICHT** erhalten. Die Anwendung muss dies unterstützen.  
Verschiedene Subnetze: Load Balancer + lokale SafeKit-VIP | Disaster Recovery (entfernte Rechenzentren / Cloud) | Externer Load Balancer mit Floating IP / Direct Server Return | Mittel: abhängig vom Intervall der Zustandsprüfung des Load Balancers | Gute Transparenz: Die VIP ist lokal auf dem primären Knoten und bleibt die Zieladresse. Die Client-IP-Adresse ändert sich nicht. Mit der Anwendung testen.  
Verschiedene Subnetze: Cloud-CLI | Disaster Recovery (Cloud) | Cloud-CLI-Befehle im Skript `start_prim` (vom Integrator geschrieben) | Mittel bis hoch: abhängig von der Antwortzeit der Cloud-API | Vollständig transparent: Die VIP ist lokal auf dem primären Knoten. Die Client-IP-Adresse ändert sich nicht. Nicht validierte Konfiguration.  
Verschiedene Subnetze: BGP | Disaster Recovery (entfernte Rechenzentren / Cloud) | Mit BGP angekündigte /32-Route (Skripte vom Integrator geschrieben) | Niedrig bis mittel: abhängig von der BGP-Konvergenzzeit | Vollständig transparent: Die VIP ist lokal auf dem primären Knoten. Die Client-IP-Adresse ändert sich nicht. BGP-Router erforderlich.  
DNS-Umleitung: keine VIP | Disaster Recovery (entfernte Rechenzentren) | DNS-Eintrag ändern (Name / physische IP-Adresse) | Hoch und unvorhersehbar: abhängig von DNS-TTL und Client-DNS-Cache | ⚠️ Unzuverlässig: Der Client muss den DNS-Namen erneut auflösen. Häufig verwenden Clients weiterhin die beim Start erhaltene alte IP-Adresse und werden nach dem Failover nicht umgeleitet.  
  
## Konfigurieren einer virtuellen IP-Adresse für Netzwerklastausgleich und Hochverfügbarkeit {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-de  %}}
 

## Häufig gestellte Fragen zu virtuellen IP-Adressen (VIP) {#virtual-ip-faq}

### Virtuelle IP-Adresse (VIP) und Netzwerk {#virtual-ip-vip--networking}

Was ist eine virtuelle IP-Adresse (VIP), und worin unterscheidet sie sich von einer physischen IP-Adresse?

Eine **physische IP-Adresse** ist an eine Netzwerkkarte gebunden. Eine **virtuelle IP-Adresse (VIP)** ist nicht an Hardware gebunden. In einem SafeKit-Cluster verwenden Clients immer die VIP. Fällt der primäre Server aus, wechselt die VIP automatisch zu einem verfügbaren Knoten. Die Client-Konfiguration muss nicht geändert werden.

Benötige ich einen Hardware-Load-Balancer für eine virtuelle IP-Adresse?

Nein. **SafeKit** verwaltet die virtuelle IP-Adresse per Software. Im selben Subnetz verwendet SafeKit **IP-Aliasing** und **Gratuitous ARP (GARP)**, um den Datenverkehr umzuleiten. Ein externer Load Balancer oder Proxyserver ist nicht erforderlich.

Was ist Gratuitous ARP (GARP), und warum wird es verwendet?

**Gratuitous ARP (GARP)** ist eine Netzwerknachricht, die an Geräte gesendet wird und die ARP-Tabellen von Switches und Routern aktualisiert. Bei einem Failover kündigt der neue primäre Server damit an, dass die **virtuelle IP-Adresse** nun seiner MAC-Adresse zugeordnet ist. Der Datenverkehr wird anschließend umgeleitet.

Kann ich einer virtuellen IP-Adresse einen DNS-Namen zuordnen?

**Ja.** Erstellen Sie einen regulären A-Eintrag für die VIP. Die Umleitung erfolgt auf **VIP-Ebene** (über ARP oder Netzwerk-Rerouting), **nicht auf DNS-Ebene**. DNS-Verzögerungen oder TTL-Probleme treten dadurch nicht auf, und das Failover bleibt für die Anwendung transparent.

### Cloud und erweiterte Architekturen {#cloud--advanced-architectures}

Wie funktioniert eine virtuelle IP-Adresse in der Cloud (AWS, Azure, GCP)?

In der Cloud ist Layer 2 (ARP) eingeschränkt. SafeKit arbeitet mit **Cloud-Load-Balancern** (AWS ELB, Azure LB oder Google GCLB). SafeKit stellt eine **URL für die Zustandsprüfung** bereit. Der Load Balancer fragt sie ab und sendet den Datenverkehr mit SNAT/DNAT an den aktiven Knoten.

Ist ein erweitertes LAN für Disaster Recovery besser als ein Load Balancer?

**Ja.** Zwischen entfernten Rechenzentren ist ein **erweitertes LAN (gestrecktes VLAN)** oft besser, weil das Failover für die Anwendung **transparent** bleibt. Die **virtuelle IP-Adresse ändert sich nicht**; Anwendung und Clients verwenden nach einem Failover zwischen Rechenzentren weiterhin dieselbe Adresse.

Welche Nachteile hat DNS-Umleitung gegenüber einer virtuellen IP-Adresse?

**DNS-Umleitung** hängt von der **TTL (Time to Live)** und dem DNS-Cache der Clients ab. Die Wiederherstellung kann Stunden dauern. Außerdem bleiben **Clients ohne erneute DNS-Abfrage auf dem ausgefallenen Server hängen**. Eine **virtuelle IP-Adresse** leitet den Datenverkehr sofort auf Layer 2 um, unabhängig vom DNS-Cache des Clients.

### Transparenz und Sicherheit {#transparency--security}

Warum ist eine lokale virtuelle IP-Adresse für die Anwendungstransparenz wichtig?

Mit einer lokalen **virtuellen IP-Adresse (VIP)** verwendet die Anwendung eine gleichbleibende Adresse. SafeKit führt das Rerouting im **Kernel** aus, sodass die Anwendung das Failover nicht bemerkt. Bei DNAT ändert sich dagegen die von der Anwendung verwendete Adresse.

Bleibt die ursprüngliche Client-IP-Adresse bei einer virtuellen IP-Adresse erhalten?

Ja. SafeKit verwendet kein Source NAT (SNAT). Da die VIP lokal auf dem aktiven Server liegt, erhält die Anwendung die **ursprüngliche Client-IP-Adresse**.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}