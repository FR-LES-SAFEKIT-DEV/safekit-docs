---
title: "N-1-Redundanz: ein Backup-Server für N Server"
canonical: "https://safekit.eviden.com/de/architectures/n-1-redundancy/"
description: "N-1-Redundanz mit SafeKit: N Anwendungen auf N+1 Servern teilen sich einen einzigen Backup-Server, mit Echtzeit-Replikation und automatischem Failover, ohne SAN."
category: "architectures"
lang: "de"
topics: "Hochverfügbarkeit mit Datenreplikation und Anwendungs-Failover von N Servern auf 1"
hashpart: "high-availability-with-data-replication-and-application-failover-from-n-servers-to-1"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# N-1-Redundanz: ein Backup-Server für N Server {#n-1-redundancy-one-backup-for-n-servers}

## Hochverfügbarkeit mit Datenreplikation und Anwendungs-Failover von N Servern auf 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1-Redundanz {#n-1-redundancy}


![N-1-Redundanzcluster mit SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Wie funktioniert die N-1-Redundanz? {#how-the-n-1-redundancy-works}

SafeKit bietet einen einfachen N-1-Redundanzcluster: N Anwendungen laufen auf N primären Servern, und ein einzelner Backup-Server übernimmt im Falle eines Ausfalls. In einem SafeKit-N-1-Redundanzcluster arbeitet jede Anwendung auf ihren eigenen replizierten Verzeichnissen.

Anders als bei einem [Aktiv-Aktiv-Cluster](</de/architectures/active-active-cluster-real-time-replication/>) muss der Backup-Server bei einem Ausfall des primären Servers keine doppelte Arbeitslast bewältigen.

Dies setzt voraus, dass im N-1-Redundanzcluster jeweils nur ein primärer Server ausfällt. Die Lösung kann auch mehrere primäre Serverausfälle gleichzeitig bewältigen. In diesem Fall führt der einzelne Backup-Server die kombinierte Arbeitslast aller ausgefallenen Server aus.

### Wie implementiert man eine N-1-Redundanz? {#how-to-implement-n-1-redundancy}

Um einen SafeKit-N-1-Redundanzcluster zu konfigurieren, müssen Sie lediglich N Mirror-Module auf N+1 Servern bereitstellen.

Anmerkungen:

  * Alle Anwendungen (Appli1, Appli2, Appli3) müssen auf dem Backup-Server für das Anwendungs-Failover installiert sein.
  * Jedes Mirror-Modul verfügt über eine eigene virtuelle IP-Adresse, eigene replizierte Dateiverzeichnisse und eigene Wiederherstellungsskripte.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}