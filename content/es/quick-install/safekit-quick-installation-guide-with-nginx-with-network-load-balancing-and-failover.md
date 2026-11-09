---
title: "Balanceo de carga y conmutación por error de red NGINX: Instale el módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Aprenda a implementar el módulo farm.safe en Windows y Linux para el equilibrio de carga de red NGINX y la conmutación por error automática. Esta guía le muestra cómo crear un clúster de alta disponibilidad para servicios y aplicaciones web utilizando una IP virtual, sin necesidad de balanceadores de carga de hardware externos o una configuración compleja."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para NGINX, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/NGINX, Instalación de la solución SafeKit/NGINX en Windows y Linux (farm.safe), Configuración paso a paso de la solución SafeKit/NGINX, Demostración de la solución farm SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
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