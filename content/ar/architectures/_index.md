---
title: "بُنى SafeKit"
canonical: "https://safekit.eviden.com/ar/architectures/"
description: "استكشف معماريات التوافر العالي باستخدام SafeKit. تعرّف على مجموعات Mirror و Farm و Farm + مجموعات mirror لتجاوز الأعطال في التطبيقات بدون شبكة SAN وتحقيق توازن الأحمال."
category: "architectures"
lang: "ar"
topics: "ما هي معماريات التوافر العالي المختلفة ومجموعات البرامج المختلفة مع SafeKit؟، كيف يمكن بناء مجموعات التوافر العالي باستخدام SafeKit؟، 🔍 مركز تنقل SafeKit للتوافر العالي"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 17 expressions"
---

# بُنى SafeKit {#safekit-architectures}

## ما هي معماريات التوافر العالي المختلفة ومجموعات البرامج المختلفة مع SafeKit؟ {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### مجموعة mirror {#mirror-cluster}


![مجموعة mirror](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[مزيد من المعلومات](</ar/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### مجموعة <span class="notranslate farm-term" translate="no">farm</span> {#farm-cluster}


![مجموعة farm SafeKit](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[مزيد من المعلومات](</ar/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + مجموعة mirror {#farmmirror-cluster}


![مجموعة SafeKit farm + مجموعة mirror](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[مزيد من المعلومات](</ar/architectures/clustering-software-load-balancing-mirroring/>)

### مجموعة نشطة/نشطة {#activeactive-cluster}


![مجموعة SafeKit النشطة النشطة مع النسخ المتماثل في الوقت الفعلي](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[مزيد من المعلومات](</ar/architectures/active-active-cluster-real-time-replication/>)

### مجموعة N-1 {#n-1-cluster}


![مجموعة التكرار SafeKit N-1](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[مزيد من المعلومات](</ar/architectures/n-1-redundancy/>)

## كيفية بناء مجموعات عالية التوافر باستخدام SafeKit؟ {#how-to-build-high-availability-clusters-with-safekit}

### استخدم وحدات توفر عالية {#use-high-availability-modules}

وحدة التوافر العالي هي تخصيص لبرنامج SafeKit لتطبيق ما. هناك نوعان من الوحدات: وحدة mirror مع النسخ المتماثل للبيانات في الوقت الفعلي وتجاوز الفشل، ووحدة <span class="notranslate farm-term" translate="no">farm</span> مع موازنة التحميل وتجاوز الفشل.

إذا قمت بنشر وحدة mirror على خادمين، فإنك تنشئ مجموعة mirror، وإذا قمت بنشر وحدة <span class="notranslate farm-term" translate="no">farm</span> على عدد N من الخوادم، فإنك تنشئ مجموعة <span class="notranslate farm-term" translate="no">farm</span>.

يمكن نشر العديد من وحدات التطبيق على نفس الخوادم. وبالتالي، يمكن تنفيذ بنى تجميع متقدمة مثل تلك التي تم عرضها سابقًا (<span class="notranslate farm-term" translate="no">farm</span> + mirror، نشط/نشط، N-1).

### ما هي وحدة التطبيق؟ {#what-is-an-application-module}

من الناحية العملية، تكون وحدة التطبيق عبارة عن ملف ".Safe" (من نوع zip) يتضمن:

1 - ملف التكوين userconfig.xml الذي يحتوي على:

  * أسماء أو عناوين IP الفعلية للخوادم،
  * اسم أو عنوان IP الظاهري للمجموعة،
  * أدلة الملفات المراد نسخها في الوقت الفعلي (لوحدة mirror)،
  * معايير موازنة تحميل الشبكة (لوحدة <span class="notranslate farm-term" translate="no">farm</span>)،
  * تكوين أجهزة كشف أعطال البرامج والأجهزة


2 - البرامج النصية لبدء التطبيق وإيقافه.

### نشر وحدات عالية التوافر بنظام التوصيل والتشغيل {#plug-and-play-deployment-of-high-availability-modules}

بمجرد تكوين وحدة التطبيق واختبارها مع تطبيق ما، لا يتطلب النشر أي مهارات تقنية محددة:

  1. تثبيت التطبيق على خادمين قياسيين (ماديين أو افتراضيين)،
  2. قم بتثبيت برنامج SafeKit على كلا الخادمين،
  3. قم بتثبيت وحدة التطبيق على كلا الخادمين.



{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}