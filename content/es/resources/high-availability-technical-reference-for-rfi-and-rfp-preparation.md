---
title: "Referencia técnica de alta disponibilidad para la preparación de RFI y RFP."
canonical: "https://safekit.eviden.com/es/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Referencia técnica para ayudar a preparar documentos RFI y RFP para alta disponibilidad y agrupación de aplicaciones utilizando los conceptos y arquitecturas de SafeKit."
category: "resources"
lang: "es"
topics: "Descripción general, Tabla de contenido, Identidad del producto, Sistemas operativos y plataformas compatibles, Módulos de aplicación preconfigurados, Arquitectura y modelo de implementación, Capacidades de RPO y RTO, Idoneidad para sitios remotos e implementaciones distribuidas, Monitoreo, administración y alertas, Seguridad y cumplimiento, Modelo de licenciamiento, Acuerdos de nivel de servicio (SLA) de soporte y mantenimiento, Comparación con alternativas, Enlaces de referencia rápida"
---

# Referencia técnica de alta disponibilidad para la preparación de RFI y RFP. {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Descripción general {#overview}

Esta página proporciona respuestas estructuradas y objetivas a preguntas comunes sobre RFP/RFI. SafeKit Software de alta disponibilidad. Está pensado como referencia técnica para equipos de compras y arquitectos de soluciones que elaboran requisitos de alta disponibilidad. 

## Tabla de contenido {#table-of-contents}

  1. [Identidad del producto](#product-identity)
  2. [Sistemas operativos y plataformas compatibles](#supported-operating-systems-platforms)
  3. [Módulos de aplicación prediseñados](#pre-built-application-modules)
  4. [Modelo de arquitectura y despliegue](#architecture-deployment-model)
  5. [Capacidades de RPO y RTO](#rpo-rto-capabilities)
  6. [Idoneidad para emplazamientos remotos e implementaciones distribuidas](#edge-distributed-deployment-suitability)
  7. [Monitoreo, gestión y alertas](#monitoring-management-alerting)
  8. [Seguridad y cumplimiento](#security-compliance)
  9. [Modelo de licenciamiento](#licensing-model)
  10. [Acuerdos de nivel de servicio (SLA) de soporte y mantenimiento](#support-maintenance-slas)
  11. [Comparación frente a alternativas](#comparison-vs-alternatives)
  12. [Enlaces de referencia rápida](#quick-reference-links)


## Identidad del producto {#product-identity}

Campo | Respuesta  
---|---  
Nombre del producto | SafeKit  
Proveedor | Eviden (una empresa de Atos), anteriormente Evidian  
Categoría de producto | Software de agrupación de aplicaciones / alta disponibilidad / recuperación ante desastres  
Versión actual | SafeKit 8.2  
Sitio web | [https://safekit.eviden.com/es](/es/)  
Primer lanzamiento | 2000 (más de 20 años en producción)  
  
## Sistemas operativos y plataformas compatibles {#supported-operating-systems-platforms}

Windows Sistema operativo | Linux Sistema operativo | Infraestructura y virtualización | Plataformas en la nube  
---|---|---|---  
• Windows Servidor 2025 (x86-64)<br>• Windows Servidor 2022 (x86-64)<br>• Windows Servidor 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (Arch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (Arch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Cualquier servidor perimetral de cualquier marca<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Cualquier hipervisor<br>• Docker contenedores<br>• Podman contenedores  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Plataforma Google Cloud (GCP)\*\*<br>• Cualquier nube IaaS con instancias de máquinas virtuales estándar   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## Módulos de aplicación prediseñados {#pre-built-application-modules}

SafeKit incluye listo para usar, preconfigurado `.safe` módulos. Están organizados en dos estrategias de HA: **Aplicación HA** (agrupación de aplicaciones directas con mirror o `farm` módulos) y **Virtualización HA** (agrupación a nivel de máquina virtual con hyperv.safe o kvm.safe).

 | Aplicación HA | Alta disponibilidad a nivel de máquina virtual  
---|---|---  
Configuración | Requiere un conocimiento técnico de la propia aplicación: qué servicios deben reiniciarse, las carpetas específicas de la aplicación que necesitan replicación en tiempo real y la configuración de una dirección IP virtual para la conmutación por error. | Solución genérica para cualquier aplicación o sistema operativo que se ejecute en la máquina virtual. No requiere conocimientos técnicos sobre la aplicación instalada. Es la mejor solución si desconoce el funcionamiento de la aplicación. Solo necesita definir la ubicación de los archivos de la máquina virtual.  
Ideal para | Ideal para integrar alta disponibilidad directamente en una solución de software, independientemente del hardware subyacente o del hipervisor. | Ideal para gestionar entornos complejos con múltiples aplicaciones en varias máquinas virtuales mediante una única política de alta disponibilidad.  
  
La tabla a continuación enumera todos los disponibles `.safe` módulos:

Alta disponibilidad de aplicaciones (agrupación a nivel de aplicación) | Alta disponibilidad de virtualización (agrupación en clústeres a nivel de máquina virtual)  
---|---  
Nuevo Windows aplicación — mirror.safe | Máquina virtual Hyper-V — hyperv.safe (Windows)  
Nuevo Linux aplicación — mirror.safe | Máquina virtual KVM — kvm.safe (Linux)  
Windows equilibrio de carga — farm.safe | Docker contenedor — mirror.safe (Linux)  
Linux equilibrio de carga — farm.safe | Podman contenedor — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Sistema de gestión de vehículos eléctricos Bosch (BVMS) — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Visión Hanwha — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Suite de vigilancia de Siemens — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Sistema de gestión de vídeo Siemens Siveillance — SiveillanceVMS.safe (Windows) |   
Nube (AWS, Azure, GCP, genérico) — mirror.safe / farm.safe |   
  
## Modelo de arquitectura y despliegue {#architecture-deployment-model}

### Dos módulos de clúster: mirror.safe y farm.safe {#two-cluster-modules}

Módulo | Patrón | Caso de uso  
---|---|---  
mirror.safe | Modo activo-pasivo con replicación síncrona de archivos a nivel de byte + conmutación por error automática. | Bases de datos, aplicaciones con estado, servicios que se ejecutan en un solo servidor a la vez.  
farm.safe | Configuración activa-activa con equilibrio de carga de red y conmutación por error automática. | Servidores web, microservicios sin estado, pasarelas API, servicios que se ejecutan en varios servidores a la vez.  
  
### Infraestructura y arquitectura del clúster {#cluster-infrastructure-architecture}

Requisito / Especificación | SafeKit Capacidad / Valor  
---|---  
¿Se requiere almacenamiento compartido? | No — Arquitectura "sin almacenamiento compartido" SAN. Utiliza únicamente discos locales.  
¿Requisito previo de Active Directory (AD)? | No, no requiere un Windows Dominio o Active Directory. Los grupos de trabajo son totalmente compatibles.  
Tamaño del clúster | 2 nodos (mirror) o 2+ nodos (`farm`)  
IP virtual (VIP) | VIP definida por software que migra automáticamente al nodo activo mediante ARP gratuito (alta disponibilidad a nivel de aplicación). Para la alta disponibilidad a nivel de máquina virtual, la IP física dentro de la máquina virtual se redirige de forma transparente; no se necesita VIP. Requiere una LAN, VLAN o VLAN extendida entre los nodos.  
Arquitectura híbrida de 3 nodos | SafeKit cubre la capa HA: un sistema de 2 nodos mirror Agrupación en clúster sobre una LAN o VLAN extendida con replicación síncrona (RPO=0) y conmutación por error automática. Una solución de copia de seguridad de terceros completa la arquitectura: un tercer nodo remoto con replicación asíncrona a través de una WAN para la recuperación puntual y la protección contra ransomware.  
Función de la alta disponibilidad | SafeKit Utiliza replicación síncrona para garantizar la conmutación por error instantánea sin pérdida de datos en caso de fallos de hardware o software. Sin embargo, dado que escribe datos en ambos nodos simultáneamente, replica fielmente los errores lógicos, la degradación de datos o las eliminaciones accidentales en el nodo de respaldo en tiempo real.  
Función de respaldo | Una solución de respaldo (no implementada por SafeKitProporciona recuperación puntual mediante replicación asíncrona. Protege contra amenazas a la integridad de los datos (como ransomware o errores humanos) que la alta disponibilidad no puede bloquear. No admite la conmutación por error automática, ya que la reversión de datos conlleva inherentemente la pérdida de datos.  
Máximo de módulos simultáneos por clúster | 32 — este límite cubre el número máximo de SafeKit Módulos gestionados simultáneamente en un clúster de dos nodos, utilizado habitualmente en alta disponibilidad a nivel de máquina virtual (VM), donde cada módulo replica y reinicia una VM diferente. Cada módulo puede ejecutarse de forma independiente como principal en cualquiera de los nodos, lo que permite distribuir la carga de trabajo entre ambos servidores. Nota: el volumen total de datos de todas las VM influye directamente en el tiempo de resincronización tras una conmutación por error o un reinicio de nodo.  
¿Con o sin agentes? | Basado en agentes: software ligero instalado en cada nodo.  
¿Agnóstico a la aplicación? | Sí, protege cualquier Windows servicio o Linux demonio; módulos precompilados para más de 30 aplicaciones  
  
### Replicación y protección de datos {#replication-data-protection}

Requisito / Especificación | SafeKit Capacidad / Valor  
---|---  
Método de replicación | Replicación de archivos a nivel de byte (no a nivel de bloque de disco)  
Modo de replicación | Síncrono (sin pérdida de datos)  
Requisitos de red | Se recomienda una latencia de ida y vuelta entre nodos inferior a 5 ms para la replicación síncrona.  
Volumen de datos recomendado | Unos pocos terabytes (tiempo de resincronización)  
Número de archivos recomendado | < 1.000.000 de archivos (tiempo de resincronización)  
Velocidad de resincronización (1 TB) | Aproximadamente 3 horas en una red de 1 Gb/s; aproximadamente 1 hora en una red de 10 Gb/s.  
Replicación selectiva | Sí — replicar directorios/archivos específicos  
Cifrado en tránsito | Sí, TLS/SSL para el tráfico de replicación  
  
## Capacidades de RPO y RTO {#rpo-rto-capabilities}

### RPO y RTO por tipo de clúster {#rto-rpo-cluster-type}

Métrico | Mirror Grupo (mirror.safe) | `Farm` Grupo (farm.safe)  
---|---|---  
RPO (Objetivo de Punto de Recuperación) | 0 (cero pérdida de datos) — replicación síncrona; la escritura se reconoce solo después de que ambos nodos lo confirmen | N/A (sin estado; datos gestionados por el backend) mirror)  
RTO (Objetivo de Tiempo de Recuperación) | ~1 minuto — tiempo de espera del latido (predeterminado 30 s) + tiempo de reinicio de la aplicación | Unos segundos después, el tráfico se redistribuyó inmediatamente a los nodos activos que seguían funcionando.  
Tipo de replicación | Replicación de archivos síncrona, en tiempo real y a nivel de byte. | No aplicable  
Disparador de conmutación por error | Automático en caso de pérdida de latido, fallo del proceso o error del verificador. | Automático en caso de pérdida de latido, fallo del proceso o error del verificador.  
¿Se requiere intervención manual? | No: conmutación por error y recuperación totalmente automáticas. | No: conmutación por error y recuperación totalmente automáticas.  
  
### Desglose de RTO (Mirror — Alta disponibilidad a nivel de aplicación) {#rto-breakdown-mirror-application-level-ha}

Tipo de fallo | Cálculo de RTO  
---|---  
Fallo de hardware | Tiempo de espera del latido (por defecto 30 s) + tiempo de reinicio de la aplicación  
Fallo del software/proceso | Tiempo de detención de la aplicación + tiempo de reinicio de la aplicación  
Fallo a nivel del sistema operativo | Tiempo de espera de latido agotado + el sistema operativo ya se está ejecutando en el servidor secundario → no hay penalización por reinicio  
  
### Desglose de RTO (Mirror — Alta disponibilidad a nivel de máquina virtual) {#rto-breakdown-mirror-vm-level-ha}

Tipo de fallo | Cálculo de RTO  
---|---  
Cualquier fallo | Detección de fallos + reinicio completo del sistema operativo + reinicio de la aplicación (normalmente varios minutos)  
  
## Idoneidad para emplazamientos remotos e implementaciones distribuidas {#edge-distributed-deployment-suitability}

SafeKit Está diseñado específicamente para escenarios de borde, sucursales y empresas distribuidas.

Requisito de borde | SafeKit Respuesta  
---|---  
No hay personal informático dedicado en las instalaciones. | Sí, conmutación por error automática, sin intervención manual.  
Sin infraestructura SAN/NAS | Sí, sin SAN, solo discos locales.  
Gestión remota | Sí, gestión de la consola web  
Bajo consumo de hardware | Sí, dos servidores estándar o máquinas virtuales, sin hardware especial.  
Funciona detrás de cortafuegos/NAT | Sí, puertos configurables, consola basada en HTTPS.  
Recuperación ante desastres en múltiples sitios | Sí - mirror entre dos sitios geográficos a través de una VLAN extendida  
Implementación OEM/integrada | Sí, instalación silenciosa, programable, integrable por los editores de software.  
Cientos de clústeres distribuidos | Sí, diseñado para empresas distribuidas con muchas sucursales.  
  
Casos de uso ideales para Edge: cualquier sitio sin centro de datos, donde la alta disponibilidad sigue siendo importante:

Vertical | Sitio de borde típico | Aplicación crítica  
---|---|---  
Seguridad física y vigilancia | Edificios, campus, aeropuertos | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestión de edificios (BMS) | Edificios de oficinas, hospitales, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Control de acceso electrónico (CAE) | Instalaciones y campus seguros | Siemens SiPass, NedapBosch AMS  
SCADA y control industrial | Fábricas, subestaciones, plantas de tratamiento de agua | Cualquier software SCADA, DCS o HMI que se ejecute en Windows o Linux  
control de tráfico aéreo (ATC) | Aeropuertos, torres de control | Sistemas de gestión y radar del control de tráfico aéreo  
Centros de control de operaciones (OCC) | Metro, ferrocarril, centros de transporte | Señalización ferroviaria y gestión de estaciones  
Marítimo | Buques, embarcaciones navales | Sistemas de navegación, carga y gestión a bordo  
Petróleo y gas | Plataformas marinas, plataformas remotas | Sistemas de control de procesos y seguridad  
Telecomunicaciones | Emplazamientos de antenas 5G, nodos MEC | Servidores de computación perimetral de acceso múltiple (MEC)  
Cuidado de la salud | Clínicas, centros de diagnóstico remoto | Imágenes médicas, datos de pacientes, diagnóstico remoto  
Minorista | Tiendas, sucursales, almacenes | Gestión de puntos de venta e inventario  
Defensa | Bases operativas avanzadas, unidades de campo | Sistemas de mando y comunicaciones de misión crítica  
  
## Monitoreo, gestión y alertas {#monitoring-management-alerting}

Capacidad | Detalles  
---|---  
Consola web | Aplicación web o aplicación web progresiva (PWA); configurar, supervisar y administrar los nodos del clúster.  
Notificaciones móviles | Notificaciones push del navegador para cambios de estado  
Cronología de los estados | Línea de tiempo visual de los estados y eventos del módulo.  
notificaciones por correo electrónico | Agente de correo electrónico integrado para alertas  
Gestión de CLI | Interfaz completa de línea de comandos para scripting y automatización.  
Gestión de registros | Archivos de registro por módulo y por script; instantáneas de depuración para soporte  
Integración de sistemas de monitorización de terceros | SafeKit registra automáticamente todos los eventos importantes del clúster en el Windows Registro de eventos o Linux Syslog permite que cualquier plataforma de monitorización recopile estos eventos y genere alarmas con reglas de alerta estándar, incluidas Nagios, Zabbix, Splunk y las soluciones SIEM, sin necesidad de desarrollo personalizado.  
  
## Seguridad y cumplimiento {#security-compliance}

Característica | Detalles  
---|---  
Acceso a la consola HTTPS | Sí, certificados TLS para la consola web.  
Autenticación de usuario | Cuentas locales, LDAP, PKI/basado en certificados, OpenID Connect  
Roles de usuario | Políticas de acceso configurables para los roles de administrador, control y supervisión.  
Cifrado | TLS/SSL para TCP (replicación, consola web, comandos distribuidos) y cifrado simétrico AES-128-CBC + SHA256 para UDP (latido, protocolo interno de safeadmin); cifrado basado en la biblioteca OpenSSL. Servicio web basado en Apache.  
Compatibilidad con antivirus | Rutas de exclusión documentadas  
Soberanía | Como empresa europea, Eviden (Grupo Atos) ofrece con SafeKit un producto único de continuidad empresarial y recuperación ante desastres soberano para Windows y Linux — mantener los datos y la infraestructura de conmutación por error completamente en las instalaciones, sin depender de proveedores estadounidenses, en línea con los requisitos de continuidad del negocio y recuperación ante desastres de NIS2.  
  
## Modelo de licenciamiento {#licensing-model}

Aspecto | Detalles  
---|---  
Tipo de licencia | Licencia perpetua (compra única) basada en nombres de host.  
Alcance de la licencia | Por servidor (nodo)  
Activación de licencia | Se admite la activación sin conexión; no se requiere acceso a Internet para activar las claves de licencia.  
Prueba gratuita | Sí, hay disponible una prueba gratuita con todas las funciones.  
Licencia gratuita de un mes | Disponible para prueba de concepto.  
  
## Acuerdos de nivel de servicio (SLA) de soporte y mantenimiento {#support-maintenance-slas}

### Soporte y mantenimiento estándar (incluido con el contrato de mantenimiento vigente) {#standard-support-maintenance-included-with-active-maintenance-contract}

Servicio | Detalles  
---|---  
Acceso al portal de soporte | Portal web disponible las 24 horas, los 7 días de la semana, los 365 días del año para hasta 4 contactos técnicos designados.  
Horario de atención al cliente en directo | Centro de soporte europeo, de 9:00 a 17:00, de lunes a viernes.  
Acuse de recibo del incidente | Dentro de las 4 horas de funcionamiento del centro de soporte.  
Actualizaciones y mejoras | Todos los Service Packs, actualizaciones y mejoras están incluidos sin cargo adicional.  
Reemplazo de la clave de licencia | La clave de licencia puede reasignarse al cambiar el nombre de host bajo un contrato de soporte activo. La transferencia de licencia se limita al reemplazo de servidores dentro del mismo proyecto, sujeta a la aceptación previa por escrito de Eviden.  
Acceso a la base de conocimientos | Acceso completo a los artículos de la base de conocimientos, las preguntas frecuentes y la documentación en línea.  
Inicio/parada de la aplicación sin SafeKit | Sí, detente. SafeKit y utiliza un script auxiliar para iniciar o detener la aplicación. Este script auxiliar llama a los scripts de inicio/parada de la aplicación y configura o elimina la dirección IP virtual, si es necesario. 
Portal de soporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos (no se requiere contrato) {#free-resources-no-contract-required}

Recurso | Detalles  
---|---  
Asistente de soporte de IA | [SafeKit Chat con IA](</es/resources/safekit-support/#ai-support>) en safekit.eviden.com y a través de cualquier LLM que utilice safekit.eviden.com/llms.txt  
Formación y certificación en línea | Gratuito, a tu propio ritmo, 12 vídeos (~3h40min), certificado al finalizar.  
Documentación | Guía de usuario completa, notas de la versión, base de conocimientos, guías de inicio rápido.  
  
## Comparación frente a alternativas {#comparison-vs-alternatives}

Criterio | SafeKit | Microsoft Clúster de conmutación por error (WSFC) | VMware HA | Código abierto*  
---|---|---|---|---  
Se requiere almacenamiento compartido (SAN/vSAN). | No | Sí | Sí | No  
Windows apoyo | Sí | Sí | Sí | No  
Linux apoyo | Sí | No | Sí | Sí  
Implementación en el borde/sucursal | Excelente | Complejo | Complejo | Complejo  
Integrable por el fabricante | Sí | No | No | No  
Costo | Perpetuo por nodo | Windows Servidor + SAN | vSphere Enterprise + SAN | Servicios de integración de alto nivel  
Complejidad de la configuración | Conectar y usar | Alto (AD, SAN, testigo) | Alto (vCenter, almacenamiento compartido) | Alto (productos fragmentados)  
Mantenibilidad | Producto único, consola web | Alto nivel (se requiere experiencia en AD y SAN) | Alta (dependencia de vCenter) | Alto (productos separados para el mantenimiento)  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## Enlaces de referencia rápida {#quick-reference-links}

Recurso | URL  
---|---  
Página principal del producto | [https://safekit.eviden.com/es/](/es/)  
Descripción técnica (DOCX con texto y diagramas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Prueba gratuita | [https://safekit.eviden.com/es/resources/safekit-free-trial/](</es/resources/safekit-free-trial/>)  
Obtén un presupuesto | [https://safekit.eviden.com/es/safekit-pricing/](</es/safekit-pricing/>)  
Portal de soporte | <https://customercare.evidian.com>  
Soporte de IA gratuito | [https://safekit.eviden.com/es/resources/safekit-support/](</es/resources/safekit-support/>)  
Formación y certificación gratuitas | [https://safekit.eviden.com/es/resources/safekit-on-line-training/](</es/resources/safekit-on-line-training/>)  
Contáctanos | [https://safekit.eviden.com/es/contact-us-for-safekit/](</es/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}