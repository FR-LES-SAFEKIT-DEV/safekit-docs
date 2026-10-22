---
title: "SafeKit: software de alta disponibilidade para Windows e Linux, sem SAN"
canonical: "https://safekit.eviden.com/pt-pt/"
description: "O SafeKit é o software completo de alta disponibilidade sem SAN para Windows e Linux. Disponibiliza replicação síncrona em tempo real, failover automático e balanceamento de carga num pacote simples e económico. Inicie o seu período experimental gratuito de 30 dias."
category: "home"
lang: "pt-pt"
topics: "O que o SafeKit faz, Escolha o seu nível de proteção, Módulos prontos a utilizar para as suas aplicações, Casos de utilização de clientes, Preços simples e previsíveis, Conheça os limites antes de começar, 🔍 Centro de navegação do SafeKit para alta disponibilidade"
---

# SafeKit: software de alta disponibilidade para Windows e Linux, sem SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

O SafeKit transforma dois servidores padrão num cluster de alta disponibilidade sem SAN que mantém as suas aplicações em funcionamento. Replica os dados em tempo real, reinicia a aplicação no segundo servidor se o primeiro falhar e reintegra automaticamente o servidor reparado. Instale-o nos servidores que já possui, sem armazenamento partilhado nem conhecimentos especializados de clustering.

A replicação é síncrona: não há perda de dados quando um servidor falha e a aplicação regressa em cerca de um minuto ou menos. As licenças são perpétuas e cobradas por servidor.

<a class="btn-download" href="/pt-pt/resources/safekit-free-trial/">Inicie o período experimental gratuito de 30 dias ›</a>

## O que o SafeKit faz {#features}

O SafeKit combina quatro funções num único produto, gerido através de uma consola Web ou da linha de comandos, em Windows e Linux.

| Função | Como funciona |
|---|---|
| **Replicação em tempo real** | Cada alteração nos seus ficheiros é copiada para o segundo servidor assim que ocorre, evitando a perda de dados em caso de falha. |
| **Failover automático** | O SafeKit deteta a falha, move o endereço IP virtual e reinicia a aplicação no outro servidor. |
| **Failback automático** | O servidor reparado volta a sincronizar em segundo plano enquanto a aplicação continua em execução. |
| **Balanceamento de carga** | O balanceamento de carga de rede é executado nos próprios servidores, sem balanceador ou proxy externos. |

![Consola Web do SafeKit a monitorizar um cluster mirror de dois nós para Windows e Linux, com os servidores PRIM e SECOND e replicação de dados ativa](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Não necessita de SAN, disco de quorum, Active Directory ou edições Enterprise do sistema operativo ou da base de dados.

<a class="btn-download" href="/pt-pt/architectures/">Explore as arquiteturas de cluster ›</a>

## Escolha o seu nível de proteção {#protection-levels}

A **HA de aplicação** (`mirror.safe`, `farm.safe` e os módulos de aplicação) replica apenas os dados da aplicação e reinicia-a no segundo servidor. É necessário saber que serviços reiniciar, que pastas replicar em tempo real e que endereço IP virtual transferir. Funciona em servidores físicos, máquinas virtuais em todos os hipervisores, incluindo VMware, Hyper-V e KVM, e na cloud, proporcionando a recuperação mais rápida.

A **HA de VM** (`hyperv.safe`, `kvm.safe`) replica e transfere a máquina virtual inteira, sem exigir conhecimentos sobre o funcionamento da aplicação. É adequada a ambientes com várias aplicações distribuídas por várias VMs.

<a class="btn-download" href="/pt-pt/best-practises/vm-ha-vs-application-ha/">Compare a HA de aplicação e a HA de VM ›</a>

## Módulos prontos a utilizar para as suas aplicações {#modules}

Os módulos pré-configurados são gratuitos e estão incluídos no produto. Cada módulo define os serviços a reiniciar e as pastas a replicar para uma aplicação específica.

- **Bases de dados:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **VMs e contentores:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud:** AWS, Azure, GCP e outras clouds
- **Segurança física e indústria:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/pt-pt/solutions/">Consulte todas as soluções e módulos ›</a>

## Casos de utilização de clientes {#use-cases}

- **Gestão de vídeo (VMS):** mantém o vídeo em direto e gravado disponível durante uma falha do servidor. Utilizado com Milestone, Genetec e Hanwha.
- **Controlo de acessos (EACS):** mantém credenciais e alarmes sempre disponíveis. Utilizado com Hirsch Microsesame, Nedap AEOS e Siemens SiPass.
- **SCADA e indústria:** mantém as linhas de produção sob controlo, por exemplo nos torradores de café Probat e nos sistemas de triagem de bagagem ALSTEF.
- **Gestão de edifícios (BMS):** mantém os sistemas AVAC, de segurança e de energia em funcionamento. Utilizado com Siemens Desigo CC e Bosch BIS.
- **Controlo de tráfego aéreo (ATC):** mantém os controladores ligados a aplicações críticas da placa, por exemplo com o ADB SafeGate.
- **Centro de controlo operacional do metro (OCC):** mantém a supervisão das linhas automatizadas e sem condutor do metro de Paris.
- **Locais Edge:** transforma dois servidores padrão num cluster HA onde não existe um centro de dados.
- **Fabricantes de software (OEM):** acrescentam alta disponibilidade ao catálogo como opção exclusivamente de software.

<a class="btn-download" href="/pt-pt/use-cases/">Explore todos os casos de utilização ›</a>

## Preços simples e previsíveis {#pricing}

O SafeKit é vendido com uma licença perpétua, sem subscrição obrigatória. O preço depende apenas do número de servidores, não dos núcleos ou sockets da CPU, e todos os módulos de aplicação são gratuitos. Também funciona com edições padrão de Windows, Linux e bases de dados, sem necessidade de edições Enterprise.

<a class="btn-download" href="/pt-pt/safekit-pricing/">Peça um orçamento ›</a>

## Conheça os limites antes de começar {#limits}

O SafeKit foi concebido para ser simples, mas não serve todos os casos. É adequado para alguns terabytes de dados replicados, menos de 1.000.000 de ficheiros, até 32 VMs com HA de VM e dois nós na mesma LAN ou VLAN com baixa latência (normalmente inferior a 5 ms de ida e volta).

Para volumes maiores, o armazenamento partilhado ou outra abordagem será mais adequada.

<a class="btn-download" href="/pt-pt/product/#safekit-ha-limitations">Consulte a lista completa de limitações ›</a>

{{%  insert-safekit-hub-pt-pt  %}}
