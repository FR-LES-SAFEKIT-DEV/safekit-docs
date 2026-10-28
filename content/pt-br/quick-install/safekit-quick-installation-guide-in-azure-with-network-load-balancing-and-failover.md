---
title: "Balanceamento de carga de rede e failover no Azure: instalar o módulo farm.safe do SafeKit"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "Aprimore o balanceamento de carga de rede do Azure com o monitoramento inteligente de aplicações do SafeKit. O módulo farm.safe oferece uma verificação de integridade dedicada para o balanceador de carga do Azure, permitindo alta disponibilidade no nível da aplicação, autorrecuperação e failover automático para aplicações críticas."
category: "quick-install"
lang: "pt-br"
topics: "Guia de instalação rápida de alta disponibilidade para Azure, Limitações de alta disponibilidade do SafeKit, Visão geral da solução SafeKit / Azure, Instalação da solução SafeKit / Azure no Windows e Linux (farm.safe), Configuração passo a passo da solução SafeKit / Azure, Demonstração da solução farm do SafeKit, 🔍 Central de navegação de alta disponibilidade do SafeKit"
---

# Balanceamento de carga de rede e failover no Azure: instalar o módulo farm.safe do SafeKit {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-pt-br app="Azure" mod="farm"  %}}

## Visão geral da solução SafeKit / Azure {#overview-of-the-safekit--azure-solution}

A solução está descrita aqui: **💡[SafeKit: balanceamento de carga do Microsoft Azure e alta disponibilidade de aplicações com um cluster `Farm`](</pt-br/solutions/azure-load-balancing-cluster-failover/>)**.

## Instalação da solução SafeKit / Azure no Windows e Linux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Configuração do balanceador de carga do Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

O balanceador de carga deve ser configurado com um endereço IP virtual.
Ele também deve enviar periodicamente pacotes de verificação de integridade aos nós.
Para isso, o SafeKit fornece uma verificação de integridade executada nos nós, que:

  * retorna OK quando o estado do módulo `farm` é UP (verde)
  * retorna NOT FOUND em todos os outros estados

Configure o balanceador de carga do Microsoft Azure com:

  * protocolo HTTP
  * porta 9010, a porta do servidor Web do SafeKit
  * URL /var/modules/farm/ready.txt (se `farm` for o nome do módulo que será implantado posteriormente)

Para obter mais informações, consulte [a configuração do balanceador de carga do Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Não configure um endereço IP virtual nem regras de balanceamento de carga na etapa 4 da configuração passo a passo abaixo. O endereço IP virtual e as regras de balanceamento de carga já estão definidos no balanceador de carga do Microsoft Azure. Configurá-los na etapa 4 é útil somente em configurações locais.

### Configuração da segurança de rede do Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

A segurança de rede deve ser configurada para permitir comunicações pelos seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre os nós do SafeKit)
  * UDP - 4803 para os heartbeats dentro do módulo `farm` (entre os nós do SafeKit)
  * TCP – 9010 para a verificação de integridade do balanceador de carga e o console Web do SafeKit no modo http
  * TCP – 9001 para configurar o modo https do console
  * TCP – 9453 para o console Web do SafeKit no modo https

{{%  insert-safekit-installation-package-windows-pt-br app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}

Observação: o módulo genérico **farm.safe** que você configurará está incluído no pacote.

## Configuração passo a passo da solução SafeKit / Azure {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-pt-br app="" mod="farm"  %}}

## Demonstração da solução `farm` do SafeKit {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
