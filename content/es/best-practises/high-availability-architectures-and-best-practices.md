---
title: "Arquitecturas de alta disponibilidad y buenas prácticas de clustering de software"
canonical: "https://safekit.eviden.com/es/best-practises/high-availability-architectures-and-best-practices/"
description: "Explore las arquitecturas de alta disponibilidad (HA) y las buenas prácticas para clústeres de aplicaciones. Descubra cómo SafeKit implementa clústeres Mirror y Farm sin discos compartidos, evitando la pérdida de datos y ofreciendo conmutación automática por error para aplicaciones críticas."
category: "best-practises"
lang: "es"
topics: "Cuáles son las arquitecturas de alta disponibilidad y las buenas prácticas, Tablas comparativas de arquitecturas de alta disponibilidad y buenas prácticas, Centro de navegación de alta disponibilidad SafeKit"
---

# Arquitecturas de alta disponibilidad y buenas prácticas de clustering de software {#high-availability-architectures--software-clustering-best-practices}

## ¿Cuáles son las arquitecturas de alta disponibilidad y las buenas prácticas? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Descripción general {#overview}

Este artículo presenta distintas arquitecturas de alta disponibilidad y buenas prácticas, y compara las ventajas y desventajas de cada una.

![Arquitecturas de alta disponibilidad y buenas prácticas](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")

Las siguientes tablas comparativas detallan la arquitectura de alta disponibilidad de SafeKit y sus buenas prácticas. SafeKit es un producto de software para alta disponibilidad.

### ¿Cuáles son las arquitecturas de alta disponibilidad? {#what-are-the-high-availability-architectures}

Hay dos tipos de [arquitecturas de alta disponibilidad](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>): las destinadas a aplicaciones de back-end, como las bases de datos, y las destinadas a aplicaciones de front-end, como los servicios web.

Las arquitecturas de back-end se basan en dos servidores que comparten o replican datos y realizan una conmutación automática de la aplicación ante fallos de hardware o software.

Las arquitecturas de front-end se basan en una granja de dos o más servidores. El equilibrio de carga, por hardware o software, distribuye las sesiones TCP entre los servidores disponibles.

También hay que elegir entre alta disponibilidad a nivel de aplicación y a nivel de máquina virtual.

### ¿Cuáles son las buenas prácticas? {#what-are-the-best-practices}

Este artículo analiza las buenas prácticas de las arquitecturas de alta disponibilidad mediante la comparación de:

  * [clustering de software y hardware](</es/best-practises/clustering-software-vs-hardware-clustering/>),
  * [arquitectura sin recursos compartidos y con disco compartido](</es/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [alta disponibilidad de aplicación y de máquina virtual](</es/best-practises/vm-ha-vs-application-ha/>),
  * [alta disponibilidad y tolerancia a fallos](</es/best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [replicación síncrona y asíncrona](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [replicación de archivos y de discos](</es/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [técnicas de replicación de datos](</es/best-practises/data-replication-techniques/>),
  * [RPO y RTO con ejemplos](</es/best-practises/what-is-rpo-and-rto-with-examples/>),
  * [split-brain y quórum](</es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [direcciones IP virtuales](</es/best-practises/how-a-virtual-ip-address-works/>).

## Tablas comparativas de arquitecturas de alta disponibilidad y buenas prácticas {#comparative-tables-on-high-availability-architectures-and-best-practices}

{{% insert-safekit-software-vs-hardware-table-es %}}

{{% insert-safekit-hub-es %}}

{{% insert-safekit-4-buttons-es %}}