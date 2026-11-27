---
title: "Alta Disponibilidade Linux com SafeKit: Instale o Módulo mirror.safe para Failover"
canonical: "https://safekit.eviden.com/pt-pt/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Guia passo a passo: instale o módulo SafeKit mirror.safe em Linux para replicação em tempo real e failover automático da sua aplicação em dois servidores."
category: "quick-install"
lang: "pt-pt"
topics: "Visão geral da solução SafeKit/Linux, Instalação da solução SafeKit/Linux (mirror.safe), Configuração passo a passo da solução SafeKit/Linux, Demonstração da solução mirror SafeKit"
hashpart: "overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-mirrorsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Alta Disponibilidade Linux com SafeKit: Instale o Módulo mirror.safe para Failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-pt-pt app="Linux" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Linux {#overview-of-the-safekit--linux-solution}

A solução é descrita aqui: **💡 [A Mais Simples Alta Disponibilidade Linux: Replicação Síncrona e Failover de 2 Nós](</pt-pt/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## Instalação da solução SafeKit/Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * É necessário que a aplicação que pretende reiniciar no SafeKit esteja instalada em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-pt app="" mod="mirror"  %}}
 

Nota: o módulo genérico **mirror.safe** que vai configurar é fornecido dentro do pacote.

## Configuração passo a passo da solução SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-pt-pt app="Linux" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-pt  %}}

{{%  insert-safekit-hub-pt-pt app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}