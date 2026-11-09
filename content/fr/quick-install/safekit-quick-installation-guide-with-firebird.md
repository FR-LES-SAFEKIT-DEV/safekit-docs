---
title: "Haute disponibilité Firebird avec SafeKit : Installez le module firebird.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "Déployez le module firebird.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique de Firebird sous Windows et Linux. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour des applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Firebird, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Firebird, Installation de la solution SafeKit/Firebird sous Windows et Linux (firebird.safe), Configuration pas à pas de la solution SafeKit/Firebird, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Firebird avec SafeKit : Installez le module firebird.safe pour le basculement {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Firebird" mod="firebird"  %}}
 

## Présentation de la solution SafeKit/Firebird {#overview-of-the-safekit--firebird-solution}

La solution est décrite ici : **💡 [La haute disponibilité la plus simple Firebird : réplication synchrone et basculement à 2 nœuds](</fr/solutions/firebird-high-availability-synchronous-replication-failover/>)**.

## Installation de la solution SafeKit/Firebird sous Windows et Linux (firebird.safe) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### Prérequis {#prerequisites}

  * Vous devez avoir Firebird installé sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-fr app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="Firebird" mod="firebird"  %}}
 

## Configuration pas à pas de la solution SafeKit/Firebird {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-fr app="Firebird" mod="firebird"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}