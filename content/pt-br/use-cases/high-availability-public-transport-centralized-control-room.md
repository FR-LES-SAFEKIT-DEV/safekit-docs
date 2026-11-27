---
title: "Alta Disponibilidade para o Transporte Público: Sala de Controle Centralizada"
canonical: "https://safekit.eviden.com/pt-br/use-cases/high-availability-public-transport-centralized-control-room/"
description: "Alta disponibilidade para salas de controle de transporte público: a RATP usa o SafeKit na linha 1 automática do Metrô de Paris, com replicação, failover e balanceamento."
category: "use-cases"
lang: "pt-br"
topics: "Salas de Controle de Transporte Público, Por que a sala de controle é tão importante?, Alta disponibilidade SafeKit para transporte público, Implementação no mundo real na RATP"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.30 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2026/05/safekit-occ-512-512.jpg"
schemaType: "Article"
schemaMentions: ["RATP"]
---

# Alta Disponibilidade para o Transporte Público: Sala de Controle Centralizada {#high-availability-for-public-transport-centralized-control-room}

## Salas de Controle de Transporte Público {#public-transport-control-rooms}

Uma sala de controle centralizada é o centro nevrálgico dos sistemas modernos de transporte público. A sala de controle monitora linhas inteiras de metrô, gerencia operações automatizadas e garante a segurança dos passageiros. Para sistemas de metrô, linhas de metrô automatizadas e redes de ônibus, a sala de controle deve operar 24 horas por dia, 7 dias por semana, sem interrupção.

A RATP administra o metrô de Paris. Transporta mais de 10 milhões de passageiros todos os dias. A Linha 1 do metrô de Paris é totalmente automatizada e sem motorista. Isso torna o papel da sala de controle ainda mais crítico.

## Por que a sala de controle é tão importante? {#why-is-a-centralized-control-room-critical}

Os operadores de uma linha de metrô devem reagir imediatamente ao menor incidente. Uma falha de TI nunca deve impedir que os operadores vejam a atividade da linha.

As principais tarefas dos operadores da sala de controle são:

  * Monitoramento dos movimentos dos trens nos trilhos
  * Lidar com incidentes detectados automaticamente por câmeras de vídeo
  * Gerenciamento de sistemas de comunicação e anúncios públicos
  * Supervisionar as operações de segurança e as informações aos passageiros

Uma falha no sistema da sala de controle afeta diretamente a segurança dos passageiros e a continuidade do serviço. Todos os aplicativos críticos na sala de controle devem ser protegidos por alta disponibilidade. Exemplos são gateways, bancos de dados e front-ends da web.

## Alta disponibilidade SafeKit para transporte público {#safekit-high-availability-for-public-transport}

A RATP enfrentou grandes restrições para o projeto de automação da linha 1:

  * Um cronograma de implementação apertado
  * A maioria dos aplicativos não foi originalmente projetada para alta disponibilidade
  * Era necessária uma solução para servidores Windows e Linux
  * Não havia orçamento para hardware caro, como armazenamento SAN ou dispositivos de balanceamento de carga de rede

SafeKit foi escolhido pelos seguintes motivos:

  * É uma solução puramente de software, sem discos compartilhados e sem SAN
  * Ele oferece a mesma solução no Windows e Linux
  * Ele oferece três funções essenciais: balanceamento de carga, failover automático e replicação de dados em tempo real
  * É simples de implementar em servidores padrão, fácil de administrar e versátil

## Implementação no mundo real na RATP {#real-world-implementation-at-ratp}

A RATP implementou SafeKit com dois tipos de clusters:

  * **Cluster farm**: um cluster ativo/ativo com balanceamento de carga de rede e failover automático
  * **Cluster mirror**: um cluster ativo/passivo com replicação de dados em tempo real e failover automático

### Abordagem de implantação {#deployment-approach}

Primeiro, a RATP definiu as necessidades funcionais. Em seguida, SafeKit foi configurado para cada aplicação protegida. As aplicações em si não foram modificadas. SafeKit não requer nenhuma alteração física nos servidores.

Um cluster de aplicações SafeKit tem:

  * Dois servidores com o mesmo sistema operacional
  * O aplicativo foi instalado em ambos os servidores
  * SafeKit foi instalado em ambos os servidores
  * Um ou mais módulos de aplicação configurados para alta disponibilidade e balanceamento de carga

Vários módulos de aplicação podem ser executados em paralelo no mesmo cluster. Isso otimiza o uso dos recursos do servidor. A RATP validou os módulos SafeKit em três etapas: teste, pré-produção e produção.

### Operações diárias {#daily-operations}

Os operadores de TI agora administram todos os clusters de aplicativos com:

  * A mesma solução de alta disponibilidade no Windows e Linux
  * O mesmo console de administração para todos os clusters
  * A mesma configuração e os mesmos comandos
  * Monitoramento unificado para balanceamento de carga, alta disponibilidade e replicação de dados

Os servidores de backup de aplicações críticas estão localizados em uma sala de máquinas separada. Eles funcionam com fontes de alimentação separadas. Se ocorrer um incidente, as operações continuam sem perda de serviço para os passageiros do metrô de Paris.

### Principais benefícios {#key-benefits}

  * **Redução de custos**: sem infraestrutura SAN cara com discos compartilhados e sem dispositivos de balanceamento de carga de rede
  * **Administração simplificada**: um único console gerencia clusters Windows e Linux
  * **Alta disponibilidade**: balanceamento de carga, failover automático e replicação de dados em tempo real
  * **Impacto mínimo no projeto**: as aplicações existentes não requerem modificação
  * **Resiliência operacional**: a recuperação automática garante o serviço contínuo aos passageiros

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
