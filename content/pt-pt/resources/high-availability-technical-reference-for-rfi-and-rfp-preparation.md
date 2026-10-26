---
title: "Referência técnica de alta disponibilidade para a preparação de RFI e RFP"
canonical: "https://safekit.eviden.com/pt-pt/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Referência técnica para ajudar a preparar documentos RFI e RFP para alta disponibilidade e clustering de aplicações utilizando conceitos e arquiteturas SafeKit."
category: "resources"
lang: "pt-pt"
topics: "Visão geral, índice, identidade do produto, sistemas operativos e plataformas suportados, módulos de aplicações pré-construídos, modelo de arquitetura e implementação, capacidades de RPO e RTO, adequação da implementação distribuída e de bordo, monitorização, gestão e alertas, segurança e conformidade, modelo de licenciamento, SLAs de suporte e manutenção, comparação versus alternativas, ligações de referência rápida"
---

# Referência técnica de alta disponibilidade para a preparação de RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Visão geral {#overview}

Esta página fornece respostas estruturadas e factuais às perguntas comuns de RFP/RFI sobre o software de alta disponibilidade SafeKit. Pretende ser uma referência técnica para equipas de compras e arquitetos de soluções que elaboram requisitos de alta disponibilidade. 

## Índice {#table-of-contents}

  1. [Identidade do produto](#product-identity)
  2. [Sistemas operativos e plataformas compatíveis](#supported-operating-systems-platforms)
  3. [Módulos de aplicação pré-construídos](#pre-built-application-modules)
  4. [Modelo de arquitetura e implementação](#architecture-deployment-model)
  5. Capacidades [RPO e RTO](#rpo-rto-capabilities)
  6. [EAdequação de implantação distribuída e de bordo](#edge-distributed-deployment-suitability)
  7. [Monitorização, gestão e alertas](#monitoring-management-alerting)
  8. [Segurança e Conformidade](#security-compliance)
  9. [Modelo de licenciamento](#licensing-model)
  10. [SLAs de suporte e manutenção](#support-maintenance-slas)
  11. [Comparação vs. Alternativas](#comparison-vs-alternatives)
  12. [Ligações de referência rápida](#quick-reference-links)


## Identidade do Produto {#product-identity}

Campo | Resposta  
---|---  
Nome do produto | SafeKit  
Fornecedor | A Eviden (uma empresa da Atos), anteriormente Evidian  
Categoria de produto | Clustering de aplicações/software de recuperação de desastres de alta disponibilidade/  
Versão Atual | SafeKit 8.2  
Site | <https://safekit.eviden.com>  
Primeiro lançamento | 2000 (mais de 20 anos em produção)  
  
## Sistemas operativos e plataformas suportados {#supported-operating-systems-platforms}

Sistema operativo Windows | SO Linux | Infraestrutura e virtualização | Plataformas na nuvem  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24,04 LTS (x86-64)  |  • Qualquer servidor de edge de qualquer marca<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Qualquer hipervisor<br>• Contentores Docker<br>• Contentores Podman  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Qualquer cloud IaaS com instâncias de VM padrão   
  
_\* O SafeKit suporta HA ao nível da aplicação e HA ao nível da VM._

_\*\* Os IPs virtuais devem ser configurados ao nível do Cloud Load Balancer._

## Módulos de aplicações pré-construídos {#pre-built-application-modules}

SafeKit inclui módulos `.safe` pré-configurados e prontos a utilizar. Estão organizados em duas estratégias de HA: **HA de aplicações** (clustering direto de aplicações com espelho ou módulos de farm) e **HA de virtualização** (clustering ao nível da VM com hyperv.safe ou kvm.safe).

 | Aplicação HA | HA ao nível da VM ---|---|--- Configuração | Requer uma compreensão técnica da própria aplicação: quais os serviços que precisam de ser reiniciados, as pastas específicas da aplicação que precisam de replicação em tempo real e a configuração de um endereço IP virtual para failover. | Solução genérica para qualquer aplicação/SO em execução na VM. Não requer um conhecimento técnico da aplicação instalada na VM. É a melhor solução se não sabe como funciona a aplicação. Só precisa de definir a localização dos ficheiros da VM. Ideal para | Ideal para incorporar alta disponibilidade diretamente numa solução de software, independentemente do hardware ou hipervisor subjacente. | Ideal para gerir ambientes complexos com várias aplicações em diversas VMs através de uma única política de alta disponibilidade.  
  
A tabela abaixo lista todos os módulos `.safe` disponíveis:

HA de aplicação (clustering ao nível da aplicação) | Virtualização HA (clustering ao nível da VM)  
---|---  
Nova aplicação do Windows – mirror.safe | VM Hyper-V – hyperv.safe (Windows)  
Nova aplicação Linux – mirror.safe | VM KVM — kvm.safe (Linux)  
Balanceamento de carga do Windows – farm.safe | Contentor Docker – mirror.safe (Linux)  
Balanceamento de carga Linux – farm.safe | Contentor Podman - mirror.safe (Linux)  
Microsoft SQL Server – sqlserver.safe (Windows) | Kubernetes/K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows e Linux) | Bosch AMS – hiperv.seguro (Windows)  
MySQL – mysql.safe (Windows e Linux) | Bosch BIS – hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows e Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle – oracle.safe (Windows e Linux) | Hanwha Vision – hyperv.safe (Windows)  
Firebird — firebird.safe (Windows e Linux) | Hanwha Wisenet – hyperv.safe (Windows)  
Apache – apache_farm.safe (Windows e Linux) | Conjunto Siemens Siveillance - hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX – farm.safe (Windows e Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — marco.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) —sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, genérico) — mirror.safe / farm.safe |   
  
## Modelo de arquitetura e implementação {#architecture-deployment-model}

### Dois módulos de cluster: mirror.safe e farm.safe {#two-cluster-modules}

Módulo | Padrão | Caso de uso  
---|---|---  
espelho.seguro | Ativo-passivo com replicação síncrona de ficheiros ao nível de byte + failover automático | Bases de dados, aplicações com estado, serviços executados em apenas um servidor de cada vez  
quinta.segura | Ativo-ativo com balanceamento de carga de rede + failover automático | Servidores Web, microsserviços sem estado, gateways API, serviços executados em vários servidores ao mesmo tempo  
  
### Infraestrutura e arquitetura de cluster {#cluster-infrastructure-architecture}

Requisito/Especificação | Capacidade/valor SafeKit  
---|---  
Armazenamento partilhado necessário? | Não - arquitetura "nada partilhada" sem SAN. Utiliza apenas discos locais.  
Pré-requisito Active Directory (AD)? | Não — não requer um domínio Windows ou Active Directory. Os grupos de trabalho são totalmente suportados.  
Tamanho do cluster | 2 nós (espelho) ou mais de 2 nós (farm)  
IP Virtual (VIP) | VIP definido por software que migra automaticamente para o nó ativo através de ARP gratuito (HA ao nível da aplicação). Para o HA ao nível da VM, o IP físico dentro da VM é redirecionado de forma transparente – sem necessidade de VIP. Requer uma LAN, VLAN ou VLAN estendida entre nós.  
Arquitetura híbrida de 3 nós | O SafeKit cobre a camada HA: um cluster de espelhos de 2 nós numa LAN ou VLAN estendida com replicação síncrona (RPO=0) e failover automático. Uma solução de cópia de segurança de terceiros completa a arquitetura: um terceiro nó remoto com replicação assíncrona numa WAN para recuperação pontual e proteção contra ransomware.  
Papel da alta disponibilidade | O SafeKit utiliza replicação síncrona para garantir um failover instantâneo com zero perda de dados durante falhas de hardware ou software. No entanto, como escreve dados em ambos os nós simultaneamente, replica fielmente erros lógicos, degradação de dados ou eliminações acidentais no nó de espera em tempo real.  
Papel do Backup | Uma solução de cópia de segurança (não implementada pelo SafeKit) proporciona uma recuperação pontual através de replicação assíncrona. Protege contra ameaças à integridade dos dados (como ransomware ou erro humano) que o HA não consegue bloquear. O failover automático não é suportado, uma vez que a reversão de dados incorre inerentemente em perda de dados.  
Máximo de módulos simultâneos por cluster | 32 — este limite cobre o número máximo de módulos SafeKit geridos simultaneamente num cluster de 2 nós, normalmente utilizado em HA ao nível da VM, em que cada módulo replica e reinicia uma VM diferente. Cada módulo pode ser executado de forma independente como primário em qualquer nó, permitindo a distribuição da carga de trabalho entre ambos os servidores. Nota: o volume total de dados em todas as VMs impacta diretamente o tempo de ressincronização após um failover ou reinicialização do nó.  
Baseado em agente ou sem agente? | Baseado em agentes — software leve instalado em cada nó  
Independente de aplicação? | Sim – protege qualquer serviço do Windows ou daemon do Linux; módulos pré-construídos para mais de 30 aplicações  
  
### Replicação e proteção de dados {#replication-data-protection}

Requisito/Especificação | Capacidade/valor SafeKit  
---|---  
Método de replicação | Replicação de ficheiros ao nível de byte (não em disco ao nível de bloco)  
Modo de replicação | Síncrono (zero perda de dados)  
Requisito de rede | Latência de ida e volta entre nós < 5 ms recomendada para replicação síncrona  
Volume de dados recomendado | Alguns terabytes (tempo de ressincronização)  
Contagem de ficheiros recomendada | <1.000.000 de ficheiros (tempo de ressincronização)  
Velocidade de ressincronização (1 TB) | ~3 horas em rede de 1 Gb/s; ~1 hora em rede de 10 Gb/s  
Replicação seletiva | Sim – replicar diretórios/ficheiros específicos  
Encriptação em trânsito | Sim — TLS/SSL para tráfego de replicação  
  
## Capacidades de RPO e RTO {#rpo-rto-capabilities}

### RPO e RTO por tipo de cluster {#rto-rpo-cluster-type}

Métrica | Cluster de espelhos (mirror.safe) | Cluster Agrícola (farm.safe)  
---|---|---  
RPO (objetivo de ponto de recuperação) | 0 (zero perda de dados) — replicação síncrona; gravação reconhecida apenas após ambos os nós confirmarem | N/A (sem estado; dados manipulados pelo espelho de back-end)  
RTO (objetivo de tempo de recuperação) | ~1 minuto — tempo limite de pulsação (padrão 30 s) + tempo de reinicialização da aplicação | Alguns segundos – tráfego imediatamente redistribuído para os nós ativos sobreviventes  
Tipo de replicação | Replicação de ficheiros síncrona, em tempo real e ao nível de bytes | Não aplicável  
Gatilho de failover | Automático em caso de perda de pulsação, falha do processo ou falha do verificador | Automático em caso de perda de pulsação, falha do processo ou falha do verificador  
É necessária intervenção manual? | Não — failover e failback totalmente automáticos | Não — failover e failback totalmente automáticos  
  
### Detalhamento do RTO (Espelho — HA ao nível da aplicação) {#rto-breakdown-mirror-application-level-ha}

Tipo de falha | Cálculo de RTO  
---|---  
Falha de hardware | Tempo limite de pulsação (padrão 30 s) + tempo de reinicialização da aplicação  
Falha de software/processo | Tempo de paragem da aplicação + tempo de reinicialização da aplicação  
Falha ao nível do sistema operacional | Tempo limite de pulsação + SO já em execução no secundário → sem penalização de reinicialização  
  
### Detalhamento do RTO (espelho — HA ao nível da VM) {#rto-breakdown-mirror-vm-level-ha}

Tipo de falha | Cálculo de RTO  
---|---  
Qualquer falha | Detecção de falhas + reinicialização completa do sistema operativo + reinicialização da aplicação (normalmente vários minutos)  
  
## Adequação de implantação distribuída e de orla {#edge-distributed-deployment-suitability}

O SafeKit foi concebido especificamente para cenários empresariais de borda, filial e distribuídos.

Requisito de borda | Resposta SafeKit  
---|---  
Nenhuma equipa de TI dedicada no local | Sim — failover automático, sem intervenção manual  
Sem infraestrutura SAN/NAS | Sim – sem SAN, apenas discos locais  
Gerenciamento remoto | Sim – gestão do console web  
Baixo consumo de hardware | Sim — 2 servidores ou VMs standard, sem hardware especial  
Funciona atrás de firewalls/NAT | Sim — portas configuráveis, consola baseada em HTTPS  
Recuperação de catástrofes em vários locais | Sim — espelhamento entre dois locais geográficos em VLAN alargada  
Implantação OEM/incorporada | Sim — instalação silenciosa, programável por script, incorporável por editores de software  
Centenas de clusters distribuídos | Sim — concebido para empresas distribuídas com muitas filiais  
  
Casos de utilização ideais do Edge: qualquer website sem datacenter — onde a alta disponibilidade ainda é importante:

Verticais | Site típico de borda | Aplicação Crítica  
---|---|---  
Segurança física e vigilância | Edifícios, campi, aeroportos | VMS – Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestão de edifícios (BMS) | Edifícios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controlo de acesso eletrónico (EACS) | Instalações seguras, campi | Siemens SiPass, Nedap, Bosch AMS  
SCADA e controlo industrial | Fábricas, subestações, estações de tratamento de águas | Qualquer software SCADA, DCS ou HMI a correr em Windows ou Linux  
Controlo de tráfego aéreo (ATC) | Aeroportos, torres de controlo | Sistemas de gestão e radar ATC  
Centros de controlo de operações (OCC) | Metro, ferrovia, centros de trânsito | Sinalização ferroviária e gestão de estações  
Marítimo | Navios, embarcações de guerra | Sistemas de navegação, carga e gestão de bordo  
Petróleo e gás | Plataformas offshore, plataformas remotas | Sistemas de controlo e segurança de processos  
Telecomunicações | Locais de antena 5G, nós MEC | Servidores de computação de bordo multiacesso (MEC)  
Saúde | Clínicas, centros de diagnóstico remoto | Imagens médicas, dados do paciente, diagnóstico remoto  
Varejo | Lojas, filiais, armazéns | Gestão de ponto de venda e stock  
Defesa | Bases operacionais avançadas, unidades de campo | Sistemas de comando e comunicações de missão crítica  
  
## Monitorização, gestão e alertas {#monitoring-management-alerting}

Capacidade | Detalhes  
---|---  
Consola Web | Web App ou Progressive Web App (PWA); configurar, monitorizar e gerir nós de cluster  
Notificações móveis | Notificações push do browser para alterações de estado  
Cronograma dos estados | Linha do tempo visual dos estados e eventos do módulo  
Notificações por e-mail | Agente de e-mail integrado para alertas  
Gestão CLI | Interface de linha de comandos completa para scripts e automatização  
Gestão de registros | Ficheiros de log por módulo e por script; depurar instantâneos para suporte  
Integração de monitorização de terceiros | O SafeKit regista automaticamente todos os principais eventos de cluster no Windows Event Log ou Linux Syslog, permitindo que qualquer plataforma de monitorização recolha estes eventos e gere alarmes com regras de alerta padrão — incluindo soluções Nagios, Zabbix, Splunk e SIEM — sem qualquer desenvolvimento personalizado.  
  
## Segurança e conformidade {#security-compliance}

Recurso | Detalhes  
---|---  
Acesso à consola HTTPS | Sim — certificados TLS para consola web  
Autenticação de utilizador | Contas locais, LDAP, PKI/baseado em certificados, OpenID Connect  
Funções de utilizador | Políticas de acesso configuráveis para as funções de administrador, controlo e monitor  
Criptografia | TLS/SSL para TCP (replicação, consola web, comandos distribuídos) e encriptação simétrica AES-128-CBC + SHA256 para UDP (heartbeat, protocolo interno safeadmin); encriptação baseada na biblioteca openSSL. Serviço web baseado em Apache.  
Compatibilidade antivírus | Caminhos de exclusão documentados  
Soberania | Como empresa europeia, a Eviden (Grupo Atos) oferece com o SafeKit um produto soberano exclusivo de continuidade de negócio e recuperação de desastres para Windows e Linux – mantendo a infraestrutura de dados e failover totalmente no local, sem dependência de fornecedores dos EUA, em linha com os requisitos de continuidade de negócio e recuperação de desastres NIS2.  
  
## Modelo de licenciamento {#licensing-model}

Aspecto | Detalhes  
---|---  
Tipo de licença | Licença perpétua (compra única) baseada em nomes de host  
Âmbito da licença | Por servidor (nó)  
Ativação de licença | Ativação offline suportada; não é necessário acesso à Internet para ativar as chaves de licença.  
Teste grátis | Sim – teste gratuito completo disponível  
Licença gratuita de um mês | Disponível para prova de conceito  
  
## SLAs de suporte e manutenção {#support-maintenance-slas}

### Suporte e manutenção standard (incluído no contrato de manutenção ativo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Serviço | Detalhes  
---|---  
Acesso ao portal de suporte | Portal web 24 horas por dia, 7 dias por semana, 365 dias por ano, para até 4 contactos técnicos nomeados  
Horário de suporte ao vivo | 9h00 - 17h00 Centro de Apoio Europeu, de segunda a sexta-feira  
Reconhecimento de incidente | No prazo de 4 horas de trabalho do centro de apoio  
Atualizações e melhorias | Todos os Service Packs, atualizações e upgrades incluídos sem custos adicionais  
Substituição da chave de licença | Uma chave de licença pode ser reatribuída na alteração do nome do host ao abrigo de um contrato de suporte ativo. A transferência de licença está limitada à substituição de servidores dentro do mesmo projeto, sujeita à aceitação prévia por escrito da Eviden.  
Acesso à base de conhecimento | Acesso total aos artigos da base de conhecimento, perguntas frequentes e documentação online  
Início/paragem da aplicação sem SafeKit | Sim — Pare o SafeKit e utilize um script de invólucro para iniciar ou parar a aplicação. O script wrapper chama os scripts de início/paragem da aplicação e configura ou remove o endereço IP virtual, se necessário. 
Portal de suporte | <https://customercare.evidian.com>  
  
### Recursos Gratuitos (sem necessidade de contrato) {#free-resources-no-contract-required}

Recurso | Detalhes  
---|---  
Assistente de suporte de IA | [SafeKit AI chat](</resources/safekit-support/#ai-support>) em safekit.eviden.com e através de qualquer LLM utilizando safekit.eviden.com/llms.txt  
Formação e certificação on-line | Gratuito, individualizado, 12 vídeos (~3h40min), certificado de conclusão  
Documentação | Guia completo do utilizador, notas de versão, base de conhecimentos, guias de início rápido  
  
## Comparação vs. Alternativas {#comparison-vs-alternatives}

Critério | SafeKit | Cluster de Failover da Microsoft (WSFC) | VMware HA | Código aberto*  
---|---|---|---|---  
Armazenamento partilhado (SAN/vSAN) necessário | Não | Sim | Sim | Não  
Suporte do Windows | Sim | Sim | Sim | Não  
Suporte Linux | Sim | Não | Sim | Sim  
Implantação de fronteira/filial | Excelente | Complexo | Complexo | Complexo  
OEM incorporável | Sim | Não | Não | Não  
Custo | Perpétuo por nó | Servidor Windows + SAN | vSphere Enterprise + SAN | Serviços de integração de alto nível  
Complexidade de configuração | Plug-and-Play | Alto (AD, SAN, testemunha) | Alto (vCenter, armazenamento partilhado) | Elevado (produtos fragmentados)  
Capacidade de manutenção | Produto único, consola web | Elevado (requer experiência em AD e SAN) | Elevado (dependência do vCenter) | Alto (produtos separados para manter)  
  
_* No Linux, são necessários 6 projetos de código aberto separados – Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy – para replicar o conjunto de características do SafeKit apenas no Linux. O SafeKit oferece as mesmas características num único produto, tanto no Windows como no Linux._

## Links de referência rápida {#quick-reference-links}

Recurso | URL  
---|---  
Página inicial do produto | <https://safekit.eviden.com>  
Visão geral técnica (DOCX com texto e diagramas) | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Teste grátis | [https://safekit.eviden.com/resources/safekit-free-trial/](</pt-pt/resources/safekit-free-trial/>)  
Faça uma cotação | [https://safekit.eviden.com/safekit-pricing/](</pt-pt/safekit-pricing/>)  
Portal de suporte | <https://customercare.evidian.com>  
Suporte gratuito para IA | [https://safekit.eviden.com/resources/safekit-support/](</pt-pt/resources/safekit-support/>)  
Formação e certificação gratuitas | 🎓 [https://safekit.eviden.com/resources/safekit-on-line-training/](</pt-pt/resources/safekit-on-line-training/>)  
Contate-nos | [https://safekit.eviden.com/contact-us-for-safekit/](</pt-pt/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-pt-pt  %}}