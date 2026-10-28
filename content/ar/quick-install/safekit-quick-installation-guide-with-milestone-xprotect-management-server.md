---
title: "التوافر العالي لـ Milestone XProtect مع SafeKit: تثبيت وحدة milestone.safe لتجاوز الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "انشر وحدة milestone.safe لـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الحقيقي وتجاوز الفشل التلقائي لـ Milestone XProtect على Windows. يرشدك هذا الدليل خلال إعداد مجموعة SANless ذات عقدتين للتطبيقات الحيوية دون تخزين مشترك."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ Milestone XProtect، قيود التوافر العالي في SafeKit، نظرة عامة على حل SafeKit / Milestone XProtect، تثبيت حل SafeKit / Milestone XProtect على Windows (milestone.safe)، التكوين خطوة بخطوة لحل SafeKit / Milestone XProtect، عرض توضيحي لحل SafeKit mirror، 🔍 مركز التنقل للتوافر العالي في SafeKit"
---

# التوافر العالي لـ Milestone XProtect مع SafeKit: تثبيت وحدة milestone.safe لتجاوز الفشل {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="Milestone XProtect" mod="milestone"  %}}


## نظرة عامة على حل SafeKit / Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

الحل موصوف هنا: **💡[أبسط حل للتوافر العالي لـ Milestone XProtect: النسخ المتماثل المتزامن بين عقدتين وتجاوز الفشل](</ar/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## تثبيت حل SafeKit / Milestone XProtect على Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### المتطلبات الأساسية {#prerequisites}

  * يجب تثبيت Milestone XProtect Management وSQL على عقدتين (أجهزة افتراضية أو خوادم فعلية). يمكن أن يكون SQL Server وEvent Server خارجيين؛ راجع الملاحظات أدناه.


ℹ️ ملاحظة: يمكن أن يكون SQL Server خارجياً. في هذه الحالة، في الخطوة 4 من التكوين خطوة بخطوة لـ milestone.safe:

  * أزل نسخ مجلدي SQL Data وLog،
  * أزل مدقق العملية الخاص بـ sqlservr.exe،
  * أزل MSSQLServer من الماكرو SERVICES.


يمكنك تنفيذ التكرار الاحتياطي لـ SQL Server الخارجي باستخدام **💡[SafeKit ووحدة sqlserver.safe](</ar/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

في هذه الحالة، على عقدتي الإدارة، اضبط [اتصال Milestone Management بـ SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) باستخدام عنوان IP الافتراضي لوحدة sqlserver.safe (مفتاح السجل HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ ملاحظة: يمكن أن يكون Event Server خارج Management Server.

في هذه الحالة، لديك مجموعتان عنقوديتان مع تثبيتين لـ milestone.safe: واحدة لمجموعة Management والأخرى لمجموعة Event.

بالنسبة إلى مجموعة Management، في الخطوة 4 من التكوين خطوة بخطوة لـ milestone.safe:

  * أزل MilestoneEventServerService من الماكرو SERVICES.


وبالنسبة إلى مجموعة Event، في الخطوة 4 من التكوين خطوة بخطوة لـ milestone.safe:

  * أزل من الماكرو SERVICES: MSSQLServer وMilestone XProtect Management Server وMilestone XProtect Log Server،
  * أزل نسخ مجلدي SQL Data وLog،
  * أزل مدقق العملية الخاص بـ sqlservr.exe،
  * أثناء التكوين خطوة بخطوة، [سجّل](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) Event Server باستخدام عنوان IP الافتراضي **لمجموعة Management** (أو ثبّت Event Server من Download Manager واضبط عنوان IP الافتراضي **لمجموعة Management** أثناء التثبيت)،
  * في Milestone management client، اضبط Event Server على عنوان IP الافتراضي **لمجموعة Event** ضمن [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ تكرار Recorder {#ℹ-recorder-redundancy}

  * لا يناسب نسخ Recorders SafeKit بسبب حجم البيانات.
  * يمكن استخدام الحل المدمج في Milestone (خادم تسجيل احتياطي دون نسخ متماثل في الوقت الحقيقي).
  * يمكن أيضاً تشغيل جهازي Recorder في إعداد نشط/نشط وتوزيع الكاميرات بحيث لا تفقد جميع كاميرات المنطقة نفسها عند حدوث عطل.
  * يمكن أيضاً إرسال البث من كل كاميرا إلى جهازي Recorder باستخدام حل [Vega / RMF](<https://vega25.com/>).


ℹ️ عند ترحيل Milestone من الإصدار N إلى الإصدار N+1 في مجموعة SafeKit، اقرأ هذا المقال: 🛠️ [ترحيل Milestone Management باستخدام SafeKit](</ar/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-ar app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="Milestone XProtect and SQL" mod="milestone"  %}}


## التكوين خطوة بخطوة لحل SafeKit / Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-ar app="Milestone XProtect and SQL" mod="milestone"  %}}


## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}
