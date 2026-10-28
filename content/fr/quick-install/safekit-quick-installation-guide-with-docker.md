---
title: "Haute disponibilité Docker avec SafeKit : Installez le module mirror.safe pour le basculement."
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Déployez le module mirror.safe pour SafeKit afin d'activer la réplication synchrone en temps réel et le basculement automatique des conteneurs Docker sur Linux . Ce guide vous accompagne dans la configuration d'un cluster à deux nœuds sans stockage partagé pour les applications critiques."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour Docker et SafeKit limitations de haute disponibilité ; présentation de la solution SafeKit / Docker ; installation de la solution SafeKit / Docker sur Linux ( mirror.safe ) ; configuration pas à pas de la solution SafeKit / Docker ; démonstration de la solution SafeKit mirror ; hub de navigation haute disponibilité SafeKit"
---

# Haute disponibilité Docker avec SafeKit : Installez le module mirror.safe pour le basculement {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Docker" mod="mirror"  %}}
 

## Présentation de la solution SafeKit / Docker {#overview-of-the-safekit--docker-solution}

La solution est décrite ici : ** 💡 [ SafeKit : Docker Logiciel de réplication de données haute disponibilité et temps réel ](</solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Installation de la solution SafeKit / Docker sur Linux ( mirror.safe ) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Prérequis {#prerequisites}

  * Vous avez besoin de l'application Docker que vous souhaitez redémarrer dans SafeKit installée sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}
 

### Exemple 1 avec une application de composition Docker {#example-1-with-a-docker-compose-application}

Avec une application composée Docker , vous disposez d'un fichier **docker-compose.yml** décrivant l'application et tous ses conteneurs.

  * Tout d'abord, sur les deux serveurs, installez l'application Docker Compose sans la démarrer : **docker-compose -f docker-compose.yml up --no-start**
  * Sur un serveur, pour chaque volume de docker-compose.yml , exécutez la commande suivante : **docker volume inspect volume_name**  
Il renverra le **host directories of the docker volumes** (ces chemins ne sont pas donnés dans docker-compose.yml ).  
Vous obtiendrez une liste de chemins d'accès sous la forme **/var/lib/docker/volumes/ <volume_name>/_data**
  * Accédez à la section de configuration étape par étape ** ** et 
    * déployer le module **mirror.safe**
    * Configurez une adresse IP virtuelle ** ** qui sera utilisée en cas de panne.
    * Définir la liste des répertoires **/var/lib/docker/volumes/ <volume_name>/_data** comme ** répliqués **
    * Insérer respectivement dans les scripts start_prim et stop_prim : **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** et **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### Exemple 2 avec une application Docker démarrant un ensemble de conteneurs {#example-2-with-a-docker-application-starting-a-set-of-containers}

Nous supposons ici une application Docker ** myappli ** démarrant un ensemble de conteneurs.

  * Tout d'abord, sur les deux serveurs, installez ** myappli ** sans le démarrer.
  * Sur un serveur, listez les volumes utilisés par myapply : **ls /var/lib/docker/volumes**  
Vous obtiendrez ainsi une liste de chemins d'accès au format **/var/lib/docker/volumes/ <volume_name>/_data**
  * Accédez à la section de configuration étape par étape ** ** et 
    * déployer le module **mirror.safe**
    * Configurez une adresse IP virtuelle ** ** qui sera utilisée en cas de panne.
    * Définir la liste des répertoires **/var/lib/docker/volumes/ <volume_name>/_data** comme ** répliqués **
    * Insérez respectivement dans les scripts start_prim et stop_prim : ** /.../myappli start ** et ** /.../myappli stop **


### Exemple 3 avec une image simple Docker {#example-3-with-a-simple-docker-image}

La configuration est présentée sur l'exemple de l'image nginx Docker (serveur web).

  * Création de volume Docker  
Sur les deux serveurs, créez un volume Docker portant le même nom : **docker volume create replicated_vol**  
Obtenez le chemin d'accès au répertoire où le volume est stocké sur l'hôte : **docker volume inspect replicated_vol**  
(par exemple : **/var/lib/docker/storage/replicated_vol/_data** )
  * Création du conteneur Docker  
Sur les deux serveurs, créez un conteneur Docker nginx qui se lie au volume précédent : **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Remplissez le volume avec un fichier index.html : **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Accédez à la section de configuration étape par étape ** ** et 
    * déployer le module **mirror.safe**
    * Configurez une adresse IP virtuelle ** ** qui sera utilisée en cas de panne.
    * définir **/var/lib/docker/storage/replicated_vol/_data** comme répertoire répliqué
    * Insérer respectivement dans les scripts start_prim et stop_prim : **docker start mynginx** et **docker stop mynginx**
    * Après la configuration SafeKit , testez l'accès à index.html avec ** http://vitual-ip:9011**


## Configuration étape par étape de la solution SafeKit / Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-fr app="Docker" mod="mirror"  %}}
 

## Démonstration de la solution SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}