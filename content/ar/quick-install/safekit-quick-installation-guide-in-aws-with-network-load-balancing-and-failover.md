---
title: "موازنة تحميل الشبكة وتجاوز الأعطال AWS: تثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/"
description: "عزّز موازنة تحميل الشبكة في AWS باستخدام المراقبة الذكية للتطبيقات من SafeKit. توفر وحدة farm.safe فحصًا مخصصًا لسلامة موازن تحميل AWS، مما يتيح التوافر العالي السلس على مستوى التطبيق. حقق الشفاء الذاتي التلقائي وتجاوز الأعطال للتطبيقات ذات المهام الحرجة."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ AWS، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/AWS، تثبيت حل SafeKit/AWS على نظامي التشغيل Windows و Linux (farm.safe)، تهيئة حل SafeKit/AWS خطوة بخطوة، عرض حل SafeKit farm، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# موازنة تحميل الشبكة وتجاوز الأعطال AWS: تثبيت وحدة SafeKit farm.safe {#aws-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="AWS" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit/AWS {#overview-of-the-safekit--aws-solution}

يُوصَف الحل هنا: **💡 [SafeKit: مجموعة <span class="notranslate farm-term" translate="no">farm</span> موازنة تحميل وتوافر عالٍ للتطبيقات Amazon AWS](</ar/solutions/aws-load-balancing-cluster-failover/>)**.

## تثبيت حل SafeKit/AWS على نظامي التشغيل Windows و Linux (farm.safe) {#installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe}

### تهيئة موازن تحميل Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

يجب تكوين موازن التحميل بعنوان IP ظاهري.  
ويجب تكوين موازن التحميل لإرسال حزم الحالة بشكل دوري إلى العُقد.  
ولهذا الغرض، يوفر SafeKit فحصًا صحيًا يعمل داخل العُقد و

  * تُرجع قيمة OK عندما تكون حالة وحدة <span class="notranslate farm-term" translate="no">farm</span> UP (باللون الأخضر)
  * تُرجع "غير موجود" في جميع الحالات الأخرى


يجب عليك تكوين موازن تحميل Amazon AWS باستخدام:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/farm/ready.txt (إذا كان <span class="notranslate farm-term" translate="no">farm</span> هو اسم الوحدة النمطية التي ستنشرها لاحقًا)


لمزيد من المعلومات، راجع [إعدادات موازن تحميل Amazon AWS](<https://aws.amazon.com/elasticloadbalancing/>).


⚠️ لا تقم بتكوين عنوان IP ظاهري وقواعد موازنة التحميل في الخطوة 4 في التكوين المفصل أدناه. عنوان IP الظاهري وقواعد موازنة التحميل مضبوطان بالفعل في موازن تحميل Amazon AWS. ضبط عنوان IP ظاهري وقواعد موازنة التحميل في الخطوة 4 مفيد للتكوين المحلي فقط.

### تكوين أمان شبكة Amazon AWS {#configuration-of-the-amazon-aws-network-security}

يجب تكوين أمان الشبكة لتمكين الاتصالات للبروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عُقد SafeKit)
  * UDP - 4803 لإشارة نبضة heartbeat داخل وحدة <span class="notranslate farm-term" translate="no">farm</span> (بين عُقد SafeKit)
  * بروتوكول التحكم بالإرسال (TCP) – 9010 لفحص سلامة موازن التحميل وللوحدة التحكمية لـ SafeKit التي تعمل في وضع http
  * بروتوكول التحكم بالإرسال (TCP) – 9001 لتهيئة وضع https لوحدة التحكم
  * TCP – 9453 لوحدة تحكم الويب SafeKit التي تعمل في وضع https



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## تهيئة حل SafeKit/AWS خطوة بخطوة {#step-by-step-configuration-of-the-safekit--aws-solution}


{{%  insert-safekit-82-farm-configuration-ar app="" mod="farm"  %}}
 

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}