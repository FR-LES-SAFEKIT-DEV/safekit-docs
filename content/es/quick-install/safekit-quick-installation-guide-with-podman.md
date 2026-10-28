---
title: "Alta disponibilidad Podman con SafeKit : Instale el módulo mirror.safe para la conmutación por error."
canonical: "https://safekit.eviden.com/es/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Implemente el módulo mirror.safe para SafeKit para habilitar la replicación síncrona en tiempo real y la conmutación por error automática de los contenedores Podman en Linux . Esta guía le muestra cómo configurar un clúster SAN de 2 nodos para aplicaciones críticas sin almacenamiento compartido."
category: "quick-install"
lang: "es"
topics: "Guía de instalación rápida de alta disponibilidad para Podman , Limitaciones de alta disponibilidad SafeKit , Descripción general de la solución SafeKit / Podman , Instalación de la solución SafeKit / Podman en Linux ( mirror.safe ), Configuración paso a paso de la solución SafeKit / Podman , Demostración de la solución SafeKit mirror , 🔍 Centro de navegación de alta disponibilidad SafeKit"
---

# Alta disponibilidad Podman con SafeKit : Instale el módulo mirror.safe para la conmutación por error {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-es app="Podman" mod="mirror"  %}}
 

## Descripción general de la solución SafeKit / Podman {#overview-of-the-safekit--podman-solution}

La solución se describe aquí: **💡 [ SafeKit : Podman Software de replicación de datos de alta disponibilidad y en tiempo real ](</es/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)** .

## Instalación de la solución SafeKit / Podman en Linux ( mirror.safe ) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Requisitos previos {#prerequisites}

  * Necesitas tener instalada la aplicación Podman que quieres reiniciar en SafeKit en 2 nodos (máquinas virtuales o servidores físicos).



{{%  insert-safekit-installation-package-linux-es app="" mod="mirror"  %}}
 

### Ejemplo con una imagen de contenedor simple {#example-with-a-simple-container-image}

En este ejemplo, mostraremos cómo SafeKit podría gestionar un contenedor nginx (servidor web), es decir: la replicación de un directorio al que se accede en el contenedor y el reinicio del contenedor en otro nodo en caso de fallo.

#### Requisitos previos {#prerequisites-1}

  * Cree un directorio replicado **en ambos nodos**  
Cree un directorio **/replicated_dir_path** que será replicado por SafeKit y que contendrá páginas HTML servidas por nginx
  * Rellene este directorio con un archivo HTML inicial **en ambos nodos**
        
        cp index.html /replicated_dir_path

  * Cree un contenedor **en ambos nodos**  
Cree un contenedor nginx en ambos nodos que vincule el directorio **/replicated_dir_path** con **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path : /usr/share/nginx/html -p 9011:80 nginx


#### Configuración SafeKit {#safekit-configuration}

  * Vaya a la sección **de configuración paso a paso.**
  * Cree y configure un módulo **mirror.safe**
  * Configure una **dirección IP virtual** que se conmutará en caso de fallo.
  * Establecer **/replicated_dir_path** como un directorio replicado
  * Coloque respectivamente en los scripts start_prim y stop_prim : **podman start mynginx** y **podman stop mynginx**  
Nota: Es posible que tenga que usar "podman start --security-opt label=disable mynginx " con SE Linux .
  * Despliegue e inicie el módulo SafeKit mirror .


#### Pruebas {#tests}

  * Prueba de acceso a nginx en **http://vitual-ip:9011/index.html**
  * Replicación de la prueba:  
En el nodo en estado SafeKit PRIM, agregue algunos otros archivos html al directorio replicado: 
        
        cp page.html /replicated_dir_path

  * Detenga el módulo mirror en el nodo en estado SafeKit PRIM.
  * Comprueba que el contenedor se haya reiniciado en el nodo secundario.
  * Prueba de acceso a **http://vitual-ip:9011/index.html** y a **http://vitual-ip:9011/page.html**


## Configuración paso a paso de la solución SafeKit / Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-es app="Podman" mod="mirror"  %}}
 

## Demostración de la solución SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}