---
title: "Como funciona um endereço IP virtual num cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/how-a-virtual-ip-address-works/"
description: "Como o SafeKit move um IP virtual em caso de falha: ARP gratuito na mesma sub-rede, balanceador de carga, CLI na nuvem ou BGP entre sub-redes. Porque é que um IP virtual local é importante."
category: "best-practises"
lang: "pt-pt"
topics: "O que é um endereço IP virtual num cluster de alta disponibilidade?, Implementação de IP virtual no SafeKit, Como funciona um IP virtual na mesma sub-rede (cluster mirror), Como funciona um IP virtual em diferentes sub-redes com um balanceador de carga (cluster mirror), Como funciona um IP virtual em diferentes sub-redes com CLIs de fornecedor de nuvem (cluster mirror), Como funciona um IP virtual em diferentes sub-redes com BGP (cluster mirror), Como funciona o redirecionamento de DNS em diferentes sub-redes (cluster mirror), Como funciona o balanceamento de carga de IP virtual num cluster farm na mesma sub-rede, Como funciona um IP virtual com balanceamento de carga em diferentes sub-redes (cluster farm), Comparação: implementação de IP virtual, latência e transparência da aplicação, Perguntas frequentes sobre IP virtual, 🔍 Explorar o SafeKit"
translation: "translate_md 2026-11-05.13 | glossaire 2026-11-05.17 | Translation LLM | 12 expressions"
---

# Como funciona um endereço IP virtual num cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual num cluster de alta disponibilidade? {#virtual-ip-definition}

Um **endereço IP virtual** é o único endereço que os clientes utilizam para se ligarem a uma aplicação num [cluster de alta disponibilidade](</pt-pt/>). O IP virtual não está associado a um único servidor. Em caso de falha, ele é transferido para o servidor que executa a aplicação. Os clientes não precisam de alterar a sua configuração.

**Princípio fundamental no SafeKit:** o IP virtual é **configurado localmente no servidor** que executa a aplicação. A aplicação inicia-se no IP virtual e recebe o IP original do cliente. É por isso que muitas aplicações funcionam corretamente com o SafeKit sem qualquer alteração. O SafeKit oferece dois tipos de IP virtual:

  * **IP virtual primário/secundário com um cluster mirror:** o IP virtual está ativo apenas no servidor primário. Em caso de falha, é transferido para o servidor secundário.
  * **Balanceamento de carga de rede com IP virtual e um cluster <span class="notranslate farm-term" translate="no">farm</span>:** o IP virtual está ativo em todos os servidores ao mesmo tempo. O tráfego é partilhado entre eles.

## Implementação de IP virtual no SafeKit {#safekit-virtual-ip-implementation}

Este artigo explica como o SafeKit move o IP virtual em cada arquitetura de rede:

  * **Mesma sub-rede ou VLAN estendida (clusters [mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)):** O SafeKit configura o IP virtual no servidor e envia um **ARP gratuito (GARP)**. Não é necessário hardware externo. Esta é a solução mais transparente (tudo é implementado pelo produto SafeKit).
  * **Diferentes subredes com um balanceador de carga ([mirror](#virtual-ip-different-subnets-failover) e clusters [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)):** o balanceador de carga utiliza a **verificação de estado** do SafeKit para enviar tráfego para o servidor correto (o balanceador de carga é configurado pelo integrador).
  * **[Diferentes subredes com CLIs de fornecedor de nuvem](#virtual-ip-cloud-cli-failover) (cluster mirror):** o script `start_prim` do SafeKit chama a CLI da nuvem para mover o IP virtual (script escrito pelo integrador).
  * **[Diferentes subredes com BGP](#virtual-ip-bgp-failover) (cluster mirror):** o servidor principal anuncia o IP virtual aos routers (script escrito pelo integrador).
  * **[Diferentes subredes com redirecionamento DNS](#virtual-ip-vs-dns-redirection-failover) (cluster mirror):** o script `start_prim` do SafeKit altera o registo DNS do nome virtual para o IP físico do novo servidor primário (script escrito pelo integrador). Não existe um único IP virtual, e este método não é fiável para todos os clientes.

Também neste artigo:

  * [Comparação: implementação de IP virtual, latência e transparência da aplicação](#virtual-ip-methods-comparison)
  * [Perguntas frequentes sobre IP virtual](#virtual-ip-faq)
  * [🔍 Explore o SafeKit](#hub)

![Diagrama comparativo do comportamento do IP virtual no Eviden SafeKit: clusters mirror que mostram um IP flutuante no nó ativo vs. clusters farm que mostram o balanceamento de carga da rede em todos os nós.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementação de IP virtual para clusters mirror e <span class="notranslate farm-term" translate="no">farm</span> no SafeKit.**

## Como funciona um IP virtual na mesma sub-rede (cluster mirror) {#virtual-ip-same-subnet-failover}

- [Testando o IP virtual primário/secundário num cluster mirror do SafeKit](/pt-pt/best-practises/test-primary-backup-vip-mirror/)

### Failover automático e redirecionamento de rede numa sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Numa rede local, **o SafeKit** gere o IP virtual e a comutação por falha da aplicação automaticamente.

### Cluster mirror local: sistema de redundância de 2 nós no Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mecanismo de failover de IP virtual do SafeKit entre dois servidores na mesma sub-rede](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Num **cluster mirror SafeKit**, os dois nós estão na mesma sub-rede. A alta disponibilidade utiliza um **IP virtual**. O SafeKit gere o IP virtual na pilha de rede do sistema operativo. Não é necessário hardware especial. O IP virtual é adicionado aos endereços IP físicos do Servidor 1 e do Servidor 2 com **o recurso de IP aliasing**. Os clientes ligam-se sempre ao IP virtual.

#### Alias de IP e múltiplos IPs virtuais no SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

O IP virtual é um terceiro endereço IP que se move entre os nós. O SafeKit pode gerir **vários IPs virtuais** num único cluster. Pode colocá-los na mesma placa de rede ou em placas de rede diferentes. Desta forma, cada serviço pode usar o seu próprio IP virtual.

#### O mecanismo de failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

A comutação de falha não requer qualquer ação manual. Em operação normal, o IP virtual está ligado ao **endereço MAC do Servidor 1 (mac1)**. Se o Servidor 1 falhar, o SafeKit faz três coisas:

  * **Alias de IP virtual:** O SafeKit configura o IP virtual como um alias na placa de rede do Servidor 2, o novo servidor primário. O sistema operativo envia então mensagens na rede para anunciar o IP virtual.
  * **GARP:** O SafeKit também envia mensagens **ARP gratuitas (GARP)**. Os switches de rede e os clientes atualizam a sua cache ARP. O IP virtual está agora associado ao **endereço MAC do Servidor 2 (mac2)**.
  * **Recuperação da aplicação:** O SafeKit reinicia os serviços da aplicação no Servidor 2.


#### Centros de dados remotos e VLANs estendidas {#remote-data-centers--extended-vlans}

A **solução de sub-rede única descrita acima** também funciona para **recuperação de desastres** entre locais remotos. É frequentemente a melhor escolha quando os locais estão ligados por uma **VLAN estendida** (LAN estendida). Ambos os locais estão numa única sub-rede. A rede é mais simples e não são necessários protocolos de roteamento complexos.

> **⚠️ Nota:** O reencaminhamento na camada 2 com ARP gratuito é a **solução mais transparente** para as aplicações. A aplicação recebe o IP original do cliente e o IP virtual é configurado localmente. Muitas aplicações **necessitam de um IP virtual local**. Sem ele, estas aplicações **podem não funcionar corretamente**. Nesta configuração de mesma sub-rede, o SafeKit implementa todo o mecanismo, pelo que não é necessário qualquer trabalho de integração especial.

## Como um IP virtual funciona em diferentes subredes com um balanceador de carga (cluster mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga com verificações de integridade do SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de um failover de IP virtual usando um balanceador de carga em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando os nós estão em **subredes diferentes**, o ARP gratuito não consegue mover o IP virtual. Neste caso, o IP virtual está num **balanceador de carga**. O balanceador de carga envia o tráfego para o servidor principal.

O SafeKit disponibiliza um **URL de verificação de estado** em cada nó:

  * **Primário (PRIM):** devolve `HTTP 200 OK`. O balanceador de carga envia tráfego para este nó.
  * **Secundário (SECOND):** devolve `HTTP 404 NOT FOUND`. O balanceador de carga não envia tráfego para este nó.

Em caso de falha, o SafeKit altera as respostas e o balanceador de carga envia o tráfego para o novo servidor principal. Esta é a solução padrão entre **zonas de disponibilidade** na [**AWS**](</pt-pt/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</pt-pt/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</pt-pt/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** O SafeKit fornece a verificação de estado. A sua rede ou o seu fornecedor de serviços na nuvem fornecem o balanceador de carga.

### O problema: o balanceador de carga é o proprietário do IP virtual {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Apenas com um balanceador de carga, os clientes ligam-se ao IP virtual. O balanceador de carga traduz o IP virtual (NAT) para o **IP físico** do servidor principal. O cliente utiliza o IP virtual, mas o servidor utiliza o seu IP físico. O servidor não vê o IP virtual.

### Mantenha o IP virtual configurado localmente no servidor principal {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Algumas aplicações utilizam o IP virtual como endereço do servidor. Funcionam corretamente apenas se o IP virtual também estiver **configurado localmente no servidor principal**. Então:

  * os serviços podem começar no IP virtual;
  * o servidor consegue aceder aos seus próprios serviços através do IP virtual;
  * A autenticação funciona com o IP virtual.

 Com o SafeKit, pode configurar o IP virtual localmente no servidor principal. O método depende da sub-rede do IP virtual:

  * **O IP virtual está na mesma sub-rede que os endereços IP físicos dos servidores:** mantenha a secção `<vip>` no módulo SafeKit. O SafeKit configura automaticamente o IP virtual como um alias na placa de rede do endereço IP físico.
  * **O IP virtual está numa sub-rede diferente:** mantenha a secção `<vip>` no módulo SafeKit, com uma configuração específica. O exemplo abaixo mostra esta configuração no Azure.
  * **Outra opção para uma sub-rede diferente:** utilize o script `start_prim` para configurar o IP virtual numa interface dedicada, como a interface loopback, antes de a aplicação ser iniciada. Utilize o script `stop_prim` para remover o IP virtual após a aplicação ser terminada. O integrador escreve estes comandos. Eles não são fornecidos pelo produto SafeKit.

**Nota:** Alguns balanceadores de carga podem manter o IP virtual como endereço de destino (por exemplo, Floating IP ou Direct Server Return).

### Exemplo: Balanceador de carga do Azure com um IP virtual local (Milestone XProtect) {#azure-load-balancer-local-virtual-ip-example}

Esta arquitetura é utilizada em produção no Azure para o **servidor de gestão Milestone XProtect**, com o módulo `videoos` SafeKit. Os dois nós estão em duas zonas de disponibilidade. O IP virtual é o IP de front-end do balanceador de carga. Este IP de front-end está numa sub-rede dedicada.

**No lado do Azure** (configurado pela equipa de infraestruturas):

  1. Crie um **balanceador de carga de camada 4** com um IP de front-end numa sub-rede dedicada.
  2. Adicione os dois nós do SafeKit ao **conjunto de servidores** do balanceador de carga.
  3. Adicione uma **sonda de estado de saúde** no URL de verificação de estado de saúde do SafeKit do módulo: caminho `/var/modules/videoos/ready.txt`, porta `9010` (HTTP) ou porta `9453` (HTTPS com certificados válidos). Para outro módulo, substitua `videoos` pelo nome do módulo.
  4. Adicione **regras de balanceamento de carga** para todas as portas que os clientes utilizam no IP virtual: as portas dos serviços de gestão do Milestone e, se necessário, as portas de outros serviços.

**No lado do SafeKit:** no ficheiro `userconfig.xml` do módulo (`videoos/conf/userconfig.xml`), substitua a secção `<vip>` padrão por esta secção:

```xml
<vip>
  <interface_list>
    <interface check="on" arpreroute="on" name="VM_INTERFACE_NAME">
      <real_interface>
        <virtual_addr addr="LB_FRONTEND_IP" netmask="LB_FRONTEND_NETMASK" where="one_side_alias" />
      </real_interface>
    </interface>
  </interface_list>
</vip>
```

Substitua `VM_INTERFACE_NAME` pelo nome da interface de rede da VM, `LB_FRONTEND_IP` pelo IP de front-end do balanceador de carga e `LB_FRONTEND_NETMASK` pela máscara de rede da sub-rede de front-end. A interface de rede deve ter o mesmo nome em ambos os nós. Para mais informações, consulte o Guia do Utilizador, secção 13.6.4 " [Sintaxe `<vip>`](https://safekit.eviden.com/pt-pt/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".

**No lado da aplicação:** configure todos os serviços do Milestone para usar o IP virtual, e não o endereço IP privado do servidor.

> **⚠️ Nota:** Utilize uma sub-rede de front-end que **não se sobreponha** à sub-rede das VMs. Por exemplo, VMs em `10.0.1.0/24` e IP de front-end do balanceador de carga em `10.0.2.0/24`. O SafeKit adiciona o IP de front-end com a sua máscara de rede na interface de rede da VM. Se as duas sub-redes se sobrepuserem, esta pseudodesignação altera o encaminhamento da VM e o tráfego de rede das VMs pode falhar.


## Como um IP virtual funciona em diferentes sub-redes com as CLIs de fornecedores de nuvem (cluster mirror) {#virtual-ip-cloud-cli-failover}

### Por que o ARP gratuito não funciona na nuvem {#why-gratuitous-arp-does-not-work-in-public-clouds}

As redes em nuvem (AWS, Azure, Google Cloud) **ignoram o ARP gratuito**. Elas enviam tráfego apenas para endereços IP que estão atribuídos na plataforma em nuvem. O SafeKit configura o IP virtual no servidor principal, mas a rede em nuvem não envia o tráfego do IP virtual para este servidor.

### Mover o IP virtual com a CLI da nuvem {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sem um balanceador de carga, a CLI do fornecedor de nuvem pode ser integrada no **script `start_prim`** do SafeKit para atualizar a configuração da rede de nuvem antes do início da aplicação. A CLI pode atribuir o IP virtual ao nó que se torna primário ou atualizar a rota de nuvem para direcionar o tráfego do IP virtual para esse nó.

O **IP virtual permanece local** no servidor principal. **Não há NAT**, e o IP original do cliente não muda.

### Restrições {#constraints-of-the-cli-approach}

  * A CLI da nuvem deve ser instalada em ambos os nós. Cada nó precisa de uma identidade de nuvem com direitos de rede.
  * O script deve gerir erros e tentativas de repetição.
  * A recuperação de falhas é **muito mais lenta** do que com um balanceador de carga e uma sonda de integridade, porque cada recuperação de falhas aguarda a resposta da API da nuvem.

> **⚠️ Nota:** O **integrador** deve adicionar os comandos da CLI da nuvem ao script `start_prim`. Estes comandos **não são fornecidos pelo produto SafeKit**. Dependem do fornecedor da nuvem, do design da rede e das regras de segurança do cliente. Valide a solução com a sua equipa de rede antes da produção.

## Como um IP virtual funciona em diferentes sub-redes com BGP (cluster mirror) {#virtual-ip-bgp-failover}

### Redirecionamento de IP virtual com BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Com o BGP (Border Gateway Protocol), o IP virtual é normalmente configurado numa interface loopback do servidor principal pelo script `start_prim` antes do início da aplicação. O servidor principal anuncia o IP virtual aos routers como uma rota /32.

Em caso de falha, o script `stop_prim` no antigo servidor primário para a aplicação, remove o IP virtual da interface loopback e retira a rota /32 dos routers. Se o antigo servidor primário falhar, `stop_prim` não é executado, mas os routers perdem a sessão BGP e removem a rota automaticamente.

### Vantagens e pré-requisitos {#benefits-and-prerequisites}

  * **O IP virtual permanece local, não há NAT e o IP do cliente não muda.**
  * Funciona em subredes e em diferentes locais. Não é necessária uma VLAN estendida.
  * Você precisa de routers BGP e da ajuda da sua equipa de rede. Na nuvem, você precisa de um serviço de servidor de rotas do seu fornecedor de nuvem.

> **⚠️ Nota:** A integração BGP utiliza scripts SafeKit e a sua infraestrutura de encaminhamento. O **integrador** deve escrever os comandos nos scripts `start_prim` e `stop_prim`. Estes scripts **não são fornecidos pelo produto SafeKit**. Valide a solução com a sua equipa de rede antes da produção.

## Como funciona o redirecionamento de DNS entre diferentes sub-redes (cluster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Redirecionamento de DNS com o script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Com o redirecionamento DNS, **não existe um único IP virtual**. Os clientes ligam-se a um **nome virtual** (o nome DNS). Em caso de falha, o script `start_prim` no novo servidor primário inicia a aplicação e, em seguida, altera o registo DNS do nome virtual para o **IP físico** do novo servidor primário.

O script `stop_prim` não precisa de fazer nada. Se o servidor primário antigo falhar, o novo servidor primário sobrescreve o registo DNS.

### Exemplo: Resolução de DNS e clientes que mantêm o IP antigo {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagrama que mostra a resolução de nomes DNS para o IP físico 1 num cluster de alta disponibilidade.](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolução DNS: os clientes continuam ligados ao IP físico 1 num cluster de alta disponibilidade

#### Antes da comutação de contingência: o nome aponta para o IP físico 1 {#current-state-resolution-to-physical-ip-1}

**O Cliente 1** e **o Cliente 2** solicitam ao sistema DNS o endereço IP do nome virtual. O sistema DNS devolve **o IP físico 1.** Os clientes abrem então uma ligação de rede para este endereço.

#### Após a falha: o nome aponta para o IP físico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

O Servidor 1 falha. O script `start_prim` no Servidor 2 altera o registo DNS para o **IP físico 2.** Os clientes ligam-se ao IP físico 2 apenas se todas estas condições forem verdadeiras:

  * O **TTL (Tempo de Vida)** expirou em todos os servidores DNS entre o cliente e o registo DNS.
  * A cache DNS local do Cliente 1 e do Cliente 2 está vazia.
  * A aplicação fecha a sua ligação e faz uma *nova* consulta DNS.

Se uma condição for falsa, **o Cliente 1 e o Cliente 2** continuam a usar o IP físico 1. O serviço está inativo, mesmo que o registo DNS esteja correto.

### Limites e pré-requisitos {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** Muitos fornecedores de serviços de Internet e servidores DNS de empresas ignoram valores TTL curtos. Podem manter o IP físico antigo 1 por minutos ou horas.
  * **Comportamento da aplicação:** Muitas aplicações (por exemplo, serviços Java ou navegadores web) realizam uma pesquisa DNS apenas uma vez, quando são iniciadas. Elas continuam a usar o primeiro endereço IP.
  * **O endereço IP muda em cada failover:** a aplicação não tem um IP virtual local que permaneça o mesmo. As aplicações que registam o seu próprio endereço IP podem não funcionar.
  * **Pré-requisitos:** um TTL curto no registo DNS (por exemplo, 30 a 60 segundos) e direitos para atualizar a zona DNS de ambos os servidores.

> **⚠️ Nota:** O **integrador** deve escrever os comandos de atualização do DNS no script `start_prim`. Estes comandos **não são fornecidos pelo produto SafeKit**. Dependem do servidor DNS (Windows DNS, BIND ou DNS na nuvem).

### Conclusão {#conclusion}

O redirecionamento de DNS não é uma solução fiável de alta disponibilidade. Utilize-o apenas se todos os clientes efetuarem uma nova consulta de DNS quando se voltarem a ligar. Para uma comutação de falha imediata e transparente, utilize um **IP virtual** : com uma VLAN estendida, com um balanceador de carga, com CLIs de fornecedor de nuvem ou com BGP.

## Como funciona o balanceamento de carga de IP virtual num cluster <span class="notranslate farm-term" translate="no">farm</span> na mesma sub-rede {#virtual-ip-load-balancing-same-subnet}

- [Testando o IP virtual de balanceamento de carga num cluster farm do SafeKit](/pt-pt/best-practises/test-load-balancing-vip-farm/)

### Balanceamento de carga e redundância ao nível do kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando há muito tráfego, o SafeKit pode distribuir o trabalho entre vários servidores ativos. Se um servidor falhar, os outros servidores continuam a funcionar.

### Arquitetura de cluster <span class="notranslate farm-term" translate="no">farm</span>: balanceamento de carga entre nós Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagrama de um IP virtual com balanceamento de carga dentro da mesma sub-rede](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Num **cluster <span class="notranslate farm-term" translate="no">farm</span> de balanceamento de carga**, os clientes ligam-se a um IP virtual e os pedidos são partilhados entre vários servidores em simultâneo. Este exemplo mostra dois nós. É possível adicionar mais nós ao cluster. Na mesma sub-rede, o IP virtual é configurado com um IP alternativo na placa de rede de **cada servidor** no cluster.

#### Partilha de tráfego: o filtro do kernel {#traffic-distribution-the-kernel-level-filter}

Num cluster <span class="notranslate farm-term" translate="no">farm</span>, um **filtro SafeKit no kernel** partilha o tráfego. Funciona da seguinte forma:

  * **Mapeamento ARP:** Na cache ARP dos clientes, o IP virtual está associado a um endereço MAC (por exemplo, `mac1` do Servidor 1).
  * **Análise de pacotes:** O Servidor 1 recebe os pacotes. O filtro do kernel do SafeKit lê o **IP do cliente** ou a **porta TCP** de cada pacote.
  * **Partilha de carga:** O filtro decide quais os pacotes que o Servidor 1 processa e quais os pacotes que vão para os outros nós (por exemplo, Servidor 2). Para enviar um pacote para outro nó, o filtro reescreve o **endereço MAC de destino** do pacote com o endereço MAC desse nó. O endereço IP de destino permanece o IP virtual. O trabalho é partilhado entre os servidores.


#### Failover e redirecionamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o Servidor 1 falhar, o SafeKit envia uma mensagem **ARP gratuita (GARP)**. Os clientes atualizam a sua cache ARP com `mac2` do Servidor 2. Os clientes são então imediatamente redirecionados para os outros nós da farm.

#### Implementação em locais remotos {#deployment-in-remote-sites}

Esta solução de balanceamento de carga também funciona entre **centros de dados remotos**, se os locais estiverem ligados por uma **VLAN estendida**. Todos os locais ficam então na mesma sub-rede. Esta é a configuração mais eficiente para clusters <span class="notranslate farm-term" translate="no">farm</span> em vários locais.

{{%  insert-safekit-farm-video-pt-pt  %}}

## Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Tráfego entre subredes da nuvem {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Um cluster <span class="notranslate farm-term" translate="no">farm</span> pode partilhar o trabalho da aplicação entre várias zonas de disponibilidade e sub-redes.

### Clusters <span class="notranslate farm-term" translate="no">farm</span> em rede distribuída: vários nós Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagrama de um cluster farm com balanceamento de carga a operar em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando os nós <span class="notranslate farm-term" translate="no">farm</span> estão em **subredes diferentes** (por exemplo, em várias zonas de disponibilidade na nuvem), o **IP virtual** está num **balanceador de carga** externo. O balanceador de carga envia o tráfego para os endereços IP físicos dos servidores em cada sub-rede.

#### Regras de encaminhamento de tráfego e de balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O balanceador de carga partilha os pedidos dos clientes com base em dois critérios:

  * **Regras de balanceamento de carga:** por exemplo, o **endereço IP do cliente** ou a **porta TCP do cliente**.
  * **Disponibilidade dos nós:** o balanceador de carga envia tráfego apenas para os nós que estão íntegros, com base na verificação de integridade do SafeKit.


> **⚠️ Nota:** O SafeKit fornece a verificação de estado. A sua rede ou o seu fornecedor de serviços na nuvem fornecem o balanceador de carga.

#### Verificação de estado do SafeKit {#safekit-health-check-mechanism}

O SafeKit disponibiliza um **URL de verificação de estado** em cada servidor da <span class="notranslate farm-term" translate="no">farm</span>. O balanceador de carga lê-o para saber o estado de cada servidor:

  * **O nó UP:** a verificação de estado retorna `HTTP 200 OK`. O balanceador de carga envia tráfego para este servidor.
  * **Nó DOWN:** se um servidor ou uma aplicação falhar, o SafeKit devolve `HTTP 404 NOT FOUND` (ou o servidor não responde). O balanceador de carga para de enviar tráfego para este nó imediatamente.


#### Implementação na nuvem: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta é a arquitetura padrão para **clusters <span class="notranslate farm-term" translate="no">farm</span> na nuvem**. Se uma sub-rede ou uma zona parar, os outros nós continuam a processar o tráfego. É suportada na [**Amazon AWS**](</pt-pt/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</pt-pt/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e [**Google Cloud (GCP)**](</pt-pt/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Comparação: implementação de IP virtual, latência e transparência da aplicação {#virtual-ip-methods-comparison}

**Comparação de métodos de redirecionamento de IP virtual e redirecionamento de DNS para alta disponibilidade e recuperação de desastres.**

Ambiente e caso de uso | Tipo de alta disponibilidade | Método de redirecionamento | Implementado por | Latência da rede | Transparência da aplicação e IP local  
---|---|---|---|---|---  
Primário/secundário (alta disponibilidade) | Cluster mirror | ARP Gratuito (transferência do endereço MAC) | ✅ Produto SafeKit | Muito baixo: tempo para detetar a falha e enviar o GARP | Transparência total: o IP virtual é local no nó ativo. O IP do cliente não muda.  
Balanceamento de carga (ativo/ativo) | Cluster <span class="notranslate farm-term" translate="no">farm</span> | Filtro de rede do kernel / GARP | ✅ Produto SafeKit | Muito baixo: tempo para detetar a falha e mudar os filtros da rede | Transparência total: o IP virtual é local em todos os nós. O IP do cliente não muda.  
Mesma sub-rede / VLAN estendida | Recuperação de desastres (centros de dados remotos) | Alias de IP / GARP | ✅ Produto SafeKit (a VLAN estendida é fornecida pela equipa de rede) | Baixo: depende do tempo de ida e volta (RTT) da VLAN estendida | Transparência total: o IP virtual é local nos nós. O IP do cliente não muda.  
Sub-redes diferentes: apenas balanceador de carga | Recuperação de desastres (centros de dados remotos / nuvem) | Balanceador de carga externo | 🛠️ Integrador: configuração do balanceador de carga (o SafeKit fornece a verificação de estado) | Meio: depende do intervalo de verificação de integridade do balanceador de carga | ⚠️ Transparência parcial se SNAT/DNAT for utilizado. O IP virtual **NÃO** é local nos nós. O IP do cliente PODE **NÃO** ser mantido. A aplicação deve suportar isto.  
Diferentes sub-redes: balanceador de carga + IP virtual local do SafeKit | Recuperação de desastres (centros de dados remotos / nuvem) | Balanceador de carga externo com Floating IP / Direct Server Return, ou IP de front-end como um alias local do SafeKit | 🛠️ Integrador: configuração do balanceador de carga (o SafeKit fornece a verificação de estado) | Meio: depende do intervalo de verificação de integridade do balanceador de carga | Boa transparência: o IP virtual é local no nó principal e é o endereço de destino.
Diferentes subredes: CLI da nuvem | Recuperação de desastres (nuvem) | API da nuvem: o IP privado ou uma rota da nuvem é movido para o novo nó principal | 🛠️ Integrador: comandos da CLI da nuvem no script `start_prim` | Médio a alto: depende do tempo de resposta da API da nuvem | Transparência total: o IP virtual é local no nó principal. O IP do cliente não muda.
Diferentes sub-redes: BGP | Recuperação de desastres (centros de dados remotos / nuvem) | /32 rota anunciada com BGP | 🛠️ Integrador: Comandos BGP nos scripts `start_prim` e `stop_prim` | Baixo a médio: depende do tempo de convergência do BGP | Transparência total: o IP virtual é local no nó principal. O IP do cliente não muda. Requer routers BGP.  
Redirecionamento DNS: sem IP virtual | Recuperação de desastres (centros de dados remotos) | Alteração do registo DNS (nome / IP físico) | 🛠️ Integrador: Comandos de atualização de DNS no script `start_prim` | Elevado e imprevisível: depende do TTL (Time To Live) do DNS e da cache DNS do cliente. | ⚠️ Não é fiável: o cliente tem de fazer uma nova consulta DNS. Frequentemente, os clientes mantêm o IP antigo que receberam no arranque e não são redirecionados após a falha.  
  
## Perguntas frequentes sobre IP virtual {#virtual-ip-faq}

### IP virtual e redes {#virtual-ip--networking}

O que é um IP virtual e como é que este se diferencia de um IP físico?

Um **endereço IP físico** está associado a uma placa de rede. Um **IP virtual** não está associado a hardware. Num cluster SafeKit, os clientes utilizam sempre o IP virtual. Se o servidor principal falhar, o IP virtual move-se automaticamente para um nó em funcionamento. Não é necessário alterar a configuração do cliente.

Preciso de um balanceador de carga de hardware para usar um IP virtual?

Não. **O SafeKit** gere o IP virtual com software. Na mesma sub-rede, utiliza **o IP aliasing** e **o ARP gratuito (GARP)** para redirecionar o tráfego. Não precisa de um balanceador de carga externo ou de um servidor proxy.

O que é o ARP gratuito (GARP) e por que é utilizado?

**O ARP Gratuito (GARP)** é uma mensagem de rede enviada a todos os dispositivos. Atualiza as tabelas ARP de switches e routers. Em caso de falha, o novo servidor primário envia uma mensagem GARP. A mensagem indica que o **IP virtual** está agora associado ao endereço MAC do novo servidor primário. O tráfego é então redirecionado imediatamente.

Posso associar um nome DNS a um IP virtual?

**Sim.** Crie um registo A padrão para o IP virtual. O redirecionamento é feito ao **nível do IP virtual** (com ARP ou redirecionamento de rede), **não ao nível do DNS**. Não terá atrasos de DNS ou problemas de TTL, e a comutação de falha permanece **transparente para a aplicação**.

### Nuvem e arquiteturas avançadas {#cloud--advanced-architectures}

Como funciona um IP virtual na nuvem (AWS, Azure, GCP)?

Na nuvem, as mensagens GARP de camada 2 não estão disponíveis para o redirecionamento de um IP virtual. O SafeKit funciona com **balanceadores de carga na nuvem** (AWS Elastic Load Balancing, Azure Load Balancer ou Google Cloud Load Balancing). O SafeKit fornece um **URL de verificação de estado**. O balanceador de carga lê-o e envia o tráfego para o nó ativo.

Uma VLAN estendida é melhor do que um balanceador de carga para recuperação de desastres?

**Sim**. Entre centros de dados remotos, uma **VLAN estendida** é muitas vezes melhor porque a comutação de falha permanece **transparente para a aplicação**. O **IP virtual não muda**, pelo que a aplicação e os seus clientes continuam a usar o mesmo endereço após uma comutação de falha entre centros de dados.

Quais são os limites do redirecionamento DNS em comparação com um IP virtual?

**O redirecionamento de DNS** depende do **TTL (Time to Live)** e da cache de DNS do cliente. A recuperação pode demorar horas. Além disso, **os clientes que não efetuam uma nova consulta de DNS** continuam a usar o servidor com falha. Um **IP virtual** é redirecionado imediatamente com mensagens GARP na camada 2. A cache de DNS do cliente não tem qualquer efeito.

### Transparência e segurança {#transparency--security}

Por que é que um IP virtual local é importante para a transparência da aplicação?

Com um **IP virtual** local, a aplicação utiliza um endereço que não muda. O SafeKit faz o redirecionamento no **kernel**. A aplicação não vê a mudança de servidor. Com o DNAT, o endereço utilizado pela aplicação muda.

Um IP virtual mantém o endereço IP original do cliente?

Sim. O SafeKit não utiliza NAT de origem (SNAT). O IP virtual é local no servidor ativo, pelo que a aplicação recebe o **IP original do cliente**. Isto é importante para auditorias de segurança, persistência de sessão e registos regulamentares.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
