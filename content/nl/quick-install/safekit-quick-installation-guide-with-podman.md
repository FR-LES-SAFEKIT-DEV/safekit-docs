---
title: "Podman High Availability met SafeKit: Installeer de mirror.safe module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Implementeer de mirror.safe module voor SafeKit om synchrone real-time replicatie en automatische failover van Podman-containers op Linux mogelijk te maken. Deze handleiding begeleidt u bij het opzetten van een SANless-cluster met 2 knooppunten voor bedrijfskritieke toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Podman, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Podman-oplossing, Installatie van de SafeKit/Podman-oplossing op Linux (mirror.safe), Stapsgewijze configuratie van de SafeKit/Podman-oplossing, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Podman High Availability met SafeKit: Installeer de mirror.safe module voor failover {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Podman" mod="mirror"  %}}
 

## Overzicht van de SafeKit/Podman-oplossing {#overview-of-the-safekit--podman-solution}

De oplossing wordt hier beschreven: **💡 [SafeKit: Podman High Availability & Real-Time Data Replication Software](</nl/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## Installatie van de SafeKit/Podman-oplossing op Linux (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Vereisten {#prerequisites}

  * U hebt de Podman-applicatie die u opnieuw wilt opstarten in SafeKit nodig, geïnstalleerd op 2 knooppunten (virtuele machines of fysieke servers).



{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

### Voorbeeld met een eenvoudige containerimage {#example-with-a-simple-container-image}

In dit voorbeeld laten we zien hoe SafeKit een nginx-container (webserver) kan beheren, d.w.z. replicatie van een directory die in de container wordt geopend en het opnieuw opstarten van de container op een andere node in geval van een storing.

#### Vereisten {#prerequisites-1}

  * Maak een gerepliceerde map aan **op beide knooppunten**  
Maak een map **/replicated_dir_path** aan die door SafeKit wordt gerepliceerd en die HTML-pagina's bevat die door nginx worden geleverd
  * Vul deze map met een initieel HTML-bestand **op beide knooppunten**
        
        cp index.html /replicated_dir_path

  * Maak een container aan **op beide knooppunten**  
Maak een nginx-container op beide knooppunten die de map **/replicated_dir_path** koppelt aan **/usr/share/nginx/html**: 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### SafeKit-configuratie {#safekit-configuration}

  * Ga naar de **stap-voor-stap configuratiesectie**
  * Een **mirror.safe** -module maken en configureren
  * Stel een **virtueel IP-adres** in dat wordt overgeschakeld in geval van een storing
  * Stel **/replicated_dir_path in** als een gerepliceerde map
  * Plaats respectievelijk in de start_prim- en stop_prim-scripts: **podman start mynginx** en **podman stop mynginx**  
Opmerking: Mogelijk moet u "podman start --security-opt label=disable mynginx" gebruiken met SE Linux.
  * Implementeer en start de SafeKit mirror-module


#### Tests {#tests}

  * Test de toegang tot nginx op **http://vitual-ip:9011/index.html**
  * Replicatie testen:  
Voeg op de node in SafeKit PRIM status enkele andere HTML-bestanden toe aan de gerepliceerde map: 
        
        cp page.html /replicated_dir_path

  * Stop de mirror-module op de node in SafeKit PRIM status
  * Controleer of de container opnieuw is gestart op de secundaire node
  * Test de toegang tot **http://vitual-ip:9011/index.html** en tot** http://vitual-ip:9011/page.html**


## Stapsgewijze configuratie van de SafeKit/Podman-oplossing {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-nl app="Podman" mod="mirror"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}