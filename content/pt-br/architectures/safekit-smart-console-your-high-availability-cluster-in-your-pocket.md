---
title: "SafeKit Smart Console: O seu cluster de alta disponibilidade no seu bolso"
canonical: "https://safekit.eviden.com/pt-br/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Gerencie clusters SafeKit com facilidade usando nosso Smart Console. Desfrute de configuração sem código, compatibilidade com smartphone e notificações PWA em tempo real. Elimine erros humanos e garanta alta disponibilidade na palma da sua mão. Saiba mais."
category: "architectures"
lang: "pt-br"
topics: "Smart Console: alta disponibilidade intuitiva e sem erros em computadores e dispositivos móveis, Índice, Como funciona um cluster mirror SafeKit com o console da web?, Como funciona um cluster farm SafeKit com o console da web?, Como monitorar vários módulos e vários clusters através do console da web?, Como monitorar alertas no console e gerenciar notificações por e-mail?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png"
---

# SafeKit Smart Console: O seu cluster de alta disponibilidade no seu bolso {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: alta disponibilidade intuitiva e sem erros em computadores e dispositivos móveis {#smart-console-intuitive-mobile-and-error-free-high-availability}

Redefina como você gerencia a alta disponibilidade com uma solução criada para **velocidade e simplicidade**. O SafeKit Web Console oferece uma experiência **sem curva de aprendizado**, permitindo que você configure e controle sua infraestrutura **sem escrever nenhum código**.

Seja na sua mesa ou em movimento, o painel compatível com smartphone coloca o controle total do cluster na ponta dos seus dedos. Ao otimizar o gerenciamento de módulos mirror e <span class="notranslate farm-term" translate="no">farm</span>, o Smart Console **elimina erros humanos** e garante um processo failover perfeito para seus sistemas mais vitais.

## Índice {#table-of-contents}

  * [Como funciona um cluster mirror SafeKit com o console da web?](#safekit-mirror-cluster)
  * [Como funciona um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit com o console da web?](#safekit-farm-cluster)
  * [Como monitorar vários módulos e vários clusters através do console da web?](#multipe-modules-clusters)
  * [Como monitorar alertas no console e gerenciar notificações por e-mail?](#safekit-notifications-cluster)


## Como funciona um cluster mirror SafeKit com o console da web? {#safekit-mirror-cluster}

### Como configurar um cluster mirror SafeKit? {#safekit-mirror-cluster-configure}


![Console Web SafeKit: painel de configuração de alta disponibilidade mostrando redes heartbeat, configuração de IP virtual e replicação de diretório em tempo real para um cluster mirror.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


O **console da web SafeKit** fornece uma interface intuitiva para orquestrar alta disponibilidade para seus aplicativos críticos. Em apenas algumas etapas, você pode configurar um **cluster mirror SafeKit** para garantir a continuidade dos negócios:

  * **Failover de Aplicativo (Guia Macros):** Defina os serviços de aplicativo específicos a serem reiniciados automaticamente em caso de falha.
  * **Rede(s) heartbeat:** Caminho(s) de comunicação dedicado(s) usado(s) pelos nós do cluster para monitorar continuamente a integridade e a disponibilidade um do outro e sincronizar as decisões failover.
  * **Gerenciamento de IP Virtual:** configure o IP Virtual (VIP) para reconexão transparente do cliente após um failover.
  * **Replicação em tempo real:** selecione os diretórios críticos para replicação síncrona em nível de byte baseada no host.
  * **Verificadores:** Monitore a integridade do aplicativo e acione uma recuperação automática se for detectada uma falha no processo.


O cluster SafeKit inclui um checker split-brain dedicado para resolver problemas de isolamento de rede sem a necessidade de uma terceira máquina testemunha ou de uma rede heartbeat adicional. Saiba mais sobre [heartbeat, failover e quórum em um cluster](</pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Como monitorar um cluster mirror SafeKit? {#safekit-mirror-cluster-monitoring}


![Console Web SafeKit: Monitoramento em tempo real de um cluster mirror de 2 nós, mostrando os estados PRIM e SECOND com replicação de dados ativa.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


O **console de gerenciamento SafeKit** oferece uma visão unificada da sua infraestrutura de alta disponibilidade. Ele permite que os administradores monitorem o **estado operacional** do cluster e acompanhem a sincronização de dados em tempo real.

Para um cluster mirror de 2 nós, o console exibe claramente as funções de cada servidor:

  * **PRIM (Primário):** O nó ativo que executa atualmente o aplicativo e gerencia o IP virtual. Ele executa gravações no armazenamento local e replicação em tempo real para o nó secundário.
  * **SECOND:** O nó de espera recebe atualizações síncronas em nível de byte. Ele está pronto para assumir o controle instantaneamente se o primário falhar.
  * **ALONE Estado:** Alerta visualmente quando o cluster está sendo executado em um único nó (por exemplo, durante a manutenção ou após uma falha), indicando que a redundância foi temporariamente perdida.
  * **Progresso da ressincronização:** quando um nó com falha é recuperado, seu status fica laranja durante a reintegração de dados em segundo plano, garantindo que não haja tempo de inatividade durante a fase de "retorno ao normal".


Além de ícones de status simples, a interface fornece **orquestração failover com um clique** através do **menu `...`**, permitindo que você reatribua manualmente a função primária para manutenção planejada, garantindo a disponibilidade contínua para a atividade do usuário.

## Como funciona um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit com o console da web? {#safekit-farm-cluster}

### Como configurar um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#safekit-farm-cluster-configuration}


![Console Web SafeKit: configuração cluster farm para balanceamento de carga de rede e gerenciamento de IP virtual.](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


O **cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** foi projetado para alta disponibilidade e escalabilidade de serviços. A configuração foca na distribuição do tráfego de entrada em ambos os nós simultaneamente:

  * **Serviços com balanceamento de carga (guia Macros):** defina os serviços de aplicativos específicos (por exemplo, Apache, IIS, Nginx) a serem mantidos ativos em todos os nós.
  * **Rede(s) heartbeat:** Caminho(s) de comunicação usado(s) para detectar se um nó saiu da <span class="notranslate farm-term" translate="no">farm</span>, acionando uma redistribuição imediata da carga.
  * **IP virtual (VIP <span class="notranslate farm-term" translate="no">farm</span>):** ao contrário de um cluster mirror, o endereço IP virtual de um cluster <span class="notranslate farm-term" translate="no">farm</span> é compartilhado entre todos os nós, e um algoritmo de filtragem do kernel distribui o tráfego de rede.
  * **Regras de balanceamento de carga:** defina a política de distribuição de tráfego com base no endereço IP de origem ou na porta.
  * **Verificadores:** Monitore a integridade do aplicativo e acione uma reinicialização automática se for detectada uma falha no processo.


### Como monitorar um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#safekit-farm-cluster-monitoring}


![Console SafeKit: Monitoramento de um cluster farm de 2 nós, mostrando ambos os nós no estado UP com balanceamento de carga ativo.](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


O monitoramento de um cluster <span class="notranslate farm-term" translate="no">farm</span> fornece visibilidade sobre a natureza **ativa-ativa** da infraestrutura, onde todos os nós contribuem para o desempenho do aplicativo (mostrando 2 nós neste exemplo; escalável para nós adicionais):

  * **Estado UP (50% em 2 nós):** Em uma <span class="notranslate farm-term" translate="no">farm</span> íntegra, ambos os nós estão no estado " UP " (50%), o que significa que ambos estão recebendo e processando ativamente as solicitações do cliente por meio do IP virtual compartilhado.
  * **Rebalanceamento automático:** se um nó falhar, o console mostra visualmente o nó restante recebendo 100% do tráfego. Não há atraso de " failover ", pois o nó sobrevivente já está ativo (além de um tempo de detecção de alguns segundos).
  * **Inserção de nó:** quando um nó reparado é reiniciado, ele transita de " STOP " para " UP " e começa automaticamente a receber sua parte da carga sem intervenção do administrador.
  * **Sem sincronização de dados:** observe que, em um cluster <span class="notranslate farm-term" translate="no">farm</span>, não há estado de ressincronização laranja, pois espera-se que os nós sejam sem estado ou compartilhem um banco de dados de backend (que pode ser protegido separadamente em um cluster mirror).


Além de ícones de status simples, a interface fornece gerenciamento de nó com um clique através do **menu `...`**, permitindo que você pare ou inicie manualmente um nó para manutenção planejada, enquanto o IP virtual compartilhado redistribui automaticamente o tráfego sem interromper a atividade do usuário.

## Como monitorar vários módulos e vários clusters através do console da web? {#multipe-modules-clusters}

### Visualização de vários módulos em um único cluster {#safekit-multi-module}


![Console Web SafeKit: 4 módulos Hyper-V implantados no mesmo cluster de 2 nós.](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Ao implantar **vários módulos** em um único cluster de 2 nós, o SafeKit Web Console fornece **widgets de monitoramento individuais** para cada módulo. Isso é particularmente valioso para soluções **SafeKit Hyper-V**. 

**Exemplo:** Na figura com uma configuração de 4 VMs protegidas:

  * O console está conectado ao node1, que atua como um proxy para se comunicar com node2.
  * O console exibe **4 widgets** (um para cada VM).
  * Cada VM é executada em seu nó PRIM e é replicada para seu nó SECOND.
  * Os administradores podem ver em tempo real quais VMs estão ativas em cada nó: VM1 e VM2 no node1, VM3 e VM4 no node2.
  * Os administradores podem migrar facilmente uma máquina virtual de um nó para o outro usando o **menu `...`**.


Essa visibilidade granular garante que, mesmo em ambientes de alta densidade, você mantenha o controle total e o conhecimento imediato de cada carga de trabalho replicada. 

### Visualização de múltiplos clusters {#safekit-multi-cluster}


![Console Web SafeKit: 4 clusters implantados em 8 servidores.](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Ao implantar **vários clusters** em vários servidores, você pode usar várias guias do navegador para se conectar a cada cluster ou utilizar o recurso PWA (Progressive Web App) do console. Ao usar o PWA, você remove os menus de navegação do navegador, economizando espaço na tela para organizar melhor o monitoramento do cluster em sua área de trabalho. 

**Exemplo:** A figura mostra quatro consoles PWA monitorando quatro clusters de videovigilância localizados no norte, sul, oeste e leste.

**Observação:** Quando você tem muitos clusters para exibir em uma única área de trabalho, SafeKit oferece notificações para ajudar a detectar erros em vários clusters. 

## Como monitorar alertas no console e gerenciar notificações por e-mail? {#safekit-notifications-cluster}

### Como posso receber alertas instantâneos sobre mudanças de estado do módulo e eventos críticos? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

O console web SafeKit aproveita os recursos nativos do navegador para emitir **notificações instantâneas** sempre que ocorre uma alteração no estado de um módulo. Isso garante que eventos críticos sejam trazidos à sua atenção imediatamente, mesmo quando o console está em uma aba em segundo plano.

  * **Segurança:** As notificações exigem acesso via **HTTPS** ou localhost.
  * **Integração PWA:** instale o console como um Progressive Web App (PWA) no desktop ou no celular para uma experiência semelhante à de um aplicativo nativo.
  * **Alertas para dispositivos móveis:** Em dispositivos móveis, as notificações estão disponíveis exclusivamente através da PWA, sendo o HTTPS obrigatório.


Este mecanismo alerta os usuários imediatamente sobre eventos críticos, aumentando a conscientização rápida sobre o status do cluster e reduzindo os tempos de resposta.

### Vídeo SafeKit: Console no Smartphone (0:54) {#demo-console}


### Como posso configurar alertas de e-mail automáticos no SafeKit? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit registra automaticamente todos **os principais eventos do cluster nos logs do sistema**, permitindo uma integração perfeita com qualquer ferramenta de monitoramento do mercado. Além disso, ele inclui um **Agente de Notificação por E-mail** dedicado, projetado para monitorar esses logs e entregar alertas críticos diretamente na sua caixa de entrada. Isso garante que as partes interessadas permaneçam informadas mesmo quando o console da web não estiver sendo ativamente monitorado. 

  * **Agrupamento inteligente:** para reduzir o ruído, o agente agrupa os eventos que ocorrem em um curto período em um único e-mail de resumo.
  * **Cobertura total:** o agente é instalado em todos os nós e deve ser configurado explicitamente com os detalhes do SMTP para ser ativado.
  * **Destinatários personalizáveis:** envie alertas diretamente para equipes de TI específicas ou aliases de gestão para garantir uma resposta rápida.


Ao combinar alertas PWA em tempo real com o agrupamento inteligente de e-mails, SafeKit oferece uma estratégia de notificação em várias camadas para operações de missão crítica.

### Vídeo SafeKit: Notificações por e-mail em caso de failover (1:04) {#demo-notifications}



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}