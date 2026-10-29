---
title: "AWS Network Load Balancing & Failover: Install the SafeKit farm.safe Module"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/"
description: "Enhance AWS Network Load Balancing with SafeKit's intelligent application monitoring. The farm.safe module provides a dedicated health check for the AWS load balancer, enabling seamless HA at the application level. Achieve automatic self-healing and failover for mission-critical applications."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for AWS, SafeKit High Availability Limitations, Overview of the SafeKit / AWS solution, Installation of the SafeKit / AWS solution on Windows and Linux (farm.safe), Step by step configuration of the SafeKit / AWS solution, Demonstration of the SafeKit farm solution, 🔍 SafeKit High Availability Navigation Hub"
---

# AWS Network Load Balancing & Failover: Install the SafeKit farm.safe Module {#aws-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-en app="AWS" mod="farm"  %}}
 

## Overview of the SafeKit / AWS solution {#overview-of-the-safekit--aws-solution}

The solution is described here: **💡[SafeKit: Amazon AWS Load Balancing & Application High Availability <span class="notranslate farm-term" translate="no">Farm</span> Cluster](</solutions/aws-load-balancing-cluster-failover/>)**.

## Installation of the SafeKit / AWS solution on Windows and Linux (farm.safe) {#installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe}

### Configuration of the Amazon AWS load balancer {#configuration-of-the-amazon-aws-load-balancer}

The load balancer must be configured with a virtual IP address.  
And the load balancer must be configured to periodically send health packets to nodes.  
For that, SafeKit provides a health check which runs inside the nodes and which

  * returns OK when the <span class="notranslate farm-term" translate="no">farm</span> module state is UP (green)
  * returns NOT FOUND in all other states


You must configure the Amazon AWS load balancer with:

  * HTTP protocol
  * port 9010, the SafeKit web server port
  * URL /var/modules/farm/ready.txt (if <span class="notranslate farm-term" translate="no">farm</span> is the module name that you will deploy later)


For more information, see [the configuration of the Amazon AWS load balancer](<https://aws.amazon.com/elasticloadbalancing/>).


⚠️ Do not configure a virtual IP address and load balancing rules at step 4 in the step by step configuration below. The virtual IP address and load balancing rules are already set in the Amazon AWS load balancer. Setting a virtual IP and load balancing rules at step 4 is useful for on-premise configuration only.

### Configuration of the Amazon AWS network security {#configuration-of-the-amazon-aws-network-security}

The network security must be configured to enable communications for the following protocols and ports:

  * UDP - 4800 for the safeadmin service (between SafeKit nodes)
  * UDP - 4803 for the heartbeat inside the <span class="notranslate farm-term" translate="no">farm</span> module (between SafeKit nodes)
  * TCP – 9010 for the load-balancer health check and for the SafeKit web console running in the http mode
  * TCP – 9001 to configure the https mode for the console
  * TCP – 9453 for the SafeKit web console running in https mode



{{%  insert-safekit-installation-package-windows-en app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-en app="" mod="mirror"  %}}
 

Note: the generic **farm.safe** module that you are going to configure is delivered inside the package.

## Step by step configuration of the SafeKit / AWS solution {#step-by-step-configuration-of-the-safekit--aws-solution}


{{%  insert-safekit-82-farm-configuration-en app="" mod="farm"  %}}
 

## Demonstration of the SafeKit <span class="notranslate farm-term" translate="no">farm</span> solution {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-en  %}}

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}