---
title: "Alta disponibilidad en el borde de la red sin centro de datos: SafeKit para OT y sitios distribuidos"
canonical: "https://safekit.eviden.com/es/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Los sitios periféricos no tienen centro de datos, pero aun así necesitan alta disponibilidad. SafeKit convierte dos servidores estándar en un clúster de alta disponibilidad plug-and-play: sin SAN, sin personal de TI, con conmutación por error automática."
category: "use-cases"
lang: "es"
topics: "El desafío de la alta disponibilidad en el borde, ¿Qué hace que SafeKit sea la opción natural para el borde?, Idoneidad para la implementación en el borde y distribuida, ¿Por qué los entornos OT en el borde son diferentes?, Casos de uso ideales para el borde, Alta disponibilidad en el borde frente a la del centro de datos: diferencias clave, Requisitos técnicos mínimos, 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad en el borde sin centro de datos: SafeKit para OT y sitios distribuidos {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## El desafío Edge HA {#the-edge-ha-challenge}

Los emplazamientos periféricos a menudo carecen de centro de datos y de experiencia en alta disponibilidad, pero la continuidad del negocio es fundamental. Una fábrica, una plataforma petrolífera en alta mar, una clínica, una tienda o una estación de antenas 5G no pueden permitirse tiempos de inactividad, pero tampoco justifican el coste y la complejidad de un clúster de alta disponibilidad de un centro de datos tradicional.

Las soluciones de alta disponibilidad tradicionales Microsoft Failover Cluster (WSFC), Pacemaker/Corosync, VMware HA— fueron diseñadas para centros de datos: presuponen almacenamiento compartido (SAN/NAS), hardware de clúster dedicado, personal de TI permanente y conocimientos avanzados a nivel de sistema operativo. Ninguna de estas características existe en el entorno perimetral.

SafeKit se diseñó precisamente para cubrir esta necesidad. Mantiene las aplicaciones de borde en funcionamiento en fábricas, plataformas petrolíferas, barcos, seguridad de edificios, control de tráfico aéreo, redes 5G, atención médica, comercio minorista y más, con tan solo dos servidores estándar y una LAN.


![ SafeKit para Edge ](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## ¿Qué hace que SafeKit sea la opción ideal para Edge {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit convierte dos servidores perimetrales estándar (de cualquier marca, físicos o virtuales) en un clúster HA plug-and-play, sin almacenamiento compartido, sin SAN ni hardware especial. Una pila de software ligera ofrece:

  * **Replicación síncrona de archivos en tiempo real** : los datos se replican byte a byte en el servidor de respaldo en el momento de la escritura.
  * **Conmutación por error automática** : si el servidor principal falla, el servidor de respaldo toma el control sin intervención humana, en cuestión de segundos.
  * **Equilibrio de carga de red opcional** : para implementaciones activo-activo donde ambos servidores comparten la carga de trabajo
  * **Consola web** : gestión basada en navegador, accesible de forma remota a través de HTTPS, sin necesidad de conocimientos técnicos in situ.
  * **Instalación silenciosa y programable** : adecuada para la integración OEM y el despliegue masivo en cientos de sitios distribuidos.


No es necesario adquirir una SAN, ni licencia de centro de datos para el servidor Windows , ni conocimientos técnicos sobre el sistema operativo del clúster Linux , ni hardware de clúster dedicado. Toda la infraestructura de alta disponibilidad (HA) es un único paquete de software.

## Idoneidad para implementación distribuida y en el borde {#edge--distributed-deployment-suitability}

SafeKit está diseñado específicamente para escenarios de borde, sucursales y empresas distribuidas:

Requisito de borde | SafeKit Respuesta  
---|---  
No se requiere personal de TI dedicado en el sitio | Conmutación por error automática, no se requiere intervención manual  
Sin infraestructura SAN/NAS | Arquitectura sin SAN, solo discos locales  
Administración remota | Consola web accesible a través de HTTPS desde cualquier navegador.  
Bajo consumo de hardware | 2 servidores o máquinas virtuales estándar, sin hardware especial  
Funciona detrás de cortafuegos/NAT | Puertos configurables, consola basada en HTTPS  
Recuperación ante desastres en múltiples sitios | Mirror entre dos sitios geográficos a través de VLAN extendida  
Redes aisladas/sin conexión | Sin dependencia de internet; totalmente autónomas  
Implementación OEM/integrada | Instalación silenciosa, programable, integrable por editores de software  
Cientos de clústeres distribuidos | Diseñado para empresas distribuidas que gestionan muchas sucursales  
  
## Por qué los entornos Edge OT son diferentes {#why-edge-ot-environments-are-different}

Los entornos de OT (Tecnología Operativa) —SCADA, BMS, seguridad física, control industrial— tienen requisitos que difieren fundamentalmente de los centros de datos de TI:

  * **No hay personal de TI en el sitio.** Una subestación, una estación de bombeo remota o un barco no tiene administrador de sistemas. HA debe ser autogestionable.
  * **Redes aisladas o con recursos limitados.** Muchos sitios OT no tienen acceso a internet y su ancho de banda WAN es limitado. El software HA debe funcionar completamente sin conexión.
  * **Disponibilidad 24/7, tolerancia cero a la complejidad.** Detener una línea de producción, perder la videovigilancia o interrumpir el control de acceso cuesta mucho más que el propio software HA.
  * **Ciclos de vida prolongados de los equipos.** Los servidores OT pueden funcionar entre 10 y 15 años. La solución HA debe ser estable, requerir poco mantenimiento y no necesitar actualizaciones constantes.
  * **Solo hardware x86 estándar.** No hay presupuesto ni justificación para SAN o nodos de clúster dedicados en un sitio industrial remoto.
  * **Intolerancia a la complejidad a nivel del sistema operativo.** Pacemaker, Corosync o WSFC requieren conocimientos especializados en clústeres que los operadores de OT simplemente no tienen y no deberían necesitar.


El modelo de SafeKit , sin SAN, con dos servidores y conmutación por error automática, aborda directamente cada una de estas limitaciones.

## Casos de uso ideales en el borde {#ideal-edge-use-cases}

Cualquier sitio sin centro de datos, donde la alta disponibilidad sigue siendo importante:

Vertical | Sitio de borde típico | Aplicación crítica  
---|---|---  
Seguridad física y vigilancia | Edificios, campus, aeropuertos | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
Gestión de edificios (BMS) | Edificios de oficinas, hospitales, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Control de acceso electrónico (EACS) | Instalaciones seguras, campus | Siemens SiPass, Nedap , Bosch AMS  
SCADA y control industrial | Fábricas, subestaciones, plantas de tratamiento de agua | Cualquier software SCADA, DCS o HMI en Windows o Linux  
Control de tráfico aéreo (ATC) | Aeropuertos, torres de control | Gestión de ATC y sistemas de radar  
Centros de control de operaciones (OCC) | Metro, ferrocarril, centros de transporte | Señalización ferroviaria y gestión de estaciones  
Sistemas marítimos | Buques, embarcaciones navales | Sistemas de navegación, carga y gestión a bordo  
Petróleo y gas | Plataformas marinas, plataformas remotas | Sistemas de control de procesos y seguridad  
Telecomunicaciones | Emplazamientos de antenas 5G, nodos MEC | Servidores de computación de borde de acceso múltiple (MEC)  
Atención médica | Clínicas, centros de diagnóstico remoto | Imágenes médicas, datos de pacientes, diagnóstico remoto  
Comercio minorista | Tiendas, sucursales, almacenes | Gestión de puntos de venta e inventario  
Defensa | Bases operativas avanzadas, unidades de campo | Sistemas de mando y comunicaciones de misión crítica  
  
## Alta disponibilidad en el borde de la red frente a la del centro de datos: diferencias clave {#edge-vs-data-center-ha-key-differences}

Criterion | del centro de datos (WSFC, Pacemaker, VMware HA) | SafeKit del borde  
---|---|---  
Almacenamiento | Requiere almacenamiento compartido SAN/NAS | Sin SAN: solo discos locales  
Hardware | Nodos de clúster dedicados, HBA, conmutadores | Cualquier par de servidores x86 estándar  
Conocimientos de sistemas operativos | Windows Centro de datos o clúster Linux Habilidades de sistemas operativos | Estándar Windows / Linux Habilidades de administración  
Personal in situ | Necesario para la configuración e intervención | No necesario: totalmente automático  
Dependencia de Internet/nube | A menudo gestionado en la nube | Totalmente compatible con aislamiento de red  
Escala de despliegue | Centro de datos único | Cientos de sitios distribuidos  
Costo de licencia | Alto (sistema operativo de centro de datos, licencias SAN) | Licencia de software asequible única por clúster  
Tiempo de espera típico (RTO) | (1–5 minutos) | (menos de 1 minuto, configurable)  
  
## Requisitos técnicos mínimos {#technical-minimum-requirements}

  * Servidores **:** 2 servidores x86 estándar o máquinas virtuales (de cualquier marca de hardware, físico o virtual) o ARM (solo Linux )
  * Sistema operativo **:** Windows Server 2019 / 2022 / 2025, Windows 11, RHEL 8/9, Ubuntu 24.04
  * Red **: LAN de 1 Gbps** para replicación; se recomienda una red de latido dedicada.
  * Almacenamiento **: Solo discos locales** ; no se admiten SAN, NAS ni almacenamiento compartido de ningún tipo.
  * **No se requiere edición especial del sistema operativo.** — Windows Server Standard es suficiente; no se requiere licencia de Datacenter.


Para conocer las especificaciones técnicas completas, las restricciones de tamaño y los criterios de adquisición, consulte la referencia técnica de RFP/RFI [ 📘 ](</es/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) .


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}