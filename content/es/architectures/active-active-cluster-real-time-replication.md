---
title: "Software de clúster activo-activo con replicación en tiempo real y conmutación por error mutua"
canonical: "https://safekit.eviden.com/es/architectures/active-active-cluster-real-time-replication/"
description: "Maximice la utilización de los recursos con la agrupación en clústeres activa-activa SafeKit. Implemente la conmutación por error mutua entre dos servidores utilizando la replicación síncrona en tiempo real y múltiples módulos mirror. Garantice la pérdida cero de datos (RPO = 0) y la recuperación automática para Windows y Linux sin una SAN. Descargue la versión de prueba gratuita."
category: "architectures"
lang: "es"
topics: "¿Cómo funciona un clúster activo-activo con replicación en tiempo real?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
---

# Software de clúster activo-activo con replicación en tiempo real y conmutación por error mutua {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## ¿Cómo funciona un clúster activo-activo con replicación en tiempo real? {#how-the-active-active-cluster-with-real-time-replication-works}

### Clúster activo-activo con replicación en tiempo real {#active--active-cluster-with-real-time-replication}

Dos servidores ejecutan aplicaciones y se respaldan mutuamente. Esto se llama conmutación por error mutua: cada servidor es la copia de seguridad del otro servidor. Cada aplicación utiliza sus propios directorios de archivos replicados.


![Clúster activo-activo SafeKit con replicación en tiempo real](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Si un servidor falla en un clúster activo-activo, todas las aplicaciones se ejecutan en el servidor restante. Cuando el servidor fallido se reinicia, cada aplicación vuelve a su servidor primario predeterminado.

### ¿Cómo funciona? {#how-it-works}

Para configurar un clúster activo-activo con SafeKit, simplemente implemente dos módulos mirror con replicación en tiempo real. Cada módulo mirror tiene su propia configuración: una dirección IP virtual, directorios replicados en tiempo real y scripts de reinicio.

Notas:

  * Ambas aplicaciones (Appli1 y Appli2) deben estar instaladas en cada servidor para la conmutación por error de la aplicación.
  * Esta arquitectura no se limita a dos aplicaciones. Puede implementar hasta 25 módulos de aplicación en los mismos dos servidores.
  * Cada módulo mirror tiene su propia dirección IP virtual, sus propios directorios de archivos replicados y sus propios scripts de recuperación.


### Ejemplo de un clúster activo-activo {#example-of-an-active-active-cluster}

La solución 💡 [Hyper-V](</es/solutions/hyper-v-replication-automatic-failover-load-balancing/>) o 💡 [KVM](</es/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) es un ejemplo de clúster activo-activo. Esta solución proporciona replicación, conmutación por error automática y equilibrio de carga de máquinas virtuales. En este clúster, N módulos mirror replican N máquinas virtuales entre dos servidores físicos.

En esta configuración, cada módulo mirror replica una máquina virtual completa y la reinicia si se produce un error.

Este tipo de módulo no necesita una dirección IP virtual. Cuando la máquina virtual se reinicia en el otro servidor, su propia dirección IP se mueve con ella automáticamente.

En esta arquitectura, la aplicación crítica se instala dentro de una máquina virtual.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}