---
title: "Como funciona um endereço IP virtual em um cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-br/best-practises/how-a-virtual-ip-address-works/"
description: "Veja como o SafeKit move um IP virtual em caso de failover usando GARP, balanceadores de carga, CLI de nuvem ou BGP."
category: "best-practises"
lang: "pt-br"
topics: "O que é um endereço IP virtual em um cluster de alta disponibilidade?, Implementação do endereço IP virtual no SafeKit, Como funciona um endereço IP virtual na mesma sub-rede (cluster Mirror), Como funciona um endereço IP virtual entre sub-redes diferentes com um balanceador de carga (cluster Mirror), Como funciona um endereço IP virtual entre sub-redes diferentes com CLIs de provedores de nuvem (cluster Mirror), Como funciona um endereço IP virtual entre sub-redes diferentes com BGP (cluster Mirror), Como funciona o redirecionamento DNS entre sub-redes diferentes (cluster Mirror), Como funciona o balanceamento de carga de um IP virtual em um cluster Farm na mesma sub-rede, Balanceamento de carga de um IP virtual entre sub-redes diferentes (cluster Farm), Comparação de implementação, latência e transparência da aplicação, Perguntas frequentes sobre IP virtual, 🔍 Explore o SafeKit"
---

# Como funciona um endereço IP virtual em um cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual em um cluster de alta disponibilidade? {#virtual-ip-definition}

Um **endereço IP virtual** é o endereço único usado pelos clientes para se conectar a uma aplicação em um [cluster de alta disponibilidade](</pt-br/>). Ele não está vinculado a um servidor específico. Durante um failover, ele é movido para o servidor que executa a aplicação. Os clientes não precisam alterar a configuração.

**Princípio fundamental do SafeKit:** o endereço IP virtual é **configurado localmente no servidor** que executa a aplicação. A aplicação é iniciada nesse endereço e recebe o endereço IP original do cliente. Por isso, muitas aplicações funcionam corretamente com o SafeKit sem alterações. O SafeKit oferece dois tipos de endereço IP virtual:

  * **Endereço IP virtual primário/secundário em um cluster Mirror:** o endereço IP virtual fica ativo somente no servidor primário. Durante um failover, ele é movido para o servidor secundário.
  * **Endereço IP virtual com balanceamento de carga de rede em um cluster <span class="notranslate farm-term" translate="no">farm</span>:** o endereço IP virtual fica ativo em todos os servidores ao mesmo tempo. O tráfego é distribuído entre eles.

## Implementação do endereço IP virtual no SafeKit {#safekit-virtual-ip-implementation}

Este artigo explica como o SafeKit move o endereço IP virtual em cada arquitetura de rede:

  * **Mesma sub-rede ou LAN estendida (clusters [Mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet)):** o SafeKit configura o endereço IP virtual no servidor e envia um **ARP gratuito (GARP)**. Não é necessário hardware externo. Essa é a solução mais transparente, pois o SafeKit implementa todo o mecanismo.
  * **Sub-redes diferentes com um balanceador de carga (clusters [Mirror](#virtual-ip-different-subnets-failover) e [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets)):** o balanceador usa a **verificação de integridade do SafeKit** para encaminhar o tráfego ao servidor correto. O integrador configura o balanceador.
  * **[Sub-redes diferentes com CLIs de provedores de nuvem](#virtual-ip-cloud-cli-failover) (cluster Mirror):** o script `start_prim` do SafeKit chama a CLI da nuvem para mover o endereço IP virtual. O integrador escreve o script.
  * **[Sub-redes diferentes com BGP](#virtual-ip-bgp-failover) (cluster Mirror):** o servidor primário anuncia o endereço IP virtual aos roteadores. O integrador escreve o script.
  * **[Sub-redes diferentes com redirecionamento DNS](#virtual-ip-vs-dns-redirection-failover) (cluster Mirror):** o script `start_prim` do SafeKit altera o registro DNS do nome virtual para apontar para o endereço IP físico do novo servidor primário. O integrador escreve o script. Não existe um único endereço IP virtual, e esse método não é confiável para todos os clientes.

Neste artigo:

  * [Comparação de implementação, latência e transparência da aplicação](#virtual-ip-methods-comparison)
  * [Perguntas frequentes sobre endereço IP virtual](#virtual-ip-faq)
  * [🔍 Explore o SafeKit](#hub)

![Comparação do comportamento dos endereços IP virtuais no Evidian SafeKit: IP flutuante no nó ativo em clusters Mirror e balanceamento de carga de rede em todos os nós dos clusters Farm.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementação de endereços IP virtuais em clusters Mirror e <span class="notranslate farm-term" translate="no">Farm</span> com o SafeKit.**

## Como funciona um endereço IP virtual na mesma sub-rede (cluster Mirror) {#virtual-ip-same-subnet-failover}

- [Testar o endereço IP virtual primário/secundário em um cluster Mirror do SafeKit](/pt-br/best-practises/test-primary-backup-vip-mirror/)

### Failover automático e redirecionamento de rede em uma sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Em uma rede local, o **SafeKit** gerencia automaticamente o endereço IP virtual e o failover da aplicação.

### Cluster Mirror local: failover de dois nós no Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Mecanismo de failover do endereço IP virtual do SafeKit entre dois servidores na mesma sub-rede](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Em um **cluster Mirror do SafeKit**, os dois nós estão na mesma sub-rede. A alta disponibilidade usa um **endereço IP virtual**. O SafeKit gerencia esse endereço na pilha de rede do sistema operacional. Não é necessário hardware especial. O endereço IP virtual é adicionado aos endereços IP físicos dos servidores 1 e 2 por meio de **alias de IP**. Os clientes sempre se conectam ao endereço IP virtual.

#### Alias de IP e suporte a vários endereços IP virtuais (VIPs) no SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

O endereço IP virtual é um terceiro endereço IP que se move entre os nós. O SafeKit pode gerenciar **vários endereços IP virtuais** em um cluster. Eles podem ser configurados na mesma placa de rede ou em placas diferentes. Assim, cada serviço pode ter seu próprio endereço IP virtual.

#### Mecanismo de failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

O failover não exige nenhuma ação manual. Em operação normal, o endereço IP virtual está associado ao **endereço MAC do servidor 1 (mac1)**. Se o servidor 1 falhar, o SafeKit executará três ações:

  * **Alias do endereço IP virtual:** o SafeKit configura o endereço IP virtual como alias na placa de rede do servidor 2, o novo servidor primário. Em seguida, o sistema operacional envia mensagens pela rede para anunciar o endereço IP virtual.
  * **GARP:** o SafeKit também envia mensagens de **ARP gratuito (GARP)**. Switches de rede e clientes atualizam o cache ARP. O endereço IP virtual passa a estar associado ao **endereço MAC do servidor 2 (mac2)**.
  * **Recuperação da aplicação:** o SafeKit reinicia os serviços da aplicação no servidor 2.

#### Data centers remotos e VLANs estendidas {#remote-data-centers--extended-vlans}

A **solução na mesma sub-rede descrita acima** também funciona para **recuperação de desastres (DR)** entre locais remotos. Muitas vezes, é a melhor opção quando os locais estão conectados por uma **LAN estendida ou VLAN estendida**. Os dois locais ficam, então, na mesma sub-rede. Isso simplifica a rede e elimina a necessidade de protocolos de roteamento complexos.

> **⚠️ Observação:** o redirecionamento na camada 2 com ARP gratuito é a **solução mais transparente** para as aplicações. A aplicação recebe o endereço IP original do cliente, e o endereço IP virtual é configurado localmente. **Muitas aplicações precisam** de um endereço IP virtual local. Sem ele, **podem não funcionar corretamente**. Nessa configuração na mesma sub-rede, o SafeKit implementa todo o mecanismo, sem necessidade de integração especial.

## Como funciona um endereço IP virtual entre sub-redes diferentes com um balanceador de carga (cluster Mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga com verificações de integridade do SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de failover de um endereço IP virtual usando um balanceador de carga entre duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando os nós estão em **sub-redes diferentes**, o ARP gratuito não consegue mover o endereço IP virtual. Nesse caso, o endereço IP virtual fica no **balanceador de carga**, que encaminha o tráfego ao servidor primário.

O SafeKit fornece uma **URL de verificação de integridade** em cada nó:

  * **Primário (PRIM):** retorna `HTTP 200 OK`. O balanceador envia tráfego para esse nó.
  * **Secundário (SECOND):** retorna `HTTP 404 NOT FOUND`. O balanceador não envia tráfego para esse nó.

Durante o failover, o SafeKit altera as respostas e o balanceador encaminha o tráfego ao novo servidor primário. Essa é a solução padrão entre **zonas de disponibilidade** na [**AWS**](</pt-br/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</pt-br/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</pt-br/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Observação:** o SafeKit fornece a verificação de integridade. O balanceador de carga é fornecido pela sua rede ou pelo provedor de nuvem.

### O problema: o balanceador de carga possui o endereço IP virtual {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Quando se usa apenas um balanceador de carga, os clientes se conectam ao endereço IP virtual. O balanceador o traduz via NAT para o **endereço IP físico** do servidor primário. O cliente usa o endereço virtual, mas o servidor usa seu endereço físico e não vê o endereço IP virtual.

### Manter o endereço IP virtual configurado localmente no servidor primário {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Algumas aplicações usam o endereço IP virtual como endereço do servidor. Elas só funcionam corretamente se esse endereço também estiver **configurado localmente no servidor primário**. Assim:

  * os serviços podem ser iniciados no endereço IP virtual;
  * o servidor pode acessar os próprios serviços usando esse endereço;
  * a autenticação funciona com esse endereço.

**Recomendação:** use um modo de balanceador que mantenha o endereço IP virtual como endereço de destino, por exemplo, Floating IP ou Direct Server Return. Em seguida, configure o endereço IP virtual localmente no servidor primário. O método depende da sub-rede do endereço IP virtual:

  * **O endereço IP virtual está na mesma sub-rede dos endereços IP físicos dos servidores:** mantenha a seção `<vip>` no módulo SafeKit. O SafeKit configura automaticamente o endereço IP virtual como alias na placa de rede associada ao endereço IP físico.
  * **O endereço IP virtual está em uma sub-rede diferente:** não configure `<vip>` no SafeKit. Use o script `start_prim` para configurar o endereço IP virtual em uma interface dedicada, como loopback, antes de iniciar a aplicação. Use `stop_prim` para removê-lo após parar a aplicação. O integrador escreve esses comandos, que não são fornecidos pelo produto SafeKit.

## Como funciona um endereço IP virtual entre sub-redes diferentes com CLIs de provedores de nuvem (cluster Mirror) {#virtual-ip-cloud-cli-failover}

### Por que o ARP gratuito não funciona na nuvem {#why-gratuitous-arp-does-not-work-in-public-clouds}

As redes de nuvem (AWS, Azure e Google Cloud) **ignoram o ARP gratuito**. Elas encaminham o tráfego somente para endereços IP atribuídos na plataforma de nuvem. O SafeKit configura o endereço IP virtual no servidor primário, mas a rede de nuvem não direciona o tráfego desse endereço para esse servidor.

### Mover o endereço IP virtual com a CLI da nuvem {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sem um balanceador de carga, a CLI do provedor de nuvem pode ser integrada ao script **`start_prim`** do SafeKit para atualizar a configuração de rede da nuvem antes de iniciar a aplicação. A CLI pode atribuir o endereço IP virtual ao nó que se torna primário ou atualizar a rota da nuvem para direcionar o tráfego desse endereço a esse nó.

O **endereço IP virtual permanece local** no servidor primário. **Não há NAT**, e o endereço IP original do cliente não muda.

### Responsabilidade do integrador {#integrator-responsibility}

O **integrador** deve adicionar os comandos da CLI da nuvem ao script `start_prim`. Esses comandos **não são fornecidos pelo produto SafeKit**. Eles dependem do provedor de nuvem, do projeto de rede e das regras de segurança do cliente.

### Restrições {#constraints-of-the-cli-approach}

  * A CLI da nuvem deve ser instalada nos dois nós. Cada nó precisa de uma identidade de nuvem com as permissões de rede necessárias.
  * O script deve tratar erros e novas tentativas.
  * O failover provavelmente será mais lento do que com um balanceador de carga.

## Como funciona um endereço IP virtual entre sub-redes diferentes com BGP (cluster Mirror) {#virtual-ip-bgp-failover}

### Redirecionamento do endereço IP virtual com BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Com **BGP (Border Gateway Protocol)**, o script `start_prim` normalmente configura o endereço IP virtual em uma interface loopback do servidor primário antes de iniciar a aplicação. O servidor primário anuncia a VIP aos roteadores como uma rota /32.

Durante o failover, o script `stop_prim` no antigo servidor primário para a aplicação, remove a VIP da interface loopback e retira a rota /32 dos roteadores. Se o antigo servidor primário travar, `stop_prim` não será executado, mas os roteadores perderão a sessão BGP e removerão a rota automaticamente.

### Benefícios e pré-requisitos {#benefits-and-prerequisites}

  * **O endereço IP virtual permanece local, não há NAT e o endereço IP do cliente não muda.**
  * Funciona entre sub-redes e locais. Não é necessária uma VLAN estendida.
  * São necessários roteadores BGP e o apoio da equipe de rede. Na nuvem, é necessário um serviço de route server do provedor.

> **⚠️ Observação:** a integração BGP usa scripts do SafeKit e sua infraestrutura de roteamento. O **integrador** deve escrever os comandos nos scripts `start_prim` e `stop_prim`. Esses scripts **não são fornecidos pelo produto SafeKit**. Valide a solução com a equipe de rede antes de colocá-la em produção.

## Como funciona o redirecionamento DNS entre sub-redes diferentes (cluster Mirror) {#virtual-ip-vs-dns-redirection-failover}

### Redirecionamento DNS com o script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Com o redirecionamento DNS, **não existe um único endereço IP virtual**. Os clientes se conectam a um **nome virtual** (o nome DNS). Durante o failover, o script `start_prim` do novo servidor primário inicia a aplicação e depois altera o registro DNS do nome virtual para apontar para o **endereço IP físico** do novo servidor primário.

O script `stop_prim` não precisa fazer nada. Se o antigo servidor primário falhar, o novo servidor primário sobrescreverá o registro DNS.

### Exemplo: resolução DNS e clientes bloqueados {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagrama mostrando a resolução de um nome DNS para o endereço IP físico 1 em um cluster de alta disponibilidade](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

Resolução DNS: clientes bloqueados no endereço IP físico 1 em um cluster de alta disponibilidade.

#### Antes do failover: o nome aponta para o endereço IP físico 1 {#current-state-resolution-to-physical-ip-1}

O **cliente 1** e o **cliente 2** solicitam ao sistema DNS o endereço IP do nome virtual. O sistema retorna o **endereço IP físico 1**. Em seguida, os clientes abrem uma conexão de rede para esse endereço.

#### Depois do failover: o nome aponta para o endereço IP físico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

O servidor 1 falha. O script `start_prim` no servidor 2 altera o registro DNS para o **endereço IP físico 2**. Os clientes só conseguem se conectar a esse endereço se todas as condições a seguir forem atendidas:

  * O **TTL (Time to Live)** expirou em todos os servidores DNS entre o cliente e o registro DNS.
  * O cache DNS local do cliente 1 e do cliente 2 está vazio.
  * A aplicação fecha a conexão e faz uma **nova** consulta DNS.

Se uma das condições não for atendida, os **clientes 1 e 2 continuam bloqueados** no endereço IP físico 1. O serviço fica indisponível mesmo que o registro DNS esteja correto.

### Limites e pré-requisitos {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** muitos provedores de Internet e servidores DNS corporativos ignoram TTLs curtos. Eles podem manter o antigo endereço IP físico 1 por minutos ou horas.
  * **Comportamento da aplicação:** muitas aplicações, por exemplo, serviços Java ou navegadores, fazem uma consulta DNS apenas na inicialização e continuam usando o primeiro endereço IP.
  * **O endereço IP muda em cada failover:** a aplicação não tem um endereço IP virtual local e permanente. Aplicações que registram o próprio endereço IP podem não funcionar.
  * **Pré-requisitos:** um TTL curto no registro DNS (por exemplo, de 30 a 60 segundos) e permissão para atualizar a zona DNS a partir dos dois servidores.

> **⚠️ Observação:** o **integrador** deve escrever os comandos de atualização DNS no script `start_prim`. Esses comandos **não são fornecidos pelo produto SafeKit** e dependem do servidor DNS (Windows DNS, BIND ou DNS em nuvem).

### Conclusão {#conclusion}

O redirecionamento DNS não é uma solução confiável de alta disponibilidade. Use-o somente se todos os clientes fizerem uma nova consulta DNS ao se reconectar. Para um failover imediato e transparente, use um **endereço IP virtual**: por meio de uma LAN estendida, com um balanceador de carga, com as CLIs dos provedores de nuvem ou com BGP.

## Como funciona o balanceamento de carga de um endereço IP virtual na mesma sub-rede (cluster Farm) {#virtual-ip-load-balancing-same-subnet}

- [Testar o balanceamento de carga com endereço IP virtual em um cluster Farm do SafeKit](/pt-br/best-practises/test-load-balancing-vip-farm/)

### Balanceamento de carga no kernel com redundância {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando há muito tráfego, o SafeKit pode distribuir o trabalho entre vários servidores ativos. Se um servidor falhar, os outros continuam funcionando.

### Arquitetura de cluster Farm: balanceamento de carga entre nós Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagrama de um endereço IP virtual com balanceamento de carga na mesma sub-rede](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Em um **cluster Farm com balanceamento de carga**, os clientes se conectam a um endereço IP virtual e as solicitações são distribuídas simultaneamente entre vários servidores. Este exemplo mostra dois nós. É possível adicionar mais nós ao cluster. Na mesma sub-rede, o endereço IP virtual é configurado por alias de IP na placa de rede de **cada servidor** do cluster.

#### Distribuição do tráfego: o filtro do kernel {#traffic-distribution-the-kernel-level-filter}

Em um cluster <span class="notranslate farm-term" translate="no">Farm</span>, um **filtro no kernel** do SafeKit distribui o tráfego. O funcionamento é o seguinte:

  * **Mapeamento ARP:** no cache ARP dos clientes, o endereço IP virtual está associado a um endereço MAC (por exemplo, `mac1` do servidor 1).
  * **Análise de pacotes:** o servidor 1 recebe os pacotes. O filtro do kernel do SafeKit lê o **IP do cliente** ou a **porta TCP** de cada pacote.
  * **Distribuição de carga:** o filtro decide quais pacotes o servidor 1 processa e quais seguem para os outros nós, por exemplo, o servidor 2. Para enviar um pacote a outro nó, o filtro substitui o **endereço MAC de destino** pelo MAC desse nó. O endereço IP de destino continua sendo o endereço IP virtual. Assim, o trabalho é distribuído entre os servidores.

#### Failover e redirecionamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o servidor 1 falhar, o SafeKit envia uma mensagem de **ARP gratuito (GARP)**. Os clientes atualizam o cache ARP com `mac2`, o endereço MAC do servidor 2. Em seguida, o tráfego é direcionado imediatamente aos outros nós Farm.

#### Implantação em locais remotos {#deployment-in-remote-sites}

Esta solução de balanceamento de carga também funciona entre **data centers remotos**, se os locais estiverem conectados por uma **LAN estendida ou VLAN**. Todos os locais ficam, então, na mesma sub-rede. Essa é a configuração mais eficiente para clusters <span class="notranslate farm-term" translate="no">Farm</span> em vários locais.

{{%  insert-safekit-farm-video-pt-br  %}}

## Balanceamento de carga de um endereço IP virtual entre sub-redes diferentes (cluster Farm) {#virtual-ip-load-balancing-different-subnets}

### Tráfego entre sub-redes de nuvem {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Um cluster <span class="notranslate farm-term" translate="no">Farm</span> pode distribuir a carga da aplicação entre várias zonas de disponibilidade e sub-redes.

### Clusters Farm entre sub-redes: vários nós Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagrama de um cluster Farm com balanceamento de carga em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando os nós <span class="notranslate farm-term" translate="no">Farm</span> estão em **sub-redes diferentes**, por exemplo, em várias zonas de disponibilidade de nuvem, o **endereço IP virtual** fica em um **balanceador de carga (LB)** externo. O balanceador encaminha o tráfego para os endereços IP físicos dos servidores em cada sub-rede.

#### Regras de roteamento de tráfego e balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O balanceador distribui as solicitações dos clientes com base em dois critérios:

  * **Regras de balanceamento de carga:** por exemplo, o **endereço IP do cliente** ou a **porta TCP do cliente**.
  * **Disponibilidade dos nós:** com base na verificação de integridade do SafeKit, o balanceador encaminha tráfego somente para nós saudáveis.

> **⚠️ Observação:** o SafeKit fornece a verificação de integridade. O balanceador de carga é fornecido pela sua rede ou pelo provedor de nuvem.

#### Verificação de integridade do SafeKit {#safekit-health-check-mechanism}

O SafeKit fornece uma **URL de verificação de integridade** em cada servidor Farm. O balanceador a consulta para verificar o estado de cada servidor:

  * **Nó disponível (UP):** a verificação retorna `HTTP 200 OK`. O balanceador encaminha tráfego para esse servidor.
  * **Nó indisponível (DOWN):** se um servidor ou uma aplicação falhar, o SafeKit retorna `HTTP 404 NOT FOUND` (ou o servidor não responde). O balanceador interrompe imediatamente o envio de tráfego para esse nó.

#### Implantação na nuvem: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta é a arquitetura padrão para **clusters <span class="notranslate farm-term" translate="no">Farm</span> na nuvem**. Se uma sub-rede ou zona ficar indisponível, os outros nós continuarão processando o tráfego. A solução é compatível com [**Amazon AWS**](</pt-br/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</pt-br/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e [**Google Cloud (GCP)**](</pt-br/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).

## Comparação: implementação do endereço IP virtual, latência e transparência da aplicação {#virtual-ip-methods-comparison}

**Comparação dos métodos de redirecionamento de IP virtual e DNS para alta disponibilidade e recuperação de desastres.**

Ambiente e caso de uso | Tipo de alta disponibilidade | Método de redirecionamento | Implementado por | Latência de rede | Transparência da aplicação e IP local  
---|---|---|---|---|---  
Primário/secundário (alta disponibilidade) | Cluster Mirror | ARP gratuito / takeover de MAC | ✅ Produto SafeKit | Muito baixa: tempo para detectar a falha e enviar o GARP | Transparência total: o endereço IP virtual é local no nó ativo. O IP do cliente não muda.  
Balanceamento de carga (ativo/ativo) | Cluster <span class="notranslate farm-term" translate="no">Farm</span> | Filtro de rede do kernel / GARP | ✅ Produto SafeKit | Muito baixa: tempo para detectar a falha e alterar os filtros de rede | Transparência total: o endereço IP virtual é local em todos os nós. O IP do cliente não muda.  
Mesma sub-rede / LAN estendida (VLAN estendida) | Recuperação de desastres (data centers remotos) | Alias de IP / GARP | ✅ Produto SafeKit (a equipe de rede fornece a VLAN estendida) | Baixa: depende do tempo de ida e volta (RTT) da VLAN estendida | Transparência total: o endereço IP virtual é local nos nós. O IP do cliente não muda.  
Sub-redes diferentes: somente balanceador de carga | Recuperação de desastres (data centers remotos / nuvem) | Balanceador de carga externo | 🛠️ Integrador: configuração do balanceador (o SafeKit fornece a verificação de integridade) | Média: depende do intervalo de verificação do balanceador | ⚠️ Transparência parcial se SNAT/DNAT for usado. O endereço IP virtual **NÃO** é local nos nós. O IP do cliente pode **NÃO** ser mantido. A aplicação deve oferecer suporte.  
Sub-redes diferentes: balanceador + IP virtual local do SafeKit | Recuperação de desastres (data centers remotos / nuvem) | Balanceador externo com Floating IP / Direct Server Return | 🛠️ Integrador: configuração do balanceador (o SafeKit fornece a verificação de integridade) | Média: depende do intervalo de verificação do balanceador | Boa transparência: o endereço IP virtual é local no nó primário e funciona como endereço de destino.  
Sub-redes diferentes: CLI de nuvem | Recuperação de desastres (nuvem) | API de nuvem: o IP privado ou uma rota de nuvem é movido para o novo primário | 🛠️ Integrador: comandos da CLI de nuvem no script `start_prim` | Média a alta: depende do tempo de resposta da API de nuvem | Transparência total: o endereço IP virtual é local no nó primário. O IP do cliente não muda.  
Sub-redes diferentes: BGP | Recuperação de desastres (data centers remotos / nuvem) | Rota /32 anunciada com BGP | 🛠️ Integrador: comandos BGP nos scripts `start_prim` e `stop_prim` | Baixa a média: depende do tempo de convergência do BGP | Transparência total: o endereço IP virtual é local no nó primário. O IP do cliente não muda. São necessários roteadores BGP.  
Redirecionamento DNS: sem IP virtual | Recuperação de desastres (data centers remotos) | Alteração do registro DNS (nome / IP físico) | 🛠️ Integrador: comandos de atualização DNS no script `start_prim` | Alta e imprevisível: depende do TTL DNS e do cache DNS do cliente | ⚠️ Não é confiável: o cliente precisa fazer uma nova consulta DNS. Muitas vezes, os clientes continuam usando o IP antigo recebido na inicialização e não são redirecionados após o failover.  

## Perguntas frequentes sobre o endereço IP virtual {#virtual-ip-faq}

### Endereço IP virtual e rede {#virtual-ip--networking}

O que é um endereço IP virtual e como ele difere de um endereço IP físico?

Um **endereço IP físico** está associado a uma placa de rede. Um **endereço IP virtual** não está vinculado ao hardware. Em um cluster SafeKit, os clientes sempre usam o endereço IP virtual. Se o servidor primário falhar, ele será movido automaticamente para um nó saudável. Não é necessário alterar a configuração dos clientes.

Preciso de um balanceador de carga de hardware para usar um endereço IP virtual?

Não. O **SafeKit** gerencia o endereço IP virtual por software. Na mesma sub-rede, ele usa **alias de IP** e **ARP gratuito (GARP)** para redirecionar o tráfego. Não é necessário um balanceador de carga externo nem um servidor proxy.

O que é ARP gratuito (GARP) e por que ele é usado?

O **ARP gratuito (GARP)** é uma mensagem de rede enviada a todos os dispositivos. Ela atualiza as tabelas ARP de switches e roteadores. Durante um failover, o novo servidor primário envia uma mensagem GARP para anunciar que o **endereço IP virtual** está associado ao seu endereço MAC. O tráfego é redirecionado imediatamente.

Posso associar um nome DNS a um endereço IP virtual?

**Sim.** Crie um registro A padrão para o endereço IP virtual. O redirecionamento ocorre no **nível do endereço IP virtual** (via ARP ou redirecionamento de rede), **não no nível DNS**. Não há atrasos de DNS nem problemas de TTL, e o failover continua **transparente para a aplicação**.

### Nuvem e arquiteturas avançadas {#cloud--advanced-architectures}

Como funciona um endereço IP virtual na nuvem (AWS, Azure, GCP)?

Na nuvem, mensagens GARP de camada 2 não estão disponíveis para redirecionar um endereço IP virtual. O SafeKit funciona com **balanceadores de carga de nuvem** (AWS ELB, Azure LB ou Google GCLB). O SafeKit fornece uma **URL de verificação de integridade**. O balanceador consulta essa URL e encaminha o tráfego ao nó ativo.

Uma LAN estendida é melhor do que um balanceador de carga para recuperação de desastres?

**Sim.** Entre data centers remotos, uma **LAN estendida (VLAN estendida)** costuma ser melhor porque o failover continua **transparente para a aplicação**. O **endereço IP virtual não muda**, então a aplicação e os clientes continuam usando o mesmo endereço após o failover entre data centers.

Quais são as limitações do redirecionamento DNS em comparação com um endereço IP virtual?

O **redirecionamento DNS** depende do **TTL (Time to Live)** e do cache DNS do cliente. A recuperação pode levar horas. Além disso, **clientes que não fazem uma nova consulta DNS continuam presos** ao servidor que falhou. Um **endereço IP virtual** é redirecionado imediatamente por mensagens GARP na camada 2. O cache DNS do cliente não tem efeito.

### Transparência e segurança {#transparency--security}

Por que um endereço IP virtual local é importante para a transparência da aplicação?

Com um **endereço IP virtual local**, a aplicação usa um endereço que não muda. O SafeKit faz o redirecionamento no **kernel**, e a aplicação não percebe o failover. Com DNAT, o endereço usado pela aplicação muda.

Um endereço IP virtual mantém o endereço IP original do cliente?

Sim. O SafeKit não usa tradução de endereço de origem (SNAT). Como o endereço IP virtual é local no servidor ativo, a aplicação recebe o **endereço IP original do cliente**. Isso é importante para auditorias de segurança, persistência de sessão e registros regulatórios.

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
