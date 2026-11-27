---
title: "Umgang mit Stromausfällen und Netzwerktrennung in einem HA-Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Wie ein Hochverfügbarkeitscluster Stromausfälle und Netzwerkisolation bewältigt: Der SafeKit Split-Brain-Checker und die automatische Resynchronisation schützen Ihre Daten."
category: "best-practises"
lang: "de"
topics: "Welche verschiedenen Szenarien gibt es bei einem Stromausfall in einem Cluster?"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Umgang mit Stromausfällen und Netzwerktrennung in einem HA-Cluster {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-de  %}}
 

## Welche verschiedenen Szenarien gibt es bei einem Stromausfall in einem Cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

In den folgenden Szenarien ist Knoten 1 zunächst der primäre Knoten. Knoten 2 ist zunächst der sekundäre Knoten.

### Stromausfall am primären Knoten {#primary-node-power-outage}

Wenn ein Stromausfall nur den primären Knoten betrifft:

  * SafeKit schaltet automatisch auf den sekundären Knoten um. Knoten 2 wird ALONE und startet die Anwendung neu.
  * Wenn Knoten 1 neu startet, synchronisiert er die replizierten Daten neu. Dann wird er SECOND.
  * Bei Bedarf kann ein Administrator die primären und sekundären Rollen vertauschen.


### Stromausfall am sekundären Knoten {#secondary-node-power-outage}

Wenn ein Stromausfall nur den sekundären Knoten stoppt:

  * Es findet kein Failover statt. Knoten 1 wird ALONE. Die Anwendung wird weiterhin auf Knoten 1 ausgeführt.
  * Wenn Knoten 2 neu startet, synchronisiert er die replizierten Daten neu. Dann wird er SECOND.


### Stromausfall auf beiden Knoten – Fall 1 {#general-power-outage---case-1}

Wenn ein Stromausfall beide Knoten stilllegt, ist das Standardverhalten wie folgt:

  * Beide Knoten wechseln in den STOP-Zustand.
  * Wenn Knoten 1 neu startet, wechselt er nicht in den ALONE-Zustand. Er startet die Anwendung nicht neu. Er kann nicht wissen, ob seine Daten auf dem neuesten Stand sind. Also wechselt er in den WAIT-Zustand und wartet darauf, dass der andere Knoten neu startet.
  * Wenn Knoten 2 neu gestartet wird, kehren beide Knoten in ihre vorherigen Zustände zurück: PRIM und SECOND.


### Stromausfall auf beiden Knoten – Fall 2 {#general-power-outage---case-2}

Wenn ein Stromausfall beide Knoten stoppt, ist das Verhalten mit dem Parameter `syncdelta` wie folgt:

  * In diesem Beispiel ist `syncdelta` in der Konfiguration auf 10 Minuten eingestellt. Ein Knoten kann dann starten, auch wenn seine Daten bis zu 10 Minuten hinter der letzten Synchronisierung zurückliegen.
  * Wenn Knoten 1 innerhalb von 10 Minuten nach dem Stromausfall neu startet, wechselt er in den Zustand ALONE. Er startet die Anwendung neu.
  * Wenn Knoten 2 neu startet, synchronisiert er die replizierten Daten neu. Dann wird er SECOND.
  * Hinweis: Wenn Knoten 2 zuerst neu startet, wird er ALONE. Knoten 1 wird dann SECOND, wenn er startet.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}