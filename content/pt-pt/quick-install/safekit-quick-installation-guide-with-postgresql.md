---
title: "Alta Disponibilidade PostgreSQL com SafeKit: Instale o Módulo postgresql.safe para o Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Guia passo a passo: instale o módulo SafeKit postgresql.safe para replicação em tempo real e failover automático do PostgreSQL em Windows ou Linux."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para PostgreSQL, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/PostgreSQL, Instalação da solução SafeKit/PostgreSQL no Windows e Linux (postgresql.safe), Configuração passo a passo da solução SafeKit/PostgreSQL, Demonstração da solução mirror SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--postgresql-solution, installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe, step-by-step-configuration-of-the-safekit--postgresql-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Alta Disponibilidade PostgreSQL com SafeKit: Instale o Módulo postgresql.safe para o Failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Visão geral da solução SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

A solução é descrita aqui: **💡 [A Mais Simples Alta Disponibilidade PostgreSQL: Replicação Síncrona e Failover de 2 Nós](</pt-pt/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/PostgreSQL no Windows e Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter PostgreSQL instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-pt app="PostgreSQL" mod="postgresql"  %}}
 

## Configuração passo a passo da solução SafeKit/PostgreSQL {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-pt-pt app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}