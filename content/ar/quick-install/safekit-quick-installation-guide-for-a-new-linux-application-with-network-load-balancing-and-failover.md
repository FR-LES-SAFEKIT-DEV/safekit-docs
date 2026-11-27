---
title: "موازنة تحميل الشبكة وتجاوز الأعطال Linux: تثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe على Linux لموازنة أحمال الشبكة وتجاوز الفشل لتطبيقك على عنوان IP افتراضي."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع Linux عالي التوفر, قيود التوافر العالي SafeKit, نظرة عامة على حل SafeKit/Linux, تثبيت حل SafeKit/Linux (farm.safe), إعداد حل SafeKit/Linux خطوة بخطوة, عرض حل SafeKit farm"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-farmsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
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