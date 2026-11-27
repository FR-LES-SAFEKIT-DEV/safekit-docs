---
title: "Cluster de redundância N-1: alta disponibilidade para vários aplicativos com um único servidor de backup"
canonical: "https://safekit.eviden.com/pt-br/architectures/n-1-redundancy/"
description: "Redundância N-1 com SafeKit: N aplicações em N+1 servidores compartilham um único servidor de backup, com replicação em tempo real e failover automático, sem SAN."
category: "architectures"
lang: "pt-br"
topics: "Alta disponibilidade com replicação de dados e failover de aplicativos de N servidores para 1"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# Cluster de redundância N-1: alta disponibilidade para vários aplicativos com um único servidor de backup {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Alta disponibilidade com replicação de dados e failover de aplicativos de N servidores para 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### Redundância N-1 {#n-1-redundancy}


![Cluster de redundância N-1 com SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Como funciona a redundância N-1? {#how-the-n-1-redundancy-works}

SafeKit oferece um cluster de redundância N-1 simples: N aplicativos são executados em N servidores primários, e um único servidor de backup assume o controle em caso de falha. Em um cluster de redundância N-1 SafeKit, cada aplicativo funciona em seus próprios diretórios replicados.

Ao contrário de um [cluster ativo-ativo](</pt-br/architectures/active-active-cluster-real-time-replication/>), quando um servidor primário falha, o servidor de backup não precisa lidar com uma carga de trabalho dupla.

Isso pressupõe que apenas um servidor primário falhe por vez no cluster de redundância N-1. A solução também pode lidar com várias falhas de servidor primário ao mesmo tempo. Nesse caso, o único servidor de backup executa a carga de trabalho combinada de todos os servidores com falha.

### Como implementar a redundância N-1? {#how-to-implement-n-1-redundancy}

Para configurar um cluster de redundância N-1 SafeKit, basta implantar N módulos mirror em N+1 servidores.

Observações:

  * Todos os aplicativos (Appli1, Appli2, Appli3) devem ser instalados no servidor de backup para o failover do aplicativo.
  * Cada módulo mirror tem seu próprio endereço IP virtual, seus próprios diretórios de arquivos replicados e seus próprios scripts de recuperação.



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}