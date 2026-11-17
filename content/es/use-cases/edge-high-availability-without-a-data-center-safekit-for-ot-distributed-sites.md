---
title: "Alta disponibilidad en el edge sin centro de datos: SafeKit para OT y sitios distribuidos"
canonical: "https://safekit.eviden.com/es/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Los sitios de computación perimetral no tienen un centro de datos, pero aun así necesitan alta disponibilidad. SafeKit convierte dos servidores estándar en un clúster de alta disponibilidad «plug-and-play». No requiere SAN ni personal de TI, y la conmutación por error es automática."
category: "use-cases"
lang: "es"
topics: "El desafío de la alta disponibilidad en el edge, Por qué SafeKit es la solución natural para la computación perimetral, Idoneidad para la implementación en el borde y distribuida, Por qué los entornos OT perimetrales son diferentes, Casos de uso ideales en el edge, Alta disponibilidad en el edge frente a los centros de datos: diferencias clave, Sistemas operativos y plataformas compatibles, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-17.1 | glossaire 2026-11-17.4 | Translation LLM | 48 expressions"
---

# Alta disponibilidad en el edge sin centro de datos: SafeKit para OT y sitios distribuidos {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## El desafío de la alta disponibilidad en el edge {#the-edge-ha-challenge}

Los sitios de computación perimetral a menudo no tienen un centro de datos ni experiencia en alta disponibilidad. Sin embargo, la continuidad del negocio es fundamental para ellos. Una planta de fabricación, una plataforma petrolífera en alta mar, una clínica hospitalaria, una tienda minorista o un sitio de antena 5G no pueden permitirse el tiempo de inactividad. Pero estos sitios no pueden justificar el costo y la complejidad de un clúster de centro de datos tradicional.

Las soluciones tradicionales de alta disponibilidad, como Microsoft Failover Cluster (WSFC), Pacemaker con Corosync o VMware HA, fueron diseñadas para centros de datos. Requieren almacenamiento compartido (SAN o NAS), hardware de clúster dedicado, personal de TI permanente y conocimientos complejos del sistema operativo. Ninguno de estos existe en el edge.

SafeKit fue creado precisamente para cubrir esta necesidad. Mantiene las aplicaciones perimetrales en funcionamiento en fábricas, plataformas petrolíferas, barcos, seguridad de edificios, control del tráfico aéreo, redes 5G, sanidad, comercio minorista y mucho más. Solo necesita dos servidores estándar conectados por una LAN.


![SafeKit para la computación perimetral](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Por qué SafeKit es la solución natural para la computación perimetral {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit convierte dos servidores perimetrales estándar en un clúster de alta disponibilidad "plug-and-play". Los servidores pueden ser de cualquier marca, físicos o virtuales. No hay almacenamiento compartido, ni SAN, ni hardware especial. Un paquete de software ligero ofrece las siguientes características:

  * **Replicación de archivos síncrona en tiempo real.** Los datos se duplican a nivel de byte en el servidor en espera en el momento de la escritura.
  * **Conmutación por error automática.** Si el servidor principal falla, el servidor en espera toma el control en cuestión de segundos, sin intervención humana.
  * **Balanceo de carga de red opcional.** En las implementaciones activas-activas, ambos servidores comparten la carga de trabajo.
  * **Consola web.** La gestión se realiza a través de un navegador y es accesible de forma remota mediante HTTPS. No requiere conocimientos especializados in situ.
  * **Instalación silenciosa y programable.** Es adecuada para la implementación masiva en cientos de sitios distribuidos y para su integración en productos OEM.


No es necesario comprar una SAN. Tampoco necesita una licencia Windows Server Datacenter. No necesita experiencia en clústeres Linux ni hardware de clúster dedicado. Toda la pila de alta disponibilidad es un único paquete de software.

## Idoneidad para la implementación en el borde y distribuida {#edge--distributed-deployment-suitability}

SafeKit está diseñado específicamente para la computación perimetral, las sucursales y las empresas distribuidas:

Requisito de computación perimetral | Solución SafeKit  
---|---  
No hay personal de TI dedicado en el lugar | Conmutación por error automática sin intervención manual  
Sin infraestructura SAN ni NAS | Arquitectura solo con discos locales y sin SAN  
Gestión remota | Consola web accesible a través de HTTPS desde cualquier navegador  
Baja huella de hardware | Dos servidores o máquinas virtuales estándar sin hardware especial  
Funciona detrás de cortafuegos y NAT | Puertos configurables y consola basada en HTTPS  
Recuperación ante desastres en múltiples sitios | Replicación en tiempo real con el módulo mirror entre dos sitios geográficos a través de una VLAN extendida  
Redes aisladas o sin conexión | Sin dependencia de internet y totalmente autónomo  
Implementación OEM o integrada | Instalación silenciosa y programable que los proveedores de software pueden integrar  
Cientos de clústeres distribuidos | Diseñado para empresas distribuidas con muchas sucursales  
  
## Por qué los entornos OT perimetrales son diferentes {#why-edge-ot-environments-are-different}

Los entornos de tecnología operativa (OT) incluyen SCADA, sistemas de gestión de edificios (BMS), seguridad física y control industrial. Sus requisitos difieren fundamentalmente de los centros de datos de TI:

  * **No hay personal de TI en el sitio.** Una subestación, una estación de bombeo remota o un barco no tienen un administrador de sistemas. La alta disponibilidad debe ser autogestionable.
  * **Redes aisladas o restringidas.** Muchos sitios de tecnología operativa no tienen acceso a Internet y tienen un ancho de banda WAN limitado. El software de alta disponibilidad debe funcionar completamente sin conexión.
  * **Disponibilidad 24/7 y tolerancia cero a la complejidad.** Detener una línea de producción, perder la videovigilancia o interrumpir el control de acceso cuesta mucho más que el propio software de alta disponibilidad.
  * **Ciclos de vida largos de los equipos.** Los servidores OT pueden funcionar entre 10 y 15 años. La solución de alta disponibilidad debe ser estable y de bajo mantenimiento, y no debe requerir actualizaciones constantes.
  * **Solo hardware x86 estándar.** Un sitio industrial remoto no tiene presupuesto ni justificación para una SAN o nodos de clúster dedicados.
  * **Tolerancia cero con la complejidad del sistema operativo.** El software de clúster tradicional requiere experiencia en clústeres. Los operadores de OT no tienen esta experiencia y no deberían necesitarla.


El modelo SafeKit aborda directamente cada una de estas limitaciones: sin SAN, dos servidores y conmutación por error automática.

## Casos de uso ideales en el edge {#ideal-edge-use-cases}

SafeKit se adapta a cualquier sitio sin centro de datos donde la alta disponibilidad siga siendo importante:

Industria | Sitio perimetral típico | Aplicación crítica  
---|---|---  
Seguridad física y vigilancia | Edificios, campus, aeropuertos | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestión de edificios (BMS) | Edificios de oficinas, hospitales, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Control de acceso electrónico (EACS) | Instalaciones y campus seguros | Siemens SiPass, Nedap, Bosch AMS, Hirsch MicroSesame  
SCADA y control industrial | Fábricas, subestaciones, plantas de tratamiento de agua | Cualquier software SCADA, DCS o HMI en Windows o Linux  
Control del tráfico aéreo (ATC) | Aeropuertos, torres de control | Sistemas de gestión del tráfico aéreo y de radar  
Centros de control de operaciones (OCC) | Metro, ferrocarril, centros de transporte | Señalización ferroviaria y gestión de estaciones  
Marítimo | Buques, embarcaciones navales | Sistemas de navegación, carga y gestión a bordo  
Petróleo y gas | Plataformas marinas, plataformas remotas | Sistemas de control de procesos y de seguridad  
Telecomunicaciones | Sitios de antenas 5G, nodos MEC | Servidores de computación en el borde de la red de acceso múltiple (MEC)  
Atención médica | Clínicas, centros de diagnóstico remotos | Imágenes médicas, datos de pacientes, diagnósticos remotos  
Venta al por menor | Tiendas, sucursales, almacenes | Punto de venta y gestión de inventario  
Militar y defensa | Bases de operaciones avanzadas, unidades de campo | Sistemas de mando y comunicaciones de misión crítica  
  
## Alta disponibilidad en el edge frente a los centros de datos: diferencias clave {#edge-vs-data-center-ha-key-differences}

Criterio | Alta disponibilidad del centro de datos (WSFC, Pacemaker, VMware HA) | Alta disponibilidad SafeKit en el edge  
---|---|---  
Almacenamiento | Requiere almacenamiento compartido (SAN o NAS) | SANless, solo con discos locales  
Hardware | Nodos de clúster dedicados, adaptadores de bus de host (HBA) y conmutadores | Dos servidores x86 estándar de cualquier marca  
Experiencia en sistemas operativos | Habilidades en clústeres de Windows Server Datacenter o Linux | Habilidades estándar de administración Windows o Linux  
Personal in situ | Necesario para la configuración y la intervención | No es necesario, porque la conmutación por error es totalmente automática  
Dependencia de Internet o de la nube | A menudo gestionado en la nube | Funciona en redes totalmente aisladas  
Escala de implementación | Centro de datos único | Cientos de sitios distribuidos  
Costo de la licencia | Alto (licencias de sistema operativo de centro de datos y SAN) | Una licencia de software asequible por clúster  
  
{{%  insert-supported-os-es  %}}

Para conocer las especificaciones técnicas completas, las limitaciones de tamaño y los criterios de adquisición, lea la referencia técnica 📘 [RFI y RFP](</es/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>).


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}