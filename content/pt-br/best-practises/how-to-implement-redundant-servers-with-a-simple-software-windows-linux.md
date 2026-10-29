---
title: "Como implementar servidores redundantes com um software de alta disponibilidade simples"
canonical: "https://safekit.eviden.com/pt-br/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Aprenda como implementar servidores redundantes com uma abordagem simples, baseada exclusivamente em software. SafeKit propõe uma arquitetura sem SAN para Windows e Linux , oferecendo replicação de dados em tempo real e failover automático sem discos compartilhados ou conhecimentos de TI especializados."
category: "best-practises"
lang: "pt-br"
topics: "Como implementar servidores redundantes ativos/passivos com replicação em tempo real e failover?, Como implementar servidores redundantes ativos/ativos com balanceamento de carga de rede e failover?, 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Como implementar servidores redundantes com software de alta disponibilidade simples {#how-to-implement-redundant-servers-with-simple-ha-software}

## Como implementar servidores redundantes ativos/passivos com replicação em tempo real e failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### O cluster SafeKit mirror {#the-safekit-mirror-cluster}


Servidores redundantes ![ com replicação de arquivos em tempo real e failover ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Em um cluster mirror , o software SafeKit é instalado em dois servidores físicos ou virtuais executando Windows ou Linux (localmente ou na nuvem). O servidor primário é o servidor ativo e executa um aplicativo crítico. O servidor secundário é um servidor redundante passivo que recebe em tempo real todas as modificações feitas pelo aplicativo em seus arquivos. Os clientes se conectam a um endereço IP virtual [ . Se o servidor primário falhar, SafeKit ](</pt-br/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) automaticamente o aplicativo crítico no servidor redundante passivo, que se torna o primário e alterna o endereço IP virtual. Quando o servidor com falha é reiniciado, ele é automaticamente ressincronizado e se torna o servidor redundante passivo em execução como secundário.

## Como implementar servidores redundantes ativos/ativos com balanceamento de carga de rede e failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### O cluster SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#the-safekit-farm-cluster}


Servidores redundantes ![ com balanceamento de carga de rede e failover ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Em um cluster <span class="notranslate farm-term" translate="no">farm</span> , o software SafeKit é instalado em servidores redundantes que executam Windows ou Linux (localmente ou na nuvem). Todos os servidores redundantes estão ativos e executam a mesma aplicação crítica de front-end. Os clientes se conectam a um endereço IP virtual [ . As sessões TCP são balanceadas entre todos os servidores redundantes. Se um servidor falhar, ](</pt-br/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>) SafeKit reconfigura automaticamente o balanceamento de carga das sessões TCP entre os servidores ativos restantes. Quando o servidor com falha é reiniciado, ele é reintegrado automaticamente como um servidor redundante ativo e recebe novas sessões TCP.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}