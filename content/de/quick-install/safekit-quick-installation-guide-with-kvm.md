---
title: "KVM-Hochverfügbarkeit mit SafeKit: Installieren Sie das kvm.safe-Modul für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Erfahren Sie mehr über die Konfiguration von kvm.safe für einen aktiven/aktiven KVM-Cluster mit SafeKit. Erreichen Sie Hochverfügbarkeit auf VM-Ebene mit einer 2-Knoten-Architektur ohne gemeinsame Nutzung. Synchrones Replizieren mehrerer VMs über Knoten für automatisches Failover ohne die Kosten eines SAN oder gemeinsam genutzten Speichers."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für KVM, Einschränkungen der SafeKit-Hochverfügbarkeit, Überblick über die SafeKit-/KVM-Lösung, Installation der SafeKit-/KVM-Lösung unter Linux (kvm.safe), Schritt-für-Schritt-Konfiguration der SafeKit-/KVM-Lösung, Demonstration einer Lösung für Hochverfügbarkeit auf VM-Ebene, 🔍 SafeKit-Navigationshub für Hochverfügbarkeit"
---

# KVM-Hochverfügbarkeit mit SafeKit: kvm.safe-Modul für Failover installieren {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="KVM" mod="kvm"  %}}
 

## Übersicht über die SafeKit-/KVM-Lösung {#overview-of-the-safekit--kvm-solution}

Die Lösung wird hier beschrieben: **💡[Einfache Hochverfügbarkeit für Linux-KVM ohne gemeinsamen Speicher](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installation der SafeKit-/KVM-Lösung unter Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Voraussetzungen {#prerequisites}

  * KVM ist auf zwei Linux-Knoten installiert.
  * Kritische Anwendungen, die in einer oder mehreren virtuellen Maschinen installiert sind.
  * Maximal 32 virtuelle Maschinen pro KVM-Host.
  * Die gesamten replizierten Daten sind auf einige Terabyte begrenzt – darüber hinaus wird die Zeit für die Neusynchronisierung erheblich.
  * Mindestens 1 Gbit/s Verbindung zwischen Knoten (10 Gbit/s empfohlen für eine schnellere Neusynchronisierung).
  * IP-Failover erfordert, dass sich beide Knoten im selben LAN oder erweiterten LAN (L2) befinden. Geroutete L3-Netzwerke werden nicht unterstützt (außer mit 🛠️ [Cloud-Load-Balancern](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-de app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-de app="KVM" mod="kvm"  %}}
 

## Schrittweise Konfiguration der SafeKit / KVM-Lösung {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-de app="KVM" mod="kvm"  %}}
 

## Demonstration einer Hochverfügbarkeitslösung auf VM-Ebene {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}