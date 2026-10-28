---
title: "Wie man redundante Server mit einfacher HA-Software implementiert"
canonical: "https://safekit.eviden.com/de/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Erfahren Sie, wie Sie redundante Server mit einem einfachen, rein softwarebasierten Ansatz implementieren. SafeKit schlägt eine SAN-lose Architektur für Windows und Linux vor, die Datenreplikation in Echtzeit und automatisches Failover ohne gemeinsam genutzte Festplatten oder spezielle IT-Kenntnisse ermöglicht."
category: "best-practises"
lang: "de"
topics: "Wie implementiert man aktiv/passiv redundante Server mit Echtzeitreplikation und Failover? Wie implementiert man aktiv/aktiv redundante Server mit Netzwerklastausgleich und Failover? 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Wie man redundante Server mit einfacher HA-Software implementiert {#how-to-implement-redundant-servers-with-simple-ha-software}

## Wie implementiert man aktiv/passiv redundante Server mit Echtzeitreplikation und Failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### Der Cluster SafeKit mirror {#the-safekit-mirror-cluster}


![ Redundante Server mit Echtzeit-Dateireplikation und Failover ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


In einem mirror Cluster ist die Software SafeKit auf zwei physischen oder virtuellen Servern installiert, auf denen Windows oder Linux (lokal oder in der Cloud) ausgeführt wird. Der primäre Server ist der aktive Server und führt eine kritische Anwendung aus. Der sekundäre Server ist ein passiver redundanter Server, der alle von der Anwendung in ihren Dateien vorgenommenen Änderungen in Echtzeit empfängt. Clients sind mit der virtuellen IP-Adresse [ verbunden. Fällt der primäre Server aus, startet ](</de/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) die kritische Anwendung automatisch auf dem passiven redundanten Server neu SafeKit der dann zum primären Server wird und die virtuelle IP-Adresse ändert. Nach dem Neustart des ausgefallenen Servers erfolgt die automatische Resynchronisierung, und dieser wird zum passiven redundanten Server, der als sekundärer Server fungiert.

## Wie implementiert man aktiv/aktiv redundante Server mit Netzwerklastausgleich und Failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### Der Cluster SafeKit `farm` {#the-safekit-farm-cluster}


![ Redundante Server mit Netzwerklastausgleich und Failover ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


In einem `farm` Cluster ist die Software SafeKit auf redundanten Servern installiert, auf denen Windows oder Linux (lokal oder in der Cloud) ausgeführt wird. Alle redundanten Server sind aktiv und führen dieselbe kritische Frontend-Anwendung aus. Clients sind mit der virtuellen IP-Adresse [ ](</de/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>) verbunden. Die TCP-Sitzungen werden gleichmäßig auf alle redundanten Server verteilt. Fällt ein Server aus, konfiguriert SafeKit die Lastverteilung der TCP-Sitzungen automatisch neu. Nach dem Neustart des ausgefallenen Servers wird dieser automatisch wieder als aktiver redundanter Server integriert und empfängt neue TCP-Sitzungen.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}