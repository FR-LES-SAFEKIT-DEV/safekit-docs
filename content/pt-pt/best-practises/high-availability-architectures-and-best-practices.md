---
title: "Alta disponibilidade: arquiteturas e boas práticas"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/high-availability-architectures-and-best-practices/"
description: "Arquiteturas e boas práticas de alta disponibilidade para clustering de aplicações: clusters mirror e farm, replicação e failover, com exemplos SafeKit."
category: "best-practises"
lang: "pt-pt"
topics: "Quais são as arquiteturas de alta disponibilidade e as melhores práticas?, Tabelas comparativas sobre arquiteturas de alta disponibilidade e melhores práticas"
hashpart: "what-are-the-high-availability-architectures-and-the-best-practices, comparative-tables-on-high-availability-architectures-and-best-practices"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.23 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png"
schemaType: "TechArticle"
---

# Alta disponibilidade: arquiteturas e boas práticas {#high-availability-architectures-and-best-practices}

## Quais são as arquiteturas de alta disponibilidade e as melhores práticas? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Visão Geral {#overview}

Este artigo explora as diferentes arquiteturas de alta disponibilidade e as melhores práticas, apresentando os prós e os contras de cada arquitetura.


![Arquiteturas de alta disponibilidade e melhores práticas](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


As tabelas comparativas seguintes explicam em detalhe a arquitetura e as melhores práticas do SafeKit, um software de alta disponibilidade.

### Quais são as arquiteturas de alta disponibilidade? {#what-are-the-high-availability-architectures}

Existem dois tipos de arquiteturas [de alta disponibilidade](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>): as para aplicações de backend, como bases de dados, e as para aplicações de frontend, como serviços web.

As arquiteturas de alta disponibilidade para o backend baseiam-se em 2 servidores. Os servidores partilham ou replicam dados. Em caso de falha de hardware ou software, um failover automático reinicia a aplicação no outro servidor.

As arquiteturas de alta disponibilidade para o frontend baseiam-se num <span class="notranslate farm-term" translate="no">farm</span> de servidores (2 ou mais servidores). O balanceamento de carga é feito por hardware ou software e distribui as sessões TCP pelos servidores disponíveis no farm.

Além disso, é preciso escolher entre alta disponibilidade ao nível da aplicação ou ao nível da máquina virtual.

### Quais são as melhores práticas? {#what-are-the-best-practices}

Este artigo explora as melhores práticas em arquiteturas de alta disponibilidade, comparando:

  * [Clustering de software vs. clustering de hardware](</pt-pt/best-practises/clustering-software-vs-hardware-clustering/>)
  * [Arquitetura sem partilha vs. arquitetura de disco partilhado](</pt-pt/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>)
  * [Alta disponibilidade de aplicações vs. máquinas virtuais](</pt-pt/best-practises/vm-ha-vs-application-ha/>)
  * [Alta disponibilidade vs. tolerância a falhas](</pt-pt/best-practises/high-availability-cluster-vs-fault-tolerant-system/>)
  * [Replicação síncrona vs. assíncrona](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>)
  * [Replicação de ficheiros vs. replicação de disco](</pt-pt/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)
  * [Técnicas de replicação de dados](</pt-pt/best-practises/data-replication-techniques/>)
  * [RPO e RTO com exemplos](</pt-pt/best-practises/what-is-rpo-and-rto-with-examples/>)
  * [Split brain e quórum](</pt-pt/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)
  * [Endereços IP virtuais](</pt-pt/best-practises/how-a-virtual-ip-address-works/>)


## Tabelas comparativas sobre arquiteturas de alta disponibilidade e melhores práticas {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}