---
title: "Técnicas de replicación de datos para alta disponibilidad: comparación completa"
canonical: "https://safekit.eviden.com/es/best-practises/data-replication-techniques/"
description: "Compare las técnicas de replicación de datos a nivel de base de datos, disco y archivo. Descubra por qué SafeKit propone una arquitectura sin SAN para una replicación síncrona sencilla y en tiempo real, que evita la pérdida de datos y permite la conmutación automática por error en Windows y Linux."
category: "best-practises"
lang: "es"
topics: "Técnicas de replicación de datos a nivel de base de datos, disco o archivo, Tablas comparativas de técnicas de replicación de datos, Centro de navegación de alta disponibilidad SafeKit"
---

# Técnicas de replicación de datos para alta disponibilidad: comparación completa {#data-replication-techniques-for-high-availability-a-complete-comparison}

## ¿Técnicas de replicación de datos a nivel de base de datos, disco o archivo? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Descripción general {#overview}

Este artículo analiza las ventajas y desventajas de las técnicas de replicación de datos a nivel de base de datos, disco y archivo para clústeres de alta disponibilidad. Se consideran la conmutación por error, el retorno tras el fallo y la sencillez de implementación.

![Técnicas de replicación de datos](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

Las siguientes tablas comparativas explican en detalle las técnicas de replicación de datos implementadas por SafeKit, un producto de software de alta disponibilidad.

### ¿En qué consiste la replicación de datos a nivel de base de datos? {#what-is-the-data-replication-technique-at-database-level}

El sistema de gestión de bases de datos replica los archivos de registro entre dos servidores, como el [registro de transacciones de SQL Server](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Para que la conmutación por error sea automática, la replicación síncrona es obligatoria; de lo contrario, las últimas transacciones confirmadas no estarán disponibles en el servidor secundario tras la conmutación.

Esta técnica replica la base de datos, pero no los demás datos de la aplicación. Para conmutar muchas aplicaciones también es necesario replicar otros datos, como los archivos de configuración.

Si un servidor falla y pierde archivos de la base de datos, el retorno no es automático. Un administrador de bases de datos cualificado debe restaurar la base en el servidor averiado.

### ¿En qué consiste la replicación de datos a nivel de disco? {#what-is-the-data-replication-technique-at-disk-level}

Consiste en replicar las modificaciones de los discos entre dos servidores, por ejemplo con [DRBD](<https://linbit.com/drbd/>).

Para conseguir una conmutación automática sin pérdida de datos, es necesaria la replicación síncrona entre los discos.

Esta técnica puede replicar bases de datos y otros archivos, pero afecta considerablemente a la organización de los datos de la aplicación: todos deben estar ubicados en el disco replicado. Esto puede ser imposible si algunos datos que se deben replicar están en el disco del sistema, que debe ser distinto en cada servidor.

Se requieren conocimientos especializados para configurar el disco replicado con un sistema de archivos y ubicar allí los datos de la aplicación.

### ¿En qué consiste la replicación de datos a nivel de archivo? {#what-is-the-data-replication-technique-at-file-level}

Consiste en replicar las modificaciones de los archivos entre dos servidores, por ejemplo con [SafeKit](/es/).

Para una conmutación automática sin pérdida de datos se requiere [replicación síncrona en tiempo real](/es/best-practises/synchronous-replication-vs-asynchronous-replication/).

Esta técnica replica bases de datos y otros archivos sin afectar a la organización de los datos. Por ejemplo, la replicación de archivos en tiempo real funciona aunque una aplicación almacene sus datos en el disco del sistema.

La configuración es muy sencilla: solo hay que indicar las rutas de los directorios que se van a replicar.

## Tablas comparativas de técnicas de replicación de datos {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-es %}}

{{% insert-safekit-hub-es %}}

{{% insert-safekit-4-buttons-es %}}