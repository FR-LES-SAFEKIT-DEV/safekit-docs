---
title: "Haute disponibilité Microsoft SQL Server avec SafeKit : installer le module sqlserver.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Déployez le module sqlserver.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique pour Microsoft SQL Server. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour des applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Microsoft SQL Server, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Microsoft SQL Server, Installation de la solution SafeKit/Microsoft SQL Server sous Windows (sqlserver.safe), Configuration pas à pas de la solution SafeKit/Microsoft SQL Server, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Microsoft SQL Server avec SafeKit : installer le module sqlserver.safe pour le basculement {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Présentation de la solution SafeKit/Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Pour une présentation détaillée de la solution, consultez **💡 [La haute disponibilité la plus simple Microsoft SQL Server : réplication synchrone et basculement à 2 nœuds](</fr/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## Installation de la solution SafeKit/Microsoft SQL Server sous Windows (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Prérequis {#prerequisites}

  * Vous devez avoir Microsoft SQL Server installé sur 2 nœuds (machines virtuelles ou serveurs physiques).
  * SafeKit fonctionne avec toutes les versions de SQL, y compris SQL Express.


  * Les [bases de données système SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (comme master.mdf et mastlog.ldf) doivent se trouver dans les mêmes répertoires sur les deux nœuds. Les répertoires seront configurés comme répliqués à l’étape 4 de la configuration étape par étape.
  * SQL doit également être installé au même emplacement dans le système de fichiers sur les deux nœuds, car la [base de données de ressources SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) en lecture seule est située dans le fichier binaire et est nécessaire pour le basculement. Cette base de données n’a pas besoin d’être répliquée.
  * Les bases de données utilisateur SQL (.mdf et .ldf) doivent se trouver dans les mêmes répertoires sur les deux nœuds. Les répertoires seront configurés comme répliqués à l’étape 4 de la configuration étape par étape.



{{%  insert-safekit-installation-package-windows-fr app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configuration pas à pas de la solution SafeKit/Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-fr app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}