---
title: "موازنة تحميل الشبكة وتجاوز الأعطال GCP: تثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "عزّز موازنة تحميل الشبكة في GCP باستخدام المراقبة الذكية للتطبيقات من SafeKit. توفر وحدة farm.safe فحصًا مخصصًا لسلامة موازن تحميل GCP، مما يتيح التوافر العالي (HA) بسلاسة على مستوى التطبيق. حقق الشفاء الذاتي التلقائي والتحويل التلقائي في حالة الفشل للتطبيقات ذات المهام الحرجة."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ GCP، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/GCP، تثبيت حل SafeKit/GCP على نظامي التشغيل Windows و Linux (farm.safe)، تهيئة حل SafeKit/GCP خطوة بخطوة، عرض حل SafeKit farm، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# موازنة تحميل الشبكة وتجاوز الأعطال GCP: تثبيت وحدة SafeKit farm.safe {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="GCP" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit/GCP {#overview-of-the-safekit--gcp-solution}

يُوصَف الحل هنا: **💡 [SafeKit: موازنة تحميل Google GCP مجموعة <span class="notranslate farm-term" translate="no">farm</span> التطبيقات عالية التوفر](</ar/solutions/gcp-load-balancing-cluster-failover/>)**.

## تثبيت حل SafeKit/GCP على نظامي Windows و Linux (farm.safe) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### تهيئة موازن تحميل Google GCP {#configuration-of-the-google-gcp-load-balancer}

يجب تكوين موازن التحميل بعنوان IP ظاهري.  
ويجب تكوين موازن التحميل لإرسال حزم الحالة بشكل دوري إلى العُقد.  
ولهذا الغرض، يوفر SafeKit فحصًا صحيًا يعمل داخل العُقد و

  * تُرجع قيمة OK عندما تكون حالة وحدة <span class="notranslate farm-term" translate="no">farm</span> UP (باللون الأخضر)
  * تُرجع "غير موجود" في جميع الحالات الأخرى


يجب عليك تكوين موازن تحميل Google GCP باستخدام:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/farm/ready.txt (إذا كان <span class="notranslate farm-term" translate="no">farm</span> هو اسم الوحدة النمطية التي ستنشرها لاحقًا)


لمزيد من المعلومات، راجع [إعدادات موازن تحميل Google GCP](<https://docs.cloud.google.com/load-balancing/docs/>).


⚠️ لا تقم بتكوين عنوان IP ظاهري وقواعد موازنة التحميل في الخطوة 4 في التكوين المفصل أدناه. تم بالفعل تعيين عنوان IP الظاهري وقواعد موازنة التحميل في موازن تحميل Google GCP. يعد تعيين عنوان IP ظاهري وقواعد موازنة التحميل في الخطوة 4 مفيدًا للتكوين المحلي فقط.

### تكوين أمان شبكة Google GCP {#configuration-of-the-google-gcp-network-security}

يجب تكوين أمان الشبكة لتمكين الاتصالات للبروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عُقد SafeKit)
  * UDP - 4803 نبضات heartbeat داخل وحدة <span class="notranslate farm-term" translate="no">farm</span> (بين عُقد SafeKit)
  * بروتوكول التحكم بالإرسال (TCP) – 9010 لفحص سلامة موازن التحميل وللوحدة التحكمية لـ SafeKit التي تعمل في وضع http
  * بروتوكول التحكم بالإرسال (TCP) – 9001 لتهيئة وضع https لوحدة التحكم
  * TCP – 9453 لوحدة تحكم الويب SafeKit التي تعمل في وضع https



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## تهيئة حل SafeKit/GCP خطوة بخطوة {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-ar app="" mod="farm"  %}}
 

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}