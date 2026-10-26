---
title: "Hyper-V-Hochverfügbarkeit mit SafeKit: Installieren Sie das
  hyperv.safe-Modul für Failover"
canonical: https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: Erfahren Sie mehr über die Konfiguration von hyperv.safe für einen
  Aktiv/Aktiv-Hyper-V-Cluster mit SafeKit. Erreichen Sie hohe Verfügbarkeit auf
  VM-Ebene mit einer Shared-Nothing-Architektur mit zwei Knoten. Replizieren Sie
  mehrere VMs synchron über Knoten hinweg für ein automatisches Failover, ohne
  die Kosten für ein SAN oder gemeinsam genutzten Speicher.
category: quick-install
lang: de
topics: Hochverfügbarkeits-Schnellinstallationsanleitung für Hyper-V,
  Einschränkungen der SafeKit-Hochverfügbarkeit, Übersicht über die
  SafeKit-/Hyper-V-Lösung, Installation der SafeKit-/Hyper-V-Lösung unter
  Windows (hyperv.safe), Schritt-für-Schritt-Konfiguration der
  SafeKit-/Hyper-V-Lösung, Demonstration der SafeKit-/Hyper-V-Lösung, 🔍 SafeKit
  High Availability Navigation Hub
---

# Hyper-V Hochverfügbarkeit mit SafeKit: Installieren Sie das hyperv.safe-Modul für Failover {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Hyper-V" mod="hyperv"  %}}
 

## Übersicht über die SafeKit / Hyper-V-Lösung {#overview-of-the-safekit--hyper-v-solution}

Die Lösung wird hier beschrieben: **💡[Einfache Hyper-V Hochverfügbarkeit ohne Shared Storage (SAN)](</solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installation der SafeKit / Hyper-V-Lösung auf Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Voraussetzungen {#prerequisites}

  * Hyper-V-Rolle auf 2 Windows-Knoten installiert (kostenlos eingebettet in allen Windows-Versionen, einschließlich Windows für PC).
  * Kritische Anwendungen, die in einer oder mehreren virtuellen Maschinen installiert sind.
  * Maximal 32 virtuelle Maschinen pro Hyper-V-Host.
  * Die gesamten replizierten Daten sind auf einige Terabyte begrenzt – darüber hinaus wird die Zeit für die Neusynchronisierung erheblich.
  * Mindestens 1 Gbit/s Verbindung zwischen Knoten (10 Gbit/s empfohlen für eine schnellere Neusynchronisierung).
  * IP-Failover erfordert beide Knoten auf demselben LAN oder erweiterten LAN (L2) – geroutete L3-Netzwerke werden nicht unterstützt (außer mit 🛠️ [Cloud Load Balancers](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-de  %}}

{{%  insert-safekit-installation-package-windows-de app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="Hyper-V" mod="hyperv"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit / Hyper-V-Lösung {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-de app="Hyper-V" mod="hyperv"  %}}
 

## Demonstration der SafeKit / Hyper-V-Lösung {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}