---
titel: "Het testen van het virtuele IP-adres voor load balancing in een SafeKit farm cluster"
canoniek: "https://safekit.eviden.com/nl/best-practises/test-load-balancing-vip-farm/"
Beschrijving: "Leer hoe u load balancing over clusterknooppunten kunt testen en virtuele IP-failover, GARP-rerouting en netwerkgedrag kunt verifiëren."
categorie: "beste praktijken"
lang: "nl"
Onderwerpen: "Kernprincipes, Vereiste: de SafeKit mozaïek, Test 1 – Distributie van verbindingen, Test 2 – Wijziging van de verzendende server, Test 3 – Controleren van GARP-rerouting met arp -a, Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux), Welke werkstations te testen, Samenvatting van de verwachte resultaten, Probleemoplossing"
---

# Testen van het virtuele IP-adres voor load balancing in een SafeKit <span class="notranslate farm-term" translate="no">farm</span> cluster

Deze handleiding beschrijft hoe u kunt controleren of een SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> module, load balancing op een virtueel IP-adres) correct werkt in uw netwerk: de verdeling van verbindingen over de knooppunten en het omleiden van het virtuele IP-adres (VIP) wanneer het verzendende knooppunt stopt.

## 1. Kernprincipes

**Voorwaarde:** alle knooppunten van de <span class="notranslate farm-term" translate="no">Farm</span> moeten zich in hetzelfde Layer 2 IP-subnet bevinden: een LAN of een VLAN dat is uitgebreid tussen externe locaties.

- Het virtuele IP-adres (VIP) wordt lokaal geconfigureerd op elk knooppunt van de <span class="notranslate farm-term" translate="no">Farm</span>: het wordt ingesteld als een alias van het fysieke IP-adres, op de netwerkkaart van dat adres, wanneer de <span class="notranslate farm-term" translate="no">Farm</span> op het knooppunt wordt gestart.
- Een enkel knooppunt, de **verzendserver**, ontvangt het netwerkverkeer voor het virtuele IP-adres (VIP) (`vmac_directed` configuratie, de SafeKit standaard): het MAC-adres is het adres dat is gekoppeld aan het virtuele IP-adres (VIP) in de ARP-tabellen (router, gateway, clients in hetzelfde subnet).
- Het kernelfilter van dit knooppunt verdeelt vervolgens de TCP-verbindingen over de knooppunten van de <span class="notranslate farm-term" translate="no">Farm</span>, door **het MAC-adres van de bestemming** van de pakketten te herschrijven naar dat van het verwerkende knooppunt (het IP-adres van de bestemming blijft het virtuele IP-adres (VIP)). Reacties worden rechtstreeks verzonden van het knooppunt dat de verbinding verwerkt naar de client.
- De distributie die door het filter wordt uitgevoerd is **deterministisch**: het verwerkingsknooppunt wordt berekend op basis van de identiteit van de client, volgens de geconfigureerde load balancing-regel:
  - op het **client IP-adres** (`filter="on_addr"`): een bepaalde client wordt altijd bediend door hetzelfde knooppunt, wat sessie-affiniteit garandeert;
  - op de **client TCP-poort** (`filter="on_port"`): elke TCP-verbinding van dezelfde client kan door een ander knooppunt worden afgehandeld. Dit is de regel die wordt gebruikt voor het mozaïek (sectie 2), dat daarom alle knooppunten van één werkstation weergeeft.
- Als de verzendende server stopt, neemt een ander knooppunt deze rol over en verzendt **GARPs** (gratuitous ARP) zodat het netwerk het virtuele IP-adres (VIP) koppelt aan zijn eigen MAC-adres.

Wat u dus moet testen:

1. dat de verbindingen correct over alle knooppunten zijn verdeeld;
2. dat het netwerk (router, gateway, virtualisatie) rekening houdt met GARP wanneer de verzendende server verandert.

## 2. Vereiste: het SafeKit mozaïek

De mozaïekpagina is een testpagina die door SafeKit wordt aangeboden. Deze opent meerdere TCP-verbindingen met het virtuele IP-adres (VIP) en toont voor elke verbinding de naam van het knooppunt dat heeft gereageerd. Dit geeft in één oogopslag de verdeling weer.

1. Voeg in de `userconfig.xml` van de <span class="notranslate farm-term" translate="no">Farm</span> module, in de `<vip>` sectie, de load balancing regel toe op de poort van de SafeKit webserver. Voorbeeld met de SafeKit webserver in HTTP op poort 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Als de SafeKit webserver en console zijn overgeschakeld naar HTTPS, vervang dan 9010 door 9453.

2. Pas de configuratie toe op alle knooppunten.
3. Maak vanaf een browser op een clientwerkstation **buiten de <span class="notranslate farm-term" translate="no">Farm</span>** verbinding met:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Voer vervolgens de modulenaam <span class="notranslate farm-term" translate="no">Farm</span> **modulenaam** in en voer de test uit. Elke cel van het mozaïek toont de naam van het knooppunt dat op de TCP-verbinding heeft gereageerd, en aan elk knooppunt is een kleur gekoppeld om duidelijk aan te geven welke blokken van het mozaïek door hetzelfde knooppunt worden bediend.

   Gebruik in HTTPS `https://<VIP>:9453/safekit/mosaic.html`, met de load balancing-regel op poort 9453.

De test wordt gedetailleerd beschreven in de gebruikershandleiding SafeKit 8.2, sectie 4.3.5 "[Test TCP-loadbalancing op een virtueel IP-adres](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. Test 1 – Verdeling van verbindingen

**Stappen**

1. Start de <span class="notranslate farm-term" translate="no">Farm</span> op alle knooppunten (UP-status).
2. Open het mozaïek vanaf een clientwerkstation.

**Verwacht resultaat:** het mozaïek toont de namen van **alle knooppunten** van de <span class="notranslate farm-term" translate="no">Farm</span>, met een andere kleur voor elk verwerkingsknooppunt.

Dit bewijst dat de upstream-router of -gateway een van de knooppunten bereikt via zijn MAC-adres, en dat dit knooppunt de verbindingen correct verdeelt.

## 4. Test 2 – Wijziging van de verzendserver

Deze test controleert of de <span class="notranslate farm-term" translate="no">Farm</span> blijft reageren wanneer de verzendende server stopt.

**Stappen**

1. Stop de <span class="notranslate farm-term" translate="no">Farm</span>, oftewel alle knooppunten in SafeKit.
2. Start **een enkel knooppunt**. Dit knooppunt wordt de verzendserver.
   → **Verwacht resultaat:** Het mozaïek toont alleen dit knooppunt.
3. Start de andere knooppunten.
   → **Verwacht resultaat:** De mozaïek toont alle knooppunten.
4. Stop het eerste knooppunt **1, het knooppunt dat als verzendserver fungeert.
   → **Verwacht resultaat:** Het mozaïek toont de resterende knooppunten.

> **Beperking van deze test:** Een correct resultaat bij stap 4 bewijst niet dat GARP werkt. Wanneer de <span class="notranslate farm-term" translate="no">Farm</span> module op de andere knooppunten wordt gestart (stap 3), wordt het virtuele IP-adres op deze knooppunten geconfigureerd, wat berichten op het netwerk genereert die de associatie tussen het virtuele IP-adres en het MAC-adres mogelijk al omleiden. Alleen tests 3 en 4 testen GARP daadwerkelijk.

Het stoppen van een ander knooppunt van de <span class="notranslate farm-term" translate="no">Farm</span> (een knooppunt dat niet de verzendserver is) test alleen de herconfiguratie van de distributie.

## 5. Test 3 – Controleren van GARP-omleiding met `arp -a`

Samen met test 4 controleert deze test daadwerkelijk GARP: je noteert het MAC-adres van de verzendende server voordat je deze stopt, en controleert vervolgens of de Virtual IP (VIP)/MAC-associatie daarna is gewijzigd.

Deze test is alleen mogelijk als het clientwerkstation dat het mozaïek weergeeft zich in hetzelfde IP-subnet bevindt als de clientwerkstations.

Als er een router tussen de client en de <span class="notranslate farm-term" translate="no">Farm</span> staat, bevat de ARP-tabel van de client niet het virtuele IP-adres (VIP), maar het adres van de gateway waarmee het netwerk van de <span class="notranslate farm-term" translate="no">Farm</span> wordt bereikt. Controleer in dat geval de ARP-tabel van de router of gateway met het netwerkteam.

**Stappen**

1. Start de <span class="notranslate farm-term" translate="no">Farm</span> op alle knooppunten.
2. Voer op het clientwerkstation `arp -a` uit en noteer het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP). Dit adres identificeert de verzendende server.
3. Stop het knooppunt <span class="notranslate farm-term" translate="no">Farm</span> dat dit MAC-adres heeft.
4. Controleer of het mozaïek nog steeds werkt met de resterende knooppunten.
5. Voer `arp -a` opnieuw uit om de nieuwe Virtual IP (VIP)/MAC-associatie te lezen en de nieuwe verzendserver te identificeren.

## 6. Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux)

Je kunt een TCP-verbinding met het virtuele IP-adres (VIP) volgen door pakketten vast te leggen op de client en op de 0-1-2-nodes: met Wireshark op de 3-machines en met tcpdump op de 4-machines.

Je moet kijken naar de MAC-headers (Ethernet) van de pakketten¹ en niet alleen naar de IP-adressen: het kernelfilter van de verzendende server verdeelt de verbindingen door² het MAC-adres van de bestemming³ van de pakketten te herschrijven naar dat van het verwerkende knooppunt. Het IP-adres van de bestemming blijft het virtuele IP-adres (VIP) over het hele pad.

**Wat u voor hetzelfde SYN-pakket moet observeren:**

| Stap | Waar vast te leggen | Waargenomen MAC-adressen |
|---|---|---|
| 1. De client verzendt naar het virtuele IP-adres (VIP) | client | MAC-adres van de client → MAC-adres van de **verzendende server** |
| 2. De verzendende server stuurt de verbinding door | verzendende server | Verzendend MAC → MAC van de **verwerkingsknooppunt** |
| 3. Het verwerkingsknooppunt ontvangt | verwerkingsknooppunt | Verzenden MAC → knooppunt MAC |
| 4. Het knooppunt reageert direct op de client | verwerkend knooppunt | MAC-adres van knooppunt → MAC-adres van client |
| 5. De client ontvangt het antwoord | client | Knooppunt MAC → client MAC |

Als het clientwerkstation zich in een ander subnet bevindt dan de 0, 1 en 2, is het "client-MAC-adres" dat op de 3, 4 en 5 knooppunten wordt weergegeven het MAC-adres van de gateway 7 (router) die de twee subnets verbindt, en niet dat van het clientwerkstation.

Herhaal de opname na het stoppen van de verzendserver (test 2, stap 4): stap 1 moet nu het MAC-adres van de **nieuwe** verzendserver weergeven.

7. Welke werkstations moeten worden getest?

Het gedrag is afhankelijk van het netwerkpad tussen de client en de <span class="notranslate farm-term" translate="no">Farm</span>. Voer tests 1 en 2 uit vanaf elk type client dat relevant is voor uw architectuur:

| Locatie van de klant | Wat de test controleert |
|---|---|
| Client in hetzelfde subnet** als de <span class="notranslate farm-term" translate="no">Farm</span> | Update van de ARP-tabellen van de clients door GARP (test 3 mogelijk) |
| Client in een **ander subnet** (router, gateway, hypervisor virtueel netwerk) | GARP-afhandeling door de router of gateway |
| Client VM **op een hypervisor die ook een <span class="notranslate farm-term" translate="no">Farm</span> VM** | Gedrag van de virtuele switch van de hypervisor, die ook interne switching en routing afhandelt |

## 8. Samenvatting van de verwachte resultaten

Test 0 Actie 2 Verwacht resultaat 3
|---|---|---|
| 1 | Alle knooppunten omhoog, mozaïek | Alle knooppunten verschijnen |
| 2.2 | Er is één knooppunt gestart | Alleen dit knooppunt verschijnt |
| 2.3 | Alle knooppunten gestart | Alle knooppunten verschijnen |
| 2.4 | Verzendserver gestopt | De resterende knooppunten verschijnen, zonder blijvende onderbreking |
| 3 | `arp -a` voor en na de stop | Het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP) verandert |
| 4 | Wireshark- of tcpdump-opname voor en na de stop | De client verzendt naar het MAC-adres van de nieuwe verzendserver |

## 9. Probleemoplossing

- **De mozaïekserver reageert niet meer nadat de verzendende server is gestopt:** GARP wordt niet in overweging genomen door een apparaat op het pad (router, gateway, virtuele switch). Neem contact op met uw netwerkteam om de GARP-afhandeling te controleren.
- **Periodieke verzending van GARP:** het `arpreroute="on"` attribuut van de `<vip>` sectie (met `arpinterval` en `arpelapse`) verzendt regelmatig GARP's op de VIP's. Zie de gebruikershandleiding, sectie 13.6.4 "[`<vip>` syntax](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnose van virtuele IP (VIP) ↔ MAC-resolutie:** zie de gebruikershandleiding, sectie 7.24 "[Probleemoplossing voor virtuele IP (VIP) ↔ MAC-resolutie](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", en sectie 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> module UP (Ready) maar probleem met load balancing in een <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> oplossing {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

Voor failover tussen primaire en back-up met een virtueel IP-adres, zie [Het virtuele IP-adres van een SafeKit mirror cluster testen](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-nl  %}}
