---
title: "¿Cómo funciona una dirección IP virtual en un clúster de alta disponibilidad?"
canonical: "https://safekit.eviden.com/es/best-practises/how-a-virtual-ip-address-works/"
description: "Descubra cómo SafeKit mueve una IP virtual durante una conmutación por error: mediante GARP, balanceadores de carga, CLI de nube o BGP."
category: "best-practises"
lang: "es"
topics: "¿Qué es una dirección IP virtual en un clúster de alta disponibilidad?, Implementación de la dirección IP virtual en SafeKit, Cómo funciona una dirección IP virtual en la misma subred (clúster Mirror), Cómo funciona una dirección IP virtual entre distintas subredes con un balanceador de carga (clúster Mirror), Cómo funciona una dirección IP virtual entre distintas subredes con las CLI de proveedores de nube (clúster Mirror), Cómo funciona una dirección IP virtual entre distintas subredes con BGP (clúster Mirror), Cómo funciona el redireccionamiento DNS entre distintas subredes (clúster Mirror), Cómo funciona el balanceo de carga de una IP virtual en un clúster Farm en la misma subred, Balanceo de carga de una IP virtual entre distintas subredes (clúster Farm), Comparación de la implementación, la latencia y la transparencia de las aplicaciones, Preguntas frecuentes sobre la IP virtual, 🔍 Explorar SafeKit"
---

# ¿Cómo funciona una dirección IP virtual en un clúster de alta disponibilidad? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## ¿Qué es una dirección IP virtual en un clúster de alta disponibilidad? {#virtual-ip-definition}

Una **dirección IP virtual** es la dirección única que utilizan los clientes para conectarse a una aplicación en un [clúster de alta disponibilidad](</es/>). No está vinculada a un servidor concreto. Durante una conmutación por error, se mueve al servidor que ejecuta la aplicación. Los clientes no tienen que modificar su configuración.

**Principio clave de SafeKit:** la dirección IP virtual se **configura localmente en el servidor** que ejecuta la aplicación. La aplicación se inicia con esa dirección y recibe la dirección IP original del cliente. Por eso muchas aplicaciones funcionan correctamente con SafeKit sin cambios. SafeKit ofrece dos tipos de direcciones IP virtuales:

  * **Dirección IP virtual primaria/secundaria en un clúster Mirror:** la dirección IP virtual solo está activa en el servidor primario. Durante una conmutación por error, pasa al servidor secundario.
  * **Dirección IP virtual con balanceo de carga de red en un clúster <span class="notranslate farm-term" translate="no">farm</span>:** la dirección IP virtual está activa simultáneamente en todos los servidores. El tráfico se distribuye entre ellos.

## Implementación de la dirección IP virtual en SafeKit {#safekit-virtual-ip-implementation}

Este artículo explica cómo SafeKit mueve la dirección IP virtual según cada arquitectura de red:

  * **Misma subred o LAN extendida ([Mirror](#virtual-ip-same-subnet-failover) y clústeres [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet)):** SafeKit configura la dirección IP virtual en el servidor y envía un **ARP gratuito (GARP)**. No se necesita hardware externo. Es la solución más transparente, ya que SafeKit implementa todo el mecanismo.
  * **Subredes distintas con un balanceador de carga (clústeres [Mirror](#virtual-ip-different-subnets-failover) y [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets)):** el balanceador utiliza la **comprobación de estado de SafeKit** para enviar el tráfico al servidor adecuado. El integrador configura el balanceador.
  * **[Subredes distintas con las CLI de proveedores de nube](#virtual-ip-cloud-cli-failover) (clúster Mirror):** el script `start_prim` de SafeKit llama a la CLI de la nube para mover la dirección IP virtual. El integrador escribe el script.
  * **[Subredes distintas con BGP](#virtual-ip-bgp-failover) (clúster Mirror):** el servidor primario anuncia la dirección IP virtual a los routers. El integrador escribe el script.
  * **[Subredes distintas con redireccionamiento DNS](#virtual-ip-vs-dns-redirection-failover) (clúster Mirror):** el script `start_prim` de SafeKit cambia el registro DNS del nombre virtual para que apunte a la dirección IP física del nuevo servidor primario. El integrador escribe el script. No existe una única dirección IP virtual y este método no es fiable para todos los clientes.

En este artículo:

  * [Comparación de la implementación, la latencia y la transparencia de las aplicaciones](#virtual-ip-methods-comparison)
  * [Preguntas frecuentes sobre la dirección IP virtual](#virtual-ip-faq)
  * [🔍 Explorar SafeKit](#hub)

![Comparación del comportamiento de las direcciones IP virtuales en Evidian SafeKit: una IP flotante en el nodo activo de los clústeres Mirror y balanceo de carga de red en todos los nodos de los clústeres Farm.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementación de direcciones IP virtuales en clústeres Mirror y <span class="notranslate farm-term" translate="no">Farm</span> con SafeKit.**

## Cómo funciona una dirección IP virtual en la misma subred (clúster Mirror) {#virtual-ip-same-subnet-failover}

- [Probar la dirección IP virtual primaria/secundaria en un clúster Mirror de SafeKit](/es/best-practises/test-primary-backup-vip-mirror/)

### Conmutación por error automática y redireccionamiento de red en una subred local {#automated-failover--network-rerouting-in-a-local-subnet}

En una red local, **SafeKit** gestiona automáticamente la dirección IP virtual y la conmutación por error de la aplicación.

### Clúster Mirror local: conmutación por error de dos nodos en Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Mecanismo de conmutación por error de la IP virtual de SafeKit entre dos servidores en la misma subred](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

En un **clúster Mirror de SafeKit**, los dos nodos están en la misma subred. La alta disponibilidad utiliza una **dirección IP virtual**. SafeKit la gestiona en la pila de red del sistema operativo. No se necesita hardware especial. La dirección IP virtual se añade a las direcciones IP físicas de los servidores 1 y 2 mediante **aliasado de IP**. Los clientes siempre se conectan a la dirección IP virtual.

#### Aliasado de IP y compatibilidad con varias direcciones IP virtuales (VIP) en SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

La dirección IP virtual es una tercera dirección IP que se mueve entre los nodos. SafeKit puede gestionar **varias direcciones IP virtuales** en un mismo clúster. Se pueden configurar en la misma tarjeta de red o en tarjetas distintas. Así, cada servicio puede tener su propia dirección IP virtual.

#### Mecanismo de conmutación por error: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

La conmutación por error no requiere ninguna intervención manual. En funcionamiento normal, la dirección IP virtual está asociada a la **dirección MAC del servidor 1 (mac1)**. Si el servidor 1 falla, SafeKit realiza tres acciones:

  * **Aliasado de la dirección IP virtual:** SafeKit configura la dirección IP virtual como alias en la tarjeta de red del servidor 2, que pasa a ser el nuevo servidor primario. A continuación, el sistema operativo envía mensajes a la red para anunciar la dirección IP virtual.
  * **GARP:** SafeKit también envía mensajes de **ARP gratuito (GARP)**. Los switches de red y los clientes actualizan su caché ARP. La dirección IP virtual queda asociada a la **dirección MAC del servidor 2 (mac2)**.
  * **Recuperación de la aplicación:** SafeKit reinicia los servicios de la aplicación en el servidor 2.

#### Centros de datos remotos y VLAN extendidas {#remote-data-centers--extended-vlans}

La **solución en la misma subred descrita anteriormente** también sirve para la **recuperación ante desastres (DR)** entre sitios remotos. Suele ser la mejor opción cuando los sitios están conectados mediante una **LAN extendida o una VLAN extendida**. Ambos sitios se encuentran así en una única subred. Esto simplifica la red y evita protocolos de enrutamiento complejos.

> **⚠️ Nota:** el redireccionamiento de capa 2 mediante ARP gratuito es la **solución más transparente** para las aplicaciones. La aplicación recibe la dirección IP original del cliente y la dirección IP virtual está configurada localmente. **Muchas aplicaciones necesitan** una dirección IP virtual local. Sin ella, **puede que no funcionen correctamente**. En esta configuración de la misma subred, SafeKit implementa todo el mecanismo, por lo que no se requiere una integración especial.

## Cómo funciona una dirección IP virtual entre distintas subredes con un balanceador de carga (clúster Mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga con comprobaciones de estado de SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de una conmutación por error de una dirección IP virtual mediante un balanceador de carga entre dos subredes distintas](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Cuando los nodos están en **subredes distintas**, el ARP gratuito no puede mover la dirección IP virtual. En ese caso, la dirección IP virtual está en un **balanceador de carga**, que envía el tráfico al servidor primario.

SafeKit proporciona una **URL de comprobación de estado** en cada nodo:

  * **Primario (PRIM):** devuelve `HTTP 200 OK`. El balanceador envía tráfico a este nodo.
  * **Secundario (SECOND):** devuelve `HTTP 404 NOT FOUND`. El balanceador no envía tráfico a este nodo.

Durante una conmutación por error, SafeKit modifica las respuestas y el balanceador envía el tráfico al nuevo servidor primario. Esta es la solución estándar entre **zonas de disponibilidad** en [**AWS**](</es/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</es/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) y [**Google Cloud**](</es/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** SafeKit proporciona la comprobación de estado. El balanceador de carga lo proporciona su red o su proveedor de nube.

### El problema: el balanceador de carga posee la dirección IP virtual {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Cuando solo se utiliza un balanceador de carga, los clientes se conectan a la dirección IP virtual. El balanceador la traduce mediante NAT a la **dirección IP física** del servidor primario. El cliente utiliza la dirección virtual, pero el servidor utiliza su dirección física: no ve la dirección IP virtual.

### Mantener la dirección IP virtual configurada localmente en el servidor primario {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Algunas aplicaciones utilizan la dirección IP virtual como dirección del servidor. Solo funcionan correctamente si esa dirección también está **configurada localmente en el servidor primario**. Así:

  * los servicios pueden iniciarse en la dirección IP virtual;
  * el servidor puede acceder a sus propios servicios mediante esa dirección;
  * la autenticación funciona con esa dirección.

**Recomendación:** utilice un modo de balanceador que conserve la dirección IP virtual como dirección de destino (por ejemplo, Floating IP o Direct Server Return). Después, configure la dirección IP virtual localmente en el servidor primario. El método depende de la subred a la que pertenezca la dirección IP virtual:

  * **La dirección IP virtual está en la misma subred que las direcciones IP físicas de los servidores:** conserve la sección `<vip>` en el módulo SafeKit. SafeKit configura automáticamente la dirección IP virtual como alias en la tarjeta de red asociada a la dirección IP física.
  * **La dirección IP virtual está en una subred distinta:** no configure `<vip>` en SafeKit. Utilice el script `start_prim` para configurar la dirección IP virtual en una interfaz dedicada, como loopback, antes de iniciar la aplicación. Utilice `stop_prim` para eliminarla después de detener la aplicación. El integrador escribe estos comandos; no se incluyen en el producto SafeKit.

## Cómo funciona una dirección IP virtual entre distintas subredes con las CLI de proveedores de nube (clúster Mirror) {#virtual-ip-cloud-cli-failover}

### Por qué el ARP gratuito no funciona en la nube {#why-gratuitous-arp-does-not-work-in-public-clouds}

Las redes de nube (AWS, Azure y Google Cloud) **ignoran el ARP gratuito**. Solo envían tráfico a las direcciones IP asignadas en la plataforma de nube. SafeKit configura la dirección IP virtual en el servidor primario, pero la red de nube no dirige el tráfico de esa dirección a ese servidor.

### Mover la dirección IP virtual con la CLI de nube {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sin un balanceador de carga, la CLI del proveedor de nube se puede integrar en el script **`start_prim`** de SafeKit para actualizar la configuración de red de la nube antes de iniciar la aplicación. La CLI puede asignar la dirección IP virtual al nodo que pasa a ser primario o actualizar la ruta de nube para dirigir el tráfico de esa dirección a dicho nodo.

La **dirección IP virtual permanece local** en el servidor primario. **No hay NAT** y la dirección IP original del cliente no cambia.

### Responsabilidad del integrador {#integrator-responsibility}

El **integrador** debe añadir los comandos de la CLI de nube al script `start_prim`. Estos comandos **no los proporciona el producto SafeKit**. Dependen del proveedor de nube, del diseño de red y de las reglas de seguridad del cliente.

### Limitaciones {#constraints-of-the-cli-approach}

  * La CLI de nube debe estar instalada en ambos nodos. Cada nodo necesita una identidad de nube con los permisos de red necesarios.
  * El script debe gestionar los errores y los reintentos.
  * La conmutación por error probablemente sea más lenta que con un balanceador de carga.

## Cómo funciona una dirección IP virtual entre distintas subredes con BGP (clúster Mirror) {#virtual-ip-bgp-failover}

### Redireccionamiento de la dirección IP virtual con BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Con **BGP (Border Gateway Protocol)**, el script `start_prim` suele configurar la dirección IP virtual en una interfaz loopback del servidor primario antes de iniciar la aplicación. A continuación, el servidor primario anuncia la VIP a los routers como una ruta /32.

Durante una conmutación por error, el script `stop_prim` del antiguo servidor primario detiene la aplicación, elimina la VIP de la interfaz loopback y retira la ruta /32 de los routers. Si el antiguo servidor primario se bloquea, `stop_prim` no se ejecuta, pero los routers pierden la sesión BGP y eliminan la ruta automáticamente.

### Ventajas y requisitos previos {#benefits-and-prerequisites}

  * **La dirección IP virtual permanece local, no hay NAT y la dirección IP del cliente no cambia.**
  * Funciona entre subredes y sitios. No se necesita una VLAN extendida.
  * Se necesitan routers BGP y la colaboración del equipo de red. En la nube, se necesita un servicio de servidor de rutas del proveedor.

> **⚠️ Nota:** la integración BGP utiliza scripts de SafeKit y su infraestructura de enrutamiento. El **integrador** debe escribir los comandos en los scripts `start_prim` y `stop_prim`. Estos scripts **no los proporciona el producto SafeKit**. Valide la solución con su equipo de red antes de ponerla en producción.

## Cómo funciona el redireccionamiento DNS entre distintas subredes (clúster Mirror) {#virtual-ip-vs-dns-redirection-failover}

### Redireccionamiento DNS con el script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Con el redireccionamiento DNS, **no existe una única dirección IP virtual**. Los clientes se conectan a un **nombre virtual** (el nombre DNS). Durante una conmutación por error, el script `start_prim` del nuevo servidor primario inicia la aplicación y después cambia el registro DNS del nombre virtual para que apunte a la **dirección IP física** del nuevo servidor primario.

El script `stop_prim` no tiene que hacer nada. Si el antiguo servidor primario falla, el nuevo servidor primario sobrescribe el registro DNS.

### Ejemplo: resolución DNS y clientes bloqueados {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagrama que muestra la resolución de un nombre DNS a la dirección IP física 1 en un clúster de alta disponibilidad](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

Resolución DNS: clientes bloqueados en la dirección IP física 1 en un clúster de alta disponibilidad.

#### Antes de la conmutación por error: el nombre apunta a la dirección IP física 1 {#current-state-resolution-to-physical-ip-1}

El **cliente 1** y el **cliente 2** solicitan al sistema DNS la dirección IP del nombre virtual. El sistema DNS devuelve la **dirección IP física 1**. Después, los clientes abren una conexión de red con esa dirección.

#### Después de la conmutación por error: el nombre apunta a la dirección IP física 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

El servidor 1 falla. El script `start_prim` del servidor 2 cambia el registro DNS a la **dirección IP física 2**. Los clientes solo podrán conectarse a esa dirección si se cumplen todas estas condiciones:

  * Ha vencido el **TTL (Time to Live)** en todos los servidores DNS entre el cliente y el registro DNS.
  * La caché DNS local de los clientes 1 y 2 está vacía.
  * La aplicación cierra su conexión y realiza una **nueva** consulta DNS.

Si una sola condición no se cumple, los **clientes 1 y 2 siguen bloqueados** en la dirección IP física 1. El servicio no está disponible aunque el registro DNS sea correcto.

### Límites y requisitos previos {#the-two-black-boxes-of-dns-redirection}

  * **Caché DNS:** muchos proveedores de Internet y servidores DNS corporativos ignoran los TTL cortos. Pueden conservar la antigua dirección IP física 1 durante minutos u horas.
  * **Comportamiento de la aplicación:** muchas aplicaciones, por ejemplo, servicios Java o navegadores web, solo consultan el DNS al iniciarse. Siguen utilizando la primera dirección IP.
  * **La dirección IP cambia en cada conmutación por error:** la aplicación no dispone de una dirección IP virtual local y permanente. Es posible que las aplicaciones que registran su propia dirección IP no funcionen.
  * **Requisitos previos:** un TTL corto para el registro DNS (por ejemplo, de 30 a 60 segundos) y permisos para actualizar la zona DNS desde ambos servidores.

> **⚠️ Nota:** el **integrador** debe escribir los comandos de actualización DNS en el script `start_prim`. Estos comandos **no los proporciona el producto SafeKit** y dependen del servidor DNS (Windows DNS, BIND o DNS de nube).

### Conclusión {#conclusion}

El redireccionamiento DNS no es una solución fiable de alta disponibilidad. Utilícelo solo si todos los clientes realizan una nueva consulta DNS al volver a conectarse. Para una conmutación por error inmediata y transparente, utilice una **dirección IP virtual**: mediante una LAN extendida, un balanceador de carga, las CLI de proveedores de nube o BGP.

## Cómo funciona el balanceo de carga de una dirección IP virtual en la misma subred (clúster Farm) {#virtual-ip-load-balancing-same-subnet}

- [Probar el balanceo de carga de una dirección IP virtual en un clúster Farm de SafeKit](/es/best-practises/test-load-balancing-vip-farm/)

### Balanceo de carga en el kernel con redundancia {#scalable-performance-kernel-level-load-balancing--redundancy}

Cuando hay mucho tráfico, SafeKit puede repartir la carga de trabajo entre varios servidores activos. Si uno falla, los demás siguen funcionando.

### Arquitectura de clúster Farm: balanceo de carga entre nodos Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagrama de una dirección IP virtual con balanceo de carga en la misma subred](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

En un **clúster Farm con balanceo de carga**, los clientes se conectan a una dirección IP virtual y sus solicitudes se distribuyen simultáneamente entre varios servidores. Este ejemplo muestra dos nodos. Se pueden añadir más nodos al clúster. En la misma subred, la dirección IP virtual se configura mediante aliasado de IP en la tarjeta de red de **cada servidor** del clúster.

#### Distribución del tráfico: el filtro del kernel {#traffic-distribution-the-kernel-level-filter}

En un clúster <span class="notranslate farm-term" translate="no">Farm</span>, un **filtro en el kernel** de SafeKit distribuye el tráfico. El proceso es el siguiente:

  * **Asignación ARP:** en la caché ARP de los clientes, la dirección IP virtual está asociada a una dirección MAC (por ejemplo, `mac1` del servidor 1).
  * **Análisis de paquetes:** el servidor 1 recibe los paquetes. El filtro del kernel de SafeKit lee la **dirección IP del cliente** o el **puerto TCP** de cada paquete.
  * **Distribución de carga:** el filtro decide qué paquetes procesa el servidor 1 y cuáles se envían a otros nodos, por ejemplo, al servidor 2. Para enviar un paquete a otro nodo, el filtro sustituye la **dirección MAC de destino** por la dirección MAC de ese nodo. La dirección IP de destino sigue siendo la dirección IP virtual. Así se distribuye el trabajo entre los servidores.

#### Conmutación por error y redireccionamiento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Si el servidor 1 falla, SafeKit envía un mensaje de **ARP gratuito (GARP)**. Los clientes actualizan su caché ARP con `mac2`, la dirección MAC del servidor 2. A continuación, el tráfico se dirige inmediatamente a los demás nodos Farm.

#### Despliegue en sitios remotos {#deployment-in-remote-sites}

Esta solución de balanceo de carga también funciona entre **centros de datos remotos**, si los sitios están conectados mediante una **LAN extendida o VLAN**. Todos los sitios se encuentran entonces en la misma subred. Esta es la configuración más eficiente para clústeres <span class="notranslate farm-term" translate="no">Farm</span> distribuidos en varios sitios.

{{%  insert-safekit-farm-video-es  %}}

## Balanceo de carga de una dirección IP virtual entre distintas subredes (clúster Farm) {#virtual-ip-load-balancing-different-subnets}

### Tráfico entre subredes de nube {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un clúster <span class="notranslate farm-term" translate="no">Farm</span> puede distribuir la carga de la aplicación entre varias zonas de disponibilidad y subredes.

### Clústeres Farm entre subredes: varios nodos Windows o Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagrama de un clúster Farm con balanceo de carga entre dos subredes distintas](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Cuando los nodos <span class="notranslate farm-term" translate="no">Farm</span> están en **subredes distintas**, por ejemplo, en varias zonas de disponibilidad de nube, la **dirección IP virtual** está en un **balanceador de carga (LB)** externo. El balanceador envía el tráfico a las direcciones IP físicas de los servidores de cada subred.

#### Reglas de enrutamiento del tráfico y balanceo de carga {#intelligent-traffic-routing--load-balancing-rules}

El balanceador distribuye las solicitudes de los clientes según dos criterios:

  * **Reglas de balanceo de carga:** por ejemplo, la **dirección IP del cliente** o el **puerto TCP del cliente**.
  * **Disponibilidad de los nodos:** el balanceador envía tráfico solo a los nodos en buen estado, según la comprobación de estado de SafeKit.

> **⚠️ Nota:** SafeKit proporciona la comprobación de estado. El balanceador de carga lo proporciona su red o su proveedor de nube.

#### Comprobación de estado de SafeKit {#safekit-health-check-mechanism}

SafeKit proporciona una **URL de comprobación de estado** en cada servidor <span class="notranslate farm-term" translate="no">Farm</span>. El balanceador la consulta para conocer el estado de cada servidor:

  * **Nodo disponible (UP):** la comprobación devuelve `HTTP 200 OK`. El balanceador envía tráfico a este servidor.
  * **Nodo no disponible (DOWN):** si falla un servidor o una aplicación, SafeKit devuelve `HTTP 404 NOT FOUND` (o el servidor no responde). El balanceador deja de enviar tráfico a ese nodo inmediatamente.

#### Despliegue en la nube: AWS, Azure y GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta es la arquitectura estándar para **clústeres <span class="notranslate farm-term" translate="no">Farm</span> en la nube**. Si una subred o una zona deja de estar disponible, los demás nodos siguen procesando el tráfico. La solución es compatible con [**Amazon AWS**](</es/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</es/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) y [**Google Cloud (GCP)**](</es/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).

## Comparación: implementación de la dirección IP virtual, latencia y transparencia de las aplicaciones {#virtual-ip-methods-comparison}

**Comparación de los métodos de redireccionamiento de IP virtual y DNS para la alta disponibilidad y la recuperación ante desastres.**

Entorno y caso de uso | Tipo de alta disponibilidad | Método de redireccionamiento | Implementado por | Latencia de red | Transparencia de la aplicación e IP local  
---|---|---|---|---|---  
Primario/secundario (alta disponibilidad) | Clúster Mirror | ARP gratuito / toma de control de MAC | ✅ Producto SafeKit | Muy baja: tiempo para detectar el fallo y enviar el GARP | Transparencia total: la dirección IP virtual es local en el nodo activo. La dirección IP del cliente no cambia.  
Balanceo de carga (activo/activo) | Clúster <span class="notranslate farm-term" translate="no">Farm</span> | Filtro de red del kernel / GARP | ✅ Producto SafeKit | Muy baja: tiempo para detectar el fallo y cambiar los filtros de red | Transparencia total: la dirección IP virtual es local en todos los nodos. La dirección IP del cliente no cambia.  
Misma subred / LAN extendida (VLAN extendida) | Recuperación ante desastres (centros de datos remotos) | Aliasado de IP / GARP | ✅ Producto SafeKit (el equipo de red proporciona la VLAN extendida) | Baja: depende del tiempo de ida y vuelta (RTT) de la VLAN extendida | Transparencia total: la dirección IP virtual es local en los nodos. La dirección IP del cliente no cambia.  
Subredes distintas: solo balanceador de carga | Recuperación ante desastres (centros de datos remotos / nube) | Balanceador de carga externo | 🛠️ Integrador: configuración del balanceador (SafeKit proporciona la comprobación de estado) | Media: depende del intervalo de comprobación del balanceador | ⚠️ Transparencia parcial si se utiliza SNAT/DNAT. La dirección IP virtual **NO** es local en los nodos. Puede que la IP del cliente **NO** se conserve. La aplicación debe admitirlo.  
Subredes distintas: balanceador + IP virtual local de SafeKit | Recuperación ante desastres (centros de datos remotos / nube) | Balanceador externo con Floating IP / Direct Server Return | 🛠️ Integrador: configuración del balanceador (SafeKit proporciona la comprobación de estado) | Media: depende del intervalo de comprobación del balanceador | Buena transparencia: la dirección IP virtual es local en el nodo primario y sirve como dirección de destino.  
Subredes distintas: CLI de nube | Recuperación ante desastres (nube) | API de nube: la IP privada o una ruta de nube se mueve al nuevo servidor primario | 🛠️ Integrador: comandos de CLI de nube en el script `start_prim` | Media o alta: depende del tiempo de respuesta de la API de nube | Transparencia total: la dirección IP virtual es local en el nodo primario. La dirección IP del cliente no cambia.  
Subredes distintas: BGP | Recuperación ante desastres (centros de datos remotos / nube) | Ruta /32 anunciada mediante BGP | 🛠️ Integrador: comandos BGP en los scripts `start_prim` y `stop_prim` | Baja o media: depende del tiempo de convergencia de BGP | Transparencia total: la dirección IP virtual es local en el nodo primario. La dirección IP del cliente no cambia. Se necesitan routers BGP.  
Redireccionamiento DNS: sin IP virtual | Recuperación ante desastres (centros de datos remotos) | Cambio del registro DNS (nombre / IP física) | 🛠️ Integrador: comandos de actualización DNS en el script `start_prim` | Alta e imprevisible: depende del TTL DNS y de la caché DNS del cliente | ⚠️ No es fiable: el cliente debe realizar una nueva consulta DNS. A menudo, los clientes conservan la IP antigua obtenida al iniciarse y no se redirigen después de una conmutación por error.  

## Preguntas frecuentes sobre la dirección IP virtual {#virtual-ip-faq}

### Dirección IP virtual y redes {#virtual-ip--networking}

¿Qué es una dirección IP virtual y en qué se diferencia de una IP física?

Una **dirección IP física** está asociada a una tarjeta de red. Una **dirección IP virtual** no está vinculada al hardware. En un clúster SafeKit, los clientes siempre utilizan la dirección IP virtual. Si falla el servidor primario, la dirección IP virtual pasa automáticamente a un nodo disponible. No es necesario cambiar la configuración de los clientes.

¿Necesito un balanceador de carga de hardware para utilizar una dirección IP virtual?

No. **SafeKit** gestiona la dirección IP virtual mediante software. En la misma subred, utiliza **aliasado de IP** y **ARP gratuito (GARP)** para redirigir el tráfico. No se necesita un balanceador externo ni un servidor proxy.

¿Qué es el ARP gratuito (GARP) y por qué se utiliza?

El **ARP gratuito (GARP)** es un mensaje de red que se envía a todos los dispositivos. Actualiza las tablas ARP de switches y routers. Durante una conmutación por error, el nuevo servidor primario envía un mensaje GARP que anuncia que la **dirección IP virtual** está ahora asociada a su dirección MAC. El tráfico se redirige inmediatamente.

¿Puedo asociar un nombre DNS a una dirección IP virtual?

**Sí.** Cree un registro A estándar para la dirección IP virtual. El redireccionamiento se realiza en el **nivel de la dirección IP virtual** (mediante ARP o redireccionamiento de red), **no en el nivel DNS**. No hay retrasos de DNS ni problemas de TTL y la conmutación por error sigue siendo **transparente para la aplicación**.

### Nube y arquitecturas avanzadas {#cloud--advanced-architectures}

¿Cómo funciona una dirección IP virtual en la nube (AWS, Azure, GCP)?

En la nube, los mensajes GARP de capa 2 no están disponibles para redirigir una dirección IP virtual. SafeKit funciona con **balanceadores de carga de nube** (AWS ELB, Azure LB o Google GCLB). SafeKit proporciona una **URL de comprobación de estado**. El balanceador la consulta y envía el tráfico al nodo activo.

¿Es mejor una LAN extendida que un balanceador de carga para la recuperación ante desastres?

**Sí.** Entre centros de datos remotos, una **LAN extendida (VLAN extendida)** suele ser mejor porque la conmutación por error sigue siendo **transparente para la aplicación**. La **dirección IP virtual no cambia**, por lo que la aplicación y sus clientes continúan utilizando la misma dirección después de una conmutación entre centros de datos.

¿Cuáles son las limitaciones del redireccionamiento DNS frente a una dirección IP virtual?

El **redireccionamiento DNS** depende del **TTL (Time to Live)** y de la caché DNS del cliente. La recuperación puede tardar horas. Además, los **clientes que no realizan una nueva consulta DNS siguen bloqueados** en el servidor que ha fallado. Una **dirección IP virtual** se redirige inmediatamente mediante mensajes GARP de capa 2. La caché DNS del cliente no afecta.

### Transparencia y seguridad {#transparency--security}

¿Por qué es importante una dirección IP virtual local para la transparencia de las aplicaciones?

Con una **dirección IP virtual local**, la aplicación utiliza una dirección que no cambia. SafeKit realiza el redireccionamiento en el **kernel** y la aplicación no detecta la conmutación por error. Con DNAT, cambia la dirección que utiliza la aplicación.

¿Una dirección IP virtual conserva la dirección IP original del cliente?

Sí. SafeKit no utiliza traducción de direcciones de origen (SNAT). Como la dirección IP virtual es local en el servidor activo, la aplicación recibe la **dirección IP original del cliente**. Esto es importante para las auditorías de seguridad, la persistencia de sesiones y los registros reglamentarios.

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
