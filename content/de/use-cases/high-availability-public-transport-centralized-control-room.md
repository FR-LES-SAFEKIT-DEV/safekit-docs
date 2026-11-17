---
title: "Hohe Verfügbarkeit im öffentlichen Nahverkehr: Zentrale Leitstelle"
canonical: "https://safekit.eviden.com/de/use-cases/high-availability-public-transport-centralized-control-room/"
description: "SafeKit gewährleistet eine hohe Verfügbarkeit für die Leitstellen des öffentlichen Nahverkehrs. Die RATP hat SafeKit für die Linie 1 der Pariser Metro eingesetzt. Diese Linie ist vollständig automatisiert und fahrerlos. SafeKit bietet Lastausgleich, automatische Failover-Funktion und Echtzeit-Datenreplikation. Es wird kein SAN benötigt. Dieselbe Software funktioniert auf Windows- und Linux-Servern."
category: "use-cases"
lang: "de"
topics: "Leitstellen des öffentlichen Nahverkehrs, Warum ist die Leitstelle entscheidend?, SafeKit-Hochverfügbarkeit für den öffentlichen Nahverkehr, Implementierung in der Praxis bei der RATP, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.24 | Translation LLM | 47 expressions"
---

# Hohe Verfügbarkeit im öffentlichen Nahverkehr: Zentrale Leitstelle {#high-availability-for-public-transport-centralized-control-room}

## Leitstellen des öffentlichen Nahverkehrs {#public-transport-control-rooms}

Eine zentrale Leitstelle ist das Nervenzentrum moderner öffentlicher Verkehrssysteme. Die Leitstelle überwacht ganze U-Bahn-Linien, steuert den automatisierten Betrieb und gewährleistet die Sicherheit der Fahrgäste. Für U-Bahn-Systeme, automatisierte U-Bahn-Linien und Busnetze muss die Leitstelle rund um die Uhr ohne Unterbrechung betrieben werden.

Die RATP betreibt die Pariser U-Bahn. Sie befördert täglich mehr als 10 Millionen Fahrgäste. Die Linie 1 der Pariser Metro ist vollautomatisch und fahrerlos. Dies macht die Rolle der Leitstelle noch wichtiger.

## Warum ist die Leitstelle entscheidend? {#why-is-a-centralized-control-room-critical}

Die Betreiber einer U-Bahn-Linie müssen auf den geringsten Vorfall sofort reagieren. Ein IT-Ausfall darf die Betreiber niemals daran hindern, die Aktivität der Linie zu sehen.

Die Hauptaufgaben der Mitarbeitenden der Leitstelle sind:

  * Überwachung der Zugbewegungen auf den Gleisen
  * Bearbeitung von Vorfällen, die automatisch von Videokameras erkannt werden
  * Verwaltung von Kommunikationssystemen und öffentlichen Durchsagen
  * Überwachung der Sicherheitsabläufe und der Fahrgastinformation

Ein Systemausfall in der Leitstelle wirkt sich direkt auf die Sicherheit der Fahrgäste und die Kontinuität des Betriebs aus. Alle kritischen Anwendungen in der Leitstelle müssen durch Hochverfügbarkeit geschützt werden. Beispiele hierfür sind Gateways, Datenbanken und Web-Frontends.

## SafeKit-Hochverfügbarkeit für den öffentlichen Nahverkehr {#safekit-high-availability-for-public-transport}

Die RATP sah sich bei dem Automatisierungsprojekt der Linie 1 großen Einschränkungen gegenüber:

  * Ein straffer Einsatzplan
  * Die meisten Anwendungen wurden ursprünglich nicht für Hochverfügbarkeit entwickelt
  * Es wurde eine Lösung für Windows- und Linux-Server benötigt
  * Es gab kein Budget für teure Hardware, wie z. B. SAN-Speicher oder Appliances für den Netzwerklastenausgleich

SafeKit wurde aus folgenden Gründen ausgewählt:

  * Es handelt sich um eine reine Softwarelösung ohne gemeinsam genutzte Datenträger und ohne SAN
  * Es bietet dieselbe Clustering-Lösung für Windows und Linux
  * Es erfüllt drei wichtige Funktionen: Lastausgleich, automatisches Failover und Echtzeit-Datenreplikation
  * Es ist einfach auf Standardservern zu implementieren, leicht zu verwalten und vielseitig

## Implementierung in der Praxis bei der RATP {#real-world-implementation-at-ratp}

RATP hat SafeKit mit zwei Arten von Clustern eingesetzt:

  * **Farm-Cluster**: ein Aktiv/Aktiv-Cluster mit Netzwerklastverteilung und automatischer Failover-Funktion
  * **Mirror-Cluster**: Ein aktiv/passiver Cluster mit Echtzeit-Datenreplikation und automatischem Failover

### Bereitstellungsansatz {#deployment-approach}

Zuerst definierte die RATP die funktionalen Anforderungen. Dann wurde SafeKit für jede geschützte Anwendung konfiguriert. Die Anwendungen selbst wurden nicht verändert. SafeKit erfordert keine physischen Änderungen an den Servern.

Ein SafeKit-Anwendungscluster verfügt über:

  * Zwei Server mit demselben Betriebssystem
  * Die Anwendung ist auf beiden Servern installiert
  * SafeKit auf beiden Servern installiert
  * Ein oder mehrere Anwendungskonzepte, die für Hochverfügbarkeit und Lastausgleich konfiguriert sind

Mehrere Anwendungsmodule können parallel auf demselben Cluster ausgeführt werden. Dies optimiert die Nutzung der Serverressourcen. RATP hat die SafeKit-Module in drei Infrastrukturphasen validiert: Test, Vorserienproduktion und Produktion.

### Tagesgeschäft {#daily-operations}

IT-Betreiber verwalten jetzt alle Anwendungscluster mit:

  * Die gleiche Hochverfügbarkeitslösung unter Windows und Linux
  * Die gleiche Administrationskonsole für alle Cluster
  * Die gleiche Konfiguration und die gleichen Befehle
  * Einheitliche Überwachung für Lastausgleich, Hochverfügbarkeit und Datenreplikation

Die Backup-Server kritischer Anwendungen befinden sich in einem separaten Maschinenraum. Sie werden mit separaten Stromversorgungen betrieben. Im Falle eines Vorfalls wird der Betrieb ohne Dienstunterbrechung für die Fahrgäste der Pariser U-Bahn fortgesetzt.

### Wesentliche Vorteile {#key-benefits}

  * **Kostenreduzierung**: keine teure SAN-Infrastruktur mit gemeinsam genutzten Festplatten und keine Appliances für den Lastausgleich im Netzwerk
  * **Vereinfachte Verwaltung**: Eine Konsole verwaltet sowohl Windows- als auch Linux-Cluster
  * **Hohe Verfügbarkeit**: Lastausgleich, automatisches Failover und Echtzeit-Datenreplikation
  * **Minimale Auswirkungen auf das Projekt**: Bestehende Anwendungen erfordern keine Änderungen
  * **Betriebliche Widerstandsfähigkeit**: Automatische Wiederherstellung gewährleistet einen kontinuierlichen Passagierservice

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
