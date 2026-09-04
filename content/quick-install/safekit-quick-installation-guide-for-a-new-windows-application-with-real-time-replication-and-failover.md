---
title: "Windows High Availability with SafeKit: Install the mirror.safe Module for Failover - SafeKit HA"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Deploy the mirror.safe module for SafeKit to enable synchronous real-time replication and automatic failover on Windows. This guide walks you through setting up a 2-node SANless cluster for critical Windows applications without shared storage."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Windows, SafeKit High Availability Limitations, Overview of the SafeKit / Windows solution, Installation on the SafeKit / Windows solutions (mirror.safe), Step by step configuration of the SafeKit / Windows solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Windows High Availability with SafeKit: Install the mirror.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Windows" mod="mirror"  %}}
 

## Overview of the SafeKit / Windows solution

The solution is described here: **💡[The Simplest Windows High Availability: 2-Node Synchronous Replication & Failover](</solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Installation on the SafeKit / Windows solutions (mirror.safe)

### Prerequisites

  * You need the application that you want to restart in SafeKit installed on 2 nodes (virtual machines or physical servers).



{{%  insert-safekit-installation-package-windows-en app="" mod="mirror"  %}}
 

Note: the generic **mirror.safe** module that you are going to configure is delivered inside the package.

## Step by step configuration of the SafeKit / Windows solution


{{%  insert-safekit-82-configuration-en app="Windows" mod="mirror"  %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en  %}}
 


{{%  insert-safekit-hub-en app="Microsoft SQL Server mirror"  %}}
 


{{%  insert-safekit-4-buttons-en  %}}