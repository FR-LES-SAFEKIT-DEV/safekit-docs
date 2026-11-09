---
title: "Docker Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Setzen Sie das Modul mirror.safe für SafeKit ein, um die synchrone Echtzeit-Replikation und das automatische Failover von Docker Containern unter Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines 2-Knoten Shared-Nothing Clusters für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit mit Docker, Einschränkungen SafeKit Hochverfügbarkeit, Überblick über die SafeKit/Docker-Lösung, Installation der SafeKit/Docker-Lösung unter Linux (mirror.safe), Schritt-für-Schritt-Konfiguration der SafeKit/Docker-Lösung, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# Docker Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Docker" mod="mirror"  %}}
 

## Überblick über die SafeKit/Docker-Lösung {#overview-of-the-safekit--docker-solution}

Die Lösung wird hier beschrieben: **💡 [SafeKit: Docker Software für Hochverfügbarkeit und Echtzeit-Datenreplikation](</de/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Installation der SafeKit/Docker-Lösung unter Linux (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen die Docker Anwendung, die Sie in SafeKit neu starten möchten, installiert auf 2 Knoten (virtuelle Maschinen oder physische Server).



{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}
 

### Beispiel 1 mit einer Docker-Compose-Anwendung {#example-1-with-a-docker-compose-application}

Bei einer Docker-Compose-Anwendung gibt es eine **docker-compose.yml** -Datei, die die Anwendung und alle ihre Container beschreibt.

  * Installieren Sie zunächst auf beiden Servern die Docker-Compose-Anwendung, ohne sie zu starten: **docker-compose -f docker-compose.yml up --no-start**
  * Führen Sie auf einem Server für jedes Volume in docker-compose.yml diesen Befehl aus: **docker volume inspect volume_name**  
Es werden die **Host-Verzeichnisse der Docker-Volumes** zurückgegeben (diese Pfade sind nicht in docker-compose.yml angegeben).  
Sie erhalten eine Liste von Pfaden wie **/var/lib/docker/volumes/ <volume_name> /_data**
  * Gehen Sie zum Abschnitt **„Schritt-für-Schritt-Konfiguration“** und 
    * Das Modul **mirror.safe** bereitstellen
    * Legen Sie eine **virtuelle IP-Adresse** fest, die im Fehlerfall umgeschaltet wird
    * Legen Sie die Liste von **/var/lib/docker/volumes/ <volume_name> /_data** als **replizierte Verzeichnisse** fest
    * in die Skripte start_prim und stop_prim einfügen: **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** und **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### Beispiel 2 mit einer Docker-Anwendung, die eine Reihe von Containern startet {#example-2-with-a-docker-application-starting-a-set-of-containers}

Wir gehen hier von einer Docker-Anwendung namens **„myappli“** aus, die eine Reihe von Containern startet.

  * Installieren Sie zunächst auf beiden Servern **myappli**, ohne es zu starten
  * Listen Sie auf einem Server die von myapply verwendeten Volumes auf: **ls /var/lib/docker/volumes**  
Somit erhalten Sie eine Liste von Pfaden wie **/var/lib/docker/volumes/ <volume_name> /_data**
  * Gehen Sie zum Abschnitt **„Schritt-für-Schritt-Konfiguration“** und 
    * Das Modul **mirror.safe** bereitstellen
    * Legen Sie eine **virtuelle IP-Adresse** fest, die im Fehlerfall umgeschaltet wird
    * Legen Sie die Liste von **/var/lib/docker/volumes/ <volume_name> /_data** als **replizierte Verzeichnisse** fest
    * in die Skripte start_prim bzw. stop_prim eintragen: **/.../myappli start** und **/.../myappli stop**


### Beispiel 3 mit einem einfachen Docker Image {#example-3-with-a-simple-docker-image}

Die Konfiguration wird am Beispiel des Docker Images von nginx (Webserver) dargestellt.

  * Docker Volume erstellen  
Erstellen Sie auf beiden Servern ein Docker-Volume mit demselben Namen: **docker volume create replicated_vol**  
Rufen Sie den Verzeichnispfad ab, unter dem das Volume auf dem Host gespeichert ist: **docker volume inspect replicated_vol**  
(Beispiel: **/var/lib/docker/storage/replicated_vol/_data**)
  * Erstellung Docker-Containern  
Erstellen Sie auf beiden Servern einen Nginx-Docker-Container, der an das vorherige Volume gebunden ist: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Füllen Sie das Volume mit einer index.html-Datei: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Gehen Sie zum Abschnitt **„Schritt-für-Schritt-Konfiguration“** und 
    * Das Modul **mirror.safe** bereitstellen
    * Legen Sie eine **virtuelle IP-Adresse** fest, die im Fehlerfall umgeschaltet wird
    * Setzen Sie **/var/lib/docker/storage/replicated_vol/_data** als repliziertes Verzeichnis
    * in die Skripte start_prim bzw. stop_prim eintragen: **docker start mynginx** und **docker stop mynginx**
    * Testen Sie nach SafeKit Konfiguration den Zugriff auf index.html mit **http://vitual-ip:9011**


## Schritt-für-Schritt-Konfiguration der SafeKit/Docker-Lösung {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-de app="Docker" mod="mirror"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}