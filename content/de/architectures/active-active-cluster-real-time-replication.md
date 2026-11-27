---
title: "Aktiv-Aktiv-Clustering-Software mit Echtzeit-Replikation und gegenseitiger Ausfallsicherung"
canonical: "https://safekit.eviden.com/de/architectures/active-active-cluster-real-time-replication/"
description: "Aktiv-Aktiv-SafeKit-Cluster: Zwei Server sichern sich mit mehreren Mirror-Modulen gegenseitig ab, synchrone Replikation und gegenseitiges Failover unter Windows und Linux."
category: "architectures"
lang: "de"
topics: "Wie funktioniert ein Aktiv-Aktiv-Cluster mit Echtzeit-Replikation?"
hashpart: "how-the-active-active-cluster-with-real-time-replication-works"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
schemaType: "TechArticle"
---

# Aktiv-Aktiv-Clustering-Software mit Echtzeit-Replikation und gegenseitiger Ausfallsicherung {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Wie funktioniert ein Aktiv-Aktiv-Cluster mit Echtzeit-Replikation? {#how-the-active-active-cluster-with-real-time-replication-works}

### Aktiv-Aktiv-Cluster mit Echtzeit-Replikation {#active--active-cluster-with-real-time-replication}

Zwei Server führen Anwendungen aus und sichern sich gegenseitig. Dies wird als gegenseitiges Failover bezeichnet: Jeder Server ist die Sicherung des anderen Servers. Jede Anwendung verwendet ihre eigenen replizierten Dateiverzeichnisse.


![SafeKit-Aktiv-Aktiv-Cluster mit Echtzeit-Replikation](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Wenn ein Server in einem Aktiv-Aktiv-Cluster ausfällt, werden alle Anwendungen auf dem verbleibenden Server ausgeführt. Wenn der ausgefallene Server neu gestartet wird, kehrt jede Anwendung zu ihrem primären Standardserver zurück.

### Wie funktioniert es? {#how-it-works}

Um einen Aktiv-Aktiv-Cluster mit SafeKit zu konfigurieren, stellen Sie einfach zwei Mirror-Module mit Echtzeit-Replikation bereit. Jedes Mirror-Modul hat seine eigene Konfiguration: eine virtuelle IP-Adresse, in Echtzeit replizierte Verzeichnisse und Neustart-Skripte.

Anmerkungen:

  * Für das Anwendungsfailover müssen beide Anwendungen (Appli1 und Appli2) auf jedem Server installiert sein.
  * Diese Architektur ist nicht auf zwei Anwendungen beschränkt. Sie können bis zu 25 Anwendungsmodule auf denselben beiden Servern bereitstellen.
  * Jedes Mirror-Modul verfügt über eine eigene virtuelle IP-Adresse, eigene replizierte Dateiverzeichnisse und eigene Wiederherstellungsskripte.


### Beispiel für einen Aktiv-Aktiv-Cluster {#example-of-an-active-active-cluster}

Die 💡 [Hyper-V](</de/solutions/hyper-v-replication-automatic-failover-load-balancing/>) oder 💡 [KVM](</de/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)-Lösung ist ein Beispiel für einen Aktiv-Aktiv-Cluster. Diese Lösung bietet Replikation, automatisches Failover und Lastausgleich von virtuellen Maschinen. In diesem Cluster replizieren N Mirror-Module N virtuelle Maschinen zwischen zwei physischen Servern.

In dieser Konfiguration repliziert jedes Mirror-Modul eine vollständige virtuelle Maschine und startet sie bei einem Fehler neu.

Diese Art von Modul benötigt keine virtuelle IP-Adresse. Wenn die virtuelle Maschine auf dem anderen Server neu gestartet wird, wird ihre eigene IP-Adresse automatisch mitverschoben.

Bei dieser Architektur ist die kritische Anwendung in einer virtuellen Maschine installiert.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}