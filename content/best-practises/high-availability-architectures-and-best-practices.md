---
title: "High Availability Architectures & Software Clustering Best Practices"
slug: "high-availability-architectures-and-best-practices"
canonical: "https://safekit.eviden.com/best-practises/high-availability-architectures-and-best-practices/"
description: "High Availability Architectures & Software Clustering Best Practices What are the high availability architectures and the best practices?"
category: "best-practises"
lang: "en"
topics: "What are the high availability architectures and the best practices?, Comparative tables on high availability architectures and best practices, 🔍 SafeKit High Availability Navigation Hub"
---

# High Availability Architectures & Software Clustering Best Practices

## What are the high availability architectures and the best practices?

### Overview

This article explores the different high availability architectures and the best practices by given the pros and cons of each architecture.


<img src="/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png" width="400" alt="High availability architectures and best practices">


The following comparative tables explain in detail the SafeKit high availability architecture and its best practices (SafeKit is a software high availability product).

### What are the high availability architectures?

There are two types of [high availability](<https://www.techtarget.com/searchdatacenter/definition/high-availability>) architectures: those for backend applications such as databases and those for frontend applications such as web services.

High availability architectures for backend are based on 2 servers sharing or replicating data with an automatic application failover in the event of hardware of software failures.

High availability architectures for frontend are based on a farm of servers (2 servers or more). The load balancing is made by hardware or software and distributes the TCP sessions to the available servers in the farm.

Moreover, you have to choose between high availability at the application level or at the virtual machine level.

### What are the best practices?

This article explores the best practices in high availability architectures by comparing:

  * [software vs hardware clustering](</best-practises/clustering-software-vs-hardware-clustering/>),
  * [shared nothing vs shared disk architecture](</best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [application vs virtual machine high availability](</best-practises/vm-ha-vs-application-ha/>),
  * [high availability vs fault tolerance](</best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [synchronous vs asynchronous replication](</best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [file vs disk replication](</best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [data replication techniques](</best-practises/data-replication-techniques/>),
  * [RPO and RTO with examples](</best-practises/what-is-rpo-and-rto-with-examples/>),
  * [split brain ans quorum](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [virtual IP addresses](</best-practises/how-a-virtual-ip-address-works/>).


## Comparative tables on high availability architectures and best practices


{{%  insert-safekit-software-vs-hardware-table-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}