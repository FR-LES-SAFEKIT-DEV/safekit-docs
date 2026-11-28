---
title: "Arquiteturas e boas práticas de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-br/best-practises/high-availability-architectures-and-best-practices/"
description: "Arquiteturas e boas práticas de alta disponibilidade para clustering de aplicações: clusters mirror e farm, replicação e failover, com exemplos do SafeKit."
category: "best-practises"
lang: "pt-br"
topics: "Quais são as arquiteturas de alta disponibilidade e as melhores práticas?, Tabelas comparativas sobre arquiteturas de alta disponibilidade e melhores práticas"
hashpart: "what-are-the-high-availability-architectures-and-the-best-practices, comparative-tables-on-high-availability-architectures-and-best-practices"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.23 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png"
schemaType: "TechArticle"
---

# Arquiteturas e boas práticas de alta disponibilidade {#high-availability-architectures-and-best-practices}

## Quais são as arquiteturas de alta disponibilidade e as melhores práticas? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Visão geral {#overview}

Este artigo explora as diferentes arquiteturas de alta disponibilidade e as melhores práticas, apresentando os prós e contras de cada uma.


![Arquiteturas de alta disponibilidade e melhores práticas](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


As tabelas comparativas a seguir explicam em detalhes a arquitetura e as melhores práticas do SafeKit, um software de alta disponibilidade.

### O que são as arquiteturas de alta disponibilidade? {#what-are-the-high-availability-architectures}

Existem dois tipos de arquiteturas [de alta disponibilidade](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>): as para aplicações de backend, como bancos de dados, e as para aplicações de frontend, como serviços web.

As arquiteturas de alta disponibilidade para o backend são baseadas em 2 servidores. Os servidores compartilham ou replicam dados. Em caso de falha de hardware ou software, um failover automático reinicia o aplicativo no outro servidor.

As arquiteturas de alta disponibilidade para o frontend são baseadas em um <span class="notranslate farm-term" translate="no">farm</span> de servidores (2 servidores ou mais). O balanceamento de carga é feito por hardware ou software e distribui as sessões TCP para os servidores disponíveis no farm.

Além disso, você precisa escolher entre alta disponibilidade no nível do aplicativo ou no nível da máquina virtual.

### Quais são as melhores práticas? {#what-are-the-best-practices}

Este artigo explora as melhores práticas em arquiteturas de alta disponibilidade, comparando:

  * [Clustering de software vs. clustering de hardware](</pt-br/best-practises/clustering-software-vs-hardware-clustering/>)
  * [Arquitetura sem compartilhamento vs. arquitetura de disco compartilhado](</pt-br/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>)
  * [Alta disponibilidade de aplicações vs. máquinas virtuais](</pt-br/best-practises/vm-ha-vs-application-ha/>)
  * [Alta disponibilidade vs. tolerância a falhas](</pt-br/best-practises/high-availability-cluster-vs-fault-tolerant-system/>)
  * [Replicação síncrona vs. assíncrona](</pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/>)
  * [Replicação de arquivos vs. replicação de disco](</pt-br/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)
  * [Técnicas de replicação de dados](</pt-br/best-practises/data-replication-techniques/>)
  * [RPO e RTO com exemplos](</pt-br/best-practises/what-is-rpo-and-rto-with-examples/>)
  * [Split brain e quórum](</pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)
  * [Endereços IP virtuais](</pt-br/best-practises/how-a-virtual-ip-address-works/>)


## Tabelas comparativas sobre arquiteturas de alta disponibilidade e melhores práticas {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}