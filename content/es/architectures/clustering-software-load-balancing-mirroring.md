---
title: "Software de agrupación en clústeres para granjas de servidores y réplicas: alta disponibilidad y equilibrio de carga."
canonical: "https://safekit.eviden.com/es/architectures/clustering-software-load-balancing-mirroring/"
description: "Implemente arquitecturas avanzadas combinando los módulos SafeKit Farm y Mirror . Combine el balanceo de carga de red para escalar el front-end con la replicación síncrona en tiempo real para proteger los datos del back-end. Clustering sencillo y sin SAN para Windows y Linux sin necesidad de conocimientos técnicos especializados. Descargue su versión de prueba gratuita."
category: "architectures"
lang: "es"
topics: "Alta disponibilidad y escalabilidad de aplicaciones web y de bases de datos críticas con el software de clúster SafeKit , 🔍 SafeKit High Availability Navigation Hub"
---

# Software de agrupación en clústeres para granjas y réplicas: alta disponibilidad y equilibrio de carga {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Alta disponibilidad y escalabilidad de aplicaciones web y de bases de datos críticas con el software de clúster SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Balanceo de carga, replicación y conmutación por error {#load-balancing-mirroring-and-failover}


Agrupación ![ SafeKit con equilibrio de carga y duplicación ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Ejemplo con el software de agrupación SafeKit {#example-with-the-safekit-clustering-software}

Por ejemplo, con el software de agrupación en clústeres SafeKit , puede implementar el equilibrio de carga IIS y la replicación Microsoft SQL Server .

Para ello, debe implementar un módulo `farm` para el servidor SQL IIS y un módulo mirror para el servidor SQL Microsoft . Cada módulo `farm` y mirror está configurado con su propia dirección IP virtual y sus propios scripts de reinicio.

Los módulos mirror y `farm` pueden implementarse en un único clúster de dos servidores. Los módulos IIS , Microsoft y SQL Server se ejecutarán en estos dos servidores. También pueden implementarse en dos clústeres con servidores diferentes.

Con el software de agrupación en clústeres SafeKit , no hay diferencia entre una implementación en los mismos servidores o en servidores diferentes.

### Solución de alta disponibilidad y escalabilidad {#high-availability-and-scalability-solution}

El software de clúster SafeKit proporciona una solución sencilla de alta disponibilidad y escalabilidad para aplicaciones web y de bases de datos críticas.

Como resultado, el equilibrio de carga de la red, la replicación de datos en tiempo real y la conmutación por error de las aplicaciones se gestionan de forma coherente en un mismo producto.

Al comparar el software de clúster SafeKit con el clúster de hardware, no se necesitan discos compartidos, SAN replicada, balanceadores de carga ni ediciones Enterprise del sistema operativo o la base de datos.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}