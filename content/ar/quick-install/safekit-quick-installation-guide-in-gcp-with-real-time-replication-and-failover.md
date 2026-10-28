---
title: "التوافر العالي GCP مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/"
description: "قم بتثبيت وحدة mirror.safe الخاصة بـ SafeKit في GCP لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل على Windows و Linux . يرشدك هذا الدليل خلال عملية إعداد مجموعة من عقدتين لا تستخدم التخزين المشترك للتطبيقات الحيوية التي لا تتطلب تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ GCP و SafeKit ، قيود التوافر العالي، نظرة عامة على حل SafeKit / GCP mirror ، تثبيت حل SafeKit / GCP mirror على Windows و Linux ( mirror.safe )، التكوين خطوة بخطوة لحل SafeKit / GCP mirror ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# GCP توفر إمكانية عالية مع SafeKit : قم بتثبيت وحدة mirror.safe للتحويل التلقائي في حالة الفشل {#gcp-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="GCP" mod="mirror"  %}}
 

## نظرة عامة على حلول SafeKit / GCP mirror {#overview-of-the-safekit--gcp-mirror-solution}

الحل موضح هنا: ** 💡 [ Google GCP التوافر العالي: SafeKit النسخ المتزامن والتحويل التلقائي ](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) ** .

## تثبيت حل SafeKit / GCP mirror على Windows و Linux ( mirror.safe ) {#installation-of-the-safekit--gcp-mirror-solution-on-windows-and-linux-mirrorsafe}

### تكوين موازن الأحمال GCP من جوجل {#configuration-of-the-google-gcp-load-balancer}

يجب تكوين موازن الأحمال إذا كنت ترغب في تطبيق عنوان IP افتراضي.  
ويجب تهيئة موازن الأحمال لإرسال حزم بيانات الصحة بشكل دوري إلى العقد.  
لذلك، يوفر SafeKit فحصًا صحيًا يتم تشغيله داخل العقد، والذي

  * يُرجع OK عندما تكون حالة وحدة mirror هي PRIM (أخضر) أو ALONE (أخضر).
  * لم يتم العثور على نتائج في جميع الولايات الأخرى


يجب عليك تهيئة موازن الأحمال Google GCP باستخدام ما يلي:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/mirror/ready.txt (إذا كان mirror هو اسم الوحدة التي ستقوم بنشرها لاحقًا)


للمزيد من المعلومات، راجع [ تكوين موازن التحميل ](<https://docs.cloud.google.com/load-balancing/docs/>) من Google GCP . 


⚠️ لا تقم بتكوين عنوان IP افتراضي في الخطوة 4 من خطوات التكوين الموضحة أدناه. عنوان IP الافتراضي مُعيّن مسبقًا في مُوازن الأحمال Google GCP . يُفيد تعيين عنوان IP افتراضي في الخطوة 4 في التكوين المحلي فقط.

### تكوين أمان شبكة جوجل GCP {#configuration-of-the-google-gcp-network-security}

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

## خطوات تكوين حلول SafeKit / GCP mirror {#step-by-step-configuration-of-the-safekit--gcp-mirror-solution}


{{%  insert-safekit-82-configuration-ar app="Windows" mod="mirror"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}