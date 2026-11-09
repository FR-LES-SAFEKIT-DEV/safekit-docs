---
title: "Équilibrage de charge et basculement réseau Windows : installer le module SafeKit farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/"
description: "Découvrez comment déployer le module farm.safe pour l’équilibrage de charge réseau Windows et le basculement automatique. Ce guide vous explique comment créer un cluster hautement disponible pour les services et applications Web à l’aide d’une adresse IP virtuelle, sans avoir besoin d’équilibreurs de charge matériels externes ou d’une configuration complexe."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Windows, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Windows, Installation de la solution SafeKit/Windows (farm.safe), Configuration pas à pas de la solution SafeKit/Windows, Démonstration de la solution farm SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Équilibrage de charge et basculement réseau Windows : installer le module SafeKit farm.safe {#windows-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="Windows" mod="farm"  %}}
 

## Présentation de la solution SafeKit/Windows {#overview-of-the-safekit--windows-solution}

La solution est décrite ici : **💡 [SafeKit : Logiciel tout-en-un d’équilibrage de charge et de haute disponibilité Windows](</fr/solutions/windows-load-balancing-failover/>)**.

## Installation de la solution SafeKit/Windows (farm.safe) {#installation-of-the-safekit--windows-solution-farmsafe}

### Prérequis {#prerequisites}

  * L’application que vous souhaitez installer dans une <span class="notranslate farm-term" translate="no">farm</span> doit être installée sur au moins deux nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="" mod="farm"  %}}
 

Remarque : le module générique **farm.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution SafeKit/Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-farm-configuration-fr app="Windows" mod="farm"  %}}
 

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}