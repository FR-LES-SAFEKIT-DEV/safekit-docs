---
title: "PostgreSQL Hochverfügbarkeit mit SafeKit: Installieren Sie das postgresql.safe-Modul für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Setzen Sie das postgresql.safe-Modul für SafeKit ein, um die synchrone Echtzeitreplikation und das automatische Failover von PostgreSQL unter Windows und Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit 2 Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit mit PostgreSQL, Einschränkungen SafeKit Hochverfügbarkeit, Überblick über die SafeKit/PostgreSQL-Lösung, Installation der SafeKit/PostgreSQL Lösung unter Windows und Linux (postgresql.safe), Schritt-für-Schritt-Konfiguration der SafeKit/PostgreSQL-Lösung, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# PostgreSQL Hochverfügbarkeit mit SafeKit: Installieren Sie das postgresql.safe-Modul für Failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Überblick über die SafeKit/PostgreSQL-Lösung {#overview-of-the-safekit--postgresql-solution}

Die Lösung wird hier beschrieben: **💡 [Die einfachste Hochverfügbarkeit PostgreSQL: synchrone Replikation und Failover mit 2 Knoten](</de/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installation der SafeKit/PostgreSQL Lösung unter Windows und Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen PostgreSQL das auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert ist.



{{%  insert-safekit-installation-package-windows-de app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-de app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-de app="PostgreSQL" mod="postgresql"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit/PostgreSQL-Lösung {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-de app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}