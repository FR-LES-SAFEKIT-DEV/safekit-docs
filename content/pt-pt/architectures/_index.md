---
title: "Arquiteturas SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/architectures/"
description: "Explore arquiteturas de alta disponibilidade com o SafeKit. Saiba mais sobre os clusters Mirror, Farm e Farm + clusters mirror para failover e balanceamento de carga de aplicações sem SAN."
category: "architectures"
lang: "pt-pt"
topics: "Quais são as diferentes arquiteturas de alta disponibilidade e os diferentes clusters de software com o SafeKit?, Como construir clusters de alta disponibilidade com o SafeKit?, 🔍 Centro de Navegação de Alta Disponibilidade do SafeKit"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 13 expressions"
---

# Arquiteturas SafeKit {#safekit-architectures}

## Quais são as diferentes arquiteturas de alta disponibilidade e os diferentes clusters de software com o SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Cluster mirror {#mirror-cluster}


![cluster mirror SafeKit](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Mais informações](</pt-pt/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster <span class="notranslate farm-term" translate="no">farm</span> {#farm-cluster}


![cluster farm SafeKit](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Mais informações](</pt-pt/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + cluster mirror {#farmmirror-cluster}


![cluster mirror SafeKit farm](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Mais informações](</pt-pt/architectures/clustering-software-load-balancing-mirroring/>)

### Cluster ativo/ativo {#activeactive-cluster}


![Cluster ativo-ativo SafeKit com replicação em tempo real](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Mais informações](</pt-pt/architectures/active-active-cluster-real-time-replication/>)

### N-1 grupo {#n-1-cluster}


![Cluster de redundância SafeKit N-1](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Mais informações](</pt-pt/architectures/n-1-redundancy/>)

## Como construir clusters de alta disponibilidade com o SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Utilize módulos de alta disponibilidade {#use-high-availability-modules}

Um módulo de alta disponibilidade é uma personalização do SafeKit para uma aplicação. Existem dois tipos de módulos: o módulo mirror com replicação de dados em tempo real e comutação por falha, e o módulo <span class="notranslate farm-term" translate="no">farm</span> com balanceamento de carga e comutação por falha.

Se implementar um módulo mirror em 2 servidores, então cria um cluster mirror e, se implementar um módulo <span class="notranslate farm-term" translate="no">farm</span> em N servidores, então cria um cluster <span class="notranslate farm-term" translate="no">farm</span>.

Vários módulos de aplicação podem ser implementados nos mesmos servidores. Assim, podem ser implementadas arquiteturas de clustering avançadas como as apresentadas anteriormente (<span class="notranslate farm-term" translate="no">farm</span> + mirror, ativo/ativo, N-1).

### O que é um módulo de aplicação? {#what-is-an-application-module}

Na prática, um módulo de aplicação é um ficheiro “.Safe” (tipo zip) que inclui:

1 - o ficheiro de configuração userconfig.xml, que contém:

  * nomes ou endereços IP físicos dos servidores,
  * nome ou endereço IP virtual do cluster,
  * diretórios de ficheiros a replicar em tempo real (para um módulo mirror),
  * critérios de balanceamento de carga da rede (para um módulo <span class="notranslate farm-term" translate="no">farm</span>),
  * configuração dos detetores de falhas de software e hardware


2 - os scripts para iniciar e parar a aplicação.

### Implementação "plug and play" de módulos de alta disponibilidade {#plug-and-play-deployment-of-high-availability-modules}

Uma vez que um módulo de aplicação é configurado e testado com uma aplicação, a sua implementação não requer competências específicas de TI:

  1. instalar a aplicação em 2 servidores padrão (físicos ou virtuais),
  2. instale o software SafeKit em ambos os servidores,
  3. instale o módulo da aplicação em ambos os servidores.



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}