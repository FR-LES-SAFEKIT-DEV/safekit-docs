---
title: "SafeKit Technische handleiding voor RFI- en RFP-documenten"
canonical: "https://safekit.eviden.com/nl/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Vind technische informatie over SafeKit om informatieaanvragen (RFI's) en offerteaanvragen (RFP's) voor te bereiden. Lees meer over ondersteunde systemen, architecturen, hersteltijden, beveiliging, licenties en ondersteuning."
category: "resources"
lang: "nl"
topics: "Overzicht, Inhoudsopgave, Productinformatie, Ondersteunde besturingssystemen en platforms, SafeKit High Availability Limitations, Voorgeconfigureerde applicatiemodules, Architectuur en implementatie, Gegevensverlies en hersteltijden (RPO en RTO), Externe locaties en gedistribueerde implementaties, Monitoring, beheer en waarschuwingen, Beveiliging en naleving, Licenties, Ondersteuning en onderhoud, Vergelijking met andere oplossingen, Nuttige links"
---

# SafeKit technische handleiding voor RFI- en RFP-documenten {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Overzicht {#overview}

Gebruik deze pagina om een informatieaanvraag (RFI) of een offerteaanvraag (RFP) op te stellen. Hier vindt u antwoorden op veelgestelde technische vragen over SafeKit -software voor hoge beschikbaarheid. De informatie helpt inkoopteams en oplossingsarchitecten bij het definiëren van hun eisen.

## Inhoudsopgave {#table-of-contents}

  1. [Productinformatie](#product-identity)
  2. [Ondersteunde besturingssystemen en platforms](#supported-operating-systems-platforms)
  3. [SafeKit High Availability Limitations](#safekit-ha-limitations)
  4. [Voorgeconfigureerde applicatiemodules](#pre-built-application-modules)
  5. [Architectuur en implementatie](#architecture-deployment-model)
  6. [Gegevensverlies en hersteltijden (RPO en RTO)](#rpo-rto-capabilities)
  7. [Externe locaties en gedistribueerde implementaties](#edge-distributed-deployment-suitability)
  8. [Monitoring, beheer en waarschuwingen](#monitoring-management-alerting)
  9. [Beveiliging en naleving](#security-compliance)
  10. [Licenties](#licensing-model)
  11. [Ondersteuning en onderhoud](#support-maintenance-slas)
  12. [Vergelijking met andere oplossingen](#comparison-vs-alternatives)
  13. [Nuttige links](#quick-reference-links)


## Productinformatie {#product-identity}

Veld | Antwoord  
---|---  
Productnaam | SafeKit  
Leverancier | Eviden, onderdeel van de Atos Group. Voorheen bekend als Evidian.  
Softwareontwikkeling | Ontwikkeld in Frankrijk.
Productcategorie | Software voor applicatieclustering, hoge beschikbaarheid en noodherstel.  
Huidige versie | SafeKit 8.2  
Website | [https://safekit.eviden.com/nl/](</nl/>)  
Eerste release | 2000. Al meer dan 20 jaar in gebruik in de productie.  
  
## Ondersteunde besturingssystemen en platforms {#supported-operating-systems-platforms}

Windows-besturingssystemen | Linux-besturingssystemen | Infrastructuur en virtualisatie | Cloudplatforms  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Elke edge-server van elk merk<br> • VMware<br> • Microsoft Hyper-V [1]<br> • Linux KVM [1]<br> • Elke hypervisor<br> • Docker-containers<br> • Podman-containers  |  • Amazon Web Services (AWS) [2]<br> • Microsoft Azure [2]<br> • Google Cloud Platform (GCP) [2]<br> • Elke IaaS-cloud met standaard VM-instanties   
  
**[1]** SafeKit biedt hoge beschikbaarheid voor individuele applicaties of complete virtuele machines.

**[2]** Configureer in de cloud virtuele IP-adressen op de cloud load balancer.

{{%  insert-safekit-usage-nl  %}}

## Voorgeconfigureerde applicatiemodules {#pre-built-application-modules}

SafeKit bevat kant-en-klare `.safe` modules. Er zijn twee manieren om applicaties te beschermen. **Applicatie-hoge beschikbaarheid** beschermt een applicatie direct met een mirror of <span class="notranslate farm-term" translate="no">farm</span> . **Hoge beschikbaarheid van virtuele machines** beschermt de gehele virtuele machine met een hyperv.safe of kvm.safe module.

Vergelijkingscriterium | Hoge beschikbaarheid van de applicatie | Hoge beschikbaarheid van virtuele machines  
---|---|---  
Configuratie | U moet weten welke applicatieservices u opnieuw moet starten en welke mappen u moet repliceren. U moet ook het virtuele IP-adres configureren dat voor failover wordt gebruikt. | U hoeft alleen de locatie van de virtuele machinebestanden op te geven. U hoeft niet te weten hoe de applicaties binnen de virtuele machine werken. Deze aanpak beschermt zowel de applicaties als het besturingssysteem.  
Aanbevolen gebruik | Voeg hoge beschikbaarheid rechtstreeks toe aan een softwareoplossing, zonder afhankelijk te zijn van specifieke hardware of een specifieke hypervisor. | Beheer meerdere applicaties verspreid over verschillende virtuele machines met één beleid voor hoge beschikbaarheid.  
  
De onderstaande tabel geeft een overzicht van alle beschikbare `.safe` modules:

Hoge beschikbaarheid van de applicatie | Hoge beschikbaarheid van virtuele machines  
---|---  
Nieuwe Windows-app — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
Nieuwe Linux-app — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows-taakverdeling — farm.safe | Docker-container — mirror.safe (Linux)  
Linux load balancing — farm.safe | Podman-container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Siemens Siveillance suite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generiek) — mirror.safe / farm.safe |   
  
## Architectuur en implementatie {#architecture-deployment-model}

### Twee clustermodules: mirror.safe en farm.safe {#two-cluster-modules}

Module | Hoe het werkt | Typische toepassingen  
---|---|---  
mirror.safe | Eén server is actief en de andere staat in standby. Bestanden worden synchroon op byte-niveau gerepliceerd. Failover is automatisch. | Databases, applicaties die de status opslaan en services die slechts op één server tegelijk draaien.  
farm.safe | Er zijn meerdere servers tegelijk actief. SafeKit verdeelt het netwerkverkeer over deze servers en zorgt automatisch voor failover. | Webservers, stateless microservices, API-gateways en services die op meerdere servers tegelijk draaien.  
  
### Clusterinfrastructuur {#cluster-infrastructure-architecture}

Vereiste | SafeKit functionaliteiten  
---|---  
Gedeelde opslag nodig? | Nee. SafeKit gebruikt lokale schijven. Het heeft geen SAN of gedeelde opslag nodig.  
Active Directory vereist? | Nee. SafeKit vereist geen Windows-domein of Active Directory. Het ondersteunt ook werkgroepen.  
Clustergrootte | 2 knooppunten ( mirror ) of 2 of meer knooppunten ( <span class="notranslate farm-term" translate="no">farm</span> )  
Virtueel IP-adres (VIP) | Voor hoge beschikbaarheid van applicaties wordt het virtuele IP-adres automatisch via Gratuitous ARP naar het actieve knooppunt verplaatst. Voor hoge beschikbaarheid van virtuele machines wordt verkeer naar het IP-adres binnen de virtuele machine automatisch omgeleid. Er is geen apart virtueel IP-adres nodig. De knooppunten moeten een LAN of een VLAN dat tussen locaties is uitgebreid, delen.  
Architectuur met drie knooppunten | SafeKit draait een mirror met twee knooppunten op een LAN of een VLAN dat is uitgebreid tussen locaties. Het biedt synchrone replicatie met nul dataverlies (RPO=0) en automatische failover. Een apart back-upproduct repliceert data asynchroon naar een derde knooppunt via een WAN. Deze back-up maakt herstel naar een eerder tijdstip mogelijk en biedt bescherming tegen ransomware.  
Doel van hoge beschikbaarheid | SafeKit repliceert gegevens synchroon naar beide knooppunten. Dit maakt automatische failover mogelijk zonder gegevensverlies na een hardware- of softwarefout. Logische fouten, gegevenscorruptie en onbedoelde verwijderingen worden echter ook direct naar het standby-knooppunt gekopieerd.  
Doel van back-ups | Met back-ups kunt u gegevens herstellen vanaf een eerder tijdstip. Een apart back-upproduct, niet SafeKit , biedt deze bescherming via asynchrone replicatie. Back-ups helpen bij het herstellen van ransomware en menselijke fouten. Dit herstel is geen automatische failover. Bij het herstellen van een oudere back-up gaan wijzigingen die na die back-up zijn aangebracht verloren.  
Maximaal aantal modules dat tegelijkertijd actief is | Een cluster met twee knooppunten kan tot 32 modules tegelijk beheren. Voor de bescherming van virtuele machines repliceert en herstart elke module een andere virtuele machine. Elke module kan primair zijn op een van beide knooppunten, zodat beide servers de werklast kunnen delen. De totale hoeveelheid data beïnvloedt de resynchronisatietijd na een failover of een herstart van een knooppunt.  
Is er op elke node software nodig? | Ja. Op elke node is een lichtgewicht softwarepakket geïnstalleerd.  
Ondersteunde applicaties | SafeKit kan elke Windows-service of Linux-daemon beschermen. Er zijn voorgeconfigureerde modules beschikbaar voor meer dan 30 toepassingen.  
  
### Replicatie en gegevensbescherming {#replication-data-protection}

Vereiste | SafeKit functionaliteiten  
---|---  
Replicatiemethode | SafeKit repliceert bestandswijzigingen op byte-niveau. Het repliceert geen schijfblokken.  
Replicatiemodus | Synchrone replicatie, zonder gegevensverlies.  
Netwerkvereiste | Voor synchrone replicatie wordt een retourlatentie van minder dan 5 ms tussen knooppunten aanbevolen.  
Aanbevolen datavolume | Een paar terabytes, om de synchronisatietijd beheersbaar te houden.  
Aanbevolen aantal bestanden | Minder dan 1.000.000 bestanden, om de synchronisatietijd beheersbaar te houden.  
Tijd nodig om 1 TB te resynchroniseren | Ongeveer 3 uur via een 1 Gb/s-netwerk of 1 uur via een 10 Gb/s-netwerk.  
Selectieve replicatie | Je kunt zelf kiezen welke mappen en bestanden je wilt kopiëren.  
Versleuteling tijdens overdracht | Het replicatieverkeer is versleuteld met TLS/SSL.  
  
## Gegevensverlies en hersteltijden (RPO en RTO) {#rpo-rto-capabilities}

### RPO en RTO voor elk clustertype {#rto-rpo-cluster-type}

Metrisch | Mirror ( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO (recovery point objective) | Geen gegevensverlies. Een schrijfbewerking wordt pas bevestigd nadat beide knooppunten deze hebben bevestigd. | Niet van toepassing op stateless services. Een apart mirror cluster beheert de data.  
RTO (recovery time objective) | Ongeveer een minuut. Dit is inclusief de time-out <span class="notranslate farm-term" translate="no">heartbeat</span> (standaard 30 seconden) en de tijd die nodig is om de applicatie opnieuw op te starten. | Een paar seconden. Het verkeer wordt herverdeeld over de resterende actieve knooppunten.  
Replicatietype | Synchrone, realtime bestandsreplicatie op byte-niveau | Niet van toepassing  
Failover-trigger | Automatisch wanneer <span class="notranslate farm-term" translate="no">heartbeats</span> stopt, een proces vastloopt of een controle een fout detecteert. | Automatisch wanneer <span class="notranslate farm-term" translate="no">heartbeats</span> stopt, een proces vastloopt of een controle een fout detecteert.  
Handmatige interventie vereist? | Nee. Failover en failback verlopen automatisch. | Nee. Failover en failback verlopen automatisch.  
  
### Hersteltijd voor applicaties die worden beschermd door een mirror cluster {#rto-breakdown-mirror-application-level-ha}

Fouttype | Hoe de hersteltijd wordt berekend  
---|---  
Hardwarefout | <span class="notranslate farm-term" translate="no">Heartbeat</span> wordt na een time-out (standaard 30 seconden) opnieuw opgestart.  
Software- of procescrash | Het moment om de applicatie te stoppen, gevolgd door het opnieuw opstarten van de applicatie.  
Het besturingssysteem crasht. | <span class="notranslate farm-term" translate="no">Heartbeat</span> time-out. Het besturingssysteem draait al op de standby-server, dus deze hoeft niet opnieuw op te starten.  
  
### Hersteltijd voor virtuele machines die worden beschermd door een mirror cluster {#rto-breakdown-mirror-vm-level-ha}

Fouttype | Hoe de hersteltijd wordt berekend  
---|---  
Elke mislukking | Het duurt even om de fout te detecteren, het besturingssysteem van de virtuele machine opnieuw op te starten en de applicatie opnieuw te starten. Dit duurt meestal een paar minuten.  
  
## Externe locaties en gedistribueerde implementaties {#edge-distributed-deployment-suitability}

SafeKit is ontworpen voor externe locaties, filiaalvestigingen en organisaties met meerdere locaties.

Vereiste op een externe locatie | SafeKit functionaliteiten  
---|---  
Er is geen speciaal IT-personeel aanwezig op locatie. | De failover verloopt automatisch en vereist geen handmatige actie.  
Geen SAN of NAS | SafeKit maakt gebruik van lokale schijven en vereist geen gedeelde opslag.  
Beheer op afstand | Beheer het cluster via een webconsole.  
Beperkte hardware | Twee standaardservers of virtuele machines zijn voldoende. Er is geen speciale hardware nodig.  
Firewalls en netwerkadresvertaling (NAT) | Poorten kunnen worden geconfigureerd. De webconsole maakt gebruik van HTTPS.  
Herstelwerkzaamheden na rampen tussen locaties | Een mirror kan twee locaties met elkaar verbinden via een VLAN dat ertussen is uitgebreid.  
Integratie door software-uitgevers | Software-uitgevers kunnen SafeKit in hun producten integreren. De installatie kan zonder tussenkomst van de gebruiker plaatsvinden en kan worden geautomatiseerd met scripts.  
Honderden clusters verspreid over vele locaties | SafeKit is ontworpen voor organisaties met veel vestigingen.  
  
De volgende sites vereisen een hoge beschikbaarheid, zelfs als ze geen eigen datacenter hebben:

Industrie | Typische locatie | Kritische toepassingen  
---|---|---  
Fysieke beveiliging en bewaking | Gebouwen, campussen, luchthavens | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebouwbeheersysteem (BMS) | Kantoorgebouwen, ziekenhuizen, fabrieken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische toegangscontrole (EACS) | Beveiligde faciliteiten, campussen | Siemens SiPass, Nedap, Bosch AMS  
SCADA & industriële besturing | Fabrieken, onderstations, waterzuiveringsinstallaties | Elke SCADA-, DCS- of HMI-software die draait op Windows of Linux.  
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
Webconsole | Configureer, bewaak en beheer clusterknooppunten via een webapplicatie of een Progressive Web App (PWA).  
Mobiele meldingen | Ontvang browsernotificaties wanneer een module van status verandert.  
Tijdlijn | Bekijk statuswijzigingen en gebeurtenissen van modules in chronologische volgorde.  
E-mailmeldingen | Een ingebouwde e-mailagent verstuurt meldingen.  
Commandoregelinterface | Gebruik de opdrachtregelinterface om scripts te schrijven en taken te automatiseren.  
Logboekbeheer | Elke module en elk script heeft zijn eigen logbestanden. <span class="notranslate farm-term" translate="no">snapshots</span> van modules helpen het supportteam bij het onderzoeken van problemen.  
Integratie met monitoringtools | SafeKit registreert belangrijke gebeurtenissen in het cluster in het Windows-gebeurtenislogboek of het Linux-syslog. Monitoringtools kunnen deze gebeurtenissen verzamelen en waarschuwingen activeren met standaardregels. Dit werkt met Nagios, Zabbix, Splunk en SIEM-tools zonder dat er maatwerkontwikkeling nodig is.  
  
## Beveiliging en naleving {#security-compliance}

Functie | Details  
---|---  
HTTPS | TLS-certificaten beveiligen de toegang tot de webconsole.  
Gebruikersauthenticatie | Lokale accounts, LDAP, certificaten (PKI) en OpenID Connect  
Gebruikersrollen | Configureer toegangsbeleid voor beheer, controle en monitoring.  
Versleuteling | TCP-verkeer maakt gebruik van TLS/SSL voor replicatie, de webconsole en gedistribueerde commando's. UDP-verkeer maakt gebruik van AES-128-CBC-encryptie met SHA256 voor <span class="notranslate farm-term" translate="no">heartbeats</span> en het interne SafeAdmin-protocol. SafeKit gebruikt de OpenSSL-bibliotheek voor encryptie en Apache voor de webservice.  
Antivirus | In de documentatie staan de paden vermeld die moeten worden uitgesloten van antivirusscans.  
Soevereiniteit | SafeKit is ontwikkeld in Frankrijk door Eviden, onderdeel van de Atos Group. Het beschermt Windows- en Linux-applicaties en zorgt ervoor dat uw gegevens en servers op uw eigen locatie blijven. SafeKit kan helpen te voldoen aan de eisen van de Europese NIS2-richtlijn voor bedrijfscontinuïteit en noodherstel.
  
## Licenties {#licensing-model}

Aspect | Details  
---|---  
Licentietype | Een permanente licentie wordt eenmalig aangeschaft en is gekoppeld aan een hostnaam.  
Licentieomvang | Eén licentie per server (node)  
Licentieactivering | Licentiesleutels kunnen zonder internetverbinding worden geactiveerd.  
Gratis proefperiode | Een gratis proefperiode omvat alle functies.  
Gratis licentie voor één maand | Beschikbaar om een proof of concept te testen.  
  
## Ondersteuning en onderhoud {#support-maintenance-slas}

### Standaard ondersteuning en onderhoud met een actief onderhoudscontract. {#standard-support-maintenance-included-with-active-maintenance-contract}

Dienst | Details  
---|---  
Toegang tot het ondersteuningsportaal | Het webportaal is 24 uur per dag, 7 dagen per week beschikbaar voor maximaal vier aangewezen technische contactpersonen.  
Live supporturen | Maandag tot en met vrijdag van 9:00 tot 17:00 uur in het Europees ondersteuningscentrum.  
Incidentbevestiging | Binnen vier werkuren van het ondersteuningscentrum  
Updates en upgrades | Alle servicepakketten, updates en upgrades zijn zonder extra kosten inbegrepen.  
Vervanging van de licentiesleutel | Met een actief supportcontract kan een licentiesleutel opnieuw worden toegewezen wanneer een hostnaam verandert. Overdracht is beperkt tot het vervangen van een server binnen hetzelfde project. Voorafgaande schriftelijke toestemming van Eviden is vereist.  
toegang tot de kennisbank | Volledige toegang tot kennisbankartikelen, veelgestelde vragen en online documentatie.  
Noodprocedure | SafeKit biedt een wrapper-script waarmee een applicatie kan worden gestart of gestopt zonder gebruik te maken van de high availability-functies van SafeKit . Dit script roept de start- en stopscripts van de applicatie aan. Het voegt ook het virtuele IP-adres toe of verwijdert het indien nodig.  
Ondersteuningsportaal | <https://customercare.evidian.com>  
  
### Gratis resources zonder ondersteuningscontract {#free-resources-no-contract-required}

Bron | Details  
---|---  
AI-ondersteuningsassistent | Gebruik [SafeKit AI-chat](</nl/resources/safekit-support/#ai-support>) op safekit.eviden.com.   
Online training en certificering | [Leer in je eigen tempo](</nl/resources/safekit-on-line-training/>) met gratis video's van in totaal ongeveer 4 uur. Je ontvangt een certificaat na afronding van de training.  
Documentatie | Gebruikershandleiding, release-opmerkingen, kennisbank en snelle installatiehandleidingen [vindt u hier.](</nl/resources/safekit-free-trial/>)  
  
## Vergelijking met andere oplossingen {#comparison-vs-alternatives}

Criterium | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source [1]  
---|---|---|---|---  
Gedeelde opslag (SAN/vSAN) vereist | Nee | Ja | Ja | Nee  
Windows-ondersteuning | Ja | Ja | Ja | Nee  
Linux-ondersteuning | Ja | Nee | Ja | Ja  
Implementatie op externe locaties | Uitstekend | Complex | Complex | Complex  
OEM | Ja | Nee | Nee | Nee  
Kosten | Permanente licentie per node | Windows Server en SAN | vSphere Enterprise en SAN | Geavanceerde integratiediensten  
Installatiecomplexiteit | Klaar voor configuratie en gebruik. | Hoog: Active Directory-, SAN- en witness-configuratie | Hoog: vCenter- en gedeelde opslagconfiguratie | Hoog: meerdere afzonderlijke producten om te configureren  
Administratie | Eén product beheerd via een webconsole | Hoog: Expertise in Active Directory en SAN | Hoog: afhankelijkheid van vCenter | Hoog: meerdere afzonderlijke producten om te onderhouden  
  
**[1]** Op Linux zijn zes afzonderlijke open-sourceprojecten nodig om dezelfde functionaliteit te bieden: Corosync, Pacemaker, DRBD, Keepalived, STONITH en HAProxy. SafeKit biedt deze functionaliteit in één product voor zowel Windows als Linux.

## Nuttige links {#quick-reference-links}

Bron | URL  
---|---  
Startpagina van het product | [https://safekit.eviden.com/nl/](</nl/>)  
Technisch overzicht (Word-document met tekst en diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Gratis proefperiode | [https://safekit.eviden.com/nl/resources/safekit-free-trial/](</nl/resources/safekit-free-trial/>)  
Vraag een offerte aan | [https://safekit.eviden.com/nl/safekit-pricing/](</nl/safekit-pricing/>)  
Ondersteuningsportaal | <https://customercare.evidian.com>  
Gratis AI-ondersteuning | [https://safekit.eviden.com/nl/resources/safekit-support/](</nl/resources/safekit-support/>)  
Gratis training en certificering | [https://safekit.eviden.com/nl/resources/safekit-on-line-training/](</nl/resources/safekit-on-line-training/>)  
Neem contact met ons op | [https://safekit.eviden.com/nl/contact-us-for-safekit/](</nl/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-nl  %}}
