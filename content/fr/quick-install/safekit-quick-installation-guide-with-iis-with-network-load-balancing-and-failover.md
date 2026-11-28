---
title: "Installer SafeKit pour l’équilibrage de charge IIS"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Guide pas à pas : installez le module SafeKit iis_farm.safe sous Windows pour l’équilibrage de charge réseau et le basculement des serveurs web IIS sur une IP virtuelle."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour IIS, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/IIS, Installation de la solution SafeKit/IIS sous Windows (iisfarm.safe), Configuration pas à pas de la solution SafeKit/IIS, Démonstration de la solution farm SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--iis-solution, installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe, step-by-step-configuration-of-the-safekit--iis-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Installer SafeKit pour l’équilibrage de charge IIS {#install-safekit-for-iis-load-balancing}


{{%  insert-safekit-farm-guide-fr app="IIS" mod="iis_farm"  %}}
 

## Présentation de la solution SafeKit/IIS {#overview-of-the-safekit--iis-solution}

La solution est décrite ici : **💡 [SafeKit : Logiciel tout-en-un d’équilibrage de charge et de haute disponibilité IIS](</fr/solutions/iis-load-balancing-failover/>)**.

## Installation de la solution SafeKit/IIS sous Windows (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Prérequis {#prerequisites}

  * Vous devez avoir IIS installé sur au moins deux nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="IIS" mod="iis_farm"  %}}
 

## Configuration pas à pas de la solution SafeKit/IIS {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-fr app="IIS" mod="iis_farm"  %}}
 

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-fr  %}}