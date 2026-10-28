---
title: "Hochverfügbarkeit mit Nedap SafeKit : Installieren Sie das Modul nedap.safe für Failover."
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Installieren Sie das Modul nedap.safe für SafeKit , um die synchrone Echtzeitreplikation und das automatische Failover von Nedap auf Windows zu aktivieren. Diese Anleitung führt Sie durch die Einrichtung eines SAN-losen Clusters mit zwei Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für Nedap , Einschränkungen der Hochverfügbarkeit SafeKit , Übersicht der Lösung SafeKit / Nedap , Installation der Lösung SafeKit / Nedap auf Windows ( nedap.safe ), Schrittweise Konfiguration der Lösung SafeKit / Nedap , Demonstration der Lösung SafeKit mirror , 🔍 Navigationszentrale für Hochverfügbarkeit SafeKit"
---

# Hochverfügbarkeit mit Nedap SafeKit : Installieren Sie das Modul nedap.safe für Failover {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Nedap" mod="nedap"  %}}
 

** 📘 [ Konfiguration von Nedap AOES mit SafeKit (PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>) ** : alle Details sind in diesem Dokument enthalten.

## Übersicht der SafeKit / Nedap -Lösung {#overview-of-the-safekit--nedap-solution}

Die Lösung wird hier beschrieben: ** 💡 [ Die einfachste Nedap Hochverfügbarkeit: 2-Knoten-Synchronreplikation & Failover ](</de/solutions/nedap-high-availability-synchronous-replication-failover/>) ** .

## Installation der SafeKit / Nedap Lösung auf Windows ( nedap.safe ) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen Nedap AEOS und SQL, die auf 2 Knoten (virtuellen Maschinen oder physischen Servern) installiert sind.
  * Befindet sich SQL Server auf demselben Knoten wie Nedap AEOS, konfigurieren Sie die Verbindung von Nedap AEOS zu SQL mit der virtuellen IP-Adresse und nicht mit der physischen IP-Adresse des Servers. Andernfalls funktioniert das Failover nicht. SQL Server kann extern sein; siehe Hinweis unten.


ℹ️ Hinweis: SQL Server kann extern sein. In diesem Fall bei Schritt 4 der schrittweisen Konfiguration:

  * Die Replikation der SQL-Daten- und Protokollordner entfernen.
  * Prozessprüfer auf sqlservr.exe entfernen,
  * Entfernen Sie MSSQLServer aus dem MAKEL SERVICES.


Sie können die Redundanz des externen SQL Server mit den Modulen [ SafeKit und sqlserver.safe sowie ](</de/solutions/sql-server-high-availability-synchronous-replication-failover/>) realisieren. Konfigurieren Sie in diesem Fall die Verbindung des AEOS Nedap zu SQL mit der virtuellen IP-Adresse des Moduls sqlserver.safe .


{{%  insert-safekit-installation-package-windows-de app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Schrittweise Konfiguration der Lösung SafeKit / Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-de app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Demonstration der Lösung SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}