---
title: "تثبيت SafeKit للتوافر العالي لـ Azure (mirror.safe)"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe في Azure للنسخ في الوقت الفعلي وتجاوز الفشل بين جهازين افتراضيين Windows أو Linux."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع Azure عالي التوفر, قيود التوافر العالي SafeKit, نظرة عامة على حل mirror SafeKit/Azure, تثبيت حل mirror SafeKit/Azure على نظامي التشغيل Windows و Linux (mirror.safe), إعداد حل mirror SafeKit/Azure خطوة بخطوة, عرض حل mirror من SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--azure-mirror-solution, installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe, step-by-step-configuration-of-the-safekit--azure-mirror-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# تثبيت SafeKit للتوافر العالي لـ Azure (mirror.safe) {#install-safekit-for-azure-high-availability-mirrorsafe}


{{%  insert-safekit-mirror-guide-ar app="Azure" mod="mirror"  %}}
 

## نظرة عامة على حل mirror SafeKit/Azure {#overview-of-the-safekit--azure-mirror-solution}

يُوصَف الحل هنا: **💡 [التوافر العالي Microsoft Azure: النسخ المتماثل المتزامن وتجاوز الفشل SafeKit](</ar/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## تثبيت حل mirror SafeKit/Azure على نظامي التشغيل Windows و Linux (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### تكوين موازن تحميل Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

يجب تكوين موازن التحميل إذا كنت ترغب في تطبيق عنوان IP ظاهري.  
ويجب تكوين موازن التحميل لإرسال حزم الحالة بشكل دوري إلى العُقد.  
ولهذا الغرض، يوفر SafeKit فحصًا صحيًا يعمل داخل العُقد و

  * تُرجع قيمة OK عندما تكون حالة وحدة mirror PRIM (أخضر) أو ALONE (أخضر)
  * تُرجع "غير موجود" في جميع الحالات الأخرى


يجب عليك تكوين موازن تحميل Microsoft Azure باستخدام:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL /var/modules/mirror/ready.txt (إذا كان mirror هو اسم الوحدة النمطية التي ستنشرها لاحقًا)


لمزيد من المعلومات، راجع [تكوين موازن تحميل Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>). 


⚠️ لا تقم بتكوين عنوان IP ظاهري في الخطوة 4 في التكوين المفصل خطوة بخطوة أدناه. تم تعيين عنوان IP الظاهري بالفعل في موازن تحميل Microsoft Azure. يعد تعيين عنوان IP ظاهري في الخطوة 4 مفيدًا للتكوين المحلي فقط.

### تكوين أمان شبكة Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

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

## إعداد حل mirror SafeKit/Azure خطوة بخطوة {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}


{{%  insert-safekit-82-configuration-ar app="Windows" mod="mirror"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}