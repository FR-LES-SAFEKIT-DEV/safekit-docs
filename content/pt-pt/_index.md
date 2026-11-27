---
title: "SafeKit: software de alta disponibilidade para Windows e Linux, sem necessidade de SAN"
canonical: "https://safekit.eviden.com/pt-pt/"
description: "Software de alta disponibilidade SafeKit para Windows e Linux: replicação síncrona, failover automático e balanceamento de carga em dois servidores padrão, sem SAN."
category: "home"
lang: "pt-pt"
topics: "O que o SafeKit faz, Escolha o seu nível de proteção, Módulos prontos a usar para as suas aplicações, Casos de uso de clientes, Preços simples e previsíveis, Limitações a considerar"
translation: "translate_md 2026-11-25.1 | glossary 2026-11-25.2 | Translation LLM | 53 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
---

# SafeKit: software de alta disponibilidade para Windows e Linux, sem necessidade de SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit transforma dois servidores padrão num cluster de alta disponibilidade sem SAN, que mantém as suas aplicações a funcionar. Replica os seus dados em tempo real, reinicia a sua aplicação no segundo servidor se o primeiro falhar e reintegra o servidor com falha automaticamente assim que este for reparado. Pode instalá-lo nos servidores que já possui, sem necessidade de armazenamento partilhado ou conhecimentos de cluster.

A replicação é síncrona, por isso não se perdem dados quando um servidor falha, e a sua aplicação volta a funcionar em cerca de um minuto ou menos. As licenças são perpétuas e o preço é por servidor.

<a class="btn-download" href="/pt-pt/resources/safekit-free-trial/">Inicie o seu período de teste gratuito de 30 dias ›</a>


## O que o SafeKit faz {#features}

SafeKit combina quatro funções num único produto, gerido a partir de uma consola web ou de uma linha de comandos, em Windows e Linux.

| Função | Como funciona |
|---|---|
| **Replicação em tempo real** | Todas as alterações feitas nos seus ficheiros são copiadas para o segundo servidor à medida que ocorrem, para que uma falha não resulte em perda de dados. |
| **Failover automático** | SafeKit deteta a falha, move o endereço IP virtual e reinicia a aplicação no outro servidor. |
| **Failback automático** | O servidor reparado ressincroniza-se em segundo plano enquanto a aplicação continua a funcionar. |
| **Equilíbrio de carga** | O balanceamento de carga da rede é executado dentro dos servidores, sem balanceador de carga ou proxy externo. |

![Consola web SafeKit para monitorização de um cluster mirror de 2 nós para Windows e Linux, com os servidores PRIM e SECOND e replicação de dados ativa](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Não precisa de uma SAN, de um disco de quórum, Active Directory, nem de edições empresariais do seu sistema operativo ou base de dados.

<a class="btn-download" href="/pt-pt/architectures/">Explore as arquiteturas de cluster ›</a>


## Escolha o seu nível de proteção {#protection-levels}

**HA de aplicação** (`mirror.safe`, `farm.safe` e os módulos da aplicação) replica apenas os dados da sua aplicação e reinicia a aplicação no segundo servidor. Requer que saiba quais os serviços a reiniciar, quais as pastas a replicar em tempo real e qual o endereço IP virtual a usar em caso de falha. Funciona em servidores físicos, em máquinas virtuais em todos os hipervisores, incluindo VMware, Hyper-V e KVM, e na nuvem, e oferece a recuperação mais rápida.

**HA de VM** (`hyperv.safe`, `kvm.safe`) replica e executa o failover de toda a máquina virtual, pelo que não é necessário saber como a aplicação funciona. Esta abordagem é adequada para ambientes com várias aplicações distribuídas por várias VMs.

<a class="btn-download" href="/pt-pt/best-practises/vm-ha-vs-application-ha/">Comparar HA de aplicação e HA de VM ›</a>


## Módulos prontos a usar para as suas aplicações {#modules}

Os módulos pré-configurados são gratuitos e incluídos no produto. Cada um define quais os serviços a reiniciar e quais as pastas a replicar para uma determinada aplicação.

- **Bases de dados:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **Máquinas virtuais e contentores:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Nuvem:** AWS, Azure, GCP e outras nuvens
- **Segurança física e indústria:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/pt-pt/solutions/">Ver todas as soluções e módulos ›</a>


## Casos de uso de clientes {#use-cases}

- **Gestão de vídeo (VMS):** mantém o vídeo em direto e gravado disponível durante uma falha do servidor. Utilizado com Milestone, Genetec e Hanwha.
- **Controlo de acesso (EACS):** mantém as credenciais e os alarmes disponíveis em todos os momentos. Utilizado com Hirsch Microsesame, Nedap AEOS e Siemens SiPass.
- **SCADA e indústria:** permite aos operadores manter o controlo das linhas de produção, por exemplo, máquinas de torrefação de café Probat e máquinas de triagem de bagagem ALSTEF.
- **Gestão de edifícios (BMS):** mantém os sistemas de AVAC, segurança e energia a funcionar. Utilizado com Siemens Desigo CC e Bosch BIS.
- **Controlo de tráfego aéreo (ATC):** mantém os controladores ligados a aplicações críticas do lado ar, por exemplo, com ADB SafeGate.
- **Centro de controlo operacional do metro (OCC):** mantém a supervisão disponível para as linhas de metro de Paris automatizadas e sem condutor.
- **Sites de borda:** transforma dois servidores padrão num cluster de alta disponibilidade onde não existe um centro de dados.
- **Editores de software (OEM):** permite adicionar alta disponibilidade ao seu catálogo como uma opção apenas de software.

<a class="btn-download" href="/pt-pt/use-cases/">Explore todos os casos de uso ›</a>


## Preços simples e previsíveis {#pricing}

SafeKit é vendido com uma licença perpétua, por isso não há subscrição obrigatória. O preço depende apenas do número de servidores, não dos núcleos ou sockets da CPU, e todos os módulos da aplicação são gratuitos. Também funciona com as edições padrão do Windows, Linux e das suas bases de dados, por isso não paga pelas edições Enterprise.

<a class="btn-download" href="/pt-pt/safekit-pricing/">Solicite um orçamento ›</a>


## Limitações a considerar {#limits}

SafeKit foi concebido para ser simples, não para todos os casos. É uma boa opção para até alguns terabytes de dados replicados, menos de 1.000.000 de ficheiros, até 32 máquinas virtuais ao usar a HA de VM e dois nós na mesma LAN ou VLAN com baixa latência (normalmente inferior a 5 ms de ida e volta).

Para volumes maiores, o armazenamento partilhado ou outra abordagem é uma escolha melhor.

<a class="btn-download" href="/pt-pt/product/#safekit-ha-limitations">Veja a lista completa de limitações ›</a>


{{%  insert-safekit-videos-table-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
