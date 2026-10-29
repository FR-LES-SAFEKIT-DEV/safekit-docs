---
title: "Netwerktaakverdeling en failover in Azure: de SafeKit-module farm.safe installeren"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "Verbeter de netwerktaakverdeling van Azure met de intelligente toepassingsbewaking van SafeKit. De module farm.safe biedt een speciale statuscontrole voor de Azure Load Balancer en maakt naadloze hoge beschikbaarheid op toepassingsniveau, automatisch herstel en failover mogelijk voor bedrijfskritieke toepassingen."
category: "quick-install"
lang: "nl"
topics: "Handleiding voor snelle installatie van hoge beschikbaarheid voor Azure, Beperkingen van SafeKit-hoge beschikbaarheid, Overzicht van de SafeKit-/Azure-oplossing, Installatie van de SafeKit-/Azure-oplossing op Windows en Linux (farm.safe), Stapsgewijze configuratie van de SafeKit-/Azure-oplossing, Demonstratie van de SafeKit-<span class="notranslate farm-term" translate="no">farm</span>-oplossing, 🔍 SafeKit-navigatiecentrum voor hoge beschikbaarheid"
---

# Netwerktaakverdeling en failover in Azure: de SafeKit-module farm.safe installeren {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-nl app="Azure" mod="farm"  %}}

## Overzicht van de SafeKit-/Azure-oplossing {#overview-of-the-safekit--azure-solution}

De oplossing wordt hier beschreven: **💡[SafeKit: taakverdeling van Microsoft Azure en hoge beschikbaarheid van toepassingen met een <span class="notranslate farm-term" translate="no">Farm</span>-cluster](</nl/solutions/azure-load-balancing-cluster-failover/>)**.

## Installatie van de SafeKit-/Azure-oplossing op Windows en Linux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### De load balancer van Microsoft Azure configureren {#configuration-of-the-microsoft-azure-load-balancer}

De load balancer moet worden geconfigureerd met een virtueel IP-adres.
De load balancer moet ook periodiek statuscontrolepakketten naar de knooppunten sturen.
Daarvoor biedt SafeKit een statuscontrole die op de knooppunten wordt uitgevoerd en:

  * OK retourneert wanneer de status van de <span class="notranslate farm-term" translate="no">farm</span>-module UP (groen) is
  * in alle andere statussen NOT FOUND retourneert

Configureer de load balancer van Microsoft Azure met:

  * HTTP-protocol
  * poort 9010, de poort van de SafeKit-webserver
  * URL /var/modules/farm/ready.txt (als <span class="notranslate farm-term" translate="no">farm</span> de naam is van de module die u later implementeert)

Zie [de configuratie van de load balancer van Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>) voor meer informatie.

⚠️ Configureer geen virtueel IP-adres en geen taakverdelingsregels bij stap 4 van de stapsgewijze configuratie hieronder. Het virtuele IP-adres en de taakverdelingsregels zijn al ingesteld in de load balancer van Microsoft Azure. Deze instellen bij stap 4 is alleen nuttig voor een on-premises configuratie.

### De netwerkbeveiliging van Microsoft Azure configureren {#configuration-of-the-microsoft-azure-network-security}

Configureer de netwerkbeveiliging om communicatie via de volgende protocollen en poorten toe te staan:

  * UDP - 4800 voor de safeadmin-service (tussen SafeKit-knooppunten)
  * UDP - 4803 voor heartbeats binnen de <span class="notranslate farm-term" translate="no">farm</span>-module (tussen SafeKit-knooppunten)
  * TCP – 9010 voor de statuscontrole van de load balancer en de SafeKit-webconsole in http-modus
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP – 9453 voor de SafeKit-webconsole in https-modus

{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}

Opmerking: de generieke module **farm.safe** die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit-/Azure-oplossing {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-nl app="" mod="farm"  %}}

## Demonstratie van de SafeKit-<span class="notranslate farm-term" translate="no">farm</span>-oplossing {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
