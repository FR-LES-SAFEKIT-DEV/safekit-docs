---
title: "Software de clusterização para farms e espelhos: alta disponibilidade e balanceamento de carga"
canonical: "https://safekit.eviden.com/pt-br/architectures/clustering-software-load-balancing-mirroring/"
description: "Implante arquiteturas avançadas combinando os módulos SafeKit Farm e Mirror . Combine balanceamento de carga de rede para escalabilidade de front-end com replicação síncrona em tempo real para proteção de dados de back-end. Clustering simples e sem SAN para Windows e Linux sem necessidade de conhecimentos especializados em TI. Baixe sua versão de avaliação gratuita."
category: "architectures"
lang: "pt-br"
topics: "Alta disponibilidade e escalabilidade de aplicações web e de banco de dados críticas com o software de cluster SafeKit , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Software de clusterização para farms e espelhos: alta disponibilidade e balanceamento de carga {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Alta disponibilidade e escalabilidade de aplicações web e de banco de dados críticas com o software de cluster SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Balanceamento de carga, espelhamento e failover {#load-balancing-mirroring-and-failover}


Agrupamento ![ SafeKit com balanceamento de carga e espelhamento ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Exemplo com o software de cluster SafeKit {#example-with-the-safekit-clustering-software}

Por exemplo, com o software de cluster SafeKit , você pode implementar o balanceamento de carga IIS e o espelhamento Microsoft SQL Server .

Para isso, você precisa implantar um módulo <span class="notranslate farm-term" translate="no">farm</span> para o servidor SQL IIS e um módulo mirror para o servidor SQL Microsoft . Cada módulo <span class="notranslate farm-term" translate="no">farm</span> e mirror é configurado com seu próprio endereço IP virtual e seus próprios scripts de reinicialização.

Os módulos mirror e <span class="notranslate farm-term" translate="no">farm</span> podem ser implementados em um único cluster de dois servidores. Os módulos IIS , Microsoft e SQL Server serão executados nesses dois servidores. Alternativamente, os dois módulos podem ser implementados em dois clusters com servidores diferentes.

Com o software de cluster SafeKit , não há diferença entre uma implementação nos mesmos servidores ou em servidores diferentes.

### Solução de alta disponibilidade e escalabilidade {#high-availability-and-scalability-solution}

O software de cluster SafeKit oferece uma solução simples de alta disponibilidade e escalabilidade para aplicações web e de banco de dados críticas.

Como resultado, o balanceamento de carga de rede, o espelhamento de dados em tempo real e o failover de aplicativos são gerenciados de forma coerente em um mesmo produto.

Ao comparar o software de clusterização SafeKit com a clusterização por hardware, você não precisa de disco compartilhado, SAN replicada, balanceadores de carga, edições Enterprise de SO ou banco de dados.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}