---
title: "Referência Técnica SafeKit para Documentos RFI e RFP"
canonical: "https://safekit.eviden.com/pt-pt/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Encontre informações técnicas sobre SafeKit para preparar pedidos de informação (RFI) e pedidos de proposta (RFP). Saiba mais sobre os sistemas suportados, arquiteturas, tempos de recuperação, segurança, licenciamento e suporte."
category: "resources"
lang: "pt-pt"
topics: "Visão Geral, Índice, Informações do produto, Sistemas operativos e plataformas suportados, Limitações de Alta Disponibilidade SafeKit, Módulos de aplicação pré-configurados, Arquitetura e implementação, Perda de dados e tempos de recuperação (RPO e RTO), Locais remotos e implementações distribuídas, Monitorização e alertas, Segurança e conformidade, Licenciamento, Apoio e manutenção, Comparação com outras soluções, Ligações úteis"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 50 expressions"
---

# Referência técnica SafeKit para documentos RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Visão Geral {#overview}

Utilize esta página para preparar um pedido de informações (RFI) ou um pedido de propostas (RFP). Responde a perguntas técnicas comuns sobre o software de alta disponibilidade SafeKit. As informações ajudam as equipas de aquisição e os arquitetos de soluções a definir os seus requisitos.

## Índice {#table-of-contents}

  1. [Informações do produto](#product-identity)
  2. [Sistemas operativos e plataformas suportados](#supported-operating-systems-platforms)
  3. [Limitações de Alta Disponibilidade SafeKit](#safekit-ha-limitations)
  4. [Módulos de aplicação pré-configurados](#pre-built-application-modules)
  5. [Arquitetura e implementação](#architecture-deployment-model)
  6. [Perda de dados e tempos de recuperação (RPO e RTO)](#rpo-rto-capabilities)
  7. [Locais remotos e implementações distribuídas](#edge-distributed-deployment-suitability)
  8. [Monitorização e alertas](#monitoring-management-alerting)
  9. [Segurança e conformidade](#security-compliance)
  10. [Licenciamento](#licensing-model)
  11. [Apoio e manutenção](#support-maintenance-slas)
  12. [Comparação com outras soluções](#comparison-vs-alternatives)
  13. [Ligações úteis](#quick-reference-links)


## Informações do produto {#product-identity}

Assunto | Detalhes  
---|---  
Nome do produto | SafeKit  
Fornecedor | Eviden, parte do Grupo Atos. Anteriormente Evidian.  
País de desenvolvimento | França  
Categoria de produto | Software para agrupamento de aplicações, alta disponibilidade e recuperação de desastres  
Versão atual | SafeKit 8.2  
Página Web | [https://safekit.eviden.com](/pt-pt/)  
Primeira edição | 2000. Usado em produção há mais de 20 anos.  
  
{{%  insert-supported-os-pt-pt  %}}

{{%  insert-safekit-usage-pt-pt  %}}

## Módulos de aplicação pré-configurados {#pre-built-application-modules}

SafeKit inclui módulos `.safe` prontos a usar. Existem duas formas de proteger aplicações. **A alta disponibilidade de aplicações** protege uma aplicação diretamente com um módulo mirror ou <span class="notranslate farm-term" translate="no">farm</span>. **A alta disponibilidade de máquinas virtuais** protege toda a máquina virtual com um módulo hyperv.safe ou kvm.safe.

Critério de comparação | Alta disponibilidade da aplicação | Alta disponibilidade de máquinas virtuais  
---|---|---  
Configuração | É preciso saber quais serviços de aplicação reiniciar e quais pastas replicar. É preciso também configurar o endereço IP virtual usado para o failover. | Apenas precisa de especificar a localização dos ficheiros da máquina virtual. Não precisa de saber como as aplicações dentro da máquina virtual funcionam. Esta abordagem protege as aplicações e o sistema operativo em conjunto.  
Uso recomendado | Adicione alta disponibilidade diretamente a uma solução de software, sem depender de hardware específico ou de um hipervisor específico. | Gerencie várias aplicações em várias máquinas virtuais com uma única política de alta disponibilidade.  
  
A tabela abaixo lista todos os módulos `.safe` disponíveis:

Alta disponibilidade da aplicação | Alta disponibilidade de máquinas virtuais  
---|---  
Nova aplicação Windows — mirror.safe | Máquina Virtual Hyper-V — hyperv.safe (Windows)  
Nova aplicação Linux — mirror.safe | Máquina Virtual KVM — kvm.safe (Linux)  
Balanceamento de carga Windows — farm.safe | Contentor Docker — mirror.safe (Linux)  
Balanceamento de carga Linux — farm.safe | Recipiente Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows e Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows e Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows e Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows e Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows e Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows e Linux) | Suite de Siemens Siveillance — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows e Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Nuvem (AWS, Azure, GCP, genérica) — mirror.safe/farm.safe |   
  
## Arquitetura e implementação {#architecture-deployment-model}

### Dois módulos de cluster: mirror.safe e farm.safe {#two-cluster-modules}

Módulo | Princípio de funcionamento | Aplicações típicas  
---|---|---  
mirror.safe | Um servidor está ativo e o outro está em modo de espera. Os ficheiros são replicados de forma síncrona ao nível do byte. A comutação de falha é automática. | Bases de dados, aplicações que armazenam estado e serviços que funcionam apenas num servidor de cada vez  
farm.safe | Vários servidores estão ativos em simultâneo. SafeKit distribui o tráfego de rede entre eles e gere a comutação de falha automaticamente. | Servidores web, microsserviços sem estado, gateways de API e serviços que são executados em vários servidores ao mesmo tempo  
  
### Infraestrutura do cluster {#cluster-infrastructure-architecture}

Requisito | Funcionalidades SafeKit  
---|---  
É necessário armazenamento partilhado? | Não. SafeKit utiliza discos locais. Não necessita de uma SAN ou de armazenamento partilhado.  
É necessário o Active Directory? | Não. SafeKit não requer um domínio Windows ou Active Directory. Também suporta grupos de trabalho.  
Número de nós num cluster | 2 nós (mirror) ou 2+ nós (<span class="notranslate farm-term" translate="no">farm</span>)  
Endereço IP virtual (VIP) | Para alta disponibilidade da aplicação, o endereço IP virtual move-se automaticamente para o nó ativo através de ARP Gratuito. Para alta disponibilidade da máquina virtual, o tráfego para o endereço IP dentro da máquina virtual é redirecionado automaticamente. Não é necessário um endereço IP virtual separado. Os nós devem partilhar uma LAN ou uma VLAN estendida entre locais.  
Arquitetura com três nós | SafeKit executa um cluster mirror de dois nós numa LAN ou numa VLAN estendida entre locais. Fornece replicação síncrona com perda de dados zero (RPO = 0) e failover automático. Um produto de backup separado replica dados de forma assíncrona para um terceiro nó através de uma WAN. Esta cópia de segurança permite a recuperação para um ponto anterior no tempo e fornece proteção contra ransomware.  
Objetivo da alta disponibilidade | SafeKit replica os dados de forma síncrona para ambos os nós. Isto permite a comutação automática de falhas sem perda de dados após uma falha de hardware ou software. No entanto, erros lógicos, corrupção de dados e exclusões acidentais também são copiados imediatamente para o nó de reserva.  
Finalidade das cópias de segurança | As cópias de segurança permitem restaurar dados de um ponto anterior no tempo. Um produto de cópia de segurança separado, não SafeKit, fornece esta proteção através de replicação assíncrona. As cópias de segurança ajudam a recuperar de ransomware e de erros humanos. Esta recuperação não é uma comutação automática. A restauração de uma cópia de segurança mais antiga perde as alterações feitas após essa cópia de segurança.  
Número máximo de módulos a funcionar em simultâneo | Um cluster de dois nós pode gerir até 32 módulos em simultâneo. Para proteção de máquinas virtuais, cada módulo replica e reinicia uma máquina virtual diferente. Cada módulo pode ser primário em qualquer um dos nós, pelo que ambos os servidores podem partilhar a carga de trabalho. O volume total de dados afeta o tempo de ressincronização após uma falha ou reinicialização de um nó.  
O software está instalado em cada nó? | Sim. Um software leve é instalado em cada nó.  
Aplicações suportadas | SafeKit pode proteger qualquer serviço Windows ou daemon Linux. Estão disponíveis módulos pré-configurados para mais de 30 aplicações.  
  
### Replicação e proteção de dados {#replication-data-protection}

Requisito | Funcionalidades SafeKit  
---|---  
Método de replicação | SafeKit replica as alterações de ficheiros ao nível de byte. Não replica blocos de disco.  
Modo de replicação | Replicação síncrona, com perda de dados zero  
Requisitos de rede | Para replicação síncrona, recomenda-se uma latência de ida e volta inferior a 5 ms entre os nós.  
Volume de dados recomendado | Alguns terabytes, para manter o tempo de ressincronização controlável  
Número de ficheiros recomendado | Menos de 1.000.000 de ficheiros, para manter o tempo de ressincronização controlável  
Tempo de ressincronização para 1 TB | Cerca de 3 horas numa rede de 1 Gb/s ou 1 hora numa rede de 10 Gb/s  
Replicação seletiva | Pode escolher quais diretórios e ficheiros deseja replicar.  
Criptografia durante a transferência | O tráfego de replicação é encriptado com TLS/SSL.  
  
## Perda de dados e tempos de recuperação (RPO e RTO) {#rpo-rto-capabilities}

### RPO e RTO para cada tipo de cluster {#rto-rpo-cluster-type}

Métrica | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO (objetivo do ponto de recuperação) | Perda de dados nula. Uma operação de escrita só é concluída quando ambos os nós tiverem gravado os dados. | Não aplicável a serviços sem estado. Os dados são geridos por um cluster mirror separado.  
RTO (objetivo de tempo de recuperação) | Cerca de um minuto. Isto inclui o tempo limite de <span class="notranslate farm-term" translate="no">heartbeat</span> (30 segundos por predefinição) e o tempo para reiniciar a aplicação. | Alguns segundos. O tráfego é redistribuído para os nós ativos restantes.  
Tipo de replicação | Replicação de ficheiros síncrona, em tempo real, ao nível de byte | Não aplicável  
Gatilho de contingência | A comutação de contingência inicia-se automaticamente quando as mensagens <span class="notranslate farm-term" translate="no">heartbeat</span> param, quando um processo falha ou quando um verificador deteta uma falha | A comutação por falha inicia-se automaticamente quando as mensagens <span class="notranslate farm-term" translate="no">heartbeat</span> param, quando um processo falha ou quando um verificador deteta uma falha  
É necessária intervenção manual? | Não. A comutação por falha e o restabelecimento da ligação são automáticos. | Não. A comutação por falha e o restabelecimento da ligação são automáticos.  
  
### Tempo de recuperação para aplicações protegidas por um cluster mirror {#rto-breakdown-mirror-application-level-ha}

Tipo de falha | Como é calculado o tempo de recuperação  
---|---  
Falha de hardware | <span class="notranslate farm-term" translate="no">heartbeat</span> tempo limite (30 segundos por predefinição), seguido do reinício da aplicação  
Falha do software ou do processo | O tempo para parar a aplicação, seguido do reinício da aplicação  
Falha do sistema operativo | O tempo limite de <span class="notranslate farm-term" translate="no">heartbeat</span>, seguido do reinício da aplicação. O servidor de reserva não precisa de reiniciar porque o seu sistema operativo já está em execução.  
  
### Tempo de recuperação para máquinas virtuais protegidas por um cluster mirror {#rto-breakdown-mirror-vm-level-ha}

Tipo de falha | Como é calculado o tempo de recuperação  
---|---  
Todos os tipos de falha | Tempo para detetar a falha, reiniciar o sistema operativo da máquina virtual e reiniciar a aplicação. Isto demora geralmente vários minutos.  
  
## Locais remotos e implementações distribuídas {#edge-distributed-deployment-suitability}

SafeKit foi concebido para locais remotos, sucursais e organizações com muitas localizações.

Requisito num local remoto | Funcionalidades SafeKit  
---|---  
Não há pessoal de TI dedicado no local | A comutação de contingência é automática e não requer qualquer ação manual.  
Sem armazenamento partilhado (SAN ou NAS) | Apenas são necessários discos locais. O armazenamento partilhado não é necessário.  
Gestão remota | Gerencie o cluster através de uma consola web.  
Hardware limitado | Dois servidores padrão ou máquinas virtuais são suficientes. Não é necessário hardware especial.  
Firewalls e tradução de endereços de rede (NAT) | As portas podem ser configuradas. A consola web utiliza HTTPS.  
Recuperação de desastres entre locais | Um cluster mirror pode ligar dois locais através de uma VLAN estendida entre eles.  
Integração por parte dos editores de software | Os editores de software podem incluir SafeKit nos seus produtos. A instalação pode ser executada sem interação do utilizador e pode ser automatizada com scripts.  
Centenas de clusters SafeKit em vários locais | SafeKit foi concebido para organizações com muitas filiais.  
  
Os seguintes sites necessitam de alta disponibilidade, mesmo quando não possuem um centro de dados:

Indústria | Local típico | Aplicações críticas  
---|---|---  
Segurança física e vigilância | Edifícios, campi, aeroportos | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestão de edifícios (BMS) | Edifícios de escritórios, hospitais, fábricas | Siemens Desigo CC, Bosch BIS/BVMS  
Controlo eletrónico de acesso (EACS) | Instalações e campus seguros | Siemens SiPass, Nedap, Bosch AMS  
SCADA e controlo industrial | Fábricas, subestações, estações de tratamento de água | Qualquer software SCADA, DCS ou HMI que funcione em Windows ou Linux  
Controlo de tráfego aéreo (CTA) | Aeroportos, torres de controlo | Gestão de controlo de tráfego aéreo e sistemas de radar  
Centros de controlo de operações (CCO) | Metro, ferrovia, centros de transporte | Sinalização ferroviária e gestão de estações  
Marítimo | Navios, embarcações navais | Sistemas de navegação, de gestão de carga e de gestão a bordo  
Petróleo e gás | Plataformas offshore, plataformas remotas | Sistemas de controlo de processo e de segurança  
Telecomunicações | Locais de antenas 5G, nós MEC | Servidores de computação de ponta multiacesso (MEC)  
Cuidados de saúde | Clínicas, centros de diagnóstico remotos | Imagiologia médica, dados do paciente, diagnósticos remotos  
Venda a retalho | Lojas, sucursais, armazéns | Gestão de pontos de venda e de inventário  
Defesa | Bases de operações avançadas, unidades de campo | Sistemas de comando e comunicações de missão crítica  
  
## Monitorização e alertas {#monitoring-management-alerting}

Funcionalidade | Detalhes  
---|---  
Consola Web | Configure, monitorize e administre os nós do cluster através de uma aplicação web ou de uma Progressive Web App (PWA).  
Notificações no telemóvel | Receba notificações no navegador quando um módulo mudar de estado.  
Linha do tempo | Veja as alterações de estado e os eventos do módulo em ordem cronológica.  
Notificações por e-mail | Um agente de e-mail integrado envia alertas.  
Interface de linha de comandos | Utilize a interface de linha de comandos para escrever scripts e automatizar tarefas.  
Gestão de registos | Cada módulo e script tem os seus próprios ficheiros de registo. A equipa de suporte utiliza os <span class="notranslate farm-term" translate="no">snapshots</span> dos módulos para investigar problemas.  
Integração com ferramentas de monitorização | SafeKit regista os principais eventos do cluster no Registo de Eventos Windows ou no Syslog Linux. As ferramentas de monitorização podem recolher estes eventos e acionar alertas com regras padrão. Isto funciona com Nagios, Zabbix, Splunk e ferramentas SIEM sem necessidade de desenvolvimento personalizado.  
  
## Segurança e conformidade {#security-compliance}

Funcionalidade | Detalhes  
---|---  
HTTPS | A consola web utiliza HTTPS com certificados TLS.  
Autenticação do utilizador | Contas locais, LDAP, certificados (PKI) e OpenID Connect  
Funções do utilizador | Configure as políticas de acesso para administração, controlo e monitorização.  
Criptografia | O tráfego TCP utiliza TLS/SSL para replicação, a consola web e comandos distribuídos. O tráfego UDP utiliza encriptação AES-128-CBC com SHA256 para mensagens <span class="notranslate farm-term" translate="no">heartbeat</span> e para o protocolo interno safeadmin. A biblioteca OpenSSL fornece encriptação. O serviço web é executado no Apache.  
Antivírus | A documentação lista os caminhos a excluir das verificações do antivírus.  
Soberania | SafeKit é desenvolvido em França pela Eviden, parte do Grupo Atos. Protege aplicações Windows e Linux, mantendo os seus dados e servidores nas suas instalações. SafeKit pode ajudar a cumprir os requisitos da Diretiva Europeia NIS2 para continuidade de negócios e recuperação de desastres.
  
## Licenciamento {#licensing-model}

Assunto | Detalhes  
---|---  
Tipo de licença | Uma licença perpétua é adquirida uma única vez e está associada a um nome de anfitrião.  
Âmbito da licença | Uma licença por servidor (nó)  
Ativação da licença | As chaves de licença podem ser ativadas sem acesso à internet.  
Teste grátis | Uma versão de teste gratuita inclui todas as funcionalidades.  
Licença gratuita de um mês | Disponível para testar uma prova de conceito  
  
## Apoio e manutenção {#support-maintenance-slas}

### Suporte e manutenção padrão com um contrato de manutenção ativo {#standard-support-maintenance-included-with-active-maintenance-contract}

Serviço | Detalhes  
---|---  
Acesso ao portal de suporte | O portal da web está disponível a qualquer hora, todos os dias do ano, para até quatro contactos técnicos nomeados.  
Horário de atendimento ao vivo | De segunda a sexta-feira, das 09:00 às 17:00, no Centro de Apoio Europeu  
Confirmação de incidente | No prazo de quatro horas úteis. As horas úteis são as horas de atendimento em direto do Centro de Suporte.  
Atualizações e melhorias | Todos os pacotes de serviços, atualizações e melhorias estão incluídos sem custo adicional.  
Substituição da chave de licença | Com um contrato de suporte ativo, uma chave de licença pode ser reatribuída quando o nome do anfitrião é alterado. A transferência está limitada à substituição de um servidor dentro do mesmo projeto. É necessária a aprovação prévia por escrito da Eviden.  
Acesso à base de conhecimento | Acesso total aos artigos da base de conhecimento, perguntas frequentes e documentação online  
Procedimento de emergência | SafeKit fornece um script de encapsulamento para iniciar ou parar uma aplicação sem usar os recursos de alta disponibilidade do SafeKit. Este script invoca os scripts de início e paragem da aplicação. Também adiciona ou remove o endereço IP virtual quando necessário.  
Portal de suporte | <https://customercare.evidian.com>  
  
### Recursos gratuitos sem contrato de suporte {#free-resources-no-contract-required}

Recurso gratuito | Detalhes  
---|---  
Assistente de IA para suporte | Utilize [o chat de IA SafeKit](</pt-pt/resources/safekit-support/#ai-support>) em safekit.eviden.com.   
Formação e certificação online | [Aprenda ao seu próprio ritmo](/pt-pt/resources/safekit-on-line-training/) com vídeos gratuitos que totalizam cerca de 4 horas. Receba um certificado ao concluir a formação.  
Documentação | Guia do utilizador, notas de versão, base de conhecimento e guias de instalação rápida [aqui](/pt-pt/resources/safekit-free-trial/)  
  
## Comparação com outras soluções {#comparison-vs-alternatives}

Critério | SafeKit | Cluster de Failover Microsoft (WSFC) | VMware HA | Código Aberto [1]  
---|---|---|---|---  
É necessário armazenamento partilhado (SAN/vSAN) | Não | Sim | Sim | Não  
Suporte Windows | Sim | Sim | Sim | Não  
Suporte Linux | Sim | Não | Sim | Sim  
Implementação em locais remotos | Excelente | Complexo | Complexo | Complexo  
OEM | Sim | Não | Não | Não  
Custo | Licença perpétua por nó | Windows Server e SAN | vSphere Enterprise e SAN | Serviços de integração avançados  
Complexidade da configuração | Baixo: um produto para instalar e configurar | Alto: Active Directory, SAN e configuração de testemunha | Alto: vCenter e configuração de armazenamento partilhado | Alto: vários produtos distintos para configurar  
Administração | Um produto gerido através de uma consola web | Elevado: requer conhecimentos especializados em Active Directory e SAN | Alto: depende do vCenter | Alto: vários produtos distintos para manter  
  
**[1]** No Linux, são necessários seis projetos de código aberto separados para fornecer o mesmo conjunto de funcionalidades: Corosync, Pacemaker, DRBD, Keepalived, STONITH e HAProxy. SafeKit fornece estas funcionalidades num único produto para Windows e Linux.

## Ligações úteis {#quick-reference-links}

Ligação | URL  
---|---  
Página inicial do produto | [https://safekit.eviden.com](/pt-pt/)  
Visão geral técnica (documento Word com texto e diagramas) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Teste grátis | [https://safekit.eviden.com/resources/safekit-free-trial/](</pt-pt/resources/safekit-free-trial/>)  
Peça um orçamento | [https://safekit.eviden.com/safekit-pricing/](</pt-pt/safekit-pricing/>)  
Portal de suporte | <https://customercare.evidian.com>  
Suporte de IA gratuito | [https://safekit.eviden.com/resources/safekit-support/](</pt-pt/resources/safekit-support/>)  
Formação e certificação gratuitas | [https://safekit.eviden.com/resources/safekit-on-line-training/](</pt-pt/resources/safekit-on-line-training/>)  
Contacte-nos | [https://safekit.eviden.com/contact-us-for-safekit/](</pt-pt/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-pt-pt  %}}