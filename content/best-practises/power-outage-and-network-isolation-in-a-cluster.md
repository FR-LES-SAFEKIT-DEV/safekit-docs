---
title: "Handling Power Outages and Network Isolation in a HA Cluster"
slug: "power-outage-and-network-isolation-in-a-cluster"
canonical: "https://safekit.eviden.com/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Handling Power Outages and Network Isolation in a HA Cluster"
category: "best-practises"
lang: "en"
topics: "What are the different scenarios in case of network isolation in a cluster?, What are the different scenarios in case of power outage in a cluster?, 🔍 SafeKit High Availability Navigation Hub"
---

# Handling Power Outages and Network Isolation in a HA Cluster


{{%  insert-safekit-network-isolation-en %}}
 

## What are the different scenarios in case of power outage in a cluster?

### Primary node power outage

When a power outage stops only the primary node:

  * there is an automatic failover on the secondary node, which becomes ALONE and restarts the application,
  * when node 1 is rebooted, it becomes SEDOND after resynchronization of replicated data,
  * the roles of primary and secondary can be swapped by an adminsitrator if needed.


### Secondary node power outage

When a power outage stops only the secondary node:

  * there is no failover, the primary becomes ALONE and the application continues its execution on node 1,
  * when node 2 is rebooted, it becomes SEDOND after resynchronization of replicated data.


### General power outage - case 1

When a power outage stops both nodes, the default behavior is:

  * both nodes goes to STOP,
  * when node 1 is rebooted, it does not go into ALONE state and does not restart the application because it doesn't know if it has the up-to-date data. So it goes to the WAIT state waiting for the restart of the other node,
  * when node 2 is rebooted, both nodes return to their previous PRIM/SECOND states.


### General power outage - case 2

When a power outage stops both nodes, the behavior with syncdelta is :

  * syncdelta is set for example to 10 minutes in the configuration meaning that start of a node is accepted even if its data is 10 minutes behind the last sync,
  * when node 1 is rebooted, it goes to ALONE and restarts the application assuming that the restart is done within 10 minutes after the power failure,
  * when node 2 is rebooted, it becomes SECOND after resynchronization of replicated data,
  * Note: if node 2 is rebooted the first, then it becomes ALONE and node 1 will become SECOND at its start.



{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}