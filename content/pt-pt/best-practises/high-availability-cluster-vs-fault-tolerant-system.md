---
title: "Cluster de alta disponibilidade versus sistema tolerante a falhas: escolhendo a estratégia de redundância adequada."
canonical: "https://safekit.eviden.com/pt-pt/best-practises/high-availability-cluster-vs-fault-tolerant-system/"
description: "Compare clusters de alta disponibilidade (HA) com sistemas tolerantes a falhas. Saiba como SafeKit propõe um cluster HA de software sem SAN que protege contra falhas de hardware e software. Reduza custos eliminando hardware FT especializado e garantindo zero perda de dados (RPO 0)."
category: "best-practises"
lang: "pt-pt"
topics: "Qual a diferença entre alta disponibilidade e tolerância a falhas? Prós e contras da alta disponibilidade e da tolerância a falhas. 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Cluster HA vs. Sistema Tolerante a Falhas: Escolhendo a Estratégia de Redundância Correta {#ha-cluster-vs-fault-tolerant-system-choosing-the-right-redundancy-strategy}

## Qual a diferença entre alta disponibilidade e tolerância a falhas? {#what-is-the-difference-between-high-availability-and-fault-tolerance}

### Visão geral {#overview}

Este artigo explora as vantagens e desvantagens de um cluster de alta disponibilidade versus um sistema tolerante a falhas, analisando limitações de hardware, falhas de software, RTO, RPO...

As tabelas comparativas a seguir explicam detalhadamente a diferença entre um sistema tolerante a falhas e SafeKit , um cluster de alta disponibilidade de software.

### O que é alta disponibilidade? {#what-is-high-availability}

Um cluster de alta disponibilidade é baseado em dois servidores com reinicialização da aplicação crítica em caso de falhas de hardware ou software. Existem dois tipos de clusters: clusters de hardware e clusters de software.

Os clusters de hardware são baseados em discos compartilhados, o que resulta em dependências entre os servidores e suas conexões com os conjuntos de discos compartilhados.

Clusters de software como SafeKit são baseados em replicação de dados em tempo real e são independentes de hardware: podem ser implementados em servidores físicos ou virtuais ou na nuvem.

### O que é tolerância a falhas? {#what-is-fault-tolerance}

Um sistema tolerante a falhas depende de hardware especializado ou de um hipervisor especializado para detectar uma falha de hardware e alternar instantaneamente para um componente de hardware redundante sem reiniciar o aplicativo.

Sistemas tolerantes a falhas lidam apenas com falhas de hardware e não com falhas de software, que são de longe a causa mais comum de inatividade do sistema.

## Prós e contras da alta disponibilidade e tolerância a falhas {#pros-and-cons-of-high-availability-and-fault-tolerance}

Ao proteger aplicações críticas contra falhas, existem duas abordagens principais: clustering de alta disponibilidade por software ** e sistemas tolerantes a falhas ** ** e ** ). Cada abordagem oferece diferentes vantagens e desvantagens em termos de custo, flexibilidade, tempo de recuperação e requisitos de hardware. Compreender essas diferenças ajuda a escolher a solução certa para as suas necessidades específicas.

Comparação de clusters ** alta disponibilidade de software versus sistemas tolerantes a falhas **

Critérios | Cluster de alta disponibilidade de software | Sistema tolerante a falhas  
---|---|---  
Produtos | [ SafeKit em Windows e Linux ](</>) | Produtos tolerantes a falhas  
Hardware/Hipervisor | Windows Windows servidores e PCs. Funciona com o hipervisor padrão e gratuito KVM (Kernel-based Virtual Machine) integrado ao kernel principal Linux . Cada servidor [ pode ser o servidor de failover do outro para múltiplas aplicações ](</pt-pt/architectures/active-active-cluster-real-time-replication/>) . | Hardware dedicado ou hipervisor dedicado. O servidor secundário é dedicado à execução da mesma aplicação, sincronizada em nível de instrução.  
Falha de software | Falha de software suportada com reinicialização em outro ambiente de SO. | Exceção de software em ambos os servidores simultaneamente no mesmo SO.  
Atualização/correção tranquila do aplicativo e do SO | Sim — Atualização/correção tranquila do aplicativo e do SO possível servidor por servidor. As versões N e N+1 podem coexistir. | Não — Mesma imagem de aplicativo e SO em ambos os servidores.  
RTO/RPO | O tempo de recuperação com SafeKit ( [ RTO ](</pt-pt/best-practises/what-is-rpo-and-rto-with-examples/>) ) depende do tempo necessário para detectar e reiniciar a aplicação (cerca de 1 minuto). A perda de dados com SafeKit ( [ RPO ](</pt-pt/best-practises/what-is-rpo-and-rto-with-examples/>) ) é zero, pois a replicação é síncrona. | O tempo de recuperação (RTO) de um sistema tolerante a falhas é zero. A aplicação não é reiniciada em caso de falha e continua sua execução no servidor secundário. A perda de dados (RPO) também é zero.  
Flexibilidade: | Pode ser executado em qualquer tipo de servidor com sistemas operacionais padrão. Windows e Linux | Depende de hardware específico ou de hipervisores específicos.  
Indicado para: | [ Editores de software que desejam adicionar uma opção simples de alta disponibilidade ao seu aplicativo ](</pt-pt/use-cases/application-clustering-software/>) | Ambientes onde a falha de hardware é a principal preocupação  
  
Em resumo, a alta disponibilidade de software com ** SafeKit ** uma solução flexível e econômica que funciona em hardware padrão e suporta atualizações contínuas, com tempo de inatividade próximo de zero (RTO ~1 minuto) e zero perda de dados. Sistemas tolerantes a falhas oferecem failover instantâneo (RTO = 0), mas exigem hardware dedicado e carecem de flexibilidade para atualizações de software independentes.


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}