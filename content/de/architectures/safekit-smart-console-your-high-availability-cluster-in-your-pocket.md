---
title: "SafeKit-Smart Console: Ihr Hochverfügbarkeitscluster für die Hosentasche"
canonical: "https://safekit.eviden.com/de/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Verwalten Sie SafeKit-Cluster mühelos mit unserer Smart Console. Profitieren Sie von der Zero-Code-Konfiguration, der Smartphone-Kompatibilität und Echtzeit-PWA-Benachrichtigungen. Eliminieren Sie menschliche Fehler und gewährleisten Sie Hochverfügbarkeit auf Knopfdruck. Erfahren Sie mehr."
category: "architectures"
lang: "de"
topics: "Smart Console: intuitive und fehlerfreie Hochverfügbarkeit auf Desktop und Mobilgeräten, Inhaltsverzeichnis, Wie funktioniert ein SafeKit-Mirror-Cluster mit der Webkonsole?, Wie funktioniert ein SafeKit-Farm-Cluster mit der Webkonsole?, Wie kann man mehrere Module und mehrere Cluster über die Webkonsole überwachen?, Wie können Warnmeldungen in der Konsole überwacht und E-Mail-Benachrichtigungen verwaltet werden?, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 54 expressions"
---

# SafeKit-Smart Console: Ihr Hochverfügbarkeitscluster für die Hosentasche {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: intuitive und fehlerfreie Hochverfügbarkeit auf Desktop und Mobilgeräten {#smart-console-intuitive-mobile-and-error-free-high-availability}

Definieren Sie die Verwaltung der Hochverfügbarkeit mit einer Lösung neu, die auf **Geschwindigkeit und Einfachheit** ausgelegt ist. Die SafeKit Web Console bietet eine Erfahrung **ohne Lernkurve**, sodass Sie Ihre Infrastruktur konfigurieren und steuern können, **ohne Code zu schreiben**.

Ob Sie an Ihrem Schreibtisch oder unterwegs sind, das Smartphone-kompatible Dashboard bietet Ihnen die volle Kontrolle über das Cluster. Durch die Rationalisierung der Verwaltung von mirror und <span class="notranslate farm-term" translate="no">Farm</span>-Modulen eliminiert die Smart Console **menschliche Fehler** und gewährleistet einen nahtlosen Failover-Prozess für Ihre wichtigsten Systeme.

## Inhaltsverzeichnis {#table-of-contents}

  * [Wie funktioniert ein SafeKit-Mirror-Cluster mit der Webkonsole?](#safekit-mirror-cluster)
  * [Wie funktioniert ein SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster mit der Webkonsole?](#safekit-farm-cluster)
  * [Wie kann man mehrere Module und mehrere Cluster über die Webkonsole überwachen?](#multipe-modules-clusters)
  * [Wie können Warnmeldungen in der Konsole überwacht und E-Mail-Benachrichtigungen verwaltet werden?](#safekit-notifications-cluster)


## Wie funktioniert ein SafeKit-Mirror-Cluster mit der Webkonsole? {#safekit-mirror-cluster}

### Wie konfiguriert man einen SafeKit-Mirror-Cluster? {#safekit-mirror-cluster-configure}


![SafeKit Web Console: Dashboard für die Hochverfügbarkeitskonfiguration, Heartbeat-Netzwerke, die virtuelle IP-Konfiguration und die Echtzeit-Verzeichnisreplikation für einen Mirror-Cluster anzeigt.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


Die **SafeKit-Webkonsole** bietet eine intuitive Schnittstelle zur Orchestrierung der Hochverfügbarkeit für Ihre kritischen Anwendungen. In nur wenigen Schritten können Sie einen **SafeKit-Mirror-Cluster** konfigurieren, um die Geschäftskontinuität zu gewährleisten:

  * **Anwendungsfailover (Registerkarte „Makros“):** Definieren Sie die spezifischen Anwendungsdienste, die im Falle eines Ausfalls automatisch neu gestartet werden sollen.
  * **Heartbeat-Netzwerk(e):** Dedizierte Kommunikationspfade, die von Clusterknoten verwendet werden, um kontinuierlich den Zustand und die Verfügbarkeit der anderen Knoten zu überwachen und Failover-Entscheidungen zu synchronisieren.
  * **Virtuelles IP-Management:** Richten Sie die virtuelle IP (VIP) für eine transparente Client-Wiederverbindung nach einem Failover ein.
  * **Echtzeit-Replikation:** Wählen Sie die kritischen Verzeichnisse für die hostbasierte, synchrone Replikation auf Byteebene aus.
  * **Checkers:** Überwachen Sie den Zustand der Anwendung und lösen Sie eine automatische Wiederherstellung aus, wenn ein Prozessfehler erkannt wird.


Das SafeKit-Cluster verfügt über eine spezielle Split-Brain-Checker, um Probleme mit der Netzwerktrennung zu lösen, ohne dass ein dritter Witness-Computer oder ein zusätzliches Heartbeat-Netzwerk erforderlich ist. Erfahren Sie mehr über [Heartbeat, Failover und Quorum in einem Cluster](</de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Wie überwacht man einen SafeKit-Mirror-Cluster? {#safekit-mirror-cluster-monitoring}


![SafeKit Web Console: Echtzeitüberwachung eines 2-Knoten Mirror-Cluster die PRIM und SECOND Zustände mit aktiver Datenreplikation anzeigt.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


Die **SafeKit-Managementkonsole** bietet eine einheitliche Ansicht Ihrer Hochverfügbarkeitsinfrastruktur. Sie ermöglicht es Administratoren, den **Betriebsstatus** des Clusters zu überwachen und die Datensynchronisierung in Echtzeit zu verfolgen.

Bei einem Mirror-Cluster mit zwei Knoten zeigt die Konsole die Rollen der einzelnen Server deutlich an:

  * **PRIM (Primär):** Der aktive Knoten, auf dem die Anwendung derzeit ausgeführt wird und der die virtuelle IP-Adresse verwaltet. Er führt Schreibvorgänge in den lokalen Speicher und die Echtzeitreplikation auf den sekundären Knoten durch.
  * **SECOND (Sekundär):** Der Standby-Knoten empfängt synchrone Updates auf Byte-Ebene. Er ist bereit, sofort die Übernahme zu übernehmen, falls der primäre Knoten ausfällt.
  * **ALONE-Status:** Warnt Sie visuell, wenn der Cluster auf einem einzelnen Knoten ausgeführt wird (z. B. während der Wartung oder nach einem Fehler), was darauf hinweist, dass die Redundanz vorübergehend verloren gegangen ist.
  * **Resynchronisierungsfortschritt:** Wenn sich ein ausgefallener Knoten erholt, wird sein Status während der Hintergrunddatenneuintegration orange, um sicherzustellen, dass es während der Phase "Rückkehr zum Normalzustand" keine Ausfallzeiten gibt.


Über einfache Status-Symbole hinaus bietet die Benutzeroberfläche **eine Failover-Orchestrierung mit einem Klick** über das **`...` Menü**, mit der Sie die primäre Rolle für geplante Wartungsarbeiten manuell neu zuweisen und gleichzeitig die kontinuierliche Verfügbarkeit für Benutzeraktivitäten gewährleisten können.

## Wie funktioniert ein SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster mit der Webkonsole? {#safekit-farm-cluster}

### Wie konfiguriere ich einen SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster? {#safekit-farm-cluster-configuration}


![SafeKit Web Console: Farm-Cluster-Konfiguration für Netzwerk-Lastausgleich und virtuelle IP-Verwaltung.](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


Der **SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster** ist für Hochverfügbarkeit und Skalierbarkeit von Diensten ausgelegt. Die Konfiguration konzentriert sich auf die gleichzeitige Verteilung des eingehenden Datenverkehrs auf beide Knoten:

  * **Lastverteilungsdienste (Registerkarte „Makros“):** Definieren Sie die spezifischen Anwendungsdienste (z. B. Apache, IIS, Nginx), die auf allen Knoten aktiv bleiben sollen.
  * **Heartbeat-Netzwerk(e):** Kommunikationspfad(e), die verwendet werden, um zu erkennen, ob ein Knoten die <span class="notranslate farm-term" translate="no">farm</span> verlassen hat, wodurch eine sofortige Umverteilung der Last ausgelöst wird.
  * **Virtuelle IP (<span class="notranslate farm-term" translate="no">farm</span> VIP):** Im Gegensatz zu einem Mirror-Cluster wird die virtuelle IP-Adresse eines <span class="notranslate farm-term" translate="no">Farm</span>-Clusters zwischen allen Knoten gemeinsam genutzt und ein Kernel-Filteralgorithmus verteilt den Netzwerkverkehr.
  * **Lastausgleichsregeln:** Definieren Sie die Richtlinie für die Datenverkehrsverteilung basierend auf der Quell-IP-Adresse oder dem Port.
  * **Checkers:** Überwachen Sie den Zustand der Anwendung und lösen Sie einen automatischen Neustart aus, wenn ein Prozessfehler erkannt wird.


### Wie überwacht man einen SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster? {#safekit-farm-cluster-monitoring}


![SafeKit-Konsole: Überwachung eines 2-Knoten Farm-Cluster der beide Knoten im UP Zustand mit aktiver Lastverteilung anzeigt.](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


Die Überwachung eines <span class="notranslate farm-term" translate="no">Farm</span>-Clusters bietet Einblick in den **Aktiv-Aktiv**-Charakter der Infrastruktur, bei dem alle Knoten zur Leistung der Anwendung beitragen (in diesem Beispiel werden 2 Knoten angezeigt; skalierbar auf zusätzliche Knoten):

  * **UP Status (50 % auf 2 Knoten):** In einer gesunden <span class="notranslate farm-term" translate="no">farm</span> befinden sich beide Knoten im Status „ UP “ (50 %), was bedeutet, dass beide aktiv Client-Anfragen über die gemeinsam genutzte virtuelle IP-Adresse empfangen und verarbeiten.
  * **Automatische Neuausrichtung:** Wenn ein Knoten ausfällt, zeigt die Konsole visuell an, dass der verbleibende Knoten 100 % des Datenverkehrs übernimmt. Es gibt keine „Failover“-Verzögerung, da der überlebende Knoten bereits aktiv ist (abgesehen von einer Erkennungszeit von einigen Sekunden).
  * **Knoteneinfügung:** Wenn ein reparierter Knoten neu gestartet wird, wechselt er von „ STOP “ zu „ UP “ und beginnt automatisch, ohne Eingreifen des Administrators, mit dem Empfang seines Teils der Last.
  * **Keine Datensynchronisation:** Beachten Sie, dass in einem <span class="notranslate farm-term" translate="no">Farm</span>-Cluster kein orangefarbener Resynchronisationsstatus vorhanden ist, da die Knoten zustandslos sein oder eine Backend-Datenbank gemeinsam nutzen sollen (die in einem Mirror-Cluster separat geschützt werden kann).


Über einfache Status-Symbole hinaus bietet die Benutzeroberfläche eine Ein-Klick-Knotenverwaltung über das **`...` Menü**, mit der Sie einen Knoten für geplante Wartungsarbeiten manuell stoppen oder starten können, während die gemeinsam genutzte virtuelle IP den Datenverkehr automatisch neu verteilt, ohne die Benutzeraktivität zu unterbrechen.

## Wie kann man mehrere Module und mehrere Cluster über die Webkonsole überwachen? {#multipe-modules-clusters}

### Multi-Modul-Visualisierung innerhalb eines einzelnen Clusters {#safekit-multi-module}


![SafeKit Web Console: 4 Hyper-V-Module, die auf demselben 2-Knoten-Cluster bereitgestellt werden.](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Bei der Bereitstellung **mehrerer Module** auf einem einzelnen 2-Knoten-Cluster bietet die SafeKit Web Console **individuelle Überwachungswidgets** für jedes Modul. Dies ist besonders wertvoll für **SafeKit Hyper-V** Lösungen. 

**Beispiel:** In der Abbildung mit einem Setup mit 4 geschützten VMs:

  * Die Konsole ist mit node1 verbunden, der als Proxy für die Kommunikation mit node2 fungiert.
  * Die Konsole zeigt **4 Widgets** an (eines für jede VM).
  * Jede VM läuft auf ihrem PRIM-Knoten und wird auf ihren SECOND-Knoten repliziert.
  * Administratoren können in Echtzeit sehen, welche VMs auf jedem Knoten aktiv sind: VM1 und VM2 auf node1, VM3 und VM4 auf node2.
  * Administratoren können eine VM mithilfe des **Menüs `...`** problemlos von einem Knoten auf den anderen migrieren.


Diese granulare Transparenz stellt sicher, dass Sie selbst in Umgebungen mit hoher Dichte die vollständige Kontrolle und sofortige Übersicht über jede replizierte Arbeitslast behalten. 

### Multi-Cluster-Visualisierung {#safekit-multi-cluster}


![SafeKit Web Console: 4 Cluster auf 8 Servern bereitgestellt.](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Wenn Sie **mehrere Cluster** auf mehreren Servern bereitstellen, können Sie entweder mehrere Browser-Registerkarten verwenden, um eine Verbindung zu jedem Cluster herzustellen, oder die PWA-Funktion (Progressive Web App) der Konsole nutzen. Durch die Verwendung der PWA werden die Navigationsmenüs des Browsers entfernt, wodurch Bildschirmplatz gespart wird, um die Clusterüberwachung auf Ihrem Desktop besser zu organisieren. 

**Beispiel:** Die Abbildung zeigt vier PWA-Konsolen, die vier Videoüberwachungscluster in Norden, Süden, Westen und Osten überwachen.

**Hinweis:** Wenn Sie zu viele Cluster haben, um sie auf einem einzigen Desktop anzuzeigen, bietet SafeKit-Benachrichtigungen, um Fehler in zahlreichen Clustern zu erkennen. 

## Wie können Warnmeldungen in der Konsole überwacht und E-Mail-Benachrichtigungen verwaltet werden? {#safekit-notifications-cluster}

### Wie kann ich sofortige Benachrichtigungen bei Modulstatusänderungen und kritischen Ereignissen erhalten? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

Die SafeKit-Webkonsole nutzt native Browserfunktionen, um **sofortige Benachrichtigungen** auszugeben, wenn eine Zustandsänderung eines Moduls auftritt. Dadurch wird sichergestellt, dass kritische Ereignisse sofort zur Kenntnis gebracht werden, auch wenn sich die Konsole in einem Hintergrund-Tab befindet.

  * **Sicherheit:** Benachrichtigungen erfordern den Zugriff über **HTTPS** oder localhost.
  * **PWA-Integration:** Installieren Sie die Konsole als Progressive Web App (PWA) auf dem Desktop oder Mobilgerät, um ein natives App-ähnliches Erlebnis zu erhalten.
  * **Mobile Benachrichtigungen:** Auf Mobilgeräten sind Benachrichtigungen ausschließlich über die PWA verfügbar, wobei HTTPS zwingend erforderlich ist.


Dieser Mechanismus benachrichtigt Benutzer sofort über kritische Ereignisse, wodurch das Bewusstsein für den Cluster-Status verbessert und die Reaktionszeiten verkürzt werden.

### SafeKit-Video: Konsole auf dem Smartphone (0:54) {#demo-console}


### Wie kann ich in SafeKit automatisierte E-Mail-Benachrichtigungen einrichten? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit protokolliert automatisch alle **wichtigen Cluster-Ereignisse in den Systemprotokollen**, was eine nahtlose Integration mit jedem gängigen Überwachungstool auf dem Markt ermöglicht. Darüber hinaus enthält es einen speziellen **E-Mail-Benachrichtigungsagenten**, der diese Protokolle überwacht und kritische Warnmeldungen direkt an Ihren Posteingang liefert. So bleiben die Beteiligten auch dann informiert, wenn die Webkonsole nicht aktiv überwacht wird. 

  * **Intelligente Gruppierung:** Um die Anzahl der Benachrichtigungen zu reduzieren, fasst der Agent Ereignisse, die innerhalb eines kurzen Zeitraums auftreten, in einer einzigen zusammenfassenden E-Mail zusammen.
  * **Vollständige Abdeckung:** Der Agent wird auf allen Knoten installiert und muss explizit mit SMTP-Details konfiguriert werden, um aktiviert zu werden.
  * **Anpassbare Empfänger:** Leiten Sie Warnmeldungen direkt an bestimmte IT-Teams oder Management-Aliase weiter, um eine schnelle Reaktion zu gewährleisten.


Durch die Kombination von Echtzeit-PWA-Benachrichtigungen mit intelligenter E-Mail-Gruppierung bietet SafeKit eine mehrschichtige Benachrichtigungsstrategie für geschäftskritische Vorgänge.

### SafeKit-Video: E-Mail-Benachrichtigungen bei Failover (1:04) {#demo-notifications}



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}