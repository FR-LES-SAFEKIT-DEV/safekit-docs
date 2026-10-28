---
title: "Business Continuity und Disaster Recovery Software für 2-Knoten-Cluster mit SafeKit"
canonical: "https://safekit.eviden.com/de/use-cases/business-continuity-and-disaster-recovery-software/"
description: "SafeKit ist eine Software für Geschäftskontinuität und Notfallwiederherstellung und implementiert eine einfache Hochverfügbarkeitslösung zwischen zwei entfernten Serverräumen. Erreichen Sie mit SafeKit , der benutzerfreundlichsten Software für Geschäftskontinuität und Notfallwiederherstellung, eine Verfügbarkeit rund um die Uhr. Dank synchroner 2-Knoten-Replikation, automatischem Failover und Lastausgleich für Windows und Linux entfallen teure SANs und komplexe IT-Kenntnisse. Null Datenverlust (RPO=0) für kritische Anwendungen in jeder Cloud- oder On-Premise-Umgebung."
category: "use-cases"
lang: "de"
topics: "Software für Geschäftskontinuität und Notfallwiederherstellung, 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Business Continuity und Disaster Recovery Software für 2-Knoten-Cluster mit SafeKit {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## Software für Geschäftskontinuität und Notfallwiederherstellung {#business-continuity-and-disaster-recovery-software}

### Gründe für die Wahl der Software SafeKit für Geschäftskontinuität und Notfallwiederherstellung {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![ Einfache Software für Geschäftskontinuität und Notfallwiederherstellung mit SafeKit ](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


Es gibt keinen Konfigurationsunterschied, wenn ein SafeKit Cluster im selben Computerraum oder über entfernte Computerräume hinweg bereitgestellt wird, vorausgesetzt, dass zwischen den entfernten Standorten ein erweitertes LAN oder ein gestrecktes VLAN verfügbar ist.

### Wie lässt sich eine einfache Hochverfügbarkeitslösung zwischen zwei entfernten Serverräumen implementieren? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

Die Module SafeKit mirror und `farm` lassen sich ohne spezielle Clusterkonfiguration problemlos auf Servern in entfernten Rechenzentren einsetzen. Dadurch vereint SafeKit Geschäftskontinuität und Notfallwiederherstellung in einer einzigen, einfachen Architektur. SafeKit verwaltet zudem im Falle einer Netzwerkisolation die Split-Brain-Situation [ ](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) , ohne dass ein dritter Server oder eine spezielle Quorum-Festplatte erforderlich ist.

### Geschäftskontinuität vs. Backup-Lösungen {#business-continuity-vs-backup-solutions}

Business-Continuity- und Backup-Lösungen decken unterschiedliche Ausfallszenarien ab und ergänzen sich, anstatt austauschbar zu sein. Business Continuity, bereitgestellt durch das Hochverfügbarkeits-Clustering von SafeKit , gewährleistet den unterbrechungsfreien Betrieb von Anwendungen im Falle eines Server- oder Anwendungsausfalls durch Echtzeitreplikation und automatisches Failover. Backup-Lösungen schützen vor umfassenderen Datenverlusten, wie beispielsweise Ransomware-Angriffen oder Bedienungsfehlern. Sie basieren typischerweise auf externen Datenkopien, die später wiederhergestellt werden können, benötigen jedoch längere Wiederherstellungszeiten und bieten kein automatisches Failover.

Mehr dazu erfahren Sie in [ Kombination von SafeKit Hochverfügbarkeit mit Disaster-Recovery-Backups ](</best-practises/high-availability-disaster-recovery-hadr/>) .


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}