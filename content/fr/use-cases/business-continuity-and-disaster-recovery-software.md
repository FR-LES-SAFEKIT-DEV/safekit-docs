---
title: "Logiciel de continuité d’activité et de reprise après sinistre pour les clusters à 2 nœuds avec SafeKit"
canonical: "https://safekit.eviden.com/fr/use-cases/business-continuity-and-disaster-recovery-software/"
description: "Continuité d’activité et reprise après sinistre avec SafeKit : un cluster à deux nœuds réparti sur deux salles serveurs, avec réplication synchrone et basculement automatique."
category: "use-cases"
lang: "fr"
topics: "Logiciel de continuité d’activité et de reprise après sinistre"
translation: "translate_md 2026-11-16.4 | glossaire 2026-11-16.12 | Translation LLM | 58 expressions"
image: "/wp-content/uploads/2023/02/remote-datacenters.png"
schemaType: "Article"
---

# Logiciel de continuité d’activité et de reprise après sinistre pour les clusters à 2 nœuds avec SafeKit {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## Logiciel de continuité d’activité et de reprise après sinistre {#business-continuity-and-disaster-recovery-software}

### Raisons de choisir le logiciel SafeKit pour la continuité d’activité et la reprise après sinistre {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![Logiciel simple de continuité d’activité et de reprise après sinistre avec SafeKit](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


La configuration est la même, que vous déployiez un cluster SafeKit dans une salle de serveurs ou dans deux salles de serveurs distantes. La seule exigence est un LAN étendu ou un VLAN étendu entre les sites distants.

### Comment mettre en œuvre une solution simple de haute disponibilité entre deux salles de serveurs distantes ? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

Avec SafeKit, vous pouvez facilement déployer le module mirror et le module <span class="notranslate farm-term" translate="no">farm</span> sur des serveurs situés dans des salles de serveurs distantes. Aucune configuration de cluster spéciale n’est nécessaire. SafeKit combine ainsi la continuité d’activité et la reprise après sinistre dans une architecture unique et simple. SafeKit gère également l’isolement du réseau sans serveur tiers ni disque de quorum spécial. En savoir plus sur [la gestion split brain](</fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Continuité d’activité ou solutions de sauvegarde {#business-continuity-vs-backup-solutions}

Les solutions de continuité d’activité et de sauvegarde répondent à différents scénarios de défaillance. Elles sont complémentaires et non interchangeables. Le clustering haute disponibilité SafeKit assure la continuité d’activité. Il maintient les applications en fonctionnement avec une interruption minimale en cas de défaillance d’un serveur ou d’une application, grâce à la réplication en temps réel et au basculement automatique. Les solutions de sauvegarde protègent contre des pertes plus importantes, telles que les attaques de rançongiciels ou les erreurs d’opérateur. Elles reposent généralement sur des copies de données hors site que vous restaurez ultérieurement. La récupération prend plus de temps et il n’y a pas de basculement automatique.

En savoir plus sur [la combinaison de la haute disponibilité SafeKit avec les sauvegardes de reprise après sinistre](</fr/best-practises/high-availability-disaster-recovery-hadr/>).


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}