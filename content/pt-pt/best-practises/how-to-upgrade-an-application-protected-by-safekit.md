---
title: "Atualização de uma Aplicação Protegida pelo SafeKit num Cluster de Alta Disponibilidade"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Como atualizar uma aplicação protegida pelo SafeKit: atualizações menores e maiores, atualizações progressivas, opções de reversão e a abordagem HA de VM."
category: "best-practises"
lang: "pt-pt"
topics: "Atualização de uma Aplicação de Alta Disponibilidade Protegida pelo SafeKit, Alta Disponibilidade ao Nível da Máquina Virtual, Alta Disponibilidade ao Nível da Aplicação, Escolher a Estratégia de Atualização Certa, Conclusão"
hashpart: "upgrading-a-high-availability-application-protected-by-safekit, vm-level-ha, app-level-ha, choosing-the-right-upgrade-strategy, conclusion"
translation: "translate_md 2026-11-20.1 | glossaire 2026-11-20.3 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
schemaType: "TechArticle"
---

# Atualização de uma Aplicação Protegida pelo SafeKit num Cluster de Alta Disponibilidade {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Atualização de uma Aplicação de Alta Disponibilidade Protegida pelo SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Manter as aplicações críticas para o negócio atualizadas é essencial para a segurança, o desempenho e o acesso a novas funcionalidades. Quando uma aplicação é protegida pelo SafeKit, o procedimento de atualização depende da arquitetura de alta disponibilidade em uso.

Existem dois modelos de implementação comuns:

  * **Alta Disponibilidade de Máquina Virtual**, onde a aplicação é executada dentro de uma máquina virtual protegida gerida pelo SafeKit.
  * **Alta disponibilidade ao nível da aplicação**, em que a aplicação está instalada em dois servidores.


Cada modelo oferece diferentes mecanismos de atualização e estratégias de reversão.

## Alta Disponibilidade ao Nível da Máquina Virtual {#vm-level-ha}

Com as soluções failover de máquinas virtuais SafeKit, como **hyperv.safe** e **kvm.safe**, a aplicação é instalada apenas uma vez dentro de uma máquina virtual.

SafeKit protege a máquina virtual inteira, não a aplicação em si. Isto simplifica significativamente as operações de manutenção.

### Processo de Atualização Simplificado {#simplified-upgrade-process}

Como está a trabalhar com uma única instância de máquina virtual da aplicação, a manutenção é tratada na camada de virtualização, em vez de através de failover ao nível da aplicação.

O procedimento de atualização é simples:

  1. Crie um ponto de controlo ou um instantâneo da máquina virtual utilizando a consola de gestão Hyper-V ou KVM.
  2. Realize a atualização da aplicação dentro da máquina virtual.
  3. Valide a aplicação atualizada.
  4. Se a atualização for bem-sucedida, remova o instantâneo e continue a operação normal.
  5. Se ocorrer um problema, restaure a máquina virtual a partir do instantâneo e retorne imediatamente ao estado de funcionamento anterior conhecido.


A interrupção do serviço está limitada à duração normalmente exigida pelo próprio procedimento de atualização da aplicação.

### Vantagens da Proteção ao Nível da Máquina Virtual {#benefits-of-vm-level-protection}

  * Apenas uma instância da aplicação para manter.
  * Não existe um procedimento de atualização específico para o cluster.
  * Reversão rápida através de instantâneos de máquinas virtuais.
  * Complexidade operacional reduzida.
  * Processo de atualização consistente, independentemente da aplicação protegida.


Esta abordagem é particularmente atraente para aplicações empacotadas e software comercial pronto a usar, onde o agrupamento de aplicações não está disponível ou é difícil de implementar.

## Alta Disponibilidade ao Nível da Aplicação {#app-level-ha}

Num cluster tradicional SafeKit, a aplicação é instalada em dois nós: nó 1 e nó 2. SafeKit sincroniza os dados da aplicação entre estes nós e lida automaticamente com failover se necessário.

### Atualização de versão secundária da aplicação {#app-level-ha-minor}

Uma atualização menor modifica apenas os ficheiros binários da aplicação, mantendo os dados replicados totalmente compatíveis entre versões. Como o formato dos dados replicados não muda, SafeKit suporta uma atualização contínua com tempo de inatividade mínimo. 

  1. O cluster é executado inicialmente numa configuração **✅ PRIM (nó 1) / ✅ SECOND (nó 2)**. A aplicação é executada no nó PRIM. Os dados replicados são continuamente sincronizados com o nó SECOND.
  2. Pare o módulo SafeKit no nó SECOND. O seu estado torna-se **❌ STOP (nó 2)**. Atualize a aplicação e reinicie o módulo. Durante esta operação, a aplicação continua a ser executada no nó 1, no estado **✅ ALONE (nó 1)**. Não ocorre qualquer interrupção do serviço.
  3. Após a reinicialização, o nó atualizado volta a juntar-se ao cluster como **✅ SECOND (nó 2)**. Ele ressincroniza os dados replicados.
  4. Pare o nó PRIM. O seu estado torna-se **❌ STOP (nó 1)**. SafeKit executa automaticamente um failover. O nó atualizado torna-se **✅ ALONE (nó 2)**. A aplicação é reiniciada neste nó. O tempo de inatividade é limitado ao tempo de failover e de reinicialização da aplicação.
  5. Se a aplicação atualizada funcionar corretamente no nó 2, atualize o nó restante (nó 1) e reinicie o seu módulo SafeKit.
  6. Após a ressincronização, o cluster volta a uma configuração normal **✅ SECOND (nó 1) / ✅ PRIM (nó 2)**. As funções originais podem ser restauradas manualmente, utilizando a Consola de Administração SafeKit, ou automaticamente, através da configuração SafeKit.


**Procedimento de reversão**

  * No passo 5, pare o nó 2, no estado **✅ ALONE (nó 2)**.
  * Reinicie o nó original (nó 1) como primário, com a versão anterior da aplicação. O seu estado é **✅ ALONE (nó 1)**.
  * Reinstale a versão anterior no nó atualizado (nó 2).
  * Restaurar a configuração normal **✅ PRIM (nó 1) / ✅ SECOND (nó 2)**.


O tempo de inatividade para a atualização completa está limitado à transição de **✅ PRIM/✅ SECOND** para **❌ STOP/✅ ALONE**.

### Atualização da Versão Principal da Aplicação {#app-level-ha-major}

Uma atualização de versão principal altera o formato ou a estrutura dos dados replicados. Como os dados gerados pela nova versão já não são compatíveis com a antiga, não é possível realizar uma atualização progressiva.

  1. O cluster funciona inicialmente numa configuração **✅ PRIM (nó 1) / ✅ SECOND (nó 2)**.
  2. Pare o nó SECOND e, em seguida, o nó PRIM. O cluster transita para **❌ STOP (nó 1) / ❌ STOP (nó 2)**.
  3. Atualize o antigo nó PRIM e reinicie-o. O nó inicia-se sozinho, com a nova versão da aplicação. O seu estado é **✅ ALONE (nó 1)**.
  4. Valide a aplicação atualizada e verifique se funciona corretamente.
  5. Se a validação for bem-sucedida, atualize o nó restante e reinicie o seu módulo SafeKit.
  6. O nó atualizado torna-se **✅ SECOND (nó 2)**. Ressincroniza os dados da aplicação. O cluster volta a uma configuração normal **✅ PRIM (nó 1) / ✅ SECOND (nó 2)**.


**Procedimento de reversão**

  * No passo 5, pare o nó 1 atualizado, no estado **✅ ALONE (nó 1)**.
  * Reinicie o nó não atualizado (nó 2) como primário. O seu estado é **✅ ALONE (nó 2)**.
  * Reinstale a versão anterior da aplicação no nó atualizado.
  * Restaurar a configuração original **✅ SECOND (nó 1) / ✅ PRIM (nó 2)**.


Como os dados replicados são modificados durante a migração, o tempo de inatividade corresponde ao período entre o estado **❌ STOP/❌ STOP** e o reinício do primeiro nó atualizado como **✅ ALONE**.

### Vantagens do SafeKit para Atualizações de Aplicações {#why-safekit-simplifies-application-upgrades}

SafeKit minimiza o risco operacional:

  * Os administradores atualizam um nó de cada vez.
  * SafeKit mantém a disponibilidade do serviço sempre que possível.
  * As novas versões são validadas antes de o tráfego de produção ser alterado.
  * Os administradores podem rapidamente reverter para o nó anterior se forem detetados problemas inesperados.


## Escolher a Estratégia de Atualização Certa {#choosing-the-right-upgrade-strategy}

Modelo de Implementação | Instâncias da Aplicação | Impacto dos Dados Replicados | Abordagem de Atualização  
---|---|---|---  
HA ao nível da aplicação | Dois nós | Depende do tipo de atualização | Atualização contínua com failover  
HA ao nível da VM com hyperv.safe ou kvm.safe | Uma máquina virtual | Gerido dentro da máquina virtual | Cria um instantâneo, atualiza, valida e, se necessário, reverte  
  
## Conclusão {#conclusion}

SafeKit oferece arquiteturas flexíveis de alta disponibilidade que se adaptam aos requisitos operacionais de diferentes aplicações. Quer proteja uma aplicação em cluster em dois nós ou uma única instância de aplicação a ser executada numa máquina virtual, SafeKit permite atualizações controladas, minimiza o tempo de inatividade e oferece opções de recuperação fiáveis sempre que são necessárias operações de manutenção.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}