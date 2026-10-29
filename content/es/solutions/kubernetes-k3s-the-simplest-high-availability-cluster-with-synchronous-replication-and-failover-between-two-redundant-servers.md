---
title: "Kubernetes K3s Alta disponibilidad: replicación síncrona de 2 nodos y conmutación por error"
canonical: "https://safekit.eviden.com/es/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Logre alta disponibilidad de K3s en 2 nodos sin almacenamiento externo ni quórum de etcd. Descubra cómo SafeKit proporciona replicación sin pérdida de datos y conmutación por error automática."
category: "solutions"
lang: "es"
topics: "Simplificando la alta disponibilidad de K3s: ¿Por qué elegir SafeKit en lugar de MetalLB y Longhorn?, Tabla de contenido, ¿Cómo implementa el software SafeKit un clúster de alta disponibilidad de K3s Kubernetes ?, ¿Cómo funciona el clúster SafeKit mirror con K3S Kubernetes ?, Limitaciones de alta disponibilidad SafeKit , Comparación: SafeKit frente a la pila K3s estándar (MetalLB y Longhorn), Guía en vídeo: Configuración de un clúster de alta disponibilidad SafeKit mirror , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Kubernetes K3s Alta disponibilidad: replicación síncrona de 2 nodos y conmutación por error {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## Simplificando la alta disponibilidad de K3: ¿Por qué elegir SafeKit en lugar de MetalLB y Longhorn? {#safekit-k3s-ha-introduction}

Si bien la pila estándar de código abierto (MetalLB + Longhorn) para K3s es potente para grandes centros de datos, introduce una complejidad excesiva para sitios locales de dos nodos. **SafeKit** simplifican el entorno K3s al reemplazar las herramientas de red y almacenamiento independientes con un único motor de alta disponibilidad consolidado. 

### ¿Por qué usar SafeKit para alta disponibilidad (HA) de K3s de 2 nodos? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **Alta disponibilidad real de 2 nodos:** SafeKit proporciona redundancia completa con solo **2 nodos** , eliminando el requisito de 3 nodos para el quórum _etcd_.
  * **Pérdida de datos cero (RPO=0):** Reemplaza el almacenamiento de bloques de alta sobrecarga con **Replicación síncrona a nivel de byte** para rendimiento SSD local.
  * **Protección flexible a nivel de archivo:** SafeKit realiza una replicación basada en el host a nivel de archivo, completamente transparente para la aplicación. Protege no solo las bases de datos, sino también todas las carpetas y datos asociados. Puede replicar las carpetas existentes exactamente donde están instaladas, incluso en el **disco del sistema** .
  * **IP virtual integrada (VIP):** Gestiona de forma nativa la IP del clúster a nivel del kernel, eliminando la necesidad de configuraciones separadas de **MetalLB** .
  * **Conmutación por error y recuperación automáticas:** En caso de fallo, se activa una transición inmediata al nodo secundario; una vez que el nodo principal está en buen estado, SafeKit ejecuta **la resincronización automática de datos** sin intervención manual.
  * **Ultra-bajo consumo de recursos:** SafeKit funciona sin la gran carga de gestión de los pods de almacenamiento (CSI/Longhorn) y los pods de red (CNI/MetalLB) que requieren las pilas estándar, lo que libera RAM y CPU críticas para sus aplicaciones.
  * **Apto para generalistas de TI:** Reemplaza la compleja infraestructura **YAML** para redes y almacenamiento con una **interfaz gráfica web simple** y scripts de implementación automatizados, lo que le permite centrarse únicamente en sus aplicaciones.


Diagrama de arquitectura ![ SafeKit para alta disponibilidad de K3s de 2 nodos con IP virtual integrada, replicación en tiempo real y conmutación por error automática. ](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **Alta disponibilidad (HA) sin recursos compartidos para clústeres K3s de 2 nodos**  


<a class="btn-quick-install" href="/es/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Guía rápida de instalación del clúster HA Kubernetes > </a>
## Tabla de contenido {#toc}

  * [ ¿Cómo implementa el software SafeKit un clúster de alta disponibilidad K3s Kubernetes ? ](#safekit-mirror-k3s-cluster)
  * [ Cómo funciona el clúster SafeKit mirror con Kubernetes K3S? ](#safekit-mirror-cluster)
  * [ SafeKit Limitaciones de alta disponibilidad ](#safekit-ha-limitations)
  * Comparación [ : SafeKit frente a la pila K3s estándar (MetalLB y Longhorn) ](#safekit-k3s-ha-comparison)
  * Guía de vídeo [ : Configuración de un clúster HA SafeKit Mirror ](#videoguide-safekit-mirror-cluster)
  * [ 🔍 SafeKit Centro de navegación de alta disponibilidad ](#hub)


## ¿Cómo implementa el software SafeKit un clúster de alta disponibilidad K3s Kubernetes ? {#safekit-mirror-k3s-cluster}

### ¿Cómo implemento alta disponibilidad para un clúster K3s de 2 nodos Kubernetes ? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

Puede implementar alta disponibilidad (HA) para un clúster K3s de 2 nodos Kubernetes utilizando **SafeKit k3s.safe mirror module** . Esta solución le permite implementar un entorno redundante sin necesidad de almacenamiento NFS externo, una base de datos de configuración externa dedicada o conocimientos especializados Kubernetes .

### ¿Por qué usar K3s para computación Edge e IoT? {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>) es el motor preferido Kubernetes para **y computación de borde** porque es una distribución ligera y certificada diseñada para entornos con recursos limitados. Simplifica la sobrecarga operativa del estándar Kubernetes manteniendo la compatibilidad total.

### ¿Cuáles son las características principales del módulo k3s.safe ? mirror ? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

El módulo k3s.safe proporciona una pila HA completa para K3s mediante la implementación de:

  * **Nodos activos duales:** Ejecuta 2 maestros/agentes K3s activos simultáneamente para alojar pods.
  * Replicación de MariaDB base de datos **: Replicación en tiempo real de la base de datos de configuración** entre nodos.
  * **Almacenamiento persistente:** Replicación de volúmenes persistentes a través de un aprovisionador dinámico de cliente NFS integrado (nfs-client).
  * Continuidad de red **:** Incluye una dirección IP virtual para un acceso de cliente sin interrupciones.
  * **Recuperación automatizada:** Compatibilidad total con conmutación por error y recuperación automáticas.


### Además de K3s, ¿qué aplicaciones y entornos puede proteger SafeKit ? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit es una solución versátil de alta disponibilidad **para Windows y Linux** que se extiende mucho más allá del clúster mirror de K3. Permite **la replicación síncrona en tiempo real** y la conmutación por error automática para una amplia gama de cargas de trabajo críticas, que incluyen:

  * Entornos virtuales y físicos **: Máquinas virtuales completas de Hyper-V o KVM** .
  * Orquestación de contenedores **: entornos** , Docker Podman .
  * **Datos y servicios:** Directorios de archivos individuales, servicios y diversas bases de datos.
  * **Infraestructura en la nube:** Alta disponibilidad para aplicaciones en la nube.


SafeKit también proporciona **<span class="notranslate farm-term" translate="no">Farm</span> Clusters** con **equilibrio de carga de red y conmutación por error nativos** para aplicaciones sin estado como **Servidores web** .

💡 [ Explore la lista completa de soluciones HA compatibles aquí. ](</es/solutions/>)

### ¿Cómo logra SafeKit la alta disponibilidad de K3s? {#safekit-k3s-architecture-table}

Arquitectura y lógica de redundancia **para un clúster K3s de 2 nodos que utiliza SafeKit**

Clúster K3s de 2 nodos | SafeKit PRIM (Nodo primario) | SafeKit SECOND (Nodo secundario)  
---|---|---  
Los servicios de maestro y agente de K3s | están activos, gestionando la orquestación del clúster y ejecutando pods. Los servicios de maestro y agente de K3s | permanecen activos, proporcionando procesamiento paralelo y alta disponibilidad.  
Almacenamiento NFS y PV | • Aloja IP virtual y puerto NFS <br> • Gestiona recursos compartidos NFS exportados activos <br> • Almacena volúmenes persistentes (PV) de K3s | Duplicación síncrona: SafeKit replica todos los volúmenes persistentes en tiempo real para garantizar cero pérdida de datos.  
Base de datos de configuración | • Hosts IP virtual y puerto MariaDB <br> • Gestiona la base de datos de configuración activa de K3s | Replicación de la base de datos: La base de datos MariaDB se replica de forma síncrona, conservando el estado del clúster para la conmutación por error.  
  
Mecanismo de conmutación por error automática **:** En caso de fallo del nodo principal, SafeKit migra automáticamente las IP virtuales y los servicios de almacenamiento al nodo secundario, lo que garantiza un servicio ininterrumpido para el clúster K3s.

## ¿Cómo funciona el clúster SafeKit mirror con Kubernetes K3S? {#safekit-mirror-cluster}

### Paso 1: Replicación de archivos a nivel de byte en un clúster Mirror {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Esta etapa ilustra la arquitectura de alta disponibilidad entre **el Servidor 1 (PRIM)** y **el Servidor 2 (SEGUNDO)** . Ambos servidores ejecutan los componentes maestro y agente de K3s tal como se define en la tabla de arquitectura [ ](#safekit-k3s-architecture-table) .


Replicación de archivos ![ a nivel de byte en un clúster Kubernetes K3s mirror ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Actualmente, la **IP virtual (VIP)** , **el almacenamiento persistente NFS** y **MariaDB** están activos solo en el Servidor 1 (PRIM). Los componentes maestros MariaDB K3s en ambos nodos se sincronizan entre sí accediendo al estado del clúster a través de la IP virtual y el puerto MariaDB . SafeKit implementa la replicación síncrona [ de ](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>) y archivos persistentes NFS, lo que garantiza **cero pérdida de datos (RPO = 0)** en caso de fallo.

Los maestros de K3s distribuyen la carga de trabajo entre ambos nodos (o más) comunicándose directamente con los agentes de K3s. Los clientes externos se conectan al  
La dirección IP virtual del clúster [ ](</es/best-practises/how-a-virtual-ip-address-works/>) encuentra en el nodo PRIM. Mediante mecanismos estándar, el maestro Kubernetes reenvía el tráfico a los pods distribuidos entre los nodos. De manera similar, los pods acceden a sus volúmenes persistentes (PV) **en el servidor PRIM a través de la IP virtual y** puerto NFS.

### Paso 2: Conmutación por error automática y continuidad del servicio {#step-2-automatic-failover-and-service-continuity}

Cuando el servidor **1 (PRIM)** falla, el servidor **2 (SECOND)** toma automáticamente el control de las operaciones del clúster para garantizar la continuidad.


Conmutación por error ![ en un clúster Kubernetes K3S mirror ](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit detecta el fallo e inmediatamente migra la dirección IP virtual **del clúster al Servidor 2. A continuación** activa los servicios NFS locales **MariaDB** y **. Gracias a la replicación síncrona realizada en el Paso 1, todas las bases de datos MariaDB y los archivos de volumen persistente (PV) NFS ya están actualizados en el Servidor 2, lo que garantiza la ausencia** pérdida de datos.

Con el estado del clúster preservado, el **K3s Master** del Servidor 2 continúa su ejecución. Detecta la pérdida del agente del Servidor 1 y reprograma automáticamente los pods afectados en los agentes K3s activos restantes. El tiempo total de conmutación por error (RTO) es la suma del intervalo de detección de fallos (por defecto: 30 segundos) y el tiempo necesario para que los componentes de K3s se inicialicen en el nodo secundario.

Mientras el servidor 1 está fuera de línea, los servicios MariaDB y NFS continúan ejecutándose en el servidor 2, escribiendo los cambios solo localmente.  


### Paso 3: Recuperación y reintegración automática {#step-3-failback-and-automatic-reintegration}

**La recuperación automática** se produce cuando se reinicia el Servidor 1 tras resolverse el problema inicial. SafeKit resincroniza automáticamente los archivos MariaDB y NFS, actualizando únicamente los datos modificados en el Servidor 2 durante el tiempo de inactividad. Este proceso de reintegración **no interrumpe el servicio** ; los componentes maestro y agente de K3s continúan ejecutándose en el Servidor 2 sin interrupciones. 


![ Resincronización automática y recuperación ante fallos en un clúster K3s mirror ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit optimiza el tiempo de recuperación en función de cómo se detuvo el servidor: 

  * **Apagado limpio:** Si SafeKit se detuvo intencionalmente en el Servidor 1, solo las zonas modificadas específicas dentro de los archivos se resincronizan usando **mapas de bits de seguimiento de modificaciones** . Esto garantiza una reintegración ultrarrápida. 
  * **Fallo del sistema (p. ej., fallo de alimentación):** Si el servidor 1 sufrió un apagado incorrecto, los mapas de bits de modificación se omiten por seguridad. SafeKit en su lugar, se resincronizan todos los archivos con una marca de tiempo de modificación más reciente que el último punto de sincronización establecido, lo que garantiza **la integridad total de los datos** . 


### Paso 4: Restablecimiento de la alta disponibilidad y la distribución de carga {#step-4-restoring-high-availability-and-load-distribution}

Tras la reintegración, el clúster vuelve al **modo mirror completo** , reflejando el estado descrito en el paso 1. El sistema vuelve a estar en un estado de alta disponibilidad: los servicios **MariaDB** y **NFS** permanecen activos en el servidor 2, mientras que SafeKit realiza la replicación en tiempo real de todas las actualizaciones de archivos de vuelta al servidor 1. 


![ Volver al funcionamiento normal en un clúster Kubernetes K3s mirror ](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

El **K3s Master** y **el K3s Agent** se reinician automáticamente en el Servidor 1. El planificador Kubernetes ahora reconoce al Servidor 1 como un nodo en buen estado y puede comenzar a reprogramar los pods para distribuir la carga de trabajo entre ambos servidores. 

Si el administrador prefiere que los servicios MariaDB y NFS se ejecuten en el Servidor 1 (restaurando la función PRIM original), se puede iniciar un **cambio** manualmente a través de la consola web en un momento conveniente o automatizarlo mediante la configuración. 

### ¿Cómo configurar un clúster SafeKit Mirror ? {#safekit-mirror-cluster-configure}


Consola web ![ SafeKit : Panel de configuración de alta disponibilidad que muestra redes de latido, configuración de IP virtual y replicación de directorio en tiempo real para un clúster mirror . ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


La consola web **SafeKit** proporciona una interfaz intuitiva para orquestar la alta disponibilidad de sus aplicaciones críticas. En tan solo unos pasos, puede configurar un clúster **SafeKit mirror** para garantizar la continuidad del negocio:

  * **Conmutación por error de la aplicación (pestaña Macros):** Defina los servicios de la aplicación específicos que se reiniciarán automáticamente en caso de fallo.
  * Red(es) de latido **: Ruta(s) de comunicación dedicada(s) utilizada(s) por los nodos del clúster** para monitorear continuamente el estado y la disponibilidad de los demás y sincronizar las decisiones de conmutación por error.
  * **Administración de IP virtual:** Configure la IP virtual (VIP) para la reconexión transparente del cliente después de una conmutación por error.
  * **Replicación en tiempo real:** Seleccione los directorios críticos para la replicación síncrona a nivel de byte basada en el host.
  * Comprobadores **:** Supervisan el estado de la aplicación y activan la recuperación automática si se detecta un fallo en el proceso.


El clúster SafeKit incluye un verificador de división de cerebro dedicado para resolver problemas de aislamiento de red sin necesidad de una tercera máquina testigo ni una red de latidos adicional. Obtenga más información sobre la función de latidos, la conmutación por error y el quórum [ en un clúster ](</es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) .

### ¿Cómo supervisar un clúster SafeKit mirror ? {#safekit-mirror-cluster-monitoring}


Consola web ![ SafeKit : Monitoreo en tiempo real de un clúster mirror de 2 nodos que muestra los estados PRIM y SECOND con replicación de datos activa. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


La **consola de administración SafeKit** ofrece una visión unificada de su infraestructura de alta disponibilidad. Permite a los administradores supervisar el **estado operativo** del clúster y realizar un seguimiento de la sincronización de datos en tiempo real.

Para un clúster mirror de 2 nodos, la consola muestra claramente las funciones de cada servidor:

  * **PRIM (Principal):** El nodo activo que actualmente ejecuta la aplicación y administra la IP virtual. Realiza escrituras en el almacenamiento local y replicación en tiempo real al nodo secundario.
  * **SEGUNDO (Secundario):** El nodo en espera recibe actualizaciones síncronas a nivel de byte. Está listo para tomar el control instantáneamente si el nodo principal falla.
  * Estado **SOLO:** Le avisa visualmente cuando el clúster se ejecuta en un solo nodo (por ejemplo, durante el mantenimiento o después de un fallo), lo que indica que la redundancia se pierde temporalmente.
  * Progreso de resincronización **:** Cuando un nodo que falló se recupera, su estado cambia a naranja durante la reintegración de datos en segundo plano, lo que garantiza que no haya tiempo de inactividad durante la fase de "regreso a la normalidad".


Más allá de los simples iconos de estado, la interfaz ofrece **una orquestación de conmutación por error con un solo clic** , lo que permite reasignar manualmente la función principal para el mantenimiento planificado, garantizando al mismo tiempo la disponibilidad continua para la actividad del usuario.


{{%  insert-safekit-usage-es  %}}
 

## Comparación: SafeKit frente a la pila K3s estándar (MetalLB y Longhorn) {#safekit-k3s-ha-comparison}

Comparación de **: SafeKit frente a la versión estándar de código abierto (MetalLB + Longhorn)**

Capacidad | SafeKit ( K3s.safe ) | MetalLB + Longhorn (K8s estándar)  
---|---|---  
Arquitectura | Todo en Uno: Redes integradas, replicación y conmutación por error en un solo paquete. | Pila DIY (Hágalo usted mismo): Se requieren varios paquetes independientes (CNI, CSI, LoadBalancer).  
Eficiencia de hardware | Alta disponibilidad pura de 2 nodos: Redundancia completa sin un tercer nodo "testigo" o árbitro. | Mínimo de 3 nodos: Normalmente requiere números impares para el quórum de Etcd y la seguridad del almacenamiento.  
Redes (VIP) | Nativo: IP virtual gestionada a nivel del sistema operativo; transparente para K3s. | Complejo: Requiere instalación de MetalLB con configuración L2 o BGP mediante pods de altavoces dedicados que consumen CPU/RAM en cada nodo.  
Requisitos de almacenamiento | Sincrónico a nivel de byte: replicación de archivos en tiempo real de directorios existentes; funciona en discos de sistema estándar; replicación de archivos a nivel de byte con mínima sobrecarga de CPU/red. | A nivel de bloque: almacenamiento de bloques distribuido (Longhorn) mediante pods de almacenamiento dedicados; mayor consumo de recursos.  
Inteligencia de conmutación por error | Estabilidad independiente: SafeKit opera fuera del entorno de ejecución del contenedor. Supervisa directamente el sistema operativo y el hardware, asegurando la conmutación por error incluso si el plano de control Kubernetes o el motor del contenedor se bloquean. | Dependencia circular: La lógica de conmutación por error se aloja _dentro_ de los pods que debe proteger. Si el sistema operativo del host o el motor K3s se bloquean, los pods de administración (MetalLB/Longhorn) también se congelan, lo que a menudo requiere una intervención manual para desbloquearlos.  
Administración | : Se gestiona mediante una única consola web; no se requiere Kubernetes experto. | especializada: Requiere un conocimiento profundo de YAML, Helm y controladores internos de Kubernetes.  
  
**En resumen** , si bien una pila estándar de bricolaje (MetalLB + Longhorn) ofrece modularidad para Kubernetes expertos, **crea una dependencia circular** donde las herramientas de almacenamiento y redes son vulnerables a las mismas fallas de nodo que están diseñadas para administrar. **SafeKit** rompe este ciclo al operar como una capa de infraestructura independiente; proporciona una solución HA de 2 nodos más robusta e independiente del hardware que permanece operativa incluso si el motor o el sistema operativo del Kubernetes se bloquean. Esto garantiza la recuperación automatizada y la integridad de los datos sin la gran sobrecarga de recursos, el quórum obligatorio de tres nodos o la complejidad de configuración requerida por las superposiciones de almacenamiento de bloques distribuidos y redes tradicionales.

## Guía en vídeo: Configuración de un clúster SafeKit HA mirror {#videoguide-safekit-mirror-cluster}

### Vídeo SafeKit : Agrupación a nivel de aplicación (8:47) {#demo-mirror-ha-cluster}

Si bien este video demuestra la alta disponibilidad de SafeKit para Microsoft SQL Server , también ofrece una excelente descripción general de cómo la solución protege los entornos K3s. SafeKit funciona de manera idéntica para cualquier otra base de datos o aplicación crítica para el negocio.

### Vídeo destacado {#video-highlights}

  1. 🎬 [ 2 nodos con SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Configurar el clúster y el módulo mirror.safe ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Iniciar y probar la replicación SQL, migración, conmutación por error en caso de fallo ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}