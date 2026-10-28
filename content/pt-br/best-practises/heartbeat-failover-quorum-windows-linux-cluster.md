---
title: "Pulsação cardíaca, failover e quorum nos clusters Windows e Linux"
canonical: "https://safekit.eviden.com/pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Aprenda como funcionam os mecanismos de heartbeat, failover e quorum em um cluster. SafeKit propõe uma arquitetura sem SAN que elimina a necessidade de um terceiro servidor de quorum ou disco de quorum dedicado. Obtenha alta disponibilidade no Windows e Linux com um verificador de split-brain simples."
category: "best-practises"
lang: "pt-br"
topics: "Quais são os diferentes cenários em caso de isolamento de rede em um cluster? Como funcionam os heartbeats e o failover em um cluster Windows ou Linux ? Problema de split brain e quorum quando os servidores estão em duas salas de computadores remotas. Quorum de cluster simples com o verificador de split brain SafeKit . 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Pulsação, Failover e Quorum nos clusters Windows e Linux e {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-pt-br  %}}
 

## Como funcionam os heartbeats e o failover em um cluster Windows ou Linux ? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### O que é um batimento cardíaco? {#what-is-a-heartbeat}

O mecanismo básico para sincronizar dois servidores e detectar falhas em um servidor é o **heartbeat** , que consiste no monitoramento do fluxo de dados em uma rede compartilhada por um par de servidores.

O software SafeKit suporta tantos pulsos cardíacos quantas forem as redes compartilhadas por dois servidores. 

O mecanismo de heartbeat é usado para implementar os clusters Windows e Linux . Ele está integrado ao cluster SafeKit mirror com replicação de arquivos em tempo real e failover.

### SafeKit batimentos cardíacos {#safekit-heartbeats}

Em operação normal, os dois servidores trocam seus estados (PRIM, SECOND, os estados dos recursos) através dos canais de pulsação e sincronizam seus procedimentos de inicialização e parada de aplicativos.

Em particular, no caso de uma falha agendada, o script de parada que interrompe a aplicação é executado primeiro no servidor primário, antes da execução do script de inicialização no servidor secundário. Dessa forma, os dados replicados no servidor secundário ficam em um estado seguro, correspondente a uma parada limpa da aplicação.

### Perda de todos os batimentos cardíacos {#loss-of-all-heartbeats}

Quando todos os sinais vitais são perdidos em um servidor, esse servidor considera o outro servidor como inativo e entra no estado ALONE.

Se for o SEGUNDO servidor que entrar no estado SOZINHO, ocorrerá um failover da aplicação com reinicialização da mesma no servidor secundário.

Embora não seja obrigatório, é recomendável ter dois canais de heartbeat em duas redes diferentes para sincronizar os dois servidores, a fim de separar o caso de falha de rede do caso de falha do servidor.

## Problema de "cérebro dividido" e quorum quando os servidores estão em duas salas de computadores remotas {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![ Heartbeat, failover e quorum em um cluster Windows ou Linux ](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Salas de computadores remotas {#remote-computer-rooms}

Um cluster de alta disponibilidade que protege uma aplicação crítica pode ser implementado com dois servidores em duas salas de computadores geograficamente remotas.

Assim, a solução contribui para o desastre de uma sala cheia.

### Cérebro dividido {#split-brain}

Em uma situação de isolamento de rede entre as duas salas de computadores, todos os sinais de atividade (heartbeats) são perdidos e surge o problema de "cérebro dividido" (split brain).

Ambos os servidores iniciam a aplicação crítica.

### Complexidade das soluções {#complexity-of-solutions}

Na maioria das vezes, para resolver o problema de "split brain", o quorum é implementado com um terceiro servidor de quorum ou um disco de quorum especial para evitar a existência de dois servidores mestres. 

Infelizmente, esses novos dispositivos de quorum aumentam o custo e a complexidade da arquitetura geral de clusterização.

## Quórum de cluster simples com o verificador de split brain SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### Verificador de cérebro dividido SafeKit {#safekit-split-brain-checker}

Com o software de alta disponibilidade SafeKit , o quorum dentro de um cluster Windows ou Linux não requer um terceiro servidor de quorum nem um disco de quorum. Um verificador de split-brain simples [ ](</pt-br/resources/safekit-user-guide-82/#check_splitbrain>) é suficiente para evitar a execução dupla de um aplicativo.

Na perda de todos os sinais de pulsação entre os servidores, o verificador de "split brain" seleciona apenas um servidor para se tornar o primário. O outro servidor entra no estado de ESPERA até receber novamente os sinais de pulsação do outro servidor. Em seguida, ele retorna ao estado secundário após ter sincronizado os dados replicados do servidor primário.

### Como funciona o verificador de cérebro dividido? {#how-the-split-brain-checker-works}

A eleição do servidor primário é baseada no ping de um endereço IP, chamado de testemunha. A testemunha é normalmente um roteador que está sempre disponível. Em caso de isolamento de rede, apenas o servidor com acesso à testemunha será o primário (ALONE), os demais entrarão em estado de espera (WAIT).

O servidor testemunha não é testado permanentemente, mas apenas quando todos os sinais de pulsação são perdidos. Se, nesse momento, o servidor testemunha estiver inativo, o cluster entra no estado WAIT-WAIT e um administrador pode optar por reiniciar um dos servidores como primário através do console web SafeKit .

### O que acontece sem um verificador de "split brain"? {#what-happens-without-a-split-brain-checker}

Em caso de isolamento de rede, ambos os servidores entrarão no estado ALONE, executando a aplicação crítica. Os diretórios replicados ficam isolados e cada aplicação trabalha com seus próprios dados em seu próprio diretório.

Quando a rede é reconectada, SafeKit por padrão, escolhe o servidor que era PRIM antes do isolamento como o novo primário e força o outro como SECOND, com uma ressincronização de todos os seus dados a partir do PRIM.

Nota: Windows pode detectar um endereço IP duplicado em um servidor e remover o endereço IP virtual desse servidor. SafeKit possui um verificador para forçar uma reinicialização nesse caso.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}