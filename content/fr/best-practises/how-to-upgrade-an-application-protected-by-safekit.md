---
title: "Mise à niveau d'une application protégée par SafeKit dans un cluster HA"
canonical: "https://safekit.eviden.com/fr/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Découvrez comment mettre à niveau en toute sécurité les applications protégées par SafeKit . Comparez les mises à niveau mineures et majeures, les mises à niveau progressives, les stratégies de restauration et la haute disponibilité basée sur les machines virtuelles."
category: "best-practises"
lang: "fr"
topics: "Mise à niveau d'une application haute disponibilité protégée par SafeKit , Haute disponibilité au niveau de la machine virtuelle, Haute disponibilité au niveau de l'application, Choix de la stratégie de mise à niveau appropriée, Conclusion, 🔍 Centre de navigation haute disponibilité SafeKit"
---

# Mise à niveau d'une application protégée par SafeKit dans un cluster HA {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Mise à niveau d'une application à haute disponibilité protégée par SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Il est essentiel de maintenir à jour les applications critiques pour l'entreprise afin de garantir la sécurité, les performances et l'accès aux nouvelles fonctionnalités. Lorsqu'une application est protégée par SafeKit , la procédure de mise à niveau dépend de l'architecture de haute disponibilité utilisée.

Il existe deux modèles de déploiement courants :

  * Machine virtuelle **Haute disponibilité** , où l'application s'exécute dans une machine virtuelle protégée gérée par SafeKit .
  * **Haute disponibilité au niveau de l'application** , où l'application est installée sur deux serveurs.


Chaque modèle propose des mécanismes de mise à niveau et des stratégies de restauration différents.

## Haute disponibilité au niveau de la machine virtuelle {#vm-level-ha}

Avec les solutions de basculement de machine virtuelle SafeKit telles que **hyperv.safe** et **kvm.safe** , l'application n'est installée qu'une seule fois à l'intérieur d'une machine virtuelle.

SafeKit protège l'ensemble de la VM plutôt que l'application elle-même, ce qui simplifie considérablement les opérations de maintenance.

### Processus de mise à niveau simplifié {#simplified-upgrade-process}

Étant donné que vous travaillez avec une seule instance de machine virtuelle de l'application, la maintenance est gérée au niveau de la virtualisation plutôt que par un basculement au niveau de l'application.

La procédure de mise à niveau est simple :

  1. Créez un point de contrôle ou un instantané de la machine virtuelle à l'aide de la console de gestion Hyper-V ou KVM.
  2. Effectuez la mise à niveau de l'application à l'intérieur de la machine virtuelle.
  3. Validez l'application mise à jour.
  4. Si la mise à niveau réussit, supprimez le snapshot et poursuivez le fonctionnement normal.
  5. En cas de problème, restaurez la machine virtuelle à partir de l'instantané et revenez immédiatement à son état de fonctionnement précédent connu.


L'interruption de service est limitée à la durée normalement requise par la procédure de mise à niveau propre à l'application.

### Avantages de la protection au niveau de la machine virtuelle {#benefits-of-vm-level-protection}

  * Une seule instance d'application à maintenir.
  * Aucune procédure de mise à niveau prenant en compte le cluster.
  * Restauration rapide grâce aux instantanés de machines virtuelles.
  * Complexité opérationnelle réduite.
  * Processus de mise à niveau uniforme, quelle que soit l'application protégée.


Cette approche est particulièrement intéressante pour les applications packagées et les logiciels commerciaux prêts à l'emploi où le clustering d'applications est indisponible ou difficile à mettre en œuvre.

## Haute disponibilité au niveau de l'application {#app-level-ha}

Dans un cluster SafeKit traditionnel, l'application est installée sur deux nœuds : le nœud 1 et le nœud 2. SafeKit synchronise les données de l'application entre ces nœuds et gère automatiquement le basculement si nécessaire.

### Mise à jour mineure de l'application {#app-level-ha-minor}

Une mise à jour mineure modifie uniquement les fichiers binaires de l'application tout en préservant la compatibilité totale des données répliquées entre les versions. Le format des données répliquées restant inchangé, SafeKit prend en charge une mise à niveau progressive avec un temps d'arrêt minimal. 

  1. Le cluster fonctionne initialement selon une configuration **✅ PRIM (nœud 1) / ✅ SECOND (nœud 2)** . L'application s'exécute sur le nœud PRIM et les données répliquées sont synchronisées en continu avec le nœud SECOND. 
  2. Arrêtez le module SafeKit sur le deuxième nœud ( **❌ ARRÊT (nœud 2)** ), mettez à jour l'application, puis redémarrez le module. Pendant cette opération, l'application continue de fonctionner sur le nœud **✅ SEUL (nœud 1)** et aucune interruption de service ne se produit. 
  3. Après le redémarrage, le nœud mis à niveau rejoint le cluster en tant que **✅ SECOND (nœud 2)** et resynchronise les données répliquées. 
  4. Arrêtez le nœud PRIM ( **❌ ARRÊT (nœud 1)** ). SafeKit effectue automatiquement un basculement et le nœud mis à niveau devient **✅ SEUL (nœud 2)** . L'application redémarre sur ce nœud. L'indisponibilité est limitée à la durée du basculement et du redémarrage de l'application. 
  5. Si l'application mise à niveau fonctionne correctement dans l'état ALONE, mettez à niveau le nœud restant (nœud 1) et redémarrez son module SafeKit . 
  6. Après resynchronisation, le cluster retrouve sa configuration normale **✅ SECOND (nœud 1) / ✅ PRIM (nœud 2)** . Les rôles d'origine peuvent être rétablis manuellement via la console d'administration SafeKit ou automatiquement via la configuration SafeKit . 


**procédure de restauration**

  * À l'étape 5, arrêtez le nœud **✅ ALONE (nœud 2)** .
  * Forcer le nœud d'origine (nœud 1) à démarrer en tant que nœud principal **SEUL (nœud 1)** avec la version précédente de l'application.
  * Réinstallez la version précédente sur le nœud mis à niveau (nœud 2).
  * Retour à une configuration **✅ PRIM (nœud 1) / ✅ SECOND (nœud 2)** normale.


La mise à niveau complète est effectuée avec un temps d'arrêt limité à la transition de **✅ PRIM / ✅ SECOND** à **❌ STOP / ✅ ALONE** . 

### Mise à jour majeure de l'application {#app-level-ha-major}

Une mise à jour majeure modifie le format ou la structure des données répliquées. Les données générées par la nouvelle version n'étant plus compatibles avec l'ancienne, une mise à jour progressive est impossible. 

  1. Le cluster fonctionne initialement dans une configuration **✅ PRIM (nœud 1) / ✅ SECOND (nœud 2)** . 
  2. Arrêtez le DEUXIÈME nœud, puis le nœud PRIM. Le cluster passe à **❌ STOP (nœud 1) / ❌ STOP (nœud 2)** . 
  3. Mettez à jour l'ancien nœud PRIM et redémarrez-le. Le nœud démarre seul sous la forme **✅ SEUL (nœud 1)** avec la nouvelle version de l'application. 
  4. Validez l'application mise à jour et vérifiez qu'elle fonctionne correctement. 
  5. Si la validation réussit, mettez à niveau le nœud restant et redémarrez son module SafeKit . 
  6. Le nœud mis à niveau devient **✅ SECOND (nœud 2)** , resynchronise les données de l'application et le cluster revient à une configuration normale **✅ PRIM (nœud 1) / ✅ SECOND (nœud 2)** . 


**procédure de restauration**

  * À l'étape 5, arrêtez le nœud **✅ ALONE (nœud 1)** mis à niveau.
  * Forcer le nœud non mis à niveau à démarrer en tant que nœud principal **✅ SEUL (nœud 2)** .
  * Réinstallez la version précédente de l'application sur le nœud mis à niveau.
  * Restaurez la configuration d'origine **✅ SECOND (nœud 1) / ✅ PRIM (nœud 2)** .


Étant donné que les données répliquées sont modifiées pendant la migration, le temps d'arrêt correspond à la période entre l'état **❌ STOP / ❌ STOP** et le redémarrage du premier nœud mis à niveau en tant que **✅ ALONE** . 

### Pourquoi SafeKit simplifie les mises à jour d'applications {#why-safekit-simplifies-application-upgrades}

SafeKit minimise les risques opérationnels en permettant aux administrateurs de :

  * Mettez à niveau un nœud à la fois.
  * Maintenir la disponibilité du service autant que possible.
  * Validez les nouvelles versions avant de basculer le trafic de production.
  * Revenez rapidement au nœud précédent en cas de problèmes inattendus.


## Choisir la bonne stratégie de mise à niveau {#choosing-the-right-upgrade-strategy}

Modèle de déploiement | Instances d'application | Impact sur les données répliquées | Approche de mise à niveau  
---|---|---|---  
Haute disponibilité au niveau applicatif | Deux nœuds | Dépend du type de mise à niveau | Mise à niveau progressive avec basculement  
Haute disponibilité au niveau de la machine virtuelle ( hyperv.safe / kvm.safe ) | Une seule machine virtuelle ; | : Gérée au sein de la machine virtuelle ; | Instantané, mise à niveau, validation, restauration si nécessaire.  
  
## Conclusion {#conclusion}

SafeKit propose des architectures de haute disponibilité flexibles qui s'adaptent aux exigences opérationnelles des différentes applications. Qu'il s'agisse de protéger une application en cluster sur deux nœuds ou une instance unique exécutée dans une machine virtuelle, SafeKit permet des mises à niveau contrôlées, minimise les interruptions de service et offre des options de récupération fiables lors des opérations de maintenance.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}