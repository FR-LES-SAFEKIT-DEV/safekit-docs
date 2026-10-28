---
title: "Alta disponibilidade na nuvem com SafeKit : Instale o módulo mirror.safe para failover."
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "Implante o módulo mirror.safe para SafeKit na nuvem para habilitar a replicação síncrona em tempo real e o failover automático em Windows e Linux . Este guia orienta você na configuração de um cluster de 2 nós sem compartilhamento de recursos para aplicações críticas."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Nuvem, Limitações de Alta Disponibilidade do SafeKit , Visão Geral da solução SafeKit / Nuvem mirror , Instalação da solução SafeKit / Nuvem mirror em Windows e Linux ( mirror.safe ), Configuração passo a passo da solução SafeKit / Nuvem mirror , Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade na nuvem com SafeKit : Instale o módulo mirror.safe para failover {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Cloud" mod="mirror"  %}}
 

## Visão geral da solução SafeKit / Cloud mirror {#overview-of-the-safekit--cloud-mirror-solution}

A solução é descrita aqui: ** 💡 [ Alta disponibilidade independente de nuvem: SafeKit Replicação síncrona e failover ](</solutions/cloud-high-availability-cluster-synchronous-replication-failover/>) ** .

## Instalação da solução SafeKit / Cloud mirror em Windows e Linux ( mirror.safe ) {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuração do balanceador de carga na nuvem {#configuration-of-the-cloud-load-balancer}

O balanceador de carga precisa ser configurado se você quiser implementar um endereço IP virtual.  
E o balanceador de carga deve ser configurado para enviar periodicamente pacotes de saúde aos nós.  
Para isso, SafeKit fornece uma verificação de integridade que é executada dentro dos nós e que

  * Retorna OK quando o estado do módulo mirror é PRIM (verde) ou ALONE (verde).
  * retornos NÃO ENCONTRADOS em todos os outros estados


Você deve configurar o balanceador de carga na nuvem com:

  * protocolo HTTP
  * porta 9010, a porta do servidor web SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror for o nome do módulo que você implantará posteriormente)


⚠️ Não configure um endereço IP virtual na etapa 4 da configuração passo a passo abaixo. O endereço IP virtual já está configurado no balanceador de carga na nuvem. Configurar um IP virtual na etapa 4 é útil apenas para configurações locais.

### Configuração da segurança de rede na nuvem {#configuration-of-the-cloud-network-security}

A segurança da rede deve ser configurada para permitir a comunicação dos seguintes protocolos e portas:

  * UDP - 4800 para o serviço safeadmin (entre nós SafeKit )
  * UDP - 8888 para o módulo de pulsação (entre nós SafeKit )
  * TCP – 5600 para o módulo de replicação de arquivos em tempo real (entre nós SafeKit )
  * TCP – 9010 para a verificação de integridade do balanceador de carga e para o console web SafeKit em execução no modo http.
  * TCP – 9001 para configurar o modo https para o console
  * TCP – 9453 para o console web SafeKit em execução no modo https



{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}
 

Observação: o módulo genérico **mirror.safe** que você irá configurar está incluído no pacote.

## Configuração passo a passo da solução SafeKit / Cloud mirror {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Windows" mod="mirror"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}