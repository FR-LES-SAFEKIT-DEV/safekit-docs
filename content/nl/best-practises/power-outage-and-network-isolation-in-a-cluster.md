---
title: "Omgaan met stroomuitval en netwerkisolatie in een HA-cluster"
canonical: "https://safekit.eviden.com/nl/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Leer hoe u netwerkisolatie en stroomuitval beheert in een cluster met hoge beschikbaarheid. SafeKit bevat split-brain-checkers en automatische resynchronisatie. Deze zorgen voor gegevensintegriteit en 24/7 uptime zonder gedeelde schijf."
category: "best-practises"
lang: "nl"
topics: "Wat zijn de verschillende scenario's in geval van netwerkisolatie in een cluster?, Wat zijn de verschillende scenario's in geval van een stroomstoring in een cluster?, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Omgaan met stroomuitval en netwerkisolatie in een HA-cluster {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-nl  %}}
 

## Wat zijn de verschillende scenario's in geval van een stroomstoring in een cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

In de volgende scenario's is node 1 in eerste instantie de primaire node. Node 2 is in eerste instantie de secundaire node.

### Stroomstoring primaire node {#primary-node-power-outage}

Wanneer een stroomstoring alleen de primaire node stopt:

  * SafeKit schakelt automatisch over naar de secundaire node. Node 2 wordt ALONE en start de applicatie opnieuw op.
  * Wanneer node 1 opnieuw opstart, synchroniseert het de gerepliceerde gegevens opnieuw. Daarna wordt het SECOND.
  * Indien nodig kan een beheerder de primaire en secundaire rollen omwisselen.


### Stroomstoring secundaire node {#secondary-node-power-outage}

Wanneer een stroomstoring alleen de secundaire node stopt:

  * Er vindt geen failover plaats. Node 1 wordt ALONE. De toepassing blijft op node 1 draaien.
  * Wanneer node 2 opnieuw opstart, synchroniseert het de gerepliceerde gegevens opnieuw. Daarna wordt het SECOND.


### Stroomstoring op beide nodes - geval 1 {#general-power-outage---case-1}

Wanneer een stroomstoring beide nodes uitschakelt, is het standaardgedrag als volgt:

  * Beide nodes gaan naar de STOP-status.
  * Wanneer node 1 opnieuw opstart, gaat het niet naar de ALONE-status. Het herstart de applicatie niet. Het kan niet weten of de gegevens up-to-date zijn. Dus gaat het naar de WAIT-status en wacht het tot de andere node opnieuw opstart.
  * Wanneer node 2 opnieuw opstart, keren beide nodes terug naar hun vorige status: PRIM en SECOND.


### Stroomstoring op beide nodes - geval 2 {#general-power-outage---case-2}

Wanneer een stroomstoring beide nodes stopt, is het gedrag met de parameter `syncdelta` als volgt:

  * In dit voorbeeld is `syncdelta` ingesteld op 10 minuten in de configuratie. Een node kan dan starten, zelfs als de gegevens tot 10 minuten achterlopen op de laatste synchronisatie.
  * Wanneer node 1 binnen 10 minuten na de stroomuitval opnieuw opstart, gaat het naar de ALONE-status. De toepassing wordt opnieuw gestart.
  * Wanneer node 2 opnieuw opstart, synchroniseert het de gerepliceerde gegevens opnieuw. Daarna wordt het SECOND.
  * Opmerking: als node 2 als eerste opnieuw opstart, wordt het ALONE. Node 1 wordt dan SECOND wanneer het opstart.



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}