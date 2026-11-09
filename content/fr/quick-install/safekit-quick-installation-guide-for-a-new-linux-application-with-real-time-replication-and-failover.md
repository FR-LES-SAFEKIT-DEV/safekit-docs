---
title: "Haute disponibilité Linux avec SafeKit : installer le module mirror.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Déployez le module mirror.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique sur Linux. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour des applications Linux critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Linux, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Linux, Installation de la solution SafeKit/Linux (mirror.safe), Configuration pas à pas de la solution SafeKit/Linux, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Linux avec SafeKit : installer le module mirror.safe pour le basculement {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Linux" mod="mirror"  %}}
 

## Présentation de la solution SafeKit/Linux {#overview-of-the-safekit--linux-solution}

La solution est décrite ici : **💡 [La haute disponibilité Linux la plus simple : réplication synchrone et basculement à 2 nœuds](</fr/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## Installation de la solution SafeKit/Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Prérequis {#prerequisites}

  * L’application que vous souhaitez redémarrer dans SafeKit doit être installée sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}
 

Remarque : le module générique **mirror.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-fr app="Linux" mod="mirror"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-fr  %}}