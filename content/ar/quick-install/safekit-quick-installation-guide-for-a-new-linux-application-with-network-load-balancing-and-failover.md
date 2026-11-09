---
title: "موازنة تحميل الشبكة وتجاوز الأعطال Linux: تثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة farm.safe لموازنة تحميل الشبكة في نظام Linux وتجاوز الفشل التلقائي. يوضح لك هذا الدليل كيفية بناء مجموعة عالية التوفر لخدمات وتطبيقات الويب باستخدام عنوان IP ظاهري، دون الحاجة إلى موازنات تحميل الأجهزة الخارجية أو تكوين معقد."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لنظام Linux، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Linux، تثبيت حل SafeKit/Linux (farm.safe)، إعداد حل SafeKit/Linux خطوة بخطوة، عرض حل SafeKit farm، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# موازنة تحميل الشبكة وتجاوز الأعطال Linux: تثبيت وحدة SafeKit farm.safe {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="Linux" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit/Linux {#overview-of-the-safekit--linux-solution}

يُوصَف الحل هنا: **💡 [SafeKit: برنامج متكامل لموازنة التحميل والتوافر العالي Linux](</ar/solutions/linux-load-balancing-failover/>)**.

## تثبيت حل SafeKit/Linux (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب أن يكون التطبيق الذي ترغب في وضعه في <span class="notranslate farm-term" translate="no">farm</span> مثبتًا على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="farm"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## إعداد حل SafeKit/Linux خطوة بخطوة {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-ar app="Linux" mod="farm"  %}}
 

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}