---
title: "Arquitetura de disco compartilhado versus nada compartilhado: escolhendo o melhor cluster de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Compare arquiteturas de disco compartilhado (sem compartilhamento) com arquiteturas de disco compartilhado para alta disponibilidade. Saiba como SafeKit utiliza uma abordagem sem compartilhamento para eliminar custos de SAN, simplificar o failover e fornecer replicação síncrona sem restrições complexas de hardware."
category: "best-practises"
lang: "pt-pt"
topics: "Arquitetura sem compartilhamento versus arquitetura de disco compartilhado para clusters de alta disponibilidade, Arquitetura sem compartilhamento versus arquitetura de disco compartilhado: Prós e contras, 🔍 SafeKit Hub de Navegação de Alta Disponibilidade"
---

# Arquitetura de Disco Compartilhado vs. Sem Compartilhamento: Escolhendo o Melhor Cluster de Alta Disponibilidade {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Arquitetura de disco não compartilhado versus arquitetura de disco compartilhado para clusters de alta disponibilidade {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Visão geral {#overview}

Este artigo explora as vantagens e desvantagens da arquitetura "sem compartilhamento" versus a arquitetura de disco compartilhado para clusters de alta disponibilidade. Analisamos as limitações de hardware, o impacto na organização dos dados da aplicação, o tempo de recuperação e a simplicidade de implementação.


![ Arquitetura sem compartilhamento versus arquitetura de disco compartilhado ](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


As tabelas comparativas a seguir explicam detalhadamente a diferença entre a arquitetura de disco compartilhado e SafeKit , um produto de clusterização de software que implementa uma arquitetura sem compartilhamento (shared nothing).

### O que é uma arquitetura de disco compartilhado? {#what-is-a-shared-disk-architecture}

Uma arquitetura de disco compartilhado (como no cluster de failover [ Microsoft ](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>) ) é baseada em 2 servidores que compartilham um disco com failover automático de aplicativos em caso de falhas de hardware ou software.

Essa arquitetura possui limitações de hardware: o armazenamento compartilhado externo específico, as placas específicas a serem instaladas dentro dos servidores e os switches específicos entre os servidores e o armazenamento compartilhado.

Uma arquitetura de disco compartilhado tem um forte impacto na organização dos dados do aplicativo. Todos os dados do aplicativo devem estar localizados no disco compartilhado para que o sistema possa ser reiniciado após uma falha.

Além disso, em caso de falha, o procedimento de recuperação do sistema de arquivos deve ser executado no disco compartilhado. Isso aumenta o tempo de recuperação (RTO).

Por fim, a solução não é fácil de configurar, pois exige habilidades específicas para configurar o hardware. Além disso, são necessários conhecimentos de aplicação para configurar os dados da aplicação no disco compartilhado.

### O que é uma arquitetura de nada compartilhado? {#what-is-a-shared-nothing-architecture-}

Uma arquitetura sem compartilhamento (como em [ SafeKit ](</>) ) é baseada em 2 servidores que replicam dados em tempo real com failover automático de aplicativos em caso de falhas de hardware ou software.

Existem dois tipos de replicação de dados: replicação de arquivos em nível de byte [ e replicação de disco em nível de bloco ](</pt-pt/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) ). Consideramos aqui a replicação de arquivos em nível de byte por apresentar diversas vantagens em relação à replicação de disco em nível de bloco.

A arquitetura "shared nothing" não possui restrições de hardware: os servidores podem ser físicos ou virtuais, com qualquer tipo de organização de disco. A replicação de arquivos em tempo real (síncrona [ ](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>) para garantir 0% de perda de dados) é feita através da rede padrão entre os servidores.

Essa arquitetura não tem impacto na organização dos dados do aplicativo. Por exemplo, se um aplicativo tiver seus dados no disco do sistema, a replicação de arquivos em tempo real funcionará.

O tempo de recuperação (RTO) em caso de falha é reduzido ao tempo de reinicialização do aplicativo nos arquivos replicados do servidor secundário.

Por fim, a solução é muito simples de configurar, pois apenas os caminhos dos diretórios a serem replicados precisam ser definidos.

## Arquitetura sem compartilhamento versus arquitetura de disco compartilhado: vantagens e desvantagens {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}