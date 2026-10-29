---
title: "Equilibrio de carga de red y conmutación por error en Azure: instalar el módulo farm.safe de SafeKit"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "Mejore el equilibrio de carga de red de Azure con la supervisión inteligente de aplicaciones de SafeKit. El módulo farm.safe proporciona una comprobación de estado dedicada para el equilibrador de carga de Azure y permite alta disponibilidad a nivel de aplicación, autorrecuperación y conmutación por error automática para aplicaciones críticas."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Azure, Limitaciones de alta disponibilidad de SafeKit, Descripción general de la solución SafeKit / Azure, Instalación de la solución SafeKit / Azure en Windows y Linux (farm.safe), Configuración paso a paso de la solución SafeKit / Azure, Demostración de la solución farm de SafeKit, 🔍 Centro de navegación de alta disponibilidad de SafeKit"
---

# Equilibrio de carga de red y conmutación por error en Azure: instalar el módulo farm.safe de SafeKit {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-es app="Azure" mod="farm"  %}}

## Descripción general de la solución SafeKit / Azure {#overview-of-the-safekit--azure-solution}

La solución se describe aquí: **💡[SafeKit: equilibrio de carga de Microsoft Azure y alta disponibilidad de aplicaciones con un clúster <span class="notranslate farm-term" translate="no">Farm</span>](</es/solutions/azure-load-balancing-cluster-failover/>)**.

## Instalación de la solución SafeKit / Azure en Windows y Linux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Configuración del equilibrador de carga de Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

El equilibrador de carga debe configurarse con una dirección IP virtual.
Además, debe enviar periódicamente paquetes de comprobación de estado a los nodos.
Para ello, SafeKit proporciona una comprobación de estado que se ejecuta en los nodos y que:

  * devuelve OK cuando el estado del módulo <span class="notranslate farm-term" translate="no">farm</span> es UP (verde)
  * devuelve NOT FOUND en todos los demás estados

Debe configurar el equilibrador de carga de Microsoft Azure con:

  * protocolo HTTP
  * puerto 9010, el puerto del servidor web de SafeKit
  * URL /var/modules/farm/ready.txt (si <span class="notranslate farm-term" translate="no">farm</span> es el nombre del módulo que implementará posteriormente)

Para obtener más información, consulte [la configuración del equilibrador de carga de Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ No configure una dirección IP virtual ni reglas de equilibrio de carga en el paso 4 de la configuración paso a paso siguiente. La dirección IP virtual y las reglas de equilibrio de carga ya están establecidas en el equilibrador de carga de Microsoft Azure. Configurarlas en el paso 4 solo es útil para una configuración local.

### Configuración de la seguridad de red de Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

Debe configurarse la seguridad de red para permitir las comunicaciones mediante los siguientes protocolos y puertos:

  * UDP - 4800 para el servicio safeadmin (entre nodos SafeKit)
  * UDP - 4803 para los latidos dentro del módulo <span class="notranslate farm-term" translate="no">farm</span> (entre nodos SafeKit)
  * TCP – 9010 para la comprobación de estado del equilibrador de carga y la consola web de SafeKit en modo http
  * TCP – 9001 para configurar el modo https de la consola
  * TCP – 9453 para la consola web de SafeKit en modo https

{{%  insert-safekit-installation-package-windows-es app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}

Nota: el módulo genérico **farm.safe** que va a configurar se incluye en el paquete.

## Configuración paso a paso de la solución SafeKit / Azure {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-es app="" mod="farm"  %}}

## Demostración de la solución <span class="notranslate farm-term" translate="no">farm</span> de SafeKit {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
