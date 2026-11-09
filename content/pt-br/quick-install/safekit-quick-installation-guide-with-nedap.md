---
title: "Alta disponibilidade Nedap com SafeKit: instale o módulo nedap.safe para o Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Implemente o módulo nedap.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático do Nedap no Windows. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Nedap, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Nedap, Instalação da solução SafeKit/Nedap no Windows (nedap.safe), Configuração passo a passo da solução SafeKit/Nedap, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta disponibilidade Nedap com SafeKit: instale o módulo nedap.safe para o Failover {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Nedap" mod="nedap"  %}}
 

**📘 [Configuração do Nedap AOES com SafeKit (PDF)](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)** : todos os detalhes estão neste documento.

## Visão geral da solução SafeKit/Nedap {#overview-of-the-safekit--nedap-solution}

A solução é descrita aqui: **💡 [A mais simples alta disponibilidade Nedap: replicação síncrona e failover de 2 nós](</pt-br/solutions/nedap-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/Nedap no Windows (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa Nedap AEOS e o SQL instalados em 2 nós (máquinas virtuais ou servidores físicos).
  * Com SQL Server no mesmo nó que Nedap AEOS, configure a conexão do Nedap AEOS ao SQL com o endereço IP virtual e não com o endereço IP físico do servidor. Caso contrário, o failover não funcionará. SQL Server pode ser externo, consulte a nota abaixo.


ℹ️ Observação: SQL Server pode ser externo. Nesse caso, na etapa 4, durante a configuração passo a passo:

  * remover a replicação das pastas de dados e de log do SQL,
  * Remova o verificador de processo no sqlservr.exe
  * Remova o MSSQLServer da macro SERVICES.


Você pode implementar a redundância do SQL Server externo com 💡 [SafeKit e o módulo sqlserver.safe](</pt-br/solutions/sql-server-high-availability-synchronous-replication-failover/>). Nesse caso, configure a conexão do Nedap AEOS ao SQL com o endereço IP virtual do módulo sqlserver.safe.


{{%  insert-safekit-installation-package-windows-pt-br app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Configuração passo a passo da solução SafeKit/Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-pt-br app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}