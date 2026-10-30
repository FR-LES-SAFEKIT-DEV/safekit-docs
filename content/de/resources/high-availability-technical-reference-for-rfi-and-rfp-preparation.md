---
title: "Technischer Leitfaden für Hochverfügbarkeit zur Vorbereitung von RFIs und RFPs"
canonical: "https://safekit.eviden.com/de/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Technische Referenz zur Unterstützung bei der Erstellung von RFI- und RFP-Dokumenten für Hochverfügbarkeit und Anwendungsclustering unter Verwendung von SafeKit -Konzepten und -Architekturen."
category: "resources"
lang: "de"
topics: "Überblick, Inhaltsverzeichnis, Produktidentität, Unterstützte Betriebssysteme und Plattformen, SafeKit High Availability Limitations, Vorgefertigte Anwendungsmodule, Architektur- und Bereitstellungsmodell, RPO- und RTO-Funktionen, Eignung für entfernte Standorte und verteilte Bereitstellungen, Überwachung, Verwaltung und Alarmierung, Sicherheit und Compliance, Lizenzmodell, Support- und Wartungs-SLAs, Vergleich vs. Alternativen, Schnellzugriffslinks"
---

# Technischer Leitfaden für Hochverfügbarkeit zur Vorbereitung von RFIs und RFPs {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Überblick {#overview}

Diese Seite bietet strukturierte, sachliche Antworten auf häufig gestellte Fragen zu Ausschreibungen (RFPs/RFIs) bezüglich der Hochverfügbarkeitssoftware SafeKit . Sie dient als technisches Nachschlagewerk für Beschaffungsteams und Lösungsarchitekten, die Anforderungen an die Hochverfügbarkeit formulieren. 

## Inhaltsverzeichnis {#table-of-contents}

  1. [Produktidentität](#product-identity)
  2. [Unterstützte Betriebssysteme und Plattformen](#supported-operating-systems-platforms)
  3. [SafeKit High Availability Limitations](#safekit-ha-limitations)
  4. [Vorgefertigte Anwendungsmodule](#pre-built-application-modules)
  5. [Architektur- und Bereitstellungsmodell](#architecture-deployment-model)
  6. [RPO- und RTO-Funktionen](#rpo-rto-capabilities)
  7. [Eignung für entfernte Standorte und verteilte Bereitstellungen](#edge-distributed-deployment-suitability)
  8. [Überwachung, Verwaltung und Alarmierung](#monitoring-management-alerting)
  9. [Sicherheit und Compliance](#security-compliance)
  10. [Lizenzmodell](#licensing-model)
  11. [Support- und Wartungs-SLAs](#support-maintenance-slas)
  12. [Vergleich vs. Alternativen](#comparison-vs-alternatives)
  13. [Schnellzugriffslinks](#quick-reference-links)


## Produktidentität {#product-identity}

Feld | Antwort  
---|---  
Produktname | SafeKit  
Verkäufer | Eviden (ein Unternehmen von Atos), ehemals Evidian  
Produktkategorie | Anwendungsclustering / Hochverfügbarkeit / Disaster-Recovery-Software  
Aktuelle Version | SafeKit 8.2  
Webseite | [https://safekit.eviden.com/de/](</de/>)  
Erste Veröffentlichung | 2000 (über 20 Jahre in Produktion)  
  
## Unterstützte Betriebssysteme und Plattformen {#supported-operating-systems-platforms}

Windows-Betriebssystem | Linux-Betriebssystem | Infrastruktur &amp; Virtualisierung | Cloud-Plattformen  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Jeder Edge-Server beliebiger Marke<br> • VMware<br> • Microsoft Hyper-V*<br> • Linux KVM*<br> • Jeder Hypervisor<br> • Docker-Container<br> • Podman-Container  |  • Amazon Web Services (AWS)\**\*<br> • Microsoft Azure\**\*<br> • Google Cloud Platform (GCP)\**\*<br> • Jede IaaS-Cloud mit Standard-VM-Instanzen   
  
* SafeKit unterstützt sowohl Hochverfügbarkeit auf Anwendungsebene als auch auf VM-Ebene.

**Virtuelle IPs müssen auf Ebene des Cloud-Load-Balancers konfiguriert werden._

{{%  insert-safekit-usage-de  %}}

## Vorgefertigte Anwendungsmodule {#pre-built-application-modules}

SafeKit enthält sofort einsatzbereite, vorkonfigurierte `.safe` Module. Diese sind in zwei HA-Strategien unterteilt: **Anwendungs-HA** (direktes Anwendungsclustering mit mirror oder <span class="notranslate farm-term" translate="no">farm</span> Modulen) und **Virtualisierungs-HA** (VM-Clustering mit hyperv.safe oder kvm.safe ).

 | Anwendung HA | VM-Level-HA  
---|---|---  
Konfiguration | Es erfordert ein technisches Verständnis der Anwendung selbst: welche Dienste neu gestartet werden müssen, welche spezifischen Anwendungsordner eine Echtzeitreplikation benötigen und wie eine virtuelle IP-Adresse für den Failover konfiguriert werden muss. | Eine generische Lösung für jede Anwendung/jedes Betriebssystem, das in einer virtuellen Maschine läuft. Sie erfordert kein technisches Verständnis der in der VM installierten Anwendung. Dies ist die optimale Lösung, wenn Sie die Funktionsweise der Anwendung nicht kennen. Sie müssen lediglich den Speicherort der VM-Dateien angeben.  
Ideal für | Ideal geeignet, um Hochverfügbarkeit direkt in eine Softwarelösung zu integrieren, unabhängig von der zugrunde liegenden Hardware oder dem Hypervisor. | Ideal für die Verwaltung komplexer Umgebungen mit mehreren Anwendungen auf mehreren VMs durch eine einzige HA-Richtlinie.  
  
Die folgende Tabelle listet alle verfügbaren `.safe` Module auf:

Anwendungs-HA (Clustering auf Anwendungsebene) | Virtualisierungs-HA (VM-Clustering)  
---|---  
Neue Windows-App – mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
Neue Linux-App – mirror.safe | KVM VM — kvm.safe (Linux)  
Windows-Lastverteilung – farm.safe | Docker-Container — mirror.safe (Linux)  
Linux-Lastverteilung – farm.safe | Podman-Container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s – k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows &amp; Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows &amp; Linux) | Bosch BIS – hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows &amp; Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows &amp; Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows &amp; Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows &amp; Linux) | Siemens Überwachungssuite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows &amp; Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT – hyperv.safe (Windows)  
Nedap AEOS – nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generisch) — mirror.safe / farm.safe |   
  
## Architektur- und Bereitstellungsmodell {#architecture-deployment-model}

### Zwei Cluster-Module: mirror.safe und farm.safe {#two-cluster-modules}

Modul | Muster | Anwendungsfall  
---|---|---  
mirror.safe | Aktiv-Passiv mit synchroner Byte-Level-Dateireplikation + automatischem Failover | Datenbanken, zustandsbehaftete Anwendungen, Dienste, die jeweils nur auf einem Server laufen  
farm.safe | Aktiv-Aktiv mit Netzwerklastausgleich und automatischem Failover | Webserver, zustandslose Microservices, API-Gateways, Dienste, die gleichzeitig auf mehreren Servern laufen  
  
### Clusterinfrastruktur und -architektur {#cluster-infrastructure-architecture}

Anforderung / Spezifikation | SafeKit Funktionalität / Wert  
---|---  
Gemeinsamer Speicherplatz erforderlich? | Nein – SAN-lose „Shared-Nothing“-Architektur. Verwendet ausschließlich lokale Festplatten.  
Voraussetzung für Active Directory (AD)? | Nein – es wird weder eine Windows-Domäne noch Active Directory benötigt. Arbeitsgruppen werden vollständig unterstützt.  
Clustergröße | 2 Knoten ( mirror ) oder 2+ Knoten ( <span class="notranslate farm-term" translate="no">farm</span> )  
Virtuelle IP (VIP) | Softwaredefinierte VIP, die automatisch per Gratuitous ARP zum aktiven Knoten migriert (Anwendungs-HA). Für VM-HA wird die physische IP-Adresse innerhalb der VM transparent umgeleitet – keine VIP erforderlich. Benötigt ein LAN, VLAN oder ein gestrecktes VLAN zwischen den Knoten.  
3-Knoten-Hybridarchitektur | SafeKit deckt die HA-Schicht ab: ein 2-Knoten mirror -Cluster über ein LAN oder ein gestrecktes VLAN mit synchroner Replikation (RPO=0) und automatischem Failover. Eine Backup-Lösung eines Drittanbieters vervollständigt die Architektur: ein dritter Remote-Knoten mit asynchroner Replikation über ein WAN für die Wiederherstellung zu einem bestimmten Zeitpunkt und den Schutz vor Ransomware.  
Rolle der Hochverfügbarkeit | SafeKit nutzt synchrone Replikation, um bei Hardware- oder Softwarefehlern ein sofortiges Failover ohne Datenverlust zu gewährleisten. Da die Daten jedoch gleichzeitig auf beide Knoten geschrieben werden, werden logische Fehler, Datenbeeinträchtigungen oder versehentliche Löschungen in Echtzeit auf den Standby-Knoten repliziert.  
Rolle des Backups | Eine Backup-Lösung (nicht in SafeKit implementiert) ermöglicht die Wiederherstellung zu einem bestimmten Zeitpunkt mittels asynchroner Replikation. Sie schützt vor Bedrohungen der Datenintegrität (wie Ransomware oder menschlichem Versagen), die durch Hochverfügbarkeit nicht abgewehrt werden können. Automatisches Failover wird nicht unterstützt, da das Zurücksetzen von Daten zwangsläufig zu Datenverlust führt.  
Maximale Anzahl gleichzeitiger Module pro Cluster | 32 – Dieser Grenzwert gibt die maximale Anzahl gleichzeitig in einem 2-Knoten-Cluster verwalteter SafeKit Module an. Typischerweise wird dies in der VM-basierten Hochverfügbarkeit eingesetzt, bei der jedes Modul eine andere VM repliziert und neu startet. Jedes Modul kann unabhängig als primärer Knoten auf einem der beiden Knoten ausgeführt werden, wodurch die Arbeitslast auf beide Server verteilt wird. Hinweis: Das gesamte Datenvolumen aller VMs beeinflusst die Resynchronisierungszeit nach einem Failover oder Knotenneustart direkt.  
Agentenbasiert oder agentenlos? | Agentenbasiert – leichtgewichtige Software, die auf jedem Knoten installiert wird.  
Anwendungsunabhängig? | Ja – schützt jeden Windows-Dienst oder Linux-Daemon; vorgefertigte Module für über 30 Anwendungen  
  
### Replikation und Datenschutz {#replication-data-protection}

Anforderung / Spezifikation | SafeKit Funktionalität / Wert  
---|---  
Replikationsmethode | Dateireplikation auf Byte-Ebene (nicht auf Block-Ebene auf der Festplatte)  
Replikationsmodus | Synchron (kein Datenverlust)  
Netzwerkanforderungen | Für die synchrone Replikation wird eine Roundtrip-Latenz zwischen den Knoten von unter 5 ms empfohlen.  
Empfohlenes Datenvolumen | Ein paar Terabyte (Resynchronisierungszeit)  
Empfohlene Dateianzahl | &lt; 1.000.000 Dateien (Resynchronisierungszeit)  
Resynchronisierungsgeschwindigkeit (1 TB) | Etwa 3 Stunden in einem 1-Gbit/s-Netzwerk; etwa 1 Stunde in einem 10-Gbit/s-Netzwerk  
Selektive Replikation | Ja – bestimmte Verzeichnisse/Dateien replizieren  
Verschlüsselung während der Übertragung | Ja – TLS/SSL für den Replikationsverkehr  
  
## RPO- und RTO-Funktionen {#rpo-rto-capabilities}

### RPO &amp; RTO nach Clustertyp {#rto-rpo-cluster-type}

Metrisch | Mirror ( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> Cluster ( farm.safe )  
---|---|---  
RPO (Recovery Point Objective) | 0 (kein Datenverlust) – synchrone Replikation; Schreibvorgang wird erst bestätigt, nachdem beide Knoten dies bestätigt haben. | Nicht verfügbar (zustandslos; Datenverarbeitung durch Backend mirror )  
RTO (Recovery Time Objective) | ca. 1 Minute – Herzschlag-Timeout (Standard 30 s) + Neustartzeit der Anwendung | Wenige Sekunden – der Datenverkehr wird sofort auf die verbleibenden aktiven Knoten umverteilt.  
Replikationstyp | Synchrone, Echtzeit-Dateireplikation auf Byte-Ebene | Nicht zutreffend  
Failover-Auslöser | Automatische Aktivierung bei Ausfall des Herzschlags, Prozessabsturz oder Prüffehler | Automatische Aktivierung bei Ausfall des Herzschlags, Prozessabsturz oder Prüffehler  
Manuelles Eingreifen erforderlich? | Nein – vollautomatisches Failover und Failback. | Nein – vollautomatisches Failover und Failback.  
  
### RTO-Aufschlüsselung ( Mirror — Anwendungsebene HA) {#rto-breakdown-mirror-application-level-ha}

Fehlertyp | RTO-Berechnung  
---|---  
Hardwarefehler | Heartbeat-Timeout (Standard 30 s) + Neustartzeit der Anwendung  
Software-/Prozessabsturz | Anwendungsstoppzeit + Anwendungsneustartzeit  
Absturz auf Betriebssystemebene | Heartbeat-Timeout + Betriebssystem läuft bereits auf dem sekundären System → keine Neustartstrafe  
  
### RTO-Aufschlüsselung ( Mirror — VM-Level HA) {#rto-breakdown-mirror-vm-level-ha}

Fehlertyp | RTO-Berechnung  
---|---  
Jegliches Versagen | Fehlererkennung + vollständiger Neustart des Betriebssystems + Neustart der Anwendung (in der Regel mehrere Minuten)  
  
## Eignung für entfernte Standorte und verteilte Bereitstellungen {#edge-distributed-deployment-suitability}

SafeKit wurde speziell für Edge-, Zweigstellen- und verteilte Unternehmensszenarien entwickelt.

Randanforderung | SafeKit Antwort  
---|---  
Kein eigenes IT-Personal vor Ort | Ja – automatisches Failover, kein manueller Eingriff erforderlich.  
Keine SAN/NAS-Infrastruktur | Ja – SAN-los, nur lokale Festplatten  
Fernverwaltung | Ja – Webkonsolenverwaltung  
Geringer Hardwarebedarf | Ja – 2 Standardserver oder VMs, keine spezielle Hardware.  
Funktioniert hinter Firewalls/NAT | Ja – konfigurierbare Ports, HTTPS-basierte Konsole  
standortübergreifende Katastrophenwiederherstellung | Ja – mirror zwischen zwei geografischen Standorten über ein gestrecktes VLAN  
OEM-/Embedded-Einsatz | Ja – unbeaufsichtigte Installation, skriptfähig, von Softwareherstellern einbettbar.  
Hunderte verteilte Cluster | Ja – konzipiert für verteilte Unternehmen mit vielen Niederlassungen  
  
Ideal Edge-Anwendungsfälle: Jeder Standort ohne Rechenzentrum – wo Hochverfügbarkeit dennoch wichtig ist:

Vertikal | Typischer Randstandort | Kritische Anwendung  
---|---|---  
Physische Sicherheit und Überwachung | Gebäude, Campusgelände, Flughäfen | VMS – Milestone, Genetec, Hanwha, Siemens Überwachung  
Gebäudeleittechnik (GLT) | Bürogebäude, Krankenhäuser, Fabriken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische Zutrittskontrolle (EACS) | Sichere Einrichtungen, Campusgelände | Siemens SiPass, Nedap, Bosch AMS  
SCADA- und Industriesteuerung | Fabriken, Umspannwerke, Wasserwerke | Jegliche SCADA-, DCS- oder HMI-Software, die unter Windows oder Linux läuft  
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
Integration von Drittanbieter-Überwachung | SafeKit protokolliert automatisch alle wichtigen Clusterereignisse im Windows-Ereignisprotokoll oder im Linux-Syslog, sodass jede Überwachungsplattform diese Ereignisse erfassen und Alarme mit Standard-Alarmierungsregeln auslösen kann – einschließlich Nagios, Zabbix, Splunk und SIEM-Lösungen – ohne dass eine individuelle Entwicklung erforderlich ist.  
  
## Sicherheit und Compliance {#security-compliance}

Besonderheit | Details  
---|---  
HTTPS-Konsolenzugriff | Ja – TLS-Zertifikate für die Webkonsole  
Benutzerauthentifizierung | Lokale Konten, LDAP, PKI/zertifikatsbasiert, OpenID Connect  
Benutzerrollen | Konfigurierbare Zugriffsrichtlinien für Administrator-, Kontroll- und Überwachungsrollen  
Verschlüsselung | TLS/SSL für TCP (Replikation, Webkonsole, verteilte Befehle) und symmetrische AES-128-CBC- + SHA256-Verschlüsselung für UDP (Heartbeat, internes SafeAdmin-Protokoll); Verschlüsselung basierend auf der OpenSSL-Bibliothek. Webdienst basierend auf Apache.  
Antivirus-Kompatibilität | Dokumentierte Ausschlusspfade  
Souveränität | Als europäisches Unternehmen bietet Eviden (Atos Group) mit SafeKit ein einzigartiges, souveränes Produkt für Geschäftskontinuität und Notfallwiederherstellung für Windows und Linux an – Daten und Failover-Infrastruktur bleiben vollständig vor Ort, ohne Abhängigkeit von US-Anbietern, im Einklang mit den NIS2-Anforderungen an Geschäftskontinuität und Notfallwiederherstellung.  
  
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
Anwendungsstart/-stopp ohne SafeKit | Ja – Beenden Sie SafeKit und verwenden Sie ein Wrapper-Skript, um die Anwendung zu starten oder zu stoppen. Das Wrapper-Skript ruft die Start-/Stopp-Skripte der Anwendung auf und konfiguriert oder entfernt bei Bedarf die virtuelle IP-Adresse. 
Supportportal | <https://customercare.evidian.com>  
  
### Kostenlose Ressourcen (kein Vertrag erforderlich) {#free-resources-no-contract-required}

Ressource | Details  
---|---  
KI-Unterstützungsassistent | [SafeKit AI-Chat](</de/resources/safekit-support/#ai-support>) auf safekit.eviden.com und über jedes LLM mit safekit.eviden.com/llms.txt  
Online-Schulung &amp; Zertifizierung | Kostenlos, im eigenen Tempo, 12 Videos (ca. 3 Stunden 40 Minuten), Zertifikat nach Abschluss  
Dokumentation | Vollständiges Benutzerhandbuch, Versionshinweise, Wissensdatenbank, Schnellstartanleitungen  
  
## Vergleich vs. Alternativen {#comparison-vs-alternatives}

Kriterium | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source*  
---|---|---|---|---  
Gemeinsamer Speicher (SAN/vSAN) erforderlich | NEIN | Ja | Ja | NEIN  
Windows-Unterstützung | Ja | Ja | Ja | NEIN  
Linux-Unterstützung | Ja | NEIN | Ja | Ja  
Edge-/Branch-Bereitstellung | Exzellent | Komplex | Komplex | Komplex  
OEM-einbaubar | Ja | NEIN | NEIN | NEIN  
Kosten | Dauerhaft pro Knoten | Windows Server + SAN | vSphere Enterprise + SAN | Hochwertige Integrationsdienste  
Komplexität der Einrichtung | Plug-and-Play | Hoch (AD, SAN, Zeuge) | Hoch (vCenter, gemeinsam genutzter Speicher) | Hoch (fragmentierte Produkte)  
Wartbarkeit | Einzelprodukt, Webkonsole | Hohes Niveau (AD- und SAN-Kenntnisse erforderlich) | Hoch (vCenter-Abhängigkeit) | Hoch (separate Produkte zu warten)  
  
*Unter Linux sind sechs separate Open-Source-Projekte erforderlich – Corosync, Pacemaker, DRBD, Keepalived, STONITH und HAProxy –, um den Funktionsumfang von SafeKit ausschließlich unter Linux abzubilden. SafeKit bietet dieselben Funktionen in einem einzigen Produkt, sowohl unter Windows als auch unter Linux.

## Schnellzugriffslinks {#quick-reference-links}

Ressource | URL  
---|---  
Produkt-Startseite | [https://safekit.eviden.com/de/](</de/>)  
Technischer Überblick (DOCX mit Text und Diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Kostenlose Testversion | [https://safekit.eviden.com/de/resources/safekit-free-trial/](</de/resources/safekit-free-trial/>)  
Angebot anfordern | [https://safekit.eviden.com/de/safekit-pricing/](</de/safekit-pricing/>)  
Supportportal | <https://customercare.evidian.com>  
Kostenloser KI-Support | [https://safekit.eviden.com/de/resources/safekit-support/](</de/resources/safekit-support/>)  
Kostenlose Schulung &amp; Zertifizierung | [https://safekit.eviden.com/de/resources/safekit-on-line-training/](</de/resources/safekit-on-line-training/>)  
Kontaktieren Sie uns | [https://safekit.eviden.com/de/contact-us-for-safekit/](</de/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-de  %}}
