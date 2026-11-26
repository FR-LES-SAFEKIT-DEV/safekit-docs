---
title: "Alta Disponibilidade na Borda Sem um Centro de Dados: SafeKit para OT e Locais Distribuídos"
canonical: "https://safekit.eviden.com/pt-pt/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Alta disponibilidade edge sem centro de dados: o SafeKit transforma dois servidores padrão num cluster plug-and-play para OT e sites distribuídos, sem SAN."
category: "use-cases"
lang: "pt-pt"
topics: "O desafio da alta disponibilidade na periferia, Por que SafeKit é a solução natural para a computação de ponta, Adequação para implementação em rede e distribuída, Por que os ambientes de OT na borda são diferentes, Casos de uso ideais na periferia, Alta disponibilidade em Edge vs. centro de dados: principais diferenças, Sistemas operativos e plataformas suportados, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-17.1 | glossaire 2026-11-17.4 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2026/05/safekit-edge-512-512.jpg"
schemaType: "Article"
---

# Alta Disponibilidade na Borda Sem um Centro de Dados: SafeKit para OT e Locais Distribuídos {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## O desafio da alta disponibilidade na periferia {#the-edge-ha-challenge}

Os locais de computação de ponta (edge computing) geralmente não possuem um centro de dados nem experiência em alta disponibilidade. No entanto, a continuidade do negócio é fundamental para eles. Uma linha de produção de fábrica, uma plataforma de petróleo offshore, uma clínica hospitalar, uma loja de retalho ou um local de antena 5G não podem suportar tempo de inatividade. Mas esses locais não conseguem justificar o custo e a complexidade de um cluster de centro de dados tradicional.

As soluções tradicionais de alta disponibilidade, como Microsoft Failover Cluster (WSFC), Pacemaker com Corosync ou VMware HA, foram concebidas para centros de dados. Requerem armazenamento partilhado (SAN ou NAS), hardware de cluster dedicado, pessoal de TI permanente e conhecimentos complexos de sistemas operativos. Nenhuma destas opções existe na periferia.

SafeKit foi criado exatamente para preencher esta lacuna. Mantém as aplicações de ponta a funcionar em fábricas, plataformas de petróleo, navios, segurança de edifícios, controlo de tráfego aéreo, redes 5G, saúde, retalho e muito mais. Requer apenas dois servidores padrão ligados por uma LAN.


![SafeKit para computação de ponta](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Por que SafeKit é a solução natural para a computação de ponta {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit transforma dois servidores de borda padrão num cluster de alta disponibilidade plug-and-play. Os servidores podem ser de qualquer marca, físicos ou virtuais. Não há armazenamento partilhado, nem SAN, nem hardware especial. Um pacote de software leve oferece as seguintes funcionalidades:

  * **Replicação de ficheiros síncrona em tempo real.** Os dados são espelhados ao nível do byte para o servidor de reserva no momento da escrita.
  * **Failover automático.** Se o servidor principal falhar, o servidor de reserva assume o controlo em segundos, sem intervenção humana.
  * **Balanceamento de carga de rede opcional.** Em implementações ativas-ativas, ambos os servidores partilham a carga de trabalho.
  * **Consola web.** A gestão é baseada em navegador e remotamente acessível via HTTPS. Não requer conhecimentos especializados no local.
  * **Instalação silenciosa e programável.** É adequada para implementação em massa em centenas de locais distribuídos e para incorporação em produtos OEM.


Não precisa de comprar uma SAN. Também não precisa de uma licença Windows Server Datacenter. Não precisa de conhecimentos especializados em clusters Linux ou hardware de cluster dedicado. A pilha completa de alta disponibilidade é um único pacote de software.

## Adequação para implementação em rede e distribuída {#edge--distributed-deployment-suitability}

SafeKit foi concebido especificamente para computação de ponta, filiais e empresas distribuídas:

Requisito de computação de ponta | Solução SafeKit  
---|---  
Não há pessoal de TI dedicado no local | Failover automático sem intervenção manual  
Sem infraestrutura SAN ou NAS | Arquitetura apenas com discos locais e sem SAN  
Gestão remota | A consola web é acessível via HTTPS a partir de qualquer navegador  
Baixo consumo de recursos de hardware | Dois servidores ou máquinas virtuais padrão, sem hardware especial  
Funciona por trás de firewalls e NAT | Portas configuráveis e consola baseada em HTTPS  
Recuperação de desastres em múltiplos locais | Replicação em tempo real com o módulo mirror entre dois locais geográficos através de uma VLAN estendida  
Redes isoladas ou offline | Sem dependência de internet e totalmente autónomo  
Implementação OEM ou integrada | Instalação silenciosa e programável que os fornecedores de software podem integrar  
Centenas de clusters distribuídos | Concebido para empresas distribuídas com muitas sucursais  
  
## Por que os ambientes de OT na borda são diferentes {#why-edge-ot-environments-are-different}

Os ambientes de tecnologia operacional (OT) incluem SCADA, sistemas de gestão de edifícios (BMS), segurança física e controlo industrial. Os seus requisitos diferem fundamentalmente dos centros de dados de TI:

  * **Não há pessoal de TI no local.** Uma subestação, uma estação de bombagem remota ou um navio não têm um administrador de sistema. A alta disponibilidade deve ser autogerida.
  * **Redes isoladas ou restritas.** Muitos locais de OT não têm acesso à internet e possuem largura de banda WAN limitada. O software de alta disponibilidade deve funcionar totalmente offline.
  * **Disponibilidade 24/7 e tolerância zero para complexidade.** Parar uma linha de produção, perder a videovigilância ou interromper o controlo de acesso custa muito mais do que o próprio software de alta disponibilidade.
  * **Ciclos de vida longos dos equipamentos.** Os servidores OT podem funcionar durante 10 a 15 anos. A solução de alta disponibilidade deve ser estável e de baixa manutenção, e não deve exigir atualizações constantes.
  * **Apenas hardware x86 padrão.** Um local industrial remoto não tem orçamento nem justificação para uma SAN ou nós de cluster dedicados.
  * **Não há tolerância para a complexidade do sistema operativo.** O software de cluster tradicional requer conhecimentos especializados em clusters. Os operadores de OT não possuem esses conhecimentos e não deveriam precisar deles.


O modelo SafeKit aborda diretamente cada uma destas restrições: sem SAN, dois servidores e com failover automático.

## Casos de uso ideais na periferia {#ideal-edge-use-cases}

SafeKit adapta-se a qualquer local sem um centro de dados onde a alta disponibilidade ainda é importante:

Indústria | Localização típica na periferia | Aplicação crítica  
---|---|---  
Segurança física e vigilância | Edifícios, campi, aeroportos | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestão de edifícios (BMS) | Edifícios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controlo eletrónico de acesso (EACS) | Instalações e campus seguros | Siemens SiPass, Nedap, Bosch AMS, Hirsch MicroSesame  
SCADA e controlo industrial | Fábricas, subestações, estações de tratamento de água | Qualquer software SCADA, DCS ou HMI em Windows ou Linux  
Controlo de tráfego aéreo (CTA) | Aeroportos, torres de controlo | Gestão do tráfego aéreo e sistemas de radar  
Centros de controlo de operações (CCO) | Metro, ferrovia, centros de transporte | Sinalização ferroviária e gestão de estações  
Marítimo | Navios, embarcações navais | Sistemas de navegação, de carga e de gestão a bordo  
Petróleo e gás | Plataformas offshore, plataformas remotas | Sistemas de controlo de processo e de segurança  
Telecomunicações | Locais de antenas 5G, nós MEC | Servidores de computação de ponta multiacesso (MEC)  
Cuidados de saúde | Clínicas, centros de diagnóstico remotos | Imagiologia médica, dados do paciente, diagnósticos remotos  
Venda a retalho | Lojas, sucursais, armazéns | Gestão de pontos de venda e de inventário  
Militar e defesa | Bases de operações avançadas, unidades de campo | Sistemas de comando e comunicações de missão crítica  
  
## Alta disponibilidade em Edge vs. centro de dados: principais diferenças {#edge-vs-data-center-ha-key-differences}

Critério | Alta disponibilidade de centro de dados (WSFC, Pacemaker, VMware HA) | Alta disponibilidade SafeKit na periferia  
---|---|---  
Armazenamento | Requer armazenamento partilhado (SAN ou NAS) | Sem SAN, apenas com discos locais  
Hardware | Nós de cluster dedicados, adaptadores de barramento de anfitrião (HBAs) e comutadores | Dois servidores x86 padrão de qualquer marca  
Conhecimentos especializados em sistemas operativos | Conhecimentos em Windows Server Datacenter ou em clusters Linux | Conhecimentos básicos de administração de sistemas Windows ou Linux  
Pessoal no local | Necessário para configuração e intervenção | Não é necessário, porque a comutação de contingência é totalmente automática  
Dependência da internet ou da nuvem | Frequentemente gerido na nuvem | Funciona em redes totalmente isoladas  
Escala de implementação | Centro de dados único | Centenas de locais distribuídos  
Custo da licença | Elevado (licenças de sistema operativo de centro de dados e SAN) | Uma licença de software acessível por cluster  
  
{{%  insert-supported-os-pt-pt  %}}

Para obter as especificações técnicas completas, as restrições de dimensionamento e os critérios de aquisição, consulte a referência técnica 📘 [RFI e RFP](</pt-pt/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>).


{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}