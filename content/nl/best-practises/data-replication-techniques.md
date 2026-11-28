---
title: "Datareplicatietechnieken voor hoge beschikbaarheid"
canonical: "https://safekit.eviden.com/nl/best-practises/data-replication-techniques/"
description: "Technieken voor gegevensreplicatie vergeleken op database-, schijf- en bestandsniveau, en hoe SafeKit synchrone replicatie en failover biedt zonder gedeelde opslag."
category: "best-practises"
lang: "nl"
topics: "Datareplicatietechnieken op database- schijf- of bestandsniveau?, Vergelijkende tabellen tussen datareplicatietechnieken"
hashpart: "data-replication-techniques-at-database-level-disk-level-or-file-level, comparative-tables-between-data-replication-techniques"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.15 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/03/data-replication-techniques.png"
schemaType: "TechArticle"
---

# Datareplicatietechnieken voor hoge beschikbaarheid {#data-replication-techniques-for-high-availability}

## Datareplicatietechnieken op database-, schijf- of bestandsniveau? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Overzicht {#overview}

Dit artikel vergelijkt de voor- en nadelen van datareplicatietechnieken op database-, schijf- en bestandsniveau in clusters met hoge beschikbaarheid. Er wordt gekeken naar drie criteria: failover, failback en eenvoud van implementatie.


![Technieken voor datareplicatie](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")


De onderstaande vergelijkingstabellen lichten de datareplicatietechnieken die door SafeKit, een softwareproduct voor hoge beschikbaarheid, worden geïmplementeerd, in detail toe.

### Wat is de datareplicatietechniek op databaseniveau? {#what-is-the-data-replication-technique-at-database-level}

Het databasebeheersysteem repliceert zijn logbestanden tussen twee servers. Een voorbeeld hiervan is het [transactielogboek SQL Server](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Automatische failover vereist synchrone replicatie. Anders gaan de gegevens van de laatst vastgelegde transacties verloren op de secundaire server na een failover.

Deze techniek repliceert een database, maar niet de andere gegevens van een toepassing. De failover van veel toepassingen vereist echter ook dat andere gegevens worden gerepliceerd, zoals configuratiebestanden.

Wanneer een server crasht en een aantal databasebestanden verliest, is de failback niet automatisch. Een ervaren DBA moet de database op de defecte server herstellen.

### Wat is de datareplicatietechniek op schijfniveau? {#what-is-the-data-replication-technique-at-disk-level}

De wijzigingen op een schijf worden gerepliceerd tussen twee servers. Een voorbeeld hiervan is de [open-source software DRBD](<https://linbit.com/drbd/>).

Om gegevensverlies bij een automatische failover te voorkomen, moet de replicatie tussen de schijven synchroon zijn.

Deze techniek kan databases en andere bestanden repliceren. Maar het heeft een grote impact op de organisatie van applicatiegegevens. Alle gegevens moeten op de gerepliceerde schijf worden opgeslagen. Dit kan onmogelijk zijn als sommige gegevens die moeten worden gerepliceerd zich op de systeemschijf bevinden, omdat elke server zijn eigen systeemschijf moet behouden.

Er zijn specifieke vaardigheden vereist om een gerepliceerde schijf met een bestandssysteem te configureren. Er zijn ook vaardigheden vereist om de toepassingsgegevens naar de gerepliceerde schijf te verplaatsen.

### Wat is de datareplicatietechniek op bestandsniveau? {#what-is-the-data-replication-technique-at-file-level}

De wijzigingen in bestanden worden gerepliceerd tussen twee servers. Een voorbeeld hiervan is de [SafeKit-software voor hoge beschikbaarheid](</nl/>).

Om gegevensverlies bij een automatische failover te voorkomen, is [synchrone replicatie in realtime](</nl/best-practises/synchronous-replication-vs-asynchronous-replication/>) vereist.

Deze techniek kan databases en andere bestanden repliceren. Het heeft geen invloed op de gegevensorganisatie van een toepassing. Realtime bestandsreplicatie werkt bijvoorbeeld zelfs als de toepassingsgegevens zich op de systeemschijf bevinden.

De oplossing is heel eenvoudig te configureren. U hoeft alleen de paden van de te repliceren mappen te configureren.

## Vergelijkende tabellen tussen datareplicatietechnieken {#comparative-tables-between-data-replication-techniques}


{{%  insert-safekit-mirror-comparison-table-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}