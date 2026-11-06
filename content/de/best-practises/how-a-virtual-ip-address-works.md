---
title: "Wie funktioniert eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?"
canonical: "https://safekit.eviden.com/de/best-practises/how-a-virtual-ip-address-works/"
description: "Wie SafeKit eine virtuelle IP-Adresse bei einem Failover verschiebt: Gratuitous ARP im selben Subnetz, Load Balancer, Cloud-CLI oder BGP über Subnetze hinweg. Warum eine lokale virtuelle IP-Adresse wichtig ist."
category: "best-practises"
lang: "de"
topics: "Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?, Implementierung einer virtuellen IP in SafeKit, Wie eine virtuelle IP im selben Subnetz funktioniert (Mirror-Cluster), Wie eine virtuelle IP über verschiedene Subnetze mit einem Load Balancer funktioniert (Mirror-Cluster), Wie eine virtuelle IP über verschiedene Subnetze mit Cloud-Provider-CLIs funktioniert (Mirror-Cluster), Wie eine virtuelle IP über verschiedene Subnetze mit BGP funktioniert (Mirror-Cluster), Wie die DNS-Umleitung über verschiedene Subnetze funktioniert (Mirror-Cluster), Wie das Lastausgleichsverfahren für virtuelle IPs in einem Farm-Cluster im selben Subnetz funktioniert, Wie eine lastausgeglichene virtuelle IP über verschiedene Subnetze funktioniert (Farm-Cluster), Vergleich: Implementierung virtueller IPs, Latenz und Anwendungstransparenz, Häufig gestellte Fragen zu virtuellen IPs, 🔍 SafeKit erkunden"
translation: "translate_md 2026-11-05.13 | glossaire 2026-11-05.17 | Translation LLM | 17 expressions"
---

# Wie funktioniert eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#virtual-ip-definition}

Eine **virtuelle IP-Adresse** ist die einzelne Adresse, die Clients verwenden, um eine Verbindung zu einer Anwendung in einem [Hochverfügbarkeitscluster](</de/>) herzustellen. Die virtuelle IP-Adresse ist nicht mit einem Server verknüpft. Bei einem Failover wird sie auf den Server verschoben, auf dem die Anwendung ausgeführt wird. Clients müssen ihre Konfiguration nicht ändern.

**Schlüsselprinzip in SafeKit:** Die virtuelle IP wird **lokal auf dem Server konfiguriert**, auf dem die Anwendung läuft. Die Anwendung startet auf der virtuellen IP und empfängt die ursprüngliche Client-IP. Aus diesem Grund funktionieren viele Anwendungen ohne Änderungen korrekt mit SafeKit. SafeKit bietet zwei Arten von virtuellen IPs:

  * **Primäre/sekundäre virtuelle IP mit einem Mirror-Cluster:** Die virtuelle IP ist nur auf dem primären Server aktiv. Bei einem Failover wird sie auf den sekundären Server verschoben.
  * **Netzwerklastenausgleich mit virtueller IP und <span class="notranslate farm-term" translate="no">Farm</span>-Cluster:** Die virtuelle IP ist gleichzeitig auf allen Servern aktiv. Der Datenverkehr wird zwischen ihnen aufgeteilt.

## Implementierung von virtuellen IPs in SafeKit {#safekit-virtual-ip-implementation}

Dieser Artikel erklärt, wie SafeKit die virtuelle IP-Adresse in jeder Netzwerkarchitektur verschiebt:

  * **Gleiches Subnetz oder Stretched VLAN ([mirror](#virtual-ip-same-subnet-failover) und [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet) Cluster):** SafeKit konfiguriert die virtuelle IP auf dem Server und sendet ein **Gratuitous ARP (GARP)**. Es ist keine externe Hardware erforderlich. Dies ist die transparenteste Lösung (alles wird durch das SafeKit-Produkt implementiert).
  * **Unterschiedliche Subnetze mit einem Load Balancer ([mirror](#virtual-ip-different-subnets-failover) und [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets) Cluster):** Der Load Balancer verwendet die SafeKit **-Zuständigkeitsprüfung**, um den Datenverkehr an den richtigen Server zu senden (der Load Balancer wird vom Integrator konfiguriert).
  * **[Unterschiedliche Subnetze mit Cloud-Provider-CLIs](#virtual-ip-cloud-cli-failover) (Mirror-Cluster):** Das SafeKit-Skript `start_prim` ruft die Cloud-CLI auf, um die virtuelle IP zu verschieben (Skript vom Integrator geschrieben).
  * **[Unterschiedliche Subnetze mit BGP](#virtual-ip-bgp-failover) (Mirror-Cluster):** Der primäre Server kündigt die virtuelle IP-Adresse bei den Routern an (vom Integrator geschriebenes Skript).
  * **[Unterschiedliche Subnetze mit DNS-Umleitung](#virtual-ip-vs-dns-redirection-failover) (Mirror-Cluster):** Das SafeKit `start_prim`-Skript ändert den DNS-Eintrag des virtuellen Namens in die physische IP-Adresse des neuen primären Servers (Skript vom Integrator geschrieben). Es gibt keine einzelne virtuelle IP, und diese Methode ist nicht für alle Clients zuverlässig.

Auch in diesem Artikel:

  * [Vergleich: Implementierung virtueller IPs, Latenz und Anwendungstransparenz](#virtual-ip-methods-comparison)
  * [Häufig gestellte Fragen zu virtuellen IPs](#virtual-ip-faq)
  * [🔍 SafeKit entdecken](#hub)

![Vergleichsdiagramm des virtuellen IP-Verhaltens in Eviden SafeKit: Mirror-Cluster mit einer Floating-IP auf dem aktiven Knoten im Vergleich zu Farm-Cluster mit Netzwerklastverteilung über alle Knoten hinweg.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementierung einer virtuellen IP für Mirror- und <span class="notranslate farm-term" translate="no">Farm</span>-Cluster in SafeKit.**

## Funktionsweise einer virtuellen IP-Adresse im selben Subnetz (Mirror-Cluster) {#virtual-ip-same-subnet-failover}

- [Testen der primären/sekundären virtuellen IP-Adresse in einem SafeKit Mirror-Cluster](/de/best-practises/test-primary-backup-vip-mirror/)

### Automatische Fehlerübernahme und Netzwerk-Neuzuordnung in einem lokalen Subnetz {#automated-failover--network-rerouting-in-a-local-subnet}

In einem lokalen Netzwerk verwaltet **SafeKit** die virtuelle IP und das Anwendungs-Failover automatisch.

### Lokaler Mirror-Cluster: 2-Knoten-Failover unter Windows oder Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit-Mechanismus für virtuelles IP-Failover zwischen zwei Servern im selben Subnetz](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In einem **SafeKit- Mirror-Cluster** befinden sich die beiden Knoten im selben Subnetz. Hochverfügbarkeit verwendet eine **virtuelle IP**. SafeKit verwaltet die virtuelle IP im Netzwerkstapel des Betriebssystems. Es ist keine spezielle Hardware erforderlich. Die virtuelle IP wird den physischen IP-Adressen von Server 1 und Server 2 mit **IP-Aliasing** hinzugefügt. Clients verbinden sich immer mit der virtuellen IP.

#### IP-Aliasing und mehrere virtuelle IPs in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

Die virtuelle IP ist eine dritte IP-Adresse, die zwischen den Knoten wechselt. SafeKit kann **mehrere virtuelle IPs** in einem Cluster verwalten. Sie können sie auf derselben Netzwerkkarte oder auf verschiedenen Netzwerkkarten platzieren. Auf diese Weise kann jeder Dienst seine eigene virtuelle IP verwenden.

#### Der Failover-Mechanismus: Gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Failover erfordert keine manuelle Aktion. Im Normalbetrieb ist die virtuelle IP-Adresse mit der **MAC-Adresse von Server 1 (mac1)** verknüpft. Wenn Server 1 ausfällt, tut SafeKit drei Dinge:

  * **Virtuelles IP-Aliasing:** SafeKit konfiguriert die virtuelle IP als Alias auf der Netzwerkkarte von Server 2, dem neuen primären Server. Das Betriebssystem sendet dann Nachrichten im Netzwerk, um die virtuelle IP anzukündigen.
  * **GARP:** SafeKit sendet auch **Gratuitous ARP GARP**. Netzwerk-Switches und Clients aktualisieren ihren ARP-Cache. Die virtuelle IP-Adresse ist nun mit der **MAC-Adresse von Server 2 (mac2)** verknüpft.
  * **Anwendungsrecovery:** SafeKit startet die Anwendungsdienste auf Server 2 neu.


#### Remote-Rechenzentren und Stretched VLANs {#remote-data-centers--extended-vlans}

Die **oben beschriebene Lösung für dasselbe Subnetz** funktioniert auch für **die Notfallwiederherstellung** zwischen Remote-Standorten. Sie ist oft die beste Wahl, wenn die Standorte durch ein **Stretched VLAN** (erweitertes LAN) verbunden sind. Beide Standorte befinden sich in einem Subnetz. Das Netzwerk ist einfacher und Sie benötigen keine komplexen Routing-Protokolle.

> **⚠️ Hinweis:** Das Umleiten auf Layer 2 mit Gratuitous ARP ist die **transparenteste Lösung** für Anwendungen. Die Anwendung empfängt die ursprüngliche Client-IP, und die virtuelle IP wird lokal konfiguriert. Viele Anwendungen **benötigen eine lokale virtuelle IP**. Ohne diese **funktionieren diese Anwendungen möglicherweise nicht korrekt**. In diesem Setup mit demselben Subnetz implementiert SafeKit den gesamten Mechanismus, sodass keine spezielle Integrationsarbeit erforderlich ist.

## Wie eine virtuelle IP-Adresse über verschiedene Subnetze hinweg mit einem Load Balancer (Mirror-Cluster) funktioniert {#virtual-ip-different-subnets-failover}

### Load Balancer mit SafeKit-Integritätsprüfungen {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagramm eines virtuellen IP-Failovers mit einem Load Balancer über zwei verschiedene Subnetze](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Wenn sich die Knoten in **verschiedenen Subnetzen** befinden, kann Gratuitous ARP die virtuelle IP nicht verschieben. In diesem Fall befindet sich die virtuelle IP auf einem **Load Balancer**. Der Load Balancer sendet den Datenverkehr an den primären Server.

SafeKit stellt auf jedem Knoten eine **URL für den Systemstatus** bereit:

  * **Primär (PRIM):** Gibt `HTTP 200 OK` zurück. Der Load Balancer leitet den Datenverkehr an diesen Knoten weiter.
  * **Sekundär (SECOND):** Gibt `HTTP 404 NOT FOUND` zurück. Der Load Balancer sendet keinen Datenverkehr an diesen Knoten.

Bei einem Failover ändert SafeKit die Antworten und der Load Balancer sendet den Datenverkehr an den neuen primären Server. Dies ist die Standardlösung zwischen **Verfügbarkeitszonen** auf [**AWS**](</de/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</de/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) und [**Google Cloud**](</de/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Hinweis:** SafeKit bietet den Health-Check. Ihr Netzwerk oder Ihr Cloud-Anbieter stellt den Load Balancer bereit.

### Das Problem: Der Load Balancer besitzt die virtuelle IP-Adresse. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Bei Verwendung eines Load Balancer verbinden sich Clients mit der virtuellen IP. Der Load Balancer übersetzt die virtuelle IP (NAT) in die **physische IP** des primären Servers. Der Client verwendet die virtuelle IP, aber der Server verwendet seine physische IP. Der Server sieht die virtuelle IP nicht.

### Behalten Sie die virtuelle IP-Adresse lokal auf dem primären Server konfiguriert. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Einige Anwendungen verwenden die virtuelle IP-Adresse als Serveradresse. Sie funktionieren nur korrekt, wenn die virtuelle IP-Adresse auch **lokal auf dem primären Server konfiguriert** ist. Dann:

  * Die Dienste können auf der virtuellen IP-Adresse starten;
  * Der Server kann seine eigenen Dienste mit der virtuellen IP-Adresse erreichen;
  * Die Authentifizierung funktioniert mit der virtuellen IP-Adresse.

 Mit SafeKit können Sie die virtuelle IP-Adresse lokal auf dem primären Server konfigurieren. Die Methode hängt vom Subnetz der virtuellen IP-Adresse ab:

  * **Die virtuelle IP-Adresse befindet sich im selben Subnetz wie die physischen IP-Adressen der Server:** Behalten Sie den Abschnitt `<vip>` im SafeKit-Modul bei. SafeKit konfiguriert die virtuelle IP-Adresse automatisch als Alias auf der Netzwerkkarte der physischen IP-Adresse.
  * **Die virtuelle IP-Adresse befindet sich in einem anderen Subnetz:** Behalten Sie den Abschnitt `<vip>` im SafeKit-Modul mit einer spezifischen Konfiguration bei. Das folgende Beispiel zeigt diese Konfiguration unter Azure.
  * **Andere Option für ein anderes Subnetz:** Verwenden Sie das Skript `start_prim` um die virtuelle IP-Adresse auf einer dedizierten Schnittstelle, wie z. B. der loopback Schnittstelle, zu konfigurieren, bevor die Anwendung gestartet wird. Verwenden Sie das Skript `stop_prim`, um die virtuelle IP-Adresse zu entfernen, nachdem die Anwendung gestoppt wurde. Der Integrator schreibt diese Befehle. Sie werden nicht vom SafeKit-Produkt bereitgestellt.

**Hinweis:** Einige Load Balancer können die virtuelle IP-Adresse als Zieladresse beibehalten (z. B. Floating IP oder Direct Server Return).

### Beispiel: Azure- Load Balancer mit einer lokalen virtuellen IP (Milestone XProtect) {#azure-load-balancer-local-virtual-ip-example}

Diese Architektur wird in der Produktion auf Azure für den **Milestone XProtect-Verwaltungsserver** mit dem SafeKit `videoos` Modul verwendet. Die beiden Knoten befinden sich in zwei Verfügbarkeitszonen. Die virtuelle IP-Adresse ist die Frontend-IP-Adresse des Load Balancer. Diese Frontend-IP-Adresse befindet sich in einem dedizierten Subnetz.

**Auf der Azure-Seite** (konfiguriert vom Infrastrukturteam):

  1. Erstellen Sie einen **Layer-4 Load Balancer** mit einer Frontend-IP in einem dedizierten Subnetz.
  2. Fügen Sie die beiden SafeKit-Knoten dem **Backend-Pool** des Load Balancer hinzu.
  3. Fügen Sie eine **Health-Probe** zur SafeKit-Health-Check-URL des Moduls hinzu: Pfad `/var/modules/videoos/ready.txt`, Port `9010` (HTTP) oder Port `9453` (HTTPS mit gültigen Zertifikaten). Ersetzen Sie für ein anderes Modul `videoos` durch den Modulnamen.
  4. Fügen Sie **Lastausgleichsregeln** für alle Ports hinzu, die Clients auf der virtuellen IP-Adresse verwenden: die Ports der Milestone-Verwaltungsdienste und, falls erforderlich, die Ports anderer Dienste.

**Auf der SafeKit-Seite:** Ersetzen Sie in der Datei `userconfig.xml` des Moduls (`videoos/conf/userconfig.xml`) den Standardabschnitt `<vip>` durch diesen Abschnitt:

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

Ersetzen Sie `VM_INTERFACE_NAME` durch den Namen der Netzwerkschnittstelle der VM, `LB_FRONTEND_IP` durch die Frontend-IP des Load Balancer und `LB_FRONTEND_NETMASK` durch die Netzmaske des Frontend-Subnetzes. Die Netzwerkschnittstelle muss auf beiden Knoten denselben Namen haben. Weitere Informationen finden Sie im Benutzerhandbuch, Abschnitt 13.6.4 „ [`<vip>`-Syntax](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) “.

**Auf der Anwendungsseite:** Konfigurieren Sie alle Milestone-Dienste so, dass sie die virtuelle IP-Adresse und nicht die private IP-Adresse des Servers verwenden.

> **⚠️ Hinweis:** Verwenden Sie ein Frontend-Subnetz, das **sich nicht mit dem Subnetz der VMs überschneidet**. Zum Beispiel VMs in `10.0.1.0/24` und Load Balancer Frontend-IP in `10.0.2.0/24`. SafeKit fügt die Frontend-IP mit ihrer Netzmaske zur Netzwerkschnittstelle der VM hinzu. Wenn sich die beiden Subnetze überschneiden, ändert dieser Alias das Routing der VM und der Netzwerkverkehr der VMs kann fehlschlagen.


## Wie eine virtuelle IP-Adresse über verschiedene Subnetze mit Cloud-Provider-CLIs funktioniert (Mirror-Cluster) {#virtual-ip-cloud-cli-failover}

### Warum Gratuitous ARP in der Cloud nicht funktioniert {#why-gratuitous-arp-does-not-work-in-public-clouds}

Cloud-Netzwerke (AWS, Azure, Google Cloud) **ignorieren Gratuitous ARP**. Sie senden Datenverkehr nur an IP-Adressen, die in der Cloud-Plattform zugewiesen sind. SafeKit konfiguriert die virtuelle IP-Adresse auf dem primären Server, aber das Cloud-Netzwerk sendet den virtuellen IP-Verkehr nicht an diesen Server.

### Verschieben der virtuellen IP-Adresse mit der Cloud-CLI {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Ohne einen Load Balancer kann die CLI des Cloud-Anbieters in das SafeKit **`start_prim`-Skript** integriert werden, um die Cloud-Netzwerkkonfiguration zu aktualisieren, bevor die Anwendung gestartet wird. Die CLI kann dem primären Knoten die virtuelle IP-Adresse zuweisen oder die Cloud-Route aktualisieren, um den virtuellen IP-Verkehr zu diesem Knoten zu leiten.

Die **virtuelle IP-Adresse bleibt lokal** auf dem primären Server. Es gibt **kein NAT**, und die ursprüngliche Client-IP-Adresse ändert sich nicht.

### Einschränkungen {#constraints-of-the-cli-approach}

  * Die Cloud-CLI muss auf beiden Knoten installiert sein. Jeder Knoten benötigt eine Cloud-Identität mit Netzwerkrechten.
  * Das Skript muss Fehler und Wiederholungsversuche verwalten.
  * Das Failover ist **viel langsamer** als bei einem Load Balancer und einer Health-Probe, da jedes Failover auf die Antwort der Cloud-API wartet.

> **⚠️ Hinweis:** Der **Integrator** muss die Cloud-CLI-Befehle zum `start_prim`-Skript hinzufügen. Diese Befehle werden **nicht vom SafeKit-Produkt bereitgestellt**. Sie hängen vom Cloud-Anbieter, dem Netzwerkdesign und den Sicherheitsregeln des Kunden ab. Validieren Sie die Lösung mit Ihrem Netzwerkteam vor der Produktion.

## Wie eine virtuelle IP-Adresse über verschiedene Subnetze hinweg mit BGP funktioniert (Mirror-Cluster) {#virtual-ip-bgp-failover}

### Umleitung virtueller IPs mit BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Bei BGP (Border Gateway Protocol) wird die virtuelle IP-Adresse typischerweise auf einer loopback Schnittstelle des primären Servers durch das `start_prim`-Skript konfiguriert, bevor die Anwendung gestartet wird. Der primäre Server kündigt die virtuelle IP-Adresse den Routern als /32-Route an.

Bei einem Failover stoppt das `stop_prim`-Skript auf dem alten primären Server die Anwendung, entfernt die virtuelle IP von der loopback Schnittstelle und zieht die /32-Route von den Routern zurück. Wenn der alte primäre Server abstürzt, wird `stop_prim` nicht ausgeführt, aber die Router verlieren die BGP-Sitzung und entfernen die Route automatisch.

### Vorteile und Voraussetzungen {#benefits-and-prerequisites}

  * **Die virtuelle IP-Adresse bleibt lokal, es gibt kein NAT und die Client-IP-Adresse ändert sich nicht.**
  * Es funktioniert über Subnetze und Standorte hinweg. Sie benötigen kein Stretched VLAN.
  * Sie benötigen BGP-Router und Unterstützung von Ihrem Netzwerkteam. In der Cloud benötigen Sie einen Routenserver-Dienst vom Cloud-Anbieter.

> **⚠️ Hinweis:** Die BGP-Integration verwendet SafeKit-Skripte und Ihre Routing-Infrastruktur. Der **Integrator** muss die Befehle in die Skripte `start_prim` und `stop_prim` schreiben. Diese Skripte werden **nicht vom SafeKit-Produkt bereitgestellt**. Validieren Sie die Lösung mit Ihrem Netzwerkteam vor der Produktion.

## So funktioniert die DNS-Umleitung über verschiedene Subnetze hinweg (Mirror-Cluster) {#virtual-ip-vs-dns-redirection-failover}

### DNS-Umleitung mit dem Skript `start_prim` {#dns-rerouting-with-the-start-prim-script}

Bei der DNS-Umleitung gibt es **keine einzelne virtuelle IP**. Clients verbinden sich mit einem **virtuellen Namen** (dem DNS-Namen). Beim Failover startet das `start_prim` Skript auf dem neuen primären Server die Anwendung und ändert dann den DNS-Eintrag des virtuellen Namens in die **physische IP** des neuen primären Servers.

Das `stop_prim`-Skript muss nichts tun. Wenn der alte primäre Server abstürzt, überschreibt der neue primäre Server den DNS-Eintrag.

### Beispiel: DNS-Auflösung und Clients, die die alte IP-Adresse behalten {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagramm, das die DNS-Namensauflösung zu physischer IP 1 in einem Hochverfügbarkeitscluster zeigt](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS-Auflösung: Clients sind weiterhin mit der physischen IP 1 in einem Hochverfügbarkeitscluster verbunden.

#### Vor dem Failover: Der Name verweist auf die physische IP 1. {#current-state-resolution-to-physical-ip-1}

**Client 1** und **Client 2** fragen das DNS-System nach der IP-Adresse des virtuellen Namens. Das DNS-System gibt die **physische IP 1** zurück. Die Clients öffnen dann eine Netzwerkverbindung zu dieser Adresse.

#### Nach dem Failover: Der Name verweist auf die physische IP 2. {#the-failover-challenge-rerouting-to-physical-ip-2}

Server 1 fällt aus. Das `start_prim`-Skript auf Server 2 ändert den DNS-Eintrag in die **physische IP 2.** Die Clients verbinden sich nur dann mit der physischen IP 2, wenn alle diese Bedingungen erfüllt sind:

  * Die **TTL (Time to Live)** ist auf allen DNS-Servern zwischen dem Client und dem DNS-Eintrag abgelaufen.
  * Der lokale DNS-Cache von Client 1 und Client 2 ist leer.
  * Die Anwendung schließt ihre Verbindung und führt eine *neue* DNS-Abfrage durch.

Wenn eine Bedingung falsch ist, verwenden **Client 1 und Client 2** weiterhin die physische IP 1. Der Dienst ist ausgefallen, auch wenn der DNS-Eintrag korrekt ist.

### Einschränkungen und Voraussetzungen {#the-two-black-boxes-of-dns-redirection}

  * **DNS-Cache:** Viele Internetdienstanbieter und Unternehmens-DNS-Server ignorieren kurze TTL-Werte. Sie können die alte physische IP 1 für Minuten oder Stunden beibehalten.
  * **Anwendungsverhalten:** Viele Anwendungen (z. B. Java-Dienste oder Webbrowser) führen nur einmal eine DNS-Abfrage durch, wenn sie gestartet werden. Sie verwenden weiterhin die erste IP-Adresse.
  * **Die IP-Adresse ändert sich bei jedem Failover:** Die Anwendung verfügt nicht über eine lokale virtuelle IP-Adresse, die gleich bleibt. Anwendungen, die ihre eigene IP-Adresse registrieren, funktionieren möglicherweise nicht.
  * **Voraussetzungen:** ein kurzer TTL-Wert für den DNS-Eintrag (z. B. 30 bis 60 Sekunden) und Rechte zum Aktualisieren der DNS-Zone von beiden Servern.

> **⚠️ Hinweis:** Der **Integrator** muss die DNS-Update-Befehle in das `start_prim`-Skript schreiben. Diese Befehle werden **nicht vom SafeKit-Produkt bereitgestellt**. Sie hängen vom DNS-Server ab (Windows DNS, BIND oder Cloud-DNS).

### Schlussfolgerung {#conclusion}

Die DNS-Umleitung ist keine zuverlässige Hochverfügbarkeitslösung. Verwenden Sie sie nur, wenn alle Clients bei der Wiederverbindung eine neue DNS-Abfrage durchführen. Für ein sofortiges und transparentes Failover verwenden Sie eine **virtuelle IP**: mit einem Stretched VLAN, mit einem Load Balancer, mit Cloud-Provider-CLIs oder mit BGP.

## So funktioniert das virtuelle IP-Load-Balancing in einem <span class="notranslate farm-term" translate="no">Farm</span>-Cluster im selben Subnetz {#virtual-ip-load-balancing-same-subnet}

- [Testen der virtuellen IP-Adresse für die Lastausgleichsfunktion in einem SafeKit Farm-Cluster](/de/best-practises/test-load-balancing-vip-farm/)

### Lastverteilung und Redundanz auf Kernel-Ebene {#scalable-performance-kernel-level-load-balancing--redundancy}

Bei hohem Datenverkehr kann SafeKit die Arbeit auf mehrere aktive Server verteilen. Wenn ein Server ausfällt, arbeiten die anderen Server weiter.

### <span class="notranslate farm-term" translate="no">Farm</span>-Cluster-Architektur: Lastenausgleich zwischen Windows- oder Linux-Knoten {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagramm einer lastausgeglichenen virtuellen IP-Adresse innerhalb desselben Subnetzes](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In einem **Lastenausgleichs- <span class="notranslate farm-term" translate="no">Farm</span>-Cluster** verbinden sich Clients mit einer virtuellen IP-Adresse, und die Anfragen werden gleichzeitig auf mehrere Server verteilt. Dieses Beispiel zeigt zwei Knoten. Sie können dem Cluster weitere Knoten hinzufügen. Im selben Subnetz wird die virtuelle IP-Adresse mit IP-Aliasing auf der Netzwerkkarte **jedes Servers** im Cluster konfiguriert.

#### Traffic Sharing: Der Kernel-Filter {#traffic-distribution-the-kernel-level-filter}

In einem <span class="notranslate farm-term" translate="no">Farm</span>-Cluster teilt ein SafeKit- **Filter im Kernel** den Datenverkehr auf. Die Funktionsweise ist wie folgt:

  * **ARP-Mapping:** Im ARP-Cache der Clients ist die virtuelle IP-Adresse mit einer MAC-Adresse verknüpft (z. B. `mac1` von Server 1).
  * **Paketanalyse:** Server 1 empfängt die Pakete. Der SafeKit-Kernel-Filter liest die **Client-IP** oder den **TCP-Port** jedes Pakets.
  * **Lastverteilung:** Der Filter entscheidet, welche Pakete Server 1 verarbeitet und welche Pakete an die anderen Knoten (z. B. Server 2) gehen. Um ein Paket an einen anderen Knoten zu senden, schreibt der Filter die **MAC-Zieladresse** des Pakets mit der MAC-Adresse dieses Knotens neu. Die IP-Zieladresse bleibt die virtuelle IP. Die Arbeit wird zwischen den Servern aufgeteilt.


#### Failover und Umleitung mit Gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Wenn Server 1 ausfällt, sendet SafeKit eine **Gratuitous ARP Nachricht (GARP)**. Die Clients aktualisieren ihren ARP-Cache mit `mac2` von Server 2. Die Clients werden dann sofort an die anderen Knoten der farm gesendet.

#### Einsatz an abgelegenen Standorten {#deployment-in-remote-sites}

Diese Lastausgleichslösung funktioniert auch zwischen **entfernten Rechenzentren**, wenn die Standorte durch ein **Stretched VLAN** verbunden sind. Alle Standorte befinden sich dann im selben Subnetz. Dies ist die effizienteste Konfiguration für <span class="notranslate farm-term" translate="no">Farm</span>-Cluster an mehreren Standorten.

{{%  insert-safekit-farm-video-de  %}}

## Wie eine lastausgeglichene virtuelle IP-Adresse über verschiedene Subnetze hinweg funktioniert (<span class="notranslate farm-term" translate="no">Farm</span>-Cluster) {#virtual-ip-load-balancing-different-subnets}

### Datenverkehr über Cloud-Subnetze {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Ein <span class="notranslate farm-term" translate="no">Farm</span>-Cluster kann die Anwendungsarbeit auf mehrere Verfügbarkeitszonen und Subnetze verteilen.

### <span class="notranslate farm-term" translate="no">Farm</span>-Cluster mit mehreren Subnetzen: mehrere Windows- oder Linux-Knoten {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagramm eines lastausgeglichenen Farm-Cluster der über zwei verschiedene Subnetze hinweg betrieben wird](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Wenn sich die <span class="notranslate farm-term" translate="no">farm</span> in **verschiedenen Subnetzen** befinden (z. B. in mehreren Cloud-Verfügbarkeitszonen), befindet sich die **virtuelle IP-Adresse** auf einem externen **Load Balancer**. Der Load Balancer leitet den Datenverkehr an die physischen IP-Adressen der Server in jedem Subnetz weiter.

#### Regeln für die Verkehrssteuerung und Lastausgleichung {#intelligent-traffic-routing--load-balancing-rules}

Der Load Balancer teilt die Client-Anfragen nach zwei Kriterien auf:

  * **Lastenausgleichsregeln:** zum Beispiel die **Client-IP-Adresse** oder der **Client-TCP-Port**.
  * **Knotenverfügbarkeit:** Der Load Balancer verteilt den Datenverkehr nur an die Knoten, die gemäß der SafeKit-Zustandsprüfung fehlerfrei sind.


> **⚠️ Hinweis:** SafeKit bietet den Health-Check. Ihr Netzwerk oder Ihr Cloud-Anbieter stellt den Load Balancer bereit.

#### SafeKit-Zustandsprüfung {#safekit-health-check-mechanism}

SafeKit stellt auf jedem Server der <span class="notranslate farm-term" translate="no">farm</span> eine **Health-Check-URL** bereit. Der Load Balancer liest diese, um den Status jedes Servers zu ermitteln:

  * **Knoten UP:** Der Integritätstest gibt `HTTP 200 OK` zurück. Der Load Balancer leitet den Datenverkehr an diesen Server weiter.
  * **Knoten DOWN:** Wenn ein Server oder eine Anwendung ausfällt, gibt SafeKit `HTTP 404 NOT FOUND` zurück (oder der Server antwortet nicht). Der Load Balancer stoppt sofort die Übertragung von Datenverkehr an diesen Knoten.


#### Cloud-Bereitstellung: AWS, Azure und GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Dies ist die Standardarchitektur für **<span class="notranslate farm-term" translate="no">Farm</span>-Cluster in der Cloud**. Wenn ein Subnetz oder eine Zone ausfällt, verarbeiten die anderen Knoten den Datenverkehr weiterhin. Sie wird von [**Amazon AWS**](</de/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</de/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) und [**Google Cloud (GCP)**](</de/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing) unterstützt.


## Vergleich: Implementierung virtueller IPs, Latenz und Anwendungstransparenz {#virtual-ip-methods-comparison}

**Vergleich von virtuellen IP-Umleitungsmethoden und DNS-Umleitung für Hochverfügbarkeit und Notfallwiederherstellung.**

Umgebung und Anwendungsfall | Hochverfügbarkeitstyp | Umleitungsmethode | Umgesetzt von | Netzwerklatenz | Anwendungstransparenz und lokale IP  
---|---|---|---|---|---  
Primär/Sekundär (Hochverfügbarkeit) | Mirror-Cluster | Gratuitous ARP (MAC-Adressübernahme) | ✅ SafeKit-Produkt | Sehr niedrig: Zeit bis zur Fehlererkennung und zum Senden des GARP | Volle Transparenz: Die virtuelle IP-Adresse befindet sich lokal auf dem aktiven Knoten. Die Client-IP-Adresse ändert sich nicht.  
Lastverteilung (aktiv/aktiv) | <span class="notranslate farm-term" translate="no">Farm</span>-Cluster | Kernel-Netzwerkfilter / GARP | ✅ SafeKit-Produkt | Sehr niedrig: Zeit bis zur Fehlererkennung und zum Austausch der Netzwerkfilter | Volle Transparenz: Die virtuelle IP ist auf allen Knoten lokal. Die Client-IP ändert sich nicht.  
Dasselbe Subnetz / Stretched VLAN | Disaster Recovery (Remote-Rechenzentren) | IP-Aliasing / GARP | ✅ SafeKit-Produkt (das Stretched VLAN wird vom Netzwerkteam bereitgestellt) | Niedrig: Abhängig von der Round-Trip-Time (RTT) des Stretched VLAN | Volle Transparenz: Die virtuelle IP-Adresse ist lokal auf den Knoten. Die Client-IP-Adresse ändert sich nicht.  
Unterschiedliche Subnetze: nur Load Balancer | Disaster Recovery (Remote-Rechenzentren/Cloud) | Externer Load Balancer | 🛠️ Integrator: Konfiguration Load Balancer (SafeKit stellt die Zustandsprüfung bereit) | Medium: hängt vom Health-Check-Intervall des Load Balancer | ⚠️ Teilweise Transparenz, wenn SNAT/DNAT verwendet wird. Die virtuelle IP ist **NICHT** lokal auf den Knoten. Die Client-IP wird möglicherweise **NICHT** beibehalten. Die Anwendung muss dies unterstützen.  
Unterschiedliche Subnetze: Load Balancer + lokale virtuelle IP-Adresse von SafeKit | Disaster Recovery (Remote-Rechenzentren/Cloud) | Externer Load Balancer mit Floating IP / Direct Server Return oder Frontend-IP als lokaler SafeKit-Alias | 🛠️ Integrator: Konfiguration Load Balancer (SafeKit stellt die Zustandsprüfung bereit) | Medium: hängt vom Health-Check-Intervall des Load Balancer | Gute Transparenz: Die virtuelle IP-Adresse befindet sich lokal auf dem primären Knoten und ist die Zieladresse.
Unterschiedliche Subnetze: Cloud-CLI | Disaster Recovery (Cloud) | Cloud-API: Die private IP oder eine Cloud-Route wird auf den neuen primären Knoten verschoben. | 🛠️ Integrator: Cloud-CLI-Befehle im `start_prim`-Skript | Mittel bis hoch: abhängig von der Antwortzeit der Cloud-API | Volle Transparenz: Die virtuelle IP-Adresse befindet sich lokal auf dem primären Knoten. Die Client-IP-Adresse ändert sich nicht.
Unterschiedliche Subnetze: BGP | Disaster Recovery (Remote-Rechenzentren/Cloud) | /32-Route mit BGP angekündigt | 🛠️ Integrator: BGP-Befehle in den Skripten `start_prim` und `stop_prim` | Niedrig bis mittel: hängt von der BGP-Konvergenzzeit ab | Volle Transparenz: Die virtuelle IP-Adresse befindet sich lokal auf dem primären Knoten. Die Client-IP-Adresse ändert sich nicht. Erfordert BGP-Router.  
DNS-Umleitung: keine virtuelle IP | Disaster Recovery (Remote-Rechenzentren) | Änderung des DNS-Eintrags (Name/physische IP) | 🛠️ Integrator: DNS-Update-Befehle im `start_prim`-Skript | Hoch und nicht vorhersehbar: hängt vom DNS-TTL (Time To Live) und dem DNS-Cache des Clients ab | ⚠️ Nicht zuverlässig: Der Client muss eine neue DNS-Abfrage durchführen. Oft behalten Clients die alte IP-Adresse, die sie beim Start erhalten haben, und werden nach dem Failover nicht umgeleitet.  
  
## Häufig gestellte Fragen zu virtuellen IPs {#virtual-ip-faq}

### Virtuelle IP und Netzwerk {#virtual-ip--networking}

Was ist eine virtuelle IP-Adresse und wie unterscheidet sie sich von einer physischen IP-Adresse?

Eine **physische IP-Adresse** ist mit einer Netzwerkkarte verknüpft. Eine **virtuelle IP-Adresse** ist nicht mit Hardware verknüpft. In einem SafeKit-Cluster verwenden Clients immer die virtuelle IP-Adresse. Wenn der primäre Server ausfällt, wird die virtuelle IP-Adresse automatisch auf einen funktionierenden Knoten verschoben. Sie müssen die Client-Konfiguration nicht ändern.

Benötige ich einen Hardware Load Balancer, um eine virtuelle IP-Adresse zu verwenden?

Nein. **SafeKit** verwaltet die virtuelle IP-Adresse mit Software. Im selben Subnetz verwendet es **IP-Aliasing** und **Gratuitous ARP (GARP),** um den Datenverkehr umzuleiten. Sie benötigen keinen externen Load Balancer oder einen Proxy-Server.

Was ist Gratuitous ARP (GARP) und wozu wird es verwendet?

**Gratuitous ARP (GARP)** ist eine Netzwerknachricht, die an alle Geräte gesendet wird. Sie aktualisiert die ARP-Tabellen von Switches und Routern. Bei einem Failover sendet der neue primäre Server eine GARP -Nachricht. Die Nachricht besagt, dass die **virtuelle IP-Adresse** nun mit der MAC-Adresse des neuen primären Servers verknüpft ist. Der Datenverkehr wird dann sofort umgeleitet.

Kann ich einen DNS-Namen mit einer virtuellen IP-Adresse verknüpfen?

**Ja.** Erstellen Sie einen Standard-A-Eintrag für die virtuelle IP. Die Umleitung erfolgt auf der **Ebene der virtuellen IP** (mit ARP oder Netzwerkumleitung), **nicht auf der DNS-Ebene**. Sie haben keine DNS-Verzögerungen oder TTL-Probleme, und das Failover bleibt **für die Anwendung transparent**.

### Cloud und fortschrittliche Architekturen {#cloud--advanced-architectures}

Wie funktioniert eine virtuelle IP-Adresse in der Cloud (AWS, Azure, GCP)?

In der Cloud stehen Layer-2 GARP Nachrichten für das Umleiten einer virtuellen IP nicht zur Verfügung. SafeKit arbeitet mit **Cloud Load Balancer** (AWS Elastic Load Balancing, Azure Load Balancer oder Google Cloud Load Balancing). SafeKit stellt eine **Health-Check-URL** bereit. Der Load Balancer liest diese und sendet den Datenverkehr an den aktiven Knoten.

Ist ein Stretched VLAN für die Notfallwiederherstellung besser als ein Load Balancer ?

**Ja**. Zwischen Remote-Rechenzentren ist ein **Stretched VLAN** oft besser, da das Failover **für die Anwendung transparent** bleibt. Die **virtuelle IP-Adresse ändert sich nicht**, sodass die Anwendung und ihre Clients nach einem Failover zwischen Rechenzentren weiterhin dieselbe Adresse verwenden.

Welche Grenzen hat die DNS-Umleitung im Vergleich zu einer virtuellen IP?

**Die DNS-Umleitung** hängt von der **TTL (Time to Live)** und vom DNS-Cache des Clients ab. Die Wiederherstellung kann Stunden dauern. Außerdem verwenden **Clients, die keine neue DNS-Abfrage durchführen,** weiterhin den ausgefallenen Server. Eine **virtuelle IP** wird sofort mit GARP Nachrichten auf Layer 2 umgeleitet. Der DNS-Cache des Clients hat keine Auswirkungen.

### Transparenz und Sicherheit {#transparency--security}

Warum ist eine lokale virtuelle IP-Adresse für die Anwendungstransparenz wichtig?

Mit einer lokalen **virtuellen IP-Adresse** verwendet die Anwendung eine Adresse, die sich nicht ändert. SafeKit führt die Umleitung im **Kernel** durch. Die Anwendung sieht das Failover nicht. Mit DNAT ändert sich die von der Anwendung verwendete Adresse.

Behält eine virtuelle IP-Adresse die ursprüngliche Client-IP-Adresse bei?

Ja. SafeKit verwendet kein Source-NAT (SNAT). Die virtuelle IP-Adresse ist lokal auf dem aktiven Server, sodass die Anwendung die **ursprüngliche Client-IP-Adresse** erhält. Dies ist wichtig für Sicherheitsaudits, Sitzungsbeständigkeit und regulatorische Protokolle.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
