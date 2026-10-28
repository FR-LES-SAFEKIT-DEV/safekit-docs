---
title: "التوافر العالي على Linux مع SafeKit: تثبيت وحدة mirror.safe للتحويل عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "انشر وحدة mirror.safe من SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي عند الفشل على Linux. يرشدك هذا الدليل إلى إعداد عنقود SANless من عقدتين لتطبيقات Linux الحرجة دون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي على Linux, قيود التوافر العالي في SafeKit, نظرة عامة على حل SafeKit / Linux, تثبيت حل SafeKit / Linux (mirror.safe), التهيئة خطوة بخطوة لحل SafeKit / Linux, عرض توضيحي لحل SafeKit mirror, 🔍 مركز التنقل للتوافر العالي في SafeKit"
---

# التوافر العالي على Linux مع SafeKit: تثبيت وحدة mirror.safe للتحويل عند الفشل {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Linux" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit / Linux {#overview-of-the-safekit--linux-solution}

يوصف الحل هنا: **💡[أبسط حل للتوافر العالي على Linux: نسخ متماثل متزامن بين عقدتين وتحويل عند الفشل](</ar/solutions/linux-high-availability-software-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit / Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب أن يكون التطبيق الذي تريد إعادة تشغيله في SafeKit مثبتًا على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: الوحدة العامة **mirror.safe** التي ستقوم بتهيئتها مرفقة ضمن الحزمة.
ملاحظة: يتم تسليم وحدة **mirror.safe** العامة التي ستقوم بتكوينها داخل الحزمة.
## التهيئة خطوة بخطوة لحل SafeKit / Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-ar app="Linux" mod="mirror"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}
