---
title: "التوفر العالي MySQL باستخدام SafeKit: تثبيت وحدة mysql.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "انشر وحدة mysql.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الأعطال التلقائي لـ MySQL على Windows و Linux. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون شبكة منطقة تخزين (SANless) للتطبيقات الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ MySQL، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/MySQL، تثبيت حل SafeKit/MySQL على نظامي التشغيل Windows و Linux (mysql.safe)، إعداد حل SafeKit/MySQL Server خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوفر العالي MySQL باستخدام SafeKit: تثبيت وحدة mysql.safe للتحويل التلقائي عند الفشل {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="MySQL" mod="mysql"  %}}
 

## نظرة عامة على حل SafeKit/MySQL {#overview-of-the-safekit--mysql-solution}

الحل موضح هنا: **💡 [أبسط طريقة لتحقيق التوافر العالي MySQL: النسخ المتزامن ثنائي العقدة والتحويل التلقائي عند الفشل](</ar/solutions/mysql-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit/MySQL على نظامي التشغيل Windows و Linux (mysql.safe) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### المتطلبات الأساسية {#prerequisites}

  * تحتاج إلى تثبيت MySQL على عقدتين (جهازين افتراضيين أو خادمين فعليين).



{{%  insert-safekit-installation-package-windows-ar app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ar app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="MySQL" mod="mysql"  %}}
 

## إعداد حل SafeKit/MySQL Server خطوة بخطوة {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-ar app="MySQL" mod="mysql"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}