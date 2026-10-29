---
title: "Arquiteturas SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/architectures/"
description: "Explore arquiteturas de alta disponibilidade com SafeKit . Saiba mais sobre os clusters Mirror , Farm e Farm + Mirror para failover de aplicações sem SAN e balanceamento de carga."
category: "architectures"
lang: "pt-pt"
topics: "Quais são as diferentes arquiteturas de alta disponibilidade e os diferentes clusters de software com SafeKit ? Como construir clusters de alta disponibilidade com SafeKit ? 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Arquiteturas SafeKit {#safekit-architectures}

## Quais são as diferentes arquiteturas de alta disponibilidade e os diferentes clusters de software com SafeKit ? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Cluster Mirror {#mirror-cluster}


![ SafeKit mirror cluster ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[ Mais informações ](</pt-pt/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster <span class="notranslate farm-term" translate="no">Farm</span> {#farm-cluster}


![ SafeKit farm cluster ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[ Mais informações ](</pt-pt/architectures/network-load-balancing-cluster/>)

### Cluster <span class="notranslate farm-term" translate="no">Farm</span> + mirror {#farmmirror-cluster}


![ SafeKit farm cluster mirror ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[ Mais informações ](</pt-pt/architectures/clustering-software-load-balancing-mirroring/>)

### Cluster ativo/ativo {#activeactive-cluster}


![ SafeKit cluster ativo ativo com replicação em tempo real ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[ Mais informações ](</pt-pt/architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1 {#n-1-cluster}


![ SafeKit Cluster de redundância N-1 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[ Mais informações ](</pt-pt/architectures/n-1-redundancy/>)

## Como construir clusters de alta disponibilidade com SafeKit ? {#how-to-build-high-availability-clusters-with-safekit}

### Utilize os módulos de alta disponibilidade {#use-high-availability-modules}

Um módulo de alta disponibilidade é uma personalização do SafeKit para uma aplicação. Existem dois tipos de módulos: o módulo mirror com replicação de dados em tempo real e failover, e o módulo <span class="notranslate farm-term" translate="no">farm</span> com balanceamento de carga e failover.

Se você implantar um módulo mirror em 2 servidores, criará um cluster mirror e, se implantar um módulo <span class="notranslate farm-term" translate="no">farm</span> em N servidores, criará um cluster <span class="notranslate farm-term" translate="no">farm</span> .

Diversos módulos de aplicação podem ser implantados nos mesmos servidores. Assim, arquiteturas de cluster avançadas podem ser implementadas, como as apresentadas anteriormente ( <span class="notranslate farm-term" translate="no">farm</span> + mirror , ativo/ativo, N-1).

### O que é um módulo de aplicação? {#what-is-an-application-module}

Na prática, um módulo de aplicação é um arquivo “.Safe” (tipo zip) que inclui:

1 - o arquivo de configuração userconfig.xml que contém:

  * nomes ou endereços IP físicos dos servidores,
  * nome ou endereço IP virtual do cluster,
  * diretórios de arquivos a serem replicados em tempo real (para um módulo mirror ),
  * critérios de balanceamento de carga de rede (para um módulo <span class="notranslate farm-term" translate="no">farm</span> ),
  * Configuração de detectores de falhas de software e hardware


2 - os scripts para iniciar e parar a aplicação.

### Implantação plug and play de módulos de alta disponibilidade {#plug-and-play-deployment-of-high-availability-modules}

Uma vez que um módulo de aplicação esteja configurado e testado com uma aplicação, a implantação não requer habilidades específicas de TI:

  1. Instalar a aplicação em 2 servidores padrão (físicos ou virtuais),
  2. Instale o software SafeKit em ambos os servidores.
  3. Instale o módulo de aplicação em ambos os servidores.



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}