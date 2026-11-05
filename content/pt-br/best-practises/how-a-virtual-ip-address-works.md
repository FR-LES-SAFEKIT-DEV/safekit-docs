---
title: "Como funciona um endereço IP virtual em um cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-br/best-practises/how-a-virtual-ip-address-works/"
description: "Como o SafeKit move um IP virtual em caso de falha: ARP gratuito na mesma sub-rede, balanceador de carga, CLI de nuvem ou BGP entre sub-redes. Por que um IP virtual local é importante."
category: "best-practises"
lang: "pt-br"
topics: "O que é um endereço IP virtual em um cluster de alta disponibilidade?, Implementação de IP virtual no SafeKit, Como um IP virtual funciona na mesma sub-rede (cluster mirror), Como um IP virtual funciona em diferentes sub-redes com um balanceador de carga (cluster mirror), Como um IP virtual funciona em diferentes sub-redes com CLIs de provedor de nuvem (cluster mirror), Como um IP virtual funciona em diferentes sub-redes com BGP (cluster mirror), Como o redirecionamento de DNS funciona em diferentes sub-redes (cluster mirror), Como o balanceamento de carga de IP virtual funciona em um cluster farm na mesma sub-rede, Como um IP virtual balanceado funciona em diferentes sub-redes (cluster farm), Comparação: implementação de IP virtual, latência e transparência da aplicação, Perguntas frequentes sobre IP virtual, 🔍 Explore o SafeKit"
translation: "translate_md 2026-11-05.13 | glossaire 2026-11-05.16 | Translation LLM | 12 expressions"
---

# Como funciona um endereço IP virtual em um cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual em um cluster de alta disponibilidade? {#virtual-ip-definition}

Um **endereço IP virtual** é o único endereço que os clientes usam para se conectar a um aplicativo em um [cluster de alta disponibilidade](</pt-br/>). O IP virtual não está vinculado a um servidor. Em caso de falha, ele é movido para o servidor que executa o aplicativo. Os clientes não precisam alterar sua configuração.

**Princípio fundamental do SafeKit:** o IP virtual é **configurado localmente no servidor** que executa a aplicação. A aplicação é iniciada no IP virtual e recebe o IP original do cliente. É por isso que muitas aplicações funcionam corretamente com o SafeKit sem qualquer alteração. O SafeKit oferece dois tipos de IP virtual:

  * **IP virtual primário/secundário com um cluster mirror:** o IP virtual está ativo apenas no servidor primário. Em caso de falha, ele é movido para o servidor secundário.
  * **Balanceamento de carga de rede com IP virtual e cluster <span class="notranslate farm-term" translate="no">farm</span>:** o IP virtual está ativo em todos os servidores ao mesmo tempo. O tráfego é compartilhado entre eles.

## Implementação de IP virtual no SafeKit {#safekit-virtual-ip-implementation}

Este artigo explica como o SafeKit move o IP virtual em cada arquitetura de rede:

  * **Mesma sub-rede ou VLAN estendida (clusters [mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)):** o SafeKit configura o IP virtual no servidor e envia um **ARP gratuito (GARP)**. Nenhum hardware externo é necessário. Esta é a solução mais transparente (tudo é implementado pelo produto SafeKit).
  * **Diferentes sub-redes com um balanceador de carga (clusters [mirror](#virtual-ip-different-subnets-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)):** o balanceador de carga usa a **verificação de integridade** do SafeKit para enviar o tráfego para o servidor correto (o balanceador de carga é configurado pelo integrador).
  * **[Diferentes sub-redes com CLIs de provedor de nuvem](#virtual-ip-cloud-cli-failover) (cluster mirror):** o script `start_prim` do SafeKit chama a CLI da nuvem para mover o IP virtual (script escrito pelo integrador).
  * **[Diferentes sub-redes com BGP](#virtual-ip-bgp-failover) (cluster mirror):** o servidor principal anuncia o IP virtual para os roteadores (script escrito pelo integrador).
  * **[Diferentes sub-redes com redirecionamento de DNS](#virtual-ip-vs-dns-redirection-failover) (cluster mirror):** o script `start_prim` do SafeKit altera o registro DNS do nome virtual para o IP físico do novo servidor primário (script escrito pelo integrador). Não há um único IP virtual, e esse método não é confiável para todos os clientes.

Também neste artigo:

  * [Comparação: implementação de IP virtual, latência e transparência de aplicações](#virtual-ip-methods-comparison)
  * [Perguntas frequentes sobre IP virtual](#virtual-ip-faq)
  * [🔍 Explore o SafeKit](#hub)

![Diagrama de comparação do comportamento do IP virtual no Eviden SafeKit: clusters mirror mostrando um IP flutuante no nó ativo vs. clusters farm mostrando o balanceamento de carga da rede em todos os nós.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementação de IP virtual para clusters mirror e <span class="notranslate farm-term" translate="no">farm</span> no SafeKit.**

## Como um IP virtual funciona na mesma sub-rede (cluster mirror) {#virtual-ip-same-subnet-failover}

- [Testando o IP virtual primário/secundário em um cluster mirror do SafeKit](/pt-br/best-practises/test-primary-backup-vip-mirror/)

### Failover automático e redirecionamento de rede em uma sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Em uma rede local, **o SafeKit** gerencia o IP virtual e o failover do aplicativo automaticamente.

### Cluster mirror local: failover de 2 nós no Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mecanismo de failover de IP virtual do SafeKit entre dois servidores na mesma sub-rede](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Em um **cluster mirror do SafeKit**, os dois nós estão na mesma sub-rede. A alta disponibilidade usa um **IP virtual**. O SafeKit gerencia o IP virtual na pilha de rede do sistema operacional. Nenhum hardware especial é necessário. O IP virtual é adicionado aos endereços IP físicos do Servidor 1 e do Servidor 2 com **alias de IP**. Os clientes sempre se conectam ao IP virtual.

#### Alias de IP e múltiplos IPs virtuais no SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

O IP virtual é um terceiro endereço IP que se move entre os nós. O SafeKit pode gerenciar **vários IPs virtuais** em um cluster. Você pode colocá-los na mesma placa de rede ou em placas de rede diferentes. Dessa forma, cada serviço pode usar seu próprio IP virtual.

#### O mecanismo de failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

O failover não requer nenhuma ação manual. Em operação normal, o IP virtual está vinculado ao **endereço MAC do Servidor 1 (mac1)**. Se o Servidor 1 falhar, o SafeKit faz três coisas:

  * **Alias de IP virtual:** o SafeKit configura o IP virtual como um alias na placa de rede do Servidor 2, o novo servidor primário. O sistema operacional envia mensagens na rede para anunciar o IP virtual.
  * **GARP:** O SafeKit também envia mensagens **ARP gratuitas (GARP)**. Os switches de rede e os clientes atualizam o seu cache ARP. O IP virtual agora está vinculado ao **endereço MAC do Servidor 2 (mac2)**.
  * **Recuperação de aplicativos:** o SafeKit reinicia os serviços de aplicativos no Servidor 2.


#### Centros de dados remotos e VLANs estendidas {#remote-data-centers--extended-vlans}

A **solução de mesma sub-rede descrita acima** também funciona para **recuperação de desastres** entre locais remotos. Muitas vezes, é a melhor escolha quando os locais estão conectados por uma **VLAN estendida** (LAN estendida). Ambos os locais estão em uma sub-rede. A rede é mais simples e você não precisa de protocolos de roteamento complexos.

> **⚠️ Observação:** O redirecionamento na camada 2 com ARP gratuito é a **solução mais transparente** para aplicativos. O aplicativo recebe o IP original do cliente e o IP virtual é configurado localmente. Muitos aplicativos **precisam de um IP virtual local**. Sem ele, esses aplicativos **podem não funcionar corretamente**. Nesta configuração de mesma sub-rede, o SafeKit implementa todo o mecanismo, portanto, nenhum trabalho de integração especial é necessário.

## Como um IP virtual funciona em diferentes sub-redes com um balanceador de carga (cluster mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga com verificações de integridade do SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de um failover de IP virtual usando um balanceador de carga em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando os nós estão em **sub-redes diferentes**, o ARP gratuito não pode mover o IP virtual. Nesse caso, o IP virtual está em um **balanceador de carga**. O balanceador de carga envia o tráfego para o servidor principal.

O SafeKit fornece um **URL de verificação de integridade** em cada nó:

  * **Primário (PRIM):** retorna `HTTP 200 OK`. O balanceador de carga envia o tráfego para este nó.
  * **Secundário (SECOND):** retorna `HTTP 404 NOT FOUND`. O balanceador de carga não envia tráfego para este nó.

Em caso de falha, o SafeKit altera as respostas e o balanceador de carga envia o tráfego para o novo servidor principal. Esta é a solução padrão entre **zonas de disponibilidade** na [**AWS**](</pt-br/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</pt-br/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</pt-br/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Observação:** O SafeKit fornece a verificação de integridade. Sua rede ou seu provedor de nuvem fornece o balanceador de carga.

### O problema: o balanceador de carga é o proprietário do IP virtual {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Com apenas um balanceador de carga, os clientes se conectam ao IP virtual. O balanceador de carga traduz o IP virtual (NAT) para o **IP físico** do servidor principal. O cliente usa o IP virtual, mas o servidor usa seu IP físico. O servidor não vê o IP virtual.

### Mantenha o IP virtual configurado localmente no servidor principal {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Alguns aplicativos usam o IP virtual como endereço do servidor. Eles funcionam corretamente apenas se o IP virtual também for **configurado localmente no servidor principal**. Então:

  * os serviços podem ser iniciados no IP virtual;
  * o servidor pode acessar seus próprios serviços com o IP virtual;
  * A autenticação funciona com o IP virtual.

**Melhor prática:** use um modo de balanceador de carga que mantenha o IP virtual como o endereço de destino (por exemplo, Floating IP ou Direct Server Return). Em seguida, configure o IP virtual localmente no servidor principal. O método depende da sub-rede do IP virtual:

  * **O IP virtual está na mesma sub-rede que os endereços IP físicos dos servidores:** mantenha a seção `<vip>` no módulo SafeKit. O SafeKit configura automaticamente o IP virtual como um alias na placa de rede do endereço IP físico.
  * **O IP virtual está em uma sub-rede diferente:** mantenha a seção `<vip>` no módulo SafeKit, com uma configuração específica. O exemplo abaixo mostra essa configuração no Azure.
  * **Outra opção para uma sub-rede diferente:** use o script `start_prim` para configurar o IP virtual em uma interface dedicada, como a interface loopback, antes que o aplicativo seja iniciado. Use o script `stop_prim` para remover o IP virtual após o aplicativo parar. O integrador escreve esses comandos. Eles não são fornecidos pelo produto SafeKit.

### Exemplo: Balanceador de carga do Azure com um IP virtual local (Milestone XProtect) {#azure-load-balancer-local-virtual-ip-example}

Essa arquitetura é usada em produção no Azure para o **servidor de gerenciamento Milestone XProtect**, com o módulo `videoos` SafeKit. Os dois nós estão em duas zonas de disponibilidade. O IP virtual é o IP de front-end do balanceador de carga. Esse IP de front-end está em uma sub-rede dedicada.

**No lado do Azure** (configurado pela equipe de infraestrutura):

  1. Crie um **balanceador de carga de camada 4** com um IP de front-end em uma sub-rede dedicada.
  2. Adicione os dois nós do SafeKit ao **pool de back-end** do balanceador de carga.
  3. Adicione uma **sonda de integridade** no URL de verificação de integridade do SafeKit do módulo: caminho `/var/modules/videoos/ready.txt`, porta `9010` (HTTP) ou porta `9453` (HTTPS com certificados válidos). Para outro módulo, substitua `videoos` pelo nome do módulo.
  4. Adicione **regras de balanceamento de carga** para todas as portas que os clientes usam no IP virtual: as portas dos serviços de gerenciamento do Milestone e, se necessário, as portas de outros serviços.

**No lado do SafeKit:** no arquivo `userconfig.xml` do módulo (`videoos/conf/userconfig.xml`), substitua a seção padrão `<vip>` por esta seção:

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

Substitua `VM_INTERFACE_NAME` pelo nome da interface de rede da VM, `LB_FRONTEND_IP` pelo IP do frontend do balanceador de carga e `LB_FRONTEND_NETMASK` pela máscara de rede da sub-rede do frontend. A interface de rede deve ter o mesmo nome em ambos os nós.

**No lado da aplicação:** configure todos os serviços do Milestone para usar o IP virtual, e não o endereço IP privado do servidor.

> **⚠️ Observação:** Use uma sub-rede de front-end que **não se sobreponha** à sub-rede das VMs. Por exemplo, VMs em `10.0.1.0/24` e IP de front-end do balanceador de carga em `10.0.2.0/24`. O SafeKit adiciona o IP de front-end com sua máscara de rede na interface de rede da VM. Se as duas sub-redes se sobrepuserem, esse alias altera o roteamento da VM e o tráfego de rede das VMs pode falhar.


## Como um IP virtual funciona em diferentes sub-redes com CLIs de provedores de nuvem (cluster mirror) {#virtual-ip-cloud-cli-failover}

### Por que o ARP gratuito não funciona na nuvem {#why-gratuitous-arp-does-not-work-in-public-clouds}

As redes de nuvem (AWS, Azure, Google Cloud) **ignoram o ARP gratuito**. Elas enviam tráfego apenas para endereços IP atribuídos na plataforma de nuvem. O SafeKit configura o IP virtual no servidor principal, mas a rede de nuvem não envia o tráfego do IP virtual para este servidor.

### Movendo o IP virtual com a CLI da nuvem {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sem um balanceador de carga, a CLI do provedor de nuvem pode ser integrada ao **script `start_prim`** do SafeKit para atualizar a configuração da rede em nuvem antes do início do aplicativo. A CLI pode atribuir o IP virtual ao nó que se torna primário ou atualizar a rota da nuvem para direcionar o tráfego do IP virtual para esse nó.

O **IP virtual permanece local** no servidor principal. **Não há NAT**, e o IP original do cliente não muda.

### Restrições {#constraints-of-the-cli-approach}

  * A CLI da nuvem deve ser instalada em ambos os nós. Cada nó precisa de uma identidade de nuvem com direitos de rede.
  * O script deve gerenciar erros e novas tentativas.
  * A recuperação de falhas é **muito mais lenta** do que com um balanceador de carga e uma sonda de integridade, porque cada recuperação de falhas aguarda a resposta da API da nuvem.

> **⚠️ Observação:** O **integrador** deve adicionar os comandos da CLI da nuvem ao script `start_prim`. Esses comandos **não são fornecidos pelo produto SafeKit**. Eles dependem do provedor de nuvem, do design da rede e das regras de segurança do cliente. Valide a solução com sua equipe de rede antes da produção.

## Como um IP virtual funciona em diferentes sub-redes com BGP (cluster mirror) {#virtual-ip-bgp-failover}

### Redirecionamento de IP virtual com BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Com o BGP (Border Gateway Protocol), o IP virtual é normalmente configurado em uma interface loopback do servidor primário pelo script `start_prim` antes do início da aplicação. O servidor primário anuncia o IP virtual aos roteadores como uma rota /32.

No failover, o script `stop_prim` no servidor primário antigo para a aplicação, remove o IP virtual da interface loopback e retira a rota /32 dos roteadores. Se o servidor primário antigo travar, `stop_prim` não é executado, mas os roteadores perdem a sessão BGP e removem a rota automaticamente.

### Benefícios e pré-requisitos {#benefits-and-prerequisites}

  * **O IP virtual permanece local, não há NAT e o IP do cliente não muda.**
  * Funciona em sub-redes e sites. Você não precisa de uma VLAN estendida.
  * Você precisa de roteadores BGP e da ajuda da sua equipe de rede. Na nuvem, você precisa de um serviço de servidor de rotas do provedor de nuvem.

> **⚠️ Observação:** a integração BGP usa scripts SafeKit e sua infraestrutura de roteamento. O **integrador** deve escrever os comandos nos scripts `start_prim` e `stop_prim`. Esses scripts **não são fornecidos pelo produto SafeKit**. Valide a solução com sua equipe de rede antes da produção.

## Como funciona o redirecionamento de DNS em diferentes sub-redes (cluster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Redirecionamento de DNS com o script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Com o redirecionamento de DNS, **não há um único IP virtual**. Os clientes se conectam a um **nome virtual** (o nome DNS). No failover, o script `start_prim` no novo servidor primário inicia o aplicativo e, em seguida, altera o registro DNS do nome virtual para o **IP físico** do novo servidor primário.

O script `stop_prim` não precisa fazer nada. Se o servidor primário antigo falhar, o novo servidor primário sobrescreverá o registro DNS.

### Exemplo: Resolução de DNS e clientes que mantêm o IP antigo {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagrama que mostra a resolução de nome DNS para o IP físico 1 em um cluster de alta disponibilidade](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolução de DNS: os clientes continuam conectados ao IP físico 1 em um cluster de alta disponibilidade

#### Antes do failover: o nome aponta para o IP físico 1 {#current-state-resolution-to-physical-ip-1}

**O Cliente 1** e **o Cliente 2** solicitam ao sistema DNS o endereço IP do nome virtual. O sistema DNS retorna **o IP físico 1.** Os clientes então abrem uma conexão de rede para este endereço.

#### Após o failover: o nome aponta para o IP físico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

O Servidor 1 falha. O script `start_prim` no Servidor 2 altera o registro DNS para **o IP físico 2.** Os clientes se conectam ao IP físico 2 somente se todas essas condições forem verdadeiras:

  * O **TTL (Time to Live)** expirou em todos os servidores DNS entre o cliente e o registro DNS.
  * O cache DNS local do Cliente 1 e do Cliente 2 está vazio.
  * O aplicativo fecha a conexão e faz uma *nova* consulta de DNS.

Se uma condição for falsa, **o Cliente 1 e o Cliente 2** continuam usando o IP físico 1. O serviço está inativo, mesmo que o registro DNS esteja correto.

### Limites e pré-requisitos {#the-two-black-boxes-of-dns-redirection}

  * **Cache de DNS:** muitos provedores de serviços de Internet e servidores DNS de empresas ignoram valores TTL curtos. Eles podem manter o IP físico antigo 1 por minutos ou horas.
  * **Comportamento do aplicativo:** muitos aplicativos (por exemplo, serviços Java ou navegadores da Web) fazem uma pesquisa de DNS apenas uma vez, quando são iniciados. Eles continuam usando o primeiro endereço IP.
  * **O endereço IP muda em cada failover:** o aplicativo não tem um IP virtual local que permaneça o mesmo. Os aplicativos que registram seu próprio endereço IP podem não funcionar.
  * **Pré-requisitos:** um TTL curto no registro DNS (por exemplo, 30 a 60 segundos) e direitos para atualizar a zona DNS de ambos os servidores.

> **⚠️ Observação:** o **integrador** deve escrever os comandos de atualização do DNS no script `start_prim`. Esses comandos **não são fornecidos pelo produto SafeKit**. Eles dependem do servidor DNS (Windows DNS, BIND ou DNS em nuvem).

### Conclusão {#conclusion}

O redirecionamento de DNS não é uma solução confiável de alta disponibilidade. Use-o apenas se todos os clientes fizerem uma nova consulta de DNS quando se reconectarem. Para failover imediato e transparente, use um **IP virtual** : com uma VLAN estendida, com um balanceador de carga, com CLIs de provedor de nuvem ou com BGP.

## Como funciona o balanceamento de carga de IP virtual em um cluster <span class="notranslate farm-term" translate="no">farm</span> na mesma sub-rede {#virtual-ip-load-balancing-same-subnet}

- [Testando o IP virtual de balanceamento de carga em um cluster farm do SafeKit](/pt-br/best-practises/test-load-balancing-vip-farm/)

### Balanceamento de carga e redundância em nível de kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando há muito tráfego, o SafeKit pode compartilhar o trabalho entre vários servidores ativos. Se um servidor falhar, os outros servidores continuam a funcionar.

### Arquitetura de cluster <span class="notranslate farm-term" translate="no">farm</span>: balanceamento de carga entre nós Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagrama de um IP virtual com balanceamento de carga dentro da mesma sub-rede](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Em um **cluster <span class="notranslate farm-term" translate="no">farm</span> de balanceamento de carga**, os clientes se conectam a um IP virtual e as solicitações são compartilhadas entre vários servidores ao mesmo tempo. Este exemplo mostra dois nós. Você pode adicionar mais nós ao cluster. Na mesma sub-rede, o IP virtual é configurado com alias de IP na placa de rede de **cada servidor** no cluster.

#### Compartilhamento de tráfego: o filtro do kernel {#traffic-distribution-the-kernel-level-filter}

Em um cluster <span class="notranslate farm-term" translate="no">farm</span>, um **filtro SafeKit no kernel** compartilha o tráfego. Funciona assim:

  * **Mapeamento ARP:** No cache ARP dos clientes, o IP virtual está vinculado a um endereço MAC (por exemplo, `mac1` do Servidor 1).
  * **Análise de pacotes:** o Servidor 1 recebe os pacotes. O filtro do kernel do SafeKit lê o **IP do cliente** ou a **porta TCP** de cada pacote.
  * **Compartilhamento de carga:** o filtro decide quais pacotes o Servidor 1 processa e quais pacotes vão para os outros nós (por exemplo, Servidor 2). Para enviar um pacote para outro nó, o filtro reescreve o **endereço MAC de destino** do pacote com o endereço MAC desse nó. O endereço IP de destino permanece o IP virtual. O trabalho é compartilhado entre os servidores.


#### Failover e redirecionamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o Servidor 1 falhar, o SafeKit envia uma mensagem **ARP gratuita (GARP)**. Os clientes atualizam seu cache ARP com `mac2` do Servidor 2. Os clientes são então enviados imediatamente para os outros nós da farm.

#### Implantação em locais remotos {#deployment-in-remote-sites}

Essa solução de balanceamento de carga também funciona entre **data centers remotos**, se os sites estiverem conectados por uma **VLAN estendida**. Todos os sites ficam, então, na mesma sub-rede. Essa é a configuração mais eficiente para clusters <span class="notranslate farm-term" translate="no">farm</span> em vários sites.

{{%  insert-safekit-farm-video-pt-br  %}}

## Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Tráfego entre sub-redes da nuvem {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Um cluster <span class="notranslate farm-term" translate="no">farm</span> pode compartilhar o trabalho da aplicação entre várias zonas de disponibilidade e sub-redes.

### Clusters <span class="notranslate farm-term" translate="no">farm</span> em várias sub-redes: vários nós Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagrama de um cluster farm com balanceamento de carga operando em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando os nós <span class="notranslate farm-term" translate="no">farm</span> estão em **sub-redes diferentes** (por exemplo, em várias zonas de disponibilidade da nuvem), o **IP virtual** está em um **balanceador de carga** externo. O balanceador de carga envia o tráfego para os endereços IP físicos dos servidores em cada sub-rede.

#### Regras de roteamento de tráfego e balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O balanceador de carga compartilha as solicitações do cliente com dois critérios:

  * **Regras de balanceamento de carga:** por exemplo, o **endereço IP do cliente** ou a **porta TCP do cliente**.
  * **Disponibilidade do nó:** o balanceador de carga envia tráfego apenas para os nós que estão íntegros, com base na verificação de integridade do SafeKit.


> **⚠️ Observação:** O SafeKit fornece a verificação de integridade. Sua rede ou seu provedor de nuvem fornece o balanceador de carga.

#### Verificação de integridade do SafeKit {#safekit-health-check-mechanism}

O SafeKit fornece um **URL de verificação de integridade** em cada servidor do <span class="notranslate farm-term" translate="no">farm</span>. O balanceador de carga o lê para saber o status de cada servidor:

  * **Nó UP:** a verificação de integridade retorna `HTTP 200 OK`. O balanceador de carga envia tráfego para este servidor.
  * **Nó DOWN:** se um servidor ou uma aplicação falhar, o SafeKit retorna `HTTP 404 NOT FOUND` (ou o servidor não responde). O balanceador de carga para de enviar tráfego para este nó imediatamente.


#### Implantação na nuvem: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta é a arquitetura padrão para **clusters <span class="notranslate farm-term" translate="no">farm</span> na nuvem**. Se uma sub-rede ou uma zona parar, os outros nós continuarão a processar o tráfego. É compatível com [**Amazon AWS**](</pt-br/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</pt-br/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e [**Google Cloud (GCP)**](</pt-br/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Comparação: implementação de IP virtual, latência e transparência de aplicações {#virtual-ip-methods-comparison}

**Comparação de métodos de redirecionamento de IP virtual e redirecionamento de DNS para alta disponibilidade e recuperação de desastres.**

Ambiente e caso de uso | Tipo de alta disponibilidade | Método de redirecionamento | Implementado por | Latência da rede | Transparência do aplicativo e IP local  
---|---|---|---|---|---  
Primário/secundário (alta disponibilidade) | Cluster mirror | ARP gratuito (transferência do endereço MAC) | ✅ Produto SafeKit | Muito baixo: tempo para detetar a falha e enviar o GARP | Transparência total: o IP virtual é local no nó ativo. O IP do cliente não muda.  
Balanceamento de carga (ativo/ativo) | Cluster <span class="notranslate farm-term" translate="no">farm</span> | Filtro de rede do kernel / GARP | ✅ Produto SafeKit | Muito baixo: tempo para detetar a falha e mudar os filtros da rede | Transparência total: o IP virtual é local em todos os nós. O IP do cliente não muda.  
Mesma sub-rede / VLAN estendida | Recuperação de desastres (centros de dados remotos) | Alias de IP / GARP | ✅ Produto SafeKit (a VLAN estendida é fornecida pela equipe de rede) | Baixo: depende do tempo de ida e volta (RTT) da VLAN estendida | Transparência total: o IP virtual é local nos nós. O IP do cliente não muda.  
Sub-redes diferentes: apenas balanceador de carga | Recuperação de desastres (data centers remotos/nuvem) | Balanceador de carga externo | 🛠️ Integrador: configuração do balanceador de carga (o SafeKit fornece a verificação de integridade) | Médio: depende do intervalo de verificação de integridade do balanceador de carga | ⚠️ Transparência parcial se SNAT/DNAT for usado. O IP virtual **NÃO** é local nos nós. O IP do cliente PODE **NÃO** ser mantido. A aplicação deve suportar isso.  
Sub-redes diferentes: balanceador de carga + IP virtual local do SafeKit | Recuperação de desastres (data centers remotos/nuvem) | Balanceador de carga externo com Floating IP / Direct Server Return ou IP de front-end como um alias local do SafeKit | 🛠️ Integrador: configuração do balanceador de carga (o SafeKit fornece a verificação de integridade) | Médio: depende do intervalo de verificação de integridade do balanceador de carga | Boa transparência: o IP virtual é local no nó principal e é o endereço de destino.
Sub-redes diferentes: CLI da nuvem | Recuperação de desastres (nuvem) | API de nuvem: o IP privado ou uma rota de nuvem é movido para o novo nó principal | 🛠️ Integrador: comandos da CLI da nuvem no script `start_prim` | Médio a alto: depende do tempo de resposta da API da nuvem | Transparência total: o IP virtual é local no nó principal. O IP do cliente não muda.
Sub-redes diferentes: BGP | Recuperação de desastres (data centers remotos/nuvem) | /32 rota anunciada com BGP | 🛠️ Integrador: Comandos BGP nos scripts `start_prim` e `stop_prim` | Baixo a médio: depende do tempo de convergência do BGP | Transparência total: o IP virtual é local no nó principal. O IP do cliente não muda. Requer roteadores BGP.  
Redirecionamento de DNS: sem IP virtual | Recuperação de desastres (centros de dados remotos) | Alteração de registro DNS (nome/IP físico) | 🛠️ Integrador: Comandos de atualização de DNS no script `start_prim` | Alta e imprevisível: depende do TTL (Time To Live) do DNS e do cache de DNS do cliente | ⚠️ Não confiável: o cliente deve fazer uma nova consulta de DNS. Muitas vezes, os clientes mantêm o IP antigo que receberam na inicialização e não são redirecionados após a falha.  
  
## Perguntas frequentes sobre IP virtual {#virtual-ip-faq}

### IP e rede virtuais {#virtual-ip--networking}

O que é um IP virtual e qual a diferença entre ele e um IP físico?

Um **endereço IP físico** está vinculado a uma placa de rede. Um **IP virtual** não está vinculado ao hardware. Em um cluster SafeKit, os clientes sempre usam o IP virtual. Se o servidor principal falhar, o IP virtual se moverá automaticamente para um nó íntegro. Você não precisa alterar a configuração do cliente.

Preciso de um balanceador de carga de hardware para usar um IP virtual?

Não. **O SafeKit** gerencia o IP virtual com software. Na mesma sub-rede, ele usa **alias de IP** e **ARP gratuito (GARP)** para redirecionar o tráfego. Você não precisa de um balanceador de carga externo ou de um servidor proxy.

O que é o ARP gratuito (GARP) e por que ele é usado?

**O ARP gratuito (GARP)** é uma mensagem de rede enviada a todos os dispositivos. Ele atualiza as tabelas ARP de switches e roteadores. Em caso de falha, o novo servidor primário envia uma mensagem GARP. A mensagem informa que o **IP virtual** agora está vinculado ao endereço MAC do novo servidor primário. O tráfego é então redirecionado imediatamente.

Posso associar um nome DNS a um IP virtual?

**Sim.** Crie um registro A padrão para o IP virtual. O redirecionamento é feito no **nível do IP virtual** (com ARP ou redirecionamento de rede), **não no nível do DNS**. Você não terá atrasos de DNS ou problemas de TTL, e o failover permanecerá **transparente para o aplicativo**.

### Nuvem e arquiteturas avançadas {#cloud--advanced-architectures}

Como funciona um IP virtual na nuvem (AWS, Azure, GCP)?

Na nuvem, as mensagens GARP de camada 2 não estão disponíveis para redirecionar um IP virtual. O SafeKit funciona com **balanceadores de carga na nuvem** (AWS Elastic Load Balancing, Azure Load Balancer ou Google Cloud Load Balancing). O SafeKit fornece um **URL de verificação de integridade**. O balanceador de carga o lê e envia o tráfego para o nó ativo.

Uma VLAN estendida é melhor do que um balanceador de carga para recuperação de desastres?

**Sim**. Entre data centers remotos, uma **VLAN estendida** geralmente é melhor porque o failover permanece **transparente para o aplicativo**. O **IP virtual não muda**, então o aplicativo e seus clientes continuam a usar o mesmo endereço após um failover entre data centers.

Quais são os limites do redirecionamento de DNS em comparação com um IP virtual?

**O redirecionamento de DNS** depende do **TTL (Time to Live)** e do cache de DNS do cliente. A recuperação pode levar horas. Além disso, **os clientes que não fazem uma nova consulta de DNS** continuam usando o servidor com falha. Um **IP virtual** é redirecionado imediatamente com mensagens GARP na camada 2. O cache de DNS do cliente não tem efeito.

### Transparência e segurança {#transparency--security}

Por que um IP virtual local é importante para a transparência da aplicação?

Com um **IP virtual** local, o aplicativo usa um endereço que não muda. O SafeKit faz o redirecionamento no **kernel**. O aplicativo não vê o failover. Com o DNAT, o endereço usado pelo aplicativo muda.

Um IP virtual mantém o endereço IP original do cliente?

Sim. O SafeKit não usa NAT de origem (SNAT). O IP virtual é local no servidor ativo, então o aplicativo recebe o **IP original do cliente**. Isso é importante para auditorias de segurança, persistência de sessão e registros regulatórios.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
