---
title: "Software de clúster con equilibrio de carga y duplicación: alta disponibilidad y escalabilidad"
canonical: "https://safekit.eviden.com/es/architectures/clustering-software-load-balancing-mirroring/"
description: "Cree arquitecturas avanzadas combinando los módulos farm y mirror SafeKit. El equilibrio de carga de red escala el front-end y la replicación síncrona en tiempo real protege los datos del back-end. Agrupación en clúster sin SAN sencilla para Windows y Linux, sin necesidad de conocimientos informáticos especializados. Descargue su prueba gratuita."
category: "architectures"
lang: "es"
topics: "Alta disponibilidad y escalabilidad de aplicaciones web y de bases de datos críticas con el software de clúster SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png"
---

# Software de clúster con equilibrio de carga y duplicación: alta disponibilidad y escalabilidad {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Alta disponibilidad y escalabilidad de aplicaciones web y de bases de datos críticas con el software de clúster SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Equilibrio de carga, duplicación y conmutación por error {#load-balancing-mirroring-and-failover}


![Clustering SafeKit con balanceo de carga y duplicación](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Ejemplo con el software de clúster SafeKit {#example-with-the-safekit-clustering-software}

Por ejemplo, con el software de clúster SafeKit, puede implementar el equilibrio de carga para IIS y la duplicación para Microsoft SQL Server.

Para ello, implemente un módulo <span class="notranslate farm-term" translate="no">farm</span> para IIS y un módulo mirror para Microsoft SQL Server. Cada módulo se configura con su propia dirección IP virtual y sus propios scripts de reinicio.

Los dos módulos se pueden implementar en un único clúster de dos servidores, donde se ejecutan IIS y Microsoft SQL Server. Alternativamente, los dos módulos se pueden implementar en dos clústeres separados con diferentes servidores.

Con el software de clúster SafeKit, la implementación en los mismos servidores o en servidores diferentes funciona exactamente de la misma manera.

### Solución de alta disponibilidad y escalabilidad {#high-availability-and-scalability-solution}

El software de clúster SafeKit proporciona una solución sencilla de alta disponibilidad y escalabilidad para aplicaciones web y de bases de datos críticas.

El equilibrio de carga de la red, la duplicación de datos en tiempo real y la conmutación por error de las aplicaciones se gestionan de forma coherente en un único producto.

A diferencia del clustering de hardware, el software de clúster SafeKit no requiere discos compartidos, SAN replicadas, balanceadores de carga de hardware ni ediciones Enterprise de sistemas operativos o bases de datos.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}