---
title: "Balanceamento de carga de rede e failover em Linux: instale o módulo farm.safe do SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Saiba como implementar o módulo farm.safe para balanceamento de carga de rede e failover automático em Linux. Este guia mostra como criar um cluster de elevada disponibilidade para serviços web e aplicações com um IP virtual, sem balanceadores de carga de hardware externos nem configuração complexa."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de instalação rápida de elevada disponibilidade para Linux, Limitações da elevada disponibilidade do SafeKit, Descrição geral da solução SafeKit / Linux, Instalação da solução SafeKit / Linux (farm.safe), Configuração passo a passo da solução SafeKit / Linux, Demonstração da solução SafeKit <span class="notranslate farm-term" translate="no">farm</span>, 🔍 Hub de navegação de elevada disponibilidade do SafeKit"
---

# Balanceamento de carga de rede e failover em Linux: instale o módulo farm.safe do SafeKit {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-pt app="Linux" mod="farm"  %}}
 

## Descrição geral da solução SafeKit / Linux {#overview-of-the-safekit--linux-solution}

A solução é descrita aqui: **💡[SafeKit: software completo de balanceamento de carga e elevada disponibilidade para Linux](</pt-pt/solutions/linux-load-balancing-failover/>)**.

## Instalação da solução SafeKit / Linux (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter a aplicação que pretende colocar numa <span class="notranslate farm-term" translate="no">farm</span> instalada em 2 ou mais nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="farm"  %}}
 

Nota: o módulo genérico **farm.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit / Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-pt-pt app="Linux" mod="farm"  %}}
 

## Demonstração da solução SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
