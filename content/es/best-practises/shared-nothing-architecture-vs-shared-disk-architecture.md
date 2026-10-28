---
title: "Arquitectura sin almacenamiento compartido frente a arquitectura de disco compartido: cómo elegir el mejor clúster de alta disponibilidad."
canonical: "https://safekit.eviden.com/es/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Compare las arquitecturas de disco compartido y sin almacenamiento compartido para lograr alta disponibilidad. Descubra cómo SafeKit utiliza un enfoque sin almacenamiento compartido para eliminar los costos de SAN, simplificar la conmutación por error y proporcionar replicación síncrona sin las complejas limitaciones de hardware."
category: "best-practises"
lang: "es"
topics: "Arquitectura sin recursos compartidos frente a arquitectura de disco compartido para clústeres de alta disponibilidad, Arquitectura sin recursos compartidos frente a arquitectura de disco compartido: ventajas y desventajas, 🔍 SafeKit Centro de navegación de alta disponibilidad"
---

# Arquitectura sin almacenamiento compartido frente a arquitectura de disco compartido: cómo elegir el mejor clúster HA {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Arquitectura sin recursos compartidos frente a arquitectura de disco compartido para clústeres de alta disponibilidad {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Descripción general {#overview}

Este artículo analiza las ventajas y desventajas de la arquitectura sin recursos compartidos frente a la arquitectura de disco compartido para clústeres de alta disponibilidad. Se examinan las limitaciones de hardware, el impacto en la organización de los datos de las aplicaciones, el tiempo de recuperación y la simplicidad de la implementación.


Arquitectura sin recursos compartidos ![ frente a arquitectura de disco compartido ](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Las siguientes tablas comparativas explican en detalle la diferencia entre la arquitectura de disco compartido y SafeKit , un producto de software de agrupación en clústeres que implementa una arquitectura sin recursos compartidos.

### ¿Qué es una arquitectura de disco compartido? {#what-is-a-shared-disk-architecture}

Una arquitectura de disco compartido (como con el clúster de conmutación por error [ Microsoft ](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>) ) se basa en 2 servidores que comparten un disco con una conmutación por error automática de la aplicación en caso de fallos de hardware o software.

Esta arquitectura tiene limitaciones de hardware: el almacenamiento compartido externo específico, las tarjetas específicas que se deben instalar dentro de los servidores y los conmutadores específicos entre los servidores y el almacenamiento compartido.

Una arquitectura de disco compartido tiene un fuerte impacto en la organización de los datos de las aplicaciones. Todos los datos de las aplicaciones deben estar localizados en el disco compartido para poder reiniciarse después de una conmutación por error.

Además, en caso de conmutación por error, el procedimiento de recuperación del sistema de archivos debe ejecutarse en el disco compartido. Esto aumenta el tiempo de recuperación (RTO).

Finalmente, la solución no es fácil de configurar, ya que se requieren conocimientos técnicos para configurar el hardware específico. Además, se requieren conocimientos de la aplicación para configurar los datos de la aplicación en el disco compartido.

### ¿Qué es una arquitectura sin recursos compartidos? {#what-is-a-shared-nothing-architecture-}

Una arquitectura sin recursos compartidos (como con [ SafeKit ](</>) ) se basa en 2 servidores que replican datos en tiempo real con una conmutación por error automática de la aplicación en caso de fallos de hardware o software.

Existen dos tipos de replicación de datos: replicación de archivos a nivel de byte [ y replicación de discos a nivel de bloque ](</es/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) ). Aquí nos centramos en la replicación de archivos a nivel de byte, ya que presenta numerosas ventajas frente a la replicación de discos a nivel de bloque.

La arquitectura sin recursos compartidos no tiene restricciones de hardware: los servidores pueden ser físicos o virtuales con cualquier tipo de organización de disco. La replicación de archivos en tiempo real ( [ síncrona ](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>) para no tener pérdida de datos) se realiza a través de la red estándar entre servidores.

Esta arquitectura no afecta la organización de los datos de la aplicación. Por ejemplo, si una aplicación tiene sus datos en el disco del sistema, la replicación de archivos en tiempo real funciona correctamente.

El tiempo de recuperación (RTO) en caso de conmutación por error se reduce al tiempo de reinicio de la aplicación en los archivos replicados del servidor secundario.

Finalmente, la solución es muy sencilla de configurar, ya que solo se configuran las rutas de los directorios que se van a replicar.

## Arquitectura sin recursos compartidos frente a arquitectura de disco compartido: ventajas y desventajas {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}