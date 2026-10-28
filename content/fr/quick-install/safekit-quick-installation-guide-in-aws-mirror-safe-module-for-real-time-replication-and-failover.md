---
title: "Haute disponibilité AWS avec SafeKit : installer le module mirror.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "Déployez le module mirror.safe de SafeKit dans AWS pour activer la réplication synchrone en temps réel et le basculement automatique sous Windows et Linux. Ce guide explique comment configurer un cluster à deux nœuds sans stockage partagé pour les applications critiques."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour AWS, Limites de la haute disponibilité SafeKit, Présentation de la solution SafeKit / AWS mirror, Installation de la solution SafeKit / AWS mirror sous Windows et Linux (mirror.safe), Configuration étape par étape de la solution SafeKit / AWS mirror, Démonstration de la solution mirror SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Haute disponibilité AWS avec SafeKit : installer le module mirror.safe pour le basculement {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-fr app="AWS" mod="mirror"  %}}

## Présentation de la solution SafeKit / AWS mirror {#overview-of-the-safekit--aws-mirror-solution}

La solution est décrite ici : **💡[Haute disponibilité Amazon AWS : réplication synchrone et basculement avec SafeKit](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>)**.

## Installation de la solution SafeKit / AWS mirror sous Windows et Linux (mirror.safe) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuration de l’équilibreur de charge Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

L’équilibreur de charge doit être configuré si vous souhaitez une adresse IP virtuelle.  
Il doit également envoyer périodiquement des paquets de contrôle d’intégrité aux nœuds.  
Pour cela, SafeKit fournit un contrôle d’intégrité exécuté sur les nœuds qui :

  * renvoie OK lorsque l’état du module mirror est PRIM (vert) ou ALONE (vert)
  * renvoie NOT FOUND dans tous les autres états

Vous devez configurer l’équilibreur de charge Amazon AWS avec :

  * le protocole HTTP
  * le port 9010, le port du serveur Web SafeKit
  * l’URL /var/modules/mirror/ready.txt (si mirror est le nom du module que vous déploierez ensuite)

Pour plus d’informations, consultez [la configuration de l’équilibreur de charge Amazon AWS](<https://aws.amazon.com/elasticloadbalancing/>).

⚠️ Ne configurez pas d’adresse IP virtuelle à l’étape 4 de la configuration détaillée ci-dessous. L’adresse IP virtuelle est déjà définie dans l’équilibreur de charge Amazon AWS. La définition d’une adresse IP virtuelle à l’étape 4 est utile uniquement pour une configuration sur site.

### Configuration de la sécurité réseau Amazon AWS {#configuration-of-the-amazon-aws-network-security}

La sécurité réseau doit être configurée pour autoriser les communications via les protocoles et ports suivants :

  * UDP - 4800 pour le service safeadmin (entre les nœuds SafeKit)
  * UDP - 8888 pour le heartbeat du module (entre les nœuds SafeKit)
  * TCP – 5600 pour la réplication de fichiers en temps réel du module (entre les nœuds SafeKit)
  * TCP – 9010 pour le contrôle d’intégrité de l’équilibreur de charge et la console Web SafeKit en mode http
  * TCP – 9001 pour configurer le mode https de la console
  * TCP – 9453 pour la console Web SafeKit en mode https

{{%  insert-safekit-installation-package-windows-fr app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}

Remarque : le module générique **mirror.safe** que vous allez configurer est inclus dans le package.

## Configuration étape par étape de la solution SafeKit / AWS mirror {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}

{{%  insert-safekit-82-configuration-fr app="Windows" mod="mirror"  %}}

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
