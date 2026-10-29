---
title: "Équilibrage de charge et basculement du réseau NGINX : Installez le module SafeKit farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Découvrez comment déployer le module farm.safe sur Windows et Linux pour l'équilibrage de charge réseau NGINX et le basculement automatique. Ce guide vous montre comment créer un cluster à haute disponibilité pour les services web et les applications utilisant une adresse IP virtuelle, sans avoir recours à des équilibreurs de charge matériels externes ni à une configuration complexe."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour NGINX, limitations de haute disponibilité SafeKit , présentation de la solution SafeKit / NGINX, installation de la solution SafeKit / NGINX sur Windows et Linux ( farm.safe ), configuration pas à pas de la solution SafeKit / NGINX, démonstration des solutions SafeKit farm , hub de navigation haute disponibilité SafeKit"
---

# Équilibrage de charge et basculement du réseau NGINX : Installez les modules SafeKit farm.safe {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="NGINX" mod="farm"  %}}
 

## Présentation de la solution SafeKit / NGINX {#overview-of-the-safekit--nginx-solution}

La solution est décrite ici : **💡 [ SafeKit : Logiciel tout-en-un d'équilibrage de charge et de haute disponibilité NGINX ](</fr/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)** .

## Installation de la solution SafeKit / NGINX sur Windows et Linux ( farm.safe ) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Prérequis {#prerequisites}

  * Vous devez installer NGINX sur au moins 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-fr app="NGINX" mod="farm"  %}}
 

Remarque : le module générique **farm.safe** que vous allez configurer est fourni dans le package.

## Configuration étape par étape de la solution SafeKit / NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-fr app="NGINX" mod="farm"  %}}
 

## Démonstration de la solution SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}