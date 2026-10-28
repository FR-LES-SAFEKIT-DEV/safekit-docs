---
title: "Agrupación con redundancia N-1: Alta disponibilidad para múltiples aplicaciones con una sola copia de seguridad."
canonical: "https://safekit.eviden.com/es/architectures/n-1-redundancy/"
description: "Optimice su centro de datos con la redundancia N-1 SafeKit . Implemente N módulos mirror en N+1 servidores para brindar alta disponibilidad a múltiples aplicaciones con una única copia de seguridad compartida. Elimine los requisitos de SAN y reduzca los costos de hardware con la replicación en tiempo real para Windows y Linux . Más información."
category: "architectures"
lang: "es"
topics: "Alta disponibilidad con replicación de datos y conmutación por error de aplicaciones de N servidores a 1, 🔍 SafeKit Centro de navegación de alta disponibilidad"
---

# Agrupación de redundancia N-1: Alta disponibilidad para múltiples aplicaciones con una sola copia de seguridad {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Alta disponibilidad con replicación de datos y conmutación por error de aplicaciones de N servidores a 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### Redundancia N-1 {#n-1-redundancy}


![ SafeKit Clúster de redundancia N-1 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### ¿Cómo funciona la redundancia N-1? {#how-the-n-1-redundancy-works}

SafeKit proporciona un clúster de redundancia N-1 simple con N aplicaciones ejecutándose en N servidores y con una única copia de seguridad para la conmutación por error. En un clúster de redundancia N-1 SafeKit , cada aplicación trabaja en sus propios directorios replicados.

En caso de fallo de un servidor principal, a diferencia del clúster activo-activo [ ](</es/architectures/active-active-cluster-real-time-replication/>) , el servidor de respaldo no tiene que gestionar una doble carga de trabajo.

Esto supone que solo hay un fallo a la vez en el clúster de redundancia N-1. La solución puede soportar fallos simultáneos de varios servidores primarios, pero en ese caso el único servidor de respaldo tendrá que gestionar la carga de trabajo combinada de todos los servidores que hayan fallado.

### ¿Cómo implementar la redundancia N-1? {#how-to-implement-n-1-redundancy}

El clúster de redundancia N-1 SafeKit se configura simplemente desplegando N módulos mirror en N+1 servidores.

Tenga en cuenta que:

  * Todas las aplicaciones (Appli1, Appli2, Appli3) deben estar instaladas en la única copia de seguridad para la conmutación por error de la aplicación.
  * Cada módulo mirror tendrá su propia dirección IP virtual, sus propios directorios de archivos replicados y sus propios scripts de recuperación.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}