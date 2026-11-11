---
title: "Referência Técnica SafeKit para Documentos de RFI e RFP"
canonical: "https://safekit.eviden.com/pt-br/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Encontre informações técnicas sobre SafeKit para preparar solicitações de informações (RFI) e propostas (RFP). Saiba mais sobre sistemas compatíveis, arquiteturas, tempos de recuperação, segurança, licenciamento e suporte."
category: "resources"
lang: "pt-br"
topics: "Visão geral, Índice, Informações do produto, Sistemas operacionais e plataformas compatíveis, Limitações SafeKit de Alta Disponibilidade, Módulos de aplicativos pré-configurados, Arquitetura e implantação, Perda de dados e tempos de recuperação (RPO e RTO), Locais remotos e implantações distribuídas, Monitoramento e alertas, Segurança e conformidade, Licenciamento, Suporte e manutenção, Comparação com outras soluções, Links úteis"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 50 expressions"
---

# Referência técnica SafeKit para documentos RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Visão geral {#overview}

Use esta página para preparar um pedido de informações (RFI) ou um pedido de propostas (RFP). Ela responde a perguntas técnicas comuns sobre o software de alta disponibilidade SafeKit. As informações ajudam as equipes de compras e os arquitetos de soluções a definir seus requisitos.

## Índice {#table-of-contents}

  1. [Informações do produto](#product-identity)
  2. [Sistemas operacionais e plataformas compatíveis](#supported-operating-systems-platforms)
  3. [Limitações SafeKit de Alta Disponibilidade](#safekit-ha-limitations)
  4. [Módulos de aplicativos pré-configurados](#pre-built-application-modules)
  5. [Arquitetura e implantação](#architecture-deployment-model)
  6. [Perda de dados e tempos de recuperação (RPO e RTO)](#rpo-rto-capabilities)
  7. [Locais remotos e implantações distribuídas](#edge-distributed-deployment-suitability)
  8. [Monitoramento e alertas](#monitoring-management-alerting)
  9. [Segurança e conformidade](#security-compliance)
  10. [Licenciamento](#licensing-model)
  11. [Suporte e manutenção](#support-maintenance-slas)
  12. [Comparação com outras soluções](#comparison-vs-alternatives)
  13. [Links úteis](#quick-reference-links)


## Informações do produto {#product-identity}

Tópico | Detalhes  
---|---  
Nome do produto | SafeKit  
Fornecedor | Eviden, parte do Grupo Atos. Anteriormente, Evidian.  
País de desenvolvimento | França  
Categoria do produto | Software para agrupamento de aplicações, alta disponibilidade e recuperação de desastres  
Versão atual | SafeKit 8.2  
Site | [https://safekit.eviden.com](/pt-br/)  
Primeira versão | 2000. Usado na produção há mais de 20 anos.  
  
## Sistemas operacionais e plataformas compatíveis {#supported-operating-systems-platforms}

Sistemas operacionais Windows | Sistemas operacionais Linux | Infraestrutura e virtualização | Plataformas de nuvem  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64)  |  • Qualquer servidor de borda de qualquer marca <br> • VMware <br> • Microsoft Hyper-V [1] <br> • Linux KVM [1] <br> • Qualquer hipervisor <br> • Contêineres Docker <br> • Contêineres Podman  |  • Amazon Web Services (AWS) [2] <br> • Microsoft Azure [2] <br> • Plataforma Google Cloud (GCP) [2] <br> • Qualquer nuvem IaaS com instâncias de VM padrão   
  
**[1]** SafeKit oferece alta disponibilidade para aplicações individuais ou máquinas virtuais inteiras.

**[2]** Na nuvem, configure endereços IP virtuais no balanceador de carga da nuvem.

{{%  insert-safekit-usage-pt-br  %}}

## Módulos de aplicativos pré-configurados {#pre-built-application-modules}

SafeKit inclui módulos `.safe` prontos para uso. Existem duas maneiras de proteger aplicativos. **A alta disponibilidade de aplicativos** protege um aplicativo diretamente com um módulo mirror ou <span class="notranslate farm-term" translate="no">farm</span>. **A alta disponibilidade de máquinas virtuais** protege toda a máquina virtual com um módulo hyperv.safe ou kvm.safe.

Critério de comparação | Alta disponibilidade da aplicação | Alta disponibilidade de máquinas virtuais  
---|---|---  
Configuração | Você precisa saber quais serviços de aplicativos reiniciar e quais pastas replicar. Você também precisa configurar o endereço IP virtual usado para o failover. | Você só precisa especificar o local dos arquivos da máquina virtual. Você não precisa saber como os aplicativos dentro da máquina virtual funcionam. Essa abordagem protege os aplicativos e o sistema operacional juntos.  
Uso recomendado | Adicione alta disponibilidade diretamente a uma solução de software, sem depender de hardware específico ou de um hipervisor específico. | Gerencie vários aplicativos em várias máquinas virtuais com uma única política de alta disponibilidade.  
  
A tabela abaixo lista todos os módulos `.safe` disponíveis:

Alta disponibilidade da aplicação | Alta disponibilidade de máquinas virtuais  
---|---  
Novo aplicativo Windows — mirror.safe | Máquina virtual Hyper-V — hyperv.safe (Windows)  
Novo aplicativo Linux — mirror.safe | Máquina virtual KVM — kvm.safe (Linux)  
Balanceamento de carga Windows — farm.safe | Contêiner Docker — mirror.safe (Linux)  
Balanceamento de carga Linux — farm.safe | Contêiner Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows e Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows e Linux) | Bosch BIS — hyperv.safe (Windows)  
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
Nuvem (AWS, Azure, GCP, genérica) — mirror.safe/farm.safe |   
  
## Arquitetura e implantação {#architecture-deployment-model}

### Dois módulos de cluster: mirror.safe e farm.safe {#two-cluster-modules}

Módulo | Princípio de funcionamento | Aplicações típicas  
---|---|---  
mirror.safe | Um servidor está ativo e o outro está em espera. Os arquivos são replicados de forma síncrona, ao nível de byte. A recuperação de falhas é automática. | Bancos de dados, aplicativos que armazenam estado e serviços que são executados em apenas um servidor por vez  
farm.safe | Vários servidores ficam ativos ao mesmo tempo. SafeKit distribui o tráfego de rede entre eles e lida com o failover automaticamente. | Servidores web, microsserviços sem estado, gateways de API e serviços que são executados em vários servidores ao mesmo tempo  
  
### Infraestrutura de cluster {#cluster-infrastructure-architecture}

Requisito | Capacidades SafeKit  
---|---  
É necessário ter armazenamento compartilhado? | Não. SafeKit usa discos locais. Ele não precisa de uma SAN ou de armazenamento compartilhado.  
Active Directory é necessário? | Não. SafeKit não exige um domínio Windows ou o Active Directory. Ele também é compatível com grupos de trabalho.  
Número de nós em um cluster | 2 nós (mirror) ou 2+ nós (<span class="notranslate farm-term" translate="no">farm</span>)  
Endereço IP virtual (VIP) | Para alta disponibilidade do aplicativo, o endereço IP virtual é movido automaticamente para o nó ativo por meio do ARP gratuito. Para alta disponibilidade da máquina virtual, o tráfego para o endereço IP dentro da máquina virtual é redirecionado automaticamente. Não é necessário um endereço IP virtual separado. Os nós devem compartilhar uma LAN ou uma VLAN estendida entre os sites.  
Arquitetura com três nós | SafeKit executa um cluster mirror de dois nós em uma LAN ou em uma VLAN estendida entre locais. Ele fornece replicação síncrona com perda zero de dados (RPO = 0) e failover automático. Um produto de backup separado replica dados de forma assíncrona para um terceiro nó por meio de uma WAN. Esse backup permite a recuperação para um ponto anterior no tempo e oferece proteção contra ransomware.  
Objetivo da alta disponibilidade | SafeKit replica os dados de forma síncrona para ambos os nós. Isso permite o failover automático sem perda de dados após uma falha de hardware ou software. No entanto, erros lógicos, corrupção de dados e exclusões acidentais também são copiados imediatamente para o nó de espera.  
Finalidade dos backups | Os backups permitem restaurar dados de um ponto anterior no tempo. Um produto de backup separado, não SafeKit, fornece essa proteção por meio de replicação assíncrona. Os backups ajudam a recuperar de ransomware e erros humanos. Essa recuperação não é uma comutação automática. A restauração de um backup mais antigo perde as alterações feitas após esse backup.  
Módulos máximos em execução ao mesmo tempo | Um cluster de dois nós pode gerenciar até 32 módulos ao mesmo tempo. Para proteção de máquina virtual, cada módulo replica e reinicia uma máquina virtual diferente. Cada módulo pode ser primário em qualquer nó, de modo que ambos os servidores possam compartilhar a carga de trabalho. O volume total de dados afeta o tempo de ressincronização após o failover ou a reinicialização de um nó.  
O software está instalado em cada nó? | Sim. Um software leve é instalado em cada nó.  
Aplicações suportadas | SafeKit pode proteger qualquer serviço Windows ou daemon Linux. Módulos pré-configurados estão disponíveis para mais de 30 aplicações.  
  
### Replicação e proteção de dados {#replication-data-protection}

Requisito | Capacidades SafeKit  
---|---  
Método de replicação | SafeKit replica as alterações de arquivos no nível de byte. Ele não replica blocos de disco.  
Modo de replicação | Replicação síncrona, com perda de dados zero  
Requisito de rede | Para replicação síncrona, recomenda-se uma latência de ida e volta inferior a 5 ms entre os nós.  
Volume de dados recomendado | Alguns terabytes, para manter o tempo de ressincronização controlável  
Número de arquivos recomendado | Menos de 1.000.000 de arquivos, para manter o tempo de ressincronização gerenciável  
Tempo de ressincronização para 1 TB | Cerca de 3 horas em uma rede de 1 Gb/s ou 1 hora em uma rede de 10 Gb/s  
Replicação seletiva | Você pode escolher quais diretórios e arquivos replicar.  
Criptografia durante a transferência | O tráfego de replicação é criptografado com TLS/SSL.  
  
## Perda de dados e tempos de recuperação (RPO e RTO) {#rpo-rto-capabilities}

### RPO e RTO para cada tipo de cluster {#rto-rpo-cluster-type}

Métrica | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO (objetivo do ponto de recuperação) | Perda de dados zero. Uma operação de gravação é concluída somente quando ambos os nós gravam os dados. | Não aplicável a serviços sem estado. Os dados são gerenciados por um cluster mirror separado.  
RTO (objetivo de tempo de recuperação) | Cerca de um minuto. Isso inclui o tempo limite de <span class="notranslate farm-term" translate="no">heartbeat</span> (30 segundos por padrão) e o tempo para reiniciar o aplicativo. | Alguns segundos. O tráfego é redistribuído para os nós ativos restantes.  
Tipo de replicação | Replicação de arquivos síncrona, em tempo real e em nível de byte | Não aplicável  
Gatilho de failover | O failover é iniciado automaticamente quando as mensagens <span class="notranslate farm-term" translate="no">heartbeat</span> param, quando um processo falha ou quando um verificador detecta uma falha | O failover é iniciado automaticamente quando as mensagens <span class="notranslate farm-term" translate="no">heartbeat</span> param, quando um processo falha ou quando um verificador detecta uma falha  
É necessária intervenção manual? | Não. A comutação por falha e o retorno automático são automáticos. | Não. A comutação por falha e o retorno automático são automáticos.  
  
### Tempo de recuperação para aplicações protegidas por um cluster mirror {#rto-breakdown-mirror-application-level-ha}

Tipo de falha | Como o tempo de recuperação é calculado  
---|---  
Falha de hardware | <span class="notranslate farm-term" translate="no">heartbeat</span> tempo limite (30 segundos por padrão), seguido pela reinicialização do aplicativo  
Falha no software ou no processo | O tempo para parar o aplicativo, seguido pelo reinício do aplicativo  
Falha no sistema operacional | O tempo limite de <span class="notranslate farm-term" translate="no">heartbeat</span>, seguido pela reinicialização do aplicativo. O servidor em espera não precisa ser reiniciado porque seu sistema operacional já está em execução.  
  
### Tempo de recuperação para máquinas virtuais protegidas por um cluster mirror {#rto-breakdown-mirror-vm-level-ha}

Tipo de falha | Como o tempo de recuperação é calculado  
---|---  
Todos os tipos de falha | Tempo para detetar a falha, reiniciar o sistema operativo da máquina virtual e reiniciar a aplicação. Isto demora geralmente vários minutos.  
  
## Locais remotos e implantações distribuídas {#edge-distributed-deployment-suitability}

SafeKit foi projetado para locais remotos, filiais e organizações com muitas unidades.

Requisito em um local remoto | Capacidades SafeKit  
---|---  
Não há equipe de TI dedicada no local | A recuperação de falhas é automática e não requer nenhuma ação manual.  
Sem armazenamento compartilhado (SAN ou NAS) | Apenas discos locais são necessários. O armazenamento compartilhado não é necessário.  
Gerenciamento remoto | Gerencie o cluster por meio de um console da web.  
Hardware limitado | Dois servidores padrão ou máquinas virtuais são suficientes. Não é necessário nenhum hardware especial.  
Firewalls e tradução de endereços de rede (NAT) | As portas podem ser configuradas. O console da web usa HTTPS.  
Recuperação de desastres entre sites | Um cluster mirror pode conectar dois sites por meio de uma VLAN estendida entre eles.  
Integração por editoras de software | Os editores de software podem incluir SafeKit em seus produtos. A instalação pode ser executada sem interação do usuário e pode ser automatizada com scripts.  
Centenas de clusters SafeKit em vários locais | SafeKit foi projetado para organizações com muitas filiais.  
  
Os sites a seguir precisam de alta disponibilidade, mesmo quando não possuem um data center:

Indústria | Site típico | Aplicações críticas  
---|---|---  
Segurança física e vigilância | Edifícios, campi, aeroportos | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestão de edifícios (BMS) | Edifícios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controle de acesso eletrônico (EACS) | Instalações e campi seguros | Siemens SiPass, Nedap, Bosch AMS  
SCADA e controle industrial | Fábricas, subestações, estações de tratamento de água | Qualquer software SCADA, DCS ou HMI executado no Windows ou Linux  
Controle de tráfego aéreo (ATC) | Aeroportos, torres de controle | Sistemas de gestão de tráfego aéreo e de radar  
Centros de controle de operações (OCC) | Metrô, ferrovia, centros de transporte | Sinalização ferroviária e gestão de estações  
Marítimo | Navios, embarcações navais | Sistemas de navegação, de carga e de gestão de bordo  
Petróleo e gás | Plataformas offshore, sondas remotas | Sistemas de controle de processo e segurança  
Telecomunicações | Locais de antenas 5G, nós MEC | Servidores de computação de borda multiacesso (MEC)  
Saúde | Clínicas, centros de diagnóstico remoto | Imagens médicas, dados do paciente, diagnósticos remotos  
Varejo | Lojas, filiais, armazéns | Gestão de ponto de venda e de estoque  
Defesa | Bases de operações avançadas, unidades de campo | Sistemas de comando e comunicações de missão crítica  
  
## Monitoramento e alertas {#monitoring-management-alerting}

Recurso | Detalhes  
---|---  
Console da Web | Configure, monitore e gerencie os nós do cluster por meio de um aplicativo da web ou de um aplicativo da web progressivo (PWA).  
Notificações do celular | Receba notificações do navegador quando um módulo mudar de estado.  
Linha do tempo | Veja as alterações de status e os eventos do módulo em ordem cronológica.  
Notificações por e-mail | Um agente de e-mail integrado envia alertas.  
Interface de linha de comando | Use a interface de linha de comando para escrever scripts e automatizar tarefas.  
Gerenciamento de logs | Cada módulo e script tem seus próprios arquivos de log. A equipe de suporte usa os <span class="notranslate farm-term" translate="no">snapshots</span> de módulos para investigar problemas.  
Integração com ferramentas de monitoramento | SafeKit registra os principais eventos do cluster no Log de Eventos Windows ou no Syslog Linux. As ferramentas de monitoramento podem coletar esses eventos e acionar alertas com regras padrão. Isso funciona com Nagios, Zabbix, Splunk e ferramentas SIEM sem desenvolvimento personalizado.  
  
## Segurança e conformidade {#security-compliance}

Recurso | Detalhes  
---|---  
HTTPS | O console da web usa HTTPS com certificados TLS.  
Autenticação de usuário | Contas locais, LDAP, certificados (PKI) e OpenID Connect  
Funções do usuário | Configure as políticas de acesso para administração, controle e monitoramento.  
Criptografia | O tráfego TCP usa TLS/SSL para replicação, o console da web e comandos distribuídos. O tráfego UDP usa criptografia AES-128-CBC com SHA256 para mensagens <span class="notranslate farm-term" translate="no">heartbeat</span> e para o protocolo safeadmin interno. A biblioteca OpenSSL fornece criptografia. O serviço da web é executado no Apache.  
Antivírus | A documentação lista os caminhos a serem excluídos das varreduras do antivírus.  
Soberania | SafeKit é desenvolvido na França pela Eviden, parte do Grupo Atos. Ele protege aplicações Windows e Linux, mantendo seus dados e servidores em suas instalações. SafeKit pode ajudar a atender aos requisitos da Diretiva Europeia NIS2 para continuidade de negócios e recuperação de desastres.
  
## Licenciamento {#licensing-model}

Tópico | Detalhes  
---|---  
Tipo de licença | Uma licença perpétua é comprada uma única vez e está vinculada a um nome de host.  
Escopo da licença | Uma licença por servidor (nó)  
Ativação da licença | As chaves de licença podem ser ativadas sem acesso à internet.  
Teste grátis | A versão de teste gratuita inclui todos os recursos.  
Licença gratuita por um mês | Disponível para testar uma prova de conceito  
  
## Suporte e manutenção {#support-maintenance-slas}

### Suporte e manutenção padrão com um contrato de manutenção ativo {#standard-support-maintenance-included-with-active-maintenance-contract}

Serviço | Detalhes  
---|---  
Acesso ao portal de suporte | O portal da web está disponível a qualquer momento, todos os dias do ano, para até quatro contatos técnicos nomeados.  
Horário de atendimento | De segunda a sexta-feira, das 09:00 às 17:00, no Centro de Suporte Europeu  
Confirmação de recebimento do incidente | No prazo de quatro horas úteis. As horas úteis são as horas de atendimento ao vivo do Centro de Suporte.  
Atualizações e melhorias | Todos os pacotes de serviços, atualizações e upgrades estão incluídos sem custo adicional.  
Substituição da chave de licença | Com um contrato de suporte ativo, uma chave de licença pode ser reatribuída quando o nome do host é alterado. A transferência é limitada à substituição de um servidor dentro do mesmo projeto. É necessária a aprovação prévia por escrito da Eviden.  
Acesso à base de conhecimento | Acesso total aos artigos da base de conhecimento, perguntas frequentes e documentação online  
Procedimento de emergência | SafeKit fornece um script wrapper para iniciar ou parar uma aplicação sem usar os recursos de alta disponibilidade do SafeKit. Este script chama os scripts de início e parada da aplicação. Ele também adiciona ou remove o endereço IP virtual quando necessário.  
Portal de suporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos sem contrato de suporte {#free-resources-no-contract-required}

Recurso gratuito | Detalhes  
---|---  
Assistente de IA para suporte | Use [o chat de IA SafeKit](</pt-br/resources/safekit-support/#ai-support>) em safekit.eviden.com.   
Treinamento e certificação online | [Aprenda no seu próprio ritmo](/pt-br/resources/safekit-on-line-training/) com vídeos gratuitos que duram cerca de 4 horas no total. Receba um certificado ao concluir o treinamento.  
Documentação | Guia do usuário, notas de versão, base de conhecimento e guias de instalação rápida [aqui](/pt-br/resources/safekit-free-trial/)  
  
## Comparação com outras soluções {#comparison-vs-alternatives}

Critério | SafeKit | Cluster de Failover Microsoft (WSFC) | VMware HA | Código Aberto [1]  
---|---|---|---|---  
É necessário ter armazenamento compartilhado (SAN/vSAN) | Não | Sim | Sim | Não  
Suporte Windows | Sim | Sim | Sim | Não  
Suporte Linux | Sim | Não | Sim | Sim  
Implantação em locais remotos | Excelente | Complexo | Complexo | Complexo  
OEM | Sim | Não | Não | Não  
Custo | Licença perpétua por nó | Windows Server e SAN | vSphere Enterprise e SAN | Serviços de integração avançados  
Complexidade da configuração | Baixo: um produto para instalar e configurar | Alto: Active Directory, SAN e configuração de testemunha | Alto: configuração do vCenter e do armazenamento compartilhado | Alto: vários produtos separados para configurar  
Administração | Um produto gerenciado por meio de um console da web | Alto: requer experiência em Active Directory e SAN | Alto: depende do vCenter | Alto: vários produtos separados para manter  
  
**[1]** No Linux, são necessários seis projetos de código aberto separados para fornecer o mesmo conjunto de recursos: Corosync, Pacemaker, DRBD, Keepalived, STONITH e HAProxy. SafeKit fornece esses recursos em um único produto para Windows e Linux.

## Links úteis {#quick-reference-links}

Link | URL  
---|---  
Página inicial do produto | [https://safekit.eviden.com](/pt-br/)  
Visão geral técnica (documento do Word com texto e diagramas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Teste grátis | [https://safekit.eviden.com/resources/safekit-free-trial/](</pt-br/resources/safekit-free-trial/>)  
Peça um orçamento | [https://safekit.eviden.com/safekit-pricing/](</pt-br/safekit-pricing/>)  
Portal de suporte | <https://customercare.evidian.com>  
Suporte de IA gratuito | [https://safekit.eviden.com/resources/safekit-support/](</pt-br/resources/safekit-support/>)  
Treinamento e certificação gratuitos | [https://safekit.eviden.com/resources/safekit-on-line-training/](</pt-br/resources/safekit-on-line-training/>)  
Fale conosco | [https://safekit.eviden.com/contact-us-for-safekit/](</pt-br/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-pt-br  %}}