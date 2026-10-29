---
title: "Référence technique de haute disponibilité pour la préparation des demandes d'informations et des appels d'offres"
canonical: "https://safekit.eviden.com/fr/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Document de référence technique pour faciliter la préparation des documents RFI et RFP relatifs à la haute disponibilité et au clustering d'applications utilisant les concepts et architectures SafeKit."
category: "resources"
lang: "fr"
topics: "Présentation, Sommaire, Identité du produit, Systèmes d'exploitation et plateformes pris en charge, Modules d'application préconfigurés, Architecture et modèle de déploiement, Capacités RPO et RTO, Adaptation aux sites distants et aux déploiements distribués, Surveillance, gestion et alertes, Sécurité et conformité, Modèle de licence, SLA de support et de maintenance, Comparaison avec les alternatives, Liens de référence rapide"
---

# Référence technique de haute disponibilité pour la préparation des demandes d'informations et des appels d'offres {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Aperçu {#overview}

Cette page fournit des réponses structurées et factuelles aux questions courantes concernant les appels d'offres et les demandes d'informations. SafeKit Logiciel à haute disponibilité. Ce document est conçu comme une référence technique pour les équipes d'approvisionnement et les architectes de solutions chargés de rédiger les exigences de haute disponibilité. 

## Table des matières {#table-of-contents}

  1. [Identité du produit](#product-identity)
  2. [Systèmes d'exploitation et plateformes pris en charge](#supported-operating-systems-platforms)
  3. [Modules d'application préconfigurés](#pre-built-application-modules)
  4. [Modèle d'architecture et de déploiement](#architecture-deployment-model)
  5. [Capacités RPO et RTO](#rpo-rto-capabilities)
  6. [Adaptation aux sites distants et aux déploiements distribués](#edge-distributed-deployment-suitability)
  7. [Surveillance, gestion et alerte](#monitoring-management-alerting)
  8. [Sécurité et conformité](#security-compliance)
  9. [Modèle de licence](#licensing-model)
  10. [SLA de support et de maintenance](#support-maintenance-slas)
  11. [Comparaison et alternatives](#comparison-vs-alternatives)
  12. [Liens de référence rapide](#quick-reference-links)


## Identité du produit {#product-identity}

Champ | Répondre  
---|---  
Nom du produit | SafeKit  
Fournisseur | Eviden (une entreprise d'Atos), anciennement Evidian  
Catégorie de produits | Logiciel de clustering d'applications / haute disponibilité / reprise après sinistre  
Version actuelle | SafeKit 8.2  
Site web | [https://safekit.eviden.com/fr](/fr/)  
Première version | 2000 (plus de 20 ans de production)  
  
## Systèmes d'exploitation et plateformes pris en charge {#supported-operating-systems-platforms}

Windows Système d'exploitation | Linux Système d'exploitation | Infrastructure et virtualisation | Plateformes cloud  
---|---|---|---  
• Windows Serveur 2025 (x86-64)<br>• Windows Serveur 2022 (x86-64)<br>• Windows Serveur 2019 (x86-64)<br>• Windows 11 Entreprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Tout serveur Edge, quelle que soit sa marque<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Tout hyperviseur<br>• Docker conteneurs<br>• Podman conteneurs  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Tout cloud IaaS avec des instances de VM standard   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## Modules d'application préconfigurés {#pre-built-application-modules}

SafeKit comprend des éléments prêts à l'emploi et préconfigurés `.safe` modules. Ils sont organisés en deux stratégies HA : **Application HA** (regroupement direct d'applications avec mirror ou `farm` modules) et **Virtualisation HA** (clustering au niveau VM avec hyperv.safe ou kvm.safe).

 | Application HA | Haute disponibilité au niveau de la machine virtuelle  
---|---|---  
Configuration | Cela nécessite une compréhension technique de l'application elle-même : quels services doivent être redémarrés, quels dossiers spécifiques de l'application nécessitent une réplication en temps réel et comment configurer une adresse IP virtuelle pour le basculement. | Solution générique pour toute application ou système d'exploitation exécuté dans une machine virtuelle. Aucune connaissance technique de l'application installée n'est requise. C'est la solution idéale si vous ignorez son fonctionnement. Il vous suffit d'indiquer l'emplacement des fichiers de la machine virtuelle.  
Idéal pour | Idéal pour intégrer la haute disponibilité directement dans une solution logicielle, indépendamment du matériel ou de l'hyperviseur sous-jacent. | Idéal pour gérer des environnements complexes avec plusieurs applications réparties sur plusieurs machines virtuelles via une seule politique de haute disponibilité.  
  
Le tableau ci-dessous répertorie tous les produits disponibles `.safe` modules :

Haute disponibilité des applications (clustering au niveau applicatif) | Haute disponibilité de la virtualisation (clustering au niveau des machines virtuelles)  
---|---  
Nouveau Windows application — mirror.safe | Machine virtuelle Hyper-V — hyperv.safe (Windows)  
Nouveau Linux application — mirror.safe | Machine virtuelle KVM — kvm.safe (Linux)  
Windows Équilibrage de charge — farm.safe | Docker conteneur — mirror.safe (Linux)  
Linux Équilibrage de charge — farm.safe | Podman conteneur — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Vision Hanwha — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Suite Siemens Siveillance — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Nuage (AWS, Azure, GCP, générique) — mirror.safe / farm.safe |   
  
## Modèle d'architecture et de déploiement {#architecture-deployment-model}

### Deux modules de cluster : mirror.safe et farm.safe {#two-cluster-modules}

Module | Modèle | Cas d'utilisation  
---|---|---  
mirror.safe | Mode actif-passif avec réplication synchrone des fichiers au niveau octet et basculement automatique. | Bases de données, applications avec état, services qui ne s'exécutent que sur un seul serveur à la fois  
farm.safe | Mode actif-actif avec répartition de charge réseau et basculement automatique | Serveurs Web, microservices sans état, passerelles API, services s'exécutant simultanément sur plusieurs serveurs  
  
### Infrastructure et architecture du cluster {#cluster-infrastructure-architecture}

Exigence / Spécification | SafeKit Capacité / Valeur  
---|---  
Stockage partagé requis ? | Non — Architecture sans SAN, sans partage de données. Utilise uniquement des disques locaux.  
Prérequis Active Directory (AD) ? | Non — ne nécessite pas de Windows Domaine ou Active Directory. Les groupes de travail sont entièrement pris en charge.  
Taille du cluster | 2 nœuds (mirror) ou 2+ nœuds (`farm`)  
Adresse IP virtuelle (VIP) | VIP logicielle migrant automatiquement vers le nœud actif via ARP gratuit (haute disponibilité au niveau applicatif). Pour la haute disponibilité au niveau des machines virtuelles, l'adresse IP physique interne est redirigée de manière transparente ; aucune VIP n'est requise. Nécessite un réseau local (LAN), un VLAN ou un VLAN étendu entre les nœuds.  
architecture hybride à 3 nœuds | SafeKit couvre la couche HA : un nœud à 2 nœuds mirror Le cluster est déployé sur un réseau local (LAN) ou un VLAN étendu avec réplication synchrone (RPO=0) et basculement automatique. Une solution de sauvegarde tierce complète l'architecture : un troisième nœud distant avec réplication asynchrone sur un réseau étendu (WAN) pour la restauration à un point précis dans le temps et la protection contre les ransomwares.  
Rôle de la haute disponibilité | SafeKit Utilise la réplication synchrone pour garantir un basculement instantané sans perte de données en cas de panne matérielle ou logicielle. Cependant, comme elle écrit les données simultanément sur les deux nœuds, elle réplique fidèlement et en temps réel les erreurs logiques, la dégradation des données ou les suppressions accidentelles sur le nœud de secours.  
Rôle de la sauvegarde | Une solution de secours (non mise en œuvre par SafeKitCette solution permet une restauration à un point précis dans le temps grâce à la réplication asynchrone. Elle protège contre les menaces à l'intégrité des données (telles que les ransomwares ou les erreurs humaines) que la haute disponibilité ne peut bloquer. Le basculement automatique n'est pas pris en charge, car la restauration des données entraîne inévitablement une perte de données.  
Nombre maximal de modules simultanés par cluster | 32 — cette limite couvre le nombre maximal de SafeKit Les modules sont gérés simultanément dans un cluster à deux nœuds, généralement utilisé dans une architecture haute disponibilité au niveau des machines virtuelles où chaque module réplique et redémarre une machine virtuelle différente. Chaque module peut fonctionner indépendamment comme nœud principal sur l'un ou l'autre nœud, permettant ainsi la répartition de la charge de travail entre les deux serveurs. Remarque : le volume total de données de toutes les machines virtuelles influe directement sur le temps de resynchronisation après un basculement ou un redémarrage de nœud.  
Avec ou sans agent ? | Logiciel à base d'agents — logiciel léger installé sur chaque nœud  
Indépendant de l'application ? | Oui — protège tout Windows service ou Linux démon ; modules pré-compilés pour plus de 30 applications  
  
### Réplication et protection des données {#replication-data-protection}

Exigence / Spécification | SafeKit Capacité / Valeur  
---|---  
Méthode de réplication | Réplication de fichiers au niveau octet (et non au niveau bloc du disque)  
Mode de réplication | Synchrone (zéro perte de données)  
Exigences du réseau | Latence aller-retour entre les nœuds < 5 ms recommandée pour la réplication synchrone  
Volume de données recommandé | Quelques téraoctets (temps de resynchronisation)  
Nombre de fichiers recommandé | < 1 000 000 fichiers (temps de resynchronisation)  
Vitesse de resynchronisation (1 To) | Environ 3 heures sur un réseau à 1 Gb/s ; environ 1 heure sur un réseau à 10 Gb/s  
Réplication sélective | Oui — répliquer des répertoires/fichiers spécifiques  
Chiffrement en transit | Oui — TLS/SSL pour le trafic de réplication  
  
## Capacités RPO et RTO {#rpo-rto-capabilities}

### RPO et RTO par type de cluster {#rto-rpo-cluster-type}

Métrique | Mirror Grappe (mirror.safe) | `Farm` Grappe (farm.safe)  
---|---|---  
RPO (Objectif de point de récupération) | 0 (aucune perte de données) — réplication synchrone ; l’écriture est validée uniquement après confirmation des deux nœuds. | N/A (sans état ; données gérées par le serveur) mirror)  
RTO (Objectif de temps de récupération) | ~1 minute — délai d'attente du signal de présence (30 s par défaut) + temps de redémarrage de l'application | Quelques secondes — le trafic est immédiatement redistribué vers les nœuds actifs restants.  
Type de réplication | Réplication de fichiers synchrone, en temps réel et au niveau octet | Non applicable  
Déclencheur de basculement | Arrêt automatique en cas de perte de signal de présence, de plantage du processus ou de défaillance du vérificateur. | Arrêt automatique en cas de perte de signal de présence, de plantage du processus ou de défaillance du vérificateur.  
Intervention manuelle requise ? | Non — basculement et restauration entièrement automatiques | Non — basculement et restauration entièrement automatiques  
  
### Panne RTO (Mirror — HA au niveau de l'application) {#rto-breakdown-mirror-application-level-ha}

Type de défaillance | Calcul du RTO  
---|---  
panne matérielle | Délai d'attente du signal de présence (30 s par défaut) + temps de redémarrage de l'application  
Plantage logiciel/processus | Durée d'arrêt de l'application + durée de redémarrage de l'application  
Plantage au niveau du système d'exploitation | Délai d'attente du signal de présence + système d'exploitation déjà en cours d'exécution sur le système secondaire → pas de pénalité de redémarrage  
  
### Panne RTO (Mirror — Haute disponibilité au niveau de la machine virtuelle) {#rto-breakdown-mirror-vm-level-ha}

Type de défaillance | Calcul du RTO  
---|---  
Tout échec | Détection de panne + redémarrage complet du système d'exploitation + redémarrage de l'application (généralement plusieurs minutes)  
  
## Adaptation aux sites distants et aux déploiements distribués {#edge-distributed-deployment-suitability}

SafeKit est spécialement conçu pour les environnements périphériques, les succursales et les entreprises distribuées.

Exigence de bord | SafeKit Répondre  
---|---  
Aucun personnel informatique dédié sur place | Oui — basculement automatique, sans intervention manuelle  
Aucune infrastructure SAN/NAS | Oui — sans SAN, uniquement des disques locaux  
Gestion à distance | Oui — gestion de la console web  
faible encombrement matériel | Oui — 2 serveurs ou machines virtuelles standard, aucun matériel spécifique requis.  
Fonctionne derrière un pare-feu/NAT | Oui — ports configurables, console basée sur HTTPS  
Reprise après sinistre multisite | Oui - mirror entre deux sites géographiques via un VLAN étendu  
Déploiement OEM/embarqué | Oui — installation silencieuse, scriptable, intégrable par les éditeurs de logiciels  
Des centaines de clusters distribués | Oui, conçu pour les entreprises distribuées avec de nombreuses succursales  
  
Cas d'utilisation idéaux d'Edge : tout site sans centre de données, où la haute disponibilité reste importante :

Verticale | Site Edge typique | Application critique  
---|---|---  
Sécurité physique et surveillance | Bâtiments, campus, aéroports | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestion de bâtiment (BMS) | Immeubles de bureaux, hôpitaux, usines | Siemens Desigo CC, Bosch BIS/BVMS  
Contrôle d'accès électronique (EACS) | Installations sécurisées, campus | Siemens SiPass, NedapBosch AMS  
SCADA et contrôle industriel | Usines, sous-stations, usines de traitement des eaux | Tout logiciel SCADA, DCS ou IHM fonctionnant sur Windows ou Linux  
contrôle du trafic aérien (ATC) | Aéroports, tours de contrôle | Systèmes de gestion du contrôle aérien et radar  
centres de contrôle des opérations (CCO) | Métro, chemin de fer, pôles de transit | Signalisation ferroviaire et gestion des gares  
Maritime | Navires, navires de guerre | Systèmes de navigation, de gestion du fret et de gestion embarquée  
Pétrole et gaz | Plateformes offshore, installations de forage isolées | Systèmes de contrôle des processus et de sécurité  
Télécommunications | Sites d'antennes 5G, nœuds MEC | Serveurs de calcul en périphérie multi-accès (MEC)  
Soins de santé | Cliniques, centres de diagnostic à distance | Imagerie médicale, données patient, télédiagnostic  
Vente au détail | Magasins, succursales, entrepôts | Gestion des points de vente et des stocks  
Défense | Bases opérationnelles avancées, unités de terrain | Systèmes de commandement et de communication critiques pour la mission  
  
## Surveillance, gestion et alerte {#monitoring-management-alerting}

Capacité | Détails  
---|---  
Console Web | Application Web ou application Web progressive (PWA) ; configurer, surveiller et gérer les nœuds du cluster  
Notifications mobiles | Notifications push du navigateur pour les changements d'état  
Chronologie des États | Chronologie visuelle des états et événements du module  
notifications par e-mail | Agent de messagerie intégré pour les alertes  
Gestion de l'interface de ligne de commande | Interface de ligne de commande complète pour le scripting et l'automatisation  
Gestion des journaux | Fichiers journaux par module et par script ; instantanés de débogage pour le support  
intégration de la surveillance tierce | SafeKit enregistre automatiquement tous les événements majeurs du cluster dans le Windows Journal des événements ou Linux Syslog permet à toute plateforme de surveillance de collecter ces événements et de déclencher des alarmes avec des règles d'alerte standard — y compris Nagios, Zabbix, Splunk et les solutions SIEM — sans aucun développement personnalisé.  
  
## Sécurité et conformité {#security-compliance}

Fonctionnalité | Détails  
---|---  
accès à la console HTTPS | Oui — Certificats TLS pour la console web  
Authentification de l'utilisateur | Comptes locaux, LDAP, infrastructure à clés publiques (PKI)/basée sur les certificats, OpenID Connect  
Rôles des utilisateurs | Politiques d'accès configurables pour les rôles d'administrateur, de contrôle et de surveillance  
Cryptage | TLS/SSL pour TCP (réplication, console web, commandes distribuées) et chiffrement symétrique AES-128-CBC + SHA256 pour UDP (signal de présence, protocole interne safeadmin) ; chiffrement basé sur la bibliothèque openSSL. Service web basé sur Apache.  
Compatibilité antivirus | Voies d'exclusion documentées  
Souveraineté | En tant qu'entreprise européenne, Eviden (Groupe Atos) propose avec SafeKit un produit unique de continuité d'activité et de reprise après sinistre souverain pour Windows et Linux — en conservant l’intégralité des données et de l’infrastructure de basculement sur site, sans aucune dépendance vis-à-vis des fournisseurs américains, conformément aux exigences de continuité des activités et de reprise après sinistre de NIS2.  
  
## Modèle de licence {#licensing-model}

Aspect | Détails  
---|---  
Type de licence | Licence perpétuelle (achat unique) basée sur les noms d'hôtes  
Étendue de la licence | Par serveur (nœud)  
Activation de la licence | Activation hors ligne prise en charge ; aucun accès Internet n’est requis pour activer les clés de licence.  
essai gratuit | Oui, un essai gratuit complet est disponible.  
Licence gratuite d'un mois | Disponible pour une preuve de concept  
  
## SLA de support et de maintenance {#support-maintenance-slas}

### Assistance et maintenance standard (incluses dans le contrat de maintenance actif) {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Détails  
---|---  
Accès au portail d'assistance | Portail web accessible 24h/24, 7j/7, 365j/an pour un maximum de 4 contacts techniques désignés.  
heures d'assistance en direct | Centre d'assistance européen, du lundi au vendredi, de 9h00 à 17h00  
Accusé de réception de l'incident | Dans les 4 heures ouvrables du centre d'assistance  
Mises à jour et améliorations | Tous les packs de services, mises à jour et mises à niveau sont inclus sans frais supplémentaires.  
remplacement de la clé de licence | Une clé de licence peut être réattribuée en cas de changement de nom d'hôte dans le cadre d'un contrat de support actif. Le transfert de licence est limité au remplacement de serveur au sein du même projet et est soumis à l'accord écrit préalable d'Eviden.  
Accès à la base de connaissances | Accès complet aux articles de la base de connaissances, à la FAQ et à la documentation en ligne  
Démarrage/arrêt de l'application sans SafeKit | Oui — Arrêtez SafeKit Utilisez un script d'encapsulation pour démarrer ou arrêter l'application. Ce script appelle les scripts de démarrage/arrêt de l'application et configure ou supprime l'adresse IP virtuelle, si nécessaire. 
Portail d'assistance | <https://customercare.evidian.com>  
  
### Ressources gratuites (aucun contrat requis) {#free-resources-no-contract-required}

Ressource | Détails  
---|---  
Assistant de support IA | [SafeKit Chat IA](</fr/resources/safekit-support/#ai-support>) sur safekit.eviden.com et via tout LLM utilisant safekit.eviden.com/llms.txt  
Formation et certification en ligne | Formation gratuite et à votre rythme, 12 vidéos (environ 3 h 40 min), certificat à la fin.  
Documentation | Guide de l'utilisateur complet, notes de version, base de connaissances, guides de démarrage rapide  
  
## Comparaison et alternatives {#comparison-vs-alternatives}

Critère | SafeKit | Microsoft Cluster de basculement (WSFC) | VMware HA | Source libre*  
---|---|---|---|---  
Stockage partagé (SAN/vSAN) requis | Non | Oui | Oui | Non  
Windows soutien | Oui | Oui | Oui | Non  
Linux soutien | Oui | Non | Oui | Oui  
Déploiement en périphérie/branche | Excellent | Complexe | Complexe | Complexe  
Intégrable par l'OEM | Oui | Non | Non | Non  
Coût | Perpétuel par nœud | Windows Serveur + SAN | vSphere Enterprise + SAN | Services d'intégration de haut niveau  
Complexité de la configuration | Prêt à l'emploi | Haut (AD, SAN, témoin) | Élevé (vCenter, stockage partagé) | Élevé (produits fragmentés)  
maintenabilité | Produit unique, console web | Niveau élevé (expertise AD et SAN requise) | Élevée (dépendance à vCenter) | Élevé (produits séparés pour l'entretien)  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## Liens de référence rapide {#quick-reference-links}

Ressource | URL  
---|---  
Page d'accueil du produit | [https://safekit.eviden.com/fr/](/fr/)  
Présentation technique (DOCX avec texte et schémas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-fr.docx](</wp-content/uploads/documents/safekit-technical-overview-fr.docx>)  
essai gratuit | [https://safekit.eviden.com/fr/resources/safekit-free-trial/](</fr/resources/safekit-free-trial/>)  
Obtenez un devis | [https://safekit.eviden.com/fr/safekit-pricing/](</fr/safekit-pricing/>)  
Portail d'assistance | <https://customercare.evidian.com>  
Assistance IA gratuite | [https://safekit.eviden.com/fr/resources/safekit-support/](</fr/resources/safekit-support/>)  
Formation et certification gratuites | [https://safekit.eviden.com/fr/resources/safekit-on-line-training/](</fr/resources/safekit-on-line-training/>)  
Contactez-nous | [https://safekit.eviden.com/fr/contact-us-for-safekit/](</fr/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}