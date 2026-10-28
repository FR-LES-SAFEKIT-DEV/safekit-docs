---
title: "Alta disponibilità MariaDB con SafeKit : installare il modulo mysql.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Distribuisci il modulo mysql.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di MariaDB su Windows e Linux . Questa guida illustra la configurazione di un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per MariaDB , Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / MariaDB , Installazione della soluzione SafeKit / MariaDB su Windows e Linux ( mysql.safe ), Configurazione passo passo della soluzione SafeKit / MariaDB , Dimostrazione della soluzione SafeKit mirror , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Alta disponibilità MariaDB con SafeKit : installare il modulo mysql.safe per il failover {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="MariaDB" mod="mysql"  %}}
 

## Panoramica della soluzione SafeKit / MariaDB {#overview-of-the-safekit--mariadb-solution}

La soluzione è descritta qui: ** 💡 [ La più semplice MariaDB Alta disponibilità: replica sincrona a 2 nodi e failover ](</it/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>) ** .

## Installazione della soluzione SafeKit / MariaDB su Windows e Linux ( mysql.safe ) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Prerequisiti {#prerequisites}

  * È necessario installare MariaDB su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-it app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="MariaDB" mod="mysql"  %}}
 

## Configurazione passo passo della soluzione SafeKit / MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-it app="MariaDB" mod="mysql"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}