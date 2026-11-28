---
title: "Business-Continuity- und Disaster-Recovery-Software"
canonical: "https://safekit.eviden.com/de/use-cases/business-continuity-and-disaster-recovery-software/"
description: "Geschäftskontinuität und Disaster Recovery mit SafeKit: ein Cluster mit zwei Knoten über zwei Serverräume, mit synchroner Replikation und automatischem Failover."
category: "use-cases"
lang: "de"
topics: "Software für Geschäftskontinuität und Notfallwiederherstellung"
hashpart: "business-continuity-and-disaster-recovery-software"
translation: "translate_md 2026-11-16.4 | glossaire 2026-11-16.12 | Translation LLM | 47 expressions"
image: "/wp-content/uploads/2023/02/remote-datacenters.png"
schemaType: "Article"
---

# Business-Continuity- und Disaster-Recovery-Software {#business-continuity-and-disaster-recovery-software}

## Software für Geschäftskontinuität und Notfallwiederherstellung {#business-continuity-and-disaster-recovery-software}

### Gründe für die Wahl der SafeKit-Software für Geschäftskontinuität und Notfallwiederherstellung {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![Einfache Software für Geschäftskontinuität und Notfallwiederherstellung mit SafeKit](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


Die Konfiguration ist dieselbe, unabhängig davon, ob Sie einen SafeKit-Cluster in einem Serverraum oder in zwei entfernten Serverräumen bereitstellen. Die einzige Voraussetzung ist ein erweitertes LAN oder ein Stretched VLAN zwischen den entfernten Standorten.

### Wie implementiert man eine einfache Hochverfügbarkeitslösung zwischen zwei entfernten Serverräumen? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

Mit SafeKit können Sie das Mirror-Modul und das <span class="notranslate farm-term" translate="no">Farm</span>-Modul problemlos auf Servern in entfernten Serverräumen bereitstellen. Es ist keine spezielle Clusterkonfiguration erforderlich. SafeKit kombiniert daher Geschäftskontinuität und Notfallwiederherstellung in einer einzigen, einfachen Architektur. SafeKit übernimmt auch die Netzwerktrennung ohne einen dritten Server oder eine spezielle Quorum-Festplatte. Lesen Sie mehr über [das Split-Brain-Management](</de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Geschäftskontinuität vs. Backup-Lösungen {#business-continuity-vs-backup-solutions}

Lösungen für Geschäftskontinuität und Backup befassen sich mit unterschiedlichen Ausfallszenarien. Sie ergänzen sich, sind aber nicht austauschbar. SafeKit-Hochverfügbarkeits-Clustering sorgt für Geschäftskontinuität. Es hält Anwendungen mit minimaler Unterbrechung am Laufen, wenn ein Server oder eine Anwendung ausfällt, dank Echtzeit-Replikation und automatischem Failover. Backup-Lösungen schützen vor umfassenderen Verlusten, wie z. B. Ransomware-Angriffen oder Bedienerfehlern. Sie basieren in der Regel auf externen Datenkopien, die Sie anschließend wiederherstellen. Die Wiederherstellung dauert länger und es gibt keinen automatischen Failover.

Erfahren Sie mehr über [die Kombination von SafeKit Hochverfügbarkeit mit Disaster-Recovery-Backups](</de/best-practises/high-availability-disaster-recovery-hadr/>).


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}