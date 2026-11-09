---
title: "Balanceamento de Carga e Failover de Rede NGINX: Instale o Módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Saiba como implantar o módulo farm.safe no Windows e Linux para balanceamento de carga de rede NGINX e failover automático. Este guia mostra como criar um cluster de alta disponibilidade para serviços e aplicativos da Web usando um IP virtual, sem a necessidade de balanceadores de carga de hardware externos ou configuração complexa."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para NGINX, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/NGINX, Instalação da solução SafeKit/NGINX no Windows e Linux (farm.safe), Configuração passo a passo da solução SafeKit/NGINX, Demonstração da solução farm SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# Balanceamento de Carga e Failover de Rede NGINX: Instale o Módulo farm.safe SafeKit {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-br app="NGINX" mod="farm"  %}}
 

## Visão geral da solução SafeKit/NGINX {#overview-of-the-safekit--nginx-solution}

A solução é descrita aqui: **💡 [SafeKit: Software tudo-em-um para balanceamento de carga e alta disponibilidade NGINX](</pt-br/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**.

## Instalação da solução SafeKit/NGINX no Windows e Linux (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter NGINX instalado em 2 ou mais nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-br app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="NGINX" mod="farm"  %}}
 

Observação: o módulo genérico **farm.safe** que você vai configurar é entregue dentro do pacote.

## Configuração passo a passo da solução SafeKit/NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-pt-br app="NGINX" mod="farm"  %}}
 

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}