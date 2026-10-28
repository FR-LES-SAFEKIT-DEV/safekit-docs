---
title: "SafeKit Smart Console: Ihr hochverfügbarer Cluster in Ihrer Tasche"
canonical: "https://safekit.eviden.com/de/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Verwalten Sie SafeKit -Cluster mühelos mit unserer Smart Console. Profitieren Sie von der Konfiguration ohne Programmierung, der Smartphone-Kompatibilität und PWA-Benachrichtigungen in Echtzeit. Vermeiden Sie menschliche Fehler und gewährleisten Sie höchste Verfügbarkeit. Erfahren Sie mehr."
category: "architectures"
lang: "de"
topics: "Smart Console: Intuitive, mobile und fehlerfreie Hochverfügbarkeit, Inhaltsverzeichnis, Wie funktioniert ein SafeKit mirror -Cluster mit der Webkonsole?, Wie funktioniert ein SafeKit `farm` -Cluster mit der Webkonsole?, Wie überwacht man mehrere Module und Cluster über die Webkonsole?, Wie überwacht man Warnmeldungen in der Konsole und verwaltet E-Mail-Benachrichtigungen?, 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# SafeKit Smart Console: Ihr hochverfügbarer Cluster in der Hosentasche {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: Intuitiv, mobil und fehlerfrei – Hochverfügbarkeit {#smart-console-intuitive-mobile-and-error-free-high-availability}

Definieren Sie Ihr Hochverfügbarkeitsmanagement neu – mit einer Lösung, die auf **Geschwindigkeit und Einfachheit** ausgelegt ist. Die SafeKit Webkonsole bietet eine intuitive Bedienung **ohne Einarbeitungszeit** und ermöglicht Ihnen die Konfiguration und Steuerung Ihrer Infrastruktur ohne **Programmierkenntnisse** .

Ob am Schreibtisch oder unterwegs – mit dem Smartphone-kompatiblen Dashboard haben Sie die volle Kontrolle über Ihr Cluster. Durch die optimierte Verwaltung der Module mirror und `farm` minimiert die Smart Console **menschliche Fehler** und gewährleistet einen reibungslosen Failover für Ihre wichtigsten Systeme.

## Inhaltsverzeichnis {#table-of-contents}

  * [ Wie funktioniert ein SafeKit mirror Cluster mit der Webkonsole? ](#safekit-mirror-cluster)
  * [ Wie funktioniert ein SafeKit `farm` Cluster mit der Webkonsole? ](#safekit-farm-cluster)
  * [ Wie kann man mehrere Module und mehrere Cluster über die Webkonsole überwachen? ](#multipe-modules-clusters)
  * [ Wie kann ich Warnmeldungen in der Konsole überwachen und E-Mail-Benachrichtigungen verwalten? ](#safekit-notifications-cluster)


## Wie funktioniert ein SafeKit mirror Cluster mit der Webkonsole? {#safekit-mirror-cluster}

### Wie konfiguriert man einen SafeKit Mirror Cluster? {#safekit-mirror-cluster-configure}


![ SafeKit Webkonsole: Dashboard für die Konfiguration von Hochverfügbarkeit mit Anzeige von Heartbeat-Netzwerken, virtueller IP-Einrichtung und Echtzeit-Verzeichnisreplikation für einen mirror -Cluster. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


Die Webkonsole **SafeKit** bietet eine intuitive Benutzeroberfläche zur Orchestrierung von Hochverfügbarkeit für Ihre kritischen Anwendungen. In nur wenigen Schritten können Sie einen Cluster **SafeKit mirror** konfigurieren, um die Geschäftskontinuität sicherzustellen.

  * **Anwendungsausfall (Registerkarte „Makros“):** Definieren Sie die spezifischen Anwendungsdienste, die im Fehlerfall automatisch neu gestartet werden sollen.
  * **Heartbeat-Netzwerk(e):** Dedizierte Kommunikationspfade, die von den Clusterknoten verwendet werden, um den Zustand und die Verfügbarkeit der anderen Knoten kontinuierlich zu überwachen und Failover-Entscheidungen zu synchronisieren.
  * **Verwaltung virtueller IP-Adressen:** Virtuelle IP-Adresse (VIP) für die transparente Wiederverbindung von Clients nach einem Failover einrichten.
  * **Echtzeitreplikation:** Wählen Sie die kritischen Verzeichnisse für die hostbasierte, synchrone Replikation auf Byte-Ebene aus.
  * **-Prüfer:** Überwachen den Zustand der Anwendung und lösen eine automatische Wiederherstellung aus, wenn ein Prozessfehler erkannt wird.


Der Cluster SafeKit verfügt über einen dedizierten Split-Brain-Checker ](</de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) [

### Wie überwacht man einen SafeKit mirror Cluster? {#safekit-mirror-cluster-monitoring}


![ SafeKit Webkonsole: Echtzeitüberwachung eines 2-Knoten-Clusters mirror mit Anzeige der Zustände PRIM und SECOND bei aktiver Datenreplikation. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


Die **Managementkonsole SafeKit** bietet eine einheitliche Ansicht Ihrer Hochverfügbarkeitsinfrastruktur. Administratoren können damit den **Betriebszustand** des Clusters überwachen und die Datensynchronisierung in Echtzeit verfolgen.

Bei einem 2-Knoten-Cluster vom Typ mirror werden die Rollen der einzelnen Server in der Konsole übersichtlich angezeigt:

  * **PRIM (Primär):** Der aktive Knoten, auf dem die Anwendung aktuell ausgeführt wird und der die virtuelle IP-Adresse verwaltet. Er führt Schreibvorgänge im lokalen Speicher und Echtzeitreplikation auf den sekundären Knoten durch.
  * **SECOND (Sekundär):** Der Standby-Knoten empfängt synchrone Byte-Updates. Er ist bereit, im Falle eines Ausfalls des Primärknotens sofort die Funktion zu übernehmen.
  * **ALONE Status:** Zeigt visuell an, wenn der Cluster auf einem einzelnen Knoten läuft (z. B. während Wartungsarbeiten oder nach einem Ausfall), was darauf hinweist, dass die Redundanz vorübergehend verloren geht.
  * **Resynchronisierungsfortschritt:** Wenn ein ausgefallener Knoten wiederhergestellt ist, ändert sich sein Status während der Datenreintegration im Hintergrund in Orange, um sicherzustellen, dass es während der Phase "Rückkehr zum Normalzustand" zu keinen Ausfallzeiten kommt.


Über einfache Statussymbole hinaus bietet die Benutzeroberfläche **eine One-Click-Failover-Orchestrierung** ( **`...` -Menü** ), mit der Sie die primäre Rolle für geplante Wartungsarbeiten manuell neu zuweisen und gleichzeitig die kontinuierliche Verfügbarkeit für Benutzeraktivitäten gewährleisten können.

## Wie funktioniert ein SafeKit `farm` Cluster mit der Webkonsole? {#safekit-farm-cluster}

### Wie konfiguriert man einen SafeKit `farm` Cluster? {#safekit-farm-cluster-configuration}


![ SafeKit Webkonsole: Farm Clusterkonfiguration für Netzwerklastausgleich und Verwaltung virtueller IPs. ](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


Der Cluster **SafeKit `farm`** ist auf hohe Verfügbarkeit und Skalierbarkeit von Diensten ausgelegt. Die Konfiguration konzentriert sich auf die gleichzeitige Verteilung des eingehenden Datenverkehrs auf beide Knoten.

  * **Load Balanced Services (Makros-Registerkarte):** Definiert die spezifischen Anwendungsdienste (z. B. Apache, IIS , Nginx ), die auf allen Knoten aktiv gehalten werden sollen.
  * **Heartbeat-Netzwerk(e):** Kommunikationspfad(e), die verwendet werden, um zu erkennen, ob ein Knoten das `farm` verlassen hat, was eine sofortige Umverteilung der Last auslöst.
  * Virtuelle IP-Adresse **( `Farm` VIP):** Im Gegensatz zu einem mirror -Cluster wird die VIP `Farm` zwischen den Knoten geteilt, wobei ein Kernel-Filteralgorithmus zur Verteilung des Netzwerkverkehrs verwendet wird.
  * **Load-Balancing-Regeln:** Definieren Sie die Richtlinie zur Verkehrsverteilung basierend auf der Quell-IP-Adresse oder dem Quellport.
  * **-Prüfer:** Überwachen den Zustand der Anwendung und lösen einen automatischen Neustart aus, wenn ein Prozessfehler erkannt wird.


### Wie überwacht man einen SafeKit `farm` Cluster? {#safekit-farm-cluster-monitoring}


![ SafeKit Konsole: Überwachung eines 2-Knoten-Clusters Farm ), beide Knoten im Status „UP“ mit aktivem Lastausgleich. ](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


Die Überwachung eines `farm` Clusters ermöglicht die Visualisierung der **Active-Active** Architektur der Infrastruktur, bei der alle Knoten zur Anwendungsleistung beitragen (in diesem Beispiel werden 2 Knoten gezeigt; skalierbar auf zusätzliche Knoten):

  * **UP-Status (50 % auf 2 Knoten):** In einem gesunden `farm` befinden sich beide Knoten im Zustand „UP“ (50 %), was bedeutet, dass sie beide aktiv Client-Anfragen über die gemeinsam genutzte virtuelle IP empfangen und verarbeiten.
  * Automatischer Lastausgleich: **Fällt ein Knoten aus, zeigt die Konsole an** dass der verbleibende Knoten 100 % des Datenverkehrs übernimmt. Es gibt keine Verzögerung beim Failover, da der funktionierende Knoten bereits aktiv ist (abgesehen von einer Erkennungszeit von wenigen Sekunden).
  * **Knoteneinfügung:** Wenn ein reparierter Knoten neu gestartet wird, wechselt er von "STOP" zu "UP" und beginnt automatisch, seinen Anteil an der Last ohne Eingriff des Administrators zu empfangen.
  * **Keine Datensynchronisierung:** Hinweis: In einem `farm` -Cluster gibt es keinen Resynchronisierungsstatus "Orange", da die Knoten entweder zustandslos sind oder eine gemeinsame Backend-Datenbank nutzen (die in einem mirror Cluster separat geschützt werden kann).


Über einfache Statussymbole hinaus bietet die Benutzeroberfläche eine Ein-Klick-Knotenverwaltung ( **`...` Menü** ), mit der Sie einen Knoten für geplante Wartungsarbeiten manuell stoppen oder starten können, während die gemeinsam genutzte virtuelle IP den Datenverkehr automatisch neu verteilt, ohne die Benutzeraktivität zu unterbrechen.

## Wie kann man mehrere Module und mehrere Cluster über die Webkonsole überwachen? {#multipe-modules-clusters}

### Visualisierung mehrerer Module innerhalb eines einzelnen Clusters {#safekit-multi-module}


![ SafeKit Webkonsole: 4 Hyper-V-Module wurden auf demselben 2-Knoten-Cluster bereitgestellt. ](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Bei der Bereitstellung **mehrere Module** auf einem einzelnen 2-Knoten-Cluster, SafeKit Die Webkonsole bietet **individuelle Überwachungs-Widgets** für jedes Modul. Dies ist besonders wertvoll für **SafeKit Hyper-V** Lösungen. 

**Beispiel:** In der Abbildung mit einer Konfiguration mit 4 geschützten VMs:

  * Die Konsole ist mit Knoten 1 verbunden, der als Proxy für die Kommunikation mit Knoten 2 fungiert.
  * Die Konsole zeigt **4 Widgets** an (eines für jede VM).
  * Jede VM läuft auf ihrem PRIM-Knoten und wird auf ihren SECOND-Knoten repliziert.
  * Administratoren können in Echtzeit sehen, dass VM1 und VM2 auf Knoten 1 aktiv sind, während VM2 und VM3 auf Knoten 2 aktiv sind.
  * Administratoren können eine VM einfach von einem Knoten auf einen anderen migrieren, indem sie das Menü **`...`** verwenden.


Diese detaillierte Transparenz gewährleistet, dass Sie auch in Umgebungen mit hoher Dichte die volle Kontrolle und sofortige Kenntnis über jede replizierte Arbeitslast behalten. 

### Multi-Cluster-Visualisierung {#safekit-multi-cluster}


![ SafeKit Webkonsole: 4 Cluster auf 8 Servern bereitgestellt. ](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Beim Bereitstellen mehrerer **-Cluster** ) auf verschiedenen Servern können Sie entweder mehrere Browser-Tabs verwenden, um sich mit jedem Cluster zu verbinden, oder die PWA-Funktion (Progressive Web App) der Konsole nutzen. Durch die Verwendung der PWA werden die Navigationsmenüs des Browsers ausgeblendet, wodurch Bildschirmplatz gespart und die Clusterüberwachung auf Ihrem Desktop übersichtlicher gestaltet wird. 

**Beispiel:** Die Abbildung zeigt vier PWA-Konsolen, die vier Videoüberwachungscluster überwachen: einen im Norden, Süden, Westen und Osten.

**Hinweis:** Wenn Sie zu viele Cluster haben, um sie auf einem einzelnen Desktop anzuzeigen, bietet SafeKit Benachrichtigungen an, um Fehler in zahlreichen Clustern zu erkennen. 

## Wie kann ich Warnmeldungen in der Konsole überwachen und E-Mail-Benachrichtigungen verwalten? {#safekit-notifications-cluster}

### Wie kann ich sofortige Benachrichtigungen über Modulstatusänderungen und kritische Ereignisse erhalten? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

Die Webkonsole SafeKit nutzt native Browserfunktionen, um bei jeder Änderung des Modulstatus **sofortige Benachrichtigungen** auszugeben. So werden Sie umgehend über wichtige Ereignisse informiert, selbst wenn die Konsole in einem Hintergrundtab geöffnet ist.

  * **Sicherheit:** Benachrichtigungen erfordern Zugriff über **HTTPS** oder localhost.
  * **PWA-Integration:** Installieren Sie die Konsole als Progressive Web App (PWA) auf Desktop- oder Mobilgeräten für ein natives App-ähnliches Erlebnis.
  * **Mobile Alerts:** Auf Mobilgeräten sind Benachrichtigungen ausschließlich über die PWA verfügbar, wobei HTTPS obligatorisch ist.


Dieser Mechanismus alarmiert die Benutzer sofort über kritische Ereignisse, verbessert so das schnelle Verständnis des Clusterstatus und verkürzt die Reaktionszeiten.

### SafeKit Video: Konsole auf dem Smartphone (0:54) {#demo-console}

<br /> 

### Wie kann ich in SafeKit automatische E-Mail-Benachrichtigungen einrichten? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit protokolliert automatisch alle wichtigen Clusterereignisse **in den Systemprotokollen** ) und ermöglicht so die nahtlose Integration mit jedem gängigen Überwachungstool. Zusätzlich beinhaltet es einen dedizierten E-Mail-Benachrichtigungsagenten **einen E-Mail-Benachrichtigungsagenten** , der diese Protokolle überwacht und wichtige Warnmeldungen direkt an Ihren Posteingang sendet. Dadurch wird sichergestellt, dass alle Beteiligten auch dann informiert bleiben, wenn die Webkonsole nicht aktiv überwacht wird. 

  * **Intelligente Gruppierung:** Um Störungen zu reduzieren, gruppiert der Agent Ereignisse, die innerhalb eines kurzen Zeitraums auftreten, in einer einzigen zusammenfassenden E-Mail.
  * **Vollständige Abdeckung:** Der Agent ist auf allen Knoten installiert und muss explizit mit SMTP-Details konfiguriert werden, um aktiviert zu werden.
  * **Anpassbare Empfänger:** Direkte Benachrichtigungen an bestimmte IT-Teams oder Management-Aliasse, um eine schnelle Reaktion zu gewährleisten.


Durch die Kombination von Echtzeit-PWA-Warnungen mit intelligenter E-Mail-Gruppierung bietet SafeKit eine mehrschichtige Benachrichtigungsstrategie für unternehmenskritische Vorgänge.

### SafeKit Video: E-Mail-Benachrichtigungen bei Failover (1:04) {#demo-notifications}

<br /> 


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}