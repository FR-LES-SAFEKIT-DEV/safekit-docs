---
title: "O que são RPO e RTO? Definições, exemplos e estratégias de HA"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Aprenda as definições de RPO (Recovery Point Objective) e RTO (Recovery Time Objective) com exemplos claros. Descubra como o SafeKit atinge zero perda de dados (RPO=0) e failover rápido para garantir a continuidade do negócio 24 horas por dia, 7 dias por semana."
category: "best-practises"
lang: "pt-pt"
topics: "Resumo rápido: RPO vs. RTO, Índice, Como calculo o RPO e o RTO para uma solução de alta disponibilidade e continuidade de negócio?, Como determino o RPO e o RTO para uma solução de cópia de segurança e recuperação de desastres?, Como é que um SafeKit Mirror Cluster atinge zero RPO e baixo RTO?, Quais são os benchmarks de RTO para um SafeKit Farm Cluster com balanceamento de carga?, Tabelas de comparação: RTO vs RPO, Alta disponibilidade em ação: Demonstrações em tempo real de RPO zero e RTO quase nulo, Perguntas frequentes: Otimizar o RPO e o RTO para a continuidade do negócio, 🔍 SafeKit High Availability Navigation Hub"
---

# O que são RPO e RTO? Definições, exemplos e estratégias de HA {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Resumo rápido: RPO vs. RTO {#article-summary}

  * **RPO (objetivo de ponto de recuperação):** Mede **perda de dados**. Define a idade máxima dos ficheiros que devem ser recuperados para que as operações sejam retomadas.
  * **RTO (objetivo de tempo de recuperação):** Mede o **tempo de inatividade**. É o período de tempo dentro do qual um processo de negócio deve ser restaurado.
  * **A principal diferença:** RPO trata de **armazenamento/backups** , enquanto RTO trata de **velocidade de recuperação/failover**.
  * **Capacidade SafeKit:** oferece **0 RPO** (sem perda de dados) e **baixo RTO** (reinicialização rápida) através de replicação síncrona e failover automático.


![Um gráfico de comparação de RPO (objetivo de ponto de recuperação) e RTO (objetivo de tempo de recuperação), ilustrando como o SafeKit atinge zero perda de dados e reinicialização rápida da aplicação.](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO vs. RTO: Comparação da perda de dados e do tempo de recuperação em SafeKit**

## Índice {#table-of-contents}

  * [Como calculo o RPO e o RTO para uma solução de alta disponibilidade e continuidade de negócio?](#calculate-rpo-rto-high-availability)
  * [Como determino o RPO e o RTO para uma solução de cópia de segurança e recuperação de desastres?](#calculate-rpo-rto-backup-solution)
  * [Como é que um cluster de espelhos SafeKit atinge zero RPO e baixo RTO?](#rpo-rto-safekit-mirror-cluster)
  * [Quais são os benchmarks RTO para um cluster de farm SafeKit com balanceamento de carga?](#rpo-rto-safekit-farm-cluster)
  * [Tabelas de comparação: RTO vs RPO](#rpo-vs-rto-comparison)
  * [Alta disponibilidade em ação: demonstrações em tempo real de zero RPO e quase zero RTO](#safekit-rpo-rto-video-demos)
  * [Perguntas frequentes sobre RPO e RTO](#faq-rpo-rto)
  * [SafeKit Hub de navegação de alta disponibilidade](#hub)



{{%  insert-safekit-4-buttons-pt-pt  %}}
 

## Como calculo o RPO e o RTO para uma solução de alta disponibilidade e continuidade de negócio? {#calculate-rpo-rto-high-availability}

### O que é a alta disponibilidade? {#what-is-high-availability}

**Alta disponibilidade (HA)** é uma arquitetura técnica concebida para garantir que um sistema se mantém operacional e acessível durante uma determinada percentagem de tempo (por exemplo, 99,99%).


![Logótipo do software de alta disponibilidade SafeKit que representa o clustering SANless e a replicação síncrona](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Para atingir as metas de RPO e RTO definidas num **Plano de Continuidade de Negócio** , a alta disponibilidade é normalmente implementada através de duas arquiteturas principais:

  * **Sistema de disco partilhado numa SAN:** um cluster tradicional onde dois nós estão ligados a uma rede de área de armazenamento (SAN) central. Se um nó falhar, o outro assumirá o acesso aos dados partilhados.
  * **Replicação síncrona sem SAN:** ​​​​Uma arquitetura moderna "nada partilhada" — implementada pelo software [SafeKit](</> "SafeKit High Availability Software") — em que os dados são replicados em tempo real entre discos locais de 2 nós independentes, eliminando a necessidade de uma SAN.


### Qual é o RPO de uma solução de alta disponibilidade? {#what-is-rpo-high-availability}

**RPO (Recovery Point Objective)** define o volume máximo tolerável de perda de dados medido no tempo. Para uma verdadeira **solução de alta disponibilidade** , o RPO alvo é **zero**.

Ao implementar um cluster de alta disponibilidade com failover automático, um **RPO zero** garante que a aplicação é reiniciada sem perda de dados.

  * **Sistema de disco partilhado numa SAN:** ​​​​Como ambos os nós acedem **exatamente aos mesmos blocos físicos de dados** , não existe "delta" ou atraso entre os nós, garantindo a consistência total dos dados durante um failover.
  * **Replicação síncrona baseada em software:** Uma abordagem sem SAN em que cada operação de "escrita" é espelhada em tempo real na rede. A aplicação só recebe um **reconhecimento de escrita** quando os dados são armazenados em segurança em ambos os nós. Este processo síncrono de "dupla escrita" garante **zero perda de dados** mesmo que o servidor primário falhe.


### Qual é o RTO de uma solução de alta disponibilidade? {#what-is-rto-high-availability}

**RTO (Recovery Time Objective)** representa a duração máxima tolerável do tempo de inatividade após uma interrupção do serviço. No contexto de **alta disponibilidade** , o RTO deve ser mínimo para garantir o acesso contínuo a aplicações críticas.

Para atingir um RTO baixo, uma solução de alta disponibilidade utiliza **failover automático** para detetar falhas de hardware ou software e reiniciar a aplicação imediatamente. Num cluster típico de alta disponibilidade, o **RTO é de aproximadamente um minuto** , calculado como:

  * **Tempo de deteção de falhas:** O intervalo necessário para o sistema identificar uma perda de pulsação do nó ou da aplicação.
  * **Tempo de reinicialização automática:** O tempo necessário para que os serviços da aplicação sejam inicializados no nó sobrevivente.


## Como determino o RPO e o RTO para uma solução de cópia de segurança e recuperação de desastres? {#calculate-rpo-rto-backup-solution}

### O que é uma solução de cópia de segurança? {#what-is-backup}

Uma **Solução de cópia de segurança** é uma estratégia de proteção de dados concebida para criar cópias periódicas de dados para um dispositivo de armazenamento secundário ou para a cloud. Ao contrário da alta disponibilidade, o backup concentra-se na **retenção de dados a longo prazo** e na recuperação de corrupção de dados ou desastres em todo o website.


![Ícone da solução de cópia de segurança que representa uma arquitetura de cópia de segurança para retenção de dados a longo prazo](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Para cumprir as metas de RPO e RTO definidas num **Plano de recuperação de desastres** , o backup é normalmente implementado através de dois métodos principais:

  * **Snapshots agendados:** um processo em que são feitas cópias pontuais dos dados a intervalos fixos (por exemplo, diariamente). Isto define o **RPO** , uma vez que todos os dados modificados entre o último instantâneo e a falha são perdidos.
  * **Recuperação externa ou na nuvem:** Uma arquitetura onde os dados são armazenados num local físico separado. Embora isto garanta a sobrevivência dos dados, resulta num **RTO mais elevado** porque os dados devem ser transferidos e restaurados antes que a aplicação possa ser reiniciada.


### Qual é o RPO de uma solução de cópia de segurança? {#what-is-rpo-backup}

**RPO (Recovery Point Objective)** num contexto de cópia de segurança define a idade dos ficheiros que devem ser recuperados do armazenamento para que as operações normais sejam retomadas. Ao contrário da alta disponibilidade, uma **solução de cópia de segurança** envolve normalmente um RPO diferente de zero, representando o tempo decorrido desde que a última cópia de segurança foi concluída com êxito. 

A quantidade de perda de dados numa estratégia de cópia de segurança é determinada pela **frequência de cópia de segurança**. Dependendo da arquitetura, este RPO pode variar entre minutos a 24 horas: 

  * **Instantâneos Incrementais:** Um método em que apenas os blocos de dados alterados são guardados em intervalos definidos. Se for feito um backup a cada 4 horas, o **RPO máximo será de 4 horas** , o que significa que todos os dados criados entre o último snapshot e a falha do sistema serão perdidos permanentemente. 
  * **Backups diários completos:** Uma abordagem tradicional em que é feita uma cópia completa dos dados uma vez por dia (geralmente durante a noite). Isto resulta num **RPO de 24 horas** , que pode ser aceitável para dados não críticos, mas é geralmente insuficiente para bases de dados transacionais. 


### Qual é o RTO de uma solução de cópia de segurança? {#what-is-rto-backup}

**RTO (Recovery Time Objective)** numa estratégia de cópia de segurança é o tempo necessário para restaurar os dados de um suporte de cópia de segurança e devolver a aplicação a um estado operacional. Ao contrário da alta disponibilidade, o **RTO para cópia de segurança** é significativamente mais longo porque envolve processos de restauro manuais ou com script. 

Para uma solução de cópia de segurança, o **RTO pode variar entre várias horas a dias** , dependendo do volume de dados e da arquitetura de recuperação. O tempo de inatividade total é calculado como: 

  * **Tempo de transferência de dados:** O tempo necessário para mover os dados do armazenamento de cópia de segurança (discos locais, fitas ou nuvem) de volta para o servidor de produção. 
  * **Tempo de reconfiguração do sistema:** O intervalo necessário para extrair os dados para a aplicação, reconstruir índices e verificar a integridade dos dados antes que os utilizadores possam voltar a iniciar sessão. 


## Como é que um cluster de espelho SafeKit atinge zero RPO e baixo RTO? {#rpo-rto-safekit-mirror-cluster}

### O que é o cluster de espelho SafeKit? {#what-is-safekit-mirror-cluster}

O **SafeKit Mirror Cluster** é uma solução de alta disponibilidade baseada em software que implementa uma arquitetura "nada partilhada". Ao contrário dos clusters tradicionais que exigem uma SAN dispendiosa, o SafeKit utiliza os recursos locais de dois servidores padrão para criar um ambiente altamente resiliente.


![Arquitetura SafeKit Mirror Cluster mostrando a replicação de ficheiros ao nível de byte em tempo real entre nós primários e secundários](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Para garantir o máximo tempo de atividade e proteção de dados dentro do seu **Plano de Continuidade de Negócio**, o cluster de espelhos SafeKit opera através de dois mecanismos integrados:

  * **Replicação síncrona em tempo real:** O SafeKit espelha os dados na rede entre os discos locais dos nós primários e secundários. Isto garante que o RPO é zero, uma vez que cada byte de dados é protegido em ambos os servidores antes de uma transação ser finalizada.
  * **Failover automático de IP e aplicação:** Se o nó primário falhar, o SafeKit deteta automaticamente a perda de pulsação e restabelece a aplicação e o seu endereço IP virtual no nó secundário. Isto resulta num RTO de aproximadamente um minuto, proporcionando uma continuidade de serviço contínua.


### Qual é o RPO de um cluster de espelhos SafeKit? {#rpo-safekit-example}

O **RPO de um cluster de espelhos SafeKit é zero** porque a replicação de dados entre nós é [síncrona e](</best-practises/synchronous-replication-vs-asynchronous-replication/> "Synchronous vs Asynchronous Replication") em tempo real.

Esta garantia de perda zero de dados é obtida através de um processo de **reconhecimento de escrita**: uma escrita em disco só é confirmada na aplicação depois de ter sido gravada com sucesso nos discos locais dos nós primário e secundário.

Por outro lado, com **asynchronous replication** , o RPO é superior a zero. Como existe um atraso entre a escrita primária e a atualização secundária, uma falha resultará na perda de dados durante o failover para o servidor secundário. Para **Business Continuity** de missão crítica, a replicação síncrona é a única forma de garantir que a aplicação é reiniciada com 100% de integridade dos dados.

### Qual é o RTO de um cluster de espelhos SafeKit? {#what-is-rto-safekit}

Numa configuração padrão, o **RTO de um cluster de espelhos SafeKit é de aproximadamente um minuto**. O SafeKit oferece a flexibilidade para implementar alta disponibilidade ao **nível de aplicação** ou ao **nível de VM** , cada um impactando o tempo de recuperação de forma diferente: 

  * **HA ao nível da aplicação:** Esta é a abordagem SafeKit otimizada em que o software monitoriza serviços de aplicações específicos. 
    * **Falha de hardware:** RTO = _tempo limite de pulsação_ (padrão 30s) + _tempo de reinicialização da aplicação_.
    * **Falha de software:** RTO = _tempo de paragem da aplicação_ \+ _tempo de reinicialização da aplicação_.
    * **Principal benefício:** Como o sistema operativo já está a ser executado no nó secundário, não há atraso na inicialização do sistema operativo, resultando na recuperação mais rápida possível para **Continuidade de negócio**.
  * **HA ao nível da VM:** Neste cenário, o SafeKit protege todo o ambiente da máquina virtual. 
    * **Recuperação de falhas:** RTO = _deteção de falhas_ \+ **Tempo de reinicialização do sistema operativo** \+ _tempo de reinicialização da aplicação_.
    * **Compensação técnica:** O RTO é naturalmente mais longo (vários minutos) porque o nó secundário deve executar um arranque a frio completo do sistema operativo antes mesmo de a aplicação poder começar a arrancar.


Ao utilizar **alta disponibilidade ao nível da aplicação**, o SafeKit elimina a "penalidade de reinicialização" inerente à virtualização padrão, garantindo que o seu **Plano de Continuidade de Negócio** atinge o menor tempo de inatividade possível. 

## Quais são os benchmarks RTO para um cluster de farm SafeKit com balanceamento de carga? {#rpo-rto-safekit-farm-cluster}

### O que é o Cluster Agrícola SafeKit? {#what-is-safekit-farm-cluster}

O **SafeKit Farm Cluster** é uma solução de alta disponibilidade baseada em software, concebida para aplicações sem estado (como servidores Web) que exigem **escalabilidade** e **redundância**. Ao contrário de um cluster espelho que se concentra na replicação de dados, um cluster farm distribui o tráfego de entrada por vários nós ativos.


![Arquitetura SafeKit Farm Cluster demonstrando o balanceamento de carga de rede e failover para aplicações stateless](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Para manter a **Continuidade de Negócio** em ambientes de elevado tráfego, o cluster farm SafeKit opera através de dois mecanismos principais:

  * **Balanceamento de carga de rede:** O SafeKit utiliza um endereço IP virtual para distribuir o tráfego de rede de entrada num "farm" de vários servidores ativos. Isto garante que nenhum servidor fica sobrecarregado e maximiza o desempenho da aplicação.
  * **Deteção e reconfiguração automática de falhas:** Se um nó do farm falhar, o SafeKit deteta a falha através de pulsações e redistribui imediatamente o seu tráfego pelos restantes nós íntegros. Isto proporciona um RTO próximo de zero para o serviço global, uma vez que outros nós já estão ativos e prontos para absorver a carga.


### Qual é o RPO de um cluster de farm SafeKit? {#what-is-rpo-safekit-farm}

O **RPO (objetivo de ponto de recuperação)** para um **SafeKit Farm Cluster** é geralmente considerado **Não aplicável (N/A)**. Isto porque um cluster de farm é especificamente concebido para **aplicações sem estado** onde os dados não são armazenados localmente nos nós. 

Uma vez que um cluster farm se concentra no **balanceamento de carga de rede** em vez da sincronização de dados, não existe replicação de dados entre os nós dentro do próprio cluster. Num **Plano de Continuidade de Negócio** típico envolvendo uma arquitetura de farm: 

  * **Operações sem estado:** todos os nós do farm são idênticos e não contêm dados persistentes; portanto, não há “perda de dados” a ser medida durante uma falha de um nó. 
  * **Armazenamento de dados externo:** Se a aplicação exigir persistência de dados, será geralmente tratado por um back-end separado **SafeKit Mirror Cluster** onde o RPO seria então zero. 


### Qual é o RTO de um cluster de farm SafeKit? {#rto-example-safekit-farm-cluster}

Numa arquitetura de farm, o **RTO é reduzido para apenas alguns segundos** porque todos os nós estão normalmente ativos em simultâneo. O tempo de recuperação é determinado pela velocidade com que o cluster reconfigura a sua distribuição de tráfego:

  * **Falha de hardware:** O RTO é igual ao _tempo limite de deteção de falhas_ nos canais de monitorização (o predefinido é alguns segundos). Assim que a perda de pulsação for detetada, os **filtros de balanceamento de carga IP virtual** serão automaticamente reconfigurados para redirecionar o tráfego para os restantes nós íntegros.
  * **Falha de software ou reinicialização planeada:** O RTO é calculado como o _tempo de paragem da aplicação_ mais o _tempo de reinicialização da aplicação_ nesse nó específico, durante o qual os outros nós do farm continuam a lidar com todo o tráfego de entrada.


Este mecanismo "Ativo-Ativo" garante que, para serviços sem estado, o impacto da **Continuidade de Negócio** é quase impercetível para o utilizador final, uma vez que não há necessidade de inicializar o serviço num novo nó em espera.

## Tabelas de comparação: RTO vs RPO {#rpo-vs-rto-comparison}

**Definição Semântica: RTO vs. RPO**

Métrica | Sigla | Definição | Área de foco  
---|---|---|---  
Objetivo de tempo de recuperação | RTO | A duração prevista para restaurar um processo de negócio após uma falha. | Disponibilidade/tempo de inatividade  
Objetivo do ponto de recuperação | RPO | A idade máxima dos ficheiros que devem ser recuperados do backup para que as operações sejam retomadas. | Perda/Integridade de Dados  
  
**Alta disponibilidade (HA) versus backup padrão**

Recurso | Soluções de backup | Alta disponibilidade (SafeKit)  
---|---|---  
Automação de recuperação | Intervenção Manual | Failover automático  
RTO alvo | Horas em Dias | Segundos a ~1 minuto  
RPO alvo | > 0 (Último ponto de cópia de segurança) | 0 (replicação síncrona)  
  
**Benchmarks de RTO e RPO para clusters SafeKit**

Arquitetura | Caso de uso | RTO (disponibilidade) | RPO (perda de dados)  
---|---|---|---  
Cluster de espelhos | Replicação em tempo real | ~1 min (pulsação + reinicialização) | 0 (sem perda de dados)  
Agrupamento Agrícola | Balanceamento de carga de rede | Alguns segundos | N/A (sem estado)  
  
## Alta disponibilidade em ação: demonstrações em tempo real de RPO zero e RTO quase zero {#safekit-rpo-rto-video-demos}

### Vídeo: Alcançar zero RPO e baixo RTO num cluster de espelho SafeKit (8:47) {#demo-mirror-cluster-rpo-rto}

Veja como SafeKit lida com uma falha crítica. Este vídeo demonstra a **replicação síncrona** garantindo que nenhum dado é perdido (RPO 0) numa base de dados SQL e a **reinicialização automática** dos serviços no nó secundário (baixo RTO).


#### Capítulos {#chapters}

  1. 🎬 Nós [2 com SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Configure o cluster e o módulo mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [Iniciar e testar replicação SQL, migração, failover em crash](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[Teste gratuito aqui](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Vídeo: Alcançar RTO próximo de zero num cluster agrícola SafeKit (5:03) {#demo-farm-cluster-rpo-rto}

Veja como o SafeKit gere um web farm Apache para fornecer escalabilidade de desempenho e failover instantâneo.

#### Capítulos {#chapters-1}

  1. 🎬 Nós [2 com Apache](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [Configure o cluster e o módulo farm.safe](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [Iniciar e testar o balanceamento de carga de rede, failover em caso de falha](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[Teste gratuito aqui](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## Perguntas frequentes: Otimização de RPO e RTO para continuidade de negócio {#faq-rpo-rto}

### O RPO e o RTO podem ser zero? {#can-rpo-rto-be-zero}

**Sim.** Alcançar um **RPO zero** significa a ausência de perda de dados, o que é possível através do espelhamento de dados síncrono. Um **RTO próximo de zero** é alcançado através de software de failover automatizado como o SafeKit, que deteta falhas e reinicia as aplicações num nó secundário em segundos ou minutos.

### O que é mais importante: RPO ou RTO? {#importance-rpo-vs-rto}

Nenhum dos dois é inerentemente mais importante; desempenham funções diferentes. **RPO (Recovery Point Objective)** centra-se na perda de dados: quantos dados pode perder. **RTO (Recovery Time Objective)** concentra-se no tempo de inatividade: a rapidez com que deve estar novamente online. Para aplicações de missão crítica, ambos devem ser minimizados.

### Qual é a diferença em RPO e RTO entre SafeKit ao nível da aplicação e ao nível da VM? {#safekit-application-vs-vm-level}

Embora ambos garantam um **RPO de 0** através da replicação síncrona, diferem no tempo de recuperação:

  * **Nível de aplicação:** RTO mais rápido (aprox. 1 min) porque apenas os serviços de aplicação são reiniciados num sistema operativo já em execução. Deteta também falhas específicas de software/processo.
  * **Nível de VM:** RTO mais elevado porque toda a máquina virtual deve ser reinicializada no host secundário. Embora independente das aplicações, falta uma monitorização granular dos próprios processos das aplicações.


### Qual é a diferença entre o HA e as soluções de backup em termos de RTO? {#ha-vs-backup-rto}

A Alta Disponibilidade (HA) oferece normalmente um RTO muito mais baixo (segundos a minutos) porque trata automaticamente as falhas locais. A recuperação de desastres com soluções de cópia de segurança (DR) tem frequentemente um RTO mais elevado (horas ou dias) porque envolve a recuperação de dados e serviços num local geograficamente distante após uma grande catástrofe.

### Como obtenho o melhor RPO e RTO entre sites remotos? {#rpo-rto-between-remote-sites}

Atingir um **RPO zero** e um **RTO próximo de zero** em locais remotos requer uma combinação de **replicação síncrona** e uma **LAN estendida (VLAN estendida)**:

  * **LAN estendida/VLAN estendida:** Ao estender a mesma sub-rede (camada 2) em dois centros de dados, pode mover uma aplicação do site A para o site B sem alterar o seu endereço IP, evitando atualizações complexas de DNS.
  * **A solução SafeKit:** O SafeKit aproveita isto fornecendo um **IP virtual (VIP) definido por software** que flutua entre sites. Redireciona instantaneamente o tráfego para o site secundário utilizando ARP gratuito (GARP).


Isto proporciona um **RPO = 0** (espelhamento em tempo real) e um **RTO mínimo** (failover em aproximadamente 1 minuto) sem intervenção humana.

### Porque é que combinar alta disponibilidade e backup é essencial para otimizar o RPO e o RTO? {#combining-ha-and-backup-for-rpo-rto}

Combinar a alta disponibilidade (HA) com uma solução de cópia de segurança é a única forma de obter uma estratégia de recuperação do tipo "melhor de dois mundos". Embora sejam frequentemente discutidos em conjunto, resolvem diferentes partes da equação RPO/RTO:

  * **Alta disponibilidade (via SafeKit):** Otimiza para RTO próximo de zero e RPO zero durante falhas de hardware ou software. Quando se utiliza a replicação síncrona em tempo real, o servidor secundário está sempre atualizado. Se o primário falhar, o serviço será reiniciado imediatamente no secundário, sem perda de dados.
  * **Soluções de cópia de segurança:** proteja contra problemas de integridade dos dados (como ransomware ou eliminação acidental). Como o HA replica as alterações instantaneamente, replicará "fielmente" um vírus ou um registo de base de dados eliminado para o servidor em espera. Um backup permite “recuar no tempo” a um ponto anterior à ocorrência da corrupção.
  * **A abordagem híbrida:** para obter a máxima resiliência, as organizações utilizam uma **arquitetura híbrida de três nós**. Isto inclui um cluster local de 2 nós com replicação síncrona para HA imediata e uma terceira cópia remota (assíncrona) para recuperação de desastres. Esta defesa em camadas garante que tem uma cópia “ativa” para recuperação instantânea e uma cópia “histórica” para segurança dos dados.



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}