---
title: "Alta disponibilità MySQL con SafeKit: installare il modulo mysql.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "Implementare il modulo mysql.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di MySQL su Windows e Linux. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione per l’alta disponibilità di MySQL, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/MySQL, Installazione della soluzione SafeKit/MySQL su Windows e Linux (mysql.safe), Configurazione passo-passo della soluzione SafeKit/MySQL Server, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità MySQL con SafeKit: installare il modulo mysql.safe per il failover {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="MySQL" mod="mysql"  %}}
 

## Panoramica della soluzione SafeKit/MySQL {#overview-of-the-safekit--mysql-solution}

La soluzione è descritta qui: **💡 [La più semplice alta disponibilità MySQL: replica sincrona a 2 nodi e failover](</it/solutions/mysql-high-availability-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit/MySQL su Windows e Linux (mysql.safe) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### Prerequisiti {#prerequisites}

  * È necessario che MySQL sia installato su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-it app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="MySQL" mod="mysql"  %}}
 

## Configurazione passo-passo della soluzione SafeKit/MySQL Server {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-it app="MySQL" mod="mysql"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}