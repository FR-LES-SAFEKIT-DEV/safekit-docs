---
title: "SafeKit: Software de Alta Disponibilidade para Windows e Linux, sem SAN"
canonical: "https://safekit.eviden.com/pt-pt/"
description: "O SafeKit é o software de alta disponibilidade (HA) tudo-em-um sem SAN para Windows e Linux. Obtenha replicação síncrona em tempo real, failover automático e balanceamento de carga num pacote simples e económico. Inicie o seu teste gratuito de 30 dias."
category: "home"
lang: "pt-pt"
topics: "O que o SafeKit faz, Escolha o seu nível de proteção, Módulos pré-fabricados para as suas aplicações, Casos de uso de clientes, Preços simples e previsíveis, Conheça os limites antes de começar, Biblioteca de vídeos do SafeKit, 🔍 Centro de navegação de alta disponibilidade do SafeKit"
translation: "translate_md 2026-11-05.8 | glossaire 2026-11-05.12 | Translation LLM | 10 expressions"
---

# SafeKit: Software de Alta Disponibilidade para Windows e Linux, sem SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

O SafeKit transforma dois servidores padrão num cluster de alta disponibilidade sem SAN, que mantém as suas aplicações a funcionar. Replica os seus dados em tempo real, reinicia a sua aplicação no segundo servidor se o primeiro falhar e reintegra o servidor com falha automaticamente assim que este for reparado. Pode instalá-lo nos servidores que já possui, sem necessidade de armazenamento partilhado ou conhecimentos de cluster.

A replicação é síncrona, por isso não se perdem dados quando um servidor falha, e a sua aplicação volta a funcionar em cerca de um minuto ou menos. As licenças são perpétuas e o preço é por servidor.

<a class="btn-download" href="/pt-pt/resources/safekit-free-trial/">Inicie o seu período de teste gratuito de 30 dias ›</a>


## O que o SafeKit faz {#features}

O SafeKit combina quatro funções num único produto, gerido a partir de uma consola web ou de uma linha de comandos, em Windows e Linux.

| Função | Como funciona |
|---|---|
| **Replicação em tempo real** | Todas as alterações feitas nos seus ficheiros são copiadas para o segundo servidor à medida que ocorrem, para que uma falha não resulte em perda de dados. |
| **Comutação automática de emergência** | O SafeKit deteta a falha, move o endereço IP virtual e reinicia a aplicação no outro servidor. |
| **Failback automático** | O servidor reparado resincroniza-se em segundo plano enquanto a aplicação continua a funcionar. |
| **Equilíbrio de carga** | O balanceamento de carga da rede é executado dentro dos servidores, sem balanceador de carga ou proxy externo. |

![A consola web do SafeKit monitoriza um cluster mirror de 2 nós para Windows e Linux, com os servidores PRIM e SECOND e replicação de dados ativa.](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Não precisa de uma SAN, de um disco de quórum, do Active Directory, nem de edições empresariais do seu sistema operativo ou base de dados.

<a class="btn-download" href="/pt-pt/architectures/">Explore as arquiteturas de cluster ›</a>


## Escolha o seu nível de proteção {#protection-levels}

**HA de aplicação** (`mirror.safe`, `farm.safe` e os módulos de aplicação) replica apenas os dados da sua aplicação e reinicia a aplicação no segundo servidor. Requer que saiba quais os serviços a reiniciar, quais as pastas a replicar em tempo real e qual o endereço IP virtual a usar em caso de falha. Funciona em servidores físicos, em máquinas virtuais em todos os hipervisores, incluindo VMware, Hyper-V e KVM, e na nuvem, e oferece a recuperação mais rápida.

**HA de VM** (`hyperv.safe`, `kvm.safe`) replica e executa o failover de toda a máquina virtual, pelo que não é necessário saber como a aplicação funciona. É adequado para ambientes com várias aplicações distribuídas por várias VMs.

<a class="btn-download" href="/pt-pt/best-practises/vm-ha-vs-application-ha/">Compare HA de aplicação e HA de VM ›</a>


## Módulos Pré-Fabricados Para As Suas Aplicações {#modules}

Os módulos pré-configurados são gratuitos e incluídos no produto. Cada um define quais os serviços a reiniciar e quais as pastas a replicar para uma determinada aplicação.

- **Bases de dados:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **Máquinas virtuais e contentores:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Nuvem:** AWS, Azure, GCP e outras nuvens
- **Segurança física e indústria:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/pt-pt/solutions/">Consultar todas as soluções e módulos ›</a>


## Casos de Uso do Cliente {#use-cases}

- **Gestão de vídeo (VMS):** mantém o vídeo em direto e gravado disponível durante uma falha do servidor. Utilizado com Milestone, Genetec e Hanwha.
- **Controlo de acesso (EACS):** mantém as credenciais e os alarmes sempre disponíveis. Utilizado com Hirsch Microsesame, Nedap AEOS e Siemens SiPass.
- **SCADA e indústria:** mantém os operadores no controlo das linhas de produção, por exemplo, as máquinas de torrefação de café Probat e as máquinas de triagem de bagagem ALSTEF.
- **Gestão de edifícios (BMS):** mantém os sistemas de AVAC, segurança e energia a funcionar. Utilizado com Siemens Desigo CC e Bosch BIS.
- **Controlo de tráfego aéreo (ATC):** mantém os controladores ligados a aplicações críticas do lado ar, por exemplo, com o ADB SafeGate.
- **Controlo de operações do metro (OCC):** mantém a supervisão disponível para as linhas de metro de Paris automatizadas e sem condutor.
- **Sites de borda:** transforma dois servidores padrão num cluster de alta disponibilidade onde não existe um centro de dados.
- **Editores de software (OEM):** adiciona alta disponibilidade ao seu catálogo como uma opção apenas de software.

<a class="btn-download" href="/pt-pt/use-cases/">Explorar todos os casos de uso ›</a>


## Preços Simples e Previsíveis {#pricing}

O SafeKit é vendido com uma licença perpétua, por isso não há subscrição obrigatória. O preço depende apenas do número de servidores, não dos núcleos ou sockets da CPU, e todos os módulos da aplicação são gratuitos. Também funciona com edições padrão do Windows, Linux e das suas bases de dados, por isso não paga por edições Enterprise.

<a class="btn-download" href="/pt-pt/safekit-pricing/">Solicitar um orçamento ›</a>


## Conheça os limites antes de começar {#limits}

O SafeKit foi concebido para ser simples, não para todos os casos. É uma boa opção para até alguns terabytes de dados replicados, menos de 1.000.000 de ficheiros, até 32 máquinas virtuais ao usar HA de VM, e dois nós na mesma LAN ou VLAN com baixa latência (normalmente inferior a 5 ms de ida e volta).

Para volumes maiores, o armazenamento partilhado ou outra abordagem é uma escolha melhor.

<a class="btn-download" href="/pt-pt/product/#safekit-ha-limitations">Consulte a lista completa de limitações ›</a>


{{%  insert-safekit-videos-table-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
