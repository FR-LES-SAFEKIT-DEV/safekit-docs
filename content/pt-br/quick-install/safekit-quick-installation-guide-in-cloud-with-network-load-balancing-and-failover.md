---
title: "Balanceamento de carga e failover em rede na nuvem: Instale o módulo SafeKit farm.safe"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Aprimore o balanceamento de carga da rede em nuvem com o monitoramento inteligente de aplicações do SafeKit . O módulo farm.safe oferece uma verificação de integridade dedicada para o balanceador de carga em nuvem, permitindo alta disponibilidade contínua no nível da aplicação. Obtenha autorrecuperação e failover automáticos para aplicações de missão crítica."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Nuvem, Limitações de Alta Disponibilidade do SafeKit , Visão Geral da solução SafeKit / Nuvem, Instalação da solução SafeKit / Nuvem no Windows e Linux ( farm.safe ), Configuração passo a passo da solução SafeKit / Nuvem, Demonstração da solução SafeKit <span class="notranslate farm-term" translate="no">farm</span> , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Balanceamento de carga e failover em rede na nuvem: Instale o módulo SafeKit farm.safe {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-br app="Cloud" mod="farm"  %}}
 

## Visão geral da solução SafeKit / Cloud {#overview-of-the-safekit--cloud-solution}

A solução é descrita aqui: **💡 [ SafeKit : Balanceamento de carga na nuvem e alta disponibilidade de aplicativos <span class="notranslate farm-term" translate="no">Farm</span> Cluster ](</pt-br/solutions/cloud-load-balancing-cluster-failover/>)** .

## Instalação da solução SafeKit / Cloud em Windows e Linux ( farm.safe ) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configuração do balanceador de carga na nuvem {#configuration-of-the-cloud-load-balancer}

O balanceador de carga deve ser configurado com um endereço IP virtual.  
E o balanceador de carga deve ser configurado para enviar periodicamente pacotes de saúde aos nós.  
Para isso, SafeKit fornece uma verificação de integridade que é executada dentro dos nós e que

  * Retorna OK quando o estado do módulo <span class="notranslate farm-term" translate="no">farm</span> é ATIVO (verde).
  * retornos NÃO ENCONTRADOS em todos os outros estados


Você deve configurar o balanceador de carga na nuvem com:

  * protocolo HTTP
  * porta 9010, a porta do servidor web SafeKit
  * URL /var/modules/farm/ready.txt (se <span class="notranslate farm-term" translate="no">farm</span> for o nome do módulo que você implantará posteriormente)


⚠️ Não configure um endereço IP virtual e regras de balanceamento de carga na etapa 4 da configuração passo a passo abaixo. O endereço IP virtual e as regras de balanceamento de carga já estão definidos no balanceador de carga na nuvem. A configuração de um endereço IP virtual e regras de balanceamento de carga na etapa 4 é útil apenas para configurações locais.

### Configuração da segurança de rede na nuvem {#configuration-of-the-cloud-network-security}

A segurança da rede deve ser configurada para permitir a comunicação dos seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre nós SafeKit )
  * UDP - 4803 para os sinais de pulsação dentro do módulo <span class="notranslate farm-term" translate="no">farm</span> (entre nós SafeKit )
  * TCP – 9010 para a verificação de integridade do balanceador de carga e para o console web SafeKit em execução no modo http.
  * TCP – 9001 para configurar o modo https para o console
  * TCP – 9453 para o console web SafeKit em execução no modo https



{{%  insert-safekit-installation-package-windows-pt-br app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **farm.safe** que você irá configurar está incluído no pacote.

## Configuração passo a passo da solução em nuvem SafeKit / {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-pt-br app="" mod="farm"  %}}
 

## Demonstração da solução SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}