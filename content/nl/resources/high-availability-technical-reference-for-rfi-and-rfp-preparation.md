---
title: "Technische handleiding voor hoge beschikbaarheid bij het opstellen van RFI's en RFP's."
canonical: "https://safekit.eviden.com/nl/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Technische handleiding voor het opstellen van RFI- en RFP-documenten voor hoge beschikbaarheid en applicatieclustering met behulp van SafeKit -concepten en -architecturen."
category: "resources"
lang: "nl"
topics: "Overzicht, Inhoudsopgave, Productidentiteit, Ondersteunde besturingssystemen en platformen, SafeKit High Availability Limitations, Voorgebouwde applicatiemodules, Architectuur- en implementatiemodel, RPO- en RTO-mogelijkheden, Geschikt voor afgelegen locaties en gedistribueerde implementaties, Monitoring, beheer en waarschuwingen, Beveiliging en naleving, Licentiemodel, SLA's voor ondersteuning en onderhoud, Vergelijking versus alternatieven, Snel naslaglinks"
---

# Technische handleiding voor hoge beschikbaarheid bij het opstellen van RFI&#39;s en RFP&#39;s. {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Overzicht {#overview}

Deze pagina biedt gestructureerde, feitelijke antwoorden op veelgestelde vragen in RFP/RFI-aanvragen over SafeKit -software voor hoge beschikbaarheid. Het is bedoeld als technische referentie voor inkoopteams en oplossingsarchitecten die eisen voor hoge beschikbaarheid opstellen. 

## Inhoudsopgave {#table-of-contents}

  1. [Productidentiteit](#product-identity)
  2. [Ondersteunde besturingssystemen en platformen](#supported-operating-systems-platforms)
  3. [SafeKit High Availability Limitations](#safekit-ha-limitations)
  4. [Voorgebouwde applicatiemodules](#pre-built-application-modules)
  5. [Architectuur- en implementatiemodel](#architecture-deployment-model)
  6. [RPO- en RTO-mogelijkheden](#rpo-rto-capabilities)
  7. [Geschikt voor afgelegen locaties en gedistribueerde implementaties](#edge-distributed-deployment-suitability)
  8. [Monitoring, beheer en waarschuwingen](#monitoring-management-alerting)
  9. [Beveiliging en naleving](#security-compliance)
  10. [Licentiemodel](#licensing-model)
  11. [SLA&#39;s voor ondersteuning en onderhoud](#support-maintenance-slas)
  12. [Vergelijking versus alternatieven](#comparison-vs-alternatives)
  13. [Snel naslaglinks](#quick-reference-links)


## Productidentiteit {#product-identity}

Veld | Antwoord  
---|---  
Productnaam | SafeKit  
Leverancier | Eviden (een Atos-bedrijf), voorheen Evidian  
Productcategorie | Applicatieclustering / Hoge beschikbaarheid / Software voor noodherstel  
Huidige versie | SafeKit 8.2  
Website | [https://safekit.eviden.com/nl/](</nl/>)  
Eerste release | 2000 (meer dan 20 jaar in productie)  
  
## Ondersteunde besturingssystemen en platformen {#supported-operating-systems-platforms}

Windows-besturingssysteem | Linux-besturingssysteem | Infrastructuur en virtualisatie | Cloudplatformen  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Elke edge-server van elk merk<br> • VMware<br> • Microsoft Hyper-V*<br> • Linux KVM*<br> • Elke hypervisor<br> • Docker-containers<br> • Podman-containers  |  • Amazon Web Services (AWS)**<br> • Microsoft Azure\**<br> • Google Cloud Platform (GCP)\**<br> • Elke IaaS-cloud met standaard VM-instanties   
  
_* SafeKit ondersteunt zowel HA op applicatieniveau als HA op VM-niveau._

_**Virtuele IP-adressen moeten op het niveau van de cloud-loadbalancer worden geconfigureerd._

{{%  insert-safekit-usage-nl  %}}

## Voorgebouwde applicatiemodules {#pre-built-application-modules}

SafeKit bevat kant-en-klare, voorgeconfigureerde `.safe` modules. Deze zijn georganiseerd in twee HA-strategieën: **applicatie-HA** (directe applicatieclustering met mirror of <span class="notranslate farm-term" translate="no">farm</span> ) en **virtualisatie-HA** (clustering op VM-niveau met hyperv.safe of kvm.safe ).

 | Applicatie HA | HA op VM-niveau  
---|---|---  
Configuratie | Het vereist een technisch begrip van de applicatie zelf: welke services opnieuw moeten worden opgestart, de specifieke applicatiemappen die realtime replicatie vereisen en de configuratie van een virtueel IP-adres voor failover. | Een generieke oplossing voor elke applicatie/elk besturingssysteem dat in de virtuele machine draait. Technische kennis van de geïnstalleerde applicatie is niet vereist. Het is de beste oplossing als u niet weet hoe de applicatie werkt. U hoeft alleen de locatie van de VM-bestanden te definiëren.  
Ideaal voor | Ideaal voor het rechtstreeks integreren van hoge beschikbaarheid in een softwareoplossing, onafhankelijk van de onderliggende hardware of hypervisor. | Ideaal voor het beheren van complexe omgevingen met meerdere applicaties verspreid over verschillende virtuele machines via één enkel HA-beleid.  
  
De onderstaande tabel geeft een overzicht van alle beschikbare `.safe` modules:

Applicatie-HA (clustering op applicatieniveau) | Virtualisatie HA (clustering op VM-niveau)  
---|---  
Nieuwe Windows-app — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
Nieuwe Linux-app — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows-taakverdeling — farm.safe | Docker-container — mirror.safe (Linux)  
Linux load balancing — farm.safe | Podman-container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows &amp; Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows &amp; Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows &amp; Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows &amp; Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows &amp; Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows &amp; Linux) | Siemens Siveillance suite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows &amp; Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generiek) — mirror.safe / farm.safe |   
  
## Architectuur- en implementatiemodel {#architecture-deployment-model}

### Twee clustermodules: mirror.safe en farm.safe {#two-cluster-modules}

Module | Patroon | Gebruiksvoorbeeld  
---|---|---  
mirror.safe | Actief-passief met synchrone bestandsreplicatie op byte-niveau + automatische failover | Databases, stateful applicaties, services die slechts op één server tegelijk draaien  
farm.safe | Actief-actief met netwerkbelastingverdeling + automatische failover | Webservers, stateless microservices, API-gateways, services die op meerdere servers tegelijk draaien  
  
### Clusterinfrastructuur en -architectuur {#cluster-infrastructure-architecture}

Vereiste / Specificatie | SafeKit functionaliteit/waarde  
---|---  
Gedeelde opslag nodig? | Nee — SAN-loze &quot;shared-nothing&quot;-architectuur. Gebruikt alleen lokale schijven.  
Is Active Directory (AD) een vereiste? | Nee, een Windows-domein of Active Directory is niet vereist. Werkgroepen worden volledig ondersteund.  
Clustergrootte | 2 knooppunten ( mirror ) of 2 of meer knooppunten ( <span class="notranslate farm-term" translate="no">farm</span> )  
Virtueel IP-adres (VIP) | Softwarematig gedefinieerd virtueel IP-adres (VIP) dat automatisch via Gratuitous ARP (applicatie-level HA) naar het actieve knooppunt migreert. Voor HA op VM-niveau wordt het fysieke IP-adres binnen de VM transparant omgeleid — er is geen VIP nodig. Vereist een LAN, VLAN of stretched VLAN tussen de knooppunten.  
3-knoops hybride architectuur | SafeKit verzorgt de HA-laag: een mirror met twee knooppunten via een LAN of een uitgebreid VLAN met synchrone replicatie (RPO=0) en automatische failover. Een back-upoplossing van een derde partij completeert de architectuur: een derde, extern knooppunt met asynchrone replicatie via een WAN voor herstel naar een specifiek tijdstip en bescherming tegen ransomware.  
De rol van hoge beschikbaarheid | SafeKit maakt gebruik van synchrone replicatie om onmiddellijke failover te garanderen zonder gegevensverlies bij hardware- of softwarefouten. Omdat het echter tegelijkertijd gegevens naar beide knooppunten schrijft, worden logische fouten, gegevensdegradatie of onbedoelde verwijderingen in realtime naar het standby-knooppunt gerepliceerd.  
Rol van back-up | Een back-upoplossing (niet geïmplementeerd door SafeKit ) biedt herstel naar een specifiek tijdstip via asynchrone replicatie. Deze oplossing beschermt tegen bedreigingen voor de gegevensintegriteit (zoals ransomware of menselijke fouten) die HA niet kan voorkomen. Automatische failover wordt niet ondersteund, omdat het terugdraaien van gegevens inherent leidt tot gegevensverlies.  
Maximaal aantal gelijktijdige modules per cluster | 32 — deze limiet heeft betrekking op het maximale aantal SafeKit -modules dat gelijktijdig wordt beheerd in een cluster met twee knooppunten, wat doorgaans wordt gebruikt in HA op VM-niveau, waarbij elke module een andere VM repliceert en herstart. Elke module kan onafhankelijk als primaire module op een van beide knooppunten draaien, waardoor de werklast over beide servers kan worden verdeeld. Let op: het totale datavolume van alle VM&#39;s heeft direct invloed op de resynchronisatietijd na een failover of herstart van een knooppunt.  
Agentgebaseerd of agentloos? | Agentgebaseerd — lichtgewicht software geïnstalleerd op elk knooppunt.  
Toepassingsonafhankelijk? | Ja — beschermt elke Windows-service of Linux-daemon; vooraf gebouwde modules voor meer dan 30 toepassingen.  
  
### Replicatie en gegevensbescherming {#replication-data-protection}

Vereiste / Specificatie | SafeKit functionaliteit/waarde  
---|---  
Replicatiemethode | Bestandreplicatie op byte-niveau (niet op blokniveau).  
Replicatiemodus | Synchroon (geen gegevensverlies)  
Netwerkvereiste | Een retourlatentie tussen knooppunten van minder dan 5 ms wordt aanbevolen voor synchrone replicatie.  
Aanbevolen datavolume | Enkele terabytes (synchronisatietijd)  
Aanbevolen aantal bestanden | &lt; 1.000.000 bestanden (resynchronisatietijd)  
Resynchronisatiesnelheid (1 TB) | Ongeveer 3 uur op een 1 Gb/s-netwerk; ongeveer 1 uur op een 10 Gb/s-netwerk.  
Selectieve replicatie | Ja — specifieke mappen/bestanden dupliceren  
Versleuteling tijdens overdracht | Ja — TLS/SSL voor replicatieverkeer  
  
## RPO- en RTO-mogelijkheden {#rpo-rto-capabilities}

### RPO &amp; RTO per clustertype {#rto-rpo-cluster-type}

Metrisch | Mirror ( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO (Recovery Point Objective) | 0 (geen gegevensverlies) — synchrone replicatie; schrijfbewerking wordt pas bevestigd nadat beide knooppunten dit hebben bevestigd | Niet van toepassing (staatloos; gegevens verwerkt door backend- mirror )  
RTO (Recovery Time Objective) | ~1 minuut — time-out van de hartslag (standaard 30 s) + herstarttijd van de applicatie | Enkele seconden later wordt het verkeer onmiddellijk herverdeeld over de overgebleven actieve knooppunten.  
Replicatietype | Synchrone, realtime bestandsreplicatie op byte-niveau | Niet van toepassing  
Failover-trigger | Automatisch bij verlies van hartslag, procescrash of controlefout. | Automatisch bij verlies van hartslag, procescrash of controlefout.  
Handmatige interventie vereist? | Nee — volledig automatische failover en failback. | Nee — volledig automatische failover en failback.  
  
### RTO-overzicht ( Mirror — HA op applicatieniveau) {#rto-breakdown-mirror-application-level-ha}

Fouttype | RTO-berekening  
---|---  
Hardwarefout | Hartslag-time-out (standaard 30 s) + herstarttijd van de applicatie  
Software-/procescrash | Tijdstip waarop de applicatie stopt + tijdstip waarop de applicatie opnieuw opstart  
Crash op besturingssysteemniveau | Heartbeat-time-out + besturingssysteem draait al op secundaire machine → geen herstartstraf  
  
### RTO-analyse ( Mirror — HA op VM-niveau) {#rto-breakdown-mirror-vm-level-ha}

Fouttype | RTO-berekening  
---|---  
Elke mislukking | Foutdetectie + volledige herstart van het besturingssysteem + herstart van de applicatie (duurt doorgaans enkele minuten)  
  
## Geschikt voor afgelegen locaties en gedistribueerde implementaties {#edge-distributed-deployment-suitability}

SafeKit is specifiek ontworpen voor edge-, filiaal- en gedistribueerde bedrijfsomgevingen.

Randvereiste | SafeKit antwoord  
---|---  
Er is geen vast IT-personeel op locatie aanwezig. | Ja, automatische failover, geen handmatige tussenkomst nodig.  
Geen SAN/NAS-infrastructuur | Ja — zonder SAN, alleen lokale schijven.  
Beheer op afstand | Ja — beheer via de webconsole  
Lage hardwarevoetafdruk | Ja — 2 standaardservers of virtuele machines, geen speciale hardware nodig.  
Werkt achter firewalls/NAT. | Ja — configureerbare poorten, HTTPS-gebaseerde console  
Rampenherstel op meerdere locaties | Ja — mirror tussen twee geografische locaties via een uitgestrekt VLAN.  
OEM/ingebedde implementatie | Ja — stille installatie, scriptbaar, in te bedden door softwareleveranciers.  
Honderden gedistribueerde clusters | Ja, ontworpen voor gedistribueerde ondernemingen met veel vestigingen.  
  
Ideale Edge-gebruiksscenario&#39;s: elke locatie zonder datacenter waar hoge beschikbaarheid nog steeds van belang is:

Verticaal | Typische randlocatie | Kritische toepassing  
---|---|---  
Fysieke beveiliging en bewaking | Gebouwen, campussen, luchthavens | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebouwbeheersysteem (BMS) | Kantoorgebouwen, ziekenhuizen, fabrieken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische toegangscontrole (EACS) | Beveiligde faciliteiten, campussen | Siemens SiPass, Nedap, Bosch AMS  
SCADA &amp; industriële besturing | Fabrieken, onderstations, waterzuiveringsinstallaties | Elke SCADA-, DCS- of HMI-software die draait op Windows of Linux.  
Luchtverkeersleiding (ATC) | Luchthavens, verkeerstorens | ATC-beheer- en radarsystemen  
Operationele controlecentra (OCC) | Metro, spoorwegen, openbaarvervoersknooppunten | Spoorwegsignalering en stationsbeheer  
Maritiem | Schepen, marineschepen | Navigatie-, vracht- en boordbeheersystemen  
Olie en gas | Offshore platforms, boorplatformen op afstand | Procesbesturings- en veiligheidssystemen  
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
Integratie van monitoring door derden | SafeKit registreert automatisch alle belangrijke clustergebeurtenissen in het Windows-gebeurtenislogboek of Linux Syslog, waardoor elk monitoringplatform deze gebeurtenissen kan verzamelen en alarmen kan genereren met standaard waarschuwingsregels — inclusief Nagios, Zabbix, Splunk en SIEM-oplossingen — zonder dat er maatwerkontwikkeling nodig is.  
  
## Beveiliging en naleving {#security-compliance}

Functie | Details  
---|---  
HTTPS-consoletoegang | Ja — TLS-certificaten voor de webconsole  
Gebruikersauthenticatie | Lokale accounts, LDAP, PKI/certificaatgebaseerd, OpenID Connect  
Gebruikersrollen | Configureerbaar toegangsbeleid voor beheerders-, controle- en monitorrollen.  
Versleuteling | TLS/SSL voor TCP (replicatie, webconsole, gedistribueerde commando&#39;s) en AES-128-CBC + SHA256 symmetrische encryptie voor UDP (heartbeat, intern SafeAdmin-protocol); encryptie gebaseerd op de OpenSSL-bibliotheek. Webservice gebaseerd op Apache.  
Antiviruscompatibiliteit | Gedocumenteerde uitsluitingsroutes  
Soevereiniteit | Als Europees bedrijf biedt Eviden (Atos Group) met SafeKit een uniek, onafhankelijk product voor bedrijfscontinuïteit en noodherstel voor Windows en Linux. Hierdoor blijven data en failover-infrastructuur volledig lokaal, zonder afhankelijkheid van Amerikaanse leveranciers, in lijn met de NIS2-vereisten voor bedrijfscontinuïteit en noodherstel.  
  
## Licentiemodel {#licensing-model}

Aspect | Details  
---|---  
Licentietype | Eeuwige licentie (eenmalige aankoop) op basis van hostnamen  
Licentieomvang | Per server (node)  
Licentieactivering | Offline activering wordt ondersteund; er is geen internettoegang nodig om licentiesleutels te activeren.  
Gratis proefperiode | Ja, een volledig functionele gratis proefversie is beschikbaar.  
Gratis licentie voor één maand | Beschikbaar voor proof-of-concept  
  
## SLA&#39;s voor ondersteuning en onderhoud {#support-maintenance-slas}

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
AI-ondersteuningsassistent | [SafeKit AI-chat](</nl/resources/safekit-support/#ai-support>) op safekit.eviden.com en via elk LLM-bestand met behulp van safekit.eviden.com/llms.txt  
Online training en certificering | Gratis, in eigen tempo te volgen, 12 video&#39;s (~3 uur en 40 minuten), certificaat na voltooiing.  
Documentatie | Volledige gebruikershandleiding, release-opmerkingen, kennisbank, snelstartgidsen  
  
## Vergelijking versus alternatieven {#comparison-vs-alternatives}

Criterium | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source*  
---|---|---|---|---  
Gedeelde opslag (SAN/vSAN) vereist | Nee | Ja | Ja | Nee  
Windows-ondersteuning | Ja | Ja | Ja | Nee  
Linux-ondersteuning | Ja | Nee | Ja | Ja  
Edge-/filiaalimplementatie | Uitstekend | Complex | Complex | Complex  
OEM-inbouwbaar | Ja | Nee | Nee | Nee  
Kosten | Permanent per knooppunt | Windows Server + SAN | vSphere Enterprise + SAN | Integratiediensten op hoog niveau  
Installatiecomplexiteit | Plug-and-play | Hoog (AD, SAN, getuige) | Hoog (vCenter, gedeelde opslag) | Hoog (gefragmenteerde producten)  
Onderhoudbaarheid | Enkel product, webconsole | Hoog (AD- en SAN-expertise vereist) | Hoog (afhankelijkheid van vCenter) | Hoog (aparte producten voor onderhoud)  
  
_* Op Linux zijn er 6 afzonderlijke open-sourceprojecten nodig — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — om de functionaliteit van SafeKit te repliceren, en dat alleen al op Linux. SafeKit biedt dezelfde mogelijkheden in één enkel product, voor zowel Windows als Linux._

## Snel naslaglinks {#quick-reference-links}

Bron | URL  
---|---  
Startpagina van het product | [https://safekit.eviden.com/nl/](</nl/>)  
Technisch overzicht (DOCX met tekst en diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Gratis proefperiode | [https://safekit.eviden.com/nl/resources/safekit-free-trial/](</nl/resources/safekit-free-trial/>)  
Vraag een offerte aan | [https://safekit.eviden.com/nl/safekit-pricing/](</nl/safekit-pricing/>)  
Ondersteuningsportaal | <https://customercare.evidian.com>  
Gratis AI-ondersteuning | [https://safekit.eviden.com/nl/resources/safekit-support/](</nl/resources/safekit-support/>)  
Gratis training en certificering | [https://safekit.eviden.com/nl/resources/safekit-on-line-training/](</nl/resources/safekit-on-line-training/>)  
Neem contact met ons op | [https://safekit.eviden.com/nl/contact-us-for-safekit/](</nl/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-nl  %}}
