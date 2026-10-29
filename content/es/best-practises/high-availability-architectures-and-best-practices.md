---
title: "Arquitecturas de alta disponibilidad y mejores prácticas para la agrupación de software"
canonical: "https://safekit.eviden.com/es/best-practises/high-availability-architectures-and-best-practices/"
description: "Explore las arquitecturas de alta disponibilidad (HA) y las mejores prácticas para la agrupación de aplicaciones. Descubra cómo el software SafeKit implementa los clústeres mirror y farm sin discos compartidos, lo que garantiza la ausencia de pérdida de datos y la conmutación por error automática para aplicaciones críticas."
category: "best-practises"
lang: "es"
topics: "¿Cuáles son las arquitecturas de alta disponibilidad y las mejores prácticas?, Tablas comparativas sobre arquitecturas de alta disponibilidad y mejores prácticas, 🔍 SafeKit Centro de navegación de alta disponibilidad"
---

# Arquitecturas de alta disponibilidad y mejores prácticas de agrupación de software {#high-availability-architectures--software-clustering-best-practices}

## ¿Cuáles son las arquitecturas de alta disponibilidad y las mejores prácticas? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Descripción general {#overview}

Este artículo explora las diferentes arquitecturas de alta disponibilidad y las mejores prácticas, presentando las ventajas y desventajas de cada una.


Arquitecturas de alta disponibilidad y mejores prácticas ![ ](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


Las siguientes tablas comparativas explican en detalle la arquitectura de alta disponibilidad SafeKit y sus mejores prácticas ( SafeKit es un producto de software de alta disponibilidad).

### ¿Qué son las arquitecturas de alta disponibilidad? {#what-are-the-high-availability-architectures}

Hay dos tipos de arquitecturas de alta disponibilidad [ ](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>) : las destinadas a aplicaciones de backend, como bases de datos, y las destinadas a aplicaciones de frontend, como servicios web.

Las arquitecturas de alta disponibilidad para el backend se basan en dos servidores que comparten o replican datos, con una conmutación por error automática de la aplicación en caso de fallos de hardware o software.

Las arquitecturas de alta disponibilidad para el frontend se basan en un <span class="notranslate farm-term" translate="no">farm</span> de servidores (2 servidores o más). El balanceo de carga se realiza mediante hardware o software y distribuye las sesiones TCP a los servidores disponibles en el farm .

Además, hay que elegir entre alta disponibilidad a nivel de aplicación o a nivel de máquina virtual.

### ¿Cuáles son las mejores prácticas? {#what-are-the-best-practices}

Este artículo explora las mejores prácticas en arquitecturas de alta disponibilidad mediante la comparación de:

  * [ agrupamiento por software frente a clúster por hardware ](</es/best-practises/clustering-software-vs-hardware-clustering/>) ,
  * Arquitectura de disco compartido [ sin recursos compartidos frente a arquitectura de disco compartido ](</es/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>) ,
  * Aplicación [ frente a alta disponibilidad de máquina virtual ](</es/best-practises/vm-ha-vs-application-ha/>) ,
  * [ alta disponibilidad frente a tolerancia a fallos ](</es/best-practises/high-availability-cluster-vs-fault-tolerant-system/>) ,
  * [ replicación síncrona frente a asíncrona ](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>) ,
  * [ replicación de archivos frente a replicación de disco ](</es/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) ,
  * Técnicas de replicación de datos [ ](</es/best-practises/data-replication-techniques/>) ,
  * [ RPO y RTO con ejemplos ](</es/best-practises/what-is-rpo-and-rto-with-examples/>) ,
  * [ cerebro dividido y quórum ](</es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) ,
  * Direcciones IP virtuales [ ](</es/best-practises/how-a-virtual-ip-address-works/>) .


## Tablas comparativas sobre arquitecturas de alta disponibilidad y mejores prácticas {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}