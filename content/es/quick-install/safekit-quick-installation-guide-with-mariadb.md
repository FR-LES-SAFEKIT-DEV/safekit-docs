---
title: "Alta disponibilidad MariaDB con SafeKit: Instale el módulo mysql.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Implemente el módulo mysql.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de MariaDB en Windows y Linux. Esta guía le muestra cómo configurar un clúster SANless de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para MariaDB, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/MariaDB, Instalación de la solución SafeKit/MariaDB en Windows y Linux (mysql.safe), Configuración paso a paso de la solución SafeKit/MariaDB, Demostración de la solución mirror SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilidad MariaDB con SafeKit: Instale el módulo mysql.safe para la conmutación por error {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="MariaDB" mod="mysql"  %}}
 

## Descripción general de la solución SafeKit/MariaDB {#overview-of-the-safekit--mariadb-solution}

La solución se describe aquí: **💡 [La alta disponibilidad más sencilla MariaDB: replicación síncrona y conmutación por error de 2 nodos](</es/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Instalación de la solución SafeKit/MariaDB en Windows y Linux (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener MariaDB instalado en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-windows-es app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-es app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-es app="MariaDB" mod="mysql"  %}}
 

## Configuración paso a paso de la solución SafeKit/MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-es app="MariaDB" mod="mysql"  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}