---
title: "Technischer Leitfaden für Hochverfügbarkeit zur Vorbereitung von RFIs und RFPs"
canonical: "https://safekit.eviden.com/de/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Technische Referenz zur Unterstützung bei der Erstellung von RFI- und RFP-Dokumenten für Hochverfügbarkeit und Anwendungsclustering unter Verwendung von SafeKit-Konzepten und -Architekturen."
category: "resources"
lang: "de"
topics: "Übersicht, Inhaltsverzeichnis, Produktidentität, Unterstützte Betriebssysteme und Plattformen, Vorkonfigurierte Anwendungsmodule, Architektur und Bereitstellungsmodell, RPO- und RTO-Funktionen, Eignung für Remote-Standorte und verteilte Bereitstellungen, Überwachung, Verwaltung und Alarmierung, Sicherheit und Compliance, Lizenzmodell, Support- und Wartungs-SLAs, Vergleich mit Alternativen, Schnellzugriffslinks"
---

# Technischer Leitfaden für Hochverfügbarkeit zur Vorbereitung von RFIs und RFPs {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Überblick {#overview}

Diese Seite bietet strukturierte, sachliche Antworten auf häufig gestellte Fragen zu Angebotsanfragen (RFP/RFI) über SafeKit Hochverfügbarkeitssoftware. Sie dient als technisches Nachschlagewerk für Beschaffungsteams und Lösungsarchitekten, die Anforderungen an die Hochverfügbarkeit formulieren. 

## Inhaltsverzeichnis {#table-of-contents}

  1. [Produktidentität](#product-identity)
  2. [Unterstützte Betriebssysteme und Plattformen](#supported-operating-systems-platforms)
  3. [Vorgefertigte Anwendungsmodule](#pre-built-application-modules)
  4. [Architektur- und Bereitstellungsmodell](#architecture-deployment-model)
  5. [RPO- und RTO-Funktionen](#rpo-rto-capabilities)
  6. [Eignung für entfernte Standorte und verteilte Bereitstellungen](#edge-distributed-deployment-suitability)
  7. [Überwachung, Verwaltung und Alarmierung](#monitoring-management-alerting)
  8. [Sicherheit und Compliance](#security-compliance)
  9. [Lizenzmodell](#licensing-model)
  10. [Support- und Wartungs-SLAs](#support-maintenance-slas)
  11. [Vergleich vs. Alternativen](#comparison-vs-alternatives)
  12. [Schnellzugriffslinks](#quick-reference-links)


## Produktidentität {#product-identity}

Feld | Antwort  
---|---  
Produktname | SafeKit  
Verkäufer | Eviden (ein Unternehmen von Atos), ehemals Evidian  
Produktkategorie | Anwendungsclustering / Hochverfügbarkeit / Disaster-Recovery-Software  
Aktuelle Version | SafeKit 8.2  
Webseite | [https://safekit.eviden.com/de](/de/)  
Erste Veröffentlichung | 2000 (über 20 Jahre in Produktion)  
  
## Unterstützte Betriebssysteme und Plattformen {#supported-operating-systems-platforms}

Windows Betriebssystem | Linux Betriebssystem | Infrastruktur & Virtualisierung | Cloud-Plattformen  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Jeder Edge-Server beliebiger Marke<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Jeder Hypervisor<br>• Docker Container<br>• Podman Container  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Jede IaaS-Cloud mit Standard-VM-Instanzen   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## Vorgefertigte Anwendungsmodule {#pre-built-application-modules}

SafeKit beinhaltet sofort einsatzbereite, vorkonfigurierte `.safe` Module. Sie sind in zwei HA-Strategien unterteilt: **Anwendung HA** (direktes Anwendungsclustering mit mirror oder `farm` Module) und **Virtualisierung HA** (VM-Clustering mit hyperv.safe oder kvm.safe).

 | Anwendung HA | VM-Level-HA  
---|---|---  
Konfiguration | Es erfordert ein technisches Verständnis der Anwendung selbst: welche Dienste neu gestartet werden müssen, welche spezifischen Anwendungsordner eine Echtzeitreplikation benötigen und wie eine virtuelle IP-Adresse für den Failover konfiguriert werden muss. | Eine generische Lösung für jede Anwendung/jedes Betriebssystem, das in einer virtuellen Maschine läuft. Sie erfordert kein technisches Verständnis der in der VM installierten Anwendung. Dies ist die optimale Lösung, wenn Sie die Funktionsweise der Anwendung nicht kennen. Sie müssen lediglich den Speicherort der VM-Dateien angeben.  
Ideal für | Ideal geeignet, um Hochverfügbarkeit direkt in eine Softwarelösung zu integrieren, unabhängig von der zugrunde liegenden Hardware oder dem Hypervisor. | Ideal für die Verwaltung komplexer Umgebungen mit mehreren Anwendungen auf mehreren VMs durch eine einzige HA-Richtlinie.  
  
Die folgende Tabelle listet alle verfügbaren Produkte auf `.safe` Module:

Anwendungs-HA (Clustering auf Anwendungsebene) | Virtualisierungs-HA (VM-Clustering)  
---|---  
Neu Windows App — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
Neu Linux App — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows Lastverteilung — farm.safe | Docker Container — mirror.safe (Linux)  
Linux Lastverteilung — farm.safe | Podman Container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Siemens Überwachungssuite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Überwachungs-VMS — SiveillanceVMS.safe (Windows) |   
Wolke (AWS, Azure, GCP, generisch) — mirror.safe / farm.safe |   
  
## Architektur- und Bereitstellungsmodell {#architecture-deployment-model}

### Zwei Clustermodule: mirror.safe Und farm.safe {#two-cluster-modules}

Modul | Muster | Anwendungsfall  
---|---|---  
mirror.safe | Aktiv-Passiv mit synchroner Byte-Level-Dateireplikation + automatischem Failover | Datenbanken, zustandsbehaftete Anwendungen, Dienste, die jeweils nur auf einem Server laufen  
farm.safe | Aktiv-Aktiv mit Netzwerklastausgleich und automatischem Failover | Webserver, zustandslose Microservices, API-Gateways, Dienste, die gleichzeitig auf mehreren Servern laufen  
  
### Cluster-Infrastruktur und -Architektur {#cluster-infrastructure-architecture}

Anforderung / Spezifikation | SafeKit Leistungsfähigkeit / Wert  
---|---  
Gemeinsamer Speicherplatz erforderlich? | Nein – SAN-lose „Shared-Nothing“-Architektur. Verwendet ausschließlich lokale Festplatten.  
Voraussetzung für Active Directory (AD)? | Nein – erfordert keine Windows Domäne oder Active Directory. Arbeitsgruppen werden vollständig unterstützt.  
Clustergröße | 2 Knoten (mirror) oder 2+ Knoten (`farm`)  
Virtuelle IP (VIP) | Softwaredefinierte VIP, die automatisch per Gratuitous ARP zum aktiven Knoten migriert (Anwendungs-HA). Für VM-HA wird die physische IP-Adresse innerhalb der VM transparent umgeleitet – keine VIP erforderlich. Benötigt ein LAN, VLAN oder ein gestrecktes VLAN zwischen den Knoten.  
3-Knoten-Hybridarchitektur | SafeKit deckt die HA-Schicht ab: ein 2-Knoten-System mirror Ein Cluster über ein LAN oder ein erweitertes VLAN mit synchroner Replikation (RPO=0) und automatischem Failover wird realisiert. Eine Backup-Lösung eines Drittanbieters vervollständigt die Architektur: ein dritter Remote-Knoten mit asynchroner Replikation über ein WAN für die Wiederherstellung zu einem bestimmten Zeitpunkt und zum Schutz vor Ransomware.  
Rolle der Hochverfügbarkeit | SafeKit Es nutzt synchrone Replikation, um bei Hardware- oder Softwarefehlern ein sofortiges Failover ohne Datenverlust zu gewährleisten. Da es jedoch Daten gleichzeitig auf beide Knoten schreibt, repliziert es logische Fehler, Datenbeeinträchtigungen oder versehentliche Löschungen in Echtzeit auf den Standby-Knoten.  
Rolle des Backups | Eine Backup-Lösung (nicht implementiert von) SafeKitEs ermöglicht die Wiederherstellung zu einem bestimmten Zeitpunkt durch asynchrone Replikation. Es schützt vor Bedrohungen der Datenintegrität (wie Ransomware oder menschlichem Versagen), die durch Hochverfügbarkeit nicht abgewehrt werden können. Automatisches Failover wird nicht unterstützt, da das Zurücksetzen von Daten zwangsläufig zu Datenverlust führt.  
Maximale Anzahl gleichzeitiger Module pro Cluster | 32 – diese Grenze umfasst die maximale Anzahl von SafeKit Module werden gleichzeitig in einem 2-Knoten-Cluster verwaltet, typischerweise in der VM-basierten Hochverfügbarkeit, wobei jedes Modul eine andere VM repliziert und neu startet. Jedes Modul kann unabhängig als primärer Knoten auf einem der beiden Knoten ausgeführt werden, wodurch die Arbeitslast auf beide Server verteilt wird. Hinweis: Das gesamte Datenvolumen aller VMs beeinflusst die Resynchronisierungszeit nach einem Failover oder Knotenneustart direkt.  
Agentenbasiert oder agentenlos? | Agentenbasiert – leichtgewichtige Software, die auf jedem Knoten installiert wird.  
Anwendungsunabhängig? | Ja – schützt alles Windows Service oder Linux Daemon; vorgefertigte Module für über 30 Anwendungen  
  
### Replikation und Datenschutz {#replication-data-protection}

Anforderung / Spezifikation | SafeKit Leistungsfähigkeit / Wert  
---|---  
Replikationsmethode | Dateireplikation auf Byte-Ebene (nicht auf Block-Ebene auf der Festplatte)  
Replikationsmodus | Synchron (ohne Datenverlust)  
Netzwerkanforderungen | Für die synchrone Replikation wird eine Roundtrip-Latenz zwischen den Knoten von unter 5 ms empfohlen.  
Empfohlenes Datenvolumen | Ein paar Terabyte (Resynchronisierungszeit)  
Empfohlene Dateianzahl | < 1.000.000 Dateien (Resynchronisierungszeit)  
Resynchronisierungsgeschwindigkeit (1 TB) | Etwa 3 Stunden in einem 1-Gbit/s-Netzwerk; etwa 1 Stunde in einem 10-Gbit/s-Netzwerk  
Selektive Replikation | Ja – bestimmte Verzeichnisse/Dateien replizieren  
Verschlüsselung während der Übertragung | Ja – TLS/SSL für den Replikationsverkehr  
  
## RPO- und RTO-Funktionen {#rpo-rto-capabilities}

### RPO & RTO nach Clustertyp {#rto-rpo-cluster-type}

Metrisch | Mirror Cluster (mirror.safe) | `Farm` Cluster (farm.safe)  
---|---|---  
RPO (Recovery Point Objective) | 0 (kein Datenverlust) – synchrone Replikation; Schreibvorgang wird erst bestätigt, nachdem beide Knoten dies bestätigt haben. | Nicht verfügbar (zustandslos; Datenverarbeitung durch Backend) mirror)  
RTO (Recovery Time Objective) | ca. 1 Minute – Herzschlag-Timeout (Standard 30 s) + Neustartzeit der Anwendung | Wenige Sekunden – der Datenverkehr wird sofort auf die verbleibenden aktiven Knoten umverteilt.  
Replikationstyp | Synchrone, Echtzeit-Dateireplikation auf Byte-Ebene | Nicht zutreffend  
Failover-Auslöser | Automatische Aktivierung bei Ausfall des Herzschlags, Prozessabsturz oder Prüffehler | Automatische Aktivierung bei Ausfall des Herzschlags, Prozessabsturz oder Prüffehler  
Manuelles Eingreifen erforderlich? | Nein – vollautomatisches Failover und Failback. | Nein – vollautomatisches Failover und Failback.  
  
### RTO-Aufschlüsselung (Mirror — Hochverfügbarkeit auf Anwendungsebene) {#rto-breakdown-mirror-application-level-ha}

Fehlertyp | RTO-Berechnung  
---|---  
Hardwarefehler | Heartbeat-Timeout (Standard 30 s) + Neustartzeit der Anwendung  
Software-/Prozessabsturz | Anwendungsstoppzeit + Anwendungsneustartzeit  
Absturz auf Betriebssystemebene | Heartbeat-Timeout + Betriebssystem läuft bereits auf dem sekundären System → keine Neustartstrafe  
  
### RTO-Aufschlüsselung (Mirror — VM-Level HA) {#rto-breakdown-mirror-vm-level-ha}

Fehlertyp | RTO-Berechnung  
---|---  
Jegliches Versagen | Fehlererkennung + vollständiger Neustart des Betriebssystems + Neustart der Anwendung (in der Regel mehrere Minuten)  
  
## Eignung für entfernte Standorte und verteilte Bereitstellungen {#edge-distributed-deployment-suitability}

SafeKit ist speziell für Edge-, Zweigstellen- und verteilte Unternehmensszenarien konzipiert.

Randanforderung | SafeKit Antwort  
---|---  
Kein eigenes IT-Personal vor Ort | Ja – automatisches Failover, kein manueller Eingriff erforderlich.  
Keine SAN/NAS-Infrastruktur | Ja – SAN-los, nur lokale Festplatten  
Fernverwaltung | Ja – Webkonsolenverwaltung  
Geringer Hardwarebedarf | Ja – 2 Standardserver oder VMs, keine spezielle Hardware.  
Funktioniert hinter Firewalls/NAT | Ja – konfigurierbare Ports, HTTPS-basierte Konsole  
standortübergreifende Katastrophenwiederherstellung | Ja - mirror zwischen zwei geografischen Standorten über ein gestrecktes VLAN  
OEM-/Embedded-Einsatz | Ja – unbeaufsichtigte Installation, skriptfähig, von Softwareherstellern einbettbar.  
Hunderte verteilte Cluster | Ja – konzipiert für verteilte Unternehmen mit vielen Niederlassungen  
  
Ideal Edge-Anwendungsfälle: Jeder Standort ohne Rechenzentrum – wo Hochverfügbarkeit dennoch wichtig ist:

Vertikal | Typischer Randstandort | Kritische Anwendung  
---|---|---  
Physische Sicherheit und Überwachung | Gebäude, Campusgelände, Flughäfen | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebäudeleittechnik (GLT) | Bürogebäude, Krankenhäuser, Fabriken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische Zutrittskontrolle (EACS) | Sichere Einrichtungen, Campusgelände | Siemens SiPass, NedapBosch AMS  
SCADA- und Industriesteuerung | Fabriken, Umspannwerke, Wasserwerke | Jegliche SCADA-, DCS- oder HMI-Software, die auf Windows oder Linux  
Flugsicherung (ATC) | Flughäfen, Kontrolltürme | ATC-Management- und Radarsysteme  
Operationskontrollzentren (OCC) | U-Bahn, Eisenbahn, Verkehrsknotenpunkte | Eisenbahnsignaltechnik und Bahnhofsmanagement  
Maritime | Schiffe, Marineschiffe | Navigations-, Fracht- und Bordmanagementsysteme  
Öl und Gas | Offshore-Plattformen, ferngesteuerte Bohrinseln | Prozesssteuerungs- und Sicherheitssysteme  
Telekommunikation | 5G-Antennenstandorte, MEC-Knoten | Multi-Access Edge Computing (MEC)-Server  
Gesundheitspflege | Kliniken, telemedizinische Diagnosezentren | Medizinische Bildgebung, Patientendaten, Ferndiagnostik  
Einzelhandel | Geschäfte, Filialen, Lagerhäuser | Kassensystem und Bestandsverwaltung  
Verteidigung | Vorwärtsliegende Operationsbasen, Feldeinheiten | Missionskritische Führungs- und Kommunikationssysteme  
  
## Überwachung, Verwaltung und Alarmierung {#monitoring-management-alerting}

Fähigkeit | Details  
---|---  
Webkonsole | Web-App oder Progressive Web-App (PWA); Cluster-Knoten konfigurieren, überwachen und verwalten  
Mobile Benachrichtigungen | Browser-Push-Benachrichtigungen für Statusänderungen  
Zeitleiste der Staaten | Visuelle Zeitleiste der Modulzustände und Ereignisse  
E-Mail-Benachrichtigungen | Integrierter E-Mail-Agent für Benachrichtigungen  
CLI-Verwaltung | Vollständige Befehlszeilenschnittstelle für Skripterstellung und Automatisierung  
Protokollverwaltung | Protokolldateien pro Modul und pro Skript; Debug-Snapshots zur Unterstützung  
Integration von Drittanbieter-Überwachung | SafeKit Protokolliert automatisch alle wichtigen Clusterereignisse im Windows Ereignisprotokoll oder Linux Syslog ermöglicht es jeder Überwachungsplattform, diese Ereignisse zu erfassen und Alarme mit Standard-Alarmierungsregeln auszulösen – einschließlich Nagios, Zabbix, Splunk und SIEM-Lösungen – ohne dass eine individuelle Entwicklung erforderlich ist.  
  
## Sicherheit und Compliance {#security-compliance}

Besonderheit | Details  
---|---  
HTTPS-Konsolenzugriff | Ja – TLS-Zertifikate für die Webkonsole  
Benutzerauthentifizierung | Lokale Konten, LDAP, PKI/zertifikatsbasiert, OpenID Connect  
Benutzerrollen | Konfigurierbare Zugriffsrichtlinien für Administrator-, Kontroll- und Überwachungsrollen  
Verschlüsselung | TLS/SSL für TCP (Replikation, Webkonsole, verteilte Befehle) und symmetrische AES-128-CBC- + SHA256-Verschlüsselung für UDP (Heartbeat, internes SafeAdmin-Protokoll); Verschlüsselung basierend auf der OpenSSL-Bibliothek. Webdienst basierend auf Apache.  
Antivirus-Kompatibilität | Dokumentierte Ausschlusspfade  
Souveränität | Als europäisches Unternehmen bietet Eviden (Atos-Gruppe) mit SafeKit ein einzigartiges, souveränes Produkt für Geschäftskontinuität und Notfallwiederherstellung für Windows Und Linux — die Daten und die Ausfallsicherungsinfrastruktur vollständig vor Ort zu betreiben, ohne Abhängigkeit von US-Anbietern, im Einklang mit den Anforderungen von NIS2 an Geschäftskontinuität und Notfallwiederherstellung.  
  
## Lizenzmodell {#licensing-model}

Aspekt | Details  
---|---  
Lizenztyp | Dauerlizenz (einmaliger Kauf) basierend auf Hostnamen  
Lizenzumfang | Pro Server (Knoten)  
Lizenzaktivierung | Offline-Aktivierung wird unterstützt; für die Aktivierung der Lizenzschlüssel ist kein Internetzugang erforderlich.  
Kostenlose Testversion | Ja – eine vollumfängliche, kostenlose Testversion ist verfügbar.  
Kostenlose einmonatige Lizenz | Verfügbar für Machbarkeitsstudien  
  
## Support- und Wartungs-SLAs {#support-maintenance-slas}

### Standard-Support und -Wartung (im aktiven Wartungsvertrag enthalten) {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
Zugriff auf das Supportportal | 24/7/365-Webportal für bis zu 4 benannte technische Ansprechpartner  
Live-Supportzeiten | Europäisches Supportzentrum, Montag–Freitag, 9:00–17:00 Uhr  
Bestätigung des Vorfalls | Innerhalb von 4 Arbeitszeiten des Support-Centers  
Aktualisierungen und Upgrades | Alle Service Packs, Updates und Upgrades sind ohne zusätzliche Kosten enthalten.  
Ersatz für Lizenzschlüssel | Ein Lizenzschlüssel kann bei einer Änderung des Hostnamens im Rahmen eines aktiven Supportvertrags neu zugewiesen werden. Die Lizenzübertragung ist auf den Serveraustausch innerhalb desselben Projekts beschränkt und bedarf der vorherigen schriftlichen Zustimmung von Eviden.  
Zugriff auf die Wissensdatenbank | Vollständiger Zugriff auf Wissensdatenbankartikel, FAQs und Online-Dokumentation  
Anwendung starten/stoppen ohne SafeKit | Ja – Stopp SafeKit und verwenden Sie ein Wrapper-Skript, um die Anwendung zu starten oder zu stoppen. Das Wrapper-Skript ruft die Start-/Stopp-Skripte der Anwendung auf und konfiguriert oder entfernt bei Bedarf die virtuelle IP-Adresse. 
Supportportal | <https://customercare.evidian.com>  
  
### Kostenlose Ressourcen (kein Vertrag erforderlich) {#free-resources-no-contract-required}

Ressource | Details  
---|---  
KI-Unterstützungsassistent | [SafeKit KI-Chat](</de/resources/safekit-support/#ai-support>) auf safekit.eviden.com und über jeden LLM, der safekit.eviden.com/ verwendetllms.txt  
Online-Schulung & Zertifizierung | Kostenlos, im eigenen Tempo, 12 Videos (ca. 3 Stunden 40 Minuten), Zertifikat nach Abschluss  
Dokumentation | Vollständiges Benutzerhandbuch, Versionshinweise, Wissensdatenbank, Schnellstartanleitungen  
  
## Vergleich vs. Alternativen {#comparison-vs-alternatives}

Kriterium | SafeKit | Microsoft Failovercluster (WSFC) | VMware HA | Open Source*  
---|---|---|---|---  
Gemeinsamer Speicher (SAN/vSAN) erforderlich | NEIN | Ja | Ja | NEIN  
Windows Unterstützung | Ja | Ja | Ja | NEIN  
Linux Unterstützung | Ja | NEIN | Ja | Ja  
Edge-/Branch-Bereitstellung | Exzellent | Komplex | Komplex | Komplex  
OEM-einbaubar | Ja | NEIN | NEIN | NEIN  
Kosten | Dauerhaft pro Knoten | Windows Server + SAN | vSphere Enterprise + SAN | Hochwertige Integrationsdienste  
Komplexität der Einrichtung | Plug-and-Play | Hoch (AD, SAN, Zeuge) | Hoch (vCenter, gemeinsam genutzter Speicher) | Hoher Anteil an fragmentierten Produkten  
Wartbarkeit | Einzelprodukt, Webkonsole | Hohes Niveau (AD- und SAN-Kenntnisse erforderlich) | Hoch (vCenter-Abhängigkeit) | Hoch (separate Produkte zu warten)  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## Schnellzugriffslinks {#quick-reference-links}

Ressource | URL  
---|---  
Produkt-Startseite | [https://safekit.eviden.com/de/](/de/)  
Technischer Überblick (DOCX mit Text und Diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Kostenlose Testversion | [https://safekit.eviden.com/de/resources/safekit-free-trial/](</de/resources/safekit-free-trial/>)  
Angebot anfordern | [https://safekit.eviden.com/de/safekit-pricing/](</de/safekit-pricing/>)  
Supportportal | <https://customercare.evidian.com>  
Kostenloser KI-Support | [https://safekit.eviden.com/de/resources/safekit-support/](</de/resources/safekit-support/>)  
Kostenlose Schulung & Zertifizierung | [https://safekit.eviden.com/de/resources/safekit-on-line-training/](</de/resources/safekit-on-line-training/>)  
Kontaktieren Sie uns | [https://safekit.eviden.com/de/contact-us-for-safekit/](</de/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}