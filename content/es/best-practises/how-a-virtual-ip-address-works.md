---
title: "¿Cómo funciona una dirección IP virtual (VIP) en un clúster de alta disponibilidad?"
canonical: "https://safekit.eviden.com/es/best-practises/how-a-virtual-ip-address-works/"
description: "Descubra cómo SafeKit mueve una IP virtual (VIP) durante una conmutación por error: mediante ARP gratuito en la misma subred, o con un balanceador de carga, CLI en la nube o BGP entre subredes. Por qué es importante que la VIP sea local."
category: "best-practises"
lang: "es"
topics: "¿Qué es una dirección IP virtual en un clúster de alta disponibilidad?, Implementación de IP virtual en SafeKit, Tabla de contenido, Cómo funciona una dirección IP virtual (VIP) en una conmutación por error en la misma subred (clúster Mirror), Cómo funciona una dirección IP virtual (VIP) en distintas subredes con un balanceador de carga (clúster Mirror), Cómo funciona una dirección IP virtual (VIP) en distintas subredes con CLI de proveedores de nube (clúster Mirror), Cómo funciona una dirección IP virtual (VIP) en distintas subredes con BGP (clúster Mirror), Cómo funciona una dirección IP virtual con balanceo de carga en la misma subred en una Farm (clúster Farm), Cómo funciona una dirección IP virtual con balanceo de carga en distintas subredes (clúster Farm), IP virtual frente a redirección DNS: por qué suele fallar la conmutación por error DNS, Comparación de la implementación de IP virtual, la latencia y la transparencia de las aplicaciones, Configuración de una dirección IP virtual para el balanceo de carga de red y la alta disponibilidad, Preguntas frecuentes sobre IP virtual (VIP), 🔍 Centro de navegación de alta disponibilidad de SafeKit"
---

# ¿Cómo funciona una dirección IP virtual (VIP) en un clúster de alta disponibilidad? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## ¿Qué es una dirección IP virtual en un clúster de alta disponibilidad? {#virtual-ip-definition}

Una **dirección IP virtual (VIP)** es la única dirección que utilizan los clientes para conectarse a una aplicación en un [clúster de alta disponibilidad](</es/>). La VIP no está vinculada a un servidor concreto. Durante una conmutación por error, pasa al servidor que ejecuta la aplicación. Los clientes no necesitan cambiar su configuración.

**Principio clave de SafeKit:** la VIP se **configura localmente en el servidor** que ejecuta la aplicación. La aplicación se inicia en la VIP y recibe la dirección IP original del cliente. Por eso muchas aplicaciones funcionan con SafeKit sin modificaciones.


## Implementación de la IP virtual en SafeKit {#safekit-vip-implementation}

Este artículo explica cómo SafeKit mueve la VIP en cada arquitectura de red:

  * **Misma subred o LAN extendida (clústeres Mirror y <span class="notranslate farm-term" translate="no">Farm</span>):** SafeKit configura la VIP en el servidor y envía un **ARP gratuito (GARP)**. No se necesita hardware externo. Es la solución más transparente.
  * **Subredes diferentes con un balanceador de carga:** el balanceador utiliza la **comprobación de estado** de SafeKit para enviar el tráfico al servidor adecuado. Mantenga también la VIP configurada localmente en el servidor principal.
  * **Subredes diferentes con CLI de proveedores de nube:** el script SafeKit `start_prim` llama a la CLI de la nube para mover la VIP (script escrito por el integrador).
  * **Subredes diferentes con BGP:** el servidor principal anuncia la VIP a los routers (script escrito por el integrador).

El artículo también explica por qué la **redirección DNS** no es una alternativa fiable a una VIP.

![Diagrama comparativo del comportamiento de la IP virtual (VIP) en Evidian SafeKit: clústeres Mirror con una IP flotante en el nodo activo y clústeres Farm con balanceo de carga de red en todos los nodos.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementación de la IP virtual en clústeres Mirror y <span class="notranslate farm-term" translate="no">Farm</span> de SafeKit.**


{{%  insert-safekit-4-buttons-es  %}}
 

## Tabla de contenido {#table-of-contents}

  * [Cómo funciona una dirección IP virtual (VIP) en una conmutación por error en la misma subred (clúster Mirror)](#virtual-ip-same-subnet-failover)
  * [Cómo funciona una dirección IP virtual (VIP) en distintas subredes con un balanceador de carga (clúster Mirror)](#virtual-ip-different-subnets-failover)
  * [Cómo funciona una dirección IP virtual (VIP) en distintas subredes con CLI de proveedores de nube (clúster Mirror)](#virtual-ip-cloud-cli-failover)
  * [Cómo funciona una dirección IP virtual (VIP) en distintas subredes con BGP (clúster Mirror)](#virtual-ip-bgp-failover)
  * [Cómo funciona una dirección IP virtual con balanceo de carga en una Farm en la misma subred (clúster Farm)](#vip-load-balancing-same-subnet)
  * [Cómo funciona una dirección IP virtual con balanceo de carga en distintas subredes (clúster Farm)](#vip-load-balancing-different-subnets)
  * [IP virtual frente a redirección DNS: por qué suele fallar la conmutación por error DNS](#virtual-ip-vs-dns-redirection-failover)
  * [Comparación de la implementación de la IP virtual, la latencia y la transparencia de las aplicaciones](#vip-vs-dns-comparison)
  * [Configuración de una dirección IP virtual para el balanceo de carga de red y la alta disponibilidad](#virtual-ip-configuration-load-balancing-ha)
  * [Preguntas frecuentes sobre la IP virtual (VIP)](#virtual-ip-faq)
  * [🔍 Centro de navegación de alta disponibilidad de SafeKit](#hub)


## Cómo funciona una dirección IP virtual (VIP) en una conmutación por error en la misma subred (clúster Mirror) {#virtual-ip-same-subnet-failover}

- [Prueba de la dirección IP virtual principal/de respaldo en un clúster espejo de SafeKit.](/es/best-practises/test-primary-backup-vip-mirror/)

### Conmutación por error automática y redireccionamiento de red en una subred local {#automated-failover--network-rerouting-in-a-local-subnet}

En una red local, **SafeKit para clústeres de red local** gestiona automáticamente la dirección IP virtual y la conmutación por error de la aplicación.

### Clúster Mirror local: conmutación por error de dos nodos en Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Mecanismo de conmutación por error de la IP virtual (VIP) de SafeKit entre dos servidores en la misma subred](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

En un **clúster Mirror de SafeKit**, los dos nodos están en la misma subred. La alta disponibilidad utiliza una **dirección IP virtual (VIP)**. SafeKit gestiona la VIP en la pila de red del sistema operativo, sin necesidad de hardware especial. La VIP se añade a las direcciones IP físicas de los servidores 1 y 2 mediante **alias de IP**. Los clientes siempre se conectan a la VIP.

#### Alias de IP y gestión de varias VIP en SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

La VIP es una tercera dirección IP que se mueve entre los nodos. SafeKit puede gestionar **varias direcciones IP virtuales** en un clúster. Se pueden configurar en la misma tarjeta de red o en tarjetas distintas, para que cada servicio tenga su propia VIP.

#### Mecanismo de conmutación por error: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

La conmutación por error no requiere intervención manual. En condiciones normales, la VIP está asociada a la **dirección MAC del servidor 1 (mac1)**. Si el servidor 1 falla, SafeKit realiza tres acciones:

  * **Recuperación de la aplicación:** SafeKit reinicia los servicios de la aplicación en el servidor 2.
  * **Alias de la VIP:** SafeKit configura la VIP como alias en la tarjeta de red del servidor 2, que pasa a ser el nuevo servidor principal. El sistema operativo envía mensajes a la red para anunciar la VIP.
  * **GARP:** SafeKit también envía un mensaje **ARP gratuito (GARP)**. Los conmutadores de red y los clientes actualizan su caché ARP. La VIP queda asociada a la **dirección MAC del servidor 2 (mac2)**.

#### Centros de datos remotos y VLAN extendidas {#remote-data-centers--extended-vlans}

La **solución de misma subred** también es adecuada para la **recuperación ante desastres (DR)** entre sitios remotos conectados mediante una **LAN extendida o una VLAN extendida**. Ambos sitios están en una sola subred, lo que simplifica la red y evita protocolos de enrutamiento complejos.

> **⚠️ Nota:** el redireccionamiento de capa 2 mediante ARP gratuito es la solución más transparente para las aplicaciones. Un balanceador de carga redirige el tráfico en la capa 3 y traduce las direcciones IP (**SNAT/DNAT**); el ARP gratuito no las traduce. La aplicación recibe la IP original del cliente y la VIP está configurada localmente. **Muchas aplicaciones necesitan** ambos elementos para funcionar correctamente.

## Cómo funciona una dirección IP virtual (VIP) en distintas subredes con un balanceador de carga (clúster Mirror) {#virtual-ip-different-subnets-failover}

### Balanceador de carga con comprobaciones de estado de SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagrama de conmutación por error de una IP virtual mediante un balanceador de carga entre dos subredes diferentes](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Cuando los nodos están en **subredes diferentes**, el ARP gratuito no puede mover la VIP. En este caso, la VIP está en un **balanceador de carga**, que envía el tráfico al servidor principal.

SafeKit proporciona una **URL de comprobación de estado** en cada nodo:

  * **Principal (PRIM):** devuelve `HTTP 200 OK`. El balanceador de carga envía tráfico a este nodo.
  * **Secundario (SECOND):** devuelve `HTTP 404 NOT FOUND`. El balanceador de carga no envía tráfico a este nodo.

Durante la conmutación por error, SafeKit cambia las respuestas y el balanceador de carga envía el tráfico al nuevo servidor principal. Es la solución estándar en [**AWS**](</es/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</es/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) y [**Google Cloud**](</es/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** SafeKit proporciona la comprobación de estado. El balanceador de carga lo proporciona la red o el proveedor de nube.

### El problema: el balanceador de carga es propietario de la VIP {#the-load-balancer-pitfall-vip-on-the-frontend-nat-to-the-physical-ip}

Con solo un balanceador de carga, los clientes se conectan a la VIP. El balanceador traduce la VIP mediante NAT a la **IP física** del servidor principal. El cliente usa la VIP, pero el servidor usa su IP física y no ve la VIP.

### Mantener la VIP configurada localmente en el servidor principal {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Aplicaciones como **Milestone XProtect** o **Nedap AEOS** usan la VIP como dirección del servidor. Solo funcionan correctamente si la VIP también está **configurada localmente en el servidor principal**. Así:

  * los servicios pueden iniciarse en la VIP;
  * el servidor puede acceder a sus propios servicios mediante la VIP;
  * la autenticación funciona con la VIP.

**Práctica recomendada:** mantenga la sección `<vip>` en el módulo SafeKit, también cuando utilice un balanceador de carga. Elija un modo que conserve la VIP como dirección de destino, por ejemplo, Floating IP o Direct Server Return.

### Alternativas al balanceador de carga {#network-considerations-load-balancer-vs-extended-lan}

  * Una **LAN extendida (VLAN extendida)** entre las subredes permite utilizar la solución más sencilla de misma subred.
  * [CLI de proveedores de nube en scripts de conmutación por error](#virtual-ip-cloud-cli-failover).
  * [Anuncio de rutas BGP](#virtual-ip-bgp-failover).

## Cómo funciona una dirección IP virtual (VIP) en distintas subredes con CLI de proveedores de nube (clúster Mirror) {#virtual-ip-cloud-cli-failover}

### Por qué el ARP gratuito no funciona en la nube {#why-gratuitous-arp-does-not-work-in-public-clouds}

Las redes en la nube (AWS, Azure y Google Cloud) **ignoran el ARP gratuito**. Solo envían tráfico a las direcciones IP asignadas en la plataforma. SafeKit configura la VIP en el servidor principal, pero la red de nube no dirige el tráfico de la VIP a ese servidor.

### Mover la VIP con la CLI de nube {#moving-the-vip-through-the-cloud-api-in-safekit-failover-scripts}

Sin balanceador de carga, el script SafeKit **`start_prim`** puede utilizar la CLI del proveedor de nube para mover la VIP al nuevo servidor principal. El script puede asignar la IP privada al nuevo servidor principal o cambiar una ruta de nube hacia la VIP.

La **VIP permanece local** en el servidor principal. No hay **NAT** y la dirección IP original del cliente no cambia.

### Responsabilidad del integrador {#integrator-responsibility}

El **integrador** debe añadir los comandos de la CLI de nube al script `start_prim`. Estos comandos **no los proporciona el producto SafeKit**. Dependen del proveedor de nube, del diseño de red y de las reglas de seguridad del cliente.

### Restricciones {#constraints-of-the-cli-approach}

  * La CLI de nube debe instalarse en ambos nodos. Cada nodo necesita una identidad de nube con permisos de red.
  * El script debe gestionar errores e intentos repetidos.
  * La conmutación por error probablemente será más lenta que con un balanceador de carga.
  * **Esta configuración no está validada.** Pruébela antes de usarla en producción.

## Cómo funciona una dirección IP virtual (VIP) en distintas subredes con BGP (clúster Mirror) {#virtual-ip-bgp-failover}

### Redireccionamiento de la VIP con BGP {#layer-3-vip-rerouting-with-bgp-route-advertisement}

Con **BGP (Border Gateway Protocol)**, la VIP se configura localmente en el servidor principal, que **la anuncia a los routers** como una ruta /32.

  * **Funcionamiento normal:** solo el servidor principal anuncia la VIP.
  * **Conmutación por error:** el script `start_prim` inicia el anuncio en el nuevo servidor principal. `stop_prim` lo detiene en el anterior. Si el servidor principal falla, su ruta se elimina automáticamente.

### Ventajas y requisitos {#benefits-and-prerequisites}

  * **La VIP permanece local, no hay NAT y la IP del cliente no cambia.** Aplicaciones como Milestone XProtect o Nedap AEOS funcionan como en un clúster de la misma subred.
  * Funciona entre subredes y sitios, sin necesidad de una VLAN extendida.
  * Se necesitan routers BGP y la colaboración del equipo de red. En la nube, se necesita un servicio de servidor de rutas del proveedor.

> **⚠️ Nota:** la integración BGP utiliza scripts de SafeKit y la infraestructura de enrutamiento. El **integrador** debe escribir los comandos BGP para anunciar y retirar la ruta en los scripts `start_prim` y `stop_prim`. Estos scripts **no los proporciona el producto SafeKit**. Valide la solución con el equipo de red antes de ponerla en producción.

### Comparación de métodos entre subredes {#comparison-cross-subnet-vip-methods}

| Método | VIP local en el servidor principal | NAT | Requisito principal |
|---|---|---|---|
| **Solo balanceador de carga** | No | Sí | Balanceador de carga |
| **Balanceador de carga + VIP de SafeKit** | Sí | No (Floating IP / DSR) | Balanceador de carga |
| **CLI de nube** | Sí | No | CLI y permisos de nube |
| **BGP** | Sí | No | Routers BGP |
| **LAN extendida + GARP** | Sí | No | VLAN extendida |

## Cómo funciona una dirección IP virtual con balanceo de carga en una Farm de la misma subred (clúster Farm) {#vip-load-balancing-same-subnet}

- [Probar el balanceo de carga de la dirección IP virtual en un clúster Farm de SafeKit](/es/best-practises/test-load-balancing-vip-farm/)

### Rendimiento escalable: balanceo de carga en el kernel y redundancia {#scalable-performance-kernel-level-load-balancing--redundancy}

Cuando hay mucho tráfico, SafeKit puede distribuir el trabajo entre varios servidores activos. Si uno falla, los demás siguen funcionando.

### Arquitectura de clúster Farm: balanceo de carga entre nodos Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagrama de una dirección IP virtual (VIP) con balanceo de carga en un clúster Farm de la misma subred](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

En un **clúster Farm con balanceo de carga**, los clientes se conectan a una IP virtual (VIP) y las solicitudes se distribuyen simultáneamente entre varios servidores. El ejemplo tiene dos nodos, pero se pueden añadir más. En la misma subred, la VIP se configura mediante un alias de IP en la tarjeta de red de **cada servidor** del clúster.

#### Distribución del tráfico: el filtro del kernel {#traffic-distribution-the-kernel-level-filter}

En un clúster <span class="notranslate farm-term" translate="no">Farm</span>, un **filtro en el kernel** de SafeKit distribuye el tráfico:

  * **Asignación ARP:** en la caché ARP de los clientes, la VIP está asociada a una dirección MAC, por ejemplo, `mac1` del servidor 1.
  * **Análisis de paquetes:** el servidor 1 recibe los paquetes. El filtro del kernel de SafeKit lee la **IP del cliente** o el **puerto TCP** de cada paquete.
  * **Distribución de carga:** el filtro decide qué paquetes procesa el servidor 1 y cuáles se envían a otros nodos, como el servidor 2.

#### Conmutación por error y redireccionamiento mediante ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Si el servidor 1 falla, SafeKit envía un mensaje **ARP gratuito (GARP)**. Los clientes actualizan su caché ARP con `mac2`, la dirección MAC del servidor 2, y el tráfico se dirige a los demás nodos Farm.

#### Implementación en sitios remotos {#deployment-in-remote-sites}

Esta solución de balanceo de carga también funciona entre **centros de datos remotos** si los sitios están conectados mediante una **LAN o VLAN extendida**. Todos quedan en la misma subred, una configuración eficiente para clústeres Farm en varios sitios.

## Cómo funciona una dirección IP virtual con balanceo de carga en distintas subredes (clúster Farm) {#vip-load-balancing-different-subnets}

### Escalado multizona: tráfico entre subredes de nube {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un clúster <span class="notranslate farm-term" translate="no">Farm</span> puede distribuir el trabajo de la aplicación entre varias zonas de disponibilidad y subredes.

### Clústeres Farm entre subredes: varios nodos Windows o Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagrama de un clúster Farm con balanceo de carga en dos subredes diferentes](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Cuando los nodos Farm están en **subredes diferentes**, por ejemplo, en varias zonas de disponibilidad de nube, la **IP virtual (VIP)** se encuentra en un **balanceador de carga externo (LB)**. Este envía el tráfico a las direcciones IP físicas de los servidores en cada subred.

#### Reglas de enrutamiento del tráfico y balanceo de carga {#intelligent-traffic-routing--load-balancing-rules}

El balanceador de carga distribuye las solicitudes de los clientes según dos criterios:

  * **Reglas de balanceo de carga:** por ejemplo, la dirección IP del cliente o su puerto TCP.
  * **Disponibilidad de los nodos:** el balanceador envía tráfico solo a los nodos en buen estado, según la comprobación de estado de SafeKit.

> **⚠️ Nota:** SafeKit proporciona la comprobación de estado. El balanceador de carga lo proporciona la red o el proveedor de nube.

#### Comprobación de estado de SafeKit {#safekit-health-check-mechanism}

SafeKit proporciona una **URL de comprobación de estado** en cada servidor Farm. El balanceador la consulta para conocer el estado de cada servidor:

  * **Nodo disponible:** la comprobación devuelve `HTTP 200 OK`. El balanceador envía tráfico a ese servidor.
  * **Nodo no disponible:** si falla un servidor o una aplicación, SafeKit devuelve `HTTP 404 NOT FOUND` (o el servidor no responde). El balanceador deja de enviar tráfico a ese nodo.

#### Implementación en la nube: AWS, Azure y GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta es la arquitectura estándar para los clústeres **Farm en la nube**. Si una subred o zona deja de funcionar, los demás nodos siguen procesando el tráfico. Es compatible con:

  * 💡 [**Amazon AWS**](</es/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer)
  * 💡 [**Microsoft Azure**](</es/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer)
  * 💡 [**Google Cloud (GCP)**](</es/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## IP virtual frente a redirección DNS: por qué suele fallar la conmutación por error DNS {#virtual-ip-vs-dns-redirection-failover}

### El problema del retraso de DNS: por qué una VIP es mejor que la redirección DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

La conmutación por error mediante DNS puede parecer fiable, pero no lo es. Se cambia un registro DNS para que apunte a un servidor de respaldo, pero no se puede controlar **cuándo** ven el cambio los clientes. La modificación pasa por muchos servidores DNS que no se controlan. Por eso, la redirección DNS no puede garantizar cero interrupciones.

### Ejemplo: resolución DNS y clientes bloqueados {#the-technical-scenario-dns-resolution-and-the-stuck-client}

Los usuarios se conectan a un **nombre virtual** (el nombre DNS). El sistema DNS traduce ese nombre a una **dirección IP física**.

![Diagrama de la resolución de un nombre DNS a la IP física 1 en un clúster de alta disponibilidad](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

Resolución DNS: clientes bloqueados en la IP física 1 de un clúster de alta disponibilidad.

#### Antes de la conmutación por error: el nombre apunta a la IP física 1 {#current-state-resolution-to-physical-ip-1}

El **Cliente 1** y el **Cliente 2** consultan al sistema DNS la dirección IP del nombre virtual. El sistema devuelve la **IP física 1**. A continuación, los clientes abren una conexión de red (socket) con esa dirección.

#### Después de la conmutación por error: el nombre debe apuntar a la IP física 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Si falla el servidor con la IP física 1, un administrador cambia el registro DNS para que apunte a la **IP física 2**. Los clientes solo se conectarán a la IP física 2 si se cumplen todas estas condiciones:

  * Ha expirado el **TTL (Time to Live)** en todos los servidores DNS entre el cliente y el registro.
  * La caché DNS local de los clientes 1 y 2 está vacía.
  * La aplicación cierra su conexión y realiza una **nueva** consulta DNS.

Si no se cumple alguna condición, los clientes se quedan bloqueados en la IP física 1, que ya no funciona. El servicio sigue caído aunque el registro DNS sea correcto.

### Dos problemas de la redirección DNS que no se pueden controlar {#the-two-black-boxes-of-dns-redirection}

  * **Caché DNS:** muchos proveedores de Internet y servidores DNS corporativos ignoran los TTL cortos y pueden conservar la IP física antigua durante minutos u horas.
  * **Comportamiento de las aplicaciones:** muchas aplicaciones, como los servicios Java o los navegadores web, solo consultan el DNS al iniciarse. Siguen usando la primera IP aunque cambie el registro DNS.

### Conclusión {#conclusion}

La redirección DNS no es una solución fiable de alta disponibilidad. Para una conmutación inmediata en una red local o regional, utilice una **dirección IP virtual (VIP)**.

## Comparación: implementación de IP virtual, latencia y transparencia de las aplicaciones {#vip-vs-dns-comparison}

**Comparación de los métodos de redirección por IP virtual (VIP) y DNS para la alta disponibilidad y la recuperación ante desastres.**

Entorno y caso de uso | Tipo de alta disponibilidad | Método de redirección | Latencia de red | Transparencia de la aplicación e IP local  
---|---|---|---|---  
Principal/respaldo (alta disponibilidad) | Clúster Mirror | ARP gratuito / toma de control de MAC | Muy baja: tiempo para detectar el fallo y enviar el GARP | Total: la VIP es local en el nodo activo. La IP del cliente no cambia.  
Balanceo de carga (activo/activo) | Clúster <span class="notranslate farm-term" translate="no">Farm</span> | Filtro de red del kernel / GARP | Muy baja: tiempo para detectar el fallo y cambiar los filtros de red | Total: la VIP es local en todos los nodos. La IP del cliente no cambia.  
Misma subred / LAN extendida (VLAN extendida) | Recuperación ante desastres (centros de datos remotos) | Alias de IP / GARP | Baja: depende del tiempo de ida y vuelta (RTT) de la VLAN extendida | Total: la VIP es local en los nodos. La IP del cliente no cambia.  
Subredes distintas: solo balanceador de carga | Recuperación ante desastres (centros de datos remotos / nube) | Balanceador de carga externo | Media: depende del intervalo de comprobación de estado del balanceador | ⚠️ Parcial: utiliza SNAT/DNAT. La VIP **NO** es local en los nodos y puede que la IP del cliente **NO** se conserve. La aplicación debe admitirlo.  
Subredes distintas: balanceador + VIP local de SafeKit | Recuperación ante desastres (centros de datos remotos / nube) | Balanceador externo con Floating IP / Direct Server Return | Media: depende del intervalo de comprobación de estado del balanceador | Buena: la VIP es local en el nodo principal y es la dirección de destino. La IP del cliente no cambia. Hay que probarlo con la aplicación.  
Subredes distintas: CLI de nube | Recuperación ante desastres (nube) | Comandos CLI de nube en `start_prim` (script escrito por el integrador) | Media a alta: depende del tiempo de respuesta de la API de nube | Total: la VIP es local en el nodo principal. La IP del cliente no cambia. Configuración no validada.  
Subredes distintas: BGP | Recuperación ante desastres (centros remotos / nube) | Ruta /32 anunciada por BGP (scripts escritos por el integrador) | Baja a media: depende del tiempo de convergencia de BGP | Total: la VIP es local en el nodo principal. La IP del cliente no cambia. Requiere routers BGP.  
Redirección DNS: sin VIP | Recuperación ante desastres (centros de datos remotos) | Cambio de registro DNS (nombre / IP física) | Alta e impredecible: depende del TTL DNS y de la caché DNS del cliente | ⚠️ No fiable: el cliente debe volver a consultar el DNS. A menudo, los clientes conservan la IP antigua obtenida al iniciarse y no se redirigen tras la conmutación por error.  
  
## Configuración de una dirección IP virtual para el balanceo de carga de red y alta disponibilidad {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-es  %}}
 

## Preguntas frecuentes sobre la dirección IP virtual (VIP) {#virtual-ip-faq}

### Dirección IP virtual (VIP) y redes {#virtual-ip-vip--networking}

¿Qué es una dirección IP virtual (VIP) y en qué se diferencia de una IP física?

Una **dirección IP física** está asociada a una tarjeta de red. Una **dirección IP virtual (VIP)** no está vinculada al hardware. En un clúster SafeKit, los clientes siempre utilizan la VIP. Si falla el servidor principal, la VIP pasa automáticamente a un nodo disponible. Los clientes no tienen que cambiar su configuración.

¿Necesito un balanceador de carga de hardware para utilizar una dirección IP virtual?

No. **SafeKit** gestiona la dirección IP virtual mediante software. En la misma subred, utiliza **alias de IP** y **ARP gratuito (GARP)** para redirigir el tráfico. No se necesita un balanceador de carga externo ni un servidor proxy.

¿Qué es el ARP gratuito (GARP) y por qué se utiliza?

El **ARP gratuito (GARP)** es un mensaje de red que actualiza las tablas ARP de los conmutadores y routers. Durante una conmutación por error, el nuevo servidor principal envía un mensaje GARP para anunciar que la **IP virtual** está ahora asociada a su dirección MAC. El tráfico se redirige entonces.

¿Puedo asociar un nombre DNS a una dirección IP virtual?

**Sí.** Cree un registro A estándar para la VIP. La redirección se realiza en el **nivel de la VIP** (mediante ARP o redireccionamiento de red), **no en el nivel DNS**. Así se evitan demoras de DNS y problemas de TTL, y la conmutación por error sigue siendo transparente para la aplicación.

### Nube y arquitecturas avanzadas {#cloud--advanced-architectures}

¿Cómo funciona una dirección IP virtual en la nube (AWS, Azure, GCP)?

En la nube, el nivel 2 (ARP) está limitado. SafeKit funciona con **balanceadores de carga de nube** (AWS ELB, Azure LB o Google GCLB). SafeKit proporciona una **URL de comprobación de estado**. El balanceador la consulta y envía el tráfico al nodo activo mediante SNAT/DNAT.

¿Es una LAN extendida mejor que un balanceador de carga para la recuperación ante desastres?

**Sí.** Entre centros de datos remotos, una **LAN extendida (VLAN extendida)** suele ser mejor porque la conmutación por error sigue siendo **transparente para la aplicación**. La **dirección IP virtual no cambia**, por lo que la aplicación y los clientes siguen utilizando la misma dirección después del cambio entre centros de datos.

¿Cuáles son las limitaciones de la redirección DNS frente a una dirección IP virtual?

La **redirección DNS** depende del **TTL (Time to Live)** y de la caché DNS del cliente, por lo que la recuperación puede tardar horas. Además, los **clientes que no vuelven a consultar el DNS se quedan bloqueados** en el servidor que ha fallado. Una **VIP** redirige el tráfico inmediatamente en el nivel 2, sin depender de la caché DNS del cliente.

### Transparencia y seguridad {#transparency--security}

¿Por qué es importante una dirección IP virtual local para la transparencia de las aplicaciones?

Con una **dirección IP virtual (VIP)** local, la aplicación utiliza una dirección que no cambia. SafeKit realiza la redirección en el **kernel**, por lo que la aplicación no percibe la conmutación por error. Con DNAT, en cambio, cambia la dirección que utiliza la aplicación.

¿Una dirección IP virtual conserva la dirección IP original del cliente?

Sí. SafeKit no utiliza traducción de direcciones de origen (SNAT). Como la VIP es local en el servidor activo, la aplicación recibe la **dirección IP original del cliente**.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}