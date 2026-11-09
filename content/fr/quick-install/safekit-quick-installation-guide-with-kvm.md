---
title: "Haute disponibilité KVM avec SafeKit : Installez le module kvm.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Découvrez comment configurer kvm.safe pour un cluster KVM actif/actif avec SafeKit. Atteignez une haute disponibilité au niveau des machines virtuelles avec une architecture à 2 nœuds sans partage. Répliquez de manière synchrone plusieurs machines virtuelles sur les nœuds pour un basculement automatique sans le coût d’un SAN ou d’un stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour KVM, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/KVM, Installation de la solution SafeKit/KVM sous Linux (kvm.safe), Configuration pas à pas de la solution SafeKit/KVM, Démonstration d’une solution de haute disponibilité au niveau des machines virtuelles, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité KVM avec SafeKit : Installez le module kvm.safe pour le basculement {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="KVM" mod="kvm"  %}}
 

## Présentation de la solution SafeKit/KVM {#overview-of-the-safekit--kvm-solution}

La solution est décrite ici : **💡 [Haute disponibilité simple Linux KVM sans stockage partagé](</fr/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installation de la solution SafeKit/KVM sous Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Prérequis {#prerequisites}

  * KVM installé sur 2 nœuds Linux.
  * Applications critiques installées dans une ou plusieurs machines virtuelles.
  * Maximum de 32 machines virtuelles par hôte KVM.
  * Les données répliquées sont limitées à quelques téraoctets. Au-delà, le temps de resynchronisation devient important.
  * Interconnexion d’au moins 1 Gb/s entre les nœuds (10 Gb/s recommandé pour une resynchronisation plus rapide).
  * Le basculement IP nécessite que les deux nœuds soient sur le même LAN ou LAN étendu (L2) — les réseaux L3 routés ne sont pas pris en charge (sauf avec les équilibreurs de charge 🛠️ [cloud](</fr/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-fr app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="KVM" mod="kvm"  %}}
 

## Configuration pas à pas de la solution SafeKit/KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-fr app="KVM" mod="kvm"  %}}
 

## Démonstration d’une solution de haute disponibilité au niveau des machines virtuelles {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}