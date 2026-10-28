---
title: "Alta disponibilità MySQL con SafeKit : installare il modulo mysql.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "Distribuisci il modulo mysql.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di MySQL su Windows e Linux . Questa guida illustra la configurazione di un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per MySQL , Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / MySQL , Installazione della soluzione SafeKit / MySQL su Windows e Linux ( mysql.safe ), Configurazione passo passo della soluzione server SafeKit / MySQL , Dimostrazione della soluzione SafeKit mirror , 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Alta disponibilità MySQL con SafeKit : installare il modulo mysql.safe per il failover {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="MySQL" mod="mysql"  %}}
 

## Panoramica della soluzione SafeKit / MySQL {#overview-of-the-safekit--mysql-solution}

La soluzione è descritta qui: ** 💡 [ La più semplice MySQL Alta disponibilità: replica sincrona a 2 nodi e failover ](</it/solutions/mysql-high-availability-synchronous-replication-failover/>) ** .

## Installazione della soluzione SafeKit / MySQL su Windows e Linux ( mysql.safe ) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### Prerequisiti {#prerequisites}

  * È necessario installare MySQL su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-it app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="MySQL" mod="mysql"  %}}
 

## Configurazione passo passo della soluzione server SafeKit / MySQL {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-it app="MySQL" mod="mysql"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}