---
title: "Haute disponibilité Firebird avec SafeKit : Installez le module firebird.safe pour le basculement."
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "Déployez le module firebird.safe pour SafeKit afin d'activer la réplication synchrone en temps réel et le basculement automatique de Firebird sur Windows et Linux . Ce guide vous accompagne dans la configuration d'un cluster SANless à deux nœuds pour les applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour Firebird et SafeKit limitations de haute disponibilité ; présentation de la solution SafeKit / Firebird ; installation de la solution SafeKit / Firebird sur Windows et Linux ( firebird.safe ) ; configuration pas à pas de la solution SafeKit / Firebird ; démonstration de la solution SafeKit mirror ; hub de navigation haute disponibilité SafeKit"
---

# Haute disponibilité Firebird avec SafeKit : Installez le module firebird.safe pour le basculement {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Firebird" mod="firebird"  %}}
 

## Présentation de la solution SafeKit / Firebird {#overview-of-the-safekit--firebird-solution}

La solution est décrite ici : ** 💡 [ Le plus simple Firebird Haute disponibilité : Réplication synchrone à 2 nœuds et basculement ](</fr/solutions/firebird-high-availability-synchronous-replication-failover/>) ** .

## Installation de la solution SafeKit / Firebird sur Windows et Linux ( firebird.safe ) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### Prérequis {#prerequisites}

  * Vous devez installer Firebird sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-fr app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="Firebird" mod="firebird"  %}}
 

## Configuration étape par étape de la solution SafeKit / Firebird {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-fr app="Firebird" mod="firebird"  %}}
 

## Démonstration de la solution SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}