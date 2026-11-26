---
title: "Come implementare server ridondanti con un semplice software HA"
canonical: "https://safekit.eviden.com/it/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Scopri come implementare server ridondanti con un semplice approccio basato solo su software. SafeKit offre la replica dei dati in tempo reale e il failover automatico su Windows e Linux. Non richiede dischi condivisi né competenze informatiche specialistiche."
category: "best-practises"
lang: "it"
topics: "Come implementare server ridondanti attivi/passivi con replica in tempo reale e failover?, Come implementare server ridondanti attivi/attivi con bilanciamento del carico di rete e failover?, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# Come implementare server ridondanti con un semplice software HA {#how-to-implement-redundant-servers-with-simple-ha-software}

## Come implementare server ridondanti attivi/passivi con replica in tempo reale e failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### Il cluster mirror SafeKit {#the-safekit-mirror-cluster}


![Server ridondanti con replica di file in tempo reale e failover](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


In un cluster mirror, il software SafeKit è installato su due server. I server possono essere fisici o virtuali. Eseguono Windows o Linux, on-premise o nel cloud. Il server primario è il server attivo. Esegue l’applicazione critica. Il server secondario è un server ridondante passivo. Riceve in tempo reale tutte le modifiche apportate dall’applicazione ai suoi file. I client si connettono a un [indirizzo IP virtuale](</it/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Se il server primario si guasta, SafeKit riavvia automaticamente l’applicazione critica sul server secondario. Questo server diventa primario e assume l’indirizzo IP virtuale. Quando il server guasto si riavvia, SafeKit risincronizza automaticamente i suoi dati. Questo server diventa quindi il server ridondante passivo, nello stato secondario.

## Come implementare server ridondanti attivi/attivi con bilanciamento del carico di rete e failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### Il cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#the-safekit-farm-cluster}


![Server ridondanti con bilanciamento del carico di rete e failover](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


In un cluster <span class="notranslate farm-term" translate="no">farm</span>, il software SafeKit viene installato su più server ridondanti. I server eseguono Windows o Linux, in locale o nel cloud. Tutti i server ridondanti sono attivi. Eseguono la stessa applicazione front-end critica. I client si connettono a un [indirizzo IP virtuale](</it/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). Le sessioni TCP sono bilanciate tra tutti i server ridondanti. Se un server si guasta, SafeKit riconfigura automaticamente il bilanciamento del carico delle sessioni TCP tra i server attivi rimanenti. Quando il server guasto si riavvia, SafeKit lo reintegra automaticamente come server ridondante attivo. Questo server riceve quindi nuove sessioni TCP.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}