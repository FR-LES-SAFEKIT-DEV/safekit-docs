---
title: "Alta disponibilidade do K3S com SafeKit : Instale o módulo k3s.safe para failover."
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Implante o módulo k3s.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático de Kubernetes em Linux . Este guia orienta você na configuração de um cluster SANless de 2 nós para aplicações críticas Linux sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Kubernetes , Limitações de Alta Disponibilidade SafeKit , Visão Geral da solução SafeKit / Kubernetes , Instalação e configuração da solução SafeKit / Kubernetes no Linux ( k3s.safe ), Quais são os diferentes cenários em caso de isolamento de rede em um cluster?, Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade do K3S com SafeKit : Instale o módulo k3s.safe para failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Kubernetes" mod="k3s"  %}}
 

## Visão geral da solução SafeKit / Kubernetes {#overview-of-the-safekit--kubernetes-solution}

A solução é descrita aqui: **💡 [ Kubernetes Alta disponibilidade do K3s: Replicação síncrona e failover de 2 nós ](</pt-pt/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Instalação e configuração da solução SafeKit / Kubernetes em Linux ( k3s.safe ) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Baixe os pacotes {#1-download-packages}

  * Baixe a versão gratuita do SafeKit 8.2 no Linux (safekitlinux_xx.bin)
  * Baixe o módulo k3s.safe Linux
  * Baixe o script k3sconfig.sh
  * Documentação (pptx)


Nota: o script k3sconfig.sh instala K3S, MariaDB , NFS e SafeKit em 2 nós Ubuntu 24.04 Linux ).

[ Baixar SafeKit ( Linux ) > ](</pt-pt/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe"> Baixar k3s.safe ( Linux ) > </a> 

Baixar [ > k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

Documentação [ (pdf) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Primeiro em ambos os nós {#2-first-on-both-nodes}

Em 2 nós Ubuntu 24.04 Linux , como root:

  * Certifique-se de que o nó tenha acesso à internet (pode ser através de um proxy).
  * Copie os arquivos k3sconfig.sh , k3s.safe e o pacote safekit_xx.bin para um diretório e acesse-o com o comando `cd`.
  * Renomeie o arquivo .bin para "safekit.bin".
  * Certifique-se de que k3sconfig.sh e safekit.bin sejam executáveis.
  * Edite o script k3sconfig.sh e personalize as variáveis de ambiente de acordo com o seu ambiente (incluindo um IP virtual).
  * Executar em ambos os nós: `./k3sconfig.sh prereq`


O roteiro irá:

  * Instale os pacotes Debian necessários: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Instalação segura do MariaDB
  * Criar diretórios para replicação de arquivos
  * Prepare o servidor NFS para o compartilhamento de diretórios replicados.
  * Instale SafeKit


### 3. No primeiro nó {#3-on-the-first-node}

Execute no primeiro nó: `./k3sconfig.sh first`

O roteiro irá:

  * Crie o banco de dados de configuração do K3S e o usuário do K3S.
  * Crie o arquivo de volume de armazenamento replicado (arquivo esparso) e formate-o como um sistema de arquivos XFS.
  * Crie a configuração do cluster SafeKit e aplique-a.
  * Instale e configure o módulo k3s.safe no cluster.
  * Inicie o módulo k3s como "prim" no primeiro nó.
  * Baixe, instale e inicie o k3s
  * Baixe e instale o gráfico Helm nfs-subdir-external-provisioner.
  * Exibir token K3S (a ser usado durante a segunda fase de instalação do nó)


### 4. No segundo nó {#4-on-the-second-node}

Execute no segundo nó: `./k3sconfig.sh second <token>`

  * <token> é a string exibida ao final da execução " k3sconfig.sh first" no primeiro nó.


O roteiro irá:

  * Certifique-se de que o módulo k3s seja iniciado como primário no primeiro nó.
  * Instale o k3s no segundo nó.
  * Inicie o módulo k3s


### 5. Verifique se o módulo k3s SafeKit está em execução em ambos os nós {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Verifique com este comando em ambos os nós: `/opt/safekit/safekit –H "*" state`

A resposta deve ser semelhante à imagem.
    
    
    /opt/safekit/safekit –H " estado * "
    ---------------- Servidor= http://10.0.0.20:9010 ----------------
    ação do administrador=exec
    --------------------- Estado k3s ---------------------
    
      Local (127.0.0.1): PRIM (Serviço: Disponível) (Cor: Verde)
    Sucesso
    ---------------- Servidor= http://10.0.0.21:9010 ----------------
    ação do administrador=exec
    --------------------- Estado k3s ---------------------
    
      Local (127.0.0.1): SEGUNDO (Serviço: Disponível) (Cor: Verde)
    Sucesso
    

### 6. Inicie o console web SafeKit para administrar o cluster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Conecte um navegador ao endereço do console web SafeKit : `http://server0-IP:9010` .
  * Você deverá ver uma página semelhante à imagem.
  * Verifique com as linhas de comando Linux se o K3S está iniciado em ambos os nós (iniciado em `start_prim` e `start_second` ) e se o MariaDB está iniciado no nó primário (iniciado em `start_prim` ).


O cluster ![ Kubernetes foi iniciado no console web SafeKit ](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Testando {#7-testing}

  * Pare o nó PRIM rolando para baixo no menu de contexto e clicando em `Stop` .
  * Verifique se há um failover no SEGUNDO nó, que deve ficar SOZINHO (verde).
  * E, com as linhas de comando em Linux , verifique o failover dos serviços (parados no nó 1 no script `stop_prim` e iniciados no nó 2 no script `start_prim` ). MariaDB e K3S devem estar em execução no nó 2.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se ALONE (verde) não for alcançado no nó 2, analise o motivo com o log do módulo do nó 2.

  * Clique em `node2` para exibir o registro do módulo.
  * [ é um exemplo de um log do módulo SQL Server ](</wp-content/uploads/2024/03/24-module-log-script.png>) onde o nome do serviço em `start_prim` é inválido. O processo sqlserver.exe é monitorado, mas como não está em execução, o módulo é interrompido ao final.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se tudo estiver correto, inicie o processo no nó 1, que ressincronizará os diretórios replicados do nó 2.

Se algo der errado, pare o nó 2 e force o início do nó 1 como primário ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) [ que será reiniciado com seus dados íntegros locais no momento da parada.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


🛠️ [ Mais informações sobre testes no Guia do Usuário. ](</pt-pt/resources/safekit-user-guide-82/#tests>)


![ Pare o módulo no servidor PRIM ](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Experimente o cluster com um aplicativo Kubernetes , como o WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

Na imagem, você tem um exemplo de instalação do WordPress: um portal web com um banco de dados backend implementado por meio de pods.

Você pode implantar seu próprio aplicativo da mesma forma.

O WordPress é automaticamente altamente disponível:

  * com seus dados (php + banco de dados) em volumes persistentes replicados em tempo real por SafeKit
  * com um endereço IP virtual para acesso ao site WordPress para usuários
  * com failover automático e failback automático


Notas:

  * O gráfico do WordPress define um serviço com balanceamento de carga que escuta nas portas <service.port> e <service.httpsport> .
  * O WordPress pode ser acessado através do seguinte URL: `http://<virtual-ip>:<service.port>.`
  * O endereço IP virtual é gerenciado por SafeKit e a troca é feita automaticamente em caso de falha.
  * Por padrão, o K3S implementa balanceadores de carga com o Klipper.
  * O Klipper escuta nas portas <virtual ip> : <service.port> e encaminha os pacotes TCP/IP para o endereço IP e a porta do pod do WordPress que ele selecionou.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repositório add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

O comando Helm anterior deve baixar a imagem do WordPress de `registry-1.docker.io` . Você pode encontrar problemas de autenticação em `registry-1.docker.io` . Nesse caso, você deve:

  * Crie `/etc/rancher/k3s/registries.yaml` em ambos os nós com o seguinte conteúdo: 
        
        configurações:
          "registry-1.docker.io":
            aut:
              nome de usuário: seu_nome_de_usuário
              senha: sua_senha
            tls:
              insecure_skip_verify: true
        

  * Pare e inicie o k3s para levar isso em consideração, com `systemctl stop k3s` e `systemctl start k3s` .
  * Execute `helm registry login -u your_user_name docker.io` e, em seguida, digite sua senha.


### 9. Suporte {#9-support}

  * Para obter suporte, baixe 2 SafeKit `Snapshots` (2 arquivos .zip), um para cada nó.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


🛠️ Solução de problemas do [ no Guia do Usuário. ](</pt-pt/resources/safekit-user-guide-82/#Troubleshooting>)


![ Tire as fotos para suporte ](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Se necessário, configure um verificador de splitbrain {#10-if-necessary-configure-a-splitbrain-checker}

  * Veja abaixo [ "Quais são os diferentes cenários em caso de isolamento de rede em um cluster?" ](#isolation) para saber se você precisa configurar um verificador de splitbrain.
  * Na configuração do módulo, clique em `Advanced Configuration` (veja a imagem) para editar `userconfig.xml` .
  * Declare o verificador de splitbrain adicionando-o na seção `<check>` de `userconfig.xml` : 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` a nova configuração para reimplantar o arquivo userconfig.xml modificado em ambos os nós (o módulo deve ser interrompido em ambos os nós para salvar e aplicar).


Parâmetros **** :

  * `ident="witness"` identifica a testemunha com o nome de recurso: `splitbrain.witness` . Você pode alterar esse valor para identificar a testemunha.
  * `exec="ping"` refere-se ao código ping a ser executado. Não altere este valor.
  * `arg="witness IP"` é um argumento para o ping. Altere esse valor com o endereço IP da testemunha (um elemento robusto, normalmente um roteador).


![ Insira os parâmetros ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-pt-pt  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}