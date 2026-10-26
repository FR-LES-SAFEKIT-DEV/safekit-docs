---
title: "Technische Referenz zur Hochverfügbarkeit für die RFI- und RFP-Vorbereitung"
canonical: "https://safekit.eviden.com/de/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Technische Referenz zur Unterstützung bei der Vorbereitung von RFI- und RFP-Dokumenten für Hochverfügbarkeit und Anwendungsclustering mithilfe von SafeKit-Konzepten und -Architekturen."
category: "resources"
lang: "de"
topics: "Übersicht, Inhaltsverzeichnis, Produktidentität, unterstützte Betriebssysteme und Plattformen, vorgefertigte Anwendungsmodule, Architektur und Bereitstellungsmodell, RPO- und RTO-Fähigkeiten, Eignung für Edge- und verteilte Bereitstellung, Überwachung, Verwaltung und Warnung, Sicherheit und Compliance, Lizenzmodell, Support- und Wartungs-SLAs, Vergleich mit Alternativen, Schnellreferenzlinks"
---

# Technische Referenz zur Hochverfügbarkeit für die RFI- und RFP-Vorbereitung {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Übersicht {#overview}

Diese Seite bietet strukturierte, sachliche Antworten auf häufige RFP/RFI-Fragen zur Hochverfügbarkeitssoftware SafeKit. Es ist als technische Referenz für Beschaffungsteams und Lösungsarchitekten gedacht, die Hochverfügbarkeitsanforderungen entwerfen. 

## Inhaltsverzeichnis {#table-of-contents}

  1. [Produktidentität](#product-identity)
  2. [Unterstützte Betriebssysteme und Plattformen](#supported-operating-systems-platforms)
  3. [Vorgefertigte Anwendungsmodule](#pre-built-application-modules)
  4. [Architektur- und Bereitstellungsmodell](#architecture-deployment-model)
  5. [RPO- und RTO-Funktionen](#rpo-rto-capabilities)
  6. [EEignung für Edge- und verteilte Bereitstellung](#edge-distributed-deployment-suitability)
  7. [Überwachung, Management und Alarmierung](#monitoring-management-alerting)
  8. [Sicherheit und Compliance](#security-compliance)
  9. [Lizenzmodell](#licensing-model)
  10. [Support- und Wartungs-SLAs](#support-maintenance-slas)
  11. [Vergleich mit Alternativen](#comparison-vs-alternatives)
  12. [Quick Reference Links](#quick-reference-links)


## Produktidentität {#product-identity}

Feld | Antwort  
---|---  
Produktname | SafeKit  
Anbieter | Eviden (ein Atos-Unternehmen), ehemals Evidian  
Produktkategorie | Anwendungsclustering / Hochverfügbarkeit / Disaster Recovery-Software  
Aktuelle Version | SafeKit 8.2  
Website | <https://safekit.eviden.com/de/>
Erste Veröffentlichung | 2000 (mehr als 20 Jahre in der Produktion)  
  
## Unterstützte Betriebssysteme und Plattformen {#supported-operating-systems-platforms}

Windows-Betriebssystem | Linux-Betriebssystem | Infrastruktur und Virtualisierung | Cloud-Plattformen  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br> Ubuntu• 24.04 LTS (x86-64)  |  • Jeder Edge-Server jeder Marke<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Jeder Hypervisor<br>• Docker-Container<br>• Podman-Container  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Jede IaaS-Cloud mit Standard-VM-Instanzen   
  
_* SafeKit unterstützt sowohl HA auf Anwendungsebene als auch HA auf VM-Ebene._

_** Virtuelle IPs müssen auf der Cloud-Load-Balancer-Ebene konfiguriert werden._

## Vorgefertigte Anwendungsmodule {#pre-built-application-modules}

SafeKit umfasst gebrauchsfertige, vorkonfigurierte `.safe`-Module. Sie sind in zwei HA-Strategien organisiert: **Anwendungs-HA** (direktes Anwendungsclustering mit Spiegel- oder Farmmodulen) und **Virtualisierungs-HA** (Clustering auf VM-Ebene mit hyperv.safe oder kvm.safe).

 | Anwendung HA | HA auf VM-Ebene ---|---|--- Konfiguration | Es erfordert ein technisches Verständnis der Anwendung selbst: welche Dienste neu gestartet werden müssen, welche spezifischen Anwendungsordner eine Echtzeitreplikation benötigen und die Konfiguration einer virtuellen IP-Adresse für Failover. | Generische Lösung für jede Anwendung/jedes Betriebssystem, das in der VM ausgeführt wird. Es sind keine technischen Kenntnisse der in der VM installierten Anwendung erforderlich. Dies ist die beste Lösung, wenn Sie nicht wissen, wie die Anwendung funktioniert. Sie müssen nur den Speicherort der VM-Dateien definieren. Ideal für | Ideal für die direkte Einbettung von Hochverfügbarkeit in eine Softwarelösung, unabhängig von der zugrunde liegenden Hardware oder dem Hypervisor. | Ideal für die Verwaltung komplexer Umgebungen mit mehreren Anwendungen auf mehreren VMs über eine einzige HA-Richtlinie.  
  
In der folgenden Tabelle sind alle verfügbaren `.safe`-Module aufgeführt:

Anwendungs-HA (Clustering auf Anwendungsebene) | Virtualisierung HA (Clustering auf VM-Ebene)  
---|---  
Neue Windows-App – Mirror.safe | Hyper-V-VM – hyperv.safe (Windows)  
Neue Linux-App – Mirror.safe | KVM VM – kvm.safe (Linux)  
Windows-Lastausgleich – farm.safe | Docker-Container – Mirror.safe (Linux)  
Linux-Lastausgleich – farm.safe | Podman-Container – Mirror.safe (Linux)  
Microsoft SQL Server – sqlserver.safe (Windows) | Kubernetes / K3s – k3s.safe (Linux)  
PostgreSQL – postgresql.safe (Windows & Linux) | Bosch AMS – hyperv.safe (Windows)  
MySQL – mysql.safe (Windows & Linux) | Bosch BIS – hyperv.safe (Windows)  
MariaDB – mysql.safe (Windows & Linux) | Bosch BVMS – hyperv.safe (Windows)  
Oracle – oracle.safe (Windows & Linux) | Hanwha Vision – hyperv.safe (Windows)  
Firebird – firebird.safe (Windows & Linux) | Hanwha Wisenet – hyperv.safe (Windows)  
Apache – apache_farm.safe (Windows und Linux) | Siemens Siveillance Suite – hyperv.safe (Windows)  
IIS – iis_farm.safe (Windows) | Siemens Desigo CC – hyperv.safe (Windows)  
NGINX – farm.safe (Windows & Linux) | Siemens SiPass – hyperv.safe (Windows)  
Milestone XProtect – meilenstein.safe (Windows) | Siemens SIPORT – hyperv.safe (Windows)  
Nedap AEOS – nedap.safe (Windows) | SIMATIC PCS 7 – hyperv.safe (Windows)  
Genetec (SQL Server) – sqlserver.safe (Windows) | SIMATIC WinCC – hyperv.safe (Windows)  
Siemens Siveillance VMS – SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generisch) – Mirror.safe / farm.safe |   
  
## Architektur- und Bereitstellungsmodell {#architecture-deployment-model}

### Zwei Clustermodule: Mirror.safe und Farm.safe {#two-cluster-modules}

Modul | Muster | Anwendungsfall  
---|---|---  
spiegelsicher | Aktiv-Passiv mit synchroner Dateireplikation auf Byte-Ebene + automatischem Failover | Datenbanken, zustandsbehaftete Apps, Dienste, die jeweils nur auf einem Server ausgeführt werden  
farm.safe | Aktiv-Aktiv mit Netzwerklastausgleich + automatischem Failover | Webserver, zustandslose Microservices, API-Gateways, Dienste, die auf mehreren Servern gleichzeitig ausgeführt werden  
  
### Cluster-Infrastruktur und -Architektur {#cluster-infrastructure-architecture}

Anforderung/Spezifikation | SafeKit Fähigkeit/Wert  
---|---  
Gemeinsamer Speicher erforderlich? | Nein – SAN-lose „Shared-Nothing“-Architektur. Verwendet nur lokale Festplatten.  
Voraussetzung für Active Directory (AD)? | Nein – erfordert keine Windows-Domäne oder Active Directory. Arbeitsgruppen werden vollständig unterstützt.  
Clustergröße | 2 Knoten (Spiegel) oder 2+ Knoten (Farm)  
Virtuelle IP (VIP) | Softwaredefinierter VIP, der über Gratuitous ARP (HA auf Anwendungsebene) automatisch zum aktiven Knoten migriert. Bei HA auf VM-Ebene wird die physische IP innerhalb der VM transparent umgeleitet – es ist kein VIP erforderlich. Erfordert ein LAN, VLAN oder Stretched VLAN zwischen Knoten.  
3-Knoten-Hybridarchitektur | SafeKit deckt die HA-Schicht ab: einen 2-Knoten-Spiegelcluster über ein LAN oder Stretched VLAN mit synchroner Replikation (RPO=0) und automatischem Failover. Eine Backup-Lösung eines Drittanbieters vervollständigt die Architektur: ein dritter Remote-Knoten mit asynchroner Replikation über ein WAN für Point-in-Time-Wiederherstellung und Ransomware-Schutz.  
Rolle der Hochverfügbarkeit | SafeKit verwendet synchrone Replikation, um bei Hardware- oder Softwarefehlern ein sofortiges Failover ohne Datenverlust zu gewährleisten. Da jedoch Daten gleichzeitig auf beide Knoten geschrieben werden, werden logische Fehler, Datenverschlechterungen oder versehentliche Löschungen in Echtzeit zuverlässig auf dem Standby-Knoten reproduziert.  
Rolle des Backups | Eine Backup-Lösung (nicht von SafeKit implementiert) ermöglicht eine Point-in-Time-Wiederherstellung über asynchrone Replikation. Es schützt vor Bedrohungen der Datenintegrität (wie Ransomware oder menschliches Versagen), die HA nicht blockieren kann. Automatisches Failover wird nicht unterstützt, da das Zurücksetzen von Daten grundsätzlich zu Datenverlust führt.  
Maximale Anzahl gleichzeitiger Module pro Cluster | 32 – Diese Grenze deckt die maximale Anzahl von SafeKit-Modulen ab, die gleichzeitig in einem 2-Knoten-Cluster verwaltet werden, der typischerweise in HA auf VM-Ebene verwendet wird, wo jedes Modul eine andere VM repliziert und neu startet. Jedes Modul kann unabhängig als primäres Modul auf jedem Knoten ausgeführt werden, wodurch eine Arbeitslastverteilung auf beide Server ermöglicht wird. Hinweis: Das Gesamtdatenvolumen aller VMs wirkt sich direkt auf die Resynchronisierungszeit nach einem Failover oder Knotenneustart aus.  
Agentenbasiert oder agentenlos? | Agentenbasiert – leichte Software, die auf jedem Knoten installiert wird  
Anwendungsunabhängig? | Ja – schützt jeden Windows-Dienst oder Linux-Daemon; Vorgefertigte Module für über 30 Anwendungen  
  
### Replikation und Datenschutz {#replication-data-protection}

Anforderung/Spezifikation | SafeKit Fähigkeit/Wert  
---|---  
Replikationsmethode | Dateireplikation auf Byte-Ebene (keine Festplatte auf Blockebene)  
Replikationsmodus | Synchron (kein Datenverlust)  
Netzwerkanforderung | Für die synchrone Replikation wird eine Round-Trip-Latenz zwischen Knoten < 5 ms empfohlen  
Empfohlenes Datenvolumen | Ein paar Terabyte (Resynchronisierungszeit)  
Empfohlene Dateianzahl | < 1.000.000 Dateien (Resynchronisierungszeit)  
Resynchronisierungsgeschwindigkeit (1 TB) | ~3 Stunden im 1-Gbit/s-Netzwerk; ~1 Stunde im 10-Gbit/s-Netzwerk  
Selektive Replikation | Ja – bestimmte Verzeichnisse/Dateien replizieren  
Verschlüsselung während der Übertragung | Ja – TLS/SSL für Replikationsverkehr  
  
## RPO- und RTO-Fähigkeiten {#rpo-rto-capabilities}

### RPO und RTO nach Clustertyp {#rto-rpo-cluster-type}

Metrisch | Spiegelcluster (mirror.safe) | Farm-Cluster (farm.safe)  
---|---|---  
RPO (Recovery Point Objective) | 0 (kein Datenverlust) – synchrone Replikation; Schreibbestätigung erst nach Bestätigung durch beide Knoten | N/A (zustandslos; Daten werden vom Backend-Spiegel verarbeitet)  
RTO (Recovery Time Objective) | ~1 Minute – Heartbeat-Timeout (Standard 30 s) + Anwendungsneustartzeit | Ein paar Sekunden – der Verkehr wird sofort auf die verbleibenden aktiven Knoten umverteilt  
Replikationstyp | Synchrone Echtzeit-Dateireplikation auf Byte-Ebene | Nicht anwendbar  
Failover-Trigger | Automatisch bei Heartbeat-Verlust, Prozessabsturz oder Checker-Fehler | Automatisch bei Heartbeat-Verlust, Prozessabsturz oder Checker-Fehler  
Manueller Eingriff erforderlich? | Nein – vollautomatisches Failover und Failback | Nein – vollautomatisches Failover und Failback  
  
### RTO-Aufschlüsselung (Spiegelung – HA auf Anwendungsebene) {#rto-breakdown-mirror-application-level-ha}

Fehlertyp | RTO-Berechnung  
---|---  
Hardwarefehler | Heartbeat-Timeout (Standard 30 s) + Anwendungsneustartzeit  
Software-/Prozessabsturz | Anwendungsstoppzeit + Anwendungsneustartzeit  
Absturz auf Betriebssystemebene | Heartbeat-Timeout + Betriebssystem läuft bereits auf der Sekundärseite → keine Neustartstrafe  
  
### RTO-Aufschlüsselung (Mirror – VM-Level HA) {#rto-breakdown-mirror-vm-level-ha}

Fehlertyp | RTO-Berechnung  
---|---  
Jeder Fehler | Fehlererkennung + vollständiger Neustart des Betriebssystems + Neustart der Anwendung (normalerweise mehrere Minuten)  
  
## Eignung für Edge- und verteilte Bereitstellung {#edge-distributed-deployment-suitability}

SafeKit wurde speziell für Edge-, Zweigstellen- und verteilte Unternehmensszenarien entwickelt.

Kantenanforderung | SafeKit Antwort  
---|---  
Kein dediziertes IT-Personal vor Ort | Ja – automatisches Failover, kein manueller Eingriff  
Keine SAN/NAS-Infrastruktur | Ja – SANless, nur lokale Festplatten  
Fernverwaltung | Ja – Webkonsolenverwaltung  
Geringer Hardware-Footprint | Ja – 2 Standardserver oder VMs, keine spezielle Hardware  
Funktioniert hinter Firewalls/NAT | Ja – konfigurierbare Ports, HTTPS-basierte Konsole  
Disaster Recovery für mehrere Standorte | Ja – Spiegelung zwischen zwei geografischen Standorten über gestrecktes VLAN  
OEM-/eingebettete Bereitstellung | Ja – unbeaufsichtigte Installation, skriptfähig, von Softwareherstellern einbettbar  
Hunderte verteilte Cluster | Ja – konzipiert für verteilte Unternehmen mit vielen Niederlassungen  
  
Ideale Edge-Anwendungsfälle: jeder Standort ohne Rechenzentrum – wo Hochverfügbarkeit immer noch wichtig ist:

Vertikal | Typische Edge-Site | Kritische Anwendung  
---|---|---  
Physische Sicherheit und Überwachung | Gebäude, Campus, Flughäfen | VMS – Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebäudemanagement (BMS) | Bürogebäude, Krankenhäuser, Fabriken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische Zugangskontrolle (EACS) | Sichere Einrichtungen und Campus | Siemens SiPass, Nedap, Bosch AMS  
SCADA und industrielle Steuerung | Fabriken, Umspannwerke, Wasserwerke | Jede SCADA-, DCS- oder HMI-Software, die unter Windows oder Linux läuft  
Flugsicherung (ATC) | Flughäfen, Kontrolltürme | ATC-Management und Radarsysteme  
Operations Control Center (OCC) | U-Bahn, Eisenbahn, Verkehrsknotenpunkte | Eisenbahnsignalisierung und Bahnhofsmanagement  
Maritim | Schiffe, Marineschiffe | Navigations-, Fracht- und Bordmanagementsysteme  
Öl und Gas | Offshore-Plattformen, abgelegene Bohrinseln | Prozesskontroll- und Sicherheitssysteme  
Telekommunikation | 5G-Antennenstandorte, MEC-Knoten | Multi-Access-Edge-Computing-Server (MEC).  
Gesundheitswesen | Kliniken, Ferndiagnosezentren | Medizinische Bildgebung, Patientendaten, Ferndiagnose  
Einzelhandel | Geschäfte, Filialen, Lager | Point-of-Sale- und Bestandsverwaltung  
Verteidigung | Vorwärts operierende Stützpunkte, Feldeinheiten | Missionskritische Befehls- und Kommunikationssysteme  
  
## Überwachung, Management und Alarmierung {#monitoring-management-alerting}

Fähigkeit | Details  
---|---  
Webkonsole | Web-App oder Progressive Web-App (PWA); Clusterknoten konfigurieren, überwachen und verwalten  
Mobile Benachrichtigungen | Browser-Push-Benachrichtigungen für Statusänderungen  
Zeitleiste der Staaten | Visuelle Zeitleiste der Modulzustände und -ereignisse  
E-Mail-Benachrichtigungen | Integrierter E-Mail-Agent für Benachrichtigungen  
CLI-Verwaltung | Vollständige Befehlszeilenschnittstelle für Skripterstellung und Automatisierung  
Protokollverwaltung | Protokolldateien pro Modul und pro Skript; Debug-Snapshots zur Unterstützung  
Integration der Überwachung von Drittanbietern | SafeKit protokolliert automatisch alle wichtigen Cluster-Ereignisse im Windows-Ereignisprotokoll oder Linux-Syslog, sodass jede Überwachungsplattform diese Ereignisse erfassen und Alarme mit Standardalarmierungsregeln auslösen kann – einschließlich Nagios-, Zabbix-, Splunk- und SIEM-Lösungen – ohne dass eine benutzerdefinierte Entwicklung erforderlich ist.  
  
## Sicherheit und Compliance {#security-compliance}

Funktion | Details  
---|---  
HTTPS-Konsolenzugriff | Ja – TLS-Zertifikate für die Webkonsole  
Benutzerauthentifizierung | Lokale Konten, LDAP, PKI/zertifikatbasiert, OpenID Connect  
Benutzerrollen | Konfigurierbare Zugriffsrichtlinien für Administrator-, Kontroll- und Überwachungsrollen  
Verschlüsselung | TLS/SSL für TCP (Replikation, Webkonsole, verteilte Befehle) und symmetrische AES-128-CBC + SHA256-Verschlüsselung für UDP (Heartbeat, internes Safeadmin-Protokoll); Verschlüsselung basierend auf der OpenSSL-Bibliothek. Webdienst basierend auf Apache.  
Antiviren-Kompatibilität | Dokumentierte Ausschlusspfade  
Souveränität | Als europäisches Unternehmen bietet Eviden (Atos Group) mit SafeKit ein einzigartiges, souveränes Business-Continuity- und Disaster-Recovery-Produkt für Windows und Linux an – die Daten- und Failover-Infrastruktur bleibt vollständig vor Ort, ohne Abhängigkeit von US-Anbietern, im Einklang mit den NIS2-Business-Continuity- und Disaster-Recovery-Anforderungen.  
  
## Lizenzmodell {#licensing-model}

Aspekt | Details  
---|---  
Lizenztyp | Unbefristete Lizenz (einmaliger Kauf) basierend auf Hostnamen  
Lizenzumfang | Pro Server (Knoten)  
Lizenzaktivierung | Offline-Aktivierung unterstützt; Für die Aktivierung von Lizenzschlüsseln ist kein Internetzugang erforderlich.  
Kostenlose Testversion | Ja – eine kostenlose Testversion mit vollem Funktionsumfang ist verfügbar  
Kostenlose einmonatige Lizenz | Verfügbar für Proof-of-Concept  
  
## Support- und Wartungs-SLAs {#support-maintenance-slas}

### Standard-Support und Wartung (im aktiven Wartungsvertrag enthalten) {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
Zugriff auf das Support-Portal | 24/7/365 Webportal für bis zu 4 benannte technische Ansprechpartner  
Live-Support-Stunden | 9:00 – 17:00 Uhr Europäisches Supportzentrum, Montag–Freitag  
Bestätigung eines Vorfalls | Innerhalb von 4 Support-Center-Arbeitsstunden  
Updates und Upgrades | Alle Service Packs, Updates und Upgrades sind ohne zusätzliche Kosten enthalten  
Austausch des Lizenzschlüssels | Ein Lizenzschlüssel kann bei Änderung des Hostnamens im Rahmen eines aktiven Supportvertrags neu zugewiesen werden. Die Lizenzübertragung ist auf den Serveraustausch innerhalb desselben Projekts beschränkt, vorbehaltlich der vorherigen schriftlichen Zustimmung von Eviden.  
Zugriff auf die Wissensdatenbank | Voller Zugriff auf KB-Artikel, FAQ und Online-Dokumentation  
Anwendungsstart/-stopp ohne SafeKit | Ja – Stoppen Sie SafeKit und verwenden Sie ein Wrapper-Skript, um die Anwendung zu starten oder zu stoppen. Das Wrapper-Skript ruft die Start-/Stopp-Skripte der Anwendung auf und konfiguriert oder entfernt bei Bedarf die virtuelle IP-Adresse. 
Support-Portal | <https://customercare.evidian.com>  
  
### Kostenlose Ressourcen (kein Vertrag erforderlich) {#free-resources-no-contract-required}

Ressource | Details  
---|---  
KI-Unterstützungsassistent | [SafeKit KI-Chat](</de/resources/safekit-support/#ai-support>) auf safekit.eviden.com und über jedes LLM unter Verwendung von safekit.eviden.com/llms.txt
Online-Schulung und Zertifizierung | Kostenlos, im Selbststudium, 12 Videos (~3 Std. 40 Min.), Zertifikat nach Abschluss  
Dokumentation | Vollständiges Benutzerhandbuch, Versionshinweise, Wissensdatenbank, Schnellstartanleitungen  
  
## Vergleich vs. Alternativen {#comparison-vs-alternatives}

Kriterium | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source*  
---|---|---|---|---  
Gemeinsam genutzter Speicher (SAN/vSAN) erforderlich | Nein | Ja | Ja | Nein  
Windows-Unterstützung | Ja | Ja | Ja | Nein  
Linux-Unterstützung | Ja | Nein | Ja | Ja  
Edge-/Branch-Bereitstellung | Ausgezeichnet | Komplex | Komplex | Komplex  
OEM-integrierbar | Ja | Nein | Nein | Nein  
Kosten | Unbefristet pro Knoten | Windows Server + SAN | vSphere Enterprise + SAN | Integrationsdienstleistungen auf hohem Niveau  
Komplexität der Einrichtung | Plug-and-Play | Hoch (AD, SAN, Zeuge) | Hoch (vCenter, gemeinsam genutzter Speicher) | Hoch (fragmentierte Produkte)  
Wartbarkeit | Einzelprodukt, Webkonsole | Hoch (AD-, SAN-Kenntnisse erforderlich) | Hoch (vCenter-Abhängigkeit) | Hoch (separate Produkte zur Wartung)  
  
_* Unter Linux sind 6 separate Open-Source-Projekte – Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy – erforderlich, um den Funktionsumfang von SafeKit nur unter Linux zu replizieren. SafeKit bietet die gleichen Funktionen in einem einzigen Produkt, sowohl unter Windows als auch unter Linux._

## Schnellreferenz-Links {#quick-reference-links}

Ressource | URL  
---|---  
Produkt-Homepage | <https://safekit.eviden.com/de/>
Technische Übersicht (DOCX mit Text und Diagrammen) | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Kostenlose Testversion | [https://safekit.eviden.com/de/resources/safekit-free-trial/](</de/resources/safekit-free-trial/>)  
Holen Sie sich ein Angebot | [https://safekit.eviden.com/de/safekit-pricing/](</de/safekit-pricing/>)  
Support-Portal | <https://customercare.evidian.com>  
Kostenlose KI-Unterstützung | [https://safekit.eviden.com/de/resources/safekit-support/](</de/resources/safekit-support/>)  
Kostenlose Schulung und Zertifizierung | 🎓 [https://safekit.eviden.com/de/resources/safekit-on-line-training/](</de/resources/safekit-on-line-training/>)  
Kontaktieren Sie uns | [https://safekit.eviden.com/de/contact-us-for-safekit/](</de/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-de  %}}