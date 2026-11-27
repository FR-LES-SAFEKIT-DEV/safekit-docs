---
title: "Atualizando um aplicativo protegido pelo SafeKit em um cluster de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-br/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Como atualizar uma aplicação protegida pelo SafeKit: atualizações menores e maiores, atualizações contínuas, opções de rollback e a abordagem HA de VM."
category: "best-practises"
lang: "pt-br"
topics: "Atualizando um aplicativo de alta disponibilidade protegido pelo SafeKit, Alta Disponibilidade em Nível de Máquina Virtual, Alta Disponibilidade em Nível de Aplicação, Escolhendo a Estratégia de Atualização Certa, Conclusão"
hashpart: "upgrading-a-high-availability-application-protected-by-safekit, vm-level-ha, app-level-ha, choosing-the-right-upgrade-strategy, conclusion"
translation: "translate_md 2026-11-20.1 | glossaire 2026-11-20.3 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
schemaType: "TechArticle"
---

# Atualizando um aplicativo protegido pelo SafeKit em um cluster de alta disponibilidade {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Atualizando um aplicativo de alta disponibilidade protegido pelo SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Manter os aplicativos essenciais para os negócios atualizados é fundamental para a segurança, o desempenho e o acesso a novos recursos. Quando um aplicativo é protegido pelo SafeKit, o procedimento de atualização depende da arquitetura de alta disponibilidade em uso.

Existem dois modelos de implantação comuns:

  * **Alta Disponibilidade de Máquina Virtual**, onde a aplicação é executada dentro de uma máquina virtual protegida e gerenciada pelo SafeKit.
  * **Alta disponibilidade em nível de aplicativo**, em que o aplicativo é instalado em dois servidores.


Cada modelo oferece diferentes mecanismos de atualização e estratégias de reversão.

## Alta Disponibilidade em Nível de Máquina Virtual {#vm-level-ha}

Com as soluções failover de VM SafeKit, como **hyperv.safe** e **kvm.safe**, o aplicativo é instalado apenas uma vez dentro de uma máquina virtual.

SafeKit protege a máquina virtual inteira, não o aplicativo em si. Isso simplifica significativamente as operações de manutenção.

### Processo de atualização simplificado {#simplified-upgrade-process}

Como você está trabalhando com uma única instância de VM do aplicativo, a manutenção é tratada na camada de virtualização, em vez de por meio failover no nível do aplicativo.

O procedimento de atualização é simples:

  1. Crie um ponto de verificação ou um instantâneo da máquina virtual usando o console de gerenciamento Hyper-V ou KVM.
  2. Realize a atualização do aplicativo dentro da máquina virtual.
  3. Valide o aplicativo atualizado.
  4. Se a atualização for bem-sucedida, remova o snapshot e continue a operação normal.
  5. Se ocorrer um problema, restaure a máquina virtual a partir do snapshot e retorne imediatamente ao estado de funcionamento anterior conhecido.


A interrupção do serviço é limitada à duração normalmente exigida pelo próprio procedimento de atualização do aplicativo.

### Benefícios da Proteção em Nível de Máquina Virtual {#benefits-of-vm-level-protection}

  * Apenas uma instância do aplicativo para manter.
  * Não há procedimento de atualização específico para o cluster.
  * Reversão rápida por meio de snapshots de máquinas virtuais.
  * Complexidade operacional reduzida.
  * Processo de atualização consistente, independentemente da aplicação protegida.


Essa abordagem é particularmente atraente para aplicativos empacotados e softwares comerciais prontos para uso, onde o agrupamento de aplicativos não está disponível ou é difícil de implementar.

## Alta Disponibilidade em Nível de Aplicação {#app-level-ha}

Em um cluster SafeKit tradicional, o aplicativo é instalado em dois nós: nó 1 e nó 2. SafeKit sincroniza os dados do aplicativo entre esses nós e lida automaticamente com failover se necessário.

### Atualização de versão secundária do aplicativo {#app-level-ha-minor}

Uma atualização menor modifica apenas os binários do aplicativo, mantendo os dados replicados totalmente compatíveis entre as versões. Como o formato dos dados replicados não muda, SafeKit suporta uma atualização contínua com tempo de inatividade mínimo. 

  1. O cluster é executado inicialmente em uma configuração **✅ PRIM (nó 1) / ✅ SECOND (nó 2)**. O aplicativo é executado no nó PRIM. Os dados replicados são continuamente sincronizados com o nó SECOND.
  2. Pare o módulo SafeKit no nó SECOND. Seu estado se torna **❌ STOP (nó 2)**. Atualize o aplicativo e reinicie o módulo. Durante esta operação, o aplicativo continua sendo executado no nó 1, no estado **✅ ALONE (nó 1)**. Não ocorre nenhuma interrupção do serviço.
  3. Após a reinicialização, o nó atualizado volta a fazer parte do cluster como **✅ SECOND (nó 2)**. Ele ressincroniza os dados replicados.
  4. Pare o nó PRIM. Seu estado se torna **❌ STOP (nó 1)**. SafeKit executa automaticamente um failover. O nó atualizado se torna **✅ ALONE (nó 2)**. O aplicativo é reiniciado neste nó. O tempo de inatividade é limitado ao tempo de failover e reinicialização do aplicativo.
  5. Se o aplicativo atualizado funcionar corretamente no nó 2, atualize o nó restante (nó 1) e reinicie o módulo SafeKit.
  6. Após a ressincronização, o cluster retorna a uma configuração normal **✅ SECOND (nó 1) / ✅ PRIM (nó 2)**. As funções originais podem ser restauradas manualmente usando o Console de Administração SafeKit ou automaticamente através da configuração SafeKit.


**Procedimento de reversão**

  * Na etapa 5, pare o nó 2, no estado **✅ ALONE (nó 2)**.
  * Reinicie o nó original (nó 1) como primário, com a versão anterior do aplicativo. Seu estado é **✅ ALONE (nó 1)**.
  * Reinstale a versão anterior no nó atualizado (nó 2).
  * Restaure a configuração normal **✅ PRIM (nó 1) / ✅ SECOND (nó 2)**.


O tempo de inatividade para a atualização completa é limitado à transição de **✅ PRIM/✅ SECOND** para **❌ STOP/✅ ALONE**.

### Atualização da versão principal do aplicativo {#app-level-ha-major}

Uma atualização de versão principal altera o formato ou a estrutura dos dados replicados. Como os dados gerados pela nova versão não são mais compatíveis com a antiga, uma atualização contínua não pode ser realizada.

  1. O cluster é executado inicialmente em uma configuração **✅ PRIM (nó 1) / ✅ SECOND (nó 2)**.
  2. Pare o nó SECOND e, em seguida, o nó PRIM. O cluster transita para **❌ STOP (nó 1) / ❌ STOP (nó 2)**.
  3. Atualize o nó PRIM anterior e reinicie-o. O nó inicia sozinho, com a nova versão do aplicativo. Seu estado é **✅ ALONE (nó 1)**.
  4. Valide o aplicativo atualizado e verifique se ele funciona corretamente.
  5. Se a validação for bem-sucedida, atualize o nó restante e reinicie o módulo SafeKit.
  6. O nó atualizado se torna **✅ SECOND (nó 2)**. Ele ressincroniza os dados do aplicativo. O cluster retorna a uma configuração normal **✅ PRIM (nó 1) / ✅ SECOND (nó 2)**.


**Procedimento de reversão**

  * Na etapa 5, pare o nó 1 atualizado, no estado **✅ ALONE (nó 1)**.
  * Reinicie o nó não atualizado (nó 2) como primário. Seu estado é **✅ ALONE (nó 2)**.
  * Reinstale a versão anterior do aplicativo no nó atualizado.
  * Restaure a configuração original **✅ SECOND (nó 1) / ✅ PRIM (nó 2)**.


Como os dados replicados são modificados durante a migração, o tempo de inatividade corresponde ao período entre o estado **❌ STOP/❌ STOP** e a reinicialização do primeiro nó atualizado como **✅ ALONE**.

### Benefícios do SafeKit para atualizações de aplicativos {#why-safekit-simplifies-application-upgrades}

SafeKit minimiza o risco operacional:

  * Os administradores atualizam um nó de cada vez.
  * SafeKit mantém a disponibilidade do serviço sempre que possível.
  * As novas versões são validadas antes que o tráfego de produção seja alterado.
  * Os administradores podem reverter rapidamente para o nó anterior se forem detectados problemas inesperados.


## Escolhendo a Estratégia de Atualização Certa {#choosing-the-right-upgrade-strategy}

Modelo de Implantação | Instâncias de Aplicação | Impacto dos Dados Replicados | Abordagem de Atualização  
---|---|---|---  
HA em nível de aplicativo | Dois nós | Depende do tipo de atualização | Atualização contínua com failover  
HA em nível de VM com hyperv.safe ou kvm.safe | Uma VM | Gerenciado dentro da VM | Crie um snapshot, atualize, valide e reverta, se necessário  
  
## Conclusão {#conclusion}

SafeKit oferece arquiteturas flexíveis de alta disponibilidade que se adaptam aos requisitos operacionais de diferentes aplicações. Quer você proteja uma aplicação em cluster em dois nós ou uma única instância de aplicação em execução em uma máquina virtual, SafeKit permite atualizações controladas, minimiza o tempo de inatividade e oferece opções de recuperação confiáveis sempre que operações de manutenção são necessárias.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}