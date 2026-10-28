---
title: "Alternativa ao SQL Server Always On: HA para as edições Express e Standard"
canonical: "https://safekit.eviden.com/pt-br/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "Procurando uma alternativa econômica ao SQL Server Always On? SafeKit propõe uma arquitetura sem SAN que traz alta disponibilidade para as edições Express e Standard SQL Server . Desfrute de replicação síncrona, IP virtual e failover automático sem a necessidade de SAN ou Active Directory."
category: "best-practises"
lang: "pt-br"
topics: "Alternativa ao Always On SQL Server para edições Express e Standard, Como o cluster SafeKit mirror funciona com Microsoft SQL Server ?, Guia em vídeo: Configurando um cluster HA SafeKit mirror para SQL Server , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alternativa ao SQL Server Always On: HA para as edições Express e Standard {#alternative-to-sql-server-always-on-ha-for-express-and-standard-editions}

## Alternativa ao Always On SQL Server para as edições Express e Standard {#alternative-to-always-on-sql-server-for-express-and-standard-editions}

### A solução para Microsoft SQL Server {#the-solution-for-microsoft-sql-server}

SafeKit proporciona alta disponibilidade para Microsoft SQL Server entre dois nós redundantes com replicação síncrona de dados em tempo real e failover automático.

A solução é independente da edição Microsoft SQL Server e funciona tanto com as edições Express quanto com as Standard.

### Um produto genérico {#a-generic-product}

SafeKit é um produto genérico. Você pode replicar mais do que apenas dados e logs do SQL Server. Se o seu aplicativo for baseado em SQL Server e contiver pastas específicas com sua configuração ou outros arquivos, você poderá replicá-los da mesma forma. Além disso, você pode reiniciar seus próprios serviços, bem como os serviços do SQL Server.

Guia de instalação [ SafeKit com edições Express e Standard do Microsoft SQL Server ](</pt-br/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)

### Sem cluster de failover Microsoft {#without-microsoft-failover-cluster}

SafeKit funciona sem o cluster de failover Microsoft assim como o Always On SQL Server . É uma oferta completa que inclui endereço IP virtual, replicação síncrona em tempo real de pastas, failover e failback automáticos e muito mais. SafeKit elimina a necessidade de discos compartilhados e edições corporativas de banco de dados. 

### Sem controlador de domínio e Active Directory {#without-domain-controller-and-active-directory}

SafeKit funciona sem a necessidade de configurar o controlador de domínio e o Active Directory, ao contrário do Always On SQL Server . Essa solução fácil de implementar e com ótimo custo-benefício não exige habilidades específicas.

### Sem 3 nós para quórum {#without-3-nodes-for-quorum}

SafeKit funciona sem a necessidade de 3 nós para quorum, ao contrário do Always On SQL Server . Em caso de isolamento de rede, SafeKit implementa um verificador de split-brain com um ping para um roteador que atua como testemunha. Além disso, vários heartbeats podem ser facilmente configurados no produto.

### Outras soluções de redundância e alta disponibilidade {#other-redundancy-and-high-availability-solutions}

Com SafeKit , você pode implementar em Windows e Linux , replicação em tempo real e failover de quaisquer pastas e serviços, bancos de dados, máquinas virtuais Hyper-V ou KVM completas, Docker , Kubernetes e aplicativos em nuvem.

### Uma solução completa {#a-complete-solution}

SafeKit resolve: 

  * falhas de hardware (20% dos problemas), incluindo a falha completa de uma sala de computadores, 
  * falhas de software (40% dos problemas), incluindo reinicialização de processos críticos, 
  * e erros humanos (40% dos problemas) graças à sua facilidade de uso e ao seu console web.



{{%  insert-safekit-mirror-pt-br app="Microsoft SQL Server"  %}}
 

## Guia em vídeo: Configurando um cluster HA SafeKit mirror para SQL Server {#videoguide-safekit-mirror-cluster}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}