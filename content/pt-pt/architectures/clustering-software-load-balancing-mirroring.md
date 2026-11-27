---
title: "Software de Clustering com Balanceamento de Carga e Replicação: Alta Disponibilidade e Escalabilidade"
canonical: "https://safekit.eviden.com/pt-pt/architectures/clustering-software-load-balancing-mirroring/"
description: "Combine módulos farm e mirror SafeKit: o balanceamento de carga escala o front-end e a replicação síncrona protege os dados do back-end, em Windows e Linux."
category: "architectures"
lang: "pt-pt"
topics: "Elevada disponibilidade e escalabilidade de aplicações web e de bases de dados críticas com o software de clustering SafeKit"
hashpart: "high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png"
schemaType: "TechArticle"
---

# Software de Clustering com Balanceamento de Carga e Replicação: Alta Disponibilidade e Escalabilidade {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Elevada disponibilidade e escalabilidade de aplicações web e de bases de dados críticas com o software de clustering SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Balanceamento de carga, espelhamento e failover {#load-balancing-mirroring-and-failover}


![Clustering SafeKit com balanceamento de carga e espelhamento](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Exemplo com o software de clustering SafeKit {#example-with-the-safekit-clustering-software}

Por exemplo, com o software de clustering SafeKit, é possível implementar o balanceamento de carga para IIS e a replicação para o Microsoft SQL Server.

Para fazer isso, implemente um módulo <span class="notranslate farm-term" translate="no">farm</span> para IIS e um módulo mirror para Microsoft SQL Server. Cada módulo é configurado com o seu próprio endereço IP virtual e os seus próprios scripts de reinicialização.

Os dois módulos podem ser implementados num único cluster de dois servidores, onde IIS e Microsoft SQL Server são executados. Alternativamente, os dois módulos podem ser implementados em dois clusters separados com servidores diferentes.

Com o software de clustering SafeKit, a implementação nos mesmos servidores ou em servidores diferentes funciona exatamente da mesma forma.

### Solução de alta disponibilidade e escalabilidade {#high-availability-and-scalability-solution}

O software de clustering SafeKit oferece uma solução simples de alta disponibilidade e escalabilidade para aplicações web e de base de dados críticas.

O balanceamento de carga da rede, a replicação de dados em tempo real e failover de aplicações são geridos de forma consistente num único produto.

Ao contrário do clustering de hardware, o software de clustering SafeKit não requer discos partilhados, SANs replicadas, balanceadores de carga de hardware ou edições Enterprise de sistemas operativos ou bases de dados.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}