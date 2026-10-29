---
title: "موازنة أحمال الشبكة والتحويل التلقائي في حالة الفشل لـ NGINX: قم بتثبيت وحدة SafeKit farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة farm.safe على Windows و Linux لموازنة أحمال شبكة NGINX والتحويل التلقائي في حالة الأعطال. يُوضح لك هذا الدليل كيفية إنشاء مجموعة عالية التوفر لخدمات الويب والتطبيقات باستخدام عنوان IP افتراضي، دون الحاجة إلى موازنات أحمال خارجية أو إعدادات معقدة."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع لـ NGINX مع خاصية التوافر العالي، قيود التوافر العالي لـ SafeKit ، نظرة عامة على حل SafeKit / NGINX، تثبيت حل SafeKit / NGINX على Windows و Linux ( farm.safe )، التكوين خطوة بخطوة لحل SafeKit / NGINX، عرض توضيحي لحل SafeKit farm ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# موازنة أحمال الشبكة والتحويل التلقائي في حالة الفشل لـ NGINX: قم بتثبيت الوحدات النمطية SafeKit farm.safe {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="NGINX" mod="farm"  %}}
 

## نظرة عامة على حل SafeKit / NGINX {#overview-of-the-safekit--nginx-solution}

الحل موضح هنا: **💡 [ SafeKit : برنامج موازنة الأحمال والتوافر العالي الشامل لـ NGINX ](</ar/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)** .

## تثبيت حل SafeKit / NGINX على Windows و Linux ( farm.safe ) و {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت NGINX على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-ar app="NGINX" mod="farm"  %}}
 

ملاحظة: يتم تسليم وحدة **farm.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## خطوات تكوين حل SafeKit / NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-ar app="NGINX" mod="farm"  %}}
 

## عرض توضيحي لحل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}