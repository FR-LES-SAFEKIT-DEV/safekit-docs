---
title: "Heartbeat, Failover und Quorum in Windows- und Linux-Clustern"
canonical: "https://safekit.eviden.com/de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Erfahren Sie, wie Heartbeats, Failover und Quorum in einem Cluster funktionieren. Mit SafeKit werden kein dritter Quorum-Server und keine spezielle Quorum-Festplatte benötigt. Ein einfacher Split-Brain-Checker reicht aus. SafeKit bietet Hochverfügbarkeit unter Windows und Linux."
category: "best-practises"
lang: "de"
topics: "Welche verschiedenen Szenarien gibt es bei Netzwerktrennung in einem Cluster?, Wie funktionieren Heartbeats und Failover in einem Windows- oder Linux-Cluster?, Split-Brain und Quorum mit Servern in zwei entfernten Computerräumen, Einfaches Cluster-Quorum mit dem SafeKit-Split-Brain-Checker, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 54 expressions"
---

# Heartbeat, Failover und Quorum in Windows- und Linux-Clustern {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-de  %}}
 

## Wie funktionieren Heartbeats und Failover in einem Windows- oder Linux-Cluster? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### Was ist ein Heartbeat? {#what-is-a-heartbeat}

Der grundlegende Mechanismus zur Synchronisierung zweier Server und zur Erkennung von Serverausfällen ist der **Heartbeat**. Es handelt sich um einen Überwachungsdatenfluss in einem Netzwerk, das von den beiden Servern gemeinsam genutzt wird.

Die SafeKit-Software unterstützt mehrere Heartbeats. Jedes Netzwerk, das von den beiden Servern gemeinsam genutzt wird, kann einen Heartbeat übertragen.

Der Heartbeat-Mechanismus wird zur Implementierung von Windows- und Linux-Clustern verwendet. Er ist in den SafeKit-Mirror-Cluster mit Echtzeit-Dateireplikation und Failover integriert.

### SafeKit-Heartbeats {#safekit-heartbeats}

Im Normalbetrieb tauschen die beiden Server ihre Zustände über die Heartbeat-Kanäle aus. Diese Zustände sind PRIM, SECOND und die Ressourcenstatus. Sie synchronisieren auch die Start- und Stoppverfahren der Anwendung.

Beispielsweise wird während eines geplanten Failovers das Stoppskript der Anwendung zuerst auf dem primären Server ausgeführt. Dann wird das Startskript auf dem sekundären Server ausgeführt. Somit befinden sich die replizierten Daten auf dem sekundären Server in einem sicheren Zustand. Dieser Zustand entspricht einem sauberen Stopp der Anwendung.

### Was passiert, wenn alle Heartbeats verloren gehen? {#loss-of-all-heartbeats}

Wenn ein Server alle Heartbeats verliert, geht er davon aus, dass der andere Server ausgefallen ist. Er wechselt dann in den ALONE-Zustand.

Wenn der Server im SECOND-Zustand in den ALONE-Zustand wechselt, wird die Anwendung auf diesem Server neu gestartet. Dies ist ein Anwendungs-Failover.

Zwei Heartbeat-Kanäle in zwei verschiedenen Netzwerken werden empfohlen, sind aber nicht zwingend erforderlich. Mit zwei Netzwerken wird ein Netzwerkausfall nicht mit einem Serverausfall verwechselt.

## Split-Brain und Quorum mit Servern in zwei entfernten Computerräumen {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Heartbeat, Failover und Quorum in einem Windows- oder Linux-Cluster](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Zwei entfernte Computerräume {#remote-computer-rooms}

Mit zwei Servern in zwei entfernten Computerräumen kann ein Hochverfügbarkeitscluster eine geschäftskritische Anwendung schützen.

Somit bleibt die Anwendung auch dann verfügbar, wenn eine Katastrophe einen ganzen Computerraum zerstört.

### Split-Brain {#split-brain}

Wenn das Netzwerk zwischen den beiden Computerräumen isoliert ist, gehen alle Heartbeats verloren. Dies ist das Split-Brain-Problem: Beide Server starten die kritische Anwendung.

### Komplexität gängiger Lösungen {#complexity-of-solutions}

Meistens wird ein Quorum verwendet, um das Split-Brain-Problem zu lösen. Das Quorum verwendet einen dritten Quorum-Server oder eine spezielle Quorum-Festplatte. Es vermeidet, dass gleichzeitig zwei primäre Server vorhanden sind.

Leider erhöhen diese Quorum-Geräte die Kosten und die Komplexität der Clustering-Architektur.

## Einfaches Cluster-Quorum mit dem SafeKit-Split-Brain-Checker {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit-Split-Brain-Checker {#safekit-split-brain-checker}

Mit der Hochverfügbarkeitssoftware SafeKit benötigt das Quorum eines Windows- oder Linux-Clusters keinen dritten Quorum-Server und keine Quorum-Festplatte. Ein einfacher 🛠️ [Split-Brain-Checker](</de/resources/safekit-user-guide-82/#check_splitbrain>) reicht aus, um zu verhindern, dass die Anwendung auf beiden Servern läuft.

Wenn alle Heartbeats zwischen den Servern verloren gehen, wählt der Split-Brain-Checker nur einen Server als primären Server aus. Der andere Server wechselt in den WAIT-Zustand. Er wartet, bis er die Heartbeats des anderen Servers wieder empfängt. Dann synchronisiert er die replizierten Daten vom primären Server und kehrt in den sekundären Zustand zurück.

### Wie funktioniert der Split-Brain-Checker? {#how-the-split-brain-checker-works}

Der primäre Server wird mit einem Ping an eine IP-Adresse, den sogenannten Witness, gewählt. Der Witness ist in der Regel ein Router, der immer verfügbar ist. Im Falle einer Netzwerktrennung wird nur der Server, der den Witness erreichen kann, im ALONE-Zustand zum primären Server. Der andere Server wechselt in den WAIT-Zustand.

Der Witness wird nicht permanent getestet. Er wird nur getestet, wenn alle Heartbeats verloren gegangen sind. Wenn der Witness zu diesem Zeitpunkt ausgefallen ist, wechselt der Cluster in den WAIT-WAIT-Zustand. Ein Administrator kann dann einen der Server mit der SafeKit-Webkonsole als primären Server neu starten.

### Was passiert ohne einen Split-Brain-Checker? {#what-happens-without-a-split-brain-checker}

Im Falle einer Netzwerktrennung gehen beide Server in den ALONE-Zustand und führen die kritische Anwendung aus. Die replizierten Verzeichnisse werden isoliert. Jede Anwendung arbeitet mit ihren eigenen Daten in ihrem eigenen Verzeichnis.

Wenn die Netzwerkverbindung wiederhergestellt ist, wählt SafeKit standardmäßig den Server, der vor der Isolation PRIM war, als neuen primären Server aus. Der andere Server wird in den SECOND-Zustand versetzt. Alle seine Daten werden vom PRIM-Server resynchronisiert.

Hinweis: Unter Windows kann ein Server eine doppelte IP-Adresse erkennen und seine virtuelle IP-Adresse entfernen. In diesem Fall erzwingt ein SafeKit-Checker einen Neustart.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
