---
title: "Probar la dirección IP virtual de equilibrio de carga en un SafeKit farm grupo"
canonical: "https://safekit.eviden.com/es/best-practises/test-load-balancing-vip-farm/"
description: "Aprende a realizar pruebas SafeKit Realizar el balanceo de carga entre los nodos del clúster y verificar la conmutación por error de IP virtual, el redireccionamiento GARP y el comportamiento de la red."
category: "best-practises"
lang: "es"
topics: "Principios clave, Requisito previo: el SafeKit mosaico, Prueba 1 – Distribución de conexiones, Prueba 2 – Cambio de servidor de despacho, Prueba 3 – Comprobación del redireccionamiento GARP con arp -a, Prueba 4 – Comprobación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux), Estaciones de trabajo para realizar las pruebas, Resumen de los resultados esperados, Solución de problemas"
---

# Probar la dirección IP virtual de equilibrio de carga en un SafeKit <span class="notranslate farm-term" translate="no">farm</span> grupo

Esta guía describe cómo comprobar que un SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> El módulo (balanceo de carga en una dirección IP virtual) funciona correctamente en su red: distribución de conexiones entre los nodos y redireccionamiento de la IP virtual (VIP) cuando el nodo de despacho se detiene.

## 1. Principios clave

**Requisito previo:** todos los nodos del <span class="notranslate farm-term" translate="no">Farm</span> Deben estar en la misma subred IP de capa 2: una LAN o una VLAN extendida entre sitios remotos.

- La IP virtual (VIP) se configura localmente en cada nodo del sistema. <span class="notranslate farm-term" translate="no">Farm</span>: se establece como un alias de la dirección IP física, en la tarjeta de red de esa dirección, cuando la <span class="notranslate farm-term" translate="no">Farm</span> se inicia en el nodo.
- Un único nodo, el **servidor de despacho**, recibe el tráfico de red para la IP virtual (VIP) (`vmac_directed` la configuración, la SafeKit predeterminado): su dirección MAC es la asociada con la IP virtual (VIP) en las tablas ARP (enrutador, puerta de enlace, clientes en la misma subred).
- El filtro del núcleo de este nodo distribuye entonces las conexiones TCP entre los nodos del <span class="notranslate farm-term" translate="no">Farm</span>, por **reescribiendo la dirección MAC de destino** de los paquetes al del nodo de procesamiento (la dirección IP de destino sigue siendo la IP virtual (VIP)). Las respuestas se envían directamente desde el nodo que procesa la conexión al cliente.
- La distribución realizada por el filtro es **determinista**: el nodo de procesamiento se calcula a partir de la identidad del cliente, de acuerdo con la regla de equilibrio de carga configurada:
  - en el **dirección IP del cliente** (`filter="on_addr"`): un cliente determinado siempre es atendido por el mismo nodo, lo que garantiza la afinidad de la sesión;
  - en el **puerto TCP del cliente** (`filter="on_port"`Cada conexión TCP del mismo cliente puede ser atendida por un nodo diferente. Esta es la regla utilizada para el mosaico (sección 2), que muestra todos los nodos de una misma estación de trabajo.
- Si el servidor de despacho se detiene, otro nodo asume este rol y envía **GARPs** (ARP gratuito) para que la red asocie la IP virtual (VIP) con su propia dirección MAC.

Por lo tanto, lo que necesitas probar es:

1. que las conexiones estén correctamente distribuidas entre todos los nodos;
2. que la red (enrutador, puerta de enlace, virtualización) tenga en cuenta el GARP cuando cambia el servidor de despacho.

## 2. Requisito previo: el SafeKit mosaico

El mosaico es una página de prueba proporcionada por SafeKitAbre múltiples conexiones TCP a la IP virtual (VIP) y muestra, para cada una, el nombre del nodo que respondió. Esto permite visualizar la distribución de un vistazo.

1. En el `userconfig.xml` del <span class="notranslate farm-term" translate="no">Farm</span> módulo, en el `<vip>` sección, agregue la regla de equilibrio de carga en el puerto de la SafeKit servidor web. Ejemplo con el SafeKit Servidor web HTTP en el puerto 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Si el SafeKit El servidor web y la consola se han cambiado a HTTPS; sustituya el puerto 9010 por el 9453.

2. Aplique la configuración en todos los nodos.
3. Desde un navegador en una estación de trabajo cliente **fuera del <span class="notranslate farm-term" translate="no">Farm</span>**, conectarse a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   luego ingrese el <span class="notranslate farm-term" translate="no">Farm</span> **nombre del módulo** y ejecuta la prueba. Cada celda del mosaico muestra el nombre del nodo que respondió a la conexión TCP, y se asocia un color a cada nodo para mostrar claramente los bloques del mosaico atendidos por el mismo nodo.

   En HTTPS, utilice `https://<VIP>:9453/safekit/mosaic.html`, con la regla de equilibrio de carga en el puerto 9453.

La prueba se describe en detalle en el SafeKit 8.2 Guía del usuario, sección 4.3.5 "[Prueba de balanceo de carga TCP en una dirección IP virtual](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

Mira el vídeo de prueba del mosaico en el "[Demostración de la SafeKit <span class="notranslate farm-term" translate="no">farm</span> solución](/es/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution)" sección.

## 3. Prueba 1 – Distribución de conexiones

**Pasos**

1. Comienza el <span class="notranslate farm-term" translate="no">Farm</span> en todos los nodos (estado ACTIVO).
2. Abra el mosaico desde una estación de trabajo del cliente.

**Resultado esperado:** El mosaico muestra los nombres de **todos los nodos** del <span class="notranslate farm-term" translate="no">Farm</span>, con un color diferente para cada nodo de procesamiento.

Esto demuestra que el enrutador o puerta de enlace ascendente llega a uno de los nodos a través de su dirección MAC, y que este nodo distribuye correctamente las conexiones.

## 4. Prueba 2 – Cambio de servidor de despacho

Esta prueba comprueba que el <span class="notranslate farm-term" translate="no">Farm</span> Sigue respondiendo cuando el servidor de despacho se detiene.

**Pasos**

1. Detén el <span class="notranslate farm-term" translate="no">Farm</span>, es decir, todos los nodos en SafeKit.
2. Comenzar **un único nodo**Este nodo se convierte en el servidor de despacho.
   → **Resultado esperado:** El mosaico muestra únicamente este nodo.
3. Inicia los demás nodos.
   → **Resultado esperado:** El mosaico muestra todos los nodos.
4. Detén el **primer nodo**, el que actúa como servidor de despacho.
   → **Resultado esperado:** El mosaico muestra los nodos restantes.

> **Limitaciones de esta prueba:** Un resultado correcto en el paso 4 no prueba que GARP funcione. Cuando el <span class="notranslate farm-term" translate="no">Farm</span> El módulo se inicia en los demás nodos (paso 3), se configura la dirección IP virtual en estos nodos, lo que genera mensajes en la red que pueden redirigir la asociación entre la dirección IP virtual y la dirección MAC. Solo las pruebas 3 y 4 realmente prueban GARP.

> Detener cualquier otro nodo del <span class="notranslate farm-term" translate="no">Farm</span> (uno que no es el servidor de despacho) solo prueba la reconfiguración de la distribución.

## 5. Prueba 3 – Comprobación del redireccionamiento GARP con `arp -a`

Junto con la prueba 4, esta prueba realmente verifica GARP: usted anota la dirección MAC del servidor de despacho antes de detenerlo, luego verifica que la IP virtual (VIP)/MAC La asociación cambió posteriormente.

Esta prueba solo es posible si la estación de trabajo del cliente que muestra el mosaico está en el **misma subred IP** como el <span class="notranslate farm-term" translate="no">Farm</span>.

Si hay un enrutador entre el cliente y el <span class="notranslate farm-term" translate="no">Farm</span>, la tabla ARP del cliente no contiene la IP virtual (VIP), sino la dirección de la puerta de enlace utilizada para llegar a la <span class="notranslate farm-term" translate="no">Farm</span>red de. En ese caso, verifique la tabla ARP del enrutador o puerta de enlace con el equipo de red.

**Pasos**

1. Comienza el <span class="notranslate farm-term" translate="no">Farm</span> en todos los nodos.
2. En la estación de trabajo del cliente, ejecute `arp -a` y anote la dirección MAC asociada a la IP virtual (VIP). Esta identifica al servidor de despacho.
3. Detén el <span class="notranslate farm-term" translate="no">Farm</span> nodo que tiene esta dirección MAC.
4. Comprueba que el mosaico siga funcionando con los nodos restantes.
5. Correr `arp -a` Nuevamente para leer la nueva IP virtual (VIP)./MAC asociación e identificar el nuevo servidor de despacho.

## 6. Prueba 4 – Verificación de extremo a extremo con Wireshark (Windows) o tcpdump (Linux)

Puede seguir una conexión TCP a la IP virtual (VIP) capturando paquetes en el cliente y en el servidor. <span class="notranslate farm-term" translate="no">Farm</span> nodos: con Wireshark activado Windows máquinas y con tcpdump en Linux máquinas.

Debes mirar el **Encabezados MAC (Ethernet) de los paquetes**, no solo las direcciones IP: el filtro del kernel del servidor de despacho distribuye las conexiones por **reescribiendo la dirección MAC de destino** de los paquetes al del nodo de procesamiento. La dirección IP de destino sigue siendo la IP virtual (VIP) a lo largo de toda la ruta.

**Lo que debes observar para el mismo paquete SYN:**

| Paso | Dónde capturar | Direcciones MAC observadas |
|---|---|---|
| 1. El cliente envía a la IP virtual (VIP) | cliente | MAC del cliente → MAC del **servidor de despacho** |
| 2. El servidor de despacho reenvía la conexión. | servidor de despacho | Despacho MAC → MAC del **nodo de procesamiento** |
| 3. El nodo de procesamiento recibe | nodo de procesamiento | Despacho MAC → MAC del nodo |
| 4. El nodo responde directamente al cliente. | nodo de procesamiento | Dirección MAC del nodo → Dirección MAC del cliente |
| 5. El cliente recibe la respuesta. | cliente | Dirección MAC del nodo → Dirección MAC del cliente |

> Si la estación de trabajo del cliente se encuentra en una subred diferente a la de <span class="notranslate farm-term" translate="no">Farm</span>, la "MAC del cliente" que se ve en el <span class="notranslate farm-term" translate="no">Farm</span> nodos es la dirección MAC de **puerta** (enrutador) que conecta las dos subredes, no la de la estación de trabajo del cliente.

Repita la captura después de detener el servidor de despacho (prueba 2, paso 4): el paso 1 ahora debe mostrar la dirección MAC del **nuevo** servidor de despacho.

## 7. ¿Desde qué estaciones de trabajo realizar las pruebas?

El comportamiento depende de la ruta de red entre el cliente y el servidor. <span class="notranslate farm-term" translate="no">Farm</span>Ejecuta las pruebas 1 y 2 desde cada tipo de cliente relevante para tu arquitectura:

| Ubicación del cliente | Qué comprueba la prueba |
|---|---|
| Cliente en el **misma subred** como el <span class="notranslate farm-term" translate="no">Farm</span> | Actualización de las tablas ARP de los clientes por GARP (prueba 3 posible) |
| Cliente en un **subred diferente** (enrutador, puerta de enlace, red virtual de hipervisor) | Manejo de GARP por parte del enrutador o puerta de enlace |
| Máquina virtual cliente **en un hipervisor que también aloja un <span class="notranslate farm-term" translate="no">Farm</span> VM** | Comportamiento del conmutador virtual del hipervisor, que también gestiona la conmutación y el enrutamiento internos. |

## 8. Resumen de los resultados esperados

| Prueba | Acción | Resultado esperado |
|---|---|---|
| 1 | Todos los nodos ACTIVOS, mosaico | Todos los nodos aparecen |
| 2.2 | Se inició un único nodo | Solo aparece este nodo |
| 2.3 | Todos los nodos se iniciaron | Todos los nodos aparecen |
| 2.4 | El servidor de despacho se ha detenido. | Los nodos restantes aparecen sin interrupción duradera. |
| 3 | `arp -a` antes y después de la parada | La dirección MAC asociada a la IP virtual (VIP) cambia. |
| 4 | Captura con Wireshark o tcpdump antes y después de la parada. | El cliente envía a la dirección MAC del nuevo servidor de despacho. |

## 9. Solución de problemas

- **El mosaico deja de responder una vez que el servidor de distribución se detiene:** GARP no se tiene en cuenta en los dispositivos de la ruta (enrutador, puerta de enlace, conmutador virtual). Consulte con su equipo de red para verificar la gestión de GARP.
- **Envío periódico de GARP:** el `arpreroute="on"` atributo del `<vip>` sección (con `arpinterval` y `arpelapse`) envía GARPs regularmente a los VIP. Consulte la Guía del usuario, sección 13.6.4 "[`<vip>` sintaxis](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnóstico de IP virtual (VIP) ↔ Resolución MAC:** Consulte la Guía del Usuario, sección 7.24.[Solución de problemas de IP virtual (VIP) ↔ Resolución MAC](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", y la sección 7.15"[<span class="notranslate farm-term" translate="no">Farm</span> módulo UP (Listo) pero problema de equilibrio de carga en un <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Demostración de la SafeKit <span class="notranslate farm-term" translate="no">farm</span> solución {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-es  %}}

Para la conmutación por error principal/de respaldo con una dirección IP virtual, consulte [Probar la dirección IP virtual de un SafeKit mirror grupo](/es/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-es  %}}
