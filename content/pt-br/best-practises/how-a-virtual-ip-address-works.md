---
title: "Como funciona um endereço IP virtual (VIP) em cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-br/best-practises/how-a-virtual-ip-address-works/"
description: "Descubra como o SafeKit usa endereços IP virtuais (VIP) definidos por software para garantir tempo de atividade 24 horas por dia, 7 dias por semana. Saiba mais sobre o failover automatizado via ARP gratuito e por que ele supera o redirecionamento de DNS para continuidade dos negócios no Windows e no Linux."
category: "best-practises"
lang: "pt-br"
topics: "O que é um endereço IP virtual em um cluster de alta disponibilidade?, Implementação de IP virtual no SafeKit, Índice, Como um endereço IP virtual (VIP) funciona em um failover da mesma sub-rede (cluster de espelho), Como um IP virtual (VIP) funciona em diferentes sub-redes (cluster de espelho), Como um IP virtual com balanceamento de carga funciona em um farm da mesma sub-rede (cluster de farm), Como um IP virtual com balanceamento de carga funciona em sub-redes diferentes (cluster de farm), Virtual Redirecionamento de IP vs. DNS: Por que o failover de DNS geralmente falha, comparação: implementação de IP virtual, latência e transparência de aplicativos, configuração de um endereço IP virtual para balanceamento de carga de rede e alta disponibilidade, perguntas frequentes sobre IP virtual (VIP), 🔍 SafeKit High Availability Navigation Hub"
---

# Como funciona um endereço IP virtual (VIP) em cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual em um cluster de alta disponibilidade? {#virtual-ip-definition}

  * **Definição:** Um **endereço IP virtual (VIP)** é um endereço de rede flutuante usado no clustering de alta disponibilidade [](</pt-br/>) para garantir acesso contínuo ao aplicativo. Ao contrário dos IPs padrão, um VIP não está vinculado a uma interface de hardware física específica, mas alterna entre os nós do cluster para manter um ponto de entrada único e persistente para os clientes.
  * **Não é necessário hardware:** SafeKit gerencia o VIP no nível de software usando **ARP gratuito (GARP)** , eliminando a necessidade de balanceadores de carga externos em ambientes da mesma sub-rede.
  * **Transparência do aplicativo:** Ao vincular-se a um VIP local, os aplicativos não percebem eventos de failover, preservando os IPs de origem do cliente e as configurações de segurança existentes.
  * **Recuperação de desastres:** O uso de uma **LAN estendida** permite que o mesmo VIP seja usado em datacenters remotos, simplificando o failover entre sites em comparação com o complexo reencaminhamento de DNS e atrasos de cache TTL.


## Implementação de IP Virtual em SafeKit {#safekit-vip-implementation}

  * **Clusters de espelho:** Apresenta um IP flutuante ativo apenas no servidor primário para facilitar a replicação e o failover em tempo real.
  * **Farm Clusters:** permite o balanceamento de carga de rede mantendo o VIP em todos os nós simultaneamente.


**Principal benefício:** Ao utilizar **ARP (Protocolo de resolução de endereço) gratuito** ou **Aquisição de endereço MAC**, o VIP permite failover contínuo de aplicativos sem reconfiguração manual do cliente, garantindo a continuidade dos negócios 24 horas por dia, 7 dias por semana.

  * **Nuvem e múltiplas sub-redes:** Gerenciado por meio de verificações de integridade do balanceador de carga externo (AWS, Azure, GCP) para redirecionar o tráfego entre diferentes sub-redes.


![Diagrama de comparação do comportamento do IP Virtual (VIP) no Evidian SafeKit: Clusters de espelho mostrando um IP flutuante no nó ativo vs. Clusters de farm mostrando balanceamento de carga de rede em todos os nós.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Estratégias de implementação de IP virtual para clusters Mirror e Farm em SafeKit.**


{{%  insert-safekit-4-buttons-pt-br  %}}
 

## Índice {#table-of-contents}

  * [Como um endereço IP virtual (VIP) funciona em um failover da mesma sub-rede (cluster espelhado)](#virtual-ip-same-subnet-failover)
  * [Como um IP virtual (VIP) funciona em diferentes sub-redes (cluster espelhado)](#virtual-ip-different-subnets-failover)
  * [Como funciona um IP virtual com balanceamento de carga em um farm da mesma sub-rede (cluster de farm)](#vip-load-balancing-same-subnet)
  * [Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster de farm)](#vip-load-balancing-different-subnets)
  * [IP virtual vs. redirecionamento de DNS: por que o failover de DNS geralmente falha](#virtual-ip-vs-dns-redirection-failover)
  * [Comparação: implementação de IP virtual, latência e transparência de aplicativos](#vip-vs-dns-comparison)
  * [Configurando um endereço IP virtual para balanceamento de carga de rede e alta disponibilidade](#virtual-ip-configuration-load-balancing-ha)
  * [Perguntas frequentes sobre IP virtual (VIP)](#virtual-ip-faq)
  * [🔍 SafeKit Hub de navegação de alta disponibilidade](#hub)


## Como funciona um endereço IP virtual (VIP) em um failover da mesma sub-rede (cluster espelhado) {#virtual-ip-same-subnet-failover}

### Failover automatizado e redirecionamento de rede em uma sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Para organizações que exigem continuidade de negócios contínua em uma infraestrutura local, **Alta disponibilidade definida por software SafeKit para clusters de rede local** fornece uma solução robusta e automatizada para gerenciar endereços IP virtuais e failover de aplicativos em tempo real. 

### Cluster de espelho local: failover contínuo de 2 nós para Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mecanismo de failover SafeKit Virtual IP (VIP) entre dois servidores na mesma sub-rede](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 Aliasing VIP SafeKit e mapeamento de endereço MAC Em um **cluster de espelho SafeKit** padrão, onde ambos os nós residem na mesma sub-rede local, a alta disponibilidade é alcançada por meio de um **IP Virtual (VIP) definido por software**. Ao contrário das soluções baseadas em hardware, o SafeKit gerencia esse VIP diretamente na pilha de rede do sistema operacional. Este VIP atua como um ponto de entrada lógico persistente para clientes, em camadas sobre os endereços IP físicos exclusivos do Servidor 1 e do Servidor 2 por meio de **aliasing de IP**. 

#### Aliasing de IP avançado e suporte VIP múltiplo de SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Uma vantagem importante da solução **SafeKit** é sua flexibilidade no gerenciamento de identidades de rede. O VIP é um terceiro endereço IP que “flutua” entre os nós. Notavelmente, o SafeKit é capaz de gerenciar **vários endereços IP virtuais** em um único cluster. Eles podem ser atribuídos à mesma placa Ethernet primária ou distribuídos por diferentes placas físicas, permitindo configurações complexas onde diferentes serviços estão vinculados a identidades virtuais específicas. 

#### O mecanismo de failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit garante zero intervenção manual durante uma falha de hardware. Em operações normais, o VIP é mapeado para **Endereço MAC do Servidor 1 (mac1)**. Se SafeKit detectar uma falha de pulsação no Servidor 1, ele executará uma recuperação em duas etapas: 

  * **Recuperação de aplicativos:** SafeKit reinicia automaticamente os serviços de aplicativos críticos no Servidor 2.
  * **Reencaminhamento de rede:** SafeKit transmite instantaneamente uma mensagem **ARP gratuita (GARP)**. Isso força a atualização dos caches ARP de todos os switches de rede e clientes conectados, remapeando o VIP para o **Endereço MAC do Servidor 2 (mac2)**.


#### Data centers remotos e VLANs estendidas {#remote-data-centers--extended-vlans}

Embora normalmente usado para clusters locais, o **algoritmo de mesma sub-rede do SafeKit** é a escolha preferida para **Recuperação de desastres (DR)** em locais remotos conectados por meio de uma **LAN estendida ou VLAN estendida**. Essa arquitetura "ampliada" permite manter uma única sub-rede em distâncias geográficas, simplificando significativamente a topologia da rede e evitando a sobrecarga de protocolos de roteamento complexos. 

> **⚠️ Observação:** O redirecionamento da camada 2 via ARP gratuito é a **solução mais transparente** para aplicativos. Ao contrário do reencaminhamento da Camada 3 com um Balanceador de Carga, evita **Conversão de IP de Origem/Destino (SNAT/DNAT)**. A aplicação recebe o tráfego diretamente com o IP do cliente original e o IP Virtual é configurado localmente. **Muitos aplicativos preferem** ver o IP virtual localmente e receber diretamente o IP do cliente original. Sem essa transparência, eles **podem não funcionar como esperado** devido a traduções complexas de rede.

## Como um IP virtual (VIP) funciona em diferentes sub-redes (cluster espelhado) {#virtual-ip-different-subnets-failover}

### Orquestração de tráfego pronta para nuvem por meio de integração com balanceador de carga {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Ao aproveitar a infraestrutura de rede externa, a **alta disponibilidade definida por software SafeKit para clusters Multi-AZ e de nuvem** integra-se perfeitamente com um **balanceador de carga de rede** para orquestrar failover de tráfego em sub-redes e zonas de disponibilidade separadas. 

### Clusters de espelhos entre sub-redes: implementação em Windows e Linux {#cross-subnet-mirror-clusters-windows--linux-implementation}


![Diagrama de um failover de IP virtual usando um balanceador de carga em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Roteamento de tráfego de várias sub-redes por meio de verificações de integridade do balanceador de carga Quando os nós do cluster residem em **sub-redes diferentes** , o failover padrão baseado em ARP não é possível. Neste cenário, o **IP Virtual (VIP)** é hospedado em um **Balanceador de Carga (LB)** em vez da placa Ethernet do servidor. O Load Balancer atua como gateway, direcionando o tráfego para os endereços IP físicos dos nós primários e secundários com base na disponibilidade em tempo real. 

#### Roteamento dinâmico por meio de verificações de integridade SafeKit {#dynamic-routing-via-safekit-health-checks}

SafeKit gerencia a direção de tráfego fornecendo um **URL de verificação de integridade** dedicado em cada nó. O Load Balancer consulta estes URLs para determinar o estado do cluster: 

  * **Nó primário (PRIM):** A verificação de funcionamento retorna `HTTP 200 OK`. O Load Balancer direciona todo o tráfego aqui.
  * **Nó Secundário (SECOND):** A verificação de funcionamento retorna `HTTP 404 NOT FOUND`. O Load Balancer não envia tráfego para este nó.

Durante um **evento de failover** , SafeKit alterna instantaneamente as respostas da verificação de integridade, acionando o Load Balancer para redirecionar o tráfego do cliente para o novo servidor primário. 

> **⚠️ Observação:** SafeKit fornece a lógica de verificação de integridade; o Load Balancer físico ou virtual deve ser fornecido pela sua infraestrutura de rede.

#### Integração em nuvem: AWS, Azure e GCP {#cloud-integration-aws-azure-and-gcp}

Este modelo "Load Balancer + Health Check" é o padrão do setor para **Alta disponibilidade em nuvem**. É essencial para implementar SafeKit em ambientes como: 

  * 💡 [**Amazon AWS**](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>) (Balanceador de carga de rede AWS)
  * 💡 [**Microsoft Azure**](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>) (Balanceador de carga do Azure)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud Load Balancing)


#### Considerações de rede: balanceador de carga vs. LAN estendida {#network-considerations-load-balancer-vs-extended-lan}

Se um balanceador de carga não for desejado, consulte sua equipe de rede sobre a implementação de uma **LAN estendida (alongamento de VLAN)** entre sub-redes. Isso permite reverter para o modelo VIP mais simples "Mesma sub-rede". 

> **⚠️ Observação:** Ao optar por um Load Balancer, verifique se seu aplicativo é compatível com **Tradução de IP de origem/destino (SNAT/DNAT)**. Com um Load Balancer, o aplicativo pode perder o controle da identidade do usuário original ou falhar ao iniciar porque não vê mais o IP Virtual configurado diretamente em sua própria interface de rede.

## Como funciona um IP virtual com balanceamento de carga em um farm da mesma sub-rede (cluster de farm) {#vip-load-balancing-same-subnet}

### Desempenho escalonável: balanceamento de carga e redundância em nível de kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Para ambientes de alto tráfego, o **Guia de arquitetura: alta disponibilidade escalável com clusters de farm de vários nós** explica como SafeKit distribui cargas de trabalho entre vários servidores ativos, mantendo a redundância total. 

### Arquitetura de cluster de farm: balanceamento de carga em nós Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagrama de um IP Virtual (VIP) com balanceamento de carga em um cluster de farm da mesma sub-rede](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Processamento de tráfego distribuído por meio de filtragem de kernel Em um **cluster de farm de balanceamento de carga** , um endereço IP virtual (VIP) é usado para distribuir solicitações de clientes em vários servidores simultaneamente. Embora este exemplo apresente dois nós, a arquitetura é dimensionada para suportar farms de servidores maiores. Em uma configuração de mesma sub-rede, o VIP é configurado na placa Ethernet de **cada servidor** no cluster por meio de alias de IP. 

#### Distribuição de tráfego: o filtro em nível de kernel {#traffic-distribution-the-kernel-level-filter}

Ao contrário de um cluster de failover simples, um cluster de farm gerencia o tráfego por meio de um **filtro em nível de kernel** especializado. O processo funciona da seguinte forma: 

  * **Mapeamento ARP:** Nos caches ARP dos clientes, o VIP é inicialmente associado a um único endereço de hardware (por exemplo, `mac1` do Servidor 1).
  * **Divisão de pacotes:** Quando o Servidor 1 recebe o tráfego, o filtro de kernel SafeKit analisa a identidade dos pacotes recebidos (com base em **IP do cliente** ou **Porta TCP**).
  * **Compartilhamento de carga:** O filtro determina quais pacotes devem ser processados ​​localmente e quais devem ser redirecionados para outros nós (por exemplo, Servidor 2) para processamento, garantindo uma carga de trabalho equilibrada.


#### Failover e redirecionamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o nó primário (Servidor 1) falhar, o cluster mantém a disponibilidade por meio de **ARP gratuito (GARP)**. SafeKit transmite uma mensagem GARP para atualizar os caches ARP do cliente com `mac2` do Servidor 2. Isso garante que, mesmo se o "ponto de entrada" primário falhar, os clientes serão imediatamente redirecionados para os nós sobreviventes no farm. 

#### Implantação em locais remotos {#deployment-in-remote-sites}

Para organizações que operam em **data centers remotos** , esse algoritmo de balanceamento de carga permanece funcional desde que os sites estejam vinculados por meio de uma **LAN ou VLAN estendida**. Isso cria um ambiente virtual de "mesma sub-rede", que é a configuração mais eficiente para clusters de farm distribuídos geograficamente. 

## Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster farm) {#vip-load-balancing-different-subnets}

### Dimensionamento multizona: orquestrando tráfego em sub-redes de nuvem {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

O **Guia de arquitetura: dimensionamento de clusters de farm em ambientes multizona e de nuvem** fornece o modelo para distribuição de cargas de trabalho de aplicativos em zonas de disponibilidade e sub-redes separadas. 

### Clusters de farm entre sub-redes: escalabilidade de vários nós para Windows e Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagrama de um cluster de farm com balanceamento de carga operando em duas sub-redes diferentes](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Distribuição de tráfego global por meio de balanceamento de carga externo Quando os nós do farm são distribuídos em **sub-redes diferentes** (comum em implantações de nuvem Multi-AZ), o **IP virtual (VIP)** é gerenciado por um **Balanceador de carga (LB)** externo. O LB mantém o VIP e direciona o tráfego de entrada para os endereços IP físicos dos servidores localizados em suas respectivas sub-redes. 

#### Regras inteligentes de roteamento de tráfego e balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O Load Balancer distribui solicitações de clientes com base em dois fatores principais: 

  * **Regras de distribuição:** O tráfego é dividido de acordo com a afinidade da sessão ou algoritmos de balanceamento de carga (por exemplo, analisando **Endereço IP do cliente** ou **Porta TCP do cliente**).
  * **Disponibilidade do nó:** O tráfego é roteado somente para nós íntegros conforme determinado pela verificação de integridade SafeKit.


> **⚠️ Observação:** SafeKit fornece a lógica de verificação de integridade; o Load Balancer físico ou virtual deve ser fornecido pela sua infraestrutura de rede.

#### Mecanismo de verificação de integridade SafeKit {#safekit-health-check-mechanism}

SafeKit fornece um **URL de verificação de integridade** em tempo real em cada servidor do farm para comunicar seu status operacional ao balanceador de carga: 

  * **Nó UP:** A verificação de integridade retorna `HTTP 200 OK`. O Load Balancer inclui este servidor na rotação ativa.
  * **Nó DOWN/Failover:** Se um servidor ou aplicativo falhar, SafeKit retornará `HTTP 404 NOT FOUND` (ou o serviço se tornará inacessível). O Load Balancer para imediatamente de enviar tráfego para o nó com falha.


#### Padrões de implantação em nuvem: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Essa arquitetura é o modelo fundamental para **clusters Cloud Farm** , garantindo que, se uma sub-rede ou zona inteira ficar off-line, os nós restantes continuarão a lidar com a carga. Isso é nativamente suportado por: 

  * 💡 [**Amazon AWS**](</solutions/aws-load-balancing-cluster-failover/>) (Balanceador de carga de rede AWS)
  * 💡 [**Microsoft Azure**](</solutions/azure-load-balancing-cluster-failover/>) (Balanceador de carga do Azure)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## Redirecionamento de IP virtual versus DNS: por que o failover de DNS geralmente falha {#virtual-ip-vs-dns-redirection-failover}

### A armadilha da propagação de DNS: por que os VIPs superam o redirecionamento de DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Depender do DNS para failover geralmente cria uma **falsa sensação de segurança** em arquiteturas de alta disponibilidade. Embora a modificação de um registro DNS para apontar para um servidor de backup pareça um caminho de recuperação simples, ela introduz uma variável crítica: **latência imprevisível**. Como o redirecionamento baseado em DNS depende de um ecossistema não controlado de resolvedores recursivos intermediários para reconhecer e propagar a mudança, ele é fundamentalmente incompatível com os requisitos de “tempo de inatividade zero” dos serviços empresariais modernos. 

### O cenário técnico: resolução de DNS e o cliente “travado” {#the-technical-scenario-dns-resolution-and-the-stuck-client}

Em uma configuração de rede padrão, um **Nome Virtual** (o Nome DNS) atua como ponto de entrada legível para usuários. No entanto, para que os dados viajem pela rede, esse nome deve ser resolvido para um endereço **IP físico** específico. 

![Diagrama mostrando a resolução de nomes DNS para IP físico 1 em um cluster de alta disponibilidade](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolução DNS e clientes “travados” no IP físico 1 em um cluster de alta disponibilidade

#### Estado Atual: Resolução para IP Físico 1 {#current-state-resolution-to-physical-ip-1}

Inicialmente, **Cliente 1** e **Cliente 2** consultam o sistema DNS em busca do Nome Virtual. O sistema retorna **IP físico 1**. Os clientes então estabelecem uma conexão de rede direta (soquete) com esse endereço de hardware específico. 

#### O desafio do failover: redirecionamento para IP físico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Se o servidor no IP físico 1 falhar, um administrador atualizará o registro DNS para apontar para **IP físico 2**. Para redirecionar os clientes com sucesso, uma sequência "perfeita" deve ocorrer: 

  * O **Time to Live (TTL)** deve expirar em todos os ISPs intermediários e resolvedores corporativos.
  * O cache DNS local no Cliente 1 e no Cliente 2 deve ser liberado.
  * O aplicativo deve fechar seu soquete existente e iniciar uma _nova_ pesquisa de DNS.

Se alguma dessas etapas for perdida, **Cliente 1 e Cliente 2 permanecerão "travados"** tentando se comunicar com o IP Físico 1 morto, resultando em tempo de inatividade do serviço, apesar da atualização nos registros DNS. 

### As duas “caixas pretas” do redirecionamento de DNS {#the-two-black-boxes-of-dns-redirection}

  * **Cache recursivo:** muitos provedores de serviços de Internet (ISPs) e resolvedores de DNS corporativos ignoram configurações de TTL baixo para reduzir o tráfego, muitas vezes armazenando em cache o "antigo" IP físico 1 por minutos ou até horas além da expiração solicitada.
  * **Persistência de aplicativos:** aplicativos modernos (como microsserviços baseados em Java ou navegadores da Web) geralmente realizam uma pesquisa de DNS apenas uma vez na inicialização. Mesmo que o registro DNS seja atualizado para IP Físico 2, a aplicação continua utilizando o IP inicial armazenado em sua memória interna.


### Conclusão {#conclusion}

O redirecionamento de DNS é uma solução inconsistente para uma solução de alta disponibilidade. Para failover instantâneo em um ambiente local ou regional, um **IP Virtual (VIP)** definido por software é a única maneira de garantir persistência garantida sem tempo de inatividade. 

## Comparação: Implementação de IP Virtual, Latência e Transparência de Aplicativos {#vip-vs-dns-comparison}

**Comparação técnica de métodos de redirecionamento de IP Virtual (VIP) versus redirecionamento de DNS para alta disponibilidade e recuperação de desastres.**

Ambiente e caso de uso | Tipo de alta disponibilidade | Mecanismo de Redirecionamento | Latência de rede | Transparência de aplicativos e localidade de IP  
---|---|---|---|---  
Primário/Backup (alta disponibilidade) | Cluster de espelhos | Aquisição gratuita de ARP/MAC | Muito baixo: Tempo para detectar e enviar transmissão GARP | Transparência total: o IP virtual é local no nó ativo. O IP do cliente é preservado.  
Balanceamento de carga (ativo/ativo) | Agrupamento Agrícola | Filtro de rede em nível de kernel / GARP | Muito Baixo: Tempo para detectar e reconfigurar filtros de rede | Transparência total: o IP virtual é local em todos os nós. O IP do cliente é preservado.  
Mesma sub-rede/LAN estendida (alongamento de VLAN) | Recuperação de desastres (datacenters remotos) | Aliasing de IP padrão / GARP | Baixo: depende do VLAN RTT estendido (tempo de ida e volta) | Transparência total: o IP virtual é local nos nós. O IP do cliente é preservado.  
Sub-redes diferentes | Recuperação de desastres (datacenters remotos/nuvem) | Balanceador de carga externo | Moderado: Maior latência de failover devido aos intervalos de verificação de integridade do Load Balancer | ⚠️ Transparência Parcial: Utiliza SNAT/DNAT. O IP virtual **NÃO** é local nos nós. O IP do cliente **NÃO** é preservado. O aplicativo deve suportá-lo.  
Redirecionamento de DNS: Sem VIP | Recuperação de desastres (datacenters remotos) | Atualização de registro DNS (nome/IP físico) | Alto/imprevisível: Dependente do DNS TTL (Time To Live) e do cache DNS do cliente. | ⚠️ Não confiável: o cliente deve resolver novamente o DNS. Na maioria das vezes, os clientes continuam usando o IP obsoleto resolvido na inicialização e não são redirecionados após um failover.  
  
## Configurando um endereço IP virtual para balanceamento de carga de rede e alta disponibilidade {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-pt-br  %}}
 

## Perguntas frequentes sobre IP virtual (VIP) {#virtual-ip-faq}

### IP virtual (VIP) e rede {#virtual-ip-vip--networking}

O que é um IP Virtual (VIP) e como ele difere de um IP físico?

Embora um **endereço IP físico** esteja vinculado a uma interface de rede específica, um **IP virtual (VIP)** é um endereço "flutuante" independente do hardware. Em um cluster SafeKit, o VIP atua como um ponto de entrada persistente; se o servidor primário falhar, o VIP migrará automaticamente para um nó secundário íntegro, garantindo zero reconfiguração do cliente.

Preciso de um balanceador de carga de hardware para usar um IP virtual?

Não. **O software de alta disponibilidade SafeKit** gerencia o IP virtual no nível do software. Em arquiteturas de mesma sub-rede, ele utiliza **aliasing de IP** e **ARP gratuito (GARP)** para redirecionar o tráfego. Isso elimina o custo e a complexidade de balanceadores de carga de hardware externos ou servidores proxy dedicados.

O que é ARP Gratuito (GARP) e por que é usado?

**ARP gratuito (GARP)** é uma transmissão de rede que atualiza as tabelas ARP de switches e roteadores de rede. Durante um failover, o novo servidor primário envia um pacote GARP para anunciar que o **IP Virtual** agora está mapeado para seu endereço MAC, forçando o reencaminhamento imediato do tráfego através da estrutura da rede.

Posso associar um nome DNS a um IP Virtual?

**Sim.** Você pode associar um nome DNS a um VIP criando um registro A padrão. O principal benefício é que o redirecionamento é gerenciado no **nível VIP** (via ARP ou redirecionamento de rede) e **não no nível DNS**. Isso garante a **transparência do aplicativo**, evitando atrasos associados à propagação do DNS e à expiração do TTL.

### Nuvem e arquiteturas avançadas {#cloud--advanced-architectures}

Como funciona um IP Virtual na Nuvem (AWS, Azure, GCP)?

Em ambientes de nuvem onde a Camada 2 (ARP) é restrita, o SafeKit integra-se com **Cloud Load Balancers** (AWS ELB, Azure LB ou Google GCLB). SafeKit fornece um **URL de verificação de integridade** que a plataforma monitora para rotear o tráfego para o nó ativo usando SNAT/DNAT.

Uma LAN estendida é melhor que um balanceador de carga para recuperação de desastres?

**Sim**. Para datacenters remotos, uma **LAN estendida (VLAN estendida)** geralmente é superior porque mantém a **transparência de aplicativos** entre sites. Ao manter o **mesmo IP Virtual**, o aplicativo e seus clientes continuam a se comunicar usando a mesma identidade, tornando a transição entre data centers totalmente perfeita.

Quais são as limitações do redirecionamento de DNS versus IP virtual?

**O reencaminhamento de DNS** é limitado pelo **TTL (Time to Live)** e pelo cache do lado do cliente, o que pode atrasar a recuperação por horas. Uma grande desvantagem é que **os clientes que não resolvem novamente seu nome DNS permanecem presos** ao tentar se conectar ao servidor com falha. Por outro lado, um **IP virtual** fornece failover instantâneo de Camada 2 que redireciona todo o tráfego imediatamente, garantindo a conectividade independentemente do status do cache DNS do lado do cliente.

### Transparência e Segurança {#transparency--security}

Por que um IP Virtual local é importante para a transparência do aplicativo?

Um **IP virtual (VIP)** local garante a **transparência do aplicativo**, permitindo que o software se vincule a um VIP persistente. SafeKit lida com o redirecionamento no **nível do kernel** , mantendo o aplicativo inconsciente de failovers de cluster, ao contrário das soluções DNAT onde o IP vinculado muda.

O uso de um IP Virtual preserva o endereço IP original do cliente?

Sim. SafeKit evita tradução de endereço de rede de origem (SNAT). Como o VIP é local para o servidor ativo, o aplicativo recebe o **IP do cliente original** , que é crítico para auditoria de segurança, persistência de sessão e registro regulatório.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}