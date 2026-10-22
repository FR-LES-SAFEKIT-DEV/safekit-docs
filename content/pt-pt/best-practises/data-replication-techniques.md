---
title: "Técnicas de replicação de dados para alta disponibilidade: uma comparação completa"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/data-replication-techniques/"
description: "Compare técnicas de replicação de dados ao nível da base de dados, do disco e do ficheiro. Saiba por que razão o SafeKit propõe uma arquitectura sem SAN para uma replicação síncrona simples e em tempo real, que evita a perda de dados e permite failover automático em Windows e Linux."
category: "best-practises"
lang: "pt-pt"
topics: "Técnicas de replicação de dados ao nível da base de dados, do disco ou do ficheiro, Tabelas comparativas das técnicas de replicação de dados, Centro de navegação de alta disponibilidade SafeKit"
---

# Técnicas de replicação de dados para alta disponibilidade: uma comparação completa {#data-replication-techniques-for-high-availability-a-complete-comparison}

## Técnicas de replicação de dados ao nível da base de dados, do disco ou do ficheiro? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Visão geral {#overview}

Este artigo analisa as vantagens e desvantagens das técnicas de replicação de dados ao nível da base de dados, do disco e do ficheiro para clusters de alta disponibilidade. São considerados o failover, o failback e a simplicidade de implementação.

![Técnicas de replicação de dados](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

As tabelas comparativas seguintes explicam detalhadamente as técnicas de replicação de dados implementadas pelo SafeKit, um produto de software de alta disponibilidade.

### O que é a técnica de replicação de dados ao nível da base de dados? {#what-is-the-data-replication-technique-at-database-level}

É a replicação de ficheiros de registo entre dois servidores, efectuada pelo sistema de gestão de bases de dados, como o [registo de transacções do SQL Server](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Para que o failover seja automático, é obrigatória a replicação síncrona; caso contrário, as últimas transacções confirmadas não estarão disponíveis no servidor secundário após o failover.

Esta técnica replica uma base de dados, mas não os restantes dados da aplicação. O failover de muitas aplicações também requer a replicação de outros dados, como ficheiros de configuração.

Se um servidor falhar e perder ficheiros da base de dados, o failback não é automático. Um DBA experiente tem de restaurar a base de dados no servidor avariado.

### O que é a técnica de replicação de dados ao nível do disco? {#what-is-the-data-replication-technique-at-disk-level}

É a replicação das alterações nos discos entre dois servidores, como no [DRBD](<https://linbit.com/drbd/>).

Para obter failover automático sem perda de dados, é necessária a replicação síncrona entre os discos.

Esta técnica pode replicar bases de dados e outros ficheiros, mas afecta significativamente a organização dos dados da aplicação. Todos os dados têm de estar no disco replicado. Isso pode ser impossível se alguns dados estiverem no disco do sistema, que tem de ser específico de cada servidor.

São necessários conhecimentos especializados para configurar um disco replicado com um sistema de ficheiros e colocar nele os dados da aplicação.

### O que é a técnica de replicação de dados ao nível do ficheiro? {#what-is-the-data-replication-technique-at-file-level}

É a replicação das alterações nos ficheiros entre dois servidores, como no [SafeKit](/pt-pt/).

Para obter failover automático sem perda de dados, é necessária a [replicação síncrona em tempo real](/pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/).

Esta técnica pode replicar bases de dados e outros ficheiros sem afectar a organização dos dados da aplicação. Por exemplo, a replicação de ficheiros em tempo real funciona mesmo que uma aplicação armazene os seus dados no disco do sistema.

A solução é muito simples de configurar: basta indicar os caminhos dos directórios a replicar.

## Tabelas comparativas das técnicas de replicação de dados {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-pt-pt %}}

{{% insert-safekit-hub-pt-pt %}}

{{% insert-safekit-4-buttons-pt-pt %}}