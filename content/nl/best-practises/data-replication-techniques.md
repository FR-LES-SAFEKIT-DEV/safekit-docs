---
title: "Gegevensreplicatietechnieken voor hoge beschikbaarheid: een volledige vergelijking"
canonical: "https://safekit.eviden.com/nl/best-practises/data-replication-techniques/"
description: "Vergelijk gegevensreplicatie op database-, schijf- en bestandsniveau. Ontdek waarom SafeKit een SANless-architectuur biedt voor eenvoudige, synchrone replicatie in realtime, zonder gegevensverlies en met automatische failover op Windows en Linux."
category: "best-practises"
lang: "nl"
topics: "Gegevensreplicatietechnieken op database-, schijf- of bestandsniveau, Vergelijkingstabellen van gegevensreplicatietechnieken, SafeKit-navigatiecentrum voor hoge beschikbaarheid"
---

# Gegevensreplicatietechnieken voor hoge beschikbaarheid: een volledige vergelijking {#data-replication-techniques-for-high-availability-a-complete-comparison}

## Gegevensreplicatie op database-, schijf- of bestandsniveau? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Overzicht {#overview}

Dit artikel bespreekt de voor- en nadelen van gegevensreplicatie op database-, schijf- en bestandsniveau voor clusters met hoge beschikbaarheid. Daarbij kijken we naar failover, failback en implementatiegemak.

![Gegevensreplicatietechnieken](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

De volgende vergelijkingstabellen beschrijven de gegevensreplicatietechnieken van SafeKit, software voor hoge beschikbaarheid, in detail.

### Wat houdt gegevensreplicatie op databaseniveau in? {#what-is-the-data-replication-technique-at-database-level}

Het databasebeheersysteem repliceert logbestanden tussen twee servers, zoals het [SQL Server-transactielogboek](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Voor automatische failover is synchrone replicatie noodzakelijk. Anders zijn de laatst bevestigde transacties na een failover niet beschikbaar op de secundaire server.

Deze techniek repliceert een database, maar niet de overige applicatiegegevens. Voor failover van veel toepassingen moeten ook andere gegevens, zoals configuratiebestanden, worden gerepliceerd.

Als een server crasht en databasebestanden verliest, verloopt failback niet automatisch. Een ervaren DBA moet de database op de defecte server herstellen.

### Wat houdt gegevensreplicatie op schijfniveau in? {#what-is-the-data-replication-technique-at-disk-level}

Hierbij worden wijzigingen op schijven tussen twee servers gerepliceerd, bijvoorbeeld met [DRBD](<https://linbit.com/drbd/>).

Voor automatische failover zonder gegevensverlies is synchrone replicatie tussen de schijven noodzakelijk.

Deze techniek kan databases en andere bestanden repliceren, maar heeft veel invloed op de indeling van applicatiegegevens. Alle gegevens moeten op de gerepliceerde schijf staan. Dit kan onmogelijk zijn als te repliceren gegevens op de systeemschijf staan, omdat die schijf per server eigen moet blijven.

Er is specialistische kennis nodig om een gerepliceerde schijf met een bestandssysteem in te stellen en de applicatiegegevens daarop te plaatsen.

### Wat houdt gegevensreplicatie op bestandsniveau in? {#what-is-the-data-replication-technique-at-file-level}

Hierbij worden bestandswijzigingen tussen twee servers gerepliceerd, bijvoorbeeld met [SafeKit](/nl/).

Voor automatische failover zonder gegevensverlies is [synchrone replicatie in realtime](/nl/best-practises/synchronous-replication-vs-asynchronous-replication/) nodig.

Deze techniek kan databases en andere bestanden repliceren zonder de indeling van applicatiegegevens te veranderen. Zelfs als een toepassing gegevens op de systeemschijf opslaat, werkt bestandsreplicatie in realtime.

De oplossing is eenvoudig te configureren: alleen de paden van de te repliceren mappen hoeven te worden opgegeven.

## Vergelijkingstabellen van gegevensreplicatietechnieken {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-nl %}}

{{% insert-safekit-hub-nl %}}

{{% insert-safekit-4-buttons-nl %}}