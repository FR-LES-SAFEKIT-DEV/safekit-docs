---
title: "Alta Disponibilidade e Redundância para Siemens Siveillance Suite: Cluster SANless Ativo-Ativo"
canonical: "https://safekit.eviden.com/pt-br/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/"
description: "Alta disponibilidade para a suíte Siemens Siveillance: o SafeKit replica máquinas virtuais Hyper-V entre dois servidores ativos com failover automático."
category: "solutions"
lang: "pt-br"
topics: "SafeKit para Siemens Siveillance: cluster Hyper-V sem SAN de 2 nós, Índice, Como o software SafeKit implementa de forma simples um cluster de alta disponibilidade Siemens Siveillance sem armazenamento compartilhado em uma SAN?, Como funciona o cluster Siemens Siveillance SafeKit ?, Limitações SafeKit de Alta Disponibilidade, Comparação: SafeKit para Siemens Siveillance vs. clustering nativo Hyper-V, Guia em vídeo: Configurando um cluster HA SafeKit para Siemens Siveillance, SafeKit uma solução reconhecida no mercado de segurança"
hashpart: "safekit-hyperv-tco, toc, safekit-hyperv-ha-cluster, safekit-hyperv-ha-how-it-works, safekit-ha-limitations, safekit-hyperv-ha-comparison, videoguide-safekit-hyperv-cluster, safekit-a-recognized-solution-on-the-security-market"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.11 | Translation LLM | 24 expressions"
image: "/wp-content/uploads/2026/01/safekit-vm-repli-720-720.jpg"
schemaType: "TechArticle"
schemaApplications: ["Siemens Siveillance"]
---

# Alta Disponibilidade e Redundância para Siemens Siveillance Suite: Cluster SANless Ativo-Ativo {#high-availability-and-redundancy-for-siemens-siveillance-suite-active-active-sanless-clustering}


{{%  insert-safekit-hyperv-solution-mirror-pt-br app="Siemens Siveillance"  %}}
 

### Notas {#notes}

  * Para Siveillance VMS e os servidores de gravação, use o mecanismo de failover integrado e não SafeKit. Os gravadores podem ser executados no nível do host em ambos os servidores físicos ou em 2 máquinas virtuais em ambos os servidores físicos (não replicados pelo SafeKit).
  * Existe outra solução para o **💡 [Siemens Siveillance VMS](</pt-br/solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/>)** no nível do aplicativo que pode funcionar em qualquer infraestrutura (servidores físicos, qualquer hipervisor, incluindo **VMware**...).



{{%  insert-safekit-siemens-license-pt-br app="Siemens Desigo CC"  %}}

{{%  insert-safekit-security-case-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}