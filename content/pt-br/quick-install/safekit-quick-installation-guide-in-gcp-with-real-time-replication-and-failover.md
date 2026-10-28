---
title: "Alta disponibilidade GCP com SafeKit : Instale o módulo mirror.safe para failover."
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/"
description: "Implante o módulo mirror.safe para SafeKit em GCP para habilitar a replicação síncrona em tempo real e o failover automático em Windows e Linux . Este guia orienta você na configuração de um cluster de 2 nós sem compartilhamento de recursos para aplicações críticas."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para GCP , Limitações de Alta Disponibilidade SafeKit , Visão Geral da solução SafeKit / GCP mirror , Instalação da solução SafeKit / GCP mirror em Windows e Linux ( mirror.safe ), Configuração passo a passo da solução SafeKit / GCP mirror , Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade GCP com SafeKit : Instale o módulo mirror.safe para failover {#gcp-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="GCP" mod="mirror"  %}}
 

## Visão geral da solução SafeKit / GCP mirror {#overview-of-the-safekit--gcp-mirror-solution}

A solução é descrita aqui: **💡 [ Google GCP Alta disponibilidade: SafeKit Replicação síncrona e failover ](</pt-br/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)** .

## Instalação da solução SafeKit / GCP mirror em Windows e Linux ( mirror.safe ) {#installation-of-the-safekit--gcp-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuração do balanceador de carga Google GCP {#configuration-of-the-google-gcp-load-balancer}

O balanceador de carga precisa ser configurado se você quiser implementar um endereço IP virtual.  
E o balanceador de carga deve ser configurado para enviar periodicamente pacotes de saúde aos nós.  
Para isso, SafeKit fornece uma verificação de integridade que é executada dentro dos nós e que

  * Retorna OK quando o estado do módulo mirror é PRIM (verde) ou ALONE (verde).
  * retornos NÃO ENCONTRADOS em todos os outros estados


Você deve configurar o balanceador de carga Google GCP com:

  * protocolo HTTP
  * porta 9010, a porta do servidor web SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror for o nome do módulo que você implantará posteriormente)


Para obter mais informações, consulte [ a configuração do balanceador de carga do Google GCP ](<https://docs.cloud.google.com/load-balancing/docs/>) . 


⚠️ Não configure um endereço IP virtual na etapa 4 da configuração passo a passo abaixo. O endereço IP virtual já está configurado no balanceador de carga Google GCP . Configurar um IP virtual na etapa 4 é útil apenas para configurações locais.

### Configuração da segurança de rede do Google GCP {#configuration-of-the-google-gcp-network-security}

A segurança da rede deve ser configurada para permitir a comunicação dos seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre nós SafeKit )
  * UDP - 8888 para o módulo de pulsação (entre nós SafeKit )
  * TCP – 5600 para o módulo de replicação de arquivos em tempo real (entre nós SafeKit )
  * TCP – 9010 para a verificação de integridade do balanceador de carga e para o console web SafeKit em execução no modo http.
  * TCP – 9001 para configurar o modo https para o console
  * TCP – 9453 para o console web SafeKit em execução no modo https



{{%  insert-safekit-installation-package-windows-pt-br app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **mirror.safe** que você irá configurar está incluído no pacote.

## Configuração passo a passo da solução SafeKit / GCP mirror {#step-by-step-configuration-of-the-safekit--gcp-mirror-solution}


{{%  insert-safekit-82-configuration-pt-br app="Windows" mod="mirror"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}