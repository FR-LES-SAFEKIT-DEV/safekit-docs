---
title: "Alta disponibilidade com Microsoft : Instale sqlserver.safe SafeKit failover SQL Server"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Implante o módulo sqlserver.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático para Microsoft SQL Server . Este guia orienta você na configuração de um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Microsoft , SQL Server e SafeKit Limitações de Alta Disponibilidade, Visão Geral da solução SafeKit / Microsoft SQL Server , Instalação da solução SafeKit / Microsoft SQL Server no Windows ( sqlserver.safe ), Configuração passo a passo da solução SafeKit / Microsoft SQL Server , Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade com Microsoft : Instale o módulo sqlserver.safe para SafeKit SQL Server {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Visão geral da solução SafeKit / Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Para uma visão geral detalhada da solução, consulte ** 💡 [ O mais simples Microsoft SQL Server Alta disponibilidade: replicação síncrona de 2 nós e failover ](</pt-pt/solutions/sql-server-high-availability-synchronous-replication-failover/>) ** .

## Instalação da solução SafeKit / Microsoft SQL Server em Windows ( sqlserver.safe ) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter Microsoft SQL Server instalados em 2 nós (máquinas virtuais ou servidores físicos).
  * SafeKit funciona com todas as versões do SQL, incluindo o SQL Express.


  * Os bancos de dados do sistema SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf e master.ldf) devem estar localizados nos mesmos diretórios em ambos os nós. Os diretórios serão configurados como replicados na etapa 4 da configuração passo a passo.
  * O SQL Server também deve ser instalado no mesmo local do sistema de arquivos em ambos os nós, pois o banco de dados de recursos SQL somente leitura [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) está localizado no diretório binário e é necessário para o failover. Este banco de dados não precisa ser replicado.
  * Os bancos de dados SQL do usuário (.mdf e .ldf) devem estar localizados nos mesmos diretórios em ambos os nós. Os diretórios serão configurados como replicados na etapa 4 da configuração passo a passo.



{{%  insert-safekit-installation-package-windows-pt-pt app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configuração passo a passo da solução SafeKit / Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}