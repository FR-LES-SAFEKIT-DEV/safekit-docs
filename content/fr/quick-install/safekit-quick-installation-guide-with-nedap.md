---
title: "Haute disponibilité Nedap avec SafeKit : Installez le module nedap.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Déployez le module nedap.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique de Nedap sous Windows. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour des applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Nedap, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Nedap, Installation de la solution SafeKit/Nedap sous Windows (nedap.safe), Configuration pas à pas de la solution SafeKit/Nedap, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Nedap avec SafeKit : Installez le module nedap.safe pour le basculement {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Nedap" mod="nedap"  %}}
 

**📘 [Configuration de Nedap AOES avec SafeKit (PDF)](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)** : tous les détails se trouvent dans ce document.

## Présentation de la solution SafeKit/Nedap {#overview-of-the-safekit--nedap-solution}

La solution est décrite ici : **💡 [La haute disponibilité Nedap la plus simple : réplication synchrone et basculement à 2 nœuds](</fr/solutions/nedap-high-availability-synchronous-replication-failover/>)**.

## Installation de la solution SafeKit/Nedap sous Windows (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Prérequis {#prerequisites}

  * Vous devez installer Nedap AEOS et SQL sur 2 nœuds (machines virtuelles ou serveurs physiques).
  * Avec SQL Server sur le même nœud que Nedap AEOS, configurez la connexion de Nedap AEOS à SQL avec l’adresse IP virtuelle et non avec l’adresse IP physique du serveur. Sinon, le basculement ne fonctionnera pas. SQL Server peut être externe, voir la note ci-dessous.


ℹ️ Remarque : SQL Server peut être externe. Dans ce cas, à l’étape 4 de la configuration pas à pas :

  * supprimer la réplication des dossiers de données et de journaux SQL,
  * Supprimez le vérificateur de processus sur sqlservr.exe
  * Supprimez MSSQLServer de la macro SERVICES.


Vous pouvez mettre en œuvre la redondance du SQL Server externe avec 💡 [SafeKit et le module sqlserver.safe](</fr/solutions/sql-server-high-availability-synchronous-replication-failover/>). Dans ce cas, configurez la connexion de Nedap AEOS à SQL avec l’adresse IP virtuelle du module sqlserver.safe.


{{%  insert-safekit-installation-package-windows-fr app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Configuration pas à pas de la solution SafeKit/Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-fr app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}