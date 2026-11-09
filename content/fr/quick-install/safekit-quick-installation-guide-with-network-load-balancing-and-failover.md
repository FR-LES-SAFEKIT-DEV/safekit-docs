---
title: "Équilibrage de charge et basculement réseau Apache : installer le module SafeKit apache_farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "Découvrez comment déployer le module apache_farm.safe sous Windows et Linux pour l’équilibrage de charge réseau Apache et le basculement automatique. Ce guide vous explique comment créer un cluster hautement disponible pour les services et applications Web à l’aide d’une adresse IP virtuelle, sans avoir besoin d’équilibreurs de charge matériels externes ou d’une configuration complexe."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Apache, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Apache, Installation de la solution SafeKit/Apache sous Windows et Linux (apache_farm.safe), Configuration pas à pas de la solution SafeKit/Apache, Démonstration de la solution farm SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Équilibrage de charge et basculement réseau Apache : installer le module SafeKit apache_farm.safe {#apache-network-load-balancing--failover-install-the-safekit-apache_farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="Apache" mod="apache_farm"  %}}
 

## Présentation de la solution SafeKit/Apache {#overview-of-the-safekit--apache-solution}

La solution est décrite ici : **💡 [SafeKit : Logiciel tout-en-un d’équilibrage de charge et de haute disponibilité Apache](</fr/solutions/apache-load-balancing-failover-2/>)**.

## Installation de la solution SafeKit/Apache sous Windows et Linux (apache_farm.safe) {#installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe}

### Prérequis {#prerequisites}

  * Vous devez avoir Apache installé sur au moins deux nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-installation-package-linux-fr app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="Apache" mod="apache_farm"  %}}
 

## Configuration pas à pas de la solution SafeKit/Apache {#step-by-step-configuration-of-the-safekit--apache-solution}


{{%  insert-safekit-82-farm-configuration-fr app="Apache" mod="apache_farm"  %}}
 

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-fr  %}}