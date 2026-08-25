---
title: "MariaDB High Availability with SafeKit: Install the mysql.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-mariadb"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Deploy the mysql.safe module for SafeKit to enable synchronous real-time replication and automatic failover of MariaDB on Windows and Linux. This guide walks you through setting up a 2-node SANless cluster for critical applications without shared storage."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for MariaDB, SafeKit High Availability Limitations, Overview of the SafeKit / MariaDB solution, Installation of the SafeKit / MariaDB solution on Windows and Linux (mysql.safe), Step by step configuration of the SafeKit / MariaDB solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# MariaDB High Availability with SafeKit: Install the mysql.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="MariaDB" mod="mysql" %}}
 

## Overview of the SafeKit / MariaDB solution

The solution is described here: **💡[The Simplest MariaDB High Availability: 2-Node Synchronous Replication & Failover](</solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Installation of the SafeKit / MariaDB solution on Windows and Linux (mysql.safe)

### Prerequisites

  * You need MariaDB installed on 2 nodes (virtual machines or physical servers).



{{%  insert-safekit-installation-package-windows-en app="MariaDB" mod="mysql" %}}
 


{{%  insert-safekit-82-installation-module-windows-en app="MariaDB" mod="mysql" %}}
 


{{%  insert-safekit-installation-package-linux-en app="MariaDB" mod="mysql" %}}
 


{{%  insert-safekit-82-installation-module-linux-en app="MariaDB" mod="mysql" %}}
 

## Step by step configuration of the SafeKit / MariaDB solution


{{%  insert-safekit-82-configuration-en app="MariaDB" mod="mysql" %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}