---
title: "Clustering Software for Farms and Mirrors: High Availability & Load Balancing"
slug: "clustering-software-load-balancing-mirroring"
canonical: "https://safekit.eviden.com/architectures/clustering-software-load-balancing-mirroring/"
description: "Clustering Software for Farms and Mirrors: High Availability & Load Balancing High availability and scalability of critical web and database applications with the SafeKit clustering software"
category: "architectures"
lang: "en"
topics: "High availability and scalability of critical web and database applications with the SafeKit clustering software, 🔍 SafeKit High Availability Navigation Hub"
---

# Clustering Software for Farms and Mirrors: High Availability & Load Balancing

## High availability and scalability of critical web and database applications with the SafeKit clustering software

### Load balancing, mirroring and failover


<img src="/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png" width="300" alt="SafeKit clustering with load balancing and mirroring">


### Example with the SafeKit clustering software

For example, with the SafeKit clustering software, you can implement IIS load balancing and Microsoft SQL Server mirroring.

For that, you have to deploy a farm module for IIS and a mirror module for Microsoft SQL server. Each farm and mirror module is configured with its own virtual IP address and its own restart scripts.

Both mirror and farm modules can be deployed on a single cluster of two servers. IIS and Microsoft SQL Server will run on these two servers. Or, the two modules can be deployed on two clusters with different servers.

With the SafeKit clustering software, there is no difference between a deployment on the same servers or on different servers.

### High availability and scalability solution

The SafeKit clustering software provides a simple high availability and scalability solution for critical web and database applications.

As a result, network load balancing, real time data mirroring and application failover are managed coherently in a same product.

When comparing the SafeKit clustering software with hardware clustering, you do not need shared disk, replicated SAN, load balancers, Enterprise editions of OS or database.


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}