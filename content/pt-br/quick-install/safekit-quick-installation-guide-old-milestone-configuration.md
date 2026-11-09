---
title: "Configuração antiga SafeKit Milestone"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "pt-br"
topics: "Configuração antiga passo a passo da solução SafeKit/Milestone XProtect"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Configuração antiga SafeKit Milestone {#old-safekit-milestone-configuration}

## Configuração antiga passo a passo da solução SafeKit/Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Tenha cuidado, algumas etapas específicas são necessárias para configurar o endereço IP virtual, caso contrário, o failover não funcionará.

### 1. Inicie o console SafeKit {#1-launch-the-safekit-console}

  * Inicie o console da web em um navegador em um nó do cluster, conectando-se a `http://localhost:9010`.
  * Insira `admin` como nome de usuário e a senha definida durante a instalação.


Você também pode executar o console em um navegador em uma estação de trabalho externa ao cluster.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


A configuração do SafeKit é feita em ambos os nós a partir de um único navegador.


![Observação](/wp-content/uploads/2022/07/note.png)


Para proteger o console da web, consulte a seção "Protegendo o console da web SafeKit no Guia do Usuário.


![Inicie o console web SafeKit para configurar o cluster](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configurar endereços de nós {#2-configure-node-addresses}

  * Insira os endereços IP dos nós.
  * Em seguida, clique em `Apply` para salvar a configuração.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se a cor de fundo node1 ou node2 for vermelha, verifique a conectividade do navegador com ambos os nós e verifique o firewall em ambos os nós para solucionar problemas.


![Observação](/wp-content/uploads/2022/07/note.png)


Esta operação colocará os endereços IP no arquivo `cluster.xml` em ambos os nós (mais informações no treinamento com a linha de comando).


![Insira os nós do cluster](/wp-content/uploads/2023/01/appli-3.png)


### 3. Escolha o módulo {#3-choose-the-module}

  * Na guia Configuração, clique no módulo .safe.


![Observação](/wp-content/uploads/2022/07/note.png)


O console encontra xxx.safe no diretório ’Application_Modules/demo/’ no lado do servidor se você tiver descartado um módulo lá durante a instalação.


![Escolha o módulo para](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configure o módulo {#4-configure-the-module}

  * Escolha o início automático do módulo na inicialização, sem atrasos.
  * Normalmente, você tem uma única rede heartbeat na qual a replicação é feita. Mas, você pode definir uma rede privada, se necessário.
  * Verifique se os diretórios replicados estão instalados em ambos os nós e se contêm os dados da aplicação.  
A replicação de dados e também de logs é necessária para um banco de dados.  
Você pode adicionar novos diretórios replicados conforme a necessidade.
  * Insira um endereço IP virtual. Um endereço IP virtual é um endereço IP padrão na mesma rede IP (mesma sub-rede) que os endereços IP de ambos os nós.  
Os clientes da aplicação devem ser configurados com o endereço IP virtual (ou o nome DNS associado ao endereço IP virtual).  
O endereço IP virtual é alterado automaticamente em caso de falha.
  * `start_prim` e `stop_prim` devem conter o início e o fim da aplicação.  
Você pode adicionar novos serviços nesses scripts.  
Verifique se os nomes dos serviços nesses scripts são os mesmos instalados em ambos os nós; caso contrário, modifique-os nos scripts.
  * Pare os serviços configurados em `start_prim` em ambos os nós.
  * No Windows e em ambos os nós, com o gerenciador de serviços Windows, defina `Boot Startup Type = Manual` para todos os serviços registrados em `start_prim` (SafeKit controla o início dos serviços em `start_prim`).


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o SQL estiver no servidor de gerenciamento:

  * Os [bancos de dados do sistema SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (como master.mdf e mastlog.ldf) devem estar localizados nos mesmos diretórios em ambos os nós. Os diretórios devem ser configurados como replicados.
  * O SQL também deve ser instalado no mesmo local no sistema de arquivos em ambos os nós, porque o [banco de dados de recursos SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) somente leitura está localizado no binário e é necessário para o failover. Este banco de dados não precisa ser replicado.
  * Os bancos de dados SQL Milestone (.mdf e .ldf) devem estar localizados nos mesmos diretórios em ambos os nós. Os diretórios devem ser configurados como replicados. Os bancos de dados Milestone são os seguintes, de acordo com este [artigo](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>).


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Observe que, se um nome de processo for exibido no Verificador de Processos, ele será monitorado com uma ação de reinicialização em caso de falha. A configuração de um nome de processo incorreto fará com que o módulo pare logo após o seu início.


![Observação](/wp-content/uploads/2022/07/note.png)


O botão "Aplicar" reportará a configuração nos arquivos `userconfig.xml`, `start_prim`, `stop_prim` em ambos os nós (mais informações no treinamento com a linha de comando).


![Acesse as configurações do módulo](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Verifique se a configuração foi bem-sucedida {#5-verify-successful-configuration}

  * Verifique a mensagem de sucesso (verde) em ambos os nós e clique em Avançar.


![Verifique o sucesso da configuração do módulo](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Não inicie nada e clique no botão Fechar {#6-do-not-start-anything-and-click-on-the-close-button}


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Não inicie nada e clique no botão Fechar, pois é necessária uma configuração especial no endereço IP virtual antes de iniciar


![Selecione o nó com os dados atualizados](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Acesse o desktop do nó 1 e defina o endereço IP virtual nos arquivos internos Milestone {#milestone-files}


![Observação](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, esta etapa não é útil e será feita automaticamente com o " Server Configurator - Registrando servidores - http://virtual-IP" em uma próxima etapa.

Em uma linha de comando do Powershell como Administrador, execute este script no nó 1:
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![Observação](/wp-content/uploads/2022/07/note.png)


Este script define o endereço IP virtual em 2 arquivos internos Milestone:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< virtual-ip>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< virtual-ip>**/IDP"


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Nesta etapa, assumimos que o endereço IP virtual foi configurado corretamente nas etapas anteriores (o script usa o endereço IP virtual inserido no console SafeKit e armazenado em `userconfig.xml`).


![Observação](/wp-content/uploads/2022/07/note.png)


### 8. Inicie o nó 1 como primário no console, o nó com dados atualizados {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

A partir da Etapa 7, assumimos que o nó 1 possui os diretórios replicados atualizados.

Forçar o início do nó 1 como primário. Quando o nó 2 for iniciado, todos os dados do nó 1 serão copiados para o nó 2.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se você fizer a escolha errada, corre o risco de sincronizar dados desatualizados em ambos os nós.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Também se presume que o aplicativo esteja parado no nó 1 para que SafeKit instale os mecanismos de replicação e, em seguida, inicie o aplicativo no script `start_prim`.


![Forçar o início como primário do nó com os dados atualizados](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Aguarde a transição para ALONE (verde) {#9-wait-for-the-transition-to-alone-green}

  * O nó 1 deve atingir o estado ALONE (verde), o que significa que o script `start_prim` foi executado no nó 1.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o status for ALONE (verde) e o aplicativo não for iniciado, verifique as mensagens de saída de `start_prim` no Log de Aplicativos do nó 1.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o nó 1 não atingir o estado ALONE (verde), analise o motivo com o Log do Módulo do nó 1.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o cluster estiver no estado `WAIT (red) not uptodate - STOP (red) not uptodate`, pare o nó WAIT e force o seu início como primário.


![O primeiro nó começa como primário e fica ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. No desktop do nó 1, pare, registre no endereço IP virtual e reinicie o Servidor de Gerenciamento Milestone {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Execute os seguintes itens no nó 1 de acordo com o menu da imagem:

  * Clique com o botão direito do mouse no ícone **Milestone Management Server** na barra de tarefas.
  * **Parar o serviço do servidor de gerenciamento**
  * Em seguida, escolha **Server Configurator ...** e registre o endereço IP virtual.
  * **Iniciar o serviço do servidor de gerenciamento**


![Observação](/wp-content/uploads/2022/07/note.png)


Este procedimento registra o servidor de gerenciamento do nó 1 no banco de dados SQL (em execução no nó 1) por meio de uma conexão com o endereço virtual.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Antes da versão Milestone 2022 R3, o registro pode ter excluído a configuração do endereço IP virtual nos arquivos internos Milestone. Nesse caso, repita [a Etapa 7](#milestone-files).


![Observação](/wp-content/uploads/2022/07/note.png)


Observação: Para registrar uma versão anterior Milestone 2020 R2, use **Alterar configurações de criptografia...**


![Registar o servidor de gestão no Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. No desktop do nó 1 com Milestone Management Client, defina o endereço IP virtual nos URLs para serviços e rede {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![Observação](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, esta etapa não é útil e foi feita automaticamente com o " Server Configurator - Registrando servidores - http://virtual-IP".

De acordo com a imagem:

  1. Inicie o **Milestone XProtect Management Client** no nó 1.
  2. No menu **Ferramentas**, selecione **Serviços Registrados**. 
     * Na janela **Adicionar/Remover Serviços Registrados**, selecione um serviço na lista e clique em **Editar**.
     * Na janela **Editar Serviço Registrado**, altere o endereço URL do serviço para o mesmo endereço URL, mas contendo o endereço IP virtual.
     * Repita esses passos para todos os serviços listados na janela.
  3. Na mesma janela, clique em **Rede**. 
     * Na janela **Configuração de Rede**, altere o endereço URL do servidor para o mesmo endereço URL, mas contendo o endereço IP virtual.


![Defina o endereço IP virtual nos URLs e no Milestone Management Client](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. No desktop do nó 1 com Milestone Management Client, defina as funções de administrador para garantir um failover correto {#role}


![Observação](/wp-content/uploads/2022/07/note.png)


Se o "Autenticação Windows " Milestone tiver sido configurado com um Active Directory, o usuário/senha será recuperado no AD externo no nó secundário após um failover, portanto, não há configuração especial.

Ao iniciar o Milestone XProtect Management Client, você deve se autenticar com "Autenticação Windows " ou "Autenticação básica" ([clique aqui para ver a captura de tela](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

Abra **Milestone XProtect Management Client** e vá em **Segurança / Funções** (veja a imagem)

  * Defina o grupo Windows **BUILTIN\Administrators**. Assim, um usuário administrador no secundário poderá se conectar ao Milestone no secundário com a "autenticação Windows ".
  * Crie um usuário com "Autenticação básica" (**Admin** na imagem) para garantir a reautenticação no nó secundário após uma falha. Para "Autenticação básica", o usuário/senha é armazenado no banco de dados SQL e será recuperado no nó secundário após uma falha.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Ao definir o grupo BUILTIN\Administrators, você poderá se autenticar no nó secundário com um administrador local Windows.

Caso contrário, nenhuma autenticação será possível com uma conta local Windows no servidor secundário após uma falha.

Isso ocorre porque o grupo BUILTIN\Administrators tem o mesmo SID em ambos os nós. Para outros grupos locais ou usuários locais, a autenticação não será possível no secundário porque os SIDs são diferentes entre os dois nós, mesmo que tenham o mesmo nome.


![Definir funções no Management Client Milestone](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Acesse o desktop do nó 2 e defina o endereço IP virtual nos arquivos internos Milestone {#milestone-files-2}


![Observação](/wp-content/uploads/2022/07/note.png)


Desde Milestone 2022 R3, esta etapa não é útil e será feita automaticamente com o " Server Configurator - Registrando servidores - http://virtual-IP" em uma próxima etapa.

Em uma linha de comando do Powershell como Administrador, execute este script no nó 2:
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![Observação](/wp-content/uploads/2022/07/note.png)


Este script define o endereço IP virtual em 2 arquivos internos Milestone:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< virtual-ip>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< virtual-ip>**/IDP"

### 14. No desktop do nó 2, registre o servidor de gerenciamento no endereço IP virtual {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Escolha **Server Configurator** na barra de tarefas do nó 2 e registre-o no endereço IP virtual (veja a imagem).
  * Em seguida, **pare o serviço do servidor de gerenciamento**.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


A conta do usuário que executa o registro no nó 2 deve ter a função de administrador no Milestone no nó 1.

Se o administrador local no nó 2 fizer o registro, o grupo interno Windows `BUILTIN\Administrators` deve ter sido definido em Management Client / Segurança / Funções na [Etapa 12](#role) Caso contrário, o registro não funcionará.


![Observação](/wp-content/uploads/2022/07/note.png)


Este procedimento registra o servidor de gerenciamento do nó 2 no banco de dados SQL (em execução no nó 1) por meio de uma conexão com o endereço virtual.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Com uma versão do Milestone anterior a 2022 R3, o registro pode ter excluído a configuração do endereço IP virtual nos arquivos internos Milestone. Nesse caso, repita [a Etapa 13](#milestone-files-2).


![Registar o servidor de gestão no Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Iniciar o nó 2 {#15-start-node-2}

  * Inicie o nó 2 com o seu menu de contexto.
  * Aguarde o SECOND estado (verde).


![Observação](/wp-content/uploads/2022/07/note.png)


O nó 2 permanece no SECOND estado (magenta) enquanto resincroniza os diretórios replicados (cópia do nó 1 para o nó 2).

Isso pode levar algum tempo, dependendo do tamanho dos arquivos a serem resincronizados nos diretórios replicados e da largura de banda da rede.

Para ver o progresso da cópia, consulte o Log do Módulo do nó 2 com a opção detalhada, sem esquecer de atualizar a janela.


![O primeiro nó começa como primário e fica ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. Verifique se o cluster está operacional {#16-verify-that-the-cluster-is-operational}

  * Verifique se o cluster está verde/verde com os serviços em execução no nó PRIM e não em execução no nó SECOND.


Apenas as alterações dentro dos arquivos são replicadas em tempo real neste estado.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Os componentes que são clientes de serviços devem ser configurados com o endereço IP virtual. A configuração pode ser feita com um nome DNS (se um nome DNS tiver sido criado e associado ao endereço IP virtual).


![O segundo nó começa como SECOND](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configure o endereço IP virtual nos servidores de gravação {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Instale os servidores de gravação, especificando o endereço IP virtual no URL de instalação.
  * Ou, no lado dos servidores de gravação, defina o endereço IP virtual nos seguintes campos de 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Conecte o Milestone Management Client e o Milestone Smart Client no endereço IP virtual.


### 18. Management Client e Smart Client não estão funcionando corretamente após a troca de nó {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

Em uma configuração de servidor de gerenciamento XProtect em cluster, Smart Client e Management Client apresentam vários problemas após uma troca de nó. O problema está relacionado a tokens gerados em nós diferentes antes e depois da troca de nó, e a problemas de acesso a determinados certificados necessários para a validação de tokens. Uma solução está disponível (para as versões 2022 R3 a 2023 R2, consulte a Base de Conhecimento Milestone).

O problema foi resolvido na Milestone 2023 R3.

### 18. Testes {#18-testing}

  * Pare o nó PRIM rolando para baixo no menu contextual e clicando em Parar. **Não use swap para um primeiro teste** (veja o porquê abaixo).
  * Verifique se há um failover no SECOND nó, que deve ficar ALONE (verde).
  * E com Microsoft Management Console (MMC), verifique o failover dos serviços (parados no nó 1 no script `stop_prim` e iniciados no nó 2 no script `start_prim`).


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o seu sistema for PRIM-SECOND e tudo estiver funcionando corretamente, execute uma parada no PRIM e verifique se tudo está funcionando corretamente no node2, que se torna ALONE. Se tudo estiver bem, inicie uma partida no node1, que irá resincronizar os diretórios replicados do node2.

Se as coisas derem errado, pare node2 e force o início como primário do node1, que será reiniciado com seus dados localmente íntegros no momento da parada.

A troca envolve uma parada e reinicialização do PRIM, que resincronizará os dados do node2 imediatamente após sua parada, não deixando chance para uma reinicialização em dados íntegros se houver um problema de configuração de replicação.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se o aplicativo não for iniciado no nó 2 enquanto o estado for ALONE (verde), verifique as mensagens de saída do script `start_prim` no Log de Aplicativos do nó 2.


![Aviso](/wp-content/uploads/2022/07/warning-small.png)


Se ALONE (verde) não for atingido, analise o motivo com o Log do Módulo do nó 2.


![Observação](/wp-content/uploads/2022/07/note.png)


Mais informações sobre os testes no Guia do Usuário


![Pare o módulo no servidor PRIM](/wp-content/uploads/2022/07/appli-19.png)