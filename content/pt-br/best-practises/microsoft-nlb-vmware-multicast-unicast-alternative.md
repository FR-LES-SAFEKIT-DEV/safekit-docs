---
title: "Alternativa ao Microsoft NLB VMware: Problemas de Multicast e Unicast Resolvidos"
canonical: "https://safekit.eviden.com/pt-br/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Está com dificuldades com o multicast ou unicast Microsoft NLB no VMware? SafeKit oferece uma alternativa simples: um cluster farm com balanceamento de carga automático e failover no Windows e Linux. Não requer entradas ARP estáticas, falsificação de MAC ou configuração de rede especializada."
category: "best-practises"
lang: "pt-br"
topics: "Modo multicast Microsoft NLB, Modo unicast Microsoft NLB, Alternativa com SafeKit, Como o cluster SafeKit em modo farm funciona com Windows?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Alternativa ao Microsoft NLB VMware: Problemas de Multicast e Unicast Resolvidos {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Modo multicast Microsoft NLB {#microsoft-nlb-multicast-mode}

No modo multicast, você deve configurar manualmente a resolução ARP estática no switch ou roteador. Isso é necessário para cada porta conectada ao cluster. Para obter detalhes, consulte o artigo da base de conhecimento VMware [sobre a configuração do modo multicast do Network Load Balancing (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). Em um ambiente de rede desconhecido, a implantação do Microsoft NLB no modo multicast pode ser complexa e exigente.

## Modo unicast Microsoft NLB {#microsoft-nlb-unicast-mode}

No modo unicast, você deve configurar o host ESXi/ESX para que ele não envie pacotes RARP quando uma de suas máquinas virtuais for ligada. Caso contrário, Microsoft NLB não funcionará corretamente com VMware. Para obter detalhes, consulte o artigo da base de conhecimento VMware [Microsoft NLB não funciona corretamente no modo Unicast](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternativa com SafeKit {#alternative-with-safekit}

SafeKit usa um [endereço IP virtual](</pt-br/best-practises/how-a-virtual-ip-address-works/>) que não requer nenhuma configuração de rede especial. Seu balanceamento de carga de rede funciona em qualquer ambiente. Isso é importante quando você implanta a solução em uma infraestrutura desconhecida: switches ou roteadores desconhecidos, servidores físicos ou servidores virtuais.


{{%  insert-safekit-farm-pt-br app="Windows"  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}