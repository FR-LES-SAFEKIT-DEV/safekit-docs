---
title: "Actualización de una aplicación protegida por SafeKit en un clúster de alta disponibilidad."
canonical: "https://safekit.eviden.com/es/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Aprenda cómo actualizar de forma segura las aplicaciones protegidas por SafeKit . Compare las actualizaciones menores y mayores, las actualizaciones progresivas, las estrategias de reversión y la alta disponibilidad basada en máquinas virtuales."
category: "best-practises"
lang: "es"
topics: "Actualización de una aplicación de alta disponibilidad protegida por SafeKit , alta disponibilidad a nivel de máquina virtual, alta disponibilidad a nivel de aplicación, elección de la estrategia de actualización adecuada, conclusión, 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Actualización de una aplicación protegida por SafeKit en un clúster HA {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Actualización de una aplicación de alta disponibilidad protegida por SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Mantener actualizadas las aplicaciones críticas para el negocio es fundamental para la seguridad, el rendimiento y el acceso a nuevas funciones. Cuando una aplicación está protegida por SafeKit , el procedimiento de actualización depende de la arquitectura de alta disponibilidad en uso.

Existen dos modelos de despliegue comunes:

  * **Alta disponibilidad de máquina virtual** , donde la aplicación se ejecuta dentro de una máquina virtual protegida administrada por SafeKit .
  * **Alta disponibilidad a nivel de aplicación** , donde la aplicación está instalada en dos servidores.


Cada modelo ofrece diferentes mecanismos de actualización y estrategias de reversión.

## Alta disponibilidad a nivel de máquina virtual {#vm-level-ha}

Con las soluciones de conmutación por error de máquinas virtuales SafeKit como **hyperv.safe** y **kvm.safe** , la aplicación se instala solo una vez dentro de una máquina virtual.

SafeKit protege toda la máquina virtual en lugar de la aplicación en sí, lo que simplifica significativamente las operaciones de mantenimiento.

### Proceso de actualización simplificado {#simplified-upgrade-process}

Dado que se trabaja con una única instancia de máquina virtual de la aplicación, el mantenimiento se gestiona en la capa de virtualización en lugar de mediante la conmutación por error a nivel de aplicación.

El procedimiento de actualización es sencillo:

  1. Cree un punto de control o una instantánea de la máquina virtual utilizando la consola de administración de Hyper-V o KVM.
  2. Realice la actualización de la aplicación dentro de la máquina virtual.
  3. Validar la aplicación actualizada.
  4. Si la actualización se realiza correctamente, elimine la instantánea y continúe con el funcionamiento normal.
  5. Si se produce algún problema, restaure la máquina virtual a partir de la instantánea y vuelva inmediatamente al estado de funcionamiento anterior conocido.


La interrupción del servicio se limita a la duración que normalmente requiere el procedimiento de actualización de la propia aplicación.

### Beneficios de la protección a nivel de máquina virtual {#benefits-of-vm-level-protection}

  * Solo hay que mantener una instancia de la aplicación.
  * No existe un procedimiento de actualización compatible con clústeres.
  * Reversión rápida mediante instantáneas de máquinas virtuales.
  * Reducción de la complejidad operativa.
  * Proceso de actualización uniforme independientemente de la aplicación protegida.


Este enfoque resulta especialmente atractivo para aplicaciones empaquetadas y software comercial estándar donde la agrupación de aplicaciones no está disponible o es difícil de implementar.

## Alta disponibilidad a nivel de aplicación {#app-level-ha}

En un clúster SafeKit tradicional, la aplicación se instala en dos nodos: el nodo 1 y el nodo 2. SafeKit sincroniza los datos de la aplicación entre estos nodos y gestiona automáticamente la conmutación por error si es necesario.

### Actualización menor de la aplicación {#app-level-ha-minor}

Una actualización menor modifica únicamente los binarios de la aplicación, manteniendo la compatibilidad total de los datos replicados entre versiones. Dado que el formato de los datos replicados no cambia, SafeKit admite una actualización progresiva con un tiempo de inactividad mínimo. 

  1. El clúster se ejecuta inicialmente en una configuración **✅ PRIM (nodo 1) / ✅ SEGUNDO (nodo 2). La aplicación se ejecuta en el nodo** y los datos replicados se sincronizan continuamente con el nodo SEGUNDO. 
  2. Detenga el módulo SafeKit en el SEGUNDO nodo ( **❌ STOP (nodo 2)** ), actualice la aplicación y reinicie el módulo. Durante esta operación, la aplicación continúa ejecutándose en el **✅ ALONE (nodo 1)** y no se produce ninguna interrupción del servicio. 
  3. Después del reinicio, el nodo actualizado se reincorpora al clúster como **✅ SEGUNDO (nodo 2)** y resincroniza los datos replicados. 
  4. Detenga el nodo PRIM ( **❌ STOP (nodo 1)** ). SafeKit realiza automáticamente una conmutación por error y el nodo actualizado se convierte en **✅ ALONE (nodo 2)** . La aplicación se reinicia en este nodo. El tiempo de inactividad se limita al tiempo de conmutación por error y reinicio de la aplicación. 
  5. Si la aplicación actualizada funciona correctamente en el estado ALONE, actualice el nodo restante (nodo 1) y reinicie su módulo SafeKit . 
  6. Tras la resincronización, el clúster vuelve a una configuración normal **✅ SEGUNDO (nodo 1) / ✅ PRINCIPAL (nodo 2)** . Los roles originales se pueden restaurar manualmente mediante la consola de administración SafeKit o automáticamente a través de la configuración SafeKit . 


**Procedimiento de reversión**

  * En el paso 5, detenga el nodo **✅ SOLO (nodo 2)** .
  * Obliga al nodo original (nodo 1) a iniciarse como primario **SOLO (nodo 1)** con la versión anterior de la aplicación.
  * Reinstale la versión anterior en el nodo actualizado (nodo 2).
  * Regrese a una configuración normal **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)** .


La actualización completa se realiza con un tiempo de inactividad limitado a la transición de **✅ PRIM / ✅ SECOND** a **❌ STOP / ✅ ALONE** . 

### Actualización importante de la aplicación {#app-level-ha-major}

Una actualización importante modifica el formato o la estructura de los datos replicados. Dado que los datos generados por la nueva versión ya no son compatibles con la anterior, no es posible realizar una actualización progresiva. 

  1. El clúster se ejecuta inicialmente en una configuración **✅ PRIM (nodo 1) / ✅ SEGUNDO (nodo 2)** . 
  2. Detenga el SEGUNDO nodo y luego el nodo PRIM. El clúster pasa a **❌ STOP (nodo 1) / ❌ STOP (nodo 2)** . 
  3. Actualiza el nodo PRIM anterior y reinícialo. El nodo se inicia solo como **✅ SOLO (nodo 1)** con la nueva versión de la aplicación. 
  4. Valide la aplicación actualizada y verifique que funcione correctamente. 
  5. Si la validación es exitosa, actualice el nodo restante y reinicie su módulo SafeKit . 
  6. El nodo actualizado se convierte en **✅ SEGUNDO (nodo 2)** , resincroniza los datos de la aplicación y el clúster vuelve a una configuración normal **✅ PRIM (nodo 1) / ✅ SEGUNDO (nodo 2)** . 


**Procedimiento de reversión**

  * En el paso 5, detenga el nodo **✅ ALONE (nodo 1)** actualizado.
  * Obligar al nodo no actualizado a iniciarse como primario **✅ SOLO (nodo 2)** .
  * Reinstale la versión anterior de la aplicación en el nodo actualizado.
  * Restaurar la configuración original **✅ SEGUNDO (nodo 1) / ✅ PRIMARIO (nodo 2)** .


Debido a que los datos replicados se modifican durante la migración, el tiempo de inactividad corresponde al período entre el estado **❌ STOP / ❌ STOP** y el reinicio del primer nodo actualizado como **✅ ALONE** . 

### Por qué SafeKit simplifica las actualizaciones de aplicaciones {#why-safekit-simplifies-application-upgrades}

SafeKit minimiza el riesgo operativo al permitir a los administradores:

  * Actualiza un nodo a la vez.
  * Mantener la disponibilidad del servicio siempre que sea posible.
  * Valide las nuevas versiones antes de cambiar al tráfico de producción.
  * Si se detectan problemas inesperados, vuelva rápidamente al nodo anterior.


## Elegir la estrategia de actualización adecuada {#choosing-the-right-upgrade-strategy}

Modelo de despliegue | Instancias de aplicación | Impacto de datos replicados | Enfoque de actualización  
---|---|---|---  
Alta disponibilidad a nivel de aplicación | Dos nodos | Depende del tipo de actualización | Actualización progresiva con conmutación por error  
Alta disponibilidad a nivel de máquina virtual ( hyperv.safe / kvm.safe ) | Una máquina virtual | Gestionado dentro de la máquina virtual | Instantánea, actualización, validación, reversión si es necesario  
  
## Conclusión {#conclusion}

SafeKit proporciona arquitecturas de alta disponibilidad flexibles que se adaptan a los requisitos operativos de diferentes aplicaciones. Ya sea que proteja una aplicación en clúster en dos nodos o una única instancia de aplicación que se ejecuta en una máquina virtual, SafeKit permite actualizaciones controladas, minimiza el tiempo de inactividad y ofrece opciones de recuperación confiables cuando se requieren operaciones de mantenimiento.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}