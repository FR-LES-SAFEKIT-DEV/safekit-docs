---
title: "Alta Disponibilidade Docker com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Implemente o módulo mirror.safe para SafeKit para permitir a replicação síncrona em tempo real e o failover automático de contentores Docker no Linux. Este guia explica como configurar um cluster de 2 nós sem armazenamento sem compartilhamento para aplicações críticas."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Docker, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Docker, Instalação da solução SafeKit/Docker no Linux (mirror.safe), Configuração passo a passo da solução SafeKit/Docker, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Docker com SafeKit: Instale o Módulo mirror.safe para Failover {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Docker" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Docker {#overview-of-the-safekit--docker-solution}

A solução é descrita aqui: **💡 [SafeKit: Software de Replicação de Dados em Tempo Real e Alta Disponibilidade Docker](</pt-pt/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Instalação da solução SafeKit/Docker no Linux (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * É necessário que a aplicação Docker que pretende reiniciar no SafeKit esteja instalada em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}
 

### Exemplo 1 com uma aplicação Docker Compose {#example-1-with-a-docker-compose-application}

Com uma aplicação Docker Compose, tem um ficheiro **docker-compose.yml** que descreve a aplicação e todos os seus contentores.

  * Primeiro, em ambos os servidores, instale a aplicação docker compose sem a iniciar: **docker-compose -f docker-compose.yml up --no-start**
  * Num servidor, para cada volume em docker-compose.yml, execute este comando: **docker volume inspect volume_name**  
Irá devolver os **diretórios do anfitrião dos volumes do Docker** (estes caminhos não são especificados no docker-compose.yml).  
Receberá uma lista de caminhos como **/var/lib/docker/volumes/ <volume_name> /_data**
  * Vá para a secção **de configuração passo a passo** e 
    * implementar o módulo **mirror.safe**
    * defina um **endereço IP virtual** que será ativado em caso de falha
    * defina a lista de **/var/lib/docker/volumes/ <volume_name> /_data** como **diretórios replicados**
    * coloque respetivamente nos scripts start_prim e stop_prim: **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** e **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### Exemplo 2 com uma aplicação Docker que inicia um conjunto de contentores {#example-2-with-a-docker-application-starting-a-set-of-containers}

Assumimos aqui uma aplicação Docker **myappli**, que inicia um conjunto de contentores.

  * Primeiro, em ambos os servidores, instale **o myappli** sem o iniciar
  * Num servidor, liste os volumes usados pelo myapply: **ls /var/lib/docker/volumes**  
Assim, obterá uma lista de caminhos como **/var/lib/docker/volumes/ <volume_name> /_data**
  * Vá para a secção **de configuração passo a passo** e 
    * implementar o módulo **mirror.safe**
    * defina um **endereço IP virtual** que será ativado em caso de falha
    * defina a lista de **/var/lib/docker/volumes/ <volume_name> /_data** como **diretórios replicados**
    * coloque respetivamente nos scripts start_prim e stop_prim: **/.../myappli start** e **/.../myappli stop**


### Exemplo 3 com uma imagem Docker simples {#example-3-with-a-simple-docker-image}

A configuração é apresentada no exemplo da imagem Docker do nginx (servidor web).

  * Criação de volumes Docker  
Em ambos os servidores, crie um volume Docker com o mesmo nome: **docker volume create replicated_vol**  
Obtenha o caminho do diretório onde o volume está armazenado no anfitrião: **docker volume inspect replicated_vol**  
(por exemplo: **/var/lib/docker/storage/replicated_vol/_data**)
  * Criação de contentores Docker  
Em ambos os servidores, crie um contentor Docker nginx que se ligue ao volume anterior: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Preencha o volume com um ficheiro index.html: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Vá para a secção **de configuração passo a passo** e 
    * implementar o módulo **mirror.safe**
    * defina um **endereço IP virtual** que será ativado em caso de falha
    * definir **/var/lib/docker/storage/replicated_vol/_data** como um diretório replicado
    * coloque respetivamente nos scripts start_prim e stop_prim: **docker start mynginx** e **docker stop mynginx**
    * Após a configuração SafeKit, teste o acesso a index.html com **http://vitual-ip:9011**


## Configuração passo a passo da solução SafeKit/Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Docker" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}