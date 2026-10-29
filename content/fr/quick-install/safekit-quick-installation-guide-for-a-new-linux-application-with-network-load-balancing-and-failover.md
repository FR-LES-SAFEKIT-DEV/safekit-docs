---
title: "Répartition de charge réseau et reprise sur panne sous Linux : installer le module SafeKit farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Découvrez comment déployer le module farm.safe pour la répartition de charge réseau et la reprise automatique sur panne sous Linux. Ce guide vous montre comment construire un cluster hautement disponible pour des services web et des applications avec une IP virtuelle, sans répartiteur de charge matériel externe ni configuration complexe."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide de la haute disponibilité pour Linux, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit / Linux, Installation de la solution SafeKit / Linux (farm.safe), Configuration pas à pas de la solution SafeKit / Linux, Démonstration de la solution SafeKit <span class="notranslate farm-term" translate="no">farm</span>, 🔍 Portail de navigation SafeKit haute disponibilité"
---

# Répartition de charge réseau et reprise sur panne sous Linux : installer le module SafeKit farm.safe {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="Linux" mod="farm"  %}}
 

## Présentation de la solution SafeKit / Linux {#overview-of-the-safekit--linux-solution}

La solution est décrite ici : **💡[SafeKit : logiciel tout-en-un de répartition de charge et de haute disponibilité pour Linux](</fr/solutions/linux-load-balancing-failover/>)**.

## Installation de la solution SafeKit / Linux (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### Prérequis {#prerequisites}

  * Vous devez avoir installé l'application que vous voulez placer dans une <span class="notranslate farm-term" translate="no">farm</span> sur au moins 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-linux-fr app="" mod="farm"  %}}
 

Remarque : le module générique **farm.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution SafeKit / Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-fr app="Linux" mod="farm"  %}}
 

## Démonstration de la solution SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-fr  %}}
