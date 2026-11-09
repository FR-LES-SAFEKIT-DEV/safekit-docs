---
title: "Configuración antigua SafeKit Milestone"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "es"
topics: "Configuración paso a paso de la solución SafeKit/Milestone XProtect"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Configuración antigua SafeKit Milestone {#old-safekit-milestone-configuration}

## Configuración paso a paso de la solución SafeKit/Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Tenga cuidado, se requieren algunos pasos específicos para configurar la dirección IP virtual; de lo contrario, la conmutación por error no funcionará.

### 1. Inicie la consola SafeKit {#1-launch-the-safekit-console}

  * Inicie la consola web en un navegador en un nodo del clúster conectándose a `http://localhost:9010`.
  * Introduzca `admin` como nombre de usuario y la contraseña definida durante la instalación.


También puede ejecutar la consola en un navegador en una estación de trabajo externa al clúster.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


La configuración de SafeKit se realiza en ambos nodos desde un único navegador.


![Nota](/wp-content/uploads/2022/07/note.png)


Para proteger la consola web, consulte la sección «Protección de la consola web SafeKit en la Guía del usuario.


![Inicie la consola web SafeKit para configurar el clúster](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configurar las direcciones de los nodos {#2-configure-node-addresses}

  * Introduzca las direcciones IP de los nodos.
  * A continuación, haga clic en `Apply` para guardar la configuración.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si el color de fondo node1 o node2 es rojo, compruebe la conectividad del navegador con ambos nodos y compruebe el cortafuegos en ambos nodos para solucionar problemas.


![Nota](/wp-content/uploads/2022/07/note.png)


Esta operación colocará las direcciones IP en el archivo `cluster.xml` de ambos nodos (más información en la formación con la línea de comandos).


![Introduzca los nodos del clúster](/wp-content/uploads/2023/01/appli-3.png)


### 3. Seleccione el módulo {#3-choose-the-module}

  * En la pestaña Configuración, haga clic en el módulo .safe.


![Nota](/wp-content/uploads/2022/07/note.png)


La consola encuentra xxx.safe en el directorio 'Application_Modules/demo/' del lado del servidor si ha dejado un módulo allí durante la instalación.


![Seleccione el módulo para](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configurar el módulo {#4-configure-the-module}

  * Elija el inicio automático del módulo al arrancar sin demora.
  * Normalmente, se utiliza una única red heartbeat en la que se realiza la replicación. Sin embargo, si es necesario, se puede definir una red privada.
  * Compruebe que los directorios replicados estén instalados en ambos nodos y que contengan los datos de la aplicación.  
La replicación de datos y también de los registros es necesaria para una base de datos.  
Puede agregar nuevos directorios replicados según sea necesario.
  * Introduzca una dirección IP virtual. Una dirección IP virtual es una dirección IP estándar en la misma red IP (misma subred) que las direcciones IP de ambos nodos.  
Los clientes de la aplicación deben configurarse con la dirección IP virtual (o el nombre DNS asociado a la dirección IP virtual).  
La dirección IP virtual se conmuta automáticamente en caso de fallo.
  * `start_prim` y `stop_prim` deben contener el inicio y la detención de la aplicación.  
Puedes añadir nuevos servicios en estos scripts.  
Compruebe que los nombres de los servicios en estos scripts sean los instalados en ambos nodos; de lo contrario, modifíquelos en los scripts.
  * Detenga los servicios configurados en `start_prim` en ambos nodos.
  * En Windows y en ambos nodos, con el administrador de servicios Windows, establezca `Boot Startup Type = Manual` para todos los servicios registrados en `start_prim` (SafeKit controla el inicio de los servicios en `start_prim`).


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si SQL está en el servidor de administración:

  * Las [bases de datos del sistema SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf y mastlog.ldf) deben estar ubicadas en los mismos directorios en ambos nodos. Los directorios deben configurarse como replicados.
  * SQL también debe estar instalado en la misma ubicación en el sistema de archivos de ambos nodos porque la [base de datos de recursos SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) de solo lectura se encuentra en el binario y es necesaria para la conmutación por error. Esta base de datos no necesita ser replicada.
  * Las bases de datos SQL Milestone (.mdf y .ldf) deben estar ubicadas en los mismos directorios en ambos nodos. Los directorios deben configurarse como replicados. Las bases de datos Milestone son las siguientes según este [artículo](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>).


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Tenga en cuenta que si un nombre de proceso se muestra en el Verificador de procesos, se supervisará con una acción de reinicio en caso de fallo. La configuración de un nombre de proceso incorrecto hará que el módulo se detenga justo después de su inicio.


![Nota](/wp-content/uploads/2022/07/note.png)


El botón "Aplicar" informará de la configuración en los archivos `userconfig.xml`, `start_prim` y `stop_prim` en ambos nodos (más información en la formación con la línea de comandos).


![Acceda a la configuración del módulo](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Verifique que la configuración se haya realizado correctamente {#5-verify-successful-configuration}

  * Compruebe el mensaje de éxito (en verde) en ambos nodos y haga clic en Siguiente.


![Compruebe el éxito de la configuración del módulo](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. No inicie nada y haga clic en el botón Cerrar {#6-do-not-start-anything-and-click-on-the-close-button}


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


No inicie nada ni haga clic en el botón Cerrar, ya que se requiere una configuración especial en la dirección IP virtual antes de iniciar


![Seleccione el nodo con los datos actualizados](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Vaya al escritorio del nodo 1 y configure la dirección IP virtual en los archivos internos Milestone {#milestone-files}


![Nota](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, este paso no es útil y se realizará automáticamente con " Server Configurator - Registro de servidores - http://virtual-IP" en un paso siguiente.

En una línea de comandos de Powershell como administrador, ejecute este script en el nodo 1:
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![Nota](/wp-content/uploads/2022/07/note.png)


Este script establece la dirección IP virtual en 2 archivos internos Milestone:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< IP virtual>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtual-ip>**/IDP"


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


En este paso, asumimos que la dirección IP virtual se ha configurado correctamente en los pasos anteriores (el script utiliza la dirección IP virtual introducida en la consola SafeKit y almacenada en `userconfig.xml`).


![Nota](/wp-content/uploads/2022/07/note.png)


### 8. Inicie el nodo 1 como primario en la consola, el nodo con los datos actualizados {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

A partir del paso 7, suponemos que el nodo 1 tiene los directorios replicados actualizados.

Forzar el inicio del nodo 1 como primario. Cuando se inicie el nodo 2, todos los datos del nodo 1 se copiarán al nodo 2.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si se toma la decisión equivocada, se corre el riesgo de sincronizar datos obsoletos en ambos nodos.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


También se asume que la aplicación se detiene en el nodo 1 para que SafeKit instale los mecanismos de replicación y luego inicie la aplicación en el script `start_prim`.


![Forzar el inicio como primario del nodo con los datos actualizados](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Espere a que la transición sea a ALONE (verde) {#9-wait-for-the-transition-to-alone-green}

  * El nodo 1 debe alcanzar el estado ALONE (verde), lo que significa que el script `start_prim` se ha ejecutado en el nodo 1.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si el estado es ALONE (verde) y la aplicación no se ha iniciado, compruebe los mensajes de salida de `start_prim` en el registro de aplicaciones del nodo 1.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si el nodo 1 no alcanza el estado ALONE (verde), analice el motivo con el registro del módulo del nodo 1.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si el clúster está en estado `WAIT (red) not uptodate - STOP (red) not uptodate`, detenga el nodo WAIT y fuerce su inicio como primario.


![El primer nodo comienza como primario y se convierte en ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. En el escritorio del nodo 1, detenga, luego registre la dirección IP virtual y reinicie el servidor de gestión Milestone {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Ejecute los siguientes puntos en el nodo 1 según el menú de la imagen:

  * Haga clic con el botón derecho en el icono **del servidor de gestión Milestone** en la barra de tareas.
  * **Detener el servicio del servidor de gestión**
  * A continuación, seleccione **Server Configurator ...** y registre la dirección IP virtual.
  * **Iniciar el servicio del servidor de gestión**


![Nota](/wp-content/uploads/2022/07/note.png)


Este procedimiento registra el servidor de gestión del nodo 1 en la base de datos SQL (que se ejecuta en el nodo 1) a través de una conexión a la dirección virtual.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Antes de la versión Milestone 2022 R3, es posible que el registro haya eliminado la configuración de la dirección IP virtual en los archivos internos Milestone. En este caso, repita [el paso 7](#milestone-files).


![Nota](/wp-content/uploads/2022/07/note.png)


Nota: Para registrar una versión anterior a Milestone 2020 R2, utilice **Cambiar configuración de cifrado...**


![Registre el servidor de gestión en Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. En el escritorio del nodo 1 con Milestone Management Client, establezca la dirección IP virtual en las URL de los servicios y la red {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![Nota](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, este paso no es útil y se ha realizado automáticamente con " Server Configurator - Registro de servidores - http://virtual-IP".

Según la imagen:

  1. Inicie **Milestone XProtect Management Client** en el nodo 1.
  2. En el menú **Herramientas**, seleccione **Servicios registrados**. 
     * En la ventana **Agregar/quitar servicios registrados**, seleccione un servicio de la lista y haga clic en **Editar**.
     * En la ventana **Editar servicio registrado**, cambie la dirección URL del servicio por la misma dirección URL, pero que contenga la dirección IP virtual.
     * Repita estos pasos para todos los servicios que aparecen en la ventana.
  3. En la misma ventana, haga clic en **Red**. 
     * En la ventana **Configuración de red**, cambie la dirección URL del servidor por la misma dirección URL, pero que contenga la dirección IP virtual.


![Configure la dirección IP virtual en las URL y en el Management Client Milestone](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. En el escritorio del nodo 1 con Milestone Management Client, configure los roles de administrador para garantizar una conmutación por error correcta {#role}


![Nota](/wp-content/uploads/2022/07/note.png)


Si la autenticación Windows Milestone se ha configurado con un Active Directory, el usuario/contraseña se recuperará en el AD externo en el nodo secundario después de una conmutación por error, por lo que no hay ninguna configuración especial.

Cuando inicie el Management Client Milestone XProtect, deberá autenticarse con "autenticación Windows " o "autenticación básica" ([haga clic aquí para ver la captura de pantalla](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

Abra **Milestone XProtect Management Client** y vaya a **Seguridad / Roles** (ver imagen)

  * Establezca el grupo Windows **BUILTIN\Administrators**. De este modo, un usuario administrador en el servidor secundario podrá conectarse a Milestone en el servidor secundario con "autenticación Windows ".
  * Cree un usuario con una "autenticación básica" (**Admin** en la imagen) para asegurarse de volver a autenticarse en el nodo secundario después de una conmutación por error. Para la "autenticación básica", el usuario/contraseña se almacena en la base de datos SQL y se recuperará en el nodo secundario después de una conmutación por error.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Al configurar el grupo BUILTIN\Administrators, podrá autenticarse en el nodo secundario con un administrador local Windows.

De lo contrario, no será posible la autenticación con una cuenta local Windows en el equipo secundario después de una conmutación por error.

Esto se debe a que el grupo BUILTIN\Administrators tiene el mismo SID en ambos nodos. Para otros grupos locales o usuarios locales, la autenticación no será posible en el secundario porque los SID son diferentes entre ambos nodos, incluso si tienen el mismo nombre.


![Establecer roles en el Management Client Milestone](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Vaya al escritorio del nodo 2 y configure la dirección IP virtual en los archivos internos Milestone {#milestone-files-2}


![Nota](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, este paso no es útil y se realizará automáticamente con " Server Configurator - Registro de servidores - http://virtual-IP" en un paso siguiente.

En una línea de comandos de Powershell como administrador, ejecute este script en el nodo 2:
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![Nota](/wp-content/uploads/2022/07/note.png)


Este script establece la dirección IP virtual en 2 archivos internos Milestone:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< IP virtual>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtual-ip>**/IDP"

### 14. En el escritorio del nodo 2, registre el servidor de gestión en la dirección IP virtual {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Seleccione **Server Configurator** en la barra de tareas del nodo 2 y regístrelo en la dirección IP virtual (véase la imagen).
  * A continuación, **detenga el servicio del servidor de gestión**.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


La cuenta del usuario que ejecuta el registro en el nodo 2 debe tener el rol de administrador en Milestone en el nodo 1.

Si el administrador local del nodo 2 realiza el registro, el grupo integrado Windows `BUILTIN\Administrators` debe haberse configurado en Management Client / Seguridad / Roles en el [paso 12](#role) De lo contrario, el registro no funcionará.


![Nota](/wp-content/uploads/2022/07/note.png)


Este procedimiento registra el servidor de gestión del nodo 2 en la base de datos SQL (que se ejecuta en el nodo 1) a través de una conexión a la dirección virtual.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Con una versión de Milestone anterior a la 2022 R3, el registro puede haber eliminado la configuración de la dirección IP virtual en los archivos internos Milestone. En este caso, repita [el paso 13](#milestone-files-2).


![Registre el servidor de gestión con Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Iniciar nodo 2 {#15-start-node-2}

  * Inicie el nodo 2 con su menú contextual.
  * Espere al SECOND estado (verde).


![Nota](/wp-content/uploads/2022/07/note.png)


El nodo 2 permanece en el SECOND estado (magenta) mientras se resincronizan los directorios replicados (copia del nodo 1 al nodo 2).

Esto puede tardar un tiempo, dependiendo del tamaño de los archivos que se van a resincronizar en los directorios replicados y del ancho de banda de la red.

Para ver el progreso de la copia, consulte el registro del módulo del nodo 2 con la opción detallada, sin olvidar actualizar la ventana.


![El primer nodo comienza como primario y se convierte en ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. Compruebe que el clúster está operativo {#16-verify-that-the-cluster-is-operational}

  * Compruebe que el clúster esté en verde/verde con los servicios ejecutándose en el nodo PRIM y no en el nodo SECOND.


En este estado, solo los cambios dentro de los archivos se replican en tiempo real.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Los componentes que son clientes de los servicios deben configurarse con la dirección IP virtual. La configuración se puede realizar con un nombre DNS (si se ha creado un nombre DNS y se ha asociado con la dirección IP virtual).


![El segundo nodo comienza como SECOND](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configure la dirección IP virtual en los servidores de grabación {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Instale los servidores de grabación, especificando la dirección IP virtual en la URL de instalación.
  * O bien, en el lado de los servidores de grabación, configure la dirección IP virtual en los siguientes campos de 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Conecte el Milestone Management Client y el Milestone Smart Client en la dirección IP virtual.


### 18. Management Client y Smart Client no funcionan correctamente después del cambio de nodo {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

En una configuración de clúster de XProtect Management Server, Smart Client y Management Client muestran varios problemas después de un cambio de nodo. El problema está relacionado con los tokens que se generan en diferentes nodos antes y después del cambio de nodo, y con problemas para acceder a ciertos certificados necesarios para la validación de tokens. Hay una solución disponible (para las versiones 2022 R3 a 2023 R2, consulte la base de conocimientos Milestone).

El problema se ha resuelto en Milestone 2023 R3.

### 18. Pruebas {#18-testing}

  * Detenga el nodo PRIM desplazándose hacia abajo en su menú contextual y haciendo clic en Detener. **No utilice el intercambio para una primera prueba** (vea por qué a continuación).
  * Verifique que haya una conmutación por error en el SECOND nodo, que debería quedar ALONE (en verde).
  * Y con Microsoft Management Console (MMC), compruebe la conmutación por error de los servicios (detenidos en el nodo 1 en el script `stop_prim` y iniciados en el nodo 2 en el script `start_prim`).


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si su sistema es PRIM-SECOND y todo funciona correctamente, realice una parada en el PRIM y verifique que todo funciona correctamente en el node2, que se convierte en ALONE. Si todo está bien, inicie un inicio en node1, que resincronizará los directorios replicados desde node2.

Si las cosas van mal, detenga node2 y fuerce el inicio como primario del node1, que se reiniciará con sus datos localmente saludables en el momento de la detención.

El intercambio implica un inicio y parada del PRIM, que resincronizará los datos del node2 inmediatamente después de su parada, sin dejar ninguna posibilidad de reinicio en datos correctos si hay un problema de configuración de replicación.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si la aplicación no se inicia en el nodo 2 mientras el estado es ALONE (verde), compruebe los mensajes de salida del script `start_prim` en el registro de aplicaciones del nodo 2.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si no se alcanza ALONE (verde), analice el motivo con el registro del módulo del nodo 2.


![Nota](/wp-content/uploads/2022/07/note.png)


Más información sobre las pruebas en la Guía del usuario


![Detenga el módulo en el servidor PRIM](/wp-content/uploads/2022/07/appli-19.png)