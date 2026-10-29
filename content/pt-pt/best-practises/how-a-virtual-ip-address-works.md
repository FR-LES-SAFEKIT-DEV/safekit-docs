---
title: "Como funciona um endereço IP virtual (VIP) em um cluster de alta disponibilidade?"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/how-a-virtual-ip-address-works/"
description: "Descubra como SafeKit utiliza endereços IP virtuais (VIP) definidos por software para garantir disponibilidade 24 horas por dia, 7 dias por semana. Saiba mais sobre o failover automático via ARP gratuito e por que ele supera o redirecionamento de DNS para continuidade de negócios no Windows e Linux ."
category: "best-practises"
lang: "pt-pt"
topics: "O que é um endereço IP virtual em um cluster de alta disponibilidade?, Implementação de IP Virtual em SafeKit , Sumário, Como um Endereço IP Virtual (VIP) Funciona em um Failover na Mesma Sub-rede (Cluster Mirror ), Como um IP Virtual (VIP) Funciona em Sub-redes Diferentes (Cluster Mirror ), Como um IP Virtual com Balanceamento de Carga Funciona na Mesma Sub-rede Farm (Cluster Farm ), Como um IP Virtual com Balanceamento de Carga Funciona em Sub-redes Diferentes (Cluster Farm ), IP Virtual vs. Redirecionamento de DNS: Por que o Failover de DNS Frequentemente Falha, Comparação: Implementação de IP Virtual, Latência e Transparência de Aplicativos, Configurando um Endereço IP Virtual para Balanceamento de Carga de Rede e Alta Disponibilidade, Perguntas Frequentes sobre IP Virtual (VIP), 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Como funciona um endereço IP virtual (VIP) em um cluster de alta disponibilidade? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## O que é um endereço IP virtual em um cluster de alta disponibilidade? {#virtual-ip-definition}

  * Definição de **:** Um endereço IP virtual (VIP) **é um endereço de rede** usado em clusters de alta disponibilidade [ para garantir o acesso contínuo ao aplicativo. Ao contrário dos IPs padrão, um VIP não está vinculado a uma interface de hardware física específica ](</>) mas alterna entre os nós do cluster para manter um único ponto de entrada persistente para os clientes.
  * **Não requer hardware:** SafeKit gerencia o VIP no nível do software usando **ARP gratuito (GARP)** , eliminando a necessidade de balanceadores de carga externos em ambientes de mesma sub-rede.
  * Transparência de aplicação **:** Ao se vincular a um VIP local, os aplicativos permanecem alheios a eventos de failover, preservando os IPs de origem do cliente e as configurações de segurança existentes.
  * Recuperação de desastres **:** **uso de uma LAN estendida** permite que o mesmo VIP seja usado em datacenters remotos, simplificando o failover site a site em comparação com o redirecionamento DNS complexo e os atrasos de cache TTL.


## Implementação de IP virtual em SafeKit {#safekit-vip-implementation}

  * Clusters **Mirror : O cluster** apresenta um IP flutuante ativo apenas no servidor primário para facilitar a replicação em tempo real e o failover.
  * Clusters **<span class="notranslate farm-term" translate="no">Farm</span> :** Permite o balanceamento de carga da rede, mantendo o VIP em todos os nós simultaneamente.


**Principal benefício:** Ao utilizar **o ARP (Address Resolution Protocol) gratuito** ou **a tomada de endereço MAC** , o VIP permite a transição perfeita de aplicações em caso de falha, sem necessidade de reconfiguração manual do cliente, garantindo a continuidade dos negócios 24 horas por dia, 7 dias por semana.

  * **Nuvem e Multi-Sub-rede:** Gerenciado por meio de verificações de integridade do balanceador de carga externo ( AWS , Azure , GCP ) para redirecionar o tráfego entre diferentes sub-redes.


![ Diagrama comparativo do comportamento de IPs virtuais (VIPs) no Evidian. SafeKit : Mirror Clusters mostrando um IP flutuante no nó ativo vs. Farm Clusters mostrando balanceamento de carga de rede em todos os nós. ](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

Estratégias de implementação de IP virtual **para clusters Mirror e <span class="notranslate farm-term" translate="no">Farm</span> em SafeKit .**


{{%  insert-safekit-4-buttons-pt-pt  %}}
 

## Índice {#table-of-contents}

  * [ Como um endereço IP virtual (VIP) funciona em um failover na mesma sub-rede (cluster Mirror ) ](#virtual-ip-same-subnet-failover)
  * [ Como um IP Virtual (VIP) funciona em diferentes sub-redes (cluster Mirror ) ](#virtual-ip-different-subnets-failover)
  * [ Como funciona um IP virtual com balanceamento de carga na mesma sub-rede <span class="notranslate farm-term" translate="no">Farm</span> (Cluster <span class="notranslate farm-term" translate="no">Farm</span> ) ](#vip-load-balancing-same-subnet)
  * [ Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster <span class="notranslate farm-term" translate="no">Farm</span> ) ](#vip-load-balancing-different-subnets)
  * [ IP Virtual vs. Redirecionamento de DNS: Por que o failover de DNS frequentemente falha ](#virtual-ip-vs-dns-redirection-failover)
  * Comparação [ : Implementação de IP virtual, latência e transparência de aplicativos ](#vip-vs-dns-comparison)
  * [ Configurando um endereço IP virtual para balanceamento de carga de rede e alta disponibilidade ](#virtual-ip-configuration-load-balancing-ha)
  * [ Perguntas frequentes sobre IP virtual (VIP) ](#virtual-ip-faq)
  * [ 🔍 SafeKit Hub de Navegação de Alta Disponibilidade ](#hub)


## Como funciona um endereço IP virtual (VIP) em um failover na mesma sub-rede (cluster Mirror ) {#virtual-ip-same-subnet-failover}

### Failover automático e redirecionamento de rede em uma sub-rede local {#automated-failover--network-rerouting-in-a-local-subnet}

Para organizações que necessitam de continuidade de negócios perfeita em uma infraestrutura local, **SafeKit Software-Defined High Availability for Local Network Clusters** oferece uma solução robusta e automatizada para gerenciar endereços IP virtuais e failover de aplicativos em tempo real. 

### Cluster local Mirror : Failover contínuo de 2 nós Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![ SafeKit Mecanismo de failover de IP virtual (VIP) entre dois servidores na mesma sub-rede ](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 Em um **cluster SafeKit mirror** SafeKit , onde ambos os nós residem na mesma sub-rede local, a alta disponibilidade é alcançada por meio de um **IP Virtual (VIP) definido por software** . Ao contrário das soluções baseadas em hardware, SafeKit gerencia esse VIP diretamente na pilha de rede do sistema operacional. Esse VIP atua como um ponto de entrada lógico persistente para os clientes, sobreposto aos endereços IP físicos exclusivos do Servidor 1 e do Servidor 2 por meio **de alias de IP** . 

#### SafeKit : Aliasing IP avançado e suporte a múltiplos VIPs {#safekits-advanced-ip-aliasing--multiple-vip-support}

Uma **principais vantagens da solução** SafeKit **é a sua flexibilidade na gestão de identidades de rede. O VIP é um terceiro endereço IP que "flutua" entre os nós. Notavelmente, SafeKit é capaz de gerenciar múltiplos endereços IP virtuais** dentro de um único cluster. Estes podem ser atribuídos à mesma placa Ethernet primária ou distribuídos por diferentes placas físicas, permitindo configurações complexas onde diferentes serviços estão vinculados a identidades virtuais específicas. 

#### Mecanismo de Failover: ARP Gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit garante zero intervenção manual durante uma falha de hardware. Em condições normais de operação, o VIP é mapeado para **o endereço MAC do Servidor 1 (mac1)** . Se SafeKit detectar uma falha de heartbeat no Servidor 1, ele executa uma recuperação em duas etapas: 

  * Recuperação de Aplicativos **:** SafeKit reinicia automaticamente os serviços de aplicativos críticos no Servidor 2.
  * **Redirecionamento de rede:** SafeKit transmite instantaneamente uma mensagem **ARP gratuita (GARP)** . Isso força a atualização dos caches ARP de todos os switches de rede e clientes conectados, remapeando o VIP para **o endereço MAC do Servidor 2 (mac2)** .


#### Data Centers remotos e VLANs estendidas {#remote-data-centers--extended-vlans}

Embora normalmente usado para clusters locais, o algoritmo de mesma sub-rede **SafeKit é a escolha preferida para recuperação** desastres (DR) **em sites remotos conectados por meio de uma LAN estendida** ou VLAN estendida **. Essa arquitetura "estendida" permite manter uma única sub-rede em diferentes distâncias geográficas, simplificando significativamente a topologia da rede e evitando a sobrecarga de protocolos** roteamento complexos. 

> **⚠️ Nota:** O redirecionamento de Camada 2 via ARP Gratuito é a **solução mais transparente** para aplicações. Ao contrário do redirecionamento de Camada 3 com um balanceador de carga, ele evita **a Tradução de IP de Origem/Destino (SNAT/DNAT)** . A aplicação recebe o tráfego diretamente com o IP original do cliente, e o IP virtual é configurado localmente. **Muitas aplicações preferem** visualizar o IP virtual localmente e receber o IP original do cliente diretamente. Sem essa transparência, elas **podem não funcionar como esperado** devido a traduções de rede complexas.

## Como um IP Virtual (VIP) funciona em diferentes sub-redes (cluster Mirror ) {#virtual-ip-different-subnets-failover}

### Orquestração de tráfego pronta para a nuvem por meio da integração de balanceador de carga {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Ao aproveitar a infraestrutura de rede externa, **SafeKit Software-Defined High Availability for Multi-AZ and Cloud Clusters** integra-se perfeitamente com um **Network Load Balancer** para orquestrar o failover de tráfego em sub-redes e zonas de disponibilidade separadas. 

### Clusters Mirror entre sub-redes: Implementação Windows e Linux {#cross-subnet-mirror-clusters-windows--linux-implementation}


Diagrama ![ de um failover de IP virtual usando um balanceador de carga em duas sub-redes diferentes ](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Roteamento de tráfego em múltiplas sub-redes via verificações de integridade do balanceador de carga. Quando os nós do cluster residem em **sub-redes diferentes** , o failover padrão baseado em ARP não é possível. Nesse cenário, o **IP virtual (VIP)** é hospedado em um **balanceador de carga (LB)** em vez da placa Ethernet do servidor. O balanceador de carga atua como gateway, direcionando o tráfego para os endereços IP físicos dos nós primário e secundário com base na disponibilidade em tempo real. 

#### Roteamento dinâmico via SafeKit Verificações de integridade {#dynamic-routing-via-safekit-health-checks}

**SafeKit gerencia o direcionamento de tráfego fornecendo um URL de verificação de integridade** dedicado em cada nó. O balanceador de carga consulta esses URLs para determinar o estado do cluster: 

  * Nó primário (PRIM) **:** . A verificação de integridade retorna `HTTP 200 OK` . O balanceador de carga direciona todo o tráfego para cá.
  * Nó secundário (SEGUNDO): **`HTTP 404 NOT FOUND`** O balanceador de carga não envia tráfego para este nó.

Durante um evento de failover **,** SafeKit alternam instantaneamente as respostas de verificação de integridade, fazendo com que o balanceador de carga redirecione o tráfego do cliente para o novo servidor primário. 

> **⚠️ Observação:** SafeKit fornecem a lógica de verificação de integridade; o balanceador de carga físico ou virtual deve ser fornecido pela sua infraestrutura de rede.

#### Integração com a nuvem: AWS , Azure e GCP {#cloud-integration-aws-azure-and-gcp}

Este modelo "Balanceador de Carga + Verificação de Saúde" é o padrão da indústria para **Alta Disponibilidade na Nuvem** . É essencial para implementar SafeKit em ambientes como: 

  * 💡 [ **Amazon AWS** ](</pt-pt/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWS Balanceador de Carga de Rede)
  * 💡 [ **Microsoft Azure** ](</pt-pt/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) ( Balanceador de Carga Azure )
  * 💡 [ **Google Cloud ( GCP )** ](</pt-pt/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Balanceamento de carga do Google Cloud)


#### Considerações de rede: balanceador de carga vs. LAN estendida {#network-considerations-load-balancer-vs-extended-lan}

Caso não deseje utilizar um balanceador de carga, consulte sua equipe de rede sobre a implementação de uma **LAN estendida (VLAN stretching)** entre sub-redes. Isso permite que você retorne ao modelo VIP mais simples de "mesma sub-rede". 

> **⚠️ Observação:** Ao optar por um balanceador de carga, verifique se seu aplicativo é compatível com **Tradução de IP de origem/destino (SNAT/DNAT)** . Com um balanceador de carga, o aplicativo pode perder o controle da identidade do usuário original ou não iniciar, pois não consegue mais visualizar o IP virtual configurado diretamente em sua própria interface de rede.

## Como funciona um IP virtual com balanceamento de carga em uma mesma sub-rede <span class="notranslate farm-term" translate="no">Farm</span> (cluster <span class="notranslate farm-term" translate="no">Farm</span> ) {#vip-load-balancing-same-subnet}

### Desempenho escalável: balanceamento de carga e redundância em nível de kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Para ambientes de alto tráfego, o Guia de Arquitetura **: Alta Disponibilidade Escalável com Clusters <span class="notranslate farm-term" translate="no">Farm</span> de Múltiplos Nós** explica como SafeKit distribui as cargas de trabalho entre vários servidores ativos, mantendo a redundância total. 

### Arquitetura do cluster <span class="notranslate farm-term" translate="no">Farm</span> : Balanceamento de carga entre os nós Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


Diagrama ![ de um IP Virtual (VIP) com balanceamento de carga dentro de um cluster farm na mesma sub-rede ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Processamento de tráfego distribuído via filtragem de kernel. Em um cluster de balanceamento de carga **<span class="notranslate farm-term" translate="no">farm</span>** , um endereço IP virtual (VIP) é usado para distribuir solicitações de clientes entre vários servidores simultaneamente. Embora este exemplo apresente dois nós, a arquitetura é escalável para suportar farms de servidores maiores. Em uma configuração de mesma sub-rede, o VIP é configurado na placa Ethernet de cada servidor **no cluster por meio de alias** IP. 

#### Distribuição de tráfego: o filtro de nível de kernel {#traffic-distribution-the-kernel-level-filter}

Ao contrário de um cluster de failover simples, um cluster <span class="notranslate farm-term" translate="no">farm</span> gerencia o tráfego por meio de um **filtro especializado em nível de kernel** . O processo funciona da seguinte maneira: 

  * Mapeamento ARP **:** Nos caches ARP dos clientes, o VIP é inicialmente associado a um único endereço de hardware (por exemplo, `mac1` do Servidor 1).
  * **Divisão de pacotes:** Quando o servidor 1 recebe o tráfego, o filtro de kernel SafeKit analisa a identidade dos pacotes recebidos (com base no **endereço IP do cliente** ou **na porta TCP** ).
  * Compartilhamento de carga **:** O filtro determina quais pacotes devem ser processados localmente e quais devem ser redirecionados para outros nós (por exemplo, Servidor 2) para processamento, garantindo uma carga de trabalho equilibrada.


#### Failover e redirecionamento com ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se o nó primário (Servidor 1) falhar, o cluster mantém a disponibilidade por meio **do ARP Gratuito (GARP)** . SafeKit transmite uma mensagem GARP para atualizar os caches ARP dos clientes com `mac2` do Servidor 2. Isso garante que, mesmo que o "ponto de entrada" primário falhe, os clientes sejam imediatamente redirecionados para os nós sobreviventes no farm . 

#### Implantação em locais remotos {#deployment-in-remote-sites}

Para organizações que operam em **data centers remotos** , esse algoritmo de balanceamento de carga permanece funcional, desde que os sites estejam conectados por meio de uma **LAN ou VLAN estendida** . Isso cria um ambiente virtual de "mesma sub-rede", que é a configuração mais eficiente para clusters <span class="notranslate farm-term" translate="no">farm</span> geograficamente distribuídos. 

## Como um IP virtual com balanceamento de carga funciona em diferentes sub-redes (cluster <span class="notranslate farm-term" translate="no">Farm</span> ) {#vip-load-balancing-different-subnets}

### Escalabilidade Multizona: Orquestrando o Tráfego em Sub-redes de Nuvem {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

O Guia **Arquitetura** : Dimensionamento de Clusters <span class="notranslate farm-term" translate="no">Farm</span> em Ambientes Multizona e em Nuvem fornece o modelo para distribuir cargas de trabalho de aplicativos em zonas de disponibilidade e sub-redes separadas. 

### Clusters <span class="notranslate farm-term" translate="no">Farm</span> entre sub-redes: Escalabilidade de múltiplos nós Windows e Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


Diagrama ![ de um cluster farm com balanceamento de carga operando em duas sub-redes diferentes ](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Distribuição global de tráfego via balanceamento de carga externo. Quando os nós <span class="notranslate farm-term" translate="no">farm</span> estão distribuídos em **diferentes sub-redes** (comum em implantações de nuvem Multi-AZ), o **IP virtual (VIP)** é gerenciado por um **balanceador de carga (LB)** externo. O LB armazena o VIP e direciona o tráfego de entrada para os endereços IP físicos dos servidores localizados em suas respectivas sub-redes. 

#### Regras inteligentes de roteamento de tráfego e balanceamento de carga {#intelligent-traffic-routing--load-balancing-rules}

O balanceador de carga distribui as solicitações do cliente com base em dois fatores principais: 

  * Regras **distribuição** : O tráfego **é dividido de acordo com a afinidade** **a porta TCP do cliente** ).
  * Disponibilidade do nó **: O tráfego** é roteado apenas para nós íntegros, conforme determinado pela verificação de integridade SafeKit .


> **⚠️ Observação:** SafeKit fornecem a lógica de verificação de integridade; o balanceador de carga físico ou virtual deve ser fornecido pela sua infraestrutura de rede.

#### Mecanismo de verificação de integridade SafeKit {#safekit-health-check-mechanism}

SafeKit fornece um **URL de verificação de integridade** em tempo real em cada servidor do <span class="notranslate farm-term" translate="no">farm</span> para comunicar seu status operacional ao balanceador de carga: 

  * Nó **ATIVO:** . A verificação de integridade retornou `HTTP 200 OK` . O balanceador de carga incluiu este servidor na rotação ativa.
  * **Nó INATIVO/Failover:** Se um servidor ou aplicativo falhar, SafeKit retorna `HTTP 404 NOT FOUND` (ou o serviço fica inacessível). O balanceador de carga para imediatamente de enviar tráfego para o nó com falha.


#### Padrões de Implantação em Nuvem: AWS , Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Essa arquitetura é o modelo fundamental para os clusters **Cloud <span class="notranslate farm-term" translate="no">Farm</span>** , garantindo que, se uma sub-rede ou zona inteira ficar offline, os nós restantes continuem a lidar com a carga. Isso é suportado nativamente por: 

  * 💡 [ **Amazon AWS** ](</pt-pt/solutions/aws-load-balancing-cluster-failover/>) ( AWS Balanceador de Carga de Rede)
  * 💡 [ **Microsoft Azure** ](</pt-pt/solutions/azure-load-balancing-cluster-failover/>) ( Balanceador de Carga Azure )
  * 💡 [ **Google Cloud ( GCP )** ](</pt-pt/solutions/gcp-load-balancing-cluster-failover/>) (Balanceamento de carga do Google Cloud)


## IP virtual vs. redirecionamento de DNS: por que o failover de DNS frequentemente falha {#virtual-ip-vs-dns-redirection-failover}

### A Armadilha da Propagação de DNS: Por que os VIPs superam o Redirecionamento de DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Confiar no DNS para **muitas vezes cria uma falsa sensação de segurança em arquiteturas** alta disponibilidade. Embora modificar um registro DNS para apontar para um servidor de backup pareça um caminho de recuperação simples, isso introduz uma variável crítica: latência **. Como o** baseado em DNS depende de um ecossistema não controlado de resolvedores recursivos intermediários para reconhecer e propagar a alteração, ele é fundamentalmente incompatível com os requisitos de "tempo de inatividade zero" dos serviços corporativos modernos. 

### Cenário técnico: Resolução de DNS e o cliente "travado" {#the-technical-scenario-dns-resolution-and-the-stuck-client}

Em uma configuração de rede padrão, um **Nome Virtual** (o Nome DNS) atua como o ponto de entrada legível para os usuários. No entanto, para que os dados trafeguem pela rede, esse nome deve ser resolvido para um endereço **IP físico** específico. 

Diagrama ![ mostrando a resolução de nomes DNS para o IP físico 1 em um cluster de alta disponibilidade ](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolução de DNS e clientes "travados" no endereço IP físico 1 em um cluster de alta disponibilidade

#### Estado atual: Resolução para IP físico 1 {#current-state-resolution-to-physical-ip-1}

Inicialmente, **o Cliente 1** e **o Cliente 2** consultam o sistema DNS para obter o Nome Virtual. O sistema retorna **o IP Físico 1.** Os clientes então estabelecem uma conexão de rede direta (socket) com esse endereço de hardware específico. 

#### O Desafio do Failover: Redirecionamento para o IP Físico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Se o servidor no endereço IP físico 1 falhar, um administrador atualiza o registro DNS para apontar para o endereço IP físico 2 **) e para o endereço IP físico 2** ). Para redirecionar os clientes com sucesso, uma sequência "perfeita" deve ocorrer: 

  * O **tempo de vida (TTL)** deve expirar em todos os servidores intermediários de ISPs e servidores corporativos.
  * O cache DNS local, tanto no Cliente 1 quanto no Cliente 2, deve ser limpo.
  * O aplicativo deve fechar seu socket existente e iniciar uma _nova_ consulta DNS.

Se alguma dessas etapas for omitida, o Cliente 1 e o Cliente 2 **) permanecerão "travados"** tentando se comunicar com o endereço IP físico 1 inativo, resultando em indisponibilidade do serviço, apesar da atualização nos registros DNS. 

### As duas "caixas pretas" do redirecionamento de DNS {#the-two-black-boxes-of-dns-redirection}

  * Cache recursivo **:** Muitos provedores de serviços de Internet (ISPs) e resolvedores DNS corporativos ignoram configurações de TTL baixas para reduzir o tráfego, frequentemente armazenando em cache o IP físico "antigo" 1 por minutos ou até horas além do tempo de expiração solicitado.
  * **Persistência de aplicação:** Aplicações modernas (como microsserviços baseados em Java ou navegadores web) geralmente realizam uma consulta DNS apenas uma vez na inicialização. Mesmo que o registro DNS seja atualizado para o IP físico 2, a aplicação continua a usar o IP inicial armazenado em sua memória interna.


### Conclusão {#conclusion}

O redirecionamento de DNS é uma solução inconsistente para alta disponibilidade. Para failover instantâneo em um ambiente local ou regional, um **IP virtual definido por software (VIP)** é a única maneira de garantir persistência sem tempo de inatividade. 

## Comparação: Implementação de IP Virtual, Latência e Transparência de Aplicativos {#vip-vs-dns-comparison}

Comparação técnica de **de redirecionamento** IP virtual (VIP) versus roteamento de DNS para alta disponibilidade e recuperação de desastres.

Ambiente e Caso de Uso | Tipo de Alta Disponibilidade | Mecanismo de Redirecionamento | Latência de Rede | Transparência de Aplicativos e Localidade IP  
---|---|---|---|---  
Primário/Backup (Alta Disponibilidade) | Mirror Cluster | Apropriação gratuita de ARP/MAC | Muito baixo: Tempo para detectar e enviar broadcast GARP | Transparência total: O IP virtual é local no nó ativo. O IP do cliente é preservado.  
Balanceamento de carga (ativo/ativo) | <span class="notranslate farm-term" translate="no">Farm</span> Cluster | Filtro de rede em nível de kernel / GARP | Muito baixo: Tempo para detectar e reconfigurar filtros de rede | Transparência total: O IP virtual é local em todos os nós. O IP do cliente é preservado.  
Mesma sub-rede / LAN estendida (VLAN Stretching) | Recuperação de desastres (datacenters remotos) | Aliasing de IP padrão / GARP | Baixo: Depende do RTT (Round Trip Time) da VLAN estendida | Transparência total: O IP virtual é local nos nós. O IP do cliente é preservado.  
Sub-redes diferentes | Recuperação de desastres (datacenters remotos / Nuvem) | Balanceador de carga externo | Moderado: Maior latência de failover devido aos intervalos de verificação de integridade do balanceador de carga | ⚠️ Transparência parcial: Usa SNAT/DNAT. O IP virtual é **e NÃO** local nos nós. O IP do cliente é **e NÃO** preservado. O aplicativo deve ser compatível.  
Redirecionamento de DNS: Sem VIP | Recuperação de desastres (datacenters remotos) | Atualização de registro DNS (nome / IP físico) | Alto/Imprevisível: Dependente do TTL (Tempo de Vida) do DNS e do cache de DNS do cliente. | ⚠️ Não confiável: O cliente deve resolver o DNS novamente. Na maioria das vezes, os clientes continuam usando o IP desatualizado resolvido na inicialização e não são redirecionados após uma falha.  
  
## Configurando um endereço IP virtual para balanceamento de carga de rede e alta disponibilidade {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-pt-pt  %}}
 

## Perguntas frequentes sobre IP virtual (VIP) {#virtual-ip-faq}

### IP Virtual (VIP) e Redes {#virtual-ip-vip--networking}

O que é um IP Virtual (VIP) e como ele difere de um IP físico?

Enquanto um **endereço IP físico** está vinculado a uma interface de rede específica, um **IP Virtual (VIP)** é um endereço "flutuante" independente do hardware. Em um cluster SafeKit , o VIP atua como um ponto de entrada persistente; se o servidor primário falhar, o VIP migra automaticamente para um nó secundário íntegro, garantindo a reconfiguração do cliente sem necessidade de alterações.

Preciso de um balanceador de carga de hardware para usar um IP virtual?

O software de alta disponibilidade **SafeKit gerencia o IP virtual em nível** software. Em arquiteturas de mesma sub-rede, ele utiliza o alias de IP **e o ARP gratuito (GARP** **redirecionar o tráfego. Isso elimina o custo e** complexidade de balanceadores de carga de hardware externos ou servidores proxy dedicados.

O que é ARP Gratuito (GARP) e por que ele é usado?

**O ARP gratuito (GARP)** é uma transmissão de rede que atualiza as tabelas ARP de switches e roteadores de rede. Durante uma falha de rede (failover), o novo servidor primário envia um pacote GARP para anunciar que o **IP virtual** agora está mapeado para o seu endereço MAC, forçando o redirecionamento imediato do tráfego pela rede.

Posso associar um nome DNS a um IP virtual?

**Sim.** Você pode associar um nome DNS a um VIP criando um registro A padrão. A principal vantagem é que o redirecionamento é gerenciado no **nível do VIP** (via ARP ou redirecionamento de rede) e **não no nível do DNS** . Isso garante **a transparência da aplicação** , evitando atrasos associados à propagação do DNS e ao vencimento do TTL.

### Nuvem e Arquiteturas Avançadas {#cloud--advanced-architectures}

Como funciona um IP virtual na nuvem ( AWS , Azure , GCP )?

Em ambientes de nuvem onde a Camada 2 (ARP) é restrita, SafeKit integra-se com os balanceadores de carga em nuvem **(** **AWS ELB, Azure LB ou Google GCLB). SafeKit fornece um URL de verificação de integridade** que a plataforma monitora para rotear o tráfego para o nó ativo usando SNAT/DNAT.

Uma LAN estendida é melhor que um balanceador de carga para recuperação de desastres?

**. Para datacenters** , uma LAN **(VLAN estendida)** ser superior porque mantém **transparência do** entre **sites. Ao manter o mesmo IP virtual, o aplicativo e seus clientes continuam a se comunicar usando a mesma identidade,** a transição entre datacenters completamente transparente.

Quais são as limitações do redirecionamento de DNS em comparação com o IP virtual?

**O redirecionamento de DNS** é limitado pelo **TTL (Time to Live)** e pelo cache do lado do cliente, o que pode atrasar a recuperação por horas. Uma grande desvantagem é que **os clientes que não resolvem novamente seus nomes de DNS permanecem presos,** tentando se conectar ao servidor com falha. Em contraste, um **IP virtual** fornece failover instantâneo de Camada 2 que redireciona todo o tráfego imediatamente, garantindo a conectividade independentemente do status do cache de DNS do lado do cliente.

### Transparência e Segurança {#transparency--security}

Por que um IP virtual local é importante para a transparência da aplicação?

Um morador local **IP Virtual (VIP)** garante **transparência do aplicativo** permitindo que o software se vincule a um VIP persistente. SafeKit lida com o redirecionamento no **nível do kernel** , mantendo a aplicação alheia às falhas do cluster, ao contrário das soluções DNAT onde o IP vinculado muda.

O uso de um IP virtual preserva o endereço IP original do cliente?

Sim. SafeKit evita a Tradução de Endereço de Rede de Origem (SNAT). Como o VIP é local ao servidor ativo, o aplicativo recebe o **IP original do cliente** , o que é fundamental para auditoria de segurança, persistência de sessão e registro regulatório.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}