---
title: "Testando o endereço IP virtual de balanceamento de carga em um cluster farm SafeKit"
canonical: "https://safekit.eviden.com/pt-br/best-practises/test-load-balancing-vip-farm/"
description: "Aprenda a testar o balanceamento de carga do SafeKit entre os nós do cluster e a verificar o failover de IP virtual, o redirecionamento GARP e o comportamento da rede."
category: "best-practises"
lang: "pt-br"
topics: "Princípios-chave, Pré-requisito: o mosaico do SafeKit, Teste 1 – Distribuição de conexões, Teste 2 – Alteração do servidor de despacho, Teste 3 – Verificação do redirecionamento GARP com arp -a, Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux), Quais estações de trabalho testar, Resumo dos resultados esperados, Solução de problemas, Demonstração da solução farm do SafeKit"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 12 expressions"
---

# Testando o endereço IP virtual de balanceamento de carga em um cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

Este guia descreve como verificar se um SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (módulo <span class="notranslate farm-term" translate="no">Farm</span>, balanceamento de carga em um endereço IP virtual) funciona corretamente em sua rede: distribuição de conexões entre os nós e redirecionamento do IP Virtual (VIP) quando o nó de distribuição para.

## 1. Princípios-chave {#1-key-principles}

**Pré-requisito:** todos os nós da <span class="notranslate farm-term" translate="no">Farm</span> devem estar na mesma sub-rede IP de camada 2: uma LAN ou uma VLAN estendida entre locais remotos.

- O IP Virtual (VIP) é configurado localmente em cada nó da <span class="notranslate farm-term" translate="no">Farm</span>: ele é definido como um alias do endereço IP físico, na placa de rede desse endereço, quando a <span class="notranslate farm-term" translate="no">Farm</span> é iniciada no nó.
- Um único nó, o **servidor de despacho**, recebe o tráfego da rede para o IP Virtual (VIP) (configuração `vmac_directed`, o padrão do SafeKit): seu endereço MAC é o associado ao IP Virtual (VIP) nas tabelas ARP (roteador, gateway, clientes na mesma sub-rede).
- O filtro do kernel desse nó distribui as conexões TCP entre os nós da <span class="notranslate farm-term" translate="no">Farm</span>, **reescrevendo o endereço MAC de destino** dos pacotes para o do nó de processamento (o endereço IP de destino permanece o IP Virtual (VIP)). As respostas são enviadas diretamente do nó que processa a conexão para o cliente.
- A distribuição realizada pelo filtro é **determinística** : o nó de processamento é calculado a partir da identidade do cliente, de acordo com a regra de balanceamento de carga configurada:
  - no **endereço IP do cliente** (`filter="on_addr"`): um determinado cliente é sempre atendido pelo mesmo nó, o que garante a afinidade de sessão;
  - na **porta TCP do cliente** (`filter="on_port"`): cada conexão TCP do mesmo cliente pode ser atendida por um nó diferente. Esta é a regra usada para o mosaico (seção 2), que, portanto, mostra todos os nós de uma única estação de trabalho.
- Se o servidor de despacho parar, outro nó assume essa função e envia **GARPs** (ARP gratuito) para que a rede associe o IP Virtual (VIP) ao seu próprio endereço MAC.

O que você precisa testar:

1. que as conexões sejam distribuídas corretamente por todos os nós;
2. que a rede (roteador, gateway, virtualização) leve em consideração o GARP quando o servidor de despacho for alterado.

## 2. Pré-requisito: o mosaico do SafeKit {#2-prerequisite-the-safekit-mosaic}

O mosaico é uma página de teste fornecida pelo SafeKit. Ele abre muitas conexões TCP para o IP Virtual (VIP) e exibe, para cada uma, o nome do nó que respondeu. Isso mostra a distribuição rapidamente.

1. No `userconfig.xml` do módulo <span class="notranslate farm-term" translate="no">Farm</span>, na seção `<vip>`, adicione a regra de balanceamento de carga na porta do servidor web SafeKit. Exemplo com o servidor web SafeKit em HTTP na porta 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Se o servidor web e o console do SafeKit tiverem sido alterados para HTTPS, substitua 9010 por 9453.

2. Aplique a configuração em todos os nós.
3. A partir de um navegador em uma estação de trabalho cliente **fora da <span class="notranslate farm-term" translate="no">Farm</span>**, conecte-se a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   em seguida, insira o **nome do módulo** <span class="notranslate farm-term" translate="no">Farm</span> e execute o teste. Cada célula do mosaico exibe o nome do nó que respondeu à conexão TCP, e uma cor é associada a cada nó para mostrar claramente os blocos do mosaico servidos pelo mesmo nó.

   Em HTTPS, use `https://<VIP>:9453/safekit/mosaic.html`, com a regra de balanceamento de carga na porta 9453.

![Teste o endereço IP virtual de uma <span class="notranslate farm-term" translate="no">farm</span> SafeKit com o mosaico](/wp-content/uploads/2024/03/appli-19.png)

Assista ao vídeo de teste mosaico na seção " [Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> do SafeKit](/pt-br/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ".

## 3. Teste 1 – Distribuição de conexões {#3-test-1--distribution-of-connections}

**Passos**

1. Inicie a <span class="notranslate farm-term" translate="no">Farm</span> em todos os nós (estado UP).
2. Abra o mosaico a partir de uma estação de trabalho do cliente.

**Resultado esperado:** o mosaico exibe os nomes de **todos os nós** da <span class="notranslate farm-term" translate="no">Farm</span>, com uma cor diferente para cada nó de processamento.

Isso prova que o roteador ou gateway a montante atinge um dos nós por meio de seu endereço MAC e que esse nó distribui corretamente as conexões.

## 4. Teste 2 – Alteração do servidor de despacho {#4-test-2--change-of-dispatching-server}

Este teste verifica se o <span class="notranslate farm-term" translate="no">Farm</span> continua respondendo quando o servidor de despacho para.

**Passos**

1. Pare a <span class="notranslate farm-term" translate="no">Farm</span>, ou seja, todos os nós no SafeKit.
2. Inicie **um único nó**. Este nó se torna o servidor de despacho.
   → **Resultado esperado:** o mosaico exibe apenas este nó.
3. Inicie os outros nós.
   → **Resultado esperado:** o mosaico exibe todos os nós.
4. Pare o **primeiro nó**, aquele que atua como servidor de despacho.
   → **Resultado esperado:** o mosaico exibe os nós restantes.

> **Limitação deste teste:** um resultado correto na etapa 4 não prova que GARP funciona. Quando o módulo <span class="notranslate farm-term" translate="no">Farm</span> é iniciado nos outros nós (etapa 3), o endereço IP virtual é configurado nesses nós, o que gera mensagens na rede que podem redirecionar a associação do endereço IP virtual/endereço MAC. Apenas os testes 3 e 4 realmente testam GARP.

> Parar qualquer outro nó da <span class="notranslate farm-term" translate="no">Farm</span> (um que não seja o servidor de despacho) apenas testa a reconfiguração da distribuição.

## 5. Teste 3 – Verificando o redirecionamento GARP com `arp -a` {#5-test-3--checking-garp-rerouting-with-arp--a}

Juntamente com o teste 4, este teste realmente verifica GARP: você anota o endereço MAC do servidor de distribuição antes de pará-lo e, em seguida, verifica se a associação de IP virtual (VIP)/MAC foi alterada depois.

Este teste só é possível se a estação de trabalho do cliente que exibe o mosaico estiver na **mesma sub-rede IP** que a <span class="notranslate farm-term" translate="no">Farm</span>.

Se houver um roteador entre o cliente e a <span class="notranslate farm-term" translate="no">Farm</span>, a tabela ARP do cliente não conterá o IP Virtual (VIP), mas o endereço do gateway usado para chegar à rede da <span class="notranslate farm-term" translate="no">Farm</span>. Nesse caso, verifique a tabela ARP do roteador ou gateway com a equipe de rede.

**Passos**

1. Inicie a <span class="notranslate farm-term" translate="no">Farm</span> em todos os nós.
2. Na estação de trabalho do cliente, execute `arp -a` e anote o endereço MAC associado ao IP virtual (VIP). Ele identifica o servidor de despacho.
3. Pare o nó <span class="notranslate farm-term" translate="no">Farm</span> que tem este endereço MAC.
4. Verifique se o mosaico ainda funciona com os nós restantes.
5. Execute `arp -a` novamente para ler a nova associação de IP virtual (VIP)/MAC e identificar o novo servidor de distribuição.

## 6. Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

Você pode seguir uma conexão TCP para o IP virtual (VIP) capturando pacotes no cliente e nos nós <span class="notranslate farm-term" translate="no">Farm</span>: com o Wireshark em máquinas Windows e com o tcpdump em máquinas Linux.

Você deve observar os **cabeçalhos MAC (Ethernet) dos pacotes**, não apenas os endereços IP: o filtro do kernel do servidor de distribuição distribui as conexões **reescrevendo o endereço MAC de destino** dos pacotes para o do nó de processamento. O endereço IP de destino permanece o IP Virtual (VIP) ao longo de todo o caminho.

**O que você deve observar no mesmo pacote SYN:**

| Passo | Onde capturar pacotes | Endereços MAC observados |
|---|---|---|
| 1. O cliente envia para o IP Virtual (VIP) | cliente | MAC do cliente → MAC do **servidor de despacho** |
| 2. O servidor de despacho encaminha a conexão | servidor de despacho | MAC do servidor de despacho → MAC do **nó de processamento** |
| 3. O nó de processamento recebe | nó de processamento | Servidor de despacho MAC → MAC do nó |
| 4. O nó responde diretamente ao cliente | nó de processamento | MAC do nó → MAC do cliente |
| 5. O cliente recebe a resposta | cliente | MAC do nó → MAC do cliente |

> Se a estação de trabalho do cliente estiver em uma sub-rede diferente da <span class="notranslate farm-term" translate="no">Farm</span>, o "MAC do cliente" visto nos nós <span class="notranslate farm-term" translate="no">Farm</span> é o endereço MAC do **gateway** (roteador) que conecta as duas sub-redes, e não o da estação de trabalho do cliente.

Repita a captura após parar o servidor de despacho (teste 2, etapa 4): a etapa 1 deve agora mostrar o endereço MAC do **novo** servidor de despacho.

## 7. De quais estações de trabalho testar {#7-which-workstations-to-test-from}

O comportamento depende do caminho da rede entre o cliente e a <span class="notranslate farm-term" translate="no">Farm</span>. Execute os testes 1 e 2 de cada tipo de cliente relevante para sua arquitetura:

| Localização do cliente | O que o teste verifica |
|---|---|
| O cliente está na **mesma sub-rede** que a <span class="notranslate farm-term" translate="no">Farm</span> | Atualização das tabelas ARP dos clientes por GARP (3 testes possíveis) |
| Cliente em uma **sub-rede diferente** (roteador, gateway, rede virtual do hipervisor) | Tratamento GARP pelo roteador ou gateway |
| Máquina virtual cliente **em um hipervisor que também hospeda uma máquina virtual <span class="notranslate farm-term" translate="no">Farm</span>** | Comportamento do switch virtual do hipervisor, que também lida com a comutação e o roteamento internos |

## 8. Resumo dos resultados esperados {#8-summary-of-expected-results}

| Teste | Ação | Resultado esperado |
|---|---|---|
| 1 | Todos os nós UP, mosaico | Todos os nós aparecem |
| 2.2 | Um único nó foi iniciado | Apenas este nó aparece |
| 2.3 | Todos os nós foram iniciados | Todos os nós aparecem |
| 2.4 | O servidor de despacho parou | Os nós restantes aparecem, sem interrupção duradoura |
| 3 | `arp -a` antes e depois da parada | O endereço MAC associado ao IP virtual (VIP) muda |
| 4 | Captura do Wireshark ou tcpdump antes e depois da parada | O cliente envia para o endereço MAC do novo servidor de despacho |

## 9. Resolução de problemas {#9-troubleshooting}

- **Mapas de bits de balanceamento de carga:** para obter detalhes sobre o teste e os mapas de bits de balanceamento de carga, consulte o Guia do Usuário do SafeKit 8.2, seção 4.3.5 " [Teste de balanceamento de carga TCP em um endereço IP virtual](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#Mosaic) ".
- **O mosaico não responde mais após a interrupção do servidor de despacho:** GARP não é levado em consideração por um dispositivo no caminho (roteador, gateway, switch virtual). Verifique o tratamento GARP com sua equipe de rede.
- **Envio periódico de GARP:** o atributo `arpreroute="on"` da seção `<vip>` (com `arpinterval` e `arpelapse`) envia GARPs regularmente nos VIPs. Consulte o Guia do Usuário, seção 13.6.4 " [Sintaxe `<vip>`](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico da resolução de IP virtual (VIP) ↔ MAC:** consulte o Guia do Usuário, seção 7.24 " [Solução de problemas de resolução de IP virtual (VIP) ↔ MAC](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_Issue_with_VIP) " e seção 7.15 " [Módulo <span class="notranslate farm-term" translate="no">Farm</span> UP (Ready), mas problema de balanceamento de carga em uma <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> do SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-br  %}}

Para mais informações:
- [Como funciona um endereço IP virtual em um cluster de alta disponibilidade?](/pt-br/best-practises/how-a-virtual-ip-address-works/)
- Para failover primário/de backup com um endereço IP virtual, consulte [Testando o endereço IP virtual de um cluster mirror SafeKit](/pt-br/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-pt-br  %}}
