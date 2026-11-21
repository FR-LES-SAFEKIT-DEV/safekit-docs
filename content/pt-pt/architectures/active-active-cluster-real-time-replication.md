---
title: "Software de Agrupamento Ativo-Ativo com Replicação em Tempo Real e failover"
canonical: "https://safekit.eviden.com/pt-pt/architectures/active-active-cluster-real-time-replication/"
description: "Maximize a utilização de recursos com o clustering ativo-ativo SafeKit. Implemente o failover entre dois servidores usando replicação síncrona em tempo real e múltiplos módulos mirror. Garanta zero perda de dados (RPO = 0) e recuperação automática para Windows e Linux sem uma SAN. Descarregue a versão de avaliação gratuita."
category: "architectures"
lang: "pt-pt"
topics: "Como funciona um cluster ativo-ativo com replicação em tempo real?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 52 expressions"
---

# Software de Agrupamento Ativo-Ativo com Replicação em Tempo Real e failover {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Como funciona um cluster ativo-ativo com replicação em tempo real? {#how-the-active-active-cluster-with-real-time-replication-works}

### Cluster Ativo-Ativo com Replicação em Tempo Real {#active--active-cluster-with-real-time-replication}

Dois servidores executam aplicações e fazem cópias de segurança um do outro. Isto chama-se failover mútuo: cada servidor é a cópia de segurança do outro servidor. Cada aplicação utiliza os seus próprios diretórios de ficheiros replicados.


![Cluster ativo-ativo SafeKit com replicação em tempo real](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Se um servidor falhar num cluster ativo-ativo, todas as aplicações são executadas no servidor restante. Quando o servidor que falhou é reiniciado, cada aplicação regressa ao seu servidor primário predefinido.

### Como funciona? {#how-it-works}

Para configurar um cluster ativo-ativo com SafeKit, basta implementar dois módulos mirror com replicação em tempo real. Cada módulo mirror tem a sua própria configuração: um endereço IP virtual, diretórios replicados em tempo real e scripts de reinicialização.

Notas:

  * Ambas as aplicações (Appli1 e Appli2) devem ser instaladas em cada servidor para failover da aplicação.
  * Esta arquitetura não se limita a duas aplicações. É possível implementar até 25 módulos de aplicação nos mesmos dois servidores.
  * Cada módulo mirror tem o seu próprio endereço IP virtual, os seus próprios diretórios de ficheiros replicados e os seus próprios scripts de recuperação.


### Exemplo de um Cluster Ativo-Ativo {#example-of-an-active-active-cluster}

A solução 💡 [Hyper-V](</pt-pt/solutions/hyper-v-replication-automatic-failover-load-balancing/>) ou 💡 [KVM](</pt-pt/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) é um exemplo de um cluster ativo-ativo. Esta solução oferece replicação, failover automático e balanceamento de carga de máquinas virtuais. Neste cluster, N módulos mirror replicam N máquinas virtuais entre dois servidores físicos.

Nesta configuração, cada módulo mirror replica uma máquina virtual completa e reinicia-a caso ocorra uma falha.

Este tipo de módulo não necessita de um endereço IP virtual. Quando a máquina virtual é reiniciada no outro servidor, o seu próprio endereço IP é transferido automaticamente com ela.

Nesta arquitetura, a aplicação crítica é instalada dentro de uma máquina virtual.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}