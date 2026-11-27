---
title: "SafeKit Smart Console: su clúster de alta disponibilidad en el bolsillo"
canonical: "https://safekit.eviden.com/es/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "SafeKit Smart Console: configure y supervise sus clústeres de alta disponibilidad desde un navegador o un smartphone, sin código y con notificaciones en tiempo real."
category: "architectures"
lang: "es"
topics: "Smart Console: alta disponibilidad intuitiva y sin errores en ordenadores de sobremesa y dispositivos móviles, Índice, ¿Cómo funciona un clúster mirror SafeKit con la consola web?, ¿Cómo funciona un clúster farm SafeKit con la consola web?, ¿Cómo supervisar varios módulos y varios clústeres a través de la consola web?, ¿Cómo supervisar las alertas en la consola y gestionar las notificaciones por correo electrónico?"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png"
schemaType: "TechArticle"
---

# SafeKit Smart Console: su clúster de alta disponibilidad en el bolsillo {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: alta disponibilidad intuitiva y sin errores en ordenadores de sobremesa y dispositivos móviles {#smart-console-intuitive-mobile-and-error-free-high-availability}

Redefina la forma en que gestiona la alta disponibilidad con una solución creada para **la velocidad y la simplicidad**. La consola web SafeKit ofrece una experiencia **sin curva de aprendizaje**, lo que le permite configurar y controlar su infraestructura **sin escribir ningún código**.

Ya sea que esté en su escritorio o en movimiento, el panel de control compatible con teléfonos inteligentes pone el control total del clúster al alcance de su mano. Al agilizar la gestión de los módulos mirror y <span class="notranslate farm-term" translate="no">farm</span>, la Smart Console **elimina el error humano** y garantiza un proceso de conmutación por error sin interrupciones para sus sistemas más vitales.

## Índice {#table-of-contents}

  * [¿Cómo funciona un clúster mirror SafeKit con la consola web?](#safekit-mirror-cluster)
  * [¿Cómo funciona un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit con la consola web?](#safekit-farm-cluster)
  * [¿Cómo supervisar varios módulos y varios clústeres a través de la consola web?](#multipe-modules-clusters)
  * [¿Cómo supervisar las alertas en la consola y gestionar las notificaciones por correo electrónico?](#safekit-notifications-cluster)


## ¿Cómo funciona un clúster mirror SafeKit con la consola web? {#safekit-mirror-cluster}

### ¿Cómo configurar un clúster mirror SafeKit? {#safekit-mirror-cluster-configure}


![Consola web SafeKit: Panel de configuración de alta disponibilidad que muestra las redes heartbeat, la configuración de IP virtual y la replicación de directorios en tiempo real para un clúster mirror.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


La **consola web SafeKit** proporciona una interfaz intuitiva para organizar la alta disponibilidad de sus aplicaciones críticas. En solo unos pocos pasos, puede configurar un **clúster mirror SafeKit** para garantizar la continuidad del negocio:

  * **Conmutación por error de la aplicación (pestaña Macros):** defina los servicios de aplicación específicos que se reiniciarán automáticamente en caso de error.
  * **Red(es) heartbeat:** ruta(s) de comunicación dedicada(s) utilizada(s) por los nodos del clúster para supervisar continuamente el estado y la disponibilidad de los demás y sincronizar las decisiones de conmutación por error.
  * **Gestión de IP virtual:** configure la IP virtual (VIP) para la reconexión transparente del cliente después de una conmutación por error.
  * **Replicación en tiempo real:** Seleccione los directorios críticos para la replicación síncrona a nivel de byte basada en el host.
  * **Comprobadores:** supervisan el estado de la aplicación y activan una recuperación automática si se detecta un error en un proceso.


El clúster SafeKit incluye un checker split-brain dedicado para resolver problemas de aislamiento de red sin necesidad de una tercera máquina testigo o una red heartbeat adicional. Obtenga más información sobre [heartbeat, la conmutación por error y el quórum en un clúster](</es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### ¿Cómo supervisar un clúster mirror SafeKit? {#safekit-mirror-cluster-monitoring}


![Consola web SafeKit: supervisión en tiempo real de un clúster mirror de 2 nodos que muestra los estados PRIM y SECOND con replicación de datos activa.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


La **consola de administración SafeKit** ofrece una vista unificada de su infraestructura de alta disponibilidad. Permite a los administradores supervisar el **estado operativo** del clúster y realizar un seguimiento de la sincronización de datos en tiempo real.

Para un clúster mirror de 2 nodos, la consola muestra claramente las funciones de cada servidor:

  * **PRIM (primario):** el nodo activo que ejecuta actualmente la aplicación y gestiona la IP virtual. Realiza escrituras en el almacenamiento local y replicación en tiempo real al nodo secundario.
  * **SECOND (Secundario):** El nodo en espera recibe actualizaciones síncronas a nivel de byte. Está listo para asumir el control al instante si el primario falla.
  * **Estado ALONE:** le avisa visualmente cuando el clúster se está ejecutando en un solo nodo (por ejemplo, durante el mantenimiento o después de una falla), lo que indica que la redundancia se pierde temporalmente.
  * **Progreso de la resincronización:** cuando un nodo fallido se recupera, su estado se vuelve naranja durante la reintegración de datos en segundo plano, lo que garantiza que no haya tiempo de inactividad durante la fase de "regreso a la normalidad".


Más allá de los simples iconos de estado, la interfaz proporciona **una orquestación de conmutación por error con un solo clic** a través del **menú `...`**, lo que le permite reasignar manualmente el rol principal para el mantenimiento planificado, al tiempo que garantiza la disponibilidad continua para la actividad del usuario.

## ¿Cómo funciona un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit con la consola web? {#safekit-farm-cluster}

### ¿Cómo configurar un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#safekit-farm-cluster-configuration}


![Consola web SafeKit: configuración clúster farm para el equilibrio de carga de red y la gestión de IP virtuales.](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


El **clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** está diseñado para ofrecer alta disponibilidad y escalabilidad de los servicios. La configuración se centra en distribuir el tráfico entrante entre ambos nodos simultáneamente:

  * **Servicios con balanceo de carga (pestaña Macros):** defina los servicios de aplicación específicos (por ejemplo, Apache, IIS, Nginx) que se mantendrán activos en todos los nodos.
  * **Red(es) heartbeat:** ruta(s) de comunicación utilizada(s) para detectar si un nodo ha abandonado la <span class="notranslate farm-term" translate="no">farm</span>, lo que desencadena una redistribución inmediata de la carga.
  * **IP virtual (VIP <span class="notranslate farm-term" translate="no">farm</span>):** a diferencia de un clúster mirror, la dirección IP virtual de un clúster <span class="notranslate farm-term" translate="no">farm</span> se comparte entre todos los nodos y un algoritmo de filtrado del kernel distribuye el tráfico de la red.
  * **Reglas de equilibrio de carga:** defina la política de distribución del tráfico en función de la dirección IP o el puerto de origen.
  * **Comprobadores:** supervisan el estado de la aplicación y activan un reinicio automático si se detecta un error en un proceso.


### ¿Cómo supervisar un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#safekit-farm-cluster-monitoring}


![Consola SafeKit: Supervisión de un clúster farm de dos nodos que muestra ambos nodos en estado UP con equilibrio de carga activo.](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


La supervisión de un clúster <span class="notranslate farm-term" translate="no">farm</span> proporciona visibilidad sobre la naturaleza **activa-activa** de la infraestructura, donde todos los nodos contribuyen al rendimiento de la aplicación (mostrando 2 nodos en este ejemplo; escalable a nodos adicionales):

  * **Estado UP (50 % en 2 nodos):** En una <span class="notranslate farm-term" translate="no">farm</span> saludable, ambos nodos están en estado " UP " (50 %), lo que significa que ambos están recibiendo y procesando activamente las solicitudes de los clientes a través de la IP virtual compartida.
  * **Reequilibrio automático:** si un nodo falla, la consola muestra visualmente que el nodo restante toma el 100 % del tráfico. No hay retraso de "conmutación por error", ya que el nodo superviviente ya está activo (aparte de un tiempo de detección de unos pocos segundos).
  * **Inserción de nodo:** cuando se reinicia un nodo reparado, pasa de " STOP " a " UP " y comienza automáticamente a recibir su parte de la carga sin la intervención del administrador.
  * **Sin sincronización de datos:** Tenga en cuenta que en un clúster <span class="notranslate farm-term" translate="no">farm</span> no hay un estado de resincronización naranja, ya que se espera que los nodos no tengan sin estado o compartan una base de datos de backend (que puede protegerse por separado en un clúster mirror).


Más allá de los simples iconos de estado, la interfaz proporciona la gestión de nodos con un solo clic a través del **menú `...`**, lo que le permite detener o iniciar manualmente un nodo para el mantenimiento planificado mientras la IP virtual compartida redistribuye automáticamente el tráfico sin interrumpir la actividad del usuario.

## ¿Cómo supervisar varios módulos y varios clústeres a través de la consola web? {#multipe-modules-clusters}

### Visualización de varios módulos en un único clúster {#safekit-multi-module}


![Consola web SafeKit: 4 módulos de Hyper-V implementados en el mismo clúster de 2 nodos.](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Al implementar **varios módulos** en un único clúster de 2 nodos, la consola web SafeKit proporciona **widgets de supervisión individuales** para cada módulo. Esto es especialmente valioso para las soluciones **SafeKit Hyper-V**. 

**Ejemplo:** En la figura con una configuración de 4 máquinas virtuales protegidas:

  * La consola está conectada al node1, que actúa como proxy para comunicarse con node2.
  * La consola muestra **4 widgets** (uno para cada máquina virtual).
  * Cada máquina virtual se ejecuta en su nodo PRIM y se replica en su nodo SECOND.
  * Los administradores pueden ver en tiempo real qué máquinas virtuales están activas en cada nodo: VM1 y VM2 en node1, VM3 y VM4 en node2.
  * Los administradores pueden migrar fácilmente una máquina virtual de un nodo a otro utilizando el **menú `...`**.


Esta visibilidad granular garantiza que, incluso en entornos de alta densidad, se mantenga el control total y el conocimiento inmediato de cada carga de trabajo replicada. 

### Visualización de múltiples clústeres {#safekit-multi-cluster}


![Consola web SafeKit: 4 clústeres implementados en 8 servidores.](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Al implementar **varios clústeres** en varios servidores, puede usar varias pestañas del navegador para conectarse a cada clúster o utilizar la función PWA (aplicación web progresiva) de la consola. Al usar la PWA, se eliminan los menús de navegación del navegador, lo que ahorra espacio en la pantalla para organizar mejor la supervisión del clúster en el escritorio. 

**Ejemplo:** La figura muestra cuatro consolas PWA que monitorizan cuatro clústeres de videovigilancia ubicados en el norte, sur, oeste y este.

**Nota:** Cuando hay demasiados clústeres para mostrar en un solo escritorio, SafeKit ofrece notificaciones para ayudar a detectar errores en numerosos clústeres. 

## ¿Cómo supervisar las alertas en la consola y gestionar las notificaciones por correo electrónico? {#safekit-notifications-cluster}

### ¿Cómo puedo recibir alertas instantáneas sobre cambios de estado de los módulos y eventos críticos? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

La consola web SafeKit aprovecha las capacidades nativas del navegador para emitir **notificaciones instantáneas** cada vez que se produce un cambio de estado en un módulo. Esto garantiza que los eventos críticos se pongan en su conocimiento de inmediato, incluso cuando la consola se encuentra en una pestaña en segundo plano.

  * **Seguridad:** las notificaciones requieren acceso a través de **HTTPS** o localhost.
  * **Integración de PWA:** instale la consola como una aplicación web progresiva (PWA) en el escritorio o en el móvil para disfrutar de una experiencia similar a la de una aplicación nativa.
  * **Alertas móviles:** En dispositivos móviles, las notificaciones están disponibles exclusivamente a través de la PWA, siendo HTTPS obligatorio.


Este mecanismo alerta a los usuarios de inmediato sobre eventos críticos, lo que mejora el conocimiento oportuno del estado del clúster y reduce los tiempos de respuesta.

### Vídeo SafeKit: Consola en el smartphone (0:54) {#demo-console}


### ¿Cómo puedo configurar alertas de correo electrónico automáticas en SafeKit? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit registra automáticamente todos **los eventos importantes del clúster en los registros del sistema**, lo que permite una integración perfecta con cualquier herramienta de supervisión del mercado. Además, incluye un **agente de notificación por correo electrónico** diseñado para supervisar estos registros y enviar alertas críticas directamente a su bandeja de entrada. Esto garantiza que las partes interesadas permanezcan informadas incluso cuando la consola web no se supervisa activamente. 

  * **Agrupación inteligente:** para reducir el ruido, el agente agrupa los eventos que ocurren en un breve período de tiempo en un único correo electrónico de resumen.
  * **Cobertura total:** el agente se instala en todos los nodos y debe configurarse explícitamente con los detalles de SMTP para habilitarlo.
  * **Destinatarios personalizables:** Dirija las alertas a equipos de TI específicos o a alias de gestión para garantizar una respuesta rápida.


Al combinar las alertas PWA en tiempo real con la agrupación inteligente de correos electrónicos, SafeKit proporciona una estrategia de notificación multicapa para operaciones de misión crítica.

### Vídeo SafeKit: Notificaciones por correo electrónico en caso de conmutación por error (1:04) {#demo-notifications}



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}