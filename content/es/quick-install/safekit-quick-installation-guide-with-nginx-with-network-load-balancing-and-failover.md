---
title: "Balanceo de carga y conmutación por error de red NGINX: Instale el módulo SafeKit farm.safe"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Aprenda a implementar el módulo farm.safe en Windows y Linux para el balanceo de carga de red NGINX y la conmutación por error automática. Esta guía le muestra cómo crear un clúster de alta disponibilidad para servicios web y aplicaciones mediante una IP virtual, sin necesidad de balanceadores de carga de hardware externos ni configuraciones complejas."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para NGINX, limitaciones de alta disponibilidad SafeKit , descripción general de la solución SafeKit /NGINX, instalación de la solución SafeKit /NGINX en Windows y Linux ( farm.safe ), configuración paso a paso de la solución SafeKit /NGINX, demostración de la solución SafeKit `farm` , 🔍 Hub de navegación de alta disponibilidad SafeKit"
---

# Balanceo de carga y conmutación por error de red NGINX: Instale el módulo SafeKit farm.safe {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-es app="NGINX" mod="farm"  %}}
 

## Descripción general de la solución SafeKit / NGINX {#overview-of-the-safekit--nginx-solution}

La solución se describe aquí: **💡 [ SafeKit : Software de equilibrio de carga y alta disponibilidad NGINX todo en uno ](</es/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)** .

## Instalación de la solución SafeKit / NGINX en Windows y Linux ( farm.safe ) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener NGINX instalado en 2 nodos o más (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-windows-es app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-es app="NGINX" mod="farm"  %}}
 

Nota: el módulo genérico **farm.safe** que va a configurar se incluye dentro del paquete.

## Configuración paso a paso de la solución SafeKit / NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-es app="NGINX" mod="farm"  %}}
 

## Demostración de la solución SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}