---
title: "Alta disponibilidad Windows con SafeKit: Instale el módulo mirror.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Guía paso a paso: instale el módulo SafeKit mirror.safe en Windows para replicación en tiempo real y conmutación por error automática de su aplicación en dos servidores."
category: "quick-install"
lang: "es"
topics: "Descripción general de la solución SafeKit/Windows, Instalación en las soluciones SafeKit/Windows (mirror.safe), Configuración paso a paso de la solución SafeKit/Windows, Demostración de la solución mirror SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Alta disponibilidad Windows con SafeKit: Instale el módulo mirror.safe para la conmutación por error {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Windows" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit/Windows {#overview-of-the-safekit--windows-solution}

La solución se describe aquí: **💡 [La alta disponibilidad más sencilla Windows: replicación síncrona y conmutación por error de 2 nodos](</es/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Instalación en las soluciones SafeKit/Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Requisitos previos {#prerequisites}

  * Necesita que la aplicación que desea reiniciar en SafeKit esté instalada en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-windows-es app="" mod="mirror"  %}}
 

Nota: el módulo genérico **mirror.safe** que va a configurar se entrega dentro del paquete.

## Configuración paso a paso de la solución SafeKit/Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-es app="Windows" mod="mirror"  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-es  %}}