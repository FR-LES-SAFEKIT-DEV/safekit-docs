---
title: "Heartbeat, Failover and Quorum in Windows and Linux Clusters"
slug: "heartbeat-failover-quorum-windows-linux-cluster"
canonical: "https://safekit.eviden.com/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Heartbeat, Failover and Quorum in Windows and Linux Clusters"
category: "best-practises"
lang: "en"
topics: "What are the different scenarios in case of network isolation in a cluster?, How heartbeats and failover work in a Windows or Linux cluster?, Split brain problem and quorum when servers are in two remote computer rooms, Simple cluster quorum with the SafeKit split brain checker, 🔍 SafeKit High Availability Navigation Hub"
---

# Heartbeat, Failover and Quorum in Windows and Linux Clusters


{{%  insert-safekit-network-isolation-en %}}
 

## How heartbeats and failover work in a Windows or Linux cluster?

### What is a heartbeat?

The basic mechanism for synchronizing two servers and detecting server failures is the **heartbeat** , which is a monitoring data flow on a network shared by a pair of servers.

The SafeKit software supports as many heartbeats as there are networks shared by two servers. 

The heartbeat mechanism is used to implement Windows and Linux clusters. It is integrated within the SafeKit mirror cluster with real-time file replication and failover.

### SafeKit heartbeats

In normal operation, the two servers exchange their states (PRIM, SECOND, the resource states) through the heartbeat channels and synchronize their application start and stop procedures.

In particular, in case of a scheduled failover, the stop script which stops the application is first executed on the primary server, before executing the start script on the secondary server. Thus, replicated data on the secondary server are in a safe state corresponding to a clean stop of the application.

### Loss of all heartbeats

When all heartbeats are lost on one server, this server considers the other server to be down and transitions to the ALONE state.

If it is the SECOND server which goes to the ALONE state, then there is an application failover with restart of the application on the secondary server.

Although not mandatory, it is better to have two heartbeat channels on two different networks for synchronizing the two servers in order to separate the network failure case from the server failure one.

## Split brain problem and quorum when servers are in two remote computer rooms


<img src="/wp-content/uploads/2023/02/quorum-with-remote-sites.png" width="200" alt="Heartbeat, failover and quorum in a Windows or Linux cluster">


### Remote computer rooms

A high availability cluster securing a critical application can be implemented with two servers in two geographically remote computer rooms.

Thus, the solution supports the disaster of a full room.

### Split brain

In situation of a network isolation between both computer rooms, all heartbeats are lost and the split brain problem arises.

Both servers start the critical application.

### Complexity of solutions

Mostoften, to solve split brain, quorum is implemented with a third quorum server or a special quorum disk to avoid the double masters. 

Unfortunately these new quorum devices add cost and complexity to the overall clustering architecture.

## Simple cluster quorum with the SafeKit split brain checker

### SafeKit split brain checker

With the SafeKit high availability software, the quorum within a Windows or Linux cluster requires no third quorum server and no quorum disk. A [simple split brain checker](</resources/safekit-user-guide-82/#check_splitbrain>) is sufficient to avoid the double execution of an application.

On the the loss of all heartbeats between servers, the split brain checker selects only one server to become the primary. The other server goes into the WAIT state, until it receives the other server's heartbeats again. It then goes back to secondary after having synchronized replicated data from the primary server.

### How the split brain checker works?

The primary server election is based on the ping of an IP address, called the witness. The witness is typically a router that is always available. In case of network isolation, only the server with access to the witness will be primary ALONE, the other will go to WAIT.

The witness is not tested permanently but only when all heartbeats are lost. If at that time, the witness is down, the cluster goes into the WAIT-WAIT state and an administrator can choose to restart one of the servers as primary through the SafeKit web console.

### What happens without a split brain checker?

In case of network isolation, both servers will go to the ALONE state running the critical application. The replicated directories are isolated and each application is working on its own data in its own directory.

When the network is reconnected, SafeKit by default chooses the server which was PRIM before the isolation as the new primay and forces the other one as SECOND with a resynchronization of all its data from the PRIM.

Note: Windows can detect a duplicate IP address on one server and remove the virtual IP address on this server. SafeKit has a checker to force a restart in that case.


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}