---
title: "Business Continuity and Disaster Recovery Software for 2-Node Clusters with SafeKit"
canonical: "https://safekit.eviden.com/use-cases/business-continuity-and-disaster-recovery-software/"
description: "SafeKit is business continuity and disaster recovery software. It implements a simple high availability solution between two remote server rooms. Achieve 24/7 uptime with SafeKit, the easiest-to-use business continuity and disaster recovery software. Eliminate expensive SANs and complex IT skills with 2-node synchronous replication, automatic failover, and load balancing for Windows and Linux. Zero data loss (RPO=0) for critical applications in any cloud or on-premises environment."
category: "use-cases"
lang: "en"
topics: "Business continuity and disaster recovery software, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2023/02/remote-datacenters.png"
---

# Business Continuity and Disaster Recovery Software for 2-Node Clusters with SafeKit {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## Business continuity and disaster recovery software {#business-continuity-and-disaster-recovery-software}

### Reasons to choose the SafeKit software for business continuity and disaster recovery {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![Simple business continuity and disaster recovery software with SafeKit](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


The configuration is the same whether you deploy a SafeKit cluster in one server room or across two remote server rooms. The only requirement is an extended LAN or a stretched VLAN between the remote sites.

### How to implement a simple high availability solution between two remote server rooms? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

With SafeKit, you can easily deploy the mirror module and the <span class="notranslate farm-term" translate="no">farm</span> module on servers in remote server rooms. No special cluster configuration is needed. SafeKit therefore combines business continuity and disaster recovery in a single, simple architecture. SafeKit also handles network isolation without a third server or a special quorum disk. Read more about [split brain management](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Business continuity vs backup solutions {#business-continuity-vs-backup-solutions}

Business continuity and backup solutions address different failure scenarios. They are complementary, not interchangeable. SafeKit high availability clustering provides business continuity. It keeps applications running with minimal interruption when a server or an application fails, thanks to real-time replication and automatic failover. Backup solutions protect against broader losses, such as ransomware attacks or operator errors. They usually rely on offsite copies of data that you restore afterward. Recovery takes longer and there is no automatic failover.

Read more about [combining SafeKit high availability with disaster recovery backups](</best-practises/high-availability-disaster-recovery-hadr/>).


{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}