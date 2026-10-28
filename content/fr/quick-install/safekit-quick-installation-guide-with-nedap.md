---
title: "Haute disponibilité Nedap avec SafeKit : Installez le module nedap.safe pour le basculement."
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Déployez le module nedap.safe pour SafeKit afin d'activer la réplication synchrone en temps réel et le basculement automatique de Nedap sur Windows . Ce guide vous accompagne dans la configuration d'un cluster SANless à deux nœuds pour les applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour Nedap et SafeKit limitations de haute disponibilité ; présentation de la solution SafeKit / Nedap ; installation de la solution SafeKit / Nedap sur Windows ( nedap.safe ) ; configuration pas à pas de la solution SafeKit / Nedap ; démonstration de la solution SafeKit mirror ; hub de navigation haute disponibilité SafeKit"
---

# Haute disponibilité Nedap avec SafeKit : Installez le module nedap.safe pour le basculement {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Nedap" mod="nedap"  %}}
 

**📘 [ Configuration de Nedap AOES avec SafeKit (PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)** : tous les détails sont dans ce document.

## Présentation de la solution SafeKit / Nedap {#overview-of-the-safekit--nedap-solution}

La solution est décrite ici : **💡 [ Le plus simple Nedap Haute disponibilité : Réplication synchrone à 2 nœuds et basculement ](</fr/solutions/nedap-high-availability-synchronous-replication-failover/>)** .

## Installation de la solution SafeKit / Nedap sur Windows ( nedap.safe ) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Prérequis {#prerequisites}

  * Vous devez installer Nedap AEOS et SQL sur 2 nœuds (machines virtuelles ou serveurs physiques).
  * Si SQL Server se trouve sur le même nœud que Nedap AEOS, configurez la connexion de Nedap AEOS à SQL avec l'adresse IP virtuelle et non avec l'adresse IP physique du serveur. Sinon, le basculement ne fonctionnera pas. SQL Server peut être externe ; voir la note ci-dessous.


ℹ️ Remarque : SQL Server peut être externe. Dans ce cas, à l’étape 4 de la configuration pas à pas :

  * Supprimer la réplication des dossiers de données et de journalisation SQL.
  * supprimer le vérificateur de processus sur sqlservr.exe ,
  * Supprimez MSSQLServer de la macro SERVICES.


Vous pouvez implémenter la redondance du module externe SQL Server avec les modules [ SafeKit et sqlserver.safe , ainsi que le module ](</fr/solutions/sql-server-high-availability-synchronous-replication-failover/>) . Dans ce cas, configurez la connexion de Nedap AEOS à SQL avec l'adresse IP virtuelle du module sqlserver.safe .


{{%  insert-safekit-installation-package-windows-fr app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Configuration étape par étape de la solution SafeKit / Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-fr app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Démonstration de la solution SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}