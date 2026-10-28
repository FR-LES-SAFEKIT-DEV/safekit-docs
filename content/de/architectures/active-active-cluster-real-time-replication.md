---
title: "Active-Active-Clustering-Software mit Echtzeitreplikation und gegenseitigem Failover"
canonical: "https://safekit.eviden.com/de/architectures/active-active-cluster-real-time-replication/"
description: "Optimieren Sie die Ressourcennutzung mit dem Active-Active-Clustering SafeKit . Implementieren Sie ein gegenseitiges Failover zwischen zwei Servern mithilfe von synchroner Echtzeitreplikation und mehreren mirror -Modulen. Gewährleisten Sie null Datenverlust (RPO=0) und automatische Wiederherstellung für Windows und Linux ohne SAN. Laden Sie die kostenlose Testversion herunter."
category: "architectures"
lang: "de"
topics: "Wie funktioniert ein Active-Active-Cluster mit Echtzeitreplikation?, 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Active-Active-Clustering-Software mit Echtzeitreplikation und gegenseitigem Failover {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Wie funktioniert ein Active-Active-Cluster mit Echtzeitreplikation? {#how-the-active-active-cluster-with-real-time-replication-works}

### Aktiv-Aktiv-Cluster mit Echtzeitreplikation {#active--active-cluster-with-real-time-replication}

Die Anwendungen laufen auf zwei Servern im gegenseitigen Failover-System. Jeder Server dient als Backup für den anderen. Jede Anwendung arbeitet mit ihren eigenen replizierten Dateiverzeichnissen.


![ SafeKit aktiver aktiver Cluster mit Echtzeitreplikation ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Fällt in einem Active-Active-Cluster ein Server aus, laufen alle Anwendungen auf demselben Server weiter. Nach dem Neustart des ausgefallenen Servers werden die Anwendungen wieder auf ihrem primären Standardserver ausgeführt.

### Wie funktioniert es? {#how-it-works}

Der Active-Active-Cluster SafeKit wird einfach durch die Bereitstellung zweier mirror -Module mit Echtzeitreplikation konfiguriert. Jedes mirror -Modul enthält seine eigene Konfiguration aus virtueller IP-Adresse, in Echtzeit replizierten Verzeichnissen und Neustartskripten.

Beachten Sie, dass:

  * Für das Anwendungs-Failover müssen die beiden Anwendungen Appli1 und Appli2 auf jedem Server installiert sein.
  * Diese Architektur ist nicht auf 2 Anwendungen beschränkt: N Anwendungsmodule können auf 2 Servern mit maximal 25 Modulen bereitgestellt werden.
  * Jedes mirror Modul verfügt über eine eigene virtuelle IP-Adresse, eigene replizierte Dateiverzeichnisse und eigene Wiederherstellungsskripte.


### Beispiel eines aktiven Clusters {#example-of-an-active-active-cluster}

Die 💡 [ Hyper-V ](</de/solutions/hyper-v-replication-automatic-failover-load-balancing/>) oder 💡 [ KVM ](</de/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) Lösung mit Replikation, automatischem Failover und Lastausgleich von VMs ist ein Beispiel für einen Aktiv-Aktiv-Cluster mit N mirror Modulen, die N virtuelle Maschinen zwischen zwei physischen Servern replizieren.

In dieser Konfiguration repliziert ein mirror -Modul eine vollständige virtuelle Maschine und startet die virtuelle Maschine im Fehlerfall neu. 

In einem solchen Modul gibt es keine virtuelle IP-Adresse, da beim Neustart einer VM auf einem Server automatisch ein Failover der physischen IP-Adresse der VM erfolgt. 

In dieser Architektur wird eine kritische Anwendung innerhalb einer VM installiert.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}