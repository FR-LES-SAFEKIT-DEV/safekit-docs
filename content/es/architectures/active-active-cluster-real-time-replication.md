---
title: "Software de agrupación en clúster activo-activo con replicación en tiempo real y conmutación por error mutua."
canonical: "https://safekit.eviden.com/es/architectures/active-active-cluster-real-time-replication/"
description: "Maximice la utilización de recursos con el clúster activo-activo SafeKit . Implemente la conmutación por error mutua entre dos servidores mediante replicación síncrona en tiempo real y múltiples módulos mirror . Garantice la ausencia de pérdida de datos (RPO=0) y la recuperación automática para Windows y Linux sin SAN. Descargue la versión de prueba gratuita."
category: "architectures"
lang: "es"
topics: "¿Cómo funciona el clúster activo-activo con replicación en tiempo real?, 🔍 SafeKit Centro de navegación de alta disponibilidad"
---

# Software de agrupación en clúster activo-activo con replicación en tiempo real y conmutación por error mutua {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## ¿Cómo funciona el clúster activo-activo con replicación en tiempo real? {#how-the-active-active-cluster-with-real-time-replication-works}

### Clúster activo-activo con replicación en tiempo real {#active--active-cluster-with-real-time-replication}

Las aplicaciones se ejecutan en dos servidores con conmutación por error mutua. Cada servidor actúa como copia de seguridad del otro. Además, cada aplicación trabaja en sus propios directorios de archivos replicados.


![ SafeKit clúster activo activo con replicación en tiempo real ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Si un servidor falla en un clúster activo-activo, todas las aplicaciones permanecerán activas en ese mismo servidor. Tras reiniciar el servidor averiado, las aplicaciones volverán a ejecutarse en su servidor principal predeterminado.

### ¿Cómo funciona? {#how-it-works}

El clúster activo-activo SafeKit se configura simplemente desplegando dos módulos mirror con replicación en tiempo real. Cada módulo mirror contiene su propia configuración de dirección IP virtual, directorios replicados en tiempo real y scripts de reinicio.

Tenga en cuenta que:

  * Las dos aplicaciones, Appli1 y Appli2, deben estar instaladas en cada servidor para la conmutación por error de la aplicación.
  * Esta arquitectura no se reduce a 2 aplicaciones: se pueden implementar N módulos de aplicación en 2 servidores con un máximo de 25 módulos,
  * Cada módulo mirror tendrá su propia dirección IP virtual, sus propios directorios de archivos replicados y sus propios scripts de recuperación.


### Ejemplo de un clúster activo activo {#example-of-an-active-active-cluster}

La solución Hyper-V [ o ](</es/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) [ replicación, conmutación por error automática y equilibrio de carga de máquinas virtuales es un ejemplo de un clúster activo-activo con N módulos mirror que replican N máquinas virtuales entre dos servidores ](</es/solutions/hyper-v-replication-automatic-failover-load-balancing/>) .

En esta configuración, un módulo mirror replica una máquina virtual completa y la reinicia en caso de fallo. 

En dicho módulo no existe una dirección IP virtual, ya que al reiniciar una máquina virtual en un servidor se produce automáticamente la conmutación por error de la dirección IP física de la máquina virtual. 

Además, en esta arquitectura, una aplicación crítica se instala dentro de una máquina virtual.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}