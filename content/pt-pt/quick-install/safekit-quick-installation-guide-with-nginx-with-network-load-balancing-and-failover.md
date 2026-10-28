---
title: "Balanceamento de carga e failover de rede NGINX: Instale o módulo SafeKit farm.safe"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Aprenda como implantar o módulo farm.safe em Windows e Linux para balanceamento de carga de rede e failover automático do NGINX. Este guia mostra como criar um cluster de alta disponibilidade para serviços e aplicações web usando um IP virtual, sem a necessidade de balanceadores de carga de hardware externos ou configurações complexas."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para NGINX, Limitações de Alta Disponibilidade do SafeKit , Visão Geral da solução SafeKit / NGINX, Instalação da solução SafeKit / NGINX no Windows e Linux ( farm.safe ), Configuração passo a passo da solução SafeKit / NGINX, Demonstração da solução SafeKit `farm` , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Balanceamento de carga e failover de rede NGINX: Instale o módulo SafeKit farm.safe {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-pt-pt app="NGINX" mod="farm"  %}}
 

## Visão geral da solução SafeKit / NGINX {#overview-of-the-safekit--nginx-solution}

A solução é descrita aqui: **💡 [ SafeKit : Software completo de balanceamento de carga e alta disponibilidade para NGINX ](</pt-pt/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)** .

## Instalação da solução SafeKit / NGINX em Windows e Linux ( farm.safe ) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter o NGINX instalado em 2 ou mais nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-pt app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-pt-pt app="NGINX" mod="farm"  %}}
 

Observação: o módulo genérico **farm.safe** que você irá configurar está incluído no pacote.

## Configuração passo a passo da solução SafeKit / NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-pt-pt app="NGINX" mod="farm"  %}}
 

## Demonstração da solução SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}