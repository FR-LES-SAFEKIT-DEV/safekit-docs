---
title: "Comment mettre à niveau une application protégée par SafeKit"
canonical: "https://safekit.eviden.com/fr/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Mettre à niveau une application protégée par SafeKit : mises à jour mineures et majeures, mises à niveau progressives, options de retour arrière et approche HA de VM."
category: "best-practises"
lang: "fr"
topics: "Mise à niveau d’une application haute disponibilité protégée par SafeKit, Haute disponibilité au niveau des machines virtuelles, Haute disponibilité au niveau de l’application, Choisir la bonne stratégie de mise à niveau, Conclusion"
hashpart: "upgrading-a-high-availability-application-protected-by-safekit, vm-level-ha, app-level-ha, choosing-the-right-upgrade-strategy, conclusion"
translation: "translate_md 2026-11-20.1 | glossaire 2026-11-20.3 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
schemaType: "TechArticle"
---

# Comment mettre à niveau une application protégée par SafeKit {#how-to-upgrade-an-application-protected-by-safekit}

## Mise à niveau d’une application haute disponibilité protégée par SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Il est essentiel de maintenir les applications critiques à jour pour des raisons de sécurité, de performance et d’accès aux nouvelles fonctionnalités. Lorsqu’une application est protégée par SafeKit, la procédure de mise à niveau dépend de l’architecture de haute disponibilité utilisée.

Il existe deux modèles de déploiement courants :

  * **Haute disponibilité de machine virtuelle**, où l’application s’exécute à l’intérieur d’une machine virtuelle protégée gérée par SafeKit.
  * **Haute disponibilité au niveau de l’application**, où l’application est installée sur deux serveurs.


Chaque modèle offre différents mécanismes de mise à niveau et stratégies d’annulation.

## Haute disponibilité au niveau des machines virtuelles {#vm-level-ha}

Avec les solutions de basculement de VM SafeKit telles que **hyperv.safe** et **kvm.safe**, l’application n’est installée qu’une seule fois dans une machine virtuelle.

SafeKit protège l’ensemble de la machine virtuelle, et non l’application elle-même. Cela simplifie considérablement les opérations de maintenance.

### Processus de mise à niveau simplifié {#simplified-upgrade-process}

Étant donné que vous travaillez avec une seule instance de machine virtuelle de l’application, la maintenance est gérée au niveau de la virtualisation plutôt que par le biais du basculement au niveau de l’application.

La procédure de mise à niveau est simple :

  1. Créez un point de contrôle ou un instantané de la machine virtuelle à l’aide de la console de gestion Hyper-V ou KVM.
  2. Effectuez la mise à niveau de l’application dans la machine virtuelle.
  3. Validez l’application mise à niveau.
  4. Si la mise à niveau est effectuée avec succès, supprimez l’instantané et poursuivez le fonctionnement normal.
  5. En cas de problème, restaurez la machine virtuelle à partir de l’instantané et revenez immédiatement à l’état de fonctionnement connu précédent.


L’interruption de service est limitée à la durée normalement requise par la procédure de mise à niveau de l’application.

### Avantages de la protection au niveau des machines virtuelles {#benefits-of-vm-level-protection}

  * Une seule instance d’application à maintenir.
  * Aucune procédure de mise à niveau spécifique au cluster.
  * Restauration rapide grâce aux instantanés de machine virtuelle.
  * Complexité opérationnelle réduite.
  * Processus de mise à niveau cohérent, quelle que soit l’application protégée.


Cette approche est particulièrement intéressante pour les applications packagées et les logiciels commerciaux prêts à l’emploi pour lesquels le clustering d’applications est indisponible ou difficile à mettre en œuvre.

## Haute disponibilité au niveau de l’application {#app-level-ha}

Dans un cluster SafeKit traditionnel, l’application est installée sur deux nœuds : le nœud 1 et le nœud 2. SafeKit synchronise les données de l’application entre ces nœuds et gère automatiquement le basculement si nécessaire.

### Mise à niveau mineure de l’application {#app-level-ha-minor}

Une mise à niveau mineure modifie uniquement les fichiers binaires de l’application tout en conservant la pleine compatibilité des données répliquées entre les versions. Étant donné que le format des données répliquées ne change pas, SafeKit prend en charge une mise à niveau progressive avec un temps d’arrêt minimal. 

  1. Le cluster fonctionne initialement dans une configuration **✅ PRIM (nœud 1) / ✅ SECOND (nœud 2)**. L’application s’exécute sur le nœud PRIM. Les données répliquées sont synchronisées en continu avec le nœud SECOND.
  2. Arrêtez le module SafeKit sur le nœud SECOND. Son état devient **❌ STOP (nœud 2)**. Mettez à niveau l’application et redémarrez le module. Pendant cette opération, l’application continue de fonctionner sur le nœud 1, dans l’état **✅ ALONE (nœud 1)**. Aucune interruption de service ne se produit.
  3. Après le redémarrage, le nœud mis à niveau rejoint le cluster en tant que **✅ SECOND (nœud 2)**. Il resynchronise les données répliquées.
  4. Arrêtez le nœud PRIM. Son état devient **❌ STOP (nœud 1)**. SafeKit effectue automatiquement un basculement. Le nœud mis à niveau devient **✅ ALONE (nœud 2)**. L’application est redémarrée sur ce nœud. Le temps d’arrêt est limité au temps de basculement et de redémarrage de l’application.
  5. Si l’application mise à niveau fonctionne correctement sur le nœud 2, mettez à niveau le nœud restant (nœud 1) et redémarrez son module SafeKit.
  6. Après la resynchronisation, le cluster revient à une configuration normale **✅ SECOND (nœud 1) / ✅ PRIM (nœud 2)**. Les rôles d’origine peuvent être restaurés soit manuellement à l’aide de la console d’administration SafeKit, soit automatiquement via la configuration SafeKit.


**Procédure de restauration**

  * À l’étape 5, arrêtez le nœud 2, dans l’état **✅ ALONE (nœud 2)**.
  * Redémarrez le nœud d’origine (nœud 1) en tant que nœud principal, avec la version précédente de l’application. Son état est **✅ ALONE (nœud 1)**.
  * Réinstallez la version précédente sur le nœud mis à niveau (nœud 2).
  * Restaurez la configuration normale **✅ PRIM (nœud 1) / ✅ SECOND (nœud 2)**.


Le temps d’arrêt pour la mise à niveau complète est limité à la transition de **✅ PRIM/✅ SECOND** à **❌ STOP/✅ ALONE**.

### Mise à niveau majeure de l’application {#app-level-ha-major}

Une mise à niveau majeure modifie le format ou la structure des données répliquées. Étant donné que les données générées par la nouvelle version ne sont plus compatibles avec l’ancienne, une mise à niveau progressive ne peut pas être effectuée.

  1. Le cluster fonctionne initialement dans une configuration **✅ PRIM (nœud 1) / ✅ SECOND (nœud 2)**.
  2. Arrêtez le nœud SECOND, puis le nœud PRIM. Le cluster passe à **❌ STOP (nœud 1) / ❌ STOP (nœud 2)**.
  3. Mettez à niveau l’ancien nœud PRIM et redémarrez-le. Le nœud démarre seul, avec la nouvelle version de l’application. Son état est **✅ ALONE (nœud 1)**.
  4. Validez l’application mise à niveau et vérifiez qu’elle fonctionne correctement.
  5. Si la validation est réussie, mettez à niveau le nœud restant et redémarrez son module SafeKit.
  6. Le nœud mis à niveau devient **✅ SECOND (nœud 2)**. Il resynchronise les données de l’application. Le cluster revient à une configuration normale **✅ PRIM (nœud 1) / ✅ SECOND (nœud 2)**.


**Procédure de restauration**

  * À l’étape 5, arrêtez le nœud 1 mis à niveau, dans l’état **✅ ALONE (nœud 1)**.
  * Redémarrez le nœud non mis à niveau (nœud 2) en tant que nœud principal. Son état est **✅ ALONE (nœud 2)**.
  * Réinstallez la version précédente de l’application sur le nœud mis à niveau.
  * Restaurez la configuration d’origine **✅ SECOND (nœud 1) / ✅ PRIM (nœud 2)**.


Étant donné que les données répliquées sont modifiées pendant la migration, le temps d’arrêt correspond à la période entre l’état **❌ STOP/❌ STOP** et le redémarrage du premier nœud mis à niveau en **✅ ALONE**.

### Avantages de SafeKit pour les mises à niveau d’applications {#why-safekit-simplifies-application-upgrades}

SafeKit minimise les risques opérationnels :

  * Les administrateurs mettent à niveau un nœud à la fois.
  * SafeKit maintient la disponibilité du service dans la mesure du possible.
  * Les nouvelles versions sont validées avant que le trafic de production ne soit basculé.
  * Les administrateurs peuvent rapidement revenir au nœud précédent si des problèmes inattendus sont détectés.


## Choisir la bonne stratégie de mise à niveau {#choosing-the-right-upgrade-strategy}

Modèle de déploiement | Instances d’application | Impact des données répliquées | Approche de mise à niveau  
---|---|---|---  
Haute disponibilité au niveau de l’application | Deux nœuds | Dépend du type de mise à niveau | Mise à niveau progressive avec basculement  
Haute disponibilité au niveau de la machine virtuelle avec hyperv.safe ou kvm.safe | Une machine virtuelle | Géré à l’intérieur de la machine virtuelle | Instantané, mise à niveau, validation, restauration si nécessaire  
  
## Conclusion {#conclusion}

SafeKit fournit des architectures de haute disponibilité flexibles qui s’adaptent aux exigences opérationnelles des différentes applications. Que vous protégiez une application en cluster sur deux nœuds ou une seule instance d’application s’exécutant dans une machine virtuelle, SafeKit permet des mises à niveau contrôlées, minimise les temps d’arrêt et offre des options de récupération fiables chaque fois que des opérations de maintenance sont nécessaires.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}