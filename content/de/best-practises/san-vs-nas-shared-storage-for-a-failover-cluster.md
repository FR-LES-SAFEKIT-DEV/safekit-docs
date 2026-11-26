---
title: "SAN vs. NAS: Gemeinsamer Speicher für Failover-Clustering – ein detaillierter Vergleich"
canonical: "https://safekit.eviden.com/de/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "SAN vs. NAS als gemeinsamer Speicher für Failover-Cluster: Grenzen, Kosten und Risiken, und warum die SafeKit-Replikation gemeinsamen Speicher überflüssig macht."
category: "best-practises"
lang: "de"
topics: "SAN- oder NAS-Gemeinsamspeicher: Was ist für einen Failover-Cluster einfacher?, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# SAN vs. NAS: Gemeinsamer Speicher für Failover-Clustering – ein detaillierter Vergleich {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## SAN- oder NAS-Gemeinsamspeicher: Was ist für einen Failover-Cluster einfacher? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  SAN Shared-Storage oder NAS-iSCSI-Shared-Storage für einen Failover-Cluster {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![SAN Shared-Storage oder NAS-iSCSI-Shared-Storage für einen Failover-Cluster](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Mehrere Elemente machen diese Architektur komplex in der Umsetzung:

  * Bei einem Failover erfordert das Umschalten des gemeinsam genutzten Speichers Low-Level-Befehle. Diese Befehle hängen vom Speicherhersteller ab.
  * Vor dem Neustart der Anwendung muss ein Dateisystemwiederherstellungsvorgang ausgeführt werden.
  * Wenn die Dateisysteme auf beiden Knoten gleichzeitig auf dieselbe Rohfestplatte zugreifen, wird das gesamte Dateisystem beschädigt.
  * Um diesen doppelten Zugriff zu vermeiden, müssen Sie eine Quorum-Festplatte konfigurieren.


###  NAS-SMB-Freigabespeicher oder NAS-NFS-Freigabespeicher für einen Failover-Cluster {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![NAS-SMB-Freigabespeicher oder NAS-NFS-Freigabespeicher für einen Failover-Cluster](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Mehrere Elemente vereinfachen die Implementierung dieser Architektur:

  * Bei einem Failover erfordert das Umschalten des gemeinsam genutzten Speichers lediglich das erneute Einhängen des externen Dateisystems.
  * Vor dem Neustart der Anwendung ist kein Dateisystemwiederherstellungsverfahren erforderlich.
  * Wenn beide Knoten gleichzeitig auf dasselbe freigegebene Dateisystem zugreifen, wird das Dateisystem nicht beschädigt.
  * Wenn Knoten jedoch isoliert sind, kann dieselbe Anwendung weiterhin auf beiden Knoten ausgeführt werden. Diese doppelte Ausführung kann die Anwendungsdaten im gemeinsam genutzten Speicher beschädigen.


###  Echtzeit-Replikation und Failover mit Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![Echtzeit-Replikation und Failover mit SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit hat diese Probleme nicht. Mit SafeKit erfordern Replikation und Failover keinen gemeinsam genutzten Speicher.

Wenn SafeKit jedoch gemeinsam genutzten Speicher verwalten muss:

  * Verwenden Sie gemeinsam genutzten NAS-SMB- oder NAS-NFS-Speicher.
  * Fügen Sie die Befehle zum Mounten und Unmounten des externen Dateisystems in die Neustartskripte ein.
  * Konfigurieren Sie den SafeKit [Split-Brain-Checker](</de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>). Sie verhindert eine doppelte Ausführung derselben Anwendung auf dem gemeinsam genutzten Speicher, wenn Knoten isoliert sind.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}