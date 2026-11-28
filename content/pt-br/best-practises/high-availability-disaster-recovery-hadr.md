---
title: "Alta disponibilidade e recuperação de desastres com SafeKit"
canonical: "https://safekit.eviden.com/pt-br/best-practises/high-availability-disaster-recovery-hadr/"
description: "Combine a alta disponibilidade do SafeKit (replicação síncrona, RPO 0) com backups assíncronos para recuperação de desastres externa no Windows e Linux."
category: "best-practises"
lang: "pt-br"
topics: "Replicação Síncrona SafeKit para HA vs. Replicação de Backup Assíncrona para DR, Índice, HADR Síncrono: Perda de Dados Zero em Redes Rápidas (LAN/VLAN), HADR assíncrono: recuperação de desastres em redes lentas (WAN), Como combinar HADR e backup para resiliência total do sistema, Comparação de Arquiteturas HADR: Redes Rápidas vs. Lentas, Guia em vídeo: Como implementar HADR com SafeKit"
hashpart: "synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr, table-of-contents, synchronous-hadr-fast-network, asynchronous-hadr-slow-network, hadr-resilience-strategy, hadr-architectures-comparison, videoguide-hadr-safekit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# Alta disponibilidade e recuperação de desastres com SafeKit {#high-availability-and-disaster-recovery-with-safekit}

## Replicação Síncrona SafeKit para HA vs. Replicação de Backup Assíncrona para DR {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit oferece uma **arquitetura flexível de Alta Disponibilidade e Recuperação de Desastres (HADR)** baseada em software que elimina a necessidade de armazenamento compartilhado caro. Ao implementar **a replicação síncrona** em uma VLAN estendida entre o Servidor 1 e o Servidor 2, SafeKit garante que seus aplicativos críticos permaneçam "ativos" e consistentes entre dois sites redundantes.

Para lidar com as restrições de WANs de menor largura de banda, SafeKit foi projetado para ser combinado com **soluções de backup e recuperação**. Isso permite que as organizações mantenham o tempo de atividade 24 horas por dia, 7 dias por semana, por meio failover automático, ao mesmo tempo em que protegem os dados históricos para recuperação de desastres fora do local.

Consequentemente, o ambiente é protegido contra falhas de hardware ou software por meio do SafeKit e protegido contra erros lógicos e ameaças cibernéticas, como ransomware, por meio da solução de backup.


![Um diagrama técnico que mostra por que a alta disponibilidade (SafeKit) e os backups são complementares: SafeKit lida com failover de hardware/software por meio de replicação síncrona, enquanto o backup assíncrono protege contra ransomware e erros lógicos.](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**Alta disponibilidade com SafeKit e recuperação de desastres com backups**

## Índice {#table-of-contents}

  * [HADR Síncrono: Perda de Dados Zero em Redes Rápidas (LAN/VLAN)](#synchronous-hadr-fast-network)
  * [HADR assíncrono: recuperação de desastres em redes lentas (WAN)](#asynchronous-hadr-slow-network)
  * [Como combinar HADR e backup para resiliência total do sistema](#hadr-resilience-strategy)
  * [Comparação de Arquiteturas HADR: Redes Rápidas vs. Lentas](#hadr-architectures-comparison)
  * [Guia em vídeo: Como implementar HADR com SafeKit](#videoguide-hadr-safekit)
  * [🔍 Explore SafeKit](#hub)



{{%  insert-safekit-4-buttons-pt-br  %}}
 

## HADR Síncrono: Perda de Dados Zero em Redes Rápidas (LAN/VLAN) {#synchronous-hadr-fast-network}

### Como implementar o HADR em uma rede de alta velocidade? {#hadr-fast-network-architecture}


![Arquitetura que combina alta disponibilidade e recuperação de desastres (HADR) sem discos compartilhados](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Para implementar o HADR em uma rede rápida, implante dois nós em locais remotos para fornecer alta disponibilidade e recuperação de desastres simultaneamente. Essa configuração garante que seu aplicativo permaneça disponível mesmo se um site inteiro falhar, sem a complexidade de uma infraestrutura de armazenamento compartilhado.

### Por que usar uma solução HADR sem SAN para redes rápidas? {#sanless-hadr-solution}

Uma solução SANless como SafeKit é essencial porque replica dados de forma síncrona e em tempo real entre dois nós sem discos compartilhados. Como a replicação síncrona garante zero perda de dados (RPO = 0), o software pode acionar um failover automático da aplicação instantaneamente se ocorrer uma falha de hardware ou software.

### Quais são os requisitos de rede para o HADR síncrono? {#extended-lan-vlan-requirements}

O HADR síncrono requer uma LAN estendida ou uma VLAN estendida por três motivos críticos:

  * **Failover de IP virtual:** é necessária uma única sub-rede. O [endereço IP virtual](</pt-br/best-practises/how-a-virtual-ip-address-works/>) pode então ser movido automaticamente entre os nós.
  * **Baixa latência:** [a replicação síncrona](</pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/>) sem perda de dados geralmente requer um tempo de ida e volta da rede inferior a 5 ms.
  * **Alta largura de banda:** é necessária uma conexão de 1 Gb/s ou mais para garantir a ressincronização rápida dos dados durante um failback.


## HADR assíncrono: recuperação de desastres em redes lentas (WAN) {#asynchronous-hadr-slow-network}

### Como implementar o HADR em uma rede lenta? {#hadr-slow-network-architecture}


![Arquitetura HADR que separa a alta disponibilidade da recuperação de desastres](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Para implementar o HADR em uma rede lenta (WAN), a arquitetura normalmente separa **a alta disponibilidade** da **recuperação de desastres**. Nesse cenário, dois nós são implantados no local principal para redundância local, enquanto uma estratégia de backup separada ou de replicação assíncrona é usada para proteger os dados em um local remoto distante.

### Qual é a melhor solução HADR para conexões de baixa largura de banda? {#sanless-ha-with-remote-dr}

A solução ideal envolve a implantação **SafeKit** no site principal para alta disponibilidade local, usando replicação síncrona em tempo real e failover automático. Para o site de recuperação de desastres, os dados são protegidos por meio de replicação assíncrona ou backups programados através da rede lenta, garantindo que o tempo de atividade local seja mantido sem ser prejudicado pela latência da WAN. Para atingir essa arquitetura, é necessária uma **solução de backup** dedicada (que não seja SafeKit) para gerenciar a transferência e restauração de dados no site remoto. 

### Como funciona failover com um site de recuperação de desastres remoto? {#dr-site-failover-process}

Como a replicação assíncrona em uma rede lenta envolve potencial perda de dados (RPO > 0), o processo failover para um site de recuperação de desastres é normalmente manual e gerenciado por um administrador:

  * **Restauração de dados:** os backups são restaurados em servidores secundários no local de DR. As soluções modernas restauram máquinas virtuais (VMs) rapidamente para reduzir o tempo de recuperação. Um exemplo é o **Veeam**.
  * **Redirecionamento de DNS:** o tráfego é redirecionado para o site de DR no nível do DNS. O tempo de recuperação depende dos tempos limite do cache de DNS (TTL), e alguns aplicativos cliente podem exigir uma reinicialização para obter o novo endereço IP.
  * **Decisão manual:** um administrador deve verificar a integridade dos dados no local remoto antes de autorizar a mudança para o centro de dados secundário.


## Como combinar HADR e backup para resiliência total do sistema {#hadr-resilience-strategy}

### Comparando Alta Disponibilidade e Backup de Dados {#ha-vs-backup-comparison}


![Logotipo do software de alta disponibilidade SafeKit](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![Ícone da estratégia de backup de dados](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Embora ambos sejam essenciais para a proteção de dados, **a Alta Disponibilidade (HA)** e **as Soluções de Backup** visam riscos diferentes. **A Alta Disponibilidade**, desenvolvida pelo SafeKit, oferece um mecanismo failover "ao vivo" para manter os aplicativos acessíveis durante interrupções do servidor ou falhas de hardware. Por outro lado, uma **Solução de Backup** atua como um arquivo "histórico". Enquanto a HA garante 99,99% de disponibilidade do sistema replicando dados em tempo real, o backup se concentra na integridade dos dados, fornecendo os pontos de restauração necessários para se recuperar de erros lógicos, exclusões acidentais ou ataques de ransomware.

### A alta disponibilidade substitui uma estratégia de backup? {#ha-vs-backup-ransomware}

Não, a alta disponibilidade e os backups são complementares, não intercambiáveis. Embora **SafeKit** garanta **a continuidade dos negócios** mantendo os aplicativos em execução durante uma falha de hardware, ele não protege contra erros lógicos, exclusões acidentais ou ataques de ransomware. Por exemplo, como a replicação em tempo real espelha cada alteração instantaneamente, um ataque de ransomware no nó primário será imediatamente duplicado no nó secundário. Para se recuperar de tais ameaças cibernéticas ou exclusões acidentais, você precisa de uma **solução de backup** dedicada com uma política de retenção robusta. Isso permite que você "retorne" seu ambiente a um estado íntegro de antes da ocorrência da corrupção.

### Otimizando RTO e RPO: a sinergia entre alta disponibilidade e backup {#ha-backup-rpo-rto}

Para construir uma infraestrutura verdadeiramente resiliente, você deve integrar alta disponibilidade e backup em uma estratégia unificada. Essas duas tecnologias abordam diferentes dimensões do Objetivo de Tempo de Recuperação (RTO) e do Objetivo de Ponto de Recuperação (RPO). Para mais detalhes, consulte [RTO e RPO com exemplos](</pt-br/best-practises/what-is-rpo-and-rto-with-examples/>).

  * **Alta Disponibilidade (via SafeKit):** O objetivo é **a Recuperação Instantânea**. SafeKit mantém uma cópia síncrona e ativa do seu ambiente. O RTO é próximo de zero. O RPO é zero. Se um servidor falhar, a aplicação é retomada no nó secundário imediatamente, garantindo que não haja interrupção de serviço ou perda de dados durante a transição.
  * **Soluções de backup:** O objetivo delas é **a resiliência dos dados**. Enquanto a alta disponibilidade mantém o serviço "ativo", o backup cria um histórico "imutável". O backup é a sua rede de segurança quando os dados ativos são comprometidos. Ele permite restaurar uma versão limpa do seu banco de dados de um ponto específico no tempo, antes que um vírus ou uma exclusão acidental ocorra.


## Comparação de Arquiteturas HADR: Redes Rápidas vs. Lentas {#hadr-architectures-comparison}

Critérios | Rede Rápida (LAN/VLAN) | Rede Lenta (WAN)  
---|---|---  
Escopo Principal | Redundância Local e Alta Disponibilidade | Recuperação de Desastres entre Sites  
Caso de Uso | Mesmo Data Center ou Campus | Centros de dados remotos ou regiões de nuvem  
Tipo de Replicação | Síncrono (em tempo real) | Assíncrono / Cópia de Segurança  
RPO (Perda de Dados) | Zero (RPO = 0) | Perda potencial de dados (RPO > 0)  
Processo failover | Automático | Manual (Decisão Admin)  
Redirecionamento de Tráfego | Endereço IP Virtual (VIP) | Nível de DNS (dependente do TTL)  
Requisito de Latência | Baixo (normalmente < 5ms) | Suporta alta latência  
Objetivo Principal de Recuperação | Continuidade de Negócios Imediata | Segurança e Retenção de Dados  
  
## Guia em vídeo: Como implementar HADR com SafeKit {#videoguide-hadr-safekit}

###  Como implementar HADR com SafeKit: replicação síncrona e failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Aprenda a combinar **Alta Disponibilidade (HA)** e **Recuperação de Desastres (DR)** em uma única estratégia HADR usando SafeKit. Este guia em vídeo explora a arquitetura necessária para 100% de tempo de atividade da aplicação sem a necessidade de discos compartilhados.

### Destaques do vídeo {#video-highlights}

  1. 🎬 [Introdução ao SafeKit HADR em VLANs Estendidas](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [Como funcionam o espelhamento síncrono e o duplo reconhecimento](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [Mecanismos failover: ARP Gratuito (GARP) e IP Virtual](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [Projetando para WAN Lenta: Estratégias de HA vs. Backup](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### Vídeo SafeKit: Como implementar Alta Disponibilidade e Recuperação de Desastres (HADR) com SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}