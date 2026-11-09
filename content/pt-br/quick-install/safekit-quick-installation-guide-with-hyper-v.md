---
title: "Alta Disponibilidade Hyper-V com SafeKit: Instale o Módulo hyperv.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "Saiba como configurar hyperv.safe para um cluster Hyper-V ativo/ativo com SafeKit. Obtenha alta disponibilidade no nível da VM com uma arquitetura de 2 nós sem compartilhamento. Replique várias VMs de forma síncrona entre os nós para failover automático sem o custo de uma SAN ou armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Hyper-V, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Hyper-V, Instalação da solução SafeKit/Hyper-V no Windows (hyperv.safe), Configuração passo a passo da solução SafeKit/Hyper-V, Demonstração da solução SafeKit/Hyper-V, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Hyper-V com SafeKit: Instale o Módulo hyperv.safe para Failover {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Hyper-V" mod="hyperv"  %}}
 

## Visão geral da solução SafeKit/Hyper-V {#overview-of-the-safekit--hyper-v-solution}

A solução está descrita aqui: **💡 [Alta Disponibilidade Simples Hyper-V Sem Armazenamento Compartilhado (SAN)](</pt-br/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Instalação da solução SafeKit/Hyper-V no Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Pré-requisitos {#prerequisites}

  * Função Hyper-V instalada em 2 nós Windows (incorporada gratuitamente em todas as versões Windows, incluindo Windows para PC).
  * Aplicações críticas instaladas em uma ou mais máquinas virtuais.
  * Máximo de 32 máquinas virtuais por host Hyper-V.
  * Os dados replicados totais são limitados a alguns terabytes — além disso, o tempo de resincronização torna-se significativo.
  * Interconexão mínima de 1 Gb/s entre os nós (10 Gb/s recomendada para resincronização mais rápida).
  * O failover de IP requer que ambos os nós estejam na mesma LAN ou LAN estendida (L2) — redes L3 roteadas não são suportadas (exceto com [balanceadores de carga em nuvem](</pt-br/resources/safekit-user-guide-82/#Cloud>) 🛠️).



{{%  insert-safekit-siemens-license-pt-br  %}}

{{%  insert-safekit-installation-package-windows-pt-br app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="Hyper-V" mod="hyperv"  %}}
 

## Configuração passo a passo da solução SafeKit/Hyper-V {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-pt-br app="Hyper-V" mod="hyperv"  %}}
 

## Demonstração da solução SafeKit/Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}