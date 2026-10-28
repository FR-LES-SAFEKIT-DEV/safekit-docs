---
title: "موازنة تحميل الشبكة وتجاوز الفشل في Azure: تثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "عزّز موازنة تحميل الشبكة في Azure بمراقبة التطبيقات الذكية من SafeKit. توفر وحدة farm.safe فحصًا مخصصًا للحالة لموازن تحميل Azure، ما يتيح التوافر العالي على مستوى التطبيق والإصلاح الذاتي وتجاوز الفشل تلقائيًا للتطبيقات الحيوية."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي في Azure، قيود التوافر العالي في SafeKit، نظرة عامة على حل SafeKit / Azure، تثبيت حل SafeKit / Azure على Windows وLinux (farm.safe)، التكوين خطوة بخطوة لحل SafeKit / Azure، عرض توضيحي لحل SafeKit `farm`، 🔍 مركز التنقل للتوافر العالي في SafeKit"
---

# موازنة تحميل الشبكة وتجاوز الفشل في Azure: تثبيت وحدة SafeKit farm.safe {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-ar app="Azure" mod="farm"  %}}

## نظرة عامة على حل SafeKit / Azure {#overview-of-the-safekit--azure-solution}

وُصف الحل هنا: **💡[SafeKit: موازنة تحميل Microsoft Azure والتوافر العالي للتطبيقات باستخدام مجموعة `Farm`](</ar/solutions/azure-load-balancing-cluster-failover/>)**.

## تثبيت حل SafeKit / Azure على Windows وLinux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### تكوين موازن تحميل Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

يجب تكوين موازن التحميل باستخدام عنوان IP افتراضي.
ويجب تكوينه أيضًا لإرسال حزم التحقق من الحالة إلى العقد دوريًا.
لهذا الغرض، توفر SafeKit فحصًا للحالة يعمل داخل العقد، ويقوم بما يلي:

  * يعيد OK عندما تكون حالة وحدة `farm` هي UP (أخضر)
  * يعيد NOT FOUND في جميع الحالات الأخرى

يجب تكوين موازن تحميل Microsoft Azure باستخدام:

  * بروتوكول HTTP
  * المنفذ 9010، منفذ خادم الويب SafeKit
  * عنوان URL ‏/var/modules/farm/ready.txt (إذا كان `farm` هو اسم الوحدة التي ستنشرها لاحقًا)

لمزيد من المعلومات، راجع [تكوين موازن تحميل Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ لا تكوّن عنوان IP افتراضيًا أو قواعد موازنة التحميل في الخطوة 4 من التكوين خطوة بخطوة أدناه. فعنوان IP الافتراضي وقواعد موازنة التحميل محددان مسبقًا في موازن تحميل Microsoft Azure. ويُستخدم تعيين عنوان IP افتراضي وقواعد موازنة التحميل في الخطوة 4 للتكوين المحلي فقط.

### تكوين أمان شبكة Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

يجب تكوين أمان الشبكة للسماح بالاتصالات باستخدام البروتوكولات والمنافذ التالية:

  * UDP - 4800 لخدمة safeadmin (بين عقد SafeKit)
  * UDP - 4803 لنبضات القلب داخل وحدة `farm` (بين عقد SafeKit)
  * TCP – 9010 لفحص حالة موازن التحميل ووحدة تحكم SafeKit على الويب العاملة بوضع http
  * TCP – 9001 لتكوين وضع https لوحدة التحكم
  * TCP – 9453 لوحدة تحكم SafeKit على الويب العاملة بوضع https

{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}

ملاحظة: تُضمَّن الوحدة العامة **farm.safe** التي ستقوم بتكوينها داخل الحزمة.

## تكوين حل SafeKit / Azure خطوة بخطوة {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-ar app="" mod="farm"  %}}

## عرض توضيحي لحل SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
