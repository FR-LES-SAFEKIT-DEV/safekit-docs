---
title: "Alta disponibilidad en Azure: replicación en tiempo real y conmutación por error con SafeKit"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "Implemente el módulo mirror.safe de SafeKit en Azure para habilitar la replicación síncrona en tiempo real y la conmutación por error automática en Windows y Linux. Esta guía explica cómo configurar un clúster de dos nodos sin almacenamiento compartido para aplicaciones críticas."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Azure, Limitaciones de alta disponibilidad de SafeKit, Descripción general de la solución SafeKit / Azure mirror, Instalación de la solución SafeKit / Azure mirror en Windows y Linux (mirror.safe), Configuración paso a paso de la solución SafeKit / Azure mirror, Demostración de la solución mirror de SafeKit, 🔍 Centro de navegación de alta disponibilidad de SafeKit"
---

# Alta disponibilidad de Azure con SafeKit: instalar el módulo mirror.safe para la conmutación por error {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-es app="Azure" mod="mirror"  %}}

## Descripción general de la solución SafeKit / Azure mirror {#overview-of-the-safekit--azure-mirror-solution}

La solución se describe aquí: **💡[Alta disponibilidad de Microsoft Azure: replicación síncrona y conmutación por error con SafeKit](</es/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Instalación de la solución SafeKit / Azure mirror en Windows y Linux (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuración del equilibrador de carga de Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

Debe configurarse el equilibrador de carga si desea implementar una dirección IP virtual.
Además, el equilibrador de carga debe enviar periódicamente paquetes de comprobación de estado a los nodos.
Para ello, SafeKit proporciona una comprobación de estado que se ejecuta en los nodos y que:

  * devuelve OK cuando el estado del módulo mirror es PRIM (verde) o ALONE (verde)
  * devuelve NOT FOUND en todos los demás estados

Debe configurar el equilibrador de carga de Microsoft Azure con:

  * protocolo HTTP
  * puerto 9010, el puerto del servidor web de SafeKit
  * URL /var/modules/mirror/ready.txt (si mirror es el nombre del módulo que implementará posteriormente)

Para obtener más información, consulte [la configuración del equilibrador de carga de Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ No configure una dirección IP virtual en el paso 4 de la configuración paso a paso siguiente. La dirección IP virtual ya está establecida en el equilibrador de carga de Microsoft Azure. Configurar una IP virtual en el paso 4 solo es útil para una configuración local.

### Configuración de la seguridad de red de Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

Debe configurarse la seguridad de red para permitir las comunicaciones mediante los siguientes protocolos y puertos:

  * UDP - 4800 para el servicio safeadmin (entre nodos SafeKit)
  * UDP - 8888 para el latido del módulo (entre nodos SafeKit)
  * TCP – 5600 para la replicación de archivos en tiempo real del módulo (entre nodos SafeKit)
  * TCP – 9010 para la comprobación de estado del equilibrador de carga y la consola web de SafeKit en modo http
  * TCP – 9001 para configurar el modo https de la consola
  * TCP – 9453 para la consola web de SafeKit en modo https

{{%  insert-safekit-installation-package-windows-es app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}

Nota: el módulo genérico **mirror.safe** que va a configurar se incluye en el paquete.

## Configuración paso a paso de la solución SafeKit / Azure mirror {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-es app="Windows" mod="mirror"  %}}

## Demostración de la solución mirror de SafeKit {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
