---
title: "Alta disponibilidad de K3S con SafeKit : Instale el módulo k3s.safe para la conmutación por error."
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Implemente el módulo k3s.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de Kubernetes en Linux . Esta guía le muestra cómo configurar un clúster SAN de 2 nodos para aplicaciones críticas Linux sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Kubernetes , Limitaciones de alta disponibilidad SafeKit , Descripción general de la solución SafeKit / Kubernetes , Instalación y configuración de la solución SafeKit / Kubernetes en Linux ( k3s.safe ), ¿Cuáles son los diferentes escenarios en caso de aislamiento de red en un clúster?, Demostración de la solución SafeKit mirror , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad de K3S con SafeKit : Instale el módulo k3s.safe para la conmutación por error {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Kubernetes" mod="k3s"  %}}
 

## Descripción general de la solución SafeKit / Kubernetes {#overview-of-the-safekit--kubernetes-solution}

La solución se describe aquí: ** 💡 [ Kubernetes Alta disponibilidad de K3s: replicación síncrona de 2 nodos y conmutación por error ](</solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>) **

## Instalación y configuración de la solución SafeKit / Kubernetes en Linux ( k3s.safe ) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Descargar paquetes {#1-download-packages}

  * Descarga la versión gratuita de SafeKit 8.2 en Linux (safekitlinux_xx.bin)
  * Descarga el módulo k3s.safe Linux
  * Descarga el script k3sconfig.sh
  * Documentación (pptx)


Nota: el script k3sconfig.sh instala K3S, MariaDB , NFS y SafeKit en 2 nodos Ubuntu 24.04 Linux ).

[ Descargar SafeKit ( Linux ) > ](</es/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe"> Descargar k3s.safe ( Linux ) > </a> 

[ Descargar k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

Documentación [ (pdf) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Primero en ambos nodos {#2-first-on-both-nodes}

En 2 nodos Ubuntu 24.04 Linux , como root:

  * Asegúrese de que el nodo tenga acceso a internet (puede ser a través de un proxy).
  * Copie k3sconfig.sh , k3s.safe y el paquete safekit_xx.bin en un directorio y acceda a él.
  * Cambie el nombre del archivo .bin a "safekit.bin".
  * Asegúrese de que k3sconfig.sh y safekit.bin sean ejecutables.
  * Edita el script k3sconfig.sh y personaliza las variables de entorno según tu entorno (incluida una IP virtual).
  * Ejecutar en ambos nodos: `./k3sconfig.sh prereq`


El guion dirá:

  * Instale los paquetes Debian necesarios: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Instalación segura de MariaDB
  * Crear directorios para la replicación de archivos
  * Prepare el servidor NFS para compartir directorios replicados.
  * Instalar SafeKit


### 3. En el primer nodo {#3-on-the-first-node}

Ejecutar en el primer nodo: `./k3sconfig.sh first`

El guion dirá:

  * Cree la base de datos de configuración de K3S y el usuario k3s.
  * Cree el archivo de volumen de almacenamiento replicado (archivo disperso) y formatéelo como un sistema de archivos xfs.
  * Cree la configuración del clúster de SafeKit y aplíquela.
  * Instale y configure el módulo k3s.safe en el clúster.
  * Inicie el módulo k3s como "prim" en el primer nodo.
  * Descarga, instala e inicia k3s.
  * Descargue e instale el gráfico Helm nfs-subdir-external-provisioner
  * Mostrar token K3S (para usar durante la segunda fase de instalación del nodo)


### 4. En el segundo nodo {#4-on-the-second-node}

Ejecutar en el segundo nodo: `./k3sconfig.sh second <token>`

  * <token> es la cadena que se muestra al final de la ejecución " k3sconfig.sh first" en el primer nodo.


El guion dirá:

  * Asegúrese de que el módulo k3s se inicie como prim en el primer nodo.
  * Instale k3s en el segundo nodo.
  * Iniciar el módulo k3s


### 5. Compruebe que el módulo k3s SafeKit se esté ejecutando en ambos nodos {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Compruebe con este comando en ambos nodos: `/opt/safekit/safekit –H "*" state`

La respuesta debe ser similar a la imagen.
    
    
    /opt/safekit/safekit –H " * " estado
    ---------------- Servidor= http://10.0.0.20:9010 ----------------
    acción administrativa=ejecutar
    --------------------- Estado de k3s ---------------------
    
      Local (127.0.0.1): PRIM (Servicio: Disponible) (Color: Verde)
    Éxito
    ---------------- Servidor= http://10.0.0.21:9010 ----------------
    acción administrativa=ejecutar
    --------------------- Estado de k3s ---------------------
    
      Local (127.0.0.1): SEGUNDO (Servicio: Disponible) (Color: Verde)
    Éxito
    

### 6. Inicie la consola web SafeKit para administrar el clúster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Conecte un navegador a la URL de la consola web SafeKit `http://server0-IP:9010` .
  * Deberías ver una página similar a la de la imagen.
  * Compruebe con las líneas de comando Linux que K3S se haya iniciado en ambos nodos (iniciado en `start_prim` y `start_second` ) y que MariaDB se haya iniciado en el nodo principal (iniciado en `start_prim` ).


El clúster ![ Kubernetes se inició en la consola web SafeKit ](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Prueba {#7-testing}

  * Detenga el nodo PRIM desplazándose hacia abajo en su menú contextual y haciendo clic en `Stop` .
  * Verifique que haya una conmutación por error en el SEGUNDO nodo, que debería quedar SOLO (verde).
  * Y con las líneas de comando en Linux , verifique la conmutación por error de los servicios (detenidos en el nodo 1 en el script `stop_prim` e iniciados en el nodo 2 en el script `start_prim` ). MariaDB y K3S deberían ejecutarse en el nodo 2.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si no se alcanza el estado ALONE (verde) en el nodo 2, analice el motivo con el registro del módulo del nodo 2.

  * Haga clic en `node2` para mostrar el registro del módulo.
  * Ejemplo de [ de un registro del módulo SQL Server ](</wp-content/uploads/2024/03/24-module-log-script.png>) donde el nombre del servicio en `start_prim` no es válido. El proceso sqlserver.exe se supervisa pero como no se inicia, al final el módulo se detiene.


Advertencia ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si todo está correcto, inicie el nodo 1, lo que resincronizará los directorios replicados desde el nodo 2.

Si algo sale mal, detenga ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) [ nodo1, que se reiniciará con sus datos locales saludables en el momento de la detención.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


🛠️ [ Más información sobre las pruebas en la Guía del usuario. ](</resources/safekit-user-guide-82/#tests>)


![ Detenga el módulo en el servidor PRIM ](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Pruebe el clúster con una aplicación Kubernetes como WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

En la imagen se muestra un ejemplo de una instalación de WordPress: un portal web con una base de datos backend implementada mediante pods.

Puedes implementar tu propia aplicación de la misma manera.

WordPress es automáticamente altamente disponible:

  * con sus datos (php + base de datos) en volúmenes persistentes replicados en tiempo real por SafeKit
  * con una dirección IP virtual para acceder al sitio de WordPress para los usuarios
  * con conmutación por error automática y recuperación automática


Notas:

  * El gráfico de WordPress define un servicio con balanceo de carga que escucha en los puertos <service.port> y <service.httpsport> .
  * Se puede acceder a WordPress a través de la URL: `http://<virtual-ip>:<service.port>.`
  * La IP virtual es administrada por SafeKit y se conmuta automáticamente en caso de fallo.
  * Por defecto, K3S implementa balanceadores de carga con Klipper.
  * Klipper escucha en <virtual ip> : <service.port> y enruta los paquetes TCP/IP a la dirección IP y al puerto del pod de WordPress que ha seleccionado.


    
    
    $ exportar KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

El comando helm anterior debería descargar la imagen de WordPress desde `registry-1.docker.io` . Es posible que encuentre problemas de autenticación en `registry-1.docker.io` . En ese caso, debería:

  * crear `/etc/rancher/k3s/registries.yaml` en ambos nodos con el siguiente contenido: 
        
        configuraciones:
          "registro-1.docker.io":
            autenticación:
              nombre_de_usuario: tu_nombre_de_usuario
              contraseña: tu_contraseña
            tls:
              insecure_skip_verify: verdadero
        

  * Detenga e inicie k3s para tenerlo en cuenta, con `systemctl stop k3s` y `systemctl start k3s` .
  * Ejecuta `helm registry login -u your_user_name docker.io` y luego ingresa tu contraseña.


### 9. Soporte {#9-support}

  * Para obtener soporte, tome 2 SafeKit `Snapshots` (2 archivos .zip), uno para cada nodo.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


🛠️ Solución de problemas de [ en la Guía del usuario. ](</resources/safekit-user-guide-82/#Troubleshooting>)


![ Toma las instantáneas para soporte ](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Si es necesario, configure un verificador de división de cerebro {#10-if-necessary-configure-a-splitbrain-checker}

  * Consulte a continuación [ "¿Cuáles son los diferentes escenarios en caso de aislamiento de red en un clúster?" ](#isolation) para saber si necesita configurar un comprobador de división de cerebro.
  * En la configuración del módulo, haga clic en `Advanced Configuration` (vea la imagen) para editar `userconfig.xml` .
  * Declare el verificador de división de cerebro agregando en la sección `<check>` de `userconfig.xml` : 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` la nueva configuración para volver a implementar el archivo userconfig.xml modificado en ambos nodos (el módulo debe estar detenido en ambos nodos para guardar y aplicar).


Parámetros ** ** :

  * `ident="witness"` identifica al testigo con el nombre de recurso: `splitbrain.witness` . Puede cambiar este valor para identificar al testigo.
  * `exec="ping"` hace referencia al código ping que se va a ejecutar. No cambie este valor.
  * `arg="witness IP"` es un argumento para el ping. Cambie este valor por la IP del testigo (un elemento robusto, normalmente un enrutador).


![ Introduzca los parámetros ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-es  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}