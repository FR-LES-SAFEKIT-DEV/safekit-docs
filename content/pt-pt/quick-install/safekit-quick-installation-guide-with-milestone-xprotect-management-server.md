---
title: "Alta disponibilidade de Milestone XProtect com SafeKit: instale o módulo milestone.safe para failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implemente o módulo milestone.safe do SafeKit para ativar a replicação síncrona em tempo real e o failover automático do Milestone XProtect no Windows. Este guia explica como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de instalação rápida de alta disponibilidade para Milestone XProtect, Limitações de alta disponibilidade do SafeKit, Descrição geral da solução SafeKit / Milestone XProtect, Instalação da solução SafeKit / Milestone XProtect no Windows (milestone.safe), Configuração passo a passo da solução SafeKit / Milestone XProtect, Demonstração da solução mirror do SafeKit, 🔍 Centro de navegação de alta disponibilidade do SafeKit"
---

# Alta disponibilidade de Milestone XProtect com SafeKit: instale o módulo milestone.safe para failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Milestone XProtect" mod="milestone"  %}}


## Descrição geral da solução SafeKit / Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

A solução está descrita aqui: **💡[A alta disponibilidade mais simples para Milestone XProtect: replicação síncrona de 2 nós e failover](</pt-pt/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit / Milestone XProtect no Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Pré-requisitos {#prerequisites}

  * O Milestone XProtect Management e o SQL têm de estar instalados em 2 nós (máquinas virtuais ou servidores físicos). O SQL Server e o Event Server podem ser externos; consulte as notas abaixo.


ℹ️ Nota: o SQL Server pode ser externo. Nesse caso, no passo 4 da configuração passo a passo do milestone.safe:

  * remova a replicação das pastas SQL Data e Log,
  * remova o verificador de processos de sqlservr.exe,
  * remova o MSSQLServer da macro SERVICES.


Pode implementar redundância para o SQL Server externo com **💡[SafeKit e o módulo sqlserver.safe](</pt-pt/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

Nesse caso, nos dois nós Management, configure a [ligação do Milestone Management ao SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) com o endereço IP virtual do módulo sqlserver.safe (chave do Registo HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Nota: o Event Server pode ser externo ao Management Server.

Neste caso, existem 2 clusters com 2 instalações do milestone.safe: uma para o cluster de Management e outra para o cluster de Event.

Para o cluster de Management, no passo 4 da configuração passo a passo do milestone.safe:

  * remova o MilestoneEventServerService da macro SERVICES.


E para o cluster de Event, no passo 4 da configuração passo a passo do milestone.safe:

  * remova da macro SERVICES: MSSQLServer, Milestone XProtect Management Server e Milestone XProtect Log Server,
  * remova a replicação das pastas SQL Data e Log,
  * remova o verificador de processos de sqlservr.exe,
  * durante a configuração passo a passo, [registe](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) o Event Server com o endereço IP virtual do **cluster de Management** (ou instale o Event Server a partir do Download Manager e defina o endereço IP virtual do **cluster de Management** durante a instalação),
  * no Milestone management client, defina o Event Server com o endereço IP virtual do **cluster de Event** em [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redundância dos gravadores {#ℹ-recorder-redundancy}

  * A replicação de gravadores não é adequada ao SafeKit devido ao volume de dados.
  * Pode ser utilizada a solução integrada no Milestone (servidor de gravação em failover sem replicação em tempo real).
  * Dois gravadores também podem funcionar numa configuração ativa/ativa, com as câmaras distribuídas para não perder todas as câmaras da mesma área em caso de falha.
  * O fluxo de cada câmara também pode ser enviado para dois gravadores com a solução [Vega / RMF](<https://vega25.com/>).


ℹ️ Em caso de migração do Milestone da versão N para a versão N+1 num cluster SafeKit, leia este artigo: 🛠️ [Migração do Milestone Management com SafeKit](</pt-pt/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-pt-pt app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="Milestone XProtect and SQL" mod="milestone"  %}}


## Configuração passo a passo da solução SafeKit / Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-pt-pt app="Milestone XProtect and SQL" mod="milestone"  %}}


## Demonstração da solução mirror do SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
