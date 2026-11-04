---
title: "Como funciona um endereço IP virtual em um cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-br/best-practises/how-a-virtual-ip-address-works/"
description: "Como o SafeKit move um IP virtual em caso de failover: ARP gratuito na mesma sub-rede, balanceador de carga, CLI na nuvem ou BGP entre sub-redes. Por que um IP virtual local é importante."
category: "best-practises"
lang: "pt-br"
topics: "O que é um endereço IP virtual em um cluster de alta disponibilidade? Implementação de IP virtual no SafeKit. Como um endereço IP virtual funciona na mesma sub-rede (cluster mirror). Como um IP virtual funciona em diferentes sub-redes com um balanceador de carga (cluster mirror). Como um IP virtual funciona em diferentes sub-redes com CLIs de provedores de nuvem (cluster mirror). Como um IP virtual funciona em diferentes sub-redes com BGP (cluster mirror). Como o redirecionamento de DNS funciona em diferentes sub-redes (cluster mirror). Como o balanceamento de carga de IP virtual funciona em um cluster farm na mesma sub-rede. Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster farm). Comparação: implementação de IP virtual, latência e transparência de aplicativos. Perguntas frequentes sobre IP virtual. 🔍 Explore o SafeKit"
---

# Como funciona um endereço IP virtual em um cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual em um cluster de alta disponibilidade? {#virtual-ip-definition}

Um **endereço IP virtual** é o endereço único que os clientes usam para se conectar a um aplicativo em um [cluster de alta disponibilidade](</pt-br/>). O IP virtual não está vinculado a um servidor específico. Em caso de falha, ele é transferido para o servidor que executa o aplicativo. Os clientes não precisam alterar sua configuração.

**Princípio fundamental do SafeKit:** o IP virtual é **configurado localmente no servidor** que executa a aplicação. A aplicação inicia no IP virtual e recebe o IP original do cliente. É por isso que muitas aplicações funcionam corretamente com o SafeKit sem qualquer alteração. O SafeKit oferece dois tipos de IP virtual:

  * **IP virtual primário/de backup com cluster mirror :** o IP virtual fica ativo apenas no servidor primário. Em caso de falha, ele passa para o servidor de backup.
  * **Balanceamento de carga de rede com IP virtual em um cluster <span class="notranslate farm-term" translate="no">farm</span> :** o IP virtual fica ativo em todos os servidores simultaneamente. O tráfego é compartilhado entre eles.

## Implementação de IP virtual no SafeKit {#safekit-virtual-ip-implementation}

Este artigo explica como o SafeKit move o IP virtual em cada arquitetura de rede:

  * **Na mesma sub-rede ou em uma LAN estendida (clusters [mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)):** o SafeKit configura o IP virtual no servidor e envia um **ARP gratuito (GARP)**. Nenhum hardware externo é necessário. Esta é a solução mais transparente (tudo é implementado pelo produto SafeKit).
  * **Sub-redes diferentes com um balanceador de carga (clusters [mirror](#virtual-ip-different-subnets-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)):** o balanceador de carga usa a **verificação de integridade** do SafeKit para enviar o tráfego para o servidor correto (o balanceador de carga é configurado pelo integrador).
  * **[Sub-redes diferentes com CLIs de provedores de nuvem](#virtual-ip-cloud-cli-failover) (cluster mirror):** o script `start_prim` do SafeKit chama a CLI da nuvem para mover o IP virtual (script escrito pelo integrador).
  * **[Sub-redes diferentes com BGP](#virtual-ip-bgp-failover) (cluster mirror):** o servidor primário anuncia o IP virtual para os roteadores (script escrito pelo integrador).
  * **[Sub-redes diferentes com redirecionamento de DNS](#virtual-ip-vs-dns-redirection-failover) (cluster mirror):** o script `start_prim` do SafeKit altera o registro DNS do nome virtual para o IP físico do novo servidor primário (script escrito pelo integrador). Não existe um único IP virtual, e esse método não é confiável para todos os clientes.

Neste artigo também:

  * [Comparação: implementação de IP virtual, latência e transparência da aplicação.](#virtual-ip-methods-comparison)
  * [Perguntas frequentes sobre IP virtual](#virtual-ip-faq)
  * [🔍 Explore o SafeKit](#hub)

![Diagrama comparativo do comportamento de IPs virtuais no Eviden SafeKit: Clusters Mirror mostrando um floating IP no nó ativo versus clusters farm mostrando balanceamento de carga de rede em todos os nós.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementação de IP virtual para clusters mirror e <span class="notranslate farm-term" translate="no">farm</span> no SafeKit.**

## Como funciona um endereço IP virtual na mesma sub-rede (cluster mirror) {#virtual-ip-same-subnet-failover}

- [Testando o endereço IP virtual primário/de backup em um cluster mirror do SafeKit](/pt-br/best-practises/test-primary-backup-vip-mirror/)

### Failover automático e redirecionamento de rede em uma sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Em uma rede local, **o SafeKit** gerencia o endereço IP virtual e o failover do aplicativo automaticamente.

### Cluster mirror local: failover de 2 nós no Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mecanismo de failover de IP virtual SafeKit entre dois servidores na mesma sub-rede](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Em um **cluster mirror SafeKit**, os dois nós estão na mesma sub-rede. A alta disponibilidade utiliza um **IP virtual**. O SafeKit gerencia o IP virtual na pilha de rede do sistema operacional. Nenhum hardware especial é necessário. O IP virtual é adicionado aos endereços IP físicos do Servidor 1 e do Servidor 2 por meio de **alias de IP**. Os clientes sempre se conectam ao IP virtual.

#### Alias de IP e múltiplos IPs virtuais (VIPs) no SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

O IP virtual é um terceiro endereço IP que transita entre os nós. O SafeKit pode gerenciar **vários endereços IP virtuais** em um cluster. Você pode alocá-los na mesma placa de rede ou em placas de rede diferentes. Dessa forma, cada serviço pode usar seu próprio IP virtual.

#### O mecanismo de failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

O failover não requer nenhuma ação manual. Em operação normal, o IP virtual está vinculado ao **endereço MAC do Servidor 1 (mac1)**. Se o Servidor 1 falhar, o SafeKit realiza três ações:

  * **Criação de alias para IP virtual:** O SafeKit configura o IP virtual como um alias na placa de rede do Servidor 2, o novo servidor primário. O sistema operacional então envia mensagens pela rede para anunciar o IP virtual.
  * **GARP:** O SafeKit também envia mensagens **ARP gratuitas (GARP)**. Os switches de rede e os clientes atualizam seu cache ARP. O IP virtual agora está vinculado ao **endereço MAC do Servidor 2 (mac2)**.
  * **Recuperação da aplicação:** o SafeKit reinicia os serviços da aplicação no Servidor 2.


#### Centros de dados remotos e VLANs estendidas {#remote-data-centers--extended-vlans}

A **solução de mesma sub-rede descrita acima** também funciona para **recuperação de desastres (DR)** entre sites remotos e geralmente é a melhor opção quando os sites estão conectados por uma **LAN estendida ou VLAN estendida**. Ambos os sites estão na mesma sub-rede. A rede fica mais simples e não são necessários protocolos de roteamento complexos.

> **⚠️ Observação:** O redirecionamento na camada 2 com ARP gratuito é a **solução mais transparente** para as aplicações. A aplicação recebe o IP original do cliente e o IP virtual é configurado localmente. **Muitas aplicações precisam** de um IP virtual local. Sem ele, essas aplicações **podem não funcionar corretamente**. Nessa configuração de mesma sub-rede, o SafeKit implementa todo o mecanismo, portanto, nenhuma integração especial é necessária.

## Como um IP virtual funciona em diferentes sub-redes com um balanceador de carga (cluster mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga com verificações de integridade SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de failover de IP virtual usando um balanceador de carga em duas sub-redes diferentes.](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando os nós estão em **sub-redes diferentes**, o ARP gratuito não consegue mover o IP virtual. Nesse caso, o IP virtual está em um **balanceador de carga**. O balanceador de carga envia o tráfego para o servidor primário.

O SafeKit fornece um **URL de verificação de integridade** em cada nó:

  * **Primário (PRIM):** retorna `HTTP 200 OK`.. O balanceador de carga envia tráfego para este nó.
  * **Secundário (SECOND):** retorna `HTTP 404 NOT FOUND`.. O balanceador de carga não envia tráfego para este nó.

Em caso de falha, o SafeKit altera as respostas e o balanceador de carga envia o tráfego para o novo servidor primário. Essa é a solução padrão entre **zonas de disponibilidade** na [**AWS**](</pt-br/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</pt-br/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</pt-br/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Observação:** o SafeKit realiza a verificação de integridade. Sua rede ou seu provedor de nuvem fornece o balanceador de carga.

### O problema: o balanceador de carga é o proprietário do IP virtual. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Com um balanceador de carga apenas, os clientes se conectam ao IP virtual. O balanceador de carga traduz o IP virtual (NAT) para o **IP físico** do servidor principal. O cliente usa o IP virtual, mas o servidor usa seu IP físico. O servidor não vê o IP virtual.

### Mantenha o IP virtual configurado localmente no servidor primário. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Algumas aplicações utilizam o IP virtual como endereço de servidor. Elas funcionam corretamente apenas se o IP virtual também estiver **configurado localmente no servidor principal**. Nesse caso:

  * Os serviços podem ser iniciados no IP virtual;
  * O servidor pode acessar seus próprios serviços com o IP virtual;
  * A autenticação funciona com o IP virtual.

**Melhor prática:** Utilize um modo de balanceamento de carga que mantenha o IP virtual como endereço de destino (por exemplo, Floating IP ou Direct Server Return). Em seguida, configure o IP virtual localmente no servidor primário. O método depende da sub-rede do IP virtual.

  * **O IP virtual está na mesma sub-rede que os endereços IP físicos dos servidores:** mantenha a seção `<vip>` no módulo SafeKit. O SafeKit configura automaticamente o IP virtual como um alias na placa de rede do endereço IP físico.
  * **O endereço IP virtual está em uma sub-rede diferente:** não configure `<vip>` no SafeKit. Use o script `start_prim` para configurar o endereço IP virtual em uma interface dedicada, como loopback, antes da inicialização do aplicativo. Use o script `stop_prim` para remover o endereço IP virtual após a parada do aplicativo. Esses comandos são escritos pelo integrador e não são fornecidos pelo produto SafeKit.


## Como um IP virtual funciona em diferentes sub-redes com CLIs de provedores de nuvem (cluster mirror) {#virtual-ip-cloud-cli-failover}

### Por que o ARP gratuito não funciona na nuvem? {#why-gratuitous-arp-does-not-work-in-public-clouds}

As redes em nuvem (AWS, Azure, Google Cloud) **ignoram o ARP gratuito**. Elas enviam tráfego apenas para endereços IP atribuídos na plataforma de nuvem. O SafeKit configura o IP virtual no servidor primário, mas a rede em nuvem não envia o tráfego do IP virtual para este servidor.

### Movendo o IP virtual com a CLI da nuvem {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sem um balanceador de carga, a CLI do provedor de nuvem pode ser integrada ao **script `start_prim`** do SafeKit para atualizar a configuração da rede na nuvem antes da inicialização do aplicativo. A CLI pode atribuir o IP virtual ao nó que se torna primário ou atualizar a rota na nuvem para direcionar o tráfego do IP virtual para esse nó.

O **endereço IP virtual permanece local** no servidor primário. **Não há NAT** e o endereço IP original do cliente não muda.

### Responsabilidade do integrador {#integrator-responsibility}

O **integrador** deve adicionar os comandos da CLI da nuvem ao script `start_prim`. Esses comandos **não são fornecidos pelo produto SafeKit**. Eles dependem do provedor de nuvem, do projeto de rede e das regras de segurança do cliente.

### Restrições {#constraints-of-the-cli-approach}

  * A CLI da nuvem deve ser instalada em ambos os nós. Cada nó precisa de uma identidade na nuvem com direitos de rede.
  * O script deve gerenciar erros e novas tentativas.
  * O failover provavelmente é mais lento do que com um balanceador de carga.

## Como um IP virtual funciona em diferentes sub-redes com BGP (cluster mirror) {#virtual-ip-bgp-failover}

### Reencaminhamento de IP virtual com BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Com o BGP (Border Gateway Protocol), o IP virtual é normalmente configurado em uma interface de loopback do servidor primário pelo script `start_prim` antes da inicialização da aplicação. O servidor primário anuncia o VIP aos roteadores como uma rota /32.

Em caso de failover, o script `stop_prim` no servidor primário antigo interrompe o aplicativo, remove o VIP da interface de loopback e retira a rota /32 dos roteadores. Se o servidor primário antigo falhar, `stop_prim` não é executado, mas os roteadores perdem a sessão BGP e removem a rota automaticamente.

### Benefícios e pré-requisitos {#benefits-and-prerequisites}

  * **O endereço IP virtual permanece local, não há NAT e o endereço IP do cliente não muda.**
  * Funciona em várias sub-redes e locais. Você não precisa de uma VLAN estendida.
  * Você precisa de roteadores BGP e da ajuda da sua equipe de rede. Na nuvem, você precisa de um serviço de servidor de rotas do provedor de nuvem.

> **⚠️ Observação:** A integração BGP utiliza scripts do SafeKit e sua infraestrutura de roteamento. O **integrador** deve escrever os comandos nos scripts `start_prim` e `stop_prim`. Esses scripts **não são fornecidos pelo produto SafeKit**. Valide a solução com sua equipe de rede antes da produção.

## Como funciona o redirecionamento de DNS em diferentes sub-redes (cluster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Redirecionamento de DNS com o script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Com o redirecionamento de DNS, **não existe um único endereço IP virtual**. Os clientes se conectam a um **nome virtual** (o nome DNS). Em caso de falha, o script `start_prim` no novo servidor primário inicia a aplicação e, em seguida, altera o registro DNS do nome virtual para o **endereço IP físico** do novo servidor primário.

O script `stop_prim` não tem função alguma. Se o servidor primário antigo falhar, o novo servidor primário sobrescreve o registro DNS.

### Exemplo: resolução de DNS e clientes bloqueados {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagrama mostrando a resolução de nomes DNS para o IP físico 1 em um cluster de alta disponibilidade.](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolução de DNS e clientes bloqueados no IP físico 1 em um cluster de alta disponibilidade

#### Antes do failover: o nome aponta para o IP físico 1. {#current-state-resolution-to-physical-ip-1}

**O Cliente 1** e **o Cliente 2** consultam o sistema DNS para obter o endereço IP do nome virtual. O sistema DNS retorna o **endereço IP físico 1.** Os clientes, então, estabelecem uma conexão de rede com esse endereço.

#### Após o failover: o nome aponta para o IP físico 2. {#the-failover-challenge-rerouting-to-physical-ip-2}

O servidor 1 falha. O script `start_prim` no servidor 2 altera o registro DNS para **o IP físico 2.** Os clientes se conectam ao IP físico 2 somente se todas estas condições forem verdadeiras:

  * O **TTL (Time to Live)** expirou em todos os servidores DNS entre o cliente e o registro DNS.
  * O cache DNS local do Cliente 1 e do Cliente 2 está vazio.
  * O aplicativo fecha a conexão e realiza uma *nova* consulta DNS.

Se uma das condições for falsa, **o Cliente 1 e o Cliente 2 permanecerão bloqueados** no endereço IP físico 1. O serviço ficará inativo, mesmo que o registro DNS esteja correto.

### Limites e pré-requisitos {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** Muitos provedores de serviços de Internet e servidores DNS corporativos ignoram valores TTL curtos. Eles podem manter o antigo endereço IP físico 1 por minutos ou horas.
  * **Comportamento da aplicação:** Muitas aplicações (por exemplo, serviços Java ou navegadores web) fazem uma consulta DNS apenas uma vez, quando são iniciadas. Elas continuam a usar o primeiro endereço IP.
  * **O endereço IP muda a cada failover:** o aplicativo não possui um IP virtual local que permaneça o mesmo. Aplicativos que registram seu próprio endereço IP podem não funcionar.
  * **Pré-requisitos:** um TTL curto no registro DNS (por exemplo, de 30 a 60 segundos) e permissão para atualizar a zona DNS a partir de ambos os servidores.

> **⚠️ Observação:** O **integrador** deve escrever os comandos de atualização de DNS no script `start_prim`. Esses comandos **não são fornecidos pelo produto SafeKit**. Eles dependem do servidor DNS (DNS do Windows, BIND ou DNS na nuvem).

### Conclusão {#conclusion}

O redirecionamento de DNS não é uma solução confiável de alta disponibilidade. Use-o somente se todos os clientes realizarem uma nova consulta de DNS ao se reconectarem. Para failover imediato e transparente, utilize um **IP virtual** : em uma LAN estendida, com um balanceador de carga, com CLIs de provedores de nuvem ou com BGP.

## Como funciona o balanceamento de carga de IP virtual em um cluster <span class="notranslate farm-term" translate="no">farm</span> na mesma sub-rede {#virtual-ip-load-balancing-same-subnet}

- [Testando o endereço IP virtual de balanceamento de carga em um cluster farm SafeKit](/pt-br/best-practises/test-load-balancing-vip-farm/)

### Balanceamento de carga no kernel, com redundância. {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando há muito tráfego, o SafeKit pode distribuir o trabalho entre vários servidores ativos. Se um servidor falhar, os outros continuam a funcionar.

### Arquitetura de cluster <span class="notranslate farm-term" translate="no">Farm</span> : balanceamento de carga entre nós Windows ou Linux. {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagrama de um IP virtual com balanceamento de carga dentro da mesma sub-rede](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Em um **cluster de balanceamento de <span class="notranslate farm-term" translate="no">farm</span>**, os clientes se conectam a um IP virtual e as solicitações são compartilhadas entre vários servidores simultaneamente. Este exemplo mostra dois nós. Você pode adicionar mais nós ao cluster. Na mesma sub-rede, o IP virtual é configurado com um alias de IP na placa de rede de **cada servidor** do cluster.

#### Compartilhamento de tráfego: o filtro do kernel {#traffic-distribution-the-kernel-level-filter}

Em um cluster <span class="notranslate farm-term" translate="no">farm</span>, um **filtro SafeKit no kernel** compartilha o tráfego. Funciona assim:

  * **Mapeamento ARP:** No cache ARP dos clientes, o IP virtual é vinculado a um endereço MAC (por exemplo, `mac1` do Servidor 1).
  * **Análise de pacotes:** O servidor 1 recebe os pacotes. O filtro de kernel SafeKit lê o **endereço IP do cliente** ou a **porta TCP** de cada pacote.
  * **Distribuição de carga:** O filtro decide quais pacotes o Servidor 1 processa e quais pacotes são enviados para os outros nós (por exemplo, o Servidor 2). Para enviar um pacote para outro nó, o filtro reescreve o **endereço MAC de destino** do pacote com o endereço MAC desse nó. O endereço IP de destino permanece o IP virtual. O trabalho é compartilhado entre os servidores.


#### Failover e redirecionamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o Servidor 1 falhar, o SafeKit envia uma mensagem **ARP gratuita (GARP)**. Os clientes atualizam seu cache ARP com `mac2` do Servidor 2. Em seguida, os clientes são imediatamente encaminhados para os outros nós do farm.

#### Implantação em locais remotos {#deployment-in-remote-sites}

Essa solução de balanceamento de carga também funciona entre **data centers remotos**, desde que os sites estejam conectados por uma **LAN ou VLAN estendida**. Todos os sites ficam na mesma sub-rede. Essa é a configuração mais eficiente para clusters <span class="notranslate farm-term" translate="no">farm</span> em vários locais.

{{%  insert-safekit-farm-video-pt-br  %}}

## Como funciona um IP virtual com balanceamento de carga em diferentes sub-redes (cluster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Tráfego entre sub-redes na nuvem {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Um cluster <span class="notranslate farm-term" translate="no">farm</span> pode compartilhar o trabalho da aplicação entre várias zonas de disponibilidade e sub-redes.

### Clusters <span class="notranslate farm-term" translate="no">farm</span> entre sub-redes: vários nós Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagrama de um cluster farm com balanceamento de carga operando em duas sub-redes diferentes.](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando os nós <span class="notranslate farm-term" translate="no">farm</span> de servidores estão em **sub-redes diferentes** (por exemplo, em várias zonas de disponibilidade na nuvem), o **IP virtual** fica em um **balanceador de carga (LB)** externo. O balanceador de carga envia o tráfego para os endereços IP físicos dos servidores em cada sub-rede.

#### regras de roteamento de tráfego e balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O balanceador de carga distribui as solicitações do cliente com base em dois critérios:

  * **Regras de balanceamento de carga:** por exemplo, o **endereço IP do cliente** ou a **porta TCP do cliente**.
  * **Disponibilidade dos nós:** o balanceador de carga envia tráfego apenas para os nós que estão íntegros, com base na verificação de integridade do SafeKit.


> **⚠️ Observação:** o SafeKit realiza a verificação de integridade. O balanceador de carga é fornecido pela sua rede ou pelo seu provedor de nuvem.

#### Verificação de saúde SafeKit {#safekit-health-check-mechanism}

O SafeKit fornece um **URL de verificação de integridade** em cada servidor do <span class="notranslate farm-term" translate="no">farm</span>. O balanceador de carga lê esse URL para saber o status de cada servidor:

  * **Nó ATIVO:** a verificação de integridade retorna `HTTP 200 OK`.. O balanceador de carga envia tráfego para este servidor.
  * **Nó INATIVO:** se um servidor ou aplicativo falhar, o SafeKit retorna `HTTP 404 NOT FOUND` (ou o servidor não responde). O balanceador de carga para de enviar tráfego para este nó imediatamente.


#### Implantação em nuvem: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Essa é a arquitetura padrão para **clusters <span class="notranslate farm-term" translate="no">farm</span> na nuvem**. Se uma sub-rede ou zona parar de funcionar, os outros nós continuam processando o tráfego. Ela é compatível com [**Amazon AWS**](</pt-br/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</pt-br/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e [**Google Cloud (GCP)**](</pt-br/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Comparação: implementação de IP virtual, latência e transparência da aplicação. {#virtual-ip-methods-comparison}

**Comparação de métodos de redirecionamento de IP virtual e redirecionamento de DNS para alta disponibilidade e recuperação de desastres.**

Ambiente e caso de uso | Tipo de alta disponibilidade | Método de redirecionamento | Implementado por | Latência da rede | Transparência de aplicações e propriedade intelectual local  
---|---|---|---|---|---  
Primário/backup (alta disponibilidade) | Conjunto Mirror | Aquisição gratuita de ARP/MAC | ✅ Produto SafeKit | Muito baixo: tempo para detectar a falha e enviar o GARP. | Transparência total: o IP virtual é local no nó ativo. O IP do cliente não muda.  
Balanceamento de carga (ativo/ativo) | agrupamento <span class="notranslate farm-term" translate="no">Farm</span> | Filtro de rede do kernel / GARP | ✅ Produto SafeKit | Muito baixo: tempo para detectar a falha e trocar os filtros de rede. | Transparência total: o IP virtual é local em todos os nós. O IP do cliente não muda.  
Mesma sub-rede / LAN estendida (VLAN estendida) | Recuperação de desastres (centros de dados remotos) | Alias de IP / GARP | ✅ Produto SafeKit (a VLAN estendida é fornecida pela equipe de rede) | Baixo: depende do tempo de ida e volta (RTT) da VLAN estendida. | Transparência total: o IP virtual é local nos nós. O IP do cliente não muda.  
Sub-redes diferentes: somente balanceador de carga | Recuperação de desastres (centros de dados remotos / nuvem) | Balanceador de carga externo | 🛠️ Integrador: configuração do balanceador de carga (o SafeKit realiza a verificação de integridade) | Médio: depende do intervalo de verificação de integridade do balanceador de carga. | ⚠️ Transparência parcial se SNAT/DNAT for usado. O IP virtual **NÃO** é local nos nós. O IP do cliente **NÃO** pode ser mantido. O aplicativo deve suportar isso.  
Sub-redes diferentes: balanceador de carga + IP virtual local do SafeKit | Recuperação de desastres (centros de dados remotos / nuvem) | Balanceador de carga externo com Floating IP / Direct Server Return | 🛠️ Integrador: configuração do balanceador de carga (o SafeKit realiza a verificação de integridade) | Médio: depende do intervalo de verificação de integridade do balanceador de carga. | Boa transparência: o IP virtual é local no nó primário e é o endereço de destino.
Sub-redes diferentes: CLI da nuvem | Recuperação de desastres (nuvem) | API na nuvem: o IP privado ou uma rota na nuvem é movido para o novo endereço primário. | 🛠️ Integrador: comandos da CLI na nuvem no script `start_prim` | De médio a alto: depende do tempo de resposta da API na nuvem. | Transparência total: o IP virtual é local no nó primário. O IP do cliente não muda.
Sub-redes diferentes: BGP | Recuperação de desastres (centros de dados remotos / nuvem) | Rota /32 anunciada com BGP | 🛠️ Integrador: comandos BGP nos scripts `start_prim` e `stop_prim` | Baixo a médio: depende do tempo de convergência do BGP. | Transparência total: o IP virtual é local no nó primário. O IP do cliente não muda. Requer roteadores BGP.  
Redirecionamento de DNS: nenhum IP virtual | Recuperação de desastres (centros de dados remotos) | Alteração de registro DNS (nome / IP físico) | 🛠️ Integrador: comandos de atualização de DNS no script `start_prim` | Alto e imprevisível: depende do TTL (Time To Live) do DNS e do cache DNS do cliente. | ⚠️ Não confiável: o cliente precisa fazer uma nova consulta DNS. Frequentemente, os clientes mantêm o endereço IP antigo recebido na inicialização e não são redirecionados após a falha.  
  
## Perguntas frequentes sobre IP virtual {#virtual-ip-faq}

### IP virtual e redes {#virtual-ip--networking}

O que é um IP virtual e qual a diferença entre ele e um IP físico?

Um **endereço IP físico** está vinculado a uma placa de rede. Um **IP virtual** não está vinculado a hardware. Em um cluster SafeKit, os clientes sempre usam o IP virtual. Se o servidor primário falhar, o IP virtual é automaticamente transferido para um nó íntegro. Você não precisa alterar a configuração do cliente.

Preciso de um balanceador de carga de hardware para usar um IP virtual?

Não. **O SafeKit** gerencia o IP virtual por software. Na mesma sub-rede, ele usa **alias de IP** e **ARP gratuito (GARP)** para redirecionar o tráfego. Você não precisa de um balanceador de carga externo nem de um servidor proxy.

O que é ARP gratuito (GARP) e por que ele é usado?

**O ARP gratuito (GARP)** é uma mensagem de rede enviada a todos os dispositivos. Ele atualiza as tabelas ARP de switches e roteadores. Em caso de falha, o novo servidor primário envia uma mensagem GARP. A mensagem informa que o **endereço IP virtual** agora está vinculado ao endereço MAC do novo servidor primário. O tráfego é então redirecionado imediatamente.

Posso associar um nome DNS a um endereço IP virtual?

**Sim.** Crie um registro A padrão para o IP virtual. O redirecionamento é feito no **nível do IP virtual** (com ARP ou redirecionamento de rede), **não no nível do DNS**. Você não terá atrasos de DNS nem problemas de TTL, e o failover permanece **transparente para o aplicativo**.

### Nuvem e arquiteturas avançadas {#cloud--advanced-architectures}

Como funciona um IP virtual na nuvem (AWS, Azure, GCP)?

Na nuvem, as mensagens GARP de camada 2 não estão disponíveis para redirecionar um IP virtual. O SafeKit funciona com **balanceadores de carga na nuvem** (AWS ELB, Azure LB ou Google GCLB). O SafeKit fornece uma **URL de verificação de integridade**. O balanceador de carga lê essa URL e envia o tráfego para o nó ativo.

Uma LAN estendida é melhor do que um balanceador de carga para recuperação de desastres?

**Sim**. Entre data centers remotos, uma **LAN estendida (VLAN estendida)** costuma ser melhor porque a transição em caso de falha permanece **transparente para a aplicação**. O **IP virtual não muda**, então a aplicação e seus clientes continuam usando o mesmo endereço após uma transição em caso de falha entre data centers.

Quais são as limitações do redirecionamento de DNS em comparação com um IP virtual?

**O redirecionamento de DNS** depende do **TTL (Tempo de Vida)** e do cache DNS do cliente. A recuperação pode levar horas. Além disso, **os clientes que não realizam uma nova consulta DNS permanecem bloqueados** no servidor com falha. Um **IP virtual** é redirecionado imediatamente com mensagens GARP na camada 2. O cache DNS do cliente não tem efeito.

### Transparência e segurança {#transparency--security}

Por que um endereço IP virtual local é importante para a transparência da aplicação?

Com um **IP virtual** local, o aplicativo usa um endereço que não muda. O SafeKit faz o redirecionamento no **kernel**. O aplicativo não percebe a falha. Com DNAT, o endereço usado pelo aplicativo muda.

Um endereço IP virtual mantém o endereço IP original do cliente?

Sim. O SafeKit não usa NAT de origem (SNAT). O IP virtual é local no servidor ativo, portanto o aplicativo recebe o **IP original do cliente**. Isso é importante para auditorias de segurança, persistência de sessão e registros regulatórios.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
