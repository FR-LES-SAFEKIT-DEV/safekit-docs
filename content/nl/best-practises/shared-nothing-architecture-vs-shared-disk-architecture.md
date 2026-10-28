---
title: "Shared Nothing versus Shared Disk-architectuur: de beste HA-cluster kiezen"
canonical: "https://safekit.eviden.com/nl/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Vergelijk shared-nothing- en shared-disk-architecturen voor hoge beschikbaarheid. Ontdek hoe SafeKit een shared-nothing-aanpak gebruikt om SAN-kosten te elimineren, failover te vereenvoudigen en synchrone replicatie te bieden zonder complexe hardwarebeperkingen."
category: "best-practises"
lang: "nl"
topics: "Shared Nothing-architectuur versus gedeelde schijfarchitectuur voor clusters met hoge beschikbaarheid, Shared Nothing-architectuur versus gedeelde schijfarchitectuur: voor- en nadelen, 🔍 SafeKit Navigatiehub voor hoge beschikbaarheid"
---

# Shared Nothing versus Shared Disk-architectuur: de beste HA-cluster kiezen {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Shared nothing-architectuur versus shared disk-architectuur voor high availability-clusters {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Overzicht {#overview}

Dit artikel onderzoekt de voor- en nadelen van een 'shared nothing'-architectuur versus een 'shared disk'-architectuur voor clusters met hoge beschikbaarheid. We kijken naar hardwarebeperkingen, de impact op de organisatie van applicatiegegevens, de hersteltijd en de eenvoud van de implementatie.


![ Shared nothing-architectuur versus gedeelde schijfarchitectuur ](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


De volgende vergelijkende tabellen leggen in detail het verschil uit tussen een gedeelde schijfarchitectuur en SafeKit , een softwareclusterproduct dat een architectuur zonder gedeelde schijven implementeert.

### Wat is een gedeelde schijfarchitectuur? {#what-is-a-shared-disk-architecture}

Een architectuur met gedeelde schijven (zoals bij het failovercluster [ Microsoft ](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>) ) is gebaseerd op twee servers die een schijf delen, met een automatische failover voor applicaties in geval van hardware- of softwarefouten.

Deze architectuur kent hardwarebeperkingen: de specifieke externe gedeelde opslag, de specifieke kaarten die in de servers moeten worden geïnstalleerd en de specifieke switches tussen de servers en de gedeelde opslag.

Een architectuur met gedeelde schijven heeft een grote invloed op de organisatie van applicatiegegevens. Alle applicatiegegevens moeten op de gedeelde schijf worden opgeslagen om een herstart na een failover mogelijk te maken.

Bovendien moet bij failover de procedure voor het herstellen van het bestandssysteem op de gedeelde schijf worden uitgevoerd. Dit verlengt de hersteltijd (RTO).

Tot slot is de oplossing niet eenvoudig te configureren, omdat er specifieke expertise nodig is voor de hardwareconfiguratie. Daarnaast zijn er applicatievaardigheden vereist om applicatiegegevens op de gedeelde schijf te configureren.

### Wat is een shared nothing-architectuur? {#what-is-a-shared-nothing-architecture-}

Een shared-nothing-architectuur (zoals met [ SafeKit ](</>) ) is gebaseerd op 2 servers die gegevens in realtime repliceren, met een automatische failover van de applicatie in geval van hardware- of softwarefouten.

Er zijn twee soorten datareplicatie: [ replicatie van bestanden op byteniveau en ](</nl/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) replicatie van schijven op blokniveau. We beschouwen hier replicatie van bestanden op byteniveau omdat deze veel voordelen biedt ten opzichte van replicatie van schijven op blokniveau.

De shared-nothing-architectuur kent geen hardwarebeperkingen: de servers kunnen fysiek of virtueel zijn met elk type schijforganisatie. Realtime bestandsreplicatie ( [ synchroon met ](</nl/best-practises/synchronous-replication-vs-asynchronous-replication/>) voor 0 gegevensverlies) vindt plaats via het standaardnetwerk tussen de servers.

Deze architectuur heeft geen invloed op de organisatie van applicatiegegevens. Als een applicatie bijvoorbeeld zijn gegevens op de systeemschijf heeft staan, werkt realtime bestandsreplicatie gewoon.

De hersteltijd (RTO) in geval van een failover wordt gereduceerd tot de herstarttijd van de applicatie op de gerepliceerde bestanden van de secundaire server.

Tot slot is de oplossing zeer eenvoudig te configureren, aangezien alleen de paden naar de te repliceren mappen hoeven te worden ingesteld.

## Shared Nothing-architectuur versus gedeelde schijfarchitectuur: voor- en nadelen {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}