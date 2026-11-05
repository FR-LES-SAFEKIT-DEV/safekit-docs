---
title: "Prueba de la dirección IP virtual de un clúster mirror de SafeKit"
canonical: "https://safekit.eviden.com/es/best-practises/test-primary-backup-vip-mirror/"
description: "Pruebe la disponibilidad de la IP virtual y la conmutación por error en un clúster mirror de SafeKit, incluyendo el redireccionamiento GARP, las comprobaciones ARP y las capturas de paquetes."
category: "best-practises"
lang: "es"
topics: "Principios clave, Prerrequisito: configuración de IP virtual (VIP), Prueba 1: IP virtual (VIP) mantenida por el servidor principal, Prueba 2: conmutación por error manual (detención del principal), Prueba 3: comprobación del redireccionamiento GARP con arp -a, Prueba 4: comprobación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux), Desde qué estaciones de trabajo realizar las pruebas, Resumen de los resultados esperados, Solución de problemas"
translation: "translate_md 2026-11-05.10 | glossaire 2026-11-05.14 | Translation LLM | 14 expressions"
---

# Prueba de la dirección IP virtual de un clúster mirror de SafeKit en tu red {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

Esta guía describe cómo comprobar que la dirección IP virtual (VIP) de un clúster mirror SafeKit (módulo mirror) funciona correctamente en su red: la IP virtual (VIP) es mantenida por el servidor primario y se redirige al nuevo servidor primario después de una conmutación por error.

## 1. Principios clave {#1-key-principles}

**Requisito:** ambos nodos del clúster mirror deben estar en la misma subred IP de capa 2: una LAN o una VLAN extendida entre sitios remotos.

- La IP virtual (VIP) está activa solo en el **servidor principal** (estados PRIM o ALONE): se establece como un alias de la dirección IP física, en la tarjeta de red de esa dirección, cuando el módulo se inicia como principal en el nodo (`where="one_side_alias"`).
- Por lo tanto, la dirección MAC del servidor principal es la asociada con la IP virtual (VIP) en las tablas ARP (enrutador, puerta de enlace, clientes en la misma subred). Todo el tráfico a la IP virtual (VIP) se envía al servidor principal.
- Durante una conmutación por error (parada o fallo del primario), la IP virtual (VIP) se elimina del anterior primario y se establece como un alias en el nuevo primario. A continuación, dos mecanismos permiten que la red asocie la IP virtual (VIP) con la dirección MAC del nuevo primario:
  - los mensajes de red enviados por el sistema operativo cuando la IP virtual (VIP) se agrega como un alias en la tarjeta de red;
  - los **GARP** (ARP gratuitos) enviados por SafeKit, cuando el atributo `arpreroute="on"` está configurado en la sección `<vip>`.

Por lo tanto, lo que debe probar es:

1. la IP virtual (VIP) la mantiene el servidor principal y es accesible desde los clientes;
2. la dirección MAC asociada con la IP virtual (VIP) se redirige al nuevo primario en la red (enrutador, puerta de enlace, virtualización) cuando el servidor primario cambia.

## 2. Requisito previo: configuración de la IP virtual (VIP) {#2-prerequisite-virtual-ip-vip-configuration}

1. En el `userconfig.xml` del módulo mirror, configure la IP virtual (VIP) en la sección `<vip>`. El atributo `arpreroute="on"` hace que el nuevo primario envíe GARP después de una conmutación por error:

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
3. Inicie el módulo: un nodo debe estar en **PRIM (Ready)** y el otro **SECOND (Ready)**.

## 3. Prueba 1: IP virtual (VIP) en poder del servidor principal {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**Pasos**

1. En el servidor principal, ejecute `ipconfig` (Windows) o `ip addr show` (Linux).
   → **Resultado esperado:** la IP virtual (VIP) aparece como un alias en la tarjeta de red de la dirección IP física.
2. En el servidor secundario, ejecute el mismo comando.
   → **Resultado esperado:** la IP virtual (VIP) no aparece.
3. Desde una estación de trabajo cliente **externa al clúster**, `ping` a las dos direcciones IP físicas y a la IP virtual (VIP).
   → **Resultado esperado:** los tres comandos `ping` responden (a menos que estén filtrados por cortafuegos).
4. Compruebe el acceso a través de la IP virtual (VIP) con el mosaico de SafeKit: desde un navegador en el cliente **externo**, conéctese a `http://<VIP>:9010/safekit/mosaic.html` (o utilice el puerto 9453 si el servidor web y la consola de SafeKit se han cambiado a HTTPS), luego introduzca el **nombre del módulo** mirror y ejecute la prueba.
   → **Resultado esperado:** todas las celdas del mosaico muestran el nombre del **servidor principal**, en un solo color: todas las conexiones TCP a la IP virtual (VIP) son atendidas por el servidor principal.

![Pruebe la dirección IP virtual de un mirror de SafeKit con el mosaico](/wp-content/uploads/2024/03/appli-20.png)

## 4. Prueba 2: Conmutación por error manual (detención del primario) {#4-test-2--manual-failover-stop-of-the-primary}

Esta prueba verifica que la IP virtual (VIP) siga al servidor principal durante una conmutación por error, que se activa al detener el módulo en el servidor principal.

**Pasos**

1. Detenga el módulo en el primario (nodo 1) desde la consola de SafeKit (o desde la línea de comandos con `safekit stop -m <module>`).
   → **Resultado esperado:** el nodo 1 pasa a STOP (NotReady) y el nodo 2 pasa a ALONE (Ready). En el registro del nuevo primario, aparece el mensaje `Virtual IP <VIP> set`.
2. En la nueva interfaz principal, ejecute `ipconfig` o `ip addr show`.
   → **Resultado esperado:** la IP virtual (VIP) ahora aparece como un alias en este nodo y ya no en el anterior primario.
3. Desde la estación de trabajo del cliente, repita los tres comandos `ping` y ejecute el mosaico de nuevo en la IP virtual (VIP).
   → **Resultado esperado:** todo responde y todas las celdas del mosaico muestran ahora el nombre del **nuevo primario**, en un solo color.
4. Reinicie el módulo en el nodo 1: se resincroniza y pasa a SECOND (Ready), mientras que el nodo 2 pasa a PRIM (Ready).

## 5. Prueba 3: Comprobación del redireccionamiento MAC con `arp -a` {#5-test-3--checking-mac-rerouting-with-arp--a}

Anote la dirección MAC asociada a la IP virtual (VIP) antes de la conmutación por error y, a continuación, compruebe que ha cambiado después.

Esta prueba solo es posible si la estación de trabajo del cliente se encuentra en la **misma subred IP** que el clúster.

Si hay un enrutador entre el cliente y el clúster, la tabla ARP del cliente no contiene la IP virtual (VIP), sino la dirección de la puerta de enlace utilizada para llegar a la red del clúster. En ese caso, compruebe la tabla ARP del enrutador o la puerta de enlace con el equipo de red.

**Pasos**

1. El módulo es PRIM (Ready) en el nodo 1 y SECOND (Ready) en el nodo 2.
2. En la estación de trabajo del cliente, `ping` a las direcciones IP físicas y a la IP virtual (VIP), y luego ejecute `arp -a`.
   → **Resultado esperado:** la IP virtual (VIP) se asocia con la **misma dirección MAC que la dirección IP física del primario**.
3. `stop` el módulo en el primario (nodo 1).
4. `ping` a la IP virtual (VIP) de nuevo y, a continuación, ejecute `arp -a` de nuevo.
   → **Resultado esperado:** la IP virtual (VIP) ahora está asociada con la **misma dirección MAC que la dirección IP física del nuevo primario**.

> `ping` a la IP virtual (VIP) de nuevo antes de leer la tabla ARP: la entrada puede estar marcada como obsoleta y solo se actualiza después de un `ping`.

Ejemplo de la tabla ARP esperada, antes y después de que se detenga el primario:

| Dirección | MAC antes de la parada | MAC después de la parada |
|---|---|---|
| IP física del nodo 1 | MAC del nodo 1 | MAC del nodo 1 |
| IP física del nodo 2 | MAC del nodo 2 | MAC del nodo 2 |
| IP virtual (VIP) | **MAC del nodo 1** | **MAC del nodo 2** |

## 6. Prueba 4: Comprobación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

Puede seguir una conexión TCP a la IP virtual (VIP) capturando paquetes en el cliente y en ambos nodos: con Wireshark en máquinas Windows y con tcpdump en máquinas Linux.

Debe mirar los **encabezados MAC (Ethernet) de los paquetes**: la dirección IP de destino sigue siendo la IP virtual (VIP), y es la dirección MAC de destino la que muestra qué nodo recibe el tráfico.

**Lo que debe observar:**

| Cuándo | Dónde capturar paquetes | Direcciones MAC observadas |
|---|---|---|
| Antes de la conmutación por error | cliente | MAC del cliente → MAC del **nodo 1 (principal)** |
| Antes de la conmutación por error | nodo 1 | Se reciben los paquetes dirigidos a la IP virtual (VIP); el nodo 2 no recibe nada. |
| Durante la conmutación por error | red | MAC redirige los mensajes enviados por el nodo 2 para la IP virtual (VIP): mensajes enviados por el SO cuando se establece como alias, y GARP enviados por SafeKit (`arpreroute="on"`) |
| Después de la conmutación por error | cliente | MAC del cliente → MAC del **nodo 2 (nuevo primario)** |

> Si la estación de trabajo del cliente se encuentra en una subred diferente a la del clúster, la "MAC del cliente" que se ve en los nodos es la dirección MAC de la **puerta de enlace** (enrutador) que conecta las dos subredes, no la de la estación de trabajo del cliente.

## 7. Desde qué estaciones de trabajo realizar las pruebas {#7-which-workstations-to-test-from}

El comportamiento depende de la ruta de red entre el cliente y el clúster. Ejecute las pruebas 1 y 2 desde cada tipo de cliente relevante para su arquitectura:

| Ubicación del cliente | Qué comprueba la prueba |
|---|---|
| El cliente está en la **misma subred** que el clúster. | Actualización de las tablas ARP de los clientes (prueba 3 posible) |
| Cliente en una **subred diferente** (router, puerta de enlace, red virtual del hipervisor) | Actualización de las tablas ARP de los clientes en el enrutador o la puerta de enlace. |
| Máquina virtual de cliente **en un hipervisor que también aloja una máquina virtual del clúster mirror** | Comportamiento del conmutador virtual del hipervisor, que también gestiona la conmutación y el enrutamiento internos. |

## 8. Resumen de los resultados esperados {#8-summary-of-expected-results}

| Prueba | Acción | Resultado esperado |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` y mosaico | IP virtual (VIP) como alias solo en el primario; los 3 comandos `ping` responden (a menos que los cortafuegos los filtren); el mosaico muestra solo el primario |
| 2 | Parada del primario | IP virtual (VIP) como alias en el nuevo primario; mensaje `Virtual IP <VIP> set` ; el mosaico muestra solo el nuevo primario |
| 3 | `arp -a` antes y después de que se detenga el primario | La IP virtual (VIP) se mueve de la dirección MAC del nodo 1 a la del nodo 2. |
| 4 | Captura de Wireshark o tcpdump antes y después de la conmutación por error. | El cliente envía a la dirección MAC del nuevo primario |

## 9. Solución de problemas {#9-troubleshooting}

- **La IP virtual (VIP) ya no responde después de la conmutación por error:** los mensajes de redireccionamiento de MAC no son tenidos en cuenta por un dispositivo en la ruta (router, gateway, switch virtual), que sigue enviando tráfico a la dirección MAC del anterior primario. Compruebe el manejo de los mensajes de redireccionamiento de MAC con su equipo de red.
- **Envío de GARP:** el atributo `arpreroute="on"` de la sección `<vip>` (con `arpinterval` y `arpelapse`) envía GARP regularmente en la IP virtual (VIP) después de la conmutación por error. Consulte la Guía del usuario, sección 13.6.4 " [Sintaxis `<vip>`](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico de la resolución de IP virtual (VIP) ↔ MAC:** consulte la Guía del usuario, sección 7.24 " [Solución de problemas de la resolución de IP virtual (VIP) ↔ MAC](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Issue_with_VIP) " y la sección 7.16 " [Problema con la IP virtual después de la conmutación por error](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Para más información:
- [¿Cómo funciona una dirección IP virtual en la agrupación en clústeres de alta disponibilidad?](/es/best-practises/how-a-virtual-ip-address-works/)
- Para el balanceo de carga con una dirección IP virtual, consulte [la sección «Prueba de la dirección IP virtual de balanceo de carga en un clúster farm de SafeKit»](/es/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-es  %}}
