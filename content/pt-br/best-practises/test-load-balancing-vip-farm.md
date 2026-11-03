---
title: "Testando o endereço IP virtual de balanceamento de carga em um SafeKit farm conjunto"
canonical: "https://safekit.eviden.com/pt-br/best-practises/test-load-balancing-vip-farm/"
description: "Aprenda como testar SafeKit balanceamento de carga entre os nós do cluster e verificação de failover de IP virtual, redirecionamento GARP e comportamento da rede."
category: "melhores práticas"
lang: "pt-br"
topics: "Princípios-chave, Pré-requisito: o SafeKit Mosaico, Teste 1 – Distribuição de conexões, Teste 2 – Alteração do servidor de despacho, Teste 3 – Verificação do redirecionamento GARP com arp -a, Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux), Quais estações de trabalho usar para os testes, Resumo dos resultados esperados, Solução de problemas"
---

# Testando o endereço IP virtual de balanceamento de carga em um SafeKit <span class="notranslate farm-term" translate="no">farm</span> conjunto

Este guia descreve como verificar se um SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> O módulo de balanceamento de carga em um endereço IP virtual funciona corretamente em sua rede: distribuição de conexões entre os nós e redirecionamento do IP virtual (VIP) quando o nó de distribuição para.

## 1. Princípios fundamentais

**Pré-requisito:** todos os nós do <span class="notranslate farm-term" translate="no">Farm</span> Devem estar na mesma sub-rede IP de camada 2: uma LAN ou uma VLAN estendida entre locais remotos.

- O endereço IP virtual (VIP) é configurado localmente em cada nó do <span class="notranslate farm-term" translate="no">Farm</span>É definido como um alias do endereço IP físico, na placa de rede desse endereço, quando o <span class="notranslate farm-term" translate="no">Farm</span> é iniciado no nó.
- Um único nó, o **servidor de despacho**, recebe o tráfego de rede para o IP Virtual (VIP) (`vmac_directed` configuração, o SafeKit Por padrão): seu endereço MAC é aquele associado ao IP Virtual (VIP) nas tabelas ARP (roteador, gateway, clientes na mesma sub-rede).
- O filtro de kernel deste nó distribui então as conexões TCP entre os nós do <span class="notranslate farm-term" translate="no">Farm</span>, por **reescrevendo o endereço MAC de destino** dos pacotes para o nó de processamento (o endereço IP de destino permanece o IP Virtual (VIP)). As respostas são enviadas diretamente do nó que processa a conexão para o cliente.
- A distribuição realizada pelo filtro é **determinístico**O nó de processamento é calculado a partir da identidade do cliente, de acordo com a regra de balanceamento de carga configurada:
  - no **endereço IP do cliente** (`filter="on_addr"`): um determinado cliente é sempre atendido pelo mesmo nó, o que garante a afinidade de sessão;
  - no **porta TCP do cliente** (`filter="on_port"`Cada conexão TCP do mesmo cliente pode ser atendida por um nó diferente. Essa é a regra usada para o mosaico (seção 2), que, portanto, mostra todos os nós de uma única estação de trabalho.
- Se o servidor de despacho parar, outro nó assume essa função e envia as informações. **GARPs** (ARP gratuito) para que a rede associe o IP Virtual (VIP) ao seu próprio endereço MAC.

Portanto, você precisa testar o seguinte:

1. que as conexões estejam distribuídas corretamente por todos os nós;
2. que a rede (roteador, gateway, virtualização) leve em consideração o GARP quando o servidor de despacho for alterado.

## 2. Pré-requisito: o SafeKit mosaico

O mosaico é uma página de teste fornecida por SafeKitEle abre várias conexões TCP com o IP Virtual (VIP) e exibe, para cada uma, o nome do nó que respondeu. Isso mostra a distribuição de forma clara e concisa.

1. No `userconfig.xml` do <span class="notranslate farm-term" translate="no">Farm</span> módulo, no `<vip>` Na seção, adicione a regra de balanceamento de carga na porta do SafeKit servidor web. Exemplo com o SafeKit Servidor web em HTTP na porta 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Se o SafeKit O servidor web e o console foram migrados para HTTPS; substitua a porta 9010 pela porta 9453.

2. Aplique a configuração em todos os nós.
3. A partir de um navegador em uma estação de trabalho do cliente. **fora do <span class="notranslate farm-term" translate="no">Farm</span>**, conectar-se a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   então entre no <span class="notranslate farm-term" translate="no">Farm</span> **nome do módulo** e execute o teste. Cada célula do mosaico exibe o nome do nó que respondeu à conexão TCP, e uma cor é associada a cada nó para mostrar claramente os blocos do mosaico atendidos pelo mesmo nó.

   Em HTTPS, use `https://<VIP>:9453/safekit/mosaic.html`, com a regra de balanceamento de carga na porta 9453.

O teste é descrito em detalhes no SafeKit 8.2 Guia do Usuário, seção 4.3.5 "[Teste o balanceamento de carga TCP em um endereço IP virtual.](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. Teste 1 – Distribuição de conexões

**Passos**

1. Comece o <span class="notranslate farm-term" translate="no">Farm</span> em todos os nós (estado ATIVO).
2. Abra o mosaico a partir de uma estação de trabalho do cliente.

**Resultado esperado:** O mosaico exibe os nomes de **todos os nós** do <span class="notranslate farm-term" translate="no">Farm</span>, com uma cor diferente para cada nó de processamento.

Isso comprova que o roteador ou gateway upstream alcança um dos nós através de seu endereço MAC e que esse nó distribui as conexões corretamente.

## 4. Teste 2 – Alteração do servidor de despacho

Este teste verifica se o <span class="notranslate farm-term" translate="no">Farm</span> Continua respondendo mesmo quando o servidor de despacho para.

**Passos**

1. Pare o <span class="notranslate farm-term" translate="no">Farm</span>, ou seja, todos os nós em SafeKit.
2. Começar **um único nó**Este nó se torna o servidor de despacho.
   → **Resultado esperado:** O mosaico exibe apenas este nó.
3. Inicie os outros nós.
   → **Resultado esperado:** O mosaico exibe todos os nós.
4. Pare o **primeiro nó**, aquele que atua como servidor de despacho.
   → **Resultado esperado:** O mosaico exibe os nós restantes.

> **Limitações deste teste:** Um resultado correto na etapa 4 não prova que o GARP funciona. Quando o <span class="notranslate farm-term" translate="no">Farm</span> O módulo é iniciado nos outros nós (etapa 3), o endereço IP virtual é configurado nesses nós, o que gera mensagens na rede que podem já redirecionar a associação de endereço IP virtual/endereço MAC. Somente os testes 3 e 4 realmente testam o GARP.

> Interrompendo qualquer outro nó do <span class="notranslate farm-term" translate="no">Farm</span> (Aquele que não é o servidor de despacho) testa apenas a reconfiguração da distribuição.

## 5. Teste 3 – Verificando o redirecionamento GARP com `arp -a`

Juntamente com o teste 4, este teste verifica realmente o GARP: você anota o endereço MAC do servidor de despacho antes de pará-lo e, em seguida, verifica se o IP Virtual (VIP)/MAC A associação mudou posteriormente.

Este teste só é possível se a estação de trabalho do cliente que exibe o mosaico estiver no **mesma sub-rede IP** como o <span class="notranslate farm-term" translate="no">Farm</span>.

Se houver um roteador entre o cliente e o <span class="notranslate farm-term" translate="no">Farm</span>, a tabela ARP do cliente não contém o IP Virtual (VIP), mas sim o endereço do gateway usado para alcançar o <span class="notranslate farm-term" translate="no">Farm</span>na rede. Nesse caso, verifique a tabela ARP do roteador ou gateway com a equipe de rede.

**Passos**

1. Comece o <span class="notranslate farm-term" translate="no">Farm</span> em todos os nós.
2. Na estação de trabalho do cliente, execute `arp -a` e observe o endereço MAC associado ao IP Virtual (VIP). Ele identifica o servidor de despacho.
3. Pare o <span class="notranslate farm-term" translate="no">Farm</span> nó que possui este endereço MAC.
4. Verifique se o mosaico ainda funciona com os nós restantes.
5. Correr `arp -a` novamente para ler o novo IP Virtual (VIP)/MAC associação e identificação do novo servidor de despacho.

## 6. Teste 4 – Verificação de ponta a ponta com o Wireshark (Windows) ou tcpdump (Linux)

É possível rastrear uma conexão TCP até o IP Virtual (VIP) capturando pacotes no cliente e no servidor. <span class="notranslate farm-term" translate="no">Farm</span> nós: com o Wireshark ativado Windows máquinas, e com o tcpdump ativado Linux máquinas.

Você precisa olhar para o **Cabeçalhos MAC (Ethernet) dos pacotes**, não apenas os endereços IP: o filtro do kernel do servidor de despacho distribui as conexões por **reescrevendo o endereço MAC de destino** dos pacotes para o nó de processamento. O endereço IP de destino permanece o IP Virtual (VIP) ao longo de todo o percurso.

**O que você deve observar para o mesmo pacote SYN:**

| Etapa | Onde capturar | Endereços MAC observados |
|---|---|---|
| 1. O cliente envia para o IP Virtual (VIP) | cliente | MAC do cliente → MAC do **servidor de despacho** |
| 2. O servidor de despacho encaminha a conexão. | servidor de despacho | Despachando MAC → MAC do **nó de processamento** |
| 3. O nó de processamento recebe | nó de processamento | Despacho MAC → nó MAC |
| 4. O nó responde diretamente ao cliente. | nó de processamento | MAC do nó → MAC do cliente |
| 5. O cliente recebe a resposta. | cliente | MAC do nó → MAC do cliente |

> Se a estação de trabalho do cliente estiver em uma sub-rede diferente da <span class="notranslate farm-term" translate="no">Farm</span>, o "MAC do cliente" visto no <span class="notranslate farm-term" translate="no">Farm</span> nós é o endereço MAC do **portal** (roteador) que conecta as duas sub-redes, não o da estação de trabalho do cliente.

Repita a captura após parar o servidor de despacho (teste 2, etapa 4): a etapa 1 agora deve mostrar o endereço MAC do **novo** servidor de despacho.

## 7. Em quais estações de trabalho realizar os testes?

O comportamento depende do caminho de rede entre o cliente e o servidor. <span class="notranslate farm-term" translate="no">Farm</span>Execute os testes 1 e 2 para cada tipo de cliente relevante para sua arquitetura:

| Localização do cliente | O que o teste verifica |
|---|---|
| Cliente no **mesma sub-rede** como o <span class="notranslate farm-term" translate="no">Farm</span> | Atualização das tabelas ARP dos clientes pelo GARP (teste 3 possível) |
| Cliente em um **sub-rede diferente** (roteador, gateway, hipervisor, rede virtual) | Tratamento do GARP pelo roteador ou gateway |
| VM do cliente **em um hipervisor que também hospeda um <span class="notranslate farm-term" translate="no">Farm</span> VM** | Comportamento do switch virtual do hipervisor, que também lida com comutação e roteamento internos. |

## 8. Resumo dos resultados esperados

| Teste | Ação | Resultado esperado |
|---|---|---|
| 1 | Todos os nós ATIVOS, mosaico | Todos os nós aparecem |
| 2.2 | Um único nó foi iniciado. | Apenas este nó aparece |
| 2.3 | Todos os nós foram iniciados. | Todos os nós aparecem |
| 2.4 | Servidor de despacho parado | Os nós restantes aparecem, sem interrupção duradoura. |
| 3 | `arp -a` antes e depois da parada | O endereço MAC associado ao IP Virtual (VIP) muda. |
| 4 | Captura com Wireshark ou tcpdump antes e depois da parada. | O cliente envia dados para o endereço MAC do novo servidor de despacho. |

## 9. Solução de problemas

- **O mosaico deixa de responder após a parada do servidor de distribuição:** O GARP não é considerado por um dispositivo no caminho (roteador, gateway, switch virtual). Verifique o tratamento do GARP com sua equipe de rede.
- **Envio periódico de GARP:** o `arpreroute="on"` atributo do `<vip>` seção (com `arpinterval` e `arpelapse`) envia GARPs regularmente para os VIPs. Consulte o Guia do Usuário, seção 13.6.4 "[`<vip>` sintaxe](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnóstico de IP Virtual (VIP) ↔ Resolução de MAC:** Consulte o Guia do Usuário, seção 7.24.[Resolução de problemas de IP virtual (VIP) ↔ Resolução de MAC](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", e seção 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> Módulo ATIVO (Pronto), mas há um problema de balanceamento de carga em um <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Demonstração do SafeKit <span class="notranslate farm-term" translate="no">farm</span> solução {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-en  %}}

Para failover primário/de backup com um endereço IP virtual, consulte [Testando o endereço IP virtual de um SafeKit mirror conjunto](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-en  %}}
