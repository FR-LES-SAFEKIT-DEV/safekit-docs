---
title: "التوافر العالي في Azure: النسخ المتطابق في الوقت الفعلي وتجاوز الفشل باستخدام SafeKit"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "انشر وحدة mirror.safe من SafeKit في Azure لتمكين النسخ المتطابق المتزامن في الوقت الفعلي وتجاوز الفشل التلقائي على Windows وLinux. يشرح هذا الدليل إعداد مجموعة من عقدتين دون تخزين مشترك للتطبيقات الحيوية."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي في Azure، قيود التوافر العالي في SafeKit، نظرة عامة على حل SafeKit / Azure mirror، تثبيت حل SafeKit / Azure mirror على Windows وLinux (mirror.safe)، التكوين خطوة بخطوة لحل SafeKit / Azure mirror، عرض توضيحي لحل SafeKit mirror، 🔍 مركز التنقل للتوافر العالي في SafeKit"
---

# التوافر العالي في Azure باستخدام SafeKit: تثبيت وحدة mirror.safe لتجاوز الفشل {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-ar app="Azure" mod="mirror"  %}}

## نظرة عامة على حل SafeKit / Azure mirror {#overview-of-the-safekit--azure-mirror-solution}

وُصف الحل هنا: **💡[التوافر العالي في Microsoft Azure: النسخ المتزامن وتجاوز الفشل باستخدام SafeKit](</ar/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit / Azure mirror على Windows وLinux (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### تكوين موازن تحميل Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

يجب تكوين موازن التحميل إذا كنت تريد تنفيذ عنوان IP افتراضي.
ويجب تكوينه أيضًا لإرسال حزم التحقق من الحالة إلى العقد دوريًا.
لهذا الغرض، توفر SafeKit فحصًا للحالة يعمل داخل العقد، ويقوم بما يلي:

  * يعيد OK عندما تكون حالة وحدة mirror هي PRIM (أخضر) أو ALONE (أخضر)
  * يعيد NOT FOUND في جميع الحالات الأخرى

يجب تكوين موازن تحميل Microsoft Azure باستخدام:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL ‏/var/modules/mirror/ready.txt (إذا كان mirror هو اسم الوحدة التي ستنشرها لاحقًا)

لمزيد من المعلومات، راجع [تكوين موازن تحميل Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ لا تكوّن عنوان IP افتراضيًا في الخطوة 4 من التكوين خطوة بخطوة أدناه. فعنوان IP الافتراضي محدد مسبقًا في موازن تحميل Microsoft Azure. ويُستخدم تعيين عنوان IP افتراضي في الخطوة 4 للتكوين المحلي فقط.

### تكوين أمان شبكة Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

يجب تكوين أمان الشبكة للسماح بالاتصالات باستخدام البروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عقد SafeKit)
  * UDP - 8888 لنبضات وحدة heartbeat (بين عقد SafeKit)
  * TCP – 5600 لنسخ الملفات في الوقت الفعلي للوحدة (بين عقد SafeKit)
  * TCP – 9010 لفحص حالة موازن التحميل ووحدة تحكم SafeKit على الويب العاملة بوضع http
  * TCP – 9001 لتكوين وضع https لوحدة التحكم
  * TCP – 9453 لوحدة تحكم SafeKit على الويب العاملة بوضع https

{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}

ملاحظة: تُضمَّن الوحدة العامة **mirror.safe** التي ستقوم بتكوينها داخل الحزمة.

## تكوين حل SafeKit / Azure mirror خطوة بخطوة {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-ar app="Windows" mod="mirror"  %}}

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
