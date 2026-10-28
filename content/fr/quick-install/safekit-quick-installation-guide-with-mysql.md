---
title: "Haute disponibilité MySQL avec SafeKit : Installez le module mysql.safe pour le basculement."
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "Déployez le module mysql.safe pour SafeKit afin d'activer la réplication synchrone en temps réel et le basculement automatique de MySQL sur Windows et Linux . Ce guide vous accompagne dans la configuration d'un cluster SANless à deux nœuds pour les applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour MySQL et SafeKit limitations de haute disponibilité ; présentation de la solution SafeKit / MySQL ; installation de la solution SafeKit / MySQL sur Windows et Linux ( mysql.safe ) ; configuration pas à pas de la solution serveur SafeKit / MySQL ; démonstration de la solution SafeKit mirror ; 🔍 Centre de navigation haute disponibilité SafeKit"
---

# Haute disponibilité MySQL avec SafeKit : Installez le module mysql.safe pour le basculement {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="MySQL" mod="mysql"  %}}
 

## Présentation de la solution SafeKit / MySQL {#overview-of-the-safekit--mysql-solution}

La solution est décrite ici : ** 💡 [ Le plus simple MySQL Haute disponibilité : Réplication synchrone à 2 nœuds et basculement ](</fr/solutions/mysql-high-availability-synchronous-replication-failover/>) ** .

## Installation de la solution SafeKit / MySQL sur Windows et Linux ( mysql.safe ) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### Prérequis {#prerequisites}

  * Vous devez installer MySQL sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-fr app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="MySQL" mod="mysql"  %}}
 

## Configuration étape par étape de la solution serveur SafeKit / MySQL {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-fr app="MySQL" mod="mysql"  %}}
 

## Démonstration de la solution SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}