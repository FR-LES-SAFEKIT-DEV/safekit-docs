---
title: "Haute disponibilité PostgreSQL avec SafeKit : installer le module postgresql.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Déployez le module postgresql.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique de PostgreSQL sous Windows et Linux. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour des applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour PostgreSQL, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/PostgreSQL, Installation de la solution SafeKit/PostgreSQL sous Windows et Linux (postgresql.safe), Configuration pas à pas de la solution SafeKit/PostgreSQL, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité PostgreSQL avec SafeKit : installer le module postgresql.safe pour le basculement {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Présentation de la solution SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

La solution est décrite ici : **💡 [La haute disponibilité PostgreSQL la plus simple : réplication synchrone et basculement à 2 nœuds](</fr/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installation de la solution SafeKit/PostgreSQL sous Windows et Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Prérequis {#prerequisites}

  * Vous devez avoir PostgreSQL installé sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-windows-fr app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-fr app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-fr app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-fr app="PostgreSQL" mod="postgresql"  %}}
 

## Configuration pas à pas de la solution SafeKit/PostgreSQL {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-fr app="PostgreSQL" mod="postgresql"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}