---
title: "Haute disponibilité Edge sans centre de données : SafeKit pour les sites OT et distribués"
canonical: "https://safekit.eviden.com/fr/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Les sites périphériques ne disposent pas de centre de données, mais ont tout de même besoin de haute disponibilité. SafeKit transforme deux serveurs standard en un cluster haute disponibilité prêt à l'emploi : pas de SAN, pas de personnel informatique, basculement automatique."
category: "use-cases"
lang: "fr"
topics: "Le défi de la haute disponibilité en périphérie, Pourquoi SafeKit est la solution idéale pour la périphérie, Adéquation des déploiements en périphérie et distribués, Pourquoi les environnements OT en périphérie sont différents, Cas d'utilisation idéaux en périphérie, Haute disponibilité en périphérie vs. centre de données : principales différences, Configuration technique minimale requise, 🔍 Centre de navigation haute disponibilité SafeKit"
---

# Haute disponibilité en périphérie sans centre de données : SafeKit pour les sites OT et distribués ; {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## Le défi Edge HA {#the-edge-ha-challenge}

Les sites périphériques ne disposent souvent ni de centre de données ni d'expertise en haute disponibilité, or la continuité des activités y est essentielle. Une usine, une plateforme pétrolière offshore, un hôpital, un magasin ou un site d'antenne 5G ne peuvent se permettre aucune interruption de service, mais ne peuvent justifier le coût et la complexité d'un cluster haute disponibilité de centre de données traditionnel.

Les solutions de haute disponibilité traditionnelles ( Microsoft , Pacemaker/Corosync, VMware HA) ont été conçues pour les centres de données : elles supposent un stockage partagé (SAN/NAS), du matériel de cluster dédié, du personnel informatique permanent et une expertise pointue au niveau du système d’exploitation. Aucune de ces solutions n’est disponible en périphérie de réseau.

SafeKit a été conçu précisément pour combler ce manque. Il assure le fonctionnement des applications périphériques dans les usines, les plateformes pétrolières, les navires, la sécurité des bâtiments, le contrôle aérien, les réseaux 5G, le secteur de la santé, le commerce de détail et bien plus encore, avec seulement deux serveurs standard et un réseau local.


![ SafeKit pour Edge ](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Pourquoi SafeKit est-il le choix idéal pour Edge {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit transforme deux serveurs périphériques standard (toutes marques, physiques ou virtuels) en un cluster HA prêt à l'emploi : aucun stockage partagé, aucun SAN, aucun matériel spécifique. Une seule pile logicielle légère offre :

  * ** Réplication de fichiers synchrone en temps réel ; ** — les données sont dupliquées octet par octet sur le serveur de secours lors de l’écriture.
  * ** Basculement automatique ** — En cas de défaillance du serveur principal, le serveur de secours prend le relais automatiquement en quelques secondes.
  * ** Équilibrage de charge réseau optionnel ** — pour les déploiements actifs-actifs où les deux serveurs partagent la charge de travail
  * Console Web ** ; ** : gestion via navigateur, accessible à distance par HTTPS, ne nécessitant aucune expertise sur site.
  * ** Installation silencieuse et scriptable ; ** — convient à l’intégration OEM et au déploiement massif sur des centaines de sites distribués.


Aucun SAN à acquérir, aucune licence Windows Server Datacenter requise, aucune expertise en système d'exploitation de cluster Linux nécessaire, et aucun matériel de cluster dédié. L'ensemble de la pile HA est un progiciel unique.

## Adéquation du déploiement en périphérie et distribué {#edge--distributed-deployment-suitability}

SafeKit est spécialement conçu pour les scénarios de périphérie, de succursales et d'entreprises distribuées :

Exigence de bord | SafeKit Réponse  
---|---  
Aucun personnel informatique dédié sur site | Basculement automatique, aucune intervention manuelle requise  
Architecture sans SAN | , disques locaux uniquement, aucune infrastructure SAN/NAS  
Console Web de gestion à distance | accessible via HTTPS depuis n'importe quel navigateur  
Faible encombrement matériel | 2 serveurs ou machines virtuelles standard, aucun matériel spécifique requis  
Fonctionne derrière un pare-feu/NAT | Ports configurables, console HTTPS  
Reprise après sinistre multisite | Mirror entre deux sites géographiques sur un VLAN étendu  
Réseaux isolés / hors ligne | Aucune dépendance à Internet ; entièrement autonome  
Déploiement OEM/embarqué | Installation silencieuse, scriptable, intégrable par les éditeurs de logiciels  
Des centaines de clusters distribués | Conçus pour les entreprises distribuées gérant de nombreuses succursales  
  
## Pourquoi les environnements Edge OT sont différents {#why-edge-ot-environments-are-different}

Les environnements OT (technologies opérationnelles) — SCADA, BMS, sécurité physique, contrôle industriel — ont des exigences fondamentalement différentes de celles des centres de données IT :

  * ** Aucun personnel informatique sur site. ** Une sous-station, une station de pompage distante ou un navire ne dispose pas d'administrateur système. La haute disponibilité doit être autogérée.
  * ** Réseaux isolés ou à bande passante limitée. ** De nombreux sites OT n'ont pas d'accès à Internet et disposent d'une bande passante WAN limitée. Le logiciel HA doit fonctionner entièrement hors ligne.
  * ** Disponibilité 24h/24 et 7j/7, tolérance zéro pour la complexité. ** L'arrêt d'une chaîne de production, la perte d'un système de vidéosurveillance ou l'interruption du contrôle d'accès coûtent bien plus cher que le logiciel de haute disponibilité lui-même.
  * ** Longue durée de vie des équipements. ** Les serveurs OT peuvent fonctionner pendant 10 à 15 ans. La solution de haute disponibilité doit être stable, nécessiter peu de maintenance et ne pas exiger de mises à jour constantes.
  * ** Matériel x86 standard uniquement. ** Aucun budget ni justification pour un SAN ou des nœuds de cluster dédiés sur un site industriel distant.
  * ** Intolérance à la complexité au niveau du système d'exploitation. ** Pacemaker, Corosync ou WSFC nécessitent une expertise en cluster que les opérateurs OT ne possèdent tout simplement pas et ne devraient pas avoir besoin.


Le modèle sans SAN, à deux serveurs et à basculement automatique de SafeKit répond directement à chacune de ces contraintes.

## Cas d'utilisation idéaux en périphérie {#ideal-edge-use-cases}

Tout site sans centre de données — où la haute disponibilité reste importante :

Vertical | Site typique en bordure | Application critique  
---|---|---  
Sécurité physique et surveillance | Bâtiments, campus, aéroports | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
Gestion technique du bâtiment (GTB) | Immeubles de bureaux, hôpitaux, usines | Siemens Desigo CC, Bosch BIS/BVMS  
Contrôle d'accès électronique (EACS) | Installations sécurisées, campus | Siemens SiPass, Nedap , Bosch AMS  
SCADA et contrôle industriel | Usines, sous-stations, stations de traitement des eaux | Tout logiciel SCADA, DCS ou IHM sur Windows ou Linux  
Contrôle du trafic aérien (ATC) | Aéroports, tours de contrôle | Systèmes de gestion ATC et radar  
Centres de contrôle des opérations (CCO) | Métro, chemin de fer, pôles de transport en commun | Signalisation ferroviaire et gestion des gares  
Navires maritimes | , bâtiments de guerre | Systèmes de navigation, de chargement et de gestion à bord  
Pétrole et gaz | Plateformes offshore, installations de forage à distance | Systèmes de contrôle des procédés et de sécurité  
Sites d'antennes 5G | , nœuds MEC | serveurs de calcul en périphérie multi-accès (MEC).  
Soins de santé | Cliniques, centres de diagnostic à distance | Imagerie médicale, données patient, diagnostic à distance  
Commerce de détail | Magasins, succursales, entrepôts | Gestion des points de vente et des stocks  
Défense | Bases opérationnelles avancées, unités de terrain | Systèmes de commandement et de communication critiques pour la mission  
  
## Haute disponibilité en périphérie vs. en centre de données : principales différences {#edge-vs-data-center-ha-key-differences}

Critère | Haute disponibilité pour centre de données (WSFC, Pacemaker, VMware HA) | SafeKit Haute disponibilité périphérique  
---|---|---  
Stockage | Nécessite un stockage partagé SAN/NAS. Stockage | Sans SAN — disques locaux uniquement.  
Matériel | Nœuds de cluster dédiés, HBA, commutateurs | Deux serveurs x86 standard quelconques  
Expertise en systèmes d'exploitation | Windows centre de données ou cluster Linux | (standard) Windows / Linux (administrateur)  
Personnel sur site | requis pour la configuration et l'intervention | non requis — entièrement automatique  
Dépendance Internet/cloud | Souvent géré dans le cloud | Entièrement isolé du réseau  
Échelle de déploiement | Centre de données unique | Des centaines de sites distribués  
Coût de la licence | Élevé (OS de centre de données, licences SAN) | Licence logicielle unique et abordable par cluster  
RTO typique | 1 à 5 minutes | Moins d'une minute (configurable)  
  
## Exigences techniques minimales {#technical-minimum-requirements}

  * Serveurs ** : ** 2 serveurs x86 standard ou VM (toute marque de matériel, physique ou virtuel) ou ARM ( Linux uniquement)
  * Système d'exploitation ** : ** Windows Server 2019/2022/2025, Windows 11, RHEL 8/9, Ubuntu 24.04
  * Réseau ** : LAN 1 Gbit/s ** pour la réplication ; réseau de pulsation dédié recommandé
  * Stockage ** : Disques locaux uniquement — ni SAN, ni NAS, ni aucun stockage partagé **
  * ** Aucune édition spéciale du système d'exploitation. ** — Windows Serveur Standard suffit ; aucune licence Datacenter n'est requise.


Pour les spécifications techniques complètes, les contraintes de dimensionnement et les critères d'approvisionnement, voir la référence technique 📘 [ RFP/RFI ](</fr/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) .


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}