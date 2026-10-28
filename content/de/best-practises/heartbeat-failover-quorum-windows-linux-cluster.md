---
title: "Heartbeat, Failover und Quorum in den Clustern Windows und Linux"
canonical: "https://safekit.eviden.com/de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Erfahren Sie, wie Heartbeats, Failover und Quorum in einem Cluster funktionieren. SafeKit schlägt eine SAN-lose Architektur vor, die den Bedarf an einem dritten Quorumserver oder einer speziellen Quorum-Festplatte eliminiert. Erreichen Sie Hochverfügbarkeit auf Windows und Linux mit einem einfachen Split-Brain-Checker."
category: "best-practises"
lang: "de"
topics: "Welche Szenarien gibt es bei Netzwerkisolation in einem Cluster? Wie funktionieren Heartbeats und Failover in einem Windows oder Linux -Cluster? Split-Brain-Problem und Quorum bei Servern in zwei entfernten Rechenzentren. Einfaches Cluster-Quorum mit dem SafeKit Split-Brain-Checker. 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Heartbeat, Failover und Quorum in den Clustern Windows und Linux sowie {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-de  %}}
 

## Wie funktionieren Heartbeats und Failover in einem Windows oder Linux -Cluster? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### Was ist ein Herzschlag? {#what-is-a-heartbeat}

Der grundlegende Mechanismus zur Synchronisierung zweier Server und zur Erkennung von Serverausfällen ist der **Heartbeat** , der den Datenfluss in einem Netzwerk überwacht, das von zwei Servern gemeinsam genutzt wird.

Die Software SafeKit unterstützt so viele Heartbeats, wie es Netzwerke gibt, die von zwei Servern gemeinsam genutzt werden. 

Der Heartbeat-Mechanismus dient zur Implementierung der Cluster Windows und Linux . Er ist in den Cluster SafeKit mirror mit Echtzeit-Dateireplikation und Failover integriert.

### SafeKit Herzschläge {#safekit-heartbeats}

Im Normalbetrieb tauschen die beiden Server ihre Zustände (PRIM, SECOND, die Ressourcenzustände) über die Heartbeat-Kanäle aus und synchronisieren ihre Start- und Stoppprozeduren der Anwendung.

Insbesondere im Falle eines geplanten Failovers wird das Stoppskript, das die Anwendung beendet, zuerst auf dem primären Server ausgeführt, bevor das Startskript auf dem sekundären Server ausgeführt wird. Dadurch befinden sich die replizierten Daten auf dem sekundären Server in einem sicheren Zustand, der einem ordnungsgemäßen Stopp der Anwendung entspricht.

### Verlust aller Herzschläge {#loss-of-all-heartbeats}

Wenn auf einem Server alle Herzschläge ausfallen, betrachtet dieser Server den anderen Server als ausgefallen und wechselt in den Zustand ALONE.

Wenn der zweite Server in den Zustand „ALLEIN“ wechselt, findet ein Anwendungs-Failover mit Neustart der Anwendung auf dem sekundären Server statt.

Obwohl nicht zwingend erforderlich, ist es besser, zwei Heartbeat-Kanäle in zwei verschiedenen Netzwerken zur Synchronisierung der beiden Server zu verwenden, um den Netzwerkausfall vom Serverausfall zu trennen.

## Split-Brain-Problem und Quorum bei Servern in zwei entfernten Computerräumen {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![ Heartbeat, Failover und Quorum in einem Windows oder Linux Cluster ](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Ferncomputerräume {#remote-computer-rooms}

Ein hochverfügbarer Cluster zur Sicherung einer kritischen Anwendung kann mit zwei Servern in zwei geografisch getrennten Rechenzentren implementiert werden.

Die Lösung unterstützt somit das Desaster eines vollen Zimmers.

### Split Brain {#split-brain}

Bei einer Netzwerkunterbrechung zwischen den beiden Computerräumen gehen alle Herzschläge verloren und es entsteht das Split-Brain-Problem.

Auf beiden Servern wird die kritische Anwendung gestartet.

### Komplexität der Lösungen {#complexity-of-solutions}

Um Split Brain zu lösen, wird meist ein Quorum mit einem dritten Quorum-Server oder einer speziellen Quorum-Festplatte implementiert, um doppelte Master zu vermeiden. 

Leider erhöhen diese neuen Quorum-Geräte die Kosten und die Komplexität der gesamten Clusterarchitektur.

## Einfaches Cluster-Quorum mit dem Split-Brain-Checker SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit Split-Brain-Prüfer {#safekit-split-brain-checker}

Dank der Hochverfügbarkeitssoftware SafeKit benötigt das Quorum in einem Windows oder Linux Cluster weder einen dritten Quorumserver noch eine Quorum-Festplatte. Ein einfacher Split-Brain-Checker ](</de/resources/safekit-user-guide-82/#check_splitbrain>) [ genügt, um die doppelte Ausführung einer Anwendung zu verhindern.

Bei Ausfall aller Heartbeats zwischen den Servern wählt der Split-Brain-Checker einen Server als primären Server aus. Der andere Server wechselt in den Wartezustand, bis er wieder Heartbeats vom anderen Server empfängt. Anschließend kehrt er zum sekundären Server zurück, nachdem er die replizierten Daten vom primären Server synchronisiert hat.

### Wie funktioniert der Split-Brain-Checker? {#how-the-split-brain-checker-works}

Die Wahl des primären Servers basiert auf dem Ping einer IP-Adresse, dem sogenannten Zeugen. Der Zeuge ist typischerweise ein Router, der stets erreichbar ist. Bei Netzwerkisolation ist nur der Server, der Zugriff auf den Zeugen hat, der primäre Server (ALONE), die anderen befinden sich im Wartezustand (WAIT).

Der Zeuge wird nicht permanent, sondern nur dann getestet, wenn alle Herzschläge ausfallen. Ist der Zeuge zu diesem Zeitpunkt ausgefallen, wechselt der Cluster in den Zustand „Warten-Warten“, und ein Administrator kann über die Webkonsole SafeKit einen der Server als primären Server neu starten.

### Was passiert ohne Split-Brain-Checker? {#what-happens-without-a-split-brain-checker}

Im Falle einer Netzwerkisolation wechseln beide Server in den Zustand „ALONE“ und führen die kritische Anwendung aus. Die replizierten Verzeichnisse sind isoliert, und jede Anwendung arbeitet mit ihren eigenen Daten in ihrem eigenen Verzeichnis.

Wenn das Netzwerk wiederhergestellt ist, wählt SafeKit standardmäßig den Server, der vor der Isolation PRIM war, als neuen PRIM aus und erzwingt den anderen als SECOND mit einer Resynchronisierung aller seiner Daten vom PRIM.

Hinweis: Windows kann eine doppelte IP-Adresse auf einem Server erkennen und die virtuelle IP-Adresse auf diesem Server entfernen. SafeKit verfügt über eine Prüffunktion, die in diesem Fall einen Neustart erzwingt.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}