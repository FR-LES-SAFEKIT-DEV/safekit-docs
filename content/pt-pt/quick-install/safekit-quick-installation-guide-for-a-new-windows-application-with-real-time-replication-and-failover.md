---
title: "Alta Disponibilidade Windows com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Implemente o módulo mirror.safe para SafeKit para permitir a replicação síncrona em tempo real e o failover automático no Windows. Este guia explica como configurar um cluster SANless de 2 nós para aplicações críticas Windows sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Windows, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Windows, Instalação das soluções SafeKit/Windows (mirror.safe), Configuração passo a passo da solução SafeKit/Windows, Demonstração da solução mirror SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Alta Disponibilidade Windows com SafeKit: Instale o Módulo mirror.safe para Failover {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Windows" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Windows {#overview-of-the-safekit--windows-solution}

A solução é descrita aqui: **💡 [A Mais Simples Solução de Alta Disponibilidade Windows: Replicação Síncrona e Failover de 2 Nós](</pt-pt/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Instalação das soluções SafeKit/Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * É necessário que a aplicação que pretende reiniciar no SafeKit esteja instalada em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="mirror"  %}}
 

Nota: o módulo genérico **mirror.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit/Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Windows" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}