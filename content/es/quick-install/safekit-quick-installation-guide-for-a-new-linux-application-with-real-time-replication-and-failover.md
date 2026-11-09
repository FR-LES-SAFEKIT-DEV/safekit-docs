---
title: "Alta disponibilidad Linux con SafeKit: Instale el módulo mirror.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Implemente el módulo mirror.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática en Linux. Esta guía le muestra cómo configurar un clúster SANless de 2 nodos para aplicaciones críticas Linux sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Linux, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/Linux, Instalación de la solución SafeKit/Linux (mirror.safe), Configuración paso a paso de la solución SafeKit/Linux, Demostración de la solución mirror SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilidad Linux con SafeKit: Instale el módulo mirror.safe para la conmutación por error {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Linux" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit/Linux {#overview-of-the-safekit--linux-solution}

La solución se describe aquí: **💡 [La alta disponibilidad más sencilla Linux: replicación síncrona y conmutación por error de 2 nodos](</es/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## Instalación de la solución SafeKit/Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Requisitos previos {#prerequisites}

  * Necesita que la aplicación que desea reiniciar en SafeKit esté instalada en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

Nota: el módulo genérico **mirror.safe** que va a configurar se entrega dentro del paquete.

## Configuración paso a paso de la solución SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-es app="Linux" mod="mirror"  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-es  %}}