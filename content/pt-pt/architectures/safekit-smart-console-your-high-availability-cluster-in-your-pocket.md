---
title: "Console Inteligente SafeKit : Seu Cluster de Alta Disponibilidade no Seu Bolso"
canonical: "https://safekit.eviden.com/pt-pt/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Gerencie clusters SafeKit com facilidade usando nosso Smart Console. Desfrute de configuração sem código, compatibilidade com smartphones e notificações PWA em tempo real. Elimine erros humanos e garanta alta disponibilidade na ponta dos seus dedos. Saiba mais."
category: "architectures"
lang: "pt-pt"
topics: "Smart Console: Alta Disponibilidade Intuitiva, Móvel e Livre de Erros, Sumário, Como um cluster SafeKit mirror funciona com o console web?, Como um cluster SafeKit `farm` funciona com o console web?, Como monitorar múltiplos módulos e múltiplos clusters através do console web?, Como monitorar alertas no console e gerenciar notificações por e-mail?, 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Console inteligente SafeKit : Seu cluster de alta disponibilidade no seu bolso {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: Alta disponibilidade intuitiva, móvel e livre de erros {#smart-console-intuitive-mobile-and-error-free-high-availability}

Redefina a forma como você gerencia a alta disponibilidade com uma solução criada para ** e simplicidade ** O SafeKit Web oferece uma experiência ** ** curva de aprendizado, permitindo que você configure e controle sua infraestrutura ** a necessidade de ** .

Esteja você em sua mesa ou em movimento, o painel de controle compatível com smartphones coloca o controle total do cluster na ponta dos seus dedos. Ao simplificar o gerenciamento dos módulos mirror e `farm` , o Smart Console ** elimina erros humanos ** e garante um processo de failover perfeito para seus sistemas mais críticos.

## Índice {#table-of-contents}

  * Como um cluster [ SafeKit funciona com o console ](#safekit-mirror-cluster) web? mirror
  * Como um cluster [ SafeKit funciona com o console ](#safekit-farm-cluster) web? `farm`
  * [ Como monitorar vários módulos e vários clusters através do console web? ](#multipe-modules-clusters)
  * [ Como monitorar alertas no console e gerenciar notificações por e-mail? ](#safekit-notifications-cluster)


## Como um cluster SafeKit mirror funciona com o console da web? {#safekit-mirror-cluster}

### Como configurar um cluster SafeKit Mirror ? {#safekit-mirror-cluster-configure}


Console Web ![ SafeKit : Painel de configuração de alta disponibilidade mostrando redes de heartbeat, configuração de IP virtual e replicação de diretório em tempo real para um cluster mirror . ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


O console web ** SafeKit ** oferece uma interface intuitiva para orquestrar alta disponibilidade para seus aplicativos críticos. Em apenas alguns passos, você pode configurar um cluster ** SafeKit mirror ** para garantir a continuidade dos negócios:

  * ** Failover de Aplicativo (Aba Macros): ** Defina os serviços de aplicativo específicos que devem ser reiniciados automaticamente em caso de falha.
  * Rede(s) de pulsação ** : ** Caminho(s) de comunicação dedicado(s) usado(s) pelos nós do cluster para monitorar continuamente a saúde e a disponibilidade uns dos outros e sincronizar as decisões de failover.
  * Gerenciamento de IP Virtual ** : ** Configurar o IP Virtual (VIP) para reconexão transparente do cliente após uma falha.
  * Replicação em tempo real ** : ** Selecione os diretórios críticos para replicação síncrona em nível de byte baseada em host.
  * Verificadores ** : ** Monitoram a integridade do aplicativo e acionam a recuperação automática se uma falha de processo for detectada.


O cluster SafeKit inclui um verificador de split-brain dedicado para resolver problemas de isolamento de rede sem a necessidade de uma terceira máquina testemunha ou uma rede de heartbeat adicional. Saiba mais sobre heartbeat, failover e quorum [ em um cluster ](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) .

### Como monitorar um cluster SafeKit mirror ? {#safekit-mirror-cluster-monitoring}


Console Web ![ SafeKit : Monitoramento em tempo real de um cluster mirror de 2 nós, mostrando os estados PRIM e SECOND com replicação de dados ativa. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


O console de gerenciamento ** SafeKit ** oferece uma visão unificada da sua infraestrutura de alta disponibilidade. Ele permite que os administradores monitorem o estado operacional ** ** do cluster e acompanhem a sincronização de dados em tempo real.

Para um cluster mirror de 2 nós, o console exibe claramente as funções de cada servidor:

  * ** PRIM (Primário): ** O nó ativo que atualmente executa o aplicativo e gerencia o IP virtual. Ele realiza gravações no armazenamento local e replicação em tempo real para o nó secundário.
  * ** SEGUNDO (Secundário): ** O nó de espera que recebe atualizações síncronas em nível de byte. Ele está pronto para assumir o controle instantaneamente se o Primário falhar.
  * Estado ** SOZINHO: ** Alerta visualmente quando o cluster está sendo executado em um único nó (por exemplo, durante a manutenção ou após uma falha), indicando que a redundância foi temporariamente perdida.
  * Progresso da ressincronização ** : ** Quando um nó com falha se recupera, seu status fica laranja durante a reintegração de dados em segundo plano, garantindo que não haja tempo de inatividade durante a fase de "retorno ao normal".


Além de ícones de status ** , a interface fornece orquestração de ** com um clique ( ** ), permitindo que você reatribua manualmente a função principal para manutenção planejada ** garantindo a disponibilidade contínua para a atividade `...` usuário.

## Como um cluster SafeKit `farm` funciona com o console da web? {#safekit-farm-cluster}

### Como configurar um cluster SafeKit `farm` ? {#safekit-farm-cluster-configuration}


Console Web: ![ SafeKit Configuração do cluster Farm para balanceamento de carga de rede e gerenciamento de IPs virtuais. ](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


O cluster ** SafeKit `farm` ** foi projetado para alta disponibilidade e escalabilidade de serviços. A configuração prioriza a distribuição simultânea do tráfego de entrada entre os dois nós.

  * ** Serviços com balanceamento de carga (guia Macros): ** Defina os serviços de aplicação específicos (por exemplo, Apache, IIS , Nginx ) que devem ser mantidos ativos em todos os nós.
  * Rede(s) de pulsação ** : Caminho(s) de comunicação ** usado(s) para detectar se um nó saiu da `farm` , acionando uma redistribuição imediata da carga.
  * ** IP Virtual ( `Farm` VIP): Ao contrário de um cluster ** , o `Farm` mirror é compartilhado entre os nós usando um algoritmo de filtragem de kernel para distribuir o tráfego de rede.
  * Regras de balanceamento de carga ** : ** Define a política de distribuição de tráfego com base no endereço IP ou porta de origem.
  * Verificadores ** : ** Monitoram a integridade do aplicativo e acionam a reinicialização automática se uma falha de processo for detectada.


### Como monitorar um cluster SafeKit `farm` ? {#safekit-farm-cluster-monitoring}


Console ![ SafeKit : Monitoramento de um cluster Farm de 2 nós, mostrando ambos os nós em estado ATIVO com balanceamento de carga ativo. ](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


O monitoramento de um cluster `farm` fornece visibilidade da natureza ativa-ativa ** ** da infraestrutura, onde todos os nós contribuem para o desempenho do aplicativo (mostrando 2 nós neste exemplo; escalável para nós adicionais):

  * Estado ATIVO ** (50% em 2 nós): ** Em um `farm` saudável, ambos os nós estão no estado "ATIVO" (50%), o que significa que ambos estão recebendo e processando ativamente solicitações de clientes por meio do IP virtual compartilhado.
  * ** Rebalanceamento automático: ** Se um nó falhar, o console mostra visualmente o nó restante assumindo 100% do tráfego. Não há atraso de "failover", pois o nó sobrevivente já está ativo (exceto por um tempo de detecção de alguns segundos).
  * Inserção de nó ** : ** Quando um nó reparado é reiniciado, ele passa do estado "PARADO" para "ATIVO" e começa automaticamente a receber sua parte da carga sem intervenção do administrador.
  * ** Sem Sincronização de Dados: ** Observe que em um cluster `farm` não há estado de ressincronização "Laranja", pois espera-se que os nós sejam sem estado ou compartilhem um banco de dados de backend (que pode ser protegido separadamente em um cluster mirror ).


Além de ícones de status simples, a interface oferece gerenciamento de nós com um clique (menu ** `...` ** ), permitindo que você pare ou inicie manualmente um nó para manutenção planejada, enquanto o IP virtual compartilhado redistribui automaticamente o tráfego sem interromper a atividade do usuário.

## Como monitorar vários módulos e vários clusters através do console web? {#multipe-modules-clusters}

### Visualização de múltiplos módulos em um único cluster {#safekit-multi-module}


Console Web: 4 módulos Hyper-V implantados no ](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966") cluster SafeKit 2 nós. ![


Ao implantar vários módulos ** em um único cluster ** 2 nós, o Console ** SafeKit fornece widgets de monitoramento individuais ** para cada módulo. Isso é particularmente valioso para soluções Hyper- ** ** SafeKit . 

Exemplo ** : ** Na figura com uma configuração com 4 VMs protegidas:

  * O console está conectado ao nó 1, que atua como um proxy para se comunicar com o nó 2.
  * O console exibe ** 4 widgets ** (um para cada VM).
  * Cada máquina virtual é executada em seu nó PRIM e replicada para seu nó SECOND.
  * Os administradores podem ver em tempo real que as VMs 1 e 2 estão ativas no nó 1, enquanto as VMs 2 e 3 estão ativas no nó 2.
  * Os administradores podem migrar facilmente uma VM de um nó para outro usando o menu ** `...` ** .


Essa visibilidade granular garante que, mesmo em ambientes de alta densidade, você mantenha o controle total e o conhecimento imediato de cada carga de trabalho replicada. 

### Visualização de múltiplos clusters {#safekit-multi-cluster}


Console Web: 4 clusters implantados ](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966") 8 servidores. ![ SafeKit


Ao implantar vários clusters ** ** em diversos servidores, você pode usar várias abas do navegador para se conectar a cada cluster ou utilizar o recurso PWA (Progressive Web App) do console. Ao usar o PWA, você elimina os menus de navegação do navegador, economizando espaço na tela para organizar melhor o monitoramento do cluster em sua área de trabalho. 

Exemplo: ** ** A figura mostra quatro consoles PWA monitorando quatro clusters de videovigilância: um no norte, um no sul, um no oeste e um no leste.

Nota ** : ** Quando você tem muitos clusters para exibir em uma única área de trabalho, SafeKit oferece notificações para ajudar a detectar erros em vários clusters. 

## Como monitorar alertas no console e gerenciar notificações por e-mail? {#safekit-notifications-cluster}

### Como posso receber alertas instantâneos sobre mudanças no estado do módulo e eventos críticos? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

O console web SafeKit aproveita os recursos nativos do navegador para emitir notificações instantâneas ** ** sempre que ocorre uma mudança no estado de um módulo. Isso garante que eventos críticos sejam levados ao seu conhecimento imediatamente, mesmo quando o console estiver em uma guia em segundo plano.

  * ** Segurança: ** As notificações exigem acesso via ** HTTPS ** ou localhost.
  * Integração com PWA ** ** ): Instale o console como um aplicativo web progressivo (PWA) em computadores ou dispositivos móveis para uma experiência semelhante à de um aplicativo nativo.
  * Alertas para dispositivos móveis: ** ** dispositivos móveis, as notificações estão disponíveis exclusivamente por meio do PWA, sendo o HTTPS obrigatório.


Esse mecanismo alerta os usuários imediatamente sobre eventos críticos, aprimorando a percepção imediata do status do cluster e reduzindo os tempos de resposta.

### Vídeo SafeKit : Console no Smartphone (0:54) {#demo-console}

&amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;gt; 

### Como posso configurar alertas de e-mail automatizados em SafeKit ? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit registra automaticamente todos os eventos principais do cluster ** nos logs do sistema ** , permitindo integração perfeita com qualquer ferramenta de monitoramento disponível no mercado. Além disso, inclui um Agente de Notificação por E-mail ** dedicado ** projetado para monitorar esses logs e enviar alertas críticos diretamente para sua caixa de entrada. Isso garante que as partes interessadas permaneçam informadas mesmo quando o console da web não estiver sendo monitorado ativamente. 

  * Agrupamento inteligente ** : ** Para reduzir o ruído, o agente agrupa eventos que ocorrem em um curto período em um único e-mail de resumo.
  * Cobertura total ** : ** O agente está instalado em todos os nós e deve ser configurado explicitamente com os detalhes do SMTP para ser ativado.
  * Destinatários personalizáveis: ** ** Direcione alertas para equipes de TI específicas ou aliases de gerenciamento para garantir uma resposta rápida.


Ao combinar alertas PWA em tempo real com agrupamento inteligente de e-mails, SafeKit oferece uma estratégia de notificação em várias camadas para operações de missão crítica.

### Vídeo SafeKit : Notificações por e-mail em caso de failover (1:04) {#demo-notifications}

&amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}