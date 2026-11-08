---
title: "Alta Disponibilidade Kubernetes K3s: Replicação Síncrona e Failover de 2 Nós"
canonical: "https://safekit.eviden.com/pt-br/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Obtenha alta disponibilidade do K3s em 2 nós sem armazenamento externo ou quórum etcd. Saiba como SafeKit oferece replicação sem perda de dados e failover automático."
category: "solutions"
lang: "pt-br"
topics: "Simplificando o K3s HA: Por que escolher SafeKit em vez do MetalLB e do Longhorn?, Índice, Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade Kubernetes K3s?, Como o cluster mirror SafeKit funciona com Kubernetes K3S?, Limitações SafeKit de Alta Disponibilidade, Comparação: SafeKit vs. Stack K3s Padrão (MetalLB e Longhorn), Guia em vídeo: Configurando um cluster mirror de alta disponibilidade com o SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.8 | Translation LLM | 23 expressions"
---

# Alta Disponibilidade Kubernetes K3s: Replicação Síncrona e Failover de 2 Nós {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## Simplificando o K3s HA: Por que escolher SafeKit em vez do MetalLB e do Longhorn? {#safekit-k3s-ha-introduction}

Embora a pilha padrão de código aberto (MetalLB + Longhorn) para K3s seja poderosa para grandes data centers, ela introduz uma complexidade excessiva para sites locais de 2 nós. **SafeKit** simplifica o ambiente K3s, substituindo ferramentas de rede e armazenamento autônomas por um único mecanismo de HA consolidado. 

### Por que usar SafeKit para alta disponibilidade (HA) em K3s de 2 nós? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **Alta disponibilidade real de 2 nós:** SafeKit oferece redundância total com apenas **2 nós**, eliminando o requisito de 3 nós para o quórum *etcd*.
  * **Perda de dados zero (RPO = 0):** substitui o armazenamento em bloco de alta sobrecarga por **replicação síncrona em nível de byte** para desempenho de SSD local.
  * **Proteção flexível em nível de arquivo:** SafeKit executa a replicação baseada em host no nível do arquivo, o que é completamente transparente para o aplicativo. Ele protege não apenas bancos de dados, mas todas as pastas e dados associados. Você pode replicar pastas existentes exatamente onde elas estão instaladas, mesmo no **disco do sistema**.
  * **IP Virtual Integrado (VIP):** Gerencia nativamente o IP do cluster no nível do kernel, eliminando a necessidade de configurações separadas **do MetalLB**.
  * **Failover e Failback Automáticos:** Dispara uma transição imediata para o nó secundário em caso de falha; assim que o nó primário estiver íntegro, SafeKit executa **a resincronização automática de dados** sem intervenção manual.
  * **Sobrecarga ultrabaixa:** SafeKit opera sem a pesada sobrecarga de gerenciamento de pods de armazenamento (CSI/Longhorn) e pods de rede (CNI/MetalLB) exigida pelas pilhas padrão, liberando RAM e CPU essenciais para seus aplicativos.
  * **Amigável para o generalista de TI:** substitui a complexa **infraestrutura YAML** para rede e armazenamento por uma **interface gráfica da web simples** e scripts de implantação automatizados, deixando você se concentrar apenas em seus aplicativos.


![Diagrama de arquitetura SafeKit para alta disponibilidade K3s de 2 nós, com IP virtual integrado, replicação em tempo real e failover automático.](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **Alta disponibilidade (HA) sem compartilhamento para clusters K3s de 2 nós**  


<a class="btn-quick-install" href="/pt-br/quick-install/safekit-quick-installation-guide-with-kubernetes/">⚡ Guia rápido de instalação de cluster Kubernetes HA ></a>
## Índice {#toc}

  * [Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade Kubernetes K3s?](#safekit-mirror-k3s-cluster)
  * [Como o cluster mirror SafeKit funciona com Kubernetes K3S?](#safekit-mirror-cluster)
  * [Limitações SafeKit de Alta Disponibilidade](#safekit-ha-limitations)
  * [Comparação: SafeKit vs. Stack K3s Padrão (MetalLB e Longhorn)](#safekit-k3s-ha-comparison)
  * [Guia em vídeo: Configurando um cluster HA mirror SafeKit](#videoguide-safekit-mirror-cluster)
  * [🔍 Explore SafeKit](#hub)


## Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade Kubernetes K3s? {#safekit-mirror-k3s-cluster}

### Como implementar alta disponibilidade para um cluster K3s Kubernetes de 2 nós? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

Você pode implementar alta disponibilidade (HA) para um cluster Kubernetes K3s de 2 nós usando o **módulo mirror k3s.safe SafeKit**. Essa solução permite implantar um ambiente redundante sem a necessidade de armazenamento NFS externo, um banco de dados de configuração externo dedicado ou conhecimento especializado Kubernetes.

### Por que usar o K3s para computação de borda e IoT? {#why-use-k3s-for-edge-and-iot-computing}

[O K3s](<https://k3s.io/>) é o motor Kubernetes preferido para **IoT e computação de borda** porque é uma distribuição leve e certificada, projetada para ambientes com recursos limitados. Ele simplifica a sobrecarga operacional do Kubernetes padrão, mantendo total compatibilidade.

### Quais são as principais características do módulo mirror k3s.safe? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

O módulo k3s.safe fornece uma pilha de alta disponibilidade (HA) abrangente para o K3s, implementando:

  * **Nós Ativos Duplos:** Executa 2 mestres/agentes K3s ativos simultaneamente para hospedar pods.
  * **Replicação de banco de dados:** Replicação em tempo real do banco de dados de configuração MariaDB entre os nós.
  * **Armazenamento persistente:** replicação de volumes persistentes por meio de um provisionador dinâmico de cliente NFS integrado (nfs-client).
  * **Continuidade da rede:** inclui um endereço IP virtual para acesso contínuo do cliente.
  * **Recuperação automatizada:** Suporte completo para failover e failback automáticos.


### Além do K3s, quais aplicações e ambientes SafeKit pode proteger? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit é uma solução versátil de alta disponibilidade **para Windows e Linux** que vai muito além cluster mirror K3s. Ele permite **replicação síncrona em tempo real** e failover automático para uma ampla gama de cargas de trabalho críticas, incluindo:

  * **Ambientes virtuais e físicos:** máquinas virtuais Hyper-V ou KVM completas.
  * **Orquestração de Contêineres:** Ambientes Docker e Podman.
  * **Dados e Serviços:** Diretórios de arquivos individuais, serviços e vários bancos de dados.
  * **Infraestrutura em nuvem:** alta disponibilidade para aplicações em nuvem.


SafeKit também oferece aos **clusters <span class="notranslate farm-term" translate="no">farm</span>** **balanceamento de carga de rede nativo e failover** para aplicações sem estado, como **servidores web**.

💡 [Explore a lista completa de soluções de alta disponibilidade compatíveis aqui.](</pt-br/solutions/>)

### Como SafeKit garante a alta disponibilidade do K3s? {#safekit-k3s-architecture-table}

**Arquitetura e Lógica de Redundância para um Cluster K3s de 2 Nós usando SafeKit**

Cluster K3s de 2 nós | SafeKit PRIM (Nó Principal) | SafeKit SECOND (Nó Secundário)  
---|---|---  
Execução da Carga de Trabalho | Os serviços mestre e agente do K3s estão ativos, gerenciando a orquestração do cluster e executando os pods. | Os serviços de master e agente do K3s permanecem ativos, proporcionando processamento paralelo e alta disponibilidade.  
Armazenamento NFS e PVs |  • IP virtual do host e porta NFS <br> • Gerencia os compartilhamentos NFS exportados ativos <br> • Armazena volumes persistentes (PVs) do K3s  | Espelhamento Síncrono: SafeKit replica todos os volumes persistentes em tempo real para garantir a perda zero de dados.  
Base de Dados de Configuração |  • IP virtual do host e porta MariaDB <br> • Gerencia o banco de dados de configuração ativo do K3s  | Replicação de banco de dados: o banco de dados MariaDB é espelhado de forma síncrona, preservando o estado do cluster para o failover.  
  
**Mecanismo de Failover Automático:** No caso de uma falha no nó primário, SafeKit migra automaticamente os IPs virtuais e os serviços de armazenamento para o nó secundário, garantindo o serviço ininterrupto para o cluster K3s.

## Como o cluster mirror SafeKit funciona com Kubernetes K3S? {#safekit-mirror-cluster}

### Passo 1: Replicação de arquivos em nível de byte em um cluster mirror {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Esta etapa ilustra a arquitetura de alta disponibilidade entre **o Servidor 1 (PRIM)** e **o Servidor 2 (SECOND)**. Ambos os servidores executam os componentes mestre e agente do K3s, conforme definido na [tabela de arquitetura](#safekit-k3s-architecture-table).


![Replicação de arquivos em nível de byte em um cluster mirror Kubernetes K3s](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Atualmente, o **IP Virtual (VIP)**, **o armazenamento persistente NFS** e **MariaDB** estão ativos apenas no Servidor 1 (PRIM). Os componentes principais do K3s em ambos os nós sincronizam entre si acessando o estado do cluster por meio do IP Virtual e da porta MariaDB. SafeKit implementa [a replicação síncrona](</pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/>) do MariaDB e dos arquivos NFS persistentes, garantindo **zero perda de dados (RPO = 0)** em caso de falha.

Os mestres do K3s distribuem a carga de trabalho entre os nós (ou mais) comunicando-se diretamente com os agentes do K3s. Os clientes externos conectam-se ao  
[endereço IP virtual do cluster](</pt-br/best-practises/how-a-virtual-ip-address-works/>) no nó PRIM. Usando mecanismos padrão Kubernetes, o mestre do K3s retransmite o tráfego para pods distribuídos pelos nós. Da mesma forma, os pods acessam seus **volumes persistentes (PVs)** no servidor PRIM por meio do IP virtual e da porta NFS.

### Passo 2: Failover automático e continuidade do serviço {#step-2-automatic-failover-and-service-continuity}

Quando **o Servidor 1 (PRIM)** falha, **o Servidor 2 (SECOND)** assume automaticamente as operações do cluster para garantir a continuidade.


![Failover em um cluster mirror Kubernetes K3S](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit detecta a falha e migra imediatamente o **endereço IP virtual** do cluster para o Servidor 2. Em seguida, ele promove os **serviços** locais **MariaDB** e do NFS para um estado ativo. Devido à replicação síncrona realizada na Etapa 1, todos os bancos de dados MariaDB e os arquivos de Volume Persistente (PV) do NFS já estão atualizados no Servidor 2, garantindo a perda zero de dados.

Com o estado do cluster preservado, o **K3s Master** no Servidor 2 continua a execução. Ele detecta a perda do agente do Servidor 1 e reagenda automaticamente os pods afetados nos agentes K3s ativos restantes. O tempo total de failover (RTO) é a soma do intervalo de detecção de falhas (padrão: 30 segundos) e o tempo necessário para os componentes K3s inicializarem no nó secundário.

Enquanto o Servidor 1 estiver offline, os serviços MariaDB e NFS continuarão a ser executados no Servidor 2, gravando as alterações apenas localmente.  


### Etapa 3: Failback e reintegração automática {#step-3-failback-and-automatic-reintegration}

**O failback** ocorre quando o Servidor 1 é reiniciado após a resolução do problema inicial. SafeKit resincroniza automaticamente os arquivos MariaDB e NFS, atualizando apenas os dados modificados no Servidor 2 durante o tempo de inatividade. Esse processo de reintegração **não é disruptivo** ; os componentes mestre e agente do K3s continuam a ser executados no Servidor 2 sem interrupção. 


![Ressincronização automática e failback em um cluster mirror K3s](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit otimiza o tempo de recuperação com base na forma como o servidor foi parado: 

  * **Desligamento Limpo:** Se SafeKit foi interrompido intencionalmente no Servidor 1, apenas as zonas específicas modificadas dentro dos arquivos são resincronizadas usando **bitmaps de rastreamento de modificação**. Isso garante uma reintegração ultrarrápida. 
  * **Falha do sistema (por exemplo, falha de energia):** se o Servidor 1 sofrer um desligamento incorreto, os bitmaps de modificação são ignorados por segurança. SafeKit em vez disso, resincroniza todos os arquivos com um carimbo de data/hora de modificação mais recente do que o último ponto de sincronização estabelecido, garantindo **a integridade total dos dados**. 


### Passo 4: Restaurando a alta disponibilidade e a distribuição de carga {#step-4-restoring-high-availability-and-load-distribution}

Após a reintegração, o cluster retorna ao **modo mirror completo**, espelhando o estado descrito na Etapa 1. O sistema está novamente em um estado de alta disponibilidade: os serviços **MariaDB** e **NFS** permanecem ativos no Servidor 2, enquanto SafeKit executa a replicação em tempo real de todas as atualizações de arquivos de volta para o Servidor 1. 


![Retornar à operação normal em um cluster mirror Kubernetes K3s](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

O **K3s Master** e **o K3s Agent** são reiniciados automaticamente no Servidor 1. O agendador Kubernetes agora reconhece o Servidor 1 como um nó íntegro e pode começar a reagendar pods para distribuir a carga de trabalho em ambos os servidores. 

Se o administrador preferir que os serviços MariaDB e NFS sejam executados no Servidor 1 (restaurando a função PRIM original), uma **mudança** pode ser acionada manualmente através do console da web em um momento conveniente ou automatizada através das configurações. 

### Como configurar um cluster mirror SafeKit? {#safekit-mirror-cluster-configure}


![Console Web SafeKit: painel de configuração de alta disponibilidade mostrando redes de pulsações, configuração de IP virtual e replicação de diretório em tempo real para um cluster mirror.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


O **console da web SafeKit** fornece uma interface intuitiva para orquestrar alta disponibilidade para seus aplicativos críticos. Em apenas algumas etapas, você pode configurar um **cluster mirror SafeKit** para garantir a continuidade dos negócios:

  * **Failover de Aplicativo (Guia Macros):** Defina os serviços de aplicativo específicos a serem reiniciados automaticamente em caso de falha.
  * **Rede(s) de pulsações:** Caminho(s) de comunicação dedicado(s) usado(s) pelos nós do cluster para monitorar continuamente a integridade e a disponibilidade um do outro e sincronizar as decisões de failover.
  * **Gerenciamento de IP virtual:** configure o IP virtual (VIP) para reconexão transparente do cliente após uma falha.
  * **Replicação em tempo real:** selecione os diretórios críticos para replicação síncrona em nível de byte baseada no host.
  * **Verificadores:** Monitore a integridade do aplicativo e acione a recuperação automática se for detectada uma falha no processo.


O cluster SafeKit inclui um verificador de divisão de rede dedicado para resolver problemas de isolamento de rede sem a necessidade de uma terceira máquina testemunha ou de uma rede de pulsações adicional. Saiba mais sobre [pulsações, failover e quórum em um cluster](</pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Como monitorar um cluster mirror SafeKit? {#safekit-mirror-cluster-monitoring}


![Console Web SafeKit: Monitoramento em tempo real de um cluster mirror de 2 nós, mostrando os estados PRIM e SECOND com replicação de dados ativa.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


O **console de gerenciamento SafeKit** oferece uma visão unificada da sua infraestrutura de alta disponibilidade. Ele permite que os administradores monitorem o **estado operacional** do cluster e acompanhem a sincronização de dados em tempo real.

Para um cluster mirror de 2 nós, o console exibe claramente as funções de cada servidor:

  * **PRIM (Primário):** O nó ativo que executa atualmente o aplicativo e gerencia o IP virtual. Ele executa gravações no armazenamento local e replicação em tempo real para o nó secundário.
  * **SECOND:** O nó de espera recebe atualizações síncronas em nível de byte. Ele está pronto para assumir o controle instantaneamente se o primário falhar.
  * **ALONE Estado:** Alerta visualmente quando o cluster está sendo executado em um único nó (por exemplo, durante a manutenção ou após uma falha), indicando que a redundância foi temporariamente perdida.
  * **Progresso da resincronização:** quando um nó com falha é recuperado, seu status fica laranja durante a reintegração de dados em segundo plano, garantindo que não haja tempo de inatividade durante a fase de "retorno ao normal".


Além de ícones de status simples, a interface fornece **orquestração de failover com um clique**, permitindo que você reatribua manualmente a função primária para manutenção planejada, garantindo a disponibilidade contínua para a atividade do usuário.


{{%  insert-safekit-usage-pt-br  %}}
 

## Comparação: SafeKit vs. Stack K3s Padrão (MetalLB e Longhorn) {#safekit-k3s-ha-comparison}

**Comparação: SafeKit vs. Open-Source Padrão (MetalLB + Longhorn)**

Capacidade | SafeKit (K3s.safe) | MetalLB + Longhorn (K8s Padrão)  
---|---|---  
Arquitetura | Tudo em um só: rede integrada, replicação e failover em um único pacote. | Stack DIY (Faça você mesmo): Vários pacotes independentes necessários (CNI, CSI, LoadBalancer).  
Eficiência do Hardware | HA puro de 2 nós: redundância total sem um terceiro nó "testemunha" ou árbitro. | Mínimo de 3 nós: Normalmente, são necessários números ímpares para o quórum do Etcd e a segurança do armazenamento.  
Networking (VIP) | Nativo: IP virtual gerenciado no nível do SO; transparente para o K3s. | Complexo: Requer a instalação do MetalLB com configuração L2 ou BGP usando pods de alto-falante dedicados que consomem CPU/RAM em cada nó.  
Requisitos de Armazenamento | Síncrono em nível de byte: replicação de arquivos em tempo real de diretórios existentes; funciona em discos de sistema padrão; replicação de arquivos em nível de byte com sobrecarga mínima de CPU/rede. | Nível de bloco: Armazenamento de blocos distribuído (Longhorn) usando pods de armazenamento dedicados; maior consumo de recursos.  
Inteligência de Failover | Estabilidade independente: SafeKit opera fora do tempo de execução do contêiner. Ele monitora o SO e o hardware diretamente, garantindo o failover mesmo se o plano de controle Kubernetes ou o mecanismo de contêiner travar. | Dependência Circular: A lógica de failover é hospedada *dentro* dos pods que ela deve proteger. Se o sistema operacional do host ou o mecanismo K3s travar, os pods de gerenciamento (MetalLB/Longhorn) também congelam, muitas vezes exigindo uma triagem manual para quebrar o "bloqueio"  
Administração | Simplificado: Gerenciável por meio de um único console da web; não é necessário um especialista Kubernetes. | Especializado: Requer conhecimento aprofundado de YAML, Helm e controladores internos do K8s.  
  
**Em resumo**, enquanto uma pilha padrão de "faça você mesmo" (MetalLB + Longhorn) oferece modularidade para especialistas Kubernetes, ela cria uma **dependência circular** em que as ferramentas de armazenamento e rede são vulneráveis às mesmas falhas de nó que elas foram projetadas para gerenciar. **SafeKit** quebra esse ciclo operando como uma camada de infraestrutura independente; ele fornece uma solução de alta disponibilidade (HA) de 2 nós mais robusta e independente de hardware, que permanece operacional mesmo se o mecanismo Kubernetes ou o sistema operacional do host travar. Isso garante recuperação automatizada e integridade dos dados sem a pesada sobrecarga de recursos, o quórum obrigatório de três nós ou a complexidade de configuração exigida pelos sistemas tradicionais de armazenamento em bloco distribuído e sobreposições de rede.

## Guia em vídeo: Configurando um cluster mirror de alta disponibilidade com o SafeKit {#videoguide-safekit-mirror-cluster}

### Vídeo SafeKit: Agrupamento em nível de aplicativo (8:47) {#demo-mirror-ha-cluster}

Embora este vídeo demonstre a alta disponibilidade do SafeKit para Microsoft SQL Server, ele oferece uma excelente visão geral de como a solução protege os ambientes K3s. SafeKit funciona de forma idêntica para qualquer outro banco de dados ou aplicativo de missão crítica.

### Destaques do vídeo {#video-highlights}

  1. 🎬 [2 nós com SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Configure o cluster e o módulo mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [Inicie e teste a replicação, migração e failover do SQL em caso de falha](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}