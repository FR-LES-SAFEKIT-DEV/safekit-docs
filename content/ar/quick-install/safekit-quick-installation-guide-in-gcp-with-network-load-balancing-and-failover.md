---
title: "موازنة أحمال الشبكة والتحويل التلقائي في حالة الفشل GCP : قم بتثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "حسّن موازنة أحمال الشبكة GCP باستخدام ميزة مراقبة التطبيقات الذكية في SafeKit . توفر وحدة farm.safe فحصًا صحيًا مخصصًا لموازن الأحمال GCP ، مما يتيح توافرًا عاليًا سلسًا على مستوى التطبيق. حقق خاصية الإصلاح الذاتي التلقائي والتحويل التلقائي في حالة الأعطال للتطبيقات بالغة الأهمية."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ GCP و SafeKit ، قيود التوافر العالي، نظرة عامة على حل SafeKit / GCP ، تثبيت حل SafeKit / GCP على Windows و Linux ( farm.safe )، التكوين خطوة بخطوة لحل SafeKit / GCP ، عرض توضيحي لحل SafeKit `farm` ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# موازنة أحمال الشبكة والتحويل التلقائي في حالة الفشل GCP : قم بتثبيت الوحدات النمطية SafeKit farm.safe {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="GCP" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit / GCP {#overview-of-the-safekit--gcp-solution}

الحل موضح هنا: **💡 [ SafeKit : Google GCP موازنة الأحمال وتوافر التطبيقات العالي `Farm` مجموعة ](</ar/solutions/gcp-load-balancing-cluster-failover/>)** .

## تثبيت حل SafeKit / GCP على Windows و Linux ( farm.safe ) و {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### تكوين موازن الأحمال GCP من جوجل {#configuration-of-the-google-gcp-load-balancer}

يجب تكوين موازن الأحمال باستخدام عنوان IP افتراضي.  
ويجب تهيئة موازن الأحمال لإرسال حزم بيانات الصحة بشكل دوري إلى العقد.  
لذلك، يوفر SafeKit فحصًا صحيًا يتم تشغيله داخل العقد، والذي

  * يعود OK عندما تكون حالة وحدة `farm` هي UP (خضراء)
  * لم يتم العثور على نتائج في جميع الولايات الأخرى


يجب عليك تهيئة موازن الأحمال Google GCP باستخدام ما يلي:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/farm/ready.txt (إذا كان `farm` هو اسم الوحدة التي ستقوم بنشرها لاحقًا)


للمزيد من المعلومات، راجع [ تكوين موازن التحميل ](<https://docs.cloud.google.com/load-balancing/docs/>) من Google GCP .


⚠️ لا تقم بتكوين عنوان IP افتراضي وقواعد موازنة الأحمال في الخطوة 4 من خطوات التكوين الموضحة أدناه. عنوان IP الافتراضي وقواعد موازنة الأحمال مُعدّة مسبقًا في مُوازن الأحمال Google GCP . يُفيد تعيين عنوان IP افتراضي وقواعد موازنة الأحمال في الخطوة 4 في التكوين المحلي فقط.

### تكوين أمان شبكة جوجل GCP {#configuration-of-the-google-gcp-network-security}

يجب تهيئة أمان الشبكة لتمكين الاتصالات للبروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عقد SafeKit )
  * UDP - 4803 لنبضات القلب داخل وحدة `farm` (بين عقد SafeKit )
  * يُستخدم المنفذ 9010 في بروتوكول TCP لفحص حالة موازن الأحمال، ولتشغيل وحدة تحكم الويب SafeKit في وضع HTTP.
  * TCP – 9001 لتكوين وضع HTTPS لوحدة التحكم
  * TCP – 9453 لوحدة تحكم الويب SafeKit التي تعمل في وضع HTTPS



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## خطوات تكوين حل SafeKit / GCP {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-ar app="" mod="farm"  %}}
 

## عرض توضيحي لحل SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}