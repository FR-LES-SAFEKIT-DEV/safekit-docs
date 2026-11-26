---
title: "Software di clustering con bilanciamento del carico e mirroring: alta disponibilità e scalabilità"
canonical: "https://safekit.eviden.com/it/architectures/clustering-software-load-balancing-mirroring/"
description: "Crea architetture avanzate combinando i moduli farm e mirror SafeKit. Il bilanciamento del carico di rete scala il front-end e la replica sincrona in tempo reale protegge i dati del back-end. Clustering SANless semplice per Windows e Linux, senza bisogno di competenze IT specialistiche. Scarica la tua versione di prova gratuita."
category: "architectures"
lang: "it"
topics: "Alta disponibilità e scalabilità di applicazioni web e di database critiche con il software di clustering SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png"
schemaType: "TechArticle"
---

# Software di clustering con bilanciamento del carico e mirroring: alta disponibilità e scalabilità {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Alta disponibilità e scalabilità di applicazioni web e di database critiche con il software di clustering SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Bilanciamento del carico, mirroring e failover {#load-balancing-mirroring-and-failover}


![Clustering SafeKit con bilanciamento del carico e mirroring](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Esempio con il software di clustering SafeKit {#example-with-the-safekit-clustering-software}

Ad esempio, con il software di clustering SafeKit è possibile implementare il bilanciamento del carico per IIS e la replica per Microsoft SQL Server.

Per fare ciò, distribuire un modulo <span class="notranslate farm-term" translate="no">farm</span> per IIS e un modulo mirror per Microsoft SQL Server. Ciascun modulo è configurato con il proprio indirizzo IP virtuale e i propri script di riavvio.

I due moduli possono essere distribuiti su un singolo cluster di due server, in cui sono in esecuzione sia IIS che Microsoft SQL Server. In alternativa, i due moduli possono essere distribuiti su due cluster separati con server diversi.

Con il software di clustering SafeKit, l’implementazione sugli stessi server o su server diversi funziona esattamente allo stesso modo.

### Soluzione ad alta disponibilità e scalabilità {#high-availability-and-scalability-solution}

Il software di clustering SafeKit offre una soluzione semplice di alta disponibilità e scalabilità per applicazioni web e di database critiche.

Il bilanciamento del carico di rete, il mirroring dei dati in tempo reale e il failover delle applicazioni sono gestiti in modo coerente in un unico prodotto.

A differenza del clustering hardware, il software di clustering SafeKit non richiede dischi condivisi, SAN replicate, bilanciatori di carico hardware o edizioni Enterprise di sistemi operativi o database.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}