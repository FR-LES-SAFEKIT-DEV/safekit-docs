---
title: "Linux High Availability with SafeKit: Install the mirror.safe Module for Failover - SafeKit HA"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Deploy the mirror.safe module for SafeKit to enable synchronous real-time replication and automatic failover on Linux. This guide walks you through setting up a 2-node SANless cluster for critical Linux applications without shared storage."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Linux, SafeKit High Availability Limitations, Overview of the SafeKit / Linux solution, Installation of the SafeKit / Linux solution (mirror.safe), Step by step configuration of the SafeKit / Linux solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Linux High Availability with SafeKit: Install the mirror.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Linux" mod="mirror" %}}
 

## Overview of the SafeKit / Linux solution

The solutions is described here: **💡[The Simplest Linux High Availability: 2-Node Synchronous Replication & Failover](</solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## Installation of the SafeKit / Linux solution (mirror.safe)

### Prerequisites

  * You need the application that you want to restart in SafeKit installed on 2 nodes (virtual machines or physical servers).



{{%  insert-safekit-installation-package-linux-en mod="mirror" %}}
 

Note: the generic **mirror.safe** module that you are going to configure is delivered inside the package.

## Step by step configuration of the SafeKit / Linux solution


{{%  insert-safekit-82-configuration-en app="Linux" mod="mirror" %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en %}}
 


{{%  insert-safekit-hub-en app="Microsoft SQL Server mirror" %}}
 


{{%  insert-safekit-4-buttons-en %}}