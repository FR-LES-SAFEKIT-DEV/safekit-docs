---
title: "Alta disponibilidade KVM com SafeKit: instalar o módulo kvm.safe para failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Saiba como configurar o kvm.safe para um cluster KVM ativo/ativo com SafeKit. Obtenha alta disponibilidade ao nível da VM com uma arquitetura de dois nós sem armazenamento partilhado. Replicar várias VMs de forma síncrona entre nós para failover automático, sem o custo de uma SAN ou de armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de instalação rápida de alta disponibilidade para KVM, Limitações da alta disponibilidade do SafeKit, Visão geral da solução SafeKit / KVM, Instalação da solução SafeKit / KVM no Linux (kvm.safe), Configuração passo a passo da solução SafeKit / KVM, Demonstração de uma solução de alta disponibilidade ao nível da VM, 🔍 Centro de navegação de alta disponibilidade SafeKit"
---

# Alta disponibilidade de KVM com SafeKit: instalar o módulo kvm.safe para failover {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="KVM" mod="kvm"  %}}
 

## Visão geral da solução SafeKit / KVM {#overview-of-the-safekit--kvm-solution}

A solução é descrita aqui: **💡[Alta disponibilidade simples de KVM em Linux sem armazenamento partilhado](</pt-pt/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Instalação da solução SafeKit / KVM no Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Pré-requisitos {#prerequisites}

  * KVM instalado em dois nós Linux.
  * Aplicações críticas instaladas em uma ou mais máquinas virtuais.
  * Máximo de 32 máquinas virtuais por host KVM.
  * Total de dados replicados limitado a alguns terabytes — além disso, o tempo de ressincronização torna-se significativo.
  * Interligação mínima de 1 Gb/s entre nós (recomenda-se 10 Gb/s para uma ressincronização mais rápida).
  * O failover de IP requer que ambos os nós estejam na mesma LAN ou numa LAN estendida (L2); redes L3 encaminhadas não são suportadas (exceto com 🛠️ [balanceadores de carga na nuvem](</pt-pt/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-pt-pt app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-pt app="KVM" mod="kvm"  %}}
 

## Configuração passo a passo da solução SafeKit/ KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-pt-pt app="KVM" mod="kvm"  %}}
 

## Demonstração de uma solução de alta disponibilidade de nível VM {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}