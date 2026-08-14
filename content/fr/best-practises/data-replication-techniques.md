---
title: "Techniques de réplication de données pour la haute disponibilité : une comparaison complète"
slug: "data-replication-techniques"
canonical: "https://safekit.eviden.com/fr/best-practises/data-replication-techniques/"
description: "Techniques de réplication de données pour la haute disponibilité : une comparaison complète Techniques de réplication de données au niveau base de données, disque ou fichier ?"
category: "best-practises"
lang: "fr"
topics: "Techniques de réplication de données au niveau base de données, disque ou fichier ?, Tableaux comparatifs entre les techniques de réplication de données, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Techniques de réplication de données pour la haute disponibilité : une comparaison complète

## Techniques de réplication de données au niveau base de données, disque ou fichier ?

### Aperçu

Cet article étudie les avantages et les inconvénients des techniques de réplication de données au niveau base de données, disque et fichier pour les clusters de haute disponibilité. Nous étudions le basculement sur panne, le retour après panne, la simplicité de mise en œuvre.


<img src="/wp-content/uploads/2023/03/data-replication-techniques.png" width="128" alt="Techniques de réplication de données">


Les tableaux comparatifs suivants détaillent les techniques de réplication de données mises en œuvre par SafeKit, un produit logiciel de haute disponibilité.

### Quelle est la technique de réplication des données au niveau base de données ?

C'est la réplication des fichiers journaux entre deux serveurs faite par le système de gestion de la base de données (comme le [journal de SQL Server](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>)).

Pour un basculement automatique, il est obligatoire d'avoir une réplication synchrone sinon les données des dernières transactions ne seront pas récupérées sur le serveur secondaire après un basculement.

Cette technique de réplication des données réplique une base de données mais pas les autres données d'une application. Le basculement de nombreuses applications nécessite également la réplication d'autres données telles que les fichiers de configuration.

Lorsqu'un serveur tombe en panne et perd certains fichiers de la base de données, le retour après panne n'est pas automatique. Un DBA qualifié doit restaurer la base de données sur le serveur défaillant.

### Quelle est la technique de réplication des données au niveau disque ?

C'est la réplication des modifications à l'intérieur des disques entre deux serveurs (comme [DRBD](<https://linbit.com/drbd/>)).

Pour un basculement automatique, la réplication synchrone entre les disques est obligatoire pour avoir 0 perte de données.

Cette technique de réplication de données peut répliquer des bases de données ainsi que d'autres fichiers. Mais, il y a un fort impact sur l'organisation des données applicatives. Toutes les données doivent être localisées dans le disque répliqué. Cela peut être impossible si certaines données à répliquer se trouvent dans le disque système, car ce disque est propre à chaque serveur.

Des compétences sont requises pour configurer un disque répliqué avec un système de fichiers et pour configurer les données applicatives dans le disque répliqué.

### Quelle est la technique de réplication des données au niveau fichier ?

C'est la réplication des modifications à l'intérieur des fichiers entre deux serveurs (comme [SafeKit](</fr/>) ).

Pour un basculement automatique, la [réplication synchrone](</best-practises/synchronous-replication-vs-asynchronous-replication/>) est requise pour avoir 0 perte de données.

Cette technique de réplication de données peut répliquer des bases de données ainsi que d'autres fichiers. Il n'y a pas d'impact sur l'organisation des données d'une application. Par exemple, si une application a ses données sur le disque système, la réplication de fichiers en temps réel fonctionne.

La solution est très simple à configurer car seuls les chemins des répertoires à répliquer sont configurés.

## Tableaux comparatifs entre les techniques de réplication de données


{{%  insert-safekit-mirror-comparison-table-fr %}}
 


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}