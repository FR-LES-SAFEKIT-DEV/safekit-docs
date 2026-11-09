---
title: "Alta Disponibilidade PostgreSQL com SafeKit: Instale o Módulo postgresql.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Implemente o módulo postgresql.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático do PostgreSQL no Windows e Linux. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para PostgreSQL, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/PostgreSQL, Instalação da solução SafeKit/PostgreSQL no Windows e Linux (postgresql.safe), Configuração passo a passo da solução SafeKit/PostgreSQL, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade PostgreSQL com SafeKit: Instale o Módulo postgresql.safe para Failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Visão geral da solução SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

A solução é descrita aqui: **💡 [A mais simples alta disponibilidade PostgreSQL: replicação síncrona e failover de 2 nós](</pt-br/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/PostgreSQL no Windows e Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter PostgreSQL instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-br app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-br app="PostgreSQL" mod="postgresql"  %}}
 

## Configuração passo a passo da solução SafeKit/PostgreSQL {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-pt-br app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}