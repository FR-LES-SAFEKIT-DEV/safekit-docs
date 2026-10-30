---
title: "SafeKit: hoge beschikbaarheidssoftware voor Windows en Linux, zonder SAN"
canonical: "https://safekit.eviden.com/nl/"
description: "SafeKit is de alles-in-één SANless-software voor hoge beschikbaarheid op Windows en Linux. Profiteer van realtime synchrone replicatie, automatische failover en load balancing in één eenvoudig, kosteneffectief pakket. Start uw gratis proefperiode van 30 dagen."
category: "home"
lang: "nl"
topics: "Wat SafeKit doet, Kies uw beschermingsniveau, Kant-en-klare modules voor uw toepassingen, Klanttoepassingen, Eenvoudige, voorspelbare prijzen, Ken de beperkingen voordat u begint, SafeKit-videobibliotheek, 🔍 SafeKit-navigatiehub voor hoge beschikbaarheid"
---

# SafeKit: hoge beschikbaarheidssoftware voor Windows en Linux, zonder SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit maakt van twee standaardservers een SANless-cluster met hoge beschikbaarheid dat uw toepassingen draaiend houdt. Het repliceert uw gegevens in realtime, start uw toepassing opnieuw op de tweede server als de eerste uitvalt en neemt de gerepareerde server automatisch weer op. U installeert het op uw bestaande servers, zonder gedeelde opslag of specialistische clusterkennis.

De replicatie is synchroon: bij een serverstoring gaan geen gegevens verloren en is uw toepassing binnen ongeveer een minuut of minder weer beschikbaar. Licenties zijn permanent en worden per server geprijsd.

<a class="btn-download" href="/nl/resources/safekit-free-trial/">Start uw gratis proefperiode van 30 dagen ›</a>

## Wat SafeKit doet {#features}

SafeKit combineert vier functies in één product, dat u op Windows en Linux beheert via één webconsole of opdrachtregel.

| Functie | Werking |
|---|---|
| **Realtime replicatie** | Elke wijziging in uw bestanden wordt direct naar de tweede server gekopieerd, zodat er bij een storing geen gegevens verloren gaan. |
| **Automatische failover** | SafeKit detecteert de storing, verplaatst het virtuele IP-adres en start de toepassing op de andere server opnieuw. |
| **Automatische failback** | De gerepareerde server synchroniseert op de achtergrond opnieuw terwijl de toepassing blijft draaien. |
| **Load balancing** | Netwerkloadbalancing draait op de servers zelf, zonder externe load balancer of proxy. |

![SafeKit-webconsole die een mirroringcluster met twee knooppunten voor Windows en Linux bewaakt, met de servers PRIM en SECOND en actieve gegevensreplicatie](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

U hebt geen SAN, quorumdisk, Active Directory of Enterprise-edities van uw besturingssysteem of database nodig.

<a class="btn-download" href="/nl/architectures/">Bekijk de clusterarchitecturen ›</a>

## Kies uw beschermingsniveau {#protection-levels}

**Applicatie-HA** (`mirror.safe`, `farm.safe` en de applicatiemodules) repliceert alleen uw applicatiegegevens en start de toepassing opnieuw op de tweede server. U moet weten welke services u opnieuw moet starten, welke mappen realtime moeten worden gerepliceerd en welk virtueel IP-adres moet worden overgenomen. Het werkt op fysieke servers, virtuele machines op alle hypervisors, waaronder VMware, Hyper-V en KVM, en in de cloud; bovendien biedt het de snelste herstelprocedure.

**VM-HA** (`hyperv.safe`, `kvm.safe`) repliceert en schakelt de volledige virtuele machine over, zodat u niet hoeft te weten hoe de toepassing werkt. Dit is geschikt voor omgevingen met meerdere toepassingen verdeeld over meerdere VM's.

<a class="btn-download" href="/nl/best-practises/vm-ha-vs-application-ha/">Vergelijk applicatie-HA en VM-HA ›</a>

## Kant-en-klare modules voor uw toepassingen {#modules}

Vooraf geconfigureerde modules zijn gratis en inbegrepen bij het product. Elke module bepaalt welke services opnieuw moeten starten en welke mappen voor een bepaalde toepassing moeten worden gerepliceerd.

- **Databases:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **VM's en containers:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud:** AWS, Azure, GCP en andere clouds
- **Fysieke beveiliging en industrie:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/nl/solutions/">Bekijk alle oplossingen en modules ›</a>

## Klanttoepassingen {#use-cases}

- **Videobeheer (VMS):** houdt live- en opgenomen video beschikbaar als een server uitvalt. Gebruikt met Milestone, Genetec en Hanwha.
- **Toegangscontrole (EACS):** houdt aanmeldgegevens en alarmen altijd beschikbaar. Gebruikt met Hirsch Microsesame, Nedap AEOS en Siemens SiPass.
- **SCADA en industrie:** houdt productielijnen onder controle, bijvoorbeeld bij Probat-koffiebranders en ALSTEF-bagagesorteersystemen.
- **Gebouwbeheer (BMS):** houdt HVAC-, beveiligings- en energiesystemen in bedrijf. Gebruikt met Siemens Desigo CC en Bosch BIS.
- **Luchtverkeersleiding (ATC):** houdt verkeersleiders verbonden met kritieke platformtoepassingen, bijvoorbeeld met ADB SafeGate.
- **Metrobedrijfsvoering (OCC):** houdt toezicht beschikbaar op geautomatiseerde, onbemande metrolijnen in Parijs.
- **Edge-locaties:** maakt van twee standaardservers een HA-cluster op locaties zonder datacenter.
- **Softwareleveranciers (OEM):** voegen hoge beschikbaarheid als softwareoptie toe aan hun catalogus.

<a class="btn-download" href="/nl/use-cases/">Bekijk alle toepassingen ›</a>

## Eenvoudige, voorspelbare prijzen {#pricing}

SafeKit wordt verkocht met een permanente licentie, dus er is geen verplicht abonnement. De prijs hangt alleen af van het aantal servers, niet van CPU-kernen of sockets, en alle applicatiemodules zijn gratis. Het werkt ook met standaardedities van Windows, Linux en uw databases, zodat u niet voor Enterprise-edities hoeft te betalen.

<a class="btn-download" href="/nl/safekit-pricing/">Vraag een offerte aan ›</a>

## Ken de beperkingen voordat u begint {#limits}

SafeKit is ontworpen voor eenvoud, niet voor elke situatie. Het is geschikt voor enkele terabytes gerepliceerde gegevens, minder dan 1.000.000 bestanden, maximaal 32 VM's met VM-HA en twee knooppunten op hetzelfde LAN of VLAN met lage latentie (doorgaans minder dan 5 ms retour).

Voor grotere volumes zijn gedeelde opslag of een andere aanpak geschikter.

<a class="btn-download" href="/nl/product/#safekit-ha-limitations">Bekijk alle beperkingen ›</a>

{{%  insert-safekit-videos-table-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
