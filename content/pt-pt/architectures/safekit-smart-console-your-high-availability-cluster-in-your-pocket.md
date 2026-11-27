---
title: "SafeKit Smart Console: O seu cluster de alta disponibilidade no seu bolso"
canonical: "https://safekit.eviden.com/pt-pt/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "SafeKit Smart Console: configure e monitorize os seus clusters de alta disponibilidade a partir de um browser ou smartphone, sem código e com notificações em tempo real."
category: "architectures"
lang: "pt-pt"
topics: "Smart Console: alta disponibilidade intuitiva e sem erros em computadores e dispositivos móveis, Índice, Como funciona um cluster mirror SafeKit com a consola web?, Como funciona um cluster farm SafeKit com a consola web?, Como monitorizar vários módulos e vários clusters através da consola web?, Como monitorizar os alertas na consola e gerir as notificações por e-mail?"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png"
schemaType: "TechArticle"
---

# SafeKit Smart Console: O seu cluster de alta disponibilidade no seu bolso {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: alta disponibilidade intuitiva e sem erros em computadores e dispositivos móveis {#smart-console-intuitive-mobile-and-error-free-high-availability}

Redefina a forma como gere a alta disponibilidade com uma solução concebida para **velocidade e simplicidade**. A Consola Web SafeKit oferece uma experiência **sem curva de aprendizagem**, permitindo-lhe configurar e controlar a sua infraestrutura **sem escrever qualquer código**.

Quer esteja na sua secretária ou em movimento, o painel de controlo compatível com smartphone coloca o controlo total do cluster na ponta dos seus dedos. Ao simplificar a gestão dos módulos mirror e <span class="notranslate farm-term" translate="no">farm</span>, a Smart Console **elimina o erro humano** e garante um processo de failover contínuo para os seus sistemas mais vitais.

## Índice {#table-of-contents}

  * [Como funciona um cluster mirror SafeKit com a consola web?](#safekit-mirror-cluster)
  * [Como funciona um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit com a consola web?](#safekit-farm-cluster)
  * [Como monitorizar vários módulos e vários clusters através da consola web?](#multipe-modules-clusters)
  * [Como monitorizar os alertas na consola e gerir as notificações por e-mail?](#safekit-notifications-cluster)


## Como funciona um cluster mirror SafeKit com a consola web? {#safekit-mirror-cluster}

### Como configurar um cluster mirror SafeKit? {#safekit-mirror-cluster-configure}


![Consola Web SafeKit: Painel de configuração de alta disponibilidade que mostra redes heartbeat, configuração de IP virtual e replicação de diretórios em tempo real para um cluster mirror.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


A **consola web SafeKit** oferece uma interface intuitiva para orquestrar a alta disponibilidade das suas aplicações críticas. Em apenas alguns passos, pode configurar um **cluster mirror SafeKit** para garantir a continuidade do negócio:

  * **Failover da Aplicação (Separador Macros):** Defina os serviços específicos da aplicação a serem reiniciados automaticamente em caso de falha.
  * **Rede(s) heartbeat:** Caminho(s) de comunicação dedicado(s) utilizado(s) pelos nós do cluster para monitorizar continuamente a integridade e disponibilidade uns dos outros e para sincronizar as decisões failover.
  * **Gestão de IP Virtual:** Configure o IP Virtual (VIP) para uma reconexão transparente do cliente após um failover.
  * **Replicação em Tempo Real:** Selecione os diretórios críticos para replicação síncrona ao nível de byte, baseada no anfitrião.
  * **Verificadores:** Monitorize a saúde da aplicação e acione uma recuperação automática se for detetada uma falha no processo.


O cluster SafeKit inclui um checker split-brain para resolver problemas de isolamento de rede sem a necessidade de uma terceira máquina testemunha ou de uma rede adicional de heartbeat. Saiba mais sobre [heartbeat ", failover e "quorum" num cluster](</pt-pt/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Como monitorizar um cluster mirror SafeKit? {#safekit-mirror-cluster-monitoring}


![Consola Web SafeKit: Monitorização em tempo real de um cluster mirror 2 nós, mostrando os estados PRIM e SECOND com replicação de dados ativa.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


A **consola de gestão SafeKit** oferece uma visão unificada da sua infraestrutura de alta disponibilidade. Permite aos administradores monitorizar o **estado operacional** do cluster e acompanhar a sincronização de dados em tempo real.

Para um cluster mirror de 2 nós, a consola exibe claramente as funções de cada servidor:

  * **PRIM (Primário):** O nó ativo que executa atualmente a aplicação e gere o IP Virtual. Executa escritas no armazenamento local e replicação em tempo real para o nó secundário.
  * **SECOND:** O nó de reserva recebe atualizações síncronas ao nível de byte. Está pronto para assumir o controlo instantaneamente se o Primário falhar.
  * **ALONE Estado:** Alerta visualmente quando o cluster está a ser executado num único nó (por exemplo, durante a manutenção ou após uma falha), indicando que a redundância foi temporariamente perdida.
  * **Progresso da Ressincronização:** Quando um nó que falhou recupera, o seu estado fica laranja durante a reintegração de dados em segundo plano, garantindo que não haja tempo de inatividade durante a fase de "regresso ao normal".


Além de simples ícones de estado, a interface fornece **orquestração failover com um clique** através do **menu `...`**, permitindo-lhe reatribuir manualmente a função primária para manutenção planeada, garantindo simultaneamente a disponibilidade contínua para a atividade do utilizador.

## Como funciona um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit com a consola web? {#safekit-farm-cluster}

### Como configurar um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#safekit-farm-cluster-configuration}


![Consola Web SafeKit: configuração cluster farm para balanceamento de carga de rede e gestão de IP virtual.](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


O **cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** foi concebido para alta disponibilidade e escalabilidade de serviços. A configuração foca-se na distribuição do tráfego de entrada por ambos os nós em simultâneo:

  * **Serviços com Balanceamento de Carga (separador Macros):** Defina os serviços de aplicação específicos (por exemplo, Apache, IIS, Nginx) a serem mantidos ativos em todos os nós.
  * **Rede(s) heartbeat:** Caminho(s) de comunicação utilizado(s) para detetar se um nó saiu da <span class="notranslate farm-term" translate="no">farm</span>, acionando uma redistribuição imediata da carga.
  * **IP virtual (VIP <span class="notranslate farm-term" translate="no">farm</span>):** Ao contrário de um cluster mirror, o endereço IP virtual de um cluster <span class="notranslate farm-term" translate="no">farm</span> é partilhado entre todos os nós, e um algoritmo de filtragem do kernel distribui o tráfego de rede.
  * **Regras de Balanceamento de Carga:** Defina a política de distribuição de tráfego com base no endereço IP de origem ou na porta.
  * **Verificadores:** Monitorize a saúde da aplicação e acione um reinício automático se for detetada uma falha no processo.


### Como monitorizar um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#safekit-farm-cluster-monitoring}


![Consola SafeKit: Monitorização de um cluster farm virtuais, mostrando ambos os nós no estado UP com balanceamento de carga ativo.](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


A monitorização de um cluster <span class="notranslate farm-term" translate="no">farm</span> proporciona visibilidade sobre a natureza **ativa-ativa** da infraestrutura, onde todos os nós contribuem para o desempenho da aplicação (mostrando 2 nós neste exemplo; escalável para nós adicionais):

  * **Estado UP (50% em 2 nós):** Numa <span class="notranslate farm-term" translate="no">farm</span> saudável, ambos os nós estão no estado " UP " (50%), o que significa que estão ambos a receber e a processar ativamente pedidos de clientes através do IP Virtual partilhado.
  * **Reequilíbrio Automático:** Se um nó falhar, a consola mostra visualmente o nó restante a receber 100% do tráfego. Não há atraso de " failover ", pois o nó sobrevivente já está ativo (além de um tempo de deteção de alguns segundos).
  * **Inserção de Nó:** Quando um nó reparado é reiniciado, ele transita de " STOP " para " UP " e começa automaticamente a receber a sua porção da carga sem intervenção do administrador.
  * **Sem Sincronização de Dados:** Tenha em atenção que, num cluster <span class="notranslate farm-term" translate="no">farm</span>, não existe o estado de ressincronização laranja, uma vez que se espera que os nós sejam sem estado ou partilhem uma base de dados de backend (que pode ser protegida separadamente num cluster mirror).


Além de simples ícones de estado, a interface oferece gestão de nós com um clique através do **menu `...`**, permitindo-lhe parar ou iniciar manualmente um nó para manutenção planeada, enquanto o IP Virtual partilhado redistribui automaticamente o tráfego sem interromper a atividade do utilizador.

## Como monitorizar vários módulos e vários clusters através da consola web? {#multipe-modules-clusters}

### Visualização de múltiplos módulos dentro de um único cluster {#safekit-multi-module}


![Consola Web SafeKit: 4 módulos Hyper-V implementados no mesmo cluster de 2 nós.](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Ao implementar **vários módulos** num único cluster de 2 nós, a Consola Web SafeKit fornece **widgets de monitorização individuais** para cada módulo. Isto é particularmente valioso para as soluções **SafeKit Hyper-V**. 

**Exemplo:** Na figura com uma configuração de 4 máquinas virtuais protegidas:

  * A consola está ligada ao node1, que funciona como um proxy para comunicar com node2.
  * A consola exibe **4 widgets** (um para cada máquina virtual).
  * Cada máquina virtual é executada no seu nó PRIM e é replicada para o seu nó SECOND.
  * Os administradores podem ver em tempo real quais as máquinas virtuais que estão ativas em cada nó: VM1 e VM2 no node1, VM3 e VM4 no node2.
  * Os administradores podem facilmente migrar uma máquina virtual de um nó para o outro usando o **menu `...`**.


Esta visibilidade granular garante que, mesmo em ambientes de alta densidade, se mantenha o controlo total e a consciência imediata de cada carga de trabalho replicada. 

### Visualização de múltiplos clusters {#safekit-multi-cluster}


![Consola Web SafeKit: 4 clusters implementados em 8 servidores.](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Ao implementar **vários clusters** em vários servidores, pode utilizar vários separadores do navegador para se ligar a cada cluster ou utilizar a funcionalidade PWA (Progressive Web App) da consola. Ao utilizar a PWA, remove os menus de navegação do navegador, poupando espaço no ecrã para organizar melhor a monitorização do cluster no seu ambiente de trabalho. 

**Exemplo:** A figura mostra quatro consolas PWA a monitorizar quatro clusters de videovigilância localizados a norte, sul, oeste e leste.

**Nota:** Quando existem demasiados clusters para exibir num único ambiente de trabalho, SafeKit oferece notificações para ajudar a detetar erros em vários clusters. 

## Como monitorizar os alertas na consola e gerir as notificações por e-mail? {#safekit-notifications-cluster}

### Como posso receber alertas instantâneos sobre alterações de estado do módulo e eventos críticos? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

A consola web SafeKit utiliza as capacidades nativas do navegador para emitir **notificações instantâneas** sempre que ocorre uma alteração no estado de um módulo. Isto garante que os eventos críticos são imediatamente trazidos à sua atenção, mesmo quando a consola está num separador em segundo plano.

  * **Segurança:** As notificações requerem acesso via **HTTPS** ou localhost.
  * **Integração PWA:** Instale a consola como uma Aplicação Web Progressiva (PWA) no computador ou telemóvel para uma experiência semelhante a uma aplicação nativa.
  * **Alertas Móveis:** Em dispositivos móveis, as notificações estão disponíveis exclusivamente através da PWA, sendo o HTTPS obrigatório.


Este mecanismo alerta os utilizadores imediatamente sobre eventos críticos, melhorando a perceção imediata do estado do cluster e reduzindo os tempos de resposta.

### Vídeo SafeKit: Consola no Smartphone (0:54) {#demo-console}


### Como posso configurar alertas de e-mail automáticos no SafeKit? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit regista automaticamente todos **os principais eventos do cluster nos registos do sistema**, permitindo uma integração perfeita com qualquer ferramenta de monitorização disponível no mercado. Além disso, inclui um **Agente de Notificação por E-mail** dedicado, concebido para monitorizar estes registos e enviar alertas críticos diretamente para a sua caixa de entrada. Isto garante que as partes interessadas se mantêm informadas, mesmo quando a consola web não está a ser ativamente monitorizada. 

  * **Agrupamento Inteligente:** Para reduzir o ruído, o agente agrupa os eventos que ocorrem num curto período de tempo num único e-mail de resumo.
  * **Cobertura total:** O agente é instalado em todos os nós e deve ser explicitamente configurado com os detalhes do SMTP para ser ativado.
  * **Destinatários personalizáveis:** Encaminhe alertas diretamente para equipas de TI específicas ou para endereços de gestão para garantir uma resposta rápida.


Ao combinar alertas PWA em tempo real com agrupamento inteligente de e-mails, SafeKit oferece uma estratégia de notificação em várias camadas para operações de missão crítica.

### Vídeo SafeKit: Notificações por e-mail em caso de failover (1:04) {#demo-notifications}



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}