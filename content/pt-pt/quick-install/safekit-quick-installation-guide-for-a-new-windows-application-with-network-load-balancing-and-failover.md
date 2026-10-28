---
title: "Balanceamento de carga de rede e failover em Windows: instale o módulo farm.safe do SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/"
description: "Saiba como implementar o módulo farm.safe para balanceamento de carga de rede e failover automático em Windows. Este guia mostra como criar um cluster de elevada disponibilidade para serviços web e aplicações com um IP virtual, sem balanceadores de carga de hardware externos nem configuração complexa."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de instalação rápida de elevada disponibilidade para Windows, Limitações da elevada disponibilidade do SafeKit, Descrição geral da solução SafeKit / Windows, Instalação da solução SafeKit / Windows (farm.safe), Configuração passo a passo da solução SafeKit / Windows, Demonstração da solução SafeKit `farm`, 🔍 Hub de navegação de elevada disponibilidade do SafeKit"
---

# Balanceamento de carga de rede e failover em Windows: instale o módulo farm.safe do SafeKit {#windows-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-pt app="Windows" mod="farm"  %}}
 

## Descrição geral da solução SafeKit / Windows {#overview-of-the-safekit--windows-solution}

A solução é descrita aqui: **💡[SafeKit: software completo de balanceamento de carga e elevada disponibilidade para Windows](</solutions/windows-load-balancing-failover/>)**.

## Instalação da solução SafeKit / Windows (farm.safe) {#installation-of-the-safekit--windows-solution-farmsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter a aplicação que pretende colocar numa `farm` instalada em 2 ou mais nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="" mod="farm"  %}}
 

Nota: o módulo genérico **farm.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit / Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-farm-configuration-pt-pt app="Windows" mod="farm"  %}}
 

## Demonstração da solução SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
