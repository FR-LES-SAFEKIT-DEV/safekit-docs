---
title: "Technische referentie SafeKit voor RFI en RFP-documenten"
canonical: "https://safekit.eviden.com/nl/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Vind technische informatie over SafeKit om informatieaanvragen (RFI) en offerteaanvragen (RFP) voor te bereiden. Kom meer te weten over ondersteunde systemen, architecturen, hersteltijden, beveiliging, licenties en ondersteuning."
category: "resources"
lang: "nl"
topics: "Overzicht, Inhoudsopgave, Productinformatie, Ondersteunde besturingssystemen en platforms, Beperkingen SafeKit High Availability, Vooraf geconfigureerde applicatiemodules, Architectuur en implementatie, Gegevensverlies en hersteltijden (RPO en RTO), Locaties op afstand en gedistribueerde implementaties, Monitoring en waarschuwingen, Beveiliging en naleving, Licentieverlening, Ondersteuning en onderhoud, Vergelijking met andere oplossingen, Handige links"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 49 expressions"
---

# Technische referentie SafeKit voor RFI en RFP-documenten {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Overzicht {#overview}

Gebruik deze pagina om een verzoek om informatie (RFI) of een verzoek om voorstellen (RFP) voor te bereiden. Hier vindt u antwoorden op veelgestelde technische vragen over SafeKit-software voor hoge beschikbaarheid. De informatie helpt inkoopteams en oplossingsarchitecten bij het definiëren van hun vereisten.

## Inhoudsopgave {#table-of-contents}

  1. [Productinformatie](#product-identity)
  2. [Ondersteunde besturingssystemen en platforms](#supported-operating-systems-platforms)
  3. [Beperkingen SafeKit High Availability](#safekit-ha-limitations)
  4. [Vooraf geconfigureerde applicatiemodules](#pre-built-application-modules)
  5. [Architectuur en implementatie](#architecture-deployment-model)
  6. [Gegevensverlies en hersteltijden (RPO en RTO)](#rpo-rto-capabilities)
  7. [Locaties op afstand en gedistribueerde implementaties](#edge-distributed-deployment-suitability)
  8. [Monitoring en waarschuwingen](#monitoring-management-alerting)
  9. [Beveiliging en naleving](#security-compliance)
  10. [Licentieverlening](#licensing-model)
  11. [Ondersteuning en onderhoud](#support-maintenance-slas)
  12. [Vergelijking met andere oplossingen](#comparison-vs-alternatives)
  13. [Handige links](#quick-reference-links)


## Productinformatie {#product-identity}

Onderwerp | Details  
---|---  
Productnaam | SafeKit  
Leverancier | Eviden, onderdeel van de Atos Group. Voorheen Evidian.  
Land van ontwikkeling | Frankrijk  
Productcategorie | Software voor applicatieclustering, hoge beschikbaarheid en noodherstel  
Huidige versie | SafeKit 8.2  
Website | [https://safekit.eviden.com](/nl/)  
Eerste release | 2000. Al meer dan 20 jaar in gebruik in de productie.  
  
## Ondersteunde besturingssystemen en platforms {#supported-operating-systems-platforms}

Windows-besturingssystemen | Linux-besturingssystemen | Infrastructuur en virtualisatie | Cloudplatforms  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64)  |  • Elke edge-server van elk merk <br> • VMware <br> • Microsoft Hyper-V [1] <br> • Linux KVM [1] <br> • Elke hypervisor <br> • Docker containers <br> • Podman containers  |  • Amazon Web Services (AWS) [2] <br> • Microsoft Azure [2] <br> • Google Cloud Platform (GCP) [2] <br> • Elke IaaS-cloud met standaard VM-instanties   
  
**[1]** SafeKit biedt hoge beschikbaarheid voor individuele applicaties of complete virtuele machines.

**[2]** Configureer in de cloud virtuele IP-adressen op de cloud- load balancer.

{{%  insert-safekit-usage-nl  %}}

## Vooraf geconfigureerde applicatiemodules {#pre-built-application-modules}

SafeKit bevat gebruiksklare `.safe` modules. Er zijn twee manieren om applicaties te beschermen. **Hoge beschikbaarheid van applicaties** beschermt een applicatie rechtstreeks met een mirror of <span class="notranslate farm-term" translate="no">farm</span>-module. **Hoge beschikbaarheid van virtuele machines** beschermt de gehele virtuele machine met een hyperv.safe of kvm.safe module.

Vergelijkingscriterium | Hoge beschikbaarheid van de applicatie | Hoge beschikbaarheid van virtuele machines  
---|---|---  
Configuratie | U moet weten welke toepassingsservices u opnieuw moet starten en welke mappen u moet repliceren. U moet ook het virtuele IP-adres configureren dat wordt gebruikt voor failover. | U hoeft alleen de locatie van de bestanden van de virtuele machine op te geven. U hoeft niet te weten hoe de toepassingen in de virtuele machine werken. Deze aanpak beschermt de toepassingen en het besturingssysteem samen.  
Aanbevolen gebruik | Voeg hoge beschikbaarheid rechtstreeks toe aan een softwareoplossing, zonder afhankelijk te zijn van specifieke hardware of een specifieke hypervisor. | Beheer meerdere applicaties op meerdere virtuele machines met één beleid voor hoge beschikbaarheid.  
  
De onderstaande tabel geeft een overzicht van alle beschikbare `.safe` modules:

Hoge beschikbaarheid van de applicatie | Hoge beschikbaarheid van virtuele machines  
---|---  
Nieuwe Windows app — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
Nieuwe Linux app — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows-taakverdeling — farm.safe | Docker container — mirror.safe (Linux)  
Linux-taakverdeling — farm.safe | Podman container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows en Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows en Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows en Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows en Linux) | Siemens Siveillance suite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generiek) — mirror.safe/farm.safe |   
  
## Architectuur en implementatie {#architecture-deployment-model}

### Twee clustermodules: mirror.safe en farm.safe {#two-cluster-modules}

Module | Werkingsprincipe | Typische toepassingen  
---|---|---  
mirror.safe | Eén server is actief en de andere staat in de wachtstand. Bestanden worden synchroon gerepliceerd op byteniveau. Failover is automatisch. | Databases, toepassingen die de status opslaan en services die slechts op één server tegelijk draaien  
farm.safe | Verschillende servers zijn tegelijkertijd actief. SafeKit verdeelt het netwerkverkeer tussen deze servers en regelt de failover automatisch. | Webservers, stateless microservices, API-gateways en services die tegelijkertijd op meerdere servers draaien  
  
### Clusterinfrastructuur {#cluster-infrastructure-architecture}

Vereiste | Mogelijkheden SafeKit  
---|---  
Gedeelde opslag vereist? | Nee. SafeKit maakt gebruik van lokale schijven. Het heeft geen SAN of gedeelde opslag nodig.  
Active Directory vereist? | Nee. SafeKit vereist geen Windows domein of Active Directory. Het ondersteunt ook werkgroepen.  
Aantal knooppunten in een cluster | 2 knooppunten (mirror) of 2+ knooppunten (<span class="notranslate farm-term" translate="no">farm</span>)  
Virtueel IP-adres (VIP) | Voor hoge beschikbaarheid van de toepassing wordt het virtuele IP-adres automatisch verplaatst naar de actieve node via gratuitous ARP. Voor hoge beschikbaarheid van de virtuele machine wordt het verkeer naar het IP-adres binnen de virtuele machine automatisch omgeleid. Er is geen afzonderlijk virtueel IP-adres nodig. De nodes moeten een LAN of een VLAN delen dat tussen sites is uitgebreid.  
Architectuur met drie knooppunten | SafeKit draait een mirror-cluster met twee knooppunten op een LAN of een VLAN dat is uitgebreid tussen locaties. Het biedt synchrone replicatie met nul gegevensverlies (RPO = 0) en automatische failover. Een afzonderlijk back-upproduct repliceert gegevens asynchroon naar een derde knooppunt via een WAN. Deze back-up maakt herstel naar een eerder tijdstip mogelijk en biedt bescherming tegen ransomware.  
Doel van hoge beschikbaarheid | SafeKit repliceert gegevens synchroon naar beide knooppunten. Dit maakt automatische failover mogelijk zonder gegevensverlies na een hardware- of softwarestoring. Logische fouten, gegevensbeschadiging en onbedoelde verwijderingen worden echter ook onmiddellijk naar het stand-by-knooppunt gekopieerd.  
Doel van back-ups | Met back-ups kunt u gegevens herstellen vanaf een eerder tijdstip. Een afzonderlijk back-upproduct, niet SafeKit, biedt deze bescherming via asynchrone replicatie. Back-ups helpen bij het herstellen van ransomware en menselijke fouten. Dit herstel is geen automatische failover. Het herstellen van een oudere back-up gaat verloren van wijzigingen die na die back-up zijn aangebracht.  
Maximaal aantal modules dat tegelijkertijd draait | Een cluster met twee knooppunten kan tot 32 modules tegelijk beheren. Voor de bescherming van virtuele machines repliceert en herstart elke module een andere virtuele machine. Elke module kan primair zijn op een van beide knooppunten, zodat beide servers de werklast kunnen delen. Het totale datavolume beïnvloedt de resynchronisatietijd na een failover of een herstart van een knooppunt.  
Is er software geïnstalleerd op elk knooppunt? | Ja. Op elke node is een lichtgewicht softwarepakket geïnstalleerd.  
Ondersteunde applicaties | SafeKit kan elke Windows service of Linux daemon beveiligen. Er zijn vooraf geconfigureerde modules beschikbaar voor meer dan 30 toepassingen.  
  
### Replicatie en gegevensbescherming {#replication-data-protection}

Vereiste | Mogelijkheden SafeKit  
---|---  
Replicatiemethode | SafeKit repliceert bestandsveranderingen op byteniveau. Het repliceert geen diskblokken.  
Replicatiemodus | Synchrone replicatie, met nul gegevensverlies  
Netwerkvereiste | Voor synchrone replicatie wordt een round-trip-latentie van minder dan 5 ms tussen knooppunten aanbevolen.  
Aanbevolen datavolume | Een paar terabytes, om de resynchronisatietijd beheersbaar te houden  
Aanbevolen aantal bestanden | Minder dan 1.000.000 bestanden, om de resynchronisatietijd beheersbaar te houden  
Resynchronisatietijd voor 1 TB | Ongeveer 3 uur via een 1 Gb/s-netwerk of 1 uur via een 10 Gb/s-netwerk  
Selectieve replicatie | U kunt kiezen welke mappen en bestanden u wilt repliceren.  
Versleuteling tijdens overdracht | Replicatieverkeer wordt versleuteld met TLS/SSL.  
  
## Gegevensverlies en hersteltijden (RPO en RTO) {#rpo-rto-capabilities}

### RPO en RTO voor elk clustertype {#rto-rpo-cluster-type}

Metrisch | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO (Recovery Point Objective) | Geen gegevensverlies. Een schrijfbewerking is pas voltooid als beide knooppunten de gegevens hebben geschreven. | Niet van toepassing op stateless services. De gegevens worden beheerd door een afzonderlijk mirror-cluster.  
RTO (Recovery Time Objective) | Ongeveer één minuut. Dit omvat de <span class="notranslate farm-term" translate="no">heartbeat</span> time-out (standaard 30 seconden) en de tijd om de applicatie opnieuw op te starten. | Een paar seconden. Het verkeer wordt opnieuw verdeeld over de resterende actieve knooppunten.  
Replicatietype | Synchrone, real-time bestandsreplicatie op byteniveau | Niet van toepassing  
Failover-trigger | Failover start automatisch wanneer <span class="notranslate farm-term" translate="no">heartbeat</span>-berichten stoppen, wanneer een proces crasht of wanneer een checker een storing detecteert | Failover start automatisch wanneer <span class="notranslate farm-term" translate="no">heartbeat</span>-berichten stoppen, wanneer een proces crasht of wanneer een checker een storing detecteert  
Handmatige tussenkomst vereist? | Nee. Failover en failback zijn automatisch. | Nee. Failover en failback zijn automatisch.  
  
### Hersteltijd voor toepassingen die worden beschermd door een mirror-cluster {#rto-breakdown-mirror-application-level-ha}

Type storing | Hoe de hersteltijd wordt berekend  
---|---  
Hardwarestoring | <span class="notranslate farm-term" translate="no">heartbeat</span> time-out (standaard 30 seconden), gevolgd door een herstart van de toepassing  
Software- of procescrash | De tijd om de toepassing te stoppen, gevolgd door het opnieuw starten van de toepassing  
Besturingssysteem is vastgelopen | De <span class="notranslate farm-term" translate="no">heartbeat</span>-time-out, gevolgd door een herstart van de toepassing. De stand-by server hoeft niet opnieuw op te starten, omdat het besturingssysteem al actief is.  
  
### Hersteltijd voor virtuele machines die worden beschermd door een mirror-cluster {#rto-breakdown-mirror-vm-level-ha}

Type storing | Hoe de hersteltijd wordt berekend  
---|---  
Alle storingssoorten | Tijd om de storing te detecteren, het besturingssysteem van de virtuele machine opnieuw op te starten en de toepassing opnieuw te starten. Dit duurt meestal enkele minuten.  
  
## Locaties op afstand en gedistribueerde implementaties {#edge-distributed-deployment-suitability}

SafeKit is ontworpen voor externe locaties, nevenvestigingen en organisaties met veel locaties.

Vereiste op een externe locatie | Mogelijkheden SafeKit  
---|---  
Geen toegewijd IT-personeel ter plaatse | Failover is automatisch en vereist geen handmatige actie.  
Geen gedeelde opslag (SAN of NAS) | Alleen lokale schijven zijn nodig. Gedeelde opslag is niet vereist.  
Beheer op afstand | Beheer het cluster via een webconsole.  
Beperkte hardware | Twee standaardservers of virtuele machines zijn voldoende. Er is geen speciale hardware vereist.  
Firewalls en netwerkadresvertaling (NAT) | Poorten kunnen worden geconfigureerd. De webconsole maakt gebruik van HTTPS.  
Herstel na noodgevallen tussen locaties | Een mirror-cluster kan twee sites met elkaar verbinden via een VLAN dat tussen deze sites is uitgebreid.  
Integratie door softwareleveranciers | Softwareleveranciers kunnen SafeKit in hun producten opnemen. De installatie kan zonder gebruikersinteractie worden uitgevoerd en kan met scripts worden geautomatiseerd.  
Honderden SafeKit clusters op vele locaties | SafeKit is ontworpen voor organisaties met veel vestigingen.  
  
De volgende sites moeten een hoge beschikbaarheid hebben, zelfs als ze geen datacenter hebben:

Industrie | Typische site | Kritieke toepassingen  
---|---|---  
Fysieke beveiliging en bewaking | Gebouwen, campussen, luchthavens | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gebouwbeheersysteem (GBS) | Kantoorgebouwen, ziekenhuizen, fabrieken | Siemens Desigo CC, Bosch BIS/BVMS  
Elektronische toegangscontrole (EACS) | Beveiligde faciliteiten, campussen | Siemens SiPass, Nedap, Bosch AMS  
SCADA en industriële besturing | Fabrieken, onderstations, waterzuiveringsinstallaties | Elke SCADA-, DCS- of HMI-software die op Windows of Linux draait  
Luchtverkeersleiding (ATC) | Luchthavens, controletorens | Luchtverkeersleidingsmanagement en radarsystemen  
Operationele controlecentra (OCC) | Metro, spoorwegen, OV-knooppunten | Spoorwegsignalering en stationsbeheer  
Maritiem | Schepen, marineschepen | Navigatie-, vracht- en boordbeheersystemen  
Olie en gas | Offshoreplatforms, afgelegen boorinstallaties | Procesbeheersings- en veiligheidssystemen  
Telecommunicatie | 5G-antennesites, MEC-knooppunten | MEC-servers (Multi-access Edge Computing)  
Gezondheidszorg | Klinieken, diagnostische centra op afstand | Medische beeldvorming, patiëntgegevens, diagnostiek op afstand  
Detailhandel | Winkels, filialen, magazijnen | Kassasysteem en voorraadbeheer  
Verdediging | Vooruitgeschoven operatiebases, veldeenheden | Missiekritieke commando- en communicatiesystemen  
  
## Monitoring en waarschuwingen {#monitoring-management-alerting}

Functie | Details  
---|---  
Webconsole | Configureer, bewaak en beheer clusterknooppunten via een webapplicatie of een Progressive Web App (PWA).  
Mobiele meldingen | Ontvang browsermeldingen wanneer de status van een module verandert.  
Tijdlijn | Bekijk statuswijzigingen en gebeurtenissen van modules in chronologische volgorde.  
E-mailmeldingen | Een ingebouwde e-mailagent verstuurt waarschuwingen.  
Opdrachtregelinterface | Gebruik de opdrachtregelinterface om scripts te schrijven en taken te automatiseren.  
Logbeheer | Elke module en elk script heeft zijn eigen logbestanden. Het ondersteuningsteam gebruikt <span class="notranslate farm-term" translate="no">snapshots</span> om problemen te onderzoeken.  
Integratie met monitoringtools | SafeKit registreert belangrijke clustergebeurtenissen in het Windows gebeurtenislogboek of Linux Syslog. Monitoringtools kunnen deze gebeurtenissen verzamelen en waarschuwingen activeren met standaardregels. Dit werkt met Nagios, Zabbix, Splunk en SIEM-tools zonder aangepaste ontwikkeling.  
  
## Beveiliging en naleving {#security-compliance}

Functie | Details  
---|---  
HTTPS | De webconsole maakt gebruik van HTTPS met TLS-certificaten.  
Gebruikersauthenticatie | Lokale accounts, LDAP, certificaten (PKI) en OpenID Connect  
Gebruikersrollen | Configureer toegangsbeleid voor beheer, controle en monitoring.  
Versleuteling | TCP-verkeer gebruikt TLS/SSL voor replicatie, de webconsole en gedistribueerde commando's. UDP-verkeer gebruikt AES-128-CBC-encryptie met SHA256 voor <span class="notranslate farm-term" translate="no">heartbeat</span>berichten en voor het interne safeadmin-protocol. De OpenSSL-bibliotheek biedt encryptie. De webservice draait op Apache.  
Antivirus | De documentatie bevat de paden die moeten worden uitgesloten van antivirusscans.  
Soevereiniteit | SafeKit wordt in Frankrijk ontwikkeld door Eviden, onderdeel van de Atos Group. Het beschermt Windows en Linux toepassingen, terwijl uw gegevens en servers op uw eigen locatie blijven. SafeKit kan helpen voldoen aan de vereisten van de Europese NIS2 richtlijn voor bedrijfscontinuïteit en herstel na noodgevallen.
  
## Licentieverlening {#licensing-model}

Onderwerp | Details  
---|---  
Licentietype | Een eeuwigdurende licentie wordt eenmalig aangeschaft en is gekoppeld aan een hostnaam.  
Licentiebereik | Eén licentie per server (node)  
Licentieactivering | Licentiesleutels kunnen zonder internettoegang worden geactiveerd.  
Gratis proefversie | Een gratis proefversie omvat alle functies.  
Gratis licentie voor één maand | Beschikbaar om een proof of concept te testen  
  
## Ondersteuning en onderhoud {#support-maintenance-slas}

### Standaardondersteuning en -onderhoud met een actief onderhoudscontract {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
Toegang tot het ondersteuningsportaal | Het webportaal is elke dag van het jaar, op elk moment, beschikbaar voor maximaal vier benoemde technische contactpersonen.  
Openingstijden live support | Van maandag tot en met vrijdag, van 09:00 tot 17:00, bij het Europese ondersteuningscentrum  
Bevestiging van incident | Binnen vier werkuren. Werkuren zijn de live ondersteuningsuren van het ondersteuningscentrum.  
Updates en upgrades | Alle servicepacks, updates en upgrades zijn inbegrepen zonder extra kosten.  
Licentiesleutel vervangen | Met een actief ondersteuningscontract kan een licentiesleutel opnieuw worden toegewezen wanneer een hostnaam verandert. De overdracht is beperkt tot het vervangen van een server binnen hetzelfde project. Voorafgaande schriftelijke goedkeuring van Eviden is vereist.  
Toegang tot de kennisbank | Volledige toegang tot artikelen in de kennisbank, veelgestelde vragen en online documentatie  
Noodprocedure | SafeKit biedt een wrapper-script om een toepassing te starten of te stoppen zonder gebruik te maken van de hoge beschikbaarheidsfuncties van SafeKit. Dit script roept de start- en stop-scripts van de toepassing aan. Het voegt ook het virtuele IP-adres toe of verwijdert het indien nodig.  
Ondersteuningsportaal | <https://customercare.evidian.com>  
  
### Gratis bronnen zonder ondersteuningscontract {#free-resources-no-contract-required}

Gratis hulpmiddel | Details  
---|---  
AI-assistent voor ondersteuning | Gebruik [SafeKit AI-chat](</nl/resources/safekit-support/#ai-support>) op safekit.eviden.com.   
Online training en certificering | [Leer in je eigen tempo](/nl/resources/safekit-on-line-training/) met gratis video's van in totaal ongeveer 4 uur. Je ontvangt een certificaat als je de training hebt afgerond.  
Documentatie | Gebruikershandleiding, releaseopmerkingen, kennisbank en snelle installatiegidsen vindt u [hier](/nl/resources/safekit-free-trial/)  
  
## Vergelijking met andere oplossingen {#comparison-vs-alternatives}

Criterium | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open source [1]  
---|---|---|---|---  
Gedeelde opslag (SAN/vSAN) vereist | Nee | Ja | Ja | Nee  
Windows-ondersteuning | Ja | Ja | Ja | Nee  
Linux ondersteuning | Ja | Nee | Ja | Ja  
Implementatie op externe locaties | Uitstekend | Complex | Complex | Complex  
OEM | Ja | Nee | Nee | Nee  
Kosten | Perpetuele licentie per node | Windows Server en SAN | vSphere Enterprise en SAN | Geavanceerde integratiediensten  
Complexiteit van de installatie | Laag: één product om te installeren en te configureren | Hoog: Active Directory-, SAN en witness-configuratie | Hoog: vCenter- en gedeelde opslagconfiguratie | Hoog: verschillende afzonderlijke producten om te configureren  
Administratie | Eén product dat wordt beheerd via een webconsole | Hoog: vereist Active Directory- en SAN expertise | Hoog: afhankelijk van vCenter | Hoog: verschillende afzonderlijke producten om te onderhouden  
  
**[1]** Op Linux zijn zes afzonderlijke open-sourceprojecten nodig om dezelfde reeks functies te bieden: Corosync, Pacemaker, DRBD, Keepalived, STONITH en HAProxy. SafeKit biedt deze functies in één product voor zowel Windows als Linux.

## Handige links {#quick-reference-links}

Link | URL  
---|---  
Productstartpagina | [https://safekit.eviden.com](/nl/)  
Technisch overzicht (Word-document met tekst en diagrammen) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Gratis proefversie | [https://safekit.eviden.com/resources/safekit-free-trial/](</nl/resources/safekit-free-trial/>)  
Vraag een offerte aan | [https://safekit.eviden.com/safekit-pricing/](</nl/safekit-pricing/>)  
Ondersteuningsportaal | <https://customercare.evidian.com>  
Gratis AI-ondersteuning | [https://safekit.eviden.com/resources/safekit-support/](</nl/resources/safekit-support/>)  
Gratis training en certificering | [https://safekit.eviden.com/resources/safekit-on-line-training/](</nl/resources/safekit-on-line-training/>)  
Neem contact met ons op | [https://safekit.eviden.com/contact-us-for-safekit/](</nl/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-nl  %}}