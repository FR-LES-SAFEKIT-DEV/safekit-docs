---
title: "التوافر العالي MySQL مع SafeKit : قم بتثبيت وحدة mysql.safe للتحويل التلقائي في حالة الفشل"
canonical: "https://safekit.eviden.com/ar/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "قم بتثبيت وحدة mysql.safe لـ SafeKit لتمكين النسخ المتماثل المتزامن في الوقت الفعلي والتحويل التلقائي في حالة الفشل لـ MySQL على Windows و Linux . يرشدك هذا الدليل خلال إعداد مجموعة SAN ثنائية العقد للتطبيقات الحيوية التي لا تستخدم تخزينًا مشتركًا."
category: "quick-install"
lang: "ar"
topics: "دليل التثبيت السريع للتوافر العالي لـ MySQL و SafeKit ، قيود التوافر العالي، نظرة عامة على حل SafeKit / MySQL ، تثبيت حل SafeKit / MySQL على Windows و Linux ( mysql.safe )، التكوين خطوة بخطوة لحل الخادم SafeKit / MySQL ، عرض توضيحي لحل SafeKit mirror ، 🔍 مركز التنقل للتوافر العالي SafeKit"
---

# MySQL توفر إمكانية عالية مع SafeKit : قم بتثبيت وحدة mysql.safe للتحويل التلقائي في حالة الفشل {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ar app="MySQL" mod="mysql"  %}}
 

## نظرة عامة على حل SafeKit / MySQL {#overview-of-the-safekit--mysql-solution}

الحل موضح هنا: **💡 [ أبسط MySQL التوافر العالي: النسخ المتماثل المتزامن والتحويل التلقائي في حالة الفشل لعقدتين ](</ar/solutions/mysql-high-availability-synchronous-replication-failover/>)** .

## تثبيت حل SafeKit / MySQL على Windows و Linux ( mysql.safe ) و {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### المتطلبات الأساسية {#prerequisites}

  * أنت بحاجة إلى تثبيت MySQL على عقدتين (أجهزة افتراضية أو خوادم فعلية).



{{%  insert-safekit-installation-package-windows-ar app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ar app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ar app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ar app="MySQL" mod="mysql"  %}}
 

## خطوات تكوين حل الخادم SafeKit / MySQL {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-ar app="MySQL" mod="mysql"  %}}
 

## عرض توضيحي لحل SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ar  %}}

{{%  insert-safekit-hub-ar  %}}

{{%  insert-safekit-4-buttons-ar  %}}