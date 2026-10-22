---
title: "Arquitecturas de SafeKit"
canonical: "https://safekit.eviden.com/es/architectures/"
description: "Descubra las arquitecturas de alta disponibilidad con SafeKit. Conozca los clústeres Mirror, Farm y Farm+Mirror para la conmutación por error de aplicaciones sin SAN y el equilibrio de carga."
category: "architectures"
lang: "es"
topics: "¿Cuáles son las distintas arquitecturas de alta disponibilidad y los clústeres de software disponibles con SafeKit?, ¿Cómo crear clústeres de alta disponibilidad con SafeKit?, 🔍 Centro de navegación de SafeKit para alta disponibilidad"
---

# Arquitecturas de SafeKit {#safekit-architectures}

## ¿Cuáles son las distintas arquitecturas de alta disponibilidad y los clústeres de software disponibles con SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Clúster Mirror {#mirror-cluster}


![Clúster Mirror de SafeKit](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Más información](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Clúster Farm {#farm-cluster}


![Clúster Farm de SafeKit](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Más información](</architectures/network-load-balancing-cluster/>)

### Clúster Farm+Mirror {#farmmirror-cluster}


![Clúster Farm+Mirror de SafeKit](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Más información](</architectures/clustering-software-load-balancing-mirroring/>)

### Clúster activo/activo {#activeactive-cluster}


![Clúster activo/activo de SafeKit con replicación en tiempo real](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Más información](</architectures/active-active-cluster-real-time-replication/>)

### Clúster N-1 {#n-1-cluster}


![Clúster de redundancia N-1 de SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Más información](</architectures/n-1-redundancy/>)

## ¿Cómo crear clústeres de alta disponibilidad con SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Utilizar módulos de alta disponibilidad {#use-high-availability-modules}

Un módulo de alta disponibilidad es una personalización de SafeKit para una aplicación. Hay dos tipos de módulos: el módulo Mirror, con replicación de datos en tiempo real y conmutación por error, y el módulo Farm, con equilibrio de carga y conmutación por error.

Si implementa un módulo Mirror en dos servidores, crea un clúster Mirror; si implementa un módulo Farm en N servidores, crea un clúster Farm.

Se pueden implementar varios módulos de aplicación en los mismos servidores. Así, es posible crear arquitecturas de clúster avanzadas como las presentadas anteriormente (Farm+Mirror, activo/activo, N-1).

### ¿Qué es un módulo de aplicación? {#what-is-an-application-module}

En la práctica, un módulo de aplicación es un archivo «.Safe» (tipo zip) que incluye:

1 - el archivo de configuración userconfig.xml, que contiene:

  * los nombres o las direcciones IP físicas de los servidores,
  * el nombre o la dirección IP virtual del clúster,
  * los directorios que se replicarán en tiempo real (para un módulo Mirror),
  * los criterios de equilibrio de carga de red (para un módulo Farm),
  * la configuración de los detectores de fallos de software y hardware


2 - los scripts para iniciar y detener la aplicación.

### Implementación plug and play de módulos de alta disponibilidad {#plug-and-play-deployment-of-high-availability-modules}

Una vez configurado y probado un módulo de aplicación, su implementación no requiere conocimientos informáticos específicos:

  1. instalar la aplicación en dos servidores estándar (físicos o virtuales),
  2. instalar el software SafeKit en ambos servidores,
  3. instalar el módulo de aplicación en ambos servidores.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}