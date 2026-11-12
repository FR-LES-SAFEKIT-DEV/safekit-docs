---
title: "Referencia técnica SafeKit para documentos de RFI y solicitud RFP"
canonical: "https://safekit.eviden.com/es/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Encuentre información técnica sobre SafeKit para preparar solicitudes de información (RFI) y solicitudes de propuestas (RFP). Obtenga información sobre los sistemas compatibles, las arquitecturas, los tiempos de recuperación, la seguridad, las licencias y el soporte."
category: "resources"
lang: "es"
topics: "Descripción general, Índice, Información del producto, Sistemas operativos y plataformas compatibles, Limitaciones de alta disponibilidad SafeKit, Módulos de aplicación preconfigurados, Arquitectura e implementación, Pérdida de datos y tiempos de recuperación (RPO y RTO), Sitios remotos e implementaciones distribuidas, Supervisión y alertas, Seguridad y cumplimiento normativo, Licencias, Soporte y mantenimiento, Comparación con otras soluciones, Enlaces útiles"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 48 expressions"
---

# Referencia técnica SafeKit para documentos de RFI y RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Descripción general {#overview}

Utilice esta página para preparar una solicitud de información (RFI) o una solicitud de propuestas (RFP). Responde a preguntas técnicas comunes sobre el software de alta disponibilidad SafeKit. La información ayuda a los equipos de adquisiciones y a los arquitectos de soluciones a definir sus requisitos.

## Índice {#table-of-contents}

  1. [Información del producto](#product-identity)
  2. [Sistemas operativos y plataformas compatibles](#supported-operating-systems-platforms)
  3. [Limitaciones de alta disponibilidad SafeKit](#safekit-ha-limitations)
  4. [Módulos de aplicación preconfigurados](#pre-built-application-modules)
  5. [Arquitectura e implementación](#architecture-deployment-model)
  6. [Pérdida de datos y tiempos de recuperación (RPO y RTO)](#rpo-rto-capabilities)
  7. [Sitios remotos e implementaciones distribuidas](#edge-distributed-deployment-suitability)
  8. [Supervisión y alertas](#monitoring-management-alerting)
  9. [Seguridad y cumplimiento normativo](#security-compliance)
  10. [Licencias](#licensing-model)
  11. [Soporte y mantenimiento](#support-maintenance-slas)
  12. [Comparación con otras soluciones](#comparison-vs-alternatives)
  13. [Enlaces útiles](#quick-reference-links)


## Información del producto {#product-identity}

Tema | Detalles  
---|---  
Nombre del producto | SafeKit  
Proveedor | Eviden, parte del Grupo Atos. Anteriormente Evidian.  
País de desarrollo | Francia  
Categoría de producto | Software para la agrupación de aplicaciones, la alta disponibilidad y la recuperación ante desastres  
Versión actual | SafeKit 8.2  
Sitio web | [https://safekit.eviden.com](/es/)  
Primera versión | 2000. Utilizado en producción durante más de 20 años.  
  
{{%  insert-supported-os-es  %}}

{{%  insert-safekit-usage-es  %}}

## Módulos de aplicación preconfigurados {#pre-built-application-modules}

SafeKit incluye módulos `.safe` listos para usar. Hay dos formas de proteger las aplicaciones. **La alta disponibilidad de aplicaciones** protege una aplicación directamente con un módulo mirror o <span class="notranslate farm-term" translate="no">farm</span>. **La alta disponibilidad de máquinas virtuales** protege toda la máquina virtual con un módulo hyperv.safe o kvm.safe.

Criterio de comparación | Alta disponibilidad de la aplicación | Alta disponibilidad de máquinas virtuales  
---|---|---  
Configuración | Debe saber qué servicios de aplicación deben reiniciarse y qué carpetas deben replicarse. También debe configurar la dirección IP virtual utilizada para la conmutación por error. | Solo necesita especificar la ubicación de los archivos de la máquina virtual. No necesita saber cómo funcionan las aplicaciones dentro de la máquina virtual. Este enfoque protege las aplicaciones y el sistema operativo juntos.  
Uso recomendado | Añada alta disponibilidad directamente a una solución de software, sin depender de un hardware o un hipervisor específicos. | Gestione varias aplicaciones en varias máquinas virtuales con una única política de alta disponibilidad.  
  
La siguiente tabla enumera todos los módulos `.safe` disponibles:

Alta disponibilidad de la aplicación | Alta disponibilidad de máquinas virtuales  
---|---  
Nueva aplicación Windows: mirror.safe | Máquina virtual Hyper-V — hyperv.safe (Windows)  
Nueva aplicación Linux: mirror.safe | Máquina virtual KVM — kvm.safe (Linux)  
Balanceo de carga Windows — farm.safe | Contenedor Docker — mirror.safe (Linux)  
Balanceo de carga Linux — farm.safe | Contenedor Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows y Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows y Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows y Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows y Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows y Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows y Linux) | Suite Siemens Siveillance — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows y Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Nube (AWS, Azure, GCP, genérica) — mirror.safe/farm.safe |   
  
## Arquitectura e implementación {#architecture-deployment-model}

### Dos módulos de clúster: mirror.safe y farm.safe {#two-cluster-modules}

Módulo | Principio de funcionamiento | Aplicaciones típicas  
---|---|---  
mirror.safe | Un servidor está activo y el otro en espera. Los archivos se replican de forma síncrona a nivel de byte. La conmutación por error es automática. | Bases de datos, aplicaciones que almacenan el estado y servicios que se ejecutan en un solo servidor a la vez  
farm.safe | Varios servidores están activos al mismo tiempo. SafeKit distribuye el tráfico de la red entre ellos y gestiona la conmutación por error automáticamente. | Servidores web, microservicios sin estado, pasarelas de API y servicios que se ejecutan en varios servidores a la vez  
  
### Infraestructura del clúster {#cluster-infrastructure-architecture}

Requisito | Capacidades SafeKit  
---|---  
¿Se requiere almacenamiento compartido? | No. SafeKit utiliza discos locales. No necesita una SAN ni almacenamiento compartido.  
¿Se requiere Active Directory? | No. SafeKit no requiere un dominio Windows ni Active Directory. También es compatible con grupos de trabajo.  
Número de nodos en un clúster | 2 nodos (mirror) o 2+ nodos (<span class="notranslate farm-term" translate="no">farm</span>)  
Dirección IP virtual (VIP) | Para la alta disponibilidad de la aplicación, la dirección IP virtual se mueve automáticamente al nodo activo a través de ARP gratuito. Para la alta disponibilidad de la máquina virtual, el tráfico a la dirección IP dentro de la máquina virtual se redirige automáticamente. No se necesita una dirección IP virtual separada. Los nodos deben compartir una LAN o una VLAN extendida entre sitios.  
Arquitectura con tres nodos | SafeKit ejecuta un clúster mirror de dos nodos en una LAN o una VLAN extendida entre sitios. Proporciona replicación síncrona con cero pérdida de datos (RPO = 0) y conmutación por error automática. Un producto de copia de seguridad independiente replica los datos de forma asíncrona a un tercer nodo a través de una WAN. Esta copia de seguridad permite la recuperación a un punto anterior en el tiempo y proporciona protección contra el ransomware.  
Propósito de la alta disponibilidad | SafeKit replica los datos de forma síncrona en ambos nodos. Esto permite la conmutación por error automática sin pérdida de datos después de un fallo de hardware o software. Sin embargo, los errores lógicos, la corrupción de datos y las eliminaciones accidentales también se copian inmediatamente al nodo en espera.  
Finalidad de las copias de seguridad | Las copias de seguridad le permiten restaurar datos desde un punto anterior en el tiempo. Un producto de copia de seguridad independiente, no SafeKit, proporciona esta protección mediante la replicación asincrónica. Las copias de seguridad ayudan a recuperarse del ransomware y de los errores humanos. Esta recuperación no es una conmutación por error automática. La restauración de una copia de seguridad anterior pierde los cambios realizados después de esa copia de seguridad.  
Máximo de módulos ejecutándose al mismo tiempo | Un clúster de dos nodos puede gestionar hasta 32 módulos al mismo tiempo. Para la protección de máquinas virtuales, cada módulo replica y reinicia una máquina virtual diferente. Cada módulo puede ser primario en cualquiera de los nodos, por lo que ambos servidores pueden compartir la carga de trabajo. El volumen total de datos afecta al tiempo de resincronización después de una conmutación por error o un reinicio del nodo.  
¿Hay software instalado en cada nodo? | Sí. Se instala un software ligero en cada nodo.  
Aplicaciones compatibles | SafeKit puede proteger cualquier servicio Windows o demonio Linux. Hay módulos preconfigurados disponibles para más de 30 aplicaciones.  
  
### Replicación y protección de datos {#replication-data-protection}

Requisito | Capacidades SafeKit  
---|---  
Método de replicación | SafeKit replica los cambios de archivos a nivel de byte. No replica bloques de disco.  
Modo de replicación | Replicación síncrona, con cero pérdida de datos  
Requisito de red | Para la replicación síncrona, se recomienda una latencia de ida y vuelta inferior a 5 ms entre los nodos.  
Volumen de datos recomendado | Unos pocos terabytes, para que el tiempo de resincronización sea manejable  
Recuento de archivos recomendado | Menos de 1.000.000 de archivos, para que el tiempo de resincronización sea manejable  
Tiempo de resincronización para 1 TB | Aproximadamente 3 horas en una red de 1 Gb/s o 1 hora en una red de 10 Gb/s  
Replicación selectiva | Puede elegir qué directorios y archivos desea replicar.  
Cifrado durante la transferencia | El tráfico de replicación está cifrado con TLS/SSL.  
  
## Pérdida de datos y tiempos de recuperación (RPO y RTO) {#rpo-rto-capabilities}

### RPO y RTO para cada tipo de clúster {#rto-rpo-cluster-type}

Métrica | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO (objetivo de punto de recuperación) | Pérdida de datos nula. Una operación de escritura se completa solo cuando ambos nodos han escrito los datos. | No aplicable a los servicios sin estado. Los datos son gestionados por un clúster mirror independiente.  
RTO (objetivo de tiempo de recuperación) | Aproximadamente un minuto. Esto incluye el tiempo de espera <span class="notranslate farm-term" translate="no">heartbeat</span> (30 segundos por defecto) y el tiempo para reiniciar la aplicación. | Unos pocos segundos. El tráfico se redistribuye a los nodos activos restantes.  
Tipo de replicación | Replicación de archivos síncrona, en tiempo real y a nivel de byte | No aplicable  
Activador de conmutación por error | La conmutación por error se inicia automáticamente cuando los mensajes <span class="notranslate farm-term" translate="no">heartbeat</span> se detienen, cuando un proceso falla o cuando un verificador detecta un fallo | La conmutación por error se inicia automáticamente cuando los mensajes <span class="notranslate farm-term" translate="no">heartbeat</span> se detienen, cuando un proceso falla o cuando un verificador detecta un fallo  
¿Se requiere intervención manual? | No. La conmutación por error y la recuperación son automáticas. | No. La conmutación por error y la recuperación son automáticas.  
  
### Tiempo de recuperación para aplicaciones protegidas por un clúster mirror {#rto-breakdown-mirror-application-level-ha}

Tipo de fallo | Cómo se calcula el tiempo de recuperación  
---|---  
Fallo de hardware | Tiempo de espera de <span class="notranslate farm-term" translate="no">heartbeat</span> (30 segundos por defecto), seguido del reinicio de la aplicación  
Bloqueo del software o del proceso | El tiempo para detener la aplicación, seguido del reinicio de la aplicación  
Fallo del sistema operativo | El tiempo de espera <span class="notranslate farm-term" translate="no">heartbeat</span>, seguido del reinicio de la aplicación. El servidor en espera no necesita reiniciarse porque su sistema operativo ya está en funcionamiento.  
  
### Tiempo de recuperación de las máquinas virtuales protegidas por un clúster mirror {#rto-breakdown-mirror-vm-level-ha}

Tipo de fallo | Cómo se calcula el tiempo de recuperación  
---|---  
Todos los tipos de fallos | Tiempo necesario para detectar el error, reiniciar el sistema operativo de la máquina virtual y reiniciar la aplicación. Esto suele tardar varios minutos.  
  
## Sitios remotos e implementaciones distribuidas {#edge-distributed-deployment-suitability}

SafeKit está diseñado para sitios remotos, sucursales y organizaciones con muchas ubicaciones.

Requisito en un sitio remoto | Capacidades SafeKit  
---|---  
No hay personal de TI dedicado en el lugar | La conmutación por error es automática y no requiere ninguna acción manual.  
Sin almacenamiento compartido (SAN o NAS) | Solo se necesitan discos locales. No se requiere almacenamiento compartido.  
Gestión remota | Administre el clúster a través de una consola web.  
Hardware limitado | Dos servidores estándar o máquinas virtuales son suficientes. No se requiere hardware especial.  
Cortafuegos y traducción de direcciones de red (NAT) | Los puertos se pueden configurar. La consola web utiliza HTTPS.  
Recuperación ante desastres entre sitios | Un clúster mirror puede conectar dos sitios a través de una VLAN extendida entre ellos.  
Integración por parte de los editores de software | Los editores de software pueden incluir SafeKit en sus productos. La instalación puede ejecutarse sin interacción del usuario y puede automatizarse con scripts.  
Cientos de clústeres SafeKit en numerosos sitios | SafeKit está diseñado para organizaciones con muchas sucursales.  
  
Los siguientes sitios necesitan alta disponibilidad incluso cuando no disponen de un centro de datos:

Industria | Sitio típico | Aplicaciones críticas  
---|---|---  
Seguridad física y vigilancia | Edificios, campus, aeropuertos | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestión de edificios (BMS) | Edificios de oficinas, hospitales, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Control de acceso electrónico (EACS) | Instalaciones y campus seguros | Siemens SiPass, Nedap, Bosch AMS  
SCADA y control industrial | Fábricas, subestaciones, plantas de tratamiento de agua | Cualquier software SCADA, DCS o HMI que se ejecute en Windows o Linux  
Control del tráfico aéreo (ATC) | Aeropuertos, torres de control | Sistemas de gestión y radar de ATC  
Centros de control de operaciones (OCC) | Metro, ferrocarril, centros de transporte | Señalización ferroviaria y gestión de estaciones  
Marítimo | Buques, embarcaciones navales | Sistemas de navegación, gestión de carga y de a bordo  
Petróleo y gas | Plataformas marinas, plataformas remotas | Sistemas de control de procesos y de seguridad  
Telecomunicaciones | Sitios de antenas 5G, nodos MEC | Servidores de computación en el borde de la red de acceso múltiple (MEC)  
Atención médica | Clínicas, centros de diagnóstico remotos | Imágenes médicas, datos de pacientes, diagnósticos remotos  
Venta al por menor | Tiendas, sucursales, almacenes | Punto de venta y gestión de inventario  
Defensa | Bases de operaciones avanzadas, unidades de campo | Sistemas de mando y comunicaciones de misión crítica  
  
## Supervisión y alertas {#monitoring-management-alerting}

Característica | Detalles  
---|---  
Consola web | Configure, supervise y gestione los nodos del clúster a través de una aplicación web o una aplicación web progresiva (PWA).  
Notificaciones móviles | Recibe notificaciones del navegador cuando un módulo cambie de estado.  
Cronología | Vea los cambios de estado y los eventos del módulo en orden cronológico.  
Notificaciones por correo electrónico | Un agente de correo electrónico integrado envía alertas.  
Interfaz de línea de comandos | Utilice la interfaz de línea de comandos para escribir scripts y automatizar tareas.  
Gestión de registros | Cada módulo y script tiene sus propios archivos de registro. El equipo de soporte utiliza los <span class="notranslate farm-term" translate="no">snapshots</span> de los módulos para investigar problemas.  
Integración con herramientas de supervisión | SafeKit registra los eventos importantes del clúster en el registro de eventos Windows o en el Syslog Linux. Las herramientas de supervisión pueden recopilar estos eventos y activar alertas con reglas estándar. Esto funciona con Nagios, Zabbix, Splunk y herramientas SIEM sin necesidad de desarrollo personalizado.  
  
## Seguridad y cumplimiento normativo {#security-compliance}

Característica | Detalles  
---|---  
HTTPS | La consola web utiliza HTTPS con certificados TLS.  
Autenticación de usuario | Cuentas locales, LDAP, certificados (PKI) y OpenID Connect  
Roles de usuario | Configure las políticas de acceso para la administración, el control y la supervisión.  
Cifrado | El tráfico TCP utiliza TLS/SSL para la replicación, la consola web y los comandos distribuidos. El tráfico UDP utiliza el cifrado AES-128-CBC con SHA256 para los mensajes <span class="notranslate farm-term" translate="no">heartbeat</span> y para el protocolo interno safeadmin. La biblioteca OpenSSL proporciona el cifrado. El servicio web se ejecuta en Apache.  
Antivirus | La documentación enumera las rutas que se deben excluir de los análisis antivirus.  
Soberanía | SafeKit es desarrollado en Francia por Eviden, que forma parte del Grupo Atos. Protege las aplicaciones Windows y Linux, manteniendo sus datos y servidores en sus instalaciones. SafeKit puede ayudar a cumplir los requisitos de la Directiva Europea NIS2 para la continuidad del negocio y la recuperación ante desastres.
  
## Licencias {#licensing-model}

Tema | Detalles  
---|---  
Tipo de licencia | Una licencia perpetua se compra una sola vez y está vinculada a un nombre de host.  
Alcance de la licencia | Una licencia por servidor (nodo)  
Activación de la licencia | Las claves de licencia se pueden activar sin acceso a Internet.  
Prueba gratuita | La prueba gratuita incluye todas las funciones.  
Licencia gratuita de un mes | Disponible para probar una prueba de concepto  
  
## Soporte y mantenimiento {#support-maintenance-slas}

### Soporte y mantenimiento estándar con un contrato de mantenimiento activo {#standard-support-maintenance-included-with-active-maintenance-contract}

Servicio | Detalles  
---|---  
Acceso al portal de soporte | El portal web está disponible en todo momento, todos los días del año, para un máximo de cuatro contactos técnicos designados.  
Horario de soporte en vivo | De lunes a viernes, de 09:00 a 17:00, en el Centro de Soporte Europeo  
Acuse de recibo del incidente | En un plazo de cuatro horas laborables. Las horas laborables son las horas de atención en vivo del Centro de Soporte.  
Actualizaciones y mejoras | Todos los paquetes de servicio, actualizaciones y mejoras están incluidos sin cargo adicional.  
Reemplazo de la clave de licencia | Con un contrato de soporte activo, una clave de licencia puede reasignarse cuando cambia el nombre de host. La transferencia se limita a la sustitución de un servidor dentro del mismo proyecto. Se requiere la aprobación previa por escrito de Eviden.  
Acceso a la base de conocimientos | Acceso completo a los artículos de la base de conocimientos, las preguntas frecuentes y la documentación en línea  
Procedimiento de emergencia | SafeKit proporciona un script de contenedor para iniciar o detener una aplicación sin utilizar las funciones de alta disponibilidad de SafeKit. Este script llama a los scripts de inicio y detención de la aplicación. También añade o elimina la dirección IP virtual cuando es necesario.  
Portal de soporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos sin contrato de soporte {#free-resources-no-contract-required}

Recurso gratuito | Detalles  
---|---  
Asistente de IA para soporte | Utiliza [el chat de IA SafeKit](</es/resources/safekit-support/#ai-support>) en safekit.eviden.com.   
Formación y certificación en línea | [Aprende a tu propio ritmo](/es/resources/safekit-on-line-training/) con vídeos gratuitos que duran unas 4 horas en total. Recibirás un certificado al completar la formación.  
Documentación | Guía del usuario, notas de la versión, base de conocimientos y guías de instalación rápida [aquí](/es/resources/safekit-free-trial/)  
  
## Comparación con otras soluciones {#comparison-vs-alternatives}

Criterio | SafeKit | Clúster de conmutación por error Microsoft (WSFC) | VMware HA | Código abierto [1]  
---|---|---|---|---  
Se requiere almacenamiento compartido (SAN/vSAN) | No | Sí | Sí | No  
Soporte Windows | Sí | Sí | Sí | No  
Soporte Linux | Sí | No | Sí | Sí  
Implementación en sitios remotos | Excelente | Complejo | Complejo | Complejo  
OEM | Sí | No | No | No  
Costo | Licencia perpetua por nodo | Windows Server y SAN | vSphere Enterprise y SAN | Servicios de integración avanzados  
Complejidad de la configuración | Bajo: un producto para instalar y configurar | Alto: configuración de Active Directory, SAN y testigo | Alto: configuración de vCenter y del almacenamiento compartido | Alto: varios productos independientes para configurar  
Administración | Un producto gestionado a través de una consola web | Alto: requiere experiencia en Active Directory y SAN | Alto: depende de vCenter | Alto: varios productos distintos que mantener  
  
**[1]** En Linux, se necesitan seis proyectos de código abierto independientes para proporcionar el mismo conjunto de características: Corosync, Pacemaker, DRBD, Keepalived, STONITH y HAProxy. SafeKit proporciona estas características en un solo producto tanto para Windows como Linux.

## Enlaces útiles {#quick-reference-links}

Enlace | URL  
---|---  
Página de inicio del producto | [https://safekit.eviden.com](/es/)  
Descripción técnica (documento de Word con texto y diagramas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Prueba gratuita | [https://safekit.eviden.com/resources/safekit-free-trial/](</es/resources/safekit-free-trial/>)  
Obtener un presupuesto | [https://safekit.eviden.com/safekit-pricing/](</es/safekit-pricing/>)  
Portal de soporte | <https://customercare.evidian.com>  
Soporte de IA gratuito | [https://safekit.eviden.com/resources/safekit-support/](</es/resources/safekit-support/>)  
Formación y certificación gratuitas | [https://safekit.eviden.com/resources/safekit-on-line-training/](</es/resources/safekit-on-line-training/>)  
Contáctenos | [https://safekit.eviden.com/contact-us-for-safekit/](</es/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-es  %}}