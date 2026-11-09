---
title: "Équilibrage de charge et basculement réseau NGINX : Installez le module farm.safe SafeKit"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Découvrez comment déployer le module farm.safe sous Windows et Linux pour l’équilibrage de charge réseau NGINX et le basculement automatique. Ce guide vous explique comment créer un cluster hautement disponible pour les services et applications Web à l’aide d’une adresse IP virtuelle, sans avoir besoin d’équilibreurs de charge matériels externes ou d’une configuration complexe."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour NGINX, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/NGINX, Installation de la solution SafeKit/NGINX sous Windows et Linux (farm.safe), Configuration pas à pas de la solution SafeKit/NGINX, Démonstration de la solution farm SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Équilibrage de charge et basculement réseau NGINX : Installez le module farm.safe SafeKit {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="NGINX" mod="farm"  %}}
 

## Présentation de la solution SafeKit/NGINX {#overview-of-the-safekit--nginx-solution}

La solution est décrite ici : **💡 [SafeKit : Logiciel tout-en-un d’équilibrage de charge et de haute disponibilité NGINX](</fr/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**.

## Installation de la solution SafeKit/NGINX sous Windows et Linux (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Prérequis {#prerequisites}

  * Vous devez avoir NGINX installé sur au moins deux nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-fr app="NGINX" mod="farm"  %}}
 

Remarque : le module générique **farm.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution SafeKit/NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-fr app="NGINX" mod="farm"  %}}
 

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}