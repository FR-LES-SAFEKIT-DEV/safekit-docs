---
title: "Edge High Availability zonder datacenter: SafeKit voor OT en gedistribueerde locaties"
canonical: "https://safekit.eviden.com/nl/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Edge computing-locaties hebben geen datacenter, maar ze hebben wel hoge beschikbaarheid nodig. SafeKit verandert twee standaardservers in een plug-and-play high-availability cluster. Het vereist geen SAN en geen IT-personeel, en failover is automatisch."
category: "use-cases"
lang: "nl"
topics: "De uitdaging van hoge beschikbaarheid aan de edge, Waarom SafeKit de natuurlijke keuze is voor edgecomputing, Geschiktheid voor implementatie op de edge en gedistribueerde implementatie, Waarom OT-omgevingen aan de edge anders zijn, Ideale gebruiksscenario's aan de edge, Edge versus datacenter: de belangrijkste verschillen op het gebied van hoge beschikbaarheid, Ondersteunde besturingssystemen en platforms, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-17.1 | glossaire 2026-11-17.4 | Translation LLM | 49 expressions"
---

# Edge High Availability zonder datacenter: SafeKit voor OT en gedistribueerde locaties {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## De uitdaging van hoge beschikbaarheid aan de edge {#the-edge-ha-challenge}

Edgecomputinglocaties hebben vaak geen datacenter en geen expertise op het gebied van hoge beschikbaarheid. Toch is bedrijfscontinuïteit van cruciaal belang voor hen. Een fabrieksvloer, een offshore-olieplatform, een ziekenhuiskliniek, een winkel of een 5G-antennelocatie kan zich geen downtime veroorloven. Maar deze locaties kunnen de kosten en complexiteit van een traditioneel datacentercluster niet rechtvaardigen.

Traditionele oplossingen voor hoge beschikbaarheid, zoals Microsoft Failover Cluster (WSFC), Pacemaker met Corosync of VMware HA, zijn ontworpen voor datacenters. Ze vereisen gedeelde opslag (SAN of NAS), speciale clusterhardware, permanent IT-personeel en complexe expertise op het gebied van besturingssystemen. Geen van deze is aanwezig aan de edge.

SafeKit is precies voor deze leemte ontwikkeld. Het zorgt ervoor dat edge-applicaties blijven draaien in fabrieken, op olieplatforms, schepen, gebouwbeveiliging, luchtverkeersleiding, 5G-netwerken, de gezondheidszorg, de detailhandel en meer. Het heeft slechts twee standaardservers nodig die via een LAN zijn verbonden.


![SafeKit voor edgecomputing](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Waarom SafeKit de natuurlijke keuze is voor edgecomputing {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit verandert twee standaard edge-servers in een plug-and-play-cluster met hoge beschikbaarheid. De servers kunnen van elk merk zijn, fysiek of virtueel. Er is geen gedeelde opslag, geen SAN en geen speciale hardware. Eén lichtgewicht softwarepakket levert de volgende functies:

  * **Realtime synchrone bestandsreplicatie.** Gegevens worden op byteniveau gespiegeld naar de stand-by-server op het moment van schrijven.
  * **Automatische failover.** Als de primaire server uitvalt, neemt de stand-by server binnen enkele seconden het over, zonder menselijke tussenkomst.
  * **Optionele netwerktaakverdeling.** In actieve-actieve implementaties delen beide servers de werklast.
  * **Webconsole.** Het beheer is browsergebaseerd en op afstand toegankelijk via HTTPS. Er is geen expertise ter plaatse vereist.
  * **Stille, scriptbare installatie.** Geschikt voor grootschalige implementatie op honderden gedistribueerde locaties en voor integratie in OEM-producten.


U hoeft geen SAN te kopen. U hebt ook geen Windows Server Datacenter-licentie nodig. U hebt geen Linux-clusterkennis of speciale clusterhardware nodig. De gehele high-availability-stack is één softwarepakket.

## Geschiktheid voor implementatie op de edge en gedistribueerde implementatie {#edge--distributed-deployment-suitability}

SafeKit is speciaal ontworpen voor edge computing, filialen en gedistribueerde ondernemingen:

Vereiste voor edgecomputing | SafeKit-oplossing  
---|---  
Geen toegewijd IT-personeel ter plaatse | Automatische failover zonder handmatige tussenkomst  
Geen SAN- of NAS-infrastructuur | Architectuur met alleen lokale schijven en geen SAN  
Beheer op afstand | Webconsole toegankelijk via HTTPS vanuit elke browser  
Lage hardwarevoetafdruk | Twee standaardservers of VM's zonder speciale hardware  
Werkt achter firewalls en NAT | Configureerbare poorten en HTTPS-gebaseerde console  
Herstel na noodgevallen op meerdere locaties | Realtime replicatie met de mirror-module tussen twee geografische locaties via een stretched VLAN  
Geïsoleerde of offline netwerken | Geen internetverbinding nodig en volledig zelfvoorzienend  
OEM of ingebedde implementatie | Stille en scriptbare installatie die softwareleveranciers kunnen inbedden  
Honderden gedistribueerde clusters | Ontworpen voor gedistribueerde ondernemingen met veel vestigingen  
  
## Waarom OT-omgevingen aan de edge anders zijn {#why-edge-ot-environments-are-different}

Omgevingen met operationele technologie (OT) omvatten SCADA, gebouwbeheersystemen (BMS), fysieke beveiliging en industriële besturing. De vereisten hiervan verschillen fundamenteel van die van IT-datacenters:

  * **Geen IT-personeel ter plaatse.** Een onderstation, een afgelegen pompstation of een schip heeft geen systeembeheerder. Hoge beschikbaarheid moet zelfbeherend zijn.
  * **Geïsoleerde of beperkte netwerken.** Veel OT-locaties hebben geen internettoegang en een beperkte WAN-bandbreedte. Software voor hoge beschikbaarheid moet volledig offline kunnen werken.
  * **24/7 uptime en nultolerantie voor complexiteit.** Het stilleggen van een productielijn, het verliezen van videobewaking of het onderbreken van toegangscontrole kost veel meer dan de software voor hoge beschikbaarheid zelf.
  * **Lange levensduur van apparatuur.** OT-servers kunnen 10 tot 15 jaar meegaan. De oplossing voor hoge beschikbaarheid moet stabiel en onderhoudsarm zijn en mag geen constante updates vereisen.
  * **Alleen standaard x86-hardware.** Een externe industriële locatie heeft geen budget of rechtvaardiging voor een SAN of speciale clusterknooppunten.
  * **Geen tolerantie voor complexiteit van het besturingssysteem.** Traditionele clustersoftware vereist clusterexpertise. OT-operators hebben deze expertise niet en zouden deze ook niet nodig moeten hebben.


Het SafeKit-model pakt al deze beperkingen direct aan: geen SAN, twee servers en automatische failover.

## Ideale gebruiksscenario's aan de edge {#ideal-edge-use-cases}

SafeKit is geschikt voor elke locatie zonder datacenter waar hoge beschikbaarheid nog steeds belangrijk is:

Industrie | Typische edge-locatie | Kritische toepassing  
---|---|---  
Fysieke beveiliging en bewaking | Gebouwen, campussen, luchthavens | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebouwbeheersysteem (BMS) | Kantoorgebouwen, ziekenhuizen, fabrieken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische toegangscontrole (EACS) | Beveiligde faciliteiten, campussen | Siemens SiPass, Nedap, Bosch AMS, Hirsch MicroSesame  
SCADA en industriële besturing | Fabrieken, onderstations, waterzuiveringsinstallaties | Elke SCADA-, DCS- of HMI-software op Windows of Linux  
Luchtverkeersleiding (ATC) | Luchthavens, controletorens | Luchtverkeersbeheer en radarsystemen  
Operationele controlecentra (OCC) | Metro, spoorwegen, OV-knooppunten | Spoorwegsignalering en stationsbeheer  
Maritiem | Schepen, marineschepen | Navigatie-, vracht- en boordbeheersystemen  
Olie en gas | Offshoreplatforms, afgelegen boorinstallaties | Procesbeheersings- en veiligheidssystemen  
Telecommunicatie | 5G-antennesites, MEC-knooppunten | MEC-servers (Multi-access Edge Computing)  
Gezondheidszorg | Klinieken, diagnostische centra op afstand | Medische beeldvorming, patiëntgegevens, diagnostiek op afstand  
Detailhandel | Winkels, filialen, magazijnen | Kassasysteem en voorraadbeheer  
Militair en defensie | Vooruitgeschoven operatiebases, veldeenheden | Missiekritieke commando- en communicatiesystemen  
  
## Edge versus datacenter: de belangrijkste verschillen op het gebied van hoge beschikbaarheid {#edge-vs-data-center-ha-key-differences}

Criterium | Hoge beschikbaarheid van datacenters (WSFC, Pacemaker, VMware HA) | SafeKit hoge beschikbaarheid aan de edge  
---|---|---  
Opslag | Vereist gedeelde opslag (SAN of NAS) | SANless, alleen met lokale schijven  
Hardware | Speciale clusterknooppunten, hostbusadapters (HBA's) en switches | Twee standaard x86-servers van elk merk  
Expertise in besturingssystemen | Vaardigheden met Windows Server Datacenter of Linux clusters | Standaard administratieve vaardigheden Windows of Linux  
Personeel ter plaatse | Vereist voor installatie en interventie | Niet vereist, omdat de failover volledig automatisch is  
Afhankelijkheid van internet of de cloud | Vaak cloud-beheerd | Werkt op volledig geïsoleerde netwerken  
Implementatieschaal | Enkel datacenter | Honderden gedistribueerde sites  
Licentiekosten | Hoog (Datacenter-besturingssysteem en SAN-licenties) | Eén betaalbare softwarelicentie per cluster  
  
{{%  insert-supported-os-nl  %}}

Lees de 📘 [RFI en RFP technische referentie](</nl/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) voor de volledige technische specificaties, dimensionale beperkingen en inkoopcriteria.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}