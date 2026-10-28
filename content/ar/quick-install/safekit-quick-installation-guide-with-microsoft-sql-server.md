---
title: "Microsoft SQL Server التوافر العالي مع SafeKit : قم بتثبيت وحدة sqlserver.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "قم بتثبيت وحدة sqlserver.safe لوحدة SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل لوحدتي Microsoft SQL Server . يرشدك هذا الدليل خلال عملية إعداد مجموعة خوادم ثنائية العقدة بدون شبكة تخزين (SAN) للتطبيقات الحيوية التي لا تتطلب تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Microsoft SQL Server و SafeKit قيود التوافر العالي، نظرة عامة على حل SafeKit / Microsoft SQL Server ، تثبيت حل SafeKit / Microsoft SQL Server على Windows ( sqlserver.safe )، التكوين خطوة بخطوة لحل SafeKit / Microsoft SQL Server ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# Microsoft SQL Server التوافر العالي مع SafeKit : قم بتثبيت وحدة sqlserver.safe للتحويل التلقائي في حالة الفشل {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## نظرة عامة على حلول SafeKit / Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

للحصول على نظرة عامة مفصلة عن الحل، انظر ** 💡 [ الأبسط Microsoft SQL Server التوافر العالي: النسخ المتماثل المتزامن ثنائي العقدة والتحويل التلقائي ](</solutions/sql-server-high-availability-synchronous-replication-failover/>) ** .

## تثبيت حل SafeKit / Microsoft SQL Server على Windows ( sqlserver.safe ) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت Microsoft SQL Server على عقدتين (أجهزة افتراضية أو خوادم فعلية).
  * يعمل SafeKit مع جميع إصدارات SQL بما في ذلك SQL Express.


  * يجب أن تكون قواعد بيانات نظام SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (مثل master.mdf وmastlog.ldf) موجودة في نفس المجلدات على كلا العقدتين. سيتم تكوين المجلدات على أنها متماثلة في الخطوة 4 من عملية التكوين خطوة بخطوة.
  * يجب تثبيت SQL في نفس الموقع في نظام الملفات على كلا العقدتين، لأن قاعدة بيانات موارد SQL للقراءة فقط [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) موجودة في الملف التنفيذي وهي ضرورية لعملية تجاوز الفشل. لا يلزم نسخ هذه القاعدة.
  * يجب أن تكون قواعد بيانات مستخدمي SQL (.mdf و .ldf) موجودة في نفس المجلدات على كلا العقدتين. سيتم تكوين المجلدات على أنها متماثلة في الخطوة 4 من عملية التكوين التدريجي.



{{%  insert-safekit-installation-package-windows-ar app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## خطوات تكوين حلول SafeKit / Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-ar app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}