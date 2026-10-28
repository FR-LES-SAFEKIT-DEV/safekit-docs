---
title: "Software di continuità operativa e ripristino di emergenza per cluster a 2 nodi con SafeKit"
canonical: "https://safekit.eviden.com/it/use-cases/business-continuity-and-disaster-recovery-software/"
description: "SafeKit è un software di continuità operativa e ripristino di emergenza che implementa una semplice soluzione ad alta disponibilità tra due sale server remote. Ottieni un uptime 24 ore su 24, 7 giorni su 7 con SafeKit , il software di continuità operativa e ripristino di emergenza più facile da usare. Elimina costose SAN e complesse competenze IT grazie alla replica sincrona a 2 nodi, al failover automatico e al bilanciamento del carico per Windows e Linux . Zero perdita di dati (RPO=0) per le applicazioni critiche in qualsiasi ambiente cloud o on-premise."
category: "use-cases"
lang: "it"
topics: "Software per la continuità operativa e il ripristino di emergenza, 🔍 SafeKit Hub di navigazione ad alta disponibilità"
---

# Software di continuità operativa e ripristino di emergenza per cluster a 2 nodi con SafeKit {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## Software per la continuità operativa e il ripristino di emergenza {#business-continuity-and-disaster-recovery-software}

### Motivi per scegliere il software SafeKit per la continuità operativa e il ripristino di emergenza {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![ Software semplice per la continuità operativa e il ripristino di emergenza con SafeKit ](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


Non vi è alcuna differenza di configurazione quando si implementa un cluster SafeKit nella stessa sala server o in sale server remote, a condizione che sia disponibile una LAN estesa o una VLAN estesa tra i siti remoti.

### Come implementare una semplice soluzione di alta disponibilità tra due sale server remote? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

I moduli SafeKit mirror e `farm` possono essere facilmente implementati su server situati in sale server remote, senza alcuna configurazione cluster speciale. Ciò significa che SafeKit combina la continuità operativa e il ripristino di emergenza in un'unica architettura semplice. SafeKit gestisce anche [ ](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) in caso di isolamento di rete, senza richiedere un terzo server o un disco di quorum speciale.

### Soluzioni di continuità operativa vs soluzioni di backup {#business-continuity-vs-backup-solutions}

Le soluzioni di continuità operativa e di backup affrontano diversi scenari di errore e sono complementari, non intercambiabili. La continuità operativa, fornita dal clustering ad alta disponibilità di SafeKit , mantiene le applicazioni in esecuzione con interruzioni minime in caso di guasto di un server o di un'applicazione, tramite replica in tempo reale e failover automatico. Le soluzioni di backup proteggono da perdite più ampie, come attacchi ransomware o errori dell'operatore, e in genere si basano su copie di dati remote che possono essere ripristinate in seguito, con tempi di ripristino più lunghi ma senza failover automatico.

Scopri di più in [ Combinazione di SafeKit Alta disponibilità con backup di ripristino di emergenza ](</best-practises/high-availability-disaster-recovery-hadr/>) .


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}