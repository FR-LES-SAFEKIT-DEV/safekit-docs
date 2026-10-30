---
title: "SafeKit Technische Referenz für RFI- und RFP-Dokumente"
canonical: "https://safekit.eviden.com/de/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Hier finden Sie technische Informationen zu SafeKit , um Informationsanfragen (RFI) und Angebotsanfragen (RFP) vorzubereiten. Erfahren Sie mehr über unterstützte Systeme, Architekturen, Wiederherstellungszeiten, Sicherheit, Lizenzierung und Support."
category: "resources"
lang: "de"
topics: "Überblick, Inhaltsverzeichnis, Produktinformationen, Unterstützte Betriebssysteme und Plattformen, SafeKit High Availability Limitations, Vorkonfigurierte Anwendungsmodule, Architektur und Bereitstellung, Datenverlust- und Wiederherstellungszeiten (RPO und RTO), Remote Standorte und verteilte Bereitstellungen, Überwachung, Verwaltung und Warnmeldungen, Sicherheit und Compliance, Lizenzierung, Unterstützung und Wartung, Vergleich mit anderen Lösungen, Nützliche Links"
---

# SafeKit Technische Referenz für RFI- und RFP-Dokumente {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Überblick {#overview}

Diese Seite dient der Vorbereitung einer Informationsanfrage (RFI) oder einer Angebotsanfrage (RFP). Sie beantwortet häufig gestellte technische Fragen zur Hochverfügbarkeitssoftware SafeKit . Die Informationen unterstützen Beschaffungsteams und Lösungsarchitekten bei der Definition ihrer Anforderungen.

## Inhaltsverzeichnis {#table-of-contents}

  1. [Produktinformationen](#product-identity)
  2. [Unterstützte Betriebssysteme und Plattformen](#supported-operating-systems-platforms)
  3. [SafeKit High Availability Limitations](#safekit-ha-limitations)
  4. [Vorkonfigurierte Anwendungsmodule](#pre-built-application-modules)
  5. [Architektur und Bereitstellung](#architecture-deployment-model)
  6. [Datenverlust- und Wiederherstellungszeiten (RPO und RTO)](#rpo-rto-capabilities)
  7. [Remote Standorte und verteilte Bereitstellungen](#edge-distributed-deployment-suitability)
  8. [Überwachung, Verwaltung und Warnmeldungen](#monitoring-management-alerting)
  9. [Sicherheit und Compliance](#security-compliance)
  10. [Lizenzierung](#licensing-model)
  11. [Unterstützung und Wartung](#support-maintenance-slas)
  12. [Vergleich mit anderen Lösungen](#comparison-vs-alternatives)
  13. [Nützliche Links](#quick-reference-links)


## Produktinformationen {#product-identity}

Feld | Antwort  
---|---  
Produktname | SafeKit  
Verkäufer | Eviden, Teil der Atos-Gruppe. Früher bekannt als Evidian.  
Softwareentwicklung | Entwickelt in Frankreich.
Produktkategorie | Software für Anwendungsclustering, Hochverfügbarkeit und Notfallwiederherstellung  
Aktuelle Version | SafeKit 8.2  
Webseite | [https://safekit.eviden.com/de/](</de/>)  
Erste Veröffentlichung | 2000. Seit über 20 Jahren in der Produktion im Einsatz.  
  
## Unterstützte Betriebssysteme und Plattformen {#supported-operating-systems-platforms}

Windows-Betriebssysteme | Linux-Betriebssysteme | Infrastruktur und Virtualisierung | Cloud-Plattformen  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Jeder Edge-Server beliebiger Marke<br> • VMware<br> • Microsoft Hyper-V [1]<br> • Linux KVM [1]<br> • Jeder Hypervisor<br> • Docker-Container<br> • Podman-Container  |  • Amazon Web Services (AWS) [2]<br> • Microsoft Azure [2]<br> • Google Cloud Platform (GCP) [2]<br> • Jede IaaS-Cloud mit Standard-VM-Instanzen   
  
**[1]** SafeKit bietet hohe Verfügbarkeit für einzelne Anwendungen oder ganze virtuelle Maschinen.

**[2]** Konfigurieren Sie in der Cloud virtuelle IP-Adressen auf dem Cloud Load Balancer.

{{%  insert-safekit-usage-de  %}}

## Vorkonfigurierte Anwendungsmodule {#pre-built-application-modules}

SafeKit enthält sofort einsatzbereite `.safe` Module. Es gibt zwei Möglichkeiten, Anwendungen zu schützen. **Die Hochverfügbarkeit von Anwendungen** schützt eine Anwendung direkt mit einem mirror oder <span class="notranslate farm-term" translate="no">farm</span> . **Die Hochverfügbarkeit virtueller Maschinen** schützt die gesamte virtuelle Maschine mit einem hyperv.safe oder kvm.safe -Modul.

Vergleichskriterium | Hochverfügbarkeit der Anwendung | Hochverfügbarkeit virtueller Maschinen  
---|---|---  
Konfiguration | Sie müssen wissen, welche Anwendungsdienste neu gestartet und welche Ordner repliziert werden sollen. Außerdem müssen Sie die für das Failover verwendete virtuelle IP-Adresse konfigurieren. | Sie müssen lediglich den Speicherort der Dateien der virtuellen Maschine angeben. Sie müssen nicht wissen, wie die Anwendungen innerhalb der virtuellen Maschine funktionieren. Dieser Ansatz schützt sowohl die Anwendungen als auch das Betriebssystem.  
Empfohlene Verwendung | Integrieren Sie Hochverfügbarkeit direkt in eine Softwarelösung, ohne von spezifischer Hardware oder einem bestimmten Hypervisor abhängig zu sein. | Mehrere Anwendungen auf mehreren virtuellen Maschinen mit einer einzigen Hochverfügbarkeitsrichtlinie verwalten.  
  
Die folgende Tabelle listet alle verfügbaren `.safe` Module auf:

Hochverfügbarkeit der Anwendung | Hochverfügbarkeit virtueller Maschinen  
---|---  
Neue Windows-App – mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
Neue Linux-App – mirror.safe | KVM VM — kvm.safe (Linux)  
Windows-Lastverteilung – farm.safe | Docker-Container — mirror.safe (Linux)  
Linux-Lastverteilung – farm.safe | Podman-Container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s – k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS – hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Siemens Überwachungssuite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT – hyperv.safe (Windows)  
Nedap AEOS – nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generisch) — mirror.safe / farm.safe |   
  
## Architektur und Bereitstellung {#architecture-deployment-model}

### Zwei Cluster-Module: mirror.safe und farm.safe {#two-cluster-modules}

Modul | So funktioniert es | Typische Anwendungen  
---|---|---  
mirror.safe | Ein Server ist aktiv, der andere befindet sich im Standby-Modus. Dateien werden synchron auf Byte-Ebene repliziert. Failover erfolgt automatisch. | Datenbanken, Anwendungen, die Zustände speichern, und Dienste, die jeweils nur auf einem Server ausgeführt werden.  
farm.safe | Mehrere Server sind gleichzeitig aktiv. SafeKit verteilt den Netzwerkverkehr zwischen ihnen und übernimmt den Failover automatisch. | Webserver, zustandslose Microservices, API-Gateways und Dienste, die gleichzeitig auf mehreren Servern laufen  
  
### Clusterinfrastruktur {#cluster-infrastructure-architecture}

Erfordernis | SafeKit -Funktionen  
---|---  
Gemeinsamer Speicherplatz erforderlich? | Nein. SafeKit verwendet lokale Festplatten. Es benötigt kein SAN oder gemeinsam genutzten Speicher.  
Active Directory erforderlich? | Nein. SafeKit benötigt weder eine Windows-Domäne noch Active Directory. Es unterstützt auch Arbeitsgruppen.  
Clustergröße | 2 Knoten ( mirror ) oder 2+ Knoten ( <span class="notranslate farm-term" translate="no">farm</span> )  
Virtuelle IP-Adresse (VIP) | Für die Hochverfügbarkeit von Anwendungen wird die virtuelle IP-Adresse automatisch per Gratuitous ARP an den aktiven Knoten übertragen. Für die Hochverfügbarkeit virtueller Maschinen wird der Datenverkehr zur IP-Adresse innerhalb der virtuellen Maschine automatisch umgeleitet. Eine separate virtuelle IP-Adresse ist nicht erforderlich. Die Knoten müssen sich ein LAN oder ein standortübergreifendes VLAN teilen.  
Architektur mit drei Knoten | SafeKit betreibt einen Zwei-Knoten mirror -Cluster in einem LAN oder einem VLAN, das sich über mehrere Standorte erstreckt. Es bietet synchrone Replikation ohne Datenverlust (RPO=0) und automatisches Failover. Ein separates Backup-Produkt repliziert Daten asynchron über ein WAN auf einen dritten Knoten. Dieses Backup ermöglicht die Wiederherstellung zu einem früheren Zeitpunkt und bietet Schutz vor Ransomware.  
Zweck der hohen Verfügbarkeit | SafeKit repliziert Daten synchron auf beide Knoten. Dies ermöglicht ein automatisches Failover ohne Datenverlust nach einem Hardware- oder Softwareausfall. Logische Fehler, Datenbeschädigungen und versehentliche Löschungen werden jedoch ebenfalls sofort auf den Standby-Knoten kopiert.  
Zweck von Datensicherungen | Datensicherungen ermöglichen die Wiederherstellung von Daten aus einem früheren Zeitpunkt. Ein separates Backup-Produkt, nicht SafeKit , bietet diesen Schutz durch asynchrone Replikation. Datensicherungen helfen bei der Wiederherstellung nach Ransomware-Angriffen und bei menschlichen Fehlern. Diese Wiederherstellung ist kein automatisches Failover. Beim Wiederherstellen einer älteren Datensicherung gehen alle Änderungen verloren, die nach dieser Sicherung vorgenommen wurden.  
Maximale Anzahl gleichzeitig laufender Module | Ein Cluster mit zwei Knoten kann bis zu 32 Module gleichzeitig verwalten. Zum Schutz virtueller Maschinen repliziert und startet jedes Modul eine andere virtuelle Maschine neu. Jedes Modul kann auf jedem Knoten als primärer Knoten fungieren, sodass sich beide Server die Arbeitslast teilen können. Das Gesamtdatenvolumen beeinflusst die Resynchronisierungszeit nach einem Failover oder einem Knotenneustart.  
Benötigte Software auf jedem Knoten? | Ja. Auf jedem Knoten wird eine schlanke Software installiert.  
Unterstützte Anwendungen | SafeKit kann jeden Windows-Dienst oder Linux-Daemon schützen. Vorkonfigurierte Module sind für mehr als 30 Anwendungen verfügbar.  
  
### Replikation und Datenschutz {#replication-data-protection}

Erfordernis | SafeKit -Funktionen  
---|---  
Replikationsmethode | SafeKit repliziert Dateiänderungen auf Byte-Ebene. Es repliziert keine Festplattenblöcke.  
Replikationsmodus | Synchrone Replikation ohne Datenverlust  
Netzwerkanforderungen | Für die synchrone Replikation wird eine Roundtrip-Latenz von unter 5 ms zwischen den Knoten empfohlen.  
Empfohlenes Datenvolumen | Ein paar Terabyte, um die Resynchronisierungszeit überschaubar zu halten.  
Empfohlene Dateianzahl | Weniger als 1.000.000 Dateien, um die Resynchronisierungszeit überschaubar zu halten.  
Zeit, 1 TB neu zu synchronisieren | Etwa 3 Stunden über ein 1-Gbit/s-Netzwerk oder 1 Stunde über ein 10-Gbit/s-Netzwerk  
Selektive Replikation | Sie können auswählen, welche Verzeichnisse und Dateien repliziert werden sollen.  
Verschlüsselung während der Übertragung | Der Replikationsverkehr wird mit TLS/SSL verschlüsselt.  
  
## Datenverlust- und Wiederherstellungszeiten (RPO und RTO) {#rpo-rto-capabilities}

### RPO und RTO für jeden Clustertyp {#rto-rpo-cluster-type}

Metrisch | Mirror ( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO (Recovery Point Objective) | Kein Datenverlust. Ein Schreibvorgang wird erst dann bestätigt, wenn beide Knoten ihn bestätigt haben. | Gilt nicht für zustandslose Dienste. Ein separater mirror verwaltet die Daten.  
RTO (Recovery Time Objective) | Ungefähr eine Minute. Dies beinhaltet das <span class="notranslate farm-term" translate="no">heartbeat</span> Timeout (standardmäßig 30 Sekunden) und die Zeit für den Neustart der Anwendung. | Ein paar Sekunden. Der Datenverkehr wird auf die verbleibenden aktiven Knoten umverteilt.  
Replikationstyp | Synchrone, Echtzeit-Dateireplikation auf Byte-Ebene | Nicht zutreffend  
Failover-Auslöser | Automatisch, wenn <span class="notranslate farm-term" translate="no">heartbeats</span> aufhören, ein Prozess abstürzt oder ein Prüfprogramm einen Fehler erkennt | Automatisch, wenn <span class="notranslate farm-term" translate="no">heartbeats</span> aufhören, ein Prozess abstürzt oder ein Prüfprogramm einen Fehler erkennt  
Manuelles Eingreifen erforderlich? | Nein. Failover und Failback erfolgen automatisch. | Nein. Failover und Failback erfolgen automatisch.  
  
### Wiederherstellungszeit für Anwendungen, die durch einen mirror geschützt sind {#rto-breakdown-mirror-application-level-ha}

Fehlertyp | Wie die Wiederherstellungszeit berechnet wird  
---|---  
Hardwarefehler | <span class="notranslate farm-term" translate="no">Heartbeat</span> Timeout (standardmäßig 30 Sekunden), gefolgt von einem Neustart der Anwendung  
Software- oder Prozessabsturz | Die Zeit zum Beenden der Anwendung, gefolgt vom Neustart der Anwendung.  
Betriebssystemabsturz | <span class="notranslate farm-term" translate="no">Heartbeat</span> Timeout. Das Betriebssystem läuft bereits auf dem Standby-Server, daher ist kein Neustart erforderlich.  
  
### Wiederherstellungszeit für virtuelle Maschinen, die durch einen mirror geschützt sind {#rto-breakdown-mirror-vm-level-ha}

Fehlertyp | Wie die Wiederherstellungszeit berechnet wird  
---|---  
Jegliches Versagen | Es ist an der Zeit, den Fehler zu erkennen, das Betriebssystem der virtuellen Maschine neu zu starten und die Anwendung neu zu starten. Dies dauert in der Regel einige Minuten.  
  
## Remote Standorte und verteilte Bereitstellungen {#edge-distributed-deployment-suitability}

SafeKit ist für Außenstellen, Zweigstellen und Organisationen mit vielen Standorten konzipiert.

Anforderung an einem entfernten Standort | SafeKit -Funktionen  
---|---  
Kein eigenes IT-Personal vor Ort | Das Failover erfolgt automatisch und erfordert keine manuellen Maßnahmen.  
Kein SAN oder NAS | SafeKit nutzt lokale Festplatten und benötigt keinen gemeinsam genutzten Speicher.  
Fernverwaltung | Verwalten Sie den Cluster über eine Webkonsole.  
Begrenzte Hardware | Zwei Standardserver oder virtuelle Maschinen genügen. Es wird keine spezielle Hardware benötigt.  
Firewalls und Netzwerkadressübersetzung (NAT) | Die Ports können konfiguriert werden. Die Webkonsole verwendet HTTPS.  
Notfallwiederherstellung zwischen Standorten | Ein mirror kann zwei Standorte über ein zwischen ihnen erweitertes VLAN verbinden.  
Integration durch Softwarehersteller | Softwarehersteller können SafeKit in ihre Produkte integrieren. Die Installation kann ohne Benutzerinteraktion erfolgen und mithilfe von Skripten automatisiert werden.  
Hunderte von Clustern an vielen Standorten | SafeKit ist für Organisationen mit vielen Niederlassungen konzipiert.  
  
Die folgenden Standorte benötigen eine hohe Verfügbarkeit, auch wenn sie kein Rechenzentrum besitzen:

Industrie | Typischer Standort | Kritische Anwendungen  
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
  
## Überwachung, Verwaltung und Warnmeldungen {#monitoring-management-alerting}

Fähigkeit | Details  
---|---  
Webkonsole | Konfigurieren, überwachen und verwalten Sie Clusterknoten über eine Webanwendung oder eine Progressive Web App (PWA).  
Mobile Benachrichtigungen | Erhalten Sie Browserbenachrichtigungen, wenn sich der Status eines Moduls ändert.  
Zeitleiste | Modulstatusänderungen und Ereignisse in chronologischer Reihenfolge anzeigen.  
E-Mail-Benachrichtigungen | Ein integrierter E-Mail-Agent versendet Benachrichtigungen.  
Befehlszeilenschnittstelle | Verwenden Sie die Befehlszeilenschnittstelle, um Skripte zu schreiben und Aufgaben zu automatisieren.  
Protokollverwaltung | Jedes Modul und jedes Skript verfügt über eigene Protokolldateien. Modul- <span class="notranslate farm-term" translate="no">snapshots</span> helfen dem Support-Team bei der Fehlersuche.  
Integration mit Überwachungstools | SafeKit protokolliert wichtige Clusterereignisse im Windows-Ereignisprotokoll oder im Linux-Syslog. Überwachungstools können diese Ereignisse erfassen und anhand von Standardregeln Warnmeldungen auslösen. Dies funktioniert ohne zusätzliche Anpassungen mit Nagios, Zabbix, Splunk und SIEM-Systemen.  
  
## Sicherheit und Compliance {#security-compliance}

Besonderheit | Details  
---|---  
HTTPS | TLS-Zertifikate schützen den Zugriff auf die Webkonsole.  
Benutzerauthentifizierung | Lokale Konten, LDAP, Zertifikate (PKI) und OpenID Connect  
Benutzerrollen | Konfigurieren Sie Zugriffsrichtlinien für Administration, Kontrolle und Überwachung.  
Verschlüsselung | Der TCP-Datenverkehr nutzt TLS/SSL für die Replikation, die Webkonsole und verteilte Befehle. Der UDP-Datenverkehr verwendet AES-128-CBC-Verschlüsselung mit SHA256 für <span class="notranslate farm-term" translate="no">heartbeats</span> und das interne Safeadmin-Protokoll. SafeKit verwendet die OpenSSL-Bibliothek für die Verschlüsselung und Apache für den Webdienst.  
Antivirus | Die Dokumentation listet die Pfade auf, die von Antivirenscans ausgeschlossen werden sollen.  
Souveränität | SafeKit wurde in Frankreich von Eviden, einem Unternehmen der Atos-Gruppe, entwickelt. Es schützt Windows- und Linux-Anwendungen und gewährleistet gleichzeitig, dass Ihre Daten und Server in Ihren Räumlichkeiten verbleiben. SafeKit kann dazu beitragen, die Anforderungen der europäischen NIS2-Richtlinie für Geschäftskontinuität und Notfallwiederherstellung zu erfüllen.
  
## Lizenzierung {#licensing-model}

Aspekt | Details  
---|---  
Lizenztyp | Eine unbefristete Lizenz wird einmalig erworben und ist an einen Hostnamen gebunden.  
Lizenzumfang | Eine Lizenz pro Server (Knoten)  
Lizenzaktivierung | Lizenzschlüssel können auch ohne Internetzugang aktiviert werden.  
Kostenlose Testversion | Eine kostenlose Testversion beinhaltet alle Funktionen.  
Kostenlose einmonatige Lizenz | Verfügbar für die Erprobung eines Machbarkeitsnachweises  
  
## Unterstützung und Wartung {#support-maintenance-slas}

### Standardmäßiger Support und Wartung im Rahmen eines aktiven Wartungsvertrags {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
Zugriff auf das Supportportal | Das Webportal steht rund um die Uhr, an jedem Tag des Jahres, für bis zu vier namentlich genannte technische Ansprechpartner zur Verfügung.  
Live-Supportzeiten | Montag bis Freitag, von 9:00 bis 17:00 Uhr im Europäischen Supportzentrum  
Bestätigung des Vorfalls | Innerhalb von vier Werktagen nach Eingang des Support-Centers  
Aktualisierungen und Upgrades | Alle Servicepakete, Updates und Upgrades sind ohne Aufpreis enthalten.  
Ersatz für Lizenzschlüssel | Bei einem aktiven Supportvertrag kann ein Lizenzschlüssel bei einer Hostnamenänderung neu zugewiesen werden. Die Übertragung ist auf den Austausch eines Servers innerhalb desselben Projekts beschränkt. Eine vorherige schriftliche Genehmigung von Eviden ist erforderlich.  
Zugriff auf die Wissensdatenbank | Vollständiger Zugriff auf Wissensdatenbankartikel, häufig gestellte Fragen und Online-Dokumentation  
Notfallverfahren | SafeKit stellt ein Wrapper-Skript bereit, um eine Anwendung zu starten oder zu stoppen, ohne die Hochverfügbarkeitsfunktionen von SafeKit zu nutzen. Dieses Skript ruft die Start- und Stopp-Skripte der Anwendung auf. Bei Bedarf fügt es außerdem die virtuelle IP-Adresse hinzu oder entfernt sie.  
Supportportal | <https://customercare.evidian.com>  
  
### Kostenlose Ressourcen ohne Supportvertrag {#free-resources-no-contract-required}

Ressource | Details  
---|---  
KI-Unterstützungsassistent | Nutzen Sie [SafeKit AI-Chat](</de/resources/safekit-support/#ai-support>) auf safekit.eviden.com.   
Online-Schulung und Zertifizierung | [Lernen Sie in Ihrem eigenen Tempo](</de/resources/safekit-on-line-training/>) mit kostenlosen Videos von insgesamt ca. 4 Stunden Länge. Nach Abschluss der Schulung erhalten Sie ein Zertifikat.  
Dokumentation | Benutzerhandbuch, Versionshinweise, Wissensdatenbank und Schnellinstallationsanleitungen [finden Sie hier.](</de/resources/safekit-free-trial/>)  
  
## Vergleich mit anderen Lösungen {#comparison-vs-alternatives}

Kriterium | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source [1]  
---|---|---|---|---  
Gemeinsamer Speicher (SAN/vSAN) erforderlich | NEIN | Ja | Ja | NEIN  
Windows-Unterstützung | Ja | Ja | Ja | NEIN  
Linux-Unterstützung | Ja | NEIN | Ja | Ja  
Einsatz an entfernten Standorten | Exzellent | Komplex | Komplex | Komplex  
OEM | Ja | NEIN | NEIN | NEIN  
Kosten | Dauerlizenz pro Knoten | Windows Server und SAN | vSphere Enterprise und SAN | Erweiterte Integrationsdienste  
Komplexität der Einrichtung | Sofort konfigurierbar und einsatzbereit | Hoch: Active Directory-, SAN- und Witness-Konfiguration | Hoch: vCenter- und gemeinsam genutzte Speicherkonfiguration | Hoch: mehrere separate Produkte zur Konfiguration  
Verwaltung | Ein Produkt, das über eine Webkonsole verwaltet wird. | Hoch: Expertise in Active Directory und SAN | Hoch: Abhängigkeit von vCenter | Hoch: mehrere separate Produkte zur Aufrechterhaltung  
  
**[1]** Unter Linux sind sechs separate Open-Source-Projekte erforderlich, um denselben Funktionsumfang bereitzustellen: Corosync, Pacemaker, DRBD, Keepalived, STONITH und HAProxy. SafeKit bietet diese Funktionen in einem einzigen Produkt für Windows und Linux.

## Nützliche Links {#quick-reference-links}

Ressource | URL  
---|---  
Produkt-Startseite | [https://safekit.eviden.com/de/](</de/>)  
Technischer Überblick (Word-Dokument mit Text und Diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Kostenlose Testversion | [https://safekit.eviden.com/de/resources/safekit-free-trial/](</de/resources/safekit-free-trial/>)  
Angebot anfordern | [https://safekit.eviden.com/de/safekit-pricing/](</de/safekit-pricing/>)  
Supportportal | <https://customercare.evidian.com>  
Kostenloser KI-Support | [https://safekit.eviden.com/de/resources/safekit-support/](</de/resources/safekit-support/>)  
Kostenlose Schulung und Zertifizierung | [https://safekit.eviden.com/de/resources/safekit-on-line-training/](</de/resources/safekit-on-line-training/>)  
Kontaktieren Sie uns | [https://safekit.eviden.com/de/contact-us-for-safekit/](</de/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-de  %}}
