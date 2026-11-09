---
title: "Windows Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Setzen Sie das Modul mirror.safe für SafeKit ein, um eine synchrone Echtzeit-Replikation und ein automatisches Failover unter Windows zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit 2 Knoten für kritische Windows Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit unter Windows, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/Windows-Lösung, Installation auf den SafeKit/Windows-Lösungen (mirror.safe), Schritt-für-Schritt-Konfiguration der SafeKit/Windows-Lösung, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# Windows Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Windows" mod="mirror"  %}}
 

## Übersicht über die SafeKit/Windows-Lösung {#overview-of-the-safekit--windows-solution}

Die Lösung wird hier beschrieben: **💡 [Die einfachste Hochverfügbarkeit Windows: synchrone Replikation und Failover mit 2 Knoten](</de/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Installation auf den SafeKit/Windows-Lösungen (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Voraussetzungen {#prerequisites}

  * Die Anwendung, die Sie in SafeKit neu starten möchten, muss auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert sein.



{{%  insert-safekit-installation-package-windows-de app="" mod="mirror"  %}}
 

Hinweis: Das generische Modul **mirror.safe**, das Sie konfigurieren werden, wird im Paket mitgeliefert.

## Schritt-für-Schritt-Konfiguration der SafeKit/Windows-Lösung {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-de app="Windows" mod="mirror"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-de  %}}