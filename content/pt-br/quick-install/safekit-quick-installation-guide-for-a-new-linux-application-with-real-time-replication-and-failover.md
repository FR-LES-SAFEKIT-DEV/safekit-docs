---
title: "Instalar SafeKit para alta disponibilidade de Linux"
canonical: "https://safekit.eviden.com/pt-br/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Guia passo a passo: instale o módulo SafeKit mirror.safe no Linux para replicação em tempo real e failover automático da sua aplicação em dois servidores."
category: "quick-install"
lang: "pt-br"
topics: "Guia de Instalação Rápida de Alta Disponibilidade para Linux, Limitações SafeKit de Alta Disponibilidade, Visão geral da solução SafeKit/Linux, Instalação da solução SafeKit/Linux (mirror.safe), Configuração passo a passo da solução SafeKit/Linux, Demonstração da solução mirror SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-mirrorsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 30 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Instalar SafeKit para alta disponibilidade de Linux {#install-safekit-for-linux-high-availability}


{{%  insert-safekit-mirror-guide-pt-br app="Linux" mod="mirror"  %}}
 

## Visão geral da solução SafeKit/Linux {#overview-of-the-safekit--linux-solution}

As soluções são descritas aqui: **💡 [A mais simples alta disponibilidade Linux: replicação síncrona e failover de 2 nós](</pt-br/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## Instalação da solução SafeKit/Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Pré-requisitos {#prerequisites}

  * Você precisa que o aplicativo que deseja reiniciar no SafeKit esteja instalado em 2 nós (máquinas virtuais ou servidores físicos).



{{%  insert-safekit-installation-package-linux-pt-br app="" mod="mirror"  %}}
 

Observação: o módulo genérico **mirror.safe** que você vai configurar é entregue dentro do pacote.

## Configuração passo a passo da solução SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-pt-br app="Linux" mod="mirror"  %}}
 

## Demonstração da solução mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-pt-br  %}}

{{%  insert-safekit-hub-pt-br app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}