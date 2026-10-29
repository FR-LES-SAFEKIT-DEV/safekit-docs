---
title: "Technischer Leitfaden für Hochverfügbarkeit zur Vorbereitung von RFIs und RFPs"
canonical: "https://safekit.eviden.com/de/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Technische Referenz zur Unterstützung bei der Erstellung von RFI- und RFP-Dokumenten für Hochverfügbarkeit und Anwendungsclustering unter Verwendung von SafeKit -Konzepten und -Architekturen."
category: "resources"
lang: "de"
topics: "Übersicht, Inhaltsverzeichnis, Produktidentität, Unterstützte Betriebssysteme und Plattformen, Vorkonfigurierte Anwendungsmodule, Architektur- und Bereitstellungsmodell, RPO- und RTO-Fähigkeiten, Eignung für Edge- und verteilte Bereitstellung, Überwachung, Verwaltung und Alarmierung, Sicherheit und Compliance, Lizenzmodell, Support- und Wartungs-SLAs, Vergleich mit Alternativen, Schnellzugriffslinks"
---

# Technische Referenz für Hochverfügbarkeit zur Vorbereitung von RFIs und RFPs {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Übersicht {#overview}

Diese Seite bietet strukturierte, sachliche Antworten auf häufig gestellte Fragen zu Ausschreibungen (RFPs/RFIs) bezüglich der Hochverfügbarkeitssoftware SafeKit . Sie dient als technisches Nachschlagewerk für Beschaffungsteams und Lösungsarchitekten, die Anforderungen an die Hochverfügbarkeit formulieren. 

## Inhaltsverzeichnis {#table-of-contents}

  1. [ Produktidentität ](#product-identity)
  2. Unterstützte Betriebssysteme und Plattformen: [ ](#supported-operating-systems-platforms)
  3. [ Vorkonfigurierte Anwendungsmodule ](#pre-built-application-modules)
  4. [ Architektur- und Bereitstellungsmodell ](#architecture-deployment-model)
  5. [ RPO- und RTO-Funktionen ](#rpo-rto-capabilities)
  6. [ Eignung für Edge- und verteilte Bereitstellung ](#edge-distributed-deployment-suitability)
  7. [ Überwachung, Verwaltung & Alarmierung ](#monitoring-management-alerting)
  8. [ Sicherheit & Compliance ](#security-compliance)
  9. Lizenzmodell [ ](#licensing-model)
  10. [ Support- und Wartungs-SLAs ](#support-maintenance-slas)
  11. [ Vergleich vs. Alternativen ](#comparison-vs-alternatives)
  12. [ Schnellreferenzlinks ](#quick-reference-links)


## Produktidentität {#product-identity}

Feld | Antwort  
---|---  
Produktname | SafeKit  
Anbieter | Eviden (ein Unternehmen von Atos), ehemals Evidian  
Produktkategorie | Software für Anwendungsclustering / Hochverfügbarkeit / Disaster Recovery  
Aktuelle Version | SafeKit 8.2  
Website | <https://safekit.eviden.com>  
Erste Version | 2000 (über 20 Jahre in Produktion)  
  
## Unterstützte Betriebssysteme und Plattformen {#supported-operating-systems-platforms}

Windows OS | Linux OS | Infrastruktur & Virtualisierung | Cloud-Plattformen  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64) | • Beliebiger Edge-Server beliebiger Marke <br> • VMware <br> • Microsoft Hyper-V * <br> • Linux KVM * <br> • Beliebiger Hypervisor <br> • Docker Container <br> • Podman Container | • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • Jede IaaS-Cloud mit Standard-VM-Instanzen   
  
_ * SafeKit unterstützt sowohl HA auf Anwendungsebene als auch HA auf VM-Ebene._

_ Virtuelle IPs ** müssen auf Ebene des Cloud-Load-Balancers konfiguriert werden._

## Vorkonfigurierte Anwendungsmodule {#pre-built-application-modules}

SafeKit enthält sofort einsatzbereite, vorkonfigurierte `.safe` -Module. Diese sind in zwei HA-Strategien unterteilt: **Application HA** (direktes Anwendungsclustering mit den Modulen mirror oder `farm` ) und **Virtualization HA** (Clustering auf VM-Ebene mit den hyperv.safe oder kvm.safe ).

 | Anwendungs-HA | VM-Level-HA  
---|---|---  
Konfiguration | Hierfür sind technische Kenntnisse der Anwendung selbst erforderlich: Welche Dienste müssen neu gestartet werden? Welche Anwendungsordner benötigen eine Echtzeitreplikation? Wie wird eine virtuelle IP-Adresse für das Failover konfiguriert? | Generische Lösung für jede Anwendung/jedes Betriebssystem, das in der VM ausgeführt wird. Hierfür sind keine technischen Kenntnisse der in der VM installierten Anwendung erforderlich. Dies ist die beste Lösung, wenn Sie die Funktionsweise der Anwendung nicht kennen. Sie müssen lediglich den Speicherort der VM-Dateien angeben.  
Ideal für | : Ideal zur direkten Integration von Hochverfügbarkeit in eine Softwarelösung, unabhängig von der zugrunde liegenden Hardware oder dem Hypervisor. | Ideal zur Verwaltung komplexer Umgebungen mit mehreren Anwendungen auf verschiedenen VMs mittels einer einzigen HA-Richtlinie.  
  
Die folgende Tabelle listet alle verfügbaren `.safe` -Module auf:

Anwendungs-HA (Clustering auf Anwendungsebene) | Virtualisierungs-HA (Clustering auf VM-Ebene)  
---|---  
Neue Windows App — mirror.safe | Hyper-V VM — hyperv.safe ( Windows )  
Neue Linux App — mirror.safe | KVM VM — kvm.safe ( Linux )  
Windows Lastausgleich — farm.safe | Docker Container — mirror.safe ( Linux )  
Linux Lastausgleich — farm.safe | Podman Container — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( Windows & Linux ) | Bosch AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows & Linux ) | Bosch BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows & Linux ) | Bosch BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows & Linux ) | Hanwha Vision — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows & Linux ) | Hanwha Wisenet — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( Windows & Linux ) | Siemens Überwachungssuite — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( Windows & Linux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) | Siemens SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
Genetec ( SQL Server ) — sqlserver.safe ( Windows ) | SIMATIC WinCC — hyperv.safe ( Windows )  
Siemens Überwachung VMS — SiveillanceVMS.safe ( Windows ) |   
Cloud ( AWS , Azure , GCP , generic) — mirror.safe / farm.safe |   
  
## Architektur- und Bereitstellungsmodell {#architecture-deployment-model}

### Zwei Clustermodule: mirror.safe und farm.safe {#two-cluster-modules}

Modul | Muster | Anwendungsfall  
---|---|---  
mirror.safe | Aktiv-Passiv mit synchroner Byte-Level-Dateireplikation + automatischem Failover | Datenbanken, zustandsbehaftete Anwendungen, Dienste, die jeweils nur auf einem Server ausgeführt werden  
farm.safe | Aktiv-Aktiv mit Netzwerklastausgleich + automatischem Failover | Webserver, zustandslose Microservices, API-Gateways, Dienste, die gleichzeitig auf mehreren Servern laufen  
  
### Clusterinfrastruktur und -architektur {#cluster-infrastructure-architecture}

Anforderung / Spezifikation | SafeKit Fähigkeit / Wert  
---|---  
Gemeinsamer Speicher erforderlich? | Nein – SAN-lose „Shared-Nothing“-Architektur. Verwendet ausschließlich lokale Festplatten.  
Voraussetzung für Active Directory (AD)? Nein – es wird weder eine | Windows Domäne noch Active Directory benötigt. Arbeitsgruppen werden vollständig unterstützt.  
Clustergröße | 2 Knoten ( mirror ) oder 2+ Knoten ( `farm` )  
Virtuelle IP (VIP) | Softwaredefinierte VIP, die automatisch per Gratuitous ARP zum aktiven Knoten migriert (Anwendungs-HA). Für VM-HA wird die physische IP innerhalb der VM transparent umgeleitet – keine VIP erforderlich. Erfordert ein LAN, VLAN oder ein gestrecktes VLAN zwischen den Knoten.  
Die 3-Knoten-Hybridarchitektur | SafeKit bildet die HA-Schicht: ein 2-Knoten-Cluster mirror über ein LAN oder ein gestrecktes VLAN mit synchroner Replikation (RPO=0) und automatischem Failover. Eine Backup-Lösung eines Drittanbieters vervollständigt die Architektur: ein dritter Remote-Knoten mit asynchroner Replikation über ein WAN für die Wiederherstellung zu einem bestimmten Zeitpunkt und zum Schutz vor Ransomware.  
Die Hochverfügbarkeitsfunktion | SafeKit nutzt synchrone Replikation, um bei Hardware- oder Softwarefehlern ein sofortiges Failover ohne Datenverlust zu gewährleisten. Da die Daten jedoch gleichzeitig auf beide Knoten geschrieben werden, werden logische Fehler, Datenbeeinträchtigungen oder versehentliche Löschungen in Echtzeit auf den Standby-Knoten repliziert.  
Rolle der Datensicherung | Eine Datensicherungslösung (nicht implementiert in SafeKit ) ermöglicht die Wiederherstellung zu einem bestimmten Zeitpunkt durch asynchrone Replikation. Sie schützt vor Bedrohungen der Datenintegrität (wie Ransomware oder menschliches Versagen), die durch Hochverfügbarkeit nicht abgewehrt werden können. Automatisches Failover wird nicht unterstützt, da das Zurücksetzen von Daten zwangsläufig zu Datenverlust führt.  
Maximale Anzahl gleichzeitiger Module pro Cluster: | 32 – dieser Grenzwert definiert die maximale Anzahl von SafeKit Modulen, die gleichzeitig in einem 2-Knoten-Cluster verwaltet werden können. Dieser Cluster wird typischerweise in der VM-basierten Hochverfügbarkeit eingesetzt, bei der jedes Modul eine andere VM repliziert und neu startet. Jedes Modul kann unabhängig als primärer Knoten auf einem der beiden Knoten ausgeführt werden, wodurch die Arbeitslast auf beide Server verteilt wird. Hinweis: Das gesamte Datenvolumen aller VMs beeinflusst die Resynchronisierungszeit nach einem Failover oder Knotenneustart direkt.  
Agentenbasiert oder agentenlos? | Agentenbasiert – schlanke Software, die auf jedem Knoten installiert wird.  
Anwendungsunabhängig? | Ja – schützt jeden Windows -Dienst oder Linux -Daemon; vorgefertigte Module für über 30 Anwendungen  
  
### Replikation & Datenschutz {#replication-data-protection}

Anforderung / Spezifikation | SafeKit Fähigkeit / Wert  
---|---  
Replikationsmethode | Byte-basierte Dateireplikation (nicht Block-basierte Festplattenreplikation)  
Replikationsmodus | Synchron (kein Datenverlust)  
Netzwerkanforderung | Roundtrip-Latenz zwischen Knoten < 5 ms für synchrone Replikation empfohlen  
Empfohlenes Datenvolumen | Einige Terabyte (Resynchronisierungszeit)  
Empfohlene Dateianzahl | < 1.000.000 Dateien (Resynchronisierungszeit)  
Resynchronisierungsgeschwindigkeit (1 TB) | ca. 3 Stunden in einem 1-Gbit/s-Netzwerk; ca. 1 Stunde in einem 10-Gbit/s-Netzwerk  
Selektive Replikation | Ja — bestimmte Verzeichnisse/Dateien replizieren  
Verschlüsselung während der Übertragung | Ja — TLS/SSL für Replikationsverkehr  
  
## RPO- und RTO-Funktionen {#rpo-rto-capabilities}

### RPO & RTO nach Clustertyp {#rto-rpo-cluster-type}

Metrik | Mirror Cluster ( mirror.safe ) | `Farm` Cluster ( farm.safe )  
---|---|---  
RPO (Recovery Point Objective) | 0 (kein Datenverlust) — synchrone Replikation; Schreibbestätigung erst nach Bestätigung durch beide Knoten | N/A (zustandslos; Datenverarbeitung durch Backend) mirror )  
RTO (Recovery Time Objective) | ~1 Minute — Heartbeat-Timeout (Standard 30 s) + Anwendungsneustartzeit | Einige Sekunden — Datenverkehr wird sofort auf die verbleibenden aktiven Knoten umverteilt  
Replikationstyp | Synchrone, Echtzeit-Dateireplikation auf Byte-Ebene | Nicht zutreffend  
Failover-Trigger | Automatisch bei Heartbeat-Verlust, Prozessabsturz oder Prüffehler | Automatisch bei Heartbeat-Verlust, Prozessabsturz oder Prüffehler  
Manuelles Eingreifen erforderlich? | Nein – vollautomatisches Failover und Failback | Nein – vollautomatisches Failover und Failback  
  
### RTO-Aufschlüsselung ( Mirror – Anwendungsebene HA) {#rto-breakdown-mirror-application-level-ha}

Fehlertyp | RTO-Berechnung  
---|---  
Hardwarefehler | Heartbeat-Timeout (Standard 30 s) + Neustartzeit der Anwendung  
Software-/Prozessabsturz | Anwendungsstoppzeit + Anwendungsneustartzeit  
Betriebssystemabsturz | Heartbeat-Timeout + Betriebssystem läuft bereits auf dem sekundären System → keine Neustartstrafe  
  
### RTO-Aufschlüsselung ( Mirror – VM-Level HA) {#rto-breakdown-mirror-vm-level-ha}

Fehlertyp | RTO-Berechnung  
---|---  
Bei jedem Fehler | Fehlererkennung + vollständiger Neustart des Betriebssystems + Neustart der Anwendung (in der Regel mehrere Minuten)  
  
## Eignung für Edge- und verteilte Bereitstellung {#edge-distributed-deployment-suitability}

SafeKit wurde speziell für Edge-, Zweigstellen- und verteilte Unternehmensszenarien entwickelt.

Randanforderung | SafeKit Antwort  
---|---  
Kein dediziertes IT-Personal vor Ort | Ja – automatisches Failover, kein manueller Eingriff  
Keine SAN/NAS-Infrastruktur | Ja – SAN-los, nur lokale Festplatten  
Fernverwaltung | Ja — Webkonsolenverwaltung  
Geringer Hardwarebedarf | Ja — 2 Standardserver oder VMs, keine spezielle Hardware  
Funktioniert hinter Firewalls/NAT | Ja – konfigurierbare Ports, HTTPS-basierte Konsole  
Multi-Site Disaster Recovery | Ja — mirror zwischen zwei geografischen Standorten über ein gestrecktes VLAN  
OEM-/Embedded-Bereitstellung | Ja – unbeaufsichtigte Installation, skriptfähig, durch Softwarehersteller einbettbar  
Hunderte verteilte Cluster | Ja – konzipiert für verteilte Unternehmen mit vielen Niederlassungen  
  
Ideal Edge-Anwendungsfälle: Jeder Standort ohne Rechenzentrum – wo Hochverfügbarkeit dennoch wichtig ist:

Vertikal | Typischer Randstandort | Kritische Anwendung  
---|---|---  
Physische Sicherheit & Überwachung | Gebäude, Campusgelände, Flughäfen | VMS — Milestone , Genetec, Hanwha, Siemens Überwachung  
Gebäudeleittechnik (GLT) | Bürogebäude, Krankenhäuser, Fabriken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische Zutrittskontrolle (EACS) | Sichere Einrichtungen, Campusgelände | Siemens SiPass, Nedap , Bosch AMS  
SCADA & industrielle Steuerung | Fabriken, Umspannwerke, Wasserwerke | Jede SCADA-, DCS- oder HMI-Software, die auf Windows oder Linux läuft  
Flugsicherung (ATC) | Flughäfen, Kontrolltürme | ATC-Management- und Radarsysteme  
Betriebsleitzentralen (OCC) | U-Bahn, Eisenbahn, Verkehrsknotenpunkte | Eisenbahnsignalanlagen und Bahnhofsmanagement  
Maritime | Schiffe, Marinefahrzeuge | Navigations-, Ladungs- und Bordmanagementsysteme  
Öl & Gas | Offshore-Plattformen, ferngesteuerte Bohrinseln | Prozessleit- und Sicherheitssysteme  
Telekommunikation | 5G-Antennenstandorte, MEC-Knoten | Multi-Access Edge Computing (MEC)-Server  
Gesundheitswesen | Kliniken, Ferndiagnosezentren | Medizinische Bildgebung, Patientendaten, Ferndiagnostik  
Einzelhandel | Filialen, Niederlassungen, Lager | Kassensysteme und Bestandsverwaltung  
Verteidigung | Vorwärtsstützpunkte, Feldverbände | Missionskritische Führungs- und Kommunikationssysteme  
  
## Überwachung, Verwaltung & Alarmierung {#monitoring-management-alerting}

Details zur Fähigkeit |  
---|---  
Webkonsole | Web-App oder Progressive Web-App (PWA); Clusterknoten konfigurieren, überwachen und verwalten  
Mobile Benachrichtigungen | Browser-Push-Benachrichtigungen für Statusänderungen  
Zustands-Zeitleiste | Visuelle Zeitleiste der Modulzustände und Ereignisse  
E-Mail-Benachrichtigungen | Integrierter E-Mail-Agent für Benachrichtigungen  
CLI-Verwaltung | Vollständige Befehlszeilenschnittstelle für Skripterstellung und Automatisierung  
Protokollverwaltung | Protokolldateien pro Modul und Skript; Debug-Snapshots zur Unterstützung  
Die Drittanbieter-Überwachungsintegration | SafeKit protokolliert automatisch alle wichtigen Clusterereignisse im Ereignisprotokoll Windows bzw. im Syslog Linux . Dadurch kann jede Überwachungsplattform diese Ereignisse erfassen und Alarme mit Standard-Alarmierungsregeln auslösen – einschließlich Nagios, Zabbix, Splunk und SIEM-Lösungen – ohne dass eine individuelle Entwicklung erforderlich ist.  
  
## Sicherheit & Compliance {#security-compliance}

Feature | Details  
---|---  
HTTPS-Konsolenzugriff | Ja — TLS-Zertifikate für Webkonsole  
Benutzerauthentifizierung | Lokale Konten, LDAP, PKI/zertifikatsbasiert, OpenID Connect  
Benutzerrollen | Konfigurierbare Zugriffsrichtlinien für Administrator-, Kontroll- und Überwachungsrollen  
Verschlüsselung: | TLS/SSL für TCP (Replikation, Webkonsole, verteilte Befehle) und symmetrische AES-128-CBC + SHA256-Verschlüsselung für UDP (Heartbeat, internes SafeAdmin-Protokoll); Verschlüsselung basierend auf der OpenSSL-Bibliothek. Webdienst basierend auf Apache.  
Antivirus-Kompatibilität | Dokumentierte Ausschlusspfade  
Sovereignty | Als europäisches Unternehmen bietet Eviden (Atos Group) mit SafeKit ein einzigartiges souveränes Produkt für Geschäftskontinuität und Notfallwiederherstellung für Windows und Linux an – wodurch Daten und Failover-Infrastruktur vollständig vor Ort verbleiben, ohne Abhängigkeit von US-Anbietern, im Einklang mit den NIS2-Anforderungen an Geschäftskontinuität und Notfallwiederherstellung.  
  
## Lizenzmodell {#licensing-model}

Seitenverhältnis | Details  
---|---  
Lizenztyp | Dauerlizenz (einmaliger Kauf) basierend auf Hostnamen  
Lizenzumfang | Pro Server (Knoten)  
Lizenzaktivierung | Offline-Aktivierung wird unterstützt; für die Aktivierung der Lizenzschlüssel ist kein Internetzugang erforderlich.  
Kostenlose Testversion | Ja – vollumfängliche kostenlose Testversion verfügbar  
Kostenlose einmonatige Lizenz | verfügbar für Machbarkeitsstudien  
  
## Support- und Wartungs-SLAs {#support-maintenance-slas}

### Standard-Support und -Wartung (im aktiven Wartungsvertrag enthalten) {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
Zugang zum Supportportal | 24/7/365, Webportal für bis zu 4 benannte technische Ansprechpartner  
Live-Supportzeiten | 9:00 – 17:00 Uhr Europäisches Supportzentrum, Montag–Freitag  
Vorfallbestätigung | innerhalb von 4 Arbeitsstunden des Support-Centers  
Updates & Upgrades | Alle Service Packs, Updates und Upgrades sind ohne zusätzliche Kosten enthalten  
Lizenzschlüssel-Ersatz | Ein Lizenzschlüssel kann bei einer Hostnamenänderung im Rahmen eines aktiven Supportvertrags neu zugewiesen werden. Die Lizenzübertragung ist auf den Serveraustausch innerhalb desselben Projekts beschränkt und bedarf der vorherigen schriftlichen Zustimmung von Eviden.  
Wissensdatenbank-Zugriff | Vollständiger Zugriff auf Wissensdatenbank-Artikel, FAQs und Online-Dokumentation  
Anwendungsstart/-stopp ohne SafeKit | Ja – Stoppen Sie SafeKit und verwenden Sie ein Wrapper-Skript zum Starten oder Stoppen der Anwendung. Das Wrapper-Skript ruft die Start-/Stopp-Skripte der Anwendung auf und konfiguriert oder entfernt bei Bedarf die virtuelle IP-Adresse. 
Supportportal | <https://customercare.evidian.com>  
  
### Kostenlose Ressourcen (kein Vertrag erforderlich) {#free-resources-no-contract-required}

Ressourcendetails |  
---|---  
KI-Support-Assistent | [ SafeKit KI-Chat ](</de/resources/safekit-support/#ai-support>) auf safekit.eviden.com und über jeden LLM mit safekit.eviden.com/ llms.txt  
Online-Schulung & Zertifizierung | Kostenlos, im eigenen Tempo, 12 Videos (ca. 3 Std. 40 Min.), Zertifikat nach Abschluss  
Dokumentation | Vollständiges Benutzerhandbuch, Versionshinweise, Wissensdatenbank, Schnellstartanleitungen  
  
## Vergleich mit Alternativen {#comparison-vs-alternatives}

Criterion | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source *  
---|---|---|---|---  
Gemeinsamer Speicher (SAN/vSAN) erforderlich | Nein | Ja | Ja | Nein  
Windows Unterstützung | Ja | Ja | Ja | NEIN  
Linux unterstützt | Ja | Nein | Ja | Ja  
Edge-/Branch-Bereitstellung | Ausgezeichnet | Komplex | Komplex | Komplex  
OEM-einbaubar | Ja | NEIN | NEIN | NEIN  
Kosten | Dauerhaft pro Knoten | Windows Server + SAN | vSphere Enterprise + SAN | Integrationsdienste auf hohem Niveau  
Einrichtungskomplexität | Plug-and-Play | Hoch (AD, SAN, Witness) | Hoch (vCenter, gemeinsam genutzter Speicher) | Hoch (fragmentierte Produkte)  
Wartbarkeit | Einzelprodukt, Webkonsole | Hoch (AD- und SAN-Kenntnisse erforderlich) | Hoch (vCenter-Abhängigkeit) | Hoch (separate Produkte zu warten)  
  
Für * sind sechs separate Open-Source Linux Projekte – Corosync, Pacemaker, DRBD, Keepalived, STONITH und HAProxy – erforderlich, um den Funktionsumfang von SafeKit allein auf Linux nachzubilden. SafeKit bietet dieselben Funktionen in einem einzigen Produkt, sowohl auf Windows als auch Linux .

## Schnellreferenzlinks {#quick-reference-links}

Ressource | URL  
---|---  
Produkt-Startseite | [https://safekit.eviden.com/de/](/de/)  
Technischer Überblick (DOCX mit Text und Diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](/wp-content/uploads/documents/safekit-technical-overview-en.docx)  
Kostenlose Testversion | [https://safekit.eviden.com/resources/safekit-free-trial/](/resources/safekit-free-trial/)  
Angebot anfordern | [https://safekit.eviden.com/safekit-pricing/](/safekit-pricing/)  
Supportportal | <https://customercare.evidian.com>  
Kostenloser KI-Support | [https://safekit.eviden.com/resources/safekit-support/](/resources/safekit-support/)  
Kostenlose Schulung & Zertifizierung | [https://safekit.eviden.com/resources/safekit-on-line-training/](/resources/safekit-on-line-training/)  
Kontaktieren Sie uns | [https://safekit.eviden.com/contact-us-for-safekit/](/contact-us-for-safekit/)  

{{%  insert-safekit-4-buttons-de  %}}