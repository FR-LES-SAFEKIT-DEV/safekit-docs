---
title: "High Availability for Air Traffic Control Systems"
canonical: "https://safekit.eviden.com/use-cases/high-availability-air-traffic-control-system/"
description: "SafeKit ensures high availability for air traffic control systems. ADB SafeGate deployed SafeKit in airports worldwide. Critical applications are available 24/7. SafeKit replicates data in real time with no data loss. It provides automatic failover on standard Windows servers. No shared storage is needed."
category: "use-cases"
lang: "en"
topics: "Air Traffic Control Systems, Why is air traffic control critical?, How SafeKit protects air traffic control, Real-world implementation at ADB SafeGate, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# High Availability for Air Traffic Control Systems {#high-availability-for-air-traffic-control-systems}

## Air Traffic Control Systems {#air-traffic-control-systems}

Air traffic controllers have one of the most complex and stressful tasks imaginable. Today, airspace is busy and air traffic is intense. A single error in directing aircraft can have catastrophic consequences. Modern air traffic control systems depend on sophisticated software applications. These applications help controllers make critical decisions.

ADB SafeGate is a global provider of airside solutions, including air traffic control tower software. Its solutions equip more than 3,000 airports in over 175 countries. They manage critical airport operations data, including:

  * Flight scheduling and air traffic flow information
  * Meteorological data
  * Airfield lighting and control status
  * Apron and docking operations

## Why is air traffic control critical? {#why-is-air-traffic-control-critical}

Air traffic control is one of the most critical activities that exist. Any system failure at a critical moment can compromise controller decision-making and passenger safety. Controllers must have complete confidence in the systems supporting them.

However, the best application is useless if a server, operating system, or software fails at a critical moment. ADB SafeGate recognized the need to ensure the availability of its critical environment. It decided to study how to guarantee 24/7 uptime for its applications.

**The challenge**: Make a comprehensive suite of applications for air traffic controllers available 24/7. This is a mandatory requirement for air traffic control.

## How SafeKit protects air traffic control {#safekit-high-availability-for-atc}

ADB SafeGate selected SafeKit, the software high availability solution from Eviden, because it delivers:

  * **24/7 availability**: critical applications are always available
  * **Redundant application servers**: servers can be located in separate machine rooms to protect against disaster
  * **Standard servers**: no shared disks and no complex SAN infrastructure
  * **Real-time file replication**: no data loss (RPO=0)
  * **Automatic recovery**: no manual action is needed after a failure

As a result, air traffic controllers using ADB SafeGate software can focus entirely on their complex task. They can be confident that the systems supporting them are resilient and always available.

## Real-world implementation at ADB SafeGate {#real-world-implementation-at-adb-safegate}

### Deployment approach

At an airport, ADB SafeGate installs its applications and SafeKit on two standard Windows servers. The servers have no shared disks. The applications benefit from real-time file replication and automatic recovery after a failure.

### How it works in practice

**Phase 1: Normal operation**

The application runs only on server 1, inside the SafeKit mirror module. Clients connect automatically to server 1 through a primary/secondary virtual IP address. Only the files modified by the application are replicated. They are sent to server 2 in real time over the network. This minimizes network traffic.

There are no prerequisites on server organization. Files can be on a RAID5 disk in server 1 and on a simple disk in server 2.

Writes are replicated synchronously to both servers. So no data is lost in case of failure. Data committed by a transactional application is automatically available on the secondary server. An example is PostgreSQL. This guarantee is not possible with asynchronous replication.

**Phase 2: Failover on failure**

If server 1 fails, SafeKit automatically fails over to server 2. The failover time equals the failure detection time plus the application restart time. The default detection timeout is 30 seconds. There is no file system recovery delay, unlike with disk replication solutions.

**Phase 3: Resynchronization after failure**

When server 1 restarts, the mirror module automatically resynchronizes the files.

Only the files modified on server 2 during the downtime of server 1 are resynchronized. The applications keep running on server 2 during resynchronization. After resynchronization, the system is again highly available and protected.

The administrator may want the application to run on server 1 by priority. In this case, a failback to server 1 can be triggered manually with a single click. It can also be automatic.

### Key benefits for airports

  * **No special hardware**: standard Windows servers are enough
  * **No shared storage**: no expensive SAN infrastructure and no shared disk complexity
  * **Disaster resistance**: servers can be in separate machine rooms with separate power supplies
  * **Zero data loss**: synchronous replication ensures RPO=0 for all committed transactions
  * **Automatic recovery**: no manual action is needed after a failure
  * **Less stress**: air traffic controllers can trust the systems supporting their critical decisions
  * **Global reliability**: successfully deployed in airports across many countries and continents

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}
