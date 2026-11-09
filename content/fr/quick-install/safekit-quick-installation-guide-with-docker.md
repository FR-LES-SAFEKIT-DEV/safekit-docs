---
title: "Haute disponibilité Docker avec SafeKit : Installez le module mirror.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Déployez le module mirror.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique des conteneurs Docker sur Linux. Ce guide vous explique comment configurer un cluster à 2 nœuds sans stockage sans partage pour les applications critiques."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Docker, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Docker, Installation de la solution SafeKit/Docker sur Linux (mirror.safe), Configuration pas à pas de la solution SafeKit/Docker, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité Docker avec SafeKit : Installez le module mirror.safe pour le basculement {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Docker" mod="mirror"  %}}
 

## Présentation de la solution SafeKit/Docker {#overview-of-the-safekit--docker-solution}

La solution est décrite ici : **💡 [SafeKit : Logiciel de haute disponibilité et de réplication de données en temps réel Docker](</fr/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Installation de la solution SafeKit/Docker sur Linux (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Prérequis {#prerequisites}

  * L’application Docker que vous souhaitez redémarrer dans SafeKit doit être installée sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}
 

### Exemple 1 avec une application Docker Compose {#example-1-with-a-docker-compose-application}

Avec une application Docker Compose, vous disposez d’un fichier **docker-compose.yml** décrivant l’application et tous ses conteneurs.

  * Tout d’abord, sur les deux serveurs, installez l’application docker compose sans la démarrer : **docker-compose -f docker-compose.yml up --no-start**
  * Sur un serveur, pour chaque volume dans docker-compose.yml, exécutez cette commande : **docker volume inspect volume_name**  
Il renverra les **répertoires hôtes des volumes Docker** (ces chemins ne sont pas indiqués dans docker-compose.yml).  
Vous obtiendrez une liste de chemins tels que **/var/lib/docker/volumes/ <volume_name> /_data**
  * Accédez à la section **de configuration étape par étape** et 
    * Déployez le module **mirror.safe**
    * définir une **adresse IP virtuelle** qui sera commutée en cas de défaillance
    * définir la liste de **/var/lib/docker/volumes/ <volume_name> /_data** comme **répertoires répliqués**
    * à mettre respectivement dans les scripts start_prim et stop_prim : **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** et **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### Exemple 2 avec une application Docker qui démarre un ensemble de conteneurs {#example-2-with-a-docker-application-starting-a-set-of-containers}

Nous supposons ici une application Docker **myappli** qui démarre un ensemble de conteneurs.

  * Tout d’abord, sur les deux serveurs, installez **myappli** sans le démarrer
  * Sur un serveur, répertoriez les volumes utilisés par myapply : **ls /var/lib/docker/volumes**  
Vous obtiendrez ainsi une liste de chemins d’accès tels que **/var/lib/docker/volumes/ <volume_name> /_data**
  * Accédez à la section **de configuration étape par étape** et 
    * Déployez le module **mirror.safe**
    * définir une **adresse IP virtuelle** qui sera commutée en cas de défaillance
    * définir la liste de **/var/lib/docker/volumes/ <volume_name> /_data** comme **répertoires répliqués**
    * à mettre respectivement dans les scripts start_prim et stop_prim : **/.../myappli start** et **/.../myappli stop**


### Exemple 3 avec une image Docker simple {#example-3-with-a-simple-docker-image}

La configuration est présentée sur l’exemple de l’image Docker nginx (serveur web).

  * Création de volumes Docker  
Sur les deux serveurs, créez un volume Docker portant le même nom : **docker volume create replicated_vol**  
Obtenez le chemin d’accès au répertoire où le volume est stocké sur l’hôte : **docker volume inspect replicated_vol**  
(par exemple : **/var/lib/docker/storage/replicated_vol/_data**)
  * Création de conteneurs Docker  
Sur les deux serveurs, créez un conteneur Docker nginx qui se lie au volume précédent : **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Remplissez le volume avec un fichier index.html : **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Accédez à la section **de configuration étape par étape** et 
    * Déployez le module **mirror.safe**
    * définir une **adresse IP virtuelle** qui sera commutée en cas de défaillance
    * Définir **/var/lib/docker/storage/replicated_vol/_data** comme répertoire répliqué
    * à mettre respectivement dans les scripts start_prim et stop_prim : **docker start mynginx** et **docker stop mynginx**
    * après la configuration SafeKit, testez l’accès à index.html avec **http://vitual-ip:9011**


## Configuration pas à pas de la solution SafeKit/Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-fr app="Docker" mod="mirror"  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}