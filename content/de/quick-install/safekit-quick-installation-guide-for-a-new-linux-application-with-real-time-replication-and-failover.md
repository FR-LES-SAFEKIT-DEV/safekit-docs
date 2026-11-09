---
title: "Linux Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Setzen Sie das Modul mirror.safe für SafeKit ein, um eine synchrone Echtzeit-Replikation und ein automatisches Failover unter Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit 2 Knoten für kritische Linux Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit unter Linux, Einschränkungen SafeKit Hochverfügbarkeit, Überblick über die SafeKit/Linux-Lösung, Installation der SafeKit/Linux-Lösung (mirror.safe), Schritt-für-Schritt-Konfiguration der SafeKit/Linux-Lösung, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# Linux Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Linux" mod="mirror"  %}}
 

## Überblick über die SafeKit/Linux-Lösung {#overview-of-the-safekit--linux-solution}

Die Lösung wird hier beschrieben: **💡 [Die einfachste Hochverfügbarkeit Linux: synchrone Replikation und Failover mit 2 Knoten](</de/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## Installation der SafeKit/Linux-Lösung (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Voraussetzungen {#prerequisites}

  * Die Anwendung, die Sie in SafeKit neu starten möchten, muss auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert sein.



{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}
 

Hinweis: Das generische Modul **mirror.safe**, das Sie konfigurieren werden, wird im Paket mitgeliefert.

## Schritt-für-Schritt-Konfiguration der SafeKit/Linux-Lösung {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-de app="Linux" mod="mirror"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-de  %}}