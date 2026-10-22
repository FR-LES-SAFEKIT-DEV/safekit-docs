---
title: "Arquitecturas de alta disponibilidade e boas práticas de clustering de software"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/high-availability-architectures-and-best-practices/"
description: "Explore arquitecturas de alta disponibilidade (HA) e boas práticas para clusters de aplicações. O SafeKit implementa clusters Mirror e Farm sem discos partilhados, evita a perda de dados e proporciona failover automático para aplicações críticas."
category: "best-practises"
lang: "pt-pt"
topics: "Quais são as arquitecturas de alta disponibilidade e as boas práticas?, Tabelas comparativas de arquitecturas de alta disponibilidade e boas práticas, Centro de navegação de alta disponibilidade SafeKit"
---

# Arquitecturas de alta disponibilidade e boas práticas de clustering de software {#high-availability-architectures--software-clustering-best-practices}

## Quais são as arquitecturas de alta disponibilidade e as boas práticas? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Visão geral {#overview}

Este artigo apresenta várias arquitecturas de alta disponibilidade e boas práticas, comparando as vantagens e desvantagens de cada uma.

![Arquitecturas de alta disponibilidade e boas práticas](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")

As tabelas comparativas seguintes detalham a arquitectura de alta disponibilidade SafeKit e as respectivas boas práticas. O SafeKit é um produto de software para alta disponibilidade.

### Quais são as arquitecturas de alta disponibilidade? {#what-are-the-high-availability-architectures}

Existem dois tipos de [arquitecturas de alta disponibilidade](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>): as destinadas a aplicações de back-end, como bases de dados, e as destinadas a aplicações de front-end, como serviços Web.

As arquitecturas de back-end baseiam-se em dois servidores que partilham ou replicam dados e efectuam failover automático da aplicação em caso de falhas de hardware ou software.

As arquitecturas de front-end baseiam-se numa farm de dois ou mais servidores. O balanceamento de carga, por hardware ou software, distribui as sessões TCP pelos servidores disponíveis.

É também necessário escolher entre alta disponibilidade ao nível da aplicação e ao nível da máquina virtual.

### Quais são as boas práticas? {#what-are-the-best-practices}

Este artigo analisa as boas práticas das arquitecturas de alta disponibilidade comparando:

  * [clustering de software e hardware](</pt-pt/best-practises/clustering-software-vs-hardware-clustering/>),
  * [arquitectura sem partilha e com disco partilhado](</pt-pt/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [alta disponibilidade da aplicação e da máquina virtual](</pt-pt/best-practises/vm-ha-vs-application-ha/>),
  * [alta disponibilidade e tolerância a falhas](</pt-pt/best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [replicação síncrona e assíncrona](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [replicação de ficheiros e discos](</pt-pt/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [técnicas de replicação de dados](</pt-pt/best-practises/data-replication-techniques/>),
  * [RPO e RTO com exemplos](</pt-pt/best-practises/what-is-rpo-and-rto-with-examples/>),
  * [split-brain e quorum](</pt-pt/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [endereços IP virtuais](</pt-pt/best-practises/how-a-virtual-ip-address-works/>).

## Tabelas comparativas de arquitecturas de alta disponibilidade e boas práticas {#comparative-tables-on-high-availability-architectures-and-best-practices}

{{% insert-safekit-software-vs-hardware-table-pt-pt %}}

{{% insert-safekit-hub-pt-pt %}}

{{% insert-safekit-4-buttons-pt-pt %}}