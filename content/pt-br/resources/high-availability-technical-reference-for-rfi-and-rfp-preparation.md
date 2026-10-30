---
title: "Guia técnico de alta disponibilidade para preparação de RFI e RFP"
canonical: "https://safekit.eviden.com/pt-br/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Referência técnica para auxiliar na preparação de documentos de RFI e RFP para alta disponibilidade e clustering de aplicações usando os conceitos e arquiteturas SafeKit ."
category: "resources"
lang: "pt-br"
topics: "Visão geral, Índice, Identidade do produto, Sistemas Operacionais e Plataformas Suportados, Limitações de Alta Disponibilidade do SafeKit, Módulos de aplicação pré-construídos, Modelo de Arquitetura e Implantação, Capacidades de RPO e RTO, Adequado para locais remotos e implantações distribuídas, Monitoramento, gerenciamento e alertas, Segurança e Conformidade, Modelo de licenciamento, SLAs de suporte e manutenção, Comparação versus alternativas, Links de referência rápida"
---

# Guia técnico de alta disponibilidade para preparação de RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Visão geral {#overview}

Esta página fornece respostas estruturadas e objetivas para perguntas comuns em solicitações de propostas (RFP/RFI) sobre o software de alta disponibilidade SafeKit . Ela serve como referência técnica para equipes de compras e arquitetos de soluções que elaboram requisitos de alta disponibilidade. 

## Índice {#table-of-contents}

  1. [Identidade do produto](#product-identity)
  2. [Sistemas Operacionais e Plataformas Suportados](#supported-operating-systems-platforms)
  3. [Limitações de Alta Disponibilidade do SafeKit](#safekit-ha-limitations)
  4. [Módulos de aplicação pré-construídos](#pre-built-application-modules)
  5. [Modelo de Arquitetura e Implantação](#architecture-deployment-model)
  6. [Capacidades de RPO e RTO](#rpo-rto-capabilities)
  7. [Adequado para locais remotos e implantações distribuídas](#edge-distributed-deployment-suitability)
  8. [Monitoramento, gerenciamento e alertas](#monitoring-management-alerting)
  9. [Segurança e Conformidade](#security-compliance)
  10. [Modelo de licenciamento](#licensing-model)
  11. [SLAs de suporte e manutenção](#support-maintenance-slas)
  12. [Comparação versus alternativas](#comparison-vs-alternatives)
  13. [Links de referência rápida](#quick-reference-links)


## Identidade do produto {#product-identity}

Campo | Responder  
---|---  
Nome do produto | SafeKit  
Fornecedor | Eviden (uma empresa da Atos), anteriormente Evidian  
Categoria de produto | Clustering de aplicações / Alta disponibilidade / Software de recuperação de desastres  
Versão atual | SafeKit 8.2  
Site | [https://safekit.eviden.com/pt-br/](</pt-br/>)  
Primeiro lançamento | 2000 (mais de 20 anos em produção)  
  
## Sistemas Operacionais e Plataformas Suportados {#supported-operating-systems-platforms}

Sistema Operacional Windows | Sistema Operacional Linux | Infraestrutura e Virtualização | Plataformas em nuvem  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Qualquer servidor de borda de qualquer marca<br> • VMware<br> • Microsoft Hyper-V*<br> • Linux KVM*<br> • Qualquer hipervisor<br> • Contêineres Docker<br> • Contêineres Podman  |  • Amazon Web Services (AWS)\*\*<br> • Microsoft Azure\*\*<br> • Google Cloud Platform (GCP)\**\*<br> • Qualquer nuvem IaaS com instâncias de VM padrão   
  
* SafeKit oferece suporte a alta disponibilidade (HA) tanto em nível de aplicativo quanto em nível de máquina virtual.*

**Os IPs virtuais devem ser configurados no nível do balanceador de carga na nuvem.**

{{%  insert-safekit-usage-pt-br  %}}

## Módulos de aplicação pré-construídos {#pre-built-application-modules}

SafeKit inclui módulos `.safe` pré-configurados e prontos para uso. Eles estão organizados em duas estratégias de alta disponibilidade: **Alta disponibilidade de aplicação** (clustering direto de aplicações com módulos mirror ou <span class="notranslate farm-term" translate="no">farm</span> ) e **Alta disponibilidade de virtualização** (clustering em nível de máquina virtual com hyperv.safe ou kvm.safe ).

 | Aplicação HA | Alta disponibilidade em nível de VM  
---|---|---  
Configuração | Isso exige um conhecimento técnico da própria aplicação: quais serviços precisam ser reiniciados, as pastas específicas da aplicação que precisam de replicação em tempo real e a configuração de um endereço IP virtual para failover. | Solução genérica para qualquer aplicação/SO em execução na máquina virtual. Não requer conhecimento técnico da aplicação instalada na máquina virtual. É a melhor solução se você não sabe como a aplicação funciona. Você só precisa definir a localização dos arquivos da máquina virtual.  
Ideal para | Ideal para incorporar alta disponibilidade diretamente em uma solução de software, independentemente do hardware ou hipervisor subjacente. | Ideal para gerenciar ambientes complexos com múltiplas aplicações em diversas máquinas virtuais através de uma única política de alta disponibilidade.  
  
A tabela abaixo lista todos os módulos `.safe` disponíveis:

Alta disponibilidade de aplicações (clusterização em nível de aplicação) | Virtualização de alta disponibilidade (clustering em nível de máquina virtual)  
---|---  
Novo aplicativo para Windows — mirror.safe | Máquina virtual Hyper-V — hyperv.safe (Windows)  
Novo aplicativo Linux — mirror.safe | Máquina virtual KVM — kvm.safe (Linux)  
Balanceamento de carga do Windows — farm.safe | Contêiner Docker — mirror.safe (Linux)  
Balanceamento de carga Linux — farm.safe | Contêiner Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes/K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows e Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows e Linux) | Bosch BIS – hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows e Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows e Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows e Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows e Linux) | Pacote Siemens Siveillance — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows e Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Nuvem (AWS, Azure, GCP, genérica) — mirror.safe / farm.safe |   
  
## Modelo de Arquitetura e Implantação {#architecture-deployment-model}

### Dois módulos de cluster: mirror.safe e farm.safe {#two-cluster-modules}

Módulo | Padrão | Caso de uso  
---|---|---  
mirror.safe | Ativo-passivo com replicação síncrona de arquivos em nível de byte + failover automático | Bancos de dados, aplicativos com estado, serviços que são executados em apenas um servidor por vez.  
farm.safe | Ativo-ativo com balanceamento de carga de rede + failover automático | Servidores web, microsserviços sem estado, gateways de API, serviços que são executados em vários servidores simultaneamente.  
  
### Infraestrutura e arquitetura de clusters {#cluster-infrastructure-architecture}

Requisito/Especificação | Capacidade/Valor SafeKit  
---|---  
É necessário armazenamento compartilhado? | Não — Arquitetura &quot;sem compartilhamento&quot; (sem SAN). Usa apenas discos locais.  
Pré-requisito do Active Directory (AD)? | Não — não requer um domínio Windows nem Active Directory. Grupos de trabalho são totalmente suportados.  
Tamanho do cluster | 2 nós ( mirror ) ou 2+ nós ( <span class="notranslate farm-term" translate="no">farm</span> )  
IP Virtual (VIP) | VIP definido por software que migra automaticamente para o nó ativo via ARP gratuito (alta disponibilidade em nível de aplicação). Para alta disponibilidade em nível de máquina virtual, o IP físico dentro da máquina virtual é redirecionado de forma transparente — sem necessidade de VIP. Requer uma LAN, VLAN ou VLAN estendida entre os nós.  
Arquitetura híbrida de 3 nós | SafeKit cobre a camada de alta disponibilidade (HA): um cluster mirror de 2 nós em uma LAN ou VLAN estendida com replicação síncrona (RPO=0) e failover automático. Uma solução de backup de terceiros completa a arquitetura: um terceiro nó remoto com replicação assíncrona em uma WAN para recuperação pontual e proteção contra ransomware.  
Papel da Alta Disponibilidade | SafeKit utiliza replicação síncrona para garantir failover instantâneo com zero perda de dados durante falhas de hardware ou software. No entanto, como grava dados em ambos os nós simultaneamente, replica fielmente erros lógicos, degradação de dados ou exclusões acidentais para o nó de espera em tempo real.  
Função de backup | Uma solução de backup (não implementada pelo SafeKit ) oferece recuperação pontual por meio de replicação assíncrona. Ela protege contra ameaças à integridade dos dados (como ransomware ou erro humano) que a alta disponibilidade não consegue bloquear. O failover automático não é suportado, pois a reversão de dados inerentemente acarreta perda de dados.  
Máximo de módulos simultâneos por cluster | 32 — esse limite abrange o número máximo de módulos SafeKit gerenciados simultaneamente em um cluster de 2 nós, normalmente usado em alta disponibilidade (HA) em nível de máquina virtual (VM), onde cada módulo replica e reinicia uma VM diferente. Cada módulo pode ser executado independentemente como primário em qualquer um dos nós, permitindo a distribuição da carga de trabalho entre os dois servidores. Observação: o volume total de dados em todas as VMs impacta diretamente o tempo de ressincronização após uma falha ou reinicialização de nó.  
Com ou sem agentes? | Baseado em agentes — software leve instalado em cada nó.  
Independente de aplicação? | Sim — protege qualquer serviço do Windows ou daemon do Linux; módulos pré-compilados para mais de 30 aplicações.  
  
### Replicação e proteção de dados {#replication-data-protection}

Requisito/Especificação | Capacidade/Valor SafeKit  
---|---  
Método de replicação | Replicação de arquivos em nível de byte (não em nível de bloco de disco)  
Modo de replicação | Síncrono (sem perda de dados)  
Requisitos de rede | Recomenda-se uma latência de ida e volta entre nós inferior a 5 ms para replicação síncrona.  
Volume de dados recomendado | Alguns terabytes (tempo de resincronização)  
Número de arquivos recomendado | &lt; 1.000.000 arquivos (tempo de resincronização)  
Velocidade de ressincronização (1 TB) | Aproximadamente 3 horas em rede de 1 Gb/s; aproximadamente 1 hora em rede de 10 Gb/s.  
Replicação seletiva | Sim — replicar diretórios/arquivos específicos  
Criptografia em trânsito | Sim — TLS/SSL para tráfego de replicação  
  
## Capacidades de RPO e RTO {#rpo-rto-capabilities}

### RPO e RTO por tipo de cluster {#rto-rpo-cluster-type}

Métrica | Cluster Mirror ( mirror.safe ) | Agrupamento <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO (Objetivo de Ponto de Recuperação) | 0 (perda de dados zero) — replicação síncrona; a gravação é confirmada somente após ambos os nós confirmarem. | N/A (sem estado; dados gerenciados pelo mirror do backend)  
RTO (Objetivo de Tempo de Recuperação) | ~1 minuto — tempo limite de pulsação (padrão de 30 segundos) + tempo de reinicialização do aplicativo | Em poucos segundos, o tráfego é imediatamente redistribuído para os nós ativos restantes.  
Tipo de replicação | Replicação de arquivos síncrona, em tempo real e em nível de byte | Não aplicável  
Gatilho de failover | Ativação automática em caso de perda de pulsação, falha do processo ou falha do verificador. | Ativação automática em caso de perda de pulsação, falha do processo ou falha do verificador.  
Intervenção manual necessária? | Não — failover e failback totalmente automáticos. | Não — failover e failback totalmente automáticos.  
  
### Análise do RTO ( Mirror — Alta disponibilidade em nível de aplicação) {#rto-breakdown-mirror-application-level-ha}

Tipo de falha | Cálculo do RTO  
---|---  
Falha de hardware | Tempo limite de pulsação (padrão de 30 segundos) + tempo de reinicialização do aplicativo  
falha de software/processo | Tempo de parada do aplicativo + tempo de reinicialização do aplicativo  
falha no nível do sistema operacional | Tempo limite de pulsação excedido + SO já em execução no segundo sistema operacional → sem penalidade de reinicialização  
  
### Análise de RTO ( Mirror — Alta disponibilidade em nível de VM) {#rto-breakdown-mirror-vm-level-ha}

Tipo de falha | Cálculo do RTO  
---|---  
Qualquer falha | Detecção de falhas + reinicialização completa do sistema operacional + reinicialização do aplicativo (normalmente vários minutos)  
  
## Adequado para locais remotos e implantações distribuídas {#edge-distributed-deployment-suitability}

SafeKit foi projetado especificamente para cenários de edge computing, filiais e empresas distribuídas.

Requisito de Borda | Resposta SafeKit  
---|---  
Não há equipe de TI dedicada no local. | Sim — failover automático, sem intervenção manual.  
Sem infraestrutura SAN/NAS | Sim — sem SAN, apenas discos locais  
Gestão remota | Sim — gerenciamento do console da web  
Tamanho reduzido do hardware | Sim — 2 servidores padrão ou máquinas virtuais, sem hardware especial.  
Funciona atrás de firewalls/NAT | Sim — portas configuráveis, console baseado em HTTPS  
Recuperação de desastres em vários locais | Sim — mirror entre dois locais geográficos em uma VLAN estendida.  
Implantação OEM/embarcada | Sim — instalação silenciosa, programável e incorporável por desenvolvedores de software.  
Centenas de clusters distribuídos | Sim — projetado para empresas distribuídas com muitas filiais.  
  
Casos de uso do Ideal Edge: qualquer site sem data center — onde a alta disponibilidade ainda é importante:

Vertical | Local de borda típico | Aplicação crítica  
---|---|---  
Segurança física e vigilância | Edifícios, campi universitários, aeroportos | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestão predial (BMS) | Prédios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controle eletrônico de acesso (EACS) | Instalações e campi seguros | Siemens SiPass, Nedap, Bosch AMS  
SCADA e controle industrial | Fábricas, subestações, estações de tratamento de água | Qualquer software SCADA, DCS ou HMI que rode em Windows ou Linux.  
Controle de tráfego aéreo (ATC) | Aeroportos, torres de controle | Sistemas de gerenciamento de controle de tráfego aéreo e radar  
Centros de controle de operações (CCO) | Metrô, ferrovia, terminais de transporte | Sinalização ferroviária e gestão de estações  
Marítimo | Navios, embarcações navais | Sistemas de navegação, carga e gerenciamento de bordo  
Petróleo e gás | Plataformas offshore, plataformas remotas | Sistemas de controle de processos e segurança  
Telecomunicações | Locais de antenas 5G, nós MEC | Servidores de computação de borda multiacesso (MEC)  
Assistência médica | Clínicas, centros de diagnóstico remoto | Imagens médicas, dados do paciente, diagnóstico remoto  
Varejo | Lojas, filiais, armazéns | Gestão de ponto de venda e estoque  
Defesa | Bases operacionais avançadas, unidades de campo | Sistemas de comando e comunicação de missão crítica  
  
## Monitoramento, gerenciamento e alertas {#monitoring-management-alerting}

Capacidade | Detalhes  
---|---  
Console da Web | Aplicativo Web ou Aplicativo Web Progressivo (PWA); configurar, monitorar e gerenciar nós de cluster.  
Notificações móveis | Notificações push do navegador para alterações de estado  
Linha do tempo dos estados | Linha do tempo visual dos estados e eventos do módulo  
Notificações por e-mail | Agente de e-mail integrado para alertas  
gerenciamento de CLI | Interface de linha de comando completa para criação de scripts e automação.  
Gerenciamento de logs | Arquivos de log por módulo e por script; snapshots de depuração para suporte.  
Integração de monitoramento de terceiros | SafeKit registra automaticamente todos os principais eventos do cluster no Log de Eventos do Windows ou no Syslog do Linux, permitindo que qualquer plataforma de monitoramento colete esses eventos e gere alertas com regras padrão — incluindo Nagios, Zabbix, Splunk e soluções SIEM — sem qualquer desenvolvimento personalizado.  
  
## Segurança e Conformidade {#security-compliance}

Recurso | Detalhes  
---|---  
Acesso ao console HTTPS | Sim — certificados TLS para o console da web  
Autenticação do usuário | Contas locais, LDAP, PKI/baseado em certificado, OpenID Connect  
Funções do usuário | Políticas de acesso configuráveis para funções de administrador, controle e monitoramento.  
Criptografia | TLS/SSL para TCP (replicação, console web, comandos distribuídos) e criptografia simétrica AES-128-CBC + SHA256 para UDP (heartbeat, protocolo interno do safeadmin); criptografia baseada na biblioteca OpenSSL. Serviço web baseado em Apache.  
Compatibilidade com antivírus | Caminhos de exclusão documentados  
Soberania | Como empresa europeia, a Eviden (Grupo Atos) oferece com SafeKit um produto exclusivo e soberano de continuidade de negócios e recuperação de desastres para Windows e Linux — mantendo os dados e a infraestrutura de failover totalmente no local, sem dependência de fornecedores dos EUA, em conformidade com os requisitos de continuidade de negócios e recuperação de desastres da norma NIS2.  
  
## Modelo de licenciamento {#licensing-model}

Aspecto | Detalhes  
---|---  
Tipo de licença | Licença perpétua (compra única) baseada em nomes de host.  
Âmbito da licença | Por servidor (nó)  
Ativação de licença | Ativação offline disponível; não é necessário acesso à internet para ativar as chaves de licença.  
Teste grátis | Sim — versão de avaliação gratuita completa disponível.  
Licença gratuita por um mês | Disponível para prova de conceito.  
  
## SLAs de suporte e manutenção {#support-maintenance-slas}

### Suporte e manutenção padrão (incluídos no contrato de manutenção ativo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Serviço | Detalhes  
---|---  
Acesso ao portal de suporte | Portal web disponível 24 horas por dia, 7 dias por semana, 365 dias por ano, para até 4 contatos técnicos nomeados.  
Horário de suporte ao vivo | 9h00 – 17h00 Centro de Suporte Europeu, de segunda a sexta-feira  
Confirmação do incidente | Dentro do horário de funcionamento do Centro de Suporte (4 horas).  
Atualizações e melhorias | Todos os Service Packs, atualizações e upgrades estão incluídos sem custo adicional.  
Substituição da chave de licença | Uma chave de licença pode ser reatribuída em caso de alteração do nome do host, desde que o contrato de suporte esteja ativo. A transferência de licença é limitada à substituição do servidor dentro do mesmo projeto, sujeita à aprovação prévia por escrito da Eviden.  
Acesso à base de conhecimento | Acesso completo aos artigos da base de conhecimento, perguntas frequentes e documentação online.  
Iniciar/parar aplicativo sem SafeKit | Sim — Pare SafeKit e use um script auxiliar para iniciar ou parar o aplicativo. O script auxiliar chama os scripts de inicialização/parada do aplicativo e configura ou remove o endereço IP virtual, se necessário. 
Portal de suporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos (sem necessidade de contrato) {#free-resources-no-contract-required}

Recurso | Detalhes  
---|---  
assistente de suporte de IA | [Chat com IA SafeKit](</pt-br/resources/safekit-support/#ai-support>) em safekit.eviden.com e via qualquer LLM usando safekit.eviden.com/llms.txt  
Treinamento e certificação online | Gratuito, no seu próprio ritmo, 12 vídeos (aproximadamente 3h40min), certificado ao concluir.  
Documentação | Guia completo do usuário, notas de lançamento, base de conhecimento, guias de início rápido  
  
## Comparação versus alternativas {#comparison-vs-alternatives}

Critério | SafeKit | Cluster de Failover da Microsoft (WSFC) | VMware HA | Código aberto*  
---|---|---|---|---  
Armazenamento compartilhado (SAN/vSAN) necessário | Não | Sim | Sim | Não  
Suporte do Windows | Sim | Sim | Sim | Não  
Suporte para Linux | Sim | Não | Sim | Sim  
Implantação de borda/ramificação | Excelente | Complexo | Complexo | Complexo  
OEM incorporável | Sim | Não | Não | Não  
Custo | Perpétuo por nó | Windows Server + SAN | vSphere Enterprise + SAN | Serviços de integração de alto nível  
Complexidade de configuração | Plug-and-Play | Alto (AD, SAN, testemunha) | Alto (vCenter, armazenamento compartilhado) | Alto (produtos fragmentados)  
Manutenibilidade | Produto único, console web | Alto nível de conhecimento (experiência em AD e SAN necessária) | Alta (dependência do vCenter) | Alto (produtos separados para manutenção)  
  
*No Linux, são necessários 6 projetos de código aberto distintos — Corosync, Pacemaker, DRBD, Keepalived, STONITH e HAProxy — para replicar o conjunto de recursos do SafeKit , exclusivamente no Linux. SafeKit oferece as mesmas funcionalidades em um único produto, tanto para Windows quanto para Linux.*

## Links de referência rápida {#quick-reference-links}

Recurso | URL  
---|---  
Página inicial do produto | [https://safekit.eviden.com/pt-br/](</pt-br/>)  
Visão geral técnica (DOCX com texto e diagramas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Teste grátis | [https://safekit.eviden.com/pt-br/resources/safekit-free-trial/](</pt-br/resources/safekit-free-trial/>)  
Solicite um orçamento | [https://safekit.eviden.com/pt-br/safekit-pricing/](</pt-br/safekit-pricing/>)  
Portal de suporte | <https://customercare.evidian.com>  
Suporte gratuito de IA | [https://safekit.eviden.com/pt-br/resources/safekit-support/](</pt-br/resources/safekit-support/>)  
Treinamento e certificação gratuitos | [https://safekit.eviden.com/pt-br/resources/safekit-on-line-training/](</pt-br/resources/safekit-on-line-training/>)  
Contate-nos | [https://safekit.eviden.com/pt-br/contact-us-for-safekit/](</pt-br/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-pt-br  %}}
