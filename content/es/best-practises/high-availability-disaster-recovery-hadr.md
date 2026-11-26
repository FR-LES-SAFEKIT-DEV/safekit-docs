---
title: "Combinación de la alta disponibilidad SafeKit con las copias de seguridad para la recuperación ante desastres"
canonical: "https://safekit.eviden.com/es/best-practises/high-availability-disaster-recovery-hadr/"
description: "Combine la alta disponibilidad de SafeKit (replicación síncrona, RPO 0) con copias de seguridad asíncronas para la recuperación ante desastres externa en Windows y Linux."
category: "best-practises"
lang: "es"
topics: "Replicación síncrona SafeKit para alta disponibilidad (HA) frente a replicación asíncrona de copias de seguridad para recuperación ante desastres (DR), Índice, HADR síncrono: cero pérdida de datos en redes rápidas (LAN/VLAN), HADR asíncrono: recuperación ante desastres en redes lentas (WAN), Cómo combinar HADR y copias de seguridad para lograr una resiliencia total del sistema, Comparación de las arquitecturas HADR: redes rápidas frente a redes lentas, Guía en vídeo: Cómo implementar HADR con SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# Combinación de la alta disponibilidad SafeKit con las copias de seguridad para la recuperación ante desastres {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Replicación síncrona SafeKit para alta disponibilidad (HA) frente a replicación asíncrona de copias de seguridad para recuperación ante desastres (DR) {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit proporciona una **arquitectura flexible de alta disponibilidad y recuperación ante desastres (HADR)** basada en software que elimina la necesidad de un costoso almacenamiento compartido. Al implementar **la replicación síncrona** a través de una VLAN extendida entre el Servidor 1 y el Servidor 2, SafeKit garantiza que sus aplicaciones críticas permanezcan "activas" y consistentes entre dos sitios redundantes.

Para hacer frente a las limitaciones de las WAN de menor ancho de banda, SafeKit está diseñado para combinarse con **soluciones de copia de seguridad y recuperación**. Esto permite a las organizaciones mantener el tiempo de actividad 24/7 a través de la conmutación por error automática, al tiempo que se aseguran los datos históricos para la recuperación ante desastres fuera del sitio.

En consecuencia, el entorno está protegido contra fallos de hardware o software a través de SafeKit, y está protegido contra errores lógicos y amenazas cibernéticas como el ransomware a través de la solución de copia de seguridad.


![Un diagrama técnico que muestra por qué la alta disponibilidad (SafeKit) y las copias de seguridad son complementarias: SafeKit gestiona la conmutación por error de hardware/software mediante la replicación síncrona, mientras que la copia de seguridad asíncrona protege contra el ransomware y los errores lógicos.](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**Alta disponibilidad con SafeKit y recuperación ante desastres con copias de seguridad**

## Índice {#table-of-contents}

  * [HADR síncrono: cero pérdida de datos en redes rápidas (LAN/VLAN)](#synchronous-hadr-fast-network)
  * [HADR asíncrono: recuperación ante desastres en redes lentas (WAN)](#asynchronous-hadr-slow-network)
  * [Cómo combinar HADR y copias de seguridad para lograr una resiliencia total del sistema](#hadr-resilience-strategy)
  * [Comparación de las arquitecturas HADR: redes rápidas frente a redes lentas](#hadr-architectures-comparison)
  * [Guía en vídeo: Cómo implementar HADR con SafeKit](#videoguide-hadr-safekit)
  * [🔍 Explora SafeKit](#hub)



{{%  insert-safekit-4-buttons-es  %}}
 

## HADR síncrono: cero pérdida de datos en redes rápidas (LAN/VLAN) {#synchronous-hadr-fast-network}

### ¿Cómo implementar HADR en una red rápida? {#hadr-fast-network-architecture}


![Arquitectura que combina alta disponibilidad y recuperación ante desastres (HADR) sin discos compartidos](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Para implementar HADR en una red rápida, implemente dos nodos en sitios remotos para proporcionar alta disponibilidad y recuperación ante desastres simultáneamente. Esta configuración garantiza que su aplicación permanezca disponible incluso si falla un sitio completo, sin la complejidad de una infraestructura de almacenamiento compartido.

### ¿Por qué utilizar una solución HADR sin SAN para redes rápidas? {#sanless-hadr-solution}

Una solución sin SAN como SafeKit es esencial porque replica los datos de forma síncrona y en tiempo real entre dos nodos sin discos compartidos. Dado que la replicación síncrona garantiza cero pérdida de datos (RPO = 0), el software puede activar instantáneamente una conmutación por error automática de la aplicación si se produce un fallo de hardware o software.

### ¿Cuáles son los requisitos de red para HADR síncrono? {#extended-lan-vlan-requirements}

La HADR síncrona requiere una LAN extendida o una VLAN extendida por tres razones fundamentales:

  * **Conmutación por error de IP virtual:** se requiere una única subred. La [dirección IP virtual](</es/best-practises/how-a-virtual-ip-address-works/>) puede moverse automáticamente entre los nodos.
  * **Baja latencia:** [la replicación síncrona](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>) sin pérdida de datos requiere normalmente un tiempo de ida y vuelta de red inferior a 5 ms.
  * **Ancho de banda elevado:** se requiere una conexión de 1 Gb/s o más para garantizar una rápida resincronización de datos durante un failback.


## HADR asíncrono: recuperación ante desastres en redes lentas (WAN) {#asynchronous-hadr-slow-network}

### ¿Cómo implementar HADR en una red lenta? {#hadr-slow-network-architecture}


![Arquitectura HADR que separa la alta disponibilidad de la recuperación ante desastres](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Para implementar HADR en una red lenta (WAN), la arquitectura suele separar **la alta disponibilidad** de **la recuperación ante desastres**. En este escenario, se implementan dos nodos en el sitio principal para la redundancia local, mientras que se utiliza una estrategia de copia de seguridad o replicación asincrónica independiente para proteger los datos en un sitio remoto distante.

### ¿Cuál es la mejor solución HADR para conexiones de bajo ancho de banda? {#sanless-ha-with-remote-dr}

La solución óptima implica implementar **SafeKit** en el sitio principal para la alta disponibilidad local utilizando replicación síncrona en tiempo real y conmutación por error automática. Para el sitio de recuperación ante desastres, los datos están protegidos mediante replicación asíncrona o copias de seguridad programadas a través de la red lenta, lo que garantiza que el tiempo de actividad local se mantenga sin verse limitado por la latencia de la WAN. Para lograr esta arquitectura, se requiere una **solución de copia de seguridad** dedicada (distinta de SafeKit) para gestionar la transferencia y restauración de datos en el sitio remoto. 

### ¿Cómo funciona la conmutación por error con un sitio remoto de recuperación ante desastres? {#dr-site-failover-process}

Debido a que la replicación asíncrona a través de una red lenta implica una posible pérdida de datos (RPO > 0), el proceso de conmutación por error a un sitio de recuperación ante desastres suele ser manual y está gestionado por un administrador:

  * **Restauración de datos:** las copias de seguridad se restauran en servidores secundarios en el sitio de recuperación ante desastres. Las soluciones modernas restauran máquinas virtuales (VM) rápidamente para reducir el tiempo de recuperación. Un ejemplo es **Veeam**.
  * **Redireccionamiento de DNS:** el tráfico se redirige al sitio de DR a nivel de DNS. El tiempo de recuperación depende de los tiempos de espera de la caché de DNS (TTL), y algunas aplicaciones cliente pueden requerir un reinicio para captar la nueva dirección IP.
  * **Decisión manual:** un administrador debe verificar la integridad de los datos en el sitio remoto antes de autorizar el cambio al centro de datos secundario.


## Cómo combinar HADR y copias de seguridad para lograr una resiliencia total del sistema {#hadr-resilience-strategy}

### Comparación entre alta disponibilidad y copia de seguridad de datos {#ha-vs-backup-comparison}


![Logotipo del software de alta disponibilidad SafeKit](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![Icono de estrategia de copia de seguridad de datos](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Aunque ambas son fundamentales para la protección de datos, **la alta disponibilidad (HA)** y **las soluciones de copia de seguridad** se dirigen a riesgos diferentes. **La alta disponibilidad**, impulsada por SafeKit, proporciona un mecanismo de conmutación por error "en vivo" para mantener las aplicaciones accesibles durante las interrupciones del servidor o los fallos de hardware. Por el contrario, una **solución de copia de seguridad** actúa como un archivo "histórico". Mientras que la HA garantiza una disponibilidad del sistema del 99,99 % replicando los datos en tiempo real, la copia de seguridad se centra en la integridad de los datos, proporcionando los puntos de restauración necesarios para recuperarse de errores lógicos, eliminaciones accidentales o ataques de ransomware.

### ¿La alta disponibilidad sustituye a una estrategia de copia de seguridad? {#ha-vs-backup-ransomware}

No, la alta disponibilidad y las copias de seguridad son complementarias, no intercambiables. Si bien **SafeKit** garantiza **la continuidad del negocio** al mantener las aplicaciones en funcionamiento durante un fallo de hardware, no protege contra errores lógicos, eliminaciones accidentales o ataques de ransomware. Por ejemplo, debido a que la replicación en tiempo real refleja cada cambio al instante, un ataque de ransomware en el nodo principal se duplicará inmediatamente en el nodo secundario. Para recuperarse de tales amenazas cibernéticas o eliminaciones accidentales, necesita una **solución de copia de seguridad** dedicada con una política de retención sólida. Esto le permite "rebobinar" su entorno a un estado saludable anterior a la corrupción.

### Optimización RTO y RPO: la sinergia entre la alta disponibilidad y las copias de seguridad {#ha-backup-rpo-rto}

Para crear una infraestructura verdaderamente resiliente, debe integrar tanto la alta disponibilidad como la copia de seguridad en una estrategia unificada. Estas dos tecnologías abordan diferentes dimensiones del objetivo de tiempo de recuperación (RTO) y el objetivo de punto de recuperación (RPO). Para obtener más detalles, consulte [RTO y RPO con ejemplos](</es/best-practises/what-is-rpo-and-rto-with-examples/>).

  * **Alta disponibilidad (a través de SafeKit):** Su objetivo es **la recuperación instantánea**. SafeKit mantiene una copia activa y síncrona de su entorno. Su RTO es cercano a cero. Su RPO es cero. Si un servidor falla, la aplicación se reanuda en el nodo secundario de inmediato, lo que garantiza que no haya interrupción del servicio ni pérdida de datos durante la transición.
  * **Soluciones de copia de seguridad:** Su objetivo es **la resiliencia de los datos**. Mientras que la alta disponibilidad mantiene el servicio "activo", la copia de seguridad crea un historial "inmutable". La copia de seguridad es su red de seguridad cuando los datos activos se ven comprometidos. Le permite restaurar una versión limpia de su base de datos desde un punto específico en el tiempo, antes de que ocurriera un virus o una eliminación accidental.


## Comparación de las arquitecturas HADR: redes rápidas frente a redes lentas {#hadr-architectures-comparison}

Criterios | Red rápida (LAN/VLAN) | Red lenta (WAN)  
---|---|---  
Alcance principal | Redundancia local y alta disponibilidad | Recuperación ante desastres de sitio a sitio  
Caso de uso | Mismo centro de datos o campus | Centros de datos remotos o regiones en la nube  
Tipo de replicación | Síncrono (en tiempo real) | Asíncrono/Copia de seguridad  
RPO (pérdida de datos) | Cero (RPO = 0) | Posible pérdida de datos (RPO > 0)  
Proceso de conmutación por error | Automático | Manual (decisión Admin)  
Desvío de tráfico | Dirección IP virtual (VIP) | Nivel de DNS (dependiente del TTL)  
Requisito de latencia | Bajo (normalmente < 5 ms) | Admite alta latencia  
Objetivo de recuperación principal | Continuidad inmediata del negocio | Seguridad y retención de datos  
  
## Guía en vídeo: Cómo implementar HADR con SafeKit {#videoguide-hadr-safekit}

###  Cómo implementar HADR con SafeKit: replicación síncrona y conmutación por error {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Aprenda a combinar **la alta disponibilidad (HA)** y **la recuperación ante desastres (DR)** en una única estrategia HADR utilizando SafeKit. Esta guía en vídeo explora la arquitectura necesaria para lograr un tiempo de actividad 24/7 de la aplicación sin necesidad de discos compartidos.

### Momentos destacados del vídeo {#video-highlights}

  1. 🎬 [Introducción a SafeKit HADR sobre VLAN extendidas](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [Cómo funcionan la replicación sincrónica y el doble acuse de recibo](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [Mecánica de conmutación por error: ARP gratuito (GARP) y IP virtual](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [Diseño para WAN lentas: HA vs. estrategias de copia de seguridad](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### Vídeo SafeKit: Cómo implementar la alta disponibilidad y la recuperación ante desastres (HADR) con SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}