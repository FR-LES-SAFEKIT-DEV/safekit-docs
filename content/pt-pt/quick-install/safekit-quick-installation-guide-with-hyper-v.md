---
title: "Alta Disponibilidade Hyper-V com SafeKit: Instale o Módulo hyperv.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "Saiba como configurar hyperv.safe para um cluster Hyper-V ativo/ativo com SafeKit. Obtenha alta disponibilidade ao nível da VM com uma arquitetura de 2 nós sem compartilhamento. Replique de forma síncrona várias VMs entre nós para failover automático sem o custo de uma SAN ou armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Hyper-V, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Hyper-V, Instalação da solução SafeKit/Hyper-V no Windows (hyperv.safe), Configuração passo a passo da solução SafeKit/Hyper-V, Demonstração da solução SafeKit/Hyper-V, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Hyper-V com SafeKit: Instale o Módulo hyperv.safe para Failover {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Hyper-V" mod="hyperv"  %}}
 

## Visão geral da solução SafeKit/Hyper-V {#overview-of-the-safekit--hyper-v-solution}

A solução é descrita aqui: **💡 [Simples Alta Disponibilidade Hyper-V Sem Armazenamento Partilhado (SAN)](</pt-pt/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Instalação da solução SafeKit/Hyper-V no Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Pré-requisitos {#prerequisites}

  * A função Hyper-V está instalada em 2 nós Windows (incluída gratuitamente em todas as versões Windows, incluindo Windows para PC).
  * Aplicações críticas instaladas dentro de uma ou mais máquinas virtuais.
  * Máximo de 32 máquinas virtuais por anfitrião Hyper-V.
  * O total de dados replicados é limitado a alguns terabytes — para além disso, o tempo de resincronização torna-se significativo.
  * Interconexão mínima de 1 Gb/s entre nós (10 Gb/s recomendado para resincronização mais rápida).
  * A redundância de IP requer que ambos os nós estejam na mesma LAN ou LAN estendida (L2) — redes L3 com encaminhamento não são suportadas (exceto com [balanceadores de carga em nuvem](</pt-pt/resources/safekit-user-guide-82/#Cloud>) 🛠️).



{{%  insert-safekit-siemens-license-pt-pt  %}}

{{%  insert-safekit-installation-package-windows-pt-pt app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="Hyper-V" mod="hyperv"  %}}
 

## Configuração passo a passo da solução SafeKit/Hyper-V {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-pt-pt app="Hyper-V" mod="hyperv"  %}}
 

## Demonstração da solução SafeKit/Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}