---
title: "Hochverfügbarkeit mit Podman SafeKit : Installieren Sie das Modul mirror.safe für Failover."
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Installieren Sie das Modul mirror.safe für SafeKit , um die synchrone Echtzeitreplikation und das automatische Failover von Podman -Containern auf Linux zu aktivieren. Diese Anleitung führt Sie durch die Einrichtung eines SAN-losen Clusters mit zwei Knoten für kritische Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für Podman , Einschränkungen der Hochverfügbarkeit SafeKit , Übersicht der Lösung SafeKit / Podman , Installation der Lösung SafeKit / Podman auf Linux ( mirror.safe ), Schrittweise Konfiguration der Lösung SafeKit / Podman , Demonstration der Lösung SafeKit mirror , 🔍 Navigationszentrale für Hochverfügbarkeit SafeKit"
---

# Hochverfügbarkeit mit Podman SafeKit : Installieren Sie das Modul mirror.safe für Failover {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Podman" mod="mirror"  %}}
 

## Übersicht der SafeKit / Podman -Lösung {#overview-of-the-safekit--podman-solution}

Die Lösung wird hier beschrieben: ** 💡 [ SafeKit : Podman Hochverfügbarkeits- und Echtzeit-Datenreplikationssoftware ](</de/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>) ** .

## Installation der SafeKit / Podman Lösung auf Linux ( mirror.safe ) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Voraussetzungen {#prerequisites}

  * Sie benötigen die Anwendung Podman , die Sie in SafeKit neu starten möchten, die auf 2 Knoten (virtuellen Maschinen oder physischen Servern) installiert ist.



{{%  insert-safekit-installation-package-linux-de app="" mod="mirror"  %}}
 

### Beispiel mit einem einfachen Container-Image {#example-with-a-simple-container-image}

In diesem Beispiel zeigen wir, wie SafeKit einen nginx (Webserver)-Container verwalten kann, d. h. die Replikation eines im Container aufgerufenen Verzeichnisses und den Neustart des Containers auf einem anderen Knoten im Fehlerfall.

#### Voraussetzungen {#prerequisites-1}

  * Erstellen Sie auf beiden Knoten ein repliziertes Verzeichnis ** **  
Erstellen Sie ein Verzeichnis ** /replicated_dir_path ** , das von SafeKit repliziert wird und HTML-Seiten enthält, die von nginx bereitgestellt werden.
  * Dieses Verzeichnis soll auf beiden Knoten ** mit einer initialen HTML-Datei ** gefüllt werden.
        
        cp index.html /replicated_dir_path

  * Erstellen Sie einen Container ** auf beiden Knoten **  
Erstellen Sie auf beiden Knoten einen nginx Container, der die Verzeichnisse ** /replicated_dir_path ** an **/usr/share/nginx/html** bindet: 
        
        podman container create --name mynginx -v /replicated_dir_path : /usr/share/nginx/html -p 9011:80 nginx


#### SafeKit Konfiguration {#safekit-configuration}

  * Gehen Sie zum Abschnitt „Schritt-für-Schritt-Konfiguration ** **
  * Erstellen und Konfigurieren eines **mirror.safe** -Moduls
  * Legen Sie eine virtuelle IP-Adresse ** ** fest, die im Fehlerfall umgeschaltet wird.
  * Legen Sie ** /replicated_dir_path ** als repliziertes Verzeichnis fest
  * Fügen Sie in den Skripten start_prim und stop_prim jeweils **podman start mynginx** und **podman stop mynginx** ein.  
Hinweis: Möglicherweise müssen Sie "podman start --security-opt label=disable mynginx " mit SE Linux verwenden.
  * Stellen Sie das Modul SafeKit mirror bereit und starten Sie es.


#### Tests {#tests}

  * Testzugriff auf nginx unter **http://vitual-ip:9011/index.html**
  * Testreplikation:  
Fügen Sie auf dem Knoten im PRIM-Zustand SafeKit einige weitere HTML-Dateien zum replizierten Verzeichnis hinzu: 
        
        cp page.html /replicated_dir_path

  * Stoppen Sie das Modul mirror auf dem Knoten im PRIM-Zustand SafeKit
  * Prüfen Sie, ob der Container auf dem sekundären Knoten neu gestartet wurde.
  * Testen Sie den Zugriff auf **http://vitual-ip:9011/index.html** und auf **http://vitual-ip:9011/page.html**


## Schrittweise Konfiguration der Lösung SafeKit / Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-de app="Podman" mod="mirror"  %}}
 

## Demonstration der Lösung SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}