---
title: "SAN vs. NAS: Armazenamento Compartilhado para Clustering de Failover: Uma Comparação Detalhada"
canonical: "https://safekit.eviden.com/pt-br/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Compare o armazenamento compartilhado SAN com o NAS para clusters de failover. Saiba por que SafeKit propõe uma arquitetura sem SAN que elimina a dependência de armazenamento compartilhado, simplifica os scripts de failover e evita a corrupção de dados sem hardware caro ou discos de quorum complexos."
category: "best-practises"
lang: "pt-br"
topics: "Qual é a solução mais simples entre um armazenamento compartilhado SAN e um NAS para um cluster de failover?, 🔍 SafeKit Hub de Navegação de Alta Disponibilidade"
---

# SAN vs. NAS: Armazenamento Compartilhado para Clustering de Failover: Uma Comparação Detalhada {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## Qual é a solução mais simples entre um armazenamento compartilhado SAN e um NAS para um cluster de failover? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  Armazenamento compartilhado SAN ou armazenamento compartilhado NAS iSCSI para um cluster de failover {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![ Armazenamento compartilhado SAN ou armazenamento compartilhado NAS iSCSI para um cluster de failover ](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Existem diversos elementos que tornam essa arquitetura complexa de implementar:

  * Em caso de falha, a troca do armazenamento compartilhado requer instruções de baixo nível que dependem do fabricante do dispositivo de armazenamento.
  * O procedimento de recuperação no sistema de arquivos (FS) deve ser concluído antes de reiniciar o aplicativo.
  * Se ambos os sistemas de arquivos em ambos os nós acessarem o mesmo disco bruto ao mesmo tempo, todo o sistema de arquivos será corrompido.
  * Para evitar acesso duplicado, é necessário configurar um disco de quorum.


###  Armazenamento compartilhado NAS SMB ou armazenamento compartilhado NAS NFS para um cluster de failover {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![ Armazenamento compartilhado NAS SMB ou armazenamento compartilhado NAS NFS para um cluster de failover ](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Existem diversos elementos que tornam essa arquitetura simples de implementar: 
  * Em caso de falha, a troca do armazenamento compartilhado significa apenas remontar o sistema de arquivos externo.
  * Não é necessário executar nenhum procedimento de recuperação no sistema de arquivos antes de reiniciar o aplicativo.
  * Se ambos os nós acessarem o mesmo sistema de arquivos compartilhado ao mesmo tempo, o sistema de arquivos completo não será corrompido.
  * No entanto, ainda existe a possibilidade de uma execução dupla da mesma aplicação corromper seus dados no armazenamento compartilhado quando os nós estão isolados.


###  Replicação e failover em tempo real com Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


Replicação em tempo real e failover com ![ e SafeKit ](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


Não existem esses problemas com SafeKit porque sua solução de replicação e failover não requer armazenamento compartilhado.

No entanto, se SafeKit precisar gerenciar um armazenamento compartilhado:

  * Utilize um armazenamento compartilhado SMB em um NAS ou um armazenamento compartilhado NFS em um NAS.
  * Inclua nos scripts de reinicialização a montagem/desmontagem do sistema de arquivos externo.
  * Configure os verificadores de split brain [ SafeKit ](</pt-br/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) para evitar a execução dupla do mesmo aplicativo acessando o armazenamento compartilhado quando os nós estiverem isolados.



{{%  insert-safekit-hub-pt-br  %}}

{{%  insert-safekit-4-buttons-pt-br  %}}