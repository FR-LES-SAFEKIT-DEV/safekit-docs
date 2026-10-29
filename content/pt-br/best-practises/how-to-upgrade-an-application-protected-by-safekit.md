---
title: "Atualizando um aplicativo protegido por SafeKit em um cluster de alta disponibilidade."
canonical: "https://safekit.eviden.com/pt-br/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Aprenda como atualizar com segurança aplicativos protegidos por SafeKit . Compare atualizações menores e maiores, atualizações contínuas, estratégias de reversão e alta disponibilidade baseada em máquinas virtuais."
category: "best-practises"
lang: "pt-br"
topics: "Atualizando um aplicativo de alta disponibilidade protegido por SafeKit , Alta disponibilidade em nível de VM, Alta disponibilidade em nível de aplicativo, Escolhendo a estratégia de atualização correta, Conclusão, 🔍 Hub de navegação de alta disponibilidade SafeKit"
---

# Atualizando um aplicativo protegido por SafeKit em um cluster HA {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Atualizando um aplicativo de alta disponibilidade protegido por SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Manter os aplicativos críticos para os negócios atualizados é essencial para a segurança, o desempenho e o acesso a novos recursos. Quando um aplicativo é protegido por SafeKit , o procedimento de atualização depende da arquitetura de alta disponibilidade em uso.

Existem dois modelos de implantação comuns:

  * **Alta disponibilidade de máquina virtual** , onde o aplicativo é executado dentro de uma máquina virtual protegida e gerenciada por SafeKit .
  * **Alta disponibilidade em nível de aplicação** , onde a aplicação está instalada em dois servidores.


Cada modelo oferece diferentes mecanismos de atualização e estratégias de reversão.

## Alta disponibilidade em nível de VM {#vm-level-ha}

Com soluções de failover de VM SafeKit , como **hyperv.safe** e **kvm.safe** , o aplicativo é instalado apenas uma vez dentro de uma máquina virtual.

SafeKit protege toda a máquina virtual em vez do próprio aplicativo, o que simplifica significativamente as operações de manutenção.

### Processo de atualização simplificado {#simplified-upgrade-process}

Como você está trabalhando com uma única instância de máquina virtual do aplicativo, a manutenção é gerenciada na camada de virtualização, em vez de por meio de failover no nível do aplicativo.

O procedimento de atualização é simples:

  1. Crie um ponto de verificação ou um instantâneo da máquina virtual usando o console de gerenciamento do Hyper-V ou do KVM.
  2. Execute a atualização do aplicativo dentro da máquina virtual.
  3. Valide o aplicativo atualizado.
  4. Se a atualização for bem-sucedida, remova o snapshot e continue a operação normal.
  5. Caso ocorra algum problema, restaure a máquina virtual a partir do snapshot e retorne imediatamente ao estado de funcionamento anterior conhecido.


A interrupção do serviço é limitada à duração normalmente exigida pelo procedimento de atualização do próprio aplicativo.

### Benefícios da proteção em nível de VM {#benefits-of-vm-level-protection}

  * Apenas uma instância do aplicativo para manter.
  * Não existe um procedimento de atualização com reconhecimento de cluster.
  * Reversão rápida através de snapshots de máquinas virtuais.
  * Complexidade operacional reduzida.
  * Processo de atualização consistente, independentemente da aplicação protegida.


Essa abordagem é particularmente atraente para aplicativos empacotados e softwares comerciais prontos para uso, onde o agrupamento de aplicativos não está disponível ou é difícil de implementar.

## Alta disponibilidade em nível de aplicação {#app-level-ha}

Em um cluster SafeKit tradicional, o aplicativo é instalado em dois nós: nó 1 e nó 2. SafeKit sincroniza os dados do aplicativo entre esses nós e lida automaticamente com o failover, se necessário.

### Atualização de aplicativo menor {#app-level-ha-minor}

Uma atualização menor modifica apenas os binários do aplicativo, mantendo os dados replicados totalmente compatíveis entre as versões. Como o formato dos dados replicados não muda, SafeKit suporta uma atualização gradual com tempo de inatividade mínimo. 

  1. Inicialmente, o cluster é executado em uma configuração **✅ PRIM (nó 1) / ✅ SECOND (nó 2)** . O aplicativo é executado no nó PRIM e os dados replicados são continuamente sincronizados com o nó SECOND. 
  2. Pare o módulo SafeKit no SEGUNDO nó ( **❌ STOP (nó 2)** ), atualize o aplicativo e reinicie o módulo. Durante esta operação, o aplicativo continua a ser executado no **✅ SOZINHO (nó 1)** e nenhuma interrupção de serviço ocorre. 
  3. Após a reinicialização, o nó atualizado se junta novamente ao cluster como **✅ SECOND (nó 2)** e resincroniza os dados replicados. 
  4. Pare o nó PRIM ( **❌ STOP (nó 1)** ). SafeKit realiza automaticamente um failover e o nó atualizado torna-se **✅ ALONE (nó 2)** . O aplicativo é reiniciado neste nó. O tempo de inatividade é limitado ao tempo de failover e reinicialização do aplicativo. 
  5. Se o aplicativo atualizado funcionar corretamente no estado ALONE, atualize o nó restante (nó 1) e reinicie seu módulo SafeKit . 
  6. Após a resincronização, o cluster retorna à configuração normal **✅ SECOND (nó 1) / ✅ PRIM (nó 2)** . As funções originais podem ser restauradas manualmente usando o Console de Administração SafeKit ou automaticamente por meio da configuração SafeKit . 


**Procedimento de reversão**

  * Na etapa 5, pare o nó **✅ SOZINHO (nó 2)** .
  * Forçar o nó original (nó 1) a iniciar como primário **SOZINHO (nó 1)** com a versão anterior do aplicativo.
  * Reinstale a versão anterior no nó atualizado (nó 2).
  * Retornar a uma configuração normal **✅ PRIM (nó 1) / ✅ SECOND (nó 2)** .


A atualização completa é realizada com tempo de inatividade limitado à transição de **✅ PRIM / ✅ SECOND** para **❌ STOP / ✅ ALONE** . 

### Atualização importante do aplicativo {#app-level-ha-major}

Uma atualização importante altera o formato ou a estrutura dos dados replicados. Como os dados gerados pela nova versão não são mais compatíveis com a versão antiga, uma atualização gradual não pode ser realizada. 

  1. Inicialmente, o cluster é executado em uma configuração **✅ PRIM (nó 1) / ✅ SECOND (nó 2)** . 
  2. Pare o SEGUNDO nó e depois o nó PRIM. O cluster transita para **❌ STOP (nó 1) / ❌ STOP (nó 2)** . 
  3. Atualize o nó PRIM anterior e reinicie-o. O nó inicia sozinho como **✅ ALONE (nó 1)** com a nova versão do aplicativo. 
  4. Valide o aplicativo atualizado e verifique se ele funciona corretamente. 
  5. Se a validação for bem-sucedida, atualize o nó restante e reinicie o módulo SafeKit . 
  6. O nó atualizado torna-se **✅ SECOND (nó 2)** , resincroniza os dados do aplicativo e o cluster retorna a uma configuração normal **✅ PRIM (nó 1) / ✅ SECOND (nó 2)** . 


**Procedimento de reversão**

  * Na etapa 5, pare o nó **✅ ALONE (nó 1)** atualizado.
  * Forçar o nó não atualizado a iniciar como primário **✅ SOZINHO (nó 2)** .
  * Reinstale a versão anterior do aplicativo no nó atualizado.
  * Restaurar a configuração original **✅ SECOND (nó 1) / ✅ PRIM (nó 2)** .


Como os dados replicados são modificados durante a migração, o tempo de inatividade corresponde ao período entre o estado **❌ STOP / ❌ STOP** e a reinicialização do primeiro nó atualizado como **✅ ALONE** . 

### Por que SafeKit simplifica as atualizações de aplicativos {#why-safekit-simplifies-application-upgrades}

SafeKit minimiza o risco operacional, permitindo que os administradores:

  * Atualize um nó de cada vez.
  * Manter a disponibilidade do serviço sempre que possível.
  * Valide as novas versões antes de direcionar o tráfego de produção.
  * Reverta rapidamente para o nó anterior caso sejam detectados problemas inesperados.


## Escolhendo a estratégia de atualização correta {#choosing-the-right-upgrade-strategy}

Modelo de Implantação | Instâncias de Aplicativo | Impacto nos Dados Replicados | Abordagem de Atualização  
---|---|---|---  
Alta disponibilidade em nível de aplicação | Dois nós | Depende do tipo de atualização | Atualização contínua com failover  
Alta disponibilidade em nível de VM ( hyperv.safe / kvm.safe ) | Uma VM | Gerenciado dentro da VM | Snapshot, atualização, validação e reversão, se necessário  
  
## Conclusão {#conclusion}

SafeKit oferece arquiteturas flexíveis de alta disponibilidade que se adaptam aos requisitos operacionais de diferentes aplicações. Seja para proteger uma aplicação em cluster distribuída em dois nós ou uma única instância de aplicação executada em uma máquina virtual, SafeKit permite atualizações controladas, minimiza o tempo de inatividade e oferece opções de recuperação confiáveis sempre que forem necessárias operações de manutenção.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}