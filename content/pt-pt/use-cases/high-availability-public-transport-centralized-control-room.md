---
title: "Alta Disponibilidade para Transportes Públicos: Sala de Controlo Centralizada"
canonical: "https://safekit.eviden.com/pt-pt/use-cases/high-availability-public-transport-centralized-control-room/"
description: "Alta disponibilidade em salas de controlo de transportes: a RATP usa o SafeKit na linha 1 automática do Metro de Paris, com replicação, failover e balanceamento de carga."
category: "use-cases"
lang: "pt-pt"
topics: "Salas de Controlo de Transportes Públicos, Por que é que a sala de controlo é tão importante?, Alta disponibilidade SafeKit para transportes públicos, Implementação no mundo real na RATP, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.30 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2026/05/safekit-occ-512-512.jpg"
schemaType: "Article"
schemaMentions: ["RATP"]
---

# Alta Disponibilidade para Transportes Públicos: Sala de Controlo Centralizada {#high-availability-for-public-transport-centralized-control-room}

## Salas de Controlo de Transportes Públicos {#public-transport-control-rooms}

Uma sala de controlo centralizada é o centro nevrálgico dos sistemas modernos de transporte público. A sala de controlo monitoriza linhas inteiras de metro, gere operações automatizadas e garante a segurança dos passageiros. Para sistemas de metro, linhas de metro automatizadas e redes de autocarros, a sala de controlo deve operar 24 horas por dia, 7 dias por semana, sem interrupções.

A RATP gere o metro de Paris. Transporta mais de 10 milhões de passageiros todos os dias. A linha 1 do metro de Paris é totalmente automatizada e sem condutor. Isto torna o papel da sala de controlo ainda mais crítico.

## Por que é que a sala de controlo é tão importante? {#why-is-a-centralized-control-room-critical}

Os operadores de uma linha de metro devem reagir imediatamente ao mais pequeno incidente. Uma falha de TI nunca deve impedir os operadores de ver a atividade da linha.

As principais tarefas dos operadores da sala de controlo são:

  * Monitorização dos movimentos dos comboios nos carris
  * Gestão de incidentes detetados automaticamente por câmaras de vídeo
  * Gerir sistemas de comunicação e anúncios públicos
  * Supervisão das operações de segurança e informações aos passageiros

Uma falha no sistema da sala de controlo afeta diretamente a segurança dos passageiros e a continuidade do serviço. Todas as aplicações críticas na sala de controlo devem ser protegidas por alta disponibilidade. Exemplos disso são gateways, bases de dados e interfaces web.

## Alta disponibilidade SafeKit para transportes públicos {#safekit-high-availability-for-public-transport}

A RATP enfrentou grandes restrições para o projeto de automação da linha 1:

  * Um cronograma de implementação apertado
  * A maioria das aplicações não foi originalmente concebida para alta disponibilidade
  * Era necessária uma solução para servidores Windows e Linux
  * Não havia orçamento para hardware dispendioso, como armazenamento SAN ou dispositivos de balanceamento de carga de rede

SafeKit foi escolhido pelas seguintes razões:

  * É uma solução puramente de software, sem discos partilhados e sem SAN
  * Oferece a mesma solução no Windows e Linux
  * Oferece três funções essenciais: balanceamento de carga, comutação automática em caso de falha e replicação de dados em tempo real
  * É simples de implementar em servidores padrão, fácil de administrar e versátil

## Implementação no mundo real na RATP {#real-world-implementation-at-ratp}

A RATP implementou SafeKit com dois tipos de clusters:

  * **Cluster farm**: um cluster ativo/ativo com balanceamento de carga de rede e comutação automática de falhas
  * **Cluster mirror**: um cluster ativo/passivo com replicação de dados em tempo real e failover automático

### Abordagem de implementação {#deployment-approach}

Primeiro, a RATP definiu as necessidades funcionais. Em seguida, SafeKit foi configurado para cada aplicação protegida. As aplicações em si não foram modificadas. SafeKit não requer qualquer alteração física nos servidores.

Um cluster de aplicações SafeKit tem:

  * Dois servidores com o mesmo sistema operativo
  * A aplicação foi instalada em ambos os servidores
  * SafeKit foi instalado em ambos os servidores
  * Um ou mais módulos de aplicação configurados para alta disponibilidade e balanceamento de carga

Vários módulos de aplicação podem ser executados em paralelo no mesmo cluster. Isto otimiza a utilização dos recursos do servidor. A RATP validou os módulos SafeKit em três etapas: teste, pré-produção e produção.

### Operações diárias {#daily-operations}

Os operadores de TI administram agora todos os clusters de aplicações com:

  * A mesma solução de alta disponibilidade no Windows e Linux
  * A mesma consola de administração para todos os clusters
  * A mesma configuração e os mesmos comandos
  * Monitorização unificada para balanceamento de carga, alta disponibilidade e replicação de dados

Os servidores de cópia de segurança das aplicações críticas estão localizados numa sala de máquinas separada. Funcionam com fontes de alimentação independentes. Se ocorrer um incidente, as operações continuam sem interrupção do serviço para os passageiros do metro de Paris.

### Principais vantagens {#key-benefits}

  * **Redução de custos**: sem infraestrutura SAN dispendiosa com discos partilhados e sem dispositivos de balanceamento de carga de rede
  * **Administração simplificada**: uma única consola gere clusters Windows e Linux
  * **Alta disponibilidade**: balanceamento de carga, comutação automática por falha e replicação de dados em tempo real
  * **Impacto mínimo no projeto**: as aplicações existentes não requerem qualquer modificação
  * **Resiliência operacional**: a recuperação automática garante a continuidade do serviço aos passageiros

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
