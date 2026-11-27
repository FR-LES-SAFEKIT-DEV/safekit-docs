---
title: "Gestión de cortes de energía y aislamiento de la red en un clúster de alta disponibilidad"
canonical: "https://safekit.eviden.com/es/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Cortes de energía y aislamiento de red en un clúster de alta disponibilidad: el checker split-brain y la resincronización automática de SafeKit protegen sus datos."
category: "best-practises"
lang: "es"
topics: "¿Cuáles son los diferentes escenarios en caso de un corte de energía en un clúster?"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Gestión de cortes de energía y aislamiento de la red en un clúster de alta disponibilidad {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-es  %}}
 

## ¿Cuáles son los diferentes escenarios en caso de un corte de energía en un clúster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

En los siguientes escenarios, el nodo 1 es inicialmente el nodo principal. El nodo 2 es inicialmente el nodo secundario.

### Corte de energía del nodo principal {#primary-node-power-outage}

Cuando un corte de energía detiene solo el nodo principal:

  * SafeKit conmuta automáticamente al nodo secundario. El nodo 2 se convierte en ALONE y reinicia la aplicación.
  * Cuando el nodo 1 se reinicia, resincroniza los datos replicados. Luego se convierte en SECOND.
  * Si es necesario, un administrador puede intercambiar los roles principal y secundario.


### Corte de energía del nodo secundario {#secondary-node-power-outage}

Cuando un corte de energía detiene solo el nodo secundario:

  * No se produce ninguna conmutación por error. El nodo 1 se convierte en ALONE. La aplicación continúa ejecutándose en el nodo 1.
  * Cuando el nodo 2 se reinicia, resincroniza los datos replicados. Luego se convierte en SECOND.


### Corte de energía en ambos nodos - caso 1 {#general-power-outage---case-1}

Cuando un corte de energía detiene ambos nodos, el comportamiento predeterminado es el siguiente:

  * Ambos nodos pasan al estado STOP.
  * Cuando el nodo 1 se reinicia, no pasa al estado ALONE. No reinicia la aplicación. No puede saber si sus datos están actualizados. Por lo tanto, pasa al estado WAIT y espera a que el otro nodo se reinicie.
  * Cuando el nodo 2 se reinicia, ambos nodos vuelven a sus estados anteriores: PRIM y SECOND.


### Corte de energía en ambos nodos - caso 2 {#general-power-outage---case-2}

Cuando un corte de energía detiene ambos nodos, el comportamiento con el parámetro `syncdelta` es el siguiente:

  * En este ejemplo, `syncdelta` se establece en 10 minutos en la configuración. Un nodo puede iniciarse incluso si sus datos están hasta 10 minutos por detrás de la última sincronización.
  * Cuando el nodo 1 se reinicia en un plazo de 10 minutos tras el corte de energía, pasa al estado ALONE. Reinicia la aplicación.
  * Cuando el nodo 2 se reinicia, resincroniza los datos replicados. Luego se convierte en SECOND.
  * Nota: si el nodo 2 se reinicia primero, se convierte en ALONE. El nodo 1 se convierte entonces en SECOND cuando se inicia.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}