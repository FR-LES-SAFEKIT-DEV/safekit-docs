---
title: "Alta Disponibilidade K3S com SafeKit: Instale o Módulo k3s.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Implemente o módulo k3s.safe para SafeKit para ativar a replicação síncrona em tempo real e o failover automático do Kubernetes em Linux. Este guia explica como configurar um cluster SANless de 2 nós para aplicações Linux críticas sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Kubernetes, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Kubernetes, Instalação e configuração da solução SafeKit/Kubernetes em Linux (k3s.safe), Quais são os diferentes cenários em caso de isolamento de rede num cluster?, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade K3S com SafeKit: Instale o Módulo k3s.safe para Failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Kubernetes" mod="k3s"  %}}
 

## Visão geral da solução SafeKit/Kubernetes {#overview-of-the-safekit--kubernetes-solution}

A solução é descrita aqui: **💡 [Kubernetes K3s Alta Disponibilidade: Replicação Síncrona e Failover de 2 Nós](</pt-pt/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Instalação e configuração da solução SafeKit/Kubernetes em Linux (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Descarregar pacotes {#1-download-packages}

  * Descarregue a versão gratuita do SafeKit 8.2 para Linux (safekitlinux_xx.bin)
  * Descarregue o módulo Linux k3s.safe
  * Faça o download do script k3sconfig.sh
  * Documentação (pptx)


Nota: o script k3sconfig.sh instala K3S, MariaDB, o NFS e SafeKit em 2 nós Linux Ubuntu 24.04.

[Descarregue SafeKit (Linux) >](</pt-pt/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">Descarregue k3s.safe (Linux) ></a> 

[Descarregar k3sconfig.sh >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[Documentação (pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Primeiro em ambos os nós {#2-first-on-both-nodes}

Em 2 nós Linux Ubuntu 24.04, como root:

  * Certifique-se de que o nó tem acesso à internet (pode ser através de um proxy)
  * Copie os k3sconfig.sh, k3s.safe e o pacote safekit_xx.bin para um diretório e navegue até ele
  * Renomeie o ficheiro .bin para "safekit.bin"
  * Certifique-se de k3sconfig.sh e safekit.bin são executáveis.
  * Edite o script k3sconfig.sh e personalize as variáveis de ambiente de acordo com o seu ambiente (incluindo um IP virtual)
  * Execute em ambos os nós: `./k3sconfig.sh prereq`


O guião irá:

  * Instale os pacotes Debian necessários: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Instalação segura do MariaDB
  * Crie diretórios para a replicação de ficheiros
  * Prepare o servidor NFS para partilhar diretórios replicados
  * Instale SafeKit


### 3. No primeiro nó {#3-on-the-first-node}

Execute no primeiro nó: `./k3sconfig.sh first`

O guião irá:

  * Crie a base de dados de configuração K3S e o utilizador k3s
  * Crie o ficheiro de volume de armazenamento replicado (ficheiro esparso) e formate-o como um sistema de ficheiros xfs
  * Crie a configuração do cluster safekit e aplique-a
  * Instale e configure o módulo k3s.safe no cluster
  * Inicie o módulo k3s como "prim" no primeiro nó
  * Descarregue, instale e inicie o k3s
  * Descarregue e instale o gráfico Helm do nfs-subdir-external-provisioner
  * Exibir o token K3S (a ser utilizado durante a segunda fase de instalação do nó)


### 4. No segundo nó {#4-on-the-second-node}

Execute no segundo nó: `./k3sconfig.sh second <token>`

  * <token> é a cadeia de caracteres exibida no final da execução de " k3sconfig.sh first" no primeiro nó


O guião irá:

  * Certifique-se de que o módulo k3s é iniciado como prim no primeiro nó
  * Instale o k3s no segundo nó
  * Inicie o módulo k3s


### 5. Verifique se o módulo k3s SafeKit está a ser executado em ambos os nós {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Verifique com este comando em ambos os nós: `/opt/safekit/safekit –H "*" state`

A resposta deve ser semelhante à imagem.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- Servidor= http://10.0.0.20:9010 ----------------
    ação admin =executar
    --------------------- Estado do k3s ---------------------
    
      Local (127.0.0.1): PRIM (Serviço: Disponível) (Cor: Verde)
    Sucesso
    ---------------- Servidor= http://10.0.0.21:9010 ----------------
    ação admin =executar
    --------------------- Estado do k3s ---------------------
    
      Local (127.0.0.1): SECOND (Serviço: Disponível) (Cor: Verde)
    Sucesso
    

### 6. Inicie a consola web SafeKit para administrar o cluster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Ligue um navegador ao URL da consola web SafeKit `http://server0-IP:9010`.
  * Deverá ver uma página semelhante à imagem.
  * Verifique, através das linhas de comando Linux, se K3S está iniciado em ambos os nós (iniciado em `start_prim` e `start_second`) e se MariaDB está iniciado no nó primário (iniciado em `start_prim`).


![O cluster Kubernetes foi iniciado na consola web SafeKit](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Testes {#7-testing}

  * Pare o nó PRIM, percorrendo o menu contextual e clicando em `Stop`.
  * Verifique se existe um failover no SECOND nó, que deverá ficar ALONE (verde).
  * E com as linhas de comando no Linux, verifique a redundância dos serviços (parados no nó 1 no script `stop_prim` e iniciados no nó 2 no script `start_prim`). MariaDB e K3S devem ser executados no node2.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se ALONE (verde) não for atingido no node2, analise o motivo com o registo do módulo do nó 2.

  * clique no `node2` para exibir o registo do módulo.
  * [Exemplo de um registo de módulo SQL Server](</wp-content/uploads/2024/03/24-module-log-script.png>) onde o nome do serviço em `start_prim` é inválido. O processo sqlserver.exe é monitorizado, mas como não é iniciado, no final o módulo para.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se tudo estiver bem, inicie o node1, que irá ressincronizar os diretórios replicados do node2.

Se as coisas correrem mal, pare node2 e [force o arranque](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) do node1 como primário, que será reiniciado com os seus dados localmente íntegros no momento da paragem.


![Nota](/wp-content/uploads/2022/07/note.png)


🛠️ [Mais informações sobre os testes no Guia do Utilizador.](</pt-pt/resources/safekit-user-guide-82/#tests>)


![Parar o módulo no servidor PRIM](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Experimente o cluster com uma aplicação Kubernetes, como o WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

Na imagem, tem o exemplo de uma instalação WordPress: um portal web com uma base de dados de backend implementada por pods.

Pode implementar a sua própria aplicação da mesma forma.

O WordPress é automaticamente altamente disponível:

  * com os seus dados (php + base de dados) em volumes persistentes replicados em tempo real pelo SafeKit
  * com um endereço IP virtual para aceder ao site WordPress para os utilizadores
  * com comutação automática de contingência e failback automático


Notas:

  * O gráfico do WordPress define um serviço de balanceamento de carga que escuta nas portas <service.port> e <service.httpsport>.
  * O WordPress está acessível através do URL: `http://<virtual-ip>:<service.port>.`
  * O IP virtual é gerido pelo SafeKit e é automaticamente alterado em caso de falha.
  * Por predefinição, K3S implementa balanceadores de carga com o Klipper.
  * O Klipper escuta em <virtual ip>: <service.port> e encaminha os pacotes TCP/IP para o endereço IP e a porta do pod do WordPress que selecionou.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

O comando anterior do Helm deverá descarregar a imagem do WordPress do `registry-1.docker.io`. Poderá encontrar problemas de autenticação no `registry-1.docker.io`. Nesse caso, deverá:

  * Crie o ficheiro `/etc/rancher/k3s/registries.yaml` em ambos os nós com o seguinte conteúdo: 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * Para que as alterações sejam tida em conta, é necessário parar e iniciar o k3s, utilizando os `systemctl stop k3s` e `systemctl start k3s`.
  * Execute o `helm registry login -u your_user_name docker.io` e, em seguida, introduza a sua palavra-passe


### 9. Apoio {#9-support}

  * Para obter suporte, faça 2 `Snapshots` SafeKit (2 ficheiros .zip), uma para cada nó.


![Nota](/wp-content/uploads/2022/07/note.png)


🛠️ [Resolução de problemas no Guia do Utilizador.](</pt-pt/resources/safekit-user-guide-82/#Troubleshooting>)


![Tire as capturas de ecrã para obter suporte](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Se necessário, configure um checker split-brain {#10-if-necessary-configure-a-splitbrain-checker}

  * Consulte abaixo ["Quais são os diferentes cenários em caso de isolamento de rede num cluster?"](#isolation) para saber se precisa de configurar um checker split-brain.
  * Na configuração do módulo, clique em `Advanced Configuration` (ver imagem) para editar o `userconfig.xml`.
  * Declare o checker split-brain adicionando-o na secção `<check>` do `userconfig.xml`: 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` a nova configuração para reimplantar o ficheiro userconfig.xml modificado em ambos os nós (o módulo deve ser parado em ambos os nós para guardar e aplicar).


**Parâmetros** :

  * `ident="witness"` identifica a testemunha com o nome do recurso: `splitbrain.witness`. Pode alterar este valor para identificar a testemunha.
  * `exec="ping"` refere-se ao código de ping a ser executado. Não altere este valor.
  * `arg="witness IP"` é um argumento para o ping. Altere este valor para o IP da testemunha (um elemento robusto, normalmente um router).


![Introduza os parâmetros](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-pt-pt  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}