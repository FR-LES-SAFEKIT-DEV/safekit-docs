---
title: "Nedap Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul nedap.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Setzen Sie das nedap.safe-Modul für SafeKit ein, um die synchrone Echtzeit-Replikation und das automatische Failover von Nedap unter Windows zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit 2 Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für Nedap, Einschränkungen SafeKit Hochverfügbarkeit, Überblick über die SafeKit/Nedap-Lösung, Installation der SafeKit/Nedap-Lösung unter Windows (nedap.safe), Schritt-für-Schritt-Konfiguration der SafeKit/Nedap-Lösung, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# Nedap Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul nedap.safe für Failover {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Nedap" mod="nedap"  %}}
 

**📘 [Konfiguration von Nedap AOES mit SafeKit (PDF)](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)**: Alle Details finden Sie in diesem Dokument.

## Überblick über die SafeKit/Nedap-Lösung {#overview-of-the-safekit--nedap-solution}

Die Lösung wird hier beschrieben: **💡 [Die einfachste Nedap Hochverfügbarkeit: synchrone Replikation und Failover mit 2 Knoten](</de/solutions/nedap-high-availability-synchronous-replication-failover/>)**.

## Installation der SafeKit/Nedap-Lösung unter Windows (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen Nedap AEOS und SQL, die auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert sind.
  * Wenn SQL Server auf demselben Knoten wie Nedap AEOS wird, konfigurieren Sie die Verbindung von Nedap AEOS zu SQL mit der virtuellen IP-Adresse und nicht mit der physischen IP-Adresse des Servers. Andernfalls funktioniert das Failover nicht. SQL Server kann extern sein, siehe den Hinweis unten.


ℹ️ Hinweis: SQL Server kann extern sein. In diesem Fall gehen Sie bei Schritt 4 der schrittweisen Konfiguration wie folgt vor:

  * die Replikation der SQL-Daten- und Protokollordner entfernen,
  * Entfernen Sie die Prozessprüfung für sqlservr.exe
  * Entfernen Sie MSSQLServer aus dem Makro SERVICES.


Sie können die Redundanz des externen SQL Server mit 💡 [SafeKit und dem sqlserver.safe-Modul](</de/solutions/sql-server-high-availability-synchronous-replication-failover/>) implementieren. Konfigurieren Sie in diesem Fall die Verbindung von Nedap AEOS zu SQL mit der virtuellen IP-Adresse des sqlserver.safe-Moduls.


{{%  insert-safekit-installation-package-windows-de app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit/Nedap-Lösung {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-de app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}