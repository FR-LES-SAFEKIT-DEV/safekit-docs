---
title: "SafeKit: Hochverfügbarkeitssoftware für Windows und Linux ohne SAN"
canonical: "https://safekit.eviden.com/de/"
description: "SafeKit ist die All-in-One-SANless-HA-Software für Windows und Linux. Erhalten Sie synchrone Replikation in Echtzeit, automatische Failover und Lastausgleich in einem einfachen, kostengünstigen Paket. Starten Sie Ihre 30-tägige kostenlose Testversion."
category: "home"
lang: "de"
topics: "Was SafeKit leistet, Wählen Sie Ihr Schutzniveau, Vorgefertigte Module für Ihre Anwendungen, Kundenanwendungsfälle, Einfache, vorhersehbare Preise, Kennen Sie die Grenzen, bevor Sie beginnen, SafeKit-Videobibliothek, 🔍 SafeKit Hochverfügbarkeits-Navigations-Hub"
translation: "translate_md 2026-11-05.8 | glossaire 2026-11-05.12 | Translation LLM | 15 expressions"
---

# SafeKit: Hochverfügbarkeitssoftware für Windows und Linux ohne SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit verwandelt zwei Standardserver in einen SANless-Hochverfügbarkeitscluster, der Ihre Anwendungen am Laufen hält. Es repliziert Ihre Daten in Echtzeit, startet Ihre Anwendung auf dem zweiten Server neu, wenn der erste ausfällt, und integriert den ausgefallenen Server automatisch wieder, sobald er repariert ist. Sie installieren es auf den Servern, die Sie bereits haben, ohne dass ein gemeinsamer Speicher oder Cluster-Kenntnisse erforderlich sind.

Die Replikation ist synchron, sodass keine Daten verloren gehen, wenn ein Server ausfällt, und Ihre Anwendung ist in etwa einer Minute oder weniger wieder verfügbar. Die Lizenzen sind unbefristet und werden pro Server berechnet.

<a class="btn-download" href="/de/resources/safekit-free-trial/">Starten Sie Ihre 30-tägige kostenlose Testphase ›</a>


## Was SafeKit leistet {#features}

SafeKit vereint vier Funktionen in einem einzigen Produkt, das über eine einzige Webkonsole oder Befehlszeile unter Windows und Linux verwaltet wird.

| Funktion | So funktioniert es |
|---|---|
| **Echtzeit-Replikation** | Jede an Ihren Dateien vorgenommene Änderung wird sofort auf den zweiten Server kopiert, sodass bei einem Ausfall keine Daten verloren gehen. |
| **Automatischer Failover** | SafeKit erkennt den Fehler, verschiebt die virtuelle IP-Adresse und startet die Anwendung auf dem anderen Server neu. |
| **Automatischer Failback** | Der reparierte Server wird im Hintergrund resynchronisiert, während die Anwendung weiterläuft. |
| **Lastverteilung** | Die Netzwerklastverteilung läuft innerhalb der Server, ohne externen Load Balancer oder Proxy. |

![SafeKit-Webkonsole zur Überwachung eines 2-Knoten Mirror-Cluster für Windows und Linux mit PRIM und SECOND Servern und aktiver Datenreplikation](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Sie benötigen kein SAN, keine Quorum-Festplatte, kein Active Directory und keine Enterprise-Editionen Ihres Betriebssystems oder Ihrer Datenbank.

<a class="btn-download" href="/de/architectures/">Cluster-Architekturen erkunden ›</a>


## Wählen Sie Ihr Schutzniveau {#protection-levels}

**Anwendungs-HA** (`mirror.safe`, `farm.safe` und die Anwendungsmodule) repliziert nur Ihre Anwendungsdaten und startet die Anwendung auf dem zweiten Server neu. Sie müssen wissen, welche Dienste neu gestartet werden müssen, welche Ordner in Echtzeit repliziert werden müssen und welche virtuelle IP-Adresse für das Failover verwendet werden soll. Es funktioniert auf physischen Servern, in virtuellen Maschinen auf allen Hypervisoren, einschließlich VMware, Hyper-V und KVM, und in der Cloud, und es bietet die schnellste Wiederherstellung.

**VM-HA** (`hyperv.safe`, `kvm.safe`) repliziert und übernimmt das Failover der gesamten virtuellen Maschine, sodass Sie nicht wissen müssen, wie die Anwendung funktioniert. Es eignet sich für Umgebungen mit mehreren Anwendungen, die auf mehrere VMs verteilt sind.

<a class="btn-download" href="/de/best-practises/vm-ha-vs-application-ha/">Anwendungs-HA und VM-HA vergleichen ›</a>


## Fertige Module für Ihre Anwendungen {#modules}

Vorkonfigurierte Module sind kostenlos und im Produkt enthalten. Jedes Modul definiert, welche Dienste für eine bestimmte Anwendung neu gestartet und welche Ordner repliziert werden sollen.

- **Datenbanken:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **VMs und Container:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud:** AWS, Azure, GCP und andere Clouds
- **Physische Sicherheit und Industrie:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/de/solutions/">Alle Lösungen und Module durchsuchen ›</a>


## Kundennutzungsfälle {#use-cases}

- **Videomanagement (VMS):** Hält Live- und aufgezeichnete Videos auch bei einem Serverausfall verfügbar. Wird mit Milestone, Genetec und Hanwha verwendet.
- **Zutrittskontrolle (EACS):** Hält Anmeldeinformationen und Alarme jederzeit verfügbar. Wird mit Hirsch Microsesame, Nedap AEOS und Siemens SiPass verwendet.
- **SCADA und Industrie:** behält die Kontrolle über Produktionslinien, zum Beispiel Probat-Kaffeeröster und ALSTEF-Gepäcksortieranlagen.
- **Gebäudemanagement (BMS):** Hält HLK-, Sicherheits- und Energiesysteme am Laufen. Wird mit Siemens Desigo CC und Bosch BIS verwendet.
- **Flugverkehrskontrolle (ATC):** Verbindet die Fluglotsen mit wichtigen Anwendungen auf dem Flughafengelände, zum Beispiel mit ADB SafeGate.
- **Betriebskontrollzentrum (OCC) der Metro:** stellt die Überwachung für automatisierte, fahrerlose Pariser Metrolinien sicher.
- **Edge-Standorte:** Verwandelt zwei Standardserver in einen HA-Cluster, wenn kein Rechenzentrum vorhanden ist.
- **Softwarehersteller (OEM):** Erweitert Ihren Katalog um Hochverfügbarkeit als reine Softwareoption.

<a class="btn-download" href="/de/use-cases/">Alle Anwendungsfälle entdecken ›</a>


## Einfache, vorhersehbare Preise {#pricing}

SafeKit wird mit einer unbefristeten Lizenz verkauft, es gibt also kein obligatorisches Abonnement. Der Preis hängt nur von der Anzahl der Server ab, nicht von CPU-Kernen oder Sockets, und alle Anwendungsmodule sind kostenlos. Es funktioniert auch mit Standard Editionen von Windows, Linux und Ihren Datenbanken, sodass Sie nicht für Enterprise Editionen bezahlen.

<a class="btn-download" href="/de/safekit-pricing/">Angebot anfordern ›</a>


## Kennen Sie die Grenzen, bevor Sie anfangen {#limits}

SafeKit ist auf Einfachheit ausgelegt, nicht für jeden Fall. Es eignet sich gut für bis zu einige Terabyte replizierter Daten, weniger als 1.000.000 Dateien, bis zu 32 VMs bei Verwendung VM-HA und zwei Knoten im selben LAN oder VLAN mit geringer Latenz (typischerweise unter 5 ms Roundtrip).

Bei größeren Datenmengen sind ein gemeinsam genutzter Speicher oder ein anderer Ansatz die bessere Wahl.

<a class="btn-download" href="/de/product/#safekit-ha-limitations">Siehe die vollständige Liste der Einschränkungen ›</a>


{{%  insert-safekit-videos-table-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
