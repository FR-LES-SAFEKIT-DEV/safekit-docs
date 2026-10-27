---
title: "KVM de alta disponibilidad con SafeKit: instale el módulo kvm.safe para conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Obtenga información sobre la configuración de kvm.safe para un clúster KVM activo/activo con SafeKit. Logre una alta disponibilidad a nivel de VM con una arquitectura de 2 nodos de nada compartido. Replicar sincrónicamente varias máquinas virtuales a través de nodos para la conmutación por error automática sin el coste de un SAN o almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para KVM, limitaciones de alta disponibilidad de SafeKit, descripción general de la solución SafeKit / KVM, instalación de la solución SafeKit / KVM en Linux (kvm.safe), configuración paso a paso de la solución SafeKit / KVM, demostración de una solución de alta disponibilidad a nivel de VM, 🔍 SafeKit High Availability Navigation Hub"
---

# Alta disponibilidad de KVM con SafeKit: instalar el módulo kvm.safe para la conmutación por error {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="KVM" mod="kvm"  %}}
 

## Descripción general de la solución SafeKit / KVM {#overview-of-the-safekit--kvm-solution}

La solución se describe aquí: **💡[Alta disponibilidad sencilla de KVM en Linux sin almacenamiento compartido](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Instalación de la solución SafeKit / KVM en Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Requisitos previos {#prerequisites}

  * KVM instalado en dos nodos Linux.
  * Aplicaciones críticas instaladas dentro de una o más máquinas virtuales.
  * Máximo de 32 máquinas virtuales por host KVM.
  * El total de datos replicados se limita a unos pocos terabytes; más allá de esto, el tiempo de resincronización se vuelve significativo.
  * Interconexión mínima de 1 Gb/s entre nodos (se recomiendan 10 Gb/s para una resincronización más rápida).
  * La conmutación por error de IP requiere que ambos nodos estén en la misma LAN o en una LAN extendida (L2); no se admiten redes L3 enrutadas (salvo con 🛠️ [balanceadores de carga en la nube](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-es app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-es app="KVM" mod="kvm"  %}}
 

## Configuración paso a paso de la solución SafeKit/ KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-es app="KVM" mod="kvm"  %}}
 

## Demostración de una solución de alta disponibilidad a nivel de VM {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}