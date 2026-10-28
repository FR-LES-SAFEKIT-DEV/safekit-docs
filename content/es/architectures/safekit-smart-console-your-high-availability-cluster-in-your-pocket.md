---
title: "Consola inteligente SafeKit : Su clúster de alta disponibilidad en su bolsillo"
canonical: "https://safekit.eviden.com/es/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Gestiona fácilmente los clústeres SafeKit con nuestra Smart Console. Disfruta de configuración sin código, compatibilidad con smartphones y notificaciones PWA en tiempo real. Elimina los errores humanos y garantiza una alta disponibilidad al alcance de tu mano. Más información."
category: "architectures"
lang: "es"
topics: "Consola inteligente: Intuitiva, móvil y de alta disponibilidad sin errores, Tabla de contenido, ¿Cómo funciona un clúster SafeKit mirror con la consola web?, ¿Cómo funciona un clúster SafeKit `farm` con la consola web?, ¿Cómo supervisar varios módulos y varios clústeres a través de la consola web?, ¿Cómo supervisar las alertas en la consola y gestionar las notificaciones por correo electrónico?, 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Consola inteligente SafeKit : Su clúster de alta disponibilidad en su bolsillo {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Consola inteligente: intuitiva, móvil y sin errores. Alta disponibilidad {#smart-console-intuitive-mobile-and-error-free-high-availability}

Redefina cómo gestiona la alta disponibilidad con una solución diseñada para la **y** simplicidad. La SafeKit web ofrece una experiencia **curva de** , lo que le permite configurar y controlar su infraestructura **necesidad de código**

Ya sea que se encuentre en su escritorio o en movimiento, el panel de control compatible con teléfonos inteligentes pone el control total del clúster al alcance de su mano. Al optimizar la administración de los módulos mirror y `farm` , la Smart Console **elimina el error humano** y garantiza un proceso de conmutación por error sin interrupciones para sus sistemas más críticos.

## Tabla de contenido {#table-of-contents}

  * [ ¿Cómo funciona un clúster SafeKit mirror con la consola web? ](#safekit-mirror-cluster)
  * [ ¿Cómo funciona un clúster SafeKit `farm` con la consola web? ](#safekit-farm-cluster)
  * [ Cómo supervisar varios módulos y varios clústeres a través de la consola web? ](#multipe-modules-clusters)
  * [ Cómo supervisar las alertas en la consola y gestionar las notificaciones por correo electrónico? ](#safekit-notifications-cluster)


## ¿Cómo funciona un clúster SafeKit mirror con la consola web? {#safekit-mirror-cluster}

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


Más allá de simples iconos de estado, la interfaz proporciona orquestación de conmutación por error con un solo clic **menú** ( **`...`** ), lo que le permite reasignar manualmente el rol principal para el mantenimiento planificado al tiempo que garantiza la disponibilidad continua para la actividad del usuario.

## ¿Cómo funciona un clúster SafeKit `farm` con la consola web? {#safekit-farm-cluster}

### ¿Cómo configurar un clúster SafeKit `farm` ? {#safekit-farm-cluster-configuration}


![ SafeKit Consola web: Farm Configuración de clúster para el equilibrio de carga de red y la administración de IP virtual. ](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


El clúster **SafeKit `farm`** está diseñado para ofrecer alta disponibilidad y escalabilidad de servicios. La configuración se centra en distribuir el tráfico entrante entre ambos nodos simultáneamente:

  * Servicios con equilibrio de carga **(pestaña Macros):** Defina los servicios de aplicación específicos (por ejemplo, Apache, IIS , Nginx ) que se mantendrán activos en todos los nodos.
  * Red(es) de latido **: Ruta(s) de comunicación** utilizada(s) para detectar si un nodo ha abandonado la `farm` , lo que desencadena una redistribución inmediata de la carga.
  * IP virtual **(VIP `Farm` ):** A diferencia de un clúster mirror , la VIP `Farm` se comparte entre nodos utilizando un algoritmo de filtrado del kernel para distribuir el tráfico de red.
  * Reglas de equilibrio de carga **:** Defina la política de distribución de tráfico en función de la dirección IP o el puerto de origen.
  * Comprobadores **:** Supervisa el estado de la aplicación y activa el reinicio automático si se detecta un fallo en el proceso.


### ¿Cómo supervisar un clúster SafeKit `farm` ? {#safekit-farm-cluster-monitoring}


Consola ![ SafeKit : Monitoreo de un clúster Farm de 2 nodos que muestra ambos nodos en estado UP con balanceo de carga activo. ](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


La monitorización de un clúster `farm` proporciona visibilidad de la naturaleza **activo-activo** de la infraestructura, donde todos los nodos contribuyen al rendimiento de la aplicación (en este ejemplo se muestran 2 nodos; escalable a nodos adicionales):

  * Estado ACTIVO de **(50% en 2 nodos):** En un `farm` saludable, ambos nodos están en el estado "ACTIVO" (50%), lo que significa que ambos están recibiendo y procesando activamente las solicitudes de los clientes a través de la IP virtual compartida.
  * **Reequilibrio automático:** Si un nodo falla, la consola muestra visualmente que el nodo restante recibe el 100 % del tráfico. No hay demora de conmutación por error, ya que el nodo que sobrevive ya está activo (aparte de un tiempo de detección de unos pocos segundos).
  * Inserción de nodo **:** Cuando se reinicia un nodo reparado, pasa de "PARADO" a "ACTIVO" y comienza automáticamente a recibir su parte de la carga sin intervención del administrador.
  * **Sin sincronización de datos:** Tenga en cuenta que en un clúster `farm` no hay un estado de resincronización "Naranja", ya que se espera que los nodos no tengan estado o compartan una base de datos de backend (que puede protegerse por separado en un clúster mirror ).


Más allá de los simples iconos de estado, la interfaz proporciona administración de nodos con un solo clic (menú **`...`** ), lo que le permite detener o iniciar manualmente un nodo para el mantenimiento planificado, mientras que la IP virtual compartida redistribuye automáticamente el tráfico sin interrumpir la actividad del usuario.

## ¿Cómo monitorizar varios módulos y varios clústeres a través de la consola web? {#multipe-modules-clusters}

### Visualización de múltiples módulos dentro de un único clúster {#safekit-multi-module}


![ SafeKit Consola web: 4 módulos Hyper-V implementados en el mismo clúster de 2 nodos. ](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Al implementar varios módulos en un único clúster **2 nodos, la SafeKit web proporciona** de monitorización **para cada módulo** Esto es especialmente valioso para **soluciones SafeKit -** . 

Ejemplo **:** En la figura con una configuración con 4 máquinas virtuales protegidas:

  * La consola está conectada al nodo1, que actúa como un proxy para comunicarse con el nodo2.
  * La consola muestra **4 widgets** (uno para cada VM).
  * Cada máquina virtual se ejecuta en su nodo PRIM y se replica en su nodo SEGUNDO.
  * Los administradores pueden ver en tiempo real que VM1 y VM2 están activas en el nodo 1, mientras que VM2 y VM3 están activas en el nodo 2.
  * Los administradores pueden migrar fácilmente una máquina virtual de un nodo a otro utilizando el menú **`...`** .


Esta visibilidad granular garantiza que, incluso en entornos de alta densidad, usted mantenga un control total y un conocimiento inmediato de cada carga de trabajo replicada. 

### Visualización de clústeres múltiples {#safekit-multi-cluster}


![ SafeKit Consola web: 4 clústeres implementados en 8 servidores. ](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Al implementar **varios clústeres** en distintos servidores, puede usar varias pestañas del navegador para conectarse a cada clúster o bien utilizar la función PWA (Aplicación Web Progresiva) de la consola. Al usar la PWA, se eliminan los menús de navegación del navegador, lo que permite ahorrar espacio en la pantalla y organizar mejor la monitorización del clúster en su escritorio. 

Ejemplo **:** La figura muestra cuatro consolas PWA que monitorean cuatro grupos de videovigilancia: uno en el norte, sur, oeste y este.

Nota **:** Cuando tiene demasiados clústeres para mostrar en un solo escritorio, SafeKit ofrece notificaciones para ayudar a detectar errores en numerosos clústeres. 

## ¿Cómo supervisar las alertas en la consola y gestionar las notificaciones por correo electrónico? {#safekit-notifications-cluster}

### ¿Cómo puedo recibir alertas instantáneas sobre cambios de estado del módulo y eventos críticos? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

La consola web SafeKit aprovecha las capacidades nativas del navegador para emitir **notificaciones instantáneas** cada vez que cambia el estado de un módulo. Esto garantiza que los eventos críticos se le notifiquen de inmediato, incluso cuando la consola esté en una pestaña en segundo plano.

  * Seguridad **: Las notificaciones** requieren acceso a través de HTTPS **o** .
  * Integración de PWA **:** Instale la consola como una aplicación web progresiva (PWA) en un ordenador de escritorio o móvil para disfrutar de una experiencia similar a la de una aplicación nativa.
  * **Alertas móviles:** En dispositivos móviles, las notificaciones están disponibles exclusivamente a través de la PWA, siendo HTTPS obligatorio.


Este mecanismo alerta a los usuarios de inmediato sobre eventos críticos, lo que mejora la rápida comprensión del estado del clúster y reduce los tiempos de respuesta.

### Vídeo SafeKit : Consola en smartphone (0:54) {#demo-console}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

### ¿Cómo puedo configurar alertas de correo electrónico automáticas en SafeKit ? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit registra automáticamente todos **los eventos importantes del clúster en los registros del sistema** , lo que permite una integración perfecta con cualquier herramienta de monitorización del mercado. Además, incluye un **agente de notificación por correo electrónico** dedicado, diseñado para monitorizar estos registros y enviar alertas críticas directamente a su bandeja de entrada. Esto garantiza que las partes interesadas permanezcan informadas incluso cuando la consola web no se esté monitorizando activamente. 

  * **Agrupación inteligente:** Para reducir el ruido, el agente agrupa los eventos que ocurren en un corto período en un único correo electrónico de resumen.
  * Cobertura completa **:** El agente está instalado en todos los nodos y debe configurarse explícitamente con detalles SMTP para habilitarse.
  * **Destinatarios personalizables:** Alertas directas a equipos de TI específicos o alias de gestión para garantizar una respuesta rápida.


Al combinar alertas PWA en tiempo real con la agrupación inteligente de correos electrónicos, SafeKit proporciona una estrategia de notificación multicapa para operaciones de misión crítica.

### Vídeo SafeKit : Notificaciones por correo electrónico en caso de conmutación por error (1:04) {#demo-notifications}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}