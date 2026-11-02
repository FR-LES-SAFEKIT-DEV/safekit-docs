---
title: "Het virtuele IP-adres van een SafeKit-spiegelcluster testen"
canonical: "https://safekit.eviden.com/nl/best-practises/test-primary-backup-vip-mirror/"
description: "Test de beschikbaarheid en failover van virtuele IP-adressen in een SafeKit-spiegelcluster, inclusief GARP-rerouting, ARP-controles en pakketcaptures."
category: "best-practises"
lang: "nl"
topics: "Kernprincipes, Vereiste: Configuratie van virtueel IP-adres (VIP), Test 1 – Virtueel IP-adres (VIP) van de primaire server, Test 2 – Handmatige failover (stop van de primaire server), Test 3 – Controleren van GARP-rerouting met arp -a, Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux), Welke werkstations te testen, Samenvatting van de verwachte resultaten, Probleemoplossing"
---

# Het virtuele IP-adres van een SafeKit-spiegelcluster in uw netwerk testen.

Deze handleiding beschrijft hoe u kunt controleren of het virtuele IP-adres (VIP) van een SafeKit-spiegelcluster (spiegelmodule) correct werkt in uw netwerk: het virtuele IP-adres (VIP) wordt beheerd door de primaire server en wordt na een failover doorgestuurd naar de nieuwe primaire server.

## 1. Kernprincipes

**Vereiste:** beide knooppunten van het spiegelcluster moeten zich in hetzelfde Layer 2 IP-subnet bevinden: een LAN of een VLAN dat is uitgebreid tussen externe locaties.

- Het virtuele IP-adres (VIP) is alleen actief op de **primaire server** (PRIM- of ALONE-status): het wordt ingesteld als een alias van het fysieke IP-adres op de netwerkkaart van dat adres wanneer de module als primair op de node start (configuratie `where="one_side_alias"` ).
- Het MAC-adres van de primaire server is daarom het adres dat is gekoppeld aan het virtuele IP-adres (VIP) in de ARP-tabellen (router, gateway, clients in hetzelfde subnet). Al het verkeer naar het virtuele IP-adres (VIP) wordt naar de primaire server gestuurd.
- Tijdens een failover (stop of uitval van de primaire server) wordt het virtuele IP-adres (VIP) verwijderd van de voormalige primaire server en ingesteld als een alias op de nieuwe primaire server. Twee mechanismen zorgen er vervolgens voor dat het netwerk het virtuele IP-adres (VIP) kan koppelen aan het MAC-adres van de nieuwe primaire server:
  - de netwerkberichten die door het besturingssysteem worden verzonden wanneer het virtuele IP-adres (VIP) als alias aan de netwerkkaart wordt toegevoegd;
  - de **GARP's** (gratuitous ARP) verzonden door SafeKit, wanneer het attribuut `arpreroute="on"` is geconfigureerd in de `<vip>` -sectie.

Wat u dus moet testen:

1. Het virtuele IP-adres (VIP) wordt beheerd door de primaire server en is bereikbaar vanaf de clients;
2. Het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP) wordt omgeleid naar de nieuwe primaire server in het netwerk (router, gateway, virtualisatie) wanneer de primaire server verandert.

## 2. Vereiste: Configuratie van een virtueel IP-adres (VIP)

1. Configureer in het `userconfig.xml` van de mirror-module het virtuele IP-adres (VIP) in de sectie `<vip>` . Het attribuut `arpreroute="on"` zorgt ervoor dat de nieuwe primaire server na een failover GARP-berichten verzendt.

   ```xml
   <vip>
     <interface_list>
       <interface arpreroute="on">
         <real_interface>
           <virtual_addr addr="<VIP>" where="one_side_alias"/>
         </real_interface>
       </interface>
     </interface_list>
   </vip>
   ```

2. Pas de configuratie toe op beide knooppunten.
3. Start de module: één knooppunt moet **PRIM (Ready)** zijn en het andere **SECOND (Ready)** .

## 3. Test 1 – Virtueel IP-adres (VIP) van de primaire server

**Stappen**

1. Voer op de primaire server `ipconfig` (Windows) of `ip addr show` (Linux) uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) verschijnt als een alias op de netwerkkaart van het fysieke IP-adres.
2. Voer op de secundaire server hetzelfde commando uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) verschijnt niet.
3. `ping` vanaf een clientwerkstation **buiten het cluster** zowel de fysieke IP-adressen als het virtuele IP-adres (VIP).
   → **Verwacht resultaat:** alle drie `ping` commando's reageren (tenzij ze door firewalls worden geblokkeerd).
4. Controleer de toegang via het virtuele IP-adres (VIP) met de SafeKit-mozaïek: ga vanuit een browser op de **externe** client naar `http://<VIP>:9010/safekit/mosaic.html` , voer vervolgens de **naam van** de spiegelmodule in en voer de test uit.
   → **Verwacht resultaat:** alle cellen van het mozaïek tonen de naam van de **primaire server** in één kleur: alle TCP-verbindingen naar het virtuele IP-adres (VIP) worden door de primaire server afgehandeld.

## 4. Test 2 – Handmatige failover (stop van de primaire server)

Deze test controleert of het virtuele IP-adres (VIP) de primaire server volgt tijdens een failover, die wordt veroorzaakt door het stoppen van de module op de primaire server.

**Stappen**

1. Stop de module op de primaire server (node 1) via de SafeKit-console (of via de commandoregel met `safekit stop -m <module>` ).
   → **Verwacht resultaat:** knooppunt 1 gaat naar STOP (Niet gereed) en knooppunt 2 gaat naar ALONE (Gereed). In het logboek van de nieuwe primaire server verschijnt het bericht `Virtual IP <VIP> set` .
2. Voer op de nieuwe primaire server `ipconfig` of `ip addr show` uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) verschijnt nu als een alias op dit knooppunt en niet langer op het voormalige primaire knooppunt.
3. Voer vanaf het clientwerkstation de drie `ping` -opdrachten opnieuw uit en start de mozaïektest opnieuw op het virtuele IP-adres (VIP).
   → **Verwacht resultaat:** alles reageert, en alle cellen van het mozaïek tonen nu de naam van de **nieuwe primaire cel** in één kleur.
4. Start de module op knooppunt 1 opnieuw op: deze synchroniseert opnieuw en gaat naar SECOND (Ready), terwijl knooppunt 2 naar PRIM (Ready) gaat.

## 5. Test 3 – MAC-omleiding controleren met `arp -a`

U noteert het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP) vóór de failover en controleert vervolgens of dit adres is gewijzigd.

Deze test is alleen mogelijk als het clientwerkstation zich in **hetzelfde IP-subnet** bevindt als het cluster.

Als er een router tussen de client en het cluster staat, bevat de ARP-tabel van de client niet het virtuele IP-adres (VIP), maar het adres van de gateway waarmee het clusternetwerk wordt bereikt. Controleer in dat geval de ARP-tabel van de router of gateway met het netwerkteam.

**Stappen**

1. De module is PRIM (gereed) op knooppunt 1 en SECOND (gereed) op knooppunt 2.
2. `ping` op het clientwerkstation zowel de fysieke IP-adressen als het virtuele IP-adres (VIP) en voer vervolgens `arp -a` uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) is gekoppeld aan **hetzelfde MAC-adres als het fysieke IP-adres van het primaire apparaat** .
3. `stop` de module op de primaire server (node 1).
4. `ping` het virtuele IP-adres (VIP) opnieuw en voer vervolgens `arp -a` nogmaals uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) is nu gekoppeld aan **hetzelfde MAC-adres als het fysieke IP-adres van het nieuwe primaire apparaat** .

> `ping` het virtuele IP-adres (VIP) opnieuw voordat u de ARP-tabel leest: de vermelding kan als verouderd gemarkeerd zijn en pas na een `ping` worden bijgewerkt.

Voorbeeld van de verwachte ARP-tabel, vóór en na het stoppen van de primaire server:

| Adres | MAC-adres vóór de stop | MAC-adres na de stop |
|---|---|---|
| Fysiek IP-adres van knooppunt 1 | MAC-adres van knooppunt 1 | MAC-adres van knooppunt 1 |
| Fysiek IP-adres van knooppunt 2 | MAC-adres van knooppunt 2 | MAC-adres van knooppunt 2 |
| Virtueel IP-adres (VIP) | **MAC-adres van knooppunt 1** | **MAC-adres van knooppunt 2** |

## 6. Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux)

Je kunt een TCP-verbinding met het virtuele IP-adres (VIP) volgen door pakketten vast te leggen op de client en op beide knooppunten: met Wireshark op Windows-machines en met tcpdump op Linux-machines.

Je moet naar de **MAC-headers (Ethernet) van de pakketten** kijken: het bestemmings-IP-adres blijft het virtuele IP-adres (VIP), en het is het bestemmings-MAC-adres dat aangeeft welke node het verkeer ontvangt.

**Wat u moet observeren:**

| Wanneer | Waar op te nemen | Waargenomen MAC-adressen |
|---|---|---|
| Vóór de failover | client | MAC-adres van de client → MAC-adres van **knooppunt 1 (primair)** |
| Vóór de failover | knooppunt 1 | Pakketten naar het virtuele IP-adres (VIP) worden ontvangen; knooppunt 2 ontvangt niets |
| Tijdens de failover | netwerk | MAC-rerouteringsberichten verzonden door knooppunt 2 voor het virtuele IP-adres (VIP): berichten verzonden door het besturingssysteem wanneer dit als alias is ingesteld, en GARP's verzonden door SafeKit ( `arpreroute="on"` ) |
| Na de failover | client | MAC-adres van de client → MAC-adres van **knooppunt 2 (nieuwe primaire server)** |

Als het clientwerkstation zich in een ander subnet bevindt dan het cluster, is het "client-MAC-adres" dat op de knooppunten wordt weergegeven het MAC-adres van de **gateway** (router) die de twee subnets verbindt, en niet dat van het clientwerkstation.

## 7. Welke werkstations moeten worden getest?

Het gedrag is afhankelijk van het netwerkpad tussen de client en het cluster. Voer tests 1 en 2 uit vanaf elk type client dat relevant is voor uw architectuur:

| Locatie van de klant | Wat de test controleert |
|---|---|
| Client in **hetzelfde subnet** als het cluster | Update van de ARP-tabellen van de clients (test 3 mogelijk) |
| Client in een **ander subnet** (router, gateway, virtueel netwerk van de hypervisor) | Bijwerken van de ARP-tabellen van de clients in de router of gateway |
| Client-VM **op een hypervisor die ook een VM van het spiegelcluster host** | Gedrag van de virtuele switch van de hypervisor, die ook de interne switching en routing afhandelt |

## 8. Samenvatting van de verwachte resultaten

| Test | Actie | Verwacht resultaat |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig` , `ping` en mosaic | Virtueel IP-adres (VIP) als alias alleen op de primaire server; de 3 `ping` opdrachten reageren (tenzij gefilterd door firewalls); de mosaic toont alleen de primaire server |
| 2 | Stop van de primaire | Virtueel IP-adres (VIP) als alias op de nieuwe primaire; Bericht `Virtual IP <VIP> set` ; de mozaïekweergave toont alleen de nieuwe primaire |
| 3 | `arp -a` voor en na het stoppen van de primaire server | Virtueel IP-adres (VIP) verplaatst zich van het MAC-adres van knooppunt 1 naar dat van knooppunt 2 |
| 4 | Wireshark- of tcpdump-opname vóór en na de failover | De client verzendt naar het MAC-adres van de nieuwe primaire server |

## 9. Probleemoplossing

- **Het virtuele IP-adres (VIP) reageert niet meer na de failover:** MAC-reroutingberichten worden niet verwerkt door een apparaat in het pad (router, gateway, virtuele switch), waardoor het verkeer blijft doorsturen naar het MAC-adres van het voormalige primaire IP-adres. Controleer de afhandeling van MAC-reroutingberichten met uw netwerkteam.
- **GARP-berichten verzenden:** het attribuut `arpreroute="on"` van de `<vip>` -sectie (met `arpinterval` en `arpelapse` ) verzendt regelmatig GARP-berichten op het virtuele IP-adres (VIP) na de failover. Zie de gebruikershandleiding, sectie 13.6.4 " [`<vip>` -syntaxis](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnose van problemen met virtuele IP (VIP) ↔ MAC-resolutie:** zie de gebruikershandleiding, sectie 7.24 " [Problemen met virtuele IP (VIP) ↔ MAC-resolutie](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_Issue_with_VIP) " en sectie 7.16 " [Probleem met het virtuele IP-adres na failover](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Voor load balancing met een virtueel IP-adres, zie [Het testen van het virtuele IP-adres voor load balancing in een SafeKit Farm-cluster](test-load-balancing-vip-farm/) .
{{% insert-safekit-4-buttons-nl %}}
