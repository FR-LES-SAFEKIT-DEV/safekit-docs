---
title: "SafeKit Technische Referenz für RFI und RFP-Dokumente"
canonical: "https://safekit.eviden.com/de/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Finden Sie technische Informationen über SafeKit, um Informationsanfragen (RFI) und Angebotsanfragen (RFP) vorzubereiten. Erfahren Sie mehr über unterstützte Systeme, Architekturen, Wiederherstellungszeiten, Sicherheit, Lizenzierung und Support."
category: "resources"
lang: "de"
topics: "Übersicht, Inhaltsverzeichnis, Produktinformationen, Unterstützte Betriebssysteme und Plattformen, Einschränkungen SafeKit Hochverfügbarkeit, Vorkonfigurierte Anwendungsmodule, Architektur und Bereitstellung, Datenverlust und Wiederherstellungszeiten (RPO und RTO), Remote-Standorte und verteilte Bereitstellungen, Überwachung und Warnmeldungen, Sicherheit und Compliance, Lizenzierung, Support und Wartung, Vergleich mit anderen Lösungen, Nützliche Links"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 47 expressions"
---

# Technische Referenz SafeKit für RFI und RFP-Dokumente {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Übersicht {#overview}

Verwenden Sie diese Seite, um eine Informationsanfrage (RFI) oder eine Ausschreibung (RFP) vorzubereiten. Sie beantwortet häufig gestellte technische Fragen zur SafeKit Hochverfügbarkeitssoftware. Die Informationen helfen Beschaffungsteams und Lösungsarchitekten, ihre Anforderungen zu definieren.

## Inhaltsverzeichnis {#table-of-contents}

  1. [Produktinformationen](#product-identity)
  2. [Unterstützte Betriebssysteme und Plattformen](#supported-operating-systems-platforms)
  3. [Einschränkungen SafeKit Hochverfügbarkeit](#safekit-ha-limitations)
  4. [Vorkonfigurierte Anwendungsmodule](#pre-built-application-modules)
  5. [Architektur und Bereitstellung](#architecture-deployment-model)
  6. [Datenverlust und Wiederherstellungszeiten (RPO und RTO)](#rpo-rto-capabilities)
  7. [Remote-Standorte und verteilte Bereitstellungen](#edge-distributed-deployment-suitability)
  8. [Überwachung und Warnmeldungen](#monitoring-management-alerting)
  9. [Sicherheit und Compliance](#security-compliance)
  10. [Lizenzierung](#licensing-model)
  11. [Support und Wartung](#support-maintenance-slas)
  12. [Vergleich mit anderen Lösungen](#comparison-vs-alternatives)
  13. [Nützliche Links](#quick-reference-links)


## Produktinformationen {#product-identity}

Thema | Details  
---|---  
Produktname | SafeKit  
Anbieter | Eviden, Teil der Atos-Gruppe. Früher Evidian.  
Entwicklungsland | Frankreich  
Produktkategorie | Software für Anwendungsclustering, Hochverfügbarkeit und Notfallwiederherstellung  
Aktuelle Version | SafeKit 8.2  
Webseite | [https://safekit.eviden.com](/de/)  
Erste Veröffentlichung | 2000. Seit über 20 Jahren in der Produktion im Einsatz.  
  
## Unterstützte Betriebssysteme und Plattformen {#supported-operating-systems-platforms}

Windows-Betriebssysteme | Linux-Betriebssysteme | Infrastruktur und Virtualisierung | Cloud-Plattformen  
---|---|---|---  
• Windows-Server 2025 (x86-64) <br> • Windows-Server 2022 (x86-64) <br> • Windows-Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64)  |  • Jeder Edge-Server jeder Marke <br> • VMware <br> • Microsoft Hyper-V [1] <br> • Linux KVM [1] <br> • Jeder Hypervisor <br> • Docker Container <br> • Podman Container  |  • Amazon Web Services (AWS) [2] <br> • Microsoft Azure [2] <br> • Google Cloud Platform (GCP) [2] <br> • Jede IaaS-Cloud mit Standard-VM-Instanzen   
  
**[1]** SafeKit bietet Hochverfügbarkeit für einzelne Anwendungen oder ganze virtuelle Maschinen.

**[2]** Konfigurieren Sie in der Cloud virtuelle IP-Adressen auf dem Cloud Load Balancer.

{{%  insert-safekit-usage-de  %}}

## Vorkonfigurierte Anwendungsmodule {#pre-built-application-modules}

SafeKit enthält gebrauchsfertige `.safe` Module. Es gibt zwei Möglichkeiten, Anwendungen zu schützen. **Die Hochverfügbarkeit von Anwendungen** schützt eine Anwendung direkt mit einem mirror oder <span class="notranslate farm-term" translate="no">Farm</span>-Modul. **Die Hochverfügbarkeit von virtuellen Maschinen** schützt die gesamte virtuelle Maschine mit einem hyperv.safe oder kvm.safe-Modul.

Vergleichskriterium | Hochverfügbarkeit der Anwendung | Hochverfügbarkeit von virtuellen Maschinen  
---|---|---  
Konfiguration | Sie müssen wissen, welche Anwendungsdienste neu gestartet und welche Ordner repliziert werden müssen. Außerdem müssen Sie die virtuelle IP-Adresse konfigurieren, die für das Failover verwendet wird. | Sie müssen nur den Speicherort der Dateien der virtuellen Maschine angeben. Sie müssen nicht wissen, wie die Anwendungen in der virtuellen Maschine funktionieren. Dieser Ansatz schützt die Anwendungen und das Betriebssystem gemeinsam.  
Empfohlene Verwendung | Fügen Sie Hochverfügbarkeit direkt zu einer Softwarelösung hinzu, ohne von spezifischer Hardware oder einem bestimmten Hypervisor abhängig zu sein. | Verwalten Sie mehrere Anwendungen auf mehreren virtuellen Maschinen mit einer einzigen Hochverfügbarkeitsrichtlinie.  
  
Die folgende Tabelle listet alle verfügbaren `.safe` Module auf:

Hochverfügbarkeit der Anwendung | Hochverfügbarkeit von virtuellen Maschinen  
---|---  
Neue Windows App – mirror.safe | Hyper-V VM – hyperv.safe (Windows)  
Neue Linux App – mirror.safe | KVM VM – kvm.safe (Linux)  
Windows Lastenausgleich – farm.safe | Docker Container – mirror.safe (Linux)  
Linux-Lastverteilung – farm.safe | Podman Container – mirror.safe (Linux)  
Microsoft SQL Server – sqlserver.safe (Windows) | K3s Kubernetes – k3s.safe (Linux)  
PostgreSQL – postgresql.safe (Windows und Linux) | Bosch AMS – hyperv.safe (Windows)  
MySQL – mysql.safe (Windows und Linux) | Bosch BIS – hyperv.safe (Windows)  
MariaDB – mysql.safe (Windows & Linux) | Bosch BVMS – hyperv.safe (Windows)  
Oracle – oracle.safe (Windows und Linux) | Hanwha Vision – hyperv.safe (Windows)  
Firebird – firebird.safe (Windows & Linux) | Hanwha Wisenet – hyperv.safe (Windows)  
Apache – apache_farm.safe (Windows & Linux) | Siemens Siveillance Suite – hyperv.safe (Windows)  
IIS – iis_farm.safe (Windows) | Siemens Desigo CC – hyperv.safe (Windows)  
NGINX – farm.safe (Windows & Linux) | Siemens SiPass – hyperv.safe (Windows)  
Milestone XProtect – milestone.safe (Windows) | Siemens SIPORT – hyperv.safe (Windows)  
Nedap AEOS – nedap.safe (Windows) | SIMATIC PCS 7 – hyperv.safe (Windows)  
Genetec (SQL Server) – sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS – SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generisch) – mirror.safe/farm.safe |   
  
## Architektur und Bereitstellung {#architecture-deployment-model}

### Zwei Cluster-Module: mirror.safe und farm.safe {#two-cluster-modules}

Modul | Funktionsprinzip | Typische Anwendungen  
---|---|---  
mirror.safe | Ein Server ist aktiv und der andere ist im Standby-Modus. Dateien werden synchron auf Byte-Ebene repliziert. Das Failover erfolgt automatisch. | Datenbanken, Anwendungen, die den Zustand speichern, und Dienste, die jeweils nur auf einem Server ausgeführt werden  
farm.safe | Mehrere Server sind gleichzeitig aktiv. SafeKit verteilt den Netzwerkverkehr zwischen ihnen und übernimmt das Failover automatisch. | Webserver, zustandslos Microservices, API-Gateways und Dienste, die gleichzeitig auf mehreren Servern laufen  
  
### Cluster-Infrastruktur {#cluster-infrastructure-architecture}

Anforderung | SafeKit-Funktionen  
---|---  
Gemeinsamer Speicherplatz erforderlich? | Nein. SafeKit verwendet lokale Festplatten. Es benötigt kein SAN oder Shared Storage.  
Active Directory erforderlich? | Nein. SafeKit benötigt keine Windows Domäne oder Active Directory. Es unterstützt auch Arbeitsgruppen.  
Anzahl der Knoten in einem Cluster | 2 Knoten (mirror) oder 2+ Knoten (<span class="notranslate farm-term" translate="no">farm</span>)  
Virtuelle IP-Adresse (VIP) | Für die Hochverfügbarkeit der Anwendung wird die virtuelle IP-Adresse durch Gratuitous ARP automatisch auf den aktiven Knoten verschoben. Für die Hochverfügbarkeit der virtuellen Maschine wird der Datenverkehr an die IP-Adresse innerhalb der virtuellen Maschine automatisch umgeleitet. Es ist keine separate virtuelle IP-Adresse erforderlich. Die Knoten müssen sich ein LAN oder ein VLAN teilen, das zwischen den Standorten erweitert wird.  
Architektur mit drei Knoten | SafeKit betreibt einen Zwei-Knoten Mirror-Cluster in einem LAN oder einem VLAN, das zwischen Standorten erweitert wird. Es bietet synchrone Replikation mit null Datenverlust (RPO = 0) und automatischem Failover. Ein separates Backup-Produkt repliziert Daten asynchron auf einen dritten Knoten über ein WAN. Dieses Backup ermöglicht die Wiederherstellung zu einem früheren Zeitpunkt und bietet Schutz vor Ransomware.  
Zweck der Hochverfügbarkeit | SafeKit repliziert Daten synchron auf beide Knoten. Dies ermöglicht ein automatisches Failover ohne Datenverlust nach einem Hardware- oder Softwarefehler. Logische Fehler, Datenbeschädigungen und versehentliche Löschungen werden jedoch auch sofort auf den Standby-Knoten kopiert.  
Zweck von Backups | Mit Backups können Sie Daten von einem früheren Zeitpunkt wiederherstellen. Ein separates Backup-Produkt, nicht SafeKit, bietet diesen Schutz durch asynchrone Replikation. Backups helfen bei der Wiederherstellung nach Ransomware-Angriffen und menschlichem Versagen. Diese Wiederherstellung ist kein automatisches Failover. Beim Wiederherstellen eines älteren Backups gehen nach diesem Backup vorgenommene Änderungen verloren.  
Maximale Anzahl gleichzeitig laufender Module | Ein Zwei-Knoten-Cluster kann bis zu 32 Module gleichzeitig verwalten. Für den Schutz virtueller Maschinen repliziert und startet jedes Modul eine andere virtuelle Maschine. Jedes Modul kann auf jedem Knoten primär sein, sodass beide Server die Arbeitslast gemeinsam nutzen können. Das Gesamtvolumen der Daten beeinflusst die Resynchronisierungszeit nach einem Failover oder einem Neustart eines Knotens.  
Ist auf jedem Knoten Software installiert? | Ja. Auf jedem Knoten ist eine schlanke Software installiert.  
Unterstützte Anwendungen | SafeKit kann jeden Windows Dienst oder Linux Daemon schützen. Vorkonfigurierte Module sind für mehr als 30 Anwendungen verfügbar.  
  
### Replikation und Datenschutz {#replication-data-protection}

Anforderung | SafeKit-Funktionen  
---|---  
Replikationsmethode | SafeKit repliziert Dateiänderungen auf Byte-Ebene. Es werden keine Festplattenblöcke repliziert.  
Replikationsmodus | Synchrone Replikation ohne Datenverlust  
Netzwerkanforderung | Für die synchrone Replikation wird eine Round-Trip-Latenz von unter 5 ms zwischen den Knoten empfohlen.  
Empfohlenes Datenvolumen | Einige Terabyte, um die Resynchronisierungszeit überschaubar zu halten  
Empfohlene Dateianzahl | Weniger als 1.000.000 Dateien, um die Resynchronisierungszeit überschaubar zu halten  
Resynchronisierungszeit für 1 TB | Etwa 3 Stunden über ein 1-Gbit/s-Netzwerk oder 1 Stunde über ein 10-Gbit/s-Netzwerk  
Selektive Replikation | Sie können auswählen, welche Verzeichnisse und Dateien repliziert werden sollen.  
Verschlüsselung während der Übertragung | Der Replikationsverkehr wird mit TLS/SSL verschlüsselt.  
  
## Datenverlust und Wiederherstellungszeiten (RPO und RTO) {#rpo-rto-capabilities}

### RPO und RTO für jeden Clustertyp {#rto-rpo-cluster-type}

Metrisch | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO (Recovery Point Objective) | Kein Datenverlust. Ein Schreibvorgang ist erst dann abgeschlossen, wenn beide Knoten die Daten geschrieben haben. | Nicht anwendbar auf zustandslose Dienste. Die Daten werden von einem separaten Mirror-Cluster verwaltet.  
RTO (Recovery Time Objective) | Etwa eine Minute. Dies beinhaltet das <span class="notranslate farm-term" translate="no">Heartbeat</span> Timeout (standardmäßig 30 Sekunden) und die Zeit zum Neustart der Anwendung. | Ein paar Sekunden. Der Datenverkehr wird auf die verbleibenden aktiven Knoten umverteilt.  
Replikationstyp | Synchrone Dateireplikation auf Byte-Ebene in Echtzeit | Nicht zutreffend  
Failover-Auslöser | Das Failover startet automatisch, wenn <span class="notranslate farm-term" translate="no">Heartbeat</span>-Nachrichten ausbleiben, ein Prozess abstürzt oder ein Checker einen Fehler erkennt | Das Failover startet automatisch, wenn <span class="notranslate farm-term" translate="no">Heartbeat</span>-Nachrichten ausbleiben, wenn ein Prozess abstürzt oder wenn ein Checker einen Fehler erkennt  
Manuelle Intervention erforderlich? | Nein. Failover und Failback erfolgen automatisch. | Nein. Failover und Failback erfolgen automatisch.  
  
### Wiederherstellungszeit für Anwendungen, die durch einen Mirror-Cluster geschützt sind {#rto-breakdown-mirror-application-level-ha}

Fehlertyp | So wird die Erholungszeit berechnet  
---|---  
Hardwarefehler | <span class="notranslate farm-term" translate="no">Heartbeat</span> Zeitüberschreitung (standardmäßig 30 Sekunden), gefolgt vom Neustart der Anwendung  
Software- oder Prozessabsturz | Die Zeit bis zum Stoppen der Anwendung, gefolgt vom Neustart der Anwendung  
Betriebssystemabsturz | Das <span class="notranslate farm-term" translate="no">Heartbeat</span>-Timeout, gefolgt vom Neustart der Anwendung. Der Standby-Server muss nicht neu gestartet werden, da sein Betriebssystem bereits ausgeführt wird.  
  
### Wiederherstellungszeit für virtuelle Maschinen, die durch einen Mirror-Cluster geschützt sind {#rto-breakdown-mirror-vm-level-ha}

Fehlertyp | So wird die Erholungszeit berechnet  
---|---  
Alle Fehlerarten | Zeit für die Fehlererkennung, den Neustart des Betriebssystems der virtuellen Maschine und den Neustart der Anwendung. Dies dauert in der Regel mehrere Minuten.  
  
## Remote-Standorte und verteilte Bereitstellungen {#edge-distributed-deployment-suitability}

SafeKit ist für abgelegene Standorte, Zweigstellen und Organisationen mit vielen Standorten konzipiert.

Anforderung an einen entfernten Standort | SafeKit-Funktionen  
---|---  
Kein dediziertes IT-Personal vor Ort | Das Failover erfolgt automatisch und erfordert keine manuellen Eingriffe.  
Kein gemeinsamer Speicher (SAN oder NAS) | Es werden nur lokale Datenträger benötigt. Ein gemeinsam genutzter Speicher ist nicht erforderlich.  
Fernverwaltung | Verwalten Sie den Cluster über eine Webkonsole.  
Begrenzte Hardware | Zwei Standardserver oder virtuelle Maschinen genügen. Es ist keine spezielle Hardware erforderlich.  
Firewalls und Netzwerkadressübersetzung (NAT) | Ports können konfiguriert werden. Die Webkonsole verwendet HTTPS.  
Disaster Recovery zwischen Standorten | Ein Mirror-Cluster kann zwei Standorte über ein zwischen ihnen erweitertes VLAN verbinden.  
Integration durch Softwareanbieter | Softwarehersteller können SafeKit in ihre Produkte integrieren. Die Installation kann ohne Benutzerinteraktion ausgeführt und mit Skripten automatisiert werden.  
Hunderte von SafeKit-Clustern an vielen Standorten | SafeKit ist für Organisationen mit vielen Niederlassungen konzipiert.  
  
Die folgenden Standorte benötigen eine hohe Verfügbarkeit, auch wenn sie kein Rechenzentrum haben:

Industrie | Typische Website | Kritische Anwendungen  
---|---|---  
Physische Sicherheit und Überwachung | Gebäude, Campusse, Flughäfen | VMS – Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebäudemanagement (BMS) | Bürogebäude, Krankenhäuser, Fabriken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische Zugangskontrolle (EACS) | Sichere Einrichtungen, Campusse | Siemens SiPass, Nedap, Bosch AMS  
SCADA & industrielle Steuerung | Fabriken, Umspannwerke, Wasserwerke | Jede SCADA-, DCS- oder HMI-Software, die unter Windows oder Linux läuft  
Flugverkehrskontrolle (ATC) | Flughäfen, Kontrolltürme | Flugsicherungs- und Radarsysteme  
Betriebsleitzentralen (OCC) | U-Bahn, Eisenbahn, Verkehrsknotenpunkte | Eisenbahnsignaltechnik und Bahnhofsmanagement  
Maritim | Schiffe, Kriegsschiffe | Navigations-, Fracht- und Bordmanagementsysteme  
Öl und Gas | Offshore-Plattformen, abgelegene Bohranlagen | Prozessleittechnik und Sicherheitssysteme  
Telekommunikation | 5G-Antennenstandorte, MEC-Knoten | Multi-Access-Edge-Computing-Server (MEC-Server)  
Gesundheitswesen | Kliniken, ferngesteuerte Diagnosezentren | Medizinische Bildgebung, Patientendaten, Ferndiagnostik  
Einzelhandel | Geschäfte, Filialen, Lager | Kassensystem und Bestandsverwaltung  
Verteidigung | Vorgeschobene Einsatzstützpunkte, Feldeinheiten | Missionskritische Kommando- und Kommunikationssysteme  
  
## Überwachung und Warnmeldungen {#monitoring-management-alerting}

Funktion | Details  
---|---  
Webkonsole | Konfigurieren, überwachen und verwalten Sie Clusterknoten über eine Webanwendung oder eine Progressive Web App (PWA).  
Mobile Benachrichtigungen | Erhalten Sie Browser-Benachrichtigungen, wenn ein Modul seinen Status ändert.  
Zeitleiste | Zeigen Sie Modulstatusänderungen und Ereignisse in chronologischer Reihenfolge an.  
E-Mail-Benachrichtigungen | Ein integrierter E-Mail-Agent sendet Warnmeldungen.  
Befehlszeilenschnittstelle | Verwenden Sie die Befehlszeilenschnittstelle, um Skripte zu schreiben und Aufgaben zu automatisieren.  
Protokollverwaltung | Jedes Modul und jedes Skript verfügt über eigene Protokolldateien. Das Support-Team verwendet Modul-<span class="notranslate farm-term" translate="no">snapshots</span>, um Probleme zu untersuchen.  
Integration mit Monitoring-Tools | SafeKit zeichnet wichtige Cluster-Ereignisse im Windows Ereignisprotokoll oder Linux Syslog auf. Überwachungstools können diese Ereignisse erfassen und mit Standardregeln Warnmeldungen auslösen. Dies funktioniert mit Nagios, Zabbix, Splunk und SIEM-Tools ohne kundenspezifische Entwicklung.  
  
## Sicherheit und Compliance {#security-compliance}

Funktion | Details  
---|---  
HTTPS | Die Webkonsole verwendet HTTPS mit TLS-Zertifikaten.  
Benutzerauthentifizierung | Lokale Konten, LDAP, Zertifikate (PKI) und OpenID Connect  
Benutzerrollen | Konfigurieren Sie Zugriffsrichtlinien für Administration, Steuerung und Überwachung.  
Verschlüsselung | TCP-Verkehr verwendet TLS/SSL für die Replikation, die Webkonsole und verteilte Befehle. UDP-Verkehr verwendet AES-128-CBC-Verschlüsselung mit SHA256 für <span class="notranslate farm-term" translate="no">Heartbeat</span>-Nachrichten und für das interne Safeadmin-Protokoll. Die OpenSSL-Bibliothek bietet Verschlüsselung. Der Webdienst läuft auf Apache.  
Antivirenprogramm | Die Dokumentation listet die Pfade auf, die von Antivirenscans ausgeschlossen werden sollen.  
Souveränität | SafeKit wird in Frankreich von Eviden, einem Teil der Atos-Gruppe, entwickelt. Es schützt Windows und Linux Anwendungen, während Ihre Daten und Server bei Ihnen vor Ort bleiben. SafeKit kann dazu beitragen, die Anforderungen der europäischen NIS2 Richtlinie für Geschäftskontinuität und Notfallwiederherstellung zu erfüllen.
  
## Lizenzierung {#licensing-model}

Thema | Details  
---|---  
Lizenztyp | Eine unbefristete Lizenz wird einmalig erworben und ist an einen Hostnamen gebunden.  
Lizenzumfang | Eine Lizenz pro Server (Knoten)  
Lizenzaktivierung | Lizenzschlüssel können ohne Internetzugang aktiviert werden.  
Kostenlose Testversion | Eine kostenlose Testversion beinhaltet alle Funktionen.  
Kostenlose einmonatige Lizenz | Verfügbar, um einen Proof of Concept zu testen  
  
## Support und Wartung {#support-maintenance-slas}

### Standard-Support und -Wartung mit einem aktiven Wartungsvertrag {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
Zugang zum Support-Portal | Das Webportal steht bis zu vier namentlich genannten technischen Ansprechpartnern jederzeit an jedem Tag des Jahres zur Verfügung.  
Live-Support-Zeiten | Montag bis Freitag, von 09:00 bis 17:00, im Europäischen Support Center  
Bestätigung des Vorfalls | Innerhalb von vier Arbeitsstunden. Als Arbeitsstunden gelten die Live-Supportzeiten des Support-Centers.  
Updates und Upgrades | Alle Service Packs, Updates und Upgrades sind ohne zusätzliche Kosten enthalten.  
Lizenzschlüssel ersetzen | Bei einem aktiven Supportvertrag kann ein Lizenzschlüssel bei einer Änderung des Hostnamens neu zugewiesen werden. Die Übertragung ist auf den Austausch eines Servers innerhalb desselben Projekts beschränkt. Eine vorherige schriftliche Genehmigung von Eviden ist erforderlich.  
Zugriff auf die Wissensdatenbank | Vollständiger Zugriff auf Artikel der Wissensdatenbank, häufig gestellte Fragen und Online-Dokumentation  
Notfallverfahren | SafeKit bietet ein Wrapper-Skript zum Starten oder Stoppen einer Anwendung, ohne die Hochverfügbarkeitsfunktionen von SafeKit zu verwenden. Dieses Skript ruft die Start- und Stoppskripte der Anwendung auf. Es fügt bei Bedarf auch die virtuelle IP-Adresse hinzu oder entfernt sie.  
Support-Portal | <https://customercare.evidian.com>  
  
### Kostenlose Ressourcen ohne Supportvertrag {#free-resources-no-contract-required}

Kostenlose Ressource | Details  
---|---  
KI-Assistent für den Support | Nutzen Sie [SafeKit AI-Chat](</de/resources/safekit-support/#ai-support>) auf safekit.eviden.com.   
Online-Schulung und Zertifizierung | [Lernen Sie in Ihrem eigenen Tempo](/de/resources/safekit-on-line-training/) mit kostenlosen Videos mit einer Gesamtlänge von etwa 4 Stunden. Sie erhalten ein Zertifikat, wenn Sie die Schulung abgeschlossen haben.  
Dokumentation | Benutzerhandbuch, Versionshinweise, Wissensdatenbank und Kurzanleitungen zur Installation [finden Sie hier](/de/resources/safekit-free-trial/)  
  
## Vergleich mit anderen Lösungen {#comparison-vs-alternatives}

Kriterium | SafeKit | Microsoft Failovercluster (WSFC) | VMware HA | Open Source [1]  
---|---|---|---|---  
Gemeinsamer Speicher (SAN/vSAN) erforderlich | Nein | Ja | Ja | Nein  
Windows Support | Ja | Ja | Ja | Nein  
Linux Unterstützung | Ja | Nein | Ja | Ja  
Einsatz an abgelegenen Standorten | Ausgezeichnet | Komplex | Komplex | Komplex  
OEM | Ja | Nein | Nein | Nein  
Kosten | Dauerlizenz pro Knoten | Windows-Server und SAN | vSphere Enterprise und SAN | Erweiterte Integrationsdienste  
Komplexität der Einrichtung | Niedrig: ein Produkt zum Installieren und Konfigurieren | Hoch: Active Directory, SAN und Witness-Konfiguration | Hoch: vCenter- und Shared-Storage-Konfiguration | Hoch: mehrere separate Produkte zur Konfiguration  
Verwaltung | Ein Produkt, das über eine Webkonsole verwaltet wird | Hoch: erfordert Active Directory- und SAN Expertise | Hoch: hängt von vCenter ab | Hoch: mehrere separate Produkte, die gewartet werden müssen  
  
**[1]** Unter Linux sind sechs separate Open-Source-Projekte erforderlich, um den gleichen Funktionsumfang bereitzustellen: Corosync, Pacemaker, DRBD, Keepalived, STONITH und HAProxy. SafeKit bietet diese Funktionen in einem Produkt für Windows und Linux.

## Nützliche Links {#quick-reference-links}

Link | URL  
---|---  
Produkt-Startseite | [https://safekit.eviden.com](/de/)  
Technische Übersicht (Word-Dokument mit Text und Diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Kostenlose Testversion | [https://safekit.eviden.com/resources/safekit-free-trial/](</de/resources/safekit-free-trial/>)  
Angebot einholen | [https://safekit.eviden.com/safekit-pricing/](</de/safekit-pricing/>)  
Support-Portal | <https://customercare.evidian.com>  
Kostenlose KI-Unterstützung | [https://safekit.eviden.com/resources/safekit-support/](</de/resources/safekit-support/>)  
Kostenlose Schulung und Zertifizierung | [https://safekit.eviden.com/resources/safekit-on-line-training/](</de/resources/safekit-on-line-training/>)  
Kontaktieren Sie uns | [https://safekit.eviden.com/contact-us-for-safekit/](</de/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-de  %}}