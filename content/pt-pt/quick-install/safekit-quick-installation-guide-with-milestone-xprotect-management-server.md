---
title: "Milestone XProtect Alta Disponibilidade com SafeKit: Instale o módulo milestone.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implemente o módulo milestone.safe para SafeKit para permitir a replicação síncrona em tempo real e o failover automático do Milestone XProtect no Windows. Este guia explica como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Milestone XProtect, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Milestone XProtect, Instalação da solução SafeKit/Milestone XProtect no Windows (milestone.safe), Configuração passo a passo da solução SafeKit/Milestone XProtect, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Milestone XProtect Alta Disponibilidade com SafeKit: Instale o módulo milestone.safe para Failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Milestone XProtect" mod="milestone"  %}}
 

## Visão geral da solução SafeKit/Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

A solução é descrita aqui: **💡 [A Solução Mais Simples para Alta Disponibilidade Milestone XProtect: Replicação Síncrona e Failover de 2 Nós](</pt-pt/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/Milestone XProtect no Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter Milestone XProtect Management e o SQL instalados em 2 nós (máquinas virtuais ou servidores físicos). SQL Server e o Event Server podem ser externos, consulte as notas abaixo.


ℹ️ Nota: SQL Server pode ser externo. Neste caso, no passo 4, durante a configuração passo a passo do milestone.safe:

  * remover a replicação das pastas de dados e de registos do SQL,
  * Remova o verificador de processos em sqlservr.exe,
  * remover o MSSQLServer da macro SERVICES.


Pode implementar redundância do SQL Server externo com 💡 [SafeKit e o módulo sqlserver.safe](</pt-pt/solutions/sql-server-high-availability-synchronous-replication-failover/>).

Neste caso, em ambos os nós de gestão, configure a [ligação do Milestone Management ao SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) com o endereço IP virtual do módulo sqlserver.safe (chave de registo HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Nota: O servidor de eventos pode ser externo ao servidor de gestão.

Neste caso, tem 2 clusters com 2 instalações do milestone.safe: um para o cluster de Gestão, o outro para o cluster de Eventos.

Para o cluster de Gestão, no passo 4, durante a configuração passo a passo do milestone.safe:

  * Remova o MilestoneEventServerService da macro SERVICES.


E para o cluster de Eventos, no passo 4, durante a configuração passo a passo do milestone.safe:

  * remover da macro SERVIÇOS: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * remover a replicação das pastas de dados e de registos do SQL,
  * Remova o verificador de processos em sqlservr.exe,
  * durante a configuração passo a passo, [registe](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) o servidor de eventos com o endereço IP virtual do **cluster de gestão** (ou instale o servidor de eventos a partir do Gestor de Transferências e defina o endereço IP virtual do **cluster de gestão** durante a instalação),
  * No cliente de gestão Milestone, defina o Servidor de Eventos com o endereço IP virtual do **cluster de Eventos** nos [Serviços Registados](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redundância do gravador {#ℹ-recorder-redundancy}

  * A replicação de gravadores não é adequada para SafeKit devido ao volume de dados.
  * A solução integrada no Milestone pode ser utilizada (servidor de gravação de contingência sem replicação em tempo real).
  * Dois gravadores também podem funcionar numa configuração ativa/ativa e as câmaras são distribuídas de forma a não perder todas as câmaras da mesma área em caso de falha.
  * O fluxo de cada câmara também pode ser enviado para dois gravadores com a solução [Vega / RMF](<https://vega25.com/>).


ℹ️ Em caso de migração do Milestone da versão N para a versão N+1 num cluster SafeKit, leia este artigo: 🛠️ [Migração da Gestão Milestone com SafeKit](</pt-pt/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-pt-pt app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Configuração passo a passo da solução SafeKit/Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-pt-pt app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}