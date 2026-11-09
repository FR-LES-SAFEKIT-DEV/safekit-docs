---
title: "Haute disponibilité dans le cloud avec SafeKit : installez le module mirror.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "Déployez le module mirror.safe pour SafeKit in Cloud afin d’activer la réplication synchrone en temps réel et le basculement automatique sous Windows et Linux. Ce guide vous explique comment configurer un cluster à 2 nœuds sans stockage sans partage pour les applications critiques."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour le cloud, Limitations de la haute disponibilité SafeKit, Présentation de la solution mirror SafeKit / Cloud, Installation de la solution mirror SafeKit / Cloud sous Windows et Linux (mirror.safe), Configuration pas à pas de la solution mirror SafeKit / Cloud, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité dans le cloud avec SafeKit : installez le module mirror.safe pour le basculement {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Cloud" mod="mirror"  %}}
 

## Présentation de la solution mirror SafeKit / Cloud {#overview-of-the-safekit--cloud-mirror-solution}

La solution est décrite ici : **💡 [Haute disponibilité indépendante du cloud : réplication synchrone et basculement SafeKit](</fr/solutions/cloud-high-availability-cluster-synchronous-replication-failover/>)**.

## Installation de la solution mirror SafeKit / Cloud sous Windows et Linux (mirror.safe) {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuration de l’équilibreur de charge Cloud {#configuration-of-the-cloud-load-balancer}

L’équilibreur de charge doit être configuré si vous souhaitez mettre en œuvre une adresse IP virtuelle.  
Et l’équilibreur de charge doit être configuré pour envoyer périodiquement des paquets de maintenance aux nœuds.  
Pour cela, SafeKit fournit un contrôle d’intégrité qui s’exécute à l’intérieur des nœuds et qui

  * renvoie OK lorsque l’état du module mirror est PRIM (vert) ou ALONE (vert)
  * renvoie NON TROUVÉ dans tous les autres États


Vous devez configurer l’équilibreur de charge Cloud avec :

  * Protocole HTTP
  * port 9010, le port du serveur web SafeKit
  * URL /var/modules/mirror/ready.txt (si mirror est le nom du module que vous déployerez ultérieurement)


⚠️ Ne configurez pas d’adresse IP virtuelle à l’étape 4 de la configuration pas à pas ci-dessous. L’adresse IP virtuelle est déjà définie dans l’équilibreur de charge Cloud. La configuration d’une adresse IP virtuelle à l’étape 4 est utile uniquement pour la configuration sur site.

### Configuration de la sécurité du réseau Cloud {#configuration-of-the-cloud-network-security}

La sécurité du réseau doit être configurée pour autoriser les communications pour les protocoles et les ports suivants :

  * UDP - 4800 pour le service safeadmin (entre les nœuds SafeKit)
  * UDP - 8888 pour le heartbeat du module (entre les nœuds SafeKit)
  * TCP – 5600 pour le module de réplication de fichiers en temps réel (entre les nœuds SafeKit)
  * TCP – 9010 pour la vérification de l’état de l’équilibreur de charge et pour la console Web SafeKit fonctionnant en mode http
  * TCP – 9001 pour configurer le mode https pour la console
  * TCP – 9453 pour la console web SafeKit fonctionnant en mode https



{{%  insert-safekit-installation-package-windows-fr app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}
 

Remarque : le module générique **mirror.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution mirror SafeKit / Cloud {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-fr app="Windows" mod="mirror"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}