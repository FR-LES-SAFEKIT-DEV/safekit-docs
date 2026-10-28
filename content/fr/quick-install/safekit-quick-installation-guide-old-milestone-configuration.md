---
title: "Ancienne configuration SafeKit Milestone"
canonical: "https://safekit.eviden.com/fr/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "fr"
topics: "Ancienne configuration étape par étape de la solution SafeKit / Milestone XProtect"
---

# Ancienne configuration SafeKit Milestone {#old-safekit-milestone-configuration}

## Ancienne configuration étape par étape de la solution SafeKit / Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Attention, certaines étapes spécifiques sont nécessaires pour configurer l'adresse IP virtuelle, sinon le basculement ne fonctionnera pas.

### 1. Lancez la console SafeKit {#1-launch-the-safekit-console}

  * Lancez la console Web dans un navigateur sur un nœud du cluster en vous connectant à `http://localhost:9010` .
  * Saisissez `admin` comme nom d'utilisateur et le mot de passe défini lors de l'installation.


Vous pouvez également exécuter la console dans un navigateur sur un poste de travail externe au cluster.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


La configuration de SafeKit s'effectue sur les deux nœuds à partir d'un seul navigateur.


Note ![ ](/wp-content/uploads/2022/07/note.png)


Pour sécuriser la console Web, consultez la section « Sécurisation de la console Web SafeKit » du Guide de l’utilisateur.


![ Démarrez la console web SafeKit pour configurer le cluster ](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configurer les adresses de nœud {#2-configure-node-addresses}

  * Saisissez les adresses IP des nœuds.
  * Cliquez ensuite sur `Apply` pour enregistrer la configuration.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si la couleur d'arrière-plan du nœud 1 ou du nœud 2 est rouge, vérifiez la connectivité du navigateur aux deux nœuds et vérifiez le pare-feu sur les deux nœuds pour résoudre le problème.


Note ![ ](/wp-content/uploads/2022/07/note.png)


Cette opération placera les adresses IP dans le fichier `cluster.xml` sur les deux nœuds (plus d'informations dans la formation avec la ligne de commande).


![ Entrez les nœuds du cluster ](/wp-content/uploads/2023/01/appli-3.png)


### 3. Choisissez le module {#3-choose-the-module}

  * Dans l'onglet Configuration, cliquez sur le module .safe.


Note ![ ](/wp-content/uploads/2022/07/note.png)


La console trouve xxx.safe dans le répertoire 'Application_Modules/demo/' côté serveur si vous y avez déposé un module lors de l'installation.


![ Choisissez le module pour ](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configurer le module {#4-configure-the-module}

  * Choisissez un démarrage automatique du module au démarrage du système, sans délai.
  * Normalement, la réplication s'effectue sur un seul réseau de surveillance. Toutefois, vous pouvez définir un réseau privé si nécessaire.
  * Vérifiez que les répertoires répliqués sont installés sur les deux nœuds et contiennent les données de l'application.  
La réplication des données et des journaux est également nécessaire pour une base de données.  
Vous pouvez ajouter de nouveaux répertoires répliqués selon vos besoins.
  * Saisissez une adresse IP virtuelle. Une adresse IP virtuelle est une adresse IP standard appartenant au même réseau IP (même sous-réseau) que les adresses IP des deux nœuds.  
Les clients d'application doivent être configurés avec l'adresse IP virtuelle (ou le nom DNS associé à l'adresse IP virtuelle).  
L'adresse IP virtuelle est automatiquement commutée en cas de panne.
  * `start_prim` et `stop_prim` doivent contenir le démarrage et l'arrêt de l'application.  
Vous pouvez ajouter de nouveaux services dans ces scripts.  
Vérifiez que les noms des services dans ces scripts correspondent à ceux installés sur les deux nœuds ; sinon, modifiez-les dans les scripts.
  * Arrêtez les services configurés dans `start_prim` sur les deux nœuds.
  * Sur Windows et sur les deux nœuds, avec le gestionnaire de services Windows , configurez `Boot Startup Type = Manual` pour tous les services enregistrés dans `start_prim` ( SafeKit contrôle le démarrage des services dans `start_prim` ).


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si SQL est installé sur le serveur d'administration :

  * Les bases de données système SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (telles que master.mdf et mastlog.ldf) doivent se trouver dans les mêmes répertoires sur les deux nœuds. Ces répertoires doivent être configurés en mode répliqué.
  * SQL doit également être installé au même emplacement dans le système de fichiers sur les deux nœuds, car la base de données de ressources SQL en lecture seule [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) se trouve dans le binaire et est nécessaire au basculement. Cette base de données n'a pas besoin d'être répliquée.
  * Les bases de données SQL Milestone (.mdf et .ldf) doivent se trouver dans les mêmes répertoires sur les deux nœuds. Ces répertoires doivent être configurés en mode répliqué. Les bases de données Milestone sont les suivantes, conformément à l'article [ ](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) .


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Notez que si un nom de processus est affiché dans le Vérificateur de processus, il sera surveillé et redémarré en cas d'échec. Configurer un nom de processus incorrect entraînera l'arrêt immédiat du module après son démarrage.


Note ![ ](/wp-content/uploads/2022/07/note.png)


Le bouton « Appliquer » affichera la configuration dans les fichiers `userconfig.xml` , `start_prim` et `stop_prim` sur les deux nœuds (plus d'informations dans la formation avec la ligne de commande).


![ Entrez les paramètres du module ](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Vérifiez que la configuration a réussi. {#5-verify-successful-configuration}

  * Vérifiez le message de réussite (vert) sur les deux nœuds et cliquez sur Suivant.


![ Vérifier la réussite de la configuration du module ](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Ne lancez rien et cliquez sur le bouton Fermer {#6-do-not-start-anything-and-click-on-the-close-button}


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Ne lancez rien et cliquez sur le bouton Fermer car une configuration spéciale de l'adresse IP virtuelle est requise avant le démarrage.


![ Sélectionnez le nœud contenant les données les plus récentes. ](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Accédez au bureau du nœud 1 et configurez l'adresse IP virtuelle dans les fichiers internes Milestone {#milestone-files}


Note ![ ](/wp-content/uploads/2022/07/note.png)


Depuis Milestone 2022 R3, cette étape n'est plus utile et sera effectuée automatiquement avec « Server Configurator - Registration of servers - http://virtual-IP" à une prochaine étape.

Dans une invite de commandes PowerShell en tant qu'administrateur, exécutez sur le nœud 1 le script suivant :
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


Note ![ ](/wp-content/uploads/2022/07/note.png)


Ce script configure l'adresse IP virtuelle dans 2 fichiers internes Milestone :
    
    
    C:\ProgramData\ Milestone \ XProtect Serveur de gestion\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autorité : " http://** < virtual-ip> ** /IDP "


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Nous supposons à cette étape que l'adresse IP virtuelle a été correctement configurée dans les étapes précédentes (le script utilise l'adresse IP virtuelle saisie dans la console SafeKit et stockée dans `userconfig.xml` ).


Note ![ ](/wp-content/uploads/2022/07/note.png)


### 8. Démarrez le nœud 1 comme nœud principal dans la console, le nœud avec les données à jour {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Nous supposons depuis l'étape 7 que le nœud 1 possède les répertoires répliqués à jour.

Forcer le démarrage du nœud 1 en tant que nœud principal. Lorsque le nœud 2 démarrera, toutes les données du nœud 1 seront copiées sur le nœud 2.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si vous faites le mauvais choix, vous risquez de synchroniser des données obsolètes sur les deux nœuds.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Il est également supposé que l'application est arrêtée sur le nœud 1 afin que SafeKit installe les mécanismes de réplication puis démarre l'application dans le script `start_prim` .


![ Forcer le démarrage en tant que nœud principal du nœud contenant les données à jour. ](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Attendez la transition vers SEUL (vert) {#9-wait-for-the-transition-to-alone-green}

  * Le nœud 1 devrait atteindre l'état ALONE (vert), ce qui signifie que le script `start_prim` a été exécuté sur le nœud 1.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si l'état est SEUL (vert) et que l'application n'est pas démarrée, vérifiez les messages de sortie de `start_prim` dans le journal d'application du nœud 1.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si le nœud 1 n'atteint pas l'état ALONE (vert), analysez pourquoi avec le journal du module du nœud 1.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si le cluster est dans l'état `WAIT (red) not uptodate - STOP (red) not uptodate` , arrêtez le nœud WAIT et forcez son démarrage en tant que nœud principal.


![ Le premier nœud démarre en tant que nœud principal et devient SEUL ](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Sur le poste de travail du nœud 1, arrêtez, puis enregistrez-vous sur l'adresse IP virtuelle et redémarrez le serveur de gestion Milestone {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Exécutez les actions suivantes sur le nœud 1 conformément au menu de l'image :

  * Cliquez avec le bouton droit sur l'icône ** Milestone Serveur de gestion ** dans la barre des tâches.
  * ** Arrêter le service du serveur de gestion **
  * Choisissez ensuite le configurateur de serveur ** ... ** et enregistrez l'adresse IP virtuelle.
  * ** Démarrer le service du serveur de gestion **


Note ![ ](/wp-content/uploads/2022/07/note.png)


Cette procédure enregistre le serveur de gestion du nœud 1 dans la base de données SQL (exécutée sur le nœud 1) via une connexion à l'adresse virtuelle.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Avant la version Milestone 2022 R3, l'enregistrement peut avoir supprimé la configuration de l'adresse IP virtuelle dans les fichiers internes Milestone . Dans ce cas, répétez l'étape 7 [ ](#milestone-files) .


Note ![ ](/wp-content/uploads/2022/07/note.png)


Remarque : Pour enregistrer une version antérieure à Milestone 2020 R2, utilisez ** Modifier les paramètres de chiffrement… **


![ Enregistrez le serveur de gestion dans Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Sur le poste de travail du nœud 1 avec le client de gestion Milestone , configurez l'adresse IP virtuelle dans les URL des services et du réseau {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


Note ![ ](/wp-content/uploads/2022/07/note.png)


Depuis Milestone 2022 R3, cette étape est inutile et est désormais effectuée automatiquement via « Configurateur de serveur - Enregistrement des serveurs - http://virtual-IP".

D'après l'image :

  1. Démarrer le client de gestion ** Milestone XProtect ** sur le nœud 1.
  2. Dans le menu ** Tools ** , sélectionnez ** Registered Services ** . 
     * Dans la fenêtre ** Ajouter/Supprimer des services enregistrés ** , sélectionnez un service dans la liste et cliquez sur ** Modifier ** .
     * Dans la fenêtre ** Modifier le service enregistré ** , modifiez l'adresse URL du service avec la même adresse URL mais contenant l'adresse IP virtuelle.
     * Répétez ces étapes pour tous les services affichés dans la fenêtre.
  3. Dans la même fenêtre, cliquez sur ** Réseau ** . 
     * Dans la fenêtre de configuration réseau ** ** , modifiez l'adresse URL du serveur avec la même adresse URL mais contenant l'adresse IP virtuelle.


![ Configurez l'adresse IP virtuelle dans les URL et dans le client de gestion Milestone ](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Sur le poste de travail du nœud 1 avec le client de gestion Milestone , configurez les rôles d'administrateur pour garantir un basculement correct vers {#role}


Note ![ ](/wp-content/uploads/2022/07/note.png)


Si l'authentification Milestone « Windows » a été configurée avec un Active Directory, l'utilisateur/mot de passe sera récupéré dans l'AD externe sur le nœud secondaire après un basculement, il n'y a donc pas de configuration spéciale.

Lorsque vous démarrez le client de gestion Milestone XProtect , vous devez vous authentifier soit avec « l'authentification Windows », soit avec « l'authentification de base » ( [ cliquez ici pour voir la capture d'écran ](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) ).

Ouvrez ** Milestone XProtect Client de gestion ** et dans ** Sécurité / Rôles ** (voir image)

  * Configurez le groupe Windows ** BUILTIN\Administrators ** . Ainsi, un utilisateur administrateur sur le serveur secondaire pourra se connecter à Milestone sur le serveur secondaire avec l'authentification « Windows ».
  * Créez un utilisateur avec une authentification de base ( ** Admin ** sur l'image) afin de garantir une réauthentification sur le nœud secondaire après un basculement. Pour l'authentification de base, l'identifiant et le mot de passe sont stockés dans la base de données SQL et seront récupérés sur le nœud secondaire après un basculement.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


En configurant le groupe BUILTIN\Administrators, vous pourrez vous authentifier sur le nœud secondaire avec un administrateur local Windows .

Sinon, aucune authentification ne sera possible avec un compte Windows local sur le serveur secondaire après un basculement.

Cela s'explique par le fait que le groupe BUILTIN\Administrators possède le même SID sur les deux nœuds. Pour les autres groupes locaux ou utilisateurs locaux, l'authentification sera impossible sur le nœud secondaire car les SID diffèrent entre les deux nœuds, même s'ils portent le même nom.


![ Définir les rôles dans le client de gestion Milestone ](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Accédez au bureau du nœud 2 et configurez l'adresse IP virtuelle dans les fichiers internes Milestone {#milestone-files-2}


Note ![ ](/wp-content/uploads/2022/07/note.png)


Depuis Milestone 2022 R3, cette étape n'est plus utile et sera effectuée automatiquement avec « Server Configurator - Registration of servers - http://virtual-IP" à une prochaine étape.

Dans une invite de commandes PowerShell en tant qu'administrateur, exécutez sur le nœud 2 le script suivant :
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


Note ![ ](/wp-content/uploads/2022/07/note.png)


Ce script configure l'adresse IP virtuelle dans 2 fichiers internes Milestone :
    
    
    C:\ProgramData\ Milestone \ XProtect Serveur de gestion\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autorité : " http://** < virtual-ip> ** /IDP "

### 14. Sur le poste de travail du nœud 2, enregistrez le serveur de gestion sur l'adresse IP virtuelle {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Choisissez ** Server Configurator ** dans la barre des tâches du nœud 2 et enregistrez-le sur l'adresse IP virtuelle (voir image).
  * Puis ** Arrêter le service du serveur de gestion ** .


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Le compte de l'utilisateur exécutant l'enregistrement sur le nœud 2 doit avoir le rôle d'administrateur dans Milestone sur le nœud 1.

Si l'enregistrement est effectué par l'administrateur local du nœud 2, le groupe intégré Windows `BUILTIN\Administrators` doit avoir été défini dans le client de gestion / Sécurité / Rôles à l'étape 12 [ ](#role) . Sinon, l'enregistrement échouera.


Note ![ ](/wp-content/uploads/2022/07/note.png)


Cette procédure enregistre le serveur de gestion du nœud 2 dans la base de données SQL (exécutée sur le nœud 1) via une connexion à l'adresse virtuelle.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Avec une version de Milestone antérieure à 2022 R3, l'enregistrement peut avoir supprimé la configuration de l'adresse IP virtuelle dans les fichiers internes Milestone . Dans ce cas, répétez l'étape 13 [ ](#milestone-files-2) .


![ Enregistrez le serveur de gestion avec Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Démarrer le nœud 2 {#15-start-node-2}

  * Démarrez le nœud 2 avec son menu contextuel.
  * Attendez le DEUXIÈME état (vert).


Note ![ ](/wp-content/uploads/2022/07/note.png)


Le nœud 2 reste dans l'état SECOND (magenta) pendant la resynchronisation des répertoires répliqués (copie du nœud 1 vers le nœud 2).

Cela peut prendre un certain temps en fonction de la taille des fichiers à resynchroniser dans les répertoires répliqués et de la bande passante du réseau.

Pour suivre l'avancement de la copie, consultez le journal du module du nœud 2 avec l'option détaillée, sans oublier d'actualiser la fenêtre.


![ Le premier nœud démarre en tant que nœud principal et devient SEUL ](/wp-content/uploads/2022/07/appli-11.png)


### 16. Vérifiez que le cluster est opérationnel {#16-verify-that-the-cluster-is-operational}

  * Vérifiez que le cluster est opérationnel (vert/vert) avec des services fonctionnant sur le nœud principal et ne fonctionnant pas sur le second nœud.


Dans cet état, seules les modifications apportées à l'intérieur des fichiers sont répliquées en temps réel.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Les composants clients des services doivent être configurés avec l'adresse IP virtuelle. Cette configuration peut être effectuée à l'aide d'un nom DNS (si un nom DNS a été créé et associé à l'adresse IP virtuelle).


![ Le deuxième nœud commence comme SECOND ](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configurez l'adresse IP virtuelle sur les serveurs d'enregistrement {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Installez les serveurs d'enregistrement en spécifiant l'adresse IP virtuelle dans l'URL d'installation.
  * Ou, côté serveurs d'enregistrement, définissez l'adresse IP virtuelle dans les champs suivants : 
        
        C:\ProgramData\ Milestone \ XProtect Serveur d'enregistrement\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * Connectez le client de gestion Milestone et le client intelligent Milestone à l'adresse IP virtuelle.


### 18. Le client de gestion et le client intelligent ne fonctionnent pas correctement après le basculement du nœud {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

Dans une configuration de serveur de gestion XProtect en cluster, Smart Client et Management Client présentent divers problèmes après un basculement de nœud. Ces problèmes sont liés à la génération de jetons sur différents nœuds avant et après le basculement, ainsi qu'à des difficultés d'accès à certains certificats nécessaires à la validation des jetons. Une solution est disponible (pour les versions 2022 R3 à 2023 R2, voir la base de connaissances Milestone ).

Le problème est résolu dans Milestone 2023 R3.

### 18. Test de {#18-testing}

  * Arrêtez le nœud PRIM en faisant défiler son menu contextuel vers le bas et en cliquant sur Arrêter. ** N'utilisez pas l'échange pour un premier test ** (voir pourquoi ci-dessous).
  * Vérifiez qu'il y a bien un basculement sur le DEUXIÈME nœud, qui devrait devenir SEUL (vert).
  * Et avec la console de gestion Microsoft (MMC), vérifiez le basculement des services (arrêtés sur le nœud 1 dans le script `stop_prim` et démarrés sur le nœud 2 dans le script `start_prim` ).


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si votre système est de type PRIM-SECOND et que tout fonctionne correctement, arrêtez le nœud PRIM et vérifiez que tout fonctionne correctement sur le nœud 2, qui devient ALONE. Si tout est en ordre, démarrez le nœud 1, ce qui resynchronisera les répertoires répliqués depuis le nœud 2.

En cas de problème, arrêtez le nœud 2 et forcez le démarrage en tant que nœud principal du nœud 1, qui redémarrera avec ses données saines locales au moment de l'arrêt.

L'échange implique un arrêt-démarrage du PRIM, qui resynchronisera les données du nœud 2 immédiatement après son arrêt, ne laissant aucune chance de redémarrage sur des données saines en cas de problème de configuration de réplication.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si l'application n'est pas démarrée sur le nœud 2 alors que l'état est SEUL (vert), vérifiez les messages de sortie du script `start_prim` dans le journal d'application du nœud 2.


Avertissement ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si ALONE (vert) n'est pas atteint, analysez pourquoi avec le journal du module du nœud 2.


Note ![ ](/wp-content/uploads/2022/07/note.png)


Vous trouverez plus d'informations sur les tests dans le Guide de l'utilisateur.


![ Arrêter le module sur le serveur PRIM ](/wp-content/uploads/2022/07/appli-19.png)