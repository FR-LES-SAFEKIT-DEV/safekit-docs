---
title: "Alta Disponibilidade KVM com SafeKit: Instale o Módulo kvm.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Saiba como configurar kvm.safe para um cluster KVM ativo/ativo com SafeKit. Obtenha alta disponibilidade no nível da VM com uma arquitetura de 2 nós sem compartilhamento. Replique várias VMs de forma síncrona entre os nós para failover automático sem o custo de uma SAN ou armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para KVM, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/KVM, Instalação da solução SafeKit/KVM no Linux (kvm.safe), Configuração passo a passo da solução SafeKit/KVM, Demonstração de uma solução de alta disponibilidade em nível de máquina virtual, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade KVM com SafeKit: Instale o Módulo kvm.safe para Failover {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="KVM" mod="kvm"  %}}
 

## Visão geral da solução SafeKit/KVM {#overview-of-the-safekit--kvm-solution}

A solução é descrita aqui: **💡 [Alta Disponibilidade Simples de KVM Linux sem Armazenamento Compartilhado](</pt-br/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Instalação da solução SafeKit/KVM no Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Pré-requisitos {#prerequisites}

  * KVM instalado em 2 nós Linux.
  * Aplicações críticas instaladas em uma ou mais máquinas virtuais.
  * Máximo de 32 máquinas virtuais por host KVM.
  * Os dados replicados totais são limitados a alguns terabytes — além disso, o tempo de resincronização torna-se significativo.
  * Interconexão mínima de 1 Gb/s entre os nós (10 Gb/s recomendada para resincronização mais rápida).
  * O failover de IP requer que ambos os nós estejam na mesma LAN ou LAN estendida (L2) — redes L3 roteadas não são suportadas (exceto com [balanceadores de carga em nuvem](</pt-br/resources/safekit-user-guide-82/#Cloud>) 🛠️).



{{%  insert-safekit-installation-package-linux-pt-br app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-br app="KVM" mod="kvm"  %}}
 

## Configuração passo a passo da solução SafeKit/KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-pt-br app="KVM" mod="kvm"  %}}
 

## Demonstração de uma solução de alta disponibilidade em nível de máquina virtual {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}