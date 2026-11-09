---
title: "MariaDB Hochverfügbarkeit mit SafeKit: Installieren Sie das mysql.safe-Modul für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Setzen Sie das mysql.safe-Modul für SafeKit ein, um die synchrone Echtzeit-Replikation und das automatische Failover von MariaDB unter Windows und Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit 2 Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit mit MariaDB, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/MariaDB-Lösung, Installation der SafeKit/MariaDB-Lösung unter Windows und Linux (mysql.safe), Schritt-für-Schritt-Konfiguration der SafeKit/MariaDB-Lösung, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# MariaDB Hochverfügbarkeit mit SafeKit: Installieren Sie das mysql.safe-Modul für Failover {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="MariaDB" mod="mysql"  %}}
 

## Übersicht über die SafeKit/MariaDB-Lösung {#overview-of-the-safekit--mariadb-solution}

Die Lösung wird hier beschrieben: **💡 [Die einfachste MariaDB Hochverfügbarkeit: synchrone Replikation und Failover mit 2 Knoten](</de/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Installation der SafeKit/MariaDB-Lösung unter Windows und Linux (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen MariaDB das auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert ist.



{{%  insert-safekit-installation-package-windows-de app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-de app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-de app="MariaDB" mod="mysql"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit/MariaDB-Lösung {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-de app="MariaDB" mod="mysql"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}