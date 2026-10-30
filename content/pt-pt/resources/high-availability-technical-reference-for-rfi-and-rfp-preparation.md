---
title: "Guia de Referência Técnica SafeKit para Documentos de RFI e RFP"
canonical: "https://safekit.eviden.com/pt-pt/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Encontre informações técnicas sobre SafeKit para preparar solicitações de informações (RFI) e solicitações de propostas (RFP). Saiba mais sobre sistemas suportados, arquiteturas, tempos de recuperação, segurança, licenciamento e suporte."
category: "resources"
lang: "pt-pt"
topics: "Visão geral, Índice, Informações sobre o produto, Sistemas operacionais e plataformas suportados, Limitações de Alta Disponibilidade do SafeKit, Módulos de aplicação pré-configurados, Arquitetura e implantação, Tempos de perda e recuperação de dados (RPO e RTO), Locais remotos e implantações distribuídas, Monitoramento, gerenciamento e alertas, Segurança e conformidade, Licenciamento, Suporte e manutenção, Comparação com outras soluções, Links úteis"
---

# Referência técnica SafeKit para documentos de RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Visão geral {#overview}

Use esta página para preparar uma solicitação de informações (RFI) ou uma solicitação de propostas (RFP). Ela responde a perguntas técnicas comuns sobre o software de alta disponibilidade SafeKit . As informações ajudam as equipes de compras e os arquitetos de soluções a definir seus requisitos.

## Índice {#table-of-contents}

  1. [Informações sobre o produto](#product-identity)
  2. [Sistemas operacionais e plataformas suportados](#supported-operating-systems-platforms)
  3. [Limitações de Alta Disponibilidade do SafeKit](#safekit-ha-limitations)
  4. [Módulos de aplicação pré-configurados](#pre-built-application-modules)
  5. [Arquitetura e implantação](#architecture-deployment-model)
  6. [Tempos de perda e recuperação de dados (RPO e RTO)](#rpo-rto-capabilities)
  7. [Locais remotos e implantações distribuídas](#edge-distributed-deployment-suitability)
  8. [Monitoramento, gerenciamento e alertas](#monitoring-management-alerting)
  9. [Segurança e conformidade](#security-compliance)
  10. [Licenciamento](#licensing-model)
  11. [Suporte e manutenção](#support-maintenance-slas)
  12. [Comparação com outras soluções](#comparison-vs-alternatives)
  13. [Links úteis](#quick-reference-links)


## Informações sobre o produto {#product-identity}

Campo | Responder  
---|---  
Nome do produto | SafeKit  
Fornecedor | Eviden, parte do Grupo Atos. Anteriormente conhecida como Evidian.  
Desenvolvimento de software | Desenvolvido na França.
Categoria de produto | Software para clustering de aplicações, alta disponibilidade e recuperação de desastres.  
Versão atual | SafeKit 8.2  
Site | [https://safekit.eviden.com/pt-pt/](</pt-pt/>)  
Primeiro lançamento | 2000. Utilizado na produção há mais de 20 anos.  
  
## Sistemas operacionais e plataformas suportados {#supported-operating-systems-platforms}

sistemas operacionais Windows | Sistemas operacionais Linux | Infraestrutura e virtualização | Plataformas em nuvem  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Qualquer servidor de borda de qualquer marca<br> • VMware<br> • Microsoft Hyper-V [1]<br> • Linux KVM [1]<br> • Qualquer hipervisor<br> • Contêineres Docker<br> • Contêineres Podman  |  • Amazon Web Services (AWS) [2]<br> • Microsoft Azure [2]<br> • Google Cloud Platform (GCP) [2]<br> • Qualquer nuvem IaaS com instâncias de VM padrão   
  
**[1]** SafeKit oferece alta disponibilidade para aplicações individuais ou máquinas virtuais inteiras.

**[2]** Na nuvem, configure endereços IP virtuais no balanceador de carga da nuvem.

{{%  insert-safekit-usage-pt-pt  %}}

## Módulos de aplicação pré-configurados {#pre-built-application-modules}

SafeKit inclui módulos `.safe` prontos para uso. Existem duas maneiras de proteger aplicativos. **A alta disponibilidade de aplicativos** protege um aplicativo diretamente com um módulo mirror ou <span class="notranslate farm-term" translate="no">farm</span> . **A alta disponibilidade de máquinas virtuais** protege toda a máquina virtual com um módulo hyperv.safe ou kvm.safe .

Critério de comparação | Alta disponibilidade do aplicativo | Alta disponibilidade de máquinas virtuais  
---|---|---  
Configuração | Você precisa saber quais serviços de aplicativos reiniciar e quais pastas replicar. Você também precisa configurar o endereço IP virtual usado para failover. | Basta especificar a localização dos arquivos da máquina virtual. Você não precisa saber como os aplicativos dentro da máquina virtual funcionam. Essa abordagem protege tanto os aplicativos quanto o sistema operacional.  
Uso recomendado | Adicione alta disponibilidade diretamente a uma solução de software, sem depender de hardware específico ou de um hipervisor específico. | Gerencie diversas aplicações em várias máquinas virtuais com uma única política de alta disponibilidade.  
  
A tabela abaixo lista todos os módulos `.safe` disponíveis:

Alta disponibilidade do aplicativo | Alta disponibilidade de máquinas virtuais  
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
  
## Arquitetura e implantação {#architecture-deployment-model}

### Dois módulos de cluster: mirror.safe e farm.safe {#two-cluster-modules}

Módulo | Como funciona | Aplicações típicas  
---|---|---  
mirror.safe | Um servidor está ativo e o outro está em espera. Os arquivos são replicados de forma síncrona em nível de byte. O failover é automático. | Bancos de dados, aplicativos que armazenam estado e serviços que são executados em apenas um servidor por vez.  
farm.safe | Vários servidores estão ativos simultaneamente. SafeKit distribui o tráfego de rede entre eles e lida com a transição automática em caso de falha. | Servidores web, microsserviços sem estado, gateways de API e serviços que são executados em vários servidores simultaneamente.  
  
### Infraestrutura de cluster {#cluster-infrastructure-architecture}

Exigência | Funcionalidades SafeKit  
---|---  
É necessário armazenamento compartilhado? | Não. SafeKit usa discos locais. Ele não precisa de uma SAN ou armazenamento compartilhado.  
É necessário o Active Directory? | Não. SafeKit não requer um domínio Windows nem o Active Directory. Ele também é compatível com grupos de trabalho.  
Tamanho do cluster | 2 nós ( mirror ) ou 2+ nós ( <span class="notranslate farm-term" translate="no">farm</span> )  
Endereço IP virtual (VIP) | Para alta disponibilidade de aplicações, o endereço IP virtual é automaticamente transferido para o nó ativo através do ARP gratuito. Para alta disponibilidade de máquinas virtuais, o tráfego para o endereço IP dentro da máquina virtual é redirecionado automaticamente. Não é necessário um endereço IP virtual separado. Os nós devem compartilhar uma LAN ou uma VLAN estendida entre os sites.  
Arquitetura com três nós | SafeKit executa um cluster mirror de dois nós em uma LAN ou VLAN estendida entre os sites. Ele fornece replicação síncrona com zero perda de dados (RPO=0) e failover automático. Um produto de backup separado replica os dados de forma assíncrona para um terceiro nó em uma WAN. Esse backup permite a recuperação para um ponto anterior no tempo e oferece proteção contra ransomware.  
Objetivo da alta disponibilidade | SafeKit replica os dados de forma síncrona para ambos os nós. Isso permite a recuperação automática em caso de falha, sem perda de dados, após uma falha de hardware ou software. No entanto, erros lógicos, corrupção de dados e exclusões acidentais também são copiados imediatamente para o nó de espera.  
Finalidade dos backups | Os backups permitem restaurar dados de um ponto anterior no tempo. Um produto de backup separado, que não SafeKit , oferece essa proteção por meio de replicação assíncrona. Os backups ajudam na recuperação em casos de ransomware e erros humanos. Essa recuperação não é automática em caso de falha. Restaurar um backup antigo resulta na perda das alterações feitas após esse backup.  
Número máximo de módulos em execução simultânea | Um cluster de dois nós pode gerenciar até 32 módulos simultaneamente. Para proteção de máquinas virtuais, cada módulo replica e reinicia uma máquina virtual diferente. Cada módulo pode ser primário em qualquer um dos nós, permitindo que ambos os servidores compartilhem a carga de trabalho. O volume total de dados afeta o tempo de ressincronização após uma falha ou reinicialização de um nó.  
É necessário software em cada nó? | Sim. Um software leve é instalado em cada nó.  
Aplicações suportadas | SafeKit pode proteger qualquer serviço do Windows ou daemon do Linux. Módulos pré-configurados estão disponíveis para mais de 30 aplicações.  
  
### Replicação e proteção de dados {#replication-data-protection}

Exigência | Funcionalidades SafeKit  
---|---  
Método de replicação | SafeKit replica as alterações de arquivos em nível de byte. Ele não replica blocos de disco.  
Modo de replicação | Replicação síncrona, sem perda de dados  
Requisitos de rede | Para replicação síncrona, recomenda-se uma latência de ida e volta inferior a 5 ms entre os nós.  
Volume de dados recomendado | Alguns terabytes, para manter o tempo de ressincronização gerenciável.  
Número de arquivos recomendado | Menos de 1.000.000 de arquivos, para manter o tempo de ressincronização gerenciável.  
Hora de ressincronizar 1 TB | Aproximadamente 3 horas em uma rede de 1 Gb/s ou 1 hora em uma rede de 10 Gb/s.  
Replicação seletiva | Você pode escolher quais diretórios e arquivos replicar.  
Criptografia durante a transferência | O tráfego de replicação é criptografado com TLS/SSL.  
  
## Tempos de perda e recuperação de dados (RPO e RTO) {#rpo-rto-capabilities}

### RPO e RTO para cada tipo de cluster {#rto-rpo-cluster-type}

Métrica | Mirror ( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO (objetivo de ponto de recuperação) | Perda zero de dados. Uma gravação é confirmada somente após ambos os nós a reconhecerem. | Não aplicável a serviços sem estado. Um cluster mirror separado gerencia os dados.  
RTO (objetivo de tempo de recuperação) | Aproximadamente um minuto. Isso inclui o tempo limite <span class="notranslate farm-term" translate="no">heartbeat</span> (30 segundos por padrão) e o tempo necessário para reiniciar o aplicativo. | Alguns segundos. O tráfego é redistribuído para os nós ativos restantes.  
Tipo de replicação | Replicação de arquivos síncrona, em tempo real e em nível de byte. | Não aplicável  
Gatilho de failover | Automático quando <span class="notranslate farm-term" translate="no">heartbeats</span> param, um processo falha ou um verificador detecta uma falha. | Automático quando <span class="notranslate farm-term" translate="no">heartbeats</span> param, um processo falha ou um verificador detecta uma falha.  
Intervenção manual necessária? | Não. O failover e o failback são automáticos. | Não. O failover e o failback são automáticos.  
  
### Tempo de recuperação para aplicações protegidas por um cluster mirror {#rto-breakdown-mirror-application-level-ha}

Tipo de falha | Como é calculado o tempo de recuperação  
---|---  
Falha de hardware | Tempo limite <span class="notranslate farm-term" translate="no">Heartbeat</span> (30 segundos por padrão), seguido de reinicialização do aplicativo.  
falha de software ou processo | O momento de interromper o aplicativo, seguido pelo reinício do mesmo.  
Falha do sistema operacional | Tempo limite <span class="notranslate farm-term" translate="no">Heartbeat</span> . O sistema operacional já está em execução no servidor de espera, portanto, não é necessário reiniciá-lo.  
  
### Tempo de recuperação para máquinas virtuais protegidas por um cluster mirror {#rto-breakdown-mirror-vm-level-ha}

Tipo de falha | Como é calculado o tempo de recuperação  
---|---  
Qualquer falha | É hora de detectar a falha, reiniciar o sistema operacional da máquina virtual e reiniciar o aplicativo. Isso geralmente leva alguns minutos.  
  
## Locais remotos e implantações distribuídas {#edge-distributed-deployment-suitability}

SafeKit foi projetado para locais remotos, filiais e organizações com várias filiais.

Requisito em um local remoto | Funcionalidades SafeKit  
---|---  
Não há equipe de TI dedicada no local. | O failover é automático e não requer nenhuma ação manual.  
Sem SAN ou NAS | SafeKit utiliza discos locais e não requer armazenamento compartilhado.  
Gestão remota | Gerencie o cluster através de um console web.  
Hardware limitado | Dois servidores padrão ou máquinas virtuais são suficientes. Não é necessário nenhum hardware especial.  
Firewalls e tradução de endereços de rede (NAT) | É possível configurar as portas. O console web utiliza HTTPS.  
Recuperação de desastres entre locais | Um cluster mirror pode conectar dois sites através de uma VLAN estendida entre eles.  
Integração por editores de software | Os desenvolvedores de software podem incluir SafeKit em seus produtos. A instalação pode ser executada sem interação do usuário e pode ser automatizada com scripts.  
Centenas de aglomerados em vários locais. | SafeKit foi projetado para organizações com muitas filiais.  
  
Os seguintes sites precisam de alta disponibilidade mesmo quando não possuem um centro de dados:

Indústria | Local típico | Aplicações críticas  
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
Console da Web | Configure, monitore e gerencie nós de cluster por meio de um aplicativo web ou um aplicativo web progressivo (PWA).  
Notificações móveis | Receba notificações do navegador quando um módulo mudar de estado.  
Linha do tempo | Veja as alterações de status e eventos do módulo em ordem cronológica.  
Notificações por e-mail | Um agente de e-mail integrado envia alertas.  
Interface de linha de comando | Utilize a interface de linha de comando para escrever scripts e automatizar tarefas.  
Gerenciamento de logs | Cada módulo e script possui seus próprios arquivos de log. <span class="notranslate farm-term" translate="no">snapshots</span> dos módulos ajudam a equipe de suporte a investigar problemas.  
Integração com ferramentas de monitoramento | SafeKit registra eventos importantes do cluster no Log de Eventos do Windows ou no Syslog do Linux. Ferramentas de monitoramento podem coletar esses eventos e disparar alertas com regras padrão. Isso funciona com Nagios, Zabbix, Splunk e ferramentas SIEM sem necessidade de desenvolvimento personalizado.  
  
## Segurança e conformidade {#security-compliance}

Recurso | Detalhes  
---|---  
HTTPS | Os certificados TLS protegem o acesso ao console da web.  
Autenticação do usuário | Contas locais, LDAP, certificados (PKI) e OpenID Connect.  
Funções do usuário | Configure políticas de acesso para administração, controle e monitoramento.  
Criptografia | O tráfego TCP utiliza TLS/SSL para replicação, console web e comandos distribuídos. O tráfego UDP utiliza criptografia AES-128-CBC com SHA256 para <span class="notranslate farm-term" translate="no">heartbeats</span> e o protocolo interno safeadmin. SafeKit utiliza a biblioteca OpenSSL para criptografia e o Apache para o serviço web.  
Antivírus | A documentação lista os caminhos a serem excluídos das verificações de antivírus.  
Soberania | SafeKit é desenvolvido na França pela Eviden, parte do Grupo Atos. Ele protege aplicativos Windows e Linux, mantendo seus dados e servidores em suas instalações. SafeKit pode ajudar a atender aos requisitos da Diretiva Europeia NIS2 para continuidade de negócios e recuperação de desastres.
  
## Licenciamento {#licensing-model}

Aspecto | Detalhes  
---|---  
Tipo de licença | Uma licença perpétua é adquirida uma única vez e está vinculada a um nome de host.  
Âmbito da licença | Uma licença por servidor (nó)  
Ativação de licença | As chaves de licença podem ser ativadas sem acesso à internet.  
Teste grátis | O período de teste gratuito inclui todas as funcionalidades.  
Licença gratuita por um mês | Disponível para testar uma prova de conceito.  
  
## Suporte e manutenção {#support-maintenance-slas}

### Suporte e manutenção padrão com um contrato de manutenção ativo. {#standard-support-maintenance-included-with-active-maintenance-contract}

Serviço | Detalhes  
---|---  
Acesso ao portal de suporte | O portal web está disponível a qualquer hora, todos os dias do ano, para até quatro contatos técnicos nomeados.  
Horário de suporte ao vivo | De segunda a sexta-feira, das 9h às 17h, no Centro de Apoio Europeu.  
Confirmação do incidente | Dentro de quatro horas úteis do Centro de Suporte  
Atualizações e melhorias | Todos os pacotes de serviços, atualizações e upgrades estão incluídos sem custo adicional.  
Substituição da chave de licença | Com um contrato de suporte ativo, uma chave de licença pode ser reatribuída quando o nome do host for alterado. A transferência é limitada à substituição de um servidor dentro do mesmo projeto. É necessária aprovação prévia por escrito da Eviden.  
Acesso à base de conhecimento | Acesso completo a artigos da base de conhecimento, perguntas frequentes e documentação online.  
Procedimento de emergência | SafeKit fornece um script auxiliar para iniciar ou parar um aplicativo sem usar os recursos de alta disponibilidade do SafeKit . Esse script chama os scripts de inicialização e parada do aplicativo. Ele também adiciona ou remove o endereço IP virtual quando necessário.  
Portal de suporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos sem contrato de suporte {#free-resources-no-contract-required}

Recurso | Detalhes  
---|---  
assistente de suporte de IA | Utilize [o chat de IA SafeKit](</pt-pt/resources/safekit-support/#ai-support>) em safekit.eviden.com.   
Treinamento e certificação online | [Aprenda no seu próprio ritmo](</pt-pt/resources/safekit-on-line-training/>) com vídeos gratuitos com duração total de aproximadamente 4 horas. Receba um certificado ao concluir o treinamento.  
Documentação | Guia do usuário, notas de versão, base de conhecimento e guias de instalação rápida [aqui.](</pt-pt/resources/safekit-free-trial/>)  
  
## Comparação com outras soluções {#comparison-vs-alternatives}

Critério | SafeKit | Cluster de Failover da Microsoft (WSFC) | VMware HA | Código aberto [1]  
---|---|---|---|---  
Armazenamento compartilhado (SAN/vSAN) necessário | Não | Sim | Sim | Não  
Suporte do Windows | Sim | Sim | Sim | Não  
Suporte para Linux | Sim | Não | Sim | Sim  
Implantação em locais remotos | Excelente | Complexo | Complexo | Complexo  
OEM | Sim | Não | Não | Não  
Custo | Licença perpétua por nó | Servidor Windows e SAN | vSphere Enterprise e SAN | Serviços avançados de integração  
Complexidade de configuração | Pronto para configurar e usar. | Alto nível de exigência: configuração do Active Directory, SAN e de testemunha. | Alto: Configuração do vCenter e do armazenamento compartilhado | Alto: vários produtos separados para configurar.  
Administração | Um produto gerenciado por meio de um console web | Alto nível de conhecimento em Active Directory e SAN. | Alta: dependência do vCenter | Alto: vários produtos separados para manutenção.  
  
**[1]** No Linux, são necessários seis projetos de código aberto separados para fornecer o mesmo conjunto de recursos: Corosync, Pacemaker, DRBD, Keepalived, STONITH e HAProxy. SafeKit fornece esses recursos em um único produto para Windows e Linux.

## Links úteis {#quick-reference-links}

Recurso | URL  
---|---  
Página inicial do produto | [https://safekit.eviden.com/pt-pt/](</pt-pt/>)  
Visão geral técnica (documento Word com texto e diagramas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Teste grátis | [https://safekit.eviden.com/pt-pt/resources/safekit-free-trial/](</pt-pt/resources/safekit-free-trial/>)  
Solicite um orçamento | [https://safekit.eviden.com/pt-pt/safekit-pricing/](</pt-pt/safekit-pricing/>)  
Portal de suporte | <https://customercare.evidian.com>  
Suporte gratuito de IA | [https://safekit.eviden.com/pt-pt/resources/safekit-support/](</pt-pt/resources/safekit-support/>)  
Treinamento e certificação gratuitos | [https://safekit.eviden.com/pt-pt/resources/safekit-on-line-training/](</pt-pt/resources/safekit-on-line-training/>)  
Contate-nos | [https://safekit.eviden.com/pt-pt/contact-us-for-safekit/](</pt-pt/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-pt-pt  %}}
