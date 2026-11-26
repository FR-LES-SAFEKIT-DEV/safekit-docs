---
title: "Alternativa VMware Microsoft NLB: Problemas de Multicast e Unicast Resolvidos"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Está com dificuldades com o multicast ou unicast Microsoft NLB no VMware? SafeKit oferece uma alternativa simples: um cluster farm com balanceamento de carga automático e failover no Windows e Linux. Não requer entradas ARP estáticas, nem falsificação de MAC, nem configuração de rede especializada."
category: "best-practises"
lang: "pt-pt"
topics: "Modo multicast Microsoft NLB, Modo unicast Microsoft NLB, Alternativa com SafeKit, Como funciona o cluster SafeKit em modo farm com Windows?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Alternativa VMware Microsoft NLB: Problemas de Multicast e Unicast Resolvidos {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Modo multicast Microsoft NLB {#microsoft-nlb-multicast-mode}

No modo multicast, tem de configurar manualmente a resolução ARP estática no switch ou no router. Isto é necessário para cada porta ligada ao cluster. Para mais detalhes, consulte o artigo da base de conhecimento VMware [sobre a configuração do modo multicast do Network Load Balancing (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). Num ambiente de rede desconhecido, a implementação do Microsoft NLB no modo multicast pode ser complexa e exigente.

## Modo unicast Microsoft NLB {#microsoft-nlb-unicast-mode}

No modo unicast, tem de configurar o anfitrião ESXi/ESX para que não envie pacotes RARP quando uma das suas máquinas virtuais é iniciada. Caso contrário, Microsoft NLB não funciona corretamente com VMware. Para obter mais detalhes, consulte o artigo da base de conhecimento VMware [Microsoft NLB not working properly in Unicast Mode](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternativa com SafeKit {#alternative-with-safekit}

SafeKit utiliza um [endereço IP virtual](</pt-pt/best-practises/how-a-virtual-ip-address-works/>) que não requer nenhuma configuração de rede especial. O seu balanceamento de carga de rede funciona em qualquer ambiente. Isto é importante quando se implementa a solução numa infraestrutura desconhecida: switches ou routers desconhecidos, servidores físicos ou servidores virtuais.


{{%  insert-safekit-farm-pt-pt app="Windows"  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}