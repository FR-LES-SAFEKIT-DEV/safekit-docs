---
title: "Référence technique SafeKit pour les documents RFI et RFP"
canonical: "https://safekit.eviden.com/fr/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Trouvez des informations techniques sur SafeKit pour préparer vos demandes d'informations (RFI) et vos appels d'offres (RFP). Découvrez les systèmes pris en charge, les architectures, les délais de récupération, la sécurité, les licences et le support."
category: "resources"
lang: "fr"
topics: "Aperçu, Table des matières, Informations sur le produit, Systèmes d'exploitation et plateformes pris en charge, Limites de la haute disponibilité SafeKit, Modules d'application préconfigurés, Architecture et déploiement, Perte de données et délais de récupération (RPO et RTO), Sites distants et déploiements distribués, Surveillance, gestion et alertes, Sécurité et conformité, Licence, niveaux de service d'assistance et de maintenance, Comparaison avec d'autres solutions, Liens utiles"
---

# Référence technique SafeKit pour les documents RFI et RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Aperçu {#overview}

Utilisez cette page pour préparer une demande d'informations (RFI) ou un appel d'offres (RFP). Elle répond aux questions techniques courantes concernant le logiciel de haute disponibilité SafeKit . Ces informations aident les équipes d'approvisionnement et les architectes de solutions à définir leurs besoins.

## Table des matières {#table-of-contents}

  1. [Informations sur le produit](#product-identity)
  2. [Systèmes d'exploitation et plateformes pris en charge](#supported-operating-systems-platforms)
  3. [Limites de la haute disponibilité SafeKit](#safekit-ha-limitations)
  4. [Modules d'application préconfigurés](#pre-built-application-modules)
  5. [Architecture et déploiement](#architecture-deployment-model)
  6. [Perte de données et délais de récupération (RPO et RTO)](#rpo-rto-capabilities)
  7. [Sites distants et déploiements distribués](#edge-distributed-deployment-suitability)
  8. [Surveillance, gestion et alertes](#monitoring-management-alerting)
  9. [Sécurité et conformité](#security-compliance)
  10. [Licence](#licensing-model)
  11. [niveaux de service d'assistance et de maintenance](#support-maintenance-slas)
  12. [Comparaison avec d'autres solutions](#comparison-vs-alternatives)
  13. [Liens utiles](#quick-reference-links)


## Informations sur le produit {#product-identity}

Champ | Répondre  
---|---  
Nom du produit | SafeKit  
Fournisseur | Eviden, filiale du groupe Atos. Anciennement connue sous le nom d'Evidian.  
Catégorie de produits | Logiciel pour le clustering d'applications, la haute disponibilité et la reprise après sinistre  
Version actuelle | SafeKit 8.2  
Site web | [https://safekit.eviden.com/fr/](</fr/>)  
Première version | 2000. Utilisé en production pendant plus de 20 ans.  
  
## Systèmes d'exploitation et plateformes pris en charge {#supported-operating-systems-platforms}

Systèmes d'exploitation Windows | Systèmes d'exploitation Linux | Infrastructure et virtualisation | Plateformes cloud  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Entreprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Tout serveur Edge, quelle que soit sa marque<br> • VMware<br> • Microsoft Hyper-V*<br> • Linux KVM*<br> • Tout hyperviseur<br> • Conteneurs Docker<br> • Conteneurs Podman  |  • Amazon Web Services (AWS)**<br> • Microsoft Azure**<br> • Google Cloud Platform (GCP)**<br> • Tout cloud IaaS avec des instances de VM standard   
  
_* SafeKit assure une haute disponibilité pour les applications individuelles ou les machines virtuelles entières._

_** Dans le cloud, configurez les adresses IP virtuelles sur l'équilibreur de charge cloud._

{{%  insert-safekit-usage-fr  %}}

## Modules d'application préconfigurés {#pre-built-application-modules}

SafeKit inclut des modules `.safe` prêts à l'emploi. Deux méthodes permettent de protéger les applications : **la haute disponibilité des applications** , qui protège directement une application grâce à un module mirror ou un module <span class="notranslate farm-term" translate="no">farm</span> ; et la **haute disponibilité des machines virtuelles,** qui protège l'ensemble de la machine virtuelle grâce à un module hyperv.safe ou kvm.safe .

 | Haute disponibilité de l'application | haute disponibilité des machines virtuelles  
---|---|---  
Configuration | Vous devez savoir quels services applicatifs redémarrer et quels dossiers répliquer. Vous devez également configurer l'adresse IP virtuelle utilisée pour le basculement. | Il vous suffit d'indiquer l'emplacement des fichiers de la machine virtuelle. Vous n'avez pas besoin de savoir comment fonctionnent les applications à l'intérieur de la machine virtuelle. Cette approche protège à la fois les applications et le système d'exploitation.  
Utilisation recommandée | Ajoutez une haute disponibilité directement à une solution logicielle, sans dépendre d'un matériel spécifique ou d'un hyperviseur spécifique. | Gérez plusieurs applications sur plusieurs machines virtuelles avec une seule politique de haute disponibilité.  
  
Le tableau ci-dessous répertorie tous les modules `.safe` disponibles :

Haute disponibilité des applications | haute disponibilité des machines virtuelles  
---|---  
Nouvelle application Windows — mirror.safe | Machine virtuelle Hyper-V — hyperv.safe (Windows)  
Nouvelle application Linux — mirror.safe | Machine virtuelle KVM — kvm.safe (Linux)  
Équilibrage de charge Windows — farm.safe | Conteneur Docker — mirror.safe (Linux)  
Équilibrage de charge Linux — farm.safe | Conteneur Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows et Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows et Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows et Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows et Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows et Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows et Linux) | Suite Siemens Siveillance — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows et Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, générique) — mirror.safe / farm.safe |   
  
## Architecture et déploiement {#architecture-deployment-model}

### Deux modules de cluster : mirror.safe et farm.safe {#two-cluster-modules}

Module | Comment ça marche | Applications typiques  
---|---|---  
mirror.safe | Un serveur est actif et l'autre en veille. Les fichiers sont répliqués de manière synchrone au niveau octet. Le basculement est automatique. | Les bases de données, les applications qui stockent des données d'état et les services qui s'exécutent sur un seul serveur à la fois.  
farm.safe | Plusieurs serveurs sont actifs simultanément. SafeKit répartit le trafic réseau entre eux et gère automatiquement le basculement. | Serveurs Web, microservices sans état, passerelles API et services s'exécutant simultanément sur plusieurs serveurs  
  
### Infrastructure de cluster {#cluster-infrastructure-architecture}

Exigence | Fonctionnalités SafeKit  
---|---  
Stockage partagé requis ? | Non. SafeKit utilise des disques locaux. Il n'a pas besoin de SAN ni de stockage partagé.  
Active Directory requis ? | Non. SafeKit ne nécessite ni domaine Windows ni Active Directory. Il prend également en charge les groupes de travail.  
Taille du cluster | 2 nœuds ( mirror ) ou 2 nœuds ou plus ( <span class="notranslate farm-term" translate="no">farm</span> )  
Adresse IP virtuelle (VIP) | Pour la haute disponibilité des applications, l'adresse IP virtuelle est automatiquement transférée vers le nœud actif via ARP gratuit. Pour la haute disponibilité des machines virtuelles, le trafic vers l'adresse IP interne de la machine virtuelle est automatiquement redirigé. Aucune adresse IP virtuelle distincte n'est requise. Les nœuds doivent partager un réseau local (LAN), un réseau de neurones virtuel (VLAN) ou un VLAN étendu entre sites.  
Architecture à trois nœuds | SafeKit exploite un cluster mirror à deux nœuds sur un réseau local (LAN) ou un VLAN étendu entre sites. Il assure une réplication synchrone sans perte de données (RPO=0) et un basculement automatique. Un produit de sauvegarde distinct réplique les données de manière asynchrone vers un troisième nœud via un réseau étendu (WAN). Cette sauvegarde permet une restauration à un état antérieur et offre une protection contre les ransomwares.  
Objectif de la haute disponibilité | SafeKit réplique les données de manière synchrone sur les deux nœuds. Cela permet un basculement automatique sans perte de données après une panne matérielle ou logicielle. Toutefois, les erreurs logiques, la corruption des données et les suppressions accidentelles sont également copiées immédiatement sur le nœud de secours.  
Objectif des sauvegardes | Les sauvegardes permettent de restaurer des données à partir d'un état antérieur. Un logiciel de sauvegarde distinct, autre que SafeKit , assure cette protection par réplication asynchrone. Les sauvegardes contribuent à la récupération après une attaque de ransomware ou une erreur humaine. Cette restauration n'est pas un basculement automatique. Restaurer une sauvegarde plus ancienne entraîne la perte des modifications effectuées après cette sauvegarde.  
Nombre maximal de modules exécutés simultanément | Un cluster à deux nœuds peut gérer jusqu'à 32 modules simultanément. Pour la protection des machines virtuelles, chaque module réplique et redémarre une machine virtuelle différente. Chaque module peut être principal sur l'un ou l'autre nœud, permettant ainsi aux deux serveurs de partager la charge de travail. Le volume total de données influe sur le temps de resynchronisation après un basculement ou un redémarrage de nœud.  
Logiciel requis sur chaque nœud ? | Oui. Un agent logiciel léger est installé sur chaque nœud.  
Applications prises en charge | SafeKit peut protéger tout service Windows ou démon Linux. Des modules préconfigurés sont disponibles pour plus de 30 applications.  
  
### Réplication et protection des données {#replication-data-protection}

Exigence | Fonctionnalités SafeKit  
---|---  
Méthode de réplication | SafeKit réplique les modifications de fichiers au niveau octet. Il ne réplique pas les blocs de disque.  
Mode de réplication | Réplication synchrone, sans aucune perte de données  
Exigences du réseau | Une latence aller-retour inférieure à 5 ms entre les nœuds est recommandée pour la réplication synchrone.  
Volume de données recommandé | Quelques téraoctets, pour que le temps de resynchronisation reste gérable.  
Nombre de fichiers recommandé | Moins d'un million de fichiers, afin de maintenir un temps de resynchronisation gérable.  
Il est temps de resynchroniser 1 To | Environ 3 heures sur un réseau de 1 Gb/s ou 1 heure sur un réseau de 10 Gb/s  
Réplication sélective | Vous pouvez choisir les répertoires et les fichiers à répliquer.  
Chiffrement pendant le transfert | Le trafic de réplication est chiffré avec TLS/SSL.  
  
## Perte de données et délais de récupération (RPO et RTO) {#rpo-rto-capabilities}

### RPO et RTO pour chaque type de cluster {#rto-rpo-cluster-type}

Métrique | Groupe Mirror ( mirror.safe ) | groupement <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO (objectif de point de récupération) | Aucune perte de données. Une écriture n'est confirmée qu'après accusé de réception par les deux nœuds. | Non applicable aux services sans état. Un cluster mirror distinct gère les données.  
RTO (objectif de temps de récupération) | Environ une minute. Cela inclut le délai d'attente pour le signal de présence (30 secondes par défaut) et le temps nécessaire pour redémarrer l'application. | Quelques secondes. Le trafic est redistribué vers les nœuds actifs restants.  
Type de réplication | Réplication de fichiers synchrone, en temps réel et au niveau octet | Non applicable  
Déclencheur de basculement | Automatique en cas d'arrêt des impulsions cardiaques, de plantage d'un processus ou de détection d'une défaillance par un vérificateur. | Automatique en cas d'arrêt des impulsions cardiaques, de plantage d'un processus ou de détection d'une défaillance par un vérificateur.  
Intervention manuelle requise ? | Non. Le basculement et le retour en arrière sont automatiques. | Non. Le basculement et le retour en arrière sont automatiques.  
  
### Temps de récupération pour les applications protégées par un cluster mirror {#rto-breakdown-mirror-application-level-ha}

Type de défaillance | Comment le temps de récupération est calculé  
---|---  
panne matérielle | Délai d'attente du signal de présence (30 secondes par défaut), suivi du redémarrage de l'application  
Plantage logiciel ou de processus | Il est temps d'arrêter l'application, puis de la redémarrer.  
Plantage du système d'exploitation | Délai d'attente dépassé. Le système d'exploitation est déjà en cours d'exécution sur le serveur de secours ; il n'est donc pas nécessaire de le redémarrer.  
  
### Temps de récupération des machines virtuelles protégées par un cluster mirror {#rto-breakdown-mirror-vm-level-ha}

Type de défaillance | Comment le temps de récupération est calculé  
---|---  
Tout échec | Il faut alors détecter la panne, redémarrer le système d'exploitation de la machine virtuelle et relancer l'application. Cela prend généralement quelques minutes.  
  
## Sites distants et déploiements distribués {#edge-distributed-deployment-suitability}

SafeKit est conçu pour les sites distants, les succursales et les organisations possédant de nombreux sites.

Exigence sur un site distant | Fonctionnalités SafeKit  
---|---  
Aucun personnel informatique dédié sur place | Le basculement est automatique et ne nécessite aucune intervention manuelle.  
Pas de SAN ni de NAS | SafeKit utilise les disques locaux et ne nécessite pas de stockage partagé.  
Gestion à distance | Gérez le cluster via une console web.  
Matériel limité | Deux serveurs standard ou machines virtuelles suffisent. Aucun matériel spécifique n'est requis.  
Pare-feu et traduction d'adresses réseau (NAT) | Les ports sont configurables. La console web utilise le protocole HTTPS.  
Reprise après sinistre entre sites | Un cluster mirror peut connecter deux sites via un VLAN étendu entre eux.  
Intégration par les éditeurs de logiciels | Les éditeurs de logiciels peuvent intégrer SafeKit à leurs produits. L'installation peut se faire sans intervention de l'utilisateur et être automatisée par des scripts.  
Des centaines de clusters répartis sur de nombreux sites | SafeKit est conçu pour les organisations comportant de nombreuses succursales.  
  
Les sites suivants nécessitent une haute disponibilité même s'ils ne disposent pas de centre de données :

Industrie | Site typique | Applications critiques  
---|---|---  
Sécurité physique et surveillance | Bâtiments, campus, aéroports | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestion de bâtiment (BMS) | Immeubles de bureaux, hôpitaux, usines | Siemens Desigo CC, Bosch BIS/BVMS  
Contrôle d'accès électronique (EACS) | Installations sécurisées, campus | Siemens SiPass, Nedap, Bosch AMS  
SCADA et contrôle industriel | Usines, sous-stations, usines de traitement des eaux | Tout logiciel SCADA, DCS ou IHM fonctionnant sous Windows ou Linux  
contrôle du trafic aérien (ATC) | Aéroports, tours de contrôle | Systèmes de gestion du contrôle aérien et radar  
centres de contrôle des opérations (CCO) | Métro, chemin de fer, pôles de transit | Signalisation ferroviaire et gestion des gares  
Maritime | Navires, navires de guerre | Systèmes de navigation, de gestion du fret et de gestion embarquée  
Pétrole et gaz | Plateformes offshore, installations de forage isolées | Systèmes de contrôle des processus et de sécurité  
Télécommunications | Sites d'antennes 5G, nœuds MEC | Serveurs de calcul en périphérie multi-accès (MEC)  
Soins de santé | Cliniques, centres de diagnostic à distance | Imagerie médicale, données patient, télédiagnostic  
Vente au détail | Magasins, succursales, entrepôts | Gestion des points de vente et des stocks  
Défense | Bases opérationnelles avancées, unités de terrain | Systèmes de commandement et de communication critiques pour la mission  
  
## Surveillance, gestion et alertes {#monitoring-management-alerting}

Capacité | Détails  
---|---  
Console Web | Configurez, surveillez et gérez les nœuds du cluster via une application web ou une application web progressive (PWA).  
Notifications mobiles | Recevez des notifications du navigateur lorsqu'un module change d'état.  
Histoire de l'État | Visualisez l'état et les événements des modules sur une chronologie.  
notifications par e-mail | Un agent de messagerie intégré envoie des alertes.  
Gestion en ligne de commande | Utilisez l'interface de ligne de commande pour écrire des scripts et automatiser des tâches.  
Gestion des journaux | Chaque module et script possède ses propres fichiers journaux. Les instantanés de diagnostic aident l'équipe de support à analyser les problèmes.  
Intégration avec les outils de surveillance | SafeKit enregistre les principaux événements du cluster dans le journal des événements Windows ou le Syslog Linux. Les outils de surveillance peuvent collecter ces événements et déclencher des alertes à l'aide de règles standard. Cette solution est compatible avec Nagios, Zabbix, Splunk et les outils SIEM, sans développement spécifique.  
  
## Sécurité et conformité {#security-compliance}

Fonctionnalité | Détails  
---|---  
accès à la console HTTPS | Les certificats TLS protègent l'accès à la console web.  
Authentification de l'utilisateur | Comptes locaux, LDAP, certificats (PKI) et OpenID Connect  
Rôles des utilisateurs | Configurer les politiques d'accès pour l'administration, le contrôle et la surveillance.  
Cryptage | Le trafic TCP utilise TLS/SSL pour la réplication, la console web et les commandes distribuées. Le trafic UDP utilise le chiffrement AES-128-CBC avec SHA256 pour les pulsations et le protocole interne safeadmin. SafeKit utilise la bibliothèque OpenSSL pour le chiffrement et Apache pour le service web.  
Compatibilité antivirus | La documentation répertorie les chemins d'accès à exclure des analyses antivirus.  
souveraineté des données | Eviden fait partie du groupe européen Atos. SafeKit assure la continuité d'activité et la reprise après sinistre pour Windows et Linux. Les données et l'infrastructure de basculement restent entièrement sur site, sans dépendre de fournisseurs américains. Cette approche répond aux exigences de continuité d'activité et de reprise après sinistre de la norme NIS2.  
  
## Licence {#licensing-model}

Aspect | Détails  
---|---  
Type de licence | Une licence perpétuelle s'achète une seule fois et est liée à un nom d'hôte.  
Étendue de la licence | Une licence par serveur (nœud)  
Activation de la licence | Les clés de licence peuvent être activées sans accès à Internet.  
essai gratuit | L'essai gratuit inclut toutes les fonctionnalités.  
Licence gratuite d'un mois | Disponible pour tester une preuve de concept  
  
## niveaux de service d'assistance et de maintenance {#support-maintenance-slas}

### Assistance et maintenance standard avec contrat de maintenance actif {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Détails  
---|---  
Accès au portail d'assistance | Le portail web est accessible en permanence, tous les jours de l'année, pour un maximum de quatre contacts techniques désignés.  
heures d'assistance en direct | Du lundi au vendredi, de 9h00 à 17h00 au Centre de soutien européen  
Accusé de réception de l'incident | Dans les quatre heures ouvrables du centre d'assistance  
Mises à jour et améliorations | Tous les packs de services, mises à jour et mises à niveau sont inclus sans frais supplémentaires.  
remplacement de la clé de licence | Avec un contrat d'assistance actif, une clé de licence peut être réattribuée en cas de changement de nom d'hôte. Le transfert est limité au remplacement d'un serveur au sein du même projet. L'accord écrit préalable d'Eviden est requis.  
Accès à la base de connaissances | Accès complet aux articles de la base de connaissances, aux questions fréquemment posées et à la documentation en ligne  
Démarrer ou arrêter une application sans SafeKit | Arrêtez SafeKit , puis utilisez un script d'encapsulation pour démarrer ou arrêter l'application. Ce script appelle les scripts de démarrage et d'arrêt de l'application. Il ajoute ou supprime également l'adresse IP virtuelle si nécessaire.  
Portail d'assistance | <https://customercare.evidian.com>  
  
### Ressources gratuites sans contrat de support {#free-resources-no-contract-required}

Ressource | Détails  
---|---  
Assistant de support IA | Utilisez [le chat IA SafeKit](</fr/resources/safekit-support/#ai-support>) sur safekit.eviden.com. Vous pouvez également utiliser un modèle de langage IA avec les informations contenues dans safekit.eviden.com/llms.txt.  
Formation et certification en ligne | Apprenez à votre rythme grâce à 12 vidéos gratuites d'une durée totale d'environ 3 heures et 40 minutes. Recevez un certificat à la fin de la formation.  
Documentation | Guide de l'utilisateur, notes de version, base de connaissances et guides d'installation rapide  
  
## Comparaison avec d'autres solutions {#comparison-vs-alternatives}

Critère | SafeKit | Cluster de basculement Microsoft (WSFC) | VMware HA | Logiciel libre*  
---|---|---|---|---  
Stockage partagé (SAN/vSAN) requis | Non | Oui | Oui | Non  
Prise en charge de Windows | Oui | Oui | Oui | Non  
Prise en charge de Linux | Oui | Non | Oui | Oui  
Déploiement sur des sites distants | Excellent | Complexe | Complexe | Complexe  
Intégration dans le produit d'un éditeur de logiciels | Oui | Non | Non | Non  
Coût | Licence perpétuelle par nœud | Serveur Windows et SAN | vSphere Enterprise et SAN | Services d'intégration avancés  
Complexité de la configuration | Prêt à configurer et à utiliser | Élevé : Configuration d’Active Directory, du SAN et des témoins | Élevé : configuration de vCenter et du stockage partagé | Élevé : plusieurs produits distincts à configurer  
exigences de maintenance | Un produit géré via une console web | Niveau élevé : Expertise Active Directory et SAN | Dépendance élevée à vCenter | Élevé : plusieurs produits distincts à entretenir  
  
_Sous Linux, six projets open source distincts sont nécessaires pour offrir les mêmes fonctionnalités : Corosync, Pacemaker, DRBD, Keepalived, STONITH et HAProxy. SafeKit réunit ces fonctionnalités dans un seul produit compatible avec Windows et Linux._

## Liens utiles {#quick-reference-links}

Ressource | URL  
---|---  
Page d'accueil du produit | [https://safekit.eviden.com/fr/](</fr/>)  
Présentation technique (document Word contenant du texte et des schémas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-fr.docx](</wp-content/uploads/documents/safekit-technical-overview-fr.docx>)  
essai gratuit | [https://safekit.eviden.com/fr/resources/safekit-free-trial/](</fr/resources/safekit-free-trial/>)  
Obtenez un devis | [https://safekit.eviden.com/fr/safekit-pricing/](</fr/safekit-pricing/>)  
Portail d'assistance | <https://customercare.evidian.com>  
Assistance IA gratuite | [https://safekit.eviden.com/fr/resources/safekit-support/](</fr/resources/safekit-support/>)  
Formation et certification gratuites | [https://safekit.eviden.com/fr/resources/safekit-on-line-training/](</fr/resources/safekit-on-line-training/>)  
Contactez-nous | [https://safekit.eviden.com/fr/contact-us-for-safekit/](</fr/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-fr  %}}
