---
title: "Alta disponibilidade no Windows com SafeKit: instale o módulo mirror.safe para failover"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Implante o módulo mirror.safe do SafeKit para habilitar replicação síncrona em tempo real e failover automático no Windows. Este guia orienta a configuração de um cluster SANless de 2 nós para aplicações Windows críticas, sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de instalação rápida de alta disponibilidade para Windows, Limitações da alta disponibilidade do SafeKit, Visão geral da solução SafeKit / Windows, Instalação nas soluções SafeKit / Windows (mirror.safe), Configuração passo a passo da solução SafeKit / Windows, Demonstração da solução SafeKit mirror, 🔍 Hub de navegação de alta disponibilidade do SafeKit"
---

# Alta disponibilidade no Windows com SafeKit: instale o módulo mirror.safe para failover {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Windows" mod="mirror"  %}}
 

## Visão geral da solução SafeKit / Windows {#overview-of-the-safekit--windows-solution}

A solução é descrita aqui: **💡[A alta disponibilidade mais simples no Windows: replicação síncrona de 2 nós e failover](</solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Instalação nas soluções SafeKit / Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter a aplicação que deseja reiniciar no SafeKit instalada em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **mirror.safe** que você vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit / Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-pt-br app="Windows" mod="mirror"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}
