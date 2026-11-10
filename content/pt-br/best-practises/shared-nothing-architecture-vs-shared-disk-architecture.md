---
title: "Arquitetura sem compartilhamento vs. arquitetura de disco compartilhado: como escolher o melhor cluster de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-br/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Compare arquiteturas sem compartilhamento e de disco compartilhado para alta disponibilidade. Saiba como SafeKit usa uma abordagem sem compartilhamento para eliminar os custos SAN, simplificar o failover e fornecer replicação síncrona sem restrições complexas de hardware."
category: "best-practises"
lang: "pt-br"
topics: "Arquitetura sem compartilhamento versus arquitetura de disco compartilhado para clusters de alta disponibilidade, arquitetura sem compartilhamento vs. arquitetura de disco compartilhado: prós e contras, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-10.3 | glossaire 2026-11-10.4 | Translation LLM | 45 expressions"
---

# Arquitetura sem compartilhamento vs. arquitetura de disco compartilhado: como escolher o melhor cluster de alta disponibilidade {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Arquitetura sem compartilhamento versus arquitetura de disco compartilhado para clusters de alta disponibilidade {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Visão geral {#overview}

Este artigo explora os prós e os contras da arquitetura sem compartilhamento em comparação com a arquitetura de disco compartilhado para clusters de alta disponibilidade. Estamos analisando as restrições de hardware, o impacto na organização dos dados do aplicativo, o tempo de recuperação e a simplicidade da implementação.


![arquitetura sem compartilhamento vs. arquitetura de disco compartilhado](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


As tabelas comparativas a seguir explicam em detalhes a diferença entre a arquitetura de disco compartilhado e SafeKit, um produto de clustering de software que implementa uma arquitetura sem compartilhamento.

### O que é uma arquitetura de disco compartilhado? {#what-is-a-shared-disk-architecture}

Uma arquitetura de disco compartilhado (como com [o cluster de failover Microsoft](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)) é baseada em 2 servidores que compartilham um disco com um failover automático de aplicativo em caso de falhas de hardware ou software.

Essa arquitetura tem restrições de hardware: o armazenamento compartilhado externo específico, as placas específicas para instalar dentro dos servidores e os switches específicos entre os servidores e o armazenamento compartilhado.

Uma arquitetura de disco compartilhado tem um forte impacto na organização dos dados do aplicativo. Todos os dados do aplicativo devem estar localizados no disco compartilhado para uma reinicialização após uma falha.

Além disso, em caso de falha, o procedimento de recuperação do sistema de arquivos deve ser executado no disco compartilhado. Isso aumenta o tempo de recuperação (RTO).

Por fim, a solução não é fácil de configurar, pois são necessárias habilidades para configurar o hardware específico. Além disso, são necessárias habilidades de aplicativo para configurar os dados do aplicativo no disco compartilhado.

### O que é uma arquitetura sem compartilhamento? {#what-is-a-shared-nothing-architecture-}

Uma arquitetura sem compartilhamento (como a do [SafeKit](</pt-br/>)) baseia-se em 2 servidores que replicam dados em tempo real com um failover automático da aplicação em caso de falhas de hardware ou software.

Existem dois tipos de replicação de dados: [replicação de arquivos em nível de byte versus replicação de disco em nível de bloco](</pt-br/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Consideramos aqui a replicação de arquivos em nível de byte porque ela tem muitas vantagens sobre a replicação de disco em nível de bloco.

A arquitetura sem compartilhamento não tem restrições de hardware: os servidores podem ser físicos ou virtuais com qualquer tipo de organização de disco. A replicação de arquivos em tempo real ([síncrona](</pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/>) para perda zero de dados) é feita através da rede padrão entre os servidores.

Essa arquitetura não tem impacto na organização dos dados do aplicativo. Por exemplo, se um aplicativo tiver seus dados no disco do sistema, a replicação de arquivos em tempo real estará funcionando.

O tempo de recuperação (RTO) no caso de uma falha é reduzido para o tempo de reinicialização do aplicativo nos arquivos replicados do servidor secundário.

Por fim, a solução é muito simples de configurar, pois apenas os caminhos dos diretórios a serem replicados são configurados.

## Arquitetura sem compartilhamento vs. arquitetura de disco compartilhado: prós e contras {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}