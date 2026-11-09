---
title: "التوفر العالي GCP باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/"
description: "انشر وحدة mirror.safe الخاصة بـ SafeKit في GCP لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الفشل التلقائي على Windows و Linux. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون مشاركة للتطبيقات الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ GCP، قيود التوافر العالي SafeKit، نظرة عامة على حل mirror SafeKit/GCP، تثبيت حل mirror SafeKit/GCP على Windows و Linux (mirror.safe)، إعداد حل mirror SafeKit/GCP خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوفر العالي GCP باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل {#gcp-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="GCP" mod="mirror"  %}}
 

## نظرة عامة على حل mirror SafeKit/GCP {#overview-of-the-safekit--gcp-mirror-solution}

الحل موضح هنا: **💡 [التوافر العالي لخدمات جوجل السحابية GCP: النسخ المتماثل المتزامن وتجاوز الأعطال SafeKit](</ar/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)**.

## تثبيت حل mirror SafeKit/GCP على Windows و Linux (mirror.safe) {#installation-of-the-safekit--gcp-mirror-solution-on-windows-and-linux-mirrorsafe}

### تهيئة موازن تحميل Google GCP {#configuration-of-the-google-gcp-load-balancer}

يجب تكوين موازن التحميل إذا كنت ترغب في تطبيق عنوان IP ظاهري.  
ويجب تكوين موازن التحميل لإرسال حزم الحالة بشكل دوري إلى العُقد.  
ولهذا الغرض، يوفر SafeKit فحصًا صحيًا يعمل داخل العُقد و

  * تُرجع قيمة OK عندما تكون حالة وحدة mirror PRIM (أخضر) أو ALONE (أخضر)
  * تُرجع "غير موجود" في جميع الحالات الأخرى


يجب عليك تكوين موازن تحميل Google GCP باستخدام:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/mirror/ready.txt (إذا كان mirror هو اسم الوحدة النمطية التي ستنشرها لاحقًا)


لمزيد من المعلومات، راجع [إعدادات موازن تحميل Google GCP](<https://docs.cloud.google.com/load-balancing/docs/>). 


⚠️ لا تقم بتكوين عنوان IP ظاهري في الخطوة 4 في التكوين المفصل أدناه. عنوان IP الظاهري مُعدّ بالفعل في موازن تحميل Google GCP. يُعد تعيين عنوان IP ظاهري في الخطوة 4 مفيدًا للتكوين المحلي فقط.

### تكوين أمان شبكة Google GCP {#configuration-of-the-google-gcp-network-security}

يجب تكوين أمان الشبكة لتمكين الاتصالات للبروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عُقد SafeKit)
  * UDP - 8888 لوظيفة نبضة heartbeat الوحدة (بين عُقد SafeKit)
  * بروتوكول التحكم بالإرسال (TCP) – 5600 لنسخ الملفات في الوقت الفعلي للوحدة (بين عُقد SafeKit)
  * بروتوكول التحكم بالإرسال (TCP) – 9010 لفحص سلامة موازن التحميل وللوحدة التحكمية لـ SafeKit التي تعمل في وضع http
  * بروتوكول التحكم بالإرسال (TCP) – 9001 لتهيئة وضع https لوحدة التحكم
  * TCP – 9453 لوحدة تحكم الويب SafeKit التي تعمل في وضع https



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **mirror.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## إعداد حل mirror SafeKit/GCP خطوة بخطوة {#step-by-step-configuration-of-the-safekit--gcp-mirror-solution}


{{%  insert-safekit-82-configuration-ar app="Windows" mod="mirror"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}