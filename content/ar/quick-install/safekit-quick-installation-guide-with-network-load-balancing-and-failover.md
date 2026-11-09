---
title: "موازنة تحميل الشبكة وتجاوز الفشل Apache: تثبيت وحدة SafeKit apache_farm.safe"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "تعرّف على كيفية نشر وحدة apache_farm.safe على نظامي Windows و Linux لتحقيق موازنة تحميل الشبكة التلقائية Apache وتجاوز الفشل التلقائي. يوضح لك هذا الدليل كيفية بناء مجموعة عالية التوفر لخدمات وتطبيقات الويب باستخدام عنوان IP ظاهري، دون الحاجة إلى موازنات تحميل أجهزة خارجية أو تكوين معقد."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Apache، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Apache، تثبيت حل SafeKit/Apache على نظامي Windows و Linux (apache_farm.safe)، إعداد حل SafeKit/Apache خطوة بخطوة، عرض حل SafeKit farm، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# موازنة تحميل الشبكة وتجاوز الفشل Apache: تثبيت وحدة SafeKit apache_farm.safe {#apache-network-load-balancing--failover-install-the-safekit-apache_farmsafe-module}


{{%  insert-safekit-farm-guide-ar app="Apache" mod="apache_farm"  %}}
 

## نظرة عامة على حل SafeKit/Apache {#overview-of-the-safekit--apache-solution}

يُوصَف الحل هنا: **💡 [SafeKit: برنامج متكامل لموازنة تحميل Apache وتوفير التوافر العالي](</ar/solutions/apache-load-balancing-failover-2/>)**.

## تثبيت حل SafeKit/Apache على نظامي Windows و Linux (apache_farm.safe) {#installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe}

### المتطلبات الأساسية {#prerequisites}

  * تحتاج إلى تثبيت Apache على عقدتين أو أكثر (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-installation-package-linux-ar app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="Apache" mod="apache_farm"  %}}
 

## إعداد حل SafeKit/Apache خطوة بخطوة {#step-by-step-configuration-of-the-safekit--apache-solution}


{{%  insert-safekit-82-farm-configuration-ar app="Apache" mod="apache_farm"  %}}
 

## عرض حل SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}