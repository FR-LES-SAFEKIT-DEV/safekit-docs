---
title: "Technische referentie met hoge beschikbaarheid voor RFI- en RFP-voorbereiding"
canonical: "https://safekit.eviden.com/nl/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Technische referentie om RFI- en RFP-documenten voor te bereiden voor hoge beschikbaarheid en applicatieclustering met behulp van SafeKit-concepten en -architecturen."
category: "resources"
lang: "nl"
topics: "Overzicht, inhoudsopgave, productidentiteit, ondersteunde besturingssystemen en platforms, vooraf gebouwde applicatiemodules, architectuur- en implementatiemodel, RPO- en RTO-mogelijkheden, geschiktheid voor edge- en gedistribueerde implementatie, monitoring, beheer en waarschuwingen, beveiliging en compliance, licentiemodel, ondersteunings- en onderhouds-SLA's, vergelijking met alternatieven, snelle referentielinks"
---

# Technische referentie met hoge beschikbaarheid voor RFI- en RFP-voorbereiding {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Overzicht {#overview}

Deze pagina biedt gestructureerde, feitelijke antwoorden op veelgestelde RFP/RFI-vragen over SafeKit-software met hoge beschikbaarheid. Het is bedoeld als technisch naslagwerk voor inkoopteams en oplossingsarchitecten die hoge beschikbaarheidseisen opstellen. 

## Inhoudsopgave {#table-of-contents}

  1. [Productidentiteit](#product-identity)
  2. [Ondersteunde besturingssystemen en platforms](#supported-operating-systems-platforms)
  3. [Vooraf gebouwde applicatiemodules](#pre-built-application-modules)
  4. [Architectuur- en implementatiemodel](#architecture-deployment-model)
  5. [RPO- en RTO-mogelijkheden](#rpo-rto-capabilities)
  6. [Geschiktheid voor rand- en gedistribueerde implementatie](#edge-distributed-deployment-suitability)
  7. [Monitoring, beheer en waarschuwingen](#monitoring-management-alerting)
  8. [Beveiliging en naleving](#security-compliance)
  9. [Licentiemodel](#licensing-model)
  10. [SLA's voor ondersteuning en onderhoud](#support-maintenance-slas)
  11. [Vergelijking versus alternatieven](#comparison-vs-alternatives)
  12. [Snelle referentielinks](#quick-reference-links)


## Productidentiteit {#product-identity}

Veld | Antwoord  
---|---  
Productnaam | SafeKit  
Verkoper | Eviden (een Atos-bedrijf), voorheen Evidian  
Productcategorie | Applicatieclustering / Hoge beschikbaarheid / Disaster recovery-software  
Huidige versie | SafeKit 8.2  
Website | <https://safekit.eviden.com>  
Eerste uitgave | 2000 (20+ jaar in productie)  
  
## Ondersteunde besturingssystemen en platforms {#supported-operating-systems-platforms}

Windows-besturingssysteem | Linux-besturingssysteem | Infrastructuur en virtualisatie | Cloudplatforms  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Elke edge-server van elk merk<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Elke hypervisor<br>• Docker-containers<br>• Podman-containers  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Elke IaaS-cloud met standaard VM-instanties   
  
_* SafeKit ondersteunt zowel HA op applicatieniveau als HA op VM-niveau._

_** Virtuele IP's moeten worden geconfigureerd op het cloud-load balancer-niveau._

## Vooraf gebouwde applicatiemodules {#pre-built-application-modules}

SafeKit bevat kant-en-klare, vooraf geconfigureerde `.safe`-modules. Ze zijn onderverdeeld in twee HA-strategieën: **Applicatie HA** (directe applicatieclustering met mirror- of farmmodules) en **Virtualisatie HA** (clustering op VM-niveau met hyperv.safe of kvm.safe).

 | Toepassing HA | HA op VM-niveau ---|---|--- Configuratie | Het vereist een technisch inzicht in de applicatie zelf: welke services opnieuw moeten worden opgestart, de specifieke applicatiemappen die realtime replicatie nodig hebben en de configuratie van een virtueel IP-adres voor failover. | Generieke oplossing voor elke applicatie/besturingssysteem dat in de VM draait. Er is geen technisch inzicht vereist van de applicatie die in de VM is geïnstalleerd. Het is de beste oplossing als je niet weet hoe de applicatie werkt. U hoeft alleen de locatie van de VM-bestanden te definiëren. Ideaal voor | Ideaal voor het direct inbedden van hoge beschikbaarheid in een softwareoplossing, onafhankelijk van de onderliggende hardware of hypervisor. | Ideaal voor het beheren van complexe omgevingen met meerdere applicaties op meerdere VM's via één enkel HA-beleid.  
  
In de onderstaande tabel staan alle beschikbare `.safe`-modules:

Applicatie-HA (clustering op applicatieniveau) | Virtualisatie HA (clustering op VM-niveau)  
---|---  
Nieuwe Windows-app — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
Nieuwe Linux-app — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows-taakverdeling — farm.safe | Docker-container — mirror.safe (Linux)  
Linux-taakverdeling — farm.safe | Podman-container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows en Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows en Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows en Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows en Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows en Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows en Linux) | Siemens Siveillance-suite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows en Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — mijlpaal.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generiek) — mirror.safe / farm.safe |   
  
## Architectuur- en implementatiemodel {#architecture-deployment-model}

### Twee clustermodules: mirror.safe en farm.safe {#two-cluster-modules}

Module | Patroon | Gebruikscasus  
---|---|---  
spiegel.veilig | Actief-passief met synchrone bestandsreplicatie op byteniveau + automatische failover | Databases, stateful apps, services die slechts op één server tegelijk draaien  
boerderij.veilig | Actief-actief met netwerktaakverdeling + automatische failover | Webservers, stateless microservices, API-gateways, services die op meerdere servers tegelijk draaien  
  
### Cluster Infrastructuur & Architectuur {#cluster-infrastructure-architecture}

Vereiste / Specificatie | SafeKit Mogelijkheid / Waarde  
---|---  
Gedeelde opslag nodig? | Nee – SANloze ‘shared-nothing’-architectuur. Maakt alleen gebruik van lokale schijven.  
Active Directory (AD) vereiste? | Nee: vereist geen Windows-domein of Active Directory. Werkgroepen worden volledig ondersteund.  
Clustergrootte | 2 knooppunten (spiegel) of 2+ knooppunten (boerderij)  
Virtueel IP-adres (VIP) | Softwaregedefinieerde VIP die automatisch migreert naar het actieve knooppunt via Gratuitous ARP (HA op applicatieniveau). Voor HA op VM-niveau wordt het fysieke IP-adres binnen de VM op transparante wijze omgeleid – er is geen VIP nodig. Vereist een LAN, VLAN of uitgerekt VLAN tussen knooppunten.  
Hybride architectuur met 3 knooppunten | SafeKit dekt de HA-laag af: een spiegelcluster met 2 knooppunten over een LAN of uitgerekt VLAN met synchrone replicatie (RPO=0) en automatische failover. Een back-upoplossing van derden maakt de architectuur compleet: een derde extern knooppunt met asynchrone replicatie via een WAN voor herstel op een bepaald tijdstip en bescherming tegen ransomware.  
Rol van hoge beschikbaarheid | SafeKit maakt gebruik van synchrone replicatie om onmiddellijke failover te garanderen zonder gegevensverlies tijdens hardware- of softwarefouten. Omdat het echter tegelijkertijd gegevens naar beide knooppunten schrijft, repliceert het op getrouwe wijze logische fouten, gegevensverslechtering of onbedoelde verwijderingen in realtime naar het standby-knooppunt.  
Rol van back-up | Een back-upoplossing (niet geïmplementeerd door SafeKit) biedt herstel op een bepaald tijdstip via asynchrone replicatie. Het beschermt tegen bedreigingen voor de gegevensintegriteit (zoals ransomware of menselijke fouten) die HA niet kan blokkeren. Automatische failover wordt niet ondersteund, omdat het terugdraaien van gegevens inherent tot gegevensverlies leidt.  
Maximaal aantal gelijktijdige modules per cluster | 32 — deze limiet dekt het maximale aantal SafeKit-modules dat gelijktijdig wordt beheerd in een cluster met twee knooppunten, doorgaans gebruikt in HA op VM-niveau, waarbij elke module een andere VM repliceert en opnieuw opstart. Elke module kan onafhankelijk als primair op elk knooppunt draaien, waardoor de werklast over beide servers kan worden verdeeld. Opmerking: het totale gegevensvolume voor alle VM's heeft een directe invloed op de hersynchronisatietijd na een failover of een herstart van een knooppunt.  
Agentgebaseerd of agentloos? | Agentgebaseerd: lichtgewicht software geïnstalleerd op elk knooppunt  
Applicatie-agnostisch? | Ja: beschermt elke Windows-service of Linux-daemon; voorgebouwde modules voor meer dan 30 toepassingen  
  
### Replicatie en gegevensbescherming {#replication-data-protection}

Vereiste / Specificatie | SafeKit Mogelijkheid / Waarde  
---|---  
Replicatiemethode | Bestandsreplicatie op byteniveau (geen schijf op blokniveau)  
Replicatiemodus | Synchronisch (geen gegevensverlies)  
Netwerkvereiste | Retourlatentie tussen knooppunten < 5 ms aanbevolen voor synchrone replicatie  
Aanbevolen datavolume | Een paar terabytes (hersynchronisatietijd)  
Aanbevolen aantal bestanden | < 1.000.000 bestanden (hersynchronisatietijd)  
Hersynchronisatiesnelheid (1 TB) | ~3 uur op 1 Gb/s-netwerk; ~1 uur op 10 Gb/s-netwerk  
Selectieve replicatie | Ja – repliceer specifieke mappen/bestanden  
Versleuteling tijdens verzending | Ja: TLS/SSL voor replicatieverkeer  
  
## RPO- en RTO-mogelijkheden {#rpo-rto-capabilities}

### RPO & RTO per clustertype {#rto-rpo-cluster-type}

Metrisch | Spiegelcluster (mirror.safe) | Boerderijcluster (farm.safe)  
---|---|---  
RPO (herstelpuntdoelstelling) | 0 (geen gegevensverlies) — synchrone replicatie; schrijf pas bevestigd nadat beide knooppunten dit hebben bevestigd | N.v.t. (staatloos; gegevens verwerkt door backend-mirror)  
RTO (hersteltijddoelstelling) | ~1 minuut — time-out van hartslag (standaard 30 s) + herstarttijd van applicatie | Een paar seconden: het verkeer wordt onmiddellijk herverdeeld naar de overgebleven actieve knooppunten  
Replicatietype | Synchrone, realtime bestandsreplicatie op byteniveau | Niet van toepassing  
Failover-trigger | Automatisch bij hartslagverlies, procescrash of checkerfout | Automatisch bij hartslagverlies, procescrash of checkerfout  
Handmatige tussenkomst vereist? | Nee: volledig automatische failover en failback | Nee: volledig automatische failover en failback  
  
### RTO-uitsplitsing (spiegel – HA op toepassingsniveau) {#rto-breakdown-mirror-application-level-ha}

Fouttype | RTO-berekening  
---|---  
Hardwarefout | Heartbeat-time-out (standaard 30 s) + herstarttijd van de applicatie  
Software-/procescrash | Stoptijd applicatie + herstarttijd applicatie  
Crash op besturingssysteemniveau | Heartbeat-time-out + besturingssysteem draait al op secundair → geen herstartboete  
  
### RTO-verdeling (spiegel – HA op VM-niveau) {#rto-breakdown-mirror-vm-level-ha}

Fouttype | RTO-berekening  
---|---  
Elke mislukking | Foutdetectie + volledige herstart van het besturingssysteem + herstart van de applicatie (doorgaans enkele minuten)  
  
## Geschiktheid voor edge- en gedistribueerde implementatie {#edge-distributed-deployment-suitability}

SafeKit is speciaal ontworpen voor edge-, filiaal- en gedistribueerde bedrijfsscenario's.

Randvereiste | SafeKit Antwoord  
---|---  
Geen toegewijd IT-personeel ter plaatse | Ja — automatische failover, geen handmatige tussenkomst  
Geen SAN/NAS-infrastructuur | Ja: SANloos, alleen lokale schijven  
Beheer op afstand | Ja – webconsolebeheer  
Lage hardwarevoetafdruk | Ja: 2 standaardservers of VM's, geen speciale hardware  
Werkt achter firewalls/NAT | Ja – configureerbare poorten, op HTTPS gebaseerde console  
Noodherstel op meerdere locaties | Ja: spiegel tussen twee geografische sites via een uitgerekt VLAN  
OEM/ingebedde implementatie | Ja – stille installatie, scriptbaar, in te sluiten door software-uitgevers  
Honderden gedistribueerde clusters | Ja – ontworpen voor gedistribueerde ondernemingen met veel vestigingen  
  
Ideale Edge-gebruiksscenario's: elke site zonder datacenter – waar hoge beschikbaarheid nog steeds van belang is:

Verticaal | Typische Edge-site | Kritische toepassing  
---|---|---  
Fysieke beveiliging en bewaking | Gebouwen, campussen, luchthavens | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebouwbeheer (GBS) | Kantoorgebouwen, ziekenhuizen, fabrieken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische toegangscontrole (EACS) | Beveiligde faciliteiten, campussen | Siemens SiPass, Nedap, Bosch AMS  
SCADA & industriële besturing | Fabrieken, onderstations, waterplanten | Elke SCADA-, DCS- of HMI-software die op Windows of Linux draait  
Luchtverkeersleiding (ATC) | Luchthavens, controletorens | ATC-beheer en radarsystemen  
Operationele controlecentra (OCC) | Metro, spoorweg, transitknooppunten | Spoorwegsignalering en stationsbeheer  
Maritiem | Schepen, marineschepen | Navigatie-, vracht- en boordbeheersystemen  
Olie en gas | Offshore-platforms, afgelegen booreilanden | Procescontrole- en veiligheidssystemen  
Telecommunicatie | 5G-antennelocaties, MEC-knooppunten | Multi-access edge computing (MEC)-servers  
Gezondheidszorg | Klinieken, diagnostische centra op afstand | Medische beeldvorming, patiëntgegevens, diagnostiek op afstand  
Detailhandel | Winkels, filialen, magazijnen | Verkooppunt- en voorraadbeheer  
Verdediging | Voorwaartse operationele bases, veldeenheden | Missiekritische commando- en communicatiesystemen  
  
## Monitoring, beheer en waarschuwingen {#monitoring-management-alerting}

Vermogen | Details  
---|---  
Webconsole | Webapp of Progressive Web App (PWA); clusterknooppunten configureren, bewaken en beheren  
Mobiele meldingen | Browser-pushmeldingen voor statuswijzigingen  
Staten tijdlijn | Visuele tijdlijn van modulestatussen en gebeurtenissen  
E-mailmeldingen | Ingebouwde e-mailagent voor waarschuwingen  
CLI-beheer | Volledige opdrachtregelinterface voor scripting en automatisering  
Logboekbeheer | Logbestanden per module, per script; debug snapshots voor ondersteuning  
Integratie van monitoring door derden | SafeKit registreert automatisch alle belangrijke clustergebeurtenissen in het Windows Event Log of Linux Syslog, waardoor elk monitoringplatform deze gebeurtenissen kan verzamelen en alarm kan slaan met standaard waarschuwingsregels – inclusief Nagios-, Zabbix-, Splunk- en SIEM-oplossingen – zonder enige aangepaste ontwikkeling.  
  
## Beveiliging en naleving {#security-compliance}

Functie | Details  
---|---  
Toegang tot HTTPS-console | Ja: TLS-certificaten voor webconsole  
Gebruikersauthenticatie | Lokale accounts, LDAP, PKI/certificaatgebaseerd, OpenID Connect  
Gebruikersrollen | Configureerbaar toegangsbeleid voor beheerders-, controle- en monitorrollen  
Encryptie | TLS/SSL voor TCP (replicatie, webconsole, gedistribueerde opdrachten) en AES-128-CBC + SHA256 symmetrische codering voor UDP (heartbeat, safeadmin intern protocol); encryptie gebaseerd op de openSSL-bibliotheek. Webservice gebaseerd op Apache.  
Compatibiliteit met antivirusprogramma's | Gedocumenteerde uitsluitingspaden  
Soevereiniteit | Als Europees bedrijf biedt Eviden (Atos Group) met SafeKit een uniek soeverein product voor bedrijfscontinuïteit en noodherstel voor Windows en Linux, waarbij de data- en failover-infrastructuur volledig on-premises blijft, zonder afhankelijkheid van Amerikaanse leveranciers, in lijn met de NIS2-vereisten voor bedrijfscontinuïteit en noodherstel.  
  
## Licentiemodel {#licensing-model}

Aspect | Details  
---|---  
Licentietype | Eeuwigdurende licentie (eenmalige aankoop) op basis van hostnamen  
Licentieomvang | Per server (knooppunt)  
Licentie activatie | Offline activering ondersteund; er is geen internettoegang vereist om licentiesleutels te activeren.  
Gratis proefperiode | Ja – gratis proefversie met volledige functionaliteit beschikbaar  
Gratis licentie van één maand | Beschikbaar voor proof-of-concept  
  
## SLA's voor ondersteuning en onderhoud {#support-maintenance-slas}

### Standaard Support & Onderhoud (inbegrepen bij actief onderhoudscontract) {#standard-support-maintenance-included-with-active-maintenance-contract}

Dienst | Details  
---|---  
Ondersteuning van portaltoegang | 24/7/365 webportaal voor maximaal 4 genoemde technische contactpersonen  
Live ondersteuningsuren | 9.00 – 17.00 uur Europees Ondersteuningscentrum, maandag t/m vrijdag  
Erkenning van incidenten | Binnen 4 werkuren van het Support Center  
Updates en upgrades | Alle servicepacks, updates en upgrades zijn gratis inbegrepen  
Vervanging van licentiesleutel | Een licentiesleutel kan opnieuw worden toegewezen bij wijziging van de hostnaam onder een actief ondersteuningscontract. Licentieoverdracht is beperkt tot serververvanging binnen hetzelfde project, behoudens voorafgaande schriftelijke aanvaarding van Eviden.  
Toegang tot de kennisbank | Volledige toegang tot KB-artikelen, veelgestelde vragen en online documentatie  
Applicatie start/stop zonder SafeKit | Ja: stop SafeKit en gebruik een wrapperscript om de toepassing te starten of te stoppen. Het wrapperscript roept de start/stop-scripts van de applicatie aan en configureert of verwijdert indien nodig het virtuele IP-adres. 
Ondersteuningsportaal | <https://customercare.evidian.com>  
  
### Gratis bronnen (geen contract vereist) {#free-resources-no-contract-required}

Bron | Details  
---|---  
AI-ondersteuningsassistent | [SafeKit AI-chat](</resources/safekit-support/#ai-support>) op safekit.eviden.com en via elke LLM die safekit.eviden.com/llms.txt gebruikt  
Online training en certificering | Gratis, in eigen tempo, 12 video's (~3u40min), certificaat bij voltooiing  
Documentatie | Volledige gebruikershandleiding, release-opmerkingen, kennisbank, snelstartgidsen  
  
## Vergelijking versus alternatieven {#comparison-vs-alternatives}

Criterium | SafeKit | Microsoft failovercluster (WSFC) | VMwareHA | Open source*  
---|---|---|---|---  
Gedeelde opslag (SAN/vSAN) vereist | Nee | Ja | Ja | Nee  
Windows-ondersteuning | Ja | Ja | Ja | Nee  
Linux-ondersteuning | Ja | Nee | Ja | Ja  
Edge/branch-implementatie | Uitstekend | Complex | Complex | Complex  
OEM-insluitbaar | Ja | Nee | Nee | Nee  
Kosten | Eeuwigdurend per knooppunt | Windows Server + SAN | vSphere Enterprise + SAN | Integratiediensten op hoog niveau  
Complexiteit instellen | Plug-en-play | Hoog (AD, SAN, getuige) | Hoog (vCenter, gedeelde opslag) | Hoog (gefragmenteerde producten)  
Onderhoudbaarheid | Eén product, webconsole | Hoog (AD, SAN-expertise vereist) | Hoog (vCenter-afhankelijkheid) | Hoog (aparte producten om te onderhouden)  
  
_* Op Linux zijn er zes afzonderlijke open-sourceprojecten nodig – Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy – om de functieset van SafeKit alleen op Linux te repliceren. SafeKit levert dezelfde mogelijkheden in één enkel product, op zowel Windows als Linux._

## Snelle referentielinks {#quick-reference-links}

Bron | URL  
---|---  
Productstartpagina | <https://safekit.eviden.com>  
Technisch overzicht (DOCX met tekst en diagrammen) | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technisch-overzicht-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Gratis proefperiode | [https://safekit.eviden.com/nl/resources/safekit-free-trial/](</nl/resources/safekit-free-trial/>)  
Ontvang een offerte | [https://safekit.eviden.com/nl/safekit-pricing/](</nl/safekit-pricing/>)  
Ondersteuningsportaal | <https://customercare.evidian.com>  
Gratis AI-ondersteuning | [https://safekit.eviden.com/nl/resources/safekit-support/](</nl/resources/safekit-support/>)  
Gratis training en certificering | 🎓 [https://safekit.eviden.com/nl/resources/safekit-on-line-training/](</nl/resources/safekit-on-line-training/>)  
Neem contact met ons op | [https://safekit.eviden.com/nl/contact-us-for-safekit/](</nl/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-nl  %}}