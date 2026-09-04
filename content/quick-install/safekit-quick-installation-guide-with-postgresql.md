---
title: "PostgreSQL High Availability with SafeKit: Install the postgresql.safe Module for Failover - SafeKit HA"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Deploy the postgresql.safe module for SafeKit to enable synchronous real-time replication and automatic failover of PostgreSQL on Windows and Linux. This guide walks you through setting up a 2-node SANless cluster for critical applications without shared storage."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for PostgreSQL, SafeKit High Availability Limitations, Overview of the SafeKit / PostgreSQL solution, Installation of the SafeKit / PostgreSQL solution on Windows and Linux (postgresql.safe), Step by step configuration of the SafeKit / PostgreSQL solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# PostgreSQL High Availability with SafeKit: Install the postgresql.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Overview of the SafeKit / PostgreSQL solution

The solution is described here: **💡[The Simplest PostgreSQL High Availability: 2-Node Synchronous Replication & Failover](</solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installation of the SafeKit / PostgreSQL solution on Windows and Linux (postgresql.safe)

### Prerequisites

  * You need PostgreSQL installed on 2 nodes (virtual machines or physical servers).



{{%  insert-safekit-installation-package-windows-en app="PostgreSQL" mod="postgresql"  %}}
 


{{%  insert-safekit-82-installation-module-windows-en app="PostgreSQL" mod="postgresql"  %}}
 


{{%  insert-safekit-installation-package-linux-en app="PostgreSQL" mod="postgresql"  %}}
 


{{%  insert-safekit-82-installation-module-linux-en app="PostgreSQL" mod="postgresql"  %}}
 

## Step by step configuration of the SafeKit / PostgreSQL solution


{{%  insert-safekit-82-configuration-en app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en  %}}
 


{{%  insert-safekit-hub-en  %}}
 


{{%  insert-safekit-4-buttons-en  %}}