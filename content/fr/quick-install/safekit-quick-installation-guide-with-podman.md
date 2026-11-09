---
title: "Haute disponibilité Podman avec SafeKit : Installez le module mirror.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Déployez le module mirror.safe de SafeKit pour activer la réplication synchrone en temps réel et le basculement automatique des conteneurs Podman sous Linux. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour des applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Podman, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Podman, Installation de la solution SafeKit/Podman sous Linux (mirror.safe), Configuration pas à pas de la solution SafeKit/Podman, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Podman avec SafeKit : Installez le module mirror.safe pour le basculement {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Podman" mod="mirror"  %}}
 

## Présentation de la solution SafeKit/Podman {#overview-of-the-safekit--podman-solution}

La solution est décrite ici : **💡 [SafeKit : Logiciel de réplication de données en temps réel et de haute disponibilité Podman](</fr/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## Installation de la solution SafeKit/Podman sous Linux (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Prérequis {#prerequisites}

  * Vous devez installer l’application Podman que vous souhaitez redémarrer dans SafeKit sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}
 

### Exemple avec une image de conteneur simple {#example-with-a-simple-container-image}

Dans cet exemple, nous allons montrer comment SafeKit peut gérer un conteneur nginx (serveur web), c’est-à-dire la réplication d’un répertoire accessible dans le conteneur et le redémarrage du conteneur sur un autre nœud en cas de défaillance.

#### Prérequis {#prerequisites-1}

  * Créez un répertoire répliqué **sur les deux nœuds**  
Créez un répertoire **/replicated_dir_path** qui sera répliqué par SafeKit et qui contiendra les pages HTML servies par nginx
  * Remplissez ce répertoire avec un fichier HTML initial **sur les deux nœuds**
        
        cp index.html /replicated_dir_path

  * Créez un conteneur **sur les deux nœuds**  
Créez un conteneur nginx sur les deux nœuds qui lie le répertoire **/replicated_dir_path** à **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### Configuration SafeKit {#safekit-configuration}

  * Accédez à la section **de configuration étape par étape**
  * Créer et configurer un module **mirror.safe**
  * Définissez une **adresse IP virtuelle** qui sera commutée en cas de défaillance
  * Définir **/replicated_dir_path** comme répertoire répliqué
  * Mettez respectivement dans les scripts start_prim et stop_prim : **podman start mynginx** et **podman stop mynginx**  
Remarque : vous devrez peut-être utiliser « podman start --security-opt label=disable mynginx » avec SE Linux.
  * Déployez et démarrez le module mirror SafeKit


#### Tests {#tests}

  * Testez l’accès à nginx à l’adresse **http://vitual-ip:9011/index.html**
  * Réplication du test :  
Sur le nœud en état PRIM SafeKit, ajoutez d’autres fichiers HTML au répertoire répliqué : 
        
        cp page.html /replicated_dir_path

  * Arrêter le module mirror sur le nœud en état SafeKit PRIM
  * Vérifiez que le conteneur a été redémarré sur le nœud secondaire
  * Testez l’accès à **http://vitual-ip:9011/index.html** et à** http://vitual-ip:9011/page.html**


## Configuration pas à pas de la solution SafeKit/Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-fr app="Podman" mod="mirror"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}