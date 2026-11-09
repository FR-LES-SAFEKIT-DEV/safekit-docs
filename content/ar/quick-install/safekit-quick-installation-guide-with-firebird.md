---
title: "التوفر العالي Firebird باستخدام SafeKit: تثبيت وحدة firebird.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "انشر وحدة firebird.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الأعطال التلقائي لـ Firebird على Windows و Linux. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون شبكة منطقة تخزين (SANless) للتطبيقات الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Firebird، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Firebird، تثبيت حل SafeKit/Firebird على نظامي التشغيل Windows و Linux (firebird.safe)، إعداد حل SafeKit/Firebird خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوفر العالي Firebird باستخدام SafeKit: تثبيت وحدة firebird.safe للتحويل التلقائي عند الفشل {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Firebird" mod="firebird"  %}}
 

## نظرة عامة على حل SafeKit/Firebird {#overview-of-the-safekit--firebird-solution}

الحل موضح هنا: **💡 [أبسط طريقة لتحقيق التوافر العالي Firebird: النسخ المتماثل المتزامن و تجاوز الفشل بعقدتين](</ar/solutions/firebird-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit/Firebird على نظامي التشغيل Windows و Linux (firebird.safe) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب تثبيت Firebird على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="Firebird" mod="firebird"  %}}
 

## إعداد حل SafeKit/Firebird خطوة بخطوة {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-ar app="Firebird" mod="firebird"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}