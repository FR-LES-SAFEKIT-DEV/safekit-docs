---
title: "Arquiteturas de Alta Disponibilidade e Melhores Práticas de Clustering de Software"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/high-availability-architectures-and-best-practices/"
description: "Explore arquiteturas de alta disponibilidade (HA) e as melhores práticas para clustering de aplicações. Saiba como o software SafeKit implementa clusters mirror e farm sem discos compartilhados, proporcionando zero perda de dados e failover automático para aplicações críticas."
category: "best-practises"
lang: "pt-pt"
topics: "Quais são as arquiteturas de alta disponibilidade e as melhores práticas?, Tabelas comparativas sobre arquiteturas de alta disponibilidade e melhores práticas, 🔍 SafeKit Hub de Navegação de Alta Disponibilidade"
---

# Arquiteturas de Alta Disponibilidade e Melhores Práticas de Clustering de Software {#high-availability-architectures--software-clustering-best-practices}

## Quais são as arquiteturas de alta disponibilidade e as melhores práticas? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Visão geral {#overview}

Este artigo explora as diferentes arquiteturas de alta disponibilidade e as melhores práticas, apresentando os prós e os contras de cada arquitetura.


![ Arquiteturas de alta disponibilidade e melhores práticas ](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


As tabelas comparativas a seguir explicam detalhadamente a arquitetura de alta disponibilidade do SafeKit e suas melhores práticas ( SafeKit é um produto de software de alta disponibilidade).

### Quais são as arquiteturas de alta disponibilidade? {#what-are-the-high-availability-architectures}

Existem dois tipos de arquiteturas de alta disponibilidade [ ](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>) : aquelas para aplicações de back-end, como bancos de dados, e aquelas para aplicações de front-end, como serviços web.

As arquiteturas de alta disponibilidade para backend são baseadas em 2 servidores que compartilham ou replicam dados com failover automático do aplicativo em caso de falhas de hardware ou software.

As arquiteturas de alta disponibilidade para front-end são baseadas em um <span class="notranslate farm-term" translate="no">farm</span> de servidores (2 ou mais). O balanceamento de carga é feito por hardware ou software e distribui as sessões TCP para os servidores disponíveis no farm de servidores.

Além disso, você precisa escolher entre alta disponibilidade no nível do aplicativo ou no nível da máquina virtual.

### Quais são as melhores práticas? {#what-are-the-best-practices}

Este artigo explora as melhores práticas em arquiteturas de alta disponibilidade, comparando:

  * Clustering de software versus hardware [ ](</pt-pt/best-practises/clustering-software-vs-hardware-clustering/>) ,
  * [ arquitetura de disco não compartilhado versus arquitetura de disco compartilhado ](</pt-pt/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>) ,
  * Aplicação [ versus alta disponibilidade de máquina virtual ](</pt-pt/best-practises/vm-ha-vs-application-ha/>) ,
  * [ alta disponibilidade versus tolerância a falhas ](</pt-pt/best-practises/high-availability-cluster-vs-fault-tolerant-system/>) ,
  * [ replicação síncrona vs assíncrona ](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>) ,
  * Replicação de arquivo vs. disco [ ](</pt-pt/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) ,
  * Técnicas de replicação de dados [ ](</pt-pt/best-practises/data-replication-techniques/>) ,
  * [ RPO e RTO com exemplos ](</pt-pt/best-practises/what-is-rpo-and-rto-with-examples/>) ,
  * [ cérebro dividido e quórum ](</pt-pt/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) ,
  * Endereços IP virtuais [ ](</pt-pt/best-practises/how-a-virtual-ip-address-works/>) .


## Tabelas comparativas sobre arquiteturas de alta disponibilidade e melhores práticas {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}