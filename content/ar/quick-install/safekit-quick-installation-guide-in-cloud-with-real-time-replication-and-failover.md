---
title: "التوافر العالي للسحابة مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "قم بنشر وحدة mirror.safe لـ SafeKit في السحابة لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل على Windows و Linux . يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون مشاركة تخزين للتطبيقات الحيوية التي لا تتطلب مشاركة التخزين."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي للسحابة، قيود التوافر العالي لـ SafeKit ، نظرة عامة على حل SafeKit / السحابة mirror ، تثبيت حل SafeKit / السحابة mirror على Windows و Linux ( mirror.safe )، التكوين خطوة بخطوة لحل SafeKit / السحابة mirror ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# توفير إمكانية الوصول العالي إلى السحابة باستخدام SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Cloud" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit / Cloud mirror {#overview-of-the-safekit--cloud-mirror-solution}

الحل موضح هنا: ** 💡 [ توافر عالٍ مستقل عن السحابة: SafeKit النسخ المتماثل المتزامن والتحويل التلقائي في حالة الفشل ](</solutions/cloud-high-availability-cluster-synchronous-replication-failover/>) ** .

## تثبيت حل SafeKit / Cloud mirror على Windows و Linux ( mirror.safe ) و {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### تكوين موازن تحميل السحابة {#configuration-of-the-cloud-load-balancer}

يجب تكوين موازن الأحمال إذا كنت ترغب في تطبيق عنوان IP افتراضي.  
ويجب تهيئة موازن الأحمال لإرسال حزم بيانات الصحة بشكل دوري إلى العقد.  
لذلك، يوفر SafeKit فحصًا صحيًا يتم تشغيله داخل العقد، والذي

  * يُرجع OK عندما تكون حالة وحدة mirror هي PRIM (أخضر) أو ALONE (أخضر).
  * لم يتم العثور على نتائج في جميع الولايات الأخرى


يجب عليك تهيئة موازن تحميل السحابة باستخدام ما يلي:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/mirror/ready.txt (إذا كان mirror هو اسم الوحدة التي ستقوم بنشرها لاحقًا)


⚠️ لا تقم بتكوين عنوان IP افتراضي في الخطوة 4 من خطوات التكوين الموضحة أدناه. عنوان IP الافتراضي مُعيّن مسبقًا في مُوازن تحميل السحابة. يُفيد تعيين عنوان IP افتراضي في الخطوة 4 في التكوين المحلي فقط.

### تكوين أمان شبكة السحابة {#configuration-of-the-cloud-network-security}

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

## خطوات إعداد حل SafeKit / Cloud mirror {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-ar app="Windows" mod="mirror"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}