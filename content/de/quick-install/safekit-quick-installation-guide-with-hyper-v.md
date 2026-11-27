---
title: "Hyper-V Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul hyperv.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "Schritt für Schritt: Installieren Sie das SafeKit-Modul hyperv.safe für Hochverfügbarkeit auf VM-Ebene, mit Replikation und Failover von Hyper-V-VMs zwischen zwei Servern."
category: "quick-install"
lang: "de"
topics: "Übersicht über die SafeKit/Hyper-V Lösung, Installation der SafeKit/Hyper-V Lösung unter Windows (hyperv.safe), Schritt-für-Schritt-Konfiguration der SafeKit/Hyper-V Lösung, Demonstration der SafeKit/Hyper-V Lösung"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Hyper-V Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul hyperv.safe für Failover {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Hyper-V" mod="hyperv"  %}}
 

## Übersicht über die SafeKit/Hyper-V Lösung {#overview-of-the-safekit--hyper-v-solution}

Die Lösung wird hier beschrieben: **💡 [Einfache Hyper-V Hochverfügbarkeit ohne Shared Storage (SAN)](</de/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installation der SafeKit/Hyper-V Lösung unter Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Voraussetzungen {#prerequisites}

  * Hyper-V Rolle ist auf 2 Windows-Knoten installiert (kostenlos in allen Windows Versionen, einschließlich Windows für PC, enthalten).
  * Kritische Anwendungen, die in einer oder mehreren virtuellen Maschinen installiert sind.
  * Maximal 32 virtuelle Maschinen pro Hyper-V Host.
  * Die Gesamtmenge der replizierten Daten ist auf wenige Terabyte begrenzt – darüber hinaus wird die Resynchronisierungszeit erheblich.
  * Mindestens 1 Gbit/s Interkonnekt zwischen den Knoten (10 Gbit/s für eine schnellere Resynchronisierung empfohlen).
  * Für das IP-Failover müssen sich beide Knoten im selben LAN oder erweiterten LAN (L2) befinden – geroutete L3-Netzwerke werden nicht unterstützt (außer mit 🛠️ [Cloud Load Balancer](</de/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-de  %}}

{{%  insert-safekit-installation-package-windows-de app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-de app="Hyper-V" mod="hyperv"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit/Hyper-V Lösung {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-de app="Hyper-V" mod="hyperv"  %}}
 

## Demonstration der SafeKit/Hyper-V Lösung {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}