---
title: "SafeKit: software de alta disponibilidad para Windows y Linux, sin SAN"
canonical: "https://safekit.eviden.com/es/"
description: "SafeKit es el software integral de alta disponibilidad sin SAN para Windows y Linux. Obtenga replicación síncrona en tiempo real, conmutación por error automática y equilibrio de carga en un paquete sencillo y rentable. Inicie su prueba gratuita de 30 días."
category: "home"
lang: "es"
topics: "Qué ofrece SafeKit, Elija su nivel de protección, Módulos listos para sus aplicaciones, Casos de uso de clientes, Precios sencillos y previsibles, Conozca los límites antes de empezar, Biblioteca de vídeos de SafeKit, 🔍 Centro de navegación de SafeKit para alta disponibilidad"
---

# SafeKit: software de alta disponibilidad para Windows y Linux, sin SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit convierte dos servidores estándar en un clúster de alta disponibilidad sin SAN que mantiene sus aplicaciones en funcionamiento. Replica los datos en tiempo real, reinicia la aplicación en el segundo servidor si falla el primero y reintegra automáticamente el servidor reparado. Se instala en los servidores que ya tiene, sin almacenamiento compartido ni conocimientos especializados de clustering.

La replicación es síncrona, por lo que no se pierden datos si falla un servidor y la aplicación vuelve a estar disponible en aproximadamente un minuto o menos. Las licencias son perpetuas y se facturan por servidor.

<a class="btn-download" href="/es/resources/safekit-free-trial/">Inicie su prueba gratuita de 30 días ›</a>

## Qué ofrece SafeKit {#features}

SafeKit combina cuatro funciones en un solo producto, gestionado desde una consola web o una línea de comandos, en Windows y Linux.

| Función | Cómo funciona |
|---|---|
| **Replicación en tiempo real** | Cada cambio en los archivos se copia al segundo servidor en el momento en que se produce, para evitar la pérdida de datos ante un fallo. |
| **Conmutación por error automática** | SafeKit detecta el fallo, mueve la dirección IP virtual y reinicia la aplicación en el otro servidor. |
| **Retorno automático** | El servidor reparado se resincroniza en segundo plano mientras la aplicación sigue funcionando. |
| **Equilibrio de carga** | El equilibrio de carga de red se ejecuta en los propios servidores, sin un balanceador ni proxy externos. |

![Consola web de SafeKit supervisando un clúster espejo de dos nodos para Windows y Linux, con los servidores PRIM y SECOND y la replicación activa de datos](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

No necesita una SAN, un disco de quórum, Active Directory ni ediciones Enterprise de su sistema operativo o base de datos.

<a class="btn-download" href="/es/architectures/">Explore las arquitecturas de clúster ›</a>

## Elija su nivel de protección {#protection-levels}

La **alta disponibilidad de aplicaciones** (`mirror.safe`, `farm.safe` y los módulos de aplicación) replica únicamente los datos de la aplicación y la reinicia en el segundo servidor. Requiere saber qué servicios reiniciar, qué carpetas replicar en tiempo real y qué dirección IP virtual conmutar. Funciona en servidores físicos, máquinas virtuales con cualquier hipervisor, incluidos VMware, Hyper-V y KVM, y en la nube; además, ofrece la recuperación más rápida.

La **alta disponibilidad de VM** (`hyperv.safe`, `kvm.safe`) replica y conmuta la máquina virtual completa, por lo que no necesita conocer el funcionamiento de la aplicación. Es adecuada para entornos con varias aplicaciones distribuidas en varias VM.

<a class="btn-download" href="/es/best-practises/vm-ha-vs-application-ha/">Compare la alta disponibilidad de aplicaciones y de VM ›</a>

## Módulos listos para sus aplicaciones {#modules}

Los módulos preconfigurados son gratuitos y están incluidos con el producto. Cada módulo define qué servicios reiniciar y qué carpetas replicar para una aplicación concreta.

- **Bases de datos:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB y Firebird
- **Web:** Apache, IIS y NGINX
- **VM y contenedores:** Hyper-V, KVM, Docker, Podman y Kubernetes (k3s)
- **Nube:** AWS, Azure, GCP y otras nubes
- **Seguridad física e industria:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha y Siemens

<a class="btn-download" href="/es/solutions/">Consulte todas las soluciones y módulos ›</a>

## Casos de uso de clientes {#use-cases}

- **Gestión de vídeo (VMS):** mantiene disponibles el vídeo en directo y las grabaciones durante un fallo del servidor. Se utiliza con Milestone, Genetec y Hanwha.
- **Control de acceso (EACS):** mantiene siempre disponibles las credenciales y las alarmas. Se utiliza con Hirsch Microsesame, Nedap AEOS y Siemens SiPass.
- **SCADA e industria:** permite controlar las líneas de producción, por ejemplo en tostaderos de café Probat y sistemas de clasificación de equipaje ALSTEF.
- **Gestión de edificios (BMS):** mantiene en funcionamiento los sistemas de climatización, seguridad y energía. Se utiliza con Siemens Desigo CC y Bosch BIS.
- **Control del tráfico aéreo (ATC):** mantiene a los controladores conectados a aplicaciones esenciales de plataforma, por ejemplo con ADB SafeGate.
- **Centro de control de metro (OCC):** mantiene la supervisión de las líneas automatizadas y sin conductor del metro de París.
- **Ubicaciones Edge:** convierte dos servidores estándar en un clúster HA donde no hay centro de datos.
- **Fabricantes de software (OEM):** añaden alta disponibilidad a su catálogo como opción exclusivamente de software.

<a class="btn-download" href="/es/use-cases/">Explore todos los casos de uso ›</a>

## Precios sencillos y previsibles {#pricing}

SafeKit se vende con una licencia perpetua, sin suscripción obligatoria. El precio depende únicamente del número de servidores, no de los núcleos o sockets de CPU, y todos los módulos de aplicación son gratuitos. También funciona con ediciones estándar de Windows, Linux y sus bases de datos, por lo que no necesita pagar por ediciones Enterprise.

<a class="btn-download" href="/es/safekit-pricing/">Solicite un presupuesto ›</a>

## Conozca los límites antes de empezar {#limits}

SafeKit está diseñado para ser sencillo, no para todos los casos. Es adecuado para unos pocos terabytes de datos replicados, menos de 1.000.000 de archivos, hasta 32 VM con alta disponibilidad de VM y dos nodos en la misma LAN o VLAN con baja latencia (normalmente menos de 5 ms de ida y vuelta).

Para volúmenes mayores, es preferible usar almacenamiento compartido u otro enfoque.

<a class="btn-download" href="/es/product/#safekit-ha-limitations">Consulte la lista completa de limitaciones ›</a>

{{%  insert-safekit-videos-table-es  %}}

{{%  insert-safekit-hub-es  %}}
