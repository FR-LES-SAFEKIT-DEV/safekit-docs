---
title: "Microsoft SQL Server Hochverfügbarkeit mit SafeKit : Installieren Sie das sqlserver.safe Modul für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Installieren Sie das Modul sqlserver.safe für SafeKit , um die synchrone Echtzeitreplikation und das automatische Failover für Microsoft SQL Server zu aktivieren. Diese Anleitung führt Sie durch die Einrichtung eines SAN-losen Clusters mit zwei Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für Microsoft , SQL Server und SafeKit Einschränkungen der Hochverfügbarkeit; Übersicht der Lösung SafeKit / Microsoft SQL Server ; Installation der Lösung SafeKit / Microsoft / SQL Server auf Windows ( sqlserver.safe ); Schrittweise Konfiguration der Lösung SafeKit / Microsoft / SQL Server ; Demonstration der Lösung SafeKit mirror ; 🔍 Navigationszentrale für Hochverfügbarkeit SafeKit"
---

# Microsoft SQL Server Hochverfügbarkeit mit SafeKit : Installieren Sie das Modul sqlserver.safe für Failover {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Übersicht der SafeKit / Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Einen detaillierten Überblick über die Lösung finden Sie unter **💡 [ Die einfachste Lösung Microsoft SQL Server Hochverfügbarkeit: Synchrone Replikation und Failover mit 2 Knoten ](</de/solutions/sql-server-high-availability-synchronous-replication-failover/>)** .

## Installation der SafeKit / Microsoft SQL Server Lösung auf Windows ( sqlserver.safe ) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen Microsoft SQL Server auf 2 Knoten (virtuelle Maschinen oder physische Server).
  * SafeKit funktioniert mit allen Versionen von SQL, einschließlich SQL Express.


  * Die SQL-Systemdatenbanken [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (z. B. master.mdf und mastlog.ldf) müssen sich auf beiden Knoten in denselben Verzeichnissen befinden. Die Verzeichnisse werden in Schritt 4 der schrittweisen Konfiguration als repliziert eingerichtet.
  * SQL muss auf beiden Knoten am selben Speicherort im Dateisystem installiert sein, da sich die schreibgeschützte SQL-Ressourcendatenbank [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) in der Binärdatei befindet und für das Failover benötigt wird. Diese Datenbank muss nicht repliziert werden.
  * Die SQL-Benutzerdatenbanken (.mdf und .ldf) müssen sich auf beiden Knoten in denselben Verzeichnissen befinden. Die Verzeichnisse werden in Schritt 4 der schrittweisen Konfiguration als repliziert eingerichtet.



{{%  insert-safekit-installation-package-windows-de app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Schrittweise Konfiguration der Lösung SafeKit / Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-de app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demonstration der Lösung SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}