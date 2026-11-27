---
title: "Nedap High Availability مع SafeKit: قم بتثبيت وحدة nedap.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "دليل خطوة بخطوة: تثبيت وحدة SafeKit nedap.safe للنسخ في الوقت الفعلي وتجاوز الفشل التلقائي لنظام التحكم في الوصول Nedap AEOS على Windows."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع Nedap عالي التوفر, قيود التوافر العالي SafeKit, نظرة عامة على حل SafeKit/Nedap, تثبيت حل SafeKit/Nedap على Windows (nedap.safe), تكوين حل SafeKit/Nedap خطوة بخطوة, عرض حل mirror من SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--nedap-solution, installation-of-the-safekit--nedap-solution-on-windows-nedapsafe, step-by-step-configuration-of-the-safekit--nedap-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Nedap High Availability مع SafeKit: قم بتثبيت وحدة nedap.safe للتحويل التلقائي عند الفشل {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Nedap" mod="nedap"  %}}
 

**📘 [إعداد نظام Nedap AOES باستخدام SafeKit (ملف PDF)](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)**: جميع التفاصيل موجودة في هذا المستند.

## نظرة عامة على حل SafeKit/Nedap {#overview-of-the-safekit--nedap-solution}

يُوصَف الحل هنا: **💡 [أبسط حل لضمان التوافر العالي Nedap: النسخ المتماثل المتزامن والتحويل التلقائي بين عقدتين](</ar/solutions/nedap-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit/Nedap على Windows (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### المتطلبات الأساسية {#prerequisites}

  * تحتاج إلى تثبيت Nedap AEOS و SQL على عقدتين (أجهزة افتراضية أو خوادم فعلية).
  * عند تشغيل SQL Server على نفس العقدة التي يعمل عليها Nedap AEOS، قم بتكوين اتصال Nedap AEOS بـ SQL باستخدام عنوان IP الظاهري وليس عنوان IP الفعلي للخادم. وإلا فلن يعمل تجاوز الفشل. يمكن أن يكون SQL Server خارجيًا، انظر الملاحظة أدناه.


ℹ️ ملاحظة: يمكن أن يكون SQL Server خارجيًا. في هذه الحالة، في الخطوة 4 أثناء التكوين خطوة بخطوة:

  * إزالة تكرار مجلدات بيانات SQL وسجلاتها،
  * إزالة مدقق العمليات على sqlservr.exe،
  * إزالة MSSQLServer من ماكرو SERVICES.


يمكنك تطبيق التكرار SQL Server الخارجي باستخدام 💡 [SafeKit ووحدة sqlserver.safe](</ar/solutions/sql-server-high-availability-synchronous-replication-failover/>). في هذه الحالة، قم بتكوين اتصال Nedap AEOS بخادم SQL باستخدام عنوان IP الظاهري لوحدة sqlserver.safe.


{{%  insert-safekit-installation-package-windows-ar app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## تكوين حل SafeKit/Nedap خطوة بخطوة {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-ar app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}