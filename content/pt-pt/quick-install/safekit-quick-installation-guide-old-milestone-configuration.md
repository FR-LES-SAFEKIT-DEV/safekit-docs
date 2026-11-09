---
title: "Configuração antiga SafeKit Milestone"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "pt-pt"
topics: "Antiga configuração passo a passo da solução SafeKit/Milestone XProtect"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Configuração antiga SafeKit Milestone {#old-safekit-milestone-configuration}

## Antiga configuração passo a passo da solução SafeKit/Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Tenha cuidado, são necessários alguns passos específicos para configurar o endereço IP virtual, caso contrário, a função de failover não funcionará.

### 1. Inicie a consola SafeKit {#1-launch-the-safekit-console}

  * Inicie a consola web num navegador, num dos nós do cluster, ligando-se a `http://localhost:9010`.
  * Introduza `admin` como nome de utilizador e a palavra-passe definida durante a instalação.


Também é possível executar a consola num navegador, numa estação de trabalho externa ao cluster.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


A configuração do SafeKit é feita em ambos os nós a partir de um único navegador.


![Nota](/wp-content/uploads/2022/07/note.png)


Para proteger a consola web, consulte a secção "Proteção da consola web SafeKit no Guia do Utilizador.


![Inicie a consola web SafeKit para configurar o cluster](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configurar os endereços dos nós {#2-configure-node-addresses}

  * Introduza os endereços IP dos nós.
  * Em seguida, clique em `Apply` para guardar a configuração.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se a cor de fundo node1 ou node2 for vermelha, verifique a conectividade do navegador com ambos os nós e verifique o firewall em ambos os nós para resolução de problemas.


![Nota](/wp-content/uploads/2022/07/note.png)


Esta operação irá colocar os endereços IP no ficheiro `cluster.xml` em ambos os nós (mais informações na formação com a linha de comandos).


![Introduza os nós do cluster](/wp-content/uploads/2023/01/appli-3.png)


### 3. Escolha o módulo {#3-choose-the-module}

  * No separador Configuração, clique no módulo .safe.


![Nota](/wp-content/uploads/2022/07/note.png)


A consola encontra o xxx.safe no diretório ’Application_Modules/demo/’ do lado do servidor, caso tenha adicionado um módulo lá durante a instalação.


![Escolha o módulo para](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configure o módulo {#4-configure-the-module}

  * Escolha o arranque automático do módulo no arranque sem demora.
  * Normalmente, tem uma única rede heartbeat na qual a replicação é feita. No entanto, pode definir uma rede privada, se necessário.
  * Verifique se os diretórios replicados estão instalados em ambos os nós e se contêm os dados da aplicação.  
A replicação de dados e também de registos é necessária para uma base de dados.  
Pode adicionar novos diretórios replicados conforme necessário.
  * Introduza um endereço IP virtual. Um endereço IP virtual é um endereço IP padrão na mesma rede IP (mesma sub-rede) que os endereços IP de ambos os nós.  
Os clientes da aplicação devem ser configurados com o endereço IP virtual (ou o nome DNS associado ao endereço IP virtual).  
O endereço IP virtual é automaticamente alterado em caso de falha.
  * `start_prim` e `stop_prim` devem conter o início e o fim da aplicação.  
É possível adicionar novos serviços nestes scripts.  
Verifique se os nomes dos serviços nestes scripts são os instalados em ambos os nós, caso contrário, modifique-os nos scripts.
  * Pare os serviços configurados em `start_prim` em ambos os nós.
  * No Windows e em ambos os nós, com o gestor de serviços Windows, defina `Boot Startup Type = Manual` para todos os serviços registados em `start_prim` (SafeKit controla o arranque dos serviços em `start_prim`).


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o SQL estiver no servidor de gestão:

  * As [bases de dados do sistema SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf e mastlog.ldf) devem estar localizadas nos mesmos diretórios em ambos os nós. Os diretórios devem ser configurados como replicados.
  * O SQL também deve ser instalado no mesmo local no sistema de ficheiros em ambos os nós, porque a [base de dados de recursos SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) de apenas leitura está localizada no binário e é necessária para a comutação de falha. Esta base de dados não precisa de ser replicada.
  * As bases de dados SQL Milestone (.mdf e .ldf) devem estar localizadas nos mesmos diretórios em ambos os nós. Os diretórios devem ser configurados como replicados. As bases de dados Milestone são as seguintes, de acordo com este [artigo](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>).


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Tenha em atenção que, se um nome de processo for apresentado no Verificador de Processos, será monitorizado com uma ação de reinicialização em caso de falha. A configuração de um nome de processo incorreto fará com que o módulo pare logo após o seu início.


![Nota](/wp-content/uploads/2022/07/note.png)


O botão "Aplicar" irá reportar a configuração nos ficheiros `userconfig.xml`, `start_prim`, `stop_prim` em ambos os nós (mais informações na formação com a linha de comandos).


![Aceda às definições do módulo](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Verifique se a configuração foi bem-sucedida {#5-verify-successful-configuration}

  * Verifique a mensagem de sucesso (verde) em ambos os nós e clique em Seguinte.


![Verifique o sucesso da configuração do módulo](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Não inicie nada e clique no botão Fechar {#6-do-not-start-anything-and-click-on-the-close-button}


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Não inicie nada nem clique no botão Fechar, pois é necessária uma configuração especial no endereço IP virtual antes de iniciar


![Selecione o nó com os dados mais recentes](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Aceda ao ambiente de trabalho do nó 1 e defina o endereço IP virtual nos ficheiros internos Milestone {#milestone-files}


![Nota](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, este passo não é útil e será feito automaticamente com o " Server Configurator - Registo de servidores - http://virtual-IP" num passo seguinte.

Numa linha de comandos do Powershell, como Administrador, execute este script no nó 1:
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![Nota](/wp-content/uploads/2022/07/note.png)


Este script define o endereço IP virtual em 2 ficheiros internos Milestone:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< IP virtual>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Autoridade": " http://**< IP virtual>**/IDP"


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Nesta etapa, assumimos que o endereço IP virtual foi configurado corretamente nas etapas anteriores (o script utiliza o endereço IP virtual inserido na consola SafeKit e armazenado em `userconfig.xml`).


![Nota](/wp-content/uploads/2022/07/note.png)


### 8. Inicie o nó 1 como primário na consola, o nó com dados atualizados {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Assumimos, a partir do Passo 7, que o nó 1 possui os diretórios replicados atualizados.

Forçar o início do nó 1 como primário. Quando o nó 2 for iniciado, todos os dados do nó 1 serão copiados para o nó 2.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se fizer a escolha errada, corre o risco de sincronizar dados desatualizados em ambos os nós.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Também se assume que a aplicação está parada no nó 1, para que SafeKit instale os mecanismos de replicação e, em seguida, inicie a aplicação no script `start_prim`.


![Forçar o início como primário do nó com os dados mais recentes](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Aguarde a transição para ALONE (verde) {#9-wait-for-the-transition-to-alone-green}

  * O nó 1 deve atingir o estado ALONE (verde), o que significa que o script `start_prim` foi executado no nó 1.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o estado for ALONE (verde) e a aplicação não tiver sido iniciada, verifique as mensagens de saída de `start_prim` no Registo de Aplicações do nó 1.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o nó 1 não atingir o estado ALONE (verde), analise o motivo com o Registo do Módulo do nó 1.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o cluster estiver no estado `WAIT (red) not uptodate - STOP (red) not uptodate`, pare o nó WAIT e force o seu arranque como primário.


![O primeiro nó começa como primário e fica ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. No ambiente de trabalho do nó 1, pare, registe-se no endereço IP virtual e reinicie o Milestone Management Server {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Execute os seguintes pontos no nó 1, de acordo com o menu na imagem:

  * Clique com o botão direito do rato no ícone **Milestone Management Server** na barra de tarefas.
  * **Parar o serviço do servidor de gestão**
  * Em seguida, selecione **Server Configurator ...** e registe o endereço IP virtual.
  * **Iniciar o serviço do servidor de gestão**


![Nota](/wp-content/uploads/2022/07/note.png)


Este procedimento regista o servidor de gestão do nó 1 na base de dados SQL (em execução no nó 1) através de uma ligação ao endereço virtual.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Antes da versão Milestone 2022 R3, o registo pode ter eliminado a configuração do endereço IP virtual nos ficheiros internos Milestone. Neste caso, repita [o Passo 7](#milestone-files).


![Nota](/wp-content/uploads/2022/07/note.png)


Nota: Para registar uma versão anterior Milestone 2020 R2, utilize **a opção Alterar definições de encriptação...**


![Registar o servidor de gestão no Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. No ambiente de trabalho do nó 1 com Milestone Management Client, defina o endereço IP virtual nos URLs para serviços e rede {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![Nota](/wp-content/uploads/2022/07/note.png)


Desde a Milestone 2022 R3, este passo não é útil e é feito automaticamente com o " Server Configurator - Registo de servidores - http://virtual-IP".

De acordo com a imagem:

  1. Inicie o **Milestone XProtect Management Client** no nó 1.
  2. No menu **Ferramentas**, selecione **Serviços Registados**. 
     * Na janela **Adicionar/Remover Serviços Registados**, selecione um serviço na lista e clique em **Editar**.
     * Na janela **Editar Serviço Registado**, altere o endereço URL do serviço para o mesmo endereço URL, mas que contenha o endereço IP virtual.
     * Repita estes passos para todos os serviços listados na janela.
  3. Na mesma janela, clique em **Rede**. 
     * Na janela **de Configuração de Rede**, altere o endereço URL do servidor para o mesmo endereço URL, mas que contenha o endereço IP virtual.


![Defina o endereço IP virtual nos URLs e no Milestone Management Client](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. No ambiente de trabalho do nó 1, com Milestone Management Client, defina as funções de administrador para garantir uma comutação de contingência correta {#role}


![Nota](/wp-content/uploads/2022/07/note.png)


Se o "Autenticação Windows " Milestone tiver sido configurado com um Active Directory, o nome de utilizador/palavra-passe será recuperado no AD externo no nó secundário após uma falha, pelo que não existe nenhuma configuração especial.

Ao iniciar o Milestone XProtect Management Client, tem de se autenticar com "Autenticação Windows " ou "Autenticação básica" ([clique aqui para ver a captura de ecrã](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

Abra **Milestone XProtect Management Client** e vá para **Segurança / Funções** (ver imagem)

  * Defina o grupo Windows **BUILTIN\Administrators**. Assim, um utilizador administrador no servidor secundário poderá ligar-se ao Milestone no servidor secundário com "autenticação Windows ".
  * Crie um utilizador com "Autenticação básica" (**Admin** na imagem) para garantir que se reautentica no nó secundário após uma falha. Para "Autenticação básica", o nome de utilizador/palavra-passe é armazenado na base de dados SQL e será recuperado no nó secundário após uma falha.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Ao definir o grupo BUILTIN\Administrators, poderá autenticar-se no nó secundário com um administrador local Windows.

Caso contrário, não será possível autenticar com uma conta local Windows no servidor secundário após uma falha.

É porque o grupo BUILTIN\Administrators tem o mesmo SID em ambos os nós. Para outros grupos locais ou utilizadores locais, a autenticação não será possível no secundário porque os SIDs são diferentes entre ambos os nós, mesmo que tenham o mesmo nome.


![Definir funções no Management Client Milestone](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Aceda ao ambiente de trabalho do nó 2 e defina o endereço IP virtual nos ficheiros internos Milestone {#milestone-files-2}


![Nota](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, este passo não é útil e será feito automaticamente com o " Server Configurator - Registo de servidores - http://virtual-IP" num passo seguinte.

Numa linha de comandos do Powershell, como Administrador, execute este script no nó 2:
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![Nota](/wp-content/uploads/2022/07/note.png)


Este script define o endereço IP virtual em 2 ficheiros internos Milestone:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< IP virtual>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Autoridade": " http://**< IP virtual>**/IDP"

### 14. No ambiente de trabalho do nó 2, registe o servidor de gestão no endereço IP virtual {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Selecione **Server Configurator** na barra de tarefas do nó 2 e registe-o no endereço IP virtual (ver imagem).
  * Em seguida, **pare o serviço do servidor de gestão**.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


A conta do utilizador que executa o registo no nó 2 deve ter a função de administrador no Milestone no nó 1.

Se for o administrador local no nó 2 que efetua o registo, o grupo incorporado Windows `BUILTIN\Administrators` deve ter sido definido em Management Client / Segurança / Funções no [Passo 12](#role) Caso contrário, o registo não funcionará.


![Nota](/wp-content/uploads/2022/07/note.png)


Este procedimento regista o servidor de gestão do nó 2 na base de dados SQL (em execução no nó 1) através de uma ligação ao endereço virtual.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Com uma versão do Milestone anterior a 2022 R3, o registo pode ter eliminado a configuração do endereço IP virtual nos ficheiros internos Milestone. Neste caso, repita [o Passo 13](#milestone-files-2).


![Registar o servidor de gestão no Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Iniciar nó 2 {#15-start-node-2}

  * Inicie o nó 2 com o seu menu contextual.
  * Aguarde o SECOND estado (verde).


![Nota](/wp-content/uploads/2022/07/note.png)


O nó 2 permanece no SECOND estado (magenta) enquanto resincroniza os diretórios replicados (cópia do nó 1 para o nó 2).

Isto pode demorar algum tempo, dependendo do tamanho dos ficheiros a resincronizar nos diretórios replicados e da largura de banda da rede.

Para ver o progresso da cópia, consulte o Registo do Módulo do nó 2 com a opção detalhada, sem esquecer de atualizar a janela.


![O primeiro nó começa como primário e fica ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. Verifique se o cluster está operacional {#16-verify-that-the-cluster-is-operational}

  * Verifique se o cluster está verde/verde com os serviços a serem executados no nó PRIM e não no nó SECOND.


Apenas as alterações dentro dos ficheiros são replicadas em tempo real neste estado.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Os componentes que são clientes de serviços devem ser configurados com o endereço IP virtual. A configuração pode ser feita com um nome DNS (se um nome DNS tiver sido criado e associado ao endereço IP virtual).


![O segundo nó começa como SECOND](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configure o endereço IP virtual nos servidores de gravação {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Instale os servidores de gravação, especificando o endereço IP virtual no URL de instalação.
  * Ou, no lado dos servidores de gravação, defina o endereço IP virtual nos seguintes campos de 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Ligue o Milestone Management Client e o Milestone Smart Client ao endereço IP virtual.


### 18. Management Client e Smart Client não estão a funcionar corretamente após a mudança de nó {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

Numa configuração em cluster XProtect Management Server, Smart Client e Management Client apresentam vários problemas após uma mudança de nó. O problema está relacionado com tokens gerados em nós diferentes antes e depois da mudança de nó, e com problemas de acesso a determinados certificados necessários para a validação de tokens. Uma solução está disponível (para as versões 2022 R3 a 2023 R2, consulte a Base de Conhecimento Milestone).

O problema foi resolvido na Milestone 2023 R3.

### 18. Testes {#18-testing}

  * Pare o nó PRIM, percorrendo o menu contextual e clicando em Parar. **Não utilize a memória virtual para um primeiro teste** (veja o porquê abaixo).
  * Verifique se existe um failover no SECOND nó, que deverá ficar ALONE (verde).
  * E com Microsoft Management Console (MMC), verifique a redundância dos serviços (parados no nó 1 no script `stop_prim` e iniciados no nó 2 no script `start_prim`).


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o seu sistema for PRIM-SECOND e tudo estiver a funcionar corretamente, execute uma paragem no PRIM e verifique se tudo está a funcionar corretamente no node2, que fica ALONE. Se tudo estiver bem, inicie um arranque no node1, que irá ressincronizar os diretórios replicados do node2.

Se as coisas correrem mal, pare node2 e force o arranque do node1 como primário, que será reiniciado com os seus dados localmente íntegros no momento da paragem.

A troca envolve uma paragem e reinício do PRIM, que irá ressincronizar os dados do node2 imediatamente após a sua paragem, não deixando qualquer hipótese de reinício com dados íntegros caso exista um problema de configuração de replicação.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se a aplicação não for iniciada no nó 2 enquanto o estado for ALONE (verde), verifique as mensagens de saída do script `start_prim` no Registo de Aplicações do nó 2.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se ALONE (verde) não for atingido, analise o motivo com o Registo do Módulo do nó 2.


![Nota](/wp-content/uploads/2022/07/note.png)


Mais informações sobre os testes no Guia do Utilizador


![Parar o módulo no servidor PRIM](/wp-content/uploads/2022/07/appli-19.png)