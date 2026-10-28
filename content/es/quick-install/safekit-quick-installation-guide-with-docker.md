---
title: "Alta disponibilidad Docker con SafeKit : Instale el módulo mirror.safe para la conmutación por error."
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Implemente el módulo mirror.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de los contenedores Docker en Linux . Esta guía le muestra cómo configurar un clúster de dos nodos sin almacenamiento compartido para aplicaciones críticas."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Docker , Limitaciones de alta disponibilidad SafeKit , Descripción general de la solución SafeKit / Docker , Instalación de la solución SafeKit / Docker en Linux ( mirror.safe ), Configuración paso a paso de la solución SafeKit / Docker , Demostración de la solución SafeKit mirror , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad Docker con SafeKit : Instale el módulo mirror.safe para la conmutación por error {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Docker" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit / Docker {#overview-of-the-safekit--docker-solution}

La solución se describe aquí: ** 💡 [ SafeKit : Docker Software de replicación de datos en tiempo real y alta disponibilidad ](</es/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Instalación de la solución SafeKit / Docker en Linux ( mirror.safe ) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener instalada la aplicación Docker que quieres reiniciar en SafeKit en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

### Ejemplo 1 con una aplicación compuesta Docker {#example-1-with-a-docker-compose-application}

Con una aplicación compuesta Docker , dispone de un archivo **docker-compose.yml** que describe la aplicación y todos sus contenedores.

  * Primero, en ambos servidores, instale la aplicación Docker Compose sin iniciarla: **docker-compose -f docker-compose.yml up --no-start**
  * En un servidor, para cada volumen en docker-compose.yml , ejecute este comando: **docker volume inspect volume_name**  
Devolverá el **host directories of the docker volumes** (estas rutas no se proporcionan en docker-compose.yml ).  
Obtendrás una lista de rutas como **/var/lib/docker/volumes/ <volume_name>/_data**
  * Vaya a la sección de configuración paso a paso ** ** y 
    * Despliegue el módulo **mirror.safe**
    * Se establece una dirección IP virtual ** ** que se conmutará en caso de fallo.
    * Establezca la lista de **/var/lib/docker/volumes/ <volume_name>/_data** como directorios replicados ** **
    * Coloque respectivamente en los scripts start_prim y stop_prim : **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** y **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### Ejemplo 2 con una aplicación Docker que inicia un conjunto de contenedores {#example-2-with-a-docker-application-starting-a-set-of-containers}

Suponemos aquí que una aplicación Docker ** myappli ** inicia un conjunto de contenedores.

  * Primero, en ambos servidores, instale ** myappli ** sin iniciarlo.
  * En un servidor, enumere los volúmenes utilizados por myapply : **ls /var/lib/docker/volumes**  
De esta forma, obtendrá una lista de rutas como **/var/lib/docker/volumes/ <volume_name>/_data**
  * Vaya a la sección de configuración paso a paso ** ** y 
    * Despliegue el módulo **mirror.safe**
    * Se establece una dirección IP virtual ** ** que se conmutará en caso de fallo.
    * Establezca la lista de **/var/lib/docker/volumes/ <volume_name>/_data** como directorios replicados ** **
    * Coloque respectivamente en los scripts start_prim y stop_prim : ** /.../myappli iniciar ** y ** /.../myappli detener **


### Ejemplo 3 con una imagen simple Docker {#example-3-with-a-simple-docker-image}

La configuración se presenta tomando como ejemplo la imagen nginx Docker (servidor web).

  * Creación de volumen Docker  
En ambos servidores, cree un volumen de Docker con el mismo nombre: **docker volume create replicated_vol**  
Obtenga la ruta del directorio donde se almacena el volumen en el host: **docker volume inspect replicated_vol**  
(por ejemplo: **/var/lib/docker/storage/replicated_vol/_data** )
  * Creación de contenedores Docker  
En ambos servidores, cree un contenedor Docker nginx que se vincule al volumen anterior: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Rellene el volumen con algún archivo index.html : **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Vaya a la sección de configuración paso a paso ** ** y 
    * Despliegue el módulo **mirror.safe**
    * Se establece una dirección IP virtual ** ** que se conmutará en caso de fallo.
    * establecer **/var/lib/docker/storage/replicated_vol/_data** como un directorio replicado
    * Coloque respectivamente en los scripts start_prim y stop_prim : **docker start mynginx** y **docker stop mynginx**
    * Después de configurar SafeKit , pruebe el acceso a index.html con ** http://vitual-ip:9011**


## Configuración paso a paso de la solución SafeKit / Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-es app="Docker" mod="mirror"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}