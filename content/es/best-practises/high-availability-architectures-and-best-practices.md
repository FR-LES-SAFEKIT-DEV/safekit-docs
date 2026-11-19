---
title: "Arquitecturas de alta disponibilidad y mejores prácticas de clustering de software"
canonical: "https://safekit.eviden.com/es/best-practises/high-availability-architectures-and-best-practices/"
description: "Explore las arquitecturas de alta disponibilidad (HA) y las mejores prácticas para la agrupación de aplicaciones. El software SafeKit implementa clústeres mirror y farm sin discos compartidos. Proporciona cero pérdida de datos y conmutación por error automática para aplicaciones críticas."
category: "best-practises"
lang: "es"
topics: "¿Cuáles son las arquitecturas de alta disponibilidad y las mejores prácticas?, Tablas comparativas sobre arquitecturas de alta disponibilidad y mejores prácticas, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.23 | Translation LLM | 51 expressions"
---

# Arquitecturas de alta disponibilidad y mejores prácticas de clustering de software {#high-availability-architectures--software-clustering-best-practices}

## ¿Cuáles son las arquitecturas de alta disponibilidad y las mejores prácticas? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Descripción general {#overview}

Este artículo explora las diferentes arquitecturas de alta disponibilidad y las mejores prácticas, indicando los pros y los contras de cada una.


![Arquitecturas de alta disponibilidad y mejores prácticas](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


Las siguientes tablas comparativas explican en detalle la arquitectura y las mejores prácticas de SafeKit, un software de alta disponibilidad.

### ¿Qué son las arquitecturas de alta disponibilidad? {#what-are-the-high-availability-architectures}

Existen dos tipos de arquitecturas [de alta disponibilidad](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>): las destinadas a aplicaciones de backend, como las bases de datos, y las destinadas a aplicaciones de frontend, como los servicios web.

Las arquitecturas de alta disponibilidad para el backend se basan en 2 servidores. Los servidores comparten o replican datos. En caso de fallo de hardware o software, una conmutación por error automática reinicia la aplicación en el otro servidor.

Las arquitecturas de alta disponibilidad para el frontend se basan en un <span class="notranslate farm-term" translate="no">farm</span> de servidores (2 o más servidores). El balanceo de carga se realiza mediante hardware o software y distribuye las sesiones TCP a los servidores disponibles en el farm.

Además, hay que elegir entre la alta disponibilidad a nivel de aplicación o a nivel de máquina virtual.

### ¿Cuáles son las mejores prácticas? {#what-are-the-best-practices}

Este artículo explora las mejores prácticas en arquitecturas de alta disponibilidad comparando:

  * [Clustering de software vs. clustering de hardware](</es/best-practises/clustering-software-vs-hardware-clustering/>)
  * [Arquitectura sin recursos compartidos frente a arquitectura de disco compartido](</es/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>)
  * [Alta disponibilidad de aplicaciones frente a máquinas virtuales](</es/best-practises/vm-ha-vs-application-ha/>)
  * [Alta disponibilidad frente a tolerancia a fallos](</es/best-practises/high-availability-cluster-vs-fault-tolerant-system/>)
  * [Replicación síncrona vs. asíncrona](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>)
  * [Replicación de archivos frente a replicación de discos](</es/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)
  * [Técnicas de replicación de datos](</es/best-practises/data-replication-techniques/>)
  * [RPO y RTO con ejemplos](</es/best-practises/what-is-rpo-and-rto-with-examples/>)
  * [Split brain y quórum](</es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)
  * [Direcciones IP virtuales](</es/best-practises/how-a-virtual-ip-address-works/>)


## Tablas comparativas sobre arquitecturas de alta disponibilidad y mejores prácticas {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}