---
title: "Instalar SafeKit: alta disponibilidade de MariaDB (mysql.safe)"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Guia passo a passo: instale o módulo SafeKit mysql.safe para replicação em tempo real e failover automático do MariaDB em Windows ou Linux."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para MariaDB, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/MariaDB, Instalação da solução SafeKit/MariaDB no Windows e Linux (mysql.safe), Configuração passo a passo da solução SafeKit/MariaDB, Demonstração da solução mirror SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--mariadb-solution, installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe, step-by-step-configuration-of-the-safekit--mariadb-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Instalar SafeKit: alta disponibilidade de MariaDB (mysql.safe) {#install-safekit-for-mariadb-high-availability-mysqlsafe}


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