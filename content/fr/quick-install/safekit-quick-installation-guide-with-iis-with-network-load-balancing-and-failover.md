---
title: "Équilibrage de charge réseau et basculement IIS : Installez le module SafeKit iis_farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Découvrez comment déployer le module iis_farm.safe sur Windows pour l'équilibrage de charge réseau et le basculement automatique sur IIS . Ce guide vous explique comment créer un cluster à haute disponibilité pour les services web et les applications utilisant une adresse IP virtuelle, sans avoir recours à des équilibreurs de charge matériels externes ni à une configuration complexe."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour IIS et SafeKit limitations de haute disponibilité ; présentation de la solution SafeKit / IIS ; installation de la solution SafeKit / IIS sur Windows ( iis_farm.safe ) ; configuration pas à pas de la solution SafeKit / IIS ; démonstration de la solution SafeKit <span class="notranslate farm-term" translate="no">farm</span> ; hub de navigation haute disponibilité SafeKit"
---

# Équilibrage de charge réseau et basculement IIS : Installez le module SafeKit iis_farm.safe {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="IIS" mod="iis_farm"  %}}
 

## Présentation de la solution SafeKit / IIS {#overview-of-the-safekit--iis-solution}

La solution est décrite ici : **💡 [ SafeKit : Logiciel tout-en-un IIS équilibrage de charge et de haute disponibilité ](</fr/solutions/iis-load-balancing-failover/>)** .

## Installation de la solution SafeKit / IIS sur Windows ( iis_farm.safe ) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Prérequis {#prerequisites}

  * Vous devez installer IIS sur au moins 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="IIS" mod="iis_farm"  %}}
 

## Configuration étape par étape de la solution SafeKit / IIS {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-fr app="IIS" mod="iis_farm"  %}}
 

## Démonstration de la solution SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-fr  %}}