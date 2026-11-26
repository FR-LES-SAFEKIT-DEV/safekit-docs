---
title: "Hoge beschikbaarheid voor luchtverkeersleidingssystemen"
canonical: "https://safekit.eviden.com/nl/use-cases/high-availability-air-traffic-control-system/"
description: "SafeKit zorgt voor een hoge beschikbaarheid van luchtverkeersleidingssystemen. ADB SafeGate heeft SafeKit geïmplementeerd op luchthavens wereldwijd. Kritieke applicaties zijn 24/7 beschikbaar. SafeKit repliceert gegevens in realtime zonder gegevensverlies. Het biedt automatische failover op standaard Windows-servers. Er is geen gedeelde opslag nodig."
category: "use-cases"
lang: "nl"
topics: "Luchtverkeersleidingssystemen, Waarom is luchtverkeersleiding van cruciaal belang?, Hoe SafeKit de luchtverkeersleiding beschermt, Implementatie in de praktijk bij ADB SafeGate, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.22 | Translation LLM | 49 expressions"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# Hoge beschikbaarheid voor luchtverkeersleidingssystemen {#high-availability-for-air-traffic-control-systems}

## Luchtverkeersleidingssystemen {#air-traffic-control-systems}

Luchtverkeersleiders hebben een van de meest complexe en stressvolle taken die denkbaar zijn. Tegenwoordig is het luchtruim druk en is het luchtverkeer intens. Een enkele fout bij het leiden van vliegtuigen kan catastrofale gevolgen hebben. Moderne luchtverkeersleidingssystemen zijn afhankelijk van geavanceerde softwaretoepassingen. Deze toepassingen helpen verkeersleiders bij het nemen van cruciale beslissingen.

ADB SafeGate is een wereldwijde leverancier van oplossingen voor luchthavens, waaronder software voor luchtverkeersleiding. De oplossingen worden gebruikt op meer dan 3.000 luchthavens in meer dan 175 landen. Ze beheren kritieke operationele gegevens van luchthavens, waaronder:

  * Vluchtplanning en informatie over de luchtverkeersstroom
  * Meteorologische gegevens
  * Status van de vliegveldverlichting en -besturing
  * Apron- en dokoperaties

## Waarom is luchtverkeersleiding van cruciaal belang? {#why-is-air-traffic-control-critical}

Luchtverkeersleiding is een van de meest kritieke activiteiten die er bestaan. Elke systeemstoring op een cruciaal moment kan de besluitvorming van de verkeersleider en de veiligheid van de passagiers in gevaar brengen. Verkeersleiders moeten volledig vertrouwen hebben in de systemen die hen ondersteunen.

De beste applicatie is echter nutteloos als een server, besturingssysteem of software op een cruciaal moment uitvalt. ADB SafeGate erkende de noodzaak om de beschikbaarheid van zijn kritieke omgeving te waarborgen. Het besloot te onderzoeken hoe een 24/7 uptime voor zijn applicaties kon worden gegarandeerd.

**De uitdaging**: een uitgebreide reeks applicaties voor luchtverkeersleiders 24/7 beschikbaar maken. Dit is een verplichte vereiste voor luchtverkeersleiding.

## Hoe SafeKit de luchtverkeersleiding beschermt {#safekit-high-availability-for-atc}

ADB SafeGate heeft SafeKit, de softwareoplossing voor hoge beschikbaarheid van Eviden, geselecteerd omdat deze het volgende biedt:

  * **24/7 beschikbaarheid**: bedrijfskritische applicaties zijn altijd beschikbaar
  * **Redundante applicatieservers**: servers kunnen in afzonderlijke machinekamers worden geplaatst om te beschermen tegen rampen
  * **Standaardservers**: geen gedeelde schijven en geen complexe SAN-infrastructuur
  * **Realtime bestandsreplicatie**: geen gegevensverlies (RPO = 0)
  * **Automatisch herstel**: er is geen handmatige actie nodig na een storing

Hierdoor kunnen luchtverkeersleiders die ADB SafeGate-software gebruiken zich volledig richten op hun complexe taak. Ze kunnen erop vertrouwen dat de systemen die hen ondersteunen veerkrachtig en altijd beschikbaar zijn.

## Implementatie in de praktijk bij ADB SafeGate {#real-world-implementation-at-adb-safegate}

### Implementatieaanpak {#deployment-approach}

Op een luchthaven installeert ADB SafeGate zijn applicaties en SafeKit op twee standaard Windows-servers. De servers hebben geen gedeelde schijven. De applicaties profiteren van realtime bestandsreplicatie en automatisch herstel na een storing.

### Hoe het in de praktijk werkt {#how-it-works-in-practice}

**Fase 1: Normale werking**

De toepassing draait alleen op server 1, binnen de SafeKit mirror-module. Clients maken automatisch verbinding met server 1 via een primair/secundair virtueel IP-adres. Alleen de bestanden die door de toepassing zijn gewijzigd, worden gerepliceerd. Ze worden in realtime via het netwerk naar server 2 verzonden. Dit minimaliseert het netwerkverkeer.

Er zijn geen vereisten voor de serverorganisatie. Bestanden kunnen zich op een RAID5-schijf in server 1 en op een eenvoudige schijf in server 2 bevinden.

Schrijfacties worden synchroon naar beide servers gerepliceerd. Er gaat dus geen data verloren in geval van een storing. Data die door een transactionele applicatie is vastgelegd, is automatisch beschikbaar op de secundaire server. Een voorbeeld hiervan is PostgreSQL. Deze garantie is niet mogelijk met asynchrone replicatie.

**Fase 2: Failover bij storing**

Als server 1 uitvalt, schakelt SafeKit automatisch over naar server 2. De failovertijd is gelijk aan de detectietijd van de storing plus de herstarttijd van de toepassing. De standaard detectietijd is 30 seconden. Er is geen vertraging bij het herstellen van het bestandssysteem, in tegenstelling tot oplossingen voor schijfreplicatie.

**Fase 3: Resynchronisatie na een storing**

Wanneer server 1 opnieuw wordt opgestart, synchroniseert de mirror-module de bestanden automatisch opnieuw.

Alleen de bestanden die op server 2 zijn gewijzigd tijdens de downtime van server 1 worden opnieuw gesynchroniseerd. De toepassingen blijven tijdens de resynchronisatie draaien op server 2. Na de resynchronisatie is het systeem weer hoogbeschikbaar en beschermd.

De beheerder wil mogelijk dat de toepassing bij voorkeur op server 1 wordt uitgevoerd. In dit geval kan een failback naar server 1 handmatig met één klik worden geactiveerd. Dit kan ook automatisch gebeuren.

### Belangrijkste voordelen voor luchthavens {#key-benefits-for-airports}

  * **Geen speciale hardware nodig**: standaard Windows-servers zijn voldoende
  * **Geen gedeelde opslag**: geen dure SAN-infrastructuur en geen complexe gedeelde schijven
  * **Bestand tegen noodgevallen**: servers kunnen in afzonderlijke machinekamers met afzonderlijke stroomvoorzieningen staan
  * **Geen gegevensverlies**: synchrone replicatie garandeert RPO = 0 voor alle vastgelegde transacties
  * **Automatisch herstel**: er is geen handmatige actie nodig na een storing
  * **Minder stress**: luchtverkeersleiders kunnen vertrouwen op de systemen die hun cruciale beslissingen ondersteunen
  * **Wereldwijde betrouwbaarheid**: succesvol geïmplementeerd op luchthavens in vele landen en op vele continenten

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}
