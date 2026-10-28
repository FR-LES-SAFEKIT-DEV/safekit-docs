---
title: "Hochverfügbarkeit mit MariaDB SafeKit : Installieren Sie das Modul mysql.safe für Failover."
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Installieren Sie das Modul mysql.safe für SafeKit , um die synchrone Echtzeitreplikation und das automatische Failover von MariaDB auf Windows und Linux zu aktivieren. Diese Anleitung führt Sie durch die Einrichtung eines SAN-losen Clusters mit zwei Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für MariaDB , Einschränkungen der Hochverfügbarkeit SafeKit , Übersicht der Lösung SafeKit / MariaDB , Installation der Lösung SafeKit / MariaDB auf Windows und Linux ( mysql.safe ), Schrittweise Konfiguration der Lösung SafeKit / MariaDB , Demonstration der Lösung SafeKit / mirror , 🔍 Navigationszentrale für Hochverfügbarkeit SafeKit"
---

# Hochverfügbarkeit mit MariaDB SafeKit : Installieren Sie das Modul mysql.safe für Failover {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="MariaDB" mod="mysql"  %}}
 

## Übersicht der SafeKit / MariaDB -Lösung {#overview-of-the-safekit--mariadb-solution}

Die Lösung wird hier beschrieben: ** 💡 [ Die einfachste MariaDB Hochverfügbarkeit: 2-Knoten-Synchronreplikation & Failover ](</solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>) ** .

## Installation der SafeKit / MariaDB Lösung auf Windows und Linux ( mysql.safe ) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen MariaDB auf 2 Knoten (virtuelle Maschinen oder physische Server).



{{%  insert-safekit-installation-package-windows-de app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-de app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-de app="MariaDB" mod="mysql"  %}}
 

## Schrittweise Konfiguration der Lösung SafeKit / MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-de app="MariaDB" mod="mysql"  %}}
 

## Demonstration der Lösung SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}