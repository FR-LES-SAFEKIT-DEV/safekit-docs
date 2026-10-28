---
title: "SafeKit Architectures"
canonical: "https://safekit.eviden.com/ar/architectures/"
description: "استكشف بنى التوافر العالي مع SafeKit . تعرّف على مجموعات Mirror و Farm و Farm + Mirror لتجاوز أعطال التطبيقات وموازنة الأحمال بدون شبكة تخزين (SAN)."
category: "architectures"
lang: "ar"
topics: "ما هي بنى التوافر العالي المختلفة ومجموعات البرامج المختلفة مع SafeKit ؟، كيف يتم إنشاء مجموعات عالية التوافر باستخدام SafeKit ؟، 🔍 مركز التنقل عالي التوافر SafeKit"
---

# SafeKit Architectures {#safekit-architectures}

## ما هي بنى التوافر العالي المختلفة ومجموعات البرامج المختلفة التي تستخدم SafeKit ؟ {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### مجموعة Mirror مجموعة {#mirror-cluster}


![ SafeKit mirror cluster ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[ مزيد من المعلومات ](</ar/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### مجموعة `Farm` مجموعة {#farm-cluster}


![ SafeKit farm cluster ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[ مزيد من المعلومات ](</ar/architectures/network-load-balancing-cluster/>)

### `Farm` + mirror مجموعة {#farmmirror-cluster}


![ farm SafeKit + mirror cluster ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[ مزيد من المعلومات ](</architectures/clustering-software-load-balancing-mirroring/>)

### مجموعة نشطة/نشطة {#activeactive-cluster}


![ SafeKit مجموعة نشطة نشطة مع نسخ متماثل في الوقت الحقيقي ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[ مزيد من المعلومات ](</architectures/active-active-cluster-real-time-replication/>)

### مجموعة N-1 {#n-1-cluster}


![ SafeKit مجموعة تكرار N-1 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[ مزيد من المعلومات ](</architectures/n-1-redundancy/>)

## كيفية إنشاء مجموعات عالية التوافر باستخدام SafeKit ؟ {#how-to-build-high-availability-clusters-with-safekit}

### استخدم وحدات التوافر العالي {#use-high-availability-modules}

وحدة التوافر العالي هي تخصيص لوحدة SafeKit لتطبيق معين. يوجد نوعان من الوحدات: وحدة mirror التي تتميز بنسخ البيانات في الوقت الفعلي والتحويل التلقائي في حالة الأعطال، ووحدة `farm` التي تتميز بموازنة الأحمال والتحويل التلقائي في حالة الأعطال.

إذا قمت بنشر وحدة mirror على خادمين، فستقوم بإنشاء مجموعة mirror ، وإذا قمت بنشر وحدة `farm` على N خادم، فستقوم بإنشاء مجموعة `farm` .

يمكن نشر العديد من وحدات التطبيق على نفس الخوادم. وبالتالي، يمكن تنفيذ بنى التجميع المتقدمة مثل تلك المعروضة سابقًا ( `farm` + mirror ، نشط/نشط، N-1).

### ما هي وحدة التطبيق؟ {#what-is-an-application-module}

عمليًا، وحدة التطبيق عبارة عن ملف ".Safe" (من نوع zip) يتضمن ما يلي:

1- ملف التكوين userconfig.xml الذي يحتوي على:

  * أسماء أو عناوين IP الفعلية للخوادم،
  * اسم أو عنوان IP الظاهري للمجموعة،
  * مجلدات الملفات المراد نسخها في الوقت الفعلي (لوحدة mirror )،
  * معايير موازنة أحمال الشبكة (لوحدة `farm` )،
  * تكوين أجهزة كشف أعطال البرامج والأجهزة


2- البرامج النصية لبدء وإيقاف التطبيق.

### نشر وحدات عالية التوافر بسهولة تامة {#plug-and-play-deployment-of-high-availability-modules}

بمجرد تهيئة وحدة التطبيق واختبارها مع التطبيق، لا يتطلب النشر أي مهارات تقنية معلومات محددة:

  1. قم بتثبيت التطبيق على خادمين قياسيين (فعليين أو افتراضيين)،
  2. قم بتثبيت برنامج SafeKit على كلا الخادمين،
  3. قم بتثبيت وحدة التطبيق على كلا الخادمين.



{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}