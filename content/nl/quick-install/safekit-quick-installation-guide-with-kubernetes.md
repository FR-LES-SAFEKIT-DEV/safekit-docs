---
title: "K3S hoge beschikbaarheid met SafeKit: Installeer de k3s.safe module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Implementeer de k3s.safe module voor SafeKit om synchrone realtime replicatie en automatische failover van Kubernetes op Linux mogelijk te maken. Deze handleiding begeleidt u bij het opzetten van een SANless-cluster met 2 knooppunten voor bedrijfskritieke Linux toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Kubernetes, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Kubernetes-oplossing, Installatie en configuratie van de SafeKit/Kubernetes-oplossing op Linux (k3s.safe), Wat zijn de verschillende scenario's in geval van netwerkisolatie in een cluster?, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# K3S hoge beschikbaarheid met SafeKit: Installeer de k3s.safe module voor failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Kubernetes" mod="k3s"  %}}
 

## Overzicht van de SafeKit/Kubernetes-oplossing {#overview-of-the-safekit--kubernetes-solution}

De oplossing wordt hier beschreven: **💡 [Kubernetes K3s hoge beschikbaarheid: synchrone replicatie en failover met 2 knooppunten](</nl/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Installatie en configuratie van de SafeKit/Kubernetes-oplossing op Linux (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Pakketten downloaden {#1-download-packages}

  * Download de gratis versie van SafeKit 8.2 voor Linux (safekitlinux_xx.bin)
  * Download de k3s.safe Linux module
  * Download het k3sconfig.sh-script
  * Documentatie (pptx)


Opmerking: het script k3sconfig.sh installeert K3S, MariaDB, NFS en SafeKit op 2 Linux Ubuntu 24.04-knooppunten.

[SafeKit (Linux) downloaden >](</nl/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">k3s.safe downloaden (Linux) ></a> 

[k3sconfig.sh downloaden >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[Documentatie (pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Eerst op beide knooppunten {#2-first-on-both-nodes}

Op 2 Linux Ubuntu 24.04-knooppunten, als root:

  * Zorg ervoor dat het knooppunt internettoegang heeft (dit kan via een proxy zijn)
  * Kopieer k3sconfig.sh, k3s.safe en het safekit_xx.bin-pakket naar een map en ga ernaartoe met cd
  * Hernoem het .bin-bestand naar "safekit.bin"
  * Zorg ervoor k3sconfig.sh en safekit.bin uitvoerbaar zijn.
  * Bewerk het k3sconfig.sh script en pas de omgevingsvariabelen aan uw omgeving aan (inclusief een virtueel IP-adres)
  * Voer op beide knooppunten uit: `./k3sconfig.sh prereq`


Het script zal:

  * Installeer de vereiste Debian-pakketten: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Beveiligde MariaDB-installatie
  * Mappen aanmaken voor bestandsreplicatie
  * Bereid de NFS-server voor op het delen van gerepliceerde mappen
  * SafeKit installeren


### 3. Op het eerste knooppunt {#3-on-the-first-node}

Voer uit op het eerste knooppunt: `./k3sconfig.sh first`

Het script zal:

  * De K3S-configuratiedatabase en de k3s-gebruiker aanmaken
  * Maak het gerepliceerde opslagvolumebestand (sparse file) aan en formatteer het als een xfs-bestandssysteem
  * Maak de safekit-clusterconfiguratie aan en pas deze toe
  * Installeer en configureer de k3s.safe module op het cluster
  * Start de k3s-module als "prim" op de eerste node
  * k3s downloaden, installeren en starten
  * Download en installeer de Helm-chart van nfs-subdir-external-provisioner
  * K3S token weergeven (te gebruiken tijdens de installatiefase van het tweede knooppunt)


### 4. Op de tweede node {#4-on-the-second-node}

Voer uit op het tweede knooppunt: `./k3sconfig.sh second <token>`

  * <token> is de tekenreeks die wordt weergegeven aan het einde van de uitvoering van " k3sconfig.sh first" op de eerste node


Het script zal:

  * Zorg ervoor dat de k3s-module als prim wordt gestart op het eerste knooppunt
  * Installeer k3s op de tweede node
  * Start de k3s-module


### 5. Controleer of de k3s SafeKit module op beide knooppunten draait {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Controleer dit met deze opdracht op beide knooppunten: `/opt/safekit/safekit –H "*" state`

Het antwoord moet vergelijkbaar zijn met de afbeelding.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- Server= http://10.0.0.20:9010 ----------------
    admin action=exec
    --------------------- k3s-status ---------------------
    
      Lokaal (127.0.0.1): PRIM (Service: Beschikbaar) (Kleur: Groen)
    Succes
    ---------------- Server= http://10.0.0.21:9010 ----------------
    admin action=exec
    --------------------- k3s-status ---------------------
    
      Lokaal (127.0.0.1): SECOND (Service: Beschikbaar) (Kleur: Groen)
    Succes
    

### 6. Start de SafeKit webconsole om het cluster te beheren {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Maak verbinding met de SafeKit webconsole via de URL `http://server0-IP:9010`.
  * U zou een pagina moeten zien die lijkt op de afbeelding.
  * Controleer met Linux opdrachtregels of K3S op beide knooppunten is gestart (gestart in `start_prim` en `start_second`) en dat MariaDB is gestart op het primaire knooppunt (gestart in `start_prim`).


![Kubernetes cluster gestart in de SafeKit webconsole](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Testen {#7-testing}

  * Stop de PRIM node door in het contextmenu naar beneden te scrollen en `Stop` te klikken.
  * Controleer of er een failover is op het SECOND knooppunt, dat ALONE (groen) zou moeten worden.
  * Controleer met de opdrachtregels op Linux de failover van services (gestopt op node 1 in het `stop_prim`-script en gestart op node 2 in het `start_prim` script). MariaDB en K3S moeten op node2 draaien.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als ALONE (groen) niet wordt bereikt op node2, analyseer dan waarom met het modullogboek van node 2.

  * Klik op `node2` om het modulelogboek weer te geven.
  * [Voorbeeld van een SQL Server-moduillogboek](</wp-content/uploads/2024/03/24-module-log-script.png>) waarin de servicenaam in `start_prim` ongeldig is. Het proces sqlserver.exe wordt gemonitord, maar omdat het niet wordt gestart, stopt de module uiteindelijk.


![Waarschuwing](/wp-content/uploads/2022/07/warning-small.png)


Als alles in orde is, start u node1 op, die de gerepliceerde mappen van node2 opnieuw synchroniseert.

Als er iets misgaat, stop dan node2 en [forceer de start als primair](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) van node1, die opnieuw zal opstarten met zijn lokaal gezonde gegevens op het moment van de stop.


![Opmerking](/wp-content/uploads/2022/07/note.png)


🛠️ [Meer informatie over de tests vindt u in de gebruikershandleiding.](</nl/resources/safekit-user-guide-82/#tests>)


![Stop de module op de PRIM server](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Probeer het cluster met een Kubernetes-applicatie zoals WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

In de afbeelding ziet u het voorbeeld van een WordPress-installatie: een webportaal met een backend-database die is geïmplementeerd door pods.

U kunt uw eigen applicatie op dezelfde manier implementeren.

WordPress is automatisch zeer beschikbaar:

  * met zijn gegevens (php + database) in persistente volumes die in realtime worden gerepliceerd door SafeKit
  * met een virtueel IP-adres om toegang te krijgen tot de WordPress-site voor gebruikers
  * met automatische failover en automatische failback


Opmerkingen:

  * De WordPress-chart definieert een load-balanced service die luistert op poorten <service.port> en <service.httpsport>.
  * WordPress is toegankelijk via de URL: `http://<virtual-ip>:<service.port>.`
  * Het virtuele IP-adres wordt beheerd door SafeKit en wordt automatisch overgeschakeld in geval van een failover.
  * Standaard implementeert K3S load balancers met Klipper.
  * Klipper luistert op <virtual ip>: <service.port> en stuurt de TCP/IP-pakketten door naar het IP-adres en de poort van de WordPress-pod die het heeft geselecteerd.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

De vorige helm-opdracht zou de WordPress-image moeten downloaden van `registry-1.docker.io`. Mogelijk ondervindt u authenticatieproblemen op `registry-1.docker.io`. In dat geval moet u het volgende doen:

  * Maak `/etc/rancher/k3s/registries.yaml` aan op beide nodes met de volgende inhoud: 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * Stop en start k3s om dit door te voeren, met `systemctl stop k3s` en `systemctl start k3s`.
  * Voer `helm registry login -u your_user_name docker.io` uit en voer vervolgens uw wachtwoord in


### 9. Ondersteuning {#9-support}

  * Om ondersteuning te krijgen, maakt u 2 SafeKit `Snapshots` (2 .zip-bestanden), één voor elke node.


![Opmerking](/wp-content/uploads/2022/07/note.png)


🛠️ [Probleemoplossing in de gebruikershandleiding.](</nl/resources/safekit-user-guide-82/#Troubleshooting>)


![Maak screenshots ter ondersteuning](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Configureer indien nodig een split-brain-checker {#10-if-necessary-configure-a-splitbrain-checker}

  * Zie hieronder ["Wat zijn de verschillende scenario's in geval van netwerkisolatie in een cluster?"](#isolation) om te weten of u een split-brain-checker moet configureren.
  * Klik in de moduleconfiguratie op `Advanced Configuration` (zie afbeelding) om `userconfig.xml` te bewerken.
  * Declareer de split-brain-checker door deze toe te voegen aan de `<check>`-sectie van `userconfig.xml`: 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` om het gewijzigde userconfig.xml bestand opnieuw te implementeren op beide knooppunten (de module moet op beide knooppunten worden gestopt om op te slaan en toe te passen).


**Parameters**:

  * `ident="witness"` identificeert de witness met een resourcenaam: `splitbrain.witness`. U kunt deze waarde wijzigen om de witness te identificeren.
  * `exec="ping"` verwijst naar de pingcode die moet worden uitgevoerd. Wijzig deze waarde niet.
  * `arg="witness IP"` is een argument voor de ping. Wijzig deze waarde met het IP-adres van de witness (een robuust element, meestal een router).


![Voer de parameters in](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-nl  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}