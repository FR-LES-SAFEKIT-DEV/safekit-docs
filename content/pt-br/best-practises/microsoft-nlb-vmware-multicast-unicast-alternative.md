---
title: "Microsoft NLB Alternativa para VMware: Problemas de multicast e unicast resolvidos"
canonical: "https://safekit.eviden.com/pt-br/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Com dificuldades para configurar o balanceamento de carga multicast ou unicast do Microsoft no VMware? SafeKit propõe um cluster farm sem SAN como uma alternativa simples. Obtenha balanceamento de carga e failover automáticos no Windows e Linux sem entradas ARP estáticas, falsificação de MAC ou configuração de rede especializada."
category: "best-practises"
lang: "pt-br"
topics: "Modo multicast do NLB Microsoft , modo unicast do NLB Microsoft , alternativa com SafeKit , como o cluster SafeKit no modo <span class="notranslate farm-term" translate="no">farm</span> funciona com Windows ?, 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Microsoft Alternativa NLB da VMware: Problemas de multicast e unicast resolvidos {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft Modo multicast NLB {#microsoft-nlb-multicast-mode}

Conforme explicado na base de conhecimento [ da VMware sobre a configuração do modo multicast do balanceamento de carga de rede (NLB) ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) , é necessário configurar manualmente a resolução ARP estática no switch ou roteador para cada porta conectada ao cluster. A implementação do modo multicast do NLB Microsoft em um ambiente de rede desconhecido pode ser uma tarefa complexa e árdua.

## Microsoft Modo unicast NLB {#microsoft-nlb-unicast-mode}

Com o modo unicast Microsoft do NLB, você deve configurar o host ESXi/ESX para não enviar pacotes RARP quando qualquer uma de suas máquinas virtuais estiver ligada. É por isso que o NLB [ Microsoft não funciona corretamente no modo unicast com o VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>) .

## Alternativa com SafeKit {#alternative-with-safekit}

A configuração de endereço IP virtual [ SafeKit ](</pt-br/best-practises/how-a-virtual-ip-address-works/>) não requer nenhuma configuração de rede especial e o balanceamento de carga de rede pode ser executado em qualquer ambiente. Uma característica importante quando a solução precisa ser implantada em uma infraestrutura desconhecida: switches ou roteadores desconhecidos, servidores físicos ou virtuais.


{{%  insert-safekit-farm-pt-br app="Windows"  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}