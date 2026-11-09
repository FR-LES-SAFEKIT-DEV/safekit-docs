---
title: "Alta disponibilidad GCP con SafeKit: Instale el módulo mirror.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/"
description: "Implemente el módulo mirror.safe para SafeKit en GCP para habilitar la replicación síncrona en tiempo real y la conmutación por error automática en Windows y Linux. Esta guía le muestra cómo configurar un clúster de 2 nodos sin recursos compartidos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para GCP, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución mirror SafeKit/GCP, Instalación de la solución mirror SafeKit/GCP en Windows y Linux (mirror.safe), Configuración paso a paso de la solución mirror SafeKit/GCP, Demostración de la solución mirror SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilidad GCP con SafeKit: Instale el módulo mirror.safe para la conmutación por error {#gcp-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="GCP" mod="mirror"  %}}
 

## Descripción general de la solución mirror SafeKit/GCP {#overview-of-the-safekit--gcp-mirror-solution}

La solución se describe aquí: **💡 [Alta disponibilidad de Google GCP: replicación y conmutación por error sincrónicas SafeKit](</es/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)**.

## Instalación de la solución mirror SafeKit/GCP en Windows y Linux (mirror.safe) {#installation-of-the-safekit--gcp-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuración del balanceador de carga de Google GCP {#configuration-of-the-google-gcp-load-balancer}

El balanceador de carga debe configurarse si se desea implementar una dirección IP virtual.  
Y el balanceador de carga debe configurarse para enviar periódicamente paquetes de estado a los nodos.  
Para ello, SafeKit proporciona una comprobación de estado que se ejecuta dentro de los nodos y que

  * devuelve OK cuando el estado del módulo mirror es PRIM (verde) o ALONE (verde)
  * devuelve NO ENCONTRADO en todos los demás estados


Debe configurar el balanceador de carga de Google GCP con:

  * Protocolo HTTP
  * puerto 9010, el puerto del servidor web SafeKit
  * URL /var/modules/mirror/ready.txt (si mirror es el nombre del módulo que implementará más adelante)


Para obtener más información, consulte [la configuración del balanceador de carga de Google GCP](<https://docs.cloud.google.com/load-balancing/docs/>). 


⚠️ No configure una dirección IP virtual en el paso 4 de la configuración paso a paso que se muestra a continuación. La dirección IP virtual ya está configurada en el balanceador de carga de Google GCP. La configuración de una IP virtual en el paso 4 solo es útil para la configuración local.

### Configuración de la seguridad de la red de Google GCP {#configuration-of-the-google-gcp-network-security}

La seguridad de la red debe configurarse para habilitar las comunicaciones de los siguientes protocolos y puertos:

  * UDP - 4800 para el servicio safeadmin (entre nodos SafeKit)
  * UDP - 8888 para el heartbeat del módulo (entre los nodos SafeKit)
  * TCP – 5600 para el módulo de replicación de archivos en tiempo real (entre nodos SafeKit)
  * TCP – 9010 para la comprobación del estado del balanceador de carga y para la consola web SafeKit que se ejecuta en el modo http
  * TCP – 9001 para configurar el modo https para la consola
  * TCP – 9453 para la consola web SafeKit que se ejecuta en modo https



{{%  insert-safekit-installation-package-windows-es app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

Nota: el módulo genérico **mirror.safe** que va a configurar se entrega dentro del paquete.

## Configuración paso a paso de la solución mirror SafeKit/GCP {#step-by-step-configuration-of-the-safekit--gcp-mirror-solution}


{{%  insert-safekit-82-configuration-es app="Windows" mod="mirror"  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}