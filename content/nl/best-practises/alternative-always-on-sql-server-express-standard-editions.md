---
title: "Alternatief voor SQL Server Always On: HA voor Express- en Standard-edities"
canonical: "https://safekit.eviden.com/nl/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "Zoekt u een kosteneffectief alternatief voor SQL Server Always On? SafeKit biedt een SAN-loze architectuur die hoge beschikbaarheid biedt voor de SQL Server Express- en Standard-edities. Profiteer van synchrone replicatie, virtuele IP en automatische failover zonder SAN of Active Directory."
category: "best-practises"
lang: "nl"
topics: "Alternatief voor Always On SQL Server voor express- en standaardedities, Hoe werkt het SafeKit mirror cluster met Microsoft SQL Server ?, Videohandleiding: Een SafeKit HA mirror cluster configureren voor SQL Server , 🔍 SafeKit High Availability Navigation Hub"
---

# Alternatief voor SQL Server Altijd Aan: HA voor Express- en Standard-edities {#alternative-to-sql-server-always-on-ha-for-express-and-standard-editions}

## Alternatief voor Always On SQL Server voor express- en standaardedities {#alternative-to-always-on-sql-server-for-express-and-standard-editions}

### De oplossing voor Microsoft SQL Server {#the-solution-for-microsoft-sql-server}

SafeKit zorgt voor hoge beschikbaarheid tussen Microsoft SQL Server twee redundante knooppunten met synchrone realtime replicatie van gegevens en automatische failover.

De oplossing is onafhankelijk van de Microsoft SQL Server -editie en werkt met zowel de express- als de standaardeditie.

### Een generiek product {#a-generic-product}

SafeKit is een generiek product. U kunt er meer mee repliceren dan alleen SQL Server-gegevens en -logboeken. Als uw applicatie is gebaseerd op SQL Server met specifieke mappen die uw configuratie of andere bestanden bevatten, kunt u deze op dezelfde manier repliceren. Bovendien kunt u naast de SQL Server-services ook uw eigen services opnieuw starten.

Installatiehandleiding [ SafeKit met express- en standaardedities voor Microsoft SQL Server ](</nl/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)

### Zonder Microsoft failover-cluster {#without-microsoft-failover-cluster}

SafeKit werkt zonder het failovercluster Microsoft net als Always On SQL Server . Het is een alles-in-één oplossing met een virtueel IP-adres, synchrone realtime replicatie van mappen, automatische failover en failback, en meer. SafeKit maakt gedeelde schijven en database-enterprise-edities overbodig. 

### Zonder domeincontroller en Active Directory {#without-domain-controller-and-active-directory}

SafeKit werkt zonder configuratie van de domeincontroller en Active Directory, net als Always On SQL Server . Deze eenvoudig te implementeren, kosteneffectieve oplossing vereist geen specifieke vaardigheden.

### Zonder 3 knooppunten voor quorum {#without-3-nodes-for-quorum}

SafeKit werkt zonder dat er 3 knooppunten nodig zijn voor quorum, zoals bij Always On SQL Server . In geval van netwerkisolatie implementeert SafeKit een split-brain checker met een ping naar een router die als witness fungeert. Bovendien kunnen meerdere heartbeats eenvoudig in het product worden geconfigureerd.

### Andere oplossingen voor redundantie en hoge beschikbaarheid {#other-redundancy-and-high-availability-solutions}

Met SafeKit kunt u op Windows en Linux realtime replicatie en failover implementeren van alle mappen en services, databases, complete Hyper-V- of KVM-virtuele machines, en Docker en Kubernetes cloudapplicaties.

### Een complete oplossing {#a-complete-solution}

SafeKit lost op: 

  * hardwarestoringen (20% van de problemen), waaronder het volledig uitvallen van een computerruimte, 
  * Softwarefouten (40% van de problemen), waaronder het herstarten van kritieke processen. 
  * en menselijke fouten (40% van de problemen) dankzij het gebruiksgemak en de webconsole.



{{%  insert-safekit-mirror-nl app="Microsoft SQL Server"  %}}
 

## Videohandleiding: Een SafeKit HA mirror cluster configureren voor SQL Server {#videoguide-safekit-mirror-cluster}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}