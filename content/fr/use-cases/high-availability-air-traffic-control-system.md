---
title: "Haute disponibilité pour les systèmes de contrôle du trafic aérien"
canonical: "https://safekit.eviden.com/fr/use-cases/high-availability-air-traffic-control-system/"
description: "Haute disponibilité du contrôle aérien : ADB SafeGate utilise SafeKit dans des aéroports du monde entier pour la réplication en temps réel et le basculement sous Windows."
category: "use-cases"
lang: "fr"
topics: "Systèmes de contrôle du trafic aérien, Pourquoi le contrôle du trafic aérien est-il essentiel ?, Comment SafeKit protège le contrôle du trafic aérien, Mise en œuvre dans le monde réel chez ADB SafeGate"
hashpart: "air-traffic-control-systems, why-is-air-traffic-control-critical, safekit-high-availability-for-atc, real-world-implementation-at-adb-safegate"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.22 | Translation LLM | 58 expressions"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# Haute disponibilité pour les systèmes de contrôle du trafic aérien {#high-availability-for-air-traffic-control-systems}

## Systèmes de contrôle du trafic aérien {#air-traffic-control-systems}

Les contrôleurs aériens ont l’une des tâches les plus complexes et les plus stressantes que l’on puisse imaginer. Aujourd’hui, l’espace aérien est très fréquenté et le trafic aérien est intense. Une seule erreur dans la direction des aéronefs peut avoir des conséquences catastrophiques. Les systèmes modernes de contrôle du trafic aérien dépendent d’applications logicielles sophistiquées. Ces applications aident les contrôleurs à prendre des décisions critiques.

ADB SafeGate est un fournisseur mondial de solutions pour le côté piste, notamment de logiciels pour les tours de contrôle de la circulation aérienne. Ses solutions équipent plus de 3 000 aéroports dans plus de 175 pays. Elles gèrent des données essentielles sur les opérations aéroportuaires, notamment :

  * Planification des vols et informations sur le flux du trafic aérien
  * Données météorologiques
  * État de l’éclairage et du contrôle de l’aérodrome
  * Opérations sur l’aire de trafic et d’accostage

## Pourquoi le contrôle du trafic aérien est-il essentiel ? {#why-is-air-traffic-control-critical}

Le contrôle du trafic aérien est l’une des activités les plus critiques qui existent. Toute défaillance du système à un moment critique peut compromettre la prise de décision des contrôleurs et la sécurité des passagers. Les contrôleurs doivent avoir une confiance totale dans les systèmes qui les soutiennent.

Cependant, la meilleure application est inutile si un serveur, un système d’exploitation ou un logiciel tombe en panne à un moment critique. ADB SafeGate a reconnu la nécessité d’assurer la disponibilité de son environnement critique. L’entreprise a décidé d’étudier comment garantir une disponibilité 24h/24 et 7j/7 pour ses applications.

**Le défi** : Mettre à la disposition des contrôleurs aériens une suite complète d’applications 24 heures sur 24, 7 jours sur 7. Il s’agit d’une exigence obligatoire pour le contrôle du trafic aérien.

## Comment SafeKit protège le contrôle du trafic aérien {#safekit-high-availability-for-atc}

ADB SafeGate a choisi SafeKit, la solution logicielle de haute disponibilité d’Eviden, car elle offre :

  * **Disponibilité 24h/24 et 7j/7** : les applications critiques sont toujours disponibles
  * **Serveurs d’applications redondants** : les serveurs peuvent être situés dans des salles de machines distinctes pour une protection contre les catastrophes
  * **Serveurs standard** : pas de disques partagés ni d’infrastructure SAN complexe
  * **Réplication des fichiers en temps réel** : aucune perte de données (RPO = 0)
  * **Récupération automatique** : aucune intervention manuelle n’est nécessaire après une panne

Ainsi, les contrôleurs aériens utilisant le logiciel ADB SafeGate peuvent se concentrer entièrement sur leur tâche complexe. Ils peuvent être sûrs que les systèmes qui les assistent sont résilients et toujours disponibles.

## Mise en œuvre dans le monde réel chez ADB SafeGate {#real-world-implementation-at-adb-safegate}

### Approche de déploiement {#deployment-approach}

Dans un aéroport, ADB SafeGate installe ses applications et SafeKit sur deux serveurs Windows standard. Les serveurs n’ont pas de disques partagés. Les applications bénéficient d’une réplication de fichiers en temps réel et d’une récupération automatique après une panne.

### Comment cela fonctionne-t-il en pratique ? {#how-it-works-in-practice}

**Phase 1 : Fonctionnement normal**

L’application s’exécute uniquement sur le serveur 1, à l’intérieur du module mirror SafeKit. Les clients se connectent automatiquement au serveur 1 via une adresse IP virtuelle principale/secondaire. Seuls les fichiers modifiés par l’application sont répliqués. Ils sont envoyés au serveur 2 en temps réel sur le réseau. Cela minimise le trafic réseau.

Il n’y a pas de prérequis sur l’organisation du serveur. Les fichiers peuvent se trouver sur un disque RAID5 dans le serveur 1 et sur un disque simple dans le serveur 2.

Les écritures sont répliquées de manière synchrone sur les deux serveurs. Ainsi, aucune donnée n’est perdue en cas de panne. Les données validées par une application transactionnelle sont automatiquement disponibles sur le serveur secondaire. PostgreSQL en est un exemple. Cette garantie n’est pas possible avec la réplication asynchrone.

**Phase 2 : Basculement en cas de défaillance**

Si le serveur 1 tombe en panne, SafeKit bascule automatiquement sur le serveur 2. Le temps de basculement est égal au temps de détection de la panne plus le temps de redémarrage de l’application. Le délai d’attente de détection par défaut est de 30 secondes. Il n’y a pas de délai de récupération du système de fichiers, contrairement aux solutions de réplication de disque.

**Phase 3 : Resynchronisation après une défaillance**

Lorsque le serveur 1 redémarre, le module mirror resynchronise automatiquement les fichiers.

Seuls les fichiers modifiés sur le serveur 2 pendant l’indisponibilité du serveur 1 sont resynchronisés. Les applications continuent de s’exécuter sur le serveur 2 pendant la resynchronisation. Après la resynchronisation, le système est à nouveau hautement disponible et protégé.

L’administrateur peut souhaiter que l’application s’exécute sur le serveur 1 par priorité. Dans ce cas, un retour au serveur 1 peut être déclenché manuellement en un seul clic. Il peut également être automatique.

### Principaux avantages pour les aéroports {#key-benefits-for-airports}

  * **Aucun matériel spécifique** : les serveurs Windows standard suffisent
  * **Pas de stockage partagé** : pas d’infrastructure SAN coûteuse et pas de complexité liée aux disques partagés
  * **Résistance aux sinistres** : les serveurs peuvent se trouver dans des salles de machines distinctes avec des alimentations électriques distinctes
  * **Zéro perte de données** : la réplication synchrone garantit RPO = 0 pour toutes les transactions validées
  * **Récupération automatique** : aucune intervention manuelle n’est nécessaire après une panne
  * **Moins de stress** : les contrôleurs aériens peuvent faire confiance aux systèmes qui les aident à prendre des décisions critiques
  * **Fiabilité mondiale** : déployé avec succès dans des aéroports de nombreux pays et continents

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
