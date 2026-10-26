---
title: "PostgreSQL-Hochverfügbarkeit mit SafeKit: Installieren Sie das postgresql.safe-Modul für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Stellen Sie das postgresql.safe-Modul für SafeKit bereit, um synchrone Echtzeitreplikation und automatisches Failover von PostgreSQL unter Windows und Linux zu ermöglichen. Dieser Leitfaden führt Sie durch die Einrichtung eines SANless-Clusters mit zwei Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Hochverfügbarkeits-Schnellinstallationsanleitung für PostgreSQL, Einschränkungen der SafeKit-Hochverfügbarkeit, Übersicht über die SafeKit-/PostgreSQL-Lösung, Installation der SafeKit-/PostgreSQL-Lösung unter Windows und Linux (postgresql.safe), Schritt-für-Schritt-Konfiguration der SafeKit-/PostgreSQL-Lösung, Demonstration der SafeKit-Spiegellösung, 🔍 SafeKit High Availability Navigation Hub"
---

# PostgreSQL-Hochverfügbarkeit mit SafeKit: Installieren Sie das postgresql.safe-Modul für Failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Überblick über die SafeKit / PostgreSQL-Lösung {#overview-of-the-safekit--postgresql-solution}

Die Lösung wird hier beschrieben: **💡[Die einfachste PostgreSQL-Hochverfügbarkeit: 2-Knoten-synchrone Replikation und Failover](</de/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installation der SafeKit / PostgreSQL-Lösung unter Windows und Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Voraussetzungen {#prerequisites}

  * Sie müssen PostgreSQL auf zwei Knoten installieren (virtuelle Maschinen oder physische Server).



{{%  insert-safekit-installation-package-windows-de app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-de app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-de app="PostgreSQL" mod="postgresql"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit / PostgreSQL-Lösung {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-de app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstration der SafeKit-Spiegellösung {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}