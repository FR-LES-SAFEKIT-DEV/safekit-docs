---
title: "Haute disponibilité de KVM avec SafeKit : installez le module kvm.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Découvrez comment configurer kvm.safe pour un cluster KVM actif/actif avec SafeKit. Obtenez une haute disponibilité au niveau des machines virtuelles grâce à une architecture à deux nœuds sans stockage partagé. Répliquez plusieurs VM de manière synchrone entre les nœuds pour assurer un basculement automatique, sans le coût d’une baie SAN ni d’un stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide pour la haute disponibilité KVM, Limites de haute disponibilité de SafeKit, Présentation de la solution SafeKit / KVM, Installation de la solution SafeKit / KVM sur Linux (kvm.safe), Configuration étape par étape de la solution SafeKit / KVM, Démonstration d’une solution de haute disponibilité au niveau des VM, 🔍 Centre de navigation de la haute disponibilité SafeKit"
---

# Haute disponibilité KVM avec SafeKit : installer le module kvm.safe pour le basculement {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="KVM" mod="kvm"  %}}
 

## Présentation de la solution SafeKit / KVM {#overview-of-the-safekit--kvm-solution}

La solution est décrite ici : **💡[Haute disponibilité simple de KVM sous Linux sans stockage partagé](</fr/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installation de la solution SafeKit / KVM sur Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Conditions préalables {#prerequisites}

  * KVM installé sur deux nœuds Linux.
  * Applications critiques installées dans une ou plusieurs machines virtuelles.
  * Maximum de 32 machines virtuelles par hôte KVM.
  * Total des données répliquées limité à quelques téraoctets ; au-delà, le temps de resynchronisation devient important.
  * Interconnexion minimale de 1 Gbit/s entre les nœuds (10 Gbit/s recommandés pour une resynchronisation plus rapide).
  * Le basculement IP exige que les deux nœuds soient sur le même LAN ou un LAN étendu (L2) ; les réseaux L3 routés ne sont pas pris en charge (sauf avec des 🛠️ [équilibreurs de charge cloud](</fr/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-fr app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="KVM" mod="kvm"  %}}
 

## Configuration étape par étape de la solution SafeKit / KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-fr app="KVM" mod="kvm"  %}}
 

## Démonstration d'une solution de haute disponibilité de niveau VM {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}