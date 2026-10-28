---
title: "¿Qué son RPO y RTO? Definiciones, ejemplos y estrategias de alta disponibilidad."
canonical: "https://safekit.eviden.com/es/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Aprenda las definiciones de RPO (Objetivo de Punto de Recuperación) y RTO (Objetivo de Tiempo de Recuperación) con ejemplos claros. Descubra cómo SafeKit logra cero pérdida de datos (RPO=0) y una conmutación por error rápida para garantizar la continuidad del negocio las 24 horas del día, los 7 días de la semana."
category: "best-practises"
lang: "es"
topics: "Resumen rápido: RPO vs. RTO, Tabla de contenido, ¿Cómo calculo el RPO y el RTO para una solución de alta disponibilidad y continuidad del negocio?, ¿Cómo determino el RPO y el RTO para una solución de copia de seguridad y recuperación ante desastres?, ¿Cómo logra un clúster SafeKit Mirror un RPO cero y un RTO bajo?, ¿Cuáles son los puntos de referencia de RTO para un clúster SafeKit `Farm` con balanceo de carga?, Tablas comparativas: RTO vs. RPO, Alta disponibilidad en acción: demostraciones en tiempo real de RPO cero y RTO casi cero, Preguntas frecuentes: Optimización de RPO y RTO para la continuidad del negocio, 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# ¿Qué son RPO y RTO? Definiciones, ejemplos y estrategias de alta disponibilidad {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Resumen rápido: RPO vs. RTO {#article-summary}

  * ** RPO (Objetivo de punto de recuperación): ** Mide la pérdida de datos ** ** . Define la antigüedad máxima de los archivos que deben recuperarse para que se reanuden las operaciones.
  * ** RTO (Objetivo de Tiempo de Recuperación): ** Mide el tiempo de inactividad ** ** . Es la duración del tiempo dentro del cual se debe restaurar un proceso de negocio.
  * ** La diferencia clave: ** RPO se refiere al almacenamiento/copias de seguridad ** ** , mientras que RTO se refiere a la velocidad de recuperación/conmutación por error ** ** .
  * ** SafeKit Capacidad: ** Ofrece ** 0 RPO ** (sin pérdida de datos) y ** bajo RTO ** (reinicio rápido) a través de replicación síncrona y conmutación por error automática.


![ Un cuadro comparativo de RPO (Objetivo de Punto de Recuperación) y RTO (Objetivo de Tiempo de Recuperación), que ilustra cómo SafeKit logra cero pérdida de datos y un reinicio rápido de la aplicación. ](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

** RPO vs. RTO: Comparación de la pérdida de datos y el tiempo de recuperación en SafeKit **

## Tabla de contenido {#table-of-contents}

  * [ ¿Cómo calculo el RPO y el RTO para una solución de alta disponibilidad y continuidad del negocio? ](#calculate-rpo-rto-high-availability)
  * [ ¿Cómo determino el RPO y el RTO para una solución de copia de seguridad y recuperación ante desastres? ](#calculate-rpo-rto-backup-solution)
  * [ ¿Cómo logra un clúster SafeKit Mirror un RPO cero y un RTO bajo? ](#rpo-rto-safekit-mirror-cluster)
  * [ ¿Cuáles son los parámetros de referencia de RTO para un clúster SafeKit `Farm` con balanceo de carga? ](#rpo-rto-safekit-farm-cluster)
  * Tablas comparativas [ : RTO vs RPO ](#rpo-vs-rto-comparison)
  * [ Alta disponibilidad en acción: demostraciones en tiempo real de RPO cero y RTO casi cero ](#safekit-rpo-rto-video-demos)
  * [ Preguntas frecuentes sobre RPO y RTO ](#faq-rpo-rto)
  * [ SafeKit Centro de navegación de alta disponibilidad ](#hub)



{{%  insert-safekit-4-buttons-es  %}}
 

## ¿Cómo calculo el RPO y el RTO para una solución de alta disponibilidad y continuidad del negocio? {#calculate-rpo-rto-high-availability}

### ¿Qué es la alta disponibilidad? {#what-is-high-availability}

** Alta disponibilidad (HA) ** es una arquitectura técnica diseñada para garantizar que un sistema permanezca operativo y accesible durante un porcentaje de tiempo específico (por ejemplo, 99,99%).


![ SafeKit Logotipo de software de alta disponibilidad que representa la agrupación en clústeres sin SAN y la replicación síncrona ](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Para alcanzar los objetivos de RPO y RTO definidos en un Plan de Continuidad del Negocio ** ** , la alta disponibilidad se implementa normalmente a través de dos arquitecturas principales:

  * ** Sistema de disco compartido sobre una SAN: ** Un clúster tradicional donde 2 nodos están conectados a una red de área de almacenamiento (SAN) central. Si un nodo falla, el otro toma el acceso a los datos compartidos.
  * ** Replicación síncrona sin SAN: ** Una arquitectura moderna "sin recursos compartidos" —implementada por el software [ SafeKit ](</> "SafeKit High Availability Software") donde los datos se replican en tiempo real entre discos locales de 2 nodos independientes, eliminando la necesidad de una SAN.


### ¿Cuál es el RPO de una solución de alta disponibilidad? {#what-is-rpo-high-availability}

** RPO (Objetivo de punto de recuperación) ** define el volumen máximo tolerable de pérdida de datos medido en tiempo. Para una verdadera solución de alta disponibilidad ** ** , el RPO objetivo es ** cero ** .

Al implementar un clúster de alta disponibilidad con conmutación por error automática, un RPO cero ** ** garantiza que la aplicación se reinicie sin pérdida de datos.

  * Sistema de disco compartido ** sobre una SAN: ** Debido a que ambos nodos acceden a los ** mismos bloques físicos de datos ** , no hay "delta" ni retraso entre los nodos, lo que garantiza una consistencia total de los datos durante una conmutación por error.
  * ** Replicación síncrona basada en software: ** Un enfoque sin SAN donde cada operación de "escritura" se refleja en tiempo real a través de la red. La aplicación solo recibe una confirmación de escritura ** ** una vez que los datos se almacenan de forma segura en ambos nodos. Este proceso síncrono de "doble escritura" garantiza ** cero pérdida de datos ** incluso si el servidor principal falla.


### ¿Cuál es el RTO de una solución de alta disponibilidad? {#what-is-rto-high-availability}

** ** ** ** debe ser mínimo para garantizar el acceso continuo a las aplicaciones críticas.

Para lograr un RTO bajo, una solución de alta disponibilidad utiliza la conmutación por error automática ** ** para detectar fallos de hardware o software y reiniciar la aplicación inmediatamente. En un clúster de alta disponibilidad típico, el RTO ** es de aproximadamente un minuto ** , calculado como:

  * Tiempo de detección de fallos ** : El intervalo necesario para que el sistema identifique una pérdida de latido ** un nodo o aplicación.
  * Tiempo de reinicio automático ** : Tiempo necesario para que los servicios ** la aplicación se inicialicen en el nodo superviviente.


## ¿Cómo determino el RPO y el RTO para una solución de copia de seguridad y recuperación ante desastres? {#calculate-rpo-rto-backup-solution}

### ¿Qué es una solución de copia de seguridad? {#what-is-backup}

Una solución de respaldo ** ** es una estrategia de protección de datos diseñada para crear copias periódicas de datos en un dispositivo de almacenamiento secundario o en la nube. A diferencia de la alta disponibilidad, el respaldo se centra en la retención de datos a largo plazo ** ** y la recuperación ante la corrupción de datos o desastres en todo el sitio.


![ Icono de solución de copia de seguridad que representa una arquitectura de copia de seguridad para la retención de datos a largo plazo ](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Para cumplir con los objetivos de RPO y RTO definidos en un Plan de Recuperación ante Desastres ** ** , la copia de seguridad se implementa normalmente a través de dos métodos principales:

  * Instantáneas programadas ** : Un proceso donde se toman copias puntuales de datos a intervalos fijos ( ** ** ** que cualquier dato modificado entre la última instantánea y el fallo se pierde.
  * ** Recuperación externa o en la nube: ** Una arquitectura donde los datos se almacenan en una ubicación física separada. Si bien esto garantiza la supervivencia de los datos, resulta en un ** ** alto porque los datos deben transferirse y restaurarse antes de que la aplicación pueda reiniciarse.


### ¿Cuál es el RPO de una solución de copia de seguridad? {#what-is-rpo-backup}

El RPO (Objetivo de Punto de Recuperación) ** en un contexto de copia de seguridad define la antigüedad de los archivos que deben recuperarse del almacenamiento para que se reanuden ** operaciones normales. A diferencia de la alta disponibilidad, una solución de copia de seguridad ** ** generalmente implica un RPO distinto de cero, que representa el tiempo transcurrido desde que se completó con éxito la última copia de seguridad. 

La cantidad de pérdida de datos en una estrategia de copia de seguridad está determinada por la frecuencia de copia de seguridad ** ** . Dependiendo de la arquitectura, este RPO puede variar desde minutos hasta 24 horas: 

  * Instantáneas ** ** : Un método en el que solo se guardan los bloques de datos modificados a intervalos establecidos. Si se realiza una copia de seguridad cada 4 horas, el RPO máximo ** es de 4 horas ** , lo que significa que cualquier dato creado entre la última instantánea y el fallo del sistema se pierde permanentemente. 
  * Copias de seguridad completas diarias: Un enfoque tradicional donde se realiza una copia completa de los datos una vez ** día (normalmente durante la noche). Esto da como resultado un ** ** 24 horas, que puede ser aceptable para datos no críticos ** pero suele ser insuficiente para bases de datos transaccionales. 


### ¿Cuál es el RTO de una solución de copia de seguridad? {#what-is-rto-backup}

El RTO (Objetivo ** ** una estrategia de copia de seguridad es el tiempo que se tarda en restaurar los datos desde un medio de copia de seguridad y devolver la aplicación a un estado operativo. A diferencia de la alta disponibilidad, el RTO ** para la copia de seguridad ** es significativamente mayor porque implica procesos de restauración manuales o mediante scripts. 

Para una solución de respaldo, el RTO ** puede variar desde varias horas hasta días ** , dependiendo del volumen de datos y la arquitectura de recuperación. El tiempo total de inactividad se calcula de la siguiente manera: 

  * Tiempo de transferencia de datos ** : Tiempo necesario para mover los datos desde el almacenamiento de respaldo (discos locales, cintas o nube) de vuelta al servidor ** producción. 
  * ** Tiempo de reconfiguración del sistema: ** El intervalo necesario para importar los datos a la aplicación, reconstruir los índices y verificar la integridad de los datos antes de que los usuarios puedan volver a iniciar sesión. 


## ¿Cómo logra un clúster SafeKit Mirror un RPO cero y un RTO bajo? {#rpo-rto-safekit-mirror-cluster}

### ¿Qué es el clúster SafeKit Mirror ? {#what-is-safekit-mirror-cluster}

El clúster ** SafeKit Mirror ** es una solución de alta disponibilidad basada en software que implementa una arquitectura de "recursos compartidos nulos". A diferencia de los clústeres tradicionales que requieren una SAN costosa, SafeKit utiliza los recursos locales de dos servidores estándar para crear un entorno altamente resiliente.


![ SafeKit Mirror Arquitectura de clúster que muestra la replicación de archivos a nivel de byte en tiempo real entre nodos primarios y secundarios ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Para garantizar el máximo tiempo de actividad y la protección de datos dentro de su Plan de Continuidad Empresarial ** ** , el clúster SafeKit mirror opera a través de dos mecanismos integrados:

  * Replicación síncrona en tiempo real ** : ** SafeKit replican los datos a través de la red entre los discos locales de los nodos primario y secundario. Esto garantiza un RPO (Objetivo de Punto de Recuperación) de cero, ya que cada byte de datos se almacena de forma segura en ambos servidores antes de que se finalice una transacción.
  * ** Conmutación por error automática de IP y aplicación: ** Si el nodo principal falla, SafeKit detecta automáticamente la pérdida de la señal de latido y restablece la aplicación y su dirección IP virtual en el nodo secundario. Esto resulta en un RTO de aproximadamente un minuto, lo que proporciona una continuidad de servicio ininterrumpida.


### ¿Cuál es el RPO de un clúster SafeKit Mirror ? {#rpo-safekit-example}

El RPO ** de un clúster SafeKit mirror es cero ** porque la replicación de datos entre nodos es [ síncrona y en tiempo real ](</es/best-practises/synchronous-replication-vs-asynchronous-replication/> "Synchronous vs Asynchronous Replication") .

Esta garantía de cero pérdida de datos se logra mediante un proceso de acuse de recibo de escritura ** ** : una escritura en disco solo se confirma a la aplicación una vez que se ha escrito correctamente en los discos locales de los nodos primario y secundario.

En cambio, con la replicación asíncrona ** ** , el RPO es mayor que cero. Debido a que existe un retraso entre la escritura primaria y la actualización secundaria, un fallo provocará la pérdida de datos durante la conmutación por error al servidor secundario. Para la continuidad del negocio de misión crítica ** ** , la replicación síncrona es la única forma de garantizar que la aplicación se reinicie con una integridad de datos del 100 %.

### ¿Cuál es el RTO de un clúster SafeKit Mirror ? {#what-is-rto-safekit}

En una configuración estándar, el ** de un clúster es aproximadamente un minuto. Ofrece la flexibilidad de implementar alta disponibilidad a nivel de ** ** a nivel de máquina ** , ** SafeKit mirror SafeKit ** afecta el tiempo de recuperación de manera diferente: 

  * ** HA a nivel de aplicación: ** Este es el enfoque optimizado SafeKit donde el software monitorea servicios de aplicación específicos. 
    * ** Fallo de hardware: ** RTO = _tiempo de espera del latido_ (predeterminado 30 s) + _tiempo de reinicio de la aplicación_.
    * ** Fallo de software: ** RTO = _tiempo de detención de la aplicación_ \+ _tiempo de reinicio de la aplicación_.
    * ** Beneficio clave: ** Dado que el sistema operativo ya se está ejecutando en el nodo secundario, no hay retraso en el arranque del sistema operativo, lo que resulta en la recuperación más rápida posible para la continuidad del negocio ** ** .
  * ** HA a nivel de máquina virtual: ** En este escenario, SafeKit protege todo el entorno de la máquina virtual. 
    * Recuperación de fallos ** : RTO ** = _detección ** ** + Tiempo de reinicio de la aplicación_.
    * ** Compromiso técnico: ** El RTO es naturalmente más largo (varios minutos) porque el nodo secundario debe realizar un arranque en frío completo del sistema operativo antes de que la aplicación pueda siquiera comenzar a inicializarse.


Al utilizar la alta disponibilidad a nivel de aplicación ** ** , SafeKit elimina la "penalización por reinicio" inherente a la virtualización estándar, lo que garantiza que su Plan de Continuidad del Negocio ** ** logre el menor tiempo de inactividad posible. 

## ¿Cuáles son los valores de referencia de RTO para un clúster SafeKit `Farm` con balanceo de carga? {#rpo-rto-safekit-farm-cluster}

### ¿Qué es el clúster SafeKit `Farm` ? {#what-is-safekit-farm-cluster}

El clúster ** SafeKit `Farm` ** es una solución de alta disponibilidad basada en software diseñada para aplicaciones sin estado (como servidores web) que requieren tanto escalabilidad ** ** como redundancia ** ** . A diferencia de un clúster mirror que se centra en la replicación de datos, un clúster `farm` distribuye el tráfico entrante entre varios nodos activos.


![ SafeKit Farm Arquitectura de clúster que demuestra el equilibrio de carga de red y la conmutación por error para aplicaciones sin estado ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Para mantener la continuidad del negocio ** ** en entornos de alto tráfico, el clúster SafeKit `farm` opera a través de dos mecanismos principales:

  * Balanceo de carga de red ** : ** SafeKit utiliza una dirección IP virtual para distribuir el tráfico de red entrante entre un `farm` de múltiples servidores activos. Esto garantiza que ningún servidor se sature y maximiza el rendimiento de la aplicación.
  * Detección y reconfiguración automática de fallos ** ** : Si un nodo en `farm` falla, SafeKit detecta el fallo mediante señales de latido y redistribuye inmediatamente su tráfico entre los nodos restantes que funcionan correctamente. Esto proporciona un tiempo de recuperación casi nulo para el servicio en general, ya que otros nodos ya están activos y listos para absorber la carga.


### ¿Cuál es el RPO de un clúster SafeKit `Farm` ? {#what-is-rpo-safekit-farm}

El RPO (Objetivo ** Punto ** ** un clúster ** SafeKit `Farm` se considera generalmente ** No aplicable (N/A) ** . Esto se debe ** que un clúster `farm` está diseñado específicamente para aplicaciones sin estado ** donde los datos no se almacenan localmente en los nodos. 

Dado que un clúster `farm` se centra en el equilibrio de carga de red ** ** en lugar de la sincronización de datos, no hay replicación de datos entre los nodos dentro del propio clúster. En un plan de continuidad empresarial ** ** típico que involucra una arquitectura `farm` : 

  * Operaciones sin estado ** : ** Todos los nodos en `farm` son idénticos y no almacenan datos persistentes; por lo tanto, no hay "pérdida de datos" que medir durante una falla de nodo. 
  * ** Almacenamiento de datos externo: ** Si la aplicación requiere persistencia de datos, generalmente se maneja mediante un backend separado ** SafeKit Mirror Cluster ** donde el RPO sería entonces cero. 


### ¿Cuál es el RTO de un clúster SafeKit `Farm` ? {#rto-example-safekit-farm-cluster}

En una arquitectura `farm` , el RTO ** se reduce a tan solo unos segundos ** porque todos los nodos suelen estar activos simultáneamente. El tiempo de recuperación está determinado por la velocidad a la que el clúster reconfigura su distribución de tráfico:

  * ** Fallo de hardware: ** El RTO es igual al _tiempo de espera de detección de fallos_ en todos los canales de monitorización (el valor predeterminado es de unos segundos). Una vez detectada la pérdida de latido, los filtros de equilibrio de carga de IP virtual ** ** se reconfiguran automáticamente para redirigir el tráfico a los nodos que siguen funcionando correctamente.
  * ** Fallo de software o reinicio planificado: ** El RTO se calcula como el _tiempo de detención de la aplicación_ más el _tiempo de reinicio de la aplicación_ en ese nodo específico, durante el cual los demás nodos en `farm` continúan manejando todo el tráfico entrante.


Este mecanismo "Activo-Activo" garantiza que, para los servicios sin estado, el impacto de la continuidad del negocio ** ** sea prácticamente imperceptible para el usuario final, ya que no es necesario inicializar el servicio en un nuevo nodo de reserva.

## Tablas comparativas: RTO vs RPO {#rpo-vs-rto-comparison}

Definición semántica ** : RTO vs. RPO **

Métrica | Acrónimo | Definición | Área de enfoque  
---|---|---|---  
Objetivo de tiempo de recuperación (RTO) | | Duración objetivo del tiempo necesario para restaurar un proceso de negocio tras un fallo. | Disponibilidad / Tiempo de inactividad  
Objetivo de punto de recuperación | RPO | La antigüedad máxima de los archivos que deben recuperarse de la copia de seguridad para que se reanuden las operaciones. | Pérdida/Integridad de datos  
  
** Alta disponibilidad (HA) frente a copia de seguridad estándar **

Características | Soluciones de respaldo | Alta disponibilidad ( SafeKit )  
---|---|---  
Automatización de recuperación | Intervención manual | Conmutación por error automática  
Tiempo de respuesta objetivo (RTO) | horas a días); | segundos a aproximadamente 1 minuto).  
RPO objetivo | > 0 (último punto de copia de seguridad) | 0 (replicación síncrona)  
  
Puntos de referencia de RTO y RPO para clústeres ** SafeKit **

Arquitectura | Caso de uso | RTO (Disponibilidad) | RPO (Pérdida de datos)  
---|---|---|---  
Clúster Mirror Replicación en tiempo real | ~1 min (Latido + Reinicio) | 0 (Sin | de datos)  
Clúster `Farm` Balanceo de | | | A (Sin estado)  
  
## Alta disponibilidad en acción: demostraciones en tiempo real de RPO cero y RTO casi cero {#safekit-rpo-rto-video-demos}

### Vídeo: Lograr un RPO cero y un RTO bajo en un clúster SafeKit Mirror (8:47) {#demo-mirror-cluster-rpo-rto}

Vea cómo SafeKit gestiona un fallo crítico. Este vídeo muestra la replicación síncrona ** ** que garantiza que no se pierdan datos (RPO 0) en una base de datos SQL y el reinicio automático ** ** de los servicios en el nodo secundario (RTO bajo).


#### Capítulos {#chapters}

  1. 🎬 [ 2 nodos con SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Configurar el clúster y el módulo mirror.safe ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Iniciar y probar la replicación SQL, migración, conmutación por error en caso de fallo ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

Prueba gratuita aquí [ ](</es/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Vídeo: Lograr un RTO casi nulo en un clúster SafeKit `Farm` (5:03) {#demo-farm-cluster-rpo-rto}

Observa cómo SafeKit gestiona un servidor web Apache `farm` para proporcionar escalabilidad de rendimiento y conmutación por error instantánea.

#### Capítulos {#chapters-1}

  1. 🎬 [ 2 nodos con Apache ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [ Configurar el clúster y el módulo farm.safe ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [ Iniciar y probar el balanceo de carga de red, conmutación por error en caso de fallo ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

Prueba gratuita aquí [ ](</es/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## Preguntas frecuentes: Optimización de RPO y RTO para la continuidad del negocio {#faq-rpo-rto}

### ¿Pueden RPO y RTO ser cero? {#can-rpo-rto-be-zero}

** Sí. ** Lograr un ** RPO cero ** significa que no hay pérdida de datos, lo cual es posible a través de la replicación de datos síncrona. Un ** RTO casi cero ** se logra a través de software de conmutación por error automatizado como SafeKit , que detecta fallas y reinicia las aplicaciones en un nodo secundario en segundos o minutos.

### ¿Qué es más importante: RPO o RTO? {#importance-rpo-vs-rto}

Ninguno es intrínsecamente más importante; cumplen funciones diferentes. El RPO (Objetivo de Punto de Recuperación) ** el RTO (Objetivo de Tiempo de Recuperación) ** se centran en la pérdida de datos: cuántos datos se pueden permitir perder. El RTO (Objetivo de Tiempo de Recuperación) ** el RTO (Objetivo de Tiempo de Recuperación) ** se centran en el tiempo de inactividad: con qué rapidez se debe volver a estar en línea. Para aplicaciones de misión crítica, ambos deben minimizarse.

### ¿Cuál es la diferencia en RPO y RTO entre SafeKit a nivel de aplicación y a nivel de máquina virtual? {#safekit-application-vs-vm-level}

Si bien ambos garantizan un RPO de ** ** replicación síncrona, difieren en el tiempo de recuperación:

  * Nivel de aplicación ** : ** RTO más rápido (aprox. 1 min) porque solo se reinician los servicios de la aplicación en un sistema operativo que ya está en ejecución. También detecta fallos específicos de software/procesos.
  * Nivel de máquina virtual ** : ** Mayor tiempo de recuperación (RTO) porque toda la máquina virtual debe reiniciarse en el host secundario. Si bien es independiente de la aplicación, carece de una supervisión granular de los procesos de la aplicación en sí.


### ¿Cuál es la diferencia entre las soluciones de alta disponibilidad (HA) y las de respaldo en términos de RTO? {#ha-vs-backup-rto}

La alta disponibilidad (HA) suele ofrecer un RTO mucho menor (de segundos a minutos) porque gestiona automáticamente los fallos locales. La recuperación ante desastres con soluciones de copia de seguridad (DR) suele tener un RTO mayor (de horas a días) porque implica la recuperación de datos y servicios en una ubicación geográficamente distante tras una catástrofe importante.

### ¿Cómo puedo lograr el mejor RPO y RTO entre sitios remotos? {#rpo-rto-between-remote-sites}

Lograr un RPO cero ** ** y un RTO casi cero ** ** en sitios remotos requiere una combinación de replicación síncrona ** ** y una LAN extendida (VLAN estirada) ** ** :

  * ** LAN extendida / VLAN estirada: ** Al extender la misma subred (capa 2) a través de dos centros de datos, puede mover una aplicación del sitio A al sitio B sin cambiar su dirección IP, evitando actualizaciones DNS complejas.
  * ** La solución SafeKit : ** SafeKit aprovecha esto al proporcionar una IP virtual (VIP) definida por software ** ** que flota entre sitios. Reenvía instantáneamente el tráfico al sitio secundario usando ARP gratuito (GARP).


Esto proporciona un RPO = 0 ** ** (replicación en tiempo real) y un RTO mínimo ** ** (conmutación por error en aproximadamente 1 minuto) sin intervención humana.

### ¿Por qué es esencial combinar alta disponibilidad y copias de seguridad para optimizar el RPO y el RTO? {#combining-ha-and-backup-for-rpo-rto}

Combinar la alta disponibilidad (HA) con una solución de respaldo es la única manera de lograr una estrategia de recuperación que combine lo mejor de ambos mundos. Si bien a menudo se las analiza juntas, resuelven diferentes partes de la ecuación RPO/RTO:

  * Alta disponibilidad ** (a través de SafeKit ): ** optimiza el RTO para lograr un RPO y un RTO prácticamente nulos ante fallos de hardware o software. Mediante la replicación síncrona en tiempo real, el servidor secundario se mantiene siempre actualizado. Si el servidor principal falla, el servicio se reinicia inmediatamente en el secundario sin pérdida de datos.
  * Soluciones de respaldo ** : ** Protege contra problemas de integridad de datos (como ransomware o eliminación accidental). Gracias a que HA replica los cambios al instante, replicará fielmente un virus o un registro de base de datos eliminado en el servidor de respaldo. Una copia de seguridad le permite recuperar información a un punto anterior a la corrupción.
  * ** El enfoque híbrido: ** Para una máxima resiliencia, las organizaciones utilizan una arquitectura híbrida de 3 nodos ** ** . Esta incluye un clúster local de 2 nodos con replicación síncrona para HA inmediata y una tercera copia remota (asíncrona) para recuperación ante desastres. Esta defensa en capas garantiza que usted tenga una copia "en vivo" para recuperación instantánea y una copia "histórica" para la seguridad de los datos.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}