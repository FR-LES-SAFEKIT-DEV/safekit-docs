---
title: "Kubernetes K3s Alta Disponibilidade: Replicação Síncrona e Failover de 2 Nós"
canonical: "https://safekit.eviden.com/pt-pt/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Obtenha alta disponibilidade do K3s em 2 nós sem armazenamento externo ou quorum do etcd. Saiba como SafeKit proporciona replicação sem perda de dados e failover automático."
category: "solutions"
lang: "pt-pt"
topics: "Simplificando a Alta Disponibilidade do K3s: Por que escolher SafeKit em vez do MetalLB e do Longhorn?, Sumário, Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade do K3s ( Kubernetes )?, Como o cluster SafeKit mirror funciona com o K3s Kubernetes )?, Limitações de Alta Disponibilidade SafeKit , Comparação: SafeKit vs. Pilha K3s Padrão (MetalLB e Longhorn), Guia em Vídeo: Configurando um cluster de alta disponibilidade SafeKit mirror ), 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Kubernetes K3s Alta Disponibilidade: Replicação Síncrona de 2 Nós e Failover {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## Simplificando o HA do K3s: Por que escolher SafeKit em vez de MetalLB e Longhorn? {#safekit-k3s-ha-introduction}

Embora a pilha de código aberto padrão (MetalLB + Longhorn) para K3s seja poderosa para grandes data centers, ela introduz complexidade excessiva para sites locais com 2 nós. **SafeKit** simplifica o ambiente K3s substituindo ferramentas independentes de rede e armazenamento por um único mecanismo de alta disponibilidade consolidado. 

### Por que usar SafeKit para alta disponibilidade (HA) em K3s de 2 nós? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **Alta disponibilidade verdadeira de 2 nós:** SafeKit fornece redundância total com apenas **2 nós** , eliminando o requisito de 3 nós para o quorum _etcd_.
  * **Perda de Dados Zero (RPO=0):** Substitui o armazenamento em bloco de alta sobrecarga por **Replicação síncrona em nível de byte** para desempenho de SSD local.
  * **Proteção flexível em nível de arquivo:** SafeKit realiza replicação baseada em host em nível de arquivo, o que é completamente transparente para o aplicativo. Ele protege não apenas bancos de dados, mas também todas as pastas e dados associados. Você pode replicar pastas existentes exatamente onde elas estão instaladas, inclusive no **disco do sistema** .
  * **IP Virtual Integrado (VIP):** Gerencia nativamente o IP do cluster no nível do kernel, eliminando a necessidade de configurações separadas **do MetalLB** .
  * **Failover e Failback automáticos:** Aciona uma transição imediata para o nó secundário em caso de falha; assim que o nó primário estiver íntegro, SafeKit executa **a ressincronização automática de dados** sem intervenção manual.
  * **Ultrabaixo Overhead:** SafeKit opera sem a sobrecarga de gerenciamento pesada de pods de armazenamento (CSI/Longhorn) e pods de rede (CNI/MetalLB) exigida pelas stacks padrão, liberando RAM e CPU críticas para seus aplicativos.
  * **Amigável para generalistas de TI:** Substitui a complexa infraestrutura **YAML** para redes e armazenamento por uma **GUI web simples** e scripts de implantação automatizados, permitindo que você se concentre apenas em seus aplicativos.


Diagrama de arquitetura ![ SafeKit para alta disponibilidade de 2 nós K3s com IP virtual integrado, replicação em tempo real e failover automático. ](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **Alta disponibilidade (HA) sem compartilhamento para clusters K3s de 2 nós**  


<a class="btn-quick-install" href="/pt-pt/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Guia rápido de instalação do cluster HA Kubernetes > </a>
## Índice {#toc}

  * [ Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade K3s Kubernetes ? ](#safekit-mirror-k3s-cluster)
  * Como o cluster [ SafeKit mirror funciona com o K3S Kubernetes ? ](#safekit-mirror-cluster)
  * [ SafeKit Limitações de Alta Disponibilidade ](#safekit-ha-limitations)
  * Comparação [ : SafeKit vs. Conjunto K3s padrão (MetalLB e Longhorn) ](#safekit-k3s-ha-comparison)
  * Guia em vídeo [ : Configurando um cluster HA SafeKit Mirror ](#videoguide-safekit-mirror-cluster)
  * [ 🔍 SafeKit Hub de Navegação de Alta Disponibilidade ](#hub)


## Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade K3s Kubernetes ? {#safekit-mirror-k3s-cluster}

### Como implementar alta disponibilidade para um cluster K3s de 2 nós Kubernetes ? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

Você pode implementar alta disponibilidade (HA) para um cluster K3s de 2 nós Kubernetes ) usando o **SafeKit k3s.safe mirror module** . Essa solução permite implantar um ambiente redundante sem a necessidade de armazenamento NFS externo, um banco de dados de configuração externo dedicado ou conhecimento especializado em Kubernetes .

### Por que usar K3s para computação de borda e IoT? {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>) é o mecanismo Kubernetes preferido para **IoT e computação de borda** por ser uma distribuição leve e certificada, projetada para ambientes com recursos limitados. Ele simplifica a sobrecarga operacional do Kubernetes padrão, mantendo total compatibilidade.

### Quais são as principais características dos módulos k3s.safe mirror ? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

O módulo k3s.safe fornece uma pilha de alta disponibilidade abrangente para K3s, implementando:

  * **Nós Ativos Duplos:** Executa 2 masters/agentes K3s ativos simultaneamente para hospedar pods.
  * Replicação do banco de dados **: Replicação em tempo real do banco de dados MariaDB** nós.
  * **Armazenamento persistente:** Replicação de volumes persistentes por meio de um provisionador dinâmico de cliente NFS integrado (nfs-client).
  * Continuidade de rede **:** Inclui um endereço IP virtual para acesso contínuo do cliente.
  * **Recuperação automatizada:** Suporte completo para failover e failback automáticos.


### Além do K3s, quais aplicações e ambientes SafeKit pode proteger? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit é uma solução versátil de alta disponibilidade **para Windows e Linux** que vai muito além do cluster K3s mirror . Ela permite **replicação síncrona em tempo real** e failover automático para uma ampla gama de cargas de trabalho críticas, incluindo:

  * **Ambientes Virtuais e Físicos:** Máquinas virtuais Hyper-V ou KVM completas.
  * Orquestração de contêineres **: ambientes** , Docker e Podman .
  * **Dados e Serviços:** Diretórios de arquivos individuais, serviços e vários bancos de dados.
  * Infraestrutura de nuvem **: Alta disponibilidade para aplicações em nuvem** .


SafeKit também fornece **clusters <span class="notranslate farm-term" translate="no">Farm</span>** com **balanceamento de carga de rede nativo e failover** para aplicações sem estado, como **servidores web** .

💡 [ Explore a lista completa de soluções de alta disponibilidade (HA) compatíveis aqui. ](</pt-pt/solutions/>)

### Como SafeKit garante alta disponibilidade ao K3s? {#safekit-k3s-architecture-table}

Arquitetura e lógica de redundância **para um cluster K3s de 2 nós usando SafeKit**

Cluster K3s de 2 nós | SafeKit PRIM (Nó Primário) | SafeKit SECOND (Nó Secundário)  
---|---|---  
Execução de carga de trabalho | Os serviços mestre e agente do K3s estão ativos, gerenciando a orquestração do cluster e executando pods. | Os serviços mestre e agente do K3s permanecem ativos, fornecendo processamento paralelo e alta disponibilidade.  
Armazenamento NFS e PVs | • Hospeda IP virtual e porta NFS <br> • Gerencia compartilhamentos NFS exportados ativos <br> • Armazena volumes persistentes (PVs) do K3s | Espelhamento síncrono: SafeKit replica todos os volumes persistentes em tempo real para garantir zero perda de dados.  
Banco de dados de configuração | • Hospeda o IP virtual e a porta MariaDB <br> • Gerencia o banco de dados de configuração ativo do K3s | Replicação do banco de dados: O banco de dados MariaDB é espelhado de forma síncrona, preservando o estado do cluster para failover.  
  
Mecanismo de Failover Automático **:** Em caso de falha do nó primário, SafeKit migra automaticamente os IPs virtuais e os serviços de armazenamento para o nó secundário, garantindo o serviço ininterrupto do cluster K3s.

## Como o cluster SafeKit mirror funciona com o K3S Kubernetes ? {#safekit-mirror-cluster}

### Etapa 1: Replicação de arquivos em nível de byte em um cluster Mirror {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Esta etapa ilustra a arquitetura de alta disponibilidade entre o Servidor 1 (PRIM) **e o Servidor 2 (SECOND)** . Ambos os servidores executam os componentes mestre e agente ](#safekit-k3s-architecture-table) K3s **conforme definido na tabela** arquitetura [ .


Replicação de arquivos ![ em nível de byte em um cluster K3s Kubernetes mirror ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Atualmente, o **IP Virtual (VIP)** , **o armazenamento persistente NFS** e **MariaDB** estão ativos apenas no Servidor 1 (PRIM). Os componentes mestre do K3s em ambos os nós sincronizam-se entre si acessando o estado do cluster por meio do IP Virtual e da porta MariaDB . O SafeKit implementa a replicação síncrona [ de arquivos MariaDB ](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>) garantindo **zero perda de dados (RPO = 0)** em caso de falha.

Os servidores mestres do K3s distribuem a carga de trabalho entre os dois nós (ou mais) comunicando-se diretamente com os agentes do K3s. Clientes externos se conectam ao  
O endereço IP virtual do cluster [ ](</pt-pt/best-practises/how-a-virtual-ip-address-works/>) no nó PRIM. Usando mecanismos padrão Kubernetes , o mestre K3s retransmite o tráfego para os pods distribuídos pelos nós. Da mesma forma, os pods acessam seus volumes persistentes (PVs) **no servidor PRIM por meio do IP virtual e** porta NFS.

### Etapa 2: Failover automático e continuidade de serviço {#step-2-automatic-failover-and-service-continuity}

Quando o servidor **1 (PRIM)** falha, o servidor **2 (SECOND)** assume automaticamente as operações do cluster para garantir a continuidade.


Failover ![ em um cluster K3S Kubernetes mirror ](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit detecta a falha e migra imediatamente o endereço IP virtual **do cluster para o Servidor 2. Em seguida** promove os serviços NFS locais **MariaDB** **e** para o estado ativo. Devido à replicação síncrona realizada na Etapa 1, todos os bancos de dados MariaDB e arquivos de Volume Persistente (PV) NFS já estão atualizados no Servidor 2, garantindo zero perda de dados.

Com o estado do cluster preservado, o **K3s Master** no Servidor 2 continua a execução. Ele detecta a perda do agente do Servidor 1 e reprograma automaticamente os pods afetados para os agentes K3s ativos restantes. O tempo total de failover (RTO) é a soma do intervalo de detecção de falhas (padrão: 30 segundos) e o tempo necessário para os componentes do K3s inicializarem no nó secundário.

Enquanto o Servidor 1 estiver offline, os serviços MariaDB e NFS continuarão em execução no Servidor 2, gravando as alterações apenas localmente.  


### Etapa 3: Reversão e reintegração automática {#step-3-failback-and-automatic-reintegration}

O failback **ocorre quando** Servidor 1 é reiniciado após a resolução do problema inicial. SafeKit ressincroniza automaticamente os arquivos MariaDB e NFS, atualizando apenas os dados modificados no Servidor 2 durante o período de inatividade. Esse processo de reintegração é **não disruptivo** ; os componentes mestre e agente do K3s continuam a ser executados no Servidor 2 sem interrupção. 


![ Ressincronização automática e failback em um cluster K3s mirror ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit otimiza o tempo de recuperação com base em como o servidor foi interrompido: 

  * **Encerramento limpo:** Se SafeKit foi interrompido intencionalmente no Servidor 1, apenas as zonas modificadas específicas dentro dos arquivos são ressincronizadas usando **bitmaps de rastreamento de modificações** . Isso garante uma reintegração ultrarrápida. 
  * **Falha do sistema (ex.: queda de energia):** Se o Servidor 1 sofreu um desligamento incorreto, os bitmaps de modificação são ignorados por segurança. SafeKit em vez disso, ressincroniza todos os arquivos com um carimbo de data/hora de modificação mais recente do que o último ponto de sincronização estabelecido, garantindo **integridade total dos dados** . 


### Etapa 4: Restaurando a Alta Disponibilidade e a Distribuição de Carga {#step-4-restoring-high-availability-and-load-distribution}

Após a reintegração, o cluster retorna ao **modo mirror completo** , espelhando o estado descrito na Etapa 1. O sistema está novamente em um estado de alta disponibilidade: os serviços **MariaDB** e **NFS** permanecem ativos no Servidor 2, enquanto SafeKit realiza a replicação em tempo real de todas as atualizações de arquivos de volta para o Servidor 1. 


![ Retorno à operação normal em um cluster Kubernetes K3s mirror ](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

O **K3s Master** e **o K3s Agent** são reiniciados automaticamente no Servidor 1. O agendador Kubernetes agora reconhece o Servidor 1 como um nó íntegro e pode começar a reagendar os pods para distribuir a carga de trabalho entre os dois servidores. 

Se o administrador preferir que os serviços MariaDB e NFS sejam executados no Servidor 1 (restaurando a função PRIM original), a **troca** pode ser acionada manualmente por meio do console da web em um momento conveniente ou automatizada por meio das configurações. 

### Como configurar um cluster SafeKit Mirror ? {#safekit-mirror-cluster-configure}


Console Web ![ SafeKit : Painel de configuração de alta disponibilidade mostrando redes de heartbeat, configuração de IP virtual e replicação de diretório em tempo real para um cluster mirror . ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


O console web **SafeKit** oferece uma interface intuitiva para orquestrar alta disponibilidade para seus aplicativos críticos. Em apenas alguns passos, você pode configurar um cluster **SafeKit mirror** para garantir a continuidade dos negócios:

  * **Failover de Aplicativo (Aba Macros):** Defina os serviços de aplicativo específicos que devem ser reiniciados automaticamente em caso de falha.
  * Rede(s) de pulsação **:** Caminho(s) de comunicação dedicado(s) usado(s) pelos nós do cluster para monitorar continuamente a saúde e a disponibilidade uns dos outros e sincronizar as decisões de failover.
  * Gerenciamento de IP Virtual **:** Configurar o IP Virtual (VIP) para reconexão transparente do cliente após uma falha.
  * Replicação em tempo real **:** Selecione os diretórios críticos para replicação síncrona em nível de byte baseada em host.
  * Verificadores **:** Monitoram a integridade do aplicativo e acionam a recuperação automática se uma falha de processo for detectada.


O cluster SafeKit inclui um verificador de split-brain dedicado para resolver problemas de isolamento de rede sem a necessidade de uma terceira máquina testemunha ou uma rede de heartbeat adicional. Saiba mais sobre heartbeat, failover e quorum [ em um cluster ](</pt-pt/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) .

### Como monitorar um cluster SafeKit mirror ? {#safekit-mirror-cluster-monitoring}


Console Web ![ SafeKit : Monitoramento em tempo real de um cluster mirror de 2 nós, mostrando os estados PRIM e SECOND com replicação de dados ativa. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


O **console de gerenciamento SafeKit** oferece uma visão unificada da sua infraestrutura de alta disponibilidade. Ele permite que os administradores monitorem o **estado operacional** do cluster e acompanhem a sincronização de dados em tempo real.

Para um cluster mirror de 2 nós, o console exibe claramente as funções de cada servidor:

  * **PRIM (Primário):** O nó ativo que atualmente executa o aplicativo e gerencia o IP virtual. Ele realiza gravações no armazenamento local e replicação em tempo real para o nó secundário.
  * **SEGUNDO (Secundário):** O nó de espera que recebe atualizações síncronas em nível de byte. Ele está pronto para assumir o controle instantaneamente se o Primário falhar.
  * Estado **SOZINHO:** Alerta visualmente quando o cluster está sendo executado em um único nó (por exemplo, durante a manutenção ou após uma falha), indicando que a redundância foi temporariamente perdida.
  * Progresso da ressincronização **:** Quando um nó com falha se recupera, seu status fica laranja durante a reintegração de dados em segundo plano, garantindo que não haja tempo de inatividade durante a fase de "retorno ao normal".


Além de simples ícones de status, a interface oferece **orquestração de failover com um clique** , permitindo que você reatribua manualmente a função principal para manutenção planejada, garantindo a disponibilidade contínua para a atividade do usuário.


{{%  insert-safekit-usage-pt-pt  %}}
 

## Comparação: SafeKit vs. Conjunto padrão K3s (MetalLB e Longhorn) {#safekit-k3s-ha-comparison}

Comparação **: SafeKit vs.** de código aberto padrão (MetalLB + Longhorn)

Capacidade | SafeKit ( K3s.safe ) | MetalLB + Longhorn (Standard K8s)  
---|---|---  
Arquitetura | Tudo-em-Um: Rede, replicação e failover integrados em um único pacote. | Faça Você Mesmo (DIY): Requer vários pacotes independentes (CNI, CSI, LoadBalancer).  
Eficiência de hardware | Alta disponibilidade pura de 2 nós: Redundância completa sem um terceiro nó "testemunha" ou árbitro. | Mínimo de 3 nós: Normalmente requer um número ímpar de nós para quorum Etcd e segurança de armazenamento.  
Rede (VIP) | Nativa: IP virtual gerenciado no nível do sistema operacional; transparente para K3s. | Complexa: Requer instalação do MetalLB com configuração L2 ou BGP usando pods de alto-falante dedicados que consomem CPU/RAM em cada nó.  
Requisitos de armazenamento | Síncrono em nível de byte: Replicação de arquivos em tempo real de diretórios existentes; funciona em discos de sistema padrão; replicação de arquivos em nível de byte com sobrecarga mínima de CPU/rede. | Em nível de bloco: Armazenamento de bloco distribuído (Longhorn) usando pods de armazenamento dedicados; maior consumo de recursos.  
Inteligência de Failover | Estabilidade Independente: SafeKit opera fora do ambiente de execução do contêiner. Ele monitora o sistema operacional e o hardware diretamente, garantindo o failover mesmo se o plano de controle Kubernetes ou o mecanismo do contêiner travarem. | Dependência Circular: A lógica de failover é hospedada _dentro_ dos pods que ela deve proteger. Se o sistema operacional do host ou o mecanismo K3s travar, os pods de gerenciamento (MetalLB/Longhorn) também congelam, muitas vezes exigindo triagem manual para quebrar o "bloqueio".  
Administração | : gerenciável por meio de um único console web; não requer conhecimento Kubernetes . | especializada: requer conhecimento profundo de YAML, Helm e controladores internos do Kubernetes.  
  
**Em resumo** , embora uma pilha DIY padrão (MetalLB + Longhorn) ofereça modularidade para especialistas em Kubernetes , ela cria uma **dependência circular** onde as ferramentas de armazenamento e rede ficam vulneráveis às mesmas falhas de nó que foram projetadas para gerenciar. **SafeKit** quebra esse ciclo operando como uma camada de infraestrutura independente; ele fornece uma solução de alta disponibilidade (HA) de 2 nós mais robusta e agnóstica ao hardware, que permanece operacional mesmo se o mecanismo Kubernetes ou o sistema operacional do host travarem. Isso garante recuperação automatizada e integridade de dados sem a sobrecarga de recursos, o quórum obrigatório de três nós ou a complexidade de configuração exigida pelos overlays tradicionais de armazenamento em bloco distribuído e rede.

## Guia em vídeo: Configurando um cluster HA SafeKit mirror {#videoguide-safekit-mirror-cluster}

### Vídeo SafeKit : Agrupamento em nível de aplicação (8:47) {#demo-mirror-ha-cluster}

Embora este vídeo demonstre a alta disponibilidade do SafeKit para Microsoft SQL Server , ele oferece uma excelente visão geral de como a solução protege os ambientes K3s. SafeKit funciona de forma idêntica para qualquer outro banco de dados ou aplicativo crítico para os negócios.

### Vídeo em destaque {#video-highlights}

  1. 🎬 [ 2 nós com SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Configurar o cluster e o módulo mirror.safe ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Iniciar e testar replicação SQL, migração, failover em caso de falha ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}