---
title: "Alta disponibilidad K3S con SafeKit: Instale el módulo k3s.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Implemente el módulo k3s.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de Kubernetes en Linux. Esta guía le muestra cómo configurar un clúster sin SAN de 2 nodos para aplicaciones críticas Linux sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Kubernetes, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/Kubernetes, Instalación y configuración de la solución SafeKit/Kubernetes en Linux (k3s.safe), ¿Cuáles son los diferentes escenarios en caso de aislamiento de red en un clúster?, Demostración de la solución mirror SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilidad K3S con SafeKit: Instale el módulo k3s.safe para la conmutación por error {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Kubernetes" mod="k3s"  %}}
 

## Descripción general de la solución SafeKit/Kubernetes {#overview-of-the-safekit--kubernetes-solution}

La solución se describe aquí: **💡 [Alta disponibilidad Kubernetes K3s: replicación síncrona y conmutación por error de 2 nodos](</es/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Instalación y configuración de la solución SafeKit/Kubernetes en Linux (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Descargar paquetes {#1-download-packages}

  * Descargue la versión gratuita de SafeKit 8.2 para Linux (safekitlinux_xx.bin)
  * Descargue el módulo Linux k3s.safe
  * Descargue el script k3sconfig.sh
  * Documentación (pptx)


Nota: el script k3sconfig.sh instala K3S, MariaDB, NFS y SafeKit en 2 nodos Linux Ubuntu 24.04.

[Descargar SafeKit (Linux) >](</es/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">Descargar k3s.safe (Linux) ></a> 

[Descargar k3sconfig.sh >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[Documentación (pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Primero en ambos nodos {#2-first-on-both-nodes}

En 2 nodos Linux Ubuntu 24.04, como root:

  * Asegúrese de que el nodo tenga acceso a Internet (podría ser a través de un proxy)
  * Copie k3sconfig.sh, k3s.safe y el paquete safekit_xx.bin en un directorio y acceda a él con cd
  * Cambie el nombre del archivo .bin a "safekit.bin"
  * Asegúrese de que k3sconfig.sh y safekit.bin sean ejecutables.
  * Edite el script k3sconfig.sh y personalice las variables de entorno según su entorno (incluida una IP virtual)
  * Ejecute en ambos nodos: `./k3sconfig.sh prereq`


El script:

  * Instale los paquetes Debian necesarios: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Instalación segura de MariaDB
  * Crear directorios para la replicación de archivos
  * Prepare el servidor NFS para compartir los directorios replicados
  * Instalar SafeKit


### 3. En el primer nodo {#3-on-the-first-node}

Ejecute en el primer nodo: `./k3sconfig.sh first`

El script:

  * Cree la base de datos de configuración K3S y el usuario de k3s
  * Cree el archivo de volumen de almacenamiento replicado (archivo disperso) y formatee el sistema de archivos como xfs
  * Cree la configuración del clúster de safekit y aplíquela
  * Instale y configure el módulo k3s.safe en el clúster
  * Inicia el módulo k3s como "prim" en el primer nodo
  * Descarga, instala e inicia k3s
  * Descargue e instale el gráfico de Helm de nfs-subdir-external-provisioner
  * Mostrar el token K3S (para usarlo durante la segunda fase de instalación del nodo)


### 4. En el segundo nodo {#4-on-the-second-node}

Ejecute en el segundo nodo: `./k3sconfig.sh second <token>`

  * <token> es la cadena que se muestra al final de la ejecución de " k3sconfig.sh first" en el primer nodo


El script:

  * Asegúrese de que el módulo k3s se inicie como primario en el primer nodo
  * Instala k3s en el segundo nodo
  * Inicia el módulo k3s


### 5. Compruebe que el módulo k3s SafeKit se esté ejecutando en ambos nodos {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Compruebe con este comando en ambos nodos: `/opt/safekit/safekit –H "*" state`

La respuesta debe ser similar a la imagen.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- Servidor= http://10.0.0.20:9010 ----------------
    acción admin =ejecutar
    --------------------- Estado de k3s ---------------------
    
      Local (127.0.0.1): PRIM (Servicio: Disponible) (Color: Verde)
    Éxito
    ---------------- Servidor= http://10.0.0.21:9010 ----------------
    acción admin =ejecutar
    --------------------- Estado de k3s ---------------------
    
      Local (127.0.0.1): SECOND (Servicio: Disponible) (Color: Verde)
    Éxito
    

### 6. Inicie la consola web SafeKit para administrar el clúster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Conecte un navegador a la URL de la consola web SafeKit `http://server0-IP:9010`.
  * Deberías ver una página similar a la imagen.
  * Compruebe con las líneas de comandos Linux que K3S se inicia en ambos nodos (iniciado en `start_prim` y `start_second`) y que MariaDB se inicia en el nodo principal (iniciado en `start_prim`).


![El clúster Kubernetes se inició en la consola web SafeKit](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Pruebas {#7-testing}

  * Detenga el nodo PRIM desplazándose hacia abajo en su menú contextual y haciendo clic en `Stop`.
  * Verifique que haya una conmutación por error en el SECOND nodo, que debería quedar ALONE (en verde).
  * Y con las líneas de comando en Linux, compruebe la conmutación por error de los servicios (detenidos en el nodo 1 en el script `stop_prim` e iniciados en el nodo 2 en el script `start_prim`). MariaDB y K3S deberían ejecutarse en node2.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si no se alcanza ALONE (verde) en node2, analice el motivo con el registro del módulo del nodo 2.

  * Haga clic en `node2` para visualizar el registro del módulo.
  * [Ejemplo de un registro de módulo SQL Server](</wp-content/uploads/2024/03/24-module-log-script.png>) donde el nombre del servicio en `start_prim` no es válido. El proceso sqlserver.exe está supervisado, pero como no se inicia, al final el módulo se detiene.


![Advertencia](/wp-content/uploads/2022/07/warning-small.png)


Si todo está bien, inicie un inicio en node1, que resincronizará los directorios replicados desde node2.

Si las cosas van mal, detenga node2 y [fuerce el inicio como primario](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) del node1, que se reiniciará con sus datos localmente saludables en el momento de la detención.


![Nota](/wp-content/uploads/2022/07/note.png)


🛠️ [Más información sobre las pruebas en la Guía del usuario.](</es/resources/safekit-user-guide-82/#tests>)


![Detenga el módulo en el servidor PRIM](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Pruebe el clúster con una aplicación Kubernetes como WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

En la imagen tienes el ejemplo de una instalación de WordPress: un portal web con una base de datos de backend implementada por pods.

Puedes implementar tu propia aplicación de la misma manera.

WordPress es automáticamente de alta disponibilidad:

  * con sus datos (php + base de datos) en volúmenes persistentes replicados en tiempo real por SafeKit
  * con una dirección IP virtual para que los usuarios accedan al sitio de WordPress
  * con conmutación por error automática y failback automático


Notas:

  * El gráfico de WordPress define un servicio con balanceo de carga que escucha en los puertos <service.port> y <service.httpsport>.
  * WordPress es accesible a través de la URL: `http://<virtual-ip>:<service.port>.`
  * La IP virtual es administrada por SafeKit y se cambia automáticamente en caso de conmutación por error.
  * Por defecto, K3S implementa balanceadores de carga con Klipper.
  * Klipper escucha en <virtual ip>: <service.port> y enruta los paquetes TCP/IP a la dirección IP y el puerto del pod de WordPress que ha seleccionado.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

El comando helm anterior debería descargar la imagen de WordPress desde `registry-1.docker.io`. Es posible que encuentre problemas de autenticación en `registry-1.docker.io`. En este caso, debe:

  * Cree `/etc/rancher/k3s/registries.yaml` en ambos nodos con el siguiente contenido: 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * Detenga e inicie k3s para que se tengan en cuenta los cambios, con `systemctl stop k3s` y `systemctl start k3s`.
  * Ejecute `helm registry login -u your_user_name docker.io` y, a continuación, introduzca su contraseña


### 9. Soporte {#9-support}

  * Para obtener soporte, haga 2 `Snapshots` SafeKit (2 archivos .zip), una para cada nodo.


![Nota](/wp-content/uploads/2022/07/note.png)


🛠️ [Solución de problemas en la Guía del usuario.](</es/resources/safekit-user-guide-82/#Troubleshooting>)


![Toma las capturas de pantalla para obtener ayuda](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Si es necesario, configure un checker split-brain {#10-if-necessary-configure-a-splitbrain-checker}

  * Consulte a continuación ["¿Cuáles son los diferentes escenarios en caso de aislamiento de red en un clúster?"](#isolation) para saber si necesita configurar un checker split-brain.
  * En la configuración del módulo, haga clic en `Advanced Configuration` (ver imagen) para editar `userconfig.xml`.
  * Declare el checker split-brain añadiendo lo siguiente en la sección `<check>` de `userconfig.xml`: 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` la nueva configuración para volver a implementar el archivo userconfig.xml modificado en ambos nodos (el módulo debe detenerse en ambos nodos para guardar y aplicar).


**Parámetros**:

  * `ident="witness"` identifica el testigo con un nombre de recurso: `splitbrain.witness`. Puede cambiar este valor para identificar el testigo.
  * `exec="ping"` hace referencia al código ping que se va a ejecutar. No cambie este valor."
  * `arg="witness IP"` es un argumento para el ping. Cambie este valor por la IP del testigo (un elemento robusto, normalmente un router).


![Introduzca los parámetros](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-es  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}