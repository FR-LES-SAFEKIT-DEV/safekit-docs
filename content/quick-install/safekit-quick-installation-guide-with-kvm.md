---
title: "KVM High Availability with SafeKit: Install the kvm.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-kvm"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "SafeKit Video: Virtual Machine-Level Clustering with Hyper-V (5:15) In this video, discover how SafeKit implements high availability for Hyper-V without the complexity of a SAN. Learn to configure virtual machine replication across two nodes to ensure seamless failover for your critical virtualized workloads. Although this demonstration uses Hyper-V on Windows, the solution works identically with […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for KVM, SafeKit High Availability Limitations, Overview of the SafeKit / KVM solution, Installation of the SafeKit / KVM solution on Linux (kvm.safe), Step by step configuration of the SafeKit / KVM solution, Demonstration of a VM-level high availability solution, 🔍 SafeKit High Availability Navigation Hub"
---

# KVM High Availability with SafeKit: Install the kvm.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="KVM" mod="kvm" %}}
 

## Overview of the SafeKit / KVM solution

The solution is described here: **[Simple Linux KVM High Availability without Shared Storage](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installation of the SafeKit / KVM solution on Linux (kvm.safe)

### Prerequisites

  * KVM installed on 2 Linux nodes.
  * Critical applications installed inside one or more virtual machines.
  * Maximum 32 virtual machines per KVM host.
  * Total replicated data limited to a few terabytes — beyond this, resynchronization time becomes significant.
  * Minimum 1Gb/s interconnect between nodes (10Gb/s recommended for faster resynchronization).
  * IP failover requires both nodes on the same LAN or extended LAN (L2) — routed L3 networks not supported (except with [cloud load balancers](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-en app="KVM" mod="kvm" %}}
 


{{%  insert-safekit-82-installation-module-linux-en app="KVM" mod="kvm" %}}
 

## Step by step configuration of the SafeKit / KVM solution


{{%  insert-safekit-82-kvm-configuration-en app="KVM" mod="kvm" %}}
 

## Demonstration of a VM-level high availability solution


{{%  insert-safekit-hyperv-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}