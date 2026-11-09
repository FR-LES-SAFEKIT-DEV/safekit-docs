---
title: "Alta disponibilidade AWS com SafeKit: instale o módulo mirror.safe para failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "Implemente o módulo mirror.safe para SafeKit na AWS para habilitar a replicação síncrona em tempo real e o failover automático no Windows e Linux. Este guia mostra como configurar um cluster de 2 nós sem armazenamento sem compartilhamento para aplicações críticas."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para AWS, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução mirror SafeKit/AWS, Instalação da solução mirror SafeKit/AWS no Windows e Linux (mirror.safe), Configuração passo a passo da solução mirror SafeKit/AWS, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta disponibilidade AWS com SafeKit: instale o módulo mirror.safe para failover {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="AWS" mod="mirror"  %}}
 

## Visão geral da solução mirror SafeKit/AWS {#overview-of-the-safekit--aws-mirror-solution}

A solução é descrita aqui: **💡 [Alta Disponibilidade Amazon AWS: Replicação Síncrona e Failover SafeKit](</pt-br/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)**.

## Instalação da solução mirror SafeKit/AWS no Windows e Linux (mirror.safe) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuração do balanceador de carga da Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

O balanceador de carga deve ser configurado se você quiser um endereço IP virtual.  
E o balanceador de carga deve ser configurado para enviar pacotes de verificação de integridade periodicamente para os nós.  
Para isso, SafeKit oferece uma verificação de integridade que é executada dentro dos nós e que

  * retorna OK quando o estado do módulo mirror é PRIM (verde) ou ALONE (verde)
  * retorna NÃO ENCONTRADO em todos os outros estados


Você deve configurar o balanceador de carga Amazon AWS com:

  * Protocolo HTTP
  * porta 9010, a porta do servidor web SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror for o nome do módulo que você implantará mais tarde)


Para obter mais informações, consulte [a configuração do balanceador de carga da Amazon AWS](<https://aws.amazon.com/elasticloadbalancing/>).


⚠️ Não configure um endereço IP virtual na etapa 4 da configuração passo a passo abaixo. O endereço IP virtual já está definido no balanceador de carga Amazon AWS. A configuração de um IP virtual na etapa 4 é útil apenas para configuração local.

### Configuração da segurança da rede Amazon AWS {#configuration-of-the-amazon-aws-network-security}

A segurança da rede deve ser configurada para permitir comunicações para os seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre os nós SafeKit)
  * UDP - 8888 para o heartbeat do módulo (entre os nós SafeKit)
  * TCP – 5600 para o módulo de replicação de arquivos em tempo real (entre os nós SafeKit)
  * TCP – 9010 para a verificação de integridade do balanceador de carga e para o console da web SafeKit em execução no modo http
  * TCP – 9001 para configurar o modo https para o console
  * TCP – 9453 para o console web SafeKit em execução no modo https



{{%  insert-safekit-installation-package-windows-pt-br app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **mirror.safe** que você vai configurar é entregue dentro do pacote.

## Configuração passo a passo da solução mirror SafeKit/AWS {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-pt-br app="Windows" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}