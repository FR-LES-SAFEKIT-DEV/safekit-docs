---
title: "Alta disponibilidad PostgreSQL con SafeKit: Instale el módulo postgresql.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Implemente el módulo postgresql.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de PostgreSQL en Windows y Linux. Esta guía le muestra cómo configurar un clúster sin SAN de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para PostgreSQL, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/PostgreSQL, Instalación de la solución SafeKit/PostgreSQL en Windows y Linux (postgresql.safe), Configuración paso a paso de la solución SafeKit/PostgreSQL, Demostración de la solución mirror SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilidad PostgreSQL con SafeKit: Instale el módulo postgresql.safe para la conmutación por error {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="PostgreSQL" mod="postgresql.safe"  %}}
 

## Descripción general de la solución SafeKit/PostgreSQL {#overview-of-the-safekit--postgresql-solution}

La solución se describe aquí: **💡 [La alta disponibilidad más sencilla PostgreSQL: replicación síncrona y conmutación por error de 2 nodos](</es/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Instalación de la solución SafeKit/PostgreSQL en Windows y Linux (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener PostgreSQL instalado en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-windows-es app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-es app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-es app="PostgreSQL" mod="postgresql"  %}}
 

## Configuración paso a paso de la solución SafeKit/PostgreSQL {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-es app="PostgreSQL" mod="postgresql"  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}