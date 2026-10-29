---
title: "Alta disponibilidade na borda sem um data center: SafeKit para OT e sites distribuídos"
canonical: "https://safekit.eviden.com/pt-br/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Sites de borda não possuem data center, mas ainda precisam de alta disponibilidade. SafeKit transforma 2 servidores padrão em um cluster de alta disponibilidade plug-and-play: sem SAN, sem equipe de TI, failover automático."
category: "use-cases"
lang: "pt-br"
topics: "O Desafio de Alta Disponibilidade na Borda, O que torna SafeKit a escolha ideal para a borda, Adequação para implantação na borda e distribuída, Por que os ambientes de OT na borda são diferentes, Casos de uso ideais para a borda, Alta Disponibilidade na borda versus em data center: Principais diferenças, Requisitos técnicos mínimos, 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade na borda sem um data center: SafeKit para OT e sites distribuídos {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## O Desafio Edge HA {#the-edge-ha-challenge}

Muitas vezes, os sites periféricos não possuem data center nem expertise em alta disponibilidade (HA) — embora a continuidade dos negócios seja crucial. Uma fábrica, uma plataforma de petróleo offshore, uma clínica hospitalar, uma loja de varejo ou uma antena 5G não podem se dar ao luxo de ficar inativos, mas também não podem justificar o custo e a complexidade de um cluster de alta disponibilidade de data center tradicional.

As soluções tradicionais de alta disponibilidade (HA) — como o Cluster de Failover Microsoft (WSFC), Pacemaker/Corosync e VMware HA — foram projetadas para data centers: elas pressupõem armazenamento compartilhado (SAN/NAS), hardware de cluster dedicado, equipe de TI permanente e conhecimento especializado em sistemas operacionais complexos. Nada disso existe na borda da rede.

SafeKit foi desenvolvido exatamente para preencher essa lacuna. Ele mantém aplicações de ponta em funcionamento em fábricas, plataformas de petróleo, navios, segurança predial, controle de tráfego aéreo, redes 5G, saúde, varejo e muito mais — com apenas dois servidores padrão e uma LAN.


![ SafeKit para Edge ](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## O que torna SafeKit a escolha ideal para o Edge {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit transforma dois servidores de borda padrão (de qualquer marca, físicos ou virtuais) em um cluster de alta disponibilidade plug-and-play — sem armazenamento compartilhado, sem SAN, sem hardware especial. Uma única pilha de software leve oferece:

  * **Replicação de arquivos síncrona em tempo real** — os dados são espelhados em nível de byte para o servidor de espera no momento da gravação
  * **Failover automático** — se o servidor primário falhar, o servidor de espera assume o controle sem intervenção humana, em segundos
  * **Balanceamento de carga de rede opcional** — para implantações ativo-ativo onde ambos os servidores compartilham a carga de trabalho
  * **Console web** — gerenciamento baseado em navegador, acessível remotamente via HTTPS, sem necessidade de conhecimento técnico no local.
  * **Instalação silenciosa e programável** — adequado para incorporação OEM e implantação em massa em centenas de locais distribuídos


Não há necessidade de adquirir SAN, de usar uma licença de datacenter do servidor Windows , de ter conhecimento do sistema operacional do cluster Linux ou de usar hardware dedicado para o cluster. Toda a pilha de alta disponibilidade (HA) é um único pacote de software.

## Adequação para implantação em borda e distribuída {#edge--distributed-deployment-suitability}

SafeKit foi projetado especificamente para cenários de edge computing, filiais e empresas distribuídas:

Requisito de borda | SafeKit Resposta  
---|---  
Sem equipe de TI dedicada no local. | Failover automático, sem necessidade de intervenção manual.  
Sem infraestrutura SAN/NAS | Arquitetura sem SAN, apenas discos locais  
Gerenciamento remoto | Console web acessível via HTTPS a partir de qualquer navegador.  
| Configuração de hardware compacta para 2 servidores ou VMs padrão, sem necessidade de hardware especial.  
Funciona atrás de firewalls/NAT | Portas configuráveis, console baseado em HTTPS.  
Recuperação de desastres em vários locais | Mirror entre dois locais geográficos em VLAN estendida  
Redes isoladas da internet / offline | Sem dependência da internet; totalmente autossuficientes  
Implantação OEM/embarcada | Instalação silenciosa, programável, incorporável por editores de software  
Centenas de clusters distribuídos | Projetados para empresas distribuídas que gerenciam muitas filiais  
  
## Por que os ambientes Edge OT são diferentes? {#why-edge-ot-environments-are-different}

Os ambientes de TO (Tecnologia Operacional) — SCADA, BMS, segurança física, controle industrial — têm requisitos que diferem fundamentalmente dos centros de dados de TI:

  * **Sem equipe de TI no local.** Uma subestação, uma estação de bombeamento remota ou um navio não possui administrador de sistemas. A alta disponibilidade deve ser autogerenciável.
  * **Redes isoladas ou com recursos limitados.** Muitos sites de OT não têm acesso à internet e possuem largura de banda WAN limitada. O software de alta disponibilidade (HA) deve funcionar completamente offline.
  * **Disponibilidade 24 horas por dia, 7 dias por semana, tolerância zero para complexidade.** Interromper uma linha de produção, perder a vigilância por vídeo ou interromper o controle de acesso custa muito mais do que o próprio software de alta disponibilidade.
  * **Longos ciclos de vida dos equipamentos.** Os servidores OT podem funcionar por 10 a 15 anos. A solução de alta disponibilidade (HA) deve ser estável, de baixa manutenção e não exigir atualizações constantes.
  * **Somente hardware x86 padrão.** Sem orçamento ou justificativa para SAN ou nós de cluster dedicados em um local industrial remoto.
  * **Intolerância à complexidade do sistema operacional.** Pacemaker, Corosync ou WSFC exigem conhecimento especializado em clusters que os operadores de OT simplesmente não possuem e não deveriam precisar.


O modelo de failover automático, com dois servidores e sem SAN, do SafeKit , aborda cada uma dessas restrições diretamente.

## Casos de uso do Ideal Edge {#ideal-edge-use-cases}

Qualquer site sem um centro de dados — onde a alta disponibilidade ainda é importante:

Vertical | Local de Borda Típico | Aplicação Crítica  
---|---|---  
Segurança física e vigilância | Edifícios, campi, aeroportos | VMS — Milestone , Genetec, Hanwha, Siemens Vigilância  
Gestão predial (BMS) | Edifícios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controle eletrônico de acesso (EACS) | Instalações seguras, campi | Siemens SiPass, Nedap , Bosch AMS  
SCADA e controle industrial | Fábricas, subestações, estações de tratamento de água | Qualquer software SCADA, DCS ou HMI em Windows ou Linux  
Controle de tráfego aéreo (ATC) | Aeroportos, torres de controle | Gerenciamento de ATC e sistemas de radar  
Centros de controle de operações (CCO) | Metrô, ferrovias, terminais de transporte público | Sinalização ferroviária e gestão de estações  
Sistemas marítimos | Navios, embarcações navais | Navegação, carga e sistemas de gerenciamento de bordo  
Petróleo e gás | Plataformas offshore, sondas remotas | Sistemas de controle de processos e segurança  
Telecomunicações | locais de antenas 5G, nós MEC | servidores de computação de borda multiacesso (MEC)  
Serviços de saúde | Clínicas, centros de diagnóstico remoto | Imagens médicas, dados de pacientes, diagnóstico remoto  
Varejo | Lojas, filiais, armazéns | Gestão de ponto de venda e estoque  
Defesa | Bases operacionais avançadas, unidades de campo | Sistemas de comando e comunicações de missão crítica  
  
## Alta disponibilidade em ambientes Edge e Data Center: Principais diferenças {#edge-vs-data-center-ha-key-differences}

Critério | Data Center HA (WSFC, Pacemaker, VMware HA) | SafeKit Edge HA  
---|---|---  
Armazenamento | Requer armazenamento compartilhado SAN/NAS | Sem SAN — somente discos locais  
Hardware | Nós de cluster dedicados, HBAs, switches | Quaisquer dois servidores x86 padrão  
Conhecimento em sistemas operacionais | Windows (datacenter) ou cluster Linux habilidades de administração | (padrão) Windows / Linux  
Equipe no local | Necessária para configuração e intervenção | Não necessária — totalmente automático  
Dependência de internet/nuvem | Frequentemente gerenciado na nuvem | Totalmente capaz de operar em ambiente isolado da internet  
Escala de implantação: | Centro de dados único; | Centenas de sites distribuídos.  
Custo da licença | Alto (SO de datacenter, licenças SAN) | Licença de software única e acessível por cluster  
Tempo de recuperação típico (RTO) | 1–5 minutos; | Menos de 1 minuto (configurável).  
  
## Requisitos técnicos mínimos {#technical-minimum-requirements}

  * Servidores **:** 2 servidores x86 padrão ou VMs (qualquer marca de hardware, físico ou virtual) ou ARM (somente Linux )
  * **SO:** Windows Servidor 2019 / 2022 / 2025, Windows 11, RHEL 8/9, Ubuntu 24.04
  * Rede **: LAN de 1 Gbps** para replicação; recomenda-se uma rede dedicada para pulsação.
  * Armazenamento **:** Somente discos locais — sem SAN, sem NAS, sem armazenamento compartilhado de qualquer tipo.
  * **Sem edição especial do SO.** — Windows O Server Standard é suficiente; não é necessária licença Datacenter.


Para obter as especificações técnicas completas, restrições de tamanho e critérios de aquisição, consulte a Referência Técnica da RFP/RFI 📘 [ ](</pt-br/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) .


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}