---
title: "Elevada disponibilidade em Linux com SafeKit: instale o módulo mirror.safe para failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Implemente o módulo mirror.safe do SafeKit para ativar a replicação síncrona em tempo real e o failover automático em Linux. Este guia acompanha-o na configuração de um cluster SANless de 2 nós para aplicações Linux críticas, sem armazenamento partilhado."
category: "quick-install"
lang: "pt-pt"
topics: "Guia de instalação rápida de elevada disponibilidade para Linux, Limitações da elevada disponibilidade do SafeKit, Descrição geral da solução SafeKit / Linux, Instalação da solução SafeKit / Linux (mirror.safe), Configuração passo a passo da solução SafeKit / Linux, Demonstração da solução SafeKit mirror, 🔍 Hub de navegação de elevada disponibilidade do SafeKit"
---

# Elevada disponibilidade em Linux com SafeKit: instale o módulo mirror.safe para failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Linux" mod="mirror"  %}}
 

## Descrição geral da solução SafeKit / Linux {#overview-of-the-safekit--linux-solution}

A solução é descrita aqui: **💡[A elevada disponibilidade mais simples em Linux: replicação síncrona de 2 nós e failover](</pt-pt/solutions/linux-high-availability-software-synchronous-replication-failover/>)**.

## Instalação da solução SafeKit / Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * É necessário ter a aplicação que pretende reiniciar no SafeKit instalada em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}
 

Nota: o módulo genérico **mirror.safe** que vai configurar é fornecido dentro do pacote.
Observação: o módulo genérico **mirror.safe** que você irá configurar está incluído no pacote.
## Configuração passo a passo da solução SafeKit / Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Linux" mod="mirror"  %}}
 

## Demonstração da solução SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}
