---
title: "مجموعة التكرار N-1: توافر عالٍ لتطبيقات متعددة باستخدام خادم احتياطي واحد"
canonical: "https://safekit.eviden.com/ar/architectures/n-1-redundancy/"
description: "تكرار N-1 مع SafeKit: يتشارك N تطبيقًا على N+1 خادمًا خادمًا احتياطيًا واحدًا، مع نسخ في الوقت الفعلي وتجاوز فشل تلقائي، دون SAN."
category: "architectures"
lang: "ar"
topics: "التوافر العالي مع تكرار البيانات وتحويل التطبيقات من N خادم إلى خادم واحد"
hashpart: "high-availability-with-data-replication-and-application-failover-from-n-servers-to-1"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 44 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# مجموعة التكرار N-1: توافر عالٍ لتطبيقات متعددة باستخدام خادم احتياطي واحد {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## التوافر العالي مع تكرار البيانات وتحويل التطبيقات من N خادم إلى خادم واحد {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### التكرار N-1 {#n-1-redundancy}


![مجموعة تكرار N-1 باستخدام SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### كيف يعمل نظام التكرار N-1؟ {#how-the-n-1-redundancy-works}

يوفر SafeKit مجموعة تكرار بسيطة من نوع N-1: حيث تعمل N تطبيقات على N خوادم أساسية، ويتولى خادم احتياطي واحد العمل في حالة حدوث عطل. في مجموعة تكرار SafeKit من نوع N-1، يعمل كل تطبيق على أدلته المكررة الخاصة به.

على عكس [المجموعات النشطة-النشطة](</ar/architectures/active-active-cluster-real-time-replication/>)، عندما يتعطل أحد الخوادم الأساسية، لا يضطر الخادم الاحتياطي إلى التعامل مع عبء عمل مضاعف.

يفترض هذا أن خادمًا أساسيًا واحدًا فقط يتعطل في كل مرة في مجموعة التكرار N-1. يمكن للحل أيضًا التعامل مع العديد من حالات فشل الخادم الأساسي في نفس الوقت. في هذه الحالة، يقوم الخادم الاحتياطي الوحيد بتشغيل عبء العمل المجمع لجميع الخوادم المعطلة.

### كيفية تطبيق التكرار من نوع N-1؟ {#how-to-implement-n-1-redundancy}

لتكوين مجموعة تكرار SafeKit N-1، ما عليك سوى نشر N من وحدات mirror على N+1 خادمًا.

ملاحظات:

  * يجب تثبيت جميع التطبيقات (Appli1، Appli2، Appli3) على الخادم الاحتياطي لتجاوز الأعطال في التطبيق.
  * لكل وحدة mirror عنوان IP ظاهري خاص بها، ودلائل ملفات مكررة خاصة بها، ونصوص استرداد خاصة بها.



{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}