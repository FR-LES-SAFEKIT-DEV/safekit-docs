---
title: "Install SafeKit for IIS load balancing"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Step-by-step guide: install the SafeKit iis_farm.safe module on Windows for network load balancing and failover of IIS web servers on a virtual IP."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for IIS, SafeKit High Availability Limitations, Overview of the SafeKit / IIS solution, Installation of the SafeKit / IIS solution on Windows (iisfarm.safe), Step by step configuration of the SafeKit / IIS solution, Demonstration of the SafeKit farm solution"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--iis-solution, installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe, step-by-step-configuration-of-the-safekit--iis-solution, demonstration-of-the-safekit-farm-solution"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Install SafeKit for IIS load balancing {#install-safekit-for-iis-load-balancing}


{{%  insert-safekit-farm-guide-en app="IIS" mod="iis_farm"  %}}
 

## Overview of the SafeKit / IIS solution {#overview-of-the-safekit--iis-solution}

The solution is described here: **💡[SafeKit: All-in-One IIS Load Balancing & High Availability Software](</solutions/iis-load-balancing-failover/>)**.

## Installation of the SafeKit / IIS solution on Windows (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Prerequisites {#prerequisites}

  * You need IIS installed on 2 nodes or more (virtual machines or physical servers).



{{%  insert-safekit-installation-package-windows-en app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-en app="IIS" mod="iis_farm"  %}}
 

## Step by step configuration of the SafeKit / IIS solution {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-en app="IIS" mod="iis_farm"  %}}
 

## Demonstration of the SafeKit <span class="notranslate farm-term" translate="no">farm</span> solution {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-en  %}}

{{%  insert-safekit-hub-en app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-en  %}}