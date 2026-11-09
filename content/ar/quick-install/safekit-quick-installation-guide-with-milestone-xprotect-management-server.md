---
title: "توفير إمكانية الوصول العالية Milestone XProtect باستخدام SafeKit: تثبيت وحدة milestone.safe للتحويل التلقائي عند الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "انشر وحدة milestone.safe الخاصة بـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي وتجاوز الأعطال التلقائي لـ Milestone XProtect على Windows. يرشدك هذا الدليل خلال إعداد مجموعة من عقدتين بدون شبكة منطقة تخزين (SANless) للتطبيقات الهامة بدون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع لـ Milestone XProtect عالي التوافر، قيود التوافر العالي SafeKit، نظرة عامة على حل SafeKit/Milestone XProtect، تثبيت حل SafeKit/Milestone XProtect على Windows (milestone.safe)، إعداد حل SafeKit/Milestone XProtect خطوة بخطوة، عرض حل mirror من SafeKit، 🔍 استكشف SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 33 expressions"
---

# توفير إمكانية الوصول العالية Milestone XProtect باستخدام SafeKit: تثبيت وحدة milestone.safe للتحويل التلقائي عند الفشل {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Milestone XProtect" mod="milestone"  %}}
 

## نظرة عامة على حل SafeKit/Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

يُوصَف الحل هنا: **💡 [أبسط حل لتحقيق التوافر العالي Milestone XProtect: النسخ المتزامن وإعادة توجيه الأخطاء بين عقدتين](</ar/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit/Milestone XProtect على Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### المتطلبات الأساسية {#prerequisites}

  * تحتاج إلى تثبيت Milestone XProtect Management و SQL على عقدتين (أجهزة افتراضية أو خوادم فعلية). يمكن أن يكون SQL Server و Event Server خارجيين، راجع الملاحظات أدناه.


ℹ️ ملاحظة: يمكن أن يكون SQL Server خارجيًا. في هذه الحالة، في الخطوة 4 أثناء التكوين خطوة بخطوة لـ milestone.safe :

  * إزالة تكرار مجلدات بيانات SQL وسجلاتها،
  * إزالة مدقق العمليات على sqlservr.exe،
  * إزالة MSSQLServer من وحدات الماكرو للخدمات.


يمكنك تطبيق التكرار SQL Server الخارجي باستخدام 💡 [SafeKit ووحدة sqlserver.safe](</ar/solutions/sql-server-high-availability-synchronous-replication-failover/>).

في هذه الحالة، على كلتا عقدتي الإدارة، قم بتكوين [اتصال إدارة Milestone بـ SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) باستخدام عنوان IP الظاهري لوحدة sqlserver.safe (مفتاح التسجيل HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ ملاحظة: يمكن أن يكون خادم الأحداث خارجيًا عن خادم الإدارة.

في هذه الحالة، لديك مجموعتان مع تثبيتين لـ milestone.safe: واحدة لمجموعة الإدارة، والأخرى لمجموعة الأحداث.

بالنسبة لمجموعة الإدارة، في الخطوة 4 أثناء التكوين خطوة بخطوة لـ milestone.safe :

  * إزالة MilestoneEventServerService من الماكرو SERVICES.


وبالنسبة لمجموعة الأحداث، في الخطوة 4 أثناء التكوين خطوة بخطوة لـ milestone.safe :

  * إزالة من ماكرو الخدمات: MSSQLServer، وخادم إدارة Milestone XProtect، وخادم سجل Milestone XProtect،
  * إزالة تكرار مجلدات بيانات SQL وسجلاتها،
  * إزالة مدقق العمليات على sqlservr.exe،
  * أثناء التكوين خطوة بخطوة، [سجّل](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) خادم الأحداث بعنوان IP الظاهري **لمجموعة الإدارة** (أو قم بتثبيت خادم الأحداث من مدير التنزيل وقم بتعيين عنوان IP الظاهري **لمجموعة الإدارة** أثناء التثبيت)،
  * في عميل إدارة Milestone، قم بتعيين خادم الأحداث باستخدام عنوان IP الظاهري **لمجموعة الأحداث** في [الخدمات المسجلة](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ تكرار المسجل {#ℹ-recorder-redundancy}

  * لا يُعد تكرار أجهزة التسجيل مناسبًا لـ SafeKit نظرًا لحجم البيانات.
  * يمكن استخدام الحل المدمج في Milestone (خادم تسجيل يعمل في حالة فشل الخادم الأساسي بدون نسخ متماثل في الوقت الفعلي).
  * يمكن أيضًا تشغيل جهازي تسجيل في تكوين نشط/نشط، ويتم توزيع الكاميرات بحيث لا تفقد جميع الكاميرات في نفس المنطقة في حالة حدوث عطل.
  * يمكن أيضًا إرسال البث من كل كاميرا إلى جهازي تسجيل باستخدام حل [Vega / RMF](<https://vega25.com/>).


ℹ️ في حالة ترحيل Milestone من الإصدار N إلى الإصدار N+1 في مجموعة SafeKit، اقرأ هذه المقالة: 🛠️ [ترحيل إدارة Milestone باستخدام SafeKit](</ar/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-ar app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## إعداد حل SafeKit/Milestone XProtect خطوة بخطوة {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-ar app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## عرض حل mirror من SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}