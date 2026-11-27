---
title: "مقارنة مفصلة بين التخزين المشترك من نوع SAN وNAS لتجميعات تجاوز الفشل"
canonical: "https://safekit.eviden.com/ar/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "التخزين المشترك SAN مقابل NAS لمجموعات تجاوز الفشل: الحدود والتكاليف والمخاطر، ولماذا يلغي النسخ في SafeKit الحاجة إلى التخزين المشترك."
category: "best-practises"
lang: "ar"
topics: "التخزين المشترك من نوع SAN أو NAS: أيهما أبسط لمجموعة تجاوز الفشل؟"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 44 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# مقارنة مفصلة بين التخزين المشترك من نوع SAN وNAS لتجميعات تجاوز الفشل {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## التخزين المشترك من نوع SAN أو NAS: أيهما أبسط لمجموعة تجاوز الفشل؟ {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  تخزين SAN مشترك أو تخزين NAS iSCSI مشترك لمجموعة تجاوز الفشل {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![تخزين SAN مشترك أو تخزين NAS iSCSI مشترك لمجموعة تجاوز الفشل](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


هناك عدة عناصر تجعل هذه البنية معقدة التنفيذ:

  * عند تجاوز الفشل، يتطلب تبديل وحدة التخزين المشتركة أوامر منخفضة المستوى. وتعتمد هذه الأوامر على الشركة المصنعة لوحدة التخزين.
  * يجب تشغيل إجراء استعادة نظام الملفات قبل إعادة تشغيل التطبيق.
  * إذا وصلت أنظمة الملفات على كلتا العقدتين إلى القرص الخام نفسه في الوقت نفسه، فسيتم إتلاف نظام الملفات بأكمله.
  * لتجنب هذا الوصول المزدوج، يجب عليك تكوين قرص نصاب.


###  وحدة تخزين مشتركة من نوع NAS SMB أو وحدة تخزين مشتركة من نوع NAS NFS لمجموعة تجاوز الفشل {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![وحدة تخزين مشتركة من نوع NAS SMB أو وحدة تخزين مشتركة من نوع NAS NFS لمجموعة تجاوز الفشل](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


هناك عدة عناصر تجعل هذه البنية سهلة التنفيذ:

  * عند حدوث فشل، يتطلب تبديل وحدة التخزين المشتركة فقط إعادة تحميل نظام الملفات الخارجي.
  * لا يلزم إجراء استرداد لنظام الملفات قبل إعادة تشغيل التطبيق.
  * إذا قامت كلتا العقدتين بالوصول إلى نظام الملفات المشترك نفسه في الوقت نفسه، فلن يتعرض نظام الملفات للتلف.
  * ومع ذلك، عندما تكون العُقد معزولة، لا يزال بإمكان نفس التطبيق العمل على كلتا العُقدتين. يمكن أن يؤدي هذا التنفيذ المزدوج إلى إتلاف بيانات التطبيق في وحدة التخزين المشتركة.


###  النسخ المتماثل في الوقت الفعلي وتجاوز الفشل باستخدام Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![النسخ المتماثل في الوقت الفعلي وتجاوز الأعطال باستخدام SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


لا يواجه SafeKit هذه المشكلات. فمع SafeKit، لا يتطلب النسخ المتماثل وتجاوز الفشل مساحة تخزين مشتركة.

ومع ذلك، إذا كان على SafeKit إدارة التخزين المشترك:

  * استخدم التخزين المشترك NAS SMB أو NAS NFS.
  * ضع أوامر التحميل وإلغاء التحميل لنظام الملفات الخارجي في نصوص إعادة التشغيل.
  * قم بتهيئة [مدقق split-brain](</ar/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) SafeKit. فهي تمنع التنفيذ المزدوج لنفس التطبيق على وحدة التخزين المشتركة عند عزل العُقد.



{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}