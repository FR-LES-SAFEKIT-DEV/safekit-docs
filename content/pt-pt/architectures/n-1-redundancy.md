---
title: "Clustering com redundância N-1: Alta disponibilidade para múltiplas aplicações com um único backup."
canonical: "https://safekit.eviden.com/pt-pt/architectures/n-1-redundancy/"
description: "Otimize seu data center com a redundância N-1 SafeKit . Implante N módulos mirror em N+1 servidores para fornecer alta disponibilidade para vários aplicativos com um único backup compartilhado. Elimine a necessidade de SAN e reduza os custos de hardware com a replicação em tempo real para Windows e Linux . Saiba mais."
category: "architectures"
lang: "pt-pt"
topics: "Alta disponibilidade com replicação de dados e failover de aplicativos de N servidores para 1, 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Clustering com redundância N-1: Alta disponibilidade para múltiplas aplicações com um único backup {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Alta disponibilidade com replicação de dados e failover de aplicativos de N servidores para 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### Redundância N-1 {#n-1-redundancy}


![ SafeKit Cluster de redundância N-1 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Como funciona a redundância N-1? {#how-the-n-1-redundancy-works}

SafeKit fornece um cluster de redundância N-1 simples com N aplicações executadas em N servidores e com um único backup para failover. Em um cluster de redundância N-1 SafeKit , cada aplicação opera em seus próprios diretórios replicados.

Ao contrário do cluster ativo-ativo [ , em caso de falha de um ](</pt-pt/architectures/active-active-cluster-real-time-replication/>) servidores primários, o servidor de backup não precisa lidar com o dobro da carga de trabalho.

Isso pressupõe que haja apenas uma falha por vez no cluster de redundância N-1. A solução pode suportar múltiplas falhas simultâneas de servidores primários, mas, nesse caso, o servidor de backup único terá que lidar com a carga de trabalho combinada de todos os servidores com falha.

### Como implementar redundância N-1? {#how-to-implement-n-1-redundancy}

O cluster de redundância SafeKit N-1 é configurado de forma simples, implantando N módulos mirror em N+1 servidores.

Observe que:

  * Todos os aplicativos (Aplicativo1, Aplicativo2, Aplicativo3) devem ser instalados em um único backup para garantir a recuperação de falhas do aplicativo.
  * Cada módulo mirror terá seu próprio endereço IP virtual, seus próprios diretórios de arquivos replicados e seus próprios scripts de recuperação.



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}