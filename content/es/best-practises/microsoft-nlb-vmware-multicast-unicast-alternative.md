---
title: "Alternativa a Microsoft NLB VMware: problemas de multicast y unicast resueltos"
canonical: "https://safekit.eviden.com/es/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "¿Tiene problemas con el multicast o el unicast de Microsoft NLB en VMware? SafeKit ofrece una alternativa sencilla: un clúster farm con equilibrio de carga automático y conmutación por error en Windows y Linux. No requiere entradas ARP estáticas, ni suplantación de MAC, ni configuración de red especializada."
category: "best-practises"
lang: "es"
topics: "Modo multicast de Microsoft NLB, Modo unicast de Microsoft NLB, Alternativa con SafeKit, ¿Cómo funciona el clúster SafeKit en modo farm con Windows?, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 51 expressions"
---

# Alternativa a Microsoft NLB VMware: problemas de multicast y unicast resueltos {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Modo multicast de Microsoft NLB {#microsoft-nlb-multicast-mode}

En el modo multicast, debe configurar manualmente la resolución ARP estática en el conmutador o el enrutador. Esto es necesario para cada puerto conectado al clúster. Para obtener más información, consulte el artículo de la base de conocimientos VMware [Configuración del modo multicast de Network Load Balancing (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). En un entorno de red desconocido, la implementación de Microsoft NLB en modo multicast puede ser compleja y exigente.

## Modo unicast de Microsoft NLB {#microsoft-nlb-unicast-mode}

En el modo unicast, debe configurar el host ESXi/ESX para que no envíe paquetes RARP cuando una de sus máquinas virtuales se encienda. De lo contrario, Microsoft NLB no funcionará correctamente con VMware. Para obtener más información, consulte el artículo de la base de conocimientos VMware [Microsoft NLB no funciona correctamente en el modo Unicast](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternativa con SafeKit {#alternative-with-safekit}

SafeKit utiliza una [dirección IP virtual](</es/best-practises/how-a-virtual-ip-address-works/>) que no requiere ninguna configuración de red especial. Su balanceo de carga de red funciona en cualquier entorno. Esto es importante cuando se implementa la solución en una infraestructura desconocida: conmutadores o routers desconocidos, servidores físicos o servidores virtuales.


{{%  insert-safekit-farm-es app="Windows"  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}