---
title: "Équilibrage de charge réseau et basculement Azure : installer le module farm.safe SafeKit"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "Améliorez Azure Network Load Balancer avec la supervision applicative intelligente de SafeKit. Le module farm.safe fournit un contrôle d’intégrité dédié pour l’équilibreur de charge Azure et permet une haute disponibilité au niveau applicatif, l’autorétablissement et le basculement automatiques des applications critiques."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Azure, Limites de la haute disponibilité SafeKit, Présentation de la solution SafeKit / Azure, Installation de la solution SafeKit / Azure sous Windows et Linux (farm.safe), Configuration étape par étape de la solution SafeKit / Azure, Démonstration de la solution farm SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Équilibrage de charge réseau et basculement Azure : installer le module farm.safe SafeKit {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-fr app="Azure" mod="farm"  %}}

## Présentation de la solution SafeKit / Azure {#overview-of-the-safekit--azure-solution}

La solution est décrite ici : **💡[SafeKit : équilibrage de charge Microsoft Azure et haute disponibilité des applications avec un cluster `Farm`](</fr/solutions/azure-load-balancing-cluster-failover/>)**.

## Installation de la solution SafeKit / Azure sous Windows et Linux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Configuration de l’équilibreur de charge Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

L’équilibreur de charge doit être configuré avec une adresse IP virtuelle.
Il doit également envoyer périodiquement des paquets de contrôle d’intégrité aux nœuds.
Pour cela, SafeKit fournit un contrôle d’intégrité exécuté sur les nœuds qui :

  * renvoie OK lorsque l’état du module `farm` est UP (vert)
  * renvoie NOT FOUND dans tous les autres états

Vous devez configurer l’équilibreur de charge Microsoft Azure avec :

  * le protocole HTTP
  * le port 9010, le port du serveur Web SafeKit
  * l’URL /var/modules/farm/ready.txt (si `farm` est le nom du module que vous déploierez ensuite)

Pour plus d’informations, consultez [la configuration de l’équilibreur de charge Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Ne configurez ni adresse IP virtuelle ni règles d’équilibrage de charge à l’étape 4 de la configuration détaillée ci-dessous. L’adresse IP virtuelle et les règles d’équilibrage de charge sont déjà définies dans l’équilibreur de charge Microsoft Azure. Leur définition à l’étape 4 est utile uniquement pour une configuration sur site.

### Configuration de la sécurité réseau Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

La sécurité réseau doit être configurée pour autoriser les communications via les protocoles et ports suivants :

  * UDP - 4800 pour le service safeadmin (entre les nœuds SafeKit)
  * UDP - 4803 pour les heartbeats dans le module `farm` (entre les nœuds SafeKit)
  * TCP – 9010 pour le contrôle d’intégrité de l’équilibreur de charge et la console Web SafeKit en mode http
  * TCP – 9001 pour configurer le mode https de la console
  * TCP – 9453 pour la console Web SafeKit en mode https

{{%  insert-safekit-installation-package-windows-fr app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}

Remarque : le module générique **farm.safe** que vous allez configurer est inclus dans le package.

## Configuration étape par étape de la solution SafeKit / Azure {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-fr app="" mod="farm"  %}}

## Démonstration de la solution `farm` SafeKit {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
