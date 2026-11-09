---
title: "Alta Disponibilidade Podman com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Implemente o módulo mirror.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático de contêineres Podman no Linux. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Podman, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Podman, Instalação da solução SafeKit/Podman no Linux (mirror.safe), Configuração passo a passo da solução SafeKit/Podman, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Podman com SafeKit: Instale o Módulo mirror.safe para Failover {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Podman" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Podman {#overview-of-the-safekit--podman-solution}

A solução é descrita aqui: **💡 [SafeKit: Software de Replicação de Dados em Tempo Real e Alta Disponibilidade Podman](</pt-br/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## Instalação da solução SafeKit/Podman no Linux (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter o aplicativo Podman que deseja reiniciar no SafeKit instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

### Exemplo com uma imagem de contêiner simples {#example-with-a-simple-container-image}

Neste exemplo, mostraremos como SafeKit pode gerenciar um contêiner nginx (servidor web), ou seja: a replicação de um diretório acessado no contêiner e a reinicialização do contêiner em outro nó em caso de falha.

#### Pré-requisitos {#prerequisites-1}

  * Crie um diretório replicado **em ambos os nós**  
Crie um diretório **/replicated_dir_path** que será replicado pelo SafeKit e que conterá páginas HTML servidas pelo nginx
  * Preencha este diretório com um arquivo HTML inicial **em ambos os nós**
        
        cp index.html /replicated_dir_path

  * Crie um contêiner **em ambos os nós**  
Crie um contêiner nginx em ambos os nós que vincule o diretório **/replicated_dir_path** a **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### Configuração SafeKit {#safekit-configuration}

  * Acesse a seção **de configuração passo a passo**
  * Crie e configure um módulo **mirror.safe**
  * Defina um **endereço IP virtual** que será alternado em caso de falha
  * Defina **/replicated_dir_path** como um diretório replicado
  * Coloque, respectivamente, nos scripts start_prim e stop_prim: **podman start mynginx** e **podman stop mynginx**  
Observação: pode ser necessário usar "podman start --security-opt label=disable mynginx" com o SE Linux.
  * Implemente e inicie o módulo mirror SafeKit


#### Testes {#tests}

  * Teste o acesso ao nginx em **http://vitual-ip:9011/index.html**
  * Replicação de teste:  
No nó no estado PRIM SafeKit, adicione alguns outros arquivos HTML ao diretório replicado: 
        
        cp page.html /replicated_dir_path

  * Pare o módulo mirror no nó no estado PRIM SafeKit
  * Verifique se o contêiner foi reiniciado no nó secundário
  * Teste o acesso a **http://vitual-ip:9011/index.html** e a** http://vitual-ip:9011/page.html**


## Configuração passo a passo da solução SafeKit/Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-pt-br app="Podman" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}