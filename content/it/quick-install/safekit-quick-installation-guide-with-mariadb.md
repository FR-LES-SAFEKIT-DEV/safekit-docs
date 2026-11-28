---
title: "Installa SafeKit per l’alta disponibilità di MariaDB"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Guida passo passo: installa il modulo SafeKit mysql.safe per la replica in tempo reale e il failover automatico di MariaDB su Windows o Linux."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per MariaDB, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/MariaDB, Installazione della soluzione SafeKit/MariaDB su Windows e Linux (mysql.safe), Configurazione passo-passo della soluzione SafeKit/MariaDB, Dimostrazione della soluzione mirror SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--mariadb-solution, installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe, step-by-step-configuration-of-the-safekit--mariadb-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Installa SafeKit per l’alta disponibilità di MariaDB {#install-safekit-for-mariadb-high-availability}


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