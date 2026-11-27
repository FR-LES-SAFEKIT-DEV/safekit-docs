---
title: "Cómo implementar servidores redundantes con un software de alta disponibilidad sencillo"
canonical: "https://safekit.eviden.com/es/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Cómo implementar servidores redundantes solo con software: SafeKit ofrece replicación en tiempo real y conmutación automática en Windows y Linux, sin disco compartido."
category: "best-practises"
lang: "es"
topics: "¿Cómo implementar servidores redundantes activos/pasivos con replicación en tiempo real y conmutación por error?, ¿Cómo implementar servidores redundantes activos/activos con equilibrio de carga de red y conmutación por error?"
hashpart: "how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover, how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# Cómo implementar servidores redundantes con un software de alta disponibilidad sencillo {#how-to-implement-redundant-servers-with-simple-ha-software}

## ¿Cómo implementar servidores redundantes activos/pasivos con replicación en tiempo real y conmutación por error? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### El clúster mirror SafeKit {#the-safekit-mirror-cluster}


![Servidores redundantes con replicación de archivos en tiempo real y conmutación por error](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


En un clúster mirror, el software SafeKit se instala en dos servidores. Los servidores son físicos o virtuales. Ejecutan Windows o Linux, en las instalaciones o en la nube. El servidor principal es el servidor activo. Ejecuta la aplicación crítica. El servidor secundario es un servidor redundante pasivo. Recibe en tiempo real todos los cambios realizados por la aplicación en sus archivos. Los clientes se conectan a una [dirección IP virtual](</es/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Si el servidor principal falla, SafeKit reinicia automáticamente la aplicación crítica en el servidor secundario. Este servidor se convierte en principal y asume la dirección IP virtual. Cuando el servidor fallido se reinicia, SafeKit resincroniza automáticamente sus datos. Este servidor se convierte entonces en el servidor redundante pasivo, en estado secundario.

## ¿Cómo implementar servidores redundantes activos/activos con equilibrio de carga de red y conmutación por error? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### El clúster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#the-safekit-farm-cluster}


![Servidores redundantes con equilibrio de carga de red y conmutación por error](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


En un clúster <span class="notranslate farm-term" translate="no">farm</span>, el software SafeKit se instala en varios servidores redundantes. Los servidores ejecutan Windows o Linux, en las instalaciones o en la nube. Todos los servidores redundantes están activos. Ejecutan la misma aplicación crítica de interfaz. Los clientes se conectan a una [dirección IP virtual](</es/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). Las sesiones TCP se distribuyen entre todos los servidores redundantes. Si un servidor falla, SafeKit reconfigura automáticamente el equilibrio de carga de las sesiones TCP entre los servidores activos restantes. Cuando el servidor fallido se reinicia, SafeKit lo reintegra automáticamente como un servidor redundante activo. Este servidor recibe entonces nuevas sesiones TCP.


{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}