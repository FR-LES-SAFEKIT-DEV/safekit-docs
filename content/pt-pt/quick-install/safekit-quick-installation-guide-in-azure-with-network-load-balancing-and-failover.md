---
title: "Balanceamento de carga de rede e failover no Azure: instalar o módulo farm.safe da SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "Melhore o balanceamento de carga de rede do Azure com a monitorização inteligente de aplicações da SafeKit. O módulo farm.safe disponibiliza uma verificação de estado dedicada ao balanceador de carga do Azure, permitindo alta disponibilidade ao nível da aplicação, autorrecuperação e failover automático para aplicações críticas."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de instalação rápida de alta disponibilidade para Azure, Limitações de alta disponibilidade da SafeKit, Descrição geral da solução SafeKit / Azure, Instalação da solução SafeKit / Azure no Windows e Linux (farm.safe), Configuração passo a passo da solução SafeKit / Azure, Demonstração da solução `farm` da SafeKit, 🔍 Centro de navegação de alta disponibilidade da SafeKit"
---

# Balanceamento de carga de rede e failover no Azure: instalar o módulo farm.safe da SafeKit {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-pt-pt app="Azure" mod="farm"  %}}

## Descrição geral da solução SafeKit / Azure {#overview-of-the-safekit--azure-solution}

A solução é descrita aqui: **💡[SafeKit: balanceamento de carga do Microsoft Azure e alta disponibilidade de aplicações com um cluster `Farm`](</pt-pt/solutions/azure-load-balancing-cluster-failover/>)**.

## Instalação da solução SafeKit / Azure no Windows e Linux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Configuração do balanceador de carga do Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

O balanceador de carga tem de ser configurado com um endereço IP virtual.
O balanceador de carga também tem de enviar periodicamente pacotes de verificação de estado para os nós.
Para isso, a SafeKit disponibiliza uma verificação de estado executada nos nós, que:

  * devolve OK quando o estado do módulo `farm` é UP (verde)
  * devolve NOT FOUND em todos os outros estados

Configure o balanceador de carga do Microsoft Azure com:

  * protocolo HTTP
  * porta 9010, a porta do servidor Web da SafeKit
  * URL /var/modules/farm/ready.txt (se `farm` for o nome do módulo que será implementado posteriormente)

Para obter mais informações, consulte [a configuração do balanceador de carga do Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Não configure um endereço IP virtual nem regras de balanceamento de carga no passo 4 da configuração passo a passo abaixo. O endereço IP virtual e as regras de balanceamento de carga já estão definidos no balanceador de carga do Microsoft Azure. A configuração destes elementos no passo 4 só é útil para uma configuração no local.

### Configuração da segurança de rede do Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

A segurança de rede tem de ser configurada para permitir comunicações através dos seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre nós SafeKit)
  * UDP - 4803 para os heartbeats dentro do módulo `farm` (entre nós SafeKit)
  * TCP – 9010 para a verificação de estado do balanceador de carga e para a consola Web da SafeKit em modo http
  * TCP – 9001 para configurar o modo https da consola
  * TCP – 9453 para a consola Web da SafeKit em modo https

{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}

Nota: o módulo genérico **farm.safe** que irá configurar está incluído no pacote.

## Configuração passo a passo da solução SafeKit / Azure {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-pt-pt app="" mod="farm"  %}}

## Demonstração da solução `farm` da SafeKit {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
