---
title: "Gestion des pannes de courant et de l'isolation réseau dans un cluster HA"
slug: "power-outage-and-network-isolation-in-a-cluster"
canonical: "https://safekit.eviden.com/fr/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Gestion des pannes de courant et de l'isolation réseau dans un cluster HA"
category: "best-practises"
lang: "fr"
topics: "Quels sont les différents scénarios en cas d'isolement réseau dans un cluster ?, Quels sont les différents scénarios en cas de coupure de courant dans un cluster ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Gestion des pannes de courant et de l'isolation réseau dans un cluster HA


{{%  insert-safekit-network-isolation-fr %}}
 

## Quels sont les différents scénarios en cas de coupure de courant dans un cluster ?

### Coupure de courant du nœud primaire

Lorsqu'une panne de courant arrête uniquement le nœud primaire :

  * il y a un basculement automatique sur le nœud secondaire, qui devient ALONE et redémarre l'application,
  * lorsque le nœud 1 est redémarré, il devient SEDOND après resynchronisation des données répliquées,
  * les rôles de primaire et de secondaire peuvent être échangés par un administrateur si nécessaire.


### Coupure de courant du nœud secondaire

Lorsqu'une panne de courant arrête uniquement le nœud secondaire :

  * il n'y a pas de basculement, le primaire devient ALONE et l'application continue son exécution sur le nœud 1,
  * lorsque le nœud 2 est redémarré, il devient SEDOND après resynchronisation des données répliquées.


### Coupure de courant générale - cas 1

Lorsqu'une panne de courant arrête les deux nœuds, le comportement par défaut est :

  * les deux nœuds passent à STOP,
  * lorsque le nœud 1 est redémarré, il ne passe pas à l'état ALONE et ne redémarre pas l'application car il ne sait pas s'il dispose des données à jour. Il passe donc à l'état WAIT en attendant le redémarrage de l'autre nœud,
  * lorsque le nœud 2 est redémarré, les deux nœuds reviennent à leurs états PRIM/SECOND précédents.


### Coupure de courant générale - cas 2

Lorsqu'il y a un isolement du réseau, le comportement avec un split-brain checker est :

  * un split-brain checker a été configuré avec l'adresse IP d'un routeur (un témoin),
  * en cas d'isolement du réseau, avant de passer en ALONE, les deux nœuds testent l'adresse IP,
  * le nœud qui peut accéder à l'adresse IP passe à ALONE, l'autre passe à WAIT,
  * lorsque l'isolation est réparée, le nœud WAIT resynchronise ses données et devient SECOND.


Remarque : Si le témoin est en panne ou déconnecté, les deux nœuds passent à WAIT et l'application n'est plus en cours d'exécution. C'est pourquoi vous devez choisir un témoin robuste comme un routeur.


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}