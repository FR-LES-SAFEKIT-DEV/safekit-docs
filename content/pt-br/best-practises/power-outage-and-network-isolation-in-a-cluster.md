---
title: "Gerenciamento de quedas de energia e isolamento de rede em um cluster de alta disponibilidade"
canonical: "https://safekit.eviden.com/pt-br/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Aprenda como gerenciar o isolamento de rede e as interrupções de energia em um cluster de alta disponibilidade. SafeKit propõe uma arquitetura sem SAN com verificadores de split-brain integrados e ressincronização automática para garantir a integridade dos dados e disponibilidade 24 horas por dia, 7 dias por semana, sem a necessidade de um disco compartilhado."
category: "best-practises"
lang: "pt-br"
topics: "Quais são os diferentes cenários em caso de isolamento de rede em um cluster? Quais são os diferentes cenários em caso de queda de energia em um cluster? 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Gerenciamento de quedas de energia e isolamento de rede em um cluster HA {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-pt-br  %}}
 

## Quais são os diferentes cenários em caso de queda de energia em um cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

### Falha de energia no nó primário {#primary-node-power-outage}

Quando uma queda de energia interrompe apenas o funcionamento do nó primário:

  * Há um failover automático no nó secundário, que fica isolado e reinicia a aplicação.
  * Quando o nó 1 é reiniciado, ele se torna SEDOND após a ressincronização dos dados replicados.
  * Os papéis de primário e secundário podem ser trocados por um administrador, se necessário.


### Falha de energia do nó secundário {#secondary-node-power-outage}

Quando uma queda de energia interrompe apenas o nó secundário:

  * Não há failover, o nó primário fica isolado e a aplicação continua sua execução no nó 1.
  * Quando o nó 2 é reiniciado, ele se torna SEDOND após a ressincronização dos dados replicados.


### Queda geral de energia - caso 1 {#general-power-outage---case-1}

Quando uma queda de energia interrompe o funcionamento de ambos os nós, o comportamento padrão é:

  * ambos os nós entram em estado de PARADA,
  * Quando o nó 1 é reiniciado, ele não entra no estado ALONE e não reinicia o aplicativo porque não sabe se possui os dados atualizados. Portanto, ele entra no estado WAIT, aguardando a reinicialização do outro nó.
  * Quando o nó 2 é reiniciado, ambos os nós retornam aos seus estados PRIM/SECOND anteriores.


### Queda geral de energia - caso 2 {#general-power-outage---case-2}

Quando uma queda de energia interrompe ambos os nós, o comportamento com syncdelta é o seguinte:

  * O parâmetro syncdelta está configurado, por exemplo, para 10 minutos, o que significa que o início de um nó é aceito mesmo que seus dados estejam 10 minutos atrasados em relação à última sincronização.
  * Quando o nó 1 é reiniciado, ele entra no modo ALONE e reinicia o aplicativo, desde que a reinicialização seja feita em até 10 minutos após a falha de energia.
  * Quando o nó 2 é reiniciado, ele se torna o SEGUNDO após a ressincronização dos dados replicados.
  * Observação: se o nó 2 for reiniciado primeiro, ele se tornará o único nó em execução e o nó 1 se tornará o segundo nó em execução ao iniciar.



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}