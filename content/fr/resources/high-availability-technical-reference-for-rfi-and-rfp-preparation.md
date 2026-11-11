---
title: "Référence technique SafeKit pour les documents RFI et RFP"
canonical: "https://safekit.eviden.com/fr/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Trouvez des informations techniques sur SafeKit pour préparer des demandes d’information (RFI) et des demandes de propositions (RFP). Découvrez les systèmes pris en charge, les architectures, les temps de récupération, la sécurité, les licences et le support."
category: "resources"
lang: "fr"
topics: "Vue d’ensemble, Table des matières, Informations sur le produit, Systèmes d’exploitation et plateformes pris en charge, Limitations de la haute disponibilité SafeKit, Modules d’application préconfigurés, Architecture et déploiement, Perte de données et temps de récupération (RPO et RTO), Sites distants et déploiements distribués, Surveillance et alertes, Sécurité et conformité, Licences, Assistance et maintenance, Comparaison avec d’autres solutions, Liens utiles"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 58 expressions"
---

# Référence technique SafeKit pour les documents RFI et RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Vue d’ensemble {#overview}

Utilisez cette page pour préparer une demande d’information (RFI) ou une demande de propositions (RFP). Elle répond aux questions techniques courantes sur le logiciel de haute disponibilité SafeKit. Les informations aident les équipes d’approvisionnement et les architectes de solutions à définir leurs exigences.

## Table des matières {#table-of-contents}

  1. [Informations sur le produit](#product-identity)
  2. [Systèmes d’exploitation et plateformes pris en charge](#supported-operating-systems-platforms)
  3. [Limitations de la haute disponibilité SafeKit](#safekit-ha-limitations)
  4. [Modules d’application préconfigurés](#pre-built-application-modules)
  5. [Architecture et déploiement](#architecture-deployment-model)
  6. [Perte de données et temps de récupération (RPO et RTO)](#rpo-rto-capabilities)
  7. [Sites distants et déploiements distribués](#edge-distributed-deployment-suitability)
  8. [Surveillance et alertes](#monitoring-management-alerting)
  9. [Sécurité et conformité](#security-compliance)
  10. [Licences](#licensing-model)
  11. [Assistance et maintenance](#support-maintenance-slas)
  12. [Comparaison avec d’autres solutions](#comparison-vs-alternatives)
  13. [Liens utiles](#quick-reference-links)


## Informations sur le produit {#product-identity}

Sujet | Détails  
---|---  
Nom du produit | SafeKit  
Fournisseur | Eviden, une entreprise du groupe Atos. Anciennement Evidian.  
Pays de développement | France  
Catégorie de produit | Logiciel de mise en cluster d’applications, de haute disponibilité et de reprise après sinistre  
Version actuelle | SafeKit 8.2  
Site Web | [https://safekit.eviden.com](/fr/)  
Première version | 2000. Utilisé en production depuis plus de 20 ans.  
  
## Systèmes d’exploitation et plateformes pris en charge {#supported-operating-systems-platforms}

Systèmes d’exploitation Windows | Systèmes d’exploitation Linux | Infrastructure et virtualisation | Plateformes cloud  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Entreprise (x86-64) <br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64)  |  • Tout serveur de périphérie de n’importe quelle marque <br> • VMware <br> • Microsoft Hyper-V [1] <br> • Linux KVM [1] <br> • N’importe quel hyperviseur <br> • Conteneurs Docker <br> • Conteneurs Podman  |  • Amazon Web Services (AWS) [2] <br> • Microsoft Azure [2] <br> • Google Cloud Platform (GCP) [2] <br> • Tout cloud IaaS avec des instances de machines virtuelles standard   
  
**[1]** SafeKit assure une haute disponibilité pour des applications individuelles ou des machines virtuelles entières.

**[2]** Dans le cloud, configurez des adresses IP virtuelles sur l’équilibreur de charge du cloud.

{{%  insert-safekit-usage-fr  %}}

## Modules d’application préconfigurés {#pre-built-application-modules}

SafeKit inclut des modules `.safe` prêts à l’emploi. Il existe deux façons de protéger les applications. **La haute disponibilité des applications** protège une application directement avec un module mirror ou <span class="notranslate farm-term" translate="no">farm</span>. **La haute disponibilité des machines virtuelles** protège l’ensemble de la machine virtuelle avec un module hyperv.safe ou kvm.safe.

Critère de comparaison | Haute disponibilité de l’application | Haute disponibilité des machines virtuelles  
---|---|---  
Configuration | Vous devez savoir quels services d’application redémarrer et quels dossiers répliquer. Vous devez également configurer l’adresse IP virtuelle utilisée pour le basculement. | Vous devez uniquement spécifier l’emplacement des fichiers de la machine virtuelle. Vous n’avez pas besoin de savoir comment les applications à l’intérieur de la machine virtuelle fonctionnent. Cette approche protège les applications et le système d’exploitation ensemble.  
Utilisation recommandée | Ajoutez une haute disponibilité directement à une solution logicielle, sans dépendre d’un matériel ou d’un hyperviseur spécifique. | Gérez plusieurs applications sur plusieurs machines virtuelles avec une seule politique de haute disponibilité.  
  
Le tableau ci-dessous répertorie tous les modules `.safe` disponibles :

Haute disponibilité de l’application | Haute disponibilité des machines virtuelles  
---|---  
Nouvelle application Windows — mirror.safe | Machine virtuelle Hyper-V — hyperv.safe (Windows)  
Nouvelle application Linux — mirror.safe | Machine virtuelle KVM — kvm.safe (Linux)  
Équilibrage de charge Windows — farm.safe | Conteneur Docker — mirror.safe (Linux)  
Équilibrage de charge Linux — farm.safe | Conteneur Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
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
Cloud (AWS, Azure, GCP, générique) — mirror.safe/farm.safe |   
  
## Architecture et déploiement {#architecture-deployment-model}

### Deux modules de cluster : mirror.safe et farm.safe {#two-cluster-modules}

Module | Principe de fonctionnement | Applications typiques  
---|---|---  
mirror.safe | Un serveur est actif et l’autre est en veille. Les fichiers sont répliqués de manière synchrone au niveau de l’octet. Le basculement est automatique. | Bases de données, applications qui stockent l’état et services qui ne s’exécutent que sur un seul serveur à la fois  
farm.safe | Plusieurs serveurs sont actifs en même temps. SafeKit répartit le trafic réseau entre eux et gère le basculement automatiquement. | Serveurs web, microservices sans état, passerelles d’API et services qui s’exécutent sur plusieurs serveurs à la fois  
  
### Infrastructure de cluster {#cluster-infrastructure-architecture}

Exigence | Fonctionnalités SafeKit  
---|---  
Stockage partagé requis ? | Non. SafeKit utilise des disques locaux. Il n’a pas besoin de SAN ni de stockage partagé.  
Active Directory requis ? | Non, SafeKit ne nécessite pas de domaine Windows ni d’Active Directory. Il prend également en charge les groupes de travail.  
Nombre de nœuds dans un cluster | 2 nœuds (mirror) ou 2 nœuds ou plus (<span class="notranslate farm-term" translate="no">farm</span>)  
Adresse IP virtuelle (VIP) | Pour une haute disponibilité de l’application, l’adresse IP virtuelle se déplace automatiquement vers le nœud actif via ARP gratuit. Pour une haute disponibilité de la machine virtuelle, le trafic vers l’adresse IP à l’intérieur de la machine virtuelle est redirigé automatiquement. Aucune adresse IP virtuelle distincte n’est nécessaire. Les nœuds doivent partager un LAN ou un VLAN étendu entre les sites.  
Architecture à trois nœuds | SafeKit exécute un cluster mirror à deux nœuds sur un LAN ou un réseau local virtuel étendu entre des sites. Il fournit une réplication synchrone avec zéro perte de données (RPO = 0) et un basculement automatique. Un produit de sauvegarde distinct réplique les données de manière asynchrone vers un troisième nœud sur un réseau étendu. Cette sauvegarde permet la restauration à un point antérieur dans le temps et offre une protection contre les rançongiciels.  
Objectif de la haute disponibilité | SafeKit réplique les données de manière synchrone sur les deux nœuds. Cela permet un basculement automatique sans perte de données après une défaillance matérielle ou logicielle. Cependant, les erreurs logiques, la corruption des données et les suppressions accidentelles sont également copiées immédiatement sur le nœud de secours.  
Objectif des sauvegardes | Les sauvegardes vous permettent de restaurer des données à partir d’un point antérieur dans le temps. Un produit de sauvegarde distinct, et non SafeKit, fournit cette protection par réplication asynchrone. Les sauvegardes aident à récupérer des données après une attaque de rançongiciel ou une erreur humaine. Cette récupération n’est pas un basculement automatique. La restauration d’une sauvegarde plus ancienne entraîne la perte des modifications apportées après cette sauvegarde.  
Nombre maximal de modules fonctionnant simultanément | Un cluster à deux nœuds peut gérer jusqu’à 32 modules simultanément. Pour la protection des machines virtuelles, chaque module réplique et redémarre une machine virtuelle différente. Chaque module peut être principal sur l’un ou l’autre des nœuds, de sorte que les deux serveurs peuvent partager la charge de travail. Le volume total de données affecte le temps de resynchronisation après un basculement ou un redémarrage d’un nœud.  
Le logiciel est-il installé sur chaque nœud ? | Oui. Un logiciel léger est installé sur chaque nœud.  
Applications prises en charge | SafeKit peut protéger n’importe quel service Windows ou démon Linux. Des modules préconfigurés sont disponibles pour plus de 30 applications.  
  
### Réplication et protection des données {#replication-data-protection}

Exigence | Fonctionnalités SafeKit  
---|---  
Méthode de réplication | SafeKit réplique les modifications de fichiers au niveau de l’octet. Il ne réplique pas les blocs de disque.  
Mode de réplication | Réplication synchrone, avec une perte de données nulle  
Configuration réseau requise | Pour la réplication synchrone, une latence aller-retour inférieure à 5 ms entre les nœuds est recommandée.  
Volume de données recommandé | Quelques téraoctets, pour que le temps de resynchronisation reste gérable  
Nombre de fichiers recommandé | Moins d’un million de fichiers, pour que le temps de resynchronisation reste gérable  
Temps de resynchronisation pour 1 To | Environ 3 heures sur un réseau de 1 Gb/s ou 1 heure sur un réseau de 10 Gb/s  
Réplication sélective | Vous pouvez choisir les répertoires et les fichiers à répliquer.  
Chiffrement pendant le transfert | Le trafic de réplication est chiffré avec TLS/SSL.  
  
## Perte de données et temps de récupération (RPO et RTO) {#rpo-rto-capabilities}

### RPO et RTO pour chaque type de cluster {#rto-rpo-cluster-type}

Métrique | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO (objectif de point de reprise) | Aucune perte de données. Une opération d’écriture n’est terminée que lorsque les deux nœuds ont écrit les données. | Ne s’applique pas aux services sans état. Les données sont gérées par un cluster mirror distinct.  
RTO (objectif de temps de récupération) | Environ une minute. Cela inclut le délai d’attente <span class="notranslate farm-term" translate="no">heartbeat</span> (30 secondes par défaut) et le temps nécessaire pour redémarrer l’application. | Quelques secondes. Le trafic est redistribué aux nœuds actifs restants.  
Type de réplication | Réplication de fichiers synchrone, en temps réel et au niveau de l’octet | Sans objet  
Déclencheur de basculement | Le basculement démarre automatiquement lorsque les messages <span class="notranslate farm-term" translate="no">heartbeat</span> s’arrêtent, lorsqu’un processus tombe en panne ou lorsqu’un vérificateur détecte une défaillance | Le basculement démarre automatiquement lorsque les messages <span class="notranslate farm-term" translate="no">heartbeat</span> s’arrêtent, lorsqu’un processus tombe en panne ou lorsqu’un vérificateur détecte une défaillance  
Intervention manuelle requise ? | Non. Le basculement et le retour arrière sont automatiques. | Non. Le basculement et le retour arrière sont automatiques.  
  
### Temps de récupération pour les applications protégées par un cluster mirror {#rto-breakdown-mirror-application-level-ha}

Type de défaillance | Comment le temps de récupération est calculé  
---|---  
Défaillance matérielle | Délai d’expiration de <span class="notranslate farm-term" translate="no">heartbeat</span> (30 secondes par défaut), suivi du redémarrage de l’application  
Plantage du logiciel ou du processus | Le temps d’arrêt de l’application, suivi du redémarrage de l’application  
Plantage du système d’exploitation | Le délai d’attente <span class="notranslate farm-term" translate="no">heartbeat</span>, suivi du redémarrage de l’application. Le serveur de secours n’a pas besoin de redémarrer, car son système d’exploitation est déjà en cours d’exécution.  
  
### Temps de récupération des machines virtuelles protégées par un cluster mirror {#rto-breakdown-mirror-vm-level-ha}

Type de défaillance | Comment le temps de récupération est calculé  
---|---  
Tous les types de défaillances | Temps nécessaire pour détecter la défaillance, redémarrer le système d’exploitation de la machine virtuelle et redémarrer l’application. Cela prend généralement plusieurs minutes.  
  
## Sites distants et déploiements distribués {#edge-distributed-deployment-suitability}

SafeKit est conçu pour les sites distants, les succursales et les organisations disposant de nombreux sites.

Exigence sur un site distant | Fonctionnalités SafeKit  
---|---  
Aucun personnel informatique dédié sur place | Le basculement est automatique et ne nécessite aucune intervention manuelle.  
Pas de stockage partagé (SAN ou NAS) | Seuls les disques locaux sont nécessaires. Le stockage partagé n’est pas requis.  
Gestion à distance | Gérez le cluster via une console web.  
Matériel limité | Deux serveurs standard ou machines virtuelles suffisent. Aucun matériel spécial n’est requis.  
Pare-feu et traduction d’adresses réseau (NAT) | Les ports peuvent être configurés. La console web utilise HTTPS.  
Reprise d’activité après sinistre entre sites | Un cluster mirror peut connecter deux sites via un VLAN étendu entre eux.  
Intégration par les éditeurs de logiciels | Les éditeurs de logiciels peuvent inclure SafeKit dans leurs produits. L’installation peut s’exécuter sans interaction de l’utilisateur et peut être automatisée avec des scripts.  
Des centaines de clusters SafeKit sur de nombreux sites | SafeKit est conçu pour les organisations disposant de nombreuses succursales.  
  
Les sites suivants doivent être hautement disponibles, même s’ils ne disposent pas d’un centre de données :

Secteur d’activité | Site typique | Applications critiques  
---|---|---  
Sécurité physique et surveillance | Bâtiments, campus, aéroports | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestion technique du bâtiment (GTB) | Immeubles de bureaux, hôpitaux, usines | Siemens Desigo CC, Bosch BIS/BVMS  
Contrôle d’accès électronique (EACS) | Installations et campus sécurisés | Siemens SiPass, Nedap, Bosch AMS  
SCADA et contrôle industriel | Usines, sous-stations, usines de traitement de l’eau | Tout logiciel SCADA, DCS ou HMI fonctionnant sous Windows ou Linux  
Contrôle du trafic aérien (CTA) | Aéroports, tours de contrôle | Gestion du contrôle du trafic aérien et systèmes radar  
Centres de contrôle des opérations (CCO) | Métro, chemins de fer, pôles de transport | Signalisation ferroviaire et gestion des gares  
Maritime | Navires, navires de guerre | Systèmes de navigation, de gestion du fret et de gestion à bord  
Pétrole et gaz | Plateformes offshore, installations de forage éloignées | Systèmes de contrôle des procédés et de sécurité  
Télécommunications | Sites d’antennes 5G, nœuds MEC | Serveurs MEC (Multi-access Edge Computing)  
Soins de santé | Cliniques, centres de diagnostic à distance | Imagerie médicale, données patient, diagnostic à distance  
Vente au détail | Magasins, succursales, entrepôts | Gestion des points de vente et des stocks  
Défense | Bases d’opérations avancées, unités de terrain | Systèmes de commande et de communication essentiels à la mission  
  
## Surveillance et alertes {#monitoring-management-alerting}

Fonctionnalité | Détails  
---|---  
Console Web | Configurez, surveillez et gérez les nœuds du cluster via une application web ou une application web progressive (PWA).  
Notifications mobiles | Recevez des notifications dans votre navigateur lorsqu’un module change d’état.  
Chronologie | Affichez les changements d’état et les événements du module dans l’ordre chronologique.  
Notifications par e-mail | Un agent de messagerie intégré envoie des alertes.  
Interface en ligne de commande | Utilisez l’interface en ligne de commande pour écrire des scripts et automatiser des tâches.  
Gestion des journaux | Chaque module et chaque script possède ses propres fichiers journaux. L’équipe de support utilise les <span class="notranslate farm-term" translate="no">snapshots</span> des modules pour enquêter sur les problèmes.  
Intégration avec les outils de surveillance | SafeKit enregistre les événements majeurs du cluster dans le journal des événements Windows ou Syslog Linux. Les outils de surveillance peuvent collecter ces événements et déclencher des alertes avec des règles standard. Cela fonctionne avec Nagios, Zabbix, Splunk et les outils SIEM sans développement personnalisé.  
  
## Sécurité et conformité {#security-compliance}

Fonctionnalité | Détails  
---|---  
HTTPS | La console web utilise HTTPS avec des certificats TLS.  
Authentification de l’utilisateur | Comptes locaux, LDAP, certificats (PKI) et OpenID Connect  
Rôles des utilisateurs | Configurez les stratégies d’accès pour l’administration, le contrôle et la surveillance.  
Chiffrement | Le trafic TCP utilise TLS/SSL pour la réplication, la console Web et les commandes distribuées. Le trafic UDP utilise le chiffrement AES-128-CBC avec SHA256 pour les messages <span class="notranslate farm-term" translate="no">heartbeat</span> et pour le protocole safeadmin interne. La bibliothèque OpenSSL fournit le chiffrement. Le service Web s’exécute sur Apache.  
Antivirus | La documentation répertorie les chemins à exclure des analyses antivirus.  
Souveraineté | SafeKit est développé en France par Eviden, qui fait partie du groupe Atos. Il protège les applications Windows et Linux tout en gardant vos données et vos serveurs sur votre site. SafeKit peut vous aider à répondre aux exigences de la directive européenne NIS2 en matière de continuité d’activité et de reprise après sinistre.
  
## Licences {#licensing-model}

Sujet | Détails  
---|---  
Type de licence | Une licence perpétuelle est achetée une seule fois et est liée à un nom d’hôte.  
Champ d’application de la licence | Une licence par serveur (nœud)  
Activation de la licence | Les clés de licence peuvent être activées sans accès à Internet.  
Essai gratuit | Un essai gratuit inclut toutes les fonctionnalités.  
Licence gratuite d’un mois | Disponible pour tester une preuve de concept  
  
## Assistance et maintenance {#support-maintenance-slas}

### Assistance et maintenance standard avec un contrat de maintenance actif {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Détails  
---|---  
Accès au portail d’assistance | Le portail Web est accessible à tout moment, tous les jours de l’année, pour un maximum de quatre contacts techniques désignés.  
Heures d’ouverture du support en direct | Du lundi au vendredi, de 09:00 à 17:00, au Centre de support européen  
Accusé de réception de l’incident | Dans un délai de quatre heures ouvrables. Les heures ouvrables correspondent aux heures de disponibilité du support en direct du Centre d’assistance.  
Mises à jour et mises à niveau | Tous les Service Packs, mises à jour et mises à niveau sont inclus sans frais supplémentaires.  
Remplacement de la clé de licence | Avec un contrat de support actif, une clé de licence peut être réaffectée en cas de changement de nom d’hôte. Le transfert est limité au remplacement d’un serveur au sein du même projet. Une approbation écrite préalable d’Eviden est requise.  
Accès à la base de connaissances | Accès complet aux articles de la base de connaissances, aux questions fréquemment posées et à la documentation en ligne  
Procédure d’urgence | SafeKit fournit un script d’encapsulation pour démarrer ou arrêter une application sans utiliser les fonctionnalités de haute disponibilité de SafeKit. Ce script appelle les scripts de démarrage et d’arrêt de l’application. Il ajoute ou supprime également l’adresse IP virtuelle si nécessaire.  
Portail d’assistance | <https://customercare.evidian.com>  
  
### Ressources gratuites sans contrat de support {#free-resources-no-contract-required}

Ressource gratuite | Détails  
---|---  
Assistant IA pour l’assistance | Utilisez [le chat IA SafeKit](</fr/resources/safekit-support/#ai-support>) sur safekit.eviden.com.   
Formation et certification en ligne | [Apprenez à votre rythme](/fr/resources/safekit-on-line-training/) grâce à des vidéos gratuites d’une durée totale d’environ 4 heures. Vous recevrez un certificat à la fin de la formation.  
Documentation | Guide de l’utilisateur, notes de mise à jour, base de connaissances et guides d’installation rapide [ici](/fr/resources/safekit-free-trial/)  
  
## Comparaison avec d’autres solutions {#comparison-vs-alternatives}

Critère | SafeKit | Cluster de basculement Microsoft (WSFC) | VMware HA | Open Source [1]  
---|---|---|---|---  
Stockage partagé (SAN/vSAN) requis | Non | Oui | Oui | Non  
Prise en charge Windows | Oui | Oui | Oui | Non  
Prise en charge Linux | Oui | Non | Oui | Oui  
Déploiement sur des sites distants | Excellent | Complexe | Complexe | Complexe  
OEM | Oui | Non | Non | Non  
Coût | Licence perpétuelle par nœud | Windows Server et SAN | vSphere Enterprise et SAN | Services d’intégration avancés  
Complexité de la configuration | Faible : un seul produit à installer et à configurer | Élevé : configuration d’Active Directory, SAN et du témoin | Élevé : configuration de vCenter et du stockage partagé | Élevé : plusieurs produits distincts à configurer  
Administration | Un produit géré via une console web | Élevé : nécessite une expertise en Active Directory et SAN | Élevé : dépend de vCenter | Élevé : plusieurs produits distincts à maintenir  
  
**[1]** Sous Linux, six projets open source distincts sont nécessaires pour fournir le même ensemble de fonctionnalités : Corosync, Pacemaker, DRBD, Keepalived, STONITH et HAProxy. SafeKit fournit ces fonctionnalités dans un seul produit pour Windows et Linux.

## Liens utiles {#quick-reference-links}

Lien | URL  
---|---  
Page d’accueil du produit | [https://safekit.eviden.com](/fr/)  
Aperçu technique (document Word avec texte et schémas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Essai gratuit | [https://safekit.eviden.com/resources/safekit-free-trial/](</fr/resources/safekit-free-trial/>)  
Obtenir un devis | [https://safekit.eviden.com/safekit-pricing/](</fr/safekit-pricing/>)  
Portail d’assistance | <https://customercare.evidian.com>  
Assistance IA gratuite | [https://safekit.eviden.com/resources/safekit-support/](</fr/resources/safekit-support/>)  
Formation et certification gratuites | [https://safekit.eviden.com/resources/safekit-on-line-training/](</fr/resources/safekit-on-line-training/>)  
Contactez-nous | [https://safekit.eviden.com/contact-us-for-safekit/](</fr/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-fr  %}}