---
title: "Business Continuity and Disaster Recovery Software for 2-Node Clusters with SafeKit"
slug: "business-continuity-and-disaster-recovery-software"
canonical: "https://safekit.eviden.com/use-cases/business-continuity-and-disaster-recovery-software/"
description: "Business Continuity and Disaster Recovery Software for 2-Node Clusters with SafeKit Business continuity and disaster recovery software"
category: "use-cases"
lang: "en"
topics: "Business continuity and disaster recovery software, 🔍 SafeKit High Availability Navigation Hub"
---

# Business Continuity and Disaster Recovery Software for 2-Node Clusters with SafeKit

## Business continuity and disaster recovery software

### Reasons to choose the SafeKit software for business continuity and disaster recovery


<img src="/wp-content/uploads/2023/02/remote-datacenters.png" width="300" alt="Simple business continuity and disaster recovery software with SafeKit">


There is no configuration difference when deploying a SafeKit cluster in the same computer room or across remote computer rooms, provided an extended LAN or a stretched VLAN is available between the remote sites.

### How to implement a simple high availability solution between two remote computer rooms?

SafeKit mirror and farm modules can be deployed easily on servers located in remote computer rooms, without any special cluster configuration. This means SafeKit combines business continuity and disaster recovery within a single, simple architecture. SafeKit also manages [split brain](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) in the event of network isolation, without requiring a third server or a special quorum disk.

### Business continuity vs backup solutions

Business continuity and backup solutions address different failure scenarios and are complementary rather than interchangeable. Business continuity, provided by SafeKit's high-availability clustering, keeps applications running with minimal interruption in the event of a server or application failure, through real-time replication and automatic failover. Backup solutions protect against a broader loss, such as ransomware attacks or operator errors, and typically rely on offsite copies of data that can be restored afterward, with longer recovery times but without automatic failover.

Learn more in [Combining SafeKit High Availability with Disaster Recovery Backups](</best-practises/high-availability-disaster-recovery-hadr/>).


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}