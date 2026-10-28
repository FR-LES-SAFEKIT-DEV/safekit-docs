---
title: "Linux-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Erfahren Sie, wie Sie das Modul farm.safe für Netzwerklastausgleich und automatisches Failover unter Linux bereitstellen. Diese Anleitung zeigt, wie Sie mit einer virtuellen IP-Adresse einen hochverfügbaren Cluster für Webdienste und Anwendungen aufbauen – ohne externe Hardware-Load-Balancer und ohne komplexe Konfiguration."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit unter Linux, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/Linux-Lösung, Installation der SafeKit-/Linux-Lösung (farm.safe), Schrittweise Konfiguration der SafeKit-/Linux-Lösung, Demonstration der SafeKit-`farm`-Lösung, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# Linux-Netzwerklastausgleich und Failover: Installieren des SafeKit-Moduls farm.safe {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-de app="Linux" mod="farm"  %}}
 

## Überblick über die SafeKit-/Linux-Lösung {#overview-of-the-safekit--linux-solution}

Die Lösung wird hier beschrieben: **💡[SafeKit: All-in-One-Linux-Lastausgleichs- und Hochverfügbarkeitssoftware](</solutions/linux-load-balancing-failover/>)**.

## Installation der SafeKit-/Linux-Lösung (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### Voraussetzungen {#prerequisites}

  * Die Anwendung, die Sie in einer `farm` betreiben möchten, muss auf mindestens 2 Knoten (virtuelle Maschinen oder physische Server) installiert sein.



{{%  insert-safekit-installation-package-linux-de app="" mod="farm"  %}}
 

Hinweis: Das generische Modul **farm.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schrittweise Konfiguration der SafeKit-/Linux-Lösung {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-de app="Linux" mod="farm"  %}}
 

## Demonstration der SafeKit-`farm`-Lösung {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-de  %}}

{{%  insert-safekit-hub-de app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-de  %}}
