---
title: "Gestão de Interrupções de Energia e Isolamento de Rede num Cluster de Alta Disponibilidade"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Aprenda a gerir o isolamento de rede e as falhas de energia num cluster de alta disponibilidade. SafeKit inclui verificadores de “split-brain” e ressincronização automática. Estes garantem a integridade dos dados e o funcionamento 24 horas por dia, 7 dias por semana, sem um disco partilhado."
category: "best-practises"
lang: "pt-pt"
topics: "Quais são os diferentes cenários em caso de isolamento de rede num cluster?, Quais são os diferentes cenários em caso de falha de energia num cluster?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
---

# Gestão de Interrupções de Energia e Isolamento de Rede num Cluster de Alta Disponibilidade {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-pt-pt  %}}
 

## Quais são os diferentes cenários em caso de falha de energia num cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

Nos cenários seguintes, o nó 1 é inicialmente o nó primário. O nó 2 é inicialmente o nó secundário.

### Corte de energia no nó principal {#primary-node-power-outage}

Quando uma falha de energia afeta apenas o nó principal:

  * SafeKit transfere automaticamente o controlo para o nó secundário. O nó 2 fica ALONE e reinicia a aplicação.
  * Quando o nó 1 reinicia, ele ressincroniza os dados replicados. Em seguida, torna-se SECOND.
  * Se necessário, um administrador pode trocar as funções principal e secundária.


### Corte de energia no nó secundário {#secondary-node-power-outage}

Quando uma falha de energia afeta apenas o nó secundário:

  * Não ocorre failover. O nó 1 fica ALONE. A aplicação continua a ser executada no nó 1.
  * Quando o nó 2 reinicia, ele ressincroniza os dados replicados. Em seguida, torna-se SECOND.


### Falta de energia em ambos os nós - caso 1 {#general-power-outage---case-1}

Quando uma falha de energia interrompe ambos os nós, o comportamento predefinido é o seguinte:

  * Ambos os nós entram no estado STOP.
  * Quando o nó 1 reinicia, não entra no estado ALONE. Não reinicia a aplicação. Não consegue saber se os seus dados estão atualizados. Por isso, entra no estado WAIT e aguarda que o outro nó reinicie.
  * Quando o nó 2 reinicia, ambos os nós retornam aos seus estados anteriores: PRIM e SECOND.


### Falta de energia em ambos os nós - caso 2 {#general-power-outage---case-2}

Quando uma falha de energia interrompe ambos os nós, o comportamento com o parâmetro `syncdelta` é o seguinte:

  * Neste exemplo, `syncdelta` está definido para 10 minutos na configuração. Um nó pode então iniciar mesmo que os seus dados estejam até 10 minutos atrasados em relação à última sincronização.
  * Quando o nó 1 reinicia dentro de 10 minutos após a falha de energia, ele entra no estado ALONE. Ele reinicia a aplicação.
  * Quando o nó 2 reinicia, ele ressincroniza os dados replicados. Em seguida, torna-se SECOND.
  * Nota: se o nó 2 reiniciar primeiro, ele fica ALONE. O nó 1 torna-se então SECOND quando inicia.



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}