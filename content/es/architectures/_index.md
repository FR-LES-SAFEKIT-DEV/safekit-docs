---
title: "Arquitecturas SafeKit"
canonical: "https://safekit.eviden.com/es/architectures/"
description: "Explore las arquitecturas de alta disponibilidad con SafeKit . Conozca los clústeres Mirror , Farm y Farm + Mirror para la conmutación por error y el equilibrio de carga de aplicaciones sin SAN."
category: "architectures"
lang: "es"
topics: "¿Cuáles son las diferentes arquitecturas de alta disponibilidad y los diferentes clústeres de software con SafeKit ?, ¿Cómo crear clústeres de alta disponibilidad con SafeKit ?, 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Arquitecturas SafeKit {#safekit-architectures}

## ¿Cuáles son las diferentes arquitecturas de alta disponibilidad y los diferentes clústeres de software con SafeKit ? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Clúster Mirror {#mirror-cluster}


](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300") ![ SafeKit mirror


[ Más información ](</es/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Clúster `Farm` {#farm-cluster}


](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300") ![ SafeKit farm


[ Más información ](</es/architectures/network-load-balancing-cluster/>)

### Clúster `Farm` + mirror {#farmmirror-cluster}


Clúster ![ farm SafeKit + mirror ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[ Más información ](</es/architectures/clustering-software-load-balancing-mirroring/>)

### Clúster activo/activo {#activeactive-cluster}


![ SafeKit clúster activo activo con replicación en tiempo real ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[ Más información ](</es/architectures/active-active-cluster-real-time-replication/>)

### Clúster N-1 {#n-1-cluster}


![ SafeKit Clúster de redundancia N-1 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[ Más información ](</es/architectures/n-1-redundancy/>)

## ¿Cómo crear clústeres de alta disponibilidad con SafeKit ? {#how-to-build-high-availability-clusters-with-safekit}

### Utilice los módulos de alta disponibilidad {#use-high-availability-modules}

Un módulo de alta disponibilidad es una personalización de SafeKit para una aplicación. Existen dos tipos de módulos: el módulo mirror con replicación de datos en tiempo real y conmutación por error, y el módulo `farm` con equilibrio de carga y conmutación por error.

Si implementa un módulo mirror en 2 servidores, creará un clúster mirror , y si implementa un módulo `farm` en N servidores, creará un clúster `farm` .

Se pueden implementar varios módulos de aplicación en los mismos servidores. De este modo, se pueden implementar arquitecturas de clúster avanzadas como las presentadas anteriormente ( `farm` + mirror , activo/activo, N-1).

### ¿Qué es un módulo de aplicación? {#what-is-an-application-module}

En la práctica, un módulo de aplicación es un archivo “.Safe” (tipo zip) que incluye:

1 - el archivo de configuración userconfig.xml que contiene:

  * nombres o direcciones IP físicas de los servidores,
  * nombre o dirección IP virtual del clúster,
  * directorios de archivos para replicar en tiempo real (para un módulo mirror ),
  * criterios de equilibrio de carga de red (para un módulo `farm` ),
  * Configuración de detectores de fallos de software y hardware


2 - los scripts para iniciar y detener la aplicación.

### Implementación plug and play de módulos de alta disponibilidad {#plug-and-play-deployment-of-high-availability-modules}

Una vez que un módulo de aplicación está configurado y probado con una aplicación, la implementación no requiere conocimientos informáticos específicos:

  1. Instalar la aplicación en 2 servidores estándar (físicos o virtuales),
  2. Instale el software SafeKit en ambos servidores,
  3. Instale el módulo de la aplicación en ambos servidores.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}