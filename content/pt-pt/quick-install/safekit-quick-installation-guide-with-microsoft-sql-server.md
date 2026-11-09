---
title: "Alta Disponibilidade Microsoft SQL Server com SafeKit: Instale o Módulo sqlserver.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Implemente o módulo sqlserver.safe para SafeKit para ativar a replicação síncrona em tempo real e o failover automático para Microsoft SQL Server. Este guia explica como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Microsoft SQL Server, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Microsoft SQL Server, Instalação da solução SafeKit/Microsoft SQL Server no Windows (sqlserver.safe), Configuração passo a passo da solução SafeKit/Microsoft SQL Server, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Microsoft SQL Server com SafeKit: Instale o Módulo sqlserver.safe para Failover {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Visão geral da solução SafeKit/Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Para uma visão geral detalhada da solução, consulte **💡 [A Mais Simples Alta Disponibilidade Microsoft SQL Server: Replicação Síncrona e Failover de 2 Nós](</pt-pt/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/Microsoft SQL Server no Windows (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter Microsoft SQL Server instalado em 2 nós (máquinas virtuais ou servidores físicos).
  * SafeKit funciona com todas as versões do SQL, incluindo o SQL Express.


  * As [bases de dados do sistema SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf e mastlog.ldf) devem estar localizadas nos mesmos diretórios em ambos os nós. Os diretórios serão configurados como replicados no passo 4 da configuração passo a passo.
  * O SQL também deve ser instalado no mesmo local no sistema de ficheiros em ambos os nós, porque a [base de dados de recursos SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) de apenas leitura está localizada no binário e é necessária para a comutação de falha. Esta base de dados não precisa de ser replicada.
  * As bases de dados de utilizador SQL (.mdf e .ldf) devem estar localizadas nos mesmos diretórios em ambos os nós. Os diretórios serão configurados como replicados no passo 4 da configuração passo a passo.



{{%  insert-safekit-installation-package-windows-pt-pt app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configuração passo a passo da solução SafeKit/Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}