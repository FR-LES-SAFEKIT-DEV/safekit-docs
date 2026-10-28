---
title: "Haute disponibilité MariaDB avec SafeKit : Installez le module mysql.safe pour le basculement."
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Déployez le module mysql.safe pour SafeKit afin d'activer la réplication synchrone en temps réel et le basculement automatique de MariaDB sur Windows et Linux . Ce guide vous accompagne dans la configuration d'un cluster SANless à deux nœuds pour les applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour MariaDB et SafeKit limitations de haute disponibilité ; présentation de la solution SafeKit / MariaDB ; installation de la solution SafeKit / MariaDB sur Windows et Linux ( mysql.safe ) ; configuration pas à pas de la solution SafeKit / MariaDB ; démonstration de la solution SafeKit mirror ; hub de navigation haute disponibilité SafeKit"
---

# Haute disponibilité MariaDB avec SafeKit : Installez le module mysql.safe pour le basculement {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="MariaDB" mod="mysql"  %}}
 

## Présentation de la solution SafeKit / MariaDB {#overview-of-the-safekit--mariadb-solution}

La solution est décrite ici : ** 💡 [ Le plus simple MariaDB Haute disponibilité : Réplication synchrone à 2 nœuds et basculement ](</fr/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>) ** .

## Installation de la solution SafeKit / MariaDB sur Windows et Linux ( mysql.safe ) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Prérequis {#prerequisites}

  * Vous devez installer MariaDB sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-fr app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="MariaDB" mod="mysql"  %}}
 

## Configuration étape par étape de la solution SafeKit / MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-fr app="MariaDB" mod="mysql"  %}}
 

## Démonstration de la solution SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}