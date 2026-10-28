---
title: "Linux-Hochverfügbarkeit mit SafeKit: Installieren des Moduls mirror.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Stellen Sie das SafeKit-Modul mirror.safe bereit, um unter Linux synchrone Echtzeitreplikation und automatisches Failover zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit zwei Knoten für kritische Linux-Anwendungen ohne gemeinsamen Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit unter Linux, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/Linux-Lösung, Installation der SafeKit-/Linux-Lösung (mirror.safe), Schrittweise Konfiguration der SafeKit-/Linux-Lösung, Demonstration der SafeKit-mirror-Lösung, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# Linux-Hochverfügbarkeit mit SafeKit: Installieren des Moduls mirror.safe für Failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Linux" mod="mirror"  %}}
 

## Überblick über die SafeKit-/Linux-Lösung {#overview-of-the-safekit--linux-solution}

Die Lösung wird hier beschrieben: **💡[Die einfachste Linux-Hochverfügbarkeit: Synchrone 2-Knoten-Replikation und Failover](</solutions/linux-high-availability-software-synchronous-replication-failover/>)**.

## Installation der SafeKit-/Linux-Lösung (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Voraussetzungen {#prerequisites}

  * Die Anwendung, die Sie in SafeKit neu starten möchten, muss auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert sein.



{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}
 

Hinweis: Das generische Modul **mirror.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schrittweise Konfiguration der SafeKit-/Linux-Lösung {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-de app="Linux" mod="mirror"  %}}
 

## Demonstration der SafeKit-mirror-Lösung {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-de  %}}
