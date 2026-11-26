---
title: "Heartbeat, failover e Quorum em Clusters Windows e Linux"
canonical: "https://safekit.eviden.com/pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Como funcionam heartbeat, failover e quórum em clusters Windows e Linux, e como o SafeKit evita o split brain sem disco de quórum nem terceiro servidor."
category: "best-practises"
lang: "pt-br"
topics: "Quais são os diferentes cenários em caso de isolamento de rede em um cluster?, Como funcionam os heartbeats e failover em um cluster Windows ou Linux?, Split brain e quórum com servidores em duas salas de computadores remotas, Quórum de cluster simples com o checker split-brain SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Heartbeat, failover e Quorum em Clusters Windows e Linux {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-pt-br  %}}
 

## Como funcionam os heartbeats e failover em um cluster Windows ou Linux? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### O que é um heartbeat? {#what-is-a-heartbeat}

O mecanismo básico para sincronizar dois servidores e detectar falhas de servidor é o **heartbeat**. É um fluxo de dados de monitoramento em uma rede compartilhada pelos dois servidores.

O software SafeKit suporta vários heartbeats. Cada rede compartilhada pelos dois servidores pode transmitir um heartbeat.

O mecanismo heartbeat é usado para implementar clusters Windows e Linux. Ele é integrado ao cluster mirror SafeKit com replicação de arquivos em tempo real e failover.

### Heartbeats SafeKit {#safekit-heartbeats}

Em operação normal, os dois servidores trocam seus estados através dos canais heartbeat. Esses estados são PRIM, SECOND e os estados dos recursos. Eles também sincronizam os procedimentos de início e parada da aplicação.

Por exemplo, durante um failover programado, o script de parada do aplicativo é executado primeiro no servidor primário. Em seguida, o script de inicialização é executado no servidor secundário. Assim, os dados replicados no servidor secundário estão em um estado seguro. Esse estado corresponde a uma parada limpa do aplicativo.

### O que acontece quando todos os heartbeats são perdidos? {#loss-of-all-heartbeats}

Quando um servidor perde todos os heartbeats, ele considera que o outro servidor está inativo. Ele então entra no estado ALONE.

Se o servidor no estado SECOND for para o estado ALONE, o aplicativo será reiniciado neste servidor. Isso é um failover de aplicativo.

São recomendados dois canais heartbeat em duas redes diferentes, mas não é obrigatório. Com duas redes, uma falha de rede não é confundida com uma falha de servidor.

## Split brain e quórum com servidores em duas salas de computadores remotas {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Heartbeat, failover e quorum em um cluster Windows ou Linux](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Duas salas de computadores remotas {#remote-computer-rooms}

Com dois servidores em duas salas de computadores remotas, um cluster de alta disponibilidade pode proteger uma aplicação crítica.

Assim, a aplicação permanece disponível mesmo que um desastre destrua uma sala de computadores inteira.

### Split brain {#split-brain}

Se a rede entre as duas salas de computadores estiver isolada, todos os heartbeats são perdidos. Este é o problema do split brain: ambos os servidores iniciam a aplicação crítica.

### Complexidade das soluções usuais {#complexity-of-solutions}

Na maioria das vezes, um quórum é usado para resolver o problema do split brain. O quórum usa um terceiro servidor de quórum ou um disco de quórum especial. Ele evita ter dois servidores primários ao mesmo tempo.

Infelizmente, esses dispositivos de quórum adicionam custo e complexidade à arquitetura de cluster.

## Quórum de cluster simples com o checker split-brain SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### Checker split-brain SafeKit {#safekit-split-brain-checker}

Com o software de alta disponibilidade SafeKit, o quórum de um cluster Windows ou Linux não requer um terceiro servidor de quórum nem um disco de quórum. Um simples 🛠️ [checker split-brain](</pt-br/resources/safekit-user-guide-82/#check_splitbrain>) é suficiente para evitar a execução da aplicação em ambos os servidores.

Quando todos os heartbeats entre os servidores são perdidos, o checker split-brain seleciona apenas um servidor para se tornar o primário. O outro servidor entra no estado WAIT. Ele espera até receber os heartbeats do outro servidor novamente. Em seguida, ele sincroniza os dados replicados do servidor primário e volta para o estado secundário.

### Como funciona o checker split-brain? {#how-the-split-brain-checker-works}

O servidor primário é eleito com um ping para um endereço IP, chamado de testemunha. A testemunha é geralmente um roteador que está sempre disponível. Em caso de isolamento de rede, apenas o servidor que pode alcançar a testemunha se torna primário no estado ALONE. O outro servidor entra no estado WAIT.

A testemunha não é testada permanentemente. Ela só é testada quando todos os heartbeats são perdidos. Se a testemunha estiver inativa nesse momento, o cluster entra no estado WAIT-WAIT. Um administrador pode então reiniciar um dos servidores como primário com o console da web SafeKit.

### O que acontece sem um checker split-brain? {#what-happens-without-a-split-brain-checker}

Em caso de isolamento de rede, ambos os servidores entram no estado ALONE e executam o aplicativo crítico. Os diretórios replicados são isolados. Cada aplicativo trabalha com seus próprios dados em seu próprio diretório.

Quando a rede é reconectada, SafeKit escolhe por padrão o servidor que era PRIM antes do isolamento como o novo primário. O outro servidor é forçado ao estado SECOND. Todos os seus dados são ressincronizados do servidor PRIM.

Observação: no Windows, um servidor pode detectar um endereço IP duplicado e remover seu endereço IP virtual. Nesse caso, um verificador SafeKit força uma reinicialização.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
