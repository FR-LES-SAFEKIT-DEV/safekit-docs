---
title: "Arquitetura sem compartilhamento vs. arquitetura de disco compartilhado: como escolher o melhor cluster de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-br/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Compare arquiteturas sem compartilhamento e de disco compartilhado para alta disponibilidade. SafeKit usa uma abordagem sem compartilhamento. Ele elimina os custos SAN e simplifica failover. Ele fornece replicação síncrona sem restrições complexas de hardware."
category: "best-practises"
lang: "pt-br"
topics: "Arquitetura sem compartilhamento versus arquitetura de disco compartilhado para clusters de alta disponibilidade, arquitetura sem compartilhamento vs. arquitetura de disco compartilhado: prós e contras, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 52 expressions"
---

# Arquitetura sem compartilhamento vs. arquitetura de disco compartilhado: como escolher o melhor cluster de alta disponibilidade {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Arquitetura sem compartilhamento versus arquitetura de disco compartilhado para clusters de alta disponibilidade {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Visão geral {#overview}

Este artigo compara duas arquiteturas para clusters de alta disponibilidade: a arquitetura sem compartilhamento e a arquitetura de disco compartilhado. Ele explica os prós e contras de cada uma. Aborda as restrições de hardware, o impacto na organização dos dados da aplicação, o tempo de recuperação e a simplicidade de implementação.


![arquitetura sem compartilhamento vs. arquitetura de disco compartilhado](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


As tabelas comparativas abaixo detalham as diferenças entre uma arquitetura de disco compartilhado e SafeKit. Este produto de clustering de software implementa uma arquitetura sem compartilhamento.

### O que é uma arquitetura de disco compartilhado? {#what-is-a-shared-disk-architecture}

Uma arquitetura de disco compartilhado é baseada em dois servidores que compartilham um disco. Em caso de falha de hardware ou software, o aplicativo é reiniciado automaticamente no outro servidor. O clustering de failover Microsoft é um exemplo de uma arquitetura de disco compartilhado. Para obter detalhes, consulte [Requisitos de hardware de clustering de failover](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>).

Essa arquitetura tem restrições de hardware: armazenamento compartilhado externo específico, placas específicas dentro dos servidores e switches específicos entre os servidores e o armazenamento compartilhado.

Uma arquitetura de disco compartilhado tem um forte impacto na organização dos dados do aplicativo. Todos os dados do aplicativo devem estar localizados no disco compartilhado, para que o aplicativo possa ser reiniciado após um failover.

Além disso, em caso de failover, um procedimento de recuperação do sistema de arquivos deve ser executado no disco compartilhado. Isso aumenta o tempo objetivo de recuperação (RTO).

Por fim, a solução não é fácil de configurar. São necessárias habilidades de hardware para configurar o hardware específico. Também são necessárias habilidades de aplicativo para colocar os dados do aplicativo no disco compartilhado.

### O que é uma arquitetura sem compartilhamento? {#what-is-a-shared-nothing-architecture-}

Uma arquitetura sem compartilhamento é baseada em dois servidores que replicam dados em tempo real. Em caso de falha de hardware ou software, o aplicativo reinicia automaticamente no outro servidor. SafeKit é um exemplo de uma arquitetura sem compartilhamento.

Existem dois tipos de replicação de dados: replicação de arquivos em nível de byte e replicação de disco em nível de bloco. Para obter detalhes, consulte [Replicação de arquivos em nível de byte vs. replicação de disco em nível de bloco](</pt-br/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Este artigo considera a replicação de arquivos em nível de byte, porque ela tem muitas vantagens sobre a replicação de disco em nível de bloco.

A arquitetura sem compartilhamento não tem restrições de hardware. Os servidores podem ser físicos ou virtuais, com qualquer tipo de organização de disco. A replicação de arquivos em tempo real é executada na rede padrão entre os servidores. [A replicação síncrona](</pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/>) garante zero perda de dados.

Essa arquitetura não tem impacto na organização dos dados do aplicativo. Por exemplo, a replicação de arquivos em tempo real funciona mesmo que os dados do aplicativo estejam no disco do sistema.

No caso de um failover, o objetivo de tempo de recuperação (RTO) é reduzido para o tempo de reinicialização do aplicativo. O aplicativo é reiniciado nos arquivos replicados do servidor secundário.

Por fim, a solução é muito simples de configurar. Você só precisa configurar os caminhos dos diretórios a serem replicados.

## Arquitetura sem compartilhamento vs. arquitetura de disco compartilhado: prós e contras {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}