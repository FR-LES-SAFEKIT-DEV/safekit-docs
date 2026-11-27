---
title: "PostgreSQL High Availability with SafeKit: Install the postgresql.safe Module for Failover"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Step-by-step guide: install the SafeKit postgresql.safe module for real-time replication and automatic failover of PostgreSQL on Windows or Linux."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for PostgreSQL, SafeKit High Availability Limitations, Overview of the SafeKit / PostgreSQL solution, Installation of the SafeKit / PostgreSQL solution on Windows and Linux (postgresql.safe), Step by step configuration of the SafeKit / PostgreSQL solution, Demonstration of the SafeKit mirror solution"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--postgresql-solution, installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe, step-by-step-configuration-of-the-safekit--postgresql-solution, demonstration-of-the-safekit-mirror-solution"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# PostgreSQL High Availability with SafeKit: Install the postgresql.safe Module for Failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-en app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Overview of the SafeKit / PostgreSQL solution {#overview-of-the-safekit--postgresql-solution}

The solution is described here: **💡[The Simplest PostgreSQL High Availability: 2-Node Synchronous Replication & Failover](</solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installation of the SafeKit / PostgreSQL solution on Windows and Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Prerequisites {#prerequisites}

  * You need PostgreSQL installed on 2 nodes (virtual machines or physical servers).



{{%  insert-safekit-installation-package-windows-en app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-en app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-en app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-en app="PostgreSQL" mod="postgresql"  %}}
 

## Step by step configuration of the SafeKit / PostgreSQL solution {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-en app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstration of the SafeKit mirror solution {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-en  %}}

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}