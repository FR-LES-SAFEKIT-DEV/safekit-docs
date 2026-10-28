---
title: "التوافر العالي على Windows مع SafeKit: تثبيت وحدة mirror.safe للتحويل عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "انشر وحدة mirror.safe من SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي عند الفشل على Windows. يرشدك هذا الدليل إلى إعداد عنقود SANless من عقدتين لتطبيقات Windows الحرجة دون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي على Windows, قيود التوافر العالي في SafeKit, نظرة عامة على حل SafeKit / Windows, التثبيت على حلول SafeKit / Windows (mirror.safe), التهيئة خطوة بخطوة لحل SafeKit / Windows, عرض توضيحي لحل SafeKit mirror, 🔍 مركز التنقل للتوافر العالي في SafeKit"
---

# التوافر العالي على Windows مع SafeKit: تثبيت وحدة mirror.safe للتحويل عند الفشل {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Windows" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit / Windows {#overview-of-the-safekit--windows-solution}

يوصف الحل هنا: **💡[أبسط حل للتوافر العالي على Windows: نسخ متماثل متزامن بين عقدتين وتحويل عند الفشل](</ar/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## التثبيت على حلول SafeKit / Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب أن يكون التطبيق الذي تريد إعادة تشغيله في SafeKit مثبتًا على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}
 

ملاحظة: الوحدة العامة **mirror.safe** التي ستقوم بتهيئتها مرفقة ضمن الحزمة.

## التهيئة خطوة بخطوة لحل SafeKit / Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-ar app="Windows" mod="mirror"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}
