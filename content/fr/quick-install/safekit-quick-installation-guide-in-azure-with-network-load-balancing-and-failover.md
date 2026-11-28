---
title: "Installer SafeKit pour l’équilibrage de charge Azure (farm.safe)"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "Guide pas à pas : installez le module SafeKit farm.safe dans Azure : il contrôle la santé de l’application pour l’équilibreur de charge Azure et gère le basculement."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Azure, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Azure, Installation de la solution SafeKit/Azure sous Windows et Linux (farm.safe), Configuration pas à pas de la solution SafeKit/Azure, Démonstration de la solution farm SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--azure-solution, installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe, step-by-step-configuration-of-the-safekit--azure-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Installer SafeKit pour l’équilibrage de charge Azure (farm.safe) {#install-safekit-for-azure-load-balancing-farmsafe}


{{%  insert-safekit-farm-guide-fr app="Azure" mod="farm"  %}}
 

## Présentation de la solution SafeKit/Azure {#overview-of-the-safekit--azure-solution}

La solution est décrite ici : **💡 [SafeKit : cluster <span class="notranslate farm-term" translate="no">farm</span> d’équilibrage de charge et de haute disponibilité d’applications Microsoft Azure](</fr/solutions/azure-load-balancing-cluster-failover/>)**.

## Installation de la solution SafeKit/Azure sous Windows et Linux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Configuration de l’équilibreur de charge Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

L’équilibreur de charge doit être configuré avec une adresse IP virtuelle.  
Et l’équilibreur de charge doit être configuré pour envoyer périodiquement des paquets de maintenance aux nœuds.  
Pour cela, SafeKit fournit un contrôle d’intégrité qui s’exécute à l’intérieur des nœuds et qui

  * renvoie OK lorsque l’état du module <span class="notranslate farm-term" translate="no">farm</span> est UP (vert)
  * renvoie NON TROUVÉ dans tous les autres États


Vous devez configurer l’équilibreur de charge Microsoft Azure avec :

  * Protocole HTTP
  * port 9010, le port du serveur web SafeKit
  * URL /var/modules/farm/ready.txt (si <span class="notranslate farm-term" translate="no">farm</span> est le nom du module que vous déployerez ultérieurement)


Pour plus d’informations, consultez [la configuration de l’équilibreur de charge Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>). 


⚠️ Ne configurez pas d’adresse IP virtuelle ni de règles d’équilibrage de charge à l’étape 4 de la configuration pas à pas ci-dessous. L’adresse IP virtuelle et les règles d’équilibrage de charge sont déjà définies dans l’équilibreur de charge Microsoft Azure. La configuration d’une adresse IP virtuelle et de règles d’équilibrage de charge à l’étape 4 est utile uniquement pour la configuration sur site.

### Configuration de la sécurité du réseau Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

La sécurité du réseau doit être configurée pour autoriser les communications pour les protocoles et les ports suivants :

  * UDP - 4800 pour le service safeadmin (entre les nœuds SafeKit)
  * UDP - 4803 pour les heartbeats à l’intérieur du module <span class="notranslate farm-term" translate="no">farm</span> (entre les nœuds SafeKit)
  * TCP – 9010 pour la vérification de l’état de l’équilibreur de charge et pour la console Web SafeKit fonctionnant en mode http
  * TCP – 9001 pour configurer le mode https pour la console
  * TCP – 9453 pour la console web SafeKit fonctionnant en mode https



{{%  insert-safekit-installation-package-windows-fr app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}
 

Remarque : le module générique **farm.safe** que vous allez configurer est fourni dans le package.

## Configuration pas à pas de la solution SafeKit/Azure {#step-by-step-configuration-of-the-safekit--azure-solution}


{{%  insert-safekit-82-farm-configuration-fr app="" mod="farm"  %}}
 

## Démonstration de la solution <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}