---
title: "موازنة تحميل الشبكة وتجاوز الفشل IIS: تثبيت وحدة SafeKit iis_farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة iis_farm.safe على Windows لتحقيق موازنة تحميل الشبكة IIS وتجاوز الفشل التلقائي. يوضح لك هذا الدليل كيفية بناء مجموعة عالية التوفر لخدمات وتطبيقات الويب باستخدام عنوان IP ظاهري، دون الحاجة إلى موازنات تحميل الأجهزة الخارجية أو تكوين معقد."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ IIS، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/IIS، تثبيت حل SafeKit/IIS على Windows (iis_farm.safe)، تهيئة حل SafeKit/IIS خطوة بخطوة، عرض حل SafeKit farm، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# موازنة تحميل الشبكة وتجاوز الفشل IIS: تثبيت وحدة SafeKit iis_farm.safe {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="IIS" mod="iis_farm"  %}}
 

## نظرة عامة على حل SafeKit/IIS {#overview-of-the-safekit--iis-solution}

يُوصَف الحل هنا: **💡 [SafeKit: برنامج متكامل لموازنة تحميل IIS وتوفير التوافر العالي](</ar/solutions/iis-load-balancing-failover/>)**.

## تثبيت حل SafeKit/IIS على Windows (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب تثبيت IIS على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="IIS" mod="iis_farm"  %}}
 

## تهيئة حل SafeKit/IIS خطوة بخطوة {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-ar app="IIS" mod="iis_farm"  %}}
 

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}