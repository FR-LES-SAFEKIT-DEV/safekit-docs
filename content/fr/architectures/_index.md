---
title: "Architectures SafeKit"
canonical: "https://safekit.eviden.com/fr/architectures/"
description: "Explorez les architectures à haute disponibilité avec SafeKit . Découvrez les clusters Mirror , Farm et Farm + Mirror pour le basculement d'applications sans SAN et l'équilibrage de charge."
category: "architectures"
lang: "fr"
topics: "Quelles sont les différentes architectures de haute disponibilité et les différents clusters logiciels avec SafeKit ? Comment créer des clusters de haute disponibilité avec SafeKit ? 🔍 Centre de navigation haute disponibilité SafeKit"
---

# Architectures SafeKit {#safekit-architectures}

## Quelles sont les différentes architectures de haute disponibilité et les différents clusters logiciels avec SafeKit ? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Cluster Mirror {#mirror-cluster}


![ SafeKit mirror cluster](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[ Plus d'informations ](</fr/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster <span class="notranslate farm-term" translate="no">Farm</span> {#farm-cluster}


![ SafeKit farm cluster ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[ Plus d'informations ](</fr/architectures/network-load-balancing-cluster/>)

### Cluster <span class="notranslate farm-term" translate="no">Farm</span> + mirror {#farmmirror-cluster}


![ SafeKit farm + mirror cluster ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[ Plus d'informations ](</fr/architectures/clustering-software-load-balancing-mirroring/>)

### Cluster actif/actif {#activeactive-cluster}


![ SafeKit Cluster actif avec réplication en temps réel ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[ Plus d'informations ](</fr/architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1 {#n-1-cluster}


![ SafeKit cluster de redondance N-1 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[ Plus d'informations ](</fr/architectures/n-1-redundancy/>)

## Comment créer des clusters à haute disponibilité avec SafeKit ? {#how-to-build-high-availability-clusters-with-safekit}

### Utiliser les modules à haute disponibilité {#use-high-availability-modules}

Un module de haute disponibilité est une personnalisation de SafeKit pour une application. Il existe deux types de modules : le module mirror avec réplication des données en temps réel et basculement, et le module <span class="notranslate farm-term" translate="no">farm</span> avec répartition de charge et basculement.

Si vous déployez un module mirror sur 2 serveurs, vous créez un cluster mirror et si vous déployez un module <span class="notranslate farm-term" translate="no">farm</span> sur N serveurs, vous créez un cluster <span class="notranslate farm-term" translate="no">farm</span> .

Plusieurs modules d'application peuvent être déployés sur les mêmes serveurs. Ainsi, des architectures de clustering avancées peuvent être mises en œuvre comme celles présentées précédemment ( <span class="notranslate farm-term" translate="no">farm</span> + mirror , actif/actif, N-1).

### Qu'est-ce qu'un module d'application ? {#what-is-an-application-module}

En pratique, un module d'application est un fichier « .Safe » (type zip) contenant :

1 - le fichier de configuration userconfig.xml qui contient :

  * noms ou adresses IP physiques des serveurs,
  * nom ou adresse IP virtuelle du cluster,
  * répertoires de fichiers à répliquer en temps réel (pour un module mirror ),
  * critères d'équilibrage de charge réseau (pour un module <span class="notranslate farm-term" translate="no">farm</span> ),
  * configuration des détecteurs de pannes logicielles et matérielles


2 - les scripts pour démarrer et arrêter l'application.

### Déploiement simplifié des modules haute disponibilité {#plug-and-play-deployment-of-high-availability-modules}

Une fois qu'un module d'application est configuré et testé avec une application, son déploiement ne nécessite aucune compétence informatique spécifique :

  1. installer l'application sur 2 serveurs standard (physiques ou virtuels),
  2. installer le logiciel SafeKit sur les deux serveurs,
  3. Installez le module d'application sur les deux serveurs.



{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}