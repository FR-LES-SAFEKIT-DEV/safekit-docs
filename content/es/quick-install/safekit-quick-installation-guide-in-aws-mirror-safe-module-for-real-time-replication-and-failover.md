---
title: "Alta disponibilidad AWS con SafeKit : Instale el módulo mirror.safe para la conmutación por error."
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "Implemente el módulo mirror.safe para SafeKit en AWS para habilitar la replicación síncrona en tiempo real y la conmutación por error automática en Windows y Linux . Esta guía le muestra cómo configurar un clúster de 2 nodos sin almacenamiento compartido para aplicaciones críticas."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para AWS , Limitaciones de alta disponibilidad de SafeKit , Descripción general de la solución SafeKit / AWS mirror , Instalación de la solución SafeKit / AWS mirror en Windows y Linux ( mirror.safe ), Configuración paso a paso de la solución SafeKit / AWS mirror , Demostración de la solución SafeKit mirror , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad AWS con SafeKit : Instale el módulo mirror.safe para la conmutación por error {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="AWS" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit / AWS mirror {#overview-of-the-safekit--aws-mirror-solution}

La solución se describe aquí: ** 💡 [ Amazon AWS Alta disponibilidad: SafeKit Replicación síncrona y conmutación por error ](</es/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ** .

## Instalación de la solución SafeKit / AWS mirror en Windows y Linux ( mirror.safe ) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuración del balanceador de carga Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

Si desea obtener una dirección IP virtual, deberá configurar el balanceador de carga.  
Además, el balanceador de carga debe configurarse para enviar periódicamente paquetes de estado a los nodos.  
Para ello, SafeKit proporciona una comprobación de estado que se ejecuta dentro de los nodos y que

  * Devuelve OK cuando el estado del módulo mirror es PRIM (verde) o ALONE (verde).
  * Devoluciones NO ENCONTRADAS en todos los demás estados


Debe configurar el balanceador de carga Amazon AWS con:

  * protocolo HTTP
  * puerto 9010, el puerto del servidor web SafeKit
  * URL /var/modules/mirror/ready.txt (si mirror es el nombre del módulo que implementará posteriormente)


Para obtener más información, consulte [ la configuración del balanceador de carga de Amazon AWS ](<https://aws.amazon.com/elasticloadbalancing/>) .


⚠️ No configure una dirección IP virtual en el paso 4 de la configuración paso a paso que se describe a continuación. La dirección IP virtual ya está configurada en el balanceador de carga Amazon AWS . Configurar una IP virtual en el paso 4 solo es útil para la configuración local.

### Configuración de la seguridad de red de Amazon AWS {#configuration-of-the-amazon-aws-network-security}

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

## Configuración paso a paso de la solución SafeKit / AWS mirror {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-es app="Windows" mod="mirror"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}