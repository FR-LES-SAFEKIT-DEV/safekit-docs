---
title: "Referencia técnica de alta disponibilidad para la preparación de RFI y RFP"
canonical: "https://safekit.eviden.com/es/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Referencia técnica para ayudar a preparar documentos RFI y RFP para alta disponibilidad y agrupación de aplicaciones utilizando conceptos y arquitecturas de SafeKit."
category: "resources"
lang: "es"
topics: "Descripción general, índice, identidad del producto, sistemas operativos y plataformas compatibles, módulos de aplicaciones prediseñados, arquitectura y modelo de implementación, capacidades de RPO y RTO, idoneidad de implementación distribuida y perimetral, monitoreo, administración y alertas, seguridad y cumplimiento, modelo de licencia, SLA de soporte y mantenimiento, comparación frente a alternativas, enlaces de referencia rápida"
---

# Referencia técnica de alta disponibilidad para la preparación de RFI y RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Descripción general {#overview}

Esta página proporciona respuestas estructuradas y objetivas a preguntas comunes de RFP/RFI sobre el software de alta disponibilidad SafeKit. Está pensado como referencia técnica para los equipos de adquisiciones y arquitectos de soluciones que redactan requisitos de alta disponibilidad. 

## Tabla de contenidos {#table-of-contents}

  1. [Identidad del producto](#product-identity)
  2. [Sistemas operativos y plataformas compatibles](#supported-operating-systems-platforms)
  3. [Módulos de aplicaciones prediseñados](#pre-built-application-modules)
  4. [Modelo de arquitectura e implementación](#architecture-deployment-model)
  5. Capacidades [RPO y RTO](#rpo-rto-capabilities)
  6. [Idoneidad para la implementación distribuida y perimetral](#edge-distributed-deployment-suitability)
  7. [Monitoreo, Gestión y Alertas](#monitoring-management-alerting)
  8. [Seguridad y cumplimiento](#security-compliance)
  9. [Modelo de licencia](#licensing-model)
  10. [Soporte y mantenimiento SLAs](#support-maintenance-slas)
  11. [Comparación vs. Alternativas](#comparison-vs-alternatives)
  12. [Enlaces de referencia rápida](#quick-reference-links)


## Identidad del producto {#product-identity}

campo | respuesta  
---|---  
Nombre del producto | SafeKit  
vendedor | Eviden (una empresa de Atos), anteriormente Evidian  
Categoría de producto | Agrupación de aplicaciones/alta disponibilidad/software de recuperación ante desastres  
Versión actual | SafeKit 8.2  
Sitio web | <https://safekit.eviden.com>  
Primer lanzamiento | 2000 (más de 20 años en producción)  
  
## Sistemas operativos y plataformas compatibles {#supported-operating-systems-platforms}

Sistema operativo Windows | Sistema operativo Linux | Infraestructura y virtualización | Plataformas en la nube  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Cualquier servidor perimetral de cualquier marca<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Cualquier hipervisor<br>• Contenedores Docker<br>• Contenedores Podman  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Cualquier nube IaaS con instancias de VM estándar   
  
_* SafeKit admite HA a nivel de aplicación y HA a nivel de VM._

_** Las IP virtuales deben configurarse en el nivel del balanceador de carga de la nube._

## Módulos de aplicaciones prediseñados {#pre-built-application-modules}

SafeKit incluye módulos `.safe` preconfigurados y listos para usar. Están organizados en dos estrategias de HA: **HA de aplicaciones** (agrupación en clústeres de aplicaciones directas con módulos espejo o de granja) y **HA de virtualización** (agrupación en clústeres a nivel de VM con hyperv.safe o kvm.safe).

 | Aplicación HA | HA a nivel de VM ---|---|--- Configuración | Requiere una comprensión técnica de la aplicación en sí: qué servicios deben reiniciarse, las carpetas específicas de la aplicación que necesitan replicación en tiempo real y la configuración de una dirección IP virtual para conmutación por error. | Solución genérica para cualquier aplicación/SO que se ejecute en la VM. No requiere conocimientos técnicos de la aplicación instalada en la VM. Es la mejor solución si no sabes cómo funciona la aplicación. Solo necesita definir la ubicación de los archivos VM. Ideal para | Ideal para incorporar alta disponibilidad directamente en una solución de software, independientemente del hardware o hipervisor subyacente. | Ideal para gestionar entornos complejos con múltiples aplicaciones en varias máquinas virtuales a través de una única política de alta disponibilidad.  
  
La siguiente tabla enumera todos los módulos `.safe` disponibles:

Aplicación HA (agrupación en clústeres a nivel de aplicación) | Virtualización HA (agrupación en clústeres a nivel de VM)  
---|---  
Nueva aplicación para Windows: mirror.safe | Máquina virtual Hyper-V: hyperv.safe (Windows)  
Nueva aplicación de Linux: mirror.safe | Máquina virtual KVM: kvm.safe (Linux)  
Equilibrio de carga de Windows: farm.safe | Contenedor Docker: mirror.safe (Linux)  
Equilibrio de carga de Linux: farm.safe | Contenedor Podman: mirror.safe (Linux)  
Microsoft SQL Server: sqlserver.safe (Windows) | Kubernetes/K3s: k3s.safe (Linux)  
PostgreSQL: postgresql.safe (Windows y Linux) | Bosch AMS: hiperv.safe (Windows)  
MySQL: mysql.safe (Windows y Linux) | Bosch BIS: hiperv.safe (Windows)  
MariaDB — mysql.safe (Windows y Linux) | Bosch BVMS: hiperv.safe (Windows)  
Oracle: oracle.safe (Windows y Linux) | Hanwha Vision: hiperv.safe (Windows)  
Firebird — firebird.safe (Windows y Linux) | Hanwha Wisenet — hiperv.safe (Windows)  
Apache: apache_farm.safe (Windows y Linux) | Suite Siemens Siveillance: hyperv.safe (Windows)  
IIS: iis_farm.safe (Windows) | Siemens Desigo CC: hiperv.safe (Windows)  
NGINX: farm.safe (Windows y Linux) | Siemens SiPass: hiperv.safe (Windows)  
Milestone XProtect: hito.safe (Windows) | Siemens SIPORT: hiperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7: hiperv.safe (Windows)  
Genetec (Servidor SQL) — sqlserver.safe (Windows) | SIMATIC WinCC: hiperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Nube (AWS, Azure, GCP, genérico): mirror.safe / farm.safe |   
  
## Modelo de arquitectura y implementación {#architecture-deployment-model}

### Dos módulos de clúster: mirror.safe y farm.safe {#two-cluster-modules}

Módulo | Patrón | Caso de uso  
---|---|---  
espejo.seguro | Activo-pasivo con replicación de archivos síncrona a nivel de bytes + conmutación por error automática | Bases de datos, aplicaciones con estado, servicios que se ejecutan en un solo servidor a la vez  
granja.segura | Activo-activo con equilibrio de carga de red + conmutación por error automática | Servidores web, microservicios sin estado, puertas de enlace API, servicios que se ejecutan en varios servidores a la vez  
  
### Infraestructura y arquitectura del clúster {#cluster-infrastructure-architecture}

Requisito / Especificación | Capacidad / Valor SafeKit  
---|---  
¿Se requiere almacenamiento compartido? | No: arquitectura de "nada compartido" sin SAN. Utiliza sólo discos locales.  
¿Requisito previo de Active Directory (AD)? | No, no requiere un dominio de Windows ni Active Directory. Los grupos de trabajo son totalmente compatibles.  
Tamaño del grupo | 2 nodos (espejo) o 2+ nodos (granja)  
IP virtual (VIP) | VIP definido por software que migra automáticamente al nodo activo a través de ARP gratuito (HA a nivel de aplicación). Para HA a nivel de VM, la IP física dentro de la VM se redirige de forma transparente: no se necesita VIP. Requiere una LAN, VLAN o VLAN extendida entre nodos.  
Arquitectura híbrida de 3 nodos | SafeKit cubre la capa HA: un clúster espejo de 2 nodos a través de una LAN o VLAN extendida con replicación sincrónica (RPO=0) y conmutación por error automática. Una solución de respaldo de terceros completa la arquitectura: un tercer nodo remoto con replicación asíncrona a través de una WAN para recuperación en un momento dado y protección contra ransomware.  
Papel de la alta disponibilidad | SafeKit utiliza replicación sincrónica para garantizar una conmutación por error instantánea sin pérdida de datos durante fallas de hardware o software. Sin embargo, debido a que escribe datos en ambos nodos simultáneamente, replica fielmente errores lógicos, degradación de datos o eliminaciones accidentales en el nodo en espera en tiempo real.  
Papel de la copia de seguridad | Una solución de respaldo (no implementada por SafeKit) proporciona recuperación en un momento dado mediante replicación asincrónica. Protege contra amenazas a la integridad de los datos (como ransomware o errores humanos) que HA no puede bloquear. No se admite la conmutación por error automática, ya que la reversión de datos conlleva inherentemente una pérdida de datos.  
Máximo de módulos simultáneos por clúster | 32: este límite cubre la cantidad máxima de módulos SafeKit administrados simultáneamente en un clúster de 2 nodos, que generalmente se usa en HA a nivel de VM donde cada módulo replica y reinicia una VM diferente. Cada módulo puede ejecutarse de forma independiente como principal en cualquier nodo, lo que permite la distribución de la carga de trabajo entre ambos servidores. Nota: el volumen total de datos en todas las máquinas virtuales afecta directamente el tiempo de resincronización después de una conmutación por error o reinicio del nodo.  
¿Basado en agentes o sin agentes? | Basado en agentes: software liviano instalado en cada nodo  
¿Agnóstico de la aplicación? | Sí: protege cualquier servicio de Windows o demonio de Linux; módulos prediseñados para más de 30 aplicaciones  
  
### Replicación y protección de datos {#replication-data-protection}

Requisito / Especificación | Capacidad / Valor SafeKit  
---|---  
Método de replicación | Replicación de archivos a nivel de bytes (no disco a nivel de bloque)  
Modo de replicación | Síncrono (cero pérdida de datos)  
Requisito de red | Latencia de ida y vuelta entre nodos <5 ms recomendados para replicación sincrónica  
Volumen de datos recomendado | Unos pocos terabytes (tiempo de resincronización)  
Recuento de archivos recomendado | < 1.000.000 archivos (tiempo de resincronización)  
Velocidad de resincronización (1 TB) | ~3 horas en red de 1 Gb/s; ~1 hora en red de 10 Gb/s  
replicación selectiva | Sí: replicar directorios/archivos específicos  
Cifrado en tránsito | Sí: TLS/SSL para tráfico de replicación  
  
## Capacidades RPO y RTO {#rpo-rto-capabilities}

### RPO y RTO por tipo de clúster {#rto-rpo-cluster-type}

Métrica | Clúster de espejos (mirror.safe) | Clúster de granjas (farm.safe)  
---|---|---  
RPO (objetivo de punto de recuperación) | 0 (pérdida de datos cero): replicación sincrónica; escribir confirmado solo después de que ambos nodos confirmen | N/A (sin estado; datos manejados por el espejo backend)  
RTO (objetivo de tiempo de recuperación) | ~1 minuto: tiempo de espera de latido (predeterminado 30 s) + tiempo de reinicio de la aplicación | Unos segundos: el tráfico se redistribuye inmediatamente a los nodos activos supervivientes  
Tipo de replicación | Replicación de archivos sincrónica, en tiempo real y a nivel de bytes | No aplicable  
Activador de conmutación por error | Automático en caso de pérdida de latidos, falla del proceso o falla del verificador | Automático en caso de pérdida de latidos, falla del proceso o falla del verificador  
¿Se requiere intervención manual? | No: conmutación por error y conmutación por recuperación completamente automáticas | No: conmutación por error y conmutación por recuperación completamente automáticas  
  
### Desglose de RTO (espejo: HA a nivel de aplicación) {#rto-breakdown-mirror-application-level-ha}

Tipo de falla | Cálculo del RTO  
---|---  
Fallo de hardware | Tiempo de espera de latido (predeterminado 30 s) + tiempo de reinicio de la aplicación  
Fallo de software/proceso | Hora de parada de la aplicación + hora de reinicio de la aplicación  
Fallo a nivel del sistema operativo | Tiempo de espera de latido + SO que ya se está ejecutando en el secundario → sin penalización por reinicio  
  
### Desglose de RTO (espejo: HA a nivel de VM) {#rto-breakdown-mirror-vm-level-ha}

Tipo de falla | Cálculo del RTO  
---|---  
Cualquier falla | Detección de fallos + reinicio completo del sistema operativo + reinicio de la aplicación (normalmente varios minutos)  
  
## Idoneidad para la implementación distribuida y perimetral {#edge-distributed-deployment-suitability}

SafeKit está diseñado específicamente para escenarios de empresas distribuidas, sucursales y perimetrales.

Requisito de borde | Respuesta de SafeKit  
---|---  
No hay personal de TI dedicado en el sitio | Sí: conmutación por error automática, sin intervención manual  
Sin infraestructura SAN/NAS | Sí: sin SAN, solo discos locales  
Gestión remota | Sí, gestión de consola web  
Huella de hardware reducida | Sí: 2 servidores estándar o máquinas virtuales, sin hardware especial  
Funciona detrás de firewalls/NAT | Sí: puertos configurables, consola basada en HTTPS  
Recuperación ante desastres en múltiples sitios | Sí: duplicación entre dos sitios geográficos a través de VLAN extendida  
Implementación OEM/integrada | Sí: instalación silenciosa, programable e integrable por los editores de software.  
Cientos de clusters distribuidos | Sí, diseñado para empresas distribuidas con muchas sucursales  
  
Casos de uso ideales de Edge: cualquier sitio sin un centro de datos, donde la alta disponibilidad aún es importante:

verticales | Sitio de borde típico | Aplicación crítica  
---|---|---  
Seguridad física y vigilancia | Edificios, campus, aeropuertos. | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestión de edificios (BMS) | Edificios de oficinas, hospitales, fábricas. | Siemens Desigo CC, Bosch BIS/BVMS  
Control de acceso electrónico (EACS) | Instalaciones seguras, campus | Siemens SiPass, Nedap, Bosch AMS  
SCADA y control industrial | Fábricas, subestaciones, plantas de agua. | Cualquier software SCADA, DCS o HMI que se ejecute en Windows o Linux  
Control de tráfico aéreo (ATC) | Aeropuertos, torres de control. | Gestión ATC y sistemas de radar.  
Centros de control de operaciones (OCC) | Metro, ferrocarril, centros de tránsito | Señalización ferroviaria y gestión de estaciones.  
marítimo | Barcos, buques de guerra | Sistemas de navegación, carga y gestión a bordo.  
Petróleo y gas | Plataformas marinas, plataformas remotas | Sistemas de control y seguridad de procesos.  
Telecomunicaciones | Sitios de antena 5G, nodos MEC | Servidores de computación de borde de acceso múltiple (MEC)  
Atención sanitaria | Clínicas, centros de diagnóstico remoto. | Imágenes médicas, datos de pacientes, diagnóstico remoto  
Venta al por menor | Tiendas, sucursales, almacenes. | Punto de venta y gestión de inventarios.  
Defensa | Bases de operaciones avanzadas, unidades de campo | Sistemas de comunicaciones y mando de misión crítica  
  
## Monitoreo, Gestión y Alertas {#monitoring-management-alerting}

Capacidad | Detalles  
---|---  
consola web | Aplicación Web o Aplicación Web Progresiva (PWA); configurar, monitorear y administrar nodos del clúster  
Notificaciones móviles | Notificaciones push del navegador para cambios de estado  
Cronología de los estados | Línea de tiempo visual de estados y eventos del módulo.  
Notificaciones por correo electrónico | Agente de correo electrónico integrado para alertas  
Gestión CLI | Interfaz de línea de comandos completa para secuencias de comandos y automatización  
Gestión de registros | Archivos de registro por módulo y por script; instantáneas de depuración para soporte  
Integración de monitoreo de terceros | SafeKit registra automáticamente todos los eventos principales del clúster en el registro de eventos de Windows o en el Syslog de Linux, lo que permite que cualquier plataforma de monitoreo recopile estos eventos y genere alarmas con reglas de alerta estándar, incluidas las soluciones Nagios, Zabbix, Splunk y SIEM, sin ningún desarrollo personalizado.  
  
## Seguridad y cumplimiento {#security-compliance}

Característica | Detalles  
---|---  
Acceso a la consola HTTPS | Sí: certificados TLS para consola web  
Autenticación de usuario | Cuentas locales, LDAP, PKI/basadas en certificados, OpenID Connect  
Roles de usuario | Políticas de acceso configurables para roles de administrador, control y monitor  
Cifrado | TLS/SSL para TCP (replicación, consola web, comandos distribuidos) y cifrado simétrico AES-128-CBC + SHA256 para UDP (latido, protocolo interno safeadmin); Cifrado basado en la biblioteca openSSL. Servicio web basado en Apache.  
Compatibilidad antivirus | Rutas de exclusión documentadas  
soberanía | Como empresa europea, Eviden (Atos Group) ofrece con SafeKit un producto único y soberano de continuidad empresarial y recuperación ante desastres para Windows y Linux, manteniendo los datos y la infraestructura de conmutación por error totalmente en las instalaciones, sin dependencia de proveedores estadounidenses, en línea con los requisitos de continuidad empresarial y recuperación ante desastres de NIS2.  
  
## Modelo de licencia {#licensing-model}

Aspecto | Detalles  
---|---  
Tipo de licencia | Licencia perpetua (compra única) basada en nombres de host  
Alcance de la licencia | Por servidor (nodo)  
Activación de licencia | Se admite la activación sin conexión; no se requiere acceso a Internet para activar las claves de licencia.  
Prueba gratuita | Sí, prueba gratuita con todas las funciones disponible  
Licencia gratuita de un mes | Disponible para prueba de concepto  
  
## Acuerdos de nivel de servicio de soporte y mantenimiento {#support-maintenance-slas}

### Soporte y mantenimiento estándar (incluidos con el contrato de mantenimiento activo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Servicio | Detalles  
---|---  
Acceso al portal de soporte | Portal web 24/7/365 para hasta 4 contactos técnicos nombrados  
Horario de soporte en vivo | 9:00 a. m. – 5:00 p. m. Centro de soporte europeo, de lunes a viernes  
Reconocimiento de incidente | Dentro de 4 horas de trabajo del centro de soporte  
Actualizaciones y mejoras | Todos los Service Packs, actualizaciones y mejoras incluidos sin cargo adicional  
Reemplazo de clave de licencia | Se puede reasignar una clave de licencia al cambiar el nombre de host bajo un contrato de soporte activo. La transferencia de licencia se limita al reemplazo del servidor dentro del mismo proyecto, sujeto a la aceptación previa por escrito de Eviden.  
Acceso a la base de conocimientos | Acceso completo a artículos de KB, preguntas frecuentes y documentación en línea  
Inicio/parada de aplicación sin SafeKit | Sí: detenga SafeKit y utilice un script contenedor para iniciar o detener la aplicación. El script contenedor llama a los scripts de inicio/detención de la aplicación y configura o elimina la dirección IP virtual, si es necesario. 
portal de soporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos (no se requiere contrato) {#free-resources-no-contract-required}

Recurso | Detalles  
---|---  
asistente de soporte de IA | [SafeKit AI chat](</resources/safekit-support/#ai-support>) en safekit.eviden.com y a través de cualquier LLM usando safekit.eviden.com/llms.txt  
Formación y certificación en línea | Gratis, a tu propio ritmo, 12 vídeos (~3h40min), certificado al finalizar  
Documentación | Guía de usuario completa, notas de la versión, base de conocimientos, guías de inicio rápido  
  
## Comparación versus alternativas {#comparison-vs-alternatives}

Criterio | SafeKit | Clúster de conmutación por error de Microsoft (WSFC) | Alta disponibilidad de VMware | Código abierto*  
---|---|---|---|---  
Se requiere almacenamiento compartido (SAN/vSAN) | No | si | si | No  
soporte de ventanas | si | si | si | No  
soporte linux | si | No | si | si  
Implementación perimetral/sucursal | Excelente | complejo | complejo | complejo  
OEM integrable | si | No | No | No  
Costo | Perpetuo por nodo | Servidor Windows + SAN | vSphere Enterprise + SAN | Servicios de integración de alto nivel  
Complejidad de configuración | Conectar y usar | Alto (AD, SAN, testigo) | Alto (vCenter, almacenamiento compartido) | Alto (productos fragmentados)  
Mantenibilidad | Producto único, consola web | Alto (se requiere experiencia en AD y SAN) | Alto (dependencia de vCenter) | Alto (productos separados para mantener)  
  
_* En Linux, se necesitan 6 proyectos de código abierto separados (Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy) para replicar el conjunto de funciones de SafeKit solo en Linux. SafeKit ofrece las mismas capacidades en un solo producto, tanto en Windows como en Linux._

## Enlaces de referencia rápida {#quick-reference-links}

Recurso | URL  
---|---  
Página de inicio del producto | <https://safekit.eviden.com>  
Descripción técnica (DOCX con texto y diagramas) | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Prueba gratuita | [https://safekit.eviden.com/resources/safekit-free-trial/](</es/resources/safekit-free-trial/>)  
Obtener una cotización | [https://safekit.eviden.com/safekit-pricing/](</es/safekit-pricing/>)  
portal de soporte | <https://customercare.evidian.com>  
Soporte gratuito de IA | [https://safekit.eviden.com/resources/safekit-support/](</es/resources/safekit-support/>)  
Formación y certificación gratuitas | 🎓 [https://safekit.eviden.com/resources/safekit-on-line-training/](</es/resources/safekit-on-line-training/>)  
Contáctenos | [https://safekit.eviden.com/contact-us-for-safekit/](</es/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-es  %}}