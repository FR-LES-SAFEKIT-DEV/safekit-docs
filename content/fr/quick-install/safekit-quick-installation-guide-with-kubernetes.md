---
title: "Haute disponibilité K3S avec SafeKit : Installez le module k3s.safe pour le basculement"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Déployez le module k3s.safe pour SafeKit afin d’activer la réplication synchrone en temps réel et le basculement automatique de Kubernetes sur Linux. Ce guide vous explique comment configurer un cluster SANless à 2 nœuds pour des applications Linux critiques sans stockage partagé."
category: "quick-install"
lang: "fr"
topics: "Guide d’installation rapide de la haute disponibilité pour Kubernetes, Limitations de la haute disponibilité SafeKit, Présentation de la solution SafeKit/Kubernetes, Installation et configuration de la solution SafeKit/Kubernetes sous Linux (k3s.safe), Quels sont les différents scénarios en cas d’isolement du réseau dans un cluster ?, Démonstration de la solution mirror SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Haute disponibilité K3S avec SafeKit : Installez le module k3s.safe pour le basculement {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-fr app="Kubernetes" mod="k3s"  %}}
 

## Présentation de la solution SafeKit/Kubernetes {#overview-of-the-safekit--kubernetes-solution}

La solution est décrite ici : **💡 [Haute disponibilité Kubernetes K3s : réplication synchrone et basculement à 2 nœuds](</fr/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Installation et configuration de la solution SafeKit/Kubernetes sous Linux (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Télécharger les paquets {#1-download-packages}

  * Téléchargez la version gratuite de SafeKit 8.2 sur Linux (safekitlinux_xx.bin)
  * Téléchargez le module Linux k3s.safe
  * Téléchargez le script k3sconfig.sh
  * Documentation (pptx)


Remarque : le script k3sconfig.sh installe K3S, MariaDB, NFS et SafeKit sur 2 nœuds Linux Ubuntu 24.04.

[Télécharger SafeKit (Linux) >](</fr/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">Télécharger k3s.safe (Linux) ></a> 

[Télécharger k3sconfig.sh >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[Documentation (pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. D’abord sur les deux nœuds {#2-first-on-both-nodes}

Sur 2 nœuds Linux Ubuntu 24.04, en tant que root :

  * Assurez-vous que le nœud a accès à Internet (éventuellement via un proxy)
  * Copiez k3sconfig.sh, k3s.safe et le package safekit_xx.bin dans un répertoire et accédez-y avec cd
  * Renommez le fichier .bin en « safekit.bin »
  * Assurez-vous k3sconfig.sh et safekit.bin sont exécutables.
  * Modifiez le script k3sconfig.sh et personnalisez les variables d’environnement en fonction de votre environnement (y compris une adresse IP virtuelle)
  * Exécutez sur les deux nœuds : `./k3sconfig.sh prereq`


Le script va :

  * Installez les paquets Debian requis : alien, nfs-kernel-server, nfs-common, mariadb-server
  * Installation sécurisée de MariaDB
  * Créer des répertoires pour la réplication de fichiers
  * Préparer le serveur NFS pour le partage des répertoires répliqués
  * Installer SafeKit


### 3. Sur le premier nœud {#3-on-the-first-node}

Exécutez sur le premier nœud : `./k3sconfig.sh first`

Le script va :

  * Créer la base de données de configuration K3S et l’utilisateur k3s
  * Créez le fichier de volume de stockage répliqué (fichier éparse) et formatez-le en tant que système de fichiers xfs
  * Créez la configuration du cluster safekit et appliquez-la
  * Installez et configurez le module k3s.safe sur le cluster
  * Démarrez le module k3s en tant que « prim » sur le premier nœud
  * Télécharger, installer et démarrer k3s
  * Téléchargez et installez le graphique Helm nfs-subdir-external-provisioner
  * Afficher le jeton K3S (à utiliser pendant la deuxième phase d’installation du nœud)


### 4. Sur le deuxième nœud {#4-on-the-second-node}

Exécutez sur le deuxième nœud : `./k3sconfig.sh second <token>`

  * <token> est la chaîne affichée à la fin de l’exécution de « k3sconfig.sh first » sur le premier nœud


Le script va :

  * Assurez-vous que le module k3s est démarré en tant que prim sur le premier nœud
  * Installez k3s sur le deuxième nœud
  * Démarrer le module k3s


### 5. Vérifiez que le module k3s SafeKit est en cours d’exécution sur les deux nœuds {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Vérifiez avec cette commande sur les deux nœuds : `/opt/safekit/safekit –H "*" state`

La réponse devrait être similaire à l’image.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- Serveur = http://10.0.0.20:9010 ----------------
    action admin = exécution
    --------------------- État de k3s ---------------------
    
      Local (127.0.0.1) : PRIM (Service : Disponible) (Couleur : Vert)
    Succès
    ---------------- Serveur = http://10.0.0.21:9010 ----------------
    action admin = exécution
    --------------------- État de k3s ---------------------
    
      Local (127.0.0.1) : SECOND (Service : Disponible) (Couleur : Vert)
    Succès
    

### 6. Démarrez la console web SafeKit pour administrer le cluster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Connectez un navigateur à l’URL de la console web SafeKit `http://server0-IP:9010`.
  * Vous devriez voir une page similaire à l’image.
  * Vérifiez avec les lignes de commande Linux que K3S est démarré sur les deux nœuds (démarré dans `start_prim` et `start_second`) et que MariaDB est démarré sur le nœud principal (démarré dans `start_prim`).


![Le cluster Kubernetes a démarré dans la console web SafeKit](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Tests {#7-testing}

  * Arrêtez le nœud PRIM en faisant défiler son menu contextuel vers le bas et en cliquant sur `Stop`.
  * Vérifiez qu’il y a un basculement sur le SECOND nœud qui devrait devenir ALONE (vert).
  * Et avec les lignes de commande sur Linux, vérifiez le basculement des services (arrêtés sur le nœud 1 dans le script `stop_prim` et démarrés sur le nœud 2 dans le script `start_prim`). MariaDB et K3S devraient s’exécuter sur node2.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si ALONE (vert) n’est pas atteint sur node2, analysez la raison à l’aide du journal du module du nœud 2.

  * Cliquez sur `node2` pour afficher le journal du module.
  * [Exemple de journal de module SQL Server](</wp-content/uploads/2024/03/24-module-log-script.png>) où le nom du service dans `start_prim` n’est pas valide. Le processus sqlserver.exe est surveillé, mais comme il n’est pas démarré, le module s’arrête à la fin.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si tout est correct, lancez une synchronisation sur node1, ce qui resynchronisera les répertoires répliqués à partir node2.

Si les choses tournent mal, arrêtez node2 et [forcez le démarrage](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) du node1 en tant que primaire, qui redémarrera avec ses données localement saines au moment de l’arrêt.


![Remarque](/wp-content/uploads/2022/07/note.png)


🛠️ [Plus d’informations sur les tests dans le guide de l’utilisateur.](</fr/resources/safekit-user-guide-82/#tests>)


![Arrêtez le module sur le serveur PRIM](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Essayez le cluster avec une application Kubernetes comme WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

Vous avez l’exemple d’une installation WordPress dans l’image : un portail web avec une base de données back-end implémentée par des pods.

Vous pouvez déployer votre propre application de la même manière.

WordPress est automatiquement hautement disponible :

  * avec ses données (php + base de données) dans des volumes persistants répliqués en temps réel par SafeKit
  * avec une adresse IP virtuelle pour accéder au site WordPress pour les utilisateurs
  * avec basculement automatique et failback automatique


Remarques :

  * Le graphique WordPress définit un service à charge équilibrée qui écoute sur les ports <service.port> et <service.httpsport>.
  * WordPress est accessible via l’URL suivante : `http://<virtual-ip>:<service.port>.`
  * L’IP virtuelle est gérée par SafeKit et bascule automatiquement en cas de reprise après sinistre.
  * Par défaut, K3S implémente des équilibreurs de charge avec Klipper.
  * Klipper écoute sur <virtual ip> : <service.port> et achemine les paquets TCP/IP vers l’adresse IP et le port du pod WordPress qu’il a sélectionné.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

La commande helm précédente doit télécharger l’image WordPress à partir de `registry-1.docker.io`. Vous pouvez rencontrer des problèmes d’authentification sur `registry-1.docker.io`. Dans ce cas, vous devez :

  * Créez `/etc/rancher/k3s/registries.yaml` sur les deux nœuds avec le contenu suivant : 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * Arrêtez et démarrez k3s pour en tenir compte, avec `systemctl stop k3s` et `systemctl start k3s`.
  * Exécutez la commande `helm registry login -u your_user_name docker.io`, puis saisissez votre mot de passe


### 9. Assistance {#9-support}

  * Pour obtenir de l’aide, prenez 2 `Snapshots` SafeKit (2 fichiers .zip), un pour chaque nœud.


![Remarque](/wp-content/uploads/2022/07/note.png)


🛠️ [Dépannage dans le guide de l’utilisateur.](</fr/resources/safekit-user-guide-82/#Troubleshooting>)


![Prenez les instantanés pour obtenir de l’aide](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Si nécessaire, configurez un checker split-brain {#10-if-necessary-configure-a-splitbrain-checker}

  * Consultez la section ci-dessous [« Quels sont les différents scénarios en cas d’isolement du réseau dans un cluster ? »](#isolation) pour savoir si vous devez configurer un checker split-brain.
  * Dans la configuration du module, cliquez sur `Advanced Configuration` (voir l’image) pour modifier le `userconfig.xml`.
  * Déclarez le checker split-brain en l’ajoutant dans la section `<check>` de `userconfig.xml` : 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` la nouvelle configuration pour redéployer le fichier userconfig.xml modifié sur les deux nœuds (le module doit être arrêté sur les deux nœuds pour enregistrer et appliquer).


**Paramètres** :

  * `ident="witness"` identifie le témoin avec un nom de ressource : `splitbrain.witness`. Vous pouvez modifier cette valeur pour identifier le témoin.
  * `exec="ping"` fait référence au code de ping à exécuter. Ne modifiez pas cette valeur.
  * `arg="witness IP"` est un argument pour le ping. Modifiez cette valeur avec l’IP du témoin (un élément robuste, généralement un routeur).


![Saisissez les paramètres](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-fr  %}}
 

## Démonstration de la solution mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}