---
title: "موازنة أحمال الشبكة السحابية والتحويل التلقائي في حالة الأعطال: قم بتثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "حسّن موازنة أحمال شبكة السحابة باستخدام نظام مراقبة التطبيقات الذكي SafeKit . توفر وحدة farm.safe فحصًا صحيًا مخصصًا لموازن أحمال السحابة، مما يتيح توافرًا عاليًا سلسًا على مستوى التطبيق. حقق الإصلاح الذاتي التلقائي والتحويل التلقائي في حالة الأعطال للتطبيقات بالغة الأهمية."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي للسحابة، قيود التوافر العالي لـ SafeKit ، نظرة عامة على حل SafeKit / السحابة، تثبيت حل SafeKit / السحابة على Windows و Linux ( farm.safe )، التكوين خطوة بخطوة لحل SafeKit / السحابة، عرض توضيحي لحل SafeKit `farm` ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# موازنة أحمال الشبكة السحابية والتحويل التلقائي في حالة الأعطال: قم بتثبيت الوحدات النمطية SafeKit farm.safe {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="Cloud" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit / Cloud {#overview-of-the-safekit--cloud-solution}

الحل موضح هنا: ** 💡 [ SafeKit : موازنة تحميل السحابة وتوافر التطبيقات العالي `Farm` Cluster ](</ar/solutions/cloud-load-balancing-cluster-failover/>) ** .

## تثبيت حل SafeKit / السحابي على Windows و Linux ( farm.safe ) و {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### تكوين موازن تحميل السحابة {#configuration-of-the-cloud-load-balancer}

يجب تكوين موازن الأحمال باستخدام عنوان IP افتراضي.  
ويجب تهيئة موازن الأحمال لإرسال حزم بيانات الصحة بشكل دوري إلى العقد.  
لذلك، يوفر SafeKit فحصًا صحيًا يتم تشغيله داخل العقد، والذي

  * يعود OK عندما تكون حالة وحدة `farm` هي UP (خضراء)
  * لم يتم العثور على نتائج في جميع الولايات الأخرى


يجب عليك تهيئة موازن تحميل السحابة باستخدام ما يلي:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/farm/ready.txt (إذا كان `farm` هو اسم الوحدة التي ستقوم بنشرها لاحقًا)


⚠️ لا تقم بتكوين عنوان IP افتراضي وقواعد موازنة الأحمال في الخطوة 4 من خطوات التكوين الموضحة أدناه. عنوان IP الافتراضي وقواعد موازنة الأحمال مُعدّة مسبقًا في موازن الأحمال السحابي. يُفيد تكوين عنوان IP افتراضي وقواعد موازنة الأحمال في الخطوة 4 في التكوين المحلي فقط.

### تكوين أمان شبكة السحابة {#configuration-of-the-cloud-network-security}

يجب تهيئة أمان الشبكة لتمكين الاتصالات للبروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عقد SafeKit )
  * UDP - 4803 لنبضات القلب داخل وحدة `farm` (بين عقد SafeKit )
  * يُستخدم المنفذ 9010 في بروتوكول TCP لفحص حالة موازن الأحمال، ولتشغيل وحدة تحكم الويب SafeKit في وضع HTTP.
  * TCP – 9001 لتكوين وضع HTTPS لوحدة التحكم
  * TCP – 9453 لوحدة تحكم الويب SafeKit التي تعمل في وضع HTTPS



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## خطوات إعداد حل SafeKit / Cloud {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-ar app="" mod="farm"  %}}
 

## عرض توضيحي لحل SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}