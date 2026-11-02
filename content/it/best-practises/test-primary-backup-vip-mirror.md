---
title: "Test dell'indirizzo IP virtuale di un cluster mirror SafeKit"
canonical: "https://safekit.eviden.com/it/best-practises/test-primary-backup-vip-mirror/"
description: "Verificare la disponibilità e il failover degli indirizzi IP virtuali in un cluster mirror SafeKit, inclusi il reindirizzamento GARP, i controlli ARP e l'acquisizione di pacchetti."
category: "best-practises"
lang: "it"
topics: "Principi chiave, Prerequisito: configurazione VIP, Test 1 – VIP detenuto dal server primario, Test 2 – Failover manuale (arresto del primario), Test 3 – Verifica del reindirizzamento GARP con arp -a, Test 4 – Verifica end-to-end con Wireshark (Windows) o tcpdump (Linux), Da quali workstation eseguire il test, Riepilogo dei risultati attesi, Risoluzione dei problemi"
---

# Verifica dell'indirizzo IP virtuale di un cluster mirror SafeKit nella rete

Questa guida descrive come verificare che l'indirizzo IP virtuale (VIP) di un cluster mirror SafeKit (modulo mirror) funzioni correttamente nella rete: il VIP è assegnato al server primario e viene reindirizzato al nuovo server primario dopo un failover.

## 1. Principi chiave

**Prerequisito:** entrambi i nodi del cluster mirror devono trovarsi nella stessa sottorete IP di livello 2: una LAN o una VLAN estesa tra siti remoti.

- Il VIP è attivo solo sul **server primario** (stati PRIM o ALONE): viene impostato come alias dell'indirizzo IP fisico, sulla scheda di rete di tale indirizzo, quando il modulo si avvia come primario sul nodo (configurazione `where="one_side_alias"` ).
- L'indirizzo MAC del server primario è quindi quello associato al VIP nelle tabelle ARP (router, gateway, client nella stessa sottorete). Tutto il traffico diretto al VIP viene inviato al server primario.
- Durante un failover (arresto o guasto del primario), l'indirizzo IP virtuale (VIP) viene rimosso dal precedente primario e impostato come alias sul nuovo primario. Due meccanismi consentono quindi alla rete di associare il VIP all'indirizzo MAC del nuovo primario:
  - i messaggi di rete inviati dal sistema operativo quando VIP viene aggiunto come alias sulla scheda di rete;
  - i **GARP** (ARP gratuiti) inviati da SafeKit, quando l'attributo `arpreroute="on"` è configurato nella sezione `<vip>` .

Ciò che è necessario testare, quindi:

1. che l'accesso VIP è gestito dal server primario ed è raggiungibile dai client;
2. che l'indirizzo MAC associato al VIP venga reindirizzato al nuovo server primario nella rete (router, gateway, virtualizzazione) quando il server primario cambia.

## 2. Prerequisito: configurazione VIP

1. Nel file `userconfig.xml` del modulo mirror, configura VIP nella sezione `<vip>` . L'attributo `arpreroute="on"` fa sì che il nuovo server primario invii GARP dopo un failover:

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

2. Applica la configurazione su entrambi i nodi.
3. Avviare il modulo: un nodo deve essere **PRIM (Ready)** e l'altro **SECOND (Ready)** .

## 3. Test 1 – VIP gestito dal server primario

**Passaggi**

1. Sul server primario, eseguire `ipconfig` (Windows) o `ip addr show` (Linux).
   → **Risultato atteso:** VIP appare come alias sulla scheda di rete dell'indirizzo IP fisico.
2. Sul server secondario, eseguire lo stesso comando.
   → **Risultato atteso:** il VIP non compare.
3. Da una workstation client **esterna al cluster** , `ping` sia dell'indirizzo IP fisico che dell'indirizzo VIP.
   → **Risultato atteso:** tutti e tre i comandi `ping` rispondono (a meno che non siano filtrati dai firewall).
4. Verifica l'accesso tramite VIP con il mosaico SafeKit: da un browser sul client **esterno** , connettiti a `http://<VIP>:9010/safekit/mosaic.html` , quindi inserisci il **nome del modulo** mirror ed esegui il test.
   → **Risultato atteso:** tutte le celle del mosaico mostrano il nome del **server primario** , in un unico colore: tutte le connessioni TCP al VIP vengono gestite dal server primario.

## 4. Test 2 – Failover manuale (arresto del server primario)

Questo test verifica che l'indirizzo IP virtuale (VIP) segua il server primario durante un failover, attivato arrestando il modulo sul server primario.

**Passaggi**

1. Arresta il modulo sul nodo primario (nodo 1) dalla console SafeKit (oppure dalla riga di comando con `safekit stop -m <module>` ).
   → **Risultato atteso:** il nodo 1 passa allo stato STOP (NotReady) e il nodo 2 passa allo stato ALONE (Ready). Nel log del nuovo primario compare il messaggio " `Virtual IP <VIP> set` .
2. Sul nuovo server primario, eseguire `ipconfig` o `ip addr show` .
   → **Risultato atteso:** VIP ora appare come alias su questo nodo e non più sul precedente nodo primario.
3. Dalla workstation client, ripetere i tre comandi `ping` ed eseguire nuovamente il mosaico sul VIP.
   → **Risultato atteso:** tutto risponde e tutte le celle del mosaico ora mostrano il nome della **nuova primaria** , in un unico colore.
4. Riavvia il modulo sul nodo 1: si risincronizza e passa allo stato SECOND (Ready), mentre il nodo 2 passa allo stato PRIM (Ready).

## 5. Test 3 – Verifica del reindirizzamento MAC con `arp -a`

Si annota l'indirizzo MAC associato al VIP prima del failover, quindi si verifica che sia cambiato in seguito.

Questo test è possibile solo se la workstation client si trova nella **stessa sottorete IP** del cluster.

Se tra il client e il cluster è presente un router, la tabella ARP del client non contiene l'indirizzo IP virtuale (VIP), bensì l'indirizzo del gateway utilizzato per raggiungere la rete del cluster. In tal caso, è necessario verificare, insieme al team di rete, la presenza di un reindirizzamento MAC nella tabella ARP del router o del gateway.

**Passaggi**

1. Il modulo è PRIM (pronto) sul nodo 1 e SECOND (pronto) sul nodo 2.
2. Sulla workstation client, `ping` sia dell'indirizzo IP fisico che del VIP, quindi esegui `arp -a` .
   → **Risultato atteso:** il VIP è associato allo **stesso indirizzo MAC dell'indirizzo IP fisico del primario** .
3. `stop` il modulo sul nodo primario (nodo 1).
4. Esegui nuovamente `ping` del VIP, quindi esegui di nuovo `arp -a` .
   → **Risultato atteso:** il VIP è ora associato allo **stesso indirizzo MAC dell'indirizzo IP fisico del nuovo primario** .

> Esegui nuovamente `ping` al VIP prima di leggere la tabella ARP: la voce potrebbe essere contrassegnata come obsoleta e aggiornata solo dopo un `ping` .

Esempio della tabella ARP prevista, prima e dopo l'arresto del server primario:

| Indirizzo | MAC prima dello stop | MAC dopo lo stop |
|---|---|---|
| Indirizzo IP fisico del nodo 1 | Indirizzo MAC del nodo 1 | Indirizzo MAC del nodo 1 |
| Indirizzo IP fisico del nodo 2 | MAC del nodo 2 | MAC del nodo 2 |
| VIP | **Nodo 1 MAC** | **Nodo 2 MAC** |

## 6. Test 4 – Verifica end-to-end con Wireshark (Windows) o tcpdump (Linux)

È possibile tracciare una connessione TCP verso VIP catturando i pacchetti sul client e su entrambi i nodi: con Wireshark sui sistemi Windows e con tcpdump sui sistemi Linux.

È necessario esaminare le **intestazioni MAC (Ethernet) dei pacchetti** : l'indirizzo IP di destinazione rimane VIP, mentre è l'indirizzo MAC di destinazione a indicare quale nodo riceve il traffico.

**Cosa dovresti osservare:**

| Quando | Dove effettuare l'acquisizione | Indirizzi MAC osservati |
|---|---|---|
| Prima del failover | client | MAC del client → MAC del **nodo 1 (primario)** |
| Prima del failover | nodo 1 | I pacchetti vengono ricevuti dal VIP; il nodo 2 non riceve nulla |
| Durante il failover | rete | Messaggi di reindirizzamento MAC inviati dal nodo 2 per VIP: messaggi inviati dal sistema operativo quando VIP è impostato come alias e GARP inviati da SafeKit ( `arpreroute="on"` ) |
| Dopo il failover | client | MAC del client → MAC del **nodo 2 (nuovo primario)** |

Se la workstation client si trova in una sottorete diversa da quella del cluster, l'indirizzo MAC del client visualizzato sui nodi è l'indirizzo MAC del **gateway** (router) che collega le due sottoreti, non quello della workstation client.

## 7. Da quali postazioni di lavoro eseguire il test

Il comportamento dipende dal percorso di rete tra il client e il cluster. Esegui i test 1 e 2 per ogni tipo di client rilevante per la tua architettura:

| Ubicazione del cliente | Cosa verifica il test |
|---|---|
| Client nella **stessa sottorete** del cluster | Aggiornamento delle tabelle ARP dei client (test 3 possibile) |
| Client in una **sottorete diversa** (router, gateway, rete virtuale dell'hypervisor) | Aggiornamento delle tabelle ARP dei client nel router o nel gateway |
| Macchina virtuale client **su un hypervisor che ospita anche una macchina virtuale del cluster mirror** | Comportamento dello switch virtuale dell'hypervisor, che gestisce anche lo switching e il routing interni |

## 8. Sintesi dei risultati attesi

| Test | Azione | Risultato atteso |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig` , `ping` e mosaico | VIP come alias solo sul primario; i 3 comandi `ping` rispondono (a meno che non siano filtrati dai firewall); il mosaico visualizza solo il primario |
| 2 | Arresto del primario | VIP come alias sul nuovo primario; messaggio `Virtual IP <VIP> set` ; il mosaico visualizza solo il nuovo primario |
| 3 | `arp -a` prima e dopo l'arresto del nodo primario | Il VIP si sposta dall'indirizzo MAC del nodo 1 a quello del nodo 2 |
| 4 | Acquisizione Wireshark o tcpdump prima e dopo il failover | Il client invia all'indirizzo MAC del nuovo primario |

## 9. Risoluzione dei problemi

- **Dopo il failover, il VIP non risponde più:** i messaggi di reindirizzamento MAC non vengono presi in considerazione da un dispositivo sul percorso (router, gateway, switch virtuale), che continua a inviare traffico all'indirizzo MAC del precedente primario. Verifica la gestione dei messaggi di reindirizzamento MAC con il tuo team di rete.
- **Invio di GARP:** l'attributo `arpreroute="on"` della sezione `<vip>` (con `arpinterval` e `arpelapse` ) invia regolarmente GARP su VIP dopo il failover. Vedere la Guida per l'utente, sezione 13.6.4 " [Sintassi `<vip>`](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnosi della risoluzione VIP ↔ MAC:** consultare la Guida per l'utente, sezione 7.24 " [Risoluzione dei problemi relativi alla risoluzione VIP ↔ MAC](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_Issue_with_VIP) " e sezione 7.16 " [Problema con l'IP virtuale dopo il failover](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_Problem_with_the_1) ".
