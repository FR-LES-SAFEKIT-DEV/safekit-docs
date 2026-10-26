---
title: "Como funciona um endereço IP virtual (VIP) em cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/how-a-virtual-ip-address-works/"
description: "Descubra como o SafeKit utiliza endereços IP virtuais (VIP) definidos por software para garantir um tempo de atividade 24 horas por dia, 7 dias por semana. Saiba mais sobre o failover automatizado via ARP gratuito e porque é que supera o redireccionamento de DNS para a continuidade do negócio no Windows e no Linux."
category: "best-practises"
lang: "pt-pt"
topics: "O que é um endereço IP virtual num cluster de alta disponibilidade?, Implementação de IP virtual no SafeKit, Índice, Como funciona um endereço IP virtual (VIP) num failover da mesma sub-rede (cluster de espelho), Como funciona um IP virtual (VIP) em diferentes sub-redes (cluster de espelho), Como funciona um IP virtual com balanceamento de carga num farm da mesma sub-rede (cluster de farm), Como funciona um IP virtual com balanceamento de carga em sub-redes diferentes (cluster de farm), Virtual Redireccionamento de IP vs. DNS: Por que razão o failover DNS falha frequentemente, comparação: implementação de IP virtual, latência e transparência de aplicações, configuração de um endereço IP virtual para balanceamento de carga de rede e alta disponibilidade, FAQ sobre IP virtual (VIP), 🔍 SafeKit High Availability Navigation Hub"
---

# Como funciona um endereço IP virtual (VIP) em cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual num cluster de alta disponibilidade? {#virtual-ip-definition}

  * **Definição:** Um **endereço IP virtual (VIP)** é um endereço de rede flutuante utilizado no clustering de alta disponibilidade [](</pt-pt/>) para garantir o acesso contínuo à aplicação. Ao contrário dos IPs padrão, um VIP não está ligado a uma interface de hardware física específica, mas alterna entre os nós do cluster para manter um ponto de entrada único e persistente para os clientes.
  * **Não é necessário hardware:** O SafeKit gere o VIP ao nível do software utilizando **ARP gratuito (GARP)** , eliminando a necessidade de balanceadores de carga externos em ambientes da mesma sub-rede.
  * **Transparência da aplicação:** Ao ligar a um VIP local, as aplicações não se apercebem de eventos de failover, preservando os IPs de origem do cliente e as definições de segurança existentes.
  * **Recuperação de desastres:** A utilização de uma **LAN estendida** permite que o mesmo VIP seja utilizado em centros de dados remotos, simplificando o failover entre sites em comparação com o complexo reencaminhamento de DNS e atrasos de cache TTL.


## Implementação de IP Virtual em SafeKit {#safekit-vip-implementation}

  * **Mirror clusters:** Apresenta um IP flutuante ativo apenas no servidor primário para facilitar a replicação e o failover em tempo real.
  * **Farm Clusters:** permite o balanceamento de carga de rede mantendo o VIP em todos os nós em simultâneo.


**Principal benefício:** Ao utilizar **ARP (Protocolo de resolução de endereços) gratuito** ou **Aquisição de endereços MAC**, o VIP permite o failover contínuo de aplicações sem reconfiguração manual do cliente, garantindo a continuidade do negócio 24 horas por dia, 7 dias por semana.

  * **Nuvem e múltiplas sub-redes:** Gerido através de verificações de integridade do balanceador de carga externo (AWS, Azure, GCP) para redirecionar o tráfego entre diferentes sub-redes.


![Diagrama de comparação do comportamento do IP Virtual (VIP) no Evidian SafeKit: Clusters de espelho que mostram um IP flutuante no nó ativo vs. Clusters de farm que mostram o balanceamento de carga de rede em todos os nós.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Estratégias de implementação de IP virtual para clusters Mirror e Farm em SafeKit.**


{{%  insert-safekit-4-buttons-pt-pt  %}}
 

## Índice {#table-of-contents}

  * [Como funciona um endereço IP virtual (VIP) num failover da mesma sub-rede (cluster espelhado)](#virtual-ip-same-subnet-failover)
  * [Como funciona um IP virtual (VIP) em diferentes sub-redes (cluster espelhado)](#virtual-ip-different-subnets-failover)
  * [Como funciona um IP virtual com balanceamento de carga num farm da mesma sub-rede (cluster de farm)](#vip-load-balancing-same-subnet)
  * [Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster de farm)](#vip-load-balancing-different-subnets)
  * [IP virtual vs. redireccionamento DNS: por que razão o failover DNS geralmente falha](#virtual-ip-vs-dns-redirection-failover)
  * [Comparação: implementação de IP virtual, latência e transparência de aplicações](#vip-vs-dns-comparison)
  * [Configuração de um endereço IP virtual para balanceamento de carga de rede e alta disponibilidade](#virtual-ip-configuration-load-balancing-ha)
  * [Perguntas frequentes sobre IP virtual (VIP)](#virtual-ip-faq)
  * [🔍 SafeKit Hub de navegação de alta disponibilidade](#hub)


## Como funciona um endereço IP virtual (VIP) num failover da mesma sub-rede (cluster espelhado) {#virtual-ip-same-subnet-failover}

### Failover automatizado e redireccionamento de rede numa sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Para organizações que exigem uma continuidade de negócio contínua numa infraestrutura local, **Alta disponibilidade definida por software SafeKit para clusters de redes locais** fornece uma solução robusta e automatizada para gerir endereços IP virtuais e failover de aplicações em tempo real. 

### Cluster de espelho local: failover contínuo de 2 nós para Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mecanismo de failover SafeKit Virtual IP (VIP) entre dois servidores na mesma sub-rede](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 Aliasing VIP SafeKit e mapeamento de endereços MAC Num **cluster de espelho SafeKit** padrão, em que ambos os nós residem na mesma sub-rede local, a alta disponibilidade é conseguida através de um **IP Virtual (VIP) definido por software**. Ao contrário das soluções baseadas em hardware, o SafeKit gere este VIP diretamente na pilha de rede do sistema operativo. Este VIP atua como um ponto de entrada lógico persistente para os clientes, em camadas sobre os endereços IP físicos exclusivos do Servidor 1 e do Servidor 2 através de **aliasing de IP**. 

#### Aliasing IP avançado e suporte VIP múltiplo de SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Uma vantagem importante da solução **SafeKit** é a sua flexibilidade na gestão de identidades de rede. O VIP é um terceiro endereço IP que “flutua” entre os nós. Notavelmente, o SafeKit é capaz de gerir **vários endereços IP virtuais** num único cluster. Podem ser atribuídos à mesma placa Ethernet primária ou distribuídos por diferentes placas físicas, permitindo configurações complexas onde diferentes serviços estão ligados a identidades virtuais específicas. 

#### O mecanismo de failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit garante zero intervenção manual durante uma falha de hardware. Em operações normais, o VIP é mapeado para **Endereço MAC do Servidor 1 (mac1)**. Se o SafeKit detetar uma falha de pulsação no Servidor 1, executará uma recuperação em dois passos: 

  * **Recuperação de aplicações:** O SafeKit reinicia automaticamente os serviços de aplicações críticas no Servidor 2.
  * **Reencaminhamento de rede:** SafeKit transmite instantaneamente uma mensagem **ARP gratuita (GARP)**. Isto obriga à atualização das caches ARP de todos os switches de rede e clientes ligados, remapeando o VIP para o **Endereço MAC do Servidor 2 (mac2)**.


#### Data centers remotos e VLANs estendidas {#remote-data-centers--extended-vlans}

Embora normalmente utilizado para clusters locais, o **algoritmo de mesma sub-rede do SafeKit** é a escolha preferencial para **Recuperação de desastres (DR)** em locais remotos ligados através de uma **LAN estendida ou VLAN estendida**. Esta arquitetura "ampliada" permite manter uma única sub-rede a distâncias geográficas, simplificando significativamente a topologia da rede e evitando a sobrecarga de protocolos de encaminhamento complexos. 

> **⚠️ Nota:** O redireccionamento da camada 2 através de ARP gratuito é a **solução mais transparente** para aplicações. Ao contrário do reencaminhamento da Camada 3 com um Balanceador de Carga, evita a **Conversão de IP de Origem/Destino (SNAT/DNAT)**. A aplicação recebe o tráfego diretamente com o IP do cliente original e o IP Virtual é configurado localmente. **Muitas aplicações preferem** ver o IP virtual localmente e receber diretamente o IP do cliente original. Sem esta transparência, **podem não funcionar como esperado** devido a traduções complexas de rede.

## Como funciona um IP virtual (VIP) em diferentes sub-redes (cluster espelhado) {#virtual-ip-different-subnets-failover}

### Orquestração de tráfego pronta para a cloud através de integração com balanceador de carga {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Ao tirar partido da infraestrutura de rede externa, a **alta disponibilidade definida por software SafeKit para clusters Multi-AZ e de cloud** integra-se perfeitamente com um **balanceador de carga de rede** para orquestrar o failover de tráfego em sub-redes e zonas de disponibilidade separadas. 

### Clusters de espelhos entre sub-redes: implementação em Windows e Linux {#cross-subnet-mirror-clusters-windows--linux-implementation}


![Diagrama de um failover IP virtual utilizando um balanceador de carga em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Encaminhamento de tráfego de várias sub-redes através de verificações de integridade do balanceador de carga Quando os nós do cluster residem em **sub-redes diferentes** , o failover padrão baseado em ARP não é possível. Neste cenário, o **IP Virtual (VIP)** é alojado num **Balanceador de Carga (LB)** em vez da placa Ethernet do servidor. O Load Balancer atua como gateway, direcionando o tráfego para os endereços IP físicos dos nós primários e secundários com base na disponibilidade em tempo real. 

#### Encaminhamento dinâmico através de verificações de integridade SafeKit {#dynamic-routing-via-safekit-health-checks}

O SafeKit gere a direção do tráfego fornecendo um **URL de verificação de integridade** dedicado em cada nó. O Load Balancer consulta estes URLs para determinar o estado do cluster: 

  * **Nó primário (PRIM):** A verificação de funcionamento retorna `HTTP 200 OK`. O Load Balancer direciona todo o tráfego para aqui.
  * **Nó Secundário (SECOND):** A verificação de funcionamento retorna `HTTP 404 NOT FOUND`. O Load Balancer não envia tráfego para este nó.

Durante um **evento de failover** , o SafeKit alterna instantaneamente as respostas da verificação de integridade, acionando o Load Balancer para redirecionar o tráfego do cliente para o novo servidor primário. 

> **⚠️ Nota:** O SafeKit fornece a lógica de verificação de integridade; o Load Balancer físico ou virtual deve ser fornecido pela sua infraestrutura de rede.

#### Integração na cloud: AWS, Azure e GCP {#cloud-integration-aws-azure-and-gcp}

Este modelo "Load Balancer + Health Check" é o padrão do setor para **Alta disponibilidade na cloud**. É essencial implementar o SafeKit em ambientes como: 

  * 💡 [**Amazon AWS**](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>) (Balanceador de carga de rede AWS)
  * 💡 [**Microsoft Azure**](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>) (Balanceador de carga do Azure)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud Load Balancing)


#### Considerações de rede: balanceador de carga vs. LAN estendida {#network-considerations-load-balancer-vs-extended-lan}

Se não for desejado um balanceador de carga, consulte a sua equipa de rede sobre a implementação de uma **LAN alargada (alongamento de VLAN)** entre sub-redes. Isto permite reverter para o modelo VIP mais simples "Mesma sub-rede". 

> **⚠️ Nota:** Ao optar por um Load Balancer, verifique se a sua aplicação é compatível com **Tradução de IP de origem/destino (SNAT/DNAT)**. Com um Load Balancer, a aplicação pode perder o controlo da identidade do utilizador original ou falhar o arranque porque já não vê o IP Virtual configurado diretamente na sua própria interface de rede.

## Como funciona um IP virtual com balanceamento de carga num farm da mesma sub-rede (cluster de farm) {#vip-load-balancing-same-subnet}

### Desempenho escalável: balanceamento de carga e redundância ao nível do kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Para ambientes de elevado tráfego, o **Guia de arquitetura: alta disponibilidade escalável com clusters de farm de vários nós** explica como o SafeKit distribui as cargas de trabalho por vários servidores ativos, mantendo a redundância total. 

### Arquitetura de cluster de farm: balanceamento de carga em nós Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagrama de um IP Virtual (VIP) com balanceamento de carga num cluster de farm da mesma sub-rede](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Processamento de tráfego distribuído através de filtragem de kernel Num **cluster de load balancing farm** , é utilizado um endereço IP virtual (VIP) para distribuir pedidos de clientes por vários servidores em simultâneo. Embora este exemplo apresente dois nós, a arquitetura está dimensionada para suportar farms de servidores de maior dimensão. Numa configuração da mesma sub-rede, o VIP é configurado na placa Ethernet de **cada servidor** do cluster através de alias IP. 

#### Distribuição de tráfego: o filtro ao nível do kernel {#traffic-distribution-the-kernel-level-filter}

Ao contrário de um cluster de failover simples, um cluster de farm gere o tráfego através de um **filtro ao nível do kernel** especializado. O processo funciona da seguinte forma: 

  * **Mapeamento ARP:** Nas caches ARP dos clientes, o VIP é inicialmente associado a um único endereço de hardware (por exemplo, `mac1` do Servidor 1).
  * **Divisão de pacotes:** Quando o Servidor 1 recebe o tráfego, o filtro de kernel SafeKit analisa a identidade dos pacotes recebidos (com base no **IP do cliente** ou **Porta TCP**).
  * **Partilha de carga:** O filtro determina quais os pacotes que devem ser processados ​​localmente e quais devem ser redirecionados para outros nós (por exemplo, Servidor 2) para processamento, garantindo uma carga de trabalho equilibrada.


#### Failover e redireccionamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o nó primário (Servidor 1) falhar, o cluster mantém a disponibilidade através de **ARP gratuito (GARP)**. O SafeKit transmite uma mensagem GARP para atualizar as caches ARP do cliente com o `mac2` do Servidor 2. Isto garante que, mesmo que o "ponto de entrada" primário falhe, os clientes serão imediatamente redirecionados para os nós sobreviventes no farm. 

#### Implantação em locais remotos {#deployment-in-remote-sites}

Para as organizações que operam em **data centers remotos** , este algoritmo de balanceamento de carga permanece funcional desde que os sites estejam ligados através de uma **LAN ou VLAN estendida**. Isto cria um ambiente virtual de "mesma sub-rede", que é a configuração mais eficiente para clusters de farm distribuídos geograficamente. 

## Como funciona um IP virtual com balanceamento de carga em diferentes sub-redes (cluster farm) {#vip-load-balancing-different-subnets}

### Dimensionamento multizona: orquestração de tráfego em sub-redes de nuvens {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

O **Guia de arquitetura: dimensionamento de clusters de exploração em ambientes multizona e de cloud** fornece o modelo para a distribuição de cargas de trabalho de aplicações em zonas de disponibilidade e sub-redes separadas. 

### Clusters de farm entre sub-redes: escalabilidade de vários nós para Windows e Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagrama de um cluster de farm com balanceamento de carga a operar em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Distribuição do tráfego global através do balanceamento de carga externo Quando os nós do farm são distribuídos por **sub-redes diferentes** (comum nas implementações de cloud Multi-AZ), o **IP virtual (VIP)** é gerido por um **Balanceador de carga (LB)** externo. O LB mantém o VIP e direciona o tráfego de entrada para os endereços IP físicos dos servidores localizados nas respetivas sub-redes. 

#### Regras inteligentes de encaminhamento de tráfego e balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O Load Balancer distribui os pedidos dos clientes com base em dois fatores principais: 

  * **Regras de distribuição:** O tráfego é dividido de acordo com a afinidade da sessão ou com os algoritmos de balanceamento de carga (por exemplo, analisando o **Endereço IP do cliente** ou a **Porta TCP do cliente**).
  * **Disponibilidade do nó:** O tráfego é encaminhado apenas para nós íntegros, conforme determinado pela verificação de integridade SafeKit.


> **⚠️ Nota:** O SafeKit fornece a lógica de verificação de integridade; o Load Balancer físico ou virtual deve ser fornecido pela sua infraestrutura de rede.

#### Mecanismo de verificação de integridade SafeKit {#safekit-health-check-mechanism}

O SafeKit fornece um **URL de verificação de integridade** em tempo real em cada servidor do farm para comunicar o seu estado operacional ao balanceador de carga: 

  * **Nó UP:** A verificação de integridade retorna `HTTP 200 OK`. O Load Balancer inclui este servidor na rotação ativa.
  * **Nó DOWN/Failover:** Se um servidor ou aplicação falhar, SafeKit irá devolver `HTTP 404 NOT FOUND` (ou o serviço tornar-se-á inacessível). O Load Balancer pára imediatamente de enviar tráfego para o nó com falha.


#### Padrões de implementação na cloud: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta arquitetura é o modelo fundamental para os **clusters Cloud Farm** , garantindo que, se uma sub-rede ou zona inteira ficar offline, os restantes nós continuarão a lidar com a carga. Isto é nativamente suportado por: 

  * 💡 [**Amazon AWS**](</solutions/aws-load-balancing-cluster-failover/>) (Balanceador de carga de rede AWS)
  * 💡 [**Microsoft Azure**](</solutions/azure-load-balancing-cluster-failover/>) (Balanceador de carga do Azure)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## Redireccionamento de IP virtual versus DNS: por que razão o failover de DNS falha frequentemente {#virtual-ip-vs-dns-redirection-failover}

### A armadilha da propagação DNS: porque é que os VIPs superam o redireccionamento DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Depender do DNS para failover geralmente cria uma **falsa sensação de segurança** em arquiteturas de alta disponibilidade. Embora a modificação de um registo DNS para apontar para um servidor de cópia de segurança pareça um caminho de recuperação simples, introduz uma variável crítica: **latência imprevisível**. Uma vez que o redireccionamento baseado em DNS depende de um ecossistema não controlado de resolvedores recursivos intermédios para reconhecer e propagar a mudança, é fundamentalmente incompatível com os requisitos de “tempo de inatividade zero” dos serviços empresariais modernos. 

### O cenário técnico: resolução de DNS e o cliente “bloqueado” {#the-technical-scenario-dns-resolution-and-the-stuck-client}

Numa configuração de rede padrão, um **Nome Virtual** (o Nome DNS) atua como ponto de entrada legível para os utilizadores. No entanto, para que os dados viajem pela rede, este nome deve ser resolvido para um endereço **IP físico** específico. 

![Diagrama que mostra a resolução de nomes DNS para IP físico 1 num cluster de alta disponibilidade](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolução DNS e clientes “bloqueados” no IP físico 1 num cluster de alta disponibilidade

#### Estado Atual: Resolução para IP Físico 1 {#current-state-resolution-to-physical-ip-1}

Inicialmente, o **Cliente 1** e o **Cliente 2** consultam o sistema DNS em busca do Nome Virtual. O sistema devolve **IP físico 1**. Os clientes estabelecem então uma ligação de rede direta (socket) com esse endereço de hardware específico. 

#### O desafio do failover: redireccionamento para IP físico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Se o servidor no IP físico 1 falhar, um administrador atualizará o registo DNS para apontar para **IP físico 2**. Para redirecionar os clientes com sucesso, deve ocorrer uma sequência "perfeita": 

  * O **Time to Live (TTL)** deve expirar em todos os ISPs intermediários e resolvedores empresariais.
  * O cache DNS local no Cliente 1 e no Cliente 2 deve ser libertado.
  * A aplicação deve fechar o seu socket existente e iniciar uma _nova_ pesquisa DNS.

Se algum destes passos for perdido, **Cliente 1 e Cliente 2 permanecerão "bloqueados"** a tentar comunicar com o IP Físico 1 morto, resultando em tempo de inatividade do serviço, apesar da atualização nos registos DNS. 

### As duas “caixas negras” do redireccionamento DNS {#the-two-black-boxes-of-dns-redirection}

  * **Cache recursiva:** muitos fornecedores de serviços de Internet (ISPs) e resolvedores de DNS empresariais ignoram as definições de TTL baixo para reduzir o tráfego, muitas vezes armazenando em cache o "antigo" IP físico 1 durante minutos ou mesmo horas para além da expiração solicitada.
  * **Persistência de aplicações:** as aplicações modernas (como microsserviços baseados em Java ou navegadores Web) geralmente realizam uma pesquisa DNS apenas uma vez no arranque. Mesmo que o registo DNS seja actualizado para IP Físico 2, a aplicação continua a utilizar o IP inicial armazenado na sua memória interna.


### Conclusão {#conclusion}

O redireccionamento DNS é uma solução inconsistente para uma solução de alta disponibilidade. Para failover instantâneo num ambiente local ou regional, um **IP Virtual (VIP)** definido por software é a única forma de garantir uma persistência garantida sem tempo de inatividade. 

## Comparação: Implementação de IP Virtual, Latência e Transparência de Aplicações {#vip-vs-dns-comparison}

**Comparação técnica dos métodos de redireccionamento de IP Virtual (VIP) versus redireccionamento de DNS para alta disponibilidade e recuperação de desastres.**

Ambiente e caso de uso | Tipo de alta disponibilidade | Mecanismo de Redireccionamento | Latência de rede | Transparência de aplicações e localidade de IP  
---|---|---|---|---  
Primário/Backup (alta disponibilidade) | Cluster de espelhos | Aquisição gratuita de ARP/MAC | Muito baixo: Tempo para detetar e enviar transmissão GARP | Transparência total: o IP virtual é local no nó ativo. O IP do cliente é preservado.  
Balanceamento de carga (ativo/ativo) | Agrupamento Agrícola | Filtro de rede ao nível do kernel/GARP | Muito Baixo: Tempo para detetar e reconfigurar filtros de rede | Transparência total: o IP virtual é local em todos os nós. O IP do cliente é preservado.  
Mesma sub-rede/LAN estendida (alongamento de VLAN) | Recuperação de desastres (datacenters remotos) | Aliasing IP padrão/GARP | Baixo: depende do VLAN RTT alargado (tempo de ida e volta) | Transparência total: o IP virtual é local nos nós. O IP do cliente é preservado.  
Sub-redes diferentes | Recuperação de desastres (datacenters remotos/cloud) | Balanceador de carga externo | Moderado: Maior latência de failover devido aos intervalos de verificação de integridade do Load Balancer | ⚠️ Transparência Parcial: Utiliza SNAT/DNAT. O IP virtual **NÃO** é local nos nós. O IP do cliente **NÃO** é preservado. A aplicação deve suportá-lo.  
Redireccionamento de DNS: Sem VIP | Recuperação de desastres (datacenters remotos) | Atualização do registo DNS (nome/IP físico) | Alto/imprevisível: Dependente do DNS TTL (Time To Live) e da cache DNS do cliente. | ⚠️ Não fiável: o cliente deve resolver novamente o DNS. Na maioria das vezes, os clientes continuam a utilizar o IP obsoleto resolvido no arranque e não são redirecionados após um failover.  
  
## Configurar um endereço IP virtual para balanceamento de carga de rede e alta disponibilidade {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-pt-pt  %}}
 

## Perguntas frequentes sobre IP virtual (VIP) {#virtual-ip-faq}

### IP virtual (VIP) e rede {#virtual-ip-vip--networking}

O que é um IP Virtual (VIP) e em que difere de um IP físico?

Embora um **endereço IP físico** esteja ligado a uma interface de rede específica, um **IP virtual (VIP)** é um endereço "flutuante" independente do hardware. Num cluster SafeKit, o VIP atua como um ponto de entrada persistente; se o servidor primário falhar, o VIP migrará automaticamente para um nó secundário íntegro, garantindo a reconfiguração do cliente zero.

Preciso de um balanceador de carga de hardware para utilizar um IP virtual?

Não. **O software de alta disponibilidade SafeKit** gere o IP virtual ao nível do software. Em arquiteturas da mesma sub-rede, utiliza **aliasing IP** e **ARP gratuito (GARP)** para redirecionar o tráfego. Isto elimina o custo e a complexidade dos balanceadores de carga de hardware externos ou dos servidores proxy dedicados.

O que é o ARP Gratuito (GARP) e porque é utilizado?

**ARP gratuito (GARP)** é uma transmissão de rede que atualiza as tabelas ARP dos switches e routers de rede. Durante um failover, o novo servidor primário envia um pacote GARP para anunciar que o **IP Virtual** está agora mapeado para o seu endereço MAC, forçando o reencaminhamento imediato do tráfego através da estrutura da rede.

Posso associar um nome DNS a um IP Virtual?

**Sim.** Pode associar um nome DNS a um VIP criando um registo A padrão. O principal benefício é que o redireccionamento é gerido ao **nível VIP** (via ARP ou redireccionamento de rede) e **não ao nível DNS**. Isto garante a **transparência da aplicação**, evitando atrasos associados à propagação do DNS e à expiração do TTL.

### Cloud e arquiteturas avançadas {#cloud--advanced-architectures}

Como funciona um IP Virtual na Nuvem (AWS, Azure, GCP)?

Em ambientes de cloud onde a Camada 2 (ARP) é restrita, o SafeKit integra-se com **Cloud Load Balancers** (AWS ELB, Azure LB ou Google GCLB). O SafeKit fornece um **URL de verificação de integridade** que a plataforma monitoriza para encaminhar o tráfego para o nó ativo utilizando SNAT/DNAT.

Será uma LAN estendida melhor do que um balanceador de carga para recuperação de desastres?

**Sim**. Para centros de dados remotos, uma **LAN estendida (VLAN estendida)** é geralmente superior porque mantém a **transparência de aplicações** entre sites. Ao manter o **mesmo IP Virtual**, a aplicação e os seus clientes continuam a comunicar utilizando a mesma identidade, tornando a transição entre data centers totalmente perfeita.

Quais são as limitações do redireccionamento de DNS versus IP virtual?

**O reencaminhamento de DNS** é limitado pelo **TTL (Time to Live)** e pela cache do lado do cliente, o que pode atrasar a recuperação durante horas. Uma grande desvantagem é que **os clientes que não voltam a resolver o seu nome DNS permanecem presos** ao tentar ligar-se ao servidor com falha. Por outro lado, um **IP virtual** fornece um failover instantâneo de Camada 2 que redireciona todo o tráfego imediatamente, garantindo a conectividade independentemente do estado da cache DNS do lado do cliente.

### Transparência e Segurança {#transparency--security}

Porque é que um IP Virtual local é importante para a transparência da aplicação?

Um **IP virtual (VIP)** local garante a **transparência da aplicação**, permitindo que o software se ligue a um VIP persistente. O SafeKit trata do redireccionamento ao **nível do kernel** , mantendo a aplicação inconsciente de failovers de cluster, ao contrário das soluções DNAT onde o IP ligado muda.

A utilização de um IP Virtual preserva o endereço IP original do cliente?

Sim. SafeKit evita a tradução de endereços de rede de origem (SNAT). Como o VIP é local para o servidor ativo, a aplicação recebe o **IP do cliente original** , que é crítico para a auditoria de segurança, persistência de sessão e registo regulamentar.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}