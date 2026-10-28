---
title: "Software de clusterização ativo-ativo com replicação em tempo real e failover mútuo."
canonical: "https://safekit.eviden.com/pt-br/architectures/active-active-cluster-real-time-replication/"
description: "Maximize a utilização de recursos com o cluster ativo-ativo SafeKit . Implemente failover mútuo entre dois servidores usando replicação síncrona em tempo real e múltiplos módulos mirror . Garanta zero perda de dados (RPO=0) e recuperação automática para Windows e Linux sem a necessidade de uma SAN. Baixe a versão de avaliação gratuita."
category: "architectures"
lang: "pt-br"
topics: "Como funciona o cluster ativo-ativo com replicação em tempo real?, 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Software de clusterização ativo-ativo com replicação em tempo real e failover mútuo {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Como funciona o cluster ativo-ativo com replicação em tempo real? {#how-the-active-active-cluster-with-real-time-replication-works}

### Cluster ativo-ativo com replicação em tempo real {#active--active-cluster-with-real-time-replication}

Os aplicativos estão sendo executados em dois servidores com failover mútuo. Cada servidor é um backup do outro. E cada aplicativo funciona em seus próprios diretórios de arquivos replicados.


![ SafeKit cluster ativo ativo com replicação em tempo real ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Se um servidor falhar em um cluster ativo-ativo, todos os aplicativos continuarão ativos no mesmo servidor. Após a reinicialização do servidor com falha, os aplicativos voltarão a ser executados em seu servidor primário padrão.

### Como funciona? {#how-it-works}

O cluster ativo-ativo SafeKit é configurado de forma simples através da implantação de dois módulos mirror com replicação em tempo real. Cada módulo mirror contém sua própria configuração de endereço IP virtual, diretórios replicados em tempo real e scripts de reinicialização.

Observe que:

  * Os dois aplicativos, Appli1 e Appli2, devem ser instalados em cada servidor para garantir o failover do aplicativo.
  * Essa arquitetura não se limita a 2 aplicações: N módulos de aplicação podem ser implantados em 2 servidores, com um máximo de 25 módulos.
  * Cada módulo mirror terá seu próprio endereço IP virtual, seus próprios diretórios de arquivos replicados e seus próprios scripts de recuperação.


### Exemplo de um cluster ativo-ativo {#example-of-an-active-active-cluster}

A solução 💡 [ Hyper-V ](</pt-br/solutions/hyper-v-replication-automatic-failover-load-balancing/>) ou 💡 [ KVM ](</pt-br/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) com replicação, failover automático e balanceamento de carga de VMs é um exemplo de um cluster ativo-ativo com N módulos mirror replicando N máquinas virtuais entre dois servidores físicos.

Nessa configuração, um módulo mirror replica uma máquina virtual completa e a reinicia em caso de falha. 

Não existe endereço IP virtual nesse módulo porque reiniciar uma máquina virtual em um servidor realiza automaticamente a transferência do endereço IP físico da máquina virtual. 

E, nessa arquitetura, um aplicativo crítico é instalado dentro de uma máquina virtual.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}