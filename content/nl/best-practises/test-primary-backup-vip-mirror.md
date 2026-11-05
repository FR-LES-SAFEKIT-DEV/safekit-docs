---
title: "Het virtuele IP-adres van een SafeKit mirror-cluster testen"
canonical: "https://safekit.eviden.com/nl/best-practises/test-primary-backup-vip-mirror/"
description: "Test de beschikbaarheid van virtuele IP-adressen en failover in een SafeKit mirror-cluster, inclusief GARP rerouting, ARP-controles en packet captures."
category: "best-practises"
lang: "nl"
topics: "Belangrijkste principes, Vereiste: configuratie van virtueel IP (VIP), Test 1 – Virtueel IP (VIP) in handen van de primaire server, Test 2 – Handmatige failover (stoppen van de primaire), Test 3 – GARP omleiding controleren met arp -a, Test 4 – End-to-end controle met Wireshark (Windows) of tcpdump (Linux), Vanaf welke werkstations testen, Samenvatting van de verwachte resultaten, Probleemoplossing"
translation: "translate_md 2026-11-05.10 | glossaire 2026-11-05.14 | Translation LLM | 16 expressions"
---

# Het virtuele IP-adres van een SafeKit mirror-cluster in uw netwerk testen {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

Deze handleiding beschrijft hoe u kunt controleren of het virtuele IP-adres (VIP) van een SafeKit mirror-cluster (mirror) correct werkt in uw netwerk: het virtuele IP-adres (VIP) wordt beheerd door de primaire server en wordt na een failover omgeleid naar de nieuwe primaire server.

## 1. Kernprincipes {#1-key-principles}

**Vereiste:** beide knooppunten van het mirror-cluster moeten zich in hetzelfde laag 2 IP-subnet bevinden: een LAN of een VLAN dat is uitgebreid tussen externe sites.

- Het virtuele IP-adres (VIP) is alleen actief op de **primaire server** (status PRIM of ALONE): het wordt ingesteld als een alias van het fysieke IP-adres, op de netwerkkaart van dat adres, wanneer de module als primair start op de node (`where="one_side_alias"`).
- Het MAC-adres van de primaire server is daarom het adres dat is gekoppeld aan het virtuele IP-adres (VIP) in de ARP-tabellen (router, gateway, clients in hetzelfde subnet). Al het verkeer naar het virtuele IP-adres (VIP) wordt naar de primaire server gestuurd.
- Tijdens een failover (stop of storing van de primaire server) wordt het virtuele IP-adres (VIP) verwijderd van de voormalige primaire server en ingesteld als een alias op de nieuwe primaire server. Twee mechanismen stellen het netwerk vervolgens in staat om het virtuele IP-adres (VIP) te associëren met het MAC-adres van de nieuwe primaire server:
  - de netwerkberichten die door het besturingssysteem worden verzonden wanneer de virtuele IP (VIP) als alias op de netwerkkaart wordt toegevoegd;
  - de **GARP's** (gratuitous ARP) die door SafeKit worden verzonden, wanneer het kenmerk `arpreroute="on"` is geconfigureerd in de sectie `<vip>`.

Wat u dus moet testen:

1. het virtuele IP-adres (VIP) wordt beheerd door de primaire server en is bereikbaar vanaf de clients;
2. het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP) wordt omgeleid naar de nieuwe primaire server in het netwerk (router, gateway, virtualisatie) wanneer de primaire server verandert.

## 2. Vereiste: configuratie van virtueel IP-adres (VIP) {#2-prerequisite-virtual-ip-vip-configuration}

1. Configureer in de `userconfig.xml` van de mirror module het virtuele IP-adres (VIP) in de sectie `<vip>`. Het attribuut `arpreroute="on"` zorgt ervoor dat de nieuwe primaire server GARP's verzendt na een failover:

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

2. Pas de configuratie op beide knooppunten toe.
3. Start de module: één node moet **PRIM (Ready)** zijn en de andere **SECOND (Ready)**.

## 3. Test 1 – Virtueel IP-adres (VIP) in handen van de primaire server {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**Stappen**

1. Voer op de primaire server `ipconfig` (Windows) of `ip addr show` (Linux) uit.
   → **Verwacht resultaat:** de virtuele IP (VIP) verschijnt als een alias op de netwerkkaart van het fysieke IP-adres.
2. Voer op de secundaire server dezelfde opdracht uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) verschijnt niet.
3. `ping` vanaf een clientwerkstation **buiten het cluster** zowel de fysieke IP-adressen als het virtuele IP-adres (VIP).
   → **Verwacht resultaat:** alle drie `ping` commando's reageren (tenzij ze worden gefilterd door firewalls).
4. Controleer de toegang via het virtuele IP (VIP) met de SafeKit-mozaïek: maak vanuit een browser op de **externe** client verbinding met `http://<VIP>:9010/safekit/mosaic.html` (of gebruik poort 9453 als de SafeKit-webserver en -console zijn overgeschakeld naar HTTPS), voer vervolgens de **naam van** de mirror in en voer de test uit.
   → **Verwacht resultaat:** alle cellen van het mozaïek tonen de naam van de **primaire server**, in één kleur: alle TCP-verbindingen naar het virtuele IP-adres (VIP) worden bediend door de primaire server.

![Test het virtuele IP-adres van een SafeKit mirror met de mozaïek](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Handmatige failover (stoppen van de primaire) {#4-test-2--manual-failover-stop-of-the-primary}

Deze test controleert of het virtuele IP-adres (VIP) de primaire server volgt tijdens een failover, die wordt geactiveerd door de module op de primaire server te stoppen.

**Stappen**

1. Stop de module op de primaire (node 1) vanuit de SafeKit-console (of vanuit de opdrachtregel met `safekit stop -m <module>`).
   → **Verwacht resultaat:** knooppunt 1 gaat naar STOP (NotReady) en knooppunt 2 gaat naar ALONE (Ready). In het logboek van de nieuwe primaire verschijnt het bericht `Virtual IP <VIP> set`.
2. Voer op de nieuwe primaire `ipconfig` of `ip addr show` uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) verschijnt nu als een alias op dit knooppunt en niet langer op het vorige primaire knooppunt.
3. Herhaal vanaf het clientwerkstation de drie `ping` commando's en voer de mozaïek opnieuw uit op het virtuele IP-adres (VIP).
   → **Verwacht resultaat:** alles reageert en alle cellen van het mozaïek tonen nu de naam van de **nieuwe primaire** in één kleur.
4. Start de module opnieuw op node 1: deze wordt opnieuw gesynchroniseerd en gaat naar SECOND (Ready), terwijl node 2 naar PRIM (Ready) gaat.

## 5. Test 3 – MAC-omleiding controleren met `arp -a` {#5-test-3--checking-mac-rerouting-with-arp--a}

Noteer het MAC-adres dat is gekoppeld aan het virtuele IP-adres (VIP) vóór de failover en controleer vervolgens of het daarna is gewijzigd.

Deze test is alleen mogelijk als de clientwerkstation zich in **hetzelfde IP-subnet** bevindt als het cluster.

Als er een router tussen de client en het cluster zit, bevat de ARP-tabel van de client niet het virtuele IP-adres (VIP), maar het adres van de gateway die wordt gebruikt om het netwerk van het cluster te bereiken. Controleer in dat geval de ARP-tabel van de router of gateway met het netwerkteam.

**Stappen**

1. De module is PRIM (Ready) op knooppunt 1 en SECOND (Ready) op knooppunt 2.
2. `ping` vanaf het clientwerkstation zowel de fysieke IP-adressen als het virtuele IP-adres (VIP) en voer vervolgens `arp -a` uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) is gekoppeld aan **hetzelfde MAC-adres als het fysieke IP-adres van de primaire**.
3. `stop` de module op de primaire (knooppunt 1).
4. `ping` het virtuele IP-adres (VIP) opnieuw en voer vervolgens opnieuw `arp -a` uit.
   → **Verwacht resultaat:** het virtuele IP-adres (VIP) is nu gekoppeld aan **hetzelfde MAC-adres als het fysieke IP-adres van de nieuwe primaire**.

> `ping` het virtuele IP-adres (VIP) opnieuw voordat u de ARP-tabel leest: de vermelding kan als verouderd zijn gemarkeerd en wordt pas na een `ping` vernieuwd.

Voorbeeld van de verwachte ARP-tabel, voor en na het stoppen van de primaire:

| Adres | MAC vóór de stop | MAC na de stop |
|---|---|---|
| Fysiek IP-adres van knooppunt 1 | MAC-adres van knooppunt 1 | MAC-adres van knooppunt 1 |
| Fysiek IP-adres van knooppunt 2 | MAC-adres van knooppunt 2 | MAC-adres van knooppunt 2 |
| Virtueel IP (VIP) | **MAC-adres van knooppunt 1** | **MAC-adres van knooppunt 2** |

## 6. Test 4 – End-to-end-controle met Wireshark (Windows) of tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

U kunt een TCP-verbinding naar het virtuele IP-adres (VIP) volgen door pakketten vast te leggen op de client en op beide knooppunten: met Wireshark op Windows-machines en met tcpdump op Linux-machines.

U moet naar de **MAC-headers (Ethernet) van de pakketten** kijken: het IP-adres van de bestemming blijft het virtuele IP-adres (VIP), en het is het MAC-adres van de bestemming dat aangeeft welk knooppunt het verkeer ontvangt.

**Wat u moet observeren:**

| Wanneer | Waar pakketten vastleggen | Waargenomen MAC-adressen |
|---|---|---|
| Voor de failover | klant | MAC-adres van de client → MAC-adres van **knooppunt 1 (primair)** |
| Voor de failover | knooppunt 1 | Pakketten naar het virtuele IP-adres (VIP) worden ontvangen; knooppunt 2 ontvangt niets. |
| Tijdens de failover | netwerk | MAC-omleiding van berichten verzonden door knooppunt 2 voor het virtuele IP-adres (VIP): berichten verzonden door het besturingssysteem wanneer het is ingesteld als een alias, en GARP's verzonden door SafeKit (`arpreroute="on"`) |
| Na de failover | klant | MAC-adres van de client → MAC-adres van **knooppunt 2 (nieuwe primaire)** |

> Als de clientwerkstation zich in een ander subnet bevindt dan het cluster, is de "client-MAC" die op de knooppunten wordt gezien het MAC-adres van de **gateway** (router) die de twee subnetten verbindt, niet dat van de clientwerkstation.

## 7. Vanaf welke werkstations testen? {#7-which-workstations-to-test-from}

Het gedrag is afhankelijk van het netwerkpad tussen de client en het cluster. Voer tests 1 en 2 uit vanaf elk type client dat relevant is voor uw architectuur:

| Locatie van de klant | Wat de test controleert |
|---|---|
| Client in **hetzelfde subnet** als het cluster | Bijwerken van de ARP-tabellen van de clients (test 3 mogelijk) |
| Client in een **ander subnet** (router, gateway, virtueel netwerk van de hypervisor) | Bijwerken van de ARP-tabellen van de clients in de router of gateway |
| Client-VM **op een hypervisor die ook een VM van het mirror-cluster host** | Gedrag van de virtuele switch van de hypervisor, die ook interne switching en routering afhandelt |

## 8. Samenvatting van de verwachte resultaten {#8-summary-of-expected-results}

| Test | Actie | Verwacht resultaat |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` en mozaïek | Virtueel IP (VIP) als alias op de primaire; de 3 `ping` opdrachten reageren (tenzij gefilterd door firewalls); het mozaïek toont alleen de primaire |
| 2 | Stop van de primaire | Virtueel IP (VIP) als alias op de nieuwe primaire; `Virtual IP <VIP> set` bericht; het mozaïek toont alleen de nieuwe primaire |
| 3 | `arp -a` voor en nadat de primaire is gestopt | Het virtuele IP-adres (VIP) verplaatst zich van het MAC-adres van knooppunt 1 naar dat van knooppunt 2. |
| 4 | Wireshark- of tcpdump-opname vóór en na de failover | De client stuurt naar het MAC-adres van de nieuwe primaire. |

## 9. Probleemoplossing {#9-troubleshooting}

- **Het virtuele IP-adres (VIP) reageert niet meer na de failover:** MAC-omleidingsberichten worden niet in aanmerking genomen door een apparaat op het pad (router, gateway, virtuele switch), dat verkeer blijft verzenden naar het MAC-adres van de voormalige primaire. Controleer de verwerking van MAC-omleidingsberichten met uw netwerkteam.
- **GARP's verzenden:** het attribuut `arpreroute="on"` van de sectie `<vip>` (met `arpinterval` en `arpelapse`) verzendt na de failover regelmatig GARP's op het virtuele IP-adres (VIP). Zie de gebruikershandleiding, sectie 13.6.4 " [`<vip>` -syntaxis](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnose van virtuele IP (VIP) ↔ MAC-resolutie:** zie de gebruikershandleiding, sectie 7.24 " [Probleemoplossing voor virtuele IP (VIP) ↔ MAC-resolutie](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_Issue_with_VIP) " en sectie 7.16 " [Probleem met het virtuele IP na failover](https://safekit.eviden.com/nl/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Voor meer informatie:
- [Hoe werkt een virtueel IP-adres in een high-availability-cluster?](/nl/best-practises/how-a-virtual-ip-address-works/)
- Voor taakverdeling met een virtueel IP-adres, zie [Het virtuele IP-adres voor taakverdeling testen in een SafeKit farm-cluster](/nl/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-nl  %}}
