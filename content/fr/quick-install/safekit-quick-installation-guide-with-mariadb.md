---
title: "Haute disponibilité MariaDB avec SafeKit : installer le module mysql.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Guide pas à pas : installez le module SafeKit mysql.safe pour la réplication en temps réel et le basculement automatique de MariaDB sous Windows ou Linux."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour MariaDB, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/MariaDB, Installation de la solution SafeKit/MariaDB sous Windows et Linux (mysql.safe), Configuration pas à pas de la solution SafeKit/MariaDB, Démonstration de la solution mirror SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--mariadb-solution, installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe, step-by-step-configuration-of-the-safekit--mariadb-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Haute disponibilité MariaDB avec SafeKit : installer le module mysql.safe pour le basculement {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="MariaDB" mod="mysql"  %}}
 

## Présentation de la solution SafeKit/MariaDB {#overview-of-the-safekit--mariadb-solution}

La solution est décrite ici : **💡 [La haute disponibilité MariaDB la plus simple : réplication synchrone et basculement à 2 nœuds](</fr/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Installation de la solution SafeKit/MariaDB sous Windows et Linux (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Prérequis {#prerequisites}

  * Vous devez installer MariaDB sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-fr app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="MariaDB" mod="mysql"  %}}
 

## Configuration pas à pas de la solution SafeKit/MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-fr app="MariaDB" mod="mysql"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}