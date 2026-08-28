---
title: "Upgrading an Application Protected by SafeKit in an HA Cluster - SafeKit HA"
canonical: "https://safekit.eviden.com/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Learn how to safely upgrade applications protected by SafeKit. Compare minor and major upgrades, rolling upgrades, rollback strategies, and VM-based high availability."
category: "best-practises"
lang: "en"
topics: "Upgrading a High Availability Application Protected by SafeKit, VM-Level High Availability, Application-Level High Availability, Choosing the Right Upgrade Strategy, Conclusion, 🔍 SafeKit High Availability Navigation Hub"
---

# Upgrading an Application Protected by SafeKit in an HA Cluster

## Upgrading a High Availability Application Protected by SafeKit

Keeping business-critical applications up to date is essential for security, performance, and access to new features. When an application is protected by SafeKit, the upgrade procedure depends on the high availability architecture in use.

There are two common deployment models:

  * **Virtual Machine High Availability** , where the application runs inside a protected virtual machine managed by SafeKit.
  * **Application-Level High Availability** , where the application is installed on two servers.


Each model offers different upgrade mechanisms and rollback strategies.

## VM-Level High Availability {#vm-level-ha}

With SafeKit VM failover solutions such as **hyperv.safe** and **kvm.safe** , the application is installed only once inside a virtual machine.

SafeKit protects the entire VM rather than the application itself, which significantly simplifies maintenance operations.

### Simplified Upgrade Process

Because you are working with a single VM instance of the application, maintenance is handled at the virtualization layer rather than through application-level failover.

The upgrade procedure is straightforward:

  1. Create a checkpoint or snapshot of the virtual machine using the Hyper-V or KVM management console.
  2. Perform the application upgrade inside the virtual machine.
  3. Validate the upgraded application.
  4. If the upgrade is successful, remove the snapshot and continue normal operation.
  5. If a problem occurs, restore the virtual machine from the snapshot and immediately return to the previous known working state.


Service interruption is limited to the duration normally required by the application's own upgrade procedure.

### Benefits of VM-Level Protection

  * Only one application instance to maintain.
  * No cluster-aware upgrade procedure.
  * Fast rollback through VM snapshots.
  * Reduced operational complexity.
  * Consistent upgrade process regardless of the protected application.


This approach is particularly attractive for packaged applications and commercial off-the-shelf software where application clustering is unavailable or difficult to implement.

## Application-Level High Availability {#app-level-ha}

In a traditional SafeKit cluster, the application is installed on two nodes: node 1 and node 2. SafeKit synchronizes application data between these nodes and automatically handles failover if needed.

### Minor Application Upgrade {#app-level-ha-minor}

A minor upgrade modifies only application binaries while keeping replicated data fully compatible between versions. Because the replicated data format does not change, SafeKit supports a rolling upgrade with minimal downtime. 

  1. The cluster initially runs in a **✅ PRIM (node 1) / ✅ SECOND (node 2)** configuration. The application runs on the PRIM node and replicated data is continuously synchronized to the SECOND node. 
  2. Stop the SafeKit module on the SECOND node (**❌ STOP (node 2)**), upgrade the application, and restart the module. During this operation, the application continues to run on the **✅ ALONE (node 1)** and no service interruption occurs. 
  3. After restart, the upgraded node rejoins the cluster as **✅ SECOND (node 2)** and resynchronizes replicated data. 
  4. Stop the PRIM node (**❌ STOP (node 1)**). SafeKit automatically performs a failover and the upgraded node becomes **✅ ALONE (node 2)**. The application is restarted on this node. Downtime is limited to the failover and application restart time. 
  5. If the upgraded application operates correctly in the ALONE state, upgrade the remaining node (node 1) and restart its SafeKit module. 
  6. After resynchronization, the cluster returns to a normal **✅ SECOND (node 1) / ✅ PRIM (node 2)** configuration. The original roles can be restored either manually using the SafeKit Administration Console or automatically through the SafeKit configuration. 


**Rollback procedure**

  * At step 5, stop the **✅ ALONE (node 2)** node.
  * Force the original node (node 1) to start as primary **ALONE (node 1)** with the previous application version.
  * Reinstall the previous version on the upgraded node (node 2).
  * Return to a normal **✅ PRIM (node 1) / ✅ SECOND (node 2)** configuration.


The complete upgrade is performed with downtime limited to the transition from **✅ PRIM / ✅ SECOND** to **❌ STOP / ✅ ALONE**. 

### Major Application Upgrade {#app-level-ha-major}

A major upgrade changes the format or structure of replicated data. Because data generated by the new version is no longer compatible with the old one, a rolling upgrade cannot be performed. 

  1. The cluster initially runs in a **✅ PRIM (node 1) / ✅ SECOND (node 2)** configuration. 
  2. Stop the SECOND node and then the PRIM node. The cluster transitions to **❌ STOP (node 1) / ❌ STOP (node 2)**. 
  3. Upgrade the former PRIM node and restart it. The node starts alone as **✅ ALONE (node 1)** with the new application version. 
  4. Validate the upgraded application and verify that it operates correctly. 
  5. If validation is successful, upgrade the remaining node and restart its SafeKit module. 
  6. The upgraded node becomes **✅ SECOND (node 2)** , resynchronizes application data, and the cluster returns to a normal **✅ PRIM (node 1) / ✅ SECOND (node 2)** configuration. 


**Rollback procedure**

  * At step 5, stop the upgraded **✅ ALONE (node 1)** node.
  * Force the non-upgraded node to start as primary **✅ ALONE (node 2)**.
  * Reinstall the previous application version on the upgraded node.
  * Restore the original **✅ SECOND (node 1) / ✅ PRIM (node 2)** configuration.


Because replicated data is modified during the migration, downtime corresponds to the period between the **❌ STOP / ❌ STOP** state and the restart of the first upgraded node as **✅ ALONE**. 

### Why SafeKit Simplifies Application Upgrades

SafeKit minimizes operational risk by allowing administrators to:

  * Upgrade one node at a time.
  * Maintain service availability whenever possible.
  * Validate new versions before switching production traffic.
  * Quickly revert to the previous node if unexpected issues are detected.


## Choosing the Right Upgrade Strategy

Deployment Model | Application Instances | Replicated Data Impact | Upgrade Approach  
---|---|---|---  
Application-Level HA | Two nodes | Depends on upgrade type | Rolling upgrade with failover  
VM-Level HA (hyperv.safe / kvm.safe) | One VM | Managed inside VM | Snapshot, upgrade, validate, rollback if required  
  
## Conclusion

SafeKit provides flexible high availability architectures that adapt to the operational requirements of different applications. Whether you protect a clustered application across two nodes or a single application instance running in a virtual machine, SafeKit enables controlled upgrades, minimizes downtime, and offers reliable recovery options whenever maintenance operations are required.


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}