---
title: "Testando o endereço IP virtual primário/de backup em um cluster espelhado do SafeKit"
canonical: "https://safekit.eviden.com/pt-br/best-practises/test-primary-backup-vip-mirror/"
description: "Teste a disponibilidade e o failover de VIPs em um cluster espelhado do SafeKit, incluindo redirecionamento GARP, verificações ARP e captura de pacotes."
category: "best-practises"
lang: "pt-br"
topics: "Princípios-chave, Pré-requisito: Configuração de VIP, Teste 1 – VIP mantido pelo servidor primário, Teste 2 – Failover manual (parada do primário), Teste 3 – Verificação do roteamento GARP com arp -a, Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux), Quais estações de trabalho usar para os testes, Resumo dos resultados esperados, Solução de problemas"
---

# Testando o endereço IP virtual primário/de backup em um cluster espelhado do SafeKit

Este guia descreve como verificar se o endereço IP virtual (VIP) de um cluster espelhado SafeKit (módulo espelhado) está funcionando corretamente em sua rede: o VIP é mantido pelo servidor primário e é redirecionado para o novo servidor primário após uma falha.

## 1. Princípios fundamentais

**Pré-requisito:** ambos os nós do cluster espelho devem estar na mesma sub-rede IP de camada 2: uma LAN ou uma VLAN estendida entre sites remotos.

- O VIP fica ativo apenas no **servidor primário** (estados PRIM ou ALONE): ele é definido como um alias do endereço IP físico, na placa de rede desse endereço, quando o módulo é iniciado como primário no nó (configuração " `where="one_side_alias"` ).
- O endereço MAC do servidor primário é, portanto, aquele associado ao VIP nas tabelas ARP (roteador, gateway, clientes na mesma sub-rede). Todo o tráfego destinado ao VIP é enviado para o servidor primário.
- Durante uma falha (parada ou interrupção do servidor primário), o VIP é removido do servidor primário anterior e configurado como um alias no novo servidor primário. Dois mecanismos permitem então que a rede associe o VIP ao endereço MAC do novo servidor primário:
  - As mensagens de rede enviadas pelo sistema operacional quando o VIP é adicionado como um alias na placa de rede;
  - os **GARPs** (ARP gratuito) enviados pelo SafeKit, quando o atributo `arpreroute="on"` está configurado na seção `<vip>` .

Portanto, você precisa testar o seguinte:

1. que o VIP é mantido pelo servidor principal e acessível aos clientes;
2. que a rede (roteador, gateway, virtualização) leve em consideração o GARP quando o servidor primário for alterado.

## 2. Pré-requisito: Configuração VIP

1. No arquivo `userconfig.xml` do módulo mirror, configure o VIP na seção `<vip>` . O atributo `arpreroute="on"` faz com que o novo primário envie GARPs após uma falha.

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
3. Inicie o módulo: um nó deve ser **PRIM (Pronto)** e o outro **SECOND (Pronto)** .

## 3. Teste 1 – VIP mantido pelo servidor primário

**Passos**

1. No servidor principal, execute `ipconfig` (Windows) ou `ip addr show` (Linux).
   → **Resultado esperado:** o VIP aparece como um alias na placa de rede do endereço IP físico.
2. No servidor secundário, execute o mesmo comando.
   → **Resultado esperado:** o VIP não aparece.
3. A partir de uma estação de trabalho cliente **fora do cluster** , `ping` ambos os endereços IP físicos e para o VIP.
   → **Resultado esperado:** todos os três comandos `ping` respondem (a menos que sejam filtrados por firewalls).
4. Verifique o acesso através do VIP com o mosaico SafeKit: a partir de um navegador na estação de trabalho do cliente, conecte-se a `http://<VIP>:9010/safekit/mosaic.html` , insira o **nome do módulo** espelho e execute o teste.
   → **Resultado esperado:** todas as células do mosaico exibem o nome do **servidor primário** , em uma única cor: todas as conexões TCP com o VIP são atendidas pelo servidor primário.

## 4. Teste 2 – Failover manual (parada do primário)

Este teste verifica se o VIP acompanha o servidor primário durante uma falha de segurança, acionada pela interrupção do módulo no servidor primário.

**Passos**

1. Pare o módulo no nó primário (nó 1) a partir do console do SafeKit (ou a partir da linha de comando com `safekit stop -m <module>` ).
   → **Resultado esperado:** o nó 1 entra em estado STOP (Não Pronto) e o nó 2 entra em estado ALONE (Pronto). No log do novo primário, aparece a mensagem " `Virtual IP <VIP> set` .
2. No novo servidor primário, execute `ipconfig` ou `ip addr show` .
   → **Resultado esperado:** o VIP agora aparece como um alias neste nó, e não mais no nó primário anterior.
3. A partir da estação de trabalho do cliente, repita os três comandos `ping` e execute o mosaico novamente no VIP.
   → **Resultado esperado:** tudo responde e todas as células do mosaico agora exibem o nome da **nova cor primária** , em uma única cor.
4. Reinicie o módulo no nó 1: ele ressincroniza e passa para SECOND (Pronto), enquanto o nó 2 passa para PRIM (Pronto).

**Limitação deste teste:** um resultado correto na etapa 3 não comprova que os GARPs enviados pelo SafeKit funcionam. Quando o VIP é definido como um alias no novo servidor primário, o próprio sistema operacional envia mensagens na rede que podem redirecionar a associação entre o endereço IP virtual e o endereço MAC. Somente os testes 3 e 4 verificam de fato o redirecionamento dessa associação.

## 5. Teste 3 – Verificando o redirecionamento GARP com `arp -a`

Você anota o endereço MAC associado ao VIP antes do failover e, em seguida, verifica se ele mudou depois.

Este teste só é possível se a estação de trabalho do cliente estiver na **mesma sub-rede IP** que o cluster.

Se houver um roteador entre o cliente e o cluster, a tabela ARP do cliente não conterá o VIP, mas sim o endereço do gateway usado para acessar a rede do cluster. Nesse caso, o GARP deve ser verificado na tabela ARP do roteador ou gateway, com a equipe de rede.

**Passos**

1. O módulo está em estado PRIM (Pronto) no nó 1 e em estado SECOND (Pronto) no nó 2.
2. Na estação de trabalho do cliente, `ping` nos dois endereços IP físicos e no VIP e, em seguida, execute `arp -a` .
   → **Resultado esperado:** o VIP está associado ao **mesmo endereço MAC que o endereço IP físico do servidor primário** .
3. `stop` o módulo no nó primário (nó 1).
4. `ping` no VIP novamente e, em seguida, execute `arp -a` novamente.
   → **Resultado esperado:** o VIP agora está associado ao **mesmo endereço MAC que o endereço IP físico do novo servidor primário** .

> `ping` no VIP novamente antes de ler a tabela ARP: a entrada pode estar marcada como obsoleta e só será atualizada após um `ping` .

Exemplo da tabela ARP esperada, antes e depois da parada do servidor primário:

| Endereço | MAC antes da parada | MAC depois da parada |
|---|---|---|
| Endereço IP físico do nó 1 | Endereço MAC do nó 1 | Endereço MAC do nó 1 |
| Endereço IP físico do nó 2 | Endereço MAC do nó 2 | Endereço MAC do nó 2 |
| VIP | **Nó 1 MAC** | **Nó 2 MAC** |

## 6. Teste 4 – Verificação de ponta a ponta com Wireshark (Windows) ou tcpdump (Linux)

É possível acompanhar uma conexão TCP com o VIP capturando pacotes no cliente e em ambos os nós: com o Wireshark em máquinas Windows e com o tcpdump em máquinas Linux.

Você deve analisar os **cabeçalhos MAC (Ethernet) dos pacotes** : o endereço IP de destino permanece o VIP, e é o endereço MAC de destino que indica qual nó recebe o tráfego.

**O que você deve observar:**

| Quando | Onde capturar | Endereços MAC observados |
|---|---|---|
| Antes da falha | cliente | MAC do cliente → MAC do **nó 1 (primário)** |
| Antes da falha | nó 1 | Pacotes para o VIP são recebidos; nó 2 não recebe nada |
| Durante a falha | rede | GARP enviado pelo nó 2 para o VIP |
| Após o failover | cliente | MAC do cliente → MAC do **nó 2 (novo primário)** |

Se a estação de trabalho do cliente estiver em uma sub-rede diferente da do cluster, o "MAC do cliente" visto nos nós será o endereço MAC do **gateway** (roteador) que conecta as duas sub-redes, e não o da estação de trabalho do cliente. Da mesma forma, na estação de trabalho do cliente, os pacotes destinados ao VIP são enviados para o endereço MAC do seu próprio gateway.

## 7. Em quais estações de trabalho realizar os testes?

O comportamento depende do caminho de rede entre o cliente e o cluster. Execute os testes 1 e 2 a partir de cada tipo de cliente relevante para sua arquitetura:

Localização do cliente | | que o teste verifica |
|---|---|
| Cliente na **mesma sub-rede** que o cluster | Atualização das tabelas ARP dos clientes pelo GARP (teste 3 possível) |
| Cliente em uma **sub-rede diferente** (roteador, gateway, rede virtual do hipervisor) | Tratamento de GARP pelo roteador ou gateway |
| Máquina virtual cliente **em um hipervisor que também hospeda uma máquina virtual de cluster** | Comportamento do switch virtual do hipervisor, que também lida com comutação e roteamento internos |

## 8. Resumo dos resultados esperados

| Teste | Ação | Resultado esperado |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig` , `ping` e mosaic | VIP como alias apenas no primário; os 3 comandos `ping` respondem (a menos que sejam filtrados por firewalls); o mosaic exibe apenas o primário |
| 2 | Parar o primário | VIP como um alias no novo primário; `Virtual IP <VIP> set` mensagem; o mosaico exibe apenas o novo primário |
| 3 | `arp -a` antes e depois da parada do primário | O VIP se move do endereço MAC do nó 1 para o do nó 2 |
| 4 | Captura com Wireshark ou tcpdump antes e depois do failover | O cliente envia para o endereço MAC do novo primário |

## 9. Resolução de problemas

- **O VIP deixa de responder após o failover:** o GARP não está sendo considerado por um dispositivo no caminho (roteador, gateway, switch virtual), que continua enviando tráfego para o endereço MAC do antigo servidor primário. Verifique o tratamento do GARP com sua equipe de rede.
- **Envio de GARPs:** o atributo `arpreroute="on"` da seção `<vip>` (com `arpinterval` e `arpelapse` ) envia GARPs regularmente no VIP após o failover. Consulte o Guia do Usuário, seção 13.6.4 " [Sintaxe `<vip>`](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnóstico de resolução de VIP ↔ MAC:** consulte o Guia do Usuário, seção 7.24 " [Solução de problemas de resolução de VIP ↔ MAC](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_Issue_with_VIP) " e seção 7.16 " [Problema com o IP virtual após o failover](https://safekit.eviden.com/pt-br/resources/safekit-user-guide-82/#_Problem_with_the_1) ".
