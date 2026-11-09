---
title: "Alta Disponibilidade K3S com SafeKit: Instale o Módulo k3s.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Implemente o módulo k3s.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático do Kubernetes no Linux. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações críticas Linux sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Kubernetes, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Kubernetes, Instalação e configuração da solução SafeKit/Kubernetes no Linux (k3s.safe), Quais são os diferentes cenários em caso de isolamento de rede em um cluster?, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade K3S com SafeKit: Instale o Módulo k3s.safe para Failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Kubernetes" mod="k3s"  %}}
 

## Visão geral da solução SafeKit/Kubernetes {#overview-of-the-safekit--kubernetes-solution}

A solução é descrita aqui: **💡 [Alta Disponibilidade Kubernetes K3s: Replicação Síncrona e Failover de 2 Nós](</pt-br/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Instalação e configuração da solução SafeKit/Kubernetes no Linux (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Baixar pacotes {#1-download-packages}

  * Baixe a versão gratuita do SafeKit 8.2 para Linux (safekitlinux_xx.bin)
  * Baixe o módulo Linux k3s.safe
  * Baixe o script k3sconfig.sh
  * Documentação (pptx)


Observação: o script k3sconfig.sh instala K3S, MariaDB, NFS e SafeKit em 2 nós Linux Ubuntu 24.04.

[Baixar SafeKit (Linux) >](</pt-br/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">Baixar k3s.safe (Linux) ></a> 

[Baixar k3sconfig.sh >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[Documentação (pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Primeiro em ambos os nós {#2-first-on-both-nodes}

Em 2 nós Linux Ubuntu 24.04, como root:

  * Certifique-se de que o nó tem acesso à internet (pode ser através de um proxy)
  * Copie k3sconfig.sh, k3s.safe e o pacote safekit_xx.bin para um diretório e acesse-o com o comando cd
  * Renomeie o arquivo .bin para "safekit.bin"
  * Certifique-se de k3sconfig.sh e safekit.bin sejam executáveis.
  * Edite o script k3sconfig.sh e personalize as variáveis de ambiente de acordo com o seu ambiente (incluindo um IP virtual)
  * Execute em ambos os nós: `./k3sconfig.sh prereq`


O script irá:

  * Instale os pacotes Debian necessários: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Instalação segura do MariaDB
  * Crie diretórios para a replicação de arquivos
  * Prepare o servidor NFS para compartilhar diretórios replicados
  * Instale SafeKit


### 3. No primeiro nó {#3-on-the-first-node}

Execute no primeiro nó: `./k3sconfig.sh first`

O script irá:

  * Crie o banco de dados de configuração K3S e o usuário k3s
  * Crie o arquivo de volume de armazenamento replicado (arquivo esparso) e formate-o como um sistema de arquivos xfs
  * Crie a configuração do cluster safekit e aplique-a
  * Instale e configure o módulo k3s.safe no cluster
  * Inicie o módulo k3s como "prim" no primeiro nó
  * Baixe, instale e inicie o k3s
  * Baixe e instale o gráfico Helm do nfs-subdir-external-provisioner
  * Exibir o token K3S (a ser usado durante a segunda fase de instalação do nó)


### 4. No segundo nó {#4-on-the-second-node}

Execute no segundo nó: `./k3sconfig.sh second <token>`

  * <token> é a string exibida no final da execução do " k3sconfig.sh first" no primeiro nó


O script irá:

  * Certifique-se de que o módulo k3s seja iniciado como prim no primeiro nó
  * Instale o k3s no segundo nó
  * Inicie o módulo k3s


### 5. Verifique se o módulo k3s SafeKit está em execução em ambos os nós {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Verifique com este comando em ambos os nós: `/opt/safekit/safekit –H "*" state`

A resposta deve ser semelhante à imagem.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- Servidor= http://10.0.0.20:9010 ----------------
    Ação admin = executar
    --------------------- Estado do k3s ---------------------
    
      Local (127.0.0.1): PRIM (Serviço: Disponível) (Cor: Verde)
    Sucesso
    ---------------- Servidor= http://10.0.0.21:9010 ----------------
    Ação admin = executar
    --------------------- Estado do k3s ---------------------
    
      Local (127.0.0.1): SECOND (Serviço: Disponível) (Cor: Verde)
    Sucesso
    

### 6. Inicie o console web SafeKit para administrar o cluster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Conecte um navegador ao URL do console da web SafeKit `http://server0-IP:9010`.
  * Você deve ver uma página semelhante à imagem.
  * Verifique com as linhas de comando Linux se K3S é iniciado em ambos os nós (iniciado em `start_prim` e `start_second`) e se MariaDB é iniciado no nó primário (iniciado em `start_prim`).


![O cluster Kubernetes foi iniciado no console web SafeKit](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Testes {#7-testing}

  * Pare o nó PRIM rolando para baixo no menu contextual e clicando em `Stop`.
  * Verifique se há um failover no SECOND nó, que deve ficar ALONE (verde).
  * E com linhas de comando no Linux, verifique o failover dos serviços (parados no nó 1 no script `stop_prim` e iniciados no nó 2 no script `start_prim`). MariaDB e K3S devem ser executados no node2.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se ALONE (verde) não for atingido no node2, analise o motivo com o log do módulo do nó 2.

  * Clique no `node2` para exibir o log do módulo.
  * [exemplo de um log de módulo SQL Server](</wp-content/uploads/2024/03/24-module-log-script.png>) em que o nome do serviço em `start_prim` é inválido. O processo sqlserver.exe é monitorado, mas como não é iniciado, no final o módulo para.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se tudo estiver bem, inicie o node1, que irá ressincronizar os diretórios replicados do node2.

Se as coisas derem errado, pare node2 e [force o início como primário](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) do node1, que será reiniciado com seus dados localmente íntegros no momento da parada.


![Observação](/wp-content/uploads/2022/07/note.png)


🛠️ [Mais informações sobre os testes no Guia do Usuário.](</pt-br/resources/safekit-user-guide-82/#tests>)


![Pare o módulo no servidor PRIM](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Experimente o cluster com um aplicativo Kubernetes, como o WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

Você tem o exemplo de uma instalação do WordPress na imagem: um portal da web com um banco de dados de backend implementado por pods.

Você pode implantar seu próprio aplicativo da mesma forma.

O WordPress é automaticamente altamente disponível:

  * com os seus dados (PHP + base de dados) em volumes persistentes replicados em tempo real pelo SafeKit
  * com um endereço IP virtual para acessar o site do WordPress para os usuários
  * com failover automático e failback automático


Observações:

  * O gráfico do WordPress define um serviço de balanceamento de carga que escuta nas portas <service.port> e <service.httpsport>.
  * O WordPress está acessível através do URL: `http://<virtual-ip>:<service.port>.`
  * O IP virtual é gerenciado pelo SafeKit e é alterado automaticamente em caso de failover.
  * Por padrão, K3S implementa balanceadores de carga com o Klipper.
  * O Klipper escuta em <virtual ip>: <service.port> e roteia os pacotes TCP/IP para o endereço IP e a porta do pod do WordPress que ele selecionou.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

O comando helm anterior deve baixar a imagem do WordPress do `registry-1.docker.io`. Você pode encontrar problemas de autenticação no `registry-1.docker.io`. Nesse caso, você deve:

  * Crie `/etc/rancher/k3s/registries.yaml` em ambos os nós com o seguinte conteúdo: 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * pare e inicie o k3s para que ele seja levado em consideração, com `systemctl stop k3s` e `systemctl start k3s`.
  * Execute o `helm registry login -u your_user_name docker.io` e, em seguida, digite sua senha


### 9. Suporte {#9-support}

  * Para obter suporte, faça 2 `Snapshots` SafeKit (2 arquivos .zip), um para cada nó.


![Observação](/wp-content/uploads/2022/07/note.png)


🛠️ [Resolução de problemas no Guia do Usuário.](</pt-br/resources/safekit-user-guide-82/#Troubleshooting>)


![Tire as capturas de tela para obter suporte](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Se necessário, configure um checker split-brain {#10-if-necessary-configure-a-splitbrain-checker}

  * Consulte abaixo ["Quais são os diferentes cenários em caso de isolamento de rede em um cluster?"](#isolation) para saber se você precisa configurar um checker split-brain.
  * Na configuração do módulo, clique em `Advanced Configuration` (veja a imagem) para editar `userconfig.xml`.
  * Declare o checker split-brain adicionando-o na seção `<check>` do `userconfig.xml`: 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` a nova configuração para reimplantar o arquivo userconfig.xml modificado em ambos os nós (o módulo deve ser interrompido em ambos os nós para salvar e aplicar).


**Parâmetros** :

  * `ident="witness"` identifica a testemunha com um nome de recurso: `splitbrain.witness`. Você pode alterar esse valor para identificar a testemunha.
  * `exec="ping"` faz referência ao código de ping a ser executado. Não altere esse valor.
  * `arg="witness IP"` é um argumento para o ping. Altere este valor com o IP da testemunha (um elemento robusto, normalmente um roteador).


![Insira os parâmetros](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-pt-br  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}