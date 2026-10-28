---
title: "Alta disponibilidade no Azure: replicação em tempo real e failover com SafeKit"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "Implante o módulo mirror.safe do SafeKit no Azure para habilitar a replicação síncrona em tempo real e o failover automático no Windows e Linux. Este guia explica como configurar um cluster de dois nós sem armazenamento compartilhado para aplicações críticas."
category: "quick-install"
lang: "pt-br"
topics: "Guia de instalação rápida de alta disponibilidade para Azure, Limitações de alta disponibilidade do SafeKit, Visão geral da solução SafeKit / Azure mirror, Instalação da solução SafeKit / Azure mirror no Windows e Linux (mirror.safe), Configuração passo a passo da solução SafeKit / Azure mirror, Demonstração da solução mirror do SafeKit, 🔍 Central de navegação de alta disponibilidade do SafeKit"
---

# Alta disponibilidade do Azure com SafeKit: instalar o módulo mirror.safe para failover {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-pt-br app="Azure" mod="mirror"  %}}

## Visão geral da solução SafeKit / Azure mirror {#overview-of-the-safekit--azure-mirror-solution}

A solução está descrita aqui: **💡[Alta disponibilidade do Microsoft Azure: replicação síncrona e failover com SafeKit](</pt-br/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit / Azure mirror no Windows e Linux (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuração do balanceador de carga do Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

O balanceador de carga deve ser configurado se você quiser implementar um endereço IP virtual.
Ele também deve enviar periodicamente pacotes de verificação de integridade aos nós.
Para isso, o SafeKit fornece uma verificação de integridade executada nos nós, que:

  * retorna OK quando o estado do módulo mirror é PRIM (verde) ou ALONE (verde)
  * retorna NOT FOUND em todos os outros estados

Configure o balanceador de carga do Microsoft Azure com:

  * protocolo HTTP
  * porta 9010, a porta do servidor Web do SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror for o nome do módulo que será implantado posteriormente)

Para obter mais informações, consulte [a configuração do balanceador de carga do Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Não configure um endereço IP virtual na etapa 4 da configuração passo a passo abaixo. O endereço IP virtual já está definido no balanceador de carga do Microsoft Azure. Configurar um IP virtual na etapa 4 é útil somente em configurações locais.

### Configuração da segurança de rede do Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

A segurança de rede deve ser configurada para permitir comunicações pelos seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre os nós do SafeKit)
  * UDP - 8888 para o heartbeat do módulo (entre os nós do SafeKit)
  * TCP – 5600 para a replicação de arquivos em tempo real do módulo (entre os nós do SafeKit)
  * TCP – 9010 para a verificação de integridade do balanceador de carga e o console Web do SafeKit no modo http
  * TCP – 9001 para configurar o modo https do console
  * TCP – 9453 para o console Web do SafeKit no modo https

{{%  insert-safekit-installation-package-windows-pt-br app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}

Observação: o módulo genérico **mirror.safe** que você configurará está incluído no pacote.

## Configuração passo a passo da solução SafeKit / Azure mirror {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-pt-br app="Windows" mod="mirror"  %}}

## Demonstração da solução mirror do SafeKit {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
