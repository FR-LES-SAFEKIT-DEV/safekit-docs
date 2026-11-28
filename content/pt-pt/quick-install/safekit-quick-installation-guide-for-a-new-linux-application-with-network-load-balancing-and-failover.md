---
title: "Instalar SafeKit: balanceamento de carga de Linux"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Guia passo a passo: instale o módulo SafeKit farm.safe em Linux para balanceamento de carga de rede e failover da sua aplicação num IP virtual."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Linux, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/Linux, Instalação da solução SafeKit/Linux (farm.safe), Configuração passo a passo da solução SafeKit/Linux, Demonstração da solução farm SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-farmsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Instalar SafeKit: balanceamento de carga de Linux {#install-safekit-for-linux-load-balancing}


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