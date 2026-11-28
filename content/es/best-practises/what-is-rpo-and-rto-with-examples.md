---
title: "¿Qué son RPO y RTO? Definiciones y ejemplos"
canonical: "https://safekit.eviden.com/es/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Qué significan RPO y RTO, con ejemplos, y cómo SafeKit logra cero pérdida de datos (RPO 0) y una conmutación por error automática rápida para la continuidad del negocio."
category: "best-practises"
lang: "es"
topics: "Resumen rápido: RPO vs. RTO, Índice, ¿Cómo calculo RPO y RTO para una solución de alta disponibilidad y continuidad del negocio?, ¿Cómo determino RPO y RTO para una solución de copia de seguridad y recuperación ante desastres?, ¿Cómo consigue un clúster mirror SafeKit RPO de cero y RTO bajo?, ¿Cuáles son los valores de referencia RTO para un clúster farm SafeKit con equilibrio de carga?, Tablas comparativas: RTO vs. RPO, Alta disponibilidad en acción: demostraciones en tiempo real de cero pérdida de datos y tiempo de inactividad casi nulo, Preguntas frecuentes: Optimización del RPO y el RTO para la continuidad del negocio"
hashpart: "article-summary, table-of-contents, calculate-rpo-rto-high-availability, calculate-rpo-rto-backup-solution, rpo-rto-safekit-mirror-cluster, rpo-rto-safekit-farm-cluster, rpo-vs-rto-comparison, safekit-rpo-rto-video-demos, faq-rpo-rto"
translation: "translate_md 2026-11-20.9 | glossaire 2026-11-20.24 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg"
schemaType: "TechArticle"
schemaFaq: [{"question": "¿Pueden RPO y RTO ser cero?", "answer": "**Sí.** Lograr un **RPO de cero** significa no perder datos, lo cual es posible mediante la duplicación de datos síncrona. Un **RTO cercano a cero** se logra mediante un software de conmutación por error automatizado como SafeKit, que detecta fallos y reinicia las aplicaciones en un nodo secundario en cuestión de segundos o minutos."}, {"question": "¿Qué es más importante: RPO o RTO?", "answer": "Ninguno es inherentemente más importante; desempeñan funciones diferentes. **RPO (Recovery Point Objective u Objetivo de Punto de Recuperación)** se centra en la pérdida de datos: cuántos datos puede permitirse perder. **RTO (Recovery Time Objective u Objetivo de Tiempo de Recuperación)** se centra en el tiempo de inactividad: la rapidez con la que debe volver a estar en línea. Para las aplicaciones de misión crítica, ambos deben minimizarse."}, {"question": "¿En qué se diferencian RPO y RTO entre la alta disponibilidad (HA) a nivel de aplicación y la HA a nivel de máquina virtual con SafeKit?", "answer": "Aunque ambas garantizan un **RPO de 0** mediante replicación síncrona, difieren en el tiempo de recuperación:\r\n\r\n  * **Nivel de aplicación:** RTO más rápido (aprox. 1 min) porque solo los servicios de la aplicación se reinician en un sistema operativo que ya está en funcionamiento. También detecta fallos específicos de software/procesos.\r\n  * **Nivel de VM:** RTO más alto porque toda la máquina virtual debe reiniciarse en el host secundario. Aunque es independiente de la aplicación, carece de supervisión granular de los propios procesos de la aplicación."}, {"question": "¿Cuál es la diferencia entre las soluciones de alta disponibilidad y las de copia de seguridad en términos de RTO?", "answer": "La alta disponibilidad (HA) normalmente ofrece un RTO mucho más bajo (de segundos a minutos) porque gestiona los fallos locales de forma automática. La recuperación ante desastres (DR) con soluciones de copia de seguridad suele tener un RTO más alto (de horas a días) porque implica la recuperación de datos y servicios en un sitio geográficamente distante después de una catástrofe importante."}, {"question": "¿Cómo consigo el mejor RPO y RTO entre sitios remotos?", "answer": "Lograr un **RPO cero** y **RTO cercano a cero** en sitios remotos requiere una combinación de **replicación síncrona** y una **LAN extendida (VLAN extendida)**:\r\n\r\n  * **LAN extendida / VLAN extendida:** Al extender la misma subred (capa 2) a través de dos centros de datos, puede mover una aplicación del sitio A al sitio B sin cambiar su dirección IP, evitando actualizaciones complejas de DNS.\r\n  * **La solución SafeKit:** SafeKit aprovecha esto al proporcionar una **IP virtual (VIP) definida por software** que se mueve entre sitios. Redirige instantáneamente el tráfico al sitio secundario utilizando ARP gratuito (GARP).\r\n\r\n\r\nEsto proporciona un **RPO = 0** (duplicación en tiempo real) y un **RTO mínimo** (conmutación por error en aproximadamente 1 minuto) sin intervención humana."}, {"question": "¿Por qué es esencial combinar la alta disponibilidad y las copias de seguridad para optimizar RPO y RTO?", "answer": "La combinación de alta disponibilidad (HA) con una solución de copia de seguridad es la única manera de lograr una estrategia de recuperación que ofrezca lo mejor de ambos mundos. Aunque a menudo se discuten juntos, resuelven diferentes partes de la ecuación RPO/RTO:\r\n\r\n  * **Alta disponibilidad (a través de SafeKit):** Ofrece un RTO cercano a cero y un RPO de cero durante fallos de hardware o software. Al usar la replicación síncrona en tiempo real, el servidor secundario siempre está actualizado. Si el primario falla, el servicio se reinicia en el secundario inmediatamente sin pérdida de datos.\r\n  * **Soluciones de copia de seguridad:** las copias de seguridad protegen contra problemas de integridad de datos (como el ransomware o la eliminación accidental). Debido a que la alta disponibilidad replica los cambios al instante, replicará \"fielmente\" un virus o un registro de base de datos eliminado en el servidor en espera. Una copia de seguridad le permite \"volver en el tiempo\" a un punto anterior a la corrupción.\r\n  * **El enfoque híbrido:** Para una máxima resiliencia, las organizaciones utilizan una **arquitectura híbrida de 3 nodos**. Esto incluye un clúster local de 2 nodos con replicación síncrona para alta disponibilidad inmediata, y una tercera copia remota (asíncrona) para la recuperación ante desastres. Esta defensa en capas garantiza que tenga una copia \"activa\" para la recuperación instantánea y una copia \"histórica\" para la seguridad de los datos."}]
---

# ¿Qué son RPO y RTO? Definiciones y ejemplos {#what-are-rpo-and-rto-definitions-and-examples}

## Resumen rápido: RPO vs. RTO {#article-summary}

  * **RPO (Recovery Point Objective):** Mide **la pérdida de datos**. Define la antigüedad máxima de los archivos que deben recuperarse para que las operaciones se reanuden.
  * **RTO (Objetivo de tiempo de recuperación):** Mide **el tiempo de inactividad**. Es la duración del tiempo dentro del cual debe restaurarse un proceso de negocio.
  * **La diferencia clave:** RPO se refiere al **almacenamiento y las copias de seguridad**. RTO se refiere a **la recuperación y la velocidad de conmutación por error**.
  * **SafeKit:** Ofrece un **RPO de 0** (sin pérdida de datos) y un **RTO bajo** (reinicio rápido) mediante la replicación síncrona y la conmutación por error automática.


![Una tabla comparativa de RPO (Recovery Point Objective) y RTO (Recovery Time Objective), que ilustra cómo SafeKit logra la pérdida de datos cero y el reinicio rápido de la aplicación.](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO vs. RTO: Comparación de la pérdida de datos y el tiempo de recuperación en SafeKit**

## Índice {#table-of-contents}

  * [¿Cómo calculo RPO y RTO para una solución de alta disponibilidad y continuidad del negocio?](#calculate-rpo-rto-high-availability)
  * [¿Cómo determino RPO y RTO para una solución de copia de seguridad y recuperación ante desastres?](#calculate-rpo-rto-backup-solution)
  * [¿Cómo consigue un clúster mirror SafeKit RPO de cero y RTO bajo?](#rpo-rto-safekit-mirror-cluster)
  * [¿Cuáles son los valores de referencia RTO para un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit con equilibrio de carga?](#rpo-rto-safekit-farm-cluster)
  * [Tablas comparativas: RTO vs. RPO](#rpo-vs-rto-comparison)
  * [Alta disponibilidad en acción: demostraciones en tiempo real de cero pérdida de datos y tiempo de inactividad casi nulo](#safekit-rpo-rto-video-demos)
  * [Preguntas frecuentes: Optimización del RPO y el RTO para la continuidad del negocio](#faq-rpo-rto)
  * [Centro de navegación de alta disponibilidad SafeKit](#hub)



{{%  insert-safekit-4-buttons-es  %}}
 

## ¿Cómo calculo RPO y RTO para una solución de alta disponibilidad y continuidad del negocio? {#calculate-rpo-rto-high-availability}

### ¿Qué es la alta disponibilidad? {#what-is-high-availability}

**La alta disponibilidad (HA)** es una arquitectura técnica diseñada para garantizar que un sistema permanezca operativo y accesible durante un porcentaje de tiempo especificado (por ejemplo, 99,99 %).


![Logotipo del software de alta disponibilidad SafeKit que representa la replicación síncrona y la conmutación por error](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Para alcanzar los objetivos RPO y RTO definidos en un **Plan de Continuidad de Negocio**, la alta disponibilidad se implementa normalmente a través de dos arquitecturas principales:

  * **Sistema de disco compartido a través de una SAN:** un clúster tradicional en el que 2 nodos están conectados a una red de área de almacenamiento (SAN) central. Si un nodo falla, el otro asume el acceso a los datos compartidos.
  * **Replicación síncrona sin almacenamiento compartido:** una arquitectura moderna sin recursos compartidos, implementada por SafeKit. Los datos se replican en tiempo real entre los discos locales de 2 nodos independientes. No se necesita SAN.


### ¿Cuál es el RPO de una solución de alta disponibilidad? {#what-is-rpo-high-availability}

**RPO (Recovery Point Objective)** define el volumen máximo tolerable de pérdida de datos medido en tiempo. Para una verdadera **solución de alta disponibilidad**, el RPO objetivo es **cero**.

Al implementar un clúster de alta disponibilidad con conmutación por error automática, un **RPO de cero** garantiza que la aplicación se reinicie sin pérdida de datos.

  * **Sistema de disco compartido a través de una SAN:** debido a que ambos nodos acceden a los **mismos bloques físicos de datos**, no hay "delta" o retraso entre los nodos, lo que garantiza la coherencia total de los datos durante una conmutación por error.
  * **Replicación síncrona basada en software:** cada operación de "escritura" se refleja en tiempo real a través de la red. La aplicación solo recibe un **acuse de recibo de escritura** una vez que los datos se almacenan de forma segura en ambos nodos. Este proceso de "doble escritura" síncrona garantiza **la pérdida cero de datos** incluso si el servidor principal falla.


### ¿Cuál es el RTO de una solución de alta disponibilidad? {#what-is-rto-high-availability}

**RTO (Recovery Time Objective u Objetivo de Tiempo de Recuperación)** representa la duración máxima tolerable del tiempo de inactividad después de una interrupción del servicio. En el contexto de **alta disponibilidad**, el RTO debe ser mínimo para garantizar el acceso continuo a las aplicaciones críticas.

Para lograr un RTO bajo, una solución de alta disponibilidad utiliza **la conmutación por error automática** para detectar fallos de hardware o software y reiniciar la aplicación inmediatamente. En un clúster de alta disponibilidad típico, el **RTO es de aproximadamente un minuto**, calculado como:

  * **Tiempo de detección de fallos:** el intervalo necesario para que el sistema identifique la pérdida del heartbeat de un nodo o una aplicación.
  * **Tiempo de reinicio automático:** el tiempo necesario para que los servicios de la aplicación se inicialicen en el nodo superviviente.


## ¿Cómo determino RPO y RTO para una solución de copia de seguridad y recuperación ante desastres? {#calculate-rpo-rto-backup-solution}

### ¿Qué es una solución de copia de seguridad? {#what-is-backup}

Una **solución de copia de seguridad** es una estrategia de protección de datos diseñada para crear copias periódicas de datos en un dispositivo de almacenamiento secundario o en la nube. A diferencia de la alta disponibilidad, la copia de seguridad se centra en **la retención de datos a largo plazo** y la recuperación de datos dañados o desastres en todo el sitio.


![Icono de solución de copia de seguridad que representa una arquitectura de copia de seguridad para la retención de datos a largo plazo](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Para cumplir con los objetivos RPO y RTO definidos en un **Plan de Recuperación ante Desastres**, la copia de seguridad se implementa normalmente a través de dos métodos principales:

  * **Instantáneas programadas:** un proceso en el que se toman copias de datos en un momento dado a intervalos fijos (por ejemplo, diariamente). Esto define el **RPO**, ya que cualquier dato modificado entre la última instantánea y el fallo se pierde.
  * **Recuperación externa o en la nube:** una arquitectura en la que los datos se almacenan en una ubicación física separada. Si bien esto garantiza la supervivencia de los datos, da como resultado un **RTO más alto** porque los datos deben transferirse y restaurarse antes de que la aplicación pueda reiniciarse.


### ¿Qué es el RPO de una solución de copia de seguridad? {#what-is-rpo-backup}

**RPO (Recovery Point Objective)** en un contexto de copia de seguridad define la antigüedad de los archivos que deben recuperarse del almacenamiento para que se reanuden las operaciones normales. A diferencia de la alta disponibilidad, una **solución de copia de seguridad** suele implicar un RPO distinto de cero, que representa el tiempo transcurrido desde que se completó correctamente la última copia de seguridad. 

La cantidad de pérdida de datos en una estrategia de copia de seguridad está determinada por la **frecuencia de la copia de seguridad**. Dependiendo de la arquitectura, este RPO puede variar de minutos a 24 horas: 

  * **Instantáneas incrementales:** un método en el que solo se guardan los bloques de datos modificados a intervalos establecidos. Si se realiza una copia de seguridad cada 4 horas, el **RPO máximo es de 4 horas**, lo que significa que cualquier dato creado entre la última instantánea y el fallo del sistema se pierde permanentemente. 
  * **Copias de seguridad completas diarias:** un enfoque tradicional en el que se realiza una copia completa de los datos una vez al día (normalmente durante la noche). Esto da como resultado un **RPO de 24 horas**, que puede ser aceptable para datos no críticos, pero a menudo es insuficiente para bases de datos transaccionales. 


### ¿Cuál es el RTO de una solución de copia de seguridad? {#what-is-rto-backup}

**RTO (Recovery Time Objective u Objetivo de Tiempo de Recuperación)** en una estrategia de copia de seguridad es la duración del tiempo que se tarda en restaurar los datos desde un medio de copia de seguridad y devolver la aplicación a un estado operativo. A diferencia de la alta disponibilidad, el **RTO para la copia de seguridad** es significativamente más largo porque implica procesos de restauración manuales o con scripts. 

Para una solución de copia de seguridad, el RTO puede variar desde **varias horas hasta varios días**, dependiendo del volumen de datos y la arquitectura de recuperación. El tiempo de inactividad total se calcula como: 

  * **Tiempo de transferencia de datos:** el tiempo necesario para mover los datos del almacenamiento de copia de seguridad (discos locales, cintas o la nube) de vuelta al servidor de producción. 
  * **Tiempo de reconfiguración del sistema:** el intervalo necesario para extraer los datos en la aplicación, reconstruir los índices y verificar la integridad de los datos antes de que los usuarios puedan volver a iniciar sesión. 


## ¿Cómo consigue un clúster mirror SafeKit RPO de cero y RTO bajo? {#rpo-rto-safekit-mirror-cluster}

### ¿Qué es el clúster mirror SafeKit? {#what-is-safekit-mirror-cluster}

El **clúster mirror SafeKit** es una solución de alta disponibilidad basada en software que implementa una arquitectura sin recursos compartidos. A diferencia de los clústeres tradicionales que requieren una costosa SAN, SafeKit utiliza los recursos locales de dos servidores estándar para crear un entorno altamente resiliente.


![Arquitectura de clúster mirror SafeKit que muestra la replicación de archivos a nivel de byte en tiempo real entre los nodos principal y secundario](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Para garantizar el máximo tiempo de actividad y la protección de datos dentro de su **Plan de Continuidad de Negocio**, el clúster mirror SafeKit funciona a través de dos mecanismos integrados:

  * **Replicación síncrona en tiempo real:** SafeKit refleja los datos a través de la red entre los discos locales de los nodos primario y secundario. Esto garantiza que el RPO sea cero, ya que cada byte de datos se asegura en ambos servidores antes de que se finalice una transacción.
  * **Conmutación por error automática de IP y aplicaciones:** si el nodo principal falla, SafeKit detecta automáticamente la pérdida de heartbeat y restablece la aplicación y su dirección IP virtual en el nodo secundario. Esto da como resultado un RTO de aproximadamente un minuto, lo que proporciona una continuidad de servicio sin interrupciones.


### ¿Cuál es el RPO de un clúster mirror SafeKit? {#rpo-safekit-example}

El **RPO de un clúster mirror SafeKit es cero** porque la replicación de datos entre nodos es [síncrona y en tiempo real](</es/best-practises/synchronous-replication-vs-asynchronous-replication/> "Replicación síncrona vs. asíncrona").

Esta garantía de cero pérdida de datos se logra a través de un proceso **de confirmación de escritura**: una escritura en el disco solo se confirma a la aplicación una vez que se ha escrito correctamente en los discos locales de los nodos principal y secundario.

En contraste, con **la replicación asíncrona**, el RPO es mayor que cero. Debido a que existe un retraso entre la escritura primaria y la actualización secundaria, una falla resultará en la pérdida de datos durante la conmutación por error al servidor secundario. Para la **continuidad del negocio** de misión crítica, la replicación síncrona es la única forma de garantizar que la aplicación se reinicie con una integridad de datos del 100 %.

### ¿Cuál es el RTO de un clúster mirror SafeKit? {#what-is-rto-safekit}

En una configuración estándar, el **RTO de un clúster mirror SafeKit es de aproximadamente un minuto**. SafeKit ofrece la flexibilidad de implementar alta disponibilidad a **nivel de aplicación** o a **nivel de VM**. Cada opción tiene un impacto diferente en el tiempo de recuperación: 

  * **Alta disponibilidad a nivel de aplicación:** este es el enfoque optimizado utilizado por SafeKit. El software supervisa servicios de aplicaciones específicos. 
    * **Fallo de hardware:** RTO = *tiempo de espera del heartbeat* (30 s por defecto) + *tiempo de reinicio de la aplicación*.
    * **Fallo de software:** RTO = *tiempo de detención de la aplicación* + *tiempo de reinicio de la aplicación*.
    * **Beneficio clave:** Dado que el sistema operativo ya se está ejecutando en el nodo secundario, no hay retraso en el arranque del sistema operativo, lo que resulta en la recuperación más rápida posible para **la continuidad del negocio**.
  * **Alta disponibilidad a nivel de máquina virtual:** en este escenario, SafeKit protege toda la máquina virtual. 
    * **Recuperación de fallos:** RTO = *tiempo de detección de fallos* + *tiempo de reinicio del sistema operativo* + *tiempo de reinicio de la aplicación*.
    * **Compromiso técnico:** El RTO es naturalmente más largo (varios minutos) porque el nodo secundario debe realizar un arranque en frío completo del sistema operativo antes de que la aplicación pueda comenzar a inicializarse.


Al utilizar **la alta disponibilidad a nivel de aplicación**, SafeKit elimina la "penalización de reinicio" inherente a la virtualización estándar, lo que garantiza que su **Plan de Continuidad del Negocio** logre el menor tiempo de inactividad posible. 

## ¿Cuáles son los valores de referencia RTO para un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit con equilibrio de carga? {#rpo-rto-safekit-farm-cluster}

### ¿Qué es el clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#what-is-safekit-farm-cluster}

El **clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** es una solución de alta disponibilidad basada en software diseñada para aplicaciones sin estado (como servidores web) que requieren **escalabilidad** y **redundancia**. A diferencia de un clúster mirror que se centra en la replicación de datos, un clúster <span class="notranslate farm-term" translate="no">farm</span> distribuye el tráfico entrante entre varios nodos activos.


![Arquitectura de clúster farm SafeKit que demuestra el equilibrio de carga de la red y la conmutación por error para aplicaciones sin estado](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Para mantener **la continuidad del negocio** en entornos de alto tráfico, el clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit funciona a través de dos mecanismos principales:

  * **Balanceo de carga de red:** SafeKit utiliza una dirección IP virtual para distribuir el tráfico de red entrante entre una <span class="notranslate farm-term" translate="no">farm</span> de varios servidores activos. Esto garantiza que ningún servidor se vea sobrecargado y maximiza el rendimiento de la aplicación.
  * **Detección y reconfiguración automática de fallos:** Si un nodo de la <span class="notranslate farm-term" translate="no">farm</span> falla, SafeKit detecta el fallo mediante heartbeats y redistribuye inmediatamente su tráfico entre los nodos restantes en buen estado. Esto proporciona un RTO cercano a cero para el servicio general, ya que otros nodos ya están activos y listos para absorber la carga.


### ¿Cuál es el RPO de un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#what-is-rpo-safekit-farm}

El **RPO (Recovery Point Objective)** para un **clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** generalmente se considera **No aplicable (N/A)**. Esto se debe a que un clúster <span class="notranslate farm-term" translate="no">farm</span> está diseñado específicamente para **aplicaciones sin estado** en las que los datos no se almacenan localmente en los nodos. 

Dado que un clúster <span class="notranslate farm-term" translate="no">farm</span> se centra en **el equilibrio de carga de la red** en lugar de la sincronización de datos, no hay replicación de datos entre los nodos dentro del propio clúster. En un **plan de continuidad de negocio** típico que involucra una arquitectura <span class="notranslate farm-term" translate="no">farm</span>: 

  * **Operaciones sin estado:** todos los nodos de la <span class="notranslate farm-term" translate="no">farm</span> son idénticos y no contienen datos persistentes; por lo tanto, no hay "pérdida de datos" que medir durante un fallo de nodo. 
  * **Almacenamiento de datos externo:** si la aplicación requiere persistencia de datos, normalmente se gestiona mediante un **clúster mirror SafeKit** independiente en el backend. El RPO es entonces cero. 


### ¿Cuál es el RTO de un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#rto-example-safekit-farm-cluster}

En una arquitectura <span class="notranslate farm-term" translate="no">farm</span>, el **RTO se reduce a unos pocos segundos** porque todos los nodos suelen estar activos simultáneamente. El tiempo de recuperación está determinado por la velocidad a la que el clúster reconfigura su distribución de tráfico:

  * **Fallo de hardware:** El RTO es igual al *tiempo de espera de detección de fallos* en todos los canales de supervisión (el valor predeterminado es de unos pocos segundos). Una vez que se detecta la pérdida del heartbeat, los **filtros de equilibrio de carga de IP virtual** se reconfiguran automáticamente para redirigir el tráfico a los nodos sanos restantes.
  * **Fallo de software o reinicio planificado:** el RTO se calcula como el *tiempo de detención de la aplicación* más el *tiempo de reinicio de la aplicación* en ese nodo específico, durante el cual los otros nodos de la <span class="notranslate farm-term" translate="no">farm</span> continúan gestionando todo el tráfico entrante.


Este mecanismo "activo-activo" garantiza que, para los servicios sin estado, el impacto **en la continuidad del negocio** sea casi imperceptible para el usuario final, ya que no es necesario inicializar el servicio en un nuevo nodo de espera.

## Tablas comparativas: RTO vs. RPO {#rpo-vs-rto-comparison}

**Definición semántica: RTO vs. RPO**

Indicador | Acrónimo | Definición | Área de enfoque  
---|---|---|---  
Objetivo de tiempo de recuperación | RTO | La duración prevista para restaurar un proceso de negocio tras un fallo. | Disponibilidad / Tiempo de inactividad  
Objetivo de punto de recuperación | RPO | La antigüedad máxima de los archivos que deben recuperarse de la copia de seguridad para que se reanuden las operaciones. | Pérdida/integridad de datos  
  
**Alta disponibilidad (HA) vs. copia de seguridad estándar**

Característica | Soluciones de copia de seguridad | Alta disponibilidad (SafeKit)  
---|---|---  
Automatización de la recuperación | Intervención manual | Conmutación por error automática  
RTO objetivo | De horas a días | De segundos a ~1 minuto  
RPO objetivo | > 0 (Último punto de copia de seguridad) | 0 (replicación síncrona)  
  
**Parámetros de referencia RTO y RPO para clústeres SafeKit**

Arquitectura | Caso de uso | RTO (Disponibilidad) | RPO (pérdida de datos)  
---|---|---|---  
Clúster mirror | Replicación en tiempo real | ~1 min (heartbeat + reinicio) | 0 (sin pérdida de datos)  
Clúster <span class="notranslate farm-term" translate="no">farm</span> | Balanceo de carga de red | Unos pocos segundos | N/A (sin estado)  
  
## Alta disponibilidad en acción: demostraciones en tiempo real de cero pérdida de datos y tiempo de inactividad casi nulo {#safekit-rpo-rto-video-demos}

### Vídeo: Cómo lograr un RPO de cero y un RTO bajo en un clúster mirror SafeKit (8:47) {#demo-mirror-cluster-rpo-rto}

Vea cómo SafeKit gestiona un fallo crítico. Este vídeo demuestra **la replicación síncrona** que garantiza que no se pierdan datos (RPO 0) en una base de datos SQL y el **reinicio automático** de los servicios en el nodo secundario (RTO bajo).


#### Capítulos {#chapters}

  1. 🎬 [2 nodos con SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Configura el clúster y el módulo mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [Iniciar y probar la replicación, migración y conmutación por error de SQL en caso de fallo](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[Prueba gratuita aquí](</es/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Vídeo: Cómo lograr un RTO cercano a cero en un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit (5:03) {#demo-farm-cluster-rpo-rto}

Vea cómo SafeKit gestiona una <span class="notranslate farm-term" translate="no">farm</span> web con Apache para proporcionar escalabilidad de rendimiento y conmutación por error instantánea.

#### Capítulos {#chapters-1}

  1. 🎬 [2 nodos con Apache](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [Configura el clúster y el módulo farm.safe](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [Iniciar y probar el equilibrio de carga de la red, conmutación por error en caso de fallo](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[Prueba gratuita aquí](</es/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## Preguntas frecuentes: Optimización del RPO y el RTO para la continuidad del negocio {#faq-rpo-rto}

### ¿Pueden RPO y RTO ser cero? {#can-rpo-rto-be-zero}

**Sí.** Lograr un **RPO de cero** significa no perder datos, lo cual es posible mediante la duplicación de datos síncrona. Un **RTO cercano a cero** se logra mediante un software de conmutación por error automatizado como SafeKit, que detecta fallos y reinicia las aplicaciones en un nodo secundario en cuestión de segundos o minutos.

### ¿Qué es más importante: RPO o RTO? {#importance-rpo-vs-rto}

Ninguno es inherentemente más importante; desempeñan funciones diferentes. **RPO (Recovery Point Objective u Objetivo de Punto de Recuperación)** se centra en la pérdida de datos: cuántos datos puede permitirse perder. **RTO (Recovery Time Objective u Objetivo de Tiempo de Recuperación)** se centra en el tiempo de inactividad: la rapidez con la que debe volver a estar en línea. Para las aplicaciones de misión crítica, ambos deben minimizarse.

### ¿En qué se diferencian RPO y RTO entre la alta disponibilidad (HA) a nivel de aplicación y la HA a nivel de máquina virtual con SafeKit? {#safekit-application-vs-vm-level}

Aunque ambas garantizan un **RPO de 0** mediante replicación síncrona, difieren en el tiempo de recuperación:

  * **Nivel de aplicación:** RTO más rápido (aprox. 1 min) porque solo los servicios de la aplicación se reinician en un sistema operativo que ya está en funcionamiento. También detecta fallos específicos de software/procesos.
  * **Nivel de VM:** RTO más alto porque toda la máquina virtual debe reiniciarse en el host secundario. Aunque es independiente de la aplicación, carece de supervisión granular de los propios procesos de la aplicación.


### ¿Cuál es la diferencia entre las soluciones de alta disponibilidad y las de copia de seguridad en términos de RTO? {#ha-vs-backup-rto}

La alta disponibilidad (HA) normalmente ofrece un RTO mucho más bajo (de segundos a minutos) porque gestiona los fallos locales de forma automática. La recuperación ante desastres (DR) con soluciones de copia de seguridad suele tener un RTO más alto (de horas a días) porque implica la recuperación de datos y servicios en un sitio geográficamente distante después de una catástrofe importante.

### ¿Cómo consigo el mejor RPO y RTO entre sitios remotos? {#rpo-rto-between-remote-sites}

Lograr un **RPO cero** y **RTO cercano a cero** en sitios remotos requiere una combinación de **replicación síncrona** y una **LAN extendida (VLAN extendida)**:

  * **LAN extendida / VLAN extendida:** Al extender la misma subred (capa 2) a través de dos centros de datos, puede mover una aplicación del sitio A al sitio B sin cambiar su dirección IP, evitando actualizaciones complejas de DNS.
  * **La solución SafeKit:** SafeKit aprovecha esto al proporcionar una **IP virtual (VIP) definida por software** que se mueve entre sitios. Redirige instantáneamente el tráfico al sitio secundario utilizando ARP gratuito (GARP).


Esto proporciona un **RPO = 0** (duplicación en tiempo real) y un **RTO mínimo** (conmutación por error en aproximadamente 1 minuto) sin intervención humana.

### ¿Por qué es esencial combinar la alta disponibilidad y las copias de seguridad para optimizar RPO y RTO? {#combining-ha-and-backup-for-rpo-rto}

La combinación de alta disponibilidad (HA) con una solución de copia de seguridad es la única manera de lograr una estrategia de recuperación que ofrezca lo mejor de ambos mundos. Aunque a menudo se discuten juntos, resuelven diferentes partes de la ecuación RPO/RTO:

  * **Alta disponibilidad (a través de SafeKit):** Ofrece un RTO cercano a cero y un RPO de cero durante fallos de hardware o software. Al usar la replicación síncrona en tiempo real, el servidor secundario siempre está actualizado. Si el primario falla, el servicio se reinicia en el secundario inmediatamente sin pérdida de datos.
  * **Soluciones de copia de seguridad:** las copias de seguridad protegen contra problemas de integridad de datos (como el ransomware o la eliminación accidental). Debido a que la alta disponibilidad replica los cambios al instante, replicará "fielmente" un virus o un registro de base de datos eliminado en el servidor en espera. Una copia de seguridad le permite "volver en el tiempo" a un punto anterior a la corrupción.
  * **El enfoque híbrido:** Para una máxima resiliencia, las organizaciones utilizan una **arquitectura híbrida de 3 nodos**. Esto incluye un clúster local de 2 nodos con replicación síncrona para alta disponibilidad inmediata, y una tercera copia remota (asíncrona) para la recuperación ante desastres. Esta defensa en capas garantiza que tenga una copia "activa" para la recuperación instantánea y una copia "histórica" para la seguridad de los datos.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}