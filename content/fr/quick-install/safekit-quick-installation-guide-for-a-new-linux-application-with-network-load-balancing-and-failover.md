---
title: "Équilibrage de charge et basculement réseau Linux : installer le module farm.safe SafeKit"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Découvrez comment déployer le module farm.safe pour l’équilibrage de charge réseau Linux et le basculement automatique. Ce guide vous explique comment créer un cluster hautement disponible pour les services et applications Web à l’aide d’une adresse IP virtuelle, sans avoir besoin d’équilibrage de charge matériel externe ou d’une configuration complexe."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Linux, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Linux, Installation de la solution SafeKit/Linux (farm.safe), Configuration pas à pas de la solution SafeKit/Linux, Démonstration de la solution farm SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Équilibrage de charge et basculement réseau Linux : installer le module farm.safe SafeKit {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="Linux" mod="farm"  %}}
 

## Présentation de la solution SafeKit/Linux {#overview-of-the-safekit--linux-solution}

La solution est décrite ici : **💡 [SafeKit : Logiciel tout-en-un d’équilibrage de charge et de haute disponibilité Linux](</fr/solutions/linux-load-balancing-failover/>)**.

## Installation de la solution SafeKit/Linux (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### Prérequis {#prerequisites}

  * L’application que vous souhaitez installer dans une <span class="notranslate farm-term" translate="no">farm</span> doit être installée sur au moins deux nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-linux-fr app="" mod="farm"  %}}
 

Remarque : le module générique **farm.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-fr app="Linux" mod="farm"  %}}
 

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-fr  %}}