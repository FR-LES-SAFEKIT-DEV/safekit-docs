---
title: "بديل لـ SQL Server Always On: HA للإصدارين Express و Standard"
canonical: "https://safekit.eviden.com/ar/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "هل تبحث عن بديل اقتصادي لـ SQL Server Always On؟ يقدم SafeKit بنيةً بدون شبكة تخزين (SAN) توفر توافرًا عاليًا لإصداري SQL Server Express وStandard. استمتع بالنسخ المتزامن، وعنوان IP افتراضي، والتحويل التلقائي في حالة الأعطال دون الحاجة إلى شبكة تخزين أو Active Directory."
category: "best-practises"
lang: "ar"
topics: "بديل لـ Always On SQL Server للإصدارين السريع والقياسي، كيف تعمل مجموعة SafeKit mirror مع Microsoft SQL Server ؟، دليل فيديو: تكوين مجموعة SafeKit HA mirror لـ SQL Server ، 🔍 مركز التنقل عالي التوفر SafeKit"
---

# بديل لـ SQL Server Always On: HA للإصدارين Express و Standard {#alternative-to-sql-server-always-on-ha-for-express-and-standard-editions}

## بديل لخاصية Always On SQL Server للإصدارين السريع والقياسي {#alternative-to-always-on-sql-server-for-express-and-standard-editions}

### الحل لـ Microsoft SQL Server {#the-solution-for-microsoft-sql-server}

يوفر SafeKit إمكانية الوصول العالية إلى Microsoft SQL Server بين عقدتين زائدتين مع نسخ متزامن في الوقت الحقيقي للبيانات والتحويل التلقائي في حالة الفشل.

الحل مستقل عن إصدار Microsoft SQL Server ويعمل مع الإصدارات السريعة والقياسية.

### منتج عام {#a-generic-product}

SafeKit منتج عام. يمكنك نسخ أكثر من مجرد بيانات وسجلات خادم SQL. إذا كان تطبيقك يعتمد على SQL Server ويحتوي على مجلدات محددة تضم إعداداتك أو ملفات أخرى، فيمكنك نسخها بنفس الطريقة. كما يمكنك إعادة تشغيل خدماتك الخاصة بالإضافة إلى خدمات خادم SQL.

دليل تثبيت [ SafeKit مع الإصدارات السريعة والقياسية Microsoft و SQL Server ](</ar/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)

### بدون مجموعة تجاوز الفشل Microsoft {#without-microsoft-failover-cluster}

يعمل SafeKit بدون مجموعة تجاوز الفشل Microsoft كما هو الحال مع Always On SQL Server . إنه عرض متكامل يوفر عنوان IP افتراضي، ونسخًا متزامنًا فوريًا للمجلدات، وتجاوز الفشل التلقائي والعودة إلى الوضع السابق، والمزيد... يُغني SafeKit عن الحاجة إلى الأقراص المشتركة وإصدارات قواعد البيانات المؤسسية. 

### بدون وحدة تحكم المجال ودليل نشط {#without-domain-controller-and-active-directory}

يعمل SafeKit دون الحاجة إلى تهيئة وحدة تحكم المجال أو الدليل النشط، على عكس Always On SQL Server . هذا الحل سهل النشر وفعال من حيث التكلفة، ولا يتطلب أي مهارات خاصة.

### بدون 3 عقد لتحقيق النصاب {#without-3-nodes-for-quorum}

يعمل SafeKit دون الحاجة إلى 3 عقد لتحقيق النصاب القانوني، على عكس Always On SQL Server . في حالة عزل الشبكة، يُطبّق SafeKit آلية فحص انقسام الشبكة باستخدام اختبار اتصال (ping) مع جهاز توجيه يقوم بدور الشاهد. علاوة على ذلك، يُمكن بسهولة تهيئة عدة نبضات قلب في المنتج.

### حلول أخرى للتكرار والتوافر العالي {#other-redundancy-and-high-availability-solutions}

مع SafeKitيمكنك تنفيذ ذلك على Windows و Linux، النسخ المتماثل الفوري والتحويل التلقائي لأي مجلدات وخدمات وقواعد بيانات وأجهزة افتراضية كاملة من نوع Hyper-V أو KVM، Docker, Kubernetesتطبيقات الحوسبة السحابية.

### حل كامل {#a-complete-solution}

SafeKit يحل المشكلة التالية: 

  * أعطال الأجهزة (20% من المشاكل)، بما في ذلك العطل الكامل لغرفة الحاسوب، 
  * أعطال البرامج (40% من المشاكل)، بما في ذلك إعادة تشغيل العمليات الحيوية، 
  * والأخطاء البشرية (40% من المشاكل) بفضل سهولة استخدامه ووحدة التحكم عبر الويب.



{{%  insert-safekit-mirror-ar app="Microsoft SQL Server"  %}}
 

## دليل فيديو: تهيئة مجموعة SafeKit mirror لـ SQL Server {#videoguide-safekit-mirror-cluster}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}