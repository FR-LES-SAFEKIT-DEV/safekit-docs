---
title: "Balanceo de carga y conmutación por error de red NGINX: Instale el módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Guía paso a paso: instale el módulo SafeKit farm.safe en Windows o Linux para equilibrio de carga de red y conmutación por error de servidores NGINX."
category: "quick-install"
lang: "es"
topics: "Descripción general de la solución SafeKit/NGINX, Instalación de la solución SafeKit/NGINX en Windows y Linux (farm.safe), Configuración paso a paso de la solución SafeKit/NGINX, Demostración de la solución farm SafeKit"
hashpart: "overview-of-the-safekit--nginx-solution, installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe, step-by-step-configuration-of-the-safekit--nginx-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Balanceo de carga y conmutación por error de red NGINX: Instale el módulo farm.safe SafeKit {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-es app="NGINX" mod="farm"  %}}
 

## Descripción general de la solución SafeKit/NGINX {#overview-of-the-safekit--nginx-solution}

La solución se describe aquí: **💡 [SafeKit: software todo en uno de equilibrio de carga y alta disponibilidad NGINX](</es/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**.

## Instalación de la solución SafeKit/NGINX en Windows y Linux (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener NGINX instalado en 2 o más nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-windows-es app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-es app="NGINX" mod="farm"  %}}
 

Nota: el módulo genérico **farm.safe** que va a configurar se entrega dentro del paquete.

## Configuración paso a paso de la solución SafeKit/NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-es app="NGINX" mod="farm"  %}}
 

## Demostración de la solución <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}