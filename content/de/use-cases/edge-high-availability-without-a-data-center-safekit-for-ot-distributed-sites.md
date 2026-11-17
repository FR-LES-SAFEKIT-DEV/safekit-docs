---
title: "Hochverfügbarkeit am Edge ohne Rechenzentrum: SafeKit für OT und verteilte Standorte"
canonical: "https://safekit.eviden.com/de/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Edge-Computing-Standorte verfügen über kein Rechenzentrum, benötigen aber dennoch eine hohe Verfügbarkeit. SafeKit verwandelt zwei Standardserver in einen Plug-and-Play-Hochverfügbarkeitscluster. Es sind weder SAN noch IT-Personal erforderlich, und das Failover erfolgt automatisch."
category: "use-cases"
lang: "de"
topics: "Die Herausforderung der Hochverfügbarkeit am Edge, Warum SafeKit die natürliche Wahl für Edge Computing ist, Eignung für Edge- und verteilte Bereitstellungen, Warum OT-Umgebungen am Netzwerkrand anders sind, Ideale Anwendungsfälle am Edge, Edge vs. Rechenzentrum: Hochverfügbarkeit – die wichtigsten Unterschiede, Unterstützte Betriebssysteme und Plattformen, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-17.1 | glossaire 2026-11-17.4 | Translation LLM | 47 expressions"
---

# Hochverfügbarkeit am Edge ohne Rechenzentrum: SafeKit für OT und verteilte Standorte {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## Die Herausforderung der Hochverfügbarkeit am Edge {#the-edge-ha-challenge}

Edge-Computing-Standorte verfügen oft weder über ein Rechenzentrum noch über Fachwissen im Bereich Hochverfügbarkeit. Dennoch ist die Geschäftskontinuität für sie von entscheidender Bedeutung. Eine Fabrikhalle, eine Offshore-Ölplattform, eine Krankenhausstation, ein Einzelhandelsgeschäft oder ein 5G-Antennenstandort können sich keine Ausfallzeiten leisten. Diese Standorte können jedoch die Kosten und die Komplexität eines traditionellen Rechenzentrum-Clusters nicht rechtfertigen.

Traditionelle Hochverfügbarkeitslösungen wie Microsoft Failover Cluster (WSFC), Pacemaker mit Corosync oder VMware HA wurden für Rechenzentren entwickelt. Sie erfordern gemeinsam genutzten Speicher (SAN oder NAS), dedizierte Cluster-Hardware, fest angestellte IT-Mitarbeiter und komplexes Betriebssystem-Know-how. Nichts davon ist am Edge vorhanden.

SafeKit wurde genau für diese Lücke entwickelt. Es sorgt dafür, dass Edge-Anwendungen in Fabriken, auf Ölplattformen, Schiffen, in der Gebäudesicherheit, der Flugsicherung, 5G-Netzen, im Gesundheitswesen, im Einzelhandel und in vielen weiteren Bereichen weiterlaufen. Es werden lediglich zwei Standardserver benötigt, die über ein LAN verbunden sind.


![SafeKit für Edge Computing](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Warum SafeKit die natürliche Wahl für Edge Computing ist {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit verwandelt zwei Standard-Edge-Server in einen Plug-and-Play-Hochverfügbarkeitscluster. Die Server können von jeder Marke sein, physisch oder virtuell. Es gibt keinen gemeinsamen Speicher, kein SAN und keine spezielle Hardware. Ein leichtgewichtiges Softwarepaket bietet die folgenden Funktionen:

  * **Synchrone Dateireplikation in Echtzeit.** Daten werden zum Zeitpunkt des Schreibvorgangs auf Byte-Ebene auf den Standby-Server gespiegelt.
  * **Automatische Failover-Funktion.** Fällt der primäre Server aus, übernimmt der Standby-Server innerhalb von Sekunden, ohne menschliches Eingreifen.
  * **Optionales Netzwerk-Lastausgleichsverfahren.** Bei Active-Active-Bereitstellungen teilen sich beide Server die Arbeitslast.
  * **Webkonsole.** Die Verwaltung ist browserbasiert und über HTTPS fernzugänglich. Es sind keine Vorkenntnisse vor Ort erforderlich.
  * **Stille, skriptgesteuerte Installation.** Geeignet für die Massenbereitstellung an Hunderten von verteilten Standorten und für die Einbettung in OEM-Produkte.


Sie müssen kein SAN kaufen. Sie benötigen auch keine Windows Server Datacenter-Lizenz. Sie benötigen keine Linux-Cluster-Expertise oder dedizierte Cluster-Hardware. Der gesamte Hochverfügbarkeits-Stack ist ein einziges Softwarepaket.

## Eignung für Edge- und verteilte Bereitstellungen {#edge--distributed-deployment-suitability}

SafeKit wurde speziell für Edge Computing, Zweigstellen und verteilte Unternehmen entwickelt:

Anforderung an Edge Computing | SafeKit-Lösung  
---|---  
Kein dediziertes IT-Personal vor Ort | Automatischer Failover ohne manuelles Eingreifen  
Keine SAN- oder NAS-Infrastruktur | Architektur nur mit lokalen Datenträgern und ohne SAN  
Fernverwaltung | Webkonsole über HTTPS von jedem Browser aus zugänglich  
Geringer Hardware-Bedarf | Zwei Standardserver oder VMs ohne spezielle Hardware  
Funktioniert hinter Firewalls und NAT | Konfigurierbare Ports und HTTPS-basierte Konsole  
Standortübergreifende Notfallwiederherstellung | Echtzeit-Replikation mit dem Mirror-Modul zwischen zwei geografischen Standorten über ein Stretched VLAN  
Isolierte oder Offline-Netzwerke | Keine Internetabhängigkeit und vollständig autark  
OEM oder Embedded-Bereitstellung | Stille und skriptgesteuerte Installation, die Softwareanbieter einbetten können  
Hunderte von verteilten Clustern | Konzipiert für verteilte Unternehmen mit vielen Niederlassungen  
  
## Warum OT-Umgebungen am Netzwerkrand anders sind {#why-edge-ot-environments-are-different}

Umgebungen für Betriebstechnologie (OT) umfassen SCADA, Gebäudemanagementsysteme (BMS), physische Sicherheit und industrielle Steuerung. Ihre Anforderungen unterscheiden sich grundlegend von IT-Rechenzentren:

  * **Kein IT-Personal vor Ort.** Eine Umspannstation, eine entfernte Pumpstation oder ein Schiff hat keinen Systemadministrator. Hochverfügbarkeit muss selbstverwaltend sein.
  * **Isolierte oder eingeschränkte Netzwerke.** Viele OT-Standorte haben keinen Internetzugang und eine begrenzte WAN-Bandbreite. Hochverfügbarkeitssoftware muss vollständig offline funktionieren.
  * **24/7-Betriebszeit und Nulltoleranz für Komplexität.** Das Anhalten einer Produktionslinie, der Verlust der Videoüberwachung oder die Unterbrechung der Zugangskontrolle kostet weitaus mehr als die Hochverfügbarkeitssoftware selbst.
  * **Lange Lebenszyklen der Geräte.** OT-Server können 10 bis 15 Jahre lang betrieben werden. Die Hochverfügbarkeitslösung muss stabil und wartungsarm sein und darf keine ständigen Updates erfordern.
  * **Nur Standard-x86-Hardware.** Ein abgelegener Industriestandort verfügt über kein Budget und keine Begründung für ein SAN oder dedizierte Clusterknoten.
  * **Keine Toleranz für die Komplexität des Betriebssystems.** Herkömmliche Cluster-Software erfordert Cluster-Expertise. OT-Betreiber verfügen nicht über diese Expertise und sollten sie auch nicht benötigen.


Das SafeKit-Modell berücksichtigt direkt jede dieser Einschränkungen: kein SAN, zwei Server und automatisches Failover.

## Ideale Anwendungsfälle am Edge {#ideal-edge-use-cases}

SafeKit eignet sich für jeden Standort ohne Rechenzentrum, an dem Hochverfügbarkeit dennoch eine Rolle spielt:

Industrie | Typischer Edge-Standort | Kritische Anwendung  
---|---|---  
Physische Sicherheit und Überwachung | Gebäude, Campusse, Flughäfen | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebäudemanagement (BMS) | Bürogebäude, Krankenhäuser, Fabriken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische Zutrittskontrolle (EACS) | Sichere Einrichtungen, Campusse | Siemens SiPass, Nedap, Bosch AMS, Hirsch MicroSesame  
SCADA und industrielle Steuerung | Fabriken, Umspannwerke, Wasserwerke | Jede SCADA-, DCS- oder HMI-Software unter Windows oder Linux  
Flugverkehrskontrolle (ATC) | Flughäfen, Kontrolltürme | Flugverkehrsmanagement und Radarsysteme  
Betriebsleitzentralen (OCC) | U-Bahn, Eisenbahn, Verkehrsknotenpunkte | Eisenbahnsignaltechnik und Bahnhofsmanagement  
Maritim | Schiffe, Kriegsschiffe | Navigations-, Fracht- und Bordmanagementsysteme  
Öl und Gas | Offshore-Plattformen, abgelegene Bohranlagen | Prozessleittechnik und Sicherheitssysteme  
Telekommunikation | 5G-Antennenstandorte, MEC-Knoten | Multi-Access-Edge-Computing-Server (MEC-Server)  
Gesundheitswesen | Kliniken, ferngesteuerte Diagnosezentren | Medizinische Bildgebung, Patientendaten, Ferndiagnostik  
Einzelhandel | Geschäfte, Filialen, Lager | Kassensystem und Bestandsverwaltung  
Militär und Verteidigung | Vorgeschobene Einsatzstützpunkte, Feldeinheiten | Missionskritische Kommando- und Kommunikationssysteme  
  
## Edge vs. Rechenzentrum: Hochverfügbarkeit – die wichtigsten Unterschiede {#edge-vs-data-center-ha-key-differences}

Kriterium | Hochverfügbarkeit von Rechenzentren (WSFC, Pacemaker, VMware HA) | SafeKit Hochverfügbarkeit am Edge  
---|---|---  
Speicher | Erfordert gemeinsam genutzten Speicher (SAN oder NAS) | SANless, nur mit lokalen Datenträgern  
Hardware | Dedizierte Clusterknoten, Hostbusadapter (HBAs) und Switches | Zwei Standard-x86-Server beliebiger Marke  
Betriebssystem-Expertise | Kenntnisse Windows Server Datacenter oder Linux-Clustern | Standardkenntnisse in Windows- oder Linux-Administration  
Mitarbeiter vor Ort | Für Einrichtung und Eingriff erforderlich | Nicht erforderlich, da das Failover vollautomatisch erfolgt  
Internet- oder Cloud-Abhängigkeit | Oft cloudverwaltet | Funktioniert in vollständig isolierten Netzwerken  
Bereitstellungsumfang | Einzelnes Rechenzentrum | Hunderte von verteilten Standorten  
Lizenzkosten | Hoch (Rechenzentrums-Betriebssystem und SAN-Lizenzen) | Eine kostengünstige Softwarelizenz pro Cluster  
  
{{%  insert-supported-os-de  %}}

Die vollständigen technischen Spezifikationen, Größenbeschränkungen und Beschaffungskriterien finden Sie in der [technischen Referenz für RFI und RFP](</de/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) 📘.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}