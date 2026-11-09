---
title: "Alta Disponibilidade Linux com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Implemente o módulo mirror.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático no Linux. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações Linux críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Linux, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Linux, Instalação da solução SafeKit/Linux (mirror.safe), Configuração passo a passo da solução SafeKit/Linux, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Linux com SafeKit: Instale o Módulo mirror.safe para Failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Linux" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Linux {#overview-of-the-safekit--linux-solution}

As soluções são descritas aqui: **💡 [A mais simples alta disponibilidade Linux: replicação síncrona e failover de 2 nós](</pt-br/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## Instalação da solução SafeKit/Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa que o aplicativo que deseja reiniciar no SafeKit esteja instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **mirror.safe** que você vai configurar é entregue dentro do pacote.

## Configuração passo a passo da solução SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-pt-br app="Linux" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}