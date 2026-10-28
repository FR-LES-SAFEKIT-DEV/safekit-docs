---
title: "موازنة تحميل الشبكة والتحويل عند الفشل على Linux: تثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة farm.safe لموازنة تحميل الشبكة والتحويل التلقائي عند الفشل على Linux. يوضح هذا الدليل كيفية بناء عنقود عالي التوافر لخدمات الويب والتطبيقات باستخدام عنوان IP افتراضي، دون الحاجة إلى موازنات تحميل عتادية خارجية أو إعدادات معقدة."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي على Linux, قيود التوافر العالي في SafeKit, نظرة عامة على حل SafeKit / Linux, تثبيت حل SafeKit / Linux (farm.safe), التهيئة خطوة بخطوة لحل SafeKit / Linux, عرض توضيحي لحل SafeKit `farm`, 🔍 مركز التنقل للتوافر العالي في SafeKit"
---

# موازنة تحميل الشبكة والتحويل عند الفشل على Linux: تثبيت وحدة SafeKit farm.safe {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="Linux" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit / Linux {#overview-of-the-safekit--linux-solution}

يوصف الحل هنا: **💡[SafeKit: برنامج متكامل لموازنة التحميل والتوافر العالي على Linux](</solutions/linux-load-balancing-failover/>)**.

## تثبيت حل SafeKit / Linux (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب أن يكون التطبيق الذي تريد وضعه في `farm` مثبتًا على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="farm"  %}}
 

ملاحظة: الوحدة العامة **farm.safe** التي ستقوم بتهيئتها مرفقة ضمن الحزمة.

## التهيئة خطوة بخطوة لحل SafeKit / Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-ar app="Linux" mod="farm"  %}}
 

## عرض توضيحي لحل SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}
