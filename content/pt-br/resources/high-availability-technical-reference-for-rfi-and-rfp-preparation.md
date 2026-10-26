---
title: "Referência técnica de alta disponibilidade para preparação de RFI e RFP"
canonical: "https://safekit.eviden.com/pt-br/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Referência técnica para ajudar a preparar documentos RFI e RFP para alta disponibilidade e clustering de aplicativos usando conceitos e arquiteturas SafeKit."
category: "resources"
lang: "pt-br"
topics: "Visão geral, índice, identidade do produto, sistemas operacionais e plataformas suportados, módulos de aplicativos pré-construídos, modelo de arquitetura e implantação, recursos de RPO e RTO, adequação de implantação distribuída e de borda, monitoramento, gerenciamento e alertas, segurança e conformidade, modelo de licenciamento, SLAs de suporte e manutenção, comparação versus alternativas, links de referência rápida"
---

# Referência técnica de alta disponibilidade para preparação de RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Visão geral {#overview}

Esta página fornece respostas estruturadas e factuais para perguntas comuns de RFP/RFI sobre o software de alta disponibilidade SafeKit. Pretende ser uma referência técnica para equipes de compras e arquitetos de soluções que elaboram requisitos de alta disponibilidade. 

## Índice {#table-of-contents}

  1. [Identidade do produto](#product-identity)
  2. [Sistemas operacionais e plataformas compatíveis](#supported-operating-systems-platforms)
  3. [Módulos de aplicação pré-construídos](#pre-built-application-modules)
  4. [Modelo de arquitetura e implantação](#architecture-deployment-model)
  5. Capacidades [RPO e RTO](#rpo-rto-capabilities)
  6. [EAdequação de implantação distribuída e de borda](#edge-distributed-deployment-suitability)
  7. [Monitoramento, gerenciamento e alertas](#monitoring-management-alerting)
  8. [Segurança e Conformidade](#security-compliance)
  9. [Modelo de licenciamento](#licensing-model)
  10. [SLAs de suporte e manutenção](#support-maintenance-slas)
  11. [Comparação vs. Alternativas](#comparison-vs-alternatives)
  12. [Links de referência rápida](#quick-reference-links)


## Identidade do Produto {#product-identity}

Campo | Resposta  
---|---  
Nome do produto | SafeKit  
Fornecedor | Eviden (uma empresa da Atos), anteriormente Evidian  
Categoria de produto | Clustering de aplicativos/alta disponibilidade/software de recuperação de desastres  
Versão Atual | SafeKit 8.2  
Site | <https://safekit.eviden.com>  
Primeiro lançamento | 2000 (mais de 20 anos em produção)  
  
## Sistemas operacionais e plataformas suportados {#supported-operating-systems-platforms}

Sistema operacional Windows | SO Linux | Infraestrutura e virtualização | Plataformas em nuvem  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Qualquer servidor de borda de qualquer marca<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Qualquer hipervisor<br>• Contêineres Docker<br>• Contêineres Podman  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Qualquer nuvem IaaS com instâncias de VM padrão   
  
_* SafeKit suporta HA em nível de aplicativo e HA em nível de VM._

_** Os IPs virtuais devem ser configurados no nível do Cloud Load Balancer._

## Módulos de aplicativos pré-construídos {#pre-built-application-modules}

SafeKit inclui módulos `.safe` pré-configurados e prontos para uso. Eles são organizados em duas estratégias de HA: **HA de aplicativos** (clustering direto de aplicativos com espelho ou módulos de farm) e **HA de virtualização** (clustering em nível de VM com hyperv.safe ou kvm.safe).

 | Aplicação HA | HA em nível de VM ---|---|--- Configuração | Requer um entendimento técnico do próprio aplicativo: quais serviços precisam ser reiniciados, as pastas específicas do aplicativo que precisam de replicação em tempo real e a configuração de um endereço IP virtual para failover. | Solução genérica para qualquer aplicação/SO em execução na VM. Não requer um conhecimento técnico do aplicativo instalado na VM. É a melhor solução se você não sabe como funciona o aplicativo. Você só precisa definir a localização dos arquivos da VM. Ideal para | Ideal para incorporar alta disponibilidade diretamente em uma solução de software, independentemente do hardware ou hipervisor subjacente. | Ideal para gerenciar ambientes complexos com vários aplicativos em diversas VMs por meio de uma única política de alta disponibilidade.  
  
A tabela abaixo lista todos os módulos `.safe` disponíveis:

HA de aplicativo (clustering em nível de aplicativo) | Virtualização HA (clustering em nível de VM)  
---|---  
Novo aplicativo do Windows – mirror.safe | VM Hyper-V – hyperv.safe (Windows)  
Novo aplicativo Linux – mirror.safe | VM KVM — kvm.safe (Linux)  
Balanceamento de carga do Windows – farm.safe | Contêiner Docker – mirror.safe (Linux)  
Balanceamento de carga Linux – farm.safe | Contêiner Podman - mirror.safe (Linux)  
Microsoft SQL Server – sqlserver.safe (Windows) | Kubernetes/K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows e Linux) | Bosch AMS – hiperv.seguro (Windows)  
MySQL – mysql.safe (Windows e Linux) | Bosch BIS – hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows e Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle – oracle.safe (Windows e Linux) | Visão Hanwha – hyperv.safe (Windows)  
Firebird — firebird.safe (Windows e Linux) | Hanwha Wisenet – hyperv.safe (Windows)  
Apache – apache_farm.safe (Windows e Linux) | Conjunto Siemens Siveillance - hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX – farm.safe (Windows e Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — marco.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) —sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Nuvem (AWS, Azure, GCP, genérico) — mirror.safe / farm.safe |   
  
## Modelo de arquitetura e implantação {#architecture-deployment-model}

### Dois módulos de cluster: mirror.safe e farm.safe {#two-cluster-modules}

Módulo | Padrão | Caso de uso  
---|---|---  
espelho.seguro | Ativo-passivo com replicação síncrona de arquivos em nível de byte + failover automático | Bancos de dados, aplicativos com estado, serviços executados em apenas um servidor por vez  
fazenda.segura | Ativo-ativo com balanceamento de carga de rede + failover automático | Servidores Web, microsserviços sem estado, gateways de API, serviços executados em vários servidores ao mesmo tempo  
  
### Infraestrutura e arquitetura de cluster {#cluster-infrastructure-architecture}

Requisito/Especificação | Capacidade/valor SafeKit  
---|---  
Armazenamento compartilhado necessário? | Não - arquitetura "nada compartilhada" sem SAN. Usa apenas discos locais.  
Pré-requisito do Active Directory (AD)? | Não — não requer um domínio do Windows ou Active Directory. Os grupos de trabalho são totalmente suportados.  
Tamanho do cluster | 2 nós (espelho) ou mais de 2 nós (farm)  
IP Virtual (VIP) | VIP definido por software que migra automaticamente para o nó ativo por meio de ARP gratuito (HA em nível de aplicativo). Para HA no nível da VM, o IP físico dentro da VM é redirecionado de forma transparente – sem necessidade de VIP. Requer uma LAN, VLAN ou VLAN estendida entre nós.  
Arquitetura híbrida de 3 nós | SafeKit cobre a camada HA: um cluster de espelho de 2 nós em uma LAN ou VLAN estendida com replicação síncrona (RPO=0) e failover automático. Uma solução de backup de terceiros completa a arquitetura: um terceiro nó remoto com replicação assíncrona em uma WAN para recuperação pontual e proteção contra ransomware.  
Papel da alta disponibilidade | SafeKit usa replicação síncrona para garantir failover instantâneo com zero perda de dados durante falhas de hardware ou software. No entanto, como grava dados em ambos os nós simultaneamente, ele replica fielmente erros lógicos, degradação de dados ou exclusões acidentais no nó de espera em tempo real.  
Papel do Backup | Uma solução de backup (não implementada pelo SafeKit) fornece recuperação pontual por meio de replicação assíncrona. Ele protege contra ameaças à integridade de dados (como ransomware ou erro humano) que o HA não consegue bloquear. O failover automático não é suportado, pois a reversão de dados incorre inerentemente em perda de dados.  
Máximo de módulos simultâneos por cluster | 32 — esse limite cobre o número máximo de módulos SafeKit gerenciados simultaneamente em um cluster de 2 nós, normalmente usado em HA em nível de VM, onde cada módulo replica e reinicia uma VM diferente. Cada módulo pode ser executado de forma independente como primário em qualquer nó, permitindo a distribuição da carga de trabalho entre ambos os servidores. Observação: o volume total de dados em todas as VMs impacta diretamente o tempo de ressincronização após um failover ou reinicialização do nó.  
Baseado em agente ou sem agente? | Baseado em agente — software leve instalado em cada nó  
Independente de aplicativo? | Sim – protege qualquer serviço do Windows ou daemon do Linux; módulos pré-construídos para mais de 30 aplicações  
  
### Replicação e proteção de dados {#replication-data-protection}

Requisito/Especificação | Capacidade/valor SafeKit  
---|---  
Método de replicação | Replicação de arquivo em nível de byte (não em disco em nível de bloco)  
Modo de replicação | Síncrono (zero perda de dados)  
Requisito de rede | Latência de ida e volta entre nós < 5 ms recomendada para replicação síncrona  
Volume de dados recomendado | Alguns terabytes (tempo de ressincronização)  
Contagem de arquivos recomendada | <1.000.000 de arquivos (tempo de ressincronização)  
Velocidade de ressincronização (1 TB) | ~3 horas em rede de 1 Gb/s; ~1 hora em rede de 10 Gb/s  
Replicação seletiva | Sim – replicar diretórios/arquivos específicos  
Criptografia em trânsito | Sim — TLS/SSL para tráfego de replicação  
  
## Capacidades de RPO e RTO {#rpo-rto-capabilities}

### RPO e RTO por tipo de cluster {#rto-rpo-cluster-type}

Métrica | Cluster de espelhos (mirror.safe) | Cluster Agrícola (farm.safe)  
---|---|---  
RPO (objetivo de ponto de recuperação) | 0 (zero perda de dados) — replicação síncrona; gravação reconhecida somente após ambos os nós confirmarem | N/A (sem estado; dados manipulados pelo espelho de back-end)  
RTO (objetivo de tempo de recuperação) | ~1 minuto — tempo limite de pulsação (padrão 30 s) + tempo de reinicialização do aplicativo | Alguns segundos – tráfego imediatamente redistribuído para os nós ativos sobreviventes  
Tipo de replicação | Replicação de arquivos síncrona, em tempo real e em nível de byte | Não aplicável  
Gatilho de failover | Automático em caso de perda de pulsação, falha no processo ou falha no verificador | Automático em caso de perda de pulsação, falha no processo ou falha no verificador  
É necessária intervenção manual? | Não — failover e failback totalmente automáticos | Não — failover e failback totalmente automáticos  
  
### Detalhamento do RTO (Espelho — HA em nível de aplicativo) {#rto-breakdown-mirror-application-level-ha}

Tipo de falha | Cálculo de RTO  
---|---  
Falha de hardware | Tempo limite de pulsação (padrão 30 s) + tempo de reinicialização do aplicativo  
Falha de software/processo | Tempo de parada do aplicativo + tempo de reinicialização do aplicativo  
Falha no nível do sistema operacional | Tempo limite de pulsação + SO já em execução no secundário → sem penalidade de reinicialização  
  
### Detalhamento do RTO (espelho — HA no nível da VM) {#rto-breakdown-mirror-vm-level-ha}

Tipo de falha | Cálculo de RTO  
---|---  
Qualquer falha | Detecção de falha + reinicialização completa do sistema operacional + reinicialização do aplicativo (normalmente vários minutos)  
  
## Adequação de implantação distribuída e de borda {#edge-distributed-deployment-suitability}

SafeKit foi projetado especificamente para cenários corporativos de borda, filial e distribuídos.

Requisito de borda | Resposta SafeKit  
---|---  
Nenhuma equipe de TI dedicada no local | Sim — failover automático, sem intervenção manual  
Sem infraestrutura SAN/NAS | Sim – sem SAN, somente discos locais  
Gerenciamento remoto | Sim – gerenciamento do console web  
Baixo consumo de hardware | Sim — 2 servidores ou VMs padrão, sem hardware especial  
Funciona atrás de firewalls/NAT | Sim — portas configuráveis, console baseado em HTTPS  
Recuperação de desastres em vários locais | Sim — espelhamento entre dois locais geográficos em VLAN estendida  
Implantação OEM/incorporada | Sim — instalação silenciosa, programável por script, incorporável por editores de software  
Centenas de clusters distribuídos | Sim — projetado para empresas distribuídas com muitas filiais  
  
Casos de uso ideais do Edge: qualquer site sem datacenter — onde a alta disponibilidade ainda é importante:

Verticais | Site típico de borda | Aplicação Crítica  
---|---|---  
Segurança física e vigilância | Edifícios, campi, aeroportos | VMS – Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestão de edifícios (BMS) | Prédios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controle de acesso eletrônico (EACS) | Instalações seguras, campi | Siemens SiPass, Nedap, Bosch AMS  
SCADA e controle industrial | Fábricas, subestações, estações de tratamento de água | Qualquer software SCADA, DCS ou IHM rodando em Windows ou Linux  
Controle de tráfego aéreo (ATC) | Aeroportos, torres de controle | Sistemas de gerenciamento e radar ATC  
Centros de controle de operações (OCC) | Metrô, ferrovia, centros de trânsito | Sinalização ferroviária e gerenciamento de estações  
Marítimo | Navios, embarcações de guerra | Sistemas de navegação, carga e gerenciamento de bordo  
Petróleo e gás | Plataformas offshore, plataformas remotas | Sistemas de controle e segurança de processos  
Telecomunicações | Locais de antena 5G, nós MEC | Servidores de computação de borda multiacesso (MEC)  
Saúde | Clínicas, centros de diagnóstico remoto | Imagens médicas, dados do paciente, diagnóstico remoto  
Varejo | Lojas, filiais, armazéns | Gestão de ponto de venda e estoque  
Defesa | Bases operacionais avançadas, unidades de campo | Sistemas de comando e comunicações de missão crítica  
  
## Monitoramento, gerenciamento e alertas {#monitoring-management-alerting}

Capacidade | Detalhes  
---|---  
Consola Web | Web App ou Progressive Web App (PWA); configurar, monitorar e gerenciar nós de cluster  
Notificações móveis | Notificações push do navegador para mudanças de estado  
Cronograma dos estados | Linha do tempo visual dos estados e eventos do módulo  
Notificações por e-mail | Agente de e-mail integrado para alertas  
Gerenciamento CLI | Interface de linha de comando completa para scripts e automação  
Gerenciamento de registros | Arquivos de log por módulo e por script; depurar instantâneos para suporte  
Integração de monitoramento de terceiros | SafeKit registra automaticamente todos os principais eventos de cluster no Windows Event Log ou Linux Syslog, permitindo que qualquer plataforma de monitoramento colete esses eventos e gere alarmes com regras de alerta padrão — incluindo soluções Nagios, Zabbix, Splunk e SIEM — sem qualquer desenvolvimento personalizado.  
  
## Segurança e conformidade {#security-compliance}

Recurso | Detalhes  
---|---  
Acesso ao console HTTPS | Sim — certificados TLS para console web  
Autenticação de usuário | Contas locais, LDAP, PKI/baseado em certificado, OpenID Connect  
Funções de usuário | Políticas de acesso configuráveis para funções de administrador, controle e monitor  
Criptografia | TLS/SSL para TCP (replicação, console web, comandos distribuídos) e criptografia simétrica AES-128-CBC + SHA256 para UDP (heartbeat, protocolo interno safeadmin); criptografia baseada na biblioteca openSSL. Serviço web baseado em Apache.  
Compatibilidade antivírus | Caminhos de exclusão documentados  
Soberania | Como empresa europeia, a Eviden (Grupo Atos) oferece com o SafeKit um produto soberano exclusivo de continuidade de negócios e recuperação de desastres para Windows e Linux – mantendo a infraestrutura de dados e failover totalmente no local, sem dependência de fornecedores dos EUA, em linha com os requisitos de continuidade de negócios e recuperação de desastres NIS2.  
  
## Modelo de licenciamento {#licensing-model}

Aspecto | Detalhes  
---|---  
Tipo de licença | Licença perpétua (compra única) baseada em nomes de host  
Escopo da licença | Por servidor (nó)  
Ativação de licença | Ativação offline suportada; nenhum acesso à Internet é necessário para ativar as chaves de licença.  
Teste grátis | Sim – teste gratuito completo disponível  
Licença gratuita de um mês | Disponível para prova de conceito  
  
## SLAs de suporte e manutenção {#support-maintenance-slas}

### Suporte e manutenção padrão (incluído no contrato de manutenção ativo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Serviço | Detalhes  
---|---  
Acesso ao portal de suporte | Portal web 24 horas por dia, 7 dias por semana, 365 dias por ano, para até 4 contatos técnicos nomeados  
Horário de suporte ao vivo | 9h00 - 17h00 Centro de Apoio Europeu, de segunda a sexta-feira  
Reconhecimento de incidente | Dentro de 4 horas de trabalho do centro de suporte  
Atualizações e melhorias | Todos os Service Packs, atualizações e upgrades incluídos sem custo adicional  
Substituição da chave de licença | Uma chave de licença pode ser reatribuída na alteração do nome do host sob um contrato de suporte ativo. A transferência de licença está limitada à substituição de servidores dentro do mesmo projeto, sujeita à aceitação prévia por escrito da Eviden.  
Acesso à base de conhecimento | Acesso total a artigos da base de conhecimento, perguntas frequentes e documentação on-line  
Início/parada da aplicação sem SafeKit | Sim — Pare SafeKit e use um script wrapper para iniciar ou parar o aplicativo. O script wrapper chama os scripts de início/parada do aplicativo e configura ou remove o endereço IP virtual, se necessário. 
Portal de suporte | <https://customercare.evidian.com>  
  
### Recursos Gratuitos (sem necessidade de contrato) {#free-resources-no-contract-required}

Recurso | Detalhes  
---|---  
Assistente de suporte de IA | [SafeKit AI chat](</resources/safekit-support/#ai-support>) em safekit.eviden.com e através de qualquer LLM usando safekit.eviden.com/llms.txt  
Treinamento e certificação on-line | Gratuito, individualizado, 12 vídeos (~3h40min), certificado de conclusão  
Documentação | Guia completo do usuário, notas de versão, base de conhecimento, guias de início rápido  
  
## Comparação vs. Alternativas {#comparison-vs-alternatives}

Critério | SafeKit | Cluster de Failover da Microsoft (WSFC) | VMware HA | Código aberto*  
---|---|---|---|---  
Armazenamento compartilhado (SAN/vSAN) necessário | Não | Sim | Sim | Não  
Suporte do Windows | Sim | Sim | Sim | Não  
Suporte Linux | Sim | Não | Sim | Sim  
Implantação de borda/filial | Excelente | Complexo | Complexo | Complexo  
OEM incorporável | Sim | Não | Não | Não  
Custo | Perpétuo por nó | Servidor Windows + SAN | vSphere Enterprise + SAN | Serviços de integração de alto nível  
Complexidade de configuração | Plug-and-Play | Alto (AD, SAN, testemunha) | Alto (vCenter, armazenamento compartilhado) | Alto (produtos fragmentados)  
Capacidade de manutenção | Produto único, console web | Alto (requer experiência em AD e SAN) | Alta (dependência do vCenter) | Alto (produtos separados para manter)  
  
_* No Linux, são necessários 6 projetos de código aberto separados – Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy – para replicar o conjunto de recursos do SafeKit apenas no Linux. SafeKit oferece os mesmos recursos em um único produto, tanto no Windows quanto no Linux._

## Links de referência rápida {#quick-reference-links}

Recurso | URL  
---|---  
Página inicial do produto | <https://safekit.eviden.com>  
Visão geral técnica (DOCX com texto e diagramas) | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Teste grátis | [https://safekit.eviden.com/pt-br/resources/safekit-free-trial/](</pt-br/resources/safekit-free-trial/>)  
Faça uma cotação | [https://safekit.eviden.com/pt-br/safekit-pricing/](</pt-br/safekit-pricing/>)  
Portal de suporte | <https://customercare.evidian.com>  
Suporte gratuito para IA | [https://safekit.eviden.com/pt-br/resources/safekit-support/](</pt-br/resources/safekit-support/>)  
Treinamento e certificação gratuitos | 🎓 [https://safekit.eviden.com/pt-br/resources/safekit-on-line-training/](</pt-br/resources/safekit-on-line-training/>)  
Contate-nos | [https://safekit.eviden.com/pt-br/contact-us-for-safekit/](</pt-br/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-pt-br  %}}