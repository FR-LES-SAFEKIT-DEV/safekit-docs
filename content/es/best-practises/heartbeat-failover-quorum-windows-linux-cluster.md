---
title: "Heartbeat, failover y quórum en un clúster"
canonical: "https://safekit.eviden.com/es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Cómo funcionan el heartbeat, la conmutación por error y el quórum en clústeres Windows y Linux, y cómo SafeKit evita el split brain sin disco de quórum ni tercer servidor."
category: "best-practises"
lang: "es"
topics: "¿Cuáles son los diferentes escenarios en caso de aislamiento de red en un clúster?, ¿Cómo funcionan los heartbeats y la conmutación por error en un clúster Windows o Linux?, Split brain y quórum con servidores en dos salas de ordenadores remotas, Quórum de clúster simple con el checker split-brain SafeKit"
hashpart: "isolation, how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster, split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms, simple-cluster-quorum-with-the-safekit-split-brain-checker"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Heartbeat, failover y quórum en un clúster {#heartbeat-failover-and-quorum-in-a-cluster}


{{%  insert-safekit-network-isolation-es  %}}
 

## ¿Cómo funcionan los heartbeats y la conmutación por error en un clúster Windows o Linux? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### ¿Qué es un heartbeat? {#what-is-a-heartbeat}

El mecanismo básico para sincronizar dos servidores y detectar fallos del servidor es el **heartbeat**. Es un flujo de datos de supervisión en una red compartida por los dos servidores.

El software SafeKit admite varios heartbeats. Cada red compartida por los dos servidores puede transmitir un heartbeat.

El mecanismo heartbeat se utiliza para implementar clústeres Windows y Linux. Está integrado en el clúster mirror SafeKit con replicación de archivos en tiempo real y conmutación por error.

### Heartbeats SafeKit {#safekit-heartbeats}

En el funcionamiento normal, los dos servidores intercambian sus estados a través de los canales heartbeat. Estos estados son PRIM, SECOND y los estados de los recursos. También sincronizan los procedimientos de inicio y parada de la aplicación.

Por ejemplo, durante una conmutación por error programada, el script de detención de la aplicación se ejecuta primero en el servidor principal. A continuación, el script de inicio se ejecuta en el servidor secundario. De este modo, los datos replicados en el servidor secundario se encuentran en un estado seguro. Este estado corresponde a una detención limpia de la aplicación.

### ¿Qué ocurre cuando se pierden todos los heartbeats? {#loss-of-all-heartbeats}

Cuando un servidor pierde todos los heartbeats, considera que el otro servidor está inactivo. Entonces pasa al estado ALONE.

Si el servidor en el estado SECOND pasa al estado ALONE, la aplicación se reinicia en este servidor. Esto es una conmutación por error de la aplicación.

Se recomiendan dos canales heartbeat en dos redes diferentes, pero no es obligatorio. Con dos redes, un fallo de red no se confunde con un fallo del servidor.

## Split brain y quórum con servidores en dos salas de ordenadores remotas {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Heartbeat, conmutación por error y quórum en un clúster Windows o Linux](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Dos salas de ordenadores remotas {#remote-computer-rooms}

Con dos servidores en dos salas de ordenadores remotas, un clúster de alta disponibilidad puede proteger una aplicación crítica.

De este modo, la aplicación sigue estando disponible incluso si un desastre destruye una sala de ordenadores entera.

### Split brain {#split-brain}

Si la red entre las dos salas de computadoras está aislada, se pierden todos los heartbeats. Este es el problema del split brain: ambos servidores inician la aplicación crítica.

### Complejidad de las soluciones habituales {#complexity-of-solutions}

La mayoría de las veces, se utiliza un quórum para resolver el problema del split brain. El quórum utiliza un tercer servidor de quórum o un disco de quórum especial. Evita tener dos servidores primarios al mismo tiempo.

Lamentablemente, estos dispositivos de quórum añaden coste y complejidad a la arquitectura de clústeres.

## Quórum de clúster simple con el checker split-brain SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### Checker split-brain SafeKit {#safekit-split-brain-checker}

Con el software de alta disponibilidad SafeKit, el quórum de un clúster Windows o Linux no requiere un tercer servidor de quórum ni un disco de quórum. Un simple 🛠️ [checker split-brain](</es/resources/safekit-user-guide-82/#check_splitbrain>) es suficiente para evitar que la aplicación se ejecute en ambos servidores.

Cuando se pierden todos los heartbeats entre los servidores, el checker split-brain selecciona un solo servidor para que se convierta en el primario. El otro servidor entra en el estado WAIT. Espera hasta que recibe los heartbeats del otro servidor de nuevo. Luego sincroniza los datos replicados del servidor primario y vuelve al estado secundario.

### ¿Cómo funciona el checker split-brain? {#how-the-split-brain-checker-works}

El servidor principal se elige con un ping a una dirección IP, llamada testigo. El testigo suele ser un enrutador que siempre está disponible. En caso de aislamiento de la red, solo el servidor que puede llegar al testigo se convierte en principal en el estado ALONE. El otro servidor pasa al estado WAIT.

El testigo no se prueba de forma permanente. Solo se prueba cuando se pierden todos los heartbeats. Si el testigo está inactivo en ese momento, el clúster entra en el estado WAIT-WAIT. Un administrador puede entonces reiniciar uno de los servidores como primario con la consola web SafeKit.

### ¿Qué ocurre sin un checker split-brain? {#what-happens-without-a-split-brain-checker}

En caso de aislamiento de la red, ambos servidores pasan al estado ALONE y ejecutan la aplicación crítica. Los directorios replicados están aislados. Cada aplicación trabaja con sus propios datos en su propio directorio.

Cuando la red se vuelve a conectar, SafeKit elige por defecto el servidor que era PRIM antes del aislamiento como el nuevo primario. El otro servidor se fuerza al estado SECOND. Todos sus datos se resincronizan desde el servidor PRIM.

Nota: en Windows, un servidor puede detectar una dirección IP duplicada y eliminar su dirección IP virtual. En ese caso, un verificador SafeKit fuerza un reinicio.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
