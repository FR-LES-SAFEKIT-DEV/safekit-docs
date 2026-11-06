---
title: "Arquiteturas SafeKit"
canonical: "https://safekit.eviden.com/pt-br/architectures/"
description: "Explore arquiteturas de alta disponibilidade com o SafeKit. Saiba mais sobre os clusters Mirror, Farm e Farm + clusters mirror para failover de aplicativos e balanceamento de carga sem SAN."
category: "architectures"
lang: "pt-br"
topics: "Quais são as diferentes arquiteturas de alta disponibilidade e os diferentes clusters de software com o SafeKit?, Como construir clusters de alta disponibilidade com o SafeKit?, 🔍 Central de Navegação de Alta Disponibilidade do SafeKit"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 13 expressions"
---

# Arquiteturas SafeKit {#safekit-architectures}

## Quais são as diferentes arquiteturas de alta disponibilidade e os diferentes clusters de software com o SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Cluster mirror {#mirror-cluster}


![cluster mirror SafeKit](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Mais informações](</pt-br/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster <span class="notranslate farm-term" translate="no">farm</span> {#farm-cluster}


![cluster farm SafeKit](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Mais informações](</pt-br/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + cluster mirror {#farmmirror-cluster}


![cluster mirror SafeKit farm](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Mais informações](</pt-br/architectures/clustering-software-load-balancing-mirroring/>)

### Cluster ativo/ativo {#activeactive-cluster}


![Cluster ativo-ativo SafeKit com replicação em tempo real](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Mais informações](</pt-br/architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1 {#n-1-cluster}


![Cluster de redundância SafeKit N-1](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Mais informações](</pt-br/architectures/n-1-redundancy/>)

## Como construir clusters de alta disponibilidade com o SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Use os módulos do aplicativo {#use-high-availability-modules}

Um módulo de aplicação é uma personalização do SafeKit para uma aplicação. Existem dois tipos de módulos: o módulo mirror com replicação de dados em tempo real e failover, e o módulo <span class="notranslate farm-term" translate="no">farm</span> com balanceamento de carga e failover.

Se você implantar um módulo mirror em 2 servidores, criará um cluster mirror e, se implantar um módulo <span class="notranslate farm-term" translate="no">farm</span> em N servidores, criará um cluster <span class="notranslate farm-term" translate="no">farm</span>.

Vários módulos de aplicação podem ser implantados nos mesmos servidores. Assim, arquiteturas de cluster avançadas podem ser implementadas como as apresentadas anteriormente (<span class="notranslate farm-term" translate="no">farm</span> + mirror, ativo/ativo, N-1).

### O que é um módulo de aplicação? {#what-is-an-application-module}

Na prática, um módulo de aplicação é um arquivo “.Safe” (tipo zip) que inclui:

1 - o arquivo de configuração userconfig.xml, que contém:

  * endereço IP virtual do cluster,
  * diretórios de arquivos para replicar em tempo real (para um módulo mirror),
  * critérios de balanceamento de carga da rede (para um módulo <span class="notranslate farm-term" translate="no">farm</span>),
  * configuração dos detetores de falhas de software e hardware


2 - os scripts para iniciar e parar a aplicação.

### Implantação de módulos de aplicativos no formato "plug and play" {#plug-and-play-deployment-of-high-availability-modules}

Uma vez que um módulo de aplicação é configurado e testado com uma aplicação, a implantação não requer habilidades de TI específicas:

  1. instale o aplicativo em 2 servidores padrão (físicos ou virtuais),
  2. instale o software SafeKit em ambos os servidores,
  3. Instale o módulo do aplicativo em ambos os servidores.



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}