---
title: "Arquitetura sem partilha vs. arquitetura de disco partilhado: Como escolher o melhor cluster de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Arquitetura sem partilha vs disco partilhado para alta disponibilidade: como o SafeKit replica dados entre servidores para evitar custos de SAN e simplificar o failover."
category: "best-practises"
lang: "pt-pt"
topics: "Arquitetura sem partilha vs. arquitetura de disco partilhado para clusters de alta disponibilidade, arquitetura sem partilha vs. arquitetura de disco partilhado: Prós e Contras, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
schemaType: "TechArticle"
---

# Arquitetura sem partilha vs. arquitetura de disco partilhado: Como escolher o melhor cluster de alta disponibilidade {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Arquitetura sem partilha vs. arquitetura de disco partilhado para clusters de alta disponibilidade {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Visão Geral {#overview}

Este artigo compara duas arquiteturas para clusters de alta disponibilidade: a arquitetura sem partilha e a arquitetura de disco partilhado. Explica os seus prós e contras. Aborda as restrições de hardware, o impacto na organização dos dados da aplicação, o tempo de recuperação e a simplicidade de implementação.


![arquitetura sem partilha vs. arquitetura de disco partilhado](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


As tabelas de comparação abaixo detalham as diferenças entre uma arquitetura de disco partilhado e SafeKit. Este produto de clustering de software implementa uma arquitetura sem partilha.

### O que é uma arquitetura de disco partilhado? {#what-is-a-shared-disk-architecture}

Uma arquitetura de disco partilhado baseia-se em dois servidores que partilham um disco. Em caso de falha de hardware ou software, a aplicação reinicia automaticamente no outro servidor. O clustering de failover Microsoft é um exemplo de uma arquitetura de disco partilhado. Para obter mais detalhes, consulte [Requisitos de hardware para clustering de failover](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>).

Esta arquitetura tem restrições de hardware: armazenamento partilhado externo específico, placas específicas dentro dos servidores e comutadores específicos entre os servidores e o armazenamento partilhado.

Uma arquitetura de disco partilhado tem um forte impacto na organização dos dados da aplicação. Todos os dados da aplicação devem estar localizados no disco partilhado, para que a aplicação possa ser reiniciada após um failover.

Além disso, em caso de failover, um procedimento de recuperação do sistema de ficheiros deve ser executado no disco partilhado. Isto aumenta o tempo objetivo de recuperação (RTO).

Finalmente, a solução não é fácil de configurar. São necessárias competências de hardware para configurar o hardware específico. São também necessárias competências de aplicação para colocar os dados da aplicação no disco partilhado.

### O que é uma arquitetura sem partilha? {#what-is-a-shared-nothing-architecture-}

Uma arquitetura sem partilha baseia-se em dois servidores que replicam dados em tempo real. Em caso de falha de hardware ou software, a aplicação reinicia automaticamente no outro servidor. SafeKit é um exemplo de uma arquitetura sem partilha.

Existem dois tipos de replicação de dados: replicação de ficheiros ao nível de byte e replicação de disco ao nível de bloco. Para mais detalhes, consulte [Replicação de ficheiros ao nível de byte vs. replicação de disco ao nível de bloco](</pt-pt/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Este artigo considera a replicação de ficheiros ao nível de byte, porque tem muitas vantagens sobre a replicação de disco ao nível de bloco.

A arquitetura sem partilha não tem restrições de hardware. Os servidores podem ser físicos ou virtuais, com qualquer tipo de organização de disco. A replicação de ficheiros em tempo real é executada através da rede padrão entre os servidores. [A replicação síncrona](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>) garante a perda zero de dados.

Esta arquitetura não tem qualquer impacto na organização dos dados da aplicação. Por exemplo, a replicação de ficheiros em tempo real funciona mesmo que os dados da aplicação estejam no disco do sistema.

Em caso de failover, o objetivo de tempo de recuperação (RTO) é reduzido ao tempo de reinício da aplicação. A aplicação reinicia nos ficheiros replicados do servidor secundário.

Finalmente, a solução é muito simples de configurar. Basta configurar os caminhos dos diretórios a replicar.

## Arquitetura sem partilha vs. arquitetura de disco partilhado: Prós e Contras {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}