---
title: "¿Cómo funciona una dirección IP virtual (VIP) en clústeres de alta disponibilidad?"
canonical: "https://safekit.eviden.com/es/best-practises/how-a-virtual-ip-address-works/"
description: "Descubra cómo SafeKit utiliza direcciones IP virtuales (VIP) definidas por software para garantizar un tiempo de actividad 24 horas al día, 7 días a la semana. Obtenga información sobre la conmutación por error automatizada a través de ARP gratuito y por qué supera la redirección de DNS para la continuidad del negocio en Windows y Linux."
category: "best-practises"
lang: "es"
topics: "¿Qué es una dirección IP virtual en un clúster de alta disponibilidad?, Implementación de IP virtual en SafeKit, Tabla de contenido, Cómo funciona una dirección IP virtual (VIP) en una conmutación por error de la misma subred (clúster de granja), Cómo funciona una IP virtual (VIP) en diferentes subredes (clúster de granja), Cómo funciona una IP virtual con carga equilibrada en una granja de la misma subred (clúster de granja), Cómo funciona una IP virtual con carga equilibrada en diferentes subredes (clúster de granja), IP virtual frente a DNS Redirección: Por qué falla con frecuencia la conmutación por error de DNS, Comparación: implementación de IP virtual, latencia y transparencia de la aplicación, Configuración de una dirección IP virtual para equilibrio de carga de red y alta disponibilidad, Preguntas frecuentes sobre IP virtual (VIP), 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# ¿Cómo funciona una dirección IP virtual (VIP) en clústeres de alta disponibilidad? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## ¿Qué es una dirección IP virtual en un clúster de alta disponibilidad? {#virtual-ip-definition}

  * **Definición:** Una **dirección IP virtual (VIP)** es una dirección de red flotante utilizada en la agrupación en clústeres de alta disponibilidad [](</es/>) para garantizar el acceso continuo a las aplicaciones. A diferencia de las IP estándar, un VIP no está vinculado a una interfaz de hardware física específica, sino que cambia entre los nodos del clúster para mantener un punto de entrada único y persistente para los clientes.
  * **No se requiere hardware:** SafeKit administra el VIP a nivel de software usando **ARP gratuito (GARP)**, eliminando la necesidad de balanceadores de carga externos en entornos de la misma subred.
  * **Transparencia de la aplicación:** Al vincularse a un VIP local, las aplicaciones no detectan eventos de conmutación por error, lo que preserva las IP de origen del cliente y las configuraciones de seguridad existentes.
  * **Recuperación ante desastres:** El uso de una **LAN extendida** permite utilizar el mismo VIP en centros de datos remotos, lo que simplifica la conmutación por error de sitio a sitio en comparación con el complejo redireccionamiento de DNS y los retrasos en el almacenamiento en caché TTL.


## Implementación de IP virtual en SafeKit {#safekit-vip-implementation}

  * **Clústeres espejo:** Presenta una IP flotante activa solo en el servidor principal para facilitar la replicación y la conmutación por error en tiempo real.
  * **Clústeres de granjas:** Permite el equilibrio de carga de la red manteniendo el VIP en todos los nodos simultáneamente.


**Beneficio clave:** Al utilizar **ARP (Protocolo de resolución de direcciones) gratuito** o **Adquisición de dirección MAC**, VIP permite una conmutación por error de aplicaciones sin problemas sin reconfiguración manual del cliente, lo que garantiza la continuidad del negocio las 24 horas, los 7 días de la semana.

  * **Nube y subred múltiple:** Administrado mediante comprobaciones de estado del balanceador de carga externo (AWS, Azure, GCP) para redirigir el tráfico a través de diferentes subredes.


![Diagrama de comparación del comportamiento de IP virtual (VIP) en Evidian SafeKit: Clústeres espejo que muestran una IP flotante en el nodo activo frente a Clústeres de granja que muestran el equilibrio de carga de la red en todos los nodos.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Estrategias de implementación de IP virtual para clústeres Mirror y Farm en SafeKit.**


{{%  insert-safekit-4-buttons-es  %}}
 

## Tabla de contenidos {#table-of-contents}

  * [Cómo funciona una dirección IP virtual (VIP) en una conmutación por error de la misma subred (clúster espejo)](#virtual-ip-same-subnet-failover)
  * [Cómo funciona una IP virtual (VIP) en diferentes subredes (clúster espejo)](#virtual-ip-different-subnets-failover)
  * [Cómo funciona una IP virtual con carga equilibrada en una granja de la misma subred (clúster de granja)](#vip-load-balancing-same-subnet)
  * [Cómo funciona una IP virtual con carga equilibrada en diferentes subredes (clúster de granja)](#vip-load-balancing-different-subnets)
  * [IP virtual frente a redirección de DNS: por qué la conmutación por error de DNS suele fallar](#virtual-ip-vs-dns-redirection-failover)
  * [Comparación: implementación de IP virtual, latencia y transparencia de aplicaciones](#vip-vs-dns-comparison)
  * [Configuración de una dirección IP virtual para equilibrio de carga de red y alta disponibilidad](#virtual-ip-configuration-load-balancing-ha)
  * [Preguntas frecuentes sobre IP virtual (VIP)](#virtual-ip-faq)
  * [🔍 SafeKit Centro de navegación de alta disponibilidad](#hub)


## Cómo funciona una dirección IP virtual (VIP) en una conmutación por error de la misma subred (clúster espejo) {#virtual-ip-same-subnet-failover}

### Conmutación por error automatizada y redireccionamiento de red en una subred local {#automated-failover--network-rerouting-in-a-local-subnet}

Para las organizaciones que requieren una continuidad empresarial perfecta dentro de una infraestructura local, **SafeKit Alta disponibilidad definida por software para clústeres de redes locales** proporciona una solución sólida y automatizada para administrar direcciones IP virtuales y conmutación por error de aplicaciones en tiempo real. 

### Clúster espejo local: conmutación por error perfecta de 2 nodos en Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mecanismo de conmutación por error de SafeKit Virtual IP (VIP) entre dos servidores en la misma subred](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit Alias ​​VIP y asignación de direcciones MAC En un **clúster espejo SafeKit** estándar donde ambos nodos residen en la misma subred local, la alta disponibilidad se logra a través de una **IP virtual (VIP)** definida por software**. A diferencia de las soluciones basadas en hardware, SafeKit administra este VIP directamente dentro de la pila de redes del sistema operativo. Este VIP actúa como un punto de entrada lógico persistente para los clientes, superpuesto a las direcciones IP físicas únicas del Servidor 1 y el Servidor 2 mediante**aliasing de IP**. 

#### Alias de IP avanzado y soporte VIP múltiple de SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Una ventaja clave de la solución **SafeKit** es su flexibilidad en la gestión de identidades de red. El VIP es una tercera dirección IP que "flota" entre los nodos. En particular, SafeKit es capaz de administrar **múltiples direcciones IP virtuales** dentro de un solo clúster. Estos pueden asignarse a la misma tarjeta Ethernet primaria o distribuirse en diferentes tarjetas físicas, lo que permite configuraciones complejas en las que diferentes servicios están vinculados a identidades virtuales específicas. 

#### El mecanismo de conmutación por error: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit garantiza cero intervención manual durante una falla de hardware. En operaciones normales, el VIP se asigna a la **dirección MAC del servidor 1 (mac1)**. Si SafeKit detecta una falla de latido en el Servidor 1, ejecuta una recuperación de dos pasos: 

  * **Recuperación de aplicaciones:** SafeKit reinicia automáticamente los servicios de aplicaciones críticas en el Servidor 2.
  * **Redireccionamiento de red:** SafeKit transmite instantáneamente un mensaje **ARP gratuito (GARP)**. Esto actualiza a la fuerza las cachés ARP de todos los conmutadores de red y clientes conectados, reasignando el VIP a la **dirección MAC del servidor 2 (mac2)**.


#### Centros de datos remotos y VLAN extendidas {#remote-data-centers--extended-vlans}

Aunque normalmente se utiliza para clústeres locales, el algoritmo de la misma subred de **SafeKit** es la opción preferida para la **Recuperación ante desastres (DR)** en sitios remotos conectados a través de una **LAN extendida o VLAN extendida**. Esta arquitectura "ampliada" le permite mantener una única subred a través de distancias geográficas, simplificando significativamente la topología de su red y evitando la sobrecarga de protocolos de enrutamiento complejos. 

> **⚠️ Nota:** El redireccionamiento de capa 2 mediante ARP gratuito es la **solución más transparente** para las aplicaciones. A diferencia del redireccionamiento de Capa 3 con un equilibrador de carga, evita la **Traducción de IP de origen/destino (SNAT/DNAT)**. La aplicación recibe tráfico directamente con la IP del cliente original y la IP virtual se configura localmente. **Muchas aplicaciones prefieren** ver la IP virtual localmente y recibir la IP del cliente original directamente. Sin esta transparencia, **podría no funcionar como se esperaba** debido a las complejas traducciones de la red.

## Cómo funciona una IP virtual (VIP) en diferentes subredes (clúster espejo) {#virtual-ip-different-subnets-failover}

### Orquestación del tráfico lista para la nube mediante la integración del equilibrador de carga {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Al aprovechar la infraestructura de red externa, **Alta disponibilidad definida por software SafeKit para clústeres de nube y Multi-AZ** se integra perfectamente con un **Balanceador de carga de red** para organizar la conmutación por error del tráfico en subredes y zonas de disponibilidad separadas. 

### Clústeres espejo entre subredes: implementación de Windows y Linux {#cross-subnet-mirror-clusters-windows--linux-implementation}


![Diagrama de una conmutación por error de IP virtual utilizando un equilibrador de carga en dos subredes diferentes](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Enrutamiento del tráfico de subredes múltiples a través de comprobaciones de estado del balanceador de carga Cuando los nodos del clúster residen en **subredes diferentes**, la conmutación por error estándar basada en ARP no es posible. En este escenario, la **IP virtual (VIP)** está alojada en un **Equilibrador de carga (LB)** en lugar de en la tarjeta Ethernet del servidor. El Load Balancer actúa como puerta de enlace, dirigiendo el tráfico a las direcciones IP físicas de los nodos primarios y secundarios en función de la disponibilidad en tiempo real. 

#### Enrutamiento dinámico a través de comprobaciones de estado SafeKit {#dynamic-routing-via-safekit-health-checks}

SafeKit gestiona la dirección del tráfico proporcionando una **URL de comprobación de estado** dedicada en cada nodo. El Load Balancer consulta estas URL para determinar el estado del clúster: 

  * **Nodo principal (PRIM):** La comprobación de estado devuelve `HTTP 200 OK`. El Load Balancer dirige todo el tráfico aquí.
  * **Nodo secundario (SECOND):** La comprobación de estado devuelve `HTTP 404 NOT FOUND`. El Load Balancer no envía tráfico a este nodo.

Durante un **evento de conmutación por error**, SafeKit alterna instantáneamente las respuestas de verificación de estado, lo que activa el equilibrador de carga para redirigir el tráfico del cliente al nuevo servidor primario. 

> **⚠️ Nota:** SafeKit proporciona la lógica de verificación de estado; El balanceador de carga físico o virtual debe ser proporcionado por su infraestructura de red.

#### Integración en la nube: AWS, Azure y GCP {#cloud-integration-aws-azure-and-gcp}

Este modelo "Load Balancer + Health Check" es el estándar de la industria para **Alta disponibilidad en la nube**. Es esencial para implementar SafeKit en entornos como: 

  * 💡 [**Amazon AWS**](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>) (equilibrador de carga de red de AWS)
  * 💡 [**Microsoft Azure**](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>) (equilibrador de carga de Azure)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Equilibrio de carga de Google Cloud)


#### Consideraciones de red: equilibrador de carga frente a LAN extendida {#network-considerations-load-balancer-vs-extended-lan}

Si no desea un equilibrador de carga, consulte a su equipo de red sobre la implementación de una **LAN extendida (extensión de VLAN)** entre subredes. Esto le permite volver al modelo VIP más simple "Misma subred". 

> **⚠️ Nota:** Al optar por un Load Balancer, verifique que su aplicación sea compatible con **Traducción de IP de origen/destino (SNAT/DNAT)**. Con un Load Balancer, la aplicación puede perder el rastro de la identidad del usuario original o no poder iniciarse porque ya no ve la IP virtual configurada directamente en su propia interfaz de red.

## Cómo funciona una IP virtual con carga equilibrada en una granja de la misma subred (clúster de granja) {#vip-load-balancing-same-subnet}

### Rendimiento escalable: equilibrio de carga y redundancia a nivel de kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Para entornos de mucho tráfico, la **Guía de arquitectura: alta disponibilidad escalable con clústeres de granjas de múltiples nodos** explica cómo SafeKit distribuye las cargas de trabajo entre múltiples servidores activos mientras mantiene la redundancia total. 

### Arquitectura de clúster agrícola: equilibrio de carga entre nodos de Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagrama de una IP virtual (VIP) con equilibrio de carga dentro de un clúster de granja de la misma subred](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Procesamiento de tráfico distribuido mediante filtrado de kernel En un **clúster de granja de equilibrio de carga**, se utiliza una dirección IP virtual (VIP) para distribuir las solicitudes de los clientes entre varios servidores simultáneamente. Si bien este ejemplo presenta dos nodos, la arquitectura se escala para admitir granjas de servidores más grandes. En una configuración de la misma subred, el VIP se configura en la tarjeta Ethernet de **cada servidor** del clúster mediante alias de IP. 

#### Distribución del tráfico: el filtro a nivel de kernel {#traffic-distribution-the-kernel-level-filter}

A diferencia de un clúster de conmutación por error simple, un clúster de granja administra el tráfico a través de un **filtro a nivel de kernel** especializado. El proceso funciona de la siguiente manera: 

  * **Mapeo ARP:** En las cachés ARP de los clientes, el VIP se asocia inicialmente con una única dirección de hardware (por ejemplo, `mac1` del Servidor 1).
  * **División de paquetes:** Cuando el servidor 1 recibe el tráfico, el filtro del kernel SafeKit analiza la identidad de los paquetes entrantes (según la **IP del cliente** o el **puerto TCP**).
  * **Carga compartida:** El filtro determina qué paquetes deben procesarse localmente y cuáles deben redirigirse a otros nodos (por ejemplo, el Servidor 2) para su procesamiento, lo que garantiza una carga de trabajo equilibrada.


#### Conmutación por error y redireccionamiento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Si el nodo principal (Servidor 1) falla, el clúster mantiene la disponibilidad a través de **ARP gratuito (GARP)**. SafeKit transmite un mensaje GARP para actualizar las cachés ARP del cliente con `mac2` del Servidor 2. Esto garantiza que incluso si falla el "punto de entrada" principal, los clientes sean redirigidos inmediatamente a los nodos supervivientes de la granja. 

#### Implementación en sitios remotos {#deployment-in-remote-sites}

Para las organizaciones que operan en **centros de datos remotos**, este algoritmo de equilibrio de carga sigue siendo funcional siempre que los sitios estén vinculados a través de una **LAN o VLAN extendida**. Esto crea un entorno virtual de "misma subred", que es la configuración más eficiente para grupos de granjas distribuidas geográficamente. 

## Cómo funciona una IP virtual con carga equilibrada en diferentes subredes (clúster de granja) {#vip-load-balancing-different-subnets}

### Escalado multizona: orquestación del tráfico en subredes de la nube {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

La **Guía de arquitectura: ampliación de clústeres de granjas en entornos multizona y de nube** proporciona el plan para distribuir cargas de trabajo de aplicaciones en subredes y zonas de disponibilidad separadas. 

### Clústeres de granjas entre subredes: escalabilidad de múltiples nodos para Windows y Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagrama de un clúster de granja con carga equilibrada que opera en dos subredes diferentes](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Distribución del tráfico global a través del equilibrio de carga externo Cuando los nodos de la granja se distribuyen en **diferentes subredes** (común en implementaciones de nube Multi-AZ), la **IP virtual (VIP)** es administrada por un **equilibrador de carga (LB)** externo. El LB retiene el VIP y dirige el tráfico entrante a las direcciones IP físicas de los servidores ubicados en sus respectivas subredes. 

#### Reglas inteligentes de enrutamiento de tráfico y equilibrio de carga {#intelligent-traffic-routing--load-balancing-rules}

Load Balancer distribuye las solicitudes de los clientes en función de dos factores principales: 

  * **Reglas de distribución:** El tráfico se divide según la afinidad de la sesión o los algoritmos de equilibrio de carga (por ejemplo, analizando la **dirección IP del cliente** o el **puerto TCP del cliente**).
  * **Disponibilidad de nodo:** El tráfico solo se enruta a nodos en buen estado según lo determinado por la verificación de estado SafeKit.


> **⚠️ Nota:** SafeKit proporciona la lógica de verificación de estado; El balanceador de carga físico o virtual debe ser proporcionado por su infraestructura de red.

#### Mecanismo de verificación de estado SafeKit {#safekit-health-check-mechanism}

SafeKit proporciona una **URL de verificación de estado** en tiempo real en cada servidor de la granja para comunicar su estado operativo al Load Balancer: 

  * **Nodo ARRIBA:** La verificación de estado devuelve `HTTP 200 OK`. Load Balancer incluye este servidor en la rotación activa.
  * **Nodo ABAJO/Conmutación por error:** Si un servidor o una aplicación falla, SafeKit devuelve `HTTP 404 NOT FOUND` (o el servicio se vuelve inalcanzable). El Load Balancer deja de enviar tráfico inmediatamente al nodo fallido.


#### Estándares de implementación en la nube: AWS, Azure y GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Esta arquitectura es el modelo fundamental para los **clústeres de Cloud Farm**, lo que garantiza que si una subred o zona completa se desconecta, los nodos restantes continúan manejando la carga. Esto es compatible de forma nativa con: 

  * 💡 [**Amazon AWS**](</solutions/aws-load-balancing-cluster-failover/>) (equilibrador de carga de red de AWS)
  * 💡 [**Microsoft Azure**](</solutions/azure-load-balancing-cluster-failover/>) (equilibrador de carga de Azure)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-load-balancing-cluster-failover/>) (Equilibrio de carga de Google Cloud)


## Redirección de IP virtual frente a DNS: por qué la conmutación por error de DNS suele fallar {#virtual-ip-vs-dns-redirection-failover}

### La trampa de la propagación de DNS: por qué los VIP superan a la redirección de DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Depender de DNS para la conmutación por error a menudo crea una **falsa sensación de seguridad** en arquitecturas de alta disponibilidad. Si bien modificar un registro DNS para que apunte a un servidor de respaldo parece una ruta de recuperación sencilla, introduce una variable crítica: **latencia impredecible**. Debido a que la redirección basada en DNS depende de un ecosistema no controlado de solucionadores recursivos intermedios para reconocer y propagar el cambio, es fundamentalmente incompatible con los requisitos de "tiempo de inactividad cero" de los servicios empresariales modernos. 

### El escenario técnico: resolución DNS y el cliente "atascado" {#the-technical-scenario-dns-resolution-and-the-stuck-client}

En una configuración de red estándar, un **Nombre virtual** (el nombre DNS) actúa como punto de entrada legible por humanos para los usuarios. Sin embargo, para que los datos viajen a través de la red, ese nombre debe resolverse en una dirección **IP física** específica. 

![Diagrama que muestra la resolución de nombres DNS a IP física 1 en un clúster de alta disponibilidad](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Resolución de DNS y clientes "atascados" en la IP física 1 en un clúster de alta disponibilidad

#### Estado Actual: Resolución a IP Física 1 {#current-state-resolution-to-physical-ip-1}

Inicialmente, **Cliente 1** y **Cliente 2** consultan el sistema DNS para obtener el nombre virtual. El sistema devuelve **IP física 1**. Luego, los clientes establecen una conexión de red directa (socket) a esa dirección de hardware específica. 

#### El desafío de la conmutación por error: redireccionamiento a la IP física 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Si el servidor en la IP física 1 falla, un administrador actualiza el registro DNS para que apunte a **IP física 2**. Para redirigir exitosamente a los clientes, debe ocurrir una secuencia "perfecta": 

  * El **Tiempo de vida (TTL)** debe caducar en todos los ISP intermedios y resolutores corporativos.
  * Se debe vaciar la caché de DNS local tanto en el Cliente 1 como en el Cliente 2.
  * La aplicación debe cerrar su socket existente e iniciar una _nueva_ búsqueda de DNS.

Si se omite alguno de estos pasos, **El Cliente 1 y el Cliente 2 permanecerán "atascados"** intentando comunicarse con la IP física 1 inactiva, lo que provocará un tiempo de inactividad del servicio a pesar de la actualización en los registros DNS. 

### Las dos "cajas negras" de la redirección DNS {#the-two-black-boxes-of-dns-redirection}

  * **Almacenamiento en caché recursivo:** Muchos proveedores de servicios de Internet (ISP) y solucionadores de DNS corporativos ignoran las configuraciones de TTL bajas para reducir el tráfico, y a menudo almacenan en caché la IP física 1 "antigua" durante minutos o incluso horas después del vencimiento solicitado.
  * **Persistencia de la aplicación:** Las aplicaciones modernas (como los microservicios basados ​​en Java o los navegadores web) a menudo realizan una búsqueda de DNS solo una vez al inicio. Incluso si el registro DNS se actualiza a IP física 2, la aplicación continúa usando la IP inicial almacenada en su memoria interna.


### Conclusión {#conclusion}

La redirección de DNS es una solución inconsistente para una solución de alta disponibilidad. Para una conmutación por error instantánea dentro de un entorno local o regional, una **IP virtual (VIP)** definida por software es la única forma de garantizar una persistencia garantizada sin tiempo de inactividad. 

## Comparación: implementación de IP virtual, latencia y transparencia de aplicaciones {#vip-vs-dns-comparison}

**Comparación técnica de los métodos de redireccionamiento de IP virtual (VIP) versus el redireccionamiento de DNS para alta disponibilidad y recuperación ante desastres.**

Entorno y caso de uso | Tipo de alta disponibilidad | Mecanismo de redireccionamiento | Latencia de red | Transparencia de aplicaciones y localidad de IP  
---|---|---|---|---  
Primario/Copia de seguridad (alta disponibilidad) | Grupo de espejos | Adquisición gratuita de ARP/MAC | Muy bajo: tiempo para detectar y enviar GARP de transmisión | Transparencia total: la IP virtual es local en el nodo activo. Se conserva la IP del cliente.  
Equilibrio de carga (activo/activo) | Clúster agrícola | Filtro de red a nivel de kernel / GARP | Muy bajo: tiempo para detectar y reconfigurar filtros de red | Transparencia total: la IP virtual es local en todos los nodos. Se conserva la IP del cliente.  
Misma subred/LAN extendida (estiramiento de VLAN) | Recuperación ante desastres (centros de datos remotos) | Alias de IP estándar / GARP | Bajo: Depende del VLAN RTT extendido (tiempo de ida y vuelta) | Transparencia total: la IP virtual es local en los nodos. Se conserva la IP del cliente.  
Diferentes subredes | Recuperación ante desastres (centros de datos remotos/nube) | Balanceador de carga externo | Moderado: mayor latencia de conmutación por error debido a los intervalos de verificación del estado del balanceador de carga | ⚠️ Transparencia parcial: utiliza SNAT/DNAT. La IP virtual **NO** es local en los nodos. La IP del cliente **NO** se conserva. La aplicación debe admitirlo.  
Redirección de DNS: sin VIP | Recuperación ante desastres (centros de datos remotos) | Actualización de Registro DNS (nombre/IP física) | Alto/Impredecible: Depende del TTL (tiempo de vida) de DNS y del almacenamiento en caché de DNS del cliente. | ⚠️ No confiable: el cliente debe volver a resolver el DNS. En la mayoría de los casos, los clientes continúan usando la IP obsoleta resuelta al inicio y no son redirigidos después de una conmutación por error.  
  
## Configuración de una dirección IP virtual para equilibrio de carga de red y alta disponibilidad {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-es  %}}
 

## Preguntas frecuentes sobre IP virtual (VIP) {#virtual-ip-faq}

### IP virtual (VIP) y redes {#virtual-ip-vip--networking}

¿Qué es una IP Virtual (VIP) y en qué se diferencia de una IP física?

Mientras que una **dirección IP física** está vinculada a una interfaz de red específica, una **IP virtual (VIP)** es una dirección "flotante" independiente del hardware. En un clúster SafeKit, el VIP actúa como un punto de entrada persistente; Si el servidor primario falla, el VIP migra automáticamente a un nodo secundario en buen estado, lo que garantiza una reconfiguración cero del cliente.

¿Necesito un balanceador de carga de hardware para usar una IP virtual?

No. **El software de alta disponibilidad SafeKit** administra la IP virtual a nivel de software. En arquitecturas de la misma subred, utiliza **aliasing de IP** y **ARP gratuito (GARP)** para redirigir el tráfico. Esto elimina el costo y la complejidad de los balanceadores de carga de hardware externos o servidores proxy dedicados.

¿Qué es ARP gratuito (GARP) y por qué se utiliza?

**ARP gratuito (GARP)** es una transmisión de red que actualiza las tablas ARP de conmutadores y enrutadores de red. Durante una conmutación por error, el nuevo servidor primario envía un paquete GARP para anunciar que la **IP virtual** ahora está asignada a su dirección MAC, lo que obliga a redireccionar el tráfico inmediatamente a través de la estructura de la red.

¿Puedo asociar un nombre DNS con una IP virtual?

**Sí.** Puede asociar un nombre DNS con un VIP creando un registro A estándar. El beneficio clave es que la redirección se administra en el **nivel VIP** (a través de ARP o redirección de red) y **no en el nivel DNS**. Esto garantiza la **transparencia de la aplicación** al evitar retrasos asociados con la propagación de DNS y la caducidad de TTL.

### Nube y arquitecturas avanzadas {#cloud--advanced-architectures}

¿Cómo funciona una IP Virtual en la Nube (AWS, Azure, GCP)?

En entornos de nube donde la Capa 2 (ARP) está restringida, SafeKit se integra con **Cloud Load Balancers** (AWS ELB, Azure LB o Google GCLB). SafeKit proporciona una **URL de verificación de estado** que la plataforma monitorea para enrutar el tráfico al nodo activo mediante SNAT/DNAT.

¿Es una LAN extendida mejor que un equilibrador de carga para la recuperación ante desastres?

**Sí**. Para los centros de datos remotos, una **LAN extendida (VLAN extendida)** suele ser superior porque mantiene la **transparencia de las aplicaciones** en todos los sitios. Al mantener la **misma IP virtual**, la aplicación y sus clientes continúan comunicándose utilizando la misma identidad, lo que hace que la transición entre centros de datos sea completamente fluida.

¿Cuáles son las limitaciones del redireccionamiento de DNS frente a la IP virtual?

El **redireccionamiento de DNS** está limitado por el **TTL (tiempo de vida)** y el almacenamiento en caché del lado del cliente, lo que puede retrasar la recuperación durante horas. Un inconveniente importante es que **los clientes que no vuelven a resolver su nombre DNS permanecen bloqueados** al intentar conectarse al servidor fallido. Por el contrario, una **IP virtual** proporciona una conmutación por error instantánea de Capa 2 que redirige todo el tráfico inmediatamente, lo que garantiza la conectividad independientemente del estado de la caché DNS del lado del cliente.

### Transparencia y seguridad {#transparency--security}

¿Por qué es importante una IP virtual local para la transparencia de las aplicaciones?

un local **IP virtual (VIP)** asegura **transparencia de la aplicación** al permitir que el software se vincule a un VIP persistente. SafeKit maneja la redirección en el **nivel del núcleo** , lo que mantiene a la aplicación ajena a las conmutaciones por error del clúster, a diferencia de las soluciones DNAT donde cambia la IP vinculada.

¿El uso de una IP virtual preserva la dirección IP original del cliente?

Sí. SafeKit evita la traducción de direcciones de red de origen (SNAT). Debido a que el VIP es local para el servidor activo, la aplicación recibe la **IP del cliente original**, que es fundamental para la auditoría de seguridad, la persistencia de la sesión y el registro regulatorio.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}