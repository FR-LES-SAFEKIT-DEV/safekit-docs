---
title: "Cluster de Redundância N-1: Alta Disponibilidade para Múltiplas Aplicações com um Único Servidor de Backup"
canonical: "https://safekit.eviden.com/pt-pt/architectures/n-1-redundancy/"
description: "Redundância N-1 com SafeKit: N aplicações em N+1 servidores partilham um único servidor de backup, com replicação em tempo real e failover automático, sem SAN."
category: "architectures"
lang: "pt-pt"
topics: "Alta disponibilidade com replicação de dados e failover de aplicações de N servidores para 1, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# Cluster de Redundância N-1: Alta Disponibilidade para Múltiplas Aplicações com um Único Servidor de Backup {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Alta disponibilidade com replicação de dados e failover de aplicações de N servidores para 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### Redundância N-1 {#n-1-redundancy}


![Cluster de redundância N-1 com SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Como funciona a redundância N-1? {#how-the-n-1-redundancy-works}

SafeKit oferece um cluster de redundância N-1 simples: N aplicações são executadas em N servidores primários, e um único servidor de backup assume o controlo em caso de falha. Num cluster de redundância N-1 SafeKit, cada aplicação trabalha nos seus próprios diretórios replicados.

Ao contrário de um [cluster ativo-ativo](</pt-pt/architectures/active-active-cluster-real-time-replication/>), quando um servidor primário falha, o servidor de backup não tem de lidar com uma carga de trabalho dupla.

Isto pressupõe que apenas um servidor primário falha de cada vez no cluster de redundância N-1. A solução também pode lidar com várias falhas de servidores primários ao mesmo tempo. Neste caso, o único servidor de backup executa a carga de trabalho combinada de todos os servidores que falharam.

### Como Implementar a Redundância N-1? {#how-to-implement-n-1-redundancy}

Para configurar um cluster de redundância N-1 SafeKit, basta implementar N módulos mirror em N+1 servidores.

Notas:

  * Todas as aplicações (Appli1, Appli2, Appli3) devem ser instaladas no servidor de backup para o failover da aplicação.
  * Cada módulo mirror tem o seu próprio endereço IP virtual, os seus próprios diretórios de ficheiros replicados e os seus próprios scripts de recuperação.



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}