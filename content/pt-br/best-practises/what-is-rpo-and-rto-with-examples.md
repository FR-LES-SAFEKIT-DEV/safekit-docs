---
title: "O que são RPO e RTO? Definições, exemplos e estratégias de alta disponibilidade."
canonical: "https://safekit.eviden.com/pt-br/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Aprenda as definições de RPO (Recovery Point Objective) e RTO (Recovery Time Objective) com exemplos claros. Descubra como o SafeKit atinge zero perda de dados (RPO=0) e failover rápido para garantir a continuidade dos negócios 24 horas por dia, 7 dias por semana."
category: "best-practises"
lang: "pt-br"
topics: "Resumo rápido: RPO vs. RTO, Sumário, Como calcular RPO e RTO para uma solução de Alta Disponibilidade e Continuidade de Negócios?, Como determinar RPO e RTO para uma solução de Backup e Recuperação de Desastres?, Como um cluster SafeKit Mirror atinge RPO zero e RTO baixo?, Quais são os benchmarks de RTO para um cluster SafeKit Farm com balanceamento de carga?, Tabelas comparativas: RTO vs. RPO, Alta Disponibilidade em Ação: Demonstrações em Tempo Real de RPO Zero e RTO Próximo de Zero, Perguntas Frequentes: Otimizando RPO e RTO para Continuidade de Negócios, 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# O que são RPO e RTO? Definições, exemplos e estratégias de alta disponibilidade {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Resumo rápido: RPO vs. RTO {#article-summary}

  * **RPO (Recovery Point Objective):** Mede **a perda de dados** . Define a idade máxima dos arquivos que devem ser recuperados para que as operações sejam retomadas.
  * **RTO (Recovery Time Objective):** Mede **o tempo de inatividade** . É a duração do tempo dentro da qual um processo de negócio deve ser restaurado.
  * **A principal diferença:** RPO está relacionado ao **armazenamento/backups** , enquanto RTO está relacionado à **velocidade de recuperação/failover** .
  * Capacidade **SafeKit :** oferece **RPO 0** (sem perda de dados) e **baixo RTO** (reinicialização rápida) por meio de replicação síncrona e failover automático.


![ Um gráfico comparativo de RPO (Recovery Point Objective) e RTO (Recovery Time Objective), ilustrando como SafeKit alcança zero perda de dados e reinicialização rápida do aplicativo. ](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO vs. RTO: Comparando a perda de dados e o tempo de recuperação em SafeKit**

## Índice {#table-of-contents}

  * [ Como calculo o RPO e o RTO para uma solução de alta disponibilidade e continuidade de negócios? ](#calculate-rpo-rto-high-availability)
  * [ Como determino o RPO e o RTO para uma solução de backup e recuperação de desastres? ](#calculate-rpo-rto-backup-solution)
  * Como um cluster [ SafeKit atinge RPO Mirror e RTO baixo? ](#rpo-rto-safekit-mirror-cluster)
  * [ Quais são os benchmarks de RTO para um cluster SafeKit <span class="notranslate farm-term" translate="no">Farm</span> com balanceamento de carga? ](#rpo-rto-safekit-farm-cluster)
  * Tabelas comparativas [ : RTO vs RPO ](#rpo-vs-rto-comparison)
  * [ Alta disponibilidade em ação: demonstrações em tempo real de RPO zero e RTO próximo de zero ](#safekit-rpo-rto-video-demos)
  * [ Perguntas frequentes sobre RPO e RTO ](#faq-rpo-rto)
  * [ SafeKit Hub de Navegação de Alta Disponibilidade ](#hub)



{{%  insert-safekit-4-buttons-pt-br  %}}
 

## Como calculo o RPO e o RTO para uma solução de alta disponibilidade e continuidade de negócios? {#calculate-rpo-rto-high-availability}

### O que é Alta Disponibilidade? {#what-is-high-availability}

**Alta Disponibilidade (HA)** é uma arquitetura técnica projetada para garantir que um sistema permaneça operacional e acessível por uma porcentagem de tempo específica (por exemplo, 99,99%).


![ SafeKit logotipo de software de alta disponibilidade representando clustering sem SAN e replicação síncrona ](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Para atingir as metas de RPO e RTO definidas em um **Plano de Continuidade de Negócios** , a alta disponibilidade é normalmente implementada por meio de duas arquiteturas principais:

  * **Sistema de disco compartilhado em uma SAN:** Um cluster tradicional onde 2 nós estão conectados a uma rede de área de armazenamento (SAN) central. Se um nó falhar, o outro assume o acesso aos dados compartilhados.
  * Replicação síncrona sem SAN: **Uma arquitetura moderna "sem compartilhamento" — implementada pelo software [ SafeKit ](</> "SafeKit High Availability Software") —** os dados são replicados em tempo real entre discos locais de 2 nós independentes, eliminando a necessidade de uma SAN.


### Qual é o RPO de uma solução de alta disponibilidade? {#what-is-rpo-high-availability}

**O RPO (Recovery Point Objective)** define o volume máximo tolerável de perda de dados, medido em tempo. Para uma **solução de alta disponibilidade** verdadeira, o RPO alvo é **zero** .

Ao implementar um cluster de alta disponibilidade com failover automático, um RPO zero **e um RPO zero** garantem que o aplicativo seja reiniciado sem perda de dados.

  * **Sistema** disco compartilhado sobre uma SAN: **Como ambos os nós acessam os mesmos blocos físicos de dados** , não há "delta" ou atraso entre os nós, garantindo a consistência total dos dados durante uma falha.
  * **Replicação síncrona baseada em software:** uma abordagem sem SAN onde cada operação de "escrita" é espelhada em tempo real em toda a rede. O aplicativo só recebe uma **confirmação de escrita** quando os dados estão armazenados com segurança em ambos os nós. Esse processo síncrono de "escrita dupla" garante **zero perda de dados,** mesmo se o servidor primário falhar.


### Qual é o RTO de uma solução de alta disponibilidade? {#what-is-rto-high-availability}

**O RTO (Recovery Time Objective)** representa a duração máxima tolerável de inatividade após uma interrupção de serviço. No contexto de **alta disponibilidade** , o RTO deve ser mínimo para garantir o acesso contínuo a aplicações críticas.

Para atingir um RTO baixo, uma solução de alta disponibilidade utiliza **failover automático** para detectar falhas de hardware ou software e reiniciar o aplicativo imediatamente. Em um cluster de alta disponibilidade típico, o **RTO é de aproximadamente um minuto** , calculado como:

  * Tempo de detecção de falhas **:** Intervalo necessário para o sistema identificar a perda de pulsação de um nó ou aplicativo.
  * Tempo de reinicialização automática **:** Tempo necessário para que os serviços do aplicativo sejam inicializados no nó sobrevivente.


## Como posso determinar o RPO e o RTO para uma solução de backup e recuperação de desastres? {#calculate-rpo-rto-backup-solution}

### O que é uma solução de backup? {#what-is-backup}

Uma **solução de backup** é uma estratégia de proteção de dados projetada para criar cópias periódicas dos dados em um dispositivo de armazenamento secundário ou na nuvem. Ao contrário da alta disponibilidade, o backup concentra-se na **retenção de dados a longo prazo** e na recuperação em caso de corrupção de dados ou desastres que afetem toda a organização.


![ Ícone de solução de backup representando uma arquitetura de backup para retenção de dados a longo prazo ](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Para atender às metas de RPO e RTO definidas em um **Plano de Recuperação de Desastres** , o backup é normalmente implementado por meio de dois métodos principais:

  * **Capturas de instantâneos agendadas:** Um processo no qual cópias pontuais dos dados são feitas em intervalos fixos (por exemplo, diariamente). Isso define o **RPO** , pois quaisquer dados modificados entre a última captura de instantâneo e a falha são perdidos.
  * **Recuperação fora do local ou na nuvem:** Uma arquitetura onde os dados são armazenados em um local físico separado. Embora isso garanta a sobrevivência dos dados, resulta em um **RTO mais alto** porque os dados devem ser transferidos e restaurados antes que o aplicativo possa ser reiniciado.


### Qual é o RPO de uma solução de backup? {#what-is-rpo-backup}

**O RPO (Recovery Point Objective, ou Objetivo de Ponto de Recuperação)** em um contexto de backup define a idade dos arquivos que devem ser recuperados do armazenamento para que as operações normais sejam retomadas. Ao contrário da alta disponibilidade, uma **solução de backup** geralmente envolve um RPO diferente de zero, representando o tempo decorrido desde que o último backup foi concluído com sucesso. 

A quantidade de perda de dados em uma estratégia de backup é determinada pela **frequência de backup** . Dependendo da arquitetura, esse RPO (Objetivo de Ponto de Recuperação) pode variar de minutos a 24 horas. 

  * **Snapshots incrementais:** Um método onde apenas os blocos de dados alterados são salvos em intervalos definidos. Se um backup for feito a cada 4 horas, o **RPO máximo é de 4 horas** , o que significa que quaisquer dados criados entre o último snapshot e a falha do sistema serão perdidos permanentemente. 
  * **Cópias de segurança diárias completas:** Uma abordagem tradicional em que uma cópia completa dos dados é feita uma vez por dia (geralmente durante a noite). Isso resulta em um **RPO de 24 horas** , o que pode ser aceitável para dados não críticos, mas geralmente é insuficiente para bancos de dados transacionais. 


### Qual é o RTO de uma solução de backup? {#what-is-rto-backup}

**RTO (Recovery Time Objective) em uma estratégia** backup é a duração do tempo necessário para restaurar os dados de uma mídia de backup e retornar o aplicativo a um estado operacional. Ao contrário da alta disponibilidade, o **para backup é significativamente maior porque envolve processos de restauração manuais ou** . 

Para uma solução de backup, o RTO **Objetivo de Tempo de Recuperação** pode variar de algumas horas a dias, dependendo do volume de dados e da arquitetura de recuperação. O tempo total de inatividade é calculado como: 

  * Tempo de transferência de dados **:** Tempo necessário para mover os dados do armazenamento de backup (discos locais, fitas ou nuvem) de volta para o servidor de produção. 
  * Tempo de reconfiguração do sistema **:** Intervalo necessário para importar os dados para o aplicativo, reconstruir os índices e verificar a integridade dos dados antes que os usuários possam fazer login novamente. 


## Como um cluster SafeKit Mirror atinge RPO zero e RTO baixo? {#rpo-rto-safekit-mirror-cluster}

### O que é o cluster SafeKit Mirror ? {#what-is-safekit-mirror-cluster}

O cluster **SafeKit Mirror** é uma solução de alta disponibilidade baseada em software que implementa uma arquitetura "sem compartilhamento". Ao contrário dos clusters tradicionais que exigem um SAN caro, SafeKit utiliza os recursos locais de dois servidores padrão para criar um ambiente altamente resiliente.


![ SafeKit Mirror Arquitetura de cluster mostrando replicação de arquivos em nível de byte em tempo real entre nós primários e secundários ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Para garantir o máximo tempo de atividade e proteção de dados dentro do seu **Plano de Continuidade de Negócios** , o cluster SafeKit mirror opera por meio de dois mecanismos integrados:

  * Replicação Síncrona em Tempo Real **:** SafeKit espelham os dados pela rede entre os discos locais dos nós primário e secundário. Isso garante que o RPO seja zero, pois cada byte de dados é protegido em ambos os servidores antes que uma transação seja finalizada.
  * **Failover automático de IP e aplicação:** Se o nó primário falhar, SafeKit detecta automaticamente a perda de sinal de atividade (heartbeat) e restabelece a aplicação e seu endereço IP virtual no nó secundário. Isso resulta em um RTO de aproximadamente um minuto, proporcionando continuidade de serviço ininterrupta.


### Qual é o RPO de um cluster SafeKit Mirror ? {#rpo-safekit-example}

O RPO **de um cluster SafeKit mirror é zero** porque a replicação de dados entre os nós é [ síncrona e em tempo real ](</pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/> "Synchronous vs Asynchronous Replication") .

Essa garantia de zero perda de dados é alcançada por meio de um processo **de confirmação de gravação** : uma gravação em disco só é confirmada para o aplicativo depois de ter sido gravada com sucesso nos discos locais dos nós primário e secundário.

Em contraste, com **a replicação assíncrona** , o RPO é maior que zero. Como há um atraso entre a gravação no servidor primário e a atualização no secundário, uma falha resultará em perda de dados durante a transição para o servidor secundário. Para aplicações críticas **de continuidade de negócios** , a replicação síncrona é a única maneira de garantir que a aplicação seja reiniciada com 100% de integridade dos dados.

### Qual é o RTO de um cluster SafeKit Mirror ? {#what-is-rto-safekit}

Em uma configuração padrão, o RTO **Objetivo mirror** **SafeKit é de aproximadamente um minuto. SafeKit oferece a flexibilidade de implementar alta disponibilidade tanto no nível do** **no nível da máquina** , cada um impactando o tempo de recuperação de forma diferente. 

  * **Alta disponibilidade em nível de aplicação:** Esta é a abordagem otimizada SafeKit , onde o software monitora serviços de aplicação específicos. 
    * Falha de hardware **:** RTO = _tempo limite de pulsação_ (padrão de 30s) + _tempo de reinicialização do aplicativo_.
    * Falha de software **:** RTO = _tempo de parada do aplicativo_ + _tempo de reinicialização do aplicativo_.
    * **Principal benefício:** Como o sistema operacional já está em execução no nó secundário, não há atraso na inicialização do SO, resultando na recuperação mais rápida possível para a **continuidade dos negócios** .
  * **Alta disponibilidade em nível de máquina virtual:** neste cenário, SafeKit protege todo o ambiente da máquina virtual. 
    * Recuperação de falhas **:** RTO = _detecção de falhas_ + **Tempo de reinicialização do SO** + _tempo de reinicialização do aplicativo_.
    * Compensação técnica **:** O RTO é naturalmente mais longo (vários minutos) porque o nó secundário deve executar uma inicialização a frio completa do sistema operacional antes mesmo que o aplicativo possa começar a inicializar.


Ao utilizar **alta disponibilidade em nível de aplicação** , SafeKit elimina a "penalidade de reinicialização" inerente à virtualização padrão, garantindo que seu **Plano de Continuidade de Negócios** alcance o menor tempo de inatividade possível. 

## Quais são os benchmarks de RTO para um cluster SafeKit <span class="notranslate farm-term" translate="no">Farm</span> com balanceamento de carga? {#rpo-rto-safekit-farm-cluster}

### O que é o cluster SafeKit <span class="notranslate farm-term" translate="no">Farm</span> ? {#what-is-safekit-farm-cluster}

O **cluster SafeKit <span class="notranslate farm-term" translate="no">Farm</span>** é uma solução de alta disponibilidade baseada em software, projetada para aplicações sem estado (como servidores web) que exigem **escalabilidade** e **redundância** . Ao contrário de um cluster mirror , que se concentra na replicação de dados, um cluster <span class="notranslate farm-term" translate="no">farm</span> distribui o tráfego de entrada entre vários nós ativos.


![ SafeKit Farm Arquitetura de cluster demonstrando balanceamento de carga de rede e failover para aplicações sem estado ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Para manter **a continuidade dos negócios** em ambientes de alto tráfego, o cluster SafeKit <span class="notranslate farm-term" translate="no">farm</span> opera por meio de dois mecanismos principais:

  * Balanceamento de carga de rede **:** SafeKit usa um endereço IP virtual para distribuir o tráfego de rede de entrada entre um " <span class="notranslate farm-term" translate="no">farm</span> " de vários servidores ativos. Isso garante que nenhum servidor individual seja sobrecarregado e maximiza o desempenho do aplicativo.
  * **Detecção e Reconfiguração Automática de Falhas:** Se um nó no <span class="notranslate farm-term" translate="no">farm</span> falhar, SafeKit detecta a falha por meio de sinais de pulsação e redistribui imediatamente seu tráfego entre os nós restantes em bom funcionamento. Isso proporciona um RTO próximo de zero para o serviço como um todo, já que outros nós já estão ativos e prontos para absorver a carga.


### Qual é o RPO de um cluster SafeKit <span class="notranslate farm-term" translate="no">Farm</span> ? {#what-is-rpo-safekit-farm}

O **RPO (Recovery Point Objective)** para um **cluster SafeKit <span class="notranslate farm-term" translate="no">Farm</span>** é geralmente considerado **Não Aplicável (N/A)** . Isso ocorre porque um cluster <span class="notranslate farm-term" translate="no">farm</span> é projetado especificamente para **aplicações sem estado,** onde os dados não são armazenados localmente nos nós. 

Como um cluster <span class="notranslate farm-term" translate="no">farm</span> se concentra no balanceamento de carga de rede **em vez <span class="notranslate farm-term" translate="no">farm</span> sincronização de dados, não há replicação de dados entre os nós dentro do próprio cluster. Em um Plano** Continuidade de Negócios **típico envolvendo uma arquitetura** : 

  * Operações sem estado **:** Todos os nós em <span class="notranslate farm-term" translate="no">farm</span> são idênticos e não armazenam dados persistentes; portanto, não há "perda de dados" a ser medida durante uma falha de nó. 
  * **Armazenamento de dados externo:** Se o aplicativo exigir persistência de dados, geralmente é gerenciado por um backend separado **SafeKit Mirror Cluster** onde o RPO seria então zero. 


### Qual é o RTO de um cluster SafeKit <span class="notranslate farm-term" translate="no">Farm</span> ? {#rto-example-safekit-farm-cluster}

Em uma arquitetura <span class="notranslate farm-term" translate="no">farm</span> , o RTO **é reduzido para apenas alguns segundos** , pois todos os nós geralmente estão ativos simultaneamente. O tempo de recuperação é determinado pela velocidade com que o cluster reconfigura sua distribuição de tráfego:

  * **Falha de hardware:** O RTO é igual ao tempo limite de detecção de falhas nos canais de monitoramento (o padrão é de alguns segundos). Assim que a perda de pulsação é detectada, os **filtros virtuais de balanceamento de carga IP** são reconfigurados automaticamente para redirecionar o tráfego para os nós íntegros restantes.
  * Falha de software ou reinicialização planejada **:** O RTO é calculado como o tempo de parada do aplicativo mais o tempo de reinicialização do aplicativo nesse nó específico, durante o qual os outros nós em <span class="notranslate farm-term" translate="no">farm</span> continuam a lidar com todo o tráfego de entrada.


Esse mecanismo "Ativo-Ativo" garante que, para serviços sem estado, o impacto do **Business Continuity** seja quase imperceptível para o usuário final, já que não há necessidade de inicializar o serviço em um novo nó de espera.

## Tabelas comparativas: RTO vs RPO {#rpo-vs-rto-comparison}

Definição semântica **: RTO vs. RPO**

Métrica | Acrônimo | Definição | Área de foco  
---|---|---|---  
Objetivo de Tempo de Recuperação (RTO) | | Duração alvo para restaurar um processo de negócios após uma falha. | Disponibilidade/Tempo de Inatividade  
Objetivo de Ponto de Recuperação (RPO) | RPO | Idade máxima dos arquivos que devem ser recuperados do backup para que as operações sejam retomadas. | Perda/Integridade de Dados.  
  
**Alta Disponibilidade (HA) vs. Backup Padrão**

Recurso | Soluções de backup | Alta disponibilidade ( SafeKit )  
---|---|---  
Automação de recuperação | Intervenção manual | Failover automático  
Tempo de recuperação alvo (RTO) | Horas a dias; | Segundos a aproximadamente 1 minuto.  
RPO alvo | > 0 (Último ponto de backup) | 0 (Replicação síncrona)  
  
**Benchmarks de RTO e RPO para clusters SafeKit**

Arquitetura | Caso de uso | RTO (Disponibilidade) | RPO (Perda de dados)  
---|---|---|---  
Cluster Mirror Replicação em tempo real | ~1 min (Pausa + Reinício) | 0 | Sem perda de dados)  
<span class="notranslate farm-term" translate="no">Farm</span> Cluster | Balanceamento de carga de rede | Alguns segundos | N/A (Sem estado)  
  
## Alta disponibilidade em ação: demonstrações em tempo real de RPO zero e RTO próximo de zero {#safekit-rpo-rto-video-demos}

### Vídeo: Alcançando RPO zero e RTO baixo em um cluster SafeKit Mirror (8:47) {#demo-mirror-cluster-rpo-rto}

Veja como SafeKit lida com uma falha crítica. Este vídeo demonstra **a replicação síncrona** , garantindo que nenhum dado seja perdido (RPO 0) em um banco de dados SQL e a **reinicialização automática** dos serviços no nó secundário (RTO baixo).


#### Capítulos {#chapters}

  1. 🎬 [ 2 nós com SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Configurar o cluster e o módulo mirror.safe ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Iniciar e testar replicação SQL, migração, failover em caso de falha ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

Teste grátis aqui [ ](</pt-br/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Vídeo: Alcançando RTO próximo de zero em um cluster SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (5:03) {#demo-farm-cluster-rpo-rto}

Veja como SafeKit gerencia um servidor web Apache <span class="notranslate farm-term" translate="no">farm</span> para fornecer escalabilidade de desempenho e failover instantâneo.

#### Capítulos {#chapters-1}

  1. 🎬 [ 2 nós com Apache ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [ Configurar o cluster e o módulo farm.safe ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [ Iniciar e testar balanceamento de carga de rede, failover em caso de falha ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

Teste grátis aqui [ ](</pt-br/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## FAQ: Otimizando RPO e RTO para Continuidade de Negócios {#faq-rpo-rto}

### RPO e RTO podem ser zero? {#can-rpo-rto-be-zero}

Sim. **Alcançar um** RPO zero **significa nenhuma perda** dados, o que é possível por meio do espelhamento síncrono de dados. Um **RTO próximo de zero** é alcançado por meio de software de failover automatizado como SafeKit , que detecta falhas e reinicia aplicativos em um nó secundário em segundos ou minutos.

### Qual é mais importante: RPO ou RTO? {#importance-rpo-vs-rto}

Nenhum dos **é inerentemente mais importante; eles desempenham funções diferentes.** RPO (Recovery Point Objective) foca na perda de dados — a quantidade de dados que você pode se dar ao luxo de perder. **RTO (Recovery Time Objective) foca no tempo de** — a rapidez com que você precisa voltar a ficar online. Para aplicações de missão crítica, ambos devem ser minimizados.

### Qual é a diferença entre RPO e RTO para SafeKit no nível da aplicação e no nível da máquina virtual? {#safekit-application-vs-vm-level}

Embora ambos garantam um **RPO de 0** por meio de replicação síncrona, eles diferem no tempo de recuperação:

  * Nível de aplicação **:** . Tempo de recuperação (RTO) mais rápido (aprox. 1 min), pois somente os serviços da aplicação são reiniciados em um sistema operacional já em execução. Também detecta falhas específicas de software/processo.
  * Nível da VM **:** RTO mais alto porque toda a máquina virtual precisa ser reinicializada no host secundário. Embora seja independente de aplicativos, carece de monitoramento granular dos próprios processos dos aplicativos.


### Qual a diferença entre soluções de alta disponibilidade (HA) e soluções de backup em termos de RTO (Objetivo de Tempo de Recuperação)? {#ha-vs-backup-rto}

A Alta Disponibilidade (HA) normalmente oferece um RTO (tempo de recuperação) muito menor (de segundos a minutos) porque lida com falhas locais automaticamente. A Recuperação de Desastres (DR), com soluções de backup, geralmente tem um RTO maior (de horas a dias) porque envolve a recuperação de dados e serviços em um local geograficamente distante após uma grande catástrofe.

### Como posso obter os melhores resultados de RPO e RTO entre sites remotos? {#rpo-rto-between-remote-sites}

Para atingir um **RPO zero** e **um RTO próximo de zero** em sites remotos, é necessária uma combinação de **replicação síncrona** e uma **LAN estendida (VLAN estendida)** :

  * **LAN estendida / VLAN estendida:** Ao estender a mesma sub-rede (Camada 2) por dois centros de dados, você pode mover um aplicativo do Site A para o Site B sem alterar seu endereço IP, evitando atualizações complexas de DNS.
  * **A solução SafeKit : O** SafeKit aproveita isso fornecendo um **IP virtual (VIP) definido por software** que transita entre os sites. Ele redireciona instantaneamente o tráfego para o site secundário usando ARP gratuito (GARP).


Isso proporciona um **RPO = 0** (espelhamento em tempo real) e um **RTO mínimo** (failover em aproximadamente 1 minuto) sem intervenção humana.

### Por que a combinação de Alta Disponibilidade e Backup é essencial para otimizar o RPO e o RTO? {#combining-ha-and-backup-for-rpo-rto}

Combinar alta disponibilidade (HA) com uma solução de backup é a única maneira de alcançar uma estratégia de recuperação que ofereça o melhor dos dois mundos. Embora sejam frequentemente discutidas em conjunto, elas resolvem partes diferentes da equação RPO/RTO:

  * Alta disponibilidade **(via SafeKit ):** otimiza para RTO próximo de zero e RPO zero durante falhas de hardware ou software. Ao usar replicação síncrona em tempo real, o servidor secundário está sempre atualizado. Se o servidor primário falhar, o serviço é reiniciado imediatamente no servidor secundário, sem perda de dados.
  * Soluções de backup **:** Proteja contra problemas de integridade de dados (como ransomware ou exclusão acidental). Como o HA replica as alterações instantaneamente, ele replicará fielmente um vírus ou um registro de banco de dados excluído para o servidor de espera. Um backup permite que você "volte no tempo" para um ponto anterior à ocorrência da corrupção.
  * **A abordagem híbrida:** Para máxima resiliência, as organizações utilizam uma **arquitetura híbrida de 3 nós** . Isso inclui um cluster local de 2 nós com replicação síncrona para alta disponibilidade imediata e uma terceira cópia remota (assíncrona) para recuperação de desastres. Essa defesa em camadas garante que você tenha uma cópia "ativa" para recuperação instantânea e uma cópia "histórica" para segurança dos dados.



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}