---
title: "N-1-Redundanzclustering: Hohe Verfügbarkeit für mehrere Anwendungen mit nur einem Backup"
canonical: "https://safekit.eviden.com/de/architectures/n-1-redundancy/"
description: "Optimieren Sie Ihr Rechenzentrum mit der N-1-Redundanz SafeKit . Setzen Sie N mirror -Module auf N+1 Servern ein, um Hochverfügbarkeit für mehrere Anwendungen mit einem einzigen gemeinsamen Backup zu gewährleisten. Dank Echtzeitreplikation für Windows und Linux entfallen SAN-Anforderungen und Hardwarekosten. Weitere Informationen."
category: "architectures"
lang: "de"
topics: "Hochverfügbarkeit mit Datenreplikation und Anwendungs-Failover von N Servern auf 1, 🔍 SafeKit Hochverfügbarkeits-Navigationshub"
---

# N-1-Redundanzclustering: Hochverfügbarkeit für mehrere Anwendungen mit einem Backup {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Hochverfügbarkeit mit Datenreplikation und Anwendungs-Failover von N Servern auf 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1 Redundanz {#n-1-redundancy}


![ SafeKit N-1 Redundanzcluster ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Wie funktioniert die N-1-Redundanz? {#how-the-n-1-redundancy-works}

SafeKit bietet einen einfachen N-1-Redundanzcluster mit N Anwendungen, die auf N Servern laufen, und einem einzigen Backup für den Failover. In einem SafeKit N-1-Redundanzcluster arbeitet jede Anwendung mit ihren eigenen replizierten Verzeichnissen.

Im Falle des Ausfalls eines primären Servers, anders als beim Aktiv-Aktiv-Cluster [ ](</de/architectures/active-active-cluster-real-time-replication/>) , muss der Backup-Server keine doppelte Arbeitslast bewältigen.

Dies setzt voraus, dass im N-1-Redundanzcluster jeweils nur ein Server ausfällt. Die Lösung kann zwar den gleichzeitigen Ausfall mehrerer primärer Server unterstützen, in diesem Fall muss der einzelne Backup-Server jedoch die gesamte Arbeitslast aller ausgefallenen Server bewältigen.

### Wie implementiert man N-1-Redundanz? {#how-to-implement-n-1-redundancy}

Der SafeKit N-1 Redundanzcluster wird einfach durch die Bereitstellung von N mirror Modulen auf N+1 Servern konfiguriert.

Beachten Sie, dass:

  * Alle Anwendungen (Appli1, Appli2, Appli3) müssen auf dem einzigen Backup-System installiert sein, um ein Anwendungs-Failover zu gewährleisten.
  * Jedes mirror Modul verfügt über eine eigene virtuelle IP-Adresse, eigene replizierte Dateiverzeichnisse und eigene Wiederherstellungsskripte.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}