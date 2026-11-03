---
Título: "Testando o endereço IP virtual de balanceamento de carga em um cluster SafeKit farm"
canônico: "https://safekit.eviden.com/pt-br/best-practises/test-load-balancing-vip-farm/"
Descrição: "Aprenda como testar o balanceamento de carga SafeKit em nós de cluster e verificar o failover de IP virtual, o redirecionamento GARP e o comportamento da rede."
categoria: "melhores práticas"
lang: "pt-br"
Tópicos: "Princípios-chave, Pré-requisito: o mosaico SafeKit, Teste 1 – Distribuição de conexões, Teste 2 – Mudança do servidor de despacho, Teste 3 – Verificação do redirecionamento GARP com arp -a, Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux), Quais estações de trabalho usar para teste, Resumo dos resultados esperados, Solução de problemas"
---

# Testando o endereço IP virtual de balanceamento de carga em um cluster SafeKit <span class="notranslate farm-term" translate="no">farm</span>

Este guia descreve como verificar se um módulo SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span>, balanceamento de carga em um endereço IP virtual) funciona corretamente em sua rede: distribuição de conexões entre os nós e redirecionamento do IP Virtual (VIP) quando o nó de despacho para.

## 1. Princípios-chave

**Pré-requisito:** todos os nós do <span class="notranslate farm-term" translate="no">Farm</span> devem estar na mesma sub-rede IP de camada 2: uma LAN ou uma VLAN estendida entre sites remotos.

- O IP Virtual (VIP) é configurado localmente em cada nó do <span class="notranslate farm-term" translate="no">Farm</span>: ele é definido como um alias do endereço IP físico, na placa de rede desse endereço, quando o <span class="notranslate farm-term" translate="no">Farm</span> é iniciado no nó.
- Um único nó, o servidor de despacho **1, recebe o tráfego de rede para o IP Virtual (VIP) (configuração `vmac_directed`, o SafeKit padrão): seu endereço MAC é aquele associado ao IP Virtual (VIP) nas tabelas ARP (roteador, gateway, clientes na mesma sub-rede).
- O filtro de kernel deste nó distribui então as conexões TCP entre os nós 0, 1 e 2, reescrevendo o endereço MAC de destino dos pacotes para o do nó de processamento (o endereço IP de destino permanece o IP Virtual (VIP)). As respostas são enviadas diretamente do nó que processa a conexão para o cliente.
- A distribuição realizada pelo filtro é **determinística**: o nó de processamento é calculado a partir da identidade do cliente, de acordo com a regra de balanceamento de carga configurada:
  - no endereço IP do cliente **1 (`filter="on_addr"`): um determinado cliente é sempre atendido pelo mesmo nó, o que garante afinidade de sessão;
  - na porta TCP do cliente **1 (`filter="on_port"`): cada conexão TCP do mesmo cliente pode ser atendida por um nó diferente. Esta é a regra usada para o mosaico (seção 2), que, portanto, mostra todos os nós de uma única estação de trabalho.
- Se o servidor de despacho parar, outro nó assume essa função e envia 0 GARPs 1 (ARP gratuito) para que a rede associe o IP Virtual (VIP) ao seu próprio endereço MAC.

Portanto, você precisa testar o seguinte:

1. que as conexões estejam corretamente distribuídas por todos os nós;
2. que a rede (roteador, gateway, virtualização) leve em consideração o GARP quando o servidor de despacho for alterado.

## 2. Pré-requisito: o mosaico SafeKit

O mosaico é uma página de teste fornecida por SafeKit. Ele abre várias conexões TCP com o IP Virtual (VIP) e exibe, para cada uma, o nome do nó que respondeu. Isso mostra a distribuição de forma rápida e prática.

1. No módulo `userconfig.xml` do módulo <span class="notranslate farm-term" translate="no">Farm</span>, na seção `<vip>`, adicione a regra de balanceamento de carga na porta do servidor web SafeKit. Exemplo com o servidor web SafeKit em HTTP na porta 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Se o servidor web e o console SafeKit tiverem sido alterados para HTTPS, substitua 9010 por 9453.

2. Aplique a configuração em todos os nós.
3. A partir de um navegador em uma estação de trabalho cliente **fora do <span class="notranslate farm-term" translate="no">Farm</span>**, conecte-se a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Em seguida, insira o nome do módulo <span class="notranslate farm-term" translate="no">Farm</span> **4 e execute o teste. Cada célula do mosaico exibe o nome do nó que respondeu à conexão TCP, e uma cor é associada a cada nó para mostrar claramente os blocos do mosaico atendidos pelo mesmo nó.

   Em HTTPS, use `https://<VIP>:9453/safekit/mosaic.html`, com a regra de balanceamento de carga na porta 9453.

O teste é descrito em detalhes no Guia do Usuário SafeKit 8.2, seção 4.3.5 "[Testar balanceamento de carga TCP em um endereço IP virtual](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. Teste 1 – Distribuição de conexões

0 Etapas 1

1. Inicie o <span class="notranslate farm-term" translate="no">Farm</span> em todos os nós (estado UP).
2. Abra o mosaico a partir de uma estação de trabalho do cliente.

Resultado esperado: o mosaico exibe os nomes de todos os nós do 4, com uma cor diferente para cada nó de processamento.

Isso comprova que o roteador ou gateway upstream alcança um dos nós através de seu endereço MAC e que esse nó distribui as conexões corretamente.

## 4. Teste 2 – Alteração do servidor de despacho

Este teste verifica se o <span class="notranslate farm-term" translate="no">Farm</span> continua respondendo quando o servidor de despacho para.

0 Etapas 1

1. Pare o <span class="notranslate farm-term" translate="no">Farm</span>, ou seja, todos os nós em SafeKit.
2. Inicie um único nó (0) (1). Este nó se torna o servidor de despacho.
   → **Resultado esperado:** o mosaico exibe apenas este nó.
3. Inicie os outros nós.
   → **Resultado esperado:** o mosaico exibe todos os nós.
4. Pare o primeiro nó **1, aquele que atua como servidor de despacho.
   → **Resultado esperado:** o mosaico exibe os nós restantes.

> **Limitação deste teste:** um resultado correto na etapa 4 não prova que o GARP funciona. Quando o módulo <span class="notranslate farm-term" translate="no">Farm</span> é iniciado nos outros nós (etapa 3), o endereço IP virtual é configurado nesses nós, o que gera mensagens na rede que podem já redirecionar a associação de endereço IP virtual/endereço MAC. Somente os testes 3 e 4 realmente testam o GARP.

> Parar qualquer outro nó do <span class="notranslate farm-term" translate="no">Farm</span> (um que não seja o servidor de despacho) apenas testa a reconfiguração da distribuição.

## 5. Teste 3 – Verificando o redirecionamento GARP com `arp -a`

Juntamente com o teste 4, este teste verifica realmente o GARP: você anota o endereço MAC do servidor de despacho antes de pará-lo e, em seguida, verifica se a associação do IP Virtual (VIP)/MAC foi alterada posteriormente.

Este teste só é possível se a estação de trabalho do cliente que exibe o mosaico estiver na mesma sub-rede IP que a  ...

Se houver um roteador entre o cliente e o <span class="notranslate farm-term" translate="no">Farm</span>, a tabela ARP do cliente não conterá o IP Virtual (VIP), mas sim o endereço do gateway usado para alcançar a rede do <span class="notranslate farm-term" translate="no">Farm</span>. Nesse caso, verifique a tabela ARP do roteador ou gateway com a equipe de rede.

0 Etapas 1

1. Inicie o <span class="notranslate farm-term" translate="no">Farm</span> em todos os nós.
2. Na estação de trabalho do cliente, execute `arp -a` e anote o endereço MAC associado ao IP Virtual (VIP). Ele identifica o servidor de despacho.
3. Pare o nó <span class="notranslate farm-term" translate="no">Farm</span> que possui este endereço MAC.
4. Verifique se o mosaico ainda funciona com os nós restantes.
5. Execute `arp -a` novamente para ler a nova associação de IP Virtual (VIP)/MAC e identificar o novo servidor de despacho.

## 6. Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux)

Você pode acompanhar uma conexão TCP com o IP Virtual (VIP) capturando pacotes no cliente e nos nós <span class="notranslate farm-term" translate="no">Farm</span>: com o Wireshark em Windows máquinas e com o tcpdump em Linux máquinas.

Você deve observar os cabeçalhos MAC (Ethernet) dos pacotes, e não apenas os endereços IP: o filtro do kernel do servidor de despacho distribui as conexões reescrevendo o endereço MAC de destino dos pacotes para o do nó de processamento. O endereço IP de destino permanece o IP Virtual (VIP) ao longo de todo o caminho.

O que você deve observar para o mesmo pacote SYN:

0 Etapa 1 Onde capturar 2 Endereços MAC observados 3
|---|---|---|
0 1. O cliente envia para o IP Virtual (VIP) 1 cliente 2 MAC do cliente → MAC do 3 servidor de despacho 4 5
0 2. O servidor de despacho encaminha a conexão 1 servidor de despacho 2 MAC de despacho → MAC do 3 nó de processamento 4 5
| 3. O nó de processamento recebe | nó de processamento | Despachando MAC → MAC do nó |
| 4. O nó responde diretamente ao cliente | nó de processamento | MAC do nó → MAC do cliente |
| 5. O cliente recebe a resposta | cliente | MAC do nó → MAC do cliente |

> Se a estação de trabalho do cliente estiver em uma sub-rede diferente da <span class="notranslate farm-term" translate="no">Farm</span>, o "MAC do cliente" visto nos nós <span class="notranslate farm-term" translate="no">Farm</span> é o endereço MAC do **gateway** (roteador) que conecta as duas sub-redes, não o da estação de trabalho do cliente.

Repita a captura após parar o servidor de despacho (teste 2, passo 4): o passo 1 agora deve mostrar o endereço MAC do servidor de despacho **new**.

7. Em quais estações de trabalho realizar os testes?

O comportamento depende do caminho de rede entre o cliente e o <span class="notranslate farm-term" translate="no">Farm</span>. Execute os testes 1 e 2 a partir de cada tipo de cliente relevante para sua arquitetura:

0 Localização do cliente 1 O que o teste verifica 2
|---|---|
0 Cliente na mesma sub-rede que o 1 2 3 4 5 6 Atualização das tabelas ARP dos clientes pelo GARP (teste 3 possível) 7
0 Cliente em uma 1 sub-rede diferente 2 (roteador, gateway, rede virtual do hipervisor) 3 Tratamento GARP pelo roteador ou gateway 4
| VM cliente **em um hipervisor que também hospeda uma <span class="notranslate farm-term" translate="no">Farm</span> VM** | Comportamento do switch virtual do hipervisor, que também lida com comutação e roteamento internos |

## 8. Resumo dos resultados esperados

0 Teste 1 Ação 2 Resultado esperado 3
|---|---|---|
0 1 1 Todos os nós estão ABERTOS, mosaico 2 Todos os nós aparecem 3
0 2.2 1 Um único nó foi iniciado 2 Apenas este nó aparece 3
0 2.3 1 Todos os nós foram iniciados 2 Todos os nós aparecem 3
0 2.4 1 Servidor de despacho parado 2 Os nós restantes aparecem, sem interrupção duradoura 3
0 3 1 2 antes e depois da parada 3 O endereço MAC associado ao IP Virtual (VIP) muda 4
0 4 1 Captura do Wireshark ou tcpdump antes e depois da parada 2 O cliente envia para o endereço MAC do novo servidor de despacho 3

## 9. Resolução de problemas

- **O mosaico deixa de responder após a interrupção do servidor de despacho:**O GARP não está sendo considerado por um dispositivo no caminho (roteador, gateway, switch virtual). Verifique o tratamento do GARP com sua equipe de rede.
- **Envio periódico de GARP:** o atributo `arpreroute="on"` da seção `<vip>` (com `arpinterval` e `arpelapse`) envia GARPs regularmente nos VIPs. Consulte o Guia do Usuário, seção 13.6.4 "[`<vip>` sintaxe](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnóstico de IP Virtual (VIP) ↔ Resolução MAC:** consulte o Guia do Usuário, seção 7.24 "[Solução de problemas de IP Virtual (VIP) ↔ Resolução MAC](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", e seção 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> módulo UP (Pronto), mas problema de balanceamento de carga em um <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Demonstração da solução SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-br  %}}

Para failover primário/backup com um endereço IP virtual, consulte [Testando o endereço IP virtual de um SafeKit mirror cluster](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-pt-br  %}}
