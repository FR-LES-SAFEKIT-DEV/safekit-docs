---
title: "Alta disponibilidad MariaDB con SafeKit : Instale el módulo mysql.safe para la conmutación por error."
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "Implemente el módulo mysql.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de MariaDB en Windows y Linux . Esta guía le muestra cómo configurar un clúster SAN de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para MariaDB , limitaciones de alta disponibilidad de SafeKit , descripción general de la solución SafeKit / MariaDB , instalación de la solución SafeKit / MariaDB en Windows y Linux ( mysql.safe ), configuración paso a paso de la solución SafeKit / MariaDB , demostración de la solución SafeKit mirror , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad MariaDB con SafeKit : Instale el módulo mysql.safe para la conmutación por error {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="MariaDB" mod="mysql"  %}}
 

## Descripción general de la solución SafeKit / MariaDB {#overview-of-the-safekit--mariadb-solution}

La solución se describe aquí: **💡 [ La más sencilla MariaDB Alta disponibilidad: replicación síncrona de 2 nodos y conmutación por error ](</es/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)** .

## Instalación de la solución SafeKit / MariaDB en Windows y Linux ( mysql.safe ) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener instalado MariaDB en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-windows-es app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-es app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-es app="MariaDB" mod="mysql"  %}}
 

## Configuración paso a paso de la solución SafeKit / MariaDB {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-es app="MariaDB" mod="mysql"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}