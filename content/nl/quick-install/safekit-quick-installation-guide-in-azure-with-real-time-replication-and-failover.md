---
title: "Hoge beschikbaarheid in Azure: replicatie in realtime en failover met SafeKit"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "Implementeer de SafeKit-module mirror.safe in Azure voor synchrone replicatie in realtime en automatische failover op Windows en Linux. Deze handleiding beschrijft hoe u voor bedrijfskritieke toepassingen een cluster met twee knooppunten zonder gedeelde opslag configureert."
category: "quick-install"
lang: "nl"
topics: "Handleiding voor snelle installatie van hoge beschikbaarheid voor Azure, Beperkingen van SafeKit-hoge beschikbaarheid, Overzicht van de SafeKit-/Azure-mirroroplossing, Installatie van de SafeKit-/Azure-mirroroplossing op Windows en Linux (mirror.safe), Stapsgewijze configuratie van de SafeKit-/Azure-mirroroplossing, Demonstratie van de SafeKit-mirroroplossing, 🔍 SafeKit-navigatiecentrum voor hoge beschikbaarheid"
---

# Hoge beschikbaarheid in Azure met SafeKit: de module mirror.safe installeren voor failover {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-nl app="Azure" mod="mirror"  %}}

## Overzicht van de SafeKit-/Azure-mirroroplossing {#overview-of-the-safekit--azure-mirror-solution}

De oplossing wordt hier beschreven: **💡[Hoge beschikbaarheid van Microsoft Azure: synchrone replicatie en failover met SafeKit](</nl/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Installatie van de SafeKit-/Azure-mirroroplossing op Windows en Linux (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### De load balancer van Microsoft Azure configureren {#configuration-of-the-microsoft-azure-load-balancer}

De load balancer moet worden geconfigureerd als u een virtueel IP-adres wilt implementeren.
De load balancer moet ook periodiek statuscontrolepakketten naar de knooppunten sturen.
Daarvoor biedt SafeKit een statuscontrole die op de knooppunten wordt uitgevoerd en:

  * OK retourneert wanneer de status van de mirror-module PRIM (groen) of ALONE (groen) is
  * in alle andere statussen NOT FOUND retourneert

Configureer de load balancer van Microsoft Azure met:

  * HTTP-protocol
  * poort 9010, de poort van de SafeKit-webserver
  * URL /var/modules/mirror/ready.txt (als mirror de naam is van de module die u later implementeert)

Zie [de configuratie van de load balancer van Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>) voor meer informatie.

⚠️ Configureer geen virtueel IP-adres bij stap 4 van de stapsgewijze configuratie hieronder. Het virtuele IP-adres is al ingesteld in de load balancer van Microsoft Azure. Een virtueel IP-adres instellen bij stap 4 is alleen nuttig voor een on-premises configuratie.

### De netwerkbeveiliging van Microsoft Azure configureren {#configuration-of-the-microsoft-azure-network-security}

Configureer de netwerkbeveiliging om communicatie via de volgende protocollen en poorten toe te staan:

  * UDP - 4800 voor de safeadmin-service (tussen SafeKit-knooppunten)
  * UDP - 8888 voor de heartbeat van de module (tussen SafeKit-knooppunten)
  * TCP – 5600 voor realtime bestandsreplicatie van de module (tussen SafeKit-knooppunten)
  * TCP – 9010 voor de statuscontrole van de load balancer en de SafeKit-webconsole in http-modus
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP – 9453 voor de SafeKit-webconsole in https-modus

{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}

Opmerking: de generieke module **mirror.safe** die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit-/Azure-mirroroplossing {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-nl app="Windows" mod="mirror"  %}}

## Demonstratie van de SafeKit-mirroroplossing {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
