---
title: "Bestandreplicatie op byteniveau versus schijfreplicatie op blokniveau voor HA"
canonical: "https://safekit.eviden.com/nl/best-practises/byte-level-file-replication-vs-block-level-disk-replication/"
description: "Vergelijk bestandsreplicatie op byte-niveau met schijfreplicatie op blokniveau. Ontdek waarom SafeKit een SAN-loze architectuur voorstelt die alleen gewijzigde gegevens binnen bestanden repliceert, waardoor er geen gegevensverlies optreedt (RPO 0), het herstel sneller verloopt (RTO) en de configuratie eenvoudig is op Windows en Linux ."
category: "best-practises"
lang: "nl"
topics: "Bestandsreplicatie op byte-niveau versus schijfreplicatie op blokniveau in een high availability-cluster, Voordelen en nadelen van bestandsreplicatie op byte-niveau versus schijfreplicatie op blokniveau, 🔍 SafeKit High Availability Navigation Hub"
---

# Bestandreplicatie op byte-niveau versus schijfreplicatie op blokniveau voor HA {#byte-level-file-replication-vs-block-level-disk-replication-for-ha}

## Bestandsreplicatie op byteniveau versus schijfreplicatie op blokniveau in een cluster met hoge beschikbaarheid {#byte-level-file-replication-vs-block-level-disk-replication-in-a-high-availability-cluster}

### Overzicht {#overview}

Dit artikel onderzoekt de voor- en nadelen van bestandsreplicatie op byteniveau versus schijfreplicatie op blokniveau in een high availability-cluster. We kijken naar het volume van de gerepliceerde data, de impact op de dataorganisatie van applicaties, de hersteltijd en de eenvoud van de implementatie.


![ Bestandsreplicatie op byte-niveau versus schijfreplicatie op blokniveau ](/wp-content/uploads/2023/02/file-replication-vs-disk-replication.png "w:200")


De volgende vergelijkende tabellen geven een gedetailleerde uitleg van de bestandsreplicatie op byte-niveau die wordt geïmplementeerd door SafeKit , een softwareproduct voor hoge beschikbaarheid.

### Wat is bestandsreplicatie op byte-niveau? {#what-is-byte-level-file-replication}

Bestandreplicatie op byte-niveau (zoals met [ SafeKit ](</>) ) betekent dat alleen wijzigingen binnen bestanden worden gerepliceerd. 

Synchrone replicatie [ en synchrone replicatie ](</nl/best-practises/synchronous-replication-vs-asynchronous-replication/>) zijn vereist in een cluster met hoge beschikbaarheid om dataverlies bij een storing te voorkomen. Asynchrone replicatie is bedoeld voor back-upoplossingen.

De hoeveelheid gerepliceerde data wordt beperkt tot informatie die door applicaties in hun bestanden is gewijzigd. Er wordt geen extra data gerepliceerd.

Dit heeft geen invloed op de dataorganisatie van een applicatie. Als een applicatie bijvoorbeeld zijn data op de systeemdisk heeft staan, werkt bestandsreplicatie op byte-niveau.

De hersteltijd (RTO) in geval van een failover wordt gereduceerd tot de herstarttijd van de applicatie op de gerepliceerde bestanden van de secundaire server.

Tot slot is de oplossing zeer eenvoudig te configureren, aangezien alleen de paden naar de te repliceren mappen hoeven te worden ingesteld.

### Wat is schijfreplicatie op blokniveau? {#what-is-block-level-disk-replication}

Bij replicatie van schijven op blokniveau (zoals met [ DRBD ](<https://linbit.com/drbd/>) ) worden alleen wijzigingen binnen een schijf gerepliceerd.

De hoeveelheid gerepliceerde data beperkt zich niet tot informatie die door applicaties is gewijzigd. Ook extra data, zoals metadata voor schijfbeheer (lijst met vrije blokken, interne informatie over het bestandssysteem), wordt gerepliceerd.

Dit heeft een grote impact op de organisatie van applicatiegegevens. Alle gegevens moeten op de gerepliceerde schijf worden opgeslagen. Dit vereist op zijn minst een herconfiguratie van de applicatie. Of het is onmogelijk als sommige te repliceren gegevens zich op de systeemschijf bevinden, omdat deze schijf specifiek moet blijven voor elke server.

De hersteltijd (RTO) neemt toe naarmate de herstelprocedure van het bestandssysteem op de gerepliceerde schijf langer duurt na een failover.

Tot slot is de oplossing niet eenvoudig te configureren, omdat er expertise nodig is om een speciale schijf met een bestandssysteem te configureren. Daarnaast zijn er applicatievaardigheden vereist om applicatiegegevens op de gerepliceerde schijf te configureren.

## Voordelen en nadelen van bestandsreplicatie op byte-niveau versus schijfreplicatie op blokniveau {#pros-and-cons-of-byte-level-file-replication-vs-block-level-disk-replication}

Criteria | **Cluster met bestandsreplicatie op byte-niveau** | **Cluster met schijfreplicatie op blokniveau**  
---|---|---  
Product | • [ SafeKit op Windows en Linux ](/) | • Schijfreplicatieproducten als [ DRBD ](https://linbit.com/drbd/)   
Organisatie van applicatiegegevens | • Geen impact op de organisatie van applicatiegegevens met SafeKit . <br> • [ Definieer alleen mappen die in realtime moeten worden gerepliceerd. ](/nl/architectures/file-replication-byte-level-with-failover-mirror-cluster/) <br> • Zelfs mappen binnen de systeemschijf kunnen worden gerepliceerd. | • Impact op de organisatie van applicatiegegevens. <br> • Speciale configuratie van de applicatie om de gegevens op een gerepliceerde schijf te plaatsen. <br> • Gegevens op de systeemschijf kunnen niet worden gerepliceerd.   
Gegevensreplicatie | • Synchrone bestandsreplicatie op byte-niveau. <br> • Repliceert bestandswijzigingsbewerkingen die worden gegenereerd door applicatieactiviteit. <br> • Er worden geen metadata gerepliceerd. Alleen gewijzigde gegevens in bestanden worden gerepliceerd, niet volledige bestanden (bestandsreplicatie op byte-niveau). <br> • [ Synchrone replicatie om gegevensverlies bij een storing te voorkomen. ](/nl/best-practises/synchronous-replication-vs-asynchronous-replication/) • | • Repliceert alle gewijzigde gegevens op een gerepliceerde schijf. <br> • Applicatiegegevens plus metadata worden gerepliceerd. <br> • Bijvoorbeeld, de laatst geraadpleegde tijd van een bestand wordt gerepliceerd (de laatst geraadpleegde tijd wordt gewijzigd telkens wanneer het bestand wordt gelezen).   
Complexiteit van de implementatie | • Nee - installeer software op 2 servers | • Ja - specifieke IT-vaardigheden vereist voor het configureren van het besturingssysteem en de gerepliceerde schijf   
Failover | • Start de applicatie opnieuw op de tweede server. | • Koppel het bestandssysteem opnieuw aan op de gerepliceerde schijf. <br> • Voer de herstelprocedure uit op het bestandssysteem. <br> • Start vervolgens de applicatie opnieuw.   
Failback | • Automatische failback. <br> • Resynchronisatie van gegevens op de secundaire server zonder de applicatie op de primaire server te stoppen. <br> • Geen failover van de applicatie zolang de gegevens niet worden geresynchroniseerd. | • Niet alle producten hebben hetzelfde functionaliteitsniveau.   
Quorum en split brain | • Applicatie wordt uitgevoerd op één server na netwerkisolatie (split brain). <br> • Gegevenscoherentie na een split brain. <br> • Geen derde machine, quorumschijf of speciale heartbeatlijn nodig voor split brain. <br> • [ Meer informatie over heartbeat, failover en quorum ](/nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/) | • Vereist een speciale quorumschijf of een derde quorumserver om split brain te beheren.   
Geschikt voor softwareontwikkelaars die een eenvoudige optie voor hoge beschikbaarheid aan hun applicatie willen toevoegen ( | , [ ](/nl/use-cases/application-clustering-software/) | ) en bedrijven met IT-kennis op het gebied van clustering.   
  

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}