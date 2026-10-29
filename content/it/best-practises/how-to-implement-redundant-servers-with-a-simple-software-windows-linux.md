---
title: "Come implementare server ridondanti con un semplice software HA"
canonical: "https://safekit.eviden.com/it/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Scopri come implementare server ridondanti con un semplice approccio basato esclusivamente su software. SafeKit propone un'architettura SANless per Windows e Linux , offrendo replica dei dati in tempo reale e failover automatico senza dischi condivisi o competenze IT specializzate."
category: "best-practises"
lang: "it"
topics: "Come implementare server ridondanti attivi/passivi con replica in tempo reale e failover?, Come implementare server ridondanti attivi/attivi con bilanciamento del carico di rete e failover?, 🔍 SafeKit Hub di navigazione ad alta disponibilità"
---

# Come implementare server ridondanti con un semplice software HA {#how-to-implement-redundant-servers-with-simple-ha-software}

## Come implementare server ridondanti attivi/passivi con replica in tempo reale e failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### Il cluster SafeKit mirror {#the-safekit-mirror-cluster}


![ Server ridondanti con replica dei file in tempo reale e failover ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


In un cluster mirror , il software SafeKit è installato su due server fisici o virtuali che eseguono Windows o Linux (in locale o nel cloud). Il server primario è il server attivo ed esegue un'applicazione critica. Il server secondario è un server passivo ridondante che riceve in tempo reale tutte le modifiche apportate dall'applicazione ai suoi file. I client sono connessi a un indirizzo IP virtuale [ ](</it/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) ). Se il server primario non è disponibile, SafeKit riavvia automaticamente l'applicazione critica sul server passivo ridondante, che diventa primario e commuta l'indirizzo IP virtuale. Quando il server guasto viene riavviato, viene automaticamente risincronizzato e diventa il server passivo ridondante che opera come secondario.

## Come implementare server ridondanti attivo/attivo con bilanciamento del carico di rete e failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### Il cluster SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#the-safekit-farm-cluster}


![ Server ridondanti con bilanciamento del carico di rete e failover ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


In un cluster <span class="notranslate farm-term" translate="no">farm</span> , il software SafeKit è installato su server ridondanti che eseguono Windows o Linux (in locale o nel cloud). Tutti i server ridondanti sono attivi ed eseguono la stessa applicazione front-end critica. I client sono connessi a un indirizzo IP virtuale [ , ](</it/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>) . Le sessioni TCP vengono bilanciate tra tutti i server ridondanti. Se un server non è disponibile, SafeKit riconfigura automaticamente il bilanciamento del carico delle sessioni TCP tra i server attivi rimanenti. Quando il server guasto viene riavviato, viene automaticamente reintegrato come server ridondante attivo e riceve nuove sessioni TCP.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}