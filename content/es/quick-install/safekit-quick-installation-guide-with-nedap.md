---
title: "Alta disponibilidad Nedap con SafeKit : Instale el módulo nedap.safe para la conmutación por error."
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Implemente el módulo nedap.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de Nedap en Windows . Esta guía le muestra cómo configurar un clúster SAN de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Nedap , Limitaciones de alta disponibilidad SafeKit , Descripción general de la solución SafeKit / Nedap , Instalación de la solución SafeKit / Nedap en Windows ( nedap.safe ), Configuración paso a paso de la solución SafeKit / Nedap , Demostración de la solución SafeKit mirror , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad Nedap con SafeKit : Instale el módulo nedap.safe para la conmutación por error {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Nedap" mod="nedap"  %}}
 

** 📘 [ Configuración de Nedap AOES con SafeKit (PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>) ** : todos los detalles están en este documento.

## Descripción general de la solución SafeKit / Nedap {#overview-of-the-safekit--nedap-solution}

La solución se describe aquí: ** 💡 [ La más sencilla Nedap Alta disponibilidad: replicación síncrona de 2 nodos y conmutación por error ](</solutions/nedap-high-availability-synchronous-replication-failover/>) ** .

## Instalación de la solución SafeKit / Nedap en Windows ( nedap.safe ) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener instalado Nedap AEOS y SQL en 2 nodos (máquinas virtuales o servidores físicos).
  * Con SQL Server en el mismo nodo que Nedap AEOS, configure la conexión de Nedap AEOS a SQL con la dirección IP virtual y no con la dirección IP física del servidor. De lo contrario, la conmutación por error no funcionará. SQL Server puede ser externo; consulte la nota a continuación.


ℹ️ Nota: SQL Server puede ser externo. En este caso, en el paso 4 durante la configuración paso a paso:

  * eliminar la replicación de las carpetas de datos y registros de SQL,
  * eliminar el verificador de procesos en sqlservr.exe ,
  * Elimine MSSQLServer de la macro SERVICES.


Puede implementar redundancia del SQL Server externo con 💡 [ SafeKit y el módulo sqlserver.safe ](</solutions/sql-server-high-availability-synchronous-replication-failover/>) . En este caso, configure la conexión de Nedap AEOS a SQL con la dirección IP virtual del módulo sqlserver.safe .


{{%  insert-safekit-installation-package-windows-es app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Configuración paso a paso de la solución SafeKit / Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-es app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}