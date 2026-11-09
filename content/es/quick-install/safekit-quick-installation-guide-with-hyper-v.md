---
title: "Alta disponibilidad Hyper-V con SafeKit: Instale el módulo hyperv.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "Aprenda a configurar hyperv.safe para un clúster Hyper-V activo/activo con SafeKit. Consiga alta disponibilidad a nivel de máquina virtual con una arquitectura de 2 nodos sin recursos compartidos. Replique varias máquinas virtuales de forma síncrona entre nodos para una conmutación por error automática sin el coste de una SAN o almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Hyper-V, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/Hyper-V, Instalación de la solución SafeKit/Hyper-V en Windows (hyperv.safe), Configuración paso a paso de la solución SafeKit/Hyper-V, Demostración de la solución SafeKit/Hyper-V, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilidad Hyper-V con SafeKit: Instale el módulo hyperv.safe para la conmutación por error {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Hyper-V" mod="hyperv"  %}}
 

## Descripción general de la solución SafeKit/Hyper-V {#overview-of-the-safekit--hyper-v-solution}

La solución se describe aquí: **💡 [Alta disponibilidad sencilla Hyper-V sin almacenamiento compartido (SAN)](</es/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Instalación de la solución SafeKit/Hyper-V en Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Requisitos previos {#prerequisites}

  * El rol de Hyper-V está instalado en 2 nodos Windows (incluido de forma gratuita en todas las versiones Windows, incluida Windows para PC).
  * Aplicaciones críticas instaladas en una o varias máquinas virtuales.
  * Máximo de 32 máquinas virtuales por host Hyper-V.
  * Los datos replicados totales se limitan a unos pocos terabytes; más allá de esto, el tiempo de resincronización se vuelve significativo.
  * Interconexión mínima de 1 Gb/s entre nodos (se recomiendan 10 Gb/s para una resincronización más rápida).
  * La conmutación por error de IP requiere que ambos nodos estén en la misma LAN o LAN extendida (L2); las redes L3 enrutadas no son compatibles (excepto con [balanceadores de carga en la nube](</es/resources/safekit-user-guide-82/#Cloud>) 🛠️).



{{%  insert-safekit-siemens-license-es  %}}

{{%  insert-safekit-installation-package-windows-es app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="Hyper-V" mod="hyperv"  %}}
 

## Configuración paso a paso de la solución SafeKit/Hyper-V {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-es app="Hyper-V" mod="hyperv"  %}}
 

## Demostración de la solución SafeKit/Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}