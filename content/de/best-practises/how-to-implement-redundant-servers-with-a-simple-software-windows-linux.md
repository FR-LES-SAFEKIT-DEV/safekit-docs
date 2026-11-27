---
title: "So implementieren Sie redundante Server mit einfacher HA-Software"
canonical: "https://safekit.eviden.com/de/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Redundante Server nur mit Software umsetzen: SafeKit bietet Echtzeit-Replikation und automatisches Failover unter Windows und Linux, ohne gemeinsame Festplatte."
category: "best-practises"
lang: "de"
topics: "Wie implementiert man aktive/passive redundante Server mit Echtzeit-Replikation und Failover?, Wie implementiert man aktive/aktive redundante Server mit Netzwerk-Lastausgleich und Failover?"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# So implementieren Sie redundante Server mit einfacher HA-Software {#how-to-implement-redundant-servers-with-simple-ha-software}

## Wie implementiert man aktive/passive redundante Server mit Echtzeit-Replikation und Failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### Das SafeKit-Mirror-Cluster {#the-safekit-mirror-cluster}


![Redundante Server mit Echtzeit-Dateireplikation und Failover](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


In einem Mirror-Cluster ist die SafeKit-Software auf zwei Servern installiert. Die Server sind physisch oder virtuell. Sie laufen unter Windows oder Linux, vor Ort oder in der Cloud. Der primäre Server ist der aktive Server. Er führt die kritische Anwendung aus. Der sekundäre Server ist ein passiver redundanter Server. Er empfängt in Echtzeit alle Änderungen, die die Anwendung an ihren Dateien vornimmt. Clients verbinden sich mit einer [virtuellen IP-Adresse](</de/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Wenn der primäre Server ausfällt, startet SafeKit die kritische Anwendung automatisch auf dem sekundären Server neu. Dieser Server wird zum primären Server und übernimmt die virtuelle IP-Adresse. Wenn der ausgefallene Server neu startet, synchronisiert SafeKit seine Daten automatisch neu. Dieser Server wird dann zum passiven redundanten Server im sekundären Zustand.

## Wie implementiert man aktive/aktive redundante Server mit Netzwerk-Lastausgleich und Failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### Das SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster {#the-safekit-farm-cluster}


![Redundante Server mit Netzwerk-Lastausgleich und Failover](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


In einem <span class="notranslate farm-term" translate="no">Farm</span>-Cluster wird die SafeKit-Software auf mehreren redundanten Servern installiert. Die Server laufen unter Windows oder Linux, vor Ort oder in der Cloud. Alle redundanten Server sind aktiv. Sie führen dieselbe kritische Front-End-Anwendung aus. Clients verbinden sich mit einer [virtuellen IP-Adresse](</de/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). TCP-Sitzungen werden zwischen allen redundanten Servern per Lastausgleich verteilt. Wenn ein Server ausfällt, konfiguriert SafeKit den Lastausgleich der TCP-Sitzungen zwischen den verbleibenden aktiven Servern automatisch neu. Wenn der ausgefallene Server neu gestartet wird, integriert SafeKit ihn automatisch wieder als aktiven redundanten Server. Dieser Server empfängt dann neue TCP-Sitzungen.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}