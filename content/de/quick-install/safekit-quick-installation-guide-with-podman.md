---
title: "Podman Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Setzen Sie das Modul mirror.safe für SafeKit ein, um eine synchrone Echtzeit-Replikation und ein automatisches Failover von Podman-Containern unter Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit 2 Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit mit Podman, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/Podman-Lösung, Installation der SafeKit/Podman-Lösung unter Linux (mirror.safe), Schritt-für-Schritt-Konfiguration der SafeKit/Podman-Lösung, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# Podman Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul mirror.safe für Failover {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Podman" mod="mirror"  %}}
 

## Übersicht über die SafeKit/Podman-Lösung {#overview-of-the-safekit--podman-solution}

Die Lösung wird hier beschrieben: **💡 [SafeKit: Podman-Software für Hochverfügbarkeit und Echtzeit-Datenreplikation](</de/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## Installation der SafeKit/Podman-Lösung unter Linux (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen die Podman-Anwendung, die Sie in SafeKit neu starten möchten, auf 2 Knoten (virtuelle Maschinen oder physische Server) installiert.



{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}
 

### Beispiel mit einem einfachen Container-Image {#example-with-a-simple-container-image}

In diesem Beispiel zeigen wir, wie SafeKit einen Nginx-Container (Webserver) verwalten kann, d. h. die Replikation eines im Container aufgerufenen Verzeichnisses und den Neustart des Containers auf einem anderen Knoten im Fehlerfall.

#### Voraussetzungen {#prerequisites-1}

  * Erstellen Sie ein repliziertes Verzeichnis **auf beiden Knoten**  
Erstellen Sie ein Verzeichnis **/replicated_dir_path**, das von SafeKit repliziert wird und HTML-Seiten enthält, die von nginx bereitgestellt werden
  * Füllen Sie dieses Verzeichnis **auf beiden Knoten** mit einer ersten HTML-Datei
        
        cp index.html /replicated_dir_path

  * Erstellen Sie einen Container **auf beiden Knoten**  
Erstellen Sie auf beiden Knoten einen Nginx-Container, der das Verzeichnis **/replicated_dir_path** an **/usr/share/nginx/html** bindet: 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### SafeKit-Konfiguration {#safekit-configuration}

  * Gehen Sie zum Abschnitt **„Schritt-für-Schritt-Konfiguration“**
  * Ein **mirror.safe** -Modul erstellen und konfigurieren
  * Legen Sie eine **virtuelle IP-Adresse** fest, die im Fehlerfall umgeschaltet wird
  * Legen Sie **/replicated_dir_path** als repliziertes Verzeichnis fest
  * Fügen Sie die folgenden Befehle in die Skripte start_prim und stop_prim ein: **podman start mynginx** und **podman stop mynginx**  
Hinweis: Möglicherweise müssen Sie „podman start --security-opt label=disable mynginx“ mit SE Linux verwenden.
  * Das SafeKit Mirror-Modul bereitstellen und starten


#### Tests {#tests}

  * Testen Sie den Zugriff auf nginx unter **http://vitual-ip:9011/index.html**
  * Replikation testen:  
Fügen Sie auf dem Knoten im SafeKit PRIM Zustand einige andere HTML-Dateien zum replizierten Verzeichnis hinzu: 
        
        cp page.html /replicated_dir_path

  * Stoppen Sie das Mirror-Modul auf dem Knoten im SafeKit PRIM Zustand
  * Testen Sie, ob der Container auf dem sekundären Knoten neu gestartet wurde
  * Testen Sie den Zugriff auf **http://vitual-ip:9011/index.html** und auf** http://vitual-ip:9011/page.html**


## Schritt-für-Schritt-Konfiguration der SafeKit/Podman-Lösung {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-de app="Podman" mod="mirror"  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}