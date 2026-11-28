---
title: "Alta Disponibilidade para Sistemas de Controlo de Tráfego Aéreo"
canonical: "https://safekit.eviden.com/pt-pt/use-cases/high-availability-air-traffic-control-system/"
description: "Alta disponibilidade para o controlo de tráfego aéreo: a ADB SafeGate usa o SafeKit em aeroportos mundiais para replicação em tempo real e failover automático em Windows."
category: "use-cases"
lang: "pt-pt"
topics: "Sistemas de Controlo de Tráfego Aéreo, Por que é que o controlo do tráfego aéreo é tão importante?, Como SafeKit protege o controlo do tráfego aéreo, Implementação no mundo real na ADB SafeGate"
hashpart: "air-traffic-control-systems, why-is-air-traffic-control-critical, safekit-high-availability-for-atc, real-world-implementation-at-adb-safegate"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.22 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# Alta Disponibilidade para Sistemas de Controlo de Tráfego Aéreo {#high-availability-for-air-traffic-control-systems}

![Alta Disponibilidade para Sistemas de Controlo de Tráfego Aéreo](/wp-content/uploads/2026/05/safekit-atc-512-512.jpg)

## Sistemas de Controlo de Tráfego Aéreo {#air-traffic-control-systems}

Os controladores de tráfego aéreo têm uma das tarefas mais complexas e stressantes que se possa imaginar. Hoje em dia, o espaço aéreo é movimentado e o tráfego aéreo é intenso. Um único erro na direção das aeronaves pode ter consequências catastróficas. Os sistemas modernos de controlo de tráfego aéreo dependem de aplicações de software sofisticadas. Estas aplicações ajudam os controladores a tomar decisões críticas.

ADB SafeGate é uma fornecedora global de soluções para aeroportos, incluindo software para torres de controlo de tráfego aéreo. As suas soluções equipam mais de 3.000 aeroportos em mais de 175 países. Elas gerem dados críticos de operações aeroportuárias, incluindo:

  * Informações sobre horários de voos e fluxo de tráfego aéreo
  * Dados meteorológicos
  * Estado da iluminação e do controlo do aeródromo
  * Operações de manobra e atracação

## Por que é que o controlo do tráfego aéreo é tão importante? {#why-is-air-traffic-control-critical}

O controlo de tráfego aéreo é uma das atividades mais críticas que existem. Qualquer falha do sistema num momento crítico pode comprometer a tomada de decisões do controlador e a segurança dos passageiros. Os controladores devem ter total confiança nos sistemas que os apoiam.

No entanto, a melhor aplicação é inútil se um servidor, sistema operativo ou software falhar num momento crítico. ADB SafeGate reconheceu a necessidade de garantir a disponibilidade do seu ambiente crítico. Decidiu estudar como garantir o funcionamento ininterrupto das suas aplicações, 24 horas por dia, 7 dias por semana.

**O desafio**: Disponibilizar um conjunto completo de aplicações para os controladores de tráfego aéreo 24 horas por dia, 7 dias por semana. Este é um requisito obrigatório para o controlo do tráfego aéreo.

## Como SafeKit protege o controlo do tráfego aéreo {#safekit-high-availability-for-atc}

ADB SafeGate selecionou SafeKit, a solução de alta disponibilidade de software da Eviden, porque oferece:

  * **Disponibilidade 24/7**: as aplicações críticas estão sempre disponíveis
  * **Servidores de aplicações redundantes**: os servidores podem estar localizados em salas de máquinas separadas para proteção contra desastres
  * **Servidores padrão**: sem discos partilhados e sem infraestrutura SAN complexa
  * **Replicação de ficheiros em tempo real**: sem perda de dados (RPO = 0)
  * **Recuperação automática**: não é necessária qualquer ação manual após uma falha

Como resultado, os controladores de tráfego aéreo que utilizam o software ADB SafeGate podem concentrar-se totalmente na sua tarefa complexa. Podem ter a certeza de que os sistemas que os apoiam são resilientes e estão sempre disponíveis.

## Implementação no mundo real na ADB SafeGate {#real-world-implementation-at-adb-safegate}

### Abordagem de implementação {#deployment-approach}

Num aeroporto, ADB SafeGate instala as suas aplicações e SafeKit em dois servidores Windows padrão. Os servidores não possuem discos partilhados. As aplicações beneficiam de replicação de ficheiros em tempo real e recuperação automática após uma falha.

### Como funciona na prática {#how-it-works-in-practice}

**Fase 1: Funcionamento normal**

A aplicação é executada apenas no servidor 1, dentro do módulo mirror SafeKit. Os clientes ligam-se automaticamente ao servidor 1 através de um endereço IP virtual primário/secundário. Apenas os ficheiros modificados pela aplicação são replicados. São enviados para o servidor 2 em tempo real através da rede. Isto minimiza o tráfego de rede.

Não existem pré-requisitos quanto à organização do servidor. Os ficheiros podem estar num disco RAID5 no servidor 1 e num disco simples no servidor 2.

As escritas são replicadas de forma síncrona para ambos os servidores. Assim, nenhum dado é perdido em caso de falha. Os dados confirmados por uma aplicação transacional ficam automaticamente disponíveis no servidor secundário. Um exemplo é PostgreSQL. Esta garantia não é possível com replicação assíncrona.

**Fase 2: Redundância em caso de falha**

Se o servidor 1 falhar, SafeKit muda automaticamente para o servidor 2. O tempo de failover é igual ao tempo de deteção de falha mais o tempo de reinício da aplicação. O tempo limite de deteção predefinido é de 30 segundos. Não há atraso na recuperação do sistema de ficheiros, ao contrário das soluções de replicação de disco.

**Fase 3: Ressincronização após falha**

Quando o servidor 1 é reiniciado, o módulo mirror ressincroniza automaticamente os ficheiros.

Apenas os ficheiros modificados no servidor 2 durante o tempo de inatividade do servidor 1 são ressincronizados. As aplicações continuam a ser executadas no servidor 2 durante a ressincronização. Após a ressincronização, o sistema volta a estar altamente disponível e protegido.

O administrador pode querer que a aplicação seja executada no servidor 1 por prioridade. Neste caso, um failback para o servidor 1 pode ser acionado manualmente com um único clique. Também pode ser automático.

### Principais benefícios para os aeroportos {#key-benefits-for-airports}

  * **Não é necessário hardware especial**: os servidores Windows padrão são suficientes
  * **Sem armazenamento partilhado**: sem infraestrutura SAN dispendiosa e sem a complexidade de discos partilhados
  * **Resistência a desastres**: os servidores podem estar em salas de máquinas separadas com fontes de alimentação independentes
  * **Perda de dados zero**: a replicação síncrona garante RPO = 0 para todas as transações confirmadas
  * **Recuperação automática**: não é necessária qualquer ação manual após uma falha
  * **Menos stress**: os controladores de tráfego aéreo podem confiar nos sistemas que apoiam as suas decisões críticas
  * **Fiabilidade global**: implementado com sucesso em aeroportos de vários países e continentes

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
