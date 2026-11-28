---
title: "Instalar SafeKit: balanceamento de carga de AWS"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/"
description: "Guia passo a passo: instale o módulo SafeKit farm.safe na AWS, onde verifica o estado da aplicação para o balanceador de carga AWS e gere o failover."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para AWS, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/AWS, Instalação da solução SafeKit/AWS em Windows e Linux (farm.safe), Configuração passo a passo da solução SafeKit/AWS, Demonstração da solução farm SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--aws-solution, installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe, step-by-step-configuration-of-the-safekit--aws-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Instalar SafeKit: balanceamento de carga de AWS {#install-safekit-for-aws-load-balancing}


{{%  insert-safekit-farm-guide-pt-pt app="AWS" mod="farm"  %}}
 

## Visão geral da solução SafeKit/AWS {#overview-of-the-safekit--aws-solution}

A solução é descrita aqui: **💡 [SafeKit: cluster <span class="notranslate farm-term" translate="no">farm</span> Balanceamento de Carga e Alta Disponibilidade de Aplicações Amazon AWS](</pt-pt/solutions/aws-load-balancing-cluster-failover/>)**.

## Instalação da solução SafeKit/AWS em Windows e Linux (farm.safe) {#installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe}

### Configuração do balanceador de carga da Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

O balanceador de carga deve ser configurado com um endereço IP virtual.  
E o balanceador de carga deve ser configurado para enviar periodicamente pacotes de verificação de estado aos nós.  
Para isso, SafeKit fornece uma verificação de estado que é executada dentro dos nós e que

  * retorna OK quando o estado do módulo <span class="notranslate farm-term" translate="no">farm</span> é UP (verde)
  * retorna NÃO ENCONTRADO em todos os outros estados


Deve configurar o balanceador de carga Amazon AWS com:

  * Protocolo HTTP
  * porta 9010, a porta do servidor web SafeKit
  * URL /var/modules/farm/ready.txt (se <span class="notranslate farm-term" translate="no">farm</span> for o nome do módulo que irá implementar mais tarde)


Para mais informações, consulte [a configuração do balanceador de carga Amazon AWS](<https://aws.amazon.com/elasticloadbalancing/>).


⚠️ Não configure um endereço IP virtual e regras de balanceamento de carga no passo 4 da configuração passo a passo abaixo. O endereço IP virtual e as regras de balanceamento de carga já estão definidos no balanceador de carga Amazon AWS. A configuração de um IP virtual e de regras de balanceamento de carga no passo 4 é útil apenas para configurações on-premise.

### Configuração da segurança da rede Amazon AWS {#configuration-of-the-amazon-aws-network-security}

A segurança da rede deve ser configurada para permitir comunicações para os seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre nós SafeKit)
  * UDP - 4803 para o heartbeat dentro do módulo <span class="notranslate farm-term" translate="no">farm</span> (entre os nós SafeKit)
  * TCP – 9010 para a verificação de estado do balanceador de carga e para a consola web SafeKit em execução no modo http
  * TCP – 9001 para configurar o modo https para a consola
  * TCP – 9453 para a consola web SafeKit em execução no modo https



{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}
 

Nota: o módulo genérico **farm.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit/AWS {#step-by-step-configuration-of-the-safekit--aws-solution}


{{%  insert-safekit-82-farm-configuration-pt-pt app="" mod="farm"  %}}
 

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}