---
title: "Alta Disponibilidade Microsoft SQL Server com SafeKit: Instale o Módulo sqlserver.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Implemente o módulo sqlserver.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático para Microsoft SQL Server. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Microsoft SQL Server, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Microsoft SQL Server, Instalação da solução SafeKit/Microsoft SQL Server no Windows (sqlserver.safe), Configuração passo a passo da solução SafeKit/Microsoft SQL Server, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Microsoft SQL Server com SafeKit: Instale o Módulo sqlserver.safe para Failover {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Visão geral da solução SafeKit/Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Para uma visão geral detalhada da solução, consulte **💡 [A mais simples alta disponibilidade Microsoft SQL Server: replicação síncrona e failover de 2 nós](</pt-br/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/Microsoft SQL Server no Windows (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter Microsoft SQL Server instalado em 2 nós (máquinas virtuais ou servidores físicos).
  * SafeKit funciona com todas as versões do SQL, incluindo o SQL Express.


  * Os [bancos de dados do sistema SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf e mastlog.ldf) devem estar localizados nos mesmos diretórios em ambos os nós. Os diretórios serão configurados como replicados na etapa 4 da configuração passo a passo.
  * O SQL também deve ser instalado no mesmo local no sistema de arquivos em ambos os nós, porque o [banco de dados de recursos SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) somente leitura está localizado no binário e é necessário para o failover. Este banco de dados não precisa ser replicado.
  * Os bancos de dados de usuários SQL (.mdf e .ldf) devem estar localizados nos mesmos diretórios em ambos os nós. Os diretórios serão configurados como replicados na etapa 4 da configuração passo a passo.



{{%  insert-safekit-installation-package-windows-pt-br app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configuração passo a passo da solução SafeKit/Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-pt-br app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}