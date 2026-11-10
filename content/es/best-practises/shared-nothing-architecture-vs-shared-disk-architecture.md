---
title: "Arquitectura sin recursos compartidos frente a arquitectura de disco compartido: cómo elegir el mejor clúster de alta disponibilidad"
canonical: "https://safekit.eviden.com/es/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Compare arquitecturas sin recursos compartidos y de disco compartido para lograr una alta disponibilidad. Descubra cómo SafeKit utiliza un enfoque sin recursos compartidos para eliminar los costes SAN, simplificar la conmutación por error y proporcionar una replicación síncrona sin complejas restricciones de hardware."
category: "best-practises"
lang: "es"
topics: "Arquitectura sin recursos compartidos frente a arquitectura de disco compartido para clústeres de alta disponibilidad, arquitectura sin recursos compartidos frente a arquitectura de disco compartido: ventajas y desventajas, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-10.3 | glossaire 2026-11-10.5 | Translation LLM | 46 expressions"
---

# Arquitectura sin recursos compartidos frente a arquitectura de disco compartido: cómo elegir el mejor clúster de alta disponibilidad {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Arquitectura sin recursos compartidos frente a arquitectura de disco compartido para clústeres de alta disponibilidad {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Descripción general {#overview}

Este artículo explora las ventajas y desventajas de la arquitectura sin recursos compartidos frente a la arquitectura de disco compartido para clústeres de alta disponibilidad. Analizamos las limitaciones del hardware, el impacto en la organización de los datos de la aplicación, el tiempo de recuperación y la simplicidad de la implementación.


![arquitectura sin recursos compartidos frente a arquitectura de disco compartido](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Las siguientes tablas comparativas explican en detalle la diferencia entre la arquitectura de disco compartido y SafeKit, un producto de clustering de software que implementa una arquitectura sin recursos compartidos.

### ¿Qué es una arquitectura de disco compartido? {#what-is-a-shared-disk-architecture}

Una arquitectura de disco compartido (como con [el clúster de conmutación por error Microsoft](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)) se basa en 2 servidores que comparten un disco con una conmutación por error de aplicación automática en caso de fallos de hardware o software.

Esta arquitectura tiene limitaciones de hardware: el almacenamiento compartido externo específico, las tarjetas específicas para instalar dentro de los servidores y los conmutadores específicos entre los servidores y el almacenamiento compartido.

Una arquitectura de disco compartido tiene un fuerte impacto en la organización de los datos de la aplicación. Todos los datos de la aplicación deben estar localizados en el disco compartido para un reinicio después de una conmutación por error.

Además, en caso de conmutación por error, el procedimiento de recuperación del sistema de archivos debe ejecutarse en el disco compartido. Esto aumenta el tiempo de recuperación (RTO).

Finalmente, la solución no es fácil de configurar porque se requieren habilidades para configurar el hardware específico. Además, se requieren habilidades de aplicación para configurar los datos de la aplicación en el disco compartido.

### ¿Qué es una arquitectura sin recursos compartidos? {#what-is-a-shared-nothing-architecture-}

Una arquitectura sin recursos compartidos (como con [SafeKit](</es/>)) se basa en 2 servidores que replican datos en tiempo real con una conmutación por error automática de la aplicación en caso de fallos de hardware o software.

Hay dos tipos de replicación de datos: [replicación de archivos a nivel de byte frente a replicación de disco a nivel de bloque](</es/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Aquí consideramos la replicación de archivos a nivel de byte porque tiene muchas ventajas sobre la replicación de disco a nivel de bloque.

La arquitectura sin recursos compartidos no tiene restricciones de hardware: los servidores pueden ser físicos o virtuales con cualquier tipo de organización de disco. La replicación de archivos en tiempo real ([síncrona](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>) para una pérdida de datos cero) se realiza a través de la red estándar entre servidores.

Esta arquitectura no tiene ningún impacto en la organización de los datos de la aplicación. Por ejemplo, si una aplicación tiene sus datos en el disco del sistema, la replicación de archivos en tiempo real funciona.

El tiempo de recuperación (RTO) en caso de conmutación por error se reduce al tiempo de reinicio de la aplicación en los archivos replicados del servidor secundario.

Finalmente, la solución es muy sencilla de configurar, ya que solo se configuran las rutas de los directorios que se van a replicar.

## Arquitectura sin recursos compartidos frente a arquitectura de disco compartido: ventajas y desventajas {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}