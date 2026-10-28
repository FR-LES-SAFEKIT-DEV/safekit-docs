---
title: "Haute disponibilité de Milestone XProtect avec SafeKit : installez le module milestone.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Déployez le module milestone.safe de SafeKit pour activer la réplication synchrone en temps réel et le basculement automatique de Milestone XProtect sous Windows. Ce guide explique comment configurer un cluster SANless à 2 nœuds pour les applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour Milestone XProtect, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit / Milestone XProtect, Installation de la solution SafeKit / Milestone XProtect sous Windows (milestone.safe), Configuration étape par étape de la solution SafeKit / Milestone XProtect, Démonstration de la solution mirror SafeKit, 🔍 Hub de navigation haute disponibilité SafeKit"
---

# Haute disponibilité de Milestone XProtect avec SafeKit : installez le module milestone.safe pour le basculement {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Milestone XProtect" mod="milestone"  %}}


## Présentation de la solution SafeKit / Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

La solution est décrite ici : **💡[La haute disponibilité Milestone XProtect la plus simple : réplication synchrone à 2 nœuds et basculement](</fr/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installation de la solution SafeKit / Milestone XProtect sous Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Prérequis {#prerequisites}

  * Milestone XProtect Management et SQL doivent être installés sur 2 nœuds (machines virtuelles ou serveurs physiques). SQL Server et Event Server peuvent être externes ; voir les remarques ci-dessous.


ℹ️ Remarque : SQL Server peut être externe. Dans ce cas, à l'étape 4 de la configuration pas à pas de milestone.safe :

  * supprimez la réplication des dossiers SQL Data et Log,
  * supprimez le vérificateur de processus pour sqlservr.exe,
  * supprimez MSSQLServer de la macro SERVICES.


Vous pouvez assurer la redondance du SQL Server externe avec **💡[SafeKit et le module sqlserver.safe](</solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

Dans ce cas, sur les deux nœuds Management, configurez la [connexion de Milestone Management à SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) avec l'adresse IP virtuelle du module sqlserver.safe (clé de registre HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Remarque : Event Server peut être externe à Management Server.

Dans ce cas, vous avez 2 clusters avec 2 installations de milestone.safe : l'un pour le cluster Management, l'autre pour le cluster Event.

Pour le cluster Management, à l'étape 4 de la configuration pas à pas de milestone.safe :

  * supprimez MilestoneEventServerService de la macro SERVICES.


Et pour le cluster Event, à l'étape 4 de la configuration pas à pas de milestone.safe :

  * supprimez de la macro SERVICES : MSSQLServer, Milestone XProtect Management Server et Milestone XProtect Log Server,
  * supprimez la réplication des dossiers SQL Data et Log,
  * supprimez le vérificateur de processus pour sqlservr.exe,
  * pendant la configuration pas à pas, [enregistrez](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) Event Server avec l'adresse IP virtuelle du **cluster Management** (ou installez Event Server depuis Download Manager et définissez l'adresse IP virtuelle du **cluster Management** pendant l'installation),
  * dans Milestone management client, définissez Event Server avec l'adresse IP virtuelle du **cluster Event** dans [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redondance des enregistreurs {#ℹ-recorder-redundancy}

  * La réplication des enregistreurs ne convient pas à SafeKit en raison du volume de données.
  * La solution intégrée à Milestone peut être utilisée (serveur d'enregistrement de basculement sans réplication en temps réel).
  * Deux enregistreurs peuvent également fonctionner en configuration active/active, avec une répartition des caméras afin de ne pas perdre toutes celles d'une même zone en cas de panne.
  * Le flux de chaque caméra peut aussi être envoyé à deux enregistreurs avec la solution [Vega / RMF](<https://vega25.com/>).


ℹ️ En cas de migration de Milestone de la version N vers la version N+1 dans un cluster SafeKit, lisez cet article : 🛠️ [Migration de Milestone Management avec SafeKit](</quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-fr app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Milestone XProtect and SQL" mod="milestone"  %}}


## Configuration pas à pas de la solution SafeKit / Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-fr app="Milestone XProtect and SQL" mod="milestone"  %}}


## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
