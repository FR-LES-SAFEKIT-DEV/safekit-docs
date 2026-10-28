---
title: "Edge High Availability zonder datacenter: SafeKit voor OT- en gedistribueerde locaties"
canonical: "https://safekit.eviden.com/nl/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Edge-locaties hebben geen datacenter, maar hebben wel behoefte aan HA. SafeKit transformeert 2 standaardservers in een plug-and-play HA-cluster: geen SAN, geen IT-personeel, automatische failover."
category: "use-cases"
lang: "nl"
topics: "De Edge HA-uitdaging, Waarom SafeKit de ideale keuze is voor Edge-omgevingen, Geschiktheid voor Edge- en gedistribueerde implementaties, Waarom Edge OT-omgevingen verschillen, Ideale Edge-gebruiksscenario's, Edge versus datacenter HA: Belangrijkste verschillen, Technische minimumvereisten, 🔍 SafeKit High Availability Navigation Hub"
---

# Edge High Availability zonder datacenter: SafeKit voor OT & gedistribueerde locaties {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## De Edge HA-uitdaging {#the-edge-ha-challenge}

Edge-locaties beschikken vaak niet over een datacenter en geen expertise op het gebied van high availability (HA), terwijl bedrijfscontinuïteit cruciaal is. Een fabriekshal, een offshore olieplatform, een ziekenhuiskliniek, een winkel of een 5G-antennelocatie kunnen zich geen downtime veroorloven, maar de kosten en complexiteit van een traditioneel datacenter-HA-cluster zijn te hoog.

Traditionele HA-oplossingen — Microsoft Failover Cluster (WSFC), Pacemaker/Corosync, VMware HA — zijn ontworpen voor datacenters: ze gaan uit van gedeelde opslag (SAN/NAS), dedicated clusterhardware, vast IT-personeel en complexe expertise op besturingssysteemniveau. Geen van deze zaken is aanwezig aan de rand van het netwerk.

SafeKit is precies voor deze behoefte ontwikkeld. Het zorgt ervoor dat edge-applicaties blijven draaien in fabrieken, olieplatforms, schepen, gebouwbeveiliging, luchtverkeersleiding, 5G-netwerken, de gezondheidszorg, de detailhandel en meer – met niets meer dan twee standaardservers en een LAN.


![ SafeKit voor Edge ](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Waarom is SafeKit de ideale keuze voor Edge {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit transformeert twee standaard edge-servers (van elk merk, fysiek of virtueel) in een plug-and-play HA-cluster — zonder gedeelde opslag, SAN of speciale hardware. Eén lichtgewicht softwarepakket biedt:

  * ** Realtime synchrone bestandsreplicatie ** — gegevens worden byte-niveau naar de standby-server gespiegeld op het moment van schrijven
  * ** Automatische failover ** — als de primaire server uitvalt, neemt de standby-server het binnen enkele seconden over zonder menselijke tussenkomst.
  * ** Optionele netwerkbelastingverdeling ** — voor actieve-actieve implementaties waarbij beide servers de werklast delen
  * ** Webconsole ** — beheer via de browser, op afstand toegankelijk via HTTPS, vereist geen expertise ter plaatse
  * ** Stille, scriptbare installatie ** — geschikt voor OEM-integratie en massale uitrol over honderden gedistribueerde locaties


Er hoeft geen SAN aangeschaft te worden, er is geen Windows Server Datacenter-licentie vereist, geen expertise in Linux clusterbesturingssysteem nodig en geen speciale clusterhardware. De volledige HA-stack is één softwarepakket.

## Geschiktheid voor edge- en gedistribueerde implementatie {#edge--distributed-deployment-suitability}

SafeKit is specifiek ontworpen voor edge-, filiaal- en gedistribueerde bedrijfsomgevingen:

Randvereiste | SafeKit Antwoord  
---|---  
Geen speciaal IT-personeel ter plaatse | Automatische failover, geen handmatige tussenkomst vereist  
Geen SAN/NAS-infrastructuur | SANloze architectuur, alleen lokale schijven  
Beheer op afstand via | webconsole, toegankelijk via HTTPS vanuit elke browser.  
Lage hardwarevoetafdruk | 2 standaardservers of VM's, geen speciale hardware nodig  
Werkt achter firewalls/NAT | Configureerbare poorten, HTTPS-gebaseerde console  
Rampenherstel op meerdere locaties | Mirror tussen twee geografische locaties via een uitgestrekt VLAN  
Luchtgeïsoleerde / offline netwerken | Geen internetverbinding nodig; volledig zelfvoorzienend  
OEM/embedded implementatie | Stille installatie, scriptbaar, inbedbaar door softwareleveranciers  
Honderden gedistribueerde clusters | Ontworpen voor gedistribueerde ondernemingen die veel vestigingen beheren  
  
## Waarom Edge OT-omgevingen anders zijn {#why-edge-ot-environments-are-different}

OT-omgevingen (Operational Technology) — SCADA, BMS, fysieke beveiliging, industriële besturing — hebben eisen die fundamenteel verschillen van die van IT-datacenters:

  * ** Geen IT-personeel ter plaatse. ** Een onderstation, een afgelegen pompstation of een schip heeft geen systeembeheerder. HA moet zelfbeherend zijn.
  * ** Netwerken zonder internetverbinding of met beperkte bandbreedte. ** Veel OT-locaties hebben geen internettoegang en een beperkte WAN-bandbreedte. HA-software moet volledig offline kunnen werken.
  * ** 24/7 beschikbaarheid, geen tolerantie voor complexiteit. ** Het stilleggen van een productielijn, het uitvallen van videobewaking of het onderbreken van toegangscontrole kost veel meer dan de HA-software zelf.
  * ** Lange levensduur van apparatuur. ** OT-servers kunnen 10-15 jaar meegaan. De HA-oplossing moet stabiel en onderhoudsarm zijn en geen constante updates vereisen.
  * ** Alleen standaard x86-hardware. ** Geen budget of rechtvaardiging voor SAN of dedicated clusterknooppunten op een externe industriële locatie.
  * ** Onverdraagzaamheid voor complexiteit op besturingssysteemniveau. ** Pacemaker, Corosync of WSFC vereisen clusterexpertise die OT-operators simpelweg niet hebben en ook niet nodig zouden moeten hebben.


Het SAN-loze model met twee servers en automatische failover van SafeKit pakt al deze beperkingen direct aan.

## Ideale Edge-gebruiksscenario's {#ideal-edge-use-cases}

Elke locatie zonder datacenter, waar hoge beschikbaarheid nog steeds van belang is:

Verticale | Typische randlocatie | Kritische toepassing  
---|---|---  
Fysieke beveiliging en bewaking | Gebouwen, campussen, luchthavens | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
Gebouwbeheersysteem (BMS) | Kantoorgebouwen, ziekenhuizen, fabrieken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische toegangscontrole (EACS) | Beveiligde faciliteiten, campussen | Siemens SiPass, Nedap , Bosch AMS  
SCADA- en industriële besturing | Fabrieken, onderstations, waterzuiveringsinstallaties | Alle SCADA-, DCS- of HMI-software op Windows of Linux  
Luchtverkeersleiding (ATC) | Luchthavens, verkeerstorens | ATC-beheer- en radarsystemen  
Operationele controlecentra (OCC) | Metro-, spoorweg- en doorvoerknooppunten | Spoorwegsignalering en stationsbeheer  
Maritiem | Schepen, marineschepen | Navigatie-, lading- en boordbeheersystemen  
Olie en gas | Offshore platforms, boorplatformen op afstand | Procesbesturings- en veiligheidssystemen  
Telecommunicatie | 5G-antennelocaties, MEC-nodes | Multi-access edge computing (MEC)-servers  
Gezondheidszorg | Klinieken, diagnostische centra op afstand | Medische beeldvorming, patiëntgegevens, diagnostiek op afstand  
Detailhandel | Winkels, filialen, magazijnen | Kassa- en voorraadbeheer  
Defensie | Vooruitgeschoven operationele bases, veldeenheden | Missiekritieke commando- en communicatiesystemen  
  
## Edge versus datacenter HA: belangrijke verschillen {#edge-vs-data-center-ha-key-differences}

Criterium | Datacenter HA (WSFC, Pacemaker, VMware HA) | SafeKit Edge HA  
---|---|---  
Opslag | vereist gedeelde SAN/NAS-opslag. | is SAN-loos — alleen lokale schijven.  
Hardware | Toegewijde clusterknooppunten, HBA's, switches | Twee willekeurige standaard x86-servers  
OS-expertise | Windows Datacenter of Linux cluster OS-vaardigheden | Standaard Windows / Linux beheerdersvaardigheden  
Personeel ter plaatse vereist voor installatie en interventie | | ). Niet vereist — volledig automatisch.  
Internet-/cloudafhankelijkheid | Vaak cloudbeheerd | Volledig geschikt voor luchtbruggen  
Implementatieschaal | Eén datacenter | Honderden gedistribueerde locaties  
Licentiekosten | Hoog (Datacenter OS, SAN-licenties) | Eén betaalbare softwarelicentie per cluster  
Typische RTO | 1–5 minuten | Minder dan 1 minuut (configureerbaar)  
  
## Technische minimumvereisten {#technical-minimum-requirements}

  * ** Servers: ** 2 standaard x86-servers of VM's (elk hardwaremerk, fysiek of virtueel) of ARM (alleen Linux )
  * ** OS: ** Windows Server 2019 / 2022 / 2025, Windows 11, RHEL 8/9, Ubuntu 24.04
  * ** Netwerk: ** 1 Gbps LAN voor replicatie; een speciaal heartbeat-netwerk wordt aanbevolen.
  * ** Opslag: ** Alleen lokale schijven — geen SAN, geen NAS, geen gedeelde opslag van welke aard dan ook.
  * ** Geen speciale OS-editie vereist. ** — Windows Server Standard is voldoende; geen Datacenter-licentie vereist.


Voor volledige technische specificaties, afmetingsbeperkingen en inkoopcriteria, zie de technische referentie 📘 [ RFP/RFI ](</nl/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) .


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}