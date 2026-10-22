---
title: "Arquiteturas SafeKit"
canonical: "https://safekit.eviden.com/pt-br/architectures/"
description: "Conheça as arquiteturas de alta disponibilidade com SafeKit. Saiba mais sobre clusters Mirror, Farm e Farm+Mirror para failover de aplicações sem SAN e balanceamento de carga."
category: "architectures"
lang: "pt-br"
topics: "Quais são as diferentes arquiteturas de alta disponibilidade e os clusters de software com SafeKit?, Como criar clusters de alta disponibilidade com SafeKit?, 🔍 Central de navegação do SafeKit para alta disponibilidade"
---

# Arquiteturas SafeKit {#safekit-architectures}

## Quais são as diferentes arquiteturas de alta disponibilidade e os clusters de software com SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Cluster Mirror {#mirror-cluster}


![Cluster Mirror do SafeKit](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Mais informações](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster Farm {#farm-cluster}


![Cluster Farm do SafeKit](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Mais informações](</architectures/network-load-balancing-cluster/>)

### Cluster Farm+Mirror {#farmmirror-cluster}


![Cluster Farm+Mirror do SafeKit](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Mais informações](</architectures/clustering-software-load-balancing-mirroring/>)

### Cluster ativo/ativo {#activeactive-cluster}


![Cluster ativo/ativo do SafeKit com replicação em tempo real](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Mais informações](</architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1 {#n-1-cluster}


![Cluster de redundância N-1 do SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Mais informações](</architectures/n-1-redundancy/>)

## Como criar clusters de alta disponibilidade com SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Usar módulos de alta disponibilidade {#use-high-availability-modules}

Um módulo de alta disponibilidade é uma personalização do SafeKit para uma aplicação. Há dois tipos de módulos: o módulo Mirror, com replicação de dados em tempo real e failover, e o módulo Farm, com balanceamento de carga e failover.

Ao implantar um módulo Mirror em dois servidores, você cria um cluster Mirror. Ao implantar um módulo Farm em N servidores, você cria um cluster Farm.

Vários módulos de aplicação podem ser implantados nos mesmos servidores. Assim, é possível implementar arquiteturas de cluster avançadas, como as apresentadas anteriormente (Farm+Mirror, ativo/ativo, N-1).

### O que é um módulo de aplicação? {#what-is-an-application-module}

Na prática, um módulo de aplicação é um arquivo “.Safe” (formato zip) que inclui:

1 - o arquivo de configuração userconfig.xml, que contém:

  * nomes ou endereços IP físicos dos servidores,
  * nome ou endereço IP virtual do cluster,
  * diretórios de arquivos a serem replicados em tempo real (para um módulo Mirror),
  * critérios de balanceamento de carga de rede (para um módulo Farm),
  * configuração dos detectores de falhas de software e hardware


2 - os scripts para iniciar e parar a aplicação.

### Implantação plug and play de módulos de alta disponibilidade {#plug-and-play-deployment-of-high-availability-modules}

Depois de configurado e testado com uma aplicação, o módulo pode ser implantado sem conhecimentos específicos de TI:

  1. instale a aplicação em dois servidores padrão (físicos ou virtuais),
  2. instale o software SafeKit nos dois servidores,
  3. instale o módulo de aplicação nos dois servidores.



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}