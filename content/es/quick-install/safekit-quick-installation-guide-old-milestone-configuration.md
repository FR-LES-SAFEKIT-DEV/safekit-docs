---
title: "Configuración antigua SafeKit Milestone"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "es"
topics: "Configuración paso a paso anterior de la solución SafeKit / Milestone XProtect"
---

# Configuración antigua SafeKit Milestone {#old-safekit-milestone-configuration}

## Configuración paso a paso anterior de la solución SafeKit / Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Tenga cuidado, se requieren algunos pasos específicos para configurar la dirección IP virtual; de lo contrario, la conmutación por error no funcionará.

### 1. Inicie la consola SafeKit {#1-launch-the-safekit-console}

  * Inicie la consola web en un navegador en un nodo del clúster conectándose a `http://localhost:9010` .
  * Introduzca `admin` como nombre de usuario y la contraseña definida durante la instalación.


También puede ejecutar la consola en un navegador en una estación de trabajo externa al clúster.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


La configuración de SafeKit se realiza en ambos nodos desde un único navegador.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Para proteger la consola web, consulte la sección "Protección de la consola web SafeKit en la Guía del usuario.


![ Inicie la consola web SafeKit para configurar el clúster ](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configure las direcciones de nodo {#2-configure-node-addresses}

  * Introduzca las direcciones IP de los nodos.
  * A continuación, haga clic en `Apply` para guardar la configuración.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si el color de fondo del nodo 1 o del nodo 2 es rojo, compruebe la conectividad del navegador con ambos nodos y revise el firewall en ambos nodos para solucionar el problema.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Esta operación colocará las direcciones IP en el archivo `cluster.xml` en ambos nodos (más información en el tutorial sobre la línea de comandos).


![ Introduzca los nodos del clúster ](/wp-content/uploads/2023/01/appli-3.png)


### 3. Seleccione el módulo {#3-choose-the-module}

  * En la pestaña Configuración, haga clic en el módulo .safe.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


La consola encuentra xxx.safe en el directorio 'Application_Modules/demo/' del servidor si colocaste un módulo allí durante la instalación.


![ Seleccione el módulo para ](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configure el módulo {#4-configure-the-module}

  * Seleccione el inicio automático del módulo al arrancar el sistema, sin demora.
  * Normalmente, se utiliza una única red de latidos sobre la que se realiza la replicación. Sin embargo, si es necesario, se puede definir una red privada.
  * Verifique que los directorios replicados estén instalados en ambos nodos y que contengan los datos de la aplicación.  
La replicación de datos y también de registros es necesaria para una base de datos.  
Puede agregar nuevos directorios replicados según sea necesario.
  * Introduzca una dirección IP virtual. Una dirección IP virtual es una dirección IP estándar que se encuentra en la misma red IP (misma subred) que las direcciones IP de ambos nodos.  
Los clientes de la aplicación deben configurarse con la dirección IP virtual (o el nombre DNS asociado a la dirección IP virtual).  
La dirección IP virtual se cambia automáticamente en caso de fallo.
  * `start_prim` y `stop_prim` deben contener el inicio y la detención de la aplicación.  
Puedes añadir nuevos servicios en estos scripts.  
Compruebe que los nombres de los servicios en estos scripts sean los instalados en ambos nodos; de lo contrario, modifíquelos en los scripts.
  * Detenga los servicios configurados en `start_prim` en ambos nodos.
  * En Windows y en ambos nodos, con el administrador de servicios Windows , configure `Boot Startup Type = Manual` para todos los servicios registrados en `start_prim` ( SafeKit controla el inicio de los servicios en `start_prim` ).


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si SQL está en el servidor de administración:

  * Las bases de datos del sistema SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf y mastlog.ldf) deben estar ubicadas en los mismos directorios en ambos nodos. Los directorios deben estar configurados como replicados.
  * SQL también debe estar instalado en la misma ubicación del sistema de archivos en ambos nodos, ya que la base de datos de recursos SQL de solo lectura [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) se encuentra en el binario y es necesaria para la conmutación por error. Esta base de datos no necesita ser replicada.
  * Las bases de datos SQL Milestone (.mdf y .ldf) deben estar ubicadas en los mismos directorios en ambos nodos. Los directorios deben estar configurados como replicados. Las bases de datos Milestone son las siguientes según este artículo [ ](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) .


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Tenga en cuenta que si se muestra el nombre de un proceso en el Comprobador de procesos, se supervisará y se reiniciará en caso de fallo. Configurar un nombre de proceso incorrecto provocará que el módulo se detenga inmediatamente después de su inicio.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


El botón "Aplicar" mostrará la configuración en los archivos `userconfig.xml` , `start_prim` y `stop_prim` en ambos nodos (más información en la capacitación con la línea de comandos).


![ Introduzca la configuración del módulo ](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Verifique que la configuración se haya realizado correctamente {#5-verify-successful-configuration}

  * Compruebe que el mensaje de éxito (en verde) aparezca en ambos nodos y haga clic en Siguiente.


![ Compruebe que la configuración del módulo se haya realizado correctamente. ](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. No inicie nada y haga clic en el botón Cerrar {#6-do-not-start-anything-and-click-on-the-close-button}


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


No inicie nada y haga clic en el botón Cerrar porque se requiere una configuración especial en la dirección IP virtual antes de comenzar.


![ Seleccione el nodo con los datos actualizados ](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Vaya al escritorio del nodo 1 y configure la dirección IP virtual en los archivos internos Milestone {#milestone-files}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, este paso no es útil y se realizará automáticamente con "Configurador del servidor - Registro de servidores - http://virtual-IP" en un paso siguiente.

En una línea de comandos de PowerShell como administrador, ejecute este script en el nodo 1:
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Este script establece la dirección IP virtual en 2 archivos internos Milestone :
    
    
    C:\ProgramData\ Milestone \ XProtect Servidor de administración\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Archivos de programa\ Milestone \ Servidor de administración XProtect \ IIS \IDP\appsettings.json
    
    
        "Autoridad": " http://**< virtual-ip>** /IDP "


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


En este punto, asumimos que la dirección IP virtual se ha configurado correctamente en los pasos anteriores (el script utiliza la dirección IP virtual introducida en la consola SafeKit y almacenada en `userconfig.xml` ).


Nota ![ ](/wp-content/uploads/2022/07/note.png)


### 8. Inicie el nodo 1 como primario en la consola, el nodo con los datos actualizados {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Partimos de la base de que, desde el paso 7, el nodo 1 tiene los directorios replicados actualizados.

Fuerza el inicio del nodo 1 como primario. Cuando se inicie el nodo 2, todos los datos del nodo 1 se copiarán al nodo 2.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si elige la opción incorrecta, corre el riesgo de sincronizar datos obsoletos en ambos nodos.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


También se supone que la aplicación está detenida en el nodo 1 para que SafeKit instale los mecanismos de replicación y luego inicie la aplicación en el script `start_prim` .


![ Fuerza el inicio como primario del nodo con los datos actualizados ](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Espere la transición a SOLO (verde) {#9-wait-for-the-transition-to-alone-green}

  * El nodo 1 debería alcanzar el estado ALONE (verde), lo que significa que el script `start_prim` se ha ejecutado en el nodo 1.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si el estado es SOLO (verde) y la aplicación no se ha iniciado, compruebe los mensajes de salida de `start_prim` en el registro de la aplicación del nodo 1.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si el nodo 1 no alcanza el estado SOLO (verde), analice el motivo con el registro del módulo del nodo 1.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si el clúster se encuentra en estado `WAIT (red) not uptodate - STOP (red) not uptodate` , detenga el nodo WAIT y fuerce su inicio como primario.


![ El primer nodo comienza como primario y se convierte en ALONE ](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. En el escritorio del nodo 1, detenga, regístrese en la dirección IP virtual y reinicie el servidor de administración Milestone {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Ejecute los siguientes puntos en el nodo 1 según el menú de la imagen:

  * Haga clic con el botón derecho en el icono del servidor de administración **Milestone** en la barra de tareas.
  * **Detener el servicio del servidor de administración**
  * Luego, seleccione el configurador del servidor **...** y registre la dirección IP virtual.
  * **Iniciar el servicio del servidor de administración**


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Este procedimiento registra el servidor de administración del nodo 1 en la base de datos SQL (que se ejecuta en el nodo 1) a través de una conexión a la dirección virtual.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Antes de la versión Milestone 2022 R3, el registro puede haber eliminado la configuración de la dirección IP virtual en los archivos internos Milestone . En este caso, repita el paso 7 [ ](#milestone-files) .


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Nota: Para registrar una versión anterior a Milestone 2020 R2, utilice **Cambiar configuración de cifrado...**


![ Registre el servidor de administración en Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. En el escritorio del nodo 1 con el cliente de administración Milestone , configure la dirección IP virtual en las URL para los servicios y la red {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, este paso no es útil y se ha realizado automáticamente con "Configurador de servidor - Registro de servidores - http://virtual-IP".

Según la imagen:

  1. Inicie el cliente de administración **Milestone XProtect** en el nodo 1.
  2. En el menú **Herramientas** , seleccione **Servicios registrados** . 
     * En la ventana **Agregar/Eliminar servicios registrados** , seleccione un servicio en la lista y haga clic en **Editar** .
     * En la ventana **Editar servicio registrado** , cambie la dirección URL del servicio por la misma dirección URL pero que contenga la dirección IP virtual.
     * Repita estos pasos para todos los servicios que aparecen en la ventana.
  3. En la misma ventana, haga clic en **Red** . 
     * En la ventana **de Configuración de red** , cambie la dirección URL del servidor por una igual pero que contenga la dirección IP virtual.


![ Configure la dirección IP virtual en las URL y en el cliente de administración Milestone ](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. En el escritorio del nodo 1 con el cliente de administración Milestone , configure los roles de administrador para garantizar una conmutación por error correcta {#role}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Si la autenticación Milestone " Windows " se ha configurado con un Active Directory, el usuario/contraseña se recuperará en el AD externo en el nodo secundario después de una conmutación por error, por lo que no hay ninguna configuración especial.

Cuando inicie el cliente de administración Milestone XProtect , deberá autenticarse con "autenticación Windows " o "autenticación básica" ( [ haga clic aquí para ver la captura de pantalla ](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) ).

Abra el cliente de administración **Milestone XProtect** y en **Seguridad / Roles** (ver imagen)

  * Configure el grupo Windows **BUILTIN\Administrators** . De esta forma, un usuario administrador en el servidor secundario podrá conectarse a Milestone en el servidor secundario con la autenticación " Windows ".
  * Cree un usuario con autenticación básica ( **Admin** en la imagen) para garantizar la autenticación en el nodo secundario tras una conmutación por error. Con la autenticación básica, el usuario y la contraseña se almacenan en la base de datos SQL y se recuperarán en el nodo secundario tras la conmutación por error.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Al configurar el grupo BUILTIN\Administrators, podrá autenticarse en el nodo secundario con un administrador local Windows .

De lo contrario, no será posible la autenticación con una cuenta local Windows en el servidor secundario después de una conmutación por error.

Esto se debe a que el grupo BUILTIN\Administrators tiene el mismo SID en ambos nodos. Para otros grupos o usuarios locales, la autenticación no será posible en el nodo secundario porque los SID son diferentes entre ambos nodos, aunque tengan el mismo nombre.


![ Establecer roles en el cliente de administración Milestone ](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Vaya al escritorio del nodo 2 y configure la dirección IP virtual en los archivos internos Milestone {#milestone-files-2}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, este paso no es útil y se realizará automáticamente con "Configurador del servidor - Registro de servidores - http://virtual-IP" en un paso siguiente.

En una línea de comandos de PowerShell como administrador, ejecute este script en el nodo 2:
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Este script establece la dirección IP virtual en 2 archivos internos Milestone :
    
    
    C:\ProgramData\ Milestone \ XProtect Servidor de administración\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Archivos de programa\ Milestone \ Servidor de administración XProtect \ IIS \IDP\appsettings.json
    
    
        "Autoridad": " http://**< virtual-ip>** /IDP "

### 14. En el escritorio del nodo 2, registre el servidor de administración en la dirección IP virtual {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Seleccione **Configurador de servidor** en la barra de tareas del nodo 2 y regístrelo en la dirección IP virtual (vea la imagen).
  * Luego, **detenga el servicio del servidor de administración** .


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


La cuenta del usuario que ejecuta el registro en el nodo 2 debe tener el rol de administrador en Milestone en el nodo 1.

Si es el administrador local del nodo 2 quien realiza el registro, el grupo integrado Windows `BUILTIN\Administrators` debe haberse configurado en Cliente de administración / Seguridad / Roles en el paso 12 [ . De lo contrario ](#role) el registro no funcionará.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Este procedimiento registra el servidor de administración del nodo 2 en la base de datos SQL (que se ejecuta en el nodo 1) a través de una conexión a la dirección virtual.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Con una versión de Milestone anterior a 2022 R3, es posible que el registro haya eliminado la configuración de la dirección IP virtual en los archivos internos Milestone . En este caso, repita el paso 13 [ ](#milestone-files-2) .


![ Registre el servidor de administración con Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Iniciar nodo 2 {#15-start-node-2}

  * Inicie el nodo 2 con su menú contextual.
  * Espere al SEGUNDO estado (verde).


Nota ![ ](/wp-content/uploads/2022/07/note.png)


El nodo 2 permanece en el estado SEGUNDO (magenta) mientras resincroniza los directorios replicados (copia del nodo 1 al nodo 2).

Esto puede tardar un tiempo, dependiendo del tamaño de los archivos que se deban resincronizar en los directorios replicados y del ancho de banda de la red.

Para ver el progreso de la copia, consulte el registro del módulo del nodo 2 con la opción detallada activada, sin olvidar actualizar la ventana.


![ El primer nodo comienza como primario y se convierte en ALONE ](/wp-content/uploads/2022/07/appli-11.png)


### 16. Verifique que el clúster esté operativo {#16-verify-that-the-cluster-is-operational}

  * Verifique que el clúster esté en estado verde/verde con los servicios ejecutándose en el nodo PRIM y no en el nodo SEGUNDO.


En este estado, solo se replican en tiempo real los cambios que se producen dentro de los archivos.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Los componentes que son clientes de servicios deben configurarse con la dirección IP virtual. La configuración puede realizarse mediante un nombre DNS (si se ha creado uno y se ha asociado a la dirección IP virtual).


![ El segundo nodo comienza como SEGUNDO ](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configure la dirección IP virtual en los servidores de grabación {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Instale los servidores de grabación, especificando la dirección IP virtual en la URL de instalación.
  * O bien, en el lado de los servidores de grabación, configure la dirección IP virtual en los siguientes campos: 
        
        C:\ProgramData\ Milestone \ XProtect Servidor de grabación\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * Conecte el cliente de administración Milestone y el cliente inteligente Milestone en la dirección IP virtual.


### 18. El cliente de administración y el cliente inteligente no funcionan correctamente después del cambio de nodo {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

En una configuración de servidor de administración XProtect en clúster, Smart Client y Management Client presentan diversos problemas tras un cambio de nodo. El problema radica en la generación de tokens en nodos diferentes antes y después del cambio, así como en dificultades para acceder a ciertos certificados necesarios para la validación de tokens. Existe una solución disponible (para las versiones 2022 R3 a 2023 R2; consulte el artículo de la base de conocimientos Milestone ).

El problema se solucionó en Milestone 2023 R3.

### 18. Prueba {#18-testing}

  * Detenga el nodo PRIM desplazándose hacia abajo en su menú contextual y haciendo clic en Detener. **No utilice la función de intercambio para una primera prueba** (vea el motivo a continuación).
  * Verifique que haya una conmutación por error en el SEGUNDO nodo, que debería quedar SOLO (verde).
  * Y con la consola de administración (MMC) Microsoft , compruebe la conmutación por error de los servicios (detenidos en el nodo 1 en el script `stop_prim` e iniciados en el nodo 2 en el script `start_prim` ).


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si su sistema es PRIM-SECOND y todo funciona correctamente, detenga el PRIM y verifique que todo funcione correctamente en el nodo2, que pasa a ser ALONE. Si todo está bien, inicie el nodo1, lo que resincronizará los directorios replicados desde el nodo2.

Si algo sale mal, detenga el nodo2 y fuerce el inicio como nodo principal del nodo1, que se reiniciará con los datos locales en buen estado que tuviera en el momento de la detención.

El intercambio implica detener y volver a iniciar el PRIM, lo que resincronizará los datos del nodo2 inmediatamente después de su detención, sin dejar posibilidad de reiniciar con datos en buen estado si existe un problema de configuración de replicación.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si la aplicación no se inicia en el nodo 2 mientras el estado es SOLO (verde), compruebe los mensajes de salida del script `start_prim` en el registro de aplicaciones del nodo 2.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si no se alcanza ALONE (verde), analice el motivo con el registro del módulo del nodo 2.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Encontrará más información sobre las pruebas en la Guía del usuario.


![ Detenga el módulo en el servidor PRIM ](/wp-content/uploads/2022/07/appli-19.png)