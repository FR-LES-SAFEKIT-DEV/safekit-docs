---
title: "Configuração antiga SafeKit Milestone"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "pt-pt"
topics: "Configuração passo a passo antiga da solução SafeKit / Milestone XProtect"
---

# Configuração antiga SafeKit Milestone {#old-safekit-milestone-configuration}

## Configuração passo a passo antiga da solução SafeKit / Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Atenção: é necessário realizar alguns passos específicos de configuração no endereço IP virtual, caso contrário o failover não funcionará.

### 1. Inicie o console SafeKit {#1-launch-the-safekit-console}

  * Inicie o console da web em um navegador em um nó do cluster conectando-se a `http://localhost:9010` .
  * Insira `admin` como nome de usuário e a senha definida durante a instalação.


Você também pode executar o console em um navegador em uma estação de trabalho externa ao cluster.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


A configuração do SafeKit é feita em ambos os nós a partir de um único navegador.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Para proteger o console da web, consulte a seção "Protegendo o console da web SafeKit no Guia do Usuário.


![ Inicie o console web SafeKit para configurar o cluster ](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configure os endereços de nó {#2-configure-node-addresses}

  * Insira os endereços IP dos nós.
  * Em seguida, clique em `Apply` para salvar a configuração.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se a cor de fundo do nó 1 ou do nó 2 estiver vermelha, verifique a conectividade do navegador com ambos os nós e verifique o firewall em ambos os nós para solucionar o problema.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Esta operação irá inserir os endereços IP do arquivo `cluster.xml` em ambos os nós (mais informações no treinamento com a linha de comando).


![ Insira os nós do cluster ](/wp-content/uploads/2023/01/appli-3.png)


### 3. Selecione o módulo {#3-choose-the-module}

  * Na aba Configuração, clique no módulo .safe.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


O console encontra o arquivo xxx.safe no diretório 'Application_Modules/demo/' no servidor, caso você tenha adicionado um módulo a esse diretório durante a instalação.


![ Selecione o módulo para ](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configure o módulo {#4-configure-the-module}

  * Selecione a inicialização automática do módulo na inicialização do sistema, sem demora.
  * Normalmente, você tem uma única rede de pulsação na qual a replicação é feita. Mas, se necessário, você pode definir uma rede privada.
  * Verifique se os diretórios replicados estão instalados em ambos os nós e contêm os dados do aplicativo.  
A replicação de dados e também de logs é necessária para um banco de dados.  
Você pode adicionar novos diretórios replicados conforme necessário.
  * Insira um endereço IP virtual. Um endereço IP virtual é um endereço IP padrão na mesma rede IP (mesma sub-rede) que os endereços IP de ambos os nós.  
Os clientes da aplicação devem ser configurados com o endereço IP virtual (ou o nome DNS associado ao endereço IP virtual).  
O endereço IP virtual é alternado automaticamente em caso de falha.
  * `start_prim` e `stop_prim` devem conter as instruções de inicialização e parada do aplicativo.  
Você pode adicionar novos serviços a esses scripts.  
Verifique se os nomes dos serviços nesses scripts correspondem aos instalados em ambos os nós; caso contrário, modifique-os nos scripts.
  * Pare os serviços configurados em `start_prim` em ambos os nós.
  * Em Windows e em ambos os nós, com o gerenciador de serviços Windows , defina `Boot Startup Type = Manual` para todos os serviços registrados em `start_prim` ( SafeKit controla a inicialização dos serviços em `start_prim` ).


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se o SQL estiver no servidor de gerenciamento:

  * Os bancos de dados do sistema SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf e master.ldf) devem estar localizados nos mesmos diretórios em ambos os nós. Os diretórios devem ser configurados como replicados.
  * O SQL Server também deve ser instalado no mesmo local do sistema de arquivos em ambos os nós, pois o banco de dados de recursos SQL somente leitura [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) está localizado no diretório binário e é necessário para o failover. Este banco de dados não precisa ser replicado.
  * Os bancos de dados SQL Milestone (.mdf e .ldf) devem estar localizados nos mesmos diretórios em ambos os nós. Os diretórios devem ser configurados como replicados. Os bancos de dados Milestone são os seguintes, de acordo com este artigo [ ](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) .


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Observe que, se o nome de um processo for exibido no Verificador de Processos, ele será monitorado e uma ação de reinicialização será executada em caso de falha. Configurar um nome de processo incorreto fará com que o módulo seja interrompido logo após sua inicialização.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


O botão "Aplicar" exibirá a configuração nos arquivos `userconfig.xml` , `start_prim` e `stop_prim` em ambos os nós (mais informações no treinamento com a linha de comando).


![ Insira as configurações do módulo ](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Verifique se a configuração {#5-verify-successful-configuration} foi bem-sucedida.

  * Verifique a mensagem de sucesso (verde) em ambos os nós e clique em Avançar.


![ Verifique se a configuração do módulo foi bem-sucedida ](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Não inicie nada e clique no botão Fechar {#6-do-not-start-anything-and-click-on-the-close-button}


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Não inicie nada e clique no botão Fechar, pois é necessária uma configuração especial no endereço IP virtual antes de começar.


![ Selecione o nó com os dados atualizados ](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Acesse a área de trabalho do nó 1 e defina o endereço IP virtual nos arquivos internos Milestone {#milestone-files}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


A partir da versão Milestone 2022 R3, esta etapa não é necessária e será realizada automaticamente com "Configurador de Servidor - Registro de servidores - http://virtual-IP" em uma próxima etapa.

Em um prompt de comando do PowerShell como Administrador, execute o seguinte script no nó 1:
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Este script define o endereço IP virtual em 2 arquivos internos Milestone :
    
    
    C:\ProgramData\ Milestone \ XProtect Servidor de Gerenciamento\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autoridade": " http://** < virtual-ip> ** /IDP "


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Nesta etapa, assumimos que o endereço IP virtual foi configurado corretamente nas etapas anteriores (o script usa o endereço IP virtual inserido no console SafeKit e armazenado em `userconfig.xml` ).


Nota ![ ](/wp-content/uploads/2022/07/note.png)


### 8. Inicie o nó 1 como primário no console, o nó com os dados atualizados {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Partimos do pressuposto, a partir da Etapa 7, de que o nó 1 possui os diretórios replicados atualizados.

Forçar a inicialização do nó 1 como primário. Quando o nó 2 for iniciado, todos os dados do nó 1 serão copiados para o nó 2.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se você fizer a escolha errada, corre o risco de sincronizar dados desatualizados em ambos os nós.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Presume-se também que a aplicação esteja parada no nó 1 para que o script SafeKit instale os mecanismos de replicação e, em seguida, inicie a aplicação no script `start_prim` .


![ Força a inicialização como primário do nó com os dados atualizados. ](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Aguarde a transição para SOZINHO (verde) {#9-wait-for-the-transition-to-alone-green}

  * O nó 1 deve atingir o estado SOZINHO (verde), o que significa que o script `start_prim` foi executado no nó 1.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se o status for ALONE (verde) e o aplicativo não estiver em execução, verifique as mensagens de saída de `start_prim` no Log de Aplicativos do nó 1.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se o nó 1 não atingir o estado SOZINHO (verde), analise o motivo com o Log do Módulo do nó 1.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se o cluster estiver no estado `WAIT (red) not uptodate - STOP (red) not uptodate` , pare o nó WAIT e force sua inicialização como primário.


![ O primeiro nó inicia como primário e fica SOZINHO ](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Na área de trabalho do nó 1, pare, registre-se no endereço IP virtual e reinicie o servidor de gerenciamento Milestone {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Execute os seguintes passos no nó 1 de acordo com o menu na imagem:

  * Clique com o botão direito do mouse no ícone do Servidor de Gerenciamento ** Milestone ** na barra de tarefas.
  * ** Parar o serviço do servidor de gerenciamento **
  * Em seguida, selecione o Configurador de Servidor ** ... ** e registre o endereço IP virtual.
  * ** Iniciar o serviço do servidor de gerenciamento **


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Este procedimento registra o servidor de gerenciamento do nó 1 no banco de dados SQL (em execução no nó 1) por meio de uma conexão com o endereço virtual.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Antes da versão Milestone 2022 R3, o registro pode ter excluído a configuração do endereço IP virtual nos arquivos internos Milestone . Nesse caso, repita a Etapa 7 [ ](#milestone-files) .


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Nota: Para registrar uma versão anterior Milestone 2020 R2, use ** Alterar configurações de criptografia... **


![ Registre o servidor de gerenciamento em Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Na área de trabalho do nó 1 com o Cliente de Gerenciamento Milestone , defina o endereço IP virtual em URLs para serviços e rede {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


A partir da versão Milestone 2022 R3, esta etapa não é mais necessária e foi realizada automaticamente com "Configurador de Servidor - Registro de servidores - http://virtual-IP".

Conforme a imagem:

  1. Inicie o cliente de gerenciamento ** Milestone XProtect ** no nó 1.
  2. No menu ** Tools ** , selecione ** Registered Services ** . 
     * Na janela ** Adicionar/Remover Serviços Registrados ** , selecione um serviço na lista e clique em ** Editar ** .
     * Na janela Editar Serviço Registrado ** ** , altere o endereço URL do serviço para o mesmo endereço URL, mas contendo o endereço IP virtual.
     * Repita esses passos para todos os serviços listados na janela.
  3. Na mesma janela, clique em ** Network ** . 
     * Na janela de Configuração de Rede ** ** , altere o endereço URL do servidor para o mesmo endereço URL, mas contendo o endereço IP virtual.


![ Defina o endereço IP virtual nos URLs e no cliente de gerenciamento Milestone ](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Na área de trabalho do nó 1 com o Cliente de Gerenciamento Milestone , defina as funções de administrador para garantir um failover correto {#role}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Se a autenticação Milestone " Windows " tiver sido configurada com um Active Directory, o usuário/senha será recuperado no AD externo no nó secundário após um failover, portanto, não há nenhuma configuração especial.

Ao iniciar o cliente de gerenciamento Milestone XProtect , você precisa se autenticar com "autenticação Windows " ou "autenticação básica" ( [ clique aqui para ver a captura de tela ](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) ).

Abra o cliente de gerenciamento ** Milestone XProtect e ** em ** Segurança/Funções ** (veja a imagem).

  * Defina o grupo Windows ** BUILTIN\Administrators ** . Dessa forma, um usuário administrador no servidor secundário poderá se conectar ao Milestone no servidor secundário com a autenticação " Windows ".
  * Crie um usuário com autenticação básica ( ** Admin ** na imagem) para garantir a reautenticação no nó secundário após uma falha. Para autenticação básica, o usuário e a senha são armazenados no banco de dados SQL e serão recuperados no nó secundário após uma falha.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Ao configurar o grupo BUILTIN\Administrators, você poderá autenticar no nó secundário com um administrador local Windows .

Caso contrário, nenhuma autenticação será possível com uma conta local Windows no servidor secundário após uma falha.

Isso ocorre porque o grupo BUILTIN\Administrators possui o mesmo SID em ambos os nós. Para outros grupos locais ou usuários locais, a autenticação não será possível no nó secundário, pois os SIDs são diferentes entre os dois nós, mesmo que tenham o mesmo nome.


![ Definir funções no cliente de gerenciamento Milestone ](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Vá para a área de trabalho do nó 2 e defina o endereço IP virtual nos arquivos internos Milestone {#milestone-files-2}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


A partir da versão Milestone 2022 R3, esta etapa não é necessária e será realizada automaticamente com "Configurador de Servidor - Registro de servidores - http://virtual-IP" em uma próxima etapa.

Em um prompt de comando do PowerShell como Administrador, execute o seguinte script no nó 2:
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Este script define o endereço IP virtual em 2 arquivos internos Milestone :
    
    
    C:\ProgramData\ Milestone \ XProtect Servidor de Gerenciamento\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autoridade": " http://** < virtual-ip> ** /IDP "

### 14. Na área de trabalho do nó 2, registre o servidor de gerenciamento no endereço IP virtual {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Selecione o Configurador de Servidor ** ** na barra de tarefas do nó 2 e registre-o no endereço IP virtual (veja a imagem).
  * Em seguida, ** Pare o serviço do servidor de gerenciamento ** .


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


A conta do usuário que executa o registro no nó 2 deve ter a função de administrador em Milestone no nó 1.

Se o registro for feito pelo administrador local no nó 2, o grupo integrado Windows `BUILTIN\Administrators` deve ter sido configurado em Cliente de Gerenciamento / Segurança / Funções no Passo 12 [ ](#role) . Caso contrário, o registro não funcionará.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Este procedimento registra o servidor de gerenciamento do nó 2 no banco de dados SQL (em execução no nó 1) por meio de uma conexão com o endereço virtual.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Com uma versão do Milestone anterior a 2022 R3, o registro pode ter excluído a configuração do endereço IP virtual nos arquivos internos Milestone . Nesse caso, repita o Passo 13 do [ ](#milestone-files-2) .


![ Registre o servidor de gerenciamento com Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Iniciar nó 2 {#15-start-node-2}

  * Inicie o nó 2 através do seu menu contextual.
  * Aguarde o SEGUNDO estado (verde).


Nota ![ ](/wp-content/uploads/2022/07/note.png)


O nó 2 permanece no SEGUNDO estado (magenta) enquanto resincroniza os diretórios replicados (cópia do nó 1 para o nó 2).

Isso pode demorar um pouco, dependendo do tamanho dos arquivos a serem ressincronizados nos diretórios replicados e da largura de banda da rede.

Para acompanhar o progresso da cópia, consulte o Log do Módulo do nó 2 com a opção detalhada ativada, sem se esquecer de atualizar a janela.


![ O primeiro nó inicia como primário e fica SOZINHO ](/wp-content/uploads/2022/07/appli-11.png)


### 16. Verifique se o cluster está operacional {#16-verify-that-the-cluster-is-operational}

  * Verifique se o cluster está verde/verde com os serviços em execução no nó PRIM e não no nó SECOND.


Nesse estado, apenas as alterações dentro dos arquivos são replicadas em tempo real.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Os componentes que são clientes de serviços devem ser configurados com o endereço IP virtual. A configuração pode ser feita com um nome DNS (se um nome DNS tiver sido criado e associado ao endereço IP virtual).


![ O segundo nó inicia como SECOND ](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configure o endereço IP virtual nos servidores de gravação {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Instale os servidores de gravação, especificando o endereço IP virtual no URL de instalação.
  * Ou, no lado dos servidores de gravação, defina o endereço IP virtual nos seguintes campos de 
        
        C:\ProgramData\ Milestone \ XProtect Servidor de Gravação\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * Conecte o cliente de gerenciamento Milestone e o cliente inteligente Milestone no endereço IP virtual.


### 18. O Cliente de Gerenciamento e o Cliente Inteligente não estão funcionando corretamente após a troca de nó {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

Em uma configuração de servidor de gerenciamento XProtect em cluster, o Smart Client e o Management Client apresentam diversos problemas após a troca de um nó. O problema está relacionado à geração de tokens em nós diferentes antes e depois da troca, e a dificuldades no acesso a determinados certificados necessários para a validação dos tokens. Uma solução está disponível (para as versões 2022 R3 a 2023 R2, consulte o artigo da base de conhecimento Milestone ).

O problema foi resolvido na Milestone 2023 R3.

### 18. Testando {#18-testing}

  * Pare o nó PRIM rolando para baixo no menu de contexto e clicando em Parar. ** Não use swap para um primeiro teste ** (veja o motivo abaixo).
  * Verifique se há um failover no SEGUNDO nó, que deve ficar SOZINHO (verde).
  * E com o Console de Gerenciamento (MMC) Microsoft , verifique o failover dos serviços (parados no nó 1 no script `stop_prim` e iniciados no nó 2 no script `start_prim` ).


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se o seu sistema for PRIM-SECOND e tudo estiver funcionando corretamente, pare o nó PRIM e verifique se tudo está funcionando corretamente no nó 2, que se tornará o nó ISOLADO. Se tudo estiver correto, inicie o nó 1, o que ressincronizará os diretórios replicados do nó 2.

Se algo der errado, pare o nó 2 e force o início do nó 1 como primário, que será reiniciado com seus dados íntegros locais no momento da parada.

A troca envolve uma parada e inicialização do PRIM, que ressincronizará os dados do nó 2 imediatamente após a sua parada, não deixando nenhuma chance de reinicialização com dados íntegros caso haja um problema de configuração de replicação.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Se o aplicativo não for iniciado no nó 2 enquanto o estado for ALONE (verde), verifique as mensagens de saída do script `start_prim` no Log de Aplicativos do nó 2.


![ Aviso ](/wp-content/uploads/2022/07/warning-small.png)


Caso o nível ALONE (verde) não seja alcançado, analise o motivo com o Log do Módulo do nó 2.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Mais informações sobre testes podem ser encontradas no Guia do Usuário.


![ Pare o módulo no servidor PRIM ](/wp-content/uploads/2022/07/appli-19.png)