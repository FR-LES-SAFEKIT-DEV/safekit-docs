---
title: "Alta disponibilidade do PostgreSQL com SafeKit: Instale o módulo postgresql.safe para failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Implante o módulo postgresql.safe para SafeKit para permitir replicação síncrona em tempo real e failover automático de PostgreSQL no Windows e Linux. Este guia orienta você na configuração de um cluster sem SAN de 2 nós para aplicativos críticos sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de instalação rápida de alta disponibilidade para PostgreSQL, Limitações de alta disponibilidade do SafeKit, Visão geral da solução SafeKit / PostgreSQL, Instalação da solução SafeKit / PostgreSQL no Windows e Linux (postgresql.safe), Configuração passo a passo da solução SafeKit / PostgreSQL, Demonstração da solução de espelho SafeKit, 🔍 SafeKit High Availability Navigation Hub"
---

# Alta disponibilidade do PostgreSQL com SafeKit: Instale o módulo postgresql.safe para failover {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Visão geral da solução SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

A solução é descrita aqui: **💡[A alta disponibilidade mais simples do PostgreSQL: replicação síncrona e failover de 2 nós](</pt-br/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/PostgreSQL em Windows e Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa do PostgreSQL instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-br app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-br app="PostgreSQL" mod="postgresql"  %}}
 

## Configuração passo a passo da solução SafeKit/PostgreSQL {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-pt-br app="PostgreSQL" mod="postgresql"  %}}
 

## Demonstração da solução de espelho SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}