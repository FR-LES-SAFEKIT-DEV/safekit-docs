---
title: "Actief-actief clusteringsoftware met real-time replicatie en wederzijdse failover"
canonical: "https://safekit.eviden.com/nl/architectures/active-active-cluster-real-time-replication/"
description: "Maximaliseer het gebruik van uw middelen met SafeKit actief-actief clustering. Implementeer wederzijdse failover tussen twee servers met behulp van synchrone realtime-replicatie en meerdere mirror-modules. Zorg voor nul gegevensverlies (RPO = 0) en automatisch herstel voor Windows en Linux zonder SAN. Download de gratis proefversie."
category: "architectures"
lang: "nl"
topics: "Hoe werkt een actief-actief cluster met realtime replicatie?, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
schemaType: "TechArticle"
---

# Actief-actief clusteringsoftware met real-time replicatie en wederzijdse failover {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Hoe werkt een actief-actief cluster met realtime replicatie? {#how-the-active-active-cluster-with-real-time-replication-works}

### Actief-actief-cluster met realtime-replicatie {#active--active-cluster-with-real-time-replication}

Twee servers voeren applicaties uit en fungeren als back-up voor elkaar. Dit wordt wederzijdse failover genoemd: elke server is de back-up van de andere server. Elke applicatie gebruikt zijn eigen gerepliceerde bestandsmappen.


![SafeKit actief-actiefcluster met realtime replicatie](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Als één server uitvalt in een actief-actief cluster, worden alle toepassingen uitgevoerd op de resterende server. Wanneer de uitgevallen server opnieuw wordt opgestart, keert elke toepassing terug naar de standaard primaire server.

### Hoe werkt het? {#how-it-works}

Om een actief-actief cluster met SafeKit te configureren, implementeert u eenvoudigweg twee mirror-modules met realtime replicatie. Elke mirror-module heeft zijn eigen configuratie: een virtueel IP-adres, realtime gerepliceerde mappen en herstartscripts.

Opmerkingen:

  * Beide applicaties (Appli1 en Appli2) moeten op elke server worden geïnstalleerd voor applicatie-failover.
  * Deze architectuur is niet beperkt tot twee toepassingen. U kunt tot 25 applicatiemodules op dezelfde twee servers implementeren.
  * Elke mirror-module heeft een eigen virtueel IP-adres, eigen gerepliceerde bestandsmappen en eigen herstelscripts.


### Voorbeeld van een actief-actief cluster {#example-of-an-active-active-cluster}

De 💡 [Hyper-V](</nl/solutions/hyper-v-replication-automatic-failover-load-balancing/>) of 💡 [KVM](</nl/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)-oplossing is een voorbeeld van een actief-actief cluster. Deze oplossing biedt replicatie, automatische failover en load balancing van virtuele machines. In dit cluster repliceren N mirror-modules N virtuele machines tussen twee fysieke servers.

In deze configuratie repliceert elke mirror-module een volledige virtuele machine en start deze opnieuw op als er een storing optreedt.

Dit type module heeft geen virtueel IP-adres nodig. Wanneer de virtuele machine opnieuw wordt opgestart op de andere server, wordt het eigen IP-adres automatisch mee verplaatst.

In deze architectuur wordt de bedrijfskritische toepassing binnen een virtuele machine geïnstalleerd.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}