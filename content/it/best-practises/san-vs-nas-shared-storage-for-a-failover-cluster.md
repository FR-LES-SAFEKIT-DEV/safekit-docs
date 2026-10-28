---
title: "SAN vs. NAS: storage condiviso per cluster di failover, un confronto dettagliato"
canonical: "https://safekit.eviden.com/it/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Confronta le soluzioni di storage condiviso SAN e NAS per cluster di failover. Scopri perché SafeKit propone un'architettura senza SAN che elimina le dipendenze dallo storage condiviso, semplifica gli script di failover e previene il danneggiamento dei dati senza la necessità di hardware costoso o di complessi dischi di quorum."
category: "best-practises"
lang: "it"
topics: "Qual è la soluzione più semplice tra una SAN e un NAS per lo storage condiviso di un cluster di failover?, 🔍 SafeKit Hub di navigazione ad alta disponibilità"
---

# SAN vs. NAS: archiviazione condivisa per cluster di failover: un confronto dettagliato {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## Qual è la soluzione più semplice tra una soluzione di storage condiviso SAN e una NAS per un cluster di failover? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  Archiviazione condivisa SAN o archiviazione condivisa NAS iSCSI per un cluster di failover {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![ Archiviazione condivisa SAN o archiviazione condivisa NAS iSCSI per un cluster di failover ](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Diversi elementi rendono complessa l'implementazione di questa architettura:

  * in caso di failover, il passaggio alla memoria condivisa richiede istruzioni di basso livello che dipendono dal produttore della memoria,
  * La procedura di ripristino sul file system (FS) deve essere completata prima di riavviare l'applicazione.
  * se entrambi i file system su entrambi i nodi accedono allo stesso disco raw contemporaneamente, l'intero file system verrà danneggiato,
  * Per evitare un doppio accesso, è necessario configurare un disco di quorum.


###  Archiviazione condivisa NAS SMB o archiviazione condivisa NAS NFS per cluster di failover {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![ Archiviazione condivisa NAS SMB o archiviazione condivisa NAS NFS per un cluster di failover ](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Diversi elementi rendono questa architettura semplice da implementare: 
  * in caso di failover, il passaggio alla memoria condivisa significa solo rimontare il file system esterno,
  * Non è necessario eseguire alcuna procedura di ripristino sul file system prima di riavviare l'applicazione.
  * se entrambi i nodi accedono allo stesso file system condiviso nello stesso momento, l'intero file system non verrà danneggiato,
  * Tuttavia, sussiste ancora la possibilità che una doppia esecuzione della stessa applicazione corrompa i dati nella memoria condivisa quando i nodi sono isolati.


###  Replica e failover in tempo reale con Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![ Replica e failover in tempo reale con SafeKit ](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit non presenta tali problemi perché la sua soluzione di replica e failover non richiede uno storage condiviso.

Tuttavia, se SafeKit deve gestire una memoria condivisa:

  * utilizzare una memoria condivisa NAS SMB o una memoria condivisa NAS NFS,
  * inserire negli script di riavvio il montaggio/smontaggio del file system esterno,
  * Configurare il controllo split brain [ SafeKit ](</it/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) per evitare una doppia esecuzione della stessa applicazione che accede alla memoria condivisa quando i nodi sono isolati.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}