---
title: "Windows-Hochverfügbarkeit mit SafeKit: Installieren des Moduls mirror.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Stellen Sie das SafeKit-Modul mirror.safe bereit, um unter Windows synchrone Echtzeitreplikation und automatisches Failover zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit zwei Knoten für kritische Windows-Anwendungen ohne gemeinsamen Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit unter Windows, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/Windows-Lösung, Installation der SafeKit-/Windows-Lösungen (mirror.safe), Schrittweise Konfiguration der SafeKit-/Windows-Lösung, Demonstration der SafeKit-mirror-Lösung, 🔍 SafeKit-Navigationszentrale für Hochverfügbarkeit"
---

# Windows-Hochverfügbarkeit mit SafeKit: Installieren des Moduls mirror.safe für Failover {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Windows" mod="mirror"  %}}
 

## Überblick über die SafeKit-/Windows-Lösung {#overview-of-the-safekit--windows-solution}

Die Lösung wird hier beschrieben: **💡[Die einfachste Windows-Hochverfügbarkeit: Synchrone 2-Knoten-Replikation und Failover](</de/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Installation der SafeKit-/Windows-Lösungen (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Voraussetzungen {#prerequisites}

  * Die Anwendung, die Sie in SafeKit neu starten möchten, muss auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert sein.



{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}
 

Hinweis: Das generische Modul **mirror.safe**, das Sie konfigurieren werden, ist im Paket enthalten.

## Schrittweise Konfiguration der SafeKit-/Windows-Lösung {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-de app="Windows" mod="mirror"  %}}
 

## Demonstration der SafeKit-mirror-Lösung {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-de  %}}
