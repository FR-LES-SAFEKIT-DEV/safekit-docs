---
title: "Alta disponibilidad de Milestone XProtect con SafeKit: instale el módulo milestone.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implemente el módulo milestone.safe de SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de Milestone XProtect en Windows. Esta guía explica cómo configurar un clúster SANless de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Milestone XProtect, Limitaciones de alta disponibilidad de SafeKit, Descripción general de la solución SafeKit / Milestone XProtect, Instalación de la solución SafeKit / Milestone XProtect en Windows (milestone.safe), Configuración paso a paso de la solución SafeKit / Milestone XProtect, Demostración de la solución mirror de SafeKit, 🔍 Centro de navegación de alta disponibilidad de SafeKit"
---

# Alta disponibilidad de Milestone XProtect con SafeKit: instale el módulo milestone.safe para la conmutación por error {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Milestone XProtect" mod="milestone"  %}}


## Descripción general de la solución SafeKit / Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

La solución se describe aquí: **💡[La alta disponibilidad más sencilla para Milestone XProtect: replicación síncrona de 2 nodos y conmutación por error](</es/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Instalación de la solución SafeKit / Milestone XProtect en Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Requisitos previos {#prerequisites}

  * Debe tener Milestone XProtect Management y SQL instalados en 2 nodos (máquinas virtuales o servidores físicos). SQL Server y Event Server pueden ser externos; consulte las notas siguientes.


ℹ️ Nota: SQL Server puede ser externo. En ese caso, en el paso 4 de la configuración paso a paso de milestone.safe:

  * elimine la replicación de las carpetas SQL Data y Log,
  * elimine el comprobador de procesos de sqlservr.exe,
  * elimine MSSQLServer de la macro SERVICES.


Puede implementar redundancia para el SQL Server externo con **💡[SafeKit y el módulo sqlserver.safe](</es/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

En ese caso, en ambos nodos de administración, configure la [conexión de Milestone Management a SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) con la dirección IP virtual del módulo sqlserver.safe (clave del Registro HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Nota: Event Server puede ser externo a Management Server.

En este caso, tendrá 2 clústeres con 2 instalaciones de milestone.safe: uno para el clúster de Management y otro para el clúster de Event.

Para el clúster de Management, en el paso 4 de la configuración paso a paso de milestone.safe:

  * elimine MilestoneEventServerService de la macro SERVICES.


Y para el clúster de Event, en el paso 4 de la configuración paso a paso de milestone.safe:

  * elimine de la macro SERVICES: MSSQLServer, Milestone XProtect Management Server y Milestone XProtect Log Server,
  * elimine la replicación de las carpetas SQL Data y Log,
  * elimine el comprobador de procesos de sqlservr.exe,
  * durante la configuración paso a paso, [registre](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) Event Server con la dirección IP virtual del **clúster de Management** (o instale Event Server desde Download Manager y establezca durante la instalación la dirección IP virtual del **clúster de Management**),
  * en Milestone management client, establezca Event Server con la dirección IP virtual del **clúster de Event** en [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redundancia de grabadores {#ℹ-recorder-redundancy}

  * La replicación de grabadores no es adecuada para SafeKit debido al volumen de datos.
  * Se puede utilizar la solución integrada en Milestone (servidor de grabación de conmutación por error sin replicación en tiempo real).
  * También se pueden ejecutar dos grabadores en una configuración activo/activo y distribuir las cámaras para no perder todas las cámaras de una misma zona si se produce un fallo.
  * La transmisión de cada cámara también se puede enviar a dos grabadores con la solución [Vega / RMF](<https://vega25.com/>).


ℹ️ Si va a migrar Milestone de la versión N a la N+1 en un clúster SafeKit, lea este artículo: 🛠️ [Migración de Milestone Management con SafeKit](</es/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-es app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="Milestone XProtect and SQL" mod="milestone"  %}}


## Configuración paso a paso de la solución SafeKit / Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-es app="Milestone XProtect and SQL" mod="milestone"  %}}


## Demostración de la solución mirror de SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
