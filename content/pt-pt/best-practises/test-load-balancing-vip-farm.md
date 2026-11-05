---
title: "Testando o endereço IP virtual de balanceamento de carga numa cluster farm SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/test-load-balancing-vip-farm/"
description: "Aprenda a testar o balanceamento de carga do SafeKit em nós de cluster e a verificar a redundância de IP virtual, o redirecionamento GARP e o comportamento da rede."
category: "best-practises"
lang: "pt-pt"
topics: "Princípios-chave, Pré-requisito: o mosaico do SafeKit, Teste 1 – Distribuição de ligações, Teste 2 – Alteração do servidor de distribuição, Teste 3 – Verificação do redirecionamento GARP com arp -a, Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux), Quais estações de trabalho testar, Resumo dos resultados esperados, Resolução de problemas, Demonstração da solução farm do SafeKit"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 12 expressions"
---

# Testando o endereço IP virtual de balanceamento de carga numa cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

Este guia descreve como verificar se uma SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (módulo <span class="notranslate farm-term" translate="no">Farm</span>, balanceamento de carga num endereço IP virtual) funciona corretamente na sua rede: distribuição de ligações entre os nós e redirecionamento do IP Virtual (VIP) quando o nó de distribuição para.

## 1. Princípios-chave {#1-key-principles}

**Pré-requisito:** todos os nós da <span class="notranslate farm-term" translate="no">Farm</span> devem estar na mesma sub-rede IP de camada 2: uma LAN ou uma VLAN estendida entre locais remotos.

- O IP Virtual (VIP) é configurado localmente em cada nó da <span class="notranslate farm-term" translate="no">Farm</span>: é definido como um alias do endereço IP físico, na placa de rede desse endereço, quando a <span class="notranslate farm-term" translate="no">Farm</span> é iniciada no nó.
- Um único nó, o **servidor de distribuição**, recebe o tráfego de rede para o IP Virtual (VIP) (configuração `vmac_directed`, o padrão do SafeKit): o seu endereço MAC é o associado ao IP Virtual (VIP) nas tabelas ARP (router, gateway, clientes na mesma sub-rede).
- O filtro do kernel deste nó distribui então as ligações TCP pelos nós da <span class="notranslate farm-term" translate="no">Farm</span>, **reescrevendo o endereço MAC de destino** dos pacotes para o do nó de processamento (o endereço IP de destino permanece o IP Virtual (VIP)). As respostas são enviadas diretamente do nó que processa a ligação para o cliente.
- A distribuição realizada pelo filtro é **determinística** : o nó de processamento é calculado a partir da identidade do cliente, de acordo com a regra de balanceamento de carga configurada:
  - no **endereço IP do cliente** (`filter="on_addr"`): um determinado cliente é sempre servido pelo mesmo nó, o que garante a afinidade de sessão;
  - na **porta TCP do cliente** (`filter="on_port"`): cada ligação TCP do mesmo cliente pode ser servida por um nó diferente. Esta é a regra utilizada para o mosaico (secção 2), que, portanto, mostra todos os nós de uma única estação de trabalho.
- Se o servidor de despacho parar, outro nó assume essa função e envia **GARPs** (ARP gratuito) para que a rede associe o IP Virtual (VIP) ao seu próprio endereço MAC.

O que precisa, portanto, de testar:

1. que as ligações estão corretamente distribuídas por todos os nós;
2. que a rede (router, gateway, virtualização) leva em consideração o GARP quando o servidor de distribuição muda.

## 2. Pré-requisito: o mosaico do SafeKit {#2-prerequisite-the-safekit-mosaic}

O mosaico é uma página de teste fornecida pelo SafeKit. Abre muitas ligações TCP para o IP Virtual (VIP) e exibe, para cada uma, o nome do nó que respondeu. Isto mostra a distribuição de um relance.

1. No `userconfig.xml` do módulo <span class="notranslate farm-term" translate="no">Farm</span>, na secção `<vip>`, adicione a regra de balanceamento de carga na porta do servidor web SafeKit. Exemplo com o servidor web SafeKit em HTTP na porta 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Se o servidor web e a consola do SafeKit tiverem sido configurados para HTTPS, substitua 9010 por 9453.

2. Aplique a configuração em todos os nós.
3. A partir de um navegador numa estação de trabalho cliente **fora da <span class="notranslate farm-term" translate="no">Farm</span>**, ligue-se a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Em seguida, introduza o **nome do módulo** <span class="notranslate farm-term" translate="no">Farm</span> e execute o teste. Cada célula do mosaico exibe o nome do nó que respondeu à ligação TCP, e uma cor é associada a cada nó para mostrar claramente os blocos do mosaico servidos pelo mesmo nó.

   Em HTTPS, utilize `https://<VIP>:9453/safekit/mosaic.html`, com a regra de balanceamento de carga na porta 9453.

![Teste o endereço IP virtual de uma <span class="notranslate farm-term" translate="no">farm</span> SafeKit com o mosaico](/wp-content/uploads/2024/03/appli-19.png)

Assista ao vídeo de teste mosaico na secção " [Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> do SafeKit](/pt-pt/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ".

## 3. Teste 1 – Distribuição das ligações {#3-test-1--distribution-of-connections}

**Passos**

1. Inicie a <span class="notranslate farm-term" translate="no">Farm</span> em todos os nós (estado UP).
2. Abra o mosaico a partir de uma estação de trabalho do cliente.

**Resultado esperado:** o mosaico exibe os nomes de **todos os nós** da <span class="notranslate farm-term" translate="no">Farm</span>, com uma cor diferente para cada nó de processamento.

Isto prova que o router ou gateway a montante alcança um dos nós através do seu endereço MAC, e que este nó distribui corretamente as ligações.

## 4. Teste 2 – Alteração do servidor de envio {#4-test-2--change-of-dispatching-server}

Este teste verifica se a <span class="notranslate farm-term" translate="no">Farm</span> continua a responder quando o servidor de despacho para.

**Passos**

1. Parar a <span class="notranslate farm-term" translate="no">Farm</span>, ou seja, todos os nós no SafeKit.
2. Inicie **um único nó**. Este nó torna-se o servidor de distribuição.
   → **Resultado esperado:** o mosaico exibe apenas este nó.
3. Inicie os outros nós.
   → **Resultado esperado:** o mosaico exibe todos os nós.
4. Pare o **primeiro nó**, aquele que atua como servidor de distribuição.
   → **Resultado esperado:** o mosaico exibe os nós restantes.

> **Limitação deste teste:** um resultado correto na etapa 4 não prova que GARP funciona. Quando o módulo <span class="notranslate farm-term" translate="no">Farm</span> é iniciado nos outros nós (etapa 3), o endereço IP virtual é configurado nesses nós, o que gera mensagens na rede que podem já redirecionar a associação do endereço IP virtual/endereço MAC. Apenas os testes 3 e 4 testam realmente GARP.

> Parar qualquer outro nó da <span class="notranslate farm-term" translate="no">Farm</span> (um que não seja o servidor de despacho) apenas testa a reconfiguração da distribuição.

## 5. Teste 3 – Verificação do redirecionamento GARP com `arp -a` {#5-test-3--checking-garp-rerouting-with-arp--a}

Juntamente com o teste 4, este teste verifica realmente GARP: anote o endereço MAC do servidor de distribuição antes de o parar e, em seguida, verifique se a associação de IP Virtual (VIP)/MAC mudou depois.

Este teste só é possível se a estação de trabalho do cliente que exibe o mosaico estiver na **mesma sub-rede IP** que a <span class="notranslate farm-term" translate="no">Farm</span>.

Se existir um router entre o cliente e a <span class="notranslate farm-term" translate="no">Farm</span>, a tabela ARP do cliente não contém o IP Virtual (VIP), mas sim o endereço do gateway utilizado para aceder à rede da <span class="notranslate farm-term" translate="no">Farm</span>. Nesse caso, verifique a tabela ARP do router ou gateway com a equipa de rede.

**Passos**

1. Inicie a <span class="notranslate farm-term" translate="no">Farm</span> em todos os nós.
2. Na estação de trabalho do cliente, execute `arp -a` e anote o endereço MAC associado ao IP Virtual (VIP). Este identifica o servidor de distribuição.
3. Pare o nó <span class="notranslate farm-term" translate="no">Farm</span> que tem este endereço MAC.
4. Verifique se o mosaico ainda funciona com os nós restantes.
5. Execute `arp -a` novamente para ler a nova associação de IP virtual (VIP)/MAC e identificar o novo servidor de distribuição.

## 6. Teste 4 – Verificação completa com Wireshark (Windows) ou tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

É possível seguir uma ligação TCP para o IP Virtual (VIP) capturando pacotes no cliente e nos nós <span class="notranslate farm-term" translate="no">Farm</span>: com o Wireshark em máquinas Windows e com o tcpdump em máquinas Linux.

É preciso analisar os **cabeçalhos MAC (Ethernet) dos pacotes**, e não apenas os endereços IP: o filtro do kernel do servidor de distribuição distribui as ligações **reescrevendo o endereço MAC de destino** dos pacotes para o do nó de processamento. O endereço IP de destino permanece o IP Virtual (VIP) ao longo de todo o percurso.

**O que deve observar no mesmo pacote SYN:**

| Passo | Onde capturar pacotes | Endereços MAC observados |
|---|---|---|
| 1. O cliente envia para o IP Virtual (VIP) | cliente | MAC do cliente → MAC do **servidor de distribuição** |
| 2. O servidor de encaminhamento reencaminha a ligação | servidor de despacho | Servidor de despacho MAC → MAC do **nó de processamento** |
| 3. O nó de processamento recebe | nó de processamento | Servidor de despacho MAC → MAC do nó |
| 4. O nó responde diretamente ao cliente | nó de processamento | MAC do nó → MAC do cliente |
| 5. O cliente recebe a resposta | cliente | MAC do nó → MAC do cliente |

> Se a estação de trabalho do cliente estiver numa sub-rede diferente da <span class="notranslate farm-term" translate="no">Farm</span>, o "MAC do cliente" visível nos nós da <span class="notranslate farm-term" translate="no">Farm</span> é o endereço MAC do **gateway** (router) que liga as duas sub-redes, e não o da estação de trabalho do cliente.

Repita a captura após parar o servidor de distribuição (teste 2, passo 4): o passo 1 deve agora mostrar o endereço MAC do **novo** servidor de distribuição.

## 7. De quais estações de trabalho testar {#7-which-workstations-to-test-from}

O comportamento depende do caminho de rede entre o cliente e a <span class="notranslate farm-term" translate="no">Farm</span>. Execute os testes 1 e 2 de cada tipo de cliente relevante para a sua arquitetura:

| Localização do cliente | O que o teste verifica |
|---|---|
| O cliente está na **mesma sub-rede** que a <span class="notranslate farm-term" translate="no">Farm</span> | Atualização das tabelas ARP dos clientes por GARP (3 testes possíveis) |
| Cliente numa **sub-rede diferente** (router, gateway, rede virtual do hipervisor) | Gestão GARP pelo router ou gateway |
| Máquina virtual de cliente **num hipervisor que também aloja uma máquina virtual <span class="notranslate farm-term" translate="no">Farm</span>** | Comportamento do comutador virtual do hipervisor, que também lida com a comutação e o encaminhamento internos |

## 8. Resumo dos resultados esperados {#8-summary-of-expected-results}

| Teste | Ação | Resultado esperado |
|---|---|---|
| 1 | Todos os nós UP, mosaico | Todos os nós aparecem |
| 2.2 | Um único nó foi iniciado | Apenas este nó aparece |
| 2.3 | Todos os nós foram iniciados | Todos os nós aparecem |
| 2.4 | O servidor de despacho foi parado | Os nós restantes aparecem, sem interrupção duradoura |
| 3 | `arp -a` antes e depois da paragem | O endereço MAC associado ao IP Virtual (VIP) muda |
| 4 | Captura de dados com o Wireshark ou o tcpdump antes e depois da paragem | O cliente envia para o endereço MAC do novo servidor de encaminhamento |

## 9. Resolução de problemas {#9-troubleshooting}

- **Mapas de bits de balanceamento de carga:** para obter detalhes sobre o teste e os mapas de bits de balanceamento de carga, consulte o Guia do Utilizador do SafeKit 8.2, secção 4.3.5 " [Teste de balanceamento de carga TCP num endereço IP virtual](https://safekit.eviden.com/pt-pt/resources/safekit-user-guide-82/#Mosaic) ".
- **O mosaico deixa de responder depois de o servidor de envio parar:** GARP não é tido em conta por um dispositivo no caminho (router, gateway, switch virtual). Verifique o tratamento GARP com a sua equipa de rede.
- **Envio periódico de GARP:** o atributo `arpreroute="on"` da secção `<vip>` (com `arpinterval` e `arpelapse`) envia GARPs regularmente para os VIPs. Consulte o Guia do Utilizador, secção 13.6.4 " [Sintaxe `<vip>`](https://safekit.eviden.com/pt-pt/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico da resolução de IP Virtual (VIP) ↔ MAC:** consulte o Guia do Utilizador, secção 7.24 " [Resolução de problemas de IP Virtual (VIP) ↔ MAC](https://safekit.eviden.com/pt-pt/resources/safekit-user-guide-82/#_Issue_with_VIP) " e secção 7.15 " [Módulo <span class="notranslate farm-term" translate="no">Farm</span> UP (Ready), mas problema de balanceamento de carga numa <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/pt-pt/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

Para mais informações:
- [Como funciona um endereço IP virtual em clusters de alta disponibilidade?](/pt-pt/best-practises/how-a-virtual-ip-address-works/)
- Para o failover primário/de reserva com um endereço IP virtual, consulte [Testar o endereço IP virtual de um cluster mirror SafeKit](/pt-pt/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-pt-pt  %}}
