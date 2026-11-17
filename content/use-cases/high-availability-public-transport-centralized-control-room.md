---
title: "High Availability for Public Transport: Centralized Control Room"
canonical: "https://safekit.eviden.com/use-cases/high-availability-public-transport-centralized-control-room/"
description: "SafeKit ensures high availability for public transport control rooms. RATP deployed SafeKit for line 1 of the Paris Metro. This line is fully automated and driverless. SafeKit provides load balancing, automatic failover, and real-time data replication. It needs no SAN. The same software works on Windows and Linux servers."
category: "use-cases"
lang: "en"
topics: "Public Transport Control Rooms, Why is the control room critical?, SafeKit high availability for public transport, Real-world implementation at RATP, 🔍 Explore SafeKit"
---

# High Availability for Public Transport: Centralized Control Room {#high-availability-for-public-transport-centralized-control-room}

## Public Transport Control Rooms {#public-transport-control-rooms}

A centralized control room is the nerve center of modern public transportation systems. The control room monitors entire metro lines, manages automated operations, and ensures passenger safety. For subway systems, automated metro lines, and bus networks, the control room must operate 24/7 without interruption.

RATP manages the Paris subway. It transports more than 10 million passengers every day. Line 1 of the Paris Metro is fully automated and driverless. This makes the role of the control room even more critical.

## Why is the control room critical? {#why-is-a-centralized-control-room-critical}

The operators of a metro line must react immediately to the slightest incident. An IT failure must never prevent operators from seeing the activity of the line.

The main tasks of the control room operators are:

  * Monitoring the movements of trains on the tracks
  * Handling incidents detected automatically by video cameras
  * Managing communication systems and public announcements
  * Overseeing safety operations and passenger information

A system failure in the control room directly impacts passenger safety and service continuity. All critical applications in the control room must be protected by high availability. Examples are gateways, databases, and web front-ends.

## SafeKit high availability for public transport {#safekit-high-availability-for-public-transport}

RATP faced major constraints for the automation project of line 1:

  * A tight deployment schedule
  * Most applications were not originally designed for high availability
  * A solution was needed for both Windows and Linux servers
  * There was no budget for expensive hardware, such as SAN storage or network load balancing appliances

SafeKit was chosen for the following reasons:

  * It is a purely software solution with no shared disks and no SAN
  * It provides the same clustering solution on Windows and Linux
  * It delivers three critical functions: load balancing, automatic failover, and real-time data replication
  * It is simple to implement on standard servers, easy to administer, and versatile

## Real-world implementation at RATP {#real-world-implementation-at-ratp}

RATP deployed SafeKit with two types of clusters:

  * **Farm cluster**: an active/active cluster with network load balancing and automatic failover
  * **Mirror cluster**: an active/passive cluster with real-time data replication and automatic failover

### Deployment approach

First, RATP defined the functional needs. Then, SafeKit was configured for each protected application. The applications themselves were not modified. SafeKit requires no physical change to the servers.

A SafeKit application cluster has:

  * Two servers with the same operating system
  * The application installed on both servers
  * SafeKit installed on both servers
  * One or more application modules configured for high availability and load balancing

Several application modules can run in parallel on the same cluster. This optimizes the use of server resources. RATP validated the SafeKit modules on three infrastructure stages: testing, pre-production, and production.

### Daily operations

IT operators now administer all application clusters with:

  * The same high availability solution on Windows and Linux
  * The same administration console for all clusters
  * The same configuration and the same commands
  * Unified monitoring for load balancing, high availability, and data replication

The backup servers of critical applications are located in a separate machine room. They run on separate power supplies. If an incident occurs, operations continue without loss of service for Paris subway passengers.

### Key benefits

  * **Cost reduction**: no expensive SAN infrastructure with shared disks and no network load balancing appliances
  * **Simplified administration**: one console manages both Windows and Linux clusters
  * **High availability**: load balancing, automatic failover, and real-time data replication
  * **Minimal project impact**: existing applications require no modification
  * **Operational resilience**: automatic recovery ensures continuous passenger service

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}
