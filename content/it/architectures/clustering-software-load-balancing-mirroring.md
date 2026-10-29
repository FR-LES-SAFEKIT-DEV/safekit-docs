---
title: "Software di clustering per farm e mirror: alta disponibilità e bilanciamento del carico"
canonical: "https://safekit.eviden.com/it/architectures/clustering-software-load-balancing-mirroring/"
description: "Implementa architetture avanzate combinando i moduli SafeKit Farm e Mirror . Unisci il bilanciamento del carico di rete per la scalabilità front-end con la replica sincrona in tempo reale per la protezione dei dati back-end. Clustering semplice e senza SAN per Windows e Linux senza necessità di competenze IT specializzate. Scarica la tua versione di prova gratuita."
category: "architectures"
lang: "it"
topics: "Elevata disponibilità e scalabilità delle applicazioni web e di database critiche con il software di clustering SafeKit , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Software di clustering per farm e mirror: alta disponibilità e bilanciamento del carico {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Elevata disponibilità e scalabilità di applicazioni web e database critiche con il software di clustering SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Bilanciamento del carico, mirroring e failover {#load-balancing-mirroring-and-failover}


![ SafeKit clustering con bilanciamento del carico e mirroring ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Esempio con il software di clustering SafeKit {#example-with-the-safekit-clustering-software}

Ad esempio, con il software di clustering SafeKit , è possibile implementare il bilanciamento del carico IIS e il mirroring Microsoft SQL Server .

A tale scopo, è necessario distribuire un modulo <span class="notranslate farm-term" translate="no">farm</span> per IIS e un modulo mirror per il server SQL Microsoft . Ciascun modulo <span class="notranslate farm-term" translate="no">farm</span> e mirror è configurato con il proprio indirizzo IP virtuale e i propri script di riavvio.

Entrambi i moduli mirror e <span class="notranslate farm-term" translate="no">farm</span> possono essere distribuiti su un singolo cluster di due server. IIS , Microsoft e SQL Server verranno eseguiti su questi due server. In alternativa, i due moduli possono essere distribuiti su due cluster con server diversi.

Con il software di clustering SafeKit , non c'è alcuna differenza tra un'implementazione sugli stessi server o su server diversi.

### Soluzione ad alta disponibilità e scalabilità {#high-availability-and-scalability-solution}

Il software di clustering SafeKit offre una soluzione semplice, altamente disponibile e scalabile per applicazioni web e database critiche.

Di conseguenza, il bilanciamento del carico di rete, la replica dei dati in tempo reale e il failover delle applicazioni vengono gestiti in modo coerente all'interno di un unico prodotto.

Quando si confronta il software di clustering SafeKit con il clustering hardware, non sono necessari dischi condivisi, SAN replicate, bilanciatori di carico, edizioni Enterprise del sistema operativo o database.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}