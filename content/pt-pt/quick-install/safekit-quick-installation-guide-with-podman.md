---
title: "Alta Disponibilidade Podman com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Implemente o módulo mirror.safe para SafeKit para permitir a replicação síncrona em tempo real e o failover automático de contentores Podman no Linux. Este guia explica como configurar um cluster SANless de 2 nós para aplicações críticas sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Podman, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Podman, Instalação da solução SafeKit/Podman no Linux (mirror.safe), Configuração passo a passo da solução SafeKit/Podman, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Podman com SafeKit: Instale o Módulo mirror.safe para Failover {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Podman" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Podman {#overview-of-the-safekit--podman-solution}

A solução é descrita aqui: **💡 [SafeKit: Software de Replicação de Dados em Tempo Real e Alta Disponibilidade Podman](</pt-pt/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## Instalação da solução SafeKit/Podman no Linux (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * É necessário que a aplicação Podman que pretende reiniciar no SafeKit esteja instalada em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}
 

### Exemplo com uma imagem de contentor simples {#example-with-a-simple-container-image}

Neste exemplo, vamos mostrar como SafeKit pode gerir um contentor nginx (servidor web), ou seja: a replicação de um diretório acedido no contentor e o reinício do contentor noutro nó em caso de falha.

#### Pré-requisitos {#prerequisites-1}

  * Crie um diretório replicado **em ambos os nós**  
Crie um diretório **/replicated_dir_path** que será replicado pelo SafeKit e que conterá páginas HTML servidas pelo nginx
  * Preencha este diretório com um ficheiro HTML inicial **em ambos os nós**
        
        cp index.html /replicated_dir_path

  * Crie um contentor **em ambos os nós**  
Crie um contentor nginx em ambos os nós que associe o diretório **/replicated_dir_path** a **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### Configuração SafeKit {#safekit-configuration}

  * Vá para a secção **de configuração passo a passo**
  * Crie e configure um módulo **mirror.safe**
  * Defina um **endereço IP virtual** que será ativado em caso de falha
  * Defina **/replicated_dir_path** como um diretório replicado
  * Coloque respetivamente nos scripts start_prim e stop_prim: **podman start mynginx** e **podman stop mynginx**  
Nota: Poderá ter de usar "podman start --security-opt label=disable mynginx" com o SE Linux.
  * Implemente e inicie o módulo mirror SafeKit


#### Testes {#tests}

  * Teste o acesso ao nginx em **http://vitual-ip:9011/index.html**
  * Testar a replicação:  
No nó em estado PRIM SafeKit, adicione alguns outros ficheiros HTML ao diretório replicado: 
        
        cp page.html /replicated_dir_path

  * Parar o módulo mirror no nó no estado PRIM SafeKit
  * Verifique se o contentor foi reiniciado no nó secundário
  * Testar o acesso a **http://vitual-ip:9011/index.html** e a** http://vitual-ip:9011/page.html**


## Configuração passo a passo da solução SafeKit/Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Podman" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}