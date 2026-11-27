---
title: "Alta disponibilidad KVM con SafeKit: instale el módulo kvm.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Guía paso a paso: instale el módulo SafeKit kvm.safe para alta disponibilidad a nivel de VM, con replicación y conmutación por error de máquinas virtuales KVM en Linux."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para KVM, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/KVM, Instalación de la solución SafeKit/KVM en Linux (kvm.safe), Configuración paso a paso de la solución SafeKit/KVM, Demostración de una solución de alta disponibilidad a nivel de máquina virtual"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--kvm-solution, installation-of-the-safekit--kvm-solution-on-linux-kvmsafe, step-by-step-configuration-of-the-safekit--kvm-solution, demonstration-of-a-vm-level-high-availability-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Alta disponibilidad KVM con SafeKit: instale el módulo kvm.safe para la conmutación por error {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="KVM" mod="kvm"  %}}
 

## Descripción general de la solución SafeKit/KVM {#overview-of-the-safekit--kvm-solution}

La solución se describe aquí: **💡 [Alta disponibilidad sencilla Linux KVM sin almacenamiento compartido](</es/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Instalación de la solución SafeKit/KVM en Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Requisitos previos {#prerequisites}

  * KVM instalado en 2 nodos Linux.
  * Aplicaciones críticas instaladas en una o varias máquinas virtuales.
  * Máximo de 32 máquinas virtuales por host KVM.
  * Los datos replicados totales se limitan a unos pocos terabytes; más allá de esto, el tiempo de resincronización se vuelve significativo.
  * Interconexión mínima de 1 Gb/s entre nodos (se recomiendan 10 Gb/s para una resincronización más rápida).
  * La conmutación por error de IP requiere que ambos nodos estén en la misma LAN o LAN extendida (L2); las redes L3 enrutadas no son compatibles (excepto con [balanceadores de carga en la nube](</es/resources/safekit-user-guide-82/#Cloud>) 🛠️).



{{%  insert-safekit-installation-package-linux-es app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-es app="KVM" mod="kvm"  %}}
 

## Configuración paso a paso de la solución SafeKit/KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-es app="KVM" mod="kvm"  %}}
 

## Demostración de una solución de alta disponibilidad a nivel de máquina virtual {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}