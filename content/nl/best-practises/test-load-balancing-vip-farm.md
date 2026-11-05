---
title: "Het virtuele IP-adres voor taakverdeling testen in een SafeKit farm-cluster"
canonical: "https://safekit.eviden.com/nl/best-practises/test-load-balancing-vip-farm/"
description: "Leer hoe u de taakverdeling van SafeKit over clusterknooppunten test en de failover van virtuele IP-adressen, GARP omleiding en netwerkgedrag verifieert."
category: "best-practises"
lang: "nl"
topics: "Kernprincipes, Vereiste: het SafeKit-mozaïek, Test 1 – Distributie van verbindingen, Test 2 – Wijziging van dispatching-server, Test 3 – Controleren van GARP -omleiding met arp -a, Test 4 – End-to-end-controle met Wireshark (Windows) of tcpdump (Linux), Vanaf welke werkstations testen, Samenvatting van de verwachte resultaten, Probleemoplossing, Demonstratie van de SafeKit farm"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 16 expressions"
---

# Het virtuele IP-adres voor taakverdeling testen in een SafeKit <span class="notranslate farm-term" translate="no">farm</span>-cluster {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

Deze handleiding beschrijft hoe u kunt controleren of een SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> module, taakverdeling op een virtueel IP-adres) correct werkt in uw netwerk: distributie van verbindingen over de knooppunten en omleiding van het virtuele IP (VIP) wanneer het dispatching-knooppunt stopt.

## 1. Kernprincipes {#1-key-principles}

**Vereiste:** alle knooppunten van de <span class="notranslate farm-term" translate="no">Farm</span> moeten zich in hetzelfde laag 2 IP-subnet bevinden: een LAN of een VLAN dat is uitgebreid tussen externe sites.

- Het virtuele IP-adres (VIP) wordt lokaal geconfigureerd op elke node van de <span class="notranslate farm-term" translate="no">Farm</span>: het wordt ingesteld als een alias van het fysieke IP-adres, op de netwerkkaart van dat adres, wanneer de <span class="notranslate farm-term" translate="no">Farm</span> op de node wordt gestart.
- Eén node, de **dispatching server**, ontvangt het netwerkverkeer voor het virtuele IP (VIP) (`vmac_directed` configuratie, de SafeKit-standaard): het MAC-adres is het adres dat is gekoppeld aan het virtuele IP (VIP) in de ARP-tabellen (router, gateway, clients in hetzelfde subnet).
- Het kernelfilter van dit knooppunt verdeelt vervolgens de TCP-verbindingen over de knooppunten van de <span class="notranslate farm-term" translate="no">Farm</span>, door **het MAC-adres van de pakketten te herschrijven** naar dat van het verwerkingsknooppunt (het IP-adres van de bestemming blijft het virtuele IP (VIP)). Reacties worden rechtstreeks vanaf het knooppunt dat de verbinding verwerkt naar de client verzonden.
- De distributie die door het filter wordt uitgevoerd, is **deterministisch**: de verwerkingsnode wordt berekend op basis van de identiteit van de client, volgens de geconfigureerde load balancing-regel:
  - op het **IP-adres van de client** (`filter="on_addr"`): een bepaalde client wordt altijd bediend door hetzelfde knooppunt, wat sessieaffiniteit garandeert;
  - op de **TCP-poort van de client** (`filter="on_port"`): elke TCP-verbinding van dezelfde client kan door een andere node worden bediend. Dit is de regel die wordt gebruikt voor de mozaïek (sectie 2), die daarom alle nodes van één werkstation toont.
- Als de dispatching-server stopt, neemt een andere node deze rol over en stuurt **GARP's** (gratuitous ARP) zodat het netwerk het virtuele IP (VIP) associeert met zijn eigen MAC-adres.

Wat u dus moet testen:

1. dat de verbindingen correct over alle knooppunten zijn verdeeld;
2. dat het netwerk (router, gateway, virtualisatie) rekening houdt met de GARP wanneer de dispatchingserver verandert.

## 2. Vereiste: het SafeKit-mozaïek {#2-prerequisite-the-safekit-mosaic}

De mozaïek is een testpagina van SafeKit. Deze opent vele TCP-verbindingen met het virtuele IP-adres (VIP) en toont voor elke verbinding de naam van de node die heeft gereageerd. Dit geeft een overzicht van de distributie.

1. Voeg in de `userconfig.xml` van de <span class="notranslate farm-term" translate="no">Farm</span> module, in de sectie `<vip>`, de load balancing-regel toe op de poort van de SafeKit-webserver. Voorbeeld met de SafeKit-webserver in HTTP op poort 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Als de SafeKit-webserver en -console zijn overgeschakeld naar HTTPS, vervangt u 9010 door 9453.

2. Pas de configuratie toe op alle knooppunten.
3. Maak vanuit een browser op een clientwerkstation **buiten de <span class="notranslate farm-term" translate="no">Farm</span>** verbinding met:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Voer vervolgens de naam van de <span class="notranslate farm-term" translate="no">Farm</span> **module** in en voer de test uit. Elke cel van het mozaïek toont de naam van het knooppunt dat reageerde op de TCP-verbinding, en aan elk knooppunt is een kleur gekoppeld om de blokken van het mozaïek die door hetzelfde knooppunt worden geleverd, duidelijk weer te geven.

   Gebruik in HTTPS `https://<VIP>:9453/safekit/mosaic.html`, met de load balancing-regel op poort 9453.

![Test het virtuele IP-adres van een SafeKit <span class="notranslate farm-term" translate="no">farm</span> met de mozaïek](/wp-content/uploads/2024/03/appli-19.png)

Bekijk de mozaïek -testvideo in de sectie " [Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span>](/nl/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ".

## 3. Test 1 – Verdeling van verbindingen {#3-test-1--distribution-of-connections}

**Stappen**

1. Start de <span class="notranslate farm-term" translate="no">Farm</span> op alle knooppunten (UP status).
2. Open de mozaïek vanaf een clientwerkstation.

**Verwacht resultaat:** de mozaïek toont de namen van **alle knooppunten** van de <span class="notranslate farm-term" translate="no">Farm</span>, met een andere kleur voor elk verwerkingsknooppunt.

Dit bewijst dat de upstream-router of -gateway een van de knooppunten bereikt via het MAC-adres, en dat dit knooppunt de verbindingen correct distribueert.

## 4. Test 2 – Wijziging van de verzendserver {#4-test-2--change-of-dispatching-server}

Deze test controleert of de <span class="notranslate farm-term" translate="no">Farm</span> blijft reageren wanneer de dispatching-server stopt.

**Stappen**

1. Stop de <span class="notranslate farm-term" translate="no">Farm</span>, d.w.z. alle knooppunten in SafeKit.
2. Start **een enkele node**. Deze node wordt de dispatching-server.
   → **Verwacht resultaat:** de mozaïek toont alleen dit knooppunt.
3. Start de andere knooppunten.
   → **Verwacht resultaat:** de mozaïek toont alle knooppunten.
4. Stop het **eerste knooppunt**, het knooppunt dat als dispatchingserver fungeert.
   → **Verwacht resultaat:** de mozaïek toont de resterende knooppunten.

> **Beperking van deze test:** een correct resultaat bij stap 4 bewijst niet dat GARP werkt. Wanneer de <span class="notranslate farm-term" translate="no">Farm</span> module op de andere nodes wordt gestart (stap 3), wordt het virtuele IP-adres op deze nodes geconfigureerd, wat berichten op het netwerk genereert die de associatie tussen het virtuele IP-adres en het MAC-adres mogelijk al omleiden. Alleen tests 3 en 4 testen GARP echt.

> Het stoppen van een ander knooppunt van de <span class="notranslate farm-term" translate="no">Farm</span> (een knooppunt dat niet de dispatchingserver is) test alleen de herconfiguratie van de distributie.

## 5. Test 3 – GARP omleiding controleren met `arp -a` {#5-test-3--checking-garp-rerouting-with-arp--a}

Samen met test 4 controleert deze test echt GARP: u noteert het MAC-adres van de dispatching-server voordat u deze stopt en controleert vervolgens of de Virtual IP (VIP)/MAC-associatie daarna is gewijzigd.

Deze test is alleen mogelijk als de clientwerkstation die de mozaïek weergeeft zich in **hetzelfde IP-subnet** bevindt als de <span class="notranslate farm-term" translate="no">Farm</span>.

Als er een router tussen de client en de <span class="notranslate farm-term" translate="no">Farm</span> staat, bevat de ARP-tabel van de client niet het virtuele IP-adres (VIP), maar het adres van de gateway die wordt gebruikt om het netwerk van de <span class="notranslate farm-term" translate="no">Farm</span> te bereiken. Controleer in dat geval de ARP-tabel van de router of gateway met het netwerkteam.

**Stappen**

1. Start de <span class="notranslate farm-term" translate="no">Farm</span> op alle knooppunten.
2. Voer op de clientwerkstation `arp -a` en noteer het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP). Dit identificeert de dispatchingserver.
3. Stop de <span class="notranslate farm-term" translate="no">Farm</span> node met dit MAC-adres.
4. Controleer of het mozaïek nog werkt met de resterende knooppunten.
5. Voer `arp -a` opnieuw uit om de nieuwe koppeling tussen het virtuele IP-adres (VIP) en het MAC-adres te lezen en de nieuwe dispatchingserver te identificeren.

## 6. Test 4 – End-to-end-controle met Wireshark (Windows) of tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

U kunt een TCP-verbinding met het virtuele IP-adres (VIP) volgen door pakketten vast te leggen op de client en op de <span class="notranslate farm-term" translate="no">Farm</span> knooppunten: met Wireshark op Windows-machines en met tcpdump op Linux-machines.

U moet naar de **MAC-headers (Ethernet) van de pakketten** kijken, niet alleen naar de IP-adressen: het kernelfilter van de dispatching-server verdeelt de verbindingen door **het MAC-adres van de bestemming van de pakketten te herschrijven** naar dat van het verwerkingsknooppunt. Het IP-adres van de bestemming blijft het virtuele IP-adres (VIP) langs het hele pad.

**Wat u moet observeren voor hetzelfde SYN-pakket:**

| Stap | Waar pakketten vastleggen | Waargenomen MAC-adressen |
|---|---|---|
| 1. De client stuurt naar het virtuele IP-adres (VIP) | klant | MAC van de client → MAC van de **dispatchingserver** |
| 2. De dispatchingserver stuurt de verbinding door | verzendserver | Verzendende server MAC → MAC van het **verwerkingsknooppunt** |
| 3. Het verwerkingsknooppunt ontvangt | verwerkingsknooppunt | Verzenden van server-MAC naar node-MAC |
| 4. Het knooppunt reageert rechtstreeks op de client. | verwerkingsknooppunt | MAC-adres van knooppunt → MAC-adres van client |
| 5. De cliënt ontvangt het antwoord. | klant | MAC-adres van knooppunt → MAC-adres van client |

> Als de clientwerkstation zich in een ander subnet bevindt dan de <span class="notranslate farm-term" translate="no">Farm</span>, is de "client MAC" die op de <span class="notranslate farm-term" translate="no">Farm</span> knooppunten wordt gezien het MAC-adres van de **gateway** (router) die de twee subnets verbindt, niet dat van de clientwerkstation.

Herhaal de opname nadat u de dispatching-server hebt gestopt (test 2, stap 4): stap 1 moet nu het MAC-adres van de **nieuwe** dispatching-server tonen.

## 7. Vanaf welke werkstations testen? {#7-which-workstations-to-test-from}

Het gedrag is afhankelijk van het netwerkpad tussen de client en de <span class="notranslate farm-term" translate="no">Farm</span>. Voer tests 1 en 2 uit vanaf elk type client dat relevant is voor uw architectuur:

| Locatie van de klant | Wat de test controleert |
|---|---|
| Client in **hetzelfde subnet** als de <span class="notranslate farm-term" translate="no">Farm</span> | Bijwerken van de ARP-tabellen van de clients via GARP (test 3 mogelijk) |
| Client in een **ander subnet** (router, gateway, virtueel netwerk van de hypervisor) | GARP -verwerking door de router of gateway |
| Client-VM **op een hypervisor die ook een <span class="notranslate farm-term" translate="no">Farm</span> VM host** | Gedrag van de virtuele switch van de hypervisor, die ook interne switching en routering afhandelt |

## 8. Samenvatting van de verwachte resultaten {#8-summary-of-expected-results}

| Test | Actie | Verwacht resultaat |
|---|---|---|
| 1 | Alle knooppunten UP, mozaïek | Alle knooppunten verschijnen |
| 2.2 | Eén knooppunt gestart | Alleen dit knooppunt wordt weergegeven |
| 2.3 | Alle knooppunten gestart | Alle knooppunten verschijnen |
| 2.4 | Verzendserver gestopt | De resterende knooppunten verschijnen zonder blijvende onderbreking. |
| 3 | `arp -a` voor en na de stop | Het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP) verandert. |
| 4 | Wireshark- of tcpdump-opname voor en na de stop | De client stuurt naar het MAC-adres van de nieuwe dispatchingserver. |

## 9. Probleemoplossing {#9-troubleshooting}

- **Load balancing-bitmaps:** voor details over de test en de load balancing-bitmaps, zie de SafeKit 8.2 Gebruikershandleiding, sectie 4.3.5 " [Test TCP load balancing op een virtueel IP-adres](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#Mosaic) ".
- **De mozaïek reageert niet meer nadat de dispatching server is gestopt:** GARP wordt niet in aanmerking genomen door een apparaat op het pad (router, gateway, virtuele switch). Controleer GARP afhandeling met uw netwerkteam.
- **Periodiek verzenden van GARP:** het `arpreroute="on"` van de `<vip>` -sectie (met `arpinterval` en `arpelapse`) verzendt regelmatig GARP's op de VIP's. Zie de gebruikershandleiding, sectie 13.6.4 " [`<vip>` -syntaxis](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnose van virtuele IP (VIP) ↔ MAC-resolutie:** zie de gebruikershandleiding, sectie 7.24 " [Probleemoplossing voor virtuele IP (VIP) ↔ MAC-resolutie](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_Issue_with_VIP) " en sectie 7.15 " [<span class="notranslate farm-term" translate="no">Farm</span> UP (Ready) maar probleem met taakverdeling in een <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

Voor meer informatie:
- [Hoe werkt een virtueel IP-adres in een high-availability-cluster?](/nl/best-practises/how-a-virtual-ip-address-works/)
- Voor primaire/back-up failover met een virtueel IP-adres, zie [Het virtuele IP-adres van een SafeKit mirror-cluster testen](/nl/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-nl  %}}
