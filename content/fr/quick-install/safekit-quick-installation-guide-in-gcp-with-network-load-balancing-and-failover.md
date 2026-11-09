---
title: "Équilibrage de charge et basculement du réseau GCP : Installez le module SafeKit farm.safe"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "Améliorez l’équilibrage de charge réseau GCP avec la surveillance intelligente des applications de SafeKit. Le module farm.safe fournit une vérification d’intégrité dédiée pour l’équilibreur de charge GCP, permettant une haute disponibilité transparente au niveau de l’application. Obtenez une auto-réparation et un basculement automatiques pour les applications critiques."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour GCP, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/GCP, Installation de la solution SafeKit/GCP sous Windows et Linux (farm.safe), Configuration pas à pas de la solution SafeKit/GCP, Démonstration de la solution farm SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Équilibrage de charge et basculement du réseau GCP : Installez le module SafeKit farm.safe {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-fr app="GCP" mod="farm"  %}}
 

## Présentation de la solution SafeKit/GCP {#overview-of-the-safekit--gcp-solution}

La solution est décrite ici : **💡 [SafeKit : Équilibrage de charge Google GCP et cluster <span class="notranslate farm-term" translate="no">farm</span> haute disponibilité d’applications](</fr/solutions/gcp-load-balancing-cluster-failover/>)**.

## Installation de la solution SafeKit/GCP sous Windows et Linux (farm.safe) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Configuration de l’équilibreur de charge Google GCP {#configuration-of-the-google-gcp-load-balancer}

L’équilibreur de charge doit être configuré avec une adresse IP virtuelle.  
Et l’équilibreur de charge doit être configuré pour envoyer périodiquement des paquets de maintenance aux nœuds.  
Pour cela, SafeKit fournit un contrôle d’intégrité qui s’exécute à l’intérieur des nœuds et qui

  * renvoie OK lorsque l’état du module <span class="notranslate farm-term" translate="no">farm</span> est UP (vert)
  * renvoie NON TROUVÉ dans tous les autres États


Vous devez configurer l’équilibreur de charge Google GCP avec :

  * Protocole HTTP
  * port 9010, le port du serveur web SafeKit
  * URL /var/modules/farm/ready.txt (si <span class="notranslate farm-term" translate="no">farm</span> est le nom du module que vous déployerez ultérieurement)


Pour plus d’informations, consultez [la configuration de l’équilibreur de charge Google GCP](<https://docs.cloud.google.com/load-balancing/docs/>).


⚠️ Ne configurez pas d’adresse IP virtuelle ni de règles d’équilibrage de charge à l’étape 4 de la configuration pas à pas ci-dessous. L’adresse IP virtuelle et les règles d’équilibrage de charge sont déjà définies dans l’équilibreur de charge Google GCP. La configuration d’une adresse IP virtuelle et de règles d’équilibrage de charge à l’étape 4 est utile uniquement pour la configuration sur site.

### Configuration de la sécurité du réseau Google GCP {#configuration-of-the-google-gcp-network-security}

La sécurité du réseau doit être configurée pour autoriser les communications pour les protocoles et les ports suivants :

  * UDP - 4800 pour le service safeadmin (entre les nœuds SafeKit)
  * UDP - 4803 pour les heartbeats à l’intérieur du module <span class="notranslate farm-term" translate="no">farm</span> (entre les nœuds SafeKit)
  * TCP – 9010 pour la vérification de l’état de l’équilibreur de charge et pour la console Web SafeKit fonctionnant en mode http
  * TCP – 9001 pour configurer le mode https pour la console
  * TCP – 9453 pour la console web SafeKit fonctionnant en mode https



{{%  insert-safekit-installation-package-windows-fr app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}
 

Remarque : le module générique **farm.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution SafeKit/GCP {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-fr app="" mod="farm"  %}}
 

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}