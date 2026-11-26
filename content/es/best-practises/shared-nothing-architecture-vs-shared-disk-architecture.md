---
title: "Arquitectura sin recursos compartidos frente a arquitectura de disco compartido: cómo elegir el mejor clúster de alta disponibilidad"
canonical: "https://safekit.eviden.com/es/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Compare arquitecturas sin recursos compartidos y de disco compartido para lograr una alta disponibilidad. SafeKit utiliza un enfoque sin recursos compartidos. Elimina los costes SAN y simplifica la conmutación por error. Proporciona replicación síncrona sin complejas restricciones de hardware."
category: "best-practises"
lang: "es"
topics: "Arquitectura sin recursos compartidos frente a arquitectura de disco compartido para clústeres de alta disponibilidad, arquitectura sin recursos compartidos frente a arquitectura de disco compartido: ventajas y desventajas, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
schemaType: "TechArticle"
---

# Arquitectura sin recursos compartidos frente a arquitectura de disco compartido: cómo elegir el mejor clúster de alta disponibilidad {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Arquitectura sin recursos compartidos frente a arquitectura de disco compartido para clústeres de alta disponibilidad {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Descripción general {#overview}

Este artículo compara dos arquitecturas para clústeres de alta disponibilidad: la arquitectura sin recursos compartidos y la arquitectura de disco compartido. Explica sus ventajas y desventajas. Cubre las limitaciones del hardware, el impacto en la organización de los datos de la aplicación, el tiempo de recuperación y la simplicidad de la implementación.


![arquitectura sin recursos compartidos frente a arquitectura de disco compartido](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Las tablas comparativas que se muestran a continuación detallan las diferencias entre una arquitectura de disco compartido y SafeKit. Este producto de clustering de software implementa una arquitectura sin recursos compartidos.

### ¿Qué es una arquitectura de disco compartido? {#what-is-a-shared-disk-architecture}

Una arquitectura de disco compartido se basa en dos servidores que comparten un disco. En caso de error de hardware o software, la aplicación se reinicia automáticamente en el otro servidor. El clúster de conmutación por error Microsoft es un ejemplo de una arquitectura de disco compartido. Para obtener más información, consulte [Requisitos de hardware de clúster de conmutación por error](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>).

Esta arquitectura tiene limitaciones de hardware: almacenamiento compartido externo específico, tarjetas específicas dentro de los servidores y conmutadores específicos entre los servidores y el almacenamiento compartido.

Una arquitectura de disco compartido tiene un fuerte impacto en la organización de los datos de la aplicación. Todos los datos de la aplicación deben estar ubicados en el disco compartido, de modo que la aplicación pueda reiniciarse después de una conmutación por error.

Además, en caso de conmutación por error, debe ejecutarse un procedimiento de recuperación del sistema de archivos en el disco compartido. Esto aumenta el objetivo de tiempo de recuperación (RTO).

Finalmente, la solución no es fácil de configurar. Se requieren conocimientos de hardware para configurar el hardware específico. También se requieren conocimientos de aplicaciones para colocar los datos de la aplicación en el disco compartido.

### ¿Qué es una arquitectura sin recursos compartidos? {#what-is-a-shared-nothing-architecture-}

Una arquitectura sin recursos compartidos se basa en dos servidores que replican datos en tiempo real. En caso de fallo de hardware o software, la aplicación se reinicia automáticamente en el otro servidor. SafeKit es un ejemplo de una arquitectura sin recursos compartidos.

Existen dos tipos de replicación de datos: la replicación de archivos a nivel de byte y la replicación de discos a nivel de bloque. Para obtener más información, consulte [Replicación de archivos a nivel de byte frente a replicación de discos a nivel de bloque](</es/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Este artículo considera la replicación de archivos a nivel de byte, ya que tiene muchas ventajas sobre la replicación de discos a nivel de bloque.

La arquitectura sin recursos compartidos no tiene restricciones de hardware. Los servidores pueden ser físicos o virtuales, con cualquier tipo de organización de disco. La replicación de archivos en tiempo real se ejecuta a través de la red estándar entre los servidores. [La replicación síncrona](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>) garantiza la pérdida cero de datos.

Esta arquitectura no tiene ningún impacto en la organización de los datos de la aplicación. Por ejemplo, la replicación de archivos en tiempo real funciona incluso si los datos de la aplicación están en el disco del sistema.

En caso de conmutación por error, el objetivo de tiempo de recuperación (RTO) se reduce al tiempo de reinicio de la aplicación. La aplicación se reinicia en los archivos replicados del servidor secundario.

Finalmente, la solución es muy sencilla de configurar. Solo hay que configurar las rutas de los directorios que se van a replicar.

## Arquitectura sin recursos compartidos frente a arquitectura de disco compartido: ventajas y desventajas {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}