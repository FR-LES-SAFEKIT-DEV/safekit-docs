---
title: "Alta disponibilidade Nedap com SafeKit : Instale o módulo nedap.safe para failover."
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Implante o módulo nedap.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático de Nedap em Windows . Este guia orienta você na configuração de um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Nedap , Limitações de Alta Disponibilidade do SafeKit , Visão Geral da solução SafeKit / Nedap , Instalação da solução SafeKit / Nedap no Windows ( nedap.safe ), Configuração passo a passo da solução SafeKit / Nedap , Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade Nedap com SafeKit : Instale o módulo nedap.safe para failover {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Nedap" mod="nedap"  %}}
 

**📘 [ Configuração do Nedap AOES com SafeKit (PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)** : todos os detalhes estão neste documento.

## Visão geral da solução SafeKit / Nedap {#overview-of-the-safekit--nedap-solution}

A solução é descrita aqui: **💡 [ O mais simples Nedap Alta disponibilidade: replicação síncrona de 2 nós e failover ](</pt-pt/solutions/nedap-high-availability-synchronous-replication-failover/>)** .

## Instalação da solução SafeKit / Nedap em Windows ( nedap.safe ) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter Nedap AEOS e o SQL instalados em 2 nós (máquinas virtuais ou servidores físicos).
  * Com SQL Server no mesmo nó que Nedap AEOS, configure a conexão de Nedap AEOS ao SQL com o endereço IP virtual e não com o endereço IP físico do servidor. Caso contrário, o failover não funcionará. SQL Server pode ser externo; veja a nota abaixo.


ℹ️ Observação: SQL Server pode ser externo. Nesse caso, na etapa 4 durante a configuração passo a passo:

  * Remova a replicação das pastas de dados e logs do SQL Server.
  * Remova o verificador de processos em sqlservr.exe .
  * Remova o MSSQLServer da macro SERVICES.


Você pode implementar redundância do módulo externo SQL Server com os módulos 💡 [ SafeKit e sqlserver.safe ](</pt-pt/solutions/sql-server-high-availability-synchronous-replication-failover/>) . Nesse caso, configure a conexão do AEOS Nedap com o SQL usando o endereço IP virtual do módulo sqlserver.safe .


{{%  insert-safekit-installation-package-windows-pt-pt app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Configuração passo a passo da solução SafeKit / Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}