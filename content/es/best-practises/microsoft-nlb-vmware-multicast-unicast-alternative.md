---
title: "Alternativa a VMware NLB Microsoft : Solución a problemas de multidifusión y unidifusión"
canonical: "https://safekit.eviden.com/es/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "¿Problemas con el balanceo de carga de red (NLB) multicast o unicast en Microsoft en VMware? SafeKit propone un clúster farm sin SAN como una alternativa sencilla. Obtenga balanceo de carga y conmutación por error automáticos en Windows y Linux sin entradas ARP estáticas, suplantación de MAC ni configuración de red especializada."
category: "best-practises"
lang: "es"
topics: "Modo multidifusión NLB Microsoft , modo unidifusión NLB Microsoft , alternativa con SafeKit , ¿cómo funciona el clúster SafeKit en modo farm con Windows ?, 🔍 Hub de navegación de alta disponibilidad SafeKit"
---

# Alternativa a VMware NLB Microsoft : Problemas de multidifusión y unidifusión resueltos {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft Modo multidifusión NLB {#microsoft-nlb-multicast-mode}

Como se explica en la base de conocimientos de [ sobre la configuración del modo multidifusión de balanceo de carga de red (NLB) ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) , es necesario configurar manualmente la resolución ARP estática en el conmutador o enrutador para cada puerto conectado al clúster. La implementación del modo multidifusión NLB Microsoft en un entorno de red desconocido puede resultar una tarea compleja y laboriosa.

## Microsoft Modo unidifusión NLB {#microsoft-nlb-unicast-mode}

Con el modo unicast de Microsoft NLB, debe configurar el host ESXi/ESX para que no envíe paquetes RARP cuando cualquiera de sus máquinas virtuales esté encendida. Por eso, [ Microsoft NLB no funciona correctamente en modo unicast con VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>) .

## Alternativa con SafeKit {#alternative-with-safekit}

La configuración de la dirección IP virtual [ SafeKit ](</es/best-practises/how-a-virtual-ip-address-works/>) no requiere ninguna configuración de red especial y el balanceo de carga de red puede ejecutarse en cualquier entorno. Una característica importante cuando la solución debe implementarse en una infraestructura desconocida: conmutadores o enrutadores desconocidos, servidores físicos o virtuales.


{{%  insert-safekit-farm-es app="Windows"  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}