---
title: "SafeKit installieren: Hochverfügbarkeit für KVM (kvm.safe)"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Schritt für Schritt: Installieren Sie das SafeKit-Modul kvm.safe für Hochverfügbarkeit auf VM-Ebene, mit Replikation und Failover von KVM-VMs unter Linux."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für KVM, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/KVM-Lösung, Installation der SafeKit/KVM-Lösung unter Linux (kvm.safe), Schritt-für-Schritt-Konfiguration der SafeKit/KVM-Lösung, Demonstration einer Hochverfügbarkeitslösung auf VM-Ebene"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--kvm-solution, installation-of-the-safekit--kvm-solution-on-linux-kvmsafe, step-by-step-configuration-of-the-safekit--kvm-solution, demonstration-of-a-vm-level-high-availability-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit installieren: Hochverfügbarkeit für KVM (kvm.safe) {#install-safekit-for-kvm-high-availability-kvmsafe}


{{%  insert-safekit-mirror-guide-de app="KVM" mod="kvm"  %}}
 

## Übersicht über die SafeKit/KVM-Lösung {#overview-of-the-safekit--kvm-solution}

Die Lösung wird hier beschrieben: **💡 [Einfache Linux KVM Hochverfügbarkeit ohne Shared Storage](</de/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installation der SafeKit/KVM-Lösung unter Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Voraussetzungen {#prerequisites}

  * KVM auf 2 Linux-Knoten installiert.
  * Kritische Anwendungen, die in einer oder mehreren virtuellen Maschinen installiert sind.
  * Maximal 32 virtuelle Maschinen pro KVM Host.
  * Die Gesamtmenge der replizierten Daten ist auf wenige Terabyte begrenzt – darüber hinaus wird die Resynchronisierungszeit erheblich.
  * Mindestens 1 Gbit/s Interkonnekt zwischen den Knoten (10 Gbit/s für eine schnellere Resynchronisierung empfohlen).
  * Für das IP-Failover müssen sich beide Knoten im selben LAN oder erweiterten LAN (L2) befinden – geroutete L3-Netzwerke werden nicht unterstützt (außer mit 🛠️ [Cloud Load Balancer](</de/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-de app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-de app="KVM" mod="kvm"  %}}
 

## Schritt-für-Schritt-Konfiguration der SafeKit/KVM-Lösung {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-de app="KVM" mod="kvm"  %}}
 

## Demonstration einer Hochverfügbarkeitslösung auf VM-Ebene {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}