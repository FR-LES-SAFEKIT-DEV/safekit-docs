---
title: "Alta disponibilidad en la nube con SafeKit : Instale el módulo mirror.safe para la conmutación por error."
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "Implemente el módulo mirror.safe para SafeKit en la nube para habilitar la replicación síncrona en tiempo real y la conmutación por error automática en Windows y Linux . Esta guía le muestra cómo configurar un clúster de dos nodos sin almacenamiento compartido para aplicaciones críticas."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para la nube, limitaciones de alta disponibilidad de SafeKit , descripción general de la solución SafeKit / Cloud mirror , instalación de la solución SafeKit / Cloud mirror en Windows y Linux ( mirror.safe ), configuración paso a paso de la solución SafeKit / Cloud mirror , demostración de la solución SafeKit mirror , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad en la nube con SafeKit : Instale el módulo mirror.safe para la conmutación por error {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Cloud" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit / Cloud mirror {#overview-of-the-safekit--cloud-mirror-solution}

La solución se describe aquí: ** 💡 [ Alta disponibilidad independiente de la nube: SafeKit Replicación síncrona y conmutación por error ](</solutions/cloud-high-availability-cluster-synchronous-replication-failover/>) ** .

## Instalación de la solución SafeKit / Cloud mirror en Windows y Linux ( mirror.safe ) {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuración del balanceador de carga en la nube {#configuration-of-the-cloud-load-balancer}

Si desea implementar una dirección IP virtual, deberá configurar el balanceador de carga.  
Además, el balanceador de carga debe configurarse para enviar periódicamente paquetes de estado a los nodos.  
Para ello, SafeKit proporciona una comprobación de estado que se ejecuta dentro de los nodos y que

  * Devuelve OK cuando el estado del módulo mirror es PRIM (verde) o ALONE (verde).
  * Devoluciones NO ENCONTRADAS en todos los demás estados


Debe configurar el balanceador de carga de la nube con:

  * protocolo HTTP
  * puerto 9010, el puerto del servidor web SafeKit
  * URL /var/modules/mirror/ready.txt (si mirror es el nombre del módulo que implementará posteriormente)


⚠️ No configure una dirección IP virtual en el paso 4 de la configuración paso a paso que se describe a continuación. La dirección IP virtual ya está configurada en el balanceador de carga en la nube. Configurar una IP virtual en el paso 4 solo es útil para la configuración local.

### Configuración de la seguridad de la red en la nube {#configuration-of-the-cloud-network-security}

La seguridad de la red debe configurarse para permitir las comunicaciones para los siguientes protocolos y puertos:

  * UDP - 4800 para el servicio safeadmin (entre nodos SafeKit )
  * UDP - 8888 para el latido del módulo (entre nodos SafeKit )
  * TCP – 5600 para el módulo de replicación de archivos en tiempo real (entre nodos SafeKit )
  * TCP – 9010 para la comprobación del estado del balanceador de carga y para la consola web SafeKit que se ejecuta en modo http.
  * TCP – 9001 para configurar el modo https para la consola
  * TCP – 9453 para la consola web SafeKit que se ejecuta en modo https.



{{%  insert-safekit-installation-package-windows-es app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

Nota: el módulo genérico **mirror.safe** que va a configurar se incluye dentro del paquete.

## Configuración paso a paso de la solución SafeKit / Cloud mirror {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-es app="Windows" mod="mirror"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}