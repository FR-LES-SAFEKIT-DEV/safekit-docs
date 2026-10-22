---
title: "Técnicas de replicação de dados para alta disponibilidade: uma comparação completa"
canonical: "https://safekit.eviden.com/pt-br/best-practises/data-replication-techniques/"
description: "Compare técnicas de replicação de dados em nível de banco de dados, disco e arquivo. Saiba por que o SafeKit propõe uma arquitetura sem SAN para replicação síncrona simples e em tempo real, que evita perda de dados e oferece failover automático no Windows e Linux."
category: "best-practises"
lang: "pt-br"
topics: "Técnicas de replicação de dados em nível de banco de dados, disco ou arquivo, Tabelas comparativas de técnicas de replicação de dados, Central de navegação de alta disponibilidade SafeKit"
---

# Técnicas de replicação de dados para alta disponibilidade: uma comparação completa {#data-replication-techniques-for-high-availability-a-complete-comparison}

## Técnicas de replicação de dados em nível de banco de dados, disco ou arquivo? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Visão geral {#overview}

Este artigo analisa as vantagens e desvantagens das técnicas de replicação de dados em nível de banco de dados, disco e arquivo para clusters de alta disponibilidade. Consideramos failover, failback e simplicidade de implementação.

![Técnicas de replicação de dados](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

As tabelas comparativas a seguir detalham as técnicas de replicação de dados implementadas pelo SafeKit, um software de alta disponibilidade.

### O que é a técnica de replicação de dados em nível de banco de dados? {#what-is-the-data-replication-technique-at-database-level}

É a replicação dos arquivos de log entre dois servidores feita pelo sistema de gerenciamento de banco de dados, como o [log de transações do SQL Server](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Para o failover automático, a replicação síncrona é obrigatória; caso contrário, as últimas transações confirmadas não serão recuperadas no servidor secundário após o failover.

Essa técnica replica um banco de dados, mas não os outros dados do aplicativo. O failover de muitas aplicações também exige a replicação de outros dados, como arquivos de configuração.

Quando um servidor falha e perde arquivos do banco de dados, o failback não é automático. Um DBA experiente precisa restaurar o banco no servidor com falha.

### O que é a técnica de replicação de dados em nível de disco? {#what-is-the-data-replication-technique-at-disk-level}

É a replicação das alterações nos discos entre dois servidores, como no [DRBD](<https://linbit.com/drbd/>).

Para o failover automático sem perda de dados, é necessária a replicação síncrona entre os discos.

Essa técnica pode replicar bancos de dados e outros arquivos, mas afeta bastante a organização dos dados da aplicação. Todos os dados precisam estar no disco replicado. Isso pode ser impossível se alguns dados estiverem no disco do sistema, que deve ser específico de cada servidor.

São necessários conhecimentos especializados para configurar um disco replicado com sistema de arquivos e posicionar nele os dados da aplicação.

### O que é a técnica de replicação de dados em nível de arquivo? {#what-is-the-data-replication-technique-at-file-level}

É a replicação das alterações nos arquivos entre dois servidores, como no [SafeKit](/pt-br/).

Para o failover automático sem perda de dados, é necessária a [replicação síncrona em tempo real](/pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/).

Essa técnica replica bancos de dados e outros arquivos sem afetar a organização dos dados da aplicação. Por exemplo, a replicação de arquivos em tempo real funciona mesmo que a aplicação armazene dados no disco do sistema.

A solução é simples de configurar: basta especificar os caminhos dos diretórios que serão replicados.

## Tabelas comparativas de técnicas de replicação de dados {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-pt-br %}}

{{% insert-safekit-hub-pt-br %}}

{{% insert-safekit-4-buttons-pt-br %}}