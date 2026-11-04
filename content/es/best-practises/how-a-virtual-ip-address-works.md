---
title: "¿Cómo funciona una dirección IP virtual en un clúster de alta disponibilidad?"
canonical: "https://safekit.eviden.com/es/best-practises/how-a-virtual-ip-address-works/"
description: "Cómo SafeKit transfiere una IP virtual en caso de conmutación por error: ARP gratuito en la misma subred, balanceador de carga, CLI en la nube o BGP entre subredes. Por qué es importante una IP virtual local."
category: "best-practises"
lang: "es"
topics: "¿Qué es una dirección IP virtual en un clúster de alta disponibilidad?, Implementación de IP virtual en SafeKit, Cómo funciona una dirección IP virtual en la misma subred (clúster mirror), Cómo funciona una IP virtual en diferentes subredes con un balanceador de carga (clúster mirror), Cómo funciona una IP virtual en diferentes subredes con CLI de proveedores de nube (clúster mirror), Cómo funciona una IP virtual en diferentes subredes con BGP (clúster mirror), Cómo funciona la redirección DNS en diferentes subredes (clúster mirror), Cómo funciona el balanceo de carga de IP virtual en un clúster farm en la misma subred, Cómo funciona una IP virtual con balanceo de carga en diferentes subredes (clúster farm), Comparación: implementación de IP virtual, latencia y transparencia de la aplicación, Preguntas frecuentes sobre IP virtual, 🔍 Explorar SafeKit"
---

# ¿Cómo funciona una dirección IP virtual en un clúster de alta disponibilidad? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## ¿Qué es una dirección IP virtual en un clúster de alta disponibilidad? {#virtual-ip-definition}

Una **dirección IP virtual** es la única dirección que los clientes utilizan para conectarse a una aplicación en un [clúster de alta disponibilidad](</es/>). La IP virtual no está vinculada a un servidor específico. En caso de conmutación por error, se traslada al servidor que ejecuta la aplicación. Los clientes no necesitan modificar su configuración.

**Principio clave en SafeKit:** la IP virtual se **configura localmente en el servidor** que ejecuta la aplicación. La aplicación se inicia en la IP virtual y recibe la IP del cliente original. Por eso, muchas aplicaciones funcionan correctamente con SafeKit sin necesidad de realizar ningún cambio. SafeKit ofrece dos tipos de IP virtual:

  * **Dirección IP virtual principal/de respaldo con clúster mirror :** la dirección IP virtual solo está activa en el servidor principal. En caso de conmutación por error, se traslada al servidor de respaldo.
  * **Balanceo de carga de red con IP virtual en un <span class="notranslate farm-term" translate="no">farm</span> :** la IP virtual está activa en todos los servidores simultáneamente. El tráfico se comparte entre ellos.

## Implementación de IP virtual en SafeKit {#safekit-virtual-ip-implementation}

Este artículo explica cómo SafeKit mueve la IP virtual en cada arquitectura de red:

  * **Misma subred o LAN extendida (clústeres [mirror](#virtual-ip-same-subnet-failover) y [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)):** SafeKit configura la IP virtual en el servidor y envía una **solicitud ARP gratuita (GARP)**. No se requiere hardware externo. Esta es la solución más transparente (todo está implementado por el producto SafeKit).
  * **Subredes diferentes con un balanceador de carga (clústeres [mirror](#virtual-ip-different-subnets-failover) y [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)):** el balanceador de carga utiliza la **comprobación de estado** de SafeKit para enviar el tráfico al servidor correcto (el integrador configura el balanceador de carga).
  * **[Subredes diferentes con CLI de proveedor de nube](#virtual-ip-cloud-cli-failover) (clúster mirror):** el script SafeKit `start_prim` llama a la CLI de la nube para mover la IP virtual (script escrito por el integrador).
  * **[Subredes diferentes con BGP](#virtual-ip-bgp-failover) (clúster mirror):** el servidor principal anuncia la IP virtual a los enrutadores (script escrito por el integrador).
  * **[Subredes distintas con redirección DNS](#virtual-ip-vs-dns-redirection-failover) (clúster mirror):** el script SafeKit `start_prim` cambia el registro DNS del nombre virtual a la IP física del nuevo servidor primario (script escrito por el integrador). No existe una única IP virtual, y este método no es fiable para todos los clientes.

También en este artículo:

  * [Comparación: implementación de IP virtual, latencia y transparencia de la aplicación.](#virtual-ip-methods-comparison)
  * [Preguntas frecuentes sobre IP virtual](#virtual-ip-faq)
  * [🔍 Explora SafeKit](#hub)

![Diagrama comparativo del comportamiento de la IP virtual en Eviden SafeKit: clústeres Mirror que muestran una floating IP en el nodo activo frente a clústeres farm que muestran el equilibrio de carga de red en todos los nodos.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementación de IP virtual para clústeres mirror y <span class="notranslate farm-term" translate="no">farm</span> en SafeKit.**

## Cómo funciona una dirección IP virtual en la misma subred (clúster mirror) {#virtual-ip-same-subnet-failover}

- [Prueba de la dirección IP virtual principal/de respaldo en un clúster mirror de SafeKit.](/es/best-practises/test-primary-backup-vip-mirror/)

### Conmutación por error automática y redireccionamiento de red en una subred local {#automated-failover--network-rerouting-in-a-local-subnet}

En una red local, **SafeKit** gestiona automáticamente la dirección IP virtual y la conmutación por error de la aplicación.

### Clúster mirror local: conmutación por error de 2 nodos en Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mecanismo de conmutación por error de IP virtual SafeKit entre dos servidores en la misma subred.](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

En un **clúster mirror de SafeKit**, los dos nodos se encuentran en la misma subred. La alta disponibilidad utiliza una **IP virtual**. SafeKit gestiona la IP virtual en la pila de red del sistema operativo. No se requiere hardware especial. La IP virtual se agrega a las direcciones IP físicas del Servidor 1 y el Servidor 2 mediante **alias de IP**. Los clientes siempre se conectan a la IP virtual.

#### Alias de IP y múltiples direcciones IP virtuales (VIP) en SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

La IP virtual es una tercera dirección IP que se mueve entre los nodos. SafeKit puede gestionar **varias direcciones IP virtuales** en un clúster. Puede ubicarlas en la misma tarjeta de red o en tarjetas de red diferentes. De esta manera, cada servicio puede usar su propia IP virtual.

#### Mecanismo de conmutación por error: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

La conmutación por error no requiere ninguna acción manual. En funcionamiento normal, la IP virtual está vinculada a la **dirección MAC del Servidor 1 (mac1)**. Si el Servidor 1 falla, SafeKit realiza tres acciones:

  * **Configuración de alias de IP virtual:** SafeKit configura la IP virtual como un alias en la tarjeta de red del Servidor 2, el nuevo servidor principal. A continuación, el sistema operativo envía mensajes a través de la red para anunciar la IP virtual.
  * **GARP:** SafeKit también envía mensajes **ARP gratuitos (GARP)**. Los conmutadores de red y los clientes actualizan su caché ARP. La IP virtual ahora está vinculada a la **dirección MAC del servidor 2 (mac2)**.
  * **Recuperación de la aplicación:** SafeKit reinicia los servicios de la aplicación en el Servidor 2.


#### Centros de datos remotos y VLAN extendidas {#remote-data-centers--extended-vlans}

La **solución de subred compartida descrita anteriormente** también funciona para **la recuperación ante desastres (DR)** entre sitios remotos y suele ser la mejor opción cuando los sitios están conectados por una **LAN extendida o una VLAN extendida**. Ambos sitios se encuentran en la misma subred. La red es más sencilla y no se necesitan protocolos de enrutamiento complejos.

> **⚠️ Nota:** El redireccionamiento en la capa 2 con ARP gratuito es la **solución más transparente** para las aplicaciones. La aplicación recibe la IP del cliente original y la IP virtual se configura localmente. **Muchas aplicaciones necesitan** una IP virtual local. Sin ella, estas aplicaciones **podrían no funcionar correctamente**. En esta configuración de la misma subred, SafeKit implementa todo el mecanismo, por lo que no se requiere ningún trabajo de integración especial.

## Cómo funciona una IP virtual en diferentes subredes con un balanceador de carga (clúster mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga con comprobaciones de estado de SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de conmutación por error de IP virtual mediante un balanceador de carga en dos subredes diferentes.](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Cuando los nodos se encuentran en **subredes diferentes**, el protocolo ARP gratuito no puede transferir la IP virtual. En este caso, la IP virtual se encuentra en un **balanceador de carga**. El balanceador de carga envía el tráfico al servidor principal.

SafeKit proporciona una **URL de verificación de estado** en cada nodo:

  * **Nodo principal (PRIM):** devuelve `HTTP 200 OK`.. El balanceador de carga envía el tráfico a este nodo.
  * **Secundario (SECOND):** devuelve `HTTP 404 NOT FOUND`.. El balanceador de carga no envía tráfico a este nodo.

En caso de conmutación por error, SafeKit modifica las respuestas y el balanceador de carga envía el tráfico al nuevo servidor principal. Esta es la solución estándar entre **zonas de disponibilidad** en [**AWS**](</es/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</es/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) y [**Google Cloud**](</es/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** SafeKit realiza la comprobación de estado. Su red o su proveedor de nube proporciona el balanceador de carga.

### El problema: el balanceador de carga es el propietario de la IP virtual. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Con un balanceador de carga, los clientes se conectan a la IP virtual. El balanceador traduce la IP virtual (NAT) a la **IP física** del servidor principal. El cliente usa la IP virtual, pero el servidor usa su IP física. El servidor no ve la IP virtual.

### Mantenga la IP virtual configurada localmente en el servidor principal. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Algunas aplicaciones utilizan la IP virtual como dirección de servidor. Solo funcionan correctamente si la IP virtual también está **configurada localmente en el servidor principal**. Entonces:

  * Los servicios pueden iniciarse en la IP virtual;
  * El servidor puede acceder a sus propios servicios con la IP virtual;
  * La autenticación funciona con la IP virtual.

**Buenas prácticas:** Utilice un modo de balanceador de carga que mantenga la IP virtual como dirección de destino (por ejemplo, Floating IP o Direct Server Return). A continuación, configure la IP virtual localmente en el servidor principal. El método depende de la subred de la IP virtual.

  * **La IP virtual se encuentra en la misma subred que las direcciones IP físicas de los servidores:** mantenga la sección `<vip>` en el módulo SafeKit. SafeKit configura automáticamente la IP virtual como un alias de la dirección IP física en la tarjeta de red.
  * **La IP virtual se encuentra en una subred diferente:** no configure `<vip>` en SafeKit. Utilice el script `start_prim` para configurar la IP virtual en una interfaz dedicada, como la de bucle invertido, antes de que se inicie la aplicación. Utilice el script `stop_prim` para eliminar la IP virtual una vez que la aplicación se detenga. El integrador escribe estos comandos; SafeKit no los proporciona.


## Cómo funciona una IP virtual en diferentes subredes con las CLI del proveedor de la nube (clúster mirror) {#virtual-ip-cloud-cli-failover}

### Por qué el ARP gratuito no funciona en la nube {#why-gratuitous-arp-does-not-work-in-public-clouds}

Las redes en la nube (AWS, Azure, Google Cloud) **ignoran el ARP gratuito**. Solo envían tráfico a las direcciones IP asignadas en la plataforma en la nube. SafeKit configura la IP virtual en el servidor principal, pero la red en la nube no envía el tráfico de la IP virtual a este servidor.

### Traslado de la IP virtual con la CLI de la nube {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sin un balanceador de carga, la interfaz de línea de comandos (CLI) del proveedor de la nube se puede integrar en el **script `start_prim`** de SafeKit para actualizar la configuración de red de la nube antes de que se inicie la aplicación. La CLI puede asignar la IP virtual al nodo que se convierte en principal o actualizar la ruta de la nube para dirigir el tráfico de IP virtual a ese nodo.

La **IP virtual permanece local** en el servidor principal. **No hay NAT** y la IP original del cliente no cambia.

### Responsabilidad del integrador {#integrator-responsibility}

El **integrador** debe añadir los comandos de la interfaz de línea de comandos (CLI) de la nube al script `start_prim`. Estos comandos **no los proporciona el producto SafeKit**; dependen del proveedor de la nube, del diseño de la red y de las reglas de seguridad del cliente.

### Restricciones {#constraints-of-the-cli-approach}

  * La interfaz de línea de comandos (CLI) de la nube debe estar instalada en ambos nodos. Cada nodo necesita una identidad en la nube con permisos de red.
  * El script debe gestionar los errores y los reintentos.
  * La conmutación por error probablemente sea más lenta que con un balanceador de carga.

## Cómo funciona una IP virtual en diferentes subredes con BGP (clúster mirror) {#virtual-ip-bgp-failover}

### Redireccionamiento de IP virtual con BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Con BGP (Border Gateway Protocol), la IP virtual se configura normalmente en una interfaz de bucle invertido del servidor principal mediante el script `start_prim` antes de que se inicie la aplicación. El servidor principal anuncia la IP virtual a los enrutadores como una ruta /32.

En caso de conmutación por error, el script `stop_prim` del antiguo servidor principal detiene la aplicación, elimina la IP virtual (VIP) de la interfaz de bucle invertido y retira la ruta /32 de los enrutadores. Si el antiguo servidor principal falla, `stop_prim` no se ejecuta, pero los enrutadores pierden la sesión BGP y eliminan la ruta automáticamente.

### Beneficios y requisitos previos {#benefits-and-prerequisites}

  * **La IP virtual permanece local, no hay NAT y la IP del cliente no cambia.**
  * Funciona en diferentes subredes y ubicaciones. No necesita una VLAN extendida.
  * Necesitas enrutadores BGP y la ayuda de tu equipo de red. En la nube, necesitas un servicio de servidor de rutas del proveedor de la nube.

> **⚠️ Nota:** La integración BGP utiliza scripts de SafeKit y su infraestructura de enrutamiento. El **integrador** debe escribir los comandos en los scripts `start_prim` y `stop_prim`. Estos scripts **no los proporciona SafeKit**. Valide la solución con su equipo de red antes de la puesta en producción.

## Cómo funciona la redirección DNS en diferentes subredes (clúster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Redireccionamiento DNS con el script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Con la redirección DNS, **no existe una única IP virtual**. Los clientes se conectan a un **nombre virtual** (el nombre DNS). En caso de conmutación por error, el script `start_prim` del nuevo servidor principal inicia la aplicación y, a continuación, cambia el registro DNS del nombre virtual a la **IP física** del nuevo servidor principal.

El script `stop_prim` no tiene ninguna función. Si el antiguo servidor principal falla, el nuevo servidor principal sobrescribe el registro DNS.

### Ejemplo: Resolución DNS y clientes bloqueados {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagrama que muestra la resolución de nombres DNS a la IP física 1 en un clúster de alta disponibilidad.](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolución DNS y clientes bloqueados en la IP física 1 en un clúster de alta disponibilidad

#### Antes de la conmutación por error: el nombre apunta a la IP física 1 {#current-state-resolution-to-physical-ip-1}

**Los clientes 1** y **2** solicitan al sistema DNS la dirección IP del nombre virtual. El sistema DNS devuelve **la IP física 1.** A continuación, los clientes abren una conexión de red a esta dirección.

#### Después de la conmutación por error: el nombre apunta a la IP física 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

El servidor 1 falla. El script `start_prim` en el servidor 2 cambia el registro DNS a **la IP física 2.** Los clientes se conectan a la IP física 2 solo si se cumplen todas estas condiciones:

  * El **TTL (Tiempo de vida)** ha expirado en todos los servidores DNS entre el cliente y el registro DNS.
  * La caché DNS local del Cliente 1 y del Cliente 2 está vacía.
  * La aplicación cierra su conexión y realiza una *nueva* consulta DNS.

Si una de las condiciones no se cumple, **el Cliente 1 y el Cliente 2 permanecen bloqueados** en la IP física 1. El servicio no está disponible, incluso si el registro DNS es correcto.

### Límites y requisitos previos {#the-two-black-boxes-of-dns-redirection}

  * **Caché DNS:** Muchos proveedores de servicios de Internet y servidores DNS de empresas ignoran los valores TTL cortos. Pueden mantener la antigua dirección IP física 1 durante minutos u horas.
  * **Comportamiento de la aplicación:** Muchas aplicaciones (por ejemplo, servicios Java o navegadores web) realizan una consulta DNS solo una vez, al iniciarse. Siguen utilizando la primera dirección IP.
  * **La dirección IP cambia en cada conmutación por error:** la aplicación no tiene una IP virtual local que permanezca igual. Es posible que las aplicaciones que registran su propia dirección IP no funcionen.
  * **Requisitos previos:** un TTL corto en el registro DNS (por ejemplo, de 30 a 60 segundos) y permisos para actualizar la zona DNS desde ambos servidores.

> **⚠️ Nota:** El **integrador** debe escribir los comandos de actualización de DNS en el script `start_prim`. Estos comandos **no los proporciona el producto SafeKit**. Dependen del servidor DNS (DNS de Windows, BIND o DNS en la nube).

### Conclusión {#conclusion}

La redirección DNS no es una solución fiable de alta disponibilidad. Úsela solo si todos los clientes realizan una nueva consulta DNS al reconectarse. Para una conmutación por error inmediata y transparente, utilice una **IP virtual** : en una LAN extendida, con un balanceador de carga, con las interfaces de línea de comandos del proveedor de la nube o con BGP.

## Cómo funciona el balanceo de carga de IP virtual en un clúster <span class="notranslate farm-term" translate="no">farm</span> en la misma subred {#virtual-ip-load-balancing-same-subnet}

- [Prueba de la dirección IP virtual de equilibrio de carga en un clúster farm SafeKit.](/es/best-practises/test-load-balancing-vip-farm/)

### Balanceo de carga en el núcleo, con redundancia. {#scalable-performance-kernel-level-load-balancing--redundancy}

Cuando hay mucho tráfico, SafeKit puede distribuir la carga de trabajo entre varios servidores activos. Si un servidor falla, los demás siguen funcionando.

### Arquitectura de clúster <span class="notranslate farm-term" translate="no">Farm</span> : equilibrio de carga entre nodos Windows o Linux. {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagrama de una IP virtual con balanceo de carga dentro de la misma subred.](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

En un **clúster <span class="notranslate farm-term" translate="no">farm</span> de balanceo de carga**, los clientes se conectan a una IP virtual y las solicitudes se comparten entre varios servidores simultáneamente. Este ejemplo muestra dos nodos. Se pueden agregar más nodos al clúster. En la misma subred, la IP virtual se configura con alias de IP en la tarjeta de red de **cada servidor** del clúster.

#### Compartición de tráfico: el filtro del kernel {#traffic-distribution-the-kernel-level-filter}

En un clúster <span class="notranslate farm-term" translate="no">farm</span>, un **filtro SafeKit en el kernel** comparte el tráfico. Funciona de la siguiente manera:

  * **Mapeo ARP:** En la caché ARP de los clientes, la IP virtual está vinculada a una dirección MAC (por ejemplo, `mac1` del Servidor 1).
  * **Análisis de paquetes:** El servidor 1 recibe los paquetes. El filtro del kernel de SafeKit lee la **dirección IP del cliente** o el **puerto TCP** de cada paquete.
  * **Reparto de carga:** El filtro decide qué paquetes procesa el Servidor 1 y cuáles se envían a los demás nodos (por ejemplo, al Servidor 2). Para enviar un paquete a otro nodo, el filtro reemplaza la **dirección MAC de destino** del paquete con la dirección MAC de dicho nodo. La dirección IP de destino permanece como IP virtual. El trabajo se comparte entre los servidores.


#### Conmutación por error y redireccionamiento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Si el servidor 1 falla, SafeKit envía un mensaje **ARP gratuito (GARP)**. Los clientes actualizan su caché ARP con `mac2` del servidor 2. A continuación, los clientes se conectan inmediatamente a los demás nodos de la farm.

#### Despliegue en sitios remotos {#deployment-in-remote-sites}

Esta solución de balanceo de carga también funciona entre **centros de datos remotos**, siempre que los sitios estén conectados mediante una **LAN o VLAN extendida**. En ese caso, todos los sitios se encuentran en la misma subred. Esta es la configuración más eficiente para clústeres <span class="notranslate farm-term" translate="no">farm</span> en varios sitios.

{{%  insert-safekit-farm-video-es  %}}

## Cómo funciona una IP virtual con balanceo de carga en diferentes subredes (clúster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Tráfico a través de subredes en la nube {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un clúster <span class="notranslate farm-term" translate="no">farm</span> puede compartir el trabajo de la aplicación entre varias zonas de disponibilidad y subredes.

### Clústeres <span class="notranslate farm-term" translate="no">farm</span> entre subredes: varios nodos Windows o Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagrama de un clúster farm con balanceo de carga que opera en dos subredes diferentes.](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Cuando los nodos <span class="notranslate farm-term" translate="no">farm</span> de servidores se encuentran en **subredes diferentes** (por ejemplo, en varias zonas de disponibilidad de la nube), la **IP virtual** se ubica en un **balanceador de carga externo (LB)**. El balanceador de carga envía el tráfico a las direcciones IP físicas de los servidores en cada subred.

#### Reglas de enrutamiento de tráfico y equilibrio de carga {#intelligent-traffic-routing--load-balancing-rules}

El balanceador de carga comparte las solicitudes de los clientes con dos criterios:

  * **Reglas de equilibrio de carga:** por ejemplo, la **dirección IP del cliente** o el **puerto TCP del cliente**.
  * **Disponibilidad de nodos:** el balanceador de carga envía el tráfico únicamente a los nodos que están en buen estado, según la comprobación de estado de SafeKit.


> **⚠️ Nota:** SafeKit realiza la comprobación de estado. Su red o su proveedor de nube proporciona el balanceador de carga.

#### Control de salud SafeKit {#safekit-health-check-mechanism}

SafeKit proporciona una **URL de verificación de estado** en cada servidor de la <span class="notranslate farm-term" translate="no">farm</span>. El balanceador de carga la lee para conocer el estado de cada servidor:

  * **Nodo ACTIVO:** la comprobación de estado devuelve `HTTP 200 OK`.. El balanceador de carga envía el tráfico a este servidor.
  * **Nodo caído:** si un servidor o una aplicación falla, SafeKit devuelve el error `HTTP 404 NOT FOUND` (o el servidor no responde). El balanceador de carga deja de enviar tráfico a este nodo inmediatamente.


#### Implementación en la nube: AWS, Azure y GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta es la arquitectura estándar para **clústeres <span class="notranslate farm-term" translate="no">farm</span> en la nube**. Si una subred o una zona deja de funcionar, los demás nodos continúan procesando el tráfico. Es compatible con [**Amazon AWS**](</es/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</es/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) y [**Google Cloud (GCP)**](</es/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Comparación: implementación de IP virtual, latencia y transparencia de la aplicación. {#virtual-ip-methods-comparison}

**Comparación de métodos de redirección de IP virtual y redirección DNS para alta disponibilidad y recuperación ante desastres.**

Entorno y caso de uso | Tipo de alta disponibilidad | Método de redirección | Implementado por | Latencia de red | Transparencia de la aplicación y propiedad intelectual local  
---|---|---|---|---|---  
Principal/de respaldo (alta disponibilidad) | cúmulo Mirror | Adquisición gratuita de ARP/MAC | ✅ Producto SafeKit | Muy bajo: tiempo para detectar el fallo y enviar el GARP | Transparencia total: la IP virtual es local en el nodo activo. La IP del cliente no cambia.  
Balanceo de carga (activo/activo) | Grupo <span class="notranslate farm-term" translate="no">Farm</span> | Filtro de red del kernel / GARP | ✅ Producto SafeKit | Muy bajo: tiempo para detectar el fallo y cambiar los filtros de red. | Transparencia total: la IP virtual es local en todos los nodos. La IP del cliente no cambia.  
Misma subred / LAN extendida (VLAN extendida) | Recuperación ante desastres (centros de datos remotos) | Alias de IP / GARP | ✅ Producto SafeKit (la VLAN extendida la proporciona el equipo de red) | Bajo: depende del tiempo de ida y vuelta (RTT) de la VLAN extendida. | Transparencia total: la IP virtual es local en los nodos. La IP del cliente no cambia.  
Subredes diferentes: solo balanceador de carga | Recuperación ante desastres (centros de datos remotos / nube) | Balanceador de carga externo | 🛠️ Integrador: configuración del balanceador de carga (SafeKit proporciona la comprobación de estado) | Medio: depende del intervalo de comprobación de estado del balanceador de carga. | ⚠️ Transparencia parcial si se utiliza SNAT/DNAT. La IP virtual **NO** es local en los nodos. La IP del cliente **NO** debe conservarse. La aplicación debe ser compatible con esto.  
Subredes diferentes: balanceador de carga + IP virtual local de SafeKit | Recuperación ante desastres (centros de datos remotos / nube) | Balanceador de carga externo con Floating IP / Direct Server Return | 🛠️ Integrador: configuración del balanceador de carga (SafeKit proporciona la comprobación de estado) | Medio: depende del intervalo de comprobación de estado del balanceador de carga. | Buena transparencia: la IP virtual es local en el nodo principal y es la dirección de destino.
Subredes diferentes: interfaz de línea de comandos de la nube | Recuperación ante desastres (nube) | API de la nube: la IP privada o una ruta de la nube se mueven a la nueva principal. | 🛠️ Integrador: comandos CLI de la nube en el script `start_prim` | De medio a alto: depende del tiempo de respuesta de la API en la nube. | Transparencia total: la IP virtual es local en el nodo principal. La IP del cliente no cambia.
Subredes diferentes: BGP | Recuperación ante desastres (centros de datos remotos / nube) | Ruta /32 anunciada con BGP | 🛠️ Integrador: Comandos BGP en los scripts `start_prim` y `stop_prim` | De bajo a medio: depende del tiempo de convergencia de BGP. | Transparencia total: la IP virtual es local en el nodo principal. La IP del cliente no cambia. Requiere enrutadores BGP.  
Redirección DNS: no hay IP virtual | Recuperación ante desastres (centros de datos remotos) | Cambio de registro DNS (nombre / IP física) | 🛠️ Integrador: comandos de actualización de DNS en el script `start_prim` | Alto y no predecible: depende del TTL (tiempo de vida) del DNS y de la caché DNS del cliente. | ⚠️ No es fiable: el cliente debe realizar una nueva consulta DNS. A menudo, los clientes conservan la antigua IP que recibieron al iniciarse y no se les redirige tras la conmutación por error.  
  
## Preguntas frecuentes sobre IP virtual {#virtual-ip-faq}

### IP virtual y redes {#virtual-ip--networking}

¿Qué es una IP virtual y en qué se diferencia de una IP física?

Una **dirección IP física** está vinculada a una tarjeta de red. Una **IP virtual** no está vinculada a ningún hardware. En un clúster SafeKit, los clientes siempre utilizan la IP virtual. Si el servidor principal falla, la IP virtual se transfiere automáticamente a un nodo en buen estado. No es necesario modificar la configuración del cliente.

¿Necesito un balanceador de carga de hardware para usar una IP virtual?

No. **SafeKit** gestiona la IP virtual mediante software. En la misma subred, utiliza **alias de IP** y **ARP gratuito (GARP)** para redirigir el tráfico. No se necesita un balanceador de carga externo ni un servidor proxy.

¿Qué es el ARP gratuito (GARP) y por qué se utiliza?

**El ARP gratuito (GARP)** es un mensaje de red que se envía a todos los dispositivos. Actualiza las tablas ARP de los conmutadores y enrutadores. En caso de conmutación por error, el nuevo servidor principal envía un mensaje GARP. Este mensaje indica que la **IP virtual** ahora está vinculada a la dirección MAC del nuevo servidor principal. El tráfico se redirige inmediatamente.

¿Puedo asociar un nombre DNS a una IP virtual?

**Sí.** Cree un registro A estándar para la IP virtual. La redirección se realiza a **nivel de IP virtual** (con ARP o redirección de red), **no a nivel de DNS**. No tendrá retrasos de DNS ni problemas de TTL, y la conmutación por error permanece **transparente para la aplicación**.

### Nube y arquitecturas avanzadas {#cloud--advanced-architectures}

¿Cómo funciona una IP virtual en la nube (AWS, Azure, GCP)?

En la nube, los mensajes GARP de capa 2 no están disponibles para redirigir una IP virtual. SafeKit funciona con **balanceadores de carga en la nube** (AWS ELB, Azure LB o Google GCLB). SafeKit proporciona una **URL de verificación de estado**. El balanceador de carga la lee y envía el tráfico al nodo activo.

¿Es una LAN extendida mejor que un balanceador de carga para la recuperación ante desastres?

**Sí**. Entre centros de datos remotos, una **LAN extendida (VLAN extendida)** suele ser mejor porque la conmutación por error es **transparente para la aplicación**. La **IP virtual no cambia**, por lo que la aplicación y sus clientes siguen utilizando la misma dirección tras una conmutación por error entre centros de datos.

¿Cuáles son las limitaciones de la redirección DNS en comparación con una IP virtual?

**La redirección DNS** depende del **TTL (Tiempo de Vida)** y de la caché DNS del cliente. La recuperación puede tardar horas. Además, **los clientes que no realizan una nueva consulta DNS permanecen bloqueados** en el servidor que falló. Una **IP virtual** se redirige inmediatamente mediante mensajes GARP en la capa 2. La caché DNS del cliente no tiene ningún efecto.

### Transparencia y seguridad {#transparency--security}

¿Por qué es importante una IP virtual local para la transparencia de las aplicaciones?

Con una **IP virtual** local, la aplicación utiliza una dirección que no cambia. SafeKit realiza la redirección en el **kernel**. La aplicación no percibe la conmutación por error. Con DNAT, la dirección utilizada por la aplicación cambia.

¿Una IP virtual conserva la dirección IP original del cliente?

Sí. SafeKit no utiliza NAT de origen (SNAT). La IP virtual es local en el servidor activo, por lo que la aplicación recibe la **IP original del cliente**. Esto es importante para las auditorías de seguridad, la persistencia de la sesión y los registros reglamentarios.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
