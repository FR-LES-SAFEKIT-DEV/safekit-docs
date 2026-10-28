---
title: "Milestone XProtect-Hochverfügbarkeit mit SafeKit: Installieren Sie das milestone.safe-Modul für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Stellen Sie das milestone.safe-Modul für SafeKit bereit, um synchrone Echtzeitreplikation und automatisches Failover von Milestone XProtect unter Windows zu ermöglichen. Dieser Leitfaden führt Sie durch die Einrichtung eines SANless-Clusters mit zwei Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit von Milestone XProtect, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/Milestone-XProtect-Lösung, Installation der SafeKit-/Milestone-XProtect-Lösung unter Windows (milestone.safe), Schritt-für-Schritt-Konfiguration der SafeKit-/Milestone-XProtect-Lösung, Demonstration der SafeKit-mirror-Lösung, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# Milestone XProtect-Hochverfügbarkeit mit SafeKit: Installieren Sie das milestone.safe-Modul für Failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Milestone XProtect" mod="milestone"  %}}


## Überblick über die SafeKit / Milestone XProtect-Lösung {#overview-of-the-safekit--milestone-xprotect-solution}

Die Lösung wird hier beschrieben: **💡[Die einfachste Hochverfügbarkeit für Milestone XProtect: synchrone Replikation und Failover mit zwei Knoten](</de/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installation der SafeKit / Milestone XProtect-Lösung unter Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Voraussetzungen {#prerequisites}

  * Milestone XProtect Management und SQL müssen auf zwei Knoten (virtuellen Maschinen oder physischen Servern) installiert sein. SQL Server und Event Server können extern sein; siehe Hinweise unten.


ℹ️ Hinweis: SQL Server kann extern sein. In diesem Fall gilt in Schritt 4 der schrittweisen Konfiguration von milestone.safe:

  * Entfernen Sie die Replikation der Ordner SQL Data und Log.
  * Entfernen Sie die Prozessprüfung für sqlservr.exe.
  * Entfernen Sie MSSQLServer aus dem Makro SERVICES.


Sie können den externen SQL Server mit **💡[SafeKit und dem Modul sqlserver.safe](</de/solutions/sql-server-high-availability-synchronous-replication-failover/>)** redundant auslegen.

Konfigurieren Sie in diesem Fall auf beiden Management-Knoten die [Verbindung von Milestone Management mit SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) mit der virtuellen IP-Adresse des Moduls sqlserver.safe (Registrierungsschlüssel HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Hinweis: Der Event Server kann außerhalb des Management Servers betrieben werden.

In diesem Fall gibt es zwei Cluster mit zwei Installationen von milestone.safe: eines für den Management-Cluster und eines für den Event-Cluster.

Entfernen Sie für den Management-Cluster in Schritt 4 der schrittweisen Konfiguration von milestone.safe:

  * MilestoneEventServerService aus dem Makro SERVICES.


Entfernen Sie für den Event-Cluster in Schritt 4 der schrittweisen Konfiguration von milestone.safe:

  * Aus dem Makro SERVICES: MSSQLServer, Milestone XProtect Management Server und Milestone XProtect Log Server.
  * Die Replikation der Ordner SQL Data und Log.
  * Die Prozessprüfung für sqlservr.exe.
  * Registrieren Sie während der schrittweisen Konfiguration den Event Server [mit der virtuellen IP-Adresse](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) des **Management-Clusters** (oder installieren Sie den Event Server über den Download Manager und geben Sie während der Installation die virtuelle IP-Adresse des **Management-Clusters** an).
  * Legen Sie im Milestone management client unter [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>) für den Event Server die virtuelle IP-Adresse des **Event-Clusters** fest.


### ℹ️ Redundanz von Recordern {#ℹ-recorder-redundancy}

  * Die Replikation von Recordern ist aufgrund des Datenvolumens nicht für SafeKit geeignet.
  * Die in Milestone integrierte Lösung kann verwendet werden (Failover-Aufzeichnungsserver ohne Echtzeitreplikation).
  * Zwei Recorder können auch in einer Active/Active-Konfiguration laufen; die Kameras werden so verteilt, dass bei einem Ausfall nicht alle Kameras desselben Bereichs verloren gehen.
  * Der Stream jeder Kamera kann auch mit der Lösung [Vega / RMF](<https://vega25.com/>) an zwei Recorder gesendet werden.


ℹ️ Lesen Sie bei einer Migration von Milestone von Version N auf Version N+1 in einem SafeKit-Cluster diesen Artikel: 🛠️ [Migration von Milestone Management mit SafeKit](</de/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-de app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="Milestone XProtect and SQL" mod="milestone"  %}}


## Schritt-für-Schritt-Konfiguration der SafeKit / Milestone XProtect-Lösung {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-de app="Milestone XProtect and SQL" mod="milestone"  %}}


## Demonstration der SafeKit-mirror-Lösung {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
