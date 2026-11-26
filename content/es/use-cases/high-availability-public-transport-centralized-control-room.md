---
title: "Alta disponibilidad para el transporte público: sala de control centralizada"
canonical: "https://safekit.eviden.com/es/use-cases/high-availability-public-transport-centralized-control-room/"
description: "Alta disponibilidad en salas de control de transporte: RATP usa SafeKit en la línea 1 sin conductor del metro de París, con replicación, conmutación y equilibrio de carga."
category: "use-cases"
lang: "es"
topics: "Salas de control del transporte público, ¿Por qué es fundamental la sala de control?, Alta disponibilidad SafeKit para el transporte público, Implementación en el mundo real en RATP, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.30 | Translation LLM | 48 expressions"
image: "/wp-content/uploads/2026/05/safekit-occ-512-512.jpg"
schemaType: "Article"
schemaMentions: ["RATP"]
---

# Alta disponibilidad para el transporte público: sala de control centralizada {#high-availability-for-public-transport-centralized-control-room}

## Salas de control del transporte público {#public-transport-control-rooms}

Una sala de control centralizada es el centro neurálgico de los sistemas modernos de transporte público. La sala de control supervisa líneas enteras de metro, gestiona operaciones automatizadas y garantiza la seguridad de los pasajeros. Para los sistemas de metro, las líneas de metro automatizadas y las redes de autobuses, la sala de control debe funcionar las 24 horas del día, los 7 días de la semana, sin interrupciones.

RATP gestiona el metro de París. Transporta a más de 10 millones de pasajeros cada día. La línea 1 del metro de París está totalmente automatizada y no tiene conductor. Esto hace que el papel de la sala de control sea aún más crítico.

## ¿Por qué es fundamental la sala de control? {#why-is-a-centralized-control-room-critical}

Los operadores de una línea de metro deben reaccionar de inmediato ante el más mínimo incidente. Un fallo informático nunca debe impedir que los operadores vean la actividad de la línea.

Las principales tareas de los operadores de la sala de control son:

  * Supervisión de los movimientos de los trenes en las vías
  * Gestión de incidentes detectados automáticamente por videocámaras
  * Gestión de sistemas de comunicación y anuncios públicos
  * Supervisión de las operaciones de seguridad y de la información al pasajero

Una falla del sistema en la sala de control afecta directamente la seguridad de los pasajeros y la continuidad del servicio. Todas las aplicaciones críticas en la sala de control deben estar protegidas por alta disponibilidad. Algunos ejemplos son las puertas de enlace, las bases de datos y los front-ends web.

## Alta disponibilidad SafeKit para el transporte público {#safekit-high-availability-for-public-transport}

RATP se enfrentó a importantes limitaciones para el proyecto de automatización de la línea 1:

  * Un ajustado calendario de despliegue
  * La mayoría de las aplicaciones no fueron diseñadas originalmente para alta disponibilidad
  * Se necesitaba una solución tanto para servidores Windows como Linux
  * No había presupuesto para hardware costoso, como almacenamiento SAN o dispositivos de equilibrio de carga de red

SafeKit fue elegido por las siguientes razones:

  * Es una solución puramente de software, sin discos compartidos ni SAN
  * Proporciona la misma solución en Windows y Linux
  * Ofrece tres funciones fundamentales: equilibrio de carga, conmutación por error automática y replicación de datos en tiempo real
  * Es sencillo de implementar en servidores estándar, fácil de administrar y versátil

## Implementación en el mundo real en RATP {#real-world-implementation-at-ratp}

RATP implementó SafeKit con dos tipos de clústeres:

  * **Clúster farm**: un clúster activo/activo con equilibrio de carga de red y conmutación por error automática
  * **Clúster mirror**: un clúster activo/pasivo con replicación de datos en tiempo real y conmutación por error automática

### Enfoque de implementación {#deployment-approach}

En primer lugar, RATP definió las necesidades funcionales. A continuación, SafeKit se configuró para cada aplicación protegida. Las aplicaciones en sí no se modificaron. SafeKit no requiere ningún cambio físico en los servidores.

Un clúster de aplicaciones SafeKit tiene:

  * Dos servidores con el mismo sistema operativo
  * La aplicación está instalada en ambos servidores
  * SafeKit instalado en ambos servidores
  * Uno o más módulos de aplicación configurados para alta disponibilidad y equilibrio de carga

Varios módulos de aplicación pueden ejecutarse en paralelo en el mismo clúster. Esto optimiza el uso de los recursos del servidor. RATP validó los módulos SafeKit en tres pasos: pruebas, preproducción y producción.

### Operaciones diarias {#daily-operations}

Los operadores de TI ahora administran todos los clústeres de aplicaciones con:

  * La misma solución de alta disponibilidad en Windows y Linux
  * La misma consola de administración para todos los clústeres
  * La misma configuración y los mismos comandos
  * Supervisión unificada para el equilibrio de carga, la alta disponibilidad y la replicación de datos

Los servidores de respaldo de las aplicaciones críticas se encuentran en una sala de máquinas separada. Funcionan con fuentes de alimentación independientes. Si ocurre un incidente, las operaciones continúan sin interrupción del servicio para los pasajeros del metro de París.

### Beneficios clave {#key-benefits}

  * **Reducción de costes**: no se necesita una costosa infraestructura SAN con discos compartidos ni dispositivos de equilibrio de carga de red
  * **Administración simplificada**: una sola consola gestiona clústeres Windows y Linux
  * **Alta disponibilidad**: balanceo de carga, conmutación por error automática y replicación de datos en tiempo real
  * **Impacto mínimo en el proyecto**: las aplicaciones existentes no requieren ninguna modificación
  * **Resiliencia operativa**: la recuperación automática garantiza la continuidad del servicio al pasajero

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}
