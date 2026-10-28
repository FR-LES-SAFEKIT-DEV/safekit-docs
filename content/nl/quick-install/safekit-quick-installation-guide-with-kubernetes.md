---
title: "K3S High Availability met SafeKit : Installeer de k3s.safe -module voor failover."
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Implementeer de k3s.safe module voor SafeKit om synchrone realtime-replicatie en automatische failover van Kubernetes op Linux mogelijk te maken. Deze handleiding beschrijft hoe u een SANless-cluster met twee knooppunten opzet voor kritieke Linux toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor hoge beschikbaarheid voor Kubernetes , Beperkingen van hoge beschikbaarheid SafeKit , Overzicht van de SafeKit / Kubernetes -oplossing, Installatie en configuratie van de SafeKit / Kubernetes oplossing op Linux ( k3s.safe ), Wat zijn de verschillende scenario's bij netwerkisolatie in een cluster?, Demonstratie van de SafeKit mirror -oplossing, 🔍 SafeKit Navigatiehub voor hoge beschikbaarheid"
---

# K3S High Availability met SafeKit : Installeer de k3s.safe module voor failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Kubernetes" mod="k3s"  %}}
 

## Overzicht van de SafeKit / Kubernetes -oplossing {#overview-of-the-safekit--kubernetes-solution}

De oplossing wordt hier beschreven: ** 💡 [ Kubernetes K3s High Availability: 2-Node Synchronous Replication & Failover ](</solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>) **

## Installatie en configuratie van de SafeKit / Kubernetes oplossing op Linux ( k3s.safe ) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Download pakketten {#1-download-packages}

  * Download de gratis versie van SafeKit 8.2 op Linux (safekitlinux_xx.bin)
  * Download de k3s.safe Linux -module
  * Download het k3sconfig.sh -script
  * Documentatie (pptx)


Opmerking: het k3sconfig.sh script installeert K3S, MariaDB , NFS en SafeKit op 2 Linux Ubuntu 24.04-nodes.

[ Download SafeKit ( Linux ) > ](</nl/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe"> Download k3s.safe ( Linux ) > </a> 

[ Download k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

Documentatie [ (pdf) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Eerst op beide knooppunten {#2-first-on-both-nodes}

Op 2 Linux Ubuntu 24.04-nodes, als root:

  * Zorg ervoor dat het knooppunt internettoegang heeft (dit kan via een proxy).
  * Kopieer k3sconfig.sh , k3s.safe en het safekit_xx.bin-pakket naar een map en ga naar die map met het commando `cd`.
  * Hernoem het .bin-bestand naar "safekit.bin".
  * Zorg ervoor k3sconfig.sh en safekit.bin uitvoerbaar zijn.
  * Bewerk het k3sconfig.sh -script en pas de omgevingsvariabelen aan uw omgeving aan (inclusief een virtueel IP-adres).
  * Voer op beide knooppunten het volgende commando uit: `./k3sconfig.sh prereq`


Het script zal:

  * Installeer de benodigde Debian-pakketten: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Veilige installatie van MariaDB
  * Maak mappen aan voor bestandsreplicatie.
  * Bereid de NFS-server voor op het delen van gerepliceerde mappen.
  * Installeer SafeKit


### 3. Op het eerste knooppunt {#3-on-the-first-node}

Voer op het eerste knooppunt het volgende commando uit: `./k3sconfig.sh first`

Het script zal:

  * Maak de K3S-configuratiedatabase en de k3s-gebruiker aan.
  * Maak het bestand voor het gerepliceerde opslagvolume (sparse file) aan en formatteer het als een xfs-bestandssysteem.
  * Maak de SafeKit-clusterconfiguratie aan en pas deze toe.
  * Installeer en configureer de k3s.safe -module op het cluster.
  * Start de k3s-module als "prim" op het eerste knooppunt.
  * Download, installeer en start k3s.
  * Download en installeer de nfs-subdir-external-provisioner Helm-grafiek.
  * Toon het K3S-token (te gebruiken tijdens de tweede installatiefase van het knooppunt).


### 4. Op het tweede knooppunt {#4-on-the-second-node}

Voer op het tweede knooppunt het volgende commando uit: `./k3sconfig.sh second <token>`

  * <token> is de tekenreeks die wordt weergegeven aan het einde van de uitvoering van " k3sconfig.sh first" op het eerste knooppunt.


Het script zal:

  * Zorg ervoor dat de k3s-module als prim wordt gestart op het eerste knooppunt.
  * Installeer k3s op het tweede knooppunt.
  * Start de k3s-module


### 5. Controleer of de k3s SafeKit module op beide knooppunten {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes} actief is.

Controleer dit op beide knooppunten met het volgende commando: `/opt/safekit/safekit –H "*" state`

Het antwoord moet overeenkomen met de afbeelding.
    
    
    /opt/safekit/safekit –H " * " toestand
    ---------------- Server= http://10.0.0.20:9010 ----------------
    beheerdersactie=uitvoeren
    --------------------- k3s Status ---------------------
    
      Lokaal (127.0.0.1): PRIM (Service: Beschikbaar) (Kleur: Groen)
    Succes
    ---------------- Server= http://10.0.0.21:9010 ----------------
    beheerdersactie=uitvoeren
    --------------------- k3s Status ---------------------
    
      Lokaal (127.0.0.1): SECOND (Service: Beschikbaar) (Kleur: Groen)
    Succes
    

### 6. Start de webconsole SafeKit om het cluster {#6-start-the-safekit-web-console-to-administer-the-cluster} te beheren.

  * Verbind een browser met de webconsole-URL `http://server0-IP:9010` SafeKit .
  * Je zou een pagina moeten zien die lijkt op de afbeelding.
  * Controleer met de commandoregels Linux of K3S op beide knooppunten is gestart (gestart in `start_prim` en `start_second` ) en of MariaDB op het primaire knooppunt is gestart (gestart in `start_prim` ).


![ Kubernetes cluster gestart in de SafeKit webconsole ](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Testen van {#7-testing}

  * Stop het PRIM-knooppunt door in het contextmenu naar beneden te scrollen en op `Stop` te klikken.
  * Controleer of er een failover plaatsvindt op het TWEEDE knooppunt, dat ALONE (groen) moet worden.
  * Controleer vervolgens met behulp van de commandoregels op Linux de failover van de services (gestopt op knooppunt 1 in het `stop_prim` -script en gestart op knooppunt 2 in het `start_prim` -script). MariaDB en K3S zouden op knooppunt 2 moeten draaien.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als ALONE (groen) niet wordt bereikt op knooppunt 2, analyseer dan de oorzaak aan de hand van het modulelogboek van knooppunt 2.

  * Klik op `node2` om het modulelogboek weer te geven.
  * Voorbeeld van [ : een logboek van de module SQL Server Logboek van ](</wp-content/uploads/2024/03/24-module-log-script.png>) : de servicenaam in `start_prim` is ongeldig. Het proces sqlserver.exe wordt bewaakt, maar omdat het niet is gestart, stopt de module uiteindelijk.


![ Waarschuwing ](/wp-content/uploads/2022/07/warning-small.png)


Als alles in orde is, start dan het proces op node1. Hierdoor worden de gerepliceerde mappen van node2 opnieuw gesynchroniseerd.

Als er iets misgaat, stop dan node2 en [ forceer de start als primaire ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) van node1, die opnieuw opstart met de lokaal gezonde gegevens die op het moment van de stop beschikbaar zijn.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


🛠️ [ Meer informatie over tests vindt u in de gebruikershandleiding. ](</resources/safekit-user-guide-82/#tests>)


![ Stop de module op de PRIM-server ](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Test het cluster met een Kubernetes -applicatie zoals WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

In de afbeelding ziet u een voorbeeld van een WordPress-installatie: een webportaal met een backend-database die is geïmplementeerd met behulp van pods.

Je kunt je eigen applicatie op dezelfde manier implementeren.

WordPress is van nature zeer beschikbaar:

  * met zijn gegevens (php + database) in persistente volumes die in realtime worden gerepliceerd door SafeKit
  * met een virtueel IP-adres om gebruikers toegang te geven tot de WordPress-site.
  * met automatische failover en automatische failback


Opmerkingen:

  * De WordPress-grafiek definieert een load-balanced service die luistert op de poorten <service.port> en <service.httpsport> .
  * WordPress is toegankelijk via de URL: `http://<virtual-ip>:<service.port>.`
  * Het virtuele IP-adres wordt beheerd door SafeKit en wordt automatisch overgeschakeld in geval van failover.
  * Standaard implementeert K3S load balancers met Klipper.
  * Klipper luistert op <virtual ip> : <service.port> en routeert de TCP/IP-pakketten naar het IP-adres en de poort van de WordPress-pod die het heeft geselecteerd.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

Het vorige helm-commando zou de WordPress-image moeten downloaden van `registry-1.docker.io` . Mogelijk ondervindt u authenticatieproblemen op `registry-1.docker.io` . In dat geval dient u het volgende te doen:

  * Maak `/etc/rancher/k3s/registries.yaml` op beide knooppunten met daarin: 
        
        configuraties:
          "registry-1.docker.io":
            auth:
              gebruikersnaam: jouw_gebruikersnaam
              wachtwoord: uw_wachtwoord
            tls:
              insecure_skip_verify: true
        

  * Stop en start k3s om hiermee rekening te houden, met `systemctl stop k3s` en `systemctl start k3s` .
  * Voer `helm registry login -u your_user_name docker.io` uit en voer vervolgens uw wachtwoord in.


### 9. Ondersteuning {#9-support}

  * Om ondersteuning te krijgen, downloadt u 2 SafeKit `Snapshots` (2 .zip-bestanden), één voor elke node.


![ Opmerking ](/wp-content/uploads/2022/07/note.png)


🛠️ Probleemoplossing voor [ in de gebruikershandleiding. ](</resources/safekit-user-guide-82/#Troubleshooting>)


![ Maak de screenshots ter ondersteuning ](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Configureer indien nodig een splitbrain-checker {#10-if-necessary-configure-a-splitbrain-checker}

  * Zie hieronder [ "Wat zijn de verschillende scenario's bij netwerkisolatie in een cluster?" ](#isolation) om te weten of u een splitbrain-checker moet configureren.
  * Klik in de moduleconfiguratie op `Advanced Configuration` (zie afbeelding) om `userconfig.xml` te bewerken.
  * Declareer de splitbrain-checker door het volgende toe te voegen aan het `<check>` -gedeelte van `userconfig.xml` : 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` de nieuwe configuratie om het gewijzigde userconfig.xml -bestand op beide knooppunten opnieuw te implementeren (de module moet op beide knooppunten gestopt zijn om op te slaan en toe te passen).


** Parameters ** :

  * `ident="witness"` identificeert de witness met een resourcenaam: `splitbrain.witness` . U kunt deze waarde wijzigen om de witness te identificeren.
  * `exec="ping"` verwijst naar de uit te voeren pingcode. Wijzig deze waarde niet.
  * `arg="witness IP"` is een argument voor de ping. Vervang deze waarde door het IP-adres van de witness (een robuust element, meestal een router).


![ Voer de parameters in ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-nl  %}}
 

## Demonstratie van de SafeKit mirror oplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}