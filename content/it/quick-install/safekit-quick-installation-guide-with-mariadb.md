---
title: "Alta disponibilità MariaDB con SafeKit: installazione del modulo mysql.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Implementare il modulo mysql.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di MariaDB su Windows e Linux. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione di MariaDB ad alta disponibilità, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/MariaDB, Installazione della soluzione SafeKit/MariaDB su Windows e Linux (mysql.safe), Configurazione passo-passo della soluzione SafeKit/MariaDB, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità MariaDB con SafeKit: installazione del modulo mysql.safe per il failover {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="MariaDB" mod="mysql"  %}}
 

## Panoramica della soluzione SafeKit/MariaDB {#overview-of-the-safekit--mariadb-solution}

La soluzione è descritta qui: **💡 [L’alta disponibilità MariaDB più semplice: replica sincrona a 2 nodi e failover](</it/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Installazione della soluzione SafeKit/MariaDB su Windows e Linux (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Prerequisiti {#prerequisites}

  * È necessario che MariaDB sia installato su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-it app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="MariaDB" mod="mysql"  %}}
 

## Configurazione passo-passo della soluzione SafeKit/MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-it app="MariaDB" mod="mysql"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}