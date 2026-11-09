---
title: "Balanceamento de Carga e Redundância de Rede na Nuvem: Instale o Módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Melhore o balanceamento de carga da rede em nuvem com o monitoramento inteligente de aplicações do SafeKit. O módulo farm.safe oferece uma verificação de integridade dedicada para o balanceador de carga em nuvem, permitindo alta disponibilidade (HA) perfeita ao nível da aplicação. Obtenha autocorreção automática e failover para aplicações de missão crítica."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para a Nuvem, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit / Cloud, Instalação da solução SafeKit / Cloud no Windows e Linux (farm.safe), Configuração passo a passo da solução SafeKit / Cloud, Demonstração da solução farm SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Balanceamento de Carga e Redundância de Rede na Nuvem: Instale o Módulo farm.safe SafeKit {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-pt app="Cloud" mod="farm"  %}}
 

## Visão geral da solução SafeKit / Cloud {#overview-of-the-safekit--cloud-solution}

A solução é descrita aqui: **💡 [SafeKit: Balanceamento de Carga na Nuvem e cluster <span class="notranslate farm-term" translate="no">farm</span> Alta Disponibilidade de Aplicações](</pt-pt/solutions/cloud-load-balancing-cluster-failover/>)**.

## Instalação da solução SafeKit / Cloud no Windows e Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configuração do balanceador de carga na nuvem {#configuration-of-the-cloud-load-balancer}

O balanceador de carga deve ser configurado com um endereço IP virtual.  
E o balanceador de carga deve ser configurado para enviar periodicamente pacotes de verificação de estado aos nós.  
Para isso, SafeKit fornece uma verificação de estado que é executada dentro dos nós e que

  * retorna OK quando o estado do módulo <span class="notranslate farm-term" translate="no">farm</span> é UP (verde)
  * retorna NÃO ENCONTRADO em todos os outros estados


Deve configurar o balanceador de carga da nuvem com:

  * Protocolo HTTP
  * porta 9010, a porta do servidor web SafeKit
  * URL /var/modules/farm/ready.txt (se <span class="notranslate farm-term" translate="no">farm</span> for o nome do módulo que irá implementar mais tarde)


⚠️ Não configure um endereço IP virtual e regras de balanceamento de carga no passo 4 da configuração passo a passo abaixo. O endereço IP virtual e as regras de balanceamento de carga já estão definidos no balanceador de carga da nuvem. A configuração de um IP virtual e de regras de balanceamento de carga no passo 4 é útil apenas para configuração local.

### Configuração da segurança da rede em nuvem {#configuration-of-the-cloud-network-security}

A segurança da rede deve ser configurada para permitir comunicações para os seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre nós SafeKit)
  * UDP - 4803 para os heartbeats dentro do módulo <span class="notranslate farm-term" translate="no">farm</span> (entre os nós SafeKit)
  * TCP – 9010 para a verificação de estado do balanceador de carga e para a consola web SafeKit em execução no modo http
  * TCP – 9001 para configurar o modo https para a consola
  * TCP – 9453 para a consola web SafeKit em execução no modo https



{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}
 

Nota: o módulo genérico **farm.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit / Cloud {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-pt-pt app="" mod="farm"  %}}
 

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}