---
title: "Replicação síncrona versus assíncrona: como o SafeKit garante perda zero de dados?"
canonical: "https://safekit.eviden.com/pt-br/best-practises/synchronous-replication-vs-asynchronous-replication/"
description: "Compare replicação síncrona e assíncrona para continuidade dos negócios. Saiba como o SafeKit usa replicação síncrona em tempo real para garantir zero perda de dados (RPO=0) em clusters de alta disponibilidade e por que o assíncrono é mais adequado para recuperação de desastres de longa distância."
category: "best-practises"
lang: "pt-br"
topics: "Perda de dados ou não no failover de aplicativo com replicação síncrona ou assíncrona?, Índice, Como funciona a replicação assíncrona?, Como funciona a replicação síncrona?, Como funciona a replicação semissíncrona?, Veredicto final: Escolhendo a replicação correta para alta disponibilidade, Tabela de comparação: Síncrona vs. Estratégias de replicação em clusters de alta disponibilidade, 🔍 SafeKit High Availability Navigation Hub"
---

# Replicação síncrona versus assíncrona: como SafeKit garante perda zero de dados? {#synchronous-vs-asynchronous-replication-how-safekit-ensures-zero-data-loss}

## Perda de dados ou não no failover de aplicativo com replicação síncrona ou assíncrona? {#data-loss-risk-synchronous-vs-asynchronous-failover}

Há uma diferença significativa entre **replicação síncrona e replicação assíncrona**. Dependendo da escolha, você poderá sofrer perda de dados durante um failover de aplicativo. 

  * **Replicação síncrona**, conforme implementada pelo software [SafeKit](</pt-br/>), é essencial para **Alta disponibilidade (HA)**. Ele garante o failover de aplicativos transacionais sem perder um único byte: todos os dados confirmados no disco do servidor primário também estão presentes no disco do servidor secundário.
  * **Replicação assíncrona** normalmente é usada para **Backup e recuperação de desastres (DR)**. Há um risco de que os dados confirmados no disco do servidor primário possam ser perdidos no caso de uma falha porque ainda não foram copiados para o site remoto.
  * **A replicação semissíncrona** é uma solução alternativa em que os dados confirmados chegam ao servidor secundário, mas não são necessariamente gravados em seu disco.


É importante entender que essas soluções são **complementares**. Embora a replicação síncrona do SafeKit proteja seu ambiente contra falhas de hardware ou software para manter o tempo de atividade 24 horas por dia, 7 dias por semana, uma solução de backup protege seus dados históricos contra erros lógicos e ameaças cibernéticas como ransomware.

Para ajudá-lo a tomar a decisão certa ao escolher a melhor arquitetura para suas necessidades, explicamos abaixo os mecanismos técnicos e o impacto no failover de aplicativos.


![Diagrama de comparação entre replicação síncrona e assíncrona mostrando o risco de perda de dados durante o failover](/wp-content/uploads/2026/01/synchronous-asynchronous-replication-3-1024.jpg "w:512")

**Comparação do impacto da replicação síncrona e assíncrona na perda de dados durante o failover de aplicativos.**


{{%  insert-safekit-4-buttons-pt-br  %}}
 

## Índice {#table-of-contents}

  * [Perda de dados ou não em failover de aplicativo com replicação síncrona ou assíncrona?](#data-loss-risk-synchronous-vs-asynchronous-failover)
  * [Como funciona a replicação assíncrona?](#how-asynchronous-replication-works)
  * [Como funciona a replicação síncrona?](#how-synchronous-replication-works)
  * [Como funciona a replicação semissíncrona?](#how-semi-synchronous-replication-works)
  * [Veredicto final: Escolhendo a replicação correta para alta disponibilidade](#best-practices-synchronous-vs-asynchronous-replication)
  * [Tabela de comparação: síncrono vs. assíncrono vs. semi-síncrono](#comparison-synchronous-asynchronous-replication)
  * [Guia de vídeo: configurando replicação síncrona em tempo real e alta disponibilidade](#videoguide-synchronous-real-time-replication-ha)
  * [FAQ: estratégias de replicação em clusters de alta disponibilidade](#faq-replication-high-availability)
  * [SafeKit Hub de navegação de alta disponibilidade](#hub)


## Como funciona a replicação assíncrona? {#how-asynchronous-replication-works}

Na **replicação assíncrona** , o servidor primário reconhece as operações de gravação imediatamente, atualizando as réplicas posteriormente em **lotes agendados** com atraso. Essa dissociação supera os problemas de latência da **replicação de longa distância** , tornando-a uma estratégia preferida para **backups e recuperação de desastres** em locais remotos.

No entanto, esta eficiência introduz o desafio da **consistência** , onde o servidor secundário pode conter informações desatualizadas. Como a atualização secundária ocorre após a finalização da gravação primária, qualquer falha do servidor primário resultará na perda de **dados em trânsito**.

## Como funciona a replicação síncrona? {#how-synchronous-replication-works}

Com a **replicação síncrona** implementada pelo SafeKit, quando uma operação de E/S de disco é executada pelo aplicativo ou pelo cache do sistema de arquivos no servidor primário, o sistema garante a consistência dos dados por meio de um processo de confirmação dupla.

SafeKit aguarda a **reconhecimento de E/S** do disco local e do servidor secundário antes de enviar a confirmação final de volta ao aplicativo ou ao cache do sistema de arquivos. Este mecanismo síncrono é essencial para o **failover de aplicações transacionais** , garantindo que as transações sejam totalmente seguras em ambos os nós antes de serem consideradas confirmadas.

## Como funciona a replicação semissíncrona? {#how-semi-synchronous-replication-works}

**Replicação semissíncrona** serve como uma abordagem híbrida para integridade de dados. Assim como a replicação síncrona, o SafeKit aguarda uma confirmação dos servidores primário e secundário antes de confirmar a operação de E/S para o cache do aplicativo ou do sistema de arquivos.

A diferença crítica está no **tempo de resposta do servidor secundário**. No caso semissíncrono, o servidor secundário envia uma confirmação ao primário imediatamente após **receber os dados na memória** , enviando-os posteriormente para o disco. Por outro lado, a **replicação síncrona** exige que o servidor secundário grave a E/S no disco físico antes de enviar a confirmação.

## Veredicto final: Escolhendo a replicação correta para alta disponibilidade {#best-practices-synchronous-vs-asynchronous-replication}

A escolha entre **replicação síncrona ou assíncrona** é uma compensação entre integridade absoluta dos dados e desempenho da rede. Para infraestruturas de missão crítica, esta decisão determina diretamente seu **Objetivo de Ponto de Recuperação (RPO)**.

**Em resumo:**

  * **Replicação assíncrona**: o padrão ouro para **backup**, mas não para **alta disponibilidade**. Embora suporte conectividade de longa distância, há um risco inerente de perda de dados **porque os dados do nó secundário ficam atrás dos dados do nó primário.**
  * **Replicação síncrona:** o padrão ouro para **alta disponibilidade**, mas não para **backup**. Ele garante que os arquivos do nó secundário sejam um clone em tempo real do primário, garantindo **failover sem perda de dados**. 
  * **Replicação semissíncrona:** fornece um meio-termo de alto desempenho para **alta disponibilidade**. Ao confirmar os dados no nível da memória antes da gravação no disco, minimiza a latência enquanto mantém uma proteção de dados superior em comparação com métodos assíncronos. 


**⭐ Recomendação SafeKit:** Para aplicativos críticos, sempre priorize a **replicação síncrona ou semissíncrona** para garantir a continuidade dos negócios, maximizar o desempenho e eliminar os riscos associados ao failover inconsistente.

## Tabela de comparação: síncrono vs. assíncrono vs. semi-síncrono {#comparison-synchronous-asynchronous-replication}

Recurso | Síncrono | Semi-síncrono | Assíncrono  
---|---|---|---  
RPO (perda potencial de dados) | zero | zero | Diferente de zero (perda de dados: depende da última cópia assíncrona)  
Reconhecimento de E/S Remota | Após gravação remota no disco | Após gravação remota na RAM | Não espera reconhecimento  
Impacto no desempenho | Requer uma rede de baixa latência - Depende do tempo de ida e volta (normalmente RTT<5ms) | Requer uma rede de baixa latência - Depende do tempo de ida e volta (normalmente RTT<5ms) | Suporta rede de baixa latência  
Limites de distância | VLAN local/estendida | VLAN local/estendida | Rede de longa distância (WAN)  
Melhor para | Alta disponibilidade (failover automático) | Alta disponibilidade (failover automático) | Soluções de backup (failover manual)  
  
## Guia de vídeo: configurando replicação síncrona em tempo real e alta disponibilidade {#videoguide-synchronous-real-time-replication-ha}


{{%  insert-safekit-mirror-video-pt-br  %}}
 

## Perguntas frequentes: estratégias de replicação em clusters de alta disponibilidade {#faq-replication-high-availability}

### Tecnologia e mecânica de replicação {#replication-technology--mechanics}

#### SafeKit envia o arquivo completo pela rede sempre que é modificado? {#safekit-byte-level-replication-vs-full-file-transfer}

**Não.** SafeKit utiliza **replicação em nível de byte**. Ele intercepta modificações específicas de E/S dentro de arquivos e replica apenas os bytes alterados, minimizando o tráfego de rede.

#### A replicação é acionada sempre que o aplicativo grava em seus arquivos? {#safekit-synchronous-replication-timing}

**Não.** A replicação ocorre somente quando o aplicativo solicita uma **comprometimento de E/S** para o disco local. SafeKit garante que esses dados sejam reconhecidos pelo servidor secundário antes de concluir a gravação.

#### A replicação síncrona torna meu aplicativo mais lento? {#synchronous-replication-performance-impact}

A latência está vinculada ao **Tempo de ida e volta da rede (RTT)**. Em uma LAN, o impacto é insignificante (semelhante ao armazenamento NAS/SAN). Em WANs de alta latência, os modos assíncronos são frequentemente preferidos para evitar gargalos de desempenho e é necessária uma solução de backup (não SafeKit).

* * *

### Estratégia de implantação: HA vs. Backup {#deployment-strategy-ha-vs-backup}

#### Quando devo escolher replicação síncrona ou assíncrona? {#choosing-sync-vs-async}

Escolha **Síncrono** para alta disponibilidade (failover automático, zero perda de dados). Escolha **Assíncrono** para Backup/DR, onde a distância impede a sincronização em tempo real e o failover automático não é necessário.

#### SafeKit oferece suporte à replicação assíncrona? {#safekit-support-asynchronous}

**Não.** SafeKit é uma solução de alta disponibilidade que exige zero perda de dados para **failover automático**. Para necessidades puramente assíncronas, procure soluções de Backup.

#### A alta disponibilidade elimina a necessidade de uma solução de backup? {#high-availability-vs-backup}

**Não, a alta disponibilidade não elimina a necessidade de uma solução de backup abrangente.**

Embora soluções de replicação em tempo real como [SafeKit](</pt-br/>) forneçam continuidade contínua dos negócios, elas têm uma finalidade diferente dos backups. A replicação em tempo real foi projetada para proteger contra falhas de hardware e tempo de inatividade do servidor, mas não pode proteger contra ameaças cibernéticas, como ransomware que criptografa ambos os nós simultaneamente. Somente uma solução de backup com política de retenção pode resolver esse problema.

#### Como posso combinar replicação síncrona e assíncrona? {#combining-synchronous-asynchronous-replication}

Você pode usar uma **arquitetura híbrida de 3 nós**: um cluster local de 2 nós com replicação síncrona para HA e uma terceira cópia remota por meio de uma solução de backup com replicação assíncrona para recuperação de desastres.

**Consulte para obter mais informações:** [SafeKit Alta disponibilidade e recuperação de desastres (HADR)](</pt-br/best-practises/high-availability-disaster-recovery-hadr/>)


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}