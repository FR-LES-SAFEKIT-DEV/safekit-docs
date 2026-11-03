---
title: "Het virtuele IP adres van een SafeKit mirror testen"
canonical: "https://safekit.eviden.com/nl/best-practises/test-primary-backup-vip-mirror/"
description: "Test de beschikbaarheid en failover van virtuele IP in een SafeKit mirror, inclusief GARP rerouting, ARP controles en pakketcaptures."
category: "best-practises"
lang: "nl"
topics: "Kernprincipes, Vereiste: Configuratie van virtueel IP (VIP), Test 1 – Virtueel IP (VIP) van de primaire server, Test 2 – Handmatige failover (stop van de primaire server), Test 3 – Controleren van GARP -rerouting met arp -a, Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux), Welke werkstations te testen, Samenvatting van de verwachte resultaten, Probleemoplossing"
---

# Het virtuele IP adres van een SafeKit mirror in uw netwerk testen.

Deze handleiding beschrijft hoe u kunt controleren of het virtuele IP adres (VIP) van een SafeKit mirror (mirror) correct werkt in uw netwerk: het virtuele IP (VIP) wordt beheerd door de primaire server en wordt na een failover doorgestuurd naar de nieuwe primaire server.

## 1. Kernprincipes

**Vereiste:** beide knooppunten van het mirror moeten zich in hetzelfde Layer 2 IP subnet bevinden: een LAN of een VLAN dat is uitgebreid tussen externe locaties.

- Het virtuele IP (VIP) is alleen actief op de **primaire server** (PRIM of ALONE status): het wordt ingesteld als een alias van het fysieke IP adres op de netwerkkaart van dat adres wanneer de module als primair op de node start (configuratie `where="one_side_alias"`).
- Het MAC adres van de primaire server is daarom het adres dat is gekoppeld aan het virtuele IP (VIP) in de ARP tabellen (router, gateway, clients in hetzelfde subnet). Al het verkeer naar het virtuele IP (VIP) wordt naar de primaire server gestuurd.
- Tijdens een failover (stop of uitval van de primaire server) wordt het virtuele IP (VIP) verwijderd van de voormalige primaire server en ingesteld als een alias op de nieuwe primaire server. Twee mechanismen zorgen er vervolgens voor dat het netwerk het virtuele IP (VIP) kan koppelen aan het MAC adres van de nieuwe primaire server:
  - de netwerkberichten die door het besturingssysteem worden verzonden wanneer het virtuele IP (VIP) als alias aan de netwerkkaart wordt toegevoegd;
  - De **GARPs** (gratuitous ARP) die door SafeKit worden verzonden wanneer het attribuut `arpreroute="on"` is geconfigureerd in de `<vip>` -sectie.

Wat u dus moet testen:

1. Het virtuele IP (VIP) wordt beheerd door de primaire server en is bereikbaar vanaf de clients;
2. Het MAC adres dat is gekoppeld aan het virtuele IP (VIP) wordt omgeleid naar de nieuwe primaire server in het netwerk (router, gateway, virtualisatie) wanneer de primaire server verandert.

## 2. Vereiste: Configuratie van een virtueel IP (VIP).

1. Configureer in het `userconfig.xml` van de mirror module het virtuele IP (VIP) in de sectie `<vip>`. Het attribuut `arpreroute="on"` zorgt ervoor dat de nieuwe primaire server na een failover GARPs verzendt.

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
3. Start de module: één knooppunt moet **PRIM (Ready)** zijn en het andere **SECOND (Ready)**.

## 3. Test 1 – Virtueel IP (VIP) van de primaire server

**Stappen**

1. Voer op de primaire server `ipconfig` (Windows) of `ip addr show` (Linux) uit.
   → **Verwacht resultaat:** het virtuele IP (VIP) verschijnt als een alias op de netwerkkaart van het fysieke IP adres.
2. Voer op de secundaire server hetzelfde commando uit.
   → **Verwacht resultaat:** het virtuele IP (VIP) verschijnt niet.
3. `ping` vanaf een clientwerkstation **buiten het cluster** zowel de fysieke IP -adressen als het virtuele IP (VIP).
   → **Verwacht resultaat:** alle drie `ping` commando's reageren (tenzij ze door firewalls worden geblokkeerd).
4. Controleer de toegang via het virtuele IP (VIP) met de SafeKit mozaïek: maak vanuit een browser op de **externe** client verbinding met `http://<VIP>:9010/safekit/mosaic.html` (of gebruik poort 9453 als de SafeKit webserver en -console zijn overgeschakeld naar HTTPS), voer vervolgens de **naam van de spiegelmodule** mirror en voer de test uit.
   → **Verwacht resultaat:** alle cellen van het mozaïek tonen de naam van de **primaire server** in één kleur: alle TCP verbindingen naar het virtuele IP (VIP) worden door de primaire server afgehandeld.

![ Test het virtuele IP adres van een SafeKit mirror met de mozaïekafbeelding ](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Handmatige failover (stop van de primaire server)

Deze test controleert of het virtuele IP (VIP) de primaire server volgt tijdens een failover, die wordt veroorzaakt door het stoppen van de module op de primaire server.

**Stappen**

1. Stop de module op de primaire server (node 1) via de SafeKit -console (of via de commandoregel met `safekit stop -m <module>`).
   → **Verwacht resultaat:** knooppunt 1 gaat naar STOP (NotReady) en knooppunt 2 gaat naar ALONE (Ready). In het logboek van de nieuwe primaire server verschijnt het bericht `Virtual IP <VIP> set`.
2. Voer op de nieuwe primaire server `ipconfig` of `ip addr show` uit.
   → **Verwacht resultaat:** het virtuele IP (VIP) verschijnt nu als een alias op dit knooppunt en niet langer op het voormalige primaire knooppunt.
3. Voer vanaf het clientwerkstation de drie `ping` -opdrachten opnieuw uit en start de mozaïektest opnieuw op het virtuele IP (VIP).
   → **Verwacht resultaat:** alles reageert, en alle cellen van het mozaïek tonen nu de naam van de **nieuwe primaire kleur** in één enkele kleur.
4. Start de module op knooppunt 1 opnieuw op: deze synchroniseert opnieuw en gaat naar SECOND (Ready), terwijl knooppunt 2 naar PRIM (Ready) gaat.

## 5. Test 3 – MAC -omleiding controleren met `arp -a`

U noteert het MAC adres dat is gekoppeld aan het virtuele IP (VIP) vóór de failover en controleert vervolgens of dit adres is gewijzigd.

Deze test is alleen mogelijk als het clientwerkstation zich in **hetzelfde IP subnet** bevindt als het cluster.

Als er een router tussen de client en het cluster staat, bevat de ARP tabel van de client niet het virtuele IP (VIP), maar het adres van de gateway waarmee het clusternetwerk wordt bereikt. Controleer in dat geval de ARP tabel van de router of gateway met het netwerkteam.

**Stappen**

1. De module is PRIM (Ready) op knooppunt 1 en SECOND (Ready) op knooppunt 2.
2. `ping` op het clientwerkstation zowel de fysieke IP adressen als het virtuele IP (VIP) en voer vervolgens `arp -a` uit.
   → **Verwacht resultaat:** het virtuele IP (VIP) is gekoppeld aan **hetzelfde MAC -adres als het fysieke IP adres van het primaire IP-adres**.
3. `stop` de module op de primaire server (node 1).
4. `ping` het virtuele IP (VIP) opnieuw en voer vervolgens `arp -a` nogmaals uit.
   → **Verwacht resultaat:** het virtuele IP (VIP) is nu gekoppeld aan **hetzelfde MAC adres als het fysieke IP adres van het nieuwe primaire IP-adres**.

> `ping` het virtuele IP (VIP) opnieuw voordat u de ARP tabel leest: de vermelding kan als verouderd gemarkeerd zijn en pas na een `ping` worden bijgewerkt.

Voorbeeld van de verwachte ARP tabel, vóór en na het stoppen van de primaire server:

| Adres | MAC vóór de stop | MAC na de stop |
|---|---|---|
| Fysiek IP van knooppunt 1 | Knooppunt 1 MAC | Knooppunt 1 MAC |
| Fysiek IP van knooppunt 2 | Knooppunt 2 MAC | Knooppunt 2 MAC |
| Virtueel IP (VIP) | **Knooppunt 1 MAC** | **Knooppunt 2 MAC** |

## 6. Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux)

Je kunt een TCP verbinding met het virtuele IP (VIP) volgen door pakketten vast te leggen op de client en op beide knooppunten: met Wireshark op Windows -machines en met tcpdump op Linux machines.

Je moet naar de **MAC headers (Ethernet) van de pakketten** kijken: het bestemmings IP -adres blijft het virtuele IP (VIP), en het is het bestemmings MAC -adres dat aangeeft welke node het verkeer ontvangt.

**Wat u moet observeren:**

| Wanneer | Waar moeten de datapakketten worden vastgelegd? | Waargenomen MAC adressen |
|---|---|---|
| Vóór de failover | cliënt | Client MAC → MAC van **knooppunt 1 (primair)** |
| Vóór de failover | knooppunt 1 | Pakketten voor het virtuele IP (VIP) worden ontvangen; knooppunt 2 ontvangt niets. |
| Tijdens de failover | netwerk | MAC omleidingsberichten verzonden door knooppunt 2 voor het virtuele IP (VIP): berichten verzonden door het besturingssysteem wanneer dit als alias is ingesteld, en GARPs verzonden door SafeKit (`arpreroute="on"`). |
| Na de failover | cliënt | Client MAC → MAC van **knooppunt 2 (nieuwe primaire)** |

> Als het clientwerkstation zich in een ander subnet bevindt dan het cluster, is het "client- MAC " dat op de knooppunten wordt weergegeven het MAC adres van de **gateway** (router) die de twee subnets verbindt, en niet dat van het clientwerkstation.

## 7. Welke werkstations moeten worden getest?

Het gedrag is afhankelijk van het netwerkpad tussen de client en het cluster. Voer tests 1 en 2 uit vanaf elk type client dat relevant is voor uw architectuur:

| Klantlocatie | Wat de test controleert |
|---|---|
| Client in **hetzelfde subnet** als het cluster | Update van de ARP tabellen van de clients (test 3 mogelijk) |
| Client in een **ander subnet** (router, gateway, virtueel netwerk van de hypervisor) | Het bijwerken van de ARP tabellen van de clients in de router of gateway. |
| Client-VM **op een hypervisor die ook één VM van het mirror host.** | Het gedrag van de virtuele switch van de hypervisor, die ook de interne switching en routing afhandelt. |

## 8. Samenvatting van de verwachte resultaten

| Test | Actie | Verwacht resultaat |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` en mosaic | Virtueel IP (VIP) als alias, alleen op het primaire apparaat; de 3 `ping` commando's reageren (tenzij ze door firewalls worden gefilterd); de mozaïekweergave toont alleen het primaire apparaat. |
| 2 | Stop van de primaire | Virtueel IP (VIP) als alias op de nieuwe primaire server; bericht `Virtual IP <VIP> set`; de mozaïekweergave toont alleen de nieuwe primaire server. |
| 3 | `arp -a` vóór en na het stoppen van de primaire server | Het virtuele IP (VIP) wordt overgedragen van het MAC adres van knooppunt 1 naar dat van knooppunt 2. |
| 4 | Wireshark of tcpdump opnamen vóór en na de failover. | De client verzendt een bericht naar het MAC adres van de nieuwe primaire server. |

## 9. Probleemoplossing

- **Het virtuele IP (VIP) reageert niet meer na de failover:** MAC reroutingberichten worden niet verwerkt door een apparaat in het pad (router, gateway, virtuele switch), waardoor het verkeer blijft doorsturen naar het MAC adres van het voormalige primaire IP-adres. Controleer de afhandeling van MAC reroutingberichten met uw netwerkteam.
- **GARPs verzenden:** het attribuut `arpreroute="on"` van de `<vip>` -sectie (met `arpinterval` en `arpelapse`) verzendt regelmatig GARPs op het virtuele IP (VIP) na de failover. Zie de gebruikershandleiding, sectie 13.6.4 " [ `<vip>` -syntaxis ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnose van de resolutie van virtueel IP (VIP) ↔ MAC :** zie de gebruikershandleiding, sectie 7.24 " [ Probleemoplossing voor de resolutie van virtueel IP (VIP) ↔ MAC ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) " en sectie 7.16 " [ Probleem met het virtuele IP na failover ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Voor load balancing met een virtueel IP adres, zie [ Het virtuele IP adres voor load balancing testen in een SafeKit Farm cluster ](/nl/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-nl  %}}
