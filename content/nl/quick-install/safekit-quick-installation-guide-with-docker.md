---
title: "Docker Hoge beschikbaarheid met SafeKit : Installeer de mirror.safe -module voor failover."
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Implementeer de mirror.safe module voor SafeKit om synchrone realtime-replicatie en automatische failover van Docker containers op Linux mogelijk te maken. Deze handleiding beschrijft hoe u een shared-nothing-cluster met twee knooppunten opzet voor kritieke applicaties zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor High Availability Docker , Beperkingen van High Availability SafeKit , Overzicht van de SafeKit / Docker -oplossing, Installatie van de SafeKit / Docker oplossing op Linux ( mirror.safe ), Stapsgewijze configuratie van de SafeKit / Docker oplossing, Demonstratie van de SafeKit mirror -oplossing, 🔍 SafeKit High Availability Navigation Hub"
---

# Docker Hoge beschikbaarheid met SafeKit : Installeer de mirror.safe module voor failover {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Docker" mod="mirror"  %}}
 

## Overzicht van de SafeKit / Docker -oplossing {#overview-of-the-safekit--docker-solution}

De oplossing wordt hier beschreven: ** 💡 [ SafeKit : Docker Software voor hoge beschikbaarheid en realtime datareplicatie ](</nl/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Installatie van de SafeKit / Docker oplossing op Linux ( mirror.safe ) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Vereisten {#prerequisites}

  * Je hebt de applicatie Docker nodig die je wilt herstarten in SafeKit geïnstalleerd op 2 knooppunten (virtuele machines of fysieke servers).



{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

### Voorbeeld 1 met een Docker compose-applicatie {#example-1-with-a-docker-compose-application}

Bij een Docker compose-applicatie heb je een **docker-compose.yml** -bestand dat de applicatie en al zijn containers beschrijft.

  * Installeer eerst op beide servers de Docker Compose-applicatie zonder deze te starten: **docker-compose -f docker-compose.yml up --no-start**
  * Voer op één server voor elk volume in docker-compose.yml de volgende opdracht uit: **docker volume inspect volume_name**  
Het zal **host directories of the docker volumes** retourneren (deze paden worden niet gegeven in docker-compose.yml ).  
Je krijgt een lijst met paden als **/var/lib/docker/volumes/ <volume_name>/_data**
  * Ga naar het gedeelte ** stapsgewijze configuratie ** ' en 
    * implementeer de **mirror.safe** -module
    * Stel een virtueel IP-adres in ** ** , waarnaar wordt overgeschakeld in geval van een storing.
    * stel de lijst van **/var/lib/docker/volumes/ <volume_name>/_data** in als ** gerepliceerde mappen **
    * Plaats respectievelijk in de scripts start_prim en stop_prim : **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** en **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### Voorbeeld 2 met een Docker -applicatie die een set containers start. {#example-2-with-a-docker-application-starting-a-set-of-containers}

We gaan er hier van uit dat een applicatie met de Docker ** myappli ** een reeks containers start.

  * Installeer eerst op beide servers ** myappli ** zonder ze te starten.
  * Op één server worden de volumes weergegeven die worden gebruikt door myapply : **ls /var/lib/docker/volumes**  
Je krijgt dus een lijst met paden zoals **/var/lib/docker/volumes/ <volume_name>/_data**
  * Ga naar het gedeelte ** stapsgewijze configuratie ** ' en 
    * implementeer de **mirror.safe** -module
    * Stel een virtueel IP-adres in ** ** , waarnaar wordt overgeschakeld in geval van een storing.
    * stel de lijst van **/var/lib/docker/volumes/ <volume_name>/_data** in als ** gerepliceerde mappen **
    * Voeg respectievelijk in de scripts start_prim en stop_prim het volgende toe: ** /.../myappli start, ** en ** /.../myappli stop **


### Voorbeeld 3 met een eenvoudige Docker afbeelding {#example-3-with-a-simple-docker-image}

De configuratie wordt geïllustreerd aan de hand van het voorbeeld van de image nginx Docker (webserver).

  * Docker volumecreatie  
Maak op beide servers een Docker-volume aan met dezelfde naam: **docker volume create replicated_vol**  
Vraag het directorypad op waar het volume op de host is opgeslagen: **docker volume inspect replicated_vol**  
(bijvoorbeeld: **/var/lib/docker/storage/replicated_vol/_data** )
  * Docker containercreatie  
Maak op beide servers een Docker-container met de naam nginx aan die zich koppelt aan het eerder genoemde volume: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Vul het volume met een of ander index.html -bestand: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Ga naar het gedeelte ** stapsgewijze configuratie ** ' en 
    * implementeer de **mirror.safe** -module
    * Stel een virtueel IP-adres in ** ** , waarnaar wordt overgeschakeld in geval van een storing.
    * Stel **/var/lib/docker/storage/replicated_vol/_data** in als een gerepliceerde map.
    * Plaats respectievelijk in de scripts start_prim en stop_prim : **docker start mynginx** en **docker stop mynginx**
    * Test na de configuratie SafeKit de toegang tot index.html met ** http://vitual-ip:9011**


## Stapsgewijze configuratie van de SafeKit / Docker -oplossing {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-nl app="Docker" mod="mirror"  %}}
 

## Demonstratie van de SafeKit mirror oplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}