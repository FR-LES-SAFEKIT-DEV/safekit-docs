---
title: "Podman Hoge beschikbaarheid met SafeKit : Installeer de mirror.safe -module voor failover."
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Implementeer de mirror.safe module voor SafeKit om synchrone realtime-replicatie en automatische failover van Podman -containers op Linux mogelijk te maken. Deze handleiding beschrijft hoe u een SANless-cluster met twee knooppunten opzet voor kritieke applicaties zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor High Availability Podman , Beperkingen van High Availability SafeKit , Overzicht van de SafeKit / Podman -oplossing, Installatie van de SafeKit / Podman oplossing op Linux ( mirror.safe ), Stapsgewijze configuratie van de SafeKit / Podman oplossing, Demonstratie van de SafeKit mirror -oplossing, 🔍 SafeKit High Availability Navigation Hub"
---

# Podman Hoge beschikbaarheid met SafeKit : Installeer de mirror.safe module voor failover {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Podman" mod="mirror"  %}}
 

## Overzicht van de SafeKit / Podman -oplossing {#overview-of-the-safekit--podman-solution}

De oplossing wordt hier beschreven: ** 💡 [ SafeKit : Podman Software voor hoge beschikbaarheid en realtime datareplicatie ](</solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>) ** .

## Installatie van de SafeKit / Podman oplossing op Linux ( mirror.safe ) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Vereisten {#prerequisites}

  * Je hebt de applicatie Podman nodig die je wilt herstarten in SafeKit geïnstalleerd op 2 knooppunten (virtuele machines of fysieke servers).



{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

### Voorbeeld met een eenvoudige containerimage {#example-with-a-simple-container-image}

In dit voorbeeld laten we zien hoe SafeKit een nginx (webserver) container kan beheren, bijvoorbeeld: het repliceren van een map die in de container wordt gebruikt en het herstarten van de container op een andere node in geval van een storing.

#### Vereisten {#prerequisites-1}

  * Maak een gerepliceerde map ** aan op beide knooppunten **  
Maak een map ** /replicated_dir_path ** aan die door SafeKit gerepliceerd zal worden en die HTML-pagina's zal bevatten die door nginx worden aangeboden.
  * Vul deze map met een initieel HTML-bestand ** op beide knooppunten **
        
        cp index.html /replicated_dir_path

  * Maak een container ** aan op beide knooppunten **  
Maak op beide knooppunten een container nginx aan die de mappen ** /replicated_dir_path ** koppelt aan **/usr/share/nginx/html** . 
        
        podman container create --name mynginx -v /replicated_dir_path : /usr/share/nginx/html -p 9011:80 nginx


#### SafeKit configuratie {#safekit-configuration}

  * Ga naar het gedeelte ** stapsgewijze configuratie ** '.
  * Een **mirror.safe** module maken en configureren
  * Stel een virtueel IP-adres in ** ** dat wordt overgeschakeld in geval van een storing.
  * Stel ** /replicated_dir_path ** in als een gerepliceerde map.
  * Plaats respectievelijk in de scripts start_prim en stop_prim : **podman start mynginx** en **podman stop mynginx**  
Opmerking: mogelijk moet u "podman start --security-opt label=disable mynginx " gebruiken met SE Linux .
  * Implementeer en start de SafeKit mirror module


#### Tests {#tests}

  * Test de toegang tot nginx op **http://vitual-ip:9011/index.html**
  * Testreplicatie:  
Voeg op het knooppunt in de status SafeKit PRIM enkele andere HTML-bestanden toe aan de gerepliceerde map: 
        
        cp page.html /replicated_dir_path

  * Stop de mirror module op het knooppunt in SafeKit PRIM-status.
  * Controleer of de container opnieuw is opgestart op het secundaire knooppunt.
  * Test de toegang tot **http://vitual-ip:9011/index.html** en tot **http://vitual-ip:9011/page.html**


## Stapsgewijze configuratie van de SafeKit / Podman -oplossing {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-nl app="Podman" mod="mirror"  %}}
 

## Demonstratie van de SafeKit mirror oplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}