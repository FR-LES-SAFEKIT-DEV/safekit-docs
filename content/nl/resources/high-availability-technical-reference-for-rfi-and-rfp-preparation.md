---
title: "Technische handleiding voor hoge beschikbaarheid bij het opstellen van RFI's en RFP's."
canonical: "https://safekit.eviden.com/nl/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Technische handleiding voor het opstellen van RFI- en RFP-documenten voor hoge beschikbaarheid en applicatieclustering met behulp van SafeKit-concepten en -architecturen."
category: "resources"
lang: "nl"
topics: "Overzicht, Inhoudsopgave, Productidentiteit, Ondersteunde besturingssystemen en platforms, Voorgebouwde applicatiemodules, Architectuur en implementatiemodel, RPO- en RTO-mogelijkheden, Geschiktheid voor externe locaties en gedistribueerde implementaties, Monitoring, beheer en waarschuwingen, Beveiliging en compliance, Licentiemodel, SLA's voor ondersteuning en onderhoud, Vergelijking met alternatieven, Snel naslagwerken"
---

# Technische handleiding voor hoge beschikbaarheid bij het opstellen van RFI's en RFP's. {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Overzicht {#overview}

Deze pagina biedt gestructureerde, feitelijke antwoorden op veelgestelde vragen over RFP's en RFI's. SafeKit Software met hoge beschikbaarheid. Het is bedoeld als technische referentie voor inkoopteams en oplossingsarchitecten die eisen voor hoge beschikbaarheid opstellen. 

## Inhoudsopgave {#table-of-contents}

  1. [Productidentiteit](#product-identity)
  2. [Ondersteunde besturingssystemen en platformen](#supported-operating-systems-platforms)
  3. [Voorgebouwde applicatiemodules](#pre-built-application-modules)
  4. [Architectuur- en implementatiemodel](#architecture-deployment-model)
  5. [RPO- en RTO-mogelijkheden](#rpo-rto-capabilities)
  6. [Geschikt voor afgelegen locaties en gedistribueerde implementaties](#edge-distributed-deployment-suitability)
  7. [Monitoring, beheer en waarschuwingen](#monitoring-management-alerting)
  8. [Beveiliging en naleving](#security-compliance)
  9. [Licentiemodel](#licensing-model)
  10. [SLA's voor ondersteuning en onderhoud](#support-maintenance-slas)
  11. [Vergelijking versus alternatieven](#comparison-vs-alternatives)
  12. [Snel naslaglinks](#quick-reference-links)


## Productidentiteit {#product-identity}

Veld | Antwoord  
---|---  
Productnaam | SafeKit  
Leverancier | Eviden (een Atos-bedrijf), voorheen Evidian  
Productcategorie | Applicatieclustering / Hoge beschikbaarheid / Software voor noodherstel  
Huidige versie | SafeKit 8.2  
Website | [https://safekit.eviden.com/nl](/nl/)  
Eerste release | 2000 (meer dan 20 jaar in productie)  
  
## Ondersteunde besturingssystemen en platformen {#supported-operating-systems-platforms}

Windows OS | Linux OS | Infrastructuur en virtualisatie | Cloudplatformen  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Elke edge-server van elk merk<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Elke hypervisor<br>• Docker containers<br>• Podman containers  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Elke IaaS-cloud met standaard VM-instanties   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## Voorgebouwde applicatiemodules {#pre-built-application-modules}

SafeKit inclusief gebruiksklare, voorgeconfigureerde `.safe` modules. Ze zijn georganiseerd in twee HA-strategieën: **Applicatie HA** (directe applicatieclustering met mirror of `farm` modules) en **Virtualisatie HA** (Clustering op VM-niveau met hyperv.safe of kvm.safe).

 | Applicatie HA | HA op VM-niveau  
---|---|---  
Configuratie | Het vereist een technisch begrip van de applicatie zelf: welke services opnieuw moeten worden opgestart, de specifieke applicatiemappen die realtime replicatie vereisen en de configuratie van een virtueel IP-adres voor failover. | Een generieke oplossing voor elke applicatie/elk besturingssysteem dat in de virtuele machine draait. Technische kennis van de geïnstalleerde applicatie is niet vereist. Het is de beste oplossing als u niet weet hoe de applicatie werkt. U hoeft alleen de locatie van de VM-bestanden te definiëren.  
Ideaal voor | Ideaal voor het rechtstreeks integreren van hoge beschikbaarheid in een softwareoplossing, onafhankelijk van de onderliggende hardware of hypervisor. | Ideaal voor het beheren van complexe omgevingen met meerdere applicaties verspreid over verschillende virtuele machines via één enkel HA-beleid.  
  
De onderstaande tabel geeft een overzicht van alle beschikbare opties. `.safe` modules:

Applicatie-HA (clustering op applicatieniveau) | Virtualisatie HA (clustering op VM-niveau)  
---|---  
Nieuw Windows app — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
Nieuw Linux app — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows taakverdeling — farm.safe | Docker container — mirror.safe (Linux)  
Linux taakverdeling — farm.safe | Podman container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Hanwha Visie — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Siemens Siveillance suite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Wolk (AWS, Azure, GCP, algemeen) - mirror.safe / farm.safe |   
  
## Architectuur- en implementatiemodel {#architecture-deployment-model}

### Twee clustermodules: mirror.safe En farm.safe {#two-cluster-modules}

Module | Patroon | Gebruiksvoorbeeld  
---|---|---  
mirror.safe | Actief-passief met synchrone bestandsreplicatie op byte-niveau + automatische failover | Databases, stateful applicaties, services die slechts op één server tegelijk draaien  
farm.safe | Actief-actief met netwerkbelastingverdeling + automatische failover | Webservers, stateless microservices, API-gateways, services die op meerdere servers tegelijk draaien  
  
### Clusterinfrastructuur en -architectuur {#cluster-infrastructure-architecture}

Vereiste / Specificatie | SafeKit Capaciteit / Waarde  
---|---  
Gedeelde opslag nodig? | Nee — SAN-loze "shared-nothing"-architectuur. Gebruikt alleen lokale schijven.  
Is Active Directory (AD) een vereiste? | Nee — vereist geen Windows domein of Active Directory. Werkgroepen worden volledig ondersteund.  
Clustergrootte | 2 knooppunten (mirror) of 2+ knooppunten (`farm`)  
Virtueel IP-adres (VIP) | Softwarematig gedefinieerd virtueel IP-adres (VIP) dat automatisch via Gratuitous ARP (applicatie-level HA) naar het actieve knooppunt migreert. Voor HA op VM-niveau wordt het fysieke IP-adres binnen de VM transparant omgeleid — er is geen VIP nodig. Vereist een LAN, VLAN of stretched VLAN tussen de knooppunten.  
3-knoops hybride architectuur | SafeKit dekt de HA-laag: een 2-knoops mirror Een cluster over een LAN of uitgestrekt VLAN met synchrone replicatie (RPO=0) en automatische failover. Een back-upoplossing van een derde partij completeert de architectuur: een derde externe node met asynchrone replicatie over een WAN voor herstel naar een specifiek tijdstip en bescherming tegen ransomware.  
De rol van hoge beschikbaarheid | SafeKit Het maakt gebruik van synchrone replicatie om onmiddellijke failover te garanderen zonder gegevensverlies bij hardware- of softwarefouten. Omdat het echter tegelijkertijd gegevens naar beide knooppunten schrijft, worden logische fouten, gegevensdegradatie of onbedoelde verwijderingen in realtime naar het standby-knooppunt gerepliceerd.  
Rol van back-up | Een back-upoplossing (niet geïmplementeerd door SafeKit) biedt herstel naar een specifiek tijdstip via asynchrone replicatie. Het beschermt tegen bedreigingen voor de gegevensintegriteit (zoals ransomware of menselijke fouten) die HA niet kan blokkeren. Automatische failover wordt niet ondersteund, omdat het terugdraaien van gegevens inherent leidt tot gegevensverlies.  
Maximaal aantal gelijktijdige modules per cluster | 32 — deze limiet omvat het maximale aantal SafeKit Modules die gelijktijdig worden beheerd in een cluster met twee knooppunten, doorgaans gebruikt in HA op VM-niveau, waarbij elke module een andere VM repliceert en herstart. Elke module kan onafhankelijk als primaire server op een van beide knooppunten draaien, waardoor de werklast over beide servers kan worden verdeeld. Let op: het totale datavolume van alle VM's heeft direct invloed op de resynchronisatietijd na een failover of herstart van een knooppunt.  
Agentgebaseerd of agentloos? | Agentgebaseerd — lichtgewicht software geïnstalleerd op elk knooppunt.  
Toepassingsonafhankelijk? | Ja — beschermt alles Windows dienst of Linux daemon; vooraf gebouwde modules voor meer dan 30 applicaties  
  
### Replicatie en gegevensbescherming {#replication-data-protection}

Vereiste / Specificatie | SafeKit Capaciteit / Waarde  
---|---  
Replicatiemethode | Bestandreplicatie op byte-niveau (niet op blokniveau).  
Replicatiemodus | Synchroon (geen gegevensverlies)  
Netwerkvereiste | Een retourlatentie tussen knooppunten van minder dan 5 ms wordt aanbevolen voor synchrone replicatie.  
Aanbevolen datavolume | Enkele terabytes (synchronisatietijd)  
Aanbevolen aantal bestanden | < 1.000.000 bestanden (resynchronisatietijd)  
Resynchronisatiesnelheid (1 TB) | Ongeveer 3 uur op een 1 Gb/s-netwerk; ongeveer 1 uur op een 10 Gb/s-netwerk.  
Selectieve replicatie | Ja — specifieke mappen/bestanden dupliceren  
Versleuteling tijdens overdracht | Ja — TLS/SSL voor replicatieverkeer  
  
## RPO- en RTO-mogelijkheden {#rpo-rto-capabilities}

### RPO & RTO per clustertype {#rto-rpo-cluster-type}

Metrisch | Mirror Cluster (mirror.safe) | `Farm` Cluster (farm.safe)  
---|---|---  
RPO (Recovery Point Objective) | 0 (geen gegevensverlies) — synchrone replicatie; schrijfbewerking wordt pas bevestigd nadat beide knooppunten dit hebben bevestigd | Niet van toepassing (staatloos; gegevens worden verwerkt door de backend) mirror)  
RTO (Recovery Time Objective) | ~1 minuut — time-out van de hartslag (standaard 30 s) + herstarttijd van de applicatie | Enkele seconden later wordt het verkeer onmiddellijk herverdeeld over de overgebleven actieve knooppunten.  
Replicatietype | Synchrone, realtime bestandsreplicatie op byte-niveau | Niet van toepassing  
Failover-trigger | Automatisch bij verlies van hartslag, procescrash of controlefout. | Automatisch bij verlies van hartslag, procescrash of controlefout.  
Handmatige interventie vereist? | Nee — volledig automatische failover en failback. | Nee — volledig automatische failover en failback.  
  
### RTO-uitsplitsing (Mirror — HA op applicatieniveau {#rto-breakdown-mirror-application-level-ha}

Fouttype | RTO-berekening  
---|---  
Hardwarefout | Hartslag-time-out (standaard 30 s) + herstarttijd van de applicatie  
Software-/procescrash | Tijdstip waarop de applicatie stopt + tijdstip waarop de applicatie opnieuw opstart  
Crash op besturingssysteemniveau | Heartbeat-time-out + besturingssysteem draait al op secundaire machine → geen herstartstraf  
  
### RTO-uitsplitsing (Mirror — HA op VM-niveau) {#rto-breakdown-mirror-vm-level-ha}

Fouttype | RTO-berekening  
---|---  
Elke mislukking | Foutdetectie + volledige herstart van het besturingssysteem + herstart van de applicatie (duurt doorgaans enkele minuten)  
  
## Geschikt voor afgelegen locaties en gedistribueerde implementaties {#edge-distributed-deployment-suitability}

SafeKit Het is specifiek ontworpen voor edge-, filiaal- en gedistribueerde bedrijfsomgevingen.

Randvereiste | SafeKit Antwoord  
---|---  
Er is geen vast IT-personeel op locatie aanwezig. | Ja, automatische failover, geen handmatige tussenkomst nodig.  
Geen SAN/NAS-infrastructuur | Ja — zonder SAN, alleen lokale schijven.  
Beheer op afstand | Ja — beheer via de webconsole  
Lage hardwarevoetafdruk | Ja — 2 standaardservers of virtuele machines, geen speciale hardware nodig.  
Werkt achter firewalls/NAT. | Ja — configureerbare poorten, HTTPS-gebaseerde console  
Rampenherstel op meerdere locaties | Ja - mirror tussen twee geografische locaties via een uitgestrekt VLAN  
OEM/ingebedde implementatie | Ja — stille installatie, scriptbaar, in te bedden door softwareleveranciers.  
Honderden gedistribueerde clusters | Ja, ontworpen voor gedistribueerde ondernemingen met veel vestigingen.  
  
Ideale Edge-gebruiksscenario's: elke locatie zonder datacenter waar hoge beschikbaarheid nog steeds van belang is:

Verticaal | Typische randlocatie | Kritische toepassing  
---|---|---  
Fysieke beveiliging en bewaking | Gebouwen, campussen, luchthavens | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebouwbeheersysteem (BMS) | Kantoorgebouwen, ziekenhuizen, fabrieken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische toegangscontrole (EACS) | Beveiligde faciliteiten, campussen | Siemens SiPass, NedapBosch AMS  
SCADA & industriële besturing | Fabrieken, onderstations, waterzuiveringsinstallaties | Alle SCADA-, DCS- of HMI-software die draait op Windows of Linux  
Luchtverkeersleiding (ATC) | Luchthavens, verkeerstorens | ATC-beheer- en radarsystemen  
Operationele controlecentra (OCC) | Metro, spoorwegen, openbaarvervoersknooppunten | Spoorwegsignalering en stationsbeheer  
Maritiem | Schepen, marineschepen | Navigatie-, vracht- en boordbeheersystemen  
Olie en gas | Offshore platforms, afgelegen boorplatforms | Procesbesturings- en veiligheidssystemen  
Telecommunicatie | 5G-antennelocaties, MEC-nodes | Multi-access edge computing (MEC) servers  
Gezondheidszorg | Klinieken, diagnostische centra op afstand | Medische beeldvorming, patiëntgegevens, diagnostiek op afstand  
Detailhandel | Winkels, filialen, magazijnen | Kassasysteem en voorraadbeheer  
Verdediging | Vooruitgeschoven operationele bases, veldeenheden | Missiekritische commando- en communicatiesystemen  
  
## Monitoring, beheer en waarschuwingen {#monitoring-management-alerting}

Vermogen | Details  
---|---  
Webconsole | Web-app of Progressive Web App (PWA); clusterknooppunten configureren, bewaken en beheren.  
Mobiele meldingen | Browser pushnotificaties voor statuswijzigingen  
Tijdlijn van de staten | Visuele tijdlijn van modulestatussen en -gebeurtenissen  
E-mailmeldingen | Ingebouwde e-mailagent voor meldingen  
CLI-beheer | Volledige commandoregelinterface voor scripting en automatisering  
Logboekbeheer | Logbestanden per module en per script; debug-snapshots voor ondersteuning.  
Integratie van monitoring door derden | SafeKit registreert automatisch alle belangrijke clustergebeurtenissen in de logbestanden. Windows Gebeurtenislogboek of Linux Syslog maakt het mogelijk voor elk monitoringplatform om deze gebeurtenissen te verzamelen en alarmen te genereren met standaard waarschuwingsregels – inclusief Nagios, Zabbix, Splunk en SIEM-oplossingen – zonder dat er maatwerkontwikkeling nodig is.  
  
## Beveiliging en naleving {#security-compliance}

Functie | Details  
---|---  
HTTPS-consoletoegang | Ja — TLS-certificaten voor de webconsole  
Gebruikersauthenticatie | Lokale accounts, LDAP, PKI/certificaatgebaseerd, OpenID Connect  
Gebruikersrollen | Configureerbaar toegangsbeleid voor beheerders-, controle- en monitorrollen.  
Versleuteling | TLS/SSL voor TCP (replicatie, webconsole, gedistribueerde commando's) en AES-128-CBC + SHA256 symmetrische encryptie voor UDP (heartbeat, intern SafeAdmin-protocol); encryptie gebaseerd op de OpenSSL-bibliotheek. Webservice gebaseerd op Apache.  
Antiviruscompatibiliteit | Gedocumenteerde uitsluitingsroutes  
Soevereiniteit | Als Europees bedrijf biedt Eviden (Atos Group) met SafeKit een uniek, soeverein product voor bedrijfscontinuïteit en rampenherstel Windows En Linux — Het volledig in eigen beheer houden van data en failover-infrastructuur, zonder afhankelijkheid van Amerikaanse leveranciers, in lijn met de NIS2-vereisten voor bedrijfscontinuïteit en noodherstel.  
  
## Licentiemodel {#licensing-model}

Aspect | Details  
---|---  
Licentietype | Eeuwige licentie (eenmalige aankoop) op basis van hostnamen  
Licentieomvang | Per server (node)  
Licentieactivering | Offline activering wordt ondersteund; er is geen internettoegang nodig om licentiesleutels te activeren.  
Gratis proefperiode | Ja, een volledig functionele gratis proefversie is beschikbaar.  
Gratis licentie voor één maand | Beschikbaar voor proof-of-concept  
  
## SLA's voor ondersteuning en onderhoud {#support-maintenance-slas}

### Standaard ondersteuning en onderhoud (inbegrepen bij een actief onderhoudscontract) {#standard-support-maintenance-included-with-active-maintenance-contract}

Dienst | Details  
---|---  
Toegang tot het ondersteuningsportaal | 24/7/365 webportaal voor maximaal 4 benoemde technische contactpersonen  
Live supporturen | 9:00 - 17:00 uur Europees ondersteuningscentrum, maandag t/m vrijdag  
Incidentbevestiging | Binnen 4 werkuren van het ondersteuningscentrum  
Updates en upgrades | Alle servicepacks, updates en upgrades zijn zonder extra kosten inbegrepen.  
Vervanging van de licentiesleutel | Een licentiesleutel kan opnieuw worden toegewezen bij een wijziging van de hostnaam onder een actief supportcontract. Licentieoverdracht is beperkt tot serververvanging binnen hetzelfde project, onder voorbehoud van voorafgaande schriftelijke toestemming van Eviden.  
toegang tot de kennisbank | Volledige toegang tot kennisbankartikelen, veelgestelde vragen en online documentatie.  
Applicatie starten/stoppen zonder SafeKit | Ja — Stop SafeKit en gebruik een wrapper-script om de applicatie te starten of te stoppen. Het wrapper-script roept de start-/stop-scripts van de applicatie aan en configureert of verwijdert het virtuele IP-adres, indien nodig. 
Ondersteuningsportaal | <https://customercare.evidian.com>  
  
### Gratis bronnen (geen contract vereist) {#free-resources-no-contract-required}

Bron | Details  
---|---  
AI-ondersteuningsassistent | [SafeKit AI-chat](</nl/resources/safekit-support/#ai-support>) op safekit.eviden.com en via elk LLM-systeem dat gebruikmaakt van safekit.eviden.com/llms.txt  
Online training en certificering | Gratis, in eigen tempo te volgen, 12 video's (~3 uur en 40 minuten), certificaat na voltooiing.  
Documentatie | Volledige gebruikershandleiding, release-opmerkingen, kennisbank, snelstartgidsen  
  
## Vergelijking versus alternatieven {#comparison-vs-alternatives}

Criterium | SafeKit | Microsoft Failovercluster (WSFC) | VMware HA | Open source*  
---|---|---|---|---  
Gedeelde opslag (SAN/vSAN) vereist | Nee | Ja | Ja | Nee  
Windows steun | Ja | Ja | Ja | Nee  
Linux steun | Ja | Nee | Ja | Ja  
Edge-/filiaalimplementatie | Uitstekend | Complex | Complex | Complex  
OEM-inbouwbaar | Ja | Nee | Nee | Nee  
Kosten | Permanent per knooppunt | Windows Server + SAN | vSphere Enterprise + SAN | Integratiediensten op hoog niveau  
Installatiecomplexiteit | Plug-and-play | Hoog (AD, SAN, getuige) | Hoog (vCenter, gedeelde opslag) | Hoog (gefragmenteerde producten)  
Onderhoudbaarheid | Enkel product, webconsole | Hoog (AD- en SAN-expertise vereist) | Hoog (afhankelijkheid van vCenter) | Hoog (aparte producten voor onderhoud)  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## Snel naslaglinks {#quick-reference-links}

Bron | URL  
---|---  
Startpagina van het product | [https://safekit.eviden.com/nl/](/nl/)  
Technisch overzicht (DOCX met tekst en diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Gratis proefperiode | [https://safekit.eviden.com/nl/resources/safekit-free-trial/](</nl/resources/safekit-free-trial/>)  
Vraag een offerte aan | [https://safekit.eviden.com/nl/safekit-pricing/](</nl/safekit-pricing/>)  
Ondersteuningsportaal | <https://customercare.evidian.com>  
Gratis AI-ondersteuning | [https://safekit.eviden.com/nl/resources/safekit-support/](</nl/resources/safekit-support/>)  
Gratis training en certificering | [https://safekit.eviden.com/nl/resources/safekit-on-line-training/](</nl/resources/safekit-on-line-training/>)  
Neem contact met ons op | [https://safekit.eviden.com/nl/contact-us-for-safekit/](</nl/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}