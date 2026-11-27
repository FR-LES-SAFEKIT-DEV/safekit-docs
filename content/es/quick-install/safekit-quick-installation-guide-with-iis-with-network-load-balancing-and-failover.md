---
title: "Balanceo de carga y conmutación por error de red IIS: Instale el módulo SafeKit iisfarm.safe"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Guía paso a paso: instale el módulo SafeKit iis_farm.safe en Windows para equilibrio de carga de red y conmutación por error de servidores web IIS en una IP virtual."
category: "quick-install"
lang: "es"
topics: "Descripción general de la solución SafeKit/IIS, Instalación de la solución SafeKit/IIS en Windows (iisfarm.safe), Configuración paso a paso de la solución SafeKit/IIS, Demostración de la solución farm SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Balanceo de carga y conmutación por error de red IIS: Instale el módulo SafeKit iis_farm.safe {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-es app="IIS" mod="iis_farm"  %}}
 

## Descripción general de la solución SafeKit/IIS {#overview-of-the-safekit--iis-solution}

La solución se describe aquí: **💡 [SafeKit: software todo en uno de equilibrio de carga y alta disponibilidad IIS](</es/solutions/iis-load-balancing-failover/>)**.

## Instalación de la solución SafeKit/IIS en Windows (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Requisitos previos {#prerequisites}

  * Necesita tener IIS instalado en 2 o más nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-windows-es app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-es app="IIS" mod="iis_farm"  %}}
 

## Configuración paso a paso de la solución SafeKit/IIS {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-es app="IIS" mod="iis_farm"  %}}
 

## Demostración de la solución <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-es  %}}

{{%  insert-safekit-hub-es app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-es  %}}