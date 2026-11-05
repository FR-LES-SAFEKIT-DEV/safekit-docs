---
title: "Prueba de la dirección IP virtual de equilibrio de carga en un clúster farm de SafeKit"
canonical: "https://safekit.eviden.com/es/best-practises/test-load-balancing-vip-farm/"
description: "Aprenda a probar el equilibrio de carga de SafeKit en los nodos del clúster y a verificar la conmutación por error de la IP virtual, el redireccionamiento GARP y el comportamiento de la red."
category: "best-practises"
lang: "es"
topics: "Principios clave, Prerrequisito: el mosaico de SafeKit, Prueba 1 - Distribución de conexiones, Prueba 2 - Cambio de servidor de distribución, Prueba 3 - Comprobación de la redirección GARP con arp -a, Prueba 4 - Comprobación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux), Desde qué estaciones de trabajo probar, Resumen de los resultados esperados, Solución de problemas, Demostración de la solución farm de SafeKit"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 14 expressions"
---

# Prueba de la dirección IP virtual de equilibrio de carga en un clúster <span class="notranslate farm-term" translate="no">farm</span> de SafeKit {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

Esta guía describe cómo comprobar que un SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (módulo <span class="notranslate farm-term" translate="no">Farm</span>, equilibrio de carga en una dirección IP virtual) funciona correctamente en su red: distribución de conexiones entre los nodos y redireccionamiento de la IP virtual (VIP) cuando el nodo de distribución se detiene.

## 1. Principios clave {#1-key-principles}

**Requisito previo:** todos los nodos de la <span class="notranslate farm-term" translate="no">Farm</span> deben estar en la misma subred IP de capa 2: una LAN o una VLAN extendida entre sitios remotos.

- La IP virtual (VIP) se configura localmente en cada nodo de la <span class="notranslate farm-term" translate="no">Farm</span>: se establece como un alias de la dirección IP física, en la tarjeta de red de esa dirección, cuando la <span class="notranslate farm-term" translate="no">Farm</span> se inicia en el nodo.
- Un solo nodo, el **servidor de distribución**, recibe el tráfico de red para la IP virtual (VIP) (configuración `vmac_directed`, el valor predeterminado de SafeKit): su dirección MAC es la asociada con la IP virtual (VIP) en las tablas ARP (router, gateway, clientes en la misma subred).
- El filtro del kernel de este nodo distribuye las conexiones TCP entre los nodos de la <span class="notranslate farm-term" translate="no">Farm</span>, **reescribiendo la dirección MAC de destino** de los paquetes a la del nodo de procesamiento (la dirección IP de destino sigue siendo la IP virtual (VIP)). Las respuestas se envían directamente desde el nodo que procesa la conexión al cliente.
- La distribución realizada por el filtro es **determinista**: el nodo de procesamiento se calcula a partir de la identidad del cliente, de acuerdo con la regla de equilibrio de carga configurada:
  - en la **dirección IP del cliente** (`filter="on_addr"`): un cliente determinado siempre es atendido por el mismo nodo, lo que garantiza la afinidad de sesión;
  - en el **puerto TCP del cliente** (`filter="on_port"`): cada conexión TCP del mismo cliente puede ser atendida por un nodo diferente. Esta es la regla utilizada para el mosaico (sección 2), que por lo tanto muestra todos los nodos desde una sola estación de trabajo.
- Si el servidor de despacho se detiene, otro nodo asume este rol y envía **GARP** (ARP gratuito) para que la red asocie la IP virtual (VIP) con su propia dirección MAC.

Por lo tanto, lo que debe probar es:

1. que las conexiones se distribuyan correctamente entre todos los nodos;
2. que la red (enrutador, puerta de enlace, virtualización) tenga en cuenta el GARP cuando el servidor de distribución cambia.

## 2. Requisito previo: el mosaico de SafeKit {#2-prerequisite-the-safekit-mosaic}

El mosaico es una página de prueba proporcionada por SafeKit. Abre muchas conexiones TCP a la IP virtual (VIP) y muestra, para cada una, el nombre del nodo que respondió. Esto muestra la distribución de un vistazo.

1. En el `userconfig.xml` del módulo <span class="notranslate farm-term" translate="no">Farm</span>, en la sección `<vip>`, agregue la regla de equilibrio de carga en el puerto del servidor web SafeKit. Ejemplo con el servidor web SafeKit en HTTP en el puerto 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Si el servidor web y la consola de SafeKit se han configurado para usar HTTPS, reemplace el 9010 por el 9453.

2. Aplique la configuración en todos los nodos.
3. Desde un navegador en una estación de trabajo cliente **fuera de la <span class="notranslate farm-term" translate="no">Farm</span>**, conéctese a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   luego ingrese el **nombre del módulo** <span class="notranslate farm-term" translate="no">Farm</span> y ejecute la prueba. Cada celda del mosaico muestra el nombre del nodo que respondió a la conexión TCP, y se asocia un color a cada nodo para mostrar claramente los bloques del mosaico servidos por el mismo nodo.

   En HTTPS, utilice `https://<VIP>:9453/safekit/mosaic.html`, con la regla de equilibrio de carga en el puerto 9453.

![Pruebe la dirección IP virtual de una <span class="notranslate farm-term" translate="no">farm</span> de SafeKit con el mosaico](/wp-content/uploads/2024/03/appli-19.png)

Vea el vídeo de prueba mosaico en la sección « [Demostración de la solución <span class="notranslate farm-term" translate="no">farm</span> SafeKit](/es/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ».

## 3. Prueba 1 – Distribución de las conexiones {#3-test-1--distribution-of-connections}

**Pasos**

1. Inicie la <span class="notranslate farm-term" translate="no">Farm</span> en todos los nodos (estado UP).
2. Abra el mosaico desde una estación de trabajo cliente.

**Resultado esperado:** el mosaico muestra los nombres de **todos los nodos** de la <span class="notranslate farm-term" translate="no">Farm</span>, con un color diferente para cada nodo de procesamiento.

Esto demuestra que el enrutador o la puerta de enlace ascendente llega a uno de los nodos a través de su dirección MAC y que este nodo distribuye correctamente las conexiones.

## 4. Prueba 2 – Cambio de servidor de envío {#4-test-2--change-of-dispatching-server}

Esta prueba verifica que el <span class="notranslate farm-term" translate="no">Farm</span> siga respondiendo cuando el servidor de despacho se detiene.

**Pasos**

1. Detenga la <span class="notranslate farm-term" translate="no">Farm</span>, es decir, todos los nodos de SafeKit.
2. Inicie **un único nodo**. Este nodo se convierte en el servidor de distribución.
   → **Resultado esperado:** el mosaico muestra solo este nodo.
3. Inicie los otros nodos.
   → **Resultado esperado:** el mosaico muestra todos los nodos.
4. Detenga el **primer nodo**, el que actúa como servidor de distribución.
   → **Resultado esperado:** el mosaico muestra los nodos restantes.

> **Limitación de esta prueba:** un resultado correcto en el paso 4 no demuestra que GARP funcione. Cuando el módulo <span class="notranslate farm-term" translate="no">Farm</span> se inicia en los otros nodos (paso 3), la dirección IP virtual se configura en estos nodos, lo que genera mensajes en la red que pueden redirigir la asociación de la dirección IP virtual/dirección MAC. Solo las pruebas 3 y 4 prueban realmente GARP.

> Al detener cualquier otro nodo de la <span class="notranslate farm-term" translate="no">Farm</span> (que no sea el servidor de distribución) solo se prueba la reconfiguración de la distribución.

## 5. Prueba 3: Comprobación del redireccionamiento GARP con `arp -a` {#5-test-3--checking-garp-rerouting-with-arp--a}

Junto con la prueba 4, esta prueba realmente verifica GARP: anote la dirección MAC del servidor de distribución antes de detenerlo y luego verifique que la asociación de IP virtual (VIP)/MAC haya cambiado después.

Esta prueba solo es posible si la estación de trabajo del cliente que muestra el mosaico se encuentra en la **misma subred IP** que la <span class="notranslate farm-term" translate="no">Farm</span>.

Si hay un enrutador entre el cliente y la <span class="notranslate farm-term" translate="no">Farm</span>, la tabla ARP del cliente no contiene la IP virtual (VIP), sino la dirección de la puerta de enlace utilizada para llegar a la red de la <span class="notranslate farm-term" translate="no">Farm</span>. En ese caso, compruebe la tabla ARP del enrutador o la puerta de enlace con el equipo de red.

**Pasos**

1. Inicie la <span class="notranslate farm-term" translate="no">Farm</span> en todos los nodos.
2. En la estación de trabajo del cliente, ejecute `arp -a` y anote la dirección MAC asociada con la IP virtual (VIP). Esta identifica el servidor de distribución.
3. Detenga el nodo <span class="notranslate farm-term" translate="no">Farm</span> que tiene esta dirección MAC.
4. Comprueba que el mosaico sigue funcionando con los nodos restantes.
5. Ejecute `arp -a` de nuevo para leer la nueva asociación de IP virtual (VIP)/MAC e identificar el nuevo servidor de distribución.

## 6. Prueba 4: Comprobación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

Puede seguir una conexión TCP a la IP virtual (VIP) capturando paquetes en el cliente y en los nodos <span class="notranslate farm-term" translate="no">Farm</span>: con Wireshark en máquinas Windows y con tcpdump en máquinas Linux.

Debe mirar los **encabezados MAC (Ethernet) de los paquetes**, no solo las direcciones IP: el filtro del kernel del servidor de distribución distribuye las conexiones **reescribiendo la dirección MAC de destino** de los paquetes a la del nodo de procesamiento. La dirección IP de destino sigue siendo la IP virtual (VIP) a lo largo de toda la ruta.

**Lo que debe observar para el mismo paquete SYN:**

| Paso | Dónde capturar paquetes | Direcciones MAC observadas |
|---|---|---|
| 1. El cliente envía a la IP virtual (VIP) | cliente | MAC del cliente → MAC del **servidor de despacho** |
| 2. El servidor de despacho reenvía la conexión. | servidor de despacho | MAC del servidor de envío → MAC del **nodo de procesamiento** |
| 3. El nodo de procesamiento recibe | nodo de procesamiento | MAC del servidor de envío → MAC del nodo |
| 4. El nodo responde directamente al cliente. | nodo de procesamiento | MAC del nodo → MAC del cliente |
| 5. El cliente recibe la respuesta. | cliente | MAC del nodo → MAC del cliente |

> Si la estación de trabajo del cliente se encuentra en una subred diferente de la <span class="notranslate farm-term" translate="no">Farm</span>, la "MAC del cliente" que se ve en los nodos <span class="notranslate farm-term" translate="no">Farm</span> es la dirección MAC de la **puerta de enlace** (enrutador) que conecta las dos subredes, no la de la estación de trabajo del cliente.

Repita la captura después de detener el servidor de distribución (prueba 2, paso 4): el paso 1 debe mostrar ahora la dirección MAC del **nuevo** servidor de distribución.

## 7. Desde qué estaciones de trabajo realizar las pruebas {#7-which-workstations-to-test-from}

El comportamiento depende de la ruta de red entre el cliente y la <span class="notranslate farm-term" translate="no">Farm</span>. Ejecute las pruebas 1 y 2 desde cada tipo de cliente relevante para su arquitectura:

| Ubicación del cliente | Qué comprueba la prueba |
|---|---|
| El cliente está en la **misma subred** que la <span class="notranslate farm-term" translate="no">Farm</span> | Actualización de las tablas ARP de los clientes mediante GARP (prueba 3 posible) |
| Cliente en una **subred diferente** (router, puerta de enlace, red virtual del hipervisor) | Gestión GARP por parte del enrutador o la puerta de enlace |
| Máquina virtual de cliente **en un hipervisor que también aloja una máquina virtual <span class="notranslate farm-term" translate="no">Farm</span>** | Comportamiento del conmutador virtual del hipervisor, que también gestiona la conmutación y el enrutamiento internos. |

## 8. Resumen de los resultados esperados {#8-summary-of-expected-results}

| Prueba | Acción | Resultado esperado |
|---|---|---|
| 1 | Todos los nodos UP, mosaico | Aparecen todos los nodos. |
| 2.2 | Se inició un solo nodo. | Solo aparece este nodo. |
| 2.3 | Todos los nodos se han iniciado. | Aparecen todos los nodos. |
| 2.4 | El servidor de envío se detuvo. | Los nodos restantes aparecen sin interrupción duradera. |
| 3 | `arp -a` antes y después de la parada | La dirección MAC asociada a la IP virtual (VIP) cambia. |
| 4 | Captura de Wireshark o tcpdump antes y después de la detención | El cliente envía a la dirección MAC del nuevo servidor de reenvío. |

## 9. Solución de problemas {#9-troubleshooting}

- **Mapas de bits de equilibrio de carga:** para obtener más información sobre la prueba y los mapas de bits de equilibrio de carga, consulte la Guía del usuario de SafeKit 8.2, sección 4.3.5 " [Prueba de equilibrio de carga TCP en una dirección IP virtual](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#Mosaic) ".
- **El mosaico ya no responde después de que el servidor de despacho se detenga:** GARP no es tenido en cuenta por un dispositivo en la ruta (router, gateway, switch virtual). Compruebe el manejo GARP con su equipo de red.
- **Envío periódico de GARP:** el atributo `arpreroute="on"` de la sección `<vip>` (con `arpinterval` y `arpelapse`) envía GARP regularmente en las VIP. Consulte la Guía del usuario, sección 13.6.4 " [Sintaxis `<vip>`](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico de la resolución de IP virtual (VIP) ↔ MAC:** consulte la Guía del usuario, sección 7.24 " [Solución de problemas de la resolución de IP virtual (VIP) ↔ MAC](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Issue_with_VIP) " y la sección 7.15 " [Módulo <span class="notranslate farm-term" translate="no">Farm</span> UP (Ready), pero problema de equilibrio de carga en una <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".

## Demostración de la solución <span class="notranslate farm-term" translate="no">farm</span> de SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-es  %}}

Para más información:
- [¿Cómo funciona una dirección IP virtual en la agrupación en clústeres de alta disponibilidad?](/es/best-practises/how-a-virtual-ip-address-works/)
- Para la conmutación por error primaria/de respaldo con una dirección IP virtual, consulte [la sección Prueba de la dirección IP virtual de un clúster mirror SafeKit](/es/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-es  %}}
