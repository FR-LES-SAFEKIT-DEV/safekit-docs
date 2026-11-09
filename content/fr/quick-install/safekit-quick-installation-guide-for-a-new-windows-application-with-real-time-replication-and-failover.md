---
title: "Haute disponibilité Windows avec SafeKit : installez le module mirror.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Déployez le module mirror.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique sous Windows. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour les applications Windows critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Windows, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Windows, Installation sur les solutions SafeKit/Windows (mirror.safe), Configuration pas à pas de la solution SafeKit/Windows, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Windows avec SafeKit : installez le module mirror.safe pour le basculement {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Windows" mod="mirror"  %}}
 

## Présentation de la solution SafeKit/Windows {#overview-of-the-safekit--windows-solution}

La solution est décrite ici : **💡 [La haute disponibilité la plus simple Windows : réplication synchrone et basculement à 2 nœuds](</fr/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Installation sur les solutions SafeKit/Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Prérequis {#prerequisites}

  * L’application que vous souhaitez redémarrer dans SafeKit doit être installée sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="" mod="mirror"  %}}
 

Remarque : le module générique **mirror.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution SafeKit/Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-fr app="Windows" mod="mirror"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-fr  %}}