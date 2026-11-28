---
title: "SAN vs. NAS para um cluster de failover"
canonical: "https://safekit.eviden.com/pt-br/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Armazenamento compartilhado SAN vs NAS para clusters de failover: limites, custos e riscos, e por que a replicação SafeKit dispensa o armazenamento compartilhado."
category: "best-practises"
lang: "pt-br"
topics: "Armazenamento compartilhado SAN ou NAS: qual é o mais simples para um cluster de failover?"
hashpart: "what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# SAN vs. NAS para um cluster de failover {#san-vs-nas-for-a-failover-cluster}

## Armazenamento compartilhado SAN ou NAS: qual é o mais simples para um cluster de failover? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  Armazenamento compartilhado SAN ou armazenamento compartilhado iSCSI NAS para um cluster de failover {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![Armazenamento compartilhado SAN ou armazenamento compartilhado iSCSI NAS para um cluster de failover](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Vários elementos tornam essa arquitetura complexa de implementar:

  * Em caso de failover, a troca do armazenamento compartilhado requer comandos de baixo nível. Esses comandos dependem do fabricante do armazenamento.
  * Um procedimento de recuperação do sistema de arquivos deve ser executado antes que o aplicativo seja reiniciado.
  * Se os sistemas de arquivos em ambos os nós acessarem o mesmo disco físico ao mesmo tempo, todo o sistema de arquivos será corrompido.
  * Para evitar esse acesso duplo, você deve configurar um disco de quórum.


###  Armazenamento compartilhado NAS SMB ou armazenamento compartilhado NAS NFS para um cluster de failover {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![Armazenamento compartilhado NAS SMB ou armazenamento compartilhado NAS NFS para um cluster de failover](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Vários elementos tornam essa arquitetura simples de implementar:

  * Em caso de failover, a troca do armazenamento compartilhado requer apenas a remontagem do sistema de arquivos externo.
  * Não é necessário nenhum procedimento de recuperação do sistema de arquivos antes que o aplicativo seja reiniciado.
  * Se ambos os nós acessarem o mesmo sistema de arquivos compartilhado ao mesmo tempo, o sistema de arquivos não será corrompido.
  * No entanto, quando os nós são isolados, o mesmo aplicativo ainda pode ser executado em ambos os nós. Essa execução dupla pode corromper os dados do aplicativo no armazenamento compartilhado.


###  Replicação e failover em tempo real com Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![Replicação e failover em tempo real com SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit não tem esses problemas. Com SafeKit, a replicação e failover não exigem armazenamento compartilhado.

No entanto, se SafeKit precisar gerenciar o armazenamento compartilhado:

  * Use o armazenamento compartilhado NAS SMB ou NAS NFS.
  * Coloque os comandos de montagem e desmontagem para o sistema de arquivos externo nos scripts de reinicialização.
  * Configure o [checker split-brain](</pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) SafeKit. Ele evita a execução dupla do mesmo aplicativo no armazenamento compartilhado quando os nós estão isolados.



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}