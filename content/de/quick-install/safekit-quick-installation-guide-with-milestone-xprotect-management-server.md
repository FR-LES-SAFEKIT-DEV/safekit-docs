---
title: "Milestone XProtect High Availability mit SafeKit: Installieren Sie das Modul milestone.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Setzen Sie das milestone.safe-Modul für SafeKit ein, um die synchrone Echtzeit-Replikation und das automatische Failover von Milestone XProtect unter Windows zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit 2 Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für Milestone XProtect, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/Milestone XProtect-Lösung, Installation der SafeKit/Milestone XProtect Lösung unter Windows (milestone.safe), Schritt-für-Schritt-Konfiguration der SafeKit/Milestone XProtect-Lösung, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# Milestone XProtect High Availability mit SafeKit: Installieren Sie das Modul milestone.safe für Failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Milestone XProtect" mod="milestone"  %}}
 

## Übersicht über die SafeKit/Milestone XProtect-Lösung {#overview-of-the-safekit--milestone-xprotect-solution}

Die Lösung wird hier beschrieben: **💡 [Der einfachste Milestone XProtect High Availability: 2-Knoten-Synchrone Replikation und Failover](</de/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installation der SafeKit/Milestone XProtect Lösung unter Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen Milestone XProtect Management und SQL, die auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert sind. SQL Server und Event Server können extern sein, siehe die Hinweise unten.


ℹ️ Hinweis: SQL Server kann extern sein. In diesem Fall, bei Schritt 4 während der Schritt-für-Schritt-Konfiguration von milestone.safe:

  * die Replikation der SQL-Daten- und Protokollordner entfernen,
  * Entfernen Sie die Prozessprüfung für sqlservr.exe
  * Entfernen Sie MSSQLServer aus dem Makro SERVICES.


Sie können die Redundanz des externen SQL Server mit 💡 [SafeKit und dem sqlserver.safe-Modul](</de/solutions/sql-server-high-availability-synchronous-replication-failover/>) implementieren.

Konfigurieren Sie in diesem Fall auf beiden Management-Knoten die [Verbindung von Milestone Management zu SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) mit der virtuellen IP-Adresse des sqlserver.safe-Moduls (Registrierungsschlüssel HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Hinweis: Der Event-Server kann sich außerhalb des Management-Servers befinden.

In diesem Fall haben Sie 2 Cluster mit 2 Installationen von milestone.safe: einen für den Management-Cluster und den anderen für den Event-Cluster.

Für den Management-Cluster, in Schritt 4 während der schrittweisen Konfiguration von milestone.safe:

  * Entfernen Sie MilestoneEventServerService aus dem Makro SERVICES.


Und für das Ereignis-Cluster, in Schritt 4 während der Schritt-für-Schritt-Konfiguration von milestone.safe:

  * Aus dem Dienst-Makro entfernen: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * die Replikation der SQL-Daten- und Protokollordner entfernen,
  * Entfernen Sie die Prozessprüfung für sqlservr.exe
  * [Registrieren Sie](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) während der schrittweisen Konfiguration den Event-Server mit der virtuellen IP-Adresse des **Management-Clusters** (oder installieren Sie den Event-Server über den Download-Manager und legen Sie die virtuelle IP-Adresse des **Management-Clusters** während der Installation fest)
  * Legen Sie im Milestone Management Client den Ereignisserver mit der virtuellen IP-Adresse des **Ereignisclusters** in den [registrierten Diensten](</wp-content/uploads/2022/07/milestone-url-vip.png>) fest.


### ℹ️ Redundanz des Rekorders {#ℹ-recorder-redundancy}

  * Die Replikation von Rekordern ist aufgrund des Datenvolumens für SafeKit nicht geeignet.
  * Die in Milestone integrierte Lösung kann verwendet werden (Failover-Aufzeichnungsserver ohne Echtzeit-Replikation).
  * Zwei Rekorder können auch in einer Aktiv/Aktiv-Konfiguration betrieben werden, und die Kameras sind so verteilt, dass im Falle eines Ausfalls nicht alle Kameras im selben Bereich ausfallen.
  * Mit der [Vega/RMF](<https://vega25.com/>) -Lösung kann der Stream jeder Kamera auch an zwei Aufnahmegeräte gesendet werden.


ℹ️ Im Falle einer Migration von Milestone von Version N auf Version N+1 in einem SafeKit Cluster lesen Sie diesen Artikel: 🛠️ [Milestone-Management-Migration mit SafeKit](</de/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-de app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit/Milestone XProtect-Lösung {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-de app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}