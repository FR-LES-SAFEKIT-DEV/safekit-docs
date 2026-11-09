---
title: "Alta Disponibilidade Docker com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Implemente o módulo mirror.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático de contêineres Docker no Linux. Este guia mostra como configurar um cluster de 2 nós sem armazenamento sem compartilhamento para aplicações críticas."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Docker, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Docker, Instalação da solução SafeKit/Docker no Linux (mirror.safe), Configuração passo a passo da solução SafeKit/Docker, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Docker com SafeKit: Instale o Módulo mirror.safe para Failover {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Docker" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Docker {#overview-of-the-safekit--docker-solution}

A solução é descrita aqui: **💡 [SafeKit: Software de Replicação de Dados em Tempo Real e Alta Disponibilidade Docker](</pt-br/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Instalação da solução SafeKit/Docker no Linux (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter o aplicativo Docker que deseja reiniciar no SafeKit instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

### Exemplo 1 com uma aplicação Docker Compose {#example-1-with-a-docker-compose-application}

Com um aplicativo Docker Compose, você tem um arquivo **docker-compose.yml** que descreve o aplicativo e todos os seus contêineres.

  * Primeiro, em ambos os servidores, instale o aplicativo docker compose sem iniciá-lo: **docker-compose -f docker-compose.yml up --no-start**
  * Em um servidor, para cada volume em docker-compose.yml, execute este comando: **docker volume inspect volume_name**  
Ele retornará os **diretórios do host dos volumes do Docker** (esses caminhos não são fornecidos no docker-compose.yml).  
Você receberá uma lista de caminhos como **/var/lib/docker/volumes/ <volume_name> /_data**
  * Acesse a seção **de configuração passo a passo** e 
    * implantar o módulo **mirror.safe**
    * defina um **endereço IP virtual** que será alternado em caso de falha
    * Defina a lista de **/var/lib/docker/volumes/ <volume_name> /_data** como **diretórios replicados**
    * coloque respectivamente nos scripts start_prim e stop_prim: **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** e **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### Exemplo 2 com uma aplicação Docker que inicia um conjunto de contêineres {#example-2-with-a-docker-application-starting-a-set-of-containers}

Suponhamos aqui uma aplicação Docker **myappli**, que inicia um conjunto de contêineres.

  * Primeiro, em ambos os servidores, instale **o myappli** sem iniciá-lo
  * Em um servidor, liste os volumes usados pelo myapply: **ls /var/lib/docker/volumes**  
Assim, você obterá uma lista de caminhos como **/var/lib/docker/volumes/ <volume_name> /_data**
  * Acesse a seção **de configuração passo a passo** e 
    * implantar o módulo **mirror.safe**
    * defina um **endereço IP virtual** que será alternado em caso de falha
    * Defina a lista de **/var/lib/docker/volumes/ <volume_name> /_data** como **diretórios replicados**
    * coloque respectivamente nos scripts start_prim e stop_prim: **/.../myappli start** e **/.../myappli stop**


### Exemplo 3 com uma imagem Docker simples {#example-3-with-a-simple-docker-image}

A configuração é apresentada no exemplo da imagem Docker do nginx (servidor web).

  * Criação de volume Docker  
Em ambos os servidores, crie um volume docker com o mesmo nome: **docker volume create replicated_vol**  
Obtenha o caminho do diretório onde o volume está armazenado no host: **docker volume inspect replicated_vol**  
(por exemplo: **/var/lib/docker/storage/replicated_vol/_data**)
  * Criação de contêineres Docker  
Em ambos os servidores, crie um contêiner docker nginx que se vincule ao volume anterior: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Preencha o volume com algum arquivo index.html: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Acesse a seção **de configuração passo a passo** e 
    * implantar o módulo **mirror.safe**
    * defina um **endereço IP virtual** que será alternado em caso de falha
    * Defina **/var/lib/docker/storage/replicated_vol/_data** como um diretório replicado
    * coloque, respectivamente, nos scripts start_prim e stop_prim: **docker start mynginx** e **docker stop mynginx**
    * após a configuração SafeKit, teste o acesso ao index.html com **http://vitual-ip:9011**


## Configuração passo a passo da solução SafeKit/Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-pt-br app="Docker" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}