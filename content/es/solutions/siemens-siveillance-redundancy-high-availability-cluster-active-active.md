---
title: "Alta disponibilidad y redundancia para Siemens Siveillance Suite: clúster sin SAN activo-activo"
canonical: "https://safekit.eviden.com/es/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/"
description: "Alta disponibilidad para la suite Siemens Siveillance: SafeKit replica máquinas virtuales Hyper-V entre dos servidores activos con conmutación por error automática."
category: "solutions"
lang: "es"
topics: "SafeKit para Siemens Siveillance: clúster Hyper-V sin SAN de 2 nodos, Índice, ¿Cómo implementa el software SafeKit un clúster de alta disponibilidad Siemens Siveillance sin almacenamiento compartido en una SAN?, ¿Cómo funciona el clúster SafeKit Siemens Siveillance?, Limitaciones de alta disponibilidad SafeKit, Comparación: SafeKit para Siemens Siveillance frente a la agrupación en clústeres nativa Hyper-V, Guía en vídeo: Configuración de un clúster HA SafeKit para Siemens Siveillance, SafeKit, una solución reconocida en el mercado de la seguridad, 🔍 Explora SafeKit"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.11 | Translation LLM | 25 expressions"
image: "/wp-content/uploads/2026/01/safekit-vm-repli-720-720.jpg"
schemaType: "TechArticle"
schemaApplications: ["Siemens Siveillance"]
---

# Alta disponibilidad y redundancia para Siemens Siveillance Suite: clúster sin SAN activo-activo {#high-availability-and-redundancy-for-siemens-siveillance-suite-active-active-sanless-clustering}


{{%  insert-safekit-hyperv-solution-mirror-es app="Siemens Siveillance"  %}}
 

### Notas {#notes}

  * Para Siveillance VMS y los servidores de grabación, utilice el mecanismo de conmutación por error integrado y no SafeKit. Los grabadores se pueden ejecutar a nivel de host en ambos servidores físicos, o en 2 máquinas virtuales en ambos servidores físicos (no replicados por SafeKit).
  * Existe otra solución para **💡 [Siemens Siveillance VMS](</es/solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/>)** a nivel de aplicación que puede funcionar en cualquier infraestructura (servidores físicos, cualquier hipervisor, incluido **VMware**...).



{{%  insert-safekit-siemens-license-es app="Siemens Desigo CC"  %}}

{{%  insert-safekit-security-case-es  %}}

{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}