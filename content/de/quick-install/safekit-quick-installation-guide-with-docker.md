---
title: "Hochverfügbarkeit mit Docker SafeKit : Installieren Sie das Modul mirror.safe für Failover."
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Stellen Sie das Modul mirror.safe für SafeKit bereit, um die synchrone Echtzeitreplikation und das automatische Failover von Docker Containern auf Linux zu aktivieren. Diese Anleitung führt Sie durch die Einrichtung eines Shared-Nothing-Clusters mit zwei Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für Docker , Einschränkungen der Hochverfügbarkeit SafeKit , Übersicht der Lösung SafeKit / Docker , Installation der Lösung SafeKit / Docker auf Linux ( mirror.safe ), Schrittweise Konfiguration der Lösung SafeKit / Docker , Demonstration der Lösung SafeKit mirror , 🔍 Navigationszentrale für Hochverfügbarkeit SafeKit"
---

# Hochverfügbarkeit mit Docker SafeKit : Installieren Sie das Modul mirror.safe für Failover {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Docker" mod="mirror"  %}}
 

## Übersicht der SafeKit / Docker -Lösung {#overview-of-the-safekit--docker-solution}

Die Lösung wird hier beschrieben: ** 💡 [ SafeKit : Docker Hochverfügbarkeits- und Echtzeit-Datenreplikationssoftware ](</solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Installation der SafeKit / Docker Lösung auf Linux ( mirror.safe ) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen die Anwendung Docker , die Sie in SafeKit neu starten möchten, die auf 2 Knoten (virtuellen Maschinen oder physischen Servern) installiert ist.



{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}
 

### Beispiel 1 mit einer Docker -Compose-Anwendung {#example-1-with-a-docker-compose-application}

Bei einer Docker -Compose-Anwendung haben Sie eine **docker-compose.yml** Datei, die die Anwendung und alle ihre Container beschreibt.

  * Installieren Sie zunächst auf beiden Servern die Docker Compose-Anwendung, ohne sie zu starten: **docker-compose -f docker-compose.yml up --no-start**
  * Führen Sie auf einem Server für jedes Volume in docker-compose.yml folgenden Befehl aus: **docker volume inspect volume_name**  
Es wird **host directories of the docker volumes** zurückgegeben (diese Pfade sind in docker-compose.yml nicht angegeben).  
Sie erhalten eine Liste von Pfaden im Format **/var/lib/docker/volumes/ <volume_name>/_data**
  * Gehen Sie zum Abschnitt „Schritt-für-Schritt-Konfiguration ** ** “ und 
    * Setzen Sie das **mirror.safe** -Modul ein.
    * Legen Sie eine virtuelle IP-Adresse ** ** fest, die im Fehlerfall umgeschaltet wird.
    * die Liste festlegen **/var/lib/docker/volumes/ <volume_name>/_data** als **replizierte Verzeichnisse**
    * Fügen Sie jeweils in die Skripte start_prim und stop_prim ein: **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** und **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### Beispiel 2 mit einer Docker -Anwendung, die eine Reihe von Containern startet {#example-2-with-a-docker-application-starting-a-set-of-containers}

Wir nehmen hier an, dass eine Docker Anwendung ** myappli ** eine Reihe von Containern startet.

  * Installieren Sie zunächst auf beiden Servern ** myappli ** ohne es zu starten.
  * Auf einem Server die von myapply verwendeten Volumes auflisten: **ls /var/lib/docker/volumes**  
Sie erhalten somit eine Liste von Pfaden im Format **/var/lib/docker/volumes/ <volume_name>/_data**
  * Gehen Sie zum Abschnitt „Schritt-für-Schritt-Konfiguration ** ** “ und 
    * Setzen Sie das **mirror.safe** -Modul ein.
    * Legen Sie eine virtuelle IP-Adresse ** ** fest, die im Fehlerfall umgeschaltet wird.
    * die Liste festlegen **/var/lib/docker/volumes/ <volume_name>/_data** als **replizierte Verzeichnisse**
    * Fügen Sie in den Skripten start_prim und stop_prim jeweils Folgendes ein: ** /.../myappli start ** und ** /.../myappli stop **


### Beispiel 3 mit einem einfachen Docker Bild {#example-3-with-a-simple-docker-image}

Die Konfiguration wird am Beispiel des Images nginx Docker (Webserver) dargestellt.

  * Docker -Volume-Erstellung  
Erstellen Sie auf beiden Servern ein Docker-Volume mit demselben Namen: **docker volume create replicated_vol**  
Ermitteln Sie den Verzeichnispfad, in dem das Volume auf dem Host gespeichert ist: **docker volume inspect replicated_vol**  
(zum Beispiel: **/var/lib/docker/storage/replicated_vol/_data** )
  * Docker -Containererstellung  
Erstellen Sie auf beiden Servern einen Docker-Container namens nginx , der an das vorherige Volume **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx** gebunden ist.  
Füllen Sie das Volume mit einer index.html -Datei: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Gehen Sie zum Abschnitt „Schritt-für-Schritt-Konfiguration ** ** “ und 
    * Setzen Sie das **mirror.safe** -Modul ein.
    * Legen Sie eine virtuelle IP-Adresse ** ** fest, die im Fehlerfall umgeschaltet wird.
    * **/var/lib/docker/storage/replicated_vol/_data** als repliziertes Verzeichnis festlegen
    * Fügen Sie jeweils in die Skripte start_prim und stop_prim ein: **docker start mynginx** und **docker stop mynginx**
    * Nach der Konfiguration SafeKit testen Sie den Zugriff auf index.html mit ** http://vitual-ip:9011**


## Schrittweise Konfiguration der Lösung SafeKit / Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-de app="Docker" mod="mirror"  %}}
 

## Demonstration der Lösung SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}