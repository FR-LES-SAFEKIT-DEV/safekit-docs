---
title: "Alta disponibilidade Firebird com SafeKit : Instale o módulo firebird.safe para failover."
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "Implante o módulo firebird.safe para SafeKit para habilitar a replicação síncrona em tempo real e o failover automático de Firebird em Windows e Linux . Este guia orienta você na configuração de um cluster SANless de 2 nós para aplicações críticas sem armazenamento compartilhado."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Firebird , Limitações de Alta Disponibilidade do SafeKit , Visão Geral da solução SafeKit / Firebird , Instalação da solução SafeKit / Firebird em Windows e Linux ( firebird.safe ), Configuração passo a passo da solução SafeKit / Firebird , Demonstração da solução SafeKit mirror , 🔍 Hub de Navegação de Alta Disponibilidade SafeKit"
---

# Alta disponibilidade Firebird com SafeKit : Instale o módulo firebird.safe para failover {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-br app="Firebird" mod="firebird"  %}}
 

## Visão geral da solução SafeKit / Firebird {#overview-of-the-safekit--firebird-solution}

A solução é descrita aqui: ** 💡 [ O mais simples Firebird Alta disponibilidade: replicação síncrona de 2 nós e failover ](</solutions/firebird-high-availability-synchronous-replication-failover/>) ** .

## Instalação da solução SafeKit / Firebird em Windows e Linux ( firebird.safe ) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa ter Firebird instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-windows-pt-br app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-pt-br app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-pt-br app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-pt-br app="Firebird" mod="firebird"  %}}
 

## Configuração passo a passo da solução SafeKit / Firebird {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-pt-br app="Firebird" mod="firebird"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}