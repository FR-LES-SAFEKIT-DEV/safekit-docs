---
title: "Software de Continuidade de Negócios e Recuperação de Desastres para Clusters de 2 Nós com SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/use-cases/business-continuity-and-disaster-recovery-software/"
description: "SafeKit é um software de continuidade de negócios e recuperação de desastres que implementa uma solução simples de alta disponibilidade entre duas salas de computadores remotas. Obtenha disponibilidade 24 horas por dia, 7 dias por semana, com SafeKit , o software de continuidade de negócios e recuperação de desastres mais fácil de usar. Elimine SANs dispendiosas e habilidades complexas de TI com replicação síncrona de 2 nós, failover automático e balanceamento de carga para Windows e Linux . Perda de dados zero (RPO=0) para aplicações críticas em qualquer ambiente de nuvem ou local."
category: "use-cases"
lang: "pt-pt"
topics: "Software de continuidade de negócios e recuperação de desastres, 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Software de Continuidade de Negócios e Recuperação de Desastres para Clusters de 2 Nós com SafeKit {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## Software de continuidade de negócios e recuperação de desastres {#business-continuity-and-disaster-recovery-software}

### Motivos para escolher o software SafeKit para continuidade de negócios e recuperação de desastres {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![ Software simples de continuidade de negócios e recuperação de desastres com SafeKit ](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


Não há diferença de configuração ao implantar um cluster SafeKit na mesma sala de computadores ou em salas de computadores remotas, desde que uma LAN estendida ou uma VLAN estendida esteja disponível entre os locais remotos.

### Como implementar uma solução simples de alta disponibilidade entre duas salas de computadores remotas? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

Os módulos SafeKit mirror e `farm` podem ser facilmente implementados em servidores localizados em salas de computadores remotas, sem qualquer configuração especial de cluster. Isso significa que SafeKit combina continuidade de negócios e recuperação de desastres em uma única arquitetura simples. SafeKit também gerencia o cenário de "split brain" (split brain) [ ](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) em caso de isolamento de rede, sem a necessidade de um terceiro servidor ou um disco de quorum especial.

### Continuidade de negócios versus soluções de backup {#business-continuity-vs-backup-solutions}

As soluções de continuidade de negócios e backup abordam diferentes cenários de falha e são complementares, não intercambiáveis. A continuidade de negócios, fornecida pelo cluster de alta disponibilidade do SafeKit , mantém os aplicativos em execução com interrupção mínima em caso de falha de servidor ou aplicativo, por meio de replicação em tempo real e failover automático. As soluções de backup protegem contra perdas mais amplas, como ataques de ransomware ou erros de operação, e normalmente dependem de cópias de dados externas que podem ser restauradas posteriormente, com tempos de recuperação mais longos, mas sem failover automático.

Saiba mais em [ Combinando SafeKit Alta disponibilidade com backups de recuperação de desastres ](</best-practises/high-availability-disaster-recovery-hadr/>) .


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}