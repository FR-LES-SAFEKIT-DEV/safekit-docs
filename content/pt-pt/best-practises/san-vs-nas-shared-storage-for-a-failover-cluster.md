---
title: "SAN vs. NAS: Armazenamento Partilhado para Agrupamento de failover: Uma Comparação Detalhada"
canonical: "https://safekit.eviden.com/pt-pt/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Compare o armazenamento partilhado SAN e NAS para clusters de failover. SafeKit não necessita de armazenamento partilhado. Simplifica os scripts de failover e previne a corrupção de dados. Não requer hardware dispendioso nem um disco de quórum complexo."
category: "best-practises"
lang: "pt-pt"
topics: "Armazenamento partilhado SAN ou NAS: qual é o mais simples para um cluster de failover?, 🔍 Explore SafeKit"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 52 expressions"
---

# SAN vs. NAS: Armazenamento Partilhado para Agrupamento de failover: Uma Comparação Detalhada {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## Armazenamento partilhado SAN ou NAS: qual é o mais simples para um cluster de failover? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  Armazenamento partilhado SAN ou armazenamento partilhado iSCSI NAS para um cluster de failover {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![Armazenamento partilhado SAN ou armazenamento partilhado iSCSI NAS para um cluster de failover](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Vários elementos tornam esta arquitetura complexa de implementar:

  * Em caso de failover, a mudança do armazenamento partilhado requer comandos de baixo nível. Estes comandos dependem do fabricante do armazenamento.
  * Um procedimento de recuperação do sistema de ficheiros deve ser executado antes de a aplicação ser reiniciada.
  * Se os sistemas de ficheiros em ambos os nós acederem ao mesmo disco físico ao mesmo tempo, todo o sistema de ficheiros será corrompido.
  * Para evitar este acesso duplo, deve configurar um disco de quórum.


###  Armazenamento partilhado NAS SMB ou armazenamento partilhado NAS NFS para um cluster de failover {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![Armazenamento partilhado NAS SMB ou armazenamento partilhado NAS NFS para um cluster de failover](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Vários elementos tornam esta arquitetura simples de implementar:

  * Em caso de failover, a troca do armazenamento partilhado apenas requer a remontagem do sistema de ficheiros externo.
  * Não é necessário nenhum procedimento de recuperação do sistema de ficheiros antes de a aplicação ser reiniciada.
  * Se ambos os nós acederem ao mesmo sistema de ficheiros partilhado ao mesmo tempo, o sistema de ficheiros não será corrompido.
  * No entanto, quando os nós estão isolados, a mesma aplicação pode continuar a ser executada em ambos os nós. Esta execução dupla pode corromper os dados da aplicação no armazenamento partilhado.


###  Replicação e failover em tempo real com Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![Replicação e failover em tempo real com SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit não tem estes problemas. Com SafeKit, a replicação e failover não requerem armazenamento partilhado.

No entanto, se SafeKit tiver de gerir o armazenamento partilhado:

  * Utilize o armazenamento partilhado NAS SMB ou NAS NFS.
  * Coloque os comandos de montagem e desmontagem para o sistema de ficheiros externo nos scripts de reinicialização.
  * Configure o [checker split-brain](</pt-pt/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) SafeKit. Ele impede a execução dupla da mesma aplicação no armazenamento partilhado quando os nós estão isolados.



{{%  insert-safekit-hub-pt-pt  %}}

{{%  insert-safekit-4-buttons-pt-pt  %}}