---
title: "Référence technique de haute disponibilité pour la préparation des demandes d'informations et des appels d'offres"
canonical: "https://safekit.eviden.com/fr/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Référence technique pour aider à préparer les documents RFI et RFP pour la haute disponibilité et le clustering d'applications utilisant les concepts et architectures SafeKit ."
category: "resources"
lang: "fr"
topics: "Présentation, Sommaire, Identité du produit, Systèmes d'exploitation et plateformes pris en charge, Modules d'application préconfigurés, Architecture et modèle de déploiement, Capacités RPO et RTO, Adéquation aux déploiements en périphérie et distribués, Surveillance, gestion et alertes, Sécurité et conformité, Modèle de licence, SLA de support et de maintenance, Comparaison avec les alternatives, Liens de référence rapide"
---

# Référence technique de haute disponibilité pour la préparation des demandes d'informations et des appels d'offres {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Aperçu {#overview}

Cette page fournit des réponses structurées et factuelles aux questions courantes relatives aux appels d'offres et aux demandes d'informations concernant le logiciel de haute disponibilité SafeKit . Elle est conçue comme une référence technique pour les équipes d'approvisionnement et les architectes de solutions chargés de rédiger les spécifications de haute disponibilité. 

## Table des matières {#table-of-contents}

  1. Identité produit [ ](#product-identity)
  2. Systèmes d'exploitation et plateformes pris en charge : [ ](#supported-operating-systems-platforms)
  3. Modules d'application pré-assemblés [ ](#pre-built-application-modules)
  4. Architecture et modèle de déploiement [ ](#architecture-deployment-model)
  5. Capacités RPO et RTO [ ](#rpo-rto-capabilities)
  6. [ Adéquation au déploiement en périphérie et distribué ](#edge-distributed-deployment-suitability)
  7. Surveillance, gestion et alerte [ ](#monitoring-management-alerting)
  8. Sécurité et conformité [ ](#security-compliance)
  9. Modèle de licence [ ](#licensing-model)
  10. Contrats de niveau de service (SLA) pour l'assistance et la maintenance [ ](#support-maintenance-slas)
  11. Comparaison du [ avec les alternatives ](#comparison-vs-alternatives)
  12. Liens de référence rapide [ ](#quick-reference-links)


## Identité du produit {#product-identity}

Réponse au champ |  
---|---  
Nom du produit : | SafeKit  
Fournisseur | Eviden (une entreprise d'Atos), anciennement Evidian  
Catégorie de produit | Logiciel de clustering d'applications / Haute disponibilité / Reprise après sinistre  
Version actuelle | SafeKit 8.2  
Site web | <https://safekit.eviden.com>  
Première version | 2000 (plus de 20 ans de production)  
  
## Systèmes d'exploitation et plateformes pris en charge {#supported-operating-systems-platforms}

Windows Système d'exploitation | Linux Système d'exploitation | Infrastructure et virtualisation | Plateformes cloud  
---|---|---|---  
• Windows Serveur 2025 (x86-64) <br> • Windows Serveur 2022 (x86-64) <br> • Windows Serveur 2019 (x86-64) <br> • Windows 11 Entreprise (x86-64) <br> • Windows 11 Professionnel (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64) | • Tout serveur edge <br> quelle que soit sa marque <br> • VMware <br> • Microsoft Hyper-V * <br> KVM Linux * • Tout hyperviseur <br> • <br> conteneurs Docker • Podman conteneurs | • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • Tout cloud IaaS avec des instances de VM standard   
  
_ * SafeKit prend en charge la haute disponibilité au niveau de l'application et au niveau de la machine virtuelle._

_ Les adresses IP virtuelles ** doivent être configurées au niveau de l'équilibreur de charge cloud._

## Modules d'application pré-assemblés {#pre-built-application-modules}

SafeKit comprend des modules `.safe` préconfigurés et prêts à l'emploi. Ils sont organisés en deux stratégies HA : **HA d'application** (clustering d'application direct avec les modules mirror ou `farm` ) et **HA de virtualisation** (clustering au niveau de la VM avec les modules hyperv.safe ou kvm.safe ).

 | Haute disponibilité de l'application | Haute disponibilité au niveau de la machine virtuelle  
---|---|---  
Configuration | Elle requiert une connaissance technique de l’application : les services à redémarrer, les dossiers nécessitant une réplication en temps réel et la configuration d’une adresse IP virtuelle pour la redondance. | Solution générique pour toute application ou système d’exploitation exécuté dans une machine virtuelle. Elle ne requiert aucune connaissance technique de l’application installée. C’est la solution idéale si vous ne connaissez pas le fonctionnement de l’application. Il vous suffit de définir l’emplacement des fichiers de la machine virtuelle.  
| : Idéal pour intégrer la haute disponibilité directement dans une solution logicielle, indépendamment du matériel ou de l’hyperviseur sous-jacent. | Idéal pour gérer des environnements complexes avec plusieurs applications réparties sur plusieurs machines virtuelles via une seule politique de haute disponibilité.  
  
Le tableau ci-dessous répertorie tous les modules `.safe` disponibles :

Haute disponibilité des applications (clustering au niveau applicatif) | Haute disponibilité de la virtualisation (clustering au niveau des machines virtuelles)  
---|---  
Nouvelle application Windows — Machine virtuelle Hyper-V mirror.safe | — hyperv.safe ( Windows )  
Nouvelle application Linux — mirror.safe | KVM VM — kvm.safe ( Linux )  
Équilibrage de charge Windows — Conteneur farm.safe | Docker — mirror.safe ( Linux )  
Équilibrage de charge Linux — Conteneur farm.safe | Podman — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( Windows & Linux ) | Bosch AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows et Linux ) | Bosch BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows et Linux ) | Bosch BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows et Linux ) | Hanwha Vision — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows & Linux ) | Hanwha Wisenet — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( Windows et Linux ) | Suite Siemens Siveillance — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( Windows et Linux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) | Siemens SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
Genetec ( SQL Server ) — sqlserver.safe ( Windows ) | SIMATIC WinCC — hyperv.safe ( Windows )  
Siemens Siveillance VMS — SiveillanceVMS.safe ( Windows ) |   
Nuage ( AWS , Azure , GCP , générique) — mirror.safe / farm.safe |   
  
## Architecture et modèle de déploiement {#architecture-deployment-model}

### Deux modules de cluster : mirror.safe et farm.safe {#two-cluster-modules}

Module | Modèle | Cas d'utilisation  
---|---|---  
mirror.safe | Actif-passif avec réplication de fichiers synchrone au niveau octet + basculement automatique | Bases de données, applications avec état, services s'exécutant sur un seul serveur à la fois  
farm.safe | Architecture active-active avec répartition de charge réseau et basculement automatique | Serveurs Web, microservices sans état, passerelles API, services exécutés simultanément sur plusieurs serveurs  
  
### Infrastructure et architecture du cluster {#cluster-infrastructure-architecture}

Exigence / Spécification | SafeKit Capacité / Valeur  
---|---  
Stockage partagé requis ? | Non — Architecture sans SAN « rien de partagé ». Utilise uniquement les disques locaux.  
Prérequis Active Directory (AD) ? | Non — Windows domaine ni Active Directory n’est requis. Les groupes de travail sont entièrement pris en charge.  
Taille du cluster | 2 nœuds ( mirror ) ou 2 nœuds ou plus ( `farm` )  
Adresse IP virtuelle (VIP) | VIP logicielle qui migre automatiquement vers le nœud actif via ARP gratuit (haute disponibilité au niveau applicatif). Pour la haute disponibilité au niveau de la machine virtuelle, l’adresse IP physique interne est redirigée de manière transparente ; aucune VIP n’est requise. Nécessite un réseau local (LAN), un réseau local étendu (VLAN) ou un réseau local étendu étendu (VLAN étendu) entre les nœuds.  
L'architecture hybride à 3 nœuds | SafeKit assure la haute disponibilité : un cluster à 2 nœuds mirror sur un réseau local ou un VLAN étendu avec réplication synchrone (RPO = 0) et basculement automatique. Une solution de sauvegarde tierce complète l'architecture : un troisième nœud distant avec réplication asynchrone sur un réseau étendu pour la restauration à un point précis dans le temps et la protection contre les ransomwares.  
Rôle de la haute disponibilité : | SafeKit utilisent la réplication synchrone pour garantir un basculement instantané sans perte de données en cas de panne matérielle ou logicielle. Cependant, comme les données sont écrites simultanément sur les deux nœuds, les erreurs logiques, la dégradation des données ou les suppressions accidentelles sont fidèlement répliquées en temps réel sur le nœud de secours.  
Rôle de la sauvegarde | Une solution de sauvegarde (non implémentée par SafeKit ) permet une restauration à un point précis dans le temps grâce à la réplication asynchrone. Elle protège contre les menaces à l’intégrité des données (telles que les ransomwares ou les erreurs humaines) que la haute disponibilité ne peut bloquer. Le basculement automatique n’est pas pris en charge, car la restauration des données entraîne inévitablement une perte de données.  
Nombre maximal de modules simultanés par cluster | 32. Cette limite correspond au nombre maximal de modules SafeKit gérés simultanément dans un cluster à deux nœuds, généralement utilisé en haute disponibilité au niveau des machines virtuelles, où chaque module réplique et redémarre une machine virtuelle différente. Chaque module peut fonctionner indépendamment comme module principal sur l'un ou l'autre nœud, permettant ainsi la répartition de la charge de travail entre les deux serveurs. Remarque : le volume total de données de toutes les machines virtuelles influe directement sur le temps de resynchronisation après un basculement ou un redémarrage de nœud.  
Avec ou sans agent ? | Avec agent — logiciel léger installé sur chaque nœud  
Compatible avec toutes les applications ? | Oui — protège tout service Windows ou démon Linux ; modules pré-intégrés pour plus de 30 applications  
  
### Réplication et protection des données {#replication-data-protection}

Exigence / Spécification | SafeKit Capacité / Valeur  
---|---  
Méthode de réplication | Réplication de fichiers au niveau octet (et non au niveau bloc du disque)  
Mode de réplication | Synchrone (aucune perte de données)  
Configuration réseau requise : | Latence aller-retour entre les nœuds < 5 ms recommandée pour la réplication synchrone.  
Volume de données recommandé | Quelques téraoctets (temps de resynchronisation)  
Nombre de fichiers recommandé | < 1 000 000 fichiers (temps de resynchronisation)  
Vitesse de resynchronisation (1 To) | environ 3 heures sur un réseau 1 Gbit/s ; environ 1 heure sur un réseau 10 Gbit/s  
Réplication sélective | Oui — répliquer des répertoires/fichiers spécifiques  
Chiffrement en transit | Oui — TLS/SSL pour le trafic de réplication  
  
## Capacités RPO et RTO {#rpo-rto-capabilities}

### RPO et RTO par type de cluster {#rto-rpo-cluster-type}

Cluster de métriques | Mirror ( mirror.safe ) | `Farm` Cluster ( farm.safe )  
---|---|---  
RPO (Objectif de point de récupération) | 0 (zéro perte de données) — réplication synchrone ; écriture acquittée uniquement après confirmation des deux nœuds | N/A (sans état ; données gérées par le backend mirror )  
Objectif de temps de récupération (RTO) | ~1 minute — délai d'expiration du signal de présence (par défaut 30 s) + temps de redémarrage de l'application | Quelques secondes — le trafic est immédiatement redistribué vers les nœuds actifs restants  
Type de réplication | Réplication de fichiers synchrone, en temps réel et au niveau octet | Non applicable  
Déclencheur de basculement | Automatique en cas de perte de signal de présence, de plantage de processus ou de défaillance du vérificateur | Automatique en cas de perte de signal de présence, de plantage de processus ou de défaillance du vérificateur  
Intervention manuelle requise ? | Non — basculement et restauration entièrement automatiques | Non — basculement et restauration entièrement automatiques  
  
### Décomposition RTO ( Mirror — Haute disponibilité au niveau de l'application) {#rto-breakdown-mirror-application-level-ha}

Type de défaillance | Calcul RTO  
---|---  
Défaillance matérielle | Délai d'attente du signal de présence (par défaut : 30 s) + temps de redémarrage de l'application  
Plantage logiciel/processus | Durée d'arrêt de l'application + durée de redémarrage de l'application  
Plantage au niveau du système d'exploitation | Délai d'attente du signal de présence + système d'exploitation déjà en cours d'exécution sur le système secondaire → pas de pénalité de redémarrage  
  
### Décomposition RTO ( Mirror — Haute disponibilité au niveau de la VM) {#rto-breakdown-mirror-vm-level-ha}

Type de défaillance | Calcul RTO  
---|---  
En cas de défaillance | Détection de défaillance + redémarrage complet du système d'exploitation + redémarrage de l'application (généralement plusieurs minutes)  
  
## Adéquation du déploiement en périphérie et distribué {#edge-distributed-deployment-suitability}

SafeKit est spécialement conçu pour les scénarios de périphérie, de succursales et d'entreprises distribuées.

Exigence de bord | SafeKit Réponse  
---|---  
Aucun personnel informatique dédié sur site | Oui — basculement automatique, aucune intervention manuelle  
Pas d'infrastructure SAN/NAS | Oui — Sans SAN, disques locaux uniquement  
Gestion à distance | Oui — gestion par console web  
Faible encombrement matériel | Oui — 2 serveurs ou machines virtuelles standard, aucun matériel spécifique requis  
Fonctionne derrière un pare-feu/NAT | Oui — ports configurables, console HTTPS  
Reprise après sinistre multisite | Oui — mirror entre deux sites géographiques sur un VLAN étendu  
Déploiement OEM/embarqué | Oui — installation silencieuse, scriptable, intégrable par les éditeurs de logiciels  
Des centaines de clusters distribués | Oui — conçus pour les entreprises distribuées avec de nombreuses succursales  
  
Cas d'utilisation idéaux d'Edge : tout site sans centre de données, où la haute disponibilité reste importante :

Vertical | Site typique en bordure | Application critique  
---|---|---  
Sécurité physique et surveillance | Bâtiments, campus, aéroports | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
Gestion technique du bâtiment (GTB) | Immeubles de bureaux, hôpitaux, usines | Siemens Desigo CC, Bosch BIS/BVMS  
Contrôle d'accès électronique (EACS) | Installations sécurisées, campus | Siemens SiPass, Nedap , Bosch AMS  
SCADA et contrôle industriel | Usines, sous-stations, stations de traitement des eaux | Tout logiciel SCADA, DCS ou IHM fonctionnant sur Windows ou Linux  
Contrôle du trafic aérien (ATC) | Aéroports, tours de contrôle | Systèmes de gestion ATC et radar  
Centres de contrôle des opérations (CCO) | Métro, chemin de fer, pôles de transport en commun | Signalisation ferroviaire et gestion des gares  
Navires maritimes | , bâtiments de guerre | Systèmes de navigation, de chargement et de gestion à bord  
Pétrole et gaz | Plateformes offshore, installations de forage à distance | Systèmes de contrôle des procédés et de sécurité  
Sites d'antennes 5G | , nœuds MEC | serveurs de calcul en périphérie multi-accès (MEC).  
Soins de santé | Cliniques, centres de diagnostic à distance | Imagerie médicale, données patient, diagnostic à distance  
Commerce de détail | Magasins, succursales, entrepôts | Gestion des points de vente et des stocks  
Défense | Bases opérationnelles avancées, unités de terrain | Systèmes de commandement et de communication critiques pour la mission  
  
## Surveillance, gestion et alerte {#monitoring-management-alerting}

Détails de la capacité |  
---|---  
Console Web | Application Web ou application Web progressive (PWA) ; configurer, surveiller et gérer les nœuds du cluster  
Notifications mobiles | Notifications push du navigateur pour les changements d'état  
Chronologie des états | Chronologie visuelle des états et événements du module  
Notifications par e-mail | Agent de messagerie intégré pour les alertes  
Gestion CLI | Interface de ligne de commande complète pour le scripting et l'automatisation  
Gestion des journaux | fichiers journaux par module et par script ; instantanés de débogage pour le support  
L'intégration de surveillance tierce | SafeKit enregistre automatiquement tous les événements majeurs du cluster dans le journal d'événements Windows ou le Syslog Linux , permettant à toute plateforme de surveillance de collecter ces événements et de déclencher des alarmes avec des règles d'alerte standard — y compris Nagios, Zabbix, Splunk et les solutions SIEM — sans aucun développement personnalisé.  
  
## Sécurité et conformité {#security-compliance}

Détails de la fonctionnalité |  
---|---  
Accès à la console HTTPS | Oui — Certificats TLS pour la console Web  
Authentification utilisateur | Comptes locaux, LDAP, PKI/à certificats, OpenID Connect  
Rôles utilisateur | Politiques d'accès configurables pour les rôles d'administrateur, de contrôle et de surveillance  
Chiffrement TLS/SSL | pour TCP (réplication, console web, commandes distribuées) et chiffrement symétrique AES-128-CBC + SHA256 pour UDP (signal de présence, protocole interne safeadmin) ; chiffrement basé sur la bibliothèque openSSL. Service web basé sur Apache.  
Compatibilité antivirus | Chemins d'exclusion documentés  
Souveraineté | En tant qu'entreprise européenne, Eviden (Groupe Atos) propose avec SafeKit un produit unique de continuité d'activité et de reprise après sinistre souverain pour Windows et Linux — conservant les données et l'infrastructure de basculement entièrement sur site, sans dépendance vis-à-vis des fournisseurs américains, conformément aux exigences de continuité d'activité et de reprise après sinistre de NIS2.  
  
## Modèle de licence {#licensing-model}

Aspect | Détails  
---|---  
Type de licence | Licence perpétuelle (achat unique) basée sur les noms d'hôtes  
Étendue de la licence | Par serveur (nœud)  
Activation de la licence | Activation hors ligne prise en charge ; aucun accès Internet n’est requis pour activer les clés de licence.  
Essai gratuit | Oui — essai gratuit complet disponible  
Licence gratuite d'un mois | Disponible pour une preuve de concept  
  
## SLA de support et de maintenance {#support-maintenance-slas}

### Assistance et maintenance standard (incluses dans le contrat de maintenance actif) {#standard-support-maintenance-included-with-active-maintenance-contract}

Détails du service |  
---|---  
Accès au portail d'assistance | 24h/24, 7j/7, 365j/an pour un maximum de 4 contacts techniques nommés  
Assistance en direct | 9h00 – 17h00 (Centre d’assistance européen), du lundi au vendredi  
Accusé de réception de l'incident | Dans les 4 heures ouvrables du centre de support  
Mises à jour et mises à niveau | Tous les correctifs, mises à jour et mises à niveau sont inclus sans frais supplémentaires  
Remplacement de la clé de licence | Une clé de licence peut être réattribuée en cas de changement de nom d'hôte dans le cadre d'un contrat de support actif. Le transfert de licence est limité au remplacement de serveur au sein du même projet et est soumis à l'accord écrit préalable d'Eviden.  
Accès à la base de connaissances | Accès complet aux articles de la base de connaissances, à la FAQ et à la documentation en ligne  
Démarrage/arrêt de l'application sans SafeKit | Oui — Arrêter SafeKit et utiliser un script d'encapsulation pour démarrer ou arrêter l'application. Ce script d'encapsulation appelle les scripts de démarrage/arrêt de l'application et configure ou supprime l'adresse IP virtuelle, si nécessaire. 
Portail d'assistance | <https://customercare.evidian.com>  
  
### Ressources gratuites (aucun contrat requis) {#free-resources-no-contract-required}

Détails de la ressource |  
---|---  
Assistant d'assistance IA | [ SafeKit Chat IA ](</fr/resources/safekit-support/#ai-support>) sur safekit.eviden.com et via tout LLM utilisant safekit.eviden.com/ llms.txt  
Formation et certification en ligne | gratuite, à votre rythme, 12 vidéos (environ 3 h 40), certificat à la fin.  
Documentation | Guide utilisateur complet, notes de version, base de connaissances, guides de démarrage rapide  
  
## Comparaison avec les alternatives {#comparison-vs-alternatives}

Critère | SafeKit | Microsoft Cluster de basculement (WSFC) | VMware HA | Open Source *  
---|---|---|---|---  
Stockage partagé (SAN/vSAN) requis : | Non ; | Oui ; | Oui | Non  
Windows prend en charge | Oui, | Oui, | Oui, | Non  
Linux prend en charge | Oui | Non | Oui | Oui  
Déploiement en périphérie/branche | Excellent | Complexe | Complexe | Complexe  
Intégrable par l'OEM | Oui | Non | Non | Non  
Coût | Licence perpétuelle par nœud | Windows Serveur + SAN | vSphere Enterprise + SAN | Services d'intégration de haut niveau  
Complexité de l'installation : | Plug-and-Play ; | Élevée (AD, SAN, témoin) ; | Élevée (vCenter, stockage partagé) ; | Élevée (produits fragmentés).  
Maintenabilité | Produit unique, console web | Élevée (expertise AD et SAN requise) | Élevée (dépendance à vCenter) | Élevée (produits distincts à maintenir)  
  
_ Sur * , il faut six projets open source distincts — Corosync, Pacemaker, DRBD, Keepalived, STONITH Linux HAProxy — pour reproduire les fonctionnalités de SafeKit uniquement sur Linux . SafeKit offre les mêmes fonctionnalités dans un seul produit, sur Windows et Linux

## Liens de référence rapide {#quick-reference-links}

URL de la ressource | URL
---|---
Page d'accueil du produit | <https://safekit.eviden.com/fr/>
Aperçu technique (DOCX avec texte et schémas) | ?? <https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-fr.docx>
Essai gratuit | <https://safekit.eviden.com/fr/resources/safekit-free-trial/>
Obtenez un devis | <https://safekit.eviden.com/fr/safekit-pricing/>
Portail d'assistance | <https://customercare.evidian.com>
Assistance IA gratuite | <https://safekit.eviden.com/fr/resources/safekit-support/>
Formation et certification gratuites | ?? <https://safekit.eviden.com/fr/resources/safekit-on-line-training/>
Contactez-nous | <https://safekit.eviden.com/fr/contact-us-for-safekit/>

{{%  insert-safekit-4-buttons-fr  %}}