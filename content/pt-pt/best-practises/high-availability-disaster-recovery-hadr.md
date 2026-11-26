---
title: "Combinando a Alta Disponibilidade SafeKit com as Cópias de Segurança para Recuperação de Desastres"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/high-availability-disaster-recovery-hadr/"
description: "Construa uma estratégia de HA/DR resiliente combinando SafeKit para replicação síncrona (RPO = 0) com cópias de segurança assíncronas para recuperação de desastres fora do local. Garanta a disponibilidade da aplicação 24/7 e a integridade dos dados no Windows e Linux com esta abordagem de dupla camada."
category: "best-practises"
lang: "pt-pt"
topics: "Replicação Síncrona SafeKit para Alta Disponibilidade (HA) vs. Replicação Assíncrona de Backup para Recuperação de Desastres (DR), Índice, HADR Síncrono: Perda de Dados Zero em Redes Rápidas (LAN/VLAN), HADR assíncrono: Recuperação de desastres em redes lentas (WAN), Como combinar HADR e cópias de segurança para uma resiliência total do sistema, Comparação de Arquiteturas HADR: Redes Rápidas vs. Lentas, Guia em Vídeo: Como Implementar HADR com SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# Combinando a Alta Disponibilidade SafeKit com as Cópias de Segurança para Recuperação de Desastres {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Replicação Síncrona SafeKit para Alta Disponibilidade (HA) vs. Replicação Assíncrona de Backup para Recuperação de Desastres (DR) {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit oferece uma **arquitetura flexível de Alta Disponibilidade e Recuperação de Desastres (HADR)** baseada em software, que elimina a necessidade de armazenamento partilhado dispendioso. Ao implementar **a replicação síncrona** através de uma VLAN estendida entre o Servidor 1 e o Servidor 2, SafeKit garante que as suas aplicações críticas permanecem "ativas" e consistentes entre dois locais redundantes.

Para resolver as limitações das WANs de baixa largura de banda, SafeKit foi concebido para ser emparelhado com **soluções de cópia de segurança e recuperação**. Isto permite que as organizações mantenham o tempo de atividade 24/7 através de failover automático, ao mesmo tempo que protegem os dados históricos para recuperação de desastres fora do local.

Consequentemente, o ambiente é protegido contra falhas de hardware ou software através do SafeKit, e está seguro contra erros lógicos e ameaças cibernéticas como o ransomware através da solução de cópia de segurança.


![Um diagrama técnico que mostra por que a Alta Disponibilidade (SafeKit) e as Cópias de Segurança são complementares: SafeKit lida com failover de hardware/software através de replicação síncrona, enquanto a cópia de segurança assíncrona protege contra ransomware e erros lógicos.](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**Alta disponibilidade com SafeKit e recuperação de desastres com cópias de segurança**

## Índice {#table-of-contents}

  * [HADR Síncrono: Perda de Dados Zero em Redes Rápidas (LAN/VLAN)](#synchronous-hadr-fast-network)
  * [HADR assíncrono: Recuperação de desastres em redes lentas (WAN)](#asynchronous-hadr-slow-network)
  * [Como combinar HADR e cópias de segurança para uma resiliência total do sistema](#hadr-resilience-strategy)
  * [Comparação de Arquiteturas HADR: Redes Rápidas vs. Lentas](#hadr-architectures-comparison)
  * [Guia em Vídeo: Como Implementar HADR com SafeKit](#videoguide-hadr-safekit)
  * [🔍 Explore SafeKit](#hub)



{{%  insert-safekit-4-buttons-pt-pt  %}}
 

## HADR Síncrono: Perda de Dados Zero em Redes Rápidas (LAN/VLAN) {#synchronous-hadr-fast-network}

### Como implementar o HADR numa rede rápida? {#hadr-fast-network-architecture}


![Arquitetura que combina Alta Disponibilidade e Recuperação de Desastres (HADR) sem discos partilhados](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Para implementar HADR numa rede rápida, implemente dois nós em locais remotos para fornecer Alta Disponibilidade e Recuperação de Desastres simultaneamente. Esta configuração garante que a sua aplicação permanece disponível mesmo que um local inteiro falhe, sem a complexidade de uma infraestrutura de armazenamento partilhado.

### Por que usar uma solução SANless HADR para redes rápidas? {#sanless-hadr-solution}

Uma solução sem SAN, como SafeKit é essencial porque replica dados de forma síncrona e em tempo real entre dois nós sem discos partilhados. Como a replicação síncrona garante zero perda de dados (RPO = 0), o software pode acionar um failover automático da aplicação instantaneamente se ocorrer uma falha de hardware ou software.

### Quais são os requisitos de rede para o HADR síncrono? {#extended-lan-vlan-requirements}

A HADR síncrona requer uma LAN estendida ou uma VLAN estendida por três razões críticas:

  * **Failover de IP virtual:** É necessária uma única sub-rede. O [endereço IP virtual](</pt-pt/best-practises/how-a-virtual-ip-address-works/>) pode então mover-se automaticamente entre os nós.
  * **Baixa latência:** [A replicação síncrona](</pt-pt/best-practises/synchronous-replication-vs-asynchronous-replication/>) sem perda de dados requer normalmente um tempo de ida e volta da rede inferior a 5 ms.
  * **Elevada largura de banda:** É necessária uma ligação de 1 Gb/s ou superior para garantir uma rápida ressincronização de dados durante uma failback.


## HADR assíncrono: Recuperação de desastres em redes lentas (WAN) {#asynchronous-hadr-slow-network}

### Como implementar o HADR numa rede lenta? {#hadr-slow-network-architecture}


![Arquitetura HADR que separa a Alta Disponibilidade da Recuperação de Desastres](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Para implementar HADR numa rede lenta (WAN), a arquitetura normalmente separa **a Alta Disponibilidade** da **Recuperação de Desastres**. Neste cenário, dois nós são implementados no local principal para redundância local, enquanto uma estratégia de cópia de segurança ou replicação assíncrona separada é usada para proteger os dados num local remoto distante.

### Qual é a melhor solução HADR para ligações de baixa largura de banda? {#sanless-ha-with-remote-dr}

A solução ideal envolve a implementação **SafeKit** no local principal para Alta Disponibilidade local, utilizando replicação síncrona em tempo real e failover automático. Para o local de recuperação de desastres, os dados são protegidos através de replicação assíncrona ou cópias de segurança programadas através da rede lenta, garantindo que o tempo de atividade local é mantido sem ser estrangulado pela latência da WAN. Para alcançar esta arquitetura, é necessária uma **solução de cópia de segurança** dedicada (que não SafeKit) para gerir a transferência e restauração de dados no local remoto. 

### Como funciona failover com um site de recuperação de desastres remoto? {#dr-site-failover-process}

Uma vez que a replicação assíncrona através de uma rede lenta envolve potencial perda de dados (RPO > 0), o processo de failover para um site de recuperação de desastres é normalmente manual e gerido por um administrador:

  * **Restauração de Dados:** As cópias de segurança são restauradas em servidores secundários no local de recuperação de desastres. As soluções modernas restauram máquinas virtuais (VMs) rapidamente para reduzir o tempo de recuperação. Um exemplo é o **Veeam**.
  * **Redirecionamento de DNS:** O tráfego é redirecionado para o site de recuperação de desastres ao nível do DNS. O tempo de recuperação depende dos tempos limite da cache de DNS (TTL), e algumas aplicações cliente podem necessitar de reinicialização para reconhecer o novo endereço IP.
  * **Decisão Manual:** Um administrador deve verificar a integridade dos dados no local remoto antes de autorizar a mudança para o centro de dados secundário.


## Como combinar HADR e cópias de segurança para uma resiliência total do sistema {#hadr-resilience-strategy}

### Comparando a Alta Disponibilidade e a Cópia de Segurança de Dados {#ha-vs-backup-comparison}


![Logótipo do software de alta disponibilidade SafeKit](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![Ícone da estratégia de cópia de segurança de dados](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Embora ambas sejam cruciais para a proteção de dados, **a Alta Disponibilidade (HA)** e **as Soluções de Backup** visam riscos diferentes. **A Alta Disponibilidade**, impulsionada pelo SafeKit, fornece um mecanismo failover "em tempo real" para manter as aplicações acessíveis durante interrupções do servidor ou falhas de hardware. Por outro lado, uma **Solução de Backup** atua como um arquivo "histórico". Enquanto a HA garante 99,99% de disponibilidade do sistema ao replicar dados em tempo real, o backup foca-se na integridade dos dados, fornecendo os pontos de restauração necessários para recuperar de erros lógicos, exclusões acidentais ou ataques de ransomware.

### A Alta Disponibilidade é um substituto para uma estratégia de Cópia de Segurança? {#ha-vs-backup-ransomware}

Não, a Alta Disponibilidade e as cópias de segurança são complementares, não intercambiáveis. Embora **SafeKit** garanta **a continuidade do negócio** ao manter as aplicações em funcionamento durante uma falha de hardware, não protege contra erros lógicos, exclusões acidentais ou ataques de ransomware. Por exemplo, como a replicação em tempo real espelha todas as alterações instantaneamente, um ataque de ransomware no nó primário será imediatamente duplicado no nó secundário. Para recuperar de tais ameaças cibernéticas ou exclusões acidentais, é necessária uma **solução de cópia de segurança** dedicada com uma política de retenção robusta. Isto permite "retroceder" o seu ambiente a um estado íntegro anterior à ocorrência da corrupção.

### Otimização RTO e RPO: A sinergia entre a alta disponibilidade e a cópia de segurança {#ha-backup-rpo-rto}

Para construir uma infraestrutura verdadeiramente resiliente, é preciso integrar a Alta Disponibilidade e a cópia de segurança numa estratégia unificada. Estas duas tecnologias abordam diferentes dimensões do Objetivo de Tempo de Recuperação (RTO) e do Objetivo de Ponto de Recuperação (RPO). Para mais detalhes, consulte [RTO e RPO com exemplos](</pt-pt/best-practises/what-is-rpo-and-rto-with-examples/>).

  * **Alta Disponibilidade (via SafeKit):** O seu objetivo é **a Recuperação Instantânea**. SafeKit mantém uma cópia síncrona e ativa do seu ambiente. O seu RTO é próximo de zero. O seu RPO é zero. Se um servidor falhar, a aplicação é reiniciada no nó secundário imediatamente, garantindo que não haja interrupção de serviço ou perda de dados durante a transição.
  * **Soluções de Cópia de Segurança:** O seu objetivo é **a Resiliência dos Dados**. Enquanto a HA mantém o serviço "ativo", a cópia de segurança cria um histórico "imutável". A cópia de segurança é a sua rede de segurança quando os próprios dados ativos são comprometidos. Permite-lhe restaurar uma versão limpa da sua base de dados a partir de um ponto específico no tempo, antes que um vírus ou uma eliminação acidental ocorresse.


## Comparação de Arquiteturas HADR: Redes Rápidas vs. Lentas {#hadr-architectures-comparison}

Critérios | Rede Rápida (LAN/VLAN) | Rede Lenta (WAN)  
---|---|---  
Âmbito Principal | Redundância Local e Alta Disponibilidade | Recuperação de Desastres entre Sites  
Caso de Uso | Mesmo Centro de Dados ou Campus | Centros de Dados Remotos ou Regiões de Nuvem  
Tipo de Replicação | Síncrono (em tempo real) | Assíncrono / Cópia de Segurança  
RPO (Perda de Dados) | Zero (RPO = 0) | Potencial perda de dados (RPO > 0)  
Processo failover | Automático | Manual (Decisão Admin)  
Redirecionamento de Tráfego | Endereço IP Virtual (VIP) | Nível de DNS (dependente do TTL)  
Requisito de Latência | Baixo (normalmente < 5ms) | Suporta alta latência  
Objetivo Principal de Recuperação | Continuidade Imediata do Negócio | Segurança e Retenção de Dados  
  
## Guia em Vídeo: Como Implementar HADR com SafeKit {#videoguide-hadr-safekit}

###  Como Implementar HADR com SafeKit: Replicação Síncrona e failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Aprenda a combinar **a Alta Disponibilidade (HA)** e **a Recuperação de Desastres (DR)** numa única estratégia HADR usando SafeKit. Este guia em vídeo explora a arquitetura necessária para 100% de tempo de atividade da aplicação, sem a necessidade de discos partilhados.

### Destaques do Vídeo {#video-highlights}

  1. 🎬 [Introdução ao SafeKit HADR em VLANs Estendidas](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [Como funcionam o espelhamento síncrono e o duplo reconhecimento](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [Mecanismos failover: ARP Gratuito (GARP) e IP Virtual](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [Projetar para WAN Lenta: Estratégias de Alta Disponibilidade vs. Backup](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### Vídeo SafeKit: Como implementar Alta Disponibilidade e Recuperação de Desastres (HADR) com SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}