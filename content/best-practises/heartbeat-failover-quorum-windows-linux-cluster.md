---
title: "Heartbeat, failover and quorum in a cluster"
canonical: "https://safekit.eviden.com/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "How heartbeat, failover and quorum work in Windows and Linux clusters, and how SafeKit avoids split brain without a quorum disk or a third server."
category: "best-practises"
lang: "en"
topics: "What are the different scenarios in case of network isolation in a cluster?, How do heartbeats and failover work in a Windows or Linux cluster?, Split brain and quorum with servers in two remote computer rooms, Simple cluster quorum with the SafeKit split brain checker"
hashpart: "isolation, how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster, split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms, simple-cluster-quorum-with-the-safekit-split-brain-checker"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Heartbeat, failover and quorum in a cluster {#heartbeat-failover-and-quorum-in-a-cluster}


{{%  insert-safekit-network-isolation-en  %}}
 

## How do heartbeats and failover work in a Windows or Linux cluster? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### What is a heartbeat? {#what-is-a-heartbeat}

The basic mechanism to synchronize two servers and to detect server failures is the **heartbeat**. It is a monitoring data flow on a network shared by the two servers.

The SafeKit software supports several heartbeats. Each network shared by the two servers can carry one heartbeat.

The heartbeat mechanism is used to implement Windows and Linux clusters. It is integrated in the SafeKit mirror cluster with real-time file replication and failover.

### SafeKit heartbeats {#safekit-heartbeats}

In normal operation, the two servers exchange their states through the heartbeat channels. These states are PRIM, SECOND and the resource states. They also synchronize the start and stop procedures of the application.

For example, during a scheduled failover, the stop script of the application is first executed on the primary server. Then the start script is executed on the secondary server. Thus, the replicated data on the secondary server are in a safe state. This state corresponds to a clean stop of the application.

### What happens when all heartbeats are lost? {#loss-of-all-heartbeats}

When a server loses all the heartbeats, it considers that the other server is down. It then goes to the ALONE state.

If the server in the SECOND state goes to the ALONE state, the application is restarted on this server. This is an application failover.

Two heartbeat channels on two different networks are recommended, but not mandatory. With two networks, a network failure is not confused with a server failure.

## Split brain and quorum with servers in two remote computer rooms {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Heartbeat, failover and quorum in a Windows or Linux cluster](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Two remote computer rooms {#remote-computer-rooms}

With two servers in two remote computer rooms, a high availability cluster can protect a critical application.

Thus, the application remains available even if a disaster destroys a whole computer room.

### Split brain {#split-brain}

If the network between the two computer rooms is isolated, all the heartbeats are lost. This is the split brain problem: both servers start the critical application.

### Complexity of usual solutions {#complexity-of-solutions}

Most often, a quorum is used to solve the split brain problem. The quorum uses a third quorum server or a special quorum disk. It avoids having two primary servers at the same time.

Unfortunately, these quorum devices add cost and complexity to the clustering architecture.

## Simple cluster quorum with the SafeKit split brain checker {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit split brain checker {#safekit-split-brain-checker}

With the SafeKit high availability software, the quorum of a Windows or Linux cluster requires no third quorum server and no quorum disk. A simple 🛠️ [split brain checker](</resources/safekit-user-guide-82/#check_splitbrain>) is enough to avoid running the application on both servers.

When all the heartbeats between the servers are lost, the split brain checker selects only one server to become the primary. The other server goes into the WAIT state. It waits until it receives the heartbeats of the other server again. Then it synchronizes the replicated data from the primary server and goes back to the secondary state.

### How does the split brain checker work? {#how-the-split-brain-checker-works}

The primary server is elected with a ping to an IP address, called the witness. The witness is usually a router that is always available. In case of network isolation, only the server that can reach the witness becomes primary in the ALONE state. The other server goes into the WAIT state.

The witness is not tested permanently. It is only tested when all the heartbeats are lost. If the witness is down at that time, the cluster goes into the WAIT-WAIT state. An administrator can then restart one of the servers as primary with the SafeKit web console.

### What happens without a split brain checker? {#what-happens-without-a-split-brain-checker}

In case of network isolation, both servers go to the ALONE state and run the critical application. The replicated directories are isolated. Each application works on its own data in its own directory.

When the network is reconnected, SafeKit chooses by default the server that was PRIM before the isolation as the new primary. The other server is forced to the SECOND state. All its data are resynchronized from the PRIM server.

Note: on Windows, a server can detect a duplicate IP address and remove its virtual IP address. In that case, a SafeKit checker forces a restart.


{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}
