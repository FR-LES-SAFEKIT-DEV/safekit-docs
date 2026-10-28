---
title: "Technische handleiding voor hoge beschikbaarheid bij het opstellen van RFI's en RFP's."
canonical: "https://safekit.eviden.com/nl/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Technische handleiding voor het opstellen van RFI- en RFP-documenten voor hoge beschikbaarheid en applicatieclustering met behulp van SafeKit -concepten en -architecturen."
category: "resources"
lang: "nl"
topics: "Overzicht, Inhoudsopgave, Productidentiteit, Ondersteunde besturingssystemen en platforms, Voorgebouwde applicatiemodules, Architectuur en implementatiemodel, RPO- en RTO-mogelijkheden, Geschiktheid voor edge- en gedistribueerde implementatie, Monitoring, beheer en waarschuwingen, Beveiliging en compliance, Licentiemodel, SLA's voor ondersteuning en onderhoud, Vergelijking met alternatieven, Snel naslagwerken"
---

# Technische referentie voor hoge beschikbaarheid bij de voorbereiding van RFI's en RFP's {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Overzicht {#overview}

Deze pagina biedt gestructureerde, feitelijke antwoorden op veelgestelde vragen in RFP/RFI-aanvragen over SafeKit -software voor hoge beschikbaarheid. Het is bedoeld als technische referentie voor inkoopteams en oplossingsarchitecten die eisen voor hoge beschikbaarheid opstellen. 

## Inhoudsopgave {#table-of-contents}

  1. [ Productidentificatie ](#product-identity)
  2. [ Ondersteunde besturingssystemen en platforms ](#supported-operating-systems-platforms)
  3. [ Voorgeïnstalleerde applicatiemodules ](#pre-built-application-modules)
  4. Architectuur- en implementatiemodel ](#architecture-deployment-model) [
  5. [ RPO- en RTO-mogelijkheden ](#rpo-rto-capabilities)
  6. [ Geschikt voor edge- en gedistribueerde implementatie ](#edge-distributed-deployment-suitability)
  7. [ Monitoring, beheer en waarschuwingen ](#monitoring-management-alerting)
  8. [ Beveiliging en naleving ](#security-compliance)
  9. Licentiemodel [ ](#licensing-model)
  10. [ Ondersteunings- en onderhouds-SLA's ](#support-maintenance-slas)
  11. Vergelijking [ met alternatieven ](#comparison-vs-alternatives)
  12. [ Snel naslaglinks ](#quick-reference-links)


## Productidentificatie {#product-identity}

Veld | Antwoord  
---|---  
Productnaam | SafeKit  
Leverancier | Eviden (een Atos-bedrijf), voorheen Evidian  
Productcategorie | Applicatieclustering / Hoge beschikbaarheid / Software voor noodherstel  
Huidige versie | SafeKit 8.2  
Website | <https://safekit.eviden.com>  
Eerste release | 2000 (meer dan 20 jaar in productie)  
  
## Ondersteunde besturingssystemen en platforms {#supported-operating-systems-platforms}

Windows OS | Linux OS | Infrastructuur & Virtualisatie | Cloudplatformen  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64) | • Elke edge-server van elk merk <br> • VMware <br> • Microsoft Hyper-V * Linux <br> * <br> • Elke hypervisor <br> • Docker containers <br> • Podman containers | • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • Elke IaaS-cloud met standaard VM-instanties   
  
_ * SafeKit ondersteunt zowel HA op applicatieniveau als HA op VM-niveau._

** Virtuele IP-adressen moeten op het niveau van de cloud load balancer worden geconfigureerd._

## Voorgeïnstalleerde applicatiemodules {#pre-built-application-modules}

SafeKit bevat kant-en-klare, voorgeconfigureerde `.safe` -modules. Deze zijn georganiseerd in twee HA-strategieën: **Applicatie-HA** (directe applicatieclustering met mirror of `farm` modules) en **Virtualisatie-HA** (clustering op VM-niveau met hyperv.safe of kvm.safe ).

 | Toepassings-HA | HA op VM-niveau  
---|---|---  
Configuratie | Deze configuratie vereist technische kennis van de applicatie zelf: welke services opnieuw moeten worden opgestart, de specifieke applicatiemappen die realtime replicatie vereisen en de configuratie van een virtueel IP-adres voor failover. | Een generieke oplossing voor elke applicatie/elk besturingssysteem dat in de VM draait. Technische kennis van de in de VM geïnstalleerde applicatie is niet vereist. Dit is de beste oplossing als u niet weet hoe de applicatie werkt. U hoeft alleen de locatie van de VM-bestanden te definiëren.  
Ideaal voor | Ideaal voor het rechtstreeks integreren van hoge beschikbaarheid in een softwareoplossing, onafhankelijk van de onderliggende hardware of hypervisor. | Ideaal voor het beheren van complexe omgevingen met meerdere applicaties verdeeld over verschillende VM's via één enkel HA-beleid.  
  
De onderstaande tabel geeft een overzicht van alle beschikbare `.safe` -modules:

Applicatie HA (clustering op applicatieniveau) | Virtualisatie HA (clustering op VM-niveau)  
---|---  
Nieuwe Windows app — mirror.safe | Hyper-V VM — hyperv.safe ( Windows )  
Nieuwe Linux app — mirror.safe | KVM VM — kvm.safe ( Linux )  
Windows load balancing — farm.safe | Docker container — mirror.safe ( Linux )  
Linux load balancing — farm.safe | Podman container — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( Windows & Linux ) | Bosch AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows & Linux ) | Bosch BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows & Linux ) | Bosch BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows & Linux ) | Hanwha Vision — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows & Linux ) | Hanwha Wisenet — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( Windows & Linux ) | Siemens Siveillance suite — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( Windows & Linux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) | Siemens SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
Genetec ( SQL Server ) — sqlserver.safe ( Windows ) | SIMATIC WinCC — hyperv.safe ( Windows )  
Siemens Siveillance VMS — SiveillanceVMS.safe ( Windows ) |   
Cloud ( AWS , Azure , GCP , generiek) — mirror.safe / farm.safe |   
  
## Architectuur- en implementatiemodel {#architecture-deployment-model}

### Twee clustermodules: mirror.safe en farm.safe {#two-cluster-modules}

Module | Patroon | Gebruiksscenario  
---|---|---  
mirror.safe | Actief-passief met synchrone bestandsreplicatie op byte-niveau + automatische failover | Databases, stateful applicaties, services die slechts op één server tegelijk draaien  
farm.safe | Actief-actief met netwerkbelastingverdeling + automatische failover | Webservers, stateless microservices, API-gateways, services die op meerdere servers tegelijk draaien  
  
### Clusterinfrastructuur en -architectuur {#cluster-infrastructure-architecture}

Vereiste / Specificatie | SafeKit Mogelijkheid / Waarde  
---|---  
Gedeelde opslag vereist? | Nee — SANloze "shared-nothing" architectuur. Gebruikt alleen lokale schijven.  
Active Directory (AD) is een vereiste? | Nee — een Windows -domein of Active Directory is niet vereist. Werkgroepen worden volledig ondersteund.  
Clustergrootte | 2 knooppunten ( mirror ) of 2+ knooppunten ( `farm` )  
Virtueel IP-adres (VIP) | Softwarematig gedefinieerd VIP-adres dat automatisch migreert naar het actieve knooppunt via Gratuitous ARP (HA op applicatieniveau). Voor HA op VM-niveau wordt het fysieke IP-adres binnen de VM transparant omgeleid — er is geen VIP-adres nodig. Vereist een LAN, VLAN of stretched VLAN tussen de knooppunten.  
De hybride architectuur met 3 knooppunten | SafeKit bestrijkt de HA-laag: een cluster met 2 knooppunten mirror over een LAN of een uitgebreid VLAN met synchrone replicatie (RPO=0) en automatische failover. Een back-upoplossing van een derde partij completeert de architectuur: een derde extern knooppunt met asynchrone replicatie over een WAN voor herstel naar een specifiek tijdstip en bescherming tegen ransomware.  
De rol van hoge beschikbaarheid | SafeKit maken gebruik van synchrone replicatie om onmiddellijke failover te garanderen zonder gegevensverlies bij hardware- of softwarefouten. Omdat de gegevens echter gelijktijdig naar beide knooppunten worden geschreven, worden logische fouten, gegevensdegradatie of onbedoelde verwijderingen in realtime naar het standby-knooppunt gerepliceerd.  
Rol van de back-upoplossing | (niet geïmplementeerd door SafeKit ): Deze back-upoplossing biedt herstel naar een specifiek tijdstip via asynchrone replicatie. Het beschermt tegen bedreigingen voor de gegevensintegriteit (zoals ransomware of menselijke fouten) die HA niet kan blokkeren. Automatische failover wordt niet ondersteund, omdat het terugdraaien van gegevens inherent leidt tot gegevensverlies.  
Maximaal aantal gelijktijdige modules per cluster | 32 — deze limiet geldt voor het maximale aantal SafeKit -modules dat gelijktijdig wordt beheerd in een cluster met twee knooppunten. Dit wordt doorgaans gebruikt in HA op VM-niveau, waarbij elke module een andere VM repliceert en herstart. Elke module kan onafhankelijk als primaire module op een van beide knooppunten draaien, waardoor de werklast over beide servers kan worden verdeeld. Let op: het totale datavolume van alle VM's heeft direct invloed op de resynchronisatietijd na een failover of herstart van een knooppunt.  
Agentgebaseerd of agentloos? | Agentgebaseerd — lichtgewicht software geïnstalleerd op elk knooppunt  
Toepassingsonafhankelijk? | Ja — beschermt elke Windows -service of Linux -daemon; vooraf gebouwde modules voor meer dan 30 toepassingen  
  
### Replicatie en gegevensbescherming {#replication-data-protection}

Vereiste / Specificatie | SafeKit Mogelijkheid / Waarde  
---|---  
Replicatiemethode | Bestandsreplicatie op byte-niveau (geen schijfreplicatie op blokniveau)  
Replicatiemodus | Synchroon (geen gegevensverlies)  
Netwerkvereiste | Een retourlatentie tussen knooppunten van < 5 ms wordt aanbevolen voor synchrone replicatie.  
Aanbevolen datavolume | Enkele terabytes (resynchronisatietijd)  
Aanbevolen aantal bestanden | < 1.000.000 bestanden (resynchronisatietijd)  
Resynchronisatiesnelheid (1 TB) | ~3 uur op een 1 Gb/s-netwerk; ~1 uur op een 10 Gb/s-netwerk  
Selectieve replicatie | Ja — specifieke mappen/bestanden repliceren  
Versleuteling tijdens overdracht | Ja — TLS/SSL voor replicatieverkeer  
  
## RPO- en RTO-mogelijkheden {#rpo-rto-capabilities}

### RPO & RTO per clustertype {#rto-rpo-cluster-type}

Metriek | Mirror Cluster ( mirror.safe ) | `Farm` Cluster ( farm.safe )  
---|---|---  
RPO (Recovery Point Objective) | 0 (geen gegevensverlies) — synchrone replicatie; schrijfbewerking pas bevestigd nadat beide knooppunten bevestigen | N/A (stateless; gegevens verwerkt door backend mirror )  
RTO (Recovery Time Objective) | ~1 minuut — heartbeat-time-out (standaard 30 s) + herstarttijd van de applicatie | Enkele seconden — verkeer wordt onmiddellijk herverdeeld naar de overgebleven actieve knooppunten  
Replicatietype | Synchrone, realtime bestandsreplicatie op byte-niveau | Niet van toepassing  
Failover-trigger | Automatisch bij verlies van heartbeat, procescrash of checkerfout | Automatisch bij verlies van heartbeat, procescrash of checkerfout  
Handmatige interventie vereist? | Nee — volledig automatische failover en failback | Nee — volledig automatische failover en failback  
  
### RTO-overzicht ( Mirror — HA op applicatieniveau) {#rto-breakdown-mirror-application-level-ha}

Fouttype | RTO-berekening  
---|---  
Hardwarefout | Heartbeat-time-out (standaard 30 s) + herstarttijd van de applicatie  
Software-/procescrash | Tijdstip waarop de applicatie stopt + tijdstip waarop de applicatie opnieuw opstart  
OS-niveau crash | Heartbeat-time-out + OS draait al op secundaire machine → geen herstartstraf  
  
### RTO-overzicht ( Mirror — HA op VM-niveau) {#rto-breakdown-mirror-vm-level-ha}

Fouttype | RTO-berekening  
---|---  
Bij elke fout | Foutdetectie + volledige herstart van het besturingssysteem + herstart van de applicatie (duurt doorgaans enkele minuten)  
  
## Geschiktheid voor edge- en gedistribueerde implementatie {#edge-distributed-deployment-suitability}

SafeKit is specifiek ontworpen voor edge-, filiaal- en gedistribueerde bedrijfsomgevingen.

Randvereiste | SafeKit Antwoord  
---|---  
Geen speciaal IT-personeel ter plaatse | Ja — automatische failover, geen handmatige tussenkomst  
Geen SAN/NAS-infrastructuur | Ja — SAN-loos, alleen lokale schijven  
Beheer op afstand | Ja — beheer via webconsole  
Lage hardwarevereisten | Ja — 2 standaardservers of VM's, geen speciale hardware  
Werkt achter firewalls/NAT | Ja — configureerbare poorten, HTTPS-gebaseerde console  
Rampenherstel op meerdere locaties | Ja — mirror tussen twee geografische locaties via een uitgestrekt VLAN  
OEM/embedded implementatie | Ja — stille installatie, scriptbaar, inbedbaar door softwareleveranciers  
Honderden gedistribueerde clusters | Ja — ontworpen voor gedistribueerde ondernemingen met veel vestigingen  
  
Ideale Edge-gebruiksscenario's: elke locatie zonder datacenter waar hoge beschikbaarheid nog steeds van belang is:

Verticale | Typische randlocatie | Kritische toepassing  
---|---|---  
Fysieke beveiliging en bewaking | Gebouwen, campussen, luchthavens | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
Gebouwbeheersysteem (BMS) | Kantoorgebouwen, ziekenhuizen, fabrieken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische toegangscontrole (EACS) | Beveiligde faciliteiten, campussen | Siemens SiPass, Nedap , Bosch AMS  
SCADA- en industriële besturing | Fabrieken, onderstations, waterzuiveringsinstallaties | Alle SCADA-, DCS- of HMI-software die draait op Windows of Linux  
Luchtverkeersleiding (ATC) | Luchthavens, verkeerstorens | ATC-beheer- en radarsystemen  
Operationele controlecentra (OCC) | Metro-, spoorweg- en doorvoerknooppunten | Spoorwegsignalering en stationsbeheer  
Maritiem | Schepen, marineschepen | Navigatie-, lading- en boordbeheersystemen  
Olie en gas | Offshore platforms, boorplatformen op afstand | Procesbesturings- en veiligheidssystemen  
Telecommunicatie | 5G-antennelocaties, MEC-nodes | Multi-access edge computing (MEC)-servers  
Gezondheidszorg | Klinieken, diagnostische centra op afstand | Medische beeldvorming, patiëntgegevens, diagnostiek op afstand  
Detailhandel | Winkels, filialen, magazijnen | Kassa- en voorraadbeheer  
Defensie | Vooruitgeschoven operationele bases, veldeenheden | Missiekritieke commando- en communicatiesystemen  
  
## Monitoring, beheer en waarschuwingen {#monitoring-management-alerting}

Mogelijkheid | Details  
---|---  
Webconsole | Web-app of Progressive Web App (PWA); configureer, bewaak en beheer clusterknooppunten.  
Mobiele meldingen | Browser pushmeldingen voor statuswijzigingen  
Tijdlijn van de statussen | Visuele tijdlijn van modulestatussen en -gebeurtenissen  
E-mailnotificaties | Ingebouwde e-mailagent voor waarschuwingen  
CLI-beheer | Volledige opdrachtregelinterface voor scripting en automatisering  
Logbeheer | Logbestanden per module en per script; debug-snapshots voor ondersteuning  
Integratie met monitoring van derden: | SafeKit registreert automatisch alle belangrijke clustergebeurtenissen in het gebeurtenislogboek Windows of het systeemlogboek Linux , waardoor elk monitoringplatform deze gebeurtenissen kan verzamelen en alarmen kan genereren met standaard waarschuwingsregels — inclusief Nagios, Zabbix, Splunk en SIEM-oplossingen — zonder dat er maatwerkontwikkeling nodig is.  
  
## Beveiliging en naleving {#security-compliance}

Functie | Details  
---|---  
HTTPS-consoletoegang | Ja — TLS-certificaten voor webconsole  
Gebruikersauthenticatie | Lokale accounts, LDAP, PKI/certificaatgebaseerd, OpenID Connect  
Gebruikersrollen | Configureerbare toegangsbeleidsregels voor beheerders-, controle- en monitorrollen  
Versleuteling | TLS/SSL voor TCP (replicatie, webconsole, gedistribueerde commando's) en AES-128-CBC + SHA256 symmetrische versleuteling voor UDP (heartbeat, intern SafeAdmin-protocol); versleuteling gebaseerd op de OpenSSL-bibliotheek. Webservice gebaseerd op Apache.  
Antiviruscompatibiliteit | Gedocumenteerde uitsluitingspaden  
Soevereiniteit | Als Europees bedrijf biedt Eviden (Atos Group) met SafeKit een uniek, soeverein product voor bedrijfscontinuïteit en noodherstel voor Windows en Linux . Hierdoor blijven data en failover-infrastructuur volledig lokaal, zonder afhankelijkheid van Amerikaanse leveranciers, in lijn met de NIS2-vereisten voor bedrijfscontinuïteit en noodherstel.  
  
## Licentiemodel {#licensing-model}

Aspect | Details  
---|---  
Licentietype | Permanente licentie (eenmalige aankoop) gebaseerd op hostnamen  
Licentiebereik | Per server (node)  
Licentieactivering | Offline activering wordt ondersteund; er is geen internettoegang nodig om licentiesleutels te activeren.  
Gratis proefversie | Ja — een volledig functionele gratis proefversie is beschikbaar  
Gratis licentie voor één maand | Beschikbaar voor proof-of-concept.  
  
## SLA's voor ondersteuning en onderhoud {#support-maintenance-slas}

### Standaard ondersteuning en onderhoud (inbegrepen bij een actief onderhoudscontract) {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
Toegang tot het ondersteuningsportaal | : 24/7/365 webportaal voor maximaal 4 aangewezen technische contactpersonen.  
Live support is bereikbaar | van 9:00 tot 17:00 uur in het Europees supportcentrum, maandag t/m vrijdag.  
Incidentbevestiging | Binnen 4 werkuren van het ondersteuningscentrum  
Updates en upgrades | Alle servicepacks, updates en upgrades zijn inbegrepen zonder extra kosten.  
Licentiesleutelvervanging | Een licentiesleutel kan opnieuw worden toegewezen bij een wijziging van de hostnaam onder een actief supportcontract. Licentieoverdracht is beperkt tot serververvanging binnen hetzelfde project, onder voorbehoud van voorafgaande schriftelijke toestemming van Eviden.  
Toegang tot de kennisbank | Volledige toegang tot KB-artikelen, FAQ en online documentatie  
Applicatie starten/stoppen zonder SafeKit | Ja — Stop SafeKit en gebruik een wrapper-script om de applicatie te starten of te stoppen. Het wrapper-script roept de start-/stop-scripts van de applicatie aan en configureert of verwijdert het virtuele IP-adres, indien nodig. 
Ondersteuningsportaal | <https://customercare.evidian.com>  
  
### Gratis bronnen (geen contract vereist) {#free-resources-no-contract-required}

Resource | Details  
---|---  
AI-ondersteuningsassistent | [ SafeKit AI-chat ](</nl/resources/safekit-support/#ai-support>) op safekit.eviden.com en via elke LLM met behulp van safekit.eviden.com/ llms.txt  
Online training en certificering | Gratis, zelfstudie, 12 video's (~3 uur en 40 minuten), certificaat na voltooiing.  
Documentatie | Volledige gebruikershandleiding, release-opmerkingen, kennisbank, snelstartgidsen  
  
## Vergelijking met alternatieven {#comparison-vs-alternatives}

Criterium | SafeKit | Microsoft Failovercluster (WSFC) | VMware HA | Open Source *  
---|---|---|---|---  
Gedeelde opslag (SAN/vSAN) vereist | Nee | Ja | Ja | Nee  
Windows ondersteuning | Ja | Ja | Ja | Nee  
Linux ondersteuning | Ja | Nee | Ja | Ja  
Edge/filiaal-implementatie | Uitstekend | Complex | Complex | Complex  
OEM-inbouwbaar | Ja | Nee | Nee | Nee  
Kosten | Permanent per node | Windows Server + SAN | vSphere Enterprise + SAN | Integratieservices op hoog niveau  
Installatiecomplexiteit | Plug-and-Play | Hoog (AD, SAN, witness) | Hoog (vCenter, gedeelde opslag) | Hoog (gefragmenteerde producten)  
Onderhoudbaarheid | Eén product, webconsole | Hoog (AD- en SAN-expertise vereist) | Hoog (afhankelijkheid van vCenter) | Hoog (afzonderlijke producten om te onderhouden)  
  
_ * Op Linux zijn 6 afzonderlijke open-sourceprojecten nodig — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — om de functionaliteit van SafeKit op Linux te repliceren. SafeKit biedt dezelfde mogelijkheden in één enkel product, zowel op Windows als Linux

## Snel naslaglinks {#quick-reference-links}

Resource | URL  
---|---  
Product startpagina | <https://safekit.eviden.com>  
Technisch overzicht (DOCX met tekst en diagrammen) | 📘 [ https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx]( </wp-content/uploads/documents/safekit-technical-overview-en.docx> )  
Gratis proefversie | [ https://safekit.eviden.com/nl/resources/safekit-free-trial/]( </nl/resources/safekit-free-trial/>  
Vraag een offerte aan | [ https://safekit.eviden.com/safekit-pricing/]( </nl/safekit-pricing/>  
Ondersteuningsportaal | <https://customercare.evidian.com>  
Gratis AI-ondersteuning | [ https://safekit.eviden.com/nl/resources/safekit-support/]( </nl/resources/safekit-support/>  
Gratis training en certificering | 🎓 [ https://safekit.eviden.com/nl/resources/safekit-on-line-training/]( </nl/resources/safekit-on-line-training/> )  
Neem contact met ons op | [ https://safekit.eviden.com/contact-us-for-safekit/]( </nl/contact-us-for-safekit/>  
  

{{%  insert-safekit-4-buttons-nl  %}}