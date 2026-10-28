---
title: "Haute disponibilité Podman avec SafeKit : Installez le module mirror.safe pour le basculement."
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Déployez le module mirror.safe pour SafeKit afin d'activer la réplication synchrone en temps réel et le basculement automatique des conteneurs Podman sur Linux . Ce guide vous accompagne dans la configuration d'un cluster SANless à deux nœuds pour les applications critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour Podman et SafeKit limitations de haute disponibilité ; présentation de la solution SafeKit / Podman ; installation de la solution SafeKit / Podman sur Linux ( mirror.safe ) ; configuration pas à pas de la solution SafeKit / Podman ; démonstration de la solution SafeKit mirror ; hub de navigation haute disponibilité SafeKit"
---

# Haute disponibilité Podman avec SafeKit : Installez le module mirror.safe pour le basculement {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Podman" mod="mirror"  %}}
 

## Présentation de la solution SafeKit / Podman {#overview-of-the-safekit--podman-solution}

La solution est décrite ici : **💡 [ SafeKit : Podman Logiciel de réplication de données haute disponibilité et en temps réel ](</fr/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)** .

## Installation de la solution SafeKit / Podman sur Linux ( mirror.safe ) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Prérequis {#prerequisites}

  * Vous avez besoin de l'application Podman que vous souhaitez redémarrer dans SafeKit installée sur 2 nœuds (machines virtuelles ou serveurs physiques).



{{%  insert-safekit-installation-package-linux-fr app="" mod="mirror"  %}}
 

### Exemple avec une image conteneur simple {#example-with-a-simple-container-image}

Dans cet exemple, nous allons montrer comment SafeKit pourrait gérer un conteneur nginx (serveur web), c'est-à-dire : la réplication d'un répertoire accessible dans le conteneur et le redémarrage du conteneur sur un autre nœud en cas de panne.

#### Prérequis {#prerequisites-1}

  * Créez un répertoire répliqué **sur les deux nœuds**  
Créez un répertoire **/replicated_dir_path** qui sera répliqué par SafeKit et qui contiendra les pages HTML servies par nginx
  * Remplissez ce répertoire avec un fichier HTML initial **sur les deux nœuds**
        
        cp index.html /replicated_dir_path

  * Créez un conteneur **sur les deux nœuds**  
Créez un conteneur nginx sur les deux nœuds qui lie le répertoire **/replicated_dir_path** à **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path : /usr/share/nginx/html -p 9011:80 nginx


#### Configuration SafeKit {#safekit-configuration}

  * Accédez à la section **de configuration étape par étape**
  * Créer et configurer un module **mirror.safe**
  * Définissez une **adresse IP virtuelle** qui sera basculée en cas de panne.
  * Définir **/replicated_dir_path** comme répertoire répliqué
  * Insérez respectivement dans les scripts start_prim et stop_prim : **podman start mynginx** et **podman stop mynginx**  
Remarque : Vous devrez peut-être utiliser « podman start --security-opt label=disable mynginx » avec SE Linux .
  * Déployez et démarrez le module SafeKit mirror


#### Tests {#tests}

  * Test d'accès à nginx à **http://vitual-ip:9011/index.html**
  * Réplication des tests :  
Sur le nœud en état PRIM SafeKit , ajoutez d'autres fichiers HTML au répertoire répliqué : 
        
        cp page.html /replicated_dir_path

  * Arrêtez le module mirror sur le nœud en état PRIM SafeKit
  * Vérifiez que le conteneur a bien été redémarré sur le nœud secondaire.
  * Testez l'accès à **http://vitual-ip:9011/index.html** et à **http://vitual-ip:9011/page.html**


## Configuration étape par étape de la solution SafeKit / Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-fr app="Podman" mod="mirror"  %}}
 

## Démonstration de la solution SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}