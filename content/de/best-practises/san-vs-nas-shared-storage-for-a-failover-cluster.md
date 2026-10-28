---
title: "SAN vs. NAS Shared Storage für Failover-Cluster: Ein detaillierter Vergleich"
canonical: "https://safekit.eviden.com/de/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Vergleichen Sie SAN- und NAS-Speicherlösungen für Failover-Cluster. Erfahren Sie, warum SafeKit eine SAN-lose Architektur vorschlägt, die Abhängigkeiten von gemeinsam genutztem Speicher beseitigt, Failover-Skripte vereinfacht und Datenbeschädigung ohne teure Hardware oder komplexe Quorum-Disks verhindert."
category: "best-practises"
lang: "de"
topics: "Welche Lösung – SAN oder NAS als gemeinsam genutzter Speicher – ist für einen Failover-Cluster am einfachsten? 🔍 SafeKit Navigationszentrale für Hochverfügbarkeit"
---

# SAN vs. NAS Shared Storage für Failover-Clustering: Ein detaillierter Vergleich {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## Welche Lösung – SAN oder NAS als gemeinsam genutzter Speicher – ist für einen Failover-Cluster am einfachsten? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  SAN-gemeinsamer Speicher oder NAS-iSCSI-gemeinsamer Speicher für einen Failover-Cluster {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![ SAN-gemeinsamer Speicher oder NAS-iSCSI-gemeinsamer Speicher für einen Failover-Cluster ](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Mehrere Faktoren erschweren die Implementierung dieser Architektur:

  * Im Fehlerfall erfordert das Umschalten des gemeinsam genutzten Speichers Anweisungen auf niedriger Ebene, die vom Speicherhersteller abhängig sind.
  * Die Wiederherstellungsprozedur des Dateisystems (FS) muss vor dem Neustart der Anwendung abgeschlossen sein.
  * Wenn beide Dateisysteme auf beiden Knoten gleichzeitig auf dieselbe Rohfestplatte zugreifen, wird das gesamte Dateisystem beschädigt.
  * Um einen doppelten Zugriff zu vermeiden, muss eine Quorum-Disk konfiguriert werden.


###  NAS SMB- oder NAS NFS-Speicher für einen Failover-Cluster {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![ NAS SMB-Freigabespeicher oder NAS NFS-Freigabespeicher für einen Failovercluster ](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Mehrere Elemente erleichtern die Implementierung dieser Architektur. 
  * Im Fehlerfall bedeutet das Umschalten des gemeinsam genutzten Speichers lediglich das erneute Einbinden des externen Dateisystems.
  * Vor dem Neustart der Anwendung darf kein Wiederherstellungsverfahren für das Dateisystem durchgeführt werden.
  * Wenn beide Knoten gleichzeitig auf dasselbe gemeinsam genutzte Dateisystem zugreifen, wird das gesamte Dateisystem nicht beschädigt.
  * Allerdings besteht weiterhin die Möglichkeit, dass eine doppelte Ausführung derselben Anwendung die Daten im gemeinsamen Speicher beschädigt, wenn die Knoten isoliert sind.


###  Echtzeitreplikation und Failover mit Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![ Echtzeitreplikation und Failover mit SafeKit ](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


Bei SafeKit gibt es solche Probleme nicht, da dessen Replikations- und Failover-Lösung keinen gemeinsam genutzten Speicher benötigt.

Wenn SafeKit jedoch einen gemeinsam genutzten Speicher verwalten muss:

  * Verwenden Sie einen NAS-SMB-Speicher oder einen NAS-NFS-Speicher.
  * Fügen Sie in die Neustartskripte das Mounten/Unmounten des externen Dateisystems ein.
  * Konfigurieren Sie den Split-Brain-Checker [ SafeKit ](</de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) , um eine doppelte Ausführung derselben Anwendung beim Zugriff auf den gemeinsamen Speicher zu vermeiden, wenn Knoten isoliert sind.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}