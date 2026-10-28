---
title: "Latido, conmutación por error y quórum en los clústeres Windows y Linux"
canonical: "https://safekit.eviden.com/es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Aprenda cómo funcionan los latidos, la conmutación por error y el quórum en un clúster. SafeKit propone una arquitectura sin SAN que elimina la necesidad de un tercer servidor de quórum o un disco de quórum especial. Logre alta disponibilidad en Windows y Linux con un sencillo comprobador de división de clúster."
category: "best-practises"
lang: "es"
topics: "¿Cuáles son los diferentes escenarios en caso de aislamiento de red en un clúster?, ¿Cómo funcionan los latidos y la conmutación por error en un clúster Windows o Linux ?, Problema de división de clúster y quórum cuando los servidores están en dos salas de servidores remotas, Quórum de clúster simple con el verificador de división de clúster SafeKit , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Latido, conmutación por error y quórum en los clústeres Windows y Linux {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-es  %}}
 

## ¿Cómo funcionan los latidos y la conmutación por error en un clúster Windows o Linux ? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### ¿Qué es un latido cardíaco? {#what-is-a-heartbeat}

El mecanismo básico para sincronizar dos servidores y detectar fallos en los servidores es el latido ** ** , que es un flujo de datos de monitorización en una red compartida por un par de servidores.

El software SafeKit admite tantos latidos como redes compartidas por dos servidores. 

El mecanismo de latido se utiliza para implementar los clústeres Windows y Linux . Está integrado en el clúster SafeKit mirror con replicación de archivos en tiempo real y conmutación por error.

### Latidos del corazón SafeKit {#safekit-heartbeats}

En funcionamiento normal, los dos servidores intercambian sus estados (PRIM, SECOND, los estados de los recursos) a través de los canales de latido y sincronizan sus procedimientos de inicio y parada de la aplicación.

En concreto, en caso de conmutación por error programada, el script de detención que detiene la aplicación se ejecuta primero en el servidor principal, antes de ejecutar el script de inicio en el servidor secundario. De este modo, los datos replicados en el servidor secundario se encuentran en un estado seguro, lo que corresponde a una detención correcta de la aplicación.

### Pérdida total de latidos cardíacos {#loss-of-all-heartbeats}

Cuando se pierde toda la señal de latido en un servidor, este servidor considera que el otro servidor está caído y pasa al estado SOLO.

Si es el SEGUNDO servidor el que pasa al estado SOLO, entonces se produce una conmutación por error de la aplicación con el reinicio de la misma en el servidor secundario.

Aunque no es obligatorio, es mejor tener dos canales de latido en dos redes diferentes para sincronizar los dos servidores y así separar el caso de fallo de la red del caso de fallo del servidor.

## Problema de división de cerebro y quórum cuando los servidores están en dos salas de computadoras remotas {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![ Latido, conmutación por error y quórum en un clúster Windows o Linux ](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Salas de computadoras remotas {#remote-computer-rooms}

Se puede implementar un clúster de alta disponibilidad que proteja una aplicación crítica con dos servidores ubicados en dos salas de servidores geográficamente distantes.

Por lo tanto, la solución respalda el desastre de una habitación llena.

### Cerebro dividido {#split-brain}

En caso de aislamiento de la red entre ambas salas de ordenadores, se pierde toda la comunicación y surge el problema de la división de la red (split brain).

Ambos servidores inician la aplicación crítica.

### Complejidad de las soluciones {#complexity-of-solutions}

En la mayoría de los casos, para solucionar el problema de la división de cerebro, el quórum se implementa con un tercer servidor de quórum o un disco de quórum especial para evitar la duplicación de maestros. 

Lamentablemente, estos nuevos dispositivos de quórum añaden coste y complejidad a la arquitectura de clúster general.

## Quórum de clúster simple con el verificador de cerebro dividido SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit comprobador de cerebro dividido {#safekit-split-brain-checker}

Con el software de alta disponibilidad SafeKit , el quórum dentro de un clúster Windows o Linux no requiere un tercer servidor de quórum ni un disco de quórum. Un simple comprobador ](</es/resources/safekit-user-guide-82/#check_splitbrain>) [ suficiente para evitar la doble ejecución de una aplicación.

Tras la pérdida de la señal de latido entre los servidores, el verificador de división de cerebro selecciona un único servidor como principal. El otro servidor entra en estado de espera hasta que vuelve a recibir la señal del servidor principal. Una vez sincronizados los datos replicados del servidor principal, regresa al estado secundario.

### ¿Cómo funciona el comprobador de cerebro dividido? {#how-the-split-brain-checker-works}

La elección del servidor principal se basa en el ping a una dirección IP, denominada testigo. El testigo suele ser un enrutador que siempre está disponible. En caso de aislamiento de red, solo el servidor con acceso al testigo será el principal; los demás permanecerán en estado de espera.

El testigo no se prueba de forma permanente, sino solo cuando se pierden todos los latidos. Si en ese momento el testigo no está disponible, el clúster entra en estado de ESPERA y un administrador puede reiniciar uno de los servidores como principal a través de la consola web SafeKit .

### ¿Qué sucede sin un detector de división cerebral? {#what-happens-without-a-split-brain-checker}

En caso de aislamiento de red, ambos servidores pasarán al estado ALONE, ejecutando la aplicación crítica. Los directorios replicados estarán aislados y cada aplicación trabajará con sus propios datos en su propio directorio.

Cuando se restablece la conexión de la red, SafeKit elige por defecto el servidor que era PRIM antes del aislamiento como el nuevo primario y fuerza al otro a ser SEGUNDO con una resincronización de todos sus datos desde el PRIM.

Nota: Windows puede detectar una dirección IP duplicada en un servidor y eliminar la dirección IP virtual en dicho servidor. SafeKit dispone de un verificador para forzar un reinicio en ese caso.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}