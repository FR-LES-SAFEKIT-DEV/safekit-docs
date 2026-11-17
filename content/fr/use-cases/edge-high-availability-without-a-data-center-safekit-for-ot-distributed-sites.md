---
title: "Haute disponibilité en périphérie sans centre de données : SafeKit pour les sites OT et distribués"
canonical: "https://safekit.eviden.com/fr/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Les sites de calcul en périphérie n’ont pas de centre de données, mais ils ont toujours besoin d’une haute disponibilité. SafeKit transforme deux serveurs standard en un cluster de haute disponibilité prêt à l’emploi. Il ne nécessite aucun SAN ni personnel informatique, et le basculement est automatique."
category: "use-cases"
lang: "fr"
topics: "Le défi de la haute disponibilité en périphérie, Pourquoi SafeKit est la solution naturelle pour l’edge computing, Adéquation au déploiement en périphérie et distribué, Pourquoi les environnements OT en périphérie sont différents, Cas d’utilisation idéaux en périphérie, Haute disponibilité en périphérie vs. en centre de données : les principales différences, Systèmes d’exploitation et plateformes pris en charge, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-17.1 | glossaire 2026-11-17.4 | Translation LLM | 58 expressions"
---

# Haute disponibilité en périphérie sans centre de données : SafeKit pour les sites OT et distribués {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## Le défi de la haute disponibilité en périphérie {#the-edge-ha-challenge}

Les sites de calcul en périphérie n’ont souvent pas de centre de données et ne possèdent pas d’expertise en matière de haute disponibilité. Pourtant, la continuité d’activité est essentielle pour eux. Une usine, une plateforme pétrolière offshore, une clinique hospitalière, un magasin de détail ou un site d’antenne 5G ne peuvent pas se permettre d’avoir des temps d’arrêt. Mais ces sites ne peuvent pas justifier le coût et la complexité d’un cluster de centre de données traditionnel.

Les solutions traditionnelles de haute disponibilité, telles que Microsoft Failover Cluster (WSFC), Pacemaker avec Corosync ou VMware HA, ont été conçues pour les centres de données. Elles nécessitent un stockage partagé (SAN ou NAS), du matériel de cluster dédié, un personnel informatique permanent et une expertise complexe en matière de systèmes d’exploitation. Aucune de ces conditions n’est réunie en périphérie.

SafeKit a été conçu pour combler précisément cette lacune. Il assure le fonctionnement des applications en périphérie dans les usines, les plateformes pétrolières, les navires, la sécurité des bâtiments, le contrôle du trafic aérien, les réseaux 5G, les soins de santé, le commerce de détail, et bien plus encore. Il ne nécessite que deux serveurs standard connectés par un LAN.


![SafeKit pour l’edge computing](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Pourquoi SafeKit est la solution naturelle pour l’edge computing {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit transforme deux serveurs edge standard en un cluster de haute disponibilité prêt à l’emploi. Les serveurs peuvent être de n’importe quelle marque, physiques ou virtuels. Il n’y a pas de stockage partagé, pas de SAN et pas de matériel spécial. Un progiciel léger offre les fonctionnalités suivantes :

  * **Réplication de fichiers synchrone en temps réel.** Les données sont mises en miroir au niveau de l’octet sur le serveur de secours au moment de l’écriture.
  * **Basculement automatique.** En cas de défaillance du serveur principal, le serveur de secours prend le relais en quelques secondes, sans intervention humaine.
  * **Équilibrage de charge réseau facultatif.** Dans les déploiements actifs-actifs, les deux serveurs partagent la charge de travail.
  * **Console Web.** La gestion est basée sur un navigateur et accessible à distance via HTTPS. Elle ne nécessite aucune expertise sur site.
  * **Installation silencieuse et scriptable.** Elle convient au déploiement massif sur des centaines de sites distribués et à l’intégration dans des produits OEM.


Vous n’avez pas besoin d’acheter un SAN. Vous n’avez pas non plus besoin d’une licence Windows Server Datacenter. Vous n’avez pas besoin d’une expertise en cluster Linux ni de matériel de cluster dédié. L’ensemble de la pile de haute disponibilité est un progiciel unique.

## Adéquation au déploiement en périphérie et distribué {#edge--distributed-deployment-suitability}

SafeKit est spécialement conçu pour l’edge computing, les succursales et les entreprises distribuées :

Exigence en matière de calcul en périphérie | Solution SafeKit  
---|---  
Aucun personnel informatique dédié sur place | Basculement automatique sans intervention manuelle  
Aucune infrastructure SAN ou NAS | Architecture avec disques locaux uniquement et sans SAN  
Gestion à distance | Console Web accessible via HTTPS depuis n’importe quel navigateur  
Faible empreinte matérielle | Deux serveurs ou machines virtuelles standard sans matériel spécial  
Fonctionne derrière les pare-feu et le NAT | Ports configurables et console basée sur HTTPS  
Reprise d’activité après sinistre multisites | Réplication en temps réel avec le module mirror entre deux sites géographiques sur un VLAN étendu  
Réseaux isolés ou hors ligne | Pas de dépendance à Internet et entièrement autonome  
Déploiement OEM ou intégré | Installation silencieuse et scriptable que les éditeurs de logiciels peuvent intégrer  
Des centaines de clusters distribués | Conçu pour les entreprises distribuées disposant de nombreuses succursales  
  
## Pourquoi les environnements OT en périphérie sont différents {#why-edge-ot-environments-are-different}

Les environnements de technologie opérationnelle (OT) comprennent les systèmes SCADA, les systèmes de gestion de bâtiments (BMS), la sécurité physique et le contrôle industriel. Leurs exigences diffèrent fondamentalement de celles des centres de données informatiques :

  * **Aucun personnel informatique sur place.** Une sous-station, une station de pompage à distance ou un navire n’a pas d’administrateur système. La haute disponibilité doit être autonome.
  * **Réseaux isolés ou contraints.** De nombreux sites OT n’ont pas d’accès à Internet et disposent d’une bande passante WAN limitée. Les logiciels de haute disponibilité doivent fonctionner entièrement hors ligne.
  * **Disponibilité 24/7 et tolérance zéro pour la complexité.** L’arrêt d’une ligne de production, la perte de la vidéosurveillance ou l’interruption du contrôle d’accès coûtent beaucoup plus cher que le logiciel de haute disponibilité lui-même.
  * **Longs cycles de vie des équipements.** Les serveurs OT peuvent fonctionner pendant 10 à 15 ans. La solution de haute disponibilité doit être stable et nécessiter peu d’entretien, et elle ne doit pas nécessiter de mises à jour constantes.
  * **Matériel x86 standard uniquement.** Un site industriel distant n’a pas de budget ni de justification pour un SAN ou des nœuds de cluster dédiés.
  * **Aucune tolérance pour la complexité du système d’exploitation.** Les logiciels de cluster traditionnels nécessitent une expertise en matière de cluster. Les opérateurs OT ne possèdent pas cette expertise et ne devraient pas en avoir besoin.


Le modèle SafeKit répond directement à chacune de ces contraintes : pas de SAN, deux serveurs et basculement automatique.

## Cas d’utilisation idéaux en périphérie {#ideal-edge-use-cases}

SafeKit s’adapte à tout site sans centre de données où la haute disponibilité reste importante :

Secteur d’activité | Site de périphérie typique | Application critique  
---|---|---  
Sécurité physique et surveillance | Bâtiments, campus, aéroports | VMS : Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestion technique du bâtiment (BMS) | Immeubles de bureaux, hôpitaux, usines | Siemens Desigo CC, Bosch BIS/BVMS  
Contrôle d’accès électronique (EACS) | Installations et campus sécurisés | Siemens SiPass, Nedap, Bosch AMS, Hirsch MicroSesame  
SCADA et contrôle industriel | Usines, sous-stations, usines de traitement de l’eau | Tout logiciel SCADA, DCS ou HMI sous Windows ou Linux  
Contrôle du trafic aérien (CTA) | Aéroports, tours de contrôle | Gestion du trafic aérien et systèmes radar  
Centres de contrôle des opérations (CCO) | Métro, chemins de fer, pôles de transport | Signalisation ferroviaire et gestion des gares  
Maritime | Navires, navires de guerre | Systèmes de navigation, de gestion du fret et de gestion à bord  
Pétrole et gaz | Plateformes offshore, installations de forage éloignées | Systèmes de contrôle des procédés et de sécurité  
Télécommunications | Sites d’antennes 5G, nœuds MEC | Serveurs MEC (Multi-access Edge Computing)  
Soins de santé | Cliniques, centres de diagnostic à distance | Imagerie médicale, données patient, diagnostic à distance  
Vente au détail | Magasins, succursales, entrepôts | Gestion des points de vente et des stocks  
Militaire et défense | Bases d’opérations avancées, unités de terrain | Systèmes de commande et de communication essentiels à la mission  
  
## Haute disponibilité en périphérie vs. en centre de données : les principales différences {#edge-vs-data-center-ha-key-differences}

Critère | Haute disponibilité des centres de données (WSFC, Pacemaker, VMware HA) | Haute disponibilité SafeKit en périphérie  
---|---|---  
Stockage | Nécessite un stockage partagé (SAN ou NAS) | Sans SAN, avec des disques locaux uniquement  
Matériel | Nœuds de cluster dédiés, adaptateurs de bus hôte (HBA) et commutateurs | Deux serveurs x86 standard de n’importe quelle marque  
Expertise en systèmes d’exploitation | Compétences en matière de clusters Windows Server Datacenter ou Linux | Compétences standard en administration Windows ou Linux  
Personnel sur place | Nécessaire pour l’installation et l’intervention | Non requis, car le basculement est entièrement automatique  
Dépendance à Internet ou au cloud | Souvent géré dans le cloud | Fonctionne sur des réseaux entièrement isolés  
Échelle de déploiement | Centre de données unique | Des centaines de sites distribués  
Coût de la licence | Élevé (système d’exploitation de centre de données et licences SAN) | Une licence logicielle abordable par cluster  
  
{{%  insert-supported-os-fr  %}}

Pour connaître toutes les spécifications techniques, les contraintes de dimensionnement et les critères d’approvisionnement, consultez la 📘 [référence technique RFI et RFP](</fr/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>).


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}