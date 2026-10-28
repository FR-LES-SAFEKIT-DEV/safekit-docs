---
title: "Équilibrage de charge réseau Cloud et basculement : installer le module SafeKit farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Améliorez l’équilibrage de charge réseau Cloud grâce à la supervision applicative intelligente de SafeKit. Le module farm.safe fournit un contrôle d’intégrité dédié à l’équilibreur de charge Cloud, pour une haute disponibilité fluide au niveau de l’application. Bénéficiez d’une auto-réparation et d’un basculement automatiques pour les applications critiques."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Cloud, Limites de la haute disponibilité SafeKit, Présentation de la solution SafeKit / Cloud, Installation de la solution SafeKit / Cloud sous Windows et Linux (farm.safe), Configuration étape par étape de la solution SafeKit / Cloud, Démonstration de la solution `farm` SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Équilibrage de charge réseau Cloud et basculement : installer le module SafeKit farm.safe {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-fr app="Cloud" mod="farm"  %}}

## Présentation de la solution SafeKit / Cloud {#overview-of-the-safekit--cloud-solution}

La solution est décrite ici : **💡[SafeKit : équilibrage de charge Cloud et haute disponibilité applicative avec un cluster `Farm`](</fr/solutions/cloud-load-balancing-cluster-failover/>)**.

## Installation de la solution SafeKit / Cloud sous Windows et Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configuration de l’équilibreur de charge Cloud {#configuration-of-the-cloud-load-balancer}

L’équilibreur de charge doit être configuré avec une adresse IP virtuelle.  
Il doit également envoyer périodiquement des paquets de contrôle d’intégrité aux nœuds.  
Pour cela, SafeKit fournit un contrôle d’intégrité exécuté sur les nœuds qui :

  * renvoie OK lorsque l’état du module `farm` est UP (vert)
  * renvoie NOT FOUND dans tous les autres états

Vous devez configurer l’équilibreur de charge Cloud avec :

  * le protocole HTTP
  * le port 9010, le port du serveur Web SafeKit
  * l’URL /var/modules/farm/ready.txt (si `farm` est le nom du module que vous déploierez ensuite)

⚠️ Ne configurez pas d’adresse IP virtuelle ni de règles d’équilibrage de charge à l’étape 4 de la configuration détaillée ci-dessous. L’adresse IP virtuelle et les règles d’équilibrage de charge sont déjà définies dans l’équilibreur de charge Cloud. La définition d’une adresse IP virtuelle et de règles d’équilibrage de charge à l’étape 4 est utile uniquement pour une configuration sur site.

### Configuration de la sécurité réseau Cloud {#configuration-of-the-cloud-network-security}

La sécurité réseau doit être configurée pour autoriser les communications via les protocoles et ports suivants :

  * UDP - 4800 pour le service safeadmin (entre les nœuds SafeKit)
  * UDP - 4803 pour les heartbeats du module `farm` (entre les nœuds SafeKit)
  * TCP – 9010 pour le contrôle d’intégrité de l’équilibreur de charge et la console Web SafeKit en mode http
  * TCP – 9001 pour configurer le mode https de la console
  * TCP – 9453 pour la console Web SafeKit en mode https

{{%  insert-safekit-installation-package-windows-fr app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}

Remarque : le module générique **farm.safe** que vous allez configurer est inclus dans le package.

## Configuration étape par étape de la solution SafeKit / Cloud {#step-by-step-configuration-of-the-safekit--cloud-solution}

{{%  insert-safekit-82-farm-configuration-fr app="" mod="farm"  %}}

## Démonstration de la solution `farm` SafeKit {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
