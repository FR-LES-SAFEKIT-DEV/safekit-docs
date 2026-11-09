---
title: "K3S Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul k3s.safe für Failover"
canonical: "https://safekit.eviden.com/de/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Setzen Sie das k3s.safe-Modul für SafeKit ein, um die synchrone Echtzeitreplikation und das automatische Failover von Kubernetes unter Linux zu ermöglichen. Diese Anleitung führt Sie durch die Einrichtung eines SANless-Clusters mit 2 Knoten für kritische Linux Anwendungen ohne gemeinsam genutzten Speicher."
category: "quick-install"
lang: "de"
topics: "Schnellinstallationsanleitung für Hochverfügbarkeit in Kubernetes, Einschränkungen SafeKit Hochverfügbarkeit, Übersicht über die SafeKit/Kubernetes-Lösung, Installation und Konfiguration der SafeKit/Kubernetes-Lösung unter Linux (k3s.safe), Welche verschiedenen Szenarien gibt es bei Netzwerktrennung in einem Cluster?, Demonstration der SafeKit mirror, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 40 expressions"
---

# K3S Hochverfügbarkeit mit SafeKit: Installieren Sie das Modul k3s.safe für Failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-de app="Kubernetes" mod="k3s"  %}}
 

## Übersicht über die SafeKit/Kubernetes-Lösung {#overview-of-the-safekit--kubernetes-solution}

Die Lösung wird hier beschrieben: **💡 [Kubernetes K3s Hochverfügbarkeit: Synchrone Replikation und Failover mit 2 Knoten](</de/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Installation und Konfiguration der SafeKit/Kubernetes-Lösung unter Linux (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Pakete herunterladen {#1-download-packages}

  * Laden Sie die kostenlose Version von SafeKit 8.2 für Linux (safekitlinux_xx.bin) herunter
  * Laden Sie das k3s.safe Linux-Modul herunter
  * Laden Sie das Skript k3sconfig.sh herunter
  * Dokumentation (pptx)


Hinweis: Das Skript k3sconfig.sh installiert K3S, MariaDB, NFS und SafeKit auf 2 Linux Ubuntu 24.04-Knoten.

[SafeKit (Linux) herunterladen >](</de/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">k3s.safe (Linux) herunterladen ></a> 

[k3sconfig.sh herunterladen >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[Dokumentation (PDF) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Zuerst auf beiden Knoten {#2-first-on-both-nodes}

Auf 2 Linux Ubuntu 24.04-Knoten als Root:

  * Stellen Sie sicher, dass der Knoten über Internetzugang verfügt (dies kann auch über einen Proxy erfolgen)
  * Kopieren Sie k3sconfig.sh, k3s.safe und das Paket safekit_xx.bin in ein Verzeichnis und wechseln Sie mit cd in dieses Verzeichnis
  * Benennen Sie die .bin-Datei in „safekit.bin“ um
  * Stellen Sie sicher, k3sconfig.sh und safekit.bin ausführbar sind.
  * Bearbeiten Sie das Skript k3sconfig.sh und passen Sie die Umgebungsvariablen an Ihre Umgebung an (einschließlich einer virtuellen IP-Adresse)
  * Auf beiden Knoten ausführen: `./k3sconfig.sh prereq`


Das Skript wird:

  * Installieren Sie die erforderlichen Debian-Pakete: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Sichere MariaDB-Installation
  * Verzeichnisse für die Dateireplikation erstellen
  * Bereiten Sie den NFS-Server für die gemeinsame Nutzung replizierter Verzeichnisse vor
  * SafeKit installieren


### 3. Auf dem ersten Knoten {#3-on-the-first-node}

Auf dem ersten Knoten ausführen: `./k3sconfig.sh first`

Das Skript wird:

  * Erstellen Sie die K3S-Konfigurationsdatenbank und den K3S-Benutzer
  * Erstellen Sie die Replikationsspeichervolumendatei (Sparse-Datei) und formatieren Sie sie als xfs-Dateisystem
  * Erstellen Sie die Safekit-Clusterkonfiguration und wenden Sie sie an
  * Installieren und konfigurieren Sie das k3s.safe-Modul auf dem Cluster
  * Starten Sie das k3s-Modul als „prim“ auf dem ersten Knoten
  * k3s herunterladen, installieren und starten
  * Laden Sie das Helm-Chart „nfs-subdir-external-provisioner“ herunter und installieren Sie es
  * K3S-Token anzeigen (wird während der zweiten Installationsphase des Knotens verwendet)


### 4. Auf dem zweiten Knoten {#4-on-the-second-node}

Auf dem zweiten Knoten ausführen: `./k3sconfig.sh second <token>`

  * <token> ist die Zeichenfolge, die am Ende der Ausführung von „ k3sconfig.sh first“ auf dem ersten Knoten angezeigt wird


Das Skript wird:

  * Stellen Sie sicher, dass das k3s-Modul als prim auf dem ersten Knoten gestartet wird
  * Installieren Sie k3s auf dem zweiten Knoten
  * Starten Sie das k3s-Modul


### 5. Überprüfen Sie, ob das k3s SafeKit Modul auf beiden Knoten läuft {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Überprüfen Sie dies mit diesem Befehl auf beiden Knoten: `/opt/safekit/safekit –H "*" state`

Die Antwort sollte dem Bild ähneln.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- Server= http://10.0.0.20:9010 ----------------
    admin action=exec
    --------------------- k3s-Status ---------------------
    
      Lokal (127.0.0.1): PRIM (Dienst: Verfügbar) (Farbe: Grün)
    Erfolg
    ---------------- Server= http://10.0.0.21:9010 ----------------
    admin action=exec
    --------------------- k3s-Status ---------------------
    
      Lokal (127.0.0.1): SECOND (Dienst: Verfügbar) (Farbe: Grün)
    Erfolg
    

### 6. Starten Sie die SafeKit Webkonsole, um den Cluster zu verwalten {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Verbinden Sie einen Browser mit der SafeKit-Webkonsolen-URL `http://server0-IP:9010`.
  * Sie sollten eine Seite sehen, die dem Bild ähnelt.
  * Überprüfen Sie mit Linux-Befehlszeilen, ob K3S auf beiden Knoten gestartet wurde (gestartet in `start_prim` und `start_second`) und ob MariaDB auf dem primären Knoten gestartet wurde (gestartet in `start_prim`).


![Kubernetes Cluster in der SafeKit Webkonsole gestartet](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Testen {#7-testing}

  * Stoppen Sie den PRIM-Knoten, indem Sie im Kontextmenü nach unten scrollen und auf `Stop` klicken.
  * Überprüfen Sie, ob auf dem SECOND Knoten ein Failover stattfindet, der ALONE (grün) sein sollte.
  * Überprüfen Sie mit Befehlszeilen unter Linux das Failover von Diensten (gestoppt auf Knoten 1 im `stop_prim`-Skript und gestartet auf Knoten 2 im `start_prim`-Skript). MariaDB und K3S sollten auf node2 laufen.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn ALONE (grün) auf node2 nicht erreicht wird, analysieren Sie dies mit dem Modulprotokoll von Knoten 2.

  * Klicken Sie auf `node2`, um das Modulprotokoll anzuzeigen.
  * [Beispiel für ein SQL Server-Modulprotokoll,](</wp-content/uploads/2024/03/24-module-log-script.png>) bei dem der Dienstname in `start_prim` ungültig ist. Der sqlserver.exe-Prozess wird überwacht, aber da er nicht gestartet wird, stoppt das Modul am Ende.


![Warnung](/wp-content/uploads/2022/07/warning-small.png)


Wenn alles in Ordnung ist, starten Sie einen Start auf node1, wodurch die replizierten Verzeichnisse von node2 erneut synchronisiert werden.

Wenn etwas schiefgeht, stoppen Sie node2 und [erzwingen Sie den Start](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) von node1 als primären Knoten, der mit seinen lokal intakten Daten zum Zeitpunkt des Stopps neu gestartet wird.


![Hinweis](/wp-content/uploads/2022/07/note.png)


🛠️ [Weitere Informationen zu den Tests finden Sie im Benutzerhandbuch.](</de/resources/safekit-user-guide-82/#tests>)


![Stoppen Sie das Modul auf dem PRIM-Server](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Testen Sie den Cluster mit einer Kubernetes-Anwendung wie WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

Im Bild sehen Sie das Beispiel einer WordPress-Installation: ein Webportal mit einer Backend-Datenbank, die durch Pods implementiert wird.

Sie können Ihre eigene Anwendung auf dieselbe Weise bereitstellen.

WordPress ist automatisch hochverfügbar:

  * mit seinen Daten (PHP + Datenbank) in persistenten Volumes, die von SafeKit in Echtzeit repliziert werden
  * mit einer virtuellen IP-Adresse für den Zugriff auf die WordPress-Website für Benutzer
  * mit automatischem Failover und automatischer Failback


Anmerkungen:

  * Das WordPress-Chart definiert einen Lastausgleichsdienst, der auf den Ports <service.port> und <service.httpsport> lauscht.
  * WordPress ist über die URL `http://<virtual-ip>:<service.port>.`
  * Die virtuelle IP-Adresse wird von SafeKit verwaltet und im Falle eines Failovers automatisch umgeschaltet.
  * Standardmäßig implementiert K3S Load Balancer mit Klipper.
  * Klipper lauscht auf <virtual ip>: <service.port> und leitet die TCP/IP-Pakete an die IP-Adresse und den Port des von ihm ausgewählten WordPress-Pods weiter.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

Der vorherige Helm-Befehl sollte das WordPress-Image von `registry-1.docker.io` herunterladen. Möglicherweise treten bei `registry-1.docker.io`. Authentifizierungsprobleme auf. In diesem Fall sollten Sie Folgendes tun:

  * Erstellen Sie auf beiden Knoten `/etc/rancher/k3s/registries.yaml` mit folgendem Inhalt: 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * Stoppen und starten Sie k3s, um dies zu berücksichtigen, mit `systemctl stop k3s` und `systemctl start k3s`.
  * Führen Sie `helm registry login -u your_user_name docker.io` aus und geben Sie dann Ihr Passwort ein


### 9. Unterstützung {#9-support}

  * Um Unterstützung zu erhalten, erstellen Sie 2 SafeKit `Snapshots` (2 .zip-Dateien), einen für jeden Knoten.


![Hinweis](/wp-content/uploads/2022/07/note.png)


🛠️ [Fehlerbehebung im Benutzerhandbuch.](</de/resources/safekit-user-guide-82/#Troubleshooting>)


![Machen Sie Screenshots zur Unterstützung](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Konfigurieren Sie bei Bedarf einen Split-Brain-Checker {#10-if-necessary-configure-a-splitbrain-checker}

  * Siehe unten [„Welche verschiedenen Szenarien gibt es bei Netzwerktrennung in einem Cluster?“,](#isolation) um zu erfahren, ob Sie einen Split-Brain-Checker konfigurieren müssen.
  * Klicken Sie in der Modulkonfiguration auf `Advanced Configuration` (siehe Abbildung), um `userconfig.xml` zu bearbeiten.
  * Deklarieren Sie den Split-Brain-Checker, indem Sie ihn im Abschnitt `<check>` der `userconfig.xml` hinzufügen: 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` die neue Konfiguration an, um die geänderte Datei userconfig.xml auf beiden Knoten erneut bereitzustellen (das Modul muss auf beiden Knoten gestoppt werden, um zu speichern und anzuwenden).


**Parameter**:

  * `ident="witness"` identifiziert den Witness mit einem Ressourcennamen: `splitbrain.witness`. Sie können diesen Wert ändern, um den Witness zu identifizieren.
  * `exec="ping"` verweist auf den auszuführenden Ping-Code. Ändern Sie diesen Wert nicht.
  * `arg="witness IP"` ist ein Argument für den Ping. Ändern Sie diesen Wert mit der IP-Adresse des Zeugen (ein robustes Element, typischerweise ein Router).


![Geben Sie die Parameter ein](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-de  %}}
 

## Demonstration der SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}