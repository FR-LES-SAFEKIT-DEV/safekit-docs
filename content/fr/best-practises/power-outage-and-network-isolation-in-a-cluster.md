---
title: "Gestion des pannes de courant et de l'isolation réseau dans un cluster HA"
slug: "power-outage-and-network-isolation-in-a-cluster"
canonical: "https://safekit.eviden.com/fr/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Gestion des pannes de courant et de l'isolation réseau dans un cluster HA"
category: "best-practises"
lang: "fr"
topics: "Quels sont les différents scénarios en cas d'isolement réseau dans un cluster ?, Quels sont les différents scénarios en cas de coupure de courant dans un cluster ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Gestion des pannes de courant et de l'isolation réseau dans un cluster HA


<!-- BEGIN INSERT: insert-safekit-network-isolation-fr lang="fr" display="content" -->
 

## Quels sont les différents scénarios en cas d'isolement réseau dans un cluster ? {#isolation}

### Un seul réseau

Lorsqu'il y a un isolement réseau, le comportement par défaut est :

  * comme les heartbeats sont perdus pour chaque nœud, chaque nœud passe en ALONE et exécute l'application avec son adresse IP virtuelle (double exécution de l'application modifiant ses données locales),
  * lorsque l'isolement est réparé, un nœud ALONE est obligé de s'arrêter et de resynchroniser ses données depuis l'autre nœud,
  * à la fin, le cluster est PRIM-SECOND (ou SECOND-PRIM selon la détection d'adresse IP virtuelle en double faite par Windows).


### Deux réseaux avec un réseau de réplication dédié

Lorsqu'il y a un isolement réseau, le comportement avec un réseau de réplication dédié est :

  * un réseau de réplication dédié est implémenté sur un réseau privé,
  * les heartbeats sur le réseau de production sont perdus (réseau isolé),
  * les heartbeats sur le réseau de réplication fonctionnent (réseau non isolé),
  * le cluster reste à l'état PRIM/SECOND.


### Un seul réseau et un checker split-brain

Lorsqu'il y a un isolement du réseau, le comportement avec un split-brain checker est :

  * un split-brain checker a été configuré avec l'adresse IP d'un témoin (typiquement un routeur),
  * le split-brain agit lorsqu'un serveur passe de PRIM à ALONE ou de SECOND à ALONE,
  * en cas d'isolement du réseau, avant de passer en ALONE, les deux nœuds testent l'adresse IP,
  * le nœud qui peut accéder à l'adresse IP passe à ALONE, l'autre passe à WAIT,
  * lorsque l'isolement est réparé, le nœud WAIT resynchronise ses données et devient SECOND.


Remarque : Si le témoin est en panne ou déconnecté, les deux nœuds passent à WAIT et l'application n'est plus en cours d'exécution. C'est pourquoi vous devez choisir un témoin robuste comme un routeur.


<!-- END INSERT: insert-safekit-network-isolation-fr lang="fr" display="content" -->
 

## Quels sont les différents scénarios en cas de coupure de courant dans un cluster ?

### Coupure de courant du nœud primaire

Lorsqu'une panne de courant arrête uniquement le nœud primaire :

  * il y a un basculement automatique sur le nœud secondaire, qui devient ALONE et redémarre l'application,
  * lorsque le nœud 1 est redémarré, il devient SEDOND après resynchronisation des données répliquées,
  * les rôles de primaire et de secondaire peuvent être échangés par un administrateur si nécessaire.


### Coupure de courant du nœud secondaire

Lorsqu'une panne de courant arrête uniquement le nœud secondaire :

  * il n'y a pas de basculement, le primaire devient ALONE et l'application continue son exécution sur le nœud 1,
  * lorsque le nœud 2 est redémarré, il devient SEDOND après resynchronisation des données répliquées.


### Coupure de courant générale - cas 1

Lorsqu'une panne de courant arrête les deux nœuds, le comportement par défaut est :

  * les deux nœuds passent à STOP,
  * lorsque le nœud 1 est redémarré, il ne passe pas à l'état ALONE et ne redémarre pas l'application car il ne sait pas s'il dispose des données à jour. Il passe donc à l'état WAIT en attendant le redémarrage de l'autre nœud,
  * lorsque le nœud 2 est redémarré, les deux nœuds reviennent à leurs états PRIM/SECOND précédents.


### Coupure de courant générale - cas 2

Lorsqu'il y a un isolement du réseau, le comportement avec un split-brain checker est :

  * un split-brain checker a été configuré avec l'adresse IP d'un routeur (un témoin),
  * en cas d'isolement du réseau, avant de passer en ALONE, les deux nœuds testent l'adresse IP,
  * le nœud qui peut accéder à l'adresse IP passe à ALONE, l'autre passe à WAIT,
  * lorsque l'isolation est réparée, le nœud WAIT resynchronise ses données et devient SECOND.


Remarque : Si le témoin est en panne ou déconnecté, les deux nœuds passent à WAIT et l'application n'est plus en cours d'exécution. C'est pourquoi vous devez choisir un témoin robuste comme un routeur.


<!-- BEGIN INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 

## 🔍 Hub de navigation SafeKit Haute Disponibilité {#hub}

**Explorez SafeKit : fonctionnalités, vidéos techniques, documentation et essai gratuit**

Type de ressource | Description | Lien direct  
---|---|---  
**Fonctionnalités clés** | Pourquoi choisir SafeKit pour une haute disponibilité simple et économique ? | [Voir pourquoi choisir SafeKit pour la Haute Disponibilité](</safekit-docs/fr/#why-choose-safekit-for-ha> "Découvrez les fonctionnalités de SafeKit pour une haute disponibilité simple et économique")  
**Cas d'usage** | Découvrez comment SafeKit garantit la haute disponibilité des infrastructures critiques | [Voir tous les cas d'usage (Logiciels OEM, Serveurs Edge, SCADA, et plus)](</safekit-docs/fr/#safekit-use-cases> "Découvrez les cas d'usage de SafeKit pour la haute disponibilité")  
**Modèle de déploiement** | HA SANless tout-en-un : Cluster logiciel sans partage (Shared-Nothing) | [Voir SafeKit HA SANless tout-en-un](</safekit-docs/fr/#all-in-one-sanless-ha> "En savoir plus sur la haute disponibilité SANless tout-en-un avec cluster logiciel sans partage")  
**Stratégies HA** | SafeKit : Infrastructure (VM) vs Haute Disponibilité au niveau applicatif | [Voir SafeKit HA & Redondance : Niveau VM vs Niveau Applicatif](</safekit-docs/fr/#safekit-ha-redundancy-choices> "Comparez la redondance au niveau VM avec les stratégies de haute disponibilité au niveau applicatif de SafeKit")  
**Spécifications techniques** | Limitations techniques pour le clustering SafeKit | [Voir les limitations de la Haute Disponibilité SafeKit](</safekit-docs/fr/#safekit-ha-limitations> "Configuration requise et limitations techniques pour le clustering d'applications SafeKit")  
**Preuve de concept** | SafeKit : Démos de configuration HA et de basculement | [Voir les tutoriels de basculement SafeKit](</safekit-docs/fr/#safekit-failover-tutorials> "Vidéos pas à pas sur la haute disponibilité SafeKit, de l'installation au basculement automatisé")  
**Architecture** | Fonctionnement du cluster miroir SafeKit (Réplication et basculement en temps réel) | [Voir Cluster miroir SafeKit : réplication et basculement en temps réel](</safekit-docs/fr/#safekit-mirror-cluster> "Découvrez l'architecture technique et le mécanisme de basculement du cluster miroir SafeKit")  
**Architecture** | Fonctionnement du cluster de ferme SafeKit (Répartition de charge réseau et basculement) | [Voir Cluster de ferme SafeKit : répartition de charge et basculement](</safekit-docs/fr/#safekit-farm-cluster> "Présentation technique de l'architecture du cluster de ferme SafeKit avec répartition de charge réseau")  
**Avantages concurrentiels** | Comparaison : SafeKit vs Clusters de Haute Disponibilité (HA) traditionnels | [Voir la comparaison SafeKit vs Clusters HA traditionnels](</safekit-docs/fr/#safekit-ha-comparison> "Comparaison détaillée du logiciel SafeKit par rapport aux clusters HA matériels traditionnels")  
**Ressources techniques** | SafeKit Haute Disponibilité : Documentation, téléchargements et essai | [Voir l'essai gratuit SafeKit HA & la documentation technique](</safekit-docs/fr/#safekit-ha-technical-resources> "Accédez à l'essai gratuit de SafeKit, à la documentation technique et aux livres blancs sur la haute disponibilité")  
**Solutions préconfigurées** | Bibliothèque de modules applicatifs SafeKit : solutions HA prêtes à l'emploi | [Voir les modules applicatifs de Haute Disponibilité SafeKit](</safekit-docs/fr/#safekit-ha-application-modules> "Parcourez la bibliothèque de modules SafeKit préconfigurés pour le basculement automatique d'applications")  
  

<!-- END INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/safekit-docs/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->