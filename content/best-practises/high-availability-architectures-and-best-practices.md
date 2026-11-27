---
title: "High Availability Architectures & Software Clustering Best Practices"
canonical: "https://safekit.eviden.com/best-practises/high-availability-architectures-and-best-practices/"
description: "High availability architectures and best practices for application clustering: mirror and farm clusters, replication and failover, with SafeKit examples."
category: "best-practises"
lang: "en"
topics: "What are the high availability architectures and the best practices?, Comparative tables on high availability architectures and best practices"
hashpart: "what-are-the-high-availability-architectures-and-the-best-practices, comparative-tables-on-high-availability-architectures-and-best-practices"
image: "/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png"
schemaType: "TechArticle"
---

# High Availability Architectures & Software Clustering Best Practices {#high-availability-architectures--software-clustering-best-practices}

## What are the high availability architectures and the best practices? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Overview {#overview}

This article explores the different high availability architectures and the best practices by giving the pros and cons of each architecture.


![High availability architectures and best practices](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


The following comparative tables explain in detail the architecture and the best practices of SafeKit, a high availability software.

### What are the high availability architectures? {#what-are-the-high-availability-architectures}

There are two types of [high availability](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>) architectures: those for backend applications such as databases and those for frontend applications such as web services.

High availability architectures for backend are based on 2 servers. The servers share or replicate data. In case of hardware or software failure, an automatic failover restarts the application on the other server.

High availability architectures for frontend are based on a <span class="notranslate farm-term" translate="no">farm</span> of servers (2 servers or more). The load balancing is made by hardware or software and distributes the TCP sessions to the available servers in the farm.

Moreover, you have to choose between high availability at the application level or at the virtual machine level.

### What are the best practices? {#what-are-the-best-practices}

This article explores the best practices in high availability architectures by comparing:

  * [Software vs hardware clustering](</best-practises/clustering-software-vs-hardware-clustering/>)
  * [Shared nothing vs shared disk architecture](</best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>)
  * [Application vs virtual machine high availability](</best-practises/vm-ha-vs-application-ha/>)
  * [High availability vs fault tolerance](</best-practises/high-availability-cluster-vs-fault-tolerant-system/>)
  * [Synchronous vs asynchronous replication](</best-practises/synchronous-replication-vs-asynchronous-replication/>)
  * [File vs disk replication](</best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)
  * [Data replication techniques](</best-practises/data-replication-techniques/>)
  * [RPO and RTO with examples](</best-practises/what-is-rpo-and-rto-with-examples/>)
  * [Split brain and quorum](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)
  * [Virtual IP addresses](</best-practises/how-a-virtual-ip-address-works/>)


## Comparative tables on high availability architectures and best practices {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-en  %}}

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}