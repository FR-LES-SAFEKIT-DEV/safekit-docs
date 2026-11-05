---
title: "Testando o endereço IP virtual de um cluster mirror do SafeKit"
canonical: "https://safekit.eviden.com/pt-br/best-practises/test-primary-backup-vip-mirror/"
description: "Teste a disponibilidade e o failover de IP virtual em um cluster mirror SafeKit, incluindo o redirecionamento GARP, verificações ARP e capturas de pacotes."
category: "best-practises"
lang: "pt-br"
topics: "Princípios-chave, Pré-requisito: configuração de IP virtual (VIP), Teste 1 – IP virtual (VIP) mantido pelo servidor primário, Teste 2 – Failover manual (parada do primário), Teste 3 – Verificação do redirecionamento GARP com arp -a, Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux), Quais estações de trabalho testar, Resumo dos resultados esperados, Solução de problemas"
translation: "translate_md 2026-11-05.10 | glossaire 2026-11-05.14 | Translation LLM | 12 expressions"
---

# Testando o endereço IP virtual de um cluster mirror do SafeKit na sua rede {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

Este guia descreve como verificar se o endereço IP virtual (VIP) de um cluster mirror SafeKit (módulo mirror) funciona corretamente em sua rede: o IP virtual (VIP) é mantido pelo servidor primário e é redirecionado para o novo servidor primário após uma falha.

## 1. Princípios-chave {#1-key-principles}

**Pré-requisito:** ambos os nós do cluster mirror devem estar na mesma sub-rede IP de camada 2: uma LAN ou uma VLAN estendida entre locais remotos.

- O IP Virtual (VIP) está ativo apenas no **servidor primário** (estados PRIM ou ALONE): ele é definido como um alias do endereço IP físico, na placa de rede desse endereço, quando o módulo é iniciado como primário no nó (configuração `where="one_side_alias"`).
- O endereço MAC do servidor primário é, portanto, o associado ao IP Virtual (VIP) nas tabelas ARP (roteador, gateway, clientes na mesma sub-rede). Todo o tráfego para o IP Virtual (VIP) é enviado para o primário.
- Durante um failover (parada ou falha do primário), o IP Virtual (VIP) é removido do antigo primário e definido como um alias no novo primário. Dois mecanismos permitem então que a rede associe o IP Virtual (VIP) ao endereço MAC do novo primário:
  - as mensagens de rede enviadas pelo sistema operacional quando o IP virtual (VIP) é adicionado como um alias na placa de rede;
  - os **GARPs** (ARP gratuito) enviados pelo SafeKit, quando o atributo `arpreroute="on"` é configurado na seção `<vip>`.

O que você precisa testar:

1. o IP virtual (VIP) é mantido pelo servidor principal e pode ser acessado pelos clientes;
2. o endereço MAC associado ao IP virtual (VIP) é redirecionado para o novo primário na rede (roteador, gateway, virtualização) quando o servidor primário muda.

## 2. Pré-requisito: configuração de IP virtual (VIP) {#2-prerequisite-virtual-ip-vip-configuration}

1. No `userconfig.xml` do módulo mirror, configure o IP virtual (VIP) na seção `<vip>`. O atributo `arpreroute="on"` faz com que o novo primário envie GARPs após um failover:

   ```xml
   <vip>
     <interface_list>
       <interface arpreroute="on">
         <real_interface>
           <virtual_addr addr="<VIP>" where="one_side_alias"/>
         </real_interface>
       </interface>
     </interface_list>
   </vip>
   ```

2. Aplique a configuração em ambos os nós.
3. Inicie o módulo: um nó deve estar **PRIM (Ready)** e o outro **SECOND (Ready)**.

## 3. Teste 1 – IP virtual (VIP) mantido pelo servidor principal {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**Passos**

1. No servidor principal, execute o `ipconfig` (Windows) ou `ip addr show` (Linux).
   → **Resultado esperado:** o IP virtual (VIP) aparece como um alias na placa de rede do endereço IP físico.
2. No servidor secundário, execute o mesmo comando.
   → **Resultado esperado:** o IP virtual (VIP) não aparece.
3. A partir de uma estação de trabalho do cliente **fora do cluster**, `ping` os dois endereços IP físicos e para o IP virtual (VIP).
   → **Resultado esperado:** todos os três comandos `ping` respondem (a menos que sejam filtrados por firewalls).
4. Verifique o acesso através do IP Virtual (VIP) com o mosaico do SafeKit: a partir de um navegador no cliente **externo**, conecte-se a `http://<VIP>:9010/safekit/mosaic.html` (ou use a porta 9453 se o servidor web e o console do SafeKit tiverem sido alterados para HTTPS), em seguida, insira o **nome do módulo** mirror e execute o teste.
   → **Resultado esperado:** todas as células do mosaico exibem o nome do **servidor primário**, em uma única cor: todas as conexões TCP para o IP virtual (VIP) são atendidas pelo primário.

![Teste o endereço IP virtual de um mirror SafeKit com o mosaico](/wp-content/uploads/2024/03/appli-20.png)

## 4. Teste 2 – Failover manual (parada do primário) {#4-test-2--manual-failover-stop-of-the-primary}

Este teste verifica se o IP virtual (VIP) segue o servidor principal durante um failover, acionado pela interrupção do módulo no servidor principal.

**Passos**

1. Pare o módulo no primário (nó 1) a partir do console SafeKit (ou da linha de comando com `safekit stop -m <module>`).
   → **Resultado esperado:** o nó 1 vai para STOP (NotReady) e o nó 2 vai para ALONE (Ready). No log do novo primário, aparece a mensagem `Virtual IP <VIP> set`.
2. Na nova interface primária, execute o `ipconfig` ou `ip addr show`.
   → **Resultado esperado:** o IP virtual (VIP) agora aparece como um alias neste nó e não mais no nó principal anterior.
3. A partir da estação de trabalho do cliente, repita os três comandos `ping` e execute o mosaico novamente no IP virtual (VIP).
   → **Resultado esperado:** tudo responde e todas as células do mosaico agora exibem o nome do **novo primário**, em uma única cor.
4. Reinicie o módulo no nó 1: ele resincroniza e vai para SECOND (Ready), enquanto o nó 2 vai para PRIM (Ready).

## 5. Teste 3 – Verificando o redirecionamento de MAC com `arp -a` {#5-test-3--checking-mac-rerouting-with-arp--a}

Você anota o endereço MAC associado ao IP Virtual (VIP) antes do failover e, em seguida, verifica se ele foi alterado.

Este teste só é possível se a estação de trabalho do cliente estiver na **mesma sub-rede IP** do cluster.

Se houver um roteador entre o cliente e o cluster, a tabela ARP do cliente não conterá o IP virtual (VIP), mas o endereço do gateway usado para acessar a rede do cluster. Nesse caso, verifique a tabela ARP do roteador ou gateway com a equipe de rede.

**Passos**

1. O módulo está PRIM (Ready) no nó 1 e SECOND (Ready) no nó 2.
2. Na estação de trabalho do cliente, `ping` nos dois endereços IP físicos e no IP virtual (VIP) e, em seguida, execute `arp -a`.
   → **Resultado esperado:** o IP virtual (VIP) está associado ao **mesmo endereço MAC que o endereço IP físico do primário**.
3. `stop` o módulo no primário (nó 1).
4. `ping` no IP virtual (VIP) novamente e, em seguida, execute `arp -a` novamente.
   → **Resultado esperado:** o IP virtual (VIP) agora está associado ao **mesmo endereço MAC que o endereço IP físico do novo primário**.

> `ping` no IP virtual (VIP) novamente antes de ler a tabela ARP: a entrada pode estar marcada como obsoleta e só será atualizada após um `ping`.

Exemplo da tabela ARP esperada, antes e depois de o primário ser parado:

| Endereço | MAC antes da parada | MAC após a parada |
|---|---|---|
| IP físico do nó 1 | MAC do Nó 1 | MAC do Nó 1 |
| IP físico do nó 2 | MAC do Nó 2 | MAC do Nó 2 |
| IP Virtual (VIP) | **MAC do Nó 1** | **MAC do Nó 2** |

## 6. Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

Você pode seguir uma conexão TCP para o IP virtual (VIP) capturando pacotes no cliente e em ambos os nós: com o Wireshark em máquinas Windows e com o tcpdump em máquinas Linux.

Você deve observar os **cabeçalhos MAC (Ethernet) dos pacotes** : o endereço IP de destino permanece o IP virtual (VIP), e é o endereço MAC de destino que mostra qual nó recebe o tráfego.

**O que você deve observar:**

| Quando | Onde capturar pacotes | Endereços MAC observados |
|---|---|---|
| Antes da falha | cliente | MAC do cliente → MAC do **nó 1 (primário)** |
| Antes da falha | nó 1 | Os pacotes para o IP virtual (VIP) são recebidos; o nó 2 não recebe nada |
| Durante a falha | rede | MAC redirecionando mensagens enviadas pelo nó 2 para o IP virtual (VIP): mensagens enviadas pelo SO quando ele é definido como um alias e GARPs enviados pelo SafeKit (`arpreroute="on"`) |
| Após a falha | cliente | MAC do cliente → MAC do **nó 2 (novo primário)** |

> Se a estação de trabalho do cliente estiver em uma sub-rede diferente do cluster, o "MAC do cliente" visto nos nós é o endereço MAC do **gateway** (roteador) que conecta as duas sub-redes, e não o da estação de trabalho do cliente.

## 7. De quais estações de trabalho testar {#7-which-workstations-to-test-from}

O comportamento depende do caminho da rede entre o cliente e o cluster. Execute os testes 1 e 2 de cada tipo de cliente relevante para sua arquitetura:

| Localização do cliente | O que o teste verifica |
|---|---|
| O cliente está na **mesma sub-rede** do cluster | Atualização das tabelas ARP dos clientes (3 testes possíveis) |
| Cliente em uma **sub-rede diferente** (roteador, gateway, rede virtual do hipervisor) | Atualização das tabelas ARP dos clientes no roteador ou gateway |
| Máquina virtual cliente **em um hipervisor que também hospeda uma máquina virtual do cluster mirror** | Comportamento do switch virtual do hipervisor, que também lida com a comutação e o roteamento internos |

## 8. Resumo dos resultados esperados {#8-summary-of-expected-results}

| Teste | Ação | Resultado esperado |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` e mosaico | IP virtual (VIP) como um alias apenas no primário; os 3 comandos `ping` respondem (a menos que sejam filtrados por firewalls); o mosaico exibe apenas o primário |
| 2 | Parada do primário | IP virtual (VIP) como um alias no novo primário; mensagem `Virtual IP <VIP> set` ; o mosaico exibe apenas o novo primário |
| 3 | `arp -a` antes e depois de o primário ser parado | O IP virtual (VIP) é movido do endereço MAC do nó 1 para o do nó 2 |
| 4 | Captura do Wireshark ou tcpdump antes e depois do failover | O cliente envia para o endereço MAC do novo primário |

## 9. Resolução de problemas {#9-troubleshooting}

- **O IP virtual (VIP) não responde mais após o failover:** as mensagens de redirecionamento de MAC não são levadas em consideração por um dispositivo no caminho (roteador, gateway, switch virtual), que continua enviando tráfego para o endereço MAC do antigo primário. Verifique o tratamento das mensagens de redirecionamento de MAC com sua equipe de rede.
- **Envio de GARPs:** o atributo `arpreroute="on"` da seção `<vip>` (com `arpinterval` e `arpelapse`) envia GARPs regularmente no IP Virtual (VIP) após o failover. Consulte o Guia do Usuário, seção 13.6.4 " [Sintaxe `<vip>`](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico da resolução de IP virtual (VIP) ↔ MAC:** consulte o Guia do Usuário, seção 7.24 " [Solução de problemas de resolução de IP virtual (VIP) ↔ MAC](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_Issue_with_VIP) " e seção 7.16 " [Problema com o IP virtual após o failover](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Para mais informações:
- [Como funciona um endereço IP virtual em um cluster de alta disponibilidade?](/pt-br/best-practises/how-a-virtual-ip-address-works/)
- Para balanceamento de carga com um endereço IP virtual, consulte [Testando o endereço IP virtual de balanceamento de carga em um cluster farm SafeKit](/pt-br/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-pt-br  %}}
