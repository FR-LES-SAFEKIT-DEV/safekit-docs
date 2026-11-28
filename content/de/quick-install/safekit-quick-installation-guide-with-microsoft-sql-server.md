---
title: "SafeKit installieren: Hochverfügbarkeit für SQL Server"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Schritt für Schritt: Installieren Sie das SafeKit-Modul sqlserver.safe für Echtzeit-Replikation und automatisches Failover von Microsoft SQL Server auf zwei Servern."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für Microsoft SQL Server, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/Microsoft SQL Server-Lösung, Installation der SafeKit/Microsoft SQL Server-Lösung unter Windows (sqlserver.safe), Schritt-für-Schritt-Konfiguration der SafeKit/Microsoft SQL Server-Lösung, Demonstration der SafeKit mirror"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--microsoft-sql-server-solution, installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe, step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit installieren: Hochverfügbarkeit für SQL Server {#install-safekit-for-sql-server-high-availability}


{{%  insert-safekit-mirror-guide-de app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Übersicht über die SafeKit/Microsoft SQL Server-Lösung {#overview-of-the-safekit--microsoft-sql-server-solution}

Eine detaillierte Übersicht über die Lösung finden Sie unter **💡 [Die einfachste Hochverfügbarkeit Microsoft SQL Server: synchrone Replikation und Failover mit 2 Knoten](</de/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## Installation der SafeKit/Microsoft SQL Server-Lösung unter Windows (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen Microsoft SQL Server der auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert ist.
  * SafeKit funktioniert mit allen SQL-Versionen, einschließlich SQL Express.


  * Die [SQL-Systemdatenbanken](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (wie master.mdf und mastlog.ldf) müssen sich auf beiden Knoten in denselben Verzeichnissen befinden. Die Verzeichnisse werden in Schritt 4 der Schritt-für-Schritt-Konfiguration als repliziert konfiguriert.
  * SQL muss auch am gleichen Ort im Dateisystem auf beiden Knoten installiert sein, da sich die schreibgeschützte [SQL-Ressourcendatenbank](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) in der Binärdatei befindet und für das Failover erforderlich ist. Diese Datenbank muss nicht repliziert werden.
  * Die SQL-Benutzerdatenbanken (.mdf und .ldf) müssen sich auf beiden Knoten in denselben Verzeichnissen befinden. Die Verzeichnisse werden in Schritt 4 der Schritt-für-Schritt-Konfiguration als repliziert konfiguriert.



{{%  insert-safekit-installation-package-windows-de app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit/Microsoft SQL Server-Lösung {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-de app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}