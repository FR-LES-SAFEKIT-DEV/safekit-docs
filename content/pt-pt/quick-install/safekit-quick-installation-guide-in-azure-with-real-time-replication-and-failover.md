---
title: "Alta disponibilidade no Azure: replicação em tempo real e failover com SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "Implemente o módulo mirror.safe da SafeKit no Azure para permitir a replicação síncrona em tempo real e o failover automático no Windows e Linux. Este guia explica como configurar um cluster de dois nós sem armazenamento partilhado para aplicações críticas."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de instalação rápida de alta disponibilidade para Azure, Limitações de alta disponibilidade da SafeKit, Descrição geral da solução SafeKit / Azure mirror, Instalação da solução SafeKit / Azure mirror no Windows e Linux (mirror.safe), Configuração passo a passo da solução SafeKit / Azure mirror, Demonstração da solução mirror da SafeKit, 🔍 Centro de navegação de alta disponibilidade da SafeKit"
---

# Alta disponibilidade do Azure com SafeKit: instalar o módulo mirror.safe para failover {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-pt-pt app="Azure" mod="mirror"  %}}

## Descrição geral da solução SafeKit / Azure mirror {#overview-of-the-safekit--azure-mirror-solution}

A solução é descrita aqui: **💡[Alta disponibilidade do Microsoft Azure: replicação síncrona e failover com SafeKit](</pt-pt/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit / Azure mirror no Windows e Linux (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuração do balanceador de carga do Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

O balanceador de carga tem de ser configurado se pretender implementar um endereço IP virtual.
O balanceador de carga também tem de enviar periodicamente pacotes de verificação de estado para os nós.
Para isso, a SafeKit disponibiliza uma verificação de estado executada nos nós, que:

  * devolve OK quando o estado do módulo mirror é PRIM (verde) ou ALONE (verde)
  * devolve NOT FOUND em todos os outros estados

Configure o balanceador de carga do Microsoft Azure com:

  * protocolo HTTP
  * porta 9010, a porta do servidor Web da SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror for o nome do módulo que será implementado posteriormente)

Para obter mais informações, consulte [a configuração do balanceador de carga do Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Não configure um endereço IP virtual no passo 4 da configuração passo a passo abaixo. O endereço IP virtual já está definido no balanceador de carga do Microsoft Azure. A definição de um IP virtual no passo 4 só é útil para uma configuração no local.

### Configuração da segurança de rede do Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

A segurança de rede tem de ser configurada para permitir comunicações através dos seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre nós SafeKit)
  * UDP - 8888 para o heartbeat do módulo (entre nós SafeKit)
  * TCP – 5600 para a replicação de ficheiros em tempo real do módulo (entre nós SafeKit)
  * TCP – 9010 para a verificação de estado do balanceador de carga e para a consola Web da SafeKit em modo http
  * TCP – 9001 para configurar o modo https da consola
  * TCP – 9453 para a consola Web da SafeKit em modo https

{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}

Nota: o módulo genérico **mirror.safe** que irá configurar está incluído no pacote.

## Configuração passo a passo da solução SafeKit / Azure mirror {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-pt-pt app="Windows" mod="mirror"  %}}

## Demonstração da solução mirror da SafeKit {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
