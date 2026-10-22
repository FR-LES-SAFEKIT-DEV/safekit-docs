---
title: "SafeKit: software de alta disponibilidade para Windows e Linux, sem SAN"
canonical: "https://safekit.eviden.com/pt-br/"
description: "O SafeKit é o software completo de alta disponibilidade sem SAN para Windows e Linux. Tenha replicação síncrona em tempo real, failover automático e balanceamento de carga em um pacote simples e econômico. Comece seu teste grátis de 30 dias."
category: "home"
lang: "pt-br"
topics: "O que o SafeKit faz, Escolha seu nível de proteção, Módulos prontos para suas aplicações, Casos de uso de clientes, Preços simples e previsíveis, Conheça os limites antes de começar, 🔍 Central de navegação do SafeKit para alta disponibilidade"
---

# SafeKit: software de alta disponibilidade para Windows e Linux, sem SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

O SafeKit transforma dois servidores padrão em um cluster de alta disponibilidade sem SAN que mantém suas aplicações em funcionamento. Ele replica os dados em tempo real, reinicia a aplicação no segundo servidor se o primeiro falhar e reintegra automaticamente o servidor reparado. Instale-o nos servidores que você já tem, sem armazenamento compartilhado nem conhecimento especializado em clusters.

A replicação é síncrona: nenhum dado é perdido quando um servidor falha, e a aplicação volta em cerca de um minuto ou menos. As licenças são perpétuas e cobradas por servidor.

<a class="btn-download" href="/pt-br/resources/safekit-free-trial/">Comece seu teste grátis de 30 dias ›</a>

## O que o SafeKit faz {#features}

O SafeKit reúne quatro funções em um único produto, gerenciado por um console web ou por linha de comando, no Windows e no Linux.

| Função | Como funciona |
|---|---|
| **Replicação em tempo real** | Cada alteração nos arquivos é copiada para o segundo servidor assim que acontece, evitando perda de dados em caso de falha. |
| **Failover automático** | O SafeKit detecta a falha, move o endereço IP virtual e reinicia a aplicação no outro servidor. |
| **Failback automático** | O servidor reparado ressincroniza em segundo plano enquanto a aplicação continua funcionando. |
| **Balanceamento de carga** | O balanceamento de carga de rede funciona nos próprios servidores, sem balanceador ou proxy externo. |

![Console web do SafeKit monitorando um cluster mirror de dois nós para Windows e Linux, com os servidores PRIM e SECOND e replicação de dados ativa](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Você não precisa de SAN, disco de quorum, Active Directory nem edições Enterprise do sistema operacional ou do banco de dados.

<a class="btn-download" href="/pt-br/architectures/">Explore as arquiteturas de cluster ›</a>

## Escolha seu nível de proteção {#protection-levels}

A **HA de aplicação** (`mirror.safe`, `farm.safe` e os módulos de aplicação) replica somente os dados da aplicação e a reinicia no segundo servidor. É necessário saber quais serviços reiniciar, quais pastas replicar em tempo real e qual endereço IP virtual transferir. Funciona em servidores físicos, máquinas virtuais em todos os hipervisores, incluindo VMware, Hyper-V e KVM, e na nuvem, oferecendo a recuperação mais rápida.

A **HA de VM** (`hyperv.safe`, `kvm.safe`) replica e transfere a máquina virtual inteira, sem exigir conhecimento sobre o funcionamento da aplicação. É adequada para ambientes com várias aplicações distribuídas em várias VMs.

<a class="btn-download" href="/pt-br/best-practises/vm-ha-vs-application-ha/">Compare HA de aplicação e HA de VM ›</a>

## Módulos prontos para suas aplicações {#modules}

Os módulos pré-configurados são gratuitos e vêm incluídos no produto. Cada módulo define quais serviços reiniciar e quais pastas replicar para determinada aplicação.

- **Bancos de dados:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **VMs e contêineres:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Nuvem:** AWS, Azure, GCP e outras nuvens
- **Segurança física e indústria:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/pt-br/solutions/">Veja todas as soluções e módulos ›</a>

## Casos de uso de clientes {#use-cases}

- **Gerenciamento de vídeo (VMS):** mantém vídeos ao vivo e gravados disponíveis durante uma falha de servidor. Usado com Milestone, Genetec e Hanwha.
- **Controle de acesso (EACS):** mantém credenciais e alarmes sempre disponíveis. Usado com Hirsch Microsesame, Nedap AEOS e Siemens SiPass.
- **SCADA e indústria:** mantém linhas de produção sob controle, por exemplo em torradores de café Probat e sistemas de triagem de bagagens ALSTEF.
- **Gerenciamento predial (BMS):** mantém sistemas de HVAC, segurança e energia em funcionamento. Usado com Siemens Desigo CC e Bosch BIS.
- **Controle de tráfego aéreo (ATC):** mantém controladores conectados a aplicações críticas da área operacional, como o ADB SafeGate.
- **Centro de controle de operações metroviárias (OCC):** mantém a supervisão das linhas automatizadas e sem condutor do metrô de Paris.
- **Sites de borda:** transforma dois servidores padrão em um cluster HA onde não há data center.
- **Fabricantes de software (OEM):** adicionam alta disponibilidade ao catálogo como opção somente de software.

<a class="btn-download" href="/pt-br/use-cases/">Explore todos os casos de uso ›</a>

## Preços simples e previsíveis {#pricing}

O SafeKit é vendido com licença perpétua, sem assinatura obrigatória. O preço depende apenas do número de servidores, não dos núcleos ou soquetes da CPU, e todos os módulos de aplicação são gratuitos. Ele também funciona com edições padrão do Windows, Linux e bancos de dados, sem exigir edições Enterprise.

<a class="btn-download" href="/pt-br/safekit-pricing/">Solicite um orçamento ›</a>

## Conheça os limites antes de começar {#limits}

O SafeKit foi desenvolvido para ser simples, mas não atende a todos os cenários. É indicado para alguns terabytes de dados replicados, menos de 1.000.000 de arquivos, até 32 VMs com HA de VM e dois nós na mesma LAN ou VLAN com baixa latência (normalmente abaixo de 5 ms de ida e volta).

Para volumes maiores, o armazenamento compartilhado ou outra abordagem é mais adequado.

<a class="btn-download" href="/pt-br/product/#safekit-ha-limitations">Veja a lista completa de limitações ›</a>

{{%  insert-safekit-hub-pt-br  %}}
