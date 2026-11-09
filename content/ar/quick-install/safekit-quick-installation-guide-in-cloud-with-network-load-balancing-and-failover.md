---
title: "موازنة تحميل الشبكة السحابية وتجاوز الأعطال: تثبيت وحدة farm.safe SafeKit"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "عزّز موازنة تحميل الشبكة السحابية باستخدام ميزة مراقبة التطبيقات الذكية من SafeKit. توفر وحدة farm.safe فحصًا مخصصًا لصحة موازن تحميل السحابة، مما يتيح التوافر العالي (HA) بسلاسة على مستوى التطبيق. حقق المعالجة الذاتية التلقائية والتحويل التلقائي عند الفشل للتطبيقات ذات المهام الحرجة."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي للسحابة، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit / Cloud، تثبيت حل SafeKit / Cloud على نظامي التشغيل Windows و Linux (farm.safe)، تهيئة حل SafeKit / Cloud خطوة بخطوة، عرض حل SafeKit farm، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# موازنة تحميل الشبكة السحابية وتجاوز الأعطال: تثبيت وحدة farm.safe SafeKit {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="Cloud" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit / Cloud {#overview-of-the-safekit--cloud-solution}

يُوصَف الحل هنا: **💡 [SafeKit: موازنة تحميل سحابية ومزرعة مجموعة <span class="notranslate farm-term" translate="no">farm</span> عالية التوفر للتطبيقات](</ar/solutions/cloud-load-balancing-cluster-failover/>)**.

## تثبيت حل SafeKit / Cloud على نظامي التشغيل Windows و Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### تكوين موازن تحميل السحابة {#configuration-of-the-cloud-load-balancer}

يجب تكوين موازن التحميل بعنوان IP ظاهري.  
ويجب تكوين موازن التحميل لإرسال حزم الحالة بشكل دوري إلى العُقد.  
ولهذا الغرض، يوفر SafeKit فحصًا صحيًا يعمل داخل العُقد و

  * تُرجع قيمة OK عندما تكون حالة وحدة <span class="notranslate farm-term" translate="no">farm</span> UP (باللون الأخضر)
  * تُرجع "غير موجود" في جميع الحالات الأخرى


يجب عليك تكوين موازن تحميل السحابة باستخدام:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/farm/ready.txt (إذا كان <span class="notranslate farm-term" translate="no">farm</span> هو اسم الوحدة النمطية التي ستنشرها لاحقًا)


⚠️ لا تقم بتكوين عنوان IP ظاهري وقواعد موازنة التحميل في الخطوة 4 في التكوين المفصل أدناه. عنوان IP الظاهري وقواعد موازنة التحميل مضبوطان بالفعل في موازن تحميل السحابة. إن ضبط عنوان IP ظاهري وقواعد موازنة التحميل في الخطوة 4 مفيد للتكوين المحلي فقط.

### تكوين أمان شبكة السحابة {#configuration-of-the-cloud-network-security}

يجب تكوين أمان الشبكة لتمكين الاتصالات للبروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عُقد SafeKit)
  * UDP - 4803 نبضات heartbeat داخل وحدة <span class="notranslate farm-term" translate="no">farm</span> (بين عُقد SafeKit)
  * بروتوكول التحكم بالإرسال (TCP) – 9010 لفحص سلامة موازن التحميل وللوحدة التحكمية لـ SafeKit التي تعمل في وضع http
  * بروتوكول التحكم بالإرسال (TCP) – 9001 لتهيئة وضع https لوحدة التحكم
  * TCP – 9453 لوحدة تحكم الويب SafeKit التي تعمل في وضع https



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## تهيئة حل SafeKit / Cloud خطوة بخطوة {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-ar app="" mod="farm"  %}}
 

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}