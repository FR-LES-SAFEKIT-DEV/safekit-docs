---
title: "Almacenamiento compartido SAN frente a NAS para clústeres de conmutación por error: una comparación detallada"
canonical: "https://safekit.eviden.com/es/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Comparación entre almacenamiento compartido SAN y NAS para clústeres de conmutación por error. Descubre por qué SafeKit propone una arquitectura sin SAN que elimina las dependencias de almacenamiento compartido, simplifica los scripts de conmutación por error y previene la corrupción de datos sin necesidad de hardware costoso ni discos de quórum complejos."
category: "best-practises"
lang: "es"
topics: "¿Cuál es la solución más sencilla entre un almacenamiento compartido SAN y un NAS para un clúster de conmutación por error?, 🔍 SafeKit High Availability Navigation Hub"
---

# Almacenamiento compartido SAN frente a NAS para clústeres de conmutación por error: una comparación detallada {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## ¿Cuál es la solución más sencilla entre un almacenamiento compartido SAN y un NAS para un clúster de conmutación por error? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  Almacenamiento compartido SAN o almacenamiento compartido NAS iSCSI para un clúster de conmutación por error {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![ Almacenamiento compartido SAN o almacenamiento compartido NAS iSCSI para un clúster de conmutación por error ](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Existen varios elementos que hacen que esta arquitectura sea compleja de implementar:

  * En caso de conmutación por error, cambiar el almacenamiento compartido requiere instrucciones de bajo nivel que dependen del fabricante del almacenamiento.
  * El procedimiento de recuperación en el sistema de archivos (FS) debe completarse antes de reiniciar la aplicación.
  * Si ambos sistemas de archivos en ambos nodos acceden al mismo disco sin formato al mismo tiempo, todo el sistema de archivos se corromperá.
  * Para evitar un doble acceso, debe configurarse un disco de quórum.


###  Almacenamiento compartido NAS SMB o almacenamiento compartido NAS NFS para un clúster de conmutación por error {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![ Almacenamiento compartido NAS SMB o almacenamiento compartido NAS NFS para un clúster de conmutación por error ](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Existen varios elementos que hacen que esta arquitectura sea sencilla de implementar: 
  * En caso de conmutación por error, cambiar el almacenamiento compartido significa simplemente volver a montar el sistema de archivos externo,
  * No es necesario realizar ningún procedimiento de recuperación en el sistema de archivos antes de reiniciar la aplicación.
  * Si ambos nodos acceden al mismo sistema de archivos compartido al mismo tiempo, el sistema de archivos completo no se corromperá.
  * Sin embargo, aún existe la posibilidad de que una doble ejecución de la misma aplicación corrompa sus datos en el almacenamiento compartido cuando los nodos están aislados.


###  Replicación en tiempo real y conmutación por error con Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


Replicación en tiempo real y conmutación por error con ![ SafeKit ](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


No existen tales problemas con SafeKit porque su solución de replicación y conmutación por error no requiere un almacenamiento compartido.

Sin embargo, si SafeKit debe administrar un almacenamiento compartido:

  * utilice un almacenamiento compartido NAS SMB o un almacenamiento compartido NAS NFS,
  * Incluya en los scripts de reinicio el montaje/desmontaje del sistema de archivos externo,
  * Configure el comprobador de división de cerebro [ SafeKit ](</es/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) para evitar una doble ejecución de la misma aplicación que accede al almacenamiento compartido cuando los nodos están aislados.



{{%  insert-safekit-hub-es  %}}

{{%  insert-safekit-4-buttons-es  %}}