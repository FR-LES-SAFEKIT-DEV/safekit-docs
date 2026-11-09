---
title: "Balanceamento de Carga e Redundância IIS: Instale o Módulo SafeKit iis_farm.safe"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Saiba como implementar o módulo iis_farm.safe no Windows para IIS Network Load Balancing e failover automático. Este guia mostra como construir um cluster de alta disponibilidade para serviços e aplicações web utilizando um IP virtual, sem a necessidade de balanceadores de carga de hardware externos ou configuração complexa."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para IIS, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/IIS, Instalação da solução SafeKit/IIS no Windows (iis_farm.safe), Configuração passo a passo da solução SafeKit/IIS, Demonstração da solução farm SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Balanceamento de Carga e Redundância IIS: Instale o Módulo SafeKit iis_farm.safe {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-pt-pt app="IIS" mod="iis_farm"  %}}
 

## Visão geral da solução SafeKit/IIS {#overview-of-the-safekit--iis-solution}

A solução é descrita aqui: **💡 [SafeKit: Software tudo-em-um para balanceamento de carga e alta disponibilidade IIS](</pt-pt/solutions/iis-load-balancing-failover/>)**.

## Instalação da solução SafeKit/IIS no Windows (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter IIS instalado em 2 ou mais nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-pt app="IIS" mod="iis_farm"  %}}
 

## Configuração passo a passo da solução SafeKit/IIS {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-pt-pt app="IIS" mod="iis_farm"  %}}
 

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}