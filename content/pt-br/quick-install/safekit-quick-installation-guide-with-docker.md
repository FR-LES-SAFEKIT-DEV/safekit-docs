---
title: "Alta disponibilidade Docker com SafeKit : Instale o módulo mirror.safe para failover."
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Implante o módulo mirror.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático de contêineres Docker em Linux . Este guia orienta você na configuração de um cluster de 2 nós sem compartilhamento de recursos para aplicações críticas."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Docker , Limitações de Alta Disponibilidade do SafeKit , Visão Geral da solução SafeKit / Docker , Instalação da solução SafeKit / Docker no Linux ( mirror.safe ), Configuração passo a passo da solução SafeKit / Docker , Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade Docker com SafeKit : Instale o módulo mirror.safe para failover {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Docker" mod="mirror"  %}}
 

## Visão geral da solução SafeKit / Docker {#overview-of-the-safekit--docker-solution}

A solução está descrita aqui: ** 💡 [ SafeKit : Docker Software de Replicação de Dados de Alta Disponibilidade e em Tempo Real ](</solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Instalação da solução SafeKit / Docker em Linux ( mirror.safe ) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter o aplicativo Docker que deseja reiniciar em SafeKit instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

### Exemplo 1 com um aplicativo de composição Docker {#example-1-with-a-docker-compose-application}

Com um aplicativo composto Docker , você tem um arquivo **docker-compose.yml** que descreve o aplicativo e todos os seus contêineres.

  * Primeiro, em ambos os servidores, instale o aplicativo docker compose sem iniciá-lo: **docker-compose -f docker-compose.yml up --no-start**
  * Em um servidor, para cada volume em docker-compose.yml , execute este comando: **docker volume inspect volume_name**  
Ele retornará o **host directories of the docker volumes** (esses caminhos não são fornecidos em docker-compose.yml ).  
Você receberá uma lista de caminhos como **/var/lib/docker/volumes/ <volume_name>/_data**
  * Acesse a seção de configuração passo a passo ** e ** . 
    * Implante o módulo **mirror.safe**
    * Defina um endereço IP virtual ** ** , que será alternado em caso de falha.
    * Defina a lista de diretórios replicados **/var/lib/docker/volumes/ <volume_name>/_data** como ** **
    * Insira respectivamente nos scripts start_prim e stop_prim : **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** e **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### Exemplo 2 com um aplicativo Docker iniciando um conjunto de contêineres {#example-2-with-a-docker-application-starting-a-set-of-containers}

Supomos aqui uma aplicação Docker ** myappli ** que inicia um conjunto de contêineres.

  * Primeiro, em ambos os servidores, instale ** myappli ** sem iniciá-lo.
  * Em um servidor, liste os volumes usados por myapply : **ls /var/lib/docker/volumes**  
Assim, você obterá uma lista de caminhos como **/var/lib/docker/volumes/ <volume_name>/_data**
  * Acesse a seção de configuração passo a passo ** e ** . 
    * Implante o módulo **mirror.safe**
    * Defina um endereço IP virtual ** ** , que será alternado em caso de falha.
    * Defina a lista de diretórios replicados **/var/lib/docker/volumes/ <volume_name>/_data** como ** **
    * Insira respectivamente nos scripts start_prim e stop_prim : ** /.../myappli iniciar ** e ** /.../myappli parar **


### Exemplo 3 com uma imagem simples Docker {#example-3-with-a-simple-docker-image}

A configuração é apresentada no exemplo da imagem nginx Docker (servidor web).

  * Criação de volume Docker  
Em ambos os servidores, crie um volume Docker com o mesmo nome: **docker volume create replicated_vol**  
Obtenha o caminho do diretório onde o volume está armazenado no host: **docker volume inspect replicated_vol**  
(por exemplo: **/var/lib/docker/storage/replicated_vol/_data** )
  * Criação do contêiner Docker  
Em ambos os servidores, crie um contêiner Docker nginx que se vincule ao volume anterior: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Preencha o volume com algum arquivo index.html : **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Acesse a seção de configuração passo a passo ** e ** . 
    * Implante o módulo **mirror.safe**
    * Defina um endereço IP virtual ** ** , que será alternado em caso de falha.
    * Defina **/var/lib/docker/storage/replicated_vol/_data** como um diretório replicado.
    * Insira respectivamente nos scripts start_prim e stop_prim : **docker start mynginx** e **docker stop mynginx**
    * Após a configuração de SafeKit , teste o acesso a index.html com ** http://vitual-ip:9011**


## Configuração passo a passo da solução SafeKit / Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-pt-br app="Docker" mod="mirror"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}