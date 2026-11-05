---
title: "SafeKit: Software de Alta Disponibilidade para Windows e Linux, sem SAN"
canonical: "https://safekit.eviden.com/pt-br/"
description: "O SafeKit é o software de alta disponibilidade (HA) SANless completo para Windows e Linux. Obtenha replicação síncrona em tempo real, failover automático e balanceamento de carga em um pacote simples e econômico. Inicie seu teste gratuito de 30 dias."
category: "home"
lang: "pt-br"
topics: "O que o SafeKit faz, Escolha o seu nível de proteção, Módulos prontos para as suas aplicações, Casos de uso de clientes, Preços simples e previsíveis, Conheça os limites antes de começar, Biblioteca de vídeos do SafeKit, 🔍 Central de navegação de alta disponibilidade do SafeKit"
translation: "translate_md 2026-11-05.8 | glossaire 2026-11-05.12 | Translation LLM | 10 expressions"
---

# SafeKit: Software de Alta Disponibilidade para Windows e Linux, sem SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

O SafeKit transforma dois servidores padrão em um cluster de alta disponibilidade SANless que mantém seus aplicativos em execução. Ele replica seus dados em tempo real, reinicia seu aplicativo no segundo servidor se o primeiro falhar e reintegra o servidor com falha automaticamente assim que ele for reparado. Você o instala nos servidores que já possui, sem armazenamento compartilhado e sem necessidade de experiência em cluster.

A replicação é síncrona, portanto, nenhum dado é perdido quando um servidor falha, e seu aplicativo volta a funcionar em cerca de um minuto ou menos. As licenças são perpétuas e o preço é por servidor.

<a class="btn-download" href="/pt-br/resources/safekit-free-trial/">Comece seu teste grátis de 30 dias ›</a>


## O que o SafeKit faz {#features}

O SafeKit combina quatro funções em um único produto, gerenciado a partir de um console da web ou de uma linha de comando, no Windows e no Linux.

| Função | Como funciona |
|---|---|
| **Replicação em tempo real** | Cada alteração feita nos seus arquivos é copiada para o segundo servidor à medida que acontece, para que uma falha não resulte em perda de dados. |
| **Failover automático** | O SafeKit detecta a falha, move o endereço IP virtual e reinicia a aplicação no outro servidor. |
| **Failback automático** | O servidor reparado é resincronizado em segundo plano enquanto o aplicativo continua em execução. |
| **Balanceamento de carga** | O balanceamento de carga da rede é executado dentro dos servidores, sem balanceador de carga ou proxy externo. |

![Console web SafeKit monitorando um cluster mirror de 2 nós para Windows e Linux, com os servidores PRIM e SECOND e replicação de dados ativa](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Você não precisa de uma SAN, um disco de quórum, Active Directory ou edições corporativas do seu sistema operacional ou banco de dados.

<a class="btn-download" href="/pt-br/architectures/">Explore as arquiteturas de cluster ›</a>


## Escolha o seu nível de proteção {#protection-levels}

**HA de aplicação** (`mirror.safe`, `farm.safe` e os módulos de aplicação) replica apenas os dados da sua aplicação e reinicia a aplicação no segundo servidor. Ele exige que você saiba quais serviços reiniciar, quais pastas replicar em tempo real e qual endereço IP virtual para failover. Ele funciona em servidores físicos, em máquinas virtuais em todos os hipervisores, incluindo VMware, Hyper-V e KVM, e na nuvem, e oferece a recuperação mais rápida.

**HA de VM** (`hyperv.safe`, `kvm.safe`) replica e executa o failover de toda a máquina virtual, portanto, você não precisa saber como o aplicativo funciona. Ele é adequado para ambientes com vários aplicativos distribuídos em várias VMs.

<a class="btn-download" href="/pt-br/best-practises/vm-ha-vs-application-ha/">Compare HA de aplicação e HA de VM ›</a>


## Módulos pré-fabricados para as suas aplicações {#modules}

Os módulos pré-configurados são gratuitos e vêm incluídos com o produto. Cada um deles define quais serviços reiniciar e quais pastas replicar para um determinado aplicativo.

- **Bancos de dados:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **Máquinas virtuais e contêineres:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Nuvem:** AWS, Azure, GCP e outras nuvens
- **Segurança física e indústria:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/pt-br/solutions/">Navegue por todas as soluções e módulos ›</a>


## Casos de uso do cliente {#use-cases}

- **Gerenciamento de vídeo (VMS):** mantém o vídeo ao vivo e gravado disponível durante uma falha do servidor. Usado com Milestone, Genetec e Hanwha.
- **Controle de acesso (EACS):** mantém as credenciais e os alarmes disponíveis o tempo todo. Usado com Hirsch Microsesame, Nedap AEOS e Siemens SiPass.
- **SCADA e indústria:** mantém os operadores no controle das linhas de produção, por exemplo, torrefadoras de café Probat e máquinas de triagem de bagagens ALSTEF.
- **Gestão de edifícios (BMS):** mantém os sistemas de AVAC, segurança e energia em funcionamento. Usado com Siemens Desigo CC e Bosch BIS.
- **Controlo de tráfego aéreo (ATC):** mantém os controladores ligados a aplicações críticas do lado ar, por exemplo, com o ADB SafeGate.
- **Controlo de operações do metro (OCC):** mantém a supervisão disponível para as linhas de metro de Paris automatizadas e sem condutor.
- **Sites de borda:** transforma dois servidores padrão em um cluster de alta disponibilidade onde não há data center.
- **Editores de software (OEM):** adicione alta disponibilidade ao seu catálogo como uma opção somente de software.

<a class="btn-download" href="/pt-br/use-cases/">Explore todos os casos de uso ›</a>


## Preços simples e previsíveis {#pricing}

O SafeKit é vendido com uma licença perpétua, portanto não há assinatura obrigatória. O preço depende apenas do número de servidores, não de núcleos ou soquetes de CPU, e todos os módulos de aplicação são gratuitos. Ele também funciona com edições padrão do Windows, Linux e seus bancos de dados, para que você não pague por edições Enterprise.

<a class="btn-download" href="/pt-br/safekit-pricing/">Solicite um orçamento ›</a>


## Conheça os limites antes de começar {#limits}

O SafeKit foi desenvolvido para ser simples, não para todos os casos. Ele é adequado para até alguns terabytes de dados replicados, menos de 1.000.000 de arquivos, até 32 VMs ao usar HA de VM e dois nós na mesma LAN ou VLAN com baixa latência (normalmente menos de 5 ms de ida e volta).

Para volumes maiores, o armazenamento compartilhado ou outra abordagem é uma escolha melhor.

<a class="btn-download" href="/pt-br/product/#safekit-ha-limitations">Veja a lista completa de limitações ›</a>


{{%  insert-safekit-videos-table-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
