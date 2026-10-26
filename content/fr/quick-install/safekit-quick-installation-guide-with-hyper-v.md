---
title: "Haute disponibilité Hyper-V avec SafeKit : installez le module
  hyperv.safe pour le basculement"
canonical: https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: Découvrez la configuration de hyperv.safe pour un cluster Hyper-V
  actif/actif avec SafeKit. Obtenez une haute disponibilité au niveau de la VM
  avec une architecture sans partage à 2 nœuds. Répliquez de manière synchrone
  plusieurs machines virtuelles sur des nœuds pour un basculement automatique
  sans le coût d'un SAN ou d'un stockage partagé.
category: quick-install
lang: fr
topics: Guide d'installation rapide haute disponibilité pour Hyper-V,
  Limitations de la haute disponibilité SafeKit, Présentation de la solution
  SafeKit / Hyper-V, Installation de la solution SafeKit / Hyper-V sous Windows
  (hyperv.safe), Configuration étape par étape de la solution SafeKit / Hyper-V,
  Démonstration de la solution SafeKit / Hyper-V, 🔍 Hub de navigation haute
  disponibilité SafeKit
---

# Haute disponibilité Hyper-V avec SafeKit : installez le module hyperv.safe pour le basculement {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Hyper-V" mod="hyperv"  %}}
 

## Présentation de la solution SafeKit / Hyper-V {#overview-of-the-safekit--hyper-v-solution}

La solution est décrite ici : **💡[Simple Hyper-V Haute disponibilité sans stockage partagé (SAN)](</solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installation de la solution SafeKit / Hyper-V sur Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Conditions préalables {#prerequisites}

  * Rôle Hyper-V installé sur 2 nœuds Windows (intégré gratuitement dans toutes les versions de Windows, y compris Windows pour PC).
  * Applications critiques installées dans une ou plusieurs machines virtuelles.
  * Maximum 32 machines virtuelles par hôte Hyper-V.
  * Total des données répliquées limité à quelques téraoctets ; au-delà, le temps de resynchronisation devient important.
  * Interconnexion minimale de 1 Gbit/s entre les nœuds (10 Gbit/s recommandés pour une resynchronisation plus rapide).
  * Le basculement IP nécessite les deux nœuds sur le même LAN ou le même LAN étendu (L2) — les réseaux L3 routés ne sont pas pris en charge (sauf avec 🛠️ [équilibrages de charge cloud](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-fr  %}}

{{%  insert-safekit-installation-package-windows-fr app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Hyper-V" mod="hyperv"  %}}
 

## Configuration pas à pas de la solution SafeKit / Hyper-V {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-fr app="Hyper-V" mod="hyperv"  %}}
 

## Démonstration de la solution SafeKit / Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}