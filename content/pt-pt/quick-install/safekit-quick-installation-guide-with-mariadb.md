---
title: "Alta Disponibilidade MariaDB com SafeKit: Instale o Módulo mysql.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Implemente o módulo mysql.safe para SafeKit para ativar a replicação síncrona em tempo real e o failover automático do MariaDB no Windows e Linux. Este guia explica como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para MariaDB, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/MariaDB, Instalação da solução SafeKit/MariaDB no Windows e Linux (mysql.safe), Configuração passo a passo da solução SafeKit/MariaDB, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade MariaDB com SafeKit: Instale o Módulo mysql.safe para Failover {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="MariaDB" mod="mysql"  %}}
 

## Visão geral da solução SafeKit/MariaDB {#overview-of-the-safekit--mariadb-solution}

A solução é descrita aqui: **💡 [A Mais Simples Alta Disponibilidade MariaDB: Replicação Síncrona e Failover de 2 Nós](</pt-pt/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Instalação da solução SafeKit/MariaDB no Windows e Linux (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter MariaDB instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-pt app="MariaDB" mod="mysql"  %}}
 

## Configuração passo a passo da solução SafeKit/MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-pt-pt app="MariaDB" mod="mysql"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}