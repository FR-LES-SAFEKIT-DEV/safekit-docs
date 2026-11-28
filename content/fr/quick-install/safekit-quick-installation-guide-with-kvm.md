---
title: "Installer SafeKit pour la haute disponibilité KVM"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Guide pas à pas : installez le module SafeKit kvm.safe pour la haute disponibilité des VM, avec réplication et basculement des machines virtuelles KVM sous Linux."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour KVM, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/KVM, Installation de la solution SafeKit/KVM sous Linux (kvm.safe), Configuration pas à pas de la solution SafeKit/KVM, Démonstration d’une solution de haute disponibilité au niveau des machines virtuelles"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--kvm-solution, installation-of-the-safekit--kvm-solution-on-linux-kvmsafe, step-by-step-configuration-of-the-safekit--kvm-solution, demonstration-of-a-vm-level-high-availability-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Installer SafeKit pour la haute disponibilité KVM {#install-safekit-for-kvm-high-availability}


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