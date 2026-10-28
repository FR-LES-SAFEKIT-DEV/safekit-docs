---
title: "Alta disponibilidade no Linux com SafeKit: instale o módulo mirror.safe para failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Implante o módulo mirror.safe do SafeKit para habilitar replicação síncrona em tempo real e failover automático no Linux. Este guia orienta a configuração de um cluster SANless de 2 nós para aplicações Linux críticas, sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de instalação rápida de alta disponibilidade para Linux, Limitações da alta disponibilidade do SafeKit, Visão geral da solução SafeKit / Linux, Instalação da solução SafeKit / Linux (mirror.safe), Configuração passo a passo da solução SafeKit / Linux, Demonstração da solução SafeKit mirror, 🔍 Hub de navegação de alta disponibilidade do SafeKit"
---

# Alta disponibilidade no Linux com SafeKit: instale o módulo mirror.safe para failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Linux" mod="mirror"  %}}
 

## Visão geral da solução SafeKit / Linux {#overview-of-the-safekit--linux-solution}

A solução é descrita aqui: **💡[A alta disponibilidade mais simples no Linux: replicação síncrona de 2 nós e failover](</pt-br/solutions/linux-high-availability-software-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit / Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter a aplicação que deseja reiniciar no SafeKit instalada em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **mirror.safe** que você vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit / Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-pt-br app="Linux" mod="mirror"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
