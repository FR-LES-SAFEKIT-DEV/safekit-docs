---
title: "Install SafeKit for cloud load balancing (farm.safe)"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Step-by-step guide: install the SafeKit farm.safe module in any cloud, where it checks application health for the cloud load balancer and handles failover."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Cloud, SafeKit High Availability Limitations, Overview of the SafeKit / Cloud solution, Installation of the SafeKit / Cloud solution on Windows and Linux (farm.safe), Step by step configuration of the SafeKit / Cloud solution, Demonstration of the SafeKit farm solution"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--cloud-solution, installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe, step-by-step-configuration-of-the-safekit--cloud-solution, demonstration-of-the-safekit-farm-solution"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Install SafeKit for cloud load balancing (farm.safe) {#install-safekit-for-cloud-load-balancing-farmsafe}


{{%  insert-safekit-farm-guide-en app="Cloud" mod="farm"  %}}
 

## Overview of the SafeKit / Cloud solution {#overview-of-the-safekit--cloud-solution}

The solution is described here: **💡[SafeKit: Cloud Load Balancing & Application High Availability <span class="notranslate farm-term" translate="no">Farm</span> Cluster](</solutions/cloud-load-balancing-cluster-failover/>)**.

## Installation of the SafeKit / Cloud solution on Windows and Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configuration of the Cloud load balancer {#configuration-of-the-cloud-load-balancer}

The load balancer must be configured with a virtual IP address.  
And the load balancer must be configured to periodically send health packets to nodes.  
For that, SafeKit provides a health check which runs inside the nodes and which

  * returns OK when the <span class="notranslate farm-term" translate="no">farm</span> module state is UP (green)
  * returns NOT FOUND in all other states


You must configure the Cloud load balancer with:

  * HTTP protocol
  * port 9010, the SafeKit web server port
  * URL /var/modules/farm/ready.txt (if <span class="notranslate farm-term" translate="no">farm</span> is the module name that you will deploy later)


⚠️ Do not configure a virtual IP address and load balancing rules at step 4 in the step by step configuration below. The virtual IP address and load balancing rules are already set in the Cloud load balancer. Setting a virtual IP and load balancing rules at step 4 is useful for on-premise configuration only.

### Configuration of the Cloud network security {#configuration-of-the-cloud-network-security}

The network security must be configured to enable communications for the following protocols and ports:

  * UDP - 4800 for the safeadmin service (between SafeKit nodes)
  * UDP - 4803 for the heartbeats inside the <span class="notranslate farm-term" translate="no">farm</span> module (between SafeKit nodes)
  * TCP – 9010 for the load-balancer health check and for the SafeKit web console running in the http mode
  * TCP – 9001 to configure the https mode for the console
  * TCP – 9453 for the SafeKit web console running in https mode



{{%  insert-safekit-installation-package-windows-en app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-en app="" mod="mirror"  %}}
 

Note: the generic **farm.safe** module that you are going to configure is delivered inside the package.

## Step by step configuration of the SafeKit / Cloud solution {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-en app="" mod="farm"  %}}
 

## Demonstration of the SafeKit <span class="notranslate farm-term" translate="no">farm</span> solution {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-en  %}}

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}