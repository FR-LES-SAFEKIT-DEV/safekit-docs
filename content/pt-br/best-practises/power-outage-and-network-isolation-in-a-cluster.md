---
title: "Lidando com interrupções de energia e isolamento de rede em um cluster de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-br/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Aprenda a gerenciar o isolamento de rede e as interrupções de energia em um cluster de alta disponibilidade. SafeKit inclui verificadores de divisão de rede e ressincronização automática. Eles garantem a integridade dos dados e o tempo de atividade 24 horas por dia, 7 dias por semana, sem um disco compartilhado."
category: "best-practises"
lang: "pt-br"
topics: "Quais são os diferentes cenários em caso de isolamento de rede em um cluster?, Quais são os diferentes cenários em caso de falta de energia em um cluster?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
---

# Lidando com interrupções de energia e isolamento de rede em um cluster de alta disponibilidade {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-pt-br  %}}
 

## Quais são os diferentes cenários em caso de falta de energia em um cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

Nos cenários a seguir, o nó 1 é inicialmente o nó primário. O nó 2 é inicialmente o nó secundário.

### Falta de energia no nó principal {#primary-node-power-outage}

Quando uma queda de energia afeta apenas o nó principal:

  * SafeKit executa automaticamente o failover para o nó secundário. O nó 2 fica ALONE e reinicia a aplicação.
  * Quando o nó 1 reinicia, ele ressincroniza os dados replicados. Em seguida, ele se torna SECOND.
  * Se necessário, um administrador pode trocar as funções primária e secundária.


### Falta de energia no nó secundário {#secondary-node-power-outage}

Quando uma queda de energia afeta apenas o nó secundário:

  * Nenhum failover ocorre. O nó 1 fica ALONE. O aplicativo continua a ser executado no nó 1.
  * Quando o nó 2 reinicia, ele ressincroniza os dados replicados. Em seguida, ele se torna SECOND.


### Falta de energia em ambos os nós - caso 1 {#general-power-outage---case-1}

Quando uma queda de energia interrompe ambos os nós, o comportamento padrão é o seguinte:

  * Ambos os nós entram no estado STOP.
  * Quando o nó 1 reinicia, ele não vai para o estado ALONE. Ele não reinicia o aplicativo. Ele não pode saber se seus dados estão atualizados. Então ele vai para o estado WAIT e espera que o outro nó reinicie.
  * Quando o nó 2 reinicia, ambos os nós retornam aos seus estados anteriores: PRIM e SECOND.


### Falta de energia em ambos os nós - caso 2 {#general-power-outage---case-2}

Quando uma queda de energia interrompe ambos os nós, o comportamento com o parâmetro `syncdelta` é o seguinte:

  * Neste exemplo, `syncdelta` é definido como 10 minutos na configuração. Um nó pode ser iniciado mesmo que seus dados estejam até 10 minutos atrasados em relação à última sincronização.
  * Quando o nó 1 reinicia dentro de 10 minutos após a queda de energia, ele entra no estado ALONE. Ele reinicia o aplicativo.
  * Quando o nó 2 reinicia, ele ressincroniza os dados replicados. Em seguida, ele se torna SECOND.
  * Observação: se o nó 2 reiniciar primeiro, ele se torna ALONE. O nó 1 então se torna SECOND quando inicia.



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}