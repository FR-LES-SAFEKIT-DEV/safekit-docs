---
title: "Alta disponibilidad de Hyper-V con SafeKit: instale el módulo
  hyperv.safe para conmutación por error"
canonical: https://safekit.eviden.com/es/es/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: Obtenga información sobre cómo configurar hyperv.safe para un
  clúster Hyper-V activo/activo con SafeKit. Logre alta disponibilidad a nivel
  de VM con una arquitectura de 2 nodos sin compartir. Replica sincrónicamente
  varias máquinas virtuales entre nodos para una conmutación por error
  automática sin el costo de una SAN o almacenamiento compartido.
category: quick-install
lang: es
topics: Guía de instalación rápida de alta disponibilidad para Hyper-V,
  Limitaciones de alta disponibilidad de SafeKit, Descripción general de la
  solución SafeKit/Hyper-V, Instalación de la solución SafeKit/Hyper-V en
  Windows (hyperv.safe), Configuración paso a paso de la solución
  SafeKit/Hyper-V, Demostración de la solución SafeKit/Hyper-V, 🔍 Centro de
  navegación de alta disponibilidad de SafeKit
---

# Alta disponibilidad Hyper-V con SafeKit: instale el módulo hyperv.safe para conmutación por error {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Hyper-V" mod="hyperv"  %}}
 

## Descripción general de la solución SafeKit / Hyper-V {#overview-of-the-safekit--hyper-v-solution}

La solución se describe aquí: **💡[Simple Hyper-V Alta disponibilidad sin almacenamiento compartido (SAN)](</es/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Instalación de la solución SafeKit / Hyper-V en Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Requisitos previos {#prerequisites}

  * Rol Hyper-V instalado en 2 nodos Windows (integrado de forma gratuita en todas las versiones de Windows, incluido Windows para PC).
  * Aplicaciones críticas instaladas dentro de una o más máquinas virtuales.
  * Máximo 32 máquinas virtuales por host Hyper-V.
  * El total de datos replicados se limita a unos pocos terabytes; más allá de esto, el tiempo de resincronización se vuelve significativo.
  * Interconexión mínima de 1 Gb/s entre nodos (se recomiendan 10 Gb/s para una resincronización más rápida).
  * La conmutación por error de IP requiere ambos nodos en el mismo LAN o LAN extendido (L2); no se admiten redes L3 enrutadas (excepto con 🛠️ [equilibradores de carga en la nube](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-es  %}}

{{%  insert-safekit-installation-package-windows-es app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="Hyper-V" mod="hyperv"  %}}
 

## Configuración paso a paso de la solución SafeKit / Hyper-V {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-es app="Hyper-V" mod="hyperv"  %}}
 

## Demostración de la solución SafeKit / Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}