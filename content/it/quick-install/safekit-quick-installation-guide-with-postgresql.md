---
title: "Disponibilità elevata PostgreSQL con SafeKit: installa il modulo postgresql.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Distribuisci il modulo postgresql.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di PostgreSQL su Windows e Linux. Questa guida ti guida attraverso la configurazione di un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida all'installazione rapida ad alta disponibilità per PostgreSQL, Limitazioni dell'alta disponibilità di SafeKit, Panoramica della soluzione SafeKit/PostgreSQL, Installazione della soluzione SafeKit/PostgreSQL su Windows e Linux (postgresql.safe), Configurazione passo passo della soluzione SafeKit/PostgreSQL, Dimostrazione della soluzione mirror SafeKit, 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# PostgreSQL ad alta disponibilità con SafeKit: installa il modulo postgresql.safe per il failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Panoramica della soluzione SafeKit / PostgreSQL {#overview-of-the-safekit--postgresql-solution}

La soluzione è descritta qui: **💡[La più semplice disponibilità elevata PostgreSQL: replica sincrona a 2 nodi e failover](</it/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit / PostgreSQL su Windows e Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Prerequisiti {#prerequisites}

  * È necessario che PostgreSQL sia installato su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-it app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="PostgreSQL" mod="postgresql"  %}}
 

## Configurazione passo passo della soluzione SafeKit / PostgreSQL {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-it app="PostgreSQL" mod="postgresql"  %}}
 

## Dimostrazione della soluzione specchio SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}