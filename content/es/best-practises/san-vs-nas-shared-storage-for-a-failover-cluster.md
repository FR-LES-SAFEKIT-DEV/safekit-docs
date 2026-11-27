---
title: "SAN vs. NAS: almacenamiento compartido para clústeres de conmutación por error. Una comparación detallada"
canonical: "https://safekit.eviden.com/es/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Almacenamiento compartido SAN frente a NAS para clústeres de conmutación por error: límites, costes y riesgos, y por qué la replicación SafeKit lo hace innecesario."
category: "best-practises"
lang: "es"
topics: "Almacenamiento compartido SAN o NAS: ¿cuál es más sencillo para un clúster de conmutación por error?"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# SAN vs. NAS: almacenamiento compartido para clústeres de conmutación por error. Una comparación detallada {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## Almacenamiento compartido SAN o NAS: ¿cuál es más sencillo para un clúster de conmutación por error? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  Almacenamiento compartido SAN o almacenamiento compartido NAS iSCSI para un clúster de conmutación por error {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![Almacenamiento compartido SAN o almacenamiento compartido NAS iSCSI para un clúster de conmutación por error](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Varios elementos hacen que esta arquitectura sea compleja de implementar:

  * En caso de conmutación por error, el cambio del almacenamiento compartido requiere comandos de bajo nivel. Estos comandos dependen del fabricante del almacenamiento.
  * El procedimiento de recuperación del sistema de archivos debe ejecutarse antes de que se reinicie la aplicación.
  * Si los sistemas de archivos de ambos nodos acceden al mismo disco físico al mismo tiempo, todo el sistema de archivos se corrompe.
  * Para evitar este doble acceso, debe configurar un disco de quórum.


###  Almacenamiento compartido NAS SMB o almacenamiento compartido NAS NFS para un clúster de conmutación por error {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![Almacenamiento compartido NAS SMB o almacenamiento compartido NAS NFS para un clúster de conmutación por error](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Varios elementos hacen que esta arquitectura sea sencilla de implementar:

  * En caso de conmutación por error, el cambio del almacenamiento compartido solo requiere volver a montar el sistema de archivos externo.
  * No se requiere ningún procedimiento de recuperación del sistema de archivos antes de que la aplicación se reinicie.
  * Si ambos nodos acceden al mismo sistema de archivos compartido al mismo tiempo, el sistema de archivos no se corrompe.
  * Sin embargo, cuando los nodos están aislados, la misma aplicación puede seguir ejecutándose en ambos nodos. Esta doble ejecución puede dañar los datos de la aplicación en el almacenamiento compartido.


###  Replicación y conmutación por error en tiempo real con Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![Replicación y conmutación por error en tiempo real con SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit no presenta estos problemas. Con SafeKit, la replicación y la conmutación por error no requieren almacenamiento compartido.

Sin embargo, si SafeKit debe gestionar el almacenamiento compartido:

  * Utilice el almacenamiento compartido NAS SMB o NAS NFS.
  * Coloque los comandos mount y umount para el sistema de archivos externo en los scripts de reinicio.
  * Configure el [checker split-brain](</es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) SafeKit. Evita la doble ejecución de la misma aplicación en el almacenamiento compartido cuando los nodos están aislados.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}