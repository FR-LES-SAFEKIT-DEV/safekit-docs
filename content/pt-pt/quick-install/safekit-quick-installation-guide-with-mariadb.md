---
title: "Alta disponibilidade MariaDB com SafeKit : Instale o módulo mysql.safe para failover."
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Implante o módulo mysql.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático de MariaDB em Windows e Linux . Este guia orienta você na configuração de um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para MariaDB , Limitações de Alta Disponibilidade do SafeKit , Visão Geral da solução SafeKit / MariaDB , Instalação da solução SafeKit / MariaDB em Windows e Linux ( mysql.safe ), Configuração passo a passo da solução SafeKit / MariaDB , Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade MariaDB com SafeKit : Instale o módulo mysql.safe para failover {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="MariaDB" mod="mysql"  %}}
 

## Visão geral da solução SafeKit / MariaDB {#overview-of-the-safekit--mariadb-solution}

A solução é descrita aqui: ** 💡 [ O mais simples MariaDB Alta disponibilidade: replicação síncrona de 2 nós e failover ](</pt-pt/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>) ** .

## Instalação da solução SafeKit / MariaDB em Windows e Linux ( mysql.safe ) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter MariaDB instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-pt app="MariaDB" mod="mysql"  %}}
 

## Configuração passo a passo da solução SafeKit / MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-pt-pt app="MariaDB" mod="mysql"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}