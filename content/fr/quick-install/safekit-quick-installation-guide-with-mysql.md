---
title: "Installer SafeKit pour la haute disponibilité MySQL (mysql.safe)"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "Guide pas à pas : installez le module SafeKit mysql.safe pour la réplication en temps réel et le basculement automatique de MySQL sous Windows ou Linux."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour MySQL, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/MySQL, Installation de la solution SafeKit/MySQL sous Windows et Linux (mysql.safe), Configuration pas à pas de la solution SafeKit / serveur MySQL, Démonstration de la solution mirror SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--mysql-solution, installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe, step-by-step-configuration-of-the-safekit--mysql-server-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Installer SafeKit pour la haute disponibilité MySQL (mysql.safe) {#install-safekit-for-mysql-high-availability-mysqlsafe}


{{%  insert-safekit-mirror-guide-fr app="MySQL" mod="mysql"  %}}
 

## Présentation de la solution SafeKit/MySQL {#overview-of-the-safekit--mysql-solution}

La solution est décrite ici : **💡 [La haute disponibilité MySQL la plus simple : réplication synchrone et basculement à 2 nœuds](</fr/solutions/mysql-high-availability-synchronous-replication-failover/>)**.

## Installation de la solution SafeKit/MySQL sous Windows et Linux (mysql.safe) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### Prérequis {#prerequisites}

  * Vous devez avoir MySQL installé sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-fr app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="MySQL" mod="mysql"  %}}
 

## Configuration pas à pas de la solution SafeKit / serveur MySQL {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-fr app="MySQL" mod="mysql"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}