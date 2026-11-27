---
title: "موازنة تحميل الشبكة وتجاوز الأعطال NGINX: تثبيت وحدة farm.safe SafeKit"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit farm.safe على Windows أو Linux لموازنة أحمال الشبكة وتجاوز الفشل لخوادم NGINX."
category: "quick-install"
lang: "ar"
topics: "نظرة عامة على حل SafeKit/NGINX, تثبيت حل SafeKit/NGINX على نظامي Windows و Linux (farm.safe), إعداد حل SafeKit/NGINX خطوة بخطوة, عرض حل SafeKit farm"
hashpart: "overview-of-the-safekit--nginx-solution, installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe, step-by-step-configuration-of-the-safekit--nginx-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
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