---
title: "موازنة تحميل الشبكة وتجاوز الأعطال NGINX: تثبيت وحدة farm.safe SafeKit"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة farm.safe على نظامي Windows و Linux لتحقيق موازنة تحميل الشبكة التلقائية وتجاوز الفشل التلقائي باستخدام NGINX. يوضح لك هذا الدليل كيفية بناء مجموعة عالية التوفر لخدمات وتطبيقات الويب باستخدام عنوان IP ظاهري، دون الحاجة إلى موازنات تحميل أجهزة خارجية أو تكوين معقد."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ NGINX، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/NGINX، تثبيت حل SafeKit/NGINX على نظامي Windows و Linux (farm.safe)، إعداد حل SafeKit/NGINX خطوة بخطوة، عرض حل SafeKit farm، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# موازنة تحميل الشبكة وتجاوز الأعطال NGINX: تثبيت وحدة farm.safe SafeKit {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="NGINX" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit/NGINX {#overview-of-the-safekit--nginx-solution}

يُوصَف الحل هنا: **💡 [SafeKit: برنامج متكامل لموازنة تحميل NGINX وتوفير التوافر العالي](</ar/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**.

## تثبيت حل SafeKit/NGINX على نظامي Windows و Linux (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * تحتاج إلى تثبيت NGINX على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-ar app="NGINX" mod="farm"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## إعداد حل SafeKit/NGINX خطوة بخطوة {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-ar app="NGINX" mod="farm"  %}}
 

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}