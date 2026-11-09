---
title: "التوافر العالي لنظام التشغيل Windows باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "انشر وحدة mirror.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الأعطال التلقائي على Windows. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون شبكة منطقة تخزين (SANless) لتطبيقات Windows الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لنظام Windows، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Windows، التثبيت على حلول SafeKit/Windows (mirror.safe)، تهيئة حل SafeKit/Windows خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوافر العالي لنظام التشغيل Windows باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Windows" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit/Windows {#overview-of-the-safekit--windows-solution}

الحل موضح هنا: **💡 [أبسط حل لتوفرية عالية Windows: النسخ المتماثل المتزامن والتحويل التلقائي في حالة الفشل لعقدتين](</ar/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## التثبيت على حلول SafeKit/Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب أن يكون التطبيق الذي تريد إعادة تشغيله في SafeKit مثبتًا على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **mirror.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## تهيئة حل SafeKit/Windows خطوة بخطوة {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-ar app="Windows" mod="mirror"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}