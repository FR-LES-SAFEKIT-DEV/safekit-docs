---
title: "Elevada disponibilidade em Windows com SafeKit: instale o módulo mirror.safe para failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Implemente o módulo mirror.safe do SafeKit para ativar a replicação síncrona em tempo real e o failover automático em Windows. Este guia acompanha-o na configuração de um cluster SANless de 2 nós para aplicações Windows críticas, sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de instalação rápida de elevada disponibilidade para Windows, Limitações da elevada disponibilidade do SafeKit, Descrição geral da solução SafeKit / Windows, Instalação nas soluções SafeKit / Windows (mirror.safe), Configuração passo a passo da solução SafeKit / Windows, Demonstração da solução SafeKit mirror, 🔍 Hub de navegação de elevada disponibilidade do SafeKit"
---

# Elevada disponibilidade em Windows com SafeKit: instale o módulo mirror.safe para failover {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Windows" mod="mirror"  %}}
 

## Descrição geral da solução SafeKit / Windows {#overview-of-the-safekit--windows-solution}

A solução é descrita aqui: **💡[A elevada disponibilidade mais simples em Windows: replicação síncrona de 2 nós e failover](</pt-pt/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Instalação nas soluções SafeKit / Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter a aplicação que pretende reiniciar no SafeKit instalada em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="mirror"  %}}
 

Nota: o módulo genérico **mirror.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit / Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Windows" mod="mirror"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
