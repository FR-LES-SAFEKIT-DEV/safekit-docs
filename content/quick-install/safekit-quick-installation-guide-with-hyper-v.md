---
title: "Hyper-V High Availability with SafeKit: Install the hyperv.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-hyper-v"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "Learn about configuring hyperv.safe for an active/active Hyper-V cluster with SafeKit. Achieve High Availability at the VM level with a 2-node shared-nothing architecture. Synchronously replicate several VMs across nodes for automatic failover without the cost of a SAN or shared storage."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Hyper-V, SafeKit High Availability Limitations, Overview of the SafeKit / Hyper-V solution, Installation of the SafeKit / Hyper-V solution on Windows (hyperv.safe), Step by step configuration of the SafeKit / Hyper-V solution, Demonstration of the SafeKit / Hyper-V solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Hyper-V High Availability with SafeKit: Install the hyperv.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Hyper-V" mod="hyperv" %}}
 

## Overview of the SafeKit / Hyper-V solution

The solution is described here: **💡[Simple Hyper-V High Availability Without Shared Storage (SAN)](</solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installation of the SafeKit / Hyper-V solution on Windows (hyperv.safe)

### Prerequisites

  * Hyper-V role installed on 2 Windows nodes (embedded for free in all Windows versions including Windows for PC).
  * Critical applications installed inside one or more virtual machines.
  * Maximum 32 virtual machines per Hyper-V host.
  * Total replicated data limited to a few terabytes — beyond this, resynchronization time becomes significant.
  * Minimum 1Gb/s interconnect between nodes (10Gb/s recommended for faster resynchronization).
  * IP failover requires both nodes on the same LAN or extended LAN (L2) — routed L3 networks not supported (except with 🛠️ [cloud load balancers](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-en %}}
 


{{%  insert-safekit-installation-package-windows-en app="Hyper-V" mod="hyperv" %}}
 


{{%  insert-safekit-82-installation-module-windows-en app="Hyper-V" mod="hyperv" %}}
 

## Step by step configuration of the SafeKit / Hyper-V solution


{{%  insert-safekit-82-hyper-v-configuration-en app="Hyper-V" mod="hyperv" %}}
 

## Demonstration of the SafeKit / Hyper-V solution


{{%  insert-safekit-hyperv-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}