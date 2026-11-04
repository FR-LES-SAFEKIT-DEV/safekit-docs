---
title: "Como funciona um endereço IP virtual num cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/how-a-virtual-ip-address-works/"
description: "Como o SafeKit move um IP virtual em caso de failover: ARP gratuito na mesma sub-rede, balanceador de carga, CLI na nuvem ou BGP entre sub-redes. Porque é que um IP virtual local é importante."
category: "best-practises"
lang: "pt-pt"
topics: "O que é um endereço IP virtual num cluster de alta disponibilidade? Implementação de IP virtual no SafeKit. Como um endereço IP virtual funciona na mesma sub-rede (cluster mirror). Como um IP virtual funciona em diferentes sub-redes com um balanceador de carga (cluster mirror). Como um IP virtual funciona em diferentes sub-redes com CLIs de fornecedores de cloud (cluster mirror). Como um IP virtual funciona em diferentes sub-redes com BGP (cluster mirror). Como o redireccionamento DNS funciona em diferentes sub-redes (cluster mirror). Como o balanceamento de carga IP virtual funciona num cluster farm na mesma sub-rede. Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster farm). Comparação: implementação de IP virtual, latência e transparência das aplicações. Perguntas frequentes sobre IP virtual. 🔍 Explore o SafeKit"
---

# Como funciona um endereço IP virtual num cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual num cluster de alta disponibilidade? {#virtual-ip-definition}

Um **endereço IP virtual** é o endereço único que os clientes utilizam para se ligarem a uma aplicação num [cluster de alta disponibilidade](</pt-pt/>). O IP virtual não está ligado a um servidor específico. Em caso de falha, é transferido para o servidor que executa a aplicação. Os clientes não precisam de alterar a sua configuração.

**Princípio fundamental do SafeKit:** o IP virtual é **configurado localmente no servidor** que executa a aplicação. A aplicação inicia-se no IP virtual e recebe o IP original do cliente. É por isso que muitas aplicações funcionam corretamente com o SafeKit sem qualquer alteração. O SafeKit oferece dois tipos de IP virtual:

  * **IP virtual primário/de reserva com cluster mirror :** o IP virtual apenas está ativo no servidor primário. Em caso de falha, passa para o servidor de reserva.
  * **Balanceamento de carga de rede com IP virtual num cluster <span class="notranslate farm-term" translate="no">farm</span> :** o IP virtual está ativo em todos os servidores em simultâneo. O tráfego é partilhado entre eles.

## Implementação de IP virtual no SafeKit {#safekit-virtual-ip-implementation}

Este artigo explica como o SafeKit move o IP virtual em cada arquitetura de rede:

  * **Na mesma sub-rede ou numa LAN estendida (clusters [mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)):** o SafeKit configura o IP virtual no servidor e envia um **ARP gratuito (GARP)**. Não é necessário hardware externo. Esta é a solução mais transparente (tudo é implementado pelo produto SafeKit).
  * **Sub-redes diferentes com um balanceador de carga (clusters [mirror](#virtual-ip-different-subnets-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)):** o balanceador de carga utiliza a **verificação de integridade** do SafeKit para enviar o tráfego para o servidor correto (o balanceador de carga é configurado pelo integrador).
  * **[Sub-redes diferentes com CLIs de fornecedores de cloud](#virtual-ip-cloud-cli-failover) (cluster mirror):** o script `start_prim` do SafeKit chama a CLI da cloud para mover o IP virtual (script escrito pelo integrador).
  * **[Sub-redes diferentes com BGP](#virtual-ip-bgp-failover) (cluster mirror):** o servidor primário anuncia o IP virtual aos routers (script escrito pelo integrador).
  * **[Sub-redes diferentes com redireccionamento DNS](#virtual-ip-vs-dns-redirection-failover) (cluster mirror):** o script `start_prim` do SafeKit altera o registo DNS do nome virtual para o IP físico do novo servidor primário (script escrito pelo integrador). Não existe um único IP virtual, e este método não é fiável para todos os clientes.

Neste artigo também:

  * [Comparação: implementação de IP virtual, latência e transparência da aplicação.](#virtual-ip-methods-comparison)
  * [Perguntas frequentes sobre o IP virtual](#virtual-ip-faq)
  * [🔍 Explore o SafeKit](#hub)

![Diagrama comparativo do comportamento dos IPs virtuais no Eviden SafeKit: Clusters Mirror mostrando um floating IP no nó ativo versus clusters farm mostrando o balanceamento de carga de rede em todos os nós.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementação de IP virtual para clusters mirror e <span class="notranslate farm-term" translate="no">farm</span> no SafeKit.**

## Como funciona um endereço IP virtual na mesma sub-rede (cluster mirror) {#virtual-ip-same-subnet-failover}

- [Testar o endereço IP virtual primário/de reserva num cluster mirror do SafeKit](/pt-pt/best-practises/test-primary-backup-vip-mirror/)

### Failover automático e redireccionamento de rede numa sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Numa rede local, **o SafeKit** gere o endereço IP virtual e o failover da aplicação automaticamente.

### Cluster mirror local: failover de 2 nós no Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mecanismo de failover de IP virtual SafeKit entre dois servidores na mesma sub-rede](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Num **cluster mirror SafeKit**, os dois nós estão na mesma sub-rede. A alta disponibilidade utiliza um **IP virtual**. O SafeKit gere o IP virtual na pilha de rede do sistema operativo. Não é necessário hardware especial. O IP virtual é adicionado aos endereços IP físicos do Servidor 1 e do Servidor 2 através de **alias IP**. Os clientes ligam-se sempre ao IP virtual.

#### Alias IP e múltiplos IPs virtuais (VIPs) no SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

O IP virtual é um terceiro endereço IP que transita entre nós. O SafeKit pode gerir **vários endereços IP virtuais** num cluster. Pode alocá-los na mesma placa de rede ou em placas de rede diferentes. Desta forma, cada serviço pode utilizar o seu próprio IP virtual.

#### O mecanismo de failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

O failover não requer qualquer ação manual. Em funcionamento normal, o IP virtual está ligado ao **endereço MAC do Servidor 1 (mac1)**. Se o Servidor 1 falhar, o SafeKit executa três ações:

  * **Criação de alias para IP virtual:** O SafeKit configura o IP virtual como um alias na placa de rede do Servidor 2, o novo servidor primário. O sistema operativo envia então mensagens pela rede para anunciar o IP virtual.
  * **GARP:** O SafeKit também envia mensagens **ARP gratuitas (GARP)**. Os switches de rede e os clientes atualizam a sua cache ARP. O IP virtual está agora ligado ao **endereço MAC do Servidor 2 (mac2)**.
  * **Recuperação da aplicação:** o SafeKit reinicia os serviços da aplicação no Servidor 2.


#### Centros de dados remotos e VLANs alargadas {#remote-data-centers--extended-vlans}

A **solução da mesma sub-rede descrita acima** também funciona para **a recuperação de desastres (DR)** entre sites remotos e é geralmente a melhor opção quando os sites estão ligados por uma **LAN estendida ou VLAN estendida**. Ambos os sites estão na mesma sub-rede. A rede torna-se mais simples e não são necessários protocolos de encaminhamento complexos.

> **⚠️ Nota:** O redireccionamento na camada 2 com ARP gratuito é a **solução mais transparente** para as aplicações. A aplicação recebe o IP original do cliente e o IP virtual é configurado localmente. **Muitas aplicações necessitam** de um IP virtual local. Sem ele, estas aplicações **podem não funcionar corretamente**. Nesta configuração de mesma sub-rede, o SafeKit implementa todo o motor, pelo que não é necessária nenhuma integração especial.

## Como funciona um IP virtual em diferentes sub-redes com um balanceador de carga (cluster mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga com verificações de integridade SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de failover IP virtual utilizando um balanceador de carga em duas sub-redes diferentes.](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando os nós estão em **sub-redes diferentes**, o ARP gratuito não consegue mover o IP virtual. Neste caso, o IP virtual está num **balanceador de carga**. O balanceador de carga envia o tráfego para o servidor primário.

O SafeKit fornece um **URL de verificação de integridade** em cada nó:

  * **Primário (PRIM):** retorna `HTTP 200 OK`.. O balanceador de carga envia tráfego para este nó.
  * **Secundário (SECOND):** retorna `HTTP 404 NOT FOUND`.. O balanceador de carga não envia tráfego para este nó.

Em caso de falha, o SafeKit altera as respostas e o balanceador de carga envia o tráfego para o novo servidor primário. Esta é a solução padrão entre **zonas de disponibilidade** na [**AWS**](</pt-pt/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</pt-pt/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</pt-pt/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** o SafeKit realiza a verificação de integridade. O balanceador de carga é fornecido pela sua rede ou pelo seu fornecedor de cloud.

### O problema: o balanceador de carga é o proprietário do IP virtual. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Com um balanceador de carga apenas, os clientes ligam-se ao IP virtual. O balanceador de carga traduz o IP virtual (NAT) para o **IP físico** do servidor principal. O cliente utiliza o IP virtual, mas o servidor utiliza o seu IP físico. O servidor não vê o IP virtual.

### Mantenha o IP virtual configurado localmente no servidor primário. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Algumas aplicações utilizam o IP virtual como endereço de servidor. Funcionam corretamente apenas se o IP virtual também estiver **configurado localmente no servidor principal**. Nesse caso:

  * Os serviços podem ser iniciados no IP virtual;
  * O servidor pode aceder aos seus próprios serviços com o IP virtual;
  * A autenticação funciona com o IP virtual.

**Melhor prática:** Utilize um modo de balanceamento de carga que mantenha o IP virtual como endereço de destino (por exemplo, Floating IP ou Direct Server Return). Em seguida, configure o IP virtual localmente no servidor primário. O método depende da sub-rede do IP virtual.

  * **O IP virtual está na mesma sub-rede que os endereços IP físicos dos servidores:** mantenha a secção `<vip>` no módulo SafeKit. O SafeKit configura automaticamente o IP virtual como um alias na placa de rede do endereço IP físico.
  * **O endereço IP virtual está numa sub-rede diferente:** não configure `<vip>` no SafeKit. Utilize o script `start_prim` para configurar o endereço IP virtual numa interface dedicada, como o loopback, antes do arranque da aplicação. Utilize o script `stop_prim` para remover o endereço IP virtual após a paragem da aplicação. Estes comandos são escritos pelo integrador e não são fornecidos pelo produto SafeKit.


## Como funciona um IP virtual em diferentes sub-redes com CLIs de fornecedores de cloud (cluster mirror) {#virtual-ip-cloud-cli-failover}

### Porque é que o ARP gratuito não funciona na nuvem? {#why-gratuitous-arp-does-not-work-in-public-clouds}

As redes na nuvem (AWS, Azure, Google Cloud) **ignoram o ARP gratuito**. Enviam tráfego apenas para endereços IP atribuídos na plataforma de cloud. O SafeKit configura o IP virtual no servidor primário, mas a rede na nuvem não envia o tráfego do IP virtual para este servidor.

### Mover o IP virtual com a CLI da cloud {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sem um balanceador de carga, a CLI do fornecedor de cloud pode ser integrada no **script `start_prim`** do SafeKit para atualizar a configuração da rede na cloud antes do arranque da aplicação. A CLI pode atribuir o IP virtual ao nó que se torna primário ou atualizar a rota na nuvem para direcionar o tráfego do IP virtual para esse nó.

O **endereço IP virtual permanece local** no servidor primário. **Não existe NAT** e o endereço IP original do cliente não é alterado.

### Responsabilidade do integrador {#integrator-responsibility}

O **integrador** deve adicionar os comandos da CLI da cloud ao script `start_prim`. Estes comandos **não são fornecidos pelo produto SafeKit**. Dependem do fornecedor de cloud, do projeto de rede e das regras de segurança do cliente.

### Restrições {#constraints-of-the-cli-approach}

  * A CLI da cloud deve ser instalada em ambos os nós. Cada nó necessita de uma identidade na nuvem com direitos de rede.
  * O script deve gerir erros e novas tentativas.
  * O failover é provavelmente mais lento do que com um balanceador de carga.

## Como funciona um IP virtual em diferentes sub-redes com BGP (cluster mirror) {#virtual-ip-bgp-failover}

### Reencaminhamento de IP virtual com BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Com o BGP (Border Gateway Protocol), o IP virtual é normalmente configurado numa interface de loopback do servidor primário pelo script `start_prim` antes da aplicação ser iniciada. O servidor primário anuncia o VIP aos routers como uma rota /32.

Em caso de failover, o script `stop_prim` no servidor primário antigo pára a aplicação, remove o VIP da interface de loopback e retira a rota /32 dos routers. Se o servidor primário antigo falhar, `stop_prim` não é executado, mas os routers perdem a sessão BGP e removem a rota automaticamente.

### Benefícios e pré-requisitos {#benefits-and-prerequisites}

  * **O endereço IP virtual permanece local, não existe NAT e o endereço IP do cliente não é alterado.**
  * Funciona em várias sub-redes e locais. Não precisa de uma VLAN estendida.
  * Precisa de routers BGP e da ajuda da sua equipa de rede. Na nuvem, precisa de um serviço de servidor de rotas do fornecedor de nuvem.

> **⚠️ Nota:** A integração BGP utiliza scripts do SafeKit e da sua infraestrutura de encaminhamento. O **integrador** deve escrever os comandos nos scripts `start_prim` e `stop_prim`. Estes scripts **não são fornecidos pelo produto SafeKit**. Valide a solução com a sua equipa de rede antes da produção.

## Como funciona o redireccionamento de DNS em diferentes sub-redes (cluster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Redireccionamento de DNS com o script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Com o redireccionamento DNS, **não existe um único endereço IP virtual**. Os clientes ligam-se a um **nome virtual** (o nome DNS). Em caso de falha, o script `start_prim` no novo servidor primário inicia a aplicação e, em seguida, altera o registo DNS do nome virtual para o **endereço IP físico** do novo servidor primário.

O script `stop_prim` não tem qualquer função. Se o servidor primário antigo falhar, o novo servidor primário sobrescreve o registo DNS.

### Exemplo: resolução de DNS e clientes bloqueados {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagrama que mostra a resolução de nomes DNS para o IP físico 1 num cluster de alta disponibilidade.](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolução de DNS e clientes bloqueados no IP físico 1 num cluster de alta disponibilidade

#### Antes do failover: o nome aponta para o IP físico 1. {#current-state-resolution-to-physical-ip-1}

**O Cliente 1** e **o Cliente 2** consultam o sistema DNS para obter o endereço IP do nome virtual. O sistema DNS devolve o **endereço IP físico 1.** Os clientes estabelecem, então, uma ligação de rede com esse endereço.

#### Após o failover: o nome aponta para o IP físico 2. {#the-failover-challenge-rerouting-to-physical-ip-2}

O servidor 1 falha. O script `start_prim` no servidor 2 altera o registo DNS para **o IP físico 2.** Os clientes ligam-se ao IP físico 2 apenas se todas estas condições forem verdadeiras:

  * O **TTL (Time to Live)** expirou em todos os servidores DNS entre o cliente e o registo DNS.
  * A cache DNS local do Cliente 1 e do Cliente 2 está vazia.
  * A aplicação fecha a ligação e realiza uma *nova* consulta DNS.

Se uma das condições for falsa, **o Cliente 1 e o Cliente 2 permanecerão bloqueados** no endereço IP físico 1. O serviço ficará inativo, mesmo que o registo DNS esteja correto.

### Limites e pré-requisitos {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** Muitos fornecedores de serviços de Internet e servidores DNS empresariais ignoram valores TTL curtos. Podem manter o antigo endereço IP físico 1 durante minutos ou horas.
  * **Comportamento da aplicação:** Muitas aplicações (por exemplo, serviços Java ou web browsers) fazem uma consulta DNS apenas uma vez, quando são iniciadas. Continuam a usar o primeiro endereço IP.
  * **O endereço IP muda a cada failover:** a aplicação não tem um IP virtual local que permaneça o mesmo. As aplicações que registam o seu próprio endereço IP podem não funcionar.
  * **Pré-requisitos:** um TTL curto no registo DNS (por exemplo, de 30 a 60 segundos) e permissão para atualizar a zona DNS a partir de ambos os servidores.

> **⚠️ Nota:** O **integrador** deve escrever os comandos de atualização DNS no script `start_prim`. Estes comandos **não são fornecidos pelo produto SafeKit**. Dependem do servidor DNS (DNS do Windows, BIND ou DNS na nuvem).

### Conclusão {#conclusion}

O redireccionamento de DNS não é uma solução fiável de alta disponibilidade. Utilize-o apenas se todos os clientes realizarem uma nova consulta DNS ao voltarem a ligar-se. Para um failover imediato e transparente, utilize um **IP virtual** : numa LAN estendida, com um balanceador de carga, com CLIs de fornecedores de cloud ou com BGP.

## Como funciona o balanceamento de carga IP virtual num cluster <span class="notranslate farm-term" translate="no">farm</span> na mesma sub-rede {#virtual-ip-load-balancing-same-subnet}

- [Teste do endereço IP virtual de balanceamento de carga num cluster farm SafeKit](/pt-pt/best-practises/test-load-balancing-vip-farm/)

### Balanceamento de carga no kernel, com redundância. {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando há muito tráfego, o SafeKit pode distribuir o trabalho por vários servidores ativos. Se um servidor falhar, os outros continuam a funcionar.

### Arquitetura <span class="notranslate farm-term" translate="no">Farm</span> Cluster : balanceamento de carga entre nós Windows ou Linux. {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagrama de um IP virtual com balanceamento de carga dentro da mesma sub-rede](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Num **cluster de balanceamento de <span class="notranslate farm-term" translate="no">farm</span>**, os clientes ligam-se a um IP virtual e os pedidos são partilhados entre vários servidores em simultâneo. Este exemplo mostra dois nós. Pode adicionar mais nós ao cluster. Na mesma sub-rede, o IP virtual é configurado com um alias IP na placa de rede de **cada servidor** do cluster.

#### Partilha de tráfego: o filtro do kernel {#traffic-distribution-the-kernel-level-filter}

Num cluster <span class="notranslate farm-term" translate="no">farm</span>, um **filtro SafeKit no kernel** partilha o tráfego. Funciona assim:

  * **Mapeamento ARP:** Na cache ARP dos clientes, o IP virtual está ligado a um endereço MAC (por exemplo, `mac1` do Servidor 1).
  * **Análise de pacotes:** O servidor 1 recebe os pacotes. O filtro de kernel SafeKit lê o **endereço IP do cliente** ou a **porta TCP** de cada pacote.
  * **Distribuição de carga:** O filtro decide quais os pacotes que o Servidor 1 processa e quais os pacotes que são enviados para os outros nós (por exemplo, o Servidor 2). Para enviar um pacote para outro nó, o filtro reescreve o **endereço MAC de destino** do pacote com o endereço MAC desse nó. O endereço IP de destino continua a ser o IP virtual. O trabalho é partilhado entre servidores.


#### Failover e redireccionamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o Servidor 1 falhar, o SafeKit envia uma mensagem **ARP gratuita (GARP)**. Os clientes actualizam a sua cache ARP com `mac2` do Servidor 2. De seguida, os clientes são imediatamente reencaminhados para os outros nós do farm.

#### Implantação em locais remotos {#deployment-in-remote-sites}

Esta solução de balanceamento de carga também funciona entre **data centers remotos**, desde que os sites estejam ligados por uma **LAN ou VLAN estendida**. Todos os sites estão na mesma sub-rede. Esta é a configuração mais eficiente para clusters <span class="notranslate farm-term" translate="no">farm</span> em vários locais.

{{%  insert-safekit-farm-video-pt-pt  %}}

## Como funciona um IP virtual com balanceamento de carga em diferentes sub-redes (cluster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Tráfego entre sub-redes na nuvem {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Um cluster <span class="notranslate farm-term" translate="no">farm</span> pode partilhar o trabalho da aplicação entre várias zonas de disponibilidade e sub-redes.

### Clusters <span class="notranslate farm-term" translate="no">farm</span> entre sub-redes: vários nós Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagrama de um cluster farm com balanceamento de carga a operar em duas sub-redes diferentes.](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando os nós <span class="notranslate farm-term" translate="no">farm</span> farm estão em **sub-redes diferentes** (por exemplo, em várias zonas de disponibilidade na nuvem), o **IP virtual** está num **balanceador de carga (LB)** externo. O balanceador de carga envia o tráfego para os endereços IP físicos dos servidores de cada sub-rede.

#### regras de encaminhamento de tráfego e balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O balanceador de carga distribui os pedidos dos clientes com base em dois critérios:

  * **Regras de balanceamento de carga:** por exemplo, o **endereço IP do cliente** ou a **porta TCP do cliente**.
  * **Disponibilidade dos nós:** o balanceador de carga envia tráfego apenas para os nós que estão íntegros, com base na verificação de integridade do SafeKit.


> **⚠️ Nota:** o SafeKit realiza a verificação de integridade. O balanceador de carga é fornecido pela sua rede ou pelo seu fornecedor de cloud.

#### Verificação de saúde SafeKit {#safekit-health-check-mechanism}

O SafeKit fornece um **URL de verificação de integridade** em cada servidor do <span class="notranslate farm-term" translate="no">farm</span>. O balanceador de carga lê este URL para saber o estado de cada servidor:

  * **Nó ATIVO:** a verificação de integridade devolve `HTTP 200 OK`.. O balanceador de carga envia tráfego para este servidor.
  * **Nó INATIVO:** se um servidor ou aplicação falhar, o SafeKit devolve `HTTP 404 NOT FOUND` (ou o servidor não responde). O balanceador de carga deixa de enviar tráfego para este nó imediatamente.


#### Implantação na cloud: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta é a arquitetura padrão para **clusters <span class="notranslate farm-term" translate="no">farm</span> na nuvem**. Se uma sub-rede ou zona deixar de funcionar, os outros nós continuam a processar o tráfego. É compatível com [**Amazon AWS**](</pt-pt/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</pt-pt/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e [**Google Cloud (GCP)**](</pt-pt/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Comparação: implementação de IP virtual, latência e transparência da aplicação. {#virtual-ip-methods-comparison}

**Comparação de métodos de redireccionamento de IP virtual e redireccionamento de DNS para alta disponibilidade e recuperação de desastres.**

Ambiente e caso de uso | Tipo de alta disponibilidade | Método de redireccionamento | Implementado por | Latência da rede | Transparência de aplicações e propriedade intelectual local  
---|---|---|---|---|---  
Primário/backup (alta disponibilidade) | Conjunto Mirror | Aquisição gratuita de ARP/MAC | ✅ Produto SafeKit | Muito baixo: tempo para detetar a falha e enviar o GARP. | Transparência total: o IP virtual é local no nó ativo. O IP do cliente não se altera.  
Balanceamento de carga (ativo/ativo) | agrupamento <span class="notranslate farm-term" translate="no">Farm</span> | Filtro de rede do kernel/GARP | ✅ Produto SafeKit | Muito baixo: tempo para detetar a avaria e trocar os filtros de rede. | Transparência total: o IP virtual é local em todos os nós. O IP do cliente não se altera.  
Mesma sub-rede/LAN estendida (VLAN estendida) | Recuperação de desastres (centros de dados remotos) | Alias IP / GARP | ✅ Produto SafeKit (a VLAN alargada é fornecida pela equipa de rede) | Baixo: depende do tempo de ida e volta (RTT) da VLAN estendida. | Transparência total: o IP virtual é local nos nós. O IP do cliente não se altera.  
Sub-redes diferentes: apenas balanceador de carga | Recuperação de desastres (centros de dados remotos/nuvem) | Balanceador de carga externo | 🛠️ Integrador: configuração do balanceador de carga (o SafeKit realiza a verificação de integridade) | Médio: depende do intervalo de verificação de integridade do balanceador de carga. | ⚠️ Transparência parcial se for utilizado SNAT/DNAT. O IP virtual **NÃO** é local nos nós. O IP do cliente **NÃO** pode ser mantido. A aplicação deve suportar isso.  
Sub-redes diferentes: balanceador de carga + IP virtual local do SafeKit | Recuperação de desastres (centros de dados remotos/nuvem) | Balanceador de carga externo com Floating IP / Direct Server Return | 🛠️ Integrador: configuração do balanceador de carga (o SafeKit realiza a verificação de integridade) | Médio: depende do intervalo de verificação de integridade do balanceador de carga. | Boa transparência: o IP virtual é local no nó primário e é o endereço de destino.
Sub-redes diferentes: CLI da cloud | Recuperação de desastres (nuvem) | API na nuvem: o IP privado ou uma rota na nuvem é movido para o novo endereço primário. | 🛠️ Integrador: comandos da CLI na cloud no script `start_prim` | De médio a alto: depende do tempo de resposta da API na cloud. | Transparência total: o IP virtual é local no nó primário. O IP do cliente não se altera.
Sub-redes diferentes: BGP | Recuperação de desastres (centros de dados remotos/nuvem) | Rota /32 anunciada com BGP | 🛠️ Integrador: comandos BGP nos scripts `start_prim` e `stop_prim` | Baixo a médio: depende do tempo de convergência do BGP. | Transparência total: o IP virtual é local no nó primário. O IP do cliente não se altera. Requer routers BGP.  
Redireccionamento de DNS: sem IP virtual | Recuperação de desastres (centros de dados remotos) | Alteração de registo DNS (nome/IP físico) | 🛠️ Integrador: comandos de atualização de DNS no script `start_prim` | Alto e imprevisível: depende do TTL (Time To Live) do DNS e da cache DNS do cliente. | ⚠️ Não fidedigno: o cliente necessita de fazer uma nova consulta DNS. Frequentemente, os clientes mantêm o endereço IP antigo recebido no arranque e não são redirecionados após a falha.  
  
## Perguntas frequentes sobre o IP virtual {#virtual-ip-faq}

### IP virtual e redes {#virtual-ip--networking}

O que é um IP virtual e qual a diferença entre este e um IP físico?

Um **endereço IP físico** está ligado a uma placa de rede. Um **IP virtual** não está ligado a hardware. Num cluster SafeKit, os clientes utilizam sempre o IP virtual. Se o servidor primário falhar, o IP virtual é automaticamente transferido para um nó íntegro. Não precisa de alterar a configuração do cliente.

Preciso de um balanceador de carga de hardware para utilizar um IP virtual?

Não. **O SafeKit** gere o IP virtual por software. Na mesma sub-rede, utiliza **alias IP** e **ARP gratuito (GARP)** para redirecionar o tráfego. Não precisa de um balanceador de carga externo nem de um servidor proxy.

O que é o ARP gratuito (GARP) e porque é utilizado?

**O ARP gratuito (GARP)** é uma mensagem de rede enviada para todos os dispositivos. Atualiza as tabelas ARP de switches e routers. Em caso de falha, o novo servidor primário envia uma mensagem GARP. A mensagem informa que o **endereço IP virtual** está agora ligado ao endereço MAC do novo servidor primário. O tráfego é então redirecionado imediatamente.

Posso associar um nome DNS a um endereço IP virtual?

**Sim.** Crie um registo A padrão para o IP virtual. O redireccionamento é feito ao **nível do IP virtual** (com ARP ou redireccionamento de rede), **e não ao nível do DNS**. Não terá atrasos de DNS nem problemas de TTL, e o failover permanece **transparente para a aplicação**.

### Cloud e arquiteturas avançadas {#cloud--advanced-architectures}

Como funciona um IP virtual na cloud (AWS, Azure, GCP)?

Na nuvem, as mensagens GARP de nível 2 não estão disponíveis para redirecionar um IP virtual. O SafeKit funciona com **balanceadores de carga na cloud** (AWS ELB, Azure LB ou Google GCLB). O SafeKit fornece um **URL de verificação de integridade**. O balanceador de carga lê esse URL e envia o tráfego para o nó ativo.

Será uma LAN estendida melhor do que um balanceador de carga para recuperação de desastres?

**Sim**. Entre data centers remotos, uma **LAN estendida (VLAN estendida)** é normalmente melhor porque a transição em caso de falha permanece **transparente para a aplicação**. O **IP virtual não se altera**, pelo que a aplicação e os seus clientes continuam a utilizar o mesmo endereço após uma transição em caso de falha entre data centers.

Quais são as limitações do redireccionamento DNS em comparação com um IP virtual?

**O redireccionamento DNS** depende do **TTL (Tempo de Vida)** e da cache DNS do cliente. A recuperação pode demorar horas. Além disso, **os clientes que não realizam uma nova consulta DNS permanecem bloqueados** no servidor com falha. Um **IP virtual** é redirecionado imediatamente com mensagens GARP na camada 2. A cache DNS do cliente não tem qualquer efeito.

### Transparência e segurança {#transparency--security}

Porque é que um endereço IP virtual local é importante para a transparência da aplicação?

Com um **IP virtual** local, a aplicação utiliza um endereço que não muda. O SafeKit faz o redireccionamento no **kernel**. A aplicação não percebe a falha. Com o DNAT, o endereço utilizado pela aplicação muda.

Um endereço IP virtual mantém o endereço IP original do cliente?

Sim. O SafeKit não utiliza NAT de origem (SNAT). O IP virtual é local no servidor ativo, pelo que a aplicação recebe o **IP original do cliente**. Isto é importante para auditorias de segurança, persistência de sessões e registos regulamentares.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
