---
title: "Équilibrage de charge et basculement du réseau Apache : installez le module SafeKit apache_farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "Découvrez comment déployer le module apache_farm.safe sous Windows et Linux pour l'équilibrage de charge réseau et le basculement automatique d'Apache. Ce guide vous montre comment créer un cluster à haute disponibilité pour vos services web et applications à l'aide d'une adresse IP virtuelle, sans avoir recours à des équilibreurs de charge matériels externes ni à une configuration complexe."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide de la haute disponibilité pour Apache, limitations de la haute disponibilité SafeKit, présentation de la solution SafeKit/Apache, installation de la solution SafeKit/Apache sous Windows et Linux (apache_farm.safe), configuration pas à pas de la solution SafeKit/Apache, démonstration de la solution SafeKit <span class="notranslate farm-term" translate="no">farm</span>, 🔍 Centre de navigation de la haute disponibilité SafeKit"
---

# Équilibrage de charge et basculement du réseau Apache : installez le module SafeKit apache_farm.safe {#apache-network-load-balancing--failover-install-the-safekit-apache_farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="Apache" mod="apache_farm"  %}}
 

## Présentation de la solution SafeKit / Apache {#overview-of-the-safekit--apache-solution}

La solution est décrite ici : **💡[SafeKit : Logiciel tout-en-un d'équilibrage de charge Apache et de haute disponibilité](</fr/solutions/apache-load-balancing-failover-2/>)**.

## Installation de la solution SafeKit / Apache sous Windows et Linux (apache_farm.safe) {#installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe}

### Prérequis {#prerequisites}

  * Vous devez installer Apache sur au moins 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-installation-package-linux-fr app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="Apache" mod="apache_farm"  %}}
 

## Configuration étape par étape de la solution SafeKit / Apache {#step-by-step-configuration-of-the-safekit--apache-solution}


{{%  insert-safekit-82-farm-configuration-fr app="Apache" mod="apache_farm"  %}}
 

## Démonstration de la solution SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-fr  %}}