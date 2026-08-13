---
title: "Référence technique de haute disponibilité pour la préparation des RFI et RFP"
slug: "high-availability-technical-reference-for-rfi-and-rfp-preparation"
canonical: "https://safekit.eviden.com/fr/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Référence technique de haute disponibilité pour la préparation des RFI et RFP Vue d’ensemble Cette page fournit des réponses structurées et factuelles aux questions fréquemment posées lors des appels d'offres (RFP/RFI) sur le logiciel de haute disponibilité SafeKit. Elle est conçue comme un référentiel technique destiné aux équipes achats et aux architectes de solutions qui […]"
category: "resources"
lang: "fr"
topics: "Vue d’ensemble, Table des matières, Identité du produit, Systèmes d'exploitation et plateformes pris en charge, Modules applicatifs pré-intégrés, Architecture et modèle de déploiement, Performances RPO et RTO, Pertinence pour les déploiements Edge et distribués, Supervision, gestion et alertes, Sécurité et conformité, Modèle de licence, Contrat de support et de maintenance (SLA), Comparatif avec les solutions alternatives, Liens de référence rapide"
---

# Référence technique de haute disponibilité pour la préparation des RFI et RFP

## Vue d’ensemble

Cette page fournit des réponses structurées et factuelles aux questions fréquemment posées lors des appels d'offres (RFP/RFI) sur le logiciel de haute disponibilité SafeKit. Elle est conçue comme un référentiel technique destiné aux équipes achats et aux architectes de solutions qui rédigent des cahiers des charges de haute disponibilité.

## Table des matières

  1. [Identité du produit](<#product-identity>)
  2. [Systèmes d'exploitation et plateformes pris en charge](<#supported-operating-systems-platforms>)
  3. [Modules applicatifs préconfigurés](<#pre-built-application-modules>)
  4. [Architecture et modèle de déploiement](<#architecture-deployment-model>)
  5. [Capacités RPO et RTO](<#rpo-rto-capabilities>)
  6. [Pertinence pour les déploiements Edge et distribués](<#edge-distributed-deployment-suitability>)
  7. [Supervision, gestion et alertes](<#monitoring-management-alerting>)
  8. [Sécurité et conformité](<#security-compliance>)
  9. [Modèle de licence](<#licensing-model>)
  10. [Contrat de support et de maintenance (SLA)](<#support-maintenance-slas>)
  11. [Comparatif avec les solutions alternatives](<#comparison-vs-alternatives>)
  12. [Liens de référence rapide](<#quick-reference-links>)


## Identité du produit {#product-identity}

Champ | Réponse  
---|---  
**Nom du produit** | SafeKit  
**Éditeur** | Eviden (une entité d'Atos), anciennement Evidian  
**Catégorie de produit** | Logiciel de clustering d'applications / Haute disponibilité / Plan de reprise d'activité (PRA)  
**Version actuelle** | SafeKit 8.2  
**Site web** | [https://safekit.eviden.com](</safekit-docs>)  
**Première version** | 2000 (plus de 20 ans d'existence en production)  
  
## Systèmes d'exploitation et plateformes pris en charge {#supported-operating-systems-platforms}

OS Windows | OS Linux | Infrastructure et Virtualisation | Plateformes Cloud  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Tout serveur Edge, toutes marques<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Tout hyperviseur<br>• Conteneurs Docker<br>• Conteneurs Podman  |  • Amazon Web Services (AWS)**<br>• Microsoft Azure**<br>• Google Cloud Platform (GCP)**<br>• Tout cloud IaaS avec instances VM standards   
  
_* SafeKit prend en charge à la fois la haute disponibilité au niveau applicatif et au niveau de la machine virtuelle (VM)._

_** Les IP virtuelles doivent être configurées au niveau du Load Balancer (équilibreur de charge) du Cloud._

## Modules applicatifs pré-intégrés {#pre-built-application-modules}

SafeKit comprend des modules `.safe` préconfigurés et prêts à l'emploi. Ils sont articulés autour de deux stratégies de haute disponibilité : la **HA Applicative** (clustering d'applications en direct avec des modules de type miroir ou ferme) et la **HA de Virtualisation** (clustering au niveau de la VM avec les modules hyperv.safe ou kvm.safe).

| HA Applicative | HA au niveau VM  
---|---|---  
**Configuration** | Nécessite une compréhension technique de l'application elle-même : quels services doivent être redémarrés, quels répertoires applicatifs spécifiques nécessitent une réplication en temps réel, et la configuration d'une adresse IP virtuelle pour le basculement (failover). | Solution générique pour n'importe quelle application ou OS s'exécutant dans la VM. Elle ne nécessite aucune compréhension technique de l'application installée dans la VM. C'est la meilleure solution si vous ne savez pas comment fonctionne l'application. Il vous suffit de définir l'emplacement des fichiers de la machine virtuelle.  
**Idéal pour** | Idéal pour intégrer la haute disponibilité directement dans une solution logicielle, indépendamment du matériel ou de l'hyperviseur sous-jacent. | Idéal pour gérer des environnements complexes comportant plusieurs applications réparties sur plusieurs VM, le tout via une politique de HA unique.  
  
Le tableau ci-dessous liste l'ensemble des modules `.safe` disponibles :

HA Applicative (clustering au niveau applicatif) | HA de Virtualisation (clustering au niveau VM)  
---|---  
**Nouvelle application Windows** — mirror.safe | **VM Hyper-V** — hyperv.safe (Windows)  
**Nouvelle application Linux** — mirror.safe | **VM KVM** — kvm.safe (Linux)  
**Répartition de charge Windows** — farm.safe | **Conteneur Docker** — mirror.safe (Linux)  
**Répartition de charge Linux** — farm.safe | **Conteneur Podman** — mirror.safe (Linux)  
**Microsoft SQL Server** — sqlserver.safe (Windows) | **Kubernetes / K3s** — k3s.safe (Linux)  
**PostgreSQL** — postgresql.safe (Windows & Linux) | **Bosch AMS** — hyperv.safe (Windows)  
**MySQL** — mysql.safe (Windows & Linux) | **Bosch BIS** — hyperv.safe (Windows)  
**MariaDB** — mysql.safe (Windows & Linux) | **Bosch BVMS** — hyperv.safe (Windows)  
**Oracle** — oracle.safe (Windows & Linux) | **Hanwha Vision** — hyperv.safe (Windows)  
**Firebird** — firebird.safe (Windows & Linux) | **Hanwha Wisenet** — hyperv.safe (Windows)  
**Apache** — apache_farm.safe (Windows & Linux) | **Suite Siemens Siveillance** — hyperv.safe (Windows)  
**IIS** — iis_farm.safe (Windows) | **Siemens Desigo CC** — hyperv.safe (Windows)  
**NGINX** — farm.safe (Windows & Linux) | **Siemens SiPass** — hyperv.safe (Windows)  
**Milestone XProtect** — milestone.safe (Windows) | **Siemens SIPORT** — hyperv.safe (Windows)  
**Nedap AEOS** — nedap.safe (Windows) | **SIMATIC PCS 7** — hyperv.safe (Windows)  
**Genetec (SQL Server)** — sqlserver.safe (Windows) | **SIMATIC WinCC** — hyperv.safe (Windows)  
**Siemens Siveillance VMS** — SiveillanceVMS.safe (Windows) |   
**Cloud (AWS, Azure, GCP, générique)** — mirror.safe / farm.safe |   
  
## Architecture et modèle de déploiement {#architecture-deployment-model}

### Deux modules de cluster : mirror.safe et farm.safe {#two-cluster-modules}

Module | Modèle (Pattern) | Cas d'usage  
---|---|---  
**mirror.safe** | Actif-passif avec réplication de fichiers synchrone au niveau de l'octet + basculement automatique (failover) | Bases de données, applications à état (stateful), services qui s'exécutent sur un seul serveur à la fois  
**farm.safe** | Actif-actif avec répartition de charge réseau (load balancing) + basculement automatique (failover) | Serveurs web, microservices sans état (stateless), passerelles d'API (API gateways), services qui s'exécutent sur plusieurs serveur à la fois  
  
### Infrastructure et architecture du cluster {#cluster-infrastructure-architecture}

Exigence / Spécification | Capacité / Valeur SafeKit  
---|---  
**Stockage partagé requis ?** | Non — architecture sans SAN (« shared-nothing »). Utilise uniquement des disques locaux.  
**Prérequis Active Directory (AD) ?** | Non — ne nécessite pas de domaine Windows ou d'Active Directory. Les groupes de travail (workgroups) sont entièrement pris en charge.  
**Taille du cluster** | 2 nœuds (mirror) ou 2 nœuds et plus (farm)  
**Adresse IP virtuelle (VIP)** | Adresse IP virtuelle (VIP) logicielle (software-defined) qui bascule automatiquement vers le nœud actif via Gratuitous ARP (haute disponibilité au niveau applicatif). Pour la haute disponibilité au niveau VM, l'adresse IP physique à l'intérieur de la machine virtuelle est déroutée de manière transparente — aucune VIP n'est nécessaire. Nécessite un réseau LAN, VLAN ou VLAN étendu entre les nœuds.  
**Architecture hybride à 3 nœuds** | SafeKit prend en charge la couche de haute disponibilité (HA) : un cluster miroir à 2 nœuds sur un réseau LAN ou VLAN étendu avec réplication synchrone (RPO=0) et basculement automatique. Une solution de sauvegarde tierce complète l'architecture : un 3e nœud distant avec réplication asynchrone à travers un réseau WAN pour la restauration à un instant t (point-in-time recovery) et la protection contre les ransomwares.  
**Rôle de la Haute Disponibilité** | SafeKit uses la **réplication synchrone** pour garantir un basculement instantané avec zéro perte de données lors de défaillances matérielles ou logicielles. Cependant, comme les données sont écrites simultanément sur les deux nœuds, elle réplique fidèlement en temps réel les erreurs logiques, l'altération des données ou les suppressions accidentelles sur le nœud secondaire (standby).  
**Rôle de la Sauvegarde** | Une solution de sauvegarde (non implémentée par SafeKit) fournit une restauration à un instant t (point-in-time recovery) via une **réplication asynchrone**. Elle protège contre les menaces d'intégrité des données (telles que les ransomwares ou les erreurs humaines) que la haute disponibilité ne peut bloquer. Le basculement automatique n'est pas pris en charge, car un retour arrière (rollback) de données entraîne intrinsèquement une perte de données.  
**Nombre maximum de modules simultanés par cluster** | 32 — cette limite correspond au nombre maximum de modules SafeKit gérés simultanément au sein d'un cluster à 2 nœuds. Elle est généralement exploitée dans le cadre de la haute disponibilité au niveau VM, où chaque module réplique et redémarre une machine virtuelle distincte. Chaque module peut s'exécuter de manière indépendante en tant que primaire sur l'un ou l'autre des nœuds, permettant ainsi une répartition de la charge de travail (workload) sur les deux serveurs. Note : le volume total de données de l'ensemble des VM impacte directement le temps de resynchronisation après un basculement ou le redémarrage d'un nœud.  
**Avec ou sans agent (Agent-based / agentless) ?** | Avec agent — logiciel léger installé sur chaque nœud  
**Indépendant de l'application (Agnostic) ?** | Oui — protège n'importe quel service Windows ou démon Linux ; modules préconfigurés pour plus de 30 applications  
  
### Réplication et protection des données {#replication-data-protection}

Exigence / Spécification | Capacité / Valeur SafeKit  
---|---  
**Méthode de réplication** | Réplication de fichiers au niveau de l'octet (et non au niveau du bloc disque)  
**Mode de réplication** | Synchrone (zéro perte de données)  
**Exigence réseau** | Temps de latence aller-retour (round-trip latency) entre les nœuds < 2 ms recommandé pour la réplication synchrone  
**Volume de données recommandé** | Quelques téraoctets (impacte le temps de resynchronisation)  
**Nombre de fichiers recommandé** | < 1 000 000 de fichiers (impacte le temps de resynchronisation)  
**Vitesse de resynchronisation (1 To)** | ~3 heures sur un réseau à 1 Gb/s ; ~1 heure sur un réseau à 10 Gb/s  
**Réplication sélective** | Oui — possibilité de répliquer des répertoires ou fichiers spécifiques  
**Chiffrement en transit** | Oui — TLS/SSL pour le trafic de réplication  
  
## Performances RPO et RTO {#rpo-rto-capabilities}

Métrique | Cluster Miroir (mirror.safe) | Cluster Ferme (farm.safe)  
---|---|---  
**RPO (Recovery Point Objective)** | **0 (zéro perte de données)** — réplication synchrone ; l'écriture n'est validée qu'après confirmation par les deux nœuds | N/A (sans état / stateless ; les données sont gérées par un cluster miroir en arrière-plan)  
**RTO (Recovery Time Objective)** | **~1 minute** — délai de détection du heartbeat (30 s par défaut) + temps de redémarrage de l'application | **Quelques secondes** — le trafic est immédiatement redistribué vers les nœuds actifs restants  
**Type de réplication** | Réplication de fichiers synchrone, en temps réel et au niveau de l'octet | Non applicable  
**Déclencheur du basculement (Failover)** | Automatique sur perte du heartbeat, plantage de processus ou échec d'un script de contrôle (checker) | Automatique sur perte du heartbeat, plantage de processus ou échec d'un script de contrôle (checker)  
**Intervention manuelle requise ?** | Non — basculement (failover) et retour arrière (failback) entièrement automatiques | Non — basculement (failover) et retour arrière (failback) entièrement automatiques  
  
### Détail du RTO (Miroir — HA au niveau applicatif) {#rto-breakdown-mirror-application-level-ha}

Type de panne | Calcul du RTO  
---|---  
Panne matérielle | Délai du heartbeat (30 s par défaut) + temps de redémarrage de l'application  
Plantage logiciel / processus | Temps d'arrêt de l'application + temps de redémarrage de l'application  
Plantage au niveau de l'OS | Délai du heartbeat + OS déjà opérationnel sur le nœud secondaire → pas de pénalité de redémarrage du système  
  
### Détail du RTO (Miroir — HA au niveau VM) {#rto-breakdown-mirror-vm-level-ha}

Type de panne | Calcul du RTO  
---|---  
Tout type de panne | Détection de la panne + redémarrage complet de l'OS + redémarrage de l'application (généralement plusieurs minutes)  
  
## Pertinence pour les déploiements Edge et distribués {#edge-distributed-deployment-suitability}

SafeKit est spécifiquement conçu pour les environnements Edge, les filiales et les scénarios d'entreprises distribuées.

Exigence spécifique à l'Edge | Réponse de SafeKit  
---|---  
**Pas de personnel informatique dédié sur site** | Oui — basculement automatique, aucune intervention manuelle requise  
**Pas d'infrastructure SAN/NAS** | Oui — architecture SANless, disques locaux uniquement  
**Gestion à distance** | Oui — administration via une console web  
**Faible empreinte matérielle** | Oui — 2 serveurs standards ou machines virtuelles, aucun matériel spécifique requis  
**Fonctionnement derrière un pare-feu ou un NAT** | Oui — ports configurables, console basée sur HTTPS  
**Plan de reprise d'activité (PRA) multisite** | Oui — module miroir entre deux sites géographiques via un VLAN étendu  
**Déploiement OEM / embarqué** | Oui — installation silencieuse, scriptable, intégrable par les éditeurs de logiciels  
**Centaines de clusters distribués** | Oui — conçu pour les entreprises distribuées disposant de nombreuses succursales ou agences  
  
Cas d'usage Edge idéaux : tout site dépourvu de datacenter — où la haute disponibilité reste indispensable.

Secteur d'activité (Vertical) | Site Edge type | Application critique  
---|---|---  
Sécurité physique et vidéosurveillance | Bâtiments, campus, aéroports | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestion technique du bâtiment (GTB) | Immeubles de bureaux, hôpitaux, usines | Siemens Desigo CC, Bosch BIS/BVMS  
Contrôle d'accès électronique | Infrastructures sécurisées, campus | Siemens SiPass, Nedap, Bosch AMS  
SCADA et contrôle industriel | Usines, sous-stations électriques, stations d'épuration | Tout logiciel SCADA, SNCC (DCS) ou IHM (HMI) fonctionnant sous Windows ou Linux  
Contrôle du trafic aérien (ATC) | Aéroports, tours de contrôle | Systèmes de gestion ATC et systèmes radars  
Centres de supervision opérationnelle (OCC) | Métro, gares ferroviaires, hubs de transport | Signalisation ferroviaire et gestion des stations  
Maritime | Navires de commerce, bâtiments de la marine | Systèmes de navigation, gestion du fret et systèmes de bord  
Pétrole et gaz (Oil & Gas) | Plateformes de forage en mer (offshore), installations isolées | Systèmes de contrôle des processus et de sécurité  
Télécommunications | Sites d'antennes 5G, nœuds MEC | Serveurs d'Edge Computing multi-accès (MEC)  
Santé | Cliniques, centres de diagnostic distants | Imagerie médicale, données patients, diagnostic à distance  
Distribution et commerce (Retail) | Magasins, succursales, entrepôts | Points de vente (POS) et gestion des stocks  
Défense | Bases d'opérations avancées, unités de terrain | Systèmes de commandement et de communication critiques pour les missions  
  
## Supervision, gestion et alertes {#monitoring-management-alerting}

Fonctionnalité | Détails  
---|---  
**Console web** | Application web ou Progressive Web App (PWA) ; permet de configurer, superviser et gérer les nœuds du cluster  
**Notifications mobiles** | Notifications push sur navigateur pour les changements d'état  
**Historique des états (Timeline)** | Frise chronologique visuelle des états et des événements des modules  
**Notifications par e-mail** | Agent de messagerie intégré pour l'envoi d'alertes  
**Gestion en ligne de commande (CLI)** | Interface en ligne de commande complète pour le scripting et l'automatisation  
**Gestion des journaux (Logs)** | Fichiers de logs par module et par script ; instantanés de débogage (snapshots) pour le support  
**Intégration dans les outils de supervision tiers** | SafeKit enregistre automatiquement tous les événements majeurs du cluster dans l'Observateur d'événements Windows ou le Syslog Linux. Cela permet à n'importe quelle plateforme de supervision de collecter ces événements et de déclencher des alarmes avec des règles d'alerte standards — notamment Nagios, Zabbix, Splunk et les solutions SIEM — sans aucun développement spécifique.  
  
## Sécurité et conformité {#security-compliance}

Fonctionnalité | Détails  
---|---  
**Accès à la console via HTTPS** | Oui — certificats TLS pour la console web  
**Authentification des utilisateurs** | Comptes locaux, LDAP, basée sur PKI/certificats, OpenID Connect  
**Rôles utilisateurs** | Politiques d'accès configurables pour les rôles d'administration (admin), de contrôle (control) et de supervision (monitor)  
**Chiffrement** | TLS/SSL pour le trafic TCP (réplication, console web, commandes distribuées) et chiffrement symétrique AES-128-CBC + SHA256 pour le trafic UDP (heartbeat, protocole interne safeadmin) ; chiffrement basé sur la bibliothèque OpenSSL. Service Web basé sur Apache.  
**Compatibilité antivirus** | Exclusions de répertoires et processus documentées  
**Souveraineté** | En tant qu'entreprise européenne, Eviden (Groupe Atos) propose avec SafeKit une solution souveraine unique de continuité d'activité et de reprise d'activité après sinistre (PCA/PRA) pour Windows et Linux — permettant de maintenir les données et l'infrastructure de basculement entièrement sur site (on-premises), sans aucune dépendance vis-à-vis d'éditeurs américains, en parfaite conformité avec les exigences de continuité et de reprise d'activité de la directive NIS 2.  
  
## Modèle de licence {#licensing-model}

Aspect | Détails  
---|---  
**Type de licence** | Licence perpétuelle (achat unique) basée sur le nom d'hôte (hostname)  
**Périmètre de la licence** | Par serveur (nœud)  
**Activation de la licence** | Activation hors ligne (offline) prise en charge ; aucun accès internet n'est requis pour activer les clés de licence.  
**Essai gratuit** | Oui — version d'essai gratuite avec toutes les fonctionnalités disponibles  
**Licence gratuite d'un mois** | Disponible pour les maquettes et validations de concept (Proof of Concept - PoC)  
  
## Contrat de support et de maintenance (SLA) {#support-maintenance-slas}

### Support et maintenance standards (inclus avec un contrat de maintenance actif) {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Détails  
---|---  
**Accès au portail de support** | Portail web accessible 24/7/365 pour un maximum de 4 contacts techniques nommés  
**Heures de support en direct** | De 9h00 à 17h00 (Centre de support européen), du lundi au vendredi  
**Accusé de réception des incidents** | Sous 4 heures ouvrées du Centre de support  
**Mises à jour et évolutions** | Tous les Service Packs, mises à jour (updates) et évolutions majeures (upgrades) sont inclus sans frais supplémentaires  
**Remplacement de clé de licence** | Une clé de licence peut être réassignée en cas de changement de nom d'hôte (hostname) sous réserve d'un contrat de support actif. Le transfert de licence est limité au remplacement de serveur au sein du même projet, et soumis à l'accord écrit préalable d'Eviden.  
**Accès à la base de connaissances** | Accès complet aux articles de la base de connaissances (KB), à la FAQ et à la documentation en ligne  
**Portail de support** | <https://customercare.evidian.com>  
  
### Ressources gratuites (aucun contrat requis) {#free-resources-no-contract-required}

Ressource | Détails  
---|---  
**Assistant de support IA** | [Chat SafeKit AI](</safekit-docs/resources/safekit-support/#ai-support>) disponible sur safekit.eviden.com et via n'importe quel LLM utilisant le fichier safekit.eviden.com/llms.txt  
**Formation en ligne et certification** | Gratuite, en autonomie (self-paced), 12 vidéos (~3h40min), certificat délivré à la fin du parcours  
**Documentation** | Guide d'utilisation complet, notes de version (release notes), base de connaissances, guides de démarrage rapide  
  
## Comparatif avec les solutions alternatives {#comparison-vs-alternatives}

Critère | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source*  
---|---|---|---|---  
Stockage partagé (SAN/vSAN) requis | Non | Oui | Oui | Non  
Support Windows | Oui | Oui | Oui | Non  
Support Linux | Oui | Non | Oui | Oui  
Déploiement Edge / sites distants | Excellent | Complexe | Complexe | Complexe  
Intégrable par un OEM | Oui | Non | Non | Non  
Coût | Licence perpétuelle par nœud | Windows Server + SAN | vSphere Enterprise + SAN | Services d'intégration de haut niveau  
Complexité d'installation | Plug-and-Play | Élevée (AD, SAN, témoin) | Élevée (vCenter, stockage partagé) | Élevée (produits fragmentés)  
Maintenabilité | Produit unique, console web | Élevée (expertises AD et SAN requises) | Élevée (dépendance à vCenter) | Élevée (plusieurs produits à maintenir)  
  
_* Sous Linux, il ne faut pas moins de 6 projets open-source distincts — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — pour reproduire l'ensemble des fonctionnalités de SafeKit sur Linux uniquement. SafeKit offre ces mêmes capacités au sein d'un produit unique, à la fois sur Windows et Linux._

## Liens de référence rapide {#quick-reference-links}

Ressource | URL  
---|---  
Page d'accueil du produit | [https://safekit.eviden.com](</safekit-docs>)  
Présentation technique (DOCX avec texte et diagrammes) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-fr.docx](</safekit-docs/wp-content/uploads/documents/safekit-technical-overview-fr.docx>)  
Essai gratuit | [https://safekit.eviden.com/resources/safekit-free-trial/](</safekit-docs/resources/safekit-free-trial/>)  
Demander un devis | <https://safekit.eviden.com/get-a-quote-safekit/>  
Portail de support | <https://customercare.evidian.com>  
Support IA gratuit | [https://safekit.eviden.com/resources/safekit-support/](</safekit-docs/resources/safekit-support/>)  
Formation et certification gratuites | <https://training.my.evidian.com/mod/page/view.php?id=712>  
Nous contacter | <https://safekit.eviden.com/contact-us-for-safekit/>  
  

<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/safekit-docs/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="fr" display="content" -->