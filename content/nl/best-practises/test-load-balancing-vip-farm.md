---
title: "Het testen van het virtuele IP-adres voor load balancing in een SafeKit farm cluster"
canonical: "https://safekit.eviden.com/nl/best-practises/test-load-balancing-vip-farm/"
description: "Leer hoe je moet testen SafeKit Het verdelen van de belasting over de clusterknooppunten en het verifiëren van virtuele IP-failover, GARP-rerouting en netwerkgedrag."
category: "beste praktijken"
lang: "nl"
topics: "Kernprincipes, Voorwaarde: de SafeKit mozaïek, Test 1 – Distributie van verbindingen, Test 2 – Wijziging van de verzendende server, Test 3 – Controleren van GARP-omleiding met arp -a, Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux), Welke werkstations te gebruiken voor de test, Samenvatting van de verwachte resultaten, Probleemoplossing"
---

# Het testen van het virtuele IP-adres voor load balancing in een SafeKit <span class="notranslate farm-term" translate="no">farm</span> cluster

Deze handleiding beschrijft hoe u kunt controleren of een SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> De module (load balancing op een virtueel IP-adres) werkt correct in uw netwerk: de verdeling van verbindingen over de knooppunten en de omleiding van het virtuele IP-adres (VIP) wanneer het verzendende knooppunt stopt.

## 1. Kernprincipes

**Voorwaarde:** alle knooppunten van de <span class="notranslate farm-term" translate="no">Farm</span> moeten zich in hetzelfde Layer 2 IP-subnet bevinden: een LAN of een VLAN dat is uitgebreid tussen externe locaties.

- Het virtuele IP-adres (VIP) wordt lokaal geconfigureerd op elk knooppunt van het systeem. <span class="notranslate farm-term" translate="no">Farm</span>Het wordt ingesteld als een alias van het fysieke IP-adres op de netwerkkaart van dat adres, wanneer de <span class="notranslate farm-term" translate="no">Farm</span> wordt gestart op het knooppunt.
- Een enkel knooppunt, de **verzendserver**, ontvangt het netwerkverkeer voor het virtuele IP-adres (VIP) (`vmac_directed` configuratie, de SafeKit standaard): het MAC-adres is het adres dat is gekoppeld aan het virtuele IP-adres (VIP) in de ARP-tabellen (router, gateway, clients in hetzelfde subnet).
- Het kernelfilter van dit knooppunt verdeelt vervolgens de TCP-verbindingen over de knooppunten van het netwerk. <span class="notranslate farm-term" translate="no">Farm</span>, door **Het MAC-adres van de bestemming herschrijven** van de pakketten naar dat van het verwerkende knooppunt (het bestemmings-IP-adres blijft het virtuele IP-adres (VIP)). Reacties worden rechtstreeks verzonden van het knooppunt dat de verbinding verwerkt naar de client.
- De distributie die door het filter wordt uitgevoerd is **deterministisch**Het verwerkingsknooppunt wordt berekend op basis van de identiteit van de client, volgens de geconfigureerde load balancing-regel.
  - op de **IP-adres van de client** (`filter="on_addr"`Een client wordt altijd door hetzelfde knooppunt bediend, wat sessie-affiniteit garandeert;
  - op de **client TCP-poort** (`filter="on_port"`Elke TCP-verbinding van dezelfde client kan door een ander knooppunt worden afgehandeld. Dit is de regel die wordt gebruikt voor het mozaïek (sectie 2), dat daarom alle knooppunten van één werkstation weergeeft.
- Als de verzendserver uitvalt, neemt een ander knooppunt deze rol over en verzendt de berichten. **GARPs** (gratuitous ARP) zodat het netwerk het virtuele IP-adres (VIP) koppelt aan zijn eigen MAC-adres.

Wat u dus moet testen:

1. dat de verbindingen correct over alle knooppunten zijn verdeeld;
2. dat het netwerk (router, gateway, virtualisatie) rekening houdt met GARP wanneer de verzendende server verandert.

## 2. Voorwaarde: de SafeKit mozaïek

De mozaïekafbeelding is een testpagina die wordt aangeboden door SafeKitHet opent meerdere TCP-verbindingen met het virtuele IP-adres (VIP) en toont voor elke verbinding de naam van het knooppunt dat heeft gereageerd. Dit geeft in één oogopslag de verdeling weer.

1. In de `userconfig.xml` van de <span class="notranslate farm-term" translate="no">Farm</span> module, in de `<vip>` Voeg in dit gedeelte de load balancing-regel toe aan de poort van de SafeKit webserver. Voorbeeld met de SafeKit webserver in HTTP op poort 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Als de SafeKit De webserver en console zijn overgeschakeld naar HTTPS; vervang 9010 door 9453.

2. Pas de configuratie toe op alle knooppunten.
3. Vanuit een browser op een clientwerkstation **buiten de <span class="notranslate farm-term" translate="no">Farm</span>**, verbinding maken met:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   voer vervolgens de <span class="notranslate farm-term" translate="no">Farm</span> **modulenaam** en voer de test uit. Elke cel van het mozaïek toont de naam van het knooppunt dat op de TCP-verbinding heeft gereageerd, en aan elk knooppunt is een kleur gekoppeld om duidelijk aan te geven welke blokken van het mozaïek door hetzelfde knooppunt worden bediend.

   Gebruik in HTTPS het volgende: `https://<VIP>:9453/safekit/mosaic.html`, met de load balancing-regel op poort 9453.

De test wordt in detail beschreven in de SafeKit 8.2 Gebruikershandleiding, sectie 4.3.5 "[Test TCP-loadbalancing op een virtueel IP-adres.](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. Test 1 – Verdeling van verbindingen

**Stappen**

1. Begin de <span class="notranslate farm-term" translate="no">Farm</span> op alle knooppunten (UP-status).
2. Open het mozaïek vanaf een clientwerkstation.

**Verwacht resultaat:** Het mozaïek toont de namen van **alle knooppunten** van de <span class="notranslate farm-term" translate="no">Farm</span>, waarbij elk verwerkingsknooppunt een andere kleur heeft.

Dit bewijst dat de upstream-router of -gateway een van de knooppunten bereikt via zijn MAC-adres, en dat dit knooppunt de verbindingen correct verdeelt.

## 4. Test 2 – Wijziging van de verzendserver

Deze test controleert of de <span class="notranslate farm-term" translate="no">Farm</span> blijft reageren, zelfs wanneer de verzendserver stopt.

**Stappen**

1. Stop de <span class="notranslate farm-term" translate="no">Farm</span>, oftewel alle knooppunten in SafeKit.
2. Begin **een enkel knooppunt**Dit knooppunt wordt de verzendserver.
   → **Verwacht resultaat:** Het mozaïek toont alleen dit knooppunt.
3. Start de andere knooppunten.
   → **Verwacht resultaat:** Het mozaïek toont alle knooppunten.
4. Stop de **eerste knooppunt**, degene die als verzendserver fungeert.
   → **Verwacht resultaat:** Het mozaïek toont de resterende knooppunten.

> **Beperking van deze test:** Een correct resultaat bij stap 4 bewijst niet dat GARP werkt. Wanneer de <span class="notranslate farm-term" translate="no">Farm</span> De module wordt gestart op de andere knooppunten (stap 3), het virtuele IP-adres wordt geconfigureerd op deze knooppunten, wat berichten genereert op het netwerk die de associatie tussen het virtuele IP-adres en het MAC-adres mogelijk al omleiden. Alleen tests 3 en 4 testen daadwerkelijk GARP.

> Het stoppen van elk ander knooppunt van de <span class="notranslate farm-term" translate="no">Farm</span> (een server die niet de verzendende server is) test alleen de herconfiguratie van de distributie.

## 5. Test 3 – Controleren van GARP-omleiding met `arp -a`

Samen met test 4 controleert deze test daadwerkelijk GARP: je noteert het MAC-adres van de verzendende server voordat je deze stopt, en controleert vervolgens of het virtuele IP-adres (VIP) klopt./MAC De associatie is daarna veranderd.

Deze test is alleen mogelijk als het clientwerkstation waarop de mozaïekweergave te zien is, zich in de **hetzelfde IP-subnet** als de <span class="notranslate farm-term" translate="no">Farm</span>.

Als er een router tussen de client en de router staat... <span class="notranslate farm-term" translate="no">Farm</span>De ARP-tabel van de client bevat niet het virtuele IP-adres (VIP), maar het adres van de gateway die gebruikt is om de client te bereiken. <span class="notranslate farm-term" translate="no">Farm</span>Het netwerk van 's. Controleer in dat geval de ARP-tabel van de router of gateway met het netwerkteam.

**Stappen**

1. Begin de <span class="notranslate farm-term" translate="no">Farm</span> op alle knooppunten.
2. Voer op het clientwerkstation het volgende commando uit: `arp -a` Noteer het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP). Dit adres identificeert de verzendende server.
3. Stop de <span class="notranslate farm-term" translate="no">Farm</span> node met dit MAC-adres.
4. Controleer of het mozaïek nog steeds werkt met de overgebleven knooppunten.
5. Loop `arp -a` lees het nieuwe virtuele IP-adres (VIP) opnieuw uit./MAC koppeling maken en de nieuwe verzendserver identificeren.

## 6. Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux)

Je kunt een TCP-verbinding met het virtuele IP-adres (VIP) volgen door pakketten vast te leggen op de client en op de server. <span class="notranslate farm-term" translate="no">Farm</span> knooppunten: met Wireshark ingeschakeld Windows machines, en met tcpdump ingeschakeld Linux machines.

Je moet kijken naar de **MAC (Ethernet) headers van de pakketten**Niet alleen de IP-adressen: het kernelfilter van de verzendende server verdeelt de verbindingen op basis van **Het MAC-adres van de bestemming herschrijven** van de pakketten naar dat van het verwerkingsknooppunt. Het bestemmings-IP-adres blijft gedurende het hele traject het virtuele IP-adres (VIP).

**Wat je voor hetzelfde SYN-pakket moet observeren:**

| Stap | Waar te filmen | Waargenomen MAC-adressen |
|---|---|---|
| 1. De client verzendt naar het virtuele IP-adres (VIP) | cliënt | Client MAC → MAC van de **verzendserver** |
| 2. De verzendende server stuurt de verbinding door. | verzendserver | Het verzenden van MAC-adres → MAC-adres van de **verwerkingsknooppunt** |
| 3. Het verwerkingsknooppunt ontvangt | verwerkingsknooppunt | MAC-adres verzenden → MAC-adres van knooppunt |
| 4. Het knooppunt reageert direct op de client. | verwerkingsknooppunt | MAC-adres van de node → MAC-adres van de client |
| 5. De klant ontvangt het antwoord. | cliënt | MAC-adres van de node → MAC-adres van de client |

> Als het clientwerkstation zich in een ander subnet bevindt dan het clientwerkstation, <span class="notranslate farm-term" translate="no">Farm</span>, het "client MAC-adres" dat te zien is op de <span class="notranslate farm-term" translate="no">Farm</span> nodes is het MAC-adres van de **toegangspoort** (router) die de twee subnetten verbindt, niet die van het clientwerkstation.

Herhaal de opname na het stoppen van de verzendserver (test 2, stap 4): stap 1 moet nu het MAC-adres van de server weergeven. **nieuw** verzendserver.

## 7. Welke werkstations moeten worden getest?

Het gedrag is afhankelijk van het netwerkpad tussen de client en de <span class="notranslate farm-term" translate="no">Farm</span>Voer tests 1 en 2 uit voor elk type client dat relevant is voor uw architectuur:

| Klantlocatie | Wat de test controleert |
|---|---|
| Cliënt in de **hetzelfde subnet** als de <span class="notranslate farm-term" translate="no">Farm</span> | Update van de ARP-tabellen van de clients door GARP (test 3 mogelijk) |
| Cliënt in een **ander subnet** (router, gateway, hypervisor virtueel netwerk) | GARP-afhandeling door de router of gateway |
| Client-VM **op een hypervisor die ook een host is <span class="notranslate farm-term" translate="no">Farm</span> VM** | Het gedrag van de virtuele switch van de hypervisor, die ook de interne switching en routing afhandelt. |

## 8. Samenvatting van de verwachte resultaten

| Test | Actie | Verwacht resultaat |
|---|---|---|
| 1 | Alle knooppunten UP, mozaïek | Alle knooppunten verschijnen |
| 2.2 | Een enkel knooppunt is gestart | Alleen dit knooppunt verschijnt |
| 2.3 | Alle knooppunten zijn gestart. | Alle knooppunten verschijnen |
| 2.4 | De verzendserver is gestopt | De resterende knooppunten verschijnen, zonder blijvende onderbreking. |
| 3 | `arp -a` voor en na de stop | Het MAC-adres dat aan het virtuele IP-adres (VIP) is gekoppeld, verandert. |
| 4 | Wireshark of tcpdump legt de situatie vast vóór en na het stoppen. | De client verzendt naar het MAC-adres van de nieuwe verzendserver. |

## 9. Probleemoplossing

- **Het mozaïek reageert niet meer nadat de verzendserver is gestopt:** GARP wordt niet in overweging genomen door een apparaat op het pad (router, gateway, virtuele switch). Neem contact op met uw netwerkteam om de GARP-afhandeling te controleren.
- **Periodiek verzenden van GARP:** de `arpreroute="on"` kenmerk van de `<vip>` sectie (met `arpinterval` En `arpelapse`) stuurt regelmatig GARPs naar de VIP's. Zie de gebruikershandleiding, sectie 13.6.4 "[`<vip>` syntaxis](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnose van virtuele IP (VIP) ↔ MAC-resolutie:** Zie de gebruikershandleiding, paragraaf 7.24.[Probleemoplossing voor virtueel IP-adres (VIP) ↔ MAC-adresresolutie](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", en paragraaf 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> Module UP (gereed), maar er is een probleem met de taakverdeling in een <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> oplossing {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-en  %}}

Voor failover tussen primaire en back-up met een virtueel IP-adres, zie [Het testen van het virtuele IP-adres van een SafeKit mirror cluster](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-en  %}}
