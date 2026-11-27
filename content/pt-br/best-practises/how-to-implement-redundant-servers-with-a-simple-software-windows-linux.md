---
title: "Como implementar servidores redundantes com um software de alta disponibilidade simples"
canonical: "https://safekit.eviden.com/pt-br/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Como implementar servidores redundantes só com software: o SafeKit oferece replicação em tempo real e failover automático no Windows e Linux, sem disco compartilhado."
category: "best-practises"
lang: "pt-br"
topics: "Como implementar servidores redundantes ativos/passivos com replicação em tempo real e failover?, Como implementar servidores redundantes ativos/ativos com balanceamento de carga de rede e failover?"
hashpart: "how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover, how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# Como implementar servidores redundantes com um software de alta disponibilidade simples {#how-to-implement-redundant-servers-with-simple-ha-software}

## Como implementar servidores redundantes ativos/passivos com replicação em tempo real e failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### O cluster mirror SafeKit {#the-safekit-mirror-cluster}


![Servidores redundantes com replicação de arquivos em tempo real e failover](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Em um cluster mirror, o software SafeKit é instalado em dois servidores. Os servidores podem ser físicos ou virtuais. Eles executam Windows ou Linux, no local ou na nuvem. O servidor primário é o servidor ativo. Ele executa o aplicativo crítico. O servidor secundário é um servidor redundante passivo. Ele recebe em tempo real todas as alterações feitas pelo aplicativo em seus arquivos. Os clientes se conectam a um [endereço IP virtual](</pt-br/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Se o servidor primário falhar, SafeKit reinicia automaticamente o aplicativo crítico no servidor secundário. Este servidor se torna primário e assume o endereço IP virtual. Quando o servidor com falha é reiniciado, SafeKit ressincroniza automaticamente seus dados. Este servidor então se torna o servidor redundante passivo, no estado secundário.

## Como implementar servidores redundantes ativos/ativos com balanceamento de carga de rede e failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### O cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#the-safekit-farm-cluster}


![Servidores redundantes com balanceamento de carga de rede e failover](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Em um cluster <span class="notranslate farm-term" translate="no">farm</span>, o software SafeKit é instalado em vários servidores redundantes. Os servidores executam Windows ou Linux, no local ou na nuvem. Todos os servidores redundantes estão ativos. Eles executam o mesmo aplicativo de front-end crítico. Os clientes se conectam a um [endereço IP virtual](</pt-br/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). As sessões TCP são balanceadas entre todos os servidores redundantes. Se um servidor falhar, SafeKit reconfigura automaticamente o balanceamento de carga das sessões TCP entre os servidores ativos restantes. Quando o servidor com falha é reiniciado, SafeKit o reintegra automaticamente como um servidor redundante ativo. Este servidor então recebe novas sessões TCP.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}