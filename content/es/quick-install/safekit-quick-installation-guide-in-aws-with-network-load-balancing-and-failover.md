---
title: "Balanceo de carga y conmutación por error de la red AWS: Instale el módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/"
description: "Mejore el equilibrio de carga de red AWS con la supervisión inteligente de aplicaciones de SafeKit. El módulo farm.safe proporciona una comprobación de estado dedicada para el balanceador de carga AWS, lo que permite una alta disponibilidad (HA) sin interrupciones a nivel de aplicación. Consiga la autocorrección y la conmutación por error automáticas para las aplicaciones de misión crítica."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para AWS, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/AWS, Instalación de la solución SafeKit/AWS en Windows y Linux (farm.safe), Configuración paso a paso de la solución SafeKit/AWS, Demostración de la solución farm SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Balanceo de carga y conmutación por error de la red AWS: Instale el módulo farm.safe SafeKit {#aws-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-es app="AWS" mod="farm"  %}}
 

## Descripción general de la solución SafeKit/AWS {#overview-of-the-safekit--aws-solution}

La solución se describe aquí: **💡 [SafeKit: clúster <span class="notranslate farm-term" translate="no">farm</span> equilibrio de carga y alta disponibilidad de aplicaciones Amazon AWS](</es/solutions/aws-load-balancing-cluster-failover/>)**.

## Instalación de la solución SafeKit/AWS en Windows y Linux (farm.safe) {#installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe}

### Configuración del balanceador de carga Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

El balanceador de carga debe configurarse con una dirección IP virtual.  
Y el balanceador de carga debe configurarse para enviar periódicamente paquetes de estado a los nodos.  
Para ello, SafeKit proporciona una comprobación de estado que se ejecuta dentro de los nodos y que

  * devuelve OK cuando el estado del módulo <span class="notranslate farm-term" translate="no">farm</span> es UP (verde)
  * devuelve NO ENCONTRADO en todos los demás estados


Debe configurar el balanceador de carga Amazon AWS con:

  * Protocolo HTTP
  * puerto 9010, el puerto del servidor web SafeKit
  * URL /var/modules/farm/ready.txt (si <span class="notranslate farm-term" translate="no">farm</span> es el nombre del módulo que implementará más adelante)


Para obtener más información, consulte [la configuración del balanceador de carga Amazon AWS](<https://aws.amazon.com/elasticloadbalancing/>).


⚠️ No configure una dirección IP virtual ni reglas de equilibrio de carga en el paso 4 de la configuración paso a paso que se muestra a continuación. La dirección IP virtual y las reglas de equilibrio de carga ya están configuradas en el balanceador de carga Amazon AWS. La configuración de una IP virtual y reglas de equilibrio de carga en el paso 4 solo es útil para la configuración local.

### Configuración de la seguridad de la red Amazon AWS {#configuration-of-the-amazon-aws-network-security}

La seguridad de la red debe configurarse para habilitar las comunicaciones de los siguientes protocolos y puertos:

  * UDP - 4800 para el servicio safeadmin (entre nodos SafeKit)
  * UDP - 4803 para el heartbeat dentro del módulo <span class="notranslate farm-term" translate="no">farm</span> (entre los nodos SafeKit)
  * TCP – 9010 para la comprobación del estado del balanceador de carga y para la consola web SafeKit que se ejecuta en el modo http
  * TCP – 9001 para configurar el modo https para la consola
  * TCP – 9453 para la consola web SafeKit que se ejecuta en modo https



{{%  insert-safekit-installation-package-windows-es app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

Nota: el módulo genérico **farm.safe** que va a configurar se entrega dentro del paquete.

## Configuración paso a paso de la solución SafeKit/AWS {#step-by-step-configuration-of-the-safekit--aws-solution}


{{%  insert-safekit-82-farm-configuration-es app="" mod="farm"  %}}
 

## Demostración de la solución <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}