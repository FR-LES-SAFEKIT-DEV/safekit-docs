---
title: "Het omgaan met stroomuitval en netwerkisolatie in een HA-cluster."
canonical: "https://safekit.eviden.com/nl/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Leer hoe u netwerkisolatie en stroomuitval in een high availability-cluster beheert. SafeKit biedt een SANless-architectuur met geïntegreerde split-brain-controlemechanismen en automatische resynchronisatie om data-integriteit en 24/7 uptime te garanderen zonder gedeelde schijf."
category: "best-practises"
lang: "nl"
topics: "Wat zijn de verschillende scenario's bij netwerkisolatie in een cluster? Wat zijn de verschillende scenario's bij stroomuitval in een cluster? 🔍 SafeKit High Availability Navigation Hub"
---

# Het afhandelen van stroomuitval en netwerkisolatie in een HA-cluster {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-nl  %}}
 

## Wat zijn de verschillende scenario's in geval van stroomuitval in een cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

### Stroomuitval primair knooppunt {#primary-node-power-outage}

Wanneer een stroomstoring alleen het primaire knooppunt uitschakelt:

  * Er vindt een automatische failover plaats op het secundaire knooppunt, dat ALONE wordt en de applicatie opnieuw opstart.
  * Wanneer knooppunt 1 opnieuw wordt opgestart, krijgt het de status SEDOND na resynchronisatie van de gerepliceerde gegevens.
  * De rollen van primair en secundair kunnen indien nodig door een beheerder worden verwisseld.


### Stroomuitval secundaire node {#secondary-node-power-outage}

Wanneer een stroomstoring alleen het secundaire knooppunt uitschakelt:

  * Er vindt geen failover plaats, de primaire server wordt ALONE en de applicatie blijft op node 1 draaien.
  * Wanneer knooppunt 2 opnieuw wordt opgestart, krijgt het de status SEDOND na resynchronisatie van de gerepliceerde gegevens.


### Algemene stroomuitval - geval 1 {#general-power-outage---case-1}

Wanneer een stroomstoring beide knooppunten uitschakelt, is het standaardgedrag als volgt:

  * beide knooppunten gaan naar STOP,
  * Wanneer knooppunt 1 opnieuw wordt opgestart, gaat het niet naar de ALONE-status en start het de applicatie niet opnieuw op, omdat het niet weet of het over de meest recente gegevens beschikt. Het gaat dus naar de WAIT-status en wacht op de herstart van het andere knooppunt.
  * Wanneer knooppunt 2 opnieuw wordt opgestart, keren beide knooppunten terug naar hun vorige PRIM/SECOND-status.


### Algemene stroomuitval - geval 2 {#general-power-outage---case-2}

Wanneer een stroomstoring beide knooppunten uitschakelt, is het gedrag met syncdelta als volgt:

  * Als syncdelta bijvoorbeeld in de configuratie op 10 minuten is ingesteld, betekent dit dat de start van een node wordt geaccepteerd, zelfs als de data 10 minuten achterloopt op de laatste synchronisatie.
  * Wanneer knooppunt 1 opnieuw wordt opgestart, gaat het naar de ALONE-status en herstart de applicatie, ervan uitgaande dat de herstart binnen 10 minuten na de stroomuitval plaatsvindt.
  * Wanneer knooppunt 2 opnieuw wordt opgestart, wordt het na de resynchronisatie van de gerepliceerde gegevens het TWEEDE knooppunt.
  * Let op: als knooppunt 2 als eerste opnieuw wordt opgestart, wordt het ALONE en wordt knooppunt 1 SECOND bij het opstarten.



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}