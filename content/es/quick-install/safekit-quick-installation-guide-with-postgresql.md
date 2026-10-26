---
title: "Alta disponibilidad de PostgreSQL con SafeKit: instale el módulo postgresql.safe para conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Implemente el módulo postgresql.safe para SafeKit para habilitar la replicación sincrónica en tiempo real y la conmutación por error automática de PostgreSQL en Windows y Linux. Esta guía le guiará en la configuración de un clúster sin SAN de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para PostgreSQL, Limitaciones de alta disponibilidad de SafeKit, Descripción general de la solución SafeKit/PostgreSQL, Instalación de la solución SafeKit/PostgreSQL en Windows y Linux (postgresql.safe), Configuración paso a paso de la solución SafeKit/PostgreSQL, Demostración de la solución espejo SafeKit, 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad de PostgreSQL con SafeKit: instale el módulo postgresql.safe para conmutación por error {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Descripción general de la solución SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

La solución se describe aquí: **💡[La alta disponibilidad de PostgreSQL más simple: replicación síncrona de 2 nodos y conmutación por error](</es/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Instalación de la solución SafeKit/PostgreSQL en Windows y Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Requisitos previos {#prerequisites}

  * Necesita PostgreSQL instalado en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-windows-es app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-es app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-es app="PostgreSQL" mod="postgresql"  %}}
 

## Configuración paso a paso de la solución SafeKit/PostgreSQL {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-es app="PostgreSQL" mod="postgresql"  %}}
 

## Demostración de la solución de espejo SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}