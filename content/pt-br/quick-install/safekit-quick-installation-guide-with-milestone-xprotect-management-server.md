---
title: "Milestone XProtect Alta Disponibilidade com SafeKit: Instale o módulo milestone.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implemente o módulo milestone.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático do Milestone XProtect no Windows. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Milestone XProtect, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Milestone XProtect, Instalação da solução SafeKit/Milestone XProtect no Windows (milestone.safe), Configuração passo a passo da solução SafeKit/Milestone XProtect, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Milestone XProtect Alta Disponibilidade com SafeKit: Instale o módulo milestone.safe para Failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Milestone XProtect" mod="milestone"  %}}
 

## Visão geral da solução SafeKit/Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

A solução é descrita aqui: **💡 [O Milestone XProtect para alta disponibilidade: replicação síncrona e failover de 2 nós](</pt-br/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit/Milestone XProtect no Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter Milestone XProtect Management e o SQL instalados em 2 nós (máquinas virtuais ou servidores físicos). SQL Server e o Event Server podem ser externos, consulte as observações abaixo.


ℹ️ Observação: SQL Server pode ser externo. Nesse caso, na etapa 4, durante a configuração passo a passo do milestone.safe:

  * remover a replicação das pastas de dados e de log do SQL,
  * Remova o verificador de processo no sqlservr.exe
  * Remova o MSSQLServer da macro SERVICES.


Você pode implementar a redundância do SQL Server externo com 💡 [SafeKit e o módulo sqlserver.safe](</pt-br/solutions/sql-server-high-availability-synchronous-replication-failover/>).

Nesse caso, em ambos os nós de gerenciamento, configure a [conexão do Milestone Management ao SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) com o endereço IP virtual do módulo sqlserver.safe (chave de registro HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Observação: O servidor de eventos pode ser externo ao servidor de gerenciamento.

Nesse caso, você tem 2 clusters com 2 instalações do milestone.safe: um para o cluster de Gerenciamento, o outro para o cluster de Eventos.

Para o cluster de Gerenciamento, na etapa 4, durante a configuração passo a passo do milestone.safe:

  * Remova o MilestoneEventServerService da macro SERVICES.


E para o cluster Evento, na etapa 4 durante a configuração passo a passo do milestone.safe:

  * Remova da macro SERVIÇOS: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * remover a replicação das pastas de dados e de log do SQL,
  * Remova o verificador de processo no sqlservr.exe
  * durante a configuração passo a passo, [registre](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) o servidor de eventos com o endereço IP virtual do **cluster de gerenciamento** (ou instale o servidor de eventos a partir do Gerenciador de Downloads e defina o endereço IP virtual do **cluster de gerenciamento** durante a instalação),
  * No cliente de gerenciamento Milestone, defina o Servidor de Eventos com o endereço IP virtual do **cluster de Eventos** em [Serviços Registrados](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redundância do gravador {#ℹ-recorder-redundancy}

  * A replicação de gravadores não é adequada para SafeKit devido ao volume de dados.
  * A solução integrada ao Milestone pode ser usada (servidor de gravação de failover sem replicação em tempo real).
  * Dois gravadores também podem ser executados em uma configuração ativa/ativa e as câmeras são distribuídas de modo a não perder todas as câmeras na mesma área em caso de falha.
  * O fluxo de cada câmera também pode ser enviado para dois gravadores com a solução [Vega/RMF](<https://vega25.com/>).


ℹ️ Em caso de migração do Milestone da versão N para a versão N+1 em um cluster SafeKit, leia este artigo: 🛠️ [Migração do Gerenciamento Milestone com SafeKit](</pt-br/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-pt-br app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Configuração passo a passo da solução SafeKit/Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-pt-br app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}