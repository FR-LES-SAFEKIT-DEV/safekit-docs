---
title: "Arquiteturas SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/architectures/"
description: "Explore as arquiteturas de alta disponibilidade com o SafeKit. Conheça os clusters Mirror, Farm e Farm+Mirror para failover de aplicações sem SAN e balanceamento de carga."
category: "architectures"
lang: "pt-pt"
topics: "Quais são as diferentes arquiteturas de alta disponibilidade e os clusters de software com o SafeKit?, Como criar clusters de alta disponibilidade com o SafeKit?, 🔍 Centro de navegação do SafeKit para alta disponibilidade"
---

# Arquiteturas SafeKit

## Quais são as diferentes arquiteturas de alta disponibilidade e os clusters de software com o SafeKit?

### Cluster Mirror


![Cluster Mirror do SafeKit](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Mais informações](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster Farm


![Cluster Farm do SafeKit](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Mais informações](</architectures/network-load-balancing-cluster/>)

### Cluster Farm+Mirror


![Cluster Farm+Mirror do SafeKit](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Mais informações](</architectures/clustering-software-load-balancing-mirroring/>)

### Cluster ativo/ativo


![Cluster ativo/ativo do SafeKit com replicação em tempo real](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Mais informações](</architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1


![Cluster de redundância N-1 do SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Mais informações](</architectures/n-1-redundancy/>)

## Como criar clusters de alta disponibilidade com o SafeKit?

### Utilizar módulos de alta disponibilidade

Um módulo de alta disponibilidade é uma personalização do SafeKit para uma aplicação. Existem dois tipos de módulos: o módulo Mirror, com replicação de dados em tempo real e failover, e o módulo Farm, com balanceamento de carga e failover.

Ao implementar um módulo Mirror em 2 servidores, cria um cluster Mirror; ao implementar um módulo Farm em N servidores, cria um cluster Farm.

É possível implementar vários módulos de aplicação nos mesmos servidores. Assim, podem ser criadas arquiteturas de cluster avançadas como as apresentadas anteriormente (Farm+Mirror, ativo/ativo, N-1).

### O que é um módulo de aplicação?

Na prática, um módulo de aplicação é um ficheiro “.Safe” (formato zip) que inclui:

1 - o ficheiro de configuração userconfig.xml, que contém:

  * nomes ou endereços IP físicos dos servidores,
  * nome ou endereço IP virtual do cluster,
  * diretórios de ficheiros a replicar em tempo real (para um módulo Mirror),
  * critérios de balanceamento de carga de rede (para um módulo Farm),
  * configuração dos detetores de falhas de software e hardware


2 - os scripts para iniciar e parar a aplicação.

### Implementação plug and play de módulos de alta disponibilidade

Depois de configurado e testado com uma aplicação, o módulo pode ser implementado sem conhecimentos informáticos específicos:

  1. instale a aplicação em 2 servidores padrão (físicos ou virtuais),
  2. instale o software SafeKit em ambos os servidores,
  3. instale o módulo de aplicação em ambos os servidores.



{{%  insert-safekit-hub-pt-pt  %}}
 

{{%  insert-safekit-4-buttons-pt-pt  %}}