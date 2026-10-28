---
title: "Umgang mit Stromausfällen und Netzwerkisolierung in einem HA-Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Erfahren Sie, wie Sie Netzwerkisolation und Stromausfälle in einem Hochverfügbarkeitscluster managen. SafeKit schlägt eine SAN-lose Architektur mit integrierten Split-Brain-Prüfmechanismen und automatischer Resynchronisierung vor, um Datenintegrität und 24/7-Verfügbarkeit ohne gemeinsam genutzte Festplatte zu gewährleisten."
category: "best-practises"
lang: "de"
topics: "Welche Szenarien gibt es bei Netzwerkisolation in einem Cluster? Welche Szenarien gibt es bei Stromausfall in einem Cluster? 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Umgang mit Stromausfällen und Netzwerkisolierung in einem HA-Cluster {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-de  %}}
 

## Welche verschiedenen Szenarien gibt es bei einem Stromausfall in einem Cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

### Stromausfall am primären Knoten {#primary-node-power-outage}

Wenn bei einem Stromausfall nur der primäre Knotenpunkt betroffen ist:

  * Es findet ein automatisches Failover auf den sekundären Knoten statt, der dadurch in den Alleinbetrieb wechselt und die Anwendung neu startet.
  * Wenn Knoten 1 neu gestartet wird, wird er nach der Resynchronisierung der replizierten Daten zu SEDOND.
  * Die Rollen des primären und sekundären Administrators können bei Bedarf von einem Administrator getauscht werden.


### Stromausfall des Sekundärknotens {#secondary-node-power-outage}

Wenn bei einem Stromausfall nur der sekundäre Knoten ausfällt:

  * Es findet kein Failover statt, der primäre Knoten wird ALLEIN und die Anwendung wird auf Knoten 1 fortgesetzt.
  * Wenn Knoten 2 neu gestartet wird, wird er nach der Resynchronisierung der replizierten Daten zu SEDOND.


### Allgemeiner Stromausfall - Fall 1 {#general-power-outage---case-1}

Wenn ein Stromausfall beide Knoten lahmlegt, ist das Standardverhalten:

  * Beide Knoten gehen in den STOP-Zustand.
  * Wenn Knoten 1 neu gestartet wird, wechselt er nicht in den Zustand „ALONE“ und startet die Anwendung nicht neu, da er nicht weiß, ob er über aktuelle Daten verfügt. Daher wechselt er in den Zustand „WAIT“ und wartet auf den Neustart des anderen Knotens.
  * Wenn Knoten 2 neu gestartet wird, kehren beide Knoten in ihren vorherigen PRIM/SECOND-Zustand zurück.


### Allgemeiner Stromausfall - Fall 2 {#general-power-outage---case-2}

Wenn ein Stromausfall beide Knoten lahmlegt, verhält sich syncdelta wie folgt:

  * Der Wert für syncdelta ist beispielsweise in der Konfiguration auf 10 Minuten eingestellt, was bedeutet, dass der Start eines Knotens akzeptiert wird, selbst wenn seine Daten 10 Minuten hinter der letzten Synchronisierung zurückliegen.
  * Wenn Knoten 1 neu gestartet wird, wechselt er in den Zustand „ALLONE“ und startet die Anwendung neu, vorausgesetzt, der Neustart erfolgt innerhalb von 10 Minuten nach dem Stromausfall.
  * Wenn Knoten 2 neu gestartet wird, wird er nach der Resynchronisierung der replizierten Daten zum zweiten Knoten.
  * Hinweis: Wenn Knoten 2 zuerst neu gestartet wird, wird er zu ALLEIN und Knoten 1 wird beim Start ZWEITER.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}