---
title: "Instalar SafeKit: balanceo de carga de Linux"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Guía paso a paso: instale el módulo SafeKit farm.safe en Linux para equilibrio de carga de red y conmutación por error de su aplicación en una IP virtual."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Linux, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/Linux, Instalación de la solución SafeKit/Linux (farm.safe), Configuración paso a paso de la solución SafeKit/Linux, Demostración de la solución farm SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-farmsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Instalar SafeKit: balanceo de carga de Linux {#install-safekit-for-linux-load-balancing}


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