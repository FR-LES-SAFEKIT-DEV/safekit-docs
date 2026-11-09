---
title: "Ancienne configuration SafeKit Milestone"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "fr"
topics: "Ancienne configuration étape par étape de la solution SafeKit/Milestone XProtect"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 38 expressions"
---

# Ancienne configuration SafeKit Milestone {#old-safekit-milestone-configuration}

## Ancienne configuration étape par étape de la solution SafeKit/Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Attention, certaines étapes spécifiques sont nécessaires pour la configuration de l’adresse IP virtuelle, sinon le basculement ne fonctionnera pas.

### 1. Lancez la console SafeKit {#1-launch-the-safekit-console}

  * Lancez la console web dans un navigateur sur un nœud du cluster en vous connectant à `http://localhost:9010`.
  * Saisissez `admin` comme nom d’utilisateur et le mot de passe défini lors de l’installation.


Vous pouvez également exécuter la console dans un navigateur sur un poste de travail externe au cluster.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


La configuration de SafeKit s’effectue sur les deux nœuds à partir d’un seul navigateur.


![Remarque](/wp-content/uploads/2022/07/note.png)


Pour sécuriser la console web, consultez la section « Sécurisation de la console web SafeKit dans le Guide de l’utilisateur.


![Démarrez la console web SafeKit pour configurer le cluster](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configurer les adresses des nœuds {#2-configure-node-addresses}

  * Saisissez les adresses IP des nœuds.
  * Cliquez ensuite sur `Apply` pour enregistrer la configuration.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si la couleur d’arrière-plan node1 ou node2 est rouge, vérifiez la connectivité du navigateur aux deux nœuds et vérifiez le pare-feu sur les deux nœuds pour le dépannage.


![Remarque](/wp-content/uploads/2022/07/note.png)


Cette opération placera les adresses IP dans le fichier `cluster.xml` sur les deux nœuds (plus d’informations dans la formation avec la ligne de commande).


![Saisissez les nœuds du cluster](/wp-content/uploads/2023/01/appli-3.png)


### 3. Choisissez le module {#3-choose-the-module}

  * Dans l’onglet Configuration, cliquez sur le module .safe.


![Remarque](/wp-content/uploads/2022/07/note.png)


La console trouve xxx.safe dans le répertoire ’Application_Modules/demo/’ côté serveur si vous y avez déposé un module pendant l’installation.


![Choisissez le module pour](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configurer le module {#4-configure-the-module}

  * Choisissez un démarrage automatique du module au démarrage sans délai.
  * Normalement, vous disposez d’un seul réseau heartbeat sur lequel la réplication est effectuée. Cependant, vous pouvez définir un réseau privé si nécessaire.
  * Vérifiez que les répertoires répliqués sont installés sur les deux nœuds et qu’ils contiennent les données de l’application.  
La réplication des données et des journaux est nécessaire pour une base de données.  
Vous pouvez ajouter de nouveaux répertoires répliqués selon vos besoins.
  * Entrez une adresse IP virtuelle. Une adresse IP virtuelle est une adresse IP standard dans le même réseau IP (même sous-réseau) que les adresses IP des deux nœuds.  
Les clients d’application doivent être configurés avec l’adresse IP virtuelle (ou le nom DNS associé à l’adresse IP virtuelle).  
L’adresse IP virtuelle est automatiquement commutée en cas de défaillance.
  * `start_prim` et `stop_prim` doivent contenir le démarrage et l’arrêt de l’application.  
Vous pouvez ajouter de nouveaux services dans ces scripts.  
Vérifiez que les noms des services dans ces scripts sont ceux qui sont installés sur les deux nœuds, sinon modifiez-les dans les scripts.
  * Arrêtez les services configurés dans `start_prim` sur les deux nœuds.
  * Sous Windows et sur les deux nœuds, avec le gestionnaire de services Windows, définissez `Boot Startup Type = Manual` pour tous les services enregistrés dans `start_prim` (SafeKit contrôle le démarrage des services dans `start_prim`).


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si SQL se trouve sur le serveur de gestion :

  * Les [bases de données système SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (comme master.mdf et mastlog.ldf) doivent se trouver dans les mêmes répertoires sur les deux nœuds. Les répertoires doivent être configurés comme répliqués.
  * SQL doit également être installé au même emplacement dans le système de fichiers sur les deux nœuds, car la [base de données de ressources SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) en lecture seule est située dans le fichier binaire et est nécessaire pour le basculement. Cette base de données n’a pas besoin d’être répliquée.
  * Les bases de données SQL Milestone (.mdf et .ldf) doivent se trouver dans les mêmes répertoires sur les deux nœuds. Les répertoires doivent être configurés comme répliqués. Les bases de données Milestone sont les suivantes, conformément à cet [article](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>).


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Notez que si un nom de processus est affiché dans Process Checker, il sera surveillé avec une action de redémarrage en cas de défaillance. La configuration d’un nom de processus incorrect entraînera l’arrêt du module juste après son démarrage.


![Remarque](/wp-content/uploads/2022/07/note.png)


Le bouton « Appliquer » enregistrera la configuration dans les fichiers `userconfig.xml`, `start_prim`, `stop_prim` sur les deux nœuds (plus d’informations dans la formation avec la ligne de commande).


![Accéder aux paramètres du module](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Vérifier la réussite de la configuration {#5-verify-successful-configuration}

  * Vérifiez le message de réussite (en vert) sur les deux nœuds, puis cliquez sur Suivant.


![Vérifiez la réussite de la configuration du module](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Ne rien démarrer et cliquez sur le bouton Fermer {#6-do-not-start-anything-and-click-on-the-close-button}


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Ne démarrez rien et cliquez sur le bouton Fermer, car une configuration spéciale est requise sur l’adresse IP virtuelle avant le démarrage


![Sélectionnez le nœud avec les données à jour](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Accédez au bureau du nœud 1 et définissez l’adresse IP virtuelle dans les fichiers Milestone internes {#milestone-files}


![Remarque](/wp-content/uploads/2022/07/note.png)


Depuis Milestone 2022 R3, cette étape n’est pas utile et sera effectuée automatiquement avec « Server Configurator - Registering servers - http://virtual-IP" dans une prochaine étape.

Dans une ligne de commande Powershell en tant qu’administrateur, exécutez ce script sur le nœud 1 :
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![Remarque](/wp-content/uploads/2022/07/note.png)


Ce script définit l’adresse IP virtuelle dans 2 fichiers internes Milestone :
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< adresse IP virtuelle>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< virtual-ip>**/IDP"


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Nous supposons à cette étape que l’adresse IP virtuelle a été correctement configurée dans les étapes précédentes (le script utilise l’adresse IP virtuelle saisie dans la console SafeKit et stockée dans `userconfig.xml`).


![Remarque](/wp-content/uploads/2022/07/note.png)


### 8. Démarrez le nœud 1 comme nœud principal dans la console, le nœud avec les données les plus récentes {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Nous supposons, à partir de l’étape 7, que le nœud 1 possède les répertoires répliqués à jour.

Forcer le démarrage du nœud 1 en tant que nœud principal. Lorsque le nœud 2 sera démarré, toutes les données du nœud 1 seront copiées sur le nœud 2.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si vous faites le mauvais choix, vous risquez de synchroniser des données obsolètes sur les deux nœuds.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Il est également supposé que l’application est arrêtée sur le nœud 1 afin que SafeKit installe les mécanismes de réplication, puis démarre l’application dans le script `start_prim`.


![Forcer le démarrage du nœud avec les données les plus récentes en tant que nœud principal](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Attendez la transition vers ALONE (vert) {#9-wait-for-the-transition-to-alone-green}

  * Le nœud 1 doit atteindre l’état ALONE (vert), ce qui signifie que le script `start_prim` a été exécuté sur le nœud 1.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si le statut est ALONE (vert) et que l’application n’est pas démarrée, vérifiez les messages de sortie de `start_prim` dans le journal d’application du nœud 1.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si le nœud 1 n’atteint pas l’état ALONE (vert), analysez la raison à l’aide du journal du module du nœud 1.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si le cluster est dans l’état `WAIT (red) not uptodate - STOP (red) not uptodate`, arrêtez le nœud WAIT et forcez son démarrage en tant que primaire.


![Le premier nœud démarre en tant que primaire et devient ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Sur le bureau du nœud 1, arrêtez, puis enregistrez l’adresse IP virtuelle et redémarrez le serveur de gestion Milestone {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Exécutez les points suivants sur le nœud 1, conformément au menu de l’image :

  * Cliquez avec le bouton droit de la souris sur l’icône **du serveur de gestion Milestone** dans la barre des tâches.
  * **Arrêter le service du serveur de gestion**
  * Choisissez ensuite **Server Configurator ...** et enregistrez l’adresse IP virtuelle.
  * **Démarrer le service du serveur de gestion**


![Remarque](/wp-content/uploads/2022/07/note.png)


Cette procédure enregistre le serveur de gestion du nœud 1 dans la base de données SQL (exécutée sur le nœud 1) via une connexion à l’adresse virtuelle.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Avant la version Milestone 2022 R3, l’enregistrement a pu supprimer la configuration de l’adresse IP virtuelle dans les fichiers internes Milestone. Dans ce cas, répétez [l’étape 7](#milestone-files).


![Remarque](/wp-content/uploads/2022/07/note.png)


Remarque : Pour enregistrer une version antérieure à Milestone 2020 R2, utilisez **Modifier les paramètres de chiffrement...**


![Enregistrez le serveur de gestion dans Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Sur le bureau du nœud 1 avec Milestone Management Client, définissez l’adresse IP virtuelle dans les URL pour les services et le réseau {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![Remarque](/wp-content/uploads/2022/07/note.png)


Depuis Milestone 2022 R3, cette étape n’est pas utile et a été effectuée automatiquement avec « Server Configurator - Enregistrement des serveurs - http://virtual-IP".

Selon l’image :

  1. Démarrez **Milestone XProtect Management Client** sur le nœud 1.
  2. Dans le menu **Outils**, sélectionnez **Services enregistrés**. 
     * Dans la fenêtre **Ajouter/Supprimer des services enregistrés**, sélectionnez un service dans la liste et cliquez sur **Modifier**.
     * Dans la fenêtre **Modifier le service enregistré**, modifiez l’adresse URL du service avec la même adresse URL, mais contenant l’adresse IP virtuelle.
     * Répétez ces étapes pour tous les services répertoriés dans la fenêtre.
  3. Dans la même fenêtre, cliquez sur **Réseau**. 
     * Dans la fenêtre **Configuration du réseau**, modifiez l’adresse URL du serveur avec la même adresse URL, mais contenant l’adresse IP virtuelle.


![Définissez l’adresse IP virtuelle dans les URL et dans le Management Client Milestone](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Sur le bureau du nœud 1 avec Milestone Management Client, définissez les rôles d’administrateur pour assurer un basculement correct {#role}


![Remarque](/wp-content/uploads/2022/07/note.png)


Si Milestone « Authentification Windows » a été configurée avec un Active Directory, l’utilisateur/mot de passe sera récupéré dans l’AD externe sur le nœud secondaire après un basculement, il n’y a donc pas de configuration spéciale.

Lorsque vous démarrez Milestone XProtect Management Client, vous devez vous authentifier soit avec « l’authentification Windows », soit avec « l’authentification de base » ([cliquez ici pour voir la capture d’écran](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

Ouvrez **Milestone XProtect Management Client** et accédez **à Sécurité / Rôles** (voir l’image)

  * Définissez le groupe Windows **BUILTIN\Administrators**. Ainsi, un utilisateur administrateur sur le secondaire pourra se connecter à Milestone sur le secondaire avec « l’authentification Windows ».
  * Créez un utilisateur avec une « authentification de base » (**Admin** sur l’image) pour être sûr de vous réauthentifier sur le nœud secondaire après un basculement. Pour « l’authentification de base », l’utilisateur/mot de passe est stocké dans la base de données SQL et sera récupéré sur le nœud secondaire après un basculement.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


En définissant le groupe BUILTIN\Administrators, vous pourrez vous authentifier sur le nœud secondaire avec un administrateur Windows local.

Sinon, aucune authentification ne sera possible avec un compte Windows local sur le serveur secondaire après un basculement.

C’est parce que le groupe BUILTIN\Administrators a le même SID sur les deux nœuds. Pour les autres groupes locaux ou utilisateurs locaux, l’authentification ne sera pas possible sur le secondaire, car les SID sont différents entre les deux nœuds, même s’ils ont le même nom.


![Définir des rôles dans le Management Client Milestone](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Accédez au bureau du nœud 2 et définissez l’adresse IP virtuelle dans les fichiers internes Milestone {#milestone-files-2}


![Remarque](/wp-content/uploads/2022/07/note.png)


Depuis Milestone 2022 R3, cette étape n’est pas utile et sera effectuée automatiquement avec « Server Configurator - Registering servers - http://virtual-IP" dans une prochaine étape.

Dans une ligne de commande Powershell en tant qu’administrateur, exécutez ce script sur le nœud 2 :
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![Remarque](/wp-content/uploads/2022/07/note.png)


Ce script définit l’adresse IP virtuelle dans 2 fichiers internes Milestone :
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< adresse IP virtuelle>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< virtual-ip>**/IDP"

### 14. Sur le poste de travail du nœud 2, enregistrez le serveur de gestion sur l’adresse IP virtuelle {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Sélectionnez **Server Configurator** dans la barre des tâches du nœud 2 et enregistrez-le sur l’adresse IP virtuelle (voir l’image).
  * **Arrêtez ensuite le service du serveur de gestion**.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Le compte de l’utilisateur qui effectue l’enregistrement sur le nœud 2 doit avoir le rôle d’administrateur dans Milestone sur le nœud 1.

Si c’est l’administrateur local du nœud 2 qui effectue l’enregistrement, le groupe Windows intégré `BUILTIN\Administrators` doit avoir été défini dans Management Client / Sécurité / Rôles à [l’étape 12](#role) Sinon, l’enregistrement ne fonctionnera pas.


![Remarque](/wp-content/uploads/2022/07/note.png)


Cette procédure enregistre le serveur de gestion du nœud 2 dans la base de données SQL (exécutée sur le nœud 1) via une connexion à l’adresse virtuelle.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Avec une version de Milestone antérieure à 2022 R3, l’enregistrement peut avoir supprimé la configuration de l’adresse IP virtuelle dans les fichiers internes Milestone. Dans ce cas, répétez [l’étape 13](#milestone-files-2).


![Enregistrez le serveur de gestion auprès de Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Démarrer le nœud 2 {#15-start-node-2}

  * Démarrez le nœud 2 avec son menu contextuel.
  * Attendez le SECOND état (vert).


![Remarque](/wp-content/uploads/2022/07/note.png)


Le nœud 2 reste dans le SECOND état (magenta) pendant la resynchronisation des répertoires répliqués (copie du nœud 1 vers le nœud 2).

Cette opération peut prendre un certain temps en fonction de la taille des fichiers à resynchroniser dans les répertoires répliqués et de la bande passante du réseau.

Pour suivre la progression de la copie, consultez le journal du module du nœud 2 avec l’option détaillée, sans oublier d’actualiser la fenêtre.


![Le premier nœud démarre en tant que primaire et devient ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. Vérifiez que le cluster est opérationnel {#16-verify-that-the-cluster-is-operational}

  * Vérifiez que le cluster est vert/vert, que les services sont en cours d’exécution sur le nœud PRIM et qu’ils ne sont pas en cours d’exécution sur le nœud SECOND.


Dans cet état, seules les modifications apportées aux fichiers sont répliquées en temps réel.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Les composants qui sont des clients de services doivent être configurés avec l’adresse IP virtuelle. La configuration peut être effectuée avec un nom DNS (si un nom DNS a été créé et associé à l’adresse IP virtuelle).


![Le deuxième nœud démarre en tant que SECOND](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configurer l’adresse IP virtuelle dans les serveurs d’enregistrement {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Installez les serveurs d’enregistrement en spécifiant l’adresse IP virtuelle dans l’URL d’installation.
  * Ou, du côté des serveurs d’enregistrement, définissez l’adresse IP virtuelle dans les champs suivants de 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Connectez le Milestone Management Client et le Milestone Smart Client à l’adresse IP virtuelle.


### 18. Management Client et Smart Client ne fonctionnent pas correctement après le changement de nœud {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

Dans une configuration de serveur de gestion XProtect en cluster, Smart Client et Management Client présentent divers problèmes après un basculement de nœud. Le problème est lié aux jetons générés sur différents nœuds avant et après le basculement de nœud, et aux problèmes d’accès à certains certificats nécessaires à la validation des jetons. Une solution est disponible (pour les versions 2022 R3 à 2023 R2, consultez la base de connaissances Milestone).

Le problème est résolu dans Milestone 2023 R3.

### 18. Tests {#18-testing}

  * Arrêtez le nœud PRIM en faisant défiler son menu contextuel vers le bas et en cliquant sur Arrêter. **N’utilisez pas le swap pour un premier test** (voir pourquoi ci-dessous).
  * Vérifiez qu’il y a un basculement sur le SECOND nœud qui devrait devenir ALONE (vert).
  * Et avec la console d’administration Microsoft (MMC), vérifiez le basculement des services (arrêtés sur le nœud 1 dans le script `stop_prim` et démarrés sur le nœud 2 dans le script `start_prim`).


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si votre système est PRIM-SECOND et que tout fonctionne correctement, effectuez un arrêt sur le PRIM et vérifiez que tout fonctionne correctement sur node2, qui devient ALONE. Si tout est correct, lancez un démarrage sur node1, qui resynchronisera les répertoires répliqués à partir node2.

Si les choses tournent mal, arrêtez node2 et forcez le démarrage du node1 en tant que primaire, qui redémarrera avec ses données localement saines au moment de l’arrêt.

L’échange implique un arrêt-redémarrage du PRIM, qui resynchronisera les données du node2 immédiatement après son arrêt, ne laissant aucune chance de redémarrage sur des données saines en cas de problème de configuration de réplication.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si l’application n’est pas démarrée sur le nœud 2 alors que l’état est ALONE (vert), vérifiez les messages de sortie du script `start_prim` dans le journal des applications du nœud 2.


![Avertissement](/wp-content/uploads/2022/07/warning-small.png)


Si ALONE (vert) n’est pas atteint, analysez la raison à l’aide du journal du module du nœud 2.


![Remarque](/wp-content/uploads/2022/07/note.png)


Plus d’informations sur les tests dans le guide de l’utilisateur


![Arrêtez le module sur le serveur PRIM](/wp-content/uploads/2022/07/appli-19.png)