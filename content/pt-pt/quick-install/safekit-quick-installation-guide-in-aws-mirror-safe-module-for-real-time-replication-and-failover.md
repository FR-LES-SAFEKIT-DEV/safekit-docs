---
title: "Alta Disponibilidade AWS com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "Implemente o módulo mirror.safe para SafeKit na AWS para permitir a replicação síncrona em tempo real e o failover automático no Windows e Linux. Este guia explica como configurar um cluster de 2 nós sem armazenamento sem compartilhamento para aplicações críticas."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para AWS, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução mirror SafeKit/AWS, Instalação da solução mirror SafeKit/AWS no Windows e Linux (mirror.safe), Configuração passo a passo da solução mirror SafeKit/AWS, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade AWS com SafeKit: Instale o Módulo mirror.safe para Failover {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="AWS" mod="mirror"  %}}
 

## Visão geral da solução mirror SafeKit/AWS {#overview-of-the-safekit--aws-mirror-solution}

A solução é descrita aqui: **💡 [Alta Disponibilidade Amazon AWS: Replicação Síncrona e Failover SafeKit](</pt-pt/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)**.

## Instalação da solução mirror SafeKit/AWS no Windows e Linux (mirror.safe) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuração do balanceador de carga da Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

O balanceador de carga deve ser configurado se pretender um endereço IP virtual.  
E o balanceador de carga deve ser configurado para enviar periodicamente pacotes de verificação de estado aos nós.  
Para isso, SafeKit fornece uma verificação de estado que é executada dentro dos nós e que

  * retorna OK quando o estado do módulo mirror é PRIM (verde) ou ALONE (verde)
  * retorna NÃO ENCONTRADO em todos os outros estados


Deve configurar o balanceador de carga Amazon AWS com:

  * Protocolo HTTP
  * porta 9010, a porta do servidor web SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror for o nome do módulo que irá implementar mais tarde)


Para mais informações, consulte [a configuração do balanceador de carga Amazon AWS](<https://aws.amazon.com/elasticloadbalancing/>).


⚠️ Não configure um endereço IP virtual no passo 4 da configuração passo a passo abaixo. O endereço IP virtual já está definido no balanceador de carga Amazon AWS. A configuração de um IP virtual no passo 4 é útil apenas para configurações on-premise.

### Configuração da segurança da rede Amazon AWS {#configuration-of-the-amazon-aws-network-security}

A segurança da rede deve ser configurada para permitir comunicações para os seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre nós SafeKit)
  * UDP - 8888 para o heartbeat do módulo (entre os nós SafeKit)
  * TCP – 5600 para o módulo de replicação de ficheiros em tempo real (entre nós SafeKit)
  * TCP – 9010 para a verificação de estado do balanceador de carga e para a consola web SafeKit em execução no modo http
  * TCP – 9001 para configurar o modo https para a consola
  * TCP – 9453 para a consola web SafeKit em execução no modo https



{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}
 

Nota: o módulo genérico **mirror.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução mirror SafeKit/AWS {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Windows" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}