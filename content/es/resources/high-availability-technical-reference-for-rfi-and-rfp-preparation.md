---
title: "Referencia técnica de alta disponibilidad para la preparación de RFI y RFP."
canonical: "https://safekit.eviden.com/es/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Referencia técnica para ayudar a preparar documentos RFI y RFP para alta disponibilidad y agrupación de aplicaciones utilizando conceptos y arquitecturas SafeKit ."
category: "resources"
lang: "es"
topics: "Descripción general, Tabla de contenido, Identidad del producto, Sistemas operativos y plataformas compatibles, Módulos de aplicación preconfigurados, Arquitectura y modelo de implementación, Capacidades de RPO y RTO, Idoneidad para la implementación en el borde y distribuida, Monitoreo, administración y alertas, Seguridad y cumplimiento, Modelo de licenciamiento, Acuerdos de nivel de servicio (SLA) de soporte y mantenimiento, Comparación con alternativas, Enlaces de referencia rápida"
---

# Referencia técnica de alta disponibilidad para la preparación de RFI y RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Descripción general {#overview}

Esta página ofrece respuestas estructuradas y objetivas a las preguntas más frecuentes de las solicitudes de propuestas (RFP) y solicitudes de información (RFI) sobre el software de alta disponibilidad SafeKit . Su objetivo es servir de referencia técnica para los equipos de compras y los arquitectos de soluciones que elaboran los requisitos de alta disponibilidad. 

## Tabla de contenido {#table-of-contents}

  1. Identidad del producto [ ](#product-identity)
  2. Sistemas operativos y plataformas compatibles con [ ](#supported-operating-systems-platforms)
  3. Módulos de aplicación preconfigurados [ ](#pre-built-application-modules)
  4. Arquitectura y modelo de despliegue de [ ](#architecture-deployment-model)
  5. Capacidades RPO y RTO de [ ](#rpo-rto-capabilities)
  6. Idoneidad para implementación distribuida y en el borde [ ](#edge-distributed-deployment-suitability)
  7. [ Monitoreo, administración y alertas ](#monitoring-management-alerting)
  8. [ Seguridad y cumplimiento ](#security-compliance)
  9. Modelo de licencia [ ](#licensing-model)
  10. Acuerdos de nivel de servicio (SLA) de soporte y mantenimiento [ ](#support-maintenance-slas)
  11. Comparación de [ con alternativas ](#comparison-vs-alternatives)
  12. Enlaces de referencia rápida [ ](#quick-reference-links)


## Identidad del producto {#product-identity}

Respuesta del campo |  
---|---  
Nombre del producto | SafeKit  
Proveedor | Eviden (una empresa de Atos), anteriormente Evidian  
Categoría de producto | Software de agrupación de aplicaciones / alta disponibilidad / recuperación ante desastres  
Versión actual | SafeKit 8.2  
Sitio web | <https://safekit.eviden.com>  
Primera versión | 2000 (más de 20 años en producción)  
  
## Sistemas operativos y plataformas compatibles {#supported-operating-systems-platforms}

Sistema operativo Windows Sistema | Linux Sistema | Infraestructura y virtualización | Plataformas en la nube  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64) | • Cualquier servidor perimetral de cualquier marca <br> • VMware <br> • Microsoft Hyper-V * <br> • Linux KVM * <br> • Cualquier hipervisor <br> • Docker contenedores <br> • Contenedores Podman | • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • Cualquier nube IaaS con instancias de VM estándar   
  
_ * SafeKit admite alta disponibilidad tanto a nivel de aplicación como a nivel de máquina virtual._

_ Las direcciones IP virtuales ** deben configurarse a nivel del balanceador de carga de la nube._

## Módulos de aplicación preconfigurados {#pre-built-application-modules}

SafeKit incluye módulos `.safe` preconfigurados y listos para usar. Están organizados en dos estrategias HA: ** HA de aplicaciones ** (agrupación directa de aplicaciones con los módulos mirror o `farm` ) y ** HA de virtualización ** (agrupación a nivel de máquina virtual con los módulos hyperv.safe o kvm.safe ).

 Alta disponibilidad de la aplicación | Alta disponibilidad a nivel de máquina virtual |  
---|---|---  
Configuración | Requiere conocimientos técnicos de la aplicación: qué servicios deben reiniciarse, las carpetas específicas de la aplicación que requieren replicación en tiempo real y la configuración de una dirección IP virtual para la conmutación por error. | Solución genérica para cualquier aplicación o sistema operativo que se ejecute en la máquina virtual. No requiere conocimientos técnicos de la aplicación instalada en la máquina virtual. Es la mejor solución si desconoce el funcionamiento de la aplicación. Solo necesita definir la ubicación de los archivos de la máquina virtual.  
Ideal para | Ideal para integrar alta disponibilidad directamente en una solución de software, independientemente del hardware o hipervisor subyacente. | Ideal para gestionar entornos complejos con múltiples aplicaciones en varias máquinas virtuales mediante una única política de alta disponibilidad.  
  
La siguiente tabla enumera todos los módulos `.safe` disponibles:

HA de aplicación (agrupación a nivel de aplicación) | HA de virtualización (agrupación a nivel de máquina virtual)  
---|---  
Nueva aplicación Windows — mirror.safe | Máquina virtual Hyper-V — hyperv.safe ( Windows )  
Nueva aplicación Linux — mirror.safe | Máquina virtual KVM — kvm.safe ( Linux )  
Windows equilibrio de carga — farm.safe | Docker contenedor — mirror.safe ( Linux )  
Linux equilibrio de carga — farm.safe | Podman contenedor — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( Windows y Linux ) | Bosch AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows y Linux ) | Bosch BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows y Linux ) | Bosch BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows y Linux ) | Hanwha Vision — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows y Linux ) | Hanwha Wisenet — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( Windows y Linux ) | Suite Siemens Siveillance — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( Windows y Linux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) | Siemens SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
Genetec ( SQL Server ) — sqlserver.safe ( Windows ) | SIMATIC WinCC — hyperv.safe ( Windows )  
Siemens Siveillance VMS — SiveillanceVMS.safe ( Windows ) |   
Nube ( AWS , Azure , GCP , genérico) — mirror.safe / farm.safe |   
  
## Arquitectura y modelo de despliegue {#architecture-deployment-model}

### Dos módulos de clúster: mirror.safe y farm.safe {#two-cluster-modules}

Módulo | Patrón | Caso de uso  
---|---|---  
mirror.safe | Activo-pasivo con replicación síncrona de archivos a nivel de byte + conmutación por error automática | Bases de datos, aplicaciones con estado, servicios que se ejecutan en un solo servidor a la vez  
farm.safe | Activo-activo con balanceo de carga de red + conmutación por error automática | Servidores web, microservicios sin estado, pasarelas API, servicios que se ejecutan en varios servidores a la vez  
  
### Infraestructura y arquitectura del clúster {#cluster-infrastructure-architecture}

Requisito / Especificación | SafeKit Capacidad / Valor  
---|---  
¿Se requiere almacenamiento compartido? | No: arquitectura "sin almacenamiento compartido" sin SAN. Solo utiliza discos locales.  
¿Requisito previo de Active Directory (AD)? | No: no requiere un dominio Windows ni Active Directory. Los grupos de trabajo son totalmente compatibles.  
Tamaño del clúster | 2 nodos ( mirror ) o 2 o más nodos ( `farm` )  
IP virtual (VIP) | VIP definida por software que migra automáticamente al nodo activo mediante ARP gratuito (alta disponibilidad a nivel de aplicación). Para alta disponibilidad a nivel de máquina virtual, la IP física dentro de la máquina virtual se redirige de forma transparente; no se necesita VIP. Requiere una LAN, VLAN o VLAN extendida entre los nodos.  
La arquitectura híbrida de 3 nodos | SafeKit cubre la capa de alta disponibilidad: un clúster de 2 nodos mirror sobre una LAN o VLAN extendida con replicación síncrona (RPO=0) y conmutación por error automática. Una solución de respaldo de terceros completa la arquitectura: un tercer nodo remoto con replicación asíncrona a través de una WAN para la recuperación puntual y la protección contra ransomware.  
Función de alta disponibilidad: | SafeKit utilizan replicación síncrona para garantizar la conmutación por error instantánea sin pérdida de datos durante fallos de hardware o software. Sin embargo, dado que escriben datos en ambos nodos simultáneamente, replican fielmente los errores lógicos, la degradación de datos o las eliminaciones accidentales en el nodo de respaldo en tiempo real.  
Función de la copia de seguridad | Una solución de copia de seguridad (no implementada por SafeKit ) proporciona recuperación puntual mediante replicación asíncrona. Protege contra amenazas a la integridad de los datos (como el ransomware o errores humanos) que la alta disponibilidad no puede bloquear. No admite la conmutación por error automática, ya que la reversión de datos conlleva inherentemente la pérdida de datos.  
Módulos concurrentes máximos por clúster | 32: este límite cubre el número máximo de módulos SafeKit administrados simultáneamente en un clúster de 2 nodos, que se utiliza normalmente en alta disponibilidad a nivel de máquina virtual, donde cada módulo replica y reinicia una máquina virtual diferente. Cada módulo puede ejecutarse de forma independiente como principal en cualquiera de los nodos, lo que permite la distribución de la carga de trabajo entre ambos servidores. Nota: el volumen total de datos en todas las máquinas virtuales afecta directamente al tiempo de resincronización tras una conmutación por error o un reinicio de nodo.  
¿Con o sin agente? | Con agente: software ligero instalado en cada nodo  
¿Agnóstico de la aplicación? | Sí: protege cualquier servicio Windows o demonio Linux ; módulos preconfigurados para más de 30 aplicaciones.  
  
### Replicación y protección de datos {#replication-data-protection}

Requisito / Especificación | SafeKit Capacidad / Valor  
---|---  
Método de replicación | replicación de archivos a nivel de byte (no a nivel de bloque de disco).  
Modo de replicación | Síncrono (cero pérdida de datos)  
Requisito de red | Latencia de ida y vuelta entre nodos < 5 ms recomendada para replicación síncrona  
Volumen de datos recomendado | Unos pocos terabytes (tiempo de resincronización)  
Cantidad de archivos recomendada | < 1.000.000 de archivos (tiempo de resincronización)  
Velocidad de resincronización (1 TB) | ~3 horas en una red de 1 Gb/s; ~1 hora en una red de 10 Gb/s  
Replicación selectiva | Sí: replicar directorios/archivos específicos  
Cifrado en tránsito | Sí — TLS/SSL para tráfico de replicación  
  
## Capacidades de RPO y RTO {#rpo-rto-capabilities}

### RPO y RTO por tipo de clúster {#rto-rpo-cluster-type}

Métrica | Mirror Clúster ( mirror.safe ) | `Farm` Clúster ( farm.safe )  
---|---|---  
RPO (Objetivo de punto de recuperación) | 0 (cero pérdida de datos) — replicación síncrona; la escritura se reconoce solo después de que ambos nodos confirman | N/A (sin estado; los datos son manejados por el backend mirror )  
RTO (Objetivo de tiempo de recuperación) | ~1 minuto: tiempo de espera de latido (predeterminado 30 s) + tiempo de reinicio de la aplicación | Unos segundos: el tráfico se redistribuye inmediatamente a los nodos activos supervivientes  
Tipo de replicación | Replicación de archivos síncrona, en tiempo real y a nivel de byte | No aplicable  
Disparador de conmutación por error | Automático en caso de pérdida de latido, fallo del proceso o fallo del verificador | Automático en caso de pérdida de latido, fallo del proceso o fallo del verificador  
¿Se requiere intervención manual? | No: conmutación por error y recuperación totalmente automáticas. | No: conmutación por error y recuperación totalmente automáticas.  
  
### Desglose de RTO ( Mirror — Alta disponibilidad a nivel de aplicación) {#rto-breakdown-mirror-application-level-ha}

Cálculo del RTO de tipo de fallo |  
---|---  
Fallo de hardware | Tiempo de espera de latido (predeterminado 30 s) + tiempo de reinicio de la aplicación  
Fallo del software/proceso | Tiempo de detención de la aplicación + tiempo de reinicio de la aplicación  
Fallo a nivel del sistema operativo | Tiempo de espera de latido agotado + el sistema operativo ya se está ejecutando en el secundario → sin penalización de reinicio  
  
### Desglose de RTO ( Mirror — HA a nivel de máquina virtual) {#rto-breakdown-mirror-vm-level-ha}

Cálculo del RTO de tipo de fallo |  
---|---  
Cualquier fallo | Detección de fallo + reinicio completo del sistema operativo + reinicio de la aplicación (normalmente varios minutos)  
  
## Idoneidad para implementación distribuida y en el borde {#edge-distributed-deployment-suitability}

SafeKit está diseñado específicamente para entornos de borde, sucursales y empresas distribuidas.

Requisito de borde | SafeKit Respuesta  
---|---  
No hay personal de TI dedicado en el sitio | Sí: conmutación por error automática, sin intervención manual  
Sin infraestructura SAN/NAS | Sí — Sin SAN, solo discos locales  
Gestión remota | Sí — gestión de la consola web  
Bajo consumo de hardware | Sí: 2 servidores o máquinas virtuales estándar, sin hardware especial.  
Funciona detrás de cortafuegos/NAT | Sí — puertos configurables, consola basada en HTTPS  
Recuperación ante desastres en múltiples sitios | Sí — mirror entre dos sitios geográficos a través de VLAN extendida  
Implementación OEM/integrada | Sí: instalación silenciosa, programable, integrable por editores de software  
Cientos de clústeres distribuidos | Sí, diseñados para empresas distribuidas con muchas sucursales.  
  
Casos de uso ideales para Edge: cualquier sitio sin centro de datos, donde la alta disponibilidad sigue siendo importante:

Vertical | Sitio de borde típico | Aplicación crítica  
---|---|---  
Seguridad física y vigilancia | Edificios, campus, aeropuertos | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
Gestión de edificios (BMS) | Edificios de oficinas, hospitales, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Control de acceso electrónico (EACS) | Instalaciones seguras, campus | Siemens SiPass, Nedap , Bosch AMS  
SCADA y control industrial | Fábricas, subestaciones, plantas de tratamiento de agua | Cualquier software SCADA, DCS o HMI que se ejecute en Windows o Linux  
Control de tráfico aéreo (ATC) | Aeropuertos, torres de control | Gestión de ATC y sistemas de radar  
Centros de control de operaciones (OCC) | Metro, ferrocarril, centros de transporte | Señalización ferroviaria y gestión de estaciones  
Sistemas marítimos | Buques, embarcaciones navales | Sistemas de navegación, carga y gestión a bordo  
Petróleo y gas | Plataformas marinas, plataformas remotas | Sistemas de control de procesos y seguridad  
Telecomunicaciones | Emplazamientos de antenas 5G, nodos MEC | Servidores de computación de borde de acceso múltiple (MEC)  
Atención médica | Clínicas, centros de diagnóstico remoto | Imágenes médicas, datos de pacientes, diagnóstico remoto  
Comercio minorista | Tiendas, sucursales, almacenes | Gestión de puntos de venta e inventario  
Defensa | Bases operativas avanzadas, unidades de campo | Sistemas de mando y comunicaciones de misión crítica  
  
## Supervisión, gestión y alertas {#monitoring-management-alerting}

Detalles de la capacidad |  
---|---  
Consola web | Aplicación web o aplicación web progresiva (PWA); configure, supervise y administre los nodos del clúster.  
Notificaciones móviles | Notificaciones push del navegador para cambios de estado  
Cronología de estados | Cronología visual de estados y eventos del módulo  
Notificaciones por correo electrónico | Agente de correo electrónico integrado para alertas  
Gestión CLI | Interfaz de línea de comandos completa para scripts y automatización  
Gestión de registros | Archivos de registro por módulo y por script; instantáneas de depuración para soporte  
La integración de monitoreo de terceros | SafeKit registra automáticamente todos los eventos importantes del clúster en el registro de eventos Windows o en el Syslog Linux , lo que permite que cualquier plataforma de monitoreo recopile estos eventos y genere alarmas con reglas de alerta estándar, incluidas Nagios, Zabbix, Splunk y soluciones SIEM, sin necesidad de desarrollo personalizado.  
  
## Seguridad y cumplimiento {#security-compliance}

Detalles de la función |  
---|---  
Acceso a la consola HTTPS | Sí — Certificados TLS para la consola web  
Autenticación de usuario | Cuentas locales, LDAP, PKI/basada en certificados, OpenID Connect  
Roles de usuario | Políticas de acceso configurables para los roles de administrador, control y supervisión.  
Cifrado | TLS/SSL para TCP (replicación, consola web, comandos distribuidos) y cifrado simétrico AES-128-CBC + SHA256 para UDP (latido, protocolo interno de safeadmin); cifrado basado en la biblioteca OpenSSL. Servicio web basado en Apache.  
Compatibilidad con antivirus | Rutas de exclusión documentadas  
Soberanía | Como empresa europea, Eviden (Grupo Atos) ofrece con SafeKit un producto único de continuidad empresarial y recuperación ante desastres soberano para Windows y Linux , manteniendo los datos y la infraestructura de conmutación por error completamente en las instalaciones, sin dependencia de proveedores estadounidenses, en línea con los requisitos de continuidad empresarial y recuperación ante desastres de NIS2.  
  
## Modelo de licencia {#licensing-model}

Detalles del aspecto |  
---|---  
Tipo de licencia | Licencia perpetua (compra única) basada en nombres de host  
Ámbito de la licencia | Por servidor (nodo)  
Activación de licencia | Se admite la activación sin conexión; no se requiere acceso a Internet para activar las claves de licencia.  
Prueba gratuita | Sí, hay una prueba gratuita con todas las funciones disponible.  
Licencia gratuita de un mes | Disponible para prueba de concepto  
  
## Acuerdos de nivel de servicio (SLA) de soporte y mantenimiento {#support-maintenance-slas}

### Soporte y mantenimiento estándar (incluido con el contrato de mantenimiento activo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Detalles del servicio |  
---|---  
Acceso al portal de soporte | disponible las 24 horas, los 7 días de la semana, los 365 días del año para hasta 4 contactos técnicos designados.  
Horario de atención al cliente en directo | de 9:00 a 17:00. Centro de soporte europeo, de lunes a viernes.  
Acuse de recibo del incidente | Dentro de las 4 horas hábiles del centro de soporte  
Actualizaciones y mejoras | Todos los paquetes de servicio, actualizaciones y mejoras están incluidos sin cargo adicional.  
Sustitución de la clave de licencia | Se puede reasignar una clave de licencia al cambiar el nombre de host bajo un contrato de soporte activo. La transferencia de la licencia se limita a la sustitución del servidor dentro del mismo proyecto, sujeta a la aceptación previa por escrito de Eviden.  
Acceso a la base de conocimientos | Acceso completo a los artículos de la base de conocimientos, preguntas frecuentes y documentación en línea.  
Inicio/parada de la aplicación sin SafeKit | Sí — Detenga SafeKit y utilice un script de envoltura para iniciar o detener la aplicación. El script de envoltura llama a los scripts de inicio/parada de la aplicación y configura o elimina la dirección IP virtual, si es necesario. 
Portal de soporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos (sin necesidad de contrato) {#free-resources-no-contract-required}

Detalles del recurso |  
---|---  
Asistente de soporte de IA | [ SafeKit Chat de IA ](</es/resources/safekit-support/#ai-support>) en safekit.eviden.com y a través de cualquier LLM usando safekit.eviden.com/ llms.txt  
Formación y certificación online | Gratuita, a tu propio ritmo, 12 vídeos (~3h40min), certificado al finalizar.  
Documentación | Guía de usuario completa, notas de la versión, base de conocimientos, guías de inicio rápido  
  
## Comparación con alternativas {#comparison-vs-alternatives}

Criterion | SafeKit | Microsoft Clúster de conmutación por error (WSFC) | VMware HA | Código abierto *  
---|---|---|---|---  
Almacenamiento compartido (SAN/vSAN) requerido | No | Sí | Sí | No  
Windows apoyo | Sí | Sí | Sí | No  
Linux admite | Sí | No | Sí | Sí  
Despliegue en el borde/sucursal | Excelente | Complejo | Complejo | Complejo  
OEM integrable | Sí | No | No | No  
Costo | Perpetuo por nodo | Windows Servidor + SAN | vSphere Enterprise + SAN | Servicios de integración de alto nivel  
Complejidad de configuración | Plug-and-Play | Alta (AD, SAN, testigo) | Alta (vCenter, almacenamiento compartido) | Alta (productos fragmentados)  
Mantenibilidad | Producto único, consola web | Alta (se requiere experiencia en AD y SAN) | Alta (dependencia de vCenter) | Alta (productos separados para mantener)  
  
_ * En Linux , se necesitan 6 proyectos de código abierto separados (Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy) para replicar el conjunto de características de SafeKit solo en Linux . SafeKit ofrece las mismas capacidades en un solo producto, tanto en Windows como Linux

## Enlaces de referencia rápida {#quick-reference-links}

URL del recurso |  
---|---  
Página de inicio del producto | <https://safekit.eviden.com>  
Descripción técnica (DOCX con texto y diagramas) | 📘 [ https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx]( </wp-content/uploads/documents/safekit-technical-overview-en.docx> )  
Prueba </es/resources/safekit-free-trial/> | [ https://safekit.eviden.com/es/resources/safekit-free-trial/]( )  
Obtenga una cotización | [ https://safekit.eviden.com/safekit-pricing/]( </safekit-pricing/> )  
Portal de soporte | <https://customercare.evidian.com>  
Soporte de IA gratuito | [ https://safekit.eviden.com/es/resources/safekit-support/]( </es/resources/safekit-support/> )  
Formación y certificación gratuitas | 🎓 [ https://safekit.eviden.com/es/resources/safekit-on-line-training/]( </es/resources/safekit-on-line-training/> )  
Contáctanos | </contact-us-for-safekit/> [ https://safekit.eviden.com/contact-us-for-safekit/](  
  

{{%  insert-safekit-4-buttons-es  %}}