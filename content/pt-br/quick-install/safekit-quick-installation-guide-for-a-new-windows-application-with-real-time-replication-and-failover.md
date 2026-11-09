---
title: "Alta Disponibilidade Windows com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Implemente o módulo mirror.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático no Windows. Este guia mostra como configurar um cluster SANless de 2 nós para aplicações críticas Windows sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Windows, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Windows, Instalação das soluções SafeKit/Windows (mirror.safe), Configuração passo a passo da solução SafeKit/Windows, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Windows com SafeKit: Instale o Módulo mirror.safe para Failover {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Windows" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Windows {#overview-of-the-safekit--windows-solution}

A solução é descrita aqui: **💡 [A maneira mais simples de ter alta disponibilidade Windows: replicação síncrona e failover de 2 nós](</pt-br/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Instalação das soluções SafeKit/Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa que o aplicativo que deseja reiniciar no SafeKit esteja instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **mirror.safe** que você vai configurar é entregue dentro do pacote.

## Configuração passo a passo da solução SafeKit/Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-pt-br app="Windows" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}