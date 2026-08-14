---
title: "Les meilleurs et les pires cas d’usage de la haute disponibilité : guide de mise en œuvre SafeKit"
slug: "best-worst-use-cases-high-availability"
canonical: "https://safekit.eviden.com/fr/use-cases/best-worst-use-cases-high-availability/"
description: "Les meilleurs et les pires cas d’usage de la haute disponibilité : guide de mise en œuvre SafeKit"
category: "use-cases"
lang: "fr"
topics: "Meilleurs cas d'utilisation de la haute disponibilité SafeKit, Pires cas d'utilisation de la haute disponibilité SafeKit, Limitations de la haute disponibilité SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Les meilleurs et les pires cas d’usage de la haute disponibilité : guide de mise en œuvre SafeKit

##  Meilleurs cas d'utilisation de la haute disponibilité SafeKit 

### Logiciel OEM

Un éditeur de logiciel utilise [SafeKit comme un logiciel OEM](</fr/use-cases/application-clustering-software/>) pour la haute disponibilité de son application.


<img src="/wp-content/uploads/2023/02/safekit-ha-software.png" width="300" alt="Logiciel de clustering SafeKit OEM pour la haute disponibilité d'applications critiques">


### Entreprise distribuée

[Une entreprise distribuée déploie SafeKit](</fr/use-cases/business-continuity-software/>) dans de nombreuses succursales, sans compétence informatique spécifique.


<img src="/wp-content/uploads/2023/02/distributed-enterprise-1.png" width="300" alt="Haute disponibilité dans une entreprise distribuée">


### Sites distants

[SafeKit est déployé dans deux sites distants](</fr/best-practises/high-availability-disaster-recovery-hadr/>) sans nécessiter de baies de disques répliqués à travers un SAN.


<img src="/wp-content/uploads/2023/02/remote-datacenters.png" width="300" alt="Plan de continuité d'activité et plan de secours sans SAN répliqué">


##  Pires cas d'utilisation de la haute disponibilité SafeKit 


<!-- BEGIN INSERT: insert-safekit-usage-fr lang="fr" display="content" -->
 

## Limitations de la haute disponibilité SafeKit {#safekit-ha-limitations}

### Pourquoi une réplication de quelques téraoctets ?

Temps de resynchronisation après une panne ([étape 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>))

  * Réseau 1 Gb/s ≈ 3 heures pour 1 téraoctet.
  * Réseau 10 Gb/s ≈ 1 heure pour 1 téraoctet ou moins selon les performances d’écriture disque.


#### Alternative

  * Pour un volume de données important, utiliser un [stockage partagé externe](</best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/>).
  * Plus coûteux, plus complexe.


### Pourquoi une réplication < 1 000 000 fichiers ?

  * Performance du temps de resynchronisation après une panne ([étape 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>)).
  * Temps nécessaire pour vérifier chaque fichier entre les deux nœuds.


#### Alternative

  * Regrouper les nombreux fichiers à répliquer dans un disque dur virtuel / une machine virtuelle.
  * Seuls les fichiers représentant le disque dur virtuel / la machine virtuelle seront répliqués et resynchronisés dans ce cas.


### Pourquoi un basculement ≤ 32 VM répliquées ?

  * Chaque VM fonctionne dans un module miroir indépendant.
  * Maximum de 32 modules miroir exécutés sur le même cluster.


#### Alternative

  * Utiliser un stockage partagé externe et une autre solution de clustering de VM.
  * Plus coûteux, plus complexe.


### Pourquoi un réseau LAN/VLAN entre sites distants ?

  * Basculement automatique de l’[adresse IP virtuelle](</best-practises/how-a-virtual-ip-address-works/>) avec 2 nœuds dans le même sous-réseau.
  * Bonne bande passante pour la resynchronisation ([étape 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>)) et bonne latence pour la [réplication synchrone](</best-practises/synchronous-replication-vs-asynchronous-replication/>) (typiquement un aller-retour inférieur à 2 ms).


#### Alternative

  * Utiliser un [load balancer pour l’adresse IP virtuelle](</best-practises/how-a-virtual-ip-address-works/>) si les 2 nœuds sont dans 2 sous-réseaux (pris en charge par SafeKit, notamment dans le cloud).
  * Utiliser des solutions de sauvegarde avec réplication asynchrone pour un réseau à forte latence.



<!-- END INSERT: insert-safekit-usage-fr lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 

## 🔍 Hub de navigation SafeKit Haute Disponibilité {#hub}

**Explorez SafeKit : fonctionnalités, vidéos techniques, documentation et essai gratuit**

Type de ressource | Description | Lien direct  
---|---|---  
**Fonctionnalités clés** | Pourquoi choisir SafeKit pour une haute disponibilité simple et économique ? | [Voir pourquoi choisir SafeKit pour la Haute Disponibilité](</fr/#why-choose-safekit-for-ha> "Découvrez les fonctionnalités de SafeKit pour une haute disponibilité simple et économique")  
**Cas d'usage** | Découvrez comment SafeKit garantit la haute disponibilité des infrastructures critiques | [Voir tous les cas d'usage (Logiciels OEM, Serveurs Edge, SCADA, et plus)](</fr/#safekit-use-cases> "Découvrez les cas d'usage de SafeKit pour la haute disponibilité")  
**Modèle de déploiement** | HA SANless tout-en-un : Cluster logiciel sans partage (Shared-Nothing) | [Voir SafeKit HA SANless tout-en-un](</fr/#all-in-one-sanless-ha> "En savoir plus sur la haute disponibilité SANless tout-en-un avec cluster logiciel sans partage")  
**Stratégies HA** | SafeKit : Infrastructure (VM) vs Haute Disponibilité au niveau applicatif | [Voir SafeKit HA & Redondance : Niveau VM vs Niveau Applicatif](</fr/#safekit-ha-redundancy-choices> "Comparez la redondance au niveau VM avec les stratégies de haute disponibilité au niveau applicatif de SafeKit")  
**Spécifications techniques** | Limitations techniques pour le clustering SafeKit | [Voir les limitations de la Haute Disponibilité SafeKit](</fr/#safekit-ha-limitations> "Configuration requise et limitations techniques pour le clustering d'applications SafeKit")  
**Preuve de concept** | SafeKit : Démos de configuration HA et de basculement | [Voir les tutoriels de basculement SafeKit](</fr/#safekit-failover-tutorials> "Vidéos pas à pas sur la haute disponibilité SafeKit, de l'installation au basculement automatisé")  
**Architecture** | Fonctionnement du cluster miroir SafeKit (Réplication et basculement en temps réel) | [Voir Cluster miroir SafeKit : réplication et basculement en temps réel](</fr/#safekit-mirror-cluster> "Découvrez l'architecture technique et le mécanisme de basculement du cluster miroir SafeKit")  
**Architecture** | Fonctionnement du cluster de ferme SafeKit (Répartition de charge réseau et basculement) | [Voir Cluster de ferme SafeKit : répartition de charge et basculement](</fr/#safekit-farm-cluster> "Présentation technique de l'architecture du cluster de ferme SafeKit avec répartition de charge réseau")  
**Avantages concurrentiels** | Comparaison : SafeKit vs Clusters de Haute Disponibilité (HA) traditionnels | [Voir la comparaison SafeKit vs Clusters HA traditionnels](</fr/#safekit-ha-comparison> "Comparaison détaillée du logiciel SafeKit par rapport aux clusters HA matériels traditionnels")  
**Ressources techniques** | SafeKit Haute Disponibilité : Documentation, téléchargements et essai | [Voir l'essai gratuit SafeKit HA & la documentation technique](</fr/#safekit-ha-technical-resources> "Accédez à l'essai gratuit de SafeKit, à la documentation technique et aux livres blancs sur la haute disponibilité")  
**Solutions préconfigurées** | Bibliothèque de modules applicatifs SafeKit : solutions HA prêtes à l'emploi | [Voir les modules applicatifs de Haute Disponibilité SafeKit](</fr/#safekit-ha-application-modules> "Parcourez la bibliothèque de modules SafeKit préconfigurés pour le basculement automatique d'applications")  
  

<!-- END INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->