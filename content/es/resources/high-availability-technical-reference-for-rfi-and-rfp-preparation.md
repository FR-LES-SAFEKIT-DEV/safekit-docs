---
title: "Referencia técnica SafeKit para documentos RFI y RFP"
canonical: "https://safekit.eviden.com/es/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Encuentre información técnica sobre SafeKit para preparar solicitudes de información (RFI) y solicitudes de propuestas (RFP). Conozca los sistemas, arquitecturas, tiempos de recuperación, seguridad, licencias y soporte compatibles."
category: "resources"
lang: "es"
topics: "Descripción general, Tabla de contenido, Información del producto, Sistemas operativos y plataformas compatibles, Limitaciones de alta disponibilidad de SafeKit, Módulos de aplicación preconfigurados, Arquitectura y despliegue, Tiempos de recuperación y pérdida de datos (RPO y RTO), Sitios remotos y despliegues distribuidos, Monitoreo, gestión y alertas, Seguridad y cumplimiento, Licencias, Soporte y mantenimiento, Comparación con otras soluciones, Enlaces útiles"
---

# Referencia técnica SafeKit para documentos RFI y RFP. {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Descripción general {#overview}

Utilice esta página para preparar una solicitud de información (RFI) o una solicitud de propuestas (RFP). Aquí encontrará respuestas a preguntas técnicas frecuentes sobre el software de alta disponibilidad SafeKit . La información ayuda a los equipos de compras y a los arquitectos de soluciones a definir sus requisitos.

## Tabla de contenido {#table-of-contents}

  1. [Información del producto](#product-identity)
  2. [Sistemas operativos y plataformas compatibles](#supported-operating-systems-platforms)
  3. [Limitaciones de alta disponibilidad de SafeKit](#safekit-ha-limitations)
  4. [Módulos de aplicación preconfigurados](#pre-built-application-modules)
  5. [Arquitectura y despliegue](#architecture-deployment-model)
  6. [Tiempos de recuperación y pérdida de datos (RPO y RTO)](#rpo-rto-capabilities)
  7. [Sitios remotos y despliegues distribuidos](#edge-distributed-deployment-suitability)
  8. [Monitoreo, gestión y alertas](#monitoring-management-alerting)
  9. [Seguridad y cumplimiento](#security-compliance)
  10. [Licencias](#licensing-model)
  11. [Soporte y mantenimiento](#support-maintenance-slas)
  12. [Comparación con otras soluciones](#comparison-vs-alternatives)
  13. [Enlaces útiles](#quick-reference-links)


## Información del producto {#product-identity}

Campo | Respuesta  
---|---  
Nombre del producto | SafeKit  
Proveedor | Eviden, parte del Grupo Atos. Anteriormente conocida como Evidian.  
Desarrollo de software | Desarrollado en Francia.
Categoría de producto | Software para la agrupación de aplicaciones, alta disponibilidad y recuperación ante desastres.  
Versión actual | SafeKit 8.2  
Sitio web | [https://safekit.eviden.com/es/](</es/>)  
Primer lanzamiento | 2000. Se utiliza en producción desde hace más de 20 años.  
  
## Sistemas operativos y plataformas compatibles {#supported-operating-systems-platforms}

Sistemas operativos Windows | Sistemas operativos Linux | Infraestructura y virtualización | Plataformas en la nube  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Cualquier servidor perimetral de cualquier marca<br> • VMware<br> • Microsoft Hyper-V [1]<br> • Linux KVM [1]<br> • Cualquier hipervisor<br> • Contenedores Docker<br> • Contenedores Podman  |  • Amazon Web Services (AWS) [2]<br> • Microsoft Azure [2]<br> • Plataforma en la nube de Google (GCP) [2]<br> • Cualquier nube IaaS con instancias de máquinas virtuales estándar   
  
**[1]** SafeKit proporciona alta disponibilidad para aplicaciones individuales o máquinas virtuales completas.

**[2]** En la nube, configure direcciones IP virtuales en el balanceador de carga de la nube.

{{%  insert-safekit-usage-es  %}}

## Módulos de aplicación preconfigurados {#pre-built-application-modules}

SafeKit incluye módulos `.safe` listos para usar. Existen dos maneras de proteger las aplicaciones. **La alta disponibilidad de aplicaciones** protege una aplicación directamente con un módulo mirror o <span class="notranslate farm-term" translate="no">farm</span> . **La alta disponibilidad de máquinas virtuales** protege toda la máquina virtual con un módulo hyperv.safe o kvm.safe .

Criterio de comparación | Alta disponibilidad de la aplicación | Alta disponibilidad de máquinas virtuales  
---|---|---  
Configuración | Debe saber qué servicios de aplicación reiniciar y qué carpetas replicar. También debe configurar la dirección IP virtual que se utilizará para la conmutación por error. | Solo necesitas especificar la ubicación de los archivos de la máquina virtual. No necesitas saber cómo funcionan las aplicaciones dentro de la máquina virtual. Este método protege tanto las aplicaciones como el sistema operativo.  
Uso recomendado | Añada alta disponibilidad directamente a una solución de software, sin depender de hardware específico ni de un hipervisor específico. | Gestiona varias aplicaciones en múltiples máquinas virtuales con una única política de alta disponibilidad.  
  
La siguiente tabla enumera todos los módulos `.safe` disponibles:

Alta disponibilidad de la aplicación | Alta disponibilidad de máquinas virtuales  
---|---  
Nueva aplicación para Windows: mirror.safe | Máquina virtual Hyper-V — hyperv.safe (Windows)  
Nueva aplicación para Linux: mirror.safe | Máquina virtual KVM — kvm.safe (Linux)  
Balanceo de carga de Windows — farm.safe | Contenedor Docker — mirror.safe (Linux)  
Balanceo de carga en Linux — farm.safe | Contenedor Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes/K3s: k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows y Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows y Linux) | Bosch BIS: hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows y Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows y Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows y Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows y Linux) | Suite Siemens Siveillance — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows y Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT: hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Nube (AWS, Azure, GCP, genérica) — mirror.safe / farm.safe |   
  
## Arquitectura y despliegue {#architecture-deployment-model}

### Dos módulos de clúster: mirror.safe y farm.safe {#two-cluster-modules}

Módulo | Cómo funciona | Aplicaciones típicas  
---|---|---  
mirror.safe | Un servidor está activo y el otro en espera. Los archivos se replican de forma síncrona a nivel de byte. La conmutación por error es automática. | Bases de datos, aplicaciones que almacenan estado y servicios que se ejecutan en un solo servidor a la vez.  
farm.safe | Varios servidores están activos al mismo tiempo. SafeKit distribuye el tráfico de red entre ellos y gestiona la conmutación por error automáticamente. | Servidores web, microservicios sin estado, pasarelas API y servicios que se ejecutan en varios servidores a la vez.  
  
### Infraestructura de clúster {#cluster-infrastructure-architecture}

Requisito | Capacidades SafeKit  
---|---  
¿Se requiere almacenamiento compartido? | No. SafeKit utiliza discos locales. No necesita una SAN ni almacenamiento compartido.  
¿Se requiere Active Directory? | No. SafeKit no requiere un dominio de Windows ni Active Directory. Además, es compatible con grupos de trabajo.  
Tamaño del clúster | 2 nodos ( mirror ) o 2 o más nodos ( <span class="notranslate farm-term" translate="no">farm</span> )  
Dirección IP virtual (VIP) | Para garantizar la alta disponibilidad de las aplicaciones, la dirección IP virtual se asigna automáticamente al nodo activo mediante ARP gratuito. Para la alta disponibilidad de las máquinas virtuales, el tráfico dirigido a la dirección IP interna de la máquina virtual se redirige automáticamente. No se requiere una dirección IP virtual independiente. Los nodos deben compartir una LAN o una VLAN que se extienda entre sitios.  
Arquitectura con tres nodos | SafeKit ejecuta un clúster mirror de dos nodos en una LAN o una VLAN extendida entre sitios. Proporciona replicación síncrona con cero pérdida de datos (RPO=0) y conmutación por error automática. Un producto de copia de seguridad independiente replica los datos de forma asíncrona en un tercer nodo a través de una WAN. Esta copia de seguridad permite la recuperación a un punto anterior en el tiempo y ofrece protección contra el ransomware.  
Propósito de la alta disponibilidad | SafeKit replica los datos de forma síncrona en ambos nodos. Esto permite la conmutación por error automática sin pérdida de datos tras un fallo de hardware o software. Además, los errores lógicos, la corrupción de datos y las eliminaciones accidentales se copian inmediatamente al nodo de respaldo.  
Finalidad de las copias de seguridad | Las copias de seguridad permiten restaurar datos desde un momento anterior. Un producto de copia de seguridad independiente, no SafeKit , proporciona esta protección mediante replicación asíncrona. Las copias de seguridad ayudan a recuperarse de ataques de ransomware y errores humanos. Esta recuperación no es una conmutación por error automática. Al restaurar una copia de seguridad antigua, se pierden los cambios realizados después de dicha copia.  
Número máximo de módulos que se ejecutan simultáneamente | Un clúster de dos nodos puede gestionar hasta 32 módulos simultáneamente. Para proteger las máquinas virtuales, cada módulo replica y reinicia una máquina virtual diferente. Cada módulo puede ser principal en cualquiera de los nodos, de modo que ambos servidores pueden compartir la carga de trabajo. El volumen total de datos afecta al tiempo de resincronización tras una conmutación por error o el reinicio de un nodo.  
¿Software necesario en cada nodo? | Sí. Se instala un software ligero en cada nodo.  
Aplicaciones compatibles | SafeKit puede proteger cualquier servicio de Windows o demonio de Linux. Hay módulos preconfigurados disponibles para más de 30 aplicaciones.  
  
### Replicación y protección de datos {#replication-data-protection}

Requisito | Capacidades SafeKit  
---|---  
Método de replicación | SafeKit replica los cambios de archivo a nivel de byte. No replica los bloques de disco.  
Modo de replicación | Replicación síncrona, sin pérdida de datos.  
Requisitos de red | Para la replicación síncrona, se recomienda una latencia de ida y vuelta inferior a 5 ms entre nodos.  
Volumen de datos recomendado | Unos pocos terabytes, para que el tiempo de resincronización sea manejable.  
Número de archivos recomendado | Menos de 1.000.000 de archivos, para que el tiempo de resincronización sea manejable.  
Es hora de resincronizar 1 TB | Aproximadamente 3 horas en una red de 1 Gb/s o 1 hora en una red de 10 Gb/s.  
Replicación selectiva | Puedes elegir qué directorios y archivos replicar.  
Cifrado durante la transferencia | El tráfico de replicación está cifrado con TLS/SSL.  
  
## Tiempos de recuperación y pérdida de datos (RPO y RTO) {#rpo-rto-capabilities}

### RPO y RTO para cada tipo de clúster {#rto-rpo-cluster-type}

Métrico | Mirror ( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO (objetivo de punto de recuperación) | Cero pérdida de datos. Una escritura se confirma solo después de que ambos nodos la reconozcan. | No aplicable a servicios sin estado. Un clúster mirror independiente gestiona los datos.  
RTO (objetivo de tiempo de recuperación) | Aproximadamente un minuto. Esto incluye el tiempo de espera <span class="notranslate farm-term" translate="no">heartbeat</span> (30 segundos por defecto) y el tiempo para reiniciar la aplicación. | Unos segundos. El tráfico se redistribuye entre los nodos activos restantes.  
Tipo de replicación | Replicación de archivos síncrona, en tiempo real y a nivel de byte. | No aplicable  
Disparador de conmutación por error | Automático cuando se detienen <span class="notranslate farm-term" translate="no">heartbeats</span> , un proceso falla o un verificador detecta un fallo. | Automático cuando se detienen <span class="notranslate farm-term" translate="no">heartbeats</span> , un proceso falla o un verificador detecta un fallo.  
¿Se requiere intervención manual? | No. La conmutación por error y la recuperación son automáticas. | No. La conmutación por error y la recuperación son automáticas.  
  
### Tiempo de recuperación para aplicaciones protegidas por un clúster mirror {#rto-breakdown-mirror-application-level-ha}

Tipo de fallo | Cómo se calcula el tiempo de recuperación  
---|---  
Fallo de hardware | Tiempo de <span class="notranslate farm-term" translate="no">Heartbeat</span> (30 segundos por defecto), seguido del reinicio de la aplicación.  
Fallo del software o del proceso | El momento de detener la aplicación, seguido del reinicio de la aplicación.  
Fallo del sistema operativo | Tiempo de espera agotado para <span class="notranslate farm-term" translate="no">Heartbeat</span> . El sistema operativo ya se está ejecutando en el servidor de reserva, por lo que no es necesario reiniciarlo.  
  
### Tiempo de recuperación para máquinas virtuales protegidas por un clúster mirror {#rto-breakdown-mirror-vm-level-ha}

Tipo de fallo | Cómo se calcula el tiempo de recuperación  
---|---  
Cualquier fallo | Es hora de detectar el fallo, reiniciar el sistema operativo de la máquina virtual y reiniciar la aplicación. Esto suele tardar varios minutos.  
  
## Sitios remotos y despliegues distribuidos {#edge-distributed-deployment-suitability}

SafeKit está diseñado para ubicaciones remotas, sucursales y organizaciones con múltiples sedes.

Requisito en una ubicación remota | Capacidades SafeKit  
---|---  
No hay personal informático dedicado en las instalaciones. | La conmutación por error es automática y no requiere ninguna acción manual.  
Sin SAN ni NAS | SafeKit utiliza discos locales y no requiere almacenamiento compartido.  
Gestión remota | Gestione el clúster a través de una consola web.  
Hardware limitado | Dos servidores estándar o máquinas virtuales son suficientes. No se requiere hardware especial.  
Cortafuegos y traducción de direcciones de red (NAT) | Los puertos se pueden configurar. La consola web utiliza HTTPS.  
Recuperación tras desastres entre sitios | Un clúster mirror puede conectar dos sitios a través de una VLAN extendida entre ellos.  
Integración por parte de los editores de software | Los desarrolladores de software pueden incluir SafeKit en sus productos. La instalación puede ejecutarse sin interacción del usuario y automatizarse mediante scripts.  
Cientos de grupos en numerosos sitios | SafeKit está diseñado para organizaciones con muchas sucursales.  
  
Los siguientes sitios necesitan alta disponibilidad incluso cuando no disponen de un centro de datos:

Industria | Sitio típico | Aplicaciones críticas  
---|---|---  
Seguridad física y vigilancia | Edificios, campus, aeropuertos | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestión de edificios (BMS) | Edificios de oficinas, hospitales, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Control de acceso electrónico (CAE) | Instalaciones y campus seguros | Siemens SiPass, Nedap, Bosch AMS  
SCADA y control industrial | Fábricas, subestaciones, plantas de tratamiento de agua | Cualquier software SCADA, DCS o HMI que se ejecute en Windows o Linux.  
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
Consola web | Configure, supervise y gestione los nodos del clúster mediante una aplicación web o una aplicación web progresiva (PWA).  
Notificaciones móviles | Reciba notificaciones en el navegador cuando un módulo cambie de estado.  
Cronología | Visualice los cambios de estado y los eventos del módulo en orden cronológico.  
notificaciones por correo electrónico | Un agente de correo electrónico integrado envía alertas.  
Interfaz de línea de comandos | Utilice la interfaz de línea de comandos para escribir scripts y automatizar tareas.  
Gestión de registros | Cada módulo y script tiene sus propios archivos de registro. <span class="notranslate farm-term" translate="no">snapshots</span> de los módulos ayudan al equipo de soporte a investigar los problemas.  
Integración con herramientas de monitorización | SafeKit registra los eventos principales del clúster en el registro de eventos de Windows o en el Syslog de Linux. Las herramientas de monitorización pueden recopilar estos eventos y activar alertas con reglas estándar. Funciona con Nagios, Zabbix, Splunk y herramientas SIEM sin necesidad de desarrollo personalizado.  
  
## Seguridad y cumplimiento {#security-compliance}

Característica | Detalles  
---|---  
HTTPS | Los certificados TLS protegen el acceso a la consola web.  
Autenticación de usuario | Cuentas locales, LDAP, certificados (PKI) y OpenID Connect  
Roles de usuario | Configure las políticas de acceso para la administración, el control y la supervisión.  
Cifrado | El tráfico TCP utiliza TLS/SSL para la replicación, la consola web y los comandos distribuidos. El tráfico UDP utiliza cifrado AES-128-CBC con SHA256 para <span class="notranslate farm-term" translate="no">heartbeats</span> y el protocolo interno safeadmin. SafeKit utiliza la biblioteca OpenSSL para el cifrado y Apache para el servicio web.  
Antivirus | La documentación enumera las rutas que deben excluirse de los análisis antivirus.  
Soberanía | SafeKit , desarrollado en Francia por Eviden, parte del Grupo Atos, protege las aplicaciones de Windows y Linux, manteniendo sus datos y servidores en sus propias instalaciones. Este software de alta disponibilidad no depende de un proveedor estadounidense. SafeKit puede ayudarle a cumplir con los requisitos NIS2 para la continuidad del negocio y la recuperación ante desastres.
  
## Licencias {#licensing-model}

Aspecto | Detalles  
---|---  
Tipo de licencia | Una licencia perpetua se compra una sola vez y está vinculada a un nombre de host.  
Alcance de la licencia | Una licencia por servidor (nodo)  
Activación de licencia | Las claves de licencia se pueden activar sin conexión a internet.  
Prueba gratuita | La prueba gratuita incluye todas las funciones.  
Licencia gratuita de un mes | Disponible para probar una prueba de concepto.  
  
## Soporte y mantenimiento {#support-maintenance-slas}

### Soporte y mantenimiento estándar con un contrato de mantenimiento activo. {#standard-support-maintenance-included-with-active-maintenance-contract}

Servicio | Detalles  
---|---  
Acceso al portal de soporte | El portal web está disponible en todo momento, todos los días del año, para un máximo de cuatro contactos técnicos designados.  
Horario de atención al cliente en directo | De lunes a viernes, de 9:00 a 17:00 horas en el Centro de Soporte Europeo.  
Acuse de recibo del incidente | En un plazo de cuatro horas laborables desde el Centro de Soporte.  
Actualizaciones y mejoras | Todos los paquetes de servicio, actualizaciones y mejoras están incluidos sin coste adicional.  
Reemplazo de la clave de licencia | Con un contrato de soporte activo, la clave de licencia se puede reasignar al cambiar el nombre de host. La transferencia se limita al reemplazo de un servidor dentro del mismo proyecto. Se requiere la aprobación previa por escrito de Eviden.  
Acceso a la base de conocimientos | Acceso completo a los artículos de la base de conocimientos, preguntas frecuentes y documentación en línea.  
Procedimiento de emergencia | SafeKit proporciona un script auxiliar para iniciar o detener una aplicación sin utilizar las funciones de alta disponibilidad de SafeKit . Este script llama a los scripts de inicio y detención de la aplicación. Además, añade o elimina la dirección IP virtual cuando es necesario.  
Portal de soporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos sin contrato de soporte. {#free-resources-no-contract-required}

Recurso | Detalles  
---|---  
Asistente de soporte de IA | Utilice [el chat con IA SafeKit](</es/resources/safekit-support/#ai-support>) en safekit.eviden.com.   
Formación y certificación en línea | [Aprende a tu propio ritmo](</es/resources/safekit-on-line-training/>) con vídeos gratuitos que duran aproximadamente 4 horas en total. Recibe un certificado al completar la formación.  
Documentación | [Aquí encontrará](</es/resources/safekit-free-trial/>) la guía del usuario, las notas de la versión, la base de conocimientos y las guías de instalación rápida.  
  
## Comparación con otras soluciones {#comparison-vs-alternatives}

Criterio | SafeKit | Clúster de conmutación por error de Microsoft (WSFC) | VMware HA | Código abierto [1]  
---|---|---|---|---  
Se requiere almacenamiento compartido (SAN/vSAN). | No | Sí | Sí | No  
Compatibilidad con Windows | Sí | Sí | Sí | No  
Soporte para Linux | Sí | No | Sí | Sí  
Despliegue en sitios remotos | Excelente | Complejo | Complejo | Complejo  
OEM | Sí | No | No | No  
Costo | Licencia perpetua por nodo | Servidor Windows y SAN | vSphere Enterprise y SAN | Servicios de integración avanzada  
Complejidad de la configuración | Listo para configurar y usar. | Alto: Configuración de Active Directory, SAN y testigos | Alto: Configuración de vCenter y almacenamiento compartido | Alto: varios productos separados para configurar  
Administración | Un producto gestionado a través de una consola web | Alto: Experiencia en Active Directory y SAN. | Alto: dependencia de vCenter | Alto: varios productos separados para mantener  
  
**[1]** En Linux, se necesitan seis proyectos de código abierto distintos para proporcionar el mismo conjunto de características: Corosync, Pacemaker, DRBD, Keepalived, STONITH y HAProxy. SafeKit ofrece estas características en un solo producto para Windows y Linux.

## Enlaces útiles {#quick-reference-links}

Recurso | URL  
---|---  
Página principal del producto | [https://safekit.eviden.com/es/](</es/>)  
Descripción técnica (documento de Word con texto y diagramas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Prueba gratuita | [https://safekit.eviden.com/es/resources/safekit-free-trial/](</es/resources/safekit-free-trial/>)  
Obtén un presupuesto | [https://safekit.eviden.com/es/safekit-pricing/](</es/safekit-pricing/>)  
Portal de soporte | <https://customercare.evidian.com>  
Soporte de IA gratuito | [https://safekit.eviden.com/es/resources/safekit-support/](</es/resources/safekit-support/>)  
Formación y certificación gratuitas | [https://safekit.eviden.com/es/resources/safekit-on-line-training/](</es/resources/safekit-on-line-training/>)  
Contáctanos | [https://safekit.eviden.com/es/contact-us-for-safekit/](</es/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-es  %}}
