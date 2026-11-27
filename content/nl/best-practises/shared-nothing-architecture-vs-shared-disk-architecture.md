---
title: "Shared-nothing-architectuur versus architectuur met gedeelde schijf: de beste HA-cluster kiezen"
canonical: "https://safekit.eviden.com/nl/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Shared-nothing- vs. shared-disk-architectuur voor hoge beschikbaarheid: hoe SafeKit data tussen servers repliceert om SAN-kosten te vermijden en failover te vereenvoudigen."
category: "best-practises"
lang: "nl"
topics: "Shared-nothing-architectuur versus architectuur met gedeelde schijf voor high-availability-clusters, Shared-nothing-architectuur versus architectuur met gedeelde schijf: voor- en nadelen"
hashpart: "shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters, shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
schemaType: "TechArticle"
---

# Shared-nothing-architectuur versus architectuur met gedeelde schijf: de beste HA-cluster kiezen {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Shared-nothing-architectuur versus architectuur met gedeelde schijf voor high-availability-clusters {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Overzicht {#overview}

Dit artikel vergelijkt twee architecturen voor clusters met hoge beschikbaarheid: de shared-nothing-architectuur en de architectuur met gedeelde schijf. Het legt de voor- en nadelen ervan uit. Het behandelt hardwarebeperkingen, de impact op de organisatie van applicatiegegevens, de hersteltijd en de eenvoud van de implementatie.


![shared-nothing-architectuur versus architectuur met gedeelde schijf](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


De onderstaande vergelijkingstabellen beschrijven de verschillen tussen een architectuur met gedeelde schijf en SafeKit. Dit softwareclusterproduct implementeert een shared-nothing-architectuur.

### Wat is een architectuur met gedeelde schijf? {#what-is-a-shared-disk-architecture}

Een architectuur met gedeelde schijf is gebaseerd op twee servers die een schijf delen. In geval van hardware- of softwarefouten wordt de toepassing automatisch opnieuw gestart op de andere server. Microsoft-failoverclustering is een voorbeeld van een architectuur met gedeelde schijf. Zie [Hardwarevereisten voor failoverclustering](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>) voor meer informatie.

Deze architectuur heeft hardwarebeperkingen: specifieke externe gedeelde opslag, specifieke kaarten in de servers en specifieke switches tussen de servers en de gedeelde opslag.

Een architectuur met gedeelde schijf heeft een grote invloed op de organisatie van applicatiegegevens. Alle applicatiegegevens moeten zich op de gedeelde schijf bevinden, zodat de applicatie opnieuw kan worden gestart na een failover.

Bovendien moet bij een failover een procedure voor het herstellen van het bestandssysteem op de gedeelde schijf worden uitgevoerd. Dit verlengt de hersteldoelstelling (RTO).

Tot slot is de oplossing niet eenvoudig te configureren. Er zijn hardwarevaardigheden vereist om de specifieke hardware te configureren. Er zijn ook applicatievaardigheden vereist om applicatiegegevens op de gedeelde schijf te plaatsen.

### Wat is een shared-nothing-architectuur? {#what-is-a-shared-nothing-architecture-}

Een shared-nothing-architectuur is gebaseerd op twee servers die gegevens in realtime repliceren. In geval van hardware- of softwarefouten wordt de toepassing automatisch opnieuw gestart op de andere server. SafeKit is een voorbeeld van een shared-nothing-architectuur.

Er zijn twee soorten gegevensreplicatie: bestandsreplicatie op byteniveau en schijfreplicatie op blokniveau. Zie [Bestandsreplicatie op byteniveau versus schijfreplicatie op blokniveau](</nl/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) voor meer informatie. In dit artikel wordt bestandsreplicatie op byteniveau behandeld, omdat dit veel voordelen heeft ten opzichte van schijfreplicatie op blokniveau.

De shared-nothing-architectuur kent geen hardwarebeperkingen. De servers kunnen fysiek of virtueel zijn, met elk type schijforganisatie. Realtime bestandsreplicatie verloopt via het standaardnetwerk tussen de servers. [Synchrone replicatie](</nl/best-practises/synchronous-replication-vs-asynchronous-replication/>) garandeert nul gegevensverlies.

Deze architectuur heeft geen invloed op de organisatie van applicatiegegevens. Realtime bestandsreplicatie werkt bijvoorbeeld zelfs als de applicatiegegevens zich op de systeemschijf bevinden.

In het geval van een failover wordt de hersteltijd (RTO) teruggebracht tot de herstarttijd van de toepassing. De toepassing wordt opnieuw gestart op de gerepliceerde bestanden van de secundaire server.

Tot slot is de oplossing zeer eenvoudig te configureren. U hoeft alleen de paden van de te repliceren mappen te configureren.

## Shared-nothing-architectuur versus architectuur met gedeelde schijf: voor- en nadelen {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}