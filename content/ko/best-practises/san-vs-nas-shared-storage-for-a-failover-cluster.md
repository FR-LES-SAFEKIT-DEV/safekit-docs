---
title: "SAN과 NAS 공유 스토리지의 장애 조치 클러스터링에 대한 상세 비교"
canonical: "https://safekit.eviden.com/ko/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "장애 조치 클러스터를 위한 SAN과 NAS 공유 스토리지를 비교해 보세요. SafeKit 고가의 하드웨어나 복잡한 쿼럼 디스크 없이도 공유 스토리지 의존성을 없애고, 장애 조치 스크립트를 간소화하며, 데이터 손상을 방지하는 SAN리스 아키텍처를 제안하는 이유를 알아보세요."
category: "best-practises"
lang: "ko"
topics: "장애 조치 클러스터를 위한 SAN과 NAS 공유 스토리지 중 가장 간단한 솔루션은 무엇입니까?, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# SAN과 NAS 공유 스토리지의 장애 조치 클러스터링: 상세 비교 {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## 장애 조치 클러스터에 SAN과 NAS 공유 스토리지 중 어떤 것이 가장 간단한 해결책일까요? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  SAN 공유 스토리지 또는 NAS iSCSI 공유 스토리지를 사용한 장애 조치 클러스터 {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![ SAN 공유 스토리지 또는 NAS iSCSI 공유 스토리지(장애 조치 클러스터용) ](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


이러한 아키텍처를 구현하기 복잡하게 만드는 요소는 여러 가지가 있습니다.

  * 장애 조치 시 공유 스토리지를 전환하려면 스토리지 제조업체에 따라 달라지는 저수준 명령어가 필요합니다.
  * 파일 시스템(FS) 복구 절차를 완료한 후에야 애플리케이션을 다시 시작할 수 있습니다.
  * 두 노드의 파일 시스템이 동시에 동일한 원시 디스크에 접근하면 전체 파일 시스템이 손상됩니다.
  * 이중 접근을 방지하려면 쿼럼 디스크를 구성해야 합니다.


###  장애 조치 클러스터용 NAS SMB 공유 스토리지 또는 NAS NFS 공유 스토리지 {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![ NAS SMB 공유 스토리지 또는 NAS NFS 공유 스토리지(장애 조치 클러스터용) ](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


이 아키텍처를 구현하기 쉽게 만드는 몇 가지 요소가 있습니다. 
  * 장애 조치 시 공유 스토리지를 전환한다는 것은 외부 파일 시스템을 다시 마운트하는 것만을 의미합니다.
  * 파일 시스템에 대한 복구 절차를 거치지 않고도 애플리케이션을 재시작할 수 있습니다.
  * 두 노드가 동시에 동일한 공유 파일 시스템에 접근하더라도 전체 파일 시스템이 손상되지는 않습니다.
  * 하지만 노드가 격리된 경우 동일한 애플리케이션이 두 번 실행되어 공유 스토리지의 데이터가 손상될 가능성이 여전히 존재합니다.


###  Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit} 사용한 실시간 복제 및 장애 조치


![ 실시간 복제 및 장애 조치 SafeKit ](/wp-content/uploads/2023/03/no-shared-storage.png "w:200") 포함)


SafeKit 의 경우 복제 및 장애 조치 솔루션에 공유 스토리지가 필요하지 않으므로 이러한 문제가 발생하지 않습니다.

하지만 SafeKit 공유 스토리지를 관리해야 하는 경우:

  * NAS SMB 공유 스토리지 또는 NAS NFS 공유 스토리지를 사용하십시오.
  * 재시작 스크립트에 외부 파일 시스템의 마운트/마운트 해제 코드를 추가하세요.
  * 노드가 격리된 경우 공유 스토리지에 액세스하는 동일한 애플리케이션이 두 번 실행되는 것을 방지하기 위해 [ SafeKit ](</ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) 스플릿 브레인 체커를 구성합니다.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}