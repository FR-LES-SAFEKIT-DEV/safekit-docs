---
title: "Heartbeat, failover e quórum em clusters Windows e Linux"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Como funcionam o heartbeat, o failover e o quórum em clusters Windows e Linux, e como o SafeKit evita o split brain sem disco de quórum nem terceiro servidor."
category: "best-practises"
lang: "pt-pt"
topics: "Quais são os diferentes cenários em caso de isolamento de rede num cluster?, Como funcionam os heartbeats e failover num cluster Windows ou Linux?, Split brain e quórum com servidores em duas salas de computadores remotas, Quórum de cluster simples com o checker split-brain SafeKit"
hashpart: "isolation, how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster, split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms, simple-cluster-quorum-with-the-safekit-split-brain-checker"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Heartbeat, failover e quórum em clusters Windows e Linux {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-pt-pt  %}}
 

## Como funcionam os heartbeats e failover num cluster Windows ou Linux? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### O que é um heartbeat? {#what-is-a-heartbeat}

O mecanismo básico para sincronizar dois servidores e detetar falhas de servidor é o **heartbeat**. É um fluxo de dados de monitorização numa rede partilhada pelos dois servidores.

O software SafeKit suporta vários heartbeats. Cada rede partilhada pelos dois servidores pode transmitir um heartbeat.

O mecanismo de heartbeat é usado para implementar clusters Windows e Linux. Está integrado no cluster mirror SafeKit com replicação de ficheiros em tempo real e failover.

### Heartbeats SafeKit {#safekit-heartbeats}

Em funcionamento normal, os dois servidores trocam os seus estados através dos canais heartbeat. Estes estados são PRIM, SECOND e os estados dos recursos. Eles também sincronizam os procedimentos de início e paragem da aplicação.

Por exemplo, durante um failover programado, o script de paragem da aplicação é executado primeiro no servidor primário. Em seguida, o script de arranque é executado no servidor secundário. Assim, os dados replicados no servidor secundário estão num estado seguro. Este estado corresponde a uma paragem limpa da aplicação.

### O que acontece quando todos os heartbeats se perdem? {#loss-of-all-heartbeats}

Quando um servidor perde todos os heartbeats, considera que o outro servidor está inativo. Em seguida, entra no estado ALONE.

Se o servidor no estado SECOND passar para o estado ALONE, a aplicação é reiniciada nesse servidor. Isto é um failover de aplicação.

Recomendam-se dois canais heartbeat em duas redes diferentes, mas não é obrigatório. Com duas redes, uma falha de rede não é confundida com uma falha de servidor.

## Split brain e quórum com servidores em duas salas de computadores remotas {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Heartbeat, failover e quórum num cluster Windows ou Linux](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Duas salas de computadores remotas {#remote-computer-rooms}

Com dois servidores em duas salas de computadores remotas, um cluster de alta disponibilidade pode proteger uma aplicação crítica.

Assim, a aplicação permanece disponível mesmo que um desastre destrua uma sala de computadores inteira.

### Split brain {#split-brain}

Se a rede entre as duas salas de computadores estiver isolada, todos os heartbeats são perdidos. Este é o problema do split brain: ambos os servidores iniciam a aplicação crítica.

### Complexidade das soluções habituais {#complexity-of-solutions}

Na maioria das vezes, um quórum é usado para resolver o problema do split brain. O quórum utiliza um terceiro servidor de quórum ou um disco de quórum especial. Evita ter dois servidores primários ao mesmo tempo.

Infelizmente, estes dispositivos de quórum adicionam custo e complexidade à arquitetura de agrupamento.

## Quórum de cluster simples com o checker split-brain SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### Checker split-brain SafeKit {#safekit-split-brain-checker}

Com o software de alta disponibilidade SafeKit, o quórum de um cluster Windows ou Linux não requer um terceiro servidor de quórum nem um disco de quórum. Um simples 🛠️ [checker split-brain](</pt-pt/resources/safekit-user-guide-82/#check_splitbrain>) é suficiente para evitar a execução da aplicação em ambos os servidores.

Quando todos os heartbeats entre os servidores são perdidos, o checker split-brain seleciona apenas um servidor para se tornar o primário. O outro servidor entra no estado WAIT. Ele espera até receber novamente os heartbeats do outro servidor. Em seguida, sincroniza os dados replicados do servidor primário e volta ao estado secundário.

### Como funciona o checker split-brain? {#how-the-split-brain-checker-works}

O servidor principal é eleito através de um ping para um endereço IP, chamado de testemunha. A testemunha é geralmente um router que está sempre disponível. Em caso de isolamento da rede, apenas o servidor que consegue alcançar a testemunha se torna principal no estado ALONE. O outro servidor entra no estado WAIT.

A testemunha não é testada permanentemente. É testada apenas quando todos os heartbeats são perdidos. Se a testemunha estiver inativa nesse momento, o cluster entra no estado WAIT-WAIT. Um administrador pode então reiniciar um dos servidores como primário com a consola web SafeKit.

### O que acontece sem um checker split-brain? {#what-happens-without-a-split-brain-checker}

Em caso de isolamento da rede, ambos os servidores entram no estado ALONE e executam a aplicação crítica. Os diretórios replicados ficam isolados. Cada aplicação trabalha nos seus próprios dados, no seu próprio diretório.

Quando a rede é restabelecida, SafeKit escolhe, por predefinição, o servidor que era PRIM antes do isolamento como o novo servidor primário. O outro servidor é forçado para o estado SECOND. Todos os seus dados são ressincronizados a partir do servidor PRIM.

Nota: no Windows, um servidor pode detetar um endereço IP duplicado e remover o seu endereço IP virtual. Nesse caso, um verificador SafeKit força um reinício.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
