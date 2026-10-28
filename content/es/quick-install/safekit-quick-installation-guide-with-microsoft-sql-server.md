---
title: "Microsoft SQL Server Alta disponibilidad con SafeKit : Instale el módulo sqlserver.safe para conmutación por error."
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Implemente el módulo sqlserver.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática para Microsoft SQL Server . Esta guía le muestra cómo configurar un clúster SAN de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Microsoft SQL Server , SafeKit Limitaciones de alta disponibilidad, Descripción general de la solución SafeKit / Microsoft SQL Server , Instalación de la solución SafeKit / Microsoft SQL Server en Windows ( sqlserver.safe ), Configuración paso a paso de la solución SafeKit / Microsoft SQL Server , Demostración de la solución SafeKit mirror , 🔍 SafeKit Centro de navegación de alta disponibilidad"
---

# Microsoft SQL Server Alta disponibilidad con SafeKit : Instale el módulo sqlserver.safe para conmutación por error {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Descripción general de la solución SafeKit / Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Para obtener una descripción detallada de la solución, consulte **💡 [ El más simple Microsoft SQL Server Alta disponibilidad: replicación síncrona de 2 nodos y conmutación por error ](</es/solutions/sql-server-high-availability-synchronous-replication-failover/>)** .

## Instalación de la solución SafeKit / Microsoft SQL Server en Windows ( sqlserver.safe ) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener instalados Microsoft SQL Server en 2 nodos (máquinas virtuales o servidores físicos).
  * SafeKit funciona con todas las versiones de SQL, incluyendo SQL Express.


  * Las bases de datos del sistema SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf y mastlog.ldf) deben estar ubicadas en los mismos directorios en ambos nodos. Los directorios se configurarán como replicados en el paso 4 de la configuración paso a paso.
  * SQL también debe estar instalado en la misma ubicación del sistema de archivos en ambos nodos, ya que la base de datos de recursos SQL de solo lectura [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) se encuentra en el binario y es necesaria para la conmutación por error. Esta base de datos no necesita ser replicada.
  * Las bases de datos de usuario SQL (.mdf y .ldf) deben estar ubicadas en los mismos directorios en ambos nodos. Los directorios se configurarán como replicados en el paso 4 de la configuración paso a paso.



{{%  insert-safekit-installation-package-windows-es app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configuración paso a paso de la solución SafeKit / Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-es app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}