---
title: "Handling Power Outages and Network Isolation in an HA Cluster"
canonical: "https://safekit.eviden.com/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Learn how to manage network isolation and power outages in a high availability cluster. SafeKit includes split-brain checkers and automatic resynchronization. They ensure data integrity and 24/7 uptime without a shared disk."
category: "best-practises"
lang: "en"
topics: "What are the different scenarios in case of network isolation in a cluster?, What are the different scenarios in case of power outage in a cluster?, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Handling Power Outages and Network Isolation in an HA Cluster {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-en  %}}
 

## What are the different scenarios in case of power outage in a cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

In the following scenarios, node 1 is initially the primary node. Node 2 is initially the secondary node.

### Primary node power outage {#primary-node-power-outage}

When a power outage stops only the primary node:

  * SafeKit automatically fails over to the secondary node. Node 2 becomes ALONE and restarts the application.
  * When node 1 reboots, it resynchronizes the replicated data. Then it becomes SECOND.
  * If needed, an administrator can swap the primary and secondary roles.


### Secondary node power outage {#secondary-node-power-outage}

When a power outage stops only the secondary node:

  * No failover occurs. Node 1 becomes ALONE. The application continues to run on node 1.
  * When node 2 reboots, it resynchronizes the replicated data. Then it becomes SECOND.


### Power outage on both nodes - case 1 {#general-power-outage---case-1}

When a power outage stops both nodes, the default behavior is as follows:

  * Both nodes go to the STOP state.
  * When node 1 reboots, it does not go to the ALONE state. It does not restart the application. It cannot know whether its data is up to date. So it goes to the WAIT state and waits for the other node to restart.
  * When node 2 reboots, both nodes return to their previous states: PRIM and SECOND.


### Power outage on both nodes - case 2 {#general-power-outage---case-2}

When a power outage stops both nodes, the behavior with the `syncdelta` parameter is as follows:

  * In this example, `syncdelta` is set to 10 minutes in the configuration. A node can then start even if its data is up to 10 minutes behind the last synchronization.
  * When node 1 reboots within 10 minutes of the power outage, it goes to the ALONE state. It restarts the application.
  * When node 2 reboots, it resynchronizes the replicated data. Then it becomes SECOND.
  * Note: if node 2 reboots first, it becomes ALONE. Node 1 then becomes SECOND when it starts.



{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}