---
title: "Alta Disponibilidade para Sistemas de Controle de Tráfego Aéreo"
canonical: "https://safekit.eviden.com/pt-br/use-cases/high-availability-air-traffic-control-system/"
description: "Alta disponibilidade para controle de tráfego aéreo: a ADB SafeGate usa o SafeKit em aeroportos do mundo todo para replicação em tempo real e failover automático no Windows."
category: "use-cases"
lang: "pt-br"
topics: "Sistemas de Controle de Tráfego Aéreo, Por que o controle de tráfego aéreo é tão importante?, Como SafeKit protege o controle de tráfego aéreo, Implementação no mundo real na ADB SafeGate"
hashpart: "air-traffic-control-systems, why-is-air-traffic-control-critical, safekit-high-availability-for-atc, real-world-implementation-at-adb-safegate"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.22 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# Alta Disponibilidade para Sistemas de Controle de Tráfego Aéreo {#high-availability-for-air-traffic-control-systems}

## Sistemas de Controle de Tráfego Aéreo {#air-traffic-control-systems}

Os controladores de tráfego aéreo têm uma das tarefas mais complexas e estressantes imagináveis. Hoje, o espaço aéreo é movimentado e o tráfego aéreo é intenso. Um único erro no direcionamento de aeronaves pode ter consequências catastróficas. Os sistemas modernos de controle de tráfego aéreo dependem de aplicativos de software sofisticados. Esses aplicativos ajudam os controladores a tomar decisões críticas.

ADB SafeGate é uma fornecedora global de soluções para o lado ar, incluindo software para torres de controle de tráfego aéreo. Suas soluções equipam mais de 3.000 aeroportos em mais de 175 países. Elas gerenciam dados críticos de operações aeroportuárias, incluindo:

  * Informações sobre o agendamento de voos e o fluxo do tráfego aéreo
  * Dados meteorológicos
  * Status da iluminação e do controle do aeródromo
  * Operações de pátio e de atracação

## Por que o controle de tráfego aéreo é tão importante? {#why-is-air-traffic-control-critical}

O controle de tráfego aéreo é uma das atividades mais críticas que existem. Qualquer falha do sistema em um momento crítico pode comprometer a tomada de decisão do controlador e a segurança dos passageiros. Os controladores devem ter total confiança nos sistemas que os apoiam.

No entanto, a melhor aplicação é inútil se um servidor, sistema operacional ou software falhar em um momento crítico. ADB SafeGate reconheceu a necessidade de garantir a disponibilidade de seu ambiente crítico. Decidiu estudar como garantir o tempo de atividade 24 horas por dia, 7 dias por semana, para seus aplicativos.

**O desafio**: disponibilizar um conjunto abrangente de aplicativos para controladores de tráfego aéreo 24 horas por dia, 7 dias por semana. Este é um requisito obrigatório para o controle de tráfego aéreo.

## Como SafeKit protege o controle de tráfego aéreo {#safekit-high-availability-for-atc}

ADB SafeGate selecionou SafeKit, a solução de alta disponibilidade de software da Eviden, porque ele oferece:

  * **Disponibilidade 24 horas por dia, 7 dias por semana**: as aplicações críticas estão sempre disponíveis
  * **Servidores de aplicativos redundantes**: os servidores podem estar localizados em salas de máquinas separadas para proteção contra desastres
  * **Servidores padrão**: sem discos compartilhados e sem infraestrutura SAN complexa
  * **Replicação de arquivos em tempo real**: sem perda de dados (RPO = 0)
  * **Recuperação automática**: nenhuma ação manual é necessária após uma falha

Como resultado, os controladores de tráfego aéreo que usam o software ADB SafeGate podem se concentrar totalmente em sua tarefa complexa. Eles podem ter certeza de que os sistemas que os apoiam são resilientes e estão sempre disponíveis.

## Implementação no mundo real na ADB SafeGate {#real-world-implementation-at-adb-safegate}

### Abordagem de implantação {#deployment-approach}

Em um aeroporto, ADB SafeGate instala seus aplicativos e SafeKit em dois servidores Windows padrão. Os servidores não têm discos compartilhados. Os aplicativos se beneficiam da replicação de arquivos em tempo real e da recuperação automática após uma falha.

### Como funciona na prática {#how-it-works-in-practice}

**Fase 1: Operação normal**

O aplicativo é executado apenas no servidor 1, dentro do módulo mirror SafeKit. Os clientes se conectam automaticamente ao servidor 1 por meio de um endereço IP virtual primário/secundário. Apenas os arquivos modificados pelo aplicativo são replicados. Eles são enviados para o servidor 2 em tempo real pela rede. Isso minimiza o tráfego de rede.

Não há pré-requisitos na organização do servidor. Os arquivos podem estar em um disco RAID5 no servidor 1 e em um disco simples no servidor 2.

As gravações são replicadas de forma síncrona para ambos os servidores. Assim, nenhum dado é perdido em caso de falha. Os dados confirmados por um aplicativo transacional ficam automaticamente disponíveis no servidor secundário. Um exemplo é PostgreSQL. Essa garantia não é possível com a replicação assíncrona.

**Fase 2: Failover em caso de falha**

Se o servidor 1 falhar, SafeKit automaticamente muda para o servidor 2. O tempo de failover é igual ao tempo de detecção de falha mais o tempo de reinicialização do aplicativo. O tempo limite de detecção padrão é de 30 segundos. Não há atraso na recuperação do sistema de arquivos, ao contrário das soluções de replicação de disco.

**Fase 3: Ressincronização após falha**

Quando o servidor 1 é reiniciado, o módulo mirror ressincroniza automaticamente os arquivos.

Apenas os arquivos modificados no servidor 2 durante o tempo de inatividade do servidor 1 são ressincronizados. Os aplicativos continuam em execução no servidor 2 durante a ressincronização. Após a ressincronização, o sistema fica novamente altamente disponível e protegido.

O administrador pode querer que o aplicativo seja executado no servidor 1 por prioridade. Nesse caso, um failback para o servidor 1 pode ser acionado manualmente com um único clique. Também pode ser automático.

### Principais benefícios para aeroportos {#key-benefits-for-airports}

  * **Não é necessário hardware especial**: servidores Windows padrão são suficientes
  * **Sem armazenamento compartilhado**: sem infraestrutura SAN cara e sem a complexidade de discos compartilhados
  * **Resistência a desastres**: os servidores podem estar em salas de máquinas separadas com fontes de alimentação separadas
  * **Perda de dados zero**: a replicação síncrona garante RPO = 0 para todas as transações confirmadas
  * **Recuperação automática**: nenhuma ação manual é necessária após uma falha
  * **Menos estresse**: os controladores de tráfego aéreo podem confiar nos sistemas que apoiam suas decisões críticas
  * **Confiabilidade global**: implementado com sucesso em aeroportos de diversos países e continentes

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
