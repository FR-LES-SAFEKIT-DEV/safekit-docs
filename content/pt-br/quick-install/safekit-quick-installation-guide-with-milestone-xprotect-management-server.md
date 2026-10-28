---
title: "Alta disponibilidade do Milestone XProtect com SafeKit: instale o módulo milestone.safe para failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implante o módulo milestone.safe do SafeKit para habilitar a replicação síncrona em tempo real e o failover automático do Milestone XProtect no Windows. Este guia explica como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de instalação rápida de alta disponibilidade para Milestone XProtect, Limitações de alta disponibilidade do SafeKit, Visão geral da solução SafeKit / Milestone XProtect, Instalação da solução SafeKit / Milestone XProtect no Windows (milestone.safe), Configuração passo a passo da solução SafeKit / Milestone XProtect, Demonstração da solução mirror do SafeKit, 🔍 Central de navegação de alta disponibilidade do SafeKit"
---

# Alta disponibilidade do Milestone XProtect com SafeKit: instale o módulo milestone.safe para failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Milestone XProtect" mod="milestone"  %}}


## Visão geral da solução SafeKit / Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

A solução está descrita aqui: **💡[A alta disponibilidade mais simples para Milestone XProtect: replicação síncrona de 2 nós e failover](</pt-br/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit / Milestone XProtect no Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Pré-requisitos {#prerequisites}

  * O Milestone XProtect Management e o SQL devem estar instalados em 2 nós (máquinas virtuais ou servidores físicos). O SQL Server e o Event Server podem ser externos; consulte as observações abaixo.


ℹ️ Observação: o SQL Server pode ser externo. Nesse caso, na etapa 4 da configuração passo a passo do milestone.safe:

  * remova a replicação das pastas SQL Data e Log,
  * remova o verificador de processo do sqlservr.exe,
  * remova o MSSQLServer da macro SERVICES.


Você pode implementar redundância para o SQL Server externo com **💡[SafeKit e o módulo sqlserver.safe](</pt-br/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

Nesse caso, nos dois nós de Management, configure a [conexão do Milestone Management ao SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) usando o endereço IP virtual do módulo sqlserver.safe (chave do Registro HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Observação: o Event Server pode ser externo ao Management Server.

Nesse caso, há 2 clusters com 2 instalações do milestone.safe: uma para o cluster de Management e outra para o cluster de Event.

Para o cluster de Management, na etapa 4 da configuração passo a passo do milestone.safe:

  * remova o MilestoneEventServerService da macro SERVICES.


E para o cluster de Event, na etapa 4 da configuração passo a passo do milestone.safe:

  * remova da macro SERVICES: MSSQLServer, Milestone XProtect Management Server e Milestone XProtect Log Server,
  * remova a replicação das pastas SQL Data e Log,
  * remova o verificador de processo do sqlservr.exe,
  * durante a configuração passo a passo, [registre](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) o Event Server com o endereço IP virtual do **cluster de Management** (ou instale o Event Server pelo Download Manager e defina o endereço IP virtual do **cluster de Management** durante a instalação),
  * no Milestone management client, defina o Event Server com o endereço IP virtual do **cluster de Event** em [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redundância dos gravadores {#ℹ-recorder-redundancy}

  * A replicação de gravadores não é adequada para o SafeKit devido ao volume de dados.
  * A solução integrada ao Milestone pode ser usada (servidor de gravação em failover sem replicação em tempo real).
  * Dois gravadores também podem operar em uma configuração ativa/ativa, com as câmeras distribuídas para evitar a perda de todas as câmeras da mesma área em caso de falha.
  * O fluxo de cada câmera também pode ser enviado a dois gravadores com a solução [Vega / RMF](<https://vega25.com/>).


ℹ️ Se você migrar o Milestone da versão N para a N+1 em um cluster SafeKit, leia este artigo: 🛠️ [Migração do Milestone Management com SafeKit](</pt-br/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-pt-br app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="Milestone XProtect and SQL" mod="milestone"  %}}


## Configuração passo a passo da solução SafeKit / Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-pt-br app="Milestone XProtect and SQL" mod="milestone"  %}}


## Demonstração da solução mirror do SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
