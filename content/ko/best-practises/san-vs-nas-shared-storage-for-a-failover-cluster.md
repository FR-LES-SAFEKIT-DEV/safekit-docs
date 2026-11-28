---
title: "장애 조치 클러스터용 SAN vs. NAS"
canonical: "https://safekit.eviden.com/ko/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "장애 조치 클러스터용 SAN과 NAS 공유 스토리지 비교: 한계, 비용, 위험, 그리고 SafeKit 복제로 공유 스토리지가 필요 없는 이유."
category: "best-practises"
lang: "ko"
topics: "SAN 또는 NAS 공유 스토리지: 장애 조치 클러스터에 더 간단한 것은 무엇일까요?"
hashpart: "what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# 장애 조치 클러스터용 SAN vs. NAS {#san-vs-nas-for-a-failover-cluster}

## SAN 또는 NAS 공유 스토리지: 장애 조치 클러스터에 더 간단한 것은 무엇일까요? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  장애 조치 클러스터용 SAN 공유 스토리지 또는 NAS iSCSI 공유 스토리지 {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![장애 조치 클러스터용 SAN 공유 스토리지 또는 NAS iSCSI 공유 스토리지](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


이 아키텍처를 구현하기 어렵게 만드는 몇 가지 요소는 다음과 같습니다:

  * 장애 조치 시 공유 스토리지를 전환하려면 낮은 수준의 명령이 필요합니다. 이러한 명령은 스토리지 제조업체에 따라 달라집니다.
  * 애플리케이션을 다시 시작하기 전에 파일 시스템 복구 절차를 실행해야 합니다.
  * 두 노드의 파일 시스템이 동시에 동일한 원시 디스크에 액세스하면 전체 파일 시스템이 손상됩니다.
  * 이러한 이중 액세스를 방지하려면 쿼럼 디스크를 구성해야 합니다.


###  장애 조치 클러스터용 NAS SMB 공유 스토리지 또는 NAS NFS 공유 스토리지 {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![장애 조치 클러스터용 NAS SMB 공유 스토리지 또는 NAS NFS 공유 스토리지](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


몇 가지 요소 덕분에 이 아키텍처를 구현하기 쉽습니다:

  * 장애 조치 시 공유 스토리지를 전환하려면 외부 파일 시스템을 다시 마운트하기만 하면 됩니다.
  * 애플리케이션을 다시 시작하기 전에 파일 시스템 복구 절차가 필요하지 않습니다.
  * 두 노드가 동시에 동일한 공유 파일 시스템에 액세스하더라도 파일 시스템이 손상되지 않습니다.
  * 그러나 노드가 격리된 경우에도 동일한 애플리케이션을 두 노드 모두에서 실행할 수 있습니다. 이 이중 실행은 공유 스토리지의 애플리케이션 데이터를 손상시킬 수 있습니다.


###  Eviden SafeKit을 사용한 실시간 복제 및 장애 조치 {#real-time-replication-and-failover-with-eviden-safekit}


![SafeKit을 이용한 실시간 복제 및 장애 조치](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit은 이러한 문제가 없습니다. SafeKit을 사용하면 복제 및 장애 조치에 공유 스토리지가 필요하지 않습니다.

그러나 SafeKit이 공유 스토리지를 관리해야 하는 경우:

  * NAS SMB 또는 NAS NFS 공유 스토리지를 사용하세요.
  * 외부 파일 시스템에 대한 마운트 및 언마운트 명령을 재시작 스크립트에 넣으십시오.
  * SafeKit [스플릿 브레인 체커](</ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)를 구성합니다. 노드가 격리된 경우 공유 스토리지에서 동일한 애플리케이션이 이중으로 실행되는 것을 방지합니다.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}