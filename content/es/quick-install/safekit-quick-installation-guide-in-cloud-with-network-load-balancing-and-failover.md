---
title: "Balanceo de carga y conmutación por error de la red en la nube: Instale el módulo SafeKit farm.safe"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Optimice el balanceo de carga de la red en la nube con la monitorización inteligente de aplicaciones del módulo SafeKit . Este módulo realiza una comprobación de estado específica para el balanceador de carga en la nube, lo que permite una alta disponibilidad sin farm.safe a nivel de aplicación. Consiga la recuperación automática y la conmutación por error para aplicaciones de misión crítica."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para la nube, limitaciones de alta disponibilidad de SafeKit , descripción general de la solución SafeKit /Cloud, instalación de la solución SafeKit /Cloud en Windows y Linux ( farm.safe ), configuración paso a paso de la solución SafeKit /Cloud, demostración de la solución SafeKit `farm` , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Balanceo de carga y conmutación por error de la red en la nube: Instale el módulo SafeKit farm.safe {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-es app="Cloud" mod="farm"  %}}
 

## Descripción general de la solución en la nube SafeKit / {#overview-of-the-safekit--cloud-solution}

La solución se describe aquí: ** 💡 [ SafeKit : Balanceo de carga en la nube y alta disponibilidad de aplicaciones Clúster `Farm` ](</es/solutions/cloud-load-balancing-cluster-failover/>) ** .

## Instalación de la solución SafeKit / Nube en Windows y Linux ( farm.safe ) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configuración del balanceador de carga en la nube {#configuration-of-the-cloud-load-balancer}

El balanceador de carga debe configurarse con una dirección IP virtual.  
Además, el balanceador de carga debe configurarse para enviar periódicamente paquetes de estado a los nodos.  
Para ello, SafeKit proporciona una comprobación de estado que se ejecuta dentro de los nodos y que

  * Devuelve OK cuando el estado del módulo `farm` es UP (verde).
  * Devoluciones NO ENCONTRADAS en todos los demás estados


Debe configurar el balanceador de carga de la nube con:

  * protocolo HTTP
  * puerto 9010, el puerto del servidor web SafeKit
  * URL /var/modules/farm/ready.txt (si `farm` es el nombre del módulo que implementará posteriormente)


⚠️ No configure una dirección IP virtual ni reglas de balanceo de carga en el paso 4 de la configuración paso a paso que se describe a continuación. La dirección IP virtual y las reglas de balanceo de carga ya están configuradas en el balanceador de carga en la nube. Configurar una IP virtual y reglas de balanceo de carga en el paso 4 solo es útil para la configuración local.

### Configuración de la seguridad de la red en la nube {#configuration-of-the-cloud-network-security}

La seguridad de la red debe configurarse para permitir las comunicaciones para los siguientes protocolos y puertos:

  * UDP - 4800 para el servicio safeadmin (entre nodos SafeKit )
  * UDP - 4803 para los latidos dentro del módulo `farm` (entre los nodos SafeKit )
  * TCP – 9010 para la comprobación del estado del balanceador de carga y para la consola web SafeKit que se ejecuta en modo http.
  * TCP – 9001 para configurar el modo https para la consola
  * TCP – 9453 para la consola web SafeKit que se ejecuta en modo https.



{{%  insert-safekit-installation-package-windows-es app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

Nota: el módulo genérico **farm.safe** que va a configurar se incluye dentro del paquete.

## Configuración paso a paso de la solución en la nube SafeKit / {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-es app="" mod="farm"  %}}
 

## Demostración de la solución SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}