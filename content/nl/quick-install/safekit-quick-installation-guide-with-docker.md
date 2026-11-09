---
title: "Docker hoge beschikbaarheid met SafeKit: Installeer de mirror.safe module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Implementeer de mirror.safe module voor SafeKit om synchrone real-time replicatie en automatische failover van Docker-containers op Linux mogelijk te maken. Deze handleiding begeleidt u bij het opzetten van een shared-nothing cluster met 2 knooppunten voor bedrijfskritische toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Docker, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Docker-oplossing, Installatie van de SafeKit/Docker-oplossing op Linux (mirror.safe), Stapsgewijze configuratie van de SafeKit/Docker-oplossing, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Docker hoge beschikbaarheid met SafeKit: Installeer de mirror.safe module voor failover {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Docker" mod="mirror"  %}}
 

## Overzicht van de SafeKit/Docker-oplossing {#overview-of-the-safekit--docker-solution}

De oplossing wordt hier beschreven: **💡 [SafeKit: Software voor hoge beschikbaarheid en realtime gegevensreplicatie Docker](</nl/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Installatie van de SafeKit/Docker-oplossing op Linux (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Vereisten {#prerequisites}

  * U hebt de Docker applicatie die u opnieuw wilt opstarten in SafeKit nodig, geïnstalleerd op 2 knooppunten (virtuele machines of fysieke servers).



{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

### Voorbeeld 1 met een Docker Compose-applicatie {#example-1-with-a-docker-compose-application}

Met een Docker Compose-applicatie heb je een **docker-compose.yml** bestand dat de applicatie en al zijn containers beschrijft.

  * Installeer eerst op beide servers de docker compose-applicatie zonder deze te starten: **docker-compose -f docker-compose.yml up --no-start**
  * Voer op één server voor elk volume in docker-compose.yml de volgende opdracht uit: **docker volume inspect volume_name**  
Het retourneert de **hostmappen van de Docker-volumes** (deze paden worden niet opgegeven in docker-compose.yml).  
U krijgt een lijst met paden zoals **/var/lib/docker/volumes/ <volume_name> /_data**
  * Ga naar de **stap-voor-stap configuratiesectie** en 
    * Implementeer de **mirror.safe** -module
    * stel een **virtueel IP-adres** in dat wordt overgeschakeld in geval van een storing
    * stel de lijst van **/var/lib/docker/volumes/ <volume_name> /_data** in als **gerepliceerde mappen**
    * respectievelijk in de start_prim- en stop_prim-scripts: **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** en **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### Voorbeeld 2 met een Docker-applicatie die een reeks containers start {#example-2-with-a-docker-application-starting-a-set-of-containers}

We gaan hier uit van een Docker-applicatie, **myappli**, die een reeks containers start.

  * Installeer eerst **myappli** op beide servers zonder het te starten
  * Geef op één server de volumes weer die door myapply worden gebruikt: **ls /var/lib/docker/volumes**  
U krijgt dan een lijst met paden zoals **/var/lib/docker/volumes/ <volume_name> /_data**
  * Ga naar de **stap-voor-stap configuratiesectie** en 
    * Implementeer de **mirror.safe** -module
    * stel een **virtueel IP-adres** in dat wordt overgeschakeld in geval van een storing
    * stel de lijst van **/var/lib/docker/volumes/ <volume_name> /_data** in als **gerepliceerde mappen**
    * respectievelijk in de start_prim- en stop_prim-scripts plaatsen: **/.../myappli start** en **/.../myappli stop**


### Voorbeeld 3 met een eenvoudige Docker-image {#example-3-with-a-simple-docker-image}

De configuratie wordt gepresenteerd aan de hand van het voorbeeld van de nginx Docker image (webserver).

  * Docker volume aanmaken  
Maak op beide servers een Docker-volume met dezelfde naam: **docker volume create replicated_vol**  
De directory-path ophalen waar het volume is opgeslagen op de host: **docker volume inspect replicated_vol**  
(bijvoorbeeld: **/var/lib/docker/storage/replicated_vol/_data**)
  * Docker container aanmaken  
Maak op beide servers een nginx docker-container die aan het vorige volume is gekoppeld: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Vul het volume met een index.html-bestand: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Ga naar de **stap-voor-stap configuratiesectie** en 
    * Implementeer de **mirror.safe** -module
    * stel een **virtueel IP-adres** in dat wordt overgeschakeld in geval van een storing
    * stel **/var/lib/docker/storage/replicated_vol/_data** in als een gerepliceerde map
    * Plaats respectievelijk in de start_prim- en stop_prim-scripts: **docker start mynginx** en **docker stop mynginx**
    * Test na de SafeKit configuratie de toegang tot index.html met **http://vitual-ip:9011**


## Stapsgewijze configuratie van de SafeKit/Docker-oplossing {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-nl app="Docker" mod="mirror"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}