---
title: "Gestion des pannes de courant et de l’isolement du réseau dans un cluster HA"
canonical: "https://safekit.eviden.com/fr/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Découvrez comment gérer l’isolement du réseau et les pannes de courant dans un cluster de haute disponibilité. SafeKit inclut des vérificateurs de cerveau divisé et une resynchronisation automatique. Ils garantissent l’intégrité des données et une disponibilité 24h/24 et 7j/7 sans disque partagé."
category: "best-practises"
lang: "fr"
topics: "Quels sont les différents scénarios en cas d’isolement du réseau dans un cluster ?, Quels sont les différents scénarios en cas de panne de courant dans un cluster ?, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Gestion des pannes de courant et de l’isolement du réseau dans un cluster HA {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-fr  %}}
 

## Quels sont les différents scénarios en cas de panne de courant dans un cluster ? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

Dans les scénarios suivants, le nœud 1 est initialement le nœud principal. Le nœud 2 est initialement le nœud secondaire.

### Panne de courant du nœud principal {#primary-node-power-outage}

Lorsqu’une panne de courant arrête uniquement le nœud principal :

  * SafeKit bascule automatiquement sur le nœud secondaire. Le nœud 2 devient ALONE et redémarre l’application.
  * Lorsque le nœud 1 redémarre, il resynchronise les données répliquées. Il devient alors SECOND.
  * Si nécessaire, un administrateur peut permuter les rôles principal et secondaire.


### Panne de courant du nœud secondaire {#secondary-node-power-outage}

Lorsqu’une panne de courant arrête uniquement le nœud secondaire :

  * Aucun basculement ne se produit. Le nœud 1 devient ALONE. L’application continue de s’exécuter sur le nœud 1.
  * Lorsque le nœud 2 redémarre, il resynchronise les données répliquées. Il devient alors SECOND.


### Panne de courant sur les deux nœuds - cas 1 {#general-power-outage---case-1}

Lorsqu’une panne de courant arrête les deux nœuds, le comportement par défaut est le suivant :

  * Les deux nœuds passent à l’état STOP.
  * Lorsque le nœud 1 redémarre, il ne passe pas à l’état ALONE. Il ne redémarre pas l’application. Il ne peut pas savoir si ses données sont à jour. Il passe donc à l’état WAIT et attend que l’autre nœud redémarre.
  * Lorsque le nœud 2 redémarre, les deux nœuds reprennent leurs états précédents : PRIM et SECOND.


### Panne de courant sur les deux nœuds - cas 2 {#general-power-outage---case-2}

Lorsqu’une panne de courant arrête les deux nœuds, le comportement avec le paramètre `syncdelta` est le suivant :

  * Dans cet exemple, `syncdelta` est défini sur 10 minutes dans la configuration. Un nœud peut alors démarrer même si ses données ont jusqu’à 10 minutes de retard par rapport à la dernière synchronisation.
  * Lorsque le nœud 1 redémarre dans les 10 minutes suivant la panne de courant, il passe à l’état ALONE. Il redémarre l’application.
  * Lorsque le nœud 2 redémarre, il resynchronise les données répliquées. Il devient alors SECOND.
  * Remarque : si le nœud 2 redémarre en premier, il devient ALONE. Le nœud 1 devient alors SECOND lorsqu’il démarre.



{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}