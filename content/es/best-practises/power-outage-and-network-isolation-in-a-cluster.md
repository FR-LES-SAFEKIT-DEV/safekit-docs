---
title: "Gestión de cortes de energía y aislamiento de red en un clúster de alta disponibilidad."
canonical: "https://safekit.eviden.com/es/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Aprenda a gestionar el aislamiento de la red y las interrupciones de energía en un clúster de alta disponibilidad. SafeKit propone una arquitectura sin SAN con comprobadores de división de clúster integrados y resincronización automática para garantizar la integridad de los datos y un funcionamiento ininterrumpido (24/7) sin necesidad de un disco compartido."
category: "best-practises"
lang: "es"
topics: "¿Cuáles son los diferentes escenarios en caso de aislamiento de red en un clúster?, ¿Cuáles son los diferentes escenarios en caso de un corte de energía en un clúster?, 🔍 SafeKit Centro de navegación de alta disponibilidad"
---

# Gestión de cortes de energía y aislamiento de red en un clúster HA {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-es  %}}
 

## ¿Cuáles son los diferentes escenarios en caso de un corte de energía en un clúster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

### Apagón del nodo principal {#primary-node-power-outage}

Cuando un corte de energía detiene solo el nodo principal:

  * Hay una conmutación por error automática en el nodo secundario, que se convierte en ALONE y reinicia la aplicación,
  * Cuando se reinicia el nodo 1, se convierte en SEDOND después de la resincronización de los datos replicados.
  * Los roles de principal y secundario pueden ser intercambiados por un administrador si es necesario.


### Apagón del nodo secundario {#secondary-node-power-outage}

Cuando un corte de energía detiene solo el nodo secundario:

  * No hay conmutación por error, el nodo principal se convierte en SOLO y la aplicación continúa su ejecución en el nodo 1.
  * Cuando se reinicia el nodo 2, se convierte en SEDOND después de la resincronización de los datos replicados.


### Apagón general - caso 1 {#general-power-outage---case-1}

Cuando un corte de energía detiene ambos nodos, el comportamiento predeterminado es:

  * ambos nodos van a STOP,
  * Cuando se reinicia el nodo 1, no entra en estado SOLO y no reinicia la aplicación porque no sabe si tiene los datos actualizados. Por lo tanto, pasa al estado ESPERA esperando el reinicio del otro nodo.
  * Cuando se reinicia el nodo 2, ambos nodos vuelven a sus estados PRIM/SEGUNDO anteriores.


### Apagón general - caso 2 {#general-power-outage---case-2}

Cuando un corte de energía detiene ambos nodos, el comportamiento con syncdelta es:

  * syncdelta se establece, por ejemplo, en 10 minutos en la configuración, lo que significa que se acepta el inicio de un nodo incluso si sus datos están 10 minutos atrasados con respecto a la última sincronización.
  * Cuando se reinicia el nodo 1, pasa a ALONE y reinicia la aplicación suponiendo que el reinicio se realiza dentro de los 10 minutos posteriores al fallo de alimentación,
  * cuando se reinicia el nodo 2, se convierte en SEGUNDO después de la resincronización de los datos replicados,
  * Nota: si el nodo 2 se reinicia primero, entonces se convierte en SOLO y el nodo 1 se convertirá en SEGUNDO al iniciarse.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}