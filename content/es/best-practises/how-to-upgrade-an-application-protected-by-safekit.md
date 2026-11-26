---
title: "Actualización de una aplicación protegida por SafeKit en un clúster de alta disponibilidad"
canonical: "https://safekit.eviden.com/es/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Aprenda a actualizar de forma segura las aplicaciones protegidas por SafeKit. Compare las actualizaciones menores y mayores, las actualizaciones continuas, las estrategias de reversión y la alta disponibilidad basada en máquinas virtuales."
category: "best-practises"
lang: "es"
topics: "Actualización de una aplicación de alta disponibilidad protegida por SafeKit, Alta disponibilidad a nivel de máquina virtual, Alta disponibilidad a nivel de aplicación, Cómo elegir la estrategia de actualización adecuada, Conclusión, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-20.1 | glossaire 2026-11-20.3 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
schemaType: "TechArticle"
---

# Actualización de una aplicación protegida por SafeKit en un clúster de alta disponibilidad {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Actualización de una aplicación de alta disponibilidad protegida por SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Mantener actualizadas las aplicaciones críticas para el negocio es esencial para la seguridad, el rendimiento y el acceso a nuevas funciones. Cuando una aplicación está protegida por SafeKit, el procedimiento de actualización depende de la arquitectura de alta disponibilidad que se utilice.

Existen dos modelos de implementación comunes:

  * **Alta disponibilidad de máquinas virtuales**, donde la aplicación se ejecuta dentro de una máquina virtual protegida gestionada por SafeKit.
  * **Alta disponibilidad a nivel de aplicación**, donde la aplicación está instalada en dos servidores.


Cada modelo ofrece diferentes mecanismos de actualización y estrategias de reversión.

## Alta disponibilidad a nivel de máquina virtual {#vm-level-ha}

Con las soluciones de conmutación por error de VM SafeKit, como **hyperv.safe** y **kvm.safe**, la aplicación se instala solo una vez dentro de una máquina virtual.

SafeKit protege toda la máquina virtual, no la aplicación en sí. Esto simplifica considerablemente las operaciones de mantenimiento.

### Proceso de actualización simplificado {#simplified-upgrade-process}

Dado que está trabajando con una única instancia de máquina virtual de la aplicación, el mantenimiento se gestiona en la capa de virtualización en lugar de mediante la conmutación por error a nivel de aplicación.

El procedimiento de actualización es sencillo:

  1. Cree un punto de control o una instantánea de la máquina virtual mediante la consola de administración de Hyper-V o KVM.
  2. Realice la actualización de la aplicación dentro de la máquina virtual.
  3. Valide la aplicación actualizada.
  4. Si la actualización se realiza correctamente, elimine la instantánea y continúe con el funcionamiento normal.
  5. Si se produce un problema, restaure la máquina virtual desde la instantánea y vuelva inmediatamente al estado de funcionamiento anterior conocido.


La interrupción del servicio se limita a la duración normalmente requerida por el propio procedimiento de actualización de la aplicación.

### Ventajas de la protección a nivel de máquina virtual {#benefits-of-vm-level-protection}

  * Solo hay que mantener una instancia de la aplicación.
  * No hay ningún procedimiento de actualización específico para el clúster.
  * Reversión rápida mediante instantáneas de máquinas virtuales.
  * Complejidad operativa reducida.
  * Proceso de actualización coherente, independientemente de la aplicación protegida.


Este enfoque resulta especialmente atractivo para las aplicaciones empaquetadas y el software comercial listo para usar, en los que la agrupación de aplicaciones no está disponible o es difícil de implementar.

## Alta disponibilidad a nivel de aplicación {#app-level-ha}

En un clúster SafeKit tradicional, la aplicación se instala en dos nodos: el nodo 1 y el nodo 2. SafeKit sincroniza los datos de la aplicación entre estos nodos y gestiona automáticamente la conmutación por error si es necesario.

### Actualización de versión menor de la aplicación {#app-level-ha-minor}

Una actualización menor modifica solo los binarios de la aplicación, manteniendo los datos replicados totalmente compatibles entre versiones. Dado que el formato de los datos replicados no cambia, SafeKit admite una actualización continua con un tiempo de inactividad mínimo. 

  1. El clúster se ejecuta inicialmente en una configuración **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)**. La aplicación se ejecuta en el nodo PRIM. Los datos replicados se sincronizan continuamente con el nodo SECOND.
  2. Detenga el módulo SafeKit en el nodo SECOND. Su estado se convierte en **❌ STOP (nodo 2)**. Actualice la aplicación y reinicie el módulo. Durante esta operación, la aplicación continúa ejecutándose en el nodo 1, en el estado **✅ ALONE (nodo 1)**. No se produce ninguna interrupción del servicio.
  3. Tras el reinicio, el nodo actualizado se reincorpora al clúster como **✅ SECOND (nodo 2)**. Vuelve a sincronizar los datos replicados.
  4. Detenga el nodo PRIM. Su estado se convierte en **❌ STOP (nodo 1)**. SafeKit realiza automáticamente una conmutación por error. El nodo actualizado se convierte en **✅ ALONE (nodo 2)**. La aplicación se reinicia en este nodo. El tiempo de inactividad se limita al tiempo de conmutación por error y reinicio de la aplicación.
  5. Si la aplicación actualizada funciona correctamente en el nodo 2, actualice el nodo restante (nodo 1) y reinicie su módulo SafeKit.
  6. Después de la resincronización, el clúster vuelve a una configuración normal **✅ SECOND (nodo 1) / ✅ PRIM (nodo 2)**. Los roles originales se pueden restaurar manualmente mediante la Consola de administración SafeKit o automáticamente a través de la configuración SafeKit.


**Procedimiento de reversión**

  * En el paso 5, detenga el nodo 2, en el estado **✅ ALONE (nodo 2)**.
  * Reinicie el nodo original (nodo 1) como primario, con la versión anterior de la aplicación. Su estado es **✅ ALONE (nodo 1)**.
  * Reinstale la versión anterior en el nodo actualizado (nodo 2).
  * Restaure la configuración normal **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)**.


El tiempo de inactividad para la actualización completa se limita a la transición de **✅ PRIM/✅ SECOND** a **❌ STOP/✅ ALONE**.

### Actualización de la versión mayor de la aplicación {#app-level-ha-major}

Una actualización de versión mayor cambia el formato o la estructura de los datos replicados. Debido a que los datos generados por la nueva versión ya no son compatibles con la anterior, no se puede realizar una actualización continua.

  1. El clúster se ejecuta inicialmente en una configuración **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)**.
  2. Detenga el nodo SECOND y luego el nodo PRIM. El clúster pasa a **❌ STOP (nodo 1) / ❌ STOP (nodo 2)**.
  3. Actualice el antiguo nodo PRIM y reinícielo. El nodo se inicia solo, con la nueva versión de la aplicación. Su estado es **✅ ALONE (nodo 1)**.
  4. Valide la aplicación actualizada y compruebe que funciona correctamente.
  5. Si la validación se realiza correctamente, actualice el nodo restante y reinicie su módulo SafeKit.
  6. El nodo actualizado se convierte en **✅ SECOND (nodo 2)**. Vuelve a sincronizar los datos de la aplicación. El clúster vuelve a una configuración normal de **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)**.


**Procedimiento de reversión**

  * En el paso 5, detenga el nodo 1 actualizado, en el estado **✅ ALONE (nodo 1)**.
  * Reinicie el nodo no actualizado (nodo 2) como primario. Su estado es **✅ ALONE (nodo 2)**.
  * Reinstale la versión anterior de la aplicación en el nodo actualizado.
  * Restaure la configuración original **✅ SECOND (nodo 1) / ✅ PRIM (nodo 2)**.


Debido a que los datos replicados se modifican durante la migración, el tiempo de inactividad corresponde al período entre el estado **❌ STOP/❌ STOP** y el reinicio del primer nodo actualizado como **✅ ALONE**.

### Ventajas de SafeKit para las actualizaciones de aplicaciones {#why-safekit-simplifies-application-upgrades}

SafeKit minimiza el riesgo operativo:

  * Los administradores actualizan un nodo a la vez.
  * SafeKit mantiene la disponibilidad del servicio siempre que sea posible.
  * Las nuevas versiones se validan antes de que se cambie el tráfico de producción.
  * Los administradores pueden volver rápidamente al nodo anterior si se detectan problemas inesperados.


## Cómo elegir la estrategia de actualización adecuada {#choosing-the-right-upgrade-strategy}

Modelo de implementación | Instancias de aplicación | Impacto de los datos replicados | Enfoque de actualización  
---|---|---|---  
Alta disponibilidad a nivel de aplicación | Dos nodos | Depende del tipo de actualización | Actualización continua con conmutación por error  
Alta disponibilidad a nivel de máquina virtual con hyperv.safe o kvm.safe | Una máquina virtual | Gestionado dentro de la máquina virtual | Crear una instantánea, actualizar, validar y revertir si es necesario  
  
## Conclusión {#conclusion}

SafeKit proporciona arquitecturas de alta disponibilidad flexibles que se adaptan a los requisitos operativos de las diferentes aplicaciones. Ya sea que proteja una aplicación en clúster en dos nodos o una única instancia de aplicación que se ejecuta en una máquina virtual, SafeKit permite actualizaciones controladas, minimiza el tiempo de inactividad y ofrece opciones de recuperación fiables siempre que se requieran operaciones de mantenimiento.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}