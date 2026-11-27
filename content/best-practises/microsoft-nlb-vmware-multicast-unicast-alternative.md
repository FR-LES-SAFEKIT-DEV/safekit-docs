---
title: "Microsoft NLB VMware Alternative: Multicast and Unicast Issues Solved"
canonical: "https://safekit.eviden.com/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "An alternative to Microsoft NLB on VMware: SafeKit farm clusters balance load and fail over without multicast, static ARP entries or MAC spoofing."
category: "best-practises"
lang: "en"
topics: "Microsoft NLB multicast mode, Microsoft NLB unicast mode, Alternative with SafeKit"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Microsoft NLB VMware Alternative: Multicast and Unicast Issues Solved {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB multicast mode {#microsoft-nlb-multicast-mode}

In multicast mode, you must manually configure static ARP resolution on the switch or router. This is required for each port connected to the cluster. For details, see the VMware knowledge base article [Network Load Balancing (NLB) multicast mode configuration](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). In an unknown network environment, deploying Microsoft NLB in multicast mode can be complex and demanding.

## Microsoft NLB unicast mode {#microsoft-nlb-unicast-mode}

In unicast mode, you must configure the ESXi/ESX host so that it does not send RARP packets when one of its virtual machines powers on. Otherwise, Microsoft NLB does not work properly with VMware. For details, see the VMware knowledge base article [Microsoft NLB not working properly in Unicast Mode](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternative with SafeKit {#alternative-with-safekit}

SafeKit uses a [virtual IP address](</best-practises/how-a-virtual-ip-address-works/>) that requires no special network configuration. Its network load balancing runs in any environment. This is important when you deploy the solution in an unknown infrastructure: unknown switches or routers, physical servers or virtual servers.


{{%  insert-safekit-farm-en app="Windows"  %}}

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}