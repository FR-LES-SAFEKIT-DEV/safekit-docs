---
title: "Kubernetes K3s Alta Disponibilidade: Replicação Síncrona e Failover em 2 Nós"
canonical: "https://safekit.eviden.com/pt-pt/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Obtenha alta disponibilidade do K3s em 2 nós sem armazenamento externo ou quórum etcd. Saiba como SafeKit oferece replicação sem perda de dados e failover automático."
category: "solutions"
lang: "pt-pt"
topics: "Simplificando a Alta Disponibilidade (HA) do K3s: Porquê escolher SafeKit em vez do MetalLB e do Longhorn?, Índice, Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade Kubernetes K3s?, Como funciona o cluster mirror SafeKit com Kubernetes K3S?, Limitações de Alta Disponibilidade SafeKit, Comparação: SafeKit vs. Stack K3s Padrão (MetalLB & Longhorn), Guia em Vídeo: Configuração de um cluster mirror HA SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.8 | Translation LLM | 23 expressions"
---

# Kubernetes K3s Alta Disponibilidade: Replicação Síncrona e Failover em 2 Nós {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## Simplificando a Alta Disponibilidade (HA) do K3s: Porquê escolher SafeKit em vez do MetalLB e do Longhorn? {#safekit-k3s-ha-introduction}

Embora a pilha padrão de código aberto (MetalLB + Longhorn) para K3s seja poderosa para grandes centros de dados, ela introduz uma complexidade excessiva para locais com 2 nós. **SafeKit** simplifica o ambiente K3s, substituindo ferramentas de rede e armazenamento autónomas por um único motor de alta disponibilidade consolidado. 

### Por que usar SafeKit para alta disponibilidade (HA) de K3s com 2 nós? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **Verdadeira Alta Disponibilidade de 2 Nós:** SafeKit oferece redundância total com apenas **2 nós**, eliminando a necessidade de 3 nós para o quórum *do etcd*.
  * **Perda de dados zero (RPO = 0):** Substitui o armazenamento em bloco de alta sobrecarga por **replicação síncrona ao nível de byte** para desempenho de SSD local.
  * **Proteção flexível ao nível de ficheiros:** SafeKit executa a replicação baseada no anfitrião ao nível de ficheiros, o que é completamente transparente para a aplicação. Protege não só as bases de dados, mas também todas as pastas e dados associados. Pode replicar as pastas existentes exatamente onde estão instaladas, mesmo no **disco do sistema**.
  * **IP Virtual Integrado (VIP):** Gerencia nativamente o IP do cluster ao nível do kernel, eliminando a necessidade de configurações separadas **do MetalLB**.
  * **Failover e Failback Automáticos:** Acionam uma transição imediata para o nó secundário em caso de falha; assim que o nó primário estiver operacional, SafeKit executa **a resincronização automática de dados** sem intervenção manual.
  * **Overhead ultrabaixo:** SafeKit opera sem o pesado overhead de gestão de pods de armazenamento (CSI/Longhorn) e pods de rede (CNI/MetalLB) exigidos pelas pilhas padrão, libertando RAM e CPU críticas para as suas aplicações.
  * **Amigável para o técnico de TI generalista:** Substitui a complexa **infraestrutura YAML** para rede e armazenamento por uma **interface gráfica web simples** e scripts de implementação automatizados, permitindo que se concentre apenas nas suas aplicações.


![Diagrama de arquitetura SafeKit para alta disponibilidade K3s de 2 nós, com IP virtual integrado, replicação em tempo real e failover automático.](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **Alta disponibilidade (HA) sem partilha de recursos para clusters K3s de 2 nós**  


<a class="btn-quick-install" href="/pt-pt/quick-install/safekit-quick-installation-guide-with-kubernetes/">⚡ Guia rápido de instalação de um cluster Kubernetes HA ></a>
## Índice {#toc}

  * [Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade Kubernetes K3s?](#safekit-mirror-k3s-cluster)
  * [Como funciona o cluster mirror SafeKit com Kubernetes K3S?](#safekit-mirror-cluster)
  * [Limitações de Alta Disponibilidade SafeKit](#safekit-ha-limitations)
  * [Comparação: SafeKit vs. Stack K3s Padrão (MetalLB & Longhorn)](#safekit-k3s-ha-comparison)
  * [Guia em Vídeo: Configuração de um cluster HA mirror SafeKit](#videoguide-safekit-mirror-cluster)
  * [🔍 Explore SafeKit](#hub)


## Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade Kubernetes K3s? {#safekit-mirror-k3s-cluster}

### Como implemento alta disponibilidade para um cluster Kubernetes K3s de 2 nós? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

É possível implementar alta disponibilidade (HA) para um cluster Kubernetes K3s de 2 nós utilizando o **módulo mirror k3s.safe SafeKit**. Esta solução permite implementar um ambiente redundante sem a necessidade de armazenamento NFS externo, uma base de dados de configuração externa dedicada ou conhecimentos especializados Kubernetes.

### Por que usar o K3s para computação de ponta e IoT? {#why-use-k3s-for-edge-and-iot-computing}

[O K3s](<https://k3s.io/>) é o motor Kubernetes preferido para **IoT e computação de ponta (Edge computing)** porque é uma distribuição leve e certificada, concebida para ambientes com recursos limitados. Simplifica a sobrecarga operacional do Kubernetes padrão, mantendo a compatibilidade total.

### Quais são as principais características do módulo mirror k3s.safe? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

O módulo k3s.safe fornece uma pilha de alta disponibilidade abrangente para o K3s, implementando:

  * **Nós Ativos Duplos:** Executa 2 mestres/agentes K3s ativos em simultâneo para alojar pods.
  * **Replicação de Base de Dados:** Replicação em tempo real da base de dados de configuração MariaDB entre nós.
  * **Armazenamento Persistente:** Replicação de volumes persistentes através de um provisionador dinâmico de cliente NFS integrado (nfs-client).
  * **Continuidade da Rede:** Inclui um endereço IP virtual para acesso contínuo do cliente.
  * **Recuperação Automatizada:** Suporte completo para comutação automática de contingência e retorno à condição normal.


### Além do K3s, que aplicações e ambientes SafeKit pode proteger? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit é uma solução versátil de alta disponibilidade **para Windows e Linux** que vai muito além cluster mirror K3s. Permite **replicação síncrona em tempo real** e failover automático para uma vasta gama de cargas de trabalho críticas, incluindo:

  * **Ambientes Virtuais e Físicos:** Máquinas virtuais Hyper-V ou KVM completas.
  * **Orquestração de contentores:** ambientes Docker, Podman.
  * **Dados e Serviços:** Diretórios de ficheiros individuais, serviços e várias bases de dados.
  * **Infraestrutura em Nuvem:** Alta disponibilidade para aplicações em nuvem.


SafeKit também oferece aos **clusters <span class="notranslate farm-term" translate="no">farm</span>** **balanceamento de carga de rede nativo e failover** para aplicações sem estado como **servidores web**.

💡 [Explore a lista completa de soluções de alta disponibilidade suportadas aqui.](</pt-pt/solutions/>)

### Como SafeKit consegue a alta disponibilidade do K3s? {#safekit-k3s-architecture-table}

**Arquitetura e Lógica de Redundância para um Cluster K3s de 2 Nós usando SafeKit**

Cluster K3s de 2 Nós | SafeKit PRIM (Nó Principal) | SafeKit SECOND (Nó Secundário)  
---|---|---  
Execução da Carga de Trabalho | Os serviços do K3s (master e agent) estão ativos, a gerir a orquestração do cluster e a executar os pods. | Os serviços de mestre e agente do K3s permanecem ativos, proporcionando processamento paralelo e alta disponibilidade.  
Armazenamento NFS e Volumes Persistentes |  • Alojamento de IP virtual e porta NFS <br> • Gerencia as partilhas NFS exportadas ativas <br> • Armazena os Volumes Persistentes (PVs) do K3s  | Replicação Síncrona: SafeKit replica todos os volumes persistentes em tempo real para garantir a perda zero de dados.  
Base de Dados de Configuração |  • Alojamento de IP virtual e porta MariaDB <br> • Gerencia a base de dados de configuração ativa do K3s  | Replicação da Base de Dados: A base de dados MariaDB é espelhada de forma síncrona, preservando o estado do cluster para o failover.  
  
**Mecanismo de Failover Automático:** Em caso de falha do nó primário, SafeKit migra automaticamente os IPs virtuais e os serviços de armazenamento para o nó secundário, garantindo um serviço ininterrupto para o cluster K3s.

## Como funciona o cluster mirror SafeKit com Kubernetes K3S? {#safekit-mirror-cluster}

### Passo 1: Replicação de Ficheiros ao Nível de Byte num cluster mirror {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Esta fase ilustra a arquitetura de alta disponibilidade entre **o Servidor 1 (PRIM)** e **o Servidor 2 (SECOND)**. Ambos os servidores executam os componentes mestre e agente do K3s, conforme definido na [tabela de arquitetura](#safekit-k3s-architecture-table).


![Replicação de ficheiros ao nível de byte num cluster mirror Kubernetes K3s](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Atualmente, o **IP Virtual (VIP)**, **o armazenamento persistente NFS** e **MariaDB** estão ativos apenas no Servidor 1 (PRIM). Os componentes principais do K3s em ambos os nós sincronizam-se entre si acedendo ao estado do cluster através do IP Virtual e da porta MariaDB. SafeKit implementa [a replicação síncrona](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>) do MariaDB e dos ficheiros NFS persistentes, garantindo **zero perda de dados (RPO = 0)** em caso de falha.

Os mestres do K3s distribuem a carga de trabalho por ambos os nós (ou mais) comunicando diretamente com os agentes do K3s. Os clientes externos ligam-se ao  
[endereço IP virtual do cluster](</pt-pt/best-practises/how-a-virtual-ip-address-works/>) no nó PRIM. Utilizando mecanismos padrão Kubernetes, o mestre do K3s reencaminha o tráfego para pods distribuídos pelos nós. Da mesma forma, os pods acedem aos seus **volumes persistentes (PVs)** no servidor PRIM através do IP virtual e da porta NFS.

### Passo 2: Reposição Automática em Caso de Falha e Continuidade do Serviço {#step-2-automatic-failover-and-service-continuity}

Quando **o Servidor 1 (PRIM)** falha, **o Servidor 2 (SECOND)** assume automaticamente as operações do cluster para garantir a continuidade.


![Failover num cluster mirror Kubernetes K3S](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit deteta a falha e migra imediatamente o **endereço IP virtual** do cluster para o Servidor 2. Em seguida, promove os **serviços** locais **MariaDB** e NFS para um estado ativo. Devido à replicação síncrona realizada no Passo 1, todas as bases de dados MariaDB e os ficheiros de Volume Persistente (PV) NFS já estão atualizados no Servidor 2, garantindo a perda zero de dados.

Com o estado do cluster preservado, o **K3s Master** no Servidor 2 continua a execução. Ele deteta a perda do agente do Servidor 1 e reagenda automaticamente os pods afetados para os agentes K3s ativos restantes. O tempo total de recuperação (RTO) é a soma do intervalo de deteção de falhas (padrão: 30 segundos) e o tempo necessário para que os componentes K3s inicializem no nó secundário.

Enquanto o Servidor 1 estiver offline, os serviços MariaDB e NFS continuam a ser executados no Servidor 2, registando as alterações apenas localmente.  


### Passo 3: Recuperação de Falhas e Reintegração Automática {#step-3-failback-and-automatic-reintegration}

**A recuperação** ocorre quando o Servidor 1 é reiniciado após a resolução do problema inicial. SafeKit resincroniza automaticamente os ficheiros MariaDB e NFS, atualizando apenas os dados modificados no Servidor 2 durante o tempo de inatividade. Este processo de reintegração **não é disruptivo** ; os componentes mestre e agente do K3s continuam a ser executados no Servidor 2 sem interrupção. 


![Ressincronização automática e recuperação de falhas num cluster mirror K3s](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit otimiza o tempo de recuperação com base na forma como o servidor foi parado: 

  * **Desligamento Limpo:** Se SafeKit foi parado intencionalmente no Servidor 1, apenas as zonas específicas modificadas dentro dos ficheiros são resincronizadas usando **mapas de bits de rastreamento de modificações**. Isto garante uma reintegração ultrarrápida. 
  * **Falha do Sistema (por exemplo, Falha de Energia):** Se o Servidor 1 sofreu um encerramento forçado, os mapas de bits de modificação são ignorados por segurança. SafeKit em vez disso, resincroniza todos os ficheiros com um carimbo de data/hora de modificação mais recente do que o último ponto de sincronização estabelecido, garantindo **a integridade total dos dados**. 


### Passo 4: Restaurar a Alta Disponibilidade e a Distribuição de Carga {#step-4-restoring-high-availability-and-load-distribution}

Após a reintegração, o cluster volta ao **modo mirror completo**, espelhando o estado descrito no Passo 1. O sistema está novamente num estado de alta disponibilidade: os serviços **MariaDB** e **NFS** permanecem ativos no Servidor 2, enquanto SafeKit executa a replicação em tempo real de todas as atualizações de ficheiros de volta para o Servidor 1. 


![Retorno à operação normal num cluster mirror Kubernetes K3s](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

O **K3s Master** e **o K3s Agent** são reiniciados automaticamente no Servidor 1. O agendador Kubernetes reconhece agora o Servidor 1 como um nó íntegro e pode começar a reagendar os pods para distribuir a carga de trabalho por ambos os servidores. 

Se o administrador preferir que os serviços MariaDB e NFS sejam executados no Servidor 1 (restaurando a função PRIM original), uma **mudança** pode ser acionada manualmente através da consola web num momento conveniente ou automatizada através das definições de configuração. 

### Como configurar um cluster mirror SafeKit? {#safekit-mirror-cluster-configure}


![Consola Web SafeKit: Painel de configuração de alta disponibilidade que mostra redes de pulsações, configuração de IP virtual e replicação de diretórios em tempo real para um cluster mirror.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


A **consola web SafeKit** oferece uma interface intuitiva para orquestrar a alta disponibilidade das suas aplicações críticas. Em apenas alguns passos, pode configurar um **cluster mirror SafeKit** para garantir a continuidade do negócio:

  * **Failover da Aplicação (Separador Macros):** Defina os serviços específicos da aplicação a serem reiniciados automaticamente em caso de falha.
  * **Rede(s) de pulsações:** Caminho(s) de comunicação dedicado(s) utilizado(s) pelos nós do cluster para monitorizar continuamente a integridade e a disponibilidade uns dos outros e para sincronizar as decisões de failover.
  * **Gestão de IP Virtual:** Configure o IP Virtual (VIP) para uma reconexão transparente do cliente após uma falha.
  * **Replicação em Tempo Real:** Selecione os diretórios críticos para replicação síncrona ao nível de byte, baseada no anfitrião.
  * **Verificadores:** Monitorize o estado da aplicação e acione a recuperação automática se for detetada uma falha no processo.


O cluster SafeKit inclui um verificador dedicado de "split-brain" para resolver problemas de isolamento de rede sem a necessidade de uma terceira máquina testemunha ou de uma rede adicional de "heartbeat". Saiba mais sobre ["heartbeat", "failover" e "quorum" num cluster](</pt-pt/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Como monitorizar um cluster mirror SafeKit? {#safekit-mirror-cluster-monitoring}


![Consola Web SafeKit: Monitorização em tempo real de um cluster mirror 2 nós, mostrando os estados PRIM e SECOND com replicação de dados ativa.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


A **consola de gestão SafeKit** oferece uma visão unificada da sua infraestrutura de alta disponibilidade. Permite aos administradores monitorizar o **estado operacional** do cluster e acompanhar a sincronização de dados em tempo real.

Para um cluster mirror de 2 nós, a consola exibe claramente as funções de cada servidor:

  * **PRIM (Primário):** O nó ativo que executa atualmente a aplicação e gere o IP Virtual. Executa escritas no armazenamento local e replicação em tempo real para o nó secundário.
  * **SECOND:** O nó de reserva recebe atualizações síncronas ao nível de byte. Está pronto para assumir o controlo instantaneamente se o Primário falhar.
  * **ALONE Estado:** Alerta visualmente quando o cluster está a ser executado num único nó (por exemplo, durante a manutenção ou após uma falha), indicando que a redundância foi temporariamente perdida.
  * **Progresso da Ressincronização:** Quando um nó que falhou recupera, o seu estado fica laranja durante a reintegração de dados em segundo plano, garantindo que não haja tempo de inatividade durante a fase de "regresso ao normal".


Além de simples ícones de estado, a interface oferece **orquestração de failover com um clique**, permitindo reatribuir manualmente a função primária para manutenção planeada, garantindo simultaneamente a disponibilidade contínua para a atividade do utilizador.


{{%  insert-safekit-usage-pt-pt  %}}
 

## Comparação: SafeKit vs. Stack K3s Padrão (MetalLB & Longhorn) {#safekit-k3s-ha-comparison}

**Comparação: SafeKit vs. Solução Padrão de Código Aberto (MetalLB + Longhorn)**

Capacidade | SafeKit (K3s.safe) | MetalLB + Longhorn (K8s Padrão)  
---|---|---  
Arquitetura | Tudo-em-Um: Rede integrada, replicação e redundância num único pacote. | Pilha DIY (Faça Você Mesmo): Requer vários pacotes independentes (CNI, CSI, LoadBalancer).  
Eficiência do Hardware | HA puro de 2 nós: Redundância total sem um 3º nó "testemunha" ou árbitro. | Mínimo de 3 nós: Normalmente, são necessários números ímpares para o quórum do Etcd e para a segurança do armazenamento.  
Networking (VIP) | Nativo: IP virtual gerido ao nível do sistema operativo; transparente para o K3s. | Complexo: Requer a instalação do MetalLB com configuração L2 ou BGP, utilizando pods de orador dedicados que consomem CPU/RAM em cada nó.  
Requisitos de Armazenamento | Sincronização ao nível de byte: Replicação de ficheiros em tempo real de diretórios existentes; funciona em discos de sistema padrão; replicação de ficheiros ao nível de byte com sobrecarga mínima de CPU/rede. | Nível de Bloco: Armazenamento de blocos distribuído (Longhorn) utilizando pods de armazenamento dedicados; maior consumo de recursos.  
Inteligência de Failover | Estabilidade Independente: SafeKit opera fora do ambiente de execução de contentores. Monitoriza diretamente o sistema operativo e o hardware, garantindo a redundância mesmo que o plano de controlo Kubernetes ou o motor de contentores bloqueie. | Dependência Circular: A lógica de failover está alojada *dentro* dos pods que se destina a proteger. Se o sistema operativo anfitrião ou o motor K3s ficarem bloqueados, os pods de gestão (MetalLB/Longhorn) também congelam, exigindo frequentemente uma intervenção manual para quebrar o "bloqueio"  
Administração | Simplificado: Gerível através de uma única consola web; não é necessário um especialista Kubernetes. | Especializado: Requer conhecimento aprofundado de YAML, Helm e controladores internos do K8s.  
  
**Em resumo**, enquanto uma configuração DIY padrão (MetalLB + Longhorn) oferece modularidade para especialistas Kubernetes, ela cria uma **dependência circular** onde as ferramentas de armazenamento e rede são vulneráveis às mesmas falhas de nó que foram projetadas para gerir. **SafeKit** quebra este ciclo ao operar como uma camada de infraestrutura independente; ele fornece uma solução de alta disponibilidade (HA) de 2 nós mais robusta e agnóstica ao hardware, que permanece operacional mesmo que o motor Kubernetes ou o sistema operativo anfitrião congelem. Isto garante recuperação automatizada e integridade dos dados sem a pesada sobrecarga de recursos, o quórum obrigatório de três nós ou a complexidade de configuração exigida pelo armazenamento de blocos distribuído tradicional e pelas sobreposições de rede.

## Guia em Vídeo: Configuração de um cluster mirror HA SafeKit {#videoguide-safekit-mirror-cluster}

### Vídeo SafeKit: Agrupamento a nível de aplicação (8:47) {#demo-mirror-ha-cluster}

Embora este vídeo demonstre a alta disponibilidade do SafeKit para Microsoft SQL Server, ele fornece uma excelente visão geral de como a solução protege os ambientes K3s. SafeKit funciona de forma idêntica para qualquer outro banco de dados ou aplicação de missão crítica.

### Destaques do Vídeo {#video-highlights}

  1. 🎬 [2 nós com SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Configure o cluster e o módulo mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [Iniciar e testar a replicação, migração e failover do SQL em caso de falha](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}