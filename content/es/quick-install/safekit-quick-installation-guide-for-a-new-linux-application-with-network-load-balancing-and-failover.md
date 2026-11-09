---
title: "Balanceo de carga y conmutación por error de red Linux: Instale el módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Aprenda a implementar el módulo farm.safe para el equilibrio de carga de red Linux y la conmutación por error automática. Esta guía muestra cómo crear un clúster de alta disponibilidad para servicios y aplicaciones web mediante una IP virtual, sin necesidad de balanceadores de carga de hardware externos ni configuraciones complejas."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Linux, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/Linux, Instalación de la solución SafeKit/Linux (farm.safe), Configuración paso a paso de la solución SafeKit/Linux, Demostración de la solución farm SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Balanceo de carga y conmutación por error de red Linux: Instale el módulo farm.safe SafeKit {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-es app="Linux" mod="farm"  %}}
 

## Descripción general de la solución SafeKit/Linux {#overview-of-the-safekit--linux-solution}

La solución se describe aquí: **💡 [SafeKit: software todo en uno de equilibrio de carga y alta disponibilidad Linux](</es/solutions/linux-load-balancing-failover/>)**.

## Instalación de la solución SafeKit/Linux (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### Requisitos previos {#prerequisites}

  * Necesita que la aplicación que desea instalar en una <span class="notranslate farm-term" translate="no">farm</span> esté instalada en 2 o más nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-linux-es app="" mod="farm"  %}}
 

Nota: el módulo genérico **farm.safe** que va a configurar se entrega dentro del paquete.

## Configuración paso a paso de la solución SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-es app="Linux" mod="farm"  %}}
 

## Demostración de la solución <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-es  %}}

{{%  insert-safekit-hub-es app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-es  %}}