---
title: "Alta disponibilidad Docker con SafeKit: Instale el módulo mirror.safe para la conmutación por error"
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Implemente el módulo mirror.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de los contenedores Docker en Linux. Esta guía le muestra cómo configurar un clúster de 2 nodos sin recursos compartidos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Docker, Limitaciones de alta disponibilidad SafeKit, Descripción general de la solución SafeKit/Docker, Instalación de la solución SafeKit/Docker en Linux (mirror.safe), Configuración paso a paso de la solución SafeKit/Docker, Demostración de la solución mirror SafeKit, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilidad Docker con SafeKit: Instale el módulo mirror.safe para la conmutación por error {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Docker" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit/Docker {#overview-of-the-safekit--docker-solution}

La solución se describe aquí: **💡 [SafeKit: Software de alta disponibilidad y replicación de datos en tiempo real Docker](</es/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Instalación de la solución SafeKit/Docker en Linux (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Requisitos previos {#prerequisites}

  * Necesita la aplicación Docker que desea reiniciar en SafeKit instalada en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

### Ejemplo 1 con una aplicación Docker Compose {#example-1-with-a-docker-compose-application}

Con una aplicación Docker Compose, tienes un archivo **docker-compose.yml** que describe la aplicación y todos sus contenedores.

  * Primero, en ambos servidores, instale la aplicación docker compose sin iniciarla: **docker-compose -f docker-compose.yml up --no-start**
  * En un servidor, para cada volumen en docker-compose.yml, ejecute este comando: **docker volume inspect nombre_volumen**  
Devolverá los **directorios del host de los volúmenes de Docker** (estas rutas no se especifican en docker-compose.yml).  
Recibirá una lista de rutas como **/var/lib/docker/volumes/ <volume_name> /_data**
  * Vaya a la sección **de configuración paso a paso** y 
    * Implemente el módulo **mirror.safe**
    * establezca una **dirección IP virtual** que se conmutará en caso de fallo
    * establecer la lista de **/var/lib/docker/volumes/ <volume_name> /_data** como **directorios replicados**
    * colocar respectivamente en los scripts start_prim y stop_prim: **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** y **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### Ejemplo 2 con una aplicación Docker que inicia un conjunto de contenedores {#example-2-with-a-docker-application-starting-a-set-of-containers}

Aquí suponemos una aplicación Docker **myappli**, que inicia un conjunto de contenedores.

  * Primero, en ambos servidores, instale **myappli** sin iniciarlo
  * En un servidor, enumere los volúmenes utilizados por myapply: **ls /var/lib/docker/volumes**  
De este modo, obtendrá una lista de rutas como **/var/lib/docker/volumes/ <volume_name> /_data**
  * Vaya a la sección **de configuración paso a paso** y 
    * Implemente el módulo **mirror.safe**
    * establezca una **dirección IP virtual** que se conmutará en caso de fallo
    * establecer la lista de **/var/lib/docker/volumes/ <volume_name> /_data** como **directorios replicados**
    * colocar respectivamente en los scripts start_prim y stop_prim: **/.../myappli start** y **/.../myappli stop**


### Ejemplo 3 con una imagen Docker sencilla {#example-3-with-a-simple-docker-image}

La configuración se presenta en el ejemplo de la imagen Docker de nginx (servidor web).

  * Creación de volúmenes Docker  
En ambos servidores, cree un volumen de Docker con el mismo nombre: **docker volume create replicated_vol**  
Obtenga la ruta del directorio donde se almacena el volumen en el host: **docker volume inspect replicated_vol**  
(por ejemplo: **/var/lib/docker/storage/replicated_vol/_data**)
  * Creación de contenedores Docker  
En ambos servidores, cree un contenedor docker de nginx que se vincule al volumen anterior: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Rellene el volumen con algún archivo index.html: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Vaya a la sección **de configuración paso a paso** y 
    * Implemente el módulo **mirror.safe**
    * establezca una **dirección IP virtual** que se conmutará en caso de fallo
    * establecer **/var/lib/docker/storage/replicated_vol/_data** como un directorio replicado
    * colocar respectivamente en los scripts start_prim y stop_prim: **docker start mynginx** y **docker stop mynginx**
    * Después de la configuración SafeKit, pruebe el acceso a index.html con **http://vitual-ip:9011**


## Configuración paso a paso de la solución SafeKit/Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-es app="Docker" mod="mirror"  %}}
 

## Demostración de la solución mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}