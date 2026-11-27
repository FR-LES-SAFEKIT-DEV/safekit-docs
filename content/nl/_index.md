---
title: "SafeKit: software voor hoge beschikbaarheid voor Windows en Linux, zonder SAN"
canonical: "https://safekit.eviden.com/nl/"
description: "SafeKit-software voor hoge beschikbaarheid op Windows en Linux: synchrone replicatie, automatische failover en loadbalancing op twee standaardservers, zonder SAN."
category: "home"
lang: "nl"
topics: "Wat SafeKit doet, Kies uw beschermingsniveau, Kant-en-klare modules voor uw applicaties, Gebruiksscenario's van klanten, Eenvoudige en voorspelbare prijzen, Beperkingen om rekening mee te houden, SafeKit-videobibliotheek"
hashpart: "features, protection-levels, modules, use-cases, pricing, limits, safekit-video-library"
translation: "translate_md 2026-11-25.1 | glossary 2026-11-25.2 | Translation LLM | 53 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
schemaType: "WebPage"
---

# SafeKit: software voor hoge beschikbaarheid voor Windows en Linux, zonder SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit verandert twee standaardservers in een SANless-cluster met hoge beschikbaarheid dat uw applicaties blijft draaien. Het repliceert uw gegevens in realtime, start uw applicatie opnieuw op de tweede server als de eerste uitvalt, en integreert de uitgevallen server automatisch opnieuw zodra deze is gerepareerd. U installeert het op de servers die u al heeft, zonder gedeelde opslag en zonder dat er clusterkennis vereist is.

Replicatie is synchroon, dus er gaan geen gegevens verloren wanneer een server uitvalt, en uw toepassing is binnen ongeveer een minuut of minder weer beschikbaar. Licenties zijn eeuwigdurend en geprijsd per server.

<a class="btn-download" href="/nl/resources/safekit-free-trial/">Start uw gratis proefperiode van 30 dagen ›</a>


## Wat SafeKit doet {#features}

SafeKit combineert vier functies in één product, dat wordt beheerd vanuit één webconsole of één opdrachtregel, op Windows en Linux.

| Functie | Hoe het werkt |
|---|---|
| **Realtime replicatie** | Elke wijziging die aan uw bestanden wordt aangebracht, wordt direct naar de tweede server gekopieerd, zodat er bij een storing geen gegevens verloren gaan. |
| **Automatische failover** | SafeKit detecteert de storing, verplaatst het virtuele IP-adres en start de toepassing opnieuw op de andere server. |
| **Automatische failback** | De herstelde server wordt op de achtergrond opnieuw gesynchroniseerd terwijl de toepassing blijft draaien. |
| **Taakverdeling** | Netwerktaakverdeling wordt binnen de servers uitgevoerd, zonder externe load balancer of proxy's. |

![SafeKit webconsole die een mirror-cluster met 2 nodes voor Windows en Linux bewaakt, met de PRIM en SECOND servers en actieve datareplicatie](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

U hebt geen SAN, een quorumschijf, Active Directory of enterprise-edities van uw besturingssysteem of database nodig.

<a class="btn-download" href="/nl/architectures/">De clusterarchitecturen verkennen ›</a>


## Kies uw beschermingsniveau {#protection-levels}

**Applicatie-HA** (`mirror.safe`, `farm.safe` en de applicatiemodules) repliceert alleen uw applicatiegegevens en start de applicatie opnieuw op de tweede server. U moet weten welke services u opnieuw moet starten, welke mappen u in realtime moet repliceren en voor welk virtueel IP-adres u een failover moet uitvoeren. Het werkt op fysieke servers, in virtuele machines op alle hypervisors, waaronder VMware, Hyper-V en KVM, en in de cloud, en het biedt het snelste herstel.

**VM-HA** (`hyperv.safe`, `kvm.safe`) repliceert de hele virtuele machine en voert er een failover van uit, dus u hoeft niet te weten hoe de toepassing werkt. Deze aanpak is geschikt voor omgevingen met verschillende toepassingen verspreid over verschillende VM's.

<a class="btn-download" href="/nl/best-practises/vm-ha-vs-application-ha/">Applicatie-HA en VM-HA vergelijken ›</a>


## Kant-en-klare modules voor uw applicaties {#modules}

Voorgeconfigureerde modules zijn gratis en worden meegeleverd met het product. Elke module definieert welke services opnieuw moeten worden gestart en welke mappen moeten worden gerepliceerd voor een bepaalde toepassing.

- **Databases:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **VM's en containers:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud:** AWS, Azure, GCP en andere clouds
- **Fysieke beveiliging en industrie:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/nl/solutions/">Blader door alle oplossingen en modules ›</a>


## Gebruiksscenario's van klanten {#use-cases}

- **Videobeheer (VMS):** houdt live en opgenomen video beschikbaar tijdens een serverstoring. Wordt gebruikt met Milestone, Genetec en Hanwha.
- **Toegangscontrole (EACS):** houdt inloggegevens en alarmen te allen tijde beschikbaar. Gebruikt met Hirsch Microsesame, Nedap AEOS en Siemens SiPass.
- **SCADA en industrie:** hiermee kunnen operators de controle behouden over productielijnen, bijvoorbeeld Probat koffiebranders en ALSTEF-bagagesorteermachines.
- **Gebouwbeheer (BMS):** houdt HVAC-, veiligheids- en energiesystemen draaiende. Gebruikt met Siemens Desigo CC en Bosch BIS.
- **Luchtverkeersleiding (ATC):** houdt controllers verbonden met essentiële luchtzijdige toepassingen, bijvoorbeeld met ADB SafeGate.
- **Metroverkeersleiding (OCC):** houdt toezicht op geautomatiseerde, onbemande metrolijnen in Parijs.
- **Edge-sites:** verandert twee standaardservers in een HA-cluster waar geen datacenter is.
- **Softwareleveranciers (OEM):** hiermee kunt u hoge beschikbaarheid aan uw catalogus toevoegen als een software-only optie.

<a class="btn-download" href="/nl/use-cases/">Ontdek alle gebruiksscenario's ›</a>


## Eenvoudige en voorspelbare prijzen {#pricing}

SafeKit wordt verkocht met een eeuwigdurende licentie, dus er is geen verplicht abonnement. De prijs is alleen afhankelijk van het aantal servers, niet van CPU-cores of -sockets, en alle applicatiemodules zijn gratis. Het werkt ook met standaardversies van Windows, Linux en uw databases, zodat u niet betaalt voor Enterprise-edities.

<a class="btn-download" href="/nl/safekit-pricing/">Offerte aanvragen ›</a>


## Beperkingen om rekening mee te houden {#limits}

SafeKit is gebouwd voor eenvoud, niet voor elk geval. Het is geschikt voor maximaal een paar terabytes aan gerepliceerde gegevens, minder dan 1.000.000 bestanden, maximaal 32 VM's bij gebruik van VM-HA, en twee nodes op hetzelfde LAN of VLAN met lage latentie (doorgaans minder dan 5 ms roundtrip).

Voor grotere volumes is gedeelde opslag of een andere aanpak een betere keuze.

<a class="btn-download" href="/nl/product/#safekit-ha-limitations">Bekijk de volledige lijst met beperkingen ›</a>


{{%  insert-safekit-videos-table-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
