---
title: "NGINX Balanceamento de Carga e Redundância de Rede: Instale o Módulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Saiba como implementar o módulo farm.safe no Windows e Linux para NGINX Network Load Balancing e failover automático. Este guia mostra como construir um cluster de alta disponibilidade para serviços e aplicações web utilizando um IP virtual, sem a necessidade de balanceadores de carga de hardware externos ou configurações complexas."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para NGINX, Limitações de Alta Disponibilidade SafeKit, Visão geral da solução SafeKit/NGINX, Instalação da solução SafeKit/NGINX em Windows e Linux (farm.safe), Configuração passo a passo da solução SafeKit/NGINX, Demonstração da solução farm SafeKit, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
---

# NGINX Balanceamento de Carga e Redundância de Rede: Instale o Módulo farm.safe SafeKit {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-pt app="NGINX" mod="farm"  %}}
 

## Visão geral da solução SafeKit/NGINX {#overview-of-the-safekit--nginx-solution}

A solução é descrita aqui: **💡 [SafeKit: Software tudo-em-um para balanceamento de carga e alta disponibilidade NGINX](</pt-pt/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**.

## Instalação da solução SafeKit/NGINX em Windows e Linux (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter NGINX instalado em 2 ou mais nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="NGINX" mod="farm"  %}}
 

Nota: o módulo genérico **farm.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit/NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-pt-pt app="NGINX" mod="farm"  %}}
 

## Demonstração da solução <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}