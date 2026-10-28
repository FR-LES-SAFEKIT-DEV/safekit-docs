---
title: "Haute disponibilité Microsoft SQL Server avec SafeKit : Installez le module sqlserver.safe pour le basculement."
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Déployez le module sqlserver.safe pour SafeKit afin d'activer la réplication synchrone en temps réel et le basculement automatique pour Microsoft SQL Server . Ce guide vous accompagne dans la configuration d'un cluster SANless à deux nœuds pour les applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour Microsoft , SQL Server et SafeKit limitations de haute disponibilité, présentation des solutions SafeKit , Microsoft SQL Server , installation des solutions SafeKit , Microsoft SQL Server sur Windows ( sqlserver.safe ), configuration pas à pas des solutions SafeKit , Microsoft et SQL Server , démonstration des solutions SafeKit mirror , et hub de navigation haute disponibilité SafeKit"
---

# Haute disponibilité Microsoft SQL Server avec SafeKit : Installez le module sqlserver.safe pour le basculement {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Présentation de la solution SafeKit / Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Pour une présentation détaillée de la solution, voir ** 💡 [ Le plus simple Microsoft SQL Server Haute disponibilité : réplication synchrone à 2 nœuds et basculement ](</solutions/sql-server-high-availability-synchronous-replication-failover/>) ** .

## Installation de la solution SafeKit / Microsoft SQL Server sur Windows ( sqlserver.safe ) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Prérequis {#prerequisites}

  * Vous devez installer Microsoft SQL Server sur 2 nœuds (machines virtuelles ou serveurs physiques).
  * SafeKit fonctionne avec toutes les versions de SQL, y compris SQL Express.


  * Les bases de données système SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (telles que master.mdf et mastlog.ldf) doivent se trouver dans les mêmes répertoires sur les deux nœuds. La réplication de ces répertoires sera configurée à l'étape 4 de la procédure de configuration pas à pas.
  * SQL doit également être installé au même emplacement dans le système de fichiers sur les deux nœuds, car la base de données de ressources SQL en lecture seule [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) se trouve dans le binaire et est nécessaire au basculement. Cette base de données n'a pas besoin d'être répliquée.
  * Les bases de données utilisateur SQL (.mdf et .ldf) doivent se trouver dans les mêmes répertoires sur les deux nœuds. La réplication de ces répertoires sera configurée à l'étape 4 de la procédure de configuration pas à pas.



{{%  insert-safekit-installation-package-windows-fr app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configuration étape par étape de la solution SafeKit / Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-fr app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Démonstration de la solution SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}