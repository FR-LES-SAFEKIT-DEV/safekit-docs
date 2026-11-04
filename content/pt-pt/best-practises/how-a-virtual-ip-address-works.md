---
title: "Como funciona um endereço IP virtual num cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/how-a-virtual-ip-address-works/"
description: "Saiba como o SafeKit move um IP virtual em caso de failover, através de GARP, balanceadores de carga, CLI cloud ou BGP."
category: "best-practises"
lang: "pt-pt"
topics: "O que é um endereço IP virtual num cluster de alta disponibilidade?, Implementação do endereço IP virtual no SafeKit, Como funciona um endereço IP virtual na mesma sub-rede (cluster Mirror), Como funciona um endereço IP virtual entre sub-redes diferentes com um balanceador de carga (cluster Mirror), Como funciona um endereço IP virtual entre sub-redes diferentes com CLIs de fornecedores cloud (cluster Mirror), Como funciona um endereço IP virtual entre sub-redes diferentes com BGP (cluster Mirror), Como funciona o redireccionamento DNS entre sub-redes diferentes (cluster Mirror), Como funciona o balanceamento de carga de um IP virtual num cluster Farm na mesma sub-rede, Balanceamento de carga de um IP virtual entre sub-redes diferentes (cluster Farm), Comparação da implementação, latência e transparência das aplicações, Perguntas frequentes sobre o IP virtual, 🔍 Explorar o SafeKit"
---

# Como funciona um endereço IP virtual num cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual num cluster de alta disponibilidade? {#virtual-ip-definition}

Um **endereço IP virtual** é o endereço único que os clientes utilizam para se ligarem a uma aplicação num [cluster de alta disponibilidade](</pt-pt/>). Não está associado a um servidor específico. Durante um failover, é movido para o servidor que executa a aplicação. Os clientes não precisam de alterar a sua configuração.

**Princípio fundamental do SafeKit:** o endereço IP virtual é **configurado localmente no servidor** que executa a aplicação. A aplicação é iniciada nesse endereço e recebe o endereço IP original do cliente. Por isso, muitas aplicações funcionam correctamente com o SafeKit sem alterações. O SafeKit disponibiliza dois tipos de endereço IP virtual:

  * **Endereço IP virtual primário/secundário num cluster Mirror:** o endereço IP virtual está activo apenas no servidor primário. Durante um failover, é movido para o servidor secundário.
  * **Endereço IP virtual com balanceamento de carga de rede num cluster <span class="notranslate farm-term" translate="no">farm</span>:** o endereço IP virtual está activo em todos os servidores ao mesmo tempo. O tráfego é distribuído entre eles.

## Implementação do endereço IP virtual no SafeKit {#safekit-virtual-ip-implementation}

Este artigo explica como o SafeKit move o endereço IP virtual em cada arquitectura de rede:

  * **Mesma sub-rede ou LAN estendida (clusters [Mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet)):** o SafeKit configura o endereço IP virtual no servidor e envia um **ARP gratuito (GARP)**. Não é necessário hardware externo. É a solução mais transparente, porque o SafeKit implementa todo o mecanismo.
  * **Sub-redes diferentes com um balanceador de carga (clusters [Mirror](#virtual-ip-different-subnets-failover) e [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets)):** o balanceador utiliza a **verificação de estado do SafeKit** para enviar o tráfego para o servidor correcto. O integrador configura o balanceador.
  * **[Sub-redes diferentes com CLIs de fornecedores cloud](#virtual-ip-cloud-cli-failover) (cluster Mirror):** o script `start_prim` do SafeKit chama a CLI cloud para mover o endereço IP virtual. O integrador escreve o script.
  * **[Sub-redes diferentes com BGP](#virtual-ip-bgp-failover) (cluster Mirror):** o servidor primário anuncia o endereço IP virtual aos routers. O integrador escreve o script.
  * **[Sub-redes diferentes com redireccionamento DNS](#virtual-ip-vs-dns-redirection-failover) (cluster Mirror):** o script `start_prim` do SafeKit altera o registo DNS do nome virtual para apontar para o endereço IP físico do novo servidor primário. O integrador escreve o script. Não existe um único endereço IP virtual e este método não é fiável para todos os clientes.

Neste artigo:

  * [Comparação da implementação, latência e transparência das aplicações](#virtual-ip-methods-comparison)
  * [Perguntas frequentes sobre o endereço IP virtual](#virtual-ip-faq)
  * [🔍 Explorar o SafeKit](#hub)

![Comparação do comportamento dos endereços IP virtuais no Evidian SafeKit: IP flutuante no nó activo nos clusters Mirror e balanceamento de carga de rede em todos os nós dos clusters Farm.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementação de endereços IP virtuais nos clusters Mirror e <span class="notranslate farm-term" translate="no">Farm</span> com o SafeKit.**

## Como funciona um endereço IP virtual na mesma sub-rede (cluster Mirror) {#virtual-ip-same-subnet-failover}

- [Testar o endereço IP virtual primário/secundário num cluster Mirror do SafeKit](/pt-pt/best-practises/test-primary-backup-vip-mirror/)

### Failover automático e reencaminhamento de rede numa sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Numa rede local, o **SafeKit** gere automaticamente o endereço IP virtual e o failover da aplicação.

### Cluster Mirror local: failover de dois nós em Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Mecanismo de failover do endereço IP virtual SafeKit entre dois servidores na mesma sub-rede](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Num **cluster Mirror do SafeKit**, os dois nós estão na mesma sub-rede. A alta disponibilidade utiliza um **endereço IP virtual**. O SafeKit gere-o na pilha de rede do sistema operativo. Não é necessário hardware especial. O endereço IP virtual é acrescentado aos endereços IP físicos dos servidores 1 e 2 através de **aliasing de IP**. Os clientes ligam-se sempre ao endereço IP virtual.

#### Aliasing de IP e suporte para vários endereços IP virtuais (VIPs) no SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

O endereço IP virtual é um terceiro endereço IP que se desloca entre os nós. O SafeKit pode gerir **vários endereços IP virtuais** num cluster. Podem ser configurados na mesma placa de rede ou em placas diferentes, para que cada serviço tenha o seu próprio endereço IP virtual.

#### Mecanismo de failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

O failover não requer qualquer intervenção manual. Em funcionamento normal, o endereço IP virtual está associado ao **endereço MAC do servidor 1 (mac1)**. Se o servidor 1 falhar, o SafeKit executa três acções:

  * **Aliasing do endereço IP virtual:** o SafeKit configura o endereço IP virtual como alias na placa de rede do servidor 2, o novo servidor primário. Em seguida, o sistema operativo envia mensagens pela rede para anunciar o endereço IP virtual.
  * **GARP:** o SafeKit também envia mensagens de **ARP gratuito (GARP)**. Os switches de rede e os clientes actualizam a cache ARP. O endereço IP virtual fica associado ao **endereço MAC do servidor 2 (mac2)**.
  * **Recuperação da aplicação:** o SafeKit reinicia os serviços da aplicação no servidor 2.

#### Centros de dados remotos e VLANs estendidas {#remote-data-centers--extended-vlans}

A **solução na mesma sub-rede descrita acima** também funciona para **recuperação de desastres (DR)** entre locais remotos. É frequentemente a melhor opção quando os locais estão ligados através de uma **LAN estendida ou VLAN estendida**. Os dois locais ficam na mesma sub-rede, o que simplifica a rede e evita protocolos de encaminhamento complexos.

> **⚠️ Nota:** o reencaminhamento de camada 2 com ARP gratuito é a **solução mais transparente** para as aplicações. A aplicação recebe o endereço IP original do cliente e o endereço IP virtual está configurado localmente. **Muitas aplicações precisam** de um endereço IP virtual local. Sem ele, **podem não funcionar correctamente**. Nesta configuração na mesma sub-rede, o SafeKit implementa todo o mecanismo, pelo que não é necessária uma integração especial.

## Como funciona um endereço IP virtual entre sub-redes diferentes com um balanceador de carga (cluster Mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga com verificações de estado do SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de failover de um endereço IP virtual com um balanceador de carga entre duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando os nós estão em **sub-redes diferentes**, o ARP gratuito não consegue mover o endereço IP virtual. Nesse caso, o endereço IP virtual está num **balanceador de carga**, que envia o tráfego para o servidor primário.

O SafeKit disponibiliza um **URL de verificação de estado** em cada nó:

  * **Primário (PRIM):** devolve `HTTP 200 OK`. O balanceador envia tráfego para este nó.
  * **Secundário (SECOND):** devolve `HTTP 404 NOT FOUND`. O balanceador não envia tráfego para este nó.

Durante um failover, o SafeKit altera as respostas e o balanceador envia o tráfego para o novo servidor primário. Esta é a solução padrão entre **zonas de disponibilidade** na [**AWS**](</pt-pt/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</pt-pt/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</pt-pt/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** o SafeKit disponibiliza a verificação de estado. O balanceador de carga é fornecido pela sua rede ou pelo seu fornecedor cloud.

### O problema: o balanceador de carga possui o endereço IP virtual {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Quando se utiliza apenas um balanceador de carga, os clientes ligam-se ao endereço IP virtual. O balanceador traduz esse endereço, através de NAT, para o **endereço IP físico** do servidor primário. O cliente utiliza o endereço virtual, mas o servidor utiliza o endereço físico e não vê o endereço IP virtual.

### Manter o endereço IP virtual configurado localmente no servidor primário {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Algumas aplicações utilizam o endereço IP virtual como endereço do servidor. Só funcionam correctamente se esse endereço também estiver **configurado localmente no servidor primário**. Assim:

  * os serviços podem ser iniciados no endereço IP virtual;
  * o servidor pode aceder aos seus próprios serviços através desse endereço;
  * a autenticação funciona com esse endereço.

**Recomendação:** utilize um modo de balanceador de carga que mantenha o endereço IP virtual como endereço de destino (por exemplo, Floating IP ou Direct Server Return). Em seguida, configure o endereço IP virtual localmente no servidor primário. O método depende da sub-rede do endereço IP virtual:

  * **O endereço IP virtual está na mesma sub-rede que os endereços IP físicos dos servidores:** mantenha a secção `<vip>` no módulo SafeKit. O SafeKit configura automaticamente o endereço IP virtual como alias na placa de rede associada ao endereço IP físico.
  * **O endereço IP virtual está numa sub-rede diferente:** não configure `<vip>` no SafeKit. Utilize o script `start_prim` para configurar o endereço IP virtual numa interface dedicada, como loopback, antes de iniciar a aplicação. Utilize `stop_prim` para o remover depois de parar a aplicação. O integrador escreve estes comandos, que não são fornecidos pelo produto SafeKit.

## Como funciona um endereço IP virtual entre sub-redes diferentes com CLIs de fornecedores cloud (cluster Mirror) {#virtual-ip-cloud-cli-failover}

### Porque é que o ARP gratuito não funciona na cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

As redes cloud (AWS, Azure e Google Cloud) **ignoram o ARP gratuito**. Encaminham tráfego apenas para endereços IP atribuídos na plataforma cloud. O SafeKit configura o endereço IP virtual no servidor primário, mas a rede cloud não encaminha o tráfego desse endereço para esse servidor.

### Mover o endereço IP virtual através da CLI cloud {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sem um balanceador de carga, a CLI do fornecedor cloud pode ser integrada no script SafeKit **`start_prim`** para actualizar a configuração de rede cloud antes de iniciar a aplicação. A CLI pode atribuir o endereço IP virtual ao nó que passa a primário ou actualizar a rota cloud para encaminhar o tráfego desse endereço para esse nó.

O **endereço IP virtual permanece local** no servidor primário. **Não existe NAT**, e o endereço IP original do cliente não muda.

### Responsabilidade do integrador {#integrator-responsibility}

O **integrador** tem de acrescentar os comandos da CLI cloud ao script `start_prim`. Estes comandos **não são fornecidos pelo produto SafeKit**. Dependem do fornecedor cloud, do desenho da rede e das regras de segurança do cliente.

### Restrições {#constraints-of-the-cli-approach}

  * A CLI cloud tem de estar instalada nos dois nós. Cada nó precisa de uma identidade cloud com os direitos de rede necessários.
  * O script tem de gerir erros e novas tentativas.
  * O failover será provavelmente mais lento do que com um balanceador de carga.

## Como funciona um endereço IP virtual entre sub-redes diferentes com BGP (cluster Mirror) {#virtual-ip-bgp-failover}

### Reencaminhamento do endereço IP virtual com BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Com **BGP (Border Gateway Protocol)**, o script `start_prim` configura normalmente o endereço IP virtual numa interface loopback do servidor primário antes de iniciar a aplicação. Em seguida, o servidor primário anuncia a VIP aos routers como uma rota /32.

Durante um failover, o script `stop_prim` no antigo servidor primário pára a aplicação, remove a VIP da interface loopback e retira a rota /32 dos routers. Se o antigo servidor primário falhar, `stop_prim` não é executado, mas os routers perdem a sessão BGP e removem a rota automaticamente.

### Vantagens e pré-requisitos {#benefits-and-prerequisites}

  * **O endereço IP virtual permanece local, não existe NAT e o endereço IP do cliente não muda.**
  * Funciona entre sub-redes e locais. Não é necessária uma VLAN estendida.
  * São necessários routers BGP e a colaboração da equipa de rede. Na cloud, é necessário um serviço de route server do fornecedor cloud.

> **⚠️ Nota:** a integração BGP utiliza scripts SafeKit e a sua infraestrutura de encaminhamento. O **integrador** tem de escrever os comandos nos scripts `start_prim` e `stop_prim`. Estes scripts **não são fornecidos pelo produto SafeKit**. Valide a solução com a equipa de rede antes de a colocar em produção.

## Como funciona o redireccionamento DNS entre sub-redes diferentes (cluster Mirror) {#virtual-ip-vs-dns-redirection-failover}

### Redireccionamento DNS com o script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Com o redireccionamento DNS, **não existe um único endereço IP virtual**. Os clientes ligam-se a um **nome virtual** (o nome DNS). Durante um failover, o script `start_prim` do novo servidor primário inicia a aplicação e altera o registo DNS do nome virtual para apontar para o **endereço IP físico** do novo servidor primário.

O script `stop_prim` não tem de fazer nada. Se o antigo servidor primário falhar, o novo servidor primário substitui o registo DNS.

### Exemplo: resolução DNS e clientes bloqueados {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagrama que mostra a resolução de um nome DNS para o endereço IP físico 1 num cluster de alta disponibilidade](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

Resolução DNS: clientes bloqueados no endereço IP físico 1 num cluster de alta disponibilidade.

#### Antes do failover: o nome aponta para o endereço IP físico 1 {#current-state-resolution-to-physical-ip-1}

O **cliente 1** e o **cliente 2** pedem ao sistema DNS o endereço IP do nome virtual. O sistema DNS devolve o **endereço IP físico 1**. Em seguida, os clientes abrem uma ligação de rede a esse endereço.

#### Depois do failover: o nome aponta para o endereço IP físico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

O servidor 1 falha. O script `start_prim` no servidor 2 altera o registo DNS para o **endereço IP físico 2**. Os clientes só se conseguem ligar a este endereço se todas as condições seguintes forem cumpridas:

  * O **TTL (Time to Live)** expirou em todos os servidores DNS entre o cliente e o registo DNS.
  * A cache DNS local do cliente 1 e do cliente 2 está vazia.
  * A aplicação fecha a ligação e efectua uma **nova** consulta DNS.

Se uma condição não for cumprida, os **clientes 1 e 2 continuam bloqueados** no endereço IP físico 1. O serviço fica indisponível, mesmo que o registo DNS esteja correcto.

### Limites e pré-requisitos {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** muitos fornecedores de Internet e servidores DNS empresariais ignoram TTLs curtos. Podem manter o antigo endereço IP físico 1 durante minutos ou horas.
  * **Comportamento da aplicação:** muitas aplicações, como serviços Java ou browsers, só efectuam uma consulta DNS quando arrancam e continuam a utilizar o primeiro endereço IP.
  * **O endereço IP muda em cada failover:** a aplicação não dispõe de um endereço IP virtual local e permanente. As aplicações que registam o seu próprio endereço IP poderão não funcionar.
  * **Pré-requisitos:** um TTL curto no registo DNS (por exemplo, entre 30 e 60 segundos) e autorização para actualizar a zona DNS a partir dos dois servidores.

> **⚠️ Nota:** o **integrador** tem de escrever os comandos de actualização DNS no script `start_prim`. Estes comandos **não são fornecidos pelo produto SafeKit** e dependem do servidor DNS (Windows DNS, BIND ou DNS cloud).

### Conclusão {#conclusion}

O redireccionamento DNS não é uma solução fiável de alta disponibilidade. Utilize-o apenas se todos os clientes efectuarem uma nova consulta DNS ao voltarem a ligar-se. Para um failover imediato e transparente, utilize um **endereço IP virtual**: através de uma LAN estendida, com um balanceador de carga, com CLIs de fornecedores cloud ou com BGP.

## Como funciona o balanceamento de carga de um endereço IP virtual na mesma sub-rede (cluster Farm) {#virtual-ip-load-balancing-same-subnet}

- [Testar o balanceamento de carga de um endereço IP virtual num cluster Farm do SafeKit](/pt-pt/best-practises/test-load-balancing-vip-farm/)

### Balanceamento de carga no kernel com redundância {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando existe muito tráfego, o SafeKit pode distribuir o trabalho por vários servidores activos. Se um servidor falhar, os outros continuam a funcionar.

### Arquitectura do cluster Farm: balanceamento de carga entre nós Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagrama de um endereço IP virtual com balanceamento de carga na mesma sub-rede](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Num **cluster Farm com balanceamento de carga**, os clientes ligam-se a um endereço IP virtual e os pedidos são distribuídos simultaneamente por vários servidores. Este exemplo mostra dois nós. É possível acrescentar mais nós ao cluster. Na mesma sub-rede, o endereço IP virtual é configurado por aliasing de IP na placa de rede de **cada servidor** do cluster.

#### Distribuição do tráfego: o filtro do kernel {#traffic-distribution-the-kernel-level-filter}

Num cluster <span class="notranslate farm-term" translate="no">Farm</span>, um **filtro no kernel** do SafeKit distribui o tráfego. Funciona da seguinte forma:

  * **Mapeamento ARP:** na cache ARP dos clientes, o endereço IP virtual está associado a um endereço MAC, por exemplo, `mac1` do servidor 1.
  * **Análise de pacotes:** o servidor 1 recebe os pacotes. O filtro do kernel SafeKit lê o **endereço IP do cliente** ou a **porta TCP** de cada pacote.
  * **Distribuição da carga:** o filtro decide quais os pacotes processados pelo servidor 1 e quais são enviados para os outros nós, por exemplo, o servidor 2. Para enviar um pacote para outro nó, o filtro substitui o **endereço MAC de destino** pelo endereço MAC desse nó. O endereço IP de destino continua a ser o endereço IP virtual. O trabalho é assim distribuído pelos servidores.

#### Failover e reencaminhamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o servidor 1 falhar, o SafeKit envia uma mensagem de **ARP gratuito (GARP)**. Os clientes actualizam a cache ARP com `mac2`, o endereço MAC do servidor 2. O tráfego é imediatamente encaminhado para os outros nós Farm.

#### Implementação em locais remotos {#deployment-in-remote-sites}

Esta solução de balanceamento de carga também funciona entre **centros de dados remotos**, se os locais estiverem ligados através de uma **LAN ou VLAN estendida**. Todos os locais ficam então na mesma sub-rede. Esta é a configuração mais eficiente para clusters <span class="notranslate farm-term" translate="no">Farm</span> distribuídos por vários locais.

{{%  insert-safekit-farm-video-pt-pt  %}}

## Balanceamento de carga de um endereço IP virtual entre sub-redes diferentes (cluster Farm) {#virtual-ip-load-balancing-different-subnets}

### Tráfego entre sub-redes cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Um cluster <span class="notranslate farm-term" translate="no">Farm</span> pode distribuir a carga da aplicação por várias zonas de disponibilidade e sub-redes.

### Clusters Farm entre sub-redes: vários nós Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagrama de um cluster Farm com balanceamento de carga em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando os nós <span class="notranslate farm-term" translate="no">Farm</span> estão em **sub-redes diferentes**, por exemplo, em várias zonas de disponibilidade cloud, o **endereço IP virtual** está num **balanceador de carga (LB)** externo. O balanceador encaminha o tráfego para os endereços IP físicos dos servidores em cada sub-rede.

#### Regras de encaminhamento de tráfego e balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O balanceador distribui os pedidos dos clientes com base em dois critérios:

  * **Regras de balanceamento de carga:** por exemplo, o **endereço IP do cliente** ou a **porta TCP do cliente**.
  * **Disponibilidade dos nós:** com base na verificação de estado do SafeKit, o balanceador só envia tráfego para nós saudáveis.

> **⚠️ Nota:** o SafeKit disponibiliza a verificação de estado. O balanceador de carga é fornecido pela sua rede ou pelo seu fornecedor cloud.

#### Verificação de estado do SafeKit {#safekit-health-check-mechanism}

O SafeKit disponibiliza um **URL de verificação de estado** em cada servidor Farm. O balanceador consulta-o para determinar o estado de cada servidor:

  * **Nó disponível (UP):** a verificação devolve `HTTP 200 OK`. O balanceador envia tráfego para este servidor.
  * **Nó indisponível (DOWN):** se um servidor ou uma aplicação falhar, o SafeKit devolve `HTTP 404 NOT FOUND` (ou o servidor não responde). O balanceador deixa imediatamente de enviar tráfego para esse nó.

#### Implementação cloud: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta é a arquitectura padrão para **clusters <span class="notranslate farm-term" translate="no">Farm</span> na cloud**. Se uma sub-rede ou zona ficar indisponível, os outros nós continuam a processar o tráfego. A solução é suportada pela [**Amazon AWS**](</pt-pt/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), pela [**Microsoft Azure**](</pt-pt/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e pela [**Google Cloud (GCP)**](</pt-pt/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).

## Comparação: implementação do endereço IP virtual, latência e transparência das aplicações {#virtual-ip-methods-comparison}

**Comparação dos métodos de reencaminhamento de IP virtual e DNS para alta disponibilidade e recuperação de desastres.**

Ambiente e caso de utilização | Tipo de alta disponibilidade | Método de reencaminhamento | Implementado por | Latência de rede | Transparência da aplicação e IP local  
---|---|---|---|---|---  
Primário/secundário (alta disponibilidade) | Cluster Mirror | ARP gratuito / takeover de MAC | ✅ Produto SafeKit | Muito baixa: tempo necessário para detectar a falha e enviar o GARP | Transparência total: o endereço IP virtual é local no nó activo. O endereço IP do cliente não muda.  
Balanceamento de carga (activo/activo) | Cluster <span class="notranslate farm-term" translate="no">Farm</span> | Filtro de rede do kernel / GARP | ✅ Produto SafeKit | Muito baixa: tempo para detectar a falha e alterar os filtros de rede | Transparência total: o endereço IP virtual é local em todos os nós. O endereço IP do cliente não muda.  
Mesma sub-rede / LAN estendida (VLAN estendida) | Recuperação de desastres (centros de dados remotos) | Aliasing de IP / GARP | ✅ Produto SafeKit (a VLAN estendida é fornecida pela equipa de rede) | Baixa: depende do tempo de ida e volta (RTT) da VLAN estendida | Transparência total: o endereço IP virtual é local nos nós. O endereço IP do cliente não muda.  
Sub-redes diferentes: apenas balanceador de carga | Recuperação de desastres (centros de dados remotos / cloud) | Balanceador de carga externo | 🛠️ Integrador: configuração do balanceador (o SafeKit disponibiliza a verificação de estado) | Média: depende do intervalo de verificação do balanceador | ⚠️ Transparência parcial se for utilizado SNAT/DNAT. O endereço IP virtual **NÃO** é local nos nós. O endereço IP do cliente pode **NÃO** ser mantido. A aplicação tem de suportar esta configuração.  
Sub-redes diferentes: balanceador + IP virtual local SafeKit | Recuperação de desastres (centros de dados remotos / cloud) | Balanceador externo com Floating IP / Direct Server Return | 🛠️ Integrador: configuração do balanceador (o SafeKit disponibiliza a verificação de estado) | Média: depende do intervalo de verificação do balanceador | Boa transparência: o endereço IP virtual é local no nó primário e funciona como endereço de destino.  
Sub-redes diferentes: CLI cloud | Recuperação de desastres (cloud) | API cloud: o IP privado ou uma rota cloud é movido para o novo servidor primário | 🛠️ Integrador: comandos da CLI cloud no script `start_prim` | Média a alta: depende do tempo de resposta da API cloud | Transparência total: o endereço IP virtual é local no nó primário. O endereço IP do cliente não muda.  
Sub-redes diferentes: BGP | Recuperação de desastres (centros de dados remotos / cloud) | Rota /32 anunciada com BGP | 🛠️ Integrador: comandos BGP nos scripts `start_prim` e `stop_prim` | Baixa a média: depende do tempo de convergência BGP | Transparência total: o endereço IP virtual é local no nó primário. O endereço IP do cliente não muda. São necessários routers BGP.  
Redireccionamento DNS: sem IP virtual | Recuperação de desastres (centros de dados remotos) | Alteração do registo DNS (nome / IP físico) | 🛠️ Integrador: comandos de actualização DNS no script `start_prim` | Elevada e imprevisível: depende do TTL DNS e da cache DNS do cliente | ⚠️ Não é fiável: o cliente tem de efectuar uma nova consulta DNS. Muitas vezes, os clientes continuam a utilizar o IP antigo recebido no arranque e não são reencaminhados após o failover.  

## Perguntas frequentes sobre o endereço IP virtual {#virtual-ip-faq}

### Endereço IP virtual e rede {#virtual-ip--networking}

O que é um endereço IP virtual e em que difere de um endereço IP físico?

Um **endereço IP físico** está associado a uma placa de rede. Um **endereço IP virtual** não está ligado ao hardware. Num cluster SafeKit, os clientes utilizam sempre o endereço IP virtual. Se o servidor primário falhar, o endereço IP virtual é movido automaticamente para um nó saudável. Não é necessário alterar a configuração dos clientes.

É necessário um balanceador de carga de hardware para utilizar um endereço IP virtual?

Não. O **SafeKit** gere o endereço IP virtual por software. Na mesma sub-rede, utiliza **aliasing de IP** e **ARP gratuito (GARP)** para reencaminhar o tráfego. Não é necessário um balanceador de carga externo nem um servidor proxy.

O que é ARP gratuito (GARP) e porque é utilizado?

O **ARP gratuito (GARP)** é uma mensagem de rede enviada a todos os dispositivos. Actualiza as tabelas ARP dos switches e routers. Durante um failover, o novo servidor primário envia uma mensagem GARP para anunciar que o **endereço IP virtual** está agora associado ao seu endereço MAC. O tráfego é reencaminhado imediatamente.

É possível associar um nome DNS a um endereço IP virtual?

**Sim.** Crie um registo A padrão para o endereço IP virtual. O reencaminhamento é feito ao **nível do endereço IP virtual** (através de ARP ou reencaminhamento de rede), **não ao nível DNS**. Não existem atrasos DNS nem problemas de TTL, e o failover continua **transparente para a aplicação**.

### Cloud e arquitecturas avançadas {#cloud--advanced-architectures}

Como funciona um endereço IP virtual na cloud (AWS, Azure, GCP)?

Na cloud, as mensagens GARP de camada 2 não estão disponíveis para reencaminhar um endereço IP virtual. O SafeKit funciona com **balanceadores de carga cloud** (AWS ELB, Azure LB ou Google GCLB). O SafeKit disponibiliza um **URL de verificação de estado**. O balanceador consulta-o e envia o tráfego para o nó activo.

Uma LAN estendida é melhor do que um balanceador de carga para a recuperação de desastres?

**Sim.** Entre centros de dados remotos, uma **LAN estendida (VLAN estendida)** é frequentemente melhor porque o failover continua **transparente para a aplicação**. O **endereço IP virtual não muda**, pelo que a aplicação e os clientes continuam a utilizar o mesmo endereço depois de um failover entre centros de dados.

Quais são os limites do reencaminhamento DNS em comparação com um endereço IP virtual?

O **reencaminhamento DNS** depende do **TTL (Time to Live)** e da cache DNS do cliente. A recuperação pode demorar horas. Além disso, os **clientes que não efectuam uma nova consulta DNS continuam bloqueados** no servidor que falhou. Um **endereço IP virtual** é reencaminhado imediatamente através de mensagens GARP de camada 2. A cache DNS do cliente não tem qualquer efeito.

### Transparência e segurança {#transparency--security}

Porque é que um endereço IP virtual local é importante para a transparência das aplicações?

Com um **endereço IP virtual local**, a aplicação utiliza um endereço que não muda. O SafeKit efectua o reencaminhamento no **kernel**, pelo que a aplicação não detecta o failover. Com DNAT, o endereço utilizado pela aplicação muda.

Um endereço IP virtual mantém o endereço IP original do cliente?

Sim. O SafeKit não utiliza tradução do endereço de origem (SNAT). Como o endereço IP virtual é local no servidor activo, a aplicação recebe o **endereço IP original do cliente**. Isto é importante para auditorias de segurança, persistência de sessões e registos regulamentares.

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
