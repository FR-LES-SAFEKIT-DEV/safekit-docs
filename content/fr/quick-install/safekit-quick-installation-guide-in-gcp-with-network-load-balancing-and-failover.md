---
title: "Équilibrage de charge réseau GCP et basculement : installer le module SafeKit farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "Améliorez l’équilibrage de charge réseau GCP grâce à la supervision applicative intelligente de SafeKit. Le module farm.safe fournit un contrôle d’intégrité dédié à l’équilibreur de charge GCP, pour une haute disponibilité fluide au niveau de l’application. Bénéficiez d’une auto-réparation et d’un basculement automatiques pour les applications critiques."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour GCP, Limites de la haute disponibilité SafeKit, Présentation de la solution SafeKit / GCP, Installation de la solution SafeKit / GCP sous Windows et Linux (farm.safe), Configuration étape par étape de la solution SafeKit / GCP, Démonstration de la solution farm SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Équilibrage de charge réseau GCP et basculement : installer le module SafeKit farm.safe {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-fr app="GCP" mod="farm"  %}}

## Présentation de la solution SafeKit / GCP {#overview-of-the-safekit--gcp-solution}

La solution est décrite ici : **💡[SafeKit : équilibrage de charge Google GCP et haute disponibilité applicative avec un cluster <span class="notranslate farm-term" translate="no">Farm</span>](</fr/solutions/gcp-load-balancing-cluster-failover/>)**.

## Installation de la solution SafeKit / GCP sous Windows et Linux (farm.safe) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Configuration de l’équilibreur de charge Google GCP {#configuration-of-the-google-gcp-load-balancer}

L’équilibreur de charge doit être configuré avec une adresse IP virtuelle.  
Il doit également envoyer périodiquement des paquets de contrôle d’intégrité aux nœuds.  
Pour cela, SafeKit fournit un contrôle d’intégrité exécuté sur les nœuds qui :

  * renvoie OK lorsque l’état du module <span class="notranslate farm-term" translate="no">farm</span> est UP (vert)
  * renvoie NOT FOUND dans tous les autres états

Vous devez configurer l’équilibreur de charge Google GCP avec :

  * le protocole HTTP
  * le port 9010, le port du serveur Web SafeKit
  * l’URL /var/modules/farm/ready.txt (si <span class="notranslate farm-term" translate="no">farm</span> est le nom du module que vous déploierez ensuite)

Pour plus d’informations, consultez [la configuration de l’équilibreur de charge Google GCP](<https://docs.cloud.google.com/load-balancing/docs/>).

⚠️ Ne configurez pas d’adresse IP virtuelle ni de règles d’équilibrage de charge à l’étape 4 de la configuration détaillée ci-dessous. L’adresse IP virtuelle et les règles d’équilibrage de charge sont déjà définies dans l’équilibreur de charge Google GCP. La définition d’une adresse IP virtuelle et de règles d’équilibrage de charge à l’étape 4 est utile uniquement pour une configuration sur site.

### Configuration de la sécurité réseau Google GCP {#configuration-of-the-google-gcp-network-security}

La sécurité réseau doit être configurée pour autoriser les communications via les protocoles et ports suivants :

  * UDP - 4800 pour le service safeadmin (entre les nœuds SafeKit)
  * UDP - 4803 pour les heartbeats du module <span class="notranslate farm-term" translate="no">farm</span> (entre les nœuds SafeKit)
  * TCP – 9010 pour le contrôle d’intégrité de l’équilibreur de charge et la console Web SafeKit en mode http
  * TCP – 9001 pour configurer le mode https de la console
  * TCP – 9453 pour la console Web SafeKit en mode https

{{%  insert-safekit-installation-package-windows-fr app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}

Remarque : le module générique **farm.safe** que vous allez configurer est inclus dans le package.

## Configuration étape par étape de la solution SafeKit / GCP {#step-by-step-configuration-of-the-safekit--gcp-solution}

{{%  insert-safekit-82-farm-configuration-fr app="" mod="farm"  %}}

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
