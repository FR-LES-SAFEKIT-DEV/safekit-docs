---
title: "Actieve-actieve clusteringsoftware met realtime replicatie en wederzijdse failover."
canonical: "https://safekit.eviden.com/nl/architectures/active-active-cluster-real-time-replication/"
description: "Maximaliseer het gebruik van resources met SafeKit actieve-actieve clustering. Implementeer wederzijdse failover tussen twee servers met behulp van realtime synchrone replicatie en meerdere mirror -modules. Garandeer nul dataverlies (RPO=0) en automatisch herstel voor Windows en Linux zonder SAN. Download de gratis proefversie."
category: "architectures"
lang: "nl"
topics: "Hoe werkt een actief-actief cluster met realtime replicatie? 🔍 SafeKit High Availability Navigation Hub"
---

# Actieve-actieve clusteringsoftware met realtime replicatie en wederzijdse failover {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Hoe werkt een actief-actief cluster met realtime replicatie? {#how-the-active-active-cluster-with-real-time-replication-works}

### Actief-actief cluster met realtime replicatie {#active--active-cluster-with-real-time-replication}

De applicaties draaien op twee servers in een failover-configuratie. Elke server dient als back-up voor de andere server. Bovendien werkt elke applicatie met zijn eigen, gerepliceerde bestandsmappen.


![ SafeKit actief actief cluster met realtime replicatie ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Als één server in een actief-actief cluster uitvalt, blijven alle applicaties op dezelfde server actief. Na het herstarten van de uitgevallen server zullen de applicaties weer op hun standaard primaire server draaien.

### Hoe werkt het? {#how-it-works}

Het SafeKit actieve-actieve cluster wordt eenvoudig geconfigureerd door twee mirror -modules met realtime replicatie te implementeren. Elke mirror module bevat zijn eigen configuratie van virtueel IP-adres, realtime gerepliceerde mappen en herstartscripts.

Let op:

  * Voor applicatiefailover moeten de twee applicaties Appli1 en Appli2 op elke server geïnstalleerd zijn.
  * Deze architectuur is niet beperkt tot 2 applicaties: er kunnen N applicatiemodules worden geïmplementeerd op 2 servers met een maximum van 25 modules.
  * Elke mirror module krijgt een eigen virtueel IP-adres, eigen gerepliceerde bestandsmappen en eigen herstelscripts.


### Voorbeeld van een actief actieve cluster {#example-of-an-active-active-cluster}

De 💡 [ Hyper-V ](</nl/solutions/hyper-v-replication-automatic-failover-load-balancing/>) of 💡 [ KVM ](</nl/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) oplossing met replicatie, automatische failover en load balancing van VM's is een voorbeeld van een actief-actief cluster met N mirror modules die N virtuele machines repliceren tussen twee fysieke servers.

In deze configuratie repliceert een mirror -module een volledige virtuele machine en herstart de virtuele machine in geval van een storing. 

Een dergelijke module heeft geen virtueel IP-adres, omdat het herstarten van een VM op een server automatisch zorgt voor de failover van het fysieke IP-adres van de VM. 

En in deze architectuur is een cruciale applicatie geïnstalleerd in een virtuele machine.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}