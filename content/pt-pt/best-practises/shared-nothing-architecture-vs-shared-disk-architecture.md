---
title: "Arquitetura sem partilha vs. arquitetura de disco partilhado: Como escolher o melhor cluster de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Compare arquiteturas sem partilha e de disco partilhado para alta disponibilidade. Saiba como SafeKit utiliza uma abordagem sem partilha para eliminar os custos SAN, simplificar a recuperação de falhas e fornecer replicação síncrona sem restrições de hardware complexas."
category: "best-practises"
lang: "pt-pt"
topics: "Arquitetura sem partilha vs. arquitetura de disco partilhado para clusters de alta disponibilidade, arquitetura sem partilha vs. arquitetura de disco partilhado: Prós e Contras, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-10.3 | glossaire 2026-11-10.4 | Translation LLM | 45 expressions"
---

# Arquitetura sem partilha vs. arquitetura de disco partilhado: Como escolher o melhor cluster de alta disponibilidade {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Arquitetura sem partilha vs. arquitetura de disco partilhado para clusters de alta disponibilidade {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Visão Geral {#overview}

Este artigo explora os prós e os contras da arquitetura sem partilha em comparação com a arquitetura de disco partilhado para clusters de alta disponibilidade. Analisamos as restrições de hardware, o impacto na organização dos dados da aplicação, o tempo de recuperação e a simplicidade de implementação.


![arquitetura sem partilha vs. arquitetura de disco partilhado](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


As tabelas comparativas seguintes explicam em detalhe a diferença entre a arquitetura de disco partilhado e SafeKit, um produto de clustering de software que implementa uma arquitetura sem partilha.

### O que é uma arquitetura de disco partilhado? {#what-is-a-shared-disk-architecture}

Uma arquitetura de disco partilhado (como a do [cluster de failover Microsoft](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)) baseia-se em 2 servidores que partilham um disco com um failover automático da aplicação em caso de falhas de hardware ou software.

Esta arquitetura tem restrições de hardware: o armazenamento partilhado externo específico, as placas específicas a instalar dentro dos servidores e os comutadores específicos entre os servidores e o armazenamento partilhado.

Uma arquitetura de disco partilhado tem um forte impacto na organização dos dados da aplicação. Todos os dados da aplicação devem estar localizados no disco partilhado para um reinício após uma falha.

Além disso, em caso de falha, o procedimento de recuperação do sistema de ficheiros deve ser executado no disco partilhado. Isto aumenta o tempo de recuperação (RTO).

Finalmente, a solução não é fácil de configurar, pois são necessárias competências para configurar o hardware específico. Além disso, são necessárias competências de aplicação para configurar os dados da aplicação no disco partilhado.

### O que é uma arquitetura sem partilha? {#what-is-a-shared-nothing-architecture-}

Uma arquitetura sem partilha (como a do [SafeKit](</pt-pt/>)) baseia-se em 2 servidores que replicam dados em tempo real, com um sistema automático de contingência de aplicações em caso de falhas de hardware ou software.

Existem dois tipos de replicação de dados: [replicação de ficheiros ao nível de byte versus replicação de disco ao nível de bloco](</pt-pt/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Consideramos aqui a replicação de ficheiros ao nível de byte porque possui muitas vantagens em relação à replicação de disco ao nível de bloco.

A arquitetura sem partilha não possui restrições de hardware: os servidores podem ser físicos ou virtuais, com qualquer tipo de organização de disco. A replicação de ficheiros em tempo real ([síncrona](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>) para perda zero de dados) é feita através da rede padrão entre os servidores.

Esta arquitetura não tem qualquer impacto na organização dos dados da aplicação. Por exemplo, se uma aplicação tiver os seus dados no disco do sistema, a replicação de ficheiros em tempo real funcionará.

O tempo de recuperação (RTO) em caso de falha é reduzido ao tempo de reinício da aplicação nos ficheiros replicados do servidor secundário.

Finalmente, a solução é muito simples de configurar, pois apenas os caminhos dos diretórios a replicar são configurados.

## Arquitetura sem partilha vs. arquitetura de disco partilhado: Prós e Contras {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}