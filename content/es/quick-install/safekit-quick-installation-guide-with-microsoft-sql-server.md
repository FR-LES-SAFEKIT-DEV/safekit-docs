---
title: "Alta disponibilidad Microsoft SQL Server con SafeKit: Instale el módulo sqlserver.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Implemente el módulo sqlserver.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática para Microsoft SQL Server. Esta guía le muestra cómo configurar un clúster SANless de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Microsoft SQL Server, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/Microsoft SQL Server, Instalación de la solución SafeKit/Microsoft SQL Server en Windows (sqlserver.safe), Configuración paso a paso de la solución SafeKit/Microsoft SQL Server, Demostración de la solución mirror SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilidad Microsoft SQL Server con SafeKit: Instale el módulo sqlserver.safe para la conmutación por error {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Descripción general de la solución SafeKit/Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Para obtener una descripción detallada de la solución, consulte **💡 [La alta disponibilidad más sencilla Microsoft SQL Server: replicación síncrona y conmutación por error de 2 nodos](</es/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## Instalación de la solución SafeKit/Microsoft SQL Server en Windows (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Requisitos previos {#prerequisites}

  * Necesita tener Microsoft SQL Server instalado en 2 nodos (máquinas virtuales o servidores físicos).
  * SafeKit funciona con todas las versiones de SQL, incluido SQL Express.


  * Las [bases de datos del sistema SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf y mastlog.ldf) deben estar ubicadas en los mismos directorios en ambos nodos. Los directorios se configurarán como replicados en el paso 4 de la configuración paso a paso.
  * SQL también debe estar instalado en la misma ubicación en el sistema de archivos de ambos nodos porque la [base de datos de recursos SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) de solo lectura se encuentra en el binario y es necesaria para la conmutación por error. Esta base de datos no necesita ser replicada.
  * Las bases de datos de usuario de SQL (.mdf y .ldf) deben estar ubicadas en los mismos directorios en ambos nodos. Los directorios se configurarán como replicados en el paso 4 de la configuración paso a paso.



{{%  insert-safekit-installation-package-windows-es app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configuración paso a paso de la solución SafeKit/Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-es app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}