---
title: "Alternativa a SQL Server Always On: HA per le edizioni Express e Standard"
canonical: "https://safekit.eviden.com/it/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "Cerchi un'alternativa conveniente a SQL Server Always On? SafeKit propone un'architettura SANless che offre alta disponibilità alle edizioni Express e Standard SQL Server . Approfitta della replica sincrona, dell'IP virtuale e del failover automatico senza bisogno di SAN o Active Directory."
category: "best-practises"
lang: "it"
topics: "Alternativa ad Always On SQL Server per le edizioni express e standard, Come funziona il cluster SafeKit mirror con Microsoft SQL Server ?, Guida video: Configurazione di un cluster HA SafeKit mirror per SQL Server , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Alternativa a SQL Server Always On: HA per le edizioni Express e Standard {#alternative-to-sql-server-always-on-ha-for-express-and-standard-editions}

## Alternativa ad Always On SQL Server per le edizioni express e standard {#alternative-to-always-on-sql-server-for-express-and-standard-editions}

### La soluzione per Microsoft SQL Server {#the-solution-for-microsoft-sql-server}

SafeKit offre alta disponibilità a Microsoft SQL Server tra due nodi ridondanti con replica sincrona dei dati in tempo reale e failover automatico.

La soluzione è indipendente dall'edizione Microsoft SQL Server e funziona con le edizioni express e standard.

### Un prodotto generico {#a-generic-product}

SafeKit è un prodotto generico. Consente di replicare non solo i dati e i log di SQL Server, ma anche altri elementi. Se la tua applicazione si basa su SQL Server e contiene cartelle specifiche con la configurazione o altri file, puoi replicarli allo stesso modo. Inoltre, oltre ai servizi di SQL Server, puoi riavviare anche i tuoi servizi.

Guida all'installazione di [ SafeKit con le edizioni express e standard di Microsoft SQL Server ](</it/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)

### Senza cluster di failover Microsoft {#without-microsoft-failover-cluster}

SafeKit funziona senza il cluster di failover Microsoft proprio come con Always On SQL Server . Si tratta di un'offerta completa che include indirizzo IP virtuale, replica sincrona in tempo reale delle cartelle, failover e failback automatici e molto altro ancora... SafeKit elimina la necessità di dischi condivisi e di edizioni enterprise del database. 

### Senza controller di dominio e Active Directory {#without-domain-controller-and-active-directory}

SafeKit funziona senza configurare il controller di dominio e Active Directory, a differenza di Always On SQL Server . Questa soluzione facile da implementare ed economicamente vantaggiosa non richiede competenze specifiche.

### Senza 3 nodi per il quorum {#without-3-nodes-for-quorum}

SafeKit funziona senza la necessità di 3 nodi per il quorum, a differenza di Always On SQL Server . In caso di isolamento di rete, SafeKit implementa un controllo split-brain con un ping a un router che funge da witness. Inoltre, è possibile configurare facilmente più heartbeat nel prodotto.

### Altre soluzioni di ridondanza e alta disponibilità {#other-redundancy-and-high-availability-solutions}

Con SafeKit , è possibile implementare su Windows e Linux la replica e il failover in tempo reale di qualsiasi cartella e servizio, database, macchine virtuali Hyper-V o KVM complete, Docker , Kubernetes , applicazioni cloud.

### Una soluzione completa {#a-complete-solution}

SafeKit risolve: 

  * guasti hardware (20% dei problemi), incluso il guasto completo di una sala computer, 
  * guasti del software (40% dei problemi), incluso il riavvio dei processi critici, 
  * e agli errori umani (40% dei problemi) grazie alla sua facilità d'uso e alla sua console web.



{{%  insert-safekit-mirror-it app="Microsoft SQL Server"  %}}
 

## Video guida: Configurazione di un cluster HA SafeKit mirror per SQL Server {#videoguide-safekit-mirror-cluster}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}