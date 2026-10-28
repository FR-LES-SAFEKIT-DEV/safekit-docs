---
title: "التوافر العالي Nedap مع SafeKit : قم بتثبيت وحدة nedap.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "قم بتثبيت وحدة nedap.safe لـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل لـ Nedap على Windows . يرشدك هذا الدليل خلال إعداد مجموعة SAN ثنائية العقد للتطبيقات الحيوية التي لا تستخدم تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Nedap ، قيود التوافر العالي لـ SafeKit ، نظرة عامة على حل SafeKit / Nedap ، تثبيت حل SafeKit / Nedap على Windows ( nedap.safe )، التكوين خطوة بخطوة لحل SafeKit / Nedap ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# Nedap توفر إمكانية عالية مع SafeKit : قم بتثبيت وحدة nedap.safe للتحويل التلقائي في حالة الفشل {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Nedap" mod="nedap"  %}}
 

**📘 [ تكوين Nedap AOES مع SafeKit (PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)** : جميع التفاصيل موجودة في هذا المستند.

## نظرة عامة على حل SafeKit / Nedap {#overview-of-the-safekit--nedap-solution}

الحل موضح هنا: **💡 [ أبسط Nedap التوافر العالي: النسخ المتماثل المتزامن والتحويل التلقائي في حالة الفشل لعقدتين ](</ar/solutions/nedap-high-availability-synchronous-replication-failover/>)** .

## تثبيت حل SafeKit / Nedap على Windows ( nedap.safe ) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت Nedap AEOS و SQL على عقدتين (أجهزة افتراضية أو خوادم فعلية).
  * مع وجود SQL Server على نفس العقدة مع Nedap AEOS، قم بتكوين اتصال Nedap AEOS بقاعدة بيانات SQL باستخدام عنوان IP الظاهري وليس عنوان IP الفعلي للخادم. وإلا فلن يعمل تجاوز الفشل. يمكن أن يكون SQL Server خارجيًا، راجع الملاحظة أدناه.


ℹ️ ملاحظة: يمكن أن يكون SQL Server خارجيًا. في هذه الحالة، في الخطوة 4 أثناء عملية التكوين خطوة بخطوة:

  * قم بإزالة نسخ مجلدات بيانات SQL وسجلاتها،
  * قم بإزالة مدقق العمليات على sqlservr.exe ،
  * قم بإزالة MSSQLServer من ماكرو SERVICES.


يمكنك تطبيق خاصية التكرار لوحدة SQL Server الخارجية باستخدام وحدات [ SafeKit و sqlserver.safe ](</ar/solutions/sql-server-high-availability-synchronous-replication-failover/>) . في هذه الحالة، قم بتهيئة اتصال وحدة Nedap AEOS بقاعدة بيانات SQL باستخدام عنوان IP الظاهري لوحدة sqlserver.safe .


{{%  insert-safekit-installation-package-windows-ar app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## خطوات تكوين حل SafeKit / Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-ar app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}