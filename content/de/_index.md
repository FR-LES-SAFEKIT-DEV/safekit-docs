---
title: "SafeKit: Hochverfügbarkeitssoftware für Windows und Linux ohne SAN"
canonical: "https://safekit.eviden.com/de/"
description: "SafeKit ist die All-in-one-SANless-Hochverfügbarkeitssoftware für Windows und Linux. Echtzeit-Synchronreplikation, automatisches Failover und Lastverteilung in einem einfachen, kosteneffizienten Paket. Starten Sie Ihre 30-tägige kostenlose Testversion."
category: "home"
lang: "de"
topics: "Was SafeKit leistet, Wählen Sie Ihr Schutzniveau, Fertige Module für Ihre Anwendungen, Kundenanwendungsfälle, Einfache, planbare Preise, Grenzen vor dem Start kennen, SafeKit-Videobibliothek, 🔍 SafeKit-Navigationshub für Hochverfügbarkeit"
---

# SafeKit: Hochverfügbarkeitssoftware für Windows und Linux ohne SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit verwandelt zwei Standardserver in einen SAN-losen Hochverfügbarkeitscluster, der Ihre Anwendungen am Laufen hält. Die Daten werden in Echtzeit repliziert, die Anwendung bei einem Ausfall des ersten Servers auf dem zweiten neu gestartet und der reparierte Server anschließend automatisch wieder integriert. Die Installation erfolgt auf Ihren vorhandenen Servern, ohne gemeinsamen Speicher und ohne spezielle Clusterkenntnisse.

Die Replikation erfolgt synchron: Bei einem Serverausfall gehen keine Daten verloren, und Ihre Anwendung ist in etwa einer Minute oder schneller wieder verfügbar. Die Lizenzen sind unbefristet und werden pro Server berechnet.

<a class="btn-download" href="/de/resources/safekit-free-trial/">30-tägige kostenlose Testversion starten ›</a>

## Was SafeKit leistet {#features}

SafeKit vereint vier Funktionen in einem Produkt, das über eine Webkonsole oder eine Befehlszeile unter Windows und Linux verwaltet wird.

| Funktion | Funktionsweise |
|---|---|
| **Echtzeitreplikation** | Jede Änderung an Ihren Dateien wird sofort auf den zweiten Server kopiert, damit bei einem Ausfall keine Daten verloren gehen. |
| **Automatisches Failover** | SafeKit erkennt den Ausfall, verschiebt die virtuelle IP-Adresse und startet die Anwendung auf dem anderen Server neu. |
| **Automatisches Failback** | Der reparierte Server synchronisiert sich im Hintergrund neu, während die Anwendung weiterläuft. |
| **Lastverteilung** | Der Netzwerk-Load-Balancer läuft auf den Servern selbst, ohne externen Load-Balancer oder Proxy. |

![SafeKit-Webkonsole zur Überwachung eines Zwei-Knoten-Mirror-Clusters unter Windows und Linux mit den Servern PRIM und SECOND und aktiver Datenreplikation](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Sie benötigen weder ein SAN noch eine Quorum-Festplatte, Active Directory oder Enterprise-Editionen Ihres Betriebssystems oder Ihrer Datenbank.

<a class="btn-download" href="/de/architectures/">Clusterarchitekturen entdecken ›</a>

## Wählen Sie Ihr Schutzniveau {#protection-levels}

**Anwendungs-HA** (`mirror.safe`, `farm.safe` und die Anwendungsmodule) repliziert nur Ihre Anwendungsdaten und startet die Anwendung auf dem zweiten Server neu. Dafür müssen Sie wissen, welche Dienste neu gestartet, welche Ordner in Echtzeit repliziert und welche virtuelle IP-Adresse umgeschaltet werden müssen. Die Lösung funktioniert auf physischen Servern, in virtuellen Maschinen auf allen Hypervisoren einschließlich VMware, Hyper-V und KVM sowie in der Cloud und bietet die schnellste Wiederherstellung.

**VM-HA** (`hyperv.safe`, `kvm.safe`) repliziert die gesamte virtuelle Maschine und führt bei einem Ausfall ein Failover durch. Sie müssen daher nicht wissen, wie die Anwendung funktioniert. Dies eignet sich für Umgebungen mit mehreren Anwendungen auf mehreren VMs.

<a class="btn-download" href="/de/best-practises/vm-ha-vs-application-ha/">Anwendungs-HA und VM-HA vergleichen ›</a>

## Fertige Module für Ihre Anwendungen {#modules}

Vorkonfigurierte Module sind kostenlos und im Produkt enthalten. Jedes Modul legt fest, welche Dienste neu gestartet und welche Ordner für eine bestimmte Anwendung repliziert werden.

- **Datenbanken:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Webserver:** Apache, IIS, NGINX
- **VMs und Container:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud:** AWS, Azure, GCP und weitere Clouds
- **Physische Sicherheit und Industrie:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/de/solutions/">Alle Lösungen und Module ansehen ›</a>

## Kundenanwendungsfälle {#use-cases}

- **Videomanagement (VMS):** Live- und aufgezeichnete Videos bleiben bei einem Serverausfall verfügbar. Eingesetzt mit Milestone, Genetec und Hanwha.
- **Zutrittskontrolle (EACS):** Zugangsdaten und Alarme bleiben jederzeit verfügbar. Eingesetzt mit Hirsch Microsesame, Nedap AEOS und Siemens SiPass.
- **SCADA und Industrie:** Produktionslinien bleiben unter Kontrolle, etwa bei Probat-Kaffeeröstern und ALSTEF-Gepäcksortieranlagen.
- **Gebäudemanagement (BMS):** HLK-, Sicherheits- und Energiesysteme bleiben in Betrieb. Eingesetzt mit Siemens Desigo CC und Bosch BIS.
- **Flugsicherung (ATC):** Fluglotsen bleiben mit wichtigen Anwendungen im Vorfeld verbunden, beispielsweise mit ADB SafeGate.
- **U-Bahn-Betriebssteuerung (OCC):** Die Überwachung automatisierter, fahrerloser Pariser U-Bahn-Linien bleibt verfügbar.
- **Edge-Standorte:** Zwei Standardserver bilden einen HA-Cluster, auch wenn kein Rechenzentrum vorhanden ist.
- **Softwarehersteller (OEM):** Ergänzen ihr Angebot um eine softwarebasierte Hochverfügbarkeitsoption.

<a class="btn-download" href="/de/use-cases/">Alle Anwendungsfälle ansehen ›</a>

## Einfache, planbare Preise {#pricing}

SafeKit wird mit einer unbefristeten Lizenz ohne verpflichtendes Abonnement verkauft. Der Preis richtet sich nur nach der Anzahl der Server, nicht nach CPU-Kernen oder -Sockeln; alle Anwendungsmodule sind kostenlos. SafeKit funktioniert außerdem mit Standard-Editionen von Windows, Linux und Ihren Datenbanken, sodass keine Enterprise-Editionen erforderlich sind.

<a class="btn-download" href="/de/safekit-pricing/">Angebot anfordern ›</a>

## Grenzen vor dem Start kennen {#limits}

SafeKit ist auf Einfachheit ausgelegt und nicht für jeden Anwendungsfall geeignet. Es eignet sich für einige Terabyte replizierter Daten, weniger als 1.000.000 Dateien, bis zu 32 VMs bei VM-HA und zwei Knoten im selben LAN oder VLAN mit geringer Latenz (typischerweise unter 5 ms Round Trip).

Bei größeren Datenmengen sind gemeinsamer Speicher oder ein anderer Ansatz besser geeignet.

<a class="btn-download" href="/de/product/#safekit-ha-limitations">Alle Einschränkungen ansehen ›</a>

{{%  insert-safekit-videos-table-de  %}}

{{%  insert-safekit-hub-de  %}}
