---
title: "Het testen van het virtuele IP -adres voor load balancing in een SafeKit farm ."
canonical: "https://safekit.eviden.com/nl/best-practises/test-load-balancing-vip-farm/"
description: "Leer hoe u de load balancing SafeKit over clusterknooppunten kunt testen en hoe u virtuele IP failover, GARP rerouting en netwerkgedrag kunt verifiëren."
category: "best-practises"
lang: "nl"
topics: "Kernprincipes, Vereiste: de SafeKit mozaïek, Test 1 – Distributie van verbindingen, Test 2 – Wijziging van de dispatchingserver, Test 3 – Controle van GARP -rerouting met arp -a, Test 4 – End-to-end controle met Wireshark ( Windows ) of tcpdump ( Linux ), Welke werkstations te testen, Samenvatting van de verwachte resultaten, Probleemoplossing, Demonstratie van de SafeKit farm"
---

# Het testen van het virtuele IP -adres voor load balancing in een SafeKit <span class="notranslate farm-term" translate="no">farm</span> .

Deze handleiding beschrijft hoe u kunt controleren of een SafeKit <span class="notranslate farm-term" translate="no">Farm</span> ( <span class="notranslate farm-term" translate="no">Farm</span> module, load balancing op een virtueel IP adres) correct werkt in uw netwerk: de verdeling van verbindingen over de knooppunten en het omleiden van het virtuele IP ( VIP ) wanneer het verzendende knooppunt stopt.

## 1. Kernprincipes

**Vereiste:** alle knooppunten van de <span class="notranslate farm-term" translate="no">Farm</span> moeten zich in hetzelfde Layer 2 IP subnet bevinden: een LAN of een VLAN dat is uitgebreid tussen externe locaties.

- Het virtuele IP ( VIP ) wordt lokaal geconfigureerd op elk knooppunt van de <span class="notranslate farm-term" translate="no">Farm</span> : het wordt ingesteld als een alias van het fysieke IP adres op de netwerkkaart van dat adres wanneer de <span class="notranslate farm-term" translate="no">Farm</span> op het knooppunt wordt gestart.
- Eén knooppunt, de **dispatchingserver** , ontvangt het netwerkverkeer voor het virtuele IP ( VIP ) (configuratie `vmac_directed` , de SafeKit standaard): het MAC adres is het adres dat is gekoppeld aan het virtuele IP ( VIP ) in de ARP tabellen (router, gateway, clients in hetzelfde subnet).
- Het kernelfilter van dit knooppunt verdeelt vervolgens de TCP verbindingen over de knooppunten van de <span class="notranslate farm-term" translate="no">Farm</span> door **het MAC adres van de bestemming in de pakketten te herschrijven** naar dat van het verwerkende knooppunt (het IP adres van de bestemming blijft het virtuele IP ( VIP )). Reacties worden rechtstreeks verzonden van het knooppunt dat de verbinding verwerkt naar de client.
- De distributie die door het filter wordt uitgevoerd, is **deterministisch** : het verwerkingsknooppunt wordt berekend op basis van de identiteit van de client, volgens de geconfigureerde load balancing-regel.
  - op het **IP adres van de client** ( `filter="on_addr"` ): een bepaalde client wordt altijd door hetzelfde knooppunt bediend, wat sessie-affiniteit garandeert;
  - op de **TCP poort van de client** ( `filter="on_port"` ): elke TCP verbinding van dezelfde client kan door een ander knooppunt worden afgehandeld. Dit is de regel die wordt gebruikt voor het mozaïek (sectie 2), dat daarom alle knooppunten van één werkstation weergeeft.
- Als de verzendende server stopt, neemt een ander knooppunt deze rol over en verzendt **GARPs** (gratuitous ARP ), zodat het netwerk het virtuele IP ( VIP ) koppelt aan zijn eigen MAC adres.

Wat u dus moet testen:

1. dat de verbindingen correct over alle knooppunten zijn verdeeld;
2. dat het netwerk (router, gateway, virtualisatie) rekening houdt met GARP wanneer de verzendende server verandert.

## 2. Vereiste: het SafeKit mozaïek

De mozaïekpagina is een testpagina van SafeKit . Deze opent meerdere TCP verbindingen met het virtuele IP ( VIP ) en toont voor elke verbinding de naam van het knooppunt dat heeft gereageerd. Zo krijgt de verdeling in één oogopslag te zien.

1. Voeg in het `userconfig.xml` van de <span class="notranslate farm-term" translate="no">Farm</span> module, in de sectie `<vip>` , de load balancing-regel toe voor de poort van de SafeKit -webserver. Voorbeeld met de SafeKit webserver in HTTP op poort 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Als de SafeKit webserver en -console zijn overgeschakeld naar HTTPS, vervang dan 9010 door 9453.

2. Pas de configuratie toe op alle knooppunten.
3. Maak vanaf een browser op een clientwerkstation **buiten de <span class="notranslate farm-term" translate="no">Farm</span>** verbinding met:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Voer vervolgens de naam van de <span class="notranslate farm-term" translate="no">Farm</span> **module** in en voer de test uit. Elke cel van het mozaïek toont de naam van het knooppunt dat op de TCP verbinding heeft gereageerd, en aan elk knooppunt is een kleur gekoppeld om duidelijk aan te geven welke blokken van het mozaïek door hetzelfde knooppunt worden bediend.

   Gebruik in HTTPS `https://<VIP>:9453/safekit/mosaic.html` , met de load balancing-regel op poort 9453.

![ Test het virtuele IP adres van een SafeKit <span class="notranslate farm-term" translate="no">farm</span> met de mozaïekafbeelding ](/wp-content/uploads/2024/03/appli-19.png)

Bekijk de mozaïektestvideo in de sectie " [ Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> -oplossing ](/nl/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ".

## 3. Test 1 – Verdeling van verbindingen

**Stappen**

1. Start de <span class="notranslate farm-term" translate="no">Farm</span> op alle nodes (status UP ).
2. Open het mozaïek vanaf een clientwerkstation.

**Verwacht resultaat:** het mozaïek toont de namen van **alle knooppunten** van de <span class="notranslate farm-term" translate="no">Farm</span> , waarbij elk verwerkingsknooppunt een andere kleur heeft.

Dit bewijst dat de upstream-router of -gateway een van de knooppunten bereikt via zijn MAC adres, en dat dit knooppunt de verbindingen correct verdeelt.

## 4. Test 2 – Wijziging van de verzendserver

Deze test controleert of de <span class="notranslate farm-term" translate="no">Farm</span> blijft reageren wanneer de verzendserver stopt.

**Stappen**

1. Stop de <span class="notranslate farm-term" translate="no">Farm</span> , oftewel alle nodes in SafeKit .
2. Start **één node** . Deze node wordt de verzendserver.
   → **Verwacht resultaat:** het mozaïek toont alleen dit knooppunt.
3. Start de andere knooppunten.
   → **Verwacht resultaat:** het mozaïek toont alle knooppunten.
4. Stop het **eerste knooppunt** , dat fungeert als verzendserver.
   → **Verwacht resultaat:** het mozaïek toont de resterende knooppunten.

> **Beperking van deze test:** een correct resultaat bij stap 4 bewijst niet dat GARP werkt. Wanneer de <span class="notranslate farm-term" translate="no">Farm</span> module op de andere knooppunten wordt gestart (stap 3), wordt het virtuele IP adres op deze knooppunten geconfigureerd, wat berichten op het netwerk genereert die de koppeling tussen het virtuele IP adres en MAC adres mogelijk al omleiden. Alleen tests 3 en 4 testen daadwerkelijk of GARP werkt.

> Het stoppen van een ander knooppunt in de <span class="notranslate farm-term" translate="no">Farm</span> (een knooppunt dat niet de verzendserver is) test alleen de herconfiguratie van de distributie.

## 5. Test 3 – Controleren van GARP -omleiding met `arp -a`

Samen met test 4 controleert deze test daadwerkelijk GARP : je noteert het MAC adres van de verzendende server voordat je deze stopt, en controleert vervolgens of de koppeling tussen het virtuele IP ( VIP ) en MAC adres daarna is gewijzigd.

Deze test is alleen mogelijk als het clientwerkstation waarop het mozaïek wordt weergegeven zich in **hetzelfde IP subnet** bevindt als de <span class="notranslate farm-term" translate="no">Farm</span> .

Als er een router tussen de client en de <span class="notranslate farm-term" translate="no">Farm</span> staat, bevat de ARP tabel van de client niet het virtuele IP ( VIP ), maar het adres van de gateway waarmee het netwerk van de <span class="notranslate farm-term" translate="no">Farm</span> wordt bereikt. Controleer in dat geval de ARP tabel van de router of gateway met het netwerkteam.

**Stappen**

1. Start de <span class="notranslate farm-term" translate="no">Farm</span> op alle knooppunten.
2. Voer op het clientwerkstation `arp -a` uit en noteer het MAC adres dat is gekoppeld aan het virtuele IP ( VIP ). Dit adres identificeert de verzendende server.
3. Stop het <span class="notranslate farm-term" translate="no">Farm</span> met dit MAC adres.
4. Controleer of het mozaïek nog steeds werkt met de overgebleven knooppunten.
5. Voer `arp -a` opnieuw uit om de nieuwe virtuele IP ( VIP )/ MAC koppeling te lezen en de nieuwe verzendende server te identificeren.

## 6. Test 4 – End-to-end controle met Wireshark ( Windows ) of tcpdump ( Linux )

Je kunt een TCP verbinding met het virtuele IP ( VIP ) volgen door pakketten vast te leggen op de client en op de <span class="notranslate farm-term" translate="no">Farm</span> : met Wireshark op Windows machines en met tcpdump op Linux machines.

Je moet naar de **MAC headers (Ethernet-headers) van de pakketten** kijken, niet alleen naar de IP adressen: het kernelfilter van de verzendende server verdeelt de verbindingen door **het MAC adres van de bestemming in de pakketten te herschrijven** naar dat van het verwerkende knooppunt. Het IP adres van de bestemming blijft het virtuele IP ( VIP ) over het hele pad.

**Wat je voor hetzelfde SYN pakket moet observeren:**

| Stap | Waar te filmen | Waargenomen MAC adressen |
|---|---|---|
| 1. De client verzendt naar het virtuele IP ( VIP ). | cliënt | MAC van de client → MAC van de **verzendende server** |
| 2. De verzendende server stuurt de verbinding door. | verzendserver | MAC verzenden → MAC van het **verwerkingsknooppunt** |
| 3. Het verwerkingsknooppunt ontvangt | verwerkingsknooppunt | MAC verzenden → MAC van knooppunt |
| 4. Het knooppunt reageert direct op de client. | verwerkingsknooppunt | MAC van de node → MAC van de client |
| 5. De klant ontvangt het antwoord. | cliënt | MAC van de node → MAC van de client |

> Als het clientwerkstation zich in een ander subnet bevindt dan de <span class="notranslate farm-term" translate="no">Farm</span> , is het "client- MAC " dat op de <span class="notranslate farm-term" translate="no">Farm</span> wordt weergegeven het MAC adres van de **gateway** (router) die de twee subnets verbindt, en niet dat van het clientwerkstation.

Herhaal de opname na het stoppen van de verzendserver (test 2, stap 4): stap 1 moet nu het MAC adres van de **nieuwe** verzendserver weergeven.

## 7. Welke werkstations moeten worden getest?

Het gedrag is afhankelijk van het netwerkpad tussen de client en de <span class="notranslate farm-term" translate="no">Farm</span> . Voer tests 1 en 2 uit vanaf elk type client dat relevant is voor uw architectuur:

| Klantlocatie | Wat de test controleert |
|---|---|
| Client in **hetzelfde subnet** als de <span class="notranslate farm-term" translate="no">Farm</span> | Update van de ARP tabellen van de clients door GARP (test 3 mogelijk) |
| Client in een **ander subnet** (router, gateway, virtueel netwerk van de hypervisor) | GARP -afhandeling door de router of gateway |
| Client-VM **op een hypervisor die ook een <span class="notranslate farm-term" translate="no">Farm</span> VM host.** | Het gedrag van de virtuele switch van de hypervisor, die ook de interne switching en routing afhandelt. |

## 8. Samenvatting van de verwachte resultaten

| Test | Actie | Verwacht resultaat |
|---|---|---|
| 1 | Alle knooppunten UP , mozaïek | Alle knooppunten verschijnen |
| 2.2 | Een enkel knooppunt is gestart | Alleen dit knooppunt verschijnt |
| 2.3 | Alle knooppunten zijn gestart. | Alle knooppunten verschijnen |
| 2.4 | De verzendserver is gestopt | De resterende knooppunten verschijnen, zonder blijvende onderbreking. |
| 3 | `arp -a` vóór en na de stop | Het MAC adres dat is gekoppeld aan het virtuele IP ( VIP ) verandert. |
| 4 | Wireshark of tcpdump legt de situatie vast vóór en na het stoppen. | De client verzendt naar het MAC adres van de nieuwe verzendserver. |

## 9. Probleemoplossing

- **Load balancing bitmaps:** voor details over de test en de load balancing bitmaps, zie de SafeKit 8.2 gebruikershandleiding, sectie 4.3.5 " [ Test TCP load balancing op een virtueel IP adres ](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic) ".
- **Het mozaïek reageert niet meer nadat de verzendende server is gestopt:** GARP wordt niet in overweging genomen door een apparaat op het pad (router, gateway, virtuele switch). Neem contact op met uw netwerkteam om GARP afhandeling te controleren.
- **Periodiek verzenden van GARP :** het attribuut `arpreroute="on"` van de `<vip>` -sectie (met `arpinterval` en `arpelapse` ) verzendt regelmatig GARPs op de VIP's. Zie de gebruikershandleiding, sectie 13.6.4 " [ `<vip>` -syntaxis ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnose van problemen met virtuele IP ( VIP ) ↔ MAC resolutie:** zie de gebruikershandleiding, sectie 7.24 " [ Probleemoplossing voor virtuele IP ( VIP ) ↔ MAC resolutie ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) " en sectie 7.15 " [ <span class="notranslate farm-term" translate="no">Farm</span> UP ( Ready ) maar probleem met load balancing in een <span class="notranslate farm-term" translate="no">Farm</span> ](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> oplossing {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

Voor failover tussen primaire en back-up met een virtueel IP adres, zie [ Het virtuele IP adres van een SafeKit mirror testen ](/nl/best-practises/test-primary-backup-vip-mirror/) .

{{%  insert-safekit-4-buttons-nl  %}}
