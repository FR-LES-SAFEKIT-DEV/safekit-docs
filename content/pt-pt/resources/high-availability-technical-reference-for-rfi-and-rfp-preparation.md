---
title: "Guia técnico de alta disponibilidade para preparação de RFI e RFP"
canonical: "https://safekit.eviden.com/pt-pt/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Referência técnica para auxiliar na preparação de documentos RFI e RFP para alta disponibilidade e clustering de aplicações usando os conceitos e arquiteturas SafeKit ."
category: "resources"
lang: "pt-pt"
topics: "Visão geral, Sumário, Identidade do produto, Sistemas operacionais e plataformas suportados, Módulos de aplicativos pré-construídos, Arquitetura e modelo de implantação, Capacidades de RPO e RTO, Adequação para implantação em borda e distribuída, Monitoramento, gerenciamento e alertas, Segurança e conformidade, Modelo de licenciamento, SLAs de suporte e manutenção, Comparação com alternativas, Links de referência rápida"
---

# Referência técnica de alta disponibilidade para preparação de RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Visão geral {#overview}

Esta página fornece respostas estruturadas e objetivas para perguntas comuns em solicitações de propostas (RFP/RFI) sobre o software de alta disponibilidade SafeKit . Ela serve como referência técnica para equipes de compras e arquitetos de soluções que elaboram requisitos de alta disponibilidade. 

## Índice {#table-of-contents}

  1. Identidade do produto [ ](#product-identity)
  2. Sistemas operacionais e plataformas suportados: [ ](#supported-operating-systems-platforms)
  3. Módulos de aplicação pré-construídos [ ](#pre-built-application-modules)
  4. Arquitetura e Modelo de Implantação [ ](#architecture-deployment-model)
  5. Capacidades de RPO e RTO [ ](#rpo-rto-capabilities)
  6. [ Adequação para Implantação de Borda e Distribuída ](#edge-distributed-deployment-suitability)
  7. [ Monitoramento, gerenciamento e alertas ](#monitoring-management-alerting)
  8. [ Segurança e Conformidade ](#security-compliance)
  9. Modelo de licenciamento [ ](#licensing-model)
  10. SLAs de suporte e manutenção [ ](#support-maintenance-slas)
  11. Comparação [ com as alternativas ](#comparison-vs-alternatives)
  12. Links de referência rápida [ ](#quick-reference-links)


## Identificação do produto {#product-identity}

Campo | Resposta  
---|---  
Nome do produto: | SafeKit  
Fornecedor | Eviden (uma empresa da Atos), anteriormente Evidian  
Categoria de produto: | Software para clustering de aplicações / Alta disponibilidade / Recuperação de desastres  
Versão atual | SafeKit 8.2  
Site | <https://safekit.eviden.com>  
Primeiro lançamento | 2000 (mais de 20 anos em produção)  
  
## Sistemas operacionais e plataformas suportados {#supported-operating-systems-platforms}

Windows SO | Linux SO | Infraestrutura e Virtualização | Plataformas em Nuvem  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64) | • Qualquer servidor edge de qualquer marca <br> • VMware <br> • Microsoft Hyper-V * <br> • Linux KVM * <br> • Qualquer hipervisor <br> • Docker containers <br> • Contêineres Podman | • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • Qualquer nuvem IaaS com instâncias de VM padrão   
  
_ * SafeKit suporta alta disponibilidade (HA) tanto em nível de aplicativo quanto em nível de máquina virtual (VM)._

_ Os IPs virtuais ** devem ser configurados no nível do balanceador de carga na nuvem._

## Módulos de aplicação pré-construídos {#pre-built-application-modules}

O pacote SafeKit inclui módulos `.safe` prontos para uso e pré-configurados. Eles estão organizados em duas estratégias de alta disponibilidade (HA): ** HA de aplicação), ** (clusterização direta de aplicações com módulos mirror ou `farm` ) e ** (HA de virtualização) ** (clusterização em nível de máquina virtual com hyperv.safe ou kvm.safe ).

 | Alta disponibilidade de aplicativos | Alta disponibilidade em nível de VM  
---|---|---  
Configuração | Requer conhecimento técnico da própria aplicação: quais serviços precisam ser reiniciados, as pastas específicas da aplicação que precisam de replicação em tempo real e a configuração de um endereço IP virtual para failover. | Solução genérica para qualquer aplicação/SO em execução na VM. Não requer conhecimento técnico da aplicação instalada na VM. É a melhor solução se você não sabe como a aplicação funciona. Você só precisa definir a localização dos arquivos da VM.  
Ideal para | Ideal para incorporar alta disponibilidade diretamente em uma solução de software, independentemente do hardware ou hipervisor subjacente. | Ideal para gerenciar ambientes complexos com vários aplicativos em diversas VMs por meio de uma única política de alta disponibilidade.  
  
A tabela abaixo lista todos os módulos `.safe` disponíveis:

Alta disponibilidade de aplicativos (clustering em nível de aplicativo) | Alta disponibilidade de virtualização (clustering em nível de máquina virtual)  
---|---  
Novo aplicativo Windows — VM Hyper-V mirror.safe | — hyperv.safe ( Windows )  
Novo aplicativo Linux — mirror.safe | KVM VM — kvm.safe ( Linux )  
Balanceamento de carga Windows — Contêiner farm.safe | Docker — mirror.safe ( Linux )  
Balanceamento de carga Linux — Contêiner farm.safe | Podman — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( Windows e Linux ) | Bosch AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows e Linux ) | Bosch BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows e Linux ) | Bosch BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows e Linux ) | Visão Hanwha — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows e Linux ) | Hanwha Wisenet — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( Windows e Linux ) | Siemens Siveillance suite — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( Windows e Linux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) | Siemens SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
Genetec ( SQL Server ) — sqlserver.safe ( Windows ) | SIMATIC WinCC — hyperv.safe ( Windows )  
Siemens Siveillance VMS — SiveillanceVMS.safe ( Windows ) |   
Nuvem ( AWS , Azure , GCP , genérico) — mirror.safe / farm.safe |   
  
## Modelo de Arquitetura e Implantação {#architecture-deployment-model}

### Dois módulos de cluster: mirror.safe e farm.safe {#two-cluster-modules}

Módulo | Padrão | Caso de uso  
---|---|---  
mirror.safe | Ativo-passivo com replicação síncrona de arquivos em nível de byte + failover automático | Bancos de dados, aplicativos com estado e serviços que são executados em apenas um servidor por vez  
farm.safe | Ativo-ativo com balanceamento de carga de rede + failover automático | Servidores web, microsserviços sem estado, gateways de API, serviços que são executados em vários servidores simultaneamente  
  
### Infraestrutura e arquitetura de cluster {#cluster-infrastructure-architecture}

Requisito/Especificação | SafeKit Capacidade/Valor  
---|---  
Armazenamento compartilhado necessário? | Não — Arquitetura "sem compartilhamento" sem SAN. Usa apenas discos locais.  
Pré-requisito do Active Directory (AD)? | Não — não requer um domínio Windows nem Active Directory. Grupos de trabalho são totalmente suportados.  
Tamanho do cluster | 2 nós ( mirror ) ou 2+ nós ( `farm` )  
IP Virtual (VIP) | VIP definido por software que migra automaticamente para o nó ativo via ARP gratuito (alta disponibilidade em nível de aplicação). Para alta disponibilidade em nível de máquina virtual (VM), o IP físico dentro da VM é redirecionado de forma transparente — sem necessidade de VIP. Requer uma LAN, VLAN ou VLAN estendida entre os nós.  
A arquitetura híbrida de 3 nós | SafeKit cobre a camada de alta disponibilidade (HA): um cluster de 2 nós mirror em uma LAN ou VLAN estendida com replicação síncrona (RPO=0) e failover automático. Uma solução de backup de terceiros completa a arquitetura: um terceiro nó remoto com replicação assíncrona em uma WAN para recuperação pontual e proteção contra ransomware.  
O papel da alta disponibilidade | SafeKit utiliza replicação síncrona para garantir failover instantâneo com zero perda de dados durante falhas de hardware ou software. No entanto, como grava dados em ambos os nós simultaneamente, replica fielmente erros lógicos, degradação de dados ou exclusões acidentais para o nó de espera em tempo real.  
Função do Backup | Uma solução de backup (não implementada por SafeKit ) fornece recuperação pontual por meio de replicação assíncrona. Ela protege contra ameaças à integridade dos dados (como ransomware ou erro humano) que o HA não consegue bloquear. O failover automático não é suportado, pois a reversão de dados inerentemente acarreta perda de dados.  
Número máximo de módulos simultâneos por cluster | 32 — este limite abrange o número máximo de módulos SafeKit gerenciados simultaneamente em um cluster de 2 nós, normalmente usado em alta disponibilidade (HA) em nível de máquina virtual (VM), onde cada módulo replica e reinicia uma VM diferente. Cada módulo pode ser executado independentemente como primário em qualquer um dos nós, permitindo a distribuição da carga de trabalho entre os dois servidores. Observação: o volume total de dados em todas as VMs impacta diretamente o tempo de ressincronização após uma falha ou reinicialização de nó.  
Com ou sem agente? | Com agente — software leve instalado em cada nó  
Independente de aplicação? | Sim — protege qualquer serviço Windows ou daemon Linux ; módulos pré-compilados para mais de 30 aplicações.  
  
### Replicação e proteção de dados {#replication-data-protection}

Requisito/Especificação | SafeKit Capacidade/Valor  
---|---  
Método de replicação | Replicação de arquivo em nível de byte (não em nível de bloco de disco)  
Modo de replicação | Síncrono (sem perda de dados)  
Requisito de rede | Latência de ida e volta entre nós < 5 ms recomendada para replicação síncrona.  
Volume de dados recomendado: | Alguns terabytes (tempo de resincronização)  
Número recomendado de arquivos | < 1.000.000 arquivos (tempo de resincronização)  
Velocidade de ressincronização (1 TB) | ~3 horas em rede de 1 Gb/s; ~1 hora em rede de 10 Gb/s  
Replicação seletiva | Sim — replicar diretórios/arquivos específicos  
Criptografia em trânsito | Sim — TLS/SSL para tráfego de replicação  
  
## Capacidades de RPO e RTO {#rpo-rto-capabilities}

### RPO e RTO por tipo de cluster {#rto-rpo-cluster-type}

Métrica | Mirror Cluster ( mirror.safe ) | `Farm` Cluster ( farm.safe )  
---|---|---  
RPO (Recovery Point Objective) | 0 (perda de dados zero) — replicação síncrona; gravação confirmada somente após ambos os nós confirmarem | N/A (sem estado; dados gerenciados pelo backend mirror )  
RTO (Objetivo de Tempo de Recuperação) | ~1 minuto — tempo limite de pulsação (padrão de 30 s) + tempo de reinicialização do aplicativo | Alguns segundos — o tráfego é redistribuído imediatamente para os nós ativos restantes  
Tipo de replicação | Replicação de arquivos síncrona, em tempo real e em nível de byte | Não aplicável  
Gatilho de failover | Automático em caso de perda de heartbeat, falha do processo ou falha do verificador. | Automático em caso de perda de heartbeat, falha do processo ou falha do verificador.  
Intervenção manual necessária? | Não — failover e failback totalmente automáticos | Não — failover e failback totalmente automáticos  
  
### Análise de RTO ( Mirror — Alta disponibilidade em nível de aplicativo) {#rto-breakdown-mirror-application-level-ha}

Cálculo do RTO do tipo de falha |  
---|---  
Falha de hardware | Tempo limite de pulsação (padrão 30 s) + tempo de reinicialização do aplicativo  
Falha de software/processo | Hora de parada do aplicativo + hora de reinicialização do aplicativo  
Falha no nível do sistema operacional | Tempo limite de pulsação excedido + SO já em execução no segundo sistema operacional → sem penalidade de reinicialização  
  
### RTO Breakdown ( Mirror — HA em nível de VM) {#rto-breakdown-mirror-vm-level-ha}

Cálculo do RTO do tipo de falha |  
---|---  
Qualquer falha | Detecção de falha + reinicialização completa do SO + reinicialização do aplicativo (normalmente vários minutos)  
  
## Adequação para implantação em borda e distribuída {#edge-distributed-deployment-suitability}

SafeKit foi projetado especificamente para cenários de edge computing, filiais e empresas distribuídas.

Requisito de borda | SafeKit Resposta  
---|---  
Sem equipe de TI dedicada no local | Sim — failover automático, sem intervenção manual  
Sem infraestrutura SAN/NAS | Sim — Sem SAN, somente discos locais  
Gerenciamento remoto | Sim — gerenciamento via console web  
Baixa necessidade de hardware | Sim — 2 servidores padrão ou VMs, sem hardware especial  
Funciona atrás de firewalls/NAT | Sim — portas configuráveis, console baseado em HTTPS  
Recuperação de desastres em vários locais | Sim — mirror entre dois locais geográficos em uma VLAN estendida  
Implantação OEM/embarcada | Sim — instalação silenciosa, programável, incorporável por editores de software  
Centenas de clusters distribuídos | Sim — projetado para empresas distribuídas com muitas filiais  
  
Casos de uso do Ideal Edge: qualquer site sem data center — onde a alta disponibilidade ainda é importante:

Vertical | Local de Borda Típico | Aplicação Crítica  
---|---|---  
Segurança física e vigilância | Edifícios, campi, aeroportos | VMS — Milestone , Genetec, Hanwha, Siemens Vigilância  
Gestão predial (BMS) | Edifícios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controle eletrônico de acesso (EACS) | Instalações seguras, campi | Siemens SiPass, Nedap , Bosch AMS  
SCADA e controle industrial | Fábricas, subestações, estações de tratamento de água | Qualquer software SCADA, DCS ou HMI executado em Windows ou Linux  
Controle de tráfego aéreo (ATC) | Aeroportos, torres de controle | Gerenciamento de ATC e sistemas de radar  
Centros de controle de operações (CCO) | Metrô, ferrovias, terminais de transporte público | Sinalização ferroviária e gestão de estações  
Sistemas marítimos | Navios, embarcações navais | Navegação, carga e sistemas de gerenciamento de bordo  
Petróleo e gás | Plataformas offshore, sondas remotas | Sistemas de controle de processos e segurança  
Telecomunicações | locais de antenas 5G, nós MEC | servidores de computação de borda multiacesso (MEC)  
Serviços de saúde | Clínicas, centros de diagnóstico remoto | Imagens médicas, dados de pacientes, diagnóstico remoto  
Varejo | Lojas, filiais, armazéns | Gestão de ponto de venda e estoque  
Defesa | Bases operacionais avançadas, unidades de campo | Sistemas de comando e comunicações de missão crítica  
  
## Monitoramento, gerenciamento e alertas {#monitoring-management-alerting}

Detalhes da capacidade |  
---|---  
Console Web | Aplicativo Web ou Aplicativo Web Progressivo (PWA); configure, monitore e gerencie nós do cluster  
Notificações móveis | Notificações push do navegador para alterações de estado  
Linha do tempo dos estados | Linha do tempo visual dos estados e eventos do módulo  
Notificações por e-mail | Agente de e-mail integrado para alertas  
Gerenciamento de CLI | Interface de linha de comando completa para scripts e automação  
Gerenciamento de logs | Arquivos de log por módulo e por script; snapshots de depuração para suporte  
A integração de monitoramento de terceiros | SafeKit registra automaticamente todos os principais eventos do cluster no Log de Eventos Windows ou no Syslog Linux , permitindo que qualquer plataforma de monitoramento colete esses eventos e gere alarmes com regras de alerta padrão — incluindo soluções Nagios, Zabbix, Splunk e SIEM — sem qualquer desenvolvimento personalizado.  
  
## Segurança e Conformidade {#security-compliance}

Detalhes da funcionalidade |  
---|---  
Acesso ao console HTTPS | Sim — Certificados TLS para o console da web  
Autenticação de usuário | Contas locais, LDAP, PKI/baseada em certificado, OpenID Connect  
Funções de usuário | Políticas de acesso configuráveis para funções de administrador, controle e monitoramento  
Criptografia | TLS/SSL para TCP (replicação, console web, comandos distribuídos) e criptografia simétrica AES-128-CBC + SHA256 para UDP (heartbeat, protocolo interno do safeadmin); criptografia baseada na biblioteca OpenSSL. Serviço web baseado em Apache.  
Compatibilidade com antivírus | Caminhos de exclusão documentados  
Soberania | Como empresa europeia, a Eviden (Grupo Atos) oferece com o SafeKit um produto exclusivo de continuidade de negócios e recuperação de desastres soberana para Windows e Linux — mantendo os dados e a infraestrutura de failover totalmente no local, sem dependência de fornecedores dos EUA, em conformidade com os requisitos de continuidade de negócios e recuperação de desastres do NIS2.  
  
## Modelo de licenciamento {#licensing-model}

Detalhes do aspecto |  
---|---  
Tipo de licença | Licença perpétua (compra única) baseada em nomes de host  
Escopo da licença: | Por servidor (nó)  
Ativação de licença | Ativação offline disponível; não é necessário acesso à internet para ativar as chaves de licença.  
Teste gratuito | Sim — versão de avaliação gratuita completa disponível  
Licença gratuita de um mês | disponível para prova de conceito.  
  
## SLAs de suporte e manutenção {#support-maintenance-slas}

### Suporte e manutenção padrão (incluídos no contrato de manutenção ativo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Detalhes do serviço |  
---|---  
Acesso ao portal de suporte | , disponível 24 horas por dia, 7 dias por semana, 365 dias por ano, para até 4 contatos técnicos nomeados.  
Horário de atendimento ao vivo | : 9h às 17h, Centro de Suporte Europeu, de segunda a sexta-feira.  
Confirmação de incidente | Dentro de 4 horas úteis do Centro de Suporte  
Atualizações e upgrades | Todos os Service Packs, atualizações e upgrades incluídos sem custo adicional  
Substituição da chave de licença | Uma chave de licença pode ser reatribuída em caso de alteração do nome do host, desde que o contrato de suporte esteja ativo. A transferência de licença é limitada à substituição do servidor dentro do mesmo projeto, sujeita à aprovação prévia por escrito da Eviden.  
Acesso à base de conhecimento | Acesso completo a artigos da base de conhecimento, perguntas frequentes e documentação online.  
Iniciar/parar aplicativo sem SafeKit | Sim — Pare SafeKit e use um script auxiliar para iniciar ou parar o aplicativo. O script auxiliar chama os scripts de inicialização/parada do aplicativo e configura ou remove o endereço IP virtual, se necessário. 
Portal de suporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos (sem necessidade de contrato) {#free-resources-no-contract-required}

Detalhes do recurso |  
---|---  
Assistente de suporte de IA | [ SafeKit Chat de IA ](</pt-pt/resources/safekit-support/#ai-support>) em safekit.eviden.com e por meio de qualquer LLM usando safekit.eviden.com/ llms.txt  
Treinamento e certificação online | Gratuito, no seu próprio ritmo, 12 vídeos (aproximadamente 3h40min), certificado ao concluir.  
Documentação | Guia completo do usuário, notas de versão, base de conhecimento, guias de início rápido  
  
## Comparação com alternativas {#comparison-vs-alternatives}

Critério | SafeKit | Microsoft Cluster de Failover (WSFC) | VMware HA | Código Aberto *  
---|---|---|---|---  
Armazenamento compartilhado (SAN/vSAN) necessário | Não | Sim | Sim | Não  
Suporte para Windows | Sim | Sim | Sim | Não  
Suporte para Linux | Sim | Não | Sim | Sim  
Implantação de borda/ramificação | Excelente | Complexo | Complexo | Complexo  
OEM incorporável | Sim | Não | Não | Não  
Custo | Perpétuo por nó | Windows Servidor + SAN | vSphere Enterprise + SAN | Serviços de integração de alto nível  
Complexidade de configuração | Plug-and-Play | Alta (AD, SAN, testemunha) | Alta (vCenter, armazenamento compartilhado) | Alta (produtos fragmentados)  
Manutenibilidade: | Produto único, console web | Alta (requer conhecimento em AD e SAN); | Alta (dependência do vCenter); | Alta (produtos separados para manter).  
  
_ No * , são necessários 6 projetos de código aberto distintos — Corosync, Pacemaker, DRBD, Keepalived, STONITH Linux HAProxy — para replicar o conjunto de recursos do SafeKit apenas no Linux . SafeKit oferece as mesmas funcionalidades em um único produto, tanto no Windows quanto Linux

## Links de referência rápida {#quick-reference-links}

URL do recurso |  
---|---  
Página inicial do produto | <https://safekit.eviden.com>  
Visão geral técnica (DOCX com texto e diagramas) | 📘 [ https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx]( </wp-content/uploads/documents/safekit-technical-overview-en.docx> )  
Teste </pt-pt/resources/safekit-free-trial/> | [ https://safekit.eviden.com/pt-pt/resources/safekit-free-trial/]( )  
Solicite um orçamento | [ https://safekit.eviden.com/safekit-pricing/]( </safekit-pricing/> )  
Portal de suporte | <https://customercare.evidian.com>  
Suporte gratuito de IA | [ https://safekit.eviden.com/pt-pt/resources/safekit-support/]( </pt-pt/resources/safekit-support/> )  
Treinamento e certificação gratuitos | 🎓 [ https://safekit.eviden.com/pt-pt/resources/safekit-on-line-training/]( </pt-pt/resources/safekit-on-line-training/> )  
Entre em contato conosco | [ https://safekit.eviden.com/contact-us-for-safekit/]( </contact-us-for-safekit/> )  
  

{{%  insert-safekit-4-buttons-pt-pt  %}}