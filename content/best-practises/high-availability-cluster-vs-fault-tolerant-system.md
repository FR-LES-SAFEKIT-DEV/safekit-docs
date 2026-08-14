---
title: "HA Cluster vs. Fault Tolerant System: Choosing the Right Redundancy Strategy"
slug: "high-availability-cluster-vs-fault-tolerant-system"
canonical: "https://safekit.eviden.com/best-practises/high-availability-cluster-vs-fault-tolerant-system/"
description: "HA Cluster vs. Fault Tolerant System: Choosing the Right Redundancy Strategy What is the difference between high availability and fault tolerance?"
category: "best-practises"
lang: "en"
topics: "What is the difference between high availability and fault tolerance?, Pros and cons of high availability and fault tolerance, 🔍 SafeKit High Availability Navigation Hub"
---

# HA Cluster vs. Fault Tolerant System: Choosing the Right Redundancy Strategy

## What is the difference between high availability and fault tolerance?

### Overview

This article explores the pros and cons of a high availability cluster versus a fault tolerant system by looking at hardware constraints, software failures, RTO, RPO...

The following comparative tables explain in detail the difference between a fault tolerant system and SafeKit, a software high availability cluster.

### What is high availability?

A high availability cluster is based on two servers with restart of the critical application in the event of hardware or software failures. There are 2 types of clusters: hardware clusters and software clusters.

Hardware clusters are based on shared disks resulting in dependencies between servers and their connections to shared disk arrays.

Software clusters like SafeKit are based on real-time data replication and are hardware-agnostic: they can be deployed on physical or virtual servers or in the cloud.

### What is fault tolerance?

A fault tolerant system relies on either specialized hardware or specialized hypervisor to detect a hardware failure and instantly switch to a redundant hardware component without application restart.

Fault-tolerant systems only deal with hardware failures and not software failures, by far the most common reason for system downtime.

## Pros and cons of high availability and fault tolerance

When protecting critical applications against failures, two main approaches exist: **software high availability clustering** and **fault-tolerant systems**. Each approach offers different trade-offs in terms of cost, flexibility, recovery time, and hardware requirements. Understanding these differences helps choose the right solution for your specific needs.

**Comparison of software high availability clustering vs fault-tolerant systems**

Criteria | Software high availability cluster | Fault-tolerant system  
---|---|---  
**Product** | [SafeKit on Windows and Linux](</>) | Fault tolerant products  
**Hardware / hypervisor** | No dedicated server, no dedicated hypervisor. Works with the standard and free hypervisor of Windows, Hyper-V, included in Windows kernel for servers and PCs. Works with the standard and free hypervisor KVM (Kernel-based Virtual Machine) integrated in mainline Linux kernel. Each [server can be the failover server of the other one for multiple applications](</architectures/active-active-cluster-real-time-replication/>). | Dedicated hardware or dedicated hypervisor. The secondary server is dedicated to the execution of the same application synchronized at the instruction level.  
**Software failure** | Software failure supported with restart in another OS environment. | Software exception on both servers at the same time on the same OS.  
**Smooth upgrade/fix of application and OS** | Yes — Smooth upgrade/fix of application and OS possible server by server. N and N+1 versions can coexist. | No — Same application and OS image on both servers.  
**RTO/RPO** | The recovery time with SafeKit ([RTO](</best-practises/what-is-rpo-and-rto-with-examples/>)) depends on the time to detect and to restart the application (about 1 minute). The data loss with SafeKit ([RPO](</best-practises/what-is-rpo-and-rto-with-examples/>)) is zero as the replication is synchronous. | The recovery time (RTO) of a fault tolerant system is zero. The application is not restarted in case of failure and continues its execution on the secondary server. The data loss (RPO) is also zero.  
**Flexibility** | Can run on any type of server with standard Windows and Linux OS | Depends on specific hardware or on specific hypervisors  
**Suited for** | [Software editors which want to add a simple high availability option to their application](</use-cases/application-clustering-software/>) | Environment where hardware failure is the main concern  
  
**In summary** , software high availability with SafeKit provides a cost-effective, flexible solution that runs on standard hardware and supports rolling upgrades, with near-zero downtime (RTO ~1 minute) and zero data loss. Fault-tolerant systems offer instant failover (RTO = 0) but require dedicated hardware and lack flexibility for independent software updates.


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}