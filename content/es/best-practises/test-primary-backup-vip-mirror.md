---
title: "Prueba de la dirección IP virtual principal/de respaldo en un clúster espejo de SafeKit."
canonical: "https://safekit.eviden.com/es/best-practises/test-primary-backup-vip-mirror/"
description: "Pruebe la disponibilidad y la conmutación por error de la IP virtual (VIP) en un clúster espejo de SafeKit, incluyendo el redireccionamiento GARP, las comprobaciones ARP y la captura de paquetes."
category: "best-practises"
lang: "es"
topics: "Principios clave, Requisito previo: Configuración de VIP, Prueba 1: VIP en poder del servidor principal, Prueba 2: Conmutación por error manual (detención del servidor principal), Prueba 3: Comprobación del redireccionamiento GARP con arp -a, Prueba 4: Comprobación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux), Estaciones de trabajo desde las que realizar la prueba, Resumen de los resultados esperados, Solución de problemas"
---

# Prueba de la dirección IP virtual principal/de respaldo en un clúster espejo de SafeKit.

Esta guía describe cómo comprobar que la dirección IP virtual (VIP) de un clúster espejo de SafeKit (módulo espejo) funciona correctamente en su red: la VIP la mantiene el servidor principal y se redirige al nuevo servidor principal después de una conmutación por error.

## 1. Principios clave

**Requisito previo:** ambos nodos del clúster espejo deben estar en la misma subred IP de capa 2: una LAN o una VLAN extendida entre sitios remotos.

- La VIP está activa solo en el **servidor principal** (estados PRIM o ALONE): se establece como un alias de la dirección IP física, en la tarjeta de red de esa dirección, cuando el módulo se inicia como principal en el nodo (configuración `where="one_side_alias"` ).
- Por lo tanto, la dirección MAC del servidor principal es la asociada con la VIP en las tablas ARP (enrutador, puerta de enlace, clientes en la misma subred). Todo el tráfico dirigido a la VIP se envía al servidor principal.
- Durante una conmutación por error (parada o fallo del servidor principal), la IP virtual (VIP) se elimina del servidor principal anterior y se establece como un alias en el nuevo servidor principal. A continuación, dos mecanismos permiten que la red asocie la VIP con la dirección MAC del nuevo servidor principal:
  - los mensajes de red enviados por el sistema operativo cuando se agrega la IP virtual como un alias en la tarjeta de red;
  - los **GARP** (ARP gratuitos) enviados por SafeKit, cuando el atributo `arpreroute="on"` está configurado en la sección `<vip>` .

Por lo tanto, lo que necesitas probar es:

1. que el VIP está alojado en el servidor principal y es accesible desde los clientes;
2. que la red (enrutador, puerta de enlace, virtualización) tenga en cuenta el GARP cuando cambia el servidor principal.

## 2. Requisito previo: Configuración VIP

1. En el `userconfig.xml` del módulo espejo, configure la VIP en la sección `<vip>` . El atributo `arpreroute="on"` hace que el nuevo primario envíe GARPs después de una conmutación por error:

   ```xml
   <vip>
     <interface_list>
       <interface arpreroute="on">
         <real_interface>
           <virtual_addr addr="<VIP>" where="one_side_alias"/>
         </real_interface>
       </interface>
     </interface_list>
   </vip>
   ```

2. Aplique la configuración en ambos nodos.
3. Inicie el módulo: un nodo debe estar **en estado PRIM (Listo)** y el otro **en estado SEGUNDO (Listo)** .

## 3. Prueba 1 – VIP en poder del servidor principal

**Pasos**

1. En el servidor principal, ejecute `ipconfig` (Windows) o `ip addr show` (Linux).
   → **Resultado esperado:** la VIP aparece como un alias en la tarjeta de red de la dirección IP física.
2. En el servidor secundario, ejecute el mismo comando.
   → **Resultado esperado:** el VIP no aparece.
3. Desde una estación de trabajo cliente **fuera del clúster** , `ping` tanto a las direcciones IP físicas como a la IP virtual (VIP).
   → **Resultado esperado:** los tres comandos `ping` responden (a menos que estén filtrados por cortafuegos).
4. Compruebe el acceso a través del VIP con el mosaico SafeKit: desde un navegador en la estación de trabajo del cliente, conéctese a `http://<VIP>:9010/safekit/mosaic.html` , luego ingrese el **nombre del módulo** espejo y ejecute la prueba.
   → **Resultado esperado:** todas las celdas del mosaico muestran el nombre del **servidor principal** , en un solo color: todas las conexiones TCP a la VIP son atendidas por el servidor principal.

## 4. Prueba 2: Conmutación por error manual (parada del sistema principal)

Esta prueba verifica que la IP virtual (VIP) siga al servidor principal durante una conmutación por error, que se activa al detener el módulo en el servidor principal.

**Pasos**

1. Detenga el módulo en el nodo principal (nodo 1) desde la consola de SafeKit (o desde la línea de comandos con `safekit stop -m <module>` ).
   → **Resultado esperado:** el nodo 1 pasa a STOP (NotReady) y el nodo 2 pasa a ALONE (Ready). En el registro del nuevo nodo primario, aparece el mensaje `Virtual IP <VIP> set` .
2. En el nuevo servidor principal, ejecute `ipconfig` o `ip addr show` .
   → **Resultado esperado:** el VIP ahora aparece como un alias en este nodo, y ya no en el nodo principal anterior.
3. Desde la estación de trabajo del cliente, repita los tres comandos `ping` y ejecute nuevamente el mosaico en la IP virtual (VIP).
   → **Resultado esperado:** todo responde y todas las celdas del mosaico ahora muestran el nombre del **nuevo color primario** , en un solo color.
4. Reinicia el módulo en el nodo 1: se resincroniza y pasa a SEGUNDO (Listo), mientras que el nodo 2 pasa a PRIM (Listo).

**Limitación de esta prueba:** un resultado correcto en el paso 3 no demuestra que los GARP enviados por SafeKit funcionen. Cuando la VIP se establece como un alias en el nuevo servidor principal, el propio sistema operativo envía mensajes a la red que pueden redirigir la asociación de la dirección IP virtual/dirección MAC. Solo las pruebas 3 y 4 verifican realmente la redirección de esta asociación.

## 5. Prueba 3: comprobación del redireccionamiento GARP con `arp -a`

Anota la dirección MAC asociada a la VIP antes de la conmutación por error y, a continuación, comprueba que haya cambiado posteriormente.

Esta prueba solo es posible si la estación de trabajo cliente se encuentra en la **misma subred IP** que el clúster.

Si existe un enrutador entre el cliente y el clúster, la tabla ARP del cliente no contiene la IP virtual (VIP), sino la dirección de la puerta de enlace utilizada para acceder a la red del clúster. En ese caso, se debe verificar la configuración de GARP en la tabla ARP del enrutador o la puerta de enlace, en colaboración con el equipo de red.

**Pasos**

1. El módulo está en estado PRIM (Listo) en el nodo 1 y en estado SECOND (Listo) en el nodo 2.
2. En la estación de trabajo del cliente, `ping` a ambas direcciones IP físicas y a la VIP, luego ejecute `arp -a` .
   → **Resultado esperado:** el VIP está asociado con la **misma dirección MAC que la dirección IP física del principal** .
3. `stop` el módulo en el nodo principal (nodo 1).
4. `ping` al VIP de nuevo y luego ejecuta `arp -a` otra vez.
   → **Resultado esperado:** el VIP ahora está asociado con la **misma dirección MAC que la dirección IP física del nuevo principal** .

> Vuelva `ping` al VIP antes de leer la tabla ARP: la entrada puede estar marcada como obsoleta y solo se actualizará después de un `ping` .

Ejemplo de la tabla ARP esperada, antes y después de detener el servidor principal:

| Dirección | MAC antes de la parada | MAC después de la parada |
|---|---|---|
| Dirección IP física del nodo 1 | Dirección MAC del nodo 1 | Dirección MAC del nodo 1 |
| Dirección IP física del nodo 2 | Dirección MAC del nodo 2 | Dirección MAC del nodo 2 |
| VIP | **MAC del nodo 1** | **MAC del nodo 2** |

## 6. Prueba 4: Verificación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux).

Se puede seguir una conexión TCP a la IP virtual capturando paquetes en el cliente y en ambos nodos: con Wireshark en máquinas Windows y con tcpdump en máquinas Linux.

Debes fijarte en las **cabeceras MAC (Ethernet) de los paquetes** : la dirección IP de destino sigue siendo la VIP, y es la dirección MAC de destino la que muestra qué nodo recibe el tráfico.

**Lo que debes observar:**

| Cuándo | Dónde capturar | Direcciones MAC observadas |
|---|---|---|
| Antes de la conmutación por error | cliente | MAC del cliente → MAC del **nodo 1 (principal)** |
| Antes de la conmutación por error | nodo 1 | Se reciben paquetes en la IP virtual; el nodo 2 no recibe nada |
| Durante la conmutación por error | red | GARP enviado por el nodo 2 para el VIP |
| Después de la conmutación por error | cliente | MAC del cliente → MAC del **nodo 2 (nuevo primario)** |

Si la estación de trabajo cliente se encuentra en una subred distinta a la del clúster, la dirección MAC del cliente que se observa en los nodos es la dirección MAC de la **puerta de enlace** (enrutador) que conecta ambas subredes, no la de la estación de trabajo cliente. Del mismo modo, en la estación de trabajo cliente, los paquetes dirigidos a la IP virtual se envían a la dirección MAC de su propia puerta de enlace.

## 7. ¿Desde qué estaciones de trabajo realizar las pruebas?

El comportamiento depende de la ruta de red entre el cliente y el clúster. Ejecute las pruebas 1 y 2 desde cada tipo de cliente relevante para su arquitectura:

| Ubicación del cliente | Qué comprueba la prueba |
|---|---|
| Cliente en la **misma subred** que el clúster | Actualización de las tablas ARP de los clientes por GARP (prueba 3 posible) |
| Cliente en una **subred diferente** (enrutador, puerta de enlace, red virtual del hipervisor) | Manejo de GARP por parte del enrutador o puerta de enlace |
| Máquina virtual cliente **en un hipervisor que también aloja una máquina virtual de clúster** | Comportamiento del conmutador virtual del hipervisor, que también gestiona la conmutación y el enrutamiento internos |

## 8. Resumen de los resultados esperados

| Prueba | Acción | Resultado esperado |
|---|---|---|
| 1 | PRIM / SEGUNDO, `ipconfig` , `ping` y mosaic | VIP como alias solo en el principal; los 3 comandos `ping` responden (a menos que sean filtrados por firewalls); el mosaic muestra solo el principal |
| 2 | Detener el principal | VIP como alias en el nuevo principal; `Virtual IP <VIP> set` mensaje; el mosaico muestra solo el nuevo principal |
| 3 | `arp -a` antes y después de detener el nodo principal | La VIP cambia de la dirección MAC del nodo 1 a la del nodo 2 |
| 4 | Captura de Wireshark o tcpdump antes y después de la conmutación por error | El cliente envía a la dirección MAC del nuevo primario |

## 9. Solución de problemas

- **Tras la conmutación por error, el VIP deja de responder:** un dispositivo en la ruta (enrutador, puerta de enlace, conmutador virtual) no tiene en cuenta GARP y continúa enviando tráfico a la dirección MAC del antiguo dispositivo principal. Consulte con su equipo de red cómo se gestiona GARP.
- **Envío de GARPs:** el atributo `arpreroute="on"` de la sección `<vip>` (con `arpinterval` y `arpelapse` ) envía GARPs regularmente en el VIP después de la conmutación por error. Consulte la Guía del usuario, sección 13.6.4 " [Sintaxis `<vip>`](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico de la resolución VIP ↔ MAC:** consulte la Guía del usuario, sección 7.24 " [Solución de problemas de resolución VIP ↔ MAC](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Issue_with_VIP) " y sección 7.16 " [Problema con la IP virtual después de la conmutación por error](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Problem_with_the_1) ".
