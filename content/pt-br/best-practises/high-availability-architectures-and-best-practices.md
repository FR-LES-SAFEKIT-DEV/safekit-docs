---
title: "Arquiteturas de alta disponibilidade e boas práticas de clustering de software"
canonical: "https://safekit.eviden.com/pt-br/best-practises/high-availability-architectures-and-best-practices/"
description: "Conheça arquiteturas de alta disponibilidade (HA) e boas práticas para clusters de aplicações. O SafeKit implementa clusters Mirror e Farm sem discos compartilhados, evita a perda de dados e oferece failover automático para aplicações críticas."
category: "best-practises"
lang: "pt-br"
topics: "Quais são as arquiteturas de alta disponibilidade e as boas práticas?, Tabelas comparativas de arquiteturas de alta disponibilidade e boas práticas, Central de navegação de alta disponibilidade SafeKit"
---

# Arquiteturas de alta disponibilidade e boas práticas de clustering de software {#high-availability-architectures--software-clustering-best-practices}

## Quais são as arquiteturas de alta disponibilidade e as boas práticas? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Visão geral {#overview}

Este artigo apresenta diferentes arquiteturas de alta disponibilidade e boas práticas, comparando as vantagens e desvantagens de cada uma.

![Arquiteturas de alta disponibilidade e boas práticas](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")

As tabelas comparativas a seguir detalham a arquitetura de alta disponibilidade do SafeKit e suas boas práticas. O SafeKit é um produto de software para alta disponibilidade.

### Quais são as arquiteturas de alta disponibilidade? {#what-are-the-high-availability-architectures}

Há dois tipos de [arquiteturas de alta disponibilidade](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>): as voltadas a aplicações de back-end, como bancos de dados, e as voltadas a aplicações de front-end, como serviços web.

As arquiteturas de back-end se baseiam em dois servidores que compartilham ou replicam dados e fazem o failover automático da aplicação em caso de falhas de hardware ou software.

As arquiteturas de front-end usam uma farm de dois ou mais servidores. O balanceamento de carga, por hardware ou software, distribui as sessões TCP entre os servidores disponíveis.

Também é necessário escolher entre alta disponibilidade no nível da aplicação ou da máquina virtual.

### Quais são as boas práticas? {#what-are-the-best-practices}

Este artigo analisa boas práticas de arquiteturas de alta disponibilidade comparando:

  * [clustering de software e hardware](</pt-br/best-practises/clustering-software-vs-hardware-clustering/>),
  * [arquitetura sem compartilhamento e com disco compartilhado](</pt-br/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [alta disponibilidade de aplicação e de máquina virtual](</pt-br/best-practises/vm-ha-vs-application-ha/>),
  * [alta disponibilidade e tolerância a falhas](</pt-br/best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [replicação síncrona e assíncrona](</pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [replicação de arquivos e discos](</pt-br/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [técnicas de replicação de dados](</pt-br/best-practises/data-replication-techniques/>),
  * [RPO e RTO com exemplos](</pt-br/best-practises/what-is-rpo-and-rto-with-examples/>),
  * [split-brain e quorum](</pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [endereços IP virtuais](</pt-br/best-practises/how-a-virtual-ip-address-works/>).

## Tabelas comparativas de arquiteturas de alta disponibilidade e boas práticas {#comparative-tables-on-high-availability-architectures-and-best-practices}

{{% insert-safekit-software-vs-hardware-table-pt-br %}}

{{% insert-safekit-hub-pt-br %}}

{{% insert-safekit-4-buttons-pt-br %}}