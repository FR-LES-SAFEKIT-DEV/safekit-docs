---
title: "Haute disponibilité K3S avec SafeKit : Installez le module k3s.safe pour le basculement."
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Déployez le module k3s.safe pour SafeKit afin d'activer la réplication synchrone en temps réel et le basculement automatique de Kubernetes sur Linux . Ce guide vous accompagne dans la configuration d'un cluster sans SAN à deux nœuds pour les applications critiques Linux sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d'installation rapide haute disponibilité pour Kubernetes et SafeKit limitations de haute disponibilité ; présentation de la solution SafeKit / Kubernetes ; installation et configuration de la solution SafeKit / Kubernetes sur Linux ( k3s.safe ) ; scénarios d'isolation réseau dans un cluster ; démonstration de la solution SafeKit mirror ; hub de navigation haute disponibilité SafeKit"
---

# Haute disponibilité K3S avec SafeKit : Installez le module k3s.safe pour le basculement {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Kubernetes" mod="k3s"  %}}
 

## Présentation de la solution SafeKit / Kubernetes {#overview-of-the-safekit--kubernetes-solution}

La solution est décrite ici : ** 💡 [ Kubernetes Haute disponibilité K3s : Réplication synchrone et basculement sur 2 nœuds ](</fr/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>) **

## Installation et configuration de la solution SafeKit / Kubernetes sur Linux ( k3s.safe ) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Téléchargez les paquets {#1-download-packages}

  * Téléchargez la version gratuite de SafeKit 8.2 sur Linux (safekitlinux_xx.bin)
  * Téléchargez le module k3s.safe Linux
  * Téléchargez le script k3sconfig.sh
  * Documentation (pptx)


Remarque : le script k3sconfig.sh installe K3S, MariaDB , NFS, SafeKit sur 2 nœuds Linux Ubuntu 24.04.

[ Télécharger SafeKit ( Linux ) > ](</fr/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe"> Télécharger k3s.safe ( Linux ) > </a> 

Téléchargement de [ k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

Documentation [ (pdf) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Tout d'abord, sur les deux nœuds {#2-first-on-both-nodes}

Sur 2 nœuds Linux Ubuntu 24.04, en tant que root :

  * Assurez-vous que le nœud dispose d'un accès Internet (éventuellement via un proxy).
  * Copiez les k3sconfig.sh , k3s.safe et le paquet safekit_xx.bin dans un répertoire, puis accédez-y.
  * Renommez le fichier .bin en « safekit.bin ».
  * Assurez-vous k3sconfig.sh et safekit.bin sont exécutables.
  * Modifiez le script k3sconfig.sh et personnalisez les variables d'environnement en fonction de votre environnement (y compris une adresse IP virtuelle).
  * Exécuter sur les deux nœuds : `./k3sconfig.sh prereq`


Le script va :

  * Installez les paquets Debian requis : alien, nfs-kernel-server, nfs-common, mariadb-server
  * Installation sécurisée de MariaDB
  * Créer des répertoires pour la réplication des fichiers
  * Préparer le serveur NFS pour le partage de répertoires répliqués
  * Installer SafeKit


### 3. Sur le premier nœud {#3-on-the-first-node}

Exécuter sur le premier nœud : `./k3sconfig.sh first`

Le script va :

  * Créez la base de données de configuration K3S et l'utilisateur k3s
  * Créez le fichier de volume de stockage répliqué (fichier clairsemé) et formatez-le en tant que système de fichiers xfs
  * Créez la configuration du cluster SafeKit et appliquez-la.
  * Installez et configurez le module k3s.safe sur le cluster
  * Démarrez le module k3s en tant que « prim » sur le premier nœud
  * Téléchargez, installez et lancez k3s
  * Téléchargez et installez le graphique Helm nfs-subdir-external-provisioner
  * Afficher le jeton K3S (à utiliser lors de la deuxième phase d'installation du nœud)


### 4. Sur le deuxième nœud {#4-on-the-second-node}

Exécuter sur le deuxième nœud : `./k3sconfig.sh second <token>`

  * <token> est la chaîne affichée à la fin de l'exécution de « k3sconfig.sh premier » sur le premier nœud


Le script va :

  * Assurez-vous que le module k3s est démarré en tant que prim sur le premier nœud
  * Installez k3s sur le deuxième nœud
  * Démarrer le module k3s


### 5. Vérifiez que le module k3s SafeKit est en cours d'exécution sur les deux nœuds {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Vérifiez avec cette commande sur les deux nœuds : `/opt/safekit/safekit –H "*" state`

La réponse devrait être similaire à l'image.
    
    
    /opt/safekit/safekit –H " * " état
    ---------------- Serveur= http://10.0.0.20:9010 ----------------
    action d'administrateur=exec
    --------------------- État k3s ---------------------
    
      Local (127.0.0.1) : PRIME (Service : Disponible) (Couleur : Vert)
    Succès
    ---------------- Serveur= http://10.0.0.21:9010 ----------------
    action d'administrateur=exec
    --------------------- État k3s ---------------------
    
      Local (127.0.0.1) : DEUXIÈME (Service : Disponible) (Couleur : Vert)
    Succès
    

### 6. Démarrez la console web SafeKit pour administrer le cluster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Connectez un navigateur à l'URL de la console Web SafeKit `http://server0-IP:9010` .
  * Vous devriez voir une page similaire à l'image.
  * Vérifiez avec les lignes de commande Linux que K3S est démarré sur les deux nœuds (démarré dans `start_prim` et `start_second` ) et que MariaDB est démarré sur le nœud principal (démarré dans `start_prim` ).


Le cluster ![ Kubernetes a démarré dans la console web SafeKit ](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Test de {#7-testing}

  * Arrêtez le nœud PRIM en faisant défiler son menu contextuel vers le bas et en cliquant sur `Stop` .
  * Vérifiez qu'il y a bien un basculement sur le DEUXIÈME nœud, qui devrait devenir SEUL (vert).
  * À l'aide des lignes de commande sur Linux , vérifiez le basculement des services (arrêtés sur le nœud 1 dans le script `stop_prim` et redémarrés sur le nœud 2 dans le script `start_prim` ). MariaDB et K3S devraient s'exécuter sur le nœud 2.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si ALONE (vert) n'est pas atteint sur le nœud 2, analysez pourquoi avec le journal du module du nœud 2.

  * Cliquez sur `node2` pour afficher le journal du module.
  * [ exemple de journalisation du module SQL Server ](</wp-content/uploads/2024/03/24-module-log-script.png>) où le nom de service dans `start_prim` est invalide. Le processus sqlserver.exe est surveillé, mais comme il n'est pas démarré, le module s'arrête à la fin.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si tout est en ordre, lancez un démarrage sur le nœud 1, ce qui resynchronisera les répertoires répliqués depuis le nœud 2.

En cas de problème, arrêtez le nœud 2 et forcez le démarrage du nœud 1 en tant que ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) [ qui redémarrera avec ses données saines locales au moment de l'arrêt.


Note ![ ](/wp-content/uploads/2022/07/note.png)


🛠️ [ Plus d'informations sur les tests dans le Guide de l'utilisateur. ](</fr/resources/safekit-user-guide-82/#tests>)


![ Arrêter le module sur le serveur PRIM ](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Testez le cluster avec une application Kubernetes comme WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

L'image illustre un exemple d'installation WordPress : un portail web avec une base de données backend implémentée par des pods.

Vous pouvez déployer votre propre application de la même manière.

WordPress est automatiquement hautement disponible :

  * avec ses données (php + base de données) dans des volumes persistants répliqués en temps réel par SafeKit
  * avec une adresse IP virtuelle pour accéder au site WordPress pour les utilisateurs
  * avec basculement automatique et restauration automatique


Remarques :

  * Le graphique WordPress définit un service à charge équilibrée qui écoute sur les ports <service.port> et <service.httpsport> .
  * WordPress est accessible via l'URL : `http://<virtual-ip>:<service.port>.`
  * L'adresse IP virtuelle est gérée par SafeKit et bascule automatiquement en cas de panne.
  * Par défaut, K3S utilise Klipper pour l'équilibrage de charge.
  * Klipper écoute sur <virtual ip> : <service.port> et achemine les paquets TCP/IP vers l'adresse IP et le port du pod WordPress qu'il a sélectionnés.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo ajouter bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

La commande Helm précédente devrait télécharger l'image WordPress depuis `registry-1.docker.io` . Vous pourriez rencontrer des problèmes d'authentification sur `registry-1.docker.io` . Dans ce cas, vous devez :

  * créer `/etc/rancher/k3s/registries.yaml` sur les deux nœuds avec à l'intérieur : 
        
        configurations :
          "registry-1.docker.io":
            authentification :
              nom d'utilisateur : votre_nom_d'utilisateur
              mot de passe : votre_mot_de_passe
            tls :
              insecure_skip_verify: vrai
        

  * arrêtez et démarrez k3s pour en tenir compte, avec `systemctl stop k3s` et `systemctl start k3s` .
  * Exécutez `helm registry login -u your_user_name docker.io` , puis saisissez votre mot de passe


### 9. Support {#9-support}

  * Pour obtenir de l'aide, prenez 2 fichiers SafeKit `Snapshots` (2 fichiers .zip), un pour chaque nœud.


Note ![ ](/wp-content/uploads/2022/07/note.png)


🛠️ Dépannage [ dans le guide de l'utilisateur. ](</fr/resources/safekit-user-guide-82/#Troubleshooting>)


![ Prenez des captures d'écran pour assistance ](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Si nécessaire, configurez un vérificateur de splitbrain {#10-if-necessary-configure-a-splitbrain-checker}

  * Voir ci-dessous [ « Quels sont les différents scénarios en cas d’isolation du réseau dans un cluster ? » ](#isolation) pour savoir si vous devez configurer un vérificateur de splitbrain.
  * Dans la configuration du module, cliquez sur `Advanced Configuration` (voir image) pour modifier `userconfig.xml` .
  * Déclarez le vérificateur de splitbrain en l'ajoutant dans la section `<check>` de `userconfig.xml` : 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` la nouvelle configuration pour redéployer le fichier userconfig.xml modifié sur les deux nœuds (le module doit être arrêté sur les deux nœuds pour enregistrer et appliquer).


Paramètres ** ** :

  * `ident="witness"` identifie le témoin avec un nom de ressource : `splitbrain.witness` . Vous pouvez modifier cette valeur pour identifier le témoin.
  * `exec="ping"` fait référence au code ping à exécuter. Ne modifiez pas cette valeur.
  * `arg="witness IP"` est un argument pour la commande ping. Remplacez cette valeur par l'adresse IP du témoin (un élément robuste, généralement un routeur).


![ Entrez les paramètres ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-fr  %}}
 

## Démonstration de la solution SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}