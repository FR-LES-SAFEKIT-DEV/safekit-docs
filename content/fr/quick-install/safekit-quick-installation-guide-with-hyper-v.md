---
title: "Haute disponibilité Hyper-V avec SafeKit : installer le module hyperv.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "Découvrez comment configurer hyperv.safe pour un cluster Hyper-V actif/actif avec SafeKit. Atteignez une haute disponibilité au niveau des machines virtuelles avec une architecture à deux nœuds sans partage. Répliquez de manière synchrone plusieurs machines virtuelles sur les nœuds pour un basculement automatique sans le coût d’un SAN ou d’un stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Hyper-V, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Hyper-V, Installation de la solution SafeKit/Hyper-V sous Windows (hyperv.safe), Configuration pas à pas de la solution SafeKit/Hyper-V, Démonstration de la solution SafeKit/Hyper-V, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Hyper-V avec SafeKit : installer le module hyperv.safe pour le basculement {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Hyper-V" mod="hyperv"  %}}
 

## Présentation de la solution SafeKit/Hyper-V {#overview-of-the-safekit--hyper-v-solution}

La solution est décrite ici : **💡 [Haute disponibilité Hyper-V simplifiée sans stockage partagé (SAN)](</fr/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installation de la solution SafeKit/Hyper-V sous Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Prérequis {#prerequisites}

  * Rôle Hyper-V installé sur 2 nœuds Windows (intégré gratuitement dans toutes les versions Windows, y compris Windows pour PC).
  * Applications critiques installées dans une ou plusieurs machines virtuelles.
  * Maximum de 32 machines virtuelles par hôte Hyper-V.
  * Les données répliquées sont limitées à quelques téraoctets. Au-delà, le temps de resynchronisation devient important.
  * Interconnexion d’au moins 1 Gb/s entre les nœuds (10 Gb/s recommandé pour une resynchronisation plus rapide).
  * Le basculement IP nécessite que les deux nœuds soient sur le même LAN ou LAN étendu (L2) — les réseaux L3 routés ne sont pas pris en charge (sauf avec les équilibreurs de charge 🛠️ [cloud](</fr/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-fr  %}}

{{%  insert-safekit-installation-package-windows-fr app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Hyper-V" mod="hyperv"  %}}
 

## Configuration pas à pas de la solution SafeKit/Hyper-V {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-fr app="Hyper-V" mod="hyperv"  %}}
 

## Démonstration de la solution SafeKit/Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}