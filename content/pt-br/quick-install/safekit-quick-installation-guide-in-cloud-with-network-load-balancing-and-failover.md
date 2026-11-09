---
title: "Balanceamento de Carga e Failover de Rede em Nuvem: Instale o Módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Melhore o balanceamento de carga da rede em nuvem com o monitoramento inteligente de aplicações do SafeKit. O módulo farm.safe oferece uma verificação de integridade dedicada para o balanceador de carga em nuvem, permitindo alta disponibilidade (HA) perfeita no nível da aplicação. Obtenha autocura automática e failover para aplicações de missão crítica."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Nuvem, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit / Cloud, Instalação da solução SafeKit / Cloud no Windows e Linux (farm.safe), Configuração passo a passo da solução SafeKit / Cloud, Demonstração da solução farm SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Balanceamento de Carga e Failover de Rede em Nuvem: Instale o Módulo farm.safe SafeKit {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-br app="Cloud" mod="farm"  %}}
 

## Visão geral da solução SafeKit / Cloud {#overview-of-the-safekit--cloud-solution}

A solução é descrita aqui: **💡 [SafeKit: Balanceamento de Carga na Nuvem e cluster <span class="notranslate farm-term" translate="no">farm</span> Alta Disponibilidade de Aplicações](</pt-br/solutions/cloud-load-balancing-cluster-failover/>)**.

## Instalação da solução SafeKit / Cloud no Windows e Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configuração do balanceador de carga na nuvem {#configuration-of-the-cloud-load-balancer}

O balanceador de carga deve ser configurado com um endereço IP virtual.  
E o balanceador de carga deve ser configurado para enviar pacotes de verificação de integridade periodicamente para os nós.  
Para isso, SafeKit oferece uma verificação de integridade que é executada dentro dos nós e que

  * retorna OK quando o estado do módulo <span class="notranslate farm-term" translate="no">farm</span> é UP (verde)
  * retorna NÃO ENCONTRADO em todos os outros estados


Você deve configurar o balanceador de carga da nuvem com:

  * Protocolo HTTP
  * porta 9010, a porta do servidor web SafeKit
  * URL /var/modules/farm/ready.txt (se <span class="notranslate farm-term" translate="no">farm</span> for o nome do módulo que você implantará mais tarde)


⚠️ Não configure um endereço IP virtual e regras de balanceamento de carga na etapa 4 da configuração passo a passo abaixo. O endereço IP virtual e as regras de balanceamento de carga já estão definidos no balanceador de carga da nuvem. A configuração de um IP virtual e regras de balanceamento de carga na etapa 4 é útil apenas para configuração local.

### Configuração da segurança da rede em nuvem {#configuration-of-the-cloud-network-security}

A segurança da rede deve ser configurada para permitir comunicações para os seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre os nós SafeKit)
  * UDP - 4803 para os heartbeats dentro do módulo <span class="notranslate farm-term" translate="no">farm</span> (entre os nós SafeKit)
  * TCP – 9010 para a verificação de integridade do balanceador de carga e para o console da web SafeKit em execução no modo http
  * TCP – 9001 para configurar o modo https para o console
  * TCP – 9453 para o console web SafeKit em execução no modo https



{{%  insert-safekit-installation-package-windows-pt-br app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **farm.safe** que você vai configurar é entregue dentro do pacote.

## Configuração passo a passo da solução SafeKit / Cloud {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-pt-br app="" mod="farm"  %}}
 

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}