---
title: "K3S Hochverfügbarkeit mit SafeKit : Installieren Sie das k3s.safe -Modul für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Installieren Sie das Modul k3s.safe für SafeKit , um die synchrone Echtzeitreplikation und das automatische Failover von Kubernetes auf Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SAN-losen Clusters mit zwei Knoten für kritische Linux Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit für Kubernetes , Einschränkungen der Hochverfügbarkeit SafeKit , Übersicht der Lösung SafeKit / Kubernetes , Installation und Konfiguration der Lösung SafeKit / Kubernetes auf Linux ( k3s.safe ), Welche Szenarien gibt es bei Netzwerkisolation in einem Cluster?, Demonstration der Lösung SafeKit mirror , 🔍 Navigationszentrale für Hochverfügbarkeit SafeKit"
---

# K3S Hochverfügbarkeit mit SafeKit : Installieren Sie das Modul k3s.safe für Failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Kubernetes" mod="k3s"  %}}
 

## Übersicht der SafeKit / Kubernetes -Lösung {#overview-of-the-safekit--kubernetes-solution}

Die Lösung wird hier beschrieben: **💡 [ Kubernetes K3s Hochverfügbarkeit: Synchrone 2-Knoten-Replikation & Failover ](</de/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Installation und Konfiguration der SafeKit / Kubernetes Lösung auf Linux ( k3s.safe ) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Laden Sie die Pakete herunter. {#1-download-packages}

  * Laden Sie die kostenlose Version von SafeKit 8.2 auf Linux (safekitlinux_xx.bin) herunter.
  * Laden Sie das Modul k3s.safe Linux herunter.
  * Laden Sie das k3sconfig.sh -Skript herunter.
  * Dokumentation (pptx)


Hinweis: Das Skript k3sconfig.sh installiert K3S, MariaDB , NFS und SafeKit auf zwei Ubuntu 24.04-Knoten Linux .

[ Download SafeKit ( Linux ) > ](</de/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe"> Download k3s.safe ( Linux ) > </a> 

[ Download k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[ Dokumentation (PDF) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Zuerst auf beiden Knoten {#2-first-on-both-nodes}

Auf 2 Linux Ubuntu 24.04-Knoten, als Root:

  * Stellen Sie sicher, dass der Knoten über einen Internetzugang verfügt (gegebenenfalls über einen Proxy).
  * Kopieren Sie k3sconfig.sh , k3s.safe und das Paket safekit_xx.bin in ein Verzeichnis und wechseln Sie in dieses Verzeichnis.
  * Benennen Sie die .bin-Datei in "safekit.bin" um.
  * Stellen Sie sicher, k3sconfig.sh und safekit.bin ausführbar sind.
  * Bearbeiten Sie das Skript k3sconfig.sh und passen Sie die Umgebungsvariablen an Ihre Umgebung an (einschließlich einer virtuellen IP-Adresse).
  * Auf beiden Knoten ausführen: `./k3sconfig.sh prereq`


Das Skript wird:

  * Installieren Sie die erforderlichen Debian-Pakete: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Sichere MariaDB-Installation
  * Verzeichnisse für die Dateireplikation erstellen
  * Bereiten Sie den NFS-Server für die Freigabe replizierter Verzeichnisse vor.
  * Installieren Sie SafeKit


### 3. Auf dem ersten Knoten {#3-on-the-first-node}

Auf dem ersten Knoten ausführen: `./k3sconfig.sh first`

Das Skript wird:

  * Erstellen Sie die K3S-Konfigurationsdatenbank und den K3S-Benutzer.
  * Erstellen Sie die replizierte Speichervolumendatei (Sparse-Datei) und formatieren Sie sie als XFS-Dateisystem.
  * Erstellen Sie die SafeKit-Clusterkonfiguration und wenden Sie sie an.
  * Installieren und konfigurieren Sie das Modul k3s.safe auf dem Cluster.
  * Starten Sie das k3s-Modul als "prim" auf dem ersten Knoten.
  * Laden Sie k3s herunter, installieren Sie es und starten Sie es.
  * Laden Sie das Helm-Chart nfs-subdir-external-provisioner herunter und installieren Sie es.
  * K3S-Token anzeigen (wird während der zweiten Knoteninstallationsphase verwendet)


### 4. Auf dem zweiten Knoten {#4-on-the-second-node}

Auf dem zweiten Knoten ausführen: `./k3sconfig.sh second <token>`

  * <token> ist die Zeichenkette, die am Ende der Ausführung von " k3sconfig.sh first" auf dem ersten Knoten angezeigt wird.


Das Skript wird:

  * Stellen Sie sicher, dass das k3s-Modul auf dem ersten Knoten als primäres Modul gestartet wird.
  * Installieren Sie k3s auf dem zweiten Knoten
  * Starten Sie das k3s-Modul


### 5. Überprüfen Sie, ob das k3s-Modul SafeKit auf beiden Knoten ausgeführt wird. {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Führen Sie auf beiden Knoten folgenden Befehl aus: `/opt/safekit/safekit –H "*" state`

Die Antwort sollte dem Bild ähneln.
    
    
    /opt/safekit/safekit –H " * " Zustand
    ---------------- Server= http://10.0.0.20:9010 ----------------
    Administratoraktion=Ausführen
    --------------------- k3s Status ---------------------
    
      Lokal (127.0.0.1): PRIM (Service: Verfügbar) (Farbe: Grün)
    Erfolg
    ---------------- Server= http://10.0.0.21:9010 ----------------
    Administratoraktion=Ausführen
    --------------------- k3s Status ---------------------
    
      Lokal (127.0.0.1): Zweiter Dienst (Service: Verfügbar) (Farbe: Grün)
    Erfolg
    

### 6. Starten Sie die Webkonsole SafeKit , um den Cluster zu verwalten. {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Stellen Sie eine Verbindung zwischen einem Browser und der Webkonsolen-URL SafeKit `http://server0-IP:9010` her.
  * Sie sollten eine Seite sehen, die dem Bild ähnelt.
  * Prüfen Sie mit den Befehlszeilen Linux , ob K3S auf beiden Knoten gestartet wurde (gestartet in `start_prim` und `start_second` ) und ob MariaDB auf dem primären Knoten gestartet wurde (gestartet in `start_prim` ).


Der Cluster ![ Kubernetes wurde in der Webkonsole SafeKit ](/wp-content/uploads/2024/03/14-monitoring-prim-second.png) gestartet.


### 7. Testen {#7-testing}

  * Den PRIM-Knoten stoppen, indem Sie im Kontextmenü nach unten scrollen und auf `Stop` klicken.
  * Überprüfen Sie, ob auf dem ZWEITEN Knoten ein Failover erfolgt ist, der dadurch ALLEIN (grün) werden sollte.
  * Überprüfen Sie mithilfe der Befehlszeilen auf Linux das Failover der Dienste (die im Skript `stop_prim` auf Knoten 1 gestoppt und im Skript `start_prim` auf Knoten 2 gestartet wurden). MariaDB und K3S sollten auf Knoten 2 ausgeführt werden.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Wenn der Zustand ALONE (grün) auf Knoten 2 nicht erreicht wird, analysieren Sie die Ursache mithilfe des Modulprotokolls von Knoten 2.

  * Klicken Sie auf `node2` , um das Modulprotokoll anzuzeigen.
  * Beispiel eines Modulprotokolls [ ) des Moduls SQL Server ](</wp-content/uploads/2024/03/24-module-log-script.png>) der Dienstname in `start_prim` ungültig ist. Der Prozess sqlserver.exe wird überwacht, da er jedoch nicht gestartet wird, wird das Modul schließlich beendet.


![ Warnung ](/wp-content/uploads/2022/07/warning-small.png)


Wenn alles in Ordnung ist, starten Sie den Vorgang auf Knoten 1, wodurch die replizierten Verzeichnisse von Knoten 2 neu synchronisiert werden.

Falls etwas schiefgeht, stoppen Sie Knoten 2 und erzwingen Sie [ den Start von Knoten 1 als primären Knoten ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) , der dann mit den zum Zeitpunkt des Stopps lokal intakten Daten neu startet.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


🛠️ [ Weitere Informationen zu den Tests finden Sie im Benutzerhandbuch. ](</de/resources/safekit-user-guide-82/#tests>)


![ Stoppen Sie das Modul auf dem PRIM-Server ](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Testen Sie den Cluster mit einer Kubernetes -Anwendung wie WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

Das Bild zeigt ein Beispiel einer WordPress-Installation: ein Webportal mit einer Backend-Datenbank, die durch Pods implementiert ist.

Sie können Ihre eigene Anwendung auf die gleiche Weise bereitstellen.

WordPress ist automatisch hochverfügbar:

  * mit seinen Daten (PHP + Datenbank) in persistenten Volumes, die in Echtzeit von SafeKit repliziert werden.
  * mit einer virtuellen IP-Adresse, um Benutzern den Zugriff auf die WordPress-Website zu ermöglichen
  * mit automatischem Failover und automatischem Failback


Anmerkungen:

  * Das WordPress-Diagramm definiert einen Load-Balancing-Dienst, der auf den Ports <service.port> und <service.httpsport> lauscht.
  * WordPress ist über die URL erreichbar: `http://<virtual-ip>:<service.port>.`
  * Die virtuelle IP-Adresse wird von SafeKit verwaltet und im Falle eines Failovers automatisch umgeschaltet.
  * Standardmäßig verwendet K3S Load Balancer mit Klipper.
  * Klipper lauscht auf <virtual ip> : <service.port> und leitet die TCP/IP-Pakete an die IP-Adresse und den Port des ausgewählten WordPress-Pods weiter.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

Der vorherige Helm-Befehl sollte das WordPress-Image von `registry-1.docker.io` herunterladen. Möglicherweise treten Authentifizierungsprobleme auf `registry-1.docker.io` auf. In diesem Fall sollten Sie Folgendes tun:

  * Erstelle `/etc/rancher/k3s/registries.yaml` auf beiden Knoten mit folgendem Inhalt: 
        
        Konfigurationen:
          "registry-1.docker.io":
            Authentifizierung:
              Benutzername: Ihr_Benutzername
              Passwort: Ihr_Passwort
            tls:
              insecure_skip_verify: true
        

  * Um dies zu berücksichtigen, stoppen und starten Sie k3s mit `systemctl stop k3s` und `systemctl start k3s` .
  * Führen Sie `helm registry login -u your_user_name docker.io` aus und geben Sie anschließend Ihr Passwort ein.


### 9. Unterstützung {#9-support}

  * Für den Support benötigen Sie 2 SafeKit `Snapshots` (2 .zip-Dateien), eine für jeden Knoten.


![ Hinweis ](/wp-content/uploads/2022/07/note.png)


🛠️ [ Fehlerbehebung im Benutzerhandbuch. ](</de/resources/safekit-user-guide-82/#Troubleshooting>)


![ Nehmen Sie die Schnappschüsse zur Unterstützung ](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Konfigurieren Sie gegebenenfalls einen Splitbrain-Checker {#10-if-necessary-configure-a-splitbrain-checker}

  * Siehe unten [ "Welche verschiedenen Szenarien gibt es bei Netzwerkisolation in einem Cluster?" ](#isolation) um zu erfahren, ob Sie einen Split-Brain-Checker konfigurieren müssen.
  * Klicken Sie in der Modulkonfiguration auf `Advanced Configuration` (siehe Abbildung), um `userconfig.xml` zu bearbeiten.
  * Deklarieren Sie den Splitbrain-Checker, indem Sie ihn im Abschnitt `<check>` von `userconfig.xml` hinzufügen: 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` die neue Konfiguration zum erneuten Bereitstellen der geänderten Datei userconfig.xml auf beiden Knoten (das Modul muss auf beiden Knoten gestoppt werden, um zu speichern und anzuwenden).


**Parameter** :

  * `ident="witness"` identifiziert den Zeugen mit dem Ressourcennamen: `splitbrain.witness` . Sie können diesen Wert ändern, um den Zeugen zu identifizieren.
  * `exec="ping"` verweist auf den auszuführenden Ping-Code. Ändern Sie diesen Wert nicht.
  * `arg="witness IP"` ist ein Argument für den Ping. Ersetzen Sie diesen Wert durch die IP-Adresse des Zeugen (eines robusten Elements, typischerweise ein Router).


![ Geben Sie die Parameter ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-de  %}}
 

## Demonstration der Lösung SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}