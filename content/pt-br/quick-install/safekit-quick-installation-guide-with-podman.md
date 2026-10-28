---
title: "Alta disponibilidade Podman com SafeKit : Instale o módulo mirror.safe para failover."
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Implante o módulo mirror.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático de contêineres Podman em Linux . Este guia orienta você na configuração de um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Podman , Limitações de Alta Disponibilidade do SafeKit , Visão Geral da solução SafeKit / Podman , Instalação da solução SafeKit / Podman no Linux ( mirror.safe ), Configuração passo a passo da solução SafeKit / Podman , Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade Podman com SafeKit : Instale o módulo mirror.safe para failover {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Podman" mod="mirror"  %}}
 

## Visão geral da solução SafeKit / Podman {#overview-of-the-safekit--podman-solution}

A solução é descrita aqui: ** 💡 [ SafeKit : Podman Software de replicação de dados de alta disponibilidade e em tempo real ](</pt-br/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>) ** .

## Instalação da solução SafeKit / Podman em Linux ( mirror.safe ) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter o aplicativo Podman que deseja reiniciar em SafeKit instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

### Exemplo com uma imagem de contêiner simples {#example-with-a-simple-container-image}

Neste exemplo, mostraremos como SafeKit pode gerenciar um contêiner nginx (servidor web), ou seja: replicação de um diretório acessado no contêiner e reinicialização do contêiner em outro nó em caso de falha.

#### Pré-requisitos {#prerequisites-1}

  * Crie um diretório replicado ** em ambos os nós **  
Crie um diretório ** /replicated_dir_path ** que será replicado por SafeKit e que conterá páginas HTML servidas por nginx
  * Preencha este diretório com um arquivo HTML inicial ** em ambos os nós **
        
        cp index.html /replicated_dir_path

  * Crie um contêiner ** em ambos os nós **  
Crie um contêiner nginx em ambos os nós que vincule o diretório ** /replicated_dir_path ** ao **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path : /usr/share/nginx/html -p 9011:80 nginx


#### Configuração SafeKit {#safekit-configuration}

  * Acesse a seção de configuração passo a passo ** **
  * Criar e configurar um módulo **mirror.safe**
  * Configure um endereço IP virtual ** ** , que será alternado em caso de falha.
  * Defina ** /replicated_dir_path ** como um diretório replicado.
  * Insira respectivamente nos scripts start_prim e stop_prim : **podman start mynginx** e **podman stop mynginx**  
Nota: Pode ser necessário usar "podman start --security-opt label=disable mynginx " com SE Linux .
  * Implante e inicie o módulo SafeKit mirror


#### Testes {#tests}

  * Teste o acesso a nginx em **http://vitual-ip:9011/index.html**
  * Replicação do teste:  
No nó em estado PRIM SafeKit , adicione alguns outros arquivos HTML ao diretório replicado: 
        
        cp page.html /replicated_dir_path

  * Pare o módulo mirror no nó no estado PRIM SafeKit
  * Verifique se o contêiner foi reiniciado no nó secundário.
  * Teste de acesso a **http://vitual-ip:9011/index.html** e a **http://vitual-ip:9011/page.html**


## Configuração passo a passo da solução SafeKit / Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-pt-br app="Podman" mod="mirror"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}