---
title: "Installer SafeKit pour l’équilibrage de charge Apache"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "Guide pas à pas : installez le module SafeKit apache_farm.safe sous Windows ou Linux pour l’équilibrage de charge réseau et le basculement des serveurs web Apache."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Apache, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Apache, Installation de la solution SafeKit/Apache sous Windows et Linux (apachefarm.safe), Configuration pas à pas de la solution SafeKit/Apache, Démonstration de la solution farm SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--apache-solution, installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe, step-by-step-configuration-of-the-safekit--apache-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Installer SafeKit pour l’équilibrage de charge Apache {#install-safekit-for-apache-load-balancing}


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