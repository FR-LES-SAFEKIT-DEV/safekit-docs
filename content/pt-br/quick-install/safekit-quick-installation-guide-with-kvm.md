---
title: "KVM High Availability with SafeKit: Instale o módulo kvm.safe para failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Saiba mais sobre como configurar o kvm.safe para um cluster KVM ativo/ativo com o SafeKit. Alcance alta disponibilidade no nível da VM com uma arquitetura de dois nós sem compartilhamento de nada. Replicar de forma síncrona várias VMs entre nós para failover automático sem o custo de uma SAN ou armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para KVM, Limitações de Alta Disponibilidade do SafeKit, Visão Geral da solução SafeKit / KVM, Instalação da solução SafeKit / KVM no Linux (kvm.safe), Configuração passo a passo da solução SafeKit / KVM, Demonstração de uma solução de alta disponibilidade de nível VM, 🔍 SafeKit High Availability Navigation Hub"
---

# Alta disponibilidade de KVM com SafeKit: instalar o módulo kvm.safe para failover {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="KVM" mod="kvm"  %}}
 

## Visão geral da solução SafeKit / KVM {#overview-of-the-safekit--kvm-solution}

A solução é descrita aqui: **💡[Alta disponibilidade simples de KVM em Linux sem armazenamento partilhado](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Instalação da solução SafeKit / KVM no Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Pré-requisitos {#prerequisites}

  * KVM instalado em dois nós Linux.
  * Aplicativos críticos instalados em uma ou mais máquinas virtuais.
  * Máximo de 32 máquinas virtuais por host KVM.
  * Total de dados replicados limitado a alguns terabytes — além disso, o tempo de ressincronização torna-se significativo.
  * Interconexão mínima de 1 Gb/s entre nós (10 Gb/s recomendados para ressincronização mais rápida).
  * O failover de IP exige que os dois nós estejam na mesma LAN ou numa LAN estendida (L2); redes L3 roteadas não são suportadas (exceto com 🛠️ [balanceadores de carga na nuvem](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-pt-br app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-br app="KVM" mod="kvm"  %}}
 

## Configuração passo a passo da solução SafeKit/ KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-pt-br app="KVM" mod="kvm"  %}}
 

## Demonstração de uma solução de alta disponibilidade de nível VM {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}