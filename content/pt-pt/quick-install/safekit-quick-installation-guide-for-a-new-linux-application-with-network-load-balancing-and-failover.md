---
title: "Balanceamento de Carga e Redundância de Rede Linux: Instale o Módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Saiba como implementar o módulo farm.safe para o Balanceamento de Carga de Rede Linux e o failover automático. Este guia mostra como construir um cluster de alta disponibilidade para serviços e aplicações web usando um IP virtual, sem a necessidade de balanceadores de carga de hardware externos ou configurações complexas."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Linux, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Linux, Instalação da solução SafeKit/Linux (farm.safe), Configuração passo a passo da solução SafeKit/Linux, Demonstração da solução farm SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Balanceamento de Carga e Redundância de Rede Linux: Instale o Módulo farm.safe SafeKit {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-pt app="Linux" mod="farm"  %}}
 

## Visão geral da solução SafeKit/Linux {#overview-of-the-safekit--linux-solution}

A solução é descrita aqui: **💡 [SafeKit: Software tudo-em-um para balanceamento de carga e alta disponibilidade Linux](</pt-pt/solutions/linux-load-balancing-failover/>)**.

## Instalação da solução SafeKit/Linux (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### Pré-requisitos {#prerequisites}

  * É necessário que a aplicação que pretende instalar numa <span class="notranslate farm-term" translate="no">farm</span> instalada em 2 ou mais nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="farm"  %}}
 

Nota: o módulo genérico **farm.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-pt-pt app="Linux" mod="farm"  %}}
 

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}