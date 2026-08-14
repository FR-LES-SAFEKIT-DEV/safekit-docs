---
title: "Comparaison détaillée du stockage partagé SAN et NAS pour le clustering HA"
slug: "san-vs-nas-shared-storage-for-a-failover-cluster"
canonical: "https://safekit.eviden.com/fr/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Comparaison détaillée du stockage partagé SAN et NAS pour le clustering HA Quelle est la solution la plus simple entre un stockage partagé SAN ou NAS pour un cluster de haute disponibilité ?"
category: "best-practises"
lang: "fr"
topics: "Quelle est la solution la plus simple entre un stockage partagé SAN ou NAS pour un cluster de haute disponibilité ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Comparaison détaillée du stockage partagé SAN et NAS pour le clustering HA

## Quelle est la solution la plus simple entre un stockage partagé SAN ou NAS pour un cluster de haute disponibilité ?

###  Stockage partagé SAN ou stockage partagé NAS iSCSI pour un cluster de haute disponibilité 


<img src="/wp-content/uploads/2023/03/raw-disk-shared-storage.png" width="200" alt="Stockage partagé SAN ou stockage partagé NAS iSCSI pour un cluster de haute disponibilité">


Plusieurs éléments rendent cette architecture complexe à mettre en œuvre :

  * en cas de basculement, la commutation du stockage partagé nécessite des instructions de bas niveau qui dépendent du fabricant du stockage,
  * la procédure de récupération du système de fichiers (FS) doit être passée avant de redémarrer l'application,
  * si les deux systèmes de fichiers sur les deux nœuds accèdent au même disque en même temps, le système de fichiers complet sera corrompu,
  * pour éviter un double accès, un disque de quorum doit être configuré.


###  Stockage partagé NAS SMB ou NAS NFS pour cluster de haute disponibilité 


<img src="/wp-content/uploads/2023/03/nas-shared-storage-1.png" width="200" alt="Stockage partagé NAS SMB ou NAS NFS pour cluster de haute disponibilité">


Plusieurs éléments rendent cette architecture simple à mettre en œuvre : 
  * en cas de basculement, le basculement du stockage partagé consiste uniquement au remontage du système de fichiers externe,
  * aucune procédure de récupération sur le système de fichiers ne doit être passée avant de redémarrer l'application,
  * si les deux nœuds accèdent au même système de fichiers partagé en même temps, le système de fichiers complet ne sera pas corrompu,
  * cependant, il existe toujours la possibilité qu'une double exécution de la même application corrompent ses données dans le stockage partagé lorsque les nœuds sont isolés.


###  Réplication en temps réel et basculement avec Eviden SafeKit 


<img src="/wp-content/uploads/2023/03/no-shared-storage.png" width="200" alt="Réplication en temps réel et basculement avec SafeKit">


Il n'y a pas de tels problèmes avec SafeKit car sa solution de réplication et de basculement ne nécessite pas de stockage partagé.

Cependant, si SafeKit doit gérer un stockage partagé :

  * utiliser un stockage partagé NAS SMB ou un stockage partagé NAS NFS,
  * mettre dans les scripts de redémarrage le montage/démontage du système de fichiers externe,
  * configurer le [split brain checker de SafeKit](</fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) pour éviter une double exécution de la même application accédant au stockage partagé lorsque les nœuds sont isolés.



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