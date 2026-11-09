---
title: "Milestone XProtect Alta Disponibilidad con SafeKit: Instale el módulo milestone.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implemente el módulo milestone.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de Milestone XProtect en Windows. Esta guía le guiará a través de la configuración de un clúster SANless de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Milestone XProtect, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/Milestone XProtect, Instalación de la solución SafeKit/Milestone XProtect en Windows (milestone.safe), Configuración paso a paso de la solución SafeKit/Milestone XProtect, Demostración de la solución mirror SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Milestone XProtect Alta Disponibilidad con SafeKit: Instale el módulo milestone.safe para la conmutación por error {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Milestone XProtect" mod="milestone"  %}}
 

## Descripción general de la solución SafeKit/Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

La solución se describe aquí: **💡 [La solución más sencilla para la alta disponibilidad Milestone XProtect: replicación síncrona y conmutación por error de 2 nodos](</es/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Instalación de la solución SafeKit/Milestone XProtect en Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Requisitos previos {#prerequisites}

  * Necesita Milestone XProtect Management y SQL instalados en 2 nodos (máquinas virtuales o servidores físicos). SQL Server y Event Server pueden ser externos, consulte las notas a continuación.


ℹ️ Nota: SQL Server puede ser externo. En este caso, en el paso 4 durante la configuración paso a paso de milestone.safe:

  * eliminar la replicación de las carpetas de datos y de registro de SQL,
  * Elimine el verificador de procesos en sqlservr.exe
  * Elimine MSSQLServer de la macro SERVICIOS.


Puede implementar la redundancia del SQL Server externo con 💡 [SafeKit y el módulo sqlserver.safe](</es/solutions/sql-server-high-availability-synchronous-replication-failover/>).

En este caso, en ambos nodos de gestión, configure la [conexión de Milestone Management a SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) con la dirección IP virtual del módulo sqlserver.safe (clave de registro HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Nota: El servidor de eventos puede ser externo al servidor de gestión.

En este caso, tiene 2 clústeres con 2 instalaciones de milestone.safe: uno para el clúster de gestión y el otro para el clúster de eventos.

Para el clúster de gestión, en el paso 4 durante la configuración paso a paso de milestone.safe:

  * Elimine MilestoneEventServerService de la macro SERVICES.


Y para el clúster de eventos, en el paso 4 durante la configuración paso a paso de milestone.safe:

  * Eliminar de la macro SERVICIOS: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * eliminar la replicación de las carpetas de datos y de registro de SQL,
  * Elimine el verificador de procesos en sqlservr.exe
  * durante la configuración paso a paso, [registre](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) el servidor de eventos con la dirección IP virtual del **clúster de gestión** (o instale el servidor de eventos desde el Administrador de descargas y establezca la dirección IP virtual del **clúster de gestión** durante la instalación),
  * En el cliente de gestión Milestone, configure el servidor de eventos con la dirección IP virtual del **clúster de eventos** en los [servicios registrados](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Redundancia de grabadoras {#ℹ-recorder-redundancy}

  * La replicación de los registradores no es adecuada para SafeKit debido al volumen de datos.
  * La solución integrada en Milestone se puede utilizar (servidor de grabación con conmutación por error sin replicación en tiempo real).
  * Dos grabadoras también pueden funcionar en una configuración activa/activa y las cámaras se distribuyen para no perder todas las cámaras de la misma área en caso de fallo.
  * La señal de cada cámara también se puede enviar a dos grabadoras con la solución [Vega / RMF](<https://vega25.com/>).


ℹ️ En caso de migración de Milestone de la versión N a la versión N+1 en un clúster SafeKit, lea este artículo: 🛠️ [Migración de la gestión Milestone con SafeKit](</es/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-es app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Configuración paso a paso de la solución SafeKit/Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-es app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}