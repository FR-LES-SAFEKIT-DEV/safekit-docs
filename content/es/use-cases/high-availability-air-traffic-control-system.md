---
title: "Alta disponibilidad para sistemas de control del tráfico aéreo"
canonical: "https://safekit.eviden.com/es/use-cases/high-availability-air-traffic-control-system/"
description: "Alta disponibilidad en control de tráfico aéreo: ADB SafeGate usa SafeKit en aeropuertos de todo el mundo para replicación en tiempo real y conmutación automática en Windows."
category: "use-cases"
lang: "es"
topics: "Sistemas de control del tráfico aéreo, ¿Por qué es fundamental el control del tráfico aéreo?, Cómo protege SafeKit el control del tráfico aéreo, Implementación en el mundo real en ADB SafeGate"
hashpart: "air-traffic-control-systems, why-is-air-traffic-control-critical, safekit-high-availability-for-atc, real-world-implementation-at-adb-safegate"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.22 | Translation LLM | 48 expressions"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# Alta disponibilidad para sistemas de control del tráfico aéreo {#high-availability-for-air-traffic-control-systems}

## Sistemas de control del tráfico aéreo {#air-traffic-control-systems}

Los controladores de tráfico aéreo tienen una de las tareas más complejas y estresantes que se puedan imaginar. Hoy en día, el espacio aéreo está muy concurrido y el tráfico aéreo es intenso. Un solo error en la dirección de las aeronaves puede tener consecuencias catastróficas. Los sistemas modernos de control del tráfico aéreo dependen de sofisticadas aplicaciones de software. Estas aplicaciones ayudan a los controladores a tomar decisiones críticas.

ADB SafeGate es un proveedor global de soluciones para el lado aire, incluido el software para torres de control de tráfico aéreo. Sus soluciones equipan a más de 3000 aeropuertos en más de 175 países. Gestionan datos críticos de operaciones aeroportuarias, entre los que se incluyen:

  * Información sobre la programación de vuelos y el flujo del tráfico aéreo
  * Datos meteorológicos
  * Estado de la iluminación y el control del aeródromo
  * Operaciones en la plataforma y de acoplamiento

## ¿Por qué es fundamental el control del tráfico aéreo? {#why-is-air-traffic-control-critical}

El control del tráfico aéreo es una de las actividades más críticas que existen. Cualquier fallo del sistema en un momento crítico puede comprometer la toma de decisiones del controlador y la seguridad de los pasajeros. Los controladores deben tener plena confianza en los sistemas que los apoyan.

Sin embargo, la mejor aplicación es inútil si un servidor, un sistema operativo o un software falla en un momento crítico. ADB SafeGate reconoció la necesidad de garantizar la disponibilidad de su entorno crítico. Decidió estudiar cómo garantizar el tiempo de actividad 24/7 de sus aplicaciones.

**El reto**: Poner a disposición de los controladores de tráfico aéreo un conjunto completo de aplicaciones las 24 horas del día, los 7 días de la semana. Este es un requisito obligatorio para el control del tráfico aéreo.

## Cómo protege SafeKit el control del tráfico aéreo {#safekit-high-availability-for-atc}

ADB SafeGate seleccionó SafeKit, la solución de alta disponibilidad de software de Eviden, porque ofrece:

  * **Disponibilidad 24/7**: las aplicaciones críticas siempre están disponibles
  * **Servidores de aplicaciones redundantes**: los servidores pueden ubicarse en salas de máquinas separadas para protegerlos contra desastres
  * **Servidores estándar**: sin discos compartidos ni una compleja infraestructura SAN
  * **Replicación de archivos en tiempo real**: sin pérdida de datos (RPO = 0)
  * **Recuperación automática**: no se necesita ninguna acción manual después de un fallo

Como resultado, los controladores de tráfico aéreo que utilizan el software ADB SafeGate pueden centrarse por completo en su compleja tarea. Pueden confiar en que los sistemas que los respaldan son resilientes y siempre están disponibles.

## Implementación en el mundo real en ADB SafeGate {#real-world-implementation-at-adb-safegate}

### Enfoque de implementación {#deployment-approach}

En un aeropuerto, ADB SafeGate instala sus aplicaciones y SafeKit en dos servidores Windows estándar. Los servidores no tienen discos compartidos. Las aplicaciones se benefician de la replicación de archivos en tiempo real y de la recuperación automática tras un fallo.

### Cómo funciona en la práctica {#how-it-works-in-practice}

**Fase 1: Funcionamiento normal**

La aplicación se ejecuta solo en el servidor 1, dentro del módulo mirror SafeKit. Los clientes se conectan automáticamente al servidor 1 a través de una dirección IP virtual principal/secundaria. Solo se replican los archivos modificados por la aplicación. Se envían al servidor 2 en tiempo real a través de la red. Esto minimiza el tráfico de la red.

No hay requisitos previos en la organización del servidor. Los archivos pueden estar en un disco RAID5 en el servidor 1 y en un disco simple en el servidor 2.

Las escrituras se replican de forma síncrona en ambos servidores, por lo que no se pierden datos en caso de fallo. Los datos confirmados por una aplicación transaccional están automáticamente disponibles en el servidor secundario. Un ejemplo es PostgreSQL. Esta garantía no es posible con la replicación asíncrona.

**Fase 2: Conmutación por error en caso de fallo**

Si el servidor 1 falla, SafeKit realiza automáticamente la conmutación por error al servidor 2. El tiempo de conmutación por error es igual al tiempo de detección de fallos más el tiempo de reinicio de la aplicación. El tiempo de espera de detección predeterminado es de 30 segundos. No hay retraso en la recuperación del sistema de archivos, a diferencia de las soluciones de replicación de disco.

**Fase 3: Resincronización tras un fallo**

Cuando el servidor 1 se reinicia, el módulo mirror resincroniza automáticamente los archivos.

Solo se resincronizan los archivos modificados en el servidor 2 durante el tiempo de inactividad del servidor 1. Las aplicaciones siguen ejecutándose en el servidor 2 durante la resincronización. Después de la resincronización, el sistema vuelve a estar altamente disponible y protegido.

Es posible que el administrador desee que la aplicación se ejecute en el servidor 1 con prioridad. En este caso, se puede activar manualmente un retorno al servidor 1 con un solo clic. También puede ser automático.

### Principales beneficios para los aeropuertos {#key-benefits-for-airports}

  * **No se necesita hardware especial**: los servidores Windows estándar son suficientes
  * **Sin almacenamiento compartido**: sin costosas infraestructuras SAN ni la complejidad de los discos compartidos
  * **Resistencia a desastres**: los servidores pueden estar en salas de máquinas separadas con fuentes de alimentación independientes
  * **Cero pérdida de datos**: la replicación síncrona garantiza RPO = 0 para todas las transacciones confirmadas
  * **Recuperación automática**: no se necesita ninguna acción manual después de un fallo
  * **Menos estrés**: los controladores aéreos pueden confiar en los sistemas que respaldan sus decisiones críticas
  * **Fiabilidad global**: implementado con éxito en aeropuertos de numerosos países y continentes

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
