---
title: "Combinando la alta disponibilidad SafeKit con copias de seguridad para recuperación ante desastres."
canonical: "https://safekit.eviden.com/es/best-practises/high-availability-disaster-recovery-hadr/"
description: "Cree una estrategia de alta disponibilidad y recuperación ante desastres resiliente combinando SafeKit para replicación síncrona (RPO=0) con copias de seguridad asíncronas para la recuperación ante desastres fuera del sitio. Asegure la disponibilidad de las aplicaciones las 24 horas del día, los 7 días de la semana, y la integridad de los datos en Windows y Linux con este enfoque de doble capa."
category: "best-practises"
lang: "es"
topics: "Replicación síncrona SafeKit para HA frente a replicación de copia de seguridad asíncrona para DR, Tabla de contenido, HADR síncrona: cero pérdida de datos en redes rápidas (LAN/VLAN), HADR asíncrona: recuperación ante desastres en redes lentas (WAN), Cómo combinar HADR y copia de seguridad para una resiliencia total del sistema, Comparación de arquitecturas HADR: redes rápidas frente a lentas, Guía en vídeo: cómo implementar HADR con SafeKit , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Combinando la alta disponibilidad SafeKit con las copias de seguridad para recuperación ante desastres {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Replicación síncrona SafeKit para alta disponibilidad frente a replicación de respaldo asíncrona para recuperación ante desastres {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit proporciona una arquitectura de alta disponibilidad y recuperación ante desastres (HADR) flexible y basada en software ** ** que elimina la necesidad de un costoso almacenamiento compartido. Al implementar la replicación síncrona ** ** a través de una VLAN extendida entre el Servidor 1 y el Servidor 2, SafeKit garantiza que sus aplicaciones críticas permanezcan activas y consistentes entre dos sitios redundantes.

Para abordar las limitaciones de las redes WAN de bajo ancho de banda, SafeKit está diseñado para combinarse con las soluciones de copia de seguridad y recuperación ** ** . Esto permite a las organizaciones mantener una disponibilidad ininterrumpida (24/7) mediante la conmutación por error automática, al tiempo que protege los datos históricos para la recuperación ante desastres fuera de las instalaciones.

En consecuencia, el entorno está protegido contra fallos de hardware o software mediante SafeKit y asegurado contra errores lógicos y amenazas cibernéticas como el ransomware a través de la solución de copia de seguridad.


![ Diagrama técnico que muestra por qué la alta disponibilidad ( SafeKit ) y las copias de seguridad son complementarias: SafeKit gestiona la conmutación por error de hardware/software mediante replicación síncrona, mientras que la copia de seguridad asíncrona protege contra el ransomware y los errores lógicos. ](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

** HA vs. Copia de seguridad: Combinación de la replicación síncrona SafeKit con la recuperación ante desastres asíncrona **

## Tabla de contenido {#table-of-contents}

  * [ HADR síncrono: Cero pérdida de datos en redes rápidas (LAN/VLAN) ](#synchronous-hadr-fast-network)
  * [ HADR asíncrono: Recuperación ante desastres en redes lentas (WAN) ](#asynchronous-hadr-slow-network)
  * [ Cómo combinar HADR y copias de seguridad para una resiliencia total del sistema ](#hadr-resilience-strategy)
  * [ Comparación de arquitecturas HADR: redes rápidas frente a redes lentas ](#hadr-architectures-comparison)
  * Guía en vídeo [ : Cómo implementar HADR con SafeKit ](#videoguide-hadr-safekit)
  * [ 🔍 SafeKit Centro de navegación de alta disponibilidad ](#hub)



{{%  insert-safekit-4-buttons-es  %}}
 

## HADR síncrono: Cero pérdida de datos en redes rápidas (LAN/VLAN) {#synchronous-hadr-fast-network}

### ¿Cómo implementar HADR en una red rápida? {#hadr-fast-network-architecture}


Arquitectura ![ que combina alta disponibilidad y recuperación ante desastres (HADR) sin discos compartidos ](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Para implementar HADR en una red rápida, despliegue dos nodos en sitios remotos para proporcionar alta disponibilidad y recuperación ante desastres simultáneamente. Esta configuración garantiza que su aplicación permanezca disponible incluso si falla un sitio completo, sin la complejidad de una infraestructura de almacenamiento compartido.

### ¿Por qué utilizar una solución HADR sin SAN para redes rápidas? {#sanless-hadr-solution}

Una solución sin SAN como SafeKit es esencial porque replica los datos de forma síncrona y en tiempo real entre dos nodos sin discos compartidos. Gracias a que la replicación síncrona garantiza cero pérdida de datos (RPO=0), el software puede activar una conmutación por error automática de la aplicación al instante si se produce un fallo de hardware o software.

### ¿Cuáles son los requisitos de red para HADR síncrono? {#extended-lan-vlan-requirements}

La función HADR síncrona requiere una LAN extendida o una VLAN extendida por tres razones fundamentales:

  * Conmutación por error ](</es/best-practises/how-a-virtual-ip-address-works/>) IP virtual ** : Se requiere una única subred para conmutar automáticamente la dirección IP virtual ** [ entre nodos.
  * ** Baja latencia: ** [ La replicación síncrona ](</es/best-practises/synchronous-replication-vs-asynchronous-replication/>) sin pérdida de datos normalmente requiere un tiempo de ida y vuelta de la red inferior a 5 ms.
  * ** Ancho de banda alto: ** Se requiere una conexión de 1 Gb/s o más para garantizar una rápida resincronización de datos durante una recuperación ante fallos.


## HADR asíncrono: Recuperación ante desastres en redes lentas (WAN) {#asynchronous-hadr-slow-network}

### ¿Cómo implementar HADR en una red lenta? {#hadr-slow-network-architecture}


Arquitectura HADR ![ que separa la alta disponibilidad de la recuperación ante desastres ](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Para implementar HADR sobre una red lenta (WAN), la arquitectura normalmente separa la alta disponibilidad ** ** ) de la recuperación ante desastres ** y la recuperación ante desastres ** . En este escenario, se implementan dos nodos en el sitio principal para la redundancia local, mientras que se utiliza una estrategia de copia de seguridad o replicación asíncrona independiente para proteger los datos en un sitio remoto distante.

### ¿Cuál es la mejor solución HADR para conexiones de bajo ancho de banda? {#sanless-ha-with-remote-dr}

La solución óptima implica implementar ** SafeKit ** en el sitio principal para lograr alta disponibilidad local mediante replicación síncrona en tiempo real y conmutación por error automática. Para el sitio de recuperación ante desastres, los datos se protegen mediante replicación asíncrona o copias de seguridad programadas a través de la red lenta, lo que garantiza que el tiempo de actividad local se mantenga sin verse afectado por la latencia de la WAN. Para lograr esta arquitectura, se requiere una solución de copia de seguridad ** ** distinta de SafeKit ) para gestionar la transferencia y restauración de datos en el sitio remoto. 

### ¿Cómo funciona la conmutación por error con un sitio remoto de recuperación ante desastres? {#dr-site-failover-process}

Debido a que la replicación asíncrona a través de una red lenta implica una posible pérdida de datos (RPO > 0), el proceso de conmutación por error a un sitio de recuperación ante desastres suele ser manual y gestionado por un administrador:

  * Restauración de datos ** : Las copias de seguridad ** se restauran en servidores secundarios en el sitio de recuperación ante desastres. Las soluciones modernas como Veeam ** ** se utilizan a menudo para restaurar máquinas virtuales (VM) rápidamente y reducir el tiempo de recuperación.
  * Redireccionamiento DNS ** : El tráfico ** se redirige al sitio de recuperación ante desastres a nivel DNS. El tiempo de recuperación depende de los tiempos de espera de la caché DNS (TTL), y algunas aplicaciones cliente pueden requerir un reinicio para obtener la nueva dirección IP.
  * ** Decisión manual: ** Un administrador debe verificar la integridad de los datos en el sitio remoto antes de autorizar el cambio al centro de datos secundario.


## Cómo combinar HADR y copias de seguridad para una resiliencia total del sistema {#hadr-resilience-strategy}

### Comparación entre alta disponibilidad y copia de seguridad de datos {#ha-vs-backup-comparison}


![ SafeKit logotipo de software de alta disponibilidad ](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![ Icono de estrategia de copia de seguridad de datos ](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Aunque ambas son fundamentales para la protección de datos, las soluciones de alta disponibilidad (HA) ** ** y ** ** se centran en diferentes riesgos. La alta disponibilidad ** , ** , impulsada por SafeKit , proporciona un mecanismo de conmutación por error en tiempo real para mantener las aplicaciones accesibles durante interrupciones del servidor o fallos de hardware. Por el contrario, una solución de copia de seguridad ** ** actúa como un archivo histórico. Mientras que la alta disponibilidad garantiza una disponibilidad del sistema del 99,99 % mediante la replicación de datos en tiempo real, la copia de seguridad se centra en la integridad de los datos, proporcionando los puntos de restauración necesarios para recuperarse de errores lógicos, eliminaciones accidentales o ataques de ransomware.

### ¿La alta disponibilidad sustituye a una estrategia de copia de seguridad? {#ha-vs-backup-ransomware}

No, la alta disponibilidad y las copias de seguridad son complementarias, no intercambiables. Si bien ** SafeKit ** garantiza la continuidad del negocio ** ** al mantener las aplicaciones en funcionamiento durante una falla de hardware, no protege contra errores lógicos, eliminaciones accidentales o ataques de ransomware. Por ejemplo, debido a que la replicación en tiempo real refleja cada cambio instantáneamente, un ataque de ransomware en el nodo principal se duplicará inmediatamente en el nodo secundario. Para recuperarse de tales amenazas cibernéticas o eliminaciones accidentales, necesita una solución de copia de seguridad ** ** dedicada con una política de retención sólida. Esto le permite "revertir" su entorno a un estado saludable anterior a que ocurriera la corrupción.

### Optimización de RTO y RPO: La sinergia entre HA y Backup {#ha-backup-rpo-rto}

Para construir una infraestructura verdaderamente resiliente, debe integrar tanto la alta disponibilidad como la copia de seguridad en una estrategia unificada. Estas dos tecnologías abordan diferentes dimensiones de la ecuación [ RTO (Objetivo de Tiempo de Recuperación) y RPO (Objetivo de Punto de Recuperación) ](</es/best-practises/what-is-rpo-and-rto-with-examples/>) : 

  * Alta disponibilidad ** (a través de SafeKit ): ** Objetivos ** Recuperación instantánea ** . Al mantener una mirror activa y síncrona de su entorno, SafeKit logra un RTO casi nulo y un RPO cero. Si un servidor falla, la aplicación se reanuda en el nodo secundario inmediatamente, lo que garantiza que no haya interrupción del servicio ni pérdida de datos durante la transición.
  * Soluciones de respaldo ** : Destino ** Resiliencia de datos ** ** . Mientras que la alta disponibilidad mantiene el servicio activo, el respaldo crea un historial inmutable. Es su respaldo en caso de que los datos en vivo se vean comprometidos, lo que le permite restaurar una versión limpia de su base de datos desde un punto específico en el tiempo antes de que ocurriera un virus o una eliminación accidental.


## Comparación de arquitecturas HADR: redes rápidas frente a redes lentas {#hadr-architectures-comparison}

Criterios | Red rápida (LAN/VLAN) | Red lenta (WAN)  
---|---|---  
Alcance principal | Redundancia local y alta disponibilidad | Recuperación ante desastres de sitio a sitio  
Caso de uso | Mismo centro de datos o campus | Centros de datos remotos o regiones en la nube  
Tipo de replicación | Síncrona (tiempo real) | Asíncrona / Copia de seguridad  
RPO (Pérdida de datos) | Cero (RPO = 0) | Posible pérdida de datos (RPO > 0)  
Proceso de conmutación por error | Automático | Manual (Decisión del administrador)  
Redireccionamiento de tráfico | Dirección IP virtual (VIP) | Nivel DNS (dependiente de TTL)  
Requisito de latencia | Baja (normalmente < 5 ms) | Admite alta latencia  
Objetivo principal de recuperación | Continuidad inmediata del negocio | Seguridad y retención de datos  
  
## Guía en vídeo: Cómo implementar HADR con SafeKit {#videoguide-hadr-safekit}

###  Cómo implementar HADR con SafeKit : replicación síncrona y conmutación por error {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Aprenda a combinar la alta disponibilidad (HA) ** ** ) y la recuperación ante desastres (DR) ** ** ) en una única estrategia HADR mediante SafeKit . Esta guía en vídeo explora la arquitectura necesaria para lograr un tiempo de actividad del 100 % en las aplicaciones sin necesidad de discos compartidos.

### Vídeo destacado {#video-highlights}

  1. 🎬 [ Introducción a SafeKit HADR sobre VLAN extendidas ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [ Cómo funciona la duplicación síncrona y el doble acuse de recibo (1:41) ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. 🎬 Mecanismos de conmutación por error [ : ARP gratuito (GARP) e IP virtual ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [ Diseño para WAN lentas: HA vs. Estrategias de respaldo ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### Vídeo SafeKit : Cómo implementar alta disponibilidad y recuperación ante desastres (HADR) con SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}