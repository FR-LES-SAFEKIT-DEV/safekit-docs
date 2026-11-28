---
title: "Alternativa ao Microsoft NLB para VMware"
canonical: "https://safekit.eviden.com/pt-br/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Uma alternativa ao Microsoft NLB no VMware: os clusters farm SafeKit balanceiam a carga e fazem failover sem multicast, entradas ARP estáticas nem MAC spoofing."
category: "best-practises"
lang: "pt-br"
topics: "Modo multicast Microsoft NLB, Modo unicast Microsoft NLB, Alternativa com SafeKit, Como o cluster SafeKit em modo farm funciona com Windows ?"
hashpart: "microsoft-nlb-multicast-mode, microsoft-nlb-unicast-mode, alternative-with-safekit, safekit-farm-cluster"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Alternativa ao Microsoft NLB para VMware {#microsoft-nlb-alternative-for-vmware}

## Modo multicast Microsoft NLB {#microsoft-nlb-multicast-mode}

No modo multicast, você deve configurar manualmente a resolução ARP estática no switch ou roteador. Isso é necessário para cada porta conectada ao cluster. Para obter detalhes, consulte o artigo da base de conhecimento VMware [sobre a configuração do modo multicast do Network Load Balancing (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). Em um ambiente de rede desconhecido, a implantação do Microsoft NLB no modo multicast pode ser complexa e exigente.

## Modo unicast Microsoft NLB {#microsoft-nlb-unicast-mode}

No modo unicast, você deve configurar o host ESXi/ESX para que ele não envie pacotes RARP quando uma de suas máquinas virtuais for ligada. Caso contrário, Microsoft NLB não funcionará corretamente com VMware. Para obter detalhes, consulte o artigo da base de conhecimento VMware [Microsoft NLB não funciona corretamente no modo Unicast](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternativa com SafeKit {#alternative-with-safekit}

SafeKit usa um [endereço IP virtual](</pt-br/best-practises/how-a-virtual-ip-address-works/>) que não requer nenhuma configuração de rede especial. Seu balanceamento de carga de rede funciona em qualquer ambiente. Isso é importante quando você implanta a solução em uma infraestrutura desconhecida: switches ou roteadores desconhecidos, servidores físicos ou servidores virtuais.


{{%  insert-safekit-farm-pt-br app="Windows"  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}