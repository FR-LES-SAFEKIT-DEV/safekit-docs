---
title: "التوافر العالي Linux باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit mirror.safe على Linux للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لتطبيقك على خادمين."
category: "quick-install"
lang: "ar"
topics: "نظرة عامة على حل SafeKit/Linux, تثبيت حل SafeKit/Linux (mirror.safe), إعداد حل SafeKit/Linux خطوة بخطوة, عرض حل mirror من SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# التوافر العالي Linux باستخدام SafeKit: تثبيت وحدة mirror.safe للتحويل التلقائي عند الفشل {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Linux" mod="mirror"  %}}
 

## نظرة عامة على حل SafeKit/Linux {#overview-of-the-safekit--linux-solution}

الحلول موصوفة هنا: **💡 [أبسط حل لضمان التوافر العالي Linux: النسخ المتزامن وإعادة التوجيه بين عقدتين](</ar/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## تثبيت حل SafeKit/Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب أن يكون التطبيق الذي تريد إعادة تشغيله في SafeKit مثبتًا على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-linux-ar app="" mod="mirror"  %}}
 

ملاحظة: يتم تسليم وحدة **mirror.safe** العامة التي ستقوم بتكوينها داخل الحزمة.

## إعداد حل SafeKit/Linux خطوة بخطوة {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-ar app="Linux" mod="mirror"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ar  %}}