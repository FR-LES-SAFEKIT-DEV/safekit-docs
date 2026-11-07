---
title: "SafeKit: software de alta disponibilidad para Windows y Linux, sin SAN"
canonical: "https://safekit.eviden.com/es/"
description: "SafeKit es el software todo en uno de alta disponibilidad sin SAN para Windows y Linux. Obtenga replicación síncrona en tiempo real, conmutación por error automática y equilibrio de carga en un paquete sencillo y rentable. Inicie su prueba gratuita de 30 días."
category: "home"
lang: "es"
topics: "Qué hace SafeKit, elija su nivel de protección, módulos listos para usar para sus aplicaciones, casos de uso de clientes, precios simples y predecibles, conozca los límites antes de empezar, videoteca de SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-05.8 | glossaire 2026-11-05.12 | Translation LLM | 12 expressions"
---

# SafeKit: software de alta disponibilidad para Windows y Linux, sin SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit convierte dos servidores estándar en un clúster de alta disponibilidad sin SAN que mantiene sus aplicaciones en funcionamiento. Replica sus datos en tiempo real, reinicia su aplicación en el segundo servidor si el primero falla y reintegra automáticamente el servidor fallido una vez reparado. Se instala en los servidores que ya tiene, sin necesidad de almacenamiento compartido ni experiencia en clústeres.

La replicación es síncrona, por lo que no se pierden datos cuando falla un servidor y su aplicación vuelve a estar disponible en aproximadamente un minuto o menos. Las licencias son perpetuas y se venden por servidor.

<a class="btn-download" href="/es/resources/safekit-free-trial/">Comience su prueba gratuita de 30 días ›</a>


## Qué hace SafeKit {#features}

SafeKit combina cuatro funciones en un solo producto, gestionado desde una consola web o una línea de comandos, en Windows y Linux.

| Función | Cómo funciona |
|---|---|
| **Replicación en tiempo real** | Cada cambio que se realiza en los archivos se copia en el segundo servidor a medida que ocurre, por lo que un fallo no supone la pérdida de datos. |
| **Conmutación por error automática** | SafeKit detecta el fallo, mueve la dirección IP virtual y reinicia la aplicación en el otro servidor. |
| **Failback automático** | El servidor reparado se resincroniza en segundo plano mientras la aplicación sigue ejecutándose. |
| **Equilibrio de carga** | El balanceo de carga de la red se ejecuta dentro de los servidores, sin necesidad balanceador de carga o proxy externo. |

![Consola web de SafeKit que monitoriza un clúster mirror 2 nodos para Windows y Linux, con los servidores PRIM y SECOND y replicación de datos activa.](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

No necesita una SAN, un disco de quórum, Active Directory ni ediciones empresariales de su sistema operativo o base de datos.

<a class="btn-download" href="/es/architectures/">Explore las arquitecturas de clúster ›</a>


## Elija su nivel de protección {#protection-levels}

**HA de aplicación** (`mirror.safe`, `farm.safe` y los módulos de aplicación) replica solo los datos de su aplicación y reinicia la aplicación en el segundo servidor. Requiere que sepa qué servicios reiniciar, qué carpetas replicar en tiempo real y qué dirección IP virtual conmutar por error. Funciona en servidores físicos, en máquinas virtuales en todos los hipervisores, incluidos VMware, Hyper-V y KVM, y en la nube, y ofrece la recuperación más rápida.

**HA de VM** (`hyperv.safe`, `kvm.safe`) replica y realiza la conmutación por error de toda la máquina virtual, por lo que no es necesario saber cómo funciona la aplicación. Es adecuado para entornos con varias aplicaciones distribuidas en varias máquinas virtuales.

<a class="btn-download" href="/es/best-practises/vm-ha-vs-application-ha/">Comparación entre HA de aplicación y HA de VM ›</a>


## Módulos listos para usar para sus aplicaciones {#modules}

Los módulos preconfigurados son gratuitos y se incluyen con el producto. Cada uno define qué servicios reiniciar y qué carpetas replicar para una aplicación determinada.

- **Bases de datos:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **Máquinas virtuales y contenedores:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Nube:** AWS, Azure, GCP y otras nubes
- **Seguridad física e industria:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/es/solutions/">Explorar todas las soluciones y módulos ›</a>


## Casos de uso del cliente {#use-cases}

- **Gestión de vídeo (VMS):** mantiene el vídeo en directo y grabado disponible durante un fallo del servidor. Se utiliza con Milestone, Genetec y Hanwha.
- **Control de acceso (EACS):** mantiene las credenciales y las alarmas disponibles en todo momento. Se utiliza con Hirsch Microsesame, Nedap AEOS y Siemens SiPass.
- **SCADA e industria:** mantiene a los operadores en control de las líneas de producción, por ejemplo, los tostadores de café Probat y las máquinas clasificadoras de equipaje ALSTEF.
- **Gestión de edificios (BMS):** mantiene en funcionamiento los sistemas de climatización, seguridad y energía. Se utiliza con Siemens Desigo CC y Bosch BIS.
- **Control del tráfico aéreo (ATC):** mantiene a los controladores conectados a aplicaciones críticas del lado aire, por ejemplo, con ADB SafeGate.
- **Control de operaciones de metro (OCC):** mantiene la supervisión disponible para las líneas de metro automatizadas y sin conductor de París.
- **Sitios perimetrales:** convierte dos servidores estándar en un clúster de alta disponibilidad (HA) donde no hay un centro de datos.
- **Editores de software (OEM):** añada alta disponibilidad a su catálogo como una opción de solo software.

<a class="btn-download" href="/es/use-cases/">Explora todos los casos de uso ›</a>


## Precios sencillos y predecibles {#pricing}

SafeKit se vende con una licencia perpetua, por lo que no hay suscripción obligatoria. El precio depende solo del número de servidores, no de los núcleos o sockets de la CPU, y todos los módulos de la aplicación son gratuitos. También funciona con las ediciones estándar de Windows, Linux y sus bases de datos, por lo que no tendrá que pagar por las ediciones Enterprise.

<a class="btn-download" href="/es/safekit-pricing/">Solicitar presupuesto ›</a>


## Conozca los límites antes de empezar {#limits}

SafeKit está diseñado para la simplicidad, no para todos los casos. Es una buena opción para hasta unos pocos terabytes de datos replicados, menos de 1.000.000 de archivos, hasta 32 máquinas virtuales cuando se utiliza HA de VM y dos nodos en la misma LAN o VLAN con baja latencia (normalmente menos de 5 ms de ida y vuelta).

Para volúmenes mayores, el almacenamiento compartido u otro enfoque son una mejor opción.

<a class="btn-download" href="/es/product/#safekit-ha-limitations">Ver la lista completa de limitaciones ›</a>


{{%  insert-safekit-videos-table-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
