---
title: "Alta Disponibilidade Nedap com SafeKit: Instale o Módulo nedap.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Implemente o módulo nedap.safe para SafeKit para permitir a replicação síncrona em tempo real e o failover automático do Nedap no Windows. Este guia explica como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Nedap, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Nedap, Instalação da solução SafeKit/Nedap no Windows (nedap.safe), Configuração passo a passo da solução SafeKit/Nedap, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Nedap com SafeKit: Instale o Módulo nedap.safe para Failover {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Nedap" mod="nedap"  %}}
 

**📘 [Configuração do Nedap AOES com SafeKit (PDF)](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)** : todos os detalhes estão neste documento.

## Visão geral da solução SafeKit/Nedap {#overview-of-the-safekit--nedap-solution}

A solução é descrita aqui: **💡 [A mais simples alta disponibilidade Nedap: replicação síncrona e failover de 2 nós](</pt-pt/solutions/nedap-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/Nedap no Windows (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter Nedap AEOS e o SQL instalados em 2 nós (máquinas virtuais ou servidores físicos).
  * Com SQL Server no mesmo nó que o Nedap AEOS, configure a ligação do Nedap AEOS ao SQL com o endereço IP virtual e não com o endereço IP físico do servidor. Caso contrário, a comutação por falha não funcionará. SQL Server pode ser externo, consulte a nota abaixo.


ℹ️ Nota: SQL Server pode ser externo. Neste caso, no passo 4, durante a configuração passo a passo:

  * remover a replicação das pastas de dados e de registos do SQL,
  * Remova o verificador de processos em sqlservr.exe,
  * remover o MSSQLServer da macro SERVIÇOS.


Pode implementar a redundância do SQL Server externo com 💡 [SafeKit e o módulo sqlserver.safe](</pt-pt/solutions/sql-server-high-availability-synchronous-replication-failover/>). Neste caso, configure a ligação do Nedap AEOS ao SQL com o endereço IP virtual do módulo sqlserver.safe.


{{%  insert-safekit-installation-package-windows-pt-pt app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Configuração passo a passo da solução SafeKit/Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}