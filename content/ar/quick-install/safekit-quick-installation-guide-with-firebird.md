---
title: "تثبيت SafeKit للتوافر العالي لـ Firebird"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit firebird.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لـ Firebird على Windows أو Linux."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع Firebird عالي التوفر, قيود التوافر العالي SafeKit, نظرة عامة على حل SafeKit/Firebird, تثبيت حل SafeKit/Firebird على نظامي التشغيل Windows و Linux (firebird.safe), إعداد حل SafeKit/Firebird خطوة بخطوة, عرض حل mirror من SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--firebird-solution, installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe, step-by-step-configuration-of-the-safekit--firebird-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# تثبيت SafeKit للتوافر العالي لـ Firebird {#install-safekit-for-firebird-high-availability}


{{%  insert-safekit-mirror-guide-ar app="Firebird" mod="firebird"  %}}
 

## نظرة عامة على حل SafeKit/Firebird {#overview-of-the-safekit--firebird-solution}

الحل موضح هنا: **💡 [أبسط طريقة لتحقيق التوافر العالي Firebird: النسخ المتماثل المتزامن و تجاوز الفشل بعقدتين](</ar/solutions/firebird-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit/Firebird على نظامي التشغيل Windows و Linux (firebird.safe) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب تثبيت Firebird على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-ar app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="Firebird" mod="firebird"  %}}
 

## إعداد حل SafeKit/Firebird خطوة بخطوة {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-ar app="Firebird" mod="firebird"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}