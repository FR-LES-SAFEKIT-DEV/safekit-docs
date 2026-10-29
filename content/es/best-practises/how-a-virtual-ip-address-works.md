---
title: "¿Cómo funciona una dirección IP virtual (VIP) en un clúster de alta disponibilidad?"
canonical: "https://safekit.eviden.com/es/best-practises/how-a-virtual-ip-address-works/"
description: "Descubra cómo SafeKit utiliza direcciones IP virtuales (VIP) definidas por software para garantizar la disponibilidad ininterrumpida. Conozca la conmutación por error automatizada mediante ARP gratuito y por qué supera a la redirección DNS en cuanto a continuidad del negocio en Windows y Linux ."
category: "best-practises"
lang: "es"
topics: "¿Qué es una dirección IP virtual en un clúster de alta disponibilidad?, Implementación de IP virtual en SafeKit , Tabla de contenido, Cómo funciona una dirección IP virtual (VIP) en una conmutación por error de la misma subred (clúster Mirror ), Cómo funciona una IP virtual (VIP) en diferentes subredes (clúster Mirror ), Cómo funciona una IP virtual con equilibrio de carga en una misma subred Farm (clúster Farm ), Cómo funciona una IP virtual con equilibrio de carga en diferentes subredes (clúster Farm ), IP virtual frente a redirección DNS: por qué falla a menudo la conmutación por error DNS, Comparación: implementación de IP virtual, latencia y transparencia de la aplicación, Configuración de una dirección IP virtual para el equilibrio de carga de red y alta disponibilidad, Preguntas frecuentes sobre IP virtual (VIP), 🔍 SafeKit Alta Centro de navegación de disponibilidad"
---

# ¿Cómo funciona una dirección IP virtual (VIP) en un clúster de alta disponibilidad? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## ¿Qué es una dirección IP virtual en un clúster de alta disponibilidad? {#virtual-ip-definition}

  * Definición **:** Una dirección IP virtual (VIP) **es una dirección de red** utilizada en la agrupación en clústeres de alta disponibilidad [ para garantizar el acceso continuo a las aplicaciones. A diferencia de las IP estándar, una VIP no está vinculada a una interfaz de hardware física específica ](</>) sino que cambia entre los nodos del clúster para mantener un único punto de entrada persistente para los clientes.
  * **No se requiere hardware:** SafeKit administra el VIP a nivel de software usando **ARP gratuito (GARP)** , eliminando la necesidad de balanceadores de carga externos en entornos de la misma subred.
  * Transparencia de la aplicación **:** Al vincularse a una VIP local, las aplicaciones no se enteran de los eventos de conmutación por error, lo que preserva las IP de origen del cliente y las configuraciones de seguridad existentes.
  * Recuperación **desastres** : El uso **una LAN extendida** permite utilizar la misma VIP en centros de datos remotos, lo que simplifica la conmutación por error de sitio a sitio en comparación con el enrutamiento DNS complejo y los retrasos de almacenamiento en caché TTL.


## Implementación de IP virtual en SafeKit {#safekit-vip-implementation}

  * Clústeres **Mirror :** Cuenta con una IP flotante activa solo en el servidor principal para facilitar la replicación en tiempo real y la conmutación por error.
  * Clústeres **<span class="notranslate farm-term" translate="no">Farm</span> :** Permite el equilibrio de carga de la red manteniendo la VIP en todos los nodos simultáneamente.


**Beneficio clave:** Al utilizar **ARP gratuito (Protocolo de resolución de direcciones)** o **Apropiación de dirección MAC** , el VIP permite una conmutación por error de la aplicación sin problemas sin reconfiguración manual del cliente, lo que garantiza la continuidad del negocio las 24 horas del día, los 7 días de la semana.

  * **Nube y multi-subred:** Administrado a través de comprobaciones de estado del balanceador de carga externo ( AWS , Azure , GCP ) para redirigir el tráfico a través de diferentes subredes.


![ Diagrama comparativo del comportamiento de la IP virtual (VIP) en Evidian SafeKit : Mirror Clústeres que muestran una IP flotante en el nodo activo frente a Farm Clústeres que muestran el equilibrio de carga de red en todos los nodos. ](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

Estrategias de implementación de IP virtual **para clústeres Mirror y <span class="notranslate farm-term" translate="no">Farm</span> en SafeKit .**


{{%  insert-safekit-4-buttons-es  %}}
 

## Tabla de contenido {#table-of-contents}

  * [ Cómo funciona una dirección IP virtual (VIP) en una conmutación por error de la misma subred (clúster Mirror ) ](#virtual-ip-same-subnet-failover)
  * [ Cómo funciona una IP virtual (VIP) en diferentes subredes (Clúster Mirror ) ](#virtual-ip-different-subnets-failover)
  * [ Cómo funciona una IP virtual con balanceo de carga en una misma subred <span class="notranslate farm-term" translate="no">Farm</span> (Clúster <span class="notranslate farm-term" translate="no">Farm</span> ) ](#vip-load-balancing-same-subnet)
  * [ Cómo funciona una IP virtual con balanceo de carga en diferentes subredes (clúster <span class="notranslate farm-term" translate="no">Farm</span> ) ](#vip-load-balancing-different-subnets)
  * [ IP virtual frente a redirección DNS: ¿Por qué suele fallar la conmutación por error de DNS ](#virtual-ip-vs-dns-redirection-failover)
  * Comparación de [ : Implementación de IP virtual, latencia y transparencia de la aplicación ](#vip-vs-dns-comparison)
  * [ Configuración de una dirección IP virtual para el equilibrio de carga de red y alta disponibilidad ](#virtual-ip-configuration-load-balancing-ha)
  * [ Preguntas frecuentes sobre IP virtual (VIP) ](#virtual-ip-faq)
  * [ 🔍 SafeKit Centro de navegación de alta disponibilidad ](#hub)


## Cómo funciona una dirección IP virtual (VIP) en una conmutación por error de la misma subred (clúster Mirror ) {#virtual-ip-same-subnet-failover}

### Conmutación por error automatizada y redireccionamiento de red en una subred local {#automated-failover--network-rerouting-in-a-local-subnet}

Para las organizaciones que requieren una continuidad empresarial sin interrupciones dentro de una infraestructura local, **SafeKit Alta disponibilidad definida por software para clústeres de red local** proporciona una solución robusta y automatizada para administrar direcciones IP virtuales y conmutación por error de aplicaciones en tiempo real. 

### Clúster local Mirror : Conmutación por error sin interrupciones de 2 nodos Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![ SafeKit Mecanismo de conmutación por error de IP virtual (VIP) entre dos servidores en la misma subred ](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit Aliasing VIP y mapeo de direcciones MAC En un **clúster estándar SafeKit mirror** donde ambos nodos residen en la misma subred local, la alta disponibilidad se logra a través de una **IP virtual (VIP) definida por software** . A diferencia de las soluciones basadas en hardware, SafeKit administra esta VIP directamente dentro de la pila de red del sistema operativo. Esta VIP actúa como un punto de entrada lógico persistente para los clientes, superpuesto a las direcciones IP físicas únicas del Servidor 1 y el Servidor 2 a través **del aliasing de IP** . 

#### El sistema avanzado de alias IP y la compatibilidad con múltiples VIP de SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Una ventaja clave de la **solución SafeKit** es su flexibilidad para gestionar identidades de red. La IP virtual (VIP) es una tercera dirección IP que se distribuye entre los nodos. Cabe destacar que SafeKit permite gestionar **múltiples direcciones IP virtuales** dentro de un mismo clúster. Estas pueden asignarse a la misma tarjeta Ethernet principal o distribuirse entre diferentes tarjetas físicas, lo que posibilita configuraciones complejas donde distintos servicios están vinculados a identidades virtuales específicas. 

#### Mecanismo de conmutación por error: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit garantiza la ausencia de intervención manual durante un fallo de hardware. En condiciones normales de funcionamiento, la IP virtual (VIP) se asigna a **la dirección MAC del servidor 1 (mac1)** . Si SafeKit detecta un fallo en el latido del servidor 1, ejecuta una recuperación en dos pasos: 

  * Recuperación de la aplicación **:** SafeKit reinicia automáticamente los servicios de aplicación críticos en el Servidor 2.
  * **Redireccionamiento de red:** SafeKit transmite instantáneamente un mensaje **ARP gratuito (GARP)** . Esto fuerza la actualización de las cachés ARP de todos los conmutadores de red y clientes conectados, reasignando la VIP a **la dirección MAC del servidor 2 (mac2)** .


#### Centros de datos remotos y VLAN extendidas {#remote-data-centers--extended-vlans}

Si bien se suele utilizar para clústeres locales, **el algoritmo de misma subred de SafeKit** es la opción preferida para **la recuperación ante desastres (DR)** en sitios remotos conectados mediante una **LAN extendida o una VLAN extendida** . Esta arquitectura "extendida" permite mantener una única subred a través de distancias geográficas, lo que simplifica significativamente la topología de la red y evita la sobrecarga de los protocolos de enrutamiento complejos. 

> **⚠️ Nota:** **redireccionamiento de capa 2 a través** ARP **es la solución más transparente para las aplicaciones. A diferencia del redireccionamiento de capa 3 con un balanceador de carga, evita** traducción de IP de origen/destino (SNAT/ **).** aplicación recibe el tráfico directamente con la IP del cliente original y la IP virtual se configura localmente. Muchas aplicaciones prefieren **la IP virtual localmente y recibir la IP del cliente original directamente. Sin esta transparencia,** no funcionar como se espera debido a traducciones de red complejas.

## Cómo funciona una IP virtual (VIP) en diferentes subredes (clúster Mirror ) {#virtual-ip-different-subnets-failover}

### Orquestación de tráfico preparada para la nube mediante la integración de balanceadores de carga {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Aprovechando la infraestructura de red externa, **la solución de alta disponibilidad definida por software SafeKit para clústeres multi-AZ y en la nube** se integra a la perfección con un **balanceador de carga de red** para orquestar la conmutación por error del tráfico entre subredes y zonas de disponibilidad separadas. 

### Clústeres Mirror entre subredes: Implementación de Windows y Linux {#cross-subnet-mirror-clusters-windows--linux-implementation}


Diagrama de conmutación por ](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256") de IP virtual mediante un balanceador de carga en dos subredes diferentes ![

 Enrutamiento de tráfico entre subredes mediante comprobaciones de estado del balanceador de carga: Cuando los nodos del clúster se encuentran en **subredes diferentes** , la conmutación por error estándar basada en ARP no es posible. En este caso, la **IP virtual (VIP)** se aloja en un **balanceador de carga (LB)** en lugar de en la tarjeta Ethernet del servidor. El balanceador de carga actúa como puerta de enlace, dirigiendo el tráfico a las direcciones IP físicas de los nodos primario y secundario según su disponibilidad en tiempo real. 

#### Enrutamiento dinámico mediante comprobaciones de estado SafeKit {#dynamic-routing-via-safekit-health-checks}

SafeKit gestiona el enrutamiento del tráfico proporcionando una URL **comprobación de estado** dedicada en cada nodo. El balanceador de carga consulta estas URL para determinar el estado del clúster: 

  * Nodo primario (PRIM) **:** La comprobación de estado devuelve `HTTP 200 OK` . El balanceador de carga dirige todo el tráfico aquí.
  * **Nodo secundario (SEGUNDO):** La comprobación de estado devuelve `HTTP 404 NOT FOUND` . El balanceador de carga no envía tráfico a este nodo.

Durante un evento de conmutación por error **,** SafeKit cambian instantáneamente las respuestas de comprobación de estado, lo que provoca que el equilibrador de carga redirija el tráfico del cliente al nuevo servidor principal. 

> **⚠️ Nota:** SafeKit proporciona la lógica de comprobación de estado; el balanceador de carga físico o virtual debe ser proporcionado por su infraestructura de red.

#### Integración en la nube: AWS , Azure , y GCP {#cloud-integration-aws-azure-and-gcp}

Este modelo "Balanceador de carga + Verificación de estado" es el estándar de la industria para **la alta disponibilidad en la nube** . Es esencial para implementar SafeKit en entornos como: 

  * 💡 [ **Amazon AWS** ](</es/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWS Balanceador de carga de red)
  * 💡 [ **Microsoft Azure** ](</es/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) ( Azure Balanceador de carga)
  * 💡 [ **Google Cloud ( GCP )** ](</es/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Balanceo de carga de Google Cloud)


#### Consideraciones de red: Balanceador de carga frente a LAN extendida {#network-considerations-load-balancer-vs-extended-lan}

Si no se desea utilizar un balanceador de carga, consulte con su equipo de red sobre la implementación de una **LAN extendida (extensión de VLAN)** entre subredes. Esto le permitirá volver al modelo VIP más sencillo de "misma subred". 

> **⚠️ Nota:** Al optar por un balanceador de carga, verifique que su aplicación sea compatible con **Traducción de IP de origen/destino (SNAT/DNAT)** . Con un balanceador de carga, la aplicación puede perder el rastro de la identidad del usuario original o no iniciarse porque ya no ve la IP virtual configurada directamente en su propia interfaz de red.

## Cómo funciona una IP virtual con balanceo de carga en una misma subred <span class="notranslate farm-term" translate="no">Farm</span> (clúster <span class="notranslate farm-term" translate="no">Farm</span> ) {#vip-load-balancing-same-subnet}

### Rendimiento escalable: balanceo de carga y redundancia a nivel de kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Para entornos de alto tráfico, la Guía de arquitectura **: Alta disponibilidad escalable con clústeres <span class="notranslate farm-term" translate="no">Farm</span> de varios nodos y** explica cómo SafeKit distribuye las cargas de trabajo entre varios servidores activos manteniendo una redundancia total. 

### Arquitectura de clúster <span class="notranslate farm-term" translate="no">Farm</span> : Balanceo de carga entre nodos Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


Diagrama de una IP virtual (VIP) con balanceo ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256") carga dentro de un clúster ![ de la misma subred farm

 Procesamiento de tráfico distribuido mediante filtrado de kernel En un clúster de balanceo de carga **<span class="notranslate farm-term" translate="no">farm</span>** , se utiliza una dirección IP virtual (VIP) para distribuir las solicitudes de los clientes entre varios servidores simultáneamente. Si bien este ejemplo presenta dos nodos, la arquitectura se puede escalar para admitir granjas de servidores más grandes. En una configuración de misma subred, la VIP se configura en la tarjeta Ethernet de **de cada servidor** en el clúster mediante alias de IP. 

#### Distribución del tráfico: El filtro a nivel de kernel {#traffic-distribution-the-kernel-level-filter}

A diferencia de un clúster de conmutación por error simple, un clúster <span class="notranslate farm-term" translate="no">farm</span> gestiona el tráfico a través de un **filtro especializado a nivel de kernel** . El proceso funciona de la siguiente manera: 

  * Asignación ARP **:** En las cachés ARP de los clientes, la VIP se asocia inicialmente con una única dirección de hardware (por ejemplo, `mac1` del Servidor 1).
  * División de paquetes **:** Cuando el servidor 1 recibe el tráfico, el filtro **kernel SafeKit analiza la identidad de los paquetes entrantes (basándose en la IP del cliente** o **puerto TCP** ).
  * **Reparto de carga:** El filtro determina qué paquetes deben procesarse localmente y cuáles deben redirigirse a otros nodos (por ejemplo, Servidor 2) para su procesamiento, lo que garantiza una carga de trabajo equilibrada.


#### Conmutación por error y redireccionamiento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Si el nodo principal (Servidor 1) falla, el clúster mantiene la disponibilidad a través de **ARP Gratuito (GARP)** . SafeKit transmite un mensaje GARP para actualizar las cachés ARP del cliente con `mac2` del Servidor 2. Esto garantiza que, incluso si el "punto de entrada" principal falla, los clientes se redirigen inmediatamente a los nodos supervivientes en farm . 

#### Implementación en sitios remotos {#deployment-in-remote-sites}

Para las organizaciones que operan en **centros de datos remotos** , este algoritmo de equilibrio de carga sigue funcionando siempre que los sitios estén conectados mediante una **LAN o VLAN extendida** . Esto crea un entorno virtual de "misma subred", que es la configuración más eficiente para clústeres <span class="notranslate farm-term" translate="no">farm</span> distribuidos geográficamente. 

## Cómo funciona una IP virtual con balanceo de carga en diferentes subredes (clúster <span class="notranslate farm-term" translate="no">Farm</span> ) {#vip-load-balancing-different-subnets}

### Escalabilidad multizona: Orquestación del tráfico a través de subredes en la nube {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

La guía de arquitectura **: Escalado de clústeres <span class="notranslate farm-term" translate="no">Farm</span> en entornos multizona y en la nube,** proporcionan el modelo para distribuir las cargas de trabajo de las aplicaciones en zonas de disponibilidad y subredes separadas. 

### Clústeres <span class="notranslate farm-term" translate="no">Farm</span> entre subredes: Escalabilidad multinodo Windows y Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


Diagrama de un clúster ![ con balanceo ](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256") carga que opera en dos subredes diferentes farm

 Distribución global del tráfico mediante balanceo de carga externo. Cuando los nodos <span class="notranslate farm-term" translate="no">farm</span> se distribuyen en **diferentes subredes** (algo común en implementaciones de nube Multi-AZ), la **IP virtual (VIP)** es administrada por un **balanceador de carga (LB)** externo. El LB almacena la VIP y dirige el tráfico entrante a las direcciones IP físicas de los servidores ubicados en sus respectivas subredes. 

#### Reglas de enrutamiento de tráfico inteligente y equilibrio de carga {#intelligent-traffic-routing--load-balancing-rules}

El balanceador de carga distribuye las solicitudes de los clientes en función de dos factores principales: 

  * **Reglas de distribución:** El tráfico se divide según la afinidad de sesión o los algoritmos de equilibrio de carga (por ejemplo, analizando **la dirección IP del cliente** o **el puerto TCP del cliente** ).
  * Disponibilidad del nodo **: El tráfico** solo se enruta a nodos saludables según lo determine la comprobación de estado SafeKit .


> **⚠️ Nota:** SafeKit proporciona la lógica de comprobación de estado; el balanceador de carga físico o virtual debe ser proporcionado por su infraestructura de red.

#### Mecanismo de control de estado SafeKit {#safekit-health-check-mechanism}

SafeKit proporciona una **URL de comprobación de estado** en tiempo real en cada servidor de <span class="notranslate farm-term" translate="no">farm</span> para comunicar su estado operativo al balanceador de carga: 

  * Nodo **ACTIVO:** La comprobación de estado devuelve `HTTP 200 OK` . El balanceador de carga incluye este servidor en la rotación activa.
  * Nodo **CAÍDO/Conmutación por error:** Si un servidor o aplicación falla, SafeKit devuelve `HTTP 404 NOT FOUND` (o el servicio deja de estar disponible). El balanceador de carga deja de enviar tráfico al nodo que ha fallado inmediatamente.


#### Estándares de implementación en la nube: AWS, Azure, y GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta arquitectura es el modelo fundamental para los clústeres de la nube **<span class="notranslate farm-term" translate="no">Farm</span>** , lo que garantiza que si una subred o zona completa se desconecta, los nodos restantes continúan gestionando la carga. Esto es compatible de forma nativa con: 

  * 💡 [ **Amazon AWS** ](</es/solutions/aws-load-balancing-cluster-failover/>) ( AWS Balanceador de carga de red)
  * 💡 [ **Microsoft Azure** ](</es/solutions/azure-load-balancing-cluster-failover/>) ( Azure Balanceador de carga)
  * 💡 [ **Google Cloud ( GCP )** ](</es/solutions/gcp-load-balancing-cluster-failover/>) (Balanceo de carga de Google Cloud)


## IP virtual frente a redirección DNS: ¿Por qué suele fallar la conmutación por error de DNS {#virtual-ip-vs-dns-redirection-failover}

### La trampa de propagación de DNS: por qué las VIP superan a la redirección de DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

En arquitecturas de alta disponibilidad, depender de DNS para la conmutación por error suele generar una **falsa sensación de seguridad** . Si bien modificar un registro DNS para que apunte a un servidor de respaldo parece una solución de recuperación sencilla, introduce una variable crítica: **la latencia impredecible** . Dado que la redirección basada en DNS depende de un ecosistema no controlado de resolvedores recursivos intermedios para reconocer y propagar el cambio, resulta fundamentalmente incompatible con los requisitos de "cero tiempo de inactividad" de los servicios empresariales modernos. 

### El escenario técnico: Resolución DNS y el cliente "bloqueado" {#the-technical-scenario-dns-resolution-and-the-stuck-client}

En una configuración de red estándar, el nombre virtual **(nombre DNS) actúa como punto de entrada legible para los usuarios. Sin embargo, para** los datos viajen a través de la red, ese nombre debe resolverse a una dirección IP física específica **(dirección IP física** ). 

Diagrama ![ que muestra la resolución de nombres DNS a la IP física 1 en un clúster de alta disponibilidad ](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolución DNS y clientes "bloqueados" en la IP física 1 en un clúster de alta disponibilidad.

#### Estado actual: Resolución a IP física 1 {#current-state-resolution-to-physical-ip-1}

Inicialmente, los clientes **Cliente 1,** y **(Cliente 2,** ) consultan el sistema DNS para obtener el nombre virtual. El sistema devuelve la dirección IP física 1, **(Dirección IP física 1,** ). A continuación, los clientes establecen una conexión de red directa (socket) con esa dirección de hardware específica. 

#### El desafío de la conmutación por error: Redireccionamiento a la IP física 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Si el servidor en la IP física 1 falla, un administrador actualiza el registro DNS para que apunte a **la IP física 2.** Para redirigir correctamente a los clientes, debe ocurrir una secuencia "perfecta": 

  * El **tiempo de vida (TTL)** debe expirar en todos los servidores intermedios de ISP y servidores corporativos.
  * Es necesario vaciar la caché DNS local tanto del Cliente 1 como del Cliente 2.
  * La aplicación debe cerrar su socket existente e iniciar una nueva búsqueda DNS.

Si se omite alguno de estos pasos, el Cliente 1 y el Cliente 2 **permanecerán "atascados"** intentando comunicarse con la IP física 1 inactiva, lo que provocará una interrupción del servicio a pesar de la actualización de los registros DNS. 

### Las dos "cajas negras" de la redirección DNS {#the-two-black-boxes-of-dns-redirection}

  * **Almacenamiento en caché recursivo:** Muchos proveedores de servicios de Internet (ISP) y resolvedores DNS corporativos ignoran las configuraciones TTL bajas para reducir el tráfico, a menudo almacenando en caché la IP física "antigua" 1 durante minutos o incluso horas más allá de la expiración solicitada.
  * **Persistencia de la aplicación:** Las aplicaciones modernas (como los microservicios basados en Java o los navegadores web) suelen realizar una consulta DNS solo una vez al iniciarse. Incluso si el registro DNS se actualiza a la IP física 2, la aplicación continúa utilizando la IP inicial almacenada en su memoria interna.


### Conclusión {#conclusion}

La redirección DNS es una solución inconsistente para una solución **alta disponibilidad. Para la conmutación por error instantánea dentro de un entorno local o regional, una IP virtual (VIP)** definida por software es la única forma de garantizar una persistencia sin tiempo de inactividad. 

## Comparación: Implementación de IP virtual, latencia y transparencia de la aplicación {#vip-vs-dns-comparison}

Comparación técnica **los métodos de redirección** IP virtual (VIP) frente a la redirección DNS para alta disponibilidad y recuperación ante desastres.

Entorno y caso de uso | Tipo de alta disponibilidad | Mecanismo de redirección | Latencia de red | Transparencia de la aplicación y localidad IP  
---|---|---|---|---  
Principal/Respaldo (Alta disponibilidad) | Mirror Clúster | Toma de control gratuita de ARP/MAC | Muy bajo: Tiempo para detectar y enviar difusión GARP | Transparencia total: La IP virtual es local en el nodo activo. La IP del cliente se conserva.  
Balanceo de carga (activo/activo) | <span class="notranslate farm-term" translate="no">Farm</span> Clúster | Filtro de red a nivel de kernel / GARP | Muy bajo: tiempo para detectar y reconfigurar filtros de red | Transparencia total: la IP virtual es local en todos los nodos. La IP del cliente se conserva.  
Misma subred / LAN extendida (extensión de VLAN) | Recuperación ante desastres (centros de datos remotos) | Alias de IP estándar / GARP | Bajo: depende de la VLAN extendida RTT (tiempo de ida y vuelta) | Transparencia total: la IP virtual es local en los nodos. La IP del cliente se conserva.  
Diferentes subredes | Recuperación ante desastres (centros de datos remotos / nube) | Balanceador de carga externo | Moderado: Mayor latencia de conmutación por error debido a los intervalos de comprobación de estado del balanceador de carga | ⚠️ Transparencia parcial: Utiliza SNAT/DNAT. La IP virtual es **NO** local en los nodos. La IP del cliente es **NO** conservada. La aplicación debe admitirlo.  
Redireccionamiento DNS: Sin VIP | Recuperación ante desastres (centros de datos remotos) | Actualización de registro DNS (nombre / IP física) | Alto/Impredecible: Depende del TTL (tiempo de vida) DNS y del almacenamiento en caché DNS del cliente. | ⚠️ Poco fiable: El cliente debe volver a resolver el DNS. La mayoría de las veces, los clientes siguen utilizando la IP obsoleta resuelta al inicio y no se redirigen después de una conmutación por error.  
  
## Configuración de una dirección IP virtual para el balanceo de carga de red y alta disponibilidad {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-es  %}}
 

## Preguntas frecuentes sobre IP virtual (VIP) {#virtual-ip-faq}

### IP virtual (VIP) y redes {#virtual-ip-vip--networking}

¿Qué es una IP virtual (VIP) y en qué se diferencia de una IP física?

Mientras que una **dirección IP física** está vinculada a una interfaz de red específica, una **IP virtual (VIP)** es una dirección "flotante" independiente del hardware. En un clúster SafeKit , la VIP actúa como un punto de entrada persistente; si el servidor principal falla, la VIP migra automáticamente a un nodo secundario en buen estado, lo que garantiza que no sea necesaria la reconfiguración del cliente.

¿Necesito un balanceador de carga de hardware para usar una IP virtual?

**El software de alta disponibilidad SafeKit** gestiona la IP virtual a nivel de software. En arquitecturas de misma subred, utiliza **el alias de IP** y **el ARP gratuito (GARP)** para redirigir el tráfico. Esto elimina el costo y la complejidad de los balanceadores de carga de hardware externos o los servidores proxy dedicados.

¿Qué es el ARP gratuito (GARP) y por qué se utiliza?

**El ARP gratuito (GARP)** es una difusión de red que actualiza las tablas ARP de los conmutadores y enrutadores de red. Durante una conmutación por error, el nuevo servidor principal envía un paquete GARP para anunciar que la **IP virtual** ahora está asignada a su dirección MAC, lo que fuerza el redireccionamiento inmediato del tráfico a través de la red.

¿Puedo asociar un nombre DNS a una IP virtual?

**Sí.** Se puede asociar un nombre DNS a una IP virtual (VIP) mediante la creación de un registro A estándar. La principal ventaja es que la redirección se gestiona a **nivel de la VIP** (mediante ARP o redirección de red) y **no a nivel de DNS** . Esto garantiza **la transparencia de la aplicación** al evitar las demoras asociadas con la propagación de DNS y la expiración del TTL.

### Nube y arquitecturas avanzadas {#cloud--advanced-architectures}

¿Cómo funciona una IP virtual en la nube ( AWS , Azure , GCP )?

En entornos de nube donde la capa 2 (ARP) está restringida, SafeKit se integra con **balanceadores de carga en la nube** ( AWS ELB, Azure LB o Google GCLB). SafeKit proporciona una **URL de verificación de estado** que la plataforma monitorea para enrutar el tráfico al nodo activo mediante SNAT/DNAT.

¿Es una LAN extendida mejor que un balanceador de carga para la recuperación ante desastres?

**Sí** . Para centros de datos remotos, una **LAN extendida (VLAN extendida)** suele ser superior porque mantiene **transparencia de la aplicación** entre sitios. Al mantener la **misma IP virtual** , la aplicación y sus clientes continúan comunicándose utilizando la misma identidad, lo que hace que la transición entre centros de datos sea completamente fluida.

¿Cuáles son las limitaciones del redireccionamiento DNS frente a la IP virtual?

**El redireccionamiento DNS** está limitado por **el TTL (Tiempo de Vida)** y el almacenamiento en caché del cliente, lo que puede retrasar la recuperación durante horas. Una desventaja importante es que **los clientes que no resuelven su nombre DNS se quedan atascados** intentando conectarse al servidor que falló. En cambio, una **IP virtual** proporciona una conmutación por error instantánea de capa 2 que redirige todo el tráfico de inmediato, garantizando la conectividad independientemente del estado de la caché DNS del cliente.

### Transparencia y seguridad {#transparency--security}

¿Por qué es importante una IP virtual local para la transparencia de las aplicaciones?

Una **IP virtual (VIP)** local garantiza **la transparencia de la aplicación** al permitir que el software se vincule a una VIP persistente. SafeKit gestiona la redirección a **nivel del kernel** , lo que evita que la aplicación se entere de las conmutaciones por error del clúster, a diferencia de las soluciones DNAT, donde la IP vinculada cambia.

¿El uso de una IP virtual conserva la dirección IP original del cliente?

Sí. SafeKit evita la traducción de direcciones de red de origen (SNAT). Dado que la IP virtual (VIP) es local al servidor activo, la aplicación recibe la **IP del cliente original** , lo cual es fundamental para la auditoría de seguridad, la persistencia de la sesión y el registro reglamentario.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}