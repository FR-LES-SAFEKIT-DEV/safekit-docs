---
title: "Testar o endereço IP virtual de um cluster mirror SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/test-primary-backup-vip-mirror/"
description: "Teste a disponibilidade e o failover de IP virtual num cluster mirror do SafeKit, incluindo o redirecionamento GARP, verificações ARP e capturas de pacotes."
category: "best-practises"
lang: "pt-pt"
topics: "Princípios-chave, Pré-requisito: configuração de IP virtual (VIP), Teste 1 – IP virtual (VIP) detido pelo servidor principal, Teste 2 – Failover manual (paragem do principal), Teste 3 – Verificação do redirecionamento GARP com arp -a, Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux), Quais estações de trabalho testar, Resumo dos resultados esperados, Resolução de problemas"
translation: "translate_md 2026-11-05.10 | glossaire 2026-11-05.14 | Translation LLM | 12 expressions"
---

# Testar o endereço IP virtual de um cluster mirror SafeKit na sua rede {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

Este guia descreve como verificar se o endereço IP virtual (VIP) de um cluster mirror SafeKit (módulo mirror) funciona corretamente na sua rede: o IP virtual (VIP) é detido pelo servidor primário e é redirecionado para o novo servidor primário após uma falha.

## 1. Princípios-chave {#1-key-principles}

**Pré-requisito:** ambos os nós do cluster mirror devem estar na mesma sub-rede IP de camada 2: uma LAN ou uma VLAN estendida entre locais remotos.

- O IP Virtual (VIP) está ativo apenas no **servidor principal** (estados PRIM ou ALONE): é definido como um alias do endereço IP físico, na placa de rede desse endereço, quando o módulo é iniciado como principal no nó (configuração `where="one_side_alias"`).
- O endereço MAC do servidor principal é, portanto, o associado ao IP Virtual (VIP) nas tabelas ARP (router, gateway, clientes na mesma sub-rede). Todo o tráfego para o IP Virtual (VIP) é enviado para o servidor principal.
- Durante uma mudança de servidor (paragem ou falha do servidor principal), o IP Virtual (VIP) é removido do antigo servidor principal e definido como um alias no novo servidor principal. Dois mecanismos permitem então que a rede associe o IP Virtual (VIP) ao endereço MAC do novo servidor principal:
  - as mensagens de rede enviadas pelo sistema operativo quando o IP Virtual (VIP) é adicionado como um alias na placa de rede;
  - os **GARPs** (gratuitous ARP) enviados pelo SafeKit, quando o atributo `arpreroute="on"` está configurado na secção `<vip>`.

O que precisa, portanto, de testar:

1. o IP virtual (VIP) é detido pelo servidor principal e é acessível a partir dos clientes;
2. o endereço MAC associado ao IP Virtual (VIP) é redirecionado para o novo servidor principal na rede (router, gateway, virtualização) quando o servidor principal muda.

## 2. Pré-requisito: Configuração de IP virtual (VIP) {#2-prerequisite-virtual-ip-vip-configuration}

1. No `userconfig.xml` do módulo mirror, configure o IP Virtual (VIP) na secção `<vip>`. O atributo `arpreroute="on"` faz com que o novo primário envie GARPs após uma falha:

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
3. Inicie o módulo: um nó deve estar em **PRIM (Ready)** e o outro **SECOND (Ready)**.

## 3. Teste 1 – Endereço IP virtual (VIP) detido pelo servidor principal {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**Passos**

1. No servidor principal, execute o `ipconfig` (Windows) ou `ip addr show` (Linux).
   → **Resultado esperado:** o IP Virtual (VIP) aparece como um alias na placa de rede do endereço IP físico.
2. No servidor secundário, execute o mesmo comando.
   → **Resultado esperado:** o IP virtual (VIP) não aparece.
3. A partir de uma estação de trabalho cliente **fora do cluster**, `ping` ambos os endereços IP físicos e para o IP Virtual (VIP).
   → **Resultado esperado:** todos os três comandos `ping` respondem (a menos que sejam filtrados por firewalls).
4. Verifique o acesso através do IP Virtual (VIP) com o mosaico do SafeKit: a partir de um navegador no cliente **externo**, ligue-se a `http://<VIP>:9010/safekit/mosaic.html` (ou use a porta 9453 se o servidor web e a consola do SafeKit tiverem sido configurados para HTTPS), depois introduza o **nome do módulo** mirror e execute o teste.
   → **Resultado esperado:** todas as células do mosaico exibem o nome do **servidor principal**, numa única cor: todas as ligações TCP ao IP Virtual (VIP) são servidas pelo servidor principal.

![Teste o endereço IP virtual de um mirror SafeKit com o mosaico](/wp-content/uploads/2024/03/appli-20.png)

## 4. Teste 2 – Comutação manual de contingência (paragem do primário) {#4-test-2--manual-failover-stop-of-the-primary}

Este teste verifica se o IP Virtual (VIP) segue o servidor principal durante uma falha, acionada pela paragem do módulo no servidor principal.

**Passos**

1. Pare o módulo no primário (nó 1) a partir da consola SafeKit (ou a partir da linha de comandos com `safekit stop -m <module>`).
   → **Resultado esperado:** o nó 1 passa para STOP (NotReady) e o nó 2 passa para ALONE (Ready). No registo do novo primário, aparece a mensagem "Endereço `Virtual IP <VIP> set`.
2. Na nova interface principal, execute o `ipconfig` ou `ip addr show`.
   → **Resultado esperado:** o IP Virtual (VIP) aparece agora como um alias neste nó, e não mais no anterior primário.
3. A partir da estação de trabalho do cliente, repita os três comandos `ping` e execute o mosaico novamente no IP Virtual (VIP).
   → **Resultado esperado:** tudo responde e todas as células do mosaico exibem agora o nome do **novo primário**, numa única cor.
4. Reinicie o módulo no nó 1: ele resincroniza e vai para SECOND (Ready), enquanto o nó 2 vai para PRIM (Ready).

## 5. Teste 3 – Verificação do redirecionamento MAC com `arp -a` {#5-test-3--checking-mac-rerouting-with-arp--a}

Anote o endereço MAC associado ao IP Virtual (VIP) antes da comutação por falha e, em seguida, verifique se este foi alterado.

Este teste só é possível se a estação de trabalho do cliente estiver na **mesma sub-rede IP** que o cluster.

Se houver um router entre o cliente e o cluster, a tabela ARP do cliente não contém o IP Virtual (VIP), mas sim o endereço do gateway utilizado para aceder à rede do cluster. Nesse caso, verifique a tabela ARP do router ou gateway com a equipa de rede.

**Passos**

1. O módulo está PRIM (Ready) no nó 1 e SECOND (Ready) no nó 2.
2. Na estação de trabalho do cliente, `ping` para os dois endereços IP físicos e para o IP Virtual (VIP), e depois execute `arp -a`.
   → **Resultado esperado:** o IP virtual (VIP) está associado ao **mesmo endereço MAC que o endereço IP físico do primário**.
3. `stop` o módulo no primário (nó 1).
4. `ping` ao IP Virtual (VIP) novamente e, em seguida, execute `arp -a` novamente.
   → **Resultado esperado:** o IP virtual (VIP) está agora associado ao **mesmo endereço MAC que o endereço IP físico do novo servidor principal**.

> `ping` ao IP Virtual (VIP) novamente antes de ler a tabela ARP: a entrada pode estar marcada como desatualizada e só é atualizada após um `ping`.

Exemplo da tabela ARP esperada, antes e depois de o servidor principal ser parado:

| Morada | MAC antes da paragem | MAC após a paragem |
|---|---|---|
| IP físico do nó 1 | MAC do Nó 1 | MAC do Nó 1 |
| IP físico do nó 2 | MAC do Nó 2 | MAC do Nó 2 |
| Endereço IP virtual (VIP) | **MAC do Nó 1** | **MAC do Nó 2** |

## 6. Teste 4 – Verificação completa com Wireshark (Windows) ou tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

É possível seguir uma ligação TCP para o IP Virtual (VIP) capturando pacotes no cliente e em ambos os nós: com o Wireshark em máquinas Windows e com o tcpdump em máquinas Linux.

É preciso analisar os **cabeçalhos MAC (Ethernet) dos pacotes** : o endereço IP de destino permanece o IP Virtual (VIP), e é o endereço MAC de destino que indica qual nó recebe o tráfego.

**O que deve observar:**

| Quando | Onde capturar pacotes | Endereços MAC observados |
|---|---|---|
| Antes da mudança de servidor | cliente | MAC do cliente → MAC do **nó 1 (primário)** |
| Antes da mudança de servidor | nó 1 | Os pacotes para o IP Virtual (VIP) são recebidos; o nó 2 não recebe nada |
| Durante a mudança de servidor | rede | O MAC redireciona as mensagens enviadas pelo nó 2 para o IP Virtual (VIP): mensagens enviadas pelo SO quando este é configurado como um alias, e GARPs enviados pelo SafeKit (`arpreroute="on"`) |
| Após a mudança de servidor | cliente | MAC do cliente → MAC do **nó 2 (novo primário)** |

> Se a estação de trabalho do cliente estiver numa sub-rede diferente da do cluster, o "MAC do cliente" visível nos nós é o endereço MAC do **gateway** (router) que liga as duas sub-redes, e não o da estação de trabalho do cliente.

## 7. De quais estações de trabalho testar {#7-which-workstations-to-test-from}

O comportamento depende do caminho da rede entre o cliente e o cluster. Execute os testes 1 e 2 de cada tipo de cliente relevante para a sua arquitetura:

| Localização do cliente | O que o teste verifica |
|---|---|
| O cliente está na **mesma sub-rede** que o cluster. | Atualização das tabelas ARP dos clientes (3 testes possíveis) |
| Cliente numa **sub-rede diferente** (router, gateway, rede virtual do hipervisor) | Atualização das tabelas ARP dos clientes no router ou gateway |
| Máquina virtual do cliente **num hipervisor que também aloja uma máquina virtual do cluster mirror** | Comportamento do comutador virtual do hipervisor, que também lida com a comutação e o encaminhamento internos |

## 8. Resumo dos resultados esperados {#8-summary-of-expected-results}

| Teste | Ação | Resultado esperado |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` e mosaico | O IP virtual (VIP) como um alias apenas no primário; os 3 comandos `ping` respondem (a menos que sejam filtrados por firewalls); o mosaico exibe apenas o primário |
| 2 | Paragem do primário | IP virtual (VIP) como um alias no novo primário; mensagem `Virtual IP <VIP> set` ; o mosaico exibe apenas o novo primário |
| 3 | `arp -a` antes e depois de o servidor primário ser parado | O IP virtual (VIP) é transferido do endereço MAC do nó 1 para o do nó 2 |
| 4 | Captura de dados com o Wireshark ou o tcpdump antes e depois da falha. | O cliente envia para o endereço MAC do novo primário |

## 9. Resolução de problemas {#9-troubleshooting}

- **O IP Virtual (VIP) deixa de responder após a comutação por falha:** as mensagens de redirecionamento MAC não são tidas em conta por um dispositivo no caminho (router, gateway, switch virtual), que continua a enviar tráfego para o endereço MAC do antigo primário. Verifique o tratamento das mensagens de redirecionamento MAC com a sua equipa de rede.
- **Envio de GARPs:** o atributo `arpreroute="on"` da secção `<vip>` (com `arpinterval` e `arpelapse`) envia GARPs regularmente no IP Virtual (VIP) após a falha. Consulte o Guia do Utilizador, secção 13.6.4 " [Sintaxe `<vip>`](https://safekit.eviden.com/pt-pt/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico da resolução de IP virtual (VIP) ↔ MAC:** consulte o Guia do Utilizador, secção 7.24 " [Resolução de problemas de IP virtual (VIP) ↔ MAC](https://safekit.eviden.com/pt-pt/resources/safekit-user-guide-82/#_Issue_with_VIP) " e secção 7.16 " [Problema com o IP virtual após a mudança de servidor](https://safekit.eviden.com/pt-pt/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Para mais informações:
- [Como funciona um endereço IP virtual em clusters de alta disponibilidade?](/pt-pt/best-practises/how-a-virtual-ip-address-works/)
- Para balanceamento de carga com um endereço IP virtual, consulte [Testar o endereço IP virtual de balanceamento de carga numa cluster farm SafeKit](/pt-pt/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-pt-pt  %}}
