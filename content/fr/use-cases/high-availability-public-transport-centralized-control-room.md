---
title: "Haute disponibilité pour les transports publics : salle de contrôle centralisée"
canonical: "https://safekit.eviden.com/fr/use-cases/high-availability-public-transport-centralized-control-room/"
description: "Haute disponibilité des salles de contrôle : la RATP utilise SafeKit pour la ligne 1 sans conducteur du métro parisien, avec réplication, basculement et équilibrage de charge."
category: "use-cases"
lang: "fr"
topics: "Salles de contrôle des transports en commun, Pourquoi la salle de contrôle est-elle essentielle ?, Haute disponibilité SafeKit pour les transports publics, Mise en œuvre concrète à la RATP"
hashpart: "public-transport-control-rooms, why-is-a-centralized-control-room-critical, safekit-high-availability-for-public-transport, real-world-implementation-at-ratp"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.30 | Translation LLM | 58 expressions"
image: "/wp-content/uploads/2026/05/safekit-occ-512-512.jpg"
schemaType: "Article"
schemaMentions: ["RATP"]
---

# Haute disponibilité pour les transports publics : salle de contrôle centralisée {#high-availability-for-public-transport-centralized-control-room}

## Salles de contrôle des transports en commun {#public-transport-control-rooms}

Une salle de contrôle centralisée est le centre névralgique des systèmes de transport public modernes. La salle de contrôle surveille l’ensemble des lignes de métro, gère les opérations automatisées et assure la sécurité des passagers. Pour les systèmes de métro, les lignes de métro automatisées et les réseaux de bus, la salle de contrôle doit fonctionner 24 heures sur 24, 7 jours sur 7, sans interruption.

La RATP gère le métro parisien. Elle transporte plus de 10 millions de passagers chaque jour. La ligne 1 du métro parisien est entièrement automatisée et sans conducteur. Cela rend le rôle de la salle de contrôle encore plus critique.

## Pourquoi la salle de contrôle est-elle essentielle ? {#why-is-a-centralized-control-room-critical}

Les opérateurs d’une ligne de métro doivent réagir immédiatement au moindre incident. Une panne informatique ne doit jamais empêcher les opérateurs de visualiser l’activité de la ligne.

Les principales tâches des opérateurs de la salle de contrôle sont les suivantes :

  * Surveillance des mouvements des trains sur les voies
  * Gestion des incidents détectés automatiquement par les caméras vidéo
  * Gestion des systèmes de communication et des annonces publiques
  * Supervision des opérations de sécurité et de l’information des passagers

Une défaillance du système dans la salle de contrôle a un impact direct sur la sécurité des passagers et la continuité du service. Toutes les applications critiques de la salle de contrôle doivent être protégées par une haute disponibilité. Les passerelles, les bases de données et les interfaces web en sont des exemples.

## Haute disponibilité SafeKit pour les transports publics {#safekit-high-availability-for-public-transport}

La RATP a été confrontée à des contraintes majeures pour le projet d’automatisation de la ligne 1 :

  * Un calendrier de déploiement serré
  * La plupart des applications n’ont pas été conçues à l’origine pour une haute disponibilité
  * Une solution était nécessaire pour les serveurs Windows et Linux
  * Il n’y avait pas de budget pour du matériel coûteux, comme le stockage SAN ou les dispositifs d’équilibrage de charge réseau

SafeKit a été choisi pour les raisons suivantes :

  * Il s’agit d’une solution purement logicielle, sans disques partagés ni SAN
  * Il fournit la même solution sous Windows et Linux
  * Il assure trois fonctions essentielles : l’équilibrage de charge, le basculement automatique et la réplication des données en temps réel
  * Il est simple à mettre en œuvre sur des serveurs standards, facile à administrer et polyvalent

## Mise en œuvre concrète à la RATP {#real-world-implementation-at-ratp}

La RATP a déployé SafeKit avec deux types de clusters :

  * **Cluster farm** : un cluster actif/actif avec équilibrage de charge réseau et basculement automatique
  * **Cluster mirror** : un cluster actif/passif avec réplication de données en temps réel et basculement automatique

### Approche de déploiement {#deployment-approach}

Tout d’abord, la RATP a défini les besoins fonctionnels. Ensuite, SafeKit a été configuré pour chaque application protégée. Les applications elles-mêmes n’ont pas été modifiées. SafeKit ne nécessite aucune modification physique des serveurs.

Un cluster d’applications SafeKit comprend :

  * Deux serveurs avec le même système d’exploitation
  * L’application est installée sur les deux serveurs
  * SafeKit installé sur les deux serveurs
  * Un ou plusieurs modules d’application configurés pour une haute disponibilité et un équilibrage de charge

Plusieurs modules d’application peuvent s’exécuter en parallèle sur le même cluster. Cela optimise l’utilisation des ressources serveur. La RATP a validé les modules SafeKit en trois étapes : test, pré-production et production.

### Opérations quotidiennes {#daily-operations}

Les opérateurs informatiques administrent désormais tous les clusters d’applications avec :

  * La même solution de haute disponibilité sous Windows et Linux
  * La même console d’administration pour tous les clusters
  * La même configuration et les mêmes commandes
  * Surveillance unifiée pour l’équilibrage de charge, la haute disponibilité et la réplication des données

Les serveurs de sauvegarde des applications critiques sont situés dans une salle des machines séparée. Ils fonctionnent sur des alimentations électriques distinctes. En cas d’incident, les opérations se poursuivent sans interruption de service pour les passagers du métro parisien.

### Principaux avantages {#key-benefits}

  * **Réduction des coûts** : pas d’infrastructure SAN coûteuse avec des disques partagés ni d’appliances d’équilibrage de charge réseau
  * **Administration simplifiée** : une seule console gère les clusters Windows et Linux
  * **Haute disponibilité** : équilibrage de charge, basculement automatique et réplication de données en temps réel
  * **Impact minimal sur le projet** : les applications existantes ne nécessitent aucune modification
  * **Résilience opérationnelle** : la reprise automatique assure la continuité du service aux passagers

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
