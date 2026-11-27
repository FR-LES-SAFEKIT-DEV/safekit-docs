---
title: "Logiciel de clustering actif-actif avec réplication en temps réel et basculement mutuel"
canonical: "https://safekit.eviden.com/fr/architectures/active-active-cluster-real-time-replication/"
description: "Cluster SafeKit actif-actif : deux serveurs se secourent mutuellement avec plusieurs modules mirror, réplication synchrone et basculement croisé sous Windows et Linux."
category: "architectures"
lang: "fr"
topics: "Comment fonctionne un cluster actif-actif avec réplication en temps réel ?"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
schemaType: "TechArticle"
---

# Logiciel de clustering actif-actif avec réplication en temps réel et basculement mutuel {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Comment fonctionne un cluster actif-actif avec réplication en temps réel ? {#how-the-active-active-cluster-with-real-time-replication-works}

### Cluster actif-actif avec réplication en temps réel {#active--active-cluster-with-real-time-replication}

Deux serveurs exécutent des applications et se sauvegardent mutuellement. C’est ce qu’on appelle le basculement mutuel : chaque serveur est la sauvegarde de l’autre serveur. Chaque application utilise ses propres répertoires de fichiers répliqués.


![Cluster actif-actif SafeKit avec réplication en temps réel](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Si un serveur tombe en panne dans un cluster actif-actif, toutes les applications s’exécutent sur le serveur restant. Lorsque le serveur défaillant redémarre, chaque application retourne à son serveur principal par défaut.

### Comment ça marche ? {#how-it-works}

Pour configurer un cluster actif-actif avec SafeKit, il suffit de déployer deux modules mirror avec réplication en temps réel. Chaque module mirror a sa propre configuration : une adresse IP virtuelle, des répertoires répliqués en temps réel et des scripts de redémarrage.

Remarques :

  * Les deux applications (Appli1 et Appli2) doivent être installées sur chaque serveur pour le basculement d’application.
  * Cette architecture ne se limite pas à deux applications. Vous pouvez déployer jusqu’à 25 modules d’application sur les deux mêmes serveurs.
  * Chaque module mirror possède sa propre adresse IP virtuelle, ses propres répertoires de fichiers répliqués et ses propres scripts de récupération.


### Exemple de cluster actif-actif {#example-of-an-active-active-cluster}

La solution 💡 [Hyper-V](</fr/solutions/hyper-v-replication-automatic-failover-load-balancing/>) ou 💡 [KVM](</fr/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) est un exemple de cluster actif-actif. Cette solution fournit la réplication, le basculement automatique et l’équilibrage de charge des machines virtuelles. Dans ce cluster, N modules mirror répliquent N machines virtuelles entre deux serveurs physiques.

Dans cette configuration, chaque module mirror réplique une machine virtuelle complète et la redémarre en cas de défaillance.

Ce type de module n’a pas besoin d’une adresse IP virtuelle. Lorsque la machine virtuelle redémarre sur l’autre serveur, sa propre adresse IP se déplace automatiquement avec elle.

Dans cette architecture, l’application critique est installée à l’intérieur d’une machine virtuelle.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}