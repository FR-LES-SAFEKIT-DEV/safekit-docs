---
title: "Hochverfügbarkeit für Flugverkehrskontrollsysteme"
canonical: "https://safekit.eviden.com/de/use-cases/high-availability-air-traffic-control-system/"
description: "Hochverfügbarkeit für die Flugverkehrskontrolle: ADB SafeGate nutzt SafeKit weltweit in Flughäfen für Echtzeit-Replikation und automatisches Failover unter Windows."
category: "use-cases"
lang: "de"
topics: "Flugverkehrskontrollsysteme, Warum ist die Flugsicherung so wichtig?, Wie SafeKit die Flugsicherung schützt, Implementierung in der Praxis bei ADB SafeGate, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.22 | Translation LLM | 47 expressions"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# Hochverfügbarkeit für Flugverkehrskontrollsysteme {#high-availability-for-air-traffic-control-systems}

## Flugverkehrskontrollsysteme {#air-traffic-control-systems}

Fluglotsen haben eine der komplexesten und stressigsten Aufgaben, die man sich vorstellen kann. Heutzutage ist der Luftraum stark frequentiert und der Flugverkehr intensiv. Ein einziger Fehler bei der Flugleitung kann katastrophale Folgen haben. Moderne Flugverkehrskontrollsysteme sind auf ausgeklügelte Softwareanwendungen angewiesen. Diese Anwendungen helfen den Fluglotsen, kritische Entscheidungen zu treffen.

ADB SafeGate ist ein globaler Anbieter von Lösungen für den Flugbetrieb, einschließlich Software für Flugverkehrskontrolltürme. Die Lösungen des Unternehmens werden an mehr als 3.000 Flughäfen in über 175 Ländern eingesetzt. Sie verwalten kritische Daten zum Flughafenbetrieb, darunter:

  * Flugplanung und Informationen zum Flugverkehrsfluss
  * Meteorologische Daten
  * Status der Flugplatzbeleuchtung und -steuerung
  * Vorfeld- und Andockvorgänge

## Warum ist die Flugsicherung so wichtig? {#why-is-air-traffic-control-critical}

Die Flugsicherung ist eine der kritischsten Tätigkeiten, die es gibt. Jeder Systemausfall in einem kritischen Moment kann die Entscheidungsfindung der Fluglotsen und die Sicherheit der Passagiere gefährden. Die Fluglotsen müssen volles Vertrauen in die sie unterstützenden Systeme haben.

Die beste Anwendung ist jedoch nutzlos, wenn ein Server, ein Betriebssystem oder eine Software in einem kritischen Moment ausfällt. ADB SafeGate erkannte die Notwendigkeit, die Verfügbarkeit seiner kritischen Umgebung zu gewährleisten. Das Unternehmen beschloss zu untersuchen, wie eine 24/7-Betriebszeit für seine Anwendungen garantiert werden kann.

**Die Herausforderung**: Eine umfassende Suite von Anwendungen für Fluglotsen rund um die Uhr verfügbar zu machen. Dies ist eine zwingende Voraussetzung für die Flugsicherung.

## Wie SafeKit die Flugsicherung schützt {#safekit-high-availability-for-atc}

ADB SafeGate hat sich für SafeKit, die Softwarelösung für Hochverfügbarkeit von Eviden, entschieden, da sie Folgendes bietet:

  * **24/7-Verfügbarkeit**: Kritische Anwendungen sind stets verfügbar
  * **Redundante Anwendungsserver**: Server können in separaten Maschinenräumen untergebracht werden, um sie vor Katastrophen zu schützen
  * **Standardserver**: keine gemeinsam genutzten Festplatten und keine komplexe SAN-Infrastruktur
  * **Echtzeit-Dateireplikation**: keine Datenverluste (RPO = 0)
  * **Automatische Wiederherstellung**: Nach einem Fehler sind keine manuellen Eingriffe erforderlich

Dadurch können sich die Fluglotsen, die ADB SafeGate-Software verwenden, voll und ganz auf ihre komplexe Aufgabe konzentrieren. Sie können sich darauf verlassen, dass die sie unterstützenden Systeme ausfallsicher und stets verfügbar sind.

## Implementierung in der Praxis bei ADB SafeGate {#real-world-implementation-at-adb-safegate}

### Bereitstellungsansatz {#deployment-approach}

An einem Flughafen installiert ADB SafeGate seine Anwendungen und SafeKit auf zwei Standard-Windows-Servern. Die Server haben keine gemeinsam genutzten Festplatten. Die Anwendungen profitieren von der Echtzeit-Dateireplikation und der automatischen Wiederherstellung nach einem Fehler.

### Wie es in der Praxis funktioniert {#how-it-works-in-practice}

**Phase 1: Normalbetrieb**

Die Anwendung läuft nur auf Server 1, innerhalb des SafeKit Mirror-Modul. Clients verbinden sich automatisch mit Server 1 über eine primäre/sekundäre virtuelle IP-Adresse. Nur die von der Anwendung geänderten Dateien werden repliziert. Sie werden in Echtzeit über das Netzwerk an Server 2 gesendet. Dies minimiert den Netzwerkverkehr.

Es gibt keine Voraussetzungen für die Serverorganisation. Dateien können sich auf einer RAID5-Festplatte in Server 1 und auf einer einfachen Festplatte in Server 2 befinden.

Schreibvorgänge werden synchron auf beide Server repliziert. Bei einem Ausfall gehen also keine Daten verloren. Von einer Transaktionsanwendung committete Daten sind automatisch auf dem sekundären Server verfügbar. Ein Beispiel hierfür ist PostgreSQL. Diese Garantie ist bei asynchroner Replikation nicht möglich.

**Phase 2: Failover bei Ausfall**

Wenn Server 1 ausfällt, erfolgt ein automatisches SafeKit auf Server 2. Die Failover-Zeit entspricht der Fehlererkennungszeit plus der Anwendungsneustartzeit. Das Standard-Erkennungstimeout beträgt 30 Sekunden. Es gibt keine Verzögerung bei der Wiederherstellung des Dateisystems, im Gegensatz zu Lösungen für die Festplattenreplikation.

**Phase 3: Resynchronisierung nach einem Fehler**

Wenn der Server 1 neu gestartet wird, synchronisiert das Mirror-Modul die Dateien automatisch neu.

Nur die Dateien, die auf Server 2 während der Ausfallzeit von Server 1 geändert wurden, werden erneut synchronisiert. Die Anwendungen laufen während der erneuten Synchronisierung weiter auf Server 2. Nach der erneuten Synchronisierung ist das System wieder hochverfügbar und geschützt.

Der Administrator möchte möglicherweise, dass die Anwendung auf Server 1 mit Priorität ausgeführt wird. In diesem Fall kann ein Failback auf Server 1 manuell mit einem einzigen Klick ausgelöst werden. Es kann auch automatisch erfolgen.

### Wesentliche Vorteile für Flughäfen {#key-benefits-for-airports}

  * **Keine spezielle Hardware** erforderlich: Standard-Windows-Server genügen
  * **Kein gemeinsam genutzter Speicher**: keine teure SAN-Infrastruktur und keine Komplexität durch gemeinsam genutzte Festplatten
  * **Ausfallsicherheit**: Server können sich in separaten Maschinenräumen mit separaten Stromversorgungen befinden
  * **Kein Datenverlust**: Die synchrone Replikation gewährleistet RPO von 0 für alle bestätigten Transaktionen
  * **Automatische Wiederherstellung**: Nach einem Fehler sind keine manuellen Eingriffe erforderlich
  * **Weniger Stress**: Fluglotsen können den Systemen vertrauen, die ihre kritischen Entscheidungen unterstützen
  * **Globale Zuverlässigkeit**: Erfolgreich im Einsatz an Flughäfen in zahlreichen Ländern und auf mehreren Kontinenten

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
