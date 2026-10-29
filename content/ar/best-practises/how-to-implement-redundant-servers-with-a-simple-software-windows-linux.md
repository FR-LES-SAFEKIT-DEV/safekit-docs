---
title: "كيفية تطبيق الخوادم الاحتياطية باستخدام برامج التوافر العالي البسيطة"
canonical: "https://safekit.eviden.com/ar/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "تعرّف على كيفية تطبيق الخوادم الاحتياطية باستخدام منهج برمجي بسيط. يقترح SafeKit بنيةً بدون شبكة تخزين (SAN) لـ Windows و Linux ، مما يوفر نسخًا متماثلًا للبيانات في الوقت الفعلي وتجاوزًا تلقائيًا للأعطال دون الحاجة إلى أقراص مشتركة أو مهارات تقنية معلومات متخصصة."
category: "best-practises"
lang: "ar"
topics: "كيفية تطبيق خوادم احتياطية نشطة/سلبية مع نسخ متماثل في الوقت الفعلي وتجاوز الأعطال؟، كيفية تطبيق خوادم احتياطية نشطة/نشطة مع موازنة أحمال الشبكة وتجاوز الأعطال؟، 🔍 SafeKit مركز التنقل عالي التوافر"
---

# كيفية تطبيق الخوادم الاحتياطية باستخدام برنامج التوافر العالي البسيط {#how-to-implement-redundant-servers-with-simple-ha-software}

## كيفية تطبيق خوادم احتياطية نشطة/سلبية مع نسخ متماثل فوري وتجاوز الأعطال؟ {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### مجموعة SafeKit mirror {#the-safekit-mirror-cluster}


خوادم احتياطية ![ مع نسخ الملفات في الوقت الفعلي والتحويل التلقائي في حالة الفشل ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


في مجموعة mirror ، يُثبَّت برنامج SafeKit على خادمين فعليين أو افتراضيين يعملان بنظامي Windows أو Linux (محليًا أو سحابيًا). الخادم الأساسي هو الخادم النشط ويُشغِّل تطبيقًا بالغ الأهمية. أما الخادم الثانوي فهو خادم احتياطي سلبي يستقبل في الوقت الفعلي جميع التعديلات التي يُجريها التطبيق على ملفاته. تتصل الأجهزة العميلة بعنوان IP افتراضي [ ](</ar/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) . في حال تعطل الخادم الأساسي، يُعيد SafeKit تشغيل التطبيق الهام تلقائيًا على الخادم الاحتياطي السلبي الذي يصبح هو الخادم الأساسي، ويُبدِّل عنوان IP الافتراضي. عند إعادة تشغيل الخادم المتعطل، تتم مزامنته تلقائيًا ويصبح الخادم الاحتياطي السلبي الذي يعمل كخادم ثانوي.

## كيفية تطبيق خوادم نشطة/نشطة ذات تكرار مع موازنة أحمال الشبكة والتحويل التلقائي في حالة الفشل؟ {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### مجموعة SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#the-safekit-farm-cluster}


خوادم احتياطية ![ مع موازنة أحمال الشبكة والتحويل التلقائي في حالة الفشل ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


في مجموعة <span class="notranslate farm-term" translate="no">farm</span> ، يُثبَّت برنامج SafeKit على خوادم احتياطية تعمل بنظامي Windows أو Linux (سواءً في الموقع أو في السحابة). جميع الخوادم الاحتياطية نشطة وتُشغِّل نفس تطبيق الواجهة الأمامية الأساسي. يتصل العملاء بعنوان IP افتراضي [ ](</ar/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>) . تُوزَّع جلسات TCP بالتساوي بين جميع الخوادم الاحتياطية. في حال تعطل أحد الخوادم، يُعيد SafeKit تلقائيًا تكوين توزيع جلسات TCP بالتساوي بين الخوادم النشطة المتبقية. عند إعادة تشغيل الخادم المتعطل، يُعاد دمجه تلقائيًا كخادم احتياطي نشط ويستقبل جلسات TCP جديدة.


{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}