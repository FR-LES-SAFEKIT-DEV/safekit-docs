---
title: "Alta disponibilidad en Linux con SafeKit: instale el módulo mirror.safe para failover"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Despliegue el módulo mirror.safe de SafeKit para habilitar la replicación síncrona en tiempo real y el failover automático en Linux. Esta guía le explica cómo configurar un clúster SANless de 2 nodos para aplicaciones Linux críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Linux, Limitaciones de la alta disponibilidad de SafeKit, Descripción general de la solución SafeKit / Linux, Instalación de la solución SafeKit / Linux (mirror.safe), Configuración paso a paso de la solución SafeKit / Linux, Demostración de la solución SafeKit mirror, 🔍 Centro de navegación de alta disponibilidad de SafeKit"
---

# Alta disponibilidad en Linux con SafeKit: instale el módulo mirror.safe para failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Linux" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit / Linux {#overview-of-the-safekit--linux-solution}

La solución se describe aquí: **💡[La alta disponibilidad más sencilla en Linux: replicación síncrona de 2 nodos y failover](</es/solutions/linux-high-availability-software-synchronous-replication-failover/>)**.

## Instalación de la solución SafeKit / Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Requisitos previos {#prerequisites}

  * Necesita tener instalada en 2 nodos (máquinas virtuales o servidores físicos) la aplicación que desea reiniciar en SafeKit.



{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

Nota: el módulo genérico **mirror.safe** que va a configurar se entrega dentro del paquete.
Nota: el módulo genérico **mirror.safe** que va a configurar se incluye dentro del paquete.
## Configuración paso a paso de la solución SafeKit / Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-es app="Linux" mod="mirror"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-es  %}}
