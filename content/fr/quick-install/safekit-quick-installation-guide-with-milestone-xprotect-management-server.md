---
title: "Haute disponibilité Milestone XProtect avec SafeKit : installez le module milestone.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Déployez le module milestone.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique de Milestone XProtect sous Windows. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour des applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Milestone XProtect, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Milestone XProtect, Installation de la solution SafeKit/Milestone XProtect sous Windows (milestone.safe), Configuration pas à pas de la solution SafeKit/Milestone XProtect, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Milestone XProtect avec SafeKit : installez le module milestone.safe pour le basculement {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Milestone XProtect" mod="milestone"  %}}
 

## Présentation de la solution SafeKit/Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

La solution est décrite ici : **💡 [La solution la plus simple pour une haute disponibilité Milestone XProtect : réplication synchrone et basculement à 2 nœuds](</fr/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installation de la solution SafeKit/Milestone XProtect sous Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Prérequis {#prerequisites}

  * Vous devez installer Milestone XProtect Management et SQL sur 2 nœuds (machines virtuelles ou serveurs physiques). SQL Server et Event Server peuvent être externes, voir les notes ci-dessous.


ℹ️ Remarque : SQL Server peut être externe. Dans ce cas, à l’étape 4 lors de la configuration pas à pas de milestone.safe :

  * supprimer la réplication des dossiers de données et de journaux SQL,
  * Supprimez le vérificateur de processus sur sqlservr.exe
  * Supprimez MSSQLServer de la macro SERVICES.


Vous pouvez mettre en œuvre la redondance du SQL Server externe avec 💡 [SafeKit et le module sqlserver.safe](</fr/solutions/sql-server-high-availability-synchronous-replication-failover/>).

Dans ce cas, sur les deux nœuds de gestion, configurez la [connexion de Milestone Management à SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) avec l’adresse IP virtuelle du module sqlserver.safe (clé de registre HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Remarque : Le serveur d’événements peut être externe au serveur de gestion.

Dans ce cas, vous avez 2 clusters avec 2 installations de milestone.safe : un pour le cluster de gestion, l’autre pour le cluster d’événements.

Pour le groupe de gestion, à l’étape 4 de la configuration pas à pas de milestone.safe :

  * Supprimez MilestoneEventServerService de la macro SERVICES.


Et pour le groupe d’événements, à l’étape 4 lors de la configuration pas à pas de milestone.safe :

  * Supprimer de la macro SERVICES : MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * supprimer la réplication des dossiers de données et de journaux SQL,
  * Supprimez le vérificateur de processus sur sqlservr.exe
  * pendant la configuration pas à pas, [enregistrez](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) le serveur d’événements avec l’adresse IP virtuelle du **cluster de gestion** (ou installez le serveur d’événements à partir du gestionnaire de téléchargement et définissez l’adresse IP virtuelle du **cluster de gestion** pendant l’installation),
  * Dans le client de gestion Milestone, configurez le serveur d’événements avec l’adresse IP virtuelle du **cluster d’événements** dans les [services enregistrés](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redondance de l’enregistreur {#ℹ-recorder-redundancy}

  * La réplication des enregistreurs n’est pas adaptée à SafeKit en raison du volume de données.
  * La solution intégrée à Milestone peut être utilisée (serveur d’enregistrement de secours sans réplication en temps réel).
  * Deux enregistreurs peuvent également fonctionner dans une configuration active/active et les caméras sont réparties de manière à ne pas perdre toutes les caméras de la même zone en cas de panne.
  * Le flux de chaque caméra peut également être envoyé à deux enregistreurs avec la solution [Vega / RMF](<https://vega25.com/>).


ℹ️ En cas de migration de Milestone de la version N à la version N+1 dans un cluster SafeKit, lisez cet article : 🛠️ [Migration de la gestion Milestone avec SafeKit](</fr/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-fr app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Configuration pas à pas de la solution SafeKit/Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-fr app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}