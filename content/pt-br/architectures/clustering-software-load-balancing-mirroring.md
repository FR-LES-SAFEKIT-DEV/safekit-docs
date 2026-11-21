---
title: "Software de Cluster com Balanceamento de Carga e Espelhamento: Alta Disponibilidade e Escalabilidade"
canonical: "https://safekit.eviden.com/pt-br/architectures/clustering-software-load-balancing-mirroring/"
description: "Crie arquiteturas avançadas combinando os módulos farm e mirror SafeKit. O balanceamento de carga da rede dimensiona o front-end, e a replicação síncrona em tempo real protege os dados do back-end. Clusterização SANless simples para Windows e Linux, sem necessidade de conhecimentos especializados em TI. Baixe sua versão de avaliação gratuita."
category: "architectures"
lang: "pt-br"
topics: "Alta disponibilidade e escalabilidade de aplicações web e de banco de dados críticas com o software de cluster SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 52 expressions"
---

# Software de Cluster com Balanceamento de Carga e Espelhamento: Alta Disponibilidade e Escalabilidade {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Alta disponibilidade e escalabilidade de aplicações web e de banco de dados críticas com o software de cluster SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Balanceamento de carga, espelhamento e failover {#load-balancing-mirroring-and-failover}


![Clustering SafeKit com balanceamento de carga e espelhamento](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Exemplo com o software de cluster SafeKit {#example-with-the-safekit-clustering-software}

Por exemplo, com o software de cluster SafeKit, você pode implementar o balanceamento de carga para IIS e o espelhamento para o Microsoft SQL Server.

Para fazer isso, implante um módulo <span class="notranslate farm-term" translate="no">farm</span> para IIS e um módulo mirror para Microsoft SQL Server. Cada módulo é configurado com seu próprio endereço IP virtual e seus próprios scripts de reinicialização.

Os dois módulos podem ser implantados em um único cluster de dois servidores, onde IIS e Microsoft SQL Server são executados. Alternativamente, os dois módulos podem ser implantados em dois clusters separados com servidores diferentes.

Com o software de cluster SafeKit, a implantação nos mesmos servidores ou em servidores diferentes funciona exatamente da mesma maneira.

### Solução de alta disponibilidade e escalabilidade {#high-availability-and-scalability-solution}

O software de cluster SafeKit oferece uma solução simples de alta disponibilidade e escalabilidade para aplicações web e de banco de dados críticas.

O balanceamento de carga da rede, o espelhamento de dados em tempo real e failover de aplicativos são gerenciados de forma consistente em um único produto.

Ao contrário do clustering de hardware, o software de cluster SafeKit não requer discos compartilhados, SANs replicadas, balanceadores de carga de hardware ou edições Enterprise de sistemas operacionais ou bancos de dados.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}