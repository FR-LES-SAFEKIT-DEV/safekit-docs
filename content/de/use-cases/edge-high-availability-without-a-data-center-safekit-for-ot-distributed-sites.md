---
title: "Edge-Hochverfügbarkeit ohne Rechenzentrum: SafeKit für OT und verteilte Standorte"
canonical: "https://safekit.eviden.com/de/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Edge-Standorte verfügen über kein Rechenzentrum – benötigen aber dennoch Hochverfügbarkeit. SafeKit verwandelt zwei Standardserver in einen sofort einsatzbereiten HA-Cluster: kein SAN, kein IT-Personal, automatisches Failover."
category: "use-cases"
lang: "de"
topics: "Die Edge-HA-Herausforderung, Warum SafeKit die ideale Lösung für Edge-Umgebungen ist, Eignung für Edge- und verteilte Bereitstellungen, Warum sich Edge-OT-Umgebungen unterscheiden, Ideale Edge-Anwendungsfälle, Edge- vs. Rechenzentrum-HA: Wichtigste Unterschiede, Technische Mindestanforderungen, 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Edge-Hochverfügbarkeit ohne Rechenzentrum: SafeKit für OT & verteilte Standorte {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## The Edge HA Challenge {#the-edge-ha-challenge}

Edge-Standorte verfügen oft weder über ein Rechenzentrum noch über Expertise im Bereich Hochverfügbarkeit – dennoch ist Geschäftskontinuität entscheidend. Eine Produktionshalle, eine Offshore-Ölplattform, eine Klinik, ein Einzelhandelsgeschäft oder ein 5G-Antennenstandort können sich Ausfallzeiten nicht leisten, rechtfertigen aber nicht die Kosten und Komplexität eines herkömmlichen Hochverfügbarkeitsclusters in einem Rechenzentrum.

Herkömmliche HA-Lösungen – wie Microsoft Failover Cluster (WSFC), Pacemaker/Corosync und VMware HA – wurden für Rechenzentren entwickelt: Sie setzen gemeinsam genutzten Speicher (SAN/NAS), dedizierte Cluster-Hardware, festangestelltes IT-Personal und umfassendes Betriebssystem-Know-how voraus. Nichts davon ist am Netzwerkrand vorhanden.

SafeKit wurde genau für diese Lücke entwickelt. Es hält Edge-Anwendungen in Fabriken, Ölplattformen, Schiffen, Gebäudesicherheitssystemen, Flugsicherungsanlagen, 5G-Netzen, im Gesundheitswesen, im Einzelhandel und vielem mehr am Laufen – mit nichts weiter als zwei Standardservern und einem LAN.


![ SafeKit für Edge ](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Warum passt SafeKit perfekt zu Edge {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit verwandelt zwei Standard-Edge-Server (beliebige Marke, physisch oder virtuell) in einen sofort einsatzbereiten HA-Cluster – ohne gemeinsam genutzten Speicher, ohne SAN, ohne spezielle Hardware. Ein schlanker Software-Stack ermöglicht Folgendes:

  * ** Echtzeit-synchrone Dateireplikation ** – Daten werden beim Schreiben byte-basiert auf den Standby-Server gespiegelt
  * Automatisches Failover ** ** – wenn der primäre Server ausfällt, übernimmt der Standby-Server innerhalb von Sekunden ohne menschliches Eingreifen.
  * ** Optionaler Netzwerk-Lastausgleich ** — für Aktiv-Aktiv-Bereitstellungen, bei denen sich beide Server die Arbeitslast teilen
  * ** Webkonsole ** – browserbasierte Verwaltung, Fernzugriff über HTTPS, keine Vor-Ort-Kenntnisse erforderlich
  * ** Stille, skriptfähige Installation ** – geeignet für OEM-Einbettung und Massenbereitstellung an Hunderten von verteilten Standorten


Es muss kein SAN beschafft werden, es wird keine Server-Datacenter-Lizenz Windows benötigt, keine Expertise im Cluster-Betriebssystem Linux ist erforderlich und es wird keine dedizierte Cluster-Hardware benötigt. Der gesamte HA-Stack besteht aus einem einzigen Softwarepaket.

## Eignung für Edge- und verteilte Bereitstellung {#edge--distributed-deployment-suitability}

SafeKit wurde speziell für Edge-, Zweigstellen- und verteilte Unternehmensszenarien entwickelt:

Randanforderung | SafeKit Antwort  
---|---  
Kein dediziertes IT-Personal vor Ort erforderlich | Automatisches Failover, kein manueller Eingriff notwendig.  
Keine SAN/NAS-Infrastruktur | SANlose Architektur, nur lokale Festplatten  
Fernverwaltung | Webkonsole, die über HTTPS von jedem Browser aus zugänglich ist  
Geringer Hardwarebedarf | 2 Standardserver oder VMs, keine spezielle Hardware  
Funktioniert hinter Firewalls/NAT | Konfigurierbare Ports, HTTPS-basierte Konsole  
Multi-Site Disaster Recovery | Mirror zwischen zwei geografischen Standorten über ein gestrecktes VLAN  
Air-Gap-/Offline-Netzwerke | Keine Internetabhängigkeit; vollständig autark  
OEM-/Embedded-Bereitstellung | Stille Installation, skriptfähig, von Softwareherstellern einbettbar  
Hunderte verteilte Cluster | Entwickelt für verteilte Unternehmen mit vielen Niederlassungen  
  
## Warum Edge-OT-Umgebungen anders sind {#why-edge-ot-environments-are-different}

OT-Umgebungen (Operational Technology) – SCADA, BMS, physische Sicherheit, industrielle Steuerung – haben Anforderungen, die sich grundlegend von denen von IT-Rechenzentren unterscheiden:

  * ** Kein IT-Personal vor Ort. ** Ein Umspannwerk, eine abgelegene Pumpstation oder ein Schiff hat keinen Systemadministrator. HA muss selbstverwaltend sein.
  * ** Abgeschottete oder eingeschränkte Netzwerke. ** Viele OT-Standorte haben keinen Internetzugang und nur begrenzte WAN-Bandbreite. HA-Software muss vollständig offline funktionieren.
  * ** 24/7-Verfügbarkeit, null Toleranz für Komplexität. ** Der Stillstand einer Produktionslinie, der Ausfall der Videoüberwachung oder die Unterbrechung der Zutrittskontrolle verursachen weitaus höhere Kosten als die HA-Software selbst.
  * Lange Lebensdauer der Geräte. ** OT-Server können 10–15 Jahre lang betrieben werden. Die HA-Lösung muss stabil und wartungsarm sein und ** keine ständigen Updates erfordern.
  * ** Nur Standard-x86-Hardware. ** Kein Budget oder keine Rechtfertigung für SAN oder dedizierte Clusterknoten an einem entfernten Industriestandort.
  * ** Intoleranz gegenüber Komplexität auf Betriebssystemebene. ** Pacemaker, Corosync oder WSFC erfordern Cluster-Expertise, über die OT-Betreiber schlichtweg nicht verfügen und die sie auch nicht benötigen sollten.


Das SAN-lose Zwei-Server-Modell mit automatischem Failover von SafeKit geht direkt auf jede dieser Einschränkungen ein.

## Ideale Anwendungsfälle für Edge {#ideal-edge-use-cases}

Jeder Standort ohne Rechenzentrum – wo hohe Verfügbarkeit dennoch wichtig ist:

Vertikal | Typischer Randstandort | Kritische Anwendung  
---|---|---  
Physische Sicherheit & Überwachung | Gebäude, Campusgelände, Flughäfen | VMS — Milestone , Genetec, Hanwha, Siemens Überwachung  
Gebäudeleittechnik (GLT) | Bürogebäude, Krankenhäuser, Fabriken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische Zutrittskontrolle (EACS) | Sichere Einrichtungen, Campusgelände | Siemens SiPass, Nedap , Bosch AMS  
SCADA & Industriesteuerung | Fabriken, Umspannwerke, Wasserwerke | Beliebige SCADA-, DCS- oder HMI-Software auf Windows oder Linux  
Flugsicherung (ATC) | Flughäfen, Kontrolltürme | ATC-Management- und Radarsysteme  
Betriebsleitzentralen (OCC) | U-Bahn, Eisenbahn, Verkehrsknotenpunkte | Eisenbahnsignalanlagen und Bahnhofsmanagement  
Maritime | Schiffe, Marinefahrzeuge | Navigations-, Ladungs- und Bordmanagementsysteme  
Öl & Gas | Offshore-Plattformen, ferngesteuerte Bohrinseln | Prozessleit- und Sicherheitssysteme  
Telekommunikation | 5G-Antennenstandorte, MEC-Knoten | Multi-Access Edge Computing (MEC)-Server  
Gesundheitswesen | Kliniken, Ferndiagnosezentren | Medizinische Bildgebung, Patientendaten, Ferndiagnostik  
Einzelhandel | Filialen, Niederlassungen, Lager | Kassensysteme und Bestandsverwaltung  
Verteidigung | Vorwärtsstützpunkte, Feldverbände | Missionskritische Führungs- und Kommunikationssysteme  
  
## Edge- vs. Rechenzentrums-HA: Wichtigste Unterschiede {#edge-vs-data-center-ha-key-differences}

Criterion | Data Center HA (WSFC, Pacemaker, VMware HA) | SafeKit Edge HA  
---|---|---  
Speicher | Erfordert gemeinsam genutzten SAN/NAS-Speicher | SAN-los – nur lokale Festplatten  
Hardware | Dedizierte Clusterknoten, HBAs, Switches | Beliebige zwei Standard-x86-Server  
Betriebssystemkenntnisse | Windows Rechenzentrums- oder Linux Cluster-Betriebssystemkenntnisse | Standard Windows / Linux Administratorkenntnisse  
Vor-Ort-Personal | Für Einrichtung und Eingriff erforderlich | Nicht erforderlich – vollautomatisch  
Internet-/Cloud-Abhängigkeit | Oft cloudverwaltet | Vollständig lufttrennbar  
Bereitstellungsumfang | Einzelnes Rechenzentrum | Hunderte verteilte Standorte  
Lizenzkosten | Hoch (Datacenter OS, SAN-Lizenzen) | Einzelne, kostengünstige Softwarelizenz pro Cluster  
Typische RTO | 1–5 Minuten | Unter 1 Minute (konfigurierbar)  
  
## Technische Mindestanforderungen {#technical-minimum-requirements}

  * ** Server: ** 2 Standard-x86-Server oder VMs (beliebige Hardwaremarke, physisch oder virtuell) oder ARM (nur Linux )
  * ** OS: ** Windows Server 2019 / 2022 / 2025, Windows 11, RHEL 8/9, Ubuntu 24.04
  * ** -Netzwerk: ** 1-Gbit/s-LAN für Replikation; dediziertes Heartbeat-Netzwerk empfohlen
  * ** Speicher: ** Nur lokale Festplatten – kein SAN, kein NAS, kein gemeinsam genutzter Speicher jeglicher Art
  * ** Keine spezielle Betriebssystemversion erforderlich. ** – Windows Server Standard ist ausreichend; keine Datacenter-Lizenz erforderlich.


Die vollständigen technischen Spezifikationen, Größenbeschränkungen und Beschaffungskriterien finden Sie in der 📘 [ RFP/RFI Technical Reference ](</de/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) .


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}