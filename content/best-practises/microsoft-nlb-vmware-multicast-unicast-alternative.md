---
title: "Microsoft NLB VMware Alternative: Multicast and Unicast Issues Solved"
slug: "microsoft-nlb-vmware-multicast-unicast-alternative"
canonical: "https://safekit.eviden.com/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Microsoft NLB VMware Alternative: Multicast and Unicast Issues Solved Microsoft NLB multicast mode As explained in the knowledge base of  VMware on network load balancing (NLB) multicast mode configuration, you need to manually configure static ARP resolution at the switch or router for each port that connects to the cluster.  Deployment of the Microsoft NLB […]"
category: "best-practises"
lang: "en"
topics: "Microsoft NLB multicast mode, Microsoft NLB unicast mode, Alternative with SafeKit, How the SafeKit cluster in farm mode works with Windows?, 🔍 SafeKit High Availability Navigation Hub"
---

# Microsoft NLB VMware Alternative: Multicast and Unicast Issues Solved

## Microsoft NLB multicast mode

As explained in the knowledge base of [VMware on network load balancing (NLB) multicast mode configuration](<https://knowledge.broadcom.com/external/article?articleNumber=414968>), you need to manually configure static ARP resolution at the switch or router for each port that connects to the cluster. Deployment of the Microsoft NLB multicast mode in an unknown network environment can prove to be a complex and strenuous task.

## Microsoft NLB unicast mode

With Microsoft NLB unicast mode, you must configure the ESXi/ESX host to not send RARP packets when any of its virtual machines is powered on. That's why, [Microsoft NLB is not working properly in Unicast Mode with VMware](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternative with SafeKit

The [SafeKit virtual IP address](</best-practises/how-a-virtual-ip-address-works/>) configuration does not require any special network configuration and the network load balancing can run in any environment. An important feature when the solution must be deployed in an unknown infrastructure: unknown switches or routers, physical servers or virtual servers.


{{%  insert-safekit-farm-en app="Windows" %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}