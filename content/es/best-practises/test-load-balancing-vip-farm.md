---
title: "Prueba de la dirección IP virtual de equilibrio de carga en un clúster de SafeKit."
canonical: "https://safekit.eviden.com/es/best-practises/test-load-balancing-vip-farm/"
description: "Aprenda a probar el balanceo de carga de SafeKit entre los nodos del clúster y a verificar la conmutación por error de IP virtual, el redireccionamiento GARP y el comportamiento de la red."
category: "best-practises"
lang: "es"
topics: "Principios clave, Requisito previo: el mosaico SafeKit, Prueba 1: Distribución de conexiones, Prueba 2: Cambio de servidor de despacho, Prueba 3: Comprobación del redireccionamiento GARP con arp -a, Prueba 4: Comprobación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux), Estaciones de trabajo para realizar la prueba, Resumen de los resultados esperados, Solución de problemas"
---

# Prueba de la dirección IP virtual de equilibrio de carga en un clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit.

Esta guía describe cómo comprobar que SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (módulo <span class="notranslate farm-term" translate="no">Farm</span> , balanceo de carga en una dirección IP virtual) funciona correctamente en su red: distribución de las conexiones entre los nodos y redireccionamiento de la IP virtual cuando el nodo de distribución se detiene.

## 1. Principios clave

**Requisito previo:** todos los nodos de la <span class="notranslate farm-term" translate="no">Farm</span> deben estar en la misma subred IP de capa 2: una LAN o una VLAN extendida entre sitios remotos.

- La IP virtual (VIP) se configura localmente en cada nodo de la <span class="notranslate farm-term" translate="no">Farm</span> : se establece como un alias de la dirección IP física, en la tarjeta de red de esa dirección, cuando se inicia la <span class="notranslate farm-term" translate="no">Farm</span> en el nodo.
- Un único nodo, el **servidor de despacho** , recibe el tráfico de red para la VIP (configuración `vmac_directed` , la predeterminada de SafeKit): su dirección MAC es la asociada con la VIP en las tablas ARP (enrutador, puerta de enlace, clientes en la misma subred).
- El filtro del núcleo de este nodo distribuye las conexiones TCP entre los nodos de la <span class="notranslate farm-term" translate="no">Farm</span> , **modificando la dirección MAC de destino** de los paquetes para que coincida con la del nodo que procesa la conexión (la dirección IP de destino sigue siendo la VIP). Las respuestas se envían directamente desde el nodo que procesa la conexión al cliente.
- La distribución realizada por el filtro es **determinista** : el nodo de procesamiento se calcula a partir de la identidad del cliente, de acuerdo con la regla de equilibrio de carga configurada:
  - en la **dirección IP del cliente** ( `filter="on_addr"` ): un cliente determinado siempre es atendido por el mismo nodo, lo que garantiza la afinidad de la sesión;
  - En el **puerto TCP del cliente** ( `filter="on_port"` ): cada conexión TCP del mismo cliente puede ser atendida por un nodo diferente. Esta es la regla utilizada para el mosaico (sección 2), que muestra todos los nodos de una misma estación de trabajo.
- Si el servidor de despacho se detiene, otro nodo asume esta función y envía **GARP** (ARP gratuito) para que la red asocie la VIP con su propia dirección MAC.

Por lo tanto, lo que necesitas probar es:

1. que las conexiones estén correctamente distribuidas entre todos los nodos;
2. que la red (enrutador, puerta de enlace, virtualización) tenga en cuenta el GARP cuando cambia el servidor de despacho.

## 2. Requisito previo: el mosaico SafeKit

El mosaico es una página de prueba proporcionada por SafeKit. Abre múltiples conexiones TCP al VIP y muestra, para cada una, el nombre del nodo que respondió. Esto permite visualizar la distribución de un vistazo.

1. En el `userconfig.xml` del módulo <span class="notranslate farm-term" translate="no">Farm</span> , en la sección `<vip>` , agregue la regla de balanceo de carga en el puerto del servidor web SafeKit. Ejemplo con el servidor web SafeKit en HTTP en el puerto 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Si el servidor web y la consola de SafeKit se han cambiado a HTTPS, sustituya el puerto 9010 por el 9453.

2. Aplique la configuración en todos los nodos.
3. Desde un navegador en una estación de trabajo cliente **fuera de la <span class="notranslate farm-term" translate="no">Farm</span>** , conéctese a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   A continuación, introduzca el **nombre del módulo** <span class="notranslate farm-term" translate="no">Farm</span> y ejecute la prueba. Cada celda del mosaico muestra el nombre del nodo que respondió a la conexión TCP, y se asocia un color a cada nodo para mostrar claramente los bloques del mosaico atendidos por el mismo nodo.

   En HTTPS, utilice `https://<VIP>:9453/safekit/mosaic.html` , con la regla de equilibrio de carga en el puerto 9453.

La prueba se describe en detalle en la Guía del usuario de SafeKit 8.2, sección 4.3.5 " [Prueba de equilibrio de carga TCP en una dirección IP virtual](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#Mosaic) ".

## 3. Prueba 1 – Distribución de conexiones

**Pasos**

1. Iniciar la <span class="notranslate farm-term" translate="no">Farm</span> en todos los nodos (estado UP).
2. Abra el mosaico desde una estación de trabajo del cliente.

**Resultado esperado:** el mosaico muestra los nombres de **todos los nodos** de la <span class="notranslate farm-term" translate="no">Farm</span> , con un color diferente para cada nodo de procesamiento.

Esto demuestra que el enrutador o puerta de enlace ascendente llega a uno de los nodos a través de su dirección MAC, y que este nodo distribuye correctamente las conexiones.

## 4. Prueba 2 – Cambio de servidor de despacho

Esta prueba verifica que la <span class="notranslate farm-term" translate="no">Farm</span> siga respondiendo cuando el servidor de despacho se detenga.

**Pasos**

1. Detén la <span class="notranslate farm-term" translate="no">Farm</span> , es decir, todos los nodos en SafeKit.
2. Inicie **un único nodo** . Este nodo se convertirá en el servidor de despacho.
   → **Resultado esperado:** el mosaico muestra solo este nodo.
3. Inicia los demás nodos.
   → **Resultado esperado:** el mosaico muestra todos los nodos.
4. Detén el **primer nodo** , el que actúa como servidor de despacho.
   → **Resultado esperado:** el mosaico muestra los nodos restantes.

**Limitación de esta prueba:** un resultado correcto en el paso 4 no demuestra que GARP funcione. Cuando se inicia el módulo <span class="notranslate farm-term" translate="no">Farm</span> en los demás nodos (paso 3), se configura la dirección IP virtual en estos nodos, lo que genera mensajes en la red que pueden redirigir la asociación entre la dirección IP virtual y la dirección MAC. Solo las pruebas 3 y 4 realmente prueban GARP.

> Detener cualquier otro nodo de la <span class="notranslate farm-term" translate="no">Farm</span> (uno que no sea el servidor de despacho) solo prueba la reconfiguración de la distribución.

## 5. Prueba 3: comprobación del redireccionamiento GARP con `arp -a`

Junto con la prueba 4, esta prueba realmente verifica GARP: se anota la dirección MAC del servidor de despacho antes de detenerlo y luego se comprueba que la asociación VIP/MAC haya cambiado posteriormente.

Esta prueba solo es posible si la estación de trabajo cliente que muestra el mosaico se encuentra en la **misma subred IP** que la <span class="notranslate farm-term" translate="no">Farm</span> .

Si existe un enrutador entre el cliente y la <span class="notranslate farm-term" translate="no">Farm</span> de servidores, la tabla ARP del cliente no contiene la IP virtual (VIP), sino la dirección de la puerta de enlace utilizada para acceder a la red de la <span class="notranslate farm-term" translate="no">Farm</span> . En ese caso, se debe verificar la configuración de GARP en la tabla ARP del enrutador o la puerta de enlace, junto con el equipo de red.

**Pasos**

1. Inicia la <span class="notranslate farm-term" translate="no">Farm</span> en todos los nodos.
2. En la estación de trabajo del cliente, ejecute `arp -a` y anote la dirección MAC asociada a la VIP. Esta identifica al servidor de despacho.
3. Detenga el nodo <span class="notranslate farm-term" translate="no">Farm</span> que tiene esta dirección MAC.
4. Comprueba que el mosaico siga funcionando con los nodos restantes.
5. Vuelva a ejecutar `arp -a` para leer la nueva asociación VIP/MAC e identificar el nuevo servidor de despacho.

## 6. Prueba 4: Verificación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux).

Se puede seguir una conexión TCP a la IP virtual capturando paquetes en el cliente y en los nodos <span class="notranslate farm-term" translate="no">Farm</span> : con Wireshark en máquinas Windows y con tcpdump en máquinas Linux.

Debes fijarte en las **cabeceras MAC (Ethernet) de los paquetes** , no solo en las direcciones IP: el filtro del kernel del servidor de distribución distribuye las conexiones **reescribiendo la dirección MAC de destino** de los paquetes a la del nodo de procesamiento. La dirección IP de destino sigue siendo la IP virtual (VIP) a lo largo de toda la ruta.

**Lo que debes observar para el mismo paquete SYN:**

| Paso | Dónde capturar | Direcciones MAC observadas |
|---|---|---|
| 1. El cliente envía al VIP | cliente | MAC del cliente → MAC del **servidor de despacho** |
| 2. El servidor de despacho reenvía la conexión | servidor de despacho | MAC de despacho → MAC del **nodo de procesamiento** |
| 3. El nodo de procesamiento recibe | nodo de procesamiento | MAC de despacho → MAC del nodo |
| 4. El nodo responde directamente al cliente | nodo de procesamiento | MAC del nodo → MAC del cliente (SYN-ACK) |
| 5. El cliente recibe la respuesta | cliente | MAC del nodo → MAC del cliente |

Si la estación de trabajo cliente se encuentra en una subred distinta a la del <span class="notranslate farm-term" translate="no">Farm</span> , la dirección MAC del cliente que se observa en los nodos <span class="notranslate farm-term" translate="no">Farm</span> es la dirección MAC de la **puerta de enlace** (enrutador) que conecta ambas subredes, no la de la estación de trabajo cliente. Del mismo modo, en la estación de trabajo cliente, los paquetes dirigidos a la IP virtual se envían a la dirección MAC de su propia puerta de enlace.

Repita la captura después de detener el servidor de despacho (prueba 2, paso 4): el paso 1 ahora debe mostrar la dirección MAC del **nuevo** servidor de despacho.

## 7. ¿Desde qué estaciones de trabajo realizar las pruebas?

El comportamiento depende de la ruta de red entre el cliente y la <span class="notranslate farm-term" translate="no">Farm</span> . Ejecute las pruebas 1 y 2 desde cada tipo de cliente relevante para su arquitectura:

| Ubicación del cliente | Qué comprueba la prueba |
|---|---|
| Cliente en la **misma subred** que la <span class="notranslate farm-term" translate="no">Farm</span> | Actualización de las tablas ARP de los clientes por GARP (prueba 3 posible) |
| Cliente en una **subred diferente** (enrutador, puerta de enlace, red virtual del hipervisor) | Manejo de GARP por parte del enrutador o puerta de enlace |
| Máquina virtual cliente **en un hipervisor que también aloja una máquina virtual <span class="notranslate farm-term" translate="no">Farm</span>** | Comportamiento del conmutador virtual del hipervisor, que también gestiona la conmutación y el enrutamiento internos |

## 8. Resumen de los resultados esperados

| Prueba | Acción | Resultado esperado |
|---|---|---|
| 1 | Todos los nodos ACTIVOS, mosaico | Todos los nodos aparecen |
| 2.2 | Se inició un único nodo | Solo aparece este nodo |
| 2.3 | Todos los nodos se han iniciado | Todos los nodos aparecen |
| 2.4 | Servidor de despacho detenido | Los nodos restantes aparecen, sin interrupción duradera |
| 3 | `arp -a` antes y después de la parada | La dirección MAC asociada con el VIP cambia |
| 4 | Captura de Wireshark o tcpdump antes y después de la parada | El cliente envía a la dirección MAC del nuevo servidor de despacho |

## 9. Solución de problemas

- **El mosaico deja de responder tras la detención del servidor de distribución:** un dispositivo en la ruta (enrutador, puerta de enlace, conmutador virtual) no tiene en cuenta GARP. Consulte con su equipo de red para verificar la gestión de GARP.
- **Envío periódico de GARP:** el atributo `arpreroute="on"` de la sección `<vip>` (con `arpinterval` y `arpelapse` ) envía GARPs regularmente a los VIP. Consulte la Guía del usuario, sección 13.6.4 " [Sintaxis `<vip>`](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico de la resolución VIP ↔ MAC:** consulte la Guía del usuario, sección 7.24 " [Solución de problemas de la resolución VIP ↔ MAC](https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Issue_with_VIP) " y sección 7.15 " [Módulo <span class="notranslate farm-term" translate="no">Farm</span> UP (Listo) pero problema de equilibrio de carga en una <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/es/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".
