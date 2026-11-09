---
title: "التوفر العالي Microsoft SQL Server باستخدام SafeKit: تثبيت وحدة sqlserver.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "انشر وحدة sqlserver.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الفشل التلقائي Microsoft SQL Server. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون شبكة منطقة تخزين (SANless) للتطبيقات الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي Microsoft SQL Server، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Microsoft SQL Server، تثبيت حل SafeKit/Microsoft SQL Server على Windows (sqlserver.safe)، إعداد حل SafeKit/Microsoft SQL Server خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# التوفر العالي Microsoft SQL Server باستخدام SafeKit: تثبيت وحدة sqlserver.safe للتحويل التلقائي عند الفشل {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## نظرة عامة على حل SafeKit/Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

للاطلاع على نظرة عامة مفصلة عن الحل، راجع **💡 [أبسط حلول التوافر العالي Microsoft SQL Server: النسخ المتماثل المتزامن وفشل التحويل بين عقدتين](</ar/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit/Microsoft SQL Server على Windows (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب تثبيت Microsoft SQL Server على عقدتين (أجهزة افتراضية أو خوادم فعلية).
  * يعمل SafeKit مع جميع إصدارات SQL بما في ذلك SQL Express.


  * يجب أن توجد [قواعد بيانات نظام SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (مثل master.mdf و mastlog.ldf) في نفس الدلائل على كلتا العقدتين. سيتم تكوين الدلائل على أنها مكررة في الخطوة 4 في التكوين خطوة بخطوة.
  * يجب أيضًا تثبيت SQL في نفس الموقع في نظام الملفات على كلتا العقدتين لأن [قاعدة بيانات موارد SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) للقراءة فقط موجودة في الملف الثنائي وهي مطلوبة للتحويل التلقائي. لا تحتاج قاعدة البيانات هذه إلى النسخ المتماثل.
  * يجب أن توجد قواعد بيانات مستخدمي SQL (ملفات .mdf و .ldf) في نفس الدلائل على كلتا العقدتين. سيتم تكوين الدلائل على أنها مكررة في الخطوة 4 في التكوين خطوة بخطوة.



{{%  insert-safekit-installation-package-windows-ar app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## إعداد حل SafeKit/Microsoft SQL Server خطوة بخطوة {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-ar app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}