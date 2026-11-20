---
title: "Como Implementar Servidores Redundantes com Software de Alta Disponibilidade Simples"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Aprenda a implementar servidores redundantes com uma abordagem simples, apenas com software. SafeKit oferece replicação de dados em tempo real e failover automático em Windows e Linux. Não requer discos partilhados nem conhecimentos especializados de TI."
category: "best-practises"
lang: "pt-pt"
topics: "Como implementar servidores redundantes ativos/passivos com replicação em tempo real e failover?, Como implementar servidores redundantes ativos/ativos com balanceamento de carga de rede e failover?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 52 expressions"
---

# Como Implementar Servidores Redundantes com Software de Alta Disponibilidade Simples {#how-to-implement-redundant-servers-with-simple-ha-software}

## Como implementar servidores redundantes ativos/passivos com replicação em tempo real e failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### O cluster mirror SafeKit {#the-safekit-mirror-cluster}


![Servidores redundantes com replicação de ficheiros em tempo real e failover](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Num cluster mirror, o software SafeKit é instalado em dois servidores. Os servidores podem ser físicos ou virtuais. Eles executam Windows ou Linux, no local ou na nuvem. O servidor primário é o servidor ativo. Ele executa a aplicação crítica. O servidor secundário é um servidor redundante passivo. Ele recebe em tempo real todas as alterações feitas pela aplicação nos seus ficheiros. Os clientes ligam-se a um [endereço IP virtual](</pt-pt/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Se o servidor primário falhar, SafeKit reinicia automaticamente a aplicação crítica no servidor secundário. Este servidor torna-se primário e assume o endereço IP virtual. Quando o servidor que falhou reinicia, SafeKit ressincroniza automaticamente os seus dados. Este servidor torna-se então o servidor redundante passivo, no estado secundário.

## Como implementar servidores redundantes ativos/ativos com balanceamento de carga de rede e failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### O cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#the-safekit-farm-cluster}


![Servidores redundantes com balanceamento de carga de rede e failover](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Num cluster <span class="notranslate farm-term" translate="no">farm</span>, o software SafeKit é instalado em vários servidores redundantes. Os servidores executam Windows ou Linux, no local ou na nuvem. Todos os servidores redundantes estão ativos. Eles executam a mesma aplicação crítica de front-end. Os clientes conectam-se a um [endereço IP virtual](</pt-pt/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). As sessões TCP são distribuídas entre todos os servidores redundantes. Se um servidor falhar, SafeKit reconfigura automaticamente a distribuição de carga das sessões TCP entre os servidores ativos restantes. Quando o servidor com falha é reiniciado, SafeKit reintegra-o automaticamente como um servidor redundante ativo. Este servidor recebe então novas sessões TCP.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}