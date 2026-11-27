---
title: "Software de Continuidade de Negócios e Recuperação de Desastres para Clusters de 2 Nós com SafeKit"
canonical: "https://safekit.eviden.com/pt-br/use-cases/business-continuity-and-disaster-recovery-software/"
description: "Continuidade dos negócios e recuperação de desastres com SafeKit: um cluster de dois nós em duas salas de servidores, com replicação síncrona e failover automático."
category: "use-cases"
lang: "pt-br"
topics: "Software de continuidade de negócios e recuperação de desastres"
translation: "translate_md 2026-11-16.4 | glossaire 2026-11-16.12 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2023/02/remote-datacenters.png"
schemaType: "Article"
---

# Software de Continuidade de Negócios e Recuperação de Desastres para Clusters de 2 Nós com SafeKit {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## Software de continuidade de negócios e recuperação de desastres {#business-continuity-and-disaster-recovery-software}

### Motivos para escolher o software SafeKit para continuidade de negócios e recuperação de desastres {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![Software simples de continuidade de negócios e recuperação de desastres com SafeKit](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


A configuração é a mesma, quer você implemente um cluster SafeKit em uma sala de servidores ou em duas salas de servidores remotas. O único requisito é uma LAN estendida ou uma VLAN estendida entre os locais remotos.

### Como implementar uma solução simples de alta disponibilidade entre duas salas de servidores remotas? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

Com SafeKit, você pode implantar facilmente o módulo mirror e o módulo <span class="notranslate farm-term" translate="no">farm</span> em servidores em salas de servidores remotas. Nenhuma configuração especial de cluster é necessária. SafeKit, portanto, combina continuidade de negócios e recuperação de desastres em uma única arquitetura simples. SafeKit também lida com o isolamento de rede sem um terceiro servidor ou um disco de quórum especial. Leia mais sobre [o gerenciamento de split brain](</pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Continuidade de negócios vs. soluções de backup {#business-continuity-vs-backup-solutions}

As soluções de continuidade de negócios e backup abordam diferentes cenários de falha. Elas são complementares, não intercambiáveis. O clustering de alta disponibilidade SafeKit garante a continuidade dos negócios. Ele mantém os aplicativos em execução com interrupção mínima quando um servidor ou um aplicativo falha, graças à replicação em tempo real e ao failover automático. As soluções de backup protegem contra perdas mais amplas, como ataques de ransomware ou erros do operador. Elas geralmente dependem de cópias de dados externas que você restaura posteriormente. A recuperação leva mais tempo e não há failover automático.

Saiba mais sobre [como combinar a alta disponibilidade SafeKit com backups de recuperação de desastres](</pt-br/best-practises/high-availability-disaster-recovery-hadr/>).


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}