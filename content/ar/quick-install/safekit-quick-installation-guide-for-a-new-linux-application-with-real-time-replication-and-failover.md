---
title: "التوافر العالي Linux باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "انشر وحدة mirror.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الأعطال التلقائي على Linux. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون شبكة منطقة التخزين (SANless) لتطبيقات Linux الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لنظام Linux، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Linux، تثبيت حل SafeKit/Linux (mirror.safe)، إعداد حل SafeKit/Linux خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوافر العالي Linux باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Linux" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit/Linux {#overview-of-the-safekit--linux-solution}

الحلول موصوفة هنا: **💡 [أبسط حل لضمان التوافر العالي Linux: النسخ المتزامن وإعادة التوجيه بين عقدتين](</ar/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## تثبيت حل SafeKit/Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب أن يكون التطبيق الذي تريد إعادة تشغيله في SafeKit مثبتًا على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **mirror.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## إعداد حل SafeKit/Linux خطوة بخطوة {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-ar app="Linux" mod="mirror"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}