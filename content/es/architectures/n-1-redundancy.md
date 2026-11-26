---
title: "Clúster de redundancia N-1: alta disponibilidad para múltiples aplicaciones con un único servidor de respaldo"
canonical: "https://safekit.eviden.com/es/architectures/n-1-redundancy/"
description: "Optimice su centro de datos con la redundancia N-1 SafeKit. Implemente N módulos mirror en N+1 servidores para proporcionar alta disponibilidad a múltiples aplicaciones con un único servidor de respaldo compartido. Elimine los requisitos SAN y reduzca los costes de hardware con la replicación en tiempo real para Windows y Linux. Más información."
category: "architectures"
lang: "es"
topics: "Alta disponibilidad con replicación de datos y conmutación por error de aplicaciones de N servidores a 1, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# Clúster de redundancia N-1: alta disponibilidad para múltiples aplicaciones con un único servidor de respaldo {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Alta disponibilidad con replicación de datos y conmutación por error de aplicaciones de N servidores a 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### Redundancia N-1 {#n-1-redundancy}


![Clúster de redundancia N-1 con SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### ¿Cómo funciona la redundancia N-1? {#how-the-n-1-redundancy-works}

SafeKit proporciona un clúster de redundancia N-1 sencillo: N aplicaciones se ejecutan en N servidores primarios, y un único servidor de respaldo toma el control en caso de fallo. En un clúster de redundancia N-1 SafeKit, cada aplicación trabaja en sus propios directorios replicados.

A diferencia de un [clúster activo-activo](</es/architectures/active-active-cluster-real-time-replication/>), cuando un servidor principal falla, el servidor de respaldo no tiene que gestionar una carga de trabajo doble.

Esto supone que solo falla un servidor primario a la vez en el clúster de redundancia N-1. La solución también puede gestionar varios fallos de servidor primario al mismo tiempo. En este caso, el único servidor de respaldo ejecuta la carga de trabajo combinada de todos los servidores fallidos.

### ¿Cómo implementar la redundancia N-1? {#how-to-implement-n-1-redundancy}

Para configurar un clúster de redundancia N-1 SafeKit, simplemente implemente N módulos mirror en N+1 servidores.

Notas:

  * Todas las aplicaciones (Appli1, Appli2, Appli3) deben instalarse en el servidor de respaldo para la conmutación por error de la aplicación.
  * Cada módulo mirror tiene su propia dirección IP virtual, sus propios directorios de archivos replicados y sus propios scripts de recuperación.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}