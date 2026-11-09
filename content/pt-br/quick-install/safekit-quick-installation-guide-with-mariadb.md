---
title: "Alta Disponibilidade MariaDB com SafeKit: Instale o Módulo mysql.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Implemente o módulo mysql.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático do MariaDB no Windows e Linux. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para MariaDB, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/MariaDB, Instalação da solução SafeKit/MariaDB no Windows e Linux (mysql.safe), Configuração passo a passo da solução SafeKit/MariaDB, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade MariaDB com SafeKit: Instale o Módulo mysql.safe para Failover {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="MariaDB" mod="mysql"  %}}
 

## Visão geral da solução SafeKit/MariaDB {#overview-of-the-safekit--mariadb-solution}

A solução é descrita aqui: **💡 [A mais simples alta disponibilidade MariaDB: replicação síncrona e failover de 2 nós](</pt-br/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Instalação da solução SafeKit/MariaDB no Windows e Linux (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter MariaDB instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-br app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-br app="MariaDB" mod="mysql"  %}}
 

## Configuração passo a passo da solução SafeKit/MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-pt-br app="MariaDB" mod="mysql"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}