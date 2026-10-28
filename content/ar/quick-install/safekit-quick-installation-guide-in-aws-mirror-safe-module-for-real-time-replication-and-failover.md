---
title: "التوافر العالي AWS مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "قم بتثبيت وحدة mirror.safe الخاصة بـ SafeKit في AWS لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل على Windows و Linux . يرشدك هذا الدليل خلال عملية إعداد مجموعة من عقدتين لا تستخدم التخزين المشترك للتطبيقات الحيوية التي لا تتطلب تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ AWS و SafeKit ، قيود التوافر العالي، نظرة عامة على حل SafeKit / AWS mirror ، تثبيت حل SafeKit / AWS mirror على Windows و Linux ( mirror.safe )، التكوين خطوة بخطوة لحل SafeKit / AWS mirror ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# AWS توفر إمكانية عالية مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="AWS" mod="mirror"  %}}
 

## نظرة عامة على حلول SafeKit / AWS mirror {#overview-of-the-safekit--aws-mirror-solution}

الحل موضح هنا: ** 💡 [ Amazon AWS التوافر العالي: SafeKit النسخ المتزامن والتحويل التلقائي ](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ** .

## تثبيت حل SafeKit / AWS mirror على Windows و Linux ( mirror.safe ) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### تكوين موازن الأحمال Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

يجب تكوين موازن الأحمال إذا كنت تريد عنوان IP افتراضي.  
ويجب تهيئة موازن الأحمال لإرسال حزم بيانات الصحة بشكل دوري إلى العقد.  
لذلك، يوفر SafeKit فحصًا صحيًا يتم تشغيله داخل العقد، والذي

  * يُرجع OK عندما تكون حالة وحدة mirror هي PRIM (أخضر) أو ALONE (أخضر).
  * لم يتم العثور على نتائج في جميع الولايات الأخرى


يجب عليك تهيئة موازن الأحمال Amazon AWS باستخدام ما يلي:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/mirror/ready.txt (إذا كان mirror هو اسم الوحدة التي ستقوم بنشرها لاحقًا)


للمزيد من المعلومات، راجع [ تكوين موازن الأحمال Amazon AWS ](<https://aws.amazon.com/elasticloadbalancing/>) .


⚠️ لا تقم بتكوين عنوان IP افتراضي في الخطوة 4 من خطوات التكوين الموضحة أدناه. عنوان IP الافتراضي مُعيّن مسبقًا في مُوازن الأحمال Amazon AWS . يُفيد تعيين عنوان IP افتراضي في الخطوة 4 في التكوين المحلي فقط.

### تكوين أمان شبكة Amazon AWS {#configuration-of-the-amazon-aws-network-security}

يجب تهيئة أمان الشبكة لتمكين الاتصالات للبروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عقد SafeKit )
  * UDP - 8888 لنبضات قلب الوحدة (بين عقد SafeKit )
  * TCP – 5600 لنسخ الملفات في الوقت الحقيقي للوحدة (بين عقد SafeKit )
  * يُستخدم المنفذ 9010 في بروتوكول TCP لفحص حالة موازن الأحمال، ولتشغيل وحدة تحكم الويب SafeKit في وضع HTTP.
  * TCP – 9001 لتكوين وضع HTTPS لوحدة التحكم
  * TCP – 9453 لوحدة تحكم الويب SafeKit التي تعمل في وضع HTTPS



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **mirror.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## خطوات تكوين حلول SafeKit / AWS mirror {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-ar app="Windows" mod="mirror"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}