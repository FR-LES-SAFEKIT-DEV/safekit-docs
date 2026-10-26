---
title: "Alta disponibilidade do Hyper-V com SafeKit: instale o módulo
  hyperv.safe para failover"
canonical: https://safekit.eviden.com/pt-br/pt-br/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: Saiba mais sobre como configurar o hyperv.safe para um cluster
  Hyper-V ativo/ativo com SafeKit. Obtenha alta disponibilidade no nível da VM
  com uma arquitetura de 2 nós sem compartilhamento. Replique de forma síncrona
  várias VMs entre nós para failover automático sem o custo de uma SAN ou
  armazenamento compartilhado.
category: quick-install
lang: pt-br
topics: Guia de instalação rápida de alta disponibilidade para Hyper-V,
  Limitações de alta disponibilidade do SafeKit, Visão geral da solução SafeKit
  / Hyper-V, Instalação da solução SafeKit / Hyper-V no Windows (hyperv.safe),
  Configuração passo a passo da solução SafeKit / Hyper-V, Demonstração da
  solução SafeKit / Hyper-V, 🔍 SafeKit High Availability Navigation Hub
---

# Alta disponibilidade Hyper-V com SafeKit: Instale o módulo hyperv.safe para failover {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Hyper-V" mod="hyperv"  %}}
 

## Visão geral da solução SafeKit / Hyper-V {#overview-of-the-safekit--hyper-v-solution}

A solução é descrita aqui: **💡[Simples Hyper-V Alta disponibilidade sem armazenamento compartilhado (SAN)](</pt-br/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Instalação da solução SafeKit/Hyper-V no Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Pré-requisitos {#prerequisites}

  * Função Hyper-V instalada em 2 nós Windows (incorporada gratuitamente em todas as versões Windows, incluindo Windows para PC).
  * Aplicativos críticos instalados em uma ou mais máquinas virtuais.
  * Máximo de 32 máquinas virtuais por host Hyper-V.
  * Total de dados replicados limitado a alguns terabytes — além disso, o tempo de ressincronização torna-se significativo.
  * Interconexão mínima de 1 Gb/s entre nós (10 Gb/s recomendados para ressincronização mais rápida).
  * O failover IP requer ambos os nós no mesmo LAN ou LAN estendido (L2) — redes L3 roteadas não suportadas (exceto com 🛠️ [cloud load balancers](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-pt-br  %}}

{{%  insert-safekit-installation-package-windows-pt-br app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="Hyper-V" mod="hyperv"  %}}
 

## Configuração passo a passo da solução SafeKit / Hyper-V {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-pt-br app="Hyper-V" mod="hyperv"  %}}
 

## Demonstração da solução SafeKit/Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}