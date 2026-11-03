---
title: "Prueba de la dirección IP virtual de un clúster espejo de SafeKit"
canonical: "https://safekit.eviden.com/es/best-practises/test-primary-backup-vip-mirror/"
description: "Pruebe la disponibilidad de IP virtual y la conmutación por error en un clúster espejo de SafeKit, incluyendo el redireccionamiento GARP, las comprobaciones ARP y la captura de paquetes."
category: "best-practises"
lang: "es"
topics: "Principios clave, Requisito previo: Configuración de IP virtual (VIP), Prueba 1: IP virtual (VIP) mantenida por el servidor principal, Prueba 2: Conmutación por error manual (detención del servidor principal), Prueba 3: Comprobación del redireccionamiento GARP con arp -a, Prueba 4: Comprobación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux), Estaciones de trabajo desde las que realizar la prueba, Resumen de los resultados esperados, Solución de problemas"
---

# Prueba de la dirección IP virtual de un clúster espejo de SafeKit en su red.

Esta guía describe cómo comprobar que la dirección IP virtual (VIP) de un clúster espejo de SafeKit (módulo espejo) funciona correctamente en su red: la IP virtual (VIP) la mantiene el servidor principal y se redirige al nuevo servidor principal después de una conmutación por error.

## 1. Principios clave

**Requisito previo:** ambos nodos del clúster espejo deben estar en la misma subred IP de capa 2: una LAN o una VLAN extendida entre sitios remotos.

- La IP virtual (VIP) está activa solo en el **servidor principal** (estados PRIM o ALONE): se establece como un alias de la dirección IP física, en la tarjeta de red de esa dirección, cuando el módulo se inicia como principal en el nodo (configuración `where="one_side_alias"` ).
- Por lo tanto, la dirección MAC del servidor principal es la asociada a la IP virtual (VIP) en las tablas ARP (enrutador, puerta de enlace, clientes en la misma subred). Todo el tráfico dirigido a la IP virtual (VIP) se envía al servidor principal.
- Durante una conmutación por error (parada o fallo del servidor principal), la IP virtual (VIP) se elimina del servidor principal anterior y se establece como un alias en el nuevo servidor principal. A continuación, dos mecanismos permiten que la red asocie la IP virtual (VIP) con la dirección MAC del nuevo servidor principal:
  - los mensajes de red enviados por el sistema operativo cuando se agrega la IP virtual (VIP) como un alias en la tarjeta de red;
  - los **GARP** (ARP gratuitos) enviados por SafeKit, cuando el atributo `arpreroute="on"` está configurado en la sección `<vip>` .

Por lo tanto, lo que necesitas probar es:

1. La IP virtual (VIP) la mantiene el servidor principal y es accesible desde los clientes;
2. La dirección MAC asociada a la IP virtual (VIP) se redirige al nuevo servidor principal de la red (enrutador, puerta de enlace, virtualización) cuando cambia el servidor principal.

## 2. Requisito previo: Configuración de IP virtual (VIP).

1. En el `userconfig.xml` del módulo espejo, configure la IP virtual (VIP) en la sección `<vip>` . El atributo `arpreroute="on"` hace que el nuevo primario envíe GARPs después de una conmutación por error:

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

## 3. Prueba 1: IP virtual (VIP) en poder del servidor principal.

**Pasos**

1. En el servidor principal, ejecute `ipconfig` (Windows) o `ip addr show` (Linux).
   → **Resultado esperado:** la IP virtual (VIP) aparece como un alias en la tarjeta de red de la dirección IP física.
2. En el servidor secundario, ejecute el mismo comando.
   → **Resultado esperado:** la IP virtual (VIP) no aparece.
3. Desde una estación de trabajo cliente **fuera del clúster** , `ping` tanto a las direcciones IP físicas como a la IP virtual (VIP).
   → **Resultado esperado:** los tres comandos `ping` responden (a menos que estén filtrados por cortafuegos).
4. Compruebe el acceso a través de la IP virtual (VIP) con el mosaico de SafeKit: desde un navegador en el cliente **externo** , conéctese a `http://<VIP>:9010/safekit/mosaic.html` (o use el puerto 9453 si el servidor web y la consola de SafeKit se han cambiado a HTTPS), luego ingrese el **nombre del módulo** espejo y ejecute la prueba.
   → **Resultado esperado:** todas las celdas del mosaico muestran el nombre del **servidor principal** , en un solo color: todas las conexiones TCP a la IP virtual (VIP) son atendidas por el servidor principal.

## 4. Prueba 2: Conmutación por error manual (parada del sistema principal)

Esta prueba verifica que la IP virtual (VIP) siga al servidor principal durante una conmutación por error, que se activa al detener el módulo en el servidor principal.

**Pasos**

1. Detenga el módulo en el nodo principal (nodo 1) desde la consola de SafeKit (o desde la línea de comandos con `safekit stop -m <module>` ).
   → **Resultado esperado:** el nodo 1 pasa a STOP (NotReady) y el nodo 2 pasa a ALONE (Ready). En el registro del nuevo nodo primario, aparece el mensaje `Virtual IP <VIP> set` .
2. En el nuevo servidor principal, ejecute `ipconfig` o `ip addr show` .
   → **Resultado esperado:** la IP virtual (VIP) ahora aparece como un alias en este nodo, y ya no en el anterior nodo principal.
3. Desde la estación de trabajo del cliente, repita los tres comandos `ping` y ejecute nuevamente el mosaico en la IP virtual (VIP).
   → **Resultado esperado:** todo responde y todas las celdas del mosaico ahora muestran el nombre del **nuevo color primario** , en un solo color.
4. Reinicia el módulo en el nodo 1: se resincroniza y pasa a SEGUNDO (Listo), mientras que el nodo 2 pasa a PRIM (Listo).

## 5. Prueba 3: comprobación del redireccionamiento MAC con `arp -a`

Anota la dirección MAC asociada a la IP virtual (VIP) antes de la conmutación por error y, a continuación, comprueba que haya cambiado.

Esta prueba solo es posible si la estación de trabajo cliente se encuentra en la **misma subred IP** que el clúster.

Si existe un enrutador entre el cliente y el clúster, la tabla ARP del cliente no contiene la IP virtual (VIP), sino la dirección de la puerta de enlace utilizada para acceder a la red del clúster. En ese caso, consulte la tabla ARP del enrutador o la puerta de enlace con el equipo de red.

**Pasos**

1. El módulo está en estado PRIM (Listo) en el nodo 1 y en estado SECOND (Listo) en el nodo 2.
2. En la estación de trabajo del cliente, `ping` a ambas direcciones IP físicas y a la IP virtual (VIP), luego ejecute `arp -a` .
   → **Resultado esperado:** la IP virtual (VIP) está asociada con la **misma dirección MAC que la dirección IP física del principal** .
3. `stop` el módulo en el nodo principal (nodo 1).
4. Vuelva `ping` a la IP virtual (VIP) y luego ejecute `arp -a` nuevamente.
   → **Resultado esperado:** la IP virtual (VIP) ahora está asociada con la **misma dirección MAC que la dirección IP física del nuevo principal** .

> Vuelva `ping` a la IP virtual (VIP) antes de leer la tabla ARP: la entrada puede estar marcada como obsoleta y solo se actualizará después de un `ping` .

Ejemplo de la tabla ARP esperada, antes y después de detener el servidor principal:

| Dirección | MAC antes de la parada | MAC después de la parada |
|---|---|---|
| Dirección IP física del nodo 1 | Dirección MAC del nodo 1 | Dirección MAC del nodo 1 |
| Dirección IP física del nodo 2 | Dirección MAC del nodo 2 | Dirección MAC del nodo 2 |
| IP virtual (VIP) | **MAC del nodo 1** | **MAC del nodo 2** |

## 6. Prueba 4: Verificación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux).

Se puede seguir una conexión TCP a la IP virtual (VIP) capturando paquetes en el cliente y en ambos nodos: con Wireshark en máquinas Windows y con tcpdump en máquinas Linux.

Debes fijarte en las **cabeceras MAC (Ethernet) de los paquetes** : la dirección IP de destino sigue siendo la IP virtual (VIP), y es la dirección MAC de destino la que muestra qué nodo recibe el tráfico.

**Lo que debes observar:**

| Cuándo | Dónde capturar | Direcciones MAC observadas |
|---|---|---|
| Antes de la conmutación por error | cliente | MAC del cliente → MAC del **nodo 1 (principal)** |
| Antes de la conmutación por error | nodo 1 | Se reciben paquetes en la IP virtual (VIP); el nodo 2 no recibe nada |
| Durante la conmutación por error | red | Mensajes de redireccionamiento MAC enviados por el nodo 2 para la IP virtual (VIP): mensajes enviados por el sistema operativo cuando se establece como un alias y GARP enviados por SafeKit ( `arpreroute="on"` ) |
| Después de la conmutación por error | cliente | MAC del cliente → MAC del **nodo 2 (nuevo primario)** |

Si la estación de trabajo cliente se encuentra en una subred diferente a la del clúster, la "MAC del cliente" que se ve en los nodos es la dirección MAC de la **puerta de enlace** (enrutador) que conecta las dos subredes, no la de la estación de trabajo cliente.

## 7. ¿Desde qué estaciones de trabajo realizar las pruebas?

El comportamiento depende de la ruta de red entre el cliente y el clúster. Ejecute las pruebas 1 y 2 desde cada tipo de cliente relevante para su arquitectura:

| Ubicación del cliente | Qué comprueba la prueba |
|---|---|
| Cliente en la **misma subred** que el clúster | Actualización de las tablas ARP de los clientes (prueba 3 posible) |
| Cliente en una **subred diferente** (enrutador, puerta de enlace, red virtual del hipervisor) | Actualización de las tablas ARP de los clientes en el enrutador o la puerta de enlace |
| Máquina virtual cliente **en un hipervisor que también aloja una máquina virtual del clúster espejo** | Comportamiento del conmutador virtual del hipervisor, que también gestiona la conmutación y el enrutamiento internos |

## 8. Resumen de los resultados esperados

| Prueba | Acción | Resultado esperado |
|---|---|---|
| 1 | PRIM / SEGUNDO, `ipconfig` , `ping` y mosaic | IP virtual (VIP) como alias solo en el principal; los 3 comandos `ping` responden (a menos que sean filtrados por firewalls); el mosaic muestra solo el principal |
| 2 | Detener la IP virtual (VIP) | como alias en la nueva IP principal; `Virtual IP <VIP> set` mensaje; el mosaico muestra solo la nueva IP principal |
| 3 | `arp -a` antes y después de que se detenga el nodo principal | La IP virtual (VIP) se mueve de la dirección MAC del nodo 1 a la del nodo 2 |
| 4 | Captura de Wireshark o tcpdump antes y después de la conmutación por error | El cliente envía a la dirección MAC del nuevo primario |

## 9. Solución de problemas

- **Tras la conmutación por error, la IP virtual (VIP) deja de responder:** los mensajes de redireccionamiento MAC no son tenidos en cuenta por los dispositivos de la ruta (enrutador, puerta de enlace, conmutador virtual), que siguen enviando tráfico a la dirección MAC del antiguo servidor principal. Consulte con su equipo de red cómo se gestionan los mensajes de redireccionamiento MAC.
- **Envío de GARPs:** el atributo `arpreroute="on"` de la sección `<vip>` (con `arpinterval` y `arpelapse` ) envía GARPs regularmente en la IP virtual (VIP) después de la conmutación por error. Consulte la Guía del usuario, sección 13.6.4 " [Sintaxis `<vip>`](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico de la resolución de IP virtual (VIP) ↔ MAC:** consulte la Guía del usuario, sección 7.24 " [Solución de problemas de resolución de IP virtual (VIP) ↔ MAC](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Issue_with_VIP) " y sección 7.16 " [Problema con la IP virtual después de la conmutación por error](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Para el equilibrio de carga con una dirección IP virtual, consulte [la sección "Prueba de la dirección IP virtual de equilibrio de carga en un clúster de SafeKit Farm"](/es/best-practises/test-load-balancing-vip-farm/) .
{{% insert-safekit-4-buttons-es %}}
