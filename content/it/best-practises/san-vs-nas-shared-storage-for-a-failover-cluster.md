---
title: "SAN e NAS per l’archiviazione condivisa per il clustering di failover: un confronto dettagliato"
canonical: "https://safekit.eviden.com/it/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Storage condiviso SAN o NAS per i cluster di failover: limiti, costi e rischi, e perché la replica SafeKit elimina la necessità di storage condiviso."
category: "best-practises"
lang: "it"
topics: "SAN o NAS: quale soluzione di archiviazione condivisa è più semplice per un cluster di failover?, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# SAN e NAS per l’archiviazione condivisa per il clustering di failover: un confronto dettagliato {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## SAN o NAS: quale soluzione di archiviazione condivisa è più semplice per un cluster di failover? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  Archiviazione condivisa SAN o archiviazione condivisa NAS iSCSI per un cluster di failover {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![Archiviazione condivisa SAN o archiviazione condivisa NAS iSCSI per un cluster di failover](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Diversi elementi rendono questa architettura complessa da implementare:

  * In caso di failover, il passaggio all’unità di archiviazione condivisa richiede comandi di basso livello, che dipendono dal produttore dell’unità di archiviazione.
  * Prima del riavvio dell’applicazione, è necessario eseguire una procedura di ripristino del file system.
  * Se i file system su entrambi i nodi accedono contemporaneamente allo stesso disco fisico, l’intero file system viene danneggiato.
  * Per evitare questo doppio accesso, è necessario configurare un disco di quorum.


###  Archiviazione condivisa NAS SMB o archiviazione condivisa NAS NFS per un cluster di failover {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![Archiviazione condivisa NAS SMB o archiviazione condivisa NAS NFS per un cluster di failover](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Diversi elementi rendono questa architettura semplice da implementare:

  * In caso di failover, la commutazione dell’archiviazione condivisa richiede solo il rimontaggio del file system esterno.
  * Non è richiesta alcuna procedura di ripristino del file system prima del riavvio dell’applicazione.
  * Se entrambi i nodi accedono contemporaneamente allo stesso file system condiviso, il file system non viene danneggiato.
  * Tuttavia, quando i nodi sono isolati, la stessa applicazione può comunque essere eseguita su entrambi i nodi. Questa doppia esecuzione può corrompere i dati dell’applicazione nell’archiviazione condivisa.


###  Replica e failover in tempo reale con Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![Replica e failover in tempo reale con SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit non presenta questi problemi. Con SafeKit, la replica e il failover non richiedono uno storage condiviso.

Tuttavia, se SafeKit deve gestire l’archiviazione condivisa:

  * Utilizzare l’archiviazione condivisa NAS SMB o NAS NFS.
  * Inserire i comandi mount e umount per il file system esterno negli script di riavvio.
  * Configurare il [checker split-brain](</it/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) SafeKit. Impedisce la doppia esecuzione della stessa applicazione sull’archiviazione condivisa quando i nodi sono isolati.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}