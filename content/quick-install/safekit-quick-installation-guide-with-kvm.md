---
title: "KVM High Availability with SafeKit: Install the kvm.safe Module for Failover"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Step-by-step guide: install the SafeKit kvm.safe module for VM-level high availability, with replication and failover of KVM virtual machines on Linux."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for KVM, SafeKit High Availability Limitations, Overview of the SafeKit / KVM solution, Installation of the SafeKit / KVM solution on Linux (kvm.safe), Step by step configuration of the SafeKit / KVM solution, Demonstration of a VM-level high availability solution, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# KVM High Availability with SafeKit: Install the kvm.safe Module for Failover {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-en app="KVM" mod="kvm"  %}}
 

## Overview of the SafeKit / KVM solution {#overview-of-the-safekit--kvm-solution}

The solution is described here: **💡[Simple Linux KVM High Availability without Shared Storage](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installation of the SafeKit / KVM solution on Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Prerequisites {#prerequisites}

  * KVM installed on 2 Linux nodes.
  * Critical applications installed inside one or more virtual machines.
  * Maximum 32 virtual machines per KVM host.
  * Total replicated data limited to a few terabytes — beyond this, resynchronization time becomes significant.
  * Minimum 1Gb/s interconnect between nodes (10Gb/s recommended for faster resynchronization).
  * IP failover requires both nodes on the same LAN or extended LAN (L2) — routed L3 networks not supported (except with 🛠️ [cloud load balancers](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-en app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-en app="KVM" mod="kvm"  %}}
 

## Step by step configuration of the SafeKit / KVM solution {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-en app="KVM" mod="kvm"  %}}
 

## Demonstration of a VM-level high availability solution {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-en  %}}

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}