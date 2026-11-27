---
title: "Alta Disponibilidade de Edge sem um Data Center: SafeKit para OT e Sites Distribuídos"
canonical: "https://safekit.eviden.com/pt-br/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Alta disponibilidade na borda sem data center: o SafeKit transforma dois servidores padrão em um cluster plug-and-play para OT e sites distribuídos, sem SAN."
category: "use-cases"
lang: "pt-br"
topics: "O desafio da alta disponibilidade na borda, Por que SafeKit é a escolha natural para a computação de borda, Adequação para implantação em borda e distribuída, Por que os ambientes de OT de borda são diferentes, Casos de uso ideais na borda, Edge vs. data center: principais diferenças em alta disponibilidade, Sistemas operacionais e plataformas compatíveis"
hashpart: "the-edge-ha-challenge, what-makes-safekit-the-natural-fit-for-edge, edge--distributed-deployment-suitability, why-edge-ot-environments-are-different, ideal-edge-use-cases, edge-vs-data-center-ha-key-differences, supported-operating-systems-platforms"
translation: "translate_md 2026-11-17.1 | glossaire 2026-11-17.4 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2026/05/safekit-edge-512-512.jpg"
schemaType: "Article"
---

# Alta Disponibilidade de Edge sem um Data Center: SafeKit para OT e Sites Distribuídos {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## O desafio da alta disponibilidade na borda {#the-edge-ha-challenge}

Os locais de computação de borda geralmente não têm data center nem experiência em alta disponibilidade. No entanto, a continuidade dos negócios é fundamental para eles. Uma fábrica, uma plataforma de petróleo offshore, uma clínica hospitalar, uma loja de varejo ou um local de antena 5G não podem arcar com o tempo de inatividade. Mas esses locais não podem justificar o custo e a complexidade de um cluster de data center tradicional.

As soluções tradicionais de alta disponibilidade, como Microsoft Failover Cluster (WSFC), Pacemaker com Corosync ou VMware HA, foram projetadas para data centers. Elas exigem armazenamento compartilhado (SAN ou NAS), hardware de cluster dedicado, equipe de TI permanente e conhecimento complexo do sistema operacional. Nenhuma dessas condições existe na borda.

SafeKit foi criado exatamente para preencher essa lacuna. Ele mantém os aplicativos de ponta funcionando em fábricas, plataformas de petróleo, navios, segurança predial, controle de tráfego aéreo, redes 5G, saúde, varejo e muito mais. Ele precisa apenas de dois servidores padrão conectados por uma LAN.


![SafeKit para computação de borda](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Por que SafeKit é a escolha natural para a computação de borda {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit transforma dois servidores de borda padrão em um cluster de alta disponibilidade plug-and-play. Os servidores podem ser de qualquer marca, físicos ou virtuais. Não há armazenamento compartilhado, nem SAN, nem hardware especial. Um pacote de software leve oferece os seguintes recursos:

  * **Replicação de arquivos síncrona em tempo real.** Os dados são espelhados em nível de byte para o servidor de espera no momento da gravação.
  * **Failover automático.** Se o servidor principal falhar, o servidor de reserva assume o controle em segundos, sem intervenção humana.
  * **Balanceamento de carga de rede opcional.** Em implantações ativas-ativas, ambos os servidores compartilham a carga de trabalho.
  * **Console da Web.** O gerenciamento é baseado em navegador e acessível remotamente via HTTPS. Não requer conhecimento especializado no local.
  * **Instalação silenciosa e programável.** É adequada para implantação em massa em centenas de locais distribuídos e para incorporação em produtos OEM.


Você não precisa comprar uma SAN. Você também não precisa de uma licença Windows Server Datacenter. Você não precisa de experiência em cluster Linux ou hardware de cluster dedicado. Toda a pilha de alta disponibilidade é um único pacote de software.

## Adequação para implantação em borda e distribuída {#edge--distributed-deployment-suitability}

SafeKit foi projetado especificamente para computação de borda, filiais e empresas distribuídas:

Requisito de computação de borda | Solução SafeKit  
---|---  
Não há equipe de TI dedicada no local | Failover automático sem intervenção manual  
Sem infraestrutura SAN ou NAS | Arquitetura apenas com discos locais e sem SAN  
Gerenciamento remoto | Console da Web acessível via HTTPS a partir de qualquer navegador  
Baixo consumo de recursos de hardware | Dois servidores padrão ou máquinas virtuais sem hardware especial  
Funciona por trás de firewalls e NAT | Portas configuráveis e console baseado em HTTPS  
Recuperação de desastres em vários locais | Replicação em tempo real com o módulo mirror entre dois sites geográficos em uma VLAN estendida  
Redes isoladas ou offline | Sem dependência de internet e totalmente autônomo  
Implementação OEM ou incorporada | Instalação silenciosa e programável que os fornecedores de software podem incorporar  
Centenas de clusters distribuídos | Projetado para empresas distribuídas com muitas filiais  
  
## Por que os ambientes de OT de borda são diferentes {#why-edge-ot-environments-are-different}

Os ambientes de tecnologia operacional (OT) incluem SCADA, sistemas de gerenciamento de edifícios (BMS), segurança física e controle industrial. Seus requisitos diferem fundamentalmente dos data centers de TI:

  * **Não há equipe de TI no local.** Uma subestação, uma estação de bombeamento remota ou um navio não possui um administrador de sistema. A alta disponibilidade deve ser autogerenciável.
  * **Redes isoladas ou restritas.** Muitos locais de TO não têm acesso à Internet e têm largura de banda WAN limitada. O software de alta disponibilidade deve funcionar totalmente offline.
  * **Disponibilidade 24 horas por dia, 7 dias por semana e tolerância zero para complexidade.** Parar uma linha de produção, perder a vigilância por vídeo ou interromper o controle de acesso custa muito mais do que o próprio software de alta disponibilidade.
  * **Ciclos de vida longos dos equipamentos.** Os servidores de OT podem funcionar por 10 a 15 anos. A solução de alta disponibilidade deve ser estável e de baixa manutenção, e não deve exigir atualizações constantes.
  * **Apenas hardware x86 padrão.** Um local industrial remoto não tem orçamento nem justificativa para uma SAN ou nós de cluster dedicados.
  * **Tolerância zero para a complexidade do sistema operacional.** O software de cluster tradicional requer experiência em cluster. Os operadores de OT não têm essa experiência e não deveriam precisar dela.


O modelo SafeKit aborda diretamente cada uma dessas restrições: sem SAN, dois servidores e failover automático.

## Casos de uso ideais na borda {#ideal-edge-use-cases}

SafeKit se adapta a qualquer local sem um data center onde a alta disponibilidade ainda é importante:

Indústria | Localização típica de borda | Aplicação crítica  
---|---|---  
Segurança física e vigilância | Edifícios, campi, aeroportos | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestão de edifícios (BMS) | Edifícios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controle de acesso eletrônico (EACS) | Instalações e campi seguros | Siemens SiPass, Nedap, Bosch AMS, Hirsch MicroSesame  
SCADA e controle industrial | Fábricas, subestações, estações de tratamento de água | Qualquer software SCADA, DCS ou HMI no Windows ou Linux  
Controle de tráfego aéreo (ATC) | Aeroportos, torres de controle | Sistemas de gestão de tráfego aéreo e de radar  
Centros de controle de operações (OCC) | Metrô, ferrovia, centros de transporte | Sinalização ferroviária e gestão de estações  
Marítimo | Navios, embarcações navais | Sistemas de navegação, de carga e de gestão de bordo  
Petróleo e gás | Plataformas offshore, sondas remotas | Sistemas de controle de processo e segurança  
Telecomunicações | Locais de antenas 5G, nós MEC | Servidores de computação de borda multiacesso (MEC)  
Saúde | Clínicas, centros de diagnóstico remoto | Imagens médicas, dados do paciente, diagnósticos remotos  
Varejo | Lojas, filiais, armazéns | Gestão de ponto de venda e de estoque  
Militar e defesa | Bases de operações avançadas, unidades de campo | Sistemas de comando e comunicações de missão crítica  
  
## Edge vs. data center: principais diferenças em alta disponibilidade {#edge-vs-data-center-ha-key-differences}

Critério | Alta disponibilidade de data center (WSFC, Pacemaker, VMware HA) | Alta disponibilidade SafeKit na borda  
---|---|---  
Armazenamento | Requer armazenamento compartilhado (SAN ou NAS) | Sem SAN, apenas com discos locais  
Hardware | Nós de cluster dedicados, adaptadores de barramento de host (HBAs) e switches | Dois servidores x86 padrão de qualquer marca  
Conhecimento em sistemas operacionais | Conhecimentos em cluster Windows Server Datacenter ou Linux | Conhecimentos básicos de administração Windows ou Linux  
Equipe no local | Necessário para configuração e intervenção | Não é necessário, pois o failover é totalmente automático  
Dependência da internet ou da nuvem | Frequentemente gerenciado na nuvem | Funciona em redes totalmente isoladas  
Escala de implantação | Centro de dados único | Centenas de sites distribuídos  
Custo da licença | Alto (licenças de sistema operacional de data center e SAN) | Uma licença de software acessível por cluster  
  
{{%  insert-supported-os-pt-br  %}}

Para obter as especificações técnicas completas, restrições de dimensionamento e critérios de aquisição, leia a [referência técnica RFI e RFP](</pt-br/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) 📘.


{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}