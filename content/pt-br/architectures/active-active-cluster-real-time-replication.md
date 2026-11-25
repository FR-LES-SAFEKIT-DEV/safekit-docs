---
title: "Software de Cluster Ativo-Ativo com Replicação em Tempo Real e failover Mútuo"
canonical: "https://safekit.eviden.com/pt-br/architectures/active-active-cluster-real-time-replication/"
description: "Maximize a utilização de recursos com o clustering ativo-ativo SafeKit. Implemente failover mútuo entre dois servidores usando replicação síncrona em tempo real e vários módulos mirror. Garanta zero perda de dados (RPO = 0) e recuperação automática para Windows e Linux sem uma SAN. Baixe a versão de avaliação gratuita."
category: "architectures"
lang: "pt-br"
topics: "Como funciona um cluster ativo-ativo com replicação em tempo real?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
---

# Software de Cluster Ativo-Ativo com Replicação em Tempo Real e failover Mútuo {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Como funciona um cluster ativo-ativo com replicação em tempo real? {#how-the-active-active-cluster-with-real-time-replication-works}

### Cluster Ativo-Ativo com Replicação em Tempo Real {#active--active-cluster-with-real-time-replication}

Dois servidores executam aplicativos e fazem backup um do outro. Isso é chamado de failover mútuo: cada servidor é o backup do outro servidor. Cada aplicativo usa seus próprios diretórios de arquivos replicados.


![Cluster ativo-ativo SafeKit com replicação em tempo real](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Se um servidor falhar em um cluster ativo-ativo, todos os aplicativos serão executados no servidor restante. Quando o servidor com falha for reiniciado, cada aplicativo retornará ao seu servidor primário padrão.

### Como funciona? {#how-it-works}

Para configurar um cluster ativo-ativo com SafeKit, basta implantar dois módulos mirror com replicação em tempo real. Cada módulo mirror tem sua própria configuração: um endereço IP virtual, diretórios replicados em tempo real e scripts de reinicialização.

Observações:

  * Ambas as aplicações (Appli1 e Appli2) devem ser instaladas em cada servidor para failover da aplicação.
  * Essa arquitetura não se limita a dois aplicativos. Você pode implantar até 25 módulos de aplicativos nos mesmos dois servidores.
  * Cada módulo mirror tem seu próprio endereço IP virtual, seus próprios diretórios de arquivos replicados e seus próprios scripts de recuperação.


### Exemplo de um cluster ativo-ativo {#example-of-an-active-active-cluster}

A solução 💡 [Hyper-V](</pt-br/solutions/hyper-v-replication-automatic-failover-load-balancing/>) ou 💡 [KVM](</pt-br/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) é um exemplo de um cluster ativo-ativo. Essa solução fornece replicação, failover automático e balanceamento de carga de máquinas virtuais. Neste cluster, N módulos mirror replicam N máquinas virtuais entre dois servidores físicos.

Nesta configuração, cada módulo mirror replica uma máquina virtual completa e a reinicia caso ocorra uma falha.

Este tipo de módulo não precisa de um endereço IP virtual. Quando a máquina virtual é reiniciada no outro servidor, o seu próprio endereço IP é movido automaticamente com ela.

Nessa arquitetura, o aplicativo crítico é instalado dentro de uma máquina virtual.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}