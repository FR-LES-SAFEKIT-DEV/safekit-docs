---
title: "كيفية تطبيق الخوادم الاحتياطية باستخدام برامج التوافر العالي البسيطة"
canonical: "https://safekit.eviden.com/ar/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "تعرّف على كيفية تطبيق الخوادم الاحتياطية باستخدام نهج بسيط يعتمد على البرامج فقط. يوفر SafeKit نسخًا متماثلًا للبيانات في الوقت الفعلي وتحويلًا تلقائيًا في حالة الفشل على نظامي Windows و Linux. ولا يتطلب أقراصًا مشتركة أو مهارات تكنولوجيا معلومات متخصصة."
category: "best-practises"
lang: "ar"
topics: "كيفية تطبيق خوادم احتياطية نشطة/خاملة مع النسخ المتماثل في الوقت الفعلي وتجاوز الفشل؟، كيفية تطبيق خوادم احتياطية نشطة/نشطة مع موازنة تحميل الشبكة وتجاوز الفشل؟، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 44 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# كيفية تطبيق الخوادم الاحتياطية باستخدام برامج التوافر العالي البسيطة {#how-to-implement-redundant-servers-with-simple-ha-software}

## كيفية تطبيق خوادم احتياطية نشطة/خاملة مع النسخ المتماثل في الوقت الفعلي وتجاوز الفشل؟ {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### مجموعة mirror SafeKit {#the-safekit-mirror-cluster}


![خوادم احتياطية مع ميزة النسخ المتماثل للملفات في الوقت الفعلي وميزة تجاوز الأعطال](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


في مجموعة mirror، يتم تثبيت برنامج SafeKit على خادمين. تكون الخوادم مادية أو افتراضية. وتعمل بنظام Windows أو Linux، محليًا أو في السحابة. الخادم الأساسي هو الخادم النشط. وهو يشغل التطبيق الحرج. الخادم الثانوي هو خادم احتياطي سلبي. ويتلقى في الوقت الفعلي جميع التغييرات التي يجريها التطبيق في ملفاته. يتصل العملاء بعنوان [IP ظاهري](</ar/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). إذا تعطل الخادم الأساسي، يعيد SafeKit تشغيل التطبيق الحرج تلقائيًا على الخادم الثانوي. يصبح هذا الخادم أساسيًا ويتولى عنوان IP الظاهري. وعندما يعاد تشغيل الخادم المتعطل، يعيد SafeKit مزامنة بياناته تلقائيًا. ثم يصبح هذا الخادم هو الخادم الاحتياطي السلبي، في الحالة الثانوية.

## كيفية تطبيق خوادم احتياطية نشطة/نشطة مع موازنة تحميل الشبكة وتجاوز الفشل؟ {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### مجموعة SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#the-safekit-farm-cluster}


![خوادم احتياطية مع موازنة تحميل الشبكة وتجاوز الأعطال](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


في مجموعة <span class="notranslate farm-term" translate="no">farm</span>، يتم تثبيت برنامج SafeKit على عدة خوادم احتياطية. تعمل الخوادم بنظام Windows أو Linux، محليًا أو في السحابة. جميع الخوادم الاحتياطية نشطة. وهي تشغل نفس تطبيق الواجهة الأمامية الحرج. يتصل العملاء بعنوان [IP ظاهري](</ar/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). يتم موازنة أحمال جلسات TCP بين جميع الخوادم الاحتياطية. إذا تعطل أحد الخوادم، يقوم SafeKit تلقائيًا بإعادة تكوين موازنة أحمال جلسات TCP بين الخوادم النشطة المتبقية. عندما تتم إعادة تشغيل الخادم المعطل، يقوم SafeKit تلقائيًا بإعادة دمجه كخادم احتياطي نشط. ثم يستقبل هذا الخادم جلسات TCP جديدة.


{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}