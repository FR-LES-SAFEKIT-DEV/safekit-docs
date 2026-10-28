---
title: "Combinando a alta disponibilidade SafeKit com backups de recuperação de desastres."
canonical: "https://safekit.eviden.com/pt-pt/best-practises/high-availability-disaster-recovery-hadr/"
description: "Crie uma estratégia de alta disponibilidade/recuperação de desastres resiliente combinando SafeKit para replicação síncrona (RPO=0) com backup assíncrono para recuperação de desastres fora do local. Garanta disponibilidade ininterrupta do aplicativo e integridade dos dados em Windows e Linux com essa abordagem de dupla camada."
category: "best-practises"
lang: "pt-pt"
topics: "Replicação síncrona SafeKit para alta disponibilidade vs. Replicação de backup assíncrona para recuperação de desastres, Sumário, HADR síncrono: Zero perda de dados em redes rápidas (LAN/VLAN), HADR assíncrono: Recuperação de desastres em redes lentas (WAN), Como combinar HADR e backup para resiliência total do sistema, Comparação de arquiteturas HADR: redes rápidas vs. lentas, Guia em vídeo: Como implementar HADR com SafeKit , 🔍 Hub de navegação de alta disponibilidade SafeKit"
---

# Combinando a alta disponibilidade SafeKit com backups de recuperação de desastres {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Replicação síncrona SafeKit para alta disponibilidade versus replicação de backup assíncrona para recuperação de desastres {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit oferece uma arquitetura flexível **Alta Disponibilidade e Recuperação de Desastres (HADR) baseada** software **que elimina a necessidade de armazenamento compartilhado dispendioso. Ao implementar a replicação síncrona** em uma VLAN estendida entre o Servidor 1 e o Servidor 2, SafeKit garante que seus aplicativos críticos permaneçam ativos e consistentes entre dois sites redundantes.

Para lidar com as limitações de WANs de baixa largura de banda, SafeKit foi projetado para ser usado em conjunto com as soluções de backup e recuperação **** . Isso permite que as organizações mantenham disponibilidade 24 horas por dia, 7 dias por semana, por meio de failover automático, ao mesmo tempo que protegem os dados históricos para recuperação de desastres fora do local.

Consequentemente, o ambiente fica protegido contra falhas de hardware ou software por meio do SafeKit e protegido contra erros lógicos e ameaças cibernéticas como ransomware por meio da solução de backup.


![ Um diagrama técnico mostrando por que a Alta Disponibilidade ( SafeKit ) e os Backups são complementares: SafeKit lida com falhas de hardware/software por meio de replicação síncrona, enquanto o backup assíncrono protege contra ransomware e erros lógicos. ](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**Alta disponibilidade vs. Backup: Combinando SafeKit Replicação síncrona com recuperação de desastres assíncrona**

## Índice {#table-of-contents}

  * [ HADR Síncrono: Zero Perda de Dados em Redes Rápidas (LAN/VLAN) ](#synchronous-hadr-fast-network)
  * [ HADR Assíncrono: Recuperação de Desastres em Redes Lentas (WAN) ](#asynchronous-hadr-slow-network)
  * [ Como combinar HADR e backup para resiliência total do sistema ](#hadr-resilience-strategy)
  * Comparação de arquiteturas [ : redes rápidas vs. ](#hadr-architectures-comparison)
  * Guia em vídeo [ : Como implementar HADR com SafeKit ](#videoguide-hadr-safekit)
  * [ 🔍 SafeKit Hub de Navegação de Alta Disponibilidade ](#hub)



{{%  insert-safekit-4-buttons-pt-pt  %}}
 

## HADR Síncrono: Zero Perda de Dados em Redes Rápidas (LAN/VLAN) {#synchronous-hadr-fast-network}

### Como implementar HADR em uma rede rápida? {#hadr-fast-network-architecture}


Arquitetura ![ que combina Alta Disponibilidade e Recuperação de Desastres (HADR) sem discos compartilhados ](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Para implementar HADR em uma rede de alta velocidade, implante dois nós em locais remotos para fornecer alta disponibilidade e recuperação de desastres simultaneamente. Essa configuração garante que seu aplicativo permaneça disponível mesmo se um site inteiro falhar, sem a complexidade de uma infraestrutura de armazenamento compartilhada.

### Por que usar uma solução HADR sem SAN para redes rápidas? {#sanless-hadr-solution}

Uma solução sem SAN, como SafeKit é essencial porque replica dados de forma síncrona e em tempo real entre dois nós sem a necessidade de discos compartilhados. Como a replicação síncrona garante zero perda de dados (RPO=0), o software pode acionar um failover automático do aplicativo instantaneamente caso ocorra uma falha de hardware ou software.

### Quais são os requisitos de rede para HADR síncrono? {#extended-lan-vlan-requirements}

O HADR síncrono requer uma LAN estendida ou uma VLAN estendida por três motivos críticos:

  * Failover de IP virtual **:** ](</pt-pt/best-practises/how-a-virtual-ip-address-works/>) [ os nós.
  * **Baixa Latência:** [ Replicação síncrona ](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>) sem perda de dados normalmente requer um tempo de ida e volta da rede inferior a 5ms.
  * **Alta largura de banda:** É necessária uma conexão de 1 Gb/s ou superior para garantir a ressincronização rápida dos dados durante uma falha de recuperação.


## HADR Assíncrono: Recuperação de Desastres em Redes Lentas (WAN) {#asynchronous-hadr-slow-network}

### Como implementar HADR em uma rede lenta? {#hadr-slow-network-architecture}


![ Arquitetura HADR que separa Alta Disponibilidade de Recuperação de Desastres ](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Para implementar HADR em uma rede lenta (WAN), a arquitetura normalmente separa a Alta Disponibilidade ( **** da Recuperação de Desastres **e da Recuperação de Desastres** . Nesse cenário, dois nós são implantados no site primário para redundância local, enquanto uma estratégia separada de backup ou replicação assíncrona é usada para proteger os dados em um site remoto distante.

### Qual é a melhor solução HADR para conexões de baixa largura de banda? {#sanless-ha-with-remote-dr}

A solução ideal envolve a implementação **SafeKit** no site primário para alta disponibilidade local, utilizando replicação síncrona em tempo real e failover automático. Para o site de recuperação de desastres, os dados são protegidos por meio de replicação assíncrona ou backups agendados através da rede lenta, garantindo que o tempo de atividade local seja mantido sem ser limitado pela latência da WAN. Para alcançar essa arquitetura, uma solução de backup dedicada **(diferente SafeKit** é necessária para gerenciar a transferência e restauração de dados no site remoto. 

### Como funciona o failover em um site remoto de recuperação de desastres? {#dr-site-failover-process}

Como a replicação assíncrona em uma rede lenta envolve potencial perda de dados (RPO > 0), o processo de failover para um site de recuperação de desastres é normalmente manual e gerenciado por um administrador:

  * Restauração de dados **: Os backups** são restaurados em servidores secundários no site de recuperação de desastres. Soluções modernas como o Veeam **** são frequentemente usadas para restaurar máquinas virtuais (VMs) rapidamente, reduzindo o tempo de recuperação.
  * Redirecionamento de DNS **: O tráfego** é redirecionado para o site de recuperação de desastres (DR) no nível do DNS. O tempo de recuperação depende dos tempos limite (TTL) do cache DNS, e alguns aplicativos cliente podem precisar ser reiniciados para obter o novo endereço IP.
  * Decisão manual **:** Um administrador deve verificar a integridade dos dados no site remoto antes de autorizar a mudança para o centro de dados secundário.


## Como combinar HADR e backup para resiliência total do sistema {#hadr-resilience-strategy}

### Comparando Alta Disponibilidade e Backup de Dados {#ha-vs-backup-comparison}


![ SafeKit logotipo de software de alta disponibilidade ](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![ Ícone da estratégia de backup de dados ](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Embora ambos sejam essenciais para **proteção de dados, as soluções** **** diferentes. **Alta Disponibilidade** , com tecnologia SafeKit , fornece um mecanismo de failover "ao vivo" para manter os aplicativos acessíveis durante interrupções do servidor ou falhas de hardware. Por outro lado, uma solução de Backup **atua como um arquivo "histórico". Enquanto a** garante 99,99% de disponibilidade do sistema replicando dados em tempo real, o backup concentra-se na integridade dos dados, fornecendo os pontos de restauração necessários para recuperação de erros lógicos, exclusões acidentais ou ataques de ransomware.

### A alta disponibilidade substitui uma estratégia de backup? {#ha-vs-backup-ransomware}

Não, alta disponibilidade e backups são complementares, não intercambiáveis. Embora **SafeKit** garanta a continuidade dos negócios **** ao manter os aplicativos em execução durante uma falha de hardware, ele não protege contra erros lógicos, exclusões acidentais ou ataques de ransomware. Por exemplo, como a replicação em tempo real espelha instantaneamente cada alteração, um ataque de ransomware no nó primário será imediatamente duplicado no nó secundário. Para se recuperar de tais ameaças cibernéticas ou exclusões acidentais, você precisa de uma solução de backup **** dedicada com uma política de retenção robusta. Isso permite que você "retorne" seu ambiente a um estado íntegro anterior à ocorrência da corrupção.

### Otimizando RTO e RPO: A sinergia entre alta disponibilidade e backup {#ha-backup-rpo-rto}

Para construir uma infraestrutura verdadeiramente resiliente, é preciso integrar alta disponibilidade e backup em uma estratégia unificada. Essas duas tecnologias abordam diferentes dimensões da equação [ RTO (Recovery Time Objective) e ](</pt-pt/best-practises/what-is-rpo-and-rto-with-examples/>) (Recovery Point Objective): 

  * Alta disponibilidade **(via SafeKit ):** Alvos **Recuperação instantânea** . Ao manter um mirror ativo e síncrono do seu ambiente, SafeKit alcança RTO e RPO próximos de zero. Se um servidor falhar, o aplicativo é retomado imediatamente no nó secundário, garantindo que não haja interrupção de serviço ou perda de dados durante a transição.
  * Soluções de backup **: Destino** Resiliência de dados **** . Enquanto a alta disponibilidade (HA) mantém o serviço "ativo", o backup cria um histórico "imutável". Ele serve como plano B para quando os dados ativos são comprometidos, permitindo restaurar uma versão limpa do banco de dados a partir de um ponto específico no tempo, anterior à ocorrência de um vírus ou exclusão acidental.


## Comparação de arquiteturas HADR: redes rápidas vs. lentas {#hadr-architectures-comparison}

Critérios | Rede rápida (LAN/VLAN) | Rede lenta (WAN)  
---|---|---  
Escopo principal: | Redundância local e alta disponibilidade; | Recuperação de desastres entre sites.  
Caso de uso | Mesmo data center ou campus; | Data centers remotos ou regiões de nuvem  
Tipo de replicação: | Síncrono (em tempo real) | Assíncrono/Backup  
RPO (Perda de Dados) | Zero (RPO = 0) | Perda potencial de dados (RPO > 0)  
Processo de failover | Automático | Manual (Decisão do administrador)  
Redirecionamento de tráfego | Endereço IP virtual (VIP) | Nível de DNS (dependente de TTL)  
Requisito de latência: | Baixo (normalmente < 5 ms) | Suporta alta latência  
Objetivo Primário de Recuperação | Continuidade Imediata dos Negócios; | Segurança e Retenção de Dados.  
  
## Guia em vídeo: Como implementar HADR com SafeKit {#videoguide-hadr-safekit}

###  Como implementar HADR com SafeKit : Replicação síncrona e failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Aprenda como combinar a Alta Disponibilidade (HA) **SafeKit** **** em vídeo explora a arquitetura necessária para 100% de disponibilidade da aplicação sem a necessidade de discos compartilhados.

### Vídeo em destaque {#video-highlights}

  1. 🎬 [ Introdução ao SafeKit HADR sobre VLANs estendidas ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [ Como funcionam o espelhamento síncrono e o reconhecimento duplo (1:41) ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. 🎬 Mecanismos de Failover [ : ARP Gratuito (GARP) e IP Virtual ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [ Projetando para WAN lenta: estratégias de alta disponibilidade vs. backup ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### Vídeo SafeKit : Como implementar Alta Disponibilidade e Recuperação de Desastres (HADR) com SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}

&amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}