---
title: "Cómo implementar servidores redundantes con software HA sencillo"
canonical: "https://safekit.eviden.com/es/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Aprenda a implementar servidores redundantes con un enfoque sencillo basado únicamente en software. SafeKit propone una arquitectura sin SAN para Windows y Linux , que proporciona replicación de datos en tiempo real y conmutación por error automática sin necesidad de discos compartidos ni conocimientos informáticos especializados."
category: "best-practises"
lang: "es"
topics: "¿Cómo implementar servidores redundantes activos/pasivos con replicación en tiempo real y conmutación por error?, ¿Cómo implementar servidores redundantes activos/activos con equilibrio de carga de red y conmutación por error?, 🔍 SafeKit Centro de navegación de alta disponibilidad"
---

# Cómo implementar servidores redundantes con el software HA simple {#how-to-implement-redundant-servers-with-simple-ha-software}

## ¿Cómo implementar servidores redundantes activos/pasivos con replicación en tiempo real y conmutación por error? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### El clúster SafeKit mirror {#the-safekit-mirror-cluster}


![ Servidores redundantes con replicación de archivos en tiempo real y conmutación por error ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


En un clúster mirror , el software SafeKit se instala en dos servidores físicos o virtuales que ejecutan Windows o Linux (en las instalaciones o en la nube). El servidor principal es el servidor activo y ejecuta una aplicación crítica. El servidor secundario es un servidor redundante pasivo que recibe en tiempo real todas las modificaciones realizadas por la aplicación en sus archivos. Los clientes se conectan a una dirección IP virtual [ ](</es/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) . Si el servidor principal falla, SafeKit reinicia automáticamente la aplicación crítica en el servidor redundante pasivo, que pasa a ser el principal y cambia la dirección IP virtual. Cuando se reinicia el servidor que falló, se resincroniza automáticamente y se convierte en el servidor redundante pasivo que se ejecuta como secundario.

## ¿Cómo implementar servidores redundantes activos/activos con balanceo de carga de red y conmutación por error? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### El clúster SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#the-safekit-farm-cluster}


![ Servidores redundantes con balanceo de carga de red y conmutación por error ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


En un clúster <span class="notranslate farm-term" translate="no">farm</span> , el software SafeKit se instala en servidores redundantes que ejecutan Windows o Linux (en las instalaciones o en la nube). Todos los servidores redundantes están activos y ejecutan la misma aplicación front-end crítica. Los clientes se conectan a una dirección IP virtual [ ](</es/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>) . Las sesiones TCP se distribuyen mediante balanceo de carga entre todos los servidores redundantes. Si un servidor falla, SafeKit reconfigura automáticamente el balanceo de carga de las sesiones TCP entre los servidores activos restantes. Cuando se reinicia el servidor que falló, se reintegra automáticamente como un servidor redundante activo y recibe nuevas sesiones TCP.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}