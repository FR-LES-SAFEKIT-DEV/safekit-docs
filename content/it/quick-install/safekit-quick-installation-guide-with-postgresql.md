---
title: "Alta disponibilità PostgreSQL con SafeKit: installare il modulo postgresql.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Implementare il modulo postgresql.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di PostgreSQL su Windows e Linux. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per PostgreSQL, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/PostgreSQL, Installazione della soluzione SafeKit/PostgreSQL su Windows e Linux (postgresql.safe), Configurazione passo-passo della soluzione SafeKit/PostgreSQL, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità PostgreSQL con SafeKit: installare il modulo postgresql.safe per il failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Panoramica della soluzione SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

La soluzione è descritta qui: **💡 [L’alta disponibilità PostgreSQL più semplice: replica sincrona a 2 nodi e failover](</it/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit/PostgreSQL su Windows e Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Prerequisiti {#prerequisites}

  * È necessario che PostgreSQL sia installato su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-it app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="PostgreSQL" mod="postgresql"  %}}
 

## Configurazione passo-passo della soluzione SafeKit/PostgreSQL {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-it app="PostgreSQL" mod="postgresql"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}