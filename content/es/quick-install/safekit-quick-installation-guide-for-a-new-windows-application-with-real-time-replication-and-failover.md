---
title: "Alta disponibilidad en Windows con SafeKit: instale el módulo mirror.safe para failover"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Despliegue el módulo mirror.safe de SafeKit para habilitar la replicación síncrona en tiempo real y el failover automático en Windows. Esta guía le explica cómo configurar un clúster SANless de 2 nodos para aplicaciones Windows críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Windows, Limitaciones de la alta disponibilidad de SafeKit, Descripción general de la solución SafeKit / Windows, Instalación en las soluciones SafeKit / Windows (mirror.safe), Configuración paso a paso de la solución SafeKit / Windows, Demostración de la solución SafeKit mirror, 🔍 Centro de navegación de alta disponibilidad de SafeKit"
---

# Alta disponibilidad en Windows con SafeKit: instale el módulo mirror.safe para failover {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Windows" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit / Windows {#overview-of-the-safekit--windows-solution}

La solución se describe aquí: **💡[La alta disponibilidad más sencilla en Windows: replicación síncrona de 2 nodos y failover](</solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Instalación en las soluciones SafeKit / Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Requisitos previos {#prerequisites}

  * Necesita tener instalada en 2 nodos (máquinas virtuales o servidores físicos) la aplicación que desea reiniciar en SafeKit.



{{%  insert-safekit-installation-package-windows-es app="" mod="mirror"  %}}
 

Nota: el módulo genérico **mirror.safe** que va a configurar se entrega dentro del paquete.

## Configuración paso a paso de la solución SafeKit / Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-es app="Windows" mod="mirror"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-es  %}}
