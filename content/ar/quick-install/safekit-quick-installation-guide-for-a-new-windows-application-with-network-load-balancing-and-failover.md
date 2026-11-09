---
title: "موازنة تحميل الشبكة وتجاوز الفشل في نظام Windows: تثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة farm.safe لموازنة تحميل الشبكة في Windows وتجاوز الفشل التلقائي. يوضح لك هذا الدليل كيفية بناء مجموعة عالية التوفر لخدمات وتطبيقات الويب باستخدام عنوان IP ظاهري، دون الحاجة إلى موازنات تحميل أجهزة خارجية أو تكوين معقد."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لنظام Windows، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Windows، تثبيت حل SafeKit/Windows (farm.safe)، تهيئة حل SafeKit/Windows خطوة بخطوة، عرض حل SafeKit farm، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# موازنة تحميل الشبكة وتجاوز الفشل في نظام Windows: تثبيت وحدة SafeKit farm.safe {#windows-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="Windows" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit/Windows {#overview-of-the-safekit--windows-solution}

يُوصَف الحل هنا: **💡 [SafeKit: برنامج متكامل لموازنة التحميل وتوفير التوافر العالي في نظام التشغيل Windows](</ar/solutions/windows-load-balancing-failover/>)**.

## تثبيت حل SafeKit/Windows (farm.safe) {#installation-of-the-safekit--windows-solution-farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب أن يكون التطبيق الذي ترغب في وضعه في <span class="notranslate farm-term" translate="no">farm</span> مثبتًا على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="" mod="farm"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## تهيئة حل SafeKit/Windows خطوة بخطوة {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-farm-configuration-ar app="Windows" mod="farm"  %}}
 

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}